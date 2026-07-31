import { Checkbox, Select } from 'antd';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import type { UpdatedWindow } from '../../types';

import styles from './FilterZone.module.scss';

export interface CreatorOption {
	email: string;
	label: string;
}

const UPDATED_LABEL_KEYS: Record<UpdatedWindow, string> = {
	any: 'dashboards_list_page_v2.filter.updated_options.any_time',
	today: 'dashboards_list_page_v2.filter.updated_options.today',
	'7d': 'dashboards_list_page_v2.filter.updated_options.last_7_days',
	'30d': 'dashboards_list_page_v2.filter.updated_options.last_30_days',
};

const UPDATED_WINDOWS: UpdatedWindow[] = ['any', 'today', '7d', '30d'];

interface Props {
	createdBy: string[];
	updated: UpdatedWindow;
	creatorOptions: CreatorOption[];
	onCreatedByChange: (emails: string[]) => void;
	onUpdatedChange: (window: UpdatedWindow) => void;
	// Run the staged draft — fired when a dropdown closes.
	onApply: () => void;
	// Clear all Created-by selections and run immediately.
	onClearCreatedBy: () => void;
}

function FilterChips({
	createdBy,
	updated,
	creatorOptions,
	onCreatedByChange,
	onUpdatedChange,
	onApply,
	onClearCreatedBy,
}: Props): JSX.Element {
	const { t } = useTranslation('dashboard');
	const creatorOptionsData = creatorOptions.map((o) => ({
		value: o.email,
		label: o.label,
	}));
	const updatedOptions = UPDATED_WINDOWS.map((w) => ({
		value: w,
		label: t(UPDATED_LABEL_KEYS[w]),
	}));

	const runOnClose = (open: boolean): void => {
		if (!open) {
			onApply();
		}
	};

	return (
		<div className={styles.chips}>
			<Select
				mode="multiple"
				showSearch
				allowClear
				className={cx(styles.select, styles.selectWide)}
				placeholder={t('dashboards_list_page_v2.filter.created_by')}
				value={createdBy}
				options={creatorOptionsData}
				optionFilterProp="label"
				maxTagCount={1}
				menuItemSelectedIcon={null}
				data-testid="dashboards-filter-created-by"
				onClear={onClearCreatedBy}
				optionRender={(option): JSX.Element => (
					<div className={styles.creatorOption}>
						<Checkbox
							checked={createdBy.includes(option.value as string)}
							className={styles.creatorCheck}
						/>
						<span className={styles.creatorLabel}>{option.label}</span>
					</div>
				)}
				onChange={(value): void => onCreatedByChange(value as string[])}
				onDropdownVisibleChange={runOnClose}
			/>
			<Select
				showSearch
				className={cx(styles.select, styles.selectNarrow)}
				placeholder={t('dashboards_list_page_v2.filter.updated')}
				value={updated}
				options={updatedOptions}
				optionFilterProp="label"
				data-testid="dashboards-filter-updated"
				onChange={(value): void => onUpdatedChange(value as UpdatedWindow)}
			/>
		</div>
	);
}

export default FilterChips;
