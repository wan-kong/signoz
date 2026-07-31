import { ToggleGroup, ToggleGroupItem } from '@signozhq/ui/toggle-group';
import { logInfraFilterCustomizedEvent } from 'constants/events';
import { InfraMonitoringEntity } from 'container/InfraMonitoringK8sV2/constants';
import {
	StatusFilterValue,
	useInfraMonitoringPageListing,
	useInfraMonitoringStatusFilter,
} from 'container/InfraMonitoringK8sV2/hooks';
import { useQueryBuilder } from 'hooks/queryBuilder/useQueryBuilder';
import { useTranslation } from 'react-i18next';

import styles from './StatusFilter.module.scss';

const statusOptions: Array<{
	label: string;
	labelKey: string;
	value: StatusFilterValue | 'all';
}> = [
	{ label: 'All', labelKey: 'display.all', value: 'all' },
	{ label: 'Active', labelKey: 'display.active', value: 'active' },
	{ label: 'Inactive', labelKey: 'display.inactive', value: 'inactive' },
];

function StatusFilter(): JSX.Element {
	const { t } = useTranslation('infraMonitoring');
	const [statusFilter, setStatusFilter] = useInfraMonitoringStatusFilter();
	const [, setCurrentPage] = useInfraMonitoringPageListing();
	const { currentQuery } = useQueryBuilder();

	const handleChange = (value: string): void => {
		if (value !== undefined) {
			void setStatusFilter(value === 'all' ? '' : (value as StatusFilterValue));
			void setCurrentPage(1);

			const expression =
				currentQuery.builder.queryData[0]?.filter?.expression || '';
			logInfraFilterCustomizedEvent(
				InfraMonitoringEntity.HOSTS,
				'host_status_toggle',
				expression,
				value === 'all' ? [] : ['host_status'],
			);
		}
	};

	return (
		<div className={styles.statusFilterContainer}>
			<div className={styles.statusLabel}>{t('display.status', 'Status')}</div>
			<ToggleGroup
				type="single"
				value={statusFilter === '' ? 'all' : statusFilter}
				onChange={handleChange}
				className={styles.statusToggleGroup}
			>
				{statusOptions.map((option) => (
					<ToggleGroupItem
						key={option.value}
						value={option.value}
						aria-label={t(option.labelKey, option.label)}
						className={styles.statusToggleItem}
					>
						<span
							className={`${styles.statusDot} ${
								option.value === 'active'
									? styles.activeDot
									: option.value === 'inactive'
										? styles.inactiveDot
										: styles.allDot
							}`}
						/>
						{t(option.labelKey, option.label)}
					</ToggleGroupItem>
				))}
			</ToggleGroup>
		</div>
	);
}

export default StatusFilter;
