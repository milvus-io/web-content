---
id: embedding-function-overview.md
title: Panoramica sulla funzione di embeddingCompatible with Milvus 2.6.x
summary: >-
  Il modulo Function di Milvus consente di trasformare dati testuali grezzi in
  rappresentazioni vettoriali richiamando automaticamente fornitori di servizi
  di embedding esterni (come OpenAI, AWS Bedrock, Google Vertex AI, ecc.). Con
  il modulo Function, non è più necessario interfacciarsi manualmente con le API
  di embedding: Milvus gestisce l’intero processo di invio delle richieste ai
  provider, ricezione degli embedding e archiviazione delle stesse nelle tue
  collezioni. Per la ricerca semantica, è sufficiente fornire i dati grezzi
  della query, non un vettore di query. Milvus genera il vettore di query
  utilizzando lo stesso modello impiegato per l’acquisizione, lo confronta con i
  vettori memorizzati e restituisce i risultati più pertinenti.
beta: Milvus 2.6.x
---
<h1 id="Embedding-Function-Overview" class="common-anchor-header">Panoramica sulla funzione di embedding<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Embedding-Function-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Il modulo Funzione di Milvus consente di trasformare dati testuali grezzi in embedding vettoriali richiamando automaticamente fornitori di servizi di embedding esterni (come OpenAI, AWS Bedrock, Google Vertex AI, ecc.). Con il modulo Funzioni, non è più necessario interfacciarsi manualmente con le API di embedding: Milvus gestisce l’intero processo di invio delle richieste ai fornitori, ricezione degli embedding e archiviazione nelle collezioni dell’utente. Per la ricerca semantica, è sufficiente fornire i dati grezzi della query, non un vettore di query. Milvus genera il vettore di query utilizzando lo stesso modello impiegato per l’acquisizione, lo confronta con i vettori memorizzati e restituisce i risultati più pertinenti.</p>
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
<li><p>Qualsiasi campo di input che il modulo Function deve incorporare deve sempre contenere un valore; se viene fornito un valore nullo, il modulo genererà un errore.</p></li>
<li><p>Il modulo Function elabora solo i campi definiti esplicitamente nello schema della collezione; non genera embedding per i campi dinamici.</p></li>
<li><p>I campi di input da incorporare devono essere di tipo " <code translate="no">VARCHAR</code> ".</p></li>
<li><p>Il modulo Funzione può incorporare un campo di input per:</p>
<ul>
<li><p><code translate="no">FLOAT_VECTOR</code></p></li>
<li><p><code translate="no">INT8_VECTOR</code></p></li>
</ul>
<p>Le conversioni in <code translate="no">BINARY_VECTOR</code>, <code translate="no">FLOAT16_VECTOR</code> o <code translate="no">BFLOAT16_VECTOR</code> non sono supportate.</p></li>
</ul>
<h2 id="Supported-embedding-service-providers" class="common-anchor-header">Fornitori di servizi di incorporamento supportati<button data-href="#Supported-embedding-service-providers" class="anchor-icon" translate="no">
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
   <tr>
     <th><p>Fornitore</p></th>
     <th><p>Modelli tipici</p></th>
     <th><p>Tipo di integrazione</p></th>
     <th><p>Metodo di autenticazione</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/it/openai.md">OpenAI</a></p></td>
     <td><p>text-embedding-3-*</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>Chiave API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/azure-openai.md">Azure OpenAI</a></p></td>
     <td><p>Basata sulla distribuzione</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>Chiave API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/dashscope.md">DashScope</a></p></td>
     <td><p>text-embedding-v3</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>Chiave API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/yandex-cloud.md">Yandex Cloud</a></p></td>
     <td><p>Yandex Cloud AI Studio - Modelli di vettorializzazione del testo</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>Chiave API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/bedrock.md">Bedrock</a></p></td>
     <td><p>amazon.titan-embed-text-v2</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>Coppia AK/SK</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/vertex-ai.md">Vertex AI</a></p></td>
     <td><p>text-embedding-005</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>Credenziali JSON dell'account di servizio GCP</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/voyage-ai.md">Voyage AI</a></p></td>
     <td><p>voyage-3, voyage-lite-02</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code> / <code translate="no">INT8_VECTOR</code></p></td>
     <td><p>Chiave API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/cohere.md">Cohere</a></p></td>
     <td><p>embed-english-v3.0</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code> / <code translate="no">INT8_VECTOR</code></p></td>
     <td><p>Chiave API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/siliconflow.md">SiliconFlow</a></p></td>
     <td><p>BAAI/bge-large-zh-v1.5</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>Chiave API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/hugging-face-tei.md">Hugging Face TEI</a></p></td>
     <td><p>Qualsiasi modello fornito da TEI</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>Chiave API facoltativa</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/hugging-face.md">Hugging Face</a></p></td>
     <td><p>Modelli forniti tramite <code translate="no">hf-inference</code> per l'estrazione delle caratteristiche</p></td>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>Chiave API</p></td>
   </tr>
