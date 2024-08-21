# MilvusClientV1Pool

A MilvusClientV1Pool instance is a connection pool for MilvusClient objects. The number of MilvusClient objects automatically increases or decreases to avoid frequent opening and closing connections, improving your application's performance.

Methods of MilvusClient for connection:

<table>
   <tr>
     <th><p><strong>Method</strong></p></th>
     <th><p><strong>Description</strong></p></th>
     <th><p><strong>Parameters</strong></p></th>
     <th><p><strong>Returns</strong></p></th>
   </tr>
   <tr>
     <td><p>getClient(String key)</p></td>
     <td><p>Get a client object that is idle from the pool.Once the caller holds the client, it will be marked as an active state and cannot be fetched by other callers.If the number of clients hits the MaxTotalPerKey value, this method will be blocked for MaxBlockWaitDuration.If no idle client is available after MaxBlockWaitDuration, this method will return a null object to the caller.</p></td>
     <td><p>key: the key of a group where the client belongs</p></td>
     <td><p>MilvusClient</p></td>
   </tr>
   <tr>
     <td><p>returnClient(String key, MilvusClient grpcClient)</p></td>
     <td><p>Return a client object. Once a client is returned, it becomes idle state and waits for the next caller.The caller should ensure the client is returned. Otherwise, the client will keep in active state and cannot be used by the next caller.Throw exceptions if the key doesn't exist or the client does not belong to this key group.</p></td>
     <td><p>key: the key of a group where the client belongsgrpcClient: the client object to return</p></td>
     <td><p>void</p></td>
   </tr>
   <tr>
     <td><p>getIdleClientNumber(String key)</p></td>
     <td><p>Return the number of idle clients of a key group.</p></td>
     <td><p>key: the key of a group</p></td>
     <td><p>int</p></td>
   </tr>
   <tr>
     <td><p>getActiveClientNumber(String key)</p></td>
     <td><p>Return the number of active clients of a key group.</p></td>
     <td><p>key: the key of a group</p></td>
     <td><p>int</p></td>
   </tr>
   <tr>
     <td><p>getTotalIdleClientNumber()</p></td>
     <td><p>Return the number of idle clients of all key groups.</p></td>
     <td></td>
     <td><p>int</p></td>
   </tr>
   <tr>
     <td><p>getTotalActiveClientNumber()</p></td>
     <td><p>Return the number of active clients of all key groups</p></td>
     <td></td>
     <td><p>int</p></td>
   </tr>
   <tr>
     <td><p>clear(String key)</p></td>
     <td><p>Release/disconnect idle clients of a key group.</p></td>
     <td><p>key: the key of a group</p></td>
     <td><p>void</p></td>
   </tr>
   <tr>
     <td><p>clear()</p></td>
     <td><p>Release/disconnect idle clients of all key groups.</p></td>
     <td></td>
     <td><p>void</p></td>
   </tr>
   <tr>
     <td><p>close()</p></td>
     <td><p>Release/disconnect all clients of all key groups, and close the pool.</p></td>
     <td></td>
     <td><p>void</p></td>
   </tr>
</table>

#### PoolConfig

Use the PoolConfig.PoolConfigBuilder to construct a PoolConfig.

```java
import io.milvus.pool.PoolConfig;
PoolConfig.PoolConfigBuilder builder = PoolConfig.builder();
```

