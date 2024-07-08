---
id: import-data.md
order: 1
title: Import Data
summary: This page demonstrates the procedure to import the prepared data.
---

# Import data

This page demonstrates the procedure to import the prepared data.

## Before you start

- You have already prepared your data and placed it into the Milvus bucket. 

    If not, you should use **RemoteBulkWriter** to prepare your data first, and ensure that the prepared data has already been transferred to the Milvus bucket on the MinIO instance started along with your Milvus instance. For details, refer to [Prepare Source Data](prepare-source-data.md).

- You have already created a collection with the schema you use to prepare your data. If not, refer to [Manage Collections](manage-collections.md). 

<div class="language-python">

The following code snippet creates a simple collection with the given schema. For more information on parameters, refer to [`create_schema()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md) and [`create_collection()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md) in the SDK reference.

</div>

<div class="language-java">

The following code snippet creates a simple collection with the given schema. For more information on parameters, refer to [`createCollection()`](https://milvus.io/api-reference/java/v2.4.x/v1/Collection/createCollection.md) in the SDK reference.

</div>

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
</div>

```python
client = MilvusClient("http://localhost:19530")

schema = MilvusClient.create_schema(
    auto_id=False,
    enable_dynamic_field=True
)

schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="vector", datatype=DataType.FLOAT_VECTOR, dim=768)
schema.add_field(field_name="scalar_1", datatype=DataType.VARCHAR, max_length=512)
schema.add_field(field_name="scalar_2", datatype=DataType.INT64)

client.create_collection(
    collection_name="quick_setup",
    schema=schema
)
```

```java
import io.milvus.client.MilvusServiceClient;
import io.milvus.param.ConnectParam;
import io.milvus.grpc.DataType;
import io.milvus.param.collection.CollectionSchemaParam;
import io.milvus.param.collection.CollectionSchemaParam;
import io.milvus.param.collection.FieldType;

final MilvusServiceClient milvusClient = new MilvusServiceClient(
ConnectParam.newBuilder()
    .withUri("localhost:19530")
    .withToken("root:Milvus")
    .build()
);

// Define schema for the target collection
FieldType id = FieldType.newBuilder()
    .withName("id")
    .withDataType(DataType.Int64)
    .withPrimaryKey(true)
    .withAutoID(false)
    .build();

FieldType vector = FieldType.newBuilder()
    .withName("vector")
    .withDataType(DataType.FloatVector)
    .withDimension(768)
    .build();

FieldType scalar1 = FieldType.newBuilder()
    .withName("scalar_1")
    .withDataType(DataType.VarChar)
    .withMaxLength(512)
    .build();

FieldType scalar2 = FieldType.newBuilder()
    .withName("scalar_2")
    .withDataType(DataType.Int64)
    .build();

CollectionSchemaParam schema = CollectionSchemaParam.newBuilder()
    .withEnableDynamicField(true)
    .addFieldType(id)
    .addFieldType(vector)
    .addFieldType(scalar1)
    .addFieldType(scalar2)
    .build();

// Create a collection with the given schema
milvusClient.createCollection(CreateCollectionParam.newBuilder()
    .withCollectionName("quick_setup")
    .withSchema(schema)
    .build()
);
```

## Import data

To import the prepared data, you have to create an import job as follows:

```
export MILVUS_URI="localhost:19530"

curl --request POST "http://${MILVUS_URI}/v2/vectordb/jobs/import/create" \
--header "Content-Type: application/json" \
--data-raw '{
    "files": [
        [
            "/8ca44f28-47f7-40ba-9604-98918afe26d1/1.parquet"
        ],
        [
            "/8ca44f28-47f7-40ba-9604-98918afe26d1/2.parquet"
        ]
    ],
    "collectionName": "quick_setup"
}'
```

The request body contains two fields:

- `collectionName`

    The name of the target collection.

- `files`

    A list of lists of file paths relative to the root path of the Milvus bucket on the MioIO instance started along with your Milvus instance. Possible sub-lists are as follows:

    - **JSON files**

        If the prepared file is in JSON format, **each sub-list should contain the path to a single prepared JSON file**.

        ```
        [
            "/d1782fa1-6b65-4ff3-b05a-43a436342445/1.json"
        ],
        ```

    - **Parquet files**

        If the prepared file is in Parquet format, **each sub-list should contain the path to a single prepared parquet file**.

        ```
        [
            "/a6fb2d1c-7b1b-427c-a8a3-178944e3b66d/1.parquet"
        ]

The possible return is as follows:

```
{
    "code": 200,
    "data": {
        "jobId": "448707763884413158"
    }
}
```

## Check import progress

Once you get an import job ID, you can check the import progress as follows:

```
export MILVUS_URI="localhost:19530"

curl --request POST "http://${MILVUS_URI}/v2/vectordb/jobs/import/get_progress" \
--header "Content-Type: application/json" \
--data-raw '{
    "jobId": "449839014328146739"
}'
```

The possible response is as follows:

```
{
    "code": 200,
    "data": {
        "collectionName": "quick_setup",
        "completeTime": "2024-05-18T02:57:13Z",
        "details": [
            {
                "completeTime": "2024-05-18T02:57:11Z",
                "fileName": "id:449839014328146740 paths:\"/8ca44f28-47f7-40ba-9604-98918afe26d1/1.parquet\" ",
                "fileSize": 31567874,
                "importedRows": 100000,
                "progress": 100,
                "state": "Completed",
                "totalRows": 100000
            },
            {
                "completeTime": "2024-05-18T02:57:11Z",
                "fileName": "id:449839014328146741 paths:\"/8ca44f28-47f7-40ba-9604-98918afe26d1/2.parquet\" ",
                "fileSize": 31517224,
                "importedRows": 100000,
                "progress": 100,
                "state": "Completed",
                "totalRows": 200000            
            }
        ],
        "fileSize": 63085098,
        "importedRows": 200000,
        "jobId": "449839014328146739",
        "progress": 100,
        "state": "Completed",
        "totalRows": 200000
    }
}
```

## List Import Jobs

You can list all import jobs relative to a specific collection as follows:

```
export MILVUS_URI="localhost:19530"

curl --request POST "http://${MILVUS_URI}/v2/vectordb/jobs/import/list" \
--header "Content-Type: application/json" \
--data-raw '{
    "collectionName": "quick_setup"
}'
```

The possible values are as follows:

```
{
    "code": 200,
    "data": {
        "records": [
            {
                "collectionName": "quick_setup",
                "jobId": "448761313698322011",
                "progress": 50,
                "state": "Importing"
            }
        ]
    }
}
```
