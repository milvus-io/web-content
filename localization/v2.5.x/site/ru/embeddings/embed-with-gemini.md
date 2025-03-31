---
id: embed-with-gemini.md
order: 2
summary: Milvus интегрируется с моделями OpenAI через класс GeminiEmbeddingFunction.
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
    </button></h1><p>Milvus интегрируется с моделями Gemini с помощью класса <strong>GeminiEmbeddingFunction</strong>. Этот класс предоставляет методы для кодирования документов и запросов с помощью предварительно обученных моделей Gemini и возвращает вкрапления в виде плотных векторов, совместимых с индексацией Milvus. Чтобы воспользоваться этой функцией, получите API-ключ от <a href="https://ai.google.dev/gemini-api/docs/api-key">Gemini</a>, создав учетную запись на их платформе.</p>
<p>Чтобы воспользоваться этой функцией, установите необходимые зависимости:</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Затем инстанцируйте <strong>GeminiEmbeddingFunction</strong>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model

gemini_ef = model.dense.GeminiEmbeddingFunction(
    model_name=<span class="hljs-string">&#x27;gemini-embedding-exp-03-07&#x27;</span>, <span class="hljs-comment"># Specify the model name</span>
    api_key=<span class="hljs-string">&#x27;YOUR_API_KEY&#x27;</span>, <span class="hljs-comment"># Provide your OpenAI API key</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Параметры</strong>:</p>
<ul>
<li><p><strong>имя_модели</strong><em>(строка</em>)</p>
<p>Имя модели Gemini, которую следует использовать для кодирования. Возможные варианты: <strong>gemini-embedding-exp-03-07</strong>(по умолчанию), <strong>models/embedding-001</strong> и <strong>models/text-embedding-004</strong>.</p></li>
<li><p><strong>api_key</strong><em>(строка</em>)</p>
<p>API-ключ для доступа к Gemini API.</p></li>
<li><p><strong>config</strong><em>(types.EmbedContentConfig</em>) Необязательная конфигурация для модели встраивания.</p>
<ul>
<li><strong>Выходная_размерность</strong> может быть указана как количество результирующих выходных вкраплений.</li>
<li><strong>Тип_задачи</strong> может быть указан для создания оптимизированных эмбеддингов для конкретных задач, что позволяет сэкономить время и средства и повысить производительность. Поддерживается только в модели <strong>gemini-embedding-exp-03-07</strong>.</li>
</ul></li>
</ul>
<table>
<thead>
<tr><th>Название модели</th><th>Размеры</th></tr>
</thead>
<tbody>
<tr><td>gemini-embedding-exp-03-07</td><td>3072<em>(default</em>),1536,768</td></tr>
<tr><td>models/embedding-001</td><td>768</td></tr>
<tr><td>models/text-embedding-004</td><td>768</td></tr>
</tbody>
</table>
<table>
<thead>
<tr><th>Тип задачи</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td>СЕМАНТИЧЕСКОЕ_СХОДСТВО</td><td>Используется для генерации вкраплений, оптимизированных для оценки сходства текста.</td></tr>
<tr><td>КЛАССИФИКАЦИЯ</td><td>Используется для генерации вкраплений, оптимизированных для классификации текстов в соответствии с заданными метками.</td></tr>
<tr><td>КЛАСТЕРИНГ</td><td>Используется для создания вкраплений, оптимизированных для кластеризации текстов на основе их сходства.</td></tr>
<tr><td>ВОЗВРАТ_ДОКУМЕНТА, ВОЗВРАТ_ВОПРОСА, ВОПРОС_НЕЗАДАВШИЙСЯ и ФАКТ_ВЕРИФИКАЦИЯ</td><td>Используются для генерации вкраплений, оптимизированных для поиска документов или информации.</td></tr>
<tr><td>ЗАПРОС_ПОИСКА_КОДА</td><td>Используется для получения блока кода на основе запроса на естественном языке, например, для сортировки массива или разворота связанного списка. Вкрапления кодовых блоков вычисляются с помощью RETRIEVAL_DOCUMENT.</td></tr>
</tbody>
</table>
<p>Для создания вкраплений для документов используйте метод <strong>encode_documents()</strong>:</p>
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
<p>Ожидаемый результат похож на следующий:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-0.00894029,  0.00573813,  0.013351  , ..., -0.00042766,
       -0.00603091, -0.00341043], shape=(3072,)), array([ 0.00222347,  0.03725113,  0.01152256, ...,  0.01047272,
       -0.01701597,  0.00565377], shape=(3072,)), array([ 0.00661134,  0.00232328, -0.01342973, ..., -0.00514429,
       -0.02374139, -0.00701721], shape=(3072,))]
Dim: 3072 (3072,)
<button class="copy-code-btn"></button></code></pre>
<p>Для создания вкраплений для запросов используйте метод <strong>encode_queries()</strong>:</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = gemini_ef.encode_queries(queries)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim&quot;</span>, gemini_ef.dim, query_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>Ожидаемый результат похож на следующий:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-0.02066572,  0.02459551,  0.00707774, ...,  0.00259341,
       -0.01797572, -0.00626168], shape=(3072,)), array([ 0.00674969,  0.03023903,  0.01230692, ...,  0.00160009,
       -0.01710967,  0.00972728], shape=(3072,))]
Dim 3072 (3072,)
<button class="copy-code-btn"></button></code></pre>
