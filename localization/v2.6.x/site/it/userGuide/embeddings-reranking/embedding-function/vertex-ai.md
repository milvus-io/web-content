---
id: vertex-ai.md
title: Vertex AICompatible with Milvus 2.6.x
summary: >-
  Google Cloud Vertex AI è un servizio ad alte prestazioni progettato
  specificamente per i modelli di incorporazione del testo. Questa guida spiega
  come utilizzare Google Cloud Vertex AI con Milvus per una generazione
  efficiente di incorporazioni di testo.
beta: Milvus 2.6.x
---
<h1 id="Vertex-AI" class="common-anchor-header">Vertex AI<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Vertex-AI" class="anchor-icon" translate="no">
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
    </button></h1><p>Google Cloud <a href="https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-text-embeddings">Vertex AI</a> è un servizio ad alte prestazioni progettato specificamente per i modelli di incorporazione del testo. Questa guida spiega come utilizzare Google Cloud Vertex AI con Milvus per una generazione efficiente di incorporazioni di testo.</p>
<p>Vertex AI supporta diversi modelli di incorporamento per diversi casi d'uso:</p>
<ul>
<li><p>text-embedding-005 (ultimo modello di incorporamento del testo)</p></li>
<li><p>text-multilingual-embedding-002 (ultimo modello di incorporazione del testo multilingue).</p></li>
</ul>
<p>Per maggiori dettagli, consultare il <a href="https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/text-embeddings">riferimento ai modelli di incorporamento del testo di Vertex AI</a>.</p>
<h2 id="Vertex-AI-deployment" class="common-anchor-header">Distribuzione di Vertex AI<button data-href="#Vertex-AI-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>Prima di configurare Milvus con la funzione Vertex AI, è necessario configurare l'istanza di Milvus per utilizzare le credenziali dell'account del servizio Google Cloud. Milvus supporta due approcci principali di distribuzione:</p>
<h3 id="Standard-deployment-Docker-Compose" class="common-anchor-header">Distribuzione standard (Docker Compose)</h3><p>Nel file docker-compose.yaml, è necessario montare il file delle credenziali e impostare la variabile d'ambiente <code translate="no">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml (standalone service section)</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-comment"># ... other configurations ...</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-comment"># ... other environment variables ...</span>
    <span class="hljs-comment"># Set the environment variable pointing to the credential file path inside the container</span>
    <span class="hljs-attr">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS:</span> <span class="hljs-string">/milvus/configs/google_application_credentials.json</span>
  <span class="hljs-attr">volumes:</span>
    <span class="hljs-comment"># ... other mounts ...</span>
    <span class="hljs-comment"># Mount the credential file from the host to the specified path inside the container</span>
    <span class="hljs-comment"># Replace /path/to/your/credentials.json with the actual path</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">/path/to/your/credentials.json:/milvus/configs/google_application_credentials.json:ro</span>

<button class="copy-code-btn"></button></code></pre>
<h3 id="Milvus-Helm-Chart-deployment-Kubernetes" class="common-anchor-header">Distribuzione di Milvus Helm Chart (Kubernetes)</h3><p>Per gli ambienti Kubernetes, si consiglia di utilizzare un Kubernetes Secret per memorizzare il file delle credenziali:</p>
<ol>
<li><p><strong>Creare il segreto</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">kubectl</span> <span class="hljs-string">create</span> <span class="hljs-string">secret</span> <span class="hljs-string">generic</span> <span class="hljs-string">vertex-ai-secret</span> <span class="hljs-string">\</span>
  <span class="hljs-string">--from-file=credentials.json=/path/to/your/credentials.json</span> <span class="hljs-string">\</span>
  <span class="hljs-string">-n</span> <span class="hljs-string">&lt;your-milvus-namespace&gt;</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Configurare values.yaml</strong></p>
<p>Aggiungere quanto segue nelle sezioni standalone o proxy/dataNode:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">extraEnv:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</span>
    <span class="hljs-attr">value:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>
<span class="hljs-attr">volumes:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
    <span class="hljs-attr">secret:</span>
      <span class="hljs-attr">secretName:</span> <span class="hljs-string">vertex-ai-secret</span>
