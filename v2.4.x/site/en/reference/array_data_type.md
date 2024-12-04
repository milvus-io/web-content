---
id: array_data_type.md
title: Use Array Fields
---

# Use Array Fields

This guide explains how to use the array fields, such as inserting array values, creating indexes on vector and array fields, as well as searching and querying in array fields with basic and advanced operators.

## Prerequisites

Ensure you have the following:

- Milvus installed and running. For information on how to install Milvus, refer to [Install Milvus](install-overview.md).
- One of Milvus SDKs installed in your environment. For details, refer to [Install SDKs](install-pymilvus.md).

## Prepare data with an array field

Milvus supports arrays as one of the field data types. An array in a Milvus collection should always have elements of the same data type, and the data type for array elements can be any of the supported data types in Milvus. For a list of supported data types, refer to [Supported data types](https://milvus.io/docs/schema.md#Supported-data-types).

The following code snippet generates a random dataset containing an array field named `color_coord`, with all elements of the interger data type.

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
import random

colors = ["green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey"]
data = []

for i in range(1000):
    current_color = random.choice(colors)
    current_tag = random.randint(1000, 9999)
    current_coord = [ random.randint(0, 40) for _ in range(random.randint(3, 5)) ]
    data.append({
        "id": i,
        "vector": [ random.uniform(-1, 1) for _ in range(5) ],
        "color": current_color,
        "color_tag": current_tag,
        "color_coord": current_coord,
    })

print(data[0])
```

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import java.util.*;

List<String> colors = Arrays.asList("green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey");
List<JsonObject> data = new ArrayList<>();

Gson gson = new Gson();
Random rand = new Random();
for (int i=0; i<1000; i++) {
    String current_color = colors.get(rand.nextInt(colors.size()-1));
    Integer current_tag = rand.nextInt(8999) + 1000;

    // Generate an random-sized array
    int capacity = rand.nextInt(5) + 1;
    List<Integer> current_coord = new ArrayList<>();
    for (int j=0; j<capacity; j++) {
        current_coord.add(rand.nextInt(40));
    }

    JsonObject row = new JsonObject();
    row.addProperty("id", (long) i);
    row.add("vector", gson.toJsonTree(Arrays.asList(rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat())));
    row.addProperty("color", current_color);
    row.addProperty("color_tag", current_tag);
    row.add("color_coord", gson.toJsonTree(current_coord));
    data.add(row);
}

System.out.println(data.get(0));
```

```javascript
const colors = ["green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey"];
let data = [];

for (let i = 0; i < 1000; i++) {
    const current_color = colors[Math.floor(Math.random() * colors.length)];
    const current_tag = Math.floor(Math.random() * 8999 + 1000);
    const current_coord = Array(Math.floor(Math.random() * 5 + 1)).fill(0).map(() => Math.floor(Math.random() * 40));

    data.push({
        id: i,
        vector: Array(5).fill(0).map(() => Math.random()),
        color: current_color,
        color_tag: current_tag,
        color_coord: current_coord,
    });
}

console.log(data[0]);
```

This code snippet prepares a list of random colors and generates a dataset containing 1,000 entities. Each entity has an ID, a vector of five floating-point numbers, a color, a color tag, and an array field `color_coord` containing between 3 to 5 integer values. The sample data is printed to verify its structure.

Output structure:

```json
{
    id: 0,
    vector: [
        0.0338537420906162,
        0.6844108238358322,
        0.28410588909961754,
        0.09752595400212116,
        0.22671013058761114
    ],
    color: 'orange',
    color_tag: 5677,
    color_coord: [ 3, 0, 18, 29 ]
}
```

## Set up MilvusClient

To interact with Milvus, set up the Milvus client by specifying the server address.

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
from pymilvus import MilvusClient, DataType

SERVER_ADDR = "http://localhost:19530"

client = MilvusClient(uri=SERVER_ADDR)
```

```java
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.*;
import io.milvus.v2.service.index.request.CreateIndexReq;
import io.milvus.v2.service.vector.request.*;
import io.milvus.v2.service.vector.response.*;

String SERVER_ADDR = "http://localhost:19530";

// 1. Connect to Milvus server
ConnectConfig connectConfig = ConnectConfig.builder()
    .uri(SERVER_ADDR)
    .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);
```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

// Connect to Milvus server
const address = "http://localhost:19530";

const milvusClient = new MilvusClient({address: address});
```

## Create a collection with an array field

### Define collection schema

