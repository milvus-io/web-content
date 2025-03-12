# hybridSearch()

This operation conducts a hybrid search with an optional scalar filtering expression.

```javascript
hybridSearch(data): Promise<SearchResults>
```

## Request Syntax

```javascript
milvusClient.search({
   db_name: string,
   collection_name: string,
   partition_names?: string[], 
   data: HybridSearchSingleReq[], 
   filter: string,
   limit?: number,
   offset?: number
   output_fields?: string | list[string],
   partition_names?: string | list[string],
   consistency_level?: string,
   ignore_growing?: boolean,
   rerank?: RerankerObj,
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

- **data** (*HybridSearchSingleReq[]*) -

    A list of search requests in the form of the **HybridSearchSingleReq** object.

    - **data** (*VectorTypes[]* | *VectorTypes*) -

        **[REQUIRED]**

        The query vectors. The following vector types are supported:

        - **FloatVector** (number[])

        - **Float16Vector** (*number*[] | *Uint8Array*)

        - **BinaryVector** (*number*[])

        - **BFloat16Vector** (*number*[] | *Uint8Array*)

        - **SparseFloatVector** (*SparseVectorArray* | *SparseVectorDic* | *SparseVectorCSR* | *SparseVectorCOO*)

            For details on how to generate a **SparseFloatVector**, refer to this [code snippet](https://github.com/milvus-io/milvus-sdk-node/blob/f8dcac6a624f20564e19e52f2f394c19605abe46/test/tools/data.ts#L155).

    - **limit** (*string*) - 

        The maximum number of results to return in the request. When performing a hybrid search with multiple ANN search requests, the top results defined by **limit** from each request will be combined and re-ranked before returning the final search results.

    - **expr** (*string*) -

        The expression to filter the results.

    - **exprValues** (*keyValueObj*) -

        If you choose to use placeholders in `filter` as stated in [Filtering Templating](https://milvus.io/docs/filtering-templating.md), then you can specify the actual values for these placeholders as key-value pairs as the value of this parameter.

    - **params** (*KeyValueObj*) -

        The additional search parameters in key-value pairs.

        - **radius** (*number*) -

            Determines the threshold of least similarity. When setting `metric_type` to `L2`, ensure that this value is greater than that of **range_filter**. Otherwise, this value should be lower than that of **range_filter**. 

        - **range_filter**  (*number*) -  

            Refines the search to vectors within a specific similarity range. When setting `metric_type` to `IP` or `COSINE`, ensure that this value is greater than that of **radius**. Otherwise, this value should be lower than that of **radius**.

        - **max_empty_result_buckets** (*number*)

            This param is only used for range search for IVF-serial indexes, including **BIN_IVF_FLAT**, **IVF_FLAT**, **IVF_SQ8**, **IVF_PQ**, and **SCANN**. The value defaults to 1 and ranges from 1 to 65536.

            During range search, the search process terminates early if the number of buckets with no valid range search results reaches the specified value. Increasing this parameter improves range search recall.

- **limit** (*number*) - 

    The total number of entities to return.

    You can use this parameter in combination with **offset** in **param** to enable pagination.

    The sum of this value and **offset** in **param** should be less than 16,384. 

- **offset** (*number*) - 

    The number of records to skip in the search result. 

    You can use this parameter in combination with `limit` to enable pagination.

    The sum of this value and `limit` should be less than 16,384. 

- **output_fields** (*string[]*) -

    A list of field names to include in each entity in return.

    The value defaults to **None**. If left unspecified, only the primary field is included.

- **partition_names** (*string[]*) -

    A list of the names of the partitions to search.

- **reranker** (*RerankerObj*) -

    A reranking strategy with its custom parameters.

    - **strategy** (*string*) -

        A re-ranking strategy. Possible values are:

        - **RRF** ("rrf")

            This strategy is recommended when there is no specific emphasis. The RRF can effectively balance the importance of each vector field.

        - **WEIGHTED** ("weighted")

            This strategy is recommended if you require the results to emphasize a particular vector field. The WeightedRanker allows you to assign higher weights to certain vector fields, emphasizing them more. For instance, in multimodal searches, textual descriptions of an image might be considered more important than the colors in this image.

    - **params** (*keyValueObj*) -

        The parameters are specific to reranking strategies.

        - When using the RRFRanker strategy, you need to input the parameter value `k` into the RRFRanker. The default value of `k` is 60. This parameter helps to determine how the ranks are combined from different ANN searches, aiming to balance and blend the importance across all searches.

        - When using the WeightedRanker strategy, you need to input weight values into the `WeightedRanker` function. The number of basic ANN searches in a Hybrid Search corresponds to the number of values that need to be inputted. The input values should be in the range [0,1], with values closer to 1 indicating greater importance.

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

```plaintext
const { MilvusClient, DataType } = require("@zilliz/milvus2-sdk-node")

res = await client.loadCollection({
    collection_name: "hybrid_search_collection"
})

const search = await client.search({
  collection_name: "hybrid_search_collection",
  data: [search_param_1, search_param_2],
  limit: 2,
  rerank: RRFRanker(100)
});
```

