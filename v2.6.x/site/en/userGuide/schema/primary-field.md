---
id: primary-field.md
title: "Primary Field & AutoID"
summary: "The primary field uniquely identifies an entity. This page introduces how to add the primary field of two different data types and how to enable Milvus to automatically allocate primary field values."
---

# Primary Field & AutoID

The primary field uniquely identifies an entity. This page introduces how to add the primary field of two different data types and how to enable Milvus to automatically allocate primary field values.

## Overview

In a collection, the primary key of each entity should be globally unique. When adding the primary field, you need to explicitly set its data type to **VARCHAR** or **INT64**. Setting its data type to **INT64** indicates that the primary keys should be an integer similar to `12345`; Setting its data type to **VARCHAR** indicates that the primary keys should be a string similar to `my_entity_1234`.

You can also enable **AutoID** to make Milvus automatically allocate primary keys for incoming entities. Once you have enabled **AutoID** in your collection, do not include primary keys when inserting entities.

The primary field in a collection does not have a default value and cannot be null.

## Use Int64 Primary Keys

To use primary keys of the Int64 type, you need to set `datatype` to `DataType.INT64` and set `is_primary` to `true`. If you also need Milvus to allocate the primary keys for the incoming entities, also set `auto_id` to `true`.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient, DataType

schema = MilvusClient.create_schema()

schema.add_field(
    field_name="my_id",
    datatype=DataType.INT64,
    # highlight-start
    is_primary=True,
    auto_id=True,
    # highlight-end
)
```

```java
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq; 
import io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.CollectionSchema schema = client.createSchema();

schema.addField(AddFieldReq.builder()
        .fieldName("my_id")
        .dataType(DataType.Int64)
        // highlight-start
        .isPrimaryKey(true)
        .autoID(true)
        // highlight-end
        .build());
);
```

```javascript
import { DataType } from "@zilliz/milvus2-sdk-node";

const schema = [
  {
    name: "pk",
    description: "ID field",
    data_type: DataType.INT64,
    is_primary_key: true,
    max_length: 100,
  },
];
```

```go
import "github.com/milvus-io/milvus/client/v2/entity"

schema := entity.NewSchema()
schema.WithField(entity.NewField().WithName("my_id").
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(true).
    WithIsAutoID(true),
)
```

```bash
export primaryField='{
    "fieldName": "my_id",
    "dataType": "Int64",
    "isPrimary": true
}'

export schema="{
    \"autoID\": true,
    \"fields\": [
        $primaryField
    ]
}"
```

## Use VarChar Primary Keys

To use VarChar primary keys, in addition to changing the value of the `data_type` parameter to `DataType.VARCHAR`, you also need to set the `max_length` parameter for the field. 

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
schema.add_field(
    field_name="my_id",
    datatype=DataType.VARCHAR,
    # highlight-start
    is_primary=True,
    auto_id=True,
    max_length=512,
    # highlight-end
)
```

```java
schema.addField(AddFieldReq.builder()
        .fieldName("my_id")
        .dataType(DataType.VarChar)
        // highlight-start
        .isPrimaryKey(true)
        .autoID(true)
        .maxLength(512)
        // highlight-end
        .build());
```

```javascript
schema.push({
    name: "my_id",
    data_type: DataType.VarChar,
    // highlight-start
    is_primary_key: true,
    autoID: true,
    maxLength: 512
    // highlight-end
});
```

```go
schema := entity.NewSchema()
schema.WithField(entity.NewField().WithName("my_id").
    WithDataType(entity.FieldTypeVarChar).
    // highlight-start
    WithIsPrimaryKey(true).
    WithIsAutoID(true).
    WithMaxLength(512),
    // highlight-end
)
```

```bash
export primaryField='{
    "fieldName": "my_id",
    "dataType": "VarChar",
    "isPrimary": true
}'

export schema="{
    \"autoID\": true,
    \"fields\": [
        $primaryField
    ],
    \"params\": {
        \"max_length\": 512
    }
}"
```

