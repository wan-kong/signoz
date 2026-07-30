import { render, screen } from 'tests/test-utils';

import AnnouncementsModal from '../AnnouncementsModal';

const i18nProviderProps = {
	i18nLanguage: 'en',
	i18nResources: {
		en: {
			common: {
				announcements: 'Announcements',
			},
		},
	},
};

const renderAnnouncementsModal = (): ReturnType<typeof render> =>
	render(<AnnouncementsModal />, undefined, i18nProviderProps);

describe('AnnouncementsModal', () => {
	it('should render announcements modal with title', () => {
		renderAnnouncementsModal();

		expect(screen.getByText('Announcements')).toBeInTheDocument();
	});

	it('should have proper structure and classes', () => {
		renderAnnouncementsModal();

		const container = screen
			.getByText('Announcements')
			.closest('.announcements-modal-container');
		expect(container).toBeInTheDocument();

		const headerContainer = screen
			.getByText('Announcements')
			.closest('.announcements-modal-container-header');
		expect(headerContainer).toBeInTheDocument();
	});

	it('should render without any errors', () => {
		expect(() => renderAnnouncementsModal()).not.toThrow();
	});
});
