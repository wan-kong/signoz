import { CSSProperties } from 'react';

import type { ViewModeOption } from './types';

export const viewModeOptionList: ViewModeOption[] = [
	{
		key: 'raw',
		label: 'view_modes.raw',
		value: 'raw',
	},
	{
		key: 'table',
		label: 'view_modes.table',
		value: 'table',
	},
	{
		key: 'list',
		label: 'view_modes.list',
		value: 'list',
	},
];

export const logsOptions = ['raw', 'table'];

export const defaultSelectStyle: CSSProperties = {
	minWidth: '6rem',
};

export enum OrderPreferenceItems {
	DESC = 'desc',
	ASC = 'asc',
}

export const orderItems: OrderPreference[] = [
	{
		name: 'order.descending',
		enum: OrderPreferenceItems.DESC,
	},
	{
		name: 'order.ascending',
		enum: OrderPreferenceItems.ASC,
	},
];

export interface OrderPreference {
	name: string;
	enum: OrderPreferenceItems;
}
