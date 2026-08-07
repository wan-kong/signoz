import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Badge } from '@signozhq/ui/badge';
import { Button } from '@signozhq/ui/button';
import { Input } from '@signozhq/ui/input';
import { Typography } from '@signozhq/ui/typography';
import { X } from '@signozhq/icons';

import styles from './PatternEditor.module.scss';

interface PatternEditorProps {
	patterns: string[];
	isReadOnly: boolean;
	onChange: (patterns: string[]) => void;
}

// Model-name prefix patterns as removable chips + an add input.
function PatternEditor({
	patterns,
	isReadOnly,
	onChange,
}: PatternEditorProps): JSX.Element {
	const { t } = useTranslation('llm');
	const [patternInput, setPatternInput] = useState<string>('');

	const addPattern = (): void => {
		const next = patternInput.trim();
		if (!next || patterns.includes(next)) {
			setPatternInput('');
			return;
		}
		onChange([...patterns, next]);
		setPatternInput('');
	};

	const removePattern = (pattern: string): void => {
		onChange(patterns.filter((p) => p !== pattern));
	};

	return (
		<div className={styles.drawerSection}>
			<Typography.Text as="span">
				{t('pattern_editor.title', 'Model name patterns')}{' '}
				<Typography.Text as="span" color="muted">
					{t('pattern_editor.prefix_match_hint', '(prefix match)')}
				</Typography.Text>
			</Typography.Text>
			<div className={styles.patternBox}>
				<div className={styles.patternChips}>
					{patterns.map((pattern) => (
						<Badge
							key={pattern}
							color="vanilla"
							variant="outline"
							className={styles.patternChip}
						>
							{pattern}*
							{!isReadOnly && (
								<button
									type="button"
									aria-label={t(
										'pattern_editor.remove_pattern_aria',
										'Remove pattern {{pattern}}',
										{ pattern },
									)}
									className={styles.patternChipRemove}
									onClick={(): void => removePattern(pattern)}
								>
									<X size={10} />
								</button>
							)}
						</Badge>
					))}
				</div>
				{!isReadOnly && (
					<div className={styles.patternAdd}>
						<Input
							placeholder={t('pattern_editor.add_placeholder', 'Add pattern…')}
							value={patternInput}
							onChange={(e): void => setPatternInput(e.target.value)}
							onKeyDown={(e): void => {
								if (e.key === 'Enter') {
									e.preventDefault();
									addPattern();
								}
							}}
							testId="drawer-pattern-input"
						/>
						<Button
							variant="outlined"
							color="secondary"
							onClick={addPattern}
							testId="drawer-pattern-add-btn"
						>
							{t('pattern_editor.add', '+ Add')}
						</Button>
					</div>
				)}
			</div>
			<Typography.Text as="p" size="small" color="muted">
				{t('pattern_editor.each_pattern_uses', 'Each pattern uses')}{' '}
				<strong>{t('pattern_editor.prefix_matching', 'prefix matching')}</strong>{' '}
				{t('pattern_editor.against', 'against')} <code>gen_ai.request.model</code>.
			</Typography.Text>
		</div>
	);
}

export default PatternEditor;
