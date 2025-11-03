# getLoadingProgress()

This operation gets the loading progress of a specific collection.

```javascript
getLoadingProgress(data): Promise<GetLoadingProgressResponse>
```

## Request Syntax

```javascript
milvusClient.getLoadingProgress({
      db_name?: string,
      collection_name: string,
      partition_names?: string[]
      timeout?: number
});
```

**PARAMETERS:**

- **db_name** (*string*) -

    The name of the database that holds the target collection.

- **collection_name** (*string*) -

    **&#91;REQUIRED&#93;**

    The name of the target collection.

- **partition_names** (*string&#91;&#93;*) -

    The name of the target partitions.

- **timeout** (number) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise\&lt;GetLoadingProgressResponse&gt;*

This method returns a promise that resolves to a **GetLoadingProgressResponse** object.

```javascript
{
    progress: string,
    status: {
        code: number,
        error_code: string | number,
        reason: string
    }
}
```

**PARAMETERS:**

- **progress** (*string*) -

    The loading progress in percentage.

- **total_rows** (*number*) -

    The number of entities that already persisted in the specified collection.

- **status** (*ResStatus*) -  

    The status of the response.

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds. 

    - **reason** (*string*) - 

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

## Example

```java
const milvusClient = new milvusClient(MILUVS_ADDRESS);
const resStatus = await milvusClient.getLoadingProgress({
    collection_name: 'my_collection',
});
```

