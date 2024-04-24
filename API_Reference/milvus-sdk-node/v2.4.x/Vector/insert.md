# insert()

This operation inserts data into a specific collection.

```javascript
insert(data): Promise<MutationResult>
```

## Request Syntax

```javascript
milvusClient.insert({
    collection_name: string,
    data?: RowData[],
    partition_name?: string,
    timeout?: number
})
```

**PARAMETERS:**

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

**RETURNS** *Promise\<MutationResult>*

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

    A boolean value indicating whether the upsert operation of the entity is successful.

- **delete_cnt** (*string*) -

    The deleted entities

- **err_index** (Number[]) -

    The number of entities involved in the upsert operation that fails to be indexed.

- **insert_cnt** (*string*) -

    The new entities that are inserted.

- **succ_index** (*list[number]*) -

    The number of entities involved in the upsert operation that have been successfully indexed.

- **timestamp** (*string*) -

    The timestamp indicating the time when the upsert operation occurs.

- **upsert_cnt** (*string*) -

    The entities that have been updated.

- **status** (*object*) -

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds. 

    - **reason** (*string*) - 

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

## Example

```java

```

