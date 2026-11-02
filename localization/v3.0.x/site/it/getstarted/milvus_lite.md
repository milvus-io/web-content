---
id: milvus_lite.md
summary: >-
  Installa Milvus Lite ed esegui una ricerca vettoriale locale utilizzando un
  percorso di database persistente.
title: Eseguire Milvus Lite in locale
---
<h1 id="Run-Milvus-Lite-Locally" class="common-anchor-header">Eseguire Milvus Lite in locale<button data-href="#Run-Milvus-Lite-Locally" class="anchor-icon" translate="no">
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
    </button></h1><p>Questa pagina illustra come eseguire una ricerca vettoriale locale con Milvus Lite. Tratta argomenti quali l'installazione, la persistenza dei dati, il filtraggio e l'esportazione dei dati verso un'altra istanza di Milvus.</p>
<h2 id="Overview" class="common-anchor-header">Panoramica<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Lite è un backend locale leggero per <a href="https://github.com/milvus-io/pymilvus">l'SDK Python di Milvus</a>. Installarlo con l'extra opzionale " <code translate="no">milvus-lite</code> "; l'installazione del solo " <code translate="no">pymilvus</code> " non installa questo backend nella versione dell'SDK utilizzata di seguito.</p>
<p>Milvus Lite è adatto allo sviluppo locale e a carichi di lavoro su piccola scala in ambienti quali:</p>
<ul>
<li>Jupyter Notebook o Google Colab</li>
<li>Computer portatili</li>
<li>Dispositivi edge con dipendenze Python compatibili</li>
</ul>
<p>Milvus Lite utilizza l’API <code translate="no">MilvusClient</code> per le operazioni supportate, tra cui la persistenza dei dati vettoriali, l’inserimento e l’eliminazione, la ricerca vettoriale e il filtraggio dei metadati. Per trasferire un flusso di lavoro applicativo supportato su una distribuzione remota, modificare l’URI di connessione e le credenziali, quindi verificare le differenze nelle funzionalità supportate. Per carichi di lavoro di produzione su larga scala, utilizzare <a href="/docs/it/install-overview.md">Milvus Standalone o Distributed</a>, oppure Milvus completamente gestito su <a href="https://zilliz.com/cloud">Zilliz Cloud</a>.</p>
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
    </button></h2><p>Questa guida utilizza PyMilvus <strong>3.0.2</strong> e Milvus Lite <strong>3.2.2</strong>. Preparare il seguente ambiente:</p>
<ul>
<li>Python 3.10 o versioni successive. Il backend Lite locale richiede una versione minima di Python superiore rispetto al client PyMilvus remoto.</li>
<li>macOS, Linux o Windows, con wheel compatibili per le dipendenze quali <code translate="no">faiss-cpu</code> e <code translate="no">pyarrow</code>. Milvus Lite 3.2.2 è un pacchetto scritto interamente in Python, pertanto sono il sistema operativo e l’architettura a dover soddisfare tali dipendenze, piuttosto che il pacchetto Lite stesso.</li>
<li>Una directory locale scrivibile per l’archiviazione del database.</li>
</ul>
<p>Su Windows, pip ignora l’extra <code translate="no">milvus-lite</code> di PyMilvus 3.0.2 a causa del suo marcatore di piattaforma, quindi <code translate="no">milvus-lite</code> deve essere specificato esplicitamente. Il comando di installazione riportato di seguito lo fa già. Per altre combinazioni di pacchetti e piattaforme, consultare i <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#requirements">requisiti di rilascio di Milvus Lite</a>.</p>
<h2 id="Set-up-Milvus-Lite" class="common-anchor-header">Configurazione di Milvus Lite<button data-href="#Set-up-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>Creare un ambiente Python isolato e installare entrambi i pacchetti:</p>
<pre><code translate="no" class="language-bash">python3 -m venv .venv
<span class="hljs-built_in">source</span> .venv/bin/activate
python -m pip install <span class="hljs-string">&quot;pymilvus[milvus-lite]==3.0.2&quot;</span> <span class="hljs-string">&quot;milvus-lite==3.2.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Metti tra virgolette l'espressione degli extra in modo che le shell come zsh non interpretino le parentesi. Su Windows PowerShell, attiva l'ambiente con ` <code translate="no">.venv\Scripts\Activate.ps1</code> ` invece che con ` <code translate="no">source .venv/bin/activate</code>`. Le versioni esplicite mantengono l'SDK e il backend locale allineati con questa guida.</p>
<div class="alert note">
<blockquote>
<p>Milvus Lite 3.x utilizza un motore di archiviazione diverso rispetto al pacchetto originale 2.x. Non è in grado di aprire direttamente un file <code translate="no">.db</code> esistente della versione 2.x. Conservare il database originale e un ambiente in grado di aprirlo, esportare i dati in tale ambiente e importarli in un nuovo database. L’installazione di un nuovo pacchetto non comporta la migrazione del vecchio formato di archiviazione. Vedere <a href="#Migrating-data-from-Milvus-Lite">Migrazione dei dati da Milvus Lite</a>.</p>
</blockquote>
</div>
<h2 id="Connect-to-Milvus-Lite" class="common-anchor-header">Connessione a Milvus Lite<button data-href="#Connect-to-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>Passare un percorso locale che termina con <code translate="no">.db</code> a <code translate="no">MilvusClient</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Per Milvus Lite 3.2.2, questa operazione crea una <strong>directory milvus_demo.db</strong> nella directory di lavoro. La directory contiene i file di archiviazione del database; il suffisso <code translate="no">.db</code> non indica che si tratti di un unico file portatile. Riutilizzare lo stesso percorso per riaprire il database dopo aver chiuso il client o riavviato l’applicazione.</p>
<p>Utilizza un percorso diverso per un nuovo database. Per connetterti invece a un server Milvus remoto, specifica il suo endpoint e le credenziali:</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;username:password&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Run-a-local-search-example" class="common-anchor-header">Esegui un esempio di ricerca locale<button data-href="#Run-a-local-search-example" class="anchor-icon" translate="no">
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
    </button></h2><p>L'esempio seguente illustra il flusso di lavoro dell'API con vettori generati. Questi vettori non codificano il significato del testo; utilizzare un modello di embedding quando si crea una ricerca semantica. Eseguire l'esempio con un nuovo percorso del database oppure rimuovere il file <code translate="no">demo_collection</code> esistente prima di eseguirlo nuovamente.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
