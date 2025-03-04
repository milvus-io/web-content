---
id: ETL_using_vectorETL.md
summary: >-
  В этом уроке мы рассмотрим, как эффективно загружать данные в Milvus с помощью
  [VectorETL](https://github.com/ContextData/VectorETL), легкого ETL-фреймворка,
  разработанного для векторных баз данных. VectorETL упрощает процесс извлечения
  данных из различных источников, преобразования их в векторные вкрапления с
  помощью моделей искусственного интеллекта и хранения в Milvus для быстрого и
  масштабируемого поиска. К концу этого урока вы получите рабочий ETL-конвейер,
  который позволит вам с легкостью интегрировать и управлять системами
  векторного поиска. Давайте погрузимся!
title: Эффективная загрузка данных в Milvus с помощью VectorETL
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/ETL_using_vectorETL.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/ETL_using_vectorETL.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Efficient-Data-Loading-into-Milvus-with-VectorETL" class="common-anchor-header">Эффективная загрузка данных в Milvus с помощью VectorETL<button data-href="#Efficient-Data-Loading-into-Milvus-with-VectorETL" class="anchor-icon" translate="no">
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
    </button></h1><p>В этом руководстве мы рассмотрим, как эффективно загружать данные в Milvus с помощью <a href="https://github.com/ContextData/VectorETL">VectorETL</a>, легкого ETL-фреймворка, разработанного для векторных баз данных. VectorETL упрощает процесс извлечения данных из различных источников, преобразования их в векторные вкрапления с помощью моделей искусственного интеллекта и хранения в Milvus для быстрого и масштабируемого извлечения. К концу этого урока вы получите рабочий ETL-конвейер, который позволит вам с легкостью интегрировать и управлять системами векторного поиска. Давайте погрузимся!</p>
<h2 id="Preparation" class="common-anchor-header">Подготовка<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Dependency-and-Environment" class="common-anchor-header">Зависимости и окружение</h3><pre><code translate="no" class="language-shell">$ pip install --upgrade vector-etl pymilvus
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Если вы используете Google Colab, для включения только что установленных зависимостей вам может потребоваться <strong>перезапустить среду выполнения</strong> (нажмите на меню "Runtime" в верхней части экрана и выберите "Restart session" из выпадающего меню).</p>
</div>
<p>VectorETL поддерживает множество источников данных, включая Amazon S3, Google Cloud Storage, Local File и т. д. С полным списком поддерживаемых источников вы можете ознакомиться <a href="https://github.com/ContextData/VectorETL?tab=readme-ov-file#source-configuration">здесь</a>. В этом руководстве мы рассмотрим Amazon S3 в качестве примера источника данных.</p>
<p>Мы будем загружать документы из Amazon S3. Поэтому вам необходимо подготовить <code translate="no">AWS_ACCESS_KEY_ID</code> и <code translate="no">AWS_SECRET_ACCESS_KEY</code> в качестве переменных окружения для безопасного доступа к вашему ведру S3. Кроме того, мы будем использовать модель встраивания OpenAI <code translate="no">text-embedding-ada-002</code> для генерации вкраплений для данных. Также необходимо подготовить <a href="https://platform.openai.com/docs/quickstart">api ключ</a> <code translate="no">OPENAI_API_KEY</code> в качестве переменной окружения.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;your-openai-api-key&quot;</span>
os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;AWS_ACCESS_KEY_ID&quot;</span>] = <span class="hljs-string">&quot;your-aws-access-key-id&quot;</span>
os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;AWS_SECRET_ACCESS_KEY&quot;</span>] = <span class="hljs-string">&quot;your-aws-secret-access-key&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Workflow" class="common-anchor-header">Рабочий процесс<button data-href="#Workflow" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Defining-the-Data-Source-Amazon-S3" class="common-anchor-header">Определение источника данных (Amazon S3)</h3><p>В данном случае мы извлекаем документы из ведра Amazon S3. VectorETL позволяет нам указать имя ведра, путь к файлам и тип данных, с которыми мы работаем.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">source</span> = {
    <span class="hljs-string">&quot;source_data_type&quot;</span>: <span class="hljs-string">&quot;Amazon S3&quot;</span>,
    <span class="hljs-string">&quot;bucket_name&quot;</span>: <span class="hljs-string">&quot;my-bucket&quot;</span>,
    <span class="hljs-string">&quot;key&quot;</span>: <span class="hljs-string">&quot;path/to/files/&quot;</span>,
    <span class="hljs-string">&quot;file_type&quot;</span>: <span class="hljs-string">&quot;.csv&quot;</span>,
    <span class="hljs-string">&quot;aws_access_key_id&quot;</span>: os.environ[<span class="hljs-string">&quot;AWS_ACCESS_KEY_ID&quot;</span>],
    <span class="hljs-string">&quot;aws_secret_access_key&quot;</span>: os.environ[<span class="hljs-string">&quot;AWS_SECRET_ACCESS_KEY&quot;</span>],
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuring-the-Embedding-Model-OpenAI" class="common-anchor-header">Настройка модели встраивания (OpenAI)</h3><p>После того как мы настроили источник данных, нам нужно определить модель встраивания, которая будет преобразовывать наши текстовые данные в векторные вкрапления. В данном примере мы используем модель OpenAI <code translate="no">text-embedding-ada-002</code>.</p>
<pre><code translate="no" class="language-python">embedding = {
    <span class="hljs-string">&quot;embedding_model&quot;</span>: <span class="hljs-string">&quot;OpenAI&quot;</span>,
    <span class="hljs-string">&quot;api_key&quot;</span>: os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>],
    <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-ada-002&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Setting-Up-Milvus-as-the-Target-Database" class="common-anchor-header">Настройка Milvus в качестве целевой базы данных</h3><p>Нам нужно хранить сгенерированные эмбеддинги в Milvus. Здесь мы определяем параметры подключения к Milvus с помощью Milvus Lite.</p>
