import { useTranslation } from 'react-i18next';
import { ArrowLeft } from '@signozhq/icons';
import { Button } from '@signozhq/ui/button';
import styles from './BackToAllVariables.module.scss';
import { VariableFormProps } from '../../types';

const BackToAllVariables = ({
	onClose,
}: {
	onClose: VariableFormProps['onClose'];
}): JSX.Element => {
	const { t } = useTranslation('dashboard');
	return (
		<div className={styles.backToAllVariables}>
			<Button
				variant="ghost"
				color="secondary"
				className={styles.backToAllVariablesButton}
				prefix={<ArrowLeft size={14} />}
				onClick={onClose}
				testId="variable-form-back"
				size="md"
			>
				{t('variables.all_variables')}
			</Button>
		</div>
	);
};

export default BackToAllVariables;
