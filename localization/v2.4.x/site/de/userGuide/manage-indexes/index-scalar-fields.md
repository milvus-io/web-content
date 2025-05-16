---
id: index-scalar-fields.md
order: 2
summary: >-
  Dieser Leitfaden führt Sie durch die Erstellung und Konfiguration von skalaren
  Indizes für Felder wie Ganzzahlen, Strings usw.
title: Skalare Felder indizieren
---
<h1 id="Index-Scalar-Fields" class="common-anchor-header">Skalare Felder indizieren<button data-href="#Index-Scalar-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>In Milvus wird ein skalarer Index verwendet, um die Metafilterung nach einem bestimmten Nicht-Vektor-Feldwert zu beschleunigen, ähnlich wie bei einem traditionellen Datenbankindex. Diese Anleitung führt Sie durch das Erstellen und Konfigurieren von skalaren Indizes für Felder wie Ganzzahlen, Strings usw.</p>
<h2 id="Types-of-scalar-indexing" class="common-anchor-header">Arten der skalaren Indizierung<button data-href="#Types-of-scalar-indexing" class="anchor-icon" translate="no">
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
<li><p><strong><a href="https://milvus.io/docs/index-scalar-fields.md#Auto-indexing">Automatische Indizierung</a></strong>: Milvus entscheidet automatisch über den Indextyp, basierend auf dem Datentyp des skalaren Feldes. Dies ist geeignet, wenn Sie den spezifischen Indextyp nicht kontrollieren müssen.</p></li>
<li><p><strong><a href="https://milvus.io/docs/index-scalar-fields.md#Custom-indexing">Benutzerdefinierte Indizierung</a></strong>: Sie geben den genauen Indextyp an, z. B. einen invertierten Index. Damit haben Sie mehr Kontrolle über die Auswahl des Indextyps.</p></li>
</ul>
<h2 id="Auto-indexing" class="common-anchor-header">Automatische Indizierung<button data-href="#Auto-indexing" class="anchor-icon" translate="no">
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
<p>Um die automatische Indizierung zu verwenden, lassen Sie den Parameter <strong>index_type</strong> in <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md"><code translate="no">add_index()</code></a>weg, so dass Milvus den Indextyp auf der Grundlage des skalaren Feldtyps ableiten kann.</p>
</div>
<div class="language-java">
<p>Um die automatische Indizierung zu verwenden, lassen Sie den <strong>indexType-Parameter</strong> in <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md"><code translate="no">IndexParam</code></a>weg, so dass Milvus den Indextyp auf der Grundlage des Skalarfeldtyps ableiten kann.</p>
</div>
<div class="language-javascript">
<p>Um die automatische Indizierung zu verwenden, lassen Sie den Parameter <strong>index_type</strong> in <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>weg, so dass Milvus den Indextyp auf der Grundlage des skalaren Feldtyps ableiten kann.</p>
</div>
<p>Für Zuordnungen zwischen skalaren Datentypen und Standard-Indizierungsalgorithmen, siehe <a href="https://milvus.io/docs/scalar_index.md#Scalar-field-indexing-algorithms">Skalarfeld-Indizierungsalgorithmen</a>.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Auto indexing</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
)

index_params = MilvusClient.prepare_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters</span>

index_params.add_index(
    field_name=<span class="hljs-string">&quot;scalar_1&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed</span>
    index_type=<span class="hljs-string">&quot;&quot;</span>, <span class="hljs-comment"># Type of index to be created. For auto indexing, leave it empty or omit this parameter.</span>
    index_name=<span class="hljs-string">&quot;default_index&quot;</span> <span class="hljs-comment"># Name of the index to be created</span>
)

