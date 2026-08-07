import userEvent from '@testing-library/user-event';
import { logEventMock } from '__tests__/logEventMock';
import { render, screen } from 'tests/test-utils';

import CreatePipelineButton from '../Layouts/Pipeline/CreatePipelineButton';
import { pipelineApiResponseMockData } from '../mocks/pipeline';

describe('PipelinePage container test', () => {
	it('should render CreatePipelineButton section', async () => {
		const { asFragment } = render(
			<CreatePipelineButton
				setActionType={jest.fn()}
				isActionMode="viewing-mode"
				setActionMode={jest.fn()}
				pipelineData={pipelineApiResponseMockData}
			/>,
		);
		expect(asFragment()).toMatchSnapshot();
	});

	it('CreatePipelineButton - edit mode & tracking', async () => {
		render(
			<CreatePipelineButton
				setActionType={jest.fn()}
				isActionMode="viewing-mode"
				setActionMode={jest.fn()}
				pipelineData={pipelineApiResponseMockData}
			/>,
		);

		// enter edit mode click and track event data
		const editButton = screen.getByText('Enter Edit Mode');
		expect(editButton).toBeInTheDocument();
		await userEvent.click(editButton);

		expect(logEventMock).toHaveBeenCalledWith(
			'Logs: Pipelines: Entered Edit Mode',
			{
				source: 'signoz-ui',
			},
		);
	});

	it('CreatePipelineButton - add new mode & tracking', async () => {
		render(
			<CreatePipelineButton
				setActionType={jest.fn()}
				isActionMode="viewing-mode"
				setActionMode={jest.fn()}
				pipelineData={{ ...pipelineApiResponseMockData, pipelines: [] }}
			/>,
		);
		// new pipeline click and track event data
		const editButton = screen.getByText('New Pipeline');
		expect(editButton).toBeInTheDocument();
		await userEvent.click(editButton);

		expect(logEventMock).toHaveBeenCalledWith(
			'Logs: Pipelines: Clicked Add New Pipeline',
			{
				source: 'signoz-ui',
			},
		);
	});
});
