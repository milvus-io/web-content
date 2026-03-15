# drop_resource_group()

This operation drops a resource group. 

## Request Syntax

```python
drop_resource_group(
    name: str,
    using: str,
    timeout: float | None
)
```

**PARAMETERS:**

- **name** (*str*) -

    **[REQUIRED]**

    The name of the resource group to drop.

- **using** (*str*) - 

    The alias of the employed connection.

    The default value is **default**, indicating that this operation employs the default connection.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import connections, utility

# Connect to localhost:19530
connections.connect()

# Create a new resource group
utility.create_resource_group(
    name="rg_01",
    using="default"
)

# Drop the created resource group
utility.drop_resource_group(
    name="rg_01",
    using="default"
)
```

## Related operations

The following operations are related to `drop_resource_group()`:

- [create_resource_group()](https://zilliverse.feishu.cn/docx/X5qsdhFQ5oOhkcxOprzcOZq4nMc)

- [describe_resource_group()](https://zilliverse.feishu.cn/docx/HScCdxLNJotPCcxb4AZcxsNJn9c)

- [list_resource_groups()](https://zilliverse.feishu.cn/docx/FXTZd5FgNo9ta0xvjaIclEM1nPf)

- [transfer_node()](https://zilliverse.feishu.cn/docx/QHcpd1aJzo5aYbxJtMXc58een4f)

- [transfer_replica()](https://zilliverse.feishu.cn/docx/SuePdciB0o4du5xtpIhcMVyYnPb)

