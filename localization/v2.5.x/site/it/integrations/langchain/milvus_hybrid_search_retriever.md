---
id: milvus_hybrid_search_retriever.md
summary: >-
  Questo quaderno mostra come utilizzare le funzionalità relative al database
  vettoriale Milvus.
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
    </button></h1><p>La ricerca ibrida combina i punti di forza di diversi paradigmi di ricerca per migliorare l'accuratezza e la robustezza del recupero. Sfrutta le capacità della ricerca vettoriale densa e della ricerca vettoriale rada, nonché le combinazioni di più strategie di ricerca vettoriale densa, assicurando un recupero completo e preciso per diverse query.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/hybrid_and_rerank.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Questo diagramma illustra lo scenario di ricerca ibrida più comune, ovvero la ricerca ibrida densa + rada. In questo caso, i candidati vengono recuperati utilizzando sia la similarità semantica dei vettori sia la corrispondenza precisa delle parole chiave. I risultati di questi metodi vengono uniti, riclassificati e passati a un LLM per generare la risposta finale. Questo approccio bilancia precisione e comprensione semantica, rendendolo molto efficace per diversi scenari di interrogazione.</p>
<p>Oltre alla ricerca ibrida densa + rada, le strategie ibride possono anche combinare più modelli vettoriali densi. Ad esempio, un modello vettoriale denso potrebbe essere specializzato nella cattura delle sfumature semantiche, mentre un altro si concentra sulle incorporazioni contestuali o sulle rappresentazioni specifiche del dominio. Unendo i risultati di questi modelli e riclassificandoli, questo tipo di ricerca ibrida garantisce un processo di recupero più sfumato e consapevole del contesto.</p>
<p>L'integrazione di LangChain Milvus offre un modo flessibile di implementare la ricerca ibrida, supportando un numero qualsiasi di campi vettoriali e di modelli di incorporamento densi o sparsi personalizzati, il che consente a LangChain Milvus di adattarsi in modo flessibile a vari scenari di utilizzo della ricerca ibrida e allo stesso tempo di essere compatibile con le altre funzionalità di LangChain.</p>
<p>In questo tutorial, inizieremo con il caso più comune di dense + sparse, per poi introdurre una serie di approcci generali all'uso della ricerca ibrida.</p>
<div class="alert note">
<p>Il <a href="https://api.python.langchain.com/en/latest/milvus/retrievers/langchain_milvus.retrievers.milvus_hybrid_search.MilvusCollectionHybridSearchRetriever.html">MilvusCollectionHybridSearchRetriever</a>, un'altra implementazione della ricerca ibrida con Milvus e LangChain, <strong>sta per essere deprecato</strong>. Per implementare la ricerca ibrida, utilizzare l'approccio descritto in questo documento, che è più flessibile e compatibile con LangChain.</p>
</div>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisiti<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Prima di eseguire questo notebook, assicurarsi di avere installato le seguenti dipendenze:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade --quiet  langchain langchain-core langchain-community langchain-text-splitters langchain-milvus langchain-openai bs4 pymilvus[model] <span class="hljs-comment">#langchain-voyageai</span></span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Se si utilizza Google Colab, per abilitare le dipendenze appena installate, potrebbe essere necessario <strong>riavviare il runtime</strong> (fare clic sul menu "Runtime" nella parte superiore dello schermo e selezionare "Restart session" dal menu a discesa).</p>
</div>
<p>Utilizzeremo i modelli di OpenAI. È necessario preparare le variabili d'ambiente <code translate="no">OPENAI_API_KEY</code> da <a href="https://platform.openai.com/docs/quickstart">OpenAI</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Specificare il server Milvus <code translate="no">URI</code> (e facoltativamente <code translate="no">TOKEN</code>). Per sapere come installare e avviare il server Milvus, seguire questa <a href="https://milvus.io/docs/install_standalone-docker-compose.md">guida</a>.</p>
<pre><code translate="no" class="language-python">URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-comment"># TOKEN = ...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Preparare alcuni documenti di esempio, che sono riassunti di storie di fantasia classificate per tema o genere.</p>
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
<h2 id="Dense-embedding-+-Sparse-embedding" class="common-anchor-header">Incorporamento denso + Incorporamento sparso<button data-href="#Dense-embedding-+-Sparse-embedding" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Option-1Recommended-dense-embedding-+-Milvus-BM25-built-in-function" class="common-anchor-header">Opzione 1 (consigliata): incorporazione densa + funzione incorporata Milvus BM25</h3><p>Utilizzare l'incorporazione densa + la funzione incorporata di Milvus BM25 per assemblare l'istanza di archivio vettoriale ibrido.</p>
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
<li>Quando si utilizza <code translate="no">BM25BuiltInFunction</code>, si noti che la ricerca full-text è disponibile in Milvus Standalone e Milvus Distributed, ma non in Milvus Lite, anche se è sulla tabella di marcia per la futura inclusione. Sarà presto disponibile anche in Zilliz Cloud (Milvus a gestione completa). Per ulteriori informazioni, contattare <a href="mailto:support@zilliz.com">support@zilliz.com</a>.</li>
</ul>
</div>
<p>Nel codice qui sopra, definiamo un'istanza di <code translate="no">BM25BuiltInFunction</code> e la passiamo all'oggetto <code translate="no">Milvus</code>. <code translate="no">BM25BuiltInFunction</code> è una classe leggera per il wrapper di <a href="https://milvus.io/docs/manage-collections.md#Function"><code translate="no">Function</code></a> in Milvus. Possiamo usarla con <code translate="no">OpenAIEmbeddings</code> per inizializzare un'istanza di archivio vettoriale Milvus a ricerca ibrida densa + rada.</p>
<p><code translate="no">BM25BuiltInFunction</code> La classe  non richiede al cliente di passare il corpus o l'addestramento; tutto viene elaborato automaticamente dal server Milvus, quindi gli utenti non devono preoccuparsi del vocabolario e del corpus. Inoltre, gli utenti possono anche personalizzare l'<a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">analizzatore</a> per implementare l'elaborazione del testo personalizzato in BM25.</p>
<p>Per ulteriori informazioni su <code translate="no">BM25BuiltInFunction</code>, consultare le sezioni <a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">Full-Text-Search</a> e <a href="https://milvus.io/docs/full_text_search_with_langchain.md">Using Full-Text Search with LangChain and Milvus</a>.</p>
<h3 id="Option-2-Use-dense-and-customized-LangChain-sparse-embedding" class="common-anchor-header">Opzione 2: Usare l'incorporamento denso e personalizzato di LangChain</h3><p>È possibile ereditare la classe <code translate="no">BaseSparseEmbedding</code> da <code translate="no">langchain_milvus.utils.sparse</code> e implementare i metodi <code translate="no">embed_query</code> e <code translate="no">embed_documents</code> per personalizzare il processo di incorporazione rada. Ciò consente di personalizzare qualsiasi metodo di incorporazione rada sia basato su statistiche di frequenza dei termini (ad esempio <a href="https://milvus.io/docs/embed-with-bm25.md#BM25">BM25</a>) sia su reti neurali (ad esempio <a href="https://milvus.io/docs/embed-with-splade.md#SPLADE">SPADE</a>).</p>
<p>Ecco un esempio:</p>
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
<p>Abbiamo una classe demo <code translate="no">BM25SparseEmbedding</code> ereditata da <code translate="no">BaseSparseEmbedding</code> in <code translate="no">langchain_milvus.utils.sparse</code>. È possibile passarla nell'elenco di inizializzazione dell'istanza di Milvus vector store proprio come le altre classi di incorporazione densa di langchain.</p>
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
<p>Sebbene questo sia un modo per usare BM25, richiede che l'utente gestisca il corpus per le statistiche di frequenza dei termini. Si consiglia invece di utilizzare la funzione incorporata di BM25 (opzione 1), che gestisce tutto sul lato server di Milvus. Questo elimina la necessità di gestire il corpus o di addestrare un vocabolario. Per ulteriori informazioni, consultare la sezione <a href="https://milvus.io/docs/full_text_search_with_langchain.md">Utilizzo della ricerca full-text con LangChain e Milvus</a>.</p>
<h2 id="Define-multiple-arbitrary-vector-fields" class="common-anchor-header">Definire più campi vettoriali arbitrari<button data-href="#Define-multiple-arbitrary-vector-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Quando si inizializza l'archivio vettoriale di Milvus, è possibile passare l'elenco degli embeddings (e in futuro anche l'elenco delle funzioni integrate) per implementare il reperimento a più vie e quindi classificare i candidati. Ecco un esempio:</p>
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
<p>In questo esempio, abbiamo tre campi vettoriali. Tra questi, <code translate="no">sparse</code> è usato come campo di output per <code translate="no">BM25BuiltInFunction</code>, mentre gli altri due, <code translate="no">dense1</code> e <code translate="no">dense2</code>, sono assegnati automaticamente come campi di output per i due modelli <code translate="no">OpenAIEmbeddings</code> (in base all'ordine).</p>
<h3 id="Specify-the-index-params-for-multi-vector-fields" class="common-anchor-header">Specificare i parametri degli indici per i campi multivettoriali</h3><p>Per impostazione predefinita, i tipi di indice di ciascun campo vettoriale sono determinati automaticamente dal tipo di incorporazione o dalla funzione incorporata. Tuttavia, è possibile specificare il tipo di indice per ogni campo vettoriale per ottimizzare le prestazioni della ricerca.</p>
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
<p>L'ordine dell'elenco dei parametri dell'indice deve essere coerente con l'ordine di <code translate="no">vectorstore.vector_fields</code> per evitare confusione.</p>
</div>
<h3 id="Rerank-the-candidates" class="common-anchor-header">Riclassificazione dei candidati</h3><p>Dopo la prima fase di recupero, è necessario riclassificare i candidati per ottenere un risultato migliore. Si può scegliere <a href="https://milvus.io/docs/reranking.md#Weighted-Scoring-WeightedRanker">WeightedRanker</a> o <a href="https://milvus.io/docs/reranking.md#Reciprocal-Rank-Fusion-RRFRanker">RRFRanker</a> a seconda delle esigenze. Per ulteriori informazioni, consultare la sezione <a href="https://milvus.io/docs/reranking.md#Reranking">Reranking</a>.</p>
<p>Ecco un esempio di reranking ponderato:</p>
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
<p>Ecco un esempio di RRF reranking:</p>
<pre><code translate="no" class="language-python">vectorstore.similarity_search(query, k=<span class="hljs-number">1</span>, ranker_type=<span class="hljs-string">&quot;rrf&quot;</span>, ranker_params={<span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">100</span>})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[Document(metadata={'category': 'Heist/Thriller', 'pk': 454646931479252186}, page_content=&quot;In 'The Memory Thief' by Lila Rose, a charismatic thief with the ability to steal and manipulate memories is hired by a mysterious client to pull off a daring heist, but soon finds themselves trapped in a web of deceit and betrayal.&quot;)]
</code></pre>
<p>Se non si passa alcun parametro per il rerank, viene utilizzata per default la strategia di rerank medio ponderato.</p>
<h2 id="Using-Hybrid-Search-and-Reranking-in-RAG" class="common-anchor-header">Utilizzo della ricerca ibrida e del reranking in RAG<button data-href="#Using-Hybrid-Search-and-Reranking-in-RAG" class="anchor-icon" translate="no">
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
    </button></h2><p>Nello scenario di RAG, l'approccio più diffuso per la ricerca ibrida è il recupero denso + rado, seguito dal reranking. L'esempio seguente mostra un codice end-to-end semplice.</p>
<h3 id="Prepare-the-data" class="common-anchor-header">Preparare i dati</h3><p>Utilizziamo il WebBaseLoader di Langchain per caricare i documenti dalle fonti web e dividerli in pezzi utilizzando il RecursiveCharacterTextSplitter.</p>
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
<h3 id="Load-the-document-into-Milvus-vector-store" class="common-anchor-header">Caricare il documento nell'archivio vettoriale Milvus</h3><p>Come nell'introduzione precedente, inizializziamo e carichiamo i documenti preparati nell'archivio vettoriale Milvus, che contiene due campi vettoriali: <code translate="no">dense</code> è per l'incorporamento OpenAI e <code translate="no">sparse</code> è per la funzione BM25.</p>
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
<h3 id="Build-RAG-chain" class="common-anchor-header">Costruire la catena RAG</h3><p>Prepariamo l'istanza LLM e il prompt, quindi li combiniamo in una pipeline RAG usando il LangChain Expression Language.</p>
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
<p>Utilizzare LCEL (LangChain Expression Language) per costruire una catena RAG.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define the RAG (Retrieval-Augmented Generation) chain for AI response generation</span>
rag_chain = (
    {<span class="hljs-string">&quot;context&quot;</span>: retriever | format_docs, <span class="hljs-string">&quot;question&quot;</span>: RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

<span class="hljs-comment"># rag_chain.get_graph().print_ascii()</span>
<button class="copy-code-btn"></button></code></pre>
<p>Invochiamo la catena RAG con una domanda specifica e recuperiamo la risposta.</p>
<pre><code translate="no" class="language-python">query = <span class="hljs-string">&quot;What is PAL and PoT?&quot;</span>
res = rag_chain.invoke(query)
res
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'PAL (Program-aided Language models) and PoT (Program of Thoughts prompting) are approaches that involve using language models to generate programming language statements to solve natural language reasoning problems. This method offloads the solution step to a runtime, such as a Python interpreter, allowing for complex computation and reasoning to be handled externally. PAL and PoT rely on language models with strong coding skills to effectively perform these tasks.'
</code></pre>
<p>Congratulazioni! Avete costruito una catena RAG ibrida (vettore denso + funzione rada bm25) con Milvus e LangChain.</p>
