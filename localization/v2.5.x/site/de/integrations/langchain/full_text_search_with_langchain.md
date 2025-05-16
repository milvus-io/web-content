---
id: full_text_search_with_langchain.md
summary: >-
  Dieses Tutorial zeigt Ihnen, wie Sie LangChain und Milvus verwenden, um eine
  Volltextsuche in Ihrer Anwendung zu implementieren.
title: Verwendung der Volltextsuche mit LangChain und Milvus
---
<h1 id="Using-Full-Text-Search-with-LangChain-and-Milvus" class="common-anchor-header">Verwendung der Volltextsuche mit LangChain und Milvus<button data-href="#Using-Full-Text-Search-with-LangChain-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/langchain/full_text_search_with_langchain.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/langchain/full_text_search_with_langchain.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p>Die<a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">Volltextsuche</a> ist eine traditionelle Methode zum Auffinden von Dokumenten durch die Suche nach bestimmten Schlüsselwörtern oder Phrasen im Text. Sie ordnet die Ergebnisse auf der Grundlage von Relevanzwerten ein, die aus Faktoren wie der Begriffshäufigkeit berechnet werden. Während die semantische Suche besser in der Lage ist, die Bedeutung und den Kontext zu verstehen, zeichnet sich die Volltextsuche durch einen präzisen Abgleich von Schlüsselwörtern aus, was sie zu einer nützlichen Ergänzung der semantischen Suche macht. Der BM25-Algorithmus wird häufig für das Ranking in der Volltextsuche verwendet und spielt eine Schlüsselrolle bei der Retrieval-Augmented Generation (RAG).</p>
<p><a href="https://milvus.io/blog/introduce-milvus-2-5-full-text-search-powerful-metadata-filtering-and-more.md">Milvus 2.5</a> führt native Volltextsuchfunktionen unter Verwendung von BM25 ein. Dieser Ansatz wandelt Text in spärliche Vektoren um, die BM25-Scores darstellen. Sie können einfach den Rohtext eingeben und Milvus generiert und speichert die Sparse-Vektoren automatisch, ohne dass eine manuelle Sparse-Einbettung erforderlich ist.</p>
<p>Die Integration von LangChain in Milvus hat diese Funktion ebenfalls eingeführt und vereinfacht den Prozess der Integration von Volltextsuche in RAG-Anwendungen. Durch die Kombination von Volltextsuche und semantischer Suche mit dichten Vektoren können Sie einen hybriden Ansatz erreichen, der sowohl den semantischen Kontext aus dichten Einbettungen als auch die präzise Schlüsselwortrelevanz aus dem Wortabgleich nutzt. Diese Integration verbessert die Genauigkeit, Relevanz und Benutzerfreundlichkeit von Suchsystemen.</p>
<p>Dieses Tutorial zeigt, wie Sie LangChain und Milvus nutzen können, um eine Volltextsuche in Ihrer Anwendung zu implementieren.</p>
<div class="alert note">
<ul>
<li>Die Volltextsuche ist derzeit in Milvus Standalone, Milvus Distributed und Zilliz Cloud verfügbar, obwohl sie in Milvus Lite noch nicht unterstützt wird (diese Funktion ist für eine zukünftige Implementierung geplant). Wenden Sie sich für weitere Informationen an support@zilliz.com.</li>
<li>Bevor Sie mit diesem Tutorial fortfahren, stellen Sie sicher, dass Sie ein grundlegendes Verständnis der <a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">Volltextsuche</a> und der <a href="https://milvus.io/docs/basic_usage_langchain.md">grundlegenden Nutzung</a> der LangChain Milvus Integration haben.</li>
</ul>
</div>
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
    </button></h2><p>Vergewissern Sie sich, dass Sie die folgenden Abhängigkeiten installiert haben, bevor Sie dieses Notizbuch ausführen:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade --quiet  langchain langchain-core langchain-community langchain-text-splitters langchain-milvus langchain-openai bs4 <span class="hljs-comment">#langchain-voyageai</span></span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Wenn Sie Google Colab verwenden, müssen Sie möglicherweise <strong>die Runtime neu starten</strong>, um die soeben installierten Abhängigkeiten zu aktivieren (klicken Sie auf das Menü "Runtime" am oberen Rand des Bildschirms und wählen Sie "Restart session" aus dem Dropdown-Menü).</p>
