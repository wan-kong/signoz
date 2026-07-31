import { Typography } from '@signozhq/ui/typography';
import { ChevronDown, ChevronRight } from '@signozhq/icons';
import { useTranslation } from 'react-i18next';

interface CheckboxFilterHeaderProps {
	title: string;
	isOpen: boolean;
	showClearAll: boolean;
	onToggleOpen: () => void;
	onClear: () => void;
}

function CheckboxFilterHeader({
	title,
	isOpen,
	showClearAll,
	onToggleOpen,
	onClear,
}: CheckboxFilterHeaderProps): JSX.Element {
	const { t } = useTranslation('common');

	return (
		<section className="filter-header-checkbox" onClick={onToggleOpen}>
			<section className="left-action">
				{isOpen ? (
					<ChevronDown size={13} cursor="pointer" />
				) : (
					<ChevronRight size={13} cursor="pointer" />
				)}
				<Typography.Text className="title">{title}</Typography.Text>
			</section>
			<section className="right-action">
				{isOpen && showClearAll && (
					<Typography.Text
						className="clear-all"
						onClick={(e): void => {
							e.stopPropagation();
							e.preventDefault();
							onClear();
						}}
					>
						{t('quick_filters.clear_all')}
					</Typography.Text>
				)}
			</section>
		</section>
	);
}

export default CheckboxFilterHeader;
