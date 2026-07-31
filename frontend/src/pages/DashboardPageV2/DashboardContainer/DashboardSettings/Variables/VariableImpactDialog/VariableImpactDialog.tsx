import { Check, X } from '@signozhq/icons';
import { useTranslation } from 'react-i18next';
import { Button } from '@signozhq/ui/button';
import { DialogWrapper } from '@signozhq/ui/dialog';
import { Typography } from '@signozhq/ui/typography';
// eslint-disable-next-line signoz/no-antd-components -- multiline TextArea + Checkbox have no @signozhq/ui equivalent yet
import { Checkbox, Input as AntdInput } from 'antd';
import cx from 'classnames';
import { textContainsVariableReference } from 'lib/dashboardVariables/variableReference';

import type {
	VariableImpactMode,
	VariableUsage,
} from '../utils/variableUsages';
import { useVariableImpactState } from './useVariableImpactState';
import styles from './VariableImpactDialog.module.scss';

const KIND_LABEL_KEY: Record<VariableUsage['kind'], string> = {
	builder: 'dashboard_page_v2.variables.impact.query_builder',
	promql: 'PromQL',
	clickhouse: 'ClickHouse',
	variable: 'dashboard_page_v2.variables.impact.variable',
};

interface VariableImpactDialogProps {
	open: boolean;
	mode: VariableImpactMode;
	/** The variable being renamed/deleted (its current name). */
	variableName: string;
	/** The new name (rename mode only). */
	newName?: string;
	usages: VariableUsage[];
	isLoading: boolean;
	onConfirm: (resolvedUsages: VariableUsage[]) => void;
	onClose: () => void;
}

/**
 * Blocks a rename/delete of a referenced variable behind a review step: lists
 * every usage across panel queries (builder / PromQL / ClickHouse) and other
 * variables, shows the current vs resulting query, and lets the user edit each
 * result or exclude it before applying.
 */
function VariableImpactDialog({
	open,
	mode,
	variableName,
	newName,
	usages,
	isLoading,
	onConfirm,
	onClose,
}: VariableImpactDialogProps): JSX.Element {
	const { t } = useTranslation('dashboard');
	const { rows, setResultingText, toggleIncluded, resolvedUsages } =
		useVariableImpactState(usages, open);

	const isRename = mode === 'rename';
	const isDelete = mode === 'delete';
	const count = usages.length;
	let intro: string;
	if (isRename) {
		intro = t('dashboard_page_v2.variables.impact.rename_intro', {
			name: variableName,
			newName,
			count,
		});
	} else if (isDelete) {
		intro = t('dashboard_page_v2.variables.impact.delete_intro', {
			name: variableName,
			count,
		});
	} else {
		intro = t('dashboard_page_v2.variables.impact.apply_intro', {
			name: variableName,
			count,
		});
	}
	const confirmLabel = isRename
		? t('dashboard_page_v2.variables.impact.rename')
		: isDelete
			? t('dashboard_page_v2.variables.impact.delete')
			: t('dashboard_page_v2.variables.impact.apply');

	const footer = (
		<div className={styles.footer}>
			<Button
				variant="solid"
				color="secondary"
				onClick={onClose}
				testId="variable-impact-cancel"
			>
				<X size={12} />
				{t('dashboard_page_v2.variables.impact.cancel')}
			</Button>
			<Button
				variant="solid"
				color={isDelete ? 'destructive' : 'primary'}
				loading={isLoading}
				onClick={(): void => onConfirm(resolvedUsages)}
				testId="variable-impact-confirm"
			>
				<Check size={12} />
				{confirmLabel}
			</Button>
		</div>
	);

	return (
		<DialogWrapper
			open={open}
			onOpenChange={(isOpen): void => {
				if (!isOpen) {
					onClose();
				}
			}}
			title={
				// eslint-disable-next-line no-nested-ternary
				isRename
					? t('dashboard_page_v2.variables.impact.rename_title', {
							name: variableName,
						})
					: isDelete
						? t('dashboard_page_v2.variables.impact.delete_title', {
								name: variableName,
							})
						: t('dashboard_page_v2.variables.impact.apply_title', {
								name: variableName,
							})
			}
			width="wide"
			showCloseButton={false}
			// Lift above the settings drawer (z ~1000); overlay off (it would only half-dim).
			style={{ zIndex: 1100 }}
			showOverlay={false}
			footer={footer}
		>
			<div className={styles.body}>
				<Typography.Text className={styles.intro}>{intro}</Typography.Text>
				<div className={styles.rows}>
					{rows.map((row) => {
						// Only warn on delete: an apply result is meant to reference the variable.
						const stillReferences =
							isDelete &&
							row.included &&
							textContainsVariableReference(row.resultingText, variableName);
						return (
							<div
								key={row.id}
								className={styles.row}
								data-testid={`variable-impact-row-${row.id}`}
							>
								<div className={styles.rowHeader}>
									<Checkbox
										checked={row.included}
										onChange={(): void => toggleIncluded(row.id)}
										data-testid={`variable-impact-include-${row.id}`}
									>
										<span className={styles.sourceLabel}>{row.sourceLabel}</span>
									</Checkbox>
									<span className={styles.kindTag}>{t(KIND_LABEL_KEY[row.kind])}</span>
								</div>
								<div className={styles.field}>
									<Typography.Text className={styles.fieldLabel}>
										{t('dashboard_page_v2.variables.impact.current')}
									</Typography.Text>
									<AntdInput.TextArea
										className={styles.textArea}
										value={row.currentText}
										disabled
										readOnly
										autoSize={{ minRows: 1, maxRows: 4 }}
									/>
								</div>
								<div className={styles.field}>
									<Typography.Text className={styles.fieldLabel}>
										{t('dashboard_page_v2.variables.impact.result')}
									</Typography.Text>
									<AntdInput.TextArea
										className={cx(styles.textArea, !row.included && styles.disabled)}
										value={row.resultingText}
										disabled={!row.included}
										autoSize={{ minRows: 1, maxRows: 4 }}
										onChange={(e): void => setResultingText(row.id, e.target.value)}
										data-testid={`variable-impact-result-${row.id}`}
									/>
									{stillReferences ? (
										<Typography.Text size={'small'} color="warning">
											{t('dashboard_page_v2.variables.impact.still_references', {
												name: variableName,
											})}
										</Typography.Text>
									) : null}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</DialogWrapper>
	);
}

export default VariableImpactDialog;
