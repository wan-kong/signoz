import { getLogsModuleRoutes } from './constants';

describe('getLogsModuleRoutes', () => {
	it('keeps route component identities stable across parent rerenders', () => {
		const firstRoutes = getLogsModuleRoutes();
		const nextRoutes = getLogsModuleRoutes();

		expect(nextRoutes.map(({ Component }) => Component)).toStrictEqual(
			firstRoutes.map(({ Component }) => Component),
		);
	});
});
