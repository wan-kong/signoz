import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Select, Tooltip } from 'antd';

import './EmailTagInput.styles.scss';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface EmailTagInputProps {
	value?: string[];
	onChange?: (value: string[]) => void;
	placeholder?: string;
}

function EmailTagInput({
	value = [],
	onChange,
	placeholder,
}: EmailTagInputProps): JSX.Element {
	const { t } = useTranslation('common');
	const resolvedPlaceholder = placeholder ?? t('auth_domain.type_email_enter');
	const [validationError, setValidationError] = useState('');

	const handleChange = useCallback(
		(newValues: string[]): void => {
			const addedValues = newValues.filter((v) => !value.includes(v));
			const invalidEmail = addedValues.find((v) => !EMAIL_REGEX.test(v));

			if (invalidEmail) {
				setValidationError(t('auth_domain.invalid_email', { invalidEmail }));
				return;
			}
			setValidationError('');
			onChange?.(newValues);
		},
		[onChange, value, t],
	);

	return (
		<div className="email-tag-input">
			<Tooltip
				title={validationError}
				open={!!validationError}
				placement="topRight"
			>
				<Select
					mode="tags"
					value={value}
					onChange={handleChange}
					placeholder={resolvedPlaceholder}
					tokenSeparators={[',', ' ']}
					className="email-tag-input__select"
					allowClear
					status={validationError ? 'error' : undefined}
				/>
			</Tooltip>
		</div>
	);
}

export default EmailTagInput;