A schema defines the structure of the collection, including the fields and their data types. The example below defines a collection schema matching the sample data generated in the [previous section](#prepare-data-with-an-array-field).

To configure an array field in a collection:

<div class="language-python">

1. Set the `datatype`: Configure it as `DataType.ARRAY`.
2. Specify the `element_type`: Choose the data type for the elements in the array. Elements in an array field should all have the same data type. In this example, the `element_type` is set to `DataType.INT64`.
3. Define the `max_capacity`: Set this parameter to specify the maximum number of elements the array field can hold.

</div>

<div class="language-java">

1. Set the `dataType`: Configure it as `DataType.Array`.
2. Specify the `elementType`: Choose the data type for the elements in the array. Elements in an array field should all have the same data type. In this example, the `elementType` is set to `DataType.Int64`.
3. Define the `maxCapacity`: Set this parameter to specify the maximum number of elements the array field can hold.

</div>

<div class="language-javascript">

1. Set the `data_type`: Configure it as `DataType.Array`.
2. Specify the `element_type`: Choose the data type for the elements in the array. Elements in an array field should all have the same data type. In this example, the `element_type` is set to `DataType.Int64`.
3. Define the `max_capacity`: Set this parameter to specify the maximum number of elements the array field can hold.

</div>

The example code below defines the collection schema with an array field `color_coord`, with a maximum of 5 elements and each element of the integer data type.

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
schema = client.create_schema(auto_id=False, enable_dynamic_field=False)

schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="vector", datatype=DataType.FLOAT_VECTOR, dim=5)
schema.add_field(field_name="color", datatype=DataType.VARCHAR, max_length=512)
schema.add_field(field_name="color_tag", datatype=DataType.INT64)
schema.add_field(field_name="color_coord", datatype=DataType.ARRAY, element_type=DataType.INT64, max_capacity=5)
```

```java
// Create schema
CreateCollectionReq.CollectionSchema schema = client.createSchema();

// Add fields to schema
schema.addField(AddFieldReq.builder()
        .fieldName("id")
        .dataType(DataType.Int64)
        .isPrimaryKey(true)
        .autoID(false)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("vector")
        .dataType(DataType.FloatVector)
        .dimension(5)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("color")
        .dataType(DataType.VarChar)
        .maxLength(512)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("color_tag")
        .dataType(DataType.Int64)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("color_coord")
        .dataType(DataType.Array)
        .elementType(DataType.Int64)
        .maxCapacity(5)
        .build());
```

```javascript
const fields = [
    {
        name: "id",
        data_type: DataType.Int64,
        is_primary_key: true,
        auto_id: false
    },
    {
        name: "vector",
        data_type: DataType.FloatVector,
        dim: 5
    },
    {
        name: "color",
        data_type: DataType.VarChar,
        max_length: 512
    },
    {
        name: "color_tag",
        data_type: DataType.Int64,
    },
    {
        name: "color_coord",
        data_type: DataType.Array,
        element_type: DataType.Int64,
        max_capacity: 5
    }
];
```

<div class="language-python">

For more information on methods and parameters, refer to [create_schema](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md) and [add_field](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md).

</div>

<div class="language-java">

For more information on methods and parameters, refer to [createSchema](https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createSchema.md) and [addField](https://milvus.io/api-reference/java/v2.4.x/v2/CollectionSchema/addField.md).

</div>

<div class="language-javascript">

For more information on methods and parameters, refer to [createCollection](https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md).

</div>

### Create the collection

Then, create the collection using the defined schema.

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
client.create_collection(collection_name="test_collection", schema=schema)
client.list_collections()

# Output:
# ['test_collection']
```

```java
CreateCollectionReq customizedSetupReq = CreateCollectionReq.builder()
    .collectionName("test_collection")
    .collectionSchema(schema)
    .build();

client.createCollection(customizedSetupReq);
```

```javascript
await client.createCollection({
    collection_name: "test_collection",
    fields: fields
});

const res = await client.listCollections({collection_name: "test_collection"});

console.log("Existing collections: " + res.collection_names);

// Output:
// Existing collections: test_collection
```

<div class="language-python">

For more information on methods and parameters, refer to [create_collection](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md) and [list_collections](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/list_collections.md).

</div>

<div class="language-java">

For more information on methods and parameters, refer to [createCollection](https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md).

</div>

<div class="language-javascript">

