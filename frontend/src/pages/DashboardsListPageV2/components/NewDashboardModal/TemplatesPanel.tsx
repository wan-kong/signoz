import { type ChangeEvent, type KeyboardEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	Check,
	LayoutDashboard,
	LoaderCircle,
	SquareArrowOutUpRight,
} from '@signozhq/icons';
import { Button } from '@signozhq/ui/button';
import { Input } from '@signozhq/ui/input';
import { toast } from '@signozhq/ui/sonner';
import { Typography } from '@signozhq/ui/typography';
import logEvent from 'api/common/logEvent';
import { useGetTenantLicense } from 'hooks/useGetTenantLicense';

import styles from './NewDashboardModal.module.scss';

const TEMPLATES_DOCS_URL =
	'https://signoz.io/docs/dashboards/dashboard-templates/overview/';

// Templates aren't served by the BE yet, so this tab is a browse-and-request
// placeholder: link out to the published template library, and let cloud users
// request one we haven't built.
function TemplatesPanel(): JSX.Element {
	const { t } = useTranslation('dashboard');
	const { isCloudUser } = useGetTenantLicense();
	const [name, setName] = useState('');
	const [submitting, setSubmitting] = useState(false);

	const requestName = name.trim();

	const handleRequest = async (): Promise<void> => {
		if (!requestName || submitting) {
			return;
		}
		try {
			setSubmitting(true);
			const response = await logEvent('Dashboard Requested', {
				screen: 'Dashboard list page',
				dashboard: requestName,
			});
			if (response.statusCode === 200) {
				toast.success(t('dashboards_list_page_v2.new_dashboard.request_submitted'));
				setName('');
			} else {
				toast.error(
					response.error || t('dashboards_list_page_v2.errors.something_went_wrong'),
				);
			}
		} catch {
			toast.error(t('dashboards_list_page_v2.errors.something_went_wrong'));
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className={styles.templatesPanel}>
			<span className={styles.templatesIcon}>
				<LayoutDashboard size={20} />
			</span>
			<Typography variant="title" size="lg" weight="semibold">
				{t('dashboards_list_page_v2.new_dashboard.templates_title')}
			</Typography>
			<Typography
				variant="text"
				size="sm"
				color="muted"
				className={styles.templatesDesc}
			>
				{t('dashboards_list_page_v2.new_dashboard.templates_description')}
			</Typography>

			<a
				className={styles.browseLink}
				href={TEMPLATES_DOCS_URL}
				target="_blank"
				rel="noopener noreferrer"
			>
				{t('dashboards_list_page_v2.new_dashboard.browse_templates')}
				<SquareArrowOutUpRight size={14} />
			</a>

			{isCloudUser && (
				<div className={styles.requestForm}>
					<Typography
						variant="text"
						size="sm"
						weight="semibold"
						className={styles.requestHeader}
					>
						{t('dashboards_list_page_v2.new_dashboard.request_new_template')}
					</Typography>
					<div className={styles.requestRow}>
						<Input
							className={styles.requestInput}
							placeholder={t(
								'dashboards_list_page_v2.new_dashboard.enter_dashboard_name',
							)}
							value={name}
							testId="request-dashboard-name"
							onChange={(e: ChangeEvent<HTMLInputElement>): void =>
								setName(e.target.value)
							}
							onKeyDown={(e: KeyboardEvent<HTMLInputElement>): void => {
								if (e.key === 'Enter') {
									void handleRequest();
								}
							}}
						/>
						<Button
							variant="solid"
							color="primary"
							size="md"
							disabled={submitting || requestName.length === 0}
							testId="request-dashboard-submit"
							prefix={
								submitting ? (
									<LoaderCircle size={14} className={styles.spinner} />
								) : (
									<Check size={14} />
								)
							}
							onClick={(): void => {
								void handleRequest();
							}}
						>
							{t('dashboards_list_page_v2.actions.submit')}
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

export default TemplatesPanel;
