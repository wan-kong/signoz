---
name: i18n-internationalization
description: Comprehensive guide for adding and maintaining internationalization (i18n) support in SigNoz frontend modules
metadata:
  type: reference
---

# SigNoz Frontend Internationalization (i18n) Guide

## Overview

SigNoz uses **i18next** with **react-i18next** for internationalization. The system supports multiple languages with English (en) as the default/fallback language and Simplified Chinese (zh-CN) as the second supported language.

## Architecture

### Core Technologies
- **i18next** v21.6+ - Core i18n framework
- **react-i18next** v11.16+ - React bindings
- **i18next-browser-languagedetector** v6.1+ - Language detection
- **i18next-http-backend** v4.0+ - Dynamic translation loading

### Key Files
```
frontend/
├── src/
│   ├── ReactI18/
│   │   ├── config.ts          # i18n configuration and language detection
│   │   ├── index.tsx          # i18n initialization
│   │   ├── testUtils.ts       # Test utilities for i18n
│   │   └── i18n.config.json   # Language configuration
│   ├── utils/
│   │   └── i18nFormat.ts      # Date/number/relative time formatting
│   └── tests/
│       ├── logsI18n.ts        # i18n test provider for logs module
│       ├── traceI18n.ts       # i18n test provider for trace module
│       └── servicesI18n.ts    # i18n test provider for services module
├── public/
│   └── locales/
│       ├── en/                # English translations (fallback/default)
│       │   ├── common.json
│       │   ├── home.json
│       │   ├── logs.json
│       │   ├── alerts.json
│       │   └── ...
│       └── zh-CN/             # Chinese translations
│           ├── common.json
│           ├── home.json
│           ├── logs.json
│           ├── alerts.json
│           └── ...
└── scripts/
    └── check-i18n.mjs          # i18n validation script
```

## Translation File Structure

### Namespace Organization

Each feature module has its own **namespace** (JSON file):
- **common.json** - Shared translations used across multiple modules
- **home.json** - Home page translations
- **logs.json** - Logs module translations
- **alerts.json** - Alerts module translations
- **dashboard.json** - Dashboard translations
- etc.

### JSON Structure

Translations use **nested objects** for organization with **snake_case** keys:

```json
{
  "section_name": {
    "subsection": {
      "key": "Translated text",
      "key_with_var": "Text with {{variable}}",
      "key_with_count": "Text with {{count}} item"
    }
  }
}
```

#### Example: `home.json`
```json
{
  "alert_rules": {
    "all": "All Alert Rules",
    "create": "Create Alert Rule",
    "empty_title": "No Alert rules yet.",
    "empty_description": "Create an Alert Rule to get started"
  },
  "checklist": {
    "completed": "Completed",
    "get_started": "Get Started",
    "items": {
      "ADD_DATA_SOURCE": {
        "title": "Add your first data source",
        "description": "Add a data source to start monitoring"
      }
    }
  },
  "welcome": {
    "checklist_button": "Let's get started!"
  }
}
```

### Variable Interpolation

Use `{{variableName}}` syntax for dynamic content:

```json
{
  "filter_for": "Filter for {{value}}",
  "step_count": "Step {{completed}} / {{total}}",
  "open_noz_many_actions": "Open Noz, {{count}} actions need your response",
  "feedback_submit_success": "{{entity}} submitted successfully"
}
```

## Using Translations in Components

### Basic Usage

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  // Specify namespace (defaults to 'common' if omitted)
  const { t } = useTranslation('home');

  return <h1>{t('welcome.checklist_button')}</h1>;
}
```

### With Variables

```tsx
const { t } = useTranslation('home');

return <div>{t('filter_for', { value: 'status' })}</div>;
// Output: "Filter for status"
```

### Multiple Namespaces

If a component needs translations from multiple namespaces, call `useTranslation` multiple times or use array syntax:

```tsx
// Option 1: Multiple calls
const { t: tHome } = useTranslation('home');
const { t: tLogs } = useTranslation('logs');

