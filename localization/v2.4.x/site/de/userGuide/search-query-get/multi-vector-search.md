---
id: multi-vector-search.md
order: 2
summary: >-
  In diesem Leitfaden wird gezeigt, wie man eine hybride Suche in Milvus
  durchführt und wie die Ergebnisse neu geordnet werden.
title: Hybride Suche
---
<h1 id="Hybrid-Search" class="common-anchor-header">Hybride Suche<button data-href="#Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Mit Milvus 2.4 haben wir die Unterstützung für mehrere Vektoren und eine hybride Suche eingeführt, was bedeutet, dass Benutzer mehrere Vektorfelder (bis zu 10) in eine einzige Sammlung einbringen können. Diese Vektoren in verschiedenen Spalten repräsentieren unterschiedliche Facetten von Daten, die aus verschiedenen Einbettungsmodellen stammen oder verschiedenen Verarbeitungsmethoden unterzogen wurden. Die Ergebnisse der hybriden Suchvorgänge werden mit Hilfe von Reranking-Strategien wie Reciprocal Rank Fusion (RRF) und Weighted Scoring integriert. Mehr über Reranking-Strategien erfahren Sie unter <a href="/docs/de/v2.4.x/reranking.md">Reranking</a>.</p>
<p>Diese Funktion ist besonders nützlich in umfassenden Suchszenarien, z. B. bei der Identifizierung der ähnlichsten Person in einer Vektorbibliothek auf der Grundlage verschiedener Attribute wie Bilder, Stimme, Fingerabdrücke usw.</p>
<p>In diesem Tutorial werden Sie lernen, wie man:</p>
<ul>
<li><p>Mehrere <code translate="no">AnnSearchRequest</code> Instanzen für Ähnlichkeitssuchen auf verschiedenen Vektorfeldern erstellen;</p></li>
<li><p>eine Reranking-Strategie zu konfigurieren, um Suchergebnisse aus mehreren <code translate="no">AnnSearchRequest</code> Instanzen zu kombinieren und zu ranken;</p></li>
<li><p>Verwenden Sie die <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md"><code translate="no">hybrid_search()</code></a> Methode, um eine hybride Suche durchzuführen.</p></li>
</ul>
<div class="alert note">
<p>Die Codeschnipsel auf dieser Seite verwenden das <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Connections/connect.md">PyMilvus ORM-Modul</a> zur Interaktion mit Milvus. Codeschnipsel mit dem neuen <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient SDK</a> werden bald verfügbar sein.</p>
</div>
<h2 id="Preparations" class="common-anchor-header">Vorbereitungen<button data-href="#Preparations" class="anchor-icon" translate="no">
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
    </button></h2><p>Bevor Sie eine hybride Suche starten, stellen Sie sicher, dass Sie eine Sammlung mit mehreren Vektorfeldern haben. Derzeit sieht Milvus eine Voreinstellung von vier Vektorfeldern pro Sammlung vor, die durch Änderung der <a href="https://milvus.io/docs/configure_proxy.md#proxymaxVectorFieldNum">proxy.maxVectorFieldNum-Konfiguration</a> auf maximal zehn erweitert werden kann.</p>
<p>Nachfolgend ein Beispiel für die Erstellung einer Sammlung mit dem Namen <code translate="no">test_collection</code> mit zwei Vektorfeldern, <code translate="no">filmVector</code> und <code translate="no">posterVector</code>, und das Einfügen von zufälligen Entitäten in diese Sammlung.</p>
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
<h2 id="Step-1-Create-Multiple-AnnSearchRequest-Instances" class="common-anchor-header">Schritt 1: Erstellen mehrerer AnnSearchRequest-Instanzen<button data-href="#Step-1-Create-Multiple-AnnSearchRequest-Instances" class="anchor-icon" translate="no">
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
    </button></h2><p>Eine hybride Suche verwendet die <code translate="no">hybrid_search()</code> API, um mehrere ANN-Suchanfragen in einem einzigen Aufruf durchzuführen. Jede <code translate="no">AnnSearchRequest</code> repräsentiert eine einzelne Suchanfrage für ein bestimmtes Vektorfeld.</p>
