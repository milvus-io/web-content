---
id: tutorial-implement-a-time-based-ranking-in-milvus.md
title: >-
  Tutorial: Zeitbasiertes Ranking in Milvus implementierenCompatible with Milvus
  2.6.x
summary: >-
  In vielen Suchanwendungen ist die Aktualität der Inhalte ebenso wichtig wie
  ihre Relevanz. Nachrichtenartikel, Produktlisten, Beiträge in sozialen Medien
  und Forschungsarbeiten profitieren alle von Rankingsystemen, die ein
  Gleichgewicht zwischen semantischer Relevanz und Aktualität herstellen. In
  diesem Tutorial wird gezeigt, wie ein zeitbasiertes Ranking in Milvus unter
  Verwendung von Decay-Rankern implementiert wird.
beta: Milvus 2.6.x
---
<h1 id="Tutorial-Implement-Time-based-Ranking-in-Milvus" class="common-anchor-header">Tutorial: Zeitbasiertes Ranking in Milvus implementieren<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Tutorial-Implement-Time-based-Ranking-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>In vielen Suchanwendungen ist die Aktualität von Inhalten ebenso wichtig wie ihre Relevanz. Nachrichtenartikel, Produktlisten, Beiträge in sozialen Medien und Forschungsarbeiten profitieren alle von Rankingsystemen, die ein Gleichgewicht zwischen semantischer Relevanz und Aktualität herstellen. In diesem Tutorial wird gezeigt, wie ein zeitbasiertes Ranking in Milvus mithilfe von Decay-Rankern implementiert werden kann.</p>
<h2 id="Understand-decay-rankers-in-Milvus" class="common-anchor-header">Verstehen Sie Decay Rankers in Milvus<button data-href="#Understand-decay-rankers-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Mit Decay-Rankern können Sie Dokumente basierend auf numerischen Werten (wie Zeitstempeln) relativ zu einem Referenzpunkt aufwerten oder benachteiligen. Für das zeitbasierte Ranking bedeutet dies, dass neuere Dokumente eine höhere Punktzahl erhalten können als ältere, selbst wenn ihre semantische Relevanz ähnlich ist.</p>
<p>Milvus unterstützt drei Arten von Zerfalls-Rankern:</p>
<ul>
<li><p><strong>Gaussian</strong> (<code translate="no">gauss</code>): Eine glockenförmige Kurve, die einen sanften, allmählichen Abstieg bietet</p></li>
<li><p><strong>Exponential</strong> (<code translate="no">exp</code>): Erzeugt einen stärkeren anfänglichen Abfall zur Hervorhebung neuerer Inhalte</p></li>
<li><p><strong>Linear</strong> (<code translate="no">linear</code>): Ein geradliniger Abfall, der vorhersehbar und einfach zu verstehen ist</p></li>
</ul>
<p>Jeder Ranker hat unterschiedliche Eigenschaften, die ihn für verschiedene Anwendungsfälle geeignet machen. Weitere Informationen finden Sie unter <a href="/docs/de/decay-ranker-overview.md">Decay Ranker Overview</a>.</p>
<h2 id="Build-a-time-aware-search-system" class="common-anchor-header">Aufbau eines zeitabhängigen Suchsystems<button data-href="#Build-a-time-aware-search-system" class="anchor-icon" translate="no">
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
    </button></h2><p>Wir werden ein Suchsystem für Nachrichtenartikel erstellen, das zeigt, wie man Inhalte sowohl nach Relevanz als auch nach Zeit bewerten kann. Beginnen wir mit der Implementierung:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> datetime
<span class="hljs-keyword">import</span> matplotlib.pyplot <span class="hljs-keyword">as</span> plt
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    MilvusClient,
    DataType,
    Function,
    FunctionType,
    AnnSearchRequest,
)

<span class="hljs-comment"># Create connection to Milvus</span>
milvus_client = MilvusClient(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Define collection name</span>
collection_name = <span class="hljs-string">&quot;news_articles_tutorial&quot;</span>

<span class="hljs-comment"># Clean up any existing collection with the same name</span>
milvus_client.drop_collection(collection_name)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-1-Design-the-schema" class="common-anchor-header">Schritt 1: Entwurf des Schemas<button data-href="#Step-1-Design-the-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>Für die zeitbasierte Suche müssen wir den Zeitstempel der Veröffentlichung zusammen mit dem Inhalt speichern:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create schema with fields for content and temporal information</span>
schema = milvus_client.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>, auto_id=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;headline&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">200</span>, enable_analyzer=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;content&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">2000</span>, enable_analyzer=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1024</span>)  <span class="hljs-comment"># For dense embeddings</span>
schema.add_field(<span class="hljs-string">&quot;sparse_vector&quot;</span>, DataType.SPARSE_FLOAT_VECTOR)  <span class="hljs-comment"># For sparse (BM25) search</span>
schema.add_field(<span class="hljs-string">&quot;publish_date&quot;</span>, DataType.INT64)  <span class="hljs-comment"># Timestamp for decay ranking</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-2-Set-up-embedding-functions" class="common-anchor-header">Schritt 2: Einbindungsfunktionen einrichten<button data-href="#Step-2-Set-up-embedding-functions" class="anchor-icon" translate="no">
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
    </button></h2><p>Wir konfigurieren sowohl dichte (semantische) als auch spärliche (Stichwort) Einbettungsfunktionen:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create embedding function for semantic search</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;siliconflow_embedding&quot;</span>,
    function_type=FunctionType.TEXTEMBEDDING,
    input_field_names=[<span class="hljs-string">&quot;content&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],
    params={
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;siliconflow&quot;</span>,
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;BAAI/bge-large-en-v1.5&quot;</span>,
        <span class="hljs-string">&quot;credential&quot;</span>: <span class="hljs-string">&quot;your-api-key&quot;</span>
    }
)
schema.add_function(text_embedding_function)

<span class="hljs-comment"># Create BM25 function for keyword search</span>
bm25_function = Function(
    name=<span class="hljs-string">&quot;bm25&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;content&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;sparse_vector&quot;</span>],
    function_type=FunctionType.BM25,
)
schema.add_function(bm25_function)
<button class="copy-code-btn"></button></code></pre>
<p>Einzelheiten zur Verwendung der Milvus-Einbettungsfunktionen finden Sie unter <a href="/docs/de/embedding-function-overview.md">Übersicht über die Einbettungsfunktionen</a>.</p>
<h2 id="Step-3-Configure-index-parameters" class="common-anchor-header">Schritt 3: Konfigurieren der Indexparameter<button data-href="#Step-3-Configure-index-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>Richten wir die entsprechenden Indexparameter für die schnelle Vektorsuche ein:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Set up indexes for fast search</span>
index_params = milvus_client.prepare_index_params()

<span class="hljs-comment"># Dense vector index</span>
index_params.add_index(field_name=<span class="hljs-string">&quot;dense&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;L2&quot;</span>)

<span class="hljs-comment"># Sparse vector index</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,
)

