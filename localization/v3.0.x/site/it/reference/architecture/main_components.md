---
id: main_components.md
summary: Conoscere i componenti principali di Milvus standalone e cluster.
title: Componenti principali
---
<h1 id="Main-Components" class="common-anchor-header">Componenti principali<button data-href="#Main-Components" class="anchor-icon" translate="no">
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
    </button></h1><p>Un cluster Milvus comprende cinque componenti principali e tre dipendenze di terze parti. Ogni componente può essere distribuito indipendentemente su Kubernetes:</p>
<h2 id="Milvus-components" class="common-anchor-header">Componenti di Milvus<button data-href="#Milvus-components" class="anchor-icon" translate="no">
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
<li>Coordinatore: la modalità master-slave può essere abilitata per fornire un'alta disponibilità.</li>
<li>Proxy: uno o più per cluster</li>
<li>Nodo di streaming: uno o più per cluster</li>
<li>Nodo di interrogazione: uno o più per cluster</li>
<li>Nodo dati: uno o più per cluster</li>
</ul>
<h2 id="Third-party-dependencies" class="common-anchor-header">Dipendenze di terze parti<button data-href="#Third-party-dependencies" class="anchor-icon" translate="no">
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
<li><strong>Meta Store:</strong> Memorizza i metadati per i vari componenti del milvus, ad esempio etcd.</li>
<li><strong>Object Storage:</strong> Responsabile della persistenza dei dati dei file di grandi dimensioni nel milvus, come i file di indice e di log binari, ad esempio S3.</li>
<li><strong>Archiviazione WAL:</strong> Fornisce il servizio Write-Ahead Log (WAL) per il milvus, ad esempio woodpecker.<ul>
<li>In modalità woodpecker zero-disk, <strong>WAL</strong> utilizza direttamente lo storage di oggetti e il meta storage senza altre implementazioni, riducendo le dipendenze di terze parti.</li>
</ul></li>
</ul>
<h2 id="Milvus-deployment-modes" class="common-anchor-header">Modalità di distribuzione di Milvus<button data-href="#Milvus-deployment-modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Esistono due modalità di esecuzione di Milvus:</p>
<h3 id="Standalone" class="common-anchor-header">Standalone</h3><p>Una singola istanza di Milvus che esegue tutti i componenti in un unico processo, adatta a piccoli insiemi di dati e a un carico di lavoro ridotto. Inoltre, in modalità standalone, è possibile scegliere un'implementazione WAL più semplice, come woodpecker e rocksmq, per eliminare la necessità di dipendenze da storage WAL di terze parti.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/standalone_architecture.png" alt="Standalone_architecture" class="doc-image" id="standalone_architecture" />
   </span> <span class="img-wrapper"> <span>Architettura standalone</span> </span></p>
<p>Attualmente non è possibile eseguire un aggiornamento online da un'istanza Milvus standalone a un cluster Milvus, anche se il backend di archiviazione WAL supporta la modalità cluster.</p>
<h3 id="Cluster" class="common-anchor-header">Cluster</h3><p>Una modalità di distribuzione distribuita di Milvus in cui ogni componente funziona in modo indipendente e può essere scalato per elasticità. Questa configurazione è adatta per grandi insiemi di dati e scenari ad alto carico.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/distributed_architecture.png" alt="Distributed_architecture" class="doc-image" id="distributed_architecture" />
   </span> <span class="img-wrapper"> <span>Architettura_distribuita</span> </span></p>
<h2 id="Whats-next" class="common-anchor-header">Cosa c'è dopo<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Leggete <a href="/docs/it/four_layers.md">Disaggregazione di calcolo/stoccaggio</a> per capire il meccanismo e il principio di progettazione di Milvus.</li>
</ul>
