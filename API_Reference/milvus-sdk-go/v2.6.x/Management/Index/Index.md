# Index

Interface for index configuration. Use constructor functions like NewAutoIndex() or NewHNSWIndex() to create instances.

```go
type Index interface {
    Name() string
    IndexType() IndexType
    Params() map[string]string
}
```

**METHODS:**

- `Name() string`

      Returns the name of the index.

- `IndexType() IndexType`

      Returns the index algorithm type.

- `Params() map[string]string`

      Returns the index parameters as a key-value map.