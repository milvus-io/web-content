---
id: hugging-face.md
title: Hugging FaceCompatible with Milvus v2.6.20+
summary: >-
  In questa sezione viene illustrato come utilizzare i provider di inferenza
  Hugging Face in hosting per l'embedding di testo in Milvus.
beta: Milvus v2.6.20+
---
<h1 id="Hugging-Face" class="common-anchor-header">Hugging Face<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.20+</span><button data-href="#Hugging-Face" class="anchor-icon" translate="no">
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
    </button></h1><p>L'utilizzo di un modello di embedding di Hugging Face richiede normalmente che l'applicazione gestisca le credenziali, chiami il modello separatamente e generi embedding in modo coerente per i dati inseriti e le query di ricerca. Con una funzione di embedding testuale, Milvus chiama <a href="https://huggingface.co/docs/inference-providers/index">i provider di inferenza Hugging Face</a> ospitati per convertire il testo grezzo in vettori durante l'inserimento e la ricerca.</p>
<p>Questa integrazione utilizza il router Hugging Face ospitato. Per collegare Milvus a un servizio di inferenza di embedding testuale (TEI) distribuito separatamente, consultare <a href="/docs/it/hugging-face-tei.md">Hugging Face TEI</a>.</p>
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
<li>Il campo di output della funzione deve utilizzare il tipo di dati ` <code translate="no">FLOAT_VECTOR</code> `. L’embedding di Hugging Face in Milvus non supporta i campi di output ` <code translate="no">INT8_VECTOR</code>`, ` <code translate="no">BINARY_VECTOR</code>`, ` <code translate="no">FLOAT16_VECTOR</code>` o ` <code translate="no">BFLOAT16_VECTOR</code> `.</li>
<li>La dimensione del campo di output della funzione deve corrispondere alla dimensione di output del modello selezionato.</li>
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
  
   <img translate="no" src="/docs/v3.0.x/assets/hugging-face-embedding-flow.png" alt="Hugging Face text embedding workflow" class="doc-image" id="hugging-face-text-embedding-workflow" /> 
   <span>Flusso di lavoro dell’embedding testuale di Hugging Face</span>
  
 </span></p>
<p>Il flusso di lavoro prevede tre fasi:</p>
<ol>
<li><strong>Invio del testo grezzo.</strong> L’applicazione fornisce il testo grezzo in una richiesta di inserimento o di ricerca.</li>
<li><strong>Generazione di un embedding.</strong> La funzione "Text Embedding" invia il testo tramite <code translate="no">hf-inference</code> alla pipeline " <code translate="no">feature-extraction</code> " di Hugging Face. La funzione utilizza <code translate="no">model_name</code> per selezionare il modello e può passare opzioni di inferenza supportate, quali la normalizzazione e il troncamento.</li>
<li><strong>Utilizza l’embedding.</strong> Hugging Face restituisce un embedding in virgola mobile per ogni testo in ingresso. Durante l’inserimento, Milvus memorizza il vettore nel campo di output della funzione. Durante la ricerca, Milvus utilizza il vettore come vettore di query.</li>
</ol>
<p>La stessa configurazione della Funzione gestisce sia l’inserimento che la ricerca, mantenendo il modello e i parametri di inferenza coerenti in entrambe le operazioni.</p>
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
    </button></h2><p>Prima di utilizzare l’embedding di testo ospitato da Hugging Face, assicurarsi di disporre di:</p>
<ul>
<li>Milvus 2.6.20 o versioni successive della linea di rilascio 2.6.</li>
<li>PyMilvus 2.6.16 o versione successiva.</li>
<li>Un token di accesso utente Hugging Face in grado di richiamare i provider di inferenza.</li>
<li>Un modello attualmente fornito d <code translate="no">hf-inference</code> per il <a href="https://huggingface.co/docs/inference-providers/en/tasks/feature-extraction"><code translate="no">feature-extraction</code></a> attività.</li>
</ul>
<div class="alert note">
<p>Milvus non garantisce che un modello Hugging Face rimanga disponibile su <code translate="no">hf-inference</code>, né che il modello soddisfi i requisiti di stabilità, latenza e qualità dell’output. Verificare il modello su Hugging Face e valutarlo in base al proprio carico di lavoro prima di utilizzarlo in produzione.</p>
</div>
<p>Gli esempi utilizzano <a href="https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2"><code translate="no">sentence-transformers/all-MiniLM-L6-v2</code></a>, che produce embedding a 384 dimensioni. Il modello viene utilizzato solo per illustrare la configurazione e non costituisce una raccomandazione né una certificazione da parte di Milvus.</p>
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
    </button></h2><p>Milvus richiede un token di accesso utente Hugging Face per richiamare il router ospitato. È possibile configurare il token su <code translate="no">milvus.yaml</code> o tramite una variabile d’ambiente.</p>
