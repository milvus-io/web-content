# create_index()

This method creates an index with the specified index parameter.

## Invocation

```python
create_index(field_name, index_params, timeout=None, **kwargs)
```

## Parameters

| Parameter         | Description                                                  | Type                            | Required |
| ----------------- | ------------------------------------------------------------ | ------------------------------- | -------- |
| `field_name`      | Name of the field to create index on                         | String                          | True     |
| `index_params`    | Parameters of the index to create                            | Dict                            | True     |
| `index_name`      | Name of the index to create. If not specified, the default value of `index_name` is `"_default_idx_"`.                                 | String                          | False    |
| `timeout`         | An optional duration of time in seconds to allow for the RPC. If it is set to None, the client keeps waiting until the server responds or error occurs.                                               | Float                           | False    |

## Return

The newly created index object.

## Raises

- `CollectionNotExistException`: error if the collection does not exist.
- `ParamError`: error if the parameters are invalid.
- `BaseException`: error if the specified field does not exist.
- `BaseException`: error if the index has been created.

## Example

```python
index_params = {
  "metric_type":"L2",
  "index_type":"IVF_FLAT",
  "params":{"nlist":1024}
}
from pymilvus import Collection
collection = Collection("book")      # Get an existing collection.
collection.create_index(
  field_name="book_intro", 
  index_params=index_params
  index_name="vec_index"
)
```

## Note

- The `index_names` of different indexes in the same collection must be different, so there can be at most one index whose name is `_default_idx_` in a collection.
- Using the same `field_name`, `index_params`, `index_name` to create the same index repeatedly will return success directly.
- Indexes can be built for scalar fields. In this case, `index_params` can be omitted. Milvus will then build default dictionary tree indexes for fields of type VARCHAR. For integer or floating-point fields, the default index type is sort.
