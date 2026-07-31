import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { Typography } from '@signozhq/ui/typography';
import ROUTES from 'constants/routes';
import { handleContactSupport } from 'container/Integrations/utils';
import { useGetTenantLicense } from 'hooks/useGetTenantLicense';
import { useSafeNavigate } from 'hooks/useSafeNavigate';
import { LifeBuoy, List } from '@signozhq/icons';
import { isModifierKeyPressed } from 'utils/app';

import broomUrl from '@/assets/Icons/broom.svg';
import constructionUrl from '@/assets/Icons/construction.svg';
import noDataUrl from '@/assets/Icons/no-data.svg';

import './AlertNotFound.styles.scss';

interface AlertNotFoundProps {
	isTestAlert: boolean;
}

function AlertNotFound({ isTestAlert }: AlertNotFoundProps): JSX.Element {
	const { t } = useTranslation('alerts');
	const { isCloudUser: isCloudUserVal } = useGetTenantLicense();
	const { safeNavigate } = useSafeNavigate();

	const checkAllRulesHandler = (e: React.MouseEvent): void => {
		safeNavigate(ROUTES.LIST_ALL_ALERT, { newTab: isModifierKeyPressed(e) });
	};

	const contactSupportHandler = (): void => {
		handleContactSupport(isCloudUserVal);
	};

	return (
		<div className="alert-not-found">
			<section className="description">
				<img src={noDataUrl} alt="no-data" className="not-found-img" />
				<Typography.Text className="not-found-text">
					{t('alert_details.not_found.message')}
				</Typography.Text>
				<Typography.Text className="not-found-text">
					{isTestAlert
						? t('alert_details.not_found.single_scenario')
						: t('alert_details.not_found.multiple_scenarios')}
				</Typography.Text>
			</section>
			<section className="reasons">
				{!isTestAlert && (
					<>
						<div className="reason">
							<img src={constructionUrl} alt="no-data" className="construction-img" />
							<Typography.Text className="text">
								{t('alert_details.not_found.incorrect_link')}
							</Typography.Text>
						</div>
						<div className="reason">
							<img src={broomUrl} alt="no-data" className="broom-img" />
							<Typography.Text className="text">
								{t('alert_details.not_found.deleted_rule')}
							</Typography.Text>
						</div>
					</>
				)}
				{isTestAlert && (
					<div className="reason">
						<img src={broomUrl} alt="no-data" className="broom-img" />
						<Typography.Text className="text">
							{t('alert_details.not_found.test_alert_reason')}
						</Typography.Text>
					</div>
				)}
			</section>
			<section className="none-of-above">
				<Typography.Text className="text">
					{t('alert_details.not_found.contact_support_hint')}
				</Typography.Text>
				<div className="action-btns">
					<Button
						className="action-btn"
						icon={<List size={14} />}
						onClick={checkAllRulesHandler}
					>
						{t('alert_details.not_found.check_all_rules')}
					</Button>
					<Button
						className="action-btn"
						icon={<LifeBuoy size={14} />}
						onClick={contactSupportHandler}
					>
						{t('alert_details.not_found.contact_support')}
					</Button>
				</div>
			</section>
		</div>
	);
}

export default AlertNotFound;
