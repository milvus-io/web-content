---
id: install_standalone-binary.md
label: RPM/DEB Package
related_key: RPM/DEB Package
summary: >-
  Verifica la disponibilità del pacchetto RPM/DEB e scegli un metodo di
  installazione supportato per Milvus Standalone.
title: Installazione di Milvus Standalone con pacchetti RPM/DEB
---
<h1 id="Install-Milvus-Standalone-with-RPMDEB-Package" class="common-anchor-header">Installazione di Milvus Standalone con pacchetti RPM/DEB<button data-href="#Install-Milvus-Standalone-with-RPMDEB-Package" class="anchor-icon" translate="no">
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
    </button></h1><p>Questa pagina illustra la disponibilità dei pacchetti per Milvus Standalone e fornisce i link alle procedure di installazione con le risorse delle versioni pubblicate.</p>
<h2 id="Check-package-availability" class="common-anchor-header">Verifica la disponibilità dei pacchetti<button data-href="#Check-package-availability" class="anchor-icon" translate="no">
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
    </button></h2><p>Le versioni di Milvus 3.0.x, inclusa <a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.3">la v3.0.3</a>, pubblicano file di configurazione Docker Compose ma non pacchetti RPM o DEB. Non creare URL di download RPM o DEB per queste versioni; il nome di un pacchetto in un comando di download non rende disponibile quella risorsa.</p>
<p>Per un’altra versione, controllare la sezione <strong>Risorse</strong> della relativa <a href="https://github.com/milvus-io/milvus/releases">pagina di rilascio di Milvus</a> prima di scegliere un metodo di installazione del pacchetto. Utilizzare solo un pacchetto effettivamente elencato per quella versione e per l’architettura del proprio sistema.</p>
<h2 id="Install-Milvus-Standalone-with-Docker" class="common-anchor-header">Installare Milvus Standalone con Docker<button data-href="#Install-Milvus-Standalone-with-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Per la v3.0.3, scegli uno di questi metodi di installazione:</p>
<ul>
<li><a href="/docs/it/install_standalone-docker-compose.md">Esegui Milvus con Docker Compose (Linux)</a> per utilizzare la configurazione Compose pubblicata con la v3.0.3.</li>
<li><a href="/docs/it/install_standalone-docker.md">Esegui Milvus in Docker (Linux)</a> per utilizzare lo script di installazione standalone. Controlla il tag dell’immagine nello script prima di eseguirlo.</li>
<li><a href="/docs/it/install_standalone-windows.md">Esegui Milvus in Docker (Windows)</a> per utilizzare Docker Desktop con il backend WSL 2 e i container Linux.</li>
</ul>
<p>Verificare i <a href="/docs/it/prerequisite-docker.md">requisiti hardware e software</a> prima dell’installazione. Una volta avviata l’istanza, seguire il percorso <strong>“Utilizza un server Milvus esistente”</strong> nella <a href="/docs/it/quickstart.md">Guida rapida</a>, collegandosi a <code translate="no">http://localhost:19530</code> anziché al percorso locale <code translate="no">.db</code>, per inserire dati ed eseguire una ricerca.</p>
