---
id: google-gemini.md
title: Google Gemini
summary: >-
  Utilizzate un modello di incorporazione di Google Gemini con Milvus scegliendo
  un modello e configurando Milvus con la vostra chiave API Gemini.
---
<h1 id="Google-Gemini" class="common-anchor-header">Google Gemini<button data-href="#Google-Gemini" class="anchor-icon" translate="no">
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
    </button></h1><p>Utilizzate un modello di incorporamento di Google Gemini con Milvus scegliendo un modello e configurando Milvus con la vostra chiave API Gemini.</p>
<h2 id="Choose-an-embedding-model" class="common-anchor-header">Scegliere un modello di incorporamento<button data-href="#Choose-an-embedding-model" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus supporta i modelli di incorporamento forniti da Google Gemini. Di seguito sono riportati i modelli di incorporamento Gemini attualmente disponibili per un rapido riferimento:</p>
<table>
   <tr>
     <th><p><strong>Nome del modello</strong></p></th>
     <th><p><strong>Dimensioni</strong></p></th>
     <th><p><strong>Gettoni massimi</strong></p></th>
     <th><p><strong>Descrizione</strong></p></th>
   </tr>
   <tr>
     <td><p>gemini-embedding-001</p></td>
     <td><p>Predefinito: 3.072 (consigliato: 768, 1.536 o 3.072)</p></td>
     <td><p>8,192</p></td>
     <td><p>Modello di incorporamento del testo con dimensioni flessibili, addestrato con Matryoshka Representation Learning (MRL).</p></td>
   </tr>
   <tr>
     <td><p>gemini-embedding-2</p></td>
     <td><p>Predefinito: 3.072 (consigliato: 768, 1.536 o 3.072)</p></td>
     <td><p>8,192</p></td>
     <td><p>Il primo modello di incorporamento multimodale di Google, che supporta testo, immagini, video, audio e documenti in uno spazio di incorporamento unificato.</p></td>
   </tr>
</table>
<p>Entrambi i modelli sono addestrati con la tecnica Matryoshka Representation Learning (MRL), che consente dimensioni di output flessibili tramite il parametro <code translate="no">dim</code>. Si consiglia di iniziare con 768 dimensioni e di scalare fino a 1.536 o 3.072 se necessario. Per maggiori dettagli, consultare i <a href="https://ai.google.dev/gemini-api/docs/embeddings">modelli di incorporazione Gemini</a>.</p>
<p>I modelli di incorporazione Gemini supportano anche un parametro di <strong>tipo di compito</strong> che ottimizza le incorporazioni per casi d'uso specifici. Milvus imposta automaticamente il tipo di attività in base all'operazione:</p>
<ul>
<li><p><strong>Insert / Upsert</strong>: <code translate="no">RETRIEVAL_DOCUMENT</code></p></li>
<li><p><strong>Ricerca</strong>: <code translate="no">RETRIEVAL_QUERY</code></p></li>
</ul>
<p>È possibile sovrascrivere questa impostazione specificando esplicitamente un parametro <code translate="no">task</code> (ad esempio, <code translate="no">SEMANTIC_SIMILARITY</code>, <code translate="no">CLASSIFICATION</code>, <code translate="no">CLUSTERING</code>).</p>
<h2 id="Configure-credentials" class="common-anchor-header">Configurare le credenziali<button data-href="#Configure-credentials" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus deve conoscere la chiave API Gemini prima di poter richiedere le incorporazioni. Milvus offre due metodi per configurare le credenziali:</p>
<ul>
<li><p><strong>File di configurazione (consigliato):</strong> Memorizzare la chiave API in <code translate="no">milvus.yaml</code> in modo che ogni riavvio e nodo la rilevi automaticamente.</p></li>
<li><p><strong>Variabili d'ambiente:</strong> Iniettare la chiave al momento della distribuzione, ideale per Docker Compose.</p></li>
</ul>
<p>Scegliete uno dei due metodi seguenti: il file di configurazione è più facile da mantenere su macchine virtuali e bare-metal, mentre la via delle variabili d'ambiente si adatta ai flussi di lavoro dei container.</p>
<p>Se una chiave API per lo stesso provider è presente sia nel file di configurazione che in una variabile d'ambiente, Milvus utilizza sempre il valore in <code translate="no">milvus.yaml</code> e ignora la variabile d'ambiente.</p>
<h3 id="Option-1-Configuration-file-recommended--higher-priority" class="common-anchor-header">Opzione 1: File di configurazione (consigliata e con priorità più alta)<button data-href="#Option-1-Configuration-file-recommended--higher-priority" class="anchor-icon" translate="no">
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
    </button></h3><p>Mantenere le chiavi API in <code translate="no">milvus.yaml</code>; Milvus le legge all'avvio e sovrascrive qualsiasi variabile d'ambiente per lo stesso provider.</p>
