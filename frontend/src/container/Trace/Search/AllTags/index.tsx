import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-restricted-imports
import { connect, useSelector } from 'react-redux';
import { ChevronRight, Plus } from '@signozhq/icons';
import { Button, Space, Flex } from 'antd';
import { Typography } from '@signozhq/ui/typography';
// eslint-disable-next-line no-restricted-imports
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { UpdateTagIsError } from 'store/actions/trace/updateIsTagsError';
import { UpdateTagVisibility } from 'store/actions/trace/updateTagPanelVisiblity';
import { AppState } from 'store/reducers';
import AppActions from 'types/actions';
import { TraceReducer } from 'types/reducer/trace';

import { parseTagsToQuery } from '../util';
import {
	ButtonContainer,
	Container,
	CurrentTagsContainer,
	ErrorContainer,
} from './styles';
import Tags from './Tag';

const { Text } = Typography;

function AllTags({
	updateTagIsError,
	onChangeHandler,
	updateTagVisibility,
	updateFilters,
}: AllTagsProps): JSX.Element {
	const { t } = useTranslation('trace');
	const traces = useSelector<AppState, TraceReducer>((state) => state.traces);

	const [localSelectedTags, setLocalSelectedTags] = useState<
		TraceReducer['selectedTags']
	>(traces.selectedTags);

	const onTagAddHandler = (): void => {
		setLocalSelectedTags((tags) => [
			...tags,
			{
				Key: '',
				Operator: 'Equals',
				StringValues: [],
				NumberValues: [],
				BoolValues: [],
			},
		]);
	};

	const onCloseHandler = (index: number): void => {
		setLocalSelectedTags([
			...localSelectedTags.slice(0, index),
			...localSelectedTags.slice(index + 1, localSelectedTags.length),
		]);
	};

	const onRunQueryHandler = (): void => {
		const parsedQuery = parseTagsToQuery(localSelectedTags);

		if (parsedQuery.isError) {
			updateTagIsError(true);
		} else {
			onChangeHandler(parsedQuery.payload);
			updateFilters(localSelectedTags);
			updateTagIsError(false);
			updateTagVisibility(false);
		}
	};

	const onResetHandler = (): void => {
		setLocalSelectedTags([]);
	};

	if (traces.isTagModalError) {
		return (
			<ErrorContainer>
				<Text style={{ color: 'var(--warning-background)' }}>
					{t(
						'all_tags.unrecognized_query_format',
						'Unrecognized query format. Please reset your query by clicking `X` in the search bar above.',
					)}
				</Text>

				<Text style={{ color: 'var(--warning-background)' }}>
					{t(
						'all_tags.click_search_bar',
						'Please click on the search bar to get a drop down to select relevant tags',
					)}
				</Text>
			</ErrorContainer>
		);
	}

	return (
		<Container>
			<Typography>{t('all_tags.tags', 'Tags')}</Typography>

			<CurrentTagsContainer>
				{localSelectedTags.map((tags, index) => (
					<Tags
						key={tags.Key}
						tag={tags}
						index={index}
						onCloseHandler={(): void => onCloseHandler(index)}
						setLocalSelectedTags={setLocalSelectedTags}
						localSelectedTags={localSelectedTags}
					/>
				))}
			</CurrentTagsContainer>

			<Space wrap direction="horizontal">
				<Button type="primary" onClick={onTagAddHandler}>
					<Flex gap={4} align="center">
						<Plus size="md" />
						{t('all_tags.add_tags_filter', 'Add Tags Filter')}
					</Flex>
				</Button>

				<Text truncate={1}>
					{t(
						'all_tags.results_description',
						'Results will include spans with ALL the specified tags ( Rows are `ANDed` )',
					)}
				</Text>
			</Space>

			<ButtonContainer>
				<Space align="start">
					<Button onClick={onResetHandler}>
						{t('filter_panel.reset', 'Reset')}
					</Button>
					<Button type="primary" onClick={onRunQueryHandler}>
						<Flex gap={4} align="center">
							<ChevronRight size="md" />
							{t('all_tags.run_query', 'Run Query')}
						</Flex>
					</Button>
				</Space>
			</ButtonContainer>
		</Container>
	);
}

interface DispatchProps {
	updateTagIsError: (value: boolean) => void;
	updateTagVisibility: (value: boolean) => void;
}

const mapDispatchToProps = (
	dispatch: ThunkDispatch<unknown, unknown, AppActions>,
): DispatchProps => ({
	updateTagIsError: bindActionCreators(UpdateTagIsError, dispatch),
	updateTagVisibility: bindActionCreators(UpdateTagVisibility, dispatch),
});

interface AllTagsProps extends DispatchProps {
	updateFilters: (tags: TraceReducer['selectedTags']) => void;
	onChangeHandler: (search: string) => void;
}

export default connect(null, mapDispatchToProps)(AllTags);
