---
id: build_RAG_with_milvus_and_cognee.md
summary: >-
  В этом руководстве мы покажем вам, как построить конвейер RAG
  (Retrieval-Augmented Generation) с помощью Milvus и Cognee.
title: Построение RAG с помощью Milvus и Cognee
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/build_RAG_with_milvus_and_cognee.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/build_RAG_with_milvus_and_cognee.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h3 id="Build-RAG-with-Milvus-and-Cognee" class="common-anchor-header">Создайте RAG с помощью Milvus и Cognee</h3><p><a href="https://www.cognee.ai">Cognee</a> - это платформа, ориентированная на разработчиков, которая упрощает разработку приложений искусственного интеллекта с помощью масштабируемых модульных конвейеров ECL (Extract, Cognify, Load). Благодаря бесшовной интеграции с Milvus, Cognee обеспечивает эффективное подключение и извлечение разговоров, документов и транскрипций, сокращая количество галлюцинаций и оптимизируя операционные расходы.</p>
<p>Благодаря поддержке таких векторных хранилищ, как Milvus, баз данных графов и LLM, Cognee предоставляет гибкую и настраиваемую основу для создания систем с расширенным поиском (RAG). Его готовая к производству архитектура обеспечивает повышенную точность и эффективность приложений, основанных на искусственном интеллекте.</p>
<p>В этом руководстве мы покажем вам, как построить конвейер RAG (Retrieval-Augmented Generation) с помощью Milvus и Cognee.</p>
<pre><code translate="no" class="language-shell">$ pip install pymilvus git+<span class="hljs-attr">https</span>:<span class="hljs-comment">//github.com/topoteretes/cognee.git</span>
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>Если вы используете Google Colab, то для включения только что установленных зависимостей вам может потребоваться <strong>перезапустить среду выполнения</strong> (нажмите на меню "Runtime" в верхней части экрана и выберите "Restart session" из выпадающего меню).</p>
</blockquote>
<p>По умолчанию в этом примере в качестве LLM используется OpenAI. Вам необходимо подготовить <a href="https://platform.openai.com/docs/quickstart">api ключ</a> и задать его в функции config <code translate="no">set_llm_api_key()</code>.</p>
<p>Чтобы настроить Milvus в качестве базы данных векторов, установите <code translate="no">VECTOR_DB_PROVIDER</code> на <code translate="no">milvus</code> и укажите <code translate="no">VECTOR_DB_URL</code> и <code translate="no">VECTOR_DB_KEY</code>. Поскольку в этом демо мы используем Milvus Lite для хранения данных, необходимо указать только <code translate="no">VECTOR_DB_URL</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

<span class="hljs-keyword">import</span> cognee

cognee.<span class="hljs-property">config</span>.<span class="hljs-title function_">set_llm_api_key</span>(<span class="hljs-string">&quot;YOUR_OPENAI_API_KEY&quot;</span>)


