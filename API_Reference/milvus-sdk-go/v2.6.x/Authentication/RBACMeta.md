# RBACMeta

A full snapshot of RBAC metadata including users, roles, grants, and privilege groups. Used with BackupRBAC/RestoreRBAC.

```go
type RBACMeta struct {
    Users []*UserInfo
    Roles []*Role
    RoleGrants []*RoleGrants
    PrivilegeGroups []*PrivilegeGroup
}
```

**FIELDS:**

- **Users** (*[]*UserInfo*)

    The users.

- **Roles** (*[]*Role*)

    The list of assigned roles.

- **RoleGrants** (*[]*RoleGrants*)

    The role grants.

- **PrivilegeGroups** (*[]*PrivilegeGroup*)

    The privilege groups.