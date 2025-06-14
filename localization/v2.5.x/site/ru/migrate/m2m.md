---
id: m2m.md
summary: >-
  В этом руководстве представлен полный пошаговый процесс переноса данных из
  Milvus 1.x (включая 0.9.x и выше) в Milvus 2.x.
title: С Milvus 1.x
---

<h1 id="From-Milvus-1x" class="common-anchor-header">С Milvus 1.x<button data-href="#From-Milvus-1x" class="anchor-icon" translate="no">
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
    </button></h1><p>В этом руководстве представлен полный пошаговый процесс переноса данных с Milvus 1.x (включая 0.9.x и выше) на Milvus 2.x. Следуя этому руководству, вы сможете эффективно перенести свои данные, используя расширенные возможности Milvus 2.x и улучшенную производительность.</p>
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
<li>Исходный Milvus: 0.9.x - 1.x</li>
<li>Целевой Milvus: 2.x</li>
</ul></li>
<li><strong>Необходимые инструменты</strong>:<ul>
<li>Инструмент<a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a>. Подробности установки см. в разделе <a href="/docs/ru/v2.5.x/milvusdm_install.md">Установка инструмента миграции</a>.</li>
</ul></li>
</ul>
<h2 id="Export-metadata-of-the-source-Milvus-installation" class="common-anchor-header">Экспорт метаданных исходной установки Milvus<button data-href="#Export-metadata-of-the-source-Milvus-installation" class="anchor-icon" translate="no">
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
    </button></h2><p>Чтобы подготовить данные миграции для Milvus 0.9.x - 1.x, остановите исходный Milvus или, по крайней мере, прекратите выполнять в нем любые операции DML.</p>
<ol>
<li><p>Экспортируйте метаданные исходной установки Milvus на <code translate="no">meta.json</code>.</p>
<ul>
<li>Для инсталляций, использующих MySQL в качестве бэкенда, выполните команду</li>
</ul>
<pre><code translate="no" class="language-bash">./milvus-migration <span class="hljs-built_in">export</span> -m <span class="hljs-string">&quot;user:password@tcp(adderss)/milvus?charset=utf8mb4&amp;parseTime=True&amp;loc=Local&quot;</span> -o outputDir
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Для установок, использующих SQLite в качестве бэкенда, выполните команду</li>
</ul>
<pre><code translate="no" class="language-bash">./milvus-migration <span class="hljs-built_in">export</span> -s /milvus/db/meta.sqlite -o outputDir
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Скопируйте папку <code translate="no">tables</code> вашей установки Milvus, затем переместите папки <code translate="no">meta.json</code> и <code translate="no">tables</code> в пустую папку.</p>
<p>После выполнения этого шага структура пустой папки должна выглядеть следующим образом:</p>
<pre><code translate="no">migration_data
├── meta.json
└── tables
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Загрузите папку, подготовленную на предыдущем шаге, в ведро блочного хранилища S3 или напрямую используйте эту локальную папку в следующем разделе.</p></li>
</ol>
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
    </button></h2><p>Сохраните пример файла конфигурации миграции как <code translate="no">migration.yaml</code> и измените конфигурацию в соответствии с вашими реальными условиями. Вы можете поместить файл конфигурации в любой локальный каталог.</p>
<pre><code translate="no" class="language-yaml">dumper:
  worker:
    <span class="hljs-built_in">limit</span>: 2
    workMode: milvus1x
    reader:
      bufferSize: 1024
    writer:
      bufferSize: 1024
loader:
  worker:
    <span class="hljs-built_in">limit</span>: 16
meta:
  mode: <span class="hljs-built_in">local</span>
  localFile: /outputDir/test/meta.json
<span class="hljs-built_in">source</span>:
  mode: <span class="hljs-built_in">local</span>
  <span class="hljs-built_in">local</span>:
    tablesDir: /db/tables/
target:
  mode: remote
  remote:
    outputDir: <span class="hljs-string">&quot;migration/test/xx&quot;</span>
    ak: xxxx
    sk: xxxx
    cloud: aws
    region: us-west-2
    bucket: xxxxx
    useIAM: <span class="hljs-literal">true</span>
    checkBucket: <span class="hljs-literal">false</span>
  milvus2x:
    endpoint: <span class="hljs-string">&quot;{yourMilvus2_xServerAddress}:{port}&quot;</span>
    username: xxxx
    password: xxxx
