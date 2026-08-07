import i18n from 'ReactI18';
import type { DefaultOptionType } from 'antd/es/select';

import {
	BooleanFormats,
	Category,
	CategoryNames,
	DataFormats,
	DataRateFormats,
	HelperCategory,
	HelperFormat,
	MiscellaneousFormats,
	ThroughputFormats,
	TimeFormats,
} from './types';

export const alertsCategory = [
	{
		name: CategoryNames.Time,
		formats: [
			{
				name: i18n.t('alert_format.nanoseconds', 'nanoseconds (ns)', {
					ns: 'new_widget_components',
				}),
				id: TimeFormats.Nanoseconds,
			},
			{
				name: i18n.t('alert_format.microseconds', 'microseconds (µs)', {
					ns: 'new_widget_components',
				}),
				id: TimeFormats.Microseconds,
			},
			{
				name: i18n.t('alert_format.milliseconds', 'milliseconds (ms)', {
					ns: 'new_widget_components',
				}),
				id: TimeFormats.Milliseconds,
			},
			{
				name: i18n.t('alert_format.seconds', 'seconds (s)', {
					ns: 'new_widget_components',
				}),
				id: TimeFormats.Seconds,
			},
			{
				name: i18n.t('alert_format.minutes', 'minutes (m)', {
					ns: 'new_widget_components',
				}),
				id: TimeFormats.Minutes,
			},
			{
				name: i18n.t('alert_format.hours', 'hours (h)', {
					ns: 'new_widget_components',
				}),
				id: TimeFormats.Hours,
			},
			{
				name: i18n.t('alert_format.days', 'days (d)', {
					ns: 'new_widget_components',
				}),
				id: TimeFormats.Days,
			},
		],
	},
	{
		name: CategoryNames.Data,
		formats: [
			{
				name: i18n.t('alert_format.bytes_iec', 'bytes(IEC)', {
					ns: 'new_widget_components',
				}),
				id: DataFormats.BytesIEC,
			},
			{
				name: i18n.t('alert_format.bytes_si', 'bytes(SI)', {
					ns: 'new_widget_components',
				}),
				id: DataFormats.BytesSI,
			},
			{
				name: i18n.t('alert_format.bits_iec', 'bits(IEC)', {
					ns: 'new_widget_components',
				}),
				id: DataFormats.BitsIEC,
			},
			{
				name: i18n.t('alert_format.bits_si', 'bits(SI)', {
					ns: 'new_widget_components',
				}),
				id: DataFormats.BitsSI,
			},
			{
				name: i18n.t('alert_format.kibibytes', 'kibibytes', {
					ns: 'new_widget_components',
				}),
				id: DataFormats.KibiBytes,
			},
			{
				name: i18n.t('alert_format.kilobytes', 'kilobytes', {
					ns: 'new_widget_components',
				}),
				id: DataFormats.KiloBytes,
			},
			{
				name: i18n.t('alert_format.mebibytes', 'mebibytes', {
					ns: 'new_widget_components',
				}),
				id: DataFormats.MebiBytes,
			},
			{
				name: i18n.t('alert_format.megabytes', 'megabytes', {
					ns: 'new_widget_components',
				}),
				id: DataFormats.MegaBytes,
			},
			{
				name: i18n.t('alert_format.gibibytes', 'gibibytes', {
					ns: 'new_widget_components',
				}),
				id: DataFormats.GibiBytes,
			},
			{
				name: i18n.t('alert_format.gigabytes', 'gigabytes', {
					ns: 'new_widget_components',
				}),
				id: DataFormats.GigaBytes,
			},
			{
				name: i18n.t('alert_format.tebibytes', 'tebibytes', {
					ns: 'new_widget_components',
				}),
				id: DataFormats.TebiBytes,
			},
			{
				name: i18n.t('alert_format.terabytes', 'terabytes', {
					ns: 'new_widget_components',
				}),
				id: DataFormats.TeraBytes,
			},
			{
				name: i18n.t('alert_format.pebibytes', 'pebibytes', {
					ns: 'new_widget_components',
				}),
				id: DataFormats.PebiBytes,
			},
			{
				name: i18n.t('alert_format.petabytes', 'petabytes', {
					ns: 'new_widget_components',
				}),
				id: DataFormats.PetaBytes,
			},
		],
	},
	{
		name: CategoryNames.DataRate,
		formats: [
			{
				name: i18n.t('alert_format.bytes_per_sec_iec', 'bytes/sec(IEC)', {
					ns: 'new_widget_components',
				}),
				id: DataRateFormats.BytesPerSecIEC,
			},
			{
				name: i18n.t('alert_format.bytes_per_sec_si', 'bytes/sec(SI)', {
					ns: 'new_widget_components',
				}),
				id: DataRateFormats.BytesPerSecSI,
			},
			{
				name: i18n.t('alert_format.bits_per_sec_iec', 'bits/sec(IEC)', {
					ns: 'new_widget_components',
				}),
				id: DataRateFormats.BitsPerSecIEC,
			},
			{
				name: i18n.t('alert_format.bits_per_sec_si', 'bits/sec(SI)', {
					ns: 'new_widget_components',
				}),
				id: DataRateFormats.BitsPerSecSI,
			},
			{
				name: i18n.t('alert_format.kibibytes_per_sec', 'kibibytes/sec', {
					ns: 'new_widget_components',
				}),
				id: DataRateFormats.KibiBytesPerSec,
			},
			{
				name: i18n.t('alert_format.kibibits_per_sec', 'kibibits/sec', {
					ns: 'new_widget_components',
				}),
				id: DataRateFormats.KibiBitsPerSec,
			},
			{
				name: i18n.t('alert_format.kilobytes_per_sec', 'kilobytes/sec', {
					ns: 'new_widget_components',
				}),
				id: DataRateFormats.KiloBytesPerSec,
			},
			{
				name: i18n.t('alert_format.kilobits_per_sec', 'kilobits/sec', {
					ns: 'new_widget_components',
				}),
				id: DataRateFormats.KiloBitsPerSec,
			},
			{
				name: i18n.t('alert_format.mebibytes_per_sec', 'mebibytes/sec', {
					ns: 'new_widget_components',
				}),
				id: DataRateFormats.MebiBytesPerSec,
			},
			{
				name: i18n.t('alert_format.mebibits_per_sec', 'mebibits/sec', {
					ns: 'new_widget_components',
				}),
				id: DataRateFormats.MebiBitsPerSec,
			},
			{
				name: i18n.t('alert_format.megabytes_per_sec', 'megabytes/sec', {
					ns: 'new_widget_components',
				}),
				id: DataRateFormats.MegaBytesPerSec,
			},
			{
				name: i18n.t('alert_format.megabits_per_sec', 'megabits/sec', {
					ns: 'new_widget_components',
				}),
				id: DataRateFormats.MegaBitsPerSec,
			},
			{
				name: i18n.t('alert_format.gibibytes_per_sec', 'gibibytes/sec', {
					ns: 'new_widget_components',
				}),
				id: DataRateFormats.GibiBytesPerSec,
			},
			{
				name: i18n.t('alert_format.gibibits_per_sec', 'gibibits/sec', {
					ns: 'new_widget_components',
				}),
				id: DataRateFormats.GibiBitsPerSec,
			},
			{
				name: i18n.t('alert_format.gigabytes_per_sec', 'gigabytes/sec', {
					ns: 'new_widget_components',
				}),
				id: DataRateFormats.GigaBytesPerSec,
			},
			{
				name: i18n.t('alert_format.gigabits_per_sec', 'gigabits/sec', {
					ns: 'new_widget_components',
				}),
				id: DataRateFormats.GigaBitsPerSec,
			},
			{
				name: i18n.t('alert_format.tebibytes_per_sec', 'tebibytes/sec', {
					ns: 'new_widget_components',
				}),
				id: DataRateFormats.TebiBytesPerSec,
			},
			{
				name: i18n.t('alert_format.tebibits_per_sec', 'tebibits/sec', {
					ns: 'new_widget_components',
				}),
				id: DataRateFormats.TebiBitsPerSec,
			},
			{
				name: i18n.t('alert_format.terabytes_per_sec', 'terabytes/sec', {
					ns: 'new_widget_components',
				}),
				id: DataRateFormats.TeraBytesPerSec,
			},
			{
				name: i18n.t('alert_format.terabits_per_sec', 'terabits/sec', {
					ns: 'new_widget_components',
				}),
				id: DataRateFormats.TeraBitsPerSec,
			},
			{
				name: i18n.t('alert_format.pebibytes_per_sec', 'pebibytes/sec', {
					ns: 'new_widget_components',
				}),
				id: DataRateFormats.PebiBytesPerSec,
			},
			{
				name: i18n.t('alert_format.pebibits_per_sec', 'pebibits/sec', {
					ns: 'new_widget_components',
				}),
				id: DataRateFormats.PebiBitsPerSec,
			},
			{
				name: i18n.t('alert_format.petabytes_per_sec', 'petabytes/sec', {
					ns: 'new_widget_components',
				}),
				id: DataRateFormats.PetaBytesPerSec,
			},
			{
				name: i18n.t('alert_format.petabits_per_sec', 'petabits/sec', {
					ns: 'new_widget_components',
				}),
				id: DataRateFormats.PetaBitsPerSec,
			},
		],
	},
	{
		name: CategoryNames.Miscellaneous,
		formats: [
			{
				name: i18n.t('alert_format.percent_unit', 'Percent (0.0-1.0)', {
					ns: 'new_widget_components',
				}),
				id: MiscellaneousFormats.PercentUnit,
			},
			{
				name: i18n.t('alert_format.percent', 'Percent (0 - 100)', {
					ns: 'new_widget_components',
				}),
				id: MiscellaneousFormats.Percent,
			},
		],
	},
	{
		name: CategoryNames.Boolean,
		formats: [
			{
				name: i18n.t('alert_format.true_false', 'True / False', {
					ns: 'new_widget_components',
				}),
				id: BooleanFormats.TRUE_FALSE,
			},
			{
				name: i18n.t('alert_format.yes_no', 'Yes / No', {
					ns: 'new_widget_components',
				}),
				id: BooleanFormats.YES_NO,
			},
		],
	},
	{
		name: CategoryNames.Throughput,
		formats: [
			{
				name: i18n.t('alert_format.counts_per_sec', 'counts/sec (cps)', {
					ns: 'new_widget_components',
				}),
				id: ThroughputFormats.CountsPerSec,
			},
			{
				name: i18n.t('alert_format.ops_per_sec', 'ops/sec (ops)', {
					ns: 'new_widget_components',
				}),
				id: ThroughputFormats.OpsPerSec,
			},
			{
				name: i18n.t('alert_format.requests_per_sec', 'requests/sec (reqps)', {
					ns: 'new_widget_components',
				}),
				id: ThroughputFormats.RequestsPerSec,
			},
			{
				name: i18n.t('alert_format.reads_per_sec', 'reads/sec (rps)', {
					ns: 'new_widget_components',
				}),
				id: ThroughputFormats.ReadsPerSec,
			},
			{
				name: i18n.t('alert_format.writes_per_sec', 'writes/sec (wps)', {
					ns: 'new_widget_components',
				}),
				id: ThroughputFormats.WritesPerSec,
			},
			{
				name: i18n.t('alert_format.io_ops_per_sec', 'I/O operations/sec (iops)', {
					ns: 'new_widget_components',
				}),
				id: ThroughputFormats.IOOpsPerSec,
			},
			{
				name: i18n.t('alert_format.counts_per_min', 'counts/min (cpm)', {
					ns: 'new_widget_components',
				}),
				id: ThroughputFormats.CountsPerMin,
			},
			{
				name: i18n.t('alert_format.ops_per_min', 'ops/min (opm)', {
					ns: 'new_widget_components',
				}),
				id: ThroughputFormats.OpsPerMin,
			},
			{
				name: i18n.t('alert_format.reads_per_min', 'reads/min (rpm)', {
					ns: 'new_widget_components',
				}),
				id: ThroughputFormats.ReadsPerMin,
			},
			{
				name: i18n.t('alert_format.writes_per_min', 'writes/min (wpm)', {
					ns: 'new_widget_components',
				}),
				id: ThroughputFormats.WritesPerMin,
			},
		],
	},
];

export const getCategorySelectOptionByName = (
	name?: CategoryNames | string,
): DefaultOptionType[] =>
	alertsCategory
		.find((category) => category.name === name)
		?.formats.map((format) => ({
			label: format.name,
			value: format.id,
		})) || [];

export const getCategoryByOptionId = (id: string): Category | undefined =>
	alertsCategory.find((category) =>
		category.formats.some((format) => format.id === id),
	);

export const isCategoryName = (name: string): name is CategoryNames =>
	alertsCategory.some((category) => category.name === name);

const allFormats: HelperFormat[] = alertsCategory.flatMap(
	(category: HelperCategory) => category.formats,
);

export const getFormatNameByOptionId = (id: string): string | undefined =>
	allFormats.find((format) => format.id === id)?.name;
