---
id: overview.md
title: Что такое Милвус
related_key: Milvus Overview
summary: >-
  Milvus - это высокопроизводительная и масштабируемая векторная база данных,
  которая эффективно работает в самых разных средах, от ноутбука до
  крупномасштабных распределенных систем. Она доступна как в виде программного
  обеспечения с открытым исходным кодом, так и в виде облачного сервиса.
---
<h1 id="What-is-Milvus" class="common-anchor-header">Что такое милвус?<button data-href="#What-is-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><span>Milvus <span style="display: inline-block; vertical-align: middle;">
<audio id="milvus-audio" style="display: none;">
<source src="https://en-audio.howtopronounce.com/15783806805e142d8844912.mp3" type="audio/mp3" />
</audio>
<span style="
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url('https://milvus.io/docs/v2.6.x/assets/hearing.png') no-repeat center center;
    background-size: contain;
    cursor: pointer;
    margin-left: 4px;
  " onclick="document.getElementById('milvus-audio').play()"></span>
</span></span> - хищная птица из рода Milvus семейства ястребиных Accipaitridae, отличающаяся скоростью полета, острым зрением и удивительной приспособляемостью.</p>
<style>
  audio::-webkit-media-controls { display: none !important; }</style>
<p>Zilliz выбрала название Milvus для своей высокопроизводительной и масштабируемой векторной базы данных с открытым исходным кодом, которая эффективно работает в самых разных средах, от ноутбука до крупных распределенных систем. Она доступна как в виде программного обеспечения с открытым исходным кодом, так и в виде облачного сервиса.</p>
<p>Разработанная компанией Zilliz и вскоре переданная LF AI &amp; Data Foundation в рамках Linux Foundation, Milvus стала одним из ведущих мировых проектов векторных баз данных с открытым исходным кодом. Он распространяется под лицензией Apache 2.0, а большинство участников - эксперты из сообщества высокопроизводительных вычислений (HPC), специализирующиеся на создании крупномасштабных систем и оптимизации кода с учетом аппаратного обеспечения. В число основных участников входят специалисты из Zilliz, ARM, NVIDIA, AMD, Intel, Meta, IBM, Salesforce, Alibaba и Microsoft.</p>
<p>Интересно, что каждый проект Zilliz с открытым исходным кодом назван в честь птицы, что символизирует свободу, предвидение и быстрое развитие технологий.</p>
<h2 id="Unstructured-Data-Embeddings-and-Milvus" class="common-anchor-header">Неструктурированные данные, эмбеддинги и Milvus<button data-href="#Unstructured-Data-Embeddings-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Неструктурированные данные, такие как текст, изображения и аудио, различаются по формату и несут в себе богатую семантику, что делает их сложными для анализа. Чтобы справиться с этой сложностью, используются эмбеддинги, преобразующие неструктурированные данные в числовые векторы, отражающие их основные характеристики. Затем эти векторы хранятся в векторной базе данных, обеспечивая быстрый и масштабируемый поиск и анализ.</p>
<p>Milvus предлагает надежные возможности моделирования данных, позволяющие организовать неструктурированные или мультимодальные данные в структурированные коллекции. Он поддерживает широкий спектр типов данных для моделирования различных атрибутов, включая распространенные числовые и символьные типы, различные векторные типы, массивы, наборы и JSON, избавляя вас от необходимости поддерживать несколько систем баз данных.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/unstructured-data-embedding-and-milvus.png" alt="Untructured data, embeddings, and Milvus" class="doc-image" id="untructured-data,-embeddings,-and-milvus" />
   </span> <span class="img-wrapper"> <span>Неструктурированные данные, вкрапления и Milvus</span> </span></p>
