import { Button } from 'antd';
import { Typography } from '@signozhq/ui/typography';
import { AuthtypesAuthNProviderDTO } from 'api/generated/services/sigNoz.schemas';
import { useTranslation } from 'react-i18next';

import i18n from 'ReactI18';

import './CreateEdit.styles.scss';
import { Key, SolidGoogle } from '@signozhq/icons';

interface AuthNProvider {
	key: AuthtypesAuthNProviderDTO;
	title: string;
	description: string;
	icon: JSX.Element;
	enabled: boolean;
}

function getAuthNProviders(samlEnabled: boolean): AuthNProvider[] {
	return [
		{
			key: AuthtypesAuthNProviderDTO.google_auth,
			title: i18n.t('auth_domain.google_title', 'Google Apps Authentication', {
				ns: 'common',
			}),
			description: i18n.t(
				'auth_domain.google_desc',
				'Let members sign-in with a Google workspace account',
				{ ns: 'common' },
			),
			icon: <SolidGoogle size={37} />,
			enabled: true,
		},
		{
			key: AuthtypesAuthNProviderDTO.saml,
			title: i18n.t('auth_domain.saml_title', 'SAML Authentication', {
				ns: 'common',
			}),
			description: i18n.t(
				'auth_domain.saml_desc',
				'Azure, Active Directory, Okta or your custom SAML 2.0 solution',
				{ ns: 'common' },
			),
			icon: <Key size={37} />,
			enabled: samlEnabled,
		},

		{
			key: AuthtypesAuthNProviderDTO.oidc,
			title: i18n.t('auth_domain.oidc_title', 'OIDC Authentication', {
				ns: 'common',
			}),
			description: i18n.t(
				'auth_domain.oidc_desc',
				'Authenticate using OpenID Connect providers like Azure, Active Directory, Okta, or other OIDC compliant solutions',
				{ ns: 'common' },
			),
			icon: <Key size={37} />,
			enabled: samlEnabled,
		},
	];
}

function AuthnProviderSelector({
	setAuthnProvider,
	samlEnabled,
}: {
	setAuthnProvider: React.Dispatch<
		React.SetStateAction<AuthtypesAuthNProviderDTO | ''>
	>;
	samlEnabled: boolean;
}): JSX.Element {
	const { t } = useTranslation('common');
	const authnProviders = getAuthNProviders(samlEnabled);
	return (
		<div className="authn-provider-selector">
			<section className="header">
				<Typography.Title level={4}>
					{t('auth_domain.configure_auth_method')}
				</Typography.Title>
				<Typography.Text italic>
					{t('auth_domain.sso_support_text')}
				</Typography.Text>
			</section>
			<section className="selector">
				{authnProviders.map((provider) => {
					if (provider.enabled) {
						return (
							<section key={provider.key} className="provider">
								<span className="icon">{provider.icon}</span>
								<div className="title-description">
									<Typography.Text className="title">{provider.title}</Typography.Text>
									<Typography.Text className="description">
										{provider.description}
									</Typography.Text>
								</div>
								<Button
									onClick={(): void => setAuthnProvider(provider.key)}
									type="primary"
								>
									{t('auth_domain.configure')}
								</Button>
							</section>
						);
					}
					return <div key={provider.key} />;
				})}
			</section>
		</div>
	);
}

export default AuthnProviderSelector;
