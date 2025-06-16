---
id: embeddings.md
order: 1
summary: Imparate a generare embeddings per i vostri dati.
title: Panoramica sull'incorporazione
---
<h1 id="Embedding-Overview" class="common-anchor-header">Panoramica sull'incorporazione<button data-href="#Embedding-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>L'embedding è un concetto di apprendimento automatico per la mappatura dei dati in uno spazio ad alta dimensionalità, in cui i dati di semantica simile sono collocati vicini. Essendo in genere una rete neurale profonda di BERT o di altre famiglie di trasformatori, il modello di embedding può rappresentare efficacemente la semantica di testo, immagini e altri tipi di dati con una serie di numeri noti come vettori. Una caratteristica fondamentale di questi modelli è che la distanza matematica tra i vettori nello spazio ad alta dimensionalità può indicare la somiglianza della semantica del testo o delle immagini originali. Questa proprietà sblocca molte applicazioni di information retrieval, come i motori di ricerca web come Google e Bing, la ricerca di prodotti e le raccomandazioni sui siti di e-commerce e il recente paradigma Retrieval Augmented Generation (RAG) nell'IA generativa.</p>
<p>Esistono due categorie principali di incorporazioni, ognuna delle quali produce un tipo diverso di vettore:</p>
<ul>
<li><p><strong>Incorporazione densa</strong>: La maggior parte dei modelli di embedding rappresenta le informazioni come un vettore in virgola mobile di centinaia o migliaia di dimensioni. L'output è chiamato vettori "densi", poiché la maggior parte delle dimensioni ha valori non nulli. Ad esempio, il popolare modello di embedding open-source BAAI/bge-base-en-v1.5 produce vettori di 768 numeri in virgola mobile (vettore float a 768 dimensioni).</p></li>
<li><p><strong>Incorporazione rada</strong>: Al contrario, i vettori di output degli incorporamenti sparsi hanno la maggior parte delle dimensioni pari a zero, ovvero vettori "sparsi". Questi vettori hanno spesso dimensioni molto più elevate (decine di migliaia o più), determinate dalla dimensione del vocabolario dei token. I vettori sparsi possono essere generati da reti neurali profonde o da analisi statistiche di corpora di testo. Grazie alla loro interpretabilità e alle migliori capacità di generalizzazione fuori dal dominio, gli embedding sparsi sono sempre più adottati dagli sviluppatori come complemento degli embedding densi.</p></li>
</ul>
<p>Milvus è un database vettoriale progettato per la gestione, l'archiviazione e il recupero di dati vettoriali. Grazie all'integrazione dei modelli di embedding e <a href="https://milvus.io/docs/rerankers-overview.md">reranking</a> tradizionali, è possibile trasformare facilmente il testo originale in vettori ricercabili o rerankare i risultati utilizzando modelli potenti per ottenere risultati più accurati per la RAG. Questa integrazione semplifica la trasformazione del testo ed elimina la necessità di componenti aggiuntivi di embedding o reranking, semplificando così lo sviluppo e la convalida delle RAG.</p>
<p>Per creare le incorporazioni in azione, vedere <a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/model/embedding_functions.ipynb">Utilizzo del modello di PyMilvus per generare incorporazioni di testo</a>.</p>
<table>
<thead>
<tr><th>Funzione di incorporamento</th><th>Tipo</th><th>API o Open-sourced</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/OpenAIEmbeddingFunction/OpenAIEmbeddingFunction.md">openai</a></td><td>Denso</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/SentenceTransformerEmbeddingFunction/SentenceTransformerEmbeddingFunction.md">trasformatore di frasi</a></td><td>Denso</td><td>Aperto</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/SpladeEmbeddingFunction/SpladeEmbeddingFunction.md">Splade</a></td><td>Sparse</td><td>In licenza libera</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/BGEM3EmbeddingFunction/BGEM3EmbeddingFunction.md">bge-m3</a></td><td>Ibrido</td><td>In licenza libera</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/VoyageEmbeddingFunction/VoyageEmbeddingFunction.md">voyageai</a></td><td>Denso</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/JinaEmbeddingFunction/JinaEmbeddingFunction.md">jina</a></td><td>Denso</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/CohereEmbeddingFunction/CohereEmbeddingFunction.md">cohere</a></td><td>Denso</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/InstructorEmbeddingFunction/InstructorEmbeddingFunction.md">Istruttore</a></td><td>Denso</td><td>Aperto</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/MistralAIEmbeddingFunction/MistralAIEmbeddingFunction.md">Mistral AI</a></td><td>Denso</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/NomicEmbeddingFunction/NomicEmbeddingFunction.md">Nomic</a></td><td>Denso</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/Model2VecEmbeddingFunction/Model2VecEmbeddingFunction.md">mGTE</a></td><td>Ibrido</td><td>Aperto</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/Model2VecEmbeddingFunction/Model2VecEmbeddingFunction.md">Modello2Vec</a></td><td>Ibrido</td><td>Con licenza aperta</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/GeminiEmbeddingFunction/GeminiEmbeddingFunction.md">Gemini</a></td><td>Ibrido</td><td>Privato</td></tr>
</tbody>
</table>
<h2 id="Example-1-Use-default-embedding-function-to-generate-dense-vectors" class="common-anchor-header">Esempio 1: Usare la funzione di embedding predefinita per generare vettori densi<button data-href="#Example-1-Use-default-embedding-function-to-generate-dense-vectors" class="anchor-icon" translate="no">
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
    </button></h2><p>Per utilizzare le funzioni di embedding con Milvus, occorre prima installare la libreria client PyMilvus con il sottopacchetto <code translate="no">model</code> che racchiude tutte le utilità per la generazione di embedding.</p>
