import { render, screen } from 'tests/test-utils';

import NotFound from './index';

const i18nProviderProps = {
	i18nLanguage: 'en',
	i18nResources: {
		en: {
			common: {
				not_found_default_text: 'Ah, seems like we reached a dead end!',
				page_not_found: 'Page Not Found',
				return_home: 'Return Home',
			},
		},
	},
};

describe('Not Found page test', () => {
	it('should render Not Found page without errors', () => {
		render(<NotFound />, undefined, i18nProviderProps);

		expect(
			screen.getByText('Ah, seems like we reached a dead end!'),
		).toBeInTheDocument();
		expect(screen.getByText('Page Not Found')).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Return Home' })).toHaveAttribute(
			'href',
			'/home',
		);
	});
});
