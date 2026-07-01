---
id: data-infra-integration-overview.md
title: Infrastruttura dati e integrazione
summary: >-
  Panoramica delle infrastrutture di terze parti con cui Milvus si integra:
  metadati, archiviazione a oggetti e code di messaggi.
---
<h1 id="Data-Infrastructure--Integration" class="common-anchor-header">Infrastruttura dati e integrazione<button data-href="#Data-Infrastructure--Integration" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus si basa su un'infrastruttura dati aperta per le sue dipendenze principali. Questo capitolo illustra i componenti che è possibile integrare e configurare:</p>
<ul>
<li><strong><a href="/docs/it/etcd.md">Metadati</a></strong> — Milvus memorizza i metadati (schemi delle raccolte, stato dei nodi, checkpoint di consumo) in etcd.</li>
<li><strong><a href="/docs/it/object-storage.md">Archiviazione a oggetti</a></strong> — Milvus memorizza i file di indice e i log binari in MinIO, AWS S3 o in altri sistemi di archiviazione a oggetti cloud compatibili con S3.</li>
<li><strong><a href="/docs/it/mqtype-overview.md">Coda di messaggi</a></strong> — Milvus utilizza un log di scrittura anticipata (WAL): Woodpecker (impostazione predefinita), Pulsar, Kafka o RocksMQ.</li>
</ul>
<p>Per impostazione predefinita, una nuova distribuzione di Milvus 3.x utilizza <strong>Woodpecker</strong> come coda di messaggi, <strong>etcd</strong> per i metadati e <strong>MinIO</strong> per l’archiviazione a oggetti — non è richiesta alcuna infrastruttura di messaggistica aggiuntiva.</p>
