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
<p>Добро пожаловать в раздел «Дорожная карта Milvus»!</p>
<p>Мы вступаем с Milvus в новую эру — эру мультимодальных баз данных нового поколения, охватывающих <strong>как структурированные, так и неструктурированные данные</strong>, <strong>от поиска в реальном времени до офлайн-аналитики</strong>, а также <strong>от производительности одного кластера до архитектуры глобального озера данных</strong>.</p>
<p>В этой дорожной карте изложены основные цели для <strong>Milvus v2.6 (в разработке)</strong>, <strong>Milvus v3.0 (запуск запланирован на конец 2026 года)</strong> и <strong>Milvus v3.1 (долгосрочная разработка)</strong>, а также план развития <strong>Vector Lake (озеро данных / Loon)</strong>.</p>
<h2 id="🧩-Milvus-v26-In-Progress" class="common-anchor-header">🧩 Milvus v2.6 (в разработке)<button data-href="#🧩-Milvus-v26-In-Progress" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Сроки: середина 2025 г. – конец 2025 г.</strong></p>
<p>Основные направления: <strong>модернизация модели данных</strong>, <strong>рефакторинг архитектуры потоковой обработки</strong>, <strong>реализация возможностей многоуровневого хранения данных (hot/cold</strong>) и запуск <strong>прототипа Vector Lake (v0.1)</strong>.</p>
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
    </button></h3><h4 id="🔹-Data-Model-Upgrade" class="common-anchor-header">🔹 <strong>Модернизация модели данных</strong></h4><ul>
<li><p>Внедрение унифицированного типа данных <strong>Tensor / StructList</strong> для поддержки структур вложения с несколькими векторами, что обеспечит совместимость с <em>ColBERT</em>, <em>CoLQwen</em>, <em>видео</em> и <em>мультимодальными векторами</em>.</p></li>
<li><p>Добавлена поддержка <strong>геоданных</strong>, включая точки, регионы и пространственную индексацию (на основе <em>libspatial</em>), для расширения сценариев использования в LBS и ГИС.</p></li>
<li><p>Поддержка типа данных <strong>«Timestamp with Timezone</strong> ».</p></li>
</ul>
<h4 id="🔹-StreamNode-Architecture-Refactor" class="common-anchor-header">🔹 <strong>Рефакторинг архитектуры StreamNode</strong></h4><ul>
<li><p>Переписан конвейер потокового поступления данных для оптимизации инкрементальной записи и вычислений в реальном времени.</p></li>
<li><p>Значительное повышение производительности и стабильности при параллельном выполнении задач, что закладывает основу для унифицированной обработки данных в режиме реального времени и в автономном режиме.</p></li>
<li><p>Внедрение нового движка очередей сообщений: <strong>Woodpecker</strong>.</p></li>
</ul>
<h4 id="🔹-HotCold-Tiering--Storage-Architecture-StorageV2" class="common-anchor-header">🔹 <strong>Многоуровневое хранение (hot/cold) и архитектура хранилища (StorageV2)</strong></h4><ul>
<li><p>Поддержка двух форматов хранения: <strong>Parquet</strong> и <strong>Vortex</strong>, что повышает производительность при параллельной обработке и эффективность использования памяти.</p></li>
<li><p>Реализовать многоуровневое хранение с автоматическим разделением «горячих» и «холодных» данных и интеллектуальным планированием.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-Prototype-v01" class="common-anchor-header">🔹 <strong>Прототип Vector Lake (v0.1)</strong></h4><ul>
<li><p>Интеграция со <strong>Spark</strong> / <strong>DuckDB</strong> / <strong>DataFusion</strong> через FFI, что обеспечивает возможность изменения схемы в автономном режиме и выполнение запросов KNN.</p></li>
<li><p>Обеспечение мультимодальной визуализации данных и демонстрации ETL-процесса на Spark, что закладывает основу для архитектуры озера данных.</p></li>
</ul>
<h2 id="🌠-Milvus-v30-Targeted-for-Early-2026" class="common-anchor-header">🌠 Milvus v3.0 (запланировано на начало 2026 года)<button data-href="#🌠-Milvus-v30-Targeted-for-Early-2026" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Сроки: конец 2025 — начало 2026 года</strong></p>
<p>Основные направления: комплексные улучшения в <strong>области поиска</strong>, <strong>гибкости схем</strong> и <strong>поддержки неструктурированных данных</strong>, а также выпуск <strong>Vector Lake (v0.2)</strong>.</p>
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
    </button></h3><h4 id="🔹-Search-Experience-Overhaul" class="common-anchor-header">🔹 <strong>Кардинальная переработка системы поиска</strong></h4><ul>
