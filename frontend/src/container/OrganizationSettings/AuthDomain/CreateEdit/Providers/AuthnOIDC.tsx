import { useCallback, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Style } from '@signozhq/design-tokens';
import { CircleHelp } from '@signozhq/icons';
import { Callout } from '@signozhq/ui/callout';
import { Checkbox } from '@signozhq/ui/checkbox';
import { Input } from '@signozhq/ui/input';
import { Form, Tooltip } from 'antd';

import ClaimMappingSection from './components/ClaimMappingSection';
import RoleMappingSection from './components/RoleMappingSection';

import './Providers.styles.scss';

type ExpandedSection = 'claim-mapping' | 'role-mapping' | null;

function ConfigureOIDCAuthnProvider({
	isCreate,
}: {
	isCreate: boolean;
}): JSX.Element {
	const form = Form.useFormInstance();
	const { t } = useTranslation('organizationsettings');

	const [expandedSection, setExpandedSection] = useState<ExpandedSection>(null);

	const handleClaimMappingChange = useCallback((expanded: boolean): void => {
		setExpandedSection(expanded ? 'claim-mapping' : null);
	}, []);

	const handleRoleMappingChange = useCallback((expanded: boolean): void => {
		setExpandedSection(expanded ? 'role-mapping' : null);
	}, []);

	return (
		<div className="authn-provider">
			<section className="authn-provider__header">
				<h3 className="authn-provider__title">{t('auth_domain.edit_oidc')}</h3>
				<p className="authn-provider__description">
					<Trans
						i18nKey="auth_domain.oidc_description"
						ns="organizationsettings"
						components={{
							1: (
								<a
									href="https://signoz.io/docs/manage/administrator-guide/sso/overview/"
									target="_blank"
									rel="noreferrer"
								/>
							),
						}}
					/>
				</p>
			</section>

			<div className="authn-provider__columns">
				{/* Left Column - Core OIDC Settings */}
				<div className="authn-provider__left">
					<div className="authn-provider__field-group">
						<label className="authn-provider__label" htmlFor="oidc-domain">
							{t('auth_domain.domain')}
							<Tooltip title={t('auth_domain.domain_tooltip')}>
								<CircleHelp size={14} color={Style.L3_FOREGROUND} cursor="help" />
							</Tooltip>
						</label>
						<Form.Item
							name="name"
							className="authn-provider__form-item"
							rules={[
								{
									required: true,
									message: t('auth_domain.domain_required'),
									whitespace: true,
								},
							]}
						>
							<Input id="oidc-domain" disabled={!isCreate} />
						</Form.Item>
					</div>

					<div className="authn-provider__field-group">
						<label className="authn-provider__label" htmlFor="oidc-issuer">
							{t('auth_domain.issuer_url')}
							<Tooltip title={t('auth_domain.issuer_url_tooltip')}>
								<CircleHelp size={14} color={Style.L3_FOREGROUND} cursor="help" />
							</Tooltip>
						</label>
						<Form.Item
							name={['oidcConfig', 'issuer']}
							className="authn-provider__form-item"
							rules={[
								{
									required: true,
									message: t('auth_domain.issuer_url_required'),
									whitespace: true,
								},
							]}
						>
							<Input id="oidc-issuer" />
						</Form.Item>
					</div>

					<div className="authn-provider__field-group">
						<label className="authn-provider__label" htmlFor="oidc-issuer-alias">
							{t('auth_domain.issuer_alias')}
							<Tooltip title={t('auth_domain.issuer_alias_tooltip')}>
								<CircleHelp size={14} color={Style.L3_FOREGROUND} cursor="help" />
							</Tooltip>
						</label>
						<Form.Item
							name={['oidcConfig', 'issuerAlias']}
							className="authn-provider__form-item"
						>
							<Input id="oidc-issuer-alias" />
						</Form.Item>
					</div>

					<div className="authn-provider__field-group">
						<label className="authn-provider__label" htmlFor="oidc-client-id">
							{t('auth_domain.client_id')}
							<Tooltip title={t('auth_domain.client_id_tooltip')}>
								<CircleHelp size={14} color={Style.L3_FOREGROUND} cursor="help" />
							</Tooltip>
						</label>
						<Form.Item
							name={['oidcConfig', 'clientId']}
							className="authn-provider__form-item"
							rules={[
								{
									required: true,
									message: t('auth_domain.client_id_required'),
									whitespace: true,
								},
							]}
						>
							<Input id="oidc-client-id" />
						</Form.Item>
					</div>

					<div className="authn-provider__field-group">
						<label className="authn-provider__label" htmlFor="oidc-client-secret">
							{t('auth_domain.client_secret')}
							<Tooltip title={t('auth_domain.client_secret_tooltip')}>
								<CircleHelp size={14} color={Style.L3_FOREGROUND} cursor="help" />
							</Tooltip>
						</label>
						<Form.Item
							name={['oidcConfig', 'clientSecret']}
							className="authn-provider__form-item"
							rules={[
								{
									required: true,
									message: t('auth_domain.client_secret_required'),
									whitespace: true,
								},
							]}
						>
							<Input id="oidc-client-secret" />
						</Form.Item>
					</div>

					<div className="authn-provider__checkbox-row">
						<Form.Item
							name={['oidcConfig', 'insecureSkipEmailVerified']}
							valuePropName="value"
							noStyle
						>
							<Checkbox
								id="oidc-skip-email-verification"
								onChange={(checked: boolean): void => {
									form.setFieldValue(
										['oidcConfig', 'insecureSkipEmailVerified'],
										checked,
									);
								}}
							>
								{t('auth_domain.skip_email_verification')}
							</Checkbox>
						</Form.Item>
						<Tooltip title={t('auth_domain.skip_email_verification_tooltip')}>
							<CircleHelp size={14} color={Style.L3_FOREGROUND} cursor="help" />
						</Tooltip>
					</div>

					<div className="authn-provider__checkbox-row">
						<Form.Item
							name={['oidcConfig', 'getUserInfo']}
							valuePropName="value"
							noStyle
						>
							<Checkbox
								id="oidc-get-user-info"
								onChange={(checked: boolean): void => {
									form.setFieldValue(['oidcConfig', 'getUserInfo'], checked);
								}}
							>
								{t('auth_domain.get_user_info')}
							</Checkbox>
						</Form.Item>
						<Tooltip title={t('auth_domain.get_user_info_tooltip')}>
							<CircleHelp size={14} color={Style.L3_FOREGROUND} cursor="help" />
						</Tooltip>
					</div>
					<div className="authn-provider__callout-wrapper">
						<Callout type="warning" size="small" showIcon className="callout">
							{t('auth_domain.oidc_callout')}
						</Callout>
					</div>
				</div>

				{/* Right Column - Advanced Settings */}
				<div className="authn-provider__right">
					<ClaimMappingSection
						fieldNamePrefix={['oidcConfig', 'claimMapping']}
						isExpanded={expandedSection === 'claim-mapping'}
						onExpandChange={handleClaimMappingChange}
					/>

					<RoleMappingSection
						fieldNamePrefix={['roleMapping']}
						isExpanded={expandedSection === 'role-mapping'}
						onExpandChange={handleRoleMappingChange}
					/>
				</div>
			</div>
		</div>
	);
}

export default ConfigureOIDCAuthnProvider;
