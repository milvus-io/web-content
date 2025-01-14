---
id: embeddings.md
order: 1
summary: 'Узнайте, как генерировать вкрапления для ваших данных.'
title: Обзор встраивания
---
<h1 id="Embedding-Overview" class="common-anchor-header">Обзор встраивания<button data-href="#Embedding-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Встраивание - это концепция машинного обучения для отображения данных в высокоразмерном пространстве, где данные с похожей семантикой располагаются близко друг к другу. Обычно это глубокая нейронная сеть из семейства BERT или других трансформаторов, модель встраивания может эффективно представлять семантику текста, изображений и других типов данных с помощью ряда чисел, известных как векторы. Ключевой особенностью этих моделей является то, что математическое расстояние между векторами в высокоразмерном пространстве может указывать на сходство семантики исходного текста или изображения. Это свойство открывает множество возможностей для поиска информации, таких как веб-поисковые системы Google и Bing, поиск товаров и рекомендаций на сайтах электронной коммерции, а также недавно популярная парадигма Retrieval Augmented Generation (RAG) в генеративном ИИ.</p>
<p>Существует две основные категории вкраплений, каждая из которых дает свой тип вектора:</p>
<ul>
<li><p><strong>Плотное встраивание</strong>: Большинство моделей встраивания представляют информацию в виде вектора с плавающей точкой, имеющего от сотен до тысяч измерений. Выходные данные называются "плотными" векторами, поскольку большинство измерений имеют ненулевые значения. Например, популярная модель встраивания с открытым исходным кодом BAAI/bge-base-en-v1.5 выводит векторы из 768 чисел с плавающей точкой (768-dimension float vector).</p></li>
<li><p><strong>Разреженное встраивание</strong>: В отличие от этого, выходные векторы разреженных вкраплений имеют большинство размерностей, равных нулю, а именно "разреженные" векторы. Эти векторы часто имеют гораздо большую размерность (десятки тысяч и более), которая определяется размером словаря лексем. Разреженные векторы могут быть сгенерированы глубокими нейронными сетями или статистическим анализом текстовых корпораций. Благодаря своей интерпретируемости и лучшим возможностям обобщения за пределы области, разреженные вкрапления все чаще используются разработчиками в качестве дополнения к плотным вкраплениям.</p></li>
</ul>
<p>Milvus - это векторная база данных, предназначенная для управления, хранения и поиска векторных данных. Благодаря интеграции основных моделей встраивания и <a href="https://milvus.io/docs/rerankers-overview.md">ранжирования</a> вы можете легко преобразовать исходный текст в векторы, пригодные для поиска, или ранжировать результаты с помощью мощных моделей для получения более точных результатов RAG. Эта интеграция упрощает преобразование текста и устраняет необходимость в дополнительных компонентах встраивания или ранжирования, тем самым упрощая разработку и проверку RAG.</p>
<p>Чтобы увидеть, как создаются вкрапления в действии, обратитесь к разделу <a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/model/embedding_functions.ipynb">Использование модели PyMilvus для генерации вкраплений текста</a>.</p>
<table>
<thead>
<tr><th>Функция встраивания</th><th>Тип</th><th>API или открытый источник</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/OpenAIEmbeddingFunction/OpenAIEmbeddingFunction.md">openai</a></td><td>Плотный</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/SentenceTransformerEmbeddingFunction/SentenceTransformerEmbeddingFunction.md">преобразователь предложений</a></td><td>Плотный</td><td>Открытый источник</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/SpladeEmbeddingFunction/SpladeEmbeddingFunction.md">Splade</a></td><td>Sparse</td><td>Открытый источник</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/BGEM3EmbeddingFunction/BGEM3EmbeddingFunction.md">bge-m3</a></td><td>Гибрид</td><td>Открытый ресурс</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/VoyageEmbeddingFunction/VoyageEmbeddingFunction.md">voyageai</a></td><td>Плотный</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/JinaEmbeddingFunction/JinaEmbeddingFunction.md">jina</a></td><td>Плотный</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/CohereEmbeddingFunction/CohereEmbeddingFunction.md">cohere</a></td><td>Плотный</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/InstructorEmbeddingFunction/InstructorEmbeddingFunction.md">Инструктор</a></td><td>Dense</td><td>Открытый ресурс</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/MistralAIEmbeddingFunction/MistralAIEmbeddingFunction.md">Мистраль ИИ</a></td><td>Dense</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/NomicEmbeddingFunction/NomicEmbeddingFunction.md">Nomic</a></td><td>Плотный</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/EmbeddingModels/MGTEEmbeddingFunction/MGTEEmbeddingFunction.md">mGTE</a></td><td>Гибрид</td><td>Открытый ресурс</td></tr>
</tbody>
</table>
<h2 id="Example-1-Use-default-embedding-function-to-generate-dense-vectors" class="common-anchor-header">Пример 1: Использование функции встраивания по умолчанию для генерации плотных векторов<button data-href="#Example-1-Use-default-embedding-function-to-generate-dense-vectors" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы использовать функции встраивания в Milvus, сначала установите клиентскую библиотеку PyMilvus с подпакетом <code translate="no">model</code>, который содержит все утилиты для генерации встраивания.</p>
<pre><code translate="no" class="language-python">pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Подпакет <code translate="no">model</code> поддерживает различные модели встраивания, от <a href="https://milvus.io/docs/embed-with-openai.md">OpenAI</a>, <a href="https://milvus.io/docs/embed-with-sentence-transform.md">Sentence Transformers</a>, <a href="https://milvus.io/docs/embed-with-bgm-m3.md">BGE M3</a> до предварительно обученных моделей <a href="https://milvus.io/docs/embed-with-splade.md">SPLADE</a>. Для простоты в данном примере используется <code translate="no">DefaultEmbeddingFunction</code>, который представляет собой модель трансформатора предложений <strong>All-MiniLM-L6-v2</strong>. Модель занимает около 70 МБ и будет загружена при первом использовании:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model

