---
id: comparison.md
title: Сравнение
summary: >-
  В этой статье проводится сравнение Milvus с другими решениями для векторного
  поиска.
---
<h1 id="Comparing-Milvus-with-Alternatives" class="common-anchor-header">Сравнение Milvus с альтернативами<button data-href="#Comparing-Milvus-with-Alternatives" class="anchor-icon" translate="no">
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
    </button></h1><p>При изучении различных вариантов векторных баз данных это полное руководство поможет вам понять уникальные особенности Milvus и выбрать базу данных, которая наилучшим образом соответствует вашим потребностям. Примечательно, что Milvus является ведущей векторной базой данных с открытым исходным кодом, а <a href="https://zilliz.com/cloud">Zilliz Cloud</a> предлагает полностью управляемый сервис Milvus. Чтобы объективно оценить Milvus в сравнении с конкурентами, воспользуйтесь <a href="https://github.com/zilliztech/VectorDBBench#quick-start">инструментами сравнения</a> для анализа показателей производительности.</p>
<h2 id="Milvus-highlights" class="common-anchor-header">Основные характеристики Milvus<button data-href="#Milvus-highlights" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p><strong>Функциональность</strong>: Milvus выходит за рамки базового поиска векторного сходства, поддерживая такие расширенные функции, как <a href="https://milvus.io/docs/sparse_vector.md">разреженный вектор</a>, <a href="https://milvus.io/docs/single-vector-search.md#Bulk-vector-search">объемный вектор</a>, <a href="https://milvus.io/docs/single-vector-search.md#Filtered-search">фильтрованный поиск</a> и <a href="https://milvus.io/docs/multi-vector-search.md">гибридные</a> возможности <a href="https://milvus.io/docs/multi-vector-search.md">поиска</a>.</p></li>
<li><p><strong>Гибкость</strong>: Milvus поддерживает различные режимы развертывания и множество SDK, и все это в рамках надежной, интегрированной экосистемы.</p></li>
<li><p><strong>Производительность</strong>: Milvus гарантирует обработку в реальном времени с высокой пропускной способностью и низкой задержкой благодаря оптимизированным алгоритмам индексирования, таким как <a href="https://milvus.io/docs/index.md#HNSW">HNSW</a> и <a href="https://milvus.io/docs/disk_index.md">DiskANN</a>, а также усовершенствованному <a href="https://milvus.io/docs/gpu_index.md">GPU-ускорению</a>.</p></li>
<li><p><strong>Масштабируемость</strong>: Созданная на заказ распределенная архитектура легко масштабируется, позволяя обрабатывать любые данные - от небольших наборов данных до коллекций, превышающих 10 миллиардов векторов.</p></li>
</ul>
<h2 id="Overall-comparison" class="common-anchor-header">Общее сравнение<button data-href="#Overall-comparison" class="anchor-icon" translate="no">
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
    </button></h2><p>Для сравнения Milvus и Pinecone, двух решений для векторных баз данных, в следующей таблице приведены различия по различным характеристикам.</p>