<p>Milvus предлагает три режима развертывания, охватывающие широкий диапазон масштабов данных - от локального прототипирования в Jupyter Notebooks до массивных кластеров Kubernetes, управляющих десятками миллиардов векторов:</p>
<ul>
<li>Milvus Lite - это библиотека на языке Python, которая может быть легко интегрирована в ваши приложения. Являясь облегченной версией Milvus, она идеально подходит для быстрого создания прототипов в Jupyter Notebooks или для работы на устройствах с ограниченными ресурсами. <a href="/docs/ru/milvus_lite.md">Узнайте больше</a>.</li>
<li>Milvus Standalone - это серверное развертывание на одной машине, все компоненты которого собраны в единый образ Docker для удобного развертывания. <a href="/docs/ru/install_standalone-docker.md">Узнайте больше</a>.</li>
<li>Milvus Distributed может быть развернут на кластерах Kubernetes. Это облачная нативная архитектура, предназначенная для миллиардных и даже более масштабных сценариев. Эта архитектура обеспечивает избыточность критически важных компонентов. <a href="/docs/ru/install_cluster-milvusoperator.md">Узнайте больше</a>.</li>
</ul>
<h2 id="What-Makes-Milvus-so-Fast" class="common-anchor-header">Что делает Milvus таким быстрым？<button data-href="#What-Makes-Milvus-so-Fast" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus с самого начала разрабатывалась как высокоэффективная система векторных баз данных. В большинстве случаев Milvus превосходит другие векторные базы данных в 2-5 раз (см. результаты VectorDBBench). Такая высокая производительность является результатом нескольких ключевых конструкторских решений:</p>
<p><strong>Оптимизация с учетом аппаратного обеспечения</strong>: Чтобы Milvus мог работать в различных аппаратных средах, мы оптимизировали его производительность специально для многих аппаратных архитектур и платформ, включая AVX512, SIMD, GPU и NVMe SSD.</p>
<p><strong>Передовые алгоритмы поиска</strong>: Milvus поддерживает широкий спектр алгоритмов индексации/поиска в памяти и на диске, включая IVF, HNSW, DiskANN и другие, и все они были глубоко оптимизированы. По сравнению с такими популярными реализациями, как FAISS и HNSWLib, Milvus обеспечивает производительность на 30-70 % выше.</p>
<p><strong>Поисковая система на C++</strong>: Более 80 % производительности векторной базы данных определяется ее поисковой системой. Milvus использует C++ для этого критически важного компонента благодаря высокой производительности, низкоуровневой оптимизации и эффективному управлению ресурсами. Что особенно важно, Milvus интегрирует многочисленные оптимизации кода с учетом аппаратного обеспечения, начиная с векторизации на уровне ассемблера и заканчивая многопоточным распараллеливанием и планированием, чтобы полностью использовать возможности оборудования.</p>
<p><strong>Ориентированность на столбцы</strong>: Milvus - это векторная система баз данных, ориентированная на столбцы. Основные преимущества заключаются в шаблонах доступа к данным. При выполнении запросов база данных, ориентированная на столбцы, считывает только конкретные поля, участвующие в запросе, а не целые строки, что значительно сокращает объем обрабатываемых данных. Кроме того, операции над данными в столбцах могут быть легко векторизованы, что позволяет применять операции сразу ко всем столбцам, что еще больше повышает производительность.</p>
<h2 id="What-Makes-Milvus-so-Scalable" class="common-anchor-header">Что делает Milvus таким масштабируемым<button data-href="#What-Makes-Milvus-so-Scalable" class="anchor-icon" translate="no">
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
    </button></h2><p>В 2022 году Milvus поддерживал миллиардные векторы, а в 2023 году - десятки миллиардов с неизменной стабильностью, обеспечивая работу масштабных сценариев для более чем 300 крупных предприятий, включая Salesforce, PayPal, Shopee, Airbnb, eBay, NVIDIA, IBM, AT&amp;T, LINE, ROBLOX, Inflection и др.</p>
<p>Облачная нативная архитектура Milvus с высокой степенью развязки обеспечивает непрерывное расширение системы по мере роста данных:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus_architecture_2_6.png" alt="Highly decoupled system architecture of Milvus" class="doc-image" id="highly-decoupled-system-architecture-of-milvus" />
   </span> <span class="img-wrapper"> <span>Архитектура системы Milvus с высокой степенью разделения</span> </span></p>
