import { type ChangeEvent, type KeyboardEvent, useState } from 'react';
import { Button } from '@signozhq/ui/button';
import { Input } from '@signozhq/ui/input';
import { Typography } from '@signozhq/ui/typography';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import TagBadge from '../TagBadge/TagBadge';
import { validateTag } from './utils';

import styles from './TagKeyValueInput.module.scss';

interface TagKeyValueInputProps {
	tags: string[];
	onTagsChange: (tags: string[]) => void;
	placeholder?: string;
	className?: string;
	testId?: string;
}

function TagKeyValueInput({
	tags,
	onTagsChange,
	placeholder,
	className,
	testId = 'tag-key-value-input',
}: TagKeyValueInputProps): JSX.Element {
	const { t } = useTranslation('common');
	const [inputValue, setInputValue] = useState('');
	const [error, setError] = useState('');
	const [editIndex, setEditIndex] = useState(-1);
	const [editValue, setEditValue] = useState('');

	const removeTag = (tag: string): void => {
		onTagsChange(tags.filter((t) => t !== tag));
	};

	const commit = (): void => {
		const raw = inputValue.trim();
		if (!raw) {
			return;
		}
		const result = validateTag(raw, tags);
		if ('errorKey' in result) {
			setError(t(result.errorKey));
			return;
		}
		onTagsChange([...tags, result.tag]);
		setInputValue('');
		setError('');
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setInputValue(e.target.value);
		if (error) {
			setError('');
		}
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
		if (e.key === 'Enter' && !e.metaKey && !e.ctrlKey) {
			e.preventDefault();
			commit();
		}
	};

	const startEdit = (index: number): void => {
		setEditIndex(index);
		setEditValue(tags[index]);
		setError('');
	};

	const cancelEdit = (): void => {
		setEditIndex(-1);
		setEditValue('');
		setError('');
	};

	const commitEdit = (revertOnInvalid = false): void => {
		const result = validateTag(editValue, tags, editIndex);
		if ('errorKey' in result) {
			if (revertOnInvalid) {
				cancelEdit();
			} else {
				setError(t(result.errorKey));
			}
			return;
		}
		onTagsChange(tags.map((t, i) => (i === editIndex ? result.tag : t)));
		cancelEdit();
	};

	const handleEditKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
		if (e.key === 'Enter' && !e.metaKey && !e.ctrlKey) {
			e.preventDefault();
			e.stopPropagation();
			commitEdit();
		} else if (e.key === 'Escape') {
			e.preventDefault();
			e.stopPropagation();
			cancelEdit();
		}
	};

	return (
		<div className={cx(styles.container, className)}>
			<div className={styles.field}>
				{tags.map((tag, index) =>
					index === editIndex ? (
						<Input
							key={tag}
							className={styles.editInput}
							value={editValue}
							autoFocus
							testId={`${testId}-edit`}
							onChange={(e: ChangeEvent<HTMLInputElement>): void => {
								setEditValue(e.target.value);
								if (error) {
									setError('');
								}
							}}
							onKeyDown={handleEditKeyDown}
							onBlur={(): void => commitEdit(true)}
						/>
					) : (
						<TagBadge
							key={tag}
							className={styles.tag}
							closable
							onClose={(): void => removeTag(tag)}
						>
							<Button
								variant="ghost"
								color="secondary"
								className={styles.tagLabel}
								title={t('tag_key_value.double_click_to_edit')}
								testId={`${testId}-chip`}
								onDoubleClick={(): void => startEdit(index)}
							>
								{tag}
							</Button>
						</TagBadge>
					),
				)}
				<Input
					className={styles.input}
					value={inputValue}
					placeholder={placeholder || t('tag_key_value.placeholder')}
					testId={testId}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
				/>
			</div>
			{error && (
				<Typography className={styles.error} data-testid={`${testId}-error`}>
					{error}
				</Typography>
			)}
		</div>
	);
}

export default TagKeyValueInput;
