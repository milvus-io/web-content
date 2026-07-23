---
id: hugging-face-ranker.md
title: Hugging Face RankerCompatible with Milvus v2.6.20+
summary: >-
  In diesem Thema wird beschrieben, wie man Milvus-Suchergebnisse mithilfe von
  gehosteten Hugging-Face-Modellen zur Satzähnlichkeit neu gewichtet.
beta: Milvus v2.6.20+
---
<h1 id="Hugging-Face-Ranker" class="common-anchor-header">Hugging Face Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.20+</span><button data-href="#Hugging-Face-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>Die Vektorsuche sortiert die Ergebnisse nach dem Vektorabstand, doch die anfängliche Reihenfolge spiegelt möglicherweise nicht wider, wie gut der Text der einzelnen Kandidaten die Suchanfrage beantwortet. Hugging Face Ranker sendet die Suchanfrage und die Kandidatentexte an gehostete <a href="https://huggingface.co/docs/inference-providers/index">Hugging Face Inference Provider</a> und verwendet die Ergebnisse von „ <code translate="no">sentence-similarity</code> “, um die von Milvus zurückgegebenen Kandidaten neu zu ordnen.</p>
<p>Diese Integration nutzt den gehosteten Hugging Face-Router. Informationen zur Neureihenfolge mit einem separat bereitgestellten Text Embeddings Inference (TEI)-Dienst finden Sie unter <a href="/docs/de/tei-ranker.md">TEI Ranker</a>.</p>
<h2 id="Limits" class="common-anchor-header">Einschränkungen<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li>Die Funktion muss genau auf ein nicht-nullfähiges Feld „ <code translate="no">VARCHAR</code> “ in „ <code translate="no">input_field_names</code> “ verweisen.</li>
<li>Die Anzahl der Zeichenfolgen in „ <code translate="no">queries</code> “ muss der Anzahl der Suchanfragen (<code translate="no">nq</code>) entsprechen.</li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">So funktioniert es<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/hugging-face-ranker-flow.png" alt="Hugging Face Ranker workflow" class="doc-image" id="hugging-face-ranker-workflow" /> 
   <span>Hugging Face Ranker-Workflow</span>
  
 </span></p>
<p>Hugging Face Ranker wird nach der anfänglichen Vektorsuche ausgeführt:</p>
<ol>
<li><strong>Kandidatenentitäten abrufen.</strong> Milvus durchsucht das konfigurierte Vektorfeld und sammelt Kandidatenentitäten.</li>
<li><strong>Vorbereitung des Textes für die Neureihung.</strong> Die Funktion liest den Abfragetext aus „ <code translate="no">params.queries</code> “ und den Kandidaten-Text aus dem Feld „ <code translate="no">VARCHAR</code> “, das unter „ <code translate="no">input_field_names</code> “ angegeben ist.</li>
<li><strong>Anforderung von Ähnlichkeitswerten.</strong> Milvus sendet die Abfrage als „ <code translate="no">source_sentence</code> “ und die Kandidatentexte als „ <code translate="no">sentences</code> “ über „ <code translate="no">hf-inference</code> “ an die Hugging Face-Pipeline „ <code translate="no">sentence-similarity</code> “.</li>
<li><strong>Neubewertung der Kandidaten.</strong> Hugging Face gibt einen Wert pro Kandidaten zurück. Milvus ordnet die Kandidaten vom höchsten zum niedrigsten Wert und gibt die neu sortierten Ergebnisse zurück.</li>
</ol>
<p><strong>So werden Ähnlichkeitswerte berechnet</strong></p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/hugging-face-ranker-scoring.png" alt="How Hugging Face Ranker calculates similarity scores" class="doc-image" id="how-hugging-face-ranker-calculates-similarity-scores" /> 
   <span>Wie der Hugging Face Ranker Ähnlichkeitswerte berechnet</span>
  
 </span></p>
