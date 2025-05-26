---
id: llamaindex_milvus_hybrid_search.md
title: RAG nutzt hybride Suche mit Milvus und LlamaIndex
related_key: LlamaIndex
summary: >-
  Dieses Notebook demonstriert, wie Milvus für die hybride Suche in
  [LlamaIndex](https://www.llamaindex.ai/) RAG-Pipelines verwendet werden kann.
  Wir beginnen mit der empfohlenen Standard-Hybridsuche (semantisch + BM25) und
  erkunden dann andere alternative Sparse-Embedding-Methoden und Anpassungen des
  Hybrid-Rerankers.
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_hybrid_search.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_hybrid_search.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="RAG-using-Hybrid-Search-with-Milvus-and-LlamaIndex" class="common-anchor-header">RAG nutzt hybride Suche mit Milvus und LlamaIndex<button data-href="#RAG-using-Hybrid-Search-with-Milvus-and-LlamaIndex" class="anchor-icon" translate="no">
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
    </button></h1><p>Die hybride Suche nutzt die Stärken sowohl der semantischen Suche als auch des Abgleichs von Schlüsselwörtern, um genauere und kontextbezogene Ergebnisse zu liefern. Durch die Kombination der Vorteile von semantischer Suche und Keyword-Matching ist die hybride Suche besonders effektiv bei komplexen Information Retrieval Aufgaben.</p>
<p>Dieses Notebook zeigt, wie Milvus für die hybride Suche in <a href="https://www.llamaindex.ai/">LlamaIndex</a> RAG-Pipelines verwendet werden kann. Wir beginnen mit der empfohlenen Standard-Hybridsuche (semantisch + BM25) und erkunden dann andere alternative Sparse-Embedding-Methoden und die Anpassung des Hybrid-Rerankers.</p>
<h2 id="Prerequisites" class="common-anchor-header">Voraussetzungen<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Abhängigkeiten installieren</strong></p>
<p>Bevor Sie beginnen, stellen Sie sicher, dass Sie die folgenden Abhängigkeiten installiert haben:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-vector-stores-milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-embeddings-openai</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-llms-openai</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Wenn Sie Google Colab verwenden, müssen Sie möglicherweise <strong>die Runtime neu starten</strong> (navigieren Sie zum Menü "Runtime" am oberen Rand der Benutzeroberfläche und wählen Sie "Restart session" aus dem Dropdown-Menü).</p>
</div>
<p><strong>Konten einrichten</strong></p>
<p>Dieses Tutorial verwendet OpenAI für Texteinbettungen und die Generierung von Antworten. Sie müssen den <a href="https://platform.openai.com/api-keys">OpenAI-API-Schlüssel</a> vorbereiten.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> openai

openai.api_key = <span class="hljs-string">&quot;sk-&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Um den Milvus-Vektorspeicher zu verwenden, geben Sie Ihren Milvus-Server <code translate="no">URI</code> (und optional mit der <code translate="no">TOKEN</code>) an. Um einen Milvus-Server zu starten, können Sie einen Milvus-Server einrichten, indem Sie der <a href="https://milvus.io/docs/install-overview.md">Milvus-Installationsanleitung</a> folgen oder einfach <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">Zilliz Cloud</a> kostenlos ausprobieren.</p>
<blockquote>
<p>Die Volltextsuche wird derzeit in Milvus Standalone, Milvus Distributed und Zilliz Cloud unterstützt, aber noch nicht in Milvus Lite (für eine zukünftige Implementierung geplant). Wenden Sie sich an support@zilliz.com für weitere Informationen.</p>
</blockquote>
<pre><code translate="no" class="language-python">URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-comment"># TOKEN = &quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Beispieldaten laden</strong></p>
<p>Führen Sie die folgenden Befehle aus, um Beispieldokumente in das Verzeichnis "data/paul_graham" zu laden:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">mkdir</span> -p <span class="hljs-string">&#x27;data/paul_graham/&#x27;</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt&#x27;</span> -O <span class="hljs-string">&#x27;data/paul_graham/paul_graham_essay.txt&#x27;</span></span>
<button class="copy-code-btn"></button></code></pre>
<p>Verwenden Sie dann <code translate="no">SimpleDirectoryReaderLoad</code>, um den Aufsatz "What I Worked On" von Paul Graham zu laden:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> SimpleDirectoryReader

documents = SimpleDirectoryReader(<span class="hljs-string">&quot;./data/paul_graham/&quot;</span>).load_data()

<span class="hljs-comment"># Let&#x27;s take a look at the first document</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Example document:\n&quot;</span>, documents[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Example document:
 Doc ID: f9cece8c-9022-46d8-9d0e-f29d70e1dbbe
Text: What I Worked On  February 2021  Before college the two main
things I worked on, outside of school, were writing and programming. I
didn't write essays. I wrote what beginning writers were supposed to
write then, and probably still are: short stories. My stories were
awful. They had hardly any plot, just characters with strong feelings,
which I ...
</code></pre>
<h2 id="Hybrid-Search-with-BM25" class="common-anchor-header">Hybride Suche mit BM25<button data-href="#Hybrid-Search-with-BM25" class="anchor-icon" translate="no">
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
    </button></h2><p>In diesem Abschnitt wird gezeigt, wie man eine hybride Suche mit BM25 durchführt. Zu Beginn wird <code translate="no">MilvusVectorStore</code> initialisiert und ein Index für die Beispieldokumente erstellt. Die Standardkonfiguration verwendet:</p>
<ul>
<li>Dichte Einbettungen aus dem Standard-Einbettungsmodell (OpenAI's <code translate="no">text-embedding-ada-002</code>)</li>
<li>BM25 für die Volltextsuche, wenn enable_sparse True ist</li>
<li>RRFRanker mit k=60 zum Kombinieren der Ergebnisse, wenn die hybride Suche aktiviert ist</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create an index over the documnts</span>
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> StorageContext, VectorStoreIndex


vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    dim=<span class="hljs-number">1536</span>,  <span class="hljs-comment"># vector dimension depends on the embedding model</span>
    enable_sparse=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># enable the default full-text search using BM25</span>
    overwrite=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># drop the collection if it already exists</span>
)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-04-17 03:38:16,645 [DEBUG][_create_connection]: Created new connection using: cf0f4df74b18418bb89ec512063c1244 (async_milvus_client.py:547)
Sparse embedding function is not provided, using default.
Default sparse embedding function: BM25BuiltInFunction(input_field_names='text', output_field_names='sparse_embedding').
</code></pre>
<p>Hier finden Sie weitere Informationen zu den Argumenten für die Konfiguration von Dense- und Sparse-Feldern in der <code translate="no">MilvusVectorStore</code>:</p>
<p><strong>dichtes Feld</strong></p>
<ul>
<li><code translate="no">enable_dense (bool)</code>: Ein boolesches Flag zur Aktivierung oder Deaktivierung der dichten Einbettung. Die Voreinstellung ist True.</li>
<li><code translate="no">dim (int, optional)</code>: Die Dimension der Einbettungsvektoren für die Sammlung.</li>
<li><code translate="no">embedding_field (str, optional)</code>: Der Name des Feldes für die dichte Einbettung der Sammlung, Standardwert ist DEFAULT_EMBEDDING_KEY.</li>
<li><code translate="no">index_config (dict, optional)</code>: Die für die Erstellung des Dense-Embedding-Index verwendete Konfiguration. Der Standardwert ist None.</li>
<li><code translate="no">search_config (dict, optional)</code>: Die Konfiguration, die für die Suche im dichten Milvus-Index verwendet wird. Beachten Sie, dass dies mit dem durch <code translate="no">index_config</code> angegebenen Indextyp kompatibel sein muss. Der Standardwert ist None.</li>
<li><code translate="no">similarity_metric (str, optional)</code>: Die Ähnlichkeitsmetrik, die für die dichte Einbettung verwendet werden soll. Derzeit werden IP, COSINE und L2 unterstützt.</li>
</ul>
<p><strong>sparse field</strong></p>
<ul>
<li><code translate="no">enable_sparse (bool)</code>: Ein boolesches Flag zum Aktivieren oder Deaktivieren der Sparse-Einbettung. Der Standardwert ist False.</li>
<li><code translate="no">sparse_embedding_field (str)</code>: Der Name des Sparse-Embedding-Feldes, Standardwert ist DEFAULT_SPARSE_EMBEDDING_KEY.</li>
<li><code translate="no">sparse_embedding_function (Union[BaseSparseEmbeddingFunction, BaseMilvusBuiltInFunction], optional)</code>: Wenn enable_sparse True ist, sollte dieses Objekt bereitgestellt werden, um Text in eine Sparse-Einbettung zu konvertieren. Wenn None, wird die Standard-Sparse-Embedding-Funktion (BM25BuiltInFunction) verwendet, oder es wird BGEM3SparseEmbedding verwendet, wenn eine Sammlung ohne integrierte Funktionen vorhanden ist.</li>
<li><code translate="no">sparse_index_config (dict, optional)</code>: Die Konfiguration, die zur Erstellung des Sparse Embedding Index verwendet wird. Der Standardwert ist None.</li>
</ul>
<p>Um die hybride Suche während der Abfragephase zu aktivieren, setzen Sie <code translate="no">vector_store_query_mode</code> auf "hybrid". Dadurch werden Suchergebnisse aus der semantischen Suche und der Volltextsuche kombiniert und neu eingestuft. Testen wir es mit einer Beispielabfrage: "Was hat der Autor bei Viaweb gelernt?":</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> textwrap

query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;hybrid&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
response = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(response), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned about retail, the importance of user feedback, and the significance of growth
rate as the ultimate test of a startup at Viaweb.
</code></pre>
<h3 id="Customize-text-analyzer" class="common-anchor-header">Text-Analysator anpassen</h3><p>Analyzer spielen eine wichtige Rolle bei der Volltextsuche, indem sie Sätze in Token zerlegen und lexikalische Verarbeitungen durchführen, z. B. Stemming und Stoppwortentfernung. Sie sind in der Regel sprachspezifisch. Weitere Einzelheiten finden Sie im <a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">Milvus Analyzer Guide</a>.</p>
<p>Milvus unterstützt zwei Arten von Analyzern: <strong>Eingebaute Analyzer</strong> und <strong>benutzerdefinierte Analyzer</strong>. Wenn <code translate="no">enable_sparse</code> auf True gesetzt ist, verwendet <code translate="no">MilvusVectorStore</code> standardmäßig <code translate="no">BM25BuiltInFunction</code> mit Standardkonfigurationen, wobei der standardmäßig eingebaute Analyzer verwendet wird, der Text auf der Grundlage von Interpunktion tokenisiert.</p>
<p>Um einen anderen Analyzer zu verwenden oder den vorhandenen anzupassen, können Sie beim Erstellen von <code translate="no">BM25BuiltInFunction</code> Werte für das Argument <code translate="no">analyzer_params</code> angeben. Setzen Sie diese Funktion dann als <code translate="no">sparse_embedding_function</code> in <code translate="no">MilvusVectorStore</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.vector_stores.milvus.utils <span class="hljs-keyword">import</span> BM25BuiltInFunction

bm25_function = BM25BuiltInFunction(
    analyzer_params={
        <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: [
            <span class="hljs-string">&quot;lowercase&quot;</span>,  <span class="hljs-comment"># Built-in filter</span>
            {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>, <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">40</span>},  <span class="hljs-comment"># Custom cap size of a single token</span>
            {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>]},  <span class="hljs-comment"># Custom stopwords</span>
        ],
    },
    enable_match=<span class="hljs-literal">True</span>,
)

vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    dim=<span class="hljs-number">1536</span>,
    enable_sparse=<span class="hljs-literal">True</span>,
    sparse_embedding_function=bm25_function,  <span class="hljs-comment"># BM25 with custom analyzer</span>
    overwrite=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-04-17 03:38:48,085 [DEBUG][_create_connection]: Created new connection using: 61afd81600cb46ee89f887f16bcbfe55 (async_milvus_client.py:547)
</code></pre>
<h2 id="Hybrid-Search-with-Other-Sparse-Embedding" class="common-anchor-header">Hybride Suche mit anderer spärlicher Einbettung<button data-href="#Hybrid-Search-with-Other-Sparse-Embedding" class="anchor-icon" translate="no">
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
    </button></h2><p>Neben der Kombination der semantischen Suche mit BM25 unterstützt Milvus auch die hybride Suche mit einer Sparse Embedding-Funktion wie <a href="https://arxiv.org/abs/2402.03216">BGE-M3</a>. Das folgende Beispiel verwendet die eingebaute <code translate="no">BGEM3SparseEmbeddingFunction</code>, um Sparse Embeddings zu erzeugen.</p>
<p>Zunächst müssen wir das Paket <code translate="no">FlagEmbedding</code> installieren:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install -q FlagEmbedding</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dann erstellen wir den Vektorspeicher und den Index unter Verwendung des OpenAI-Standardmodells für die Densen-Einbettung und des eingebauten BGE-M3 für die Sparse-Einbettung:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.vector_stores.milvus.utils <span class="hljs-keyword">import</span> BGEM3SparseEmbeddingFunction

vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    dim=<span class="hljs-number">1536</span>,
    enable_sparse=<span class="hljs-literal">True</span>,
    sparse_embedding_function=BGEM3SparseEmbeddingFunction(),
    overwrite=<span class="hljs-literal">True</span>,
)

storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Fetching 30 files: 100%|██████████| 30/30 [00:00&lt;00:00, 68871.99it/s]
2025-04-17 03:39:02,074 [DEBUG][_create_connection]: Created new connection using: ff4886e2f8da44e08304b748d9ac9b51 (async_milvus_client.py:547)
Chunks: 100%|██████████| 1/1 [00:00&lt;00:00,  1.07it/s]
</code></pre>
<p>Führen wir nun eine hybride Suchanfrage mit einer Beispielfrage durch:</p>
<pre><code translate="no" class="language-python">query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;hybrid&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
response = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb??&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(response), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Chunks: 100%|██████████| 1/1 [00:00&lt;00:00, 17.29it/s]


The author learned about retail, the importance of user feedback, the value of growth rate in a
startup, the significance of pricing strategy, the benefits of working on things that weren't
prestigious, and the challenges and rewards of running a startup.
</code></pre>
<h3 id="Customize-Sparse-Embedding-Function" class="common-anchor-header">Anpassen der Sparse Embedding Funktion</h3><p>Sie können auch die Sparse Embedding-Funktion anpassen, solange sie von <code translate="no">BaseSparseEmbeddingFunction</code> erbt, einschließlich der folgenden Methoden:</p>
<ul>
<li><code translate="no">encode_queries</code>: Diese Methode wandelt Texte in eine Liste von Sparse Embeddings für Abfragen um.</li>
<li><code translate="no">encode_documents</code>: Diese Methode wandelt Text in eine Liste von Sparse Embeddings für Dokumente um.</li>
</ul>
<p>Die Ausgabe jeder Methode sollte dem Format der Sparse Embeddings entsprechen, das eine Liste von Wörterbüchern ist. Jedes Wörterbuch sollte einen Schlüssel (eine ganze Zahl) haben, der die Dimension angibt, und einen entsprechenden Wert (eine Fließkommazahl), der die Größe der Einbettung in dieser Dimension angibt (z. B. {1: 0.5, 2: 0.3}).</p>
<p>Hier ist zum Beispiel eine benutzerdefinierte Sparse Embedding-Funktion, die BGE-M3 verwendet:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> FlagEmbedding <span class="hljs-keyword">import</span> BGEM3FlagModel
<span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">List</span>
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus.utils <span class="hljs-keyword">import</span> BaseSparseEmbeddingFunction


