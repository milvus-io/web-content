---
id: multi-vector-search.md
order: 2
summary: >-
  Questa guida illustra come eseguire una ricerca ibrida in Milvus e come
  comprendere il reranking dei risultati.
title: Ricerca ibrida
---
<h1 id="Hybrid-Search" class="common-anchor-header">Ricerca ibrida<button data-href="#Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>A partire da Milvus 2.4, abbiamo introdotto il supporto per i vettori multipli e un framework di ricerca ibrida, il che significa che gli utenti possono inserire diversi campi vettoriali (fino a 10) in un'unica raccolta. Questi vettori in diverse colonne rappresentano diverse sfaccettature dei dati, provenienti da diversi modelli di incorporazione o sottoposti a diversi metodi di elaborazione. I risultati delle ricerche ibride vengono integrati utilizzando strategie di reranking, come Reciprocal Rank Fusion (RRF) e Weighted Scoring. Per saperne di più sulle strategie di reranking, consultare <a href="/docs/it/v2.4.x/reranking.md">Reranking</a>.</p>
<p>Questa funzione è particolarmente utile in scenari di ricerca completi, come l'identificazione della persona più simile in una libreria vettoriale basata su vari attributi come immagini, voce, impronte digitali, ecc.</p>
<p>In questa esercitazione si apprenderà come:</p>
<ul>
<li><p>Creare istanze multiple di <code translate="no">AnnSearchRequest</code> per ricerche di somiglianza su campi vettoriali diversi;</p></li>
<li><p>Configurare una strategia di reranking per combinare e rerankare i risultati di ricerca di più istanze di <code translate="no">AnnSearchRequest</code>;</p></li>
<li><p>Utilizzare il metodo <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md"><code translate="no">hybrid_search()</code></a> per eseguire una ricerca ibrida.</p></li>
</ul>
<div class="alert note">
<p>I frammenti di codice di questa pagina utilizzano il <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Connections/connect.md">modulo ORM PyMilvus</a> per interagire con Milvus. I frammenti di codice con il nuovo <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">SDK MilvusClient</a> saranno presto disponibili.</p>
</div>
<h2 id="Preparations" class="common-anchor-header">Preparazione<button data-href="#Preparations" class="anchor-icon" translate="no">
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
    </button></h2><p>Prima di iniziare una ricerca ibrida, assicurarsi di avere una collezione con più campi vettoriali. Attualmente, Milvus introduce un valore predefinito di quattro campi vettoriali per collezione, che può essere esteso a un massimo di dieci modificando la configurazione <a href="https://milvus.io/docs/configure_proxy.md#proxymaxVectorFieldNum">proxy.maxVectorFieldNum</a>.</p>
<p>Di seguito è riportato un esempio di creazione di una collezione denominata <code translate="no">test_collection</code> con due campi vettoriali, <code translate="no">filmVector</code> e <code translate="no">posterVector</code>, e di inserimento di entità casuali in essa.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections, Collection, FieldSchema, CollectionSchema, DataType
<span class="hljs-keyword">import</span> random

<span class="hljs-comment"># Connect to Milvus</span>
connections.connect(
    host=<span class="hljs-string">&quot;127.0.0.1&quot;</span>, <span class="hljs-comment"># Replace with your Milvus server IP</span>
    port=<span class="hljs-string">&quot;19530&quot;</span>
)

<span class="hljs-comment"># Create schema</span>
fields = [
    FieldSchema(name=<span class="hljs-string">&quot;film_id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;filmVector&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>), <span class="hljs-comment"># Vector field for film vectors</span>
    FieldSchema(name=<span class="hljs-string">&quot;posterVector&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)] <span class="hljs-comment"># Vector field for poster vectors</span>

schema = CollectionSchema(fields=fields,enable_dynamic_field=<span class="hljs-literal">False</span>)

<span class="hljs-comment"># Create collection</span>
collection = Collection(name=<span class="hljs-string">&quot;test_collection&quot;</span>, schema=schema)

<span class="hljs-comment"># Create index for each vector field</span>
index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>},
}

