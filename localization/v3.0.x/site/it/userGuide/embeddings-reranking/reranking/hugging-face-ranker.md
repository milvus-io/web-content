---
id: hugging-face-ranker.md
title: Hugging Face RankerCompatible with Milvus v2.6.20+
summary: >-
  In questa sezione viene spiegato come ricalcolare il ranking dei risultati di
  ricerca di Milvus utilizzando i modelli di similarità tra frasi di Hugging
  Face ospitati.
beta: Milvus v2.6.20+
---
<h1 id="Hugging-Face-Ranker" class="common-anchor-header">Hugging Face Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.20+</span><button data-href="#Hugging-Face-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>La ricerca vettoriale ordina i risultati in base alla distanza vettoriale, ma l'ordine iniziale potrebbe non riflettere l'adeguatezza delle risposte fornite dai testi dei candidati alla query. Hugging Face Ranker invia la query e i testi dei candidati ai <a href="https://huggingface.co/docs/inference-providers/index">provider di inferenza Hugging Face</a> ospitati e utilizza i punteggi dell'<code translate="no">sentence-similarity</code> e per riordinare i candidati restituiti da Milvus.</p>
<p>Questa integrazione utilizza il router Hugging Face ospitato. Per effettuare una nuova classificazione utilizzando un servizio Text Embeddings Inference (TEI) distribuito separatamente, consultare <a href="/docs/it/tei-ranker.md">TEI Ranker</a>.</p>
<h2 id="Limits" class="common-anchor-header">Limiti<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li>La funzione deve fare riferimento esattamente a un campo non nullo di ` <code translate="no">VARCHAR</code> ` in ` <code translate="no">input_field_names</code>`.</li>
<li>Il numero di stringhe in <code translate="no">queries</code> deve essere uguale al numero di query di ricerca (<code translate="no">nq</code>).</li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">Come funziona<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
  
   <img translate="no" src="/docs/v3.0.x/assets/hugging-face-ranker-flow.png" alt="Hugging Face Ranker workflow" class="doc-image" id="hugging-face-ranker-workflow" /> 
   <span>Flusso di lavoro di Hugging Face Ranker</span>
  
 </span></p>
<p>Hugging Face Ranker viene eseguito dopo la ricerca vettoriale iniziale:</p>
<ol>
<li><strong>Recupera le entità candidate.</strong> Milvus effettua la ricerca nel campo vettoriale configurato e raccoglie le entità candidate.</li>
<li><strong>Preparazione del testo per il re-ranking.</strong> La funzione legge il testo della query da <code translate="no">params.queries</code> e il testo dei candidati dal campo <code translate="no">VARCHAR</code> specificato in <code translate="no">input_field_names</code>.</li>
<li><strong>Richiesta dei punteggi di similarità.</strong> Milvus invia la query come <code translate="no">source_sentence</code> e i testi candidati come <code translate="no">sentences</code> tramite <code translate="no">hf-inference</code> alla pipeline Hugging Face <code translate="no">sentence-similarity</code>.</li>
<li><strong>Riorganizza i candidati in base al punteggio.</strong> Hugging Face restituisce un punteggio per ciascun candidato. Milvus ordina i candidati dal punteggio più alto a quello più basso e restituisce i risultati riorganizzati.</li>
</ol>
<p><strong>Come vengono calcolati i punteggi di similarità</strong></p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/hugging-face-ranker-scoring.png" alt="How Hugging Face Ranker calculates similarity scores" class="doc-image" id="how-hugging-face-ranker-calculates-similarity-scores" /> 
   <span>Come Hugging Face Ranker calcola i punteggi di similarità</span>
  
 </span></p>
