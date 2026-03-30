# 00_Master_Playbook.md (v2)

## 0. PURPOSE

This document defines the **single source of truth** for how to work with ChatGPT/Codex in this project.
All rules below are **mandatory unless explicitly overridden**.

---

# 1. GOVERNANCE RULES

## 1.1 Single Source of Truth

* Only maintain rules in this file.
* Do NOT create additional rule files unless absolutely necessary.

## 1.2 Change Management

* Every change must:

  * Update this file
  * Add a changelog entry (date + reason)

## 1.3 AI Prompt Discipline

Every request to AI MUST include:

1. Scope (single feature only)
2. Allowed files to modify
3. Required rules from this playbook
4. Expected output
5. Verification command/checklist

---

# 2. ARCHITECTURE OVERVIEW

## 2.1 Layered Architecture (STRICT)

Data Flow (MANDATORY):

DB (raw)
↓
RPC / Query
↓
Mapper (transform → domain model)
↓
Hook (state + orchestration)
↓
Domain Component
↓
UI primitives

### Rules

* NEVER skip mapper
* NEVER pass raw DB data to UI
* NEVER call RPC inside UI components

---

## 2.2 Folder Structure

* components/ui/* → pure UI primitives
* components/domain/* → domain-specific UI
* hooks/* → business logic + orchestration
* mappers/* → data transformation

### Rules

* hooks/ is at project root (NOT inside components)
* mappers/ is separate from UI and hooks

---

# 3. UI SYSTEM RULES

## 3.1 UI Primitive Rules

* No business logic
* No data fetching
* No dependency on external business logic

## 3.2 Form System (Pattern A - REQUIRED)

Structure:

* form-field.tsx
* field-label.tsx
* field-error.tsx
* field-helper.tsx
* field-group.tsx
* form-section.tsx

### Rules

* Use composition pattern only
* DO NOT use prop-based form API (label/error/helperText directly on inputs)

---

## 3.3 Domain Components

* Use UI primitives only
* Receive processed data (from hook)
* No direct DB/RPC interaction

---

# 4. HOOKS RULES

## 4.1 Responsibilities

* Call RPC / data layer
* Use mapper
* Manage state
* Handle errors

## 4.2 Restrictions

* No UI rendering
* No direct DOM usage

---

# 5. MAPPER RULES

## 5.1 Responsibilities

* Transform raw DB → domain model
* Normalize null/optional fields

## 5.2 Rules

* MUST exist for every entity
* MUST NOT throw errors
* MUST return safe defaults

---

# 6. NAMING CONVENTION (MANDATORY)

## 6.1 Hooks

* use<Entity><Action>

Examples:

* useQuestionList
* useQuestionDetail
* useCreateQuestion

## 6.2 Mapper

* map<Entity>FromDB
* map<Entity>ToPayload

## 6.3 Types

* Entity (domain)
* EntityDTO (DB)
* EntityFormValues (form)

---

# 7. SERVER vs CLIENT (Next.js)

## 7.1 Rules

* Prefer Server Components for data fetching
* Pass data via props to Client Components
* Use hooks ONLY for:

  * interactive state
  * client-side updates

## 7.2 Restrictions

* Avoid duplicate fetching
* Avoid calling RPC directly in client unless necessary

---

# 8. ERROR HANDLING

## 8.1 Mapper

* No throw
* Return safe fallback values

## 8.2 Hook

* Normalize error shape:

  * message
  * code

## 8.3 UI

* Display via field-error or UI feedback components
* NEVER consume raw RPC error

---

# 9. PERFORMANCE RULES

## 9.1 Data Fetching

* ALWAYS use pagination for list
* NEVER fetch full dataset

## 9.2 Database

* Ensure index exists for:

  * filtering
  * sorting

---

# 10. DEFINITION OF DONE (DoD)

A feature is DONE only if:

* Type contract complete
* Mapper implemented
* Hook implemented
* UI follows composition pattern
* No `any`
* Pass accessibility basics
* Follow layer boundaries
* Basic test (if test system exists)

---

# 11. LINT / ENFORCEMENT (OPTIONAL BUT RECOMMENDED)

Block:

* supabase.rpc inside components/domain/*
* any in UI/domain
* legacy form API usage

---

# 12. CHANGELOG

## 2026-03-30

* Added data flow contract
* Added naming convention
* Added server/client rules
* Added error handling standard
* Added performance rules
