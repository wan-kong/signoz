import { useTranslation } from 'react-i18next';
import { Progress } from '@signozhq/ui/progress';

import { ChecklistItem } from '../HomeChecklist/HomeChecklist';

import './StepsProgress.styles.scss';

function StepsProgress({
	checklistItems,
}: {
	checklistItems: ChecklistItem[];
}): JSX.Element {
	const { t } = useTranslation('home');
	const completedChecklistItems = checklistItems.filter(
		(item) => item.completed,
	);

	const totalChecklistItems = checklistItems.length;

	const progress = (completedChecklistItems.length / totalChecklistItems) * 100;

	return (
		<div className="steps-progress-container">
			<div className="steps-progress-title">
				<div className="steps-progress-title-text">{t('steps_progress.title')}</div>
				<div className="steps-progress-count">
					{t('steps_progress.step_count', {
						completed: completedChecklistItems.length,
						total: totalChecklistItems,
					})}
				</div>
			</div>

			<div className="steps-progress-progress">
				<Progress
					steps={totalChecklistItems}
					percent={progress}
					showInfo={false}
					strokeLinecap="butt"
				/>
			</div>
		</div>
	);
}

export default StepsProgress;
