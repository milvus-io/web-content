# upsert()

Inserts new entities or updates existing entities in a collection, with optional partial-update operations for array fields.

```javascript
await milvusClient.upsert(data: UpsertReq)
```

## Request Syntax

### Upsert request

Upserts entities and optionally applies partial-update operations to array fields.

```javascript
await milvusClient.upsert({
    db_name,
    collection_name,
    data,
    hash_keys,
    partial_update,
    field_ops,
    partition_name,
    transformers,
    skip_check_schema,
    timeout,
})
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of the existing collection.

- **data** ([RowData](RowData.md)[]) -

    **[REQUIRED]**

    The entities to insert or update. Each object uses collection field names as keys.

- **db_name** (*string*) -

    The database containing the collection.

- **hash_keys** (*number[]*) -

    Hash values generated from primary keys. Leave this unset unless the deployment requires explicit hash keys.

- **partial_update** (*boolean*) -

    Default: `false`

    Whether to update only the fields included in each entity. Supplying field_ops also enables partial-update request handling.

- **field_ops** (*FieldPartialUpdateOp[]*) -

    The partial-update operations to apply to array fields. Each entry identifies one collection field and its operation.

    - **field_name** (*string*) -

        **[REQUIRED]**

        The name of the array field to update.

    - **op** (*FieldPartialUpdateOpType | 'REPLACE' | 'ARRAY_APPEND' | 'ARRAY_REMOVE'*) -

        **[REQUIRED]**

        The operation to apply. REPLACE replaces the field value, ARRAY_APPEND appends values, and ARRAY_REMOVE removes matching values.

        Constraints: Use REPLACE, ARRAY_APPEND, or ARRAY_REMOVE.

- **partition_name** (*string*) -

    The partition into which the entities are upserted.

- **transformers** (*InsertTransformers*) -

    Custom transformers for special vector data types such as BFloat16Vector and Float16Vector.

- **skip_check_schema** (*boolean*) -

    Whether to skip the schema check before the upsert.

- **timeout** (*number*) -

    The RPC timeout in milliseconds. When omitted, the client waits until the operation completes or fails.

**RETURNS:**

*Promise<MutationResult>*

Returns the mutation result, including the operation status and counts for the affected entities.

```javascript
{
    succ_index: number[],
    err_index: number[],
    acknowledged: boolean,
    insert_cnt: string,
    delete_cnt: string,
    upsert_cnt: string,
    timestamp: string,
    IDs: { int_id?: { data: number[] }, str_id?: { data: string[] } },
    status:  ResStatus
}
```

**PARAMETERS:**

- **succ_index** (*number[]*) -

    The zero-based positions in the input data of rows that were successfully upserted.

- **err_index** (*number[]*) -

    The zero-based positions of rows that were rejected. When all rows succeed, this list is empty.

- **acknowledged** (*boolean*) -

    Whether the write was acknowledged by Milvus.

- **insert_cnt** (*string*) -

    The number of rows inserted, formatted as a string.

- **delete_cnt** (*string*) -

    The number of rows deleted by this operation. For `upsert()` this remains **"0"**.

- **upsert_cnt** (*string*) -

    The number of rows upserted by this operation.

- **timestamp** (*string*) -

    The hybrid timestamp at which the write became visible. Use this value for time-travel queries.

- **IDs** (*[StringArrayId](StringArrayId.md)* | *[NumberArrayId](NumberArrayId.md)*) -

    The primary keys assigned to the upserted rows.

- **status** (*ResStatus*)

    A **ResStatus** object.

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds.

    - **reason** (*string*) -

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

**EXCEPTIONS:**

- **Error**

    The server rejects the upsert request or the RPC fails. Inspect the error details for the server code and failure reason.

- **Error**

    A field_ops entry omits field_name or uses an unsupported operation. Use a valid field name and one of REPLACE, ARRAY_APPEND, or ARRAY_REMOVE.

## Example

### Append values to an array field

Appends values to the tags array while leaving fields omitted from data unchanged.

```javascript
import { FieldPartialUpdateOpType, MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

await milvusClient.upsert({
    collection_name: 'articles',
    data: [
        { id: 1, tags: ['new', 'featured'] },
    ],
    field_ops: [
        {
            field_name: 'tags',
            op: FieldPartialUpdateOpType.ARRAY_APPEND,
        },
    ],
});
```

## Notes

- The SDK serializes numeric FieldPartialUpdateOpType values to their enum names before sending the request.

- When field_ops is non-empty, the SDK sends partial_update as true automatically.

