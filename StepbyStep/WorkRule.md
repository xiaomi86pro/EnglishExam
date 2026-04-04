# AI Working Rules — Exam System Project

> Purpose: give Codex / IDE agents the **architectural and workflow rules already frozen in ChatGPT discussions**.
> DB schema and full RPC descriptions are intentionally excluded because they are maintained separately.

---

# 1) Core Delivery Workflow (MANDATORY)

All feature work must follow this sequence unless explicitly overridden:

```text
DB schema -> RPC contract -> exact types -> mapper -> hook -> domain/UI
```

## Execution requirements

* Never jump directly to UI before **types are frozen**.
* Mapper layer must be written **before hooks and domain components**.
* Hooks consume mapper outputs, not raw DB rows.
* Domain/UI must consume **domain-safe view models**, never DB-shaped objects.

---

# 2) Layering Contract (STRICT)

## Canonical layers

```text
Database / RPC
-> types
-> lib/mappers
-> hooks
-> components/domain
-> app routes
```

## Forbidden leaks

* `components/domain` MUST NOT import from DB types directly.
* `components/domain` MUST NOT depend on adapter internals unless explicitly designated.
* UI primitives MUST NOT know business logic.
* `app/` pages should orchestrate containers, not embed business logic.

## Safe dependency direction

```text
ui/input -> ui/form -> domain components
```

This direction is frozen.

---

# 3) Project Structure Rules (FROZEN)

## App structure

```text
app/
  (auth)/
  (dashboard)/
```

## Shared architecture

```text
components/ui
components/domain
lib/mappers
lib/adapters
hooks
types
styles
```

## Domain grouping

All domain components must be grouped by module:

```text
components/domain/question
components/domain/exam
components/domain/template
components/domain/passage
components/domain/badges
components/domain/auth
```

---

# 4) Naming Rules (FROZEN)

## File naming

* Always use **kebab-case**.

## Component naming pattern

```text
<domain>-<feature>-<type>.tsx
```

Examples:

* `question-form-container.tsx`
* `question-list-toolbar.tsx`
* `exam-result-card.tsx`

## Approved suffixes

Use only these semantic suffixes when relevant:

* `container`
* `view`
* `item`
* `card`
* `form`
* `editor`
* `table`
* `toolbar`
* `badge`

## Forbidden vague suffixes

Avoid:

* `preview`
* `data`
* `manager`

## Mapper naming

```text
<domain>.mapper.ts
```

## Hook naming

```text
use-<feature>.ts
```

---

# 5) Types Split Rules (STRICT)

Question module type split is frozen:

```text
types/question/
  question.db.ts
  question.rpc.ts
  question.form.ts
  question.domain.ts
```

## Meaning

* `*.db.ts` = raw database row shapes
* `*.rpc.ts` = RPC input/output contracts
* `*.form.ts` = form state and validation shapes
* `*.domain.ts` = UI-safe and business-safe models

Never merge these concerns.

---

# 6) Form Architecture Rule (VERY IMPORTANT)

Project standard = **Pattern A custom form system**.

## Frozen form structure

```text
components/ui/form/
  form.tsx
  form-field.tsx
  field-label.tsx
  field-error.tsx
  field-helper.tsx
  field-group.tsx
  form-section.tsx
```

## Critical composition rule

Use **Composition Pattern only**.

### Forbidden

Do NOT design prop-based wrappers like:

```tsx
<Input label="..." error="..." helperText="..." />
```

### Required

Use composition style:

```tsx
<FormField>
  <FieldLabel />
  <Input />
  <FieldError />
</FormField>
```

This is a frozen architectural decision.

---

# 7) Styling & Utility Rules

## Class merging

Always use shared utility:

```ts
import { cn } from '@/lib/utils'
```

## Design system

Use CSS variables / tokens from:

```text
@/styles/global.css
```

Avoid inline style drift.

---

# 8) Authorization / App Runtime Rules

## Auth model

* Authorization is **DB-driven role-based**.
* Use `profiles` + `rpc_assert_min_role`.
* Do NOT use JWT app_metadata role logic.

## Middleware / proxy behavior

* Middleware layer only checks **authentication/session existence**.
* Role checks belong to DB RPCs.
* Do not reintroduce service-role shortcuts.

---

# 9) Domain Implementation Rules

When building domain components:

* First inspect existing related:

  * ui components
  * mapper
  * types
  * hooks
* Reuse current abstractions before creating new files.
* Preserve module boundaries.

## Existing question flow references

Current source-of-truth files:

```text
components/domain/question/question-form-container.tsx
components/domain/question/question-editor.tsx
lib/domain/question/question-form-view.tsx
lib/adapters/question/question-form.adapter.ts
hooks/mutations/use-create-question.ts
```

Any new question feature must align with this chain.

---

# 10) Assumption Control Rule

If any implementation detail is unclear:

* explicitly state assumptions
* prefer asking for exact existing file content
* do not invent missing abstractions when a nearby layer may already exist

This rule is critical for avoiding architecture drift.

---

# 11) Preferred AI Agent Behavior (for Codex)

When editing code:

1. inspect nearest existing file in same domain
2. preserve naming conventions
3. preserve frozen type split
4. do not collapse layers for convenience
5. generate **minimal exact diff only**
6. prefer extending current containers/views over parallel abstractions

## High-risk anti-patterns to avoid

* importing DB types into domain UI
* bypassing mapper layer
* mixing form state and RPC DTOs
* creating duplicate container/view files
* introducing alternative naming schemes
* prop-based form wrappers

---

# 12) Decision Priority Rule

When conflicts happen, resolve by this priority:

```text
Frozen architecture rule
> current real project tree
> existing file conventions
> new convenience abstraction
```

Never violate frozen architecture for short-term speed.
