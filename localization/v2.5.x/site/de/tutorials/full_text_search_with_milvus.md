---
id: full_text_search_with_milvus.md
summary: >-
  Die Volltextsuche ist eine herkömmliche Methode zum Auffinden von Dokumenten
  durch die Suche nach bestimmten Schlüsselwörtern oder Phrasen im Text. Sie
  ordnet die Ergebnisse anhand von Relevanzwerten ein, die aus Faktoren wie der
  Häufigkeit von Begriffen berechnet werden. Während die semantische Suche
  besser in der Lage ist, die Bedeutung und den Kontext zu verstehen, zeichnet
  sich die Volltextsuche durch einen präzisen Abgleich von Schlüsselwörtern aus,
  was sie zu einer nützlichen Ergänzung der semantischen Suche macht. Ein
  gängiger Ansatz für den Aufbau einer Retrieval-Augmented Generation
  (RAG)-Pipeline umfasst das Abrufen von Dokumenten sowohl über die semantische
  Suche als auch über die Volltextsuche, gefolgt von einem Reranking-Prozess zur
  Verfeinerung der Ergebnisse.
title: Volltextsuche mit Milvus
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/full_text_search_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/full_text_search_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Full-Text-Search-with-Milvus" class="common-anchor-header">Volltextsuche mit Milvus<button data-href="#Full-Text-Search-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Die<a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">Volltextsuche</a> ist eine traditionelle Methode zum Auffinden von Dokumenten durch die Suche nach bestimmten Schlüsselwörtern oder Phrasen im Text. Sie ordnet die Ergebnisse auf der Grundlage von Relevanzwerten ein, die aus Faktoren wie der Häufigkeit von Begriffen berechnet werden. Während die semantische Suche besser in der Lage ist, die Bedeutung und den Kontext zu verstehen, zeichnet sich die Volltextsuche durch einen präzisen Abgleich von Schlüsselwörtern aus, was sie zu einer nützlichen Ergänzung der semantischen Suche macht. Ein gängiger Ansatz zur Erstellung einer Retrieval-Augmented Generation (RAG)-Pipeline besteht darin, Dokumente sowohl über die semantische Suche als auch über die Volltextsuche abzurufen, gefolgt von einem Reranking-Prozess zur Verfeinerung der Ergebnisse.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/advanced_rag/hybrid_and_rerank.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Dieser Ansatz konvertiert Text in spärliche Vektoren für die BM25-Bewertung. Zur Aufnahme von Dokumenten können die Benutzer einfach Rohtext eingeben, ohne den Sparse-Vektor manuell zu berechnen. Milvus generiert und speichert die Sparse-Vektoren automatisch. Um Dokumente zu durchsuchen, müssen die Benutzer nur die Suchanfrage angeben. Milvus berechnet intern die BM25-Bewertungen und gibt die Ergebnisse in einer Rangfolge zurück.</p>
<p>Milvus unterstützt auch hybrides Retrieval, indem es die Volltextsuche mit der semantischen Suche auf der Basis dichter Vektoren kombiniert. Sie verbessert in der Regel die Suchqualität und liefert den Nutzern bessere Ergebnisse, indem sie ein Gleichgewicht zwischen der Suche nach Schlüsselwörtern und dem semantischen Verständnis schafft.</p>
<div class="alert note">
<ul>
<li>Die Volltextsuche ist derzeit in Milvus Standalone, Milvus Distributed und Zilliz Cloud verfügbar, obwohl sie in Milvus Lite noch nicht unterstützt wird (diese Funktion ist für eine zukünftige Implementierung geplant). Wenden Sie sich an support@zilliz.com für weitere Informationen.</li>
</ul>
</div>
<h2 id="Preparation" class="common-anchor-header">Vorbereitung<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Install-PyMilvus" class="common-anchor-header">PyMilvus installieren</h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install pymilvus -U</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Wenn Sie Google Colab verwenden, müssen Sie möglicherweise <strong>die Runtime neu starten</strong>, um die soeben installierten Abhängigkeiten zu aktivieren (klicken Sie auf das Menü "Runtime" oben auf dem Bildschirm und wählen Sie "Restart session" aus dem Dropdown-Menü).</p>
</div>
<h3 id="Set-OpenAI-API-Key" class="common-anchor-header">OpenAI API-Schlüssel festlegen</h3><p>Wir werden die Modelle von OpenAI für die Erstellung von Vektoreinbettungen und die Generierung von Antworten verwenden. Sie sollten den <a href="https://platform.openai.com/docs/quickstart">Api-Schlüssel</a> <code translate="no">OPENAI_API_KEY</code> als Umgebungsvariable vorbereiten.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Setup-and-Configuration" class="common-anchor-header">Einrichtung und Konfiguration<button data-href="#Setup-and-Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Importieren Sie die erforderlichen Bibliotheken</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">List</span>
<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    MilvusClient,
    DataType,
    Function,
    FunctionType,
    AnnSearchRequest,
    RRFRanker,
)
<button class="copy-code-btn"></button></code></pre>
<p>Wir werden den MilvusClient verwenden, um eine Verbindung zum Milvus-Server herzustellen.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Connect to Milvus</span>
uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
collection_name = <span class="hljs-string">&quot;full_text_demo&quot;</span>
client = MilvusClient(uri=uri)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Für die connection_args:</p>
<ul>
<li>Sie können einen performanteren Milvus-Server auf <a href="https://milvus.io/docs/quickstart.md">Docker oder Kubernetes</a> einrichten. In diesem Setup verwenden Sie bitte die Serveradresse, z.B.<code translate="no">http://localhost:19530</code>, als <code translate="no">uri</code>.</li>
<li>Wenn Sie <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, den vollständig verwalteten Cloud-Service für Milvus, nutzen möchten, passen Sie <code translate="no">uri</code> und <code translate="no">token</code> an, die dem <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">öffentlichen Endpunkt und dem Api-Schlüssel</a> in Zilliz Cloud entsprechen.</li>
</ul>
</div>
<h2 id="Collection-Setup-for-Full-Text-Search" class="common-anchor-header">Einrichten der Sammlung für die Volltextsuche<button data-href="#Collection-Setup-for-Full-Text-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Das Einrichten einer Sammlung für die Volltextsuche erfordert mehrere Konfigurationsschritte. Lassen Sie uns diese nacheinander durchgehen.</p>
<h3 id="Text-Analysis-Configuration" class="common-anchor-header">Konfiguration der Textanalyse</h3><p>Für die Volltextsuche legen wir fest, wie der Text verarbeitet werden soll. Analyzer sind für die Volltextsuche unerlässlich, da sie Sätze in Token zerlegen und lexikalische Analysen wie Stemming und das Entfernen von Stoppwörtern durchführen. Hier definieren wir einfach einen Analyzer.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define tokenizer parameters for text analysis</span>
analyzer_params = {<span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>, <span class="hljs-string">&quot;filter&quot;</span>: [<span class="hljs-string">&quot;lowercase&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<p>Weitere Details zum Konzept des Analyzers finden Sie in der <a href="https://milvus.io/docs/analyzer-overview.md">Analyzer-Dokumentation</a>.</p>
<h3 id="Collection-Schema-and-BM25-Function" class="common-anchor-header">Sammelschema und BM25-Funktion</h3><p>Nun definieren wir das Schema mit Feldern für Primärschlüssel, Textinhalt, sparse Vektoren (für die Volltextsuche), dense Vektoren (für die semantische Suche) und Metadaten. Wir konfigurieren auch die BM25-Funktion für die Volltextsuche.</p>
<p>Die BM25-Funktion wandelt den Textinhalt automatisch in Sparse-Vektoren um, so dass Milvus die Komplexität der Volltextsuche bewältigen kann, ohne dass eine manuelle Erzeugung von Sparse-Embedding erforderlich ist.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create schema</span>
schema = MilvusClient.create_schema()
schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.VARCHAR,
    is_primary=<span class="hljs-literal">True</span>,
    auto_id=<span class="hljs-literal">True</span>,
    max_length=<span class="hljs-number">100</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;content&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">65535</span>,
    analyzer_params=analyzer_params,
    enable_match=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Enable text matching</span>
    enable_analyzer=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Enable text analysis</span>
)
schema.add_field(field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)
schema.add_field(
    field_name=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">1536</span>,  <span class="hljs-comment"># Dimension for text-embedding-3-small</span>
)
schema.add_field(field_name=<span class="hljs-string">&quot;metadata&quot;</span>, datatype=DataType.JSON)

<span class="hljs-comment"># Define BM25 function to generate sparse vectors from text</span>
bm25_function = Function(
    name=<span class="hljs-string">&quot;bm25&quot;</span>,
    function_type=FunctionType.BM25,
    input_field_names=[<span class="hljs-string">&quot;content&quot;</span>],
    output_field_names=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
)

<span class="hljs-comment"># Add the function to schema</span>
schema.add_function(bm25_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'auto_id': False, 'description': '', 'fields': [{'name': 'id', 'description': '', 'type': &lt;DataType.VARCHAR: 21&gt;, 'params': {'max_length': 100}, 'is_primary': True, 'auto_id': True}, {'name': 'content', 'description': '', 'type': &lt;DataType.VARCHAR: 21&gt;, 'params': {'max_length': 65535, 'enable_match': True, 'enable_analyzer': True, 'analyzer_params': {'tokenizer': 'standard', 'filter': ['lowercase']}}}, {'name': 'sparse_vector', 'description': '', 'type': &lt;DataType.SPARSE_FLOAT_VECTOR: 104&gt;, 'is_function_output': True}, {'name': 'dense_vector', 'description': '', 'type': &lt;DataType.FLOAT_VECTOR: 101&gt;, 'params': {'dim': 1536}}, {'name': 'metadata', 'description': '', 'type': &lt;DataType.JSON: 23&gt;}], 'enable_dynamic_field': False, 'functions': [{'name': 'bm25', 'description': '', 'type': &lt;FunctionType.BM25: 1&gt;, 'input_field_names': ['content'], 'output_field_names': ['sparse_vector'], 'params': {}}]}
</code></pre>
<h3 id="Indexing-and-Collection-Creation" class="common-anchor-header">Indizierung und Erstellung von Sammlungen</h3><p>Um die Suchleistung zu optimieren, erstellen wir Indizes sowohl für sparse als auch für dense Vektorfelder und legen dann die Sammlung in Milvus an.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define indexes</span>
index_params = MilvusClient.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,
)
index_params.add_index(field_name=<span class="hljs-string">&quot;dense_vector&quot;</span>, index_type=<span class="hljs-string">&quot;FLAT&quot;</span>, metric_type=<span class="hljs-string">&quot;IP&quot;</span>)

