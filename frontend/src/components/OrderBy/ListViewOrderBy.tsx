import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { Select, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { getKeySuggestions } from 'api/querySuggestions/getKeySuggestions';
import { QueryKeyDataSuggestionsProps } from 'types/api/querySuggestions/types';
import { DataSource } from 'types/common/queryBuilder';

import './ListViewOrderBy.styles.scss';

interface ListViewOrderByProps {
	value: string;
	onChange: (value: string) => void;
	dataSource: DataSource;
}

// Loader component for the dropdown when loading or no results
function Loader({ isLoading }: { isLoading: boolean }): JSX.Element {
	const { t } = useTranslation('common');
	return (
		<div className="order-by-loading-container">
			{isLoading ? <Spin size="default" /> : t('order_by.no_results')}
		</div>
	);
}

function ListViewOrderBy({
	value,
	onChange,
	dataSource,
}: ListViewOrderByProps): JSX.Element {
	const { t } = useTranslation('common');
	const [searchInput, setSearchInput] = useState('');
	const [debouncedInput, setDebouncedInput] = useState('');
	const [selectOptions, setSelectOptions] = useState<
		{ label: string; value: string }[]
	>([]);
	const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	const { data, isLoading } = useQuery({
		queryKey: ['orderByKeySuggestions', dataSource, debouncedInput],
		queryFn: async () => {
			const response = await getKeySuggestions({
				signal: dataSource,
				searchText: debouncedInput,
			});
			return response.data;
		},
	});

	useEffect(
		() => (): void => {
			if (debounceTimer.current) {
				clearTimeout(debounceTimer.current);
			}
		},
		[],
	);

	useEffect(() => {
		const rawKeys: QueryKeyDataSuggestionsProps[] = data?.data?.keys
			? Object.values(data.data?.keys).flat()
			: [];

		const keyNames = rawKeys.map((key) => key.name);
		const uniqueKeys = [
			...new Set(searchInput ? keyNames : ['timestamp', ...keyNames]),
		];

		const updatedOptions = uniqueKeys.flatMap((key) => [
			{ label: `${key} (desc)`, value: `${key}:desc` },
			{ label: `${key} (asc)`, value: `${key}:asc` },
		]);

		setSelectOptions(updatedOptions);
	}, [data, searchInput]);

	const handleSearch = (input: string): void => {
		setSearchInput(input);

		const filteredOptions = selectOptions.filter((option) =>
			option.value.toLowerCase().includes(input.trim().toLowerCase()),
		);

		if (filteredOptions.length === 0 || input === '') {
			if (debounceTimer.current) {
				clearTimeout(debounceTimer.current);
			}

			debounceTimer.current = setTimeout(() => {
				setDebouncedInput(input);
			}, 100);
		}
	};

	return (
		<Select
			showSearch
			value={value}
			onChange={onChange}
			onSearch={handleSearch}
			notFoundContent={<Loader isLoading={isLoading} />}
			placeholder={t('order_by.select_field')}
			style={{ width: 200 }}
			options={selectOptions}
			filterOption={(input, option): boolean =>
				(option?.value ?? '').toLowerCase().includes(input.trim().toLowerCase())
			}
		/>
	);
}

export default ListViewOrderBy;
