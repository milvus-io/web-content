---
id: milvus_backup_overview.md
summary: >-
  Milvus Backup предоставляет рабочие процессы на основе командной строки (CLI)
  и HTTP-API для резервного копирования и восстановления данных Milvus.
title: Milvus Backup
---
<h1 id="Milvus-Backup" class="common-anchor-header">Milvus Backup<button data-href="#Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Backup выполняет резервное копирование коллекций Milvus и восстанавливает их в том же или другом экземпляре. Он предоставляет интерфейс командной строки (CLI) и HTTP-API.</p>
<p>В версии Milvus Backup <strong>0.6.0</strong> добавлены резервные копии в виде моментальных снимков для Milvus 3.0, версионированная схема конфигурации v2 и предустановки для создания резервных копий с учётом конкретных целей. Официальная поддержка резервного копирования и восстановления для Milvus 3.0 начинается с версии <strong>Milvus 3.0.1</strong>.</p>
<h2 id="Choose-your-guide" class="common-anchor-header">Выберите руководство<button data-href="#Choose-your-guide" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Backup имеет собственную версию выпуска, отдельную от версии сервера Milvus. Текущие руководства охватывают серию 0.6.x; раздел «Backup 0.5.x» сохраняет прежние рабочие процессы. Метки в заголовках страниц указывают на соответствующую серию Backup. В инструкциях по установке и примерах используется конкретный проверенный выпуск. Проверьте совместимость исходного и целевого серверов Milvus отдельно.</p>
<table>
<thead>
<tr><th>Ваша задача</th><th>Руководство</th></tr>
</thead>
<tbody>
<tr><td>Продолжить использование Backup 0.5.x</td><td><a href="/docs/ru/milvus_backup_cli.md">Команды</a> и <a href="/docs/ru/milvus_backup_api.md">HTTP API</a><a href="/docs/ru/milvus_backup_cli.md">версии 0.5.x</a> с примерами, привязанными к версии 0.5.16</td></tr>
<tr><td>Обновление существующей установки Backup</td><td><a href="/docs/ru/milvus_backup_upgrade.md">Обновление с версии 0.5.x до 0.6.x</a></td></tr>
<tr><td>Установка и использование Backup версии 0.6.x</td><td><a href="/docs/ru/milvus_backup_0_6_cli.md">команды и настройки</a> или <a href="/docs/ru/milvus_backup_0_6_api.md">HTTP API</a></td></tr>
<tr><td>Резервное копирование и восстановление моментального снимка в Milvus 3.0.1 или более поздней версии</td><td><a href="/docs/ru/snapshot-backup-and-restore.md">Резервное копирование и восстановление моментального снимка в одном экземпляре</a></td></tr>
</tbody>
</table>
<p>В существующих руководствах по резервному копированию <a href="/docs/ru/single-instance-backup-and-restore.md">в пределах одного экземпляра</a>, <a href="/docs/ru/shared-bucket-backup-and-restore.md">в общем контейнере</a>, <a href="/docs/ru/cross-bucket-backup-and-restore.md">между контейнерами</a> и <a href="/docs/ru/multi-storage-backup-and-restore.md">между хранилищами</a> сохранены настройки и команды версии 0.5.16. Примеры в них не обновляются при выпуске новой версии Backup.</p>
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
<li>Используйте бинарный файл Backup и примеры конфигурации из одного и того же выпуска. <a href="/docs/ru/milvus_backup_cli.md#Obtain-Milvus-Backup">В руководстве</a> по <a href="/docs/ru/milvus_backup_cli.md#Obtain-Milvus-Backup">версии 0.5.x</a> указана версия 0.5.16; в <a href="/docs/ru/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">текущем руководстве</a> указана версия 0.6.0.</li>
<li>Обеспечьте сетевой доступ к Milvus, его хранилищу и месту назначения резервной копии. Для операций создания моментальных снимков также требуется, чтобы сервер Milvus имел доступ к хранилищу резервных копий.</li>
<li>Проверьте совместимость сервера, как указано ниже. Go требуется только при сборке из исходного кода: версия 1.25 или более поздняя для Backup 0.5.16 и 1.26 или более поздняя для 0.6.0.</li>
</ul>
<h2 id="Architecture" class="common-anchor-header">Архитектура<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_backup_architecture.png" alt="Milvus Backup components" class="doc-image" id="milvus-backup-components" /> 
   <span>Компоненты Milvus Backup</span>
  
 </span></p>
