---
id: manage-collections.md
title: Gestire le raccolte
---
<h1 id="Manage-Collections" class="common-anchor-header">Gestire le raccolte<button data-href="#Manage-Collections" class="anchor-icon" translate="no">
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
    </button></h1><p>Questa guida spiega come creare e gestire le raccolte utilizzando l'SDK di vostra scelta.</p>
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
    </button></h2><ul>
<li><p>Avete installato <a href="https://milvus.io/docs/install_standalone-docker.md">Milvus standalone</a> o <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Milvus cluster</a>.</p></li>
<li><p>Avete installato gli SDK preferiti. È possibile scegliere tra vari linguaggi, tra cui <a href="https://milvus.io/docs/install-pymilvus.md">Python</a>, <a href="https://milvus.io/docs/install-java.md">Java</a>, <a href="https://milvus.io/docs/install-go.md">Go</a> e <a href="https://milvus.io/docs/install-node.md">Node.js</a>.</p></li>
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
    </button></h2><p>In Milvus, si memorizzano le incorporazioni vettoriali in collezioni. Tutti gli embeddings vettoriali all'interno di una collezione condividono la stessa dimensionalità e la stessa metrica di distanza per misurare la somiglianza.</p>
<p>Le collezioni di Milvus supportano campi dinamici (cioè campi non predefiniti nello schema) e l'incremento automatico delle chiavi primarie.</p>
<p>Per soddisfare le diverse preferenze, Milvus offre due metodi per creare una collezione. Uno fornisce una configurazione rapida, mentre l'altro consente una personalizzazione dettagliata dello schema della collezione e dei parametri degli indici.</p>
<p>Inoltre, è possibile visualizzare, caricare, rilasciare e abbandonare una raccolta quando necessario.</p>
<h2 id="Create-Collection" class="common-anchor-header">Creare una raccolta<button data-href="#Create-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>È possibile creare una raccolta in uno dei seguenti modi:</p>
<ul>
<li><p><strong>Impostazione rapida</strong></p>
<p>In questo modo, è possibile creare una collezione semplicemente dandole un nome e specificando il numero di dimensioni delle incorporazioni vettoriali da memorizzare in questa collezione. Per maggiori dettagli, consultare la sezione <a href="/docs/it/v2.4.x/manage-collections.md">Impostazione rapida</a>.</p></li>
<li><p><strong>Configurazione personalizzata</strong></p>
<p>Invece di lasciare che In Milvus decida quasi tutto per la vostra collezione, potete determinare da soli i <strong>parametri</strong> <strong>dello schema</strong> e dell'<strong>indice</strong> della collezione. Per i dettagli, consultare la sezione <a href="/docs/it/v2.4.x/manage-collections.md">Configurazione personalizzata</a>.</p></li>
</ul>
<h3 id="Quick-setup" class="common-anchor-header">Configurazione rapida</h3><p>Nel contesto del grande balzo dell'industria dell'intelligenza artificiale, la maggior parte degli sviluppatori ha bisogno di una collezione semplice ma dinamica per iniziare. Milvus permette di configurare rapidamente una collezione di questo tipo con soli tre argomenti:</p>
<ul>
<li><p>Nome della collezione da creare,</p></li>
<li><p>Dimensione delle incorporazioni vettoriali da inserire e</p></li>
<li><p>Tipo di metrica utilizzata per misurare le somiglianze tra gli embeddings vettoriali.</p></li>
</ul>
<div class="language-python">
<p>Per una rapida impostazione, utilizzare il metodo <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md"><code translate="no">create_collection()</code></a> della classe <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a> per creare un insieme con il nome e la dimensione specificati.</p>
</div>
<div class="language-java">
<p>Per una configurazione rapida, utilizzare il metodo <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md"><code translate="no">createCollection()</code></a> della classe <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Client/MilvusClientV2.md"><code translate="no">MilvusClientV2</code></a> per creare un insieme con il nome e la dimensione specificati.</p>
</div>
<div class="language-javascript">
<p>Per un'impostazione rapida, utilizzare il metodo <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md"><code translate="no">createCollection()</code></a> della classe <a href="https://milvus.io/api-reference/node/v2.4.x/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a> per creare un insieme con il nome e la dimensione specificati.</p>
</div>
<div class="language-go">
<p>Per una configurazione rapida, utilizzare il metodo <a href="https://milvus.io/api-reference/go/v2.4.x/Collection/CreateCollection.md"><code translate="no">CreateCollection()</code></a> su un'istanza dell'interfaccia <code translate="no">Client</code> utilizzando il metodo <a href="https://milvus.io/api-reference/go/v2.4.x/Connections/NewClient.md"><code translate="no">NewClient()</code></a> per creare un insieme con il nome e la dimensione specificati.</p>
</div>
<div class="language-shell">
<p>Per una configurazione rapida, utilizzare l'endpoint <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Create.md"><code translate="no">POST /v2/vectordb/collections/create</code></a> per creare un insieme con il nome e la dimensione specificati.</p>
</div>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># 1. Set up a Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
)

<span class="hljs-comment"># 2. Create a collection in quick setup mode</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    dimension=<span class="hljs-number">5</span>
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.GetLoadStateReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
    .uri(CLUSTER_ENDPOINT)
    .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-comment">// 2. Create a collection in quick setup mode</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">quickSetupReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .dimension(<span class="hljs-number">5</span>)
    .build();

client.createCollection(quickSetupReq);

<span class="hljs-comment">// Thread.sleep(5000);</span>

<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">quickSetupLoadStateReq</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .build();

<span class="hljs-type">Boolean</span> <span class="hljs-variable">res</span> <span class="hljs-operator">=</span> client.getLoadState(quickSetupLoadStateReq);

System.out.println(res);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-comment">// 1. Set up a Milvus Client</span>
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address});

<span class="hljs-comment">// 2. Create a collection in quick setup mode</span>
<span class="hljs-keyword">let</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">dimension</span>: <span class="hljs-number">5</span>,
});  

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-Go"><span class="hljs-keyword">import</span> (
  <span class="hljs-string">&quot;context&quot;</span>
  <span class="hljs-string">&quot;fmt&quot;</span>
  <span class="hljs-string">&quot;log&quot;</span>
  <span class="hljs-string">&quot;time&quot;</span>

  milvusClient <span class="hljs-string">&quot;github.com/milvus-io/milvus-sdk-go/v2/client&quot;</span> <span class="hljs-comment">// milvusClient is an alias for milvus client package</span>
  <span class="hljs-string">&quot;github.com/milvus-io/milvus-sdk-go/v2/entity&quot;</span>
)

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">main</span><span class="hljs-params">()</span></span> {
    ctx := context.Background()
    ctx, cancel := context.WithTimeout(ctx, <span class="hljs-number">2</span>*time.Second)
    <span class="hljs-keyword">defer</span> cancel()
    <span class="hljs-comment">// 1. Set up a Milvus client</span>
    client, err := milvusClient.NewClient(ctx, milvusClient.Config{
        Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
    })
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatal(<span class="hljs-string">&quot;failed to connect to milvus:&quot;</span>, err.Error())
    }
    <span class="hljs-keyword">defer</span> client.Close()
    
    <span class="hljs-comment">// 2. Create a collection in quick setup mode</span>
    err = client.NewCollection(ctx, <span class="hljs-string">&quot;quick_setup&quot;</span>, <span class="hljs-number">5</span>)
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatal(<span class="hljs-string">&quot;failed to create collection:&quot;</span>, err.Error())
    }
    
    stateLoad, err := client.GetLoadState(context.Background(), <span class="hljs-string">&quot;quick_setup&quot;</span>, []<span class="hljs-type">string</span>{})
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatal(<span class="hljs-string">&quot;failed to get load state:&quot;</span>, err.Error())
    }
    fmt.Println(stateLoad)
    <span class="hljs-comment">// Output</span>
    <span class="hljs-comment">// 3</span>
    
    <span class="hljs-comment">// LoadStateNotExist -&gt; LoadState = 0</span>
    <span class="hljs-comment">// LoadStateNotLoad  -&gt; LoadState = 1</span>
    <span class="hljs-comment">// LoadStateLoading  -&gt; LoadState = 2</span>
    <span class="hljs-comment">// LoadStateLoaded   -&gt; LoadState = 3</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">export</span> MILVUS_URI=<span class="hljs-string">&quot;localhost:19530&quot;</span>

$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/create&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;quick_setup&quot;,
  &quot;dimension&quot;: 5
}&#x27;</span>

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {},</span>
<span class="hljs-comment"># }</span>

$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/get_load_state&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;quick_setup&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;loadProgress&quot;: 100,</span>
<span class="hljs-comment">#         &quot;loadState&quot;: &quot;LoadStateLoaded&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<p>L'insieme generato nel codice precedente contiene solo due campi: <code translate="no">id</code> (come chiave primaria) e <code translate="no">vector</code> (come campo vettore), con le impostazioni <code translate="no">auto_id</code> e <code translate="no">enable_dynamic_field</code> abilitate per default.</p>
<ul>
<li><p><code translate="no">auto_id</code></p>
<p>L'attivazione di questa impostazione fa sì che la chiave primaria si incrementi automaticamente. Non è necessario fornire manualmente le chiavi primarie durante l'inserimento dei dati.</p></li>
<li><p><code translate="no">enable_dynamic_field</code></p>
<p>Quando è abilitata, tutti i campi, esclusi <code translate="no">id</code> e <code translate="no">vector</code> nei dati da inserire, sono trattati come campi dinamici. Questi campi aggiuntivi vengono salvati come coppie chiave-valore all'interno di un campo speciale denominato <code translate="no">$meta</code>. Questa funzione consente di includere campi aggiuntivi durante l'inserimento dei dati.</p></li>
</ul>
<p>La collezione indicizzata e caricata automaticamente dal codice fornito è pronta per l'inserimento immediato dei dati.</p>
<h3 id="Customized-setup" class="common-anchor-header">Configurazione personalizzata</h3><p>Invece di lasciare che Milvus decida quasi tutto per la vostra collezione, potete determinare da soli i <strong>parametri</strong> <strong>dello schema</strong> e dell'<strong>indice</strong> della collezione.</p>
<h4 id="Step-1-Set-up-schema" class="common-anchor-header">Passo 1: Impostazione dello schema</h4><p>Uno schema definisce la struttura di una collezione. All'interno dello schema, si ha la possibilità di abilitare o disabilitare <code translate="no">enable_dynamic_field</code>, aggiungere campi predefiniti e impostare attributi per ogni campo. Per una spiegazione dettagliata del concetto e dei tipi di dati disponibili, consultare <a href="/docs/it/v2.4.x/schema.md">Schema spiegato</a>.</p>
<div class="language-python">
<p>Per impostare uno schema, usare <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a> per creare un oggetto schema e <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md"><code translate="no">add_field()</code></a> per aggiungere campi allo schema.</p>
</div>
<div class="language-java">
<p>Per impostare uno schema, usare <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createSchema.md"><code translate="no">createSchema()</code></a> per creare un oggetto schema e <a href="https://milvus.io/api-reference/java/v2.4.x/v2/CollectionSchema/addField.md"><code translate="no">addField()</code></a> per aggiungere campi allo schema.</p>
</div>
<div class="language-javascript">
<p>Per impostare uno schema, usare <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md"><code translate="no">createCollection()</code></a>.</p>
</div>
</div>
<div class="language-go">
<p>Per impostare uno schema, usare <code translate="no">entity.NewSchema()</code> per creare un oggetto schema e <code translate="no">schema.WithField()</code> per aggiungere campi allo schema.</p>
</div>
<div class="language-shell">
<p>Per impostare uno schema, è necessario definire un oggetto JSON che segua il formato dello schema visualizzato nella pagina di riferimento dell'endpoint API. <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Create.md"><code translate="no">POST /v2/vectordb/collections/create</code></a> pagina di riferimento dell'endpoint API.</p>
</div>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. Create a collection in customized setup mode</span>

