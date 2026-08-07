/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */

/**
 * Adds custom matchers from the react testing library to all tests
 */
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';

import { server } from './src/mocks-server/server';
import { createTestI18nInstance } from './src/ReactI18/testUtils';
import { enResources } from './src/ReactI18/testResources';

import './src/styles.scss';
// Establish API mocking before all tests.

// Mock window.matchMedia
window.matchMedia =
	window.matchMedia ||
	function (): any {
		return {
			matches: false,
			addListener: function () {},
			removeListener: function () {},
		};
	};

if (!HTMLElement.prototype.scrollIntoView) {
	HTMLElement.prototype.scrollIntoView = function (): void {};
}

// jsdom doesn't implement the Pointer Capture API, which Radix UI primitives
// (e.g. @signozhq/ui Select) call when opening. Stub them so those components
// can be exercised in tests.
if (!HTMLElement.prototype.hasPointerCapture) {
	HTMLElement.prototype.hasPointerCapture = function (): boolean {
		return false;
	};
}
if (!HTMLElement.prototype.releasePointerCapture) {
	HTMLElement.prototype.releasePointerCapture = function (): void {};
}

if (typeof window.IntersectionObserver === 'undefined') {
	class IntersectionObserverMock {
		observe(): void {}
		unobserve(): void {}
		disconnect(): void {}
		takeRecords(): IntersectionObserverEntry[] {
			return [];
		}
	}
	(window as any).IntersectionObserver = IntersectionObserverMock;
}

if (typeof window.ResizeObserver === 'undefined') {
	class ResizeObserverMock {
		observe(): void {}
		unobserve(): void {}
		disconnect(): void {}
	}
	(window as any).ResizeObserver = ResizeObserverMock;
}

// Patch getComputedStyle to handle CSS parsing errors from @signozhq/* packages.
// These packages inject CSS at import time via style-inject / vite-plugin-css-injected-by-js.
// jsdom's nwsapi cannot parse some of the injected selectors (e.g. Tailwind's :animate-in),
// causing SyntaxErrors during getComputedStyle / getByRole calls.
const _origGetComputedStyle = window.getComputedStyle;
window.getComputedStyle = function (
	elt: Element,
	pseudoElt?: string | null,
): CSSStyleDeclaration {
	try {
		return _origGetComputedStyle.call(window, elt, pseudoElt);
	} catch {
		// Return a minimal CSSStyleDeclaration so callers (testing-library, Radix UI)
		// see the element as visible and without animations.
		return {
			display: '',
			visibility: '',
			opacity: '1',
			animationName: 'none',
			getPropertyValue: () => '',
		} as unknown as CSSStyleDeclaration;
	}
};

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

// Register a global en-resources i18next instance as react-i18next's module-level
// "reactI18nextInstance". Components rendered with a bare `@testing-library/react`
// render (no I18nextProvider) fall back to this instance, so they render real English
// instead of raw keys. Tests using customRender/AllTheProviders get their own instance
// from createTestI18nInstance and are unaffected. Runs last (after all imports, incl.
// the app's i18n init triggered via mocks-server) so it wins as the global instance.
createTestI18nInstance({ language: 'en', resources: enResources });
