import { SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal } from 'antd';
import { Typography } from '@signozhq/ui/typography';
import { Trash2, X } from '@signozhq/icons';

import './PlannedDowntime.styles.scss';

interface PlannedDowntimeDeleteModalProps {
	isDeleteModalOpen: boolean;
	setIsDeleteModalOpen: (value: SetStateAction<boolean>) => void;
	onDeleteHandler: () => void;
	isDeleteLoading: boolean;
	downtimeSchedule: string;
}

export function PlannedDowntimeDeleteModal(
	props: PlannedDowntimeDeleteModalProps,
): JSX.Element {
	const { t } = useTranslation('alerts');
	const {
		isDeleteModalOpen,
		setIsDeleteModalOpen,
		isDeleteLoading,
		onDeleteHandler,
		downtimeSchedule,
	} = props;
	const hideDeleteScheduleModal = (): void => {
		setIsDeleteModalOpen(false);
	};
	return (
		<Modal
			className="delete-schedule-modal"
			title={
				<span className="title">{t('planned_downtime.delete_modal.title')}</span>
			}
			open={isDeleteModalOpen}
			closable={false}
			onCancel={hideDeleteScheduleModal}
			footer={[
				<Button
					key="cancel"
					onClick={hideDeleteScheduleModal}
					className="cancel-btn"
					icon={<X size={16} />}
				>
					{t('cancel')}
				</Button>,
				<Button
					key="submit"
					icon={<Trash2 size={16} />}
					onClick={onDeleteHandler}
					className="delete-btn"
					disabled={isDeleteLoading}
				>
					{t('planned_downtime.delete_modal.delete_schedule')}
				</Button>,
			]}
		>
			<Typography.Text className="delete-text">
				{t('planned_downtime.delete_modal.description', {
					name: downtimeSchedule,
				})}
			</Typography.Text>
		</Modal>
	);
}
