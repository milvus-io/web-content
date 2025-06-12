---
id: bedrock.md
title: BedrockCompatible with Milvus 2.6.x
summary: >-
  Questo argomento descrive come configurare e utilizzare le funzioni di
  incorporazione di Amazon Bedrock in Milvus.
beta: Milvus 2.6.x
---
<h1 id="Bedrock" class="common-anchor-header">Bedrock<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Bedrock" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo argomento descrive come configurare e utilizzare le funzioni di incorporamento di Amazon Bedrock in Milvus.</p>
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
    </button></h2><p>Milvus supporta i modelli di incorporamento forniti da Amazon Bedrock. Di seguito sono riportati i modelli di incorporamento attualmente disponibili per un rapido riferimento:</p>
<table>
   <tr>
     <th><p>Nome del modello</p></th>
     <th><p>Dimensioni</p></th>
     <th><p>Gettoni massimi</p></th>
     <th><p>Descrizione</p></th>
   </tr>
   <tr>
     <td><p>amazon.titan-embed-text-v2:0</p></td>
     <td><p>1.024 (predefinito), 512, 256</p></td>
     <td><p>8,192</p></td>
     <td><p>RAG, ricerca di documenti, reranking, classificazione, ecc.</p></td>
   </tr>
</table>
<p>Per maggiori dettagli, consultare i <a href="https://docs.aws.amazon.com/bedrock/latest/userguide/titan-embedding-models.html">modelli Amazon Titan Text Embeddings</a>.</p>
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
    </button></h2><p>Milvus deve conoscere le credenziali di accesso a Bedrock prima di poter richiedere gli embeddings. Milvus offre due metodi per configurare le credenziali:</p>
<ul>
<li><p><strong>File di configurazione (consigliato):</strong> Memorizza le credenziali in <code translate="no">milvus.yaml</code> in modo che ogni riavvio e nodo le prenda automaticamente.</p></li>
<li><p><strong>Variabili d'ambiente:</strong> Iniettare le credenziali al momento della distribuzione, ideale per Docker Compose.</p></li>
</ul>
<p>Scegliere uno dei due metodi seguenti: il file di configurazione è più facile da mantenere su macchine virtuali e bare-metal, mentre la via delle variabili d'ambiente si adatta ai flussi di lavoro dei container.</p>
<div class="alert note">
<p>Se una credenziale per lo stesso provider è presente sia nel file di configurazione che in una variabile d'ambiente, Milvus utilizza sempre il valore in <code translate="no">milvus.yaml</code> e ignora la variabile d'ambiente.</p>
</div>
<h3 id="Option-1-Configuration-file-recommended--higher-priority" class="common-anchor-header">Opzione 1: File di configurazione (consigliata e con priorità più alta)</h3><p>Mantenere le credenziali in <code translate="no">milvus.yaml</code>; Milvus le legge all'avvio e sovrascrive qualsiasi variabile d'ambiente per lo stesso provider.</p>
<ol>
<li><p>**Dichiarare le credenziali in <code translate="no">credential:</code></p>
<p>Si possono elencare una o più credenziali, dando a ciascuna un'etichetta inventata e a cui si farà riferimento in seguito.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">aksk_dev:</span>            <span class="hljs-comment"># dev environment</span>
    <span class="hljs-attr">access_key_id:</span> <span class="hljs-string">&lt;YOUR_DEV_ACCESS_KEY_ID&gt;</span>
    <span class="hljs-attr">secret_access_key:</span> <span class="hljs-string">&lt;YOUR_DEV_SECRET_ACCESS_KEY&gt;</span>
  <span class="hljs-attr">aksk_prod:</span>           <span class="hljs-comment"># production environment</span>
    <span class="hljs-attr">access_key_id:</span> <span class="hljs-string">&lt;YOUR_PROD_ACCESS_KEY_ID&gt;</span>    
    <span class="hljs-attr">secret_access_key:</span> <span class="hljs-string">&lt;YOUR_PROD_SECRET_ACCESS_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Mettere le credenziali qui le rende persistenti tra i vari riavvii e permette di cambiare le credenziali semplicemente cambiando un'etichetta.</p></li>
