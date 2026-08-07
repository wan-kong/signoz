import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@signozhq/ui/button';
import { DrawerWrapper } from '@signozhq/ui/drawer';
import { SelectSimple } from '@signozhq/ui/select';
import {
	closestCenter,
	DndContext,
	DragEndEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
	arrayMove,
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Plus, Trash2 } from '@signozhq/icons';
import { v4 as uuid } from 'uuid';

import KeySearchInput from '../KeySearchInput/KeySearchInput';
import styles from './MapperFormDrawer.module.scss';
import SourceAttributeRow from './components/SourceAttributeRow/SourceAttributeRow';
import {
	FieldContext,
	FieldContextValue,
	MapperDraft,
	MapperDraftMode,
	SourceConfig,
} from '../../types';
import { createEmptySource, isMapperDraftValid } from '../../utils';

interface MapperFormDrawerProps {
	isOpen: boolean;
	mode: MapperDraftMode;
	draft: MapperDraft;
	setDraft: (next: MapperDraft) => void;
	onClose: () => void;
	onSave: () => void;
	onDelete: () => void;
	isSaving: boolean;
	isDeleting: boolean;
	saveError: string | null;
}

function MapperFormDrawer({
	isOpen,
	mode,
	draft,
	setDraft,
	onClose,
	onSave,
	onDelete,
	isSaving,
	isDeleting,
	saveError,
}: MapperFormDrawerProps): JSX.Element {
	const { t } = useTranslation('llm');
	const isEdit = mode === 'edit';
	const isValid = isMapperDraftValid(draft);

	const FIELD_CONTEXT_OPTIONS = [
		{
			value: FieldContext.attribute,
			label: t('mapper_form_drawer.span_attribute', 'Span attribute'),
		},
		{
			value: FieldContext.resource,
			label: t('mapper_form_drawer.resource', 'Resource'),
		},
	];

	const [rowIds, setRowIds] = useState<string[]>(() =>
		draft.sources.map(() => uuid()),
	);
	const sourceIds = draft.sources.map(
		(_, index) => rowIds[index] ?? `pending-${index}`,
	);

	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
	);

	const updateSource = (index: number, patch: Partial<SourceConfig>): void => {
		const sources = draft.sources.map((source, i) =>
			i === index ? { ...source, ...patch } : source,
		);
		setDraft({ ...draft, sources });
	};

	const addSource = (): void => {
		setDraft({ ...draft, sources: [...draft.sources, createEmptySource()] });
		setRowIds((prev) => [...prev, uuid()]);
	};

	const removeSource = (index: number): void => {
		const sources = draft.sources.filter((_, i) => i !== index);
		if (sources.length === 0) {
			setDraft({ ...draft, sources: [createEmptySource()] });
			setRowIds([uuid()]);
			return;
		}
		setDraft({ ...draft, sources });
		setRowIds((prev) => prev.filter((_, i) => i !== index));
	};

	const handleDragEnd = (event: DragEndEvent): void => {
		const { active, over } = event;
		if (!over || active.id === over.id) {
			return;
		}
		const from = sourceIds.indexOf(String(active.id));
		const to = sourceIds.indexOf(String(over.id));
		if (from === -1 || to === -1) {
			return;
		}
		setDraft({ ...draft, sources: arrayMove(draft.sources, from, to) });
		setRowIds((prev) => arrayMove(prev, from, to));
	};

	return (
		<DrawerWrapper
			open={isOpen}
			onOpenChange={(open): void => {
				if (!open) {
					onClose();
				}
			}}
			title={
				isEdit
					? t('mapper_form_drawer.title_edit', 'Edit mapping')
					: t('mapper_form_drawer.title_new', 'New custom mapping')
			}
			subTitle={t(
				'mapper_form_drawer.subtitle',
				'Map source attributes onto a canonical target attribute',
			)}
			width="wide"
			testId="mapper-form-drawer"
			footer={
				<div className={styles.footer}>
					{isEdit && (
						<Button
							variant="ghost"
							color="destructive"
							prefix={<Trash2 size={14} />}
							onClick={onDelete}
							disabled={isDeleting}
							testId="mapper-form-delete"
						>
							{isDeleting
								? t('mapper_form_drawer.deleting', 'Deleting…')
								: t('mapper_form_drawer.delete', 'Delete')}
						</Button>
					)}
					<div className={styles.footerActions}>
						<Button
							variant="ghost"
							color="secondary"
							onClick={onClose}
							testId="mapper-form-cancel"
						>
							{t('mapper_form_drawer.cancel', 'Cancel')}
						</Button>
						<Button
							variant="solid"
							color="primary"
							onClick={onSave}
							disabled={!isValid || isSaving}
							testId="mapper-form-save"
						>
							{/* eslint-disable-next-line no-nested-ternary */}
							{isSaving
								? t('mapper_form_drawer.saving', 'Saving…')
								: isEdit
									? t('mapper_form_drawer.save_mapping', 'Save mapping')
									: t('mapper_form_drawer.create_mapping', 'Create mapping')}
						</Button>
					</div>
				</div>
			}
		>
			<div className={styles.form}>
				<div className={styles.field}>
					<span className={styles.label}>
						{t('mapper_form_drawer.target_attribute', 'Target attribute')}
					</span>
					<KeySearchInput
						placeholder={t(
							'mapper_form_drawer.target_placeholder',
							'e.g. gen_ai.content.prompt',
						)}
						value={draft.name}
						fieldContext={draft.fieldContext}
						disabled={isEdit}
						onChange={(name): void => setDraft({ ...draft, name })}
						testId="mapper-form-target"
					/>
					{isEdit && (
						<span className={styles.hint}>
							{t(
								'mapper_form_drawer.target_read_only_hint',
								"The target attribute can't be changed after creation.",
							)}
						</span>
					)}
				</div>

				<div className={styles.field}>
					<span className={styles.label}>
						{t('mapper_form_drawer.write_target_to', 'Write target to')}
					</span>
					<SelectSimple
						className={styles.fieldContext}
						items={FIELD_CONTEXT_OPTIONS}
						value={draft.fieldContext}
						withPortal={false}
						onChange={(next): void =>
							setDraft({ ...draft, fieldContext: next as FieldContextValue })
						}
						testId="mapper-form-field-context"
					/>
					<span className={styles.hint}>
						{t(
							'mapper_form_drawer.write_target_to_hint',
							'Where the standardized attribute is written.',
						)}
					</span>
				</div>

				<div className={styles.field}>
					<span className={styles.label}>
						{t('mapper_form_drawer.source_attributes', 'Source attributes')}
						<span className={styles.labelHint}>
							{' '}
							{t(
								'mapper_form_drawer.priority_hint',
								'· priority: top → bottom · drag to reorder',
							)}
						</span>
					</span>

					<DndContext
						sensors={sensors}
						collisionDetection={closestCenter}
						modifiers={[restrictToVerticalAxis]}
						onDragEnd={handleDragEnd}
					>
						<SortableContext items={sourceIds} strategy={verticalListSortingStrategy}>
							<div className={styles.sources}>
								{draft.sources.map((source, index) => (
									<SourceAttributeRow
										key={sourceIds[index]}
										id={sourceIds[index]}
										index={index}
										value={source}
										canRemove={draft.sources.length > 1}
										onChange={updateSource}
										onRemove={removeSource}
									/>
								))}
							</div>
						</SortableContext>
					</DndContext>

					<Button
						variant="dashed"
						color="secondary"
						prefix={<Plus size={14} />}
						onClick={addSource}
						testId="mapper-form-add-source"
					>
						{t('mapper_form_drawer.add_another_source', 'Add another source')}
					</Button>
				</div>

				{saveError && (
					<div className={styles.error} role="alert">
						{saveError}
					</div>
				)}
			</div>
		</DrawerWrapper>
	);
}

export default MapperFormDrawer;
