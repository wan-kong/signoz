import { CircleAlert, Plus, Trash2 } from '@signozhq/icons';
import { Button } from '@signozhq/ui/button';
import { Callout } from '@signozhq/ui/callout';
import { Input } from '@signozhq/ui/input';
import { Typography } from '@signozhq/ui/typography';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import RolesSelect from 'components/RolesSelect/RolesSelect';

import styles from './InviteMembers.module.scss';
import { InviteMembersProps } from './types';
import { useInviteMembers } from './useInviteMembers';

function InviteMembers({
	className,
	initialRowCount = 3,
	minRows = 1,
	emailPlaceholder = 'e.g. john@signoz.io',
	showHeader = true,
	showAddButton = true,
	onSuccess,
	onPartialSuccess,
	onAllFailed,
	renderFooter,
}: InviteMembersProps): JSX.Element {
	const { t } = useTranslation('common');
	const {
		rows,
		emailValidity,
		hasInvalidEmails,
		hasInvalidRoles,
		isSubmitting,
		inviteResults,
		addRow,
		removeRow,
		updateEmail,
		updateRole,
		reset,
		submit,
		touchedRows,
		failedResults,
		successResults,
	} = useInviteMembers({
		initialRowCount,
		onSuccess,
		onPartialSuccess,
		onAllFailed,
	});

	const canSubmit = !isSubmitting && touchedRows.length > 0;
	const canRemoveRow = rows.length > minRows;

	const getValidationErrorMessage = (): string => {
		if (hasInvalidEmails && hasInvalidRoles) {
			return t('invite.validation.email_and_role');
		}
		if (hasInvalidEmails) {
			return t('invite.validation.email_only');
		}
		return t('invite.validation.role_only');
	};

	const hasValidationErrors = hasInvalidEmails || hasInvalidRoles;
	const hasResults = inviteResults !== null;
	const hasFailures = failedResults.length > 0;
	const hasSuccesses = successResults.length > 0;

	return (
		<div className={cx(styles.inviteMembers, className)}>
			<div className={styles.table}>
				{showHeader && (
					<div className={styles.header}>
						<Typography.Text
							size="base"
							weight="semibold"
							className={styles.headerCellEmail}
						>
							{t('invite.email_address')}
						</Typography.Text>
						<Typography.Text
							size="base"
							weight="semibold"
							className={styles.headerCellRole}
						>
							{t('invite.role')}
						</Typography.Text>
						<div className={styles.headerCellAction} />
					</div>
				)}

				<div className={styles.rows}>
					{rows.map((row) => (
						<div key={row.id} className={styles.row}>
							<div className={styles.cellEmail}>
								<Input
									type="email"
									placeholder={emailPlaceholder}
									value={row.email}
									onChange={(e): void => updateEmail(row.id, e.target.value)}
									name={`invite-email-${row.id}`}
									autoComplete="email"
									data-testid={`invite-email-${row.id}`}
								/>
								{emailValidity[row.id] === false && row.email.trim() !== '' && (
									<Typography.Text size="small" className={styles.errorText}>
										{t('invite.invalid_email')}
									</Typography.Text>
								)}
							</div>

							<div className={styles.cellRole}>
								<RolesSelect
									mode="single"
									value={row.roleId || undefined}
									onChange={(roleId): void => updateRole(row.id, roleId)}
									placeholder={t('invite.select_role')}
									allowClear={false}
									id={`invite-role-${row.id}`}
								/>
							</div>

							<div className={styles.cellAction}>
								{canRemoveRow && (
									<Button
										variant="ghost"
										color="destructive"
										onClick={(): void => removeRow(row.id)}
										aria-label={t('remove')}
										data-testid={`invite-remove-${row.id}`}
									>
										<Trash2 size={12} />
									</Button>
								)}
							</div>
						</div>
					))}
				</div>

				{showAddButton && (
					<div className={styles.addRow}>
						<Button
							variant="dashed"
							color="secondary"
							prefix={<Plus size={12} />}
							onClick={addRow}
							data-testid="invite-add-row"
						>
							{t('invite.add_another')}
						</Button>
					</div>
				)}
			</div>

			{hasValidationErrors && (
				<Callout
					type="error"
					size="small"
					showIcon
					icon={<CircleAlert size={12} />}
					className={styles.callout}
					data-testid="invite-validation-error"
				>
					{getValidationErrorMessage()}
				</Callout>
			)}

			{hasResults && hasFailures && (
				<Callout
					type="error"
					size="small"
					showIcon
					icon={<CircleAlert size={12} />}
					className={styles.callout}
					data-testid="invite-api-error"
				>
					<div className={styles.results}>
						{hasSuccesses && (
							<Typography.Text size="small">
								{t('invite.results.partial_success', {
									success: successResults.length,
									failed: failedResults.length,
								})}
							</Typography.Text>
						)}
						<Typography.Text size="small">
							{t('invite.results.invites_failed', { count: failedResults.length })}
						</Typography.Text>
						<ul className={styles.resultsList}>
							{failedResults.map((result) => (
								<li key={result.email}>
									<Typography.Text size="small">
										{result.email}: {result.error}
									</Typography.Text>
								</li>
							))}
						</ul>
					</div>
				</Callout>
			)}

			{hasResults && !hasFailures && hasSuccesses && (
				<Callout
					type="success"
					size="small"
					showIcon
					className={styles.callout}
					data-testid="invite-success"
				>
					<Typography.Text size="small">
						{t('invite.results.invites_sent', { count: successResults.length })}
					</Typography.Text>
				</Callout>
			)}

			{renderFooter?.({
				submit,
				reset,
				canSubmit,
				isSubmitting,
				touchedCount: touchedRows.length,
			})}
		</div>
	);
}

export default InviteMembers;