</table>
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
    </button></h2><p>Il diagramma seguente illustra il funzionamento della funzione in Milvus.</p>
<ol>
<li><p><strong>Testo di input</strong>: gli utenti inseriscono i dati grezzi (ad es. documenti) in Milvus.</p></li>
<li><p><strong>Generazione degli embedding</strong>: il modulo della Funzione all’interno di Milvus richiama automaticamente il provider del modello configurato per convertire i dati grezzi in embedding vettoriali.</p></li>
<li><p><strong>Archiviazione degli embedding</strong>: gli embedding risultanti vengono archiviati in campi vettoriali definiti esplicitamente all’interno delle collezioni di Milvus.</p></li>
<li><p><strong>Testo della query</strong>: gli utenti inviano query di testo a Milvus.</p></li>
<li><p><strong>Ricerca semantica</strong>: Milvus converte internamente le query in embedding vettoriali, esegue ricerche di similarità rispetto agli embedding memorizzati e recupera i risultati pertinenti.</p></li>
<li><p><strong>Restituzione dei risultati</strong>: Milvus restituisce all’applicazione i risultati più pertinenti.</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/embedding-function-overview.png" alt="Embedding Function Overview" class="doc-image" id="embedding-function-overview" /> 
   <span>Panoramica della funzione di embedding</span>
  
 </span></p>
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
    </button></h2><p>Prima di utilizzare una funzione di embedding con Milvus, è necessario configurare le credenziali del servizio di embedding per l'accesso a Milvus.</p>
<p>Milvus consente di fornire le credenziali del servizio di embedding in due modi:</p>
<ul>
<li><p><strong>File di configurazione</strong> (<code translate="no">milvus.yaml</code>):</p>
<p>L'esempio in questo argomento illustra la <strong>configurazione consigliata</strong> utilizzando <code translate="no">milvus.yaml</code>.</p></li>
<li><p><strong>Variabili d’ambiente</strong>:</p>
<p>Per ulteriori dettagli sulla configurazione delle credenziali tramite variabili d’ambiente, consultare la documentazione del fornitore del servizio di embedding (ad esempio, <a href="/docs/it/openai.md">OpenAI</a> o <a href="/docs/it/azure-openai.md">Azure OpenAI</a>).</p></li>
</ul>
<p>Il diagramma seguente illustra il processo di configurazione delle credenziali tramite il file di configurazione di Milvus (<code translate="no">milvus.yaml</code>) e la successiva chiamata alla funzione all’interno di Milvus.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/credential-config-overflow.png" alt="Credential Config Overflow" class="doc-image" id="credential-config-overflow" /> 
   <span>Configurazione delle credenziali in Overflow</span>
  
 </span></p>
<h3 id="Step-1-Add-credentials-to-Milvus-configuration-file" class="common-anchor-header">Passaggio 1: aggiungere le credenziali al file di configurazione di Milvus<button data-href="#Step-1-Add-credentials-to-Milvus-configuration-file" class="anchor-icon" translate="no">
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
    </button></h3><p>Nel file <code translate="no">milvus.yaml</code>, modificare il blocco <code translate="no">credential</code> inserendo le voci relative a ciascun provider a cui è necessario accedere:</p>
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
<h3 id="Step-2-Configure-provider-settings" class="common-anchor-header">Passaggio 2: Configurare le impostazioni del provider<button data-href="#Step-2-Configure-provider-settings" class="anchor-icon" translate="no">
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
    </button></h3><p>Nello stesso file di configurazione (<code translate="no">milvus.yaml</code>), modifica il blocco <code translate="no">function</code> per indicare a Milvus quale chiave utilizzare per incorporare le chiamate al servizio:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">openai:</span>                         <span class="hljs-comment"># calls OpenAI</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey1</span>           <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-comment"># url:                        # (optional) custom url</span>

      <span class="hljs-attr">bedrock:</span>                        <span class="hljs-comment"># calls AWS Bedrock</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">aksk1</span>             <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-attr">region:</span> <span class="hljs-string">us-east-2</span>

      <span class="hljs-attr">vertexai:</span>                       <span class="hljs-comment"># calls Google Vertex AI</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">gcp1</span>              <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-comment"># url:                        # (optional) custom url</span>

      <span class="hljs-attr">tei:</span>                            <span class="hljs-comment"># Built-in Tiny Embedding model</span>
        <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>                  <span class="hljs-comment"># Whether to enable TEI model service</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per ulteriori informazioni su come applicare la configurazione di Milvus, consultare <a href="/docs/it/dynamic_config.md">Configurare Milvus al volo</a>.</p>
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
    </button></h2><p>Una volta configurate le credenziali nel file di configurazione di Milvus, segui questi passaggi per definire e utilizzare le funzioni di incorporamento.</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">Passaggio 1: definire i campi dello schema<button data-href="#Step-1-Define-schema-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Per utilizzare una funzione di embedding, creare una collezione con uno schema specifico. Questo schema deve includere almeno tre campi obbligatori:</p>
