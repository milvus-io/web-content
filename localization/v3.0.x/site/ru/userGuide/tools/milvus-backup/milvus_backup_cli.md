---
id: milvus_backup_cli.md
summary: 'Узнайте, как использовать Milvus Backup через командную строку'
title: >-
  Резервное копирование и восстановление данных с помощью командCompatible with
  Milvus Backup 0.5.x
beta: Milvus Backup 0.5.x
---
<h1 id="Back-up-and-Restore-Data-Using-Commands" class="common-anchor-header">Резервное копирование и восстановление данных с помощью команд<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus Backup 0.5.x</span><button data-href="#Back-up-and-Restore-Data-Using-Commands" class="anchor-icon" translate="no">
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
    </button></h1><p>Информацию о текущих рабочих процессах см. в <a href="/docs/ru/milvus_backup_0_6_cli.md">руководстве по CLI</a> или <a href="/docs/ru/milvus_backup_upgrade.md">выполните обновление с версии 0.5.x</a>. Проверьте <a href="/docs/ru/milvus_backup_overview.md#Compatibility-matrix">матрицу совместимости</a> для поддерживаемых версий сервера Milvus.</p>
<p>Milvus Backup предоставляет функции резервного копирования и восстановления данных для обеспечения безопасности ваших данных Milvus.</p>
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
    </button></h2><p>Вы можете либо загрузить скомпилированный бинарный файл, либо собрать программу из исходного кода.</p>
<p>Загрузите бинарный файл для вашей операционной системы и архитектуры из <a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.5.16">выпуска 0.5.16</a>. Используйте соответствующую конфигурацию 0.5.16 и примеры, приведенные на этой странице.</p>
<p>Чтобы собрать версию 0.5.16 из исходного кода, установите Go 1.25 или более позднюю версию и выполните:</p>
<pre><code translate="no" class="language-shell">git clone --branch v0.5.16 --depth 1 https://github.com/zilliztech/milvus-backup.git
cd milvus-backup
go build
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prepare-configuration-file" class="common-anchor-header">Подготовка файла конфигурации<button data-href="#Prepare-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Скачайте <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/configs/backup.yaml">пример файла конфигурации</a> и адаптируйте его под свои нужды.</p>
<p>Затем создайте папку рядом с загруженным или скомпилированным бинарным файлом Milvus Backup, назовите папку « <code translate="no">configs</code> » и поместите файл конфигурации в папку « <code translate="no">configs</code> ».</p>
<p>Структура папок должна выглядеть примерно так:</p>
<pre>
  <code translate="no">
  workspace
  ├── milvus-backup
  └── configs
      └── backup.yaml
  </code>
</pre>
<p>В этом примере в качестве хранилища резервных копий используется MinIO. Настройте файл « <code translate="no">minio.*</code> » в соответствии с вашим хранилищем Milvus и местом назначения резервных копий, включая адреса, учетные данные, имена корзин и корневые пути.</p>
<div class="alert note">
<p>Имя корзины MinIO по умолчанию зависит от способа установки Milvus. При внесении изменений в настройки MinIO руководствуйтесь приведённой ниже таблицей.</p>
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
<h2 id="Prepare-data" class="common-anchor-header">Подготовка данных<button data-href="#Prepare-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Если вы запустили пустой локальный экземпляр Milvus на порту по умолчанию, воспользуйтесь примерами скриптов на Python для генерации данных в вашем экземпляре. Не стесняйтесь вносить в скрипты необходимые изменения в соответствии с вашими потребностями.</p>
<p>Получите <a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py">скрипты</a>. Затем запустите их для генерации данных. Убедитесь, что установлен <a href="https://pypi.org/project/pymilvus/">PyMilvus</a> — официальный SDK Milvus для Python.</p>
<pre><code translate="no" class="language-shell">mkdir -p example
curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py -o example/prepare_data.py
python example/prepare_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Этот шаг не является обязательным. Если вы его пропустите, убедитесь, что в вашем экземпляре Milvus уже имеются некоторые данные.</p>
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
    </button></h2><p>Обратите внимание, что запуск Milvus Backup на экземпляре Milvus обычно не влияет на его работу. Ваш экземпляр Milvus остается полностью работоспособным во время резервного копирования или восстановления.</p>
