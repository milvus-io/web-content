---
id: embeddings.md
order: 1
summary: 'Erfahren Sie, wie Sie Einbettungen für Ihre Daten erstellen können.'
title: Einbettung Überblick
---
<h1 id="Embedding-Overview" class="common-anchor-header">Einbettung Überblick<button data-href="#Embedding-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Embedding ist ein Konzept des maschinellen Lernens zur Abbildung von Daten in einem hochdimensionalen Raum, in dem Daten mit ähnlicher Semantik nahe beieinander angeordnet werden. Bei dem Einbettungsmodell handelt es sich in der Regel um ein Deep Neural Network von BERT oder anderen Transformer-Familien, das die Semantik von Text, Bildern und anderen Datentypen durch eine Reihe von Zahlen, die als Vektoren bezeichnet werden, effektiv darstellen kann. Ein wesentliches Merkmal dieser Modelle ist, dass der mathematische Abstand zwischen Vektoren im hochdimensionalen Raum die Ähnlichkeit der Semantik von Originaltexten oder -bildern anzeigen kann. Diese Eigenschaft ermöglicht zahlreiche Anwendungen für die Informationsbeschaffung, z. B. Web-Suchmaschinen wie Google und Bing, Produktsuche und -empfehlungen auf E-Commerce-Websites und das kürzlich populäre Paradigma Retrieval Augmented Generation (RAG) in der generativen KI.</p>
<p>Es gibt zwei Hauptkategorien von Einbettungen, die jeweils eine andere Art von Vektor erzeugen:</p>
<ul>
<li><p><strong>Dense Embedding</strong>: Die meisten Einbettungsmodelle stellen Informationen als Gleitkomma-Vektor mit Hunderten bis Tausenden von Dimensionen dar. Die Ausgabe wird als "dichte" Vektoren bezeichnet, da die meisten Dimensionen Nicht-Null-Werte haben. Das beliebte Open-Source-Einbettungsmodell BAAI/bge-base-de-v1.5 beispielsweise gibt Vektoren mit 768 Fließkommazahlen aus (768-dimensionaler Float-Vektor).</p></li>
<li><p><strong>Spärliche Einbettung</strong>: Im Gegensatz dazu haben die Ausgangsvektoren von spärlichen Einbettungen die meisten Dimensionen Null, nämlich "spärliche" Vektoren. Diese Vektoren haben oft viel höhere Dimensionen (Zehntausende oder mehr), was durch die Größe des Token-Vokabulars bestimmt wird. Sparse Vektoren können durch Deep Neural Networks oder statistische Analyse von Textkorpora erzeugt werden. Aufgrund ihrer Interpretierbarkeit und der beobachteten besseren Verallgemeinerungsfähigkeiten außerhalb der Domäne werden Sparse Embeddings von Entwicklern zunehmend als Ergänzung zu Dense Embeddings eingesetzt.</p></li>
</ul>
<p>Milvus ist eine Vektordatenbank, die für die Verwaltung, Speicherung und den Abruf von Vektordaten entwickelt wurde. Durch die Integration von Mainstream-Embedding- und <a href="https://milvus.io/docs/rerankers-overview.md">Reranking-Modellen</a> können Sie den Originaltext einfach in durchsuchbare Vektoren umwandeln oder die Ergebnisse mithilfe leistungsstarker Modelle ranken, um genauere Ergebnisse für RAG zu erzielen. Diese Integration vereinfacht die Textumwandlung und macht zusätzliche Komponenten für die Einbettung oder das Reranking überflüssig, wodurch die Entwicklung und Validierung von RAGs rationalisiert wird.</p>
<p>Um Einbettungen in Aktion zu erstellen, siehe <a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/model/embedding_functions.ipynb">Verwendung des PyMilvus-Modells zur Generierung von Texteinbettungen</a>.</p>
<table>
<thead>
<tr><th>Einbettung Funktion</th><th>Typ</th><th>API oder Open-Source</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/OpenAIEmbeddingFunction/OpenAIEmbeddingFunction.md">openai</a></td><td>Dichtes</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/SentenceTransformerEmbeddingFunction/SentenceTransformerEmbeddingFunction.md">Satzumwandler</a></td><td>Dicht</td><td>Open-Source</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/SpladeEmbeddingFunction/SpladeEmbeddingFunction.md">Splade</a></td><td>Spärlich</td><td>Open-sourced</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/BGEM3EmbeddingFunction/BGEM3EmbeddingFunction.md">bge-m3</a></td><td>Hybride</td><td>Open-source</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/VoyageEmbeddingFunction/VoyageEmbeddingFunction.md">voyageai</a></td><td>Dichtes</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/JinaEmbeddingFunction/JinaEmbeddingFunction.md">jina</a></td><td>Dichtes</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/CohereEmbeddingFunction/CohereEmbeddingFunction.md">kohärent</a></td><td>Dicht</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/InstructorEmbeddingFunction/InstructorEmbeddingFunction.md">Ausbilder</a></td><td>Dichtes</td><td>Open-Source</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/MistralAIEmbeddingFunction/MistralAIEmbeddingFunction.md">Mistral AI</a></td><td>Dicht</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/NomicEmbeddingFunction/NomicEmbeddingFunction.md">Nomic</a></td><td>Dichtes</td><td>API</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/Model2VecEmbeddingFunction/Model2VecEmbeddingFunction.md">mGTE</a></td><td>Hybride</td><td>Offen zugänglich</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/Model2VecEmbeddingFunction/Model2VecEmbeddingFunction.md">Model2Vec</a></td><td>Hybride</td><td>Open-sourced</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/EmbeddingModels/GeminiEmbeddingFunction/GeminiEmbeddingFunction.md">Gemini</a></td><td>Hybride</td><td>Privat</td></tr>
</tbody>
</table>
<h2 id="Example-1-Use-default-embedding-function-to-generate-dense-vectors" class="common-anchor-header">Beispiel 1: Verwendung der Standard-Einbettungsfunktion zur Erzeugung dichter Vektoren<button data-href="#Example-1-Use-default-embedding-function-to-generate-dense-vectors" class="anchor-icon" translate="no">
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
    </button></h2><p>Um Einbettungsfunktionen mit Milvus zu verwenden, installieren Sie zunächst die PyMilvus-Client-Bibliothek mit dem Unterpaket <code translate="no">model</code>, das alle Dienstprogramme für die Einbettungserzeugung enthält.</p>
