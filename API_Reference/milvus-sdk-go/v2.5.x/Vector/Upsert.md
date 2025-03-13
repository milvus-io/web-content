# Upsert()

This method updates or inserts data in a specific collection.

```go
func (c *Client) Upsert(ctx context.Context, option UpsertOption, callOptions ...grpc.CallOption) (UpsertResult, error)
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
     <td><p><code>UpsertOption</code></p></td>
   </tr>
   <tr>
     <td><p><code>callOptions</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## UpsertOption

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

- [WithColumns](Upsert.md)

- [WithBoolColumn](Upsert.md)

- [WithInt8Column](Upsert.md)

- [WithInt16Column](Upsert.md)

- [WithInt32Column](Upsert.md)

- [WithInt64Column](Upsert.md)

- [WithVarcharColumn](Upsert.md)

- [WithFloatVectorColumn](Upsert.md)

- [WithFloat16VectorColumn](Upsert.md)

- [WithBFloat16VectorColumn](Upsert.md)

- [WithBinaryVectorColumn](Upsert.md)

- [WithPartition](Upsert.md)

## UpsertResult

The `UpsertResult` struct type is as follows:

```go
type UpsertResult struct {
    UpsertCount int64
    IDs         column.Column
}
```

## Return

`UpsertResult`

## Example

```plaintext
resp, err := cli.Upsert(ctx, milvusclient.NewColumnBasedInsertOption("quick_setup").
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
