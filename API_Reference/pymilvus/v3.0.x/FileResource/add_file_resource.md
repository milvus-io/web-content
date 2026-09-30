# add_file_resource()

Registers a file that has already been uploaded to the object store configured for the Milvus cluster as a named file resource. Once registered, the resource can be referenced from analyzer parameters that accept an external dictionary — such as `extra_dict_file` on the `jieba` tokenizer, `stop_words_file` on the `stop` filter, `word_list_file` on the `decompounder` filter, and `synonyms_file` on the `synonym` filter — using `{"type": "remote", "resource_name": "<name>", "file_name": "<file_name>"}`. The target file must exist in the object store at the time of this call; the server validates `path` synchronously and fails the request if it does not resolve.

## Request syntax

```python
add_file_resource(
    name: str,
    path: str,
    timeout: float | None = None,
    **kwargs
)
```

**PARAMETERS**:

- **name** (*str*) -
 The unique name to register the resource under. This value is what you later pass as `resource_name` in analyzer configurations that reference this resource.

- **path** (*str*) -
 The object key of the file in the object store configured for the Milvus cluster, **including the rootPath prefix**. For example, if the cluster's `rootPath` is `file` and you uploaded the file to `s3://<bucket>/file/dict.txt`, set `path` to `"file/dict.txt"`. A path that does not resolve to an existing object causes the call to fail with `MilvusException` (`code=65535`, `message="file resource path not exist"`).

- **timeout** (*float* | *None*) -
 The timeout duration (in seconds) for this operation. A value of `None` indicates that no timeout is applied.

**RETURNS**:

*None*

## Examples

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus",
)

# Upload the file to the cluster's object store out-of-band first
# (e.g., via mc, boto3, or the AWS CLI), then register it here.
client.add_file_resource(
    name="zh_terms",
    path="file/zh_terms.txt",
)

# The registered resource can now be referenced from analyzer configs.
analyzer_params = {
    "tokenizer": {
        "type": "jieba",
        "dict": ["_default_"],
        "extra_dict_file": {
            "type": "remote",
            "resource_name": "zh_terms",
            "file_name": "zh_terms.txt",
        },
    },
}
```