<span class="hljs-comment"># This will download &quot;all-MiniLM-L6-v2&quot;, a light weight model.</span>
ef = model.DefaultEmbeddingFunction()

<span class="hljs-comment"># Data from which embeddings are to be generated </span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

embeddings = ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, ef.dim, embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>Ожидаемый результат похож на следующий:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([<span class="hljs-number">-3.09392996e-02</span>, <span class="hljs-number">-1.80662833e-02</span>,  <span class="hljs-number">1.34775648e-02</span>,  <span class="hljs-number">2.77156215e-02</span>,
       <span class="hljs-number">-4.86349640e-03</span>, <span class="hljs-number">-3.12581174e-02</span>, <span class="hljs-number">-3.55921760e-02</span>,  <span class="hljs-number">5.76934684e-03</span>,
        <span class="hljs-number">2.80773244e-03</span>,  <span class="hljs-number">1.35783911e-01</span>,  <span class="hljs-number">3.59678417e-02</span>,  <span class="hljs-number">6.17732145e-02</span>,
...
       <span class="hljs-number">-4.61330153e-02</span>, <span class="hljs-number">-4.85207550e-02</span>,  <span class="hljs-number">3.13997865e-02</span>,  <span class="hljs-number">7.82178566e-02</span>,
       <span class="hljs-number">-4.75336798e-02</span>,  <span class="hljs-number">5.21207601e-02</span>,  <span class="hljs-number">9.04406682e-02</span>, <span class="hljs-number">-5.36676683e-02</span>],
      dtype=<span class="hljs-type">float32</span>)]
Dim: <span class="hljs-number">384</span> (<span class="hljs-number">384</span>,)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Example-2-Generate-dense-and-sparse-vectors-in-one-call-with-BGE-M3-model" class="common-anchor-header">Пример 2: Генерация плотных и разреженных векторов за один вызов с помощью модели BGE M3<button data-href="#Example-2-Generate-dense-and-sparse-vectors-in-one-call-with-BGE-M3-model" class="anchor-icon" translate="no">
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
    </button></h2><p>В этом примере мы используем гибридную модель <a href="https://milvus.io/docs/embed-with-bgm-m3.md">BGE M3</a> для встраивания текста в плотные и разреженные векторы и использования их для извлечения релевантных документов. Общие действия выглядят следующим образом:</p>
<ol>
<li><p>Встраивание текста в плотные и разреженные векторы с помощью модели BGE-M3;</p></li>
<li><p>Создание коллекции Milvus для хранения плотных и разреженных векторов;</p></li>
<li><p>Вставка данных в Milvus;</p></li>
<li><p>Поиск и проверка результатов.</p></li>
</ol>
<p>Сначала нам нужно установить необходимые зависимости.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.<span class="hljs-property">model</span>.<span class="hljs-property">hybrid</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">BGEM3EmbeddingFunction</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    utility,
    <span class="hljs-title class_">FieldSchema</span>, <span class="hljs-title class_">CollectionSchema</span>, <span class="hljs-title class_">DataType</span>,
    <span class="hljs-title class_">Collection</span>, <span class="hljs-title class_">AnnSearchRequest</span>, <span class="hljs-title class_">RRFRanker</span>, connections,
)
<button class="copy-code-btn"></button></code></pre>
<p>Используйте BGE M3 для кодирования документов и запросов для поиска по вставке.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 1. prepare a small corpus to search</span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
query = <span class="hljs-string">&quot;Who started AI research?&quot;</span>

<span class="hljs-comment"># BGE-M3 model can embed texts as dense and sparse vectors.</span>
<span class="hljs-comment"># It is included in the optional `model` module in pymilvus, to install it,</span>
<span class="hljs-comment"># simply run &quot;pip install pymilvus[model]&quot;.</span>

bge_m3_ef = BGEM3EmbeddingFunction(use_fp16=<span class="hljs-literal">False</span>, device=<span class="hljs-string">&quot;cpu&quot;</span>)

docs_embeddings = bge_m3_ef(docs)
query_embeddings = bge_m3_ef([query])
<button class="copy-code-btn"></button></code></pre>