<ol>
<li><p><strong>Dichiarare le chiavi sotto credenziali:</strong></p>
<p>Si possono elencare una o più chiavi API, dando a ciascuna un'etichetta inventata e a cui si farà riferimento in seguito.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">apikey_dev:</span>            <span class="hljs-comment"># dev environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_DEV_KEY&gt;</span>
  <span class="hljs-attr">apikey_prod:</span>           <span class="hljs-comment"># production environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_PROD_KEY&gt;</span>    
<button class="copy-code-btn"></button></code></pre>
<p>Mettere le chiavi API in questo punto le rende persistenti tra i vari riavvii e consente di cambiare le chiavi semplicemente cambiando l'etichetta.</p></li>
<li><p><strong>Indicare a Milvus quale chiave usare per le chiamate a Gemini</strong></p>
<p>Nello stesso file, si indica al provider Gemini l'etichetta che si desidera utilizzare.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">gemini:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey_dev</span>      <span class="hljs-comment"># ← choose any label you defined above</span>
<button class="copy-code-btn"></button></code></pre>
<p>Questo vincola una chiave specifica a ogni richiesta che Milvus invia all'endpoint Gemini embeddings.</p></li>
</ol>
<h3 id="Option-2-Environment-variable" class="common-anchor-header">Opzione 2: variabile d'ambiente<button data-href="#Option-2-Environment-variable" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilizzate questo metodo quando eseguite Milvus con Docker Compose e preferite tenere i segreti fuori dai file e dalle immagini.</p>
<p>Milvus ricorre alla variabile d'ambiente solo se non viene trovata alcuna chiave per il provider in <code translate="no">milvus.yaml</code>.</p>
<table>
   <tr>
     <th><p><strong>Variabile</strong></p></th>
     <th><p><strong>Richiesto</strong></p></th>
     <th><p><strong>Descrizione</strong></p></th>
   </tr>
   <tr>
     <td><p>MILVUS_GEMINI_API_KEY</p></td>
     <td><p>Sì</p></td>
     <td><p>Rende disponibile la chiave Gemini all'interno di ogni contenitore Milvus (ignorata se esiste una chiave per Gemini in milvus.yaml).</p></td>
   </tr>
</table>
<p>Nel file <strong>docker-compose.yaml</strong>, impostare la variabile d'ambiente <code translate="no">MILVUS_GEMINI_API_KEY</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml (standalone service section)</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-comment"># ... other configurations ...</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-comment"># ... other environment variables ...</span>
    <span class="hljs-comment"># Set the environment variable pointing to the Gemini API key inside the container</span>
    <span class="hljs-attr">MILVUS_GEMINI_API_KEY:</span> <span class="hljs-string">&lt;YOUR_GEMINI_API_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Il blocco <code translate="no">environment:</code> inietta la chiave solo nel contenitore Milvus, lasciando inalterato il sistema operativo host. Per maggiori dettagli, consultare <a href="http://configure-docker.md#Configure-Milvus-with-Docker-Compose">Configurazione di Milvus con Docker Compose</a>.</p>
