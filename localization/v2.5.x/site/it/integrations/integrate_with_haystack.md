---
id: integrate_with_haystack.md
summary: >-
  Questa guida mostra come costruire un sistema RAG (Retrieval-Augmented
  Generation) utilizzando Haystack e Milvus.
title: Generazione Aumentata dal Recupero (RAG) con Milvus e Haystack
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/haystack/rag_with_milvus_and_haystack.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/haystack/rag_with_milvus_and_haystack.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Retrieval-Augmented-Generation-RAG-with-Milvus-and-Haystack" class="common-anchor-header">Generazione Aumentata dal Recupero (RAG) con Milvus e Haystack<button data-href="#Retrieval-Augmented-Generation-RAG-with-Milvus-and-Haystack" class="anchor-icon" translate="no">
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
    </button></h1><p>Questa guida mostra come costruire un sistema di Retrieval-Augmented Generation (RAG) utilizzando Haystack e Milvus.</p>
<p>Il sistema RAG combina un sistema di recupero con un modello generativo per generare nuovo testo sulla base di un prompt dato. Il sistema recupera prima i documenti rilevanti da un corpus utilizzando Milvus e poi utilizza un modello generativo per generare nuovo testo sulla base dei documenti recuperati.</p>
<p><a href="https://haystack.deepset.ai/">Haystack</a> è il framework Python open source di deepset per la creazione di applicazioni personalizzate con modelli linguistici di grandi dimensioni (LLM). <a href="https://milvus.io/">Milvus</a> è il database vettoriale open source più avanzato al mondo, costruito per alimentare le applicazioni di ricerca di similarità e di intelligenza artificiale.</p>
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
    </button></h2><p>Prima di eseguire questo notebook, assicuratevi di aver installato le seguenti dipendenze:</p>
<pre><code translate="no" class="language-python">! pip install --upgrade --quiet pymilvus milvus-haystack markdown-it-py mdit_plain
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Se si utilizza Google Colab, per abilitare le dipendenze appena installate potrebbe essere necessario <strong>riavviare il runtime</strong> (fare clic sul menu "Runtime" nella parte superiore dello schermo e selezionare "Restart session" dal menu a discesa).</p>
</div>
<p>Utilizzeremo i modelli di OpenAI. È necessario preparare la <a href="https://platform.openai.com/docs/quickstart">chiave api</a> <code translate="no">OPENAI_API_KEY</code> come variabile d'ambiente.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prepare-the-data" class="common-anchor-header">Preparare i dati<button data-href="#Prepare-the-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizziamo un contenuto online su <a href="https://www.gutenberg.org/cache/epub/7785/pg7785.txt">Leonardo Da Vinci</a> come archivio di conoscenze private per la nostra pipeline RAG, che è una buona fonte di dati per una pipeline RAG semplice.</p>
<p>Scaricarlo e salvarlo come file di testo locale.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">import</span> urllib.request

url = <span class="hljs-string">&quot;https://www.gutenberg.org/cache/epub/7785/pg7785.txt&quot;</span>
file_path = <span class="hljs-string">&quot;./davinci.txt&quot;</span>

<span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> os.path.exists(file_path):
    urllib.request.urlretrieve(url, file_path)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-the-indexing-Pipeline" class="common-anchor-header">Creare la pipeline di indicizzazione<button data-href="#Create-the-indexing-Pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>Creare una pipeline di indicizzazione che converta il testo in documenti, li divida in frasi e li inserisca. I documenti vengono poi scritti nell'archivio documenti di Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> haystack <span class="hljs-keyword">import</span> Pipeline
<span class="hljs-keyword">from</span> haystack.components.converters <span class="hljs-keyword">import</span> MarkdownToDocument
<span class="hljs-keyword">from</span> haystack.components.embedders <span class="hljs-keyword">import</span> OpenAIDocumentEmbedder, OpenAITextEmbedder
<span class="hljs-keyword">from</span> haystack.components.preprocessors <span class="hljs-keyword">import</span> DocumentSplitter
<span class="hljs-keyword">from</span> haystack.components.writers <span class="hljs-keyword">import</span> DocumentWriter
<span class="hljs-keyword">from</span> haystack.utils <span class="hljs-keyword">import</span> Secret

<span class="hljs-keyword">from</span> milvus_haystack <span class="hljs-keyword">import</span> MilvusDocumentStore
<span class="hljs-keyword">from</span> milvus_haystack.milvus_embedding_retriever <span class="hljs-keyword">import</span> MilvusEmbeddingRetriever


