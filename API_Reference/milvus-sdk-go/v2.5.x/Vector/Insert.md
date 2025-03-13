# Insert()

This method inserts data into a specific collection.

```go
func (c *Client) Insert(ctx context.Context, option InsertOption, callOptions ...grpc.CallOption) (InsertResult, error)
```

## Request Parameters

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>ctx</code></p></td>
     <td><p>Context for the current call to work.</p></td>
     <td><p><code>context.Context</code></p></td>
   </tr>
   <tr>
     <td><p><code>option</code></p></td>
     <td><p>Optional parameters of the methods.</p></td>
     <td><p><code>InsertOption</code></p></td>
   </tr>
   <tr>
     <td><p><code>callOptions</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## InsertOption

This is an interface type. The `columnBasedDataOption` and `rowBasedDataOption` struct types implement this interface type. 

You can use the `NewColumnBasedInsertOption()` or `NewRowBasedInsertOption()` function to get the concrete implementation.

### NewRowBasedInsertOption

This function requires you to organize your data in rows. The signature of this method is as follows:

```go
func NewRowBasedInsertOption(collName string, rows ...any) *rowBasedDataOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>collName</code></p></td>
     <td><p>Name of the target collection.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>rows</code></p></td>
     <td><p>Data organized in rows.</p></td>
     <td><p><code>...any</code></p></td>
   </tr>
</table>

### NewColumnBasedInsertOption

This function requires you to organize your data in columns. The signature of this method is as follows:

```go
func NewColumnBasedInsertOption(collName string, columns ...column.Column) *columnBasedDataOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>collName</code></p></td>
     <td><p>Name of the target collection.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>columns</code></p></td>
     <td><p>Data organized in columns.</p></td>
     <td><p><code>...column.Column</code></p></td>
   </tr>
</table>

You can chain the following method to get an implementation of the `columnBasedDataOption` struct.

