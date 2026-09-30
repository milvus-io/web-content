---
id: storage-v3.md
title: Archiviazione V3Compatible with Milvus 3.0.x
summary: >-
  Scopri quali funzionalità di Milvus 3.0 richiedono Storage V3, come abilitarlo
  e quali limiti di compatibilità si applicano.
beta: Milvus 3.0.x
---
<h1 id="Storage-V3" class="common-anchor-header">Archiviazione V3<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Storage-V3" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">Panoramica<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>I set di dati di intelligenza artificiale spesso si evolvono dopo la creazione di una raccolta. Man mano che i modelli e i flussi di lavoro cambiano, i team potrebbero dover aggiungere testo, generare nuovi campi vettoriali per entità esistenti o utilizzare dati archiviati al di fuori di Milvus. Il supporto di questi flussi di lavoro richiede un modello di archiviazione in grado di evolversi insieme al set di dati.</p>
<p>Storage V3 fornisce questo modello in Milvus 3.0. Utilizza un layout di archiviazione con versioni per incorporare i dati aggiunti o riscritti nel tempo, mentre le applicazioni continuano ad accedere alle collezioni tramite le stesse API di Milvus.</p>
<p>Storage V3 è disabilitato per impostazione predefinita. Una volta che l’ <code translate="no">common.storage.useLoonFFI</code> e entra in vigore, le nuove operazioni di scrittura e l’output della compattazione utilizzano Storage V3. I dati esistenti rimangono nel layout attuale fino a quando i dati idonei non vengono riscritti dalla compattazione in background. Milvus è in grado di leggere entrambi i layout durante questa transizione. Abilitare Storage V3 per utilizzare le funzionalità che dipendono da esso, piuttosto che come ottimizzazione generale delle prestazioni.</p>
<h2 id="Data-formats-in-Storage-V3" class="common-anchor-header">Formati dei dati in Storage V3<button data-href="#Data-formats-in-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><p>Storage V3 utilizza manifesti per descrivere i dati delle raccolte indipendentemente dal formato dei dati sottostante. Ciò consente allo stesso livello di archiviazione di funzionare sia con i dati gestiti da Milvus sia con quelli che rimangono in un sistema esterno.</p>
<h3 id="Managed-collection-file-formats" class="common-anchor-header">Formati dei file delle raccolte gestite<button data-href="#Managed-collection-file-formats" class="anchor-icon" translate="no">
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
    </button></h3><p>Per le raccolte gestite, l’opzione « <code translate="no">dataNode.storage.format</code> » (Formato file per i nuovi dati di Storage V3) seleziona il formato file per i nuovi dati di Storage V3. L’impostazione supporta i seguenti valori:</p>
<table>
<thead>
<tr><th>Formato</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">parquet</code></td><td>Il formato di file a colonne predefinito e ampiamente adottato, con ampia compatibilità con l'ecosistema e strumenti consolidati. Parquet organizza i dati in gruppi di righe e supporta la codifica e la compressione per colonna, consentendo a Milvus di leggere solo le colonne necessarie ed elaborare in modo efficiente scansioni sequenziali di grandi dimensioni.</td></tr>
<tr><td><code translate="no">vortex</code></td><td>Un formato di file colonnare opzionale di nuova generazione, basato su codifiche estensibili e componibili e su statistiche avanzate. In Milvus, Vortex supporta la proiezione delle colonne, le letture per intervallo e le letture ad accesso casuale. Queste funzionalità possono ridurre le letture di dati non necessarie per carichi di lavoro adeguati.</td></tr>
</tbody>
</table>
<p>La modifica dell’ <code translate="no">dataNode.storage.format</code> e influisce sulle nuove scritture in Storage V3. I file esistenti mantengono il loro formato attuale fino a quando la compattazione non riscrive i segmenti corrispondenti. La maggior parte delle implementazioni dovrebbe mantenere il formato predefinito <code translate="no">parquet</code> a meno che benchmark rappresentativi non dimostrino che <code translate="no">vortex</code> si adatta meglio ai propri dati e modelli di accesso.</p>
<h3 id="External-collections-and-supported-source-formats" class="common-anchor-header">Collezioni esterne e formati di origine supportati<button data-href="#External-collections-and-supported-source-formats" class="anchor-icon" translate="no">
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
    </button></h3><p>Le raccolte esterne consentono a Milvus di utilizzare dati memorizzati in file o tabelle esterni. Storage V3 supporta i seguenti formati di origine esterni:</p>