<li><p>Внедрение поиска по сходству <strong>«Подобные результаты» (MLT)</strong> с поддержкой поиска по позиции или с использованием отрицательных примеров.</p></li>
<li><p>Добавление возможностей семантического поиска, таких как <strong>выделение</strong> и <strong>повышение</strong> релевантности.</p></li>
<li><p>Поддержка <strong>пользовательских словарей</strong> и <strong>таблиц синонимов</strong>, позволяющая определять лексические и семантические правила на уровне анализатора.</p></li>
<li><p>Внедрение возможностей <strong>агрегации</strong> для запросов.</p></li>
</ul>
<h4 id="🔹-Multi-Tenancy--Resource-Management" class="common-anchor-header">🔹 <strong>Многоарендаторность и управление ресурсами</strong></h4><ul>
<li><p>Обеспечить возможность удаления данных в многопользовательской среде, сбор статистики и разделение данных на «горячий» и «холодный» уровни.</p></li>
<li><p>Улучшить изоляцию ресурсов и стратегии планирования для поддержки миллионов таблиц в одном кластере.</p></li>
</ul>
<h4 id="🔹-Schema--Primary-Key-Enhancements" class="common-anchor-header">🔹 <strong>Улучшения схемы и первичного ключа</strong></h4><ul>
<li><p>Реализовать <strong>глобальную дедупликацию первичных ключей (Global PK Dedup)</strong> для обеспечения согласованности и уникальности данных.</p></li>
<li><p>Поддержка <strong>гибкого управления схемами</strong> (добавление/удаление столбцов, заполнение резервных копий).</p></li>
<li><p>Разрешить <strong>значения NULL</strong> в векторных полях.</p></li>
</ul>
<h4 id="🔹-Expanded-Unstructured-Data-Types-BLOB--Text" class="common-anchor-header">🔹 <strong>Расширение типов неструктурированных данных (BLOB / Text)</strong></h4><ul>
<li><p>Внедрить <strong>тип BLOB</strong>, который обеспечивает встроенное хранение и ссылки на двоичные данные, такие как файлы, изображения и видео.</p></li>
<li><p>Внедрить <strong>тип TEXT</strong>, который обеспечивает расширенные возможности полнотекстового поиска и поиска по содержанию.</p></li>
</ul>
<h4 id="🔹-Enterprise-Grade-Capabilities" class="common-anchor-header">🔹 <strong>Возможности корпоративного уровня</strong></h4><ul>
<li><p>Поддержка <strong>резервного копирования и восстановления на основе моментальных снимков</strong>.</p></li>
<li><p>Обеспечение <strong>сквозного отслеживания</strong> и <strong>ведения журналов аудита</strong>.</p></li>
<li><p>Реализована <strong>высокая доступность (HA) в режиме «активный-резервный»</strong> в многокластерных развертываниях.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-v02" class="common-anchor-header">🔹 <strong>Vector Lake (v0.2)</strong></h4><ul>
<li><p>Поддержка <strong>хранения TEXT / BLOB</strong> и <strong>управления многоверсионными моментальными снимками</strong>.</p></li>
<li><p>Интеграция Spark для выполнения задач автономной индексации, кластеризации, дедупликации и снижения размерности.</p></li>
<li><p>Проведение <strong>демонстраций холодных запросов и автономных тестов производительности ChatPDF</strong>.</p></li>
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
    </button></h2><p><strong>Сроки: середина 2026 года</strong></p>
