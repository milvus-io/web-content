---
id: milvus_backup_overview.md
summary: >-
  Milvus-Backup è uno strumento che consente agli utenti di eseguire il backup e
  il ripristino dei dati di Milvus.
title: Milvus Backup
---
<h1 id="Milvus-Backup" class="common-anchor-header">Milvus Backup<button data-href="#Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Backup è uno strumento che consente agli utenti di eseguire il backup e il ripristino dei dati di Milvus. Fornisce sia un'interfaccia a riga di comando (CLI) che un'API per adattarsi a diversi scenari applicativi.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisiti<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Prima di iniziare a utilizzare Milvus Backup, assicurarsi che</p>
<ul>
<li>il sistema operativo sia CentOS 7.5+ o Ubuntu LTS 18.04+,</li>
<li>la versione di Go sia 1.20.2 o successiva.</li>
</ul>
<h2 id="Architecture" class="common-anchor-header">Architettura<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_backup_architecture.png" alt="Milvus Backup architecture" class="doc-image" id="milvus-backup-architecture" /> 
   <span>Architettura di Milvus Backup</span>
  
 </span></p>
<p>Milvus Backup facilita il backup e il ripristino di metadati, segmenti e dati tra le istanze di Milvus. Fornisce interfacce northbound, quali CLI, API e modulo Go basato su gRPC, per una gestione flessibile dei processi di backup e ripristino.</p>
<p>Milvus Backup legge i metadati della collezione e i segmenti dall’istanza Milvus di origine per creare un backup. Successivamente copia i dati della collezione dal percorso radice dell’istanza Milvus di origine e salva i dati copiati nel percorso radice del backup.</p>
<p>Per eseguire il ripristino da un backup, Milvus Backup crea una nuova collezione nell’istanza Milvus di destinazione sulla base dei metadati della collezione e delle informazioni sui segmenti presenti nel backup. Successivamente, copia i dati di backup dal percorso radice del backup al percorso radice dell’istanza di destinazione.</p>
<h2 id="Compatibility-matrix" class="common-anchor-header">Matrice di compatibilità<button data-href="#Compatibility-matrix" class="anchor-icon" translate="no">
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
    </button></h2><p>La tabella seguente elenca le compatibilità di backup e ripristino tra le diverse versioni di Milvus a partire da Milvus Backup v0.5.7.</p>
<table>
<thead>
<tr><th>Backup da ↓ / Ripristino su →</th><th>Milvus v2.2.x</th><th>Milvus v2.3.x</th><th>Milvus v2.4.x</th><th>Milvus v2.5.x</th><th>Milvus v2.6.x</th></tr>
</thead>
<tbody>
<tr><td>Milvus v2.2.x</td><td>No</td><td>No</td><td>Sì</td><td>Sì</td><td>Sì</td></tr>
<tr><td>Milvus v2.3.x</td><td>No</td><td>No</td><td>Sì</td><td>Sì</td><td>Sì</td></tr>
<tr><td>Milvus v2.4.x</td><td>No</td><td>No</td><td>Sì</td><td>Sì</td><td>Sì</td></tr>
<tr><td>Milvus v2.5.x</td><td>No</td><td>No</td><td>No</td><td>Sì</td><td>Sì</td></tr>
<tr><td>Milvus v2.6.x</td><td>No</td><td>No</td><td>No</td><td>No</td><td>Sì</td></tr>
</tbody>
</table>
<h2 id="Latest-release" class="common-anchor-header">Ultima versione<button data-href="#Latest-release" class="anchor-icon" translate="no">
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
<li><a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.5.10">v0.5.10</a></li>
</ul>
