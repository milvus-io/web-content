---
id: quickstart_with_attu.md
summary: >-
  Attu - это универсальный инструмент администрирования Milvus с открытым
  исходным кодом. Он имеет интуитивно понятный графический интерфейс
  пользователя (GUI), позволяющий легко взаимодействовать с вашими базами
  данных. Всего за несколько кликов вы можете визуализировать состояние
  кластера, управлять метаданными, выполнять запросы к данным и многое другое.
title: Быстрый старт с Attu - веб-интерфейса Milvus
---
<h1 id="Quick-Start-with-Attu-Desktop" class="common-anchor-header">Быстрый старт с Attu Desktop<button data-href="#Quick-Start-with-Attu-Desktop" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="1-Introduction" class="common-anchor-header">1. Введение<button data-href="#1-Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/zilliztech/attu">Attu</a> - это универсальный инструмент администрирования Milvus с открытым исходным кодом. Он имеет интуитивно понятный графический интерфейс пользователя (GUI), позволяющий легко взаимодействовать с вашими базами данных. Всего несколькими щелчками мыши вы можете визуализировать состояние кластера, управлять метаданными, выполнять запросы к данным и многое другое.</p>
<hr>
<h2 id="2-Install-Desktop-Application" class="common-anchor-header">2. Установите настольное приложение<button data-href="#2-Install-Desktop-Application" class="anchor-icon" translate="no">
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
    </button></h2><p>Загрузите настольную версию Attu, посетив <a href="https://github.com/zilliztech/attu/releases">страницу Attu GitHub Releases</a>. Выберите подходящую версию для вашей операционной системы и выполните шаги по установке.</p>
<h3 id="Note-for-macOS-M-series-chip" class="common-anchor-header">Примечание для macOS (чип серии M):</h3><p>Если вы столкнулись с ошибкой:</p>
<pre><code translate="no">attu.app <span class="hljs-keyword">is</span> damaged <span class="hljs-keyword">and</span> cannot be opened.
<button class="copy-code-btn"></button></code></pre>
<p>Выполните следующую команду в терминале, чтобы обойти эту проблему:</p>
<pre><code translate="no"><span class="hljs-built_in">sudo</span> xattr -rd com.apple.quarantine /Applications/attu.app
<button class="copy-code-btn"></button></code></pre>
<hr>
<h2 id="3-Connect-to-Milvus" class="common-anchor-header">3. Подключение к Milvus<button data-href="#3-Connect-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Attu поддерживает подключение как к <strong>Milvus Standalone</strong>, так и к <strong>Zilliz Cloud</strong>, обеспечивая гибкость работы с локальными или облачными базами данных.</p>
<p>Чтобы использовать Milvus Standalone локально:</p>
<ol>
<li>Запустите Milvus Standalone, следуя <a href="https://milvus.io/docs/install_standalone-docker.md">руководству по установке Milvus</a>.</li>
<li>Откройте Attu и введите информацию о подключении:<ul>
<li>Milvus Address: URI вашего сервера Milvus Standalone, например http://localhost:19530.</li>
<li>Другие дополнительные настройки: Вы можете задать их в зависимости от конфигурации Milvus или просто оставить по умолчанию.</li>
</ul></li>
<li>Нажмите кнопку Подключить, чтобы получить доступ к базе данных.</li>
</ol>
<blockquote>
<p>Вы также можете подключить полностью управляемый Milvus на <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. Просто установите <code translate="no">Milvus Address</code> и <code translate="no">token</code> на <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">публичную конечную точку и API-ключ</a> вашего экземпляра Zilliz Cloud.</p>
</blockquote>
<ol start="4">
<li>Нажмите, чтобы получить доступ к базе данных.</li>
</ol>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_login_page.png" alt="Attu Login Page" width="80%">
</p>
<hr>
<h2 id="4-Prepare-Data-Create-Collection-and-Insert-Data" class="common-anchor-header">4. Подготовка данных, создание коллекции и вставка данных<button data-href="#4-Prepare-Data-Create-Collection-and-Insert-Data" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="41-Prepare-the-Data" class="common-anchor-header">4.1 Подготовка данных</h3><p>В качестве набора данных для этого примера мы используем страницы FAQ из <a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">документации Milvus 2.4.x</a>.</p>
<h4 id="Download-and-Extract-Data" class="common-anchor-header">Загрузите и извлеките данные:</h4><pre><code translate="no" class="language-bash">wget https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip
unzip -q milvus_docs_2.4.x_en.zip -d milvus_docs
<button class="copy-code-btn"></button></code></pre>
<h4 id="Process-Markdown-Files" class="common-anchor-header">Обработка Markdown-файлов:</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []
<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()
    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="42-Generate-Embeddings" class="common-anchor-header">4.2 Генерирование вкраплений</h3><p>Определите модель встраивания для генерации текстовых вкраплений с помощью <code translate="no">milvus_model</code>. В качестве примера мы используем модель <code translate="no">DefaultEmbeddingFunction</code>, которая представляет собой предварительно обученную и легкую модель встраивания.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model <span class="hljs-keyword">as</span> milvus_model

embedding_model = milvus_model.DefaultEmbeddingFunction()

