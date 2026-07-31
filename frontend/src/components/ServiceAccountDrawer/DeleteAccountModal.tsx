import { useQueryClient } from 'react-query';
import { Trash2, X } from '@signozhq/icons';
import { Button } from '@signozhq/ui/button';
import { useTranslation } from 'react-i18next';
import AuthZButton from 'lib/authz/components/AuthZButton/AuthZButton';
import { buildSADeletePermission } from 'lib/authz/hooks/useAuthZ/permissions/service-account.permissions';
import { DialogWrapper } from '@signozhq/ui/dialog';
import { toast } from '@signozhq/ui/sonner';
import { convertToApiError } from 'api/ErrorResponseHandlerForGeneratedAPIs';
import {
	getGetServiceAccountQueryKey,
	invalidateListServiceAccounts,
	useDeleteServiceAccount,
} from 'api/generated/services/serviceaccount';
import type {
	RenderErrorResponseDTO,
	ServiceaccounttypesServiceAccountDTO,
} from 'api/generated/services/sigNoz.schemas';
import { AxiosError } from 'axios';
import { SA_QUERY_PARAMS } from 'container/ServiceAccountsSettings/constants';
import { parseAsBoolean, useQueryState } from 'nuqs';
import { useErrorModal } from 'providers/ErrorModalProvider';
import APIError from 'types/api/error';

function DeleteAccountModal(): JSX.Element {
	const { t } = useTranslation('common');
	const queryClient = useQueryClient();
	const { showErrorModal, isErrorModalVisible } = useErrorModal();
	const [accountId, setAccountId] = useQueryState(SA_QUERY_PARAMS.ACCOUNT);
	const [isDeleteOpen, setIsDeleteOpen] = useQueryState(
		SA_QUERY_PARAMS.DELETE_SA,
		parseAsBoolean.withDefault(false),
	);
	const open = !!isDeleteOpen && !!accountId;

	const cachedAccount = accountId
		? queryClient.getQueryData<{
				data: ServiceaccounttypesServiceAccountDTO;
			}>(getGetServiceAccountQueryKey({ id: accountId }))
		: null;
	const accountName = cachedAccount?.data?.name;

	const { mutate: deleteAccount, isLoading: isDeleting } =
		useDeleteServiceAccount({
			mutation: {
				onSuccess: async () => {
					toast.success(t('sa_delete.deleted_success'));
					await setIsDeleteOpen(null);
					await setAccountId(null);
					await invalidateListServiceAccounts(queryClient);
				},
				onError: (error) => {
					showErrorModal(
						convertToApiError(
							error as AxiosError<RenderErrorResponseDTO, unknown> | null,
						) as APIError,
					);
				},
			},
		});

	function handleConfirm(): void {
		if (!accountId) {
			return;
		}
		deleteAccount({
			pathParams: { id: accountId },
		});
	}

	function handleCancel(): void {
		void setIsDeleteOpen(null);
	}

	const content = (
		<p className="sa-delete-dialog__body">
			{t('sa_delete.confirm_message', { name: accountName })}
		</p>
	);

	const footer = (
		<div className="sa-delete-dialog__footer">
			<Button variant="solid" color="secondary" onClick={handleCancel}>
				<X size={12} />
				{t('sa_delete.cancel')}
			</Button>
			<AuthZButton
				checks={[buildSADeletePermission(accountId ?? '')]}
				authZEnabled={!!accountId}
				variant="solid"
				color="destructive"
				loading={isDeleting}
				onClick={handleConfirm}
				data-testid="confirm-delete-btn"
			>
				<Trash2 size={12} />
				{t('sa_delete.delete')}
			</AuthZButton>
		</div>
	);

	return (
		<DialogWrapper
			open={open}
			onOpenChange={(isOpen): void => {
				if (!isOpen) {
					handleCancel();
				}
			}}
			title={t('sa_delete.title', { name: accountName ?? '' })}
			width="narrow"
			className="alert-dialog sa-delete-dialog"
			showCloseButton={false}
			disableOutsideClick={isErrorModalVisible}
			testId="delete-service-account-modal"
			footer={footer}
		>
			{content}
		</DialogWrapper>
	);
}

export default DeleteAccountModal;
