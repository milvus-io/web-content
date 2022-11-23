# DataType

The eunumeration of all supported data types defined by RPC proto in Milvus.

```Java
package io.milvus.grpc;
public enum DataType
```

| Type     | Description                                              |
| ------------ | ------------------------------------------------------------ |
| None         | For internal usage.                                          |
| Bool         | Boolean.                                                     |
| Int8         | Integer number stored with 8 bit.                            |
| Int16        | Integer number stored with 16 bit.                           |
| Int32        | Integer number stored with 32 bit.                           |
| Int64        | Integer number stored with 64 bit.                           |
| Float        | Floating-point numbers.                                      |
| Double       | 64-bit IEEE 754 floating point numbers.                      |
| String       | Reserved. Do not use this.                                   |
| VarChar      | Variable-length string with a limit on the maximum length.   |
| BinaryVector | Binary vector. Each dimension is represented by 1 bit.       |
| FloatVector  | Float vector. Each dimension is represented by 1 float (4 bits) value. |

