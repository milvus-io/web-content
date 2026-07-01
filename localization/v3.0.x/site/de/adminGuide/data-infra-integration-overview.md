---
id: data-infra-integration-overview.md
title: Dateninfrastruktur und -integration
summary: >-
  Überblick über die Infrastruktur von Drittanbietern, mit der Milvus integriert
  ist – Metadaten, Objektspeicher und Nachrichtenwarteschlangen.
---
<h1 id="Data-Infrastructure--Integration" class="common-anchor-header">Dateninfrastruktur und -integration<button data-href="#Data-Infrastructure--Integration" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus stützt sich bei seinen Kernkomponenten auf eine offene Dateninfrastruktur. In diesem Kapitel werden die Komponenten behandelt, die Sie einbinden und konfigurieren können:</p>
<ul>
<li><strong><a href="/docs/de/etcd.md">Metadaten</a></strong> – Milvus speichert Metadaten (Kollektionsschemata, Knotenstatus, Verbrauchs-Checkpoints) in etcd.</li>
<li><strong><a href="/docs/de/object-storage.md">Objektspeicher</a></strong> – Milvus speichert Indexdateien und Binärprotokolle in MinIO, AWS S3 oder einem anderen S3-kompatiblen Cloud-Objektspeicher.</li>
<li><strong><a href="/docs/de/mqtype-overview.md">Nachrichtenwarteschlange</a></strong> – Milvus verwendet ein Write-Ahead-Log (WAL): Woodpecker (Standard), Pulsar, Kafka oder RocksMQ.</li>
</ul>
<p>Standardmäßig läuft eine neue Milvus 3.x-Bereitstellung mit <strong>Woodpecker</strong> als Nachrichtenwarteschlange, <strong>etcd</strong> für Metadaten und <strong>MinIO</strong> für den Objektspeicher – eine zusätzliche Messaging-Infrastruktur ist nicht erforderlich.</p>
