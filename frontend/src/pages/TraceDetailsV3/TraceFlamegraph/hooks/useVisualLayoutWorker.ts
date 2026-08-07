import i18n from 'ReactI18';
import { useEffect, useRef, useState } from 'react';
import { SpantypesFlamegraphSpanDTO as FlamegraphSpan } from 'api/generated/services/sigNoz.schemas';

import { computeVisualLayout, VisualLayout } from '../computeVisualLayout';
import { LayoutWorkerResponse } from '../visualLayoutWorkerTypes';

const EMPTY_LAYOUT: VisualLayout = {
	visualRows: [],
	spanToVisualRow: {},
	connectors: [],
	totalVisualRows: 0,
};

function computeLayoutOrEmpty(spans: FlamegraphSpan[][]): VisualLayout {
	return spans.length ? computeVisualLayout(spans) : EMPTY_LAYOUT;
}

function createLayoutWorker(): Worker {
	return new Worker(new URL('../visualLayout.worker.ts', import.meta.url), {
		type: 'module',
	});
}

export function useVisualLayoutWorker(spans: FlamegraphSpan[][]): {
	layout: VisualLayout;
	isComputing: boolean;
	error: Error | null;
} {
	const [layout, setLayout] = useState<VisualLayout>(EMPTY_LAYOUT);
	const [isComputing, setIsComputing] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const isComputingRef = useRef(false);
	const workerRef = useRef<Worker | null>(null);
	const requestIdRef = useRef(0);
	const fallbackRef = useRef(typeof Worker === 'undefined');

	// Effect: post message to worker when spans change
	// eslint-disable-next-line sonarjs/cognitive-complexity
	useEffect(() => {
		if (fallbackRef.current) {
			setLayout(computeLayoutOrEmpty(spans));
			return;
		}

		if (!workerRef.current) {
			try {
				workerRef.current = createLayoutWorker();
			} catch {
				fallbackRef.current = true;
				setLayout(computeLayoutOrEmpty(spans));
				return;
			}
		}

		if (!spans.length) {
			setLayout(EMPTY_LAYOUT);
			return;
		}

		const currentId = ++requestIdRef.current;
		setIsComputing(true);
		isComputingRef.current = true;

		const worker = workerRef.current;

		const cleanup = (): void => {
			worker.removeEventListener('message', onMessage);
			worker.removeEventListener('error', onError);
			clearTimeout(timeoutId);
		};

		const onMessage = (e: MessageEvent<LayoutWorkerResponse>): void => {
			if (e.data.requestId !== requestIdRef.current) {
				return;
			}
			if (e.data.type === 'result') {
				setLayout(e.data.layout);
			} else {
				setError(
					new Error(
						e.data.message ||
							i18n.t(
								'trace_flamegraph.layout_computation_failed',
								'Flamegraph layout computation failed',
								{ ns: 'traceDetails' },
							),
					),
				);
			}
			setIsComputing(false);
			isComputingRef.current = false;
			cleanup();
		};

		const onError = (e: ErrorEvent): void => {
			if (requestIdRef.current === currentId) {
				setIsComputing(false);
				isComputingRef.current = false;
				setError(
					new Error(
						e.message ||
							i18n.t(
								'trace_flamegraph.layout_worker_failed',
								'Flamegraph layout worker failed',
								{ ns: 'traceDetails' },
							),
					),
				);
			}
			cleanup();
		};

		// Timeout: if worker doesn't respond in 15s, terminate and error
		const WORKER_TIMEOUT_MS = 15000;
		const timeoutId = setTimeout(() => {
			if (requestIdRef.current === currentId && isComputingRef.current) {
				workerRef.current?.terminate();
				workerRef.current = null;
				setIsComputing(false);
				isComputingRef.current = false;
				setError(
					new Error(
						i18n.t(
							'trace_flamegraph.layout_computation_timed_out',
							'Flamegraph layout computation timed out',
							{ ns: 'traceDetails' },
						),
					),
				);
			}
		}, WORKER_TIMEOUT_MS);

		worker.addEventListener('message', onMessage);
		worker.addEventListener('error', onError);
		worker.postMessage({ type: 'compute', requestId: currentId, spans });

		return cleanup;
	}, [spans]);

	// Cleanup worker on unmount
	useEffect(
		() => (): void => {
			workerRef.current?.terminate();
		},
		[],
	);

	return { layout, isComputing, error };
}