<pre><code translate="no" class="language-python">pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Il sottopacchetto <code translate="no">model</code> supporta diversi modelli di embedding, da <a href="https://milvus.io/docs/embed-with-openai.md">OpenAI</a>, <a href="https://milvus.io/docs/embed-with-sentence-transform.md">Sentence Transformers</a>, <a href="https://milvus.io/docs/embed-with-bgm-m3.md">BGE M3</a>, fino ai modelli preaddestrati <a href="https://milvus.io/docs/embed-with-splade.md">SPLADE</a>. Per semplicità, questo esempio utilizza <code translate="no">DefaultEmbeddingFunction</code>, che è un modello di trasformatore di frasi <strong>interamente MiniLM-L6-v2</strong>; il modello ha una dimensione di circa 70 MB e verrà scaricato al primo utilizzo:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model

<span class="hljs-comment"># This will download &quot;all-MiniLM-L6-v2&quot;, a light weight model.</span>
ef = model.DefaultEmbeddingFunction()

<span class="hljs-comment"># Data from which embeddings are to be generated </span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

embeddings = ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, ef.dim, embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>L'output previsto è simile al seguente:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-<span class="hljs-number">3.09392996e-02</span>, -<span class="hljs-number">1.80662833e-02</span>,  <span class="hljs-number">1.34775648e-02</span>,  <span class="hljs-number">2.77156215e-02</span>,
       -<span class="hljs-number">4.86349640e-03</span>, -<span class="hljs-number">3.12581174e-02</span>, -<span class="hljs-number">3.55921760e-02</span>,  <span class="hljs-number">5.76934684e-03</span>,
        <span class="hljs-number">2.80773244e-03</span>,  <span class="hljs-number">1.35783911e-01</span>,  <span class="hljs-number">3.59678417e-02</span>,  <span class="hljs-number">6.17732145e-02</span>,
...
       -<span class="hljs-number">4.61330153e-02</span>, -<span class="hljs-number">4.85207550e-02</span>,  <span class="hljs-number">3.13997865e-02</span>,  <span class="hljs-number">7.82178566e-02</span>,
       -<span class="hljs-number">4.75336798e-02</span>,  <span class="hljs-number">5.21207601e-02</span>,  <span class="hljs-number">9.04406682e-02</span>, -<span class="hljs-number">5.36676683e-02</span>],
      dtype=float32)]
Dim: <span class="hljs-number">384</span> (<span class="hljs-number">384</span>,)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Example-2-Generate-dense-and-sparse-vectors-in-one-call-with-BGE-M3-model" class="common-anchor-header">Esempio 2: Generazione di vettori densi e radi in un'unica chiamata con il modello BGE M3<button data-href="#Example-2-Generate-dense-and-sparse-vectors-in-one-call-with-BGE-M3-model" class="anchor-icon" translate="no">
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
    </button></h2><p>In questo esempio, utilizziamo il modello ibrido <a href="https://milvus.io/docs/embed-with-bgm-m3.md">BGE M3</a> per incorporare il testo in vettori densi e radi e utilizzarli per recuperare i documenti rilevanti. I passaggi complessivi sono i seguenti:</p>
<ol>
<li><p>Incorporare il testo in vettori densi e radi utilizzando il modello BGE-M3;</p></li>
<li><p>Creare una collezione Milvus per memorizzare i vettori densi e sparsi;</p></li>
<li><p>Inserire i dati in Milvus;</p></li>
<li><p>Cercare e ispezionare il risultato.</p></li>
</ol>
<p>Per prima cosa, è necessario installare le dipendenze necessarie.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.hybrid <span class="hljs-keyword">import</span> BGEM3EmbeddingFunction
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    utility,
    FieldSchema, CollectionSchema, DataType,
    Collection, AnnSearchRequest, RRFRanker, connections,
)
<button class="copy-code-btn"></button></code></pre>
<p>Usare BGE M3 per codificare i documenti e le query per il recupero degli embedding.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 1. prepare a small corpus to search</span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
query = <span class="hljs-string">&quot;Who started AI research?&quot;</span>

<span class="hljs-comment"># BGE-M3 model can embed texts as dense and sparse vectors.</span>
<span class="hljs-comment"># It is included in the optional `model` module in pymilvus, to install it,</span>
<span class="hljs-comment"># simply run &quot;pip install pymilvus[model]&quot;.</span>

bge_m3_ef = BGEM3EmbeddingFunction(use_fp16=<span class="hljs-literal">False</span>, device=<span class="hljs-string">&quot;cpu&quot;</span>)

docs_embeddings = bge_m3_ef(docs)
query_embeddings = bge_m3_ef([query])
<button class="copy-code-btn"></button></code></pre>
