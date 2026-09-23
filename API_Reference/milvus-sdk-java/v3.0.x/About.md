# About Milvus Java SDK

The Milvus Java SDK is an open-source project and its source code is hosted on [GitHub](https://github.com/milvus-io/milvus-sdk-java).

## Installation

You can use **[Apache Maven](https://maven.apache.org/install.html)** or **[Gradle](https://gradle.org/install/)** to download the SDK.

- Apache Maven

```xml
<dependency>
    <groupId>io.milvus</groupId>
    <artifactId>milvus-sdk-java</artifactId>
    <version>3.0.10</version>
</dependency>
```

- Gradle/Groovy

```plaintext
implementation 'io.milvus:milvus-sdk-java:3.0.10'
```

- Gradle/Kotlin

```plaintext
implementation("io.milvus:milvus-sdk-java:3.0.10")
```

Since v2.5.2, Milvus Java SDK has been split into two packages: **milvus-sdk-java** and **milvus-sdk-java-bulkwriter**. If you do not need BulkWriter, ignore the **milvus-sdk-java-bulkwriter** package. To use BulkWriter, import the **milvus-sdk-java-bulkwriter** as follows:

- Apache Maven

```xml
<dependency>
    <groupId>io.milvus</groupId>
    <artifactId>milvus-sdk-java-bulkwriter</artifactId>
    <version>3.0.10</version>
</dependency>
```

- Gradle/Groovy

```plaintext
implementation 'io.milvus:milvus-sdk-java-bulkwriter:3.0.10'
```

- Gradle/Kotlin

```plaintext
implementation("io.milvus:milvus-sdk-java-bulkwriter:3.0.10")
```

## Quick Start

The following example connects to Milvus, creates a collection, inserts an entity, and runs a vector search using the V2 client API, which is the current API of this SDK.

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import java.util.Collections;

public class QuickStart {
    public static void main(String[] args) throws Exception {
        ConnectConfig connectConfig = ConnectConfig.builder()
                .uri("http://localhost:19530")
                .token("root:Milvus")
                .build();
        MilvusClientV2 client = new MilvusClientV2(connectConfig);

        String collectionName = "hello_milvus";
        CreateCollectionReq.CollectionSchema schema = client.createSchema();
        schema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(true).build());
        schema.addField(AddFieldReq.builder().fieldName("embedding").dataType(DataType.FloatVector).dimension(3).build());
        client.createCollection(CreateCollectionReq.builder()
                .collectionName(collectionName)
                .collectionSchema(schema)
                .indexParams(Collections.singletonList(IndexParam.builder()
                        .fieldName("embedding")
                        .metricType(IndexParam.MetricType.COSINE)
                        .build()))
                .build());

        JsonObject row = new JsonObject();
        row.addProperty("id", 1L);
        row.add("embedding", new Gson().toJsonTree(new float[]{0.1f, 0.2f, 0.3f}));
        client.insert(InsertReq.builder().collectionName(collectionName).data(Collections.singletonList(row)).build());

        SearchResp resp = client.search(SearchReq.builder()
                .collectionName(collectionName)
                .data(Collections.singletonList(new FloatVec(new float[]{0.1f, 0.2f, 0.3f})))
                .annsField("embedding")
                .limit(1)
                .build());
        System.out.println("Hit count: " + resp.getSearchResults().get(0).size());
        client.close();
    }
}
```

## Compatibility

Milvus proto is backward compatible, so a later SDK version can work with an earlier Milvus server. The table lists the recommended SDK version validated for each Milvus version.

| Milvus version | Recommended SDK version |
|:-----:|:-----:|
| 2.0.2 | 2.0.4 |
| 2.1 | 2.1.0-beta4 |
| 2.2.0 ~ 2.2.8 | 2.2.5 |
| 2.2.9 ~ 2.2.14 | 2.2.13 |
| 2.3.x | 2.3.9 |
| 2.4.x | 2.4.11 |
| 2.5.x | 2.5.17 |
| 2.6.x | 2.6.26 |
| 3.0.x | 3.0.10 |

## Contributing

We are committed to building a collaborative, exuberant open-source community for Milvus. Therefore, contributions to Milvus Java SDK are welcome from everyone. Refer to [Contributing Guideline](https://github.com/milvus-io/milvus-sdk-java/blob/master/CONTRIBUTING.md) before making contributions to this project. You can [file an issue](https://github.com/milvus-io/milvus-sdk-java/issues/new) if you need any assistance or want to propose your ideas.

## License

[Apache License 2.0](LICENSE)
