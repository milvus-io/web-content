---
id: llamaindex_milvus_full_text_search.md
title: Verwendung der Volltextsuche mit LlamaIndex und Milvus
related_key: LlamaIndex
summary: >-
  In diesem Tutorial lernen Sie, wie Sie mit LlamaIndex und Milvus ein
  RAG-System mit Volltextsuche und hybrider Suche aufbauen. Wir beginnen mit der
  Implementierung einer reinen Volltextsuche und erweitern diese dann durch die
  Integration einer semantischen Suche für umfassendere Ergebnisse.
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_full_text_search.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_full_text_search.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Using-Full-Text-Search-with-LlamaIndex-and-Milvus" class="common-anchor-header">Verwendung der Volltextsuche mit LlamaIndex und Milvus<button data-href="#Using-Full-Text-Search-with-LlamaIndex-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Die<strong>Volltextsuche</strong> verwendet exakte Schlüsselwortabgleiche und nutzt oft Algorithmen wie BM25, um Dokumente nach Relevanz zu ordnen. In <strong>Retrieval-Augmented Generation (RAG)</strong> -Systemen wird mit dieser Methode relevanter Text abgerufen, um die von der KI generierten Antworten zu verbessern.</p>
<p>In der Zwischenzeit interpretiert die <strong>semantische Suche</strong> die kontextuelle Bedeutung, um umfassendere Ergebnisse zu liefern. Durch die Kombination beider Ansätze entsteht eine <strong>hybride Suche</strong>, die das Abrufen von Informationen verbessert - insbesondere in Fällen, in denen eine einzelne Methode nicht ausreicht.</p>
<p>Mit dem Sparse-BM25-Ansatz von <a href="https://milvus.io/blog/introduce-milvus-2-5-full-text-search-powerful-metadata-filtering-and-more.md">Milvus 2.5</a> wird der Rohtext automatisch in Sparse-Vektoren umgewandelt. Dies macht die manuelle Erzeugung von Sparse Embedding überflüssig und ermöglicht eine hybride Suchstrategie, die ein Gleichgewicht zwischen semantischem Verständnis und Schlüsselwortrelevanz schafft.</p>
<p>In diesem Tutorial lernen Sie, wie Sie mit LlamaIndex und Milvus ein RAG-System mit Volltextsuche und hybrider Suche aufbauen können. Wir beginnen mit der Implementierung einer reinen Volltextsuche und erweitern diese dann durch die Integration einer semantischen Suche für umfassendere Ergebnisse.</p>
<blockquote>
<p>Bevor Sie mit diesem Tutorial fortfahren, stellen Sie sicher, dass Sie mit der <a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">Volltextsuche</a> und den <a href="https://milvus.io/docs/integrate_with_llamaindex.md">Grundlagen der Verwendung von Milvus in LlamaIndex</a> vertraut sind.</p>
</blockquote>
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
<p>Bevor Sie beginnen, sollten Sie sicherstellen, dass Sie die folgenden Abhängigkeiten installiert haben:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-vector-stores-milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-embeddings-openai</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-llms-openai</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<blockquote>
<p>Wenn Sie Google Colab verwenden, müssen Sie möglicherweise <strong>die Runtime neu starten</strong> (navigieren Sie zum Menü "Runtime" am oberen Rand der Benutzeroberfläche und wählen Sie "Restart session" aus dem Dropdown-Menü).</p>
</blockquote>
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
<p><strong>Download von Beispieldaten</strong></p>
<p>Führen Sie die folgenden Befehle aus, um Beispieldokumente in das Verzeichnis "data/paul_graham" herunterzuladen:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">mkdir</span> -p <span class="hljs-string">&#x27;data/paul_graham/&#x27;</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$wget</span> <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt&#x27;</span> -O <span class="hljs-string">&#x27;data/paul_graham/paul_graham_essay.txt&#x27;</span></span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">--2025-03-27 07:49:01--  https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt
Resolving raw.githubusercontent.com (raw.githubusercontent.com)... 185.199.108.133, 185.199.109.133, 185.199.110.133, ...
Connecting to raw.githubusercontent.com (raw.githubusercontent.com)|185.199.108.133|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 75042 (73K) [text/plain]
Saving to: ‘data/paul_graham/paul_graham_essay.txt’

data/paul_graham/pa 100%[===================&gt;]  73.28K  --.-KB/s    in 0.07s   