<div class="tab-wrapper"></div>
<p>Выполните следующую команду для создания резервной копии.</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -n my_backup
<button class="copy-code-btn"></button></code></pre>
<p>После выполнения команды вы можете проверить файлы резервной копии в корзине, указанной в настройках Minio. В частности, вы можете загрузить их с помощью <strong>консоли Minio</strong> или клиента <strong>mc</strong>.</p>
<p>Чтобы загрузить файлы из <a href="https://min.io/docs/minio/kubernetes/upstream/administration/minio-console.html">консоли Minio</a>, войдите в консоль Minio, найдите корзину, указанную в <code translate="no">minio.backupBucketName</code>, выберите файлы в корзине и нажмите <strong>«Загрузить»</strong>, чтобы их скачать.</p>
<p>Если вы предпочитаете <a href="https://min.io/docs/minio/linux/reference/minio-mc.html#mc-install">клиент mc</a>, действуйте следующим образом:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">configure a Minio host</span>
mc alias set my_minio https://&lt;minio_endpoint&gt; &lt;accessKey&gt; &lt;secretKey&gt;
<span class="hljs-meta prompt_">
# </span><span class="language-bash">List the available buckets</span>
mc ls my_minio
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Download a bucket recursively</span>
mc cp --recursive my_minio/&lt;your-bucket-path&gt; &lt;local_dir_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Теперь вы можете сохранить файлы резервных копий в безопасном месте для восстановления в будущем или загрузить их в <a href="https://cloud.zilliz.com">Zilliz Cloud</a>, чтобы создать управляемую векторную базу данных с вашими данными. Подробности см. в разделе <a href="https://zilliz.com/doc/migrate_from_milvus-2x">«Миграция из Milvus в Zilliz Cloud</a>».</p>
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
<p>Вы можете запустить команду ` <code translate="no">restore</code> ` с флагом ` <code translate="no">-s</code> `, чтобы создать новую коллекцию путем восстановления данных из резервной копии:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup -s _recover
<button class="copy-code-btn"></button></code></pre>
<p>Флаг ` <code translate="no">-s</code> ` позволяет задать суффикс для создаваемой новой коллекции. Приведенная выше команда создаст в вашем экземпляре Milvus новую коллекцию с именем <strong>`hello_milvus_recover`</strong>.</p>
<p>Если вы предпочитаете восстановить резервную копию коллекции без изменения её имени, удалите коллекцию перед восстановлением из резервной копии. Теперь вы можете очистить данные, сгенерированные в <a href="#Prepare-data">процессе «Подготовка данных»</a>, выполнив следующую команду.</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/clean_data.py -o example/clean_data.py
python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Затем выполните следующую команду, чтобы восстановить данные из резервной копии.</p>
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
    </button></h2><p>Для одноразовых примеров данных, созданных выше, скрипт «upstream» индексирует и запрашивает коллекции « <code translate="no">hello_milvus_recover</code> » и « <code translate="no">hello_milvus2_recover</code> », а затем <strong>удаляет обе восстановленные коллекции</strong>. Запускайте его только после восстановления обеих примеров коллекций с помощью команды « <code translate="no">_recover</code> ». Для ваших собственных данных сравните их с исходным состоянием на момент создания резервной копии, не используя этот скрипт очистки.</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/verify_data.py -o example/verify_data.py
python example/verify_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Обратите внимание, что приведенный выше скрипт предполагает, что вы выполнили команду <code translate="no">restore</code> с флагом <code translate="no">-s</code>, а суффикс установлен на <code translate="no">_recover</code>. Не стесняйтесь вносить в скрипт необходимые изменения в соответствии с вашими потребностями.</p>
