import { memo, MouseEvent, ReactNode, useMemo } from 'react';
import { Popover } from 'antd';
import cx from 'classnames';
import { OPERATORS } from 'constants/queryBuilder';
import { FontSize } from 'container/OptionsMenu/types';
import { useTranslation } from 'react-i18next';
import { DataTypes } from 'types/api/queryBuilder/queryAutocompleteResponse';

import './AddToQueryHOC.styles.scss';

function AddToQueryHOC({
	fieldKey,
	fieldValue,
	onAddToQuery,
	fontSize,
	dataType = DataTypes.EMPTY,
	children,
}: AddToQueryHOCProps): JSX.Element {
	const { t } = useTranslation('logs');

	const handleQueryAdd = (event: MouseEvent<HTMLDivElement>): void => {
		event.stopPropagation();
		onAddToQuery(fieldKey, fieldValue, OPERATORS['='], dataType);
	};

	const popOverContent = useMemo(
		() => <span>{t('log_line_actions.add_to_query', { fieldKey })}</span>,
		[fieldKey, t],
	);

	return (
		<div className={cx('addToQueryContainer', fontSize)} onClick={handleQueryAdd}>
			<Popover
				overlayClassName="drawer-popover"
				placement="top"
				content={popOverContent}
			>
				{children}
			</Popover>
		</div>
	);
}

export interface AddToQueryHOCProps {
	fieldKey: string;
	fieldValue: string;
	onAddToQuery: (
		fieldKey: string,
		fieldValue: string,
		operator: string,
		dataType?: DataTypes,
	) => void;
	fontSize: FontSize;
	dataType?: DataTypes;
	children: ReactNode;
}

AddToQueryHOC.defaultProps = {
	dataType: DataTypes.EMPTY,
};

export default memo(AddToQueryHOC);
