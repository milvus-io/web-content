# ResultSet

Contains search or query results including matched entity IDs, scores, and field values.

```go
type ResultSet struct {
    ResultCount int
    GroupByValue column.Column
    IDs column.Column
    Fields DataSet
    Scores []float32
    Recall float32
    Err error
}
```

**FIELDS:**

- **ResultCount** (*int*)

    the returning entry count

- **GroupByValue** (*column.Column*)

    The group-by column used for grouped results.

- **IDs** (*column.Column*)

    auto generated id, can be mapped to the columns from `Insert` API

- **Fields** (*DataSet*)

    output field data

- **Scores** (*[]float32*)

    distance to the target vector

- **Recall** (*float32*)

    recall of the query vector's search result (estimated by zilliz cloud)

- **Err** (*error*)

    search error if any

**METHODS:**

- `GetColumn(fieldName string) column.Column`

    GetColumn returns column with provided field name.

- `Len() int`

    Returns the number of results.

- `Slice(start, end int) ResultSet`

    Returns a subset of the results within the specified range.