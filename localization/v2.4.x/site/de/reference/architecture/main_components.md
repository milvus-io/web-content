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
    </button></h1><p>Es gibt zwei Modi für den Betrieb von Milvus: Standalone und Cluster. Diese beiden Modi haben die gleichen Funktionen. Sie können den Modus wählen, der am besten zur Größe Ihres Datensatzes, zu den Verkehrsdaten und mehr passt. Im Moment kann Milvus Standalone nicht "online" auf Milvus Cluster aufgerüstet werden.</p>
<h2 id="Milvus-standalone" class="common-anchor-header">Milvus standalone<button data-href="#Milvus-standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus standalone besteht aus drei Komponenten:</p>
<ul>
<li><p><strong>Milvus:</strong> Die funktionale Kernkomponente.</p></li>
<li><p><strong>Meta Store:</strong> Die Metadaten-Engine, die auf die Metadaten der internen Komponenten von Milvus zugreift und diese speichert, einschließlich Proxys, Indexknoten und mehr.</p></li>
<li><p><strong>Objektspeicher:</strong> Die Speicher-Engine, die für die Datenpersistenz von Milvus verantwortlich ist.</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/standalone_architecture.jpg" alt="Standalone_architecture" class="doc-image" id="standalone_architecture" />
   </span> <span class="img-wrapper"> <span>Standalone_Architektur</span> </span></p>
<h2 id="Milvus-cluster" class="common-anchor-header">Milvus-Cluster<button data-href="#Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Milvus-Cluster</strong> umfasst sieben Microservice-Komponenten und drei Abhängigkeiten von Drittanbietern. Alle Microservices können auf Kubernetes bereitgestellt werden, unabhängig voneinander.</p>
<h3 id="Microservice-components" class="common-anchor-header">Microservice-Komponenten</h3><ul>
<li>Root-Koordinator</li>
<li>Proxy</li>
<li>Abfrage-Koordinate</li>
<li>Abfrage-Knoten</li>
<li>Daten-Koordinate</li>
<li>Index-Knoten</li>
<li>Daten-Knoten</li>
</ul>
<h3 id="Third-party-dependencies" class="common-anchor-header">Abhängigkeiten von Drittanbietern</h3><ul>
<li><strong>Meta-Speicher:</strong> Speichert Metadaten für verschiedene Komponenten des Clusters, z. B. etcd.</li>
<li><strong>Objektspeicher:</strong> Verantwortlich für die Datenpersistenz großer Dateien im Cluster, wie Index- und binäre Protokolldateien, z. B. S3</li>
<li><strong>Protokoll-Broker:</strong> Verwaltet Protokolle der letzten Mutationsoperationen, gibt Streaming-Protokolle aus und bietet Protokollveröffentlichungs- und -abonnementdienste, z. B. Pulsar.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/distributed_architecture.jpg" alt="Distributed_architecture" class="doc-image" id="distributed_architecture" />
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
<li>Lesen Sie <a href="/docs/de/v2.4.x/four_layers.md">Computing/Storage Disaggregation</a>, um den Mechanismus und das Designprinzip von Milvus zu verstehen.</li>
</ul>
