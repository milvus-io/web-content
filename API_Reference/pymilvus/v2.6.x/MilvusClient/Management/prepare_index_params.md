# prepare_index_params()

This operation prepares index parameters to build indexes for a specific collection.

<div class="alert note">

This is a class method. You should call this method like this: `MilvusClient.prepare_index_params()`.

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

    It offers the **[add_index()](https://zilliverse.feishu.cn/docx/ZplAdphtooqHJkxo8GCcOFecngd)** method to add indexes to the list.

**EXCEPTIONS:**

None

## Examples

```python
from pymilvus import MilvusClient

index_params = MilvusClient.prepare_index_params()
```

- [add_index()](https://zilliverse.feishu.cn/docx/ZplAdphtooqHJkxo8GCcOFecngd)

- [create_index()](https://zilliverse.feishu.cn/docx/B3n3db0idoia02xXxJfcONK8nRh)

- [describe_index()](https://zilliverse.feishu.cn/docx/WhsHdyIgyoFlsQxNJt9cFCTxnDe)

- [drop_index()](https://zilliverse.feishu.cn/docx/NPnQdZCJ7oF002xTntecdI2ini8)

- [list_indexes()](https://zilliverse.feishu.cn/docx/ZqmudJWyFonUKGxAxXncYrLZn2e)