<p>Das Hugging-Face-Modell berechnet die Werte in drei Schritten:</p>
<ol>
<li><strong>Vorbereitung der Texteingaben.</strong> Der Ranker liest den Suchtext aus „ <code translate="no">params.queries</code> “ und den Kandidatentext aus dem konfigurierten Feld „ <code translate="no">VARCHAR</code> “ ein.</li>
<li><strong>Erstellen separater Modellrepräsentationen.</strong> Milvus sendet die Suchanfrage als „ <code translate="no">source_sentence</code> “ und die Kandidatentexte als „ <code translate="no">sentences</code> “. Das Modell kodiert die Suchanfrage und jeden Kandidaten intern separat.</li>
<li><strong>Vergleichen und Rückgabe von Bewertungen.</strong> Das Modell vergleicht die Abfragedarstellung mit jeder Kandidatendarstellung und gibt pro Kandidat eine Ähnlichkeitsbewertung zurück.</li>
</ol>
<p>Die vom Hugging-Face-Modell verwendeten Einbettungen oder Darstellungen sind Teil der internen Modellverarbeitung. Hugging Face gibt Bewertungen zurück, keine Vektoren. Die anfängliche Vektorabfrage und die Modell-Neurangfolge verwenden daher separate Darstellungen und können unterschiedliche Modelle nutzen.</p>
<h2 id="Before-you-start" class="common-anchor-header">Bevor Sie beginnen<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>Bevor Sie Hugging Face Ranker verwenden, stellen Sie sicher, dass Sie über Folgendes verfügen:</p>
<ul>
<li>Milvus 2.6.20 oder höher aus der 2.6-Release-Reihe.</li>
<li>PyMilvus 2.6.16 oder höher.</li>
<li>Ein Hugging Face-Benutzerzugriffstoken, mit dem Inferenz-Provider aufgerufen werden können.</li>
<li>Ein Modell, das derzeit von <code translate="no">hf-inference</code> für die <a href="https://huggingface.co/tasks/sentence-similarity"><code translate="no">sentence-similarity</code></a> Aufgabe bereitgestellt wird.</li>
<li>Eine Sammlung, die Textvorschläge in einem nicht-nullfähigen „ <code translate="no">VARCHAR</code> “-Feld speichert.</li>
</ul>
<div class="alert note">
<p>Milvus hat keinen Einfluss darauf, ob ein Hugging-Face-Modell über <code translate="no">hf-inference</code> weiterhin verfügbar bleibt oder ob das Modell Ihre Anforderungen an Stabilität, Latenz und Ausgabequalität erfüllt. Überprüfen Sie das Modell auf Hugging Face und bewerten Sie es im Hinblick auf Ihre Arbeitslast, bevor Sie es in der Produktion einsetzen.</p>
</div>
<p>Die Beispiele dienen <a href="https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2"><code translate="no">sentence-transformers/all-MiniLM-L6-v2</code></a> lediglich zur Veranschaulichung der Konfiguration. Das Modell stellt keine Empfehlung oder Zertifizierung durch Milvus dar.</p>
<h2 id="Configure-credentials" class="common-anchor-header">Anmeldedaten konfigurieren<button data-href="#Configure-credentials" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können das Hugging-Face-Benutzerzugriffstoken unter <code translate="no">milvus.yaml</code> oder über eine Umgebungsvariable konfigurieren.</p>
<p>Die Priorität der Anmeldedaten ist wie folgt:</p>
<pre><code translate="no" class="language-text">Function credential label -&gt; provider credential label in milvus.yaml -&gt; environment variable
<button class="copy-code-btn"></button></code></pre>
<h3 id="Option-1-Configuration-file" class="common-anchor-header">Option 1: Konfigurationsdatei<button data-href="#Option-1-Configuration-file" class="anchor-icon" translate="no">
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
    </button></h3><p>Definieren Sie das Token im obersten Abschnitt „ <code translate="no">credential</code> “ und verweisen Sie den Hugging Face-Ranker-Anbieter anschließend auf das Anmeldeinformationen-Label:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">huggingface_apikey:</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_HUGGING_FACE_TOKEN&gt;</span>

<span class="hljs-attr">function:</span>
  <span class="hljs-attr">rerank:</span>
    <span class="hljs-attr">model:</span>
      <span class="hljs-attr">providers:</span>
        <span class="hljs-attr">huggingface:</span>
          <span class="hljs-attr">credential:</span> <span class="hljs-string">huggingface_apikey</span>
          <span class="hljs-comment"># url: https://router.huggingface.co</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ein „ <code translate="no">credential</code> “-Parameter auf Funktionsebene kann das Label auf Anbieterebene überschreiben. Sein Wert muss ein in „ <code translate="no">milvus.yaml</code> “ definiertes Anmelde-Label sein, nicht das Token selbst.</p>
<h3 id="Option-2-Environment-variable" class="common-anchor-header">Option 2: Umgebungsvariable<button data-href="#Option-2-Environment-variable" class="anchor-icon" translate="no">
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
    </button></h3><p>Wenn weder in der Funktions- noch in der Anbieter-Konfiguration ein Anmelde-Label angegeben ist, legen Sie „ <code translate="no">MILVUS_HUGGINGFACE_API_KEY</code> “ in der Milvus-Service-Umgebung fest:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-attr">MILVUS_HUGGINGFACE_API_KEY:</span> <span class="hljs-string">&lt;YOUR_HUGGING_FACE_TOKEN&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-Hugging-Face-Ranker" class="common-anchor-header">Verwenden Sie den Hugging Face Ranker<button data-href="#Use-Hugging-Face-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Hugging Face Ranker wird zum Zeitpunkt der Suche definiert und angewendet. Sie können den Ranker für jede Suche ändern oder weglassen, ohne das Schema der Sammlung zu ändern.</p>
