# PrivilegeGroupInfo

This class represents a single privilege group, which is a named set of privileges that can be granted to a role as a unit. `ListPrivilegeGroupsResponse::Groups()` returns a `PrivilegeGroupInfos` value, which is a type alias for `std::vector<PrivilegeGroupInfo>`.

**METHODS:**

- `const std::string& Name() const`

    Name of the privilege group.

- `const std::vector<std::string>& Privileges() const`

    List of privilege names included in this group.

## Example

