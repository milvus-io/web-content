---
id: integrate_with_llamaindex.md
summary: >-
  Dieser Leitfaden zeigt, wie man ein Retrieval-Augmented Generation (RAG)
  System mit LlamaIndex und Milvus aufbaut.
title: Retrieval-erweiterte Generierung (RAG) mit Milvus und LlamaIndex
---
<h1 id="Retrieval-Augmented-Generation-RAG-with-Milvus-and-LlamaIndex" class="common-anchor-header">Retrieval-erweiterte Generierung (RAG) mit Milvus und LlamaIndex<button data-href="#Retrieval-Augmented-Generation-RAG-with-Milvus-and-LlamaIndex" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_llamaindex.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_llamaindex.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p>Diese Anleitung zeigt, wie man ein Retrieval-Augmented Generation (RAG) System mit LlamaIndex und Milvus aufbaut.</p>
<p>Das RAG-System kombiniert ein Retrieval-System mit einem generativen Modell, um neuen Text auf der Grundlage einer vorgegebenen Aufforderung zu generieren. Das System sucht zunächst mit Milvus relevante Dokumente aus einem Korpus und verwendet dann ein generatives Modell, um neuen Text auf der Grundlage der gefundenen Dokumente zu generieren.</p>
<p><a href="https://www.llamaindex.ai/">LlamaIndex</a> ist ein einfaches, flexibles Daten-Framework für die Verbindung benutzerdefinierter Datenquellen mit großen Sprachmodellen (LLMs). <a href="https://milvus.io/">Milvus</a> ist die weltweit fortschrittlichste Open-Source-Vektordatenbank, die für die Einbettung von Ähnlichkeitssuche und KI-Anwendungen entwickelt wurde.</p>
<p>In diesem Notizbuch zeigen wir eine kurze Demo zur Verwendung des MilvusVectorStore.</p>
<h2 id="Before-you-begin" class="common-anchor-header">Bevor Sie beginnen<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Install-dependencies" class="common-anchor-header">Abhängigkeiten installieren</h3><p>Die Codeschnipsel auf dieser Seite benötigen die Abhängigkeiten pymilvus und llamaindex. Sie können diese mit den folgenden Befehlen installieren:</p>
<pre><code translate="no" class="language-python">$ pip install pymilvus&gt;=<span class="hljs-number">2.4</span><span class="hljs-number">.2</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">$ pip install llama-index-vector-stores-milvus
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">$ pip install llama-index
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Wenn Sie Google Colab verwenden, müssen Sie möglicherweise <strong>die Runtime neu starten</strong>, um die gerade installierten Abhängigkeiten zu aktivieren. (Klicken Sie auf das Menü "Runtime" am oberen Rand des Bildschirms und wählen Sie "Restart session" aus dem Dropdown-Menü).</p>
</div>
<h3 id="Setup-OpenAI" class="common-anchor-header">OpenAI einrichten</h3><p>Beginnen wir mit dem Hinzufügen des openai api Schlüssels. Dies wird uns den Zugang zu chatgpt ermöglichen.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> openai

openai.api_key = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-data" class="common-anchor-header">Daten vorbereiten</h3><p>Sie können Beispieldaten mit den folgenden Befehlen herunterladen:</p>
<pre><code translate="no" class="language-python">! mkdir -p <span class="hljs-string">&#x27;data/&#x27;</span>
! wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt&#x27;</span> -O <span class="hljs-string">&#x27;data/paul_graham_essay.txt&#x27;</span>
! wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/10k/uber_2021.pdf&#x27;</span> -O <span class="hljs-string">&#x27;data/uber_2021.pdf&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Getting-Started" class="common-anchor-header">Erste Schritte<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Generate-our-data" class="common-anchor-header">Erzeugen Sie unsere Daten</h3><p>Als erstes Beispiel wollen wir ein Dokument aus der Datei <code translate="no">paul_graham_essay.txt</code> generieren. Es handelt sich um einen einzelnen Aufsatz von Paul Graham mit dem Titel <code translate="no">What I Worked On</code>. Um die Dokumente zu generieren, werden wir den SimpleDirectoryReader verwenden.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> SimpleDirectoryReader

