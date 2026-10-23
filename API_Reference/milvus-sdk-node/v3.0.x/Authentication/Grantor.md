# Grantor

Describes who granted a privilege and which privilege was granted.

```typescript
export type Grantor = { user: User; privilege: PrivilegeEntity };
```

**FIELDS:**

- **user** (***[User](User.md)***) -

    The grantor. See [User](User.md).

- **privilege** (***[PrivilegeEntity](PrivilegeEntity.md)***) -

    The granted privilege. See [PrivilegeEntity](PrivilegeEntity.md).