<p>Сама система Milvus полностью статична, поэтому ее можно легко масштабировать с помощью Kubernetes или публичных облаков. Кроме того, компоненты Milvus хорошо развязаны, а три наиболее важные задачи - поиск, вставка данных и индексирование/уплотнение - спроектированы как легко распараллеливаемые процессы с разделенной сложной логикой. Это гарантирует, что соответствующий узел запроса, узел данных и узел индекса могут масштабироваться как вверх, так и вниз независимо друг от друга, оптимизируя производительность и экономическую эффективность.</p>
<h2 id="Types-of-Searches-Supported-by-Milvus" class="common-anchor-header">Типы поиска, поддерживаемые Milvus<button data-href="#Types-of-Searches-Supported-by-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus поддерживает различные типы поисковых функций для удовлетворения требований различных сценариев использования:</p>
<ul>
<li><a href="/docs/ru/single-vector-search.md#Basic-search">ANN Search</a>: Находит K векторов, наиболее близких к вектору вашего запроса.</li>
<li><a href="/docs/ru/single-vector-search.md#Filtered-search">Фильтрующий поиск</a>: Выполняет ANN-поиск при заданных условиях фильтрации.</li>
<li><a href="/docs/ru/single-vector-search.md#Range-search">Поиск в диапазоне</a>: Находит векторы в заданном радиусе от вектора запроса.</li>
<li><a href="/docs/ru/multi-vector-search.md">Гибридный поиск</a>: Проводит ANN-поиск на основе нескольких векторных полей.</li>
<li><a href="/docs/ru/full-text-search.md">Полнотекстовый поиск</a>: Полнотекстовый поиск на основе BM25.</li>
<li><a href="/docs/ru/weighted-ranker.md">Реранжирование</a>: Корректирует порядок результатов поиска на основе дополнительных критериев или вторичного алгоритма, уточняя первоначальные результаты ANN-поиска.</li>
<li><a href="/docs/ru/get-and-scalar-query.md#Get-Entities-by-ID">Fetch (поиск</a>): Получение данных по их первичным ключам.</li>
<li><a href="/docs/ru/get-and-scalar-query.md#Use-Basic-Operators">Запрос</a>: Получение данных с помощью определенных выражений.</li>
</ul>
<h2 id="Comprehensive-Feature-Set" class="common-anchor-header">Широкий набор функций<button data-href="#Comprehensive-Feature-Set" class="anchor-icon" translate="no">
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
    </button></h2><p>В дополнение к ключевым функциям поиска, упомянутым выше, Milvus также предоставляет набор функций, реализованных вокруг ANN-поиска, чтобы вы могли полностью использовать его возможности.</p>
