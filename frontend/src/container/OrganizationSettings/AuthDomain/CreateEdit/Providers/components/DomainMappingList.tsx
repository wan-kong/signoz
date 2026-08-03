import { useTranslation } from 'react-i18next';
import { Plus, Trash2 } from '@signozhq/icons';
import { Button } from '@signozhq/ui/button';
import { Input } from '@signozhq/ui/input';
import { Form } from 'antd';

import './DomainMappingList.styles.scss';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface DomainMappingListProps {
	fieldNamePrefix: string[];
}

function DomainMappingList({
	fieldNamePrefix,
}: DomainMappingListProps): JSX.Element {
	const { t } = useTranslation('organizationsettings');

	const validateEmail = (_: unknown, value: string): Promise<void> => {
		if (!value) {
			return Promise.reject(new Error(t('auth_domain.admin_email_required')));
		}
		if (!EMAIL_REGEX.test(value)) {
			return Promise.reject(new Error(t('auth_domain.invalid_email')));
		}
		return Promise.resolve();
	};

	return (
		<div className="domain-mapping-list">
			<div className="domain-mapping-list__header">
				<span className="domain-mapping-list__title">
					{t('auth_domain.domain_to_admin_email')}
				</span>
				<p className="domain-mapping-list__description">
					{t('auth_domain.domain_to_admin_email_desc')}
				</p>
			</div>

			<Form.List name={fieldNamePrefix}>
				{(fields, { add, remove }): JSX.Element => (
					<div className="domain-mapping-list__items">
						{fields.map((field) => (
							<div key={field.key} className="domain-mapping-list__row">
								<Form.Item
									name={[field.name, 'domain']}
									className="domain-mapping-list__field"
									rules={[{ required: true, message: t('auth_domain.domain_required') }]}
								>
									<Input placeholder={t('auth_domain.domain_placeholder')} />
								</Form.Item>

								<Form.Item
									name={[field.name, 'adminEmail']}
									className="domain-mapping-list__field"
									rules={[{ validator: validateEmail }]}
								>
									<Input placeholder={t('auth_domain.admin_email')} />
								</Form.Item>

								<Button
									variant="ghost"
									color="secondary"
									className="domain-mapping-list__remove-btn"
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
							onClick={(): void => add({ domain: '', adminEmail: '' })}
							prefix={<Plus size={14} />}
						>
							{t('auth_domain.add_domain_mapping')}
						</Button>
					</div>
				)}
			</Form.List>
		</div>
	);
}

export default DomainMappingList;
