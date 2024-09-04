---
id: video_search_with_twelvelabs_and_milvus.md
summary: >-
  Impara a creare un'applicazione di ricerca semantica di video integrando l'API
  Embed di Twelve Labs per la generazione di embeddings multimodali con Milvus.
  L'articolo copre l'intero processo, dalla configurazione dell'ambiente di
  sviluppo all'implementazione di funzionalità avanzate come la ricerca ibrida e
  l'analisi temporale dei video, fornendo una base completa per la creazione di
  sofisticati sistemi di analisi e recupero dei contenuti video.
title: >-
  Ricerca video avanzata: Sfruttare Twelve Labs e Milvus per il recupero
  semantico
---
<h1 id="Advanced-Video-Search-Leveraging-Twelve-Labs-and-Milvus-for-Semantic-Retrieval" class="common-anchor-header">Ricerca video avanzata: Sfruttare Twelve Labs e Milvus per il recupero semantico<button data-href="#Advanced-Video-Search-Leveraging-Twelve-Labs-and-Milvus-for-Semantic-Retrieval" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Introduction" class="common-anchor-header">Introduzione<button data-href="#Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p>Benvenuti in questa guida completa sull'implementazione della ricerca semantica di video utilizzando <a href="https://docs.twelvelabs.io/docs/create-embeddings">Twelve Labs Embed API</a> e Milvus. In questa guida esploreremo come sfruttare la potenza degli <a href="https://www.twelvelabs.io/blog/multimodal-embeddings">embeddings multimodali avanzati di Twelve Labs</a> e l'<a href="https://milvus.io/intro">efficiente database vettoriale di Milvus</a> per creare una solida soluzione di ricerca video. Integrando queste tecnologie, gli sviluppatori possono aprire nuove possibilità nell'analisi dei contenuti video, consentendo applicazioni come il recupero di video basati sui contenuti, sistemi di raccomandazione e sofisticati motori di ricerca che comprendono le sfumature dei dati video.</p>
<p>Questo tutorial vi guiderà attraverso l'intero processo, dalla configurazione dell'ambiente di sviluppo all'implementazione di un'applicazione di ricerca semantica video funzionale. Verranno trattati concetti chiave come la generazione di embeddings multimodali dai video, la loro archiviazione efficiente in Milvus e l'esecuzione di ricerche di similarità per recuperare i contenuti rilevanti. Sia che stiate costruendo una piattaforma di analisi video, uno strumento di scoperta dei contenuti o che stiate migliorando le vostre applicazioni esistenti con funzionalità di ricerca video, questa guida vi fornirà le conoscenze e i passi pratici per sfruttare i punti di forza combinati di Twelve Labs e Milvus nei vostri progetti.</p>
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
    </button></h2><p>Prima di iniziare, assicuratevi di disporre di quanto segue:</p>
