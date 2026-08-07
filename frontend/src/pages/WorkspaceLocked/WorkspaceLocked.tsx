/* eslint-disable react/no-unescaped-entities */
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import type { TabsProps } from 'antd';
import {
	Alert,
	Button,
	Col,
	Collapse,
	Flex,
	List,
	Modal,
	Row,
	Skeleton,
	Space,
	Tabs,
} from 'antd';
import { Typography } from '@signozhq/ui/typography';
import logEvent from 'api/common/logEvent';
import updateCreditCardApi from 'api/v1/checkout/create';
import RefreshPaymentStatus from 'components/RefreshPaymentStatus/RefreshPaymentStatus';
import ROUTES from 'constants/routes';
import { useNotifications } from 'hooks/useNotifications';
import { useSafeNavigate } from 'hooks/useSafeNavigate';
import history from 'lib/history';
import { CircleArrowRight } from '@signozhq/icons';
import { useAppContext } from 'providers/App/App';
import APIError from 'types/api/error';
import { LicensePlatform } from 'types/api/licensesV3/getActive';
import { isModifierKeyPressed } from 'utils/app';
import { getBaseUrl } from 'utils/basePath';
import { getFormattedDate } from 'utils/timeUtils';

import CustomerStoryCard from './CustomerStoryCard';
import InfoBlocks from './InfoBlocks';
import {
	customerStoriesData,
	enterpriseGradeValuesData,
	faqData,
	infoData,
} from './workspaceLocked.data';

import './WorkspaceLocked.styles.scss';

