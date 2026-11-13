# prepare_index_params()

This operation prepares index parameters to build indexes for a specific collection.

## Request Syntax

```python
pymilvus.MilvusClient.prepare_index_params(field_name: str = "") -> IndexParams
```

**PARAMETERS:**

- **field_name** (*str*) -
Default: `""`
The name of the field on which to build the index. When omitted, you add the field name later through the returned `IndexParams.add_index()`.

**RETURN TYPE:**

*IndexParams*

**RETURNS:**

An **IndexParams** contains a list of **IndexParam** objects.

- **IndexParams**

    A list of **IndexParam** objects.

```text
    ├── IndexParams 
    │       └── add_index()
    ```

    It offers the **[add_index()](add_index.md)** method to add indexes to the list.

**EXCEPTIONS:**

None

## Example

```python
from pymilvus import MilvusClient

index_params = MilvusClient.prepare_index_params()
```

- [add_index()](add_index.md)

- [create_index()](create_index.md)

- [describe_index()](describe_index.md)

- [drop_index()](drop_index.md)

- [list_indexes()](list_indexes.md)

