import { useTranslation } from 'react-i18next';
import { Input } from '@signozhq/ui/input';
import { Typography } from '@signozhq/ui/typography';
// eslint-disable-next-line signoz/no-antd-components -- multiline TextArea has no @signozhq/ui equivalent yet
import { Input as AntdInput } from 'antd';

import styles from './VariableInfoForm.module.scss';
import { DASHBOARD_NAME_MAX_LENGTH } from '../../../../constants';
import variableFormStyles from '../../VariableForm/VariableForm.module.scss';

interface VariableInfoFormProps {
	title: string;
	description: string;
	onTitleChange: (value: string) => void;
	onDescriptionChange: (value: string) => void;
	visibleNameError: string | null;
}

function VariableInfoForm({
	title,
	description,
	onTitleChange,
	onDescriptionChange,
	visibleNameError,
}: VariableInfoFormProps): JSX.Element {
	const { t } = useTranslation('dashboard');

	return (
		<>
			<div className={styles.infoItemContainer}>
				<Typography className={styles.infoTitle}>
					{t('dashboard_page_v2.variables.name')}
				</Typography>

				<Input
					testId="variable-name"
					className={styles.variableNameInput}
					value={title}
					maxLength={DASHBOARD_NAME_MAX_LENGTH}
					onChange={(e): void => onTitleChange(e.target.value)}
					placeholder={t('dashboard_page_v2.variables.unique_name_placeholder')}
				/>

				{visibleNameError ? (
					<Typography.Text className={variableFormStyles.errorText}>
						<sup>*</sup>&nbsp;
						{visibleNameError}
					</Typography.Text>
				) : null}
			</div>

			<div className={styles.infoItemContainer}>
				<Typography className={styles.infoTitle}>
					{t('dashboard_page_v2.variables.description')}
				</Typography>
				<AntdInput.TextArea
					className={styles.descriptionTextArea}
					value={description}
					placeholder={t('dashboard_page_v2.variables.description_placeholder')}
					data-testid="dashboard-desc"
					rows={3}
					onChange={(e): void => onDescriptionChange(e.target.value)}
				/>
			</div>
		</>
	);
}

export default VariableInfoForm;
