# getCollectionStatistics()

This operation lists the statistics collected on a specific collection.

```javascript
getCollectionStatistics(data): Promise<StatisticsResponse>
```

## Request Syntax

```javascript
milvusClient.getCollectionStatistics({ 
    db_name: string,
    collection_name: string,
    timeout?: number 
})
```

**PARAMETERS:**

- **db_name** (*string*) -

    The name of the database that holds the target collection.

- **collection_name** (*string*) -

    **&#91;REQUIRED&#93;**

    The name of a collection.

- **timeout** (*number*) -

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response returns or error occurs.

**RETURNS** *Promise\&lt;StatisticsResponse&gt;*

This method returns a promise that resolves to a **StatisticsResponse** object.

```javascript
{
    data: number,
    stats: object,
    status: object
}
```

**PARAMETERS:**

- **data** (*number*) -

    Collected statistics on the specified collection including the row count of the collection.

- **status** (*object*) -

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds. 

    - **reason** (*string*) - 

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

## Example

```java
const milvusClient = new milvusClient(MILUVS_ADDRESS);
 const res = await milvusClient.getCollectionStatistics({ collection_name: 'my_collection' });
```