<h3 id="Step-1-Prepare-a-collection" class="common-anchor-header">Schritt 1: Eine Sammlung vorbereiten<button data-href="#Step-1-Prepare-a-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Im folgenden Beispiel wird eine Sammlung mit einem Textfeld für die Neurangfolge und einem Vektorfeld für die anfängliche Abfrage erstellt:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

collection_name = <span class="hljs-string">&quot;hugging_face_rerank_demo&quot;</span>
schema = client.create_schema()
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
)

client.insert(
    collection_name=collection_name,
    data=[
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;Recent renewable energy developments include improved solar efficiency.&quot;</span>,
            <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.10</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.40</span>],
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;Climate policy and carbon markets have evolved rapidly in recent years.&quot;</span>,
            <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.11</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.28</span>, <span class="hljs-number">0.39</span>],
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;New battery technology helps stabilize wind and solar power generation.&quot;</span>,
            <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.90</span>, <span class="hljs-number">0.10</span>, <span class="hljs-number">0.05</span>, <span class="hljs-number">0.02</span>],
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;Vector databases support similarity search for machine learning applications.&quot;</span>,
            <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.01</span>, <span class="hljs-number">0.02</span>, <span class="hljs-number">0.03</span>, <span class="hljs-number">0.04</span>],
        },
    ],
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Define-the-rerank-Function" class="common-anchor-header">Schritt 2: Definieren Sie die Reranking-Funktion<button data-href="#Step-2-Define-the-rerank-Function" class="anchor-icon" translate="no">
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
    </button></h3><p>Definieren Sie eine „ <code translate="no">RERANK</code> “-Funktion, die den Kandidatentext aus „ <code translate="no">document</code> “ liest und den Abfragetext aus „ <code translate="no">queries</code> “ verwendet:</p>
<pre><code translate="no" class="language-python">hugging_face_ranker = Function(
    name=<span class="hljs-string">&quot;hugging_face_semantic_ranker&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],
    function_type=FunctionType.RERANK,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;huggingface&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;sentence-transformers/all-MiniLM-L6-v2&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;hf_provider&quot;</span>: <span class="hljs-string">&quot;hf-inference&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;renewable energy developments&quot;</span>],</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;credential&quot;</span>: <span class="hljs-string">&quot;huggingface_apikey&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;max_client_batch_size&quot;</span>: <span class="hljs-number">32</span>,</span>
<span class="highlighted-comment-line">    },</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Wenn Sie nur die Anmeldedaten auf Anbieterebene oder die Umgebungsvariable verwenden, lassen Sie „ <code translate="no">credential</code> “ in den Funktionsparametern weg.</p>
<p>Die folgende Tabelle beschreibt die Parameter des Hugging Face Rankers:</p>
<table>
<thead>
<tr><th>Parameter</th><th>Erforderlich?</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">reranker</code></td><td>Ja</td><td>Die Reranking-Implementierung. Setzen Sie diesen Wert auf „ <code translate="no">model</code> “.</td></tr>
<tr><td><code translate="no">provider</code></td><td>Ja</td><td>Der Modellanbieter. Setzen Sie diesen Wert auf „ <code translate="no">huggingface</code> “.</td></tr>
<tr><td><code translate="no">model_name</code></td><td>Ja</td><td>Die Hugging-Face-Modell-ID für ein Modell, das über <code translate="no">hf-inference</code> für die Aufgabe „ <code translate="no">sentence-similarity</code> “ bereitgestellt wird.</td></tr>
<tr><td><code translate="no">queries</code></td><td>Ja</td><td>Für die Neureihung verwendete Abfragezeichenfolgen. Geben Sie genau eine Zeichenfolge pro Suchanfrage an, auch wenn bei der anfänglichen Abfrage Abfragevektoren verwendet werden.</td></tr>
<tr><td><code translate="no">hf_provider</code></td><td>Nein</td><td>Die Route des Hugging Face Inference Providers. Der Standardwert und der einzige in Milvus 2.6.20 unterstützte Wert ist <code translate="no">hf-inference</code>.</td></tr>
<tr><td><code translate="no">credential</code></td><td>Nein</td><td>Die Bezeichnung einer Anmeldeinformation, die im obersten Abschnitt „ <code translate="no">credential</code> “ von „ <code translate="no">milvus.yaml</code> “ definiert ist. Dieser Wert ist nicht das Token selbst.</td></tr>
<tr><td><code translate="no">max_client_batch_size</code></td><td>Nein</td><td>Die maximale Anzahl an Kandidatentexten, die in einer Hugging-Face-Anfrage gesendet werden. Der Standardwert ist „ <code translate="no">32</code> “, und der Wert muss größer sein als „ <code translate="no">0</code> “.</td></tr>
</tbody>
</table>
<h3 id="Step-3-Search-with-the-ranker" class="common-anchor-header">Schritt 3: Suche mit dem Ranker<button data-href="#Step-3-Search-with-the-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Übergeben Sie die Funktion über den Parameter „ <code translate="no">ranker</code> “ von „ <code translate="no">search()</code> “:</p>
<pre><code translate="no" class="language-python">query_vector = [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.41</span>]