client.create_index(
  collection_name=<span class="hljs-string">&quot;test_scalar_index&quot;</span>, <span class="hljs-comment"># Specify the collection name</span>
  index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForScalarField</span> <span class="hljs-operator">=</span> IndexParam.builder()
    .fieldName(<span class="hljs-string">&quot;scalar_1&quot;</span>) <span class="hljs-comment">// Name of the scalar field to be indexed</span>
    .indexName(<span class="hljs-string">&quot;default_index&quot;</span>) <span class="hljs-comment">// Name of the index to be created</span>
    .indexType(<span class="hljs-string">&quot;&quot;</span>) <span class="hljs-comment">// Type of index to be created. For auto indexing, leave it empty or omit this parameter.</span>
    .build();

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(indexParamForVectorField);

<span class="hljs-type">CreateIndexReq</span> <span class="hljs-variable">createIndexReq</span> <span class="hljs-operator">=</span> CreateIndexReq.builder()
    .collectionName(<span class="hljs-string">&quot;test_scalar_index&quot;</span>) <span class="hljs-comment">// Specify the collection name</span>
    .indexParams(indexParams)
    .build();

client.createIndex(createIndexReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_scalar_index&quot;</span>, <span class="hljs-comment">// Specify the collection name</span>
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;scalar_1&quot;</span>, <span class="hljs-comment">// Name of the scalar field to be indexed</span>
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;default_index&quot;</span>, <span class="hljs-comment">// Name of the index to be created</span>
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment">// Type of index to be created. For auto indexing, leave it empty or omit this parameter.</span>
})
<button class="copy-code-btn"></button></code></pre>
<h2 id="Custom-indexing" class="common-anchor-header">Benutzerdefinierte Indizierung<button data-href="#Custom-indexing" class="anchor-icon" translate="no">
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
<p>Um benutzerdefinierte Indizierung zu verwenden, geben Sie einen bestimmten Indextyp mit dem <strong>index_type</strong> Parameter in <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md"><code translate="no">add_index()</code></a>.</p>
</div>
<div class="language-java">
<p>Um benutzerdefinierte Indizierung zu verwenden, geben Sie einen bestimmten Indextyp mit dem <strong>indexType-Parameter</strong> in <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md"><code translate="no">IndexParam</code></a>.</p>
</div>
<div class="language-javascript">
<p>Um die benutzerdefinierte Indizierung zu verwenden, geben Sie einen bestimmten Indextyp unter Verwendung des <strong>index_type-Parameters</strong> in <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>.</p>
</div>
<p>Das folgende Beispiel erstellt einen invertierten Index für das Skalarfeld <code translate="no">scalar_2</code>.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">index_params = MilvusClient.prepare_index_params() <span class="hljs-comment">#  Prepare an IndexParams object</span>

index_params.add_index(
    field_name=<span class="hljs-string">&quot;scalar_2&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>, <span class="hljs-comment"># Type of index to be created</span>
    index_name=<span class="hljs-string">&quot;inverted_index&quot;</span> <span class="hljs-comment"># Name of the index to be created</span>
)

