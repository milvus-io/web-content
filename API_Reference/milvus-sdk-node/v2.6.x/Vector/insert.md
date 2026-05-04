# insert()

This operation inserts data into a specific collection.

```javascript
await milvusClient.insert(data: InsertReq)
```

## Request Syntax

```javascript
await milvusClient.insert({
    collection_name: string,
    data: RowData | RowData[],
    partition_name?: string,
    db_name?: string,
    timeout?: number,
})
```

**PARAMETERS:**

- **db_name** (*string*) -

    The name of the database that holds the target collection.

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of an existing collection.

- **data** (*RowData[]*) -

    The data to insert into the current collection.

    The data to insert should be a dictionary that matches the schema of the current collection or a list of such dictionaries. 

    The following code assumes that the schema of the current collection has two fields named **id** and **vector**. The former is the primary field and the latter is a field to hold 5-dimensional vector embeddings.

    ```javascript
    // A dictionary, or
    data={
        'id': 0,
        'vector': [
            0.6186516144460161,
            0.5927442462488592,
            0.848608119657156,
            0.9287046808231654,
            -0.42215796530168403
        ]
    }
    
    // A list of dictionaries
    data = [
        {
            'id': 1,
            'vector': [
                0.37417449965222693,
                -0.9401784221711342,
                0.9197526367693833,
                0.49519396415367245,
                -0.558567588166478
            ]
        },
        {
            'id': 2,
            'vector': [
                0.46949086179692356,
                -0.533609076732849,
                -0.8344432775467099,
                0.9797361846081416,
                0.6294256393761057
            ]
        }
    ]
    ```

- **timeout** (*number*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

- **partition_name** (*string* | *None*) -

    The name of a partition in the current collection. 

    If specified, the data is to be inserted into the specified partition.

**RETURNS** *Promise<MutationResult>*

This method returns a promise that resolves to a **MutationResult** object.

```javascript
{
    succ_index: number[],
    err_index: number[],
    acknowledged: boolean,
    insert_cnt: string,
    delete_cnt: string,
    upsert_cnt: string,
    timestamp: string,
    IDs: { int_id?: { data: number[] }, str_id?: { data: string[] }, id_field: 'int_id' | 'str_id' },
    status:  ResStatus
}
```

**PARAMETERS:**

- **succ_index** (*number[]*) -
The zero-based positions in the input data of rows that were successfully inserted.

- **err_index** (*number[]*) -
The zero-based positions of rows that were rejected. When all rows succeed, this list is empty.

- **acknowledged** (*boolean*) -
Whether the write was acknowledged by Milvus.

- **insert_cnt** (*string*) -
The number of rows inserted, formatted as a string.

- **delete_cnt** (*string*) -
The number of rows deleted by this operation. For `insert()` this remains **"0"**.

- **upsert_cnt** (*string*) -
The number of rows upserted by this operation. For `insert()` this remains **"0"**.

- **timestamp** (*string*) -
The hybrid timestamp at which the write became visible. Use this value for time-travel queries.

- **IDs** (*StringArrayId* | *NumberArrayId*) -
The primary keys assigned to the inserted rows. For autoID collections, Milvus generates these values; otherwise, they echo the input keys.

    - **int_id** (*{ data: number[] }*) -

        Set when the primary key is an integer field.

    - **str_id** (*{ data: string[] }*) -

        Set when the primary key is a VARCHAR field.

    - **id_field** (*'int_id' | 'str_id'*) -

        Indicates which of the two id arrays carries the values.

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

const res = await milvusClient.insert({
    collection_name: 'my_collection',
    data: [
        { id: 1, vector: [0.1, 0.2, 0.3, 0.4, 0.5], text: 'Hello' },
        { id: 2, vector: [0.6, 0.7, 0.8, 0.9, 1.0], text: 'World' },
    ],
});

console.log(res.insert_cnt); // '2'
```

