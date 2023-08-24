# SearchResult()

This is the constructor method to create a SearchResult.

## Invocation

```python
SearchResult(query_result=None)
```

## Return

A SearchResult object.

### Attributes

| Property             | Description                                                                        |
| -------------------- | ---------------------------------------------------------------------------------- |
| `iter(self)`         | Iterate the search result. Each iteration returns a Hits corresponding to a query. |
| `self[item]`         | Return the Hits corresponding to the nth query                                     |
| `len(self)`          | Return the `nq` of search result                                                   |

## Examples

```python
# 'result' is a SearchResult object.
for hits in iter(result):
    # gets the IDs of all returned hits
    print(hits.ids)

    # gets the distances to the query vector from all returned hits
    print(hits.distances)
    for hit in hits:
        # gets the value of an output field specified in the search request.
        # dynamic fields are supported, but vector fields are not supported yet.    
        print(hit.entity.get('title'))
        print(hit.entity.get('$meta["dynamic_field_1"]'))
        print(hit.entity.get('$dynamic_field_2'))

# gets the first set of hits
# and the ids of these hits
print(result[0].ids)

# gets the total number of hit sets
# should equal to the number of limit 
# specified in the search request.
print(len(result))
```