</div>
<p>Wir werden die Modelle von OpenAI verwenden. Sie sollten die Umgebungsvariablen <code translate="no">OPENAI_API_KEY</code> von <a href="https://platform.openai.com/docs/quickstart">OpenAI</a> vorbereiten.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Geben Sie Ihren Milvus-Server <code translate="no">URI</code> (und optional die <code translate="no">TOKEN</code>) an. Wie Sie den Milvus-Server installieren und starten, erfahren Sie in dieser <a href="https://milvus.io/docs/install_standalone-docker-compose.md">Anleitung</a>.</p>
<pre><code translate="no" class="language-python">URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-comment"># TOKEN = ...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Bereiten Sie einige Beispieldokumente vor:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_core.documents <span class="hljs-keyword">import</span> Document

docs = [
    Document(page_content=<span class="hljs-string">&quot;I like this apple&quot;</span>, metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;fruit&quot;</span>}),
    Document(page_content=<span class="hljs-string">&quot;I like swimming&quot;</span>, metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;sport&quot;</span>}),
    Document(page_content=<span class="hljs-string">&quot;I like dogs&quot;</span>, metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;pets&quot;</span>}),
]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Initialization-with-BM25-Function" class="common-anchor-header">Initialisierung mit BM25 Funktion<button data-href="#Initialization-with-BM25-Function" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Hybrid-Search" class="common-anchor-header">Hybride Suche</h3><p>Für die Volltextsuche akzeptiert Milvus VectorStore einen <code translate="no">builtin_function</code> Parameter. Über diesen Parameter können Sie eine Instanz der <code translate="no">BM25BuiltInFunction</code> übergeben. Dies unterscheidet sich von der semantischen Suche, bei der normalerweise dichte Einbettungen an die <code translate="no">VectorStore</code> übergeben werden,</p>
<p>Hier ist ein einfaches Beispiel für eine hybride Suche in Milvus mit OpenAI dense embedding für die semantische Suche und BM25 für die Volltextsuche:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_milvus <span class="hljs-keyword">import</span> Milvus, BM25BuiltInFunction
<span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> OpenAIEmbeddings


vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=OpenAIEmbeddings(),
    builtin_function=BM25BuiltInFunction(),
    <span class="hljs-comment"># `dense` is for OpenAI embeddings, `sparse` is the output field of BM25 function</span>
    vector_field=[<span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    drop_old=<span class="hljs-literal">False</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Im obigen Code definieren wir eine Instanz von <code translate="no">BM25BuiltInFunction</code> und übergeben sie an das <code translate="no">Milvus</code> Objekt. <code translate="no">BM25BuiltInFunction</code> ist eine leichtgewichtige Wrapper-Klasse für <a href="https://milvus.io/docs/manage-collections.md#Function"><code translate="no">Function</code></a> in Milvus.</p>
<p>Sie können die Eingabe- und Ausgabefelder für diese Funktion in den Parametern von <code translate="no">BM25BuiltInFunction</code> angeben:</p>
<ul>
<li><code translate="no">input_field_names</code> (str): Der Name des Eingabefeldes, Standard ist <code translate="no">text</code>. Er gibt an, welches Feld diese Funktion als Eingabe liest.</li>
<li><code translate="no">output_field_names</code> (str): Der Name des Ausgabefeldes, Standardwert ist <code translate="no">sparse</code>. Er gibt an, in welches Feld diese Funktion das berechnete Ergebnis ausgibt.</li>
</ul>
<p>Beachten Sie, dass wir in den oben erwähnten Initialisierungsparametern von Milvus auch <code translate="no">vector_field=[&quot;dense&quot;, &quot;sparse&quot;]</code> angeben. Da das Feld <code translate="no">sparse</code> als das durch <code translate="no">BM25BuiltInFunction</code> definierte Ausgabefeld genommen wird, wird das andere Feld <code translate="no">dense</code> automatisch dem Ausgabefeld von OpenAIEmbeddings zugewiesen.</p>
<p>In der Praxis, insbesondere bei der Kombination mehrerer Einbettungen oder Funktionen, empfehlen wir, die Eingabe- und Ausgabefelder für jede Funktion explizit anzugeben, um Mehrdeutigkeiten zu vermeiden.</p>
<p>Im folgenden Beispiel geben wir die Eingabe- und Ausgabefelder von <code translate="no">BM25BuiltInFunction</code> explizit an, so dass klar ist, für welches Feld die eingebaute Funktion bestimmt ist.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># from langchain_voyageai import VoyageAIEmbeddings</span>

embedding1 = OpenAIEmbeddings(model=<span class="hljs-string">&quot;text-embedding-ada-002&quot;</span>)
embedding2 = OpenAIEmbeddings(model=<span class="hljs-string">&quot;text-embedding-3-large&quot;</span>)
<span class="hljs-comment"># embedding2 = VoyageAIEmbeddings(model=&quot;voyage-3&quot;)  # You can also use embedding from other embedding model providers, e.g VoyageAIEmbeddings</span>


vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=[embedding1, embedding2],
    builtin_function=BM25BuiltInFunction(
        input_field_names=<span class="hljs-string">&quot;text&quot;</span>, output_field_names=<span class="hljs-string">&quot;sparse&quot;</span>
    ),
    text_field=<span class="hljs-string">&quot;text&quot;</span>,  <span class="hljs-comment"># `text` is the input field name of BM25BuiltInFunction</span>
    <span class="hljs-comment"># `sparse` is the output field name of BM25BuiltInFunction, and `dense1` and `dense2` are the output field names of embedding1 and embedding2</span>
    vector_field=[<span class="hljs-string">&quot;dense1&quot;</span>, <span class="hljs-string">&quot;dense2&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    drop_old=<span class="hljs-literal">False</span>,
)

vectorstore.vector_fields
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">['dense1', 'dense2', 'sparse']
</code></pre>
<p>In diesem Beispiel haben wir drei Vektorfelder. Davon wird <code translate="no">sparse</code> als Ausgabefeld für <code translate="no">BM25BuiltInFunction</code> verwendet, während die beiden anderen, <code translate="no">dense1</code> und <code translate="no">dense2</code>, automatisch als Ausgabefelder für die beiden <code translate="no">OpenAIEmbeddings</code> -Modelle zugewiesen werden (basierend auf der Reihenfolge).</p>
<p>Auf diese Weise können Sie mehrere Vektorfelder definieren und ihnen verschiedene Kombinationen von Einbettungen oder Funktionen zuweisen, um eine hybride Suche zu implementieren.</p>
<p>Bei der Durchführung der hybriden Suche müssen wir nur den Abfragetext übergeben und optional die Parameter topK und reranker setzen. Die Instanz <code translate="no">vectorstore</code> verarbeitet automatisch die Vektoreinbettungen und integrierten Funktionen und verwendet schließlich einen Reranker, um die Ergebnisse zu verfeinern. Die zugrundeliegenden Implementierungsdetails des Suchprozesses sind für den Benutzer nicht sichtbar.</p>
<pre><code translate="no" class="language-python">vectorstore.similarity_search(
    <span class="hljs-string">&quot;Do I like apples?&quot;</span>, k=<span class="hljs-number">1</span>
)  <span class="hljs-comment"># , ranker_type=&quot;weighted&quot;, ranker_params={&quot;weights&quot;:[0.3, 0.3, 0.4]})</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[Document(metadata={'category': 'fruit', 'pk': 454646931479251897}, page_content='I like this apple')]
</code></pre>
<p>Weitere Informationen zur hybriden Suche finden Sie in der <a href="https://milvus.io/docs/multi-vector-search.md#Hybrid-Search">Einführung zur hybriden Suche</a> und in diesem <a href="https://milvus.io/docs/milvus_hybrid_search_retriever.md">LangChain Milvus Tutorial zur hybriden Suche</a>.</p>
<h3 id="BM25-search-without-embedding" class="common-anchor-header">BM25-Suche ohne Einbettung</h3><p>Wenn Sie nur eine Volltextsuche mit der BM25-Funktion durchführen möchten, ohne eine auf Einbettung basierende semantische Suche zu verwenden, können Sie den Einbettungsparameter auf <code translate="no">None</code> setzen und nur die <code translate="no">builtin_function</code> als BM25-Funktionsinstanz angeben. Das Vektorfeld hat nur ein "spärliches" Feld. Ein Beispiel:</p>
<pre><code translate="no" class="language-python">vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=<span class="hljs-literal">None</span>,
    builtin_function=BM25BuiltInFunction(
        output_field_names=<span class="hljs-string">&quot;sparse&quot;</span>,
    ),
    vector_field=<span class="hljs-string">&quot;sparse&quot;</span>,
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    drop_old=<span class="hljs-literal">False</span>,
)

