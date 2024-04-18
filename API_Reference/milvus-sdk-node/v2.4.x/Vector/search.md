# search()

This operation conducts a vector similarity search with an optional scalar filtering expression.

```javascript
search(data): Promise<ResStatus>
```

## Request Syntax{#request-syntax}

This method has the following alternatives.

### With SearchReq{#with-searchreq}

```javascript
milvusClient.search({
   collection_name: string,
   consistency_level: ConsistencyLevelEnum,
   expr: string,
   nq: number,
   output_fields: string[],
   partition_names: string[],
   search_params: SearchParam,
   timeout: number,
   travel_timestamp: string,
   vector_type: BinaryVector | FloatVector,
   vectors: number[][]
 })
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of the collection to search

- **search_params** (*SearchParam*) -

    **[REQUIRED]**

    The search parameters.

- **vector_type** (*BinaryVector* | *FloatVector*) -

    **[REQUIRED]**

    The type of the search vector. 

    Possible values are **BinaryVector** and  **FloatVector.**

- **vector** (number[][]) -

    **[REQUIRED]**

    A list of vector embeddings.

    Milvus searches for the most similar vector embeddings to the specified ones.

- **consistency_level** (ConsistencyLevelEnum) -

    The consistency level of the target collection. The value defaults to **Bounded** (**1**) with options of **Strong** (**0**), **Bounded** (**1**), **Session** (**2**), and **Eventually** (**3**).

    <div class="admonition note">

    <p><b>what is the consistency level?</b></p>

    <p>Consistency in a distributed database specifically refers to the property that ensures every node or replica has the same view of data when writing or reading data at a given time.</p>
    <p>Milvus supports four consistency levels: <strong>Strong</strong>, <strong>Bounded Staleness</strong>, <strong>Session</strong>, and <strong>Eventually</strong>. The default consistency level in Milvus is <strong>Bounded Staleness</strong>.</p>
    <p>You can easily tune the consistency level when conducting a vector similarity search or query to make it best suit your application.</p>

    </div>

- **expr** (*string*) -

    A scalar filtering condition to filter matching entities. 

    You can set this parameter to an empty string to skip scalar filtering. To build a scalar filtering condition, refer to [Boolean Expression Rules](https://milvus.io/docs/boolean.md). 

- **nq** (*number*) -

    The number of data clusters to query.

- **output_fields** (*string[]*) -

    A list of field names to include in each entity in return.

    The value defaults to **None**. If left unspecified, only the primary field is included.

- **partition_names** (*string[]*) -

    A list of the names of the partitions to search.

- **timeout** (*number*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

- **travel_timestamp** (*string*) -

    A valid timestamp. 

    If this parameter is set, MilvusZilliz Cloud executes the query only if all entities inserted before this timestamp are visible to query nodes. 

    <div class="admonition note">

    <p><b>notes</b></p>

    <p>This parameter is valid when the default consistency level applies.</p>

    </div>

**RETURNS** *Promise\<SearchResults>*

This method returns a promise that resolves to a **SearchResults** object.

```javascript
{
    results: SearchResultData[],
    status: object
}
```

**PARAMETERS:**

- **results** (SearchResultData[]) -

    - **id** (*string*) -

        The ID of the search result

    - **score**(*number*) -

        The similarity score of the search result.

    - Plus output fields and their values.

- **status** (*object*) -

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds. 

    - **reason** (*string*) - 

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

### With SearchSimpleReq{#with-searchsimplereq}

```javascript
milvusClient.search({
   collection_name: string,
   consistency_level: string,
   data?: number[] | number[][],
   filter: string,
   ignore_growing?: boolean,
   limit?: number,
   metric_type?: string,
   offset?: number
   output_fields?: string | list[string],
   partition_names?: string | list[string],
   timeout?: number,
   topk?: number,
   vector?: number[],
   vectors?: number[][]
 })
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of the collection to search

- **consistency_level** (*ConsistencyLevelEnum*) -

    The consistency level of the target collection. The value defaults to **Bounded** (**1**) with options of **Strong** (**0**), **Bounded** (**1**), **Session** (**2**), and **Eventually** (**3**).

- **data** (*number[]* | *number[][]*) -

    A list of vector embeddings.

    Milvus searches for the most similar vector embeddings to the specified ones.

- **filter** (*string*) -

    A scalar filtering condition to filter matching entities. 

    The value defaults to an empty string, indicating that no condition applies.

    You can set this parameter to an empty string to skip scalar filtering. To build a scalar filtering condition, refer to [Boolean Expression Rules](https://milvus.io/docs/boolean.md). 

- **metric_type** (*string*) -

    The metric type applied to this operation. This should be the same as the one used when you index the vector field specified above. 

    Possible values are **L2**, **IP**, and **COSINE**.

- **ignore_growing** (*boolean*) -

    A boolean value indicating whether to skip the search in growing segments.

- **limit** (*number*) - 

    The total number of entities to return.

    You can use this parameter in combination with **offset** in **param** to enable pagination.

    The sum of this value and **offset** in **param** should be less than 16,384. 

- **offset** (*number*) - 

    The number of records to skip in the search result. 

    You can use this parameter in combination with `limit` to enable pagination.

    The sum of this value and `limit` should be less than 16,384. 

- **params** (*KeyValueObj*) -

    The additional search parameters in key-value pairs.

- **output_fields** (*string[]*) -

    A list of field names to include in each entity in return.

    The value defaults to **None**. If left unspecified, only the primary field is included.

- **partition_names** (*string[]*) -

    A list of the names of the partitions to search.

- **timeout** (*number*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

- **topk** (*number*) -

    **[REQUIRED]**

    The number of results to return.

**RETURNS** *Promise\<SearchResults>*

This method returns a promise that resolves to a **SearchResults** object.

```javascript
{
    data: list[string],
    status: object
}
```

**PARAMETERS:**

- **results** (*object*) -

    - **id** (*string*) -

        The ID of the search result

    - **score**(*number*) -

        The similarity score of the search result.

    - Plus output fields and their values.

- **status** (*object*) -

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds. 

    - **reason** (*string*) - 

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

## Example{#example}

```java

```

