import { Button, Modal } from 'antd';
import { Trans, useTranslation } from 'react-i18next';
import { Typography } from '@signozhq/ui/typography';
import { Loader, Trash2, X } from '@signozhq/icons';

import { DeleteRoutingPolicyProps } from './types';

function DeleteRoutingPolicy({
	handleClose,
	handleDelete,
	routingPolicy,
	isDeletingRoutingPolicy,
}: DeleteRoutingPolicyProps): JSX.Element {
	const { t } = useTranslation('alerts');
	const deleteButtonIcon = isDeletingRoutingPolicy ? (
		<Loader size={16} />
	) : (
		<Trash2 size={16} />
	);

	return (
		<Modal
			className="delete-policy-modal"
			title={
				<span className="title">{t('routing_policies.delete_modal.title')}</span>
			}
			open
			closable={false}
			onCancel={handleClose}
			footer={[
				<Button
					key="cancel"
					onClick={handleClose}
					className="cancel-btn"
					icon={<X size={16} />}
					disabled={isDeletingRoutingPolicy}
				>
					{t('cancel')}
				</Button>,
				<Button
					key="submit"
					type="primary"
					icon={deleteButtonIcon}
					onClick={handleDelete}
					className="delete-btn"
					disabled={isDeletingRoutingPolicy}
				>
					{t('routing_policies.delete_modal.delete_policy')}
				</Button>,
			]}
		>
			<Typography.Text className="delete-text">
				<Trans
					t={t}
					i18nKey="routing_policies.delete_modal.description"
					values={{ name: routingPolicy?.name }}
					components={{ strong: <strong /> }}
				/>
			</Typography.Text>
		</Modal>
	);
}

export default DeleteRoutingPolicy;
