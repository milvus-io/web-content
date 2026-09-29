# getReplicateConfiguration()

This operation gets the current replicate configuration. Use it to inspect configured clusters and cross-cluster topology before updating replication settings.

```java
public GetReplicateConfigurationResp getReplicateConfiguration()
```

**RETURNS:**

*GetReplicateConfigurationResp*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when validation fails or the server returns an error for this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.cdc.response.GetReplicateConfigurationResp;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

GetReplicateConfigurationResp resp = client.getReplicateConfiguration();
ReplicateConfiguration config = resp.getReplicateConfiguration();
System.out.println(config.getClusters());
```

## Related operations

- [getReplicateInfo()](getReplicateInfo.md)

- [updateReplicateConfiguration()](updateReplicateConfiguration.md)
