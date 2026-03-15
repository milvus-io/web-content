# list_collections()

This operation lists all existing collections.

## Request syntax

```python
list_collections(**kwargs) -> Name
```

**PARAMETERS:**

- **kwargs** -

    - **timeout** (*float* | *None*) -

        The timeout duration for this operation. 

        Setting this to **None** indicates that this operation timeouts when any response returns or error occurs.

**RETURN TYPE:**

*list*

**RETURNS:**

A list of collection names.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import MilvusClient

# 1. Create a milvus client
client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# 2. Create a collection
client.create_collection(collection_name="test_collection", dimension=5)

# 3. List collections
client.list_collections() 

# ['test_collection']
```

## Related methods

- [create_collection()](https://zilliverse.feishu.cn/docx/TziHdCu4VoURrfxAMsUcsRhQnub)

- [create_schema()](https://zilliverse.feishu.cn/docx/RxU7dBjGlop0e1xZShYcZ4qCnnh)

- [describe_collection()](https://zilliverse.feishu.cn/docx/MCkjdiRNKo2HCCxzHReclrgAnbg)

- [drop_collection()](https://zilliverse.feishu.cn/docx/QNB4d2q2ZorIApxpnzqczW2HnL7)

- [get_collection_stats()](https://zilliverse.feishu.cn/docx/VVyNdx038oECxNxMQavc9vssnoh)

- [has_collection()](https://zilliverse.feishu.cn/docx/SSQ6dFGdxouy7hxRwCOcatnEn0e)

- [rename_collection()](https://zilliverse.feishu.cn/docx/IeiIdJ71Pox2OjxMiOzczUTenud)

- [IndexType](https://zilliverse.feishu.cn/docx/FdLUdaL43oIuqTxJVnbcHxgqnkh)

- [DataType](https://zilliverse.feishu.cn/docx/JiN3dU8zwoPdgBxxpw6c0JkUnze)

