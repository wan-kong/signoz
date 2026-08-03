import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Color, Style } from '@signozhq/design-tokens';
import {
	ChevronDown,
	ChevronRight,
	CircleHelp,
	TriangleAlert,
} from '@signozhq/icons';
import { Input } from '@signozhq/ui/input';
import { Collapse, Form, Tooltip } from 'antd';
import { useCollapseSectionErrors } from 'hooks/useCollapseSectionErrors';

import './AttributeMappingSection.styles.scss';

interface AttributeMappingSectionProps {
	fieldNamePrefix: string[];
	isExpanded?: boolean;
	onExpandChange?: (expanded: boolean) => void;
}

function AttributeMappingSection({
	fieldNamePrefix,
	isExpanded,
	onExpandChange,
}: AttributeMappingSectionProps): JSX.Element {
	const { t } = useTranslation('organizationsettings');

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

	const collapseActiveKey = expanded ? ['attribute-mapping'] : [];
	const { hasErrors, errorMessages } = useCollapseSectionErrors(fieldNamePrefix);

	return (
		<div className="attribute-mapping-section">
			<Collapse
				bordered={false}
				activeKey={collapseActiveKey}
				onChange={handleCollapseChange}
				className="attribute-mapping-section__collapse"
				expandIcon={(): null => null}
			>
				<Collapse.Panel
					key="attribute-mapping"
					header={
						<div
							className="attribute-mapping-section__collapse-header"
							role="button"
							aria-expanded={expanded}
							aria-controls="attribute-mapping-content"
						>
							{!expanded ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
							<div className="attribute-mapping-section__collapse-header-text">
								<h4 className="attribute-mapping-section__section-title">
									{t('auth_domain.attribute_mapping')}
								</h4>
								<p className="attribute-mapping-section__section-description">
									{t('auth_domain.attribute_mapping_desc')}
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
					<div
						id="attribute-mapping-content"
						className="attribute-mapping-section__content"
					>
						<div className="attribute-mapping-section__field-group">
							<label
								className="attribute-mapping-section__label"
								htmlFor="email-attribute"
							>
								{t('auth_domain.email_attribute')}
								<Tooltip title={t('auth_domain.email_attribute_tooltip')}>
									<CircleHelp size={14} color={Style.L3_FOREGROUND} cursor="help" />
								</Tooltip>
							</label>
							<Form.Item
								name={[...fieldNamePrefix, 'email']}
								className="attribute-mapping-section__form-item"
							>
								<Input
									id="email-attribute"
									placeholder={t('auth_domain.placeholder_email')}
								/>
							</Form.Item>
						</div>

						{/* Name Attribute */}
						<div className="attribute-mapping-section__field-group">
							<label
								className="attribute-mapping-section__label"
								htmlFor="name-attribute"
							>
								{t('auth_domain.name_attribute')}
								<Tooltip title={t('auth_domain.name_attribute_tooltip')}>
									<CircleHelp size={14} color={Style.L3_FOREGROUND} cursor="help" />
								</Tooltip>
							</label>
							<Form.Item
								name={[...fieldNamePrefix, 'name']}
								className="attribute-mapping-section__form-item"
							>
								<Input
									id="name-attribute"
									placeholder={t('auth_domain.placeholder_name')}
								/>
							</Form.Item>
						</div>

						{/* Groups Attribute */}
						<div className="attribute-mapping-section__field-group">
							<label
								className="attribute-mapping-section__label"
								htmlFor="groups-attribute"
							>
								{t('auth_domain.groups_attribute')}
								<Tooltip title={t('auth_domain.groups_attribute_tooltip')}>
									<CircleHelp size={14} color={Style.L3_FOREGROUND} cursor="help" />
								</Tooltip>
							</label>
							<Form.Item
								name={[...fieldNamePrefix, 'groups']}
								className="attribute-mapping-section__form-item"
							>
								<Input
									id="groups-attribute"
									placeholder={t('auth_domain.placeholder_groups')}
								/>
							</Form.Item>
						</div>

						{/* Role Attribute */}
						<div className="attribute-mapping-section__field-group">
							<label
								className="attribute-mapping-section__label"
								htmlFor="role-attribute"
							>
								{t('auth_domain.role_attribute')}
								<Tooltip title={t('auth_domain.role_attribute_tooltip')}>
									<CircleHelp size={14} color={Style.L3_FOREGROUND} cursor="help" />
								</Tooltip>
							</label>
							<Form.Item
								name={[...fieldNamePrefix, 'role']}
								className="attribute-mapping-section__form-item"
							>
								<Input
									id="role-attribute"
									placeholder={t('auth_domain.placeholder_role')}
								/>
							</Form.Item>
						</div>
					</div>
				</Collapse.Panel>
			</Collapse>
		</div>
	);
}

export default AttributeMappingSection;
