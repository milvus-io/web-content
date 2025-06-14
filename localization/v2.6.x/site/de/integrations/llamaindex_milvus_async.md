---
id: llamaindex_milvus_async.md
title: RAG mit LlamaIndex und Milvus Async API aufbauen
related_key: LlamaIndex
summary: >-
  Dieses Tutorial zeigt, wie man LlamaIndex mit Milvus verwendet, um eine
  asynchrone Dokumentenverarbeitungspipeline für RAG zu erstellen. LlamaIndex
  bietet eine Möglichkeit, Dokumente zu verarbeiten und in einer
  Vektor-Datenbank wie Milvus zu speichern. Durch die Nutzung der asynchronen
  API von LlamaIndex und der Python-Client-Bibliothek von Milvus können wir den
  Durchsatz der Pipeline erhöhen, um große Datenmengen effizient zu verarbeiten
  und zu indizieren.
---
<h1 id="RAG-with-Milvus-and-LlamaIndex-Async-API" class="common-anchor-header">RAG mit Milvus und LlamaIndex Async API<button data-href="#RAG-with-Milvus-and-LlamaIndex-Async-API" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_async.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_async.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p>Dieses Tutorial zeigt, wie man <a href="https://www.llamaindex.ai/">LlamaIndex</a> mit <a href="https://milvus.io/">Milvus</a> verwendet, um eine asynchrone Dokumentenverarbeitungspipeline für RAG zu erstellen. LlamaIndex bietet eine Möglichkeit, Dokumente zu verarbeiten und in einer Vektor-Datenbank wie Milvus zu speichern. Durch die Nutzung der asynchronen API von LlamaIndex und der Python-Client-Bibliothek von Milvus können wir den Durchsatz der Pipeline erhöhen, um große Datenmengen effizient zu verarbeiten und zu indizieren.</p>
<p>In diesem Tutorial werden wir zunächst die Verwendung asynchroner Methoden vorstellen, um eine RAG mit LlamaIndex und Milvus von einer hohen Ebene aus aufzubauen, und dann die Verwendung von Low-Level-Methoden und den Leistungsvergleich von synchron und asynchron vorstellen.</p>
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
    </button></h2><p>Die Codeschnipsel auf dieser Seite erfordern die Abhängigkeiten von pymilvus und llamaindex. Sie können diese mit den folgenden Befehlen installieren:</p>
<pre><code translate="no" class="language-bash">$ pip install -U pymilvus llama-index-vector-stores-milvus llama-index nest-asyncio
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Wenn Sie Google Colab verwenden, müssen Sie möglicherweise <strong>die Runtime neu starten</strong>, um die soeben installierten Abhängigkeiten zu aktivieren (klicken Sie auf das Menü "Runtime" am oberen Bildschirmrand und wählen Sie "Restart session" aus dem Dropdown-Menü).</p>
</div>
<p>Wir werden die Modelle von OpenAI verwenden. Sie sollten den <a href="https://platform.openai.com/docs/quickstart">api-Schlüssel</a> <code translate="no">OPENAI_API_KEY</code> als Umgebungsvariable vorbereiten.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Wenn Sie Jupyter Notebook verwenden, müssen Sie diese Codezeile ausführen, bevor Sie den asynchronen Code starten.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> nest_asyncio

nest_asyncio.apply()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-data" class="common-anchor-header">Daten vorbereiten</h3><p>Sie können Beispieldaten mit den folgenden Befehlen herunterladen:</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">mkdir</span> -p <span class="hljs-string">&#x27;data/&#x27;</span>
$ wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt&#x27;</span> -O <span class="hljs-string">&#x27;data/paul_graham_essay.txt&#x27;</span>
$ wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/10k/uber_2021.pdf&#x27;</span> -O <span class="hljs-string">&#x27;data/uber_2021.pdf&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-RAG-with-Asynchronous-Processing" class="common-anchor-header">RAG mit asynchroner Verarbeitung erstellen<button data-href="#Build-RAG-with-Asynchronous-Processing" class="anchor-icon" translate="no">
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
    </button></h2><p>Dieser Abschnitt zeigt, wie man ein RAG-System baut, das Dokumente asynchron verarbeiten kann.</p>
<p>Importieren Sie die notwendigen Bibliotheken und definieren Sie Milvus URI und die Dimension der Einbettung.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> asyncio
<span class="hljs-keyword">import</span> random
<span class="hljs-keyword">import</span> time

