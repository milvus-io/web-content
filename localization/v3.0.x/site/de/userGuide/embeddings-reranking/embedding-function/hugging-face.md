---
id: hugging-face.md
title: Hugging FaceCompatible with Milvus v2.6.20+
summary: >-
  In diesem Thema wird beschrieben, wie Sie gehostete Hugging
  Face-Inferenz-Provider für die Text-Einbettung in Milvus verwenden können.
beta: Milvus v2.6.20+
---
<h1 id="Hugging-Face" class="common-anchor-header">Hugging Face<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.20+</span><button data-href="#Hugging-Face" class="anchor-icon" translate="no">
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
    </button></h1><p>Die Verwendung eines Hugging Face-Embedding-Modells erfordert normalerweise, dass Ihre Anwendung Anmeldedaten verwaltet, das Modell separat aufruft und Embeddings für eingefügte Daten und Suchanfragen konsistent generiert. Mit einer Text-Embedding-Funktion ruft Milvus gehostete <a href="https://huggingface.co/docs/inference-providers/index">Hugging Face-Inferenz-Provider</a> auf, um Rohtext während des Einfügens und der Suche in Vektoren umzuwandeln.</p>
<p>Diese Integration nutzt den gehosteten Hugging Face-Router. Informationen zur Anbindung von Milvus an einen separat bereitgestellten Text Embeddings Inference (TEI)-Dienst finden Sie unter <a href="/docs/de/hugging-face-tei.md">Hugging Face TEI</a>.</p>
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
<li>Das Ausgabefeld der Funktion muss den Datentyp „ <code translate="no">FLOAT_VECTOR</code> “ verwenden. Die Hugging-Face-Einbettung in Milvus unterstützt keine Ausgabefelder vom Typ „ <code translate="no">INT8_VECTOR</code> “, „ <code translate="no">BINARY_VECTOR</code> “, „ <code translate="no">FLOAT16_VECTOR</code> “ oder „ <code translate="no">BFLOAT16_VECTOR</code> “.</li>
<li>Die Dimension des Ausgabefelds „Function“ muss mit der Ausgabedimension des ausgewählten Modells übereinstimmen.</li>
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
  
   <img translate="no" src="/docs/v3.0.x/assets/hugging-face-embedding-flow.png" alt="Hugging Face text embedding workflow" class="doc-image" id="hugging-face-text-embedding-workflow" /> 
   <span>Workflow für Hugging Face-Text-Embeddings</span>
  
 </span></p>
<p>Der Workflow umfasst drei Schritte:</p>
<ol>
<li><strong>Rohtext senden.</strong> Ihre Anwendung stellt den Rohtext in einer Einfüge- oder Suchanfrage bereit.</li>
<li><strong>Einbettung generieren.</strong> Die Text-Embedding-Funktion leitet den Text über „ <code translate="no">hf-inference</code> “ an die Hugging Face-Pipeline „ <code translate="no">feature-extraction</code> “ weiter. Die Funktion nutzt „ <code translate="no">model_name</code> “, um das Modell auszuwählen, und kann unterstützte Inferenzoptionen wie Normalisierung und Trunkierung übergeben.</li>
<li><strong>Verwenden Sie die Einbettung.</strong> Hugging Face gibt pro Eingabetext eine Gleitkomma-Einbettung zurück. Beim Einfügen speichert Milvus den Vektor im Ausgabefeld der Funktion. Bei der Suche verwendet Milvus den Vektor als Abfragevektor.</li>
</ol>
<p>Dieselbe Funktionskonfiguration übernimmt sowohl das Einfügen als auch die Suche, wodurch das Modell und die Inferenzparameter bei beiden Vorgängen konsistent bleiben.</p>
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
    </button></h2><p>Bevor Sie die gehostete Hugging-Face-Text-Einbettung verwenden, stellen Sie sicher, dass Sie über Folgendes verfügen:</p>
