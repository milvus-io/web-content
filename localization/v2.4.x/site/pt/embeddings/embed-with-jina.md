---
id: embed-with-jina.md
order: 8
summary: >-
  Este artigo descreve como utilizar a função JinaEmbeddingFunction para
  codificar documentos e consultas utilizando o modelo de incorporação Jina AI.
title: Jina AI - Incorporar
---
<h1 id="Jina-AI" class="common-anchor-header">Jina AI<button data-href="#Jina-AI" class="anchor-icon" translate="no">
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
    </button></h1><p>Os modelos de incorporação da Jina AI são modelos de incorporação de texto de alto desempenho que podem traduzir entradas textuais em representações numéricas, capturando a semântica do texto. Estes modelos destacam-se em aplicações como a recuperação densa, a similaridade textual semântica e a compreensão multilingue.</p>
<p>O Milvus integra-se com os modelos de incorporação do Jina AI através da classe <code translate="no">JinaEmbeddingFunction</code>. Esta classe fornece métodos para codificar documentos e consultas utilizando os modelos de incorporação da Jina AI e devolvendo as incorporações como vectores densos compatíveis com a indexação Milvus. Para utilizar esta funcionalidade, obtenha uma chave API da <a href="https://jina.ai/embeddings/">Jina AI</a>.</p>
<p>Para utilizar esta funcionalidade, instale as dependências necessárias:</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>De seguida, instanciar o <code translate="no">JinaEmbeddingFunction</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> JinaEmbeddingFunction

