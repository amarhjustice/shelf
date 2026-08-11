# Shelf Database

## Overview

This README documents the PostgreSQL database structure currently created for **Shelf**, a digital reading and resource platform.

The database is designed around:

- User authentication and account security
- A reusable resource/catalog architecture
- Books and future resource types
- EPUB and PDF file references
- Authors and multiple contributor roles
- Genres, languages, and reusable topics
- Account-based access so users can access their resources from any device
- A security-conscious backend architecture

> **Current file formats:** EPUB and PDF  
> **Future consideration:** Audio, but audio functionality is not part of the current implementation.

---

# 1. Database

**Database:** PostgreSQL  
**Schema:** `public`

Current tables:

```text
authors
books
email_verification_tokens
genres
languages
password_reset_tokens
resource_authors
resource_files
resource_topics
resources
topics
user_sessions
users
```

Total: **13 tables**

---

# 2. Authentication Tables

## `users`

Stores Shelf user accounts.

| Column | Type | Notes |
|---|---|---|
| `user_id` | bigint | Primary key |
| `full_name` | varchar(150) | Required |
| `email` | varchar(255) | Required, unique |
| `password_hash` | text | Required; stores a hash, not the plaintext password |
| `email_verified` | boolean | Defaults to `false` |
| `created_at` | timestamptz | Creation time |
| `updated_at` | timestamptz | Last update |

Indexes/constraints:

- Primary key: `user_id`
- Unique constraint: `email`

### Registration

Shelf registration currently uses:

- Full name
- Gmail/email address
- Password

Email verification is required for account security.

Passwords must be hashed in the backend before being stored.

---

## `email_verification_tokens`

Stores tokens used to verify a user's email address.

Relationship:

```text
users
  │
  └── email_verification_tokens
```

---

## `password_reset_tokens`

Stores tokens used for password-reset functionality.

Relationship:

```text
users
  │
  └── password_reset_tokens
```

Password-reset tokens should be securely generated, short-lived, single-use, and stored safely.

---

## `user_sessions`

Stores authenticated user sessions.

The session identifies the authenticated user, but it is **not** intended to be used as a permanent book/file authorization token.

The security architecture is:

```text
Session
   ↓
Identify user
   ↓
Check resource access
   ↓
Authorize file access
   ↓
Temporary/signed file access
```

---

# 3. Catalog Structure

Shelf uses a central `resources` table.

The key principle is:

```text
Resource
   │
   ├── Book-specific data
   ├── Digital files
   ├── Authors
   └── Topics
```

This allows different kinds of Shelf resources to share common metadata.

At the moment, **Past Questions is being treated as a genre/category**, rather than creating a separate `resource_type` column.

Example:

```text
Genres
├── Fiction
├── Philosophy
├── Past Questions
├── Mathematics
└── Science
```

A past-question resource can still have specialized information later without changing the overall resource/file architecture.

---

# 4. `resources`

Stores information common to Shelf resources.

| Column | Type | Notes |
|---|---|---|
| `resource_id` | bigint | Primary key |
| `title` | varchar(255) | Required |
| `genre_id` | bigint | FK → `genres` |
| `language_id` | bigint | FK → `languages` |
| `synopsis` | text | Optional |
| `license_type` | varchar(100) | Required |
| `access_type` | varchar(20) | `FREE` or `PAID` |
| `price` | numeric(10,2) | Defaults to `0.00` |
| `currency` | varchar(3) | Defaults to `GHS` |
| `cover_image_url` | text | Optional |
| `cover_public_id` | varchar(255) | Optional; for Cloudinary |
| `created_at` | timestamptz | Creation time |
| `updated_at` | timestamptz | Last update |

Constraints:

```text
access_type ∈ {FREE, PAID}
price >= 0
```

Foreign keys:

```text
resources.genre_id
    → genres.genre_id

resources.language_id
    → languages.language_id
```

The actual EPUB/PDF files are **not stored in this table**.

---

# 5. `books`

Stores information specifically related to books.

| Column | Type | Notes |
|---|---|---|
| `resource_id` | bigint | PK + FK → `resources` |
| `number_of_pages` | integer | Required, must be > 0 |
| `isbn` | varchar(17) | Optional |
| `featured_quote` | text | Optional |
| `created_at` | timestamptz | Creation time |
| `updated_at` | timestamptz | Last update |

The `featured_quote` is optional because not every resource will have a meaningful quotation. For example, a past-question resource may not have one.

