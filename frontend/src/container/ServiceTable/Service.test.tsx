import { servicesI18nProviderProps } from 'tests/servicesI18n';
import { render, screen, waitFor } from 'tests/test-utils';

import { Services } from './__mock__/servicesListMock';
import Metrics from './index';

describe('Metrics Component', () => {
	it('renders without errors', async () => {
		render(
			<Metrics services={Services} isLoading={false} />,
			undefined,
			servicesI18nProviderProps,
		);

		await waitFor(() => {
			expect(screen.getByText(/application/i)).toBeInTheDocument();
			expect(screen.getByText(/p99 latency \(in ms\)/i)).toBeInTheDocument();
			expect(screen.getByText(/error rate \(% of total\)/i)).toBeInTheDocument();
			expect(screen.getByText(/operations per second/i)).toBeInTheDocument();
		});
	});

	it('renders if the data is loaded in the table', async () => {
		render(
			<Metrics services={Services} isLoading={false} />,
			undefined,
			servicesI18nProviderProps,
		);

		expect(screen.getByText('frontend')).toBeInTheDocument();
	});

	it('renders no data when required conditions are met', async () => {
		render(
			<Metrics services={[]} isLoading={false} />,
			undefined,
			servicesI18nProviderProps,
		);

		expect(screen.getByText('No data')).toBeInTheDocument();
	});
});