<span class="hljs-comment"># Create the collection with our schema and indexes</span>
milvus_client.create_collection(
    collection_name,
    schema=schema,
    index_params=index_params,
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-4-Prepare-sample-data" class="common-anchor-header">Schritt 4: Beispieldaten vorbereiten<button data-href="#Step-4-Prepare-sample-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Für dieses Tutorial erstellen wir einen Satz von Nachrichtenartikeln mit unterschiedlichen Veröffentlichungsdaten. Beachten Sie, dass wir Paare von Artikeln mit nahezu identischem Inhalt, aber unterschiedlichem Datum hinzugefügt haben, um den Effekt des Decay-Rankings deutlich zu machen:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get current time</span>
current_time = <span class="hljs-built_in">int</span>(datetime.datetime.now().timestamp())
current_date = datetime.datetime.fromtimestamp(current_time)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Current time: <span class="hljs-subst">{current_date.strftime(<span class="hljs-string">&#x27;%Y-%m-%d %H:%M:%S&#x27;</span>)}</span>&quot;</span>)

<span class="hljs-comment"># Sample news articles spanning different dates</span>
articles = [
    {
        <span class="hljs-string">&quot;headline&quot;</span>: <span class="hljs-string">&quot;AI Breakthrough Enables Medical Diagnosis Advancement&quot;</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Researchers announced a major breakthrough in AI-based medical diagnostics, enabling faster and more accurate detection of rare diseases.&quot;</span>,
        <span class="hljs-string">&quot;publish_date&quot;</span>: <span class="hljs-built_in">int</span>((current_date - datetime.timedelta(days=<span class="hljs-number">120</span>)).timestamp())  <span class="hljs-comment"># ~4 months ago</span>
    },
    {
        <span class="hljs-string">&quot;headline&quot;</span>: <span class="hljs-string">&quot;Tech Giants Compete in New AI Race&quot;</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Major technology companies are investing billions in a new race to develop the most advanced artificial intelligence systems.&quot;</span>,
        <span class="hljs-string">&quot;publish_date&quot;</span>: <span class="hljs-built_in">int</span>((current_date - datetime.timedelta(days=<span class="hljs-number">60</span>)).timestamp())  <span class="hljs-comment"># ~2 months ago</span>
    },
    {
        <span class="hljs-string">&quot;headline&quot;</span>: <span class="hljs-string">&quot;AI Ethics Guidelines Released by International Body&quot;</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;A consortium of international organizations has released new guidelines addressing ethical concerns in artificial intelligence development and deployment.&quot;</span>,
        <span class="hljs-string">&quot;publish_date&quot;</span>: <span class="hljs-built_in">int</span>((current_date - datetime.timedelta(days=<span class="hljs-number">30</span>)).timestamp())  <span class="hljs-comment"># 1 month ago</span>
    },
    {
        <span class="hljs-string">&quot;headline&quot;</span>: <span class="hljs-string">&quot;Latest Deep Learning Models Show Remarkable Progress&quot;</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;The newest generation of deep learning models demonstrates unprecedented capabilities in language understanding and generation.&quot;</span>,
        <span class="hljs-string">&quot;publish_date&quot;</span>: <span class="hljs-built_in">int</span>((current_date - datetime.timedelta(days=<span class="hljs-number">15</span>)).timestamp())  <span class="hljs-comment"># 15 days ago</span>
    },
    <span class="hljs-comment"># Articles with identical content but different dates</span>
    {
        <span class="hljs-string">&quot;headline&quot;</span>: <span class="hljs-string">&quot;AI Research Advancements Published in January&quot;</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Breakthrough research in artificial intelligence shows remarkable advancements in multiple domains.&quot;</span>,
        <span class="hljs-string">&quot;publish_date&quot;</span>: <span class="hljs-built_in">int</span>((current_date - datetime.timedelta(days=<span class="hljs-number">90</span>)).timestamp())  <span class="hljs-comment"># ~3 months ago</span>
    },
    {
        <span class="hljs-string">&quot;headline&quot;</span>: <span class="hljs-string">&quot;New AI Research Results Released This Week&quot;</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Breakthrough research in artificial intelligence shows remarkable advancements in multiple domains.&quot;</span>,
        <span class="hljs-string">&quot;publish_date&quot;</span>: <span class="hljs-built_in">int</span>((current_date - datetime.timedelta(days=<span class="hljs-number">5</span>)).timestamp())  <span class="hljs-comment"># Very recent - 5 days ago</span>
    },
    {
        <span class="hljs-string">&quot;headline&quot;</span>: <span class="hljs-string">&quot;AI Development Updates Released Yesterday&quot;</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Recent developments in artificial intelligence research are showing promising results across various applications.&quot;</span>,
        <span class="hljs-string">&quot;publish_date&quot;</span>: <span class="hljs-built_in">int</span>((current_date - datetime.timedelta(days=<span class="hljs-number">1</span>)).timestamp())  <span class="hljs-comment"># Just yesterday</span>
    },
]

<span class="hljs-comment"># Insert articles into the collection</span>
milvus_client.insert(collection_name, articles)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Inserted <span class="hljs-subst">{<span class="hljs-built_in">len</span>(articles)}</span> articles into the collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-5-Configure-different-decay-rankers" class="common-anchor-header">Schritt 5: Konfigurieren Sie verschiedene Decay Ranker<button data-href="#Step-5-Configure-different-decay-rankers" class="anchor-icon" translate="no">
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
    </button></h2><p>Lassen Sie uns nun drei verschiedene Decay Ranker erstellen, jeder mit unterschiedlichen Parametern, um ihre Unterschiede hervorzuheben:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use current time as reference point</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Using current time as reference point&quot;</span>)

<span class="hljs-comment"># Create a Gaussian decay ranker</span>
gaussian_ranker = Function(
    name=<span class="hljs-string">&quot;time_decay_gaussian&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;publish_date&quot;</span>],
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;decay&quot;</span>,
        <span class="hljs-string">&quot;function&quot;</span>: <span class="hljs-string">&quot;gauss&quot;</span>,           <span class="hljs-comment"># Gaussian/bell curve decay</span>
        <span class="hljs-string">&quot;origin&quot;</span>: current_time,        <span class="hljs-comment"># Current time as reference point</span>
        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,    <span class="hljs-comment"># One week (full relevance)</span>
        <span class="hljs-string">&quot;decay&quot;</span>: <span class="hljs-number">0.5</span>,                  <span class="hljs-comment"># Articles from two weeks ago have half relevance </span>
        <span class="hljs-string">&quot;scale&quot;</span>: <span class="hljs-number">14</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>     <span class="hljs-comment"># Two weeks scale parameter</span>
    }
)

<span class="hljs-comment"># Create an exponential decay ranker with different parameters</span>
exponential_ranker = Function(
    name=<span class="hljs-string">&quot;time_decay_exponential&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;publish_date&quot;</span>],
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;decay&quot;</span>,
        <span class="hljs-string">&quot;function&quot;</span>: <span class="hljs-string">&quot;exp&quot;</span>,             <span class="hljs-comment"># Exponential decay</span>
        <span class="hljs-string">&quot;origin&quot;</span>: current_time,        <span class="hljs-comment"># Current time as reference point</span>
        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">3</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,    <span class="hljs-comment"># Shorter offset (3 days vs 7 days)</span>
        <span class="hljs-string">&quot;decay&quot;</span>: <span class="hljs-number">0.3</span>,                  <span class="hljs-comment"># Steeper decay (0.3 vs 0.5) </span>
        <span class="hljs-string">&quot;scale&quot;</span>: <span class="hljs-number">10</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>     <span class="hljs-comment"># Different scale (10 days vs 14 days)</span>
    }
)

<span class="hljs-comment"># Create a linear decay ranker</span>
linear_ranker = Function(
    name=<span class="hljs-string">&quot;time_decay_linear&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;publish_date&quot;</span>],
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;decay&quot;</span>,
        <span class="hljs-string">&quot;function&quot;</span>: <span class="hljs-string">&quot;linear&quot;</span>,          <span class="hljs-comment"># Linear decay</span>
        <span class="hljs-string">&quot;origin&quot;</span>: current_time,        <span class="hljs-comment"># Current time as reference point</span>
        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,    <span class="hljs-comment"># One week (full relevance)</span>
        <span class="hljs-string">&quot;decay&quot;</span>: <span class="hljs-number">0.5</span>,                  <span class="hljs-comment"># Articles from two weeks ago have half relevance</span>
        <span class="hljs-string">&quot;scale&quot;</span>: <span class="hljs-number">14</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>     <span class="hljs-comment"># Two weeks scale parameter</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Im vorangehenden Code:</p>
