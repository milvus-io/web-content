---
id: embed-with-instructor.md
order: 10
summary: >-
  Este artigo descreve como utilizar a InstructorEmbeddingFunction para
  codificar documentos e consultas utilizando o modelo de incorporação do
  Instructor.
title: Instrutor
---
<h1 id="Instructor" class="common-anchor-header">Instrutor<button data-href="#Instructor" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://instructor-embedding.github.io/">O Instructor</a> é um modelo de incorporação de texto ajustado por instruções que pode gerar incorporação de texto adaptada a qualquer tarefa (por exemplo, classificação, recuperação, agrupamento, avaliação de texto, etc.) e domínios (por exemplo, ciência, finanças, etc.) fornecendo simplesmente as instruções da tarefa, sem qualquer ajuste fino.</p>
<p>O Milvus integra-se com os modelos de incorporação do Instructor através da classe InstructorEmbeddingFunction. Esta classe fornece métodos para codificar documentos e consultas utilizando os modelos de incorporação do Instructor e devolver as incorporações como vectores densos compatíveis com a indexação do Milvus.</p>
<p>Para utilizar esta funcionalidade, instale as dependências necessárias:</p>
<pre><code translate="no" class="language-python">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Em seguida, instancie a InstructorEmbeddingFunction:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> InstructorEmbeddingFunction

ef = InstructorEmbeddingFunction(
    model_name=<span class="hljs-string">&quot;hkunlp/instructor-xl&quot;</span>, <span class="hljs-comment"># Defaults to `hkunlp/instructor-xl`</span>
    query_instruction=<span class="hljs-string">&quot;Represent the question for retrieval:&quot;</span>,
    doc_instruction=<span class="hljs-string">&quot;Represent the document for retrieval:&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Parâmetros</strong>:</p>
<ul>
<li><p><code translate="no">model_name</code> <em>(string</em>)</p>
<p>O nome do modelo de incorporação Mistral AI a ser usado para codificação. O valor padrão é <code translate="no">hkunlp/instructor-xl</code>. Para obter mais informações, consulte <a href="https://github.com/xlang-ai/instructor-embedding?tab=readme-ov-file#model-list">Lista de modelos</a>.</p></li>
<li><p><code translate="no">query_instruction</code> <em>(string</em>)</p>
<p>Instrução específica da tarefa que orienta o modelo sobre como gerar uma incorporação para uma consulta ou pergunta.</p></li>
<li><p><code translate="no">doc_instruction</code> <em>(string</em>)</p>
<p>Instrução específica da tarefa que orienta o modelo para gerar uma incorporação para um documento.</p></li>
</ul>
<p>Para criar embeddings para documentos, utilize o método <code translate="no">encode_documents()</code>:</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

docs_embeddings = ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, docs_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, ef.dim, docs_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>O resultado esperado é semelhante ao seguinte:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([ <span class="hljs-number">1.08575663e-02</span>, <span class="hljs-number">3.87877878e-03</span>, <span class="hljs-number">3.18090729e-02</span>, -<span class="hljs-number">8.12458917e-02</span>,
       -<span class="hljs-number">4.68971021e-02</span>, -<span class="hljs-number">5.85585833e-02</span>, -<span class="hljs-number">5.95418774e-02</span>, -<span class="hljs-number">8.55880603e-03</span>,
       -<span class="hljs-number">5.54775111e-02</span>, -<span class="hljs-number">6.08020350e-02</span>, <span class="hljs-number">1.76202394e-02</span>, <span class="hljs-number">1.06648318e-02</span>,
       -<span class="hljs-number">5.89960292e-02</span>, -<span class="hljs-number">7.46861771e-02</span>, <span class="hljs-number">6.60329172e-03</span>, -<span class="hljs-number">4.25189249e-02</span>,
       ...
       -<span class="hljs-number">1.26921125e-02</span>, <span class="hljs-number">3.01475357e-02</span>, <span class="hljs-number">8.25323071e-03</span>, -<span class="hljs-number">1.88470203e-02</span>,
        <span class="hljs-number">6.04814291e-03</span>, -<span class="hljs-number">2.81618331e-02</span>, <span class="hljs-number">5.91602828e-03</span>, <span class="hljs-number">7.13866428e-02</span>],
      dtype=float32)]
Dim: <span class="hljs-number">768</span> (<span class="hljs-number">768</span>,)
<button class="copy-code-btn"></button></code></pre>
<p>Para criar embeddings para consultas, utilize o método <code translate="no">encode_queries()</code>:</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>,
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = ef.encode_queries(queries)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim&quot;</span>, ef.dim, query_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>O resultado esperado é semelhante ao seguinte:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([ <span class="hljs-number">1.21721877e-02</span>, <span class="hljs-number">1.88485277e-03</span>, <span class="hljs-number">3.01732980e-02</span>, -<span class="hljs-number">8.10302645e-02</span>,
       -<span class="hljs-number">6.13401756e-02</span>, -<span class="hljs-number">3.98149453e-02</span>, -<span class="hljs-number">5.18723316e-02</span>, -<span class="hljs-number">6.76784338e-03</span>,
       -<span class="hljs-number">6.59285188e-02</span>, -<span class="hljs-number">5.38365729e-02</span>, -<span class="hljs-number">5.13435388e-03</span>, -<span class="hljs-number">2.49210224e-02</span>,
       -<span class="hljs-number">5.74403182e-02</span>, -<span class="hljs-number">7.03031123e-02</span>, <span class="hljs-number">6.63730130e-03</span>, -<span class="hljs-number">3.42259370e-02</span>,
       ...
        <span class="hljs-number">7.36595877e-03</span>, <span class="hljs-number">2.85532661e-02</span>, -<span class="hljs-number">1.55952033e-02</span>, <span class="hljs-number">2.13342719e-02</span>,
        <span class="hljs-number">1.51187545e-02</span>, -<span class="hljs-number">2.82798670e-02</span>, <span class="hljs-number">2.69396193e-02</span>, <span class="hljs-number">6.16136603e-02</span>],
      dtype=float32)]
Dim <span class="hljs-number">768</span> (<span class="hljs-number">768</span>,)
<button class="copy-code-btn"></button></code></pre>