<span class="hljs-comment"># load documents</span>
documents = SimpleDirectoryReader(
    input_files=[<span class="hljs-string">&quot;./data/paul_graham_essay.txt&quot;</span>]
).load_data()

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Document ID:&quot;</span>, documents[<span class="hljs-number">0</span>].doc_id)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Document ID: 95f25e4d-f270-4650-87ce-006d69d82033
</code></pre>
<h3 id="Create-an-index-across-the-data" class="common-anchor-header">Erstellen Sie einen Index über die Daten</h3><p>Nun, da wir ein Dokument haben, können wir einen Index erstellen und das Dokument einfügen. Für den Index werden wir einen MilvusVectorStore verwenden. MilvusVectorStore nimmt ein paar Argumente entgegen:</p>
<h4 id="basic-args" class="common-anchor-header">Grundargumente</h4><ul>
<li><code translate="no">uri (str, optional)</code>: Die URI, zu der eine Verbindung hergestellt werden soll, kommt in Form von "https://address:port" für Milvus oder Zilliz Cloud Service, oder "path/to/local/milvus.db" für das lite local Milvus. Die Standardeinstellung ist "./milvus_llamaindex.db".</li>
<li><code translate="no">token (str, optional)</code>: Das Token für den Log-In. Leer, wenn kein rbac verwendet wird. Wenn rbac verwendet wird, wird es wahrscheinlich "username:password" sein.</li>
<li><code translate="no">collection_name (str, optional)</code>: Der Name der Sammlung, in der die Daten gespeichert werden sollen. Der Standardwert ist "llamalection".</li>
<li><code translate="no">overwrite (bool, optional)</code>: Ob eine bestehende Sammlung mit demselben Namen überschrieben werden soll. Der Standardwert ist False.</li>
</ul>
<h4 id="scalar-fields-including-doc-id--text" class="common-anchor-header">skalare Felder einschließlich doc id &amp; text</h4><ul>
<li><code translate="no">doc_id_field (str, optional)</code>: Der Name des doc_id-Feldes für die Sammlung. Der Standardwert ist DEFAULT_DOC_ID_KEY.</li>
<li><code translate="no">text_key (str, optional)</code>: Welcher Schlüsseltext in der übergebenen Sammlung gespeichert wird. Wird verwendet, wenn Sie Ihre eigene Sammlung mitbringen. Der Standardwert ist DEFAULT_TEXT_KEY.</li>
<li><code translate="no">scalar_field_names (list, optional)</code>: Die Namen der zusätzlichen skalaren Felder, die in das Sammlungsschema aufgenommen werden sollen.</li>
<li><code translate="no">scalar_field_types (list, optional)</code>: Die Typen der zusätzlichen skalaren Felder.</li>
</ul>
<h4 id="dense-field" class="common-anchor-header">dichtes Feld</h4><ul>
<li><code translate="no">enable_dense (bool)</code>: Ein boolesches Flag zum Aktivieren oder Deaktivieren der dichten Einbettung. Die Voreinstellung ist True.</li>
<li><code translate="no">dim (int, optional)</code>: Die Dimension der Einbettungsvektoren für die Sammlung. Erforderlich bei der Erstellung einer neuen Sammlung mit enable_sparse ist False.</li>
<li><code translate="no">embedding_field (str, optional)</code>: Name des dichten Einbettungsfeldes für die Sammlung, Standardwert ist DEFAULT_EMBEDDING_KEY.</li>
<li><code translate="no">index_config (dict, optional)</code>: Die für die Erstellung des Dense Embedding Index verwendete Konfiguration. Der Standardwert ist None.</li>
<li><code translate="no">search_config (dict, optional)</code>: Die Konfiguration, die für die Suche im dichten Milvus-Index verwendet wird. Beachten Sie, dass dies mit dem durch <code translate="no">index_config</code> angegebenen Indextyp kompatibel sein muss. Der Standardwert ist None.</li>
<li><code translate="no">similarity_metric (str, optional)</code>: Die Ähnlichkeitsmetrik, die für die dichte Einbettung verwendet werden soll. Derzeit werden IP, COSINE und L2 unterstützt.</li>
</ul>
<h4 id="sparse-field" class="common-anchor-header">sparse field</h4><ul>
<li><code translate="no">enable_sparse (bool)</code>: Ein boolesches Flag zum Aktivieren oder Deaktivieren der Sparse-Einbettung. Der Standardwert ist False.</li>
<li><code translate="no">sparse_embedding_field (str)</code>: Der Name des Sparse-Embedding-Feldes, Standardwert ist DEFAULT_SPARSE_EMBEDDING_KEY.</li>
<li><code translate="no">sparse_embedding_function (Union[BaseSparseEmbeddingFunction, BaseMilvusBuiltInFunction], optional)</code>: Wenn enable_sparse True ist, sollte dieses Objekt bereitgestellt werden, um Text in eine Sparse-Einbettung zu konvertieren. Wenn None, wird die Standard-Sparse-Embedding-Funktion (BGEM3SparseEmbeddingFunction) verwendet.</li>
<li><code translate="no">sparse_index_config (dict, optional)</code>: Die Konfiguration, die zur Erstellung des Sparse Embedding Index verwendet wird. Der Standardwert ist None.</li>
</ul>
<h4 id="hybrid-ranker" class="common-anchor-header">Hybrid-Rangierer</h4><ul>
<li><p><code translate="no">hybrid_ranker (str)</code>: Gibt den Typ des Rankers an, der in hybriden Suchanfragen verwendet wird. Unterstützt derzeit nur ["RRFRanker", "WeightedRanker"]. Der Standardwert ist "RRFRanker".</p></li>
<li><p><code translate="no">hybrid_ranker_params (dict, optional)</code>: Konfigurationsparameter für den hybriden Ranker. Die Struktur dieses Wörterbuchs hängt von dem spezifischen Ranker ab, der verwendet wird:</p>
<ul>
<li>Für "RRFRanker" sollte es enthalten:<ul>
<li>"k" (int): Ein bei der Reciprocal Rank Fusion (RRF) verwendeter Parameter. Dieser Wert wird zur Berechnung der Rank Scores als Teil des RRF-Algorithmus verwendet, der mehrere Ranking-Strategien zu einem einzigen Score kombiniert, um die Suchrelevanz zu verbessern.</li>
</ul></li>
<li>Für "WeightedRanker" wird erwartet:<ul>
<li>"Gewichte" (Liste von Floats): Eine Liste mit genau zwei Gewichten:<ol>
<li>Die Gewichtung für die dichte Einbettungskomponente.</li>
<li>Die Gewichtung für die spärliche Einbettungskomponente. Diese Gewichte werden verwendet, um die Bedeutung der dichten und spärlichen Komponenten der Einbettungen im hybriden Retrievalprozess anzupassen. Der Standardwert ist ein leeres Wörterbuch, was bedeutet, dass der Ranker mit seinen vordefinierten Standardeinstellungen arbeitet.</li>
</ol></li>
</ul></li>
</ul></li>
</ul>
<h4 id="others" class="common-anchor-header">andere</h4><ul>
<li><code translate="no">collection_properties (dict, optional)</code>: Die Eigenschaften der Sammlung wie TTL (Time-To-Live) und MMAP (Memory Mapping). Die Standardeinstellung ist Keine. Sie könnte enthalten:<ul>
<li>"collection.ttl.seconds" (int): Sobald diese Eigenschaft gesetzt ist, laufen die Daten in der aktuellen Sammlung nach der angegebenen Zeit ab. Abgelaufene Daten in der Sammlung werden bereinigt und nicht in Suchvorgänge oder Abfragen einbezogen.</li>
<li>"mmap.enabled" (bool): Ob die Memory-Mapped-Speicherung auf der Ebene der Sammlung aktiviert werden soll.</li>
</ul></li>
<li><code translate="no">index_management (IndexManagement)</code>: Gibt die zu verwendende Indexverwaltungsstrategie an. Der Standardwert ist "create_if_not_exists".</li>
<li><code translate="no">batch_size (int)</code>: Konfiguriert die Anzahl der in einem Stapel verarbeiteten Dokumente beim Einfügen von Daten in Milvus. Der Standardwert ist DEFAULT_BATCH_SIZE.</li>
<li><code translate="no">consistency_level (str, optional)</code>: Welche Konsistenzstufe für eine neu erstellte Sammlung verwendet werden soll. Der Standardwert ist "Session".</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create an index over the documents</span>
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> VectorStoreIndex, StorageContext
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore


vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1536</span>, overwrite=<span class="hljs-literal">True</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Für die Parameter von <code translate="no">MilvusVectorStore</code>:</p>
<ul>
<li>Die Einstellung von <code translate="no">uri</code> als lokale Datei, z. B.<code translate="no">./milvus.db</code>, ist die bequemste Methode, da <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> automatisch alle Daten in dieser Datei speichert.</li>
<li>Wenn Sie große Datenmengen haben, können Sie einen leistungsfähigeren Milvus-Server auf <a href="https://milvus.io/docs/quickstart.md">Docker oder Kubernetes</a> einrichten. Bei dieser Einrichtung verwenden Sie bitte die Server-Uri, z. B.<code translate="no">http://localhost:19530</code>, als <code translate="no">uri</code>.</li>
<li>Wenn Sie <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, den vollständig verwalteten Cloud-Service für Milvus, nutzen möchten, passen Sie <code translate="no">uri</code> und <code translate="no">token</code> an, die dem <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">öffentlichen Endpunkt und dem Api-Schlüssel</a> in Zilliz Cloud entsprechen.</li>
</ul>
</div>
<h3 id="Query-the-data" class="common-anchor-header">Abfrage der Daten</h3><p>Nun, da unser Dokument im Index gespeichert ist, können wir Fragen an den Index stellen. Der Index wird die in ihm gespeicherten Daten als Wissensbasis für chatgpt verwenden.</p>
<pre><code translate="no" class="language-python">query_engine = index.as_query_engine()
res = query_engine.query(<span class="hljs-string">&quot;What did the author learn?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned that philosophy courses in college were boring to him, leading him to switch his focus to studying AI.
</code></pre>
<pre><code translate="no" class="language-python">res = query_engine.query(<span class="hljs-string">&quot;What challenges did the disease pose for the author?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The disease posed challenges for the author as it affected his mother's health, leading to a stroke caused by colon cancer. This resulted in her losing her balance and needing to be placed in a nursing home. The author and his sister were determined to help their mother get out of the nursing home and back to her house.
</code></pre>
<p>Der nächste Test zeigt, dass das Überschreiben die vorherigen Daten entfernt.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> Document


vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1536</span>, overwrite=<span class="hljs-literal">True</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(
    [Document(text=<span class="hljs-string">&quot;The number that is being searched for is ten.&quot;</span>)],
    storage_context,
)
query_engine = index.as_query_engine()
res = query_engine.query(<span class="hljs-string">&quot;Who is the author?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author is the individual who created the context information.
</code></pre>
<p>Der nächste Test zeigt das Hinzufügen zusätzlicher Daten zu einem bereits bestehenden Index.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">del</span> index, vector_store, storage_context, query_engine

vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, overwrite=<span class="hljs-literal">False</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
query_engine = index.as_query_engine()
res = query_engine.query(<span class="hljs-string">&quot;What is the number?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The number is ten.
</code></pre>
<pre><code translate="no" class="language-python">res = query_engine.query(<span class="hljs-string">&quot;Who is the author?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Paul Graham
</code></pre>
<h2 id="Metadata-filtering" class="common-anchor-header">Filtern von Metadaten<button data-href="#Metadata-filtering" class="anchor-icon" translate="no">
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
    </button></h2><p>Wir können Ergebnisse erzeugen, indem wir bestimmte Quellen filtern. Das folgende Beispiel zeigt, wie alle Dokumente aus dem Verzeichnis geladen und anschließend nach Metadaten gefiltert werden.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core.vector_stores <span class="hljs-keyword">import</span> ExactMatchFilter, MetadataFilters

<span class="hljs-comment"># Load all the two documents loaded before</span>
documents_all = SimpleDirectoryReader(<span class="hljs-string">&quot;./data/&quot;</span>).load_data()

vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1536</span>, overwrite=<span class="hljs-literal">True</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents_all, storage_context)
<button class="copy-code-btn"></button></code></pre>
<p>Wir wollen nur Dokumente aus der Datei <code translate="no">uber_2021.pdf</code> abrufen.</p>
<pre><code translate="no" class="language-python">filters = MetadataFilters(
    filters=[ExactMatchFilter(key=<span class="hljs-string">&quot;file_name&quot;</span>, value=<span class="hljs-string">&quot;uber_2021.pdf&quot;</span>)]
)
query_engine = index.as_query_engine(filters=filters)
res = query_engine.query(<span class="hljs-string">&quot;What challenges did the disease pose for the author?&quot;</span>)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The disease posed challenges related to the adverse impact on the business and operations, including reduced demand for Mobility offerings globally, affecting travel behavior and demand. Additionally, the pandemic led to driver supply constraints, impacted by concerns regarding COVID-19, with uncertainties about when supply levels would return to normal. The rise of the Omicron variant further affected travel, resulting in advisories and restrictions that could adversely impact both driver supply and consumer demand for Mobility offerings.
</code></pre>
<p>Wir erhalten diesmal ein anderes Ergebnis, wenn wir aus der Datei <code translate="no">paul_graham_essay.txt</code> abrufen.</p>
<pre><code translate="no" class="language-python">filters = MetadataFilters(
    filters=[ExactMatchFilter(key=<span class="hljs-string">&quot;file_name&quot;</span>, value=<span class="hljs-string">&quot;paul_graham_essay.txt&quot;</span>)]
)
query_engine = index.as_query_engine(filters=filters)
res = query_engine.query(<span class="hljs-string">&quot;What challenges did the disease pose for the author?&quot;</span>)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The disease posed challenges for the author as it affected his mother's health, leading to a stroke caused by colon cancer. This resulted in his mother losing her balance and needing to be placed in a nursing home. The author and his sister were determined to help their mother get out of the nursing home and back to her house.
</code></pre>
