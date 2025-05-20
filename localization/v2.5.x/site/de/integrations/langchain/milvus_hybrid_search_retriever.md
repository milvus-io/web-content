---
id: milvus_hybrid_search_retriever.md
summary: >-
  Dieses Notizbuch zeigt, wie Sie die Funktionen der Milvus-Vektordatenbank
  nutzen können.
title: Milvus Hybrid Search Retriever
---
<h1 id="Milvus-Hybrid-Search-Retriever" class="common-anchor-header">Milvus Hybrid Search Retriever<button data-href="#Milvus-Hybrid-Search-Retriever" class="anchor-icon" translate="no">
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
    </button></h1><p>Die hybride Suche kombiniert die Stärken verschiedener Suchparadigmen, um die Abrufgenauigkeit und Robustheit zu verbessern. Sie nutzt die Fähigkeiten sowohl der dichten Vektorsuche als auch der spärlichen Vektorsuche sowie Kombinationen mehrerer dichter Vektorsuchstrategien und gewährleistet so ein umfassendes und präzises Retrieval für verschiedene Abfragen.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/hybrid_and_rerank.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Dieses Diagramm veranschaulicht das häufigste Szenario der hybriden Suche, nämlich die dichte + spärliche hybride Suche. In diesem Fall werden die Kandidaten sowohl durch semantische Vektorähnlichkeit als auch durch präzisen Schlüsselwortabgleich abgerufen. Die Ergebnisse dieser Methoden werden zusammengeführt, neu eingestuft und an einen LLM weitergeleitet, um die endgültige Antwort zu generieren. Dieser Ansatz stellt ein Gleichgewicht zwischen Präzision und semantischem Verständnis her, was ihn für verschiedene Abfrageszenarien sehr effektiv macht.</p>
<p>Neben der Dense + Sparse-Hybridsuche können Hybridstrategien auch mehrere dichte Vektormodelle kombinieren. Ein dichtes Vektormodell könnte beispielsweise auf die Erfassung semantischer Nuancen spezialisiert sein, während ein anderes sich auf kontextuelle Einbettungen oder domänenspezifische Repräsentationen konzentriert. Durch die Zusammenführung der Ergebnisse dieser Modelle und deren Neueinstufung gewährleistet diese Art der hybriden Suche einen nuancierteren und kontextbewussten Abrufprozess.</p>
<p>Die LangChain-Milvus-Integration bietet einen flexiblen Weg, die hybride Suche zu implementieren. Sie unterstützt eine beliebige Anzahl von Vektorfeldern und beliebige benutzerdefinierte dichte oder spärliche Einbettungsmodelle, wodurch sich LangChain Milvus flexibel an verschiedene Nutzungsszenarien der hybriden Suche anpassen lässt und gleichzeitig mit anderen Fähigkeiten von LangChain kompatibel ist.</p>
<p>In diesem Tutorial beginnen wir mit dem am häufigsten vorkommenden dichten + spärlichen Fall und stellen dann eine beliebige Anzahl von allgemeinen hybriden Suchansätzen vor.</p>
<div class="alert note">
<p>Der <a href="https://api.python.langchain.com/en/latest/milvus/retrievers/langchain_milvus.retrievers.milvus_hybrid_search.MilvusCollectionHybridSearchRetriever.html">MilvusCollectionHybridSearchRetriever</a>, der eine weitere Implementierung der hybriden Suche mit Milvus und LangChain ist, <strong>wird demnächst veraltet sein</strong>. Bitte verwenden Sie den Ansatz in diesem Dokument, um die hybride Suche zu implementieren, da er flexibler und mit LangChain kompatibel ist.</p>
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
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade --quiet  langchain langchain-core langchain-community langchain-text-splitters langchain-milvus langchain-openai bs4 pymilvus[model] <span class="hljs-comment">#langchain-voyageai</span></span>
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
<p>Bereiten Sie einige Beispieldokumente vor, bei denen es sich um Zusammenfassungen fiktionaler Geschichten handelt, die nach Themen oder Genres geordnet sind.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_core.documents <span class="hljs-keyword">import</span> Document

