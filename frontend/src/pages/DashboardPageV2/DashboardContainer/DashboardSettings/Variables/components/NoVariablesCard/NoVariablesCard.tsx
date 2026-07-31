import { useTranslation } from 'react-i18next';
import { Typography } from '@signozhq/ui/typography';
import AddVariableButton from '../AddVariableButton';
import { EditingState } from '../../types';
import styles from './NoVariables.module.scss';

const NoVariablesCard = ({
	isEditable,
	setIsEditing,
}: {
	isEditable: boolean;
	setIsEditing: React.Dispatch<React.SetStateAction<EditingState | null>>;
}): JSX.Element => {
	const { t } = useTranslation('dashboard');

	return (
		<div className={styles.noVariablesCard}>
			<div className={styles.noVariablesCopy}>
				<Typography.Text className={styles.noVariablesTitle}>
					{t('dashboard_page_v2.variables.no_variables_title')}
				</Typography.Text>
				<Typography.Text className={styles.noVariablesInfo}>
					{t('dashboard_page_v2.variables.no_variables_description')}
				</Typography.Text>
			</div>
			<AddVariableButton isEditable={isEditable} setIsEditing={setIsEditing} />
		</div>
	);
};

export default NoVariablesCard;
