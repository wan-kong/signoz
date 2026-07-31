import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import { VirtuosoMockContext } from 'react-virtuoso';
import { render, RenderResult, screen } from '@testing-library/react';
import TriggeredAlerts from 'container/TriggeredAlerts';
import { NuqsTestingAdapter } from 'nuqs/adapters/testing';
import { AppContext } from 'providers/App/App';
import TimezoneProvider from 'providers/Timezone';
import { I18nextProvider } from 'react-i18next';
import { alertsI18nProviderProps } from 'tests/alertsI18n';
import { onNuqsUrlUpdate, resetNuqsState } from 'tests/nuqs-helpers';
import { getAppContextMock } from 'tests/test-utils';

import { createTestI18nInstance } from '../../../ReactI18/testUtils';

interface RenderOptions {
	initialRoute?: string;
}

export function renderTriggeredAlerts(
	options: RenderOptions = {},
): RenderResult {
	const { initialRoute = '/' } = options;

	const initialSearch = initialRoute.includes('?')
		? initialRoute.slice(initialRoute.indexOf('?'))
		: '';
	resetNuqsState(initialSearch);

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { refetchOnWindowFocus: false, retry: false },
			mutations: { retry: false },
		},
	});
	const i18n = createTestI18nInstance({
		language: alertsI18nProviderProps.i18nLanguage,
		resources: alertsI18nProviderProps.i18nResources,
	});

	return render(
		<I18nextProvider i18n={i18n}>
			<MemoryRouter initialEntries={[initialRoute]}>
				<NuqsTestingAdapter
					searchParams={initialSearch}
					onUrlUpdate={onNuqsUrlUpdate}
					rateLimitFactor={0}
					hasMemory
				>
					<QueryClientProvider client={queryClient}>
						<AppContext.Provider value={getAppContextMock('ADMIN')}>
							<TimezoneProvider>
								<VirtuosoMockContext.Provider
									value={{ viewportHeight: 800, itemHeight: 46 }}
								>
									<TriggeredAlerts />
								</VirtuosoMockContext.Provider>
							</TimezoneProvider>
						</AppContext.Provider>
					</QueryClientProvider>
				</NuqsTestingAdapter>
			</MemoryRouter>
		</I18nextProvider>,
	);
}

export async function findAlertRow(alertName: string): Promise<HTMLElement> {
	const cell = await screen.findByText(alertName, {}, { timeout: 5000 });
	const row = cell.closest('tr');
	if (!row) {
		throw new Error(`Row not found for alert "${alertName}"`);
	}
	return row as HTMLElement;
}

export function getTriggeredAlertRowTestId(
	fingerprint: string,
	column: 'name' | 'severity' | 'status',
): string {
	return `alert-row-${fingerprint}-${column}`;
}
