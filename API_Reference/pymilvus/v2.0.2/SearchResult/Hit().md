# Hit()

This is the constructor method to create a Hit object.

## Invocation

```python
Hit(hit)
```

## Return

A Hit object.

### Attributes

| Property             | Description                                                    |
| -------------------- | -------------------------------------------------------------- |
| `ids`       | Return the primary keys of the Hit results.                              |
| `distances` | Return the distance between the Hit record and the query.                |
| `score`     | Return the score of the Hit record. The score is set equal to distance. |
| `str`       | Return the information of the Hit record.                                    |
