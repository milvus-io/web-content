---
id: es2m.md
summary: >-
  В этом руководстве представлен полный пошаговый процесс переноса данных из
  Elasticsearch в Milvus 2.x.
title: Из Elasticsearch
---

<h1 id="From-Elasticsearch" class="common-anchor-header">Из Elasticsearch<button data-href="#From-Elasticsearch" class="anchor-icon" translate="no">
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
    </button></h1><p>В этом руководстве представлен полный пошаговый процесс переноса данных из Elasticsearch в Milvus 2.x. Следуя этому руководству, вы сможете эффективно перенести свои данные, используя расширенные возможности Milvus 2.x и улучшенную производительность.</p>
<h2 id="Prerequisites" class="common-anchor-header">Необходимые условия<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><strong>Версии программного обеспечения</strong>:<ul>
<li>Исходный Elasticsearch: 7.x или 8.x</li>
<li>Целевой Milvus: 2.x</li>
<li>Подробности установки см. в разделах <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html">Установка Elasticsearch</a> и <a href="https://milvus.io/docs/install_standalone-docker.md">Установка Milvus</a>.</li>
</ul></li>
<li><strong>Необходимые инструменты</strong>:<ul>
<li>Инструмент<a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a>. Подробности установки см. в разделе <a href="/docs/ru/v2.5.x/milvusdm_install.md">Установка инструмента миграции</a>.</li>
</ul></li>
<li><strong>Поддерживаемые типы данных для миграции</strong>: Поля для миграции из исходного индекса Elasticsearch относятся к следующим типам - <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/dense-vector.html#dense-vector">dense_vector</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/keyword.html#keyword-field-type">keyword</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/text.html#text-field-type">text</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">long</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">integer</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">double</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">float</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/boolean.html">boolean</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/object.html">object</a>. Типы данных, не перечисленные здесь, в настоящее время не поддерживаются для миграции. Подробную информацию о сопоставлении данных между коллекциями Milvus и индексами Elasticsearch см. в <a href="#field-mapping-reference">справочнике "Сопоставление полей"</a>.</li>
<li><strong>Требования к индексу Elasticsearch</strong>:<ul>
<li>Исходный индекс Elasticsearch должен содержать векторное поле типа <code translate="no">dense_vector</code>. Миграция не может начаться без векторного поля.</li>
</ul></li>
</ul>
<h2 id="Configure-the-migration-file" class="common-anchor-header">Настройка файла миграции<button data-href="#Configure-the-migration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Сохраните пример файла конфигурации миграции под именем <code translate="no">migration.yaml</code> и измените конфигурацию в соответствии с вашими реальными условиями. Вы можете поместить файл конфигурации в любой локальный каталог.</p>
<pre><code translate="no" class="language-yaml">dumper: <span class="hljs-comment"># configs for the migration job.</span>
  worker:
    workMode: <span class="hljs-string">&quot;elasticsearch&quot;</span> <span class="hljs-comment"># operational mode of the migration job.</span>
    reader:
      bufferSize: <span class="hljs-number">2500</span> <span class="hljs-comment"># buffer size to read from Elasticsearch in each batch. A value ranging from 2000 to 4000 is recommended.</span>
meta: <span class="hljs-comment"># meta configs for the source Elasticsearch index and target Milvus 2.x collection.</span>
  mode: <span class="hljs-string">&quot;config&quot;</span> <span class="hljs-comment"># specifies the source for meta configs. currently, onlly `config` is supported.</span>
  version: <span class="hljs-string">&quot;8.9.1&quot;</span>
  index: <span class="hljs-string">&quot;qatest_index&quot;</span> <span class="hljs-comment"># identifies the Elasticsearch index to migrate data from.</span>
  fields: <span class="hljs-comment"># fields within the Elasticsearch index to be migrated.</span>
  - name: <span class="hljs-string">&quot;my_vector&quot;</span> <span class="hljs-comment"># name of the Elasticsearch field.</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;dense_vector&quot;</span> <span class="hljs-comment"># data type of the Elasticsearch field.</span>
    dims: <span class="hljs-number">128</span> <span class="hljs-comment"># dimension of the vector field. required only when `type` is `dense_vector`.</span>
  - name: <span class="hljs-string">&quot;id&quot;</span>
    pk: true <span class="hljs-comment"># specifies if the field serves as a primary key.</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;long&quot;</span>
  - name: <span class="hljs-string">&quot;num&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;integer&quot;</span>
  - name: <span class="hljs-string">&quot;double1&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;double&quot;</span>
  - name: <span class="hljs-string">&quot;text1&quot;</span>
    maxLen: <span class="hljs-number">1000</span> <span class="hljs-comment"># max. length of data fields. required only for `keyword` and `text` data types.</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;text&quot;</span>
  - name: <span class="hljs-string">&quot;bl1&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;boolean&quot;</span>
  - name: <span class="hljs-string">&quot;float1&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;float&quot;</span>
  milvus: <span class="hljs-comment"># configs specific to creating the collection in Milvus 2.x</span>
    collection: <span class="hljs-string">&quot;Collection_01&quot;</span> <span class="hljs-comment"># name of the Milvus collection. defaults to the Elasticsearch index name if not specified.</span>
    closeDynamicField: false <span class="hljs-comment"># specifies whether to disable the dynamic field in the collection. defaults to `false`.</span>
    shardNum: <span class="hljs-number">2</span> <span class="hljs-comment"># number of shards to be created in the collection.</span>
    consistencyLevel: Strong <span class="hljs-comment"># consistency level for Milvus collection.</span>
