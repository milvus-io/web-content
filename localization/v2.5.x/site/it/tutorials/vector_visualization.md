---
id: vector_visualization.md
summary: >-
  In questo esempio, mostreremo come visualizzare le incorporazioni (vettori) in
  Milvus utilizzando t-SN.
title: Visualizzazione dei vettori
---
<h1 id="Vector-Visualization" class="common-anchor-header">Visualizzazione dei vettori<button data-href="#Vector-Visualization" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/vector_visualization.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/vector_visualization.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p>In questo esempio mostreremo come visualizzare le incorporazioni (vettori) in Milvus utilizzando <a href="https://www.wikiwand.com/en/articles/T-distributed_stochastic_neighbor_embedding">t-SNE</a>.</p>
<p>Le tecniche di riduzione della dimensionalità, come t-SNE, sono preziose per visualizzare dati complessi e altamente dimensionali in uno spazio 2D o 3D, preservando la struttura locale. Ciò consente il riconoscimento dei modelli, migliora la comprensione delle relazioni tra le caratteristiche e facilita l'interpretazione dei risultati dei modelli di apprendimento automatico. Inoltre, aiuta a valutare gli algoritmi confrontando visivamente i risultati del clustering, semplifica la presentazione dei dati a un pubblico non specializzato e può ridurre i costi computazionali lavorando con rappresentazioni a bassa dimensione. Grazie a queste applicazioni, t-SNE non solo aiuta a ottenere una visione più approfondita dei set di dati, ma supporta anche processi decisionali più informati.</p>
<h2 id="Preparation" class="common-anchor-header">Preparazione<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Dependencies-and-Environment" class="common-anchor-header">Dipendenze e ambiente</h3><pre><code translate="no" class="language-shell">$ pip install --upgrade pymilvus openai requests tqdm matplotlib seaborn
<button class="copy-code-btn"></button></code></pre>
<p>In questo esempio utilizzeremo il modello di embedding di OpenAI. È necessario preparare la chiave api OPENAI_API_KEY come variabile d'ambiente.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
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
    </button></h2><p>Utilizziamo le pagine delle FAQ della <a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">Documentazione</a> Milvus <a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">2.4.x</a> come conoscenza privata nel nostro RAG, che è una buona fonte di dati per una semplice pipeline RAG.</p>
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
<h2 id="Prepare-the-Embedding-Model" class="common-anchor-header">Preparare il modello di incorporamento<button data-href="#Prepare-the-Embedding-Model" class="anchor-icon" translate="no">
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
    </button></h2><p>Inizializziamo il client OpenAI per preparare il modello di incorporamento.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> <span class="hljs-title class_">OpenAI</span>

openai_client = <span class="hljs-title class_">OpenAI</span>()
<button class="copy-code-btn"></button></code></pre>
<p>Definire una funzione per generare embedding di testo utilizzando il client OpenAI. Utilizziamo il modello <a href="https://platform.openai.com/docs/guides/embeddings">text-embedding-3-large</a> come esempio.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">emb_text</span>(<span class="hljs-params">text</span>):
    <span class="hljs-keyword">return</span> (
        openai_client.embeddings.create(<span class="hljs-built_in">input</span>=text, model=<span class="hljs-string">&quot;text-embedding-3-large&quot;</span>)
        .data[<span class="hljs-number">0</span>]
        .embedding
    )
<button class="copy-code-btn"></button></code></pre>
<p>Generare un embedding di prova e stamparne la dimensione e i primi elementi.</p>
<pre><code translate="no" class="language-python">test_embedding = emb_text(<span class="hljs-string">&quot;This is a test&quot;</span>)
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">3072
[-0.015370666049420834, 0.00234124343842268, -0.01011690590530634, 0.044725317507982254, -0.017235849052667618, -0.02880779094994068, -0.026678944006562233, 0.06816216558218002, -0.011376636102795601, 0.021659553050994873]
</code></pre>
<h2 id="Load-data-into-Milvus" class="common-anchor-header">Caricare i dati in Milvus<button data-href="#Load-data-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-Collection" class="common-anchor-header">Creare la collezione</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>

