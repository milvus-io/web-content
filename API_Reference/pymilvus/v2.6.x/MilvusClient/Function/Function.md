# Function

A `Function` instance for generating vector embeddings from user-provided raw data or applying a reranking strategy to the search results in Milvus.

```python
class pymilvus.Function
```

## Constructor

This constructor initializes a new `Function` instance designed to transform user's raw data into vector embeddings or applying a reranking strategy to the search results. This is achieved through an automated process that simplifies similarity search operations.

```python
Function(
    name: str,
    function_type: FunctionType,
    input_field_names: Union[str, List[str]],
    output_field_names: Union[str, List[str]],
    description: str = "",
)
```

**PARAMETERS:**

- `name` (*str*) -

    **&#91;REQUIRED&#93;**

    The name of the function. This identifier is used to reference the function within queries and collections.

- `function_type` (*FunctionType*) -

    **&#91;REQUIRED&#93;**

    The type of embedding function to use. Possible values:

    - `FunctionType.BM25`: Generates sparse vectors based on the BM25 ranking algorithm from a `VARCHAR` field.

    - `FunctionType.TEXTEMBEDDING`: Generates dense vectors that capture semantic meaning from a `VARCHAR` field.

    - `FunctionType.RERANK`: Applies reranking strategies to the search results.