source: <span class="hljs-comment"># connection configs for the source Elasticsearch server</span>
  es:
    urls:
    - <span class="hljs-string">&quot;http://10.15.1.***:9200&quot;</span> <span class="hljs-comment"># address of the source Elasticsearch server.</span>
    username: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment"># username for the Elasticsearch server.</span>
    password: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment"># password for the Elasticsearch server.</span>
target:
  mode: <span class="hljs-string">&quot;remote&quot;</span> <span class="hljs-comment"># storage location for dumped files. valid values: `remote` and `local`.</span>
  remote: <span class="hljs-comment"># configs for remote storage</span>
    outputDir: <span class="hljs-string">&quot;migration/milvus/test&quot;</span> <span class="hljs-comment"># output directory path in the cloud storage bucket.</span>
    cloud: <span class="hljs-string">&quot;aws&quot;</span> <span class="hljs-comment"># cloud storage service provider. Examples: `aws`, `gcp`, `azure`, etc.</span>
    region: <span class="hljs-string">&quot;us-west-2&quot;</span> <span class="hljs-comment"># region of the cloud storage; can be any value if using local Minio.</span>
    bucket: <span class="hljs-string">&quot;zilliz-aws-us-****-*-********&quot;</span> <span class="hljs-comment"># bucket name for storing data; must align with configs in milvus.yaml for Milvus 2.x.</span>
    useIAM: true <span class="hljs-comment"># whether to use an IAM Role for connection.</span>
    checkBucket: false <span class="hljs-comment"># checks if the specified bucket exists in the storage.</span>
  milvus2x: <span class="hljs-comment"># connection configs for the target Milvus 2.x server</span>
    endpoint: <span class="hljs-string">&quot;http://10.102.*.**:19530&quot;</span> <span class="hljs-comment"># address of the target Milvus server.</span>
    username: <span class="hljs-string">&quot;****&quot;</span> <span class="hljs-comment"># username for the Milvus 2.x server.</span>
    password: <span class="hljs-string">&quot;******&quot;</span> <span class="hljs-comment"># password for the Milvus 2.x server.</span>