<ul>
<li>Milvus 2.6.20 oder höher aus der 2.6-Release-Reihe.</li>
<li>PyMilvus 2.6.16 oder höher.</li>
<li>Ein Hugging Face-Benutzerzugriffstoken, mit dem Inferenz-Provider aufgerufen werden können.</li>
<li>Ein Modell, das derzeit von <code translate="no">hf-inference</code> für die <a href="https://huggingface.co/docs/inference-providers/en/tasks/feature-extraction"><code translate="no">feature-extraction</code></a> Aufgabe bereitgestellt wird.</li>
</ul>
<div class="alert note">
<p>Milvus hat keinen Einfluss darauf, ob ein Hugging-Face-Modell über <code translate="no">hf-inference</code> weiterhin verfügbar bleibt oder ob das Modell Ihre Anforderungen an Stabilität, Latenz und Ausgabequalität erfüllt. Überprüfen Sie das Modell auf Hugging Face und bewerten Sie es im Hinblick auf Ihre Arbeitslast, bevor Sie es in der Produktion einsetzen.</p>
</div>
<p>In den Beispielen wird <a href="https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2"><code translate="no">sentence-transformers/all-MiniLM-L6-v2</code></a>, das 384-dimensionale Einbettungen erzeugt. Das Modell dient lediglich zur Veranschaulichung der Konfiguration und stellt keine Empfehlung oder Zertifizierung durch Milvus dar.</p>
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
    </button></h2><p>Milvus benötigt ein Hugging-Face-Benutzerzugriffstoken, um den gehosteten Router aufzurufen. Sie können das Token unter <code translate="no">milvus.yaml</code> oder über eine Umgebungsvariable konfigurieren.</p>
<p>Die Prioritätsreihenfolge der Anmeldedaten lautet:</p>
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
    </button></h3><p>Definieren Sie das Token im obersten Abschnitt „ <code translate="no">credential</code> “ unter <code translate="no">milvus.yaml</code> und verweisen Sie den Hugging-Face-Einbettungsanbieter anschließend auf dieses Anmelde-Label:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">huggingface_apikey:</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_HUGGING_FACE_TOKEN&gt;</span>

<span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">huggingface:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">huggingface_apikey</span>
        <span class="hljs-comment"># url: https://router.huggingface.co</span>
<button class="copy-code-btn"></button></code></pre>
<p>Sie können „ <code translate="no">credential</code> “ auch in den Funktionsparametern festlegen. Der Wert muss das im obersten Abschnitt „ <code translate="no">credential</code> “ definierte Label sein, nicht das Token selbst. Ein Anmelde-Label auf Funktionsebene hat Vorrang vor dem Label auf Anbieterebene.</p>
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
    </button></h3><p>Wenn weder in der Funktions- noch in der Anbieter-Konfiguration ein Anmelde-Label angegeben ist, liest Milvus das Token aus „ <code translate="no">MILVUS_HUGGINGFACE_API_KEY</code> “ aus.</p>
<p>Für Docker Compose setzen Sie die Variable im Milvus-Standalone-Dienst:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-attr">MILVUS_HUGGINGFACE_API_KEY:</span> <span class="hljs-string">&lt;YOUR_HUGGING_FACE_TOKEN&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Einzelheiten zur Anwendung von Docker-Compose-Einstellungen finden Sie unter <a href="/docs/de/configure-docker.md">„Milvus mit Docker Compose konfigurieren</a>“.</p>
<h2 id="Use-Hugging-Face-text-embedding" class="common-anchor-header">Hugging Face-Text-Embedding verwenden<button data-href="#Use-Hugging-Face-text-embedding" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Create-a-collection-with-a-Text-Embedding-Function" class="common-anchor-header">Schritt 1: Erstellen Sie eine Sammlung mit einer Text-Embedding-Funktion<button data-href="#Step-1-Create-a-collection-with-a-Text-Embedding-Function" class="anchor-icon" translate="no">
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
    </button></h3><p>Erstellen Sie ein Schema mit einem Primärfeld, einem Eingabefeld „ <code translate="no">VARCHAR</code> “ und einem Ausgabefeld „ <code translate="no">FLOAT_VECTOR</code> “. Die Ausgabedimension muss mit dem ausgewählten Modell übereinstimmen.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

