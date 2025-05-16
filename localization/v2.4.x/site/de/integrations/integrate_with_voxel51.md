---
id: integrate_with_voxel51.md
summary: Diese Seite behandelt die Integration mit voxel51
title: Durchführung von Visionsrecherchen mit Milvus und FiftyOne
---
<h1 id="Conduct-Vision-Searches-with-Milvus-and-FiftyOne" class="common-anchor-header">Bildverarbeitungssuchen mit Milvus und FiftyOne durchführen<button data-href="#Conduct-Vision-Searches-with-Milvus-and-FiftyOne" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://docs.voxel51.com/">FiftyOne</a> ist ein Open-Source-Werkzeug zur Erstellung hochwertiger Datensätze und Computer Vision Modelle. Dieser Leitfaden hilft Ihnen, die Ähnlichkeitssuche von Milvus in FiftyOne zu integrieren, so dass Sie Ihre eigenen Datensätze durchsuchen können.</p>
<p>FiftyOne stellt eine API zur Verfügung, um Milvus-Sammlungen zu erstellen, Vektoren hochzuladen und Ähnlichkeitsabfragen auszuführen, sowohl <a href="https://docs.voxel51.com/integrations/milvus.html#milvus-query">programmatisch</a> in Python als auch per Point-and-Click in der App. Die Demonstration auf dieser Seite konzentriert sich auf die programmatische Integration.</p>
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
    </button></h2><p>Bevor Sie beginnen, stellen Sie sicher, dass Sie über die folgenden Voraussetzungen verfügen:</p>
<ul>
<li>Ein laufender <a href="/docs/de/v2.4.x/install_standalone-docker.md">Milvus-Server</a>.</li>
<li>Eine Python-Umgebung mit <code translate="no">pymilvus</code> und <code translate="no">fiftyone</code> installiert.</li>
<li>Einen <a href="https://docs.voxel51.com/user_guide/dataset_creation/index.html#loading-datasets">Datensatz</a> mit Bildern zum Durchsuchen.</li>
</ul>
<h2 id="Installing-Requirements" class="common-anchor-header">Voraussetzungen für die Installation<button data-href="#Installing-Requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>Für dieses Beispiel werden wir <code translate="no">pymilvus</code> und <code translate="no">fiftyone</code> verwenden. Sie können sie mit den folgenden Befehlen installieren:</p>
<pre><code translate="no" class="language-shell">python3 -m pip install pymilvus fiftyone torch torchvision
<button class="copy-code-btn"></button></code></pre>
<h2 id="Basic-recipe" class="common-anchor-header">Grundlegendes Rezept<button data-href="#Basic-recipe" class="anchor-icon" translate="no">
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
    </button></h2><p>Der grundlegende Arbeitsablauf, um mit Milvus einen Ähnlichkeitsindex auf Ihren FiftyOne-Datensätzen zu erstellen und diesen zur Abfrage Ihrer Daten zu verwenden, sieht wie folgt aus:</p>
<ol>
<li>Laden Sie einen <a href="https://docs.voxel51.com/user_guide/dataset_creation/index.html#loading-datasets">Datensatz</a> in FiftyOne</li>
<li>Berechnen Sie Vektoreinbettungen für Samples oder Patches in Ihrem Datensatz, oder wählen Sie ein Modell aus, um die Einbettungen zu erzeugen.</li>
<li>Verwenden Sie die <a href="https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity"><code translate="no">compute_similarity()</code></a> um einen Milvus-Ähnlichkeitsindex für die Proben oder Objektfelder in einem Datensatz zu erzeugen, indem Sie den Parameter <code translate="no">backend=&quot;milvus&quot;</code> setzen und ein <code translate="no">brain_key</code> Ihrer Wahl angeben.</li>
<li>Verwenden Sie diesen Milvus-Ähnlichkeitsindex zur Abfrage Ihrer Daten mit <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.sort_by_similarity"><code translate="no">sort_by_similarity()</code></a>.</li>
<li>Falls gewünscht, löschen Sie den Index.</li>
</ol>
<h2 id="Procedures" class="common-anchor-header">Prozeduren<button data-href="#Procedures" class="anchor-icon" translate="no">
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
    </button></h2><p>Das folgende Beispiel veranschaulicht den oben beschriebenen Arbeitsablauf.</p>
