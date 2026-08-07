import i18n from 'ReactI18';
import * as Sentry from '@sentry/react';
import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { rrulestr } from 'rrule';

import { ADVANCED_OPTIONS_TIME_UNIT_OPTIONS } from '../context/constants';
import { EvaluationWindowState } from '../context/types';
import { WEEKDAY_MAP } from './constants';
import { CumulativeWindowTimeframes, RollingWindowTimeframes } from './types';

// Extend dayjs with timezone plugins
dayjs.extend(utc);
dayjs.extend(timezone);

export const getEvaluationWindowTypeText = (
	windowType: 'rolling' | 'cumulative',
): string => {
	switch (windowType) {
		case 'rolling':
			return i18n.t('eval_window_rolling', 'Rolling', { ns: 'create_alert' });
		case 'cumulative':
			return i18n.t('eval_window_cumulative', 'Cumulative', {
				ns: 'create_alert',
			});
		default:
			return '';
	}
};

export const getCumulativeWindowTimeframeText = (
	evaluationWindow: EvaluationWindowState,
): string => {
	switch (evaluationWindow.timeframe) {
		case CumulativeWindowTimeframes.CURRENT_HOUR:
			return i18n.t(
				'eval_current_hour_starting_at',
				'Current hour, starting at minute {{number}} ({{timezone}})',
				{
					number: evaluationWindow.startingAt.number,
					timezone: evaluationWindow.startingAt.timezone,
					ns: 'create_alert',
				},
			);
		case CumulativeWindowTimeframes.CURRENT_DAY:
			return i18n.t(
				'eval_current_day_starting_from',
				'Current day, starting from {{time}} ({{timezone}})',
				{
					time: evaluationWindow.startingAt.time,
					timezone: evaluationWindow.startingAt.timezone,
					ns: 'create_alert',
				},
			);
		case CumulativeWindowTimeframes.CURRENT_MONTH:
			return i18n.t(
				'eval_current_month_starting_from',
				'Current month, starting from day {{number}} at {{time}} ({{timezone}})',
				{
					number: evaluationWindow.startingAt.number,
					time: evaluationWindow.startingAt.time,
					timezone: evaluationWindow.startingAt.timezone,
					ns: 'create_alert',
				},
			);
		default:
			return '';
	}
};

export const getRollingWindowTimeframeText = (
	timeframe: RollingWindowTimeframes,
): string => {
	switch (timeframe) {
		case RollingWindowTimeframes.LAST_5_MINUTES:
			return i18n.t('eval_last_5_minutes', 'Last 5 minutes', {
				ns: 'create_alert',
			});
		case RollingWindowTimeframes.LAST_10_MINUTES:
			return i18n.t('eval_last_10_minutes', 'Last 10 minutes', {
				ns: 'create_alert',
			});
		case RollingWindowTimeframes.LAST_15_MINUTES:
			return i18n.t('eval_last_15_minutes', 'Last 15 minutes', {
				ns: 'create_alert',
			});
		case RollingWindowTimeframes.LAST_30_MINUTES:
			return i18n.t('eval_last_30_minutes', 'Last 30 minutes', {
				ns: 'create_alert',
			});
		case RollingWindowTimeframes.LAST_1_HOUR:
			return i18n.t('eval_last_1_hour', 'Last 1 hour', {
				ns: 'create_alert',
			});
		case RollingWindowTimeframes.LAST_2_HOURS:
			return i18n.t('eval_last_2_hours', 'Last 2 hours', {
				ns: 'create_alert',
			});
		case RollingWindowTimeframes.LAST_4_HOURS:
			return i18n.t('eval_last_4_hours', 'Last 4 hours', {
				ns: 'create_alert',
			});
		default:
			return '';
	}
};

export const getCustomRollingWindowTimeframeText = (
	evaluationWindow: EvaluationWindowState,
): string =>
	i18n.t('eval_last_n_units', 'Last {{number}} {{unit}}', {
		number: evaluationWindow.startingAt.number,
		unit: ADVANCED_OPTIONS_TIME_UNIT_OPTIONS.find(
			(option) => option.value === evaluationWindow.startingAt.unit,
		)?.label,
		ns: 'create_alert',
	});

export const getTimeframeText = (
	evaluationWindow: EvaluationWindowState,
): string => {
	if (evaluationWindow.windowType === 'rolling') {
		if (evaluationWindow.timeframe === 'custom') {
			return getCustomRollingWindowTimeframeText(evaluationWindow);
		}
		return getRollingWindowTimeframeText(
			evaluationWindow.timeframe as RollingWindowTimeframes,
		);
	}
	return getCumulativeWindowTimeframeText(evaluationWindow);
};