<span class="hljs-attr">volumeMounts:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
    <span class="hljs-attr">mountPath:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>
    <span class="hljs-attr">subPath:</span> <span class="hljs-string">credentials.json</span>
    <span class="hljs-attr">readOnly:</span> <span class="hljs-literal">true</span>

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Configuration-in-Milvus" class="common-anchor-header">Configurazione in Milvus<button data-href="#Configuration-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Dopo aver distribuito le credenziali Vertex AI, è necessario configurare la funzione di incorporamento. Milvus supporta diversi metodi per configurare le credenziali di autenticazione per Vertex AI, applicati nel seguente ordine di precedenza:</p>
<ul>
<li><p><strong>File di configurazione di Milvus (milvus.yaml)</strong> - Massima priorità</p></li>
<li><p><strong>Variabili d'ambiente</strong> - priorità più bassa</p></li>
</ul>
<p><strong>File di configurazione di Milvus (milvus.yaml)</strong></p>
<p>Per impostazioni persistenti a livello di cluster, i dati json delle credenziali possono essere codificati in formato base64 e poi definiti nel file milvus.yaml.<code translate="no">cat credentials.json|jq .|base64</code>sostituisce <code translate="no">credentials.json</code> con il percorso del file delle credenziali.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">credential:</span>
  <span class="hljs-attr">gcp1:</span>
    <span class="hljs-attr">credential_json:</span>  <span class="hljs-comment"># base64 based gcp credential data</span>

<span class="hljs-comment"># Any configuration related to functions</span>
<span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">vertexai:</span>
        <span class="hljs-attr">credential:</span>  <span class="hljs-string">gcp1</span> <span class="hljs-comment"># The name in the crendential configuration item</span>
        <span class="hljs-attr">url:</span>  <span class="hljs-comment"># Your VertexAI embedding url</span>

<button class="copy-code-btn"></button></code></pre>
<p><strong>Variabili d'ambiente</strong></p>
<p>Le variabili d'ambiente offrono un metodo di configurazione alternativo, comunemente usato quando si impostano gli ambienti dei container in Docker Compose o nelle distribuzioni Kubernetes.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># Example (typically set in docker-compose.yaml or Kubernetes manifest)</span>
<span class="hljs-comment"># docker-compose.yaml (standalone service section)</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-comment"># ... other configurations ...</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-comment"># ... other environment variables ...</span>
    <span class="hljs-comment"># Set the environment variable pointing to the credential file path inside the container</span>
    <span class="hljs-attr">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS:</span> <span class="hljs-string">/milvus/configs/google_application_credentials.json</span>
    
<span class="hljs-comment">#Add the following under the standalone or proxy/dataNode sections in values.yaml:    </span>
<span class="hljs-attr">extraEnv:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</span>
    <span class="hljs-attr">value:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>    
    
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-embedding-function" class="common-anchor-header">Utilizzare la funzione embedding<button data-href="#Use-embedding-function" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta configurato Vertex AI, seguire questi passaggi per definire e utilizzare le funzioni di incorporamento.</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">Passo 1: Definire i campi dello schema</h3><p>Per utilizzare una funzione di incorporamento, creare una raccolta con uno schema specifico. Questo schema deve includere almeno tre campi necessari:</p>
<ul>
<li><p>Il campo primario che identifica in modo univoco ogni entità della raccolta.</p></li>
<li><p>Un campo scalare che memorizza i dati grezzi da incorporare.</p></li>
<li><p>Un campo vettoriale riservato a memorizzare le incorporazioni vettoriali che la funzione genererà per il campo scalare.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType, CollectionSchema, FieldSchema

<span class="hljs-comment"># Assume you have connected to Milvus</span>
<span class="hljs-comment"># client = MilvusClient(uri=&quot;http://localhost:19530&quot;)</span>

<span class="hljs-comment"># 1. Create Schema</span>
schema = MilvusClient.create_schema()

