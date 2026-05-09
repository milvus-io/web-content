---
id: roadmap.md
title: Дорожная карта Milvus
related_key: Milvus roadmap
summary: >-
  Milvus - это векторная база данных с открытым исходным кодом, созданная для
  работы приложений искусственного интеллекта. Вот наша дорожная карта, по
  которой мы будем развиваться.
---
<h1 id="Milvus-Roadmap" class="common-anchor-header">Дорожная карта Milvus<button data-href="#Milvus-Roadmap" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="common-anchor-header">🌌 На пути к мультимодальной базе данных и озеру данных нового поколения<button data-href="#🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Дорожная карта продукта Milvus</strong></p>
<p>Добро пожаловать в дорожную карту Milvus!</p>
<p>Мы вступаем в новую эру Milvus - мультимодальной базы данных следующего поколения, охватывающей <strong>структурированные и неструктурированные данные</strong>, <strong>поиск в реальном времени и автономную аналитику</strong>, <strong>производительность одного кластера и архитектуру глобального озера данных</strong>.</p>
<p>Эта дорожная карта описывает основные цели <strong>Milvus v2.6 (в процессе разработки)</strong>, <strong>Milvus v3.0 (запланирована на конец 2026 года)</strong> и <strong>Milvus v3.1 (долгосрочная разработка)</strong>, а также план развития <strong>Vector Lake (озеро данных / Loon)</strong>.</p>
<h2 id="🧩-Milvus-v26-In-Progress" class="common-anchor-header">Milvus v2.6 (в разработке)<button data-href="#🧩-Milvus-v26-In-Progress" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Сроки: Середина 2025 - конец 2025 гг.</strong></p>
<p>Фокус: <strong>Обновление модели данных</strong>, <strong>рефакторинг потоковой архитектуры</strong>, <strong>создание возможностей горячего/холодного тиринга</strong> и запуск <strong>прототипа Vector Lake (v0.1)</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 Основные моменты<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Data-Model-Upgrade" class="common-anchor-header">🔹 <strong>Обновление модели данных</strong></h4><ul>
<li><p>Внедрение унифицированного типа данных <strong>Tensor / StructList</strong> для поддержки многовекторных структур встраивания, что обеспечивает совместимость с <em>ColBERT</em>, <em>CoLQwen</em>, <em>видео</em> и <em>мультимодальными векторами</em>.</p></li>
<li><p>Добавлена поддержка <strong>геоданных</strong>, включая точки, регионы и пространственную индексацию (на основе <em>libspatial</em>), для расширения возможностей использования в LBS и GIS.</p></li>
<li><p>Поддержка <strong>Timestamp с</strong> типом данных <strong>Timezone</strong>.</p></li>
</ul>
<h4 id="🔹-StreamNode-Architecture-Refactor" class="common-anchor-header"><strong>🔹 Рефактор архитектуры StreamNode</strong></h4><ul>
<li><p>Переработка конвейера приема потоковых данных для оптимизации инкрементной записи и вычислений в реальном времени.</p></li>
<li><p>Значительно улучшена производительность и стабильность параллелизма, заложена основа для унифицированной обработки в реальном времени и в автономном режиме.</p></li>
<li><p>Внедрение нового механизма очередей сообщений: <strong>Woodpecker</strong>.</p></li>
</ul>
<h4 id="🔹-HotCold-Tiering--Storage-Architecture-StorageV2" class="common-anchor-header">🔹 <strong>Горячая/холодная многоуровневая архитектура и архитектура хранения данных (StorageV2)</strong></h4><ul>
<li><p>Поддержка двух форматов хранения данных: <strong>Parquet</strong> и <strong>Vortex</strong>, что повышает параллелизм и эффективность использования памяти.</p></li>
<li><p>Реализация многоуровневого хранения с автоматическим разделением горячих и холодных данных и интеллектуальным планированием.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-Prototype-v01" class="common-anchor-header">🔹 <strong>Прототип Vector Lake (v0.1)</strong></h4><ul>
<li><p>Интеграция со <strong>Spark</strong> / <strong>DuckDB</strong> / <strong>DataFusion</strong> через FFI, позволяющая осуществлять эволюцию схемы в автономном режиме и выполнять KNN-запросы.</p></li>
<li><p>Обеспечивает мультимодальную визуализацию данных и демонстрацию Spark ETL, создавая фундаментальную архитектуру озера данных.</p></li>
</ul>
<h2 id="🌠-Milvus-v30-Targeted-for-Early-2026" class="common-anchor-header">🌠 Milvus v3.0 (запланирован на начало 2026 года)<button data-href="#🌠-Milvus-v30-Targeted-for-Early-2026" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Сроки: Конец 2025 - начало 2026 гг.</strong></p>
<p>Основные направления: Всесторонние улучшения в <strong>области поиска</strong>, <strong>гибкости схем</strong> и <strong>поддержки неструктурированных данных</strong>, а также выпуск <strong>Vector Lake (v0.2)</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 Основные моменты<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Search-Experience-Overhaul" class="common-anchor-header"><strong>🔹 Пересмотр опыта поиска</strong></h4><ul>
<li><p>Внедрен поиск по сходству <strong>More Like This (MLT)</strong> с поддержкой поиска с позиционными или негативными примерами.</p></li>
<li><p>Добавлены возможности семантического поиска, такие как <strong>выделение</strong> и <strong>усиление</strong>.</p></li>
<li><p>Поддержка <strong>пользовательских словарей</strong> и <strong>таблиц синонимов</strong>, позволяющая определять лексические и семантические правила на уровне анализатора.</p></li>
<li><p>Внедрены возможности <strong>агрегирования</strong> для запросов.</p></li>
</ul>
<h4 id="🔹-Multi-Tenancy--Resource-Management" class="common-anchor-header">🔹 <strong>Многопользовательская аренда и управление ресурсами</strong></h4><ul>
<li><p>Обеспечение возможности удаления, статистики и "горячего" и "холодного" уровней для нескольких арендаторов.</p></li>
<li><p>Улучшение стратегий изоляции и планирования ресурсов для поддержки миллионов таблиц в одном кластере.</p></li>
</ul>
<h4 id="🔹-Schema--Primary-Key-Enhancements" class="common-anchor-header"><strong>🔹 Усовершенствования схем и первичных ключей</strong></h4><ul>
<li><p>Реализация <strong>глобального дедублирования первичных ключей (Global PK Dedup)</strong> для обеспечения согласованности и уникальности данных.</p></li>
<li><p>Поддержка <strong>гибкого управления схемой</strong> (добавление/удаление столбцов, резервное заполнение).</p></li>
<li><p>Разрешить <strong>значения NULL</strong> в векторных полях.</p></li>
</ul>
<h4 id="🔹-Expanded-Unstructured-Data-Types-BLOB--Text" class="common-anchor-header">🔹 <strong>Расширенные типы неструктурированных данных (BLOB / Text)</strong></h4><ul>
<li><p>Введен <strong>тип BLOB</strong>, который обеспечивает хранение и ссылки на бинарные данные, такие как файлы, изображения и видео.</p></li>
<li><p>Представлен <strong>тип TEXT</strong>, который обеспечивает расширенные возможности полнотекстового и контентного поиска.</p></li>
</ul>
<h4 id="🔹-Enterprise-Grade-Capabilities" class="common-anchor-header">🔹 <strong>Возможности корпоративного уровня</strong></h4><ul>
<li><p>Поддержка <strong>резервного копирования и восстановления на основе моментальных снимков</strong>.</p></li>
<li><p>Обеспечивает <strong>сквозную трассировку</strong> и <strong>ведение журнала аудита</strong>.</p></li>
<li><p>Реализация <strong>высокой доступности Active-Standby (HA)</strong> в многокластерных развертываниях.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-v02" class="common-anchor-header">🔹 <strong>Векторное озеро (v0.2)</strong></h4><ul>
<li><p>Поддержка <strong>хранения TEXT / BLOB</strong> и <strong>управление многоверсионными снимками</strong>.</p></li>
<li><p>Интеграция Spark для автономного индексирования, кластеризации, дедупликации и задач уменьшения размерности.</p></li>
<li><p><strong>Демонстрация холодных запросов ChatPDF и автономных бенчмарков</strong>.</p></li>
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
    </button></h2><p><strong>Сроки: Середина 2026 г.</strong></p>
