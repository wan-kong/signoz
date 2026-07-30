import { useCallback, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { toast } from '@signozhq/ui/sonner';
import { Button, Input } from 'antd';
import { ToggleGroupSimple } from '@signozhq/ui/toggle-group';
import { Typography } from '@signozhq/ui/typography';
import logEvent from 'api/common/logEvent';
import { handleContactSupport } from 'container/Integrations/utils';
import { useGetTenantLicense } from 'hooks/useGetTenantLicense';

function FeedbackModal({ onClose }: { onClose: () => void }): JSX.Element {
	const { t } = useTranslation('common');
	const [activeTab, setActiveTab] = useState('feedback');
	const [feedback, setFeedback] = useState('');
	const location = useLocation();
	const { isCloudUser: isCloudUserVal } = useGetTenantLicense();
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (): Promise<void> => {
		setIsLoading(true);

		let entityName = 'Feedback';
		if (activeTab === 'reportBug') {
			entityName = t('bug_report');
		} else if (activeTab === 'featureRequest') {
			entityName = t('feature_request');
		} else {
			entityName = t('feedback');
		}

		try {
			await logEvent('Feedback: Submitted', {
				data: feedback,
				type: activeTab,
				page: location.pathname,
			});

			onClose();

			toast.success(
				t('feedback_submit_success', {
					entity: entityName,
				}),
				{
					position: 'top-right',
				},
			);
		} catch {
			console.error(`Failed to submit ${entityName}`);
			toast.error(
				t('feedback_submit_error', {
					entity: entityName,
				}),
				{
					position: 'top-right',
				},
			);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(
		() => (): void => {
			setFeedback('');
			setActiveTab('feedback');
		},
		[],
	);

	const items = [
		{
			label: (
				<div className="feedback-modal-tab-label">
					<div className="tab-icon dot feedback-tab" />
					{t('feedback')}
				</div>
			),
			key: 'feedback',
			value: 'feedback',
		},
		{
			label: (
				<div className="feedback-modal-tab-label">
					<div className="tab-icon dot bug-tab" />
					{t('report_a_bug')}
				</div>
			),
			key: 'reportBug',
			value: 'reportBug',
		},
		{
			label: (
				<div className="feedback-modal-tab-label">
					<div className="tab-icon dot feature-tab" />
					{t('feature_request')}
				</div>
			),
			key: 'featureRequest',
			value: 'featureRequest',
		},
	];

	const handleFeedbackChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>,
	): void => {
		setFeedback(e.target.value);
	};

	const handleContactSupportClick = useCallback((): void => {
		handleContactSupport(isCloudUserVal);
	}, [isCloudUserVal]);

	return (
		<div className="feedback-modal-container">
			<div className="feedback-modal-header">
				<ToggleGroupSimple
					type="single"
					value={activeTab}
					className="feedback-modal-tabs"
					onChange={setActiveTab}
					items={items}
				/>
			</div>
			<div className="feedback-modal-content">
				<div className="feedback-modal-content-header">
					<Input.TextArea
						placeholder={t('write_feedback_placeholder')}
						rows={6}
						required
						className="feedback-input"
						value={feedback}
						onChange={handleFeedbackChange}
					/>
				</div>
			</div>

			<div className="feedback-modal-content-footer">
				<Button
					className="periscope-btn primary"
					type="primary"
					onClick={handleSubmit}
					loading={isLoading}
					disabled={feedback.length === 0}
				>
					{t('submit')}
				</Button>
				<div className="feedback-modal-content-footer-info-text">
					<Typography.Text>
						<Trans
							t={t}
							i18nKey="feedback_footer_help"
							components={{
								supportLink: (
									<Typography.Link
										className="contact-support-link"
										onClick={handleContactSupportClick}
									>
										{t('contact_support')}
									</Typography.Link>
								),
								docsLink: (
									<a
										href="https://signoz.io/docs/introduction/"
										target="_blank"
										rel="noreferrer"
										className="read-docs-link"
									>
										{t('read_our_docs')}
									</a>
								),
							}}
						/>
					</Typography.Text>
				</div>
			</div>
		</div>
	);
}

export default FeedbackModal;
