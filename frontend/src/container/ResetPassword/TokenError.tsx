import { ArrowLeft, CircleAlert } from '@signozhq/icons';
import i18n from 'ReactI18';
import { useTranslation } from 'react-i18next';
import { Button } from '@signozhq/ui/button';
import { Typography } from '@signozhq/ui/typography';
import AuthError from 'components/AuthError/AuthError';
import AuthPageContainer from 'components/AuthPageContainer';
import ROUTES from 'constants/routes';
import history from 'lib/history';
import APIError from 'types/api/error';

import './ResetPassword.styles.scss';

interface TokenErrorContent {
	title: string;
	subtitle: string;
}

function getErrorContent(error?: APIError): TokenErrorContent {
	const code = error?.getErrorCode();

	if (code === 'reset_password_token_expired') {
		return {
			title: i18n.t('token_expired_title', 'Reset Password token is expired', {
				ns: 'common',
			}),
			subtitle: i18n.t(
				'token_expired_subtitle',
				'Password reset links are single-use and expire after a set period. Please request a new password reset link.',
				{ ns: 'common' },
			),
		};
	}

	if (code === 'reset_password_token_not_found') {
		return {
			title: i18n.t('invalid_reset_link_title', 'Invalid Reset Link', {
				ns: 'common',
			}),
			subtitle: i18n.t(
				'invalid_reset_link_subtitle',
				'This reset password link is invalid or has already been used. Please request a new password reset link.',
				{ ns: 'common' },
			),
		};
	}

	return {
		title: i18n.t('reset_link_unavailable_title', 'Reset Link Unavailable', {
			ns: 'common',
		}),
		subtitle:
			'We could not validate your reset password link. Please request a new one.',
	};
}

interface TokenErrorProps {
	error?: APIError;
}

function TokenError({ error }: TokenErrorProps): JSX.Element {
	const { t } = useTranslation('common');
	const { title, subtitle } = getErrorContent(error);

	return (
		<AuthPageContainer>
			<div className="reset-password-card reset-password-card--centered">
				<div className="reset-password-header">
					<div className="reset-password-header-icon reset-password-header-icon--error">
						<CircleAlert size={32} />
					</div>
					<Typography.Title level={4} className="reset-password-header-title">
						{title}
					</Typography.Title>
					<Typography.Text className="reset-password-header-subtitle">
						{subtitle}
					</Typography.Text>
				</div>
				{error && <AuthError error={error} />}
				<div className="reset-password-back-action">
					<Button
						variant="solid"
						data-testid="back-to-login"
						prefix={<ArrowLeft size={12} />}
						onClick={(): void => history.push(ROUTES.LOGIN)}
					>
						{t('back_to_login')}
					</Button>
				</div>
			</div>
		</AuthPageContainer>
	);
}

export default TokenError;
