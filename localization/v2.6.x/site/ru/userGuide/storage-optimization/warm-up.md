---
id: warm-up.md
title: Warm UpCompatible with Milvus 2.6.4+
summary: >-
  Функция Warm Up дополняет Tiered Storage, предварительно загружая выбранные
  поля или индексы в кэш до того, как сегмент станет доступным для запроса.
  Можно настроить прогрев на уровне кластера, коллекции или отдельных
  полей/индексов, что обеспечивает тонкий контроль над задержкой первого запроса
  и использованием ресурсов.
beta: Milvus 2.6.4+
---
<h1 id="Warm-Up" class="common-anchor-header">Warm Up<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Warm-Up" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>Warm Up</strong> дополняет Tiered Storage, предварительно загружая выбранные поля или индексы в кэш до того, как сегмент станет доступным для запроса. Можно настроить прогрев на уровне кластера, коллекции или отдельных полей/индексов, что обеспечивает тонкий контроль над задержкой первого запроса и использованием ресурсов.</p>
<h2 id="Why-warm-up" class="common-anchor-header">Зачем нужен прогрев<button data-href="#Why-warm-up" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="/docs/ru/tiered-storage-overview.md#Phase-1-Lazy-load">Ленивая загрузка</a> в многоуровневом хранилище повышает эффективность за счет первоначальной загрузки только метаданных. Однако это может привести к задержке при первом запросе к холодным данным, поскольку необходимые фрагменты или индексы должны быть получены из удаленного хранилища.</p>
<p><strong>Функция Warm Up</strong> решает эту проблему за счет упреждающего кэширования критически важных данных во время инициализации сегмента.</p>
<p>Это особенно полезно, когда:</p>
<ul>
<li><p>Определенные скалярные индексы часто используются в условиях фильтрации.</p></li>
<li><p>Векторные индексы важны для производительности поиска и должны быть готовы немедленно.</p></li>
<li><p>Задержка холодного старта после перезапуска QueryNode или загрузки нового сегмента неприемлема.</p></li>
</ul>
<p>В отличие от этого, Warm Up <strong>не рекомендуется</strong> использовать для полей или индексов, которые запрашиваются нечасто. Отключение Warm Up сокращает время загрузки сегмента и экономит место в кэше - идеальный вариант для больших векторных полей или некритичных скалярных полей.</p>
<h2 id="Configuration-levels" class="common-anchor-header">Уровни конфигурации<button data-href="#Configuration-levels" class="anchor-icon" translate="no">
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
   <tr>
     <th><p><strong>Уровень</strong></p></th>
     <th><p><strong>Область применения</strong></p></th>
     <th><p><strong>Метод конфигурации</strong></p></th>
     <th><p><strong>Приоритет</strong></p></th>
   </tr>
   <tr>
     <td><p>Поле/индекс</p></td>
     <td><p>Одно поле или индекс</p></td>
     <td><p>Методы SDK: </p><ul><li><p><code translate="no">add_field()</code></p></li><li><p><code translate="no">alter_collection_field()</code></p></li><li><p><code translate="no">add_index()</code></p></li><li><p><code translate="no">alter_index_properties()</code></p></li></ul></td>
     <td><p>Наивысший</p></td>
   </tr>
   <tr>
     <td><p>Коллекция</p></td>
     <td><p>Все поля/индексы в коллекции</p></td>
     <td><p>Методы SDK:</p><ul><li><p><code translate="no">create_collection()</code></p></li><li><p><code translate="no">alter_collection_properties()</code></p></li></ul></td>
     <td><p>Средний</p></td>
   </tr>
   <tr>
     <td><p>Кластер</p></td>
     <td><p>Все коллекции в кластере</p></td>
     <td><p><code translate="no">milvus.yaml</code> файл конфигурации</p></td>
     <td><p>Lowest (по умолчанию)</p></td>
   </tr>