<span class="hljs-keyword">class</span> <span class="hljs-title class_">ExampleEmbeddingFunction</span>(<span class="hljs-title class_ inherited__">BaseSparseEmbeddingFunction</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.model = BGEM3FlagModel(<span class="hljs-string">&quot;BAAI/bge-m3&quot;</span>, use_fp16=<span class="hljs-literal">False</span>)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_queries</span>(<span class="hljs-params">self, queries: <span class="hljs-type">List</span>[<span class="hljs-built_in">str</span>]</span>):
        outputs = <span class="hljs-variable language_">self</span>.model.encode(
            queries,
            return_dense=<span class="hljs-literal">False</span>,
            return_sparse=<span class="hljs-literal">True</span>,
            return_colbert_vecs=<span class="hljs-literal">False</span>,
        )[<span class="hljs-string">&quot;lexical_weights&quot;</span>]
        <span class="hljs-keyword">return</span> [<span class="hljs-variable language_">self</span>._to_standard_dict(output) <span class="hljs-keyword">for</span> output <span class="hljs-keyword">in</span> outputs]

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_documents</span>(<span class="hljs-params">self, documents: <span class="hljs-type">List</span>[<span class="hljs-built_in">str</span>]</span>):
        outputs = <span class="hljs-variable language_">self</span>.model.encode(
            documents,
            return_dense=<span class="hljs-literal">False</span>,
            return_sparse=<span class="hljs-literal">True</span>,
            return_colbert_vecs=<span class="hljs-literal">False</span>,
        )[<span class="hljs-string">&quot;lexical_weights&quot;</span>]
        <span class="hljs-keyword">return</span> [<span class="hljs-variable language_">self</span>._to_standard_dict(output) <span class="hljs-keyword">for</span> output <span class="hljs-keyword">in</span> outputs]

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">_to_standard_dict</span>(<span class="hljs-params">self, raw_output</span>):
        result = {}
        <span class="hljs-keyword">for</span> k <span class="hljs-keyword">in</span> raw_output:
            result[<span class="hljs-built_in">int</span>(k)] = raw_output[k]
        <span class="hljs-keyword">return</span> result
<button class="copy-code-btn"></button></code></pre>
<h2 id="Customize-hybrid-reranker" class="common-anchor-header">Anpassen des Hybrid-Rerankers<button data-href="#Customize-hybrid-reranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus unterstützt zwei Arten von <a href="https://milvus.io/docs/reranking.md">Reranking-Strategien</a>: Reciprocal Rank Fusion (RRF) und Weighted Scoring. Der Standard-Ranker in der <code translate="no">MilvusVectorStore</code> Hybridsuche ist RRF mit k=60. Um den hybriden Ranker anzupassen, ändern Sie die folgenden Parameter:</p>
<ul>
<li><code translate="no">hybrid_ranker (str)</code>: Gibt den Typ des Rankers an, der in hybriden Suchanfragen verwendet wird. Derzeit wird nur ["RRFRanker", "WeightedRanker"] unterstützt. Die Voreinstellung ist "RRFRanker".</li>
<li><code translate="no">hybrid_ranker_params (dict, optional)</code>: Konfigurationsparameter für den hybriden Ranker. Die Struktur dieses Wörterbuchs hängt von dem spezifischen Ranker ab, der verwendet wird:<ul>
<li>Für "RRFRanker" sollte es enthalten:<ul>
<li>"k" (int): Ein bei der Reciprocal Rank Fusion (RRF) verwendeter Parameter. Dieser Wert wird zur Berechnung der Rank Scores als Teil des RRF-Algorithmus verwendet, der mehrere Ranking-Strategien zu einem einzigen Score kombiniert, um die Suchrelevanz zu verbessern. Der Standardwert ist 60, wenn er nicht angegeben wird.</li>
</ul></li>
<li>Für "WeightedRanker" wird erwartet:<ul>
<li>"weights" (Liste von Floats): Eine Liste mit genau zwei Gewichten:<ol>
<li>Das Gewicht für die dichte Einbettungskomponente.</li>
<li>Die Gewichtung für die spärliche Einbettungskomponente. Diese Gewichte werden verwendet, um die Bedeutung der dichten und spärlichen Komponenten der Einbettungen im hybriden Suchprozess auszugleichen. Die Standardgewichte sind [1.0, 1.0], wenn sie nicht angegeben werden.</li>
</ol></li>
</ul></li>
</ul></li>
</ul>
<pre><code translate="no" class="language-python">vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    dim=<span class="hljs-number">1536</span>,
    overwrite=<span class="hljs-literal">False</span>,  <span class="hljs-comment"># Use the existing collection created in the previous example</span>
    enable_sparse=<span class="hljs-literal">True</span>,
    hybrid_ranker=<span class="hljs-string">&quot;WeightedRanker&quot;</span>,
    hybrid_ranker_params={<span class="hljs-string">&quot;weights&quot;</span>: [<span class="hljs-number">1.0</span>, <span class="hljs-number">0.5</span>]},
)
index = VectorStoreIndex.from_vector_store(vector_store)
query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;hybrid&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
response = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(response), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-04-17 03:44:00,419 [DEBUG][_create_connection]: Created new connection using: 09c051fb18c04f97a80f07958856587b (async_milvus_client.py:547)
Sparse embedding function is not provided, using default.
No built-in function detected, using BGEM3SparseEmbeddingFunction().
Fetching 30 files: 100%|██████████| 30/30 [00:00&lt;00:00, 136622.28it/s]
Chunks: 100%|██████████| 1/1 [00:00&lt;00:00,  1.07it/s]


The author learned several valuable lessons at Viaweb, including the importance of understanding
growth rate as the ultimate test of a startup, the significance of user feedback in shaping the
software, and the realization that web applications were the future of software development.
Additionally, the experience at Viaweb taught the author about the challenges and rewards of running
a startup, the value of simplicity in software design, and the impact of pricing strategies on
attracting customers.
</code></pre>