<table>
<thead>
<tr><th>Характеристика</th><th>Pinecone</th><th>Milvus</th><th>Примечания</th></tr>
</thead>
<tbody>
<tr><td>Режимы развертывания</td><td>Только SaaS</td><td>Milvus Lite, On-prem Standalone &amp; Cluster, Zilliz Cloud Saas &amp; BYOC</td><td>Milvus предлагает большую гибкость в режимах развертывания.</td></tr>
<tr><td>Поддерживаемые SDK</td><td>Python, JavaScript/TypeScript</td><td>Python, Java, NodeJS, Go, Restful API, C#, Rust</td><td>Milvus поддерживает более широкий спектр языков программирования.</td></tr>
<tr><td>Статус с открытым исходным кодом</td><td>Закрыто</td><td>Открытый исходный код</td><td>Milvus - популярная векторная база данных с открытым исходным кодом.</td></tr>
<tr><td>Масштабируемость</td><td>Только масштабирование вверх/вниз</td><td>Масштабирование наружу/внутрь и масштабирование вверх/вниз</td><td>Milvus имеет распределенную архитектуру для повышения масштабируемости.</td></tr>
<tr><td>Доступность</td><td>Архитектура на основе модулей в доступных зонах</td><td>Обход отказа в доступных зонах и межрегиональная HA</td><td>Milvus CDC (Change Data Capture) обеспечивает основной/резервный режимы для повышения доступности.</td></tr>
<tr><td>Стоимость (в долларах за миллион запросов)</td><td>От 0,178 долл. для среднего набора данных, 1,222 долл. для большого набора данных.</td><td>Zilliz Cloud - от 0,148 долл. для среднего набора данных, 0,635 долл. для большого набора данных; доступна бесплатная версия.</td><td>См. <a href="https://zilliz.com/vector-database-benchmark-tool?database=ZillizCloud,Milvus,ElasticCloud,PgVector,Pinecone,QdrantCloud,WeaviateCloud&amp;dataset=medium&amp;filter=none,low,high&amp;tab=2">отчет "Рейтинг стоимости"</a>.</td></tr>
<tr><td>Ускорение на GPU</td><td>Не поддерживается</td><td>Поддержка NVIDIA GPU</td><td>Ускорение GPU значительно повышает производительность, часто на порядки.</td></tr>
</tbody>
</table>
<h2 id="Terminology-comparison" class="common-anchor-header">Сравнение терминологии<button data-href="#Terminology-comparison" class="anchor-icon" translate="no">
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
    </button></h2><p>Несмотря на то что обе системы выполняют схожие функции векторных баз данных, в терминологии Milvus и Pinecone наблюдаются небольшие различия. Ниже приводится подробное сравнение терминологии.</p>