<p>Una chiave API di Twelve Labs (se non ce l'avete, registratevi su https://api.twelvelabs.io) Python 3.7 o successivo installato sul vostro sistema.</p>
<h2 id="Setting-Up-the-Development-Environment" class="common-anchor-header">Impostazione dell'ambiente di sviluppo<button data-href="#Setting-Up-the-Development-Environment" class="anchor-icon" translate="no">
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
    </button></h2><p>Creare una nuova cartella per il progetto e navigare al suo interno:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">mkdir</span> video-search-tutorial
<span class="hljs-built_in">cd</span> video-search-tutorial
<button class="copy-code-btn"></button></code></pre>
<p>Impostare un ambiente virtuale (facoltativo ma consigliato):</p>
<pre><code translate="no" class="language-shell">python -m venv venv
<span class="hljs-built_in">source</span> venv/bin/activate  <span class="hljs-comment"># On Windows, use `venv\Scripts\activate`</span>
<button class="copy-code-btn"></button></code></pre>
<p>Installare le librerie Python necessarie:</p>
<pre><code translate="no" class="language-shell">pip install twelvelabs pymilvus
<button class="copy-code-btn"></button></code></pre>
<p>Creare un nuovo file Python per il progetto:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">touch</span> video_search.py
<button class="copy-code-btn"></button></code></pre>
<p>Questo file video_search.py sarà lo script principale che useremo per l'esercitazione. Quindi, impostare la chiave API di Twelve Labs come variabile d'ambiente per la sicurezza:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">export</span> <span class="hljs-variable constant_">TWELVE_LABS_API_KEY</span>=<span class="hljs-string">&#x27;your_api_key_here&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connecting-to-Milvus" class="common-anchor-header">Connessione a Milvus<button data-href="#Connecting-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Per stabilire una connessione con Milvus, utilizzeremo la classe MilvusClient. Questo approccio semplifica il processo di connessione e ci permette di lavorare con un'istanza di Milvus basata su file locali, che è perfetta per il nostro tutorial.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Initialize the Milvus client</span>
milvus_client = MilvusClient(<span class="hljs-string">&quot;milvus_twelvelabs_demo.db&quot;</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Successfully connected to Milvus&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Questo codice crea una nuova istanza di Milvus client che memorizza tutti i dati in un file chiamato milvus_twelvelabs_demo.db. Questo approccio basato su file è ideale per lo sviluppo e i test.</p>
<h2 id="Creating-a-Milvus-Collection-for-Video-Embeddings" class="common-anchor-header">Creare una raccolta Milvus per le incorporazioni video<button data-href="#Creating-a-Milvus-Collection-for-Video-Embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>Ora che siamo collegati a Milvus, creiamo una collezione per memorizzare i nostri embeddings video e i metadati associati. Definiamo lo schema della collezione e creiamo la collezione se non esiste già.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Initialize the collection name</span>
collection_name = <span class="hljs-string">&quot;twelvelabs_demo_collection&quot;</span>

<span class="hljs-comment"># Check if the collection already exists and drop it if it does</span>
<span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name=collection_name):
    milvus_client.drop_collection(collection_name=collection_name)

<span class="hljs-comment"># Create the collection</span>
milvus_client.create_collection(
    collection_name=collection_name,
    dimension=<span class="hljs-number">1024</span>  <span class="hljs-comment"># The dimension of the Twelve Labs embeddings</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection &#x27;<span class="hljs-subst">{collection_name}</span>&#x27; created successfully&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>In questo codice, per prima cosa controlliamo se la collezione esiste già e, in caso affermativo, la eliminiamo. In questo modo, si parte da una tabula rasa. Creiamo l'insieme con una dimensione di 1024, che corrisponde alla dimensione di output degli embeddings di Twelve Labs.</p>
<h2 id="Generating-Embeddings-with-Twelve-Labs-Embed-API" class="common-anchor-header">Generazione degli embeddings con l'API Embed di Twelve Labs<button data-href="#Generating-Embeddings-with-Twelve-Labs-Embed-API" class="anchor-icon" translate="no">
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
    </button></h2><p>Per generare gli embeddings per i nostri video utilizzando l'API Twelve Labs Embed, useremo l'SDK Twelve Labs Python. Il processo prevede la creazione di un task di embedding, l'attesa del suo completamento e il recupero dei risultati. Ecco come implementarlo:</p>
<p>Innanzitutto, assicurarsi di aver installato l'SDK di Twelve Labs e importare i moduli necessari:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> twelvelabs <span class="hljs-keyword">import</span> TwelveLabs
<span class="hljs-keyword">from</span> twelvelabs.models.embed <span class="hljs-keyword">import</span> EmbeddingsTask
<span class="hljs-keyword">import</span> os

<span class="hljs-comment"># Retrieve the API key from environment variables</span>
TWELVE_LABS_API_KEY = os.getenv(<span class="hljs-string">&#x27;TWELVE_LABS_API_KEY&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Initialize-the-Twelve-Labs-client" class="common-anchor-header">Inizializzare il client di Twelve Labs:<button data-href="#Initialize-the-Twelve-Labs-client" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">twelvelabs_client = TwelveLabs(api_key=TWELVE_LABS_API_KEY)
<button class="copy-code-btn"></button></code></pre>
<p>Creare una funzione per generare embeddings per un dato URL video:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_embedding</span>(<span class="hljs-params">video_url</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Generate embeddings for a given video URL using the Twelve Labs API.

    This function creates an embedding task for the specified video URL using
    the Marengo-retrieval-2.6 engine. It monitors the task progress and waits
    for completion. Once done, it retrieves the task result and extracts the
    embeddings along with their associated metadata.

    Args:
        video_url (str): The URL of the video to generate embeddings for.

    Returns:
        tuple: A tuple containing two elements:
            1. list: A list of dictionaries, where each dictionary contains:
                - &#x27;embedding&#x27;: The embedding vector as a list of floats.
                - &#x27;start_offset_sec&#x27;: The start time of the segment in seconds.
                - &#x27;end_offset_sec&#x27;: The end time of the segment in seconds.
                - &#x27;embedding_scope&#x27;: The scope of the embedding (e.g., &#x27;shot&#x27;, &#x27;scene&#x27;).
            2. EmbeddingsTaskResult: The complete task result object from Twelve Labs API.

    Raises:
        Any exceptions raised by the Twelve Labs API during task creation,
        execution, or retrieval.
    &quot;&quot;&quot;</span>

    <span class="hljs-comment"># Create an embedding task</span>
    task = twelvelabs_client.embed.task.create(
        engine_name=<span class="hljs-string">&quot;Marengo-retrieval-2.6&quot;</span>,
        video_url=video_url
    )
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Created task: id=<span class="hljs-subst">{task.<span class="hljs-built_in">id</span>}</span> engine_name=<span class="hljs-subst">{task.engine_name}</span> status=<span class="hljs-subst">{task.status}</span>&quot;</span>)

    <span class="hljs-comment"># Define a callback function to monitor task progress</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">on_task_update</span>(<span class="hljs-params">task: EmbeddingsTask</span>):
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Status=<span class="hljs-subst">{task.status}</span>&quot;</span>)

    <span class="hljs-comment"># Wait for the task to complete</span>
    status = task.wait_for_done(
        sleep_interval=<span class="hljs-number">2</span>,
        callback=on_task_update
    )
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Embedding done: <span class="hljs-subst">{status}</span>&quot;</span>)

    <span class="hljs-comment"># Retrieve the task result</span>
    task_result = twelvelabs_client.embed.task.retrieve(task.<span class="hljs-built_in">id</span>)

    <span class="hljs-comment"># Extract and return the embeddings</span>
    embeddings = []
    <span class="hljs-keyword">for</span> v <span class="hljs-keyword">in</span> task_result.video_embeddings:
        embeddings.append({
            <span class="hljs-string">&#x27;embedding&#x27;</span>: v.embedding.<span class="hljs-built_in">float</span>,
            <span class="hljs-string">&#x27;start_offset_sec&#x27;</span>: v.start_offset_sec,
            <span class="hljs-string">&#x27;end_offset_sec&#x27;</span>: v.end_offset_sec,
            <span class="hljs-string">&#x27;embedding_scope&#x27;</span>: v.embedding_scope
        })
    
    <span class="hljs-keyword">return</span> embeddings, task_result
<button class="copy-code-btn"></button></code></pre>
<p>Utilizzare la funzione per generare embeddings per i propri video:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example usage</span>
video_url = <span class="hljs-string">&quot;https://example.com/your-video.mp4&quot;</span>

<span class="hljs-comment"># Generate embeddings for the video</span>
embeddings, task_result = generate_embedding(video_url)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Generated <span class="hljs-subst">{<span class="hljs-built_in">len</span>(embeddings)}</span> embeddings for the video&quot;</span>)
<span class="hljs-keyword">for</span> i, emb <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(embeddings):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Embedding <span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>:&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Scope: <span class="hljs-subst">{emb[<span class="hljs-string">&#x27;embedding_scope&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Time range: <span class="hljs-subst">{emb[<span class="hljs-string">&#x27;start_offset_sec&#x27;</span>]}</span> - <span class="hljs-subst">{emb[<span class="hljs-string">&#x27;end_offset_sec&#x27;</span>]}</span> seconds&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Embedding vector (first 5 values): <span class="hljs-subst">{emb[<span class="hljs-string">&#x27;embedding&#x27;</span>][:<span class="hljs-number">5</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p>Questa implementazione consente di generare incorporazioni per qualsiasi URL video utilizzando l'API Twelve Labs Embed. La funzione generate_embedding gestisce l'intero processo, dalla creazione dell'attività al recupero dei risultati. Restituisce un elenco di dizionari, ognuno dei quali contiene un vettore di incorporamento insieme ai suoi metadati (intervallo di tempo e ambito).Ricordarsi di gestire potenziali errori, come problemi di rete o limiti dell'API, in un ambiente di produzione. Si potrebbe anche voler implementare dei tentativi o una gestione degli errori più robusta, a seconda del caso d'uso specifico.</p>
<h2 id="Inserting-Embeddings-into-Milvus" class="common-anchor-header">Inserire gli embeddings in Milvus<button data-href="#Inserting-Embeddings-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Dopo aver generato gli embeddings utilizzando l'API Twelve Labs Embed, il passo successivo consiste nell'inserire questi embeddings insieme ai loro metadati nella nostra raccolta Milvus. Questo processo ci permette di memorizzare e indicizzare gli embeddings dei video per una ricerca efficiente delle somiglianze in un secondo momento.</p>
<p>Ecco come inserire gli embeddings in Milvus:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">insert_embeddings</span>(<span class="hljs-params">milvus_client, collection_name, task_result, video_url</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Insert embeddings into the Milvus collection.

    Args:
        milvus_client: The Milvus client instance.
        collection_name (str): The name of the Milvus collection to insert into.
        task_result (EmbeddingsTaskResult): The task result containing video embeddings.
        video_url (str): The URL of the video associated with the embeddings.

    Returns:
        MutationResult: The result of the insert operation.

    This function takes the video embeddings from the task result and inserts them
    into the specified Milvus collection. Each embedding is stored with additional
    metadata including its scope, start and end times, and the associated video URL.
    &quot;&quot;&quot;</span>
    data = []

    <span class="hljs-keyword">for</span> i, v <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(task_result.video_embeddings):
        data.append({
            <span class="hljs-string">&quot;id&quot;</span>: i,
            <span class="hljs-string">&quot;vector&quot;</span>: v.embedding.<span class="hljs-built_in">float</span>,
            <span class="hljs-string">&quot;embedding_scope&quot;</span>: v.embedding_scope,
            <span class="hljs-string">&quot;start_offset_sec&quot;</span>: v.start_offset_sec,
            <span class="hljs-string">&quot;end_offset_sec&quot;</span>: v.end_offset_sec,
            <span class="hljs-string">&quot;video_url&quot;</span>: video_url
        })

    insert_result = milvus_client.insert(collection_name=collection_name, data=data)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Inserted <span class="hljs-subst">{<span class="hljs-built_in">len</span>(data)}</span> embeddings into Milvus&quot;</span>)
    <span class="hljs-keyword">return</span> insert_result

<span class="hljs-comment"># Usage example</span>
video_url = <span class="hljs-string">&quot;https://example.com/your-video.mp4&quot;</span>

<span class="hljs-comment"># Assuming this function exists from previous step</span>
embeddings, task_result = generate_embedding(video_url)

<span class="hljs-comment"># Insert embeddings into the Milvus collection</span>
insert_result = insert_embeddings(milvus_client, collection_name, task_result, video_url)
<span class="hljs-built_in">print</span>(insert_result)
<button class="copy-code-btn"></button></code></pre>
<p>Questa funzione prepara i dati per l'inserimento, includendo tutti i metadati rilevanti come il vettore di incorporamento, l'intervallo di tempo e l'URL del video di origine. Quindi utilizza il client Milvus per inserire questi dati nella raccolta specificata.</p>
<h2 id="Performing-Similarity-Search" class="common-anchor-header">Esecuzione della ricerca di somiglianza<button data-href="#Performing-Similarity-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta memorizzati i nostri embeddings in Milvus, possiamo eseguire ricerche di somiglianza per trovare i segmenti video più rilevanti in base a un vettore di query. Ecco come implementare questa funzionalità:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">perform_similarity_search</span>(<span class="hljs-params">milvus_client, collection_name, query_vector, limit=<span class="hljs-number">5</span></span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Perform a similarity search on the Milvus collection.

    Args:
        milvus_client: The Milvus client instance.
        collection_name (str): The name of the Milvus collection to search in.
        query_vector (list): The query vector to search for similar embeddings.
        limit (int, optional): The maximum number of results to return. Defaults to 5.

    Returns:
        list: A list of search results, where each result is a dictionary containing
              the matched entity&#x27;s metadata and similarity score.

    This function searches the specified Milvus collection for embeddings similar to
    the given query vector. It returns the top matching results, including metadata
    such as the embedding scope, time range, and associated video URL for each match.
    &quot;&quot;&quot;</span>
    search_results = milvus_client.search(
        collection_name=collection_name,
        data=[query_vector],
        limit=limit,
        output_fields=[<span class="hljs-string">&quot;embedding_scope&quot;</span>, <span class="hljs-string">&quot;start_offset_sec&quot;</span>, <span class="hljs-string">&quot;end_offset_sec&quot;</span>, <span class="hljs-string">&quot;video_url&quot;</span>]
    )

    <span class="hljs-keyword">return</span> search_results
    
<span class="hljs-comment"># define the query vector</span>
<span class="hljs-comment"># We use the embedding inserted previously as an example. In practice, you can replace it with any video embedding you want to query.</span>
query_vector = task_result.video_embeddings[<span class="hljs-number">0</span>].embedding.<span class="hljs-built_in">float</span>

<span class="hljs-comment"># Perform a similarity search on the Milvus collection</span>
search_results = perform_similarity_search(milvus_client, collection_name, query_vector)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Search Results:&quot;</span>)
<span class="hljs-keyword">for</span> i, result <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(search_results[<span class="hljs-number">0</span>]):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Result <span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>:&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Video URL: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;video_url&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Time Range: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;start_offset_sec&#x27;</span>]}</span> - <span class="hljs-subst">{result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;end_offset_sec&#x27;</span>]}</span> seconds&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Similarity Score: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;distance&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p>Questa implementazione fa quanto segue:</p>
<ol>
<li>Definisce una funzione perform_similarity_search che prende un vettore di query e cerca embeddings simili nella collezione Milvus.</li>
<li>Utilizza il metodo di ricerca del client Milvus per trovare i vettori più simili.</li>
<li>Specifica i campi di output che vogliamo recuperare, compresi i metadati sui segmenti video corrispondenti.</li>
<li>Fornisce un esempio di come utilizzare questa funzione con un video di query, generando prima il suo incorporamento e poi utilizzandolo per la ricerca.</li>
<li>Stampa i risultati della ricerca, compresi i metadati pertinenti e i punteggi di somiglianza.</li>
</ol>
<p>Implementando queste funzioni, si è creato un flusso di lavoro completo per memorizzare le incorporazioni dei video in Milvus ed eseguire ricerche di somiglianza. Questa configurazione consente di recuperare in modo efficiente contenuti video simili in base alle incorporazioni multimodali generate dall'API Embed di Twelve Labs.</p>
<h2 id="Optimizing-Performance" class="common-anchor-header">Ottimizzazione delle prestazioni<button data-href="#Optimizing-Performance" class="anchor-icon" translate="no">
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
    </button></h2><p>Bene, portiamo questa applicazione al livello successivo! Quando si ha a che fare con collezioni di video su larga scala, le <strong>prestazioni sono fondamentali</strong>. Per ottimizzare, dovremmo implementare l'<a href="https://milvus.io/docs/v2.3.x/bulk_insert.md">elaborazione in batch per la generazione e l'inserimento degli embedding in Milvus</a>. In questo modo, possiamo gestire più video contemporaneamente, riducendo significativamente il tempo di elaborazione complessivo. Inoltre, potremmo sfruttare la <a href="https://milvus.io/docs/v2.2.x/partition_key.md">funzione di partizionamento di Milvus</a> per organizzare i nostri dati in modo più efficiente, magari per categorie di video o periodi di tempo. Questo velocizzerebbe le interrogazioni, consentendo di cercare solo le partizioni rilevanti.</p>
<p>Un altro trucco di ottimizzazione consiste nell'<strong>utilizzare meccanismi di caching per gli embeddings o i risultati di ricerca a cui si accede di frequente</strong>. Questo potrebbe migliorare notevolmente i tempi di risposta per le query più frequenti. Non dimenticate di <a href="https://milvus.io/docs/index-vector-fields.md?tab=floating">mettere a punto i parametri dell'indice di Milvus</a> in base al vostro set di dati specifico e ai modelli di query: una piccola modifica può contribuire a migliorare le prestazioni della ricerca.</p>
<h2 id="Advanced-Features" class="common-anchor-header">Funzioni avanzate<button data-href="#Advanced-Features" class="anchor-icon" translate="no">
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
    </button></h2><p>Ora aggiungiamo alcune caratteristiche interessanti per far risaltare la nostra applicazione! Potremmo implementare <strong>una ricerca ibrida che combina query testuali e video</strong>. Infatti, <a href="https://docs.twelvelabs.io/docs/create-text-embeddings">Twelve Labs Embed API può anche generare incorporazioni di testo per le query testuali</a>. Immaginiamo di consentire agli utenti di inserire sia una descrizione testuale che un video di esempio: genereremo embeddings per entrambi ed eseguiremo una ricerca ponderata in Milvus. In questo modo otterremmo risultati estremamente precisi.</p>
<p>Un'altra fantastica aggiunta sarebbe la <strong>ricerca temporale all'interno dei video</strong>. <a href="https://docs.twelvelabs.io/docs/create-video-embeddings#customize-your-embeddings">Potremmo suddividere i video lunghi in segmenti più piccoli, ciascuno con il proprio embedding</a>. In questo modo, gli utenti potrebbero trovare momenti specifici all'interno dei video, non solo interi clip. E perché non aggiungere un po' di analisi video di base? Potremmo usare le incorporazioni per raggruppare segmenti di video simili, rilevare tendenze o persino identificare i valori anomali in grandi raccolte di video.</p>
<h2 id="Error-Handling-and-Logging" class="common-anchor-header">Gestione degli errori e registrazione<button data-href="#Error-Handling-and-Logging" class="anchor-icon" translate="no">
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
    </button></h2><p>Ammettiamolo, le cose possono andare male e quando succedono dobbiamo essere preparati. L <strong>'implementazione di una solida gestione degli errori è fondamentale</strong>. Dovremmo <a href="https://softwareengineering.stackexchange.com/questions/64180/good-use-of-try-catch-blocks">avvolgere le nostre chiamate API e le operazioni di database in blocchi try-except</a>, fornendo messaggi di errore informativi agli utenti quando qualcosa non funziona. Per i problemi legati alla rete, l'<a href="https://learn.microsoft.com/en-us/dotnet/architecture/microservices/implement-resilient-applications/implement-retries-exponential-backoff">implementazione di tentativi con un backoff esponenziale</a> può aiutare a gestire con grazia i problemi temporanei.</p>
<p><strong>Per quanto riguarda il logging, è il nostro migliore amico per il debug e il monitoraggio</strong>. Dovremmo usare <a href="https://blog.sentry.io/logging-in-python-a-developers-guide/">il modulo di log di Python</a> per tenere traccia degli eventi importanti, degli errori e delle metriche delle prestazioni in tutta la nostra applicazione. Impostiamo diversi livelli di log: DEBUG per lo sviluppo, INFO per il funzionamento generale ed ERROR per i problemi critici. E non dimentichiamo di implementare la rotazione dei log per gestire le dimensioni dei file. Con una registrazione adeguata, saremo in grado di identificare e risolvere rapidamente i problemi, assicurando che la nostra applicazione di ricerca video funzioni senza problemi anche quando cresce.</p>
<h2 id="Conclusion" class="common-anchor-header">Conclusione<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Congratulazioni! Avete realizzato una potente applicazione di ricerca semantica di video utilizzando l'API Embed di Twelve Labs e Milvus. Questa integrazione consente di elaborare, archiviare e recuperare contenuti video con una precisione e un'efficienza senza precedenti. Sfruttando le incorporazioni multimodali, avete creato un sistema che comprende le sfumature dei dati video, aprendo possibilità interessanti per la scoperta di contenuti, i sistemi di raccomandazione e l'analisi video avanzata.</p>
<p>Mentre continuate a sviluppare e perfezionare la vostra applicazione, ricordate che la combinazione tra la generazione avanzata di embedding di Twelve Labs e la memorizzazione vettoriale scalabile di Milvus fornisce una solida base per affrontare sfide di comprensione video ancora più complesse. Vi invitiamo a sperimentare le funzioni avanzate discusse e a spingersi oltre i confini del possibile nella ricerca e nell'analisi dei video.</p>
