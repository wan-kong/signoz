import { KeyboardEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import MEditor from '@monaco-editor/react';
import { TriangleAlert } from '@signozhq/icons';
import { Button } from '@signozhq/ui/button';
import { TooltipSimple } from '@signozhq/ui/tooltip';
import { Typography } from '@signozhq/ui/typography';
import cx from 'classnames';
import { Drawer } from 'antd';
import logEvent from 'api/common/logEvent';
import type { DashboardtypesGettableDashboardV2DTO } from 'api/generated/services/sigNoz.schemas';
import { DashboardDetailEvents } from 'pages/DashboardPageV2/constants/events';
import { useCopyToClipboard } from 'react-use';
import { toast } from '@signozhq/ui/sonner';

import { defineJsonEditorTheme, JSON_EDITOR_THEME } from './editorTheme';
import styles from './JsonEditorDrawer.module.scss';
import JsonEditorToolbar from './JsonEditorToolbar';
import { useJsonEditor } from './useJsonEditor';
import DisabledControlTooltip from '../../components/DisabledControlTooltip/DisabledControlTooltip';
import { useDashboardStore } from '../../store/useDashboardStore';

interface JsonEditorDrawerProps {
	dashboard: DashboardtypesGettableDashboardV2DTO;
	isOpen: boolean;
	onClose: () => void;
}

function JsonEditorDrawer({
	dashboard,
	isOpen,
	onClose,
}: JsonEditorDrawerProps): JSX.Element {
	const { t } = useTranslation('dashboard');
	const [, copyToClipboard] = useCopyToClipboard();

	const isEditable = useDashboardStore((s) => s.isEditable);
	const readOnlyReason = useDashboardStore((s) => s.editDisabledReason);
	// Inspect-only when not editable: Apply/Format/Reset disabled.
	const readOnly = !isEditable;

	const {
		draft,
		setDraft,
		validity,
		isDirty,
		isSaving,
		danglingPanelIds,
		missingPanelRefs,
		format,
		reset,
		apply,
	} = useJsonEditor({ dashboard, isOpen, readOnly, onApplied: onClose });

	const onCopy = useCallback((): void => {
		copyToClipboard(draft);
		toast.success(t('dashboard_page_v2.json_editor.copied'));
		void logEvent(DashboardDetailEvents.JsonEditorAction, {
			action: 'copy',
			dashboardId: dashboard.id,
		});
	}, [copyToClipboard, draft, dashboard.id, t]);

	const onDownload = useCallback((): void => {
		void logEvent(DashboardDetailEvents.JsonEditorAction, {
			action: 'download',
			dashboardId: dashboard.id,
		});
		const blob = new Blob([draft], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = `${dashboard.name || 'dashboard'}.json`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	}, [draft, dashboard.name, dashboard.id]);

	const onKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>): void => {
			event.stopPropagation();

			if (event.key === 'Escape') {
				onClose();
				return;
			}

			if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
				event.preventDefault();
				if (!readOnly) {
					void apply();
				}
			}
		},
		[apply, readOnly, onClose],
	);

	const applyDisabled = readOnly || !isDirty || !validity.valid || isSaving;
	const validationText = validity.valid
		? t('dashboard_page_v2.json_editor.valid_json', {
				count: validity.lineCount,
			})
		: t('dashboard_page_v2.json_editor.invalid_json', {
				line: validity.errorLine ?? '?',
				message: validity.message ?? t('dashboard_page_v2.json_editor.invalid'),
			});
	const danglingWarning =
		danglingPanelIds.length > 0
			? t('dashboard_page_v2.json_editor.dangling_panels', {
					count: danglingPanelIds.length,
				})
			: null;
	const missingRefWarning =
		missingPanelRefs.length > 0
			? t('dashboard_page_v2.json_editor.missing_refs', {
					count: missingPanelRefs.length,
				})
			: null;

	return (
		<Drawer
			title={t('dashboard_page_v2.json_editor.title')}
			placement="right"
			width={660}
			onClose={onClose}
			open={isOpen}
			rootClassName={styles.root}
			footer={
				<div className={styles.footer}>
					<div className={styles.footerStatus}>
						<Typography.Text
							className={cx(styles.validation, {
								[styles.validationValid]: validity.valid,
								[styles.validationInvalid]: !validity.valid,
							})}
							data-testid="json-editor-validation"
						>
							{validationText}
						</Typography.Text>
						{danglingWarning && (
							<TooltipSimple
								title={danglingPanelIds.join(', ')}
								tooltipContentProps={{ className: styles.warningTooltip }}
							>
								<span
									className={styles.danglingWarning}
									data-testid="json-editor-dangling-warning"
								>
									<TriangleAlert size={12} className={styles.warningIcon} />
									<Typography.Text className={styles.warningText}>
										{danglingWarning}
									</Typography.Text>
								</span>
							</TooltipSimple>
						)}
						{missingRefWarning && (
							<TooltipSimple
								title={missingPanelRefs.join(', ')}
								tooltipContentProps={{ className: styles.warningTooltip }}
							>
								<span
									className={styles.danglingWarning}
									data-testid="json-editor-missing-ref-warning"
								>
									<TriangleAlert size={12} className={styles.warningIcon} />
									<Typography.Text className={styles.warningText}>
										{missingRefWarning}
									</Typography.Text>
								</span>
							</TooltipSimple>
						)}
					</div>
					<div className={styles.footerActions}>
						<Button
							variant="outlined"
							color="secondary"
							size="md"
							testId="json-editor-cancel"
							onClick={onClose}
						>
							{t('dashboard_page_v2.json_editor.cancel')}
						</Button>
						<DisabledControlTooltip reason={readOnlyReason} disabled={readOnly}>
							<Button
								variant="solid"
								color="primary"
								size="md"
								testId="json-editor-apply"
								disabled={applyDisabled}
								onClick={readOnly ? undefined : (): void => void apply()}
							>
								{t('dashboard_page_v2.json_editor.apply_changes')}
							</Button>
						</DisabledControlTooltip>
					</div>
				</div>
			}
		>
			{/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
			<div className={styles.body} onKeyDown={onKeyDown}>
				<JsonEditorToolbar
					isDirty={isDirty}
					readOnly={readOnly}
					onFormat={format}
					onCopy={onCopy}
					onDownload={onDownload}
					onReset={reset}
				/>
				<div className={styles.editor}>
					<MEditor
						language="json"
						height="100%"
						value={draft}
						onChange={(value): void => setDraft(value ?? '')}
						options={{
							readOnly,
							scrollbar: { alwaysConsumeMouseWheel: false },
							minimap: { enabled: false },
							fontSize: 13,
							fontFamily: 'Space Mono',
						}}
						theme="vs-dark"
						onMount={(editor, monaco): void => {
							defineJsonEditorTheme(monaco, editor.getContainerDomNode());
							monaco.editor.setTheme(JSON_EDITOR_THEME);
							void document.fonts.ready.then(() => monaco.editor.remeasureFonts());
						}}
					/>
				</div>
			</div>
		</Drawer>
	);
}

export default JsonEditorDrawer;
