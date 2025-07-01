# alterAlias()

This operation reassigns the alias of one collection to another.

```java
public void alterAlias(AlterAliasReq request)
```

## Request Syntax

```java
alterAlias(AlterAliasReq.builder()
    .alias(String alias)
    .collectionName(String collectionName)
    .build()
)
```

**BUILDER METHODS:**

- `alias(String alias)`

    The alias of the collection. Note that the alias should exist beforehand.

    <div class="admonition note">

    <p><b>what is a collection alias?</b></p>

    <p>A collection alias is an additional name for a collection. Collection aliases are useful when you want to switch your application to a new collection without any changes to your code. </p>
    <p>In Milvus, a collection alias is a globally unique identifier. One alias can only be assigned to exactly one collection. Conversely, a collection can have multiple aliases.</p>
    <p>Below is an example of reassigning the alias of one collection to another:</p>
    <p>Suppose there are two collections: <code>collection_1</code> and <code>collection_2</code>. There is also a collection alias named <code>bob</code>, which was originally assigned to <code>collection_1</code>:</p>
    <ul>
    <li><p><code>collection_1</code>'s alias = ["bob"]</p></li>
    <li><p><code>collection_2</code>'s alias = []</p></li>
    </ul>
    <p>After calling the <code>alterAlias</code> function with the parameters <code>collection_2</code> and <code>bob</code>:</p>
    <ul>
    <li><p><code>collection_1</code>'s alias = []</p></li>
    <li><p><code>collection_2</code>'s alias = ["bob"]</p></li>
    </ul>

    </div>

- `collectionName(String collectionName)`

    The name of the target collection to reassign an alias to.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.utility.request.AlterAliasReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Alter the alias for collection "test"
AlterAliasReq alterAliasReq = AlterAliasReq.builder()
        .collectionName("test")
        .alias("test_alias2")
        .build();
client.alterAlias(alterAliasReq);
```