<span class="hljs-comment"># 3.1. Create schema</span>
schema = MilvusClient.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># 3.2. Add fields to schema</span>
schema.add_field(field_name=<span class="hljs-string">&quot;my_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;my_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-comment">// 3. Create a collection in customized setup mode</span>

<span class="hljs-comment">// 3.1 Create schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

<span class="hljs-comment">// 3.2 Add fields to schema</span>
schema.addField(AddFieldReq.builder()
    .fieldName(<span class="hljs-string">&quot;my_id&quot;</span>)
    .dataType(DataType.Int64)
    .isPrimaryKey(<span class="hljs-literal">true</span>)
    .autoID(<span class="hljs-literal">false</span>)
    .build());

schema.addField(AddFieldReq.builder()
    .fieldName(<span class="hljs-string">&quot;my_vector&quot;</span>)
    .dataType(DataType.FloatVector)
    .dimension(<span class="hljs-number">5</span>)
    .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3. Create a collection in customized setup mode</span>
<span class="hljs-comment">// 3.1 Define fields</span>
<span class="hljs-keyword">const</span> fields = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">false</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>
    },
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// 3. Create a collection in customized setup mode</span>

<span class="hljs-comment">// 3.1 Create schema</span>
schema := entity.NewSchema()

<span class="hljs-comment">// 3.2. Add fields to schema</span>
schema.WithField(
    entity.NewField().
        WithName(<span class="hljs-string">&quot;my_id&quot;</span>).
        WithDataType(entity.FieldTypeInt64).
        WithIsPrimaryKey(<span class="hljs-literal">false</span>).
        WithIsAutoID(<span class="hljs-literal">true</span>)).
    WithField(
        entity.NewField().
            WithName(<span class="hljs-string">&quot;my_vector&quot;</span>).
            WithDataType(entity.FieldTypeFloatVector).
            WithDim(<span class="hljs-number">5</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">export</span> fields=<span class="hljs-string">&#x27;[{ \
    &quot;fieldName&quot;: &quot;my_id&quot;, \
    &quot;dataType&quot;: &quot;Int64&quot;, \
    &quot;isPrimary&quot;: true \
}, \
{ \
    &quot;fieldName&quot;: &quot;my_vector&quot;, \
    &quot;dataType&quot;: &quot;FloatVector&quot;, \
    &quot;elementTypeParams&quot;: { \
        &quot;dim&quot;: 5 \
    } \
}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table class="language-python">
  <thead>
    <tr>
      <th>Parametro</th>
      <th>Descrizione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">auto_id</code></td>
      <td>Determina se il campo primario si incrementa automaticamente.<br/>Se si imposta su <strong>Vero</strong>, il campo primario si incrementa automaticamente. In questo caso, il campo primario non deve essere incluso nei dati da inserire per evitare errori. Gli ID generati automaticamente hanno una lunghezza fissa e non possono essere modificati.</td>
    </tr>
    <tr>
      <td><code translate="no">enable_dynamic_field</code></td>
      <td>Determina se Milvus salva i valori dei campi non definiti in un campo dinamico se i dati inseriti nella collezione di destinazione includono campi non definiti nello schema della collezione.<br/>Quando si imposta questa opzione su <strong>True</strong>, Milvus crea un campo chiamato <strong>$meta</strong> per memorizzare i campi non definiti e i loro valori dai dati inseriti.</td>
    </tr>
    <tr>
      <td><code translate="no">field_name</code></td>
      <td>Il nome del campo.</td>
    </tr>
    <tr>
      <td><code translate="no">datatype</code></td>
      <td>Il tipo di dati del campo. Per un elenco dei tipi di dati disponibili, consultare <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/DataType.md">Tipo di dati</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">is_primary</code></td>
      <td>Se il campo corrente è il campo primario di un insieme.<br/>Ogni insieme ha un solo campo primario. Un campo primario deve essere di tipo <strong>DataType.INT64</strong> o <strong>DataType.VARCHAR</strong>.</td>
    </tr>
    <tr>
      <td><code translate="no">dim</code></td>
      <td>La dimensione delle incorporazioni vettoriali.<br/>È obbligatoria per un campo di tipo <strong>DataType.FLOAT_VECTOR</strong>, <strong>DataType.BINARY_VECTOR</strong>, <strong>DataType.FLOAT16_VECTOR</strong> o <strong>DataType.BFLOAT16_VECTOR</strong>. Se si utilizza <strong>DataType.SPARSE_FLOAT_VECTOR</strong>, omettere questo parametro.</td>
    </tr>
  </tbody>
</table>
<table class="language-java">
  <thead>
    <tr>
      <th>Parametro</th>
      <th>Descrizione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">fieldName</code></td>
      <td>Il nome del campo.</td>
    </tr>
    <tr>
      <td><code translate="no">dataType</code></td>
      <td>Il tipo di dati del campo. Per un elenco dei tipi di dati disponibili, consultare <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/DataType.md">DataType</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">isPrimaryKey</code></td>
      <td>Se il campo corrente è il campo primario di un insieme.<br/>Ogni insieme ha un solo campo primario. Un campo primario deve essere del tipo <strong>DataType.Int64</strong> o del tipo <strong>DataType.VarChar</strong>.</td>
    </tr>
    <tr>
      <td><code translate="no">autoID</code></td>
      <td>Se permette al campo primario di incrementarsi automaticamente.<br/>Se si imposta <strong>true</strong>, il campo primario si incrementa automaticamente. In questo caso, il campo primario non deve essere incluso nei dati da inserire per evitare errori.</td>
    </tr>
    <tr>
      <td><code translate="no">dimension</code></td>
      <td>La dimensione delle incorporazioni vettoriali.<br/>È obbligatoria per un campo di tipo <strong>DataType.FloatVector</strong>, <strong>DataType.BinaryVector</strong>, <strong>DataType.Float16Vector</strong> o <strong>DataType.BFloat16Vector</strong>.</td>
    </tr>
  </tbody>
</table>
<table class="language-javascript">
  <thead>
    <tr>
      <th>Parametro</th>
      <th>Descrizione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">name</code></td>
      <td>Il nome del campo.</td>
    </tr>
    <tr>
      <td><code translate="no">data_type</code></td>
      <td>Il tipo di dati del campo. Per un'enumerazione di tutti i tipi di dati disponibili, consultare <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/DataType.md">DataType</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">is_primary_key</code></td>
      <td>Se il campo corrente è il campo primario di un insieme.<br/>Ogni insieme ha un solo campo primario. Un campo primario deve essere del tipo <strong>DataType.INT64</strong> o del tipo <strong>DataType.VARCHAR</strong>.</td>
    </tr>
    <tr>
      <td><code translate="no">auto_id</code></td>
      <td>Se il campo primario si incrementa automaticamente all'inserimento dei dati in questa collezione.<br/>Il valore predefinito è <strong>Falso</strong>. Impostando <strong>True</strong>, il campo primario si incrementa automaticamente. Ignorare questo parametro se si deve impostare una collezione con uno schema personalizzato.</td>
    </tr>
    <tr>
      <td><code translate="no">dim</code></td>
      <td>La dimensionalità del campo della raccolta che contiene le incorporazioni vettoriali.<br/>Il valore deve essere un intero maggiore di 1 e di solito è determinato dal modello utilizzato per generare le incorporazioni vettoriali.</td>
    </tr>
  </tbody>
</table>
<table class="language-go">
  <thead>
    <tr>
      <th>Parametro</th>
      <th>Descrizione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">WithName()</code></td>
      <td>Il nome del campo.</td>
    </tr>
    <tr>
      <td><code translate="no">WithDataType()</code></td>
      <td>Il tipo di dati del campo.</td>
    </tr>
    <tr>
      <td><code translate="no">WithIsPrimaryKey()</code></td>
      <td>Se il campo corrente è il campo primario di una collezione.<br/>Ogni collezione ha un solo campo primario. Un campo primario deve essere del tipo <strong>entity.FieldTypeInt64</strong> o del tipo <strong>entity.FieldTypeVarChar</strong>.</td>
    </tr>
    <tr>
      <td><code translate="no">WithIsAutoID()</code></td>
      <td>Se il campo primario si incrementa automaticamente all'inserimento di dati in questa collezione.<br/>Il valore predefinito è <strong>false</strong>. Impostando <strong>true</strong>, il campo primario si incrementa automaticamente. Ignorare questo parametro se si deve impostare una collezione con uno schema personalizzato.</td>
    </tr>
    <tr>
      <td><code translate="no">WithDim()</code></td>
      <td>La dimensionalità del campo della raccolta che contiene le incorporazioni vettoriali.<br/>Il valore deve essere un intero maggiore di 1 e di solito è determinato dal modello utilizzato per generare le incorporazioni vettoriali.</td>
    </tr>
  </tbody>
</table>
<table class="language-shell">
  <thead>
    <tr>
      <th>Parametro</th>
      <th>Descrizione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">fieldName</code></td>
      <td>Il nome del campo da creare nella collezione di destinazione.</td>
    </tr>
    <tr>
      <td><code translate="no">dataType</code></td>
      <td>Il tipo di dati dei valori del campo.</td>
    </tr>
    <tr>
      <td><code translate="no">isPrimary</code></td>
      <td>Se il campo corrente è il campo primario. Impostando questo valore su <code translate="no">True</code>, il campo corrente diventa il campo primario.</td>
    </tr>
    <tr>
      <td><code translate="no">elementTypeParams</code></td>
      <td>Parametri extra del campo.</td>
    </tr>
    <tr>
      <td><code translate="no">dim</code></td>
      <td>Un parametro opzionale per i campi FloatVector o BinaryVector che determina la dimensione del vettore.</td>
    </tr>
  </tbody>
</table>
<h4 id="Step-2-Set-up-index-parameters" class="common-anchor-header">Passo 2: Impostazione dei parametri di indice</h4><p>I parametri di indice determinano il modo in cui Milvus organizza i dati all'interno di una collezione. È possibile personalizzare il processo di indicizzazione per campi specifici regolando i loro <code translate="no">metric_type</code> e <code translate="no">index_type</code>. Per il campo vettoriale, è possibile selezionare <code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">HAMMING</code>, o <code translate="no">JACCARD</code> come <code translate="no">metric_type</code>, a seconda del tipo di vettori con cui si lavora. Per ulteriori informazioni, consultare <a href="/docs/it/v2.4.x/metric.md">Metriche di somiglianza</a>.</p>
<div class="language-python">
<p>Per impostare i parametri dell'indice, usare <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/prepare_index_params.md"><code translate="no">prepare_index_params()</code></a> per preparare i parametri dell'indice e <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md"><code translate="no">add_index()</code></a> per aggiungere l'indice.</p>
</div>
<div class="language-java">
<p>Per impostare i parametri dell'indice, usare <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md">IndexParam</a>.</p>
</div>
<div class="language-javascript">
<p>Per impostare i parametri dell'indice, usare <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>.</p>
</div>
<div class="language-go">
<p>Per impostare i parametri dell'indice, usare <a href="https://milvus.io/api-reference/go/v2.4.x/Index/CreateIndex.md"><code translate="no">CreateIndex()</code></a>.</p>
</div>
<div class="language-shell">
<p>Per impostare i parametri dell'indice, è necessario definire un oggetto JSON che segua il formato dei parametri dell'indice, come indicato nella pagina di riferimento dell'endpoint API. <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Create.md"><code translate="no">POST /v2/vectordb/collections/create</code></a> pagina di riferimento dell'endpoint API.</p>
</div>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-meta"># 3.3. Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-meta"># 3.4. Add indexes</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;my_id&quot;</span>,
    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;my_vector&quot;</span>, 
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
    <span class="hljs-keyword">params</span>={ <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span> }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

<span class="hljs-comment">// 3.3 Prepare index parameters</span>
<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForIdField</span> <span class="hljs-operator">=</span> IndexParam.builder()
    .fieldName(<span class="hljs-string">&quot;my_id&quot;</span>)
    .indexType(IndexParam.IndexType.STL_SORT)
    .build();

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForVectorField</span> <span class="hljs-operator">=</span> IndexParam.builder()
    .fieldName(<span class="hljs-string">&quot;my_vector&quot;</span>)
    .indexType(IndexParam.IndexType.IVF_FLAT)
    .metricType(IndexParam.MetricType.L2)
    .extraParams(Map.of(<span class="hljs-string">&quot;nlist&quot;</span>, <span class="hljs-number">1024</span>))
    .build();

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(indexParamForIdField);
indexParams.add(indexParamForVectorField);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3.2 Prepare index parameters</span>
<span class="hljs-keyword">const</span> index_params = [{
    field_name: <span class="hljs-string">&quot;my_id&quot;</span>,
    index_type: <span class="hljs-string">&quot;STL_SORT&quot;</span>
},{
    field_name: <span class="hljs-string">&quot;my_vector&quot;</span>,
    index_type: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    metric_type: <span class="hljs-string">&quot;IP&quot;</span>,
    <span class="hljs-keyword">params</span>: { nlist: <span class="hljs-number">1024</span>}
}]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// 3.3 Prepare index parameters</span>
idxID := entity.NewScalarIndexWithType(entity.Sorted)

idxVector, err := entity.NewIndexIvfFlat(entity.IP, <span class="hljs-number">1024</span>)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
  log.Fatal(<span class="hljs-string">&quot;failed to new index:&quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">export</span> indexParams=<span class="hljs-string">&#x27;[{ \
    &quot;fieldName&quot;: &quot;my_id&quot;, \
    &quot;indexName&quot;: &quot;my_id&quot;, \
    &quot;params&quot;: { \
        &quot;index_type&quot;: &quot;SLT_SORT&quot; \
  } \
}, { \
    &quot;fieldName&quot;: &quot;my_vector&quot;, \
    &quot;metricType&quot;: &quot;COSINE&quot;, \
    &quot;indexName&quot;: &quot;my_vector&quot;, \
    &quot;params&quot;: { \
        &quot;index_type&quot;: &quot;IVF_FLAT&quot;, \
        &quot;nlist&quot;: 1024 \
  } \
}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table class="language-python">
  <thead>
    <tr>
      <th>Parametro</th>
      <th>Descrizione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">field_name</code></td>
      <td>Il nome del file di destinazione a cui si applica questo oggetto.</td>
    </tr>
    <tr>
      <td><code translate="no">index_type</code></td>
      <td>Il nome dell'algoritmo utilizzato per organizzare i dati nel campo specifico. Per gli algoritmi applicabili, fare riferimento a <a href="https://milvus.io/docs/index.md">Indice in memoria</a> e <a href="https://milvus.io/docs/disk_index.md">Indice su disco</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">metric_type</code></td>
      <td>L'algoritmo utilizzato per misurare la somiglianza tra i vettori. I valori possibili sono <strong>IP</strong>, <strong>L2</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING</strong>. È disponibile solo quando il campo specificato è un campo vettoriale. Per ulteriori informazioni, consultare la sezione <a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Indici supportati in Milvus</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">params</code></td>
      <td>I parametri di regolazione fine per il tipo di indice specificato. Per maggiori dettagli sulle chiavi e gli intervalli di valori possibili, consultare <a href="https://milvus.io/docs/index.md">Indice in memoria</a>.</td>
    </tr>
  </tbody>
</table>
<table class="language-java">
  <thead>
    <tr>
      <th>Parametro</th>
      <th>Descrizione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">fieldName</code></td>
      <td>Il nome del campo di destinazione a cui si applica questo oggetto IndexParam.</td>
    </tr>
    <tr>
      <td><code translate="no">indexType</code></td>
      <td>Il nome dell'algoritmo utilizzato per organizzare i dati nel campo specifico. Per gli algoritmi applicabili, fare riferimento a <a href="https://milvus.io/docs/index.md">Indice in memoria</a> e <a href="https://milvus.io/docs/disk_index.md">Indice su disco</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">metricType</code></td>
      <td>La metrica di distanza da utilizzare per l'indice. I valori possibili sono <strong>IP</strong>, <strong>L2</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING</strong>.</td>
    </tr>
    <tr>
      <td><code translate="no">extraParams</code></td>
      <td>Parametri extra dell'indice. Per i dettagli, fare riferimento a <a href="https://milvus.io/docs/index.md">Indice in memoria</a> e <a href="https://milvus.io/docs/disk_index.md">Indice su disco</a>.</td>
    </tr>
  </tbody>
</table>
<table class="language-javascript">
  <thead>
    <tr>
      <th>Parametro</th>
      <th>Descrizione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">field_name</code></td>
      <td>Il nome del campo di destinazione su cui creare un indice.</td>
    </tr>
    <tr>
      <td><code translate="no">index_type</code></td>
      <td>Il nome dell'algoritmo utilizzato per organizzare i dati nel campo specifico. Per gli algoritmi applicabili, fare riferimento a <a href="https://milvus.io/docs/index.md">Indice in memoria</a> e <a href="https://milvus.io/docs/disk_index.md">Indice su disco</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">metric_type</code></td>
      <td>L'algoritmo utilizzato per misurare la somiglianza tra i vettori. I valori possibili sono <strong>IP</strong>, <strong>L2</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING</strong>. È disponibile solo quando il campo specificato è un campo vettoriale. Per ulteriori informazioni, consultare la sezione <a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Indici supportati in Milvus</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">params</code></td>
      <td>I parametri di regolazione fine per il tipo di indice specificato. Per maggiori dettagli sulle chiavi e gli intervalli di valori possibili, consultare <a href="https://milvus.io/docs/index.md">Indice in memoria</a>.</td>
    </tr>
  </tbody>
</table>
<table class="language-go">
  <thead>
    <tr>
      <th>Parametro</th>
      <th>Descrizione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">index_type</code></td>
      <td>Il nome dell'algoritmo utilizzato per organizzare i dati nel campo specifico. Per gli algoritmi applicabili, fare riferimento a <a href="https://milvus.io/docs/index.md">Indice in memoria</a> e <a href="https://milvus.io/docs/disk_index.md">Indice su disco</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">metric_type</code></td>
      <td>L'algoritmo utilizzato per misurare la somiglianza tra i vettori. I valori possibili sono <strong>IP</strong>, <strong>L2</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING</strong>. È disponibile solo quando il campo specificato è un campo vettoriale. Per ulteriori informazioni, consultare la sezione <a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Indici supportati in Milvus</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">nlist</code></td>
      <td>Numero di unità cluster. Le unità cluster sono utilizzate negli indici basati su IVF (Inverted File) in Milvus. Per IVF_FLAT, l'indice divide i dati vettoriali in `liste` di unità di cluster e poi confronta le distanze tra il vettore di input di destinazione e il centro di ciascun cluster1. Deve essere compreso tra 1 e 65536.</td>
    </tr>
  </tbody>
</table>
<table class="language-shell">
  <thead>
    <tr>
      <th>Parametro</th>
      <th>Descrizione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">fieldName</code></td>
      <td>Il nome del campo di destinazione su cui creare un indice.</td>
    </tr>
    <tr>
      <td><code translate="no">indexName</code></td>
      <td>Il nome dell'indice da creare. Il valore predefinito è il nome del campo di destinazione.</td>
    </tr>
    <tr>
      <td><code translate="no">metricType</code></td>
      <td>L'algoritmo utilizzato per misurare la somiglianza tra i vettori. I valori possibili sono <strong>IP</strong>, <strong>L2</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING</strong>. È disponibile solo quando il campo specificato è un campo vettoriale. Per ulteriori informazioni, consultare la sezione <a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Indici supportati in Milvus</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">params</code></td>
      <td>Il tipo di indice e le relative impostazioni. Per ulteriori informazioni, vedere <a href="https://milvus.io/docs/index.md">Indice in memoria</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">params.index_type</code></td>
      <td>Il tipo di indice da creare.</td>
    </tr>
    <tr>
      <td><code translate="no">params.nlist</code></td>
      <td>Il numero di unità cluster. Questo vale per i tipi di indice legati alla FIV.</td>
    </tr>
  </tbody>
</table>
<p>Il frammento di codice qui sopra mostra come impostare i parametri dell'indice rispettivamente per un campo vettoriale e per un campo scalare. Per il campo vettoriale, impostare sia il tipo di metrica che il tipo di indice. Per un campo scalare, impostare solo il tipo di indice. Si consiglia di creare un indice per il campo vettoriale e per tutti i campi scalari che vengono utilizzati frequentemente per il filtraggio.</p>
<h4 id="Step-3-Create-the-collection" class="common-anchor-header">Passo 3: Creare l'insieme</h4><p>Si può scegliere di creare una collezione e un file indice separatamente o di creare una collezione con l'indice caricato contemporaneamente alla creazione.</p>
<div class="language-python">
<p>Usare <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md">create_collection()</a> per creare una collezione con i parametri di schema e indice specificati e <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/get_load_state.md">get_load_state()</a> per verificare lo stato di caricamento della collezione.</p>
</div>
<div class="language-java">
<p>Usare <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md">createCollection()</a> per creare una collezione con i parametri di schema e indice specificati e <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/getLoadState.md">getLoadState()</a> per verificare lo stato di caricamento della collezione.</p>
</div>
<div class="language-javascript">
<p>Usare <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md">createCollection()</a> per creare un insieme con i parametri di schema e indice specificati e <a href="https://milvus.io/api-reference/node/v2.4.x/Management/getLoadState.md">getLoadState()</a> per verificare lo stato di caricamento dell'insieme.</p>
</div>
<ul>
<li><p><strong>Creare una collezione con l'indice caricato contemporaneamente alla creazione.</strong></p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a><a href="#shell">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3.5. Create a collection with the index loaded simultaneously</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_1&quot;</span>,
    schema=schema,
    index_params=index_params
)

time.sleep(<span class="hljs-number">5</span>)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;customized_setup_1&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.GetLoadStateReq;

<span class="hljs-comment">// 3.4 Create a collection with schema and index parameters</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq1</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_1&quot;</span>)
    .collectionSchema(schema)
    .indexParams(indexParams)
    .build();

client.createCollection(customizedSetupReq1);

<span class="hljs-comment">// Thread.sleep(5000);</span>

<span class="hljs-comment">// 3.5 Get load state of the collection</span>
<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">customSetupLoadStateReq1</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_1&quot;</span>)
    .build();

res = client.getLoadState(customSetupLoadStateReq1);

System.out.println(res);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3.3 Create a collection with fields and index parameters</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_1&quot;</span>,
    <span class="hljs-attr">fields</span>: fields,
    <span class="hljs-attr">index_params</span>: index_params,
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)  

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_1&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">//   </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/create&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_1&quot;,
    &quot;schema&quot;: {
        &quot;autoId&quot;: false,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;my_id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;my_vector&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;5&quot;
                }
            }
        ]
    },
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;my_vector&quot;,
            &quot;metricType&quot;: &quot;COSINE&quot;,
            &quot;indexName&quot;: &quot;my_vector&quot;,
            &quot;params&quot;: {
                &quot;index_type&quot;: &quot;IVF_FLAT&quot;,
                &quot;nlist&quot;: &quot;1024&quot;
            }
        },
        {
            &quot;fieldName&quot;: &quot;my_id&quot;,
            &quot;indexName&quot;: &quot;my_id&quot;,
            &quot;params&quot;: {
                &quot;index_type&quot;: &quot;STL_SORT&quot;
            }            
        }
    ]
}&#x27;</span>

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {},</span>
<span class="hljs-comment"># }</span>