<h2 id="Step-1-Create-a-collection-with-a-text-embedding-function" class="common-anchor-header">Passo 1: Creare una collezione con una funzione di incorporamento del testo<button data-href="#Step-1-Create-a-collection-with-a-text-embedding-function" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Define-schema-fields" class="common-anchor-header">Definire i campi dello schema<button data-href="#Define-schema-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Per utilizzare una funzione di incorporamento, creare una raccolta con uno schema specifico. Questo schema deve includere almeno tre campi necessari:</p>
<ul>
<li><p>Il campo primario che identifica in modo univoco ogni entità della raccolta.</p></li>
<li><p>Un campo <code translate="no">VARCHAR</code> che memorizza i dati grezzi da incorporare.</p></li>
<li><p>Un campo vettoriale riservato per memorizzare le incorporazioni vettoriali dense che la funzione di incorporazione del testo genererà per il campo <code translate="no">VARCHAR</code>.</p></li>
</ul>
<p>L'esempio seguente definisce uno schema con un campo scalare <code translate="no">&quot;document&quot;</code> per memorizzare i dati testuali e un campo vettoriale <code translate="no">&quot;dense&quot;</code> per memorizzare le incorporazioni che saranno generate dal modulo Function. Ricordarsi di impostare la dimensione del vettore (<code translate="no">dim</code>) in modo che corrisponda all'output del modello di embedding scelto.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType

<span class="hljs-comment"># Initialize Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
)

<span class="hljs-comment"># Create a new schema for the collection</span>
schema = client.create_schema()

<span class="hljs-comment"># Add primary field &quot;id&quot;</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)

<span class="hljs-comment"># Add scalar field &quot;document&quot; for storing textual data</span>
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>)

<span class="hljs-comment"># Add vector field &quot;dense&quot; for storing embeddings.</span>
<span class="hljs-comment"># IMPORTANT: Set dim to match the exact output dimension of the embedding model.</span>
<span class="hljs-comment"># For instance, Gemini&#x27;s gemini-embedding-001 model outputs 3072-dimensional vectors by default,</span>
<span class="hljs-comment"># but can be shortened to 768 or 1536 dimensions.</span>
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-the-text-embedding-function" class="common-anchor-header">Definire la funzione di incorporazione del testo<button data-href="#Define-the-text-embedding-function" class="anchor-icon" translate="no">
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
    </button></h3><p>La funzione di incorporazione del testo converte automaticamente i dati grezzi memorizzati in un campo <code translate="no">VARCHAR</code> in embeddings e li memorizza nel campo vettoriale esplicitamente definito.</p>
<p>L'esempio seguente aggiunge un modulo Function (<code translate="no">gemini_embedding</code>) che converte il campo scalare <code translate="no">&quot;document&quot;</code> in embeddings, memorizzando i vettori risultanti nel campo vettoriale <code translate="no">&quot;dense&quot;</code> definito in precedenza.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function (example: Gemini provider)</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;gemini_embedding&quot;</span>,                        <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,       <span class="hljs-comment"># Type of embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],                 <span class="hljs-comment"># Scalar field to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],                   <span class="hljs-comment"># Vector field to store embeddings</span>
    params={                                        <span class="hljs-comment"># Provider-specific configuration (highest priority)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;gemini&quot;</span>,                       <span class="hljs-comment"># Embedding model provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;gemini-embedding-001&quot;</span>,       <span class="hljs-comment"># Embedding model</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey_dev&quot;,               # Optional: Credential label specified in milvus.yaml</span>
        <span class="hljs-comment"># &quot;dim&quot;: &quot;768&quot;,                             # Optional: Output vector dimension (default 3072)</span>
        <span class="hljs-comment"># &quot;task&quot;: &quot;RETRIEVAL_DOCUMENT&quot;,             # Optional: Task type for embedding optimization</span>
    }
)

