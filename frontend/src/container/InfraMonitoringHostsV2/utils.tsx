import React from 'react';
import { Color } from '@signozhq/design-tokens';
import { Tooltip } from 'antd';
import { Typography } from '@signozhq/ui/typography';
import {
	FiltersType,
	IQuickFiltersConfig,
} from 'components/QuickFilters/types';
import { TriangleAlert } from '@signozhq/icons';
import TanStackTable from 'components/TanStackTableView';
import { INFRA_MONITORING_ATTR_KEYS } from 'container/InfraMonitoringK8sV2/constants';
import { DataTypes } from 'types/api/queryBuilder/queryAutocompleteResponse';
import { DataSource } from 'types/common/queryBuilder';
import { useTranslation } from 'react-i18next';
const HOSTNAME_DOCS_URL =
	'https://signoz.io/docs/infrastructure-monitoring/hostmetrics/#host-name-is-blankempty';

export function HostnameCell({
	hostName,
}: {
	hostName?: string | null;
}): React.ReactElement {
	const { t } = useTranslation('infraMonitoring');
	const isEmpty = !hostName || !hostName.trim();
	if (!isEmpty) {
		return <TanStackTable.Text>{hostName}</TanStackTable.Text>;
	}
	return (
		<>
			<Typography.Text color="muted">-</Typography.Text>
			<Tooltip
				title={
					<div>
						{t('display.missing_host_name_metadata', {
							defaultValue: 'Missing host.name metadata.',
						})}
						<br />
						<a
							href={HOSTNAME_DOCS_URL}
							target="_blank"
							rel="noopener noreferrer"
							onClick={(e): void => e.stopPropagation()}
						>
							{t('display.learn_how_to_configure_arrow', {
								defaultValue: 'Learn how to configure →',
							})}
						</a>
					</div>
				}
				trigger={['hover', 'focus']}
			>
				<button
					type="button"
					className="hostname-cell-warning-icon"
					style={{
						padding: 0,
						border: 0,
						background: 'none',
						cursor: 'pointer',
						lineHeight: 0,
					}}
					aria-label={t('display.missing_host_name_metadata', {
						defaultValue: 'Missing host.name metadata.',
					})}
					onClick={(e): void => e.stopPropagation()}
				>
					<TriangleAlert size={14} color={Color.BG_CHERRY_500} />
				</button>
			</Tooltip>
		</>
	);
}

export function getHostsQuickFiltersConfig(): IQuickFiltersConfig[] {
	return [
		{
			type: FiltersType.CHECKBOX,
			title: 'display.host_name',
			attributeKey: {
				key: INFRA_MONITORING_ATTR_KEYS.HOST_NAME,
				dataType: DataTypes.String,
				type: 'resource',
			},
			aggregateOperator: 'noop',
			aggregateAttribute: INFRA_MONITORING_ATTR_KEYS.SYSTEM_CPU_LOAD_AVERAGE_15M,
			dataSource: DataSource.METRICS,
			defaultOpen: true,
		},
		{
			type: FiltersType.CHECKBOX,
			title: 'display.os_type',
			attributeKey: {
				key: INFRA_MONITORING_ATTR_KEYS.OS_TYPE,
				dataType: DataTypes.String,
				type: 'resource',
			},
			aggregateOperator: 'noop',
			aggregateAttribute: INFRA_MONITORING_ATTR_KEYS.SYSTEM_CPU_LOAD_AVERAGE_15M,
			dataSource: DataSource.METRICS,
			defaultOpen: true,
		},
		{
			type: FiltersType.CHECKBOX,
			title: 'display.environment',
			attributeKey: {
				key: INFRA_MONITORING_ATTR_KEYS.DEPLOYMENT_ENVIRONMENT,
				dataType: DataTypes.String,
				type: 'resource',
			},
			defaultOpen: true,
		},
	];
}
