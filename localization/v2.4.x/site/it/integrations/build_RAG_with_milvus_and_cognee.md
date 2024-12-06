---
id: build_RAG_with_milvus_and_cognee.md
summary: >-
  In questo tutorial vi mostreremo come costruire una pipeline RAG
  (Retrieval-Augmented Generation) con Milvus e Cognee.
title: Costruire RAG con Milvus e Cognee
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/build_RAG_with_milvus_and_cognee.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/build_RAG_with_milvus_and_cognee.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h3 id="Build-RAG-with-Milvus-and-Cognee" class="common-anchor-header">Costruire RAG con Milvus e Cognee</h3><p><a href="https://www.cognee.ai">Cognee</a> è una piattaforma per sviluppatori che semplifica lo sviluppo di applicazioni AI con pipeline ECL (Extract, Cognify, Load) scalabili e modulari. Integrandosi perfettamente con Milvus, Cognee consente di collegare e recuperare in modo efficiente conversazioni, documenti e trascrizioni, riducendo le allucinazioni e ottimizzando i costi operativi.</p>
<p>Grazie al forte supporto per archivi vettoriali come Milvus, database a grafo e LLM, Cognee offre un framework flessibile e personalizzabile per la creazione di sistemi di generazione aumentata del reperimento (RAG). La sua architettura pronta per la produzione garantisce una maggiore precisione ed efficienza per le applicazioni basate sull'intelligenza artificiale.</p>
<p>In questo tutorial vi mostreremo come costruire una pipeline RAG (Retrieval-Augmented Generation) con Milvus e Cognee.</p>
<pre><code translate="no" class="language-shell">$ pip install pymilvus git+<span class="hljs-attr">https</span>:<span class="hljs-comment">//github.com/topoteretes/cognee.git</span>
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>Se si utilizza Google Colab, per abilitare le dipendenze appena installate, potrebbe essere necessario <strong>riavviare il runtime</strong> (fare clic sul menu "Runtime" nella parte superiore dello schermo e selezionare "Riavvia sessione" dal menu a discesa).</p>
</blockquote>
<p>Per impostazione predefinita, in questo esempio viene utilizzato OpenAI come LLM. È necessario preparare la <a href="https://platform.openai.com/docs/quickstart">chiave api</a> e impostarla nella funzione config <code translate="no">set_llm_api_key()</code>.</p>
<p>Per configurare Milvus come database vettoriale, impostare <code translate="no">VECTOR_DB_PROVIDER</code> su <code translate="no">milvus</code> e specificare <code translate="no">VECTOR_DB_URL</code> e <code translate="no">VECTOR_DB_KEY</code>. Poiché in questa demo utilizziamo Milvus Lite per memorizzare i dati, è necessario fornire solo <code translate="no">VECTOR_DB_URL</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

<span class="hljs-keyword">import</span> cognee

cognee.<span class="hljs-property">config</span>.<span class="hljs-title function_">set_llm_api_key</span>(<span class="hljs-string">&quot;YOUR_OPENAI_API_KEY&quot;</span>)