$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/get_load_state&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_1&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;loadProgress&quot;: 100,</span>
<span class="hljs-comment">#         &quot;loadState&quot;: &quot;LoadStateLoaded&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<p>La raccolta creata in precedenza viene caricata automaticamente. Per ulteriori informazioni sul caricamento e il rilascio di una raccolta, consultare <a href="/docs/it/v2.4.x/manage-collections.md#Load--Release-Collection">Carica e rilascia una raccolta</a>.</p></li>
<li><p><strong>Creare una raccolta e un file di indice separatamente.</strong></p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a><a href="#go">Go</a><a href="#shell">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3.6. Create a collection and index it separately</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    schema=schema,
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: NotLoad&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 3.6 Create a collection and index it separately</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq2</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .collectionSchema(schema)
    .build();

client.createCollection(customizedSetupReq2);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3.4 Create a collection and index it seperately</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    <span class="hljs-attr">fields</span>: fields,
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateNotLoad</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// 3.4 Create a collection and index it seperately</span>
schema.CollectionName = <span class="hljs-string">&quot;customized_setup_2&quot;</span>
client.CreateCollection(ctx, schema, entity.DefaultShardNumber)

stateLoad, err := client.GetLoadState(context.Background(), <span class="hljs-string">&quot;customized_setup_2&quot;</span>, []<span class="hljs-type">string</span>{})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to get load state:&quot;</span>, err.Error())
}
fmt.Println(stateLoad)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// 1</span>

