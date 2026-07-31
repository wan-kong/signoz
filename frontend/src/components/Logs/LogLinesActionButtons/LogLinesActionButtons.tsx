import { memo, MouseEventHandler } from 'react';
import { Link, TextSelect } from '@signozhq/icons';
import { Button, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

import './LogLinesActionButtons.styles.scss';

export interface LogLinesActionButtonsProps {
	handleShowContext: MouseEventHandler<HTMLElement>;
	onLogCopy: MouseEventHandler<HTMLElement>;
	customClassName?: string;
}

function LogLinesActionButtons({
	handleShowContext,
	onLogCopy,
	customClassName = '',
}: LogLinesActionButtonsProps): JSX.Element {
	const { t } = useTranslation('logs');

	return (
		<div className={`log-line-action-buttons ${customClassName}`}>
			<Tooltip title={t('log_line_actions.show_in_context')}>
				<Button
					size="small"
					icon={<TextSelect size={14} />}
					className="show-context-btn"
					onClick={handleShowContext}
				/>
			</Tooltip>
			<Tooltip title={t('log_line_actions.copy_link')}>
				<Button
					size="small"
					icon={<Link size={14} />}
					onClick={onLogCopy}
					className="copy-log-btn"
				/>
			</Tooltip>
		</div>
	);
}

LogLinesActionButtons.defaultProps = {
	customClassName: '',
};

export default memo(LogLinesActionButtons);
