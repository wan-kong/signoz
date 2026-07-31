import {
	getTracesExplorerRoute,
	getTracesFunnelRoute,
	getTracesSaveViewRoute,
} from './constants';

describe('trace module routes', () => {
	it('keeps route component identities stable across parent rerenders', () => {
		expect(getTracesExplorerRoute().Component).toBe(
			getTracesExplorerRoute().Component,
		);
		expect(getTracesFunnelRoute().Component).toBe(
			getTracesFunnelRoute().Component,
		);
		expect(getTracesSaveViewRoute().Component).toBe(
			getTracesSaveViewRoute().Component,
		);
	});
});
