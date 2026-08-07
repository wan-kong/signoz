import EditAlertChannels from 'container/EditAlertChannels';
import {
	editAlertChannelInitialValue,
	editSlackDescriptionDefaultValue,
	slackTitleDefaultValue,
} from 'mocks-server/__mockdata__/alerts';
import { render, screen } from 'tests/test-utils';

import { testLabelInputAndHelpValue } from './testUtils';

const successNotification = jest.fn();
const errorNotification = jest.fn();
jest.mock('hooks/useNotifications', () => ({
	__esModule: true,
	useNotifications: jest.fn(() => ({
		notifications: {
			success: successNotification,
			error: errorNotification,
		},
	})),
}));

jest.mock('components/MarkdownRenderer/MarkdownRenderer', () => ({
	MarkdownRenderer: jest.fn(() => <div>Mocked MarkdownRenderer</div>),
}));

describe('Should check if the edit alert channel is properly displayed', () => {
	beforeEach(() => {
		render(
			<EditAlertChannels
				channelId="3"
				initialValue={editAlertChannelInitialValue}
			/>,
		);
	});
	afterEach(() => {
		jest.clearAllMocks();
	});
	it('Should check if the title is "Edit Notification Channels"', () => {
		expect(screen.getByText('Edit Notification Channels')).toBeInTheDocument();
	});

	it('Should check if the name label and textbox are displayed properly', () => {
		testLabelInputAndHelpValue({
			labelText: 'Name',
			testId: 'channel-name-textbox',
			value: 'Dummy-Channel',
		});
	});
	it('Should check if Send resolved alerts label and checkbox are displayed properly and the checkbox is checked', () => {
		testLabelInputAndHelpValue({
			labelText: 'Send resolved alerts',
			testId: 'field-send-resolved-checkbox',
		});
		expect(screen.getByTestId('field-send-resolved-checkbox')).toBeChecked();
	});

	it('Should check if channel type label and dropdown are displayed properly', () => {
		testLabelInputAndHelpValue({
			labelText: 'Type',
			testId: 'channel-type-select',
		});
	});

	it('Should check if the selected item in the type dropdown has text "Slack"', () => {
		expect(screen.getByText('Slack')).toBeInTheDocument();
	});

	it('Should check if Webhook URL label and input are displayed properly', () => {
		testLabelInputAndHelpValue({
			labelText: 'Webhook URL',
			testId: 'webhook-url-textbox',
			value:
				'https://discord.com/api/webhooks/dummy_webhook_id/dummy_webhook_token/slack',
		});
	});

	it('Should check if Recepient label, input, and help text are displayed properly', () => {
		testLabelInputAndHelpValue({
			labelText: 'Recipient',
			testId: 'slack-channel-textbox',
			helpText:
				'Specify channel or user, use #channel-name, @username (has to be all lowercase, no whitespace)',
			value: '#dummy_channel',
		});
	});

	it('Should check if Title label and text area are displayed properly', () => {
		testLabelInputAndHelpValue({
			labelText: 'Title',
			testId: 'title-textarea',
		});
	});

	it('Should check if Title contains template', () => {
		const titleTextArea = screen.getByTestId('title-textarea');

		expect(titleTextArea).toHaveTextContent(slackTitleDefaultValue);
	});

	it('Should check if Description label and text area are displayed properly', () => {
		testLabelInputAndHelpValue({
			labelText: 'Description',
			testId: 'description-textarea',
		});
	});

	it('Should check if Description contains template', () => {
		const descriptionTextArea = screen.getByTestId('description-textarea');

		expect(descriptionTextArea).toHaveTextContent(
			editSlackDescriptionDefaultValue,
		);
	});

	it('Should check if the form buttons are displayed properly (Save, Test, Back)', () => {
		expect(screen.getByText('Save')).toBeInTheDocument();
		expect(screen.getByText('Test')).toBeInTheDocument();
		expect(screen.getByText('Back')).toBeInTheDocument();
	});
});