export default function WorkspaceBlocked(): JSX.Element {
	const { user, isFetchingActiveLicense, trialInfo, activeLicense } =
		useAppContext();
	const isAdmin = user.role === 'ADMIN';
	const { notifications } = useNotifications();
	const { safeNavigate } = useSafeNavigate();

	const { t } = useTranslation(['workspaceLocked']);

	useEffect((): void => {
		void logEvent('Workspace Blocked: Screen Viewed', {});
	}, []);

	const handleContactUsClick = (): void => {
		void logEvent('Workspace Blocked: Contact Us Clicked', {});
	};

	const handleTabClick = (key: string): void => {
		void logEvent('Workspace Blocked: Screen Tabs Clicked', { tabKey: key });
	};

	const handleCollapseChange = (key: string | string[]): void => {
		const lastKey = Array.isArray(key) ? key.slice(-1)[0] : key;
		void logEvent('Workspace Blocked: Screen Tab FAQ Item Clicked', {
			panelKey: lastKey,
		});
	};

	useEffect(() => {
		if (!isFetchingActiveLicense) {
			const shouldBlockWorkspace = trialInfo?.workSpaceBlock;

			if (
				!shouldBlockWorkspace ||
				activeLicense?.platform === LicensePlatform.SELF_HOSTED
			) {
				history.push(ROUTES.HOME);
			}
		}
	}, [
		isFetchingActiveLicense,
		trialInfo?.workSpaceBlock,
		activeLicense?.platform,
	]);

	const { mutate: updateCreditCard, isLoading } = useMutation(
		updateCreditCardApi,
		{
			onSuccess: (data) => {
				if (data.data?.redirectURL) {
					const newTab = document.createElement('a');
					newTab.href = data.data.redirectURL;
					newTab.target = '_blank';
					newTab.rel = 'noopener noreferrer';
					newTab.click();
				}
			},
			onError: (error: APIError) =>
				notifications.error({
					message: error.getErrorCode(),
					description: error.getErrorMessage(),
				}),
		},
	);

	const handleUpdateCreditCard = useCallback(async () => {
		void logEvent('Workspace Blocked: User Clicked Update Credit Card', {});

		updateCreditCard({
			url: getBaseUrl(),
		});
	}, [updateCreditCard]);

	const handleExtendTrial = (): void => {
		void logEvent('Workspace Blocked: User Clicked Extend Trial', {});

		notifications.info({
			message: t('extendTrial', 'Extend Trial'),
			duration: 0,
			description: (
				<Typography>
					{t(
						'extendTrialMsgPart1',
						'If you have a specific reason why you were not able to finish your PoC in the trial period, please write to us on',
					)}{' '}
					<a href="mailto:cloud-support@signoz.io">cloud-support@signoz.io</a>{' '}
					{t(
						'extendTrialMsgPart2',
						'with the reason. Sometimes we can extend trial by a few days on a case by case basis',
					)}
				</Typography>
			),
		});
	};

	const handleViewBilling = (e?: React.MouseEvent): void => {
		void logEvent('Workspace Blocked: User Clicked View Billing', {});

		safeNavigate(ROUTES.BILLING, { newTab: !!e && isModifierKeyPressed(e) });
	};

	const renderCustomerStories = (
		filterCondition: (index: number) => boolean,
	): JSX.Element[] =>
		customerStoriesData
			.filter((_, index) => filterCondition(index))
			.map((story) => (
				<CustomerStoryCard
					avatar={story.avatar}
					personName={story.personName}
					role={story.role}
					message={story.message}
					link={story.link}
					key={story.key}
				/>
			));

	const tabItems: TabsProps['items'] = [
		{
			key: 'whyChooseSignoz',
			label: t('whyChooseSignoz', 'Why choose Signoz'),
			children: (
				<Row align="middle" justify="center">
					<Col span={12}>
						<Row gutter={[24, 48]}>
							<Col span={24}>
								<InfoBlocks items={infoData} />
							</Col>
							<Col span={24}>
								<Space size="large" direction="vertical">
									<Flex vertical>
										<Typography.Title level={3}>
											{t('enterpriseGradeObservability', 'Enterprise-grade Observability')}
										</Typography.Title>
										<Typography>
											{t(
												'observabilityDescription',
												'Get access to observability at any scale with advanced security and compliance.',
											)}
										</Typography>
									</Flex>
									<List
										itemLayout="horizontal"
										dataSource={enterpriseGradeValuesData}
										renderItem={(item, index): React.ReactNode => (
											<List.Item key={index}>
												<List.Item.Meta avatar={<CircleArrowRight />} title={item.title} />
											</List.Item>
										)}
									/>
								</Space>
							</Col>
							{isAdmin && (
								<Col span={24}>
									<Button
										type="primary"
										shape="round"
										size="middle"
										loading={isLoading}
										onClick={handleUpdateCreditCard}
									>
										{t('continueToUpgrade', 'Continue to Upgrade')}
									</Button>
								</Col>
							)}
						</Row>
					</Col>
				</Row>
			),
		},
		{
			key: 'youAreInGoodCompany',
			label: t('youAreInGoodCompany', 'You are in good company'),
			children: (
				<Row gutter={[24, 16]} justify="center">
					{/* #FIXME: please suggest if there is any better way to loop in different columns to get the masonry layout */}
					<Col
						span={10}
						className="workspace-locked__customer-stories__left-container"
					>
						{renderCustomerStories((index) => index % 2 === 0)}
					</Col>
					<Col
						span={10}
						className="workspace-locked__customer-stories__right-container"
					>
						{renderCustomerStories((index) => index % 2 !== 0)}
					</Col>
					{isAdmin && (
						<Col span={24}>
							<Flex justify="center">
								<Button
									type="primary"
									shape="round"
									size="middle"
									loading={isLoading}
									onClick={handleUpdateCreditCard}
								>
									{t('continueToUpgrade', 'Continue to Upgrade')}
								</Button>
							</Flex>
						</Col>
					)}
				</Row>
			),
		},
		// #TODO: comming soon
		// {
		// 	key: '3',
		// 	label: 'Our Pricing',
		// 	children: 'Our Pricing',
		// },
		{
			key: 'faqs',
			label: t('faqs', 'FAQs'),
			children: (
				<Row align="middle" justify="center">
					<Col span={12}>
						<Space
							size="large"
							direction="vertical"
							className="workspace-locked__faq-container"
						>
							<Collapse
								items={faqData}
								defaultActiveKey={['signoz-cloud-vs-community']}
								onChange={handleCollapseChange}
							/>
							{isAdmin && (
								<Button
									type="primary"
									shape="round"
									size="middle"
									loading={isLoading}
									onClick={handleUpdateCreditCard}
								>
									{t('continueToUpgrade', 'Continue to Upgrade')}
								</Button>
							)}
						</Space>
					</Col>
				</Row>
			),
		},
	];

	return (
		<div>
			<Modal
				rootClassName="workspace-locked__modal"
				title={
					<div className="workspace-locked__modal__header">
						<span className="workspace-locked__modal__title">
							{t('trialPlanExpired', 'Trial Plan Expired')}
						</span>
						<span className="workspace-locked__modal__header__actions">
							{isAdmin && (
								<Flex gap={8} justify="center" align="center">
									<Button
										className="workspace-locked__modal__header__actions__billing"
										type="link"
										size="small"
										role="button"
										onClick={(e): void => handleViewBilling(e)}
									>
										{t('viewBilling', 'View Billing')}
									</Button>

									<RefreshPaymentStatus />
								</Flex>
							)}

							<Button
								type="default"
								shape="round"
								size="middle"
								href="mailto:cloud-support@signoz.io"
								role="button"
								className="periscope-btn"
								onClick={handleContactUsClick}
							>
								{t('contactUs', 'Contact Us')}
							</Button>
						</span>
					</div>
				}
				open
				closable={false}
				footer={null}
				width="65%"
			>
				<div className="workspace-locked__container">
					{isFetchingActiveLicense || !trialInfo ? (
						<Skeleton />
					) : (
						<>
							<Row justify="center" align="middle">
								<Col>
									<Space direction="vertical" align="center">
										<Typography.Title level={2}>
											<div className="workspace-locked__title">
												{t('upgradeToContinue', 'Upgrade to Continue')}
											</div>
										</Typography.Title>
										<Typography.Text className="workspace-locked__details">
											{t(
												'upgradeNow',
												'Upgrade now to keep enjoying all the great features you’ve been using.',
											)}
											<br />
											{t('yourDataIsSafe', 'Your data is safe with us until')}{' '}
											<span className="workspace-locked__details__highlight">
												{getFormattedDate(trialInfo?.gracePeriodEnd || Date.now())}
											</span>{' '}
											{t(
												'actNow',
												'Act now to avoid any disruptions and continue where you left off.',
											)}
										</Typography.Text>
									</Space>
								</Col>
							</Row>
							{!isAdmin && (
								<Row
									justify="center"
									align="middle"
									className="workspace-locked__modal__cta"
									gutter={[8, 8]}
								>
									<Col>
										<Alert
											message={t(
												'contactAdmin',
												'Contact your admin to proceed with the upgrade.',
											)}
											type="info"
										/>
									</Col>
								</Row>
							)}
							{isAdmin && (
								<Flex gap={8} vertical justify="center" align="center">
									<Row
										justify="center"
										align="middle"
										className="workspace-locked__modal__cta"
										gutter={[8, 8]}
									>
										<Col>
											<Button
												type="primary"
												shape="round"
												size="middle"
												loading={isLoading}
												onClick={handleUpdateCreditCard}
											>
												{t('continueMyJourney', 'Continue My Journey')}
											</Button>
										</Col>
										<Col>
											<Button
												type="default"
												shape="round"
												size="middle"
												className="periscope-btn"
												onClick={handleExtendTrial}
											>
												{t('needMoreTime', 'Need More Time?')}
											</Button>
										</Col>
									</Row>
								</Flex>
							)}

							<div className="workspace-locked__tabs">
								<Tabs
									items={tabItems}
									defaultActiveKey="youAreInGoodCompany"
									onTabClick={handleTabClick}
								/>
							</div>
						</>
					)}
				</div>
			</Modal>
		</div>
	);
}
