---
id: milvus_backup_overview.md
summary: >-
  Milvus Backup offre flussi di lavoro tramite CLI e API HTTP per il backup e il
  ripristino dei dati di Milvus.
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
    </button></h1><p>Milvus Backup esegue il backup delle raccolte Milvus e le ripristina nella stessa istanza o in un'altra. Fornisce un'interfaccia a riga di comando (CLI) e un'API HTTP.</p>
<p>Milvus Backup <strong>0.6.0</strong> introduce i backup tramite snapshot per Milvus 3.0, uno schema di configurazione v2 con versioni e impostazioni predefinite specifiche per la creazione dei backup. Il supporto ufficiale per il backup e il ripristino di Milvus 3.0 è disponibile a partire dalla <strong>versione Milvus 3.0.1</strong>.</p>
<h2 id="Choose-your-guide" class="common-anchor-header">Scegli la tua guida<button data-href="#Choose-your-guide" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Backup ha una propria versione di rilascio, separata dalla versione del server Milvus. Le guide attuali coprono la serie 0.6.x; la sezione Backup 0.5.x conserva i flussi di lavoro precedenti. Le etichette nei titoli delle pagine identificano la serie di Backup applicabile. Le istruzioni di installazione e gli esempi utilizzano una versione specifica convalidata. Verifica separatamente la compatibilità tra il server Milvus di origine e quello di destinazione.</p>
<table>
<thead>
<tr><th>Il tuo compito</th><th>Guida</th></tr>
</thead>
<tbody>
<tr><td>Continua a utilizzare Backup 0.5.x</td><td><a href="/docs/it/milvus_backup_cli.md">Comandi 0.5.x</a> e <a href="/docs/it/milvus_backup_api.md">API HTTP</a>, con esempi riferiti alla versione 0.5.16</td></tr>
<tr><td>Aggiornare un’installazione esistente di Backup</td><td><a href="/docs/it/milvus_backup_upgrade.md">Aggiornamento dalla versione 0.5.x alla 0.6.x</a></td></tr>
<tr><td>Installazione e utilizzo di Backup 0.6.x</td><td><a href="/docs/it/milvus_backup_0_6_cli.md">comandi e configurazione</a>, oppure <a href="/docs/it/milvus_backup_0_6_api.md">API HTTP</a></td></tr>
<tr><td>Eseguire il backup e il ripristino di uno snapshot su Milvus 3.0.1 o versioni successive</td><td><a href="/docs/it/snapshot-backup-and-restore.md">Backup e ripristino di snapshot in un'unica istanza</a></td></tr>
</tbody>
</table>
<p>Le guide esistenti relative a <a href="/docs/it/single-instance-backup-and-restore.md">"stessa istanza"</a>, <a href="/docs/it/shared-bucket-backup-and-restore.md">"bucket condiviso"</a>, <a href="/docs/it/cross-bucket-backup-and-restore.md">"tra bucket</a>" e <a href="/docs/it/multi-storage-backup-and-restore.md">"tra archivi</a> " mantengono la configurazione e i comandi della versione 0.5.16. Gli esempi in esse contenuti non cambiano versione quando viene pubblicata una nuova versione di Backup.</p>
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
    </button></h2><ul>
<li>Utilizzare un binario di Backup e gli esempi di configurazione della stessa versione. La <a href="/docs/it/milvus_backup_cli.md#Obtain-Milvus-Backup">guida 0.5.x</a> fa riferimento alla versione 0.5.16; la <a href="/docs/it/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">guida attuale</a> fa riferimento alla versione 0.6.0.</li>
<li>Garantire l’accesso di rete a Milvus, al suo storage e alla destinazione del backup. Le operazioni di snapshot richiedono inoltre che il server Milvus possa raggiungere l’archivio di backup.</li>
<li>Verificare la compatibilità del server come indicato di seguito. Go è richiesto solo in caso di compilazione dal codice sorgente: versione 1.25 o successive per Backup 0.5.16 e 1.26 o successive per la versione 0.6.0.</li>
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
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_backup_architecture.png" alt="Milvus Backup components" class="doc-image" id="milvus-backup-components" /> 
   <span>Componenti di Milvus Backup</span>
  
 </span></p>
