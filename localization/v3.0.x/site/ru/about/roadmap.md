---
id: roadmap.md
title: План развития Milvus
related_key: Milvus roadmap
summary: >-
  Milvus — это векторная база данных с открытым исходным кодом, созданная для
  поддержки приложений искусственного интеллекта. Ниже представлена наша
  дорожная карта, определяющая направления развития проекта.
---
<h1 id="Milvus-Roadmap" class="common-anchor-header">План развития Milvus<button data-href="#Milvus-Roadmap" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="🌌-Toward-the-Next-Gen-Multimodal-Database-and-Vector-Lakebase" class="common-anchor-header">🌌 На пути к мультимодальной базе данных нового поколения и Vector Lakebase<button data-href="#🌌-Toward-the-Next-Gen-Multimodal-Database-and-Vector-Lakebase" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>План развития продукта Milvus</strong></p>
<p>Добро пожаловать в раздел «Дорожная карта Milvus»!</p>
<p>Мы вступаем с Milvus в новую эру — эру мультимодальных баз данных нового поколения — <strong>охватывающих как структурированные, так и неструктурированные данные, от поиска в реальном времени до офлайн-аналитики, а также от производительности одного кластера до глобальной</strong> <strong>архитектуры Vector Lakebase.</strong></p>
<p>В этой дорожной карте изложены основные цели для <strong>Milvus v3.0 (публичная бета-версия)</strong> и <strong>Milvus v3.1 (долгосрочная разработка)</strong>, а также план развития <strong>Zilliz Vector Lakebase</strong>.</p>
<h2 id="🌠-Milvus-v30-Public-Beta" class="common-anchor-header">🌠 Milvus v3.0 (открытая бета-версия)<button data-href="#🌠-Milvus-v30-Public-Beta" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Открытая бета-версия: май 2026 г.</strong></p>
<p>Основная задача: создание <strong>механизма запросов с</strong> встроенной <strong>поддержкой семантики</strong>, включающего сортировку, агрегацию и поиск по нескольким векторам, а также <strong>основанной на технологии «lake-native» платформы Zilliz Vector Lakebase</strong>, позволяющей вычислительным ресурсам обращаться к данным без их миграции.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 Основные особенности<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Schema--Data-Type-Evolution" class="common-anchor-header">🔹 <strong>Развитие схемы и типов данных</strong></h4><ul>
<li>Поддержка команд ALTER COLLECTION ADD COLUMN и DROP COLUMN во время выполнения без перестроения индексов и прерывания обслуживания.</li>
<li>Предоставление <strong>двух путей заполнения данных</strong> для новых столбцов: внешнего через Spark Connector и внутреннего с помощью разреженных векторов BM25, автоматически генерируемых при записи.</li>
<li>Внедрение <strong>TEXT</strong> в качестве полноценного типа данных, который хранит исходный текст наряду с векторами с поддержкой BM25 и сопоставления текста.</li>
</ul>
<h4 id="🔹-Query-Execution-Overhaul" class="common-anchor-header">🔹 <strong>Переработка механизма выполнения</strong> <strong>запросов</strong> </h4><ul>
<li>Перенос <strong>оператора ORDER BY</strong> в ядро с сортировкой по сегментам и слиянием результатов между узлами запроса.</li>
<li>Добавлена <strong>агрегация</strong> <strong>запросов</strong> в стиле SQL (GROUP BY с COUNT, SUM, AVG, MIN, MAX), вычисляемая в ядре.</li>
<li>Внедрить <strong>фасеты поиска</strong> по результатам ANN со статистикой по каждому сегменту и вложенными подфасетами на стороне сервера.</li>
<li>Поддержка <strong>пользовательских словарей</strong> и таблиц синонимов, зарегистрированных на стороне кластера, для улучшения полноты поиска по CJK и в конкретных предметных областях.</li>
</ul>
<h4 id="🔹-Multi-Vector--Late-Interaction-Support" class="common-anchor-header">🔹 <strong>Поддержка мультивекторов и позднего взаимодействия</strong></h4><ul>
<li>Внедрить <strong>StructList</strong> для представления одной сущности в виде одной строки с множеством векторов, с встроенной поддержкой позднего взаимодействия (ColBERT, ColPali) через MAX_SIM.</li>
<li>Поддержка <strong>поиска на уровне элементов и сущностей</strong> по полям StructList с настраиваемыми правилами сопоставления для результатов на уровне сущностей.</li>
<li>Добавлены три <strong>стратегии поиска с использованием нескольких векторов</strong>: TokenANN (исчерпывающий), Muvera (на основе проекции, без обучения) и Lemur (обученное сжатие).</li>
</ul>
<h4 id="🔹-Retrieval--Index-Overhaul" class="common-anchor-header">🔹 <strong>Переработка механизмов поиска и индексирования</strong></h4><ul>
<li>Переработка <strong>разреженного инвертированного индекса</strong> с блочным сжатием, квантованием весов и формат с сохранением в памяти; внедрение <strong>SINDI</strong> в качестве алгоритма разреженного инвертированного индекса по умолчанию.</li>
<li>Расширение охвата индекса за счёт полного <strong>семейства Faiss</strong> (SVS, Panorama, PQ, IVFPQ, ScaNN) и <strong>MinHash DIDO</strong> для обнаружения почти-дубликатов.</li>
<li>Поддержка <strong>векторных полей, допускающих нулевые значения</strong>, для асинхронных вложений и отсутствующих модальностей с автоматической фильтрацией во время поиска.</li>
</ul>
<h4 id="🔹-Vector-Lakebase-Storage--Compute-Architecture" class="common-anchor-header">🔹 <strong>Архитектура хранения и вычислений Vector Lakebase</strong></h4><ul>
<li>Внедрение <strong>External Collection</strong> для индексирования и запросов данных в S3 / GCS / Azure на месте с поддержкой форматов таблиц Lance, Parquet, Iceberg и Vortex.</li>
<li>Добавлен <strong>Vortex</strong> — открытый столбчатый формат — и <strong>Loon (Storage V3)</strong> — уровень хранения со смешанными форматами для эффективного чтения отдельных элементов из объектного хранилища.</li>
<li>Поддержка <strong>моментальных снимков</strong> с изоляцией типа MVCC для пакетной обработки при одновременном продолжении записи данных.</li>
<li>Интеграция в качестве <strong>Spark DataSource v2</strong> для чтения из Milvus и записи в него непосредственно в конвейерах Spark / Databricks / EMR.</li>
</ul>
<h2 id="🪐-Milvus-v31-Long-Term-Vision" class="common-anchor-header">🪐 Milvus v3.1 (долгосрочная перспектива)<button data-href="#🪐-Milvus-v31-Long-Term-Vision" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Сроки: конец 2026 года и далее</strong></p>
<p>Приоритеты: <strong>интеллектуальное хранение данных</strong>, <strong>целостность пути записи</strong>, <strong>расширяемость вычислительных ресурсов</strong> и <strong>расширенная</strong> <strong>совместимость с</strong> <strong>Vector Lakebase</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 Основные особенности<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Storage--Write-Path" class="common-anchor-header">🔹 <strong>Хранилище и путь записи</strong></h4><ul>
<li>Добавление <strong>переноса предикатов</strong> с обрезкой по индексу страниц и фильтру Блума на уровне хранилища.</li>
<li>Реализация <strong>дедупликации по первичному ключу</strong> при поступлении данных для предотвращения дубликатов при записи.</li>
</ul>
<h4 id="🔹-Compute--Elasticity" class="common-anchor-header">🔹 <strong>Вычисления и эластичность</strong></h4><ul>
<li>Поддержка <strong>пользовательских функций (UDF)</strong> для выполнения настраиваемой логики в движке на уровне обработки данных.</li>
<li>Включить <strong>разделение шардов</strong> для повторного разделения шардов по мере роста объема данных с поддержкой пользовательских ключей шардирования.</li>
</ul>
<h4 id="🔹-Spark--Vector-Lakebase-Expansion" class="common-anchor-header">🔹 <strong>Расширение</strong> <strong>Spark и</strong> <strong>Vector Lakebase</strong> </h4><ul>
<li>Расширить коннектор Spark за счет более обширной библиотеки <strong>нативных пакетных операторов</strong>.</li>
<li>Добавление возможностей <strong>работы с таблицами</strong>, включая перемещение во времени, эволюцию схемы и откат моментальных снимков.</li>
<li>Расширение возможностей взаимодействия Vector Lakebase за счет <strong>внешних индексов с оперативными данными (CDC)</strong>, поддержки Apache Paimon и дополнительных форматов данных.</li>
</ul>
<h2 id="🤝-Co-Building-the-Future-of-Milvus" class="common-anchor-header">🤝 Совместное создание будущего Milvus<button data-href="#🤝-Co-Building-the-Future-of-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus — это проект с открытым исходным кодом, развиваемый глобальным сообществом разработчиков. Мы приглашаем всех членов сообщества помочь в создании мультимодальной базы данных нового поколения:</p>
<ul>
<li><p>💬 <strong>Делитесь отзывами</strong>: предлагайте новые функции или идеи по оптимизации в <a href="https://github.com/milvus-io/milvus/discussions">разделах обсуждений на GitHub</a>.</p></li>
<li><p>🐛 <strong>Сообщайте о проблемах</strong>: регистрируйте ошибки через <a href="https://github.com/milvus-io/milvus/issues">GitHub Issues</a>.</p></li>
<li><p>🔧 <strong>Вносите свой вклад в код</strong>: отправляйте PR и помогайте разрабатывать основные функции.</p>
<ul>
<li><strong>Пулл-реквесты</strong>: вносите вклад непосредственно в наш <a href="https://github.com/milvus-io/milvus/pulls">исходный код</a>. Независимо от того, исправляете ли вы ошибки, добавляете функции или улучшаете документацию, ваши вклады приветствуются.</li>
<li><strong>Руководство по разработке</strong>: ознакомьтесь с нашим <a href="https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md">«Руководством для участников»</a>, чтобы узнать о правилах внесения изменений в код.</li>
</ul></li>
<li><p>🗣️ <strong>Присоединяйтесь к обсуждению</strong>: задавайте вопросы и общайтесь с разработчиками в <a href="https://milvus.io/discord">Discord</a>, на <a href="https://meetings.hubspot.com/chloe-williams1/milvus-meeting">«Приёмах Milvus</a>» или на <a href="https://milvus.io/community">всех каналах сообщества</a>.</p></li>
<li><p>⭐ <strong>Распространяйте информацию</strong>: делитесь передовым опытом и историями успеха, а также подписывайтесь на Milvus в <a href="https://twitter.com/milvusio">X</a>, <a href="https://www.linkedin.com/company/the-milvus-project/">LinkedIn</a> и <a href="https://www.youtube.com/c/MilvusVectorDatabase">YouTube</a>.</p></li>
</ul>
<p>👉 <strong>GitHub:</strong> <a href="https://github.com/milvus-io/milvus">milvus-io/milvus</a></p>