<button class="copy-code-btn"></button></code></pre>
<p>В следующей таблице описаны параметры в файле конфигурации примера. Полный список конфигураций см. в разделе <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_ES.md#migrationyaml-reference">Миграция Milvus: Elasticsearch на Milvus 2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>Параметр</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>Режим работы задания миграции. Установите значение <code translate="no">elasticsearch</code> при миграции из индексов Elasticsearch.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>Размер буфера для чтения из Elasticsearch в каждом пакете. Единица измерения: КБ.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>Параметр</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>Указывает источник метаконфигураций. В настоящее время поддерживается только <code translate="no">config</code>.</td></tr>
<tr><td><code translate="no">meta.index</code></td><td>Определяет индекс Elasticsearch для переноса данных.</td></tr>
<tr><td><code translate="no">meta.fields</code></td><td>Поля в индексе Elasticsearch, которые необходимо перенести.</td></tr>
<tr><td><code translate="no">meta.fields.name</code></td><td>Имя поля Elasticsearch.</td></tr>
<tr><td><code translate="no">meta.fields.maxLen</code></td><td>Максимальная длина поля. Этот параметр требуется только в том случае, если <code translate="no">meta.fields.type</code> - это <code translate="no">keyword</code> или <code translate="no">text</code>.</td></tr>
<tr><td><code translate="no">meta.fields.pk</code></td><td>Указывает, служит ли поле первичным ключом.</td></tr>
<tr><td><code translate="no">meta.fields.type</code></td><td>Тип данных поля Elasticsearch. В настоящее время в Elasticsearch поддерживаются следующие типы данных: <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/dense-vector.html#dense-vector">dense_vector</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/keyword.html#keyword-field-type">keyword</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/text.html#text-field-type">text</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">long</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">integer</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">double</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">float</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/boolean.html">boolean</a>, <a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/object.html">object</a>.</td></tr>
<tr><td><code translate="no">meta.fields.dims</code></td><td>Размерность векторного поля. Этот параметр требуется только в том случае, если <code translate="no">meta.fields.type</code> - <code translate="no">dense_vector</code>.</td></tr>
<tr><td><code translate="no">meta.milvus</code></td><td>Конфиги, специфичные для создания коллекции в Milvus 2.x.</td></tr>
<tr><td><code translate="no">meta.milvus.collection</code></td><td>Имя коллекции Milvus. По умолчанию используется имя индекса Elasticsearch, если оно не указано.</td></tr>
<tr><td><code translate="no">meta.milvus.closeDynamicField</code></td><td>Указывает, следует ли отключить динамическое поле в коллекции. По умолчанию <code translate="no">false</code>. Дополнительные сведения о динамических полях см. в разделе <a href="https://milvus.io/docs/enable-dynamic-field.md#Enable-Dynamic-Field">Включить динамическое поле</a>.</td></tr>
<tr><td><code translate="no">meta.milvus.shardNum</code></td><td>Количество шардов, которые будут созданы в коллекции. Дополнительные сведения об осколках см. в разделе <a href="https://milvus.io/docs/glossary.md#Shard">Терминология</a>.</td></tr>
<tr><td><code translate="no">meta.milvus.consistencyLevel</code></td><td>Уровень согласованности для коллекции в Milvus. Дополнительные сведения см. в разделе <a href="https://milvus.io/docs/consistency.md">Согласованность</a>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>Параметр</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.es</code></td><td>Конфигурация подключения для исходного сервера Elasticsearch.</td></tr>
<tr><td><code translate="no">source.es.urls</code></td><td>Адрес исходного сервера Elasticsearch.</td></tr>
<tr><td><code translate="no">source.es.username</code></td><td>Имя пользователя для сервера Elasticsearch.</td></tr>
<tr><td><code translate="no">source.es.password</code></td><td>Пароль для сервера Elasticsearch.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>Параметр</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.mode</code></td><td>Место хранения файлов дампа. Допустимые значения:<br/>- <code translate="no">local</code>: Хранить файлы дампа на локальных дисках.<br/>- <code translate="no">remote</code>: Хранить файлы дампа в объектном хранилище.</td></tr>
<tr><td><code translate="no">target.remote.outputDir</code></td><td>Путь к выходному каталогу в облачном хранилище.</td></tr>
<tr><td><code translate="no">target.remote.cloud</code></td><td>Поставщик услуг облачного хранилища. Примерные значения: <code translate="no">aws</code>, <code translate="no">gcp</code>, <code translate="no">azure</code>.</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>Регион облачного хранилища. Может иметь любое значение, если вы используете локальное MinIO.</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>Имя ведра для хранения данных. Значение должно совпадать с конфигом в Milvus 2.x. Дополнительные сведения см. в разделе <a href="https://milvus.io/docs/configure_minio.md#miniobucketName">Конфигурации системы</a>.</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>Использовать ли IAM-роль для подключения.</td></tr>
<tr><td><code translate="no">target.remote.checkBucket</code></td><td>Проверять, существует ли указанный бакет в объектном хранилище.</td></tr>
<tr><td><code translate="no">target.milvus2x</code></td><td>Конфигурация подключения для целевого сервера Milvus 2.x.</td></tr>
<tr><td><code translate="no">target.milvus2x.endpoint</code></td><td>Адрес целевого сервера Milvus.</td></tr>
<tr><td><code translate="no">target.milvus2x.username</code></td><td>Имя пользователя для сервера Milvus 2.x. Этот параметр необходим, если на сервере Milvus включена аутентификация пользователей. Дополнительные сведения см. в разделе <a href="https://milvus.io/docs/authenticate.md">Включение аутентификации</a>.</td></tr>
<tr><td><code translate="no">target.milvus2x.password</code></td><td>Пароль для сервера Milvus 2.x. Этот параметр необходим, если для сервера Milvus включена аутентификация пользователей. Дополнительные сведения см. в разделе <a href="https://milvus.io/docs/authenticate.md">Включить аутентификацию</a>.</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="Start-the-migration-task" class="common-anchor-header">Запуск задачи миграции<button data-href="#Start-the-migration-task" class="anchor-icon" translate="no">
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
    </button></h2><p>Запустите задачу миграции с помощью следующей команды. Замените <code translate="no">{YourConfigFilePath}</code> на локальный каталог, в котором находится файл конфигурации <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-bash">./milvus-migration start --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Ниже приведен пример успешного вывода журнала миграции:</p>
