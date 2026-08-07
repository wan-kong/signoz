import { Color } from '@signozhq/design-tokens';
import { useTranslation } from 'react-i18next';
import WarningPopover from 'components/WarningPopover/WarningPopover';
import { Querybuildertypesv5QueryWarnDataDTO } from 'api/generated/services/sigNoz.schemas';

import styles from './K8sPaginationWarning.module.scss';
import TriangleAlert from '@signozhq/icons/TriangleAlert';

export type K8sPaginationWarningProps = {
	warning: Querybuildertypesv5QueryWarnDataDTO;
};

export function K8sPaginationWarning({
	warning,
}: K8sPaginationWarningProps): JSX.Element {
	const { t } = useTranslation('infraMonitoring');
	return (
		<span data-testid="k8s-list-warning-popover">
			<WarningPopover
				warningData={{
					code: 'WARNING',
					message: warning.message ?? '',
					url: warning.url ?? '',
					warnings:
						warning.warnings?.map((w) => ({ message: w.message ?? '' })) ?? [],
				}}
			>
				<div className={styles.paginationWarning}>
					{t('k8s_empty_state.warnings')}
					<TriangleAlert
						size={16}
						className={styles.warningIcon}
						color={Color.BG_AMBER_500}
					/>
				</div>
			</WarningPopover>
		</span>
	);
}
