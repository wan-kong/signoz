import { type ChangeEvent, useCallback, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import logEvent from 'api/common/logEvent';
import { Button } from '@signozhq/ui/button';
import { Input } from '@signozhq/ui/input';
import { Typography } from '@signozhq/ui/typography';
import { Bookmark, PenLine, Plus, Search, Trash2 } from '@signozhq/icons';
import cx from 'classnames';

import { useDeleteConfirm } from 'components/DeleteConfirmModal/useDeleteConfirm';
import { DashboardListEvents } from 'pages/DashboardsListPageV2/constants/events';

import type { SavedView } from '../../types';
import { type BuiltinView } from '../../utils/views';
import ViewNamePopover from './ViewNamePopover';

import styles from './ViewsRail.module.scss';

interface Props {
	activeViewId: string;
	builtinViews: BuiltinView[];
	customViews: SavedView[];
	customViewsLoading: boolean;
	isCustomActive: boolean;
	isModified: boolean;
	collapsed?: boolean;
	// Edit permission. Viewers can select views but not add / rename / delete / save.
	canEdit: boolean;
	onSelect: (id: string) => void;
	onSave: (name: string) => void;
	onSaveChanges: () => void;
	onReset: () => void;
	onDelete: (id: string) => Promise<void>;
	onRename: (id: string, name: string) => void;
}

interface ViewRow {
	id: string;
	label: string;
	icon: BuiltinView['icon'];
	deletable?: boolean;
}

// Purely presentational — active view, dirty state, and handlers come from
// `useActiveView`.
function ViewsRail({
	activeViewId,
	builtinViews,
	customViews,
	customViewsLoading,
	isCustomActive,
	isModified,
	collapsed = false,
	canEdit,
	onSelect,
	onSave,
	onSaveChanges,
	onReset,
	onDelete,
	onRename,
}: Props): JSX.Element {
	const { t } = useTranslation('dashboard');
	const [saveOpen, setSaveOpen] = useState(false);
	const [renamingId, setRenamingId] = useState<string | null>(null);
	const [query, setQuery] = useState('');
	const { contextHolder, confirmDelete } = useDeleteConfirm();

	const q = query.trim().toLowerCase();
	const matchesQuery = (label: string): boolean =>
		!q || label.toLowerCase().includes(q);

	const personal = builtinViews.filter(
		(v) => v.section === 'personal' && matchesQuery(t(v.labelKey)),
	);
	const system = builtinViews.filter(
		(v) => v.section === 'system' && matchesQuery(t(v.labelKey)),
	);
	const custom = customViews.filter((v) => matchesQuery(v.name));
	const noMatches =
		!!q && personal.length === 0 && system.length === 0 && custom.length === 0;

	const onConfirmDelete = useCallback(
		(id: string, label: string): void => {
			confirmDelete({
				title: (
					<Typography.Title level={5}>
						<Trans
							t={t}
							i18nKey="dashboards_list_page_v2.views.delete_confirm_title"
							values={{ name: label }}
							components={{
								name: <Typography.Text className={styles.deleteName} />,
							}}
						/>
					</Typography.Title>
				),
				content: t('dashboards_list_page_v2.views.delete_confirm_content'),
				// Return the delete promise so the modal's Delete button stays loading
				// until the backend call settles, then closes — matching dashboard delete.
				onConfirm: (): Promise<void> => {
					void logEvent(DashboardListEvents.ViewDeleted, {});
					return onDelete(id);
				},
			});
		},
		[confirmDelete, onDelete, t],
	);

	const handleSaveAsView = (name: string): void => {
		void logEvent(DashboardListEvents.ViewSaved, { mode: 'new' });
		onSave(name);
	};

	const handleSaveViewChanges = (): void => {
		void logEvent(DashboardListEvents.ViewSaved, { mode: 'update' });
		onSaveChanges();
	};

	const renderItem = (row: ViewRow): JSX.Element => {
		const Icon = row.icon;
		const active = row.id === activeViewId;
		return (
			<div key={row.id} className={cx(styles.row, { [styles.rowActive]: active })}>
				<Button
					variant="ghost"
					color="secondary"
					className={styles.item}
					onClick={(): void => onSelect(row.id)}
					testId={`dashboards-view-${row.id}`}
				>
					<Icon size={16} className={styles.itemIcon} />
					<Typography.Text className={styles.itemLabel}>{row.label}</Typography.Text>
					{active && isModified && (
						<div
							className={styles.dirtyDot}
							title={t('dashboards_list_page_v2.unsaved_changes')}
						/>
					)}
				</Button>
				{canEdit && row.deletable && (
					<div className={styles.itemActions}>
						<ViewNamePopover
							open={renamingId === row.id}
							onOpenChange={(open): void => setRenamingId(open ? row.id : null)}
							onSubmit={(name): void => {
								void logEvent(DashboardListEvents.ViewRenamed, {});
								onRename(row.id, name);
							}}
							title={t('dashboards_list_page_v2.views.rename_view')}
							confirmLabel={t('dashboards_list_page_v2.actions.rename')}
							initialName={row.label}
							testIdPrefix="rename-view"
							trigger={
								<Button
									variant="ghost"
									color="secondary"
									size="icon"
									className={styles.itemAction}
									aria-label={t('dashboards_list_page_v2.views.rename_view')}
									title={t('dashboards_list_page_v2.views.rename_view')}
									onClick={(e): void => e.stopPropagation()}
								>
									<PenLine size={12} />
								</Button>
							}
						/>
						<Button
							variant="ghost"
							color="secondary"
							size="icon"
							className={cx(styles.itemAction, styles.itemActionDanger)}
							aria-label={t('dashboards_list_page_v2.views.delete_view')}
							title={t('dashboards_list_page_v2.views.delete_view')}
							onClick={(e): void => {
								e.stopPropagation();
								onConfirmDelete(row.id, row.label);
							}}
						>
							<Trash2 size={12} />
						</Button>
					</div>
				)}
			</div>
		);
	};

	return (
		<aside className={cx(styles.rail, { [styles.collapsed]: collapsed })}>
			<div className={styles.header}>
				<h4 className={styles.headerTitle}>
					{t('dashboards_list_page_v2.views.title')}
				</h4>
				{canEdit && (
					<ViewNamePopover
						open={saveOpen}
						onOpenChange={setSaveOpen}
						onSubmit={handleSaveAsView}
						title={t('dashboards_list_page_v2.views.save_as_view')}
						confirmLabel={t('dashboards_list_page_v2.views.save_view')}
						testIdPrefix="save-view"
						trigger={
							<Button
								variant="ghost"
								color="secondary"
								size="icon"
								title={t('dashboards_list_page_v2.views.save_current_filters_as_view')}
								testId="dashboards-view-save-trigger"
							>
								<Plus size={14} />
							</Button>
						}
					/>
				)}
			</div>

			<div className={styles.search}>
				<Input
					value={query}
					placeholder={t('dashboards_list_page_v2.views.filter_placeholder')}
					prefix={<Search size={12} />}
					testId="dashboards-view-search"
					onChange={(e: ChangeEvent<HTMLInputElement>): void =>
						setQuery(e.target.value)
					}
				/>
			</div>

			<div className={styles.scroll}>
				{personal.length > 0 && (
					<>
						<div className={styles.groupLabel}>
							{t('dashboards_list_page_v2.views.personal')}
						</div>
						{personal.map((v) => renderItem({ ...v, label: t(v.labelKey) }))}
					</>
				)}

				{system.length > 0 && (
					<>
						<div className={cx(styles.groupLabel, styles.groupLabelSpaced)}>
							{t('dashboards_list_page_v2.views.system')}
						</div>
						{system.map((v) => renderItem({ ...v, label: t(v.labelKey) }))}
					</>
				)}

				{(!q || custom.length > 0) && (
					<>
						<div className={cx(styles.groupLabel, styles.groupLabelSpaced)}>
							{t('dashboards_list_page_v2.views.my_views')}
							<Typography.Text className={styles.groupCount}>
								{customViews.length}
							</Typography.Text>
						</div>
						{customViewsLoading ? (
							<div className={styles.empty}>
								{t('dashboards_list_page_v2.views.loading_views')}
							</div>
						) : customViews.length === 0 ? (
							<div className={styles.empty}>
								{t('dashboards_list_page_v2.views.no_saved_views')}
							</div>
						) : (
							custom.map((v) =>
								renderItem({
									id: v.id,
									label: v.name,
									icon: Bookmark,
									deletable: true,
								}),
							)
						)}
					</>
				)}

				{noMatches && (
					<div className={styles.searchEmpty}>
						{t('dashboards_list_page_v2.views.no_views_match', { query })}
					</div>
				)}
			</div>

			{isCustomActive && isModified && (
				<div className={styles.dirtyPanel}>
					<div className={styles.dirtyTitle}>
						{t('dashboards_list_page_v2.unsaved_changes')}
					</div>
					<div className={styles.dirtyActions}>
						{canEdit && (
							<>
								<Button
									variant="solid"
									color="primary"
									size="sm"
									onClick={handleSaveViewChanges}
									testId="dashboards-view-save-changes"
								>
									{t('dashboards_list_page_v2.actions.save')}
								</Button>
								<Button
									variant="outlined"
									color="secondary"
									size="sm"
									onClick={(): void => setSaveOpen(true)}
								>
									{t('dashboards_list_page_v2.actions.save_as_ellipsis')}
								</Button>
							</>
						)}
						<Button variant="ghost" color="secondary" size="sm" onClick={onReset}>
							{t('dashboards_list_page_v2.actions.reset')}
						</Button>
					</div>
				</div>
			)}

			{!isCustomActive && isModified && (
				<div className={cx(styles.dirtyPanel, styles.dirtyPanelDefault)}>
					<div className={styles.dirtyTitle}>
						{t('dashboards_list_page_v2.filters_active')}
					</div>
					<div className={styles.dirtyActions}>
						{canEdit && (
							<Button
								variant="solid"
								color="primary"
								size="sm"
								prefix={<Plus size={12} />}
								onClick={(): void => setSaveOpen(true)}
								testId="dashboards-view-save-as-new"
							>
								{t('dashboards_list_page_v2.views.save_as_new_view')}
							</Button>
						)}
						<Button variant="ghost" color="secondary" size="sm" onClick={onReset}>
							{t('dashboards_list_page_v2.actions.reset')}
						</Button>
					</div>
				</div>
			)}
			{contextHolder}
		</aside>
	);
}

export default ViewsRail;
