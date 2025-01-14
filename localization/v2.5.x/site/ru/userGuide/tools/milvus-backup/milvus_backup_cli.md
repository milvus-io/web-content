---
id: milvus_backup_cli.md
summary: 'Узнайте, как использовать Milvus Backup с помощью CLI'
title: Резервное копирование и восстановление данных с помощью команд
---
<h1 id="Back-up-and-Restore-Data-Using-Commands" class="common-anchor-header">Резервное копирование и восстановление данных с помощью команд<button data-href="#Back-up-and-Restore-Data-Using-Commands" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Backup предоставляет функции резервного копирования и восстановления данных для обеспечения безопасности ваших данных Milvus.</p>
<h2 id="Obtain-Milvus-Backup" class="common-anchor-header">Получение Milvus Backup<button data-href="#Obtain-Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h2><p>Вы можете загрузить скомпилированный двоичный файл или собрать его из исходных текстов.</p>
<p>Чтобы загрузить скомпилированный двоичный файл, перейдите на страницу <a href="https://github.com/zilliztech/milvus-backup/releases">релиза</a>, где вы найдете все официальные релизы. Помните, что всегда используйте двоичные файлы из релиза, помеченного как <strong>Latest</strong>.</p>
<p>Чтобы скомпилировать из исходников, сделайте следующее:</p>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> git@github.com:zilliztech/milvus-backup.git
go get
go build
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prepare-configuration-file" class="common-anchor-header">Подготовьте конфигурационный файл<button data-href="#Prepare-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Скачайте <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/master/configs/backup.yaml">пример конфигурационного файла</a> и измените его в соответствии с вашими потребностями.</p>
<p>Затем создайте папку рядом с загруженным или собранным двоичным файлом Milvus Backup, назовите ее <code translate="no">configs</code>, а файл конфигурации поместите в папку <code translate="no">configs</code>.</p>
<p>Структура папки должна быть похожа на следующую:</p>
<pre>
  <code translate="no">
  workspace
  ├── milvus-backup
  └── configs
      └── backup.yaml
  </code>
</pre>
<p>Поскольку Milvus Backup не может создавать резервные копии данных по локальному пути, при настройке файла конфигурации убедитесь, что настройки Minio верны.</p>
<div class="alert note">
<p>Имя ведра Minio по умолчанию зависит от способа установки Milvus. При внесении изменений в настройки Minio руководствуйтесь следующей таблицей.</p>
<table>
<thead>
<tr><th>поле</th><th>Docker Compose</th><th>Helm / Milvus Operator</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">bucketName</code></td><td>a-bucket</td><td>milvus-bucket</td></tr>
<tr><td><code translate="no">rootPath</code></td><td>файлы</td><td>файл</td></tr>
</tbody>
</table>
</div>
<h2 id="Prepare-data" class="common-anchor-header">Подготовьте данные<button data-href="#Prepare-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Если вы запустили пустой локальный экземпляр Milvus с портом по умолчанию, используйте примеры Python-скриптов, чтобы сгенерировать некоторые данные в вашем экземпляре. Не стесняйтесь вносить необходимые изменения в скрипты, чтобы они соответствовали вашим потребностям.</p>
<p>Получите <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/main/example/prepare_data.py">сценарии</a>. Затем запустите скрипты для генерации данных. Убедитесь, что <a href="https://pypi.org/project/pymilvus/">PyMilvus</a>, официальный Milvus Python SDK, установлен.</p>
<pre><code translate="no" class="language-shell">python example/prepare_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Этот шаг необязателен. Если вы его пропустите, убедитесь, что в вашем экземпляре Milvus уже есть данные.</p>
<h2 id="Back-up-data" class="common-anchor-header">Резервное копирование данных<button data-href="#Back-up-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Обратите внимание, что запуск Milvus Backup на экземпляре Milvus обычно не влияет на работу экземпляра. Ваш экземпляр Milvus будет полностью функционировать во время резервного копирования или восстановления.</p>
<div class="tab-wrapper"></div>
<p>Выполните следующую команду, чтобы создать резервную копию.</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -n &lt;backup_name&gt;
<button class="copy-code-btn"></button></code></pre>
<p>После выполнения команды вы можете проверить файлы резервной копии в ведре, указанном в настройках Minio. В частности, их можно загрузить с помощью <strong>Minio Console</strong> или клиента <strong>mc</strong>.</p>
<p>Чтобы загрузить файлы из <a href="https://min.io/docs/minio/kubernetes/upstream/administration/minio-console.html">Minio Console</a>, войдите в Minio Console, найдите ведро, указанное в <code translate="no">minio.address</code>, выберите файлы в этом ведре и нажмите кнопку <strong>Загрузить</strong>, чтобы загрузить их.</p>
<p>Если вы предпочитаете <a href="https://min.io/docs/minio/linux/reference/minio-mc.html#mc-install">клиент mc</a>, выполните следующие действия:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># configure a Minio host</span>
mc alias <span class="hljs-built_in">set</span> my_minio https://&lt;minio_endpoint&gt; &lt;accessKey&gt; &lt;secretKey&gt;

<span class="hljs-comment"># List the available buckets</span>
mc ls my_minio

<span class="hljs-comment"># Download a bucket recursively</span>
mc cp --recursive my_minio/&lt;your-bucket-path&gt; &lt;local_dir_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Теперь вы можете сохранить файлы резервных копий в безопасном месте для восстановления в будущем или загрузить их в <a href="https://cloud.zilliz.com">Zilliz Cloud</a>, чтобы создать управляемую векторную базу данных с вашими данными. Подробнее см. в разделе <a href="https://zilliz.com/doc/migrate_from_milvus-2x">Миграция из Milvus в Zilliz Cloud</a>.</p>
<h2 id="Restore-data" class="common-anchor-header">Восстановление данных<button data-href="#Restore-data" class="anchor-icon" translate="no">
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
    </button></h2><div class="tab-wrapper"></div>
<p>Вы можете выполнить команду <code translate="no">restore</code> с флагом <code translate="no">-s</code>, чтобы создать новую коллекцию, восстановив данные из резервной копии:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup -s _recover
<button class="copy-code-btn"></button></code></pre>
<p>Флаг <code translate="no">-s</code> позволяет задать суффикс для создаваемой коллекции. Приведенная выше команда создаст новую коллекцию под названием <strong>hello_milvus_recover</strong> в вашем экземпляре Milvus.</p>
<p>Если вы предпочитаете восстановить резервную копию коллекции без изменения ее имени, отбросьте коллекцию перед ее восстановлением из резервной копии. Теперь вы можете очистить данные, сгенерированные в <a href="#Prepare-data">Prepare data</a>, выполнив следующую команду.</p>
<pre><code translate="no" class="language-shell">python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Затем выполните следующую команду для восстановления данных из резервной копии.</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-restored-data" class="common-anchor-header">Проверка восстановленных данных<button data-href="#Verify-restored-data" class="anchor-icon" translate="no">
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
    </button></h2><p>После завершения восстановления можно проверить восстановленные данные, проиндексировав восстановленную коллекцию следующим образом:</p>
<pre><code translate="no" class="language-shell">python example/verify_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Обратите внимание, что в приведенном выше сценарии предполагается, что вы выполнили команду <code translate="no">restore</code> с флагом <code translate="no">-s</code> и суффикс установлен на <code translate="no">-recover</code>. Не стесняйтесь вносить необходимые изменения в сценарий в соответствии с вашими потребностями.</p>
