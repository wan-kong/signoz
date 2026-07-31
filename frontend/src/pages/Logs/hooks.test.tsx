import { renderHook } from '@testing-library/react';

import { useSelectedLogView } from './hooks';

jest.mock('api/browser/localstorage/get', () => jest.fn(() => null));

jest.mock('react-redux', () => ({
	useDispatch: (): jest.Mock => jest.fn(),
	useSelector: (
		selector: (state: {
			logs: { viewMode: string; linesPerRow: number };
		}) => unknown,
	): unknown =>
		selector({
			logs: {
				viewMode: 'raw',
				linesPerRow: 2,
			},
		}),
}));

describe('useSelectedLogView', () => {
	it('keeps the React hook order stable across rerenders', () => {
		const { result, rerender } = renderHook(() => useSelectedLogView());

		expect(
			result.current.viewModeOptionList.map(({ label }) => label),
		).toStrictEqual(['view_modes.raw', 'view_modes.table', 'view_modes.list']);
		expect(() => rerender()).not.toThrow();
	});
});
