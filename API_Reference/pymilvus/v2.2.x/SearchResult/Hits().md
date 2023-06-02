# Hits()

This is the constructor method to create a Hits object.

## Invocation

```python
Hits(hits)
```

## Return

A Hits object.

### Attributes

| Property             | Description                                                                                                |
| -------------------- | ---------------------------------------------------------------------------------------------------------- |
| `iter(self)`         | Iterate the Hits object. Each iteration returns a Hit which represent a record corresponding to the query. |
| `self[item]`         | Return the kth Hit corresponding to the query                                                              |
| `len(self)`          | Return the number of hit record                                                                            |
| `ids`                | Return the primary keys of all search results                                                              |
| `distances`          | Return the distances of all hit record     |

## Example

```python
# 'hits' is a Hits object

# gets all the ids of returned hits
print(hits.ids)

# gets the distances of the returned hits from the query vector 
print(hits.distances)

# gets the total number of returned hits
print(len(hits))

# iterates over a set of hits
for hit in iter(hits)
    # gets all fields specified in the output fields
    print(hit.entity)
    # or a specific output field
    print(hit.entity.get('title'))

# gets all output fields of a set of hits
print(hits[0].entity)

# or a specific output field
print(hits[0].entity.get("title"))
```
