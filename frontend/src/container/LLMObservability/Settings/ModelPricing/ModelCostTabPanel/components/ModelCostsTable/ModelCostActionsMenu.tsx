import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { Ellipsis } from '@signozhq/icons';
import { Button } from '@signozhq/ui/button';
import { DropdownMenuSimple, type MenuItem } from '@signozhq/ui/dropdown-menu';
import { type LlmpricingruletypesLLMPricingRuleDTO } from 'api/generated/services/sigNoz.schemas';

import styles from './ModelCostActionsMenu.module.scss';

interface ModelCostActionsMenuProps {
	rule: LlmpricingruletypesLLMPricingRuleDTO;
	canManage: boolean;
	onEdit: (rule: LlmpricingruletypesLLMPricingRuleDTO) => void;
	onDelete: (rule: LlmpricingruletypesLLMPricingRuleDTO) => void;
}

// Per-row kebab menu for the model-costs table. Only manage users get actions
// (Edit + Delete); view-only users have nothing to act on, so the cell stays
// empty rather than showing a single-item menu.
function ModelCostActionsMenu({
	rule,
	canManage,
	onEdit,
	onDelete,
}: ModelCostActionsMenuProps): JSX.Element | null {
	const { t } = useTranslation('llm');
	const menuItems = useMemo<MenuItem[]>(
		() => [
			{
				key: 'edit',
				label: t('model_cost_actions.edit', 'Edit'),
				onClick: (): void => onEdit(rule),
			},
			{
				key: 'delete',
				label: t('model_cost_actions.delete', 'Delete'),
				danger: true,
				onClick: (): void => onDelete(rule),
			},
		],
		[onEdit, onDelete, rule, t],
	);

	if (!canManage) {
		return null;
	}

	return (
		<DropdownMenuSimple menu={{ items: menuItems }} align="end">
			<Button
				variant="ghost"
				color="secondary"
				size="icon"
				className={styles.actionButton}
				testId={`model-cost-actions-${rule.id}`}
			>
				<Ellipsis size={16} />
			</Button>
		</DropdownMenuSimple>
	);
}

export default ModelCostActionsMenu;
