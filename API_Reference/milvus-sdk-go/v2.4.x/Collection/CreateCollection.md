# CreateCollection()

This method creates a collection with the specified schema.

```go
func (c *GrpcClient) CreateCollection(ctx context.Context, collSchema *entity.Schema, shardNum int32, opts ...CreateCollectionOption) error
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
     <td><p><code>collSchema</code></p></td>
     <td><p>Schema of the collection to create.</p></td>
     <td><p><code>*entity.Schema</code></p></td>
   </tr>
   <tr>
     <td><p><code>shardNum</code></p></td>
     <td><p>Shard number of the collection to create.</p><p>The value defaults to <code>1</code>. If it is left unspecified, the default value applies.</p></td>
     <td><p><code>int32</code></p></td>
   </tr>
   <tr>
     <td><p><code>opts</code></p></td>
     <td><p>Extra options for the current request.</p><p>This parameter is optional. You can add multiple <code>CreateCollectionOption</code> in the request.</p></td>
     <td><p><code>...entity.CreateCollectionOption</code></p></td>
   </tr>
</table>

A schema specifies the properties of a collection and the fields within it. For details, refer to Schema for more information.

### entity.Schema

You can create a schema using the `entity.NewSchema()` method as follows:

```go
schema := entity.NewSchema().
    WithName().                    // CollectionName
    WithDescription().             // Description
    WithAutoID().                  // AutoID
    WithField().                   // Field
    WithDynamicFieldEnabled()      // EnableDynamicField
```

<table>
   <tr>
     <th><p>Method</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>WithName(name string)</code></p></td>
     <td><p>Name of collection to create.</p></td>
   </tr>
   <tr>
     <td><p><code>WithDescription(description string)</code></p></td>
     <td><p>Description of the collection to create.</p></td>
   </tr>
   <tr>
     <td><p><code>WithAutoID(autoID bool)</code></p></td>
     <td><p>Whether the primary field is automatically generated upon data insertions.</p></td>
   </tr>
   <tr>
     <td><p><code>WithField(f *entity.Field)</code></p></td>
     <td><p>A field in the collection to create.</p><p>Call the method multiple types to add more fields.</p></td>
   </tr>
   <tr>
     <td><p><code>WithDynamicFieldEnabled(dynamicEnabled bool)</code></p></td>
     <td><p>Whether to enable the dynamic field for non-schema-defined fields.</p><p>Once enabled, non-schema-defined fields and their values are saved in the reserved JSON field named <strong>$meta</strong>.</p><p>As an alternative, you can use <code>entity.WithEnableDynamicSchema()</code> to create an <code>entity.CreateCollectionOption</code> instead.</p><p>If you assign different values to this method and <code>entity.WithEnableDynamicSchema()</code>, the one set to <code>true</code> takes precedence.</p></td>
   </tr>
</table>

### entity.Field

You can create a field using the `entity.NewField()` method as follows:

```go
field := entity.NewField().
    WithName().
    WithDescription().
    WithIsPrimaryKey().
    WithIsAutoID().
    WithDataType().
    WithDim().
    WithMaxLength().
    WithMaxCapacity().
    WithElementType().
    WithIsPartitionKey().
    WithIsDynamic()