vectorstore.vector_fields
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">['sparse']
</code></pre>
<h2 id="Customize-analyzer" class="common-anchor-header">Analyzer anpassen<button data-href="#Customize-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>Analyzer sind für die Volltextsuche unerlässlich, da sie den Satz in Token zerlegen und lexikalische Analysen wie Stemming und Stoppwortentfernung durchführen. Analyzer sind in der Regel sprachspezifisch. In <a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">diesem Leitfaden</a> erfahren Sie mehr über Analysatoren in Milvus.</p>
<p>Milvus unterstützt zwei Arten von Analysatoren: <strong>Eingebaute Analyzer</strong> und <strong>benutzerdefinierte Analyzer</strong>. Standardmäßig verwendet <code translate="no">BM25BuiltInFunction</code> den <a href="https://milvus.io/docs/standard-analyzer.md">standardmäßig eingebauten Analysator</a>, der der einfachste Analysator ist, der den Text mit Interpunktion tokenisiert.</p>
<p>Wenn Sie einen anderen Analyzer verwenden oder den Analyzer anpassen möchten, können Sie den Parameter <code translate="no">analyzer_params</code> in der Initialisierung von <code translate="no">BM25BuiltInFunction</code> übergeben.</p>
<pre><code translate="no" class="language-python">analyzer_params_custom = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,  <span class="hljs-comment"># Built-in filter</span>
        {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>, <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">40</span>},  <span class="hljs-comment"># Custom filter</span>
        {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>]},  <span class="hljs-comment"># Custom filter</span>
    ],
}


vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=OpenAIEmbeddings(),
    builtin_function=BM25BuiltInFunction(
        output_field_names=<span class="hljs-string">&quot;sparse&quot;</span>,
        enable_match=<span class="hljs-literal">True</span>,
        analyzer_params=analyzer_params_custom,
    ),
    vector_field=[<span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    drop_old=<span class="hljs-literal">False</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Wir können einen Blick auf das Schema der Milvus-Sammlung werfen und sicherstellen, dass der angepasste Analyzer korrekt eingerichtet ist.</p>
<pre><code translate="no" class="language-python">vectorstore.col.schema
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'auto_id': True, 'description': '', 'fields': [{'name': 'text', 'description': '', 'type': &lt;DataType.VARCHAR: 21&gt;, 'params': {'max_length': 65535, 'enable_match': True, 'enable_analyzer': True, 'analyzer_params': {'tokenizer': 'standard', 'filter': ['lowercase', {'type': 'length', 'max': 40}, {'type': 'stop', 'stop_words': ['of', 'to']}]}}}, {'name': 'pk', 'description': '', 'type': &lt;DataType.INT64: 5&gt;, 'is_primary': True, 'auto_id': True}, {'name': 'dense', 'description': '', 'type': &lt;DataType.FLOAT_VECTOR: 101&gt;, 'params': {'dim': 1536}}, {'name': 'sparse', 'description': '', 'type': &lt;DataType.SPARSE_FLOAT_VECTOR: 104&gt;, 'is_function_output': True}, {'name': 'category', 'description': '', 'type': &lt;DataType.VARCHAR: 21&gt;, 'params': {'max_length': 65535}}], 'enable_dynamic_field': False, 'functions': [{'name': 'bm25_function_de368e79', 'description': '', 'type': &lt;FunctionType.BM25: 1&gt;, 'input_field_names': ['text'], 'output_field_names': ['sparse'], 'params': {}}]}
</code></pre>
<p>Weitere Details zu den Konzepten, z. B. <code translate="no">analyzer</code>, <code translate="no">tokenizer</code>, <code translate="no">filter</code>, <code translate="no">enable_match</code>, <code translate="no">analyzer_params</code>, finden Sie in der <a href="https://milvus.io/docs/analyzer-overview.md">Analyzer-Dokumentation</a>.</p>
<h2 id="Using-Hybrid-Search-and-Reranking-in-RAG" class="common-anchor-header">Hybride Suche und Reranking in RAG nutzen<button data-href="#Using-Hybrid-Search-and-Reranking-in-RAG" class="anchor-icon" translate="no">
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
    </button></h2><p>Wir haben gelernt, wie man die BM25-Basisfunktion in LangChain und Milvus verwendet. Nun wollen wir eine optimierte RAG-Implementierung mit hybrider Suche und Reranking vorstellen.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/hybrid_and_rerank.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Dieses Diagramm zeigt den Hybrid Retrieve &amp; Reranking Prozess, der BM25 für das Keyword Matching und die Vektorsuche für das semantische Retrieval kombiniert. Die Ergebnisse beider Methoden werden zusammengeführt, neu eingestuft und an einen LLM weitergeleitet, um die endgültige Antwort zu generieren.</p>