<span class="hljs-comment"># Drop collection if exist</span>
<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)
<span class="hljs-comment"># Create the collection</span>
client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection &#x27;<span class="hljs-subst">{collection_name}</span>&#x27; created successfully&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Collection 'full_text_demo' created successfully
</code></pre>
<h2 id="Insert-Data" class="common-anchor-header">Daten einfügen<button data-href="#Insert-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>Nach dem Einrichten der Sammlung fügen wir Daten ein, indem wir Entitäten sowohl mit Textinhalten als auch mit ihren Vektordarstellungen vorbereiten. Wir definieren eine Einbettungsfunktion und fügen dann Daten in die Sammlung ein.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Set up OpenAI for embeddings</span>
openai_client = OpenAI(api_key=os.environ.get(<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>))
model_name = <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>


<span class="hljs-comment"># Define embedding generation function for reuse</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">get_embeddings</span>(<span class="hljs-params">texts: <span class="hljs-type">List</span>[<span class="hljs-built_in">str</span>]</span>) -&gt; <span class="hljs-type">List</span>[<span class="hljs-type">List</span>[<span class="hljs-built_in">float</span>]]:
    <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> texts:
        <span class="hljs-keyword">return</span> []

    response = openai_client.embeddings.create(<span class="hljs-built_in">input</span>=texts, model=model_name)
    <span class="hljs-keyword">return</span> [embedding.embedding <span class="hljs-keyword">for</span> embedding <span class="hljs-keyword">in</span> response.data]
