import { useHistory, useLocation } from 'react-router-dom';
import { Select, Spin } from 'antd';
import { Typography } from '@signozhq/ui/typography';
import { useTranslation } from 'react-i18next';
import { SelectMaxTagPlaceholder } from 'components/MessagingQueues/MQCommon/MQCommon';
import { QueryParams } from 'constants/query';
import useUrlQuery from 'hooks/useUrlQuery';

import {
	getValuesFromQueryParams,
	setQueryParamsFromOptions,
} from '../CeleryUtils';
import { useCeleryFilterOptions } from '../useCeleryFilterOptions';

import './CeleryTaskConfigOptions.styles.scss';

function CeleryTaskConfigOptions(): JSX.Element {
	const { t } = useTranslation('common');
	const { handleSearch, isFetching, options } =
		useCeleryFilterOptions('celery.task_name');
	const history = useHistory();
	const location = useLocation();

	const urlQuery = useUrlQuery();

	return (
		<div className="celery-task-filters">
			<div className="celery-filters">
				<Typography.Text style={{ whiteSpace: 'nowrap' }}>
					{t('celery.task_name')}
				</Typography.Text>
				<Select
					placeholder={t('celery.task_name')}
					showSearch
					mode="multiple"
					options={options}
					loading={isFetching}
					className="config-select-option"
					onSearch={handleSearch}
					maxTagCount={4}
					maxTagPlaceholder={SelectMaxTagPlaceholder}
					value={getValuesFromQueryParams(QueryParams.taskName, urlQuery) || []}
					notFoundContent={
						isFetching ? (
							<span>
								<Spin size="small" /> {t('celery.loading')}
							</span>
						) : (
							<span>{t('celery.no_task_found')}</span>
						)
					}
					onChange={(value): void => {
						handleSearch('');
						setQueryParamsFromOptions(
							value,
							urlQuery,
							history,
							location,
							QueryParams.taskName,
						);
					}}
				/>
			</div>
		</div>
	);
}

export default CeleryTaskConfigOptions;
