# list_collections()

This method lists the names of collections.

## Invocation

```python
list_collections()
```

## Parameters

None

## Return

A list of dictionaries.

## Raises

None

## Example

```python
from pymilvus import MilvusClient

client = MilvusClient(uri, token)

client.list_collections()
```