<p>Il modello di Hugging Face calcola i punteggi in tre fasi:</p>
<ol>
<li><strong>Preparare gli input di testo.</strong> Il Ranker legge il testo della query da <code translate="no">params.queries</code> e il testo dei candidati dal campo <code translate="no">VARCHAR</code> configurato.</li>
<li><strong>Creazione di rappresentazioni separate del modello.</strong> Milvus invia la query come <code translate="no">source_sentence</code> e i testi dei candidati come <code translate="no">sentences</code>. Il modello codifica internamente la query e ciascun candidato separatamente.</li>
<li><strong>Confronta e restituisci i punteggi.</strong> Il modello confronta la rappresentazione della query con ciascuna rappresentazione dei candidati e restituisce un punteggio di similarità per ciascun candidato.</li>
</ol>
<p>Gli embedding o le rappresentazioni utilizzati dal modello Hugging Face costituiscono una fase intermedia dell’elaborazione del modello. Hugging Face restituisce punteggi, non vettori. Il recupero iniziale dei vettori e il riordino dei risultati da parte del modello utilizzano quindi rappresentazioni separate e possono avvalersi di modelli diversi.</p>
<h2 id="Before-you-start" class="common-anchor-header">Prima di iniziare<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>Prima di utilizzare Hugging Face Ranker, assicurati di disporre di:</p>
<ul>
<li>Milvus 2.6.20 o versioni successive della linea di rilascio 2.6.</li>
<li>PyMilvus 2.6.16 o versione successiva.</li>
<li>Un token di accesso utente Hugging Face in grado di richiamare i provider di inferenza.</li>
<li>Un modello attualmente gestito da <code translate="no">hf-inference</code> per il <a href="https://huggingface.co/tasks/sentence-similarity"><code translate="no">sentence-similarity</code></a> attività.</li>
<li>Una collezione che memorizza il testo candidato in un campo di <code translate="no">VARCHAR</code> non nullo.</li>
</ul>
<div class="alert note">
<p>Milvus non controlla se un modello Hugging Face rimanga disponibile tramite <code translate="no">hf-inference</code>, né se il modello soddisfi i requisiti di stabilità, latenza e qualità dell’output. Verificare il modello su Hugging Face e valutarlo in base al proprio carico di lavoro prima di utilizzarlo in produzione.</p>
</div>
<p>Gli esempi utilizzano <a href="https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2"><code translate="no">sentence-transformers/all-MiniLM-L6-v2</code></a> solo a scopo dimostrativo della configurazione. Il modello non costituisce una raccomandazione né una certificazione da parte di Milvus.</p>
<h2 id="Configure-credentials" class="common-anchor-header">Configurazione delle credenziali<button data-href="#Configure-credentials" class="anchor-icon" translate="no">
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
    </button></h2><p>È possibile configurare il token di accesso utente di Hugging Face su <code translate="no">milvus.yaml</code> o tramite una variabile d’ambiente.</p>
<p>L'ordine di precedenza delle credenziali è:</p>
<pre><code translate="no" class="language-text">Function credential label -&gt; provider credential label in milvus.yaml -&gt; environment variable
<button class="copy-code-btn"></button></code></pre>
<h3 id="Option-1-Configuration-file" class="common-anchor-header">Opzione 1: File di configurazione<button data-href="#Option-1-Configuration-file" class="anchor-icon" translate="no">
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
    </button></h3><p>Definire il token nella sezione di primo livello <code translate="no">credential</code>, quindi indirizzare il provider di ranking Hugging Face all’etichetta delle credenziali:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">huggingface_apikey:</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_HUGGING_FACE_TOKEN&gt;</span>

<span class="hljs-attr">function:</span>
  <span class="hljs-attr">rerank:</span>
    <span class="hljs-attr">model:</span>
      <span class="hljs-attr">providers:</span>
        <span class="hljs-attr">huggingface:</span>
          <span class="hljs-attr">credential:</span> <span class="hljs-string">huggingface_apikey</span>
          <span class="hljs-comment"># url: https://router.huggingface.co</span>
<button class="copy-code-btn"></button></code></pre>
<p>Un parametro ` <code translate="no">credential</code> ` a livello di funzione può sovrascrivere l'etichetta a livello di provider. Il suo valore deve essere un'etichetta di credenziale definita in <code translate="no">milvus.yaml</code>, non il token stesso.</p>
<h3 id="Option-2-Environment-variable" class="common-anchor-header">Opzione 2: Variabile d’ambiente<button data-href="#Option-2-Environment-variable" class="anchor-icon" translate="no">
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
    </button></h3><p>Se né la configurazione della funzione né quella del provider specificano un'etichetta delle credenziali, impostare ` <code translate="no">MILVUS_HUGGINGFACE_API_KEY</code> ` nell'ambiente del servizio Milvus:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-attr">MILVUS_HUGGINGFACE_API_KEY:</span> <span class="hljs-string">&lt;YOUR_HUGGING_FACE_TOKEN&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-Hugging-Face-Ranker" class="common-anchor-header">Utilizzare Hugging Face Ranker<button data-href="#Use-Hugging-Face-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Hugging Face Ranker viene definito e applicato al momento della ricerca. È possibile modificare o omettere il ranker per ogni ricerca senza modificare lo schema della raccolta.</p>
