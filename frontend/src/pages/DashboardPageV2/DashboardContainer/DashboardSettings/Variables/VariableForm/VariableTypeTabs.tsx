import { Color } from '@signozhq/design-tokens';
import { useTranslation } from 'react-i18next';
import {
	ClipboardType,
	DatabaseZap,
	Info,
	LayoutList,
	Pyramid,
} from '@signozhq/icons';
import { Badge } from '@signozhq/ui/badge';
import { TabsList, TabsTrigger } from '@signozhq/ui/tabs';
import { Typography } from '@signozhq/ui/typography';
import TextToolTip from 'components/TextToolTip';

import styles from './VariableForm.module.scss';

/**
 * Presentational trigger row for the variable-type tabs (label + segmented
 * triggers). Must render inside a `TabsRoot`, which owns the active state and
 * change handling; the matching `TabsContent` panels are siblings in the root.
 */
function VariableTypeTabs(): JSX.Element {
	const { t } = useTranslation('dashboard');

	return (
		<div className={styles.typePicker}>
			<div className={styles.typeLabelContainer}>
				<Typography.Text className={styles.label}>
					{t('dashboard_page_v2.variables.variable_type')}
				</Typography.Text>
				<TextToolTip
					text={t('dashboard_page_v2.variables.learn_supported_types')}
					url="https://signoz.io/docs/userguide/manage-variables/#supported-variable-types"
					urlText={t('dashboard_page_v2.variables.here')}
					useFilledIcon={false}
					outlinedIcon={<Info size={14} />}
				/>
			</div>

			<div className={styles.typeTabsScroll}>
				<TabsList variant="secondary" className={styles.typeTabs}>
					<TabsTrigger
						value="DYNAMIC"
						className={styles.typeTab}
						testId="variable-type-dynamic"
					>
						<Pyramid size={14} />
						{t('dashboard_page_v2.variables.dynamic')}
						<Badge color="robin" className={styles.betaTag}>
							{t('dashboard_page_v2.variables.beta')}
						</Badge>
					</TabsTrigger>
					<TabsTrigger
						value="TEXT"
						className={styles.typeTab}
						testId="variable-type-textbox"
					>
						<ClipboardType size={14} />
						{t('dashboard_page_v2.variables.textbox')}
					</TabsTrigger>
					<TabsTrigger
						value="CUSTOM"
						className={styles.typeTab}
						testId="variable-type-custom"
					>
						<LayoutList size={14} />
						{t('dashboard_page_v2.variables.custom')}
					</TabsTrigger>
					<TabsTrigger
						value="QUERY"
						className={styles.typeTab}
						testId="variable-type-query"
					>
						<DatabaseZap size={14} />
						{t('dashboard_page_v2.variables.query')}
						{/* Wide screens: the full "Not Recommended" pill. */}
						<Badge color="amber" className={styles.notRecommendedBadge}>
							{t('dashboard_page_v2.variables.not_recommended')}
						</Badge>
						{/* Small screens: an amber info icon stands in for the pill (keeps the
						    tab row from overflowing), its tooltip carries the same message + link. */}
						<span
							className={styles.notRecommendedInfo}
							onClick={(e): void => e.stopPropagation()}
							role="presentation"
						>
							<TextToolTip
								text={t('dashboard_page_v2.variables.query_not_recommended_tooltip')}
								url="https://signoz.io/docs/userguide/manage-variables/#why-avoid-clickhouse-query-variables"
								urlText={t('dashboard_page_v2.variables.here')}
								useFilledIcon={false}
								outlinedIcon={<Info size={14} color={Color.BG_AMBER_600} />}
							/>
						</span>
					</TabsTrigger>
				</TabsList>
			</div>
		</div>
	);
}

export default VariableTypeTabs;
