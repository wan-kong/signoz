import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from '@signozhq/icons';
import { Badge } from '@signozhq/ui/badge';
import ROUTES from 'constants/routes';
import KeyValueLabel from 'periscope/components/KeyValueLabel';

import styles from './LinkedSpans.module.scss';

interface SpanReference {
	traceId: string;
	spanId: string;
	refType: string;
}

interface LinkedSpansProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	references: any;
}

interface LinkedSpansState {
	linkedSpans: SpanReference[];
	count: number;
	isOpen: boolean;
	toggleOpen: () => void;
}

export function useLinkedSpans(references: any): LinkedSpansState {
	const [isOpen, setIsOpen] = useState(false);

	const linkedSpans: SpanReference[] = useMemo(
		() =>
			(references || []).filter(
				(ref: SpanReference) => ref.refType !== 'CHILD_OF',
			),
		[references],
	);

	const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);

	return {
		linkedSpans,
		count: linkedSpans.length,
		isOpen,
		toggleOpen,
	};
}

export function LinkedSpansToggle({
	count,
	isOpen,
	toggleOpen,
}: {
	count: number;
	isOpen: boolean;
	toggleOpen: () => void;
}): JSX.Element {
	const { t } = useTranslation('dashboard');
	if (count === 0) {
		return (
			<span className={styles.label}>{t('span_details.linked_spans_zero')}</span>
		);
	}

	return (
		<button type="button" className={styles.toggle} onClick={toggleOpen}>
			<span className={styles.label}>
				{t('span_details.linked_span', { count })}
			</span>
			{isOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
		</button>
	);
}

export function LinkedSpansPanel({
	linkedSpans,
	isOpen,
}: {
	linkedSpans: SpanReference[];
	isOpen: boolean;
}): JSX.Element | null {
	const { t } = useTranslation('dashboard');
	const getLink = useCallback(
		(item: SpanReference): string =>
			`${ROUTES.TRACE}/${item.traceId}?spanId=${item.spanId}`,
		[],
	);

	if (!isOpen || linkedSpans.length === 0) {
		return null;
	}

	return (
		<div className={styles.list}>
			{linkedSpans.map((item) => (
				<KeyValueLabel
					key={item.spanId}
					badgeKey={t('span_details.linked_span_id')}
					badgeValue={
						<Link to={getLink(item)}>
							<Badge color="vanilla">{item.spanId}</Badge>
						</Link>
					}
					direction="column"
				/>
			))}
		</div>
	);
}

function LinkedSpans({ references }: LinkedSpansProps): JSX.Element {
	const { linkedSpans, count, isOpen, toggleOpen } = useLinkedSpans(references);

	return (
		<div className={styles.root}>
			<LinkedSpansToggle count={count} isOpen={isOpen} toggleOpen={toggleOpen} />
			<LinkedSpansPanel linkedSpans={linkedSpans} isOpen={isOpen} />
		</div>
	);
}

export default LinkedSpans;
