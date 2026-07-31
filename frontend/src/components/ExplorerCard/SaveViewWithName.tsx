import { useTranslation } from 'react-i18next';
import { Input } from '@signozhq/ui/input';
import { Card, Form } from 'antd';
import { Typography } from '@signozhq/ui/typography';
import { PANEL_TYPES } from 'constants/queryBuilder';
import { useQueryBuilder } from 'hooks/queryBuilder/useQueryBuilder';
import { useSaveView } from 'hooks/saveViews/useSaveView';
import { useNotifications } from 'hooks/useNotifications';
import { mapCompositeQueryFromQuery } from 'lib/newQueryBuilder/queryBuilderMappers/mapCompositeQueryFromQuery';

import { SaveButton } from './styles';
import { SaveViewFormProps, SaveViewWithNameProps } from './types';
import { saveViewHandler } from './utils';

function SaveViewWithName({
	sourcePage,
	handlePopOverClose,
	refetchAllView,
}: SaveViewWithNameProps): JSX.Element {
	const { t } = useTranslation('common');
	const [form] = Form.useForm<SaveViewFormProps>();
	const { currentQuery, panelType, redirectWithQueryBuilderData } =
		useQueryBuilder();
	const { notifications } = useNotifications();
	const compositeQuery = mapCompositeQueryFromQuery(currentQuery, panelType);

	const { isLoading, mutateAsync: saveViewAsync } = useSaveView({
		viewName: form.getFieldValue('viewName'),
		compositeQuery,
		sourcePage,
		extraData: '',
	});

	const onSaveHandler = (): void => {
		saveViewHandler({
			compositeQuery,
			handlePopOverClose,
			extraData: '',
			notifications,
			panelType: panelType || PANEL_TYPES.LIST,
			redirectWithQueryBuilderData,
			refetchAllView,
			saveViewAsync,
			sourcePage,
			viewName: form.getFieldValue('viewName'),
			form,
		});
	};

	return (
		<Card>
			<Typography>{t('save_view.name_of_view')}</Typography>
			<Form form={form} onFinish={onSaveHandler} requiredMark>
				<Form.Item
					name={['viewName']}
					required
					rules={[
						{
							required: true,
							message: t('save_view.enter_name_required'),
						},
					]}
				>
					<Input placeholder={t('save_view.enter_name_placeholder')} />
				</Form.Item>
				<SaveButton
					htmlType="submit"
					type="primary"
					loading={isLoading}
					data-testid="save-view-name-action-button"
				>
					{t('save_view.save_button')}
				</SaveButton>
			</Form>
		</Card>
	);
}

export default SaveViewWithName;