<p>Das folgende Beispiel erstellt zwei <code translate="no">AnnSearchRequest</code> Instanzen, um individuelle Ähnlichkeitssuchen für zwei Vektorfelder durchzuführen.</p>
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
<p>Parameter:</p>
<ul>
<li><p><code translate="no">AnnSearchRequest</code> <em>(Objekt</em>)</p>
<p>Eine Klasse, die eine ANN-Suchanfrage darstellt. Jede hybride Suche kann jeweils 1 bis 1.024 <code translate="no">ANNSearchRequest</code> Objekte enthalten.</p></li>
<li><p><code translate="no">data</code> <em>(Liste</em>)</p>
<p>Der Abfragevektor, der in einem einzelnen <code translate="no">AnnSearchRequest</code> gesucht werden soll. Derzeit akzeptiert dieser Parameter eine Liste, die nur einen einzigen Abfragevektor enthält, z. B. <code translate="no">[[0.5791814851218929, 0.5792985702614121, 0.8480776460143558, 0.16098005945243, 0.2842979317256803]]</code>. In Zukunft wird dieser Parameter erweitert, um mehrere Abfragevektoren zu akzeptieren.</p></li>
<li><p><code translate="no">anns_field</code> <em>(Zeichenkette</em>)</p>
<p>Der Name des Vektorfeldes, das in einem einzelnen <code translate="no">AnnSearchRequest</code> verwendet werden soll.</p></li>
<li><p><code translate="no">param</code> <em>(dict</em>)</p>
<p>Ein Wörterbuch mit Suchparametern für eine einzelne <code translate="no">AnnSearchRequest</code>. Diese Suchparameter sind identisch mit denen für eine Einzelvektorsuche. Weitere Informationen finden Sie unter <a href="https://milvus.io/docs/single-vector-search.md#Search-parameters">Suchparameter</a>.</p></li>
<li><p><code translate="no">limit</code> <em>(int</em>)</p>
<p>Die maximale Anzahl der Suchergebnisse, die in eine einzelne <code translate="no">ANNSearchRequest</code> aufgenommen werden sollen.</p>
<p>Dieser Parameter wirkt sich nur auf die Anzahl der Suchergebnisse aus, die innerhalb eines einzelnen <code translate="no">ANNSearchRequest</code> zurückgegeben werden, und entscheidet nicht über die endgültigen Ergebnisse, die bei einem Aufruf von <code translate="no">hybrid_search</code> zurückgegeben werden. Bei einer hybriden Suche werden die endgültigen Ergebnisse durch die Kombination und das Reranking der Ergebnisse aus mehreren <code translate="no">ANNSearchRequest</code> Instanzen bestimmt.</p></li>
</ul>
<h2 id="Step-2-Configure-a-Reranking-Strategy" class="common-anchor-header">Schritt 2: Konfigurieren Sie eine Reranking-Strategie<button data-href="#Step-2-Configure-a-Reranking-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>Nachdem Sie <code translate="no">AnnSearchRequest</code> Instanzen erstellt haben, konfigurieren Sie eine Reranking-Strategie, um die Ergebnisse zu kombinieren und neu zu ordnen. Derzeit gibt es zwei Optionen: <code translate="no">WeightedRanker</code> und <code translate="no">RRFRanker</code>. Weitere Informationen zu Ranking-Strategien finden Sie unter <a href="/docs/de/v2.4.x/reranking.md">Reranking</a>.</p>
<ul>
<li><p>Gewichtetes Scoring verwenden</p>
<p>Die <code translate="no">WeightedRanker</code> wird verwendet, um den Ergebnissen aus jeder Vektorfeldsuche mit bestimmten Gewichtungen Bedeutung zuzuweisen. Wenn Sie einige Vektorfelder gegenüber anderen bevorzugen, kann <code translate="no">WeightedRanker(value1, value2, ..., valueN)</code> dies in den kombinierten Suchergebnissen widerspiegeln.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker
<span class="hljs-comment"># Use WeightedRanker to combine results with specified weights</span>
<span class="hljs-comment"># Assign weights of 0.8 to text search and 0.2 to image search</span>
rerank = WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.2</span>)  
<button class="copy-code-btn"></button></code></pre>
<p>Wenn Sie <code translate="no">WeightedRanker</code> verwenden, beachten Sie Folgendes:</p>
<ul>
<li>Jeder Gewichtungswert reicht von 0 (am wenigsten wichtig) bis 1 (am wichtigsten) und beeinflusst die endgültige aggregierte Punktzahl.</li>
<li>Die Gesamtzahl der in <code translate="no">WeightedRanker</code> angegebenen Gewichtungswerte sollte der Anzahl der von Ihnen erstellten <code translate="no">AnnSearchRequest</code> Instanzen entsprechen.</li>
</ul></li>
<li><p>Verwenden Sie Reciprocal Rank Fusion (RFF)</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Alternatively, use RRFRanker for reciprocal rank fusion reranking</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

rerank = RRFRanker()
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Step-3-Perform-a-Hybrid-Search" class="common-anchor-header">Schritt 3: Führen Sie eine hybride Suche durch<button data-href="#Step-3-Perform-a-Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Mit den <code translate="no">AnnSearchRequest</code> Instanzen und der eingestellten Rangordnungsstrategie verwenden Sie die <code translate="no">hybrid_search()</code> Methode, um die hybride Suche durchzuführen.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Before conducting hybrid search, load the collection into memory.</span>
collection.load()

