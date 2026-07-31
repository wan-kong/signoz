import { ReactNode, useCallback, useEffect } from 'react';
import { useCopyToClipboard } from 'react-use';
import { Popover } from 'antd';
import { useNotifications } from 'hooks/useNotifications';
import { useTranslation } from 'react-i18next';

function CopyClipboardHOC({
	entityKey,
	textToCopy,
	tooltipText,
	children,
}: CopyClipboardHOCProps): JSX.Element {
	const { t } = useTranslation('logs');
	const [value, setCopy] = useCopyToClipboard();
	const { notifications } = useNotifications();
	useEffect(() => {
		if (value.value) {
			const key = entityKey || '';

			const notificationMessage = t('details.clipboard.copied', { field: key });

			notifications.success({
				message: notificationMessage,
				key: notificationMessage,
			});
		}
	}, [value, notifications, entityKey, t]);

	const onClick = useCallback((): void => {
		setCopy(textToCopy);
	}, [setCopy, textToCopy]);

	return (
		<span onClick={onClick} role="presentation" tabIndex={-1}>
			<Popover
				placement="top"
				overlayClassName="drawer-popover"
				content={
					<span style={{ fontSize: '0.9rem' }}>
						{tooltipText || t('details.clipboard.copy')}
					</span>
				}
			>
				{children}
			</Popover>
		</span>
	);
}

interface CopyClipboardHOCProps {
	entityKey: string | undefined;
	textToCopy: string;
	tooltipText?: string;
	children: ReactNode;
}

export default CopyClipboardHOC;
