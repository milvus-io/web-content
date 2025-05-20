---
id: prerequisite-docker.md
label: Docker requirements
related_key: Docker
summary: >-
  Imparate i preparativi necessari prima di installare Milvus con Docker
  Compose.
title: Requisiti per l'installazione di Milvus con Docker Compose
---
<h1 id="Requirements-for-Installing-Milvus-with-Docker-Compose" class="common-anchor-header">Requisiti per l'installazione di Milvus con Docker Compose<button data-href="#Requirements-for-Installing-Milvus-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>Prima di installare un'istanza di Milvus, verificare che l'hardware e il software siano conformi ai requisiti.</p>
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
<tr><th>Componente</th><th>Requisiti</th><th>Raccomandazione</th><th>Nota</th></tr>
</thead>
<tbody>
<tr><td>CPU</td><td><ul><li>CPU Intel Core di seconda generazione o superiore</li><li>Silicio Apple</li></ul></td><td><ul><li>Standalone: 4 core o più</li><li>Cluster: 8 core o più</li></ul></td><td></td></tr>
<tr><td>Set di istruzioni della CPU</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>La ricerca di similarità vettoriale e la creazione di indici in Milvus richiedono il supporto da parte della CPU di set di estensioni SIMD (single instruction, multiple data). Assicurarsi che la CPU supporti almeno una delle estensioni SIMD elencate. Per ulteriori informazioni, vedere <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">CPU con AVX</a>.</td></tr>
<tr><td>RAM</td><td><ul><li>Standalone: 8G</li><li>Cluster: 32G</li></ul></td><td><ul><li>Standalone: 16G</li><li>Cluster: 128G</li></ul></td><td>La dimensione della RAM dipende dal volume dei dati.</td></tr>
<tr><td>Disco rigido</td><td>SSD SATA 3.0 o superiore</td><td>SSD NVMe o superiore</td><td>Le dimensioni del disco rigido dipendono dal volume dei dati.</td></tr>
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
<tr><td>macOS 10.14 o successivo</td><td>Desktop Docker</td><td>Impostare la macchina virtuale (VM) Docker in modo che utilizzi almeno 2 CPU virtuali (vCPU) e 8 GB di memoria iniziale. In caso contrario, l'installazione potrebbe fallire. <br/>Per ulteriori informazioni, vedere <a href="https://docs.docker.com/desktop/mac/install/">Installazione di Docker Desktop su Mac</a>.</td></tr>
<tr><td>Piattaforme Linux</td><td><ul><li>Docker 19.03 o successivo</li><li>Docker Compose 1.25.1 o successivo</li></ul></td><td>Per ulteriori informazioni, vedere <a href="https://docs.docker.com/engine/install/">Installazione di Docker Engine</a> e <a href="https://docs.docker.com/compose/install/">Installazione di Docker Compose</a>.</td></tr>
<tr><td>Windows con WSL 2 abilitato</td><td>Desktop Docker</td><td>Si consiglia di memorizzare il codice sorgente e gli altri dati montati in container Linux nel file system di Linux anziché in quello di Windows.<br/>Per ulteriori informazioni, vedere <a href="https://docs.docker.com/desktop/windows/install/#wsl-2-backend">Installazione di Docker Desktop su Windows con backend WSL 2</a>.</td></tr>
</tbody>
</table>
<p>Le seguenti dipendenze vengono ottenute e configurate automaticamente quando Milvus Standalone viene installato utilizzando lo script Docker o la configurazione di Docker Compose:</p>
<table>
<thead>
<tr><th>Software</th><th>Versione</th><th>Nota</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td>Vedere i <a href="#Additional-disk-requirements">requisiti aggiuntivi del disco</a>.</td></tr>
<tr><td>MinIO</td><td>RELEASE.2023-03-20T20-16-18Z</td><td></td></tr>
<tr><td>Pulsar</td><td>2.8.2</td><td></td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">Requisiti aggiuntivi del disco</h3><p>Le prestazioni del disco sono fondamentali per etcd. Si consiglia vivamente di utilizzare unità SSD NVMe locali. Una risposta più lenta del disco può causare frequenti elezioni del cluster che finiranno per degradare il servizio etcd.</p>
<p>Per verificare se il disco è qualificato, usare <a href="https://github.com/axboe/fio">fio</a>.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>Idealmente, il disco dovrebbe raggiungere oltre 500 IOPS e meno di 10 ms per la latenza di fsync al 99° percentile. Leggete i <a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">documenti di</a> etcd per requisiti più dettagliati.</p>
<h2 id="Whats-next" class="common-anchor-header">Cosa fare dopo<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Se l'hardware e il software soddisfano i requisiti di cui sopra, è possibile</p>
<ul>
<li><a href="/docs/it/v2.4.x/install_standalone-docker.md">Eseguire Milvus in Docker</a></li>
<li><a href="/docs/it/v2.4.x/install_standalone-docker-compose.md">Eseguire Milvus con Docker Compose</a></li>
</ul>
