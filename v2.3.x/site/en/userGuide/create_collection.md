---
id: create_collection.md
related_key: create collection
summary: Learn how to create a collection in Milvus.
---

# Create a Collection

This topic describes how to create a collection in Milvus.

A collection consists of one or more partitions. While creating a new collection, Milvus creates a default partition `_default`. See [Glossary - Collection](glossary.md#Collection) for more information.

The following example builds a two-[shard](glossary.md#Sharding) collection named `book`, with a primary key field named `book_id`, an `INT64` scalar field named `word_count`, and a two-dimensional floating-point vector field named `book_intro`. Real applications will likely use much higher dimensional vectors than the example.

## Prepare Schema

<div class="alert note">
The collection to create must contain a primary key field and a vector field. INT64 and VarChar are supported data type on primary key field.
</div>

First, prepare necessary parameters, including the field schema, collection schema, and collection name.

Before defining a collection schema, create a schema for each field in the collection. To reduce the complexity in data inserts, Milvus allows you to specify a default value for each scalar field, excluding a primary key field. This indicates that if you leave a field empty when inserting data, the default value you configured for this field during field schema creation will be used.

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">Curl</a>
</div>

```python
from pymilvus import CollectionSchema, FieldSchema, DataType
book_id = FieldSchema(
  name="book_id",
  dtype=DataType.INT64,
  is_primary=True,
)
book_name = FieldSchema(
  name="book_name",
  dtype=DataType.VARCHAR,
  max_length=200,
  # The default value will be used if this field is left empty during data inserts or upserts.
  # The data type of `default_value` must be the same as that specified in `dtype`.
  default_value="Unknown"
)
word_count = FieldSchema(
  name="word_count",
  dtype=DataType.INT64,
  # The default value will be used if this field is left empty during data inserts or upserts.
  # The data type of `default_value` must be the same as that specified in `dtype`.
  default_value=9999
)
book_intro = FieldSchema(
  name="book_intro",
  dtype=DataType.FLOAT_VECTOR,
  dim=2
)
schema = CollectionSchema(
  fields=[book_id, book_name, word_count, book_intro],
  description="Test book search",
  enable_dynamic_field=True
)
collection_name = "book"
```

```javascript
import { DataType } from "@zilliz/milvus2-sdk-node";
const params = {
  collection_name: "book",
  description: "Test book search",
  fields: [
    {
      name: "book_intro",
      description: "",
      data_type: DataType.FloatVector,
      dim: 2,
    },
    {
      name: "book_id",
      data_type: DataType.Int64,
      is_primary_key: true,
      description: "",
    },
    {
      name: "book_name",
      data_type: DataType.VarChar,
      max_length: 256,
      description: "",
    },
    {
      name: "word_count",
      data_type: DataType.Int64,
      description: "",
    },
  ],
  enableDynamicField: true
};
```

```go
var (
    collectionName = "book"
)
schema := &entity.Schema{
  CollectionName: collectionName,
  Description:    "Test book search",
  Fields: []*entity.Field{
    {
      Name:       "book_id",
      DataType:   entity.FieldTypeInt64,
      PrimaryKey: true,
      AutoID:     false,
    },
    {
      Name:       "word_count",
      DataType:   entity.FieldTypeInt64,
      PrimaryKey: false,
      AutoID:     false,
    },
    {
      Name:     "book_intro",
      DataType: entity.FieldTypeFloatVector,
      TypeParams: map[string]string{
          "dim": "2",
      },
    },
  },
  EnableDynamicField: true,
}
```

```java
FieldType fieldType1 = FieldType.newBuilder()
        .withName("book_id")
        .withDataType(DataType.Int64)
        .withPrimaryKey(true)
        .withAutoID(false)
        .build();
FieldType fieldType2 = FieldType.newBuilder()
        .withName("word_count")
        .withDataType(DataType.Int64)
        .build();
FieldType fieldType3 = FieldType.newBuilder()
        .withName("book_intro")
        .withDataType(DataType.FloatVector)
        .withDimension(2)
        .build();
CreateCollectionParam createCollectionReq = CreateCollectionParam.newBuilder()
        .withCollectionName("book")
        .withDescription("Test book search")
        .withShardsNum(2)
        .addFieldType(fieldType1)
        .addFieldType(fieldType2)
        .addFieldType(fieldType3)
        .withEnableDynamicField(true)
        .build();
```

<div style="display: none">

```shell
create collection -c book -f book_id:INT64:book_id -f word_count:INT64:word_count -f book_intro:FLOAT_VECTOR:2 -p book_id
```

</div>

```curl
curl -X 'POST' \
  '${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/collections/create' \
  -H 'Authorization: Bearer ${TOKEN}' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
       "dbName": "default",   
       "collectionName": "medium_articles",
       "dimension": 256,
       "metricType": "L2",
       "primaryField": "id",
       "vectorField": "vector"
      }'
```

<div class="language-curl">
Output:

```json
{
    "code": 200,
    "data": {}
}
```

</div>

<table class="language-python">
	<thead>
        <tr>
            <th>Schema Type</th>
            <th>Parameter</th>
            <th>Description</th>
            <th>Option</th>
        </tr>
	</thead>
	<tbody>
        <tr><td rowspan="10"><code>FieldSchema</code></td>
            <td><code>name</code></td>
            <td>Name of the field to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>dtype</code></td>
            <td>Data type of the field to create.</td>
            <td>For primary key field:
                <ul>
                    <li><code>DataType.INT64</code> (numpy.int64)</li>
                    <li><code>DataType.VARCHAR</code> (VARCHAR)</li>
                </ul>
                For scalar field:
                <ul>
                    <li><code>DataType.BOOL</code> (Boolean)</li>
                    <li><code>DataType.INT8</code> (numpy.int8)</li>
                    <li><code>DataType.INT16</code> (numpy.int16)</li>
                    <li><code>DataType.INT32</code> (numpy.int32)</li>
                    <li><code>DataType.INT64</code> (numpy.int64)</li>
                    <li><code>DataType.FLOAT</code> (numpy.float32)</li>
                    <li><code>DataType.DOUBLE</code> (numpy.double)</li>
                    <li><code>DataType.VARCHAR</code> (VARCHAR)</li>
                    <li><code>DataType.JSON</code> (JSON) </li>
                    <li><code>DataType.ARRAY</code></li>
                </ul>
                For vector field:
                <ul>
                    <li><code>BINARY_VECTOR</code> (Binary vector)</li>
                    <li><code>FLOAT_VECTOR</code> (Float vector)</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><code>element_type</code> (Mandatory for ARRAY field)</td>
            <td>Data type of array elements to create. The data type of all elements in an array field must be the same.</td>
            <td>Valid values:
                <ul>
                    <li><code>DataType.Int8</code></li>
                    <li><code>DataType.Int16</code></li>
                    <li><code>DataType.Int32</code></li>
                    <li><code>DataType.Int64</code></li>
                    <li><code>DataType.VARCHAR</code></li>
                    <li><code>DataType.BOOL</code></li>
                    <li><code>DataType.FLOAT</code></li>
                    <li><code>DataType.DOUBLE</code></li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><code>is_primary</code></td>
            <td>Switch to control if the field is the primary key field. This parameter is mandatory for the primary key field.</td>
            <td><code>True</code> or <code>False</code></td>
        </tr>
        <tr>
            <td><code>auto_id</code></td>
            <td>Switch to enable or disable automatic ID (primary key) allocation. This parameter is mandatory for the primary key field and defaults to <code>False</code></td>
            <td><code>True</code> or <code>False</code></td>
        </tr>
        <tr>
            <td><code>max_length</code> (Mandatory for VARCHAR field)</td>
            <td>Maximum length of strings allowed to be inserted.</td>
            <td>[1, 65,535]</td>
        </tr>
        <tr>
            <td><code>max_capacity</code> (Mandatory for ARRAY field)</td>
            <td>Maximum number of elements allowed for an array field.</td>
            <td>[1, 4,096]</td>
        </tr>
        <tr>
            <td><code>default_value</code></td>
            <td>Default value of the field. This parameter is available only for non-array and non-JSON scalar fields. You cannot specify a default value for a primary key field. Refer to <a href="#parameter-default_value">Parameter default_value</a> for more information.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>dim</code> (Mandatory for vector field)</td>
            <td>Dimension of the vector.</td>
            <td>[1, 32,768]</td>
        </tr>
        <tr>
            <td><code>description</code> (Optional)</td>
            <td>Description of the field.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td rowspan="4"><code>CollectionSchema</code></td>
            <td><code>fields</code></td>
            <td>Fields of the collection to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>description</code> (Optional)</td>
            <td>Description of the collection to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>enable_dynamic_field</code></td>
            <td>Whether to enable dynamic schema or not</td>
            <td>Data type: Boolean (<code>true</code> or <code>false</code>).<br/>Optional, defaults to <code>False</code>.<br/>For details on dynamic schema, refer to <a herf="dynamic_schema.md">Dynamic Schema</a> and the user guides for managing collections.</td>
            </tr>
        <tr>
            <td><code>collection_name</code></td>
            <td>Name of the collection to create.</td>
            <td>N/A</td>
        </tr>
	</tbody>
</table>

<table class="language-go">
	<thead>
        <tr>
            <th>Type</th>
            <th>Parameter</th>
            <th>Description</th>
            <th>Option</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td rowspan="5"><code>entity.Schema</code></td>
            <td><code>CollectionName</code></td>
            <td>Name of the collection to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>Description</code></td>
            <td>Description of the collection to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>AutoID</code></td>
            <td>Switch to enable or disable Automatic ID (primary key) allocation.</td>
            <td><code>True</code> or <code>False</code></td>
        </tr>
        <tr>
            <td><code>Fields</code></td>
            <td>Schema of the fields within the collection to create. Refer to <a href="schema.md">Schema</a> for more information.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>EnableDynamicField</code></td>
            <td>Whether to enable dynamic schema or not. For details on dynamic schema, refer to <a herf="dynamic_schema.md">Dynamic Schema</a> and the user guides for managing collections.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td rowspan="9"><code>entity.Field</code></td>
            <td><code>Name</code></td>
            <td>Name of the field to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>PrimaryKey</code></td>
            <td>Whether this field is the primary key. This is mandatory for the primary key.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>AutoID</code></td>
            <td>Whether this field value automatically increments. This is mandatory for the primary key.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>Description</code></td>
            <td>Description of the field.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>DataType</code></td>
            <td>Data type of the field to create.</td>
            <td>For primary key field:
                <ul>
                    <li><code>entity.FieldTypeInt64 (numpy.int64)</code></li>
                    <li><code>entity.FieldTypeVarChar (VARCHAR)</code></li>
                </ul>
                For scalar field:
                <ul>
                    <li><code>entity.FieldTypeBool (Boolean)</code></li>
                    <li><code>entity.FieldTypeInt8 (numpy.int8)</code></li>
                    <li><code>entity.FieldTypeInt16 (numpy.int16)</code></li>
                    <li><code>entity.FieldTypeInt32 (numpy.int32)</code></li>
                    <li><code>entity.FieldTypeInt64 (numpy.int64)</code></li>
                    <li><code>entity.FieldTypeFloat (numpy.float32)</code></li>
                    <li><code>entity.FieldTypeDouble (numpy.double)</code></li>
                    <li><code>entity.FieldTypeVarChar (VARCHAR)</code></li>
                </ul>
                For vector field:
                <ul>
                    <li><code>entity.FieldTypeBinaryVector</code> (Binary vector)</li>
                    <li><code>entity.FieldTypeFloatVector</code> (Float vector)</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><code>TypeParams</code></td>
            <td>A string mapping to set parameters for a specific data type.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>IndexParams</code></td>
            <td>A string mapping to set parameters for the index of the collection.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>IsDynamic</code></td>
            <td>Whether dynamic schema is enabled on this field.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>IsPartitionKey</code></td>
            <td>Whether this field acts as the partition key.</td>
            <td>N/A</td>
        </tr>
	</tbody>
</table>

<table class="language-javascript">
	<thead>
        <tr>
            <th>Interface</th>
            <th>Parameter</th>
            <th>Description</th>
            <th>Option</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td rowspan="8"><code>CreateCollectionReq</code></td>
            <td><code>collection_name</code></td>
            <td>Name of the collection to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>shards_num</code></td>
            <td>Number of shards to create along with the collection.</td>
            <td>[1, 16]</td>
        </tr>
        <tr>
            <td><code>description</code></td>
            <td>Description of the collection to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>consistency_level</code></td>
            <td>Consistency level of the collection. For details, refer to [Consistency Level](consistency.md)</td>
            <td>Possible values are as follows:<ul>
                <li><code>Strong</code></li>
                <li><code>Session</code></li>
                <li><code>Bounded</code></li>
                <li><code>Eventually</code></li>
                <li><code>Customized</code></li>
            </td>
        </tr>
        <tr>
            <td><code>fields</code></td>
            <td>Schema of the field and the collection to create.</td>
            <td>Refer to <a href="schema.md">Schema</a> for more information.</td>
        </tr>
        <tr>
            <td><code>num_partitions</code></td>
            <td>Number of parititions to create along within the collection.</td>
            <td>[1, 4096]</td>
        </tr>
        <tr>
            <td><code>partition_key_field</code></td>
            <td>Name of the field that is designed to act as the partiion key. For details, refer to [Use Partition Key](partition_key.md)</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>enable_dynamic_field</code> | <code>enableDynamicField</code></td>
            <td>Whether to enable dynamic schema for this collection.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td rowspan="10"><code>FieldType</code></td>
            <td><code>name</code></td>
            <td>Name of the field.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>description</code></td>
            <td>Description of the field.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>data_type</code> | <code>DataType</code></td>
            <td>Data type of the filed to create.</td>
            <td>Refer to <a href="https://github.com/milvus-io/milvus-sdk-node/blob/main/milvus/const/Milvus.ts#L287">data type reference number</a> for more information.</td>
        </tr>
        <tr>
            <td><code>is_primary_key</code></td>
            <td>Switch to control if the field is primary key field. This is mandatory for the parimary key.</td>
            <td><code>true</code> or <code>false</code></td>
        </tr>
        <tr>
            <td><code>is_partition_key</code></td>
            <td>Switch to control if the field acts as the partition key.</td>
            <td><code>true</code> or <code>false</code></td>
        </tr>
        <tr>
            <td><code>is_dynamic</code></td>
            <td>Switch to control if the field is a dynamic field.</td>
            <td><code>true</code> or <code>false</code></td>
        </tr>
        <tr>
            <td><code>autoID</code></td>
            <td>Switch to enable or disable Automatic ID (primary key) allocation.</td>
            <td><code>true</code> or <code>false</code></td>
        </tr>
        <tr>
            <td><code>dim</code></td>
            <td>Dimension of the vector. This is mandatory for a vector field.</td>
            <td>[1, 32768]</td>
        </tr>
        <tr>
            <td><code>max_length</code></td>
            <td>Dimension of the vector. This is mandatory for a string field.</td>
            <td>[1, 32768]</td>
        </tr>
        <tr>
            <td><code>default_value</code> (Optional)</td>
            <td>Default value that applies if not specified.</td>
            <td>N/A</td>
        </tr>
	</tbody>
</table>

<table class="language-java">
	<thead>
        <tr>
            <th>Class</th>
            <th>Parameter</th>
            <th>Description</th>
            <th>Option</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td rowspan="8"><code>CreateCollectionSchema.newBuilder()</code></td>
            <td><code>withCollectionName(String collectionName)</code></td>
            <td>Name of the collection to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>withDatabaseName(String databaseName)</code></td>
            <td>Name of the database in which the collection is to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>withShardsNum(int shardsNum)</code></td>
            <td>Number of shards to create along with the collection.</td>
            <td>[1, 16]</td>
        </tr>
        <tr>
            <td><code>withEnableDynamicField(boolean enableDynamicField)</code></td>
            <td>Whether to enable dynamic field for this collection.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>withDescription(boolean description)</code></td>
            <td>Description of this collection.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>withFieldTypes(List<FieldType> fieldType)</code></td>
            <td>Fields in this collection</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>withConsistencyLevel(ConsistencyLevelEnum consistencyLevel)</code></td>
            <td>Description of this collection.</td>
            <td>Possible values are as follows: <ul>
                <li><code>STRONG</code></li>
                <li><code>BOUNDED</code></li>
                <li><code>EVENTUALLY</code></li>
            </td>
        </tr>
        <tr>
            <td><code>withPartitionsNum(int partitionsNum)</code></td>
            <td>Number of partitions to create in this collection.</td>
            <td>[1, 4096]</td>
        </tr>
        <tr>
            <td rowspan="7"><code>FieldType.newBuilder()</code></td>
            <td><code>withName(String name)</code></td>
            <td>Name of the field to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>withIsDynamic(boolean isDynamic)</code></td>
            <td>Whether this field is a dynamic field.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>withPrimaryKey(boolean primaryKey)</code></td>
            <td>Whether this field is the primary key.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>withDescription(String description)</code></td>
            <td>Description of this field.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>withDataType(DataType datatype)</code></td>
            <td>Data type of the field to create.</td>
            <td>For primary key field:
                <ul>
                    <li><code>DataType.Int64</code> (numpy.int64)</li>
                    <li><code>DataType.VarChar</code> (VARCHAR)</li>
                </ul>
                For scalar field:
                <ul>
                    <li><code>DataType.Bool</code> (Boolean)</li>
                    <li><code>DataType.Int8</code> (numpy.int8)</li>
                    <li><code>DataType.Int16</code> (numpy.int16)</li>
                    <li><code>DataType.Int32</code> (numpy.int32)</li>
                    <li><code>DataType.Int64</code> (numpy.int64)</li>
                    <li><code>DataType.Float</code> (numpy.float32)</li>
                    <li><code>DataType.Double</code> (numpy.double)</li>
                    <li><code>DataType.VarChar</code> (VARCHAR)</li>
                </ul>
                For vector field:
                <ul>
                    <li><code>DataType.BinaryVector</code> (Binary vector)</li>
                    <li><code>DataType.FloatVector</code> (Float vector)</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><code>withAutoID(boolean autoId)</code></td>
            <td>Switch to enable or disable Automatic ID (primary key) allocation.</td>
            <td><code>True</code> or <code>False</code></td>
        </tr>
        <tr>
            <td><code>withDimension(int dimension)</code> (Mandatory for vector field)</td>
            <td>Dimension of the vector.</td>
            <td>[1, 32768]</td>
        </tr>
	</tbody>
</table>

<table class="language-shell" style="display: none">
    <thead>
        <tr>
            <th>Option</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>-c</td>
            <td>The name of the collection.</td>
        </tr>
        <tr>
            <td>-f (Multiple)</td>
            <td>The field schema in the <code>&lt;fieldName&gt;:&lt;dataType&gt;:&lt;dimOfVector/desc&gt;</code> format.</td>
        </tr>
        <tr>
            <td>-p</td>
            <td>The name of the primary key field.</td>
        </tr>
        <tr>
            <td>-a (Optional)</td>
            <td>Flag to generate IDs automatically.</td>
        </tr>
        <tr>
            <td>-d (Optional)</td>
            <td>The description of the collection.</td>
        </tr>
    </tbody>
</table>

<table class="language-curl">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
            <th>Option</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>dbName</code></td>
            <td>The name of the database to which the collection to create belongs to.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>collectionName</code></td>
            <td>(Required) The name of the collection to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>dimension</code></td>
            <td>(Required) The number of dimensions for the vector field of the collection.<br>The value ranges from <code>32</code> to <code>32768</code>.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>metricType</code></td>
            <td>The distance metric used for the collection.<br>The value defaults to <code>L2</code>.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>primaryField</code></td>
            <td>The name of the primary key field.<br>The value defaults to <code>id</code>.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>vectorField</code>(field)</td>
            <td>The name of the vector field.<br>The value defaults to <code>vector</code>.</td>
            <td>N/A</td>
        </tr>
    </tbody>
</table>

## Create a collection with the schema

Then, create a collection with the schema you specified above.

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
</div>

```python
from pymilvus import Collection
collection = Collection(
    name=collection_name,
    schema=schema,
    using='default',
    shards_num=2
    )
```

```javascript
await milvusClient.createCollection(params);
```

```go
err = milvusClient.CreateCollection(
    context.Background(), // ctx
    schema,
    2, // shardNum
)
if err != nil {
    log.Fatal("failed to create collection:", err.Error())
}
```

```java
milvusClient.createCollection(createCollectionReq);
```

<table class="language-python">
	<thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
            <th>Option</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td><code>using</code> (optional)</td>
            <td>By specifying the server alias here, you can choose in which Milvus server you create a collection.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>shards_num</code> (optional)</td>
            <td>Number of the shards for the collection to create.</td>
            <td>[1,16]</td>
        </tr>
        <tr>
            <td><code>num_partitions</code> (optional)</td>
            <td>Number of logical partitions for the collection to create.</td>
            <td>[1,4096]</td>
        </tr>
	    <tr>
            <td><code>*kwargs: collection.ttl.seconds</code> (optional)</td>
            <td>Collection time to live (TTL) is the expiration time of a collection. Data in an expired collection will be cleaned up and will not be involved in searches or queries. Specify TTL in the unit of seconds.</td>
            <td>The value should be 0 or greater. 0 means TTL is disabled.</td>
        </tr>
    </tbody>
</table>

<table class="language-go">
	<thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
            <th>Option</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td><code>ctx</code></td>
            <td>Context to control API invocation process.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>shardNum</code></td>
            <td>Number of the shards for the collection to create.</td>
            <td>[1,16]</td>
        </tr>
    </tbody>
</table>

## Limits

### Resource configuration

| Feature                              | Maximum limit  |
| ------------------------------------ | -------------- |
| Length of a collection name          | 255 characters |
| Number of partitions in a collection | 4,096          |
| Number of fields in a collection     | 64             |
| Number of shards in a collection     | 16            |

### Parameter `default_value`

- `default_value` is available only for non-array and non-JSON scalar fields.
- `default_value` does not apply to the primary key.
- The data type of `default_value` must be the same as that specified in `dtype`. Otherwise, an error can occur.
- In the case of using `auto_id`, it's not allowed to set all the remaining fields to use default values. That is, when performing insert or upsert operations, you need to specify values for at least one field. Otherwise, an error can occur.

## What's next

- Learn more basic operations of Milvus:
  - [Insert data into Milvus](insert_data.md)
  - [Create a partition](create_partition.md)
  - [Build an index for vectors](build_index.md)
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)