<button class="copy-code-btn"></button></code></pre>
<p>В следующей таблице описаны параметры в файле конфигурации примера. Полный список конфигураций см. в разделе <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_1X.md#migrationyaml-reference">Миграция Milvus: Milvus1.x - Milvus 2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>Параметр</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.limit</code></td><td>Параметр параллельности потоков дампера.</td></tr>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>Режим работы задания миграции. Установите значение <code translate="no">milvus1x</code> при миграции с Milvus 1.x.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>Размер буфера для чтения из Milvus 1.x в каждом пакете. Единица измерения: КБ.</td></tr>
<tr><td><code translate="no">dumper.worker.writer.bufferSize</code></td><td>Размер буфера для записи в Milvus 2.x в каждом пакете. Единицы измерения: КБ.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">loader</code></p>
<table>
<thead>
<tr><th>Параметр</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">loader.worker.limit</code></td><td>Параметр параллельности потоков загрузчика.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>Параметр</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>Указывает, откуда считывается метафайл meta.json. Допустимые значения: <code translate="no">local</code>, <code translate="no">remote</code>, <code translate="no">mysql</code>, <code translate="no">sqlite</code>.</td></tr>
<tr><td><code translate="no">meta.localFile</code></td><td>Путь к локальной директории, в которой находится файл <code translate="no">meta.json</code>. Этот конфиг используется только в том случае, если для <code translate="no">meta.mode</code> установлено значение <code translate="no">local</code>. О других конфигурациях метафайлов читайте в <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_1X.md#meta">README_1X</a>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>Параметр</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.mode</code></td><td>Указывает, откуда считываются исходные файлы. Допустимые значения:<br/>- <code translate="no">local</code>: считывает файлы с локального диска.<br/>- <code translate="no">remote</code>: считывает файлы с удаленного хранилища.</td></tr>
<tr><td><code translate="no">source.local.tablesDir</code></td><td>Путь к каталогу, в котором находятся исходные файлы. Например, <code translate="no">/db/tables/</code>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>Параметр</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.mode</code></td><td>Место хранения сброшенных файлов. Допустимые значения:<br/>- <code translate="no">local</code>: Хранить файлы дампа на локальных дисках.<br/>- <code translate="no">remote</code>: Хранить файлы дампа в объектном хранилище.</td></tr>
<tr><td><code translate="no">target.remote.outputDir</code></td><td>Путь к выходному каталогу в облачном хранилище.</td></tr>
<tr><td><code translate="no">target.remote.ak</code></td><td>Ключ доступа для хранилища Milvus 2.x.</td></tr>
<tr><td><code translate="no">target.remote.sk</code></td><td>Секретный ключ для хранилища Milvus 2.x.</td></tr>
<tr><td><code translate="no">target.remote.cloud</code></td><td>Поставщик услуг облачного хранилища. Примерные значения: <code translate="no">aws</code>, <code translate="no">gcp</code>, <code translate="no">azure</code>.</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>Регион облачного хранилища. Может быть любым значением, если вы используете локальное MinIO.</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>Имя ведра для хранения данных. Значение должно совпадать с конфигом в Milvus 2.x. Дополнительные сведения см. в разделе <a href="https://milvus.io/docs/configure_minio.md#miniobucketName">Конфигурации системы</a>.</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>Использовать ли IAM-роль для подключения.</td></tr>
<tr><td><code translate="no">target.remote.checkBucket</code></td><td>Проверять, существует ли указанный бакет в хранилище объектов.</td></tr>
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
    </button></h2><ol>
<li><p>Запустите задачу миграции с помощью следующей команды. Замените <code translate="no">{YourConfigFilePath}</code> на локальный каталог, в котором находится файл конфигурации <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-bash">./milvus-migration  dump  --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Приведенная выше команда преобразует исходные данные в Milvus 1.x в файлы NumPy, а затем использует операцию <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">bulkInsert</a> для записи данных в целевой бакет.</p></li>
<li><p>После создания файлов NumPy импортируйте их в Milvus 2.x с помощью следующей команды. Замените <code translate="no">{YourConfigFilePath}</code> на локальный каталог, в котором находится файл конфигурации <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-bash">./milvus-migration  load  --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Verify-the-result" class="common-anchor-header">Проверьте результат<button data-href="#Verify-the-result" class="anchor-icon" translate="no">
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
    </button></h2><p>После выполнения задачи миграции вы можете выполнить вызовы API или использовать Attu для просмотра количества перенесенных сущностей. Дополнительные сведения см. в разделе <a href="https://github.com/zilliztech/attu">Attu</a> и <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a>.</p>
