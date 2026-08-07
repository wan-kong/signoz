import { useTranslation } from 'react-i18next';
import { Button } from '@signozhq/ui/button';
import { DrawerWrapper } from '@signozhq/ui/drawer';
import { Input } from '@signozhq/ui/input';
import { Switch } from '@signozhq/ui/switch';

import ConditionKeyList from './components/ConditionKeyList/ConditionKeyList';
import styles from './GroupFormDrawer.module.scss';
import { FieldContext, GroupDraft, MapperDraftMode } from '../../types';
import { isGroupDraftValid } from '../../utils';

interface GroupFormDrawerProps {
	isOpen: boolean;
	mode: MapperDraftMode;
	draft: GroupDraft;
	setDraft: (next: GroupDraft) => void;
	onClose: () => void;
	onSave: () => void;
}

function GroupFormDrawer({
	isOpen,
	mode,
	draft,
	setDraft,
	onClose,
	onSave,
}: GroupFormDrawerProps): JSX.Element {
	const { t } = useTranslation('common');
	const isEdit = mode === 'edit';
	const isValid = isGroupDraftValid(draft);

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
					? t('llm_observability.edit_group', 'Edit group')
					: t('llm_observability.new_group', 'New group')
			}
			subTitle={t(
				'llm_observability.group_subtitle',
				'A group gates which spans its mappings run on',
			)}
			width="wide"
			testId="group-form-drawer"
			footer={
				<div className={styles.groupFormFooter}>
					<Button
						variant="ghost"
						color="secondary"
						onClick={onClose}
						testId="group-form-cancel"
					>
						{t('cancel', 'Cancel')}
					</Button>
					<Button
						variant="solid"
						color="primary"
						onClick={onSave}
						disabled={!isValid}
						testId="group-form-save"
					>
						{isEdit
							? t('llm_observability.save_group', 'Save group')
							: t('llm_observability.create_group', 'Create group')}
					</Button>
				</div>
			}
		>
			<div className={styles.groupForm}>
				<div className={styles.groupFormField}>
					<span className={styles.groupFormLabel}>
						{t('llm_observability.group_name', 'Group Name')}
					</span>
					<Input
						placeholder={t(
							'llm_observability.group_name_placeholder',
							'e.g. OpenAI gateway',
						)}
						value={draft.name}
						onChange={(event): void =>
							setDraft({ ...draft, name: event.target.value })
						}
						testId="group-form-name"
					/>
				</div>

				<div className={`${styles.groupFormField} ${styles.groupFormFieldRow}`}>
					<span className={styles.groupFormLabel}>
						{t('llm_observability.enabled', 'Enabled')}
					</span>
					<Switch
						value={draft.enabled}
						onChange={(checked): void => setDraft({ ...draft, enabled: checked })}
						testId="group-form-enabled"
					/>
				</div>

				<ConditionKeyList
					label={t(
						'llm_observability.condition_span_attribute_keys',
						'Condition · span attribute keys',
					)}
					labelHint={t(
						'llm_observability.condition_span_hint',
						'·Runs when a span attribute key contains any of these',
					)}
					keys={draft.attributes}
					placeholder={t('llm_observability.attribute_placeholder', 'e.g. gen_ai.')}
					addLabel={t('llm_observability.add_attribute_key', 'Add attribute key')}
					testIdPrefix="group-form-attribute"
					fieldContext={FieldContext.attribute}
					onChange={(attributes): void => setDraft({ ...draft, attributes })}
				/>

				<ConditionKeyList
					label={t(
						'llm_observability.condition_resource_keys',
						'Condition · resource keys',
					)}
					labelHint={t(
						'llm_observability.condition_resource_hint',
						'·Or when a resource key contains any of these',
					)}
					keys={draft.resource}
					placeholder={t(
						'llm_observability.resource_placeholder',
						'e.g. service.name',
					)}
					addLabel={t('llm_observability.add_resource_key', 'Add resource key')}
					testIdPrefix="group-form-resource"
					fieldContext={FieldContext.resource}
					onChange={(resource): void => setDraft({ ...draft, resource })}
				/>

				<span className={styles.groupFormHint}>
					{t(
						'llm_observability.empty_hint',
						'Leave both empty to run this group on every span.',
					)}
				</span>
			</div>
		</DrawerWrapper>
	);
}

export default GroupFormDrawer;