<h3 id="1-Load-a-dataset-into-FiftyOne-and-compute-embeddings-for-the-samples" class="common-anchor-header">1. Laden Sie einen Datensatz in FiftyOne und berechnen Sie die Einbettungen für die Muster</h3><p>Der folgende Code verwendet das von FiftyOne bereitgestellte Beispielbildset, um die Integration zu demonstrieren. Sie können Ihren eigenen Datensatz vorbereiten, indem Sie sich auf <a href="https://docs.voxel51.com/user_guide/dataset_creation/index.html#loading-datasets">diesen Artikel</a> beziehen.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> fiftyone <span class="hljs-keyword">as</span> fo
<span class="hljs-keyword">import</span> fiftyone.brain <span class="hljs-keyword">as</span> fob
<span class="hljs-keyword">import</span> fiftyone.zoo <span class="hljs-keyword">as</span> foz

<span class="hljs-comment"># Step 1: Load your data into FiftyOne</span>
dataset = foz.load_zoo_dataset(<span class="hljs-string">&quot;quickstart&quot;</span>)

<span class="hljs-comment"># Steps 2 and 3: Compute embeddings and create a similarity index</span>
milvus_index = fob.compute_similarity(
    dataset,
    brain_key=<span class="hljs-string">&quot;milvus_index&quot;</span>,
    backend=<span class="hljs-string">&quot;milvus&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Conduct-vision-similarity-searches" class="common-anchor-header">2. Durchführen von Ähnlichkeitssuchen</h3><p>Sie können nun den Milvus Ähnlichkeitsindex verwenden, um eine Ähnlichkeitssuche in Ihrem Datensatz durchzuführen.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Step 4: Query your data</span>
query = dataset.first().<span class="hljs-built_in">id</span>  <span class="hljs-comment"># query by sample ID</span>
view = dataset.sort_by_similarity(
    query,
    brain_key=<span class="hljs-string">&quot;milvus_index&quot;</span>,
    k=<span class="hljs-number">10</span>,  <span class="hljs-comment"># limit to 10 most similar samples</span>
)

<span class="hljs-comment"># Step 5 (optional): Cleanup</span>

<span class="hljs-comment"># Delete the Milvus collection</span>
milvus_index.cleanup()

<span class="hljs-comment"># Delete run record from FiftyOne</span>
dataset.delete_brain_run(<span class="hljs-string">&quot;milvus_index&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Delete-the-index" class="common-anchor-header">3. Löschen Sie den Index</h3><p>Wenn Sie den Milvus-Ähnlichkeitsindex nicht mehr benötigen, können Sie ihn mit dem folgenden Code löschen:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Step 5: Delete the index</span>
milvus_index.delete()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-the-Milvus-backend" class="common-anchor-header">Verwenden Sie das Milvus-Backend<button data-href="#Use-the-Milvus-backend" class="anchor-icon" translate="no">
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
    </button></h2><p>Standardmäßig wird durch den Aufruf von <a href="https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity"><code translate="no">compute_similarity()</code></a> oder <code translate="no">sort_by_similarity()</code> wird standardmäßig ein Sklearn-Backend verwendet.</p>
<p>Um das Milvus-Backend zu verwenden, setzen Sie einfach den optionalen Backend-Parameter von <a href="https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity"><code translate="no">compute_similarity()</code></a> auf <code translate="no">&quot;milvus&quot;</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> fiftyone.<span class="hljs-property">brain</span> <span class="hljs-keyword">as</span> fob

fob.<span class="hljs-title function_">compute_similarity</span>(..., backend=<span class="hljs-string">&quot;milvus&quot;</span>, ...)
<button class="copy-code-btn"></button></code></pre>
<p>Alternativ können Sie FiftyOne dauerhaft so konfigurieren, dass das Milvus-Backend verwendet wird, indem Sie die folgende Umgebungsvariable setzen:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">export</span> <span class="hljs-variable constant_">FIFTYONE_BRAIN_DEFAULT_SIMILARITY_BACKEND</span>=milvus
<button class="copy-code-btn"></button></code></pre>
<p>oder indem Sie den Parameter <code translate="no">default_similarity_backend</code> in Ihrer <a href="https://docs.voxel51.com/user_guide/brain.html#brain-config">brain config</a> auf <code translate="no">~/.fiftyone/brain_config.json</code> setzen:</p>
<pre><code translate="no" class="language-json">{
    <span class="hljs-string">&quot;default_similarity_backend&quot;</span>: <span class="hljs-string">&quot;milvus&quot;</span>
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Authentication" class="common-anchor-header">Authentifizierung<button data-href="#Authentication" class="anchor-icon" translate="no">
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
    </button></h2><p>Wenn Sie einen eigenen Milvus-Server verwenden, können Sie Ihre Anmeldedaten auf verschiedene Weise angeben.</p>
<h3 id="Environment-variables-recommended" class="common-anchor-header">Umgebungsvariablen (empfohlen)</h3><p>Der empfohlene Weg, Ihre Milvus-Zugangsdaten zu konfigurieren, ist, sie in den unten gezeigten Umgebungsvariablen zu speichern, auf die FiftyOne automatisch zugreift, sobald eine Verbindung zu Milvus hergestellt wird.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_URI=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_USER=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_PASSWORD=XXXXXX

<span class="hljs-comment"># also available if necessary</span>
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_SECURE=<span class="hljs-literal">true</span>
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_TOKEN=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_DB_NAME=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_CLIENT_KEY_PATH=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_CLIENT_PEM_PATH=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_CA_PEM_PATH=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_SERVER_PEM_PATH=XXXXXX
<span class="hljs-built_in">export</span> FIFTYONE_BRAIN_SIMILARITY_MILVUS_SERVER_NAME=XXXXXX
<button class="copy-code-btn"></button></code></pre>
<h3 id="FiftyOne-Brain-config" class="common-anchor-header">FiftyOne Gehirn-Konfiguration</h3><p>Sie können Ihre Zugangsdaten auch in Ihrer <a href="https://docs.voxel51.com/user_guide/brain.html#brain-config">Brain-Config-Datei</a> speichern, die Sie unter <code translate="no">~/.fiftyone/brain_config.json</code> finden:</p>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;similarity_backends&quot;</span>: {
        <span class="hljs-string">&quot;milvus&quot;</span>: {
            <span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;user&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;password&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,

            <span class="hljs-comment"># also available if necessary</span>
            <span class="hljs-string">&quot;secure&quot;</span>: true,
            <span class="hljs-string">&quot;token&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;db_name&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;client_key_path&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;client_pem_path&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;ca_pem_path&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;server_pem_path&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>,
            <span class="hljs-string">&quot;server_name&quot;</span>: <span class="hljs-string">&quot;XXXXXX&quot;</span>
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>Beachten Sie, dass diese Datei nicht existiert, bis Sie sie erstellen.</p>
<h3 id="Keyword-arguments" class="common-anchor-header">Schlüsselwort-Argumente</h3><p>Sie können Ihre Milvus-Anmeldeinformationen manuell als Schlüsselwortargumente angeben, wenn Sie Methoden wie <a href="https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity"><code translate="no">compute_similarity()</code></a> aufrufen, die Verbindungen zu Milvus erfordern:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> fiftyone.brain <span class="hljs-keyword">as</span> fob

milvus_index = fob.compute_similarity(
    ...
    backend=<span class="hljs-string">&quot;milvus&quot;</span>,
    brain_key=<span class="hljs-string">&quot;milvus_index&quot;</span>,
    uri=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    user=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    password=<span class="hljs-string">&quot;XXXXXX&quot;</span>,

    <span class="hljs-comment"># also available if necessary</span>
    secure=<span class="hljs-literal">True</span>,
    token=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    db_name=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    client_key_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    client_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    ca_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    server_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    server_name=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Beachten Sie, dass Sie bei dieser Strategie die Anmeldeinformationen manuell angeben müssen, wenn Sie später einen Index über <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.load_brain_results"><code translate="no">load_brain_results()</code></a>:</p>
<pre><code translate="no" class="language-python">milvus_index = dataset.load_brain_results(
    <span class="hljs-string">&quot;milvus_index&quot;</span>,
    uri=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    user=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    password=<span class="hljs-string">&quot;XXXXXX&quot;</span>,

    <span class="hljs-comment"># also available if necessary</span>
    secure=<span class="hljs-literal">True</span>,
    token=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    db_name=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    client_key_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    client_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    ca_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    server_pem_path=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
    server_name=<span class="hljs-string">&quot;XXXXXX&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Milvus-config-parameters" class="common-anchor-header">Milvus-Konfigurationsparameter</h3><p>Das Milvus-Backend unterstützt eine Vielzahl von Abfrageparametern, mit denen Sie Ihre Ähnlichkeitsabfragen anpassen können. Diese Parameter umfassen:</p>
<ul>
<li><p><strong>collection_name</strong><em>(None</em>): der Name der Milvus-Sammlung, die verwendet oder erstellt werden soll. Wenn keine angegeben wird, wird eine neue Sammlung erstellt.</p></li>
<li><p><strong>metric</strong> (<em>"dotproduct")</em>: die Metrik für den Einbettungsabstand, die bei der Erstellung eines neuen Index verwendet werden soll. Die unterstützten Werte sind (<code translate="no">&quot;dotproduct&quot;</code>, <code translate="no">&quot;euclidean&quot;</code>)</p></li>
<li><p><strong>consistency_level</strong> (<em>"Session")</em>: die zu verwendende Konsistenzstufe. Unterstützte Werte sind (<code translate="no">&quot;Strong&quot;</code>, <code translate="no">&quot;Session&quot;</code>, <code translate="no">&quot;Bounded&quot;</code>, <code translate="no">&quot;Eventually&quot;</code>)</p></li>
</ul>
<p>Ausführliche Informationen zu diesen Parametern finden Sie in der <a href="/docs/de/v2.4.x/authenticate.md">Milvus-Authentifizierungsdokumentation</a> und der <a href="/docs/de/v2.4.x/consistency.md">Milvus-Konsistenzstufen-Dokumentation</a>.</p>
<p>Sie können diese Parameter mit jeder der im vorherigen Abschnitt beschriebenen Strategien angeben. Hier ist ein Beispiel für eine <a href="https://docs.voxel51.com/user_guide/brain.html#brain-config">Gehirnkonfiguration</a>, die alle verfügbaren Parameter enthält:</p>
<pre><code translate="no" class="language-json">{
    <span class="hljs-string">&quot;similarity_backends&quot;</span>: {
        <span class="hljs-string">&quot;milvus&quot;</span>: {
            <span class="hljs-string">&quot;collection_name&quot;</span>: <span class="hljs-string">&quot;your_collection&quot;</span>,
            <span class="hljs-string">&quot;metric&quot;</span>: <span class="hljs-string">&quot;dotproduct&quot;</span>,
            <span class="hljs-string">&quot;consistency_level&quot;</span>: <span class="hljs-string">&quot;Strong&quot;</span>
        }
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>Normalerweise werden diese Parameter jedoch direkt an <a href="https://docs.voxel51.com/api/fiftyone.brain.html#fiftyone.brain.compute_similarity"><code translate="no">compute_similarity()</code></a> übergeben, um einen bestimmten neuen Index zu konfigurieren:</p>
<pre><code translate="no" class="language-python">milvus_index = fob.<span class="hljs-title function_">compute_similarity</span>(
    ...
    backend=<span class="hljs-string">&quot;milvus&quot;</span>,
    brain_key=<span class="hljs-string">&quot;milvus_index&quot;</span>,
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    metric=<span class="hljs-string">&quot;dotproduct&quot;</span>,
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Manage-brain-runs" class="common-anchor-header">Verwalten von Brain-Läufen<button data-href="#Manage-brain-runs" class="anchor-icon" translate="no">
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
    </button></h2><p>FiftyOne stellt eine Reihe von Methoden zur Verfügung, mit denen Sie Brain Runs verwalten können.</p>
<p>Zum Beispiel können Sie <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.list_brain_runs"><code translate="no">list_brain_runs()</code></a> aufrufen, um die verfügbaren Brain Keys eines Datensatzes zu sehen:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> fiftyone.brain <span class="hljs-keyword">as</span> fob

<span class="hljs-comment"># List all brain runs</span>
dataset.list_brain_runs()

<span class="hljs-comment"># Only list similarity runs</span>
dataset.list_brain_runs(<span class="hljs-built_in">type</span>=fob.Similarity)

<span class="hljs-comment"># Only list specific similarity runs</span>
dataset.list_brain_runs(
    <span class="hljs-built_in">type</span>=fob.Similarity,
    patches_field=<span class="hljs-string">&quot;ground_truth&quot;</span>,
    supports_prompts=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Oder Sie können mit <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.get_brain_info"><code translate="no">get_brain_info()</code></a> können Sie Informationen über die Konfiguration eines Brain Runs abrufen:</p>
<pre><code translate="no" class="language-python">info = dataset.get_brain_info(brain_key)
<span class="hljs-built_in">print</span>(info)
<button class="copy-code-btn"></button></code></pre>
<p>Verwenden Sie <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.load_brain_results"><code translate="no">load_brain_results()</code></a> laden Sie die <a href="https://docs.voxel51.com/api/fiftyone.brain.similarity.html#fiftyone.brain.similarity.SimilarityIndex"><code translate="no">SimilarityIndex</code></a> Instanz für einen Brain-Lauf.</p>
<p>Sie können mit <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.rename_brain_run"><code translate="no">rename_brain_run()</code></a> können Sie den Gehirnschlüssel umbenennen, der mit einem bestehenden Ähnlichkeits-Ergebnislauf verbunden ist:</p>
<pre><code translate="no" class="language-python">dataset.rename_brain_run(brain_key, new_brain_key)
<button class="copy-code-btn"></button></code></pre>
<p>Schließlich können Sie mit <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.delete_brain_run"><code translate="no">delete_brain_run()</code></a> können Sie einen Gehirnlauf löschen:</p>
<pre><code translate="no" class="language-python">dataset.delete_brain_run(brain_key)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Der Aufruf von <a href="https://docs.voxel51.com/api/fiftyone.core.collections.html#fiftyone.core.collections.SampleCollection.delete_brain_run"><code translate="no">delete_brain_run()</code></a> löscht nur den Datensatz des Hirnlaufs aus dem FiftyOne-Datensatz, nicht aber die zugehörige Milvus-Sammlung, die Sie wie folgt löschen können:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Delete the Milvus collection</span>
milvus_index = dataset.load_brain_results(brain_key)
milvus_index.cleanup()
<button class="copy-code-btn"></button></code></pre>
</div>
<p>Für einen allgemeinen Vektorsuch-Workflow auf einem FiftyOne-Datensatz unter Verwendung des Milvus-Backends, siehe <a href="https://docs.voxel51.com/integrations/milvus.html#examples">Beispiele hier</a>.</p>
