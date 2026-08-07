import { useTranslation } from 'react-i18next';
import { ArrowLeft, Mail } from '@signozhq/icons';
import { Button } from '@signozhq/ui/button';

interface SuccessScreenProps {
	onBackToLogin: () => void;
}

function SuccessScreen({ onBackToLogin }: SuccessScreenProps): JSX.Element {
	const { t } = useTranslation('login');

	return (
		<div className="login-form-container">
			<div className="forgot-password-form">
				<div className="login-form-header">
					<div className="login-form-emoji">
						<Mail size={32} />
					</div>
					<h4 className="forgot-password-title">
						{t('forgot_password_check_your_email', 'Check your email')}
					</h4>
					<p className="forgot-password-description">
						{t(
							'forgot_password_reset_link_sent',
							"We've sent a password reset link to your email. Please check your inbox and follow the instructions to reset your password.",
						)}
					</p>
				</div>

				<div className="login-form-actions forgot-password-actions">
					<Button
						variant="solid"
						color="primary"
						type="button"
						data-testid="back-to-login"
						className="login-submit-btn"
						onClick={onBackToLogin}
						prefix={<ArrowLeft size={12} />}
					>
						{t('forgot_password_back', 'Back to login')}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default SuccessScreen;