<li><p><strong>Indicare a Milvus quale credenziale utilizzare per le chiamate di servizio</strong></p>
<p>Nello stesso file, si indica al provider Bedrock l'etichetta che si desidera utilizzare.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">bedrock:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">aksk_dev</span>      <span class="hljs-comment"># ← choose any label you defined above</span>
<button class="copy-code-btn"></button></code></pre>
<p>In questo modo si lega una credenziale specifica a ogni richiesta che Milvus invia al servizio di incorporazione di Bedrock.</p></li>
</ol>
<h3 id="Option-2-Environment-variable" class="common-anchor-header">Opzione 2: Variabile d'ambiente</h3><p>Utilizzate questo metodo quando eseguite Milvus con Docker Compose e preferite tenere i segreti fuori dai file e dalle immagini.</p>
<p>Milvus ricorre alla variabile d'ambiente solo se non viene trovata alcuna credenziale per il provider in <code translate="no">milvus.yaml</code>.</p>
<table>
   <tr>
     <th><p>Variabile</p></th>
     <th><p>Richiesto</p></th>
     <th><p>Descrizione</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">MILVUSAI_BEDROCK_ACCESS_KEY_ID</code></p></td>
     <td><p>Sì</p></td>
     <td><p>ID della chiave di accesso AWS utilizzata per l'autenticazione con il servizio Bedrock.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">MILVUSAI_BEDROCK_SECRET_ACCESS_KEY</code></p></td>
     <td><p>Sì</p></td>
     <td><p>La chiave di accesso segreta AWS corrispondente all'ID della chiave di accesso.</p></td>
   </tr>
</table>
<p>Nel file <strong>docker-compose.yaml</strong>, impostare la variabile d'ambiente <code translate="no">MILVUSAI_OPENAI_API_KEY</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml (standalone service section)</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-comment"># ... other configurations ...</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-comment"># ... other environment variables ...</span>
    <span class="hljs-comment"># Set the environment variable pointing to the Bedrock embedding service inside the container</span>
    <span class="hljs-attr">MILVUSAI_BEDROCK_ACCESS_KEY_ID:</span> <span class="hljs-string">&lt;MILVUSAI_BEDROCK_ACCESS_KEY_ID&gt;</span>
    <span class="hljs-attr">MILVUSAI_BEDROCK_SECRET_ACCESS_KEY:</span> <span class="hljs-string">&lt;MILVUSAI_BEDROCK_SECRET_ACCESS_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Il blocco <code translate="no">environment:</code> inietta la chiave solo nel contenitore Milvus, lasciando inalterato il sistema operativo host. Per maggiori dettagli, consultare <a href="/docs/it/configure-docker.md#Configure-Milvus-with-Docker-Compose">Configurazione di Milvus con Docker Compose</a>.</p>
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
<p>L'esempio seguente definisce uno schema con un campo scalare <code translate="no">&quot;document&quot;</code> per memorizzare i dati testuali e un campo vettoriale <code translate="no">&quot;dense&quot;</code> per memorizzare gli embeddings che saranno generati dal modulo Function. Ricordarsi di impostare la dimensione del vettore (<code translate="no">dim</code>) in modo che corrisponda all'output del modello di embedding scelto.</p>
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
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1024</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-function-to-schema" class="common-anchor-header">Passo 2: Aggiungere la funzione allo schema</h3><p>Il modulo Function di Milvus converte automaticamente i dati grezzi memorizzati in un campo scalare in embeddings e li memorizza nel campo vettoriale esplicitamente definito.</p>
<p>L'esempio seguente aggiunge un modulo Function (<code translate="no">bedrk</code>) che converte il campo scalare <code translate="no">&quot;document&quot;</code> in embedding, memorizzando i vettori risultanti nel campo vettoriale <code translate="no">&quot;dense&quot;</code> definito in precedenza.</p>
<p>Una volta definita la funzione di embedding, aggiungerla allo schema della collezione. In questo modo si indica a Milvus di utilizzare la funzione di embedding specificata per elaborare e memorizzare gli embeddings dai dati di testo.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function specifically for OpenAI provider</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;bedrk&quot;</span>,                                   <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,       <span class="hljs-comment"># Indicates a text embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],                 <span class="hljs-comment"># Scalar field(s) containing text data to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],                   <span class="hljs-comment"># Vector field(s) for storing embeddings</span>
    params={                                      <span class="hljs-comment"># Provider-specific embedding parameters (function-level)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;bedrock&quot;</span>,                      <span class="hljs-comment"># Must be set to &quot;bedrock&quot;</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;amazon.titan-embed-text-v2:0&quot;</span>,    <span class="hljs-comment"># Specifies the embedding model to use</span>
        <span class="hljs-string">&quot;region&quot;</span>: <span class="hljs-string">&quot;us-east-2&quot;</span>,                           <span class="hljs-comment"># Required: AWS region where the Bedrock service is hosted     </span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;aksk_dev&quot;,               # Optional: Credential label specified in milvus.yaml</span>
        <span class="hljs-comment"># &quot;dim&quot;: &quot;1024&quot;,                          # Output dimension of the vector embeddings after truncation</span>
        <span class="hljs-comment"># &quot;normalize&quot;: &quot;true&quot;,                    # Whether to normalize the output embeddings</span>
    }
)

<span class="hljs-comment"># Add the configured embedding function to your existing collection schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Dopo aver configurato la funzione di incorporamento, consultare la <a href="/docs/it/embedding-function-overview.md">Panoramica delle funzioni</a> per ulteriori indicazioni sulla configurazione dell'indice, sugli esempi di inserimento dei dati e sulle operazioni di ricerca semantica.</p>
