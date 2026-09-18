---
id: milvus_backup_0_6_cli.md
summary: >-
  Настройте Milvus Backup 0.6.0, создайте резервную копию и проверьте
  восстановленные данные с помощью командной строки.
title: Используйте Milvus Backup 0.6.0
---
<h1 id="Use-Milvus-Backup-060" class="common-anchor-header">Используйте Milvus Backup 0.6.0<button data-href="#Use-Milvus-Backup-060" class="anchor-icon" translate="no">
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
    </button></h1><p>Используйте Milvus Backup для резервного копирования коллекций и их восстановления в том же или другом экземпляре Milvus. Данное руководство посвящено <strong>Milvus Backup 0.6.0</strong>. Резервное копирование и восстановление в Milvus 3.0 официально поддерживаются начиная с <strong>версии Milvus 3.0.1</strong>. Версия Backup 0.6.0 также поддерживает рабочие процессы с использованием бинарных журналов (binlog) в поддерживаемых версиях Milvus 2.x; проверьте <a href="/docs/ru/milvus_backup_overview.md#Compatibility-matrix">совместимость Milvus Backup</a>.</p>
<p>Если вы используете версию Backup 0.5.x, воспользуйтесь <a href="/docs/ru/milvus_backup_cli.md">руководством по CLI</a> для версии <a href="/docs/ru/milvus_backup_cli.md">0.5.x</a>. Если вы выполняете обновление, сначала следуйте <a href="/docs/ru/milvus_backup_upgrade.md">инструкциям по обновлению Milvus Backup</a>.</p>
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
    </button></h2><p>Загрузите бинарный файл для вашей операционной системы и архитектуры из <a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">выпуска v0.6.0</a>, затем распакуйте его. Храните бинарный файл и примеры конфигурации в том же выпуске.</p>
<p>Чтобы собрать программу из исходного кода, установите <strong>Go версии 1.26 или более поздней</strong>, а затем выполните:</p>
<pre><code translate="no" class="language-shell">git clone --branch v0.6.0 --depth 1 https://github.com/zilliztech/milvus-backup.git
cd milvus-backup
go build
<button class="copy-code-btn"></button></code></pre>
<p>Готовый бинарный файл не требует Go. Запускайте все последующие команды оболочки из каталога, содержащего файл « <code translate="no">milvus-backup</code> ».</p>
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
    </button></h2><p>Milvus Backup требует доступа к конечной точке gRPC Milvus, конечной точке управления, хранилищу экземпляра и месту назначения резервной копии. Для резервного копирования с помощью моментальных снимков серверу Milvus также требуется доступ к хранилищу резервных копий.</p>
<p>Создайте каталог конфигурации:</p>
<pre><code translate="no" class="language-shell">mkdir -p configs
<button class="copy-code-btn"></button></code></pre>
<p>Сохраните этот пример MinIO как <code translate="no">configs/backup.yaml</code>. Замените адреса, учетные данные, корзину и корневой путь на настройки вашего развертывания. Учетные данные <code translate="no">minioadmin</code> являются тестовыми значениями по умолчанию для MinIO.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">configVersion:</span> <span class="hljs-string">v2</span>
<span class="hljs-attr">milvus:</span>
  <span class="hljs-attr">grpc:</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">19530</span>
  <span class="hljs-attr">management:</span>
    <span class="hljs-attr">endpoint:</span> <span class="hljs-string">http://localhost:9091</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">provider:</span> <span class="hljs-string">minio</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">9000</span>
    <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">false</span>
    <span class="hljs-attr">bucketName:</span> <span class="hljs-string">a-bucket</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">files</span>
    <span class="hljs-attr">auth:</span>
      <span class="hljs-attr">type:</span> <span class="hljs-string">static</span>
      <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">minioadmin</span>
      <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">minioadmin</span>
<span class="hljs-attr">backup:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">bucketName:</span> <span class="hljs-string">a-bucket</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">backup</span>
<span class="hljs-attr">transfer:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">auto</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">milvus.grpc</code> подключается к экземпляру, для которого выполняется резервное копирование или восстановление. Если аутентификация включена, также задайте <code translate="no">milvus.user</code> и <code translate="no">milvus.password</code>.</li>
<li><code translate="no">milvus.management.endpoint</code> Используется для приостановки/возобновления сборки мусора во время резервного копирования.</li>
<li><code translate="no">milvus.storage</code> должно соответствовать фактическому хранилищу объектов экземпляра. Указание корзины здесь не изменяет конфигурацию Milvus.</li>
<li><code translate="no">backup.storage</code> определяет местоположение резервной копии. Незаполненные поля наследуются из <code translate="no">milvus.storage</code>, за исключением <code translate="no">rootPath</code>, для которого по умолчанию установлено значение <code translate="no">backup</code>.</li>
<li><code translate="no">transfer.mode: auto</code> выбирает копирование на стороне хранилища, если бэкэнды совпадают, и в противном случае — потоковую передачу через Milvus Backup. Этот параметр управляет передачей объектов, а не форматом резервного копирования.</li>
</ul>
<p>Ниже приведены типичные значения по умолчанию для хранилищ. Перед использованием убедитесь в правильности значений в вашей действующей среде развертывания.</p>
<table>
<thead>
<tr><th>Параметр</th><th>Docker Compose</th><th>Helm / Milvus Operator</th></tr>
</thead>
<tbody>
<tr><td>Контейнер</td><td><code translate="no">a-bucket</code></td><td><code translate="no">milvus-bucket</code></td></tr>
<tr><td>Кореневой путь</td><td><code translate="no">files</code></td><td><code translate="no">file</code></td></tr>
</tbody>
</table>
<p>Если сервер Milvus использует другой адрес для доступа к хранилищу резервных копий, установите значения <code translate="no">backup.storage.milvusAddress</code> и <code translate="no">milvusPort</code> на адрес, доступный для сервера. Информацию об аутентификации, TLS, других поставщиках хранилищ и дополнительных настройках см. в <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/configs/backup.yaml">примере конфигурации версии 0.6.0</a>.</p>
<p>Проверьте фактические значения и проверьте подключение:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup.yaml
./milvus-backup check --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">config show</code> скрывает секретные значения и указывает, откуда взято каждое значение. При проверке подключения должно отображаться сообщение « <code translate="no">Success!</code> ». Устраните ошибки подключения или хранилища перед созданием резервной копии.</p>
<p>Информацию о существующих конфигурациях версии v1 см. в разделе <a href="/docs/ru/milvus_backup_upgrade.md#Migrate-the-configuration">«Обновление Milvus Backup</a>». Автоматический перевод конфигурации не заменяет удалённые флаги CLI.</p>
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
    </button></h2><p>Используйте существующую коллекцию с именем <code translate="no">coll</code> и убедитесь, что файл <code translate="no">coll_bak</code> отсутствует. Перед резервным копированием запишите схему, количество сущностей, типичные скалярные и векторные значения, а также известный результат поиска. Оставьте примерные данные без изменений при сравнении с восстановленной копией. Чтобы вместо этого создать небольшой одноразовый набор данных, воспользуйтесь <a href="/docs/ru/snapshot-backup-and-restore.md#Prepare-sample-data">разделом «Подготовка примерных данных</a>».</p>
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
    </button></h2><p>Создайте именованную резервную копию « <code translate="no">coll</code> »:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --filter coll -n my_backup --config configs/backup.yaml
./milvus-backup list --config configs/backup.yaml
./milvus-backup get -n my_backup --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Команда create должна вывести <code translate="no">create backup success</code>. Команда <code translate="no">get</code> возвращает метаданные резервной копии; убедитесь, что ожидаемая коллекция присутствует. Опуская <code translate="no">--filter</code>, вы создаете резервную копию всех подходящих коллекций. Внешние коллекции пропускаются.</p>
<p><code translate="no">--filter</code> Принимает имена, разделенные запятыми: <code translate="no">coll</code> в базе данных по умолчанию, <code translate="no">db1.coll</code> или <code translate="no">'db1.*'</code> для всех коллекций в базе данных. Сделайте шаблоны, содержащие <code translate="no">*</code>, кавычками, чтобы предотвратить расширение оболочки.</p>
<h3 id="Choose-a-backup-format-or-purpose" class="common-anchor-header">Выберите формат резервного копирования или цель<button data-href="#Choose-a-backup-format-or-purpose" class="anchor-icon" translate="no">
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
    </button></h3><p>По умолчанию ( <code translate="no">--format auto</code>) Milvus 3.0 использует резервное копирование в виде моментальных снимков; поддерживаемые серверы Milvus 2.x используют бинарный журнал (binlog). Чтобы явно сохранить поведение бинарного журнала, передайте <code translate="no">--format binlog</code>. В <a href="/docs/ru/snapshot-backup-and-restore.md">примере со снимком</a> явно выбирается <code translate="no">--format snapshot</code>.</p>
<p>Используйте <code translate="no">--for</code>, если цель соответствует вашему рабочему процессу:</p>
<table>
<thead>
<tr><th>Цель</th><th>Значения, применяемые пресетом</th><th>Предполагаемое использование</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">clone</code></td><td>Включает резервное копирование по RBAC; сохраняет выбранные вами формат и стратегию</td><td>Копирование данных в другой экземпляр; в « <code translate="no">auto</code> » используется моментальный снимок в Milvus 3.0</td></tr>
<tr><td><code translate="no">archive</code></td><td>Принудительно запускает <code translate="no">binlog</code> и включает резервное копирование с использованием RBAC</td><td>Сохранение резервной копии в формате binlog для последующего восстановления</td></tr>
<tr><td><code translate="no">secondary</code></td><td>Принудительно включает <code translate="no">binlog</code>, <code translate="no">bulk_flush</code>, резервное копирование с RBAC и дополнительные метаданные индекса</td><td>Инициализируйте вторичный сервер в настроенной топологии репликации</td></tr>
</tbody>
</table>
<p>Например:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --for clone --filter coll -n clone_backup --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Пресет переопределяет конфликтующие значения для параметров, которые он фиксирует. Например, <code translate="no">--for archive --format snapshot</code> создает резервную копию в формате binlog. Резервное копирование метаданных RBAC не приводит к их автоматическому восстановлению; при необходимости используйте опцию <code translate="no">--rbac</code> команды восстановления.</p>
<p><code translate="no">secondary</code> не является упрощенным способом обычного восстановления между экземплярами. Для этого также требуется доступ к исходному etcd для метаданных индекса, правильные идентификаторы кластера репликации и каналы, а также новый вторичный целевой экземпляр. Резервная копия должна сохранять полные метаданные, включая <code translate="no">meta/full_meta.json</code>. Настройка репликации и выполнение переключения на резервный экземпляр выходят за рамки данного руководства. См. <a href="https://github.com/zilliztech/milvus-backup/tree/v0.6.0">исходный</a> код <a href="https://github.com/zilliztech/milvus-backup/tree/v0.6.0">и справочник</a> версии <a href="https://github.com/zilliztech/milvus-backup/tree/v0.6.0">0.6.0</a> для ознакомления с реализацией и требованиями, специфичными для данной версии.</p>
<h3 id="Preserve-the-complete-backup" class="common-anchor-header">Сохраните полную резервную копию<button data-href="#Preserve-the-complete-backup" class="anchor-icon" translate="no">
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
    </button></h3><p>Резервная копия хранится в каталоге <code translate="no">&lt;backup.storage.bucketName&gt;/&lt;backup.storage.rootPath&gt;/&lt;backup_name&gt;</code>. Сохраните все объекты в этом каталоге. Резервные копии в виде моментальных снимков включают как экспортированный пакет, так и метаданные.</p>
<p>Не копируйте только файлы метаданных и не предполагайте, что резервная копия моментального снимка имеет ту же структуру, что и резервная копия бинарного журнала.</p>
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
    </button></h2><p>Восстановите файл « <code translate="no">coll</code> » как « <code translate="no">coll_bak</code> » в настроенном экземпляре:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>В CLI файл « <code translate="no">--filter</code> » соответствует именам <strong>после</strong> применения « <code translate="no">-s</code> » или « <code translate="no">--rename</code> ». Команда с параметром « <code translate="no">--filter coll -s _bak</code> » не соответствует ничему и может успешно завершиться без восстановления коллекции.</p>
<p>Чтобы выполнить восстановление с использованием исходного имени, выберите целевую систему, в которой данное имя коллекции не существует, укажите в конфигурации эту целевую систему и местоположение резервной копии, а также опустите суффикс:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore --filter coll -n my_backup --config configs/backup-target.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Полный пример для одной и той же инстанции см. в разделе <a href="/docs/ru/snapshot-backup-and-restore.md">«Резервное копирование и восстановление моментальных снимков в одной инстанции</a>». Существующие страницы с общими случаями для нескольких экземпляров используют резервное копирование версии 0.5.16 и конфигурацию v1; не применяйте их команды без изменений к версии 0.6.0. Информацию о конфигурации переноса для версии 0.6.0 см. в <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/transfer.md">руководстве по переносу с указанием версии</a>.</p>
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
    </button></h2><p>Убедитесь, что файл ` <code translate="no">coll_bak</code> ` существует. Если при восстановлении не был воссоздан его векторный индекс, создайте индекс, соответствующий вашей схеме, перед загрузкой коллекции. Сравните его схему, количество сущностей, скалярные и векторные значения, а также известные результаты поиска с базовыми данными, зафиксированными перед резервным копированием.</p>
<p>Для одноразового набора данных из 256 сущностей воспользуйтесь полными проверками, приведёнными в разделе <a href="/docs/ru/snapshot-backup-and-restore.md#Verify-the-result">«Проверка результата</a>». Успешное выполнение команды само по себе не доказывает, что ожидаемые данные были восстановлены.</p>