results = client.search(
    collection_name=collection_name,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],
<span class="highlighted-wrapper-line">    ranker=hugging_face_ranker,</span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,
)

<span class="hljs-built_in">print</span>(results)
<button class="copy-code-btn"></button></code></pre>
<p>Milvus ruft zunächst Kandidaten aus <code translate="no">dense</code> ab und berechnet dann anhand des Suchtextes in <code translate="no">queries</code> und des Kandidatentextes in <code translate="no">document</code> die Ähnlichkeitswerte der Sätze. Die zurückgegebenen Kandidaten werden nach den Hugging-Face-Werten sortiert.</p>
<h2 id="Troubleshooting" class="common-anchor-header">Fehlerbehebung<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="The-model-is-unavailable-for-sentence-similarity" class="common-anchor-header">Das Modell für die Satzähnlichkeit ist nicht verfügbar<button data-href="#The-model-is-unavailable-for-sentence-similarity" class="anchor-icon" translate="no">
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
    </button></h3><p>Öffnen Sie die Modellseite auf Hugging Face und überprüfen Sie den Abschnitt <strong>„Inference Providers</strong> “. Vergewissern Sie sich, dass <code translate="no">hf-inference</code> das Modell für <code translate="no">sentence-similarity</code> bereitstellt. Ist dies nicht der Fall, wählen Sie ein anderes Modell aus, das diese Aufgabe unterstützt.</p>
<h3 id="The-number-of-query-strings-does-not-match-the-search-request" class="common-anchor-header">Die Anzahl der Suchstrings stimmt nicht mit der Suchanfrage überein<button data-href="#The-number-of-query-strings-does-not-match-the-search-request" class="anchor-icon" translate="no">
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
    </button></h3><p>Die Anzahl der Zeichenfolgen in „ <code translate="no">queries</code> “ muss mit der Anzahl der Suchanfragen (<code translate="no">nq</code>) übereinstimmen. Bei einer Suche mit einem Abfragevektor muss genau eine Abfragezeichenfolge angegeben werden.</p>
<h3 id="Candidate-text-is-missing-or-nullable" class="common-anchor-header">Kandidatentext fehlt oder ist nullfähig<button data-href="#Candidate-text-is-missing-or-nullable" class="anchor-icon" translate="no">
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
    </button></h3><p>Stellen Sie sicher, dass „ <code translate="no">input_field_names</code> “ genau ein nicht-nullfähiges Feld „ <code translate="no">VARCHAR</code> “ enthält und dass jede Kandidatenentität Text in diesem Feld enthält.</p>
<h3 id="Milvus-reports-missing-Hugging-Face-credentials" class="common-anchor-header">Milvus meldet fehlende Hugging-Face-Anmeldedaten<button data-href="#Milvus-reports-missing-Hugging-Face-credentials" class="anchor-icon" translate="no">
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
    </button></h3><p>Stellen Sie sicher, dass das Anmelde-Label „Function“ in „ <code translate="no">milvus.yaml</code> “ vorhanden ist, dass das Label auf Anbieterebene gültig ist oder dass „ <code translate="no">MILVUS_HUGGINGFACE_API_KEY</code> “ in der Milvus-Serviceumgebung vorhanden ist.</p>
<h2 id="Next-steps" class="common-anchor-header">Nächste Schritte<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li>Informationen zum Verhalten und zu den Beschränkungen des gemeinsam genutzten Model Rankers finden Sie unter <a href="/docs/de/model-ranker-overview.md">„Model Ranker – Übersicht</a>“.</li>
<li>Informationen zum Generieren von Embeddings über gehostete Hugging Face-Inferenz-Provider finden Sie unter <a href="/docs/de/hugging-face.md">„Hugging Face</a>“.</li>
<li>Informationen zur Anwendung des Rankers auf die hybride Suche finden Sie unter <a href="/docs/de/multi-vector-search.md">„Multi-Vector Hybrid Search</a>“.</li>
</ul>