<table>
<thead>
<tr><th>Formato</th><th>Categoria</th><th>Fonte prevista</th><th>Supporto di Storage V3</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">parquet</code></td><td>Formato file</td><td>Una directory o un prefisso di archiviazione a oggetti contenente file Parquet.</td><td>Individua i file, ne legge i metadati e i gruppi di righe e li registra in un manifesto Storage V3.</td></tr>
<tr><td><code translate="no">vortex</code></td><td>Formato file</td><td>Una directory o un prefisso di archiviazione a oggetti contenente file Vortex.</td><td>Individua i file e utilizza il layout e le statistiche di Vortex per la proiezione, le letture per intervallo e le letture ad accesso casuale.</td></tr>
<tr><td><code translate="no">lance-table</code></td><td>Formato tabella</td><td>Una directory di dataset Lance.</td><td>Legge i metadati del set di dati e mappa i relativi frammenti in un manifesto Storage V3.</td></tr>
<tr><td><code translate="no">iceberg-table</code></td><td>Formato tabella</td><td>Un file JSON contenente i metadati di Iceberg e l’ID dello snapshot.</td><td>Risolve lo snapshot specificato, pianifica i relativi file di dati e conserva i metadati relativi alle eliminazioni per posizione. Le eliminazioni per uguaglianza non sono supportate e devono essere convertite in eliminazioni per posizione prima che la raccolta esterna venga aggiornata.</td></tr>
</tbody>
</table>
<p>Le fonti esterne sono di sola lettura. Storage V3 crea e aggiorna il proprio manifesto senza modificare o copiare i dati di origine. Milvus può quindi creare indici ed eseguire ricerche e query sui dati tramite una collezione esterna.</p>
<h4 id="Cloud-storage-and-cross-account-authentication" class="common-anchor-header">Archiviazione cloud e autenticazione tra account</h4><p>La tabella seguente descrive esclusivamente il modo in cui una raccolta esterna accede ai dati di origine archiviati in un altro account cloud. Non descrive l’object storage utilizzato per i dati gestiti da Milvus.</p>
<table>
<thead>
<tr><th>Archiviazione cloud</th><th>Formati esterni supportati</th><th>Autenticazione tra account per le collezioni esterne</th></tr>
</thead>
<tbody>
<tr><td>Amazon S3</td><td>Tutti e quattro i formati sopra elencati.</td><td>Specificare l'ARN del ruolo IAM di proprietà del cliente. Storage V3 utilizza l'<code translate="no">AssumeRole</code> di AWS STS per ottenere credenziali temporanee e le aggiorna secondo necessità. È inoltre possibile fornire un ID esterno quando richiesto dalla politica di fiducia del ruolo.</td></tr>
<tr><td>Google Cloud Storage (GCS)</td><td>Tutti e quattro i formati sopra elencati.</td><td>Specificare l'account di servizio di destinazione. Storage V3 assume l'identità di tale account di servizio, utilizza i suoi token di accesso OAuth a breve durata per accedere al bucket di origine e aggiorna i token prima che scadano.</td></tr>
<tr><td>Azure Blob Storage</td><td><code translate="no">parquet</code>, <code translate="no">vortex</code> e <code translate="no">lance-table</code>. <code translate="no">iceberg-table</code> non è supportato.</td><td>Milvus richiede credenziali SAS a breve durata tramite il servizio gRPC privato <code translate="no">milvus-tools</code>. Storage V3 utilizza le credenziali SAS per accedere al contenitore di origine e le credenziali vengono rinnovate prima della loro scadenza.</td></tr>
<tr><td>Azure Data Lake Storage Gen2 (ADLS Gen2)</td><td>Tutti e quattro i formati sopra elencati.</td><td>Milvus richiede credenziali SAS a breve durata tramite il servizio gRPC privato <code translate="no">milvus-tools</code>. Storage V3 utilizza le credenziali SAS per accedere al contenitore di origine e le credenziali vengono rinnovate prima della scadenza.</td></tr>
<tr><td>Alibaba Cloud Object Storage Service (OSS)</td><td>Tutti e quattro i formati sopra elencati.</td><td>Specificare l'ARN del ruolo RAM di proprietà del cliente. Storage V3 assume il ruolo utilizzando l'identità del carico di lavoro del runtime o il ruolo RAM di ECS, quindi utilizza credenziali temporanee per accedere al bucket di origine.</td></tr>
</tbody>
</table>
<p>Per le istruzioni sulla configurazione e l’utilizzo delle raccolte esterne, consultare <a href="/docs/it/create-an-external-collection.md">Creare una raccolta esterna</a>.</p>
<h2 id="Features-that-require-Storage-V3" class="common-anchor-header">Funzionalità che richiedono Storage V3<button data-href="#Features-that-require-Storage-V3" class="anchor-icon" translate="no">
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
<tr><th>Funzionalità</th><th>Descrizione</th><th>Configurazione richiesta</th></tr>
</thead>
<tbody>
<tr><td>Formato file Vortex</td><td>Scrivere nuovi dati della raccolta gestita nel formato file Vortex.</td><td><ul><li><a href="/docs/it/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></li><li><code translate="no">dataNode.storage.format=vortex</code></li></ul></td></tr>
<tr><td><a href="/docs/it/text.md"><code translate="no">TEXT</code> campo</a></td><td>Archivia testi di origine lunghi, come brani, documenti, ticket o log, senza impostare una lunghezza massima fissa nello schema della raccolta.</td><td><a href="/docs/it/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
<tr><td><a href="/docs/it/add-fields-to-an-existing-collection.md">Campi vettoriali generati da funzioni</a></td><td>Aggiungere una funzione BM25 o MinHash a una collezione esistente in modo che Milvus generi un nuovo campo vettoriale da un campo " <code translate="no">VARCHAR</code> " esistente. Milvus inserisce i valori generati per le entità esistenti in modo asincrono tramite la compattazione in background.</td><td><ul><li><a href="/docs/it/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></li><li><a href="/docs/it/configure_datacoord.md#dataCoordcompactionbumpSchemaVersionenabled"><code translate="no">dataCoord.compaction.bumpSchemaVersion.enabled</code></a><code translate="no">=true</code></li><li><a href="/docs/it/configure_datacoord.md#dataCoordcompactionstorageVersionenabled"><code translate="no">dataCoord.compaction.storageVersion.enabled</code></a><code translate="no">=true</code></li></ul></td></tr>
<tr><td><a href="/docs/it/create-an-external-collection.md">Collezioni esterne</a></td><td>Esegui query sui dati archiviati al di fuori di Milvus senza copiarli in una collezione gestita. Aggiorna la collezione esterna quando i dati di origine cambiano. Per esporre ulteriori campi di origine, consulta <a href="/docs/it/alter-external-collection-schema.md">Modifica dello schema di una collezione esterna</a>.</td><td><a href="/docs/it/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
</tbody>
</table>
<h2 id="Before-you-enable-Storage-V3" class="common-anchor-header">Prima di abilitare Storage V3<button data-href="#Before-you-enable-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert warning">
<p>Una volta che Milvus ha scritto i dati in Storage V3, il downgrade a una versione di Milvus che non è in grado di leggere Storage V3 non è supportato. La disattivazione successiva di Storage V3 non converte immediatamente tutti i dati Storage V3 esistenti né ripristina la compatibilità con la versione precedente.</p>
</div>
<p>Prima di abilitare Storage V3, tenere in considerazione il seguente comportamento dei dati:</p>
<ul>
<li>Poiché la compattazione in background ( <code translate="no">dataCoord.compaction.storageVersion.enabled</code> ) è abilitata per impostazione predefinita, i dati esistenti idonei possono passare gradualmente a Storage V3 tramite la compattazione in background.</li>
<li>La disattivazione di Storage V3 modifica la versione di archiviazione di destinazione per le future operazioni di scrittura e per l’output di compattazione idoneo. Non converte in modo sincrono tutti i dati Storage V3 esistenti né garantisce la sicurezza del downgrade di versione.</li>
</ul>
<h2 id="Enable-Storage-V3" class="common-anchor-header">Abilitare Storage V3<button data-href="#Enable-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><p>Impostare " <code translate="no">common.storage.useLoonFFI</code> " su " <code translate="no">true</code> " nella configurazione di Milvus:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">common:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">useLoonFFI:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus considera questa impostazione aggiornabile. Applicare la modifica tramite il flusso di lavoro di aggiornamento della configurazione supportato dalla propria distribuzione. La sola modifica di un file di configurazione statico non garantisce che la distribuzione in esecuzione abbia ricevuto il nuovo valore.</p>
<p>Se si intende aggiungere una Funzione e il campo vettoriale da essa generato a una raccolta esistente, abilitare anche le due impostazioni di compattazione necessarie per il backfill dei dati esistenti:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">bumpSchemaVersion:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">storageVersion:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>L’output della Funzione per le entità esistenti viene generato in modo asincrono tramite la compattazione in background. Un aggiornamento dello schema andato a buon fine non indica che il backfill sia stato completato per ogni entità esistente.</p>
<h2 id="Related-documentation" class="common-anchor-header">Documentazione correlata<button data-href="#Related-documentation" class="anchor-icon" translate="no">
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
<li><a href="/docs/it/text.md">Campo di testo</a></li>
<li><a href="/docs/it/add-fields-to-an-existing-collection.md">Modifica dello schema della raccolta</a></li>
<li><a href="/docs/it/create-an-external-collection.md">Creazione di una raccolta esterna</a></li>
<li><a href="/docs/it/install-overview.md">Panoramica delle opzioni di distribuzione di Milvus</a></li>
<li><a href="/docs/it/upgrade_milvus_standalone-helm.md">Aggiornamento di Milvus Standalone con Helm Chart</a></li>
<li><a href="/docs/it/upgrade_milvus_cluster-helm.md">Aggiornamento del cluster Milvus con Helm Chart</a></li>
<li><a href="/docs/it/configure_common.md">Configurazioni relative a common</a></li>
<li><a href="/docs/it/configure_datacoord.md">Configurazioni relative a dataCoord</a></li>
<li><a href="https://milvus.io/blog/why-we-built-loon-a-storage-engine-for-ai-data-that-never-stops-changing.md">Perché abbiamo creato Loon: un motore di archiviazione per dati di IA in continua evoluzione</a> — Approfondimento tecnico sulle motivazioni alla base della progettazione di Storage V3.</li>
</ul>