<p>Die hybride Suche sorgt für ein Gleichgewicht zwischen Präzision und semantischem Verständnis und verbessert die Genauigkeit und Robustheit bei verschiedenen Abfragen. Sie ruft Kandidaten mit der BM25-Volltextsuche und der Vektorsuche ab und gewährleistet eine semantische, kontextbewusste und genaue Suche.</p>
<p>Lassen Sie uns mit einem Beispiel beginnen.</p>
<h3 id="Prepare-the-data" class="common-anchor-header">Vorbereiten der Daten</h3><p>Wir verwenden den Langchain WebBaseLoader, um Dokumente aus Webquellen zu laden und sie mit dem RecursiveCharacterTextSplitter in Stücke zu zerlegen.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> bs4
<span class="hljs-keyword">from</span> langchain_community.document_loaders <span class="hljs-keyword">import</span> WebBaseLoader
<span class="hljs-keyword">from</span> langchain_text_splitters <span class="hljs-keyword">import</span> RecursiveCharacterTextSplitter

<span class="hljs-comment"># Create a WebBaseLoader instance to load documents from web sources</span>
loader = WebBaseLoader(
    web_paths=(
        <span class="hljs-string">&quot;https://lilianweng.github.io/posts/2023-06-23-agent/&quot;</span>,
        <span class="hljs-string">&quot;https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/&quot;</span>,
    ),
    bs_kwargs=<span class="hljs-built_in">dict</span>(
        parse_only=bs4.SoupStrainer(
            class_=(<span class="hljs-string">&quot;post-content&quot;</span>, <span class="hljs-string">&quot;post-title&quot;</span>, <span class="hljs-string">&quot;post-header&quot;</span>)
        )
    ),
)
<span class="hljs-comment"># Load documents from web sources using the loader</span>
documents = loader.load()
<span class="hljs-comment"># Initialize a RecursiveCharacterTextSplitter for splitting text into chunks</span>
text_splitter = RecursiveCharacterTextSplitter(chunk_size=<span class="hljs-number">2000</span>, chunk_overlap=<span class="hljs-number">200</span>)

<span class="hljs-comment"># Split the documents into chunks using the text_splitter</span>
docs = text_splitter.split_documents(documents)

