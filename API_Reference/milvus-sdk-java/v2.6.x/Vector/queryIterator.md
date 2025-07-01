# queryIterator()

This method returns a query iterator to iterate data.

```java
public QueryIterator queryIterator(QueryIteratorReq request)
```

## Request Syntax

```java
queryIterator(QueryIteratorReq.builder()
        .collectionName(String collectionName)
        .outputFields(List<String> outputFields)
        .expr(String expr)
        .batchSize(long size)
        .consistencyLevel(ConsistencyLevel consistencyLevel)
        .offset(long offset)
        .limit(long limit)
        .build());
```

**BUILDER METHODS:**

- `collectionName(String collectionName)`

    The name of an existing collection.

- `outputFields(List<String> outputFields)`

    A list of field names to include in each entity in return.

    The value defaults to **None**. If left unspecified, all fields in the collection are selected as the output fields.

- `expr(String expr)`

    A scalar filtering condition to filter matching entities. 

    You can set this parameter to an empty string to skip scalar filtering. To build a scalar filtering condition, refer to [Boolean Expression Rules](https://milvus.io/docs/boolean.md). 

- `batchSize(long size)`

A value to define the number of entities returned per batch.

- `consistencyLevel(ConsistencyLevel consistencyLevel)`

    The consistency level of the target collection.

    The value defaults to the one specified when you create the current collection, with options of **Strong** (**0**), **Bounded** (**1**), **Session** (**2**), and **Eventually** (**3**).

    <div class="admonition note">

    <p><b>what is the consistency level?</b></p>

    <p>Consistency in a distributed database specifically refers to the property that ensures every node or replica has the same view of data when writing or reading data at a given time.</p>
    <p>Milvus supports four consistency levels: <strong>Strong</strong>, <strong>Bounded Staleness</strong>, <strong>Session</strong>, and <strong>Eventually</strong>. The default consistency level in Milvus is <strong>Bounded Staleness</strong>.</p>
    <p>You can easily tune the consistency level when conducting a vector similarity search or query to make it best suit your application.</p>

    </div>

- `offset(long offset)`

    The number of records to skip in the query result. 

    You can use this parameter in combination with `limit` to enable pagination.

    The sum of this value and `limit` should be less than 16,384. 

- `limit(long limit)`

    The number of records to return in the query result.

    You can use this parameter in combination with `offset` to enable pagination.

    The sum of this value and `offset` should be less than 16,384. 

**RETURN TYPE:**

*QueryIterator*

**RETURNS:**

A *QueryIterator* object to iterate data.

**METHODS:**

- List\<QueryResultsWrapper.RowRecord> next()

Return a batch of results.

- close()

Release the cache results.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.orm.iterator.QueryIterator;
import io.milvus.response.QueryResultsWrapper;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.ConsistencyLevel;
import io.milvus.v2.service.vector.request.QueryIteratorReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Iterator data
QueryIterator queryIterator = client.queryIterator(QueryIteratorReq.builder()
        .collectionName("test")
        .expr("id < 300")
        .outputFields(Lists.newArrayList("id", "vector"))
        .batchSize(50L)
        .offset(5)
        .limit(400)
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build());

while (true) {
    List<QueryResultsWrapper.RowRecord> res = queryIterator.next();
    if (res.isEmpty()) {
        System.out.println("query iteration finished, close");
        queryIterator.close();
        break;
    }

    for (QueryResultsWrapper.RowRecord record : res) {
        System.out.println(record);
    }
}
```

