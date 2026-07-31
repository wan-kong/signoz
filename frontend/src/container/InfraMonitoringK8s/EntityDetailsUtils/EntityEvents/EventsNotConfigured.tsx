import { Typography } from '@signozhq/ui/typography';
import { ArrowRight } from '@signozhq/icons';
import { openInNewTab } from 'utils/navigation';
import { useTranslation } from 'react-i18next';

import emptyStateUrl from '@/assets/Icons/emptyState.svg';

import { translateInfraKey, translateInfraText } from '../../i18n';
import styles from './EventsNotConfigured.module.scss';

const K8S_EVENTS_DOCS_URL =
	'https://signoz.io/docs/infrastructure-monitoring/k8s-metrics/';

export default function EventsNotConfigured(): JSX.Element {
	const { t } = useTranslation('infraMonitoring');

	const handleLearnMore = (): void => {
		openInNewTab(K8S_EVENTS_DOCS_URL);
	};

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<img src={emptyStateUrl} alt="not-configured" className={styles.icon} />
				<Typography.Text>
					<span className={styles.title}>
						{translateInfraKey(
							t,
							'display.no_kubernetes_events_received_yet',
							'No Kubernetes events received yet.',
						)}{' '}
					</span>
					{translateInfraText(
						t,
						'To view events, enable the k8s events receiver in your OpenTelemetry Collector.',
					)}
				</Typography.Text>

				<div
					className={styles.learnMore}
					onClick={handleLearnMore}
					role="button"
					tabIndex={0}
					onKeyDown={(e): void => {
						if (e.key === 'Enter') {
							handleLearnMore();
						}
					}}
				>
					<Typography.Link className={styles.learnMoreText}>
						{translateInfraKey(
							t,
							'display.learn_how_to_configure',
							'Learn how to configure',
						)}
					</Typography.Link>
					<ArrowRight size={14} />
				</div>
			</div>
		</div>
	);
}
