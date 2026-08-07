import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Space } from 'antd';
import { Typography } from '@signozhq/ui/typography';
import UnAuthorized from 'assets/UnAuthorized';
import { Container } from 'components/NotFound/styles';
import { handleContactSupport } from 'container/Integrations/utils';
import { useGetTenantLicense } from 'hooks/useGetTenantLicense';
import { useQueryState } from 'nuqs';

import { useAppContext } from '../../providers/App/App';
import { USER_ROLES } from '../../types/roles';

import './index.styles.scss';

function UnAuthorizePage(): JSX.Element {
	const { t } = useTranslation('common');
	const [debugCurrentRole] = useQueryState('currentRole');
	const { user } = useAppContext();
	const { isCloudUser: isCloudUserVal } = useGetTenantLicense();

	const userIsAnonymous =
		debugCurrentRole === USER_ROLES.ANONYMOUS ||
		user.role === USER_ROLES.ANONYMOUS;
	const mistakeMessage = userIsAnonymous
		? t('unauthorized.contact_admin_or')
		: t('unauthorized.contact_admin');

	const handleContactSupportClick = useCallback((): void => {
		handleContactSupport(isCloudUserVal);
	}, [isCloudUserVal]);

	return (
		<Container className="unauthorized-page">
			<Space align="center" direction="vertical">
				<UnAuthorized width={64} height={64} />
				<Typography.Title level={3}>{t('unauthorized.title')}</Typography.Title>

				<p className="unauthorized-page__description">
					{t('unauthorized.description')} <br />
					{mistakeMessage}
					{userIsAnonymous ? (
						<Typography.Link
							className="contact-support-link"
							onClick={handleContactSupportClick}
						>
							{' '}
							{t('unauthorized.reach_out')}
						</Typography.Link>
					) : null}
				</p>
			</Space>
		</Container>
	);
}

export default UnAuthorizePage;
