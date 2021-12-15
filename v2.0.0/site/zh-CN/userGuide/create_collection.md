---
id: create_collection.md
related_key: create collection
summary: Learn how to create a collection in Milvus.
---

# Create a Collection

This topic describes how to create a collection in Milvus.

A collection consists of one or more partitions. While creating a new collection, Milvus creates a default partition `_default`. See [Glossary - Collection](glossary.md#Collection) for more information.

The following example is based on a two-shard collection named `example_collection` with an eight-dimensional float vector field, and an INT64, `auto_id` enabled primary key field.


## Prepare Schema

<div class="alert note">
    <ul>
        <li>You can create collections only after <a href="manage_connection.md">connecting to Milvus server</a>.</li>
        <li>The collection to create must contain a primary key field. INT64 is the only supported data type for the primary key field in current release of Milvus.</li>
    </ul>
</div>


First, prepare necessary parameters, including field schema, collection schema, and collection name.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node.js</a>
  <a href="?cli">CLI</a>
</div>


```python
from pymilvus import CollectionSchema, FieldSchema, DataType
pk = FieldSchema(
    name="pk", 
    dtype=DataType.INT64, 
    is_primary=True, 
    auto_id=True
    )
field = FieldSchema(
    name="example_field", 
    dtype=DataType.FLOAT_VECTOR, 
    dim=8
    )
schema = CollectionSchema(
    fields=[pk,field], 
    description="example collection"
    )
collection_name = "example_collection"
```

```javascript
const params = {
  collection_name: "example_collection",
  description: "example collection",
  fields: [
    {
      name: "example_field",
      description: "",
      data_type: 101,     // DataType.FloatVector
      type_params: {
        dim: "8",
      },
    },
    {
      name: "pk",
      data_type: 5,       // DataType.Int64
      autoID: true,
      is_primary_key: true,
      description: "",
    },
  ],
};
```

```cli
create collection -c example_collection -f pk:INT64 -f vector:FLOAT_VECTOR:8 -p pk
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
            <td><code>FieldSchema</code></td>
            <td>Schema of the fields within the collection to create. Refer to <a href="field_schema.md">Field Schema</a> for more information.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>name</code></td>
            <td>Name of the field to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>dtype</code></td>
            <td>Data type of the field to create.</td>
            <td>For primary key field:
                <ul>
                    <li><code>INT64</code> (numpy.int64)</li>
                </ul>
                For scalar field:
                <ul>
                    <li><code>BOOL</code> (Boolean)</li>
                    <li><code>INT64</code> (numpy.int64)</li>
                    <li><code>FLOAT</code> (numpy.float32)</li>
                    <li><code>DOUBLE</code> (numpy.double)</li>
                </ul>
                For vector field:
                <ul>
                    <li><code>BINARY_VECTOR</code> (Binary vector)</li>
                    <li><code>FLOAT_VECTOR</code> (Float vector)</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><code>is_primary</code> (Mandatory for primary key field)</td>
            <td>Switch to control if the field is primary key field.</td>
            <td><code>True</code> or <code>False</code></td>
        </tr>
        <tr>
            <td><code>auto_id</code></td>
            <td>Switch to enable or disable Automatic ID (primary key) allocation.</td>
            <td><code>True</code> or <code>False</code></td>
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
            <td><code>CollectionSchema</code></td>
        <td>Schema of the collection to create. Refer to <a href="collection_schema.md">Collection Schema</a> for more information.</td>
        </tr>
        <tr>
            <td><code>fields</code></td>
            <td>Fields of the collection to create.</td>
        </tr>
        <tr>
            <td><code>description</code> (Optional)</td>
            <td>Description of the collection to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>collection_name</code></td>
            <td>Name of the collection to create.</td>
        </tr>
	</tbody>
</table>


<table class="language-javascript">
	<thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
            <th>Option</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td><code>collection_name</code></td>
            <td>Name of the collection to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>description</code></td>
            <td>Description of the collection to create.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>fields</code></td>
            <td>Schema of the filed and the collection to create.</td>
            <td>Refer to <a href="field_schema.md">Field Schema</a> and <a href="collection_schema.md">Collection Schema</a> for more information.</td>
        </tr>
        <tr>
            <td><code>data_type</code></td>
            <td>Data type of the filed to create.</td>
            <td>Refer to <a href="https://github.com/milvus-io/milvus-sdk-node/blob/main/milvus/types/Common.ts">data type reference number</a> for more information.</td>
        </tr>
        <tr>
            <td><code>is_primary</code> (Mandatory for primary key field)</td>
            <td>Switch to control if the field is primary key field.</td>
            <td><code>True</code> or <code>False</code></td>
        </tr>
        <tr>
            <td><code>auto_id</code></td>
            <td>Switch to enable or disable Automatic ID (primary key) allocation.</td>
            <td><code>True</code> or <code>False</code></td>
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
	</tbody>
</table>

<table class="language-cli">
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
            <td>The field schema in the    ```<fieldName>:<dataType>:<dimOfVector/desc>``` format.</td>
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

## Create a collection with the schema

Then, create a collection with the schema you created above.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node.js</a>
  <a href="?cli">CLI</a>
</div>


```python
from pymilvus import Collection
collection = Collection(name=collection_name, schema=schema, using='default', shards_num=2)
```

```javascript
await milvusClient.collectionManager.createCollection(params);
```

```cli
# Follow the previous step.
```

<table class="language-python">
	<thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td><code>using</code> (optional)</td>
            <td>By specifying the server alias here, you can choose in which Milvus server you create a collection.</td>
        </tr>
        <tr>
            <td><code>shards_num</code> (optional)</td>
            <td>Number of the shards for the collection to create.</td>
        </tr>
    </tbody>
</table>


## What's next

- Learn more basic operations of Milvus:
  - [Insert data into Milvus](insert_data.md)
  - [Create a partition](create_partition.md)
  - [Build an index for vectors](build_index.md)
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)
- Explore API references for Milvus SDKs:
  - [PyMilvus API reference](/api-reference/pymilvus/v2.0.0rc8/tutorial.html)
  - [Node.js API reference](/api-reference/node/v1.0.19/tutorial.html)

