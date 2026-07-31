import { useTranslation } from 'react-i18next';
import { Plus } from '@signozhq/icons';
import { Button } from '@signozhq/ui/button';

const AddVariableButton = ({
	isEditable,
	setIsEditing,
}: {
	isEditable: boolean;
	setIsEditing: (state: { type: 'new' }) => void;
}): JSX.Element => {
	const { t } = useTranslation('dashboard');

	return (
		<Button
			variant="solid"
			color="primary"
			prefix={<Plus size={14} />}
			size="md"
			onClick={(): void => setIsEditing({ type: 'new' })}
			testId="add-variable"
			disabled={!isEditable}
		>
			{t('dashboard_page_v2.variables.add_variable')}
		</Button>
	);
};

export default AddVariableButton;