<p>Приоритеты: <strong>пользовательские функции (UDF)</strong>, <strong>интеграция распределенных вычислений</strong>, <strong>оптимизация скалярных запросов</strong>, <strong>динамический шардинг</strong> и официальный релиз <strong>Vector Lake (v1.0)</strong>.</p>
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
<li><p>Поддержка <strong>пользовательских функций (UDF)</strong>, позволяющая разработчикам внедрять собственную логику в рабочие процессы извлечения и вычислений.</p></li>
<li><p>Глубокая интеграция с <strong>Ray Dataset / Daft</strong> для распределенного выполнения UDF и обработки мультимодальных данных.</p></li>
</ul>
<h4 id="🔹-Scalar-Query--Local-Format-Evolution" class="common-anchor-header">🔹 <strong>Скалярные запросы и развитие локальных форматов</strong></h4><ul>
<li><p>Оптимизация производительности фильтрации и агрегации для скалярных полей.</p></li>
<li><p>Улучшение вычисления выражений и ускорение выполнения за счет использования индексов.</p></li>
<li><p>Поддержка <strong>обновлений на месте</strong> для локальных форматов файлов.</p></li>
</ul>
<h4 id="🔹-Advanced-Search-Capabilities" class="common-anchor-header">🔹 <strong>Расширенные возможности поиска</strong></h4><ul>
<li><p>Добавление следующих функций: запросы <strong>RankBy</strong>, <strong>OrderBy</strong>, <strong>Facet</strong> и запросы <strong>с неточным совпадением</strong>.</p></li>
<li><p>Улучшение поиска текста за счет поддержки:</p>
<ul>
<li><p><code translate="no">match_phrase_prefix</code></p></li>
<li><p><code translate="no">Completion Suggester</code></p></li>
<li><p><code translate="no">Term Suggester</code></p></li>
<li><p><code translate="no">Phrase Suggester</code></p></li>
</ul></li>
</ul>
<h4 id="🔹-Dynamic-Sharding--Scalability" class="common-anchor-header">🔹 <strong>Динамическое разбиение на шарды и масштабируемость</strong></h4><ul>
<li><p>Включить <strong>автоматическое разделение шардов</strong> и <strong>балансировку нагрузки</strong> для плавного масштабирования.</p></li>
<li><p>Улучшить <strong>построение глобального индекса</strong> и обеспечить <strong>производительность распределенного поиска</strong>.</p></li>
</ul>
<h4 id="🔹-Vector-Lake-V10" class="common-anchor-header">🔹 <strong>Vector Lake V1.0</strong></h4><ul>
<li><p>Глубокая интеграция с <strong>Ray / Daft / PyTorch</strong> для поддержки распределенных пользовательских функций (UDF) и сценариев использования Context Engineering.</p></li>
<li><p>Предоставьте <strong>демонстрации RAG (Retrieval-Augmented Generation)</strong> <strong>и возможность импорта из таблиц Iceberg</strong>.</p></li>
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
    </button></h2><p>Milvus — это проект с открытым исходным кодом, развиваемый глобальным сообществом разработчиков.</p>
<p>Мы сердечно приглашаем всех членов сообщества помочь в создании мультимодальной базы данных нового поколения:</p>
<ul>
<li><p>💬 <strong>Делитесь отзывами</strong>: предлагайте новые функции или идеи по оптимизации</p></li>
<li><p>🐛 <strong>Сообщайте о проблемах</strong>: регистрируйте ошибки через GitHub Issues</p></li>
<li><p>🔧 <strong>Вносите свой вклад в код</strong>: отправляйте PR и помогайте разрабатывать основные функции</p>
<ul>
<li><p><strong>Pull-реквесты</strong>: вносите вклад непосредственно в наш <a href="https://github.com/milvus-io/milvus/pulls">исходный код</a>. Будь то исправление ошибок, добавление функций или улучшение документации — мы рады любому вашему вкладу.</p></li>
<li><p><strong>Руководство по разработке</strong>: ознакомьтесь с нашим <a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">Руководством для участников</a>, чтобы узнать о правилах внесения вклада в код.</p></li>
</ul></li>
<li><p>⭐ <strong>Распространяйте информацию</strong>: делитесь передовым опытом и историями успеха</p></li>
</ul>
<p>👉 <strong>GitHub:</strong> <a href="https://github.com/milvus-io/milvus">milvus-io/milvus</a></p>