<p>L’ordine di priorità delle credenziali è:</p>
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
    </button></h3><p>Definire il token nella sezione di primo livello <code translate="no">credential</code> di <code translate="no">milvus.yaml</code>, quindi indirizzare il provider di embedding di Hugging Face a tale etichetta di credenziale:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">huggingface_apikey:</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_HUGGING_FACE_TOKEN&gt;</span>

<span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">huggingface:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">huggingface_apikey</span>
        <span class="hljs-comment"># url: https://router.huggingface.co</span>
<button class="copy-code-btn"></button></code></pre>
<p>È inoltre possibile impostare ` <code translate="no">credential</code> ` nei parametri della funzione. Il valore deve corrispondere all’etichetta definita nella sezione di primo livello ` <code translate="no">credential</code> `, non al token stesso. Un’etichetta di credenziale a livello di funzione ha la precedenza su quella a livello di provider.</p>
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
    </button></h3><p>Se né la configurazione della Funzione né quella del provider specificano un'etichetta delle credenziali, Milvus legge il token da ` <code translate="no">MILVUS_HUGGINGFACE_API_KEY</code>`.</p>
<p>Per Docker Compose, impostare la variabile nel servizio Milvus standalone:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-attr">MILVUS_HUGGINGFACE_API_KEY:</span> <span class="hljs-string">&lt;YOUR_HUGGING_FACE_TOKEN&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per i dettagli sull’applicazione delle impostazioni di Docker Compose, consultare <a href="/docs/it/configure-docker.md">Configurare Milvus con Docker Compose</a>.</p>
<h2 id="Use-Hugging-Face-text-embedding" class="common-anchor-header">Utilizzare l’embedding testuale di Hugging Face<button data-href="#Use-Hugging-Face-text-embedding" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Create-a-collection-with-a-Text-Embedding-Function" class="common-anchor-header">Passaggio 1: Creare una raccolta con una funzione di embedding testuale<button data-href="#Step-1-Create-a-collection-with-a-Text-Embedding-Function" class="anchor-icon" translate="no">
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
    </button></h3><p>Creare uno schema con un campo primario, un campo di input <code translate="no">VARCHAR</code> e un campo di output <code translate="no">FLOAT_VECTOR</code>. La dimensione di output deve corrispondere al modello selezionato.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

collection_name = <span class="hljs-string">&quot;hugging_face_embedding_demo&quot;</span>
schema = client.create_schema()

schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    auto_id=<span class="hljs-literal">False</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;document&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">9000</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
<span class="highlighted-wrapper-line">    dim=<span class="hljs-number">384</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Definire una funzione " <code translate="no">TEXTEMBEDDING</code> " che scriva gli embedding da " <code translate="no">document</code> " a " <code translate="no">dense</code>":</p>
<pre><code translate="no" class="language-python">text_embedding_function = Function(
    name=<span class="hljs-string">&quot;hugging_face_embedding&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],
    function_type=FunctionType.TEXTEMBEDDING,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;huggingface&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;sentence-transformers/all-MiniLM-L6-v2&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;hf_provider&quot;</span>: <span class="hljs-string">&quot;hf-inference&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;credential&quot;</span>: <span class="hljs-string">&quot;huggingface_apikey&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;normalize&quot;</span>: <span class="hljs-string">&quot;true&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;truncate&quot;</span>: <span class="hljs-string">&quot;true&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;max_client_batch_size&quot;</span>: <span class="hljs-number">128</span>,</span>
<span class="highlighted-comment-line">    },</span>
)

schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<p>Se si utilizzano solo le credenziali a livello di provider o la variabile d’ambiente, omettere ` <code translate="no">credential</code> ` dai parametri della funzione.</p>
<p>Configurare un indice per il campo di output, quindi creare la raccolta:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
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
<button class="copy-code-btn"></button></code></pre>
<p>La tabella seguente descrive i parametri della funzione specifici di Hugging Face:</p>
<table>
<thead>
<tr><th>Parametro</th><th>Obbligatorio?</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">provider</code></td><td>Sì</td><td>Il provider del modello di embedding. Impostare questo valore su <code translate="no">huggingface</code>.</td></tr>
<tr><td><code translate="no">model_name</code></td><td>Sì</td><td>L'ID del modello Hugging Face per un modello fornito tramite <code translate="no">hf-inference</code> per il task " <code translate="no">feature-extraction</code> ".</td></tr>
<tr><td><code translate="no">hf_provider</code></td><td>No</td><td>Il percorso del provider di inferenza di Hugging Face. Il valore predefinito e l'unico supportato in Milvus 2.6.20 è <code translate="no">hf-inference</code>.</td></tr>
<tr><td><code translate="no">credential</code></td><td>No</td><td>L'etichetta di una credenziale definita nella sezione di primo livello <code translate="no">credential</code> di <code translate="no">milvus.yaml</code>. Questo valore non corrisponde al token stesso.</td></tr>
<tr><td><code translate="no">normalize</code></td><td>No</td><td>Indica se Hugging Face deve restituire embedding normalizzati. I valori supportati sono <code translate="no">true</code> e <code translate="no">false</code>. Se omesso, Milvus non imposta questa opzione nella richiesta.</td></tr>
<tr><td><code translate="no">prompt_name</code></td><td>No</td><td>Il nome di un prompt definito nella configurazione "Sentence Transformers" del modello selezionato.</td></tr>
<tr><td><code translate="no">truncate</code></td><td>No</td><td>Se Hugging Face debba troncare un input che supera la lunghezza supportata dal modello. I valori supportati sono <code translate="no">true</code> e <code translate="no">false</code>.</td></tr>
<tr><td><code translate="no">truncation_direction</code></td><td>No</td><td>La direzione in cui Hugging Face tronca un input. I valori supportati sono <code translate="no">left</code> e <code translate="no">right</code>.</td></tr>
<tr><td><code translate="no">max_client_batch_size</code></td><td>No</td><td>Il numero massimo di testi di input inviati in una singola richiesta a Hugging Face. Il valore predefinito è <code translate="no">128</code> e il valore deve essere maggiore di <code translate="no">0</code>.</td></tr>
</tbody>
</table>
<h3 id="Step-2-Insert-raw-text" class="common-anchor-header">Passaggio 2: Inserire il testo grezzo<button data-href="#Step-2-Insert-raw-text" class="anchor-icon" translate="no">
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
    </button></h3><p>Inserisci il testo senza fornire vettori. Milvus chiama Hugging Face e scrive gli embedding generati su <code translate="no">dense</code>.</p>
<pre><code translate="no" class="language-python">client.insert(
    collection_name=collection_name,
    data=[
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;Milvus simplifies semantic search through embeddings.&quot;</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;Vector embeddings convert text into searchable numeric data.&quot;</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;Semantic search helps users find relevant information quickly.&quot;</span>,
        },
    ],
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Search-with-raw-text" class="common-anchor-header">Passaggio 3: Ricerca con testo grezzo<button data-href="#Step-3-Search-with-raw-text" class="anchor-icon" translate="no">
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
    </button></h3><p>Effettua una ricerca con una query testuale. Milvus applica la stessa configurazione della funzione per creare il vettore di query prima di eseguire la ricerca vettoriale.</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=collection_name,
    data=[<span class="hljs-string">&quot;How does Milvus handle semantic search?&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,
)

<span class="hljs-built_in">print</span>(results)
<button class="copy-code-btn"></button></code></pre>
<p>Il risultato contiene i documenti più pertinenti al testo della query, ordinati in base alla similarità coseno.</p>
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
    </button></h2><h3 id="The-model-is-unavailable-for-feature-extraction" class="common-anchor-header">Il modello non è disponibile per l’estrazione delle caratteristiche<button data-href="#The-model-is-unavailable-for-feature-extraction" class="anchor-icon" translate="no">
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
    </button></h3><p>Apri la pagina del modello su Hugging Face e controlla la sezione <strong>"Inference Providers</strong> ". Verifica che <code translate="no">hf-inference</code> fornisca il modello per <code translate="no">feature-extraction</code>. In caso contrario, seleziona un altro modello e, se necessario, aggiorna la dimensione del campo vettoriale.</p>
<h3 id="The-returned-vector-dimension-does-not-match-the-field" class="common-anchor-header">La dimensione del vettore restituito non corrisponde al campo<button data-href="#The-returned-vector-dimension-does-not-match-the-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Controlla la dimensione di output del modello e confrontala con quella indicata su <code translate="no">dim</code> nel campo "Function output". Milvus rifiuta una risposta la cui dimensione del vettore differisce da quella del campo " <code translate="no">FLOAT_VECTOR</code> ".</p>
<h3 id="Milvus-reports-missing-Hugging-Face-credentials" class="common-anchor-header">Milvus segnala la mancanza delle credenziali Hugging Face<button data-href="#Milvus-reports-missing-Hugging-Face-credentials" class="anchor-icon" translate="no">
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
    </button></h3><p>Verifica che l’etichetta delle credenziali della Funzione esista nella sezione di primo livello “ <code translate="no">credential</code> ”, che l’etichetta a livello di provider sia valida o che “ <code translate="no">MILVUS_HUGGINGFACE_API_KEY</code> ” sia presente nell’ambiente di servizio di Milvus.</p>
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
<li>Per i concetti generali relativi alle Funzioni e al comportamento di inserimento/ricerca, consultare <a href="/docs/it/embedding-function-overview.md">Panoramica sulle Funzioni di embedding</a>.</li>
<li>Per ricalcolare il ranking dei candidati della ricerca vettoriale utilizzando i punteggi di similarità delle frasi di Hugging Face ospitati, consultare <a href="/docs/it/hugging-face-ranker.md">Hugging Face Ranker</a>.</li>
</ul>