<span class="hljs-comment">// LoadStateNotExist -&gt; LoadState = 0</span>
<span class="hljs-comment">// LoadStateNotLoad  -&gt; LoadState = 1</span>
<span class="hljs-comment">// LoadStateLoading  -&gt; LoadState = 2</span>
<span class="hljs-comment">// LoadStateLoaded   -&gt; LoadState = 3</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/create&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;,
    &quot;schema&quot;: {
        &quot;autoId&quot;: false,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;my_id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;my_vector&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;5&quot;
                }
            }
        ]
        
    }
}&#x27;</span>

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {},</span>
<span class="hljs-comment"># }</span>

$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/get_load_state&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;loadState&quot;: &quot;LoadStateNotLoaded&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<p>L'insieme creato sopra non viene caricato automaticamente. È possibile creare un indice per la raccolta come segue. La creazione di un indice per la raccolta in modo separato non carica automaticamente la raccolta. Per ulteriori informazioni, consultare la sezione <a href="/docs/it/v2.4.x/manage-collections.md#Load--Release-Collection">Caricare e rilasciare la raccolta</a>.</p>
<p><table class="language-python">
<thead>
<tr>
<th>Parametro</th>
<th>Descrizione</th>
</tr>
</thead>
<tbody>
<tr>
<td><code translate="no">collection_name</code></td>
<td>Il nome della raccolta.</td>
</tr>
<tr>
<td><code translate="no">schema</code></td>
<td>Lo schema di questa raccolta.<br/>Impostando questo valore a <strong>Nessuno</strong>, la raccolta verrà creata con le impostazioni predefinite.<br/>Per impostare una raccolta con uno schema personalizzato, è necessario creare un oggetto <strong>CollectionSchema</strong> e fare riferimento a questo oggetto. In questo caso, Milvus ignora tutte le altre impostazioni relative allo schema contenute nella richiesta.</td>
</tr>
<tr>
<td><code translate="no">index_params</code></td>
<td>I parametri per costruire l'indice sul campo vettoriale di questa collezione. Per impostare una collezione con uno schema personalizzato e caricare automaticamente la collezione in memoria, è necessario creare un oggetto IndexParams e fare riferimento qui.<br/>È necessario aggiungere almeno un indice per il campo vettoriale di questa collezione. Si può anche saltare questo parametro se si preferisce impostare i parametri dell'indice in un secondo momento.</td>
</tr>
</tbody>
</table></p>
<p><table class="language-java">
<thead>
<tr>
<th>Parametro</th>
<th>Descrizione</th>
</tr>
</thead>
<tbody>
<tr>
<td><code translate="no">collectionName</code></td>
<td>Il nome della collezione.</td>
</tr>
<tr>
<td><code translate="no">collectionSchema</code></td>
<td>Lo schema di questa raccolta.<br/>Lasciando vuoto questo parametro si indica che la raccolta verrà creata con le impostazioni predefinite. Per impostare un insieme con uno schema personalizzato, è necessario creare un oggetto <strong>CollectionSchema</strong> e fare riferimento ad esso.</td>
</tr>
<tr>
<td><code translate="no">indexParams</code></td>
<td>I parametri per costruire l'indice sul campo vettoriale di questa collezione. Per impostare una collezione con uno schema personalizzato e caricare automaticamente la collezione in memoria, creare un oggetto <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md">IndexParams</a> con un elenco di oggetti IndexParam e fare riferimento qui.</td>
</tr>
</tbody>
</table></p>
<p><table class="language-javascript">
<thead>
<tr>
<th>Parametro</th>
<th>Descrizione</th>
</tr>
</thead>
<tbody>
<tr>
<td><code translate="no">collection_name</code></td>
<td>Il nome dell'insieme.</td>
</tr>
<tr>
<td><code translate="no">fields</code></td>
<td>I campi della collezione.</td>
</tr>
<tr>
<td><code translate="no">index_params</code></td>
<td>I parametri dell'indice per la collezione da creare.</td>
</tr>
</tbody>
</table></p>
<p><table class="language-go">
<thead>
<tr>
<th>Parametro</th>
<th>Descrizione</th>
</tr>
</thead>
<tbody>
<tr>
<td><code translate="no">schema.CollectionName</code></td>
<td>Il nome della collezione.</td>
</tr>
<tr>
<td><code translate="no">schema</code></td>
<td>Lo schema di questa raccolta.</td>
</tr>
<tr>
<td><code translate="no">index_params</code></td>
<td>I parametri dell'indice per la raccolta da creare.</td>
</tr>
</tbody>
</table></p>
<p><table class="language-shell">
<thead>
<tr>
<th>Parametro</th>
<th>Descrizione</th>
</tr>
</thead>
<tbody>
<tr>
<td><code translate="no">collectionName</code></td>
<td>Il nome della raccolta.</td>
</tr>
<tr>
<td><code translate="no">schema</code></td>
<td>Lo schema è responsabile dell'organizzazione dei dati nella raccolta di destinazione. Uno schema valido deve avere più campi, che devono includere una chiave primaria, un campo vettore e diversi campi scalari.</td>
</tr>
<tr>
<td><code translate="no">schema.autoID</code></td>
<td>Se permette al campo primario di incrementarsi automaticamente. Impostando True, il campo primario si incrementa automaticamente. In questo caso, il campo primario non dovrebbe essere incluso nei dati da inserire per evitare errori. Impostare questo parametro nel campo con is_primary impostato su True.</td>
</tr>
<tr>
<td><code translate="no">schema.enableDynamicField</code></td>
<td>Se permette di usare il campo riservato $meta per contenere campi non definiti dallo schema in coppie chiave-valore.</td>
</tr>
<tr>
<td><code translate="no">fields</code></td>
<td>Un elenco di oggetti campo.</td>
</tr>
<tr>
<td><code translate="no">fields.fieldName</code></td>
<td>Il nome del campo da creare nell'insieme di destinazione.</td>
</tr>
<tr>
<td><code translate="no">fields.dataType</code></td>
<td>Il tipo di dati dei valori del campo.</td>
</tr>
<tr>
<td><code translate="no">fields.isPrimary</code></td>
<td>Se il campo corrente è il campo primario. Impostando True, il campo corrente diventa il campo primario.</td>
</tr>
<tr>
<td><code translate="no">fields.elementTypeParams</code></td>
<td>Parametri extra del campo.</td>
</tr>
<tr>
<td><code translate="no">fields.elementTypeParams.dim</code></td>
<td>Un parametro opzionale per i campi FloatVector o BinaryVector che determina la dimensione del vettore.</td>
</tr>
</tbody>
</table></p>
<p>L'insieme creato in precedenza non viene caricato automaticamente. È possibile creare un indice per l'insieme come segue. La creazione di un indice per l'insieme in modo separato non carica automaticamente l'insieme. Per maggiori dettagli, consultare <a href="/docs/it/v2.4.x/manage-collections.md">Carica e rilascia la collezione</a>.</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a><a href="#go">Go</a><a href="#shell">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3.6 Create index</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    index_params=index_params
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: NotLoad&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateIndexReq</span>  <span class="hljs-variable">createIndexReq</span> <span class="hljs-operator">=</span> CreateIndexReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .indexParams(indexParams)
    .build();

client.createIndex(createIndexReq);

<span class="hljs-comment">// Thread.sleep(1000);</span>

<span class="hljs-comment">// 3.7 Get load state of the collection</span>
<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">customSetupLoadStateReq2</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .build();

res = client.getLoadState(customSetupLoadStateReq2);

System.out.println(res);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// false</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3.5 Create index</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;my_vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;IP&quot;</span>,
    <span class="hljs-attr">params</span>: { <span class="hljs-attr">nlist</span>: <span class="hljs-number">1024</span>}
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateNotLoad</span>
<span class="hljs-comment">//</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// 3.5 Create index</span>
client.CreateIndex(ctx, <span class="hljs-string">&quot;customized_setup_2&quot;</span>, <span class="hljs-string">&quot;my_id&quot;</span>, idxID, <span class="hljs-literal">false</span>)
client.CreateIndex(ctx, <span class="hljs-string">&quot;customized_setup_2&quot;</span>, <span class="hljs-string">&quot;my_vector&quot;</span>, idxVector, <span class="hljs-literal">false</span>)

stateLoad, err = client.GetLoadState(context.Background(), <span class="hljs-string">&quot;customized_setup_2&quot;</span>, []<span class="hljs-type">string</span>{})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to get load state:&quot;</span>, err.Error())
}
fmt.Println(stateLoad)
<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// 1</span>

<span class="hljs-comment">// LoadStateNotExist -&gt; LoadState = 0</span>
<span class="hljs-comment">// LoadStateNotLoad  -&gt; LoadState = 1</span>
<span class="hljs-comment">// LoadStateLoading  -&gt; LoadState = 2</span>
<span class="hljs-comment">// LoadStateLoaded   -&gt; LoadState = 3</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/indexes/create&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;metricType&quot;: &quot;L2&quot;,
            &quot;fieldName&quot;: &quot;my_vector&quot;,
            &quot;indexName&quot;: &quot;my_vector&quot;,
            &quot;indexConfig&quot;: {
                &quot;index_type&quot;: &quot;IVF_FLAT&quot;,
                &quot;nlist&quot;: &quot;1024&quot;
            }
        }
    ]
}&#x27;</span>

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {},</span>
<span class="hljs-comment"># }</span>

$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/get_load_state&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;loadState&quot;: &quot;LoadStateNotLoaded&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
  <table class="language-python">
  <thead>
    <tr>
      <th>Parametro</th>
      <th>Descrizione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collection_name</code></td>
      <td>Il nome della collezione.</td>
    </tr>
    <tr>
      <td><code translate="no">index_params</code></td>
      <td>Un oggetto <strong>IndexParams</strong> contenente un elenco di oggetti <strong>IndexParam</strong>.</td>
    </tr>
  </tbody>
</table>
</li>
</ul>
<table class="language-java">
  <thead>
    <tr>
      <th>Parametro</th>
      <th>Descrizione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collectionName</code></td>
      <td>Il nome della collezione.</td>
    </tr>
    <tr>
      <td><code translate="no">indexParams</code></td>
      <td>Un elenco di oggetti <strong>IndexParam</strong>.</td>
    </tr>
  </tbody>
</table>
<table class="language-javascript">
  <thead>
    <tr>
      <th>Parametro</th>
      <th>Descrizione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collection_name</code></td>
      <td>Il nome della collezione.</td>
    </tr>
    <tr>
      <td><code translate="no">field_name</code></td>
      <td>Il nome del campo in cui creare un indice.</td>
    </tr>
    <tr>
      <td><code translate="no">index_type</code></td>
      <td>Il nome dell'algoritmo utilizzato per organizzare i dati nel campo specifico. Per gli algoritmi applicabili, fare riferimento a <a href="https://milvus.io/docs/index.md">Indice in memoria</a> e <a href="https://milvus.io/docs/disk_index.md">Indice su disco</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">metric_type</code></td>
      <td>L'algoritmo utilizzato per misurare la somiglianza tra i vettori. I valori possibili sono <strong>IP</strong>, <strong>L2</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING</strong>. È disponibile solo quando il campo specificato è un campo vettoriale. Per ulteriori informazioni, consultare la sezione <a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Indici supportati in Milvus</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">params</code></td>
      <td>I parametri di regolazione fine per il tipo di indice specificato. Per maggiori dettagli sulle chiavi e gli intervalli di valori possibili, consultare <a href="https://milvus.io/docs/index.md">Indice in memoria</a>.</td>
    </tr>
  </tbody>
