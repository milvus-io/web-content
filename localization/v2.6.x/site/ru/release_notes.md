---
id: release_notes.md
summary: Информация о выпуске Milvus
title: Информация о выпуске
---
<h1 id="Release-Notes" class="common-anchor-header">Информация о выпуске<button data-href="#Release-Notes" class="anchor-icon" translate="no">
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
    </button></h1><p>Узнайте, что нового появилось в Milvus! На этой странице собраны новые возможности, улучшения, известные проблемы и исправления ошибок в каждом выпуске. В этом разделе вы найдете примечания к выпуску для каждой версии после v2.6.0. Мы рекомендуем вам регулярно посещать эту страницу, чтобы узнавать об обновлениях.</p>
<h2 id="v264" class="common-anchor-header">v2.6.4<button data-href="#v264" class="anchor-icon" translate="no">
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
    </button></h2><p>Дата выхода: 21 октября 2025 г.</p>
<table>
<thead>
<tr><th style="text-align:left">Версия Milvus</th><th style="text-align:left">Версия Python SDK</th><th style="text-align:left">Node.js SDK Версия</th><th style="text-align:left">Java SDK Версия</th><th style="text-align:left">Go SDK Версия</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.6</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Мы рады объявить о выпуске Milvus 2.6.4, содержащего ряд новых мощных возможностей, улучшений производительности и исправлений существенных ошибок. В этом обновлении представлены такие важные функции, как Struct в ARRAY для расширенного моделирования данных. Кроме того, мы включили функцию измельчения JSON по умолчанию, что еще больше повышает производительность и эффективность запросов. Также было исправлено несколько критических ошибок для обеспечения большей стабильности и надежности. В этом выпуске Milvus продолжает обеспечивать более надежную и эффективную работу для всех пользователей. Ниже приведены основные моменты этого выпуска.</p>
<h3 id="Features" class="common-anchor-header">Особенности<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Struct в ARRAY: Milvus представил новый тип данных, Struct, позволяющий пользователям организовывать и управлять несколькими связанными полями в рамках одной сущности. В настоящее время Struct можно использовать только как элемент в DataType.ARRAY, что позволяет использовать такие функции, как массив векторов, где каждая строка содержит несколько векторов, открывая новые возможности для сложного моделирования данных и поиска.<a href="https://github.com/milvus-io/milvus/pull/42148">(#42148</a>)</li>
<li>Поддержка модели Qwen GTE-rerank-v2 в DashScope<a href="https://github.com/milvus-io/milvus/pull/44660">(#44660</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Улучшения<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong>Обновлена версия Go до 1.24.6</strong> с функцией построения изображений<a href="https://github.com/milvus-io/milvus/pull/44763">(#44763</a>)</li>
<li>Включено измельчение JSON по умолчанию<a href="https://github.com/milvus-io/milvus/pull/44811">(#44811</a>)</li>
<li>Добавлена дисковая квота для размера загружаемого бинлога для предотвращения сбоев при загрузке узла запросов<a href="https://github.com/milvus-io/milvus/pull/44932">(#44932</a>)</li>
<li>Включена поддержка mmap для массива struct в MemVectorIndex<a href="https://github.com/milvus-io/milvus/pull/44832">(#44832</a>)</li>
<li>Добавлено управление слоем кэширования для TextMatchIndex<a href="https://github.com/milvus-io/milvus/pull/44768">(#44768</a>)</li>
<li>Оптимизирована производительность обратного поиска растровых изображений (<a href="https://github.com/milvus-io/milvus/pull/44838">#44838</a>)</li>
<li>Обновлена версия Knowhere<a href="https://github.com/milvus-io/milvus/pull/44707">(#44707</a> <a href="https://github.com/milvus-io/milvus/pull/44765">#44765</a>)</li>
<li>Убраны проверки использования логики при загрузке сегмента<a href="https://github.com/milvus-io/milvus/pull/44770">(#44770</a>)</li>
<li>Добавлено поле журнала доступа для информации о длине значения шаблона<a href="https://github.com/milvus-io/milvus/pull/44783">(#44783</a>)</li>
<li>Разрешено перезаписывать текущий тип индекса при построении индекса<a href="https://github.com/milvus-io/milvus/pull/44754">(#44754</a>)</li>
<li>Добавлены параметры загрузки для векторного индекса<a href="https://github.com/milvus-io/milvus/pull/44749">(#44749</a>)</li>
<li>Унифицировано управление состоянием задач исполнителя уплотнения<a href="https://github.com/milvus-io/milvus/pull/44722">(#44722</a>)</li>
<li>Добавлены уточненные журналы для планировщика задач в QueryCoord<a href="https://github.com/milvus-io/milvus/pull/44725">(#44725</a>)</li>
<li>Убедились, что accesslog.$consistency_level отражает реальное используемое значение (<a href="https://github.com/milvus-io/milvus/pull/44711">#44711</a>)</li>
<li>Удален избыточный менеджер каналов из datacoord<a href="https://github.com/milvus-io/milvus/pull/44679">(#44679</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Исправления ошибок<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Удален GCC из сборки Dockerfile для исправления CVE<a href="https://github.com/milvus-io/milvus/pull/44882">(#44882</a>)</li>
<li>Обеспечено детерминированное упорядочивание результатов поиска при равных оценках<a href="https://github.com/milvus-io/milvus/pull/44884">(#44884</a>)</li>
<li>Ранжирование перед запросом, если ранжировщик не использовал данные полей<a href="https://github.com/milvus-io/milvus/pull/44943">(#44943</a>)</li>
<li>Обеспечено выполнение обещаний, когда CreateArrowFileSystem выбрасывает исключение<a href="https://github.com/milvus-io/milvus/pull/44976">(#44976</a>)</li>
<li>Исправлен недостающий конфиг шифрования диска<a href="https://github.com/milvus-io/milvus/pull/44839">(#44839</a>)</li>
<li>Исправлено отключение проверки баланса, вызывающее проблему остановки баланса<a href="https://github.com/milvus-io/milvus/pull/44836">(#44836</a>)</li>
<li>Исправлена проблема, когда "не равно" не включало "none"<a href="https://github.com/milvus-io/milvus/pull/44960">(#44960</a>)</li>
<li>Поддержка JSON-значения по умолчанию в CreateArrowScalarFromDefaultValue<a href="https://github.com/milvus-io/milvus/pull/44952">(#44952</a>)</li>
<li>Использование короткой строки отладки, чтобы избежать новых строк в журналах отладки<a href="https://github.com/milvus-io/milvus/pull/44929">(#44929</a>)</li>
<li>Исправлено выражение exists для плоского индекса JSON<a href="https://github.com/milvus-io/milvus/pull/44951">(#44951</a>)</li>
<li>Унифицирована семантика пути существования в JSON<a href="https://github.com/milvus-io/milvus/pull/44926">(#44926</a>)</li>
<li>Исправлена паника, вызванная пустым сообщением о внутренней вставке<a href="https://github.com/milvus-io/milvus/pull/44906">(#44906</a>)</li>
<li>Обновлены параметры AI/SAQ<a href="https://github.com/milvus-io/milvus/pull/44862">(#44862</a>)</li>
<li>Устранено ограничение на дедупликацию при отключенном автоиндексе<a href="https://github.com/milvus-io/milvus/pull/44824">(#44824</a>)</li>
<li>Избежание одновременных операций сброса/добавления метрик DataCoord<a href="https://github.com/milvus-io/milvus/pull/44815">(#44815</a>)</li>
<li>Исправлена ошибка в JSON_contains(path, int)<a href="https://github.com/milvus-io/milvus/pull/44818">(#44818</a>)</li>
<li>Предотвращено вытеснение в слое кэширования при работе с JSON<a href="https://github.com/milvus-io/milvus/pull/44813">(#44813</a>)</li>
<li>Исправлены неверные результаты фильтра exp при пропуске<a href="https://github.com/milvus-io/milvus/pull/44779">(#44779</a>)</li>
<li>Проверяется, является ли узел запроса SQN с меткой и списком потоковых узлов<a href="https://github.com/milvus-io/milvus/pull/44793">(#44793</a>)</li>
<li>Исправлена ошибка BM25 с возвратом неупорядоченных результатов в boost<a href="https://github.com/milvus-io/milvus/pull/44759">(#44759</a>)</li>
<li>Исправлен массовый импорт с автоматическим определением ID<a href="https://github.com/milvus-io/milvus/pull/44694">(#44694</a>)</li>
<li>Передача файловой системы через FileManagerContext при загрузке индекса<a href="https://github.com/milvus-io/milvus/pull/44734">(#44734</a>)</li>
<li>Использование "eventually" и исправление появления ID задачи как в состоянии выполнения, так и в состоянии завершения<a href="https://github.com/milvus-io/milvus/pull/44715">(#44715</a>)</li>
<li>Убрана некорректная галочка времени начала, чтобы избежать фильтрации DML с таймсеками меньше нее<a href="https://github.com/milvus-io/milvus/pull/44692">(#44692</a>)</li>
<li>Сделали провайдера учетных данных AWS синглтоном<a href="https://github.com/milvus-io/milvus/pull/44705">(#44705</a>)</li>
<li>Отключено измельчение для JSON-путей, содержащих цифры<a href="https://github.com/milvus-io/milvus/pull/44808">(#44808</a>)</li>
<li>Исправлен валидный юнит-тест для TestUnaryRangeJsonNullable<a href="https://github.com/milvus-io/milvus/pull/44990">(#44990</a>)</li>
<li>Исправлены модульные тесты и удалена логика отката файловой системы<a href="https://github.com/milvus-io/milvus/pull/44686">(#44686</a>)</li>
</ul>
<h2 id="v263" class="common-anchor-header">v2.6.3<button data-href="#v263" class="anchor-icon" translate="no">
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
    </button></h2><p>Дата выпуска: 11 октября 2025 г.</p>
<table>
<thead>
<tr><th style="text-align:left">Версия Milvus</th><th style="text-align:left">Версия Python SDK</th><th style="text-align:left">Node.js SDK Версия</th><th style="text-align:left">Java SDK Версия</th><th style="text-align:left">Go SDK Версия</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.5</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Мы рады сообщить о выходе версии Milvus 2.6.3, в которой появилось множество новых интересных функций, улучшений и исправлений критических ошибок. Эта версия повышает производительность системы, расширяет функциональность и исправляет ключевые проблемы, обеспечивая более стабильную работу для всех пользователей. Ниже приведены основные моменты этого выпуска:</p>
<h3 id="New-Features" class="common-anchor-header">Новые возможности<button data-href="#New-Features" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Первичный ключ с включенным автоидентификатором: Пользователи теперь могут записывать поле первичного ключа, когда включена функция <code translate="no">autoid</code>.<a href="https://github.com/milvus-io/milvus/pull/44424">(#44424</a> <a href="https://github.com/milvus-io/milvus/pull/44530">#44530</a>)</li>
<li>Ручное уплотнение для сегментов L0: Добавлена поддержка ручного уплотнения сегментов L0.<a href="https://github.com/milvus-io/milvus/pull/44440">(#44440</a>)</li>
<li>Кодировка ID кластера в AutoID: Автоматически генерируемые ID теперь будут включать ID кластера.<a href="https://github.com/milvus-io/milvus/pull/44471">(#44471</a>)</li>
<li>Поддержка токенизатора gRPC: Интеграция токенизатора gRPC для повышения гибкости запросов.<a href="https://github.com/milvus-io/milvus/pull/41994">(#41994</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Улучшения<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Усовершенствована система проверки баланса путем внедрения очереди приоритетов, что улучшает распределение задач.<a href="https://github.com/milvus-io/milvus/pull/43992">(#43992</a>)</li>
<li>Предварительная загрузка статистики BM25 для запечатанных сегментов и оптимизированная сериализация.<a href="https://github.com/milvus-io/milvus/pull/44279">(#44279</a>)</li>
<li>Нулевые поля теперь могут быть использованы в качестве входных данных для функций BM25.<a href="https://github.com/milvus-io/milvus/pull/44586">(#44586</a>)</li>
<li>Добавлена поддержка Azure Blob Storage в Woodpecker.<a href="https://github.com/milvus-io/milvus/pull/44592">(#44592</a>)</li>
<li>Очистка маленьких файлов сразу после уплотнения сегментов Woodpecker.<a href="https://github.com/milvus-io/milvus/pull/44473">(#44473</a>)</li>
<li>Включена функция случайных баллов для повышающих запросов.<a href="https://github.com/milvus-io/milvus/pull/44214">(#44214</a>)</li>
<li>Новые параметры конфигурации для типа вектора <code translate="no">int8</code> в автоиндексации.<a href="https://github.com/milvus-io/milvus/pull/44554">(#44554</a>)</li>
<li>Добавлены параметры для управления политикой повторных запросов в гибридном поиске.<a href="https://github.com/milvus-io/milvus/pull/44466">(#44466</a>)</li>
<li>Добавлена поддержка управления вставкой полей вывода функций.<a href="https://github.com/milvus-io/milvus/pull/44162">(#44162</a>)</li>
<li>Функция decay теперь поддерживает настраиваемое объединение баллов для повышения производительности.<a href="https://github.com/milvus-io/milvus/pull/44066">(#44066</a>)</li>
<li>Улучшена производительность двоичного поиска в строках.<a href="https://github.com/milvus-io/milvus/pull/44469">(#44469</a>)</li>
<li>Добавлена поддержка разреженных фильтров в запросах. <a href="https://github.com/milvus-io/milvus/pull/44347">(#44347</a>)</li>
<li>Различные обновления для улучшения функциональности многоуровневых индексов.<a href="https://github.com/milvus-io/milvus/pull/44433">(#44433</a>)</li>
<li>Добавлено отслеживание использования ресурсов хранения для скалярного и векторного поиска.<a href="https://github.com/milvus-io/milvus/pull/44414">(#44414</a> <a href="https://github.com/milvus-io/milvus/pull/44308">#44308</a>)</li>
<li>Добавлено использование ресурсов хранения для delete/upsert/restful<a href="https://github.com/milvus-io/milvus/pull/44512">(#44512</a>)</li>
<li>Включены гранулярные цели flush для операций <code translate="no">flushall</code>.<a href="https://github.com/milvus-io/milvus/pull/44234">(#44234</a>)</li>
<li>Датаноды теперь используют файловую систему без синглтонов для лучшего управления ресурсами.<a href="https://github.com/milvus-io/milvus/pull/44418">(#44418</a>)</li>
<li>Добавлены опции конфигурации для пакетной обработки в метаданных. <a href="https://github.com/milvus-io/milvus/pull/44645">(#44645</a>)</li>
<li>Сообщения об ошибках теперь включают имя базы данных для большей ясности.<a href="https://github.com/milvus-io/milvus/pull/44618">(#44618</a>)</li>
<li>Перемещен тест трассировки в репозиторий <code translate="no">milvus-common</code> для лучшей модульности.<a href="https://github.com/milvus-io/milvus/pull/44605">(#44605</a>)</li>
<li>Перемещены файлы юнит-тестов C API в каталог <code translate="no">src</code> для лучшей организации.<a href="https://github.com/milvus-io/milvus/pull/44458">(#44458</a>)</li>
<li>Go SDK теперь позволяет пользователям вставлять данные первичного ключа, если включен <code translate="no">autoid</code>.<a href="https://github.com/milvus-io/milvus/pull/44561">(#44561</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Исправления ошибок<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Устранены уязвимости CVE-2020-25576 и WS-2023-0223.<a href="https://github.com/milvus-io/milvus/pull/44163">(#44163</a>)</li>
<li>Исправлена проблема, при которой логические ресурсы использовались для метрик в центре квот на потоковых узлах.<a href="https://github.com/milvus-io/milvus/pull/44613">(#44613</a>)</li>
<li>Установите <code translate="no">mixcoord</code> в <code translate="no">activatefunc</code> при включении режима ожидания.<a href="https://github.com/milvus-io/milvus/pull/44621">(#44621</a>)</li>
<li>Устранена избыточная инициализация компонентов хранилища V2. <a href="https://github.com/milvus-io/milvus/pull/44597">#44597</a>)</li>
<li>Исправлена блокировка задачи уплотнения из-за выхода из цикла исполнителя.<a href="https://github.com/milvus-io/milvus/pull/44543">(#44543</a>)</li>
<li>Устранено использование загруженных ресурсов в деструкторе <code translate="no">insert/deleterecord</code>.<a href="https://github.com/milvus-io/milvus/pull/44555">(#44555</a>)</li>
<li>Исправлена проблема, из-за которой репликатор не мог остановиться, и улучшен валидатор конфигурации репликатора.<a href="https://github.com/milvus-io/milvus/pull/44531">(#44531</a>)</li>
<li>Установка <code translate="no">mmap_file_raii_</code> на <code translate="no">nullptr</code> при отключенном mmap.<a href="https://github.com/milvus-io/milvus/pull/44516">(#44516</a>)</li>
<li>Заставило <code translate="no">diskfilemanager</code> использовать файловую систему из контекста.<a href="https://github.com/milvus-io/milvus/pull/44535">(#44535</a>)</li>
<li>Принудительный виртуальный хост для OSS и COS в хранилище V2.<a href="https://github.com/milvus-io/milvus/pull/44484">(#44484</a>)</li>
<li>Установлено значение <code translate="no">report_value</code> по умолчанию, когда <code translate="no">extrainfo</code> не является <code translate="no">nil</code>, для совместимости.<a href="https://github.com/milvus-io/milvus/pull/44529">(#44529</a>)</li>
<li>Очищены метрики коллекций после удаления коллекций в rootcoord.<a href="https://github.com/milvus-io/milvus/pull/44511">(#44511</a>)</li>
<li>Исправлена ошибка загрузки сегмента из-за дублирования свойств поля <code translate="no">mmap.enable</code>.<a href="https://github.com/milvus-io/milvus/pull/44465">(#44465</a>)</li>
<li>Исправлены ошибки разбора конфигурации нагрузки для динамических реплик.<a href="https://github.com/milvus-io/milvus/pull/44430">(#44430</a>)</li>
<li>Обработка ввода строки в столбец для динамических столбцов в Go SDK.<a href="https://github.com/milvus-io/milvus/pull/44626">(#44626</a>)</li>
</ul>
<h2 id="v262" class="common-anchor-header">v2.6.2<button data-href="#v262" class="anchor-icon" translate="no">
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
    </button></h2><p>Дата выпуска: 19 сентября 2025 года</p>
<table>
<thead>
<tr><th style="text-align:left">Версия Milvus</th><th style="text-align:left">Версия Python SDK</th><th style="text-align:left">Node.js SDK Версия</th><th style="text-align:left">Java SDK Версия</th><th style="text-align:left">Go SDK Версия</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Мы рады объявить о выходе Milvus 2.6.2! Это обновление представляет новые мощные функции, значительные улучшения производительности и критические исправления, которые делают систему более стабильной и готовой к производству. Среди основных возможностей - частичное обновление полей с помощью upsert, измельчение JSON для ускорения динамической фильтрации полей, индексация NGram для ускорения запросов LIKE и более гибкое изменение схемы существующих коллекций. Созданный на основе отзывов сообщества, этот выпуск обеспечивает более прочную основу для реальных развертываний, и мы рекомендуем всем пользователям обновиться, чтобы воспользоваться этими улучшениями.</p>
<h3 id="Features" class="common-anchor-header">Особенности<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Добавлена поддержка JSON Shredding для ускорения динамической фильтрации полей. Подробности см. в разделе <a href="/docs/ru/json-shredding.md">"Измельчение JSON"</a>.</li>
<li>Добавлена поддержка NGRAM Index для ускорения операций типа. Подробнее см. в разделе <a href="/docs/ru/ngram.md">NGRAM</a>.</li>
<li>Добавлена поддержка частичного обновления полей с помощью Upsert API. Подробнее см. в разделе <a href="/docs/ru/upsert-entities.md">Upsert Entities</a>.</li>
<li>Добавлена поддержка функции Boost Function. Подробнее см. в разделе <a href="/docs/ru/boost-ranker.md">Boost Ranker</a>.</li>
<li>Добавлена поддержка группировки по JSON-полям и динамическим полям<a href="https://github.com/milvus-io/milvus/pull/43203">(#43203</a>)</li>
<li>Добавлена поддержка включения динамической схемы для существующих коллекций<a href="https://github.com/milvus-io/milvus/pull/44151">(#44151</a>)</li>
<li>Добавлена поддержка сброса индексов без освобождения коллекций<a href="https://github.com/milvus-io/milvus/pull/42941">(#42941</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Улучшения<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>[StorageV2] Изменен размер файла журнала на сжатый<a href="https://github.com/milvus-io/milvus/pull/44402">(#44402</a>)</li>
<li>[StorageV2] Добавлены дочерние поля в информации о загрузке<a href="https://github.com/milvus-io/milvus/pull/44384">(#44384</a>)</li>
<li>[StorageV2] Добавлена поддержка включения ключей разделов и кластеризации в системную группу<a href="https://github.com/milvus-io/milvus/pull/44372">(#44372</a>)</li>
<li>Удален таймаут для задач уплотнения<a href="https://github.com/milvus-io/milvus/pull/44277">(#44277</a>)</li>
<li>[StorageV2] Включена сборка с Azure<a href="https://github.com/milvus-io/milvus/pull/44177">(#44177</a>)</li>
<li>[StorageV2] Использование информации о группе для оценки использования логики<a href="https://github.com/milvus-io/milvus/pull/44356">(#44356</a>)</li>
<li>[StorageV2] Использование информации о разделении групп для оценки использования<a href="https://github.com/milvus-io/milvus/pull/44338">(#44338</a>)</li>
<li>[StorageV2] Сохранение результатов групп столбцов при уплотнении<a href="https://github.com/milvus-io/milvus/pull/44327">(#44327</a>)</li>
<li>[StorageV2] Добавлены конфигурации для политики разбиения на основе размера<a href="https://github.com/milvus-io/milvus/pull/44301">(#44301</a>)</li>
<li>[StorageV2] Добавлена поддержка политики разделения на основе схемы и размера<a href="https://github.com/milvus-io/milvus/pull/44282">(#44282</a>)</li>
<li>[StorageV2] Добавлена настраиваемая политика разделения<a href="https://github.com/milvus-io/milvus/pull/44258">(#44258</a>)</li>
<li>[CachingLayer] Добавлено больше метрик и конфигураций<a href="https://github.com/milvus-io/milvus/pull/44276">(#44276</a>)</li>
<li>Добавлена поддержка ожидания готовности всех индексов перед загрузкой сегментов<a href="https://github.com/milvus-io/milvus/pull/44313">(#44313</a>)</li>
<li>Добавлена метрика задержки внутреннего ядра для узла rescore<a href="https://github.com/milvus-io/milvus/pull/44010">(#44010</a>)</li>
<li>Оптимизирован формат журнала доступа при печати KV-параметров<a href="https://github.com/milvus-io/milvus/pull/43742">(#43742</a>)</li>
<li>Добавлена настройка для изменения размера партии снимков дампа<a href="https://github.com/milvus-io/milvus/pull/44215">(#44215</a>)</li>
<li>Уменьшен интервал очистки задач уплотнения<a href="https://github.com/milvus-io/milvus/pull/44207">(#44207</a>)</li>
<li>Улучшена сортировка слиянием для поддержки нескольких полей<a href="https://github.com/milvus-io/milvus/pull/44191">(#44191</a>)<a href="https://github.com/milvus-io/milvus/pull/43994">(#43994</a>)</li>
<li>Добавлена оценка ресурсов нагрузки для многоуровневого индекса<a href="https://github.com/milvus-io/milvus/pull/44171">(#44171</a>)</li>
<li>Добавлена настройка автоиндекса для случая дедупликации<a href="https://github.com/milvus-io/milvus/pull/44186">(#44186</a>)</li>
<li>Добавлена настройка, позволяющая использовать пользовательские символы в именах (<a href="https://github.com/milvus-io/milvus/pull/44063">#44063</a>)</li>
<li>Добавлена поддержка cchannel для потокового сервиса<a href="https://github.com/milvus-io/milvus/pull/44143">(#44143</a>)</li>
<li>Добавлен мьютекс и проверка диапазона для защиты одновременных удалений<a href="https://github.com/milvus-io/milvus/pull/44128">(#44128</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Исправления ошибок<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Выровнено поведение выражений exists между грубой силой и индексом<a href="https://github.com/milvus-io/milvus/pull/44030">(#44030</a>)</li>
<li>Исправлена ошибка при переименовании в удаленную коллекцию<a href="https://github.com/milvus-io/milvus/pull/44436">(#44436</a>)</li>
<li>[StorageV2] Проверена длина дочерних полей<a href="https://github.com/milvus-io/milvus/pull/44405">(#44405</a>)</li>
<li>[StorageV2] Включение Azure по умолчанию<a href="https://github.com/milvus-io/milvus/pull/44377">(#44377</a>)</li>
<li>Исправлен путь загрузки компиляций L0 при объединении датанодов<a href="https://github.com/milvus-io/milvus/pull/44374">(#44374</a>)</li>
<li>Запрещено переименование, если включено шифрование базы данных<a href="https://github.com/milvus-io/milvus/pull/44225">(#44225</a>)</li>
<li>Запрещено удаление свойства dynamicfield.enable<a href="https://github.com/milvus-io/milvus/pull/44335">(#44335</a>)</li>
<li>Помечать задачи как неудачные, если предварительно выделенный ID недействителен<a href="https://github.com/milvus-io/milvus/pull/44350">(#44350</a>)</li>
<li>Пропущены проверки MVCC в выражениях сравнения PK<a href="https://github.com/milvus-io/milvus/pull/44353">(#44353</a>)</li>
<li>Исправлена ошибка json_contains для статистики<a href="https://github.com/milvus-io/milvus/pull/44325">(#44325</a>)</li>
<li>Добавлена проверка файловой системы инициализации для узла запроса и потокового узла<a href="https://github.com/milvus-io/milvus/pull/44360">(#44360</a>)</li>
<li>Исправлена пустая цель уплотнения, когда сегмент был собран в мусор<a href="https://github.com/milvus-io/milvus/pull/44270">(#44270</a>)</li>
<li>Исправлено состояние гонки при инициализации индекса временных меток<a href="https://github.com/milvus-io/milvus/pull/44317">(#44317</a>)</li>
<li>Проверено, является ли arraydata nil, чтобы предотвратить панику<a href="https://github.com/milvus-io/milvus/pull/44332">(#44332</a>)</li>
<li>Исправлена ошибка сборки JSON-статистики для вложенных объектов<a href="https://github.com/milvus-io/milvus/pull/44303">(#44303</a>)</li>
<li>Предотвращена перезапись mmap при использовании нескольких полей JSON<a href="https://github.com/milvus-io/milvus/pull/44299">(#44299</a>)</li>
<li>Унифицированы допустимые форматы данных<a href="https://github.com/milvus-io/milvus/pull/44296">(#44296</a>)</li>
<li>Скрыты учетные данные провайдеров встраивания/реранжирования в веб-интерфейсе<a href="https://github.com/milvus-io/milvus/pull/44275">(#44275</a>)</li>
<li>Исправлен путь к statslog под пулом датанодов<a href="https://github.com/milvus-io/milvus/pull/44288">(#44288</a>)</li>
<li>Исправлен путь к оракулу IDF<a href="https://github.com/milvus-io/milvus/pull/44266">(#44266</a>)</li>
<li>Использование контрольной точки снапшота восстановления, если ни один vchannel не восстанавливается<a href="https://github.com/milvus-io/milvus/pull/44246">(#44246</a>)</li>
<li>Ограничено количество столбцов в JSON-статистике<a href="https://github.com/milvus-io/milvus/pull/44233">(#44233</a>)</li>
<li>Сделан n-граммовый индекс подсчета ресурсов нагрузки<a href="https://github.com/milvus-io/milvus/pull/44237">(#44237</a>)</li>
<li>Вывод типа метрики из непустых результатов поиска<a href="https://github.com/milvus-io/milvus/pull/44222">(#44222</a>)</li>
<li>Исправлена многосегментная запись только одного сегмента<a href="https://github.com/milvus-io/milvus/pull/44256">(#44256</a>)</li>
<li>Исправлена сортировка слиянием вне диапазона<a href="https://github.com/milvus-io/milvus/pull/44230">(#44230</a>)</li>
<li>Добавлена проверка UTF-8 перед выполнением функции BM25<a href="https://github.com/milvus-io/milvus/pull/44220">(#44220</a>)</li>
<li>Повторное обращение к старой сессии, если она существует<a href="https://github.com/milvus-io/milvus/pull/44208">(#44208</a>)</li>
<li>Добавлено ограничение размера буфера Kafka для предотвращения OOM датанода<a href="https://github.com/milvus-io/milvus/pull/44106">(#44106</a>)</li>
<li>Исправлена паника при расширении диапазона защиты блокировки<a href="https://github.com/milvus-io/milvus/pull/44130">(#44130</a>)</li>
<li>Исправлено, что растущие сегменты не удалялись при изменении схемы<a href="https://github.com/milvus-io/milvus/pull/44412">(#44412</a>)</li>
<li>[StorageV2] Обработка ошибок ввода-вывода<a href="https://github.com/milvus-io/milvus/pull/44255">(#44255</a>)</li>
<li>Предотвращение паники, если путь к индексу Tantivy не существует<a href="https://github.com/milvus-io/milvus/pull/44135">(#44135</a>)</li>
</ul>
<h2 id="v261" class="common-anchor-header">v2.6.1<button data-href="#v261" class="anchor-icon" translate="no">
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
    </button></h2><p>Дата выпуска: 3 сентября 2025 года</p>
<table>
<thead>
<tr><th style="text-align:left">Версия Milvus</th><th style="text-align:left">Версия Python SDK</th><th style="text-align:left">Node.js SDK Версия</th><th style="text-align:left">Java SDK Версия</th><th style="text-align:left">Go SDK Версия</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Мы рады сообщить о выходе Milvus 2.6.1! Эта версия основана на основных архитектурных достижениях предыдущих релизов, в ней реализованы критические улучшения, направленные на стабильность, производительность и надежность работы. В этом выпуске учтены основные замечания сообщества и усилена система для крупномасштабных развертываний. Мы настоятельно рекомендуем всем пользователям обновиться, чтобы воспользоваться преимуществами более стабильной, производительной и надежной системы.</p>
<h3 id="Improvements" class="common-anchor-header">Улучшения<button data-href="#Improvements" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Поддержка POSIX-совместимых файловых систем для удаленного хранения<a href="https://github.com/milvus-io/milvus/pull/43944">(#43944</a>)</li>
<li>Внедрение реранкеров на основе моделей<a href="https://github.com/milvus-io/milvus/pull/43270">(#43270</a>)</li>
<li>Оптимизирована производительность выражений сравнения для полей первичного ключа<a href="https://github.com/milvus-io/milvus/pull/43154">(#43154</a>)</li>
<li>Сбор doc_id из списка постингов напрямую для ускорения текстового соответствия<a href="https://github.com/milvus-io/milvus/pull/43899">(#43899</a>)</li>
<li>Оптимизация производительности запросов за счет преобразования нескольких условий != в одно условие NOT IN<a href="https://github.com/milvus-io/milvus/pull/43690">(#43690</a>)</li>
<li>Улучшено управление ресурсами для слоя кэширования во время загрузки сегментов<a href="https://github.com/milvus-io/milvus/pull/43846">(#43846</a>)</li>
<li>Улучшена оценка памяти для промежуточных индексов во время загрузки данных<a href="https://github.com/milvus-io/milvus/pull/44104">(#44104</a>)</li>
<li>Сделан настраиваемым коэффициент сборки для промежуточных индексов<a href="https://github.com/milvus-io/milvus/pull/43939">(#43939</a>)</li>
<li>Добавляет настраиваемое ограничение скорости записи на пишущий диск<a href="https://github.com/milvus-io/milvus/pull/43912">(#43912</a>)</li>
<li>Параметры SegCore теперь могут быть обновлены динамически без перезапуска службы Milvus<a href="https://github.com/milvus-io/milvus/pull/43231">(#43231</a>)</li>
<li>Добавлены унифицированные метрики задержки gRPC для лучшей наблюдаемости<a href="https://github.com/milvus-io/milvus/pull/44089">(#44089</a>)</li>
<li>Включает временные метки клиентских запросов в заголовки gRPC для упрощения отладки<a href="https://github.com/milvus-io/milvus/pull/44059">(#44059</a>)</li>
<li>Поддержка уровня журнала трассировки для segcore<a href="https://github.com/milvus-io/milvus/pull/44003">(#44003</a>)</li>
<li>Добавляет настраиваемый переключатель для регулировки гарантий согласованности для повышения доступности<a href="https://github.com/milvus-io/milvus/pull/43874">(#43874</a>)</li>
<li>Реализован надежный механизм повторного наблюдения для обработки отказов соединений etcd<a href="https://github.com/milvus-io/milvus/pull/43829">(#43829</a>)</li>
<li>Улучшена внутренняя логика проверки работоспособности узлов<a href="https://github.com/milvus-io/milvus/pull/43768">(#43768</a>)</li>
<li>Оптимизирован доступ к метаданным при листинге коллекций<a href="https://github.com/milvus-io/milvus/pull/43902">(#43902</a>)</li>
<li>Обновление клиента Pulsar до официальной версии v0.15.1 и добавление большего количества логов<a href="https://github.com/milvus-io/milvus/pull/43913">(#43913</a>)</li>
<li>Обновление aws-sdk с версии 1.9.234 до версии 1.11.352<a href="https://github.com/milvus-io/milvus/pull/43916">(#43916</a>)</li>
<li>Поддержка динамического обновления интервалов для компонентов тикера<a href="https://github.com/milvus-io/milvus/pull/43865">(#43865</a>)</li>
<li>Улучшено автоматическое определение наборов инструкций ARM SVE для операций с битовыми наборами<a href="https://github.com/milvus-io/milvus/pull/43833">(#43833</a>)</li>
<li>Улучшено сообщение об ошибке при неудачном совпадении текста или фразы<a href="https://github.com/milvus-io/milvus/pull/43366">(#43366</a>)</li>
<li>Улучшено сообщение об ошибке при несовпадении размерности вектора<a href="https://github.com/milvus-io/milvus/pull/43835">(#43835</a>)</li>
<li>Улучшено сообщение об ошибке при таймауте добавления, когда хранилище объектов недоступно<a href="https://github.com/milvus-io/milvus/pull/43926">(#43926</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Исправления ошибок<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Устранена потенциальная проблема выхода за пределы памяти (OOM) при импорте файлов Parquet<a href="https://github.com/milvus-io/milvus/pull/43756">(#43756</a>)</li>
<li>Устранена проблема, из-за которой резервные узлы не могли восстановиться, если истек срок их аренды<a href="https://github.com/milvus-io/milvus/pull/44112">(#44112</a>)</li>
<li>Корректно обрабатывает состояние повторных попыток уплотнения<a href="https://github.com/milvus-io/milvus/pull/44119">(#44119</a>)</li>
<li>Исправление потенциального тупика между непрерывными запросами на чтение и загрузкой индекса, который мог помешать загрузке индекса<a href="https://github.com/milvus-io/milvus/pull/43937">(#43937</a>)</li>
<li>Исправление ошибки, которая могла привести к неудачному удалению данных в сценариях с высоким уровнем конверсии<a href="https://github.com/milvus-io/milvus/pull/43831">(#43831</a>)</li>
<li>Исправление потенциального состояния гонки при загрузке текстовых и JSON-индексов<a href="https://github.com/milvus-io/milvus/pull/43811">(#43811</a>)</li>
<li>Исправление несоответствия статуса узла, которое могло возникнуть после перезапуска QueryCoord<a href="https://github.com/milvus-io/milvus/pull/43941">(#43941</a>)</li>
<li>Обеспечивает правильную очистку "грязного" QueryNode после перезапуска<a href="https://github.com/milvus-io/milvus/pull/43909">(#43909</a>)</li>
<li>Устранена проблема, из-за которой состояние повтора не обрабатывалось корректно для запросов с непустой полезной нагрузкой<a href="https://github.com/milvus-io/milvus/pull/44068">(#44068</a>)</li>
<li>Исправлена ошибка, из-за которой bulk writer v2 не использовал правильное имя ведра<a href="https://github.com/milvus-io/milvus/pull/44083">(#44083</a>)</li>
<li>Повышение безопасности за счет скрытия чувствительных элементов от конечной точки RESTful get_configs<a href="https://github.com/milvus-io/milvus/pull/44057">(#44057</a>)</li>
<li>Обеспечивает идемпотентность загрузки объектов для woodpecker во время повторных попыток таймаута<a href="https://github.com/milvus-io/milvus/pull/43947">(#43947</a>)</li>
<li>Запрет импорта нулевых элементов в поля массива из файлов Parquet<a href="https://github.com/milvus-io/milvus/pull/43964">(#43964</a>)</li>
<li>Исправлена ошибка, из-за которой кэш прокси не аннулировался после создания псевдонима коллекции<a href="https://github.com/milvus-io/milvus/pull/43854">(#43854</a>)</li>
<li>Улучшен механизм обнаружения внутренних сервисов для потоковых узлов<a href="https://github.com/milvus-io/milvus/pull/44033">(#44033</a>)</li>
<li>Исправлена логика групп ресурсов для корректной фильтрации потоковых узлов<a href="https://github.com/milvus-io/milvus/pull/43984">(#43984</a>)</li>
<li>Добавляет метку databaseName в метрики для предотвращения конфликтов именования в средах с несколькими базами данных<a href="https://github.com/milvus-io/milvus/pull/43808">(#43808</a>)</li>
<li>Исправлена логическая ошибка в обработке состояния внутренней задачи<a href="https://github.com/milvus-io/milvus/pull/43777">(#43777</a>)</li>
<li>Оптимизирует время инициализации внутренних метрик, чтобы избежать потенциальной паники<a href="https://github.com/milvus-io/milvus/pull/43773">(#43773</a>)</li>
<li>Исправление редкого потенциального сбоя во внутреннем HTTP-сервере<a href="https://github.com/milvus-io/milvus/pull/43799">(#43799</a>)</li>
</ul>
<h2 id="v260" class="common-anchor-header">v2.6.0<button data-href="#v260" class="anchor-icon" translate="no">
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
    </button></h2><p>Дата выпуска: 6 августа 2025 г.</p>
<table>
<thead>
<tr><th style="text-align:left">Версия Milvus</th><th style="text-align:left">Версия Python SDK</th><th style="text-align:left">Node.js SDK Версия</th><th style="text-align:left">Java SDK Версия</th><th style="text-align:left">Go SDK Версия</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.0</td></tr>
</tbody>
</table>
<p>Milvus 2.6.0 официально выпущен! Опираясь на архитектурный фундамент, заложенный в <a href="#v260-rc1">2.6.0-rc1</a>, эта готовая к производству версия решает многочисленные проблемы стабильности и производительности, а также представляет новые мощные возможности, включая Storage Format V2, расширенную обработку JSON и улучшенные функции поиска. Milvus 2.6.0 с обширными исправлениями ошибок и оптимизациями, основанными на отзывах сообщества на этапе RC, готов к использованию и внедрению.</p>
<div class="alert warning">
<p>Прямое обновление с версий, предшествующих 2.6.0, не поддерживается из-за архитектурных изменений. Пожалуйста, следуйте нашему <a href="/docs/ru/upgrade_milvus_cluster-operator.md">руководству по обновлению</a>.</p>
</div>
<h3 id="Whats-new-in-260-since-RC" class="common-anchor-header">Что нового в версии 2.6.0 (начиная с RC)<button data-href="#Whats-new-in-260-since-RC" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Optimized-storage-format-v2" class="common-anchor-header">Оптимизированный формат хранения данных v2</h4><p>Для решения проблем смешанного хранения скалярных и векторных данных, особенно поиска точек в неструктурированных данных, в Milvus 2.6 представлен формат хранения V2. Этот новый адаптивный столбцовый формат хранения использует стратегию компоновки "объединение узких столбцов + независимость широких столбцов", что в корне решает проблему узких мест в производительности при работе с точечными поисками и мелкосерийными извлечениями в векторных базах данных.</p>
<p>Новый формат теперь поддерживает эффективный случайный доступ без усиления ввода-вывода и обеспечивает до 100-кратного прироста производительности по сравнению с ранее использовавшимся ванильным форматом Parquet, что делает его идеальным для рабочих нагрузок ИИ, требующих как аналитической обработки, так и точного векторного поиска. Кроме того, он позволяет сократить количество файлов на 98 % для типичных рабочих нагрузок. Потребление памяти при уплотнении данных сокращается на 300 %, а операции ввода-вывода оптимизируются на 80 % при чтении и более чем на 600 % при записи.</p>
<h4 id="JSON-flat-index-beta" class="common-anchor-header">Плоский индекс JSON (бета-версия)</h4><p>В Milvus 2.6 появился JSON Flat Index для работы с высокодинамичными схемами JSON. В отличие от JSON Path Index, который требует предварительного объявления конкретных путей и их ожидаемых типов, JSON Flat Index автоматически обнаруживает и индексирует все вложенные структуры под заданным путем. При индексировании JSON-поля он рекурсивно сглаживает все поддерево, создавая инвертированные индексные записи для каждой пары путь-значение, с которой он сталкивается, независимо от глубины или типа. Это автоматическое сглаживание делает JSON Flat Index идеальным для развивающихся схем, в которых новые поля появляются без предупреждения. Например, если вы проиндексируете поле "метаданные", система автоматически обработает новые вложенные поля типа "metadata.version2.features.experimental" по мере их появления во входящих данных, не требуя новой настройки индекса.</p>
<h3 id="Core-260-features-recall" class="common-anchor-header">Отзыв о возможностях ядра 2.6.0<button data-href="#Core-260-features-recall" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert note">
<p>Подробную информацию об изменениях в архитектуре и функциях, представленных в версии 2.6.0-RC, см. в <a href="#v260-rc1">документе 2.6.0-rc1 Release Note</a>.</p>
</div>
<h4 id="Architecture-simplification" class="common-anchor-header">Упрощение архитектуры</h4><ul>
<li>Потоковый узел (GA) - централизованное управление WAL</li>
<li>Нативный WAL с Woodpecker - Устранена зависимость от Kafka/Pulsar</li>
<li>Унифицированные координаторы (MixCoord); объединение IndexNode и DataNode - Снижение сложности компонентов</li>
</ul>
<h4 id="Search--analytics" class="common-anchor-header">Поиск и аналитика</h4><ul>
<li>RaBitQ 1-битное квантование с высоким уровнем запоминания</li>
<li>Сопоставление фраз</li>
<li>MinHash LSH для дедупликации</li>
<li>Функции ранжирования с учетом времени</li>
</ul>
<h4 id="Developer-experience" class="common-anchor-header">Опыт разработчиков</h4><ul>
<li>Функции встраивания для рабочего процесса "данные-вход, данные-выход"</li>
<li>Эволюция схемы в режиме онлайн</li>
<li>Поддержка вектора INT8</li>
<li>Улучшенные токенизаторы для поддержки глобальных языков</li>
<li>Слой кэша с ленивой загрузкой - обработка наборов данных, превышающих объем памяти</li>
</ul>
<h2 id="v260-rc1" class="common-anchor-header">v2.6.0-rc1<button data-href="#v260-rc1" class="anchor-icon" translate="no">
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
    </button></h2><p>Дата выпуска: 18 июня 2025 года</p>
<table>
<thead>
<tr><th style="text-align:center">Версия Milvus</th><th style="text-align:center">Версия Python SDK</th><th style="text-align:center">Node.js SDK Версия</th><th style="text-align:center">Java SDK Версия</th><th style="text-align:center">Go SDK Версия</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0b0</td><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0</td><td style="text-align:center">2.6.0-rc.1</td></tr>
</tbody>
</table>
<p>Milvus 2.6.0-rc1 представляет упрощенную облачную архитектуру, разработанную для повышения эффективности работы, использования ресурсов и совокупной стоимости владения за счет снижения сложности развертывания. В этом выпуске добавлены новые функциональные возможности, ориентированные на производительность, поиск и разработку. Среди ключевых особенностей - высокоточное 1-битное квантование (RaBitQ) и динамический слой кэша для повышения производительности, обнаружение почти дубликатов с помощью MinHash и точное сопоставление фраз для расширенного поиска, а также автоматические функции встраивания с онлайн-модификацией схемы для повышения удобства разработчиков.</p>
<div class="alert note">
<p>Это предварительная версия Milvus 2.6.0. Чтобы опробовать новейшие функции, установите эту версию как свежую. Обновление с Milvus v2.5.x или более ранней версии до 2.6.0-rc1 не поддерживается.</p>
</div>
<h3 id="Architecture-Changes" class="common-anchor-header">Изменения в архитектуре<button data-href="#Architecture-Changes" class="anchor-icon" translate="no">
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
    </button></h3><p>Начиная с версии 2.6, в Milvus внесены значительные архитектурные изменения, направленные на повышение производительности, масштабируемости и простоты использования. Дополнительную информацию см. в разделе <a href="/docs/ru/architecture_overview.md">Обзор архитектуры Milvus</a>.</p>
<h4 id="Streaming-Node-GA" class="common-anchor-header">Потоковый узел (GA)</h4><p>В предыдущих версиях потоковые данные записывались в WAL прокси-сервером, а считывались узлами QueryNode и DataNode. Такая архитектура затрудняла достижение консенсуса на стороне записи и требовала сложной логики на стороне чтения. Кроме того, делегатор запросов располагался в QueryNode, что мешало масштабируемости. В Milvus 2.5.0 появился узел Streaming Node, который в версии 2.6.0 стал GA. Теперь этот компонент отвечает за все операции чтения/записи WAL на уровне шарда, а также выполняет функции делегатора запросов, что позволило решить вышеупомянутые проблемы и получить новые оптимизации.</p>
<p><strong>Важное уведомление об обновлении</strong>: Streaming Node - это значительное архитектурное изменение, поэтому прямое обновление до Milvus 2.6.0-rc1 с предыдущих версий не поддерживается.</p>
<h4 id="Woodpecker-Native-WAL" class="common-anchor-header">Woodpecker Native WAL</h4><p>Ранее Milvus полагался на внешние системы, такие как Kafka или Pulsar, для своей WAL. Несмотря на свою функциональность, эти системы значительно усложняли работу и увеличивали затраты ресурсов, особенно для малых и средних развертываний. В Milvus 2.6 их заменила Woodpecker, специально разработанная, нативная для облака система WAL. Woodpecker предназначена для объектных хранилищ и поддерживает режимы нулевого диска как в локальных, так и в объектных хранилищах, упрощая операции и повышая производительность и масштабируемость.</p>
<h4 id="DataNode-and-IndexNode-Merge" class="common-anchor-header">Слияние DataNode и IndexNode</h4><p>В Milvus 2.6 такие задачи, как уплотнение, массовый импорт, сбор статистики и построение индексов, теперь управляются единым планировщиком. Функция сохранения данных, ранее выполнявшаяся узлом DataNode, была перенесена в узел Streaming Node. Чтобы упростить развертывание и обслуживание, IndexNode и DataNode были объединены в единый компонент DataNode. Теперь этот консолидированный узел выполняет все эти критически важные задачи, снижая операционную сложность и оптимизируя использование ресурсов.</p>
<h4 id="Coordinator-Merge-into-MixCoord" class="common-anchor-header">Слияние координаторов в MixCoord</h4><p>Предыдущая конструкция с отдельными модулями RootCoord, QueryCoord и DataCoord создавала сложности в межмодульном взаимодействии. Для упрощения конструкции системы эти компоненты были объединены в единый, унифицированный координатор под названием MixCoord. Такое объединение снижает сложность распределенного программирования, заменяя сетевое взаимодействие внутренними вызовами функций, что приводит к более эффективной работе системы и упрощает разработку и сопровождение.</p>
<h3 id="Key-Features" class="common-anchor-header">Ключевые особенности<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="RaBitQ-1-bit-Quantization" class="common-anchor-header">1-битная квантизация RaBitQ</h4><p>Для работы с крупными массивами данных 1-битное квантование является эффективной методикой, позволяющей повысить эффективность использования ресурсов и производительность поиска. Однако традиционные методы могут негативно влиять на запоминание. В сотрудничестве с авторами оригинального исследования в Milvus 2.6 представлено RaBitQ - решение для 1-битного квантования, которое сохраняет высокую точность запоминания, обеспечивая при этом преимущества использования ресурсов и производительности 1-битного сжатия.</p>
<p>Дополнительную информацию см. в разделе <a href="/docs/ru/ivf-rabitq.md">IVF_RABITQ</a>.</p>
<h4 id="JSON-Capability-Enhancement" class="common-anchor-header">Расширение возможностей работы с JSON</h4><p>В Milvus 2.6 расширена поддержка типа данных JSON за счет следующих улучшений:</p>
<ul>
<li><strong>Производительность</strong>: Теперь официально поддерживается индексирование по путям JSON, что позволяет создавать инвертированные индексы по определенным путям внутри объектов JSON (например, <code translate="no">meta.user.location</code>). Это позволяет избежать полного сканирования объекта и улучшить задержку запросов со сложными фильтрами.</li>
<li><strong>Функциональность</strong>: Для поддержки более сложной логики фильтрации в этом выпуске добавлена поддержка функций <code translate="no">JSON_CONTAINS</code>, <code translate="no">JSON_EXISTS</code>, <code translate="no">IS NULL</code> и <code translate="no">CAST</code>. Забегая вперед, отметим, что наша работа над поддержкой JSON продолжается. Мы с радостью сообщаем, что в ближайших официальных релизах появятся еще более мощные возможности, такие как <strong>измельчение JSON</strong> и <strong>индекс JSON FLAT</strong>, предназначенный для значительного повышения производительности при работе с сильно вложенными данными JSON.</li>
</ul>
<h4 id="AnalyzerTokenizer-Function-Enhancement" class="common-anchor-header">Расширение функций анализатора/токенайзера</h4><p>В этом выпуске значительно расширены возможности обработки текста благодаря нескольким обновлениям анализатора и токенизатора:</p>
<ul>
<li>Новый синтаксис <a href="/docs/ru/analyzer-overview.md#Example-use">Run Analyzer</a> доступен для проверки конфигураций токенизатора.</li>
<li><a href="/docs/ru/lindera-tokenizer.md">Токенизатор Lindera</a> интегрирован для улучшения поддержки азиатских языков, таких как японский и корейский.</li>
<li>Теперь поддерживается выбор токенизатора на уровне строк, а в качестве запасного варианта для многоязычных сценариев доступен <a href="/docs/ru/icu-tokenizer.md">токенизатор</a> общего назначения <a href="/docs/ru/icu-tokenizer.md">ICU</a>.</li>
</ul>
<h4 id="Data-in-Data-Out-with-Embedding-Functions" class="common-anchor-header">Ввод и вывод данных с помощью функций встраивания</h4><p>В Milvus 2.6 появилась возможность "Data-in, Data-Out", которая упрощает разработку приложений ИИ за счет прямой интеграции со сторонними моделями встраивания (например, из OpenAI, AWS Bedrock, Google Vertex AI, Hugging Face). Теперь пользователи могут вставлять и запрашивать необработанные текстовые данные, а Milvus автоматически вызовет указанный модельный сервис для преобразования текста в векторы в режиме реального времени. Это устраняет необходимость в отдельном конвейере преобразования векторов.</p>
<p>Дополнительную информацию см. в разделе <a href="/docs/ru/embedding-function-overview.md">Обзор функций встраивания</a>.</p>
<h4 id="Phrase-Match" class="common-anchor-header">Поиск фраз</h4><p>Функция поиска по фразе - это функция текстового поиска, которая возвращает результаты только в том случае, если точная последовательность слов в запросе встречается в документе последовательно и в правильном порядке.</p>
<p><strong>Основные характеристики</strong>:</p>
<ul>
<li>Чувствительность к порядку: Слова должны встречаться в том же порядке, что и в запросе.</li>
<li>Последовательное совпадение: Слова должны появляться рядом друг с другом, если не используется значение slop.</li>
<li>Slop (необязательно): Настраиваемый параметр, который позволяет использовать небольшое количество промежуточных слов, обеспечивая нечеткое сопоставление фраз.</li>
</ul>
<p>Дополнительную информацию см. в разделе <a href="/docs/ru/phrase-match.md">Совпадение фраз</a>.</p>
<h4 id="MinHash-LSH-Index-Beta" class="common-anchor-header">Индекс MinHash LSH (бета-версия)</h4><p>Чтобы решить проблему дедупликации данных при обучении моделей, в Milvus 2.6 добавлена поддержка индексов MINHASH_LSH. Эта функция обеспечивает эффективный с точки зрения вычислений и масштабируемый метод оценки сходства по Жаккарду между документами для выявления близких дубликатов. Пользователи могут генерировать подписи MinHash для своих текстовых документов во время предварительной обработки и использовать индекс MINHASH_LSH в Milvus для эффективного поиска похожего контента в больших наборах данных, улучшая очистку данных и качество модели.</p>
<h4 id="Time-Aware-Decay-Functions" class="common-anchor-header">Функции распада с учетом времени</h4><p>В Milvus 2.6 появились функции распада с учетом времени для решения проблем, когда ценность информации меняется с течением времени. Во время переранжирования результатов пользователи могут применять экспоненциальные, гауссовы или линейные функции распада на основе поля временной метки для корректировки оценки релевантности документа. Благодаря этому приоритет отдается более свежему контенту, что очень важно для таких приложений, как новостные ленты, электронная коммерция и память агента искусственного интеллекта.</p>
<p>Дополнительную информацию см. в разделе <a href="/docs/ru/decay-ranker-overview.md">Обзор Decay Ranker</a>.</p>
<h4 id="Add-Field-for-Online-Schema-Evolution" class="common-anchor-header">Добавление поля для эволюции схемы в режиме онлайн</h4><p>Чтобы обеспечить большую гибкость схемы, Milvus 2.6 теперь поддерживает добавление нового скалярного поля в схему существующей коллекции в режиме онлайн. Это избавляет от необходимости создавать новую коллекцию и выполнять разрушительную миграцию данных при изменении требований приложения.</p>
<p>Дополнительные сведения см. в разделе <a href="/docs/ru/add-fields-to-an-existing-collection.md">"Добавление полей в существующую коллекцию</a>".</p>
<h4 id="INT8-Vector-Support" class="common-anchor-header">Поддержка вектора INT8</h4><p>В ответ на растущее использование квантованных моделей, создающих 8-битные целочисленные вкрапления, в Milvus 2.6 добавлена встроенная поддержка типов данных для векторов INT8. Это позволяет пользователям напрямую вводить эти векторы без де-квантования, экономя вычисления, пропускную способность сети и затраты на хранение данных. Эта функция первоначально поддерживается для индексов семейства HNSW.</p>
<p>Дополнительные сведения см. в разделе <a href="/docs/ru/dense-vector.md">"Плотный вектор</a>".</p>