os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;VECTOR_DB_PROVIDER&quot;</span>] = <span class="hljs-string">&quot;milvus&quot;</span>
os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;VECTOR_DB_URL&quot;</span>] = <span class="hljs-string">&quot;./milvus.db&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Per quanto riguarda le variabili d'ambiente <code translate="no">VECTOR_DB_URL</code> e <code translate="no">VECTOR_DB_KEY</code>:</p>
<ul>
<li>L'impostazione di <code translate="no">VECTOR_DB_URL</code> come file locale, ad esempio<code translate="no">./milvus.db</code>, è il metodo più conveniente, poiché utilizza automaticamente <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> per memorizzare tutti i dati in questo file.</li>
<li>Se si dispone di una grande quantità di dati, è possibile configurare un server Milvus più performante su <a href="https://milvus.io/docs/quickstart.md">docker o kubernetes</a>. In questa configurazione, utilizzare l'uri del server, ad esempio<code translate="no">http://localhost:19530</code>, come <code translate="no">VECTOR_DB_URL</code>.</li>
<li>Se si desidera utilizzare <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, il servizio cloud completamente gestito da Milvus, è necessario impostare <code translate="no">VECTOR_DB_URL</code> e <code translate="no">VECTOR_DB_KEY</code>, che corrispondono all'<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">endpoint pubblico e alla chiave Api</a> di Zilliz Cloud.</li>
</ul>
<p></a></p>
<h3 id="Prepare-the-data" class="common-anchor-header">Preparare i dati</h3><p>Come conoscenza privata nel nostro RAG utilizziamo le pagine FAQ della <a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">Documentazione di Milvus 2.4.x</a>, una buona fonte di dati per una semplice pipeline RAG.</p>
<p>Scaricare il file zip ed estrarre i documenti nella cartella <code translate="no">milvus_docs</code>.</p>
<pre><code translate="no" class="language-shell">$ wget https://github.com/milvus-io/milvus-docs/releases/download/v2<span class="hljs-number">.4</span><span class="hljs-number">.6</span>-preview/milvus_docs_2<span class="hljs-number">.4</span>.x_en.<span class="hljs-built_in">zip</span>
$ unzip -q milvus_docs_2<span class="hljs-number">.4</span>.x_en.<span class="hljs-built_in">zip</span> -d milvus_docs
<button class="copy-code-btn"></button></code></pre>
<p>Carichiamo tutti i file markdown dalla cartella <code translate="no">milvus_docs/en/faq</code>. Per ogni documento, usiamo semplicemente &quot;# &quot; per separare il contenuto del file, che può separare approssimativamente il contenuto di ogni parte principale del file markdown.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []

<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()

    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-RAG" class="common-anchor-header">Creare RAG<button data-href="#Build-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Resetting-Cognee-Data" class="common-anchor-header">Ripristino dei dati di Cognee</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">await</span> cognee.prune.prune_data()