<p>Фокус: <strong>Определяемые пользователем функции (UDF)</strong>, <strong>интеграция распределенных вычислений</strong>, <strong>оптимизация скалярных запросов</strong>, <strong>динамическое чередование</strong> и официальный выпуск <strong>Vector Lake (v1.0)</strong>.</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 Основные моменты<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-UDF--Distributed-Computing-Ecosystem" class="common-anchor-header">🔹 <strong>Экосистема UDF и распределенных вычислений</strong></h4><ul>
<li><p>Поддержка <strong>функций, определяемых пользователем (UDF)</strong>, что позволяет разработчикам внедрять пользовательскую логику в рабочие процессы поиска и вычислений.</p></li>
<li><p>Глубокая интеграция с <strong>Ray Dataset / Daft</strong> для распределенного выполнения UDF и мультимодальной обработки данных.</p></li>
</ul>
<h4 id="🔹-Scalar-Query--Local-Format-Evolution" class="common-anchor-header"><strong>🔹 Скалярные запросы и эволюция локальных форматов</strong></h4><ul>
<li><p>Оптимизация производительности фильтрации и агрегации для скалярных полей.</p></li>
<li><p>Улучшение оценки выражений и ускоренное выполнение индексов.</p></li>
<li><p>Поддержка <strong>обновлений in-place</strong> для локальных форматов файлов.</p></li>
</ul>
<h4 id="🔹-Advanced-Search-Capabilities" class="common-anchor-header">🔹 <strong>Расширенные возможности поиска</strong></h4><ul>
<li><p>Добавлены следующие функции: Запросы <strong>RankBy</strong>, <strong>OrderBy</strong>, <strong>Facet</strong> и <strong>Fuzzy match</strong>.</p></li>
<li><p>Усовершенствованный поиск текста с поддержкой:</p>
<ul>
<li><p><code translate="no">match_phrase_prefix</code></p></li>
<li><p><code translate="no">Completion Suggester</code></p></li>
<li><p><code translate="no">Term Suggester</code></p></li>
<li><p><code translate="no">Phrase Suggester</code></p></li>
</ul></li>
</ul>
<h4 id="🔹-Dynamic-Sharding--Scalability" class="common-anchor-header">🔹 <strong>Динамическое чередование и масштабируемость</strong></h4><ul>
<li><p><strong>Автоматическое разбиение на шарды</strong> и <strong>балансировка нагрузки</strong> для плавного масштабирования.</p></li>
<li><p>Улучшение <strong>построения глобального индекса</strong> и обеспечение <strong>производительности распределенного поиска</strong>.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-V10" class="common-anchor-header">🔹 <strong>Vector Lake V1.0</strong></h4><ul>
<li><p>Глубокая интеграция с <strong>Ray / Daft / PyTorch</strong> для поддержки распределенных UDF и контекстно-инженерных задач.</p></li>
<li><p><strong>Демонстрация RAG (Retrieval-Augmented Generation)</strong> <strong>и импорт из таблиц Iceberg</strong>.</p></li>
</ul>
<h2 id="🤝-Co-Building-the-Future-of-Milvus" class="common-anchor-header">🤝 Совместное построение будущего Milvus<button data-href="#🤝-Co-Building-the-Future-of-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus - это проект с открытым исходным кодом, управляемый глобальным сообществом разработчиков.</p>
<p>Мы приглашаем всех участников сообщества принять участие в создании мультимодальной базы данных следующего поколения:</p>
<ul>
<li><p><strong>💬 Делитесь отзывами</strong>: Предлагайте новые функции или идеи по оптимизации</p></li>
<li><p>🐛 <strong>Сообщайте о проблемах</strong>: Сообщайте об ошибках через GitHub Issues</p></li>
<li><p>🔧 <strong>Вносить код</strong>: Отправляйте PR и помогайте создавать основные функции</p>
<ul>
<li><p><strong>Pull requests</strong>: Вносите свой вклад непосредственно в нашу <a href="https://github.com/milvus-io/milvus/pulls">кодовую базу</a>. Будь то исправление ошибок, добавление функций или улучшение документации, ваш вклад приветствуется.</p></li>
<li><p><strong>Руководство по разработке</strong>: Ознакомьтесь с нашим <a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">руководством для разработчиков</a>, чтобы узнать о правилах внесения вклада в код.</p></li>
</ul></li>
<li><p><strong>⭐ Распространяйте информацию</strong>: делитесь передовым опытом и историями успеха.</p></li>
</ul>
<p>👉 <strong>GitHub:</strong> <a href="https://github.com/milvus-io/milvus">milvus-io/milvus</a></p>