<span class="hljs-comment"># 2. Add fields</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>) <span class="hljs-comment"># Store text data</span>
<span class="hljs-comment"># IMPORTANT: Set dim to match the output dimension of the model and parameters</span>
schema.add_field(<span class="hljs-string">&quot;dense_vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>) <span class="hljs-comment"># Store embedding vectors (example dimension)</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">Passo 2: Aggiungere la funzione di incorporamento allo schema</h3><p>Il modulo Function di Milvus converte automaticamente i dati grezzi memorizzati in un campo scalare in embeddings e li memorizza nel campo vettoriale esplicitamente definito.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. Define Vertex AI embedding function</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;vert_func&quot;</span>,                           <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,   <span class="hljs-comment"># Indicates a text embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],             <span class="hljs-comment"># Scalar field(s) containing text data to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense_vector&quot;</span>],        <span class="hljs-comment"># Vector field(s) for storing embeddings</span>
    params={                                    <span class="hljs-comment"># Vertex AI specific parameters (function-level)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;vertexai&quot;</span>,                 <span class="hljs-comment"># Must be set to &quot;vertexai&quot;</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-005&quot;</span>,     <span class="hljs-comment"># Required: Specifies the Vertex AI model to use</span>
        <span class="hljs-string">&quot;projectid&quot;</span>: <span class="hljs-string">&quot;your-gcp-project-id&quot;</span>,     <span class="hljs-comment"># Required: Your Google Cloud project ID</span>
        <span class="hljs-comment"># Optional parameters (include these only if necessary):</span>
        <span class="hljs-comment"># &quot;location&quot;: &quot;us-central1&quot;,            # Optional: Vertex AI service region (default us-central1)</span>
        <span class="hljs-comment"># &quot;task&quot;: &quot;DOC_RETRIEVAL&quot;,              # Optional: Embedding task type (default DOC_RETRIEVAL)</span>
        <span class="hljs-comment"># &quot;dim&quot;: 768                            # Optional: Output vector dimension (1-768)</span>
    }
)

<span class="hljs-comment"># Add the configured embedding function to your existing collection schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p><strong>Parametro</strong></p></th>
     <th><p><strong>Descrizione</strong></p></th>
     <th><p><strong>Richiesto?</strong></p></th>
     <th><p><strong>Esempio Valore</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>Il fornitore del modello di incorporazione. Impostare su "vertexai".</p></td>
     <td><p>Sì</p></td>
     <td><p><code translate="no">"vertexai"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>Specifica il modello di incorporamento Vertex AI da usare.</p></td>
     <td><p>Sì</p></td>
     <td><p><code translate="no">"text-embedding-005"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">projectid</code></p></td>
     <td><p>L'ID del progetto Google Cloud.</p></td>
     <td><p>Sì</p></td>
     <td><p><code translate="no">"your-gcp-project-id"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">location</code></p></td>
     <td><p>La regione per il servizio Vertex AI. Attualmente, le incorporazioni Vertex AI supportano principalmente us-central1. Si imposta come predefinita su us-central1.</p></td>
     <td><p>No</p></td>
     <td><p><code translate="no">"us-central1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">task</code></p></td>
     <td><p>Specifica il tipo di attività di incorporazione, che influisce sui risultati dell'incorporazione. Valori accettati: DOC_RETRIEVAL (predefinito), CODE_RETRIEVAL (supportato solo da 005), STS (Semantic Textual Similarity).</p></td>
     <td><p>No</p></td>
     <td><p><code translate="no">"DOC_RETRIEVAL"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dim</code></p></td>
     <td><p>Dimensione dei vettori di incorporazione in uscita. Accetta numeri interi compresi tra 1 e 768. <strong>Nota:</strong> se specificato, assicurarsi che la dimensione del campo vettoriale nello schema corrisponda a questo valore.</p></td>
     <td><p>No</p></td>
     <td><p><code translate="no">768</code></p></td>
   </tr>
</table>
<h2 id="Next-steps" class="common-anchor-header">Passi successivi<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><p>Dopo aver configurato la funzione di incorporamento, consultare la <a href="/docs/it/embeddings.md">Panoramica della funzione</a> per ulteriori indicazioni sulla configurazione degli indici, sugli esempi di inserimento dei dati e sulle operazioni di ricerca semantica.</p>