- [WithColumns](Insert.md#withcolumns)

- [WithBoolColumn](Insert.md#withboolcolumn)

- [WithInt8Column](Insert.md#withint8column)

- [WithInt16Column](Insert.md#withint16column)

- [WithInt32Column](Insert.md#withint32column)

- [WithInt64Column](Insert.md#withint64column)

- [WithVarcharColumn](Insert.md#withvarcharcolumn)

- [WithFloatVectorColumn](Insert.md#withfloatvectorcolumn)

- [WithFloat16VectorColumn](Insert.md#withfloat16vectorcolumn)

- [WithBFloat16VectorColumn](Insert.md#withbfloat16vectorcolumn)

- [WithBinaryVectorColumn](Insert.md#withbinaryvectorcolumn)

- [WithPartition](Insert.md#withpartition)

### WithColumns

This method appends a generic column to the `columnBasedDataOption` struct.

```go
func (opt *columnBasedDataOption) WithColumns(columns ...column.Column) *columnBasedDataOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>columns</code></p></td>
     <td><p>Data in the column.</p></td>
     <td><p><code>column.Column</code></p></td>
   </tr>
</table>

### WithBoolColumn

This method appends a **Boolean** column to the `columnBasedDataOption` struct.

```go
func (opt *columnBasedDataOption) WithBoolColumn(colName string, data []bool) *columnBasedDataOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>colName</code></p></td>
     <td><p>Name of the target collection.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>data</code></p></td>
     <td><p>Data in the column.</p></td>
     <td><p><code>[]bool</code></p></td>
   </tr>
</table>

### WithInt8Column

This method appends an **Int8** column to the `columnBasedDataOption` struct.

```go
func (opt *columnBasedDataOption) WithInt8Column(colName string, data []int8) *columnBasedDataOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>colName</code></p></td>
     <td><p>Name of the target collection.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>data</code></p></td>
     <td><p>Data in the column.</p></td>
     <td><p><code>[]int8</code></p></td>
   </tr>
</table>

### WithInt16Column

This method appends an **Int16** column to the `columnBasedDataOption` struct.

```go
func (opt *columnBasedDataOption) WithInt16Column(colName string, data []int16) *columnBasedDataOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>colName</code></p></td>
     <td><p>Name of the target collection.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>data</code></p></td>
     <td><p>Data in the column.</p></td>
     <td><p><code>[]int16</code></p></td>
   </tr>
</table>

### WithInt32Column

This method appends an **Int32** column to the `columnBasedDataOption` struct.

```go
func (opt *columnBasedDataOption) WithInt32Column(colName string, data []int32) *columnBasedDataOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>colName</code></p></td>
     <td><p>Name of the target collection.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>data</code></p></td>
     <td><p>Data in the column.</p></td>
     <td><p><code>[]int32</code></p></td>
   </tr>
</table>

### WithInt64Column

This method appends an **Int64** column to the `columnBasedDataOption` struct.

```go
func (opt *columnBasedDataOption) WithInt64Column(colName string, data []int64) *columnBasedDataOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>colName</code></p></td>
     <td><p>Name of the target collection.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>data</code></p></td>
     <td><p>Data in the column.</p></td>
     <td><p><code>[]int64</code></p></td>
   </tr>
</table>

### WithVarcharColumn

This method appends a **VarChar** column to the `columnBasedDataOption` struct.

```go
func (opt *columnBasedDataOption) WithVarcharColumn(colName string, data []string) *columnBasedDataOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>colName</code></p></td>
     <td><p>Name of the target collection.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>data</code></p></td>
     <td><p>Data in the column.</p></td>
     <td><p><code>[]string</code></p></td>
   </tr>
</table>

### WithFloatVectorColumn

This method appends a **FloatVector** column to the `columnBasedDataOption` struct.

```go
func (opt *columnBasedDataOption) WithFloatVectorColumn(colName string, dim int, data [][]float32) *columnBasedDataOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>colName</code></p></td>
     <td><p>Name of the target collection.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>dim</code></p></td>
     <td><p>Number of dimensions in the column.</p></td>
     <td><p><code>int</code></p></td>
   </tr>
   <tr>
     <td><p><code>data</code></p></td>
     <td><p>Data in the column.</p></td>
     <td><p><code>[][]float32</code></p></td>
   </tr>
</table>

### WithFloat16VectorColumn

This method appends a **Float16Vector** column to the `columnBasedDataOption` struct.

```go
func (opt *columnBasedDataOption) WithFloat16VectorColumn(colName string, dim int, data [][]float32) *columnBasedDataOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>colName</code></p></td>
     <td><p>Name of the target collection.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>dim</code></p></td>
     <td><p>Number of dimensions in the column.</p></td>
     <td><p><code>int</code></p></td>
   </tr>
   <tr>
     <td><p><code>data</code></p></td>
     <td><p>Data in the column.</p></td>
     <td><p><code>[][]float32</code></p></td>
   </tr>
</table>

### WithBFloat16VectorColumn

This method appends a **BFloat16Vector** column to the `columnBasedDataOption` struct.

```go
func (opt *columnBasedDataOption) WithBFloat16VectorColumn(colName string, dim int, data [][]float32) *columnBasedDataOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>colName</code></p></td>
     <td><p>Name of the target collection.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>dim</code></p></td>
     <td><p>Number of dimensions in the column.</p></td>
     <td><p><code>int</code></p></td>
   </tr>
   <tr>
     <td><p><code>data</code></p></td>
     <td><p>Data in the column.</p></td>
     <td><p><code>[][]float32</code></p></td>
   </tr>
</table>

### WithBinaryVectorColumn

This method appends a **BinaryVector** column to the `columnBasedDataOption` struct.

```go
func (opt *columnBasedDataOption) WithBinaryVectorColumn(colName string, dim int, data [][]byte) *columnBasedDataOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>colName</code></p></td>
     <td><p>Name of the target collection.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>dim</code></p></td>
     <td><p>Number of dimensions in the column.</p></td>
     <td><p><code>int</code></p></td>
   </tr>
   <tr>
     <td><p><code>data</code></p></td>
     <td><p>Data in the column.</p></td>
     <td><p><code>[][]byte</code></p></td>
   </tr>
</table>

### WithPartition

This method sets the target partition of this operation.

```go
func (opt *columnBasedDataOption) WithPartition(partitionName string) *columnBasedDataOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>partitionName</code></p></td>
     <td><p>Name of the target partition.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

## column.Column

This is an interface type. The following struct types implement this interface type. 

- [column.ColumnBFloat16Vector](Insert.md#columncolumnbfloat16vector)

- [column.ColumnBinaryVector](Insert.md#columncolumnbinaryvector)

- [column.ColumnBool](Insert.md#columncolumnbool)

- [column.ColumnBoolArray](Insert.md#columncolumnboolarray)

- [column.ColumnDouble](Insert.md#columncolumndouble)

- [column.ColumnDoubleArray](Insert.md#columncolumndoublearray)

- [column.ColumnDynamic](Insert.md#columncolumndynamic)

- [column.ColumnFloat](Insert.md#columncolumnfloat)

- [column.ColumnFloat16Vector](Insert.md#columncolumnfloat16vector)

- [column.ColumnFloatArray](Insert.md#columncolumnfloatarray)

- [column.ColumnFloatVector](Insert.md#columncolumnfloatvector)

- [column.ColumnInt16](Insert.md#columncolumnint16)

- [column.ColumnInt16Array](Insert.md#columncolumnint16array)

- [column.ColumnInt32](Insert.md#columncolumnint32)

- [column.ColumnInt32Array](Insert.md#columncolumnint32array)

- [column.ColumnInt64](Insert.md#columncolumnint64)

- [column.ColumnInt64Array](Insert.md#columncolumnint64array)

- [column.ColumnInt8](Insert.md#columncolumnint8)

- [column.ColumnInt8Array](Insert.md#columncolumnint8array)

- [column.ColumnJSONBytes](Insert.md#columncolumnjsonbytes)

- [column.ColumnSparseFloatVector](Insert.md#columncolumnsparsefloatvector)

- [column.ColumnVarChar](Insert.md#columncolumnvarchar)

- [column.ColumnVarCharArray](Insert.md#columncolumnvarchararray)

## column.ColumnBFloat16Vector

This is a struct type. You can use the `NewColumnBFloat16Vector` or `NewColumnBFloat16VectorFromFp32Vector` method to implement a **BFloat16Vector** field.

### NewColumnBfloat16Vector

This method creates a **BFloat16Vector** field with a list of byte sublists as data. The signature of this method is as follows:

```go
func NewColumnBFloat16Vector(fieldName string, dim int, data [][]byte) *ColumnBFloat16Vector
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>fieldName</code></p></td>
     <td><p>Name of the field to create.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>dim</code></p></td>
     <td><p>Number of dimensions in the field.</p></td>
     <td><p><code>int</code></p></td>
   </tr>
   <tr>
     <td><p><code>data</code></p></td>
     <td><p>Data to be inserted into the field.</p></td>
     <td><p><code>[][]byte</code></p></td>
   </tr>
</table>

### NewColumnBFloat16VectorFromFp32Vector

This method creates a **BFloat16Vector** field with a list of float32 sublists as data. The signature of this method is as follows:

```go
func NewColumnBFloat16VectorFromFp32Vector(fieldName string, dim int, data [][]float32) *ColumnBFloat16Vector
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>fieldName</code></p></td>
     <td><p>Name of the field to create.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>dim</code></p></td>
     <td><p>Number of dimensions in the field.</p></td>
     <td><p><code>int</code></p></td>
   </tr>
   <tr>
     <td><p><code>data</code></p></td>
     <td><p>Data to be inserted into the field.</p></td>
     <td><p><code>[][]float32</code></p></td>
   </tr>
</table>

## column.ColumnBinaryVector

This is a struct type. You can use the `NewColumnBinaryVector` method to implement a **BinaryVector** field.

### NewColumnBinaryVector

This method creates a **BinaryVector** field with a list of byte sublists as data. The signature of this method is as follows:

```go
func NewColumnBinaryVector(fieldName string, dim int, data [][]byte) *ColumnBinaryVector
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>fieldName</code></p></td>
     <td><p>Name of the field to create.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>dim</code></p></td>
     <td><p>Number of dimensions in the field.</p></td>
     <td><p><code>int</code></p></td>
   </tr>
   <tr>
     <td><p><code>data</code></p></td>
     <td><p>Data to be inserted into the field.</p></td>
     <td><p><code>[][]byte</code></p></td>
   </tr>
</table>

## column.ColumnBool

This is a struct type. You can use the `NewColumnBool` method to implement a **Boolean** field.

### NewColumnBool

This method creates a **Boolean** field with a list of Boolean values as data. The signature of this method is as follows:

```go
func NewColumnBool(name string, values []bool) *ColumnBool
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>name</code></p></td>
     <td><p>Name of the field to create.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>values</code></p></td>
     <td><p>Data to be inserted into the field.</p></td>
     <td><p><code>[]bool</code></p></td>
   </tr>
</table>

## column.ColumnBoolArray

This is a struct type. You can use the `NewColumnBoolArray` method to implement an **Array** field with elements of the **Boolean** type.

### NewColumnBoolArray

This method creates an **Array** field with elements of the **Boolean** type. The signature of this method is as follows:

```go
func NewColumnBoolArray(fieldName string, data [][]bool) *ColumnBoolArray
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>fieldName</code></p></td>
     <td><p>Name of the field to create.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>data</code></p></td>
     <td><p>Data to be inserted into the field.</p></td>
     <td><p><code>[][]bool</code></p></td>
   </tr>
</table>

## column.ColumnDouble

This is a struct type. You can use the `NewColumnDouble` method to implement a **Double** field.

### NewColumnDouble

This method creates a **Double** field. The signature of this method is as follows:

```go
func NewColumnDouble(name string, values []float64) *ColumnDouble
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>name</code></p></td>
     <td><p>Name of the field to create.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>values</code></p></td>
     <td><p>Data to be inserted into the field.</p></td>
     <td><p><code>[]float64</code></p></td>
   </tr>
</table>

## column.ColumnDoubleArray

This is a struct type. You can use the `NewColumnDoubleArray` method to implement an **Array** field with elements of the **Double** type.

### NewColumnDoubleArray

This method creates an **Array** field with elements of the **Double** type. The signature of this method is as follows:

```go
func NewColumnDoubleArray(fieldName string, data [][]float64) *ColumnDoubleArray
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>fieldName</code></p></td>
     <td><p>Name of the field to create.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>data</code></p></td>
     <td><p>Data to be inserted into the field.</p></td>
     <td><p><code>[][]float64</code></p></td>
   </tr>
</table>

## column.ColumnDynamic

This is a struct type. You can use the `NewColumnDynamic` method to implement a **dynamic** field.

### NewColumnDynamic

This method creates a **dynamic** field. The signature of this method is as follows:

```go
func NewColumnDynamic(column *ColumnJSONBytes, outputField string) *ColumnDynamic
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>column</code></p></td>
     <td><p>A column of the JSON type.</p></td>
     <td><p><code>*column.ColumnJSONBytes</code></p></td>
   </tr>
   <tr>
     <td><p><code>outputField</code></p></td>
     <td><p>Name of the dynamic field.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

## column.ColumnFloat

This is a struct type. You can use the `NewColumnFloat` method to implement a **Float** field.

### NewColumnFloat

This method creates a **Float** field. The signature of this method is as follows:

```go
func NewColumnFloat(name string, values []float32) *ColumnFloat
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>name</code></p></td>
     <td><p>Name of the field to create.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>values</code></p></td>
     <td><p>Data to be inserted into the field.</p></td>
     <td><p><code>[]float32</code></p></td>
   </tr>
</table>

## column.ColumnFloat16Vector

This is a struct type. You can use the `NewColumnFloat16Vector` or `NewColumnFloat16VectorFromFp32Vector` method to implement a **Float16Vector** field.

### NewColumnBfloat16Vector

This method creates a **Float16Vector** field with a list of byte sublists as data. The signature of this method is as follows:

```go
func NewColumnFloat16Vector(fieldName string, dim int, data [][]byte) *ColumnFloat16Vector
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>fieldName</code></p></td>
     <td><p>Name of the field to create.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>dim</code></p></td>
     <td><p>Number of dimensions in the field.</p></td>
     <td><p><code>int</code></p></td>
   </tr>
   <tr>
     <td><p><code>data</code></p></td>
     <td><p>Data to be inserted into the field.</p></td>
     <td><p><code>[][]byte</code></p></td>
   </tr>
</table>

### NewColumnFloat16VectorFromFp32Vector

This method creates a **Float16Vector** field with a list of float32 sublists as data. The signature of this method is as follows:

```go
func NewColumnFloat16VectorFromFp32Vector(fieldName string, dim int, data [][]float32) *ColumnFloat16Vector
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>fieldName</code></p></td>
     <td><p>Name of the field to create.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>dim</code></p></td>
     <td><p>Number of dimensions in the field.</p></td>
     <td><p><code>int</code></p></td>
   </tr>
   <tr>
     <td><p><code>data</code></p></td>
     <td><p>Data to be inserted into the field.</p></td>
     <td><p><code>[][]float32</code></p></td>
   </tr>
</table>

## column.ColumnFloatArray

This is a struct type. You can use the `NewColumnFloatArray` method to implement an **Array** field with elements of the **Float** type.

### NewColumnFloatArray

This method creates an **Array** field with elements of the **Float** type. The signature of this method is as follows:

```go
func NewColumnFloatArray(fieldName string, data [][]float32) *ColumnFloatArray
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>fieldName</code></p></td>
     <td><p>Name of the field to create.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>data</code></p></td>
     <td><p>Data to be inserted into the field.</p></td>
     <td><p><code>[][]float32</code></p></td>
   </tr>
</table>

## column.ColumnFloatVector

This is a struct type. You can use the `NewColumnFloatVector` method to implement a **FloatVector** field.

### NewColumnFloatVector

This method creates a **FloatVector** field with a list of byte sublists as data. The signature of this method is as follows:

```go
func NewColumnFloatVector(fieldName string, dim int, data [][]float32) *ColumnFloatVector
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>fieldName</code></p></td>
     <td><p>Name of the field to create.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>dim</code></p></td>
     <td><p>Number of dimensions in the field.</p></td>
     <td><p><code>int</code></p></td>
   </tr>
   <tr>
     <td><p><code>data</code></p></td>
     <td><p>Data to be inserted into the field.</p></td>
     <td><p><code>[][]float32</code></p></td>
   </tr>
</table>

## column.ColumnInt16

This is a struct type. You can use the `NewColumnInt16` method to implement an **Int16** field.

### NewColumnInt16

This method creates an **Int16** field. The signature of this method is as follows:

```go
func NewColumnInt16(name string, values []int16) *ColumnInt16
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>name</code></p></td>
     <td><p>Name of the field to create.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>values</code></p></td>
     <td><p>Data to be inserted into the field.</p></td>
     <td><p><code>[]int16</code></p></td>
   </tr>
</table>

## column.ColumnInt16Array

This is a struct type. You can use the `NewColumnInt16Array` method to implement an **Array** field with elements of the **Int16** type.

### NewColumnInt16Array

This method creates an **Array** field with elements of the **Int16** type. The signature of this method is as follows:

```go
func NewColumnInt16Array(fieldName string, data [][]int16) *ColumnInt16Array
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>fieldName</code></p></td>
     <td><p>Name of the field to create.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>data</code></p></td>
     <td><p>Data to be inserted into the field.</p></td>
     <td><p><code>[][]int16</code></p></td>
   </tr>
</table>

## column.ColumnInt32

This is a struct type. You can use the `NewColumnInt32` method to implement an **Int32** field.

### NewColumnInt32

This method creates an **Int32** field. The signature of this method is as follows:

```go
func NewColumnInt32(name string, values []int32) *ColumnInt32
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>name</code></p></td>
     <td><p>Name of the field to create.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>values</code></p></td>
     <td><p>Data to be inserted into the field.</p></td>
     <td><p><code>[]int32</code></p></td>
   </tr>
</table>

## column.ColumnInt32Array

This is a struct type. You can use the `NewColumnInt32Array` method to implement an **Array** field with elements of the **Int32** type.

### NewColumnInt32Array

This method creates an **Array** field with elements of the **Int32** type. The signature of this method is as follows:

```go
func NewColumnInt32Array(fieldName string, data [][]int32) *ColumnInt32Array
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>fieldName</code></p></td>
     <td><p>Name of the field to create.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>data</code></p></td>
     <td><p>Data to be inserted into the field.</p></td>
     <td><p><code>[][]int32</code></p></td>
   </tr>
</table>

## column.ColumnInt64

This is a struct type. You can use the `NewColumnInt64` method to implement an **Int64** field.

### NewColumnInt64

This method creates an **Int64** field. The signature of this method is as follows:

```go
func NewColumnInt64(name string, values []int16) *ColumnInt64
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>name</code></p></td>
     <td><p>Name of the field to create.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>values</code></p></td>
     <td><p>Data to be inserted into the field.</p></td>
     <td><p><code>[]int64</code></p></td>
   </tr>
</table>

## column.ColumnInt64Array

This is a struct type. You can use the `NewColumnInt64Array` method to implement an **Array** field with elements of the **Int64** type.

### NewColumnInt64Array

This method creates an **Array** field with elements of the **Int64** type. The signature of this method is as follows:

```go
func NewColumnInt64Array(fieldName string, data [][]int64) *ColumnInt64Array
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>fieldName</code></p></td>
     <td><p>Name of the field to create.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>data</code></p></td>
     <td><p>Data to be inserted into the field.</p></td>
     <td><p><code>[][]int64</code></p></td>
   </tr>
</table>

## column.ColumnInt8

This is a struct type. You can use the `NewColumnInt8` method to implement an **Int8** field.

### NewColumnInt8

This method creates an **Int8** field. The signature of this method is as follows:

```go
func NewColumnInt8(name string, values []int8) *ColumnInt8
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>name</code></p></td>
     <td><p>Name of the field to create.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>values</code></p></td>
     <td><p>Data to be inserted into the field.</p></td>
     <td><p><code>[]int8</code></p></td>
   </tr>
</table>

## column.ColumnInt8Array

This is a struct type. You can use the `NewColumnInt8Array` method to implement an **Array** field with elements of the **Int8** type.

### NewColumnInt8Array

This method creates an **Array** field with elements of the **Int8** type. The signature of this method is as follows:

```go
func NewColumnInt8Array(fieldName string, data [][]int8) *ColumnInt8Array
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>fieldName</code></p></td>
     <td><p>Name of the field to create.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>data</code></p></td>
     <td><p>Data to be inserted into the field.</p></td>
     <td><p><code>[][]int8</code></p></td>
   </tr>
</table>

## column.ColumnJSONBytes

This is a struct type. You can use the `NewColumnJSONBytes` method to implement a **JSON** field.

### NewColumnJSONBytes

This method creates a **JSON** field. The signature of this method is as follows:

```go
func NewColumnJSONBytes(name string, values [][]byte) *ColumnJSONBytes
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>name</code></p></td>
     <td><p>Name of the field to create.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>values</code></p></td>
     <td><p>Data to be inserted into the field.</p></td>
     <td><p><code>[][]byte</code></p></td>
   </tr>
</table>

## column.ColumnSparseFloatVector

This is a struct type. You can use the `NewColumnSparseVectors` method to implement a **SparseFloatVector** field.

### NewColumnSparseVectors

This method creates a **SparseFloatVector** field with a list of byte sublists as data. The signature of this method is as follows:

```go
func NewColumnSparseVectors(name string, values []entity.SparseEmbedding) *ColumnSparseFloatVector
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>name</code></p></td>
     <td><p>Name of the field to create.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>values</code></p></td>
     <td><p>Data to be inserted into the field.</p></td>
     <td><p><code>[]entity.SparseEmbedding</code></p></td>
   </tr>
</table>

## column.ColumnVarChar

This is a struct type. You can use the `NewColumnVarChar` method to implement a **VarChar** field.

### NewColumnVarChar

This method creates a **VarChar** field. The signature of this method is as follows:

```go
func NewColumnVarChar(name string, values []string) *ColumnVarChar
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>name</code></p></td>
     <td><p>Name of the field to create.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>values</code></p></td>
     <td><p>Data to be inserted into the field.</p></td>
     <td><p><code>[]string</code></p></td>
   </tr>
</table>

## column.ColumnVarCharArray

This is a struct type. You can use the `NewColumnVarCharArray` method to implement an **Array** field with elements of the **VarChar** type.

### NewColumnVarCharArray

This method creates an **Array** field with elements of the **VarChar** type. The signature of this method is as follows:

```go
func NewColumnVarCharArray(fieldName string, data [][]string) *ColumnVarCharArray
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>fieldName</code></p></td>
     <td><p>Name of the field to create.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>data</code></p></td>
     <td><p>Data to be inserted into the field.</p></td>
     <td><p><code>[][]string</code></p></td>
   </tr>
</table>

## column.NullableColumnCreateFunc

This is an interface type. The `NullableColumnCreator` struct type implements this interface type. You can use `NewNullableColumnCreator()` method to get the concrete implementation.

### NewNullableColumnCreator

The signature of this method is as follows:

```go
func NewNullableColumnCreator[col interface {
    Column
    withValidData([]bool)
}, T any](base func(name string, values []T) col) NullableColumnCreator[col, T]
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>col</code></p></td>
     <td><p>A column interface.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>T</code></p></td>
     <td><p>Data type.</p></td>
     <td><p><code>any</code></p></td>
   </tr>
</table>

You can chain the following methods to get a nullable column.

- [New()](Insert.md#new)

### New

The signature of this method is as follows:

```go
func (c NullableColumnCreator[col, T]) New(name string, values []T, validData []bool) (col, error)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>name</code></p></td>
     <td><p>Name of the nullable field.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>values</code></p></td>
     <td><p>Data in this nullable field</p></td>
     <td><p><code>[]T</code></p></td>
   </tr>
   <tr>
     <td><p><code>validData</code></p></td>
     <td><p>Valid data</p></td>
     <td><p><code>[]bool</code></p></td>
   </tr>
</table>

## entity.SparseEmbedding

This is an interface type. You can use the `NewSliceSparseEmbedding` function to get the concrete implementation.

### NewSliceSparseEmbedding

The signature is as follows:

```go
func NewSliceSparseEmbedding(positions []uint32, values []float32) (SparseEmbedding, error)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>positions</code></p></td>
     <td><p>Position indexes of the elements in the <code>values</code>.</p></td>
     <td><p><code>[]uint32</code></p></td>
   </tr>
   <tr>
     <td><p><code>values</code></p></td>
     <td><p>Vector embeddings in a list of float32 numbers.</p></td>
     <td><p><code>[]float32</code></p></td>
   </tr>
</table>

## InsertResult

The `InsertResult` struct type is as follows:

```go
type InsertResult struct {
    InsertCount int64
    IDs         column.Column
}
```

## Return

`InsertResult`

## Example

```plaintext
resp, err := cli.Insert(ctx, milvusclient.NewColumnBasedInsertOption("quick_setup").
    WithInt64Column("id", []int64{1, 2, 3, 4, 5, 6, 7, 8, 9}).
    WithVarcharColumn("color", []string{"pink_8682", "red_7025", "orange_6781", "pink_9298", "red_4794", "yellow_4222", "red_9392", "grey_8510", "white_9381", "purple_4976"}).
    WithFloatVectorColumn("vector", 5, [][]float32{
        {0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592},
        {0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104},
        {0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592},
        {0.3172005263489739, 0.9719044792798428, -0.36981146090600725, -0.4860894583077995, 0.95791889146345},
        {0.4452349528804562, -0.8757026943054742, 0.8220779437047674, 0.46406290649483184, 0.30337481143159106},
        {0.985825131989184, -0.8144651566660419, 0.6299267002202009, 0.1206906911183383, -0.1446277761879955},
        {0.8371977790571115, -0.015764369584852833, -0.31062937026679327, -0.562666951622192, -0.8984947637863987},
        {-0.33445148015177995, -0.2567135004164067, 0.8987539745369246, 0.9402995886420709, 0.5378064918413052},
        {0.39524717779832685, 0.4000257286739164, -0.5890507376891594, -0.8650502298996872, -0.6140360785406336},
        {0.5718280481994695, 0.24070317428066512, -0.3737913482606834, -0.06726932177492717, -0.6980531615588608},
    }),
)
if err != nil {
    // handle err
}
fmt.Println(resp)
```