</table>
<table class="language-go">
  <thead>
    <tr>
      <th>Parametro</th>
      <th>Descrizione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collName</code></td>
      <td>Il nome della collezione.</td>
    </tr>
    <tr>
      <td><code translate="no">fieldName</code></td>
      <td>Il nome del campo in cui creare un indice.</td>
    </tr>
    <tr>
      <td><code translate="no">idx</code></td>
      <td>Il nome dell'algoritmo utilizzato per organizzare i dati nel campo specifico. Per gli algoritmi applicabili, consultare <a href="https://milvus.io/docs/index.md">Indice in memoria</a> e <a href="https://milvus.io/docs/disk_index.md">Indice su disco</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">async</code></td>
      <td>Se l'operazione è asincrona.</td>
    </tr>
    <tr>
      <td><code translate="no">opts</code></td>
      <td>I parametri di regolazione fine per il tipo di indice specificato. È possibile includere più `entity.IndexOption` in questa richiesta. Per i dettagli sulle chiavi e gli intervalli di valori possibili, fare riferimento a <a href="https://milvus.io/docs/index.md">Indice in memoria</a>.</td>
    </tr>
  </tbody>
</table>
<table class="language-shell">
    <thead>
        <tr>
        <th>Parametro</th>
        <th>Descrizione</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <td><code translate="no">collectionName</code></td>
        <td>Il nome della collezione.</td>
        </tr>
        <tr>
        <td><code translate="no">indexParams</code></td>
        <td>I parametri dell'indice per la raccolta da creare.</td>
        </tr>
        <tr>
        <td><code translate="no">indexParams.metricType</code></td>
        <td>Il tipo di metrica di somiglianza utilizzata per costruire l'indice. Il valore predefinito è COSINE.</td>
        </tr>
        <tr>
        <td><code translate="no">indexParams.fieldName</code></td>
        <td>Il nome del campo di destinazione su cui creare un indice.</td>
        </tr>
        <tr>
        <td><code translate="no">indexParams.indexName</code></td>
        <td>Il nome dell'indice da creare; il valore predefinito è il nome del campo di destinazione.</td>
        </tr>
        <tr>
        <td><code translate="no">indexParams.indexConfig.index_type</code></td>
        <td>Il tipo di indice da creare.</td>
        </tr>
        <tr.>
        <td><code translate="no">indexParams.indexConfig.nlist</code></td>
        <td>Il numero di unità di cluster. Questo vale per i tipi di indice legati alla FIV.</td>
        </tr>
    </tbody>
</table>
<h2 id="View-Collections" class="common-anchor-header">Visualizzare le raccolte<button data-href="#View-Collections" class="anchor-icon" translate="no">
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
    </button></h2><div class="language-python">
<p>Per controllare i dettagli di una raccolta esistente, usare <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/describe_collection.md">describe_collection()</a>.</p>
</div>
<div class="language-java">
<p>Per verificare i dettagli di una raccolta esistente, usare <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/describeCollection.md">describeCollection()</a>.</p>
</div>
<div class="language-javascript">
<p>Per verificare i dettagli di una collezione esistente, usare <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/describeCollection.md">describeCollection()</a>.</p>
</div>
<div class="language-go">
<p>Per verificare i dettagli di una collezione esistente, utilizzare <a href="https://milvus.io/api-reference/go/v2.4.x/Collection/DescribeCollection.md">DescribeCollection()</a>.</p>
</div>
<div class="language-shell">
<p>Per visualizzare la definizione di un insieme, si possono usare i tasti <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Describe.md"><code translate="no">POST /v2/vectordb/collections/describe</code></a> e l'endpoint <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/List.md"><code translate="no">POST /v2/vectordb/collections/list</code></a> API.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 5. View Collections</span>
res = client.describe_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;collection_name&quot;: &quot;customized_setup_2&quot;,</span>
<span class="hljs-comment">#     &quot;auto_id&quot;: false,</span>
<span class="hljs-comment">#     &quot;num_shards&quot;: 1,</span>
<span class="hljs-comment">#     &quot;description&quot;: &quot;&quot;,</span>
<span class="hljs-comment">#     &quot;fields&quot;: [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;field_id&quot;: 100,</span>
<span class="hljs-comment">#             &quot;name&quot;: &quot;my_id&quot;,</span>
<span class="hljs-comment">#             &quot;description&quot;: &quot;&quot;,</span>
<span class="hljs-comment">#             &quot;type&quot;: 5,</span>
<span class="hljs-comment">#             &quot;params&quot;: {},</span>
<span class="hljs-comment">#             &quot;element_type&quot;: 0,</span>
<span class="hljs-comment">#             &quot;is_primary&quot;: true</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;field_id&quot;: 101,</span>
<span class="hljs-comment">#             &quot;name&quot;: &quot;my_vector&quot;,</span>
<span class="hljs-comment">#             &quot;description&quot;: &quot;&quot;,</span>
<span class="hljs-comment">#             &quot;type&quot;: 101,</span>
<span class="hljs-comment">#             &quot;params&quot;: {</span>
<span class="hljs-comment">#                 &quot;dim&quot;: 5</span>
<span class="hljs-comment">#             },</span>
<span class="hljs-comment">#             &quot;element_type&quot;: 0</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;aliases&quot;: [],</span>
<span class="hljs-comment">#     &quot;collection_id&quot;: 448143479230158446,</span>
<span class="hljs-comment">#     &quot;consistency_level&quot;: 2,</span>
<span class="hljs-comment">#     &quot;properties&quot;: {},</span>
<span class="hljs-comment">#     &quot;num_partitions&quot;: 1,</span>
<span class="hljs-comment">#     &quot;enable_dynamic_field&quot;: true</span>
<span class="hljs-comment"># }</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">import io.milvus.v2.service.collection.request.DescribeCollectionReq;
import io.milvus.v2.service.collection.response.DescribeCollectionResp;

// 4. View collections
DescribeCollectionReq describeCollectionReq = DescribeCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .build();

DescribeCollectionResp describeCollectionRes = client.describeCollection(describeCollectionReq);

System.out.println(JSONObject.toJSON(describeCollectionRes));

// Output:
// {
//     <span class="hljs-string">&quot;createTime&quot;</span>: 449005822816026627,
//     <span class="hljs-string">&quot;collectionSchema&quot;</span>: {<span class="hljs-string">&quot;fieldSchemaList&quot;</span>: [
//         {
//             <span class="hljs-string">&quot;autoID&quot;</span>: <span class="hljs-literal">false</span>,
//             <span class="hljs-string">&quot;dataType&quot;</span>: <span class="hljs-string">&quot;Int64&quot;</span>,
//             <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;my_id&quot;</span>,
//             <span class="hljs-string">&quot;description&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,
//             <span class="hljs-string">&quot;isPrimaryKey&quot;</span>: <span class="hljs-literal">true</span>,
//             <span class="hljs-string">&quot;maxLength&quot;</span>: 65535,
//             <span class="hljs-string">&quot;isPartitionKey&quot;</span>: <span class="hljs-literal">false</span>
//         },
//         {
//             <span class="hljs-string">&quot;autoID&quot;</span>: <span class="hljs-literal">false</span>,
//             <span class="hljs-string">&quot;dataType&quot;</span>: <span class="hljs-string">&quot;FloatVector&quot;</span>,
//             <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;my_vector&quot;</span>,
//             <span class="hljs-string">&quot;description&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,
//             <span class="hljs-string">&quot;isPrimaryKey&quot;</span>: <span class="hljs-literal">false</span>,
//             <span class="hljs-string">&quot;dimension&quot;</span>: 5,
//             <span class="hljs-string">&quot;maxLength&quot;</span>: 65535,
//             <span class="hljs-string">&quot;isPartitionKey&quot;</span>: <span class="hljs-literal">false</span>
//         }
//     ]},
//     <span class="hljs-string">&quot;vectorFieldName&quot;</span>: [<span class="hljs-string">&quot;my_vector&quot;</span>],
//     <span class="hljs-string">&quot;autoID&quot;</span>: <span class="hljs-literal">false</span>,
//     <span class="hljs-string">&quot;fieldNames&quot;</span>: [
//         <span class="hljs-string">&quot;my_id&quot;</span>,
//         <span class="hljs-string">&quot;my_vector&quot;</span>
//     ],
//     <span class="hljs-string">&quot;description&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,
//     <span class="hljs-string">&quot;numOfPartitions&quot;</span>: 1,
//     <span class="hljs-string">&quot;primaryFieldName&quot;</span>: <span class="hljs-string">&quot;my_id&quot;</span>,
//     <span class="hljs-string">&quot;enableDynamicField&quot;</span>: <span class="hljs-literal">true</span>,
//     <span class="hljs-string">&quot;collectionName&quot;</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
// }
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 5. View Collections</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//   virtual_channel_names: [ &#x27;by-dev-rootcoord-dml_13_449007919953017716v0&#x27; ],</span>
<span class="hljs-comment">//   physical_channel_names: [ &#x27;by-dev-rootcoord-dml_13&#x27; ],</span>
<span class="hljs-comment">//   aliases: [],</span>
<span class="hljs-comment">//   start_positions: [],</span>
<span class="hljs-comment">//   properties: [],</span>
<span class="hljs-comment">//   status: {</span>
<span class="hljs-comment">//     extra_info: {},</span>
<span class="hljs-comment">//     error_code: &#x27;Success&#x27;,</span>
<span class="hljs-comment">//     reason: &#x27;&#x27;,</span>
<span class="hljs-comment">//     code: 0,</span>
<span class="hljs-comment">//     retriable: false,</span>
<span class="hljs-comment">//     detail: &#x27;&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   schema: {</span>
<span class="hljs-comment">//     fields: [ [Object], [Object] ],</span>
<span class="hljs-comment">//     properties: [],</span>
<span class="hljs-comment">//     name: &#x27;customized_setup_2&#x27;,</span>
<span class="hljs-comment">//     description: &#x27;&#x27;,</span>
<span class="hljs-comment">//     autoID: false,</span>
<span class="hljs-comment">//     enable_dynamic_field: false</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   collectionID: &#x27;449007919953017716&#x27;,</span>
<span class="hljs-comment">//   created_timestamp: &#x27;449024569603784707&#x27;,</span>
<span class="hljs-comment">//   created_utc_timestamp: &#x27;1712892797866&#x27;,</span>
<span class="hljs-comment">//   shards_num: 1,</span>
<span class="hljs-comment">//   consistency_level: &#x27;Bounded&#x27;,</span>
<span class="hljs-comment">//   collection_name: &#x27;customized_setup_2&#x27;,</span>
<span class="hljs-comment">//   db_name: &#x27;default&#x27;,</span>
<span class="hljs-comment">//   num_partitions: &#x27;1&#x27;</span>
<span class="hljs-comment">// }</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-Go"><span class="hljs-comment">// 4. View collections</span>

res, err := client.DescribeCollection(ctx, <span class="hljs-string">&quot;customized_setup_2&quot;</span>)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to describe collection:&quot;</span>, err.Error())
}
fmt.Printf(<span class="hljs-string">&quot;ConsistencyLevel: %v\nID: %v\nLoaded: %v\nName: %v\nPhysicalChannels: %v\nProperties: %v\nSchemaField1: %v\nSchemaField2: %v\nShardNum: %v\nVirtualChannels: %v\nSchemaAutoID: %v\nSchemaCollectionName: %v\nSchemaDescription: %v&quot;</span>,
    res.ConsistencyLevel, res.ID, res.Loaded, res.Name, res.PhysicalChannels,
    res.Properties, res.Schema.Fields[<span class="hljs-number">0</span>], res.Schema.Fields[<span class="hljs-number">1</span>], res.ShardNum,
    res.VirtualChannels, res.Schema.AutoID, res.Schema.CollectionName, res.Schema.Description)

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// ConsistencyLevel: 2</span>
<span class="hljs-comment">// ID: 453858520413977280</span>
<span class="hljs-comment">// Loaded: false</span>
<span class="hljs-comment">// Name: customized_setup_2</span>
<span class="hljs-comment">// PhysicalChannels: [by-dev-rootcoord-dml_14]</span>
<span class="hljs-comment">// Properties: map[]</span>
<span class="hljs-comment">// SchemaField1: &amp;{100 my_id true false  int64 map[] map[] false false false undefined}</span>
<span class="hljs-comment">// SchemaField2: &amp;{101 my_vector false false  []float32 map[dim:5] map[] false false false undefined}</span>
<span class="hljs-comment">// ShardNum: 1</span>
<span class="hljs-comment">// VirtualChannels: [by-dev-rootcoord-dml_14_453858520413977280v0]</span>
<span class="hljs-comment">// SchemaAutoID: false</span>
<span class="hljs-comment">// SchemaCollectionName: customized_setup_2</span>
<span class="hljs-comment">// SchemaDescription: 2024/11/12 14:06:53 my_rag_collection</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/describe&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;dbName&quot;: &quot;default&quot;,
    &quot;collectionName&quot;: &quot;test_collection&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;aliases&quot;: [],</span>