<p>Milvus Backup координирует сбор метаданных и резервных копий данных между экземпляром Milvus и хранилищем резервных копий. В версии Backup 0.6.0 выбранный формат определяет, как данные коллекции экспортируются и восстанавливаются:</p>
<table>
<thead>
<tr><th>Формат</th><th>Поведение при резервном копировании и восстановлении</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">snapshot</code></td><td>Milvus экспортирует пакет моментального снимка коллекции. Milvus Backup записывает информацию о пакете, а при восстановлении пакет импортируется через Milvus. Сервер управляет итоговой структурой данных.</td></tr>
<tr><td><code translate="no">binlog</code></td><td>Milvus Backup копирует файлы данных коллекций и метаданные, а затем во время восстановления воссоздает коллекции и импортирует резервные копии данных.</td></tr>
<tr><td><code translate="no">auto</code></td><td>Формат выбирается в соответствии с поддерживаемыми сервером возможностями. В Milvus 3.0 выбирается формат «моментальный снимок».</td></tr>
</tbody>
</table>
<p>Каталог резервной копии содержит метаданные и файлы, необходимые для данного формата. При архивировании или перемещении сохраняйте каталог целиком. Не следует предполагать, что резервная копия в виде моментального снимка использует структуру каталога binlog.</p>
<p>В версии 0.6.0 предустановки « <code translate="no">create --for</code> » настраивают параметры для конкретных целей: « <code translate="no">clone</code> » сохраняет выбранный формат, тогда как « <code translate="no">archive</code> » и « <code translate="no">secondary</code> » требуют наличия binlog. Для вторичного сервера также требуется настроенная топология репликации; для обычной миграции между экземплярами вторичный сервер не требуется. См. раздел <a href="/docs/ru/milvus_backup_0_6_cli.md#Choose-a-backup-format-or-purpose">«Выбор формата резервного копирования или цели</a>».</p>
<p>В версии Backup 0.6.0 во время резервного копирования пропускаются внешние коллекции. Успешное выполнение задачи не означает, что данные внешних коллекций были включены.</p>
<h2 id="Compatibility-matrix" class="common-anchor-header">Матрица совместимости<button data-href="#Compatibility-matrix" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Backup 0.6.0 не требует обновления каждой установки Milvus до версии 3.0.</strong> Он поддерживает рабочие процессы с использованием бинарного журнала (binlog) на поддерживаемых версиях Milvus 2.x. Официальная поддержка резервного копирования и восстановления для линейки Milvus 3.0 начинается с <strong>версии Milvus 3.0.1</strong>; в примере со снимком используется именно эта линейка.</p>
<p><a href="/docs/ru/milvus_backup_upgrade.md">Руководство по обновлению</a> было проверено с использованием Backup 0.5.16 и 0.6.0 на Milvus 2.6.11, включая восстановление резервной копии версии 0.5.16 с помощью версии 0.6.0. Эта протестированная комбинация не расширяет приведённую ниже матрицу.</p>
<p>Исходная и целевая версии Milvus должны составлять поддерживаемую пару. Наличие более новой целевой версии само по себе не гарантирует совместимости. Приведённая ниже матрица обратной совместимости охватывает Milvus 2.x, как указано в документации начиная с Milvus Backup 0.5.7; она не устанавливает совместимость при миграции с версий 2.x на 3.0.</p>
<table>
<thead>
<tr><th>Резервное копирование из ↓ / Восстановление в →</th><th>Milvus v2.2.x</th><th>Milvus v2.3.x</th><th>Milvus v2.4.x</th><th>Milvus v2.5.x</th><th>Milvus v2.6.x</th></tr>
</thead>
<tbody>
<tr><td>Milvus v2.2.x</td><td>Нет</td><td>Нет</td><td>Да</td><td>Да</td><td>Да</td></tr>
<tr><td>Milvus v2.3.x</td><td>Нет</td><td>Нет</td><td>Да</td><td>Да</td><td>Да</td></tr>
<tr><td>Milvus v2.4.x</td><td>Нет</td><td>Нет</td><td>Да</td><td>Да</td><td>Да</td></tr>
<tr><td>Milvus v2.5.x</td><td>Нет</td><td>Нет</td><td>Нет</td><td>Да</td><td>Да</td></tr>
<tr><td>Milvus v2.6.x</td><td>Нет</td><td>Нет</td><td>Нет</td><td>Нет</td><td>Да</td></tr>
</tbody>
</table>
<p>Перед переносом между версиями проверьте исходную версию, целевую версию и формат резервной копии в соответствии с <a href="https://github.com/zilliztech/milvus-backup/tree/v0.6.0">документацией по выпуску Backup</a>. В этих руководствах матрица совместимости не распространяется на комбинации, не указанные в списке.</p>
<h2 id="Release-notes" class="common-anchor-header">Примечания к выпуску<button data-href="#Release-notes" class="anchor-icon" translate="no">
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
<li><a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">v0.6.0</a></li>
</ul>
