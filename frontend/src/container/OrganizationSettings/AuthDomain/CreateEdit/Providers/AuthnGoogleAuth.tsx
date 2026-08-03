import { useCallback, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Color, Style } from '@signozhq/design-tokens';
import {
	ChevronDown,
	ChevronRight,
	CircleHelp,
	TriangleAlert,
} from '@signozhq/icons';
import { Callout } from '@signozhq/ui/callout';
import { Checkbox } from '@signozhq/ui/checkbox';
import { Input } from '@signozhq/ui/input';
import { Collapse, Form, Input as AntdInput, Tooltip } from 'antd';
import { useCollapseSectionErrors } from 'hooks/useCollapseSectionErrors';

import DomainMappingList from './components/DomainMappingList';
import EmailTagInput from './components/EmailTagInput';
import RoleMappingSection from './components/RoleMappingSection';

import './Providers.styles.scss';

type ExpandedSection = 'workspace-groups' | 'role-mapping' | null;

function ConfigureGoogleAuthAuthnProvider({
	isCreate,
}: {
	isCreate: boolean;
}): JSX.Element {
	const form = Form.useFormInstance();
	const { t } = useTranslation('organizationsettings');
	const fetchGroups = Form.useWatch(['googleAuthConfig', 'fetchGroups'], form);

	const [expandedSection, setExpandedSection] = useState<ExpandedSection>(null);

	const handleWorkspaceGroupsChange = useCallback(
		(keys: string | string[]): void => {
			const isExpanding = Array.isArray(keys) ? keys.length > 0 : !!keys;
			setExpandedSection(isExpanding ? 'workspace-groups' : null);
		},
		[],
	);

	const handleRoleMappingChange = useCallback((expanded: boolean): void => {
		setExpandedSection(expanded ? 'role-mapping' : null);
	}, []);

	const {
		hasErrors: hasWorkspaceGroupsErrors,
		errorMessages: workspaceGroupsErrorMessages,
	} = useCollapseSectionErrors(
		['googleAuthConfig'],
		[
			['googleAuthConfig', 'fetchGroups'],
			['googleAuthConfig', 'serviceAccountJson'],
			['googleAuthConfig', 'domainToAdminEmailList'],
			['googleAuthConfig', 'fetchTransitiveGroupMembership'],
			['googleAuthConfig', 'allowedGroups'],
		],
	);

	return (
		<div className="authn-provider">
			<section className="authn-provider__header">
				<h3 className="authn-provider__title">{t('auth_domain.edit_google')}</h3>
				<p className="authn-provider__description">
					<Trans
						i18nKey="auth_domain.google_description"
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
				{/* Left Column - Core OAuth Settings */}
				<div className="authn-provider__left">
					<div className="authn-provider__field-group">
						<label className="authn-provider__label" htmlFor="google-domain">
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
							<Input id="google-domain" disabled={!isCreate} />
						</Form.Item>
					</div>

					<div className="authn-provider__field-group">
						<label className="authn-provider__label" htmlFor="google-client-id">
							{t('auth_domain.client_id')}
							<Tooltip title={t('auth_domain.google_client_id_tooltip')}>
								<CircleHelp size={14} color={Style.L3_FOREGROUND} cursor="help" />
							</Tooltip>
						</label>
						<Form.Item
							name={['googleAuthConfig', 'clientId']}
							className="authn-provider__form-item"
							rules={[
								{
									required: true,
									message: t('auth_domain.client_id_required'),
									whitespace: true,
								},
							]}
						>
							<Input id="google-client-id" />
						</Form.Item>
					</div>

					<div className="authn-provider__field-group">
						<label className="authn-provider__label" htmlFor="google-client-secret">
							{t('auth_domain.client_secret')}
							<Tooltip title={t('auth_domain.google_client_secret_tooltip')}>
								<CircleHelp size={14} color={Style.L3_FOREGROUND} cursor="help" />
							</Tooltip>
						</label>
						<Form.Item
							name={['googleAuthConfig', 'clientSecret']}
							className="authn-provider__form-item"
							rules={[
								{
									required: true,
									message: t('auth_domain.client_secret_required'),
									whitespace: true,
								},
							]}
						>
							<Input id="google-client-secret" />
						</Form.Item>
					</div>

					<div className="authn-provider__checkbox-row">
						<Form.Item
							name={['googleAuthConfig', 'insecureSkipEmailVerified']}
							valuePropName="value"
							noStyle
						>
							<Checkbox
								id="google-skip-email-verification"
								onChange={(checked: boolean): void => {
									form.setFieldValue(
										['googleAuthConfig', 'insecureSkipEmailVerified'],
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

					<div className="authn-provider__callout-wrapper">
						<Callout type="warning" size="small" showIcon className="callout">
							{t('auth_domain.google_callout')}
						</Callout>
					</div>
				</div>

				{/* Right Column - Google Workspace Groups (Advanced) */}
				<div className="authn-provider__right">
					<Collapse
						bordered={false}
						activeKey={
							expandedSection === 'workspace-groups' ? ['workspace-groups'] : []
						}
						onChange={handleWorkspaceGroupsChange}
						className="authn-provider__collapse"
						expandIcon={(): null => null}
					>
						<Collapse.Panel
							key="workspace-groups"
							header={
								<div className="authn-provider__collapse-header">
									{expandedSection !== 'workspace-groups' ? (
										<ChevronRight size={16} />
									) : (
										<ChevronDown size={16} />
									)}
									<div className="authn-provider__collapse-header-text">
										<h4 className="authn-provider__section-title">
											{t('auth_domain.google_workspace_groups')}
										</h4>
										<p className="authn-provider__section-description">
											{t('auth_domain.google_workspace_groups_desc')}
										</p>
									</div>
									{expandedSection !== 'workspace-groups' &&
										hasWorkspaceGroupsErrors && (
											<Tooltip
												title={
													<div>
														{workspaceGroupsErrorMessages.map((msg) => (
															<div key={msg}>{msg}</div>
														))}
													</div>
												}
											>
												<TriangleAlert size={16} color={Color.BG_CHERRY_500} />
											</Tooltip>
										)}
								</div>
							}
						>
							<div className="authn-provider__group-content">
								<div className="authn-provider__checkbox-row">
									<Form.Item
										name={['googleAuthConfig', 'fetchGroups']}
										valuePropName="value"
										noStyle
									>
										<Checkbox
											id="google-fetch-groups"
											onChange={(checked: boolean): void => {
												form.setFieldValue(['googleAuthConfig', 'fetchGroups'], checked);
											}}
										>
											{t('auth_domain.fetch_groups')}
										</Checkbox>
									</Form.Item>
									<Tooltip title={t('auth_domain.fetch_groups_tooltip')}>
										<CircleHelp size={14} color={Style.L3_FOREGROUND} cursor="help" />
									</Tooltip>
								</div>

								{fetchGroups && (
									<div className="authn-provider__group-fields">
										<div className="authn-provider__field-group">
											<label
												className="authn-provider__label"
												htmlFor="google-service-account-json"
											>
												{t('auth_domain.service_account_json')}
												<Tooltip title={t('auth_domain.service_account_json_tooltip')}>
													<CircleHelp size={14} color={Style.L3_FOREGROUND} cursor="help" />
												</Tooltip>
											</label>
											<Form.Item
												name={['googleAuthConfig', 'serviceAccountJson']}
												className="authn-provider__form-item"
											>
												<AntdInput.TextArea
													id="google-service-account-json"
													rows={3}
													placeholder={t('auth_domain.service_account_json_placeholder')}
													className="authn-provider__textarea"
												/>
											</Form.Item>
										</div>

										<DomainMappingList
											fieldNamePrefix={['googleAuthConfig', 'domainToAdminEmailList']}
										/>

										<div className="authn-provider__checkbox-row">
											<Form.Item
												name={['googleAuthConfig', 'fetchTransitiveGroupMembership']}
												valuePropName="value"
												noStyle
											>
												<Checkbox
													id="google-transitive-membership"
													onChange={(checked: boolean): void => {
														form.setFieldValue(
															['googleAuthConfig', 'fetchTransitiveGroupMembership'],
															checked,
														);
													}}
												>
													{t('auth_domain.fetch_transitive_membership')}
												</Checkbox>
											</Form.Item>
											<Tooltip
												title={t('auth_domain.fetch_transitive_membership_tooltip')}
											>
												<CircleHelp size={14} color={Style.L3_FOREGROUND} cursor="help" />
											</Tooltip>
										</div>

										<div className="authn-provider__field-group">
											<label
												className="authn-provider__label"
												htmlFor="google-allowed-groups"
											>
												{t('auth_domain.allowed_groups')}
												<Tooltip title={t('auth_domain.allowed_groups_tooltip')}>
													<CircleHelp size={14} color={Style.L3_FOREGROUND} cursor="help" />
												</Tooltip>
											</label>
											<Form.Item
												name={['googleAuthConfig', 'allowedGroups']}
												className="authn-provider__form-item"
											>
												<EmailTagInput placeholder={t('auth_domain.type_group_email')} />
											</Form.Item>
										</div>
									</div>
								)}
							</div>
						</Collapse.Panel>
					</Collapse>

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

export default ConfigureGoogleAuthAuthnProvider;
