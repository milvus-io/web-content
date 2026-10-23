# GrantEntity

Describes one privilege grant: which privilege on which object is granted to which role, and by whom.

```typescript
export type GrantEntity = {
  role: RoleEntity;
  object: ObjectEntity;
  object_name: string;
  grantor: Grantor;
  db_name: string;
};
```

**FIELDS:**

- **role** (*[RoleEntity](RoleEntity.md)*) -

    The role the privilege is granted to. See [RoleEntity](RoleEntity.md).

- **object** (*[ObjectEntity](ObjectEntity.md)*) -

    The protected object type. See [ObjectEntity](ObjectEntity.md).

- **object_name** (*string*) -

    The name of the object the privilege applies to.

- **grantor** (*[Grantor](Grantor.md)*) -

    Who granted the privilege. See [Grantor](Grantor.md).

- **db_name** (*string*) -

    The database the object belongs to.