client.create_collection(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    dimension=<span class="hljs-number">384</span>  <span class="hljs-comment"># The vectors in this example have 384 dimensions.</span>
)

docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

<span class="hljs-comment"># Generate reproducible example vectors, not semantic embeddings.</span>
rng = np.random.default_rng(<span class="hljs-number">7</span>)
vectors = rng.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, size=(<span class="hljs-built_in">len</span>(docs), <span class="hljs-number">384</span>)).tolist()
data = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(docs))
]
res = client.insert(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, data=data)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Search only records whose subject is &quot;history&quot;.</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    data=[vectors[<span class="hljs-number">0</span>]],
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    limit=<span class="hljs-number">2</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Retrieve all records that match the scalar filter, without vector ranking.</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Delete one record and keep the others for the export example below.</span>
res = client.delete(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, ids=[<span class="hljs-number">2</span>])
<span class="hljs-built_in">print</span>(res)
client.close()
<button class="copy-code-btn"></button></code></pre>
<p>Per un'applicazione che genera embedding da testo, prosegui con <a href="/docs/it/quickstart.md">la Guida rapida</a>. Puoi anche esplorare gli <a href="https://github.com/milvus-io/bootcamp">esempi del Milvus Bootcamp</a> relativi a RAG, ricerca di immagini e integrazioni con framework.</p>
<h2 id="Supported-features-and-limits" class="common-anchor-header">Funzionalità supportate e limiti<button data-href="#Supported-features-and-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Lite 3.2.2 implementa un sottoinsieme delle operazioni di Milvus tramite il proprio adattatore locale PyMilvus. <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#supported-features">Il riferimento alle funzionalità, aggiornato con le versioni</a>, descrive le seguenti capacità:</p>
<table>
<thead>
<tr><th>Area</th><th>Supporto in questa versione Lite</th></tr>
</thead>
<tbody>
<tr><td>Vettori densi e sparsi</td><td><code translate="no">FLOAT_VECTOR</code> e <code translate="no">SPARSE_FLOAT_VECTOR</code></td></tr>
<tr><td>Indici vettoriali</td><td><code translate="no">FLAT</code>, <code translate="no">BRUTE_FORCE</code>, <code translate="no">IVF_FLAT</code>, <code translate="no">IVF_SQ8</code>, <code translate="no">HNSW</code>, <code translate="no">HNSW_SQ</code>, e <code translate="no">AUTOINDEX</code></td></tr>
<tr><td>Indici scalari e sparsi</td><td><code translate="no">INVERTED</code> Indici scalari e <code translate="no">SPARSE_INVERTED_INDEX</code></td></tr>
<tr><td>Operazioni sui dati</td><td>Inserimento, upsert, recupero, query, ricerca vettoriale ed eliminazione</td></tr>
<tr><td>Ricerca</td><td>Ricerca densa e sparsa, filtri sui metadati, campi vettoriali multipli e ricerca ibrida</td></tr>
<tr><td>Organizzazione delle collezioni</td><td>Collezioni, database denominati, alias e partizioni, nell’ambito delle operazioni supportate dall’adattatore locale</td></tr>
</tbody>
</table>
<p>Questa versione non è limitata agli indici " <code translate="no">FLAT</code> ". La disponibilità e il comportamento degli indici dipendono dalla versione Lite; non applicare i limiti del backend originale 2.x al motore 3.x.</p>
<p>Esaminare questi limiti prima di scegliere Lite per un'applicazione:</p>
<ul>
<li>Solo un processo alla volta può possedere una directory di archiviazione del database. Il motore protegge la directory con un blocco del file.</li>
<li>Serializzare le operazioni di scrittura sulla stessa collezione. Le scritture concorrenti non sono supportate in modo sicuro.</li>
<li>L'adattatore locale non implementa tutti gli RPC di Milvus. Le operazioni non supportate restituiscono un errore " <code translate="no">UNIMPLEMENTED</code>"; la modifica dello schema e il caricamento o il rilascio a livello di partizione non sono disponibili.</li>
<li>L'autenticazione, gli utenti, i ruoli, RBAC e TLS non sono supportati. Non esporre il server locale a una rete non attendibile.</li>
<li>I campi vettoriali di tipo binary, float16, bfloat16 e int8, nonché gli indici con quantizzazione del prodotto, non sono supportati.</li>
<li>La versione Lite è progettata per carichi di lavoro locali. La compatibilità con le API locali non garantisce la scalabilità distribuita né l’isolamento e la disponibilità in produzione tipici di una distribuzione remota.</li>
</ul>
<p>Consultare le <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#known-limitations">limitazioni note relative alla versione</a> prima di fare affidamento su una funzionalità del server che l’esempio locale non utilizza.</p>
<h2 id="Migrating-data-from-Milvus-Lite" class="common-anchor-header">Migrazione dei dati da Milvus Lite<button data-href="#Migrating-data-from-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizzare <code translate="no">milvus-lite dump</code> per esportare una raccolta come file JSON di Milvus BulkWriter. Questi file possono essere importati in una distribuzione Milvus self-hosted o su Zilliz Cloud.</p>
<p>Installare le dipendenze del Bulk Writer dell’SDK nell’ambiente che apre il database di origine:</p>
<pre><code translate="no" class="language-bash">python -m pip install <span class="hljs-string">&quot;pymilvus[bulk_writer]==3.0.2&quot;</span>
milvus-lite dump -h
<button class="copy-code-btn"></button></code></pre>
<p>Chiudere l’applicazione Python che gestisce il database locale prima di eseguire il comando in un altro processo. Esportare la collezione dall’esempio precedente:</p>
<pre><code translate="no" class="language-bash">milvus-lite dump -d ./milvus_demo.db -c demo_collection -p ./data_dir
<button class="copy-code-btn"></button></code></pre>
<p>Il comando legge <code translate="no">demo_collection</code> dalla <strong>directory di archiviazione milvus_demo.db</strong> e scrive i file di esportazione nella <strong>directory data_dir</strong>. Importare tali file con <a href="/docs/it/import-data.md">Bulk Insert</a> o <a href="https://docs.zilliz.com/docs/data-import">Zilliz Cloud Data Import</a>.</p>
<div class="alert note">
<blockquote>
<p>Per esportare un file di database originale della versione 2.x, eseguire lo strumento di dump in un ambiente con la versione Lite originale in grado di aprire quel file. Lo strumento di dump della versione 3.x non converte il vecchio formato di archiviazione aprendolo direttamente. Conservare il database di origine fino a quando non si è verificato il numero di righe importate e i risultati della ricerca.</p>
</blockquote>
</div>
<p>Per le opzioni di dump supportate e le restrizioni relative al formato di archiviazione, consultare la <a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#dump-data">guida di riferimento all’esportazione di Milvus Lite</a>.</p>
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
    </button></h2><p>Proseguire con queste attività:</p>
<ul>
<li><a href="/docs/it/quickstart.md">Guida rapida</a>: generare embedding ed eseguire un flusso di lavoro di ricerca.</li>
<li><a href="/docs/it/single-vector-search.md">Ricerca a vettore singolo</a> e <a href="/docs/it/multi-vector-search.md">ricerca ibrida</a>: progetta le query per la tua applicazione.</li>
<li><a href="/docs/it/install-overview.md">Scegliere una distribuzione</a>: andare oltre lo sviluppo locale.</li>
<li><a href="https://github.com/zilliztech/attu">Attu</a>: esplora l'interfaccia grafica di Milvus per una distribuzione remota.</li>
</ul>
