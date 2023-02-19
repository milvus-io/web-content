# ConsistencyLevelEnum

The enumeration of consistency levels during a search or query.

```Java
package io.milvus.common.clientenum;
public enum ConsistencyLevelEnum
```

| Type   | Description                                              |
| ---------- | ------------------------------------------------------------ |
| STRONG     | Waits until all operations are completed before a search/query. |
| BOUNDED    | Waits until operations in a time span are completed before a search/query. |
| EVENTUALLY | Executes a search/query immediately.                         |