The `resource_id` being both the primary key and foreign key creates a one-to-one relationship:

```text
resources
    │
    └── books
```

Common book information such as title, genre, language, synopsis, price, and cover remains in `resources`.

---

# 6. Authors

## `authors`

Stores author/contributor profiles.

| Column | Type | Notes |
|---|---|---|
| `author_id` | bigint | Primary key |
| `name` | varchar(255) | Required |
| `bio` | text | Optional |
| `created_at` | timestamptz | Creation time |
| `updated_at` | timestamptz | Last update |

The future admin web app will be responsible for managing authors.

The author profile can support the Shelf frontend's:

- About Author section
- Author biography
- More from this author

---

# 7. `resource_authors`

Junction table connecting resources and authors.

This supports multiple authors per resource and multiple resources per author.

| Column | Type | Notes |
|---|---|---|
| `resource_id` | bigint | FK → `resources` |
| `author_id` | bigint | FK → `authors` |
| `role` | varchar(30) | Contributor role |
| `created_at` | timestamptz | Creation time |

Primary key:

```text
(resource_id, author_id)
```

Allowed roles currently:

```text
AUTHOR
EDITOR
TRANSLATOR
COMPILER
```

We intentionally do not use `CO_AUTHOR` as a separate role. If multiple people are authors, they can all have the `AUTHOR` role.

Example:

```text
A resource
├── Person A → AUTHOR
├── Person B → AUTHOR
├── Person C → EDITOR
└── Person D → TRANSLATOR
```

---

# 8. Genres

## `genres`

Stores Shelf's reusable genres/categories.

| Column | Type | Notes |
|---|---|---|
| `genre_id` | bigint | Primary key |
| `name` | varchar(100) | Required, unique |
| `description` | text | Optional |
| `created_at` | timestamptz | Creation time |
| `updated_at` | timestamptz | Last update |

`name` has a unique constraint.

Current design intentionally allows categories such as:

```text
Fiction
Philosophy
Past Questions
Mathematics
Science
```

---

# 9. Languages

## `languages`

Stores languages used for resource classification and filtering.

| Column | Type | Notes |
|---|---|---|
| `language_id` | bigint | Primary key |
| `name` | varchar(100) | Required, unique |
| `code` | varchar(10) | Required, unique |
| `created_at` | timestamptz | Creation time |
| `updated_at` | timestamptz | Last update |

Both language name and code are unique.

The language system is intended to support frontend filtering.

---

# 10. Topics

## `topics`

Stores reusable topics that resources can cover.

Topics are created/managed by the admin.

The design avoids creating duplicate topics such as:

```text
Nature
nature
NATURE
```

The exact normalization/duplicate-handling logic will be enforced by the backend/database design when topic management is implemented.

---

# 11. `resource_topics`

Junction table connecting resources to topics.

| Column | Type | Notes |
|---|---|---|
| `resource_id` | bigint | FK → `resources` |
| `topic_id` | bigint | FK → `topics` |
| `created_at` | timestamptz | Creation time |

Primary key:

```text
(resource_id, topic_id)
```

This creates a many-to-many relationship:

```text
Resource
   ↕
resource_topics
   ↕
Topic
```

Example:

```text
Walden
├── Nature
├── Philosophy
├── Self-reliance
└── Simple Living
```

The same topic can be reused by many resources.

---

# 12. `resource_files`

Stores references/metadata for the actual digital files.

The actual files are **not stored inside PostgreSQL**.

| Column | Type | Notes |
|---|---|---|
| `file_id` | bigint | Primary key |
| `resource_id` | bigint | FK → `resources` |
| `storage_key` | text | Storage reference |
| `original_filename` | varchar(255) | Original uploaded filename |
| `format` | varchar(10) | Currently `EPUB` or `PDF` |
| `file_size` | bigint | File size in bytes |
| `created_at` | timestamptz | Creation time |
| `updated_at` | timestamptz | Last update |

Current allowed formats:

```text
EPUB
PDF
```

Audio is intentionally not implemented yet, but the architecture can be extended later.

Indexes:

- Primary key: `file_id`
- Index: `resource_id`
- Unique constraint: `storage_key`

Relationship:

```text
resources
    │
    └── resource_files
          ├── EPUB
          └── PDF
```

A Past Questions resource can also use `resource_files` because files belong to the **resource**, not specifically to the `books` table.

---

# 13. File Storage Architecture

The database stores file references, not the actual EPUB/PDF content.

