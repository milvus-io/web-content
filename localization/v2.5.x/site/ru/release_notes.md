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
    </button></h1><p>Узнайте, что нового появилось в Milvus! На этой странице собраны новые возможности, улучшения, известные проблемы и исправления ошибок в каждом выпуске. В этом разделе вы найдете примечания к выпуску для каждой версии после v2.5.0. Мы рекомендуем вам регулярно посещать эту страницу, чтобы узнавать об обновлениях.</p>
<h2 id="v2511" class="common-anchor-header">v2.5.11<button data-href="#v2511" class="anchor-icon" translate="no">
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
<tr><th>Версия Milvus</th><th>Версия Python SDK</th><th>Версия Node.js SDK</th><th>Версия Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.11</td><td>2.5.8</td><td>2.5.8</td><td>2.5.8</td></tr>
</tbody>
</table>
<p>Мы рады сообщить о выходе Milvus 2.5.11! В этой версии появились новые мощные функции, такие как возможность работы с несколькими анализаторами и расширенная поддержка токенизаторов (Jieba, Lindera, ICU, Language Identifier). Мы также внесли ряд улучшений, включая обновление пула потоков динамической загрузки сегментов и оптимизированную фильтрацию удалений при импорте бинлогов. Основные исправления касаются потенциальных проблем с выпадением сегментов, сбоев поиска BM25 и ошибок фильтрации JSON-статистики.</p>
<p>Мы рекомендуем вам обновиться до версии 2.5.11, чтобы воспользоваться преимуществами этих улучшений и исправлений!</p>
<h3 id="Features" class="common-anchor-header">Особенности</h3><ul>
<li>Добавлена возможность настраивать несколько анализаторов (токенизаторов) для поддержки нескольких языков и выбирать подходящий, основываясь на инструкции входных данных<a href="https://github.com/milvus-io/milvus/pull/41444">(#41444</a>).</li>
<li>Расширена функциональность анализатора BM25<a href="https://github.com/milvus-io/milvus/pull/41456">(#41456</a>).<ul>
<li>Представлен <code translate="no">run_analyzer</code> API для пробных запусков, помогающий анализировать результаты токенизации. Дополнительную информацию см. в разделе <a href="/docs/ru/analyzer-overview.md">Обзор анализатора</a>.</li>
<li>Токенизаторы<ul>
<li>Добавлена поддержка настройки параметров токенизатора Jieba.</li>
<li>Добавлена поддержка токенизатора Lindera. Дополнительные сведения см. в разделе <a href="/docs/ru/lindera-tokenizer.md">Lindera</a>.</li>
<li>Добавлена поддержка токенизатора ICU. Дополнительную информацию см. в разделе <a href="/docs/ru/icu-tokenizer.md">ICU</a>.</li>
<li>Добавлен токенизатор Language Identifier для определения языка.</li>
</ul></li>
<li>Фильтры<ul>
<li>Расширена языковая поддержка встроенного фильтра стоп-слов. Дополнительные сведения см. в разделе <a href="/docs/ru/stop-filter.md">Стоп</a>.</li>
<li>Добавлен фильтр <code translate="no">remove_punct</code> для удаления знаков препинания. Дополнительные сведения см. в разделе <a href="/docs/ru/removepunct-filter.md">Удалить знаки препинания</a>.</li>
<li>Добавлен фильтр <code translate="no">regex</code> для фильтрации текста на основе шаблонов. Дополнительные сведения см. в разделе <a href="/docs/ru/regex-filter.md">Regex</a>.</li>
</ul></li>
</ul></li>
<li>Добавлена поддержка изменения максимальной емкости полей массива<a href="https://github.com/milvus-io/milvus/pull/41406">(#41406</a>).</li>
<li>Добавлена поддержка выражений двоичного диапазона в индексах путей JSON<a href="https://github.com/milvus-io/milvus/pull/41317">(#41317</a>).</li>
<li>Добавлена поддержка инфиксных и суффиксных типов совпадений в JSON-статистике<a href="https://github.com/milvus-io/milvus/pull/41388">(#41388</a>).</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Улучшения</h3><ul>
<li>Включено динамическое обновление размера пула потоков загрузки сегментов<a href="https://github.com/milvus-io/milvus/pull/41549">(#41549</a>).</li>
<li>Ускорена фильтрация удалений при импорте бинлога<a href="https://github.com/milvus-io/milvus/pull/41552">(#41552</a>).</li>
<li>Добавлены параметры мониторинга для коэффициента фильтрации выражений<a href="https://github.com/milvus-io/milvus/pull/41403">(#41403</a>).</li>
<li>Добавлена опция конфигурации для принудительного восстановления индексов до последней версии<a href="https://github.com/milvus-io/milvus/pull/41432">(#41432</a>).</li>
<li>Улучшено сообщение в журнале ошибок для политики списков<a href="https://github.com/milvus-io/milvus/pull/41368">(#41368</a>).</li>
<li>Адаптирована обработка дефисов в заголовках метаданных gRPC<a href="https://github.com/milvus-io/milvus/pull/41372">(#41372</a>).</li>
<li>Обновлена версия Go до 1.24.1 для устранения CVE<a href="https://github.com/milvus-io/milvus/pull/41522">(#41522</a>, <a href="https://github.com/milvus-io/milvus/pull/41319">#41319</a>).</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Исправления ошибок</h3><ul>
<li>Исправлена проблема, из-за которой сегменты могли быть некорректно сброшены при сбросе раздела<a href="https://github.com/milvus-io/milvus/pull/41543">(#41543</a>).</li>
<li>Исправлена массовая вставка с использованием списка полей ввода бегунка функции вместо списка полей схемы<a href="https://github.com/milvus-io/milvus/pull/41561">(#41561</a>).</li>
<li>Исправлены ошибки поиска BM25, возникающие, когда <code translate="no">avgdl</code> (средняя длина документа) равна NaN<a href="https://github.com/milvus-io/milvus/pull/41503">(#41503</a>).</li>
<li>Исправлены неточные метки в метриках QueryNode<a href="https://github.com/milvus-io/milvus/pull/41422">(#41422</a>).</li>
<li>Исправлена проблема, при которой создание индекса JSON-статистики могло завершиться неудачей, если данные содержали пустую карту<a href="https://github.com/milvus-io/milvus/pull/41506">(#41506</a>).</li>
<li>Исправлен API <code translate="no">AlterCollection</code> для корректного сохранения временной метки модификации<a href="https://github.com/milvus-io/milvus/pull/41469">(#41469</a>).</li>
<li>Исправлена периодическая ошибка фильтрации в JSON-статистике под <code translate="no">ConjunctExpr</code> и улучшена логика расчета слотов задач для ускорения создания JSON-статистики<a href="https://github.com/milvus-io/milvus/pull/41458">(#41458</a>).</li>
<li>Исправлена утечка оракула IDF при расчете статистики BM25<a href="https://github.com/milvus-io/milvus/pull/41426">(#41426</a>).</li>
<li>Обеспечена проверка предварительно созданных тем в первую очередь при проверке номера шарда<a href="https://github.com/milvus-io/milvus/pull/41421">(#41421</a>).</li>
<li>Исправлено ошибочное сообщение о тупике, возникающее в модульных тестах<a href="https://github.com/milvus-io/milvus/pull/41377">(#41377</a>).</li>
</ul>
<h2 id="v2510" class="common-anchor-header">v2.5.10<button data-href="#v2510" class="anchor-icon" translate="no">
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
    </button></h2><p>Дата выпуска: 21 апреля 2025 года</p>
<table>
<thead>
<tr><th>Версия Milvus</th><th>Версия Python SDK</th><th>Версия SDK для Node.js</th><th>Версия Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.10</td><td>2.5.6</td><td>2.5.8</td><td>2.5.7</td></tr>
</tbody>
</table>
<p>Milvus 2.5.10 обеспечивает улучшенную производительность поиска и загрузки, расширенную отчетность по метрикам и поддержку SVE для ускоренного вычисления метрик. Этот выпуск также содержит множество исправлений, повышающих стабильность и корректность работы. Мы рекомендуем вам обновиться или попробовать - ваши отзывы помогут нам сделать Milvus еще лучше!</p>
<h3 id="Improvements" class="common-anchor-header">Улучшения</h3><ul>
<li>Игнорирование отчетов об индексных метриках для несуществующих индексов<a href="https://github.com/milvus-io/milvus/pull/41296">(#41296</a>)</li>
<li>Использовать режим сканирования для LIKE, даже если существует инвертированный индекс<a href="https://github.com/milvus-io/milvus/pull/41309">(#41309</a>)</li>
<li>Оптимизация производительности для выражений LIKE<a href="https://github.com/milvus-io/milvus/pull/41222">(#41222</a>)</li>
<li>Оптимизация формата индексов для улучшения производительности при загрузке<a href="https://github.com/milvus-io/milvus/pull/41041">(#41041</a>)</li>
<li>RESTful: сделайте таймаут по умолчанию настраиваемым<a href="https://github.com/milvus-io/milvus/pull/41225">(#41225</a>)</li>
<li>Включить поддержку SVE для вычисления метрики L2 в функциях FP16 / NY<a href="https://github.com/zilliztech/knowhere/pull/1134">(knowhere #1134</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Исправления ошибок</h3><ul>
<li>Исправление неработающего JSON-индекса для строковых фильтров<a href="https://github.com/milvus-io/milvus/pull/41383">(#41383</a>)</li>
<li>Пропуск проверки размерности для невекторных полей в предварительной проверке<a href="https://github.com/milvus-io/milvus/pull/41329">(#41329</a>)</li>
<li>Alter collection теперь корректно обновляет схему<a href="https://github.com/milvus-io/milvus/pull/41308">(#41308</a>)</li>
<li>Обновление версии knowhere для исправления сборки macOS<a href="https://github.com/milvus-io/milvus/pull/41315">(#41315</a>)</li>
<li>Предотвращение паники при перечислении индексов до завершения инициализации сегментного индекса<a href="https://github.com/milvus-io/milvus/pull/41299">(#41299</a>)</li>
<li>Устранение регрессии производительности при изменении уровня журнала<a href="https://github.com/milvus-io/milvus/pull/41269">(#41269</a>)</li>
<li>Закрытие клиента перед удалением рабочего клиента<a href="https://github.com/milvus-io/milvus/pull/41254">(#41254</a>)</li>
</ul>
<h2 id="v259" class="common-anchor-header">v2.5.9<button data-href="#v259" class="anchor-icon" translate="no">
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
    </button></h2><p>Дата выпуска: 11 апреля 2025 года</p>
<table>
<thead>
<tr><th>Версия Milvus</th><th>Версия Python SDK</th><th>Версия SDK для Node.js</th><th>Версия Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.9</td><td>2.5.6</td><td>2.5.7</td><td>2.5.7</td></tr>
</tbody>
</table>
<p>Мы рады сообщить о выходе версии Milvus 2.5.9, в которой улучшена производительность статистики ключей JSON, расширены возможности индексирования и исправлено несколько критических ошибок, повышающих стабильность и качество работы с данными. Мы рекомендуем вам обновить или попробовать эту версию, и, как всегда, ваши отзывы будут высоко оценены, поскольку мы продолжаем совершенствовать Milvus.</p>
<h3 id="Improvements" class="common-anchor-header">Улучшения</h3><ul>
<li>Поддержка пропуска нормализации баллов для взвешенного реранкера<a href="https://github.com/milvus-io/milvus/pull/40905">(#40905</a>)</li>
<li>Улучшение производительности построения ключевых статистик JSON при пакетном добавлении документов<a href="https://github.com/milvus-io/milvus/pull/40898">(#40898</a>)</li>
<li>Использование <code translate="no">int32</code> при создании индексов массивов для типов элементов <code translate="no">int8</code>/<code translate="no">int16</code> <a href="https://github.com/milvus-io/milvus/pull/41186">(#41186</a>)</li>
<li>Согласование результатов брутфорс-поиска с поведением JSON-индекса для выражения <code translate="no">exists</code> <a href="https://github.com/milvus-io/milvus/pull/41056">(#41056</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Исправления ошибок</h3><ul>
<li>Исправлена проблема, приводившая к путанице с traceID, если клиент отправлял traceID<a href="https://github.com/milvus-io/milvus/pull/41149">(#41149</a>)</li>
<li>Исправлена потенциальная ошибка, связанная с неправильным использованием <code translate="no">noexcept</code>, что приводило к сбоям ввода-вывода<a href="https://github.com/milvus-io/milvus/pull/41221">(#41221</a>)</li>
<li>Решена проблема бесконечного цикла нормального баланса, возникавшая после приостановки баланса<a href="https://github.com/milvus-io/milvus/pull/41196">(#41196</a>)</li>
<li>Показ коллекций теперь поддерживает объекты, присвоенные пользовательским группам привилегий<a href="https://github.com/milvus-io/milvus/pull/41204">(#41204</a>)</li>
<li>Исправлен сбой при получении позиций реплицированных каналов<a href="https://github.com/milvus-io/milvus/pull/41189">(#41189</a>)</li>
<li>Исправлена потенциальная утечка потоков, вызванная таймаутами RESTful<a href="https://github.com/milvus-io/milvus/pull/41184">(#41184</a>)</li>
<li>Добавлено очищение растрового изображения для режима пакетного пропуска<a href="https://github.com/milvus-io/milvus/pull/41165">(#41165</a>)</li>
<li>Исправлена проблема, при которой удаление типа индекса не удавалось в локальном режиме удаленного хранилища<a href="https://github.com/milvus-io/milvus/pull/41163">(#41163</a>)</li>
<li>Использование <code translate="no">element_type</code> для операторов массива <code translate="no">isNull</code> <a href="https://github.com/milvus-io/milvus/pull/41158">(#41158</a>)</li>
<li>Удален сброс метрик для обеспечения точности отчетов<a href="https://github.com/milvus-io/milvus/pull/41081">(#41081</a>)</li>
<li>Исправлена ошибка, из-за которой данные <code translate="no">null</code> не фильтровались выражениями <code translate="no">null</code> <a href="https://github.com/milvus-io/milvus/pull/41135">(#41135</a>)</li>
<li>Игнорирование растущих сегментов без начальной позиции для политики уплотнения<a href="https://github.com/milvus-io/milvus/pull/41131">(#41131</a>)</li>
<li>Предотвращено обновление исходных запросов поиска/запроса при повторных попытках<a href="https://github.com/milvus-io/milvus/pull/41127">(#41127</a>)</li>
<li>Исправлена ошибка сегментации, если <code translate="no">LoadArrowReaderFromRemote</code> запускается по пути исключения<a href="https://github.com/milvus-io/milvus/pull/41071">(#41071</a>)</li>
<li>Устранены проблемы с ручным балансом и проверкой баланса<a href="https://github.com/milvus-io/milvus/pull/41038">(#41038</a>)</li>
<li>Валидированная схема не <code translate="no">nil</code> для JSON-статистики с ленивым <code translate="no">DescribeCollection</code> <a href="https://github.com/milvus-io/milvus/pull/41068">(#41068</a>)</li>
<li>Исправлена ошибка перемещения курсора при сравнении двух столбцов<a href="https://github.com/milvus-io/milvus/pull/41054">(#41054</a>)</li>
<li>Решена проблема падения при вставке как <code translate="no">null</code>, так и ненулевых массивов с открытым растущим mmap<a href="https://github.com/milvus-io/milvus/pull/41052">(#41052</a>)</li>
<li>Исправлена проблема компиляции arm64<a href="https://github.com/milvus-io/milvus/pull/41058">(#41058</a>)</li>
<li>Добавлен режим обхода пула потоков, чтобы избежать блокировки операций вставки/загрузки при растущих индексах<a href="https://github.com/milvus-io/milvus/pull/41013">(#41013</a>)</li>
<li>Исправлены ошибки формата JSON<a href="https://github.com/milvus-io/milvus/pull/41031">(#41031</a>)</li>
<li>Исправлена 404 ошибка в WebUI, когда <code translate="no">http.enablepprof</code> был false<a href="https://github.com/milvus-io/milvus/pull/41007">(#41007</a>)</li>
</ul>
<h2 id="v258" class="common-anchor-header">v2.5.8<button data-href="#v258" class="anchor-icon" translate="no">
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
    </button></h2><p>Дата выхода: 1 апреля 2025 года</p>
<table>
<thead>
<tr><th>Версия Milvus</th><th>Версия Python SDK</th><th>Версия SDK для Node.js</th><th>Версия Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.8</td><td>2.5.6</td><td>2.5.7</td><td>2.5.6</td></tr>
</tbody>
</table>
<p>Мы рады сообщить о выпуске Milvus 2.5.8, в котором улучшены выражения JSON, проверка UTF-8, использование памяти и логика балансировки. В этой версии также исправлено множество важных ошибок, улучшающих параллелизм и работу с данными. Мы призываем вас обновить версию или попробовать ее, и, как всегда, ваши отзывы помогут нам постоянно совершенствовать Milvus!</p>
<h3 id="Features" class="common-anchor-header">Особенности</h3><ul>
<li>Поддержка JSON <code translate="no">null</code>/<code translate="no">exists</code> выражений<a href="https://github.com/milvus-io/milvus/pull/41002">(#41002</a>)</li>
<li>Поддержка разбора разреженных векторов из структур Parquet при массовых вставках<a href="https://github.com/milvus-io/milvus/pull/40874">(#40874</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Улучшения</h3><ul>
<li>Балансировка коллекции с наибольшим количеством строк в первую очередь<a href="https://github.com/milvus-io/milvus/pull/40958">(#40958</a>)</li>
<li>Поддержка проверки строк UTF-8 при импорте<a href="https://github.com/milvus-io/milvus/pull/40746">(#40746</a>)</li>
<li>Добавьте проверку UTF-8 для всех полей VARCHAR<a href="https://github.com/milvus-io/milvus/pull/40993">(#40993</a>)</li>
<li>Избегайте повторных запросов, если гибридный поиск запрашивает только PK в качестве выходного поля<a href="https://github.com/milvus-io/milvus/pull/40906">(#40906</a>)</li>
<li>Доработка представлений массивов для оптимизации использования памяти<a href="https://github.com/milvus-io/milvus/pull/40206">(#40206</a>)</li>
<li>Добавлена настройка интервала срабатывания для автобалансировки<a href="https://github.com/milvus-io/milvus/pull/39918">(#39918</a>)</li>
<li>Преобразование нескольких выражений OR в выражение IN<a href="https://github.com/milvus-io/milvus/pull/40751">(#40751</a>)</li>
<li>Поддержка подробных критериев уплотнения вручную<a href="https://github.com/milvus-io/milvus/pull/40924">(#40924</a>)</li>
<li>Сохранение необработанных токенов для ведения журнала аудита<a href="https://github.com/milvus-io/milvus/pull/40867">(#40867</a>)</li>
<li>Оптимизация использования мета-мьютекса DataCoord<a href="https://github.com/milvus-io/milvus/pull/40753">(#40753</a>)</li>
<li>Внедрение пакетных подписок в <code translate="no">MsgDispatcher</code> <a href="https://github.com/milvus-io/milvus/pull/40596">(#40596</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Исправления ошибок</h3><ul>
<li>Исправлен сбой, связанный с нулевым вводом и растущими типами данных mmap<a href="https://github.com/milvus-io/milvus/pull/40980">(#40980</a>)</li>
<li>Исправлена потенциальная потеря данных при операциях удаления, вызванная дублированием идентификаторов бинлога<a href="https://github.com/milvus-io/milvus/pull/40985">(#40985</a>),<a href="https://github.com/milvus-io/milvus/pull/40976">(#40976</a>)</li>
<li>Добавлены блокировки индексов полей для <code translate="no">GetSegmentsIndexStates</code>, чтобы избежать потенциальной паники при вставке во время создания коллекции<a href="https://github.com/milvus-io/milvus/pull/40969">(#40969</a>)</li>
<li>Исправлены проблемы с параллелизмом при регистрации потребителей Rocksmq<a href="https://github.com/milvus-io/milvus/pull/40885">(#40885</a>)</li>
<li>Получение всех дочерних дельта-логов для загрузки сегмента<a href="https://github.com/milvus-io/milvus/pull/40957">(#40957</a>)</li>
<li>Исправлены неверные результаты, вызванные использованием JSON-индекса при указании <code translate="no">iterative_filter</code> <a href="https://github.com/milvus-io/milvus/pull/40946">(#40946</a>)</li>
<li>Обеспечен более высокий приоритет для операции <code translate="no">exists</code> <a href="https://github.com/milvus-io/milvus/pull/40865">(#40865</a>)</li>
<li>Исправлена ошибка <code translate="no">WithGroupSize</code> при уменьшении<a href="https://github.com/milvus-io/milvus/pull/40920">(#40920</a>)</li>
<li>Пропорциональное увеличение количества слотов при увеличении размера сегмента<a href="https://github.com/milvus-io/milvus/pull/40862">(#40862</a>)</li>
<li>Установлено время очереди задач перед enqueue<a href="https://github.com/milvus-io/milvus/pull/40853">(#40853</a>)</li>
<li>Исправлен дисбаланс каналов на DataNodes<a href="https://github.com/milvus-io/milvus/pull/40854">(#40854</a>)</li>
<li>Установлены правильные конфигурации по умолчанию для слотов задач<a href="https://github.com/milvus-io/milvus/pull/40821">(#40821</a>)</li>
<li>Go SDK: Установка нулевых флагов в соответствии с FieldSchema для вставки на основе строк<a href="https://github.com/milvus-io/milvus/pull/40962">(#40962</a>)</li>
</ul>
<h2 id="v257" class="common-anchor-header">v2.5.7<button data-href="#v257" class="anchor-icon" translate="no">
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
    </button></h2><p>Дата выпуска: 21 марта 2025 года</p>
<table>
<thead>
<tr><th>Версия Milvus</th><th>Версия Python SDK</th><th>Версия SDK для Node.js</th><th>Версия Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.7</td><td>2.5.6</td><td>2.5.6</td><td>2.5.6</td></tr>
</tbody>
</table>
<p>Мы рады сообщить о выходе Milvus 2.5.7, в котором появилась новая функция JSON Path Index. Она позволяет создавать инвертированные индексы на динамических или JSON-столбцах для значительного повышения производительности запросов. Наряду с этой новой функциональностью, мы внесли множество улучшений и исправлений ошибок для повышения надежности, более точной обработки ошибок и улучшения удобства использования. Мы призываем вас обновить или опробовать его, и, как всегда, мы будем рады вашим отзывам, поскольку мы продолжаем совершенствовать Milvus!</p>
<h3 id="Features" class="common-anchor-header">Особенности</h3><ul>
<li><strong>Индекс путей JSON</strong>: Чтобы удовлетворить потребности пользователей в динамических схемах, в Milvus 2.5.7 появилась возможность создавать индексы для динамических столбцов и столбцов JSON. С помощью этой функции вы можете создавать инвертированные индексы для определенных динамических столбцов или путей JSON, эффективно обходя медленный процесс загрузки JSON и значительно повышая производительность запросов. Дополнительную информацию см. в разделе <a href="/docs/ru/use-json-fields.md">Поле JSON</a>.</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Улучшения</h3><ul>
<li>Упорядочивание подвыражений для конъюнктивных выражений<a href="https://github.com/milvus-io/milvus/pull/40186">(#40186</a>)</li>
<li>Добавление дополнительных опций конфигурации для <code translate="no">interimindex</code> для поддержки уточненных режимов<a href="https://github.com/milvus-io/milvus/pull/40429">(#40429</a>)</li>
<li>Использование корректных метрик счетчика для расчета общего WA<a href="https://github.com/milvus-io/milvus/pull/40679">(#40679</a>)</li>
<li>Сделать конфигурацию segment prune обновляемой<a href="https://github.com/milvus-io/milvus/pull/40632">(#40632</a>)</li>
<li>Добавить политику уплотнения канала, основанную на блокировке L0<a href="https://github.com/milvus-io/milvus/pull/40535">(#40535</a>)</li>
<li>Уточните метаданные задачи с помощью блокировки на уровне ключей<a href="https://github.com/milvus-io/milvus/pull/40353">(#40353</a>)</li>
<li>Удалите ненужные метки коллекций и разделов из метрик<a href="https://github.com/milvus-io/milvus/pull/40593">(#40593</a>)</li>
<li>Улучшение сообщений об ошибках импорта<a href="https://github.com/milvus-io/milvus/pull/40597">(#40597</a>)</li>
<li>Избегайте преобразования байтовых фрагментов тела в строки в <code translate="no">httpserver</code> <a href="https://github.com/milvus-io/milvus/pull/40414">(#40414</a>)</li>
<li>Заносить в журнал начальную позицию сообщений об удалении<a href="https://github.com/milvus-io/milvus/pull/40678">(#40678</a>)</li>
<li>Поддержка получения сегментных бинлогов с помощью нового интерфейса <code translate="no">GetSegmentsInfo</code> <a href="https://github.com/milvus-io/milvus/pull/40466">(#40466</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Исправления ошибок</h3><ul>
<li>Используйте <code translate="no">newInsertDataWithFunctionOutputField</code> при импорте файлов бинлогов<a href="https://github.com/milvus-io/milvus/pull/40742">(#40742</a>)</li>
<li>Исправлена проблема, при которой свойства mmap не применялись при создании коллекции<a href="https://github.com/milvus-io/milvus/pull/40515">(#40515</a>)</li>
<li>Не удалять файл центроидов при неудачной выборке; вместо этого дождаться GC<a href="https://github.com/milvus-io/milvus/pull/40702">(#40702</a>)</li>
<li>Исправлены проблемы с потерей сообщений при поиске<a href="https://github.com/milvus-io/milvus/pull/40736">(#40736</a>)</li>
<li>Удалены цели запаздывания после главного диспетчера<a href="https://github.com/milvus-io/milvus/pull/40717">(#40717</a>)</li>
<li>Добавлен ввод clear bitmap для каждого цикла пакетной обработки<a href="https://github.com/milvus-io/milvus/pull/40722">(#40722</a>)</li>
<li>Защита <code translate="no">GetSegmentIndexes</code> с помощью RLock<a href="https://github.com/milvus-io/milvus/pull/40720">(#40720</a>)</li>
<li>Предотвращены ошибки сегментации, вызванные получением пустых наборов векторных данных<a href="https://github.com/milvus-io/milvus/pull/40546">(#40546</a>)</li>
<li>Исправлен фильтр "неравнозначности" JSON-индексов<a href="https://github.com/milvus-io/milvus/pull/40648">(#40648</a>)</li>
<li>Исправлена загрузка нулевого смещения в инвертированном индексе<a href="https://github.com/milvus-io/milvus/pull/40524">(#40524</a>)</li>
<li>Исправлена логика очистки от мусора статистики <code translate="no">jsonKey</code> и улучшен фильтр статистики по ключам JSON<a href="https://github.com/milvus-io/milvus/pull/40039">(#40039</a>)</li>
<li>Перехвачены ошибки недействительных указателей JSON<a href="https://github.com/milvus-io/milvus/pull/40626">(#40626</a>)</li>
<li>RBAC star privilege теперь возвращает пустое значение при листинге политик<a href="https://github.com/milvus-io/milvus/pull/40557">(#40557</a>)</li>
<li>Избежание паники, когда поле не существует в схеме в QueryNode<a href="https://github.com/milvus-io/milvus/pull/40542">(#40542</a>)</li>
<li>Исправлена проблема с коллекцией ссылок для поиска/запроса<a href="https://github.com/milvus-io/milvus/pull/40550">(#40550</a>)</li>
<li>Обработка пустых строк для разреженных векторов<a href="https://github.com/milvus-io/milvus/pull/40586">(#40586</a>)</li>
<li>Добавлена проверка дублирования параметров типа/индекса при создании коллекций<a href="https://github.com/milvus-io/milvus/pull/40465">(#40465</a>)</li>
<li>Перемещено <code translate="no">metaHeader</code> на клиент, чтобы избежать гонок данных<a href="https://github.com/milvus-io/milvus/pull/40444">(#40444</a>)</li>
</ul>
<h2 id="v256" class="common-anchor-header">v2.5.6<button data-href="#v256" class="anchor-icon" translate="no">
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
    </button></h2><p>Дата выпуска: 10 марта 2025 года</p>
<table>
<thead>
<tr><th>Версия Milvus</th><th>Версия Python SDK</th><th>Версия SDK для Node.js</th><th>Версия Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.6</td><td>2.5.5</td><td>2.5.5</td><td>2.5.5</td></tr>
</tbody>
</table>
<p>Мы рады сообщить о выходе Milvus 2.5.6, содержащего ценные улучшения в цепочках инструментов, журналировании, метриках и работе с массивами, а также многочисленные исправления ошибок для повышения надежности и производительности. Это обновление включает в себя усовершенствованную обработку параллелизма, более надежные задачи уплотнения и другие ключевые улучшения. Мы призываем вас обновить или опробовать его, и, как всегда, мы приветствуем ваши отзывы, которые помогут нам постоянно улучшать Milvus!</p>
<h3 id="Improvements" class="common-anchor-header">Улучшения</h3><ul>
<li>Обновление инструментария Go до версии 1.22.7<a href="https://github.com/milvus-io/milvus/pull/40399">(#40399</a>)</li>
<li>Обновление версии Rust до 1.83<a href="https://github.com/milvus-io/milvus/pull/40317">(#40317</a>)</li>
<li>Повышение версии Etcd до 3.5.18<a href="https://github.com/milvus-io/milvus/pull/40230">(#40230</a>)</li>
<li>Проверять тип элемента только для ненулевых массивов<a href="https://github.com/milvus-io/milvus/pull/40447">(#40447</a>)</li>
<li>Удаление отладочных логов в обработчике групп ресурсов (v2)<a href="https://github.com/milvus-io/milvus/pull/40393">(#40393</a>)</li>
<li>Улучшение логирования для gRPC-резольвера<a href="https://github.com/milvus-io/milvus/pull/40338">(#40338</a>)</li>
<li>Добавление дополнительных метрик для асинхронных компонентов CGO<a href="https://github.com/milvus-io/milvus/pull/40232">(#40232</a>)</li>
<li>Очистка кэша местоположения шардов после освобождения коллекции<a href="https://github.com/milvus-io/milvus/pull/40228">(#40228</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Исправления ошибок</h3><ul>
<li>Исправлено повреждение массива, вызванное игнорированием валидности<a href="https://github.com/milvus-io/milvus/pull/40433">(#40433</a>)</li>
<li>Исправлена ошибка, из-за которой выражения <code translate="no">null</code> не работали для полей JSON<a href="https://github.com/milvus-io/milvus/pull/40457">(#40457</a>)</li>
<li>Исправлена проблема, из-за которой сохранялось неверное смещение при создании Tantivy с нулевым полем<a href="https://github.com/milvus-io/milvus/pull/40453">(#40453</a>)</li>
<li>Пропущено выполнение статистики для нулевых сегментов<a href="https://github.com/milvus-io/milvus/pull/40449">(#40449</a>)</li>
<li>Исправлена оценка объема памяти для массивов<a href="https://github.com/milvus-io/milvus/pull/40377">(#40377</a>)</li>
<li>Передача указателя ранца во избежание многократного уплотнения<a href="https://github.com/milvus-io/milvus/pull/40401">(#40401</a>)</li>
<li>Исправлена проблема сбоя при массовой вставке<a href="https://github.com/milvus-io/milvus/pull/40304">(#40304</a>)</li>
<li>Предотвращены утечки потока сообщений за счет правильного завершения главного диспетчера<a href="https://github.com/milvus-io/milvus/pull/40351">(#40351</a>)</li>
<li>Исправлены проблемы параллелизма для <code translate="no">null</code> смещений<a href="https://github.com/milvus-io/milvus/pull/40363">(#40363</a>),<a href="https://github.com/milvus-io/milvus/pull/40365">(#40365</a>)</li>
<li>Исправлен парсинг <code translate="no">import end ts</code> <a href="https://github.com/milvus-io/milvus/pull/40333">(#40333</a>)</li>
<li>Улучшена обработка ошибок и юнит-тесты для функции <code translate="no">InitMetaCache</code> <a href="https://github.com/milvus-io/milvus/pull/40324">(#40324</a>)</li>
<li>Добавлена проверка дублирования параметров для <code translate="no">CreateIndex</code> <a href="https://github.com/milvus-io/milvus/pull/40330">(#40330</a>)</li>
<li>Решена проблема, препятствующая выполнению задач уплотнения при превышении максимального размера<a href="https://github.com/milvus-io/milvus/pull/40350">(#40350</a>)</li>
<li>Исправлено дублирование потребления из потока для невидимых сегментов<a href="https://github.com/milvus-io/milvus/pull/40318">(#40318</a>)</li>
<li>Изменена переменная CMake для переключения на <code translate="no">knowhere-cuvs</code> <a href="https://github.com/milvus-io/milvus/pull/40289">(#40289</a>)</li>
<li>Исправлена проблема, при которой сброс свойств БД через RESTful не работал<a href="https://github.com/milvus-io/milvus/pull/40260">(#40260</a>)</li>
<li>Использован другой тип сообщений для <code translate="no">OperatePrivilegeV2</code> API<a href="https://github.com/milvus-io/milvus/pull/40193">(#40193</a>)</li>
<li>Исправлена гонка данных в дельта-кэше задач<a href="https://github.com/milvus-io/milvus/pull/40262">(#40262</a>)</li>
<li>Решена проблема утечки кэша дельты задач, вызванная дублированием идентификаторов задач<a href="https://github.com/milvus-io/milvus/pull/40184">(#40184</a>)</li>
</ul>
<h2 id="v255" class="common-anchor-header">v2.5.5<button data-href="#v255" class="anchor-icon" translate="no">
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
    </button></h2><p>Дата выпуска: 26 февраля 2025 г.</p>
<table>
<thead>
<tr><th>Версия Milvus</th><th>Версия Python SDK</th><th>Версия SDK для Node.js</th><th>Версия Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.5</td><td>2.5.4</td><td>2.5.5</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>В Milvus 2.5.5 значительно улучшено количество коллекций и разделов, которые может поддерживать один кластер. Теперь вполне реально запустить Milvus с 10 тыс. коллекций и 100 тыс. разделов. В этом выпуске также исправлено несколько критических ошибок, включая отсутствие статистики совпадений и проблему тупика при многоступенчатых запросах. Кроме того, в него включены многочисленные улучшения наблюдаемости и безопасности. Мы настоятельно рекомендуем всем пользователям, работающим с Milvus 2.5.x, как можно скорее обновить версию.</p>
<h3 id="Dependency-Upgrade" class="common-anchor-header">Обновление зависимостей</h3><p>Обновление до ETCD 3.5.18 для исправления нескольких CVE.</p>
<ul>
<li>[2.5] Обновлен raft до cuvs<a href="https://github.com/milvus-io/milvus/pull/39221">(#39221</a>)</li>
<li>[2.5] Обновлена версия Knowhere<a href="https://github.com/milvus-io/milvus/pull/39673">(#39673</a>, <a href="https://github.com/milvus-io/milvus/pull/39574">#39574</a>)</li>
</ul>
<h3 id="Critical-Bugs" class="common-anchor-header">Критические ошибки</h3><ul>
<li>[2.5] Использован префикс <code translate="no">text_log</code> для файла textmatchindex с нулевым смещением<a href="https://github.com/milvus-io/milvus/pull/39936">(#39936</a>)</li>
<li>[2.5] Добавлен пул подзадач для многоэтапных задач, чтобы избежать тупика<a href="https://github.com/milvus-io/milvus/pull/40081">(#40081</a>)</li>
</ul>
<h3 id="Bug-Fixes" class="common-anchor-header">Исправления ошибок</h3><ul>
<li>[2.5] Исправлен тупик планировщика задач<a href="https://github.com/milvus-io/milvus/pull/40121">(#40121</a>)</li>
<li>[2.5] Исправлено состояние гонки, при котором создавалось несколько одинаковых индексов<a href="https://github.com/milvus-io/milvus/pull/40180">(#40180</a>)</li>
<li>[2.5] Исправлена проблема, из-за которой могли создаваться коллекции с дублирующимися именами<a href="https://github.com/milvus-io/milvus/pull/40147">(#40147</a>)</li>
<li>Исправлен сбой поиска по нулевому выражению<a href="https://github.com/milvus-io/milvus/pull/40128">(#40128</a>)</li>
<li>[2.5] Исправлена ошибка, из-за которой не удавалось найти префикс, если в префиксе присутствовали подстановочные знаки<a href="https://github.com/milvus-io/milvus/pull/40021">(#40021</a>)</li>
<li>Каскад отмененных подконтекстов, когда HTTP-запрос завершался по таймеру<a href="https://github.com/milvus-io/milvus/pull/40060">(#40060</a>)</li>
<li>[2.5] Исправлена утечка кэша дельты задачи на задаче reduce<a href="https://github.com/milvus-io/milvus/pull/40056">(#40056</a>)</li>
<li>[2.5] Исправлена паника querycoord в угловом случае<a href="https://github.com/milvus-io/milvus/pull/40058">(#40058</a>)</li>
<li>[2.5] Улучшена функция isbalanced для корректного подсчета пар кавычек<a href="https://github.com/milvus-io/milvus/pull/40002">(#40002</a>)</li>
<li>[2.5] Исправлено отрицательное -1 при выполнении задач уплотнения<a href="https://github.com/milvus-io/milvus/pull/39955">(#39955</a>)</li>
<li>[2.5] Исправлена ошибка, при которой сегмент никогда не переходил из состояния sealed в состояние flushing<a href="https://github.com/milvus-io/milvus/pull/39996">(#39996</a>)</li>
<li>Пропущено создание индекса первичного ключа при загрузке индекса pk<a href="https://github.com/milvus-io/milvus/pull/39922">(#39922</a>)</li>
<li>[2.5] Пропускалось создание текстового индекса, когда сегмент был нулевым после сортировки<a href="https://github.com/milvus-io/milvus/pull/39969">(#39969</a>)</li>
<li>[2.5] Исправлена ошибка поиска по самой ранней позиции<a href="https://github.com/milvus-io/milvus/pull/39966">(#39966</a>)</li>
<li>Игнорировалась опция роста, потерянная при гибридном поиске<a href="https://github.com/milvus-io/milvus/pull/39900">(#39900</a>)</li>
<li>[2.5] Исправлена ошибка altercollection, неспособная изменить уровень согласованности<a href="https://github.com/milvus-io/milvus/pull/39902">(#39902</a>)</li>
<li>Исправлен сбой импорта из-за 0 количества строк<a href="https://github.com/milvus-io/milvus/pull/39904">(#39904</a>)</li>
<li>[2.5] Исправлен неверный результат модуля для длинного типа<a href="https://github.com/milvus-io/milvus/pull/39802">(#39802</a>)</li>
<li>[2.5] Добавлен и используется контекст времени жизни для триггера уплотнения<a href="https://github.com/milvus-io/milvus/pull/39880">(#39880</a>)</li>
<li>[2.5] Проверено освобождение коллекции перед проверкой цели<a href="https://github.com/milvus-io/milvus/pull/39843">(#39843</a>)</li>
<li>Исправлен сбой грациозной остановки Rootcoord и ограниченный ресурс CI<a href="https://github.com/milvus-io/milvus/pull/39793">(#39793</a>)</li>
<li>[2.5] Удалена проверка размера полей и столбцов схемы загрузки<a href="https://github.com/milvus-io/milvus/pull/39834">(#39834</a>, <a href="https://github.com/milvus-io/milvus/pull/39835">#39835</a>)</li>
<li>[2.5] Удален параметр mmap.enable в параметре type при создании индекса<a href="https://github.com/milvus-io/milvus/pull/39806">(#39806</a>)</li>
<li>[2.5] Не передавалось имя индекса при сбросе свойств<a href="https://github.com/milvus-io/milvus/pull/39679">(#39679</a>)</li>
<li>[2.5] Сегменты возвращали как растущие, так и запечатанные результаты<a href="https://github.com/milvus-io/milvus/pull/39789">(#39789</a>)</li>
<li>[2.5] Исправлена проблема с одновременной картой<a href="https://github.com/milvus-io/milvus/pull/39776">(#39776</a>)</li>
<li>[2.5] Устранен конфликт при тестировании задачи QC<a href="https://github.com/milvus-io/milvus/pull/39797">(#39797</a>)</li>
<li>[2.5] Исправлено застревание при загрузке коллекции, если происходило уплотнение или GC<a href="https://github.com/milvus-io/milvus/pull/39761">(#39761</a>)</li>
<li>[2.5] Исправлено неравномерное распределение, вызванное утечкой дельта-кэша выполняемых задач<a href="https://github.com/milvus-io/milvus/pull/39759">(#39759</a>)</li>
<li>[2.5] Досрочный возврат при пропуске индекса load pk<a href="https://github.com/milvus-io/milvus/pull/39763">(#39763</a>)</li>
<li>[2.5] Исправлено, что пользователь root мог получить список всех коллекций, даже если был установлен <code translate="no">common.security.rootShouldBindRole</code> <a href="https://github.com/milvus-io/milvus/pull/39714">(#39714</a>)</li>
<li>[2.5] Исправлена утечка flowgraph<a href="https://github.com/milvus-io/milvus/pull/39686">(#39686</a>)</li>
<li>[2.5] Использован форматтер элементов param, чтобы избежать наложения setconfig<a href="https://github.com/milvus-io/milvus/pull/39636">(#39636</a>)</li>
<li>[2.5] Проверено имя привилегии Metastore с именем привилегии "all"<a href="https://github.com/milvus-io/milvus/pull/39492">(#39492</a>)</li>
<li>[2.5] Добавлен ограничитель скорости для RESTful v1<a href="https://github.com/milvus-io/milvus/pull/39555">(#39555</a>)</li>
<li>[2.5] Удален жестко закодированный номер раздела в обработчике RESTful<a href="https://github.com/milvus-io/milvus/pull/40113">(#40113</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Улучшения</h3><h4 id="Observability" class="common-anchor-header">Наблюдаемость</h4><ul>
<li>Добавлена метрика monitor для получения необработанных данных<a href="https://github.com/milvus-io/milvus/pull/40155">(#40155</a>)</li>
<li>[2.5] Добавлена метрика задержки вектора получения и уточнено сообщение об ошибке лимита запросов<a href="https://github.com/milvus-io/milvus/pull/40085">(#40085</a>)</li>
<li>[2.5] Добавлены метрики для очереди прокси<a href="https://github.com/milvus-io/milvus/pull/40071">(#40071</a>)</li>
<li>Раскрыто больше данных метрик<a href="https://github.com/milvus-io/milvus/pull/39466">(#39466</a>)</li>
<li>[2.5] Добавлены метрики для выражения разбора<a href="https://github.com/milvus-io/milvus/pull/39716">(#39716</a>)</li>
<li>[2.5] Добавлено поле DSL-лога для hybridsearch<a href="https://github.com/milvus-io/milvus/pull/39598">(#39598</a>)</li>
<li>[2.5] Пропущено обновление метрик индекса, если индекс был удален<a href="https://github.com/milvus-io/milvus/pull/39572">(#39572</a>)</li>
<li>[2.5] Выгружалась информация о pprof, если прогресс остановки компонента завершался по таймеру<a href="https://github.com/milvus-io/milvus/pull/39760">(#39760</a>)</li>
<li>[2.5] Добавлен API управления для проверки состояния баланса querycoord<a href="https://github.com/milvus-io/milvus/pull/39909">(#39909</a>)</li>
</ul>
<h4 id="StatsCompactionIndex-Task-Scheduler-Optimization" class="common-anchor-header">Оптимизация статистики/компактификации/планировщика индексных задач</h4><ul>
<li>Уточнена политика планировщика индексных задач<a href="https://github.com/milvus-io/milvus/pull/40104">(#40104</a>)</li>
<li>[2.5] Ограничена скорость генерации задач статистики<a href="https://github.com/milvus-io/milvus/pull/39645">(#39645</a>)</li>
<li>Добавлены настройки для расписания уплотнения<a href="https://github.com/milvus-io/milvus/pull/39511">(#39511</a>)</li>
<li>[2.5] Проверено уплотнение L0 только с тем же каналом, если указано<a href="https://github.com/milvus-io/milvus/pull/39543">(#39543</a>)</li>
<li>[2.5] Скорректирована оценка памяти загрузчиком сегментов для промежуточных индексов<a href="https://github.com/milvus-io/milvus/pull/39509">(#39509</a>)</li>
<li>[2.5] Использование start pos ts для сегмента уплотнения в соответствии с политикой времени жизни<a href="https://github.com/milvus-io/milvus/pull/39994">(#39994</a>)</li>
<li>Удалена мета-задача, когда она больше не нужна<a href="https://github.com/milvus-io/milvus/pull/40146">(#40146</a>)</li>
<li>[2.5] Ускорено перечисление объектов при импорте бинлога<a href="https://github.com/milvus-io/milvus/pull/40048">(#40048</a>)</li>
<li>Поддержка создания коллекции с описанием<a href="https://github.com/milvus-io/milvus/pull/40028">(#40028</a>)</li>
<li>[2.5] Экспортированный интервал таймаута запроса индекса в конфиге<a href="https://github.com/milvus-io/milvus/pull/40118">(#40118</a>)</li>
<li>[2.5] Синхронизировано значение proxy.maxTaskNum по умолчанию до 1024<a href="https://github.com/milvus-io/milvus/pull/40073">(#40073</a>)</li>
<li>Уменьшен лимит снапшотов дампа с 10 до 1w<a href="https://github.com/milvus-io/milvus/pull/40102">(#40102</a>)</li>
<li>[2.5] Избавление от копирования байтов из строки в фрагмент для пакетных pk exists<a href="https://github.com/milvus-io/milvus/pull/40097">(#40097</a>)</li>
<li>Поддержка возврата настраиваемых свойств при описании индекса<a href="https://github.com/milvus-io/milvus/pull/40043">(#40043</a>)</li>
<li>Оптимизирована производительность выражений для некоторых точек<a href="https://github.com/milvus-io/milvus/pull/39938">(#39938</a>)</li>
<li>[2.5] Оптимизирован формат результатов getQueryNodeDistribution<a href="https://github.com/milvus-io/milvus/pull/39926">(#39926</a>)</li>
<li>[cp25] Включено наблюдение за усилением записи<a href="https://github.com/milvus-io/milvus/pull/39743">(#39743</a>)</li>
<li>[2.5] Возврат результатов top-k при поиске в RESTful v2<a href="https://github.com/milvus-io/milvus/pull/39839">(#39839</a>)</li>
<li>[2.5][GoSDK] Добавлен синтаксический сахар withEnableMatch<a href="https://github.com/milvus-io/milvus/pull/39853">(#39853</a>)</li>
<li>[2.5] Промежуточный индекс поддерживает различные типы индексов и больше типов данных (FP16/BF16)<a href="https://github.com/milvus-io/milvus/pull/39180">(#39180</a>)</li>
<li>[GoSDK][2.5] Синхронизированы коммиты GoSDK из мастер-ветки<a href="https://github.com/milvus-io/milvus/pull/39823">(#39823</a>)</li>
<li>Обеспечена согласованность памяти и метаданных вещателя<a href="https://github.com/milvus-io/milvus/pull/39721">(#39721</a>)</li>
<li>Вещание с уведомлением на основе событий<a href="https://github.com/milvus-io/milvus/pull/39550">(#39550</a>)</li>
<li>[2.5] Уточнено сообщение об ошибке при проверке схем и индексов<a href="https://github.com/milvus-io/milvus/pull/39565">(#39565</a>)</li>
<li>[2.5] Сброшен тип автоиндекса по умолчанию для скаляра<a href="https://github.com/milvus-io/milvus/pull/39820">(#39820</a>)</li>
<li>[2.5] Повторная постановка в очередь задачи уплотнения L0 при неудачной предварительной проверке<a href="https://github.com/milvus-io/milvus/pull/39871">(#39871</a>)</li>
</ul>
<h2 id="v254" class="common-anchor-header">v2.5.4<button data-href="#v254" class="anchor-icon" translate="no">
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
    </button></h2><p>Дата выпуска: 23 января 2025 года</p>
<table>
<thead>
<tr><th>Версия Milvus</th><th>Версия Python SDK</th><th>Версия SDK для Node.js</th><th>Версия Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.4</td><td>2.5.4</td><td>2.5.4</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>Мы рады сообщить о выходе Milvus 2.5.4, в котором представлены ключевые оптимизации производительности и новые возможности, такие как изоляция PartitionKey, Sparse Index с DAAT MaxScore и улучшенные механизмы блокировки. Особое место в этом выпуске занимает поддержка 10 000 коллекций и 1 миллиона разделов, что является важной вехой для многопользовательских систем. В этой версии также исправлено множество ошибок, повышающих общую стабильность и надежность, две из которых могут привести к потере данных. Мы рекомендуем вам обновить или опробовать эту последнюю версию и ждем ваших отзывов, которые помогут нам постоянно совершенствовать Milvus!</p>
<h3 id="Features" class="common-anchor-header">Особенности</h3><ul>
<li>Поддержка изоляции PartitionKey для повышения производительности при использовании нескольких ключей разделов<a href="https://github.com/milvus-io/milvus/pull/39245">(#39245</a>). Для получения дополнительной информации обратитесь к разделу <a href="/docs/ru/use-partition-key.md">Использование ключа раздела</a>.</li>
<li>Sparse Index теперь поддерживает DAAT MaxScore <a href="https://github.com/milvus-io/knowhere/pull/1015">knowhere/#1015</a>. Дополнительные сведения см. в разделе <a href="/docs/ru/sparse_vector.md">Sparse Vector</a>.</li>
<li>Добавлена поддержка <code translate="no">is_null</code> в выражении<a href="https://github.com/milvus-io/milvus/pull/38931">(#38931</a>)</li>
<li>Привилегии корня могут быть настроены<a href="https://github.com/milvus-io/milvus/pull/39324">(#39324</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Улучшения</h3><ul>
<li>Поддержка 10K коллекций и 1 млн. разделов в одном кластере<a href="https://github.com/milvus-io/milvus/pull/37630">(#37630</a>)</li>
<li>Кэшированная информация о дельте сегментов для ускорения работы координатора запросов<a href="https://github.com/milvus-io/milvus/pull/39349">(#39349</a>)</li>
<li>Одновременное чтение метаданных на уровне коллекции для ускорения восстановления после сбоев<a href="https://github.com/milvus-io/milvus/pull/38900">(#38900</a>)</li>
<li>Уточненная гранулярность блокировки в QueryNode<a href="https://github.com/milvus-io/milvus/pull/39282">(#39282</a>),<a href="https://github.com/milvus-io/milvus/pull/38907">(#38907</a>)</li>
<li>Унификация стиля за счет использования CStatus для обработки вызовов CGO NewCollection<a href="https://github.com/milvus-io/milvus/pull/39303">(#39303</a>)</li>
<li>Пропущена генерация ограничителя разделов, если ни один из разделов не задан<a href="https://github.com/milvus-io/milvus/pull/38911">(#38911</a>)</li>
<li>Добавлена поддержка RESTful API<a href="https://github.com/milvus-io/milvus/pull/38875">(#38875</a>)<a href="https://github.com/milvus-io/milvus/pull/39425">(#39425</a>)</li>
<li>Удалены ненужные Bloom-фильтры в QueryNode и DataNode для уменьшения использования памяти<a href="https://github.com/milvus-io/milvus/pull/38913">(#38913</a>)</li>
<li>Ускорена загрузка данных за счет ускорения генерации, планирования и выполнения задач в QueryCoord<a href="https://github.com/milvus-io/milvus/pull/38905">(#38905</a>)</li>
<li>Уменьшена блокировка в DataCoord для ускорения операций загрузки и вставки<a href="https://github.com/milvus-io/milvus/pull/38904">(#38904</a>)</li>
<li>Добавлены имена первичных полей в <code translate="no">SearchResult</code> и <code translate="no">QueryResults</code> <a href="https://github.com/milvus-io/milvus/pull/39222">(#39222</a>)</li>
<li>В качестве стандарта дросселирования дисковой квоты используется размер бинлога и размер индекса<a href="https://github.com/milvus-io/milvus/pull/38844">(#38844</a>)</li>
<li>Оптимизировано использование памяти для полнотекстового поиска knowhere/#1011</li>
<li>Добавлен контроль версий для скалярных индексов<a href="https://github.com/milvus-io/milvus/pull/39236">(#39236</a>)</li>
<li>Улучшена скорость получения информации о коллекции из RootCoord за счет исключения ненужных копий<a href="https://github.com/milvus-io/milvus/pull/38902">(#38902</a>)</li>
</ul>
<h3 id="Critial-Bug-fixs" class="common-anchor-header">Исправления критических ошибок</h3><ul>
<li>Исправлены сбои при поиске по первичным ключам с индексами<a href="https://github.com/milvus-io/milvus/pull/39390">(#39390</a>)</li>
<li>Исправлена потенциальная проблема потери данных, вызванная перезапуском MixCoord и одновременной промывкой<a href="https://github.com/milvus-io/milvus/pull/39422">(#39422</a>)</li>
<li>Исправлена ошибка удаления, вызванная неправильным параллелизмом между задачами статистики и уплотнением L0 после перезапуска MixCoord<a href="https://github.com/milvus-io/milvus/pull/39460">(#39460</a>)</li>
<li>Исправлена несовместимость скалярных инвертированных индексов при обновлении с 2.4 до 2.5<a href="https://github.com/milvus-io/milvus/pull/39272">(#39272</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Исправления ошибок</h3><ul>
<li>Исправлены проблемы с медленными запросами, вызванные грубой гранулярностью блокировки при загрузке нескольких столбцов<a href="https://github.com/milvus-io/milvus/pull/39255">(#39255</a>)</li>
<li>Исправлена проблема, при которой использование псевдонимов могло привести к тому, что итератор обходил не ту базу данных<a href="https://github.com/milvus-io/milvus/pull/39248">(#39248</a>)</li>
<li>Исправлен сбой обновления группы ресурсов при изменении базы данных<a href="https://github.com/milvus-io/milvus/pull/39356">(#39356</a>)</li>
<li>Исправлена проблема, из-за которой индекс tantivy не мог удалить индексные файлы во время выпуска<a href="https://github.com/milvus-io/milvus/pull/39434">(#39434</a>)</li>
<li>Исправлено медленное индексирование, вызванное слишком большим количеством потоков<a href="https://github.com/milvus-io/milvus/pull/39341">(#39341</a>)</li>
<li>Исправлена проблема, из-за которой проверка дисковой квоты не пропускалась при массовом импорте<a href="https://github.com/milvus-io/milvus/pull/39319">(#39319</a>)</li>
<li>Устранены проблемы с зависанием, вызванные слишком большим количеством потребителей очереди сообщений, путем ограничения параллелизма<a href="https://github.com/milvus-io/milvus/pull/38915">(#38915</a>)</li>
<li>Исправлены таймауты запросов, вызванные перезапуском MixCoord во время масштабных уплотнений<a href="https://github.com/milvus-io/milvus/pull/38926">(#38926</a>)</li>
<li>Исправлены проблемы с дисбалансом каналов, вызванные простоем узлов<a href="https://github.com/milvus-io/milvus/pull/39200">(#39200</a>)</li>
<li>Исправлена проблема, из-за которой баланс канала мог застрять.<a href="https://github.com/milvus-io/milvus/pull/39160">(#39160</a>)</li>
<li>Исправлена проблема, из-за которой проверка уровня привилегий пользовательских групп RBAC становилась неэффективной<a href="https://github.com/milvus-io/milvus/pull/39224">(#39224</a>)</li>
<li>Исправлен сбой при получении количества строк в пустых индексах<a href="https://github.com/milvus-io/milvus/pull/39210">(#39210</a>)</li>
<li>Исправлена некорректная оценка памяти для небольших сегментов<a href="https://github.com/milvus-io/milvus/pull/38909">(#38909</a>)</li>
</ul>
<h2 id="v253" class="common-anchor-header">v2.5.3<button data-href="#v253" class="anchor-icon" translate="no">
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
    </button></h2><p>Дата выпуска: 13 января 2025 года</p>
<table>
<thead>
<tr><th>Версия Milvus</th><th>Версия Python SDK</th><th>Версия SDK для Node.js</th><th>Версия Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.3</td><td>2.5.3</td><td>2.5.3</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>В Milvus 2.5.3 исправлены критические ошибки и улучшена производительность, что повышает общую стабильность, надежность и удобство использования. В этой версии улучшена обработка параллелизма, усилена индексация и поиск данных, а также обновлен ряд ключевых компонентов для более надежной работы пользователей.</p>
<h3 id="Bug-fixes" class="common-anchor-header">Исправления ошибок</h3><ul>
<li>Исправлена проблема, при которой использование фильтра <code translate="no">IN</code> по первичному ключу <code translate="no">VARCHAR</code> могло возвращать пустые результаты.<a href="https://github.com/milvus-io/milvus/pull/39108">(#39108</a>)</li>
<li>Исправлена проблема параллелизма между операциями запроса и удаления, которая могла приводить к неправильным результатам.<a href="https://github.com/milvus-io/milvus/pull/39054">(#39054</a>)</li>
<li>Исправлен сбой, вызванный итеративной фильтрацией, когда <code translate="no">expr</code> в запросе был пустым.<a href="https://github.com/milvus-io/milvus/pull/39034">(#39034</a>)</li>
<li>Исправлена проблема, когда ошибка диска при обновлении конфигурации приводила к использованию настроек конфигурации по умолчанию.<a href="https://github.com/milvus-io/milvus/pull/39072">(#39072</a>)</li>
<li>Исправлена потенциальная потеря удаленных данных из-за уплотнения кластера.<a href="https://github.com/milvus-io/milvus/pull/39133">(#39133</a>)</li>
<li>Исправлена ошибка запроса на совпадение текста в растущих сегментах данных.<a href="https://github.com/milvus-io/milvus/pull/39113">(#39113</a>)</li>
<li>Исправлены сбои при извлечении, вызванные тем, что индекс не содержал исходных данных для разреженных векторов.<a href="https://github.com/milvus-io/milvus/pull/39146">(#39146</a>)</li>
<li>Исправлено возможное состояние гонки полей столбцов, вызванное одновременным выполнением запросов и загрузкой данных.<a href="https://github.com/milvus-io/milvus/pull/39152">(#39152</a>)</li>
<li>Исправлены ошибки массовой вставки, когда поля nullable или default_value не были включены в данные.<a href="https://github.com/milvus-io/milvus/pull/39111">(#39111</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Улучшения</h3><ul>
<li>Добавлен API группы ресурсов для RESTful-интерфейса.<a href="https://github.com/milvus-io/milvus/pull/39092">(#39092</a>)</li>
<li>Оптимизирована производительность извлечения данных за счет использования SIMD-методов битового набора.<a href="https://github.com/milvus-io/milvus/pull/39041">(#39041</a>)</li>
<li>Используется временная метка MVCC в качестве гарантийной временной метки, если она указана.<a href="https://github.com/milvus-io/milvus/pull/39019">(#39019</a>)</li>
<li>Добавлены недостающие метрики удаления.<a href="https://github.com/milvus-io/milvus/pull/38747">(#38747</a>)</li>
<li>Обновлен Etcd до версии v3.5.16.<a href="https://github.com/milvus-io/milvus/pull/38969">(#38969</a>)</li>
<li>Создан новый пакет Go для управления протосами.<a href="https://github.com/milvus-io/milvus/pull/39128">(#39128</a>)</li>
</ul>
<h2 id="v252" class="common-anchor-header">v2.5.2<button data-href="#v252" class="anchor-icon" translate="no">
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
    </button></h2><p>Дата выхода: 3 января 2025 г.</p>
<table>
<thead>
<tr><th>Версия Milvus</th><th>Версия Python SDK</th><th>Версия SDK для Node.js</th><th>Версия Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.2</td><td>2.5.3</td><td>2.5.3</td><td>2.5.3</td></tr>
</tbody>
</table>
<p>Milvus 2.5.2 поддерживает изменение максимальной длины столбцов VARCHAR и решает несколько критических проблем, связанных с параллелизмом, падениями разделов и обработкой статистики BM25 при импорте. Мы настоятельно рекомендуем обновиться до этой версии для повышения стабильности и производительности.</p>
<h3 id="Improvements" class="common-anchor-header">Улучшения</h3><ul>
<li>Генерирование журналов использования диска только в том случае, если указанный путь не существует.<a href="https://github.com/milvus-io/milvus/pull/38822">(#38822</a>)</li>
<li>Добавлен параметр для настройки максимальной длины VARCHAR и восстановлено ограничение до 65 535.<a href="https://github.com/milvus-io/milvus/pull/38883">(#38883</a>)</li>
<li>Поддерживается преобразование типов параметров для выражений.<a href="https://github.com/milvus-io/milvus/pull/38782">(#38782</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Исправления ошибок</h3><ul>
<li>Исправлены потенциальные тупики в сценариях параллелизма.<a href="https://github.com/milvus-io/milvus/pull/38863">(#38863</a>)</li>
<li>Генерировался файл index_null_offset только для полей, поддерживающих нулевые значения.<a href="https://github.com/milvus-io/milvus/pull/38834">(#38834</a>)</li>
<li>Исправлено использование плана извлечения после освобождения в фазе уменьшения.<a href="https://github.com/milvus-io/milvus/pull/38841">(#38841</a>)</li>
<li>Распознавание выражений с заглавными буквами AND и OR.<a href="https://github.com/milvus-io/milvus/pull/38928">(#38928</a>)</li>
<li>Разрешено успешное удаление разделов даже при неудачной загрузке.<a href="https://github.com/milvus-io/milvus/pull/38874">(#38874</a>)</li>
<li>Исправлены проблемы с регистрацией файла статистики BM25 при импорте.<a href="https://github.com/milvus-io/milvus/pull/38881">(#38881</a>)</li>
</ul>
<h2 id="v251" class="common-anchor-header">v2.5.1<button data-href="#v251" class="anchor-icon" translate="no">
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
    </button></h2><p>Дата выхода: 26 декабря 2024 года</p>
<table>
<thead>
<tr><th>Версия Milvus</th><th>Версия Python SDK</th><th>Версия SDK для Node.js</th><th>Версия Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.1</td><td>2.5.2</td><td>2.5.2</td><td>2.5.2</td></tr>
</tbody>
</table>
<p>В Milvus 2.5.1 исправлен ряд ошибок, касающихся загрузки памяти, списков RBAC, балансировки узлов запросов и индексации сегментов с уплотнениями, а также улучшены веб-интерфейс и перехватчики. Мы настоятельно рекомендуем обновиться до версии 2.5.1 для повышения стабильности и надежности.</p>
<h3 id="Improvement" class="common-anchor-header">Улучшения</h3><ul>
<li>Обновление страниц коллекции и запросов в веб-интерфейсе.<a href="https://github.com/milvus-io/milvus/pull/38701">(#38701</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Исправления ошибок</h3><ul>
<li>Исправлены проблемы OOM путем добавления фактора памяти к оценкам загрузки.<a href="https://github.com/milvus-io/milvus/pull/38722">(#38722</a>)</li>
<li>Исправлено расширение групп привилегий при перечислении политик в RootCoord.<a href="https://github.com/milvus-io/milvus/pull/38760">(#38760</a>)</li>
<li>Исправлены проблемы со списком групп привилегий и коллекций.<a href="https://github.com/milvus-io/milvus/pull/38738">(#38738</a>)</li>
<li>Исправлен балансировщик, чтобы избежать повторной перегрузки одного и того же узла запроса.<a href="https://github.com/milvus-io/milvus/pull/38724">(#38724</a>)</li>
<li>Исправлены неожиданные задачи балансировщика, запускаемые после перезапуска QueryCoord.<a href="https://github.com/milvus-io/milvus/pull/38725">(#38725</a>)</li>
<li>Исправлено обновление конфигурации нагрузки, которое не применялось к загружаемым коллекциям.<a href="https://github.com/milvus-io/milvus/pull/38737">(#38737</a>)</li>
<li>Исправлен нулевой счетчик чтения при импорте данных.<a href="https://github.com/milvus-io/milvus/pull/38695">(#38695</a>)</li>
<li>Исправлено декодирование юникода для JSON-ключей в выражениях.<a href="https://github.com/milvus-io/milvus/pull/38653">(#38653</a>)</li>
<li>Исправлено имя БД перехватчика для alterCollectionField в 2.5. <a href="https://github.com/milvus-io/milvus/pull/38663">(#38663</a>)</li>
<li>Исправлены пустые параметры индекса для запечатанных сегментов при использовании перебора BM25.<a href="https://github.com/milvus-io/milvus/pull/38752">(#38752</a>)</li>
</ul>
<h2 id="v250" class="common-anchor-header">v2.5.0<button data-href="#v250" class="anchor-icon" translate="no">
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
    </button></h2><p>Дата выхода: 23 декабря 2024 года</p>
<table>
<thead>
<tr><th>Версия Milvus</th><th>Версия Python SDK</th><th>Версия SDK для Node.js</th><th>Версия Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.0</td><td>2.5.1</td><td>2.5.2</td><td>2.5.2</td></tr>
</tbody>
</table>
<p>В Milvus 2.5.0 реализованы значительные улучшения, повышающие удобство использования, масштабируемость и производительность для пользователей, работающих с векторным поиском и управлением крупномасштабными данными. В этом выпуске Milvus интегрирует новые мощные функции, такие как поиск по терминам, уплотнение кластеров для оптимизации запросов и универсальная поддержка методов поиска по разреженным и плотным векторам. Усовершенствования в управлении кластерами, индексировании и обработке данных обеспечивают новые уровни гибкости и простоты использования, делая Milvus еще более надежной и удобной векторной базой данных.</p>
<h3 id="Key-Features" class="common-anchor-header">Ключевые особенности</h3><h4 id="Full-Text-Search" class="common-anchor-header">Полнотекстовый поиск</h4><p>Milvus 2.5 поддерживает полнотекстовый поиск, реализованный с помощью Sparse-BM25! Эта функция является важным дополнением к сильным возможностям семантического поиска Milvus, особенно в сценариях, связанных с редкими словами или техническими терминами. В предыдущих версиях Milvus поддерживал разреженные векторы для помощи в сценариях поиска по ключевым словам. Эти разреженные векторы генерировались вне Milvus с помощью нейронных моделей, таких как SPLADEv2/BGE-M3, или статистических моделей, таких как алгоритм BM25.</p>
<p>Milvus 2.5, работающий на базе <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, имеет встроенные анализаторы и извлечение разреженных векторов, расширяя API от получения только векторов в качестве входных данных до прямого приема текста. Статистическая информация BM25 обновляется в реальном времени по мере ввода данных, что повышает удобство использования и точность. Кроме того, разреженные векторы, основанные на алгоритмах приближенного поиска ближайших соседей (ANN), обеспечивают более высокую производительность по сравнению со стандартными системами поиска по ключевым словам.</p>
<p>Подробнее см. в разделах <a href="/docs/ru/analyzer-overview.md">Обзор анализатора</a> и <a href="/docs/ru/full-text-search.md">Полнотекстовый поиск</a>.</p>
<h4 id="Cluster-Management-WebUI-Beta" class="common-anchor-header">Веб-интерфейс управления кластерами (бета-версия)</h4><p>Чтобы лучше поддерживать огромные данные и богатые возможности, сложная конструкция Milvus включает в себя различные зависимости, многочисленные роли узлов, сложные структуры данных и многое другое. Эти аспекты могут создавать проблемы при использовании и обслуживании.</p>
<p>В Milvus 2.5 появился встроенный WebUI для управления кластерами, который снижает сложность обслуживания системы за счет визуализации сложной информации о среде выполнения Milvus. Сюда входят сведения о базах данных и коллекциях, сегментах, каналах, зависимостях, состоянии здоровья узлов, информация о задачах, медленных запросах и многое другое.</p>
<p>Подробнее см. в разделе <a href="/docs/ru/milvus-webui.md">Milvus WebUI</a>.</p>
<h4 id="Text-Match" class="common-anchor-header">Текстовое соответствие</h4><p>Milvus 2.5 использует анализаторы и индексацию от <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a> для предварительной обработки текста и создания индекса, поддерживая точное сопоставление текстовых данных на естественном языке на основе определенных терминов. Эта функция в основном используется для фильтрации поиска по определенным условиям и может включать скалярную фильтрацию для уточнения результатов запроса, позволяя искать сходство в векторах, удовлетворяющих скалярным критериям.</p>
<p>Подробнее см. в разделах <a href="/docs/ru/analyzer-overview.md">"Обзор анализатора</a> " и <a href="/docs/ru/keyword-match.md">"Подбор текста"</a>.</p>
<h4 id="Bitmap-Index" class="common-anchor-header">Индекс растровых изображений</h4><p>В семействе Milvus появился новый скалярный индекс данных. Индекс BitMap использует массив битов, длина которого равна количеству строк, для представления существования значений и ускорения поиска.</p>
<p>Битовые индексы традиционно эффективны для полей с низкой кардинальностью, которые имеют небольшое количество различных значений - например, столбец, содержащий информацию о поле, имеет только два возможных значения: male и female.</p>
<p>Подробнее см. в разделе <a href="/docs/ru/bitmap.md">Растровый индекс</a>.</p>
<h4 id="Nullable--Default-Value" class="common-anchor-header">Нулевое значение и значение по умолчанию</h4><p>Milvus теперь поддерживает установку нулевых свойств и значений по умолчанию для скалярных полей, отличных от поля первичного ключа. Для скалярных полей, помеченных как <code translate="no">nullable=True</code>, пользователи могут опускать поле при вставке данных; система будет рассматривать его как нулевое значение или значение по умолчанию (если оно установлено) без возникновения ошибки.</p>
<p>Значения по умолчанию и свойства с возможностью обнуления обеспечивают большую гибкость Milvus. Пользователи могут использовать эту функцию для полей с неопределенными значениями при создании коллекций. Она также упрощает миграцию данных из других систем баз данных в Milvus, позволяя работать с наборами данных, содержащими нулевые значения, с сохранением исходных настроек значений по умолчанию.</p>
<p>Подробности см. в разделе <a href="/docs/ru/nullable-and-default.md">"Нулевые значения и значения по умолчанию</a>".</p>
<h4 id="Faiss-based-HNSW-SQPQPRQ" class="common-anchor-header">HNSW SQ/PQ/PRQ на основе Faiss</h4><p>Благодаря тесному сотрудничеству с сообществом Faiss, алгоритм HNSW в Faiss был значительно улучшен как в плане функциональности, так и в плане производительности. Из соображений стабильности и удобства сопровождения Milvus 2.5 официально перенес поддержку HNSW из hnswlib в Faiss.</p>
<p>Основываясь на Faiss, Milvus 2.5 поддерживает несколько методов квантования в HNSW для удовлетворения потребностей различных сценариев: SQ (Scalar Quantizers), PQ (Product Quantizer) и PRQ (Product Residual Quantizer). SQ и PQ более распространены; SQ обеспечивает хорошую производительность запросов и скорость сборки, в то время как PQ предлагает лучший отзыв при том же коэффициенте сжатия. Во многих векторных базах данных обычно используется бинарное квантование, которое является простой формой квантования SQ.</p>
<p>PRQ - это объединение PQ и AQ (аддитивного квантования). По сравнению с PQ, он требует больше времени на сборку, но обеспечивает лучший отзыв, особенно при высокой степени сжатия, говоря о двоичном сжатии.</p>
<h4 id="Clustering-Compaction-Beta" class="common-anchor-header">Кластерное уплотнение (бета-версия)</h4><p>В Milvus 2.5 появилась функция Clustering Compaction для ускорения поиска и снижения затрат в больших коллекциях. При указании скалярного поля в качестве ключа кластеризации данные перераспределяются по диапазонам для оптимизации хранения и поиска. Действуя подобно глобальному индексу, эта функция позволяет Milvus эффективно отсеивать данные при запросах на основе метаданных кластеризации, повышая производительность поиска при применении скалярных фильтров.</p>
<p>Подробности см. в разделе <a href="/docs/ru/clustering-compaction.md">"Компактификация кластеризации</a>".</p>
<h3 id="Other-Features" class="common-anchor-header">Другие возможности</h3><h4 id="Streaming-Node-Beta" class="common-anchor-header">Потоковый узел (бета-версия)</h4><p>В Milvus 2.5 появился новый компонент, называемый потоковым узлом, который предоставляет услуги ведения журнала с опережением записи (WAL). Это позволяет Milvus достигать консенсуса до и после чтения и записи каналов, открывая новые возможности, функционал и оптимизации. Эта функция отключена по умолчанию в Milvus 2.5 и будет официально доступна в версии 3.0.</p>
<h4 id="IPv6-Support" class="common-anchor-header">Поддержка IPv6</h4><p>Milvus теперь поддерживает IPv6, что позволяет расширить возможности сетевого подключения и совместимость.</p>
<h4 id="CSV-Bulk-Import" class="common-anchor-header">Массовый импорт CSV</h4><p>В дополнение к форматам JSON и Parquet, Milvus теперь поддерживает прямой массовый импорт данных в формате CSV.</p>
<h4 id="Expression-Templates-for-Query-Acceleration" class="common-anchor-header">Шаблоны выражений для ускорения запросов</h4><p>Milvus теперь поддерживает шаблоны выражений, что повышает эффективность разбора выражений, особенно в сценариях со сложными выражениями.</p>
<p>Подробности см. в разделе <a href="/docs/ru/filtering-templating.md">Шаблонизация фильтров</a>.</p>
<h4 id="GroupBy-Enhancements" class="common-anchor-header">Усовершенствования GroupBy</h4><ul>
<li><strong>Настраиваемый размер группы</strong>: Добавлена поддержка указания количества записей, возвращаемых для каждой группы.</li>
<li><strong>Гибридный поиск GroupBy</strong>: Поддерживается гибридный поиск GroupBy на основе нескольких векторных столбцов.</li>
</ul>
<h4 id="Iterator-Enhancements" class="common-anchor-header">Усовершенствования итератора</h4><ul>
<li><strong>Поддержка MVCC</strong>: Пользователи теперь могут использовать итераторы без последствий последующих изменений данных, таких как вставки и удаления, благодаря Multi-Version Concurrency Control (MVCC).</li>
<li><strong>Постоянный курсор</strong>: Milvus теперь поддерживает постоянный курсор для QueryIterator, что позволяет пользователям возобновить итерацию с последней позиции после перезапуска Milvus без необходимости перезапускать весь процесс итерации.</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Улучшения</h3><h4 id="Deletion-Optimization" class="common-anchor-header">Оптимизация удаления</h4><p>Повышена скорость и снижено потребление памяти при масштабных удалениях за счет оптимизации использования блокировок и управления памятью.</p>
<h4 id="Dependencies-Upgrade" class="common-anchor-header">Обновление зависимостей</h4><p>Обновление до ETCD 3.5.16 и Pulsar 3.0.7 LTS, исправляющее существующие CVE и повышающее безопасность. Примечание: Обновление до Pulsar 3.x не совместимо с предыдущими версиями 2.x.</p>
<p>Для пользователей, у которых уже есть рабочее развертывание Milvus, необходимо обновить компоненты ETCD и Pulsar, прежде чем вы сможете использовать новые возможности и функции. Подробности см. в разделе <a href="/docs/ru/upgrade-pulsar-v3.md">Обновление Pulsar с версии 2.x до версии 3.x.</a></p>
<h4 id="Local-Storage-V2" class="common-anchor-header">Локальное хранилище V2</h4><p>В Milvus 2.5 представлен новый формат локальных файлов, что повышает эффективность загрузки и запросов для скалярных данных, снижает нагрузку на память и закладывает основу для будущих оптимизаций.</p>
<h4 id="Expression-Parsing-Optimization" class="common-anchor-header">Оптимизация разбора выражений</h4><p>Улучшение разбора выражений за счет внедрения кэширования повторяющихся выражений, обновления ANTLR и оптимизации производительности клаузул <code translate="no">NOT IN</code>.</p>
<h4 id="Improved-DDL-Concurrency-Performance" class="common-anchor-header">Улучшение производительности параллелизма DDL</h4><p>Оптимизирована производительность параллелизма операций языка определения данных (DDL).</p>
<h4 id="RESTful-API-Feature-Alignment" class="common-anchor-header">Выравнивание функций RESTful API</h4><p>Согласование функциональных возможностей RESTful API с другими SDK для обеспечения согласованности.</p>
<h4 id="Security--Configuration-Updates" class="common-anchor-header">Обновления в области безопасности и конфигурации</h4><p>Поддержка TLS для защиты межузловой связи в более сложных или корпоративных средах. Подробности см. в разделе <a href="/docs/ru/tls.md">Конфигурация безопасности</a>.</p>
<h4 id="Compaction-Performance-Enhancements" class="common-anchor-header">Повышение производительности уплотнения</h4><p>Устранены ограничения на максимальное количество сегментов при смешанном уплотнении, теперь приоритет отдается меньшим сегментам, что повышает эффективность и ускоряет запросы к большим или фрагментированным наборам данных.</p>
<h4 id="Score-Based-Channel-Balancing" class="common-anchor-header">Балансировка каналов на основе баллов</h4><p>Внедрена политика, которая динамически распределяет нагрузку между каналами, повышая эффективность использования ресурсов и общую стабильность в крупномасштабных развертываниях.</p>
