# getIndexStatistics()

This operation gets the index statistics of the specified index, including the number of indexed rows and the total number of rows.

```javascript
await milvusClient.getIndexStatistics(data)
```

## Request Syntax

```javascript
await milvusClient.getIndexStatistics({
      db_name?: string,
      collection_name: string,
      field_name?: string,
      index_name?: string,
      timeout?: number
});
```

**PARAMETERS:**

- **db_name** (*string*) -

    The name of the database that holds the target collection.

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of an existing collection.

- **field_name** (*string*) -

    The name of an existing field in the collection.

- **index_name** (*string*) -

    The name of the index whose statistics to get.

- **timeout** (*number*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise<DescribeIndexResponse>*

This method returns a promise that resolves to a **DescribeIndexResponse** object.

```javascript
{
    index_descriptions: IndexDescription[],
    status:  ResStatus
}
```

**PARAMETERS:**

- **index_descriptions** (*IndexDescription[]*) -
A list of index descriptions for the requested index. Each entry includes **indexed_rows** and **total_rows**.

- **ResStatus**
A **ResStatus** object.

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds.

    - **reason** (*string*) -

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const res = await milvusClient.getIndexStatistics({
    collection_name: 'my_collection',
    index_name: 'my_index',
});
```
