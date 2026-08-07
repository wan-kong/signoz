import { useTranslation } from 'react-i18next';
import LearnMore from 'components/LearnMore/LearnMore';

import emptyFunnelIconUrl from '@/assets/Icons/empty-funnel-icon.svg';

import './EmptyFunnelResults.styles.scss';

function EmptyFunnelResults({
	title,
	description,
}: {
	title?: string;
	description?: string;
}): JSX.Element {
	const { t } = useTranslation('funnel_results');

	const displayTitle =
		title ?? t('empty_results.title', 'No spans selected yet.');
	const displayDescription =
		description ??
		t(
			'empty_results.description',
			'Add spans to the funnel steps to start seeing analytics here.',
		);

	return (
		<div className="funnel-results funnel-results--empty">
			<div className="empty-funnel-results">
				<div className="empty-funnel-results__icon">
					<img
						src={emptyFunnelIconUrl}
						alt={t('empty_results.alt', 'Empty funnel results')}
					/>
				</div>
				<div className="empty-funnel-results__title">{displayTitle}</div>
				<div className="empty-funnel-results__description">
					{displayDescription}
				</div>
				<div className="empty-funnel-results__learn-more">
					<LearnMore url="https://signoz.io/blog/tracing-funnels-observability-distributed-systems/" />
				</div>
			</div>
		</div>
	);
}

export default EmptyFunnelResults;
