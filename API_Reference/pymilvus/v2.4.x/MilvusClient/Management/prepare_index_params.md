# prepare_index_params()

This operation prepares index parameters to build indexes for a specific collection.

<div class="admonition note">

<p><b>notes</b></p>

<p>This is a class method. You should call this method like this: <code>MilvusClient.prepare_index_params()</code>.</p>

</div>

## Request syntax

```python
pymilvus.MilvusClient.prepare_index_params() -> IndexParams
```

**PARAMETERS:**

N/A

**RETURN TYPE:**

*IndexParams*

**RETURNS:**

An **IndexParams** contains a list of **IndexParam** objects.

- **IndexParams**

    A list of **IndexParam** objects.

    ```python
    ├── IndexParams 
    │       └── add_index()
    ```

    It offers the **[add_index()](add_index.md)** method to add indexes to the list.

**EXCEPTIONS:**

None

## Examples

```python
from pymilvus import MilvusClient

index_params = MilvusClient.prepare_index_params()
```

- [add_index()](add_index.md)

- [create_index()](create_index.md)

- [describe_index()](describe_index.md)

- [drop_index()](drop_index.md)

- [list_indexes()](list_indexes.md)

