# describeIndex()

This operation describes a specific index.

```java
public DescribeIndexResp describeIndex(DescribeIndexReq request)
```

## Request Syntax

```java
describeIndex(DescribeIndexReq.builder()
    .collectionName(String collectionName)
    .fieldName(String fieldName)
    .indexName(String indexName)
    .build()
)
```

**BUILDER METHODS:**

- `collectionName(String collectionName)`

    The name of an existing collection.

    Setting this to a non-existing collection results in **MilvusException**.

- `fieldName(String fieldName)`

    The name of the field on which the index is created.

- `indexName(String indexName)`

    The name of the index to describe.

    Setting this to a non-existing collection results in **MilvusException**.

**RETURN TYPE:** 

*DescribeIndexResp*

**RETURNS:**

A **DescribeIndexResp** object that contains the details of the specified index.

**PARAMETERS:**

- **indexName** (*String*)

    The name of the created index.

- **indexType** (*String*)

    The algorithm that is used to build the index. 

    For details, refer to [In-memory Index](https://milvus.io/docs/index.md), [On-disk Index](https://milvus.io/docs/disk_index.md) and [Scalar Index](https://milvus.io/docs/scalar_index.md).

- **metricType** (*String*)

    The algorithm that is used to measure similarity between vectors. Possible values are **IP**, **L2**, and **COSINE**.

    This is available only when the specified field is a vector field.

- **fieldName** (*String*)

    The name of the field on which the index has been created.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.index.request.DescribeIndexReq;
import io.milvus.v2.service.index.response.DescribeIndexResp;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Describe the index for the field "vector"
DescribeIndexReq describeIndexReq = DescribeIndexReq.builder()
        .collectionName("test")
        .fieldName("vector")
        .build();
DescribeIndexResp describeIndexResp = client.describeIndex(describeIndexReq);
```