For more information on methods and parameters, refer to [createCollection](https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md) and [listCollections](https://milvus.io/api-reference/node/v2.4.x/Collections/listCollections.md).

</div>

## Create indexes

Indexes improve the performance of search and query operations. In Milvus, you can create indexes on both vector fields and scalar fields. In this example, we'll create an `IVF_FLAT` index on the vector field `vector` and an `INVERTED` index on the array field `color_coord`. For more information on indexes, refer to [Index Vector Fields](https://milvus.io/docs/index-vector-fields.md?tab=floating) and [Index Scalar Fields](https://milvus.io/docs/index-scalar-fields.md).

### Index vector field

Creating an index on a vector field can improve the performance of vector similarity search, which is necessary for each search operation.

The example below creates an index of type `IVF_FLAT` on the vector field `vector`.

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
index_params = client.prepare_index_params()

index_params.add_index(
    field_name="vector",
    metric_type="COSINE",
    index_type="IVF_FLAT",
    index_name="vector_index",
    params={"nlist": 128}
)

client.create_index(collection_name="test_collection", index_params=index_params)
client.describe_index(collection_name="test_collection", index_name="vector_index")

# Output:
# {'nlist': '128',
#  'index_type': 'IVF_FLAT',
#  'metric_type': 'COSINE',
#  'field_name': 'vector',
#  'index_name': 'vector_index'}
```

```java
IndexParam indexParam = IndexParam.builder()
        .metricType(IndexParam.MetricType.COSINE)
        .indexType(IndexParam.IndexType.IVF_FLAT)
        .fieldName("vector")
        .indexName("vector_index")
        .build();
CreateIndexReq createIndexReq = CreateIndexReq.builder()
        .collectionName("test_collection")
        .indexParams(Collections.singletonList(indexParam))
        .build();
client.createIndex(createIndexReq);
```

```javascript
await client.createIndex({
    collection_name: "test_collection",
    field_name: "vector",
    index_type: "IVF_FLAT",
    metric_type: "COSINE",   
    index_name: "vector_index",
    params: { "nlist": 128 }
});

res = await client.describeIndex({
    collection_name: "test_collection",
    index_name: "vector_index"
});

console.log("Vector index description: " + JSON.stringify(res));

// Output:
// Vector index description: {"index_descriptions":[{"params":[{"key":"params","value":"{\"nlist\":128}"},{"key":"index_type","value":"IVF_FLAT"},{"key":"metric_type","value":"COSINE"}],"index_name":"vector_index","indexID":"451543183233666062","field_name":"vector","indexed_rows":"0","total_rows":"0","state":"Finished","index_state_fail_reason":"","pending_index_rows":"0"}],"status":{"extra_info":{},"error_code":"Success","reason":"","code":0,"retriable":false,"detail":""}}
```

<div class="language-python">

For more information on methods and parameters, refer to [prepare_index_params](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/prepare_index_params.md), [create_index](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/create_index.md), and [describe_index](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/describe_index.md).

</div>

<div class="language-java">

For more information on methods and parameters, refer to [IndexParam](https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md) and [createIndex](https://milvus.io/api-reference/java/v2.4.x/v2/Management/createIndex.md).

</div>

<div class="language-javascript">

For more information on methods and parameters, refer to [createIndex](https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md), and [describeIndex](https://milvus.io/api-reference/node/v2.4.x/Management/describeIndex.md).

</div>

### Index array field

Creating an index on a scalar field can improve the retrieval performance of queries on that field, which is optional but recommended for large datasets.

In this example, we'll create an inverted index on the `color_coord` array field. This will allow us to speed up filtering based on this field. The inverted index demonstrates excellent overall performance, significantly outperforming brute force filtering using raw data when data is not frequently retrieved, and maintaining comparable performance with frequent retrieval operations. For more information on inverted indexes, refer to [Scalar Index](scalar_index.md#Inverted-indexing).

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
index_params = client.prepare_index_params()

index_params.add_index(
    field_name="color_coord",
    index_type="INVERTED",
    index_name="inverted_index"
)

client.create_index(collection_name="test_collection", index_params=index_params)
client.describe_index(collection_name="test_collection", index_name="inverted_index")

# Output:
# {'index_type': 'INVERTED',
#  'field_name': 'color_coord',
#  'index_name': 'inverted_index'}
```

```java
indexParam = IndexParam.builder()
        .indexType(IndexParam.IndexType.INVERTED)
        .fieldName("color_coord")
        .indexName("inverted_index")
        .build();
createIndexReq = CreateIndexReq.builder()
        .collectionName("test_collection")
        .indexParams(Collections.singletonList(indexParam))
        .build();
client.createIndex(createIndexReq);
```

```javascript
await client.createIndex({
    collection_name: "test_collection",
    field_name: "color_coord",
    index_type: "INVERTED",
    index_name: "inverted_index"
});

res = await client.describeIndex({
    collection_name: "test_collection",
    index_name: "inverted_index"
});

console.log("Array index description: " + JSON.stringify(res));

// Output:
// Array index description: {"index_descriptions":[{"params":[{"key":"index_type","value":"INVERTED"}],"index_name":"inverted_index","indexID":"451543183233667243","field_name":"color_coord","indexed_rows":"0","total_rows":"0","state":"Finished","index_state_fail_reason":"","pending_index_rows":"0"}],"status":{"extra_info":{},"error_code":"Success","reason":"","code":0,"retriable":false,"detail":""}}
```

<div class="language-python">

For more information on methods and parameters, refer to [prepare_index_params](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/prepare_index_params.md), [create_index](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/create_index.md), and [describe_index](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/describe_index.md).

</div>

<div class="language-java">

For more information on methods and parameters, refer to [IndexParam](https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md) and [createIndex](https://milvus.io/api-reference/java/v2.4.x/v2/Management/createIndex.md).

</div>

<div class="language-javascript">

For more information on methods and parameters, refer to [createIndex](https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md), and [describeIndex](https://milvus.io/api-reference/node/v2.4.x/Management/describeIndex.md).

</div>

## Insert data

Once the collection and indexes are created, we can insert the data into the collection. This step inserts 1,000 entities into the `test_collection`.

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
res = client.insert(collection_name="test_collection", data=data)
print(res)

# Output:
# {'insert_count': 1000, 'ids': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512, 513, 514, 515, 516, 517, 518, 519, 520, 521, 522, 523, 524, 525, 526, 527, 528, 529, 530, 531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549, 550, 551, 552, 553, 554, 555, 556, 557, 558, 559, 560, 561, 562, 563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573, 574, 575, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 587, 588, 589, 590, 591, 592, 593, 594, 595, 596, 597, 598, 599, 600, 601, 602, 603, 604, 605, 606, 607, 608, 609, 610, 611, 612, 613, 614, 615, 616, 617, 618, 619, 620, 621, 622, 623, 624, 625, 626, 627, 628, 629, 630, 631, 632, 633, 634, 635, 636, 637, 638, 639, 640, 641, 642, 643, 644, 645, 646, 647, 648, 649, 650, 651, 652, 653, 654, 655, 656, 657, 658, 659, 660, 661, 662, 663, 664, 665, 666, 667, 668, 669, 670, 671, 672, 673, 674, 675, 676, 677, 678, 679, 680, 681, 682, 683, 684, 685, 686, 687, 688, 689, 690, 691, 692, 693, 694, 695, 696, 697, 698, 699, 700, 701, 702, 703, 704, 705, 706, 707, 708, 709, 710, 711, 712, 713, 714, 715, 716, 717, 718, 719, 720, 721, 722, 723, 724, 725, 726, 727, 728, 729, 730, 731, 732, 733, 734, 735, 736, 737, 738, 739, 740, 741, 742, 743, 744, 745, 746, 747, 748, 749, 750, 751, 752, 753, 754, 755, 756, 757, 758, 759, 760, 761, 762, 763, 764, 765, 766, 767, 768, 769, 770, 771, 772, 773, 774, 775, 776, 777, 778, 779, 780, 781, 782, 783, 784, 785, 786, 787, 788, 789, 790, 791, 792, 793, 794, 795, 796, 797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 810, 811, 812, 813, 814, 815, 816, 817, 818, 819, 820, 821, 822, 823, 824, 825, 826, 827, 828, 829, 830, 831, 832, 833, 834, 835, 836, 837, 838, 839, 840, 841, 842, 843, 844, 845, 846, 847, 848, 849, 850, 851, 852, 853, 854, 855, 856, 857, 858, 859, 860, 861, 862, 863, 864, 865, 866, 867, 868, 869, 870, 871, 872, 873, 874, 875, 876, 877, 878, 879, 880, 881, 882, 883, 884, 885, 886, 887, 888, 889, 890, 891, 892, 893, 894, 895, 896, 897, 898, 899, 900, 901, 902, 903, 904, 905, 906, 907, 908, 909, 910, 911, 912, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 930, 931, 932, 933, 934, 935, 936, 937, 938, 939, 940, 941, 942, 943, 944, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 970, 971, 972, 973, 974, 975, 976, 977, 978, 979, 980, 981, 982, 983, 984, 985, 986, 987, 988, 989, 990, 991, 992, 993, 994, 995, 996, 997, 998, 999], 'cost': 0}
```

```java
InsertReq insertReq = InsertReq.builder()
    .collectionName("test_collection")
    .data(data)
    .build();

InsertResp insertResp = client.insert(insertReq);
```

```javascript
res = await client.insert({
    collection_name: "test_collection",
    data: data
});

console.log(`Inserted ${res.insert_cnt} entities`);

// Output:
// Inserted 1000 entities
```

## Load the collection

After inserting data, we need to load the collection to make it available for search and query operations.

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
client.load_collection('test_collection')
```

```java
LoadCollectionReq loadCollectionReq = LoadCollectionReq.builder()
        .collectionName("test_collection")
        .build();
client.loadCollection(loadCollectionReq);
```

```javascript
await client.loadCollection({
    collection_name: "test_collection"
});

res = await client.getLoadState({
    collection_name: "test_collection"
});

console.log("Collection load state: " + res.state);

// Output:
// Collection load state: LoadStateLoaded
```

## Basic scalar filtering

Once all of your data has been added, you can conduct searches and queries using the elements in the array field in the same manner as you would with a standard scalar field.

<div class="language-python">

For more information on parameters, refer to [`search()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md) in the SDK reference.

</div>

<div class="language-java">

For more information on parameters, refer to [`search()`](https://milvus.io/api-reference/java/v2.4.x/v2/Vector/search.md) in the SDK reference.

</div>

<div class="language-javascript">

For more information on parameters, refer to [`search()`](https://milvus.io/api-reference/node/v2.4.x/Vector/search.md) in the SDK reference.

</div>

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
# 4. Basic search with the array field
query_vectors = [ [ random.uniform(-1, 1) for _ in range(5) ]]

res = client.search(
    collection_name="test_collection",
    data=query_vectors,
    filter="color_coord[0] < 10",
    search_params={
        "metric_type": "COSINE",
        "params": {"nprobe": 16}
    },
    output_fields=["id", "color", "color_tag", "color_coord"],
    limit=3
)

print(res)

# Output:
# data: ["[{'id': 918, 'distance': 0.974249541759491, 'entity': {'color_coord': [4, 34, 9, 18, 29], 'id': 918, 'color': 'purple', 'color_tag': 2940}}, {'id': 822, 'distance': 0.9177230000495911, 'entity': {'color_coord': [7, 36, 32], 'id': 822, 'color': 'red', 'color_tag': 8519}}, {'id': 981, 'distance': 0.9116519689559937, 'entity': {'color_coord': [7, 16, 40, 32, 32], 'id': 981, 'color': 'pink', 'color_tag': 2992}}]"] , extra_info: {'cost': 0}
```

```java
// 4. Basic search with an Array field
QueryReq queryReq = QueryReq.builder()
        .collectionName("test_collection")
        .filter("color_coord[0] in [7, 8, 9]")
        .outputFields(Arrays.asList("id", "color", "color_tag", "color_coord"))
        .limit(3L)
        .build();

QueryResp queryResp = client.query(queryReq);

System.out.println(queryResp.getQueryResults());

// Output:
// [
//	QueryResp.QueryResult(entity={color=black, color_tag=6107, id=8, color_coord=[8, 19, 31, 10]}), 
//	QueryResp.QueryResult(entity={color=blue, color_tag=3252, id=11, color_coord=[7, 16, 1]}),
//	QueryResp.QueryResult(entity={color=blue, color_tag=3069, id=16, color_coord=[9, 16, 19]})
// ]
```

```javascript
const query_vectors = [Array(5).fill(0).map(() => Math.random())];

res = await client.search({
    collection_name: "test_collection",
    data: query_vectors,
    filter: "color_coord[0] < 10",
    output_fields: ["id", "color", "color_tag", "color_coord"],
    limit: 3,
    metric_type: "COSINE"
});

console.log("Search result: " + JSON.stringify(res));

// Output:
// Search result: [
//     {
//         "score": 0.9969238042831421,
//         "id": "212",
//         "color": "green",
//         "color_tag": "5603",
//         "color_coord": [
//             "9",
//             "14",
//             "22",
//             "4",
//             "35"
//         ]
//     },
//     {
//         "score": 0.9952742457389832,
//         "id": "339",
//         "color": "yellow",
//         "color_tag": "8867",
//         "color_coord": [
//             "8",
//             "0",
//             "6",
//             "19",
//             "23"
//         ]
//     },
//     {
//         "score": 0.9944050312042236,
//         "id": "24",
//         "color": "red",
//         "color_tag": "7686",
//         "color_coord": [
//             "6",
//             "17",
//             "6",
//             "32"
//         ]
//     }
// ]
```

## Advanced filtering

As what we have in a JSON field, Milvus also provides advanced filtering operators for arrays, namely `ARRAY_CONTAINS`, `ARRAY_CONTAINS_ALL`, `ARRAY_CONTAINS_ANY`, and `ARRAY_LENGTH`. For more information on operators, refer to [Reference on array filters](#reference-on-array-filters).

- Filters all entities having a `10` in their `color_coord` values.

    <div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    </div>
    
    ```python
    # 5. Advanced query within the array field

    res = client.query(
        collection_name="test_collection",
        filter="ARRAY_CONTAINS(color_coord, 10)",
        output_fields=["id", "color", "color_tag", "color_coord"],
        limit=3
    )

    print(res)

    # Output:
    # data: ["{'id': 2, 'color': 'green', 'color_tag': 3676, 'color_coord': [26, 37, 30, 10]}", "{'id': 28, 'color': 'red', 'color_tag': 4735, 'color_coord': [30, 10, 40, 34]}", "{'id': 32, 'color': 'green', 'color_tag': 8816, 'color_coord': [10, 9, 24, 39]}"] , extra_info: {'cost': 0}
    ```

    ```java
    // 5. Advanced query within an Array field
    queryReq = QueryReq.builder()
            .collectionName("test_collection")
            .filter("ARRAY_CONTAINS(color_coord, 10)")
            .outputFields(Arrays.asList("id", "color", "color_tag", "color_coord"))
            .limit(3)
            .build();

    queryResp = client.query(queryReq);

    System.out.println(queryResp.getQueryResults());

    // Output:
    // [
	//    QueryResp.QueryResult(entity={color=black, color_tag=6107, id=8, color_coord=[8, 19, 31, 10]}), 
	//    QueryResp.QueryResult(entity={color=brown, color_tag=7727, id=17, color_coord=[1, 10, 16, 29]}), 
	//    QueryResp.QueryResult(entity={color=orange, color_tag=8128, id=26, color_coord=[10, 16, 3, 3]})
    // ]
    ```    

    ```javascript
    // 5. Advanced search within the array field
    res = await client.search({
        collection_name: "test_collection",
        data: query_vectors,
        filter: "ARRAY_CONTAINS(color_coord, 10)",
        output_fields: ["id", "color", "color_tag", "color_coord"],
        limit: 3
    })

    console.log(JSON.stringify(res.results, null, 4))

    // Output
    // 
    // [
    //     {
    //         "score": 1.7962548732757568,
    //         "id": "696",
    //         "color": "red",
    //         "color_tag": "1798",
    //         "color_coord": [
    //             "33",
    //             "10",
    //             "37"
    //         ]
    //     },
    //     {
    //         "score": 1.7126177549362183,
    //         "id": "770",
    //         "color": "red",
    //         "color_tag": "1962",
    //         "color_coord": [
    //             "21",
    //             "23",
    //             "10"
    //         ]
    //     },
    //     {
    //         "score": 1.6707111597061157,
    //         "id": "981",
    //         "color": "yellow",
    //         "color_tag": "3100",
    //         "color_coord": [
    //             "28",
    //             "39",
    //             "10",
    //             "6"
    //         ]
    //     }
    // ]
    // 
    ```    

- Filters all entities having a `7` and an `8` in their `color_coord` values.

    <div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    </div>

    ```python
    res = client.query(
        collection_name="test_collection",
        filter="ARRAY_CONTAINS_ALL(color_coord, [7, 8])",
        output_fields=["id", "color", "color_tag", "color_coord"],
        limit=3
    )

    print(res)

    # Output:
    # data: ["{'id': 147, 'color': 'brown', 'color_tag': 1287, 'color_coord': [7, 8, 11, 0]}", "{'id': 257, 'color': 'white', 'color_tag': 3641, 'color_coord': [2, 8, 31, 7]}", "{'id': 280, 'color': 'orange', 'color_tag': 1072, 'color_coord': [22, 7, 8]}"] , extra_info: {'cost': 0}
    ```

    ```java
    queryReq = QueryReq.builder()
            .collectionName("test_collection")
            .filter("ARRAY_CONTAINS_ALL(color_coord, [7, 8])")
            .outputFields(Arrays.asList("id", "color", "color_tag", "color_coord"))
            .limit(3)
            .build();

    queryResp = client.query(queryReq);

    System.out.println(queryResp.getQueryResults());

    // Output:
    // [
    //	QueryResp.QueryResult(entity={color=blue, color_tag=6939, id=246, color_coord=[1, 8, 27, 7]}), 
    //	QueryResp.QueryResult(entity={color=brown, color_tag=6341, id=673, color_coord=[8, 7, 33, 20, 11]})
    // ]
    ```

    ```javascript
    res = await client.search({
        collection_name: "test_collection",
        data: query_vectors,
        filter: "ARRAY_CONTAINS_ALL(color_coord, [7, 8])",
        output_fields: ["id", "color", "color_tag", "color_coord"],
        limit: 3
    })

    console.log(JSON.stringify(res.results, null, 4))

    // Output
    // 
    // [
    //     {
    //         "score": 0.8267516493797302,
    //         "id": "913",
    //         "color": "brown",
    //         "color_tag": "8897",
    //         "color_coord": [
    //             "39",
    //             "31",
    //             "8",
    //             "29",
    //             "7"
    //         ]
    //     },
    //     {
    //         "score": 0.6889009475708008,
    //         "id": "826",
    //         "color": "blue",
    //         "color_tag": "4903",
    //         "color_coord": [
    //             "7",
    //             "25",
    //             "5",
    //             "12",
    //             "8"
    //         ]
    //     },
    //     {
    //         "score": 0.5851659774780273,
    //         "id": "167",
    //         "color": "blue",
    //         "color_tag": "1550",
    //         "color_coord": [
    //             "8",
    //             "27",
    //             "7"
    //         ]
    //     }
    // ]
    // 
    ```

- Filters all entities having either 7, 8, or 9 in their `color_coord` values.

    <div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    </div>

    ```python
    res = client.query(
        collection_name="test_collection",
        filter="ARRAY_CONTAINS_ANY(color_coord, [7, 8, 9])",
        output_fields=["id", "color", "color_tag", "color_coord"],
        limit=3
    )

    print(res)

    # Output:
    # data: ["{'id': 0, 'color': 'white', 'color_tag': 2081, 'color_coord': [16, 7, 35, 5, 25]}", "{'id': 1, 'color': 'purple', 'color_tag': 4669, 'color_coord': [11, 9, 15, 38, 21]}", "{'id': 3, 'color': 'yellow', 'color_tag': 2612, 'color_coord': [0, 12, 22, 7]}"] , extra_info: {'cost': 0}
    ```

    ```java
    queryReq = QueryReq.builder()
            .collectionName("test_collection")
            .filter("ARRAY_CONTAINS_ANY(color_coord, [7, 8, 9])")
            .outputFields(Arrays.asList("id", "color", "color_tag", "color_coord"))
            .limit(3)
            .build();

    queryResp = client.query(queryReq);

    System.out.println(queryResp.getQueryResults());

    // Output:
    // [
    //	QueryResp.QueryResult(entity={color=purple, color_tag=3687, id=1, color_coord=[22, 7, 29, 25]}), 
    //	QueryResp.QueryResult(entity={color=black, color_tag=6107, id=8, color_coord=[8, 19, 31, 10]}), 
    //	QueryResp.QueryResult(entity={color=blue, color_tag=3252, id=11, color_coord=[7, 16, 1]})
    // ]
    ```

    ```javascript
    res = await client.search({
        collection_name: "test_collection",
        data: query_vectors,
        filter: "ARRAY_CONTAINS_ANY(color_coord, [7, 8, 9])",
        output_fields: ["id", "color", "color_tag", "color_coord"],
        limit: 3
    })

    console.log(JSON.stringify(res.results, null, 4))

    // Output
    // 
    // [
    //     {
    //         "score": 2.015894889831543,
    //         "id": "260",
    //         "color": "green",
    //         "color_tag": "5320",
    //         "color_coord": [
    //             "1",
    //             "7",
    //             "33",
    //             "13",
    //             "23"
    //         ]
    //     },
    //     {
    //         "score": 1.783075213432312,
    //         "id": "593",
    //         "color": "orange",
    //         "color_tag": "4079",
    //         "color_coord": [
    //             "8",
    //             "19"
    //         ]
    //     },
    //     {
    //         "score": 1.7713876962661743,
    //         "id": "874",
    //         "color": "blue",
    //         "color_tag": "7029",
    //         "color_coord": [
    //             "14",
    //             "8",
    //             "15"
    //         ]
    //     }
    // ]
    // 
    ```   

- Filters entities that have exactly four elements.

    <div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    </div>

    ```python
    res = client.query(
        collection_name="test_collection",
        filter="ARRAY_LENGTH(color_coord) == 4",
        output_fields=["id", "color", "color_tag", "color_coord"],
        limit=3
    )

    print(res)

    # Output:
    # data: ["{'id': 2, 'color': 'green', 'color_tag': 3676, 'color_coord': [26, 37, 30, 10]}", "{'id': 3, 'color': 'yellow', 'color_tag': 2612, 'color_coord': [0, 12, 22, 7]}", "{'id': 4, 'color': 'green', 'color_tag': 6912, 'color_coord': [4, 5, 19, 28]}"] , extra_info: {'cost': 0}
    ```

    ```java
    queryReq = QueryReq.builder()
            .collectionName("test_collection")
            .filter("ARRAY_LENGTH(color_coord) == 4")
            .outputFields(Arrays.asList("id", "color", "color_tag", "color_coord"))
            .limit(3)
            .build();

    queryResp = client.query(queryReq);

    System.out.println(queryResp.getQueryResults()); 

    // Output:
    // [
    //	QueryResp.QueryResult(entity={color=purple, color_tag=3687, id=1, color_coord=[22, 7, 29, 25]}),
    //	QueryResp.QueryResult(entity={color=yellow, color_tag=1990, id=3, color_coord=[26, 20, 15, 26]}),
    //	QueryResp.QueryResult(entity={color=purple, color_tag=3199, id=4, color_coord=[13, 19, 21, 30]})
    // ]
    ```   

    ```javascript
    res = await client.search({
    collection_name: "test_collection",
    data: query_vectors,
    filter: "ARRAY_LENGTH(color_coord) == 4",
    output_fields: ["id", "color", "color_tag", "color_coord"],
    limit: 3
    })

    console.log(JSON.stringify(res.results, null, 4))

    // Output
    // 
    // [
    //     {
    //         "score": 2.0404388904571533,
    //         "id": "439",
    //         "color": "orange",
    //         "color_tag": "7096",
    //         "color_coord": [
    //             "27",
    //             "34",
    //             "26",
    //             "39"
    //         ]
    //     },
    //     {
    //         "score": 1.9059759378433228,
    //         "id": "918",
    //         "color": "purple",
    //         "color_tag": "2903",
    //         "color_coord": [
    //             "28",
    //             "19",
    //             "36",
    //             "35"
    //         ]
    //     },
    //     {
    //         "score": 1.8385567665100098,
    //         "id": "92",
    //         "color": "yellow",
    //         "color_tag": "4693",
    //         "color_coord": [
    //             "1",
    //             "23",
    //             "2",
    //             "3"
    //         ]
    //     }
    // ]
    // 
    ```

## Limits

- Elements in an ARRAY field should be of the same data type, specified by `element_type`. Any valid data type available for scalar fields in Milvus can be used as `element_type`. For a list of supported data types, refer to [Supported data types](https://milvus.io/docs/schema.md#Supported-data-types).

- The number of elements in an ARRAY field should be less than or equal to the maximum capacity of the array field, specified by `max_capacity`.

## Reference on array filters

When working with array fields, you can enclose a string value with either double quotation marks ("") or single quotation marks (''). It's important to note that Milvus stores string values in the array field as is without performing semantic escape or conversion. For instance, **'a"b'**, **"a'b"**, **'a\'b'**, and **"a\"b"** will be saved as is, while **'a'b'** and **"a"b"** will be treated as invalid values.

Assume that two array fields `int_array` and `var_array` have been defined. The following table describes the supported boolean expressions that you can use in `expr` when searching with array fields.

| Operator          | Examples                                                          | Remarks                                                                                                                                                                           |
|-------------------|-------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <                 | <code>'int_array[0] < 3'</code>                                   | This expression evaluates to true if the value of <code>int_array[0]</code> is less than 3.                                                                                                    |
| >                 | <code>'int_array[0] > 5'</code>                                   | This expression evaluates to true if the value of <code>int_array[0]</code> is greater than 5.                                                                                                 |
| ==                | <code>'int_array[0] == 0'</code>                                  | This expression evaluates to true if the value of <code>int_array[0]</code> is equal to 0.                                                                                                     |
| !=                | <code>'var_array[0] != "a"'</code>                                | This expression evaluates to true if the value of <code>var_array[0]</code> is not equal to <code>"a"</code>.                                                                                                   |
| <=                | <code>'int_array[0] <= 3'</code>                                  | This expression evaluates to true if the value of <code>int_array[0]</code> is smaller than or equal to 3.                                                                                     |
| >=                | <code>'int_array[0] >= 10'</code>                                 | This expression evaluates to true if the value of <code>int_array[0]</code> is greater than or equal to 10.                                                                                    |
| in                | <code>'var_array[0] in ["str1", "str2"]'</code>                   | This expression evaluates to true if the value of <code>var_array[0]</code> is <code>"str1"</code> or <code>"str2"</code>.                                                                                               |
| not in            | <code>'int_array[0] not in [1, 2, 3]'</code>                      | This expression evaluates to true if the value of <code>int_array[0]</code> is not 1, 2, or 3.                                                                                                 |
| +, -, *, /, %, ** | <code>'int_array[0] + 100 > 200'</code>                           | This expression evaluates to true if the value of <code>int_array[0] + 100</code> is greater than 200.                                                                                         |
| like (LIKE)       | <code>'var_array[0] like "prefix%"'</code>                        | This expression evaluates to true if the value of <code>var_array[0]</code> is prefixed with <code>"prefix"</code>.                                                                                         |
| and (&&)          | <code>'var_array[0] like "prefix%" && int_array[0] <= 100'</code> | This expression evaluates to true if the value of <code>var_array[0]</code> is prefixed with <code>"prefix"</code>, and the value of <code>int_array[0]</code> is smaller than or equal to 100. |
| or (&#124;&#124;) | <code>'var_array[0] like "prefix%" &#124;&#124; int_array[0] <= 100'</code> | This expression evaluates to true if the value of <code>var_array[0]</code> is prefixed with <code>"prefix"</code>, or the value of <code>int_array[0]</code> is smaller than or equal to 100. |
| array_contains (ARRAY_CONTAINS) | <code>'array_contains(int_array, 100)'</code> | This expression evaluates to true if <code>int_array</code> contains element <code>100</code>. |
| array_contains_all (ARRAY_CONTAINS_ALL) | <code>'array_contains_all(int_array, [1, 2, 3])'</code> | This expression evaluates to true if <code>int_array</code> contains all elements <code>1</code>, <code>2</code>, and <code>3</code>. |
| array_contains_any (ARRAY_CONTAINS_ANY) | <code>'array_contains_any(var_array, ["a", "b", "c"])'</code> | This expression evaluates to true if <code>var_array</code> contains any element of <code>"a"</code>, <code>"b"</code>, and <code>"c"</code>. |
| array_length | <code>'array_length(int_array) == 10'</code> | This expression evaluates to true if <code>int_array</code> contains exactly 10 elements. |
