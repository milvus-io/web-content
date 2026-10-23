# PrivelegeGroup

Describes a privilege group: a named set of privileges. (The type name is spelled as-is in the SDK source.)

```typescript
export type PrivelegeGroup = {
  group_name: string; // name
  privileges: PrivilegeEntity[]; // privileges
};
```

**FIELDS:**

- **group_name** (*string*) -

    The privilege group name.

- **privileges** (**[PrivilegeEntity](PrivilegeEntity.md)[]**) -

    The privileges contained in the group. See [PrivilegeEntity](PrivilegeEntity.md).