<button class="copy-code-btn"></button></code></pre>
<p>Fügen Sie Beispieldokumente in die Sammlung ein.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example documents to insert</span>
documents = [
    {
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Milvus is a vector database built for embedding similarity search and AI applications.&quot;</span>,
        <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;documentation&quot;</span>, <span class="hljs-string">&quot;topic&quot;</span>: <span class="hljs-string">&quot;introduction&quot;</span>},
    },
    {
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Full-text search in Milvus allows you to search using keywords and phrases.&quot;</span>,
        <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;tutorial&quot;</span>, <span class="hljs-string">&quot;topic&quot;</span>: <span class="hljs-string">&quot;full-text search&quot;</span>},
    },
    {
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Hybrid search combines the power of sparse BM25 retrieval with dense vector search.&quot;</span>,
        <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;source&quot;</span>: <span class="hljs-string">&quot;blog&quot;</span>, <span class="hljs-string">&quot;topic&quot;</span>: <span class="hljs-string">&quot;hybrid search&quot;</span>},
    },
]

<span class="hljs-comment"># Prepare entities for insertion</span>
entities = []
texts = [doc[<span class="hljs-string">&quot;content&quot;</span>] <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> documents]
embeddings = get_embeddings(texts)

<span class="hljs-keyword">for</span> i, doc <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(documents):
    entities.append(
        {
            <span class="hljs-string">&quot;content&quot;</span>: doc[<span class="hljs-string">&quot;content&quot;</span>],
            <span class="hljs-string">&quot;dense_vector&quot;</span>: embeddings[i],
            <span class="hljs-string">&quot;metadata&quot;</span>: doc.get(<span class="hljs-string">&quot;metadata&quot;</span>, {}),
        }
    )

