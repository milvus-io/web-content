---
id: embedding-function-overview.md
title: Panoramica della funzione di embeddingCompatible with Milvus 2.6.x
summary: >-
  Il modulo Function di Milvus consente di trasformare i dati di testo grezzi in
  embeddings vettoriali, chiamando automaticamente fornitori di modelli esterni
  (come OpenAI, AWS Bedrock, Google Vertex AI, ecc.). Con il modulo Function,
  non è più necessario interfacciarsi manualmente con le API di embedding:
  Milvus gestisce l'intero processo di invio delle richieste ai provider, la
  ricezione degli embedding e la loro memorizzazione nelle collezioni. Per la
  ricerca semantica, è necessario fornire solo i dati grezzi della query, non un
  vettore di query. Milvus genera il vettore di query con lo stesso modello
  utilizzato per l'ingestion, lo confronta con i vettori memorizzati e
  restituisce i risultati più rilevanti.
beta: Milvus 2.6.x
---
<h1 id="Embedding-Function-Overview" class="common-anchor-header">Panoramica della funzione di embedding<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Embedding-Function-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Il modulo Function di Milvus consente di trasformare i dati di testo grezzi in embedding vettoriali chiamando automaticamente fornitori di modelli esterni (come OpenAI, AWS Bedrock, Google Vertex AI, ecc.). Con il modulo Function, non è più necessario interfacciarsi manualmente con le API di embedding: Milvus gestisce l'intero processo di invio delle richieste ai provider, la ricezione degli embedding e la loro memorizzazione nelle collezioni. Per la ricerca semantica, è necessario fornire solo i dati grezzi della query, non un vettore di query. Milvus genera il vettore di query con lo stesso modello utilizzato per l'ingestion, lo confronta con i vettori memorizzati e restituisce i risultati più rilevanti.</p>
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
<li><p>Qualsiasi campo di input incorporato dal modulo Function deve sempre contenere un valore; se viene fornito un null, il modulo lancia un errore.</p></li>
<li><p>Il modulo Function elabora solo i campi definiti esplicitamente nello schema della collezione; non genera incorporazioni per campi dinamici.</p></li>
<li><p>I campi di input da incorporare devono essere del tipo <code translate="no">VARCHAR</code>.</p></li>
<li><p>Il modulo Function può incorporare un campo di input in:</p>
<ul>
<li><p><code translate="no">FLOAT_VECTOR</code></p></li>
<li><p><code translate="no">INT8_VECTOR</code></p></li>
</ul>
<p>Non sono supportate le conversioni in <code translate="no">BINARY_VECTOR</code>, <code translate="no">FLOAT16_VECTOR</code> o <code translate="no">BFLOAT16_VECTOR</code>.</p></li>
</ul>
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
    </button></h2><p>Il modulo Function trasforma il testo grezzo in incorporazioni vettoriali chiamando un fornitore esterno di modelli a scelta. I diversi fornitori supportano modelli, formati di incorporamento e metodi di autenticazione diversi, riassunti di seguito.</p>