<span class="hljs-comment"># Add the embedding function to your schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Tipi di task supportati per il parametro task:</strong></p>
<ul>
<li><p><code translate="no">RETRIEVAL_DOCUMENT</code> - Ottimizza gli embeddings per l'indicizzazione dei documenti (predefinito per insert/upsert).</p></li>
<li><p><code translate="no">RETRIEVAL_QUERY</code> - Ottimizza gli embeddings per il recupero delle query (default per la ricerca).</p></li>
<li><p><code translate="no">SEMANTIC_SIMILARITY</code> - Ottimizza gli embeddings per la misurazione della similarità del testo.</p></li>
<li><p><code translate="no">CLASSIFICATION</code> - Ottimizza le incorporazioni per la classificazione del testo.</p></li>
<li><p><code translate="no">CLUSTERING</code> - Ottimizza le incorporazioni per il clustering.</p></li>
</ul>
<p>Quando non è impostato esplicitamente, Milvus utilizza automaticamente <code translate="no">RETRIEVAL_DOCUMENT</code> durante l'inserimento/aggiornamento e <code translate="no">RETRIEVAL_QUERY</code> durante la ricerca.</p>
<h3 id="Configure-the-index" class="common-anchor-header">Configurare l'indice<button data-href="#Configure-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Dopo aver definito lo schema con i campi necessari e la funzione incorporata, configurare l'indice per la collezione. Per semplificare questo processo, utilizzare <code translate="no">AUTOINDEX</code> come <code translate="no">index_type</code>, un'opzione che consente a Milvus di scegliere e configurare il tipo di indice più adatto in base alla struttura dei dati.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add AUTOINDEX to automatically select optimal indexing method</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span> 
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-the-collection" class="common-anchor-header">Creare la collezione<button data-href="#Create-the-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Creare ora la collezione utilizzando lo schema e i parametri dell'indice definiti.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create collection named &quot;demo&quot;</span>
client.create_collection(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    schema=schema, 
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-2-Insert-data" class="common-anchor-header">Fase 2: inserimento dei dati<button data-href="#Step-2-Insert-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Dopo aver configurato la collezione e l'indice, si è pronti a inserire i dati grezzi. In questo processo, è sufficiente fornire il testo grezzo. Il modulo Function, definito in precedenza, genera automaticamente il vettore sparse corrispondente per ogni voce di testo.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert sample documents</span>
client.insert(<span class="hljs-string">&#x27;demo&#x27;</span>, [
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Milvus simplifies semantic search through embeddings.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Vector embeddings convert text into searchable numeric data.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Semantic search helps users find relevant information quickly.&#x27;</span>},
])
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-3-Search-with-text" class="common-anchor-header">Fase 3: Ricerca con il testo<button data-href="#Step-3-Search-with-text" class="anchor-icon" translate="no">
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
    </button></h2><p>Dopo l'inserimento dei dati, è possibile eseguire una ricerca semantica utilizzando il testo grezzo della query. Milvus converte automaticamente la query in un vettore di incorporamento, recupera i documenti pertinenti in base alla somiglianza e restituisce i risultati più corrispondenti.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Perform semantic search</span>
results = client.search(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    data=[<span class="hljs-string">&#x27;How does Milvus handle semantic search?&#x27;</span>], <span class="hljs-comment"># Use text query rather than query vector</span>
    anns_field=<span class="hljs-string">&#x27;dense&#x27;</span>,   <span class="hljs-comment"># Use the vector field that stores embeddings</span>
    limit=<span class="hljs-number">1</span>,
    output_fields=[<span class="hljs-string">&#x27;document&#x27;</span>],
)

<span class="hljs-built_in">print</span>(results)
<button class="copy-code-btn"></button></code></pre>
<p>Per ulteriori informazioni sulle operazioni di ricerca e interrogazione, consultare <a href="/docs/it/single-vector-search.md">Ricerca vettoriale</a> e <a href="/docs/it/get-and-scalar-query.md">interrogazione</a> <a href="/docs/it/single-vector-search.md">di base</a>.</p>
