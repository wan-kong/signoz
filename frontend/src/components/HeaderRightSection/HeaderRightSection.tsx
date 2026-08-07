import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Dot, Globe, Inbox, SquarePen } from '@signozhq/icons';
import { Button } from '@signozhq/ui/button';
import { TooltipSimple } from '@signozhq/ui/tooltip';
import { Typography } from '@signozhq/ui/typography';
import { Popover } from 'antd';
import logEvent from 'api/common/logEvent';
import Noz from 'components/Noz/Noz';
import { NOZ_TOOLTIP_TITLE } from 'components/Noz/Noz.constants';
import { AIAssistantEvents } from 'container/AIAssistant/events';
import { normalizePage } from 'container/AIAssistant/hooks/useAIAssistantAnalyticsContext';
import {
	openAIAssistant,
	useAIAssistantStore,
} from 'container/AIAssistant/store/useAIAssistantStore';
import { selectPendingUserInputStreamCount } from 'container/AIAssistant/store/pendingInputSelectors';
import { useGetTenantLicense } from 'hooks/useGetTenantLicense';
import { useIsAIAssistantEnabled } from 'hooks/useIsAIAssistantEnabled';

import AnnouncementsModal from './AnnouncementsModal';
import FeedbackModal from './FeedbackModal';
import LanguageSelector from './LanguageSelector';
import ShareURLModal, { type ShareURLExtraOption } from './ShareURLModal';

import './HeaderRightSection.styles.scss';

interface HeaderRightSectionProps {
	enableAnnouncements: boolean;
	enableShare: boolean;
	enableFeedback: boolean;
	/** Optional page-specific toggle for the share dialog (e.g. "Include variables"). */
	shareModalExtraOption?: ShareURLExtraOption;
}

function HeaderRightSection({
	enableAnnouncements,
	enableShare,
	enableFeedback,
	shareModalExtraOption,
}: HeaderRightSectionProps): JSX.Element | null {
	const { t } = useTranslation('common');
	const location = useLocation();

	const [openFeedbackModal, setOpenFeedbackModal] = useState(false);
	const [openShareURLModal, setOpenShareURLModal] = useState(false);
	const [openAnnouncementsModal, setOpenAnnouncementsModal] = useState(false);

	const { isCloudUser, isEnterpriseSelfHostedUser } = useGetTenantLicense();
	const isAIAssistantEnabled = useIsAIAssistantEnabled();

	const handleOpenFeedbackModal = useCallback((): void => {
		void logEvent('Feedback: Clicked', {
			page: location.pathname,
		});

		setOpenFeedbackModal(true);
		setOpenShareURLModal(false);
		setOpenAnnouncementsModal(false);
	}, [location.pathname]);

	const handleOpenAIAssistant = useCallback((): void => {
		void logEvent(AIAssistantEvents.Opened, {
			source: 'header',
			currentPage: normalizePage(location.pathname),
		});
		openAIAssistant();
	}, [location.pathname]);

	const handleOpenShareURLModal = useCallback((): void => {
		void logEvent('Share: Clicked', {
			page: location.pathname,
		});

		setOpenShareURLModal(true);
		setOpenFeedbackModal(false);
		setOpenAnnouncementsModal(false);
	}, [location.pathname]);

	const handleCloseFeedbackModal = (): void => {
		setOpenFeedbackModal(false);
	};

	const handleOpenFeedbackModalChange = (open: boolean): void => {
		setOpenFeedbackModal(open);
	};

	const handleOpenAnnouncementsModalChange = (open: boolean): void => {
		setOpenAnnouncementsModal(open);
	};

	const handleOpenShareURLModalChange = (open: boolean): void => {
		setOpenShareURLModal(open);
	};

	const isLicenseEnabled = isEnterpriseSelfHostedUser || isCloudUser;
	const isDrawerOpen = useAIAssistantStore((s) => s.isDrawerOpen);
	const isModalOpen = useAIAssistantStore((s) => s.isModalOpen);
	const pendingUserInputCount: number = useAIAssistantStore(
		selectPendingUserInputStreamCount,
	);
	const showHeaderPendingBadge =
		pendingUserInputCount > 0 && !isDrawerOpen && !isModalOpen;

	return (
		<div className="header-right-section-container">
			{isAIAssistantEnabled && !isDrawerOpen && (
				<div className="header-ai-assistant-btn-container">
					{showHeaderPendingBadge ? (
						<span className="header-ai-assistant-btn__badge" aria-hidden>
							<span className="header-ai-assistant-btn__pulse-dot">
								<Dot size={36} />
							</span>
						</span>
					) : null}

					<TooltipSimple title={NOZ_TOOLTIP_TITLE}>
						<Button
							variant="solid"
							color="secondary"
							className="noz-wave"
							onClick={handleOpenAIAssistant}
							aria-label={
								showHeaderPendingBadge
									? pendingUserInputCount === 1
										? t('open_noz_one_action', 'Open Noz, 1 action needs your response')
										: t(
												'open_noz_many_actions',
												'Open Noz, {{count}} actions need your response',
												{
													count: pendingUserInputCount,
												},
											)
									: t('open_noz', 'Open Noz')
							}
							prefix={<Noz size={20} />}
						>
							<Typography.Text>Noz</Typography.Text>
						</Button>
					</TooltipSimple>
				</div>
			)}

			<LanguageSelector />

			{enableFeedback && isLicenseEnabled && (
				<Popover
					rootClassName="header-section-popover-root"
					className="shareable-link-popover"
					placement="bottomRight"
					content={<FeedbackModal onClose={handleCloseFeedbackModal} />}
					destroyTooltipOnHide
					arrow={false}
					trigger="click"
					open={openFeedbackModal}
					onOpenChange={handleOpenFeedbackModalChange}
				>
					<Button
						variant="ghost"
						size="icon"
						className="share-feedback-btn"
						aria-label={t('feedback', 'Feedback')}
						prefix={<SquarePen size={14} />}
						onClick={handleOpenFeedbackModal}
					/>
				</Popover>
			)}

			{enableAnnouncements && (
				<Popover
					rootClassName="header-section-popover-root"
					className="shareable-link-popover"
					placement="bottomRight"
					content={<AnnouncementsModal />}
					arrow={false}
					destroyTooltipOnHide
					trigger="click"
					open={openAnnouncementsModal}
					onOpenChange={handleOpenAnnouncementsModalChange}
				>
					<Button
						variant="ghost"
						size="icon"
						aria-label={t('announcements', 'Announcements')}
						prefix={<Inbox size={14} />}
						onClick={(): void => {
							void logEvent('Announcements: Clicked', {
								page: location.pathname,
							});
						}}
					/>
				</Popover>
			)}

			{enableShare && (
				<Popover
					rootClassName="header-section-popover-root"
					className="shareable-link-popover"
					placement="bottomRight"
					content={<ShareURLModal extraOption={shareModalExtraOption} />}
					open={openShareURLModal}
					destroyTooltipOnHide
					arrow={false}
					trigger="click"
					onOpenChange={handleOpenShareURLModalChange}
				>
					<Button
						variant="ghost"
						size="icon"
						aria-label={t('share', 'Share')}
						prefix={<Globe size={14} />}
						onClick={handleOpenShareURLModal}
					/>
				</Popover>
			)}
		</div>
	);
}

export default HeaderRightSection;
