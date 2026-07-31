import { Search } from '@signozhq/icons';
import { Button, Card, Input, Space } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import { useTranslation } from 'react-i18next';

export function FilterDropdown({
	setSelectedKeys,
	selectedKeys,
	confirm,
}: FilterDropdownProps): JSX.Element {
	const { t } = useTranslation(['services']);
	const handleSearch = (): void => {
		confirm();
	};

	const selectedKeysHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setSelectedKeys(e.target.value ? [e.target.value] : []);
	};

	return (
		<Card size="small">
			<Space align="start" direction="vertical">
				<Input
					placeholder={t('table.search_placeholder')}
					value={selectedKeys[0]}
					onChange={selectedKeysHandler}
					allowClear
					onPressEnter={handleSearch}
				/>
				<Button
					type="primary"
					onClick={handleSearch}
					icon={<Search size="md" />}
					size="small"
				>
					{t('table.search')}
				</Button>
			</Space>
		</Card>
	);
}