<h3 id="Supported-model-providers" class="common-anchor-header">Fornitori di modelli supportati</h3><table>
   <tr>
     <th><p>Fornitore</p></th>
     <th><p>Modelli tipici</p></th>
     <th><p>Tipo di incorporamento</p></th>
     <th><p>Metodo di autenticazione</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/it/openai.md">OpenAI</a></p></td>
     <td><p>incorporazione del testo-3-*</p></td>
     <td><p>Denso (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Chiave API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/azure-openai.md">Azure OpenAI</a></p></td>
     <td><p>Basato sulla distribuzione</p></td>
     <td><p>Denso (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Chiave API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/dashscope.md">DashScope</a></p></td>
     <td><p>testo-embedding-v3</p></td>
     <td><p>Denso (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Chiave API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/bedrock.md">Bedrock</a></p></td>
     <td><p>amazon.titan-embed-text-v2</p></td>
     <td><p>Denso (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Coppia AK/SK</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/vertex-ai.md">Vertice AI</a></p></td>
     <td><p>testo-embedding-005</p></td>
     <td><p>Denso (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Conto di servizio GCP JSON</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/voyage-ai.md">Viaggio AI</a></p></td>
     <td><p>voyage-3, voyage-lite-02</p></td>
     <td><p>Denso (<code translate="no">FLOAT_VECTOR</code> / <code translate="no">INT8_VECTOR</code>)</p></td>
     <td><p>Chiave API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/cohere.md">Cohere</a></p></td>
     <td><p>embed-english-v3.0</p></td>
     <td><p>Denso (<code translate="no">FLOAT_VECTOR</code> / <code translate="no">INT8_VECTOR</code>)</p></td>
     <td><p>Chiave API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/siliconflow.md">SiliconFlow</a></p></td>
     <td><p>BAAI/bge-grande-zh-v1.5</p></td>
     <td><p>Denso (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Chiave API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/hugging-face-tei.md">Faccia da abbracciare</a></p></td>
     <td><p>Qualsiasi modello servito da TEI</p></td>
     <td><p>Denso (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Chiave API opzionale</p></td>
   </tr>
</table>
<h3 id="Workflow" class="common-anchor-header">Flusso di lavoro</h3><p>Il diagramma seguente mostra il funzionamento della funzione in Milvus.</p>
<ol>
<li><p><strong>Testo in ingresso</strong>: Gli utenti inseriscono in Milvus i dati grezzi (ad esempio, i documenti).</p></li>
<li><p><strong>Generazione di incorporazioni</strong>: Il modulo Function di Milvus chiama automaticamente il fornitore di modelli configurato per convertire i dati grezzi in embeddings vettoriali.</p></li>
<li><p><strong>Memorizzare gli embeddings</strong>: Gli embeddings risultanti vengono memorizzati in campi vettoriali esplicitamente definiti all'interno delle collezioni di Milvus.</p></li>
<li><p><strong>Interrogazione del testo</strong>: Gli utenti inviano query testuali a Milvus.</p></li>
<li><p><strong>Ricerca semantica</strong>: Milvus converte internamente le query in embeddings vettoriali, effettua ricerche di somiglianza con gli embeddings memorizzati e recupera i risultati rilevanti.</p></li>
<li><p><strong>Restituzione dei risultati</strong>: Milvus restituisce all'applicazione i risultati migliori.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/embedding-function-overview.png" alt="Embedding Function Overview" class="doc-image" id="embedding-function-overview" />
   </span> <span class="img-wrapper"> <span>Panoramica delle funzioni di embedding</span> </span></p>
<h3 id="Credential-management" class="common-anchor-header">Gestione delle credenziali</h3><p>La connessione alle API di incorporamento esterne richiede credenziali di autenticazione (chiavi API o coppie chiave di accesso/segreto). L'esposizione di queste credenziali nel codice dell'applicazione crea rischi per la sicurezza. Milvus risolve questo problema memorizzando le credenziali in modo sicuro nel file di configurazione di Milvus (<code translate="no">milvus.yaml</code>).</p>
<ol>
<li><p><strong>Aggiungere le credenziali</strong>: Sotto il blocco di primo livello <code translate="no">credential:</code>, assegnare a ogni credenziale un'etichetta unica; quindi puntare a tale etichetta nel blocco <code translate="no">function:</code>.</p></li>
<li><p>Il<strong>server carica la configurazione</strong>: Milvus legge il file YAML, memorizza le chiavi grezze e ricorda solo le loro etichette (ad esempio <code translate="no">apikey1</code>).</p></li>
<li><p><strong>Chiamare la funzione</strong>: Specificare facoltativamente l'argomento <code translate="no">credential</code>.</p>
<ul>
<li><p>Se si fornisce un nome di credenziale con la definizione della funzione, Milvus utilizza la credenziale specificata.</p></li>
<li><p>Se si omette l'argomento, Milvus ricorre automaticamente alla credenziale configurata per quel fornitore di modelli in <code translate="no">milvus.yaml</code>.</p>
<p>In ogni caso, la chiave segreta non lascia mai il server.</p></li>
</ul></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/credential-config-overflow.png" alt="Credential Config Overflow" class="doc-image" id="credential-config-overflow" />
   </span> <span class="img-wrapper"> <span>Overflow della configurazione delle credenziali</span> </span></p>
<div class="alert note">
<p>Se si distribuisce Milvus con Docker Compose, è possibile iniettare gli stessi campi attraverso le variabili d'ambiente. Per i nomi esatti delle variabili, fare riferimento alle guide specifiche dei provider.</p>
</div>
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
    </button></h2><p>Prima di usare una funzione di incorporamento con Milvus, configurate le credenziali di accesso.</p>
<h3 id="Step-1-Add-credentials-to-Milvus-configuration" class="common-anchor-header">Passo 1: Aggiungere le credenziali alla configurazione di Milvus</h3><p>Nel file <code translate="no">milvus.yaml</code>, modificare il blocco <code translate="no">credential</code> con le voci per ogni provider a cui si deve accedere:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml credential store section</span>
<span class="hljs-comment"># This section defines all your authentication credentials for external embedding providers</span>
<span class="hljs-comment"># Each credential gets a unique name (e.g., aksk1, apikey1) that you&#x27;ll reference elsewhere</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-comment"># For AWS Bedrock or services using access/secret key pairs</span>
  <span class="hljs-comment"># &#x27;aksk1&#x27; is just an example name - you can choose any meaningful identifier</span>
  <span class="hljs-attr">aksk1:</span>                       
    <span class="hljs-attr">access_key_id:</span> <span class="hljs-string">&lt;YOUR_AK&gt;</span>      
    <span class="hljs-attr">secret_access_key:</span> <span class="hljs-string">&lt;YOUR_SK&gt;</span>  
  
  <span class="hljs-comment"># For OpenAI, Voyage AI, or other API key-based services</span>
  <span class="hljs-comment"># &#x27;apikey1&#x27; is a custom name you choose to identify this credential  </span>
  <span class="hljs-attr">apikey1:</span>                     
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_API_KEY&gt;</span>        
  
  <span class="hljs-comment"># For Google Vertex AI using service account credentials</span>
  <span class="hljs-comment"># &#x27;gcp1&#x27; is an example name for your Google Cloud credentials</span>
  <span class="hljs-attr">gcp1:</span>                        
    <span class="hljs-attr">credential_json:</span> <span class="hljs-string">&lt;BASE64_OF_JSON&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Tipo di fornitore</p></th>
     <th><p>Campi richiesti</p></th>
     <th><p>Esempio di configurazione</p></th>
   </tr>
   <tr>
     <td><p>Coppia AK/SK (AWS Bedrock)</p></td>
     <td><p><code translate="no">access_key_id</code>, <code translate="no">secret_access_key</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     aksk1:    # custom label
         access_key_id: &lt;YOUR_AK&gt;
         secret_access_key: &lt;YOUR_SK&gt;
     ...
</code></pre></td>
   </tr>
   <tr>
     <td><p>Chiave API (OpenAI, Voyage AI, ecc.)</p></td>
     <td><p><code translate="no">apikey</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     apikey1:    # custom label
         apikey: &lt;YOUR_API_KEY&gt;
     ...
</code></pre></td>
   </tr>
   <tr>
     <td><p>GCP service-account JSON (Vertex AI)</p></td>
     <td><p><code translate="no">credential_json</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     gcp1:    # custom label
         credential_json: &lt;BASE64_OF_JSON&gt;
     ...
</code></pre></td>
   </tr>
</table>
<h3 id="Step-2-Configure-provider-settings" class="common-anchor-header">Passo 2: Configurare le impostazioni del provider</h3><p>Nello stesso file di configurazione, modificare il blocco <code translate="no">function</code> per indicare a Milvus quale chiave utilizzare per incorporare le chiamate al servizio:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">openai:</span>                         <span class="hljs-comment"># calls OpenAI</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey1</span>           <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-comment"># url: https://api.openai.com/v1/embeddings   # (optional) custom endpoint</span>

      <span class="hljs-attr">bedrock:</span>                        <span class="hljs-comment"># calls AWS Bedrock</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">aksk1</span>             <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-attr">region:</span> <span class="hljs-string">us-east-2</span>

      <span class="hljs-attr">vertexai:</span>                       <span class="hljs-comment"># calls Google Vertex AI</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">gcp1</span>              <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-comment"># url:                        # (optional) custom endpoint</span>

      <span class="hljs-attr">tei:</span>                            <span class="hljs-comment"># Built-in Tiny Embedding model</span>
        <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>                  <span class="hljs-comment"># Whether to enable TEI model service</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per ulteriori informazioni su come applicare la configurazione di Milvus, fare riferimento a <a href="/docs/it/dynamic_config.md">Configurare Milvus al volo</a>.</p>
<h2 id="Use-embedding-function" class="common-anchor-header">Utilizzare la funzione di incorporamento<button data-href="#Use-embedding-function" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta configurate le credenziali, seguite questi passaggi per definire e utilizzare le funzioni di incorporamento.</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">Passo 1: Definire i campi dello schema</h3><p>Per utilizzare una funzione di incorporamento, creare una raccolta con uno schema specifico. Questo schema deve includere almeno tre campi necessari:</p>
<ul>
<li><p>Il campo primario che identifica in modo univoco ogni entità della raccolta.</p></li>
<li><p>Un campo scalare che memorizza i dati grezzi da incorporare.</p></li>
<li><p>Un campo vettoriale riservato a memorizzare le incorporazioni vettoriali che la funzione genererà per il campo scalare.</p></li>
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
<span class="hljs-comment"># For instance, OpenAI&#x27;s text-embedding-3-small model outputs 1536-dimensional vectors.</span>
<span class="hljs-comment"># For dense vector, data type can be FLOAT_VECTOR or INT8_VECTOR</span>
<span class="hljs-comment"># For sparse vector, data type must be SPARSE_FLOAT_VECTOR</span>
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1536</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">Passo 2: Aggiungere la funzione di embedding allo schema</h3><p>Il modulo Function di Milvus converte automaticamente i dati grezzi memorizzati in un campo scalare in embedding e li memorizza nel campo vettoriale esplicitamente definito.</p>
<p>L'esempio seguente aggiunge un modulo Function (<code translate="no">openai_embedding</code>) che converte il campo scalare <code translate="no">&quot;document&quot;</code> in embedding, memorizzando i vettori risultanti nel campo vettoriale <code translate="no">&quot;dense&quot;</code> definito in precedenza.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function (example: OpenAI provider)</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;openai_embedding&quot;</span>,                        <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,       <span class="hljs-comment"># Type of embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],                 <span class="hljs-comment"># Scalar field to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],                   <span class="hljs-comment"># Vector field to store embeddings</span>
    params={                                        <span class="hljs-comment"># Provider-specific configuration (highest priority)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;openai&quot;</span>,                       <span class="hljs-comment"># Embedding model provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>,     <span class="hljs-comment"># Embedding model</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey1&quot;,                    # Optional: Credential label specified in milvus.yaml</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;dim&quot;: &quot;1536&quot;,                            # Optionally shorten the output vector dimension</span>
        <span class="hljs-comment"># &quot;user&quot;: &quot;user123&quot;                         # Optional: identifier for API tracking</span>
    }
)

<span class="hljs-comment"># Add the embedding function to your schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Esempio Valore</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Identificatore univoco della funzione di incorporamento all'interno di Milvus.</p></td>
     <td><p><code translate="no">"openai_embedding"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Tipo di funzione di embedding utilizzata. Valori possibili:</p>
<ul>
<li><p><code translate="no">FunctionType.TEXTEMBEDDING</code>: Genera vettori densi che catturano il significato semantico del testo.</p></li>
<li><p><code translate="no">FunctionType.BM25</code>: Genera vettori sparsi basati sull'algoritmo di classificazione BM25, che calcola i punteggi di rilevanza usando la frequenza dei termini e la frequenza inversa dei documenti. Per ulteriori informazioni, consultare la sezione <a href="/docs/it/full-text-search.md">Ricerca di testo completo</a>.</p></li>
</ul></td>
     <td><p><code translate="no">FunctionType.TEXTEMBEDDING</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Campo scalare contenente i dati grezzi da incorporare. Attualmente, questo parametro accetta solo un nome di campo.</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">output_field_names</code></p></td>
     <td><p>Campo vettoriale per memorizzare le incorporazioni generate. Attualmente, questo parametro accetta solo un nome di campo.</p></td>
     <td><p><code translate="no">["dense"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>Dizionario contenente le configurazioni di incorporamento. Nota: i parametri di <code translate="no">params</code> variano a seconda dei fornitori di modelli di incorporazione.</p></td>
     <td><p><code translate="no">{...}</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>Il fornitore del modello di incorporamento.</p></td>
     <td><p><code translate="no">"openai"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>Specifica quale modello di incorporamento utilizzare.</p></td>
     <td><p><code translate="no">"text-embedding-3-small"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">credential</code></p></td>
     <td><p>L'etichetta di una credenziale definita nella sezione di primo livello <code translate="no">credential:</code> di <code translate="no">milvus.yaml</code>. </p>
<ul>
<li><p>Se fornita, Milvus recupera la coppia di chiavi o il token API corrispondente e firma la richiesta sul lato server.</p></li>
<li><p>Se omesso (<code translate="no">None</code>), Milvus ricorre alla credenziale esplicitamente configurata per il fornitore del modello di destinazione in <code translate="no">milvus.yaml</code>.</p></li>
<li><p>Se l'etichetta è sconosciuta o la chiave di riferimento è mancante, la chiamata fallisce.</p></li>
</ul></td>
     <td><p><code translate="no">"apikey1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dim</code></p></td>
     <td><p>Il numero di dimensioni per gli embeddings in uscita. Per i modelli di terza generazione di OpenAI, è possibile accorciare il vettore completo per ridurre i costi e la latenza senza una perdita significativa di informazioni semantiche. Per ulteriori informazioni, consultare il <a href="https://openai.com/blog/new-embedding-models-and-api-updates">post di annuncio di OpenAI</a>. <strong>Nota:</strong> se si accorcia la dimensione del vettore, assicurarsi che il valore <code translate="no">dim</code> specificato nel metodo <code translate="no">add_field</code> dello schema per il campo vettoriale corrisponda alla dimensione finale di uscita della funzione di embedding.</p></td>
     <td><p><code translate="no">"1536"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">user</code></p></td>
     <td><p>Un identificatore a livello utente per tracciare l'uso dell'API.</p></td>
     <td><p><code translate="no">"user123"</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>Per le raccolte con più campi scalari che richiedono la conversione da testo a vettore, aggiungere funzioni separate allo schema della raccolta, assicurandosi che ogni funzione abbia un nome unico e un valore <code translate="no">output_field_names</code>.</p>
</div>
<h3 id="Step-3-Configure-index" class="common-anchor-header">Passo 3: Configurare l'indice</h3><p>Dopo aver definito lo schema con i campi necessari e la funzione incorporata, impostare l'indice per la raccolta. Per semplificare questo processo, utilizzare <code translate="no">AUTOINDEX</code> come <code translate="no">index_type</code>, un'opzione che consente a Milvus di scegliere e configurare il tipo di indice più adatto in base alla struttura dei dati.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add AUTOINDEX to automatically select optimal indexing method</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span> 
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-4-Create-collection" class="common-anchor-header">Passo 4: Creare la collezione</h3><p>Creare ora la collezione utilizzando lo schema e i parametri dell'indice definiti.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create collection named &quot;demo&quot;</span>
client.create_collection(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    schema=schema, 
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-5-Insert-data" class="common-anchor-header">Passo 5: Inserire i dati</h3><p>Dopo aver configurato la raccolta e l'indice, si è pronti a inserire i dati grezzi. In questo processo, è sufficiente fornire il testo grezzo. Il modulo Function, definito in precedenza, genera automaticamente il vettore sparse corrispondente per ogni voce di testo.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert sample documents</span>
client.insert(<span class="hljs-string">&#x27;demo&#x27;</span>, [
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Milvus simplifies semantic search through embeddings.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Vector embeddings convert text into searchable numeric data.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Semantic search helps users find relevant information quickly.&#x27;</span>},
])
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-6-Perform-vector-search" class="common-anchor-header">Passo 6: Eseguire la ricerca vettoriale</h3><p>Dopo l'inserimento dei dati, è possibile eseguire una ricerca semantica utilizzando il testo grezzo della query. Milvus converte automaticamente la query in un vettore di incorporamento, recupera i documenti pertinenti in base alla somiglianza e restituisce i risultati più corrispondenti.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Perform semantic search</span>
results = client.search(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    data=[<span class="hljs-string">&#x27;How does Milvus handle semantic search?&#x27;</span>], <span class="hljs-comment"># Use text query rather than query vector</span>
    anns_field=<span class="hljs-string">&#x27;dense&#x27;</span>,   <span class="hljs-comment"># Use the vector field that stores embeddings</span>
    limit=<span class="hljs-number">1</span>,
    output_fields=[<span class="hljs-string">&#x27;document&#x27;</span>],
)

<span class="hljs-built_in">print</span>(results)

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: 1, &#x27;distance&#x27;: 0.8821347951889038, &#x27;entity&#x27;: {&#x27;document&#x27;: &#x27;Milvus simplifies semantic search through embeddings.&#x27;}}]&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per ulteriori informazioni sulle operazioni di ricerca e interrogazione, consultare <a href="/docs/it/single-vector-search.md">Ricerca vettoriale</a> e <a href="/docs/it/get-and-scalar-query.md">interrogazione</a> <a href="/docs/it/single-vector-search.md">di base</a>.</p>