<pre><code translate="no" class="language-python">pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Das Unterpaket <code translate="no">model</code> unterstützt verschiedene Einbettungsmodelle, von <a href="https://milvus.io/docs/embed-with-openai.md">OpenAI</a>, <a href="https://milvus.io/docs/embed-with-sentence-transform.md">Sentence Transformers</a>, <a href="https://milvus.io/docs/embed-with-bgm-m3.md">BGE M3</a> bis hin zu vortrainierten <a href="https://milvus.io/docs/embed-with-splade.md">SPLADE-Modellen</a>. Der Einfachheit halber wird in diesem Beispiel das Modell <code translate="no">DefaultEmbeddingFunction</code> verwendet, das ein <strong>reines MiniLM-L6-v2-Satztransformatormodell</strong> ist. Das Modell ist etwa 70 MB groß und wird bei der ersten Verwendung heruntergeladen:</p>
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
<p>Die erwartete Ausgabe ist ähnlich wie die folgende:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-<span class="hljs-number">3.09392996e-02</span>, -<span class="hljs-number">1.80662833e-02</span>,  <span class="hljs-number">1.34775648e-02</span>,  <span class="hljs-number">2.77156215e-02</span>,
       -<span class="hljs-number">4.86349640e-03</span>, -<span class="hljs-number">3.12581174e-02</span>, -<span class="hljs-number">3.55921760e-02</span>,  <span class="hljs-number">5.76934684e-03</span>,
        <span class="hljs-number">2.80773244e-03</span>,  <span class="hljs-number">1.35783911e-01</span>,  <span class="hljs-number">3.59678417e-02</span>,  <span class="hljs-number">6.17732145e-02</span>,
...
       -<span class="hljs-number">4.61330153e-02</span>, -<span class="hljs-number">4.85207550e-02</span>,  <span class="hljs-number">3.13997865e-02</span>,  <span class="hljs-number">7.82178566e-02</span>,
       -<span class="hljs-number">4.75336798e-02</span>,  <span class="hljs-number">5.21207601e-02</span>,  <span class="hljs-number">9.04406682e-02</span>, -<span class="hljs-number">5.36676683e-02</span>],
      dtype=float32)]
Dim: <span class="hljs-number">384</span> (<span class="hljs-number">384</span>,)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Example-2-Generate-dense-and-sparse-vectors-in-one-call-with-BGE-M3-model" class="common-anchor-header">Beispiel 2: Erzeugen von dichten und spärlichen Vektoren in einem Aufruf mit dem BGE M3-Modell<button data-href="#Example-2-Generate-dense-and-sparse-vectors-in-one-call-with-BGE-M3-model" class="anchor-icon" translate="no">
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
    </button></h2><p>In diesem Beispiel verwenden wir das <a href="https://milvus.io/docs/embed-with-bgm-m3.md">BGE M3-Hybridmodell</a>, um Text sowohl in dichte als auch in spärliche Vektoren einzubetten und sie zum Auffinden relevanter Dokumente zu verwenden. Die allgemeinen Schritte sind wie folgt:</p>
<ol>
<li><p>Einbettung des Textes in dichte und spärliche Vektoren mit dem BGE-M3-Modell;</p></li>
<li><p>Einrichten einer Milvus-Sammlung zum Speichern der dichten und spärlichen Vektoren;</p></li>
<li><p>Einfügen der Daten in Milvus;</p></li>
<li><p>Suchen und Prüfen des Ergebnisses.</p></li>
</ol>
<p>Zuerst müssen wir die notwendigen Abhängigkeiten installieren.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.hybrid <span class="hljs-keyword">import</span> BGEM3EmbeddingFunction
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    utility,
    FieldSchema, CollectionSchema, DataType,
    Collection, AnnSearchRequest, RRFRanker, connections,
)
<button class="copy-code-btn"></button></code></pre>
<p>Verwenden Sie BGE M3, um Dokumente und Abfragen für die Einbettung zu kodieren.</p>
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
