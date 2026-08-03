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
<p>Storage V3 è disabilitato per impostazione predefinita. Una volta che l’ <code translate="no">common.storage.useLoonFFI</code> e entra in vigore, le nuove operazioni di scrittura e l’output della compattazione utilizzano Storage V3. I dati esistenti rimangono nel layout attuale fino a quando i dati idonei non vengono riscritti dalla compattazione in background. Milvus è in grado di leggere entrambi i layout durante questa transizione. Abilita Storage V3 per utilizzare le funzionalità che dipendono da esso, piuttosto che come ottimizzazione generale delle prestazioni.</p>
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
<tr><td><a href="/docs/it/text.md"><code translate="no">TEXT</code> campo</a></td><td>Memorizza testi sorgente lunghi, come brani, documenti, ticket o log, senza impostare una lunghezza massima fissa nello schema della collezione.</td><td><a href="/docs/it/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
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
<p>Milvus considera questa impostazione aggiornabile. Applica la modifica tramite il flusso di lavoro di aggiornamento della configurazione supportato dalla tua distribuzione. La sola modifica di un file di configurazione statico non garantisce che la distribuzione in esecuzione abbia ricevuto il nuovo valore.</p>
<p>Se si intende aggiungere una Funzione e il campo vettoriale da essa generato a una raccolta esistente, abilitare anche le due impostazioni di compattazione necessarie per il backfill dei dati esistenti:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">bumpSchemaVersion:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">storageVersion:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>L’output della Funzione per le entità esistenti viene generato in modo asincrono tramite la compattazione in background. Un aggiornamento dello schema riuscito non indica che il backfill sia stato completato per ogni entità esistente.</p>
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