<span class="hljs-comment"># Generate test embedding</span>
test_embedding = embedding_model.encode_queries([<span class="hljs-string">&quot;This is a test&quot;</span>])[<span class="hljs-number">0</span>]
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<h4 id="Output" class="common-anchor-header">Выход:</h4><pre><code translate="no">768
[-0.04836066  0.07163023 -0.01130064 -0.03789345 -0.03320649 -0.01318448
 -0.03041712 -0.02269499 -0.02317863 -0.00426028]
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="43-Create-Collection" class="common-anchor-header">4.3 Создание коллекции</h3><p>Подключитесь к Milvus и создайте коллекцию:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Connect to Milvus Standalone</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

collection_name = <span class="hljs-string">&quot;attu_tutorial&quot;</span>

<span class="hljs-comment"># Drop collection if it exists</span>
<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

<span class="hljs-comment"># Create a new collection</span>
client.create_collection(
    collection_name=collection_name,
    dimension=embedding_dim,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="44-Insert-Data" class="common-anchor-header">4.4 Вставка данных</h3><p>Пройдитесь по текстовым строкам, создайте вкрапления и вставьте данные в Milvus:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []
doc_embeddings = embedding_model.encode_documents(text_lines)

<span class="hljs-keyword">for</span> i, line <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(tqdm(text_lines, desc=<span class="hljs-string">&quot;Creating embeddings&quot;</span>)):
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: doc_embeddings[i], <span class="hljs-string">&quot;text&quot;</span>: line})

client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="45-Visualize-Data-and-Schema" class="common-anchor-header">4.5 Визуализация данных и схемы</h3><p>Теперь мы можем визуализировать схему данных и вставленные сущности с помощью интерфейса Attu. Схема отображает определенные поля, включая поле <code translate="no">id</code> типа <code translate="no">Int64</code> и поле <code translate="no">vector</code> типа <code translate="no">FloatVector(768)</code> с метрикой <code translate="no">Inner Product (IP)</code>. В коллекцию загружено <strong>72 сущности</strong>.</p>
<p>Кроме того, мы можем просмотреть вставленные данные, включая идентификатор, векторные вложения и динамические поля, хранящие метаданные, такие как текстовое содержимое. Интерфейс поддерживает фильтрацию и запросы на основе заданных условий или динамических полей.</p>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_after_data_insertion_1.png" alt="Schema View" width="45%" />
  <img translate="no" src="/docs/v2.6.x/assets/attu_after_data_insertion_2.png" alt="Data View" width="45%" />
</p>
<h2 id="5-Visualizing-Search-Results-and-Relationships" class="common-anchor-header">5. Визуализация результатов поиска и взаимосвязей<button data-href="#5-Visualizing-Search-Results-and-Relationships" class="anchor-icon" translate="no">
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
    </button></h2><p>Attu предоставляет мощный интерфейс для визуализации и изучения взаимосвязей данных. Чтобы изучить вставленные точки данных и отношения подобия, выполните следующие действия:</p>
<h3 id="51-Perform-a-Search" class="common-anchor-header">5.1 <strong>Выполните поиск</strong></h3><p>Перейдите на вкладку <strong>Векторный поиск</strong> в Attu.</p>
<ol>
<li>Нажмите кнопку <strong>Генерировать случайные данные</strong>, чтобы создать тестовые запросы.</li>
<li>Нажмите кнопку <strong>Поиск</strong>, чтобы получить результаты на основе сгенерированных данных.</li>
</ol>
<p>Результаты отображаются в таблице, в которой показаны идентификаторы, баллы сходства и динамические поля для каждого совпадающего объекта.</p>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_searched_table.png" alt="Search Results Table" width="80%">
</p>
<hr>
<h3 id="52-Explore-Data-Relationships" class="common-anchor-header">5.2 <strong>Изучение взаимосвязей данных</strong></h3><p>Нажмите кнопку <strong>Explore</strong> на панели результатов, чтобы визуализировать взаимосвязи между вектором запроса и результатами поиска в виде <strong>графа знаний</strong>.</p>
<ul>
<li><strong>Центральный узел</strong> представляет вектор поиска.</li>
<li><strong>Подключенные узлы</strong> представляют результаты поиска, при нажатии на которые отображается подробная информация о соответствующем узле.</li>
</ul>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_searched_graph.png" alt="Knowledge Graph Visualization" width="80%">
</p>
<hr>
<h3 id="53-Expand-the-Graph" class="common-anchor-header">5.3 <strong>Развернуть граф</strong></h3><p>Дважды щелкните на любом узле результатов, чтобы развернуть его связи. Это действие позволяет выявить дополнительные связи между выбранным узлом и другими точками данных в коллекции, создавая <strong>более крупный, взаимосвязанный граф знаний</strong>.</p>
<p>Такое расширенное представление позволяет глубже изучить взаимосвязь точек данных на основе векторного сходства.</p>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_expanded_searched_graph.png" alt="Expanded Knowledge Graph" width="80%">
</p>
<hr>
<h2 id="6-Conclusion" class="common-anchor-header">6. Заключение<button data-href="#6-Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Attu упрощает управление и визуализацию векторных данных, хранящихся в Milvus. От вставки данных до выполнения запросов и интерактивного исследования он предоставляет интуитивно понятный интерфейс для решения сложных задач векторного поиска. Благодаря таким функциям, как поддержка динамических схем, графические визуализации поиска и гибкие фильтры запросов, Attu позволяет пользователям эффективно анализировать большие массивы данных.</p>
<p>Используя инструменты визуального поиска Attu, пользователи могут лучше понять свои данные, выявить скрытые взаимосвязи и принять решения, основанные на данных. Начните исследовать свои собственные наборы данных уже сегодня с помощью Attu и Milvus!</p>
<hr>
