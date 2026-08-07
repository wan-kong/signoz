import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Divider } from '@signozhq/ui/divider';
import { Plus, RefreshCw } from '@signozhq/icons';
import { Button } from '@signozhq/ui/button';
import { Typography } from '@signozhq/ui/typography';
import logEvent from 'api/common/logEvent';
import ROUTES from 'constants/routes';
import useComponentPermission from 'hooks/useComponentPermission';
import { useSafeNavigate } from 'hooks/useSafeNavigate';
import { useAppContext } from 'providers/App/App';
import { DataSource } from 'types/common/queryBuilder';
import { isModifierKeyPressed } from 'utils/app';

import alertEmojiUrl from '@/assets/Icons/alert_emoji.svg';

import AlertInfoCard from './AlertInfoCard';
import { ALERT_CARDS, ALERT_INFO_LINKS } from './alertLinks';
import InfoLinkText from './InfoLinkText';

import styles from './AlertsEmptyState.module.scss';

const alertLogEvents = (
	title: string,
	link: string,
	dataSource?: DataSource,
): void => {
	const attributes = {
		link,
		page: 'Alert empty state page',
	};

	void logEvent(title, dataSource ? { ...attributes, dataSource } : attributes);
};

interface AlertsEmptyStateProps {
	onRefresh?: () => void;
}

export function AlertsEmptyState({
	onRefresh,
}: AlertsEmptyStateProps): JSX.Element {
	const { t } = useTranslation('alerts');
	const { user } = useAppContext();
	const { safeNavigate } = useSafeNavigate();
	const [addNewAlert] = useComponentPermission(
		['add_new_alert', 'action'],
		user.role,
	);

	const [loading, setLoading] = useState(false);

	const onClickNewAlertHandler = useCallback(
		(e: React.MouseEvent) => {
			setLoading(false);
			safeNavigate(ROUTES.ALERTS_NEW, { newTab: isModifierKeyPressed(e) });
		},
		[safeNavigate],
	);

	return (
		<div className={styles.alertListContainer}>
			<div className={styles.alertListViewContent}>
				<div>
					<Typography.Title className={styles.title}>
						{t('alert_rules.title')}
					</Typography.Title>
					<Typography.Text className={styles.subtitle}>
						{t('alert_rules.subtitle')}
					</Typography.Text>
				</div>
				<section className={styles.emptyAlertInfoContainer}>
					<div className={styles.alertContent}>
						<section className={styles.heading}>
							<img
								src={alertEmojiUrl}
								alt={t('alert_header_alt')}
								style={{ height: '32px', width: '32px' }}
							/>
							<div>
								<Typography.Text className={styles.emptyInfo}>
									{t('alert_rules.empty.title')}{' '}
								</Typography.Text>
								<br />
								<Typography.Text className={styles.emptyAlertAction}>
									{t('alert_rules.empty.description')}
								</Typography.Text>
							</div>
						</section>
						<div className={styles.actionContainer}>
							<div className={styles.buttonGroup}>
								<Button
									onClick={onClickNewAlertHandler}
									disabled={!addNewAlert}
									loading={loading}
									testId="add-alert"
								>
									<span className={styles.buttonContent}>
										<Plus size="md" />
										{t('alert_rules.empty.new_alert_rule')}
									</span>
								</Button>
								{onRefresh && (
									<Button
										onClick={onRefresh}
										prefix={<RefreshCw />}
										color="secondary"
										testId="list-alerts-empty-refresh-button"
									>
										{t('refresh')}
									</Button>
								)}
							</div>
							<InfoLinkText
								infoText={t('alert_rules.empty.video_tutorial')}
								link="https://youtu.be/xjxNIqiv4_M"
								leftIconVisible
								rightIconVisible
								onClick={(): void =>
									alertLogEvents(
										'Alert: Video tutorial link clicked',
										'https://youtu.be/xjxNIqiv4_M',
									)
								}
							/>
						</div>

						{ALERT_INFO_LINKS.map((info) => {
							const logEventTriggered = (): void =>
								alertLogEvents(
									'Alert: Tutorial doc link clicked',
									info.link,
									info.dataSource,
								);
							return (
								<InfoLinkText
									key={info.link}
									infoText={t(info.infoTextKey)}
									link={info.link}
									leftIconVisible={info.leftIconVisible}
									rightIconVisible={info.rightIconVisible}
									onClick={logEventTriggered}
								/>
							);
						})}
					</div>
				</section>
				<div className={styles.getStartedText}>
					<Divider className="get-started-text__divider">
						<Typography.Text>
							{t('alert_rules.empty.sample_alerts_title')}
						</Typography.Text>
					</Divider>
				</div>

				{ALERT_CARDS.map((card) => {
					const logEventTriggered = (): void =>
						alertLogEvents(
							'Alert: Sample alert link clicked',
							card.link,
							card.dataSource,
						);
					return (
						<AlertInfoCard
							key={card.link}
							header={t(card.headerKey)}
							subheader={t(card.subheaderKey)}
							link={card.link}
							onClick={logEventTriggered}
						/>
					);
				})}
			</div>
		</div>
	);
}
