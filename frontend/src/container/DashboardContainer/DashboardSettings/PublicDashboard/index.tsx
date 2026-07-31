import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useCopyToClipboard } from 'react-use';
import { Checkbox } from '@signozhq/ui/checkbox';
import { toast } from '@signozhq/ui/sonner';
import { Button, Select } from 'antd';
import { Typography } from '@signozhq/ui/typography';
import createPublicDashboardAPI from 'api/dashboard/public/createPublicDashboard';
import revokePublicDashboardAccessAPI from 'api/dashboard/public/revokePublicDashboardAccess';
import updatePublicDashboardAPI from 'api/dashboard/public/updatePublicDashboard';
import { DEFAULT_TIME_RANGE } from 'container/TopNav/DateTimeSelectionV2/constants';
import { useGetPublicDashboardMeta } from 'hooks/dashboard/useGetPublicDashboardMeta';
import { useGetTenantLicense } from 'hooks/useGetTenantLicense';
import {
	Copy,
	ExternalLink,
	Globe,
	Info,
	LoaderCircle,
	Trash,
} from '@signozhq/icons';
import { useAppContext } from 'providers/App/App';
import { useDashboardStore } from 'providers/Dashboard/store/useDashboardStore';
import { PublicDashboardMetaProps } from 'types/api/dashboard/public/getMeta';
import APIError from 'types/api/error';
import { USER_ROLES } from 'types/roles';
import { getAbsoluteUrl } from 'utils/basePath';
import { openInNewTab } from 'utils/navigation';

import './PublicDashboard.styles.scss';

export const TIME_RANGE_PRESETS_OPTIONS = [
	{
		value: '5m',
	},
	{
		value: '15m',
	},
	{
		value: '30m',
	},
	{
		value: '1h',
	},
	{
		value: '6h',
	},
	{
		value: '24h',
	},
];

const showErrorNotification = (error: APIError): void => {
	toast.error(error.getErrorCode(), {
		description: error.getErrorMessage(),
	});
};

