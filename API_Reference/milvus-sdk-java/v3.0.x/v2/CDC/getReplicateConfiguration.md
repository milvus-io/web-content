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
MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
    .uri("http://localhost:19530")
    .token("root:Milvus")
    .build());

GetReplicateConfigurationResp resp = client.getReplicateConfiguration();
ReplicateConfiguration config = resp.getReplicateConfiguration();
System.out.println(config.getClusters());
```

<!-- category: CDC; action: CREATE; addedSince: v3.0.x -->
