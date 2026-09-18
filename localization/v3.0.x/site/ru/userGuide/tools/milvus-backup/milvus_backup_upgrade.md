---
id: milvus_backup_upgrade.md
summary: >-
  Обновить Milvus Backup с версии 0.5.x до 0.6.0, обновить настройки и команды,
  а также проверить работу резервного копирования и восстановления.
title: Обновление Milvus Backup до версии 0.6.0
---
<h1 id="Upgrade-Milvus-Backup-to-060" class="common-anchor-header">Обновление Milvus Backup до версии 0.6.0<button data-href="#Upgrade-Milvus-Backup-to-060" class="anchor-icon" translate="no">
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
    </button></h1><p>Используйте это руководство при обновлении <strong>инструмента Milvus Backup</strong> с версии 0.5.x до 0.6.0. Оно не обновляет ваш сервер Milvus. Если вы остаетесь на версии 0.5.x, продолжайте использовать руководство <a href="/docs/ru/milvus_backup_cli.md">по CLI</a> или <a href="/docs/ru/milvus_backup_api.md">API</a> для <a href="/docs/ru/milvus_backup_cli.md">версии 0.5.x</a>. Для новой установки используйте <a href="/docs/ru/milvus_backup_0_6_cli.md">руководство</a> по <a href="/docs/ru/milvus_backup_0_6_cli.md">версии 0.6.0</a>.</p>
<p>Конфигурации YAML версии V1 по-прежнему загружаются посредством автоматического преобразования. Однако в версии 0.6.0 устаревшие флаги CLI отклоняются, а формат резервного копирования по умолчанию изменяется в Milvus 3.0. Перед переключением запланированных заданий или служб проверьте как конфигурацию, так и команды.</p>
<h2 id="Check-the-starting-point" class="common-anchor-header">Проверьте исходную конфигурацию<button data-href="#Check-the-starting-point" class="anchor-icon" translate="no">
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
    </button></h2><p>Запишите версию Backup, исходную и целевую версии Milvus, конфигурационные файлы, переопределения переменных среды, расположение резервных копий, а также команды, используемые скриптами или API-службами. Ознакомьтесь с <a href="/docs/ru/milvus_backup_overview.md#Compatibility-matrix">информацией о совместимости</a> для этих версий сервера.</p>
<p>Сохраните исходные бинарные файлы, конфигурацию и существующие каталоги резервных копий во время проверки новой установки. Загрузите версию 0.6.0 в отдельный каталог, воспользовавшись <a href="/docs/ru/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">инструкцией «Получение Milvus Backup</a>». Все приведенные ниже команды запускаются из этого каталога и вызывают бинарный файл версии 0.6.0. Поместите копию вашей конфигурации v1 в каталог ` <code translate="no">configs/backup-v1.yaml</code>`.</p>
<h2 id="Migrate-the-configuration" class="common-anchor-header">Перенос конфигурации<button data-href="#Migrate-the-configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Конфигурация v1 по-прежнему загружается в версии 0.6.0. Milvus Backup преобразует её в формат v2 при запуске и выводит предупреждение. Чтобы сохранить преобразованную конфигурацию в отдельном файле:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config migrate --config configs/backup-v1.yaml --output configs/backup-v2.yaml --strict
./milvus-backup config show --config configs/backup-v2.yaml
./milvus-backup check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">--strict</code> отклоняет некорректную перенесённую конфигурацию. Если файл <code translate="no">--output</code> отсутствует, команда записывает YAML-файл версии v2 в стандартный вывод. Проверьте и используйте новый файл только после проверки правильности настроек.</p>
<table>
<thead>
<tr><th>Параметр версии v1</th><th>Настройка v2</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">milvus.address</code>, <code translate="no">milvus.port</code></td><td><code translate="no">milvus.grpc.address</code>, <code translate="no">milvus.grpc.port</code></td></tr>
<tr><td>Хранилище исходных данных в разделе <code translate="no">minio.*</code></td><td><code translate="no">milvus.storage.*</code></td></tr>
<tr><td>Хранилище резервных копий в разделе <code translate="no">minio.backup*</code></td><td><code translate="no">backup.storage.*</code></td></tr>
<tr><td>Учетные данные хранилища</td><td><code translate="no">milvus.storage.auth.*</code> / <code translate="no">backup.storage.auth.*</code>, с явным <code translate="no">auth.type</code></td></tr>
<tr><td><code translate="no">minio.crossStorage</code></td><td><code translate="no">transfer.mode</code></td></tr>
<tr><td><code translate="no">backup.gcPause.address</code></td><td><code translate="no">milvus.management.endpoint</code></td></tr>
</tbody>
</table>
<p>Проверьте переменные среды в том же изменении, что и конфигурационный файл. V2 принимает только поддерживаемые переменные среды, связанные с учетными данными, такие как <code translate="no">MILVUS_STORAGE_AUTH_SECRET_ACCESS_KEY</code>. Старые имена v1 не применяются к файлу v2. Для настроек, не связанных с учетными данными, таких как имена бакетов и конечные точки, используйте YAML или переопределение ключа конфигурации:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup-v2.yaml --set milvus.storage.bucketName=my-bucket
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">config migrate</code> сообщает о затронутых переменных среды, не копируя их секретные значения в выходной файл. См. <a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/env_variables.md">поддерживаемые переменные среды версии v2</a>. Команда ` <code translate="no">config show</code> ` заменяет устаревшую команду ` <code translate="no">check config</code> `.</p>
<h2 id="Update-CLI-commands" class="common-anchor-header">Обновление команд CLI<button data-href="#Update-CLI-commands" class="anchor-icon" translate="no">
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
    </button></h2><p>Флаги, признанные устаревшими в версии 0.5, отклоняются в версии 0.6.0. Обновите скрипты перед обновлением бинарного файла.</p>
