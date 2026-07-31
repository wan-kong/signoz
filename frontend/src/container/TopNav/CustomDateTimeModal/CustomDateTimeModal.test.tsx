import { fireEvent, render, screen } from '@testing-library/react';

import CustomDateTimeModal from './index';

describe('CustomDateTimeModal', () => {
	const handleCreate = jest.fn();
	const handleCancel = jest.fn();

	beforeEach(() => {
		render(
			<CustomDateTimeModal
				visible
				onCreate={handleCreate}
				onCancel={handleCancel}
				setCustomDTPickerVisible={jest.fn()}
			/>,
		);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders the modal with title and buttons', () => {
		expect(screen.getByText('time.choose_date_time_range')).toBeInTheDocument();
		expect(screen.getByText('time.apply')).toBeInTheDocument();
		expect(screen.getByText('time.cancel')).toBeInTheDocument();
	});

	it('donot calls onCreate when the Apply button is clicked without selecting dates', () => {
		fireEvent.click(screen.getByText('time.apply'));

		expect(handleCreate).toHaveBeenCalledTimes(0);
		expect(handleCreate).not.toHaveBeenCalledWith(undefined);
	});

	it('calls onCancel when Cancel button is clicked', () => {
		fireEvent.click(screen.getByText('time.cancel'));

		expect(handleCancel).toHaveBeenCalledTimes(1);
	});
});