collection.create_index(<span class="hljs-string">&quot;filmVector&quot;</span>, index_params)
collection.create_index(<span class="hljs-string">&quot;posterVector&quot;</span>, index_params)

<span class="hljs-comment"># Generate random entities to insert</span>
entities = []

<span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1000</span>):
    <span class="hljs-comment"># generate random values for each field in the schema</span>
    film_id = random.randint(<span class="hljs-number">1</span>, <span class="hljs-number">1000</span>)
    film_vector = [ random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ]
    poster_vector = [ random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ]

    <span class="hljs-comment"># create a dictionary for each entity</span>
    entity = {
        <span class="hljs-string">&quot;film_id&quot;</span>: film_id,
        <span class="hljs-string">&quot;filmVector&quot;</span>: film_vector,
        <span class="hljs-string">&quot;posterVector&quot;</span>: poster_vector
    }

    <span class="hljs-comment"># add the entity to the list</span>
    entities.append(entity)
    
collection.insert(entities)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-1-Create-Multiple-AnnSearchRequest-Instances" class="common-anchor-header">Passo 1: creare più istanze AnnSearchRequest<button data-href="#Step-1-Create-Multiple-AnnSearchRequest-Instances" class="anchor-icon" translate="no">
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
    </button></h2><p>Una ricerca ibrida utilizza l'API <code translate="no">hybrid_search()</code> per eseguire più richieste di ricerca ANN in un'unica chiamata. Ogni <code translate="no">AnnSearchRequest</code> rappresenta una singola richiesta di ricerca su uno specifico campo vettoriale.</p>
<p>L'esempio seguente crea due istanze <code translate="no">AnnSearchRequest</code> per eseguire ricerche di similarità individuali su due campi vettoriali.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Create ANN search request 1 for filmVector</span>
query_filmVector = [[<span class="hljs-number">0.8896863042430693</span>, <span class="hljs-number">0.370613100114602</span>, <span class="hljs-number">0.23779315077113428</span>, <span class="hljs-number">0.38227915951132996</span>, <span class="hljs-number">0.5997064603128835</span>]]

search_param_1 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_filmVector, <span class="hljs-comment"># Query vector</span>
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;filmVector&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># This parameter value must be identical to the one used in the collection schema</span>
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Number of search results to return in this AnnSearchRequest</span>
}
request_1 = AnnSearchRequest(**search_param_1)

<span class="hljs-comment"># Create ANN search request 2 for posterVector</span>
query_posterVector = [[<span class="hljs-number">0.02550758562349764</span>, <span class="hljs-number">0.006085637357292062</span>, <span class="hljs-number">0.5325251250159071</span>, <span class="hljs-number">0.7676432650114147</span>, <span class="hljs-number">0.5521074424751443</span>]]
search_param_2 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_posterVector, <span class="hljs-comment"># Query vector</span>
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;posterVector&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># This parameter value must be identical to the one used in the collection schema</span>
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Number of search results to return in this AnnSearchRequest</span>
}
request_2 = AnnSearchRequest(**search_param_2)

