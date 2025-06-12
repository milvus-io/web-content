---
id: hugging-face-tei.md
title: Hugging Face TEICompatible with Milvus 2.6.x
summary: >-
  Hugging Face Text Embeddings Inference (TEI) è un server di inferenza ad alte
  prestazioni progettato specificamente per i modelli di incorporazione del
  testo. Questa guida spiega come utilizzare Hugging Face TEI con Milvus per una
  generazione efficiente di incorporazioni di testo.
beta: Milvus 2.6.x
---
<h1 id="Hugging-Face-TEI" class="common-anchor-header">Hugging Face TEI<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Hugging-Face-TEI" class="anchor-icon" translate="no">
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
    </button></h1><p>Hugging Face <a href="https://huggingface.co/docs/text-embeddings-inference/en/index">Text Embeddings Inference (TEI)</a> è un server di inferenza ad alte prestazioni progettato specificamente per i modelli di incorporazione del testo. Questa guida spiega come utilizzare Hugging Face TEI con Milvus per una generazione efficiente di incorporazioni di testo.</p>
<p>TEI funziona con molti modelli di text embedding di Hugging Face Hub, tra cui:</p>
<ul>
<li><p>serie BAAI/bge-*</p></li>
<li><p>serie sentence-transformers/*</p></li>
<li><p>Modelli E5</p></li>
<li><p>Modelli GTE</p></li>
<li><p>E molti altri</p></li>
</ul>
<div class="alert note">
<p>Per l'elenco aggiornato dei modelli supportati, consultare il <a href="https://github.com/huggingface/text-embeddings-inference">repository TEI GitHub</a> e <a href="https://huggingface.co/models?pipeline_tag=text-embedding">Hugging Face Hub</a>.</p>
</div>
<h2 id="TEI-deployment" class="common-anchor-header">Distribuzione TEI<button data-href="#TEI-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>Prima di configurare Milvus con la funzione TEI, è necessario disporre di un servizio TEI funzionante. Milvus supporta due approcci per la distribuzione TEI:</p>
<h3 id="Standard-deployment-external" class="common-anchor-header">Distribuzione standard (esterna)</h3><p>È possibile distribuire TEI come servizio autonomo utilizzando i metodi ufficiali di Hugging Face. Questo approccio offre la massima flessibilità e controllo sul servizio TEI.</p>
<p>Per istruzioni dettagliate sulla distribuzione di TEI utilizzando Docker o altri metodi, consultare la <a href="https://huggingface.co/docs/text-embeddings-inference/en/quick_tour#deploy">documentazione ufficiale di Hugging Face Text Embeddings Inference</a>.</p>
<p>Dopo la distribuzione, prendere nota dell'endpoint del servizio TEI (ad esempio, <code translate="no">http://localhost:8080</code>), in quanto sarà necessario quando si <a href="/docs/it/hugging-face-tei.md#Use-embedding-function-">utilizzerà la funzione TEI in Milvus</a>.</p>
<h3 id="Milvus-Helm-Chart-deployment-integrated" class="common-anchor-header">Distribuzione di Milvus Helm Chart (integrato)</h3><p>Per gli ambienti Kubernetes, Milvus offre un'opzione di distribuzione integrata attraverso il grafico Helm. Questo semplifica il processo di distribuzione e configurazione di TEI insieme a Milvus.</p>
<p>Per abilitare TEI nella distribuzione di Milvus Helm:</p>
<ol>
<li><p>Configurare <strong>values.yaml</strong> per abilitare TEI:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">tei:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">image:</span>
    <span class="hljs-attr">repository:</span> <span class="hljs-string">ghcr.io/huggingface/text-embeddings-inference</span>
    <span class="hljs-attr">tag:</span> <span class="hljs-string">&quot;1.7&quot;</span> <span class="hljs-comment"># Modify based on hardware</span>
  <span class="hljs-attr">model:</span> <span class="hljs-string">&quot;BAAI/bge-large-en-v1.5&quot;</span> <span class="hljs-comment"># Modify based on requirements</span>
  <span class="hljs-comment"># revision: &quot;main&quot;</span>
  <span class="hljs-comment"># hfTokenSecretName: &quot;my-huggingface-token-secret&quot;</span>
  <span class="hljs-comment"># apiKey: &quot;your_secure_api_key&quot;</span>
  <span class="hljs-comment"># apiKeySecret:</span>
  <span class="hljs-comment">#   name: &quot;my-tei-api-key-secret&quot;</span>
  <span class="hljs-comment">#   key: &quot;api-key&quot;</span>
  <span class="hljs-attr">resources:</span>
    <span class="hljs-attr">requests:</span>
      <span class="hljs-attr">cpu:</span> <span class="hljs-string">&quot;1&quot;</span>
      <span class="hljs-attr">memory:</span> <span class="hljs-string">&quot;4Gi&quot;</span>
      <span class="hljs-comment"># nvidia.com/gpu: &quot;1&quot; # For GPU</span>
    <span class="hljs-attr">limits:</span>
      <span class="hljs-attr">cpu:</span> <span class="hljs-string">&quot;2&quot;</span>
      <span class="hljs-attr">memory:</span> <span class="hljs-string">&quot;8Gi&quot;</span>
      <span class="hljs-comment"># nvidia.com/gpu: &quot;1&quot; # For GPU</span>
  <span class="hljs-attr">extraArgs:</span> []

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Distribuire o aggiornare Milvus:</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus -f values.yaml -n &lt;your-milvus-namespace&gt;
<span class="hljs-comment"># or</span>
helm upgrade my-release milvus/milvus -f values.yaml --reset-then-reuse-values -n &lt;your-milvus-namespace&gt;
<button class="copy-code-btn"></button></code></pre>
<p><div class="alert note"></p>
<p>Quando si utilizza il deployment grafico Helm, il servizio TEI sarà accessibile all'interno del cluster Kubernetes all'indirizzo <code translate="no">http://my-release-milvus-tei:80</code> (utilizzando il nome della release). Utilizzare questo come endpoint nella configurazione della funzione TEI.</p>
<p></div></p></li>
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
    </button></h2><p>Dopo aver distribuito il servizio TEI, è necessario fornire il suo endpoint quando si definisce una funzione di incorporamento TEI. Nella maggior parte dei casi, non è necessaria alcuna configurazione aggiuntiva, poiché TEI è abilitato per impostazione predefinita in Milvus.</p>
<p>Tuttavia, se il servizio TEI è stato distribuito con l'autenticazione della chiave API (flag<code translate="no">--api-key</code> ), è necessario configurare Milvus per utilizzare questa chiave:</p>
<ol>
<li><p><strong>Definire le chiavi API nella sezione <code translate="no">credential</code>:</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">tei_key:</span>  <span class="hljs-comment"># You can use any label name</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_TEI_API_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Fare riferimento alla credenziale in milvus.yaml:</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">openai:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">tei_key</span>      <span class="hljs-comment"># ← choose any label you defined above</span>
        <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># enabled by default. no action required.</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
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
    </button></h2><p>Una volta configurato il servizio TEI, seguire questi passaggi per definire e utilizzare le funzioni di incorporamento.</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">Passo 1: Definire i campi dello schema</h3><p>Per utilizzare una funzione di incorporamento, creare una raccolta con uno schema specifico. Questo schema deve includere almeno tre campi necessari:</p>
<ul>
<li><p>Il campo primario che identifica in modo univoco ogni entità della raccolta.</p></li>
<li><p>Un campo scalare che memorizza i dati grezzi da incorporare.</p></li>
<li><p>Un campo vettoriale riservato a memorizzare le incorporazioni vettoriali che la funzione genererà per il campo scalare.</p></li>
</ul>
<p>L'esempio seguente definisce uno schema con un campo scalare <code translate="no">&quot;document&quot;</code> per memorizzare i dati testuali e un campo vettoriale <code translate="no">&quot;dense_vector&quot;</code> per memorizzare le incorporazioni che saranno generate dal modulo Function. Ricordarsi di impostare la dimensione del vettore (<code translate="no">dim</code>) in modo che corrisponda all'output del modello di embedding scelto.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType, CollectionSchema, FieldSchema

<span class="hljs-comment"># Assume you have connected to Milvus</span>
<span class="hljs-comment"># client = MilvusClient(uri=&quot;http://localhost:19530&quot;)</span>

<span class="hljs-comment"># 1. Create Schema</span>
schema = MilvusClient.create_schema()

<span class="hljs-comment"># 2. Add fields</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>) <span class="hljs-comment"># Store text data</span>
<span class="hljs-comment"># IMPORTANT: Set dim to exactly match the TEI model&#x27;s output dimension</span>
schema.add_field(<span class="hljs-string">&quot;dense_vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1024</span>) <span class="hljs-comment"># Store embedding vectors (example dimension)</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">Passo 2: Aggiungere la funzione di embedding allo schema</h3><p>Il modulo Function di Milvus converte automaticamente i dati grezzi memorizzati in un campo scalare in embedding e li memorizza nel campo vettoriale esplicitamente definito.</p>
<p>L'esempio seguente aggiunge un modulo Function (<code translate="no">tei_func</code>) che converte il campo scalare <code translate="no">&quot;document&quot;</code> in embedding, memorizzando i vettori risultanti nel campo vettoriale <code translate="no">&quot;dense_vector&quot;</code> definito in precedenza.</p>
<p>Una volta definita la funzione di embedding, aggiungerla allo schema della collezione. In questo modo si indica a Milvus di utilizzare la funzione di embedding specificata per elaborare e memorizzare gli embeddings dei dati di testo.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. Define TEI embedding function</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;tei_func&quot;</span>,                            <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,   <span class="hljs-comment"># Indicates a text embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],             <span class="hljs-comment"># Scalar field(s) containing text data to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense_vector&quot;</span>],        <span class="hljs-comment"># Vector field(s) for storing embeddings</span>
    params={                                    <span class="hljs-comment"># TEI specific parameters (function-level)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;TEI&quot;</span>,                      <span class="hljs-comment"># Must be set to &quot;TEI&quot;</span>
        <span class="hljs-string">&quot;endpoint&quot;</span>: <span class="hljs-string">&quot;http://your-tei-service-endpoint:80&quot;</span>, <span class="hljs-comment"># Required: Points to your TEI service address</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;truncate&quot;: &quot;true&quot;,                   # Optional: Whether to truncate long input (default false)</span>
        <span class="hljs-comment"># &quot;truncation_direction&quot;: &quot;right&quot;,      # Optional: Truncation direction (default right)</span>
        <span class="hljs-comment"># &quot;max_client_batch_size&quot;: 64,          # Optional: Client max batch size (default 32)</span>
        <span class="hljs-comment"># &quot;ingestion_prompt&quot;: &quot;passage: &quot;,      # Optional: (Advanced) Ingestion phase prompt</span>
        <span class="hljs-comment"># &quot;search_prompt&quot;: &quot;query: &quot;            # Optional: (Advanced) Search phase prompt</span>
    }
)

<span class="hljs-comment"># Add the configured embedding function to your existing collection schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p><strong>Parametro</strong></p></th>
     <th><p><strong>Richiesto?</strong></p></th>
     <th><p><strong>Descrizione</strong></p></th>
     <th><p><strong>Esempio Valore</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>Sì</p></td>
     <td><p>Il fornitore del modello di incorporazione. Impostare su "TEI".</p></td>
     <td><p>"TEI"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">endpoint</code></p></td>
     <td><p>Sì</p></td>
     <td><p>L'indirizzo di rete che punta al servizio TEI distribuito. Se distribuito tramite Milvus Helm Chart, di solito è l'indirizzo interno del servizio.</p></td>
     <td><p>"http://localhost:8080", "http://my-release-milvus-tei:80"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">truncate</code></p></td>
     <td><p>No</p></td>
     <td><p>Se troncare o meno i testi in ingresso che superano la lunghezza massima del modello. L'impostazione predefinita è false.</p></td>
     <td><p>"true"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">truncation_direction</code></p></td>
     <td><p>No</p></td>
     <td><p>Efficace quando truncate è true. Specifica se troncare da sinistra o da destra. L'impostazione predefinita è destra.</p></td>
     <td><p>"sinistra"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>No</p></td>
     <td><p>La dimensione massima del batch che il client Milvus invia a TEI. L'impostazione predefinita è 32.</p></td>
     <td><p>64</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">prompt_name</code></p></td>
     <td><p>No</p></td>
     <td><p>(Avanzato) Specifica una chiave nel dizionario dei prompt della configurazione dei trasformatori di frasi. Si usa per alcuni modelli che richiedono formati di prompt specifici. Il supporto TEI potrebbe essere limitato e dipende dalla configurazione del modello sull'Hub.</p></td>
     <td><p>"la_tua_chiave_di_prompt"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ingestion_prompt</code></p></td>
     <td><p>No</p></td>
     <td><p>(Avanzato) Specifica il prompt da usare durante la fase di inserimento dei dati (ingestion). Dipende dal modello TEI utilizzato; il modello deve supportare i prompt.</p></td>
     <td><p>"passage: "</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_prompt</code></p></td>
     <td><p>No</p></td>
     <td><p>(Avanzato) Specifica il prompt da usare durante la fase di ricerca. Dipende dal modello TEI utilizzato; il modello deve supportare i prompt.</p></td>
     <td><p>"query: "</p></td>
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
    </button></h2><p>Dopo aver configurato la funzione di incorporamento, consultare la <a href="/docs/it/embedding-function-overview.md">Panoramica della funzione</a> per ulteriori indicazioni sulla configurazione dell'indice, sugli esempi di inserimento dei dati e sulle operazioni di ricerca semantica.</p>