<ul>
<li><p><strong>Il campo primario</strong> che identifica in modo univoco ogni entità in una collezione.</p></li>
<li><p>Un <strong>campo scalare</strong> che memorizza i dati grezzi da incorporare.</p></li>
<li><p>Un <strong>campo vettoriale</strong> riservato alla memorizzazione delle rappresentazioni vettoriali che la funzione genererà per il campo scalare.</p></li>
</ul>
<p>L'esempio seguente definisce uno schema con un campo scalare <code translate="no">&quot;document&quot;</code> per memorizzare dati testuali e un campo vettoriale <code translate="no">&quot;dense&quot;</code> per memorizzare gli embedding che saranno generati dal modulo Function. Ricordarsi di impostare la dimensione vettoriale (<code translate="no">dim</code>) in modo che corrisponda all'output del modello di embedding scelto.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
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
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1536</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-comment">// Initialize Milvus client</span>
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-comment">// Create a new schema for the collection</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

<span class="hljs-comment">// Add primary field &quot;id&quot;</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">false</span>)
        .build());

<span class="hljs-comment">// Add scalar field &quot;document&quot; for storing textual data</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;document&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">9000</span>)
        .build());

<span class="hljs-comment">// Add vector field &quot;dense&quot; for storing embeddings.</span>
<span class="hljs-comment">// IMPORTANT: Set dimension to match the exact output dimension of the embedding model.</span>
<span class="hljs-comment">// For instance, OpenAI&#x27;s text-embedding-3-small model outputs 1536-dimensional vectors.</span>
<span class="hljs-comment">// For dense vector, data type can be FloatVector or Int8Vector</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;dense&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">1536</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// Initialize Milvus client</span>
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
    <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
});

<span class="hljs-comment">// Define the fields of the collection schema</span>
<span class="hljs-keyword">const</span> schema = [
    <span class="hljs-comment">// Primary field &quot;id&quot;</span>
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>,
    },
    <span class="hljs-comment">// Scalar field &quot;document&quot; for storing textual data</span>
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;document&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">9000</span>,
    },
    <span class="hljs-comment">// Vector field &quot;dense&quot; for storing embeddings.</span>
    <span class="hljs-comment">// IMPORTANT: Set dim to match the exact output dimension of the embedding model.</span>
    <span class="hljs-comment">// For instance, OpenAI&#x27;s text-embedding-3-small model outputs 1536-dimensional vectors.</span>
    <span class="hljs-comment">// For dense vector, data type can be FloatVector or Int8Vector</span>
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;dense&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">1536</span>,
    },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<span class="hljs-keyword">defer</span> cli.Close(ctx)

