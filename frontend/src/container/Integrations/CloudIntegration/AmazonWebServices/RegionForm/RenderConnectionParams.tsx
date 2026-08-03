import { Input } from '@signozhq/ui/input';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { CloudintegrationtypesCredentialsDTO } from 'api/generated/services/sigNoz.schemas';

function RenderConnectionFields({
	isConnectionParamsLoading,
	connectionParams,
	isFormDisabled,
}: {
	isConnectionParamsLoading?: boolean;
	connectionParams?: CloudintegrationtypesCredentialsDTO | null;
	isFormDisabled?: boolean;
}): JSX.Element | null {
	const { t } = useTranslation('common');

	if (
		isConnectionParamsLoading ||
		(!!connectionParams?.ingestionUrl &&
			!!connectionParams?.ingestionKey &&
			!!connectionParams?.sigNozApiUrl &&
			!!connectionParams?.sigNozApiKey)
	) {
		return null;
	}

	return (
		<Form.Item name="connectionParams">
			{!connectionParams?.ingestionUrl && (
				<Form.Item
					name="ingestionUrl"
					label={t('cloud_integration.ingestion_url')}
					rules={[
						{ required: true, message: t('cloud_integration.enter_ingestion_url') },
					]}
				>
					<Input
						placeholder={t('cloud_integration.enter_ingestion_url')}
						disabled={isFormDisabled}
					/>
				</Form.Item>
			)}
			{!connectionParams?.ingestionKey && (
				<Form.Item
					name="ingestionKey"
					label={t('cloud_integration.ingestion_key')}
					rules={[
						{ required: true, message: t('cloud_integration.enter_ingestion_key') },
					]}
				>
					<Input
						placeholder={t('cloud_integration.enter_ingestion_key')}
						disabled={isFormDisabled}
					/>
				</Form.Item>
			)}
			{!connectionParams?.sigNozApiUrl && (
				<Form.Item
					name="sigNozApiUrl"
					label={t('cloud_integration.signoz_api_url')}
					rules={[
						{ required: true, message: t('cloud_integration.enter_signoz_api_url') },
					]}
				>
					<Input
						placeholder={t('cloud_integration.enter_signoz_api_url')}
						disabled={isFormDisabled}
					/>
				</Form.Item>
			)}
			{!connectionParams?.sigNozApiKey && (
				<Form.Item
					name="sigNozApiKey"
					label={t('cloud_integration.signoz_api_key')}
					rules={[
						{ required: true, message: t('cloud_integration.enter_signoz_api_key') },
					]}
				>
					<Input
						placeholder={t('cloud_integration.enter_signoz_api_key')}
						disabled={isFormDisabled}
					/>
				</Form.Item>
			)}
		</Form.Item>
	);
}

RenderConnectionFields.defaultProps = {
	connectionParams: null,
	isFormDisabled: false,
	isConnectionParamsLoading: false,
};

export default RenderConnectionFields;
