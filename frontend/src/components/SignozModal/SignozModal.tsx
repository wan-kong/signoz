import { Modal, ModalProps } from 'antd';
import { useTranslation } from 'react-i18next';

import './SignozModal.style.scss';

function SignozModal({
	children,
	width = 672,
	rootClassName = '',
	...rest
}: ModalProps): JSX.Element {
	const { t } = useTranslation('common');

	return (
		<Modal
			centered
			width={width}
			cancelText={t('close')}
			rootClassName={`signoz-modal ${rootClassName}`}
			{...rest}
		>
			{children}
		</Modal>
	);
}

export default SignozModal;