schema := entity.NewSchema().
    WithName(<span class="hljs-string">&quot;demo&quot;</span>).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;id&quot;</span>).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(<span class="hljs-literal">true</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;document&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">9000</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;dense&quot;</span>).WithDataType(entity.FieldTypeFloatVector).WithDim(<span class="hljs-number">1536</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
    &quot;autoID&quot;: false,
    &quot;enableDynamicField&quot;: false,
    &quot;fields&quot;: [
        {
            &quot;fieldName&quot;: &quot;id&quot;,
            &quot;dataType&quot;: &quot;Int64&quot;,
            &quot;isPrimary&quot;: true
        },
        {
            &quot;fieldName&quot;: &quot;document&quot;,
            &quot;dataType&quot;: &quot;VarChar&quot;,
            &quot;elementTypeParams&quot;: {
                &quot;max_length&quot;: 9000
            }
        },
        {
            &quot;fieldName&quot;: &quot;dense&quot;,
            &quot;dataType&quot;: &quot;FloatVector&quot;,
            &quot;elementTypeParams&quot;: {
                &quot;dim&quot;: 1536
            }
        }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">Passaggio 2: Aggiungere la funzione di embedding allo schema<button data-href="#Step-2-Add-embedding-function-to-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>Il modulo Function in Milvus converte automaticamente i dati grezzi memorizzati in un campo scalare in embedding e li memorizza nel campo vettoriale definito esplicitamente.</p>
<p>L’esempio riportato di seguito aggiunge un modulo Function (<code translate="no">openai_embedding</code>) che converte il campo scalare <code translate="no">&quot;document&quot;</code> in embedding, memorizzando i vettori risultanti nel campo vettoriale <code translate="no">&quot;dense&quot;</code> definito in precedenza.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function (example: OpenAI provider)</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;openai_embedding&quot;</span>,                  <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING, <span class="hljs-comment"># Type of embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],           <span class="hljs-comment"># Scalar field to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],             <span class="hljs-comment"># Vector field to store embeddings</span>
    params={                                  <span class="hljs-comment"># Provider-specific configuration (highest priority)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;openai&quot;</span>,                 <span class="hljs-comment"># Embedding model provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>,     <span class="hljs-comment"># Embedding model</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey1&quot;,            # Optional: Credential label</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;dim&quot;: &quot;1536&quot;,       # Optionally shorten the vector dimension</span>
        <span class="hljs-comment"># &quot;user&quot;: &quot;user123&quot;    # Optional: identifier for API tracking</span>
    }
)

<span class="hljs-comment"># Add the embedding function to your schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

<span class="hljs-comment">// Define embedding function (example: OpenAI provider)</span>
<span class="hljs-type">Function</span> <span class="hljs-variable">textEmbeddingFunction</span> <span class="hljs-operator">=</span> Function.builder()
        .name(<span class="hljs-string">&quot;openai_embedding&quot;</span>)                                <span class="hljs-comment">// Unique identifier for this embedding function</span>
        .functionType(FunctionType.TEXTEMBEDDING)                <span class="hljs-comment">// Type of embedding function</span>
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;document&quot;</span>))  <span class="hljs-comment">// Scalar field to embed</span>
        .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;dense&quot;</span>))    <span class="hljs-comment">// Vector field to store embeddings</span>
        <span class="hljs-comment">// Provider-specific configuration (highest priority)</span>
        .param(<span class="hljs-string">&quot;provider&quot;</span>, <span class="hljs-string">&quot;openai&quot;</span>)                             <span class="hljs-comment">// Embedding model provider</span>
        .param(<span class="hljs-string">&quot;model_name&quot;</span>, <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>)           <span class="hljs-comment">// Embedding model</span>
        <span class="hljs-comment">// .param(&quot;credential&quot;, &quot;apikey1&quot;)                       // Optional: Credential label</span>
        <span class="hljs-comment">// Optional parameters:</span>
        <span class="hljs-comment">// .param(&quot;dim&quot;, &quot;1536&quot;)                                 // Optionally shorten the vector dimension</span>
        <span class="hljs-comment">// .param(&quot;user&quot;, &quot;user123&quot;)                             // Optional: identifier for API tracking</span>
        .build();

<span class="hljs-comment">// Add the embedding function to your schema</span>
schema.addFunction(textEmbeddingFunction);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">FunctionType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// Define embedding function (example: OpenAI provider)</span>
<span class="hljs-comment">// Pass these functions to createCollection() together with the schema fields</span>
<span class="hljs-keyword">const</span> functions = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;openai_embedding&quot;</span>,                 <span class="hljs-comment">// Unique identifier for this embedding function</span>
        <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">TEXTEMBEDDING</span>,         <span class="hljs-comment">// Type of embedding function</span>
        <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&quot;document&quot;</span>],          <span class="hljs-comment">// Scalar field to embed</span>
        <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&quot;dense&quot;</span>],            <span class="hljs-comment">// Vector field to store embeddings</span>
        <span class="hljs-attr">params</span>: {                                 <span class="hljs-comment">// Provider-specific configuration (highest priority)</span>
            <span class="hljs-attr">provider</span>: <span class="hljs-string">&quot;openai&quot;</span>,                   <span class="hljs-comment">// Embedding model provider</span>
            <span class="hljs-attr">model_name</span>: <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>, <span class="hljs-comment">// Embedding model</span>
            <span class="hljs-comment">// credential: &quot;apikey1&quot;,             // Optional: Credential label</span>
            <span class="hljs-comment">// Optional parameters:</span>
            <span class="hljs-comment">// dim: &quot;1536&quot;,                       // Optionally shorten the vector dimension</span>
            <span class="hljs-comment">// user: &quot;user123&quot;,                   // Optional: identifier for API tracking</span>
        },
    },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

embeddingFunction := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;openai_embedding&quot;</span>).
    WithType(entity.FunctionTypeTextEmbedding).
    WithInputFields(<span class="hljs-string">&quot;document&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;dense&quot;</span>).
    WithParam(<span class="hljs-string">&quot;provider&quot;</span>, <span class="hljs-string">&quot;openai&quot;</span>).
    WithParam(<span class="hljs-string">&quot;model_name&quot;</span>, <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>)

