import { useTranslation } from 'react-i18next';
import { Badge } from '@signozhq/ui/badge';
import { SpantypesSpanMapperTestSpanDTO } from 'api/generated/services/sigNoz.schemas';
import { useMemo } from 'react';

import {
	AttrChangeStatus,
	AttrDiffEntry,
	diffAttributeMaps,
	formatAttributeValue,
} from './testPayload';
import styles from './TestTab.module.scss';
import { TestTabAttributes, TestTabResource } from './useTestSpanMapper';

interface TestResultProps {
	index: number;
	span: SpantypesSpanMapperTestSpanDTO;
	inputAttributes: TestTabAttributes;
	inputResource: TestTabResource;
}

const STATUS_BADGE: Partial<
	Record<
		AttrChangeStatus,
		{ color: 'success' | 'robin' | 'sienna'; labelKey: string; label: string }
	>
> = {
	added: { color: 'success', labelKey: 'badge_populated', label: 'populated' },
	changed: { color: 'robin', labelKey: 'badge_remapped', label: 'remapped' },
	removed: { color: 'sienna', labelKey: 'badge_moved_out', label: 'moved out' },
};

const ROW_CLASS: Partial<Record<AttrChangeStatus, string>> = {
	added: styles.added,
	removed: styles.removed,
};

interface ResultSection {
	key: string;
	title: string;
	entries: AttrDiffEntry[];
}

function TestResult({
	index,
	span,
	inputAttributes,
	inputResource,
}: TestResultProps): JSX.Element {
	const { t } = useTranslation('llm');

	const attributeEntries = useMemo(
		() => diffAttributeMaps(inputAttributes, span.attributes ?? {}),
		[inputAttributes, span.attributes],
	);
	const resourceEntries = useMemo(
		() => diffAttributeMaps(inputResource, span.resource ?? {}),
		[inputResource, span.resource],
	);

	const sections: ResultSection[] = [
		{
			key: 'attributes',
			title: t('test_tab.resulting_attributes', 'Resulting attributes'),
			entries: attributeEntries,
		},
	];
	if (resourceEntries.length > 0) {
		sections.push({
			key: 'resource',
			title: t('test_tab.resulting_resource', 'Resulting resource'),
			entries: resourceEntries,
		});
	}

	return (
		<div className={styles.resultCard} data-testid={`test-result-${index}`}>
			{sections.map((section) => (
				<div
					key={section.key}
					className={styles.resultSection}
					data-testid={`test-result-${index}-${section.key}`}
				>
					<div className={styles.resultTitle}>{section.title}</div>

					{section.entries.length === 0 ? (
						<div className={styles.resultEmpty}>
							{t('test_tab.no_keys_in_map', 'No keys in this map.')}
						</div>
					) : (
						<div className={styles.attrRows}>
							{section.entries.map((entry) => {
								const badge = STATUS_BADGE[entry.status];
								return (
									<div
										key={entry.key}
										className={`${styles.attrRow} ${ROW_CLASS[entry.status] ?? ''}`}
									>
										<span className={styles.attrKey} title={entry.key}>
											{entry.key}
										</span>
										<span
											className={styles.attrValue}
											title={formatAttributeValue(entry.value)}
										>
											{formatAttributeValue(entry.value)}
										</span>
										{badge ? (
											<Badge color={badge.color} variant="outline">
												{t(`test_tab.${badge.labelKey}`, badge.label)}
											</Badge>
										) : (
											<span />
										)}
									</div>
								);
							})}
						</div>
					)}
				</div>
			))}
		</div>
	);
}

export default TestResult;