collection_name = <span class="hljs-string">&quot;hugging_face_embedding_demo&quot;</span>
schema = client.create_schema()

schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    auto_id=<span class="hljs-literal">False</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;document&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">9000</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
<span class="highlighted-wrapper-line">    dim=<span class="hljs-number">384</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Definieren Sie eine „ <code translate="no">TEXTEMBEDDING</code> “-Funktion, die Einbettungen von „ <code translate="no">document</code> “ in „ <code translate="no">dense</code> “ schreibt:</p>
<pre><code translate="no" class="language-python">text_embedding_function = Function(
    name=<span class="hljs-string">&quot;hugging_face_embedding&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],
    function_type=FunctionType.TEXTEMBEDDING,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;huggingface&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;sentence-transformers/all-MiniLM-L6-v2&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;hf_provider&quot;</span>: <span class="hljs-string">&quot;hf-inference&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;credential&quot;</span>: <span class="hljs-string">&quot;huggingface_apikey&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;normalize&quot;</span>: <span class="hljs-string">&quot;true&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;truncate&quot;</span>: <span class="hljs-string">&quot;true&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;max_client_batch_size&quot;</span>: <span class="hljs-number">128</span>,</span>
<span class="highlighted-comment-line">    },</span>
)

schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<p>Wenn Sie nur die Anmeldeinformationen auf Anbieterebene oder die Umgebungsvariable verwenden, lassen Sie „ <code translate="no">credential</code> “ in den Funktionsparametern weg.</p>
<p>Konfigurieren Sie einen Index für das Ausgabefeld und erstellen Sie anschließend die Sammlung:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
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
<button class="copy-code-btn"></button></code></pre>
<p>Die folgende Tabelle beschreibt die Hugging Face-spezifischen Funktionsparameter:</p>
<table>
<thead>
<tr><th>Parameter</th><th>Erforderlich?</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">provider</code></td><td>Ja</td><td>Der Anbieter des Einbettungsmodells. Setzen Sie diesen Wert auf „ <code translate="no">huggingface</code> “.</td></tr>
<tr><td><code translate="no">model_name</code></td><td>Ja</td><td>Die Hugging-Face-Modell-ID für ein Modell, das über <code translate="no">hf-inference</code> für die Aufgabe „ <code translate="no">feature-extraction</code> “ bereitgestellt wird.</td></tr>
<tr><td><code translate="no">hf_provider</code></td><td>Nein</td><td>Die Route des Hugging Face-Inferenzanbieters. Der Standardwert und der einzige in Milvus 2.6.20 unterstützte Wert ist <code translate="no">hf-inference</code>.</td></tr>
<tr><td><code translate="no">credential</code></td><td>Nein</td><td>Die Bezeichnung einer Anmeldeinformation, die im obersten Abschnitt „ <code translate="no">credential</code> “ von „ <code translate="no">milvus.yaml</code> “ definiert ist. Dieser Wert ist nicht das Token selbst.</td></tr>
<tr><td><code translate="no">normalize</code></td><td>Nein</td><td>Gibt an, ob Hugging Face normalisierte Embeddings zurückgeben soll. Unterstützte Werte sind „ <code translate="no">true</code> “ und „ <code translate="no">false</code> “. Wird dieser Wert weggelassen, setzt Milvus diese Option in der Anfrage nicht.</td></tr>
<tr><td><code translate="no">prompt_name</code></td><td>Nein</td><td>Der Name eines Prompts, der in der „Sentence Transformers“-Konfiguration des ausgewählten Modells definiert ist.</td></tr>
<tr><td><code translate="no">truncate</code></td><td>Nein</td><td>Ob Hugging Face eine Eingabe kürzen soll, die die vom Modell unterstützte Länge überschreitet. Unterstützte Werte sind „ <code translate="no">true</code> “ und „ <code translate="no">false</code> “.</td></tr>
<tr><td><code translate="no">truncation_direction</code></td><td>Nein</td><td>Die Richtung, aus der Hugging Face eine Eingabe abschneidet. Unterstützte Werte sind „ <code translate="no">left</code> “ und „ <code translate="no">right</code> “.</td></tr>
<tr><td><code translate="no">max_client_batch_size</code></td><td>Nein</td><td>Die maximale Anzahl an Eingabetexten, die in einer Hugging-Face-Anfrage gesendet werden. Der Standardwert ist „ <code translate="no">128</code> “, und der Wert muss größer als „ <code translate="no">0</code> “ sein.</td></tr>
</tbody>
</table>
<h3 id="Step-2-Insert-raw-text" class="common-anchor-header">Schritt 2: Rohtext einfügen<button data-href="#Step-2-Insert-raw-text" class="anchor-icon" translate="no">
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
    </button></h3><p>Fügen Sie Text ein, ohne Vektoren anzugeben. Milvus ruft Hugging Face auf und schreibt die generierten Embeddings in „ <code translate="no">dense</code> “.</p>