<ul>
<li><p><code translate="no">reranker</code>: Auf <code translate="no">decay</code> für zeitbasierte Zerfallsfunktionen setzen</p></li>
<li><p><code translate="no">function</code>: Der Typ der Abklingfunktion (Gauß, exp oder linear)</p></li>
<li><p><code translate="no">origin</code>: Der Bezugspunkt (normalerweise die aktuelle Zeit)</p></li>
<li><p><code translate="no">offset</code>: Der Zeitraum, in dem Dokumente ihre volle Relevanz behalten</p></li>
<li><p><code translate="no">scale</code>: Steuert, wie schnell die Relevanz nach dem Offset abnimmt</p></li>
<li><p><code translate="no">decay</code>: Der Abklingfaktor bei Offset+Skala (z. B. 0,5 bedeutet halbe Relevanz)</p></li>
</ul>
<p>Beachten Sie, dass wir den exponentiellen Ranker mit verschiedenen Parametern konfiguriert haben, um zu zeigen, wie Sie diese Funktionen für verschiedene Verhaltensweisen anpassen können.</p>
<h2 id="Step-6-Visualize-the-decay-rankers" class="common-anchor-header">Schritt 6: Visualisierung der Decay Ranker<button data-href="#Step-6-Visualize-the-decay-rankers" class="anchor-icon" translate="no">
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
    </button></h2><p>Bevor wir eine Suche durchführen, sollten wir einen visuellen Vergleich des Verhaltens dieser unterschiedlich konfigurierten Decay Ranker erstellen:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Visualize the decay functions with different parameters</span>
days = np.linspace(<span class="hljs-number">0</span>, <span class="hljs-number">90</span>, <span class="hljs-number">100</span>)
<span class="hljs-comment"># Gaussian: offset=7, scale=14, decay=0.5</span>
gaussian_values = [<span class="hljs-number">1.0</span> <span class="hljs-keyword">if</span> d &lt;= <span class="hljs-number">7</span> <span class="hljs-keyword">else</span> (<span class="hljs-number">0.5</span> ** ((d - <span class="hljs-number">7</span>) / <span class="hljs-number">14</span>)) <span class="hljs-keyword">for</span> d <span class="hljs-keyword">in</span> days]
<span class="hljs-comment"># Exponential: offset=3, scale=10, decay=0.3</span>
exponential_values = [<span class="hljs-number">1.0</span> <span class="hljs-keyword">if</span> d &lt;= <span class="hljs-number">3</span> <span class="hljs-keyword">else</span> (<span class="hljs-number">0.3</span> ** ((d - <span class="hljs-number">3</span>) / <span class="hljs-number">10</span>)) <span class="hljs-keyword">for</span> d <span class="hljs-keyword">in</span> days]
<span class="hljs-comment"># Linear: offset=7, scale=14, decay=0.5</span>
linear_values = [<span class="hljs-number">1.0</span> <span class="hljs-keyword">if</span> d &lt;= <span class="hljs-number">7</span> <span class="hljs-keyword">else</span> <span class="hljs-built_in">max</span>(<span class="hljs-number">0</span>, <span class="hljs-number">1.0</span> - ((d - <span class="hljs-number">7</span>) / <span class="hljs-number">14</span>) * <span class="hljs-number">0.5</span>) <span class="hljs-keyword">for</span> d <span class="hljs-keyword">in</span> days]