Methods of PoolConfig.PoolConfigBuilder:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Patameters</p></th>
    </tr>
    <tr>
        <td><p>maxIdlePerKey(int maxIdlePerKey)</p></td>
        <td><p>The maximum number of idle clients for each key. If the number of idle clients exceeds this number, some clients will be automatically closed. The default value is 5.</p></td>
        <td><p>maxIdlePerKey: The maximum number of idle clients .</p></td>
    </tr>
    <tr>
        <td><p>minIdlePerKey(int minIdlePerKey)</p></td>
        <td><p>The minimize number of idle clients for each key. The default value is 0.</p></td>
        <td><p>minIdlePerKey: The minimize number of idle clients.</p></td>
    </tr>
    <tr>
        <td><p>maxTotalPerKey(int maxTotalPerKey)</p></td>
        <td><p>The maximum number of clients for each key, including idle clients and active clients. The default value is 10.</p></td>
        <td><p>maxTotalPerKey: The maximum number of clients</p></td>
    </tr>
    <tr>
        <td><p>maxTotal(int maxTotal)</p></td>
        <td><p>The maximum number of clients in total, including idle clients and active clients. The default value is 50.</p></td>
        <td><p>maxTotal: The maximum number of clients.</p></td>
    </tr>
    <tr>
        <td><p>blockWhenExhausted(boolean blockWhenExhausted)</p></td>
        <td><p>Block the getClient() method for a duration when the maximum number of clients is hit and all the clients are active. If this flag is false, the getClient() will instantly throw an exception if the maximum number of clients is hit and all the clients are active. The default value is true.</p></td>
        <td><p>blockWhenExhausted: Set to true for blocking getClient() when the pool is full.</p></td>
    </tr>
    <tr>
        <td><p>maxBlockWaitDuration(Duration maxBlockWaitDuration)</p></td>
        <td><p>Max block duration when the maximum number of clients is hit and all the clients are active. The default value is 3 seconds.</p></td>
        <td><p>maxBlockWaitDuration: Duration of blocking getClient().</p></td>
    </tr>
    <tr>
        <td><p>evictionPollingInterval(Duration evictionPollingInterval)</p></td>
        <td><p>Trigger an eviction action to evict expired idle clients for each duration. The default value is 60 seconds.</p></td>
        <td><p>evictionPollingInterval: Interval to trigger eviction action.</p></td>
    </tr>
    <tr>
        <td><p>minEvictableIdleDuration(Duration minEvictableIdleDuration)</p></td>
        <td><p>An idle client expires after this duration and can be evicted.</p></td>
        <td><p>minEvictableIdleDuration: Duration to evict idle client.</p></td>
    </tr>
    <tr>
        <td><p>testOnBorrow(boolean testOnBorrow)</p></td>
        <td><p>If this flag is set to true, the pool will check if the grpc connection of a client is terminated or closed each time the getClient() is called.</p></td>
        <td><p>testOnBorrow: Set to true to check connection when getClient() is called.</p></td>
    </tr>
    <tr>
        <td><p>testOnReturn(boolean testOnReturn)</p></td>
        <td><p>If this flag is set to true, the pool will check if the grpc connection of a client is terminated or closed each time the returnClient() is called.</p></td>
        <td><p>testOnReturn: Set to true to check connection when returnClient() is called.</p></td>
    </tr>
</table>

#### Example

```java
import io.milvus.param.ConnectParam
import io.milvus.pool.PoolConfig
import io.milvus.pool.MilvusClientV1Pool
import io.milvus.client.MilvusClient

ConnectParam connectConfig = ConnectParam.newBuilder()
        .withHost("localhost")
        .withPort(19530)
        .build();
PoolConfig poolConfig = PoolConfig.builder()
        .maxIdlePerKey(10) // max idle clients per key
        .maxTotalPerKey(20) // max total(idle + active) clients per key
        .maxTotal(100) // max total clients for all keys
        .maxBlockWaitDuration(Duration.ofSeconds(5L)) // getClient() will wait 5 seconds if no idle client available
        .minEvictableIdleDuration(Duration.ofSeconds(10L)) // if number of idle clients is larger than maxIdlePerKey, redundant idle clients will be evicted after 10 seconds
        .build();
MilvusClientV1Pool pool;

MilvusClient client = pool.getClient("client_name");
try {
    // use the client to do something
} catch (Exception e) {
} finally {
    pool.returnClient("client_name", client); // make sure the client is returned after use
}
```

