---
id: milvus_backup_api.md
summary: 'Узнайте, как использовать Milvus Backup через API'
title: >-
  Резервное копирование и восстановление данных с помощью APICompatible with
  Milvus Backup 0.5.x
beta: Milvus Backup 0.5.x
---
<h1 id="Back-up-and-Restore-Data-Using-APIs" class="common-anchor-header">Резервное копирование и восстановление данных с помощью API<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus Backup 0.5.x</span><button data-href="#Back-up-and-Restore-Data-Using-APIs" class="anchor-icon" translate="no">
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
    </button></h1><p>Для ознакомления с текущими рабочими процессами см. <a href="/docs/ru/milvus_backup_0_6_api.md">руководство по HTTP API</a> или <a href="/docs/ru/milvus_backup_upgrade.md">выполните обновление с версии 0.5.x</a>. Проверьте <a href="/docs/ru/milvus_backup_overview.md#Compatibility-matrix">таблицу совместимости</a> для поддержки версий сервера Milvus.</p>
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
<p>Имя корзины MinIO по умолчанию зависит от способа установки Milvus. При внесении изменений в настройки MinIO обращайтесь к приведенной ниже таблице.</p>
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
<h2 id="Start-up-the-API-server" class="common-anchor-header">Запуск сервера API<button data-href="#Start-up-the-API-server" class="anchor-icon" translate="no">
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
    </button></h2><p>Затем вы можете запустить сервер API следующим образом:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server
<button class="copy-code-btn"></button></code></pre>
<p>По умолчанию сервер API прослушивает порт 8080. Вы можете изменить его, запустив сервер с флагом <code translate="no">-p</code>. Чтобы запустить сервер API, прослушивающий порт 443, выполните следующие действия:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server -p 443
<button class="copy-code-btn"></button></code></pre>
<p>Вы можете получить доступ к Swagger UI по адресу http://localhost:<port>/api/v1/docs/index.html.</p>
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
    </button></h2><p>Если вы запустили пустой локальный экземпляр Milvus, прослушивающий порт 19530 по умолчанию, воспользуйтесь примерами скриптов на Python для генерации данных в вашем экземпляре. Не стесняйтесь вносить в скрипты необходимые изменения в соответствии с вашими потребностями.</p>
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
    </button></h2><div class="tab-wrapper"></div>
<p>Обратите внимание, что запуск Milvus Backup на экземпляре Milvus обычно не влияет на его работу. Ваш экземпляр Milvus остается полностью работоспособным во время резервного копирования или восстановления.</p>
<p>Выполните следующую команду для создания резервной копии. При необходимости замените <code translate="no">collection_names</code> и <code translate="no">backup_name</code>.</p>
<pre><code translate="no" class="language-shell">curl --location --request POST &#x27;http://localhost:8080/api/v1/create&#x27; \
--header &#x27;Content-Type: application/json&#x27; \
--data-raw &#x27;{
  &quot;async&quot;: true,
  &quot;backup_name&quot;: &quot;my_backup&quot;,
  &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ]
}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Запрос на создание выполняется асинхронно. Опрашивайте <code translate="no">get_backup</code>, используя возвращённый <code translate="no">requestId</code> в качестве <code translate="no">backup_id</code>, и дождитесь, пока <code translate="no">data.state_code</code> станет <code translate="no">2</code>, прежде чем приступить к восстановлению.</p>
<p>Вы можете отобразить список резервных копий в корзине, указанной в настройках Minio, следующим образом:</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/list&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Получите метаданные резервной копии следующим образом:</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/get_backup?backup_id=&lt;test_backup_id&gt;&amp;backup_name=my_backup&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Замените <code translate="no">backup_id</code> и <code translate="no">backup_name</code> на значения, соответствующие вашей резервной копии. Этот конечный пункт возвращает метаданные в формате JSON, а не файлы резервных копий. При архивировании скопируйте весь каталог резервных копий из объектного хранилища.</p>
<p>Теперь вы можете сохранить файлы резервных копий в надёжном месте для восстановления в будущем или загрузить их в <a href="https://cloud.zilliz.com">Zilliz Cloud</a>, чтобы создать управляемую векторную базу данных с вашими данными. Подробности см. в разделе <a href="https://zilliz.com/doc/migrate_from_milvus-2x">«Миграция из Milvus в Zilliz Cloud</a>».</p>
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
<p>Вы можете вызвать команду API восстановления с параметром ` <code translate="no">collection_suffix</code> `, чтобы создать новую коллекцию путем восстановления данных из резервной копии. При необходимости измените значения ` <code translate="no">collection_names</code> ` и ` <code translate="no">backup_name</code> `.</p>
<pre><code translate="no" class="language-shell">curl --location --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
--header &#x27;Content-Type: application/json&#x27; \
--data-raw &#x27;{
    &quot;async&quot;: true,
    &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ],
    &quot;collection_suffix&quot;: &quot;_recover&quot;,
    &quot;backup_name&quot;:&quot;my_backup&quot;
}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Параметр <code translate="no">collection_suffix</code> позволяет задать суффикс для создаваемой новой коллекции. Приведенная выше команда создаст в вашем экземпляре Milvus новую коллекцию с именем <strong>hello_milvus_recover</strong>.</p>
<p>Если вы предпочитаете восстановить резервную копию коллекции без изменения её имени, удалите коллекцию перед восстановлением из резервной копии. Теперь вы можете очистить данные, сгенерированные в <a href="#Prepare-data">этапе «Подготовка данных»</a>, выполнив следующую команду.</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/clean_data.py -o example/clean_data.py
python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>Затем выполните следующую команду для восстановления данных из резервной копии.</p>
<pre><code translate="no" class="language-shell">curl --location --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
--header &#x27;Content-Type: application/json&#x27; \
--data-raw &#x27;{
    &quot;async&quot;: true,
    &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ],
    &quot;collection_suffix&quot;: &quot;&quot;,
    &quot;backup_name&quot;:&quot;my_backup&quot;
}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Процесс восстановления может занять много времени в зависимости от объема восстанавливаемых данных. Поэтому в приведенных выше примерах используется асинхронное выполнение с помощью параметра ` <code translate="no">&quot;async&quot;: true</code>`. Проверить статус задачи восстановления можно с помощью следующей команды:</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/get_restore?id=&lt;test_restore_id&gt;&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Не забудьте заменить <code translate="no">test_restore_id</code> на <code translate="no">data.id</code>, возвращаемый API восстановления. Перед проверкой данных дождитесь, пока статус « <code translate="no">data.state_code</code> » не станет « <code translate="no">2</code> »; статус « <code translate="no">3</code> » означает сбой, а « <code translate="no">4</code> » — превышение времени ожидания.</p>
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
    </button></h2><p>После успешного завершения задачи убедитесь, что существует <code translate="no">hello_milvus_recover</code>. Создайте подходящий индекс, загрузите коллекцию и сравните количество сущностей, скалярные и векторные значения, а также результаты поиска с исходными данными, сохраненными перед резервным копированием. Для восстановления с сохранением исходных имен используйте вместо этого <code translate="no">hello_milvus</code>.</p>
<p>Пример <code translate="no">verify_data.py</code>, на который есть ссылка в руководстве по CLI, предполагает наличие двух восстановленных коллекций и удаляет их в конце. Он не подходит для данного примера использования API, в котором выбирается только <code translate="no">hello_milvus</code>.</p>
