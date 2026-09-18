---
id: milvus_backup_0_6_api.md
summary: >-
  Создавайте и контролируйте задачи резервного копирования и восстановления в
  Milvus Backup 0.6.0 с помощью HTTP-API.
title: Использование HTTP-API Milvus Backup 0.6.0
---
<h1 id="Use-the-Milvus-Backup-060-HTTP-API" class="common-anchor-header">Использование HTTP-API Milvus Backup 0.6.0<button data-href="#Use-the-Milvus-Backup-060-HTTP-API" class="anchor-icon" translate="no">
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
    </button></h1><p>Используйте HTTP-API Milvus Backup для создания резервных копий, восстановления коллекций и мониторинга асинхронных задач. В приведенном ниже примере используется <strong>Milvus Backup 0.6.0</strong> с <strong>Milvus 3.0.1 или более поздней версией</strong>. Для версии Backup 0.5.x воспользуйтесь <a href="/docs/ru/milvus_backup_api.md">руководством по API версии 0.5.x</a>. Для существующей установки см. раздел <a href="/docs/ru/milvus_backup_upgrade.md">«Обновление Milvus Backup</a>».</p>
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
    </button></h2><p>Загрузите и распакуйте соответствующий бинарный файл из <a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">релиза v0.6.0</a>. Чтобы собрать программу из исходного кода, следуйте <a href="/docs/ru/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">инструкциям в разделе «Получение Milvus Backup»</a>; для сборки требуется Go версии 1.26 или более поздней.</p>
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
    </button></h2><p>Создайте <a href="/docs/ru/milvus_backup_0_6_cli.md#Prepare-configuration-file">файл</a>` <code translate="no">configs/backup.yaml</code> `, используя пример версии v2, приведенный в <a href="/docs/ru/milvus_backup_0_6_cli.md#Prepare-configuration-file">разделе «Подготовка конфигурационного файла</a>». Настройте доступ к Milvus, хранилищу экземпляра и месту назначения резервной копии. Сервер Milvus также должен иметь доступ к хранилищу резервных копий для операций создания моментальных снимков.</p>
<p>Если у вас есть файл версии v1, его по-прежнему можно загрузить. См. <a href="/docs/ru/milvus_backup_upgrade.md#Migrate-the-configuration">раздел «Миграция конфигурации»</a> перед изменением схемы или переменных среды.</p>
<p>Из каталога, содержащего исполняемый файл, проверьте конфигурацию и подключение:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup.yaml
./milvus-backup check --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Продолжайте, когда проверка подключения покажет сообщение « <code translate="no">Success!</code> ».</p>
<h2 id="Start-up-the-API-server" class="common-anchor-header">Запустите сервер API<button data-href="#Start-up-the-API-server" class="anchor-icon" translate="no">
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
    </button></h2><p>Запустите службу с проверенной конфигурацией:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Порт по умолчанию — 8080. Чтобы выбрать другой порт, используйте <code translate="no">-p</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server -p 18080 --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Для данной службы запускайте только одну из этих команд. В приведенных ниже примерах используется порт 8080; измените URL-адреса, если вы выбрали другой порт. Swagger UI доступен по адресу <code translate="no">http://localhost:8080/api/v1/docs/index.html</code>.</p>
