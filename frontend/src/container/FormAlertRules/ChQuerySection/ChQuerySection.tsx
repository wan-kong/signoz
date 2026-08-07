import { Callout } from '@signozhq/ui/callout';
import ClickHouseQueryBuilder from 'container/NewWidget/LeftContainer/QuerySection/QueryBuilder/ClickHouse/query';
import { useQueryBuilder } from 'hooks/queryBuilder/useQueryBuilder';
import { useTranslation } from 'react-i18next';
import { AlertTypes } from 'types/api/alerts/alertTypes';
import DOCLINKS from 'utils/docLinks';

import 'container/NewWidget/LeftContainer/QuerySection/QueryBuilder/ClickHouse/ClickHouse.styles.scss';

const ALERT_TYPE_DOC_LINK: Partial<Record<AlertTypes, string>> = {
	[AlertTypes.LOGS_BASED_ALERT]: DOCLINKS.QUERY_CLICKHOUSE_LOGS,
	[AlertTypes.TRACES_BASED_ALERT]: DOCLINKS.QUERY_CLICKHOUSE_TRACES,
	[AlertTypes.EXCEPTIONS_BASED_ALERT]: DOCLINKS.QUERY_CLICKHOUSE_TRACES,
	[AlertTypes.METRICS_BASED_ALERT]: DOCLINKS.QUERY_CLICKHOUSE_METRICS,
};

const ALERT_TYPES_WITH_AGENT_SKILL: AlertTypes[] = [
	AlertTypes.LOGS_BASED_ALERT,
	AlertTypes.TRACES_BASED_ALERT,
	AlertTypes.EXCEPTIONS_BASED_ALERT,
];

interface ChQuerySectionProps {
	alertType: AlertTypes;
}

function ChQuerySection({ alertType }: ChQuerySectionProps): JSX.Element {
	const { t } = useTranslation('common');
	const { currentQuery } = useQueryBuilder();
	const docLink = ALERT_TYPE_DOC_LINK[alertType];
	const showAgentSkill = ALERT_TYPES_WITH_AGENT_SKILL.includes(alertType);

	return (
		<>
			{docLink && (
				<div className="info-banner-wrapper">
					<Callout
						type="info"
						showIcon
						title={
							<span>
								<a href={docLink} target="_blank" rel="noopener">
									{t('ch_query_section.learn_faster')}
								</a>
								{showAgentSkill && (
									<>
										{' · '}
										{t('ch_query_section.using_ai')}{' '}
										<a href={DOCLINKS.AGENT_SKILL_INSTALL} target="_blank" rel="noopener">
											{t('ch_query_section.install_agent')}
										</a>
									</>
								)}
							</span>
						}
					/>
				</div>
			)}
			<ClickHouseQueryBuilder
				key="A"
				queryIndex={0}
				queryData={currentQuery.clickhouse_sql[0]}
				deletable={false}
			/>
		</>
	);
}

export default ChQuerySection;