plt.figure(figsize=(<span class="hljs-number">10</span>, <span class="hljs-number">6</span>))
plt.plot(days, gaussian_values, label=<span class="hljs-string">&#x27;Gaussian (offset=7, scale=14, decay=0.5)&#x27;</span>)
plt.plot(days, exponential_values, label=<span class="hljs-string">&#x27;Exponential (offset=3, scale=10, decay=0.3)&#x27;</span>)
plt.plot(days, linear_values, label=<span class="hljs-string">&#x27;Linear (offset=7, scale=14, decay=0.5)&#x27;</span>)
plt.axhline(y=<span class="hljs-number">0.5</span>, color=<span class="hljs-string">&#x27;gray&#x27;</span>, linestyle=<span class="hljs-string">&#x27;--&#x27;</span>, alpha=<span class="hljs-number">0.5</span>, label=<span class="hljs-string">&#x27;Half relevance&#x27;</span>)
plt.xlabel(<span class="hljs-string">&#x27;Days ago&#x27;</span>)
plt.ylabel(<span class="hljs-string">&#x27;Relevance factor&#x27;</span>)
plt.title(<span class="hljs-string">&#x27;Decay Functions Comparison&#x27;</span>)
plt.legend()
plt.grid(<span class="hljs-literal">True</span>)
plt.savefig(<span class="hljs-string">&#x27;decay_functions.png&#x27;</span>)
plt.close()

<span class="hljs-comment"># Print numerical representation</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n=== TIME DECAY EFFECT VISUALIZATION ===&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Days ago | Gaussian | Exponential | Linear&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;-----------------------------------------&quot;</span>)
<span class="hljs-keyword">for</span> days <span class="hljs-keyword">in</span> [<span class="hljs-number">0</span>, <span class="hljs-number">3</span>, <span class="hljs-number">7</span>, <span class="hljs-number">10</span>, <span class="hljs-number">14</span>, <span class="hljs-number">21</span>, <span class="hljs-number">30</span>, <span class="hljs-number">60</span>, <span class="hljs-number">90</span>]:
    <span class="hljs-comment"># Calculate decay factors based on the parameters in our rankers</span>
    gaussian_decay = <span class="hljs-number">1.0</span> <span class="hljs-keyword">if</span> days &lt;= <span class="hljs-number">7</span> <span class="hljs-keyword">else</span> (<span class="hljs-number">0.5</span> ** ((days - <span class="hljs-number">7</span>) / <span class="hljs-number">14</span>))
    exponential_decay = <span class="hljs-number">1.0</span> <span class="hljs-keyword">if</span> days &lt;= <span class="hljs-number">3</span> <span class="hljs-keyword">else</span> (<span class="hljs-number">0.3</span> ** ((days - <span class="hljs-number">3</span>) / <span class="hljs-number">10</span>))
    linear_decay = <span class="hljs-number">1.0</span> <span class="hljs-keyword">if</span> days &lt;= <span class="hljs-number">7</span> <span class="hljs-keyword">else</span> <span class="hljs-built_in">max</span>(<span class="hljs-number">0</span>, <span class="hljs-number">1.0</span> - ((days - <span class="hljs-number">7</span>) / <span class="hljs-number">14</span>) * <span class="hljs-number">0.5</span>)
    
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{days:2d}</span> days | <span class="hljs-subst">{gaussian_decay:<span class="hljs-number">.4</span>f}</span>   | <span class="hljs-subst">{exponential_decay:<span class="hljs-number">.4</span>f}</span>     | <span class="hljs-subst">{linear_decay:<span class="hljs-number">.4</span>f}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Erwartete Ausgabe:</p>
<pre><code translate="no" class="language-python">=== TIME DECAY EFFECT VISUALIZATION ===
Days ago | Gaussian | Exponential | Linear
-----------------------------------------
 <span class="hljs-number">0</span> days | <span class="hljs-number">1.0000</span>   | <span class="hljs-number">1.0000</span>     | <span class="hljs-number">1.0000</span>
 <span class="hljs-number">3</span> days | <span class="hljs-number">1.0000</span>   | <span class="hljs-number">1.0000</span>     | <span class="hljs-number">1.0000</span>
 <span class="hljs-number">7</span> days | <span class="hljs-number">1.0000</span>   | <span class="hljs-number">0.6178</span>     | <span class="hljs-number">1.0000</span>
<span class="hljs-number">10</span> days | <span class="hljs-number">0.8620</span>   | <span class="hljs-number">0.4305</span>     | <span class="hljs-number">0.8929</span>
<span class="hljs-number">14</span> days | <span class="hljs-number">0.7071</span>   | <span class="hljs-number">0.2660</span>     | <span class="hljs-number">0.7500</span>
<span class="hljs-number">21</span> days | <span class="hljs-number">0.5000</span>   | <span class="hljs-number">0.1145</span>     | <span class="hljs-number">0.5000</span>
<span class="hljs-number">30</span> days | <span class="hljs-number">0.3202</span>   | <span class="hljs-number">0.0387</span>     | <span class="hljs-number">0.1786</span>
<span class="hljs-number">60</span> days | <span class="hljs-number">0.0725</span>   | <span class="hljs-number">0.0010</span>     | <span class="hljs-number">0.0000</span>
<span class="hljs-number">90</span> days | <span class="hljs-number">0.0164</span>   | <span class="hljs-number">0.0000</span>     | <span class="hljs-number">0.0000</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-7-Helper-function-for-results-display" class="common-anchor-header">Schritt 7: Hilfsfunktion für die Ergebnisanzeige<button data-href="#Step-7-Helper-function-for-results-display" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python"><span class="hljs-comment"># Helper function to format search results with dates and scores</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">print_search_results</span>(<span class="hljs-params">results, title</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;\n=== <span class="hljs-subst">{title}</span> ===&quot;</span>)
    <span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(results[<span class="hljs-number">0</span>]):
        publish_date = datetime.datetime.fromtimestamp(hit.get(<span class="hljs-string">&#x27;publish_date&#x27;</span>))
        days_from_now = (current_time - hit.get(<span class="hljs-string">&#x27;publish_date&#x27;</span>)) / (<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
        
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. <span class="hljs-subst">{hit.get(<span class="hljs-string">&#x27;headline&#x27;</span>)}</span>&quot;</span>)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;   Published: <span class="hljs-subst">{publish_date.strftime(<span class="hljs-string">&#x27;%Y-%m-%d&#x27;</span>)}</span> (<span class="hljs-subst">{<span class="hljs-built_in">int</span>(days_from_now)}</span> days ago)&quot;</span>)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;   Score: <span class="hljs-subst">{hit.score:<span class="hljs-number">.4</span>f}</span>&quot;</span>)
        <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-8-Compare-standard-vs-decay-based-search" class="common-anchor-header">Schritt 8: Vergleich zwischen Standard- und verfallsbasierter Suche<button data-href="#Step-8-Compare-standard-vs-decay-based-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Führen wir nun eine Suchanfrage durch und vergleichen die Ergebnisse mit und ohne Decay-Ranking:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define our search query</span>
query = <span class="hljs-string">&quot;artificial intelligence advancements&quot;</span>

<span class="hljs-comment"># 1. Search without decay ranking (purely based on semantic relevance)</span>
standard_results = milvus_client.search(
    collection_name,
    data=[query],
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,
    limit=<span class="hljs-number">7</span>,  <span class="hljs-comment"># Get all our articles</span>
    output_fields=[<span class="hljs-string">&quot;headline&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>, <span class="hljs-string">&quot;publish_date&quot;</span>],
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
print_search_results(standard_results, <span class="hljs-string">&quot;SEARCH RESULTS WITHOUT DECAY RANKING&quot;</span>)

<span class="hljs-comment"># Store original scores for later comparison</span>
original_scores = {}
<span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> standard_results[<span class="hljs-number">0</span>]:
    original_scores[hit.get(<span class="hljs-string">&#x27;headline&#x27;</span>)] = hit.score

<span class="hljs-comment"># 2. Search with each decay function</span>
<span class="hljs-comment"># Gaussian decay</span>
gaussian_results = milvus_client.search(
    collection_name,
    data=[query],
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,
    limit=<span class="hljs-number">7</span>,
    output_fields=[<span class="hljs-string">&quot;headline&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>, <span class="hljs-string">&quot;publish_date&quot;</span>],
    ranker=gaussian_ranker,
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
print_search_results(gaussian_results, <span class="hljs-string">&quot;SEARCH RESULTS WITH GAUSSIAN DECAY RANKING&quot;</span>)

<span class="hljs-comment"># Exponential decay</span>
exponential_results = milvus_client.search(
    collection_name,
    data=[query],
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,
    limit=<span class="hljs-number">7</span>,
    output_fields=[<span class="hljs-string">&quot;headline&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>, <span class="hljs-string">&quot;publish_date&quot;</span>],
    ranker=exponential_ranker,
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
print_search_results(exponential_results, <span class="hljs-string">&quot;SEARCH RESULTS WITH EXPONENTIAL DECAY RANKING&quot;</span>)

<span class="hljs-comment"># Linear decay</span>
linear_results = milvus_client.search(
    collection_name,
    data=[query],
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,
    limit=<span class="hljs-number">7</span>,
    output_fields=[<span class="hljs-string">&quot;headline&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>, <span class="hljs-string">&quot;publish_date&quot;</span>],
    ranker=linear_ranker,
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
print_search_results(linear_results, <span class="hljs-string">&quot;SEARCH RESULTS WITH LINEAR DECAY RANKING&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Erwartete Ausgabe:</p>
<pre><code translate="no" class="language-python">=== SEARCH RESULTS WITHOUT DECAY RANKING ===
<span class="hljs-number">1.</span> AI Development Updates Released Yesterday
   Published: <span class="hljs-number">2025</span>-05-<span class="hljs-number">14</span> (<span class="hljs-number">1</span> days ago)
   Score: <span class="hljs-number">0.3670</span>

<span class="hljs-number">2.</span> AI Research Advancements Published <span class="hljs-keyword">in</span> January
   Published: <span class="hljs-number">2025</span>-02-<span class="hljs-number">14</span> (<span class="hljs-number">90</span> days ago)
   Score: <span class="hljs-number">0.4315</span>

<span class="hljs-number">3.</span> New AI Research Results Released This Week
   Published: <span class="hljs-number">2025</span>-05-<span class="hljs-number">10</span> (<span class="hljs-number">5</span> days ago)
   Score: <span class="hljs-number">0.4316</span>

<span class="hljs-number">4.</span> Tech Giants Compete <span class="hljs-keyword">in</span> New AI Race
   Published: <span class="hljs-number">2025</span>-03-<span class="hljs-number">16</span> (<span class="hljs-number">60</span> days ago)
   Score: <span class="hljs-number">0.6671</span>

<span class="hljs-number">5.</span> Latest Deep Learning Models Show Remarkable Progress
   Published: <span class="hljs-number">2025</span>-04-<span class="hljs-number">30</span> (<span class="hljs-number">15</span> days ago)
   Score: <span class="hljs-number">0.6674</span>

<span class="hljs-number">6.</span> AI Breakthrough Enables Medical Diagnosis Advancement
   Published: <span class="hljs-number">2025</span>-01-<span class="hljs-number">15</span> (<span class="hljs-number">120</span> days ago)
   Score: <span class="hljs-number">0.7279</span>

<span class="hljs-number">7.</span> AI Ethics Guidelines Released by International Body
   Published: <span class="hljs-number">2025</span>-04-<span class="hljs-number">15</span> (<span class="hljs-number">30</span> days ago)
   Score: <span class="hljs-number">0.7661</span>

=== SEARCH RESULTS WITH GAUSSIAN DECAY RANKING ===
<span class="hljs-number">1.</span> Latest Deep Learning Models Show Remarkable Progress
   Published: <span class="hljs-number">2025</span>-04-<span class="hljs-number">30</span> (<span class="hljs-number">15</span> days ago)
   Score: <span class="hljs-number">0.5322</span>

<span class="hljs-number">2.</span> New AI Research Results Released This Week
   Published: <span class="hljs-number">2025</span>-05-<span class="hljs-number">10</span> (<span class="hljs-number">5</span> days ago)
   Score: <span class="hljs-number">0.4316</span>

<span class="hljs-number">3.</span> AI Development Updates Released Yesterday
   Published: <span class="hljs-number">2025</span>-05-<span class="hljs-number">14</span> (<span class="hljs-number">1</span> days ago)
   Score: <span class="hljs-number">0.3670</span>

<span class="hljs-number">4.</span> AI Ethics Guidelines Released by International Body
   Published: <span class="hljs-number">2025</span>-04-<span class="hljs-number">15</span> (<span class="hljs-number">30</span> days ago)
   Score: <span class="hljs-number">0.1180</span>

<span class="hljs-number">5.</span> Tech Giants Compete <span class="hljs-keyword">in</span> New AI Race
   Published: <span class="hljs-number">2025</span>-03-<span class="hljs-number">16</span> (<span class="hljs-number">60</span> days ago)
   Score: <span class="hljs-number">0.0000</span>

<span class="hljs-number">6.</span> AI Research Advancements Published <span class="hljs-keyword">in</span> January
   Published: <span class="hljs-number">2025</span>-02-<span class="hljs-number">14</span> (<span class="hljs-number">90</span> days ago)
   Score: <span class="hljs-number">0.0000</span>

<span class="hljs-number">7.</span> AI Breakthrough Enables Medical Diagnosis Advancement
   Published: <span class="hljs-number">2025</span>-01-<span class="hljs-number">15</span> (<span class="hljs-number">120</span> days ago)
   Score: <span class="hljs-number">0.0000</span>

=== SEARCH RESULTS WITH EXPONENTIAL DECAY RANKING ===
<span class="hljs-number">1.</span> AI Development Updates Released Yesterday
   Published: <span class="hljs-number">2025</span>-05-<span class="hljs-number">14</span> (<span class="hljs-number">1</span> days ago)
   Score: <span class="hljs-number">0.3670</span>

<span class="hljs-number">2.</span> New AI Research Results Released This Week
   Published: <span class="hljs-number">2025</span>-05-<span class="hljs-number">10</span> (<span class="hljs-number">5</span> days ago)
   Score: <span class="hljs-number">0.3392</span>

<span class="hljs-number">3.</span> Latest Deep Learning Models Show Remarkable Progress
   Published: <span class="hljs-number">2025</span>-04-<span class="hljs-number">30</span> (<span class="hljs-number">15</span> days ago)
   Score: <span class="hljs-number">0.1574</span>

<span class="hljs-number">4.</span> AI Ethics Guidelines Released by International Body
   Published: <span class="hljs-number">2025</span>-04-<span class="hljs-number">15</span> (<span class="hljs-number">30</span> days ago)
   Score: <span class="hljs-number">0.0297</span>

<span class="hljs-number">5.</span> Tech Giants Compete <span class="hljs-keyword">in</span> New AI Race
   Published: <span class="hljs-number">2025</span>-03-<span class="hljs-number">16</span> (<span class="hljs-number">60</span> days ago)
   Score: <span class="hljs-number">0.0007</span>

<span class="hljs-number">6.</span> AI Research Advancements Published <span class="hljs-keyword">in</span> January
   Published: <span class="hljs-number">2025</span>-02-<span class="hljs-number">14</span> (<span class="hljs-number">90</span> days ago)
   Score: <span class="hljs-number">0.0000</span>

<span class="hljs-number">7.</span> AI Breakthrough Enables Medical Diagnosis Advancement
   Published: <span class="hljs-number">2025</span>-01-<span class="hljs-number">15</span> (<span class="hljs-number">120</span> days ago)
   Score: <span class="hljs-number">0.0000</span>

=== SEARCH RESULTS WITH LINEAR DECAY RANKING ===
<span class="hljs-number">1.</span> Latest Deep Learning Models Show Remarkable Progress
   Published: <span class="hljs-number">2025</span>-04-<span class="hljs-number">30</span> (<span class="hljs-number">15</span> days ago)
   Score: <span class="hljs-number">0.4767</span>

<span class="hljs-number">2.</span> New AI Research Results Released This Week
   Published: <span class="hljs-number">2025</span>-05-<span class="hljs-number">10</span> (<span class="hljs-number">5</span> days ago)
   Score: <span class="hljs-number">0.4316</span>

<span class="hljs-number">3.</span> AI Ethics Guidelines Released by International Body
   Published: <span class="hljs-number">2025</span>-04-<span class="hljs-number">15</span> (<span class="hljs-number">30</span> days ago)
   Score: <span class="hljs-number">0.3831</span>

<span class="hljs-number">4.</span> AI Development Updates Released Yesterday
   Published: <span class="hljs-number">2025</span>-05-<span class="hljs-number">14</span> (<span class="hljs-number">1</span> days ago)
   Score: <span class="hljs-number">0.3670</span>

<span class="hljs-number">5.</span> AI Breakthrough Enables Medical Diagnosis Advancement
   Published: <span class="hljs-number">2025</span>-01-<span class="hljs-number">15</span> (<span class="hljs-number">120</span> days ago)
   Score: <span class="hljs-number">0.3640</span>

<span class="hljs-number">6.</span> Tech Giants Compete <span class="hljs-keyword">in</span> New AI Race
   Published: <span class="hljs-number">2025</span>-03-<span class="hljs-number">16</span> (<span class="hljs-number">60</span> days ago)
   Score: <span class="hljs-number">0.3335</span>

<span class="hljs-number">7.</span> AI Research Advancements Published <span class="hljs-keyword">in</span> January
   Published: <span class="hljs-number">2025</span>-02-<span class="hljs-number">14</span> (<span class="hljs-number">90</span> days ago)
   Score: <span class="hljs-number">0.2158</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-9-Understand-score-calculation" class="common-anchor-header">Schritt 9: Verstehen Sie die Berechnung der Punktzahl<button data-href="#Step-9-Understand-score-calculation" class="anchor-icon" translate="no">
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
    </button></h2><p>Lassen Sie uns aufschlüsseln, wie die endgültige Punktzahl durch die Kombination von ursprünglicher Relevanz und Decay-Faktoren berechnet wird:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add a detailed breakdown for the first 3 results from Gaussian decay</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n=== SCORE CALCULATION BREAKDOWN (GAUSSIAN DECAY) ===&quot;</span>)
<span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> gaussian_results[<span class="hljs-number">0</span>][:<span class="hljs-number">3</span>]:
    headline = item.get(<span class="hljs-string">&#x27;headline&#x27;</span>)
    publish_date = datetime.datetime.fromtimestamp(item.get(<span class="hljs-string">&#x27;publish_date&#x27;</span>))
    days_ago = (current_time - item.get(<span class="hljs-string">&#x27;publish_date&#x27;</span>)) / (<span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>)
    
    <span class="hljs-comment"># Get the original score</span>
    original_score = original_scores.get(headline, <span class="hljs-number">0</span>)
    
    <span class="hljs-comment"># Calculate decay factor</span>
    decay_factor = <span class="hljs-number">1.0</span> <span class="hljs-keyword">if</span> days_ago &lt;= <span class="hljs-number">7</span> <span class="hljs-keyword">else</span> (<span class="hljs-number">0.5</span> ** ((days_ago - <span class="hljs-number">7</span>) / <span class="hljs-number">14</span>))
    
    <span class="hljs-comment"># Show breakdown</span>
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Item: <span class="hljs-subst">{headline}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Published: <span class="hljs-subst">{publish_date.strftime(<span class="hljs-string">&#x27;%Y-%m-%d&#x27;</span>)}</span> (<span class="hljs-subst">{<span class="hljs-built_in">int</span>(days_ago)}</span> days ago)&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Original relevance score: <span class="hljs-subst">{original_score:<span class="hljs-number">.4</span>f}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Decay factor (Gaussian): <span class="hljs-subst">{decay_factor:<span class="hljs-number">.4</span>f}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Expected final score = Original × Decay: <span class="hljs-subst">{original_score * decay_factor:<span class="hljs-number">.4</span>f}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Actual final score: <span class="hljs-subst">{item.score:<span class="hljs-number">.4</span>f}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p>Erwartetes Ergebnis:</p>
<pre><code translate="no" class="language-python">=== SCORE CALCULATION BREAKDOWN (GAUSSIAN DECAY) ===
Item: Latest Deep Learning Models Show Remarkable Progress
  Published: <span class="hljs-number">2025</span>-04-<span class="hljs-number">30</span> (<span class="hljs-number">15</span> days ago)
  Original relevance score: <span class="hljs-number">0.6674</span>
  Decay factor (Gaussian): <span class="hljs-number">0.6730</span>
  Expected final score = Original × Decay: <span class="hljs-number">0.4491</span>
  Actual final score: <span class="hljs-number">0.5322</span>

Item: New AI Research Results Released This Week
  Published: <span class="hljs-number">2025</span>-05-<span class="hljs-number">10</span> (<span class="hljs-number">5</span> days ago)
  Original relevance score: <span class="hljs-number">0.4316</span>
  Decay factor (Gaussian): <span class="hljs-number">1.0000</span>
  Expected final score = Original × Decay: <span class="hljs-number">0.4316</span>
  Actual final score: <span class="hljs-number">0.4316</span>

Item: AI Development Updates Released Yesterday
  Published: <span class="hljs-number">2025</span>-05-<span class="hljs-number">14</span> (<span class="hljs-number">1</span> days ago)
  Original relevance score: <span class="hljs-number">0.3670</span>
  Decay factor (Gaussian): <span class="hljs-number">1.0000</span>
  Expected final score = Original × Decay: <span class="hljs-number">0.3670</span>
  Actual final score: <span class="hljs-number">0.3670</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-10-Hybrid-search-with-time-decay" class="common-anchor-header">Schritt 10: Hybride Suche mit Zeitverfall<button data-href="#Step-10-Hybrid-search-with-time-decay" class="anchor-icon" translate="no">
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
    </button></h2><p>Für komplexere Szenarien können wir dichte (semantische) und spärliche (Schlüsselwort-) Vektoren mithilfe der hybriden Suche kombinieren:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Set up hybrid search (combining dense and sparse vectors)</span>
dense_search = AnnSearchRequest(
    data=[query],
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,  <span class="hljs-comment"># Search dense vectors</span>
    param={},
    limit=<span class="hljs-number">7</span>
)

sparse_search = AnnSearchRequest(
    data=[query],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,  <span class="hljs-comment"># Search sparse vectors (BM25)</span>
    param={},
    limit=<span class="hljs-number">7</span>
)

<span class="hljs-comment"># Execute hybrid search with each decay function</span>
<span class="hljs-comment"># Gaussian decay</span>
hybrid_gaussian_results = milvus_client.hybrid_search(
    collection_name,
    [dense_search, sparse_search],
    ranker=gaussian_ranker,
    limit=<span class="hljs-number">7</span>,
    output_fields=[<span class="hljs-string">&quot;headline&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>, <span class="hljs-string">&quot;publish_date&quot;</span>]
)
print_search_results(hybrid_gaussian_results, <span class="hljs-string">&quot;HYBRID SEARCH RESULTS WITH GAUSSIAN DECAY RANKING&quot;</span>)

<span class="hljs-comment"># Exponential decay</span>
hybrid_exponential_results = milvus_client.hybrid_search(
    collection_name,
    [dense_search, sparse_search],
    ranker=exponential_ranker,
    limit=<span class="hljs-number">7</span>,
    output_fields=[<span class="hljs-string">&quot;headline&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>, <span class="hljs-string">&quot;publish_date&quot;</span>]
)
print_search_results(hybrid_exponential_results, <span class="hljs-string">&quot;HYBRID SEARCH RESULTS WITH EXPONENTIAL DECAY RANKING&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Erwartetes Ergebnis:</p>
<pre><code translate="no" class="language-python">=== HYBRID SEARCH RESULTS WITH GAUSSIAN DECAY RANKING ===
<span class="hljs-number">1.</span> New AI Research Results Released This Week
   Published: <span class="hljs-number">2025</span>-05-<span class="hljs-number">10</span> (<span class="hljs-number">5</span> days ago)
   Score: <span class="hljs-number">2.1467</span>

<span class="hljs-number">2.</span> AI Development Updates Released Yesterday
   Published: <span class="hljs-number">2025</span>-05-<span class="hljs-number">14</span> (<span class="hljs-number">1</span> days ago)
   Score: <span class="hljs-number">0.7926</span>

<span class="hljs-number">3.</span> Latest Deep Learning Models Show Remarkable Progress
   Published: <span class="hljs-number">2025</span>-04-<span class="hljs-number">30</span> (<span class="hljs-number">15</span> days ago)
   Score: <span class="hljs-number">0.5322</span>

<span class="hljs-number">4.</span> AI Ethics Guidelines Released by International Body
   Published: <span class="hljs-number">2025</span>-04-<span class="hljs-number">15</span> (<span class="hljs-number">30</span> days ago)
   Score: <span class="hljs-number">0.1180</span>

<span class="hljs-number">5.</span> Tech Giants Compete <span class="hljs-keyword">in</span> New AI Race
   Published: <span class="hljs-number">2025</span>-03-<span class="hljs-number">16</span> (<span class="hljs-number">60</span> days ago)
   Score: <span class="hljs-number">0.0000</span>

<span class="hljs-number">6.</span> AI Research Advancements Published <span class="hljs-keyword">in</span> January
   Published: <span class="hljs-number">2025</span>-02-<span class="hljs-number">14</span> (<span class="hljs-number">90</span> days ago)
   Score: <span class="hljs-number">0.0000</span>

<span class="hljs-number">7.</span> AI Breakthrough Enables Medical Diagnosis Advancement
   Published: <span class="hljs-number">2025</span>-01-<span class="hljs-number">15</span> (<span class="hljs-number">120</span> days ago)
   Score: <span class="hljs-number">0.0000</span>

=== HYBRID SEARCH RESULTS WITH EXPONENTIAL DECAY RANKING ===
<span class="hljs-number">1.</span> New AI Research Results Released This Week
   Published: <span class="hljs-number">2025</span>-05-<span class="hljs-number">10</span> (<span class="hljs-number">5</span> days ago)
   Score: <span class="hljs-number">1.6873</span>

<span class="hljs-number">2.</span> AI Development Updates Released Yesterday
   Published: <span class="hljs-number">2025</span>-05-<span class="hljs-number">14</span> (<span class="hljs-number">1</span> days ago)
   Score: <span class="hljs-number">0.7926</span>

<span class="hljs-number">3.</span> Latest Deep Learning Models Show Remarkable Progress
   Published: <span class="hljs-number">2025</span>-04-<span class="hljs-number">30</span> (<span class="hljs-number">15</span> days ago)
   Score: <span class="hljs-number">0.1574</span>

<span class="hljs-number">4.</span> AI Ethics Guidelines Released by International Body
   Published: <span class="hljs-number">2025</span>-04-<span class="hljs-number">15</span> (<span class="hljs-number">30</span> days ago)
   Score: <span class="hljs-number">0.0297</span>

<span class="hljs-number">5.</span> Tech Giants Compete <span class="hljs-keyword">in</span> New AI Race
   Published: <span class="hljs-number">2025</span>-03-<span class="hljs-number">16</span> (<span class="hljs-number">60</span> days ago)
   Score: <span class="hljs-number">0.0007</span>

<span class="hljs-number">6.</span> AI Research Advancements Published <span class="hljs-keyword">in</span> January
   Published: <span class="hljs-number">2025</span>-02-<span class="hljs-number">14</span> (<span class="hljs-number">90</span> days ago)
   Score: <span class="hljs-number">0.0001</span>

<span class="hljs-number">7.</span> AI Breakthrough Enables Medical Diagnosis Advancement
   Published: <span class="hljs-number">2025</span>-01-<span class="hljs-number">15</span> (<span class="hljs-number">120</span> days ago)
   Score: <span class="hljs-number">0.0000</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-11-Experiment-with-different-parameter-values" class="common-anchor-header">Schritt 11: Experimentieren mit verschiedenen Parameterwerten<button data-href="#Step-11-Experiment-with-different-parameter-values" class="anchor-icon" translate="no">
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
    </button></h2><p>Schauen wir uns an, wie sich die Anpassung des Skalierungsparameters auf die Gaußsche Abklingfunktion auswirkt:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create variations of the Gaussian decay function with different scale parameters</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n=== PARAMETER VARIATION EXPERIMENT: SCALE ===&quot;</span>)
<span class="hljs-keyword">for</span> scale_days <span class="hljs-keyword">in</span> [<span class="hljs-number">7</span>, <span class="hljs-number">14</span>, <span class="hljs-number">30</span>]:
    scaled_ranker = Function(
        name=<span class="hljs-string">f&quot;time_decay_gaussian_<span class="hljs-subst">{scale_days}</span>&quot;</span>,
        input_field_names=[<span class="hljs-string">&quot;publish_date&quot;</span>],
        function_type=FunctionType.RERANK,
        params={
            <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;decay&quot;</span>,
            <span class="hljs-string">&quot;function&quot;</span>: <span class="hljs-string">&quot;gauss&quot;</span>,
            <span class="hljs-string">&quot;origin&quot;</span>: current_time,
            <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">7</span> * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>,  <span class="hljs-comment"># Fixed offset of 7 days</span>
            <span class="hljs-string">&quot;decay&quot;</span>: <span class="hljs-number">0.5</span>,                <span class="hljs-comment"># Fixed decay of 0.5</span>
            <span class="hljs-string">&quot;scale&quot;</span>: scale_days * <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>  <span class="hljs-comment"># Variable scale</span>
        }
    )
    
    <span class="hljs-comment"># Get results</span>
    scale_results = milvus_client.search(
        collection_name,
        data=[query],
        anns_field=<span class="hljs-string">&quot;dense&quot;</span>,
        limit=<span class="hljs-number">7</span>,
        output_fields=[<span class="hljs-string">&quot;headline&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>, <span class="hljs-string">&quot;publish_date&quot;</span>],
        ranker=scaled_ranker,
        consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
    )
    
    print_search_results(scale_results, <span class="hljs-string">f&quot;SEARCH WITH GAUSSIAN DECAY (SCALE = <span class="hljs-subst">{scale_days}</span> DAYS)&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Erwartete Ausgabe:</p>
<pre><code translate="no" class="language-python">=== PARAMETER VARIATION EXPERIMENT: SCALE ===

=== SEARCH WITH GAUSSIAN DECAY (SCALE = <span class="hljs-number">7</span> DAYS) ===
<span class="hljs-number">1.</span> New AI Research Results Released This Week
   Published: <span class="hljs-number">2025</span>-05-<span class="hljs-number">10</span> (<span class="hljs-number">5</span> days ago)
   Score: <span class="hljs-number">0.4316</span>

<span class="hljs-number">2.</span> AI Development Updates Released Yesterday
   Published: <span class="hljs-number">2025</span>-05-<span class="hljs-number">14</span> (<span class="hljs-number">1</span> days ago)
   Score: <span class="hljs-number">0.3670</span>

<span class="hljs-number">3.</span> Latest Deep Learning Models Show Remarkable Progress
   Published: <span class="hljs-number">2025</span>-04-<span class="hljs-number">30</span> (<span class="hljs-number">15</span> days ago)
   Score: <span class="hljs-number">0.2699</span>

<span class="hljs-number">4.</span> AI Ethics Guidelines Released by International Body
   Published: <span class="hljs-number">2025</span>-04-<span class="hljs-number">15</span> (<span class="hljs-number">30</span> days ago)
   Score: <span class="hljs-number">0.0004</span>

<span class="hljs-number">5.</span> Tech Giants Compete <span class="hljs-keyword">in</span> New AI Race
   Published: <span class="hljs-number">2025</span>-03-<span class="hljs-number">16</span> (<span class="hljs-number">60</span> days ago)
   Score: <span class="hljs-number">0.0000</span>

<span class="hljs-number">6.</span> AI Research Advancements Published <span class="hljs-keyword">in</span> January
   Published: <span class="hljs-number">2025</span>-02-<span class="hljs-number">14</span> (<span class="hljs-number">90</span> days ago)
   Score: <span class="hljs-number">0.0000</span>

<span class="hljs-number">7.</span> AI Breakthrough Enables Medical Diagnosis Advancement
   Published: <span class="hljs-number">2025</span>-01-<span class="hljs-number">15</span> (<span class="hljs-number">120</span> days ago)
   Score: <span class="hljs-number">0.0000</span>

=== SEARCH WITH GAUSSIAN DECAY (SCALE = <span class="hljs-number">14</span> DAYS) ===
<span class="hljs-number">1.</span> Latest Deep Learning Models Show Remarkable Progress
   Published: <span class="hljs-number">2025</span>-04-<span class="hljs-number">30</span> (<span class="hljs-number">15</span> days ago)
   Score: <span class="hljs-number">0.5322</span>

<span class="hljs-number">2.</span> New AI Research Results Released This Week
   Published: <span class="hljs-number">2025</span>-05-<span class="hljs-number">10</span> (<span class="hljs-number">5</span> days ago)
   Score: <span class="hljs-number">0.4316</span>

<span class="hljs-number">3.</span> AI Development Updates Released Yesterday
   Published: <span class="hljs-number">2025</span>-05-<span class="hljs-number">14</span> (<span class="hljs-number">1</span> days ago)
   Score: <span class="hljs-number">0.3670</span>

<span class="hljs-number">4.</span> AI Ethics Guidelines Released by International Body
   Published: <span class="hljs-number">2025</span>-04-<span class="hljs-number">15</span> (<span class="hljs-number">30</span> days ago)
   Score: <span class="hljs-number">0.1180</span>

<span class="hljs-number">5.</span> Tech Giants Compete <span class="hljs-keyword">in</span> New AI Race
   Published: <span class="hljs-number">2025</span>-03-<span class="hljs-number">16</span> (<span class="hljs-number">60</span> days ago)
   Score: <span class="hljs-number">0.0000</span>

<span class="hljs-number">6.</span> AI Research Advancements Published <span class="hljs-keyword">in</span> January
   Published: <span class="hljs-number">2025</span>-02-<span class="hljs-number">14</span> (<span class="hljs-number">90</span> days ago)
   Score: <span class="hljs-number">0.0000</span>

<span class="hljs-number">7.</span> AI Breakthrough Enables Medical Diagnosis Advancement
   Published: <span class="hljs-number">2025</span>-01-<span class="hljs-number">15</span> (<span class="hljs-number">120</span> days ago)
   Score: <span class="hljs-number">0.0000</span>

=== SEARCH WITH GAUSSIAN DECAY (SCALE = <span class="hljs-number">30</span> DAYS) ===
<span class="hljs-number">1.</span> Latest Deep Learning Models Show Remarkable Progress
   Published: <span class="hljs-number">2025</span>-04-<span class="hljs-number">30</span> (<span class="hljs-number">15</span> days ago)
   Score: <span class="hljs-number">0.6353</span>

<span class="hljs-number">2.</span> AI Ethics Guidelines Released by International Body
   Published: <span class="hljs-number">2025</span>-04-<span class="hljs-number">15</span> (<span class="hljs-number">30</span> days ago)
   Score: <span class="hljs-number">0.5097</span>

<span class="hljs-number">3.</span> New AI Research Results Released This Week
   Published: <span class="hljs-number">2025</span>-05-<span class="hljs-number">10</span> (<span class="hljs-number">5</span> days ago)
   Score: <span class="hljs-number">0.4316</span>

<span class="hljs-number">4.</span> AI Development Updates Released Yesterday
   Published: <span class="hljs-number">2025</span>-05-<span class="hljs-number">14</span> (<span class="hljs-number">1</span> days ago)
   Score: <span class="hljs-number">0.3670</span>

<span class="hljs-number">5.</span> Tech Giants Compete <span class="hljs-keyword">in</span> New AI Race
   Published: <span class="hljs-number">2025</span>-03-<span class="hljs-number">16</span> (<span class="hljs-number">60</span> days ago)
   Score: <span class="hljs-number">0.0767</span>

<span class="hljs-number">6.</span> AI Research Advancements Published <span class="hljs-keyword">in</span> January
   Published: <span class="hljs-number">2025</span>-02-<span class="hljs-number">14</span> (<span class="hljs-number">90</span> days ago)
   Score: <span class="hljs-number">0.0021</span>

<span class="hljs-number">7.</span> AI Breakthrough Enables Medical Diagnosis Advancement
   Published: <span class="hljs-number">2025</span>-01-<span class="hljs-number">15</span> (<span class="hljs-number">120</span> days ago)
   Score: <span class="hljs-number">0.0000</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-12-Testing-with-different-queries" class="common-anchor-header">Schritt 12: Testen mit verschiedenen Suchanfragen<button data-href="#Step-12-Testing-with-different-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>Sehen wir uns an, wie sich das Decay-Ranking bei verschiedenen Suchanfragen verhält:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Try different queries with Gaussian decay</span>
<span class="hljs-keyword">for</span> test_query <span class="hljs-keyword">in</span> [<span class="hljs-string">&quot;machine learning&quot;</span>, <span class="hljs-string">&quot;neural networks&quot;</span>, <span class="hljs-string">&quot;ethics in AI&quot;</span>]:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;\n=== TESTING QUERY: &#x27;<span class="hljs-subst">{test_query}</span>&#x27; WITH GAUSSIAN DECAY ===&quot;</span>)
    test_results = milvus_client.search(
        collection_name,
        data=[test_query],
        anns_field=<span class="hljs-string">&quot;dense&quot;</span>,
        limit=<span class="hljs-number">4</span>,
        output_fields=[<span class="hljs-string">&quot;headline&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>, <span class="hljs-string">&quot;publish_date&quot;</span>],
        ranker=gaussian_ranker,
        consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
    )
    print_search_results(test_results, <span class="hljs-string">f&quot;TOP 4 RESULTS FOR &#x27;<span class="hljs-subst">{test_query}</span>&#x27;&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Erwartete Ausgabe:</p>
<pre><code translate="no" class="language-python">=== TESTING QUERY: <span class="hljs-string">&#x27;machine learning&#x27;</span> WITH GAUSSIAN DECAY ===

=== TOP <span class="hljs-number">4</span> RESULTS FOR <span class="hljs-string">&#x27;machine learning&#x27;</span> ===
<span class="hljs-number">1.</span> New AI Research Results Released This Week
   Published: <span class="hljs-number">2025</span>-05-<span class="hljs-number">10</span> (<span class="hljs-number">5</span> days ago)
   Score: <span class="hljs-number">0.8208</span>

<span class="hljs-number">2.</span> AI Development Updates Released Yesterday
   Published: <span class="hljs-number">2025</span>-05-<span class="hljs-number">14</span> (<span class="hljs-number">1</span> days ago)
   Score: <span class="hljs-number">0.7287</span>

<span class="hljs-number">3.</span> Latest Deep Learning Models Show Remarkable Progress
   Published: <span class="hljs-number">2025</span>-04-<span class="hljs-number">30</span> (<span class="hljs-number">15</span> days ago)
   Score: <span class="hljs-number">0.6633</span>

<span class="hljs-number">4.</span> AI Research Advancements Published <span class="hljs-keyword">in</span> January
   Published: <span class="hljs-number">2025</span>-02-<span class="hljs-number">14</span> (<span class="hljs-number">90</span> days ago)
   Score: <span class="hljs-number">0.0000</span>

=== TESTING QUERY: <span class="hljs-string">&#x27;neural networks&#x27;</span> WITH GAUSSIAN DECAY ===

=== TOP <span class="hljs-number">4</span> RESULTS FOR <span class="hljs-string">&#x27;neural networks&#x27;</span> ===
<span class="hljs-number">1.</span> New AI Research Results Released This Week
   Published: <span class="hljs-number">2025</span>-05-<span class="hljs-number">10</span> (<span class="hljs-number">5</span> days ago)
   Score: <span class="hljs-number">0.8509</span>

<span class="hljs-number">2.</span> AI Development Updates Released Yesterday
   Published: <span class="hljs-number">2025</span>-05-<span class="hljs-number">14</span> (<span class="hljs-number">1</span> days ago)
   Score: <span class="hljs-number">0.7574</span>

<span class="hljs-number">3.</span> Latest Deep Learning Models Show Remarkable Progress
   Published: <span class="hljs-number">2025</span>-04-<span class="hljs-number">30</span> (<span class="hljs-number">15</span> days ago)
   Score: <span class="hljs-number">0.6364</span>

<span class="hljs-number">4.</span> AI Research Advancements Published <span class="hljs-keyword">in</span> January
   Published: <span class="hljs-number">2025</span>-02-<span class="hljs-number">14</span> (<span class="hljs-number">90</span> days ago)
   Score: <span class="hljs-number">0.0000</span>

=== TESTING QUERY: <span class="hljs-string">&#x27;ethics in AI&#x27;</span> WITH GAUSSIAN DECAY ===

=== TOP <span class="hljs-number">4</span> RESULTS FOR <span class="hljs-string">&#x27;ethics in AI&#x27;</span> ===
<span class="hljs-number">1.</span> New AI Research Results Released This Week
   Published: <span class="hljs-number">2025</span>-05-<span class="hljs-number">10</span> (<span class="hljs-number">5</span> days ago)
   Score: <span class="hljs-number">0.7977</span>

<span class="hljs-number">2.</span> AI Development Updates Released Yesterday
   Published: <span class="hljs-number">2025</span>-05-<span class="hljs-number">14</span> (<span class="hljs-number">1</span> days ago)
   Score: <span class="hljs-number">0.7322</span>

<span class="hljs-number">3.</span> AI Ethics Guidelines Released by International Body
   Published: <span class="hljs-number">2025</span>-04-<span class="hljs-number">15</span> (<span class="hljs-number">30</span> days ago)
   Score: <span class="hljs-number">0.0814</span>

<span class="hljs-number">4.</span> AI Research Advancements Published <span class="hljs-keyword">in</span> January
   Published: <span class="hljs-number">2025</span>-02-<span class="hljs-number">14</span> (<span class="hljs-number">90</span> days ago)
   Score: <span class="hljs-number">0.0000</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Conclusion" class="common-anchor-header">Schlussfolgerung<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Zeitbasiertes Ranking unter Verwendung von Decay-Funktionen in Milvus bietet eine leistungsstarke Möglichkeit, semantische Relevanz mit Aktualität auszugleichen. Durch die Konfiguration der entsprechenden Abklingfunktion und Parameter können Sie Sucherlebnisse schaffen, die frische Inhalte hervorheben und gleichzeitig die semantische Relevanz berücksichtigen.</p>
<p>Dieser Ansatz ist besonders wertvoll für:</p>
<ul>
<li><p>Nachrichten und Medienplattformen</p></li>
<li><p>Produktlisten im elektronischen Handel</p></li>
<li><p>Feeds für Inhalte sozialer Medien</p></li>
<li><p>Wissensdatenbanken und Dokumentationssysteme</p></li>
<li><p>Repositorien für Forschungsarbeiten</p></li>
</ul>
<p>Wenn Sie die Mathematik hinter den Abklingfunktionen verstehen und mit verschiedenen Parametern experimentieren, können Sie Ihr Suchsystem so abstimmen, dass es ein optimales Gleichgewicht zwischen Relevanz und Aktualität für Ihren spezifischen Anwendungsfall bietet.</p>