res = collection.hybrid_search(
    reqs, <span class="hljs-comment"># List of AnnSearchRequests created in step 1</span>
    rerank, <span class="hljs-comment"># Reranking strategy specified in step 2</span>
    limit=<span class="hljs-number">2</span> <span class="hljs-comment"># Number of final search results to return</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<p>Parameter:</p>
<ul>
<li><p><code translate="no">reqs</code> <em>(Liste</em>)</p>
<p>Eine Liste von Suchanfragen, wobei jede Anfrage ein <code translate="no">ANNSearchRequest</code> Objekt ist. Jede Anfrage kann einem anderen Vektorfeld und einem anderen Satz von Suchparametern entsprechen.</p></li>
<li><p><code translate="no">rerank</code> <em>(Objekt</em>)</p>
<p>Die für die hybride Suche zu verwendende Rangfolgestrategie. Mögliche Werte: <code translate="no">WeightedRanker(value1, value2, ..., valueN)</code> und <code translate="no">RRFRanker()</code>.</p>
<p>Weitere Informationen über Ranking-Strategien finden Sie unter <a href="/docs/de/v2.4.x/reranking.md">Reranking</a>.</p></li>
<li><p><code translate="no">limit</code> <em>(int</em>)</p>
<p>Die maximale Anzahl der Endergebnisse, die bei der hybriden Suche zurückgegeben werden sollen.</p></li>
</ul>
<p>Die Ausgabe ist ähnlich wie die folgende:</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;[&#x27;id: 844, distance: 0.006047376897186041, entity: {}&#x27;, &#x27;id: 876, distance: 0.006422005593776703, entity: {}&#x27;]&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">Limits<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Normalerweise sind in jeder Sammlung standardmäßig bis zu 4 Vektorfelder erlaubt. Sie haben jedoch die Möglichkeit, die Konfiguration von <code translate="no">proxy.maxVectorFieldNum</code> so anzupassen, dass die maximale Anzahl von Vektorfeldern in einer Sammlung auf maximal 10 Vektorfelder pro Sammlung erweitert wird. Siehe <a href="https://milvus.io/docs/configure_proxy.md#Proxy-related-Configurations">Proxy-bezogene Konfigurationen</a> für weitere Informationen.</p></li>
<li><p>Unvollständig indizierte oder geladene Vektorfelder in einer Sammlung führen zu einem Fehler.</p></li>
<li><p>Derzeit kann jede <code translate="no">AnnSearchRequest</code> in einer hybriden Suche nur einen Abfragevektor enthalten.</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>In welchem Szenario ist die hybride Suche zu empfehlen?</strong></p>
<p>Die hybride Suche ist ideal für komplexe Situationen, die eine hohe Genauigkeit erfordern, insbesondere wenn eine Entität durch mehrere, unterschiedliche Vektoren dargestellt werden kann. Dies gilt für Fälle, in denen dieselben Daten, wie z. B. ein Satz, durch verschiedene Einbettungsmodelle verarbeitet werden oder wenn multimodale Informationen (wie Bilder, Fingerabdrücke und Stimmabdrücke einer Person) in verschiedene Vektorformate umgewandelt werden. Durch die Zuweisung von Gewichtungen für diese Vektoren kann ihr kombinierter Einfluss die Wiederauffindbarkeit erheblich steigern und die Effizienz der Suchergebnisse verbessern.</p></li>
<li><p><strong>Wie normalisiert ein gewichteter Ranker die Abstände zwischen verschiedenen Vektorfeldern?</strong></p>
<p>Ein gewichteter Ranker normalisiert die Abstände zwischen Vektorfeldern anhand der jedem Feld zugewiesenen Gewichte. Er berechnet die Wichtigkeit jedes Vektorfeldes entsprechend seiner Gewichtung und gibt den Feldern mit höherer Gewichtung den Vorrang. Es ist ratsam, für alle ANN-Suchanfragen denselben metrischen Typ zu verwenden, um Konsistenz zu gewährleisten. Diese Methode stellt sicher, dass Vektoren, die als wichtiger eingestuft werden, einen größeren Einfluss auf das Gesamtranking haben.</p></li>
<li><p><strong>Ist es möglich, alternative Ranker wie Cohere Ranker oder BGE Ranker zu verwenden?</strong></p>
<p>Derzeit werden nur die angebotenen Ranker unterstützt. Für künftige Updates ist die Aufnahme weiterer Ranker geplant.</p></li>
<li><p><strong>Ist es möglich, mehrere hybride Suchvorgänge gleichzeitig auszuführen?</strong></p>
<p>Ja, die gleichzeitige Ausführung von mehreren hybriden Suchoperationen wird unterstützt.</p></li>
<li><p><strong>Kann ich das gleiche Vektorfeld in mehreren AnnSearchRequest-Objekten verwenden, um hybride Suchvorgänge durchzuführen?</strong></p>
<p>Technisch ist es möglich, dasselbe Vektorfeld in mehreren AnnSearchRequest-Objekten für hybride Suchvorgänge zu verwenden. Es ist nicht notwendig, mehrere Vektorfelder für eine hybride Suche zu verwenden.</p></li>
</ul>