<span class="hljs-comment">#         &quot;autoId&quot;: false,</span>
<span class="hljs-comment">#         &quot;collectionID&quot;: 448707763883002014,</span>
<span class="hljs-comment">#         &quot;collectionName&quot;: &quot;test_collection&quot;,</span>
<span class="hljs-comment">#         &quot;consistencyLevel&quot;: &quot;Bounded&quot;,</span>
<span class="hljs-comment">#         &quot;description&quot;: &quot;&quot;,</span>
<span class="hljs-comment">#         &quot;enableDynamicField&quot;: true,</span>
<span class="hljs-comment">#         &quot;fields&quot;: [</span>
<span class="hljs-comment">#             {</span>
<span class="hljs-comment">#                 &quot;autoId&quot;: false,</span>
<span class="hljs-comment">#                 &quot;description&quot;: &quot;&quot;,</span>
<span class="hljs-comment">#                 &quot;id&quot;: 100,</span>
<span class="hljs-comment">#                 &quot;name&quot;: &quot;id&quot;,</span>
<span class="hljs-comment">#                 &quot;partitionKey&quot;: false,</span>
<span class="hljs-comment">#                 &quot;primaryKey&quot;: true,</span>
<span class="hljs-comment">#                 &quot;type&quot;: &quot;Int64&quot;</span>
<span class="hljs-comment">#             },</span>
<span class="hljs-comment">#             {</span>
<span class="hljs-comment">#                 &quot;autoId&quot;: false,</span>
<span class="hljs-comment">#                 &quot;description&quot;: &quot;&quot;,</span>
<span class="hljs-comment">#                 &quot;id&quot;: 101,</span>
<span class="hljs-comment">#                 &quot;name&quot;: &quot;vector&quot;,</span>
<span class="hljs-comment">#                 &quot;params&quot;: [</span>
<span class="hljs-comment">#                     {</span>
<span class="hljs-comment">#                         &quot;key&quot;: &quot;dim&quot;,</span>
<span class="hljs-comment">#                         &quot;value&quot;: &quot;5&quot;</span>
<span class="hljs-comment">#                     }</span>
<span class="hljs-comment">#                 ],</span>
<span class="hljs-comment">#                 &quot;partitionKey&quot;: false,</span>
<span class="hljs-comment">#                 &quot;primaryKey&quot;: false,</span>
<span class="hljs-comment">#                 &quot;type&quot;: &quot;FloatVector&quot;</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         ],</span>
<span class="hljs-comment">#         &quot;indexes&quot;: [</span>
<span class="hljs-comment">#             {</span>
<span class="hljs-comment">#                 &quot;fieldName&quot;: &quot;vector&quot;,</span>
<span class="hljs-comment">#                 &quot;indexName&quot;: &quot;vector&quot;,</span>
<span class="hljs-comment">#                 &quot;metricType&quot;: &quot;COSINE&quot;</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         ],</span>
<span class="hljs-comment">#         &quot;load&quot;: &quot;LoadStateLoaded&quot;,</span>
<span class="hljs-comment">#         &quot;partitionsNum&quot;: 1,</span>
<span class="hljs-comment">#         &quot;properties&quot;: [],</span>
<span class="hljs-comment">#         &quot;shardsNum&quot;: 1</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per elencare tutte le collezioni esistenti, si può procedere come segue:</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 6. List all collection names</span>
res = client.list_collections()

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     &quot;customized_setup_2&quot;,</span>
<span class="hljs-comment">#     &quot;quick_setup&quot;,</span>
<span class="hljs-comment">#     &quot;customized_setup_1&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.response.ListCollectionsResp;

<span class="hljs-comment">// 5. List all collection names</span>
<span class="hljs-type">ListCollectionsResp</span> <span class="hljs-variable">listCollectionsRes</span> <span class="hljs-operator">=</span> client.listCollections();

System.out.println(listCollectionsRes.getCollectionNames());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;customized_setup_2&quot;,</span>
<span class="hljs-comment">//     &quot;quick_setup&quot;,</span>
<span class="hljs-comment">//     &quot;customized_setup_1&quot;</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 5. List all collection names</span>
<span class="hljs-type">ListCollectionsResp</span> <span class="hljs-variable">listCollectionsRes</span> <span class="hljs-operator">=</span> client.listCollections();

System.out.println(listCollectionsRes.getCollectionNames());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;customized_setup_1&quot;,</span>
<span class="hljs-comment">//     &quot;quick_setup&quot;,</span>
<span class="hljs-comment">//     &quot;customized_setup_2&quot;</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-Go"><span class="hljs-comment">// 5. List all collection names</span>
collections, err := client.ListCollections(ctx)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to list collection:&quot;</span>, err.Error())
}
<span class="hljs-keyword">for</span> _, c := <span class="hljs-keyword">range</span> collections {
    log.Println(c.Name)
}

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// customized_setup_2</span>
<span class="hljs-comment">// quick_setup</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/list&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;dbName&quot;: &quot;default&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#   &quot;code&quot;: 0,</span>
<span class="hljs-comment">#   &quot;data&quot;: [</span>
<span class="hljs-comment">#     &quot;quick_setup&quot;,</span>
<span class="hljs-comment">#     &quot;customized_setup_1&quot;,</span>
<span class="hljs-comment">#     &quot;customized_setup_2&quot;</span>
<span class="hljs-comment">#   ]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Load--Release-Collection" class="common-anchor-header">Caricamento e rilascio della raccolta<button data-href="#Load--Release-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Durante il processo di caricamento di una raccolta, Milvus carica in memoria il file di indice della raccolta. Al contrario, quando si rilascia una raccolta, Milvus scarica il file di indice dalla memoria. Prima di effettuare ricerche in una raccolta, assicurarsi che la raccolta sia caricata.</p>
<h3 id="Load-a-collection" class="common-anchor-header">Caricare una collezione</h3><div class="language-python">
<p>Per caricare un insieme, utilizzare il metodo <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/load_collection.md"><code translate="no">load_collection()</code></a> specificando il nome della collezione. Si può anche impostare <code translate="no">replica_number</code> per determinare il numero di repliche in memoria dei segmenti di dati da creare sui nodi di query quando la raccolta viene caricata.</p>
<ul>
<li>Milvus Standalone: Il valore massimo consentito per <code translate="no">replica_number</code> è 1.</li>
<li>Milvus Cluster: Il valore massimo non deve superare il valore <code translate="no">queryNode.replicas</code> impostato nelle configurazioni di Milvus. Per ulteriori dettagli, consultare la sezione <a href="https://milvus.io/docs/configure_querynode.md#Query-Node-related-Configurations">Configurazioni relative ai nodi di query</a>.</li>
</ul>
</div>
<div class="language-java">
<p>Per caricare un insieme, usare il metodo <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/loadCollection.md"><code translate="no">loadCollection()</code></a> specificando il nome della collezione.</p>
</div>
<div class="language-javascript">
<p>Per caricare un insieme, usare il metodo <a href="https://milvus.io/api-reference/node/v2.4.x/Management/loadCollection.md"><code translate="no">loadCollection()</code></a> specificando il nome dell'insieme.</p>
</div>
<div class="language-go">
<p>Per caricare un insieme, utilizzare il metodo <a href="https://milvus.io/api-reference/go/v2.4.x/Collection/LoadCollection.md"><code translate="no">LoadCollection()</code></a> specificando il nome dell'insieme.</p>
</div>
<div class="language-shell">
<p>Per caricare un insieme, si possono usare i metodi <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Load.md"><code translate="no">POST /v2/vectordb/collections/load</code></a> e il metodo <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/GetLoadState.md"><code translate="no">POST /v2/vectordb/collections/get_load_state</code></a> endpoint dell'API.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 7. Load the collection</span>
client.load_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    replica_number=<span class="hljs-number">1</span> <span class="hljs-comment"># Number of replicas to create on query nodes. Max value is 1 for Milvus Standalone, and no greater than `queryNode.replicas` for Milvus Cluster.</span>
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.LoadCollectionReq;

<span class="hljs-comment">// 6. Load the collection</span>
<span class="hljs-type">LoadCollectionReq</span> <span class="hljs-variable">loadCollectionReq</span> <span class="hljs-operator">=</span> LoadCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .build();

client.loadCollection(loadCollectionReq);

<span class="hljs-comment">// Thread.sleep(5000);</span>

<span class="hljs-comment">// 7. Get load state of the collection</span>
<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">loadStateReq</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .build();

res = client.getLoadState(loadStateReq);

System.out.println(res);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 7. Load the collection</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

<span class="hljs-keyword">await</span> <span class="hljs-title function_">sleep</span>(<span class="hljs-number">3000</span>)

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// 6. Load the collection</span>

err = client.LoadCollection(ctx, <span class="hljs-string">&quot;customized_setup_2&quot;</span>, <span class="hljs-literal">false</span>)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to laod collection:&quot;</span>, err.Error())
}

<span class="hljs-comment">// 7. Get load state of the collection</span>
stateLoad, err := client.GetLoadState(context.Background(), <span class="hljs-string">&quot;customized_setup_2&quot;</span>, []<span class="hljs-type">string</span>{})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to get load state:&quot;</span>, err.Error())
}
fmt.Println(stateLoad)

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// 3</span>

<span class="hljs-comment">// LoadStateNotExist -&gt; LoadState = 0</span>
<span class="hljs-comment">// LoadStateNotLoad  -&gt; LoadState = 1</span>
<span class="hljs-comment">// LoadStateLoading  -&gt; LoadState = 2</span>
<span class="hljs-comment">// LoadStateLoaded   -&gt; LoadState = 3</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/load&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;</span>

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {},</span>
<span class="hljs-comment"># }</span>

$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/get_load_state&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;loadProgress&quot;: 100,</span>
<span class="hljs-comment">#         &quot;loadState&quot;: &quot;LoadStateLoaded&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Load-a-collection-partially-Public-Preview" class="common-anchor-header">Caricare parzialmente una raccolta (anteprima pubblica)</h3><div class="alert note">
<p>Questa funzione è attualmente in anteprima pubblica. L'API e la funzionalità potrebbero cambiare in futuro.</p>
</div>
<p>Quando riceve la richiesta di caricamento, Milvus carica in memoria tutti gli indici dei campi vettoriali e tutti i dati dei campi scalari. Se alcuni campi non devono essere coinvolti nelle ricerche e nelle query, è possibile escluderli dal caricamento per ridurre l'utilizzo della memoria, migliorando le prestazioni della ricerca.</p>
<div class="language-python">
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 7. Load the collection</span>
client.load_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    load_fields=[<span class="hljs-string">&quot;my_id&quot;</span>, <span class="hljs-string">&quot;my_vector&quot;</span>], <span class="hljs-comment"># Load only the specified fields</span>
    skip_load_dynamic_field=<span class="hljs-literal">True</span> <span class="hljs-comment"># Skip loading the dynamic field</span>
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<p>Si noti che solo i campi elencati in <code translate="no">load_fields</code> possono essere utilizzati come condizioni di filtraggio e campi di output nelle ricerche e nelle query. È necessario includere sempre la chiave primaria nell'elenco. I nomi dei campi esclusi dal caricamento non saranno disponibili per il filtraggio o l'output.</p>
<p>È possibile utilizzare <code translate="no">skip_load_dynamic_field=True</code> per saltare il caricamento del campo dinamico. Milvus tratta il campo dinamico come un singolo campo, quindi tutte le chiavi del campo dinamico saranno incluse o escluse insieme.</p>
</div>
<h3 id="Release-a-collection" class="common-anchor-header">Rilasciare una collezione</h3><div class="language-python">
<p>Per rilasciare una collezione, utilizzare il metodo <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/release_collection.md"><code translate="no">release_collection()</code></a> specificando il nome della collezione.</p>
</div>
<div class="language-java">
<p>Per rilasciare un insieme, utilizzare il metodo <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/releaseCollection.md"><code translate="no">releaseCollection()</code></a> specificando il nome dell'insieme.</p>
</div>
<div class="language-javascript">
<p>Per rilasciare un insieme, utilizzare il metodo <a href="https://milvus.io/api-reference/node/v2.4.x/Management/releaseCollection.md"><code translate="no">releaseCollection()</code></a> specificando il nome dell'insieme.</p>
</div>
<div class="language-go">
<p>Per rilasciare un insieme, utilizzare il metodo <a href="https://milvus.io/api-reference/go/v2.4.x/Collection/ReleaseCollection.md"><code translate="no">ReleaseCollection()</code></a> specificando il nome dell'insieme.</p>
</div>
<div class="language-shell">
<p>Per rilasciare un insieme, si possono usare i metodi <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Release.md"><code translate="no">POST /v2/vectordb/collections/release</code></a> e il metodo <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/GetLoadState.md"><code translate="no">POST /v2/vectordb/collections/get_load_state</code></a> endpoint dell'API.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 8. Release the collection</span>
client.release_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: NotLoad&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.ReleaseCollectionReq;

