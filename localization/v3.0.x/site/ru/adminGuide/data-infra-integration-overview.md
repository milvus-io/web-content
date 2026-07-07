---
id: data-infra-integration-overview.md
title: Инфраструктура данных и интеграция
summary: >-
  Обзор сторонней инфраструктуры, с которой интегрируется Milvus: метаданные,
  объектное хранилище и очереди сообщений.
---
<h1 id="Data-Infrastructure--Integration" class="common-anchor-header">Инфраструктура данных и интеграция<button data-href="#Data-Infrastructure--Integration" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus использует открытую инфраструктуру данных для своих основных зависимостей. В этой главе рассматриваются компоненты, которые можно подключить и настроить:</p>
<ul>
<li><strong><a href="/docs/ru/etcd.md">Метаданные</a></strong> — Milvus хранит метаданные (схемы коллекций, состояние узлов, контрольные точки потребления) в etcd.</li>
<li><strong><a href="/docs/ru/object-storage.md">Объектное хранилище</a></strong> — Milvus хранит индексные файлы и двоичные журналы в MinIO, AWS S3 или других S3-совместимых облачных объектных хранилищах.</li>
<li><strong><a href="/docs/ru/mqtype-overview.md">Очередь сообщений</a></strong> — Milvus использует журнал предварительной записи (WAL): Woodpecker (по умолчанию), Pulsar, Kafka или RocksMQ.</li>
</ul>
<p>По умолчанию новое развертывание Milvus 3.x работает с <strong>Woodpecker</strong> в качестве очереди сообщений, <strong>etcd</strong> для метаданных и <strong>MinIO</strong> для объектного хранилища — дополнительная инфраструктура обмена сообщениями не требуется.</p>
