---
id: milvus_backup_overview.md
summary: >-
  Milvus-Backup - это инструмент, который позволяет пользователям создавать
  резервные копии и восстанавливать данные Milvus.
title: Резервное копирование Milvus
---
<h1 id="Milvus-Backup" class="common-anchor-header">Резервное копирование Milvus<button data-href="#Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Backup - это инструмент, который позволяет пользователям создавать резервные копии и восстанавливать данные Milvus. Он предоставляет как CLI, так и API, чтобы вписаться в различные сценарии применения.</p>
<h2 id="Prerequisites" class="common-anchor-header">Предварительные условия<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Перед началом использования Milvus Backup убедитесь, что</p>
<ul>
<li>Операционная система - CentOS 7.5+ или Ubuntu LTS 18.04+,</li>
<li>Версия Go - 1.20.2 или более поздняя.</li>
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus_backup_architecture.png" alt="Milvus Backup architecture" class="doc-image" id="milvus-backup-architecture" />
   </span> <span class="img-wrapper"> <span>Архитектура Milvus Backup</span> </span></p>
<p>Milvus Backup обеспечивает резервное копирование и восстановление метаданных, сегментов и данных между экземплярами Milvus. Он предоставляет северные интерфейсы, такие как CLI, API и модуль Go на основе gRPC, для гибкого управления процессами резервного копирования и восстановления.</p>
<p>Milvus Backup считывает метаданные и сегменты коллекции из исходного экземпляра Milvus для создания резервной копии. Затем он копирует данные коллекции из корневого пути исходного экземпляра Milvus и сохраняет скопированные данные в корневом пути резервной копии.</p>
<p>Для восстановления из резервной копии Milvus Backup создает новую коллекцию в целевом экземпляре Milvus на основе метаданных коллекции и информации о сегментах в резервной копии. Затем он копирует данные из корневого пути резервной копии в корневой путь целевого экземпляра.</p>
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
    </button></h2><p>В следующей таблице перечислены совместимости резервного копирования и восстановления между различными версиями Milvus, начиная с Milvus Backup v0.5.7.</p>
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
<h2 id="Latest-release" class="common-anchor-header">Последний релиз<button data-href="#Latest-release" class="anchor-icon" translate="no">
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
<li><a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.5.10">v0.5.10</a></li>
</ul>
