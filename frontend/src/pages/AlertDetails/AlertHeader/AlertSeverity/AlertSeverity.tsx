import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import * as Sentry from '@sentry/react';
import SeverityCriticalIcon from 'assets/AlertHistory/SeverityCriticalIcon';
import SeverityErrorIcon from 'assets/AlertHistory/SeverityErrorIcon';
import SeverityInfoIcon from 'assets/AlertHistory/SeverityInfoIcon';
import SeverityWarningIcon from 'assets/AlertHistory/SeverityWarningIcon';

import './AlertSeverity.styles.scss';

interface SeverityConfig {
	textKey?: string;
	text?: string;
	className: string;
	icon: JSX.Element;
}

const severityConfig: Record<string, SeverityConfig> = {
	critical: {
		textKey: 'option_critical',
		className: 'alert-severity--critical',
		icon: <SeverityCriticalIcon />,
	},
	error: {
		textKey: 'option_error',
		className: 'alert-severity--error',
		icon: <SeverityErrorIcon />,
	},
	warning: {
		textKey: 'option_warning',
		className: 'alert-severity--warning',
		icon: <SeverityWarningIcon />,
	},
	info: {
		textKey: 'option_info',
		className: 'alert-severity--info',
		icon: <SeverityInfoIcon />,
	},
};

export default function AlertSeverity({
	severity,
}: {
	severity: string;
}): JSX.Element {
	const { t } = useTranslation('alerts');
	const severityDetails = useMemo(() => {
		if (severityConfig[severity]) {
			return severityConfig[severity];
		}

		Sentry.captureEvent({
			message: `Received unknown severity on Alert Details: ${severity}`,
			level: 'error',
		});

		return {
			text: severity,
			className: 'alert-severity--info',
			icon: <SeverityInfoIcon />,
		};
	}, [severity]);
	return (
		<div className={`alert-severity ${severityDetails.className}`}>
			<div className="alert-severity__icon">{severityDetails.icon}</div>
			<div className="alert-severity__text">
				{typeof severityDetails.textKey === 'string'
					? t(severityDetails.textKey)
					: severity}
			</div>
		</div>
	);
}
