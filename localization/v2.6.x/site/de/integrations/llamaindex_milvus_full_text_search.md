---
id: llamaindex_milvus_full_text_search.md
title: Volltextsuche mit LlamaIndex und Milvus
related_key: LlamaIndex
summary: >-
  In diesem Tutorial erfahren Sie, wie Sie mit LlamaIndex und Milvus ein
  RAG-System aufbauen, das Volltextsuche und hybride Suche nutzt. Wir beginnen
  mit der Implementierung der reinen Volltextsuche und erweitern diese
  anschließend durch die Integration der semantischen Suche, um umfassendere
  Ergebnisse zu erzielen.
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_full_text_search.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_full_text_search.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Using-Full-Text-Search-with-LlamaIndex-and-Milvus" class="common-anchor-header">Volltextsuche mit LlamaIndex und Milvus<button data-href="#Using-Full-Text-Search-with-LlamaIndex-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>Die Volltextsuche</strong> nutzt den exakten Abgleich von Schlüsselwörtern und greift dabei häufig auf Algorithmen wie BM25 zurück, um Dokumente nach ihrer Relevanz zu ordnen. In <strong>RAG</strong> -Systemen <strong>(Retrieval-Augmented Generation)</strong> werden mit dieser Methode relevante Textstellen abgerufen, um KI-generierte Antworten zu verbessern.</p>
<p><strong>Die semantische Suche</strong> hingegen interpretiert den Kontext, um umfassendere Ergebnisse zu liefern. Die Kombination beider Ansätze führt zu einer <strong>hybriden Suche</strong>, die die Informationsgewinnung verbessert – insbesondere in Fällen, in denen eine einzelne Methode nicht ausreicht.</p>
<p>Mit dem „Sparse-BM25“-Ansatz <a href="https://milvus.io/blog/introduce-milvus-2-5-full-text-search-powerful-metadata-filtering-and-more.md">von Milvus 2.5</a> wird Rohtext automatisch in spärliche Vektoren umgewandelt. Dadurch entfällt die manuelle Erstellung spärlicher Einbettungen und es wird eine hybride Suchstrategie ermöglicht, die semantisches Verständnis und Stichwortrelevanz in Einklang bringt.</p>
<p>In diesem Tutorial lernen Sie, wie Sie mit LlamaIndex und Milvus ein RAG-System unter Verwendung von Volltextsuche und hybrider Suche aufbauen. Wir beginnen mit der Implementierung der reinen Volltextsuche und erweitern diese anschließend durch die Integration der semantischen Suche, um umfassendere Ergebnisse zu erzielen.</p>
<blockquote>
<p>Bevor Sie mit diesem Tutorial fortfahren, sollten Sie sich mit <a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">der Volltextsuche</a> und den <a href="https://milvus.io/docs/integrate_with_llamaindex.md">Grundlagen der Verwendung von Milvus in LlamaIndex</a> vertraut machen.</p>
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
    </button></h2><p><strong>Installieren Sie die Abhängigkeiten</strong></p>
<p>Stellen Sie vor dem Start sicher, dass die folgenden Abhängigkeiten installiert sind:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-vector-stores-milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-embeddings-openai</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-llms-openai</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<blockquote>
<p>Wenn Sie Google Colab verwenden, müssen Sie möglicherweise <strong>die Laufzeitumgebung neu starten</strong> (Navigieren Sie zum Menü „Runtime“ oben in der Benutzeroberfläche und wählen Sie im Dropdown-Menü „Restart session“ aus.)</p>
</blockquote>
</div>
<p><strong>Konfigurieren Sie die Konten</strong></p>
<p>In diesem Tutorial wird OpenAI für Text-Embeddings und die Generierung von Antworten verwendet. Sie müssen den <a href="https://platform.openai.com/api-keys">OpenAI-API-Schlüssel</a> bereitstellen.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> openai

openai.api_key = <span class="hljs-string">&quot;sk-&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Um den Milvus-Vektorspeicher zu nutzen, geben Sie Ihre Milvus-Server- <code translate="no">URI</code> an (und optional die <code translate="no">TOKEN</code>). Um einen Milvus-Server zu starten, können Sie diesen gemäß der <a href="https://milvus.io/docs/install-overview.md">Milvus-Installationsanleitung</a> einrichten oder einfach <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">Zilliz Cloud</a> kostenlos ausprobieren.</p>
<blockquote>
<p>Die Volltextsuche wird derzeit in Milvus Standalone, Milvus Distributed und Zilliz Cloud unterstützt, jedoch noch nicht in Milvus Lite (die Implementierung ist für die Zukunft geplant). Weitere Informationen erhalten Sie unter support@zilliz.com.</p>
</blockquote>
<pre><code translate="no" class="language-python">URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-comment"># TOKEN = &quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Beispieldaten herunterladen</strong></p>
<p>Führen Sie die folgenden Befehle aus, um Beispieldokumente in das Verzeichnis „data/paul_graham“ herunterzuladen:</p>
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
    </button></h2><p>Die Integration der Volltextsuche in ein RAG-System schafft ein Gleichgewicht zwischen semantischer Suche und präzisem, vorhersehbarem Abruf anhand von Schlüsselwörtern. Sie können sich auch dafür entscheiden, ausschließlich die Volltextsuche zu nutzen; es wird jedoch empfohlen, die Volltextsuche mit der semantischen Suche zu kombinieren, um bessere Suchergebnisse zu erzielen. Hier zeigen wir zu Demonstrationszwecken sowohl die reine Volltextsuche als auch die hybride Suche.</p>
