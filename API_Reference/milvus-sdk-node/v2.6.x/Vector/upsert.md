# upsert()

This operation inserts or updates data in a specific collection.

```javascript
upsert(data): Promise<MutationResult>
```

## Request Syntax

```javascript
milvusClient.upsert({
   db_name: string,
   collection_name: string,
   data: RowData[],
   hash_keys: Number[],
   partial_update: boolean,
   partition_name: string,
   timeout: number
 })
```

**PARAMETERS:**

- **db_name** (*string*) -

    The name of the database that holds the target collection.

- **collection_name** (*string*) -

    **&#91;REQUIRED&#93;**

    The name of an existing collection.

- **data** (*RowData&#91;&#93;*) -

    The data to insert into the current collection.

    The data to insert should be a dictionary that matches the schema of the current collection or a list of such dictionaries. 

    To perform an update, you are advised first to retrieve the target entity from the collection, modify the values of any relevant fields, and then save it back to the collection. 

    The following code assumes that the schema of the current collection has three fields named **id**, **vector** ,and **color**. The `id` field is the primary field, the `vector` field is a field to hold 5-dimensional vector embeddings, and the `color` field is a scalar field holding strings.

    ```javascript
    # A dictionary, or
    data={
        'id': 0,
        'vector': [
            0.6186516144460161,
            0.5927442462488592,
            0.848608119657156,
            0.9287046808231654,
            -0.42215796530168403
        ],
        'color': 'green'
    }
    
    # A list of dictionaries
    data = [
        {
            'id': 1,
            'vector': [
                0.37417449965222693,
                -0.9401784221711342,
                0.9197526367693833,
                0.49519396415367245,
                -0.558567588166478
            ],
            'color': 'brown'
        },
        {
            'id': 2,
            'vector': [
                0.46949086179692356,
                -0.533609076732849,
                -0.8344432775467099,
                0.9797361846081416,
                0.6294256393761057
            ],
            'color': 'purple'
        }
    ]
    ```

- **timeout** (*number*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

- **partial_update**(*boolean* | *None*) -

    Whether to enable partial update. Once set to `True`, you can include only the fields that need updating in `data`. 

- **partition_name** (*string*) -

    The name of a partition in the current collection. 

    If specified, the data is to be inserted into the specified partition.

**RETURNS** *Promise\&lt;MutationResult&gt;*

This method returns a promise that resolves to a **MutationResult** object.

```javascript
{
    IDs: NumberArrayId | StringArrayId,
    acknowledged: boolean,
    delete_cnt: string,
    err_index: list[number],
    insert_cnt: string,
    status: object,
    succ_index: list[number],
    timestamp: string,
    upsert_cnt: string
}
```

**PARAMETERS:**

- **IDs** (*NumberArrayId* | *StringArrayId*) -

    A list of the IDs of the upserted entities.

- **acknowledged** (*boolean*) -

    A boolean value indicating whether the upsert operation is successful.

- **delete_cnt** (*string*) -

    The deleted entities. The value stays `0` in this operation.

- **err_index** (Number&#91;&#93;) -

    The number of entities involved in the insert operation that fails.

- **insert_cnt** (*string*) -

    The new entities that are inserted. The value stays `0` in this operation.

- **succ_index** (*list&#91;number&#93;*) -

    The number of entities involved in the upsert operation that have been successfully indexed.

- **timestamp** (*string*) -

    The timestamp at which the upsert operation occurs.

- **upsert_cnt** (*string*) -

    The entities that have been upserted.

- **status** (*object*) -

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds. 

    - **reason** (*string*) - 

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

## Example

```javascript
const { MilvusClient, DataType } = require("@zilliz/milvus2-sdk-node")

// 1. Set up a Milvus client
const address = "http://localhost:19530";
const token = "root:Milvus";
const client = new MilvusClient({address, token});

// 2. Create a collection
client.create_collection({
    collection_name: "test_collection",
    dim: 5
})

// 3. Insert record
res = await client.insert({
    collection_name: "test_collection",
    data: [
        {
            'id': 0,
            'vector': [
                0.37417449965222693,
                -0.9401784221711342,
                -0.8344432775467099,
                0.9797361846081416,
                0.6294256393761057
            ],
            'color': 'green'
        },
        {
            'id': 1,
            'vector': [
                0.37417449965222693,
                -0.9401784221711342,
                0.9197526367693833,
                0.49519396415367245,
                -0.558567588166478
            ],
            'color': 'brown'
        },
        {
            'id': 2,
            'vector': [
                0.46949086179692356,
                -0.533609076732849,
                -0.8344432775467099,
                0.9797361846081416,
                0.6294256393761057
            ],
            'color': 'purple'
        }
    ]
})

// 4. Upsert a record
res = client.upsert({
    collection_name: "test_collection",
    data: {
        'id': 0,
        'vector': [
            0.6186516144460161,
            0.5927442462488592,
            0.848608119657156,
            0.9287046808231654,
            -0.42215796530168403
        ],
        'color': 'grass-green'
    }
})

// 4. Upsert multiple records
res = client.upsert({
    collection_name: "test_collection",
    data: [
        {
            'id': 1,
             'vector': [
                 0.3457690490452393,
                 -0.9401784221711342,
                 0.9123948134344333,
                 0.49519396415367245,
                 -0.558567588166478
             ],
             'color': 'mud-brown'
       },
       {
           'id': 2,
           'vector': [
               0.42349086179692356,
               -0.533609076732849,
               -0.8344432775467099,
               0.675761846081416,
               0.57094256393761057
           ],
           'color': 'violet-purple'
       }
   ]
})

```