```

<table>
   <tr>
     <th><p>Method</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>WithName(name string)</code></p></td>
     <td><p>The field name</p></td>
   </tr>
   <tr>
     <td><p><code>WithDescription(description string)</code></p></td>
     <td><p>The description of the field.</p></td>
   </tr>
   <tr>
     <td><p><code>WithIsPrimaryKey(isPrimaryKey bool)</code></p></td>
     <td><p>Whether the field is the primary field.</p></td>
   </tr>
   <tr>
     <td><p><code>WithIsAutoID(isAutoID bool)</code></p></td>
     <td><p>Whether the primary field value is automatically generated upon data insertions.</p><p>If this value is different from the one specified in <code>entity.Schema</code>, this value takes precedence.</p></td>
   </tr>
   <tr>
     <td><p><code>WithDataType(dataType entity.FieldType)</code></p></td>
     <td><p>The data type of the field.</p></td>
   </tr>
   <tr>
     <td><p><code>WithDim(dim int64)</code></p></td>
     <td><p>The dimensionality of a vector field.</p><p>This only applies when you set <code>dataType</code> to a vector field type in <code>WithDataType()</code>.</p></td>
   </tr>
   <tr>
     <td><p><code>WithMaxLength(maxLen int64)</code></p></td>
     <td><p>The maximum length of a VarChar field.</p><p>This only applies when you set <code>dataType</code> to <code>FieldTypeVarChar</code> in <code>WithDataType()</code>.</p></td>
   </tr>
   <tr>
     <td><p><code>WithMaxCapacity(maxCap int64)</code></p></td>
     <td><p>The maximum number of elements of an ARRAY field.</p><p>This only applies when you set <code>dataType</code> to <code>FieldTypeArray</code> in <code>WithDataType()</code>.</p></td>
   </tr>
   <tr>
     <td><p><code>WithElementType(eleType entity.FieldType)</code></p></td>
     <td><p>The maximum number of elements of an ARRAY field.</p><p>This only applies when you set <code>dataType</code> to <code>FieldTypeArray</code> in <code>WithDataType()</code>.</p></td>
   </tr>
   <tr>
     <td><p><code>WithIsPartitionKey(isPartitionKey bool)</code></p></td>
     <td><p>Whether this field is the partition key.</p></td>
   </tr>
   <tr>
     <td><p><code>WithIsDynamic(isDynamic bool)</code></p></td>
     <td><p>Whether this field serves as the dynamic field.</p></td>
   </tr>
   <tr>
     <td><p><code>WithTypeParams(key string, value string)</code></p></td>
     <td><p>Additional properties of the specified data type.</p></td>
   </tr>
</table>

### entity.FieldType

```go
const (
    // FieldTypeNone zero value place holder        
    FieldTypeNone FieldType = 0 // zero value place holder        
    // FieldTypeBool field type boolean        
    FieldTypeBool FieldType = 1
    // FieldTypeInt8 field type int8        
    FieldTypeInt8 FieldType = 2
    // FieldTypeInt16 field type int16        
    FieldTypeInt16 FieldType = 3
    // FieldTypeInt32 field type int32        
    FieldTypeInt32 FieldType = 4
    // FieldTypeInt64 field type int64        
    FieldTypeInt64 FieldType = 5
    // FieldTypeFloat field type float        
    FieldTypeFloat FieldType = 10
    // FieldTypeDouble field type double        
    FieldTypeDouble FieldType = 11
    // FieldTypeString field type string        
    FieldTypeString FieldType = 20
    // FieldTypeVarChar field type varchar        
    FieldTypeVarChar FieldType = 21 // variable-length strings with a specified maximum length        
    // FieldTypeArray field type Array        
    FieldTypeArray FieldType = 22
    // FieldTypeJSON field type JSON        
    FieldTypeJSON FieldType = 23
    // FieldTypeBinaryVector field type binary vector        
    FieldTypeBinaryVector FieldType = 100
    // FieldTypeFloatVector field type float vector        
    FieldTypeFloatVector FieldType = 101
    // FieldTypeBinaryVector field type float16 vector        
    FieldTypeFloat16Vector FieldType = 102
    // FieldTypeBinaryVector field type bf16 vector        
    FieldTypeBFloat16Vector FieldType = 103
    // FieldTypeBinaryVector field type sparse vector        
    FieldTypeSparseVector FieldType = 104
)
```

### entity.CreateCollectionOption

You can add extra collection settings to the `CreateCollection()` request using the following methods.

<table>
   <tr>
     <th><p>Method</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>WithCollectionProperty(key, value string)</code></p></td>
     <td><p>Collection properties, such as TTL and MMap-related settings.</p></td>
   </tr>
   <tr>
     <td><p><code>WithConsistencyLevel(cl entity.ConsistencyLevel)</code></p></td>
     <td><p>The consistency level of the collection. Possible options are:</p><ul><li><p><code>ClStrong</code></p></li><li><p><code>ClBounded</code>(default)</p></li><li><p><code>ClSession</code></p></li><li><p><code>ClEventually</code></p></li><li><p><code>ClCustomized</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p><code>WithEnableDynamicSchema(enable bool)</code></p></td>
     <td><p>Whether to enable the dynamic field for non-schema-defined fields.</p><p>Once enabled, non-schema-defined fields and their values are saved in the reserved JSON field named <strong>$meta</strong>.</p><p>As an alternative, you can append <code>WithDynamicFieldEnable(true)</code> to the <code>entity.NewSchema()</code> request instead.</p><p>If you assign different values to this method and <code>entity.WithDynamicFieldEnable()</code>, the one set to <code>true</code> takes precedence.</p></td>
   </tr>
   <tr>
     <td><p><code>WithPartitionNum(partitionNums int64)</code></p></td>
     <td><p>The number of partitions to create along with the collection. </p><p>This is required if a field has <code>isPartitionKey</code> set to <code>true</code> in <code>WithIsPartitionKey()</code>.</p></td>
   </tr>
</table>

## Return

Null

## Errors

Any error in the execution of the request. Possible errors are as follows:

- `ErrClientNotReady`: The client is not connected to Milvus.

- A collection with the same name already exists.

- The call to this API fails.

## Example

- default

```go
var collectionName = "test_01"
pkField := entity.NewField().WithName("id").WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(true)
varcharField := entity.NewField().WithName("varchar").WithDataType(entity.FieldTypeVarChar).WithTypeParams(entity.TypeParamMaxLength, "100")
vecField := entity.NewField().WithName("vector").WithDataType(entity.FieldTypeFloatVector).WithDim(768)
schema := entity.NewSchema().WithName(collectionName).WithField(pkField).WithField(varcharField).WithField(vecField)

errCreate := mc.CreateCollection(context.Background(), schema, 1, client.WithConsistencyLevel(entity.ClBounded))
if errCreate != nil {
   log.Fatal("failed to create collection:", errCreate.Error())
}
```

- Other vectors

```shell
var collectionName = "test_02"
pkField := entity.NewField().WithName("id").WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(true)
binaryField := entity.NewField().WithName("binary").WithDataType(entity.FieldTypeBinaryVector).WithDim(768)
fp16Field := entity.NewField().WithName("fp16").WithDataType(entity.FieldTypeFloat16Vector).WithDim(768)
bf16Field := entity.NewField().WithName("bf16").WithDataType(entity.FieldTypeBFloat16Vector).WithDim(768)
sparseField := entity.NewField().WithName("sparse").WithDataType(entity.FieldTypeSparseVector)
schema := entity.NewSchema().WithName(collectionName).WithField(pkField).WithField(binaryField).WithField(fp16Field).WithField(bf16Field).WithField(sparseField)

errCreate := mc.CreateCollection(context.Background(), schema, 1, client.WithConsistencyLevel(entity.ClBounded))
if errCreate != nil {
   log.Fatal("failed to create collection:", errCreate.Error())
}
```
