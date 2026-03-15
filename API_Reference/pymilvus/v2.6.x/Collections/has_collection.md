# has_collection()

This operation checks whether a specific collection exists.

## Request Syntax

```python
has_collection(
    collection_name: str,
    timeout: Optional[float] = None
) -> Bool
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of a collection.

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response returns or error occurs.

**RETURN TYPE:**

*bool*

**RETURNS:**

A boolean value indicating whether the specified collection exists.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import MilvusClient

# 1. Set up a milvus client
client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# 2. Create a collection
client.create_collection(collection_name="test_collection", dimension=5)

# 3. Check whether a collection named `test_collection` exists
client.has_collection(collection_name="test_collection") 

# True

# 4. Check whether a collection named `test_collection_2` exists
client.has_collection(collection_name="test_collection_2") 

# False
```

## Related methods

- [create_collection()](https://zilliverse.feishu.cn/docx/TziHdCu4VoURrfxAMsUcsRhQnub)

- [create_schema()](https://zilliverse.feishu.cn/docx/RxU7dBjGlop0e1xZShYcZ4qCnnh)

- [describe_collection()](https://zilliverse.feishu.cn/docx/MCkjdiRNKo2HCCxzHReclrgAnbg)

- [drop_collection()](https://zilliverse.feishu.cn/docx/QNB4d2q2ZorIApxpnzqczW2HnL7)

- [get_collection_stats()](https://zilliverse.feishu.cn/docx/VVyNdx038oECxNxMQavc9vssnoh)

- [list_collections()](https://zilliverse.feishu.cn/docx/BHyidrVcyoPwxexHLrnceOSAnRe)

- [rename_collection()](https://zilliverse.feishu.cn/docx/IeiIdJ71Pox2OjxMiOzczUTenud)

- [IndexType](https://zilliverse.feishu.cn/docx/FdLUdaL43oIuqTxJVnbcHxgqnkh)

- [DataType](https://zilliverse.feishu.cn/docx/JiN3dU8zwoPdgBxxpw6c0JkUnze)