// Option 2: Array syntax (loads multiple namespaces)
const { t } = useTranslation(['home', 'common']);
```

### Translation Key Resolution

Keys are resolved relative to the namespace:
```tsx
useTranslation('home')
t('welcome.checklist_button') // Looks in home.json → welcome.checklist_button
t('nav_title')                 // Looks in home.json → nav_title

useTranslation('common')
t('loading')                   // Looks in common.json → loading
```

## Adding i18n to a New Module

### Step 1: Create Locale JSON Files

Create namespace files in both language directories:

**frontend/public/locales/en/myModule.json**
```json
{
  "section": {
    "title": "My Section",
    "description": "This is a description",
    "button_action": "Click {{count}} times",
    "empty_state": "No items yet"
  }
}
```

**frontend/public/locales/zh-CN/myModule.json**
```json
{
  "section": {
    "title": "我的节",
    "description": "这是一个描述",
    "button_action": "点击 {{count}} 次",
    "empty_state": "暂无项目"
  }
}
```

> **CRITICAL**: The `zh-CN` file must have the **exact same key structure** as `en`. Missing or extra keys will cause `pnpm i18n:check` to fail.

### Step 2: Update Test Provider (if applicable)

If your module has integration tests, create an i18n provider:

**frontend/src/tests/myModuleI18n.ts**
```typescript
import myModule from '../../public/locales/en/myModule.json';

export const myModuleI18nProviderProps = {
  i18nLanguage: 'en',
  i18nResources: {
    en: {
      myModule,
    },
  },
};
```

### Step 3: Use in Components

```tsx
import { useTranslation } from 'react-i18next';

function MyModuleComponent() {
  const { t } = useTranslation('myModule');

  return (
    <div>
      <h1>{t('section.title')}</h1>
      <p>{t('section.description')}</p>
      <button>{t('section.button_action', { count: 5 })}</button>
    </div>
  );
}
```

### Step 4: Add i18n Test Coverage (if applicable)

Update test files to use the i18n provider. See existing test patterns in `src/tests/`.

### Step 5: Validate

Run the i18n validation before opening a PR:

```bash
cd frontend
pnpm i18n:check
```

This ensures:
- All namespaces exist in both languages
- All keys match between fallback (en) and target languages
- No extra or missing keys

## Language Configuration

### Supported Languages

Defined in `frontend/src/ReactI18/i18n.config.json`:

```json
{
  "defaultLanguage": "en",
  "fallbackLanguage": "en",
  "queryStringKey": "lng",
  "storageKey": "i18nextLng",
  "languages": [
    {
      "code": "en",
      "label": "English",
      "selectable": true,
      "aliases": ["en-US", "en-AU", "en-CA"]
    },
    {
      "code": "zh-CN",
      "label": "简体中文",
      "selectable": true,
      "aliases": ["zh", "zh-CN", "zh-Hans", "zh-Hans-CN"]
    }
  ]
}
```

### Language Detection Priority

The system detects language in this order:
1. URL query parameter (`?lng=zh-CN`)
2. localStorage (`i18nextLng` key)
3. Browser language preferences (`navigator.languages`)
4. Browser default language (`navigator.language`)
5. HTML document language (`document.documentElement.lang`)
6. Fallback to default language (`en`)

### Adding a New Language

To add a new language (e.g., `ja-JP` for Japanese):

1. Add to `i18n.config.json`:
```json
{
  "code": "ja-JP",
  "label": "日本語",
  "selectable": true,
  "aliases": ["ja", "ja-JP"]
}
```

2. Create locale directory: `frontend/public/locales/ja-JP/`

3. Copy all JSON files from `en/` and translate each value

4. Run validation: `pnpm i18n:check`

## Best Practices

### ✅ DO

1. **Use namespace closest to feature area**
   - Home page translations → `home.json`
   - Logs module translations → `logs.json`
   - Shared/common strings → `common.json`

2. **Use snake_case for keys**
   ```json
   {
     "create_new_dashboard": "Create New Dashboard",
     "max_lines_per_row": "Max lines per Row"
   }
   ```

3. **Use interpolation for dynamic content**
   ```json
   {
     "copied": "{{field}} copied to clipboard",
     "items_selected": "{{count}} items selected"
   }
   ```

4. **Run validation before PR**
   ```bash
   cd frontend && pnpm i18n:check
   ```

5. **Keep common.json truly common**
   - Only shared UI strings belong here
   - Feature-specific strings go in their namespace

6. **Use descriptive key names**
   ```json
   {
     "query_cancelled": "Query cancelled.",
     "query_cancelled_load_data": "Click \"Run Query\" to load data."
   }
   ```

7. **Handle plurals using count parameter**
   ```tsx
   t('items_count', { count: items.length })
   // "1 item" or "5 items" based on count
   ```

### ❌ DON'T

1. **Don't translate non-user-facing strings**
   - Service names: `"ClickHouse"`, `"Prometheus"`
   - Telemetry attribute names: `"status"`, `"trace_id"`
   - User input: search queries, filter values
   - Routes and API enums
   - PromQL, SQL queries
   - Analytics event values

2. **Don't hardcode user-facing text**
   ```tsx
   // ❌ Bad
   <Button>Save Changes</Button>

   // ✅ Good
   const { t } = useTranslation('common');
   <Button>{t('save_changes')}</Button>
   ```

3. **Don't create flat key structures**
   ```json
   // ❌ Bad - too flat
   { "home_checklist_button": "Let's get started!" }

   // ✅ Good - organized
   {
     "welcome": {
       "checklist_button": "Let's get started!"
     }
   }
   ```

4. **Don't skip Chinese translations**
   - If you add a key to `en/`, you MUST add it to `zh-CN/` (even if placeholder)

5. **Don't use inline translation functions**
   ```tsx
   // ❌ Bad
   <div>{t('title')}</div>

   // ✅ Good - for complex JSX
   const title = t('section.title');
   return <div>{title}</div>;
   ```

## Date and Number Formatting

For locale-aware formatting, use `i18nFormat.ts` utilities:

```tsx
import { formatDateTime, formatNumber, formatRelativeTime } from 'utils/i18nFormat';