<h3 id="API-and-SDK" class="common-anchor-header">API и SDK</h3><ul>
<li><a href="https://milvus.io/api-reference/restful/v2.4.x/About.md">RESTful API</a> (официальный)</li>
<li><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">PyMilvus</a> (Python SDK) (официальный)</li>
<li><a href="https://milvus.io/api-reference/go/v2.4.x/About.md">Go SDK</a> (официальный)</li>
<li><a href="https://milvus.io/api-reference/java/v2.4.x/About.md">Java SDK</a> (официальный)</li>
<li><a href="https://milvus.io/api-reference/node/v2.4.x/About.md">Node.js</a> (JavaScript) SDK (официальный)</li>
<li><a href="https://milvus.io/api-reference/csharp/v2.2.x/About.md">C#</a> (предоставлен Microsoft)</li>
<li>C++ SDK (в разработке)</li>
<li>Rust SDK (в разработке)</li>
</ul>
<h3 id="Advanced-Data-Types" class="common-anchor-header">Расширенные типы данных</h3><p>Помимо примитивных типов данных, Milvus поддерживает различные расширенные типы данных и соответствующие им метрики расстояния.</p>
<ul>
<li><a href="/docs/ru/sparse_vector.md">Разреженные векторы</a></li>
<li><a href="/docs/ru/index-vector-fields.md">Бинарные векторы</a></li>
<li><a href="/docs/ru/use-json-fields.md">Поддержка JSON</a></li>
<li><a href="/docs/ru/array_data_type.md">Поддержка массивов</a></li>
<li>Текст (в разработке)</li>
<li>Геолокация (в разработке)</li>
</ul>
<h3 id="Why-Milvus" class="common-anchor-header">Почему Milvus?</h3><ul>
<li><p><strong>Высокая производительность в масштабе и высокая доступность</strong></p>
<p>Milvus имеет <a href="/docs/ru/architecture_overview.md">распределенную архитектуру</a>, которая разделяет <a href="/docs/ru/data_processing.md#Data-query">вычисления</a> и <a href="/docs/ru/data_processing.md#Data-insertion">хранение данных</a>. Milvus может горизонтально масштабироваться и адаптироваться к различным моделям трафика, достигая оптимальной производительности за счет независимого увеличения узлов запросов для работы с большими объемами чтения и узлов данных для работы с большими объемами записи. Микросервисы K8s, не имеющие статического характера, позволяют <a href="/docs/ru/coordinator_ha.md#Coordinator-HA">быстро восстанавливаться</a> после сбоев, обеспечивая высокую доступность. Поддержка <a href="/docs/ru/replica.md">реплик</a> еще больше повышает отказоустойчивость и пропускную способность за счет загрузки сегментов данных на несколько узлов запросов. Сравнение производительности см. в <a href="https://zilliz.com/vector-database-benchmark-tool">бенчмарке</a>.</p></li>
<li><p><strong>Поддержка различных типов векторных индексов и аппаратное ускорение</strong></p>
<p>Milvus разделяет систему и основной механизм векторного поиска, что позволяет ему поддерживать все основные типы векторных индексов, оптимизированные для различных сценариев, включая HNSW, IVF, FLAT (грубая сила), SCANN и DiskANN, с вариациями <a href="/docs/ru/index-explained.md">на основе квантования</a> и <a href="/docs/ru/mmap.md">mmap</a>. Milvus оптимизирует векторный поиск для таких расширенных возможностей, как <a href="/docs/ru/boolean.md">фильтрация метаданных</a> и <a href="/docs/ru/range-search.md">поиск по диапазону</a>. Кроме того, Milvus реализует аппаратное ускорение для повышения производительности векторного поиска и поддерживает индексирование на GPU, например, <a href="/docs/ru/gpu-cagra.md">CAGRA</a> от NVIDIA.</p></li>
<li><p><strong>Гибкая многопользовательская поддержка и горячее/холодное хранение</strong></p>
<p>Milvus поддерживает <a href="/docs/ru/multi_tenancy.md#Multi-tenancy-strategies">многопользовательскую</a> работу за счет изоляции на уровне баз данных, коллекций, разделов или ключей разделов. Гибкие стратегии позволяют одному кластеру обслуживать от сотен до миллионов арендаторов, а также обеспечивают оптимизированную производительность поиска и гибкий контроль доступа. Milvus повышает экономическую эффективность за счет горячего/холодного хранения. Часто используемые горячие данные могут храниться в памяти или на твердотельных накопителях для повышения производительности, в то время как менее часто используемые холодные данные хранятся в более медленных и экономичных хранилищах. Этот механизм позволяет значительно сократить расходы, сохраняя высокую производительность для критически важных задач.</p></li>
<li><p><strong>Разреженный вектор для полнотекстового поиска и гибридного поиска</strong></p>
<p>Помимо семантического поиска с помощью плотного вектора, Milvus также поддерживает <a href="/docs/ru/full-text-search.md">полнотекстовый поиск</a> с помощью BM25, а также обученные разреженные вкрапления, такие как SPLADE и BGE-M3. Пользователи могут хранить разреженный вектор и плотный вектор в одной коллекции и определять функции для ранжирования результатов по нескольким поисковым запросам. Посмотрите примеры <a href="/docs/ru/full_text_search_with_milvus.md">гибридного поиска с семантическим поиском + полнотекстовым поиском</a>.</p></li>
<li><p><strong>Безопасность данных и мелкозернистый контроль доступа</strong></p>
<p>Milvus обеспечивает безопасность данных за счет <a href="/docs/ru/authenticate.md">обязательной аутентификации пользователей</a>, <a href="/docs/ru/tls.md">шифрования TLS</a> и <a href="/docs/ru/rbac.md">управления доступом на основе ролей (RBAC)</a>. Аутентификация пользователей гарантирует, что только авторизованные пользователи с действительными учетными данными могут получить доступ к базе данных, а шифрование TLS защищает все коммуникации в сети. Кроме того, RBAC позволяет осуществлять тонкий контроль доступа, назначая пользователям определенные разрешения в соответствии с их ролями. Эти функции делают Milvus надежным и безопасным выбором для корпоративных приложений, защищая конфиденциальные данные от несанкционированного доступа и возможных утечек.</p></li>
</ul>
<h3 id="AI-Integrations" class="common-anchor-header">Интеграции искусственного интеллекта</h3><ul>
<li><p>Интеграции с моделями встраивания Модели встраивания преобразуют неструктурированные данные в их числовое представление в высокоразмерном пространстве данных, чтобы вы могли хранить их в Milvus. В настоящее время PyMilvus, SDK для Python, интегрирует несколько моделей встраивания, чтобы вы могли быстро подготовить свои данные к векторным встраиваниям. Подробнее см. в разделе <a href="/docs/ru/embeddings.md">Обзор встраивания</a>.</p></li>
<li><p>Интеграция моделей реранжирования В сфере информационного поиска и генеративного ИИ реранжировщик является важным инструментом, который оптимизирует порядок результатов первоначального поиска. PyMilvus также интегрирует несколько моделей реранкинга для оптимизации порядка результатов, возвращаемых при первоначальном поиске. Подробнее см. в разделе <a href="/docs/ru/rerankers-overview.md">Обзор реранкеров</a>.</p></li>
<li><p>LangChain и другие интеграции с инструментами искусственного интеллекта В эпоху GenAI такие инструменты, как LangChain, привлекают большое внимание разработчиков приложений. Как основной компонент, Milvus обычно служит хранилищем векторов в таких инструментах. Чтобы узнать, как интегрировать Milvus в ваши любимые инструменты искусственного интеллекта, обратитесь к нашим разделам <a href="/docs/ru/integrate_with_openai.md">"Интеграции"</a> и <a href="/docs/ru/build-rag-with-milvus.md">"Учебники"</a>.</p></li>
</ul>
<h3 id="Tools-and-Ecosystem" class="common-anchor-header">Инструменты и экосистема</h3><ul>
<li><p>Attu Attu - это универсальный интуитивно понятный графический интерфейс, который поможет вам управлять Milvus и данными, которые он хранит. Подробности см. в репозитории <a href="https://github.com/zilliztech/attu">Attu</a>.</p></li>
<li><p>Birdwatcher Birdwatcher - это отладочный инструмент для Milvus. Используя его для подключения к etcd, вы можете проверять состояние системы Milvus или настраивать ее на лету. Для получения подробной информации обратитесь к разделу <a href="/docs/ru/birdwatcher_overview.md">BirdWatcher</a>.</p></li>
<li><p>Интеграции Promethus и Grafana Prometheus - это набор инструментов для мониторинга и оповещения систем Kubernetes с открытым исходным кодом. Grafana - это стек визуализации с открытым исходным кодом, который может подключаться ко всем источникам данных. Вы можете использовать Promethus и Grafana в качестве поставщика услуг мониторинга для визуального контроля производительности распределенного Milvus. Подробнее см. в разделе <a href="/docs/ru/monitor.md">Развертывание служб мониторинга</a>.</p></li>
<li><p>Milvus Backup Milvus Backup - это инструмент, позволяющий пользователям создавать резервные копии и восстанавливать данные Milvus. Он предоставляет как CLI, так и API, чтобы вписаться в различные сценарии применения. Более подробную информацию см. в разделе <a href="/docs/ru/milvus_backup_overview.md">Milvus Backup</a>.</p></li>
<li><p>Milvus Capture Data Change (CDC) Milvus-CDC может захватывать и синхронизировать инкрементные данные в экземплярах Milvus и обеспечивает надежность бизнес-данных, беспрепятственно перенося их между исходным и целевым экземплярами, что позволяет легко выполнять инкрементное резервное копирование и аварийное восстановление. Подробную информацию см. в разделе <a href="/docs/ru/milvus-cdc-overview.md">Milvus CDC</a>.</p></li>
<li><p>Коннекторы Milvus Компания Milvus разработала набор коннекторов, позволяющих легко интегрировать Milvus со сторонними инструментами, такими как Apache Spark. В настоящее время вы можете использовать наш коннектор Spark для передачи данных Milvus в Apache Spark для машинного обучения. Подробности см. в разделе <a href="/docs/ru/integrate_with_spark.md">Spark-Milvus Connector</a>.</p></li>
<li><p>Vector Transmission Services (VTS) Milvus предоставляет набор инструментов для передачи данных между экземпляром Milvus и множеством источников данных, включая кластеры Zilliz, Elasticsearch, Postgres (PgVector) и другой экземпляр Milvus. Подробности см. в разделе <a href="https://github.com/zilliztech/vts">VTS</a>.</p></li>
</ul>