document_store = MilvusDocumentStore(
    connection_args={<span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;./milvus.db&quot;</span>},
    <span class="hljs-comment"># connection_args={&quot;uri&quot;: &quot;http://localhost:19530&quot;},</span>
    <span class="hljs-comment"># connection_args={&quot;uri&quot;: YOUR_ZILLIZ_CLOUD_URI, &quot;token&quot;: Secret.from_env_var(&quot;ZILLIZ_CLOUD_API_KEY&quot;)},</span>
    drop_old=<span class="hljs-literal">False</span>,
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Per i connection_args:</p>
<ul>
<li>L'impostazione di <code translate="no">uri</code> come file locale, ad esempio<code translate="no">./milvus.db</code>, è il metodo più conveniente, poiché utilizza automaticamente <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> per memorizzare tutti i dati in questo file.</li>
<li>Se si dispone di una grande quantità di dati, è possibile configurare un server Milvus più performante su <a href="https://milvus.io/docs/quickstart.md">docker o kubernetes</a>. In questa configurazione, utilizzare l'uri del server, ad esempio<code translate="no">http://localhost:19530</code>, come <code translate="no">uri</code>.</li>
<li>Se si desidera utilizzare <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, il servizio cloud completamente gestito per Milvus, regolare <code translate="no">uri</code> e <code translate="no">token</code>, che corrispondono all'<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">endpoint pubblico e alla chiave Api</a> di Zilliz Cloud.</li>
</ul>
</div>
<pre><code translate="no" class="language-python">indexing_pipeline = Pipeline()
indexing_pipeline.add_component(<span class="hljs-string">&quot;converter&quot;</span>, MarkdownToDocument())
indexing_pipeline.add_component(
    <span class="hljs-string">&quot;splitter&quot;</span>, DocumentSplitter(split_by=<span class="hljs-string">&quot;sentence&quot;</span>, split_length=<span class="hljs-number">2</span>)
)
indexing_pipeline.add_component(<span class="hljs-string">&quot;embedder&quot;</span>, OpenAIDocumentEmbedder())
indexing_pipeline.add_component(<span class="hljs-string">&quot;writer&quot;</span>, DocumentWriter(document_store))
indexing_pipeline.connect(<span class="hljs-string">&quot;converter&quot;</span>, <span class="hljs-string">&quot;splitter&quot;</span>)
indexing_pipeline.connect(<span class="hljs-string">&quot;splitter&quot;</span>, <span class="hljs-string">&quot;embedder&quot;</span>)
indexing_pipeline.connect(<span class="hljs-string">&quot;embedder&quot;</span>, <span class="hljs-string">&quot;writer&quot;</span>)
indexing_pipeline.run({<span class="hljs-string">&quot;converter&quot;</span>: {<span class="hljs-string">&quot;sources&quot;</span>: [file_path]}})

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Number of documents:&quot;</span>, document_store.count_documents())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Converting markdown files to Documents: 100%|█| 1/
Calculating embeddings: 100%|█| 9/9 [00:05&lt;00:00, 
E20240516 10:40:32.945937 5309095 milvus_local.cpp:189] [SERVER][GetCollection][] Collecton HaystackCollection not existed
E20240516 10:40:32.946677 5309095 milvus_local.cpp:189] [SERVER][GetCollection][] Collecton HaystackCollection not existed
E20240516 10:40:32.946704 5309095 milvus_local.cpp:189] [SERVER][GetCollection][] Collecton HaystackCollection not existed
E20240516 10:40:32.946725 5309095 milvus_local.cpp:189] [SERVER][GetCollection][] Collecton HaystackCollection not existed


Number of documents: 277
</code></pre>
<h2 id="Create-the-retrieval-pipeline" class="common-anchor-header">Creare la pipeline di recupero<button data-href="#Create-the-retrieval-pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>Creare una pipeline di recupero che recuperi i documenti dall'archivio documenti di Milvus utilizzando un motore di ricerca a similarità vettoriale.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&#x27;Where is the painting &quot;Warrior&quot; currently stored?&#x27;</span>

retrieval_pipeline = Pipeline()
retrieval_pipeline.add_component(<span class="hljs-string">&quot;embedder&quot;</span>, OpenAITextEmbedder())
retrieval_pipeline.add_component(
    <span class="hljs-string">&quot;retriever&quot;</span>, MilvusEmbeddingRetriever(document_store=document_store, top_k=<span class="hljs-number">3</span>)
)
retrieval_pipeline.connect(<span class="hljs-string">&quot;embedder&quot;</span>, <span class="hljs-string">&quot;retriever&quot;</span>)

