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

- **role** (**[RoleEntity](RoleEntity.md)**) -

    The role the privilege is granted to. See [RoleEntity](RoleEntity.md).

- **object** (*ObjectEntity*) -

    The protected object type.

    - **name** (*RbacObjects*) -

        The object type (an `RbacObjects` value, e.g. `Collection`, `Global`, `User`).

- **object_name** (*string*) -

    The name of the object the privilege applies to.

- **grantor** (*Grantor*) -

    Who granted the privilege.

    - **user** (**[User](User.md)**) -

        The grantor. See [User](User.md).

    - **privilege** (**[PrivilegeEntity](PrivilegeEntity.md)**) -

        The granted privilege. See [PrivilegeEntity](PrivilegeEntity.md).

- **db_name** (*string*) -

    The database the object belongs to.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const res = await milvusClient.listGrants({
    roleName: 'exampleRole',
});

console.log(res.entities); // GrantEntity[]
```
