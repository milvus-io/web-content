# search()

This operation conducts a vector similarity search with an optional scalar filtering expression.

```javascript
search(data): Promise<ResStatus>
```

## Request Syntax

```javascript
milvusClient.search({
   db_name: string,
   collection_name: string,
   partition_names?: string[], 
   data: number[] | number[][], 
   filter: string,
   limit?: number,
   offset?: number
   output_fields?: string | list[string],
   partition_names?: string | list[string],
   consistency_level?: string,
   ignore_growing?: boolean,
   timeout?: number,
 })
```

**PARAMETERS:**

- **db_name** (*string*) -

    The name of the database that holds the target collection.

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

    - **radius** (*number*) -

        Determines the threshold of least similarity. When setting `metric_type` to `L2`, ensure that this value is greater than that of **range_filter**. Otherwise, this value should be lower than that of **range_filter**. 

    - **range_filter**  (*number*) -  

        Refines the search to vectors within a specific similarity range. When setting `metric_type` to `IP` or `COSINE`, ensure that this value is greater than that of **radius**. Otherwise, this value should be lower than that of **radius**.

    - **max_empty_result_buckets** (*number*)

        This param is only used for range search for IVF-serial indexes, including **BIN_IVF_FLAT**, **IVF_FLAT**, **IVF_SQ8**, **IVF_PQ**, and **SCANN**. The value defaults to 1 and ranges from 1 to 65536.

        During range search, the search process terminates early if the number of buckets with no valid range search results reaches the specified value. Increasing this parameter improves range search recall.

- **output_fields** (*string[]*) -

    A list of field names to include in each entity in return.

    The value defaults to **None**. If left unspecified, only the primary field is included.

- **partition_names** (*string[]*) -

    A list of the names of the partitions to search.

- **timeout** (*number*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

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

## Example

```java

```