<p>Milvus Backup coordina i metadati delle raccolte e i backup dei dati tra l’istanza di Milvus e l’archivio di backup. In Backup 0.6.0, il formato selezionato determina come vengono esportati e ripristinati i dati delle raccolte:</p>
<table>
<thead>
<tr><th>Formato</th><th>Comportamento di backup e ripristino</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">snapshot</code></td><td>Milvus esporta un pacchetto di snapshot della collezione. Milvus Backup registra le informazioni del pacchetto e, durante il ripristino, importa il pacchetto tramite Milvus. Il server gestisce la struttura dei dati risultante.</td></tr>
<tr><td><code translate="no">binlog</code></td><td>Milvus Backup copia i file di dati e i metadati delle collezioni, quindi ricrea le collezioni e importa i dati di backup durante il ripristino.</td></tr>
<tr><td><code translate="no">auto</code></td><td>Selezionare il formato in base alle funzionalità supportate dal server. Su Milvus 3.0, viene selezionato lo snapshot.</td></tr>
</tbody>
</table>
<p>Una directory di backup contiene i metadati e i file richiesti dal proprio formato. Conservare la directory completa durante l’archiviazione o lo spostamento. Non dare per scontato che un backup di snapshot utilizzi la struttura della directory binlog.</p>
<p>Nella versione 0.6.0, le impostazioni predefinite di " <code translate="no">create --for</code> " configurano opzioni specifiche per lo scopo: " <code translate="no">clone</code> " mantiene il formato scelto, mentre " <code translate="no">archive</code> " e " <code translate="no">secondary</code> " richiedono il binlog. Un server secondario richiede inoltre una topologia di replica configurata; la normale migrazione tra istanze non richiede un server secondario. Vedere <a href="/docs/it/milvus_backup_0_6_cli.md#Choose-a-backup-format-or-purpose">"Scegliere un formato di backup o uno scopo</a>".</p>
<p>La versione 0.6.0 di Backup ignora le raccolte esterne durante il backup. Il completamento con successo di un'attività non implica che i dati delle raccolte esterne siano stati inclusi.</p>
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
    </button></h2><p><strong>Backup 0.6.0 non richiede l’aggiornamento di ogni installazione di Milvus alla versione 3.0.</strong> Supporta i flussi di lavoro basati su binlog sulle versioni supportate di Milvus 2.x. Il supporto ufficiale per il backup e il ripristino della linea Milvus 3.0 inizia con <strong>Milvus 3.0.1</strong>; l’esempio di snapshot utilizza tale linea.</p>
<p><a href="/docs/it/milvus_backup_upgrade.md">La guida all’aggiornamento</a> è stata verificata con Backup 0.5.16 e 0.6.0 su Milvus 2.6.11, compreso il ripristino di un backup 0.5.16 tramite la versione 0.6.0. Questa combinazione testata non amplia la matrice riportata di seguito.</p>
<p>Le versioni di Milvus di origine e di destinazione devono formare una coppia supportata. Una versione di destinazione più recente, di per sé, non garantisce la compatibilità. La seguente matrice di compatibilità storica copre Milvus 2.x, come documentato a partire da Milvus Backup 0.5.7; non garantisce la compatibilità per la migrazione da 2.x a 3.0.</p>
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
<p>Prima di eseguire una migrazione tra versioni diverse, verificare la versione di origine, la versione di destinazione e il formato di backup consultando la <a href="https://github.com/zilliztech/milvus-backup/tree/v0.6.0">documentazione relativa alla versione di Backup</a>. Queste guide non estendono la matrice legacy a combinazioni non elencate.</p>
<h2 id="Release-notes" class="common-anchor-header">Note di rilascio<button data-href="#Release-notes" class="anchor-icon" translate="no">
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
<li><a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">v0.6.0</a></li>
</ul>
