import { Button } from '@signozhq/ui/button';
import { Plus } from '@signozhq/icons';
import { useTranslation } from 'react-i18next';

interface Props {
	onClick: () => void;
}

function NewDashboardButton({ onClick }: Props): JSX.Element {
	const { t } = useTranslation('dashboard');

	return (
		<Button
			variant="solid"
			color="primary"
			prefix={<Plus size={14} />}
			onClick={onClick}
			testId="new-dashboard-cta"
		>
			{t('dashboards_list_page_v2.actions.new_dashboard')}
		</Button>
	);
}

export default NewDashboardButton;
