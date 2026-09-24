# Collection

Represents collection metadata in Milvus, including the collection schema and consistency settings. Returned by `DescribeCollection()`.

```go
type Collection struct {
    ID               int64
    Name             string
    Schema           *Schema
    PhysicalChannels []string
    VirtualChannels  []string
    Loaded           bool
    ConsistencyLevel ConsistencyLevel
    ShardNum         int32
    Properties       map[string]string
    UpdateTimestamp  uint64
}
```

**FIELDS:**

- **ID** (*int64*) -
The unique identifier of the collection.

- **Name** (*string*) -
The name of the collection.

- **Schema** (*[Schema](Schema.md)*) -
The collection schema, with field definitions and the primary key.

- **PhysicalChannels** (*[]string*) -
The physical message channels the collection uses.

- **VirtualChannels** (*[]string*) -
The virtual message channels the collection uses.

- **Loaded** (*bool*) -
Whether the collection is currently loaded.

- **ConsistencyLevel** (*[ConsistencyLevel](ConsistencyLevel.md)*) -
The consistency level of the collection.

- **ShardNum** (*int32*) -
The number of shards in the collection.

- **Properties** (*map[string]string*) -
The collection properties (e.g., TTL settings).

- **UpdateTimestamp** (*uint64*) -
The collection update timestamp, usually used for internal change detection.