os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;VECTOR_DB_PROVIDER&quot;</span>] = <span class="hljs-string">&quot;milvus&quot;</span>
os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;VECTOR_DB_URL&quot;</span>] = <span class="hljs-string">&quot;./milvus.db&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Что касается переменных окружения <code translate="no">VECTOR_DB_URL</code> и <code translate="no">VECTOR_DB_KEY</code>:</p>
<ul>
<li>Установка <code translate="no">VECTOR_DB_URL</code> в качестве локального файла, например<code translate="no">./milvus.db</code>, является наиболее удобным методом, так как он автоматически использует <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> для хранения всех данных в этом файле.</li>
<li>Если у вас большой объем данных, вы можете настроить более производительный сервер Milvus на <a href="https://milvus.io/docs/quickstart.md">docker или kubernetes</a>. В этом случае используйте ури сервера, например<code translate="no">http://localhost:19530</code>, в качестве <code translate="no">VECTOR_DB_URL</code>.</li>
<li>Если вы хотите использовать <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, полностью управляемый облачный сервис для Milvus, настройте <code translate="no">VECTOR_DB_URL</code> и <code translate="no">VECTOR_DB_KEY</code>, которые соответствуют <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">публичной конечной точке и ключу Api</a> в Zilliz Cloud.</li>
</ul>
<p></a></p>
<h3 id="Prepare-the-data" class="common-anchor-header">Подготовьте данные</h3><p>Мы используем страницы FAQ из <a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">документации Milvus 2.4.x</a> в качестве частных знаний в нашей RAG, которая является хорошим источником данных для простого RAG-конвейера.</p>
<p>Скачайте zip-файл и распакуйте документы в папку <code translate="no">milvus_docs</code>.</p>
<pre><code translate="no" class="language-shell">$ wget https://github.com/milvus-io/milvus-docs/releases/download/v2<span class="hljs-number">.4</span><span class="hljs-number">.6</span>-preview/milvus_docs_2<span class="hljs-number">.4</span>.x_en.<span class="hljs-built_in">zip</span>
$ unzip -q milvus_docs_2<span class="hljs-number">.4</span>.x_en.<span class="hljs-built_in">zip</span> -d milvus_docs
<button class="copy-code-btn"></button></code></pre>
<p>Мы загружаем все файлы разметки из папки <code translate="no">milvus_docs/en/faq</code>. Для каждого документа мы просто используем &quot;# &quot; для разделения содержимого в файле, что позволяет примерно разделить содержимое каждой основной части файла разметки.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []

<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()

    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-RAG" class="common-anchor-header">Сборка RAG<button data-href="#Build-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Resetting-Cognee-Data" class="common-anchor-header">Сброс данных Cognee</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">await</span> cognee.prune.prune_data()
