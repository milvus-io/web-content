# GeminiEmbeddingFunction

**Model2VecEmbeddingFunction** is a class in pymilvus that handles encoding text into embeddings using the GeminiEmbeddingFunction module to support embedding retrieval in Milvus.

```python
pymilvus.model.dense.GeminiEmbeddingFunction
```

## Constructor

Constructs an GeminiEmbeddingFunction for common use cases.

```python
GeminiEmbeddingFunction(
    model_name: str = "gemini-embedding-exp-03-07",
    api_key: Optional[str] = None,
    config: Optional['types.EmbedContentConfig']=None,
    **kwargs,
)
```

**PARAMETERS:**

- **model_name (string) -**

    The name of the Gemini model to use for encoding. Valid options are **gemini-embedding-exp-03-07**(default), **models/embedding-001**, and **models/text-embedding-004**.

- **api_key (*string*)-**

The API key for accessing the Gemini API.

- **config** **(*types.EmbedContentConfig*) -**

    Optional configuration for the embedding model.

    - The **output_dimensionality** can be specified to the number of resulting output embeddings.

        <table>
           <tr>
             <th><p><strong>Model Name</strong></p></th>
             <th><p><strong>Dimensions</strong></p></th>
           </tr>
           <tr>
             <td><p>emini-embedding-exp-03-07</p></td>
             <td><p>3072(<em>default</em>),1536,768</p></td>
           </tr>
           <tr>
             <td><p>models/embedding-001</p></td>
             <td><p>768</p></td>
           </tr>
           <tr>
             <td><p>models/text-embedding-004</p></td>
             <td><p>768</p></td>
           </tr>
        </table>

    - The **task_type** can be specified to generate optimized embeddings for specific tasks, saving you time and cost and improving performance. Only supported in the **gemini-embedding-exp-03-07** model.

        <table>
           <tr>
             <th><p>Task Type</p></th>
             <th><p>Description</p></th>
           </tr>
           <tr>
             <td><p>SEMANTIC_SIMILARITY</p></td>
             <td><p>Used to generate embeddings that are optimized to assess text similarity.</p></td>
           </tr>
           <tr>
             <td><p>CLASSIFICATION</p></td>
             <td><p>Used to generate embeddings that are optimized to classify texts according to preset labels.</p></td>
           </tr>
           <tr>
             <td><p>CLUSTERING</p></td>
             <td><p>Used to generate embeddings that are optimized to cluster texts based on their similarities.</p></td>
           </tr>
           <tr>
             <td><p>RETRIEVAL_DOCUMENT, RETRIEVAL_QUERY, QUESTION_ANSWERING, and FACT_VERIFICATION</p></td>
             <td><p>Used to generate embeddings that are optimized for document search or information retrieval.</p></td>
           </tr>
           <tr>
             <td><p>CODE_RETRIEVAL_QUERY</p></td>
             <td><p>Used to retrieve a code block based on a natural language query, such as sort an array or reverse a linked list. Embeddings of the code blocks are computed using RETRIEVAL_DOCUMENT.</p></td>
           </tr>
        </table>

## Examples

```python
from pymilvus import model

gemini_ef = model.dense.GeminiEmbeddingFunction(
    model_name="gemini-embedding-exp-03-07",
    api_key="YOUR_API_KEY",
)
```

