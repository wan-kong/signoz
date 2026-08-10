import CreateAlertChannels from 'container/CreateAlertChannels';
import { ChannelType } from 'container/CreateAlertChannels/config';
import {
	opsGenieDescriptionDefaultValue,
	opsGenieMessageDefaultValue,
	opsGeniePriorityDefaultValue,
	pagerDutyAdditionalDetailsDefaultValue,
	pagerDutyDescriptionDefaultValue,
	pagerDutySeverityTextDefaultValue,
	slackDescriptionDefaultValue,
	slackTitleDefaultValue,
} from 'mocks-server/__mockdata__/alerts';
import { render, screen } from 'tests/test-utils';

import { testLabelInputAndHelpValue } from './testUtils';

jest.mock('components/MarkdownRenderer/MarkdownRenderer', () => ({
	MarkdownRenderer: jest.fn(() => <div>Mocked MarkdownRenderer</div>),
}));

describe('Create Alert Channel (Normal User)', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
	describe('Should check if the new alert channel is properly displayed with the cascading fields of slack channel', () => {
		beforeEach(() => {
			render(<CreateAlertChannels preType={ChannelType.Slack} />);
		});
		it('Should check if the title is "New Notification Channels"', () => {
			expect(screen.getByText('New Notification Channel')).toBeInTheDocument();
		});
		it('Should check if the name label and textbox are displayed properly', () => {
			testLabelInputAndHelpValue({
				labelText: 'Name',
				testId: 'channel-name-textbox',
			});
		});
		it('Should check if Send resolved alerts label and checkbox are displayed properly', () => {
			testLabelInputAndHelpValue({
				labelText: 'Send resolved alerts',
				testId: 'field-send-resolved-checkbox',
			});
		});
		it('Should check if channel type label and dropdown are displayed properly', () => {
			testLabelInputAndHelpValue({
				labelText: 'Type',
				testId: 'channel-type-select',
			});
		});
		// Default Channel type (Slack) fields
		it('Should check if the selected item in the type dropdown has text "Slack"', () => {
			expect(screen.getByText('Slack')).toBeInTheDocument();
		});
		it('Should check if Webhook URL label and input are displayed properly', () => {
			testLabelInputAndHelpValue({
				labelText: 'Webhook URL',
				testId: 'webhook-url-textbox',
			});
		});
		it('Should check if Recepient label, input, and help text are displayed properly', () => {
			testLabelInputAndHelpValue({
				labelText: 'Recipient',
				testId: 'slack-channel-textbox',
				helpText:
					'Specify channel or user, use #channel-name, @username (has to be all lowercase, no whitespace)',
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

			expect(descriptionTextArea).toHaveTextContent(slackDescriptionDefaultValue);
		});
		it('Should check if the form buttons are displayed properly (Save, Test, Back)', () => {
			expect(screen.getByText('Save')).toBeInTheDocument();
			expect(screen.getByText('Test')).toBeInTheDocument();
			expect(screen.getByText('Back')).toBeInTheDocument();
		});
	});
	describe('New Alert Channel Cascading Fields Based on Channel Type', () => {
		describe('Webhook', () => {
			beforeEach(() => {
				render(<CreateAlertChannels preType={ChannelType.Webhook} />);
			});

			it('Should check if the selected item in the type dropdown has text "Webhook"', () => {
				expect(screen.getByText('Webhook')).toBeInTheDocument();
			});
			it('Should check if Webhook URL label and input are displayed properly', () => {
				testLabelInputAndHelpValue({
					labelText: 'Webhook URL',
					testId: 'webhook-url-textbox',
				});
			});
			it('Should check if Webhook User Name label, input, and help text are displayed properly', () => {
				testLabelInputAndHelpValue({
					labelText: 'User Name (optional)',
					testId: 'webhook-username-textbox',
					helpText:
						'Leave empty for bearer auth or when authentication is not necessary.',
				});
			});
			it('Should check if Password label and textbox, and help text are displayed properly', () => {
				testLabelInputAndHelpValue({
					labelText: 'Password (optional)',
					testId: 'webhook-password-textbox',
					helpText: 'Specify a password or bearer token',
				});
			});
		});
		describe('PagerDuty', () => {
			beforeEach(() => {
				render(<CreateAlertChannels preType={ChannelType.Pagerduty} />);
			});

			it('Should check if the selected item in the type dropdown has text "Pagerduty"', () => {
				expect(screen.getByText('Pagerduty')).toBeInTheDocument();
			});
			it('Should check if Routing key label, required, and textbox are displayed properly', () => {
				testLabelInputAndHelpValue({
					labelText: 'Routing Key',
					testId: 'pager-routing-key-textbox',
				});
			});
			it('Should check if Description label, required, info (Shows up as description in pagerduty), and text area are displayed properly', () => {
				testLabelInputAndHelpValue({
					labelText: 'Description',
					testId: 'pager-description-textarea',
					helpText: 'Shows up as description in pagerduty',
				});
			});
			it('Should check if the description contains default template', () => {
				const descriptionTextArea = screen.getByTestId(
					'pager-description-textarea',
				);

				expect(descriptionTextArea).toHaveTextContent(
					pagerDutyDescriptionDefaultValue,
				);
			});
			it('Should check if Severity label, info (help_pager_severity), and textbox are displayed properly', () => {
				testLabelInputAndHelpValue({
					labelText: 'Severity',
					testId: 'pager-severity-textbox',
					helpText:
						"Severity of the incident, must be one of the following: 'critical', 'warning', 'error' or 'info'",
				});
			});
			it('Should check if Severity contains the default template', () => {
				const severityTextbox = screen.getByTestId('pager-severity-textbox');

				expect(severityTextbox).toHaveValue(pagerDutySeverityTextDefaultValue);
			});
			it('Should check if Additional Information label, text area, and help text (help_pager_details) are displayed properly', () => {
				testLabelInputAndHelpValue({
					labelText: 'Additional Information',
					testId: 'pager-additional-details-textarea',
					helpText: 'Specify a key-value format (must be a valid json)',
				});
			});
			it('Should check if Additional Information contains the default template', () => {
				const detailsTextArea = screen.getByTestId(
					'pager-additional-details-textarea',
				);

				expect(detailsTextArea).toHaveValue(pagerDutyAdditionalDetailsDefaultValue);
			});
			it('Should check if Group label, text area, and info (help_pager_group) are displayed properly', () => {
				testLabelInputAndHelpValue({
					labelText: 'Group',
					testId: 'pager-group-textarea',
					helpText: 'A cluster or grouping of sources',
				});
			});
			it('Should check if Class label, text area, and info (help_pager_class) are displayed properly', () => {
				testLabelInputAndHelpValue({
					labelText: 'Class',
					testId: 'pager-class-textarea',
					helpText: 'The class/type of the event',
				});
			});
			it('Should check if Client label, text area, and info (Shows up as event source in Pagerduty) are displayed properly', () => {
				testLabelInputAndHelpValue({
					labelText: 'Client',
					testId: 'pager-client-textarea',
					helpText: 'Shows up as event source in Pagerduty',
				});
			});
			it('Should check if Client input contains the default value "SigNoz Alert Manager"', () => {
				const clientTextArea = screen.getByTestId('pager-client-textarea');

				expect(clientTextArea).toHaveValue('SigNoz Alert Manager');
			});
			it('Should check if Client URL label, text area, and info (Shows up as event source link in Pagerduty) are displayed properly', () => {
				testLabelInputAndHelpValue({
					labelText: 'Client URL',
					testId: 'pager-client-url-textarea',
					helpText: 'Shows up as event source link in Pagerduty',
				});
			});
			it('Should check if Client URL contains the default value "https://enter-signoz-host-n-port-here/alerts"', () => {
				const clientUrlTextArea = screen.getByTestId('pager-client-url-textarea');

				expect(clientUrlTextArea).toHaveValue(
					'https://enter-signoz-host-n-port-here/alerts',
				);
			});
		});
		describe('Opsgenie', () => {
			beforeEach(() => {
				render(<CreateAlertChannels preType={ChannelType.Opsgenie} />);
			});

			it('Should check if the selected item in the type dropdown has text "Opsgenie"', () => {
				expect(screen.getByText('Opsgenie')).toBeInTheDocument();
			});

			it('Should check if API key label, required, and textbox are displayed properly', () => {
				testLabelInputAndHelpValue({
					labelText: 'API Key',
					testId: 'opsgenie-api-key-textbox',
					required: true,
				});
			});

			it('Should check if Message label, required, info (Shows up as message in opsgenie), and text area are displayed properly', () => {
				testLabelInputAndHelpValue({
					labelText: 'Message',
					testId: 'opsgenie-message-textarea',
					helpText: 'Shows up as message in opsgenie',
					required: true,
				});
			});

			it('Should check if Message contains the default template', () => {
				const messageTextArea = screen.getByTestId('opsgenie-message-textarea');

				expect(messageTextArea).toHaveValue(opsGenieMessageDefaultValue);
			});

			it('Should check if Description label, required, info (Shows up as description in opsgenie), and text area are displayed properly `{{ if gt (len .Alerts.Firing) 0 -}}', () => {
				testLabelInputAndHelpValue({
					labelText: 'Description',
					testId: 'opsgenie-description-textarea',
					helpText: 'Shows up as description in opsgenie',
					required: true,
				});
			});

			it('Should check if Description label, required, info (Shows up as description in opsgenie), and text area are displayed properly `{{ if gt (len .Alerts.Firing) 0 -}}', () => {
				const descriptionTextArea = screen.getByTestId(
					'opsgenie-description-textarea',
				);

				expect(descriptionTextArea).toHaveTextContent(
					opsGenieDescriptionDefaultValue,
				);
			});

			it('Should check if Priority label, required, info (help_opsgenie_priority), and text area are displayed properly', () => {
				testLabelInputAndHelpValue({
					labelText: 'Priority',
					testId: 'opsgenie-priority-textarea',
					helpText: 'Priority of the incident',
					required: true,
				});
			});

			it('Should check if Message contains the default template', () => {
				const priorityTextArea = screen.getByTestId('opsgenie-priority-textarea');

				expect(priorityTextArea).toHaveValue(opsGeniePriorityDefaultValue);
			});
		});
		describe('Email', () => {
			beforeEach(() => {
				render(<CreateAlertChannels preType={ChannelType.Email} />);
			});

			it('Should check if the selected item in the type dropdown has text "Email"', () => {
				expect(screen.getByText('Email')).toBeInTheDocument();
			});
			it('Should check if API key label, required, info(help_email_to), and textbox are displayed properly', () => {
				testLabelInputAndHelpValue({
					labelText: 'To',
					testId: 'email-to-textbox',
					helpText: 'Email address(es) to send alerts to (comma separated)',
					required: true,
				});
			});
		});
		describe('Microsoft Teams', () => {
			beforeEach(() => {
				render(<CreateAlertChannels preType={ChannelType.MsTeams} />);
			});

			it('Should check if the selected item in the type dropdown has text "Microsoft Teams"', () => {
				expect(screen.getByText('Microsoft Teams')).toBeInTheDocument();
			});

			it('Should check if the form buttons are displayed properly (Save, Test, Back)', () => {
				expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
				expect(screen.getByRole('button', { name: 'Test' })).toBeInTheDocument();
				expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
			});
			it.skip('Should check if save and test buttons are disabled', () => {
				expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
				expect(screen.getByRole('button', { name: 'Test' })).toBeDisabled();
			});
		});
	});
});
