# hybridSearch()

This operation conducts a hybrid search with an optional scalar filtering expression.

```javascript
hybridSearch(data): Promise<SearchResults>
```

## Request Syntax

```javascript
milvusClient.hybridSearch({
    db_name: string,
    collection_name: string,
    partition_names?: string[], 
    data: HybridSearchSingleReq[], 
    limit?: number,
    offset?: number
    output_fields?: string | list[string],
    metric_type?: string,
    consistency_level?: string,
    ignore_growing?: boolean,
    rerank?: RerankerObj,
    group_by_field?: string;
    group_size?: number;
    strict_group_size?: boolean;
    hints?: string;
    round_decimal?: number;
    transformers? OutputTransformers;
    timeout?: number
})
```

**PARAMETERS:**

- **db_name** (*string*) -

    The name of the database that holds the target collection.

- **collection_name** (*string*) -

    **&#91;REQUIRED&#93;**

    The name of the collection to search.

- **partition_names** (*string&#91;&#93;*) -

    A list of the names of the partitions to search.

- **data** (*HybridSearchSingleReq&#91;&#93;*) -

    A list of search requests in the form of the **HybridSearchSingleReq** object.

    - **data** (*VectorTypes&#91;&#93;* | *VectorTypes*) -

        **&#91;REQUIRED&#93;**

        The query vectors. The following vector types are supported:

        - **FloatVector** (number&#91;&#93;)

        - **Float16Vector** (*number*&#91;&#93; | *Uint8Array*)

        - **BinaryVector** (*number*&#91;&#93;)

        - **BFloat16Vector** (*number*&#91;&#93; | *Uint8Array*)

        - **SparseFloatVector** (*SparseVectorArray* | *SparseVectorDic* | *SparseVectorCSR* | *SparseVectorCOO*)

            For details on how to generate a **SparseFloatVector**, refer to this [code snippet](https://github.com/milvus-io/milvus-sdk-node/blob/f8dcac6a624f20564e19e52f2f394c19605abe46/test/tools/data.ts#L155).

- **limit** (*number*) - 

    The total number of entities to return.

    You can use this parameter in combination with **offset** in **param** to enable pagination.

    The sum of this value and **offset** in **param** should be less than 16,384. 

- **offset** (*number*) - 

    The number of records to skip in the search result. 

    You can use this parameter in combination with `limit` to enable pagination.

    The sum of this value and `limit` should be less than 16,384. 

- **output_fields** (*string&#91;&#93;*) -

    A list of field names to include in each entity in return.

    The value defaults to **None**. If left unspecified, only the primary field is included.

- **metric_type** (*string*) -

    The metric type used to measure similarity between vectors. The value varies with the vector field type. The following table lists the mapping between vector field types and their supported metric types.

    <table>
       <tr>
         <th><p>Field Type</p></th>
         <th><p>Dimension Range</p></th>
         <th><p>Supported Metric Types</p></th>
         <th><p>Default Metric Type</p></th>
       </tr>
       <tr>
         <td><p><code>FLOAT_VECTOR</code></p></td>
         <td><p>2-32,768</p></td>
         <td><p><code>COSINE</code>, <code>L2</code>, <code>IP</code></p></td>
         <td><p><code>COSINE</code></p></td>
       </tr>
       <tr>
         <td><p><code>FLOAT16_VECTOR</code></p></td>
         <td><p>2-32,768</p></td>
         <td><p><code>COSINE</code>, <code>L2</code>, <code>IP</code></p></td>
         <td><p><code>COSINE</code></p></td>
       </tr>
       <tr>
         <td><p><code>BFLOAT16_VECTOR</code></p></td>
         <td><p>2-32,768</p></td>
         <td><p><code>COSINE</code>, <code>L2</code>, <code>IP</code></p></td>
         <td><p><code>COSINE</code></p></td>
       </tr>
       <tr>
         <td><p><code>INT8_VECTOR</code></p></td>
         <td><p>2-32,768</p></td>
         <td><p><code>COSINE</code>, <code>L2</code>, <code>IP</code></p></td>
         <td><p><code>COSINE</code></p></td>
       </tr>
       <tr>
         <td><p><code>SPARSE_FLOAT_VECTOR</code></p></td>
         <td><p>No need to specify the dimension.</p></td>
         <td><p><code>IP</code>, <code>BM25</code> (used only for full text search)</p></td>
         <td><p><code>IP</code></p></td>
       </tr>
       <tr>
         <td><p><code>BINARY_VECTOR</code></p></td>
         <td><p>8-32,768*8</p></td>
         <td><p><code>HAMMING</code>, <code>JACCARD</code>, <code>MHJACCARD</code></p></td>
         <td><p><code>HAMMING</code></p></td>
       </tr>
    </table>

- **consistency_level** (*ConsistencyLevelEnum*) -

    The consistency level of the target collection. The value defaults to **Bounded** (**1**) with options of **Strong** (**0**), **Bounded** (**1**), **Session** (**2**), and **Eventually** (**3**).

- **ignore_growing** (*boolean*) -

    A boolean value indicating whether to skip the search in growing segments.

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

        - When using the WeightedRanker strategy, you need to input weight values into the `WeightedRanker` function. The number of basic ANN searches in a Hybrid Search corresponds to the number of values that need to be inputted. The input values should be in the range &#91;0,1&#93;, with values closer to 1 indicating greater importance.

- **group_by_field** (*string*) -

    Groups search results by a specified field to ensure diversity and avoid returning multiple results from the same group.

- **group_size** (*number*) -

    The target number of entities to return within each group in a grouping search. For example, setting `group_size=2` instructs the system to return up to 2 of the most similar entities (e.g., document passages or vector representations) within each group. Without setting `group_size`, the system defaults to returning only 1 entity per group.

- **strict_group_size** (*boolean*) -

    This Boolean parameter dictates whether `group_size` should be strictly enforced. When `group_size=true`, the system will attempt to fill each group with exactly `group_size` results, as long as sufficient data exists within each group. If there is an insufficient number of entities in a group, it will return only the available entities, ensuring that groups with adequate data meet the specified `group_size`.

- **hints** (*string*) -

     A hints string to improve search performance.

- **round_decimal** (*number*) -

    The number of decimal places to keep in the final results.

- **transformers** (*OutputTransformers*) -

    A custom function to convert data for the following data types:

    - BFloat16Vector (`(bf16bytes: Uint8Array) => BFloat16Vector;`)

    - Float16Vector (`(f16: Uint8Array) => Float16Vector;`)

    - SparseFloatVector (`(sparse: SparseVectorDic) => SparseFloatVector;`)

- **timeout** (*number*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise\&lt;SearchResults&gt;*

This method returns a promise that resolves to a **SearchResults** object.

```javascript
{
    status: object,
    results: list[string],
    recalls: list[number]
}
```

**PARAMETERS:**

- **status** (*object*) -

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds. 

    - **reason** (*string*) - 

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

- **results** (*list&#91;object&#93;*) -

    Each result object has the following keys:

    - **id** (*string*) -

        The ID of the search result

    - **score**(*number*) -

        The similarity score of the search result.

    - Plus output fields and their values.

- **recalls** (*list&#91;number&#93;*) -

    Each number indicates the recall rate of a search against a query vector.

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