// Format date/time
formatDateTime(timestamp, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
});

// Format number
formatNumber(1234567.89, {
  style: 'decimal',
  minimumFractionDigits: 2
}); // "1,234,567.89"

// Format relative time
formatRelativeTime(-5, 'minute'); // "5 minutes ago"
```

These utilities automatically use the current locale.

## Testing i18n

### Test Setup

Use test utilities from `src/ReactI18/testUtils.ts`:

```tsx
import { createTestI18nInstance } from 'ReactI18/testUtils';

const i18n = createTestI18nInstance({
  language: 'en',
  resources: {
    en: {
      home: homeTranslations,
      common: commonTranslations,
    }
  }
});
```

### Module Test Providers

For module tests, use the pre-configured provider:

```tsx
import { myModuleI18nProviderProps } from 'tests/myModuleI18n';

// In test setup
render(<MyComponent />, {
  wrapper: ({ children }) => (
    <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
  ),
  ...myModuleI18nProviderProps
});
```

## Validation

### i18n Check Script

The `check-i18n.mjs` script validates:

1. ✅ All namespaces exist in both `en` and `zh-CN`
2. ✅ All keys in `en` exist in `zh-CN` (no missing translations)
3. ✅ `zh-CN` has no extra keys not in `en`
4. ✅ Language configuration is valid

### Running Validation

```bash
# From frontend/ directory
pnpm i18n:check

# Run tests
pnpm i18n:check:test
```

### Expected Output

```
i18n check passed. Checked 1 target locale(s).
```

If validation fails:
```
i18n check failed with 3 issue(s):
- zh-CN/home: missing key "section.new_key"
- zh-CN/logs: extra key "section.removed_key"
- zh-CN: extra namespace "old_module"

