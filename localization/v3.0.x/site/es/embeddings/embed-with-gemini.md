---
id: embed-with-gemini.md
order: 2
summary: >-
  Milvus se integra con los modelos de OpenAI a través de la clase
  GeminiEmbeddingFunction.
title: Gemini
---
<h1 id="Gemini" class="common-anchor-header">Gemini<button data-href="#Gemini" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus se integra con los modelos de Gemini a través de la clase <strong>GeminiEmbeddingFunction</strong>. Esta clase proporciona métodos para codificar documentos y consultas utilizando los modelos Gemini preentrenados y devolviendo las incrustaciones como vectores densos compatibles con la indexación Milvus. Para utilizar esta funcionalidad, obtenga una clave API de <a href="https://ai.google.dev/gemini-api/docs/api-key">Gemini</a> creando una cuenta en su plataforma.</p>
<p>Para utilizar esta función, instale las dependencias necesarias:</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>A continuación, instancie <strong>GeminiEmbeddingFunction</strong>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model

gemini_ef = model.dense.GeminiEmbeddingFunction(
    model_name=<span class="hljs-string">&#x27;gemini-embedding-exp-03-07&#x27;</span>, <span class="hljs-comment"># Specify the model name</span>
    api_key=<span class="hljs-string">&#x27;YOUR_API_KEY&#x27;</span>, <span class="hljs-comment"># Provide your OpenAI API key</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Parámetros</strong>:</p>
<ul>
<li><p><strong>nombre_modelo</strong><em>(cadena</em>)</p>
<p>El nombre del modelo Gemini a utilizar para la codificación. Las opciones válidas son <strong>gemini-embedding-exp-03-07</strong>(por defecto), <strong>models/embedding-001</strong>, y <strong>models/text-embedding-004</strong>.</p></li>
<li><p><strong>api_key</strong><em>(cadena</em>)</p>
<p>La clave API para acceder a la API de Gemini.</p></li>
<li><p><strong>config</strong><em>(types.EmbedContentConfig</em>) Configuración opcional para el modelo de incrustación.</p>
<ul>
<li>Se puede especificar <strong>output_dimensionality</strong> para el número de incrustaciones de salida resultantes.</li>
<li>El <strong>tipo_tarea</strong> puede especificarse para generar incrustaciones optimizadas para tareas específicas, ahorrando tiempo y costes y mejorando el rendimiento. Sólo se admite en el modelo <strong>gemini-embedding-exp-03-07</strong>.</li>
</ul></li>
</ul>
<table>
<thead>
<tr><th>Nombre del modelo</th><th>Dimensiones</th></tr>
</thead>
<tbody>
<tr><td>gemini-embedding-exp-03-07</td><td>3072<em>(default</em>),1536,768</td></tr>
<tr><td>modelos/embedding-001</td><td>768</td></tr>
<tr><td>modelos/incrustación-texto-004</td><td>768</td></tr>
</tbody>
</table>
<table>
<thead>
<tr><th>Tipo de tarea</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td>SIMILITUD_SEMÁNTICA</td><td>Se utiliza para generar incrustaciones optimizadas para evaluar la similitud textual.</td></tr>
<tr><td>CLASIFICACIÓN</td><td>Se utiliza para generar incrustaciones optimizadas para clasificar textos según etiquetas preestablecidas.</td></tr>
<tr><td>CLUSTERING</td><td>Permite generar incrustaciones optimizadas para agrupar textos en función de sus similitudes.</td></tr>
<tr><td>RETRIEVAL_DOCUMENT, RETRIEVAL_QUERY, QUESTION_ANSWERING y FACT_VERIFICATION</td><td>Se utilizan para generar incrustaciones optimizadas para la búsqueda de documentos o la recuperación de información.</td></tr>
<tr><td>CONSULTA_RECUPERACIÓN_CÓDIGO</td><td>Se utiliza para recuperar un bloque de código a partir de una consulta en lenguaje natural, como ordenar una matriz o invertir una lista enlazada. Las incrustaciones de los bloques de código se calculan con RETRIEVAL_DOCUMENT.</td></tr>
</tbody>
</table>
<p>Para crear incrustaciones para documentos, utilice el método <strong>encode_documents()</strong>:</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

docs_embeddings = gemini_ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, docs_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, gemini_ef.dim, docs_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>El resultado esperado es similar al siguiente:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-<span class="hljs-number">0.00894029</span>,  <span class="hljs-number">0.00573813</span>,  <span class="hljs-number">0.013351</span>  , ..., -<span class="hljs-number">0.00042766</span>,
       -<span class="hljs-number">0.00603091</span>, -<span class="hljs-number">0.00341043</span>], shape=(<span class="hljs-number">3072</span>,)), array([ <span class="hljs-number">0.00222347</span>,  <span class="hljs-number">0.03725113</span>,  <span class="hljs-number">0.01152256</span>, ...,  <span class="hljs-number">0.01047272</span>,
       -<span class="hljs-number">0.01701597</span>,  <span class="hljs-number">0.00565377</span>], shape=(<span class="hljs-number">3072</span>,)), array([ <span class="hljs-number">0.00661134</span>,  <span class="hljs-number">0.00232328</span>, -<span class="hljs-number">0.01342973</span>, ..., -<span class="hljs-number">0.00514429</span>,
       -<span class="hljs-number">0.02374139</span>, -<span class="hljs-number">0.00701721</span>], shape=(<span class="hljs-number">3072</span>,))]
Dim: <span class="hljs-number">3072</span> (<span class="hljs-number">3072</span>,)
<button class="copy-code-btn"></button></code></pre>
<p>Para crear incrustaciones para consultas, utilice el método <strong>encode_queries()</strong>:</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = gemini_ef.encode_queries(queries)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim&quot;</span>, gemini_ef.dim, query_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>El resultado esperado es similar al siguiente:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-<span class="hljs-number">0.02066572</span>,  <span class="hljs-number">0.02459551</span>,  <span class="hljs-number">0.00707774</span>, ...,  <span class="hljs-number">0.00259341</span>,
       -<span class="hljs-number">0.01797572</span>, -<span class="hljs-number">0.00626168</span>], shape=(<span class="hljs-number">3072</span>,)), array([ <span class="hljs-number">0.00674969</span>,  <span class="hljs-number">0.03023903</span>,  <span class="hljs-number">0.01230692</span>, ...,  <span class="hljs-number">0.00160009</span>,
       -<span class="hljs-number">0.01710967</span>,  <span class="hljs-number">0.00972728</span>], shape=(<span class="hljs-number">3072</span>,))]
Dim <span class="hljs-number">3072</span> (<span class="hljs-number">3072</span>,)
<button class="copy-code-btn"></button></code></pre>
