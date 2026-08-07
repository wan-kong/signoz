import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import LearnMore from 'components/LearnMore/LearnMore';
import { Plus } from '@signozhq/icons';
import { useAppContext } from 'providers/App/App';

import alertEmojiUrl from '@/assets/Icons/alert_emoji.svg';

import './FunnelsEmptyState.styles.scss';

interface FunnelsEmptyStateProps {
	onCreateFunnel?: () => void;
}

function FunnelsEmptyState({
	onCreateFunnel,
}: FunnelsEmptyStateProps): JSX.Element {
	const { hasEditPermission } = useAppContext();
	const { t } = useTranslation('trace');

	return (
		<div className="funnels-empty">
			<div className="funnels-empty__content">
				<section className="funnels-empty__header">
					<img
						src={alertEmojiUrl}
						alt={t('funnels_empty.icon_alt', 'funnels-empty-icon')}
						className="funnels-empty__icon"
					/>
					<div>
						<span className="funnels-empty__title">
							{t('funnels_empty.title', 'No funnels yet. ')}
						</span>
						<span className="funnels-empty__subtitle">
							{t(
								'funnels_empty.subtitle',
								'Create a funnel to start analyzing your data',
							)}
						</span>
					</div>
				</section>

				<div className="funnels-empty__actions">
					{hasEditPermission && (
						<Button
							type="primary"
							icon={<Plus size={16} />}
							onClick={onCreateFunnel}
							className="funnels-empty__new-btn"
						>
							{t('funnels.new_funnel', 'New funnel')}
						</Button>
					)}
					<LearnMore url="https://signoz.io/blog/tracing-funnels-observability-distributed-systems/" />
				</div>
			</div>
		</div>
	);
}

FunnelsEmptyState.defaultProps = {
	onCreateFunnel: undefined,
};

export default FunnelsEmptyState;
