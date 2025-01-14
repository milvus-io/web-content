---
id: migrate_overview.md
summary: >-
  В этой статье представлен обзор инструмента Milvus-migration, включая
  поддерживаемые миграции, функции и архитектуру.
title: Обзор миграции Milvus
---
<h1 id="Milvus-Migration-Overview" class="common-anchor-header">Обзор миграции Milvus<button data-href="#Milvus-Migration-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Учитывая разнообразные потребности пользователей, Milvus расширил свои инструменты миграции, чтобы не только облегчить обновление с более ранних версий Milvus 1.x, но и обеспечить бесшовную интеграцию данных из других систем, таких как <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/elasticsearch-intro.html">Elasticsearch</a> и <a href="https://github.com/facebookresearch/faiss">Faiss</a>. Проект <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> призван преодолеть разрыв между этими разнообразными средами данных и последними достижениями в технологии Milvus, обеспечивая беспрепятственное использование улучшенных функций и производительности.</p>
<h2 id="Supported-migrations" class="common-anchor-header">Поддерживаемые миграции<button data-href="#Supported-migrations" class="anchor-icon" translate="no">
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
    </button></h2><p>Инструмент <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> поддерживает различные пути миграции для удовлетворения различных потребностей пользователей:</p>
<ul>
<li><a href="/docs/ru/es2m.md">Elasticsearch на Milvus 2.x</a>: Позволяет пользователям переносить данные из сред Elasticsearch, чтобы воспользоваться преимуществами оптимизированного векторного поиска Milvus.</li>
<li><a href="/docs/ru/f2m.md">Faiss - Milvus 2.x</a>: Предоставление экспериментальной поддержки для переноса данных из Faiss, популярной библиотеки для эффективного поиска по сходству.</li>
<li><a href="/docs/ru/m2m.md">Milvus 1.x - Milvus 2.x</a>: Обеспечение плавного перехода данных из предыдущих версий на новейший фреймворк.</li>
<li><a href="/docs/ru/from-m2x.md">Milvus 2.3.x - Milvus 2.3.x или выше</a>: Одноразовый переход для пользователей, которые уже перешли на 2.3.x.</li>
</ul>
<h2 id="Features" class="common-anchor-header">Особенности<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus-migration обладает надежными функциями, позволяющими справиться с различными сценариями миграции:</p>
<ul>
<li>Несколько методов взаимодействия: Вы можете выполнять миграцию через интерфейс командной строки или через Restful API, гибко настраивая способ выполнения миграции.</li>
<li>Поддержка различных форматов файлов и облачных хранилищ: Инструмент <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> может работать с данными, хранящимися как в локальных файлах, так и в облачных хранилищах, таких как S3, OSS и GCP, что обеспечивает широкую совместимость.</li>
<li>Работа с типами данных: <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> способен работать как с векторными данными, так и со скалярными полями, что делает его универсальным выбором для решения различных задач миграции данных.</li>
</ul>
<h2 id="Architecture" class="common-anchor-header">Архитектура<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>Архитектура <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> стратегически продумана таким образом, чтобы обеспечить эффективные процессы потоковой передачи, разбора и записи данных, что позволяет осуществлять надежную миграцию данных из различных источников.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/milvus-migration-architecture.jpeg" alt="Milvus-migration architecture" class="doc-image" id="milvus-migration-architecture" />
   </span> <span class="img-wrapper"> <span>Архитектура Milvus-migration</span> </span></p>
<p>На предыдущем рисунке:</p>
<ul>
<li><strong>Источник данных</strong>: <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a> поддерживает различные источники данных, включая Elasticsearch через <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/scroll-api.html">API прокрутки</a>, локальные или облачные файлы данных, а также базы данных Milvus 1.x. Доступ к ним и их чтение осуществляются в упрощенном порядке, чтобы запустить процесс миграции.</li>
<li><strong>Потоковый конвейер</strong>:<ul>
<li><strong>Процесс разбора</strong>: Данные из источников анализируются в соответствии с их форматом. Например, для источника данных из Elasticsearch используется парсер формата Elasticsearch, а для других форматов - соответствующие парсеры. Этот шаг очень важен для преобразования сырых данных в структурированный формат, который может быть подвергнут дальнейшей обработке.</li>
<li><strong>Процесс преобразования</strong>: После парсинга данные подвергаются преобразованию, в ходе которого поля фильтруются, типы данных преобразуются, а имена таблиц корректируются в соответствии с целевой схемой Milvus 2.x. Это гарантирует, что данные соответствуют ожидаемой структуре и типам в Milvus.</li>
</ul></li>
<li><strong>Запись и загрузка данных</strong>:<ul>
<li><strong>Запись данных</strong>: Обработанные данные записываются в промежуточные файлы JSON или NumPy, готовые к загрузке в Milvus 2.x.</li>
<li><strong>Загрузка данных</strong>: Данные окончательно загружаются в Milvus 2.x с помощью операции <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">BulkInsert</a>, которая эффективно записывает большие объемы данных в системы хранения Milvus, облачные или файловые хранилища.</li>
</ul></li>
</ul>
<h2 id="Future-plans" class="common-anchor-header">Планы на будущее<button data-href="#Future-plans" class="anchor-icon" translate="no">
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
    </button></h2><p>Команда разработчиков стремится усовершенствовать <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a>, добавив в него такие функции, как:</p>
<ul>
<li><strong>Поддержка большего количества источников данных</strong>: Планируется расширить поддержку дополнительных баз данных и файловых систем, таких как Pinecone, Chroma, Qdrant. Если вам нужна поддержка конкретного источника данных, пожалуйста, отправьте запрос через эту <a href="https://github.com/zilliztech/milvus-migration/issues">ссылку на GitHub</a>.</li>
<li><strong>Упрощение команд</strong>: Усилия по упрощению процесса выполнения команд для более легкого выполнения.</li>
<li><strong>Парсер</strong> / <strong>преобразование</strong><strong>SPI</strong>: В архитектуру предполагается включить инструменты интерфейса поставщика услуг (SPI) для парсинга и конвертации. Эти инструменты позволяют создавать пользовательские реализации, которые пользователи могут подключать к процессу миграции для обработки определенных форматов данных или правил преобразования.</li>
<li><strong>Возобновление контрольных точек</strong>: Позволяет возобновлять миграцию с последней контрольной точки для повышения надежности и эффективности в случае перерывов в работе. Точки сохранения создаются для обеспечения целостности данных и хранятся в базах данных, таких как SQLite или MySQL, для отслеживания хода процесса миграции.</li>
</ul>
