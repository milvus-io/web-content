# DataType

The enum for available data types, defined by RPC proto.

```Java
package io.milvus.grpc;
public enum DataType
```

| **Type**     | **Code** | **Description**                                              |
| ------------ | -------- | ------------------------------------------------------------ |
| None         | 0        | For internal usage.                                          |
| Bool         | 1        | Boolean.                                                     |
| Int8         | 2        | Integer number stored with 8 bit.                            |
| Int16        | 3        | Integer number stored with 16 bit.                           |
| Int32        | 4        | Integer number stored with 32 bit.                           |
| Int64        | 5        | Integer number stored with 64 bit.                           |
| Float        | 10       | Floating-point numbers.                                      |
| Double       | 11       | 64-bit IEEE 754 floating point numbers.                      |
| String       | 20       | Reserved. Do not use this.                                   |
| VarChar      | 21       | Variable-length string with a limit on the maximum length.   |
| BinaryVector | 100      | Binary vector. Each dimension is represented by 1 bit.       |
| FloatVector  | 101      | Float vector. Each dimension is represented by 1 float(4 bits) value. |

