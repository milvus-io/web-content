---
id: vllm-ranker.md
title: Clasificador vLLMCompatible with Milvus 2.6.x
summary: >-
  El vLLM Ranker aprovecha el marco de inferencia vLLM para mejorar la
  relevancia de las búsquedas mediante la reordenación semántica. Representa un
  enfoque avanzado de la ordenación de los resultados de búsqueda que va más
  allá de la similitud vectorial tradicional.
beta: Milvus 2.6.x
---
<h1 id="vLLM-Ranker" class="common-anchor-header">Clasificador vLLM<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#vLLM-Ranker" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><p>El clasificador vLLM aprovecha el marco de inferencia <a href="https://docs.vllm.ai/en/latest/index.html">vLLM</a> para mejorar la relevancia de las búsquedas mediante la reordenación semántica. Representa un enfoque avanzado de la ordenación de los resultados de búsqueda que va más allá de la tradicional similitud vectorial.</p>
<p>vLLM Ranker es especialmente valioso para aplicaciones en las que la precisión y el contexto son fundamentales, como:</p>
<ul>
<li><p>Búsqueda de documentación técnica que requiere una comprensión profunda de los conceptos</p></li>
<li><p>Bases de datos de investigación en las que las relaciones semánticas pesan más que la concordancia de palabras clave.</p></li>
<li><p>Sistemas de atención al cliente que deben relacionar los problemas de los usuarios con las soluciones pertinentes.</p></li>
<li><p>Búsqueda en comercio electrónico que debe comprender los atributos del producto y la intención del usuario.</p></li>
</ul>
<p>En comparación con <a href="/docs/es/tei-ranker.md">TEI Ranker</a>, vLLM Ranker ofrece una mayor flexibilidad en la selección y personalización de modelos, por lo que resulta ideal para aplicaciones de búsqueda especializadas o complejas en las que las opciones de configuración adicionales aportan ventajas significativas.</p>
<h2 id="Prerequisites" class="common-anchor-header">Requisitos previos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Antes de implementar vLLM Ranker en Milvus, asegúrese de que dispone de:</p>
<ul>
<li><p>Una colección Milvus con un campo <code translate="no">VARCHAR</code> que contenga el texto que se va a jerarquizar.</p></li>
<li><p>Un servicio vLLM en ejecución con capacidades de renumeración. Para obtener instrucciones detalladas sobre la configuración de un servicio vLLM, consulte la <a href="https://docs.vllm.ai/en/latest/getting_started/installation.html">documentación oficial de vLLM</a>. Para verificar la disponibilidad del servicio vLLM:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Replace YOUR_VLLM_ENDPOINT_URL with the actual URL (e.g., http://&lt;service-ip&gt;:&lt;port&gt;/v1/rerank)</span>
<span class="hljs-comment"># Replace &#x27;BAAI/bge-reranker-base&#x27; if you deployed a different model</span>

curl -X <span class="hljs-string">&#x27;POST&#x27;</span> \
  <span class="hljs-string">&#x27;YOUR_VLLM_ENDPOINT_URL&#x27;</span> \
  -H <span class="hljs-string">&#x27;accept: application/json&#x27;</span> \
  -H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
  -d <span class="hljs-string">&#x27;{
  &quot;model&quot;: &quot;BAAI/bge-reranker-base&quot;,
  &quot;query&quot;: &quot;What is the capital of France?&quot;,
  &quot;documents&quot;: [
    &quot;The capital of Brazil is Brasilia.&quot;,
    &quot;The capital of France is Paris.&quot;,
    &quot;Horses and cows are both animals&quot;
  ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Una respuesta correcta debería devolver los documentos clasificados por puntuaciones de relevancia, de forma similar a la respuesta de la API rerank de OpenAI.</p>
<p>Consulte la <a href="https://docs.vllm.ai/en/latest/serving/openai_compatible_server.html#re-rank-api">documentación del servidor compatible con OpenAI de</a> vLLM para obtener más argumentos y opciones del servidor.</p></li>
</ul>
<h2 id="Create-a-vLLM-ranker-function" class="common-anchor-header">Crear una función vLLM ranker<button data-href="#Create-a-vLLM-ranker-function" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Para utilizar vLLM Ranker en su aplicación Milvus, cree un objeto Function que especifique cómo debe operar el reranking. Esta función se pasará a las operaciones de búsqueda de Milvus para mejorar la clasificación de los resultados.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType

<span class="hljs-comment"># Connect to your Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>  <span class="hljs-comment"># Replace with your Milvus server URI</span>
)

<span class="hljs-comment"># Create a vLLM Ranker function</span>
vllm_ranker = Function(
    name=<span class="hljs-string">&quot;vllm_semantic_ranker&quot;</span>,    <span class="hljs-comment"># Choose a descriptive name</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># Field containing text to rerank</span>
    function_type=FunctionType.RERANK,  <span class="hljs-comment"># Must be RERANK</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,        <span class="hljs-comment"># Specifies model-based reranking</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;vllm&quot;</span>,         <span class="hljs-comment"># Specifies vLLM service</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;renewable energy developments&quot;</span>],  <span class="hljs-comment"># Query text</span>
        <span class="hljs-string">&quot;endpoint&quot;</span>: <span class="hljs-string">&quot;http://localhost:8080&quot;</span>,  <span class="hljs-comment"># vLLM service address</span>
       <span class="hljs-comment"># &quot;maxBatch&quot;: 64              # Optional: batch size</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Apply-to-standard-vector-search" class="common-anchor-header">Aplicar a la búsqueda vectorial estándar<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Para aplicar vLLM Ranker a una búsqueda vectorial estándar:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Execute search with vLLM reranking</span>
results = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    data=[<span class="hljs-string">&quot;AI Research Progress&quot;</span>, <span class="hljs-string">&quot;What is AI&quot;</span>],  <span class="hljs-comment"># Search queries</span>
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,                   <span class="hljs-comment"># Vector field to search</span>
    limit=<span class="hljs-number">5</span>,                                     <span class="hljs-comment"># Number of results to return</span>
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],                  <span class="hljs-comment"># Include text field for reranking</span>
<span class="highlighted-wrapper-line">    ranker=vllm_ranker,                         <span class="hljs-comment"># Apply vLLM reranking</span></span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Apply-to-hybrid-search" class="common-anchor-header">Aplicar a la búsqueda híbrida<button data-href="#Apply-to-hybrid-search" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>vLLM Ranker también puede utilizarse con la búsqueda híbrida para combinar métodos de recuperación densos y dispersos:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Configure dense vector search</span>
dense_search = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;AI Research Progress&quot;</span>, <span class="hljs-string">&quot;What is AI&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">5</span>
)

<span class="hljs-comment"># Configure sparse vector search  </span>
sparse_search = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;AI Research Progress&quot;</span>, <span class="hljs-string">&quot;What is AI&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>, 
    param={},
    limit=<span class="hljs-number">5</span>
)

<span class="hljs-comment"># Execute hybrid search with vLLM reranking</span>
hybrid_results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    [dense_search, sparse_search],              <span class="hljs-comment"># Multiple search requests</span>
    ranker=vllm_ranker,                        <span class="hljs-comment"># Apply vLLM reranking to combined results</span>
    limit=<span class="hljs-number">5</span>,                                   <span class="hljs-comment"># Final number of results</span>
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
