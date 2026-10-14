# describeCollection()

This operation lists detailed information about a specific collection.

```javascript
await milvusClient.describeCollection(data)
```

## Request Syntax

```javascript
await milvusClient.describeCollection({ 
    db_name: string,
    collection_name: string 
})
```

**PARAMETERS:**

- **db_name** (*string*) -

    The name of the database that holds the target collection.

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of an existing collection.

- **timeout** (*number*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS:**

*Promise<DescribeCollectionResponse>*

This method returns a promise that resolves to a **DescribeCollectionResponse** object.

```javascript
{
    status:  ResStatus,
    schema: object,
    collectionID: string,
    collection_name: string,
    consistency_level: string,
    aliases: string[],
    virtual_channel_names: string[],
    physical_channel_names: string[],
    start_positions: string[],
    properties: KeyValuePair[],
    created_timestamp: string,
    created_utc_timestamp: string,
    shards_num: number,
    num_partitions: string,
    db_name: string,
    functions: FunctionObject[],
    update_timestamp_str: string,
    update_timestamp: number,
    anns_fields: Record<string, FieldSchema>,
    scalar_fields: Record<string, FieldSchema>,
    function_fields: Record<string, FieldSchema>
}
```

**PARAMETERS:**

- **status** (*object*)-

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds.

    - **reason** (*string*) -

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

- **schema** (*object*)-

    The CollectionSchema object.

    - **autoID** (*boolean*) -

        Whether the primary field automatically increments along with data insertions.

    - **description** (*string*) -

        Collection description.

    - **enable_dynamic_field** (*boolean*) -

        Whether the reserved JSON field **&#36;meta** is used to store non-schema-defined fields in key-value pairs.

    - **fields** (*FieldSchema[]*) -

        A list of schema-defined fields.

    - **functions** (*FunctionObject[]*) -

        Doc-in / doc-out functions attached to the collection (for example, the BM25 sparse-vector function).

    - **struct_array_fields** (*FieldSchema[]*) -

        All struct and array fields declared on the collection.

    - **name** (*string*) -

        The name of **CollectionSchema** object.

- **collectionID** (*string*)-

    The ID of the collection.

- **collection_name** (*string*)-

    The name of the collection.

- **consistency_level** (*string*)-

    The consistency level of the collection.

- **aliases** (*string[]*)-

    A list of the aliases of the collection.

- **virtual_channel_names** (*string[]*)-

    A list of the names of the virtual channels in this collection.

- **physical_channel_names** (*string[]*)-

    A list of the names of the physical channels in this collection.

- **start_positions** (*string[]*)-

    The start positions of the collection at the time it was created.

- **properties** (*KeyValuePair[]*)-

    Collection-level properties (for example, **mmap.enabled**, **collection.ttl.seconds**) declared at creation or set via `alterCollectionProperties()`.

- **created_timestamp** (*string*)-

    The timestamp indicating the creation time of the collection.

- **created_utc_timestamp** (*string*)-

    The timestamp in UTC indicating the creation time of the collection.

- **shards_num** (*number*)-

    The number of shards in the collection.

- **num_partitions** (*string*)-

    The number of partitions in the collection.

- **db_name** (*string*)-

    The name of the database to which the collection belongs.

- **functions** (*FunctionObject[]*)-

    A flattened list of doc-in / doc-out functions attached to the collection.

- **update_timestamp_str** (*string*)-

    The timestamp indicating the last update time of the collection, formatted as a string.

- **update_timestamp** (*number*)-

    The numeric form of the last-update timestamp.

- **anns_fields** (*Record<string, FieldSchema>*)-

    A mapping from vector-field name to its **FieldSchema**, covering all vector fields declared on the collection.

- **scalar_fields** (*Record<string, FieldSchema>*)-

    A mapping from scalar-field name to its **FieldSchema**, covering all scalar fields declared on the collection.

- **function_fields** (*Record<string, FieldSchema>*)-

    A mapping from function-output-field name to its **FieldSchema**.

## Example

```javascript
const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});
 const res = await milvusClient.describeCollection({ collection_name: 'my_collection' });
```