- `input_field_names` (*Union&#91;str, List&#91;str&#93;&#93;*) -

    **&#91;REQUIRED&#93;**

    The name of the field containing the raw data that requires conversion to a vector representation. This parameter accepts only one field name.

- `output_field_names` (*Union&#91;str, List&#91;str&#93;&#93;*) -

    The name of the field where the generated embeddings will be stored. This should correspond to a vector field defined in the collection schema. This parameter accepts only one field name.

    <div class="admonition note">

    <p><b>notes</b></p>

    <p>This applies only when you set <code>function_type</code> to <code>FunctionType.BM25</code> and <code>FunctionType.TEXTEMBEDDING</code>.</p>

    </div>

- `params` (*dict*) -

    A configuration dictionary for the embedding/ranking function. Supported keys vary by `function_type`:

    - `FunctionType.BM25`: No parameters required. Pass an empty dictionary or omit entirely.

    - `FunctionType.TEXTEMBEDDING`:

        - `provider` (*str*) -

            The embedding model provider. Possible values are as follows:

            - `openai` ([OpenAI](https://milvus.io/docs/openai.md))

            - `azure_openai` ([Microsoft Azure OpenAI](https://milvus.io/docs/azure-openai.md))

            - `dashscope` ([DashScope](https://milvus.io/docs/dashscope.md))

            - `bedrock` ([Amazon Bedrock](https://milvus.io/docs/bedrock.md))

            - `vertexai` ([Google Cloud Vertext AI](https://milvus.io/docs/vertex-ai.md))

            - `voyageai` ([Voyage AI](https://milvus.io/docs/voyage-ai.md))

            - `cohere` ([Cohere](https://milvus.io/docs/cohere.md))

            - `siliconflow` ([SiliconFlow](https://milvus.io/docs/siliconflow.md))

            - `TEI` ([Hugging Face Text Embedding Inference](https://milvus.io/docs/hugging-face-tei.md))

        - `model_name` (*str*) -

            The name of the embedding model to use. The value varies with the provider. For details, refer to their respective document page.

        - `credential` (*str*) -

            The label of a credential defined in the top-level `credential:` section of `milvus.yaml`. 

            - When provided, Milvus retrieves the matching key pair or API token and signs the request on the server side.

            - When omitted (`None`), Milvus falls back to the credential explicitly configured for the target model provider in `milvus.yaml`.

            - If the label is unknown or the referenced key is missing, the call fails.

        - `dim` (*str*) -

            The number of dimensions for the output embeddings. For OpenAI's third-generation models, you can shorten the full vector to reduce cost and latency without a significant loss of semantic information. For more information, refer to [OpenAI announcement blog post](https://openai.com/blog/new-embedding-models-and-api-updates).

            <div class="admonition note">

            <p><b>notes</b></p>

            <p>If you shorten the vector dimension, ensure the <code>dim</code> value specified in the schema's <code>add_field</code> method for the vector field matches the final output dimension of your embedding function.</p>

            </div>

    - `FunctionType.RERANK`: Configure `params` based on reranker type:

        - **Weighted Ranker**

            ```python
            params = {
                "reranker": "weighted", # Required
                "weights": [0.1, 0.9], # List[float], weights per search path ∈ [0,1]
                "norm_score": True  # Optional
            }
            ```

            - `reranker` (*str*): Specifies the reranking method to use. Must be set to `weighted` to use Weighted Ranker.

            - `weights` (*List&#91;float&#93;*): Array of weights corresponding to each search path; values ∈ &#91;0,1&#93;. For details, refer to [Mechanism of Weighted Ranker](https://milvus.io/docs/weighted-ranker.md#Mechanism-of-Weighted-Ranker).

            - `norm_score` (*boolean*): Whether to normalize raw scores (using arctan) before weighting. For details, refer to [Mechanism of Weighted Ranker](https://milvus.io/docs/weighted-ranker.md#Mechanism-of-Weighted-Ranker).

        - **RRF Ranker**

            ```python
            params = {
                "reranker": "rrf", # Required
                "k": 100  # Optional (default: 60)
            }
            ```

            - `reranker` (*str*): Specifies the reranking method to use. Must be set to `"rrf"` to use RRF Ranker.

            - `k` (*int*): Smoothing parameter that controls the impact of document ranks; higher `k` reduces sensitivity to top ranks. Value range: (0, 16384); default: `60`. For details, refer to [Mechanism of RRF Ranker](https://milvus.io/docs/rrf-ranker.md#Mechanism-of-RRF-Ranker).

        - **Decay Ranker**

            ```python
            params={
                "reranker": "decay",            # Specify decay reranker. Must be "decay"
                "function": "gauss",            # Choose decay function type: "gauss", "exp", or "linear"
                "origin": 1720000000,           # Reference point (e.g., Unix timestamp)
                "scale": 7 * 24 * 60 * 60,      # 7 days in seconds
                "offset": 24 * 60 * 60,         # 1 day no-decay zone
                "decay": 0.5                    # Half score at scale distance
            }
            ```

            - `reranker` (*str*): Specifies the reranking method to use. Must be set to `"decay"` to enable decay ranking functionality.

            - `function` (*str*): Specifies which mathematical decay ranker to apply. Possible values: `"gauss"`, `"expr"`, `"linear"`. For details, refer to [Choose the right decay ranker](https://milvus.io/docs/decay-ranker-overview.md#Choose-the-right-decay-ranker).

            - `origin` (*int*): Reference point from which decay score is calculated.

            - `scale`  (*int*): Distance or time at which relevance drops to the `decay` value.

            - `offset` (*int*): Creates a "no-decay zone" around the `origin` where items maintain full scores (decay score = 1.0).

            - `decay` (*float*): Score value at the `scale` distance, controls curve steepness.

            For details on decay ranking, refer to [Decay Ranker Overview](https://milvus.io/docs/decay-ranker-overview.md).

        - **Model Ranker**

            **TEI Provider**:

            ```python
            params={
                "reranker": "model",  # Specify model reranker. Must be "model"
                "provider": "tei",  # Choose provider: "tei" or "vllm"
                "queries": ["machine learning for time series"],  # Query text
                "endpoint": "http://model-service:8080",  # Model service endpoint
                "max_client_batch_size": 32,  # Optional (default: 32)
                "truncate": True,                # Optional: Truncate the inputs that are longer than the maximum supported size
                "truncation_direction": "Right",    # Optional: Direction to truncate the inputs
            }
            ```

            **vLLM Provider**:

            ```python
            params={
                "reranker": "model",        # Specifies model-based reranking
                "provider": "vllm",         # Specifies vLLM service
                "queries": ["renewable energy developments"],  # Query text
                "endpoint": "http://localhost:8080",  # vLLM service address
                "max_client_batch_size": 64,              # Optional: batch size
                "truncate_prompt_tokens": 256,  # Optional: Use last 256 tokens
            }
            ```

            **Cohere Provider**:

            ```python
            params = {
                "reranker": "model",                  # Enables model-based reranking
                "provider": "cohere",                 # Specifies Cohere as the service provider
                "model_name": "rerank-english-v3.0",  # Cohere rerank model to use
                "queries": ["renewable energy developments"],  # Query text for relevance evaluation
                "max_client_batch_size": 128,         # Optional: batch size for model service requests (default: 128)
                "max_tokens_per_doc": 4096,           # Optional: max tokens per document (default: 4096)
                "credential": "your-cohere-api-key" # Optional: authentication credential for Cohere API
            }
            ```

            **Voyage AI Provider**:

            ```python
            params = {
                "reranker": "model",                    # Enables model-based reranking
                "provider": "voyageai",                 # Specifies Voyage AI as the service provider
                "model_name": "rerank-2.5",             # Voyage AI reranker to use
                "queries": ["renewable energy developments"],  # Query text for relevance evaluation
                "max_client_batch_size": 128,           # Optional: batch size for model service requests (default: 128)
                "truncation": True,                     # Optional: enable input truncation (default: True)
                "credential": "your-voyage-api-key"   # Optional: if not set, uses VOYAGE_API_KEY env var
            }
            
            ```

            **SiliconFlow Provider**:

            ```python
            params = {
                "reranker": "model",                        # Enables model-based reranking
                "provider": "siliconflow",                  # Specifies SiliconFlow as the service provider
                "model_name": "BAAI/bge-reranker-v2-m3",    # SiliconFlow reranking model to use
                "queries": ["renewable energy developments"],  # Query text for relevance evaluation
                "max_client_batch_size": 128,               # Optional: batch size for model service requests (default: 128)
                "max_chunks_per_doc": 5,                    # Optional: max chunks per document for supported models
                "overlap_tokens": 50,                       # Optional: token overlap between chunks for supported models
                "credential": "your-siliconflow-api-key"  # Optional: if not set, uses SILICONFLOW_API_KEY env var
            }
            ```

            - `reranker` (*str*): Must be set to `"model"` to enable model reranking.

            - `provider` (*str*): The model service provider to use for reranking. Possible values: `"tei"` or `"vllm"`. For details, refer to [Choose a model provider for your needs](https://milvus.io/docs/model-ranker-overview.md#Choose-a-model-provider-for-your-needs).

            - `queries` (*List&#91;str&#93;*): List of query strings used by the reranking model to calculate relevance scores.

            - `endpoint` (*str*): URL of the model service.

            - `max_client_batch_size` *(int)*: Maximum number of documents to process in a single batch. Default: 32.

            - `truncate` *(bool)*: **&#91;TEI only&#93;** Whether to truncate inputs that exceed the maximum supported size. For details, refer to [TEI Ranker](https://milvus.io/docs/tei-ranker.md).

            - `truncation_direction` (*str*): **&#91;TEI only&#93;** Direction for truncation (`"Left"` or `"Right"`). For details, refer to [TEI Ranker](https://milvus.io/docs/tei-ranker.md).

            - `truncate_prompt_tokens` *(int)*: **&#91;vLLM only&#93;** Number of tokens to keep from the end of the prompt when truncating. For details, refer to [vLLM Ranker](https://milvus.io/docs/vllm-ranker.md).

            - `max_tokens_per_doc` *(int)*: **&#91;Cohere only&#93;** Maximum number of tokens per document. Long documents will be automatically truncated to the specified number of tokens. For details, refer to Cohere Ranker.

            - `truncation` *(bool)*: **&#91;Voyage AI only&#93;** Whether to truncate the input to satisfy the "context length limit" on the query and the documents. For details, refer to Voyage AI Ranker.

            - `max_chunks_per_doc` *(int)*: **&#91;SiliconFlow only&#93;** Maximum number of chunks generated from within a document. For details, refer to SiliconFlow Ranker.

            - `overlap_tokens`  *(int)*: **&#91;SiliconFlow only&#93;** Number of token overlaps between adjacent chunks when documents are chunked. For details, refer to SiliconFlow Ranker.

- `description` (*str*) -

    **&#91;OPTIONAL&#93;**

    A brief description of the function's purpose. This can be useful for documentation or clarity in larger projects and defaults to an empty string.

**RETURN TYPE:**

Instance of `Function` that encapsulates the specific processing behavior for converting raw data to vector embeddings.

**RETURNS:**

A `Function` object that can be registered with a Milvus collection, facilitating automatic embedding generation during data insertion.

**EXCEPTIONS:**

- `UnknownFunctionType`

    This exception will be raised when an unsupported or unrecognized function type is specified.

- `FunctionIncorrectInputOutputType`

    This exception will be raised when one or more field names in `input_field_names` or `output_field_names` are not strings.

- `FunctionDuplicateInputs`

    This exception will be raised when there are duplicate field names in `input_field_names`.

- `FunctionDuplicateOutputs`

    This exception will be raised when there are duplicate field names in `output_field_names`.

- `FunctionCommonInputOutput`

    This exception will be raised when there is an overlap between `input_field_names` and `output_field_names`, meaning that the same field name is present in both.

## Examples

- Use `BM25`

    ```python
    from pymilvus import Function, FunctionType
    
    # use BM25
    bm25_function = Function(
        name="bm25_fn",
        input_field_names=["document_content"],
        output_field_names=["sparse_vector"],
        function_type=FunctionType.BM25,
    )
    ```

- Use `TEXTEMBEDDING`

    ```python
    from pymilvus import Function, FunctionType
    
    # use TEXTEMBEDDING
    text_embedding_function = Function(
        name="openai_embedding",                        # Unique identifier for this embedding function
        function_type=FunctionType.TEXTEMBEDDING,       # Type of embedding function
        input_field_names=["document"],                 # Scalar field to embed
        output_field_names=["dense"],                   # Vector field to store embeddings
        params={                                        # Provider-specific configuration (highest priority)
            "provider": "openai",                       # Embedding model provider
            "model_name": "text-embedding-3-small",     # Embedding model
            # "credential": "apikey1",                    # Optional: Credential label specified in milvus.yaml
            # Optional parameters:
            # "dim": "1536",                            # Optionally shorten the output vector dimension
            # "user": "user123"                         # Optional: identifier for API tracking
        }
    )
    ```

- Use `RERANK`

    ```python
    from pymilvus import Function, FunctionType
    
    # use RERANK
    model_ranker = Function(
        name="semantic_ranker",  # Function identifier
        input_field_names=["document"],  # VARCHAR field to use for reranking
        function_type=FunctionType.RERANK,  # Must be set to RERANK
        params={
            "reranker": "model",  # Specify model reranker. Must be "model"
            "provider": "tei",  # Choose provider: "tei" or "vllm"
            "queries": ["machine learning for time series"],  # Query text
            "endpoint": "http://model-service:8080",  # Model service endpoint
            # "max_client_batch_size": 32  # Optional: batch size for processing
        }
    )
    ```
