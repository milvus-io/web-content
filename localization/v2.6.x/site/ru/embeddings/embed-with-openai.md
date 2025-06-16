---
id: embed-with-openai.md
order: 2
summary: Milvus интегрируется с моделями OpenAI через класс OpenAIEmbeddingFunction.
title: OpenAI
---
<h1 id="OpenAI" class="common-anchor-header">OpenAI<button data-href="#OpenAI" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus интегрируется с моделями OpenAI с помощью класса <strong>OpenAIEmbeddingFunction</strong>. Этот класс предоставляет методы для кодирования документов и запросов с помощью предварительно обученных моделей OpenAI и возврата вкраплений в виде плотных векторов, совместимых с индексацией Milvus. Чтобы воспользоваться этой функциональностью, получите API-ключ от <a href="https://openai.com/api/">OpenAI</a>, создав аккаунт на их платформе.</p>
<p>Чтобы воспользоваться этой функцией, установите необходимые зависимости:</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Затем инстанцируйте <strong>OpenAIEmbeddingFunction</strong>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model

openai_ef = model.dense.OpenAIEmbeddingFunction(
    model_name=<span class="hljs-string">&#x27;text-embedding-3-large&#x27;</span>, <span class="hljs-comment"># Specify the model name</span>
    api_key=<span class="hljs-string">&#x27;YOUR_API_KEY&#x27;</span>, <span class="hljs-comment"># Provide your OpenAI API key</span>
    dimensions=<span class="hljs-number">512</span> <span class="hljs-comment"># Set the embedding dimensionality</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Параметры</strong>:</p>
<ul>
<li><p><strong>имя_модели</strong><em>(строка</em>)</p>
<p>Имя модели OpenAI, которую следует использовать для кодирования. Возможные варианты: <strong>text-embedding-3-small</strong>, <strong>text-embedding-3-large</strong> и <strong>text-embedding-ada-002</strong> (по умолчанию).</p></li>
<li><p><strong>api_key</strong><em>(строка</em>)</p>
<p>Ключ API для доступа к API OpenAI.</p></li>
<li><p><strong>dimensions</strong><em>(int</em>)</p>
<p>Количество размеров, которые должны иметь результирующие выходные вкрапления. Поддерживается только в моделях <strong>text-embedding-3</strong> и более поздних.</p></li>
</ul>
<p>Для создания вкраплений для документов используйте метод <strong>encode_documents()</strong>:</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

docs_embeddings = openai_ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, docs_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, openai_ef.dim, docs_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>Ожидаемый результат будет похож на следующий:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([ <span class="hljs-number">1.76741909e-02</span>, -<span class="hljs-number">2.04964578e-02</span>, -<span class="hljs-number">1.09788161e-02</span>, -<span class="hljs-number">5.27223349e-02</span>,
        <span class="hljs-number">4.23139781e-02</span>, -<span class="hljs-number">6.64533582e-03</span>,  <span class="hljs-number">4.21088142e-03</span>,  <span class="hljs-number">1.04644023e-01</span>,
        <span class="hljs-number">5.10009527e-02</span>,  <span class="hljs-number">5.32827862e-02</span>, -<span class="hljs-number">3.26061808e-02</span>, -<span class="hljs-number">3.66494283e-02</span>,
...
       -<span class="hljs-number">8.93232748e-02</span>,  <span class="hljs-number">6.68255147e-03</span>,  <span class="hljs-number">3.55093405e-02</span>, -<span class="hljs-number">5.09071983e-02</span>,
        <span class="hljs-number">3.74144339e-03</span>,  <span class="hljs-number">4.72541340e-02</span>,  <span class="hljs-number">2.11916920e-02</span>,  <span class="hljs-number">1.00753829e-02</span>,
       -<span class="hljs-number">5.76633997e-02</span>,  <span class="hljs-number">9.68257990e-03</span>,  <span class="hljs-number">4.62721288e-02</span>, -<span class="hljs-number">4.33261096e-02</span>])]
Dim: <span class="hljs-number">512</span> (<span class="hljs-number">512</span>,)
<button class="copy-code-btn"></button></code></pre>
<p>Для создания вкраплений для запросов используйте метод <strong>encode_queries()</strong>:</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = openai_ef.encode_queries(queries)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim&quot;</span>, openai_ef.dim, query_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>Ожидаемый результат похож на следующий:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([ <span class="hljs-number">0.00530251</span>, -<span class="hljs-number">0.01907905</span>, -<span class="hljs-number">0.01672608</span>, -<span class="hljs-number">0.05030033</span>,  <span class="hljs-number">0.01635982</span>,
       -<span class="hljs-number">0.03169853</span>, -<span class="hljs-number">0.0033602</span> ,  <span class="hljs-number">0.09047844</span>,  <span class="hljs-number">0.00030747</span>,  <span class="hljs-number">0.11853652</span>,
       -<span class="hljs-number">0.02870182</span>, -<span class="hljs-number">0.01526102</span>,  <span class="hljs-number">0.05505067</span>,  <span class="hljs-number">0.00993909</span>, -<span class="hljs-number">0.07165466</span>,
...
       -<span class="hljs-number">9.78106782e-02</span>, -<span class="hljs-number">2.22669560e-02</span>,  <span class="hljs-number">1.21873049e-02</span>, -<span class="hljs-number">4.83198799e-02</span>,
        <span class="hljs-number">5.32377362e-02</span>, -<span class="hljs-number">1.90469325e-02</span>,  <span class="hljs-number">5.62430918e-02</span>,  <span class="hljs-number">1.02650477e-02</span>,
       -<span class="hljs-number">6.21757433e-02</span>,  <span class="hljs-number">7.88027793e-02</span>,  <span class="hljs-number">4.91846527e-04</span>, -<span class="hljs-number">1.51633881e-02</span>])]
Dim <span class="hljs-number">512</span> (<span class="hljs-number">512</span>,)
<button class="copy-code-btn"></button></code></pre>