<p>Verwenden Sie zunächst den Befehl „ <code translate="no">SimpleDirectoryReaderLoad</code> “, um den Aufsatz „What I Worked On“ von Paul Graham zu laden:</p>
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
<h3 id="Full-Text-Search-with-BM25" class="common-anchor-header">Volltextsuche mit BM25<button data-href="#Full-Text-Search-with-BM25" class="anchor-icon" translate="no">
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
    </button></h3><p>Der „ <code translate="no">MilvusVectorStore</code> “ von LlamaIndex unterstützt die Volltextsuche und ermöglicht so eine effiziente, schlüsselwortbasierte Suche. Durch die Verwendung einer integrierten Funktion wie „ <code translate="no">sparse_embedding_function</code> “ wird die BM25-Bewertung angewendet, um die Suchergebnisse zu ordnen.</p>
<p>In diesem Abschnitt zeigen wir, wie man ein RAG-System mit BM25 für die Volltextsuche implementiert.</p>
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
<p>Der obige Code fügt Beispieldokumente in Milvus ein und erstellt einen Index, um die BM25-Rangfolge für die Volltextsuche zu ermöglichen. Dabei wird „Dense Embedding“ deaktiviert und „ <code translate="no">BM25BuiltInFunction</code> “ mit den Standardparametern verwendet.</p>
<p>Sie können die Eingabe- und Ausgabefelder in den Parametern von „ <code translate="no">BM25BuiltInFunction</code> “ festlegen:</p>
<ul>
<li><code translate="no">input_field_names (str)</code>: Das Eingabetextfeld (Standard: „text“). Es gibt an, auf welches Textfeld der BM25-Algorithmus angewendet wird. Ändern Sie diesen Wert, wenn Sie eine eigene Sammlung mit einem anderen Textfeldnamen verwenden.</li>
<li><code translate="no">output_field_names (str)</code>: Das Feld, in dem die Ergebnisse dieser BM25-Funktion gespeichert werden (Standard: „sparse_embedding“).</li>
</ul>
<p>Sobald der Vektorspeicher eingerichtet ist, können Sie Volltextsuchen mit Milvus im Abfragemodus „sparse“ oder „text_search“ durchführen:</p>
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
<h4 id="Customize-text-analyzer" class="common-anchor-header">Textanalysator anpassen</h4><p>Analysatoren spielen eine entscheidende Rolle bei der Volltextsuche, indem sie Sätze in Token zerlegen und lexikalische Verarbeitungsschritte wie Stemming und das Entfernen von Stoppwörtern durchführen. Sie sind in der Regel sprachspezifisch. Weitere Details finden Sie im <a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">Milvus-Analysator-Handbuch</a>.</p>
<p>Milvus unterstützt zwei Arten von Analysatoren: <strong>integrierte Analysatoren</strong> und <strong>benutzerdefinierte Analysatoren</strong>. Standardmäßig verwendet der „ <code translate="no">BM25BuiltInFunction</code> “ den integrierten Standardanalysator, der Text anhand von Satzzeichen in Token zerlegt.</p>
<p>Um einen anderen Analysator zu verwenden oder den vorhandenen anzupassen, können Sie dem Argument „ <code translate="no">analyzer_params</code> “ einen Wert übergeben:</p>
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
<h3 id="Hybrid-Search-with-Reranker" class="common-anchor-header">Hybride Suche mit Reranker<button data-href="#Hybrid-Search-with-Reranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Ein hybrides Suchsystem kombiniert semantische Suche und Volltextsuche und optimiert so die Abrufleistung in einem RAG-System.</p>
<p>Im folgenden Beispiel wird OpenAI-Embedding für die semantische Suche und BM25 für die Volltextsuche verwendet:</p>
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
<li><code translate="no">embedding</code>: Dichte Einbettungen, die vom OpenAI-Einbettungsmodell für die semantische Suche generiert wurden.</li>
<li><code translate="no">sparse_embedding</code>: Sparse-Embeddings, die mit der BM25BuiltInFunction für die Volltextsuche berechnet wurden.</li>
</ul>
<p>Zusätzlich haben wir eine Reranking-Strategie unter Verwendung von „RRFRanker“ mit dessen Standardparametern angewendet. Um den Reranker anzupassen, können Sie „ <code translate="no">hybrid_ranker</code> “ und „ <code translate="no">hybrid_ranker_params</code> “ gemäß dem <a href="https://milvus.io/docs/weighted-ranker.md">Milvus-Reranking-Leitfaden</a> konfigurieren.</p>
<p>Testen wir nun das RAG-System mit einer Beispielabfrage:</p>
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
<p>Dieser hybride Ansatz gewährleistet genauere, kontextbezogene Antworten in einem RAG-System, indem sowohl die semantische als auch die schlagwortbasierte Suche genutzt werden.</p>
