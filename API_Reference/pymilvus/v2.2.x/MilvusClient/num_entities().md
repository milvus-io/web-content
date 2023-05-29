# num_entities()

This method returns the number of rows in the collection.

## Invocation

```python
num_entities()
```

## Parameters

None

## Raises

None

## Returns

The number of rows in the collection is returned.

## Examples

```python
from pymilvus import MilvusClient

client = MilvusClient()

client.num_entities()
```