<table>
<thead>
<tr><th>Команда</th><th>Удалённый параметр</th><th>Замена</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">create</code></td><td><code translate="no">--colls</code> / <code translate="no">-c</code>, <code translate="no">--databases</code> / <code translate="no">-d</code>, <code translate="no">--database_collections</code> / <code translate="no">-a</code></td><td><code translate="no">--filter</code></td></tr>
<tr><td><code translate="no">create</code></td><td><code translate="no">--force</code> / <code translate="no">-f</code></td><td><code translate="no">--strategy skip_flush</code></td></tr>
<tr><td><code translate="no">create</code></td><td><code translate="no">--meta_only</code></td><td><code translate="no">--strategy meta_only</code></td></tr>
<tr><td><code translate="no">restore</code></td><td><code translate="no">--collections</code> / <code translate="no">-c</code>, <code translate="no">--databases</code> / <code translate="no">-d</code>, <code translate="no">--database_collections</code> / <code translate="no">-a</code></td><td><code translate="no">--filter</code>, с использованием имен целей</td></tr>
<tr><td><code translate="no">restore</code></td><td><code translate="no">--restore_index</code></td><td><code translate="no">--rebuild_index</code></td></tr>
<tr><td><code translate="no">get</code></td><td><code translate="no">--detail</code> / <code translate="no">-d</code></td><td>Удалите флаг; <code translate="no">get</code> возвращает информацию о резервной копии</td></tr>
<tr><td><code translate="no">list</code></td><td><code translate="no">--collection</code> / <code translate="no">-c</code></td><td>Нет эквивалентного фильтра сбора</td></tr>
</tbody>
</table>
<p>Например, следующие команды версии 0.5.16 выбирают имя источника <code translate="no">coll</code>:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -c coll -n my_backup
./milvus-backup restore -c coll -n my_backup -s _bak
<button class="copy-code-btn"></button></code></pre>
<p>Их замены в версии 0.6.0 используют имя цели для восстановления:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --filter coll -n my_backup --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Фильтр восстановления, не дающий результатов, может успешно завершиться без создания коллекции. Всегда проверяйте целевую коллекцию и её данные. HTTP-API с параметром <code translate="no">collection_names</code> по-прежнему выбирает имена источников в резервной копии; см. <a href="/docs/ru/milvus_backup_0_6_api.md#Restore-data">руководство по API версии 0.6.0</a>.</p>
<h2 id="Choose-the-backup-behavior" class="common-anchor-header">Выбор поведения резервного копирования<button data-href="#Choose-the-backup-behavior" class="anchor-icon" translate="no">
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
<li>На поддерживаемых серверах Milvus 2.x формат <code translate="no">auto</code> использует binlog. Для обновления функции резервного копирования не требуется переход на Milvus 3.0.</li>
<li>В Milvus 3.0 при использовании <code translate="no">auto</code> выбирается snapshot. Официальная поддержка резервного копирования и восстановления начинается с версии Milvus 3.0.1. Передайте параметр <code translate="no">--format binlog</code>, чтобы сохранить поведение binlog при создании резервной копии.</li>
<li>Совместимость конфигурации V1 не сохраняет удалённые флаги команд и не переопределяет значения по умолчанию нового формата.</li>
<li>Предустановки по назначению могут задавать формат и другие параметры. Например, параметр <code translate="no">--for archive</code> принудительно включает использование бинарного журнала, даже если также указан параметр <code translate="no">--format snapshot</code>. Проверьте <a href="/docs/ru/milvus_backup_0_6_cli.md#Choose-a-backup-format-or-purpose">выбор формата и назначения</a>.</li>
<li>Внешние коллекции пропускаются при резервном копировании. Проверяйте метаданные резервной копии, а не считайте успешное выполнение задачи доказательством того, что все коллекции были включены.</li>
</ul>
<h2 id="Validate-before-switching-jobs" class="common-anchor-header">Проверьте правильность настроек перед переключением заданий<button data-href="#Validate-before-switching-jobs" class="anchor-icon" translate="no">
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
    </button></h2><p>В следующем примере сохраняется формат бинарного журнала, а восстановление выполняется в новую коллекцию. Замените <code translate="no">coll</code> на коллекцию, схему, количество элементов, скалярные и векторные значения которой, а также результаты поиска которой вы зафиксировали. Используйте новое имя резервной копии и убедитесь, что целевое имя <code translate="no">coll_upgrade_check</code> не существует.</p>
<pre><code translate="no" class="language-shell">./milvus-backup check --config configs/backup-v2.yaml
./milvus-backup create --filter coll --format binlog -n upgrade_check --config configs/backup-v2.yaml
./milvus-backup get -n upgrade_check --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_upgrade_check -n upgrade_check -s _upgrade_check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Убедитесь, что в резервной копии указана коллекция <code translate="no">coll</code> и что после восстановления существует коллекция <code translate="no">coll_upgrade_check</code>. При необходимости создайте векторный индекс, загрузите его и сравните восстановленные данные и результаты поиска с зафиксированными исходными значениями. Во время этого теста не изменяйте исходные данные.</p>
<p>Также протестируйте типичную существующую резервную копию, прежде чем полагаться на неё при использовании нового инструмента. Для резервной копии версии 0.5.16 с именем <code translate="no">legacy_backup</code>, содержащей <code translate="no">coll</code>, используйте отдельное имя цели:</p>
<pre><code translate="no" class="language-shell">./milvus-backup get -n legacy_backup --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_legacy_check -n legacy_backup -s _legacy_check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Эти пути обновления были проверены с использованием <strong>Milvus 2.6.11</strong>, резервной копии <strong>0.5.16 → 0.6.0</strong> и резервных копий binlog в MinIO. Как вновь созданные, так и существующие резервные копии восстанавливались с совпадающими значениями сущностей и результатами векторного поиска. Это не гарантирует совместимость со всеми историческими резервными копиями или восстановление данных из Milvus 2.x в версию 3.0. Это также не гарантирует, что версия 0.5.x сможет читать резервные копии, созданные версией 0.6.0.</p>
<p>После успешной проверки обновите задания, чтобы использовать новый бинарный файл, проверенную конфигурацию, настройки среды и флаги замены в комплексе. При развертывании через API запустите новую службу с проверенной конфигурацией и проверьте выполнение задачи через <a href="/docs/ru/milvus_backup_0_6_api.md">HTTP-API версии 0.6.0</a>. Для использования снимков в Milvus 3.0.1 или более поздних версиях следуйте инструкциям, приведенным в разделе <a href="/docs/ru/snapshot-backup-and-restore.md">«Резервное копирование и восстановление снимков в одном экземпляре</a>».</p>
