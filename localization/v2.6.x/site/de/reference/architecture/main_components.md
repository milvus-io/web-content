---
id: main_components.md
summary: Lernen Sie die Hauptkomponenten von Milvus Standalone und Cluster kennen.
title: Hauptkomponenten
---
<h1 id="Main-Components" class="common-anchor-header">Hauptkomponenten<button data-href="#Main-Components" class="anchor-icon" translate="no">
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
    </button></h1><p>Ein Milvus-Cluster besteht aus fünf Kernkomponenten und drei Drittanbieter-Abhängigkeiten. Jede Komponente kann unabhängig auf Kubernetes bereitgestellt werden:</p>
<h2 id="Milvus-components" class="common-anchor-header">Milvus-Komponenten<button data-href="#Milvus-components" class="anchor-icon" translate="no">
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
<li>Coordinator: Der Master-Slave-Modus kann aktiviert werden, um hohe Verfügbarkeit zu gewährleisten.</li>
<li>Proxy: einer oder mehrere pro Cluster</li>
<li>Streaming Node: ein oder mehrere pro Cluster</li>
<li>Abfrageknoten: ein oder mehrere pro Cluster</li>
<li>Datenknoten: ein oder mehrere pro Cluster</li>
</ul>
<h2 id="Third-party-dependencies" class="common-anchor-header">Abhängigkeiten von Drittanbietern<button data-href="#Third-party-dependencies" class="anchor-icon" translate="no">
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
<li><strong>Meta-Speicher:</strong> Speichert Metadaten für verschiedene Komponenten im milvus, z. B. etcd.</li>
<li><strong>Objektspeicher:</strong> Verantwortlich für die Datenpersistenz großer Dateien im milvus, wie Index- und binäre Protokolldateien, z. B. S3</li>
<li><strong>WAL-Speicher:</strong> Bietet einen Write-Ahead Log (WAL) Service für die milvus, z.B. woodpecker.<ul>
<li>Im Woodpecker-Zero-Disk-Modus verwendet <strong>WAL</strong> direkt Objektspeicher und Metaspeicher ohne weitere Bereitstellung, wodurch Abhängigkeiten von Dritten reduziert werden.</li>
</ul></li>
</ul>
<h2 id="Milvus-deployment-modes" class="common-anchor-header">Milvus-Einsatzmodi<button data-href="#Milvus-deployment-modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Es gibt zwei Modi für den Betrieb von Milvus:</p>
<h3 id="Standalone" class="common-anchor-header">Eigenständig</h3><p>Eine einzelne Instanz von Milvus, in der alle Komponenten in einem Prozess ausgeführt werden, was sich für kleine Datenmengen und eine geringe Arbeitslast eignet. Darüber hinaus können im Standalone-Modus einfachere WAL-Implementierungen wie Woodpecker und Rocksmq gewählt werden, um Abhängigkeiten von WAL-Speichern Dritter zu vermeiden.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/standalone_architecture.png" alt="Standalone_architecture" class="doc-image" id="standalone_architecture" />
   </span> <span class="img-wrapper"> <span>Eigenständige_Architektur</span> </span></p>
<p>Derzeit ist es nicht möglich, ein Online-Upgrade von einer eigenständigen Milvus-Instanz auf einen Milvus-Cluster durchzuführen, selbst wenn das WAL-Speicher-Backend den Cluster-Modus unterstützt.</p>
<h3 id="Cluster" class="common-anchor-header">Cluster</h3><p>Ein verteilter Bereitstellungsmodus von Milvus, bei dem jede Komponente unabhängig läuft und aus Gründen der Elastizität skaliert werden kann. Diese Konfiguration eignet sich für große Datensätze und Szenarien mit hoher Last.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/distributed_architecture.png" alt="Distributed_architecture" class="doc-image" id="distributed_architecture" />
   </span> <span class="img-wrapper"> <span>Verteilte_Architektur</span> </span></p>
<h2 id="Whats-next" class="common-anchor-header">Was kommt als Nächstes?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Lesen Sie <a href="/docs/de/four_layers.md">Computing/Storage Disaggregation</a>, um den Mechanismus und das Designprinzip von Milvus zu verstehen.</li>
</ul>