<span class="hljs-comment"># Store these two requests as a list in `reqs`</span>
reqs = [request_1, request_2]
<button class="copy-code-btn"></button></code></pre>
<p>Parametri:</p>
<ul>
<li><p><code translate="no">AnnSearchRequest</code> <em>(oggetto</em>)</p>
<p>Una classe che rappresenta una richiesta di ricerca RNA. Ogni ricerca ibrida può contenere da 1 a 1.024 oggetti <code translate="no">ANNSearchRequest</code> alla volta.</p></li>
<li><p><code translate="no">data</code> <em>(elenco</em>)</p>
<p>Il vettore di query da ricercare in un singolo <code translate="no">AnnSearchRequest</code>. Attualmente, questo parametro accetta un elenco contenente un solo vettore di query, ad esempio <code translate="no">[[0.5791814851218929, 0.5792985702614121, 0.8480776460143558, 0.16098005945243, 0.2842979317256803]]</code>. In futuro, questo parametro sarà ampliato per accettare più vettori di query.</p></li>
<li><p><code translate="no">anns_field</code> <em>(stringa</em>)</p>
<p>Il nome del campo vettoriale da utilizzare in un singolo <code translate="no">AnnSearchRequest</code>.</p></li>
<li><p><code translate="no">param</code> <em>(dict</em>)</p>
<p>Un dizionario di parametri di ricerca per un singolo <code translate="no">AnnSearchRequest</code>. Questi parametri di ricerca sono identici a quelli di una ricerca a vettore singolo. Per ulteriori informazioni, consultare <a href="https://milvus.io/docs/single-vector-search.md#Search-parameters">Parametri di ricerca</a>.</p></li>
<li><p><code translate="no">limit</code> <em>(int</em>)</p>
<p>Il numero massimo di risultati della ricerca da includere in un singolo <code translate="no">ANNSearchRequest</code>.</p>
<p>Questo parametro influisce solo sul numero di risultati di ricerca da restituire all'interno di un singolo <code translate="no">ANNSearchRequest</code>, e non decide i risultati finali da restituire per una chiamata a <code translate="no">hybrid_search</code>. In una ricerca ibrida, i risultati finali sono determinati dalla combinazione e dalla riclassificazione dei risultati di più istanze di <code translate="no">ANNSearchRequest</code>.</p></li>
</ul>
<h2 id="Step-2-Configure-a-Reranking-Strategy" class="common-anchor-header">Passo 2: Configurare una strategia di reranking<button data-href="#Step-2-Configure-a-Reranking-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>Dopo aver creato le istanze <code translate="no">AnnSearchRequest</code>, configurare una strategia di reranking per combinare e classificare i risultati. Attualmente esistono due opzioni: <code translate="no">WeightedRanker</code> e <code translate="no">RRFRanker</code>. Per ulteriori informazioni sulle strategie di reranking, consultare <a href="/docs/it/v2.4.x/reranking.md">Reranking</a>.</p>
<ul>
<li><p>Usa il punteggio ponderato</p>
<p>Il sito <code translate="no">WeightedRanker</code> viene usato per assegnare l'importanza ai risultati di ogni ricerca di campi vettoriali con pesi specificati. Se si dà priorità ad alcuni campi vettoriali rispetto ad altri, <code translate="no">WeightedRanker(value1, value2, ..., valueN)</code> può rifletterlo nei risultati della ricerca combinata.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker
<span class="hljs-comment"># Use WeightedRanker to combine results with specified weights</span>
<span class="hljs-comment"># Assign weights of 0.8 to text search and 0.2 to image search</span>
rerank = WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.2</span>)  
<button class="copy-code-btn"></button></code></pre>
<p>Quando si usa <code translate="no">WeightedRanker</code>, tenere presente che:</p>
<ul>
<li>Ogni valore di peso varia da 0 (meno importante) a 1 (più importante), influenzando il punteggio finale aggregato.</li>
<li>Il numero totale di valori di peso forniti in <code translate="no">WeightedRanker</code> deve essere uguale al numero di istanze di <code translate="no">AnnSearchRequest</code> create.</li>
</ul></li>
<li><p>Usare la Reciprocal Rank Fusion (RFF)</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Alternatively, use RRFRanker for reciprocal rank fusion reranking</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

rerank = RRFRanker()
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Step-3-Perform-a-Hybrid-Search" class="common-anchor-header">Passo 3: Eseguire una ricerca ibrida<button data-href="#Step-3-Perform-a-Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Con le istanze <code translate="no">AnnSearchRequest</code> e la strategia di reranking impostata, utilizzare il metodo <code translate="no">hybrid_search()</code> per eseguire la ricerca ibrida.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Before conducting hybrid search, load the collection into memory.</span>
collection.load()

