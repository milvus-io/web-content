# is_exist()

This operation checks whether the current role exists.

## Request Syntax

```python
is_exist()
```

**PARAMETERS:**

N/A

**RETURN TYPE:**

*bool*

**RETURNS:**

A boolean value indicating whether the current role exists or not

**EXCEPTIONS:**

*None*

## Examples

```python
from pymilvus import Role, utility

# Get a role
role = Role(name="test")

# Check whether the role exists
role.is_exist()
```

## Related operations

The following operations are related to `is_exist()`:

- [add_user()](https://zilliverse.feishu.cn/docx/W7GJdpYrYoYhSaxW6uzcVAZinYf)

- [create()](https://zilliverse.feishu.cn/docx/G3h4d3jx6oXFHBxFZlyc9jLKnTO)

- [drop()](https://zilliverse.feishu.cn/docx/KEzNdJPoDoHOjlx2FC8cNcHqngg)

- [get_users()](https://zilliverse.feishu.cn/docx/CCOhd671iog6rRxu8aOcaPncnLK)

- [grant()](https://zilliverse.feishu.cn/docx/BapSdVXjQoQXnbxnRYScCagAn1f)

- [list_grant()](https://zilliverse.feishu.cn/docx/JXNXdQuwhoYmZQxSohNcdxtwnzh)

- [list_grants()](https://zilliverse.feishu.cn/docx/YRoGdgQmWoIEaJx84ICcHTILnMe)

- [remove_user()](https://zilliverse.feishu.cn/docx/SlmSdaD7rocMJsxThNHcOtEknVd)

- [revoke()](https://zilliverse.feishu.cn/docx/UUJWdoEnjoXx69xahsScdMVSnzf)

