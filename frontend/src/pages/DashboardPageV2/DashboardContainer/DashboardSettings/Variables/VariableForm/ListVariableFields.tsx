import { Badge } from '@signozhq/ui/badge';
import { useTranslation } from 'react-i18next';
import { Switch } from '@signozhq/ui/switch';
import { Typography } from '@signozhq/ui/typography';
import cx from 'classnames';
// eslint-disable-next-line signoz/no-antd-components -- fixed-option sort picker
import { Select } from 'antd';
import { CustomSelect } from 'components/NewSelect';

import {
	VARIABLE_SORT_LABEL_KEY,
	VARIABLE_SORTS,
	type VariableFormModel,
	type VariableSort,
} from '../variableFormModel';
import styles from './VariableForm.module.scss';

interface ListVariableFieldsProps {
	model: VariableFormModel;
	onChange: (patch: Partial<VariableFormModel>) => void;
	previewValues: (string | number)[];
	previewError: string | null;
	defaultValue: string;
	onDefaultValueChange: (value: string) => void;
	/** Whether the "ALL values" toggle applies to this type (QUERY / CUSTOM). */
	showAllOptionField: boolean;
}

/**
 * Rows shared by the list-style variables (Query / Custom / Dynamic): the value
 * preview, sort, multi-select / ALL toggles and the default-value picker.
 */
function ListVariableFields({
	model,
	onChange,
	previewValues,
	previewError,
	defaultValue,
	onDefaultValueChange,
	showAllOptionField,
}: ListVariableFieldsProps): JSX.Element {
	const { t } = useTranslation('dashboard');

	return (
		<>
			<div className={cx(styles.row, styles.previewSection)}>
				<Typography.Text className={styles.previewLabel}>
					{t('dashboard_page_v2.variables.preview_of_values')}
				</Typography.Text>
				<div className={styles.previewValues}>
					{previewError ? (
						<Typography.Text className={styles.previewError}>
							{previewError}
						</Typography.Text>
					) : (
						previewValues.map((value, idx) => (
							<Badge
								// eslint-disable-next-line react/no-array-index-key -- preview values are display-only and may contain duplicates
								key={`${value}-${idx}`}
								color="vanilla"
							>
								{value.toString()}
							</Badge>
						))
					)}
				</div>
			</div>

			<div className={cx(styles.row, styles.sortSection)}>
				<div className={styles.labelContainer}>
					<Typography.Text className={styles.label}>
						{t('dashboard_page_v2.variables.sort_values')}
					</Typography.Text>
				</div>
				<Select
					className={styles.sortSelect}
					popupMatchSelectWidth={false}
					value={model.sort}
					options={VARIABLE_SORTS.map((sort) => ({
						label: t(VARIABLE_SORT_LABEL_KEY[sort]),
						value: sort,
					}))}
					onChange={(value): void => onChange({ sort: value as VariableSort })}
					data-testid="variable-sort-select"
				/>
			</div>

			<div className={cx(styles.row, styles.multiSection)}>
				<Typography.Text className={styles.rowLabel}>
					{t('dashboard_page_v2.variables.enable_multiple_values')}
				</Typography.Text>
				<Switch
					value={model.multiSelect}
					onChange={(checked): void =>
						onChange({
							multiSelect: checked,
							showAllOption: checked ? model.showAllOption : false,
						})
					}
					testId="variable-multi-switch"
				/>
			</div>

			{model.multiSelect && showAllOptionField ? (
				<div className={cx(styles.row, styles.allOptionSection)}>
					<Typography.Text className={styles.rowLabel}>
						{t('dashboard_page_v2.variables.include_all_values')}
					</Typography.Text>
					<Switch
						value={model.showAllOption}
						onChange={(checked): void => onChange({ showAllOption: checked })}
						testId="variable-all-switch"
					/>
				</div>
			) : null}

			<div className={cx(styles.row, styles.defaultValueSection)}>
				<div className={styles.labelContainer}>
					<Typography.Text className={styles.label}>
						{t('dashboard_page_v2.variables.default_value')}
					</Typography.Text>
					<Typography.Text className={styles.defaultValueDesc}>
						{model.type === 'QUERY'
							? t('dashboard_page_v2.variables.default_query_hint')
							: t('dashboard_page_v2.variables.default_preview_hint')}
					</Typography.Text>
				</div>
				<CustomSelect
					className={styles.searchSelect}
					showSearch
					allowClear
					placeholder={t('dashboard_page_v2.variables.default_value_placeholder')}
					value={defaultValue || undefined}
					onChange={(value): void => onDefaultValueChange((value as string) ?? '')}
					options={previewValues.map((value) => ({
						label: value.toString(),
						value: value.toString(),
					}))}
					data-testid="variable-default-select"
				/>
			</div>
		</>
	);
}

export default ListVariableFields;
