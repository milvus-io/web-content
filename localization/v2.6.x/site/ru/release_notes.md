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
<h2 id="v269" class="common-anchor-header">v2.6.9<button data-href="#v269" class="anchor-icon" translate="no">
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
    </button></h2><p>Дата выхода: 16 января 2026 года</p>
<table>
<thead>
<tr><th style="text-align:left">Версия Milvus</th><th style="text-align:left">Версия Python SDK</th><th style="text-align:left">Node.js SDK Версия</th><th style="text-align:left">Java SDK Версия</th><th style="text-align:left">Go SDK Версия</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.9</td><td style="text-align:left">2.6.6</td><td style="text-align:left">2.6.9</td><td style="text-align:left">2.6.12</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Мы рады сообщить о выходе обновления Milvus 2.6.9! В этом обновлении добавлены баллы подсветки для результатов поиска, улучшено управление сегментами с поддержкой повторного открытия сегментов при изменении данных или схемы, а также улучшена обработка версий хранилища. Среди ключевых улучшений - повышение производительности протоколирования, усиление контроля безопасности для конечных точек выражения, а также оптимизация текстовых анализаторов и построения индексов. В этом выпуске также решены критические проблемы, включая точность оценки памяти, преобразование геометрических данных и различные исправления стабильности. Мы рекомендуем всем пользователям ветки 2.6 перейти на эту версию для повышения надежности и производительности системы.</p>
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
<li>Поддержка поиска по первичным ключам<a href="https://github.com/milvus-io/milvus/pull/46528">(#46528</a>)</li>
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
<li>Добавлена метрика метки версии хранилища для лучшей наблюдаемости<a href="https://github.com/milvus-io/milvus/pull/47014">(#47014</a>)</li>
<li>QueryCoord теперь поддерживает повторное открытие сегментов при изменении пути манифеста<a href="https://github.com/milvus-io/milvus/pull/46921">(#46921</a>)</li>
<li>Добавлена поддержка повторного открытия сегментов при изменении данных или схемы<a href="https://github.com/milvus-io/milvus/pull/46412">(#46412</a>)</li>
<li>Улучшена производительность и эффективность медленного журнала<a href="https://github.com/milvus-io/milvus/pull/47086">(#47086</a>)</li>
<li>Добавлена политика уплотнения обновлений версий хранилища для облегчения миграции версий<a href="https://github.com/milvus-io/milvus/pull/47011">(#47011</a>)</li>
<li>Устранены лишние операции копирования памяти для журналирования на C++ для повышения производительности<a href="https://github.com/milvus-io/milvus/pull/46992">(#46992</a>)</li>
<li>Добавлены элементы управления безопасностью для конечной точки /expr для предотвращения несанкционированного доступа<a href="https://github.com/milvus-io/milvus/pull/46978">(#46978</a>)</li>
<li>Служба потоковой передачи теперь остается включенной до тех пор, пока не будет достигнуто необходимое количество узлов потоковой передачи<a href="https://github.com/milvus-io/milvus/pull/46982">(#46982</a>)</li>
<li>Удалены избыточные операции etcd put при обновлении информации о сегменте<a href="https://github.com/milvus-io/milvus/pull/46794">(#46794</a>)</li>
<li>Улучшена проверка количества строк и уменьшено количество недостоверных предупреждающих журналов при уплотнении сортировки<a href="https://github.com/milvus-io/milvus/pull/46824">(#46824</a>)</li>
<li>Очищены и упорядочены сообщения журнала индексов сборки<a href="https://github.com/milvus-io/milvus/pull/46769">(#46769</a>)</li>
<li>Ограничено количество одновременных построений векторных индексов на одном рабочем, чтобы предотвратить истощение ресурсов<a href="https://github.com/milvus-io/milvus/pull/46877">(#46877</a>)</li>
<li>Оптимизированы операции клонирования анализаторов jieba и lindera для повышения производительности<a href="https://github.com/milvus-io/milvus/pull/46757">(#46757</a>)</li>
<li>Добавлен glog sink для передачи логов CGO в zap logger для унифицированного протоколирования<a href="https://github.com/milvus-io/milvus/pull/46741">(#46741</a>)</li>
<li>Принудительное использование формата хранения V2 и отказ от записи в V1<a href="https://github.com/milvus-io/milvus/pull/46889">(#46889</a>)</li>
<li>Реализована пакетная обработка для операций с ngram для повышения эффективности<a href="https://github.com/milvus-io/milvus/pull/46703">(#46703</a>)</li>
<li>Добавлен механизм автоматических повторных попыток для операций записи в бинлог для повышения надежности<a href="https://github.com/milvus-io/milvus/pull/46854">(#46854</a>)</li>
<li>Отфильтрованы пустые сообщения timetick на стороне потребления для сокращения ненужной обработки<a href="https://github.com/milvus-io/milvus/pull/46730">(#46730</a>)</li>
<li>Улучшен поиск по первичному ключу с проверкой дубликатов и автоматическим выводом anns_field<a href="https://github.com/milvus-io/milvus/pull/46745">(#46745</a>)</li>
<li>Добавлена поддержка параметров размерности для провайдеров встраивания siliconflow и cohere<a href="https://github.com/milvus-io/milvus/pull/47081">(#47081</a>)</li>
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
<li>Исправлен двойной подсчет индексной памяти при оценке загрузки сегментов<a href="https://github.com/milvus-io/milvus/pull/47046">(#47046</a>)</li>
<li>Исправлены проблемы компиляции на macOS 14<a href="https://github.com/milvus-io/milvus/pull/47048">(#47048</a>)</li>
<li>Использование ревизии в качестве глобальной версии обнаружения потокового сервиса для лучшей согласованности<a href="https://github.com/milvus-io/milvus/pull/47023">(#47023</a>)</li>
<li>Убедились, что все фьючерсы завершаются при исключении, чтобы предотвратить сбои use-after-free<a href="https://github.com/milvus-io/milvus/pull/46960">(#46960</a>)</li>
<li>Исправлен перехватчик шардов, некорректно пропускающий операции <code translate="no">FlushAllMsg</code> <a href="https://github.com/milvus-io/milvus/pull/47004">(#47004</a>)</li>
<li>Добавлена проверка валидности диапазона для TTL коллекции для предотвращения некорректных конфигураций<a href="https://github.com/milvus-io/milvus/pull/47010">(#47010</a>)</li>
<li>Исправлена ошибка, из-за которой <code translate="no">GetCredentialInfo</code> не кэшировал RPC-ответы<a href="https://github.com/milvus-io/milvus/pull/46945">(#46945</a>)</li>
<li>Исправлена проблема, при которой <code translate="no">AlterFunction</code> не мог быть вызван, когда несколько функций становились недействительными<a href="https://github.com/milvus-io/milvus/pull/46986">(#46986</a>)</li>
<li>Исправлена ошибка уплотнения файла с нулевым смещением инвертированного индекса<a href="https://github.com/milvus-io/milvus/pull/46950">(#46950</a>)</li>
<li>Исправлено падение при использовании is_null_expr на индексированных полях JSON<a href="https://github.com/milvus-io/milvus/pull/46894">(#46894</a>)</li>
<li>Добавлена проверка на флаг allow_insert_auto_id в RESTful v2 insert API<a href="https://github.com/milvus-io/milvus/pull/46931">(#46931</a>)</li>
<li>Добавлена проверка существования полей в группах колонок перед чтением из манифеста loon<a href="https://github.com/milvus-io/milvus/pull/46924">(#46924</a>)</li>
<li>Исправлена ошибка, при которой параметр highlight работал некорректно<a href="https://github.com/milvus-io/milvus/pull/46876">(#46876</a>)</li>
<li>Центр квот теперь игнорирует делегатора, когда тот находится в состоянии восстановления<a href="https://github.com/milvus-io/milvus/pull/46858">(#46858</a>)</li>
<li>Выровнены опции преобразования WKT/WKB для обеспечения согласованного поведения во всех операциях<a href="https://github.com/milvus-io/milvus/pull/46874">(#46874</a>)</li>
<li>Исправлена ошибка voyageai model int8<a href="https://github.com/milvus-io/milvus/pull/46821">(#46821</a>)</li>
<li>Исправлена недостаточная обработка <code translate="no">FlushAllMsg</code> в операциях восстановления хранилища<a href="https://github.com/milvus-io/milvus/pull/46803">(#46803</a>)</li>
<li>Исправлено отсутствие поля shardclientmgr в querytask для предотвращения паники<a href="https://github.com/milvus-io/milvus/pull/46838">(#46838</a>)</li>
<li>Использование leaderid для проверки устаревания leaderaction в планировщике для повышения точности<a href="https://github.com/milvus-io/milvus/pull/46788">(#46788</a>)</li>
<li>Восстановлена поддержка tenant/namespace для Pulsar, которая была потеряна в 2.6<a href="https://github.com/milvus-io/milvus/pull/46759">(#46759</a>)</li>
<li>Добавлен наблюдатель за конфигурацией загрузки для предотвращения потери изменений конфигурации загрузки<a href="https://github.com/milvus-io/milvus/pull/46786">(#46786</a>)</li>
<li>Исправлена ошибка интерфейса редактирования функций<a href="https://github.com/milvus-io/milvus/pull/46782">(#46782</a>)</li>
<li>Добавлена проверка свойства TTL коллекции для предотвращения зацикливания уплотнения<a href="https://github.com/milvus-io/milvus/pull/46736">(#46736</a>)</li>
</ul>
<h2 id="v268" class="common-anchor-header">v2.6.8<button data-href="#v268" class="anchor-icon" translate="no">
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
    </button></h2><p>Дата выпуска: 4 января 2026 года</p>
<table>
<thead>
<tr><th style="text-align:left">Версия Milvus</th><th style="text-align:left">Версия Python SDK</th><th style="text-align:left">Node.js SDK Версия</th><th style="text-align:left">Java SDK Версия</th><th style="text-align:left">Go SDK Версия</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.8</td><td style="text-align:left">2.6.6</td><td style="text-align:left">2.6.9</td><td style="text-align:left">2.6.11</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Мы рады сообщить о выходе Milvus 2.6.8! В этой версии введена подсветка результатов поиска, что значительно улучшает удобство поиска. Под капотом мы оптимизировали обработку запросов, планирование ресурсов и механизмы кэширования, чтобы обеспечить превосходную производительность и стабильность. Кроме того, в этом выпуске исправлены критические ошибки, связанные с безопасностью данных, обработкой хранилищ и параллелизмом. Мы настоятельно рекомендуем всем пользователям перейти на эту версию для повышения эффективности и надежности производственной среды.</p>
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
<li>Поддерживается поиск с выделением текста. Подробности см. в разделе <a href="/docs/ru/text-highlighter.md">"Выделитель текста"</a>. <a href="https://github.com/milvus-io/milvus/pull/46052">(#46052</a>)</li>
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
<li>Перемещена логика оптимизации запросов в прокси для повышения производительности<a href="https://github.com/milvus-io/milvus/pull/46549">(#46549</a>)</li>
<li>Оптимизирована производительность оператора <code translate="no">LIKE</code> при использовании STL-сортировки<a href="https://github.com/milvus-io/milvus/pull/46535">(#46535</a>)</li>
<li>Включено одновременное выполнение задач текстового индекса для нескольких полей<a href="https://github.com/milvus-io/milvus/pull/46306">(#46306</a>)</li>
<li>Поддержка приостановки GC на уровне коллекции<a href="https://github.com/milvus-io/milvus/pull/46201">(#46201</a>)</li>
<li>Реализована политика штрафов для QueryNodes для обработки исчерпания ресурсов<a href="https://github.com/milvus-io/milvus/pull/46086">(#46086</a>)</li>
<li>Оптимизировано кэширование данных путем отображения нескольких групп строк на одну ячейку кэша<a href="https://github.com/milvus-io/milvus/pull/46542">(#46542</a>)</li>
<li>Снижено использование процессора в QuotaCenter<a href="https://github.com/milvus-io/milvus/pull/46615">(#46615</a>)</li>
<li>Улучшена производительность сравнения данных <code translate="no">TIMESTAMPTZ</code> <a href="https://github.com/milvus-io/milvus/pull/46655">(#46655</a>)</li>
<li>Поддержка нулевых динамических полей с пустым JSON-объектом в качестве значения по умолчанию<a href="https://github.com/milvus-io/milvus/pull/46445">(#46445</a>)</li>
<li>Предотвращение ненужного уплотнения сегментов при изменении только свойств коллекции<a href="https://github.com/milvus-io/milvus/pull/46489">(#46489</a>)</li>
<li>Поддержка пересылки DML и DQL в Proxy for RESTful v2<a href="https://github.com/milvus-io/milvus/pull/46021">(#46021</a>, <a href="https://github.com/milvus-io/milvus/pull/46037">#46037</a>)</li>
<li>Добавлен механизм повторных попыток для чтения из хранилища объектов при ошибках ограничения скорости<a href="https://github.com/milvus-io/milvus/pull/46464">(#46464</a>)</li>
<li>Улучшено протоколирование для мета-таблиц Proxy и RootCoord<a href="https://github.com/milvus-io/milvus/pull/46701">(#46701</a>)</li>
<li>Добавлена проверка для встраивания моделей и типов полей схем<a href="https://github.com/milvus-io/milvus/pull/46422">(#46422</a>)</li>
<li>Введена длительность допуска для задержки операций сброса коллекции<a href="https://github.com/milvus-io/milvus/pull/46252">(#46252</a>)</li>
<li>Улучшено планирование индексных задач за счет оценки слотов на основе размера и типа поля<a href="https://github.com/milvus-io/milvus/pull/46276">(#46276</a>, <a href="https://github.com/milvus-io/milvus/pull/45851">#45851</a>)</li>
<li>Добавлен механизм отката для путей записи при доступе к хранилищу объектов без поддержки записи по условию<a href="https://github.com/milvus-io/milvus/pull/46022">(#46022</a>)</li>
<li>Оптимизирована логика синхронизации оракула IDF<a href="https://github.com/milvus-io/milvus/pull/46079">(#46079</a>)</li>
<li>Изменен порт RootCoord по умолчанию на неэфемерный порт<a href="https://github.com/milvus-io/milvus/pull/46268">(#46268</a>)</li>
<li>Добавлены метрики для мониторинга кэшированной памяти Jemalloc<a href="https://github.com/milvus-io/milvus/pull/45973">(#45973</a>)</li>
<li>Улучшена точность метрики дисковой квоты при изменении кластерной квоты<a href="https://github.com/milvus-io/milvus/pull/46304">(#46304</a>)</li>
<li>Улучшена наблюдаемость трассировки для скалярных выражений<a href="https://github.com/milvus-io/milvus/pull/45823">(#45823</a>)</li>
<li>Отклонение дублирующихся первичных ключей в пакетных запросах upsert<a href="https://github.com/milvus-io/milvus/pull/46035">(#46035</a>)</li>
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
<li>Исправлено сопоставление префиксов RBAC ETCD для предотвращения потенциальной утечки данных<a href="https://github.com/milvus-io/milvus/pull/46708">(#46708</a>)</li>
<li>Исправлена некорректная обработка корневого пути для режима локального хранения<a href="https://github.com/milvus-io/milvus/pull/46693">(#46693</a>)</li>
<li>Исправлена обработка смешанных типов <code translate="no">int64</code>/<code translate="no">float</code> в полях JSON<a href="https://github.com/milvus-io/milvus/pull/46682">(#46682</a>)</li>
<li>Исправлены сбои при загрузке текстового журнала во время обновления кластера<a href="https://github.com/milvus-io/milvus/pull/46698">(#46698</a>)</li>
<li>Предотвращено удаление других полей при очистке сырых данных<a href="https://github.com/milvus-io/milvus/pull/46689">(#46689</a>)</li>
<li>Исправлен сбой при использовании подсветки с несколькими анализаторами<a href="https://github.com/milvus-io/milvus/pull/46664">(#46664</a>)</li>
<li>Обеспечена очистка журналов при выходе из ОС<a href="https://github.com/milvus-io/milvus/pull/46609">(#46609</a>)</li>
<li>Исправлена ошибка превышения лимита размера ETCD RPC при сбросе коллекций<a href="https://github.com/milvus-io/milvus/pull/46645">(#46645</a>)</li>
<li>Исправлены проблемы с задержкой репликации, когда сервер простаивает<a href="https://github.com/milvus-io/milvus/pull/46612">(#46612</a>)</li>
<li>Исправлена проверка недействительных значений по умолчанию <code translate="no">TIMESTAMPTZ</code> <a href="https://github.com/milvus-io/milvus/pull/46556">(#46556</a>)</li>
<li>Исправлено восстановление задач уплотнения для обеспечения правильной очистки<a href="https://github.com/milvus-io/milvus/pull/46578">(#46578</a>)</li>
<li>Унифицирована обработка узлов, доступных только для чтения, чтобы избежать застревания задач канала баланса<a href="https://github.com/milvus-io/milvus/pull/46513">(#46513</a>)</li>
<li>Предотвращено выпадение данных полей для групп столбцов с несколькими полями<a href="https://github.com/milvus-io/milvus/pull/46425">(#46425</a>)</li>
<li>Удалены устаревшие прокси-клиенты при повторном просмотре ETCD<a href="https://github.com/milvus-io/milvus/pull/46490">(#46490</a>)</li>
<li>Исправлен порядок слияния итераторов чанков<a href="https://github.com/milvus-io/milvus/pull/46462">(#46462</a>)</li>
<li>Предотвращение создания групп потребителей Kafka при отключении автокоммита<a href="https://github.com/milvus-io/milvus/pull/46509">(#46509</a>)</li>
<li>Запрещена горячая загрузка параметров многоуровневого хранилища<a href="https://github.com/milvus-io/milvus/pull/46438">(#46438</a>)</li>
<li>Включен поисковый итератор для бинарных векторов<a href="https://github.com/milvus-io/milvus/pull/46334">(#46334</a>)</li>
<li>Исправлено состояние гонки при инициализации хранилища<a href="https://github.com/milvus-io/milvus/pull/46338">(#46338</a>)</li>
<li>Исправлена неработающая подсветка запросов при поиске не в BM25<a href="https://github.com/milvus-io/milvus/pull/46295">(#46295</a>)</li>
<li>Исправлено переполнение стека при сборке мусора JSON<a href="https://github.com/milvus-io/milvus/pull/46318">(#46318</a>)</li>
<li>Обеспечение повторных попыток при записи бинлогов<a href="https://github.com/milvus-io/milvus/pull/46310">(#46310</a>)</li>
<li>Исправлена проверка использования индекса для полей JSON<a href="https://github.com/milvus-io/milvus/pull/46281">(#46281</a>)</li>
<li>Предотвращена блокировка обновления цели при отсутствии узлов у реплик во время масштабирования<a href="https://github.com/milvus-io/milvus/pull/46291">(#46291</a>)</li>
<li>Ограничение токенизатора <code translate="no">char_group</code> на поддержку только однобайтовых разделителей<a href="https://github.com/milvus-io/milvus/pull/46196">(#46196</a>)</li>
<li>Пропущено использование индекса пути JSON, если путь запроса включает числа<a href="https://github.com/milvus-io/milvus/pull/46247">(#46247</a>)</li>
<li>Исправлены ошибки конкатенации путей в MinIO, когда корневой путь имеет вид "."<a href="https://github.com/milvus-io/milvus/pull/46221">(#46221</a>)</li>
<li>Исправлены ложноположительные проверки здоровья путем корректировки расчета метрики задержки репликации<a href="https://github.com/milvus-io/milvus/pull/46122">(#46122</a>)</li>
<li>Исправлен парсинг RESTful v2 и настройки схемы по умолчанию с <code translate="no">TIMESTAMPTZ</code> <a href="https://github.com/milvus-io/milvus/pull/46239">(#46239</a>)</li>
<li>Исправлена паника при поиске пустых результатов с полями выходной геометрии<a href="https://github.com/milvus-io/milvus/pull/46231">(#46231</a>)</li>
<li>Добавлена проверка выравнивания данных полей для предотвращения паники при частичном обновлении<a href="https://github.com/milvus-io/milvus/pull/46180">(#46180</a>)</li>
<li>Исправлена проблема потери базы данных в RESTful v2<a href="https://github.com/milvus-io/milvus/pull/46172">(#46172</a>)</li>
<li>Исправлено некорректное использование контекста в клиентских сессиях gRPC<a href="https://github.com/milvus-io/milvus/pull/46184">(#46184</a>)</li>
<li>Исправлена некорректная переадресация авторизации в RESTful v2 во время обновлений<a href="https://github.com/milvus-io/milvus/pull/46140">(#46140</a>)</li>
<li>Исправлена некорректная логика сокращения структур<a href="https://github.com/milvus-io/milvus/pull/46151">(#46151</a>)</li>
<li>Исправлен возврат ошибки из хайлайтера при пустых результатах поиска<a href="https://github.com/milvus-io/milvus/pull/46111">(#46111</a>)</li>
<li>Исправлена логика загрузки необработанных данных для полей<a href="https://github.com/milvus-io/milvus/pull/46155">(#46155</a>)</li>
<li>Исправлена проблема перемещения курсора после пропуска кусков в индексе<a href="https://github.com/milvus-io/milvus/pull/46055">(#46055</a>)</li>
<li>Исправлена логика цикла для вывода скалярного индекса <code translate="no">TIMESTAMPTZ</code> <a href="https://github.com/milvus-io/milvus/pull/46110">(#46110</a>)</li>
<li>Исправлена установка значений по умолчанию для полей геометрии через RESTful API<a href="https://github.com/milvus-io/milvus/pull/46064">(#46064</a>)</li>
<li>Реализован быстрый отказ, если какой-либо компонент не готов при запуске<a href="https://github.com/milvus-io/milvus/pull/46070">(#46070</a>)</li>
</ul>
<h2 id="v267" class="common-anchor-header">v2.6.7<button data-href="#v267" class="anchor-icon" translate="no">
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
    </button></h2><p>Дата выхода: 4 декабря 2025 года</p>
<table>
<thead>
<tr><th style="text-align:left">Версия Milvus</th><th style="text-align:left">Версия Python SDK</th><th style="text-align:left">Node.js SDK Версия</th><th style="text-align:left">Java SDK Версия</th><th style="text-align:left">Go SDK Версия</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.7</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.5</td><td style="text-align:left">2.6.10</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Milvus 2.6.7 - это критическое стабилизационное обновление для серии 2.6.x. В этом выпуске основное внимание уделено защите системы от распределенных сбоев и оптимизации использования ресурсов при высокой нагрузке. Благодаря значительным улучшениям в обработке ввода-вывода, управлении памятью и интеграции с Kubernetes мы настоятельно рекомендуем всем производственным пользователям перейти на эту версию, чтобы обеспечить большую надежность и плавность работы в масштабе.</p>
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
<li>Добавлена конечная точка <code translate="no">/livez</code> для поддержки встроенных в Kubernetes зондов liveness, что повышает стабильность оркестровки контейнеров<a href="https://github.com/milvus-io/milvus/pull/45481">(#45481</a>).</li>
<li>Добавлена поддержка операций <strong>GroupBy</strong> для полей <code translate="no">TIMESTAMPTZ</code>, что расширяет возможности аналитики временных рядов<a href="https://github.com/milvus-io/milvus/pull/45763">(#45763</a>)</li>
<li>Поддержка <code translate="no">mmap</code> для индексов общих ключей JSON shredding для уменьшения занимаемой оперативной памяти<a href="https://github.com/milvus-io/milvus/pull/45861">(#45861</a>)</li>
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
<li>Поддержка переадресации DML-запросов в прокси для повышения доступности записи и устойчивости маршрутизации<a href="https://github.com/milvus-io/milvus/pull/45922">(#45922</a>).</li>
<li>Обновление etcd до версии 3.5.23 для устранения регрессий стабильности и производительности<a href="https://github.com/milvus-io/milvus/pull/45953">(#45953</a>).</li>
<li>Добавлена надежная обработка ошибок при сбоях сервера Etcd для предотвращения каскадных отказов компонентов<a href="https://github.com/milvus-io/milvus/pull/45633">(#45633</a>).</li>
<li>Снижение нагрузки на Etcd за счет удаления дорогостоящих наблюдателей для простых проверок актуальности сессий<a href="https://github.com/milvus-io/milvus/pull/45974">(#45974</a>).</li>
<li>Усовершенствована стратегия хранения WAL для лучшего баланса между использованием диска и безопасностью восстановления данных<a href="https://github.com/milvus-io/milvus/pull/45784">(#45784</a>).</li>
<li>Поддержка асинхронной синхронизации записи для журналов для предотвращения влияния блокировки дискового ввода-вывода на основной путь выполнения<a href="https://github.com/milvus-io/milvus/pull/45806">(#45806</a>).</li>
<li>Принудительное использование буферизованного ввода-вывода для высокоприоритетных задач нагрузки для оптимизации использования кэша страниц ОС и пропускной способности<a href="https://github.com/milvus-io/milvus/pull/45958">(#45958</a>).</li>
<li>Оптимизирована стратегия <code translate="no">mmap</code> для отображения групповых чанков в одном системном вызове, что снижает накладные расходы ядра при загрузке сегментов<a href="https://github.com/milvus-io/milvus/pull/45893">(#45893</a>).</li>
<li>Повышена точность оценки памяти при измельчении JSON для предотвращения OOM-киллов или недоиспользования<a href="https://github.com/milvus-io/milvus/pull/45876">(#45876</a>).</li>
<li>Уточнена оценка загрузки сегментов для учета состояний вытеснения и прогрева<a href="https://github.com/milvus-io/milvus/pull/45891">(#45891</a>).</li>
<li>Добавлены проверки отмены в операторы запросов, чтобы ускорить завершение прерванных или вышедших по таймеру запросов<a href="https://github.com/milvus-io/milvus/pull/45894">(#45894</a>).</li>
<li>Удалены избыточные проверки типа ресурса в конфигурации файловых ресурсов<a href="https://github.com/milvus-io/milvus/pull/45727">(#45727</a>).</li>
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
<li>Чередование журналов Go и C++ в единый поток для обеспечения корректного хронологического представления при отладке<a href="https://github.com/milvus-io/milvus/pull/46005">(#46005</a>).</li>
<li>Решено состояние гонки, при котором <code translate="no">LastConfirmedMessageID</code> мог быть некорректным при высококонкурентной записи<a href="https://github.com/milvus-io/milvus/pull/45874">(#45874</a>).</li>
<li>Исправлена ошибка вычисления при агрегировании <code translate="no">allsearchcount</code> из нескольких результатов поиска<a href="https://github.com/milvus-io/milvus/pull/45904">(#45904</a>).</li>
<li>Исправлены выражения Term для корректной обработки логики содержания строк в массивах JSON<a href="https://github.com/milvus-io/milvus/pull/45956">(#45956</a>).</li>
<li>Заменили <code translate="no">json.doc()</code> на <code translate="no">json.dom_doc()</code> в <code translate="no">JSONContainsExpr</code>, чтобы исправить поведение парсинга и повысить производительность<a href="https://github.com/milvus-io/milvus/pull/45786">(#45786</a>).</li>
<li>Исправлена паника в компонентах Standby MixCoord во время последовательности выключения<a href="https://github.com/milvus-io/milvus/pull/45898">(#45898</a>).</li>
<li>Исправлена проверка лидеров для обеспечения корректной синхронизации распределения сегментов на узлах, доступных только для чтения<a href="https://github.com/milvus-io/milvus/pull/45991">(#45991</a>).</li>
<li>Обеспечено срабатывание <code translate="no">HandleNodeUp</code> при повторном наблюдении за узлом для поддержания правильной топологии балансировки нагрузки<a href="https://github.com/milvus-io/milvus/pull/45963">(#45963</a>).</li>
<li>Реализован откат к удаленному хранилищу WAL, если локальное хранилище WAL становится недоступным<a href="https://github.com/milvus-io/milvus/pull/45754">(#45754</a>).</li>
<li>Добавлен <code translate="no">EmptySessionWatcher</code> для предотвращения паники при работе в режиме привязки IndexNode<a href="https://github.com/milvus-io/milvus/pull/45912">(#45912</a>).</li>
<li>Обеспечена согласованность состояния памяти при восстановлении широковещательных задач из буферов протокола<a href="https://github.com/milvus-io/milvus/pull/45788">(#45788</a>).</li>
<li>Устранены проблемы потокобезопасности при обновлении схемы коллекции SegCore<a href="https://github.com/milvus-io/milvus/pull/45618">(#45618</a>).</li>
<li>Усилены проверки контроля доступа (RBAC) для API <code translate="no">ListImport</code> и <code translate="no">GetImportProgress</code> <a href="https://github.com/milvus-io/milvus/pull/45862">(#45862</a>).</li>
<li>Исправлена ошибка, при которой BulkImport завершался неудачей, если входные данные содержали пустой список структур<a href="https://github.com/milvus-io/milvus/pull/45692">(#45692</a>).</li>
</ul>
<h2 id="v266" class="common-anchor-header">v2.6.6<button data-href="#v266" class="anchor-icon" translate="no">
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
    </button></h2><p>Дата выпуска: 21 ноября 2025 г.</p>
<table>
<thead>
<tr><th style="text-align:left">Версия Milvus</th><th style="text-align:left">Версия Python SDK</th><th style="text-align:left">Node.js SDK Версия</th><th style="text-align:left">Java SDK Версия</th><th style="text-align:left">Go SDK Версия</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.6</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.8</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Мы рады сообщить о выходе обновления Milvus 2.6.6, содержащего ряд новых мощных возможностей, улучшений производительности и исправлений существенных ошибок. В этом обновлении представлены такие важные функции, как тип данных Geospatial и Timestampz, ранжировщик Boost для пересчета и т. д. В этом выпуске также улучшена производительность скалярной фильтрации. Также было исправлено несколько критических ошибок для обеспечения большей стабильности и надежности. В этом выпуске Milvus продолжает обеспечивать более надежную и эффективную работу для всех пользователей. Ниже приведены основные моменты этого выпуска.</p>
<ul>
<li>Тип геопространственных данных: Milvus вводит поддержку типа данных <code translate="no">Geometry</code>, представляющего геометрические объекты, соответствующие стандартам OGC, такие как <code translate="no">POINT</code>, <code translate="no">LINESTRING</code> и <code translate="no">POLYGON</code>. Этот тип поддерживает множество операторов пространственных отношений (st_contains, st_intersects, st_within, st_dwithin, ...) и предоставляет пространственный индекс <code translate="no">RTREE</code> для ускорения пространственной фильтрации и выполнения запросов. Это позволяет эффективно хранить и запрашивать геопространственные фигуры для LBS, картографии и других пространственных рабочих нагрузок.</li>
<li>Тип данных Timestamptz: Milvus представляет тип данных TIMESTAMPTZ, обеспечивающий учет часовых поясов для всех временных данных. Эта функция обеспечивает согласованное управление данными в глобальных развертываниях, позволяя пользователям определять временной контекст по умолчанию с помощью свойства timezone в базах данных и коллекциях. Важно отметить, что поле полностью поддерживает фильтрацию на основе выражений для запросов по временному диапазону, а операции поиска (запрос и поиск) поддерживают параметр временной зоны для мгновенного преобразования временных меток в требуемый локальный формат при выводе.</li>
<li>Boost Ranker: Вместо того чтобы полагаться исключительно на семантическое сходство, рассчитываемое на основе векторных расстояний, Boost Ranker позволяет Milvus использовать опциональное условие фильтрации в функции для поиска совпадений среди кандидатов на результат поиска и повышает оценки этих совпадений, применяя указанный вес, что помогает повысить или понизить рейтинг совпадающих сущностей в итоговом результате.</li>
<li>Индекс STL_SORT теперь поддерживает типы данных VARCHAR и TIMESTAMPTZ.</li>
<li>Теперь вы можете включить динамическое поле существующей коллекции, изменив ее.</li>
<li>Исправлена ошибка cve-2025-63811.</li>
</ul>
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
<li>Добавлен новый конфиг и включено динамическое обновление конфигов<a href="https://github.com/milvus-io/milvus/pull/45363">(#45363</a>)</li>
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
<li>Исправлено cve-2025-63811<a href="https://github.com/milvus-io/milvus/pull/45658">(#45658</a>)</li>
<li>Удалены большие массивы идентификаторов сегментов из журналов querynode<a href="https://github.com/milvus-io/milvus/pull/45720">(#45720</a>)</li>
<li>Обновлено множество мест, где expr копировал входные значения в каждом цикле<a href="https://github.com/milvus-io/milvus/pull/45712">(#45712</a>)</li>
<li>Оптимизирована производительность term expr<a href="https://github.com/milvus-io/milvus/pull/45671">(#45671</a>)</li>
<li>Префетиширование векторных чанков для запечатанных неиндексированных сегментов<a href="https://github.com/milvus-io/milvus/pull/45666">(#45666</a>)</li>
<li>Expr: префетиширование чанков только один раз<a href="https://github.com/milvus-io/milvus/pull/45555">(#45555</a>)</li>
<li>Добавлена поддержка nullable для типов geometry и timestamptz<a href="https://github.com/milvus-io/milvus/pull/45522">(#45522</a>)</li>
<li>Увеличен ttl сессии с 10 до 30 секунд<a href="https://github.com/milvus-io/milvus/pull/45517">(#45517</a>)</li>
<li>Добавлено больше метрик для фреймворка ddl<a href="https://github.com/milvus-io/milvus/pull/45559">(#45559</a>)</li>
<li>Обновлена версия конфигурации maxconnections<a href="https://github.com/milvus-io/milvus/pull/45547">(#45547</a>)</li>
<li>Пропущена проверка идентификатора источника<a href="https://github.com/milvus-io/milvus/pull/45519">(#45519</a>)</li>
<li>Поддерживается конфиг max_connection для удаленных хранилищ<a href="https://github.com/milvus-io/milvus/pull/45364">(#45364</a>)</li>
<li>Предотвращена паника путем добавления проверки нулевого указателя при очистке pk2offset insertrecord<a href="https://github.com/milvus-io/milvus/pull/45442">(#45442</a>)</li>
<li>Выполнена некоторая оптимизация получения скалярных полей в сценариях многоуровневого хранения<a href="https://github.com/milvus-io/milvus/pull/45361">(#45361</a>)</li>
<li>Исправлена опечатка в параметрах анализатора<a href="https://github.com/milvus-io/milvus/pull/45434">(#45434</a>)</li>
<li>Переопределение index_type при создании сегментного индекса<a href="https://github.com/milvus-io/milvus/pull/45417">(#45417</a>)</li>
<li>Добавлена поддержка rbac для updatereplicateconfiguration<a href="https://github.com/milvus-io/milvus/pull/45236">(#45236</a>)</li>
<li>Повышена версия go до 1.24.9<a href="https://github.com/milvus-io/milvus/pull/45369">(#45369</a>)</li>
<li>Отключено jsonshredding для конфигурации по умолчанию<a href="https://github.com/milvus-io/milvus/pull/45349">(#45349</a>)</li>
<li>Унифицирован выровненный буфер для буферизованного и прямого i/o<a href="https://github.com/milvus-io/milvus/pull/45325">(#45325</a>)</li>
<li>Переименованы пользовательские конфиг-параметры, связанные с jsonstats<a href="https://github.com/milvus-io/milvus/pull/45252">(#45252</a>)</li>
<li>Сделали конфигурацию пула потоков knowhere обновляемой<a href="https://github.com/milvus-io/milvus/pull/45191">(#45191</a>)</li>
<li>Вишнёвый патч нового фреймворка ddl и cdc 3<a href="https://github.com/milvus-io/milvus/pull/45280">(#45280</a>)</li>
<li>Установка версии схемы при создании новой коллекции<a href="https://github.com/milvus-io/milvus/pull/45269">(#45269</a>)</li>
<li>Поддержка jsonl/ndjson файлов для bulkinsert<a href="https://github.com/milvus-io/milvus/pull/44717">(#44717</a>)</li>
<li>Ожидание завершения работы клиента репликативного потока<a href="https://github.com/milvus-io/milvus/pull/45260">(#45260</a>)</li>
<li>Сделали geometrycache необязательной конфигурацией<a href="https://github.com/milvus-io/milvus/pull/45196">(#45196</a>)</li>
<li>Вишнёвый патч нового фреймворка ddl и cdc 2<a href="https://github.com/milvus-io/milvus/pull/45241">(#45241</a>)</li>
<li>Не запускал cdc по умолчанию<a href="https://github.com/milvus-io/milvus/pull/45217">(#45217</a>)</li>
<li>Вишнёвый патч нового фреймворка ddl и cdc<a href="https://github.com/milvus-io/milvus/pull/45025">(#45025</a>)</li>
<li>Убрано ограничение на максимальное количество векторных полей<a href="https://github.com/milvus-io/milvus/pull/45156">(#45156</a>)</li>
<li>Показывается время создания задания импорта<a href="https://github.com/milvus-io/milvus/pull/45059">(#45059</a>)</li>
<li>Оптимизирована инициализация битовой карты scalarindexsort для запросов диапазона<a href="https://github.com/milvus-io/milvus/pull/45087">(#45087</a>)</li>
<li>Включена поддержка stl_sort для varchar<a href="https://github.com/milvus-io/milvus/pull/45050">(#45050</a>)</li>
<li>Вынесена логика клиента шарда в специальный пакет<a href="https://github.com/milvus-io/milvus/pull/45031">(#45031</a>)</li>
<li>Рефакторинг управления привилегиями путем выделения кэша привилегий в отдельный пакет<a href="https://github.com/milvus-io/milvus/pull/45002">(#45002</a>)</li>
<li>Поддержка json-значений по умолчанию в fillfielddata<a href="https://github.com/milvus-io/milvus/pull/45470">(#45470</a>)</li>
<li>Обновлены enabledynamicfield и schemaversion при модификации коллекции<a href="https://github.com/milvus-io/milvus/pull/45616">(#45616</a>)</li>
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
<li>Исправлена паника при частичном обновлении с timestamptz<a href="https://github.com/milvus-io/milvus/pull/45741">(#45741</a>)</li>
<li>Используется 2.6.6 для обновления milvus ddl<a href="https://github.com/milvus-io/milvus/pull/45739">(#45739</a>)</li>
<li>Использовался последний таймлапс для истечения срока действия кэша<a href="https://github.com/milvus-io/milvus/pull/45699">(#45699</a>)</li>
<li>Заставляло потоковую ноду завершать работу при неудачной инициализации<a href="https://github.com/milvus-io/milvus/pull/45732">(#45732</a>)</li>
<li>Защищено место вставки tbb concurrent_map, чтобы избежать дедлока в состоянии гонки<a href="https://github.com/milvus-io/milvus/pull/45682">(#45682</a>)</li>
<li>Предотвращение паники, когда потоковый узел отключался, но узел запросов продолжал работать<a href="https://github.com/milvus-io/milvus/pull/45696">(#45696</a>)</li>
<li>Установка инициализации задачи, когда у рабочего не было задачи<a href="https://github.com/milvus-io/milvus/pull/45676">(#45676</a>)</li>
<li>Предотвращение тупика в runcomponent при неудачной подготовке<a href="https://github.com/milvus-io/milvus/pull/45647">(#45647</a>)</li>
<li>Предотвращение паники при двойном закрытии канала ack-трансляции<a href="https://github.com/milvus-io/milvus/pull/45662">(#45662</a>)</li>
<li>Исправлено обратное заполнение значения по умолчанию при добавлении поля<a href="https://github.com/milvus-io/milvus/pull/45644">(#45644</a>)</li>
<li>Уплотнена история назначения канала для уменьшения размера информации о восстановлении назначения<a href="https://github.com/milvus-io/milvus/pull/45607">(#45607</a>)</li>
<li>Корректно обрабатываются значения по умолчанию при уплотнении для добавленных полей<a href="https://github.com/milvus-io/milvus/pull/45619">(#45619</a>)</li>
<li>Удалено validatefieldname в dropindex<a href="https://github.com/milvus-io/milvus/pull/45462">(#45462</a>)</li>
<li>Игнорировалась задача уплотнения, когда сегмент from не был здоров<a href="https://github.com/milvus-io/milvus/pull/45535">(#45535</a>)</li>
<li>Установка свойств схемы перед трансляцией alter collection<a href="https://github.com/milvus-io/milvus/pull/45529">(#45529</a>)</li>
<li>Сохранялось событие базы данных, если ключ был недействительным<a href="https://github.com/milvus-io/milvus/pull/45530">(#45530</a>)</li>
<li>Исправлена ошибка bulkimport для поля struct<a href="https://github.com/milvus-io/milvus/pull/45536">(#45536</a>)</li>
<li>Невозможность получить необработанные данные для гибридного индекса<a href="https://github.com/milvus-io/milvus/pull/45408">(#45408</a>)</li>
<li>Раннее сохранение коллекции для предотвращения ее освобождения до завершения запроса<a href="https://github.com/milvus-io/milvus/pull/45415">(#45415</a>)</li>
<li>Использование правильной блокировки ключа ресурса для ddl и использование нового ddl при передаче реплики<a href="https://github.com/milvus-io/milvus/pull/45509">(#45509</a>)</li>
<li>Исправлена совместимость индексов после обновления<a href="https://github.com/milvus-io/milvus/pull/45374">(#45374</a>)</li>
<li>Исправлена ошибка недоступности канала и освобождена блокировка коллекции<a href="https://github.com/milvus-io/milvus/pull/45429">(#45429</a>)</li>
<li>Удалена мета-коллекция при сбросе раздела<a href="https://github.com/milvus-io/milvus/pull/45497">(#45497</a>)</li>
<li>Исправлен сегмент цели, помеченный как сброшенный, при сохранении статистики дважды<a href="https://github.com/milvus-io/milvus/pull/45479">(#45479</a>)</li>
<li>Неверно обновлялся timetick в информации о коллекции<a href="https://github.com/milvus-io/milvus/pull/45471">(#45471</a>)</li>
<li>Добавлена зависимость tzdata для включения распознавания идентификатора часового пояса iana<a href="https://github.com/milvus-io/milvus/pull/45495">(#45495</a>)</li>
<li>Исправлен расчет смещения данных полей в функциях ранжирования для массового поиска<a href="https://github.com/milvus-io/milvus/pull/45482">(#45482</a>)</li>
<li>Исправлена геометрия фильтра для роста с mmap<a href="https://github.com/milvus-io/milvus/pull/45465">(#45465</a>)</li>
<li>Nextfieldid не учитывал struct<a href="https://github.com/milvus-io/milvus/pull/45438">(#45438</a>)</li>
<li>Значение группы было равно нулю<a href="https://github.com/milvus-io/milvus/pull/45419">(#45419</a>)</li>
<li>Обеспечена точная оценка размера для массивов с нарезанными стрелками при уплотнении<a href="https://github.com/milvus-io/milvus/pull/45352">(#45352</a>)</li>
<li>Исправлена гонка данных в клиенте репликативного потока<a href="https://github.com/milvus-io/milvus/pull/45347">(#45347</a>)</li>
<li>Пропущено построение текстового индекса для вновь добавленных столбцов<a href="https://github.com/milvus-io/milvus/pull/45317">(#45317</a>)</li>
<li>Случайно игнорировались запечатанные сегменты при уплотнении l0<a href="https://github.com/milvus-io/milvus/pull/45341">(#45341</a>)</li>
<li>Перемещение финишной загрузки перед созданием текстового индекса для обеспечения доступности сырых данных<a href="https://github.com/milvus-io/milvus/pull/45335">(#45335</a>)</li>
<li>Не использовали json_shredding для json path is null<a href="https://github.com/milvus-io/milvus/pull/45311">(#45311</a>)</li>
<li>Исправления, связанные с timestamptz<a href="https://github.com/milvus-io/milvus/pull/45321">(#45321</a>)</li>
<li>Исправлен отказ сегмента загрузки из-за ошибки get disk usage<a href="https://github.com/milvus-io/milvus/pull/45300">(#45300</a>)</li>
<li>Поддерживается значение json по умолчанию при уплотнении<a href="https://github.com/milvus-io/milvus/pull/45331">(#45331</a>)</li>
<li>Вычисление правильного размера партии для геометрического индекса растущего сегмента<a href="https://github.com/milvus-io/milvus/pull/45261">(#45261</a>)</li>
<li>Применено исправление ошибки ddl-фреймворка<a href="https://github.com/milvus-io/milvus/pull/45292">(#45292</a>)</li>
<li>Исправлена ошибка сбора alter с настройкой mmap для struct<a href="https://github.com/milvus-io/milvus/pull/45240">(#45240</a>)</li>
<li>Инициализирован диапазон временных меток в композитной записи бинлога<a href="https://github.com/milvus-io/milvus/pull/45283">(#45283</a>)</li>
<li>Пропущено создание tmp-dir для растущего индекса r-дерева<a href="https://github.com/milvus-io/milvus/pull/45257">(#45257</a>)</li>
<li>Предотвращение потенциальных условий гонки при обновлении исполнителя<a href="https://github.com/milvus-io/milvus/pull/45232">(#45232</a>)</li>
<li>Разрешено использовать "[" и "]" в имени индекса<a href="https://github.com/milvus-io/milvus/pull/45194">(#45194</a>)</li>
<li>Исправлена ошибка уничтожения json, когда он был пустым, но не нулевым<a href="https://github.com/milvus-io/milvus/pull/45214">(#45214</a>)</li>
<li>Убедились, что операция append может быть отменена только самим wal, но не rpc<a href="https://github.com/milvus-io/milvus/pull/45079">(#45079</a>)</li>
<li>Решена проблема доступа к облачному хранилищу wp gcp с ak/sk<a href="https://github.com/milvus-io/milvus/pull/45144">(#45144</a>)</li>
<li>Исправлен импорт нулевых геометрических данных<a href="https://github.com/milvus-io/milvus/pull/45162">(#45162</a>)</li>
<li>Добавлена проверка null для packed_writer_ в jsonstatsparquetwriter::close()<a href="https://github.com/milvus-io/milvus/pull/45176">(#45176</a>)</li>
<li>Невозможность mmap emb_list_meta в списке встраивания<a href="https://github.com/milvus-io/milvus/pull/45126">(#45126</a>)</li>
<li>Обновлена метрика querynode numentities, когда в коллекции не было сегментов<a href="https://github.com/milvus-io/milvus/pull/45160">(#45160</a>)</li>
<li>Предотвращение повторных попыток при импорте недопустимых строк utf-8<a href="https://github.com/milvus-io/milvus/pull/45068">(#45068</a>)</li>
<li>Обработка пустых fieldsdata в reduce/rerank для сценария повторного запроса<a href="https://github.com/milvus-io/milvus/pull/45137">(#45137</a>)</li>
<li>Исправлена паника при изящном завершении работы cdc<a href="https://github.com/milvus-io/milvus/pull/45095">(#45095</a>)</li>
<li>Исправлено загрязнение токенов аутентификации, поддержка oss/cos, избыточные логи ошибок синхронизации<a href="https://github.com/milvus-io/milvus/pull/45106">(#45106</a>)</li>
<li>Обработка полностью нулевых данных в stringindexsort для предотвращения таймаута загрузки<a href="https://github.com/milvus-io/milvus/pull/45104">(#45104</a>)</li>
<li>Отключена сборка старой версии jsonstats из запроса<a href="https://github.com/milvus-io/milvus/pull/45102">(#45102</a>)</li>
<li>Исправлена ошибка импорта геометрических данных<a href="https://github.com/milvus-io/milvus/pull/45090">(#45090</a>)</li>
<li>Исправлена ошибка импорта паркетов в struct<a href="https://github.com/milvus-io/milvus/pull/45071">(#45071</a>)</li>
<li>Добавлено getmetrics обратно в indexnodeserver для обеспечения совместимости<a href="https://github.com/milvus-io/milvus/pull/45074">(#45074</a>)</li>
<li>Исправлена ошибка сбора alter для подполей struct<a href="https://github.com/milvus-io/milvus/pull/45042">(#45042</a>)</li>
<li>Исправлено отсутствие эффекта mmap на уровне коллекции для struct<a href="https://github.com/milvus-io/milvus/pull/44997">(#44997</a>)</li>
<li>Предотвращена гонка данных при обновлении нотификатора коллекции querycoord<a href="https://github.com/milvus-io/milvus/pull/45051">(#45051</a>)</li>
<li>Исправлены значения по умолчанию для json-полей в слое хранения<a href="https://github.com/milvus-io/milvus/pull/45009">(#45009</a>)</li>
<li>Двойная проверка для предотвращения стирания iter другим потоком<a href="https://github.com/milvus-io/milvus/pull/45015">(#45015</a>)</li>
<li>Исправлена ошибка в функции gis для фильтрации геометрии<a href="https://github.com/milvus-io/milvus/pull/44967">(#44967</a>)</li>
</ul>
<h2 id="v265" class="common-anchor-header">v2.6.5<button data-href="#v265" class="anchor-icon" translate="no">
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
    </button></h2><p>Дата выхода: 11 ноября 2025 года</p>
<table>
<thead>
<tr><th style="text-align:left">Версия Milvus</th><th style="text-align:left">Python SDK Версия</th><th style="text-align:left">Node.js SDK Версия</th><th style="text-align:left">Java SDK Версия</th><th style="text-align:left">Go SDK Версия</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.5</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.7</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Мы рады сообщить о выпуске Milvus 2.6.5, в котором устранена <strong>критическая уязвимость безопасности</strong> <a href="https://github.com/milvus-io/milvus/security/advisories/GHSA-mhjq-8c7m-3f7p">CVE-2025-64513</a> и произведено обновление до версии Go 1.24.9. Мы настоятельно рекомендуем <strong>всем пользователям Milvus 2.6.x обновиться до версии 2.6.5</strong> как можно скорее. Это обновление также включает в себя ряд других улучшений и исправлений ошибок и обеспечивает пользователям более надежную и эффективную работу.</p>
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
<li>Обновлен тег builder image для обновления go1.24.9<a href="https://github.com/milvus-io/milvus/pull/45398">(#45398</a>)</li>
<li>Пропущена проверка идентификатора источника<a href="https://github.com/milvus-io/milvus/pull/45379">(#45379</a>)</li>
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
<li>Значение группы равно нулю<a href="https://github.com/milvus-io/milvus/pull/45421">(#45421</a>)</li>
<li>Инициализирован диапазон временных меток в составной записи бинлога (<a href="https://github.com/milvus-io/milvus/pull/45402">#45402</a>)</li>
<li>Обработка пустых данных в reduce/rerank для сценария повторного запроса (<a href="https://github.com/milvus-io/milvus/pull/45389">#45389</a>)</li>
<li>Добавлена проверка null для packed_writer_ в jsonstatsparquetwrite...<a href="https://github.com/milvus-io/milvus/pull/45376">(#45376</a>)</li>
<li>Пропущено построение текстового индекса для вновь добавленных колонок<a href="https://github.com/milvus-io/milvus/pull/45358">(#45358</a>)</li>
<li>Случайно игнорировались запечатанные сегменты при уплотнении l0<a href="https://github.com/milvus-io/milvus/pull/45351">(#45351</a>)</li>
<li>Перемещение финишной загрузки перед созданием текстового индекса для обеспечения доступности сырых данных<a href="https://github.com/milvus-io/milvus/pull/45336">(#45336</a>)</li>
<li>Поддержка значения json по умолчанию при уплотнении<a href="https://github.com/milvus-io/milvus/pull/45332">(#45332</a>)</li>
<li>Обновлен milvus-storage для исправления дублирующейся инициализации aws sdk (<a href="https://github.com/milvus-io/milvus/pull/45075">#45075</a>)</li>
</ul>
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
    </button></h2><p>Дата выпуска: 21 октября 2025 г.</p>
<table>
<thead>
<tr><th style="text-align:left">Версия Milvus</th><th style="text-align:left">Версия Python SDK</th><th style="text-align:left">Node.js SDK Версия</th><th style="text-align:left">Java SDK Версия</th><th style="text-align:left">Go SDK Версия</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.6</td><td style="text-align:left">2.6.1</td></tr>
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
<li>Поддерживается индекс AISAQ - индекс "все в хранилище"<a href="https://github.com/zilliztech/knowhere/pull/1282">(#1282</a>)</li>
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
<li><strong>Обновлена версия Go до 1.24.6</strong> с конструктором изображений<a href="https://github.com/milvus-io/milvus/pull/44763">(#44763</a>)</li>
<li>Включено измельчение JSON по умолчанию<a href="https://github.com/milvus-io/milvus/pull/44811">(#44811</a>)</li>
<li>Добавлена дисковая квота на размер загружаемого бинлога для предотвращения сбоев загрузки узла запросов<a href="https://github.com/milvus-io/milvus/pull/44932">(#44932</a>)</li>
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
<li>Добавлена поддержка функции Boost Function. Подробности см. в разделе <a href="/docs/ru/boost-ranker.md">Boost Ranker</a>.</li>
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
<li>Исправление проблемы, при которой состояние повтора не обрабатывалось корректно для запросов с непустой полезной нагрузкой<a href="https://github.com/milvus-io/milvus/pull/44068">(#44068</a>)</li>
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
<h4 id="Streaming-Node-GA" class="common-anchor-header">Потоковый узел (GA)</h4><p>В предыдущих версиях потоковые данные записывались в WAL прокси-сервером, а считывались узлами QueryNode и DataNode. Такая архитектура затрудняла достижение консенсуса на стороне записи и требовала сложной логики на стороне чтения. Кроме того, делегатор запросов располагался в QueryNode, что мешало масштабируемости. В Milvus 2.5.0 появился узел Streaming Node, который в версии 2.6.0 стал GA. Теперь этот компонент отвечает за все операции чтения/записи WAL на уровне шарда, а также выполняет функции делегатора запросов, что позволяет решить вышеупомянутые проблемы и получить новые оптимизации.</p>
<p><strong>Важное уведомление об обновлении</strong>: Streaming Node - это значительное архитектурное изменение, поэтому прямое обновление до Milvus 2.6.0-rc1 с предыдущих версий не поддерживается.</p>
<h4 id="Woodpecker-Native-WAL" class="common-anchor-header">Woodpecker Native WAL</h4><p>Ранее Milvus полагался на внешние системы, такие как Kafka или Pulsar, для своей WAL. Несмотря на свою функциональность, эти системы значительно усложняли работу и увеличивали затраты ресурсов, особенно для малых и средних развертываний. В Milvus 2.6 их заменила Woodpecker, специально разработанная, нативная для облака система WAL. Woodpecker предназначена для объектных хранилищ и поддерживает режимы нулевого диска как для локальных, так и для объектных хранилищ, упрощая операции и повышая производительность и масштабируемость.</p>
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