<p>Обеспечьте непрерывную работу службы во время опроса задач. Идентификаторы задач и текущий прогресс привязаны к процессу службы; сохраненная резервная копия остается в хранилище объектов после остановки процесса.</p>
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
    </button></h2><p>Используйте существующую коллекцию с именем <code translate="no">coll</code> или создайте тестовую коллекцию из 256 сущностей, как описано в разделе <a href="/docs/ru/snapshot-backup-and-restore.md#Prepare-sample-data">«Подготовка примеров данных</a>». Измените имена коллекций в запросах, если вы используете собственные данные. Не изменяйте тестовые данные во время проверки результатов.</p>
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
    </button></h2><p>Отправьте асинхронный запрос на резервное копирование:</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/create&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;]
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>В ответе содержится значение <code translate="no">requestId</code>. Отправка запроса не означает, что резервное копирование завершено. Скопируйте это значение в поле <code translate="no">backup_id</code> и выполняйте опрос:</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/get_backup?backup_id=BACKUP_REQUEST_ID&amp;backup_name=my_backup&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Дождитесь, пока значение <code translate="no">data.state_code</code> изменится на <code translate="no">2</code>. API использует следующие состояния задач:</p>
<table>
<thead>
<tr><th><code translate="no">state_code</code></th><th>Значение</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">0</code></td><td>Начальное</td></tr>
<tr><td><code translate="no">1</code></td><td>Выполняется</td></tr>
<tr><td><code translate="no">2</code></td><td>Успешно</td></tr>
<tr><td><code translate="no">3</code></td><td>Сбой</td></tr>
<tr><td><code translate="no">4</code></td><td>Время ожидания истекло</td></tr>
</tbody>
</table>
<p>Проверьте как ответ, так и состояние задачи. Одного кода HTTP 200 недостаточно: ненулевое значение параметра « <code translate="no">code</code> » в ответе указывает на ошибку. В случае успешного ответа параметр « <code translate="no">code</code> » может отсутствовать, поскольку его значение равно нулю. Если задача завершилась сбоем или истекло время ожидания, проверьте детали ответа и журнал сервера перед восстановлением из этой резервной копии.</p>
<p>Выведите список сохраненных резервных копий и проверьте завершенную резервную копию по имени:</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/list&#x27;
curl &#x27;http://localhost:8080/api/v1/get_backup?backup_name=my_backup&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">get_backup</code> возвращает метаданные в формате JSON, включая <code translate="no">collection_backups</code>; при этом файлы резервных копий <strong>не</strong> загружаются. Для резервной копии, созданной другим процессом, запрос только по имени может вернуть метаданные без информации о текущем ходе выполнения задачи. При мониторинге активной резервной копии используйте идентификатор задачи из ответа на запрос create текущего сервиса.</p>
<p>Формат по умолчанию — <code translate="no">auto</code>, который выбирает моментальный снимок в Milvus 3.0. Чтобы явно запросить бинарный журнал, добавьте <code translate="no">&quot;format&quot;: &quot;binlog&quot;</code> в тело запроса create. Предустановленные значения CLI <code translate="no">--for</code> не являются полем HTTP-запроса.</p>
<p>Чтобы сохранить или переместить резервную копию, скопируйте весь каталог в объектное хранилище. См. <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/transfer.md">руководство по переносу версии 0.6.0</a>.</p>
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
    </button></h2><p>Убедитесь, что <code translate="no">coll_bak</code> ещё не существует. Отправьте запрос на восстановление с суффиксом:</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;],
    &quot;collection_suffix&quot;: &quot;_bak&quot;
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Поле HTTP <code translate="no">collection_names</code> выбирает имена <strong>в резервной копии</strong> до применения суффикса. Данный запрос выбирает <code translate="no">coll</code> и создает <code translate="no">coll_bak</code>. Параметр CLI <code translate="no">--filter</code>, напротив, сопоставляет имена целей после переименования; не подставляйте <code translate="no">coll_bak</code> в это поле HTTP.</p>
<p>Скопируйте <code translate="no">data.id</code> из ответа на восстановление и выполните опрос задачи:</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/get_restore?id=RESTORE_TASK_ID&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Дождитесь появления <code translate="no">data.state_code: 2</code> и проверьте на сайте <code translate="no">collection_restore_tasks</code> наличие ожидаемой коллекции целей. Отправленная задача ещё не означает, что восстановление прошло успешно.</p>
<h3 id="Restore-with-the-original-name" class="common-anchor-header">Восстановление с исходным именем<button data-href="#Restore-with-the-original-name" class="anchor-icon" translate="no">
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
    </button></h3><p>Используйте целевой экземпляр, в котором <code translate="no">coll</code> не существует. Запустите отдельный сервис API резервного копирования, настроенный для этой цели и места завершенного резервного копирования, затем отправьте этот запрос целевому сервису:</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;],
    &quot;collection_suffix&quot;: &quot;&quot;
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>Опрашивайте <code translate="no">get_restore</code> на том же сервисе, используя возвращенный ID задачи. Настройте <code translate="no">milvus.*</code> для целевого объекта восстановления и <code translate="no">backup.storage</code> для существующей резервной копии. См. раздел <a href="/docs/ru/milvus_backup_0_6_cli.md#Prepare-configuration-file">«Подготовка файла конфигурации</a>».</p>
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
    </button></h2><p>После успешного завершения задачи восстановления подключитесь к целевому экземпляру Milvus и убедитесь, что ожидаемая коллекция и данные существуют. Для тестовой коллекции из 256 объектов воспользуйтесь полными проверками скалярных величин, векторов и поиска, описанными в разделе <a href="/docs/ru/snapshot-backup-and-restore.md#Verify-the-result">«Проверка результата</a>».</p>
<p>Замените <code translate="no">coll_bak</code> на <code translate="no">coll</code> при восстановлении с сохранением исходного имени. Программа проверки считывает восстановленные данные, не удаляя их. Для производственных данных сравните их с базовым набором данных, зафиксированным на момент резервного копирования.</p>
