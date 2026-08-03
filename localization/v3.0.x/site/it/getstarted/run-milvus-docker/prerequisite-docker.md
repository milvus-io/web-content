---
id: prerequisite-docker.md
label: Standalone requirements
related_key: Standalone
summary: >-
  Scopri quali sono i preparativi necessari prima di installare Milvus
  Standalone.
title: Requisiti per l'installazione di Milvus Standalone
---
<h1 id="Requirements-for-Installing-Milvus-Standalone" class="common-anchor-header">Requisiti per l'installazione di Milvus Standalone<button data-href="#Requirements-for-Installing-Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h1><p>Prima di installare un'istanza di Milvus Standalone, verificare che l'hardware e il software in uso soddisfino i requisiti.</p>
<h2 id="Hardware-requirements" class="common-anchor-header">Requisiti hardware<button data-href="#Hardware-requirements" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Componente</th><th>Requisito</th><th>Raccomandazione</th><th>Nota</th></tr>
</thead>
<tbody>
<tr><td>CPU</td><td><ul><li>CPU Intel Core di seconda generazione o superiore</li><li>Apple Silicon</li></ul></td><td><ul><li>Modello autonomo: 4 core o più</li><li>Cluster: 8 core o più</li></ul></td><td></td></tr>
<tr><td>Set di istruzioni della CPU</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>La ricerca per similarità vettoriale e la creazione di indici all'interno di Milvus richiedono il supporto da parte della CPU dei set di estensioni SIMD (Single Instruction, Multiple Data). Assicurarsi che la CPU supporti almeno una delle estensioni SIMD elencate. Per ulteriori informazioni, consultare <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">la sezione CPU con AVX</a>.</td></tr>
<tr><td>RAM</td><td><ul><li>Modalità standalone: 8G</li><li>Cluster: 32 G</li></ul></td><td><ul><li>Modalità standalone: 16G</li><li>Cluster: 128G</li></ul></td><td>La quantità di RAM dipende dal volume dei dati.</td></tr>
<tr><td>Disco rigido</td><td>SSD SATA 3.0 o superiore</td><td>SSD NVMe o superiore</td><td>La dimensione del disco rigido dipende dal volume dei dati.</td></tr>
</tbody>
</table>
<h2 id="Software-requirements" class="common-anchor-header">Requisiti software<button data-href="#Software-requirements" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Sistema operativo</th><th>Software</th><th>Nota</th></tr>
</thead>
<tbody>
<tr><td>macOS 10.14 o versioni successive</td><td>Docker Desktop</td><td>Configurare la macchina virtuale (VM) di Docker in modo che utilizzi almeno 2 CPU virtuali (vCPU) e 8 GB di memoria iniziale. In caso contrario, l'installazione potrebbe non andare a buon fine. <br/>Per ulteriori informazioni, consultare <a href="https://docs.docker.com/desktop/mac/install/">Installare Docker Desktop su Mac</a>.</td></tr>
<tr><td>Piattaforme Linux</td><td><ul><li>Docker 19.03 o versioni successive</li><li>Docker Compose 1.25.1 o versioni successive</li></ul></td><td>Per ulteriori informazioni, consultare <a href="https://docs.docker.com/engine/install/">Installare Docker Engine</a> e <a href="https://docs.docker.com/compose/install/">Installare Docker Compose</a>.</td></tr>
<tr><td>Windows con WSL 2 abilitato</td><td>Docker Desktop</td><td>Si consiglia di archiviare il codice sorgente e gli altri dati montati tramite bind nei container Linux nel file system di Linux anziché in quello di Windows.<br/>Per ulteriori informazioni, consultare <a href="https://docs.docker.com/desktop/windows/install/#wsl-2-backend">Installare Docker Desktop su Windows con backend WSL 2</a>.</td></tr>
</tbody>
</table>
<p>Le seguenti dipendenze verranno scaricate e configurate automaticamente quando si installa Milvus Standalone utilizzando lo script Docker o la configurazione Docker Compose:</p>
<table>
<thead>
<tr><th>Software</th><th>Versione</th><th>Nota</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td>Vedi <a href="#Additional-disk-requirements">i requisiti aggiuntivi relativi al disco</a>.</td></tr>
<tr><td>MinIO</td><td>RELEASE.2024-12-18T13-15-44Z</td><td></td></tr>
<tr><td>Woodpecker</td><td>In bundle con Milvus</td><td>Coda di messaggi predefinita (integrata); non è necessario installare alcun servizio separato.</td></tr>
<tr><td>Pulsar</td><td>2.8.2</td><td>Opzionale — solo se si passa alla coda di messaggi Pulsar; non installato di default.</td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">Requisiti aggiuntivi relativi al disco<button data-href="#Additional-disk-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>Le prestazioni del disco sono fondamentali per etcd. Si consiglia vivamente di utilizzare SSD NVMe locali. Una risposta del disco più lenta può causare frequenti elezioni del cluster che, alla fine, comprometteranno il servizio etcd.</p>
<p>Per verificare se il disco è idoneo, utilizzare <a href="https://github.com/axboe/fio">fio</a>.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>Idealmente, il disco dedicato a etcd dovrebbe raggiungere oltre 500 IOPS e una latenza fsync inferiore a 10 ms al 99° percentile. Consultare la <a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">documentazione</a> di etcd per requisiti più dettagliati.</p>
<h2 id="Whats-next" class="common-anchor-header">Prossimi passi<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Se l’hardware e il software soddisfano i requisiti sopra indicati, è possibile</p>
<ul>
<li><a href="/docs/it/install_standalone-docker.md">Eseguire Milvus in Docker</a></li>
<li><a href="/docs/it/install_standalone-docker-compose.md">Eseguire Milvus con Docker Compose</a></li>
</ul>
