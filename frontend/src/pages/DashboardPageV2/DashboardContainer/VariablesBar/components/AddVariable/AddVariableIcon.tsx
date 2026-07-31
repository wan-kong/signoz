import { Plus } from '@signozhq/icons';
import { useTranslation } from 'react-i18next';
import { Button } from '@signozhq/ui/button';
import { TooltipSimple } from '@signozhq/ui/tooltip';

import { useDashboardStore } from '../../../store/useDashboardStore';
import styles from './AddVariable.module.scss';

/**
 * Compact "+" trigger (label on hover) shown after the variable pills once at
 * least one variable exists. Opens the Variables settings tab with the add form
 * primed.
 */
function AddVariableIcon(): JSX.Element {
	const { t } = useTranslation('dashboard');
	const requestSettings = useDashboardStore((s) => s.requestSettings);

	return (
		<TooltipSimple
			side="top"
			title={t('dashboard_page_v2.variables_bar.add_variable')}
		>
			<Button
				variant="outlined"
				color="secondary"
				size="icon"
				className={styles.addVariableIcon}
				aria-label={t('dashboard_page_v2.variables_bar.add_variable')}
				testId="dashboard-variables-add"
				onClick={(): void =>
					requestSettings({ tab: 'Variables', addVariable: true })
				}
			>
				<Plus size={14} />
			</Button>
		</TooltipSimple>
	);
}

export default AddVariableIcon;
