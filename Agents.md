# AGENTS.md

## Project Stack
- Next.js App Router
- TypeScript (strict)
- Supabase SSR
- Tailwind CSS
- Custom UI form system (not shadcn)
- No API layer
- No service-role layer

---

## Architecture Laws (STRICT)
These are non-negotiable ownership boundaries.

- mapper owns: DB row -> domain model
- mapper owns: RPC row normalization
- adapter owns: form payload -> RPC payload
- hook owns: business action orchestration
- container owns: UI state
- presentational component owns: UI formatting primitive
- page.tsx must remain a thin route wrapper only

Never move logic across these ownership boundaries unless explicitly requested.

---

## Feature Workflow Order
When implementing a new feature or refactor, preserve this order:

1. DB schema / RPC contract
2. precise types
3. mapper
4. adapter (if form mutation exists)
5. hook
6. domain container
7. presenter / presentational UI
8. route integration

Do not skip forward if previous layer contracts are unclear.

---

## Anti-Assumption Rule
If an existing related file may already define:
- types
- mappers
- adapters
- hooks
- shared UI contracts
- route patterns

ALWAYS inspect existing files first.

Do not invent parallel abstractions.
Do not duplicate existing domain patterns.
Prefer extending the current successful pattern.

If information is missing, explicitly state assumptions before editing.

---

## Current Proven UI Patterns
### List architecture (must reuse)
For list modules, preserve this proven structure:

- container owns filter/sort/pagination/query/viewMode
- presenter routes table/card rendering
- leaf table/card components stay pure
- shared selection hook remains generic and cross-view

Reuse this pattern for future list/update/delete modules.

---

## Naming Conventions
### File names
- kebab-case only

### Component suffixes
Use only:
- container
- view
- item
- card
- form
- editor
- table
- toolbar
- badge

Avoid vague names:
- manager
- preview
- data

### Mapper
- `<domain>.mapper.ts`

### Hook
- `use-<feature>.ts`

### Types split
For question domain, preserve:
- question.db.ts
- question.rpc.ts
- question.form.ts
- question.domain.ts

---

## UI/Form Rules
- Use shared `cn` from `@/lib/utils`
- Use design tokens from global CSS variables
- Form system uses custom wrappers under `components/ui/form`
- Keep FormField contract stable:
  - label
  - required
  - error
  - helperText
  - children

Do not introduce shadcn form primitives.

---

## Route Rules
- App Router only
- route page must stay thin
- container handles orchestration
- no business logic inside route page
- prefer existing dashboard route grouping

---

## Validation Before Finish
Before completing any task, prefer running:

- lint
- type-check
- build (if route or types changed)

Prioritize type integrity over broad refactors.

---

## Scope Discipline
Modify only files directly related to the requested feature scope.

Avoid unrelated “cleanup refactors”.
Avoid renaming stable architecture files unless explicitly requested.