# MilvusClientV2Pool

A **MilvusClientV2Pool** instance is a connection pool for MilvusClientV2 objects. The number of MilvusClientV2 objects automatically increases or decreases to avoid frequent opening and closing connections, improving your application's performance.

```java
io.milvus.pool.MilvusClientV2Pool
```

**Constructor**

Constructs a client pool for common use cases.

```java
MilvusClientV2Pool(PoolConfig poolConfig, ConnectConfig connectConfig);
```

**Methods**

- getClient(String key)

Get a client object that is idle from the pool.
Once the caller holds the client, it will be marked as an active state and cannot be fetched by other callers.
If the number of clients hits the MaxTotalPerKey value, this method will be blocked for MaxBlockWaitDuration.
If no idle client is available after MaxBlockWaitDuration, this method will return a null object to the caller.

- returnClient(String key, MilvusClient grpcClient)

Return a client object. Once a client is returned, it becomes idle state and waits for the next caller.
The caller should ensure the client is returned. Otherwise, the client will keep in active state and cannot be used by the next caller.
Throw exceptions if the key doesn't exist or the client does not belong to this key group.

- getIdleClientNumber(String key)

Return the number of idle clients of a key group.

- getActiveClientNumber(String key)

Return the number of active clients of a key group.

- getTotalIdleClientNumber()

Return the number of idle clients of all key groups.

- getTotalActiveClientNumber()

Return the number of active clients of all key groups

- clear(String key)

Release/disconnect idle clients of a key group.

- clear()

Release/disconnect idle clients of all key groups.

- close()

Release/disconnect all clients of all key groups, and close the pool.

## PoolConfig

PoolConfig allows you to do specific configurations for the pool.

```java
PoolConfig poolConfig = PoolConfig.builder()
        .maxIdlePerKey(10) // max idle clients per key
        .maxTotalPerKey(20) // max total(idle + active) clients per key
        .maxTotal(100) // max total clients for all keys
        .maxBlockWaitDuration(Duration.ofSeconds(5L)) // getClient() will wait 5 seconds if no idle client available
        .minEvictableIdleDuration(Duration.ofSeconds(10L)) // if number of idle clients is larger than maxIdlePerKey, redundant idle clients will be evicted after 10 seconds
        .build();
```

**BUILDER METHODS:**

- maxIdlePerKey(int maxIdlePerKey)

    The maximum number of idle clients for each key. If the number of idle clients exceeds this number, some clients will be automatically closed. The default value is 5.

- minIdlePerKey(int minIdlePerKey)

    The minimize number of idle clients for each key. The default value is 0.

- maxTotalPerKey(int maxTotalPerKey)

    The maximum number of clients for each key, including idle clients and active clients. The default value is 10.

- maxTotal(int maxTotal)

    The maximum number of clients in total, including idle clients and active clients. The default value is 50.

- blockWhenExhausted(boolean blockWhenExhausted)

    Block the getClient() method for a duration when the maximum number of clients is hit and all the clients are active. If this flag is false, the getClient() will instantly throw an exception if  the maximum number of clients is hit and all the clients are active. The default value is true.

- maxBlockWaitDuration(Duration maxBlockWaitDuration)

    Max block duration when the maximum number of clients is hit and all the clients are active. The default value is 3 seconds.

- evictionPollingInterval(Duration evictionPollingInterval)

    Trigger an eviction action to evict expired idle clients for each duration. The default value is 60 seconds.

- minEvictableIdleDuration(Duration minEvictableIdleDuration)

    An idle client expires after this duration and can be evicted.

- testOnBorrow(boolean testOnBorrow)

    If this flag is set to true, the pool will check if the grpc connection of a client is terminated or closed each time the getClient() is called.

- testOnReturn(boolean testOnReturn)

    If this flag is set to true, the pool will check if the grpc connection of a client is terminated or closed each time the returnClient() is called.

## ConnectConfig

Read the description in the MilvusClientV2 page.

## Examples

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.pool.PoolConfig;
import io.milvus.pool.MilvusClientV2Pool;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus") // replace this with your token
        .build();
        
PoolConfig poolConfig = PoolConfig.builder()
        .maxIdlePerKey(10) // max idle clients per key
        .maxTotalPerKey(20) // max total(idle + active) clients per key
        .maxTotal(100) // max total clients for all keys
        .maxBlockWaitDuration(Duration.ofSeconds(5L)) // getClient() will wait 5 seconds if no idle client available
        .minEvictableIdleDuration(Duration.ofSeconds(10L)) // if number of idle clients is larger than maxIdlePerKey, redundant idle clients will be evicted after 10 seconds
        .build();
MilvusClientV2Pool pool = new MilvusClientV2Pool(poolConfig, connectConfig);

MilvusClientV2 client = pool.getClient("client_name");
try {
    // use the client to do something
} catch (Exception e) {
} finally {
    pool.returnClient("client_name", client); // make sure the client is returned after use
}
```