</table>
<p><strong>Отменяющее поведение:</strong></p>
<ul>
<li><p>Если поле имеет собственную настройку прогрева, эта настройка имеет приоритет над настройками на уровне коллекции и кластера.</p></li>
<li><p>Если настройки на уровне поля или индекса отсутствуют, применяется настройка на уровне коллекции.</p></li>
<li><p>Если нет настроек ни на уровне поля, ни на уровне индекса, ни на уровне коллекции, применяется настройка на уровне кластера.</p></li>
<li><p>При использовании операций alter вступает в силу последнее значение alter.</p></li>
</ul>
<h2 id="Configure-warmup-at-cluster-level" class="common-anchor-header">Настройка прогрева на уровне кластера<button data-href="#Configure-warmup-at-cluster-level" class="anchor-icon" translate="no">
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
    </button></h2><p>Прогрев на уровне кластера настраивается в конфигурационном файле Milvus <code translate="no">milvus.yaml</code> и применяется ко всем коллекциям в кластере. Это служит базовым значением по умолчанию.</p>
<p>Каждый тип цели поддерживает две настройки:</p>
<table>
   <tr>
     <th><p>Настройка прогрева</p></th>
     <th><p>Описание</p></th>
     <th><p>Типичный сценарий</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code></p></td>
     <td><p>Предварительная загрузка до того, как сегмент станет доступным для запросов. Время загрузки немного увеличивается, но первый запрос выполняется без задержек.</p></td>
     <td><p>Используйте для критически важных данных, которые должны быть доступны немедленно, например высокочастотные скалярные индексы или ключевые векторные индексы, используемые в поиске.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p>Пропустить предварительную загрузку. Сегмент становится доступным для запросов быстрее, но первый запрос может вызвать загрузку по требованию.</p></td>
     <td><p>Используйте для редко обращающихся или больших данных, таких как необработанные векторные поля или некритичные скалярные поля.</p></td>
   </tr>
</table>
<p><strong>Пример YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># options: sync, disable.</span>
        <span class="hljs-comment"># Specifies the timing for warming up the Tiered Storage cache.</span>
        <span class="hljs-comment"># - `sync`: data will be loaded into the cache before a segment is considered loaded.</span>
        <span class="hljs-comment"># - `disable`: data will not be proactively loaded into the cache, and loaded only if needed by search/query tasks.</span>
        <span class="hljs-comment"># Defaults to `sync`, except for vector field which defaults to `disable`.</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span> <span class="hljs-comment"># cache warmup for vector field raw data is by default disabled.</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Параметр</p></th>
     <th><p>Настройка разминки</p></th>
     <th><p>Описание</p></th>
     <th><p>Рекомендуемый вариант использования</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">scalarField</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Управляет предварительной загрузкой данных скалярных полей.</p></td>
     <td><p>Используйте <code translate="no">sync</code> только в том случае, если скалярные поля малы и часто используются в фильтрах. В противном случае используйте <code translate="no">disable</code>, чтобы сократить время загрузки.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">scalarIndex</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Управляет предварительной загрузкой скалярных индексов.</p></td>
     <td><p>Используйте <code translate="no">sync</code> для скалярных индексов, участвующих в частых условиях фильтрации или запросах диапазона.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectorField</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Управляет предварительной загрузкой данных векторных полей.</p></td>
     <td><p>Как правило, <code translate="no">disable</code> позволяет избежать интенсивного использования кэша. Включите <code translate="no">sync</code> только в тех случаях, когда необработанные векторы должны быть получены сразу после поиска (например, результаты сходства с отзывом векторов).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectorIndex</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Управляет предварительной загрузкой векторных индексов.</p></td>
     <td><p>Используйте <code translate="no">sync</code> для векторных индексов, которые критичны к задержке поиска. При пакетной или низкочастотной нагрузке используйте <code translate="no">disable</code> для ускорения готовности сегментов.</p></td>
   </tr>
</table>
<h2 id="Configure-warmup-at-collection-level--Milvus-2611+" class="common-anchor-header">Настройка прогрева на уровне коллекции<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.11+</span><button data-href="#Configure-warmup-at-collection-level--Milvus-2611+" class="anchor-icon" translate="no">
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
    </button></h2><p>Прогрев на уровне коллекции позволяет отменить настройки кластера по умолчанию для конкретной коллекции. Это полезно, когда коллекция имеет шаблоны доступа, отличные от общекластерной базовой линии.</p>