milvus_client = <span class="hljs-title class_">MilvusClient</span>(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)

collection_name = <span class="hljs-string">&quot;my_rag_collection&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Come per l'argomento di <code translate="no">MilvusClient</code>:</p>
<ul>
<li>L'impostazione di <code translate="no">uri</code> come file locale, ad esempio<code translate="no">./milvus.db</code>, è il metodo più conveniente, poiché utilizza automaticamente <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> per memorizzare tutti i dati in questo file.</li>
<li>Se si dispone di una grande quantità di dati, è possibile configurare un server Milvus più performante su <a href="https://milvus.io/docs/quickstart.md">docker o kubernetes</a>. In questa configurazione, utilizzare l'uri del server, ad esempio<code translate="no">http://localhost:19530</code>, come <code translate="no">uri</code>.</li>
<li>Se si desidera utilizzare <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, il servizio cloud completamente gestito per Milvus, regolare <code translate="no">uri</code> e <code translate="no">token</code>, che corrispondono all'<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">endpoint pubblico e alla chiave Api</a> di Zilliz Cloud.</li>
</ul>
</div>
<p>Verificare se la raccolta esiste già e, in caso affermativo, eliminarla.</p>
<pre><code translate="no" class="language-python">if milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>Creare una nuova raccolta con i parametri specificati.</p>
<p>Se non si specifica alcun campo, Milvus creerà automaticamente un campo predefinito <code translate="no">id</code> per la chiave primaria e un campo <code translate="no">vector</code> per memorizzare i dati vettoriali. Un campo JSON riservato viene utilizzato per memorizzare campi non definiti da schemi e i loro valori.</p>
<pre><code translate="no" class="language-python">milvus_client.create_collection(
    collection_name=collection_name,
    dimension=embedding_dim,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Strong consistency level</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-data" class="common-anchor-header">Inserire i dati<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Si intersecano le righe di testo, si creano le incorporazioni e si inseriscono i dati in Milvus.</p>
<p>Ecco un nuovo campo <code translate="no">text</code>, che è un campo non definito nello schema della collezione. Verrà aggiunto automaticamente al campo dinamico JSON riservato, che può essere trattato come un campo normale ad alto livello.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []

<span class="hljs-keyword">for</span> i, line <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(tqdm(text_lines, desc=<span class="hljs-string">&quot;Creating embeddings&quot;</span>)):
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: emb_text(line), <span class="hljs-string">&quot;text&quot;</span>: line})

milvus_client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Creating embeddings: 100%|██████████| 72/72 [00:20&lt;00:00,  3.60it/s]





{'insert_count': 72, 'ids': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71], 'cost': 0}
</code></pre>
<h2 id="Visualizing-Embeddings-in-Vector-Search" class="common-anchor-header">Visualizzazione degli embeddings nella ricerca vettoriale<button data-href="#Visualizing-Embeddings-in-Vector-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>In questa sezione, eseguiamo una ricerca vettoriale e poi visualizziamo insieme il vettore della query e il vettore recuperato in una dimensione ridotta.</p>
<h3 id="Retrieve-Data-for-a-Query" class="common-anchor-header">Recuperare i dati per un'interrogazione</h3><p>Prepariamo una domanda per la ricerca.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Modify the question to test it with your own query!</span>

question = <span class="hljs-string">&quot;How is data stored in Milvus?&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Cerchiamo la domanda nella raccolta e recuperiamo le prime 10 corrispondenze semantiche.</p>
<pre><code translate="no" class="language-python">search_res = milvus_client.search(
    collection_name=collection_name,
    data=[
        emb_text(question)
    ],  <span class="hljs-comment"># Use the `emb_text` function to convert the question to an embedding vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># Return top 10 results</span>
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}},  <span class="hljs-comment"># Inner product distance</span>
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],  <span class="hljs-comment"># Return the text field</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Diamo un'occhiata ai risultati della ricerca della domanda</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json