<table>
<thead>
<tr><th>Pinecone</th><th>Milvus</th><th>Примечания</th></tr>
</thead>
<tbody>
<tr><td>Индекс</td><td><a href="https://zilliz.com/comparison">Коллекция</a></td><td>В Pinecone индекс служит организационной единицей для хранения и управления векторами одинакового размера, и этот индекс тесно интегрирован с аппаратным обеспечением, известным как стручки. В отличие от этого, коллекции Milvus служат аналогичной цели, но позволяют работать с несколькими коллекциями в рамках одного экземпляра.</td></tr>
<tr><td>Коллекция</td><td><a href="https://milvus.io/docs/milvus_backup_overview.md#Milvus-Backup">Резервное копирование</a></td><td>В Pinecone коллекция - это, по сути, статичный снимок индекса, который используется в основном для резервного копирования и не может быть запрошен. В Milvus эквивалентная функция для создания резервных копий более прозрачна и имеет простое название.</td></tr>
<tr><td>Пространство имен</td><td><a href="https://milvus.io/docs/use-partition-key.md#Use-Partition-Key">Ключ раздела</a></td><td>Пространства имен позволяют разделить векторы в индексе на подмножества. Milvus предоставляет несколько методов, таких как partition или partition key, для обеспечения эффективной изоляции данных в коллекции.</td></tr>
<tr><td>Метаданные</td><td><a href="https://milvus.io/docs/boolean.md">Скалярное поле</a></td><td>Работа с метаданными в Pinecone основана на парах ключ-значение, в то время как Milvus позволяет создавать сложные скалярные поля, включая стандартные типы данных и динамические поля JSON.</td></tr>
<tr><td>Запрос</td><td><a href="https://milvus.io/docs/single-vector-search.md">Поиск</a></td><td>Название метода, используемого для поиска ближайших соседей для заданного вектора, возможно, с применением дополнительных фильтров.</td></tr>
<tr><td>Недоступно</td><td><a href="https://milvus.io/docs/with-iterators.md">Итератор</a></td><td>В Pinecone отсутствует функция итерации по всем векторам в индексе. В Milvus появились методы Search Iterator и Query Iterator, расширяющие возможности поиска данных в различных наборах данных.</td></tr>
</tbody>
</table>
<h2 id="Capability-comparison" class="common-anchor-header">Сравнение возможностей<button data-href="#Capability-comparison" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Возможности</th><th>Pinecone</th><th>Milvus</th></tr>
</thead>
<tbody>
<tr><td>Режимы развертывания</td><td>Только SaaS</td><td>Milvus Lite, On-prem Standalone &amp; Cluster, Zilliz Cloud Saas &amp; BYOC</td></tr>
<tr><td>Функции встраивания</td><td>Недоступно</td><td>Поддержка с помощью <a href="https://github.com/milvus-io/milvus-model">pymilvus[model].</a></td></tr>
<tr><td>Типы данных</td><td>Строка, Число, Bool, Список строк</td><td>String, VarChar, Number (Int, Float, Double), Bool, Array, JSON, Float Vector, Binary Vector, BFloat16, Float16, Sparse Vector</td></tr>
<tr><td>Метрические и индексные типы</td><td>Cos, Dot, Euclidean<br/>P-семейство, S-семейство.</td><td>Косинус, IP (Dot), L2 (Euclidean), Hamming, Jaccard<br/>FLAT, IVF_FLAT, IVF_SQ8, IVF_PQ, HNSW, SCANN, GPU Indexes</td></tr>
<tr><td>Дизайн схемы</td><td>Гибкий режим</td><td>Гибкий режим, строгий режим</td></tr>
<tr><td>Множественные векторные поля</td><td>N/A</td><td>Многовекторный и гибридный поиск</td></tr>
<tr><td>Инструменты</td><td>Наборы данных, текстовые утилиты, коннектор spark</td><td>Attu, Birdwatcher, Backup, CLI, CDC, коннекторы Spark и Kafka.</td></tr>
</tbody>
</table>
<h3 id="Key-insights" class="common-anchor-header">Основные сведения</h3><ul>
<li><p><strong>Режимы развертывания</strong>: Milvus предлагает различные варианты развертывания, включая локальное развертывание, Docker, Kubernetes на местах, Cloud SaaS и Bring Your Own Cloud (BYOC) для предприятий, в то время как Pinecone ограничивается SaaS-развертыванием.</p></li>
<li><p><strong>Функции встраивания</strong>: Milvus поддерживает дополнительные библиотеки встраивания, позволяющие напрямую использовать модели встраивания для преобразования исходных данных в векторы.</p></li>
<li><p><strong>Типы данных</strong>: Milvus поддерживает более широкий спектр типов данных, чем Pinecone, включая массивы и JSON. Pinecone поддерживает только плоскую структуру метаданных со строками, числами, булевыми числами или списками строк в качестве значений, в то время как Milvus может работать с любыми объектами JSON, включая вложенные структуры в поле JSON. Pinecone ограничивает размер метаданных до 40 КБ на вектор.</p></li>
<li><p><strong>Типы метрик и индексов</strong>: Milvus поддерживает широкий выбор типов метрик и индексов для различных случаев использования, в то время как Pinecone имеет более ограниченный выбор. В Milvus индекс для вектора является обязательным, но для упрощения процесса настройки доступна опция AUTO_INDEX.</p></li>
<li><p><strong>Разработка схем</strong>: Milvus предлагает гибкие режимы <code translate="no">create_collection</code> для разработки схемы, включая быструю настройку с динамической схемой для работы без схемы, как в Pinecone, и индивидуальную настройку с предопределенными полями схемы и индексами, как в реляционной системе управления базами данных (RDBMS).</p></li>
<li><p><strong>Множественные векторные поля</strong>: Milvus позволяет хранить несколько векторных полей в одной коллекции, которые могут быть как разреженными, так и плотными и иметь разную размерность. Pinecone не предлагает подобной возможности.</p></li>
<li><p><strong>Инструменты</strong>: Milvus предлагает более широкий выбор инструментов для управления и использования баз данных, таких как Attu, Birdwatcher, Backup, CLI, CDC и коннектор Spark и Kafka.</p></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">Что дальше<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p><strong>Испытание</strong>: Испытайте Milvus из первых рук, начав с <a href="https://milvus.io/docs/quickstart.md">быстрого запуска</a> Milvus или <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">подписавшись на Zilliz Cloud</a>.</p></li>
<li><p><strong>Узнайте больше</strong>: Узнайте больше о возможностях Milvus из наших подробных <a href="https://milvus.io/docs/manage-collections.md">руководств</a> <a href="/docs/ru/glossary.md">по терминологии</a> и <a href="https://milvus.io/docs/manage-collections.md">руководств пользователя</a>.</p></li>
<li><p><strong>Изучите альтернативы</strong>: Для более широкого сравнения вариантов векторных баз данных изучите дополнительные ресурсы на <a href="https://zilliz.com/comparison">этой странице</a>.</p></li>
</ul>
