---
id: embed-with-gemini.md
order: 2
summary: >-
  O Milvus integra-se nos modelos da OpenAI através da classe
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
    </button></h1><p>O Milvus integra-se com os modelos do Gemini através da classe <strong>GeminiEmbeddingFunction</strong>. Esta classe fornece métodos para codificar documentos e consultas utilizando os modelos Gemini pré-treinados e devolvendo os embeddings como vectores densos compatíveis com a indexação Milvus. Para utilizar esta funcionalidade, obtenha uma chave de API do <a href="https://ai.google.dev/gemini-api/docs/api-key">Gemini</a> criando uma conta na sua plataforma.</p>
<p>Para utilizar esta funcionalidade, instale as dependências necessárias:</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Em seguida, instancie a <strong>GeminiEmbeddingFunction</strong>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model

gemini_ef = model.dense.GeminiEmbeddingFunction(
    model_name=<span class="hljs-string">&#x27;gemini-embedding-exp-03-07&#x27;</span>, <span class="hljs-comment"># Specify the model name</span>
    api_key=<span class="hljs-string">&#x27;YOUR_API_KEY&#x27;</span>, <span class="hljs-comment"># Provide your OpenAI API key</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Parâmetros</strong>:</p>
<ul>
<li><p><strong>nome_do_modelo</strong><em>(string</em>)</p>
<p>O nome do modelo Gemini a ser usado para codificação. As opções válidas são <strong>gemini-embedding-exp-03-07</strong>(padrão), <strong>models/embedding-001</strong> e <strong>models/text-embedding-004</strong>.</p></li>
<li><p><strong>api_key</strong><em>(string</em>)</p>
<p>A chave da API para acessar a API do Gemini.</p></li>
<li><p><strong>config</strong><em>(types.EmbedContentConfig</em>) Configuração opcional para o modelo de incorporação.</p>
<ul>
<li>O <strong>output_dimensionality</strong> pode ser especificado para o número de embeddings de saída resultantes.</li>
<li>O <strong>task_type</strong> pode ser especificado para gerar embeddings optimizados para tarefas específicas, poupando tempo e custos e melhorando o desempenho. Suportado apenas no modelo <strong>gemini-embedding-exp-03-07</strong>.</li>
</ul></li>
</ul>
<table>
<thead>
<tr><th>Nome do modelo</th><th>Dimensões</th></tr>
</thead>
<tbody>
<tr><td>gemini-embedding-exp-03-07</td><td>3072<em>(default</em>),1536,768</td></tr>
<tr><td>models/embedding-001</td><td>768</td></tr>
<tr><td>modelos/embedding-texto-004</td><td>768</td></tr>
</tbody>
</table>
<table>
<thead>
<tr><th>Tipo de tarefa</th><th>Descrição da tarefa</th></tr>
</thead>
<tbody>
<tr><td>SEMANTIC_SIMILARITY</td><td>Utilizado para gerar embeddings que são optimizados para avaliar a semelhança de texto.</td></tr>
<tr><td>CLASSIFICAÇÃO</td><td>Utilizada para gerar embeddings que são optimizados para classificar textos de acordo com etiquetas predefinidas.</td></tr>
<tr><td>CLUSTERING</td><td>Utilizado para gerar embeddings que são optimizados para agrupar textos com base nas suas semelhanças.</td></tr>
<tr><td>RETRIEVAL_DOCUMENT, RETRIEVAL_QUERY, QUESTION_ANSWERING e FACT_VERIFICATION</td><td>Utilizado para gerar embeddings optimizados para pesquisa de documentos ou recuperação de informação.</td></tr>
<tr><td>CONSULTA_DE_RECUPERAÇÃO_DE_CÓDIGO</td><td>Utilizado para recuperar um bloco de código com base numa consulta de linguagem natural, como ordenar uma matriz ou inverter uma lista ligada. Os embeddings dos blocos de código são computados usando RETRIEVAL_DOCUMENT.</td></tr>
</tbody>
</table>
<p>Para criar embeddings para documentos, use o método <strong>encode_documents()</strong>:</p>
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
<p>O resultado esperado é semelhante ao seguinte:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-<span class="hljs-number">0.00894029</span>,  <span class="hljs-number">0.00573813</span>,  <span class="hljs-number">0.013351</span>  , ..., -<span class="hljs-number">0.00042766</span>,
       -<span class="hljs-number">0.00603091</span>, -<span class="hljs-number">0.00341043</span>], shape=(<span class="hljs-number">3072</span>,)), array([ <span class="hljs-number">0.00222347</span>,  <span class="hljs-number">0.03725113</span>,  <span class="hljs-number">0.01152256</span>, ...,  <span class="hljs-number">0.01047272</span>,
       -<span class="hljs-number">0.01701597</span>,  <span class="hljs-number">0.00565377</span>], shape=(<span class="hljs-number">3072</span>,)), array([ <span class="hljs-number">0.00661134</span>,  <span class="hljs-number">0.00232328</span>, -<span class="hljs-number">0.01342973</span>, ..., -<span class="hljs-number">0.00514429</span>,
       -<span class="hljs-number">0.02374139</span>, -<span class="hljs-number">0.00701721</span>], shape=(<span class="hljs-number">3072</span>,))]
Dim: <span class="hljs-number">3072</span> (<span class="hljs-number">3072</span>,)
<button class="copy-code-btn"></button></code></pre>
<p>Para criar embeddings para consultas, utilize o método <strong>encode_queries()</strong>:</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = gemini_ef.encode_queries(queries)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim&quot;</span>, gemini_ef.dim, query_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>O resultado esperado é semelhante ao seguinte:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-<span class="hljs-number">0.02066572</span>,  <span class="hljs-number">0.02459551</span>,  <span class="hljs-number">0.00707774</span>, ...,  <span class="hljs-number">0.00259341</span>,
       -<span class="hljs-number">0.01797572</span>, -<span class="hljs-number">0.00626168</span>], shape=(<span class="hljs-number">3072</span>,)), array([ <span class="hljs-number">0.00674969</span>,  <span class="hljs-number">0.03023903</span>,  <span class="hljs-number">0.01230692</span>, ...,  <span class="hljs-number">0.00160009</span>,
       -<span class="hljs-number">0.01710967</span>,  <span class="hljs-number">0.00972728</span>], shape=(<span class="hljs-number">3072</span>,))]
Dim <span class="hljs-number">3072</span> (<span class="hljs-number">3072</span>,)
<button class="copy-code-btn"></button></code></pre>