retrieved_lines_with_distances = [
    (res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>], res[<span class="hljs-string">&quot;distance&quot;</span>]) <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> search_res[<span class="hljs-number">0</span>]
]
<span class="hljs-built_in">print</span>(json.dumps(retrieved_lines_with_distances, indent=<span class="hljs-number">4</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[
    [
        &quot; Where does Milvus store data?\n\nMilvus deals with two types of data, inserted data and metadata. \n\nInserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends, including [MinIO](https://min.io/), [AWS S3](https://aws.amazon.com/s3/?nc1=h_ls), [Google Cloud Storage](https://cloud.google.com/storage?hl=en#object-storage-for-companies-of-all-sizes) (GCS), [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs), [Alibaba Cloud OSS](https://www.alibabacloud.com/product/object-storage-service), and [Tencent Cloud Object Storage](https://www.tencentcloud.com/products/cos) (COS).\n\nMetadata are generated within Milvus. Each Milvus module has its own metadata that are stored in etcd.\n\n###&quot;,
        0.7675539255142212
    ],
    [
        &quot;How does Milvus handle vector data types and precision?\n\nMilvus supports Binary, Float32, Float16, and BFloat16 vector types.\n\n- Binary vectors: Store binary data as sequences of 0s and 1s, used in image processing and information retrieval.\n- Float32 vectors: Default storage with a precision of about 7 decimal digits. Even Float64 values are stored with Float32 precision, leading to potential precision loss upon retrieval.\n- Float16 and BFloat16 vectors: Offer reduced precision and memory usage. Float16 is suitable for applications with limited bandwidth and storage, while BFloat16 balances range and efficiency, commonly used in deep learning to reduce computational requirements without significantly impacting accuracy.\n\n###&quot;,
        0.6210848689079285
    ],
    [
        &quot;Does the query perform in memory? What are incremental data and historical data?\n\nYes. When a query request comes, Milvus searches both incremental data and historical data by loading them into memory. Incremental data are in the growing segments, which are buffered in memory before they reach the threshold to be persisted in storage engine, while historical data are from the sealed segments that are stored in the object storage. Incremental data and historical data together constitute the whole dataset to search.\n\n###&quot;,
        0.585393488407135
    ],
    [
        &quot;Why is there no vector data in etcd?\n\netcd stores Milvus module metadata; MinIO stores entities.\n\n###&quot;,
        0.579704999923706
    ],
    [
        &quot;How does Milvus flush data?\n\nMilvus returns success when inserted data are loaded to the message queue. However, the data are not yet flushed to the disk. Then Milvus' data node writes the data in the message queue to persistent storage as incremental logs. If `flush()` is called, the data node is forced to write all data in the message queue to persistent storage immediately.\n\n###&quot;,
        0.5777501463890076
    ],
    [
        &quot;What is the maximum dataset size Milvus can handle?\n\n  \nTheoretically, the maximum dataset size Milvus can handle is determined by the hardware it is run on, specifically system memory and storage:\n\n- Milvus loads all specified collections and partitions into memory before running queries. Therefore, memory size determines the maximum amount of data Milvus can query.\n- When new entities and and collection-related schema (currently only MinIO is supported for data persistence) are added to Milvus, system storage determines the maximum allowable size of inserted data.\n\n###&quot;,
        0.5655910968780518
    ],
    [
        &quot;Does Milvus support inserting and searching data simultaneously?\n\nYes. Insert operations and query operations are handled by two separate modules that are mutually independent. From the client\u2019s perspective, an insert operation is complete when the inserted data enters the message queue. However, inserted data are unsearchable until they are loaded to the query node. If the segment size does not reach the index-building threshold (512 MB by default), Milvus resorts to brute-force search and query performance may be diminished.\n\n###&quot;,
        0.5618637204170227
    ],
    [
        &quot;What data types does Milvus support on the primary key field?\n\nIn current release, Milvus supports both INT64 and string.\n\n###&quot;,
        0.5561620593070984
    ],
    [
        &quot;Is Milvus available for concurrent search?\n\nYes. For queries on the same collection, Milvus concurrently searches the incremental and historical data. However, queries on different collections are conducted in series. Whereas the historical data can be an extremely huge dataset, searches on the historical data are relatively more time-consuming and essentially performed in series.\n\n###&quot;,
        0.529681921005249
    ],
    [
        &quot;Can vectors with duplicate primary keys be inserted into Milvus?\n\nYes. Milvus does not check if vector primary keys are duplicates.\n\n###&quot;,
        0.528809666633606
    ]
]
</code></pre>
<h3 id="Dimensionality-reduction-to-2-d-by-t-SNE" class="common-anchor-header">Riduzione della dimensionalità a 2-d tramite t-SNE</h3><p>Riduciamo la dimensione delle incorporazioni a 2-d mediante t-SNE. Utilizzeremo la libreria <code translate="no">sklearn</code> per eseguire la trasformazione t-SNE.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
<span class="hljs-keyword">from</span> sklearn.manifold <span class="hljs-keyword">import</span> TSNE

data.append({<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-built_in">len</span>(data), <span class="hljs-string">&quot;vector&quot;</span>: emb_text(question), <span class="hljs-string">&quot;text&quot;</span>: question})
embeddings = []
<span class="hljs-keyword">for</span> gp <span class="hljs-keyword">in</span> data:
    embeddings.append(gp[<span class="hljs-string">&quot;vector&quot;</span>])

X = np.array(embeddings, dtype=np.float32)
tsne = TSNE(random_state=<span class="hljs-number">0</span>, max_iter=<span class="hljs-number">1000</span>)
tsne_results = tsne.fit_transform(X)

df_tsne = pd.DataFrame(tsne_results, columns=[<span class="hljs-string">&quot;TSNE1&quot;</span>, <span class="hljs-string">&quot;TSNE2&quot;</span>])
df_tsne
<button class="copy-code-btn"></button></code></pre>
<div>
<style scoped>
    .dataframe tbody tr th:only-of-type { vertical-align: middle; }<pre><code translate="no">.dataframe tbody tr th {
    vertical-align: top;
}

.dataframe thead th {
    text-align: right;
}
</code></pre>
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>TSNE1</th>
      <th>TSNE2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>-3.877362</td>
      <td>0.866726</td>
    </tr>
    <tr>
      <th>1</th>
      <td>-5.923084</td>
      <td>0.671701</td>
    </tr>
    <tr>
      <th>2</th>
      <td>-0.645954</td>
      <td>0.240083</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.444582</td>
      <td>1.222875</td>
    </tr>
    <tr>
      <th>4</th>
      <td>6.503896</td>
      <td>-4.984684</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>69</th>
      <td>6.354055</td>
      <td>1.264959</td>
    </tr>
    <tr>
      <th>70</th>
      <td>6.055961</td>
      <td>1.266211</td>
    </tr>
    <tr>
      <th>71</th>
      <td>-1.516003</td>
      <td>1.328765</td>
    </tr>
    <tr>
      <th>72</th>
      <td>3.971772</td>
      <td>-0.681780</td>
    </tr>
    <tr>
      <th>73</th>
      <td>3.971772</td>
      <td>-0.681780</td>
    </tr>
  </tbody>
</table>
<p>74 righe × 2 colonne</p>
</div>
<h3 id="Visualizing-Milvus-search-results-on-a-2d-plane" class="common-anchor-header">Visualizzazione dei risultati della ricerca Milvus su un piano 2d</h3><p>Il vettore di interrogazione è rappresentato in verde, i vettori recuperati in rosso e i vettori rimanenti in blu.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> matplotlib.pyplot <span class="hljs-keyword">as</span> plt
<span class="hljs-keyword">import</span> seaborn <span class="hljs-keyword">as</span> sns

<span class="hljs-comment"># Extract similar ids from search results</span>
similar_ids = [gp[<span class="hljs-string">&quot;id&quot;</span>] <span class="hljs-keyword">for</span> gp <span class="hljs-keyword">in</span> search_res[<span class="hljs-number">0</span>]]

df_norm = df_tsne[:-<span class="hljs-number">1</span>]

df_query = pd.DataFrame(df_tsne.iloc[-<span class="hljs-number">1</span>]).T

<span class="hljs-comment"># Filter points based on similar ids</span>
similar_points = df_tsne[df_tsne.index.isin(similar_ids)]

<span class="hljs-comment"># Create the plot</span>
fig, ax = plt.subplots(figsize=(<span class="hljs-number">8</span>, <span class="hljs-number">6</span>))  <span class="hljs-comment"># Set figsize</span>

<span class="hljs-comment"># Set the style of the plot</span>
sns.set_style(<span class="hljs-string">&quot;darkgrid&quot;</span>, {<span class="hljs-string">&quot;grid.color&quot;</span>: <span class="hljs-string">&quot;.6&quot;</span>, <span class="hljs-string">&quot;grid.linestyle&quot;</span>: <span class="hljs-string">&quot;:&quot;</span>})

<span class="hljs-comment"># Plot all points in blue</span>
sns.scatterplot(
    data=df_tsne, x=<span class="hljs-string">&quot;TSNE1&quot;</span>, y=<span class="hljs-string">&quot;TSNE2&quot;</span>, color=<span class="hljs-string">&quot;blue&quot;</span>, label=<span class="hljs-string">&quot;All knowledge&quot;</span>, ax=ax
)

<span class="hljs-comment"># Overlay similar points in red</span>
sns.scatterplot(
    data=similar_points,
    x=<span class="hljs-string">&quot;TSNE1&quot;</span>,
    y=<span class="hljs-string">&quot;TSNE2&quot;</span>,
    color=<span class="hljs-string">&quot;red&quot;</span>,
    label=<span class="hljs-string">&quot;Similar knowledge&quot;</span>,
    ax=ax,
)

sns.scatterplot(
    data=df_query, x=<span class="hljs-string">&quot;TSNE1&quot;</span>, y=<span class="hljs-string">&quot;TSNE2&quot;</span>, color=<span class="hljs-string">&quot;green&quot;</span>, label=<span class="hljs-string">&quot;Query&quot;</span>, ax=ax
)

<span class="hljs-comment"># Set plot titles and labels</span>
plt.title(<span class="hljs-string">&quot;Scatter plot of knowledge using t-SNE&quot;</span>)
plt.xlabel(<span class="hljs-string">&quot;TSNE1&quot;</span>)
plt.ylabel(<span class="hljs-string">&quot;TSNE2&quot;</span>)

<span class="hljs-comment"># Set axis to be equal</span>
plt.axis(<span class="hljs-string">&quot;equal&quot;</span>)

<span class="hljs-comment"># Display the legend</span>
plt.legend()

<span class="hljs-comment"># Show the plot</span>
plt.show()
<button class="copy-code-btn"></button></code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/vector_visualization_33_0.png" alt="png" class="doc-image" id="png" />
   </span> <span class="img-wrapper"> <span>png</span> </span></p>
<p>Come si può notare, il vettore di interrogazione è vicino ai vettori recuperati. Sebbene i vettori recuperati non rientrino in un cerchio standard con raggio fisso centrato sull'interrogazione, possiamo notare che sono comunque molto vicini al vettore dell'interrogazione sul piano 2D.</p>
<p>L'uso di tecniche di riduzione della dimensionalità può facilitare la comprensione dei vettori e la risoluzione dei problemi. Spero che questa esercitazione vi permetta di comprendere meglio i vettori.</p>
