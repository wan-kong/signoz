import { useEffect, useRef } from 'react';
import { Typography } from '@signozhq/ui/typography';
import logEvent from 'api/common/logEvent';
import cx from 'classnames';
import LearnMore from 'components/LearnMore/LearnMore';
import { EmptyLogsListConfig } from 'container/LogsExplorerList/utils';
import { Delete } from '@signozhq/icons';
import { useTranslation } from 'react-i18next';
import { DataSource, PanelTypeKeys } from 'types/common/queryBuilder';

import emptyStateUrl from '@/assets/Icons/emptyState.svg';

import './EmptyLogsSearch.styles.scss';

interface EmptyLogsSearchProps {
	dataSource: DataSource;
	panelType: PanelTypeKeys;
	customMessage?: EmptyLogsListConfig;
}

export default function EmptyLogsSearch({
	dataSource,
	panelType,
	customMessage,
}: EmptyLogsSearchProps): JSX.Element {
	const { t } = useTranslation('logs');
	const logEventCalledRef = useRef(false);
	useEffect(() => {
		if (!logEventCalledRef.current) {
			if (dataSource === DataSource.TRACES) {
				void logEvent('Traces Explorer: No results', {
					panelType,
				});
			} else if (dataSource === DataSource.LOGS) {
				void logEvent('Logs Explorer: No results', {
					panelType,
				});
			}
			logEventCalledRef.current = true;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			className={cx('empty-logs-search__container', {
				'empty-logs-search__container--custom-message': !!customMessage,
			})}
		>
			<div className="empty-logs-search__row">
				<div className="empty-logs-search__content">
					<img
						src={emptyStateUrl}
						alt="thinking-emoji"
						className="empty-state-svg"
					/>
					{customMessage ? (
						<>
							<div className="empty-logs-search__header">
								<Typography.Text className="empty-logs-search__title">
									{t(customMessage.title)}
								</Typography.Text>
								{customMessage.subTitle && (
									<Typography.Text className="empty-logs-search__subtitle">
										{t(customMessage.subTitle)}
									</Typography.Text>
								)}
							</div>
							{Array.isArray(customMessage.description) ? (
								<ul className="empty-logs-search__description-list">
									{customMessage.description.map((desc) => (
										<li key={desc}>{t(desc)}</li>
									))}
								</ul>
							) : (
								<Typography.Text className="empty-logs-search__description">
									{t(customMessage.description)}
								</Typography.Text>
							)}
							{/* Clear filters button */}
							{customMessage.showClearFiltersButton && (
								<button
									type="button"
									className="empty-logs-search__clear-filters-btn"
									onClick={customMessage.onClearFilters}
								>
									{customMessage.clearFiltersButtonText &&
										t(customMessage.clearFiltersButtonText)}
									<span className="empty-logs-search__clear-filters-btn-icon">
										<Delete size={14} />
										{t('empty.search.clear_filters')}
									</span>
								</button>
							)}
						</>
					) : (
						<Typography.Text>
							<span className="empty-logs-search__sub-text">
								{t('empty.search.no_results')}{' '}
							</span>
							{t('empty.search.edit_query')}
						</Typography.Text>
					)}
				</div>
				{customMessage?.documentationLinks && (
					<div className="empty-logs-search__resources-card">
						<div className="empty-logs-search__resources-title">
							{t('empty.search.resources')}
						</div>
						<div className="empty-logs-search__resources-links">
							{customMessage.documentationLinks.map((link) => (
								<LearnMore key={link.text} text={t(link.text)} url={link.url} />
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

EmptyLogsSearch.defaultProps = {
	customMessage: null,
};