schema.WithFunction(embeddingFunction)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> embeddingFunction=<span class="hljs-string">&#x27;{
    &quot;name&quot;: &quot;openai_embedding&quot;,
    &quot;type&quot;: &quot;TextEmbedding&quot;,
    &quot;inputFieldNames&quot;: [
        &quot;document&quot;
    ],
    &quot;outputFieldNames&quot;: [
        &quot;dense&quot;
    ],
    &quot;params&quot;: {
        &quot;provider&quot;: &quot;openai&quot;,
        &quot;model_name&quot;: &quot;text-embedding-3-small&quot;
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parametro</p></th>
     <th><p>Descrizione</p></th>
     <th><p>Valore di esempio</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Identificatore univoco della funzione di embedding all’interno di Milvus.</p></td>
     <td><p><code translate="no">"openai_embedding"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Tipo di funzione utilizzata. Per l'embedding di testo, impostare il valore su <code translate="no">FunctionType.TEXTEMBEDDING</code>.</p><p><strong>Nota</strong>: Milvus accetta <code translate="no">FunctionType.BM25</code> (per la trasformazione di embedding sparsa) e <code translate="no">FunctionType.RERANK</code> (per il reranking) per questo parametro. Per ulteriori dettagli, consultare <a href="/docs/it/decay-ranker-overview.md">la panoramica</a> <a href="/docs/it/full-text-search.md">sulla ricerca full-text</a> e <a href="/docs/it/decay-ranker-overview.md">sul Decay Ranker</a>.</p></td>
     <td><p><code translate="no">FunctionType.TEXTEMBEDDING</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Campo scalare contenente i dati grezzi da incorporare. Attualmente, questo parametro accetta solo un nome di campo.</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">output_field_names</code></p></td>
     <td><p>Campo vettoriale per la memorizzazione degli embedding generati. Attualmente, questo parametro accetta un solo nome di campo.</p></td>
     <td><p><code translate="no">["dense"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>Dizionario contenente le configurazioni di embedding. Nota: i parametri all’interno di <code translate="no">params</code> variano a seconda dei provider del modello di embedding.</p></td>
     <td><p><code translate="no">{...}</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>Il fornitore del modello di embedding.</p></td>
     <td><p><code translate="no">"openai"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>Specifica quale modello di embedding utilizzare.</p></td>
     <td><p><code translate="no">"text-embedding-3-small"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">credential</code></p></td>
     <td><p>L'etichetta di una credenziale definita nella sezione di primo livello <code translate="no">credential:</code> del sito <code translate="no">milvus.yaml</code>. </p><ul><li><p>Se fornita, Milvus recupera la coppia di chiavi o il token API corrispondente e firma la richiesta sul lato server.</p></li><li><p>Se omessa (<code translate="no">None</code>), Milvus ricorre alle credenziali configurate esplicitamente per il fornitore del modello di destinazione in <code translate="no">milvus.yaml</code>.</p></li><li><p>Se l’etichetta è sconosciuta o la chiave a cui si fa riferimento manca, la chiamata fallisce.</p></li></ul></td>
     <td><p><code translate="no">"apikey1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dim</code></p></td>
     <td><p>Il numero di dimensioni per gli embedding in uscita. Per i modelli di terza generazione di OpenAI, è possibile accorciare il vettore completo per ridurre i costi e la latenza senza una perdita significativa di informazioni semantiche. Per ulteriori informazioni, consultare <a href="https://openai.com/blog/new-embedding-models-and-api-updates">il post sul blog di OpenAI dedicato all'annuncio</a>.</p><p><strong>Nota:</strong> se si riduce la dimensione del vettore, assicurarsi che il valore di " <code translate="no">dim</code> " specificato nel metodo ` <code translate="no">add_field</code> ` dello schema per il campo vettoriale corrisponda alla dimensione di output finale della funzione di embedding.</p></td>
     <td><p><code translate="no">"1536"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">user</code></p></td>
     <td><p>Un identificatore a livello di utente per il monitoraggio dell’utilizzo dell’API.</p></td>
     <td><p><code translate="no">"user123"</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>Per le collezioni con più campi scalari che richiedono la conversione da testo a vettore, aggiungere funzioni separate allo schema della collezione, assicurandosi che ogni funzione abbia un nome e un valore <code translate="no">output_field_names</code> univoci.</p>
</div>
<h3 id="Step-3-Configure-index" class="common-anchor-header">Passaggio 3: configurare l’indice<button data-href="#Step-3-Configure-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Dopo aver definito lo schema con i campi necessari e la funzione integrata, configurare l’indice per la propria collezione. Per semplificare questo processo, utilizzare l’opzione “ <code translate="no">AUTOINDEX</code> ” come “ <code translate="no">index_type</code> ”, che consente a Milvus di scegliere e configurare il tipo di indice più adatto in base alla struttura dei dati.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add AUTOINDEX to automatically select optimal indexing method</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span> 
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

<span class="hljs-comment">// Prepare index parameters</span>
List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();

<span class="hljs-comment">// Add AUTOINDEX to automatically select optimal indexing method</span>
indexes.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;dense&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">IndexType</span>, <span class="hljs-title class_">MetricType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">// Prepare index parameters</span>
<span class="hljs-comment">// Add AUTOINDEX to automatically select optimal indexing method</span>
<span class="hljs-keyword">const</span> index_params = [
    {
        <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;dense&quot;</span>,
        <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,
        <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">COSINE</span>,
    },
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>

indexOption := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;demo&quot;</span>, <span class="hljs-string">&quot;dense&quot;</span>, index.NewAutoIndex(entity.COSINE))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
    {
        &quot;fieldName&quot;: &quot;dense&quot;,
        &quot;indexName&quot;: &quot;dense&quot;,
        &quot;metricType&quot;: &quot;COSINE&quot;,
        &quot;indexType&quot;: &quot;AUTOINDEX&quot;
    }
]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-4-Create-collection" class="common-anchor-header">Passaggio 4: Creazione della collezione<button data-href="#Step-4-Create-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Ora crea la collezione utilizzando lo schema e i parametri di indicizzazione definiti.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create collection named &quot;demo&quot;</span>
client.create_collection(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    schema=schema, 
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Create collection named &quot;demo&quot;</span>
client.createCollection(CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo&quot;</span>)
        .collectionSchema(schema)
        .indexParams(indexes)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Create collection named &quot;demo&quot;</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;demo&quot;</span>,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-attr">functions</span>: functions,
    <span class="hljs-attr">index_params</span>: index_params,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;demo&quot;</span>, schema).
    WithIndexOptions(indexOption))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

