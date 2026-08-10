import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyRound, X } from '@signozhq/icons';
import { Pagination, Skeleton, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import type { ServiceaccounttypesGettableFactorAPIKeyDTO } from 'api/generated/services/sigNoz.schemas';
import AuthZButton from 'lib/authz/components/AuthZButton/AuthZButton';
import { withAuthZContent } from 'lib/authz/components/withAuthZ/withAuthZContent';
import {
	APIKeyCreatePermission,
	APIKeyListPermission,
	buildAPIKeyDeletePermission,
	buildSAAttachPermission,
	buildSADetachPermission,
} from 'lib/authz/hooks/useAuthZ/permissions/service-account.permissions';
import { DATE_TIME_FORMATS } from 'constants/dateTimeFormats';
import dayjs from 'dayjs';
import { parseAsBoolean, parseAsString, useQueryState } from 'nuqs';
import { useTimezone } from 'providers/Timezone';

import EditKeyModal from './EditKeyModal';
import RevokeKeyModal from './RevokeKeyModal';
import { formatLastObservedAt } from './utils';

interface KeysTabProps {
	keys: ServiceaccounttypesGettableFactorAPIKeyDTO[];
	isLoading: boolean;
	isDisabled?: boolean;
	accountId?: string;
	currentPage: number;
	pageSize: number;
	onPageChange: (page: number) => void;
}

interface BuildColumnsParams {
	isDisabled: boolean;
	accountId: string;
	onRevokeClick: (keyId: string) => void;
	handleformatLastObservedAt: (
		lastObservedAt: Date | null | undefined,
	) => string;
	labels: {
		expired: string;
		expiry: string;
		lastObservedAt: string;
		name: string;
		never: string;
		revokeKey: string;
		serviceAccountDisabled: string;
	};
}

function formatExpiry(
	expiresAt: number,
	labels: Pick<BuildColumnsParams['labels'], 'expired' | 'never'>,
): JSX.Element {
	if (expiresAt === 0) {
		return <span className="keys-tab__expiry--never">{labels.never}</span>;
	}
	const expiryDate = dayjs.unix(expiresAt);
	if (expiryDate.isBefore(dayjs())) {
		return <span className="keys-tab__expiry--expired">{labels.expired}</span>;
	}
	return <span>{expiryDate.format(DATE_TIME_FORMATS.MONTH_DATE)}</span>;
}

function buildColumns({
	isDisabled,
	accountId,
	onRevokeClick,
	handleformatLastObservedAt,
	labels,
}: BuildColumnsParams): ColumnsType<ServiceaccounttypesGettableFactorAPIKeyDTO> {
	return [
		{
			title: labels.name,
			dataIndex: 'name',
			key: 'name',
			className: 'keys-tab__name-column',
			sorter: (a, b): number => (a.name ?? '').localeCompare(b.name ?? ''),
			render: (_, record): JSX.Element => (
				<span className="keys-tab__name-text">{record.name ?? '—'}</span>
			),
		},
		{
			title: labels.expiry,
			dataIndex: 'expiresAt',
			key: 'expiry',
			width: 160,
			align: 'right' as const,
			sorter: (a, b): number => {
				const aVal = a.expiresAt === 0 ? Infinity : a.expiresAt;
				const bVal = b.expiresAt === 0 ? Infinity : b.expiresAt;
				return aVal - bVal;
			},
			render: (expiresAt: number): JSX.Element => formatExpiry(expiresAt, labels),
		},
		{
			title: labels.lastObservedAt,
			dataIndex: 'lastObservedAt',
			key: 'lastObservedAt',
			width: 220,
			align: 'right' as const,
			sorter: (a, b): number => {
				const aVal = a.lastObservedAt
					? new Date(a.lastObservedAt).getTime()
					: -Infinity;
				const bVal = b.lastObservedAt
					? new Date(b.lastObservedAt).getTime()
					: -Infinity;
				return aVal - bVal;
			},
			render: (lastObservedAt: Date | null | undefined): string =>
				handleformatLastObservedAt(lastObservedAt),
		},
		{
			title: '',
			key: 'action',
			width: 48,
			align: 'right' as const,
			onCell: (): {
				onClick: (e: React.MouseEvent) => void;
				style: React.CSSProperties;
			} => ({
				onClick: (e): void => e.stopPropagation(),
				style: { cursor: 'default' },
			}),
			render: (_, record): JSX.Element => {
				const tooltipTitle = isDisabled
					? labels.serviceAccountDisabled
					: labels.revokeKey;
				return (
					<Tooltip title={tooltipTitle} placement="bottom">
						<AuthZButton
							checks={[
								buildAPIKeyDeletePermission(record.id),
								buildSADetachPermission(accountId),
							]}
							authZEnabled={!isDisabled && !!accountId}
							withPortal={false}
							variant="ghost"
							size="sm"
							color="destructive"
							disabled={isDisabled}
							onClick={(e): void => {
								e.stopPropagation();
								onRevokeClick(record.id);
							}}
							className="keys-tab__revoke-btn"
						>
							<X size={12} />
						</AuthZButton>
					</Tooltip>
				);
			},
		},
	];
}

function KeysTab({
	keys,
	isLoading,
	isDisabled = false,
	accountId = '',
	currentPage,
	pageSize,
	onPageChange,
}: KeysTabProps): JSX.Element {
	const { t } = useTranslation('common');
	const [, setIsAddKeyOpen] = useQueryState(
		'add-key',
		parseAsBoolean.withDefault(false),
	);
	const { formatTimezoneAdjustedTimestamp } = useTimezone();
	const [editKeyId, setEditKeyId] = useQueryState(
		'edit-key',
		parseAsString.withDefault(''),
	);
	const [, setRevokeKeyId] = useQueryState(
		'revoke-key',
		parseAsString.withDefault(''),
	);
	const editKey = keys.find((k) => k.id === editKeyId) ?? null;

	const handleformatLastObservedAt = useCallback(
		(lastObservedAt: Date | null | undefined): string =>
			formatLastObservedAt(lastObservedAt, formatTimezoneAdjustedTimestamp),
		[formatTimezoneAdjustedTimestamp],
	);

	const onRevokeClick = useCallback(
		(keyId: string): void => {
			void setRevokeKeyId(keyId);
		},
		[setRevokeKeyId],
	);

	const columns = useMemo(
		() =>
			buildColumns({
				isDisabled,
				accountId,
				onRevokeClick,
				handleformatLastObservedAt,
				labels: {
					expired: t('sa_keys.expired'),
					expiry: t('sa_keys.expiry'),
					lastObservedAt: t('sa_keys.last_observed_at'),
					name: t('sa_keys.name'),
					never: t('sa_keys.never'),
					revokeKey: t('sa_edit_key.revoke_key'),
					serviceAccountDisabled: t('sa_keys.service_account_disabled'),
				},
			}),
		[isDisabled, accountId, onRevokeClick, handleformatLastObservedAt, t],
	);

	if (isLoading) {
		return (
			<div className="keys-tab__loading">
				<Skeleton active paragraph={{ rows: 4 }} />
			</div>
		);
	}

	if (keys.length === 0) {
		return (
			<div className="keys-tab__empty">
				<KeyRound size={24} className="keys-tab__empty-icon" />
				<p className="keys-tab__empty-text">
					{t('sa_keys.no_keys')}{' '}
					<a
						href="https://signoz.io/docs/manage/administrator-guide/iam/service-accounts/#step-3-generate-an-api-key"
						target="_blank"
						rel="noopener noreferrer"
						className="keys-tab__learn-more"
					>
						{t('learn_more')}
					</a>
				</p>
				<AuthZButton
					checks={[APIKeyCreatePermission, buildSAAttachPermission(accountId)]}
					authZEnabled={!isDisabled && !!accountId}
					withPortal={false}
					variant="link"
					color="primary"
					onClick={async (): Promise<void> => {
						await setIsAddKeyOpen(true);
					}}
					disabled={isDisabled}
				>
					{t('sa_keys.add_first_key')}
				</AuthZButton>
			</div>
		);
	}

	return (
		<>
			{/* Todo: use new table component from periscope when ready */}
			<Table<ServiceaccounttypesGettableFactorAPIKeyDTO>
				columns={columns}
				dataSource={keys}
				rowKey="id"
				pagination={{
					style: { display: 'none' },
					current: currentPage,
					pageSize,
				}}
				showSorterTooltip={false}
				className={`keys-tab__table${
					isDisabled ? ' keys-tab__table--disabled' : ''
				}`}
				rowClassName={(_, index): string =>
					index % 2 === 0 ? 'keys-tab__table-row--alt' : ''
				}
				onRow={(
					record,
				): {
					onClick: () => void;
					onKeyDown: (e: React.KeyboardEvent) => void;
					role: string;
					tabIndex: number;
					'aria-label': string;
				} => ({
					onClick: async (): Promise<void> => {
						if (!isDisabled) {
							await setEditKeyId(record.id);
						}
					},
					onKeyDown: async (e: React.KeyboardEvent): Promise<void> => {
						if ((e.key === 'Enter' || e.key === ' ') && !isDisabled) {
							if (e.key === ' ') {
								e.preventDefault();
							}
							await setEditKeyId(record.id);
						}
					},
					role: 'button',
					tabIndex: 0,
					'aria-label': t('sa_keys.edit_key_aria', {
						name: record.name || 'options',
					}),
				})}
			/>

			<Pagination
				current={currentPage}
				pageSize={pageSize}
				total={keys.length}
				showTotal={(total: number, range: number[]): JSX.Element => (
					<>
						<span className="sa-drawer__pagination-range">
							{range[0]} &#8212; {range[1]}
						</span>
						<span className="sa-drawer__pagination-total"> of {total}</span>
					</>
				)}
				showSizeChanger={false}
				hideOnSinglePage
				onChange={onPageChange}
				className="sa-drawer__keys-pagination"
			/>

			<EditKeyModal keyItem={editKey} />

			<RevokeKeyModal />
		</>
	);
}

export default withAuthZContent(KeysTab, {
	checks: [APIKeyListPermission],
	fallbackOnLoading: <Skeleton active paragraph={{ rows: 6 }} />,
});
