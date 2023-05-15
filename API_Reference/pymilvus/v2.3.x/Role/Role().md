# Role()

This is the constructor method to create a role.

## Invocation

```python
Role(name, using="default", **kwargs)
```

## Parameters

| Parameter    | Description                                                  | Type                            | Required |
| ------------ | ------------------------------------------------------------ | ------------------------------- | -------- |
| `name`       | Name of the role                                             | String                          | True     |
| `using`      | Alias of the Milvus connection to be attached to             | String                          | False    |

## Return

A new role object.

### Properties

| Property        | Description                                                  | Type                            |
| --------------- | ------------------------------------------------------------ | ------------------------------- |
| `name`          | Name of the role                                             | String                          |
| `using`         | Alias of the Milvus connection to be attached to             | String                          |