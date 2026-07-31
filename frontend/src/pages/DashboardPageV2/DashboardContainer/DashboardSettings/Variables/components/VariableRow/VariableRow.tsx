import type { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, GripVertical, PenLine, Trash2, X } from '@signozhq/icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@signozhq/ui/button';
import { TooltipSimple } from '@signozhq/ui/tooltip';
import { Typography } from '@signozhq/ui/typography';
import cx from 'classnames';

import type { VariableFormModel } from '../../variableFormModel';
import styles from './VariableRow.module.scss';

interface VariableRowProps {
	variable: VariableFormModel;
	index: number;
	canEdit: boolean;
	/** True when this row's delete is awaiting inline confirmation. */
	isConfirmingDelete: boolean;
	onEdit: (index: number) => void;
	onRequestDelete: (index: number) => void;
	onConfirmDelete: (index: number) => void;
	onCancelDelete: () => void;
	/** Apply this variable's filter to all panels. Dynamic variables only. */
	onApplyToAll: (index: number) => void;
	/** True when this dynamic variable is already applied to every panel. */
	isAppliedToAll: boolean;
}

/** A single draggable variable row in the two-column (name / description) table. */
function VariableRow({
	variable,
	index,
	canEdit,
	isConfirmingDelete,
	onEdit,
	onRequestDelete,
	onConfirmDelete,
	onCancelDelete,
	onApplyToAll,
	isAppliedToAll,
}: VariableRowProps): JSX.Element {
	const { t } = useTranslation('dashboard');
	const {
		attributes,
		listeners,
		setNodeRef,
		setActivatorNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: variable.name });

	const style: CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
		...(isDragging ? { position: 'relative', zIndex: 1, opacity: 0.8 } : {}),
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={styles.row}
			data-testid={`variable-row-${variable.name}`}
		>
			<div className={styles.varCell}>
				{canEdit ? (
					<span
						ref={setActivatorNodeRef}
						className={styles.dragHandle}
						aria-label={t('dashboard_page_v2.variables.reorder_variable')}
						{...attributes}
						{...listeners}
					>
						<GripVertical size={14} />
					</span>
				) : null}
				<Typography.Text className={styles.varName}>
					{variable.name}
				</Typography.Text>
			</div>

			<div className={styles.descCell}>
				{variable.description ? (
					<Typography.Text className={styles.varDesc}>
						{variable.description}
					</Typography.Text>
				) : (
					<span className={styles.varDescEmpty}>—</span>
				)}

				{canEdit ? (
					<div
						className={cx(styles.rowActions, {
							[styles.rowActionsVisible]: isConfirmingDelete,
						})}
					>
						{isConfirmingDelete ? (
							<>
								<Typography.Text className={styles.confirmText}>
									{t('dashboard_page_v2.variables.delete_question')}
								</Typography.Text>
								<Button
									variant="ghost"
									color="destructive"
									size="icon"
									onClick={(): void => onConfirmDelete(index)}
									aria-label={t('dashboard_page_v2.variables.confirm_delete')}
									testId={`variable-delete-confirm-${variable.name}`}
								>
									<Check size={14} />
								</Button>
								<Button
									variant="ghost"
									color="secondary"
									size="icon"
									onClick={onCancelDelete}
									aria-label={t('dashboard_page_v2.variables.cancel_delete')}
								>
									<X size={14} />
								</Button>
							</>
						) : (
							<>
								{variable.type === 'DYNAMIC' ? (
									<TooltipSimple
										side="top"
										title={
											isAppliedToAll
												? t('dashboard_page_v2.variables.already_applied_to_all')
												: t('dashboard_page_v2.variables.add_filter_to_every_panel')
										}
									>
										<Button
											variant="ghost"
											color="secondary"
											size="sm"
											disabled={isAppliedToAll}
											className={styles.applyAllButton}
											onClick={(): void => onApplyToAll(index)}
											testId={`variable-apply-all-${variable.name}`}
										>
											{t('dashboard_page_v2.variables.apply_to_all')}
										</Button>
									</TooltipSimple>
								) : null}
								<Button
									variant="ghost"
									color="secondary"
									size="icon"
									onClick={(): void => onEdit(index)}
									aria-label={t('dashboard_page_v2.variables.edit_variable')}
									testId={`variable-edit-${variable.name}`}
								>
									<PenLine size={14} />
								</Button>
								<Button
									variant="ghost"
									color="secondary"
									size="icon"
									onClick={(): void => onRequestDelete(index)}
									aria-label={t('dashboard_page_v2.variables.delete_variable')}
									testId={`variable-delete-${variable.name}`}
								>
									<Trash2 size={14} />
								</Button>
							</>
						)}
					</div>
				) : null}
			</div>
		</div>
	);
}

export default VariableRow;