<span class="hljs-keyword">await</span> cognee.prune.prune_system(metadata=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Теперь, когда все готово, мы можем добавить наш набор данных и обработать его в граф знаний.</p>
<h3 id="Adding-Data-and-Cognifying" class="common-anchor-header">Добавление данных и обработка Cognifying</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">await</span> cognee.add(data=text_lines, dataset_name=<span class="hljs-string">&quot;milvus_faq&quot;</span>)
<span class="hljs-keyword">await</span> cognee.cognify()

<span class="hljs-comment"># [DocumentChunk(id=UUID(&#x27;6889e7ef-3670-555c-bb16-3eb50d1d30b0&#x27;), updated_at=datetime.datetime(2024, 12, 4, 6, 29, 46, 472907, tzinfo=datetime.timezone.utc), text=&#x27;Does the query perform in memory? What are incremental data and historical data?\n\nYes. When ...</span>
<span class="hljs-comment"># ...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Метод <code translate="no">add</code> загружает набор данных (Milvus FAQs) в Cognee, а метод <code translate="no">cognify</code> обрабатывает данные для извлечения сущностей, связей и обобщений, создавая граф знаний.</p>
<h3 id="Querying-for-Summaries" class="common-anchor-header">Запрос сводок</h3><p>Теперь, когда данные обработаны, давайте сделаем запрос к графу знаний.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> cognee.api.v1.search <span class="hljs-keyword">import</span> SearchType

query_text = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
search_results = <span class="hljs-keyword">await</span> cognee.search(SearchType.SUMMARIES, query_text=query_text)

<span class="hljs-built_in">print</span>(search_results[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'id': 'de5c6713-e079-5d0b-b11d-e9bacd1e0d73', 'text': 'Milvus stores two data types: inserted data and metadata.'}
</code></pre>
<p>Этот запрос ищет в графе знаний резюме, связанное с текстом запроса, и выводит наиболее связанного кандидата.</p>
<h3 id="Querying-for-Chunks" class="common-anchor-header">Запрос по фрагментам</h3><p>Сводки предлагают высокоуровневые сведения, но для получения более детальной информации мы можем запросить определенные фрагменты данных непосредственно из обработанного набора данных. Эти фрагменты получены из исходных данных, которые были добавлены и проанализированы во время создания графа знаний.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> cognee.<span class="hljs-property">api</span>.<span class="hljs-property">v1</span>.<span class="hljs-property">search</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">SearchType</span>

query_text = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
search_results = <span class="hljs-keyword">await</span> cognee.<span class="hljs-title function_">search</span>(<span class="hljs-title class_">SearchType</span>.<span class="hljs-property">CHUNKS</span>, query_text=query_text)
<button class="copy-code-btn"></button></code></pre>
<p>Давайте отформатируем и отобразим их для лучшей читабельности!</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">format_and_print</span>(<span class="hljs-params">data</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;ID:&quot;</span>, data[<span class="hljs-string">&quot;id&quot;</span>])
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\nText:\n&quot;</span>)
    paragraphs = data[<span class="hljs-string">&quot;text&quot;</span>].split(<span class="hljs-string">&quot;\n\n&quot;</span>)
    <span class="hljs-keyword">for</span> paragraph <span class="hljs-keyword">in</span> paragraphs:
        <span class="hljs-built_in">print</span>(paragraph.strip())
        <span class="hljs-built_in">print</span>()


format_and_print(search_results[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">ID: 4be01c4b-9ee5-541c-9b85-297883934ab3

Text:

Where does Milvus store data?

Milvus deals with two types of data, inserted data and metadata.

Inserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends, including [MinIO](https://min.io/), [AWS S3](https://aws.amazon.com/s3/?nc1=h_ls), [Google Cloud Storage](https://cloud.google.com/storage?hl=en#object-storage-for-companies-of-all-sizes) (GCS), [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs), [Alibaba Cloud OSS](https://www.alibabacloud.com/product/object-storage-service), and [Tencent Cloud Object Storage](https://www.tencentcloud.com/products/cos) (COS).

Metadata are generated within Milvus. Each Milvus module has its own metadata that are stored in etcd.

###
</code></pre>
<p>На предыдущих этапах мы запрашивали набор данных Milvus FAQ для получения как сводок, так и конкретных фрагментов данных. Хотя это позволило получить подробные сведения и детализированную информацию, набор данных был большим, что затрудняло четкое отображение зависимостей в графе знаний.</p>
<p>Чтобы решить эту проблему, мы перезагрузим среду Cognee и будем работать с меньшим, более узким набором данных. Это позволит нам лучше продемонстрировать взаимосвязи и зависимости, выявленные в процессе познания. Упростив данные, мы сможем наглядно увидеть, как Cognee организует и структурирует информацию в графе знаний.</p>
<h3 id="Reset-Cognee" class="common-anchor-header">Перезагрузка Cognee</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">await</span> cognee.prune.prune_data()
<span class="hljs-keyword">await</span> cognee.prune.prune_system(metadata=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Adding-the-Focused-Dataset" class="common-anchor-header">Добавление сфокусированного набора данных</h3><p>Здесь добавляется и обрабатывается меньший набор данных, содержащий всего одну строку текста, чтобы обеспечить сфокусированный и легко интерпретируемый граф знаний.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># We only use one line of text as the dataset, which simplifies the output later</span>
text = <span class="hljs-string">&quot;&quot;&quot;
    Natural language processing (NLP) is an interdisciplinary
    subfield of computer science and information retrieval.
    &quot;&quot;&quot;</span>

<span class="hljs-keyword">await</span> cognee.add(text)
<span class="hljs-keyword">await</span> cognee.cognify()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Querying-for-Insights" class="common-anchor-header">Запрос для получения информации</h3><p>Сосредоточившись на этом меньшем наборе данных, мы можем четко проанализировать взаимосвязи и структуру графа знаний.</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;Tell me about NLP&quot;</span>
search_results = await cognee.search(SearchType.INSIGHTS, query_text=query_text)

<span class="hljs-keyword">for</span> result_text in search_results:
    <span class="hljs-built_in">print</span>(result_text)

# Example output:
# ({<span class="hljs-string">&#x27;id&#x27;</span>: UUID(<span class="hljs-string">&#x27;bc338a39-64d6-549a-acec-da60846dd90d&#x27;</span>), <span class="hljs-string">&#x27;updated_at&#x27;</span>: datetime.datetime(<span class="hljs-number">2024</span>, <span class="hljs-number">11</span>, <span class="hljs-number">21</span>, <span class="hljs-number">12</span>, <span class="hljs-number">23</span>, <span class="hljs-number">1</span>, <span class="hljs-number">211808</span>, tzinfo=datetime.timezone.utc), <span class="hljs-string">&#x27;name&#x27;</span>: <span class="hljs-string">&#x27;natural language processing&#x27;</span>, <span class="hljs-string">&#x27;description&#x27;</span>: <span class="hljs-string">&#x27;An interdisciplinary subfield of computer science and information retrieval.&#x27;</span>}, {<span class="hljs-string">&#x27;relationship_name&#x27;</span>: <span class="hljs-string">&#x27;is_a_subfield_of&#x27;</span>, <span class="hljs-string">&#x27;source_node_id&#x27;</span>: UUID(<span class="hljs-string">&#x27;bc338a39-64d6-549a-acec-da60846dd90d&#x27;</span>), <span class="hljs-string">&#x27;target_node_id&#x27;</span>: UUID(<span class="hljs-string">&#x27;6218dbab-eb6a-5759-a864-b3419755ffe0&#x27;</span>), <span class="hljs-string">&#x27;updated_at&#x27;</span>: datetime.datetime(<span class="hljs-number">2024</span>, <span class="hljs-number">11</span>, <span class="hljs-number">21</span>, <span class="hljs-number">12</span>, <span class="hljs-number">23</span>, <span class="hljs-number">15</span>, <span class="hljs-number">473137</span>, tzinfo=datetime.timezone.utc)}, {<span class="hljs-string">&#x27;id&#x27;</span>: UUID(<span class="hljs-string">&#x27;6218dbab-eb6a-5759-a864-b3419755ffe0&#x27;</span>), <span class="hljs-string">&#x27;updated_at&#x27;</span>: datetime.datetime(<span class="hljs-number">2024</span>, <span class="hljs-number">11</span>, <span class="hljs-number">21</span>, <span class="hljs-number">12</span>, <span class="hljs-number">23</span>, <span class="hljs-number">1</span>, <span class="hljs-number">211808</span>, tzinfo=datetime.timezone.utc), <span class="hljs-string">&#x27;name&#x27;</span>: <span class="hljs-string">&#x27;computer science&#x27;</span>, <span class="hljs-string">&#x27;description&#x27;</span>: <span class="hljs-string">&#x27;The study of computation and information processing.&#x27;</span>})
# (...)
#
# It represents nodes and relationships in the knowledge graph:
# - The first element is the source node (e.g., <span class="hljs-string">&#x27;natural language processing&#x27;</span>).
# - The second element is the relationship between nodes (e.g., <span class="hljs-string">&#x27;is_a_subfield_of&#x27;</span>).
# - The third element is the target node (e.g., <span class="hljs-string">&#x27;computer science&#x27;</span>).
<button class="copy-code-btn"></button></code></pre>
<p>Этот вывод представляет собой результаты запроса к графу знаний, показывая сущности (узлы) и их взаимосвязи (ребра), извлеченные из обработанного набора данных. Каждый кортеж включает исходную сущность, тип связи и целевую сущность, а также метаданные, такие как уникальные идентификаторы, описания и временные метки. Граф выделяет ключевые понятия и их семантические связи, обеспечивая структурированное понимание набора данных.</p>
<p>Поздравляем, вы узнали о базовом использовании cognee с Milvus. Если вы хотите узнать о более продвинутом использовании cognee, пожалуйста, обратитесь к его официальной <a href="https://github.com/topoteretes/cognee">странице</a>.</p>
