# MilvusClientV2

A **MilvusClientV2** instance represents a Java client that connects to a specific Milvus instance.

```java
io.milvus.v2.client.MilvusClientV2
```

## Constructor

Constructs a client for common use cases.

<div class="alert note">

This client serves as an easy-to-use alternative for the current set of APIs that handles Create, Read, Update, and Delete (CRUD) operations in Milvus.

</div>

```java
MilvusClientV2(ConnectConfig connectConfig);
```

## Deprecated methods

The following methods are deprecated.

- `alterDatabase(AlterDatabaseReq)` - Deprecated since SDK v2.5.3. Use `alterDatabaseProperties(AlterDatabasePropertiesReq)`.
- `createSchema()` - Deprecated since SDK v2.5.9. Use the static `CreateSchema()` method.
- `alterCollection(AlterCollectionReq)` - Deprecated since SDK v2.5.3. Use `alterCollectionProperties(AlterCollectionPropertiesReq)`.
- `alterIndex(AlterIndexReq)` - Deprecated since SDK v2.5.3. Use `alterIndexProperties(AlterIndexPropertiesReq)`.

## [ConnectConfig](ConnectConfig.md)

**[ConnectConfig](ConnectConfig.md)** allows you to configure the connection properties in one place so that **MilvusClientV2** can reference it to create and manage the connection pool. For the full list of builder methods and getters, see [ConnectConfig](ConnectConfig.md).

**PUBLIC METHODS:**

For the getter methods that expose connection details (such as `getHost()`, `getPort()`, `getAuthorization()`, `getDbName()`, `isSecure()`, and `getProxyAddress()`), refer to **[ConnectConfig](ConnectConfig.md)**, where these accessors are defined.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus") // replace this with your token
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);
```