<span class="hljs-comment">// 8. Release the collection</span>
<span class="hljs-type">ReleaseCollectionReq</span> <span class="hljs-variable">releaseCollectionReq</span> <span class="hljs-operator">=</span> ReleaseCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .build();

client.releaseCollection(releaseCollectionReq);

<span class="hljs-comment">// Thread.sleep(1000);</span>

res = client.getLoadState(loadStateReq);

System.out.println(res);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// false</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 8. Release the collection</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">releaseCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateNotLoad</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// 8. Release the collection</span>
errRelease := client.ReleaseCollection(context.Background(), <span class="hljs-string">&quot;customized_setup_2&quot;</span>)
<span class="hljs-keyword">if</span> errRelease != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to release collection:&quot;</span>, errRelease.Error())
}
fmt.Println(errRelease)
stateLoad, err = client.GetLoadState(context.Background(), <span class="hljs-string">&quot;customized_setup_2&quot;</span>, []<span class="hljs-type">string</span>{})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to get load state:&quot;</span>, err.Error())
}
fmt.Println(stateLoad)

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// 1</span>

<span class="hljs-comment">// meaning not loaded</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/release&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;</span>

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {},</span>
<span class="hljs-comment"># }</span>


$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/get_load_state&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;</span>


<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;loadState&quot;: &quot;LoadStateNotLoad&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-aliases" class="common-anchor-header">Impostare gli alias<button data-href="#Set-up-aliases" class="anchor-icon" translate="no">
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
    </button></h2><p>È possibile assegnare alias alle raccolte per renderle più significative in un contesto specifico. È possibile assegnare più alias a una raccolta, ma più raccolte non possono condividere un alias.</p>
<h3 id="Create-aliases" class="common-anchor-header">Creare gli alias</h3><div class="language-python">
<p>Per creare alias, utilizzare il metodo <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_alias.md"><code translate="no">create_alias()</code></a> specificando il nome della collezione e l'alias.</p>
</div>
<div class="language-java">
<p>Per creare alias, utilizzare il metodo <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createAlias.md"><code translate="no">createAlias()</code></a> specificando il nome della collezione e l'alias.</p>
</div>
<div class="language-javascript">
<p>Per creare alias, utilizzare il metodo <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createAlias.md"><code translate="no">createAlias()</code></a> specificando il nome della collezione e l'alias.</p>
</div>
<div class="language-shell">
<p>Per creare alias per una collezione, è possibile utilizzare l'endpoint <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Alias%20(v2)/Create.md"><code translate="no">POST /v2/vectordb/aliases/create</code></a> endpoint dell'API.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 9.1. Create aliases</span>
client.create_alias(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    <span class="hljs-built_in">alias</span>=<span class="hljs-string">&quot;bob&quot;</span>
)

client.create_alias(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    <span class="hljs-built_in">alias</span>=<span class="hljs-string">&quot;alice&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.CreateAliasReq;

<span class="hljs-comment">// 9. Manage aliases</span>

<span class="hljs-comment">// 9.1 Create alias</span>
<span class="hljs-type">CreateAliasReq</span> <span class="hljs-variable">createAliasReq</span> <span class="hljs-operator">=</span> CreateAliasReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .alias(<span class="hljs-string">&quot;bob&quot;</span>)
    .build();

client.createAlias(createAliasReq);

createAliasReq = CreateAliasReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .alias(<span class="hljs-string">&quot;alice&quot;</span>)
    .build();

client.createAlias(createAliasReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 9. Manage aliases</span>
<span class="hljs-comment">// 9.1 Create aliases</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createAlias</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    <span class="hljs-attr">alias</span>: <span class="hljs-string">&quot;bob&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createAlias</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    <span class="hljs-attr">alias</span>: <span class="hljs-string">&quot;alice&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/aliases/create&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;,
    &quot;aliasName&quot;: &quot;bob&quot;
}&#x27;</span>

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>

$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/aliases/create&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;,
    &quot;aliasName&quot;: &quot;alice&quot;
}&#x27;</span>

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<table class="language-python">
  <thead>
    <tr>
      <th>Parametro</th>
      <th>Descrizione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collection_name</code></td>
      <td>Il nome della collezione per cui creare un alias.</td>
    </tr>
    <tr>
      <td><code translate="no">alias</code></td>
      <td>L'alias della raccolta. Prima di questa operazione, assicurarsi che l'alias non esista già. In caso contrario, si verificheranno delle eccezioni.</td>
    </tr>
  </tbody>
</table>
<table class="language-java">
  <thead>
    <tr>
      <th>Parametro</th>
      <th>Descrizione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collectionName</code></td>
      <td>Il nome della collezione per cui creare un alias.</td>
    </tr>
    <tr>
      <td><code translate="no">alias</code></td>
      <td>L'alias della collezione. Prima di questa operazione, assicurarsi che l'alias non esista già. In caso contrario, si verificheranno delle eccezioni.</td>
    </tr>
  </tbody>
</table>
<table class="language-javascript">
  <thead>
    <tr>
      <th>Parametro</th>
      <th>Descrizione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collection_name</code></td>
      <td>Il nome della collezione per cui creare un alias.</td>
    </tr>
    <tr>
      <td><code translate="no">alias</code></td>
      <td>L'alias della collezione. Prima di questa operazione, assicurarsi che l'alias non esista già. In caso contrario, si verificheranno delle eccezioni.</td>
    </tr>
  </tbody>
</table>
<table class="language-shell">
  <thead>
    <tr>
      <th>Parametro</th>
      <th>Descrizione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collectionName</code></td>
      <td>Il nome della collezione per cui creare un alias.</td>
    </tr>
    <tr>
      <td><code translate="no">aliasName</code></td>
      <td>L'alias della collezione. Prima di questa operazione, assicurarsi che l'alias non esista già. In caso contrario, si verificheranno delle eccezioni.</td>
    </tr>
  </tbody>
