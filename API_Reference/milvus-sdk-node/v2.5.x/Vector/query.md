# query()

This operation conducts a scalar filtering with a specified boolean expression.

```javascript
query(data): Promise<ResStatus>
```

## Request Syntax

```javascript
 milvusClient.query({
   collection_name: string,
   consistency_level?: ConsistencyLevelEnum,
   filter: string,
   ids?: string[] | number[],
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

- **filter** (*string*) -

    A scalar filtering condition to filter matching entities. 

    You can set this parameter to an empty string to skip scalar filtering. To build a scalar filtering condition, refer to [Boolean Expression Rules](https://milvus.io/docs/boolean.md). 

- **output_fields** (*string[]*) -

    A list of field names to include in each entity in return.

    The value defaults to **None**. If left unspecified, all fields are selected as the output fields.

- **timeout** (*number*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

- **consistency_level** (*ConsistencyLevelEnum*) -

    The consistency level of the target collection.

    The value defaults to the one specified when you create the current collection, with options of **Strong** (**0**), **Bounded** (**1**), **Session** (**2**), and **Eventually** (**3**).

    <div class="admonition note">

    <p><b>what is the consistency level?</b></p>

    <p>Consistency in a distributed database specifically refers to the property that ensures every node or replica has the same view of data when writing or reading data at a given time.</p>
    <p>Milvus supports four consistency levels: <strong>Strong</strong>, <strong>Bounded Staleness</strong>, <strong>Session</strong>, and <strong>Eventually</strong>. The default consistency level in Milvus is <strong>Bounded Staleness</strong>.</p>
    <p>You can easily tune the consistency level when conducting a vector similarity search or query to make it best suit your application.</p>

    </div>

- **offset** (*number*) -

    The number of records to skip in the query result. 

    You can use this parameter in combination with `limit` to enable pagination.

    The sum of this value and `limit` should be less than 16,384. 

- **limit** (*number*) -

    The number of records to return in the query result.

    You can use this parameter in combination with `offset` to enable pagination.

    The sum of this value and `offset` should be less than 16,384. 

- **partition_names** (*string[]*) -

    The name of the partitions to query.

**RETURNS** *Promise\<QueryResults>*

This method returns a promise that resolves to a **QueryResults** object.

```javascript
{
    data: {
        [x: string]: any
    },
    status: object
}
```

**PARAMETERS:**

- **data** (*object*) -

    The query results.

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
 const queryResults = await milvusClient.query({
   collection_name: 'my_collection',
   filter: "age in [1,2,3,4,5,6,7,8]",
   output_fields: ["age"],
 });
```

