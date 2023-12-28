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
| `id`       | Return the primary key of the hit result                              |
| `distance` | Return the distance between the hit record and the query                |
| `score`     | Return the score of the hit record. The score is set equal to distance. |
| `str`       | Return the information of hit record                                    |

## Examples

```python
# hit is a Hit object

# gets the id of a hit entity
print(hit.id)

# gets the distance of a entity from the query vector
print(hit.distance)

# gets the score of a hit entity
# should equal to the distance
print(hit.score)

# gets description of a hit entity
print(hit.str)
