import { fireEvent, screen } from '@testing-library/react';

import DeleteRoutingPolicy from '../DeleteRoutingPolicy';
import { MOCK_ROUTING_POLICY_1, renderWithAlertsI18n } from './testUtils';

const mockRoutingPolicy = MOCK_ROUTING_POLICY_1;
const mockHandleDelete = jest.fn();
const mockHandleClose = jest.fn();

const DELETE_BUTTON_TEXT = 'Delete Routing Policy';
const CANCEL_BUTTON_TEXT = 'Cancel';

describe('DeleteRoutingPolicy', () => {
	it('renders base layout with routing policy', () => {
		renderWithAlertsI18n(
			<DeleteRoutingPolicy
				routingPolicy={mockRoutingPolicy}
				isDeletingRoutingPolicy={false}
				handleDelete={mockHandleDelete}
				handleClose={mockHandleClose}
			/>,
		);
		expect(
			screen.getByRole('dialog', { name: DELETE_BUTTON_TEXT }),
		).toBeInTheDocument();
		expect(
			screen.getByText(/Are you sure you want to delete/i),
		).toBeInTheDocument();
		expect(screen.getByText(mockRoutingPolicy.name)).toBeInTheDocument();
		expect(
			screen.getByText(
				/Deleting a routing policy is irreversible and cannot be undone\./i,
			),
		).toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: CANCEL_BUTTON_TEXT }),
		).toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: DELETE_BUTTON_TEXT }),
		).toBeInTheDocument();
	});

	it('should call handleDelete when delete button is clicked', () => {
		renderWithAlertsI18n(
			<DeleteRoutingPolicy
				routingPolicy={mockRoutingPolicy}
				isDeletingRoutingPolicy={false}
				handleDelete={mockHandleDelete}
				handleClose={mockHandleClose}
			/>,
		);
		fireEvent.click(screen.getByRole('button', { name: DELETE_BUTTON_TEXT }));
		expect(mockHandleDelete).toHaveBeenCalled();
	});

	it('should call handleClose when cancel button is clicked', () => {
		renderWithAlertsI18n(
			<DeleteRoutingPolicy
				routingPolicy={mockRoutingPolicy}
				isDeletingRoutingPolicy={false}
				handleDelete={mockHandleDelete}
				handleClose={mockHandleClose}
			/>,
		);
		fireEvent.click(screen.getByRole('button', { name: CANCEL_BUTTON_TEXT }));
		expect(mockHandleClose).toHaveBeenCalled();
	});

	it('should be disabled when deleting routing policy', () => {
		renderWithAlertsI18n(
			<DeleteRoutingPolicy
				routingPolicy={mockRoutingPolicy}
				isDeletingRoutingPolicy
				handleDelete={mockHandleDelete}
				handleClose={mockHandleClose}
			/>,
		);
		expect(
			screen.getByRole('button', { name: DELETE_BUTTON_TEXT }),
		).toBeDisabled();
		expect(
			screen.getByRole('button', { name: CANCEL_BUTTON_TEXT }),
		).toBeDisabled();
	});
});