<span class="hljs-keyword">from</span> llama_index.core.schema <span class="hljs-keyword">import</span> TextNode, NodeRelationship, RelatedNodeInfo
<span class="hljs-keyword">from</span> llama_index.core.vector_stores <span class="hljs-keyword">import</span> VectorStoreQuery
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore

URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
DIM = <span class="hljs-number">768</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>Wenn Sie große Datenmengen haben, können Sie einen performanten Milvus-Server auf <a href="https://milvus.io/docs/quickstart.md">Docker oder Kubernetes</a> einrichten. Bei dieser Einrichtung verwenden Sie bitte die Server-URI, z. B.<code translate="no">http://localhost:19530</code>, als <code translate="no">uri</code>.</li>
<li>Wenn Sie <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, den vollständig verwalteten Cloud-Service für Milvus, nutzen möchten, passen Sie <code translate="no">uri</code> und <code translate="no">token</code> an, die dem <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint und Api-Schlüssel</a> in Zilliz Cloud entsprechen.</li>
<li>Bei komplexen Systemen (z.B. Netzwerkkommunikation) kann die asynchrone Verarbeitung im Vergleich zur Synchronisation eine Leistungssteigerung bringen. Wir denken also, dass Milvus-Lite für die Verwendung asynchroner Schnittstellen nicht geeignet ist, da die verwendeten Szenarien nicht geeignet sind.</li>
</ul>
</div>
<p>Definieren Sie eine Initialisierungsfunktion, die wir wieder verwenden können, um die Milvus-Sammlung neu aufzubauen.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">init_vector_store</span>():
    <span class="hljs-keyword">return</span> MilvusVectorStore(
        uri=URI,
        <span class="hljs-comment"># token=TOKEN,</span>
        dim=DIM,
        collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
        embedding_field=<span class="hljs-string">&quot;embedding&quot;</span>,
        id_field=<span class="hljs-string">&quot;id&quot;</span>,
        similarity_metric=<span class="hljs-string">&quot;COSINE&quot;</span>,
        consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
        overwrite=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># To overwrite the collection if it already exists</span>
    )


vector_store = init_vector_store()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-01-24 20:04:39,414 [DEBUG][_create_connection]: Created new connection using: faa8be8753f74288bffc7e6d38942f8a (async_milvus_client.py:600)
</code></pre>
<p>Verwenden Sie SimpleDirectoryReader, um ein LlamaIndex-Dokumentenobjekt aus der Datei <code translate="no">paul_graham_essay.txt</code> zu wickeln.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> SimpleDirectoryReader

<span class="hljs-comment"># load documents</span>
documents = SimpleDirectoryReader(
    input_files=[<span class="hljs-string">&quot;./data/paul_graham_essay.txt&quot;</span>]
).load_data()

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Document ID:&quot;</span>, documents[<span class="hljs-number">0</span>].doc_id)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Document ID: 41a6f99c-489f-49ff-9821-14e2561140eb
</code></pre>
<p>Instanziieren Sie ein Hugging Face Einbettungsmodell lokal. Die Verwendung eines lokalen Modells vermeidet das Risiko, bei der asynchronen Dateneinfügung an die Grenzen der API-Rate zu stoßen, da sich gleichzeitige API-Anforderungen schnell summieren und Ihr Budget für die öffentliche API aufbrauchen können. Wenn Sie jedoch ein hohes Ratenlimit haben, können Sie sich stattdessen für die Verwendung eines Remote-Modelldienstes entscheiden.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.embeddings.huggingface <span class="hljs-keyword">import</span> HuggingFaceEmbedding


