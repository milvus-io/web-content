# UserDesc

This class represents the metadata of a Milvus user. It is returned by calling `Desc()` on a `DescribeUserResponse`.

**METHODS:**

- `const std::string& Name() const`

    The username.

- `const std::vector<std::string>& Roles() const`

    List of role names assigned to the user.

## Example

