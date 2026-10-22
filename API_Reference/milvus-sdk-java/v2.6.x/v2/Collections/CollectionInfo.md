# CollectionInfo

Describes one collection in the response of `listCollections()`.

```java
class io.milvus.v2.service.collection.CollectionInfo
```

**METHODS:**

- **getCollectionName()** (*String*) -

    The name of the collection.

- **getShardNum()** (*Integer*) -

    The number of shards of the collection.

## Example

```java
ListCollectionsResp resp = client.listCollections(ListCollectionsReq.builder().build());
resp.getCollectionInfos().forEach(info ->
    System.out.println(info.getCollectionName() + ", shards: " + info.getShardNum()));
```
