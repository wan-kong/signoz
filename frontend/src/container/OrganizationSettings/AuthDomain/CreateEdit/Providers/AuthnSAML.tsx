import { useCallback, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Style } from '@signozhq/design-tokens';
import { CircleHelp } from '@signozhq/icons';
import { Callout } from '@signozhq/ui/callout';
import { Checkbox } from '@signozhq/ui/checkbox';
import { Input } from '@signozhq/ui/input';
import { Form, Input as AntdInput, Tooltip } from 'antd';

import AttributeMappingSection from './components/AttributeMappingSection';
import RoleMappingSection from './components/RoleMappingSection';

import './Providers.styles.scss';

type ExpandedSection = 'attribute-mapping' | 'role-mapping' | null;

function ConfigureSAMLAuthnProvider({
	isCreate,
}: {
	isCreate: boolean;
}): JSX.Element {
	const form = Form.useFormInstance();
	const { t } = useTranslation('organizationsettings');

	const [expandedSection, setExpandedSection] = useState<ExpandedSection>(null);

	const handleAttributeMappingChange = useCallback((expanded: boolean): void => {
		setExpandedSection(expanded ? 'attribute-mapping' : null);
	}, []);

	const handleRoleMappingChange = useCallback((expanded: boolean): void => {
		setExpandedSection(expanded ? 'role-mapping' : null);
	}, []);

	return (
		<div className="authn-provider">
			<section className="authn-provider__header">
				<h3 className="authn-provider__title">{t('auth_domain.edit_saml')}</h3>
				<p className="authn-provider__description">
					<Trans
						i18nKey="auth_domain.saml_description"
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
				{/* Left Column - Core SAML Settings */}
				<div className="authn-provider__left">
					<div className="authn-provider__field-group">
						<label className="authn-provider__label" htmlFor="saml-domain">
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
							<Input id="saml-domain" disabled={!isCreate} />
						</Form.Item>
					</div>

					<div className="authn-provider__field-group">
						<label className="authn-provider__label" htmlFor="saml-acs-url">
							{t('auth_domain.saml_acs_url')}
							<Tooltip title={t('auth_domain.saml_acs_url_tooltip')}>
								<CircleHelp size={14} color={Style.L3_FOREGROUND} cursor="help" />
							</Tooltip>
						</label>
						<Form.Item
							name={['samlConfig', 'samlIdp']}
							className="authn-provider__form-item"
							rules={[
								{
									required: true,
									message: t('auth_domain.saml_acs_url_required'),
									whitespace: true,
								},
							]}
						>
							<Input id="saml-acs-url" />
						</Form.Item>
					</div>

					<div className="authn-provider__field-group">
						<label className="authn-provider__label" htmlFor="saml-entity-id">
							{t('auth_domain.saml_entity_id')}
							<Tooltip title={t('auth_domain.saml_entity_id_tooltip')}>
								<CircleHelp size={14} color={Style.L3_FOREGROUND} cursor="help" />
							</Tooltip>
						</label>
						<Form.Item
							name={['samlConfig', 'samlEntity']}
							className="authn-provider__form-item"
							rules={[
								{
									required: true,
									message: t('auth_domain.saml_entity_id_required'),
									whitespace: true,
								},
							]}
						>
							<Input id="saml-entity-id" />
						</Form.Item>
					</div>

					<div className="authn-provider__field-group">
						<label className="authn-provider__label" htmlFor="saml-certificate">
							{t('auth_domain.saml_certificate')}
							<Tooltip title={t('auth_domain.saml_certificate_tooltip')}>
								<CircleHelp size={14} color={Style.L3_FOREGROUND} cursor="help" />
							</Tooltip>
						</label>
						<Form.Item
							name={['samlConfig', 'samlCert']}
							className="authn-provider__form-item"
							rules={[
								{
									required: true,
									message: t('auth_domain.saml_certificate_required'),
									whitespace: true,
								},
							]}
						>
							<AntdInput.TextArea
								id="saml-certificate"
								rows={3}
								placeholder={t('auth_domain.saml_certificate_placeholder')}
								className="authn-provider__textarea"
							/>
						</Form.Item>
					</div>

					<div className="authn-provider__checkbox-row">
						<Form.Item
							name={['samlConfig', 'insecureSkipAuthNRequestsSigned']}
							valuePropName="value"
							noStyle
						>
							<Checkbox
								id="saml-skip-signing"
								onChange={(checked: boolean): void => {
									form.setFieldValue(
										['samlConfig', 'insecureSkipAuthNRequestsSigned'],
										checked,
									);
								}}
							>
								{t('auth_domain.skip_signing')}
							</Checkbox>
						</Form.Item>
						<Tooltip title={t('auth_domain.skip_signing_tooltip')}>
							<CircleHelp size={14} color={Style.L3_FOREGROUND} cursor="help" />
						</Tooltip>
					</div>

					<div className="authn-provider__callout-wrapper">
						<Callout type="warning" size="small" showIcon className="callout">
							{t('auth_domain.saml_callout')}
						</Callout>
					</div>
				</div>

				{/* Right Column - Advanced Settings */}
				<div className="authn-provider__right">
					<AttributeMappingSection
						fieldNamePrefix={['samlConfig', 'attributeMapping']}
						isExpanded={expandedSection === 'attribute-mapping'}
						onExpandChange={handleAttributeMappingChange}
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

export default ConfigureSAMLAuthnProvider;
