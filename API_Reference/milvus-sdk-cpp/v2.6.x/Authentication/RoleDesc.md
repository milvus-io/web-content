# RoleDesc

This page documents both `RoleDesc` and `GrantItem`. `RoleDesc` represents the metadata of a Milvus role and its associated privileges. It is returned by calling `Desc()` on a `DescribeRoleResponse`. Each privilege entry is a `GrantItem` struct.

## RoleDesc

**Methods:**

- `const std::string& Name() const`

      Name of the role.

- `const std::vector<GrantItem>& GrantItems() const`

      List of privilege grants assigned to this role. Each entry is a GrantItem struct (see below).

## GrantItem

`GrantItem` is a plain struct that describes a single privilege grant.

## Example

