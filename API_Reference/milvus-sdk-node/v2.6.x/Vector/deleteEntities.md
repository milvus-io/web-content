# deleteEntities()

This operation deletes entities from a collection using a boolean expression or a filter.

```javascript
await milvusClient.deleteEntities(data)
```

## Request Syntax

```javascript
await milvusClient.deleteEntities({
   db_name: string,
   collection_name: string,
   partition_name?: string,
   expr?: string,
   filter?: string,
   exprValues?: keyValueObj,
   consistency_level: string,
   timeout?: number
 })
```

**PARAMETERS:**

- **db_name** (*string*) -

    The name of the database that holds the target collection.

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of an existing collection.

- **partition_name** (*string*) -

    The name of an existing partition in the collection.

- **expr** (*string*) -

    A boolean expression used to filter entities for deletion. Provide either `expr` or `filter`, not both.

- **filter** (*string*) -

    A filter expression. This is an alias of `expr` and takes precedence over it.

- **exprValues** (*keyValueObj*) -

    Template values for the filter expression, for example `{ key: 'value' }`.

- **consistency_level** (*ConsistencyLevelEnum*) -

    The consistency level of the target collection. The value defaults to **Bounded** (**1**) with options of **Strong** (**0**), **Bounded** (**1**), **Session** (**2**), and **Eventually** (**3**).

- **timeout** (*number*) -

    The timeout duration for this operation.

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

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
The zero-based positions of input entities that matched the expression and were marked deleted.

- **err_index** (*number[]*) -
The zero-based positions of input entities that did not match any row.

- **acknowledged** (*boolean*) -
Whether the delete was acknowledged by Milvus.

- **insert_cnt** (*string*) -
Always **"0"** for `deleteEntities()`.

- **delete_cnt** (*string*) -
The number of rows logically deleted by this operation.

- **upsert_cnt** (*string*) -
Always **"0"** for `deleteEntities()`.

- **timestamp** (*string*) -
The hybrid timestamp at which the delete became visible.

- **IDs** (*StringArrayId* | *NumberArrayId*) -
The primary keys that were targeted by this delete. For the full field reference, refer to the `insert()` doc.

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

const resStatus = await milvusClient.deleteEntities({
    collection_name: 'my_collection',
    expr: 'id in [1, 2, 3]',
});
```
