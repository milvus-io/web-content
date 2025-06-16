---
id: embed-with-cohere.md
order: 9
summary: >-
  В этой статье описывается, как использовать функцию CohereEmbeddingFunction
  для кодирования документов и запросов с помощью модели встраивания Cohere.
title: Embed Cohere
---
<h1 id="Cohere" class="common-anchor-header">Cohere<button data-href="#Cohere" class="anchor-icon" translate="no">
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
    </button></h1><p>Модели встраивания Cohere используются для создания текстовых вкраплений, представляющих собой списки чисел с плавающей точкой, которые отражают семантическую информацию о тексте. Эти вкрапления можно использовать для таких задач, как классификация текста и семантический поиск.</p>
<p>Milvus интегрируется с моделями вкраплений Cohere с помощью класса <code translate="no">CohereEmbeddingFunction</code>. Этот класс обрабатывает вычисления вкраплений и возвращает их в формате, совместимом с Milvus для индексирования и поиска.</p>
<p>Чтобы воспользоваться этой функцией, установите необходимые зависимости:</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Затем инстанцируйте класс <code translate="no">CohereEmbeddingFunction</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> CohereEmbeddingFunction

cohere_ef = CohereEmbeddingFunction(
    model_name=<span class="hljs-string">&quot;embed-english-light-v3.0&quot;</span>,
    api_key=<span class="hljs-string">&quot;YOUR_COHERE_API_KEY&quot;</span>,
    input_type=<span class="hljs-string">&quot;search_document&quot;</span>,
    embedding_types=[<span class="hljs-string">&quot;float&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Параметры</strong>:</p>
<ul>
<li><p><code translate="no">model_name</code> <em>(строка</em>)</p>
<p>Имя модели встраивания Cohere, которую следует использовать для кодирования. Вы можете указать любое из доступных имен моделей встраивания Cohere, например <code translate="no">embed-english-v3.0</code>, <code translate="no">embed-multilingual-v3.0</code>, и т. д. Если оставить этот параметр неуказанным, будет использоваться <code translate="no">embed-english-light-v3.0</code>. Список доступных моделей см. в разделе <a href="https://docs.cohere.com/docs/models#embed">Embed</a>.</p></li>
<li><p><code translate="no">api_key</code> <em>(string</em>)</p>
<p>Ключ API для доступа к API Cohere.</p></li>
<li><p><code translate="no">input_type</code> <em>(строка</em>)</p>
<p>Тип входных данных, передаваемых модели. Требуется для встраивания моделей v3 и выше.</p>
<ul>
<li><code translate="no">&quot;search_document&quot;</code>: Используется для вкраплений, хранящихся в векторной базе данных для поиска.</li>
<li><code translate="no">&quot;search_query&quot;</code>: Используется для встраивания поисковых запросов, выполняемых по векторной БД для поиска релевантных документов.</li>
<li><code translate="no">&quot;classification&quot;</code>: : Используется для вкраплений, пропущенных через текстовый классификатор.</li>
<li><code translate="no">&quot;clustering&quot;</code>: Используется для вкраплений, пропущенных через алгоритм кластеризации.</li>
</ul></li>
<li><p><code translate="no">embedding_types</code> <em>(Список[str]</em>)</p>
<p>Тип вкраплений, которые вы хотите получить в ответ. Не требуется, и по умолчанию используется None, который возвращает тип ответа Embed Floats. В настоящее время для этого параметра можно указать только одно значение. Возможные значения:</p>
<ul>
<li><code translate="no">&quot;float&quot;</code>: Используйте этот параметр, если хотите получить обратно стандартные вкрапления поплавков. Действует для всех моделей.</li>
<li><code translate="no">&quot;binary&quot;</code>: Используйте это значение, если вы хотите получить подписанные бинарные вложения. Действует только для моделей v3.</li>
<li><code translate="no">&quot;ubinary&quot;</code>: Используйте это, когда хотите получить беззнаковые двоичные вкрапления. Действителен только для моделей v3.</li>
</ul></li>
</ul>
<p>Чтобы создать вкрапления для документов, используйте метод <code translate="no">encode_documents()</code>:</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

docs_embeddings = cohere_ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, docs_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, cohere_ef.dim, docs_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>Ожидаемый результат будет похож на следующий:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([ <span class="hljs-number">3.43322754e-02</span>,  <span class="hljs-number">1.16252899e-03</span>, -<span class="hljs-number">5.25207520e-02</span>,  <span class="hljs-number">1.32846832e-03</span>,
       -<span class="hljs-number">6.80541992e-02</span>,  <span class="hljs-number">6.10961914e-02</span>, -<span class="hljs-number">7.06176758e-02</span>,  <span class="hljs-number">1.48925781e-01</span>,
        <span class="hljs-number">1.54174805e-01</span>,  <span class="hljs-number">1.98516846e-02</span>,  <span class="hljs-number">2.43835449e-02</span>,  <span class="hljs-number">3.55224609e-02</span>,
        <span class="hljs-number">1.82952881e-02</span>,  <span class="hljs-number">7.57446289e-02</span>, -<span class="hljs-number">2.40783691e-02</span>,  <span class="hljs-number">4.40063477e-02</span>,
...
        <span class="hljs-number">0.06359863</span>, -<span class="hljs-number">0.01971436</span>, -<span class="hljs-number">0.02253723</span>,  <span class="hljs-number">0.00354195</span>,  <span class="hljs-number">0.00222015</span>,
        <span class="hljs-number">0.00184727</span>,  <span class="hljs-number">0.03408813</span>, -<span class="hljs-number">0.00777817</span>,  <span class="hljs-number">0.04919434</span>,  <span class="hljs-number">0.01519775</span>,
       -<span class="hljs-number">0.02862549</span>,  <span class="hljs-number">0.04760742</span>, -<span class="hljs-number">0.07891846</span>,  <span class="hljs-number">0.0124054</span> ], dtype=float32)]
Dim: <span class="hljs-number">384</span> (<span class="hljs-number">384</span>,)
<button class="copy-code-btn"></button></code></pre>
<p>Для создания вкраплений для запросов используйте метод <code translate="no">encode_queries()</code>:</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = cohere_ef.encode_queries(queries)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim&quot;</span>, cohere_ef.dim, query_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>Ожидаемый результат похож на следующий:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-<span class="hljs-number">1.33361816e-02</span>,  <span class="hljs-number">9.79423523e-04</span>, -<span class="hljs-number">7.28759766e-02</span>, -<span class="hljs-number">1.93786621e-02</span>,
       -<span class="hljs-number">9.71679688e-02</span>,  <span class="hljs-number">4.34875488e-02</span>, -<span class="hljs-number">9.81445312e-02</span>,  <span class="hljs-number">1.16882324e-01</span>,
        <span class="hljs-number">5.89904785e-02</span>, -<span class="hljs-number">4.19921875e-02</span>,  <span class="hljs-number">4.95910645e-02</span>,  <span class="hljs-number">5.83496094e-02</span>,
        <span class="hljs-number">3.47595215e-02</span>, -<span class="hljs-number">5.87463379e-03</span>, -<span class="hljs-number">7.30514526e-03</span>,  <span class="hljs-number">2.92816162e-02</span>,
...
        <span class="hljs-number">0.00749969</span>, -<span class="hljs-number">0.01192474</span>,  <span class="hljs-number">0.02719116</span>,  <span class="hljs-number">0.03347778</span>,  <span class="hljs-number">0.07696533</span>,
        <span class="hljs-number">0.01409149</span>,  <span class="hljs-number">0.00964355</span>, -<span class="hljs-number">0.01681519</span>, -<span class="hljs-number">0.0073204</span> ,  <span class="hljs-number">0.00043154</span>,
       -<span class="hljs-number">0.04577637</span>,  <span class="hljs-number">0.03591919</span>, -<span class="hljs-number">0.02807617</span>, -<span class="hljs-number">0.04812622</span>], dtype=float32)]
Dim <span class="hljs-number">384</span> (<span class="hljs-number">384</span>,)
<button class="copy-code-btn"></button></code></pre>
