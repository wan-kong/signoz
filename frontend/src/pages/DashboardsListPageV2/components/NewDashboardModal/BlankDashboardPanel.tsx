import { type ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line signoz/no-antd-components -- no @signozhq/ui multiline TextArea yet
import { Input as AntInput } from 'antd';
import { Button } from '@signozhq/ui/button';
import { Input } from '@signozhq/ui/input';
import { Typography } from '@signozhq/ui/typography';
import { toast } from '@signozhq/ui/sonner';
import { AxiosError } from 'axios';
import { generatePath } from 'react-router-dom';
import logEvent from 'api/common/logEvent';
import { createDashboardV2 } from 'api/generated/services/dashboard';
import ROUTES from 'constants/routes';
import { useSafeNavigate } from 'hooks/useSafeNavigate';
import { useErrorModal } from 'providers/ErrorModalProvider';
import { DashboardListEvents } from 'pages/DashboardsListPageV2/constants/events';
import APIError from 'types/api/error';
import TagKeyValueInput from 'components/TagKeyValueInput/TagKeyValueInput';

import { keyValueStringsToTags } from '../../utils/helpers';

import DashboardImagePicker from '../../../DashboardPageV2/DashboardContainer/DashboardSettings/Overview/DashboardImagePicker/DashboardImagePicker';
import { DEFAULT_DASHBOARD_ICON_PATH } from 'pages/DashboardPageV2/DashboardContainer/dashboardIcons';
import { DASHBOARD_NAME_MAX_LENGTH } from '../../../DashboardPageV2/DashboardContainer/constants';
import styles from './NewDashboardModal.module.scss';

const DEFAULT_NAME = 'Sample Dashboard';

interface Props {
	onClose: () => void;
}

function BlankDashboardPanel({ onClose }: Props): JSX.Element {
	const { t } = useTranslation('dashboard');
	const { safeNavigate } = useSafeNavigate();
	const { showErrorModal } = useErrorModal();

	const [name, setName] = useState(DEFAULT_NAME);
	const [description, setDescription] = useState('');
	const [image, setImage] = useState<string>(DEFAULT_DASHBOARD_ICON_PATH);
	const [tags, setTags] = useState<string[]>([]);
	const [submitting, setSubmitting] = useState(false);

	const canSubmit = name.trim().length > 0 && !submitting;

	const handleCreate = async (): Promise<void> => {
		if (!canSubmit) {
			return;
		}
		try {
			setSubmitting(true);
			void logEvent('Dashboard List: Create dashboard clicked', {});
			const postableTags = keyValueStringsToTags(tags);
			const created = await createDashboardV2({
				schemaVersion: 'v6',
				generateName: true,
				image,
				tags: postableTags.length ? postableTags : null,
				spec: {
					display: {
						name: name.trim(),
						description: description.trim() || undefined,
					},
					layouts: [],
					panels: {},
					variables: [],
				},
			});
			void logEvent(DashboardListEvents.DashboardCreated, {
				method: 'blank',
				hasDescription: Boolean(description.trim()),
				tagCount: postableTags.length,
				hasImage: Boolean(image),
			});
			onClose();
			safeNavigate(
				generatePath(ROUTES.DASHBOARD, { dashboardId: created.data.id }),
			);
		} catch (e) {
			showErrorModal(e as APIError);
			toast.error(
				(e as AxiosError).toString() ||
					t('dashboards_list_page_v2.new_dashboard.failed_to_create'),
			);
			setSubmitting(false);
		}
	};

	return (
		<div className={styles.panel}>
			<div className={styles.form}>
				<div className={styles.field}>
					<Typography.Text className={styles.label}>
						{t('dashboards_list_page_v2.fields.title')}{' '}
						<Typography.Text className={styles.required}>*</Typography.Text>
					</Typography.Text>
					<div className={styles.titleRow}>
						<DashboardImagePicker
							image={image}
							onChange={setImage}
							triggerClassName={styles.imageTrigger}
						/>
						<Input
							className={styles.titleInput}
							value={name}
							autoFocus
							maxLength={DASHBOARD_NAME_MAX_LENGTH}
							placeholder={t(
								'dashboards_list_page_v2.new_dashboard.title_placeholder',
							)}
							testId="create-dashboard-name"
							onChange={(e: ChangeEvent<HTMLInputElement>): void =>
								setName(e.target.value)
							}
							onKeyDown={(e): void => {
								if (e.key === 'Enter') {
									void handleCreate();
								}
							}}
						/>
					</div>
				</div>

				<div className={styles.field}>
					<Typography.Text className={styles.label}>
						{t('dashboards_list_page_v2.fields.description')}
					</Typography.Text>
					{/* eslint-disable-next-line signoz/no-antd-components -- no @signozhq TextArea yet */}
					<AntInput.TextArea
						value={description}
						rows={3}
						placeholder={t(
							'dashboards_list_page_v2.new_dashboard.description_placeholder',
						)}
						data-testid="create-dashboard-description"
						onChange={(e): void => setDescription(e.target.value)}
					/>
				</div>

				<div className={styles.field}>
					<Typography.Text className={styles.label}>
						{t('dashboards_list_page_v2.fields.tags')}
					</Typography.Text>
					<TagKeyValueInput
						tags={tags}
						onTagsChange={setTags}
						placeholder={t('dashboards_list_page_v2.new_dashboard.tags_placeholder')}
						testId="create-dashboard-tags"
					/>
					<Typography.Text className={styles.hint}>
						{t('dashboards_list_page_v2.new_dashboard.tags_hint')}
					</Typography.Text>
				</div>
			</div>

			<div className={styles.footer}>
				<Button
					variant="ghost"
					color="secondary"
					size="md"
					onClick={onClose}
					testId="create-dashboard-cancel"
				>
					{t('dashboards_list_page_v2.actions.cancel')}
				</Button>
				<Button
					variant="solid"
					color="primary"
					size="md"
					disabled={!canSubmit}
					testId="create-dashboard-submit"
					onClick={(): void => {
						void handleCreate();
					}}
				>
					{t('dashboards_list_page_v2.actions.create_dashboard')}
				</Button>
			</div>
		</div>
	);
}

export default BlankDashboardPanel;