2025-03-27 07:49:01 (1.01 MB/s) - ‘data/paul_graham/paul_graham_essay.txt’ saved [75042/75042]
</code></pre>
<h2 id="RAG-with-Full-Text-Search" class="common-anchor-header">RAG mit Volltextsuche<button data-href="#RAG-with-Full-Text-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Integration der Volltextsuche in ein RAG-System schafft ein Gleichgewicht zwischen semantischer Suche und präzisem und vorhersehbarem stichwortbasiertem Retrieval. Sie können sich auch dafür entscheiden, nur die Volltextsuche zu verwenden, es wird jedoch empfohlen, die Volltextsuche mit der semantischen Suche zu kombinieren, um bessere Suchergebnisse zu erzielen. Zu Demonstrationszwecken zeigen wir hier die Volltextsuche allein und die hybride Suche.</p>
<p>Um zu beginnen, laden Sie mit <code translate="no">SimpleDirectoryReaderLoad</code> den Aufsatz "What I Worked On" von Paul Graham:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> SimpleDirectoryReader

documents = SimpleDirectoryReader(<span class="hljs-string">&quot;./data/paul_graham/&quot;</span>).load_data()

<span class="hljs-comment"># Let&#x27;s take a look at the first document</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Example document:\n&quot;</span>, documents[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Example document:
 Doc ID: 16b7942f-bf1a-4197-85e1-f31d51ea25a9
Text: What I Worked On  February 2021  Before college the two main
things I worked on, outside of school, were writing and programming. I
didn't write essays. I wrote what beginning writers were supposed to
write then, and probably still are: short stories. My stories were
awful. They had hardly any plot, just characters with strong feelings,
which I ...
</code></pre>
<h3 id="Full-Text-Search-with-BM25" class="common-anchor-header">Volltextsuche mit BM25</h3><p>LlamaIndex's <code translate="no">MilvusVectorStore</code> unterstützt die Volltextsuche und ermöglicht eine effiziente stichwortbasierte Suche. Unter Verwendung einer eingebauten Funktion wie <code translate="no">sparse_embedding_function</code> wird das BM25-Scoring angewendet, um die Suchergebnisse zu bewerten.</p>
<p>In diesem Abschnitt wird demonstriert, wie ein RAG-System mit BM25 für die Volltextsuche implementiert werden kann.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> VectorStoreIndex, StorageContext
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus.utils <span class="hljs-keyword">import</span> BM25BuiltInFunction
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> Settings

<span class="hljs-comment"># Skip dense embedding model</span>
Settings.embed_model = <span class="hljs-literal">None</span>

<span class="hljs-comment"># Build Milvus vector store creating a new collection</span>
vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    enable_dense=<span class="hljs-literal">False</span>,
    enable_sparse=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Only enable sparse to demo full text search</span>
    sparse_embedding_function=BM25BuiltInFunction(),
    overwrite=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Store documents in Milvus</span>
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Embeddings have been explicitly disabled. Using MockEmbedding.
</code></pre>
<p>Der obige Code fügt Beispieldokumente in Milvus ein und baut einen Index auf, um BM25-Ranking für die Volltextsuche zu ermöglichen. Er deaktiviert die dichte Einbettung und verwendet <code translate="no">BM25BuiltInFunction</code> mit Standardparametern.</p>
<p>Sie können die Eingabe- und Ausgabefelder in den <code translate="no">BM25BuiltInFunction</code> Parametern angeben:</p>
<ul>
<li><code translate="no">input_field_names (str)</code>: Das Eingabetextfeld (Standard: "text"). Es gibt an, auf welches Textfeld der BM25-Algorithmus angewendet wird. Ändern Sie dies, wenn Sie eine eigene Sammlung mit einem anderen Textfeldnamen verwenden.</li>
<li><code translate="no">output_field_names (str)</code>: Das Feld, in dem die Ausgaben dieser BM25-Funktion gespeichert werden (Standardwert: "sparse_embedding").</li>
</ul>
<p>Sobald der Vektorspeicher eingerichtet ist, können Sie mit Milvus Volltextsuchanfragen mit dem Abfragemodus "sparse" oder "text_search" durchführen:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> textwrap