<pre><code translate="no" class="language-python">target = {
    <span class="hljs-string">&quot;target_database&quot;</span>: <span class="hljs-string">&quot;Milvus&quot;</span>,
    <span class="hljs-string">&quot;host&quot;</span>: <span class="hljs-string">&quot;./milvus.db&quot;</span>,  <span class="hljs-comment"># os.environ[&quot;ZILLIZ_CLOUD_PUBLIC_ENDPOINT&quot;] if using Zilliz Cloud</span>
    <span class="hljs-string">&quot;api_key&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,  <span class="hljs-comment"># os.environ[&quot;ZILLIZ_CLOUD_TOKEN&quot;] if using Zilliz Cloud</span>
    <span class="hljs-string">&quot;collection_name&quot;</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-string">&quot;vector_dim&quot;</span>: <span class="hljs-number">1536</span>,  <span class="hljs-comment"># 1536 for text-embedding-ada-002</span>
}
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Для файлов <code translate="no">host</code> и <code translate="no">api_key</code>:</p>
<ul>
<li><p>Задать <code translate="no">host</code> в качестве локального файла, например<code translate="no">./milvus.db</code>, и оставить <code translate="no">api_key</code> пустым - самый удобный метод, так как он автоматически использует <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> для хранения всех данных в этом файле.</p></li>
<li><p>Если у вас большой объем данных, вы можете настроить более производительный сервер Milvus на <a href="https://milvus.io/docs/quickstart.md">docker или kubernetes</a>. В этом случае используйте uri сервера, например,<code translate="no">http://localhost:19530</code>, в качестве <code translate="no">host</code> и оставьте <code translate="no">api_key</code> пустым.</p></li>
<li><p>Если вы хотите использовать <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, полностью управляемый облачный сервис для Milvus, настройте <code translate="no">host</code> и <code translate="no">api_key</code>, которые соответствуют <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">публичной конечной точке и ключу Api</a> в Zilliz Cloud.</p></li>
</ul>
</div>
<h3 id="Specifying-Columns-for-Embedding" class="common-anchor-header">Указание столбцов для встраивания</h3><p>Теперь нам нужно указать, какие столбцы из наших CSV-файлов должны быть преобразованы во встраиваемые данные. Это гарантирует, что будут обработаны только соответствующие текстовые поля, что оптимизирует эффективность и хранение данных.</p>
<pre><code translate="no" class="language-python">embed_columns = [<span class="hljs-string">&quot;col_1&quot;</span>, <span class="hljs-string">&quot;col_2&quot;</span>, <span class="hljs-string">&quot;col_3&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Creating-and-Executing-the-VectorETL-Pipeline" class="common-anchor-header">Создание и выполнение конвейера VectorETL</h3><p>Теперь, когда все настройки выполнены, мы инициализируем ETL-конвейер, настроим поток данных и выполним его.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> vector_etl <span class="hljs-keyword">import</span> create_flow

flow = create_flow()
flow.set_source(source)
flow.set_embedding(embedding)
flow.set_target(target)
flow.set_embed_columns(embed_columns)

<span class="hljs-comment"># Execute the flow</span>
flow.execute()
<button class="copy-code-btn"></button></code></pre>
<p>Следуя этому руководству, мы успешно создали сквозной ETL-конвейер для перемещения документов из Amazon S3 в Milvus с помощью VectorETL. VectorETL отличается гибкостью в выборе источников данных, поэтому вы можете выбирать любые источники данных, исходя из конкретных потребностей вашего приложения. Благодаря модульному дизайну VectorETL вы можете легко расширить этот конвейер для поддержки других источников данных, встраивания моделей, что делает его мощным инструментом для ИИ и инженерных процессов обработки данных!</p>