retrieval_results = retrieval_pipeline.run({<span class="hljs-string">&quot;embedder&quot;</span>: {<span class="hljs-string">&quot;text&quot;</span>: question}})

<span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> retrieval_results[<span class="hljs-string">&quot;retriever&quot;</span>][<span class="hljs-string">&quot;documents&quot;</span>]:
    <span class="hljs-built_in">print</span>(doc.content)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;-&quot;</span> * <span class="hljs-number">10</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">). The
composition of this oil-painting seems to have been built up on the
second cartoon, which he had made some eight years earlier, and which
was apparently taken to France in 1516 and ultimately lost.
----------

This &quot;Baptism of Christ,&quot; which is now in the Accademia in Florence
and is in a bad state of preservation, appears to have been a
comparatively early work by Verrocchio, and to have been painted
in 1480-1482, when Leonardo would be about thirty years of age.

To about this period belongs the superb drawing of the &quot;Warrior,&quot; now
in the Malcolm Collection in the British Museum.
----------
&quot; Although he
completed the cartoon, the only part of the composition which he
eventually executed in colour was an incident in the foreground
which dealt with the &quot;Battle of the Standard.&quot; One of the many
supposed copies of a study of this mural painting now hangs on the
south-east staircase in the Victoria and Albert Museum.
----------
</code></pre>
<h2 id="Create-the-RAG-pipeline" class="common-anchor-header">Creare la pipeline RAG<button data-href="#Create-the-RAG-pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>Creare una pipeline RAG che combini MilvusEmbeddingRetriever e OpenAIGenerator per rispondere alla domanda utilizzando i documenti recuperati.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> haystack.utils <span class="hljs-keyword">import</span> Secret
<span class="hljs-keyword">from</span> haystack.components.builders <span class="hljs-keyword">import</span> PromptBuilder
<span class="hljs-keyword">from</span> haystack.components.generators <span class="hljs-keyword">import</span> OpenAIGenerator

prompt_template = <span class="hljs-string">&quot;&quot;&quot;Answer the following query based on the provided context. If the context does
                     not include an answer, reply with &#x27;I don&#x27;t know&#x27;.\n
                     Query: {{query}}
                     Documents:
                     {% for doc in documents %}
                        {{ doc.content }}
                     {% endfor %}
                     Answer:
                  &quot;&quot;&quot;</span>

rag_pipeline = Pipeline()
rag_pipeline.add_component(<span class="hljs-string">&quot;text_embedder&quot;</span>, OpenAITextEmbedder())
rag_pipeline.add_component(
    <span class="hljs-string">&quot;retriever&quot;</span>, MilvusEmbeddingRetriever(document_store=document_store, top_k=<span class="hljs-number">3</span>)
)
rag_pipeline.add_component(<span class="hljs-string">&quot;prompt_builder&quot;</span>, PromptBuilder(template=prompt_template))
rag_pipeline.add_component(
    <span class="hljs-string">&quot;generator&quot;</span>,
    OpenAIGenerator(
        api_key=Secret.from_token(os.getenv(<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>)),
        generation_kwargs={<span class="hljs-string">&quot;temperature&quot;</span>: <span class="hljs-number">0</span>},
    ),
)
rag_pipeline.connect(<span class="hljs-string">&quot;text_embedder.embedding&quot;</span>, <span class="hljs-string">&quot;retriever.query_embedding&quot;</span>)
rag_pipeline.connect(<span class="hljs-string">&quot;retriever.documents&quot;</span>, <span class="hljs-string">&quot;prompt_builder.documents&quot;</span>)
rag_pipeline.connect(<span class="hljs-string">&quot;prompt_builder&quot;</span>, <span class="hljs-string">&quot;generator&quot;</span>)

results = rag_pipeline.run(
    {
        <span class="hljs-string">&quot;text_embedder&quot;</span>: {<span class="hljs-string">&quot;text&quot;</span>: question},
        <span class="hljs-string">&quot;prompt_builder&quot;</span>: {<span class="hljs-string">&quot;query&quot;</span>: question},
    }
)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;RAG answer:&quot;</span>, results[<span class="hljs-string">&quot;generator&quot;</span>][<span class="hljs-string">&quot;replies&quot;</span>][<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">RAG answer: The painting &quot;Warrior&quot; is currently stored in the Malcolm Collection in the British Museum.
</code></pre>
<p>Per ulteriori informazioni su come utilizzare milvus-haystack, consultare il <a href="https://github.com/milvus-io/milvus-haystack">Readme di milvus-haystack</a>.</p>