embed_model = HuggingFaceEmbedding(model_name=<span class="hljs-string">&quot;BAAI/bge-base-en-v1.5&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Erstellen Sie einen Index und fügen Sie das Dokument ein.</p>
<p>Wir setzen die <code translate="no">use_async</code> auf <code translate="no">True</code>, um den asynchronen Einfügemodus zu aktivieren.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create an index over the documents</span>
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> VectorStoreIndex, StorageContext

storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(
    documents,
    storage_context=storage_context,
    embed_model=embed_model,
    use_async=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Initialisieren Sie den LLM.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.llms.openai <span class="hljs-keyword">import</span> OpenAI

llm = OpenAI(model=<span class="hljs-string">&quot;gpt-3.5-turbo&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Bei der Erstellung der Query Engine können Sie auch den Parameter <code translate="no">use_async</code> auf <code translate="no">True</code> setzen, um die asynchrone Suche zu aktivieren.</p>
<pre><code translate="no" class="language-python">query_engine = index.as_query_engine(use_async=<span class="hljs-literal">True</span>, llm=llm)
response = <span class="hljs-keyword">await</span> query_engine.aquery(<span class="hljs-string">&quot;What did the author learn?&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">print</span>(response)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned that the field of artificial intelligence, as practiced at the time, was not as promising as initially believed. The approach of using explicit data structures to represent concepts in AI was not effective in achieving true understanding of natural language. This realization led the author to shift his focus towards Lisp and eventually towards exploring the field of art.
</code></pre>
<h2 id="Explore-the-Async-API" class="common-anchor-header">Erkunden Sie die asynchrone API<button data-href="#Explore-the-Async-API" class="anchor-icon" translate="no">
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
    </button></h2><p>In diesem Abschnitt werden wir die Verwendung der API auf niedrigerer Ebene vorstellen und die Leistung von synchronen und asynchronen Läufen vergleichen.</p>
<h3 id="Async-add" class="common-anchor-header">Asynchrones Hinzufügen</h3><p>Neuinitialisierung des Vektorspeichers.</p>
<pre><code translate="no" class="language-python">vector_store = init_vector_store()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-01-24 20:07:38,727 [DEBUG][_create_connection]: Created new connection using: 5e0d130f3b644555ad7ea6b8df5f1fc2 (async_milvus_client.py:600)
</code></pre>
<p>Definieren wir eine Knotenerzeugungsfunktion, die zur Erzeugung einer großen Anzahl von Testknoten für den Index verwendet wird.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">random_id</span>():
    random_num_str = <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">16</span>):
        random_digit = <span class="hljs-built_in">str</span>(random.randint(<span class="hljs-number">0</span>, <span class="hljs-number">9</span>))
        random_num_str += random_digit
    <span class="hljs-keyword">return</span> random_num_str


<span class="hljs-keyword">def</span> <span class="hljs-title function_">produce_nodes</span>(<span class="hljs-params">num_adding</span>):
    node_list = []
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_adding):
        node = TextNode(
            id_=random_id(),
            text=<span class="hljs-string">f&quot;n<span class="hljs-subst">{i}</span>_text&quot;</span>,
            embedding=[<span class="hljs-number">0.5</span>] * (DIM - <span class="hljs-number">1</span>) + [random.random()],
            relationships={NodeRelationship.SOURCE: RelatedNodeInfo(node_id=<span class="hljs-string">f&quot;n<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>&quot;</span>)},
        )
        node_list.append(node)
    <span class="hljs-keyword">return</span> node_list
<button class="copy-code-btn"></button></code></pre>
<p>Definieren Sie eine asynchrone Funktion zum Hinzufügen von Dokumenten zum Vektorspeicher. Wir verwenden die Funktion <code translate="no">async_add()</code> in der Milvus-Vektorspeicherinstanz.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">async_add</span>(<span class="hljs-params">num_adding</span>):
    node_list = produce_nodes(num_adding)
    start_time = time.time()
    tasks = []
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_adding):
        sub_nodes = node_list[i]
        task = vector_store.async_add([sub_nodes])  <span class="hljs-comment"># use async_add()</span>
        tasks.append(task)
    results = <span class="hljs-keyword">await</span> asyncio.gather(*tasks)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">add_counts = [<span class="hljs-number">10</span>, <span class="hljs-number">100</span>, <span class="hljs-number">1000</span>]
<button class="copy-code-btn"></button></code></pre>
<p>Holen Sie die Ereignisschleife.</p>
<pre><code translate="no" class="language-python">loop = asyncio.get_event_loop()
<button class="copy-code-btn"></button></code></pre>
<p>Asynchrones Hinzufügen von Dokumenten zum Vektorspeicher.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> add_counts:

    <span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">measure_async_add</span>():
        async_time = <span class="hljs-keyword">await</span> async_add(count)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Async add for <span class="hljs-subst">{count}</span> took <span class="hljs-subst">{async_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
        <span class="hljs-keyword">return</span> async_time

    loop.run_until_complete(measure_async_add())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Async add for 10 took 0.19 seconds
Async add for 100 took 0.48 seconds
Async add for 1000 took 3.22 seconds
</code></pre>
<pre><code translate="no" class="language-python">vector_store = init_vector_store()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-01-24 20:07:45,554 [DEBUG][_create_connection]: Created new connection using: b14dde8d6d24489bba26a907593f692d (async_milvus_client.py:600)
</code></pre>
<h4 id="Compare-with-synchronous-add" class="common-anchor-header">Vergleich mit synchronem Hinzufügen</h4><p>Definieren Sie eine synchrone Hinzufügungsfunktion. Messen Sie dann die Laufzeit unter der gleichen Bedingung.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">sync_add</span>(<span class="hljs-params">num_adding</span>):
    node_list = produce_nodes(num_adding)
    start_time = time.time()
    <span class="hljs-keyword">for</span> node <span class="hljs-keyword">in</span> node_list:
        result = vector_store.add([node])
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> add_counts:
    sync_time = sync_add(count)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Sync add for <span class="hljs-subst">{count}</span> took <span class="hljs-subst">{sync_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Sync add for 10 took 0.56 seconds
Sync add for 100 took 5.85 seconds
Sync add for 1000 took 62.91 seconds
</code></pre>
<p>Das Ergebnis zeigt, dass der synchrone Addiervorgang viel langsamer ist als der asynchrone.</p>
<h3 id="Async-search" class="common-anchor-header">Asynchrone Suche</h3><p>Re-initialisieren Sie den Vektorspeicher und fügen Sie einige Dokumente hinzu, bevor Sie die Suche starten.</p>
<pre><code translate="no" class="language-python">vector_store = init_vector_store()
node_list = produce_nodes(num_adding=<span class="hljs-number">1000</span>)
inserted_ids = vector_store.add(node_list)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-01-24 20:08:57,982 [DEBUG][_create_connection]: Created new connection using: 351dc7ea4fb14d4386cfab02621ab7d1 (async_milvus_client.py:600)
</code></pre>
<p>Definieren Sie eine asynchrone Suchfunktion. Wir verwenden die Funktion <code translate="no">aquery()</code> in der Milvus-Vektorspeicherinstanz.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">async_search</span>(<span class="hljs-params">num_queries</span>):
    start_time = time.time()
    tasks = []
    <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_queries):
        query = VectorStoreQuery(
            query_embedding=[<span class="hljs-number">0.5</span>] * (DIM - <span class="hljs-number">1</span>) + [<span class="hljs-number">0.6</span>], similarity_top_k=<span class="hljs-number">3</span>
        )
        task = vector_store.aquery(query=query)  <span class="hljs-comment"># use aquery()</span>
        tasks.append(task)
    results = <span class="hljs-keyword">await</span> asyncio.gather(*tasks)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">query_counts = [<span class="hljs-number">10</span>, <span class="hljs-number">100</span>, <span class="hljs-number">1000</span>]
<button class="copy-code-btn"></button></code></pre>
<p>Asynchrone Suche im Milvus-Speicher.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> query_counts:

    <span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">measure_async_search</span>():
        async_time = <span class="hljs-keyword">await</span> async_search(count)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Async search for <span class="hljs-subst">{count}</span> queries took <span class="hljs-subst">{async_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
        <span class="hljs-keyword">return</span> async_time

    loop.run_until_complete(measure_async_search())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Async search for 10 queries took 0.55 seconds
Async search for 100 queries took 1.39 seconds
Async search for 1000 queries took 8.81 seconds
</code></pre>
<h4 id="Compare-with-synchronous-search" class="common-anchor-header">Vergleich mit synchroner Suche</h4><p>Definieren Sie eine synchrone Suchfunktion. Messen Sie dann die Laufzeit unter der gleichen Bedingung.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">sync_search</span>(<span class="hljs-params">num_queries</span>):
    start_time = time.time()
    <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_queries):
        query = VectorStoreQuery(
            query_embedding=[<span class="hljs-number">0.5</span>] * (DIM - <span class="hljs-number">1</span>) + [<span class="hljs-number">0.6</span>], similarity_top_k=<span class="hljs-number">3</span>
        )
        result = vector_store.query(query=query)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> query_counts:
    sync_time = sync_search(count)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Sync search for <span class="hljs-subst">{count}</span> queries took <span class="hljs-subst">{sync_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Sync search for 10 queries took 3.29 seconds
Sync search for 100 queries took 30.80 seconds
Sync search for 1000 queries took 308.80 seconds
</code></pre>
<p>Das Ergebnis zeigt, dass der synchrone Suchprozess viel langsamer ist als der asynchrone.</p>