Planned architecture:

```text
Shelf Backend
     │
     ├── PostgreSQL
     │      └── Metadata + storage references
     │
     ├── Cloudinary
     │      └── Book/resource cover images
     │
     └── Private Object Storage
            ├── EPUB
            └── PDF
```

The exact object-storage provider has not yet been finalized.

---

# 14. Shelf Reader

The Shelf frontend has already been designed around an **EPUB reader**.

Current priority:

```text
EPUB → Shelf Reader
```

PDF is supported as an additional resource format, but EPUB remains the primary reading format for the current Shelf experience.

Audio will be considered in a future update.

---

# 15. Access and Security Architecture

Security is being considered from the database design stage.

Important principles:

### Passwords

Passwords are never stored as plaintext.

```text
User password
     ↓
Backend hashing
     ↓
password_hash
     ↓
PostgreSQL
```

### Authentication

The user's session establishes their identity.

```text
Session
   ↓
Authenticated User
```

### Resource authorization

Being authenticated does not automatically mean the user can access every paid resource.

The backend will check:

```text
Is the user authenticated?
        ↓
Does the resource exist?
        ↓
Is the resource free?
        ↓
If paid:
Does the user have access/purchase rights?
        ↓
Allow or deny
```

### File authorization

The session token should not be treated as a permanent file URL/token.

Instead:

```text
Session
   ↓
Identify user
   ↓
Check resource authorization
   ↓
Issue controlled/temporary file access
   ↓
Private EPUB/PDF
```

Object-storage credentials must never be exposed to the frontend.

---

# 16. Account-Based Library

Shelf users will have their resources associated with their **account**, not with a specific device.

For example:

```text
User Account
     │
     ▼
My Books
     │
 ┌───┼────┐
 ▼   ▼    ▼
PC  Phone Tablet
```

If a user purchases a book on a laptop and later logs in on another device, the book remains available to that account.

The database will therefore associate ownership/access with:

```text
user_id + resource_id
```

rather than with a device.

---

# 17. Offline Reading

Offline reading is intended to work differently from ownership.

The account owns the access:

```text
Account
   ↓
Resource access
```

while the offline copy/cache is device-specific:

```text
Account
 ├── Laptop → local offline copy
 ├── Phone  → local offline copy
 └── Tablet → local offline copy
```

This means a user can log into another device, see their accessible resources, and make a book available offline on that device.

The detailed offline implementation will be built later.

---

# 18. Planned Features Not Yet Built

The following are intentionally left for later development:

- User resource/library table (`My Books`)
- Purchases/payment records
- Reading progress
- EPUB reading position synchronization
- Bookmarks
- Favorites
- Offline-download/cache management
- User ratings
- Rating aggregation
- Publication date
- Publisher
- More from this author
- Admin web application
- Secure file upload system
- Object-storage implementation
- Detailed file authorization
- Audio resources
- Additional Past Questions-specific fields

---

# 19. Current Database Relationship Map

```text
                         users
                           │
             ┌─────────────┼──────────────┐
             ▼             ▼              ▼
      user_sessions   email_verification  password_reset
                                          tokens

                         resources
              ┌────────────┼───────────────┐
              │            │               │
              ▼            ▼               ▼
           books     resource_files   resource_authors
                                           │
                                           ▼
                                         authors

              │
              ▼
        resource_topics
              │
              ▼
            topics

              │
       ┌──────┴──────┐
       ▼             ▼
    genres        languages
```

---

# 20. Design Principles

The current Shelf database follows these principles:

1. **Keep common resource data in `resources`.**
2. **Keep book-specific data in `books`.**
3. **Keep actual digital files outside PostgreSQL.**
4. **Use `resource_files` for EPUB/PDF references.**
5. **Use junction tables for many-to-many relationships.**
6. **Allow multiple authors/contributors per resource.**
7. **Use reusable topics rather than storing topic names repeatedly.**
8. **Use languages for catalog filtering.**
9. **Treat Past Questions as a genre/category for the current Shelf design.**
10. **Keep account ownership separate from device-specific offline storage.**
11. **Never trust frontend-only authorization.**
12. **Keep authentication and resource/file authorization as separate security layers.**
13. **Design for future expansion without implementing unnecessary features prematurely.**

---

# Current Status

The database foundation currently contains **13 PostgreSQL tables** and the core catalog architecture is established.

The next database features can be added incrementally without redesigning the existing foundation.
