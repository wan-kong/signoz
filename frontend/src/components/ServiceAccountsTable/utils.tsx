import i18n from 'ReactI18';
import { ScanSearch } from '@signozhq/icons';
import { Badge } from '@signozhq/ui/badge';
import { Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import type { ColumnType } from 'antd/es/table/interface';
import { ServiceAccountRow } from 'container/ServiceAccountsSettings/utils';

export function NameEmailCell({
	name,
	email,
}: {
	name: string;
	email: string;
}): JSX.Element {
	return (
		<div className="sa-name-email-cell">
			{name && (
				<span className="sa-name" title={name}>
					{name}
				</span>
			)}
			<Tooltip title={email} overlayClassName="sa-tooltip">
				<span className="sa-email">{email}</span>
			</Tooltip>
		</div>
	);
}

export function StatusBadge({ status }: { status: string }): JSX.Element {
	const { t } = useTranslation('common');
	if (status?.toUpperCase() === 'ACTIVE') {
		return (
			<Badge color="forest" variant="outline">
				{t('service_accounts.active')}
			</Badge>
		);
	}
	if (status?.toUpperCase() === 'DELETED') {
		return (
			<Badge color="cherry" variant="outline">
				{t('service_accounts.deleted')}
			</Badge>
		);
	}
	return (
		<Badge color="vanilla" variant="outline" className="sa-status-badge">
			{status ? status.toUpperCase() : t('service_accounts.unknown')}
		</Badge>
	);
}

export function ServiceAccountsEmptyState({
	searchQuery,
}: {
	searchQuery: string;
}): JSX.Element {
	const { t } = useTranslation('common');
	return (
		<div className="sa-empty-state">
			<ScanSearch size={24} className="sa-empty-state__icon" />
			{searchQuery ? (
				<p className="sa-empty-state__text">
					{t('service_accounts.no_results_for')} <strong>{searchQuery}</strong>
				</p>
			) : (
				<p className="sa-empty-state__text">
					{t('service_accounts.no_accounts_message')}
				</p>
			)}
		</div>
	);
}

// Column definitions with translation keys — resolved in the component via useTranslation
export interface ServiceAccountColumn extends ColumnType<ServiceAccountRow> {
	titleKey: string;
}

export const SA_COLUMNS: ServiceAccountColumn[] = [
	{
		titleKey: 'service_accounts.name_email',
		dataIndex: 'name',
		key: 'name',
		className: 'sa-name-column',
		sorter: (a, b): number => a.email.localeCompare(b.email),
		render: (_, record): JSX.Element => (
			<NameEmailCell name={record.name} email={record.email} />
		),
	},
	{
		titleKey: 'service_accounts.status',
		dataIndex: 'status',
		key: 'status',
		width: 120,
		align: 'right' as const,
		className: 'sa-status-cell',
		sorter: (a, b): number =>
			(a.status?.toUpperCase() === 'ACTIVE' ? 0 : 1) -
			(b.status?.toUpperCase() === 'ACTIVE' ? 0 : 1),
		render: (status: string): JSX.Element => <StatusBadge status={status} />,
	},
];

export const showPaginationTotal = (
	_total: number,
	range: number[],
): JSX.Element => (
	<>
		<span className="sa-pagination-range">
			{range[0]} &#8212; {range[1]}
		</span>
		<span className="sa-pagination-total">
			{String(i18n.t('of', 'of', { ns: 'common' }))} {_total}
		</span>
	</>
);
