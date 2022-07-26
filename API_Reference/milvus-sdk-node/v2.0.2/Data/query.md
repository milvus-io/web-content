# query()

Conducts a vector query.

## Invocation

```javascript
new milvusClient(MILUVS_ADDRESS).dataManager.query(QueryReq);
```

## Parameter

### QueryReq

| Parameter                  | Description                           | type     | required |
| -------------------------- | ------------------------------------- | -------- | -------- |
| collection_name            | Collection name                       | String   | True     |
| output_fields              | Vector or scalar field to be returned | String[] | True     |
| expr(optional)             | Scalar field filter expression        | String   | False    |
| partitions_names(optional) | Array of partition names              | String[] | Talse    |

## Example

```javascript
new milvusClient(MILUVS_ADDRESS).dataManager.query({
  collection_name: "my_collection",
  expr: "age > 0",
  output_fields: ["age"],
});
```

## Return

```javascript
// query return
{
  status: { error_code: 'Success', reason: '' },
  data: [
    { age: '434848878802248081' },
    ...999 more items,
  ]
}
```
