# describe_collection()

This method describes details on a specific collection.

## Invocation

```python
describe_collection(collection_name)
```

## Parameters

| Parameter          | Description                          | Type     | Required |
|--------------------|--------------------------------------|----------|----------|
| `collection_name` | Name of the collection to describe. | String | True     |

## Return

A list of dictionaries.

## Raises

`ValueError`: Error if the collection is missing.

## Example

```python
from pymilvus import MilvusClient

client = MilvusClient(uri, token)

client.describe_collection(collection_name='medium_articles')
```