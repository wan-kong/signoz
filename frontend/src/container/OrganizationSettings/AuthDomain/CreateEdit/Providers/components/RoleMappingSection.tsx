import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Color, Style } from '@signozhq/design-tokens';
import {
	ChevronDown,
	ChevronRight,
	CircleHelp,
	Plus,
	Trash2,
	TriangleAlert,
} from '@signozhq/icons';
import { Button } from '@signozhq/ui/button';
import { Checkbox } from '@signozhq/ui/checkbox';
import { Input } from '@signozhq/ui/input';
import { Collapse, Form, Tooltip } from 'antd';
import RolesSelect, { useRoles } from 'components/RolesSelect';
import { useCollapseSectionErrors } from 'hooks/useCollapseSectionErrors';

import './RoleMappingSection.styles.scss';

interface RoleMappingSectionProps {
	fieldNamePrefix: string[];
	isExpanded?: boolean;
	onExpandChange?: (expanded: boolean) => void;
}

const SIGNOZ_VIEWER_ROLE = 'signoz-viewer';

function RoleMappingSection({
	fieldNamePrefix,
	isExpanded,
	onExpandChange,
}: RoleMappingSectionProps): JSX.Element {
	const form = Form.useFormInstance();
	const { t } = useTranslation('organizationsettings');
	const useRoleAttribute = Form.useWatch(
		[...fieldNamePrefix, 'useRoleAttribute'],
		form,
	);
	const { roles, isLoading, isError, error, refetch } = useRoles();

	// Support both controlled and uncontrolled modes
	const [internalExpanded, setInternalExpanded] = useState(false);
	const isControlled = isExpanded !== undefined;
	const expanded = isControlled ? isExpanded : internalExpanded;

	const handleCollapseChange = useCallback(
		(keys: string | string[]): void => {
			const newExpanded = Array.isArray(keys) ? keys.length > 0 : !!keys;
			if (isControlled && onExpandChange) {
				onExpandChange(newExpanded);
			} else {
				setInternalExpanded(newExpanded);
			}
		},
		[isControlled, onExpandChange],
	);

	const collapseActiveKey = expanded ? ['role-mapping'] : [];
	const { hasErrors, errorMessages } = useCollapseSectionErrors(fieldNamePrefix);

	return (
		<div className="role-mapping-section">
			<Collapse
				bordered={false}
				activeKey={collapseActiveKey}
				onChange={handleCollapseChange}
				className="role-mapping-section__collapse"
				expandIcon={(): null => null}
			>
				<Collapse.Panel
					key="role-mapping"
					header={
						<div
							className="role-mapping-section__collapse-header"
							role="button"
							aria-expanded={expanded}
							aria-controls="role-mapping-content"
						>
							{!expanded ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
							<div className="role-mapping-section__collapse-header-text">
								<h4 className="role-mapping-section__section-title">
									{t('auth_domain.role_mapping')}
								</h4>
								<p className="role-mapping-section__section-description">
									{t('auth_domain.role_mapping_desc')}
								</p>
							</div>
							{!expanded && hasErrors && (
								<Tooltip
									title={
										<>
											{errorMessages.map((msg) => (
												<div key={msg}>{msg}</div>
											))}
										</>
									}
								>
									<TriangleAlert size={16} color={Color.BG_CHERRY_500} />
								</Tooltip>
							)}
						</div>
					}
				>
					<div id="role-mapping-content" className="role-mapping-section__content">
						<div className="role-mapping-section__field-group">
							<label className="role-mapping-section__label" htmlFor="default-role">
								{t('auth_domain.default_role')}
								<Tooltip title={t('auth_domain.default_role_tooltip')}>
									<CircleHelp size={14} color={Style.L3_FOREGROUND} cursor="help" />
								</Tooltip>
							</label>
							<Form.Item
								name={[...fieldNamePrefix, 'defaultRole']}
								className="role-mapping-section__form-item"
								initialValue={SIGNOZ_VIEWER_ROLE}
							>
								<RolesSelect
									id="default-role"
									valueField="name"
									roles={roles}
									loading={isLoading}
									isError={isError}
									error={error}
									onRefetch={refetch}
									className="role-mapping-section__select"
									allowClear={false}
									getPopupContainer={(): HTMLElement => document.body}
								/>
							</Form.Item>
						</div>

						<div className="role-mapping-section__checkbox-row">
							<Form.Item
								name={[...fieldNamePrefix, 'useRoleAttribute']}
								valuePropName="value"
								noStyle
							>
								<Checkbox
									id="use-role-attribute"
									onChange={(checked: boolean): void => {
										form.setFieldValue([...fieldNamePrefix, 'useRoleAttribute'], checked);
									}}
								>
									{t('auth_domain.use_role_attribute')}
								</Checkbox>
							</Form.Item>
							<Tooltip title={t('auth_domain.use_role_attribute_tooltip')}>
								<CircleHelp size={14} color={Style.L3_FOREGROUND} cursor="help" />
							</Tooltip>
						</div>

						{!useRoleAttribute && (
							<div className="role-mapping-section__group-mappings">
								<div className="role-mapping-section__group-header">
									<span className="role-mapping-section__group-title">
										{t('auth_domain.group_to_role_mappings')}
									</span>
									<p className="role-mapping-section__group-description">
										{t('auth_domain.group_mappings_desc')}
									</p>
								</div>

								<Form.List name={[...fieldNamePrefix, 'groupMappingsList']}>
									{(fields, { add, remove }): JSX.Element => (
										<div className="role-mapping-section__items">
											{fields.map((field) => (
												<div key={field.key} className="role-mapping-section__row">
													<Form.Item
														name={[field.name, 'groupName']}
														className="role-mapping-section__field role-mapping-section__field--group"
														rules={[
															{
																required: true,
																message: t('auth_domain.group_name_required'),
															},
														]}
													>
														<Input placeholder={t('auth_domain.idp_group_name')} />
													</Form.Item>

													<Form.Item
														name={[field.name, 'role']}
														className="role-mapping-section__field role-mapping-section__field--role"
														rules={[
															{ required: true, message: t('auth_domain.role_required') },
														]}
														initialValue={SIGNOZ_VIEWER_ROLE}
													>
														<RolesSelect
															valueField="name"
															roles={roles}
															loading={isLoading}
															isError={isError}
															error={error}
															onRefetch={refetch}
															allowClear={false}
															getPopupContainer={(): HTMLElement => document.body}
														/>
													</Form.Item>

													<Button
														variant="ghost"
														color="secondary"
														className="role-mapping-section__remove-btn"
														onClick={(): void => remove(field.name)}
														aria-label={t('auth_domain.remove_mapping')}
													>
														<Trash2 size={12} />
													</Button>
												</div>
											))}

											<Button
												variant="outlined"
												color="secondary"
												onClick={(): void =>
													add({ groupName: '', role: SIGNOZ_VIEWER_ROLE })
												}
												prefix={<Plus size={14} />}
											>
												{t('auth_domain.add_group_mapping')}
											</Button>
										</div>
									)}
								</Form.List>
							</div>
						)}
					</div>
				</Collapse.Panel>
			</Collapse>
		</div>
	);
}

export default RoleMappingSection;