<span class="hljs-keyword">await</span> cognee.prune.prune_system(metadata=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Dopo aver fatto tabula rasa, possiamo aggiungere il nostro set di dati ed elaborarlo in un grafo della conoscenza.</p>
<h3 id="Adding-Data-and-Cognifying" class="common-anchor-header">Aggiungere i dati e cognificare</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">await</span> cognee.add(data=text_lines, dataset_name=<span class="hljs-string">&quot;milvus_faq&quot;</span>)
<span class="hljs-keyword">await</span> cognee.cognify()

<span class="hljs-comment"># [DocumentChunk(id=UUID(&#x27;6889e7ef-3670-555c-bb16-3eb50d1d30b0&#x27;), updated_at=datetime.datetime(2024, 12, 4, 6, 29, 46, 472907, tzinfo=datetime.timezone.utc), text=&#x27;Does the query perform in memory? What are incremental data and historical data?\n\nYes. When ...</span>
<span class="hljs-comment"># ...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Il metodo <code translate="no">add</code> carica il set di dati (Milvus FAQs) in Cognee e il metodo <code translate="no">cognify</code> elabora i dati per estrarre entità, relazioni e sommari, costruendo un grafo della conoscenza.</p>
<h3 id="Querying-for-Summaries" class="common-anchor-header">Interrogazione dei sommari</h3><p>Ora che i dati sono stati elaborati, interroghiamo il grafo della conoscenza.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> cognee.api.v1.search <span class="hljs-keyword">import</span> SearchType

query_text = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
search_results = <span class="hljs-keyword">await</span> cognee.search(SearchType.SUMMARIES, query_text=query_text)

<span class="hljs-built_in">print</span>(search_results[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'id': 'de5c6713-e079-5d0b-b11d-e9bacd1e0d73', 'text': 'Milvus stores two data types: inserted data and metadata.'}
</code></pre>
<p>Questa interrogazione cerca nel grafo della conoscenza un sommario correlato al testo dell'interrogazione e il candidato più correlato viene stampato.</p>
<h3 id="Querying-for-Chunks" class="common-anchor-header">Interrogazione per pezzi</h3><p>I riepiloghi offrono approfondimenti di alto livello, ma per ottenere dettagli più dettagliati è possibile interrogare pezzi specifici di dati direttamente dal set di dati elaborati. Questi pezzi sono derivati dai dati originali che sono stati aggiunti e analizzati durante la creazione del grafo della conoscenza.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> cognee.<span class="hljs-property">api</span>.<span class="hljs-property">v1</span>.<span class="hljs-property">search</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">SearchType</span>

query_text = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
search_results = <span class="hljs-keyword">await</span> cognee.<span class="hljs-title function_">search</span>(<span class="hljs-title class_">SearchType</span>.<span class="hljs-property">CHUNKS</span>, query_text=query_text)
<button class="copy-code-btn"></button></code></pre>
<p>Formattiamoli e visualizziamoli per una migliore leggibilità!</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">format_and_print</span>(<span class="hljs-params">data</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;ID:&quot;</span>, data[<span class="hljs-string">&quot;id&quot;</span>])
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\nText:\n&quot;</span>)
    paragraphs = data[<span class="hljs-string">&quot;text&quot;</span>].split(<span class="hljs-string">&quot;\n\n&quot;</span>)
    <span class="hljs-keyword">for</span> paragraph <span class="hljs-keyword">in</span> paragraphs:
        <span class="hljs-built_in">print</span>(paragraph.strip())
        <span class="hljs-built_in">print</span>()


format_and_print(search_results[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">ID: 4be01c4b-9ee5-541c-9b85-297883934ab3

Text:

Where does Milvus store data?

Milvus deals with two types of data, inserted data and metadata.

Inserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends, including [MinIO](https://min.io/), [AWS S3](https://aws.amazon.com/s3/?nc1=h_ls), [Google Cloud Storage](https://cloud.google.com/storage?hl=en#object-storage-for-companies-of-all-sizes) (GCS), [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs), [Alibaba Cloud OSS](https://www.alibabacloud.com/product/object-storage-service), and [Tencent Cloud Object Storage](https://www.tencentcloud.com/products/cos) (COS).

Metadata are generated within Milvus. Each Milvus module has its own metadata that are stored in etcd.

###
</code></pre>
<p>Nelle fasi precedenti, abbiamo interrogato il dataset Milvus FAQ per ottenere sia riepiloghi che pezzi specifici di dati. Se da un lato questo ha fornito approfondimenti dettagliati e informazioni granulari, dall'altro il set di dati era di grandi dimensioni, il che ha reso difficile visualizzare chiaramente le dipendenze all'interno del grafo della conoscenza.</p>
<p>Per risolvere questo problema, ripristineremo l'ambiente Cognee e lavoreremo con un set di dati più piccolo e mirato. Questo ci permetterà di mostrare meglio le relazioni e le dipendenze estratte durante il processo di cognificazione. Semplificando i dati, possiamo vedere chiaramente come Cognee organizza e struttura le informazioni nel grafo della conoscenza.</p>
<h3 id="Reset-Cognee" class="common-anchor-header">Resettare Cognee</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">await</span> cognee.prune.prune_data()
<span class="hljs-keyword">await</span> cognee.prune.prune_system(metadata=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Adding-the-Focused-Dataset" class="common-anchor-header">Aggiunta del set di dati focalizzato</h3><p>In questo caso, viene aggiunto ed elaborato un set di dati più piccolo con una sola riga di testo, per garantire un grafico della conoscenza mirato e facilmente interpretabile.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># We only use one line of text as the dataset, which simplifies the output later</span>
text = <span class="hljs-string">&quot;&quot;&quot;
    Natural language processing (NLP) is an interdisciplinary
    subfield of computer science and information retrieval.
    &quot;&quot;&quot;</span>

<span class="hljs-keyword">await</span> cognee.add(text)
<span class="hljs-keyword">await</span> cognee.cognify()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Querying-for-Insights" class="common-anchor-header">Interrogazione per gli approfondimenti</h3><p>Concentrandoci su questo set di dati più piccolo, possiamo ora analizzare chiaramente le relazioni e la struttura all'interno del grafico della conoscenza.</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;Tell me about NLP&quot;</span>
search_results = await cognee.search(SearchType.INSIGHTS, query_text=query_text)

<span class="hljs-keyword">for</span> result_text in search_results:
    <span class="hljs-built_in">print</span>(result_text)

# Example output:
# ({<span class="hljs-string">&#x27;id&#x27;</span>: UUID(<span class="hljs-string">&#x27;bc338a39-64d6-549a-acec-da60846dd90d&#x27;</span>), <span class="hljs-string">&#x27;updated_at&#x27;</span>: datetime.datetime(<span class="hljs-number">2024</span>, <span class="hljs-number">11</span>, <span class="hljs-number">21</span>, <span class="hljs-number">12</span>, <span class="hljs-number">23</span>, <span class="hljs-number">1</span>, <span class="hljs-number">211808</span>, tzinfo=datetime.timezone.utc), <span class="hljs-string">&#x27;name&#x27;</span>: <span class="hljs-string">&#x27;natural language processing&#x27;</span>, <span class="hljs-string">&#x27;description&#x27;</span>: <span class="hljs-string">&#x27;An interdisciplinary subfield of computer science and information retrieval.&#x27;</span>}, {<span class="hljs-string">&#x27;relationship_name&#x27;</span>: <span class="hljs-string">&#x27;is_a_subfield_of&#x27;</span>, <span class="hljs-string">&#x27;source_node_id&#x27;</span>: UUID(<span class="hljs-string">&#x27;bc338a39-64d6-549a-acec-da60846dd90d&#x27;</span>), <span class="hljs-string">&#x27;target_node_id&#x27;</span>: UUID(<span class="hljs-string">&#x27;6218dbab-eb6a-5759-a864-b3419755ffe0&#x27;</span>), <span class="hljs-string">&#x27;updated_at&#x27;</span>: datetime.datetime(<span class="hljs-number">2024</span>, <span class="hljs-number">11</span>, <span class="hljs-number">21</span>, <span class="hljs-number">12</span>, <span class="hljs-number">23</span>, <span class="hljs-number">15</span>, <span class="hljs-number">473137</span>, tzinfo=datetime.timezone.utc)}, {<span class="hljs-string">&#x27;id&#x27;</span>: UUID(<span class="hljs-string">&#x27;6218dbab-eb6a-5759-a864-b3419755ffe0&#x27;</span>), <span class="hljs-string">&#x27;updated_at&#x27;</span>: datetime.datetime(<span class="hljs-number">2024</span>, <span class="hljs-number">11</span>, <span class="hljs-number">21</span>, <span class="hljs-number">12</span>, <span class="hljs-number">23</span>, <span class="hljs-number">1</span>, <span class="hljs-number">211808</span>, tzinfo=datetime.timezone.utc), <span class="hljs-string">&#x27;name&#x27;</span>: <span class="hljs-string">&#x27;computer science&#x27;</span>, <span class="hljs-string">&#x27;description&#x27;</span>: <span class="hljs-string">&#x27;The study of computation and information processing.&#x27;</span>})
# (...)
#
# It represents nodes and relationships in the knowledge graph:
# - The first element is the source node (e.g., <span class="hljs-string">&#x27;natural language processing&#x27;</span>).
# - The second element is the relationship between nodes (e.g., <span class="hljs-string">&#x27;is_a_subfield_of&#x27;</span>).
# - The third element is the target node (e.g., <span class="hljs-string">&#x27;computer science&#x27;</span>).
<button class="copy-code-btn"></button></code></pre>
<p>Questo output rappresenta i risultati di una query sul grafo della conoscenza, che mostra le entità (nodi) e le loro relazioni (spigoli) estratte dal dataset elaborato. Ogni tupla include un'entità di origine, un tipo di relazione e un'entità di destinazione, insieme a metadati come ID univoci, descrizioni e timestamp. Il grafico evidenzia i concetti chiave e le loro connessioni semantiche, fornendo una comprensione strutturata del set di dati.</p>
<p>Complimenti, avete imparato l'uso di base di cognee con Milvus. Se volete conoscere un uso più avanzato di cognee, consultate la sua <a href="https://github.com/topoteretes/cognee">pagina</a> ufficiale.</p>