res = collection.hybrid_search(
    reqs, <span class="hljs-comment"># List of AnnSearchRequests created in step 1</span>
    rerank, <span class="hljs-comment"># Reranking strategy specified in step 2</span>
    limit=<span class="hljs-number">2</span> <span class="hljs-comment"># Number of final search results to return</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<p>Parametri:</p>
<ul>
<li><p><code translate="no">reqs</code> <em>(elenco</em>)</p>
<p>Un elenco di richieste di ricerca, in cui ogni richiesta è un oggetto <code translate="no">ANNSearchRequest</code>. Ogni richiesta può corrispondere a un campo vettoriale diverso e a un diverso insieme di parametri di ricerca.</p></li>
<li><p><code translate="no">rerank</code> <em>(oggetto</em>)</p>
<p>La strategia di reranking da utilizzare per la ricerca ibrida. Valori possibili: <code translate="no">WeightedRanker(value1, value2, ..., valueN)</code> e <code translate="no">RRFRanker()</code>.</p>
<p>Per ulteriori informazioni sulle strategie di reranking, consultare <a href="/docs/it/v2.4.x/reranking.md">Reranking</a>.</p></li>
<li><p><code translate="no">limit</code> <em>(int</em>)</p>
<p>Il numero massimo di risultati finali da restituire nella ricerca ibrida.</p></li>
</ul>
<p>L'output è simile al seguente:</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;[&#x27;id: 844, distance: 0.006047376897186041, entity: {}&#x27;, &#x27;id: 876, distance: 0.006422005593776703, entity: {}&#x27;]&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
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
<li><p>In genere, ogni collezione ha un limite predefinito di 4 campi vettoriali. Tuttavia, è possibile regolare la configurazione di <code translate="no">proxy.maxVectorFieldNum</code> per espandere il numero massimo di campi vettoriali in una collezione, con un limite massimo di 10 campi vettoriali per collezione. Per ulteriori informazioni, vedere <a href="https://milvus.io/docs/configure_proxy.md#Proxy-related-Configurations">Configurazioni relative al proxy</a>.</p></li>
<li><p>I campi vettoriali parzialmente indicizzati o caricati in una collezione daranno luogo a un errore.</p></li>
<li><p>Attualmente, ogni <code translate="no">AnnSearchRequest</code> in una ricerca ibrida può contenere un solo vettore di query.</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">DOMANDE FREQUENTI<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>In quale scenario è consigliata la ricerca ibrida?</strong></p>
<p>La ricerca ibrida è ideale per situazioni complesse che richiedono un'elevata precisione, soprattutto quando un'entità può essere rappresentata da più vettori diversi. Questo vale per i casi in cui gli stessi dati, come una frase, vengono elaborati attraverso diversi modelli di incorporamento o quando le informazioni multimodali (come le immagini, le impronte digitali e le impronte vocali di un individuo) vengono convertite in diversi formati vettoriali. Assegnando dei pesi a questi vettori, la loro influenza combinata può arricchire significativamente il richiamo e migliorare l'efficacia dei risultati di ricerca.</p></li>
<li><p><strong>Come fa un ranker ponderato a normalizzare le distanze tra diversi campi vettoriali?</strong></p>
<p>Un ranker ponderato normalizza le distanze tra i campi vettoriali utilizzando i pesi assegnati a ciascun campo. Calcola l'importanza di ogni campo vettoriale in base al suo peso, dando priorità a quelli con pesi più elevati. Si consiglia di utilizzare lo stesso tipo di metrica per tutte le richieste di ricerca di RNA, per garantire la coerenza. Questo metodo garantisce che i vettori ritenuti più significativi abbiano una maggiore influenza sulla classifica generale.</p></li>
<li><p><strong>È possibile utilizzare classificatori alternativi come Cohere Ranker o BGE Ranker?</strong></p>
<p>Attualmente sono supportati solo i classificatori forniti. Per i prossimi aggiornamenti è prevista l'inclusione di altri classificatori.</p></li>
<li><p><strong>È possibile eseguire più operazioni di ricerca ibrida contemporaneamente?</strong></p>
<p>Sì, è supportata l'esecuzione simultanea di più operazioni di ricerca ibrida.</p></li>
<li><p><strong>È possibile utilizzare lo stesso campo vettoriale in più oggetti AnnSearchRequest per eseguire ricerche ibride?</strong></p>
<p>Tecnicamente, è possibile utilizzare lo stesso campo vettoriale in più oggetti AnnSearchRequest per eseguire ricerche ibride. Non è necessario avere più campi vettoriali per una ricerca ibrida.</p></li>
</ul>