export function buildAlertScheduleFromRRule(
	rruleString: string,
	date: Dayjs | null,
	startAt: string,
	maxOccurrences = 10,
): Date[] | null {
	try {
		if (!rruleString) {
			return null;
		}

		// Handle literal \n in string
		let finalRRuleString = rruleString.replace(/\\n/g, '\n');

		if (date) {
			const dt = dayjs(date);
			if (!dt.isValid()) {
				throw new Error('Invalid date provided');
			}

			const [hours = 0, minutes = 0, seconds = 0] = startAt.split(':').map(Number);

			const dtWithTime = dt
				.set('hour', hours)
				.set('minute', minutes)
				.set('second', seconds)
				.set('millisecond', 0);

			const dtStartStr = dtWithTime
				.toISOString()
				.replace(/[-:]/g, '')
				.replace(/\.\d{3}Z$/, 'Z');

			if (!/DTSTART/i.test(finalRRuleString)) {
				finalRRuleString = `DTSTART:${dtStartStr}\n${finalRRuleString}`;
			}
		}

		const rruleObj = rrulestr(finalRRuleString);
		const occurrences: Date[] = [];
		rruleObj.all((date, index) => {
			if (index >= maxOccurrences) {
				return false;
			}
			occurrences.push(date);
			return true;
		});

		return occurrences;
	} catch (error) {
		return null;
	}
}

function generateMonthlyOccurrences(
	targetDays: number[],
	hours: number,
	minutes: number,
	seconds: number,
	maxOccurrences: number,
): Date[] {
	const occurrences: Date[] = [];
	const currentMonth = dayjs().startOf('month');

	const currentDate = dayjs();

	const scanMonths = maxOccurrences + 12;
	for (let monthOffset = 0; monthOffset < scanMonths; monthOffset++) {
		const monthDate = currentMonth.add(monthOffset, 'month');
		targetDays.forEach((day) => {
			if (occurrences.length >= maxOccurrences) {
				return;
			}

			const daysInMonth = monthDate.daysInMonth();
			if (day <= daysInMonth) {
				const targetDate = monthDate
					.date(day)
					.hour(hours)
					.minute(minutes)
					.second(seconds);
				if (targetDate.isAfter(currentDate)) {
					occurrences.push(targetDate.toDate());
				}
			}
		});
	}

	return occurrences;
}

function generateWeeklyOccurrences(
	targetWeekdays: number[],
	hours: number,
	minutes: number,
	seconds: number,
	maxOccurrences: number,
): Date[] {
	const occurrences: Date[] = [];
	const currentWeek = dayjs().startOf('week');

	const currentDate = dayjs();

	for (let weekOffset = 0; weekOffset < maxOccurrences; weekOffset++) {
		const weekDate = currentWeek.add(weekOffset, 'week');
		targetWeekdays.forEach((weekday) => {
			if (occurrences.length >= maxOccurrences) {
				return;
			}

			const targetDate = weekDate
				.day(weekday)
				.hour(hours)
				.minute(minutes)
				.second(seconds);
			if (targetDate.isAfter(currentDate)) {
				occurrences.push(targetDate.toDate());
			}
		});
	}

	return occurrences;
}

export function generateDailyOccurrences(
	hours: number,
	minutes: number,
	seconds: number,
	maxOccurrences: number,
): Date[] {
	const occurrences: Date[] = [];
	const currentDate = dayjs();
	const currentTime =
		currentDate.hour() * 3600 + currentDate.minute() * 60 + currentDate.second();
	const targetTime = hours * 3600 + minutes * 60 + seconds;

	// Start from today if target time is after current time, otherwise start from tomorrow
	const startDayOffset = targetTime > currentTime ? 0 : 1;

	for (
		let dayOffset = startDayOffset;
		dayOffset < startDayOffset + maxOccurrences;
		dayOffset++
	) {
		const dayDate = currentDate.add(dayOffset, 'day');
		const targetDate = dayDate.hour(hours).minute(minutes).second(seconds);
		occurrences.push(targetDate.toDate());
	}

	return occurrences;
}

export function buildAlertScheduleFromCustomSchedule(
	repeatEvery: string,
	occurence: string[],
	startAt: string,
	maxOccurrences = 10,
): Date[] | null {
	try {
		const [hours = 0, minutes = 0, seconds = 0] = startAt.split(':').map(Number);
		let occurrences: Date[] = [];

		if (repeatEvery === 'month') {
			const targetDays = occurence
				.map((day) => parseInt(day, 10))
				.filter((day) => !Number.isNaN(day));
			occurrences = generateMonthlyOccurrences(
				targetDays,
				hours,
				minutes,
				seconds,
				maxOccurrences,
			);
		} else if (repeatEvery === 'week') {
			const targetWeekdays = occurence
				.map((day) => WEEKDAY_MAP[day.toLowerCase()])
				.filter((day) => day !== undefined);
			occurrences = generateWeeklyOccurrences(
				targetWeekdays,
				hours,
				minutes,
				seconds,
				maxOccurrences,
			);
		} else if (repeatEvery === 'day') {
			occurrences = generateDailyOccurrences(
				hours,
				minutes,
				seconds,
				maxOccurrences,
			);
		}

		occurrences.sort((a, b) => a.getTime() - b.getTime());
		return occurrences.slice(0, maxOccurrences);
	} catch (error) {
		Sentry.captureEvent({
			message: `Error building alert schedule from custom schedule: ${
				error instanceof Error ? error.message : 'Unknown error'
			}`,
			level: 'error',
		});
		return null;
	}
}

export function isValidRRule(rruleString: string): boolean {
	try {
		// normalize escaped \n
		const finalRRuleString = rruleString.replace(/\\n/g, '\n');
		rrulestr(finalRRuleString); // will throw if invalid
		return true;
	} catch {
		return false;
	}
}
