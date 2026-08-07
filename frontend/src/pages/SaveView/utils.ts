import { UseMutateAsyncFunction } from 'react-query';
import type { NotificationInstance } from 'antd/es/notification/interface';
import logEvent from 'api/common/logEvent';
import i18n from 'ReactI18';
import { MenuItemLabelGeneratorProps } from 'components/ExplorerCard/types';
import { showErrorNotification } from 'components/ExplorerCard/utils';
import {
	MetricsExplorerEventKeys,
	MetricsExplorerEvents,
} from 'container/MetricsExplorer/events';
import { DeleteViewPayloadProps } from 'types/api/saveViews/types';

type DeleteViewProps = {
	deleteViewAsync: UseMutateAsyncFunction<DeleteViewPayloadProps, Error, string>;
	refetchAllView: MenuItemLabelGeneratorProps['refetchAllView'];
	notifications: NotificationInstance;
	viewId: string;
	hideDeleteViewModal: () => void;
	clearSearch: () => void;
};

export const deleteViewHandler = ({
	deleteViewAsync,
	refetchAllView,
	notifications,
	viewId,
	hideDeleteViewModal,
	clearSearch,
}: DeleteViewProps): void => {
	deleteViewAsync(viewId, {
		onSuccess: () => {
			hideDeleteViewModal();
			clearSearch();
			notifications.success({
				message: String(
					i18n.t('save_view_extra.view_deleted', 'View Deleted Successfully', {
						ns: 'common',
					}),
				),
			});
			refetchAllView();
			logEvent(MetricsExplorerEvents.ViewDeleted, {
				[MetricsExplorerEventKeys.Tab]: 'views',
			});
		},
		onError: (err) => {
			showErrorNotification(notifications, err);
		},
	});
};
