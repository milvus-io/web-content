---
id: data-infra-integration-overview.md
title: Infraestructura e integración de datos
summary: >-
  Descripción general de la infraestructura de terceros con la que se integra
  Milvus: metadatos, almacenamiento de objetos y colas de mensajes.
---
<h1 id="Data-Infrastructure--Integration" class="common-anchor-header">Infraestructura e integración de datos<button data-href="#Data-Infrastructure--Integration" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus se basa en una infraestructura de datos abierta para sus dependencias principales. En este capítulo se describen los componentes que se pueden integrar y configurar:</p>
<ul>
<li><strong><a href="/docs/es/etcd.md">Metadatos</a></strong>: Milvus almacena los metadatos (esquemas de colecciones, estado de los nodos, puntos de control de consumo) en etcd.</li>
<li><strong><a href="/docs/es/object-storage.md">Almacenamiento de objetos</a></strong>: Milvus almacena los archivos de índice y los registros binarios en MinIO, AWS S3 u otro almacenamiento de objetos en la nube compatible con S3.</li>
<li><strong><a href="/docs/es/mqtype-overview.md">Cola de mensajes</a></strong>: Milvus utiliza un registro de escritura anticipada (WAL): Woodpecker (por defecto), Pulsar, Kafka o RocksMQ.</li>
</ul>
<p>De forma predeterminada, una nueva implementación de Milvus 3.x se ejecuta con <strong>Woodpecker</strong> como cola de mensajes, <strong>etcd</strong> para los metadatos y <strong>MinIO</strong> para el almacenamiento de objetos, sin necesidad de una infraestructura de mensajería adicional.</p>
