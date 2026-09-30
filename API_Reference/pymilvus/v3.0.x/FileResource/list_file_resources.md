# list_file_resources()

Returns all file resources currently registered on the Milvus cluster. Each entry is a `FileResourceInfo` object exposing the `name` under which the resource was registered via `add_file_resource()` and the `path` (object key in the configured object store) that it points to. There is no dedicated "get" API for a single resource — `list_file_resources()` is the canonical way to inspect registered resources.

## Request syntax

```python
list_file_resources(
    timeout: float | None = None,
    **kwargs
)
```

**PARAMETERS**:

- **timeout** (*float* | *None*) -
 The timeout duration (in seconds) for this operation. A value of `None` indicates that no timeout is applied.

**RETURNS**:

*list[FileResourceInfo]*

Each element of the returned list exposes the following attributes:

- **name** (*str*) -
 The name under which the resource was registered.

- **path** (*str*) -
 The object-store key of the registered file, including the `rootPath` prefix.

## Examples

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus",
)

resources = client.list_file_resources()
for r in resources:
    print(r.name, r.path)
# zh_terms file/zh_terms.txt
# en_stop_words file/stop_words.txt
```