loadTask, err := cli.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(<span class="hljs-string">&quot;demo&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<span class="hljs-keyword">if</span> err = loadTask.Await(ctx); err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

request=$(jq -n --argjson schema <span class="hljs-string">&quot;<span class="hljs-variable">$schema</span>&quot;</span> --argjson fn <span class="hljs-string">&quot;<span class="hljs-variable">$embeddingFunction</span>&quot;</span> --argjson indexParams <span class="hljs-string">&quot;<span class="hljs-variable">$indexParams</span>&quot;</span> <span class="hljs-string">&#x27;{
    collectionName: &quot;demo&quot;,
    schema: ($schema + {functions: [$fn]}),
    indexParams: $indexParams
}&#x27;</span>)

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;<span class="hljs-variable">$request</span>&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/load&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;demo&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-5-Insert-data" class="common-anchor-header">Passaggio 5: Inserire i dati<button data-href="#Step-5-Insert-data" class="anchor-icon" translate="no">
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
    </button></h3><p>Dopo aver configurato la collezione e l’indice, sei pronto per inserire i dati grezzi. In questa fase, devi solo fornire il testo grezzo. Il modulo Function che abbiamo definito in precedenza genera automaticamente il vettore sparso corrispondente per ogni voce di testo.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert sample documents</span>
client.insert(<span class="hljs-string">&#x27;demo&#x27;</span>, [
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Milvus simplifies semantic search through embeddings.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Vector embeddings convert text into searchable numeric data.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Semantic search helps users find relevant information quickly.&#x27;</span>},
])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;

<span class="hljs-comment">// Insert sample documents</span>
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
List&lt;JsonObject&gt; rows = Arrays.asList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 1, \&quot;document\&quot;: \&quot;Milvus simplifies semantic search through embeddings.\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 2, \&quot;document\&quot;: \&quot;Vector embeddings convert text into searchable numeric data.\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 3, \&quot;document\&quot;: \&quot;Semantic search helps users find relevant information quickly.\&quot;}&quot;</span>, JsonObject.class)
);

client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo&quot;</span>)
        .data(rows)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Insert sample documents</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;demo&quot;</span>,
    <span class="hljs-attr">data</span>: [
        { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">document</span>: <span class="hljs-string">&quot;Milvus simplifies semantic search through embeddings.&quot;</span> },
        { <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">document</span>: <span class="hljs-string">&quot;Vector embeddings convert text into searchable numeric data.&quot;</span> },
        { <span class="hljs-attr">id</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">document</span>: <span class="hljs-string">&quot;Semantic search helps users find relevant information quickly.&quot;</span> },
    ],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/column&quot;</span>

_, err = cli.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;demo&quot;</span>).
    WithColumns(
        column.NewColumnInt64(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>}),
        column.NewColumnVarChar(<span class="hljs-string">&quot;document&quot;</span>, []<span class="hljs-type">string</span>{
            <span class="hljs-string">&quot;Milvus simplifies semantic search through embeddings.&quot;</span>,
            <span class="hljs-string">&quot;Vector embeddings convert text into searchable numeric data.&quot;</span>,
            <span class="hljs-string">&quot;Semantic search helps users find relevant information quickly.&quot;</span>,
        }),
    ))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;demo&quot;,
    &quot;data&quot;: [
        {&quot;id&quot;: 1, &quot;document&quot;: &quot;Milvus simplifies semantic search through embeddings.&quot;},
        {&quot;id&quot;: 2, &quot;document&quot;: &quot;Vector embeddings convert text into searchable numeric data.&quot;},
        {&quot;id&quot;: 3, &quot;document&quot;: &quot;Semantic search helps users find relevant information quickly.&quot;}
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-6-Perform-vector-search" class="common-anchor-header">Passaggio 6: Eseguire la ricerca vettoriale<button data-href="#Step-6-Perform-vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Dopo l’inserimento dei dati, esegui una ricerca semantica utilizzando il testo grezzo della query. Milvus converte automaticamente la tua query in un vettore di embedding, recupera i documenti pertinenti in base alla somiglianza e restituisce i risultati più pertinenti.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="hljs-comment">// Perform semantic search</span>
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">results</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;How does Milvus handle semantic search?&quot;</span>))) <span class="hljs-comment">// Use text query rather than query vector</span>
        .annsField(<span class="hljs-string">&quot;dense&quot;</span>)   <span class="hljs-comment">// Use the vector field that stores embeddings</span>
        .limit(<span class="hljs-number">1</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;document&quot;</span>))
        .build());