</table>
<h3 id="List-aliases" class="common-anchor-header">Elenco degli alias</h3><div class="language-python">
<p>Per elencare gli alias, utilizzare il metodo <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/list_aliases.md"><code translate="no">list_aliases()</code></a> specificando il nome della collezione.</p>
</div>
<div class="language-java">
<p>Per elencare gli alias, utilizzare il metodo <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/listAliases.md"><code translate="no">listAliases()</code></a> specificando il nome dell'insieme.</p>
</div>
<div class="language-javascript">
<p>Per elencare gli alias, utilizzare il metodo <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/listAliases.md"><code translate="no">listAliases()</code></a> specificando il nome dell'insieme.</p>
</div>
<div class="language-shell">
<p>Per elencare gli alias di un insieme, è possibile utilizzare l'endpoint <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Alias%20(v2)/List.md"><code translate="no">POST /v2/vectordb/aliases/list</code></a> endpoint dell'API.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 9.2. List aliases</span>
res = client.list_aliases(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;aliases&quot;: [</span>
<span class="hljs-comment">#         &quot;bob&quot;,</span>
<span class="hljs-comment">#         &quot;alice&quot;</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;collection_name&quot;: &quot;customized_setup_2&quot;,</span>
<span class="hljs-comment">#     &quot;db_name&quot;: &quot;default&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.ListAliasesReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.ListAliasResp;

<span class="hljs-comment">// 9.2 List alises</span>
<span class="hljs-type">ListAliasesReq</span> <span class="hljs-variable">listAliasesReq</span> <span class="hljs-operator">=</span> ListAliasesReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .build();

<span class="hljs-type">ListAliasResp</span> <span class="hljs-variable">listAliasRes</span> <span class="hljs-operator">=</span> client.listAliases(listAliasesReq);

System.out.println(listAliasRes.getAlias());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;bob&quot;,</span>
<span class="hljs-comment">//     &quot;alice&quot;</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 9.2 List aliases</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listAliases</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">aliases</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [ &#x27;bob&#x27;, &#x27;alice&#x27; ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/aliases/list&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: [</span>
<span class="hljs-comment">#         &quot;bob&quot;,</span>
<span class="hljs-comment">#         &quot;alice&quot;</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Describe-aliases" class="common-anchor-header">Descrivere gli alias</h3><div class="language-python">
<p>Per descrivere gli alias, utilizzare il metodo <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/describe_alias.md"><code translate="no">describe_alias()</code></a> specificando l'alias.</p>
</div>
<div class="language-java">
<p>Per descrivere gli alias, utilizzare il metodo <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/describeAlias.md"><code translate="no">describeAlias()</code></a> specificando l'alias.</p>
</div>
<div class="language-javascript">
<p>Per descrivere gli alias, utilizzare il metodo <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/describeAlias.md"><code translate="no">describeAlias()</code></a> specificando l'alias.</p>
</div>
<div class="language-shell">
<p>Per descrivere gli alias di un insieme, è possibile utilizzare l'endpoint <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Alias%20(v2)/Describe.md"><code translate="no">POST /v2/vectordb/aliases/describe</code></a> endpoint dell'API.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 9.3. Describe aliases</span>
res = client.describe_alias(
    <span class="hljs-built_in">alias</span>=<span class="hljs-string">&quot;bob&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;alias&quot;: &quot;bob&quot;,</span>
<span class="hljs-comment">#     &quot;collection_name&quot;: &quot;customized_setup_2&quot;,</span>
<span class="hljs-comment">#     &quot;db_name&quot;: &quot;default&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">utility</span>.<span class="hljs-property">request</span>.<span class="hljs-property">DescribeAliasReq</span>;
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">utility</span>.<span class="hljs-property">response</span>.<span class="hljs-property">DescribeAliasResp</span>;

<span class="hljs-comment">// 9.3 Describe alias</span>
<span class="hljs-title class_">DescribeAliasReq</span> describeAliasReq = <span class="hljs-title class_">DescribeAliasReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">alias</span>(<span class="hljs-string">&quot;bob&quot;</span>)
    .<span class="hljs-title function_">build</span>();

<span class="hljs-title class_">DescribeAliasResp</span> describeAliasRes = client.<span class="hljs-title function_">describeAlias</span>(describeAliasReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(describeAliasRes));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//     &quot;alias&quot;: &quot;bob&quot;,</span>
<span class="hljs-comment">//     &quot;collectionName&quot;: &quot;customized_setup_2&quot;</span>
<span class="hljs-comment">// }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 9.3 Describe aliases</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeAlias</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    <span class="hljs-attr">alias</span>: <span class="hljs-string">&quot;bob&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//   status: {</span>
<span class="hljs-comment">//     extra_info: {},</span>
<span class="hljs-comment">//     error_code: &#x27;Success&#x27;,</span>
<span class="hljs-comment">//     reason: &#x27;&#x27;,</span>
<span class="hljs-comment">//     code: 0,</span>
<span class="hljs-comment">//     retriable: false,</span>
<span class="hljs-comment">//     detail: &#x27;&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   db_name: &#x27;default&#x27;,</span>
<span class="hljs-comment">//   alias: &#x27;bob&#x27;,</span>
<span class="hljs-comment">//   collection: &#x27;customized_setup_2&#x27;</span>
<span class="hljs-comment">// }</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/aliases/describe&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;aliasName&quot;: &quot;bob&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;aliasName&quot;: &quot;bob&quot;,</span>
<span class="hljs-comment">#         &quot;collectionName&quot;: &quot;quick_setup&quot;,</span>
<span class="hljs-comment">#         &quot;dbName&quot;: &quot;default&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Reassign-aliases" class="common-anchor-header">Riassegnare gli alias</h3><div class="language-python">
<p>Per riassegnare gli alias ad altre raccolte, utilizzare il metodo <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/alter_alias.md"><code translate="no">alter_alias()</code></a> specificando il nome della collezione e l'alias.</p>
</div>
<div class="language-java">
<p>Per riassegnare gli alias ad altre raccolte, utilizzare il metodo <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/alterAlias.md"><code translate="no">alterAlias()</code></a> specificando il nome della collezione e l'alias.</p>
</div>
<div class="language-javascript">
<p>Per riassegnare gli alias ad altre raccolte, utilizzare il metodo <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/alterAlias.md"><code translate="no">alterAlias()</code></a> specificando il nome della collezione e l'alias.</p>
</div>
<div class="language-shell">
<p>Per riassegnare gli alias ad altre raccolte, è possibile utilizzare l'endpoint <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Alias%20(v2)/Alter.md"><code translate="no">POST /v2/vectordb/aliases/alter</code></a> endpoint dell'API.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 9.4 Reassign aliases to other collections</span>
client.alter_alias(
    collection_name=<span class="hljs-string">&quot;customized_setup_1&quot;</span>,
    alias=<span class="hljs-string">&quot;alice&quot;</span>
)

res = client.list_aliases(
    collection_name=<span class="hljs-string">&quot;customized_setup_1&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;aliases&quot;: [</span>
<span class="hljs-comment">#         &quot;alice&quot;</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;collection_name&quot;: &quot;customized_setup_1&quot;,</span>
<span class="hljs-comment">#     &quot;db_name&quot;: &quot;default&quot;</span>
<span class="hljs-comment"># }</span>

res = client.list_aliases(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;aliases&quot;: [</span>
<span class="hljs-comment">#         &quot;bob&quot;</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;collection_name&quot;: &quot;customized_setup_2&quot;,</span>
<span class="hljs-comment">#     &quot;db_name&quot;: &quot;default&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.AlterAliasReq;

<span class="hljs-comment">// 9.4 Reassign alias to other collections</span>
AlterAliasReq alterAliasReq = AlterAliasReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_1&quot;</span>)
    .alias(<span class="hljs-string">&quot;alice&quot;</span>)
    .build();

client.alterAlias(alterAliasReq);

listAliasesReq = ListAliasesReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_1&quot;</span>)
    .build();

listAliasRes = client.listAliases(listAliasesReq);

System.out.<span class="hljs-built_in">println</span>(listAliasRes.getAlias());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [&quot;alice&quot;]</span>

listAliasesReq = ListAliasesReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .build();

listAliasRes = client.listAliases(listAliasesReq);

System.out.<span class="hljs-built_in">println</span>(listAliasRes.getAlias());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [&quot;bob&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 9.4 Reassign aliases to other collections</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterAlias</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_1&quot;</span>,
    <span class="hljs-attr">alias</span>: <span class="hljs-string">&quot;alice&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listAliases</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_1&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">aliases</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [ &#x27;alice&#x27; ]</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listAliases</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">aliases</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [ &#x27;bob&#x27; ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/aliases/alter&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
     &quot;collectionName&quot;: &quot;customized_setup_1&quot;,
     &quot;aliasName&quot;: &quot;alice&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>


$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/aliases/list&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_1&quot;
}&#x27;</span>


<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: [</span>
<span class="hljs-comment">#         &quot;alice&quot;</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># }</span>


$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/aliases/list&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;</span>


<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: [</span>
<span class="hljs-comment">#         &quot;bob&quot;</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Drop-aliases" class="common-anchor-header">Eliminare gli alias</h3><div class="language-python">
<p>Per eliminare gli alias, utilizzare il metodo <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/drop_alias.md"><code translate="no">drop_alias()</code></a> specificando l'alias.</p>
</div>
<div class="language-java">
<p>Per eliminare gli alias, utilizzare il metodo <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/dropAlias.md"><code translate="no">dropAlias()</code></a> specificando l'alias.</p>
</div>
<div class="language-javascript">
<p>Per eliminare gli alias, utilizzare il metodo <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/dropAlias.md"><code translate="no">dropAlias()</code></a> specificando l'alias.</p>
</div>
<div class="language-shell">
<p>Per eliminare gli alias per un insieme, è possibile utilizzare il punto finale dell'API <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Alias%20(v2)/Drop.md"><code translate="no">POST /v2/vectordb/aliases/drop</code></a> endpoint dell'API.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 9.5 Drop aliases</span>
client.drop_alias(
    <span class="hljs-built_in">alias</span>=<span class="hljs-string">&quot;bob&quot;</span>
)

client.drop_alias(
    <span class="hljs-built_in">alias</span>=<span class="hljs-string">&quot;alice&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.DropAliasReq;

<span class="hljs-comment">// 9.5 Drop alias</span>
<span class="hljs-type">DropAliasReq</span> <span class="hljs-variable">dropAliasReq</span> <span class="hljs-operator">=</span> DropAliasReq.builder()
    .alias(<span class="hljs-string">&quot;bob&quot;</span>)
    .build();

client.dropAlias(dropAliasReq);

dropAliasReq = DropAliasReq.builder()
    .alias(<span class="hljs-string">&quot;alice&quot;</span>)
    .build();

client.dropAlias(dropAliasReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 9.5 Drop aliases</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropAlias</span>({
    <span class="hljs-attr">alias</span>: <span class="hljs-string">&quot;bob&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropAlias</span>({
    <span class="hljs-attr">alias</span>: <span class="hljs-string">&quot;alice&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/aliases/drop&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;aliasName&quot;: &quot;bob&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>


$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/aliases/drop&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;aliasName&quot;: &quot;alice&quot;
}&#x27;</span>


<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-Properties" class="common-anchor-header">Impostare le proprietà<button data-href="#Set-Properties" class="anchor-icon" translate="no">
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
    </button></h2><p>È possibile impostare le proprietà di un insieme, come <code translate="no">ttl.seconds</code> e <code translate="no">mmap.enabled</code>. Per ulteriori informazioni, consultare <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/set_properties.md">set_properties()</a>.</p>
<div class="alert note">
<p>I frammenti di codice di questa sezione utilizzano il <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Connections/connect.md">modulo ORM PyMilvus</a> per interagire con Milvus. I frammenti di codice con il nuovo <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">SDK MilvusClient</a> saranno presto disponibili.</p>
</div>
<h3 id="Set-TTL" class="common-anchor-header">Imposta TTL</h3><p>Imposta il Time-To-Live (TTL) per i dati della raccolta, che specifica per quanto tempo i dati devono essere conservati prima di essere cancellati automaticamente.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection, connections

<span class="hljs-comment"># Connect to Milvus server</span>
connections.connect(host=<span class="hljs-string">&quot;localhost&quot;</span>, port=<span class="hljs-string">&quot;19530&quot;</span>) <span class="hljs-comment"># Change to your Milvus server IP and port</span>

<span class="hljs-comment"># Get existing collection</span>
collection = Collection(<span class="hljs-string">&quot;quick_setup&quot;</span>)

<span class="hljs-comment"># Set the TTL for the data in the collection</span>
collection.set_properties(
    properties={
        <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">60</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-MMAP" class="common-anchor-header">Imposta MMAP</h3><p>Configura la proprietà di mappatura della memoria (MMAP) per l'insieme, che determina se i dati sono mappati in memoria per migliorare le prestazioni delle query. Per ulteriori informazioni, consultare <a href="https://milvus.io/docs/mmap.md#Configure-memory-mapping">Configurazione della mappatura della memoria</a>.</p>
<div class="alert note">
<p>Prima di impostare la proprietà MMAP, rilasciare l'insieme. In caso contrario, si verificherà un errore.</p>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection, connections

<span class="hljs-comment"># Connect to Milvus server</span>
connections.connect(host=<span class="hljs-string">&quot;localhost&quot;</span>, port=<span class="hljs-string">&quot;19530&quot;</span>) <span class="hljs-comment"># Change to your Milvus server IP and port</span>

<span class="hljs-comment"># Get existing collection</span>
collection = Collection(<span class="hljs-string">&quot;quick_setup&quot;</span>)

<span class="hljs-comment"># Before setting memory mapping property, we need to release the collection first.</span>
collection.release()

<span class="hljs-comment"># Set memory mapping property to True or Flase</span>
collection.set_properties(
    properties={
        <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">True</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Drop-a-Collection" class="common-anchor-header">Abbandono di una raccolta<button data-href="#Drop-a-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Se una raccolta non è più necessaria, è possibile eliminarla.</p>
<div class="language-python">
<p>Per eliminare un insieme, utilizzare il metodo <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/drop_collection.md"><code translate="no">drop_collection()</code></a> specificando il nome dell'insieme.</p>
</div>
<div class="language-java">
<p>Per eliminare un insieme, utilizzare il metodo <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/dropCollection.md"><code translate="no">dropCollection()</code></a> specificando il nome dell'insieme.</p>
</div>
<div class="language-javascript">
<p>Per eliminare un insieme, utilizzare il metodo <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/dropCollection.md"><code translate="no">dropCollection()</code></a> specificando il nome dell'insieme.</p>
</div>
<div class="language-go">
<p>Per abbandonare un insieme, utilizzare il metodo <a href="https://milvus.io/api-reference/go/v2.4.x/Collection/DropCollection.md"><code translate="no">DropCollection()</code></a> specificando il nome dell'insieme.</p>
</div>
<div class="language-shell">
<p>Per eliminare un insieme, è possibile utilizzare l'endpoint <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Drop.md"><code translate="no">POST /v2/vectordb/collections/drop</code></a> endpoint dell'API.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 10. Drop the collections</span>
client.drop_collection(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>
)

client.drop_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_1&quot;</span>
)

client.drop_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionReq;

<span class="hljs-comment">// 10. Drop collections</span>

<span class="hljs-type">DropCollectionReq</span> <span class="hljs-variable">dropQuickSetupParam</span> <span class="hljs-operator">=</span> DropCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .build();

client.dropCollection(dropQuickSetupParam);

<span class="hljs-type">DropCollectionReq</span> <span class="hljs-variable">dropCustomizedSetupParam</span> <span class="hljs-operator">=</span> DropCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_1&quot;</span>)
    .build();

client.dropCollection(dropCustomizedSetupParam);

dropCustomizedSetupParam = DropCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .build();

client.dropCollection(dropCustomizedSetupParam);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 10. Drop the collection</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_1&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// 10. Drop collections</span>

err = client.<span class="hljs-title class_">DropCollection</span>(ctx, <span class="hljs-string">&quot;quick_setup&quot;</span>)
<span class="hljs-keyword">if</span> err != nil {
    log.<span class="hljs-title class_">Fatal</span>(<span class="hljs-string">&quot;failed to drop collection:&quot;</span>, err.<span class="hljs-title class_">Error</span>())
}
err = client.<span class="hljs-title class_">DropCollection</span>(ctx, <span class="hljs-string">&quot;customized_setup_2&quot;</span>)
<span class="hljs-keyword">if</span> err != nil {
    log.<span class="hljs-title class_">Fatal</span>(<span class="hljs-string">&quot;failed to drop collection:&quot;</span>, err.<span class="hljs-title class_">Error</span>())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/drop&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;quick_setup&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>


$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/drop&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_1&quot;
}&#x27;</span>


<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>


$ curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/drop&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;</span>


<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {}</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
