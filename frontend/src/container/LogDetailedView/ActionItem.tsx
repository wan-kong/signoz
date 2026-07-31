import { memo, useCallback, useMemo } from 'react';
import { CircleMinus, CirclePlus } from '@signozhq/icons';
import { Button, Col, Popover } from 'antd';
import { OPERATORS } from 'constants/queryBuilder';
import { removeJSONStringifyQuotes } from 'lib/removeJSONStringifyQuotes';
import { useTranslation } from 'react-i18next';
import { DataTypes } from 'types/api/queryBuilder/queryAutocompleteResponse';

function ActionItem({
	fieldKey,
	fieldValue,
	onClickActionItem,
}: ActionItemProps): JSX.Element {
	const { t } = useTranslation('logs');
	const handleClick = useCallback(
		(operator: string) => {
			const validatedFieldValue = removeJSONStringifyQuotes(fieldValue);

			onClickActionItem(fieldKey, validatedFieldValue, operator);
		},
		[onClickActionItem, fieldKey, fieldValue],
	);

	const onClickHandler = useCallback(
		(operator: string) => (): void => {
			handleClick(operator);
		},
		[handleClick],
	);

	const PopOverMenuContent = useMemo(
		() => (
			<Col>
				<Button type="text" size="small" onClick={onClickHandler(OPERATORS.IN)}>
					<CirclePlus size={12} /> {t('details.actions.filter_for_value')}
				</Button>
				<br />
				<Button type="text" size="small" onClick={onClickHandler(OPERATORS.NIN)}>
					<CircleMinus size={12} /> {t('details.actions.filter_out_value')}
				</Button>
			</Col>
		),
		[onClickHandler, t],
	);
	return (
		<Popover placement="bottomLeft" content={PopOverMenuContent} trigger="click">
			<Button type="text" size="small">
				...
			</Button>
		</Popover>
	);
}

export interface ActionItemProps {
	fieldKey: string;
	fieldValue: string;
	onClickActionItem: (
		fieldKey: string,
		fieldValue: string,
		operator: string,
		dataType?: DataTypes,
		fieldType?: string,
	) => void;
}

export default memo(ActionItem);
