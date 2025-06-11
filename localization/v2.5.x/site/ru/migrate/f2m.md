---
id: f2m.md
title: Из Faiss
related_key: "Faiss, migrate, import"
summary: "Узнайте, как перенести данные Faiss в Milvus."
---

<h1 id="From-Faiss" class="common-anchor-header">Из Faiss<button data-href="#From-Faiss" class="anchor-icon" translate="no">
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
    </button></h1><p>В этом руководстве представлен полный пошаговый процесс переноса данных из Faiss в Milvus 2.x. Следуя этому руководству, вы сможете эффективно перенести свои данные, используя расширенные возможности Milvus 2.x и улучшенную производительность.</p>
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
<li>Исходный Faiss</li>
<li>Целевой Milvus: 2.x</li>
<li>Подробности установки см. в разделах <a href="https://github.com/facebookresearch/faiss/blob/main/INSTALL.md">"Установка Faiss"</a> и <a href="https://milvus.io/docs/install_standalone-docker.md">"Установка Milvus</a>".</li>
</ul></li>
<li><strong>Необходимые инструменты</strong>:<ul>
<li>Инструмент<a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a>. Подробности установки см. в разделе <a href="/docs/ru/v2.5.x/milvusdm_install.md">Установка инструмента миграции</a>.</li>
</ul></li>
</ul>
<h2 id="Configure-the-migration" class="common-anchor-header">Настройка миграции<button data-href="#Configure-the-migration" class="anchor-icon" translate="no">
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
<pre><code translate="no" class="language-yaml">dumper: <span class="hljs-comment"># configs for the migration job.</span>
  worker:
    <span class="hljs-built_in">limit</span>: 2
    workMode: faiss    <span class="hljs-comment"># operational mode of the migration job.</span>
    reader:
      bufferSize: 1024
    writer:
      bufferSize: 1024
loader:
  worker:
    <span class="hljs-built_in">limit</span>: 2
<span class="hljs-built_in">source</span>: <span class="hljs-comment"># configs for the source Faiss index.</span>
  mode: <span class="hljs-built_in">local</span>
  <span class="hljs-built_in">local</span>:
    faissFile: ./testfiles/faiss/faiss_ivf_flat.index

target: <span class="hljs-comment"># configs for the target Milvus collection.</span>
create:
collection:
name: test1w
shardsNums: 2
dim: 256
metricType: L2

mode: remote
remote:
outputDir: testfiles/output/
cloud: aws
endpoint: 0.0.0.0:9000
region: ap-southeast-1
bucket: a-bucket
ak: minioadmin
sk: minioadmin
useIAM: <span class="hljs-literal">false</span>
useSSL: <span class="hljs-literal">false</span>
checkBucket: <span class="hljs-literal">true</span>
milvus2x:
endpoint: localhost:19530
username: xxxxx
password: xxxxx

<button class="copy-code-btn"></button></code></pre>

<p>В следующей таблице описаны параметры в файле конфигурации примера. Полный список конфигураций см. в разделе <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_FAISS.md#migrationyaml-reference">Миграция Milvus: Faiss на Milvus 2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>Параметр</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.limit</code></td><td>Параметр параллельности потоков дампера.</td></tr>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>Режим работы задания миграции. Установите значение faiss при миграции из индексов Faiss.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>Размер буфера для чтения из Faiss в каждом пакете. Единица измерения: КБ.</td></tr>
<tr><td><code translate="no">dumper.worker.writer.bufferSize</code></td><td>Размер буфера для записи в Milvus в каждом пакете. Единицы измерения: КБ.</td></tr>
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
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>Параметр</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.mode</code></td><td>Указывает, откуда считываются исходные файлы. Допустимые значения:<br/>- <code translate="no">local</code>: считывает файлы с локального диска.<br/>- <code translate="no">remote</code>: считывает файлы с удаленного хранилища.</td></tr>
<tr><td><code translate="no">source.local.faissFile</code></td><td>Путь к каталогу, в котором находятся исходные файлы. Например, <code translate="no">/db/faiss.index</code>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>Параметр</th><th>Описание</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.create.collection.name</code></td><td>Имя коллекции Milvus.</td></tr>
<tr><td><code translate="no">target.create.collection.shardsNums</code></td><td>Количество шардов, которые будут созданы в коллекции. Дополнительные сведения об осколках см. в разделе <a href="https://milvus.io/docs/glossary.md#Shard">Терминология</a>.</td></tr>
<tr><td><code translate="no">target.create.collection.dim</code></td><td>Размерность векторного поля.</td></tr>
<tr><td><code translate="no">target.create.collection.metricType</code></td><td>Тип метрики, используемый для измерения сходства между векторами. Дополнительные сведения см. в разделе <a href="https://milvus.io/docs/glossary.md#Metric-type">Терминология</a>.</td></tr>
<tr><td><code translate="no">target.mode</code></td><td>Место хранения файлов дампа. Допустимые значения:<br/>- <code translate="no">local</code>: хранить файлы дампа на локальных дисках.<br/>- <code translate="no">remote</code>: хранить файлы дампа в объектном хранилище.</td></tr>
<tr><td><code translate="no">target.remote.outputDir</code></td><td>Путь к выходному каталогу в облачном хранилище.</td></tr>
<tr><td><code translate="no">target.remote.cloud</code></td><td>Поставщик услуг облачного хранилища. Примерные значения: <code translate="no">aws</code>, <code translate="no">gcp</code>, <code translate="no">azure</code>.</td></tr>
<tr><td><code translate="no">target.remote.endpoint</code></td><td>Конечная точка хранилища Milvus 2.x.</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>Регион облачного хранилища. Может иметь любое значение, если вы используете локальное MinIO.</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>Имя ведра для хранения данных. Значение должно совпадать с конфигом в Milvus 2.x. Дополнительные сведения см. в разделе <a href="https://milvus.io/docs/configure_minio.md#miniobucketName">Конфигурации системы</a>.</td></tr>
<tr><td><code translate="no">target.remote.ak</code></td><td>Ключ доступа для хранилища Milvus 2.x.</td></tr>
<tr><td><code translate="no">target.remote.sk</code></td><td>Секретный ключ для хранилища Milvus 2.x.</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>Использовать ли IAM-роль для подключения.</td></tr>
<tr><td><code translate="no">target.remote.useSSL</code></td><td>Включать ли SSL при подключении к Milvus 2.x. Дополнительные сведения см. в разделе <a href="https://milvus.io/docs/tls.md#Encryption-in-Transit">Шифрование при транзите</a>.</td></tr>
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
<p>Приведенная выше команда преобразует данные индекса Фейса в файлы NumPy, а затем использует операцию <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">bulkInsert</a> для записи данных в целевой бакет.</p></li>
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