query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;sparse&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
answer = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(answer), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned several important lessons at Viaweb. They learned about the importance of growth
rate as the ultimate test of a startup, the value of building stores for users to understand retail
and software usability, and the significance of being the &quot;entry level&quot; option in a market.
Additionally, they discovered the accidental success of making Viaweb inexpensive, the challenges of
hiring too many people, and the relief felt when the company was acquired by Yahoo.
</code></pre>
<h4 id="Customize-text-analyzer" class="common-anchor-header">Anpassen des Textanalysators</h4><p>Analyzer spielen eine wichtige Rolle bei der Volltextsuche, indem sie Sätze in Token zerlegen und lexikalische Verarbeitungen durchführen, z. B. Stemming und Stoppwortentfernung. Sie sind in der Regel sprachspezifisch. Weitere Einzelheiten finden Sie im <a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">Milvus Analyzer Guide</a>.</p>
<p>Milvus unterstützt zwei Arten von Analyzern: <strong>Eingebaute Analyzer</strong> und <strong>benutzerdefinierte Analyzer</strong>. Standardmäßig verwendet <code translate="no">BM25BuiltInFunction</code> den standardmäßig eingebauten Analyzer, der Text auf der Grundlage von Interpunktion tokenisiert.</p>
<p>Um einen anderen Analyzer zu verwenden oder den vorhandenen anzupassen, können Sie dem Argument <code translate="no">analyzer_params</code> einen Wert übergeben:</p>
<pre><code translate="no" class="language-python">bm25_function = BM25BuiltInFunction(
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
<button class="copy-code-btn"></button></code></pre>
<h3 id="Hybrid-Search-with-Reranker" class="common-anchor-header">Hybride Suche mit Reranker</h3><p>Ein hybrides Suchsystem kombiniert semantische Suche und Volltextsuche und optimiert die Suchleistung in einem RAG-System.</p>
<p>Das folgende Beispiel verwendet OpenAI Embedding für die semantische Suche und BM25 für die Volltextsuche:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create index over the documnts</span>
vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    <span class="hljs-comment"># enable_dense=True,  # enable_dense defaults to True</span>
    dim=<span class="hljs-number">1536</span>,
    enable_sparse=<span class="hljs-literal">True</span>,
    sparse_embedding_function=BM25BuiltInFunction(),
    overwrite=<span class="hljs-literal">True</span>,
    <span class="hljs-comment"># hybrid_ranker=&quot;RRFRanker&quot;,  # hybrid_ranker defaults to &quot;RRFRanker&quot;</span>
    <span class="hljs-comment"># hybrid_ranker_params={},  # hybrid_ranker_params defaults to {}</span>
)

storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(
    documents,
    storage_context=storage_context,
    embed_model=<span class="hljs-string">&quot;default&quot;</span>,  <span class="hljs-comment"># &quot;default&quot; will use OpenAI embedding</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>So funktioniert es</strong></p>
<p>Bei diesem Ansatz werden Dokumente in einer Milvus-Sammlung mit beiden Vektorfeldern gespeichert:</p>
<ul>
<li><code translate="no">embedding</code>: Dichte Einbettungen, die durch das OpenAI-Einbettungsmodell für die semantische Suche erzeugt werden.</li>
<li><code translate="no">sparse_embedding</code>: Sparse Embeddings, die mit BM25BuiltInFunction für die Volltextsuche berechnet werden.</li>
</ul>
<p>Darüber hinaus haben wir eine Reranking-Strategie mit "RRFRanker" mit seinen Standardparametern angewendet. Um den Reranker anzupassen, können Sie <code translate="no">hybrid_ranker</code> und <code translate="no">hybrid_ranker_params</code> gemäß dem <a href="https://milvus.io/docs/weighted-ranker.md">Milvus Reranking Guide</a> konfigurieren.</p>
<p>Nun wollen wir das RAG-System mit einer Beispielabfrage testen:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Query</span>
query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;hybrid&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
answer = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(answer), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned several important lessons at Viaweb. These included the importance of
understanding growth rate as the ultimate test of a startup, the impact of hiring too many people,
the challenges of being at the mercy of investors, and the relief experienced when Yahoo bought the
company. Additionally, the author learned about the significance of user feedback, the value of
building stores for users, and the realization that growth rate is crucial for the long-term success
of a startup.
</code></pre>
<p>Dieser hybride Ansatz gewährleistet genauere, kontextbezogene Antworten in einem RAG-System, indem er sowohl die semantische als auch die schlagwortbasierte Suche nutzt.</p>