<h3 id="Set-warmup-when-creating-a-collection" class="common-anchor-header">Настройка прогрева при создании коллекции<button data-href="#Set-warmup-when-creating-a-collection" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
<span class="highlighted-comment-line">    properties={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;warmup.scalarField&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;warmup.scalarIndex&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;warmup.vectorField&quot;</span>: <span class="hljs-string">&quot;disable&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;warmup.vectorIndex&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span></span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Alter-warmup-settings-on-an-existing-collection" class="common-anchor-header">Изменение настроек прогрева для существующей коллекции<button data-href="#Alter-warmup-settings-on-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Вы должны изменить свойства коллекции перед вызовом <code translate="no">load()</code>. Изменение загруженной коллекции возвращает ошибку. Изменения параметров прогрева вступают в силу при следующей загрузке коллекции.</p>
<pre><code translate="no" class="language-python">client.alter_collection_properties(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    properties={
        <span class="hljs-string">&quot;warmup.vectorIndex&quot;</span>: <span class="hljs-string">&quot;disable&quot;</span>,
        <span class="hljs-string">&quot;warmup.scalarField&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Ссылка на свойство</strong>:</p>
<table>
   <tr>
     <th><p><strong>Свойство</strong></p></th>
     <th><p><strong>Настройка прогрева</strong></p></th>
     <th><p><strong>Описание</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">warmup.scalarField</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Настройка разминки для всех скалярных полей в коллекции.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">warmup.scalarIndex</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Настройка прогрева для всех скалярных индексов в коллекции.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">warmup.vectorField</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Настройка прогрева для всех векторных полей в коллекции.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">warmup.vectorIndex</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Настройка прогрева для всех векторных индексов в коллекции.</p></td>
   </tr>
</table>
<h2 id="Configure-warmup-at-field-level--Milvus-2611+" class="common-anchor-header">Настройка прогрева на уровне полей<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.11+</span><button data-href="#Configure-warmup-at-field-level--Milvus-2611+" class="anchor-icon" translate="no">
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
    </button></h2><p>Прогрев на уровне полей обеспечивает самую тонкую детализацию, позволяя контролировать поведение прогрева для отдельных полей. Это полезно, когда определенные поля имеют уникальные шаблоны доступа.</p>
<p>Прогрев на уровне поля применяется <strong>только</strong> к <strong>исходным данным поля</strong>, но не к индексам этого поля. Чтобы настроить прогрев для индекса, используйте <a href="https://file+.vscode-resource.vscode-cdn.net/Users/liyun/writingLab/3.0-milvus/warm-up/output/warm-up.md#Configure-warmup-at-index-level">настройку на уровне индекса</a>.</p>
<h3 id="Set-warmup-when-creating-a-field" class="common-anchor-header">Настройка прогрева при создании поля<button data-href="#Set-warmup-when-creating-a-field" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

schema = MilvusClient.create_schema()

schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;category&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
    warmup=<span class="hljs-string">&quot;sync&quot;</span>  <span class="hljs-comment"># Preload this field at load time</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    warmup=<span class="hljs-string">&quot;disable&quot;</span>  <span class="hljs-comment"># Do not preload vector raw data</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Alter-warmup-settings-on-an-existing-field" class="common-anchor-header">Изменение настроек прогрева для существующего поля<button data-href="#Alter-warmup-settings-on-an-existing-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Вы должны изменить настройки поля перед вызовом <code translate="no">load()</code>. Изменение поля в загруженной коллекции приводит к ошибке. Изменения настроек прогрева вступают в силу при следующей загрузке коллекции.</p>
<pre><code translate="no" class="language-python">client.alter_collection_field(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    field_name=<span class="hljs-string">&quot;category&quot;</span>,
    field_params={<span class="hljs-string">&quot;warmup&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>}
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-warmup-at-index-level--Milvus-2611+" class="common-anchor-header">Настройка прогрева на уровне индекса<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.11+</span><button data-href="#Configure-warmup-at-index-level--Milvus-2611+" class="anchor-icon" translate="no">
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
    </button></h2><p>Прогрев на уровне индекса позволяет управлять предварительной загрузкой отдельных индексов независимо от настроек прогрева базового поля.</p>
<h3 id="Set-warmup-when-creating-an-index" class="common-anchor-header">Настройка прогрева при создании индекса<button data-href="#Set-warmup-when-creating-an-index" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">256</span>,
        <span class="hljs-string">&quot;warmup&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>  <span class="hljs-comment"># Preload this index at load time</span>
    }
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;category&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    params={<span class="hljs-string">&quot;warmup&quot;</span>: <span class="hljs-string">&quot;disable&quot;</span>}  <span class="hljs-comment"># Do not preload this index</span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Alter-warmup-settings-on-an-existing-index" class="common-anchor-header">Изменение настроек прогрева в существующем индексе<button data-href="#Alter-warmup-settings-on-an-existing-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Вы должны изменить настройки индекса перед вызовом <code translate="no">load()</code>. Изменение индекса в загруженной коллекции приводит к ошибке. Изменения настроек прогрева вступают в силу при следующей загрузке коллекции.</p>
<pre><code translate="no" class="language-python">client.alter_index_properties(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    index_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    properties={<span class="hljs-string">&quot;warmup&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>}
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Warmup-behavior-reference" class="common-anchor-header">Справочник по поведению прогрева<button data-href="#Warmup-behavior-reference" class="anchor-icon" translate="no">
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
    </button></h2><p>В следующей таблице представлено поведение прогрева на разных этапах жизненного цикла сегмента.</p>
<table>
   <tr>
     <th><p><strong>Настройка прогрева</strong></p></th>
     <th><p><strong>Фаза загрузки</strong></p></th>
     <th><p><strong>Фаза поиска/запроса</strong></p></th>
     <th><p><strong>Фаза освобождения</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code></p></td>
     <td><p>Данные загружаются в локальное хранилище. Место назначения (диск или память) зависит от настройки mmap.</p></td>
     <td><p>Запрос напрямую обращается к локальному кэшу.</p></td>
     <td><p>Локальные кэшированные данные очищаются.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p>Данные не загружаются в локальное хранилище.</p></td>
     <td><p>Данные извлекаются по запросу из хранилища объектов, затем кэшируются локально на основе настроек mmap.</p></td>
     <td><p>Локальные кэшированные данные очищаются.</p></td>
   </tr>
</table>
<p><strong>Взаимодействие с mmap:</strong></p>
<table>
   <tr>
     <th><p><strong>Настройка разминки</strong></p></th>
     <th><p><strong>Ммап включен</strong></p></th>
     <th><p><strong>Расположение данных</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code></p></td>
     <td><p><code translate="no">true</code></p></td>
     <td><p>Локальный диск (<code translate="no">localStorage.path/cache/...</code>)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code></p></td>
     <td><p><code translate="no">false</code></p></td>
     <td><p>Локальная память</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p><code translate="no">true</code></p></td>
     <td><p>Загружается на локальный диск при первом обращении</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p><code translate="no">false</code></p></td>
     <td><p>Загружается в локальную память при первом обращении</p></td>
   </tr>
</table>
<p><strong>Структура каталога локального кэша (если включен mmap):</strong></p>
<table>
   <tr>
     <th><p><strong>Тип данных</strong></p></th>
     <th><p><strong>Путь к каталогу</strong></p></th>
   </tr>
   <tr>
     <td><p>Данные скалярных/векторных полей</p></td>
     <td><p><code translate="no">localStorage.path/cache/&lt;collection_id&gt;/local_chunk/...</code></p></td>
   </tr>
   <tr>
     <td><p>Скалярные/векторные индексные файлы</p></td>
     <td><p><code translate="no">localStorage.path/cache/&lt;collection_id&gt;/local_chunk/index_files/...</code></p></td>
   </tr>
</table>
<h2 id="Best-practices" class="common-anchor-header">Лучшие практики<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
    </button></h2><p>Warm Up влияет только на первоначальную загрузку. Если кэшированные данные впоследствии будут удалены, следующий запрос перезагрузит их по требованию.</p>
<ul>
<li><p>Избегайте чрезмерного использования <code translate="no">sync</code>. Предварительная загрузка слишком большого количества полей увеличивает время загрузки и нагрузку на кэш.</p></li>
<li><p>Начинайте консервативно - включайте Warm Up только для полей и индексов, к которым часто обращаются.</p></li>
<li><p>Следите за задержкой запросов и показателями кэша, а затем по мере необходимости расширяйте предварительную загрузку.</p></li>
<li><p>При смешанных рабочих нагрузках применяйте <code translate="no">sync</code> для коллекций, чувствительных к производительности, и <code translate="no">disable</code> для коллекций, ориентированных на емкость.</p></li>
</ul>