docs = [
    Document(
        page_content=<span class="hljs-string">&quot;In &#x27;The Whispering Walls&#x27; by Ava Moreno, a young journalist named Sophia uncovers a decades-old conspiracy hidden within the crumbling walls of an ancient mansion, where the whispers of the past threaten to destroy her own sanity.&quot;</span>,
        metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;Mystery&quot;</span>},
    ),
    Document(
        page_content=<span class="hljs-string">&quot;In &#x27;The Last Refuge&#x27; by Ethan Blackwood, a group of survivors must band together to escape a post-apocalyptic wasteland, where the last remnants of humanity cling to life in a desperate bid for survival.&quot;</span>,
        metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;Post-Apocalyptic&quot;</span>},
    ),
    Document(
        page_content=<span class="hljs-string">&quot;In &#x27;The Memory Thief&#x27; by Lila Rose, a charismatic thief with the ability to steal and manipulate memories is hired by a mysterious client to pull off a daring heist, but soon finds themselves trapped in a web of deceit and betrayal.&quot;</span>,
        metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;Heist/Thriller&quot;</span>},
    ),
    Document(
        page_content=<span class="hljs-string">&quot;In &#x27;The City of Echoes&#x27; by Julian Saint Clair, a brilliant detective must navigate a labyrinthine metropolis where time is currency, and the rich can live forever, but at a terrible cost to the poor.&quot;</span>,
        metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;Science Fiction&quot;</span>},
    ),
    Document(
        page_content=<span class="hljs-string">&quot;In &#x27;The Starlight Serenade&#x27; by Ruby Flynn, a shy astronomer discovers a mysterious melody emanating from a distant star, which leads her on a journey to uncover the secrets of the universe and her own heart.&quot;</span>,
        metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;Science Fiction/Romance&quot;</span>},
    ),
    Document(
        page_content=<span class="hljs-string">&quot;In &#x27;The Shadow Weaver&#x27; by Piper Redding, a young orphan discovers she has the ability to weave powerful illusions, but soon finds herself at the center of a deadly game of cat and mouse between rival factions vying for control of the mystical arts.&quot;</span>,
        metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;Fantasy&quot;</span>},
    ),
    Document(
        page_content=<span class="hljs-string">&quot;In &#x27;The Lost Expedition&#x27; by Caspian Grey, a team of explorers ventures into the heart of the Amazon rainforest in search of a lost city, but soon finds themselves hunted by a ruthless treasure hunter and the treacherous jungle itself.&quot;</span>,
        metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;Adventure&quot;</span>},
    ),
    Document(
        page_content=<span class="hljs-string">&quot;In &#x27;The Clockwork Kingdom&#x27; by Augusta Wynter, a brilliant inventor discovers a hidden world of clockwork machines and ancient magic, where a rebellion is brewing against the tyrannical ruler of the land.&quot;</span>,
        metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;Steampunk/Fantasy&quot;</span>},
    ),
    Document(
        page_content=<span class="hljs-string">&quot;In &#x27;The Phantom Pilgrim&#x27; by Rowan Welles, a charismatic smuggler is hired by a mysterious organization to transport a valuable artifact across a war-torn continent, but soon finds themselves pursued by deadly assassins and rival factions.&quot;</span>,
        metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;Adventure/Thriller&quot;</span>},
    ),
    Document(
        page_content=<span class="hljs-string">&quot;In &#x27;The Dreamwalker&#x27;s Journey&#x27; by Lyra Snow, a young dreamwalker discovers she has the ability to enter people&#x27;s dreams, but soon finds herself trapped in a surreal world of nightmares and illusions, where the boundaries between reality and fantasy blur.&quot;</span>,
        metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;Fantasy&quot;</span>},
    ),
]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Dense-embedding-+-Sparse-embedding" class="common-anchor-header">Dichte Einbettung + Spärliche Einbettung<button data-href="#Dense-embedding-+-Sparse-embedding" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Option-1Recommended-dense-embedding-+-Milvus-BM25-built-in-function" class="common-anchor-header">Option 1 (empfohlen): dichte Einbettung + integrierte Funktion von Milvus BM25</h3><p>Verwenden Sie die dichte Einbettung + die integrierte Funktion von Milvus BM25, um die Instanz des hybriden Retrieval-Vektorspeichers zusammenzustellen.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_milvus <span class="hljs-keyword">import</span> Milvus, BM25BuiltInFunction
<span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> OpenAIEmbeddings


vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=OpenAIEmbeddings(),
    builtin_function=BM25BuiltInFunction(),  <span class="hljs-comment"># output_field_names=&quot;sparse&quot;),</span>
    vector_field=[<span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
    drop_old=<span class="hljs-literal">False</span>,
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>Wenn Sie <code translate="no">BM25BuiltInFunction</code> verwenden, beachten Sie bitte, dass die Volltextsuche in Milvus Standalone und Milvus Distributed verfügbar ist, aber nicht in Milvus Lite, obwohl sie auf der Roadmap für eine zukünftige Aufnahme steht. Sie wird demnächst auch in der Zilliz Cloud (vollständig verwaltetes Milvus) verfügbar sein. Bitte wenden Sie sich an <a href="mailto:support@zilliz.com">support@zilliz.com</a> für weitere Informationen.</li>
</ul>
</div>
<p>Im obigen Code definieren wir eine Instanz von <code translate="no">BM25BuiltInFunction</code> und übergeben sie an das <code translate="no">Milvus</code> Objekt. <code translate="no">BM25BuiltInFunction</code> ist eine leichtgewichtige Wrapper-Klasse für <a href="https://milvus.io/docs/manage-collections.md#Function"><code translate="no">Function</code></a> in Milvus. Wir können sie zusammen mit <code translate="no">OpenAIEmbeddings</code> verwenden, um eine Instanz des Milvus-Vektorspeichers mit dichter und spärlicher Hybrid-Suche zu initialisieren.</p>
<p><code translate="no">BM25BuiltInFunction</code> erfordert nicht, dass der Client einen Korpus oder ein Training übergibt, alles wird automatisch auf dem Milvus-Server verarbeitet, so dass sich die Benutzer nicht um Vokabular und Korpus kümmern müssen. Darüber hinaus können die Benutzer den <a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">Analyzer</a> auch anpassen, um die benutzerdefinierte Textverarbeitung im BM25 zu implementieren.</p>
<p>Weitere Informationen zu <code translate="no">BM25BuiltInFunction</code> finden Sie in der <a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">Volltextsuche</a> und der <a href="https://milvus.io/docs/full_text_search_with_langchain.md">Verwendung der Volltextsuche mit LangChain und Milvus</a>.</p>
<h3 id="Option-2-Use-dense-and-customized-LangChain-sparse-embedding" class="common-anchor-header">Option 2: Dense und angepasste LangChain Sparse Embedding verwenden</h3><p>Sie können die Klasse <code translate="no">BaseSparseEmbedding</code> von <code translate="no">langchain_milvus.utils.sparse</code> erben und die Methoden <code translate="no">embed_query</code> und <code translate="no">embed_documents</code> implementieren, um den Sparse-Embedding-Prozess anzupassen. So können Sie jede Sparse Embedding-Methode anpassen, die auf Termhäufigkeitsstatistiken (z. B. <a href="https://milvus.io/docs/embed-with-bm25.md#BM25">BM25</a>) oder neuronalen Netzen (z. B. <a href="https://milvus.io/docs/embed-with-splade.md#SPLADE">SPADE</a>) basiert.</p>
<p>Hier ist ein Beispiel:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">Dict</span>, <span class="hljs-type">List</span>
<span class="hljs-keyword">from</span> langchain_milvus.utils.sparse <span class="hljs-keyword">import</span> BaseSparseEmbedding


<span class="hljs-keyword">class</span> <span class="hljs-title class_">MyCustomEmbedding</span>(<span class="hljs-title class_ inherited__">BaseSparseEmbedding</span>):  <span class="hljs-comment"># inherit from BaseSparseEmbedding</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, model_path</span>): ...  <span class="hljs-comment"># code to init or load model</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">embed_query</span>(<span class="hljs-params">self, query: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-type">Dict</span>[<span class="hljs-built_in">int</span>, <span class="hljs-built_in">float</span>]:
        ...  <span class="hljs-comment"># code to embed query</span>
        <span class="hljs-keyword">return</span> {  <span class="hljs-comment"># fake embedding result</span>
            <span class="hljs-number">1</span>: <span class="hljs-number">0.1</span>,
            <span class="hljs-number">2</span>: <span class="hljs-number">0.2</span>,
            <span class="hljs-number">3</span>: <span class="hljs-number">0.3</span>,
            <span class="hljs-comment"># ...</span>
        }

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">embed_documents</span>(<span class="hljs-params">self, texts: <span class="hljs-type">List</span>[<span class="hljs-built_in">str</span>]</span>) -&gt; <span class="hljs-type">List</span>[<span class="hljs-type">Dict</span>[<span class="hljs-built_in">int</span>, <span class="hljs-built_in">float</span>]]:
        ...  <span class="hljs-comment"># code to embed documents</span>
        <span class="hljs-keyword">return</span> [  <span class="hljs-comment"># fake embedding results</span>
            {
                <span class="hljs-number">1</span>: <span class="hljs-number">0.1</span>,
                <span class="hljs-number">2</span>: <span class="hljs-number">0.2</span>,
                <span class="hljs-number">3</span>: <span class="hljs-number">0.3</span>,
                <span class="hljs-comment"># ...</span>
            }
        ] * <span class="hljs-built_in">len</span>(texts)
<button class="copy-code-btn"></button></code></pre>
<p>Wir haben eine Demoklasse <code translate="no">BM25SparseEmbedding</code>, die von <code translate="no">BaseSparseEmbedding</code> in <code translate="no">langchain_milvus.utils.sparse</code> geerbt wurde. Sie können sie in die Initialisierungseinbettungsliste der Milvus-Vektorspeicherinstanz genauso wie andere Langchain-Dense-Einbettungsklassen übergeben.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># BM25SparseEmbedding is inherited from BaseSparseEmbedding</span>
<span class="hljs-keyword">from</span> langchain_milvus.utils.sparse <span class="hljs-keyword">import</span> BM25SparseEmbedding

embedding1 = OpenAIEmbeddings()

corpus = [doc.page_content <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs]
embedding2 = BM25SparseEmbedding(
    corpus=corpus
)  <span class="hljs-comment"># pass in corpus to initialize the statistics</span>

vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=[embedding1, embedding2],
    vector_field=[<span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
    drop_old=<span class="hljs-literal">False</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Obwohl dies eine Möglichkeit ist, BM25 zu verwenden, erfordert es, dass der Benutzer das Korpus für die Termhäufigkeitsstatistik verwaltet. Wir empfehlen stattdessen die Verwendung der eingebauten BM25-Funktion (Option 1), da diese alles auf der Milvus-Server-Seite erledigt. Dadurch müssen sich die Benutzer nicht mehr um die Verwaltung des Korpus oder das Training eines Vokabulars kümmern. Für weitere Informationen lesen Sie bitte den Abschnitt <a href="https://milvus.io/docs/full_text_search_with_langchain.md">Volltextsuche mit LangChain und Milvus</a>.</p>
<h2 id="Define-multiple-arbitrary-vector-fields" class="common-anchor-header">Definieren Sie mehrere beliebige Vektorfelder<button data-href="#Define-multiple-arbitrary-vector-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Bei der Initialisierung des Milvus-Vektorspeichers können Sie die Liste der Einbettungen (und in Zukunft auch die Liste der eingebauten Funktionen) übergeben, um die Mehrfachsuche zu implementieren und diese Kandidaten dann neu zu ordnen. Hier ein Beispiel:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># from langchain_voyageai import VoyageAIEmbeddings</span>

embedding1 = OpenAIEmbeddings(model=<span class="hljs-string">&quot;text-embedding-ada-002&quot;</span>)
embedding2 = OpenAIEmbeddings(model=<span class="hljs-string">&quot;text-embedding-3-large&quot;</span>)
<span class="hljs-comment"># embedding3 = VoyageAIEmbeddings(model=&quot;voyage-3&quot;)  # You can also use embedding from other embedding model providers, e.g VoyageAIEmbeddings</span>


vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=[embedding1, embedding2],  <span class="hljs-comment"># embedding3],</span>
    builtin_function=BM25BuiltInFunction(output_field_names=<span class="hljs-string">&quot;sparse&quot;</span>),
    <span class="hljs-comment"># `sparse` is the output field name of BM25BuiltInFunction, and `dense1` and `dense2` are the output field names of embedding1 and embedding2</span>
    vector_field=[<span class="hljs-string">&quot;dense1&quot;</span>, <span class="hljs-string">&quot;dense2&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
    drop_old=<span class="hljs-literal">False</span>,
)

vectorstore.vector_fields
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">['dense1', 'dense2', 'sparse']
</code></pre>
<p>In diesem Beispiel haben wir drei Vektorfelder. Davon wird <code translate="no">sparse</code> als Ausgabefeld für <code translate="no">BM25BuiltInFunction</code> verwendet, während die beiden anderen, <code translate="no">dense1</code> und <code translate="no">dense2</code>, automatisch als Ausgabefelder für die beiden <code translate="no">OpenAIEmbeddings</code> -Modelle zugewiesen werden (basierend auf der Reihenfolge).</p>
<h3 id="Specify-the-index-params-for-multi-vector-fields" class="common-anchor-header">Festlegen der Index-Parameter für Multi-Vektorfelder</h3><p>Standardmäßig werden die Indextypen der einzelnen Vektorfelder automatisch durch den Typ der Einbettung oder der eingebauten Funktion bestimmt. Sie können jedoch auch den Indextyp für jedes Vektorfeld angeben, um die Suchleistung zu optimieren.</p>
<pre><code translate="no" class="language-python">dense_index_param_1 = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;HNSW&quot;</span>,
}
dense_index_param_2 = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;HNSW&quot;</span>,
}
sparse_index_param = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
}

vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=[embedding1, embedding2],
    builtin_function=BM25BuiltInFunction(output_field_names=<span class="hljs-string">&quot;sparse&quot;</span>),
    index_params=[dense_index_param_1, dense_index_param_2, sparse_index_param],
    vector_field=[<span class="hljs-string">&quot;dense1&quot;</span>, <span class="hljs-string">&quot;dense2&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
    drop_old=<span class="hljs-literal">False</span>,
)

vectorstore.vector_fields
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">['dense1', 'dense2', 'sparse']
</code></pre>
<div class="alert note">
<p>Bitte achten Sie darauf, dass die Reihenfolge der Liste der Indexparameter mit der Reihenfolge von <code translate="no">vectorstore.vector_fields</code> übereinstimmt, um Verwechslungen zu vermeiden.</p>
</div>
<h3 id="Rerank-the-candidates" class="common-anchor-header">Neueinstufung der Kandidaten</h3><p>Nach der ersten Stufe der Suche müssen wir die Kandidaten neu bewerten, um ein besseres Ergebnis zu erhalten. Sie können je nach Ihren Anforderungen <a href="https://milvus.io/docs/reranking.md#Weighted-Scoring-WeightedRanker">WeightedRanker</a> oder <a href="https://milvus.io/docs/reranking.md#Reciprocal-Rank-Fusion-RRFRanker">RRFRanker</a> wählen. Weitere Informationen finden Sie im Abschnitt <a href="https://milvus.io/docs/reranking.md#Reranking">Reranking</a>.</p>
<p>Hier ist ein Beispiel für gewichtetes Reranking:</p>
<pre><code translate="no" class="language-python">vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=OpenAIEmbeddings(),
    builtin_function=BM25BuiltInFunction(),
    vector_field=[<span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
    drop_old=<span class="hljs-literal">False</span>,
)