<span class="hljs-comment"># Insert data</span>
client.insert(collection_name, entities)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Inserted <span class="hljs-subst">{<span class="hljs-built_in">len</span>(entities)}</span> documents&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Inserted 3 documents
</code></pre>
<h2 id="Perform-Retrieval" class="common-anchor-header">Retrieval durchführen<button data-href="#Perform-Retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können die Methoden <code translate="no">search()</code> oder <code translate="no">hybrid_search()</code> flexibel einsetzen, um eine Volltextsuche (sparse), eine semantische Suche (dense) und eine hybride Suche zu implementieren, um robustere und genauere Suchergebnisse zu erzielen.</p>
<h3 id="Full-Text-Search" class="common-anchor-header">Volltext-Suche</h3><p>Bei der spärlichen Suche wird der BM25-Algorithmus genutzt, um Dokumente zu finden, die bestimmte Schlüsselwörter oder Ausdrücke enthalten. Diese herkömmliche Suchmethode zeichnet sich durch eine präzise Begriffsabstimmung aus und ist besonders effektiv, wenn die Benutzer genau wissen, wonach sie suchen.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example query for keyword search</span>
query = <span class="hljs-string">&quot;full-text search keywords&quot;</span>

<span class="hljs-comment"># BM25 sparse vectors</span>
results = client.search(
    collection_name=collection_name,
    data=[query],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;content&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>],
)
sparse_results = results[<span class="hljs-number">0</span>]

<span class="hljs-comment"># Print results</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\nSparse Search (Full-text search):&quot;</span>)
<span class="hljs-keyword">for</span> i, result <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(sparse_results):
    <span class="hljs-built_in">print</span>(
        <span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Score: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;distance&#x27;</span>]:<span class="hljs-number">.4</span>f}</span>, Content: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;content&#x27;</span>]}</span>&quot;</span>
    )
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Sparse Search (Full-text search):
1. Score: 3.1261, Content: Full-text search in Milvus allows you to search using keywords and phrases.
2. Score: 0.1836, Content: Hybrid search combines the power of sparse BM25 retrieval with dense vector search.
3. Score: 0.1335, Content: Milvus is a vector database built for embedding similarity search and AI applications.
</code></pre>
<h3 id="Semantic-Search" class="common-anchor-header">Semantische Suche</h3><p>Bei der dichten Suche werden Vektoreinbettungen verwendet, um Dokumente mit ähnlicher Bedeutung zu finden, auch wenn sie nicht genau dieselben Schlüsselwörter enthalten. Dieser Ansatz hilft, den Kontext und die Semantik zu verstehen, und ist daher ideal für Abfragen in natürlicher Sprache.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example query for semantic search</span>
query = <span class="hljs-string">&quot;How does Milvus help with similarity search?&quot;</span>

<span class="hljs-comment"># Generate embedding for query</span>
query_embedding = get_embeddings([query])[<span class="hljs-number">0</span>]

<span class="hljs-comment"># Semantic search using dense vectors</span>
results = client.search(
    collection_name=collection_name,
    data=[query_embedding],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;content&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>],
)
dense_results = results[<span class="hljs-number">0</span>]

<span class="hljs-comment"># Print results</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\nDense Search (Semantic):&quot;</span>)
<span class="hljs-keyword">for</span> i, result <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(dense_results):
    <span class="hljs-built_in">print</span>(
        <span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Score: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;distance&#x27;</span>]:<span class="hljs-number">.4</span>f}</span>, Content: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;content&#x27;</span>]}</span>&quot;</span>
    )
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Dense Search (Semantic):
1. Score: 0.6959, Content: Milvus is a vector database built for embedding similarity search and AI applications.
2. Score: 0.6501, Content: Full-text search in Milvus allows you to search using keywords and phrases.
3. Score: 0.4371, Content: Hybrid search combines the power of sparse BM25 retrieval with dense vector search.
</code></pre>
<h3 id="Hybrid-Search" class="common-anchor-header">Hybride Suche</h3><p>Die hybride Suche kombiniert sowohl die Volltextsuche als auch das semantisch dichte Retrieval. Dieser ausgewogene Ansatz verbessert die Suchgenauigkeit und Robustheit, indem er die Stärken beider Methoden nutzt.</p>
<p>Die hybride Suche ist besonders wertvoll bei Retrieval-Augmented Generation (RAG)-Anwendungen, bei denen sowohl das semantische Verständnis als auch der präzise Abgleich von Schlüsselwörtern zu besseren Abrufergebnissen beitragen.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example query for hybrid search</span>
query = <span class="hljs-string">&quot;what is hybrid search&quot;</span>