<pre><code translate="no" class="language-python">client.insert(
    collection_name=collection_name,
    data=[
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;Milvus simplifies semantic search through embeddings.&quot;</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;Vector embeddings convert text into searchable numeric data.&quot;</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;Semantic search helps users find relevant information quickly.&quot;</span>,
        },
    ],
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Search-with-raw-text" class="common-anchor-header">Schritt 3: Suche mit Rohtext<button data-href="#Step-3-Search-with-raw-text" class="anchor-icon" translate="no">
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
    </button></h3><p>Suche mit einer Textabfrage. Milvus wendet dieselbe Funktionskonfiguration an, um den Abfragevektor zu erstellen, bevor die Vektorsuche ausgeführt wird.</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=collection_name,
    data=[<span class="hljs-string">&quot;How does Milvus handle semantic search?&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,
)

<span class="hljs-built_in">print</span>(results)
<button class="copy-code-btn"></button></code></pre>
<p>Das Ergebnis enthält die für den Suchtext relevantesten Dokumente, sortiert nach Kosinus-Ähnlichkeit.</p>
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
    </button></h2><h3 id="The-model-is-unavailable-for-feature-extraction" class="common-anchor-header">Das Modell ist für die Merkmalsextraktion nicht verfügbar<button data-href="#The-model-is-unavailable-for-feature-extraction" class="anchor-icon" translate="no">
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
    </button></h3><p>Öffnen Sie die Modellseite auf Hugging Face und überprüfen Sie den Abschnitt <strong>„Inference Providers</strong> “. Vergewissern Sie sich, dass „ <code translate="no">hf-inference</code> “ das Modell für „ <code translate="no">feature-extraction</code> “ bereitstellt. Ist dies nicht der Fall, wählen Sie ein anderes Modell aus und aktualisieren Sie gegebenenfalls die Vektorfelddimension.</p>
<h3 id="The-returned-vector-dimension-does-not-match-the-field" class="common-anchor-header">Die zurückgegebene Vektordimension stimmt nicht mit dem Feld überein<button data-href="#The-returned-vector-dimension-does-not-match-the-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Überprüfen Sie die Ausgabedimension des Modells und vergleichen Sie diese mit <code translate="no">dim</code> im Feld „Function output“. Milvus lehnt eine Antwort ab, deren Vektordimension von der Felddimension unter <code translate="no">FLOAT_VECTOR</code> abweicht.</p>
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
    </button></h3><p>Stellen Sie sicher, dass das Label „Function credential“ im obersten Abschnitt „ <code translate="no">credential</code> “ vorhanden ist, dass das Label auf Anbieterebene gültig ist oder dass „ <code translate="no">MILVUS_HUGGINGFACE_API_KEY</code> “ in der Milvus-Serviceumgebung vorhanden ist.</p>
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
<li>Allgemeine Konzepte zu „Function“ sowie Informationen zum Einfüge- und Suchverhalten finden Sie unter <a href="/docs/de/embedding-function-overview.md">„Embedding Function – Übersicht</a>“.</li>
<li>Informationen zum erneuten Ranking von Kandidaten bei der Vektorsuche mit gehosteten Hugging-Face-Satzähnlichkeitswerten finden Sie unter <a href="/docs/de/hugging-face-ranker.md">„Hugging Face Ranker</a>“.</li>
</ul>