jina_ef = JinaEmbeddingFunction(
    model_name=<span class="hljs-string">&quot;jina-embeddings-v3&quot;</span>, <span class="hljs-comment"># Defaults to `jina-embeddings-v3`</span>
    api_key=JINAAI_API_KEY, <span class="hljs-comment"># Provide your Jina AI API key</span>
    task=<span class="hljs-string">&quot;retrieval.passage&quot;</span>, <span class="hljs-comment"># Specify the task</span>
    dimensions=<span class="hljs-number">1024</span>, <span class="hljs-comment"># Defaults to 1024</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Parâmetros</strong>:</p>
<ul>
<li><p><code translate="no">model_name</code> <em>(string</em>)</p>
<p>O nome do modelo de incorporação do Jina AI a utilizar para a codificação. Pode especificar qualquer um dos nomes de modelos de incorporação Jina AI disponíveis, por exemplo, <code translate="no">jina-embeddings-v3</code>, <code translate="no">jina-embeddings-v2-base-en</code>, etc. Se deixar este parâmetro não especificado, será utilizado <code translate="no">jina-embeddings-v3</code>. Para obter uma lista dos modelos disponíveis, consulte <a href="https://jina.ai/embeddings">Jina Embeddings</a>.</p></li>
<li><p><code translate="no">api_key</code> <em>(string</em>)</p>
<p>A chave API para aceder à API Jina AI.</p></li>
<li><p><code translate="no">task</code> <em>(string</em>)</p>
<p>O tipo de entrada passado para o modelo. Necessário para modelos de incorporação v3 e superiores.</p>
<ul>
<li><code translate="no">&quot;retrieval.passage&quot;</code>: Usado para codificar documentos grandes em tarefas de recuperação no momento da indexação.</li>
<li><code translate="no">&quot;retrieval.query&quot;</code>: Utilizado para codificar consultas ou perguntas do utilizador em tarefas de recuperação.</li>
<li><code translate="no">&quot;classification&quot;</code>: Utilizado para codificar texto para tarefas de classificação de texto.</li>
<li><code translate="no">&quot;text-matching&quot;</code>: Usado para codificar texto para correspondência de similaridade, como medir a similaridade entre duas frases.</li>
<li><code translate="no">&quot;clustering&quot;</code>: Utilizado para tarefas de agrupamento ou de reordenamento.</li>
</ul></li>
<li><p><code translate="no">dimensions</code> <em>(int</em>)</p>
<p>O número de dimensões que os embeddings de saída resultantes devem ter. A predefinição é 1024. Apenas suportado para modelos de incorporação v3 e superiores.</p></li>
<li><p><code translate="no">late_chunking</code> <em>(bool</em>)</p>
<p>Este parâmetro controla se deve ser usado o novo método de fragmentação (chunking) que <a href="https://arxiv.org/abs/2409.04701">o Jina AI introduziu no mês passado</a> para codificar um lote de frases. A predefinição é <code translate="no">False</code>. Quando definido para <code translate="no">True</code>, a API do Jina AI concatena todas as frases no campo de entrada e apresenta-as como uma única cadeia de caracteres ao modelo. Internamente, o modelo incorpora esta longa cadeia concatenada e, em seguida, efectua uma fragmentação tardia, devolvendo uma lista de incorporações que corresponde ao tamanho da lista de entrada.</p></li>
</ul>
<p>Para criar incrustações para documentos, utilize o método <code translate="no">encode_documents()</code>. Este método foi concebido para a incorporação de documentos em tarefas de recuperação assimétricas, como a indexação de documentos para tarefas de pesquisa ou recomendação. Este método utiliza <code translate="no">retrieval.passage</code> como tarefa.</p>
<pre><code translate="no" class="language-python:">
```python
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

docs_embeddings = jina_ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, docs_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, jina_ef.dim, docs_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>O resultado esperado é semelhante ao seguinte:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([9.80641991e-02, -8.51697400e-02,  7.36531913e-02,  1.42558888e-02,
       -2.23589484e-02,  1.68494112e-03, -3.50753777e-02, -3.11530549e-02,
       -3.26012149e-02,  5.04568312e-03,  3.69836427e-02,  3.48948985e-02,
        8.19722563e-03,  5.88679723e-02, -6.71099266e-03, -1.82369724e-02,
...
        2.48654783e-02,  3.43279652e-02, -1.66154150e-02, -9.90478322e-03,
       -2.96043139e-03, -8.57473817e-03, -7.39028037e-04,  6.25024503e-03,
       -1.08831357e-02, -4.00776342e-02,  3.25369164e-02, -1.42691191e-03])]
Dim: 1024 (1024,)
<button class="copy-code-btn"></button></code></pre>
<p>Para criar incrustações para consultas, utilize o método <code translate="no">encode_queries()</code>. Este método foi concebido para a incorporação de consultas em tarefas de recuperação assimétricas, tais como consultas de pesquisa ou perguntas. Este método utiliza <code translate="no">retrieval.query</code> como tarefa.</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = jina_ef.encode_queries(queries)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim&quot;</span>, jina_ef.dim, query_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>O resultado esperado é semelhante ao seguinte:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([8.79201014e-03,  1.47551354e-02,  4.02722731e-02, -2.52991207e-02,
        1.12719582e-02,  3.75947170e-02,  3.97946090e-02, -7.36681819e-02,
       -2.17952449e-02, -1.16298944e-02, -6.83426252e-03, -5.12507409e-02,
        5.26071340e-02,  6.75181448e-02,  3.92445624e-02, -1.40817231e-02,
...
        8.81703943e-03,  4.24629413e-02, -2.32944116e-02, -2.05193572e-02,
       -3.22035812e-02,  2.81896023e-03,  3.85326855e-02,  3.64372656e-02,
       -1.65050142e-02, -4.26847413e-02,  2.02664156e-02, -1.72684863e-02])]
Dim 1024 (1024,)
<button class="copy-code-btn"></button></code></pre>
<p>Para criar incrustações de entradas para correspondência de similaridade (como tarefas de recuperação STS ou simétricas), classificação de texto, agrupamento ou tarefas de classificação, use o valor de parâmetro <code translate="no">task</code> apropriado ao instanciar a classe <code translate="no">JinaEmbeddingFunction</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> JinaEmbeddingFunction

jina_ef = JinaEmbeddingFunction(
    model_name=<span class="hljs-string">&quot;jina-embeddings-v3&quot;</span>, <span class="hljs-comment"># Defaults to `jina-embeddings-v3`</span>
    api_key=JINA_API_KEY, <span class="hljs-comment"># Provide your Jina AI API key</span>
    task=<span class="hljs-string">&quot;text-matching&quot;</span>,
    dimensions=<span class="hljs-number">1024</span>, <span class="hljs-comment"># Defaults to 1024</span>
)

texts = [
    <span class="hljs-string">&quot;Follow the white rabbit.&quot;</span>,  <span class="hljs-comment"># English</span>
    <span class="hljs-string">&quot;Sigue al conejo blanco.&quot;</span>,  <span class="hljs-comment"># Spanish</span>
    <span class="hljs-string">&quot;Suis le lapin blanc.&quot;</span>,  <span class="hljs-comment"># French</span>
    <span class="hljs-string">&quot;跟着白兔走。&quot;</span>,  <span class="hljs-comment"># Chinese</span>
    <span class="hljs-string">&quot;اتبع الأرنب الأبيض.&quot;</span>,  <span class="hljs-comment"># Arabic</span>
    <span class="hljs-string">&quot;Folge dem weißen Kaninchen.&quot;</span>,  <span class="hljs-comment"># German</span>
]

embeddings = jina_ef(texts)

<span class="hljs-comment"># Compute similarities</span>
<span class="hljs-built_in">print</span>(embeddings[<span class="hljs-number">0</span>] @ embeddings[<span class="hljs-number">1</span>].T)
<button class="copy-code-btn"></button></code></pre>