<span class="hljs-comment"># Get query embedding</span>
query_embedding = get_embeddings([query])[<span class="hljs-number">0</span>]

<span class="hljs-comment"># Set up BM25 search request</span>
sparse_search_params = {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;BM25&quot;</span>}
sparse_request = AnnSearchRequest(
    [query], <span class="hljs-string">&quot;sparse_vector&quot;</span>, sparse_search_params, limit=<span class="hljs-number">5</span>
)

<span class="hljs-comment"># Set up dense vector search request</span>
dense_search_params = {<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}
dense_request = AnnSearchRequest(
    [query_embedding], <span class="hljs-string">&quot;dense_vector&quot;</span>, dense_search_params, limit=<span class="hljs-number">5</span>
)

<span class="hljs-comment"># Perform hybrid search with reciprocal rank fusion</span>
results = client.hybrid_search(
    collection_name,
    [sparse_request, dense_request],
    ranker=RRFRanker(),  <span class="hljs-comment"># Reciprocal Rank Fusion for combining results</span>
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;content&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>],
)
hybrid_results = results[<span class="hljs-number">0</span>]

<span class="hljs-comment"># Print results</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\nHybrid Search (Combined):&quot;</span>)
<span class="hljs-keyword">for</span> i, result <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(hybrid_results):
    <span class="hljs-built_in">print</span>(
        <span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Score: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;distance&#x27;</span>]:<span class="hljs-number">.4</span>f}</span>, Content: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;content&#x27;</span>]}</span>&quot;</span>
    )
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Hybrid Search (Combined):
1. Score: 0.0328, Content: Hybrid search combines the power of sparse BM25 retrieval with dense vector search.
2. Score: 0.0320, Content: Milvus is a vector database built for embedding similarity search and AI applications.
3. Score: 0.0320, Content: Full-text search in Milvus allows you to search using keywords and phrases.
</code></pre>
<h2 id="Answer-Generation" class="common-anchor-header">Generierung von Antworten<button data-href="#Answer-Generation" class="anchor-icon" translate="no">
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
    </button></h2><p>Nach dem Abrufen relevanter Dokumente mit der hybriden Suche können wir ein LLM verwenden, um eine umfassende Antwort auf der Grundlage der abgerufenen Informationen zu generieren. Dies ist der letzte Schritt in einer RAG (Retrieval Augmented Generation) Pipeline.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Format retrieved documents into context</span>
context = <span class="hljs-string">&quot;\n\n&quot;</span>.join([doc[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;content&quot;</span>] <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> hybrid_results])

<span class="hljs-comment"># Create prompt</span>
prompt = <span class="hljs-string">f&quot;&quot;&quot;Answer the following question based on the provided context. 
If the context doesn&#x27;t contain relevant information, just say &quot;I don&#x27;t have enough information to answer this question.&quot;

Context:
<span class="hljs-subst">{context}</span>

Question: <span class="hljs-subst">{query}</span>

Answer:&quot;&quot;&quot;</span>

<span class="hljs-comment"># Call OpenAI API</span>
response = openai_client.chat.completions.create(
    model=<span class="hljs-string">&quot;gpt-4o-mini&quot;</span>,
    messages=[
        {
            <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>,
            <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;You are a helpful assistant that answers questions based on the provided context.&quot;</span>,
        },
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: prompt},
    ],
)

<span class="hljs-built_in">print</span>(response.choices[<span class="hljs-number">0</span>].message.content)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Hybrid search combines the power of sparse BM25 retrieval with dense vector search.
</code></pre>
<p>Das war's! Jetzt haben Sie gerade eine RAG mit hybrider Suche aufgebaut, die die Leistung der BM25-basierten Volltextsuche und der dichten vektorbasierten semantischen Suche kombiniert.</p>