<span class="hljs-comment"># Let&#x27;s take a look at the first document</span>
docs[<span class="hljs-number">1</span>]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Document(metadata={'source': 'https://lilianweng.github.io/posts/2023-06-23-agent/'}, page_content='Fig. 1. Overview of a LLM-powered autonomous agent system.\nComponent One: Planning#\nA complicated task usually involves many steps. An agent needs to know what they are and plan ahead.\nTask Decomposition#\nChain of thought (CoT; Wei et al. 2022) has become a standard prompting technique for enhancing model performance on complex tasks. The model is instructed to “think step by step” to utilize more test-time computation to decompose hard tasks into smaller and simpler steps. CoT transforms big tasks into multiple manageable tasks and shed lights into an interpretation of the model’s thinking process.\nTree of Thoughts (Yao et al. 2023) extends CoT by exploring multiple reasoning possibilities at each step. It first decomposes the problem into multiple thought steps and generates multiple thoughts per step, creating a tree structure. The search process can be BFS (breadth-first search) or DFS (depth-first search) with each state evaluated by a classifier (via a prompt) or majority vote.\nTask decomposition can be done (1) by LLM with simple prompting like &quot;Steps for XYZ.\\n1.&quot;, &quot;What are the subgoals for achieving XYZ?&quot;, (2) by using task-specific instructions; e.g. &quot;Write a story outline.&quot; for writing a novel, or (3) with human inputs.\nAnother quite distinct approach, LLM+P (Liu et al. 2023), involves relying on an external classical planner to do long-horizon planning. This approach utilizes the Planning Domain Definition Language (PDDL) as an intermediate interface to describe the planning problem. In this process, LLM (1) translates the problem into “Problem PDDL”, then (2) requests a classical planner to generate a PDDL plan based on an existing “Domain PDDL”, and finally (3) translates the PDDL plan back into natural language. Essentially, the planning step is outsourced to an external tool, assuming the availability of domain-specific PDDL and a suitable planner which is common in certain robotic setups but not in many other domains.\nSelf-Reflection#')
</code></pre>
<h3 id="Load-the-document-into-Milvus-vector-store" class="common-anchor-header">Laden des Dokuments in den Milvus-Vektorspeicher</h3><p>Wie in der Einleitung oben beschrieben, initialisieren und laden wir die vorbereiteten Dokumente in den Milvus-Vektorspeicher, der zwei Vektorfelder enthält: <code translate="no">dense</code> für die OpenAI-Einbettung und <code translate="no">sparse</code> für die BM25-Funktion.</p>
<pre><code translate="no" class="language-python">vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=OpenAIEmbeddings(),
    builtin_function=BM25BuiltInFunction(),
    vector_field=[<span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    drop_old=<span class="hljs-literal">False</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Build-RAG-chain" class="common-anchor-header">RAG-Kette aufbauen</h3><p>Wir bereiten die LLM-Instanz und die Eingabeaufforderung vor und verbinden sie dann mit Hilfe der LangChain Expression Language zu einer RAG-Pipeline.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_core.runnables <span class="hljs-keyword">import</span> RunnablePassthrough
<span class="hljs-keyword">from</span> langchain_core.prompts <span class="hljs-keyword">import</span> PromptTemplate
<span class="hljs-keyword">from</span> langchain_core.output_parsers <span class="hljs-keyword">import</span> StrOutputParser
<span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> ChatOpenAI

<span class="hljs-comment"># Initialize the OpenAI language model for response generation</span>
llm = ChatOpenAI(model_name=<span class="hljs-string">&quot;gpt-4o&quot;</span>, temperature=<span class="hljs-number">0</span>)

<span class="hljs-comment"># Define the prompt template for generating AI responses</span>
PROMPT_TEMPLATE = <span class="hljs-string">&quot;&quot;&quot;
Human: You are an AI assistant, and provides answers to questions by using fact based and statistical information when possible.
Use the following pieces of information to provide a concise answer to the question enclosed in &lt;question&gt; tags.
If you don&#x27;t know the answer, just say that you don&#x27;t know, don&#x27;t try to make up an answer.
&lt;context&gt;
{context}
&lt;/context&gt;

&lt;question&gt;
{question}
&lt;/question&gt;

The response should be specific and use statistics or numbers when possible.

Assistant:&quot;&quot;&quot;</span>

<span class="hljs-comment"># Create a PromptTemplate instance with the defined template and input variables</span>
prompt = PromptTemplate(
    template=PROMPT_TEMPLATE, input_variables=[<span class="hljs-string">&quot;context&quot;</span>, <span class="hljs-string">&quot;question&quot;</span>]
)
<span class="hljs-comment"># Convert the vector store to a retriever</span>
retriever = vectorstore.as_retriever()


<span class="hljs-comment"># Define a function to format the retrieved documents</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">format_docs</span>(<span class="hljs-params">docs</span>):
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;\n\n&quot;</span>.join(doc.page_content <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs)
<button class="copy-code-btn"></button></code></pre>
<p>Verwenden Sie die LCEL (LangChain Expression Language), um eine RAG-Kette zu erstellen.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define the RAG (Retrieval-Augmented Generation) chain for AI response generation</span>
rag_chain = (
    {<span class="hljs-string">&quot;context&quot;</span>: retriever | format_docs, <span class="hljs-string">&quot;question&quot;</span>: RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

<span class="hljs-comment"># rag_chain.get_graph().print_ascii()</span>
<button class="copy-code-btn"></button></code></pre>
<p>Rufen Sie die RAG-Kette mit einer bestimmten Frage auf und rufen Sie die Antwort ab</p>
<pre><code translate="no" class="language-python">query = <span class="hljs-string">&quot;What is PAL and PoT?&quot;</span>
res = rag_chain.invoke(query)
res
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'PAL (Program-aided Language models) and PoT (Program of Thoughts prompting) are approaches that involve using language models to generate programming language statements to solve natural language reasoning problems. This method offloads the solution step to a runtime, such as a Python interpreter, allowing for complex computation and reasoning to be handled externally. PAL and PoT rely on language models with strong coding skills to effectively generate and execute these programming statements.'
</code></pre>
<p>Herzlichen Glückwunsch! Sie haben eine hybride (dichter Vektor + dünn besetzte bm25-Funktion) RAG-Kette auf der Grundlage von Milvus und LangChain erstellt.</p>
