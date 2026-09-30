---
id: snapshot-use-cases.md
title: Варианты использования моментальных снимковCompatible with Milvus 3.0.x
summary: >-
  В этом руководстве вы найдете типичные сценарии использования моментальных
  снимков.
beta: Milvus 3.0.x
---
<h1 id="Snapshot-Use-Cases" class="common-anchor-header">Варианты использования моментальных снимков<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Snapshot-Use-Cases" class="anchor-icon" translate="no">
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
    </button></h1><p>В этом руководстве приведены типичные сценарии использования моментальных снимков.</p>
<h2 id="Data-backup-and-restoration" class="common-anchor-header">Резервное копирование и восстановление данных<button data-href="#Data-backup-and-restoration" class="anchor-icon" translate="no">
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
    </button></h2><p>Снимки — это быстрые образы данных на определенный момент времени, подходящие для быстрого отката или тестирования (от нескольких дней до нескольких недель). В то же время резервные копии представляют собой независимые полные копии, хранящиеся отдельно для долгосрочного восстановления после сбоев (от нескольких недель до нескольких лет) и для более надежной защиты от полного отказа системы хранения.</p>
<p>В приведенной ниже таблице представлено сравнение моментальных снимков и резервных копий.</p>
<table>
   <tr>
     <th></th>
     <th><p>Резервная копия</p></th>
     <th><p>Снимки</p></th>
   </tr>
   <tr>
     <td><p>Создание резервной копии</p></td>
     <td><p>Копируются все файлы данных (занимает много времени)</p></td>
     <td><p>Создаются только метаданные (за миллисекунды)</p></td>
   </tr>
   <tr>
     <td><p>Восстановление</p></td>
     <td><p>Импортирует данные и восстанавливает индексы</p></td>
     <td><p>Копирует только существующие файлы данных и индексов</p></td>
   </tr>
   <tr>
     <td><p>Производительность</p></td>
     <td><p>Медленно и ресурсоемко</p></td>
     <td><p>Быстрая и нетребовательная к ресурсам (от нескольких секунд до нескольких минут)</p></td>
   </tr>
   <tr>
     <td><p>Влияние на систему</p></td>
     <td><p>Высокая загрузка ввода-вывода и ЦП</p></td>
     <td><p>Минимальное воздействие</p></td>
   </tr>
</table>
<p>Создание моментального снимка обычно занимает миллисекунды, а его восстановление — от секунд до минут, в зависимости от объема данных.</p>
<p>Подробнее об ограничениях, связанных со снимками, и их влиянии на работу системы см. в разделе <a href="/docs/ru/snapshots.md">«Снимки</a>».</p>
<h2 id="Data-processing-with-external-collections" class="common-anchor-header">Обработка данных с использованием внешних коллекций<button data-href="#Data-processing-with-external-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>Снимки могут служить стабильными источниками данных на определенный момент времени для аналитических или валидационных рабочих нагрузок. Для снимков Milvus используйте формат внешней коллекции « <code translate="no">milvus-table</code> » вместо прямого чтения файлов снимков в качестве общего входного потока Spark. Снимки Milvus хранят метаданные коллекции, манифесты сегментов, журналы удаления и статистику первичных ключей, поэтому Milvus нуждается в метаданных снимка в формате JSON и считывателе <code translate="no">milvus-table</code> для сохранения правильной схемы и семантики удаления.</p>
<p>Этот рабочий процесс создает внешнюю коллекцию с возможностью запросов на основе данных моментального снимка. Данные основного столбца по-прежнему ссылаются на источник моментального снимка, а обновление сопоставляет манифесты StorageV3 источника с целевыми внешними сегментами.</p>
<h3 id="Step-1-Get-the-snapshot-metadata-path" class="common-anchor-header">Шаг 1: Получение пути к метаданным моментального снимка<button data-href="#Step-1-Get-the-snapshot-metadata-path" class="anchor-icon" translate="no">
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
    </button></h3><p>Создайте или выберите моментальный снимок из обычной коллекции Milvus, а затем опишите его, чтобы получить его расположение в объектном хранилище.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

snapshot_info = client.describe_snapshot(
    snapshot_name=<span class="hljs-string">&quot;analytics_snapshot_20260321&quot;</span>,
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    include_collection_info=<span class="hljs-literal">True</span>
)

external_source = <span class="hljs-string">f&quot;s3://bucket/<span class="hljs-subst">{snapshot_info.s3_location}</span>&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Create-and-refresh-a-milvus-table-external-collection" class="common-anchor-header">Шаг 2: Создание и обновление внешней коллекции « <code translate="no">milvus-table</code> »<button data-href="#Step-2-Create-and-refresh-a-milvus-table-external-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Создайте внешнюю коллекцию, схема которой соответствует исходной коллекции снимка. Установите для параметра « <code translate="no">external_spec.format</code> » значение « <code translate="no">&quot;milvus-table&quot;</code> », а для параметра « <code translate="no">external_field</code> » каждого целевого поля данных — соответствующее имя поля источника.</p>
<pre><code translate="no" class="language-python">schema = client.create_schema(
    external_source=external_source,
    external_spec=<span class="hljs-string">&quot;&quot;&quot;{
        &quot;format&quot;: &quot;milvus-table&quot;,
        &quot;extfs&quot;: {
            &quot;cloud_provider&quot;: &quot;aws&quot;,
            &quot;region&quot;: &quot;us-west-2&quot;,
            &quot;access_key_id&quot;: &quot;YOUR_ACCESS_KEY&quot;,
            &quot;access_key_value&quot;: &quot;YOUR_SECRET_KEY&quot;
        }
    }&quot;&quot;&quot;</span>,
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    external_field=<span class="hljs-string">&quot;id&quot;</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    external_field=<span class="hljs-string">&quot;embedding&quot;</span>,
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;snapshot_external_collection&quot;</span>,
    schema=schema,
)

job_id = client.refresh_external_collection(
    collection_name=<span class="hljs-string">&quot;snapshot_external_collection&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>После завершения обновления можно создавать индексы, загружать внешнюю коллекцию и выполнять операции поиска или запросов по представлению, основанному на моментальном снимке.</p>