client.create_index(
  collection_name=<span class="hljs-string">&quot;test_scalar_index&quot;</span>, <span class="hljs-comment"># Specify the collection name</span>
  index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForScalarField</span> <span class="hljs-operator">=</span> IndexParam.builder()
    .fieldName(<span class="hljs-string">&quot;scalar_1&quot;</span>) <span class="hljs-comment">// Name of the scalar field to be indexed</span>
    .indexName(<span class="hljs-string">&quot;inverted_index&quot;</span>) <span class="hljs-comment">// Name of the index to be created</span>
    .indexType(<span class="hljs-string">&quot;INVERTED&quot;</span>) <span class="hljs-comment">// Type of index to be created</span>
    .build();

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(indexParamForVectorField);

<span class="hljs-type">CreateIndexReq</span> <span class="hljs-variable">createIndexReq</span> <span class="hljs-operator">=</span> CreateIndexReq.builder()
    .collectionName(<span class="hljs-string">&quot;test_scalar_index&quot;</span>) <span class="hljs-comment">// Specify the collection name</span>
    .indexParams(indexParams)
    .build();

client.createIndex(createIndexReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_scalar_index&quot;</span>, <span class="hljs-comment">// Specify the collection name</span>
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;scalar_1&quot;</span>, <span class="hljs-comment">// Name of the scalar field to be indexed</span>
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;inverted_index&quot;</span>, <span class="hljs-comment">// Name of the index to be created</span>
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;INVERTED&quot;</span> <span class="hljs-comment">// Type of index to be created</span>
})
<button class="copy-code-btn"></button></code></pre>
<div class="language-python">
<p><strong>Methoden und Parameter</strong></p>
<ul>
<li><p><strong>prepare_index_params()</strong></p>
<p>Bereitet ein <strong>IndexParams-Objekt</strong> vor.</p></li>
<li><p><strong>add_index()</strong></p>
<p>Fügt Index-Konfigurationen zum <strong>IndexParams-Objekt</strong> hinzu.</p>
<ul>
<li><p><strong>field_name</strong><em>(String</em>)</p>
<p>Der Name des zu indizierenden Skalarfeldes.</p></li>
<li><p><strong>index_type</strong><em>(String</em>):</p>
<p>Der Typ des zu erstellenden skalaren Indexes. Bei impliziter Indizierung lassen Sie diesen Parameter leer oder lassen ihn weg.</p>
<p>Für die benutzerdefinierte Indizierung sind folgende Werte gültig:</p>
<ul>
<li><p><strong>INVERTED</strong>: (empfohlen) Ein invertierter Index besteht aus einem Begriffswörterbuch, das alle tokenisierten Wörter in alphabetischer Reihenfolge enthält. Einzelheiten finden Sie unter <a href="/docs/de/v2.4.x/scalar_index.md">Skalarer Index</a>.</p></li>
<li><p><strong>STL_SORT</strong>: Sortiert skalare Felder mit dem Standard-Sortieralgorithmus der Vorlagenbibliothek. Unterstützt nur numerische Felder (z. B. INT8, INT16, INT32, INT64, FLOAT, DOUBLE).</p></li>
<li><p><strong>Trie</strong>: Eine Baumdatenstruktur für schnelle Präfix-Suchen und -Abrufe. Unterstützt VARCHAR-Felder.</p></li>
</ul></li>
<li><p><strong>index_name</strong><em>(Zeichenkette</em>)</p>
<p>Der Name des zu erstellenden skalaren Indexes. Jedes skalare Feld unterstützt einen Index.</p></li>
</ul></li>
<li><p><strong>create_index()</strong></p>
<p>Erzeugt den Index in der angegebenen Sammlung.</p>
<ul>
<li><p><strong>collection_name</strong><em>(string</em>)</p>
<p>Der Name der Sammlung, für die der Index erstellt wird.</p></li>
<li><p><strong>index_params</strong></p>
<p>Das <strong>IndexParams-Objekt</strong>, das Indexkonfigurationen enthält.</p></li>
</ul></li>
</ul>
</div>
<div class="language-java">
<p><strong>Methoden und Parameter</strong></p>
<ul>
<li><strong>IndexParam</strong>Bereitet ein IndexParam-Objekt vor.<ul>
<li><strong>fieldName</strong><em>(String</em>) Der Name des skalaren Feldes, das indiziert werden soll.</li>
<li><strong>indexName</strong><em>(String</em>) Der Name des zu erstellenden skalaren Indexes. Jedes Skalarfeld unterstützt einen Index.</li>
<li><strong>indexType</strong><em>(String</em>) Der Typ des zu erstellenden skalaren Indexes. Für implizite Indizierung lassen Sie diesen Parameter leer oder lassen ihn weg. Für benutzerdefinierte Indizierung sind folgende Werte gültig:<ul>
<li><strong>INVERTED</strong>: (Empfohlen) Ein invertierter Index besteht aus einem Begriffswörterbuch, das alle tokenisierten Wörter in alphabetischer Reihenfolge enthält. Einzelheiten finden Sie unter <a href="/docs/de/v2.4.x/scalar_index.md">Skalarer Index</a>.</li>
<li><strong>STL_SORT</strong>: Sortiert skalare Felder mit dem Standard-Sortieralgorithmus der Vorlagenbibliothek. Unterstützt boolesche und numerische Felder (z. B. INT8, INT16, INT32, INT64, FLOAT, DOUBLE).</li>
<li><strong>Trie</strong>: Eine Baumdatenstruktur für schnelle Präfix-Suchen und -Abrufe. Unterstützt VARCHAR-Felder.</li>
</ul></li>
</ul></li>
<li><strong>CreateIndexReq</strong>Erzeugt den Index in der angegebenen Sammlung.<ul>
<li><strong>collectionName</strong><em>(String</em>) Der Name der Sammlung, für die der Index erstellt wird.</li>
<li><strong>indexParams</strong><em>(Liste<IndexParam></em>) Eine Liste von IndexParam-Objekten, die Indexkonfigurationen enthalten.</li>
</ul></li>
</ul>
</div>
<div class="language-javascript">
<p><strong>Methoden und Parameter</strong></p>
<ul>
<li><p><strong>createIndex</strong></p>
<p>Erzeugt den Index in der angegebenen Sammlung.</p>
<ul>
<li><strong>collection_name</strong><em>(string</em>) Der Name der Sammlung, für die der Index erstellt wird.</li>
<li><strong>field_name</strong><em>(string</em>) Der Name des skalaren Feldes, das indiziert werden soll.</li>
<li><strong>index_name</strong><em>(string</em>) Der Name des zu erstellenden skalaren Indexes. Jedes Skalarfeld unterstützt einen Index.</li>
<li><strong>index_type</strong><em>(string</em>) Der Typ des zu erstellenden skalaren Indexes. Für implizite Indizierung lassen Sie diesen Parameter leer oder lassen ihn weg. Für benutzerdefinierte Indizierung sind folgende Werte gültig:<ul>
<li><strong>INVERTED</strong>: (empfohlen) Ein invertierter Index besteht aus einem Begriffswörterbuch, das alle tokenisierten Wörter in alphabetischer Reihenfolge enthält. Einzelheiten finden Sie unter <a href="/docs/de/v2.4.x/scalar_index.md">Skalarer Index</a>.</li>
<li><strong>STL_SORT</strong>: Sortiert skalare Felder mit dem Standard-Sortieralgorithmus der Vorlagenbibliothek. Unterstützt boolesche und numerische Felder (z. B. INT8, INT16, INT32, INT64, FLOAT, DOUBLE).</li>
<li><strong>Trie</strong>: Eine Baumdatenstruktur für schnelle Präfix-Suchen und -Abrufe. Unterstützt VARCHAR-Felder.</li>
</ul></li>
</ul></li>
</ul>
</div>
<h2 id="Verifying-the-result" class="common-anchor-header">Überprüfen des Ergebnisses<button data-href="#Verifying-the-result" class="anchor-icon" translate="no">
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
<p>Verwenden Sie die <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/list_indexes.md"><code translate="no">list_indexes()</code></a> Methode, um die Erstellung von skalaren Indizes zu überprüfen:</p>
</div>
<div class="language-java">
<p>Verwenden Sie die Methode <code translate="no">listIndexes()</code>, um die Erstellung von skalaren Indizes zu überprüfen:</p>
</div>
<div class="language-javascript">
<p>Verwenden Sie die Methode <code translate="no">listIndexes()</code>, um die Erstellung skalarer Indizes zu überprüfen:</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">client.list_indexes(
    collection_name=<span class="hljs-string">&quot;test_scalar_index&quot;</span>  <span class="hljs-comment"># Specify the collection name</span>
)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># [&#x27;default_index&#x27;,&#x27;inverted_index&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.ListIndexesReq;

<span class="hljs-type">ListIndexesReq</span> <span class="hljs-variable">listIndexesReq</span> <span class="hljs-operator">=</span> ListIndexesReq.builder()
    .collectionName(<span class="hljs-string">&quot;test_scalar_index&quot;</span>)  <span class="hljs-comment">// Specify the collection name</span>
    .build();

List&lt;String&gt; indexNames = client.listIndexes(listIndexesReq);

System.out.println(indexNames);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;default_index&quot;,</span>
<span class="hljs-comment">//     &quot;inverted_index&quot;</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listIndexes</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;test_scalar_index&#x27;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">indexes</span>)

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;default_index&quot;,</span>
<span class="hljs-comment">//     &quot;inverted_index&quot;</span>
<span class="hljs-comment">// ]   </span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">Begrenzungen<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li>Derzeit unterstützt die skalare Indizierung die Datentypen INT8, INT16, INT32, INT64, FLOAT, DOUBLE, BOOL, VARCHAR und ARRAY, aber nicht den Datentyp JSON.</li>
</ul>
