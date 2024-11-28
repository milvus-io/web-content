# get()

This operation gets specific entities by their IDs.

```javascript
get(data): Promise<QueryResults>
```

## Request Syntax

```javascript
milvusClient.get({
   collection_name: string,
   consistency_level?: ConsistencyLevelEnum,
   ids: string[] | number[],
   limit?: number,
   offset?: number,
   output_fields?: string[],
   partition_names?: string[],
   timeout?: number
 })
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of an existing collection.

- **ids** (*string[]* | *number[]*) -

    **[REQUIRED]**

    A specific entity ID or a list of entity IDs.

- **consistency_level** (*string*) -

    The consistency level of the target collection.

- **limit** (*number*) -

    The total number of entities to return.

    You can use this parameter in combination with **offset** in **param** to enable pagination.

    The sum of this value and **offset** in **param** should be less than 16,384. 

- **offset** (*number*) -

    The number of records to skip in the search result. 

    You can use this parameter in combination with `limit` to enable pagination.

    The sum of this value and `limit` should be less than 16,384. 

- **partition_names** (*string[]*) -

    A list of the names of the partitions in the target collection.

- **output_fields** (*string[]*) -

    A list of field names to include in each entity in return.

    The value defaults to **None**. If left unspecified, all fields are selected as the output fields.

- **timeout** (*number*) -

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise\<ResStatus>*

This method returns a promise that resolves to a **ResStatus** object.

```javascript
{
    data: list[string],
    status: object
}
```

**PARAMETERS:**

- **data** (*list[string]*) -

    A list of entities returned.

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
 const getResults = await milvusClient.get({
   collection_name: 'my_collection',
   ids: ['1','2','3','4','5','6','7','8'],
   output_fields: ["age"],
 });
```

