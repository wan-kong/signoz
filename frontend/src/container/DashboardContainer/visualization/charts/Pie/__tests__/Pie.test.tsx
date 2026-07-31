import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { TooltipProvider } from '@signozhq/ui/tooltip';
import { LegendPosition } from 'lib/uPlotV2/components/types';
import { LegendItem } from 'lib/uPlotV2/config/types';
import { I18nextProvider } from 'react-i18next';
import { dashboardI18nProviderProps } from 'tests/dashboardI18n';

import { PieSlice } from '../../types';
import Pie from '../Pie';
import { createTestI18nInstance } from '../../../../../../ReactI18/testUtils';

jest.mock('hooks/useDimensions', () => ({
	useResizeObserver: jest.fn().mockReturnValue({ width: 400, height: 300 }),
}));

jest.mock('components/Graph/yAxisConfig', () => ({
	getYAxisFormattedValue: jest.fn((value: string) => value),
}));

// VirtuosoGrid only renders a window in jsdom; render every item so we can
// assert on legend entries.
jest.mock('react-virtuoso', () => ({
	VirtuosoGrid: ({
		data,
		itemContent,
	}: {
		data: LegendItem[];
		itemContent: (index: number, item: LegendItem) => React.ReactNode;
	}): JSX.Element => (
		<div data-testid="virtuoso-grid">
			{data.map((item, index) => (
				<div key={item.seriesIndex ?? index}>{itemContent(index, item)}</div>
			))}
		</div>
	),
}));

const DATA: PieSlice[] = [
	{ label: 'frontend', value: 100, color: '#aa0000' },
	{ label: 'cart', value: 60, color: '#00aa00' },
	{ label: 'checkout', value: 40, color: '#0000aa' },
];

const i18n = createTestI18nInstance({
	language: 'en',
	resources: dashboardI18nProviderProps.i18nResources,
});

function renderPie(
	props: Partial<React.ComponentProps<typeof Pie>> = {},
): void {
	render(
		<I18nextProvider i18n={i18n}>
			<TooltipProvider>
				<Pie data={DATA} isDarkMode={false} data-testid="pie" {...props} />
			</TooltipProvider>
		</I18nextProvider>,
	);
}

describe('Pie', () => {
	it('renders the "No data" state for empty data', () => {
		render(
			<I18nextProvider i18n={i18n}>
				<TooltipProvider>
					<Pie data={[]} isDarkMode={false} data-testid="pie" />
				</TooltipProvider>
			</I18nextProvider>,
		);
		expect(screen.getByText('No data')).toBeInTheDocument();
	});

	it('renders one arc per slice plus the legend entries and centre total', () => {
		renderPie();

		const svg = screen.getByTestId('pie').querySelector('svg') as SVGElement;
		expect(svg.querySelectorAll('path')).toHaveLength(DATA.length);

		const legend = screen.getByTestId('virtuoso-grid');
		expect(within(legend).getByText('frontend')).toBeInTheDocument();
		expect(within(legend).getByText('cart')).toBeInTheDocument();
		expect(within(legend).getByText('checkout')).toBeInTheDocument();

		// Centre total = 100 + 60 + 40 (formatter mocked to echo the value).
		expect(screen.getByText('200')).toBeInTheDocument();
	});

	it('lays the legend out in a row for the right position and a column for bottom', () => {
		const { rerender } = render(
			<I18nextProvider i18n={i18n}>
				<TooltipProvider>
					<Pie
						data={DATA}
						isDarkMode={false}
						position={LegendPosition.RIGHT}
						data-testid="pie"
					/>
				</TooltipProvider>
			</I18nextProvider>,
		);
		expect(screen.getByTestId('pie')).toHaveStyle({ flexDirection: 'row' });

		rerender(
			<I18nextProvider i18n={i18n}>
				<TooltipProvider>
					<Pie
						data={DATA}
						isDarkMode={false}
						position={LegendPosition.BOTTOM}
						data-testid="pie"
					/>
				</TooltipProvider>
			</I18nextProvider>,
		);
		expect(screen.getByTestId('pie')).toHaveStyle({ flexDirection: 'column' });
	});

	it('hides a slice when its legend marker is clicked', () => {
		renderPie();
		const svg = screen.getByTestId('pie').querySelector('svg') as SVGElement;
		expect(svg.querySelectorAll('path')).toHaveLength(3);

		const marker = document.querySelector(
			'[data-legend-item-id="1"] [data-is-legend-marker="true"]',
		) as HTMLElement;
		fireEvent.click(marker);

		// One slice hidden → one fewer arc drawn.
		expect(svg.querySelectorAll('path')).toHaveLength(2);
	});
});