System.out.println(results.getSearchResults());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Perform semantic search</span>
<span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;demo&quot;</span>,
    <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;How does Milvus handle semantic search?&quot;</span>], <span class="hljs-comment">// Use text query rather than query vector</span>
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;dense&quot;</span>,   <span class="hljs-comment">// Use the vector field that stores embeddings</span>
    <span class="hljs-attr">limit</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;document&quot;</span>],
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(results.<span class="hljs-property">results</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;demo&quot;</span>,
    <span class="hljs-number">1</span>,
    []entity.Vector{entity.Text(<span class="hljs-string">&quot;How does Milvus handle semantic search?&quot;</span>)},
).WithANNSField(<span class="hljs-string">&quot;dense&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;document&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

<span class="hljs-keyword">for</span> _, rs := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, rs.IDs)
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, rs.Scores)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;demo&quot;,
    &quot;data&quot;: [&quot;How does Milvus handle semantic search?&quot;],
    &quot;annsField&quot;: &quot;dense&quot;,
    &quot;limit&quot;: 1,
    &quot;outputFields&quot;: [&quot;document&quot;]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per ulteriori informazioni sulle operazioni di ricerca e di query, consultare <a href="/docs/it/single-vector-search.md">Ricerca vettoriale di base</a> e <a href="/docs/it/get-and-scalar-query.md">query</a>.</p>
<h2 id="FAQ" class="common-anchor-header">Domande frequenti<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Whats-the-difference-between-configuring-credentials-in-milvusyaml-vs-environment-variables" class="common-anchor-header">Qual è la differenza tra la configurazione delle credenziali nel file milvus.yaml e quella tramite variabili d’ambiente?<button data-href="#Whats-the-difference-between-configuring-credentials-in-milvusyaml-vs-environment-variables" class="anchor-icon" translate="no">
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
    </button></h3><p>Entrambi i metodi funzionano, ma l’uso di ` <code translate="no">milvus.yaml</code> ` è l’approccio consigliato in quanto garantisce una gestione centralizzata delle credenziali e una denominazione coerente delle stesse per tutti i provider. Quando si utilizzano le variabili d’ambiente, i nomi delle variabili variano a seconda del provider del servizio di embedding; si consiglia quindi di consultare la pagina dedicata di ciascun provider per comprendere i nomi specifici delle variabili d’ambiente richiesti (ad esempio, <a href="/docs/it/openai.md">OpenAI</a> o <a href="/docs/it/azure-openai.md">Azure OpenAI</a>).</p>
<h3 id="What-happens-if-I-dont-specify-a-credential-parameter-in-the-function-definition" class="common-anchor-header">Cosa succede se non specifico un parametro di credenziale nella definizione della funzione?<button data-href="#What-happens-if-I-dont-specify-a-credential-parameter-in-the-function-definition" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus segue questo ordine di risoluzione delle credenziali:</p>
<ol>
<li>In primo luogo, cerca le credenziali predefinite configurate per quel provider nel file ` <code translate="no">milvus.yaml</code> `</li>
<li>Se nel file `milvus.yaml` non sono presenti credenziali predefinite, ricorre alle variabili d’ambiente (se configurate)</li>
<li>Se non sono configurate né le credenziali in ` <code translate="no">milvus.yaml</code> ` né le variabili d’ambiente, Milvus genererà un errore</li>
</ol>
<h3 id="How-can-I-verify-that-embeddings-are-being-generated-correctly" class="common-anchor-header">Come posso verificare che gli embedding vengano generati correttamente?<button data-href="#How-can-I-verify-that-embeddings-are-being-generated-correctly" class="anchor-icon" translate="no">
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
    </button></h3><p>È possibile verificarlo:</p>