<h3 id="Step-1-Prepare-a-collection" class="common-anchor-header">Passaggio 1: Preparare una raccolta<button data-href="#Step-1-Prepare-a-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>L'esempio seguente crea una collezione con un campo di testo per il riclassamento e un campo vettoriale per il recupero iniziale:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

collection_name = <span class="hljs-string">&quot;hugging_face_rerank_demo&quot;</span>
schema = client.create_schema()
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
)

client.insert(
    collection_name=collection_name,
    data=[
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;Recent renewable energy developments include improved solar efficiency.&quot;</span>,
            <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.10</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.40</span>],
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;Climate policy and carbon markets have evolved rapidly in recent years.&quot;</span>,
            <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.11</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.28</span>, <span class="hljs-number">0.39</span>],
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;New battery technology helps stabilize wind and solar power generation.&quot;</span>,
            <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.90</span>, <span class="hljs-number">0.10</span>, <span class="hljs-number">0.05</span>, <span class="hljs-number">0.02</span>],
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;Vector databases support similarity search for machine learning applications.&quot;</span>,
            <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.01</span>, <span class="hljs-number">0.02</span>, <span class="hljs-number">0.03</span>, <span class="hljs-number">0.04</span>],
        },
    ],
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Define-the-rerank-Function" class="common-anchor-header">Passaggio 2: definire la funzione di riclassificazione<button data-href="#Step-2-Define-the-rerank-Function" class="anchor-icon" translate="no">
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
    </button></h3><p>Definire una funzione ` <code translate="no">RERANK</code> ` che legga il testo dei candidati da ` <code translate="no">document</code> ` e utilizzi il testo della query in ` <code translate="no">queries</code>`:</p>
<pre><code translate="no" class="language-python">hugging_face_ranker = Function(
    name=<span class="hljs-string">&quot;hugging_face_semantic_ranker&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],
    function_type=FunctionType.RERANK,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;huggingface&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;sentence-transformers/all-MiniLM-L6-v2&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;hf_provider&quot;</span>: <span class="hljs-string">&quot;hf-inference&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;renewable energy developments&quot;</span>],</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;credential&quot;</span>: <span class="hljs-string">&quot;huggingface_apikey&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;max_client_batch_size&quot;</span>: <span class="hljs-number">32</span>,</span>
<span class="highlighted-comment-line">    },</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Se si utilizzano solo le credenziali a livello di provider o la variabile d’ambiente, omettere <code translate="no">credential</code> dai parametri della funzione.</p>
<p>La tabella seguente descrive i parametri di Hugging Face Ranker:</p>
<table>
<thead>
<tr><th>Parametro</th><th>Obbligatorio?</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">reranker</code></td><td>Sì</td><td>L'implementazione del reranking. Impostare questo valore su <code translate="no">model</code>.</td></tr>
<tr><td><code translate="no">provider</code></td><td>Sì</td><td>Il fornitore del modello. Impostare questo valore su <code translate="no">huggingface</code>.</td></tr>
<tr><td><code translate="no">model_name</code></td><td>Sì</td><td>L'ID del modello Hugging Face per un modello fornito tramite <code translate="no">hf-inference</code> per il task <code translate="no">sentence-similarity</code>.</td></tr>
<tr><td><code translate="no">queries</code></td><td>Sì</td><td>Stringhe di query utilizzate per il riclassamento. Fornire esattamente una stringa per ogni query di ricerca, anche quando il recupero iniziale utilizza vettori di query.</td></tr>
<tr><td><code translate="no">hf_provider</code></td><td>No</td><td>Il percorso del provider di inferenza di Hugging Face. Il valore predefinito e l'unico supportato in Milvus 2.6.20 è <code translate="no">hf-inference</code>.</td></tr>
<tr><td><code translate="no">credential</code></td><td>No</td><td>L'etichetta di una credenziale definita nella sezione di primo livello <code translate="no">credential</code> di <code translate="no">milvus.yaml</code>. Questo valore non è il token stesso.</td></tr>
<tr><td><code translate="no">max_client_batch_size</code></td><td>No</td><td>Il numero massimo di testi candidati inviati in una singola richiesta a Hugging Face. Il valore predefinito è <code translate="no">32</code> e il valore deve essere maggiore di <code translate="no">0</code>.</td></tr>
</tbody>
</table>
<h3 id="Step-3-Search-with-the-ranker" class="common-anchor-header">Passaggio 3: Effettuare la ricerca con il ranker<button data-href="#Step-3-Search-with-the-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Passare la funzione tramite il parametro <code translate="no">ranker</code> di <code translate="no">search()</code>:</p>
<pre><code translate="no" class="language-python">query_vector = [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.41</span>]