<pre><code translate="no" class="language-bash">[task/load_base_task.go:94] [<span class="hljs-string">&quot;[LoadTasker] Dec Task Processing--------------&gt;&quot;</span>] [Count=0] [fileName=testfiles/output/zwh/migration/test_mul_field4/data_1_1.json] [taskId=442665677354739304]
[task/load_base_task.go:76] [<span class="hljs-string">&quot;[LoadTasker] Progress Task ---------------&gt;&quot;</span>] [fileName=testfiles/output/zwh/migration/test_mul_field4/data_1_1.json] [taskId=442665677354739304]
[dbclient/cus_field_milvus2x.go:86] [<span class="hljs-string">&quot;[Milvus2x] begin to ShowCollectionRows&quot;</span>]
[loader/cus_milvus2x_loader.go:66] [<span class="hljs-string">&quot;[Loader] Static: &quot;</span>] [collection=test_mul_field4_rename1] [beforeCount=50000] [afterCount=100000] [increase=50000]
[loader/cus_milvus2x_loader.go:66] [<span class="hljs-string">&quot;[Loader] Static Total&quot;</span>] [<span class="hljs-string">&quot;Total Collections&quot;</span>=1] [beforeTotalCount=50000] [afterTotalCount=100000] [totalIncrease=50000]
[migration/es_starter.go:25] [<span class="hljs-string">&quot;[Starter] migration ES to Milvus finish!!!&quot;</span>] [Cost=80.009174459]
[starter/starter.go:106] [<span class="hljs-string">&quot;[Starter] Migration Success!&quot;</span>] [Cost=80.00928425]
[cleaner/remote_cleaner.go:27] [<span class="hljs-string">&quot;[Remote Cleaner] Begin to clean files&quot;</span>] [bucket=a-bucket] [rootPath=testfiles/output/zwh/migration]
[cmd/start.go:32] [<span class="hljs-string">&quot;[Cleaner] clean file success!&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-the-result" class="common-anchor-header">Проверка результата<button data-href="#Verify-the-result" class="anchor-icon" translate="no">
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
    </button></h2><p>После выполнения задачи миграции вы можете выполнять вызовы API или использовать Attu для просмотра количества перенесенных сущностей. Дополнительную информацию см. в разделе <a href="https://github.com/zilliztech/attu">Attu</a> и <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a>.</p>
<h2 id="Field-mapping-reference" class="common-anchor-header">Справочник по сопоставлению полей<button data-href="#Field-mapping-reference" class="anchor-icon" translate="no">
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
    </button></h2><p>Ознакомьтесь с приведенной ниже таблицей, чтобы понять, как типы полей в индексах Elasticsearch сопоставляются с типами полей в коллекциях Milvus.</p>
<p>Дополнительные сведения о поддерживаемых типах данных в Milvus см. в разделе <a href="https://milvus.io/docs/schema.md#Supported-data-types">Поддерживаемые типы данных</a>.</p>
<table>
<thead>
<tr><th>Тип поля Elasticsearch</th><th>Тип поля Milvus</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td>плотный_вектор</td><td>FloatVector</td><td>Размеры вектора остаются неизменными при миграции.</td></tr>
<tr><td>ключевое слово</td><td>VarChar</td><td>Устанавливает максимальную длину (от 1 до 65 535). Строки, превышающие этот предел, могут вызвать ошибки миграции.</td></tr>
<tr><td>текст</td><td>VarChar</td><td>Установите максимальную длину (от 1 до 65 535). Строки, превышающие лимит, могут вызвать ошибки миграции.</td></tr>
<tr><td>long</td><td>Int64</td><td>-</td></tr>
<tr><td>целое число</td><td>Int32</td><td>-</td></tr>
<tr><td>двойное</td><td>Double</td><td>-</td></tr>
<tr><td>float</td><td>Float</td><td>-</td></tr>
<tr><td>boolean</td><td>Bool</td><td>-</td></tr>
<tr><td>объект</td><td>JSON</td><td>-</td></tr>
</tbody>
</table>