<ol>
<li>Interrogando la propria collezione dopo l’inserimento per verificare se il campo vettoriale contiene dati</li>
<li>Verificando che la lunghezza del campo vettoriale corrisponda alle dimensioni previste</li>
<li>Eseguendo una semplice ricerca di similarità per verificare che gli embedding producano risultati significativi</li>
</ol>
<h3 id="When-I-perform-a-similarity-search-can-I-use-a-query-vector-rather-than-raw-text" class="common-anchor-header">Quando eseguo una ricerca di similarità, posso utilizzare un vettore di query anziché il testo grezzo?<button data-href="#When-I-perform-a-similarity-search-can-I-use-a-query-vector-rather-than-raw-text" class="anchor-icon" translate="no">
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
    </button></h3><p>Sì, è possibile utilizzare vettori di query precalcolati al posto del testo grezzo per la ricerca di similarità. Sebbene il modulo Funzione converta automaticamente le query di testo grezzo in embedding, è anche possibile fornire direttamente i dati vettoriali al parametro ` <code translate="no">data</code> ` nell’operazione di ricerca. <strong>Nota</strong>: la dimensione del vettore di query fornito deve essere coerente con la dimensione dei vettori di embedding generati dal modulo Function.</p>
<p><strong>Esempio</strong>:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Using raw text (Function module converts automatically)</span>
results = client.search(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    data=[<span class="hljs-string">&#x27;How does Milvus handle semantic search?&#x27;</span>],
    anns_field=<span class="hljs-string">&#x27;dense&#x27;</span>,
    limit=<span class="hljs-number">1</span>
)

<span class="hljs-comment"># Using pre-computed query vector (must match stored vector dimensions)</span>
query_vector = [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, ...]  <span class="hljs-comment"># Must be same dimension as stored embeddings</span>
results = client.search(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    data=[query_vector],
    anns_field=<span class="hljs-string">&#x27;dense&#x27;</span>,
    limit=<span class="hljs-number">1</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="hljs-comment">// Using raw text (Function module converts automatically)</span>
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">textResults</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;How does Milvus handle semantic search?&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;dense&quot;</span>)
        .limit(<span class="hljs-number">1</span>)
        .build());

<span class="hljs-comment">// Using pre-computed query vector (must match stored vector dimensions)</span>
<span class="hljs-type">float</span>[] queryVector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span> <span class="hljs-comment">/* ... */</span>};  <span class="hljs-comment">// Must be same dimension as stored embeddings</span>
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">vectorResults</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;demo&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(queryVector)))
        .annsField(<span class="hljs-string">&quot;dense&quot;</span>)
        .limit(<span class="hljs-number">1</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Using raw text (Function module converts automatically)</span>
<span class="hljs-keyword">const</span> textResults = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;demo&quot;</span>,
    <span class="hljs-attr">data</span>: [<span class="hljs-string">&quot;How does Milvus handle semantic search?&quot;</span>],
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;dense&quot;</span>,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">1</span>,
});

<span class="hljs-comment">// Using pre-computed query vector (must match stored vector dimensions)</span>
<span class="hljs-keyword">const</span> query_vector = [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span> <span class="hljs-comment">/* ... */</span>];  <span class="hljs-comment">// Must be same dimension as stored embeddings</span>
<span class="hljs-keyword">const</span> vectorResults = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;demo&quot;</span>,
    <span class="hljs-attr">data</span>: [query_vector],
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;dense&quot;</span>,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">1</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Raw text: the embedding function converts the query automatically</span>
textResults, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;demo&quot;</span>,
    <span class="hljs-number">1</span>,
    []entity.Vector{entity.Text(<span class="hljs-string">&quot;How does Milvus handle semantic search?&quot;</span>)},
).WithANNSField(<span class="hljs-string">&quot;dense&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

<span class="hljs-comment">// Pre-computed vector: yourQueryVector must have the same dimension as the stored embeddings</span>
vectorResults, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;demo&quot;</span>,
    <span class="hljs-number">1</span>,
    []entity.Vector{entity.FloatVector(yourQueryVector)},
).WithANNSField(<span class="hljs-string">&quot;dense&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

fmt.Println(textResults, vectorResults)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-comment"># Raw text: the embedding function converts the query automatically</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;demo&quot;,
    &quot;data&quot;: [&quot;How does Milvus handle semantic search?&quot;],
    &quot;annsField&quot;: &quot;dense&quot;,
    &quot;limit&quot;: 1
}&#x27;</span>

<span class="hljs-comment"># Pre-computed vector: QUERY_VECTOR is a JSON array with the same dimension as the stored embeddings</span>
request=$(jq -n --argjson vec <span class="hljs-string">&quot;<span class="hljs-variable">$QUERY_VECTOR</span>&quot;</span> <span class="hljs-string">&#x27;{
    collectionName: &quot;demo&quot;,
    data: [$vec],
    annsField: &quot;dense&quot;,
    limit: 1
}&#x27;</span>)

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;<span class="hljs-variable">$request</span>&quot;</span>
<button class="copy-code-btn"></button></code></pre>