results = client.search(
    collection_name=collection_name,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],
<span class="highlighted-wrapper-line">    ranker=hugging_face_ranker,</span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,
)

<span class="hljs-built_in">print</span>(results)
<button class="copy-code-btn"></button></code></pre>
<p>Milvus recupera innanzitutto i candidati da <code translate="no">dense</code>, quindi utilizza il testo della query in <code translate="no">queries</code> e il testo dei candidati in <code translate="no">document</code> per calcolare i punteggi di similarità delle frasi. I candidati restituiti vengono ordinati in base ai punteggi di Hugging Face.</p>
<h2 id="Troubleshooting" class="common-anchor-header">Risoluzione dei problemi<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="The-model-is-unavailable-for-sentence-similarity" class="common-anchor-header">Il modello non è disponibile per la similarità delle frasi<button data-href="#The-model-is-unavailable-for-sentence-similarity" class="anchor-icon" translate="no">
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
    </button></h3><p>Aprire la pagina del modello su Hugging Face e controllare la sezione <strong>"Inference Providers</strong> ". Verificare che <code translate="no">hf-inference</code> fornisca il modello per <code translate="no">sentence-similarity</code>. In caso contrario, selezionare un altro modello che supporti l'attività.</p>
<h3 id="The-number-of-query-strings-does-not-match-the-search-request" class="common-anchor-header">Il numero di stringhe di query non corrisponde alla richiesta di ricerca<button data-href="#The-number-of-query-strings-does-not-match-the-search-request" class="anchor-icon" translate="no">
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
    </button></h3><p>Il numero di stringhe in <code translate="no">queries</code> deve essere uguale al numero di query di ricerca (<code translate="no">nq</code>). Per una ricerca con un solo vettore di query, fornire esattamente una stringa di query.</p>
<h3 id="Candidate-text-is-missing-or-nullable" class="common-anchor-header">Il testo del candidato manca o è nullable<button data-href="#Candidate-text-is-missing-or-nullable" class="anchor-icon" translate="no">
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
    </button></h3><p>Assicurarsi che <code translate="no">input_field_names</code> contenga esattamente un campo <code translate="no">VARCHAR</code> non nullo e che ogni entità candidata contenga del testo in quel campo.</p>
<h3 id="Milvus-reports-missing-Hugging-Face-credentials" class="common-anchor-header">Milvus segnala la mancanza delle credenziali di Hugging Face<button data-href="#Milvus-reports-missing-Hugging-Face-credentials" class="anchor-icon" translate="no">
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
    </button></h3><p>Verificare che l'etichetta delle credenziali della funzione esista in <code translate="no">milvus.yaml</code>, che l'etichetta a livello di provider sia valida o che <code translate="no">MILVUS_HUGGINGFACE_API_KEY</code> sia presente nell'ambiente di servizio di Milvus.</p>
<h2 id="Next-steps" class="common-anchor-header">Prossimi passi<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
<li>Per informazioni sul comportamento e sui limiti del Model Ranker condiviso, consultare <a href="/docs/it/model-ranker-overview.md">la Panoramica su Model Ranker</a>.</li>
<li>Per generare embedding tramite i provider di inferenza Hugging Face ospitati, consultare <a href="/docs/it/hugging-face.md">Hugging Face</a>.</li>
<li>Per applicare il ranker alla ricerca ibrida, consultare <a href="/docs/it/multi-vector-search.md">Ricerca ibrida multivettoriale</a>.</li>
</ul>