function PublicDashboardSetting(): JSX.Element {
	const [publicDashboardData, setPublicDashboardData] = useState<
		PublicDashboardMetaProps | undefined
	>(undefined);
	const [timeRangeEnabled, setTimeRangeEnabled] = useState(true);
	const [defaultTimeRange, setDefaultTimeRange] = useState(DEFAULT_TIME_RANGE);
	const [, setCopyPublicDashboardURL] = useCopyToClipboard();

	const { dashboardData } = useDashboardStore();

	const { isCloudUser, isEnterpriseSelfHostedUser } = useGetTenantLicense();

	const isPublicDashboardEnabled = isCloudUser || isEnterpriseSelfHostedUser;

	const { user } = useAppContext();
	const { t } = useTranslation('dashboard');

	const isAdmin = user?.role === USER_ROLES.ADMIN;

	const handleDefaultTimeRange = useCallback((value: string): void => {
		setDefaultTimeRange(value);
	}, []);

	const handleTimeRangeEnabled = useCallback((): void => {
		setTimeRangeEnabled((prev) => !prev);
	}, []);

	const {
		data: publicDashboardResponse,
		isLoading: isLoadingPublicDashboard,
		isFetching: isFetchingPublicDashboard,
		refetch: refetchPublicDashboard,
		error: errorPublicDashboard,
	} = useGetPublicDashboardMeta(
		dashboardData?.id || '',
		!!dashboardData?.id && isPublicDashboardEnabled,
	);

	const isPublicDashboard = !!publicDashboardData?.publicPath;

	useEffect(() => {
		if (publicDashboardResponse?.data) {
			setPublicDashboardData(publicDashboardResponse?.data);
		}

		if (errorPublicDashboard) {
			console.error('Error getting public dashboard', errorPublicDashboard);
			setPublicDashboardData(undefined);
			setTimeRangeEnabled(true);
			setDefaultTimeRange(DEFAULT_TIME_RANGE);
		}
	}, [publicDashboardResponse, errorPublicDashboard]);

	useEffect(() => {
		if (publicDashboardResponse?.data) {
			setTimeRangeEnabled(
				publicDashboardResponse?.data?.timeRangeEnabled || false,
			);
			setDefaultTimeRange(
				publicDashboardResponse?.data?.defaultTimeRange || DEFAULT_TIME_RANGE,
			);
		}
	}, [publicDashboardResponse]);

	const {
		mutate: createPublicDashboard,
		isLoading: isLoadingCreatePublicDashboard,
		data: createPublicDashboardResponse,
	} = useMutation(createPublicDashboardAPI, {
		onSuccess: () => {
			toast.success(t('dashboard_page_v2.public_dashboard.published_success'));
		},
		onError: (error: APIError) => {
			showErrorNotification(error);
		},
	});

	const {
		mutate: updatePublicDashboard,
		isLoading: isLoadingUpdatePublicDashboard,
		data: updatePublicDashboardResponse,
	} = useMutation(updatePublicDashboardAPI, {
		onSuccess: () => {
			toast.success(t('dashboard_page_v2.public_dashboard.updated_success'));
		},
		onError: (error: APIError) => {
			showErrorNotification(error);
		},
	});

	const {
		mutate: revokePublicDashboardAccess,
		isLoading: isLoadingRevokePublicDashboardAccess,
		data: revokePublicDashboardAccessResponse,
	} = useMutation(revokePublicDashboardAccessAPI, {
		onSuccess: () => {
			toast.success(t('dashboard_page_v2.public_dashboard.unpublished_success'));
		},
		onError: (error: APIError) => {
			showErrorNotification(error);
		},
	});

	const handleCreatePublicDashboard = (): void => {
		if (!dashboardData) {
			return;
		}

		createPublicDashboard({
			dashboardId: dashboardData.id,
			timeRangeEnabled,
			defaultTimeRange,
		});
	};

	const handleUpdatePublicDashboard = (): void => {
		if (!dashboardData) {
			return;
		}

		updatePublicDashboard({
			dashboardId: dashboardData.id,
			timeRangeEnabled,
			defaultTimeRange,
		});
	};

	const handleRevokePublicDashboardAccess = (): void => {
		if (!dashboardData) {
			return;
		}

		revokePublicDashboardAccess({
			id: dashboardData.id,
		});
	};

	useEffect(() => {
		if (
			(createPublicDashboardResponse &&
				createPublicDashboardResponse.httpStatusCode === 201) ||
			(updatePublicDashboardResponse &&
				updatePublicDashboardResponse.httpStatusCode === 204) ||
			(revokePublicDashboardAccessResponse &&
				revokePublicDashboardAccessResponse.httpStatusCode === 204)
		) {
			refetchPublicDashboard();
		}
	}, [
		createPublicDashboardResponse,
		updatePublicDashboardResponse,
		revokePublicDashboardAccessResponse,
		refetchPublicDashboard,
	]);

	const handleCopyPublicDashboardURL = (): void => {
		if (!publicDashboardResponse?.data?.publicPath) {
			return;
		}

		try {
			setCopyPublicDashboardURL(
				getAbsoluteUrl(publicDashboardResponse?.data?.publicPath ?? ''),
			);
			toast.success(t('dashboard_page_v2.public_dashboard.copied_url'));
		} catch (error) {
			console.error('Error copying public dashboard URL', error);
		}
	};

	const publicDashboardURL = useMemo(
		() => getAbsoluteUrl(publicDashboardResponse?.data?.publicPath ?? ''),
		[publicDashboardResponse],
	);

	const isLoading =
		isLoadingCreatePublicDashboard ||
		isLoadingUpdatePublicDashboard ||
		isLoadingRevokePublicDashboardAccess ||
		isLoadingPublicDashboard;

	const timeRangeOptions = useMemo(
		() =>
			TIME_RANGE_PRESETS_OPTIONS.map((option) => ({
				...option,
				label: t(
					`dashboard_container.public_dashboard.time_ranges.${option.value}`,
				),
			})),
		[t],
	);

	return (
		<div className="public-dashboard-setting-container">
			<div className="public-dashboard-setting-content">
				<Typography.Title
					level={5}
					className="public-dashboard-setting-content-title"
				>
					{isPublicDashboard
						? t('dashboard_container.public_dashboard.public_description')
						: t('dashboard_container.public_dashboard.private_description')}
				</Typography.Title>

				<div className="timerange-enabled-checkbox">
					<Checkbox
						id="enable-time-range"
						value={timeRangeEnabled}
						onChange={handleTimeRangeEnabled}
					>
						{t('dashboard_page_v2.public_dashboard.enable_time_range')}
					</Checkbox>
				</div>

				<div className="default-time-range-select">
					<div className="default-time-range-select-label">
						<Typography.Text className="default-time-range-select-label-text">
							{t('dashboard_page_v2.public_dashboard.default_time_range')}
						</Typography.Text>
					</div>
					<Select
						placeholder={t(
							'dashboard_page_v2.public_dashboard.select_default_time_range',
						)}
						options={timeRangeOptions}
						value={defaultTimeRange}
						onChange={handleDefaultTimeRange}
						data-testid="default-time-range-select-dropdown"
						className="default-time-range-select-dropdown"
					/>
				</div>

				{isPublicDashboard && (
					<div className="public-dashboard-url">
						<div className="url-label-container">
							<Typography.Text className="url-label">
								{t('dashboard_container.public_dashboard.public_dashboard_url')}
							</Typography.Text>
						</div>

						<div className="url-container">
							<Typography.Text className="url-text">
								{publicDashboardURL}
							</Typography.Text>

							<Button
								type="link"
								className="url-copy-btn periscope-btn ghost"
								icon={<Copy size={12} />}
								onClick={handleCopyPublicDashboardURL}
							/>
							<Button
								type="link"
								className="periscope-btn ghost"
								icon={<ExternalLink size={12} />}
								onClick={(): void => {
									if (publicDashboardURL) {
										openInNewTab(publicDashboardURL);
									}
								}}
							/>
						</div>
					</div>
				)}

				<div className="public-dashboard-setting-callout">
					<Typography.Text className="public-dashboard-setting-callout-text">
						<Info size={12} className="public-dashboard-setting-callout-icon" />{' '}
						{t('dashboard_container.public_dashboard.variables_not_supported')}
					</Typography.Text>
				</div>

				<div className="public-dashboard-setting-actions">
					{!isPublicDashboard ? (
						<Button
							type="primary"
							className="create-public-dashboard-btn periscope-btn primary"
							disabled={isLoading || !isAdmin}
							onClick={handleCreatePublicDashboard}
							loading={
								isLoadingCreatePublicDashboard ||
								isFetchingPublicDashboard ||
								isLoadingPublicDashboard
							}
							icon={
								isLoadingCreatePublicDashboard ||
								isFetchingPublicDashboard ||
								isLoadingPublicDashboard ? (
									<LoaderCircle className="animate-spin" size={14} />
								) : (
									<Globe size={14} />
								)
							}
						>
							{t('dashboard_page_v2.public_dashboard.publish')}
						</Button>
					) : (
						<>
							<Button
								type="default"
								className="periscope-btn secondary"
								disabled={isLoading || !isAdmin}
								onClick={handleRevokePublicDashboardAccess}
								loading={isLoadingRevokePublicDashboardAccess}
								icon={<Trash size={14} />}
							>
								{t('dashboard_page_v2.public_dashboard.unpublish')}
							</Button>

							<Button
								type="primary"
								className="create-public-dashboard-btn periscope-btn primary"
								disabled={isLoading || !isAdmin}
								onClick={handleUpdatePublicDashboard}
								loading={isLoadingUpdatePublicDashboard}
								icon={<Globe size={14} />}
							>
								{t('dashboard_container.public_dashboard.update_published_dashboard')}
							</Button>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default PublicDashboardSetting;