Exit code 1
```

## Advanced Patterns

### Conditional Translation Loading

For large modules, translations are loaded on-demand via HTTP backend:
```
GET /locales/en/home.json?h=<hash>
```

Cache busting is handled automatically via `i18n-translations-hash.json`.

### Ant Design and Third-Party Libraries

The `LocaleProvider` (`src/providers/LocaleProvider/index.tsx`) handles:
- **Ant Design** locale (en_US, zh_CN)
- **Day.js** locale for date formatting

This is automatically applied at the app root level.

### Using with Suspense

```tsx
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

function TranslatedComponent() {
  const { t } = useTranslation('home');
  return <div>{t('title')}</div>;
}

// Wrap with Suspense for code-split namespaces
<Suspense fallback={<div>Loading...</div>}>
  <TranslatedComponent />
</Suspense>
```

## Common Issues and Solutions

### Issue: "Key not found" in production
**Cause**: Translation file not loaded
**Solution**: Check network tab for failed `/locales/en/*.json` requests

### Issue: Chinese shows English text
**Cause**: Missing key in `zh-CN` JSON
**Solution**: Add the missing key or run `pnpm i18n:check`

### Issue: Interpolation not working
**Cause**: Wrong variable name in `t()` call
**Solution**: Ensure variable names match exactly:
```tsx
t('key', { myVar: 'value' })  // Uses {{myVar}} in JSON
```

### Issue: Language not changing
**Cause**: Browser cache or localStorage
**Solution**: Clear localStorage or use `?lng=en` query parameter

## Checklist for New Features

When adding i18n support to a new feature:

- [ ] Created namespace JSON file in `frontend/public/locales/en/`
- [ ] Created matching namespace JSON file in `frontend/public/locales/zh-CN/`
- [ ] Used `useTranslation('namespace')` in all components
- [ ] Replaced all hardcoded user-facing strings with `t()` calls
- [ ] Used snake_case keys with logical grouping
- [ ] Added interpolation for dynamic content (`{{variable}}`)
- [ ] Did NOT translate service names, attribute names, or user input
- [ ] Created test provider in `src/tests/` (if applicable)
- [ ] Added test coverage for i18n (if applicable)
- [ ] Ran `pnpm i18n:check` - passed with no errors
- [ ] Verified translations display correctly in both languages

## Reference

### Translation Key Patterns

Common patterns used throughout the codebase:

```json
{
  // Actions
  "save": "Save",
  "cancel": "Cancel",
  "submit": "Submit",
  "reset": "Reset",
  "edit": "Edit",
  "delete": "Delete",
  "create": "Create",
  "add": "Add",
  "remove": "Remove",
  "close": "Close",

  // States
  "loading": "Loading...",
  "success": "Success",
  "error": "Error",
  "empty": "No data",
  "not_found": "Not found",

  // Confirmation dialogs
  "confirm_delete_title": "Delete Item?",
  "confirm_delete_content": "Are you sure you want to delete this item?",
  "confirm_save_title": "Save Changes",
  "confirm_save_content": "Your changes will be saved.",

  // Empty states
  "empty_title": "No items yet",
  "empty_description": "Create your first item to get started",

  // Errors
  "something_went_wrong": "Something went wrong",
  "unexpected_error": "An unexpected error occurred",

  // Time
  "loading": "Loading...",
  "last_updated": "Last updated: {{time}}",
  "time_ago": "{{time}} ago"
}
```

### File Naming Conventions

- Locale files: `{namespace}.json` (e.g., `logs.json`, `home.json`)
- Test providers: `{module}I18n.ts` (e.g., `logsI18n.ts`)
- Use kebab-case for namespaces: `infra-monitoring.json` not `infraMonitoring.json`

### Namespace Recommendations

- Keep namespaces **small and focused**
- Split large namespaces into logical sections
- Use `common.json` for truly shared strings
- Create feature-specific namespaces for complex modules

## Resources

- **i18next Docs**: https://www.i18next.com/
- **react-i18next Docs**: https://react.i18next.com/
- **Translation Check Script**: `frontend/scripts/check-i18n.mjs`
- **Config File**: `frontend/src/ReactI18/i18n.config.json`
- **Format Utilities**: `frontend/src/utils/i18nFormat.ts`
