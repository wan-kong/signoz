import i18n from 'ReactI18';
import { UseMutateAsyncFunction } from 'react-query';
import type { NotificationInstance } from 'antd/es/notification/interface';
import {
	ApDexPayloadAndSettingsProps,
	SetApDexPayloadProps,
} from 'types/api/metrics/getApDex';

export enum MetricsApplicationTab {
	OVER_METRICS = 'OVER_METRICS',
	DB_CALL_METRICS = 'DB_CALL_METRICS',
	EXTERNAL_METRICS = 'EXTERNAL_METRICS',
}

export const TAB_KEY_VS_LABEL = {
	[MetricsApplicationTab.OVER_METRICS]: i18n.t(
		'metrics_application.overview',
		'Overview',
		{ ns: 'common' },
	),
	[MetricsApplicationTab.DB_CALL_METRICS]: i18n.t(
		'metrics_application_extra.db_call_metrics',
		'DB Call Metrics',
		{ ns: 'common' },
	),
	[MetricsApplicationTab.EXTERNAL_METRICS]: i18n.t(
		'metrics_application_extra.external_metrics',
		'External Metrics',
		{ ns: 'common' },
	),
};

export interface OnSaveApDexSettingsProps {
	thresholdValue: number;
	servicename: string;
	notifications: NotificationInstance;
	refetchGetApDexSetting?: VoidFunction;
	mutateAsync: UseMutateAsyncFunction<
		SetApDexPayloadProps,
		Error,
		ApDexPayloadAndSettingsProps
	>;
	handlePopOverClose: VoidFunction;
}
