import { Color } from '@signozhq/design-tokens';
import { Button } from 'antd';
import EmptyQuickFilterIcon from 'assets/CustomIcons/EmptyQuickFilterIcon';
import { ArrowUpRight } from '@signozhq/icons';
import { useTranslation } from 'react-i18next';

const QUICK_FILTER_DOC_PATHS: Record<string, string> = {
	severity_text: 'severity-text',
	'deployment.environment': 'environment',
	'service.name': 'service-name',
	'host.name': 'hostname',
	'k8s.cluster.name': 'k8s-cluster-name',
	'k8s.deployment.name': 'k8s-deployment-name',
	'k8s.namespace.name': 'k8s-namespace-name',
	'k8s.pod.name': 'k8s-pod-name',
};

function LogsQuickFilterEmptyState({
	attributeKey,
}: {
	attributeKey: string;
}): JSX.Element {
	const { t } = useTranslation('common');
	const handleLearnMoreClick = (): void => {
		const section = QUICK_FILTER_DOC_PATHS[attributeKey];

		window.open(
			`https://signoz.io/docs/logs-management/features/logs-quick-filters#${section}`,
			'_blank',
		);
	};
	return (
		<section className="go-to-docs">
			<div className="go-to-docs__container">
				<div className="go-to-docs__container-icon">
					<EmptyQuickFilterIcon />
				</div>
				<div className="go-to-docs__container-message">
					{t('parse_attribute_fast_filter')}
				</div>
			</div>
			<Button
				type="link"
				className="go-to-docs__button"
				onClick={handleLearnMoreClick}
			>
				<div className="go-to-docs__button-text">{t('learn_more')}</div>
				<ArrowUpRight size={14} color={Color.BG_ROBIN_400} />
			</Button>
		</section>
	);
}

export default LogsQuickFilterEmptyState;
