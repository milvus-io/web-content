# AliasDesc

This class represents the metadata of a collection alias. It is returned by calling `Desc()` on a `DescribeAliasResponse` object.

**METHODS:**

- `const std::string& Name() const`

      Name of the alias.

- `const std::string& DatabaseName() const`

      Name of the database the alias belongs to.

- `const std::string& CollectionName() const`

      Name of the collection this alias points to.

## Example

