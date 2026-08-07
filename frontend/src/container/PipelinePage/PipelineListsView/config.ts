import i18n from 'ReactI18';
import {
	TableColumnGroupType as ColumnGroupType,
	TableColumnType as ColumnType,
} from 'antd/';
import {
	HistoryData,
	PipelineData,
	ProcessorData,
} from 'types/api/pipeline/def';

import DeploymentStage from '../Layouts/ChangeHistory/DeploymentStage';
import DeploymentTime from '../Layouts/ChangeHistory/DeploymentTime';
import DescriptionTextArea from './AddNewPipeline/FormFields/DescriptionTextArea';
import FilterInput from './AddNewPipeline/FormFields/FilterInput';
import NameInput from './AddNewPipeline/FormFields/NameInput';

export const pipelineFields = [
	{
		id: 1,
		fieldName: i18n.t('pipeline_lists.name', 'Name', { ns: 'pipeline' }),
		placeholder: 'pipeline_name_placeholder',
		name: 'name',
		component: NameInput,
	},
	{
		id: 2,
		fieldName: i18n.t('pipeline_lists.description', 'Description', {
			ns: 'pipeline',
		}),
		placeholder: 'pipeline_description_placeholder',
		name: 'description',
		component: DescriptionTextArea,
	},
	{
		id: 3,
		fieldName: i18n.t('pipeline_lists.filter', 'Filter', { ns: 'pipeline' }),
		placeholder: 'pipeline_filter_placeholder',
		name: 'filter',
		component: FilterInput,
	},
];

export const tagInputStyle: React.CSSProperties = {
	width: 78,
	verticalAlign: 'top',
	flex: 1,
};

export const pipelineColumns: Array<
	ColumnType<PipelineData> | ColumnGroupType<PipelineData>
> = [
	{
		key: 'orderId',
		title: '',
		dataIndex: 'orderId',
	},
	{
		key: 'name',
		title: String(
			i18n.t('pipeline_lists.pipeline_name', 'Pipeline Name', { ns: 'pipeline' }),
		),
		dataIndex: 'name',
	},
	{
		key: 'filter',
		title: String(
			i18n.t('pipeline_lists.filters', 'Filters', { ns: 'pipeline' }),
		),
		dataIndex: 'filter',
	},

	{
		key: 'createdAt',
		title: String(
			i18n.t('pipeline_lists.last_edited', 'Last Edited', { ns: 'pipeline' }),
		),
		dataIndex: 'createdAt',
	},
	{
		key: 'createdBy',
		title: String(
			i18n.t('pipeline_lists.edited_by', 'Edited By', { ns: 'pipeline' }),
		),
		dataIndex: 'createdBy',
	},
];

export const processorColumns: Array<
	ColumnType<ProcessorData> | ColumnGroupType<ProcessorData>
> = [
	{
		key: 'id',
		title: '',
		dataIndex: 'orderId',
		width: 150,
	},
	{
		key: 'name',
		title: '',
		dataIndex: 'name',
	},
];

export const changeHistoryColumns: Array<
	ColumnType<HistoryData> | ColumnGroupType<HistoryData>
> = [
	{
		key: 'version',
		title: String(
			i18n.t('change_history.version', 'Version', { ns: 'pipeline' }),
		),
		dataIndex: 'version',
	},
	{
		title: String(
			i18n.t('change_history.deployment_stage', 'Deployment Stage', {
				ns: 'pipeline',
			}),
		),
		key: 'deployStatus',
		dataIndex: 'deployStatus',
		render: DeploymentStage,
	},
	{
		key: 'deployResult',
		title: String(
			i18n.t('change_history.last_deploy_message', 'Last Deploy Message', {
				ns: 'pipeline',
			}),
		),
		dataIndex: 'deployResult',
		ellipsis: true,
	},
	{
		key: 'createdAt',
		title: String(
			i18n.t('change_history.last_deployed_time', 'Last Deployed Time', {
				ns: 'pipeline',
			}),
		),
		dataIndex: 'createdAt',
		render: DeploymentTime,
	},
	{
		key: 'createdByName',
		title: String(
			i18n.t('change_history.edited_by', 'Edited by', { ns: 'pipeline' }),
		),
		dataIndex: 'createdByName',
	},
];

export const formValidationRules = [
	{
		required: true,
	},
];

export const iconStyle = { fontSize: '1rem' };
export const smallIconStyle = { fontSize: '0.75rem' };
export const holdIconStyle = { ...iconStyle, cursor: 'move' };