query = <span class="hljs-string">&quot;What are the novels Lila has written and what are their contents?&quot;</span>

vectorstore.similarity_search(
    query, k=<span class="hljs-number">1</span>, ranker_type=<span class="hljs-string">&quot;weighted&quot;</span>, ranker_params={<span class="hljs-string">&quot;weights&quot;</span>: [<span class="hljs-number">0.6</span>, <span class="hljs-number">0.4</span>]}
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[Document(metadata={'pk': 454646931479252186, 'category': 'Heist/Thriller'}, page_content=&quot;In 'The Memory Thief' by Lila Rose, a charismatic thief with the ability to steal and manipulate memories is hired by a mysterious client to pull off a daring heist, but soon finds themselves trapped in a web of deceit and betrayal.&quot;)]
</code></pre>
<p>Hier ist ein Beispiel für RRF-Reranking:</p>
<pre><code translate="no" class="language-python">vectorstore.similarity_search(query, k=<span class="hljs-number">1</span>, ranker_type=<span class="hljs-string">&quot;rrf&quot;</span>, ranker_params={<span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">100</span>})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[Document(metadata={'category': 'Heist/Thriller', 'pk': 454646931479252186}, page_content=&quot;In 'The Memory Thief' by Lila Rose, a charismatic thief with the ability to steal and manipulate memories is hired by a mysterious client to pull off a daring heist, but soon finds themselves trapped in a web of deceit and betrayal.&quot;)]
</code></pre>
<p>Wenn Sie keine Parameter für das Reranking übergeben, wird standardmäßig die durchschnittliche gewichtete Rerank-Strategie verwendet.</p>
<h2 id="Using-Hybrid-Search-and-Reranking-in-RAG" class="common-anchor-header">Verwendung von hybrider Suche und Reranking in RAG<button data-href="#Using-Hybrid-Search-and-Reranking-in-RAG" class="anchor-icon" translate="no">
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
    </button></h2><p>Im Szenario von RAG ist der am weitesten verbreitete Ansatz für die hybride Suche Dense + Sparse Retrieval, gefolgt von Reranking. Das folgende Beispiel zeigt einen unkomplizierten End-to-End-Code.</p>
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
<h3 id="Load-the-document-into-Milvus-vector-store" class="common-anchor-header">Laden des Dokuments in den Milvus-Vektorspeicher</h3><p>Wie oben beschrieben, initialisieren und laden wir die vorbereiteten Dokumente in den Milvus-Vektorspeicher, der zwei Vektorfelder enthält: <code translate="no">dense</code> ist für die OpenAI-Einbettung und <code translate="no">sparse</code> ist für die BM25-Funktion.</p>
<pre><code translate="no" class="language-python">vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=OpenAIEmbeddings(),
    builtin_function=BM25BuiltInFunction(),
    vector_field=[<span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>],
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: URI,
    },
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
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
<pre><code translate="no">'PAL (Program-aided Language models) and PoT (Program of Thoughts prompting) are approaches that involve using language models to generate programming language statements to solve natural language reasoning problems. This method offloads the solution step to a runtime, such as a Python interpreter, allowing for complex computation and reasoning to be handled externally. PAL and PoT rely on language models with strong coding skills to effectively perform these tasks.'
</code></pre>
<p>Herzlichen Glückwunsch! Sie haben eine hybride (dichte Vektor- + spärliche bm25-Funktion) RAG-Kette auf der Grundlage von Milvus und LangChain erstellt.</p>
