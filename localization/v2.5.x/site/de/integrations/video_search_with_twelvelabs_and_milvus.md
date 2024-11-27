---
id: video_search_with_twelvelabs_and_milvus.md
summary: >-
  Lernen Sie, wie Sie eine semantische Videosuchanwendung erstellen, indem Sie
  die Embed-API von Twelve Labs zur Erzeugung multimodaler Einbettungen in
  Milvus integrieren. Es deckt den gesamten Prozess von der Einrichtung der
  Entwicklungsumgebung bis zur Implementierung fortgeschrittener Funktionen wie
  hybride Suche und zeitliche Videoanalyse ab und bietet eine umfassende
  Grundlage für den Aufbau anspruchsvoller Systeme zur Analyse und Abfrage von
  Videoinhalten.
title: >-
  Erweiterte Videosuche: Nutzung von Twelve Labs und Milvus für die semantische
  Suche
---
<h1 id="Advanced-Video-Search-Leveraging-Twelve-Labs-and-Milvus-for-Semantic-Retrieval" class="common-anchor-header">Erweiterte Videosuche: Nutzung von Twelve Labs und Milvus für die semantische Suche<button data-href="#Advanced-Video-Search-Leveraging-Twelve-Labs-and-Milvus-for-Semantic-Retrieval" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Introduction" class="common-anchor-header">Einführung<button data-href="#Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p>Willkommen zu diesem umfassenden Tutorial zur Implementierung der semantischen Videosuche mit der <a href="https://docs.twelvelabs.io/docs/create-embeddings">Twelve Labs Embed API</a> und Milvus. In diesem Leitfaden erfahren Sie, wie Sie die Leistungsfähigkeit der <a href="https://www.twelvelabs.io/blog/multimodal-embeddings">fortschrittlichen multimodalen Einbettungen von Twelve Labs</a> und der <a href="https://milvus.io/intro">effizienten Vektordatenbank von Milvus</a> nutzen können, um eine robuste Videosuchlösung zu erstellen. Durch die Integration dieser Technologien können Entwickler neue Möglichkeiten bei der Analyse von Videoinhalten erschließen und Anwendungen wie inhaltsbasierte Videoabfragen, Empfehlungssysteme und hochentwickelte Suchmaschinen, die die Nuancen von Videodaten verstehen, ermöglichen.</p>
<p>Dieser Lehrgang führt Sie durch den gesamten Prozess, von der Einrichtung Ihrer Entwicklungsumgebung bis zur Implementierung einer funktionalen semantischen Videosuchanwendung. Wir behandeln Schlüsselkonzepte wie die Erzeugung multimodaler Einbettungen aus Videos, deren effiziente Speicherung in Milvus und die Durchführung von Ähnlichkeitssuchen zum Abrufen relevanter Inhalte. Ganz gleich, ob Sie eine Videoanalyseplattform oder ein Tool zur Erkennung von Inhalten entwickeln oder Ihre bestehenden Anwendungen mit Funktionen für die Videosuche erweitern möchten, dieses Handbuch vermittelt Ihnen das Wissen und die praktischen Schritte, um die kombinierten Stärken von Twelve Labs und Milvus in Ihren Projekten zu nutzen.</p>
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
    </button></h2><p>Bevor wir beginnen, stellen Sie sicher, dass Sie über die folgenden Voraussetzungen verfügen:</p>
<p>Einen API-Schlüssel von Twelve Labs (melden Sie sich unter https://api.twelvelabs.io an, wenn Sie noch keinen haben) Python 3.7 oder höher auf Ihrem System installiert</p>
<h2 id="Setting-Up-the-Development-Environment" class="common-anchor-header">Einrichten der Entwicklungsumgebung<button data-href="#Setting-Up-the-Development-Environment" class="anchor-icon" translate="no">
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
    </button></h2><p>Erstellen Sie ein neues Verzeichnis für Ihr Projekt und navigieren Sie dorthin:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">mkdir</span> video-search-tutorial
<span class="hljs-built_in">cd</span> video-search-tutorial
<button class="copy-code-btn"></button></code></pre>
<p>Richten Sie eine virtuelle Umgebung ein (optional, aber empfohlen):</p>
<pre><code translate="no" class="language-shell">python -m venv venv
<span class="hljs-built_in">source</span> venv/bin/activate  <span class="hljs-comment"># On Windows, use `venv\Scripts\activate`</span>
<button class="copy-code-btn"></button></code></pre>
<p>Installieren Sie die erforderlichen Python-Bibliotheken:</p>
<pre><code translate="no" class="language-shell">pip install twelvelabs pymilvus
<button class="copy-code-btn"></button></code></pre>
<p>Erstellen Sie eine neue Python-Datei für Ihr Projekt:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">touch</span> video_search.py
<button class="copy-code-btn"></button></code></pre>
<p>Diese Datei video_search.py wird das Hauptskript sein, das wir für den Lehrgang verwenden. Als Nächstes richten Sie Ihren Twelve Labs API-Schlüssel als Umgebungsvariable ein, um die Sicherheit zu gewährleisten:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">export</span> <span class="hljs-variable constant_">TWELVE_LABS_API_KEY</span>=<span class="hljs-string">&#x27;your_api_key_here&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connecting-to-Milvus" class="common-anchor-header">Verbindung zu Milvus herstellen<button data-href="#Connecting-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Um eine Verbindung mit Milvus herzustellen, verwenden wir die Klasse MilvusClient. Dieser Ansatz vereinfacht den Verbindungsprozess und ermöglicht es uns, mit einer lokalen, dateibasierten Milvus-Instanz zu arbeiten, was für unser Tutorial perfekt ist.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Initialize the Milvus client</span>
milvus_client = MilvusClient(<span class="hljs-string">&quot;milvus_twelvelabs_demo.db&quot;</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Successfully connected to Milvus&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Dieser Code erstellt eine neue Milvus-Client-Instanz, die alle Daten in einer Datei namens milvus_twelvelabs_demo.db speichert. Dieser dateibasierte Ansatz ist ideal für Entwicklungs- und Testzwecke.</p>
<h2 id="Creating-a-Milvus-Collection-for-Video-Embeddings" class="common-anchor-header">Erstellen einer Milvus-Sammlung für Videoeinbettungen<button data-href="#Creating-a-Milvus-Collection-for-Video-Embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>Nachdem wir nun mit Milvus verbunden sind, können wir eine Sammlung erstellen, um unsere Videoeinbettungen und die zugehörigen Metadaten zu speichern. Wir definieren das Sammlungsschema und erstellen die Sammlung, falls sie noch nicht vorhanden ist.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Initialize the collection name</span>
collection_name = <span class="hljs-string">&quot;twelvelabs_demo_collection&quot;</span>

<span class="hljs-comment"># Check if the collection already exists and drop it if it does</span>
<span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name=collection_name):
    milvus_client.drop_collection(collection_name=collection_name)

<span class="hljs-comment"># Create the collection</span>
milvus_client.create_collection(
    collection_name=collection_name,
    dimension=<span class="hljs-number">1024</span>  <span class="hljs-comment"># The dimension of the Twelve Labs embeddings</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection &#x27;<span class="hljs-subst">{collection_name}</span>&#x27; created successfully&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>In diesem Code wird zunächst geprüft, ob die Sammlung bereits existiert, und wenn ja, wird sie gelöscht. Auf diese Weise wird sichergestellt, dass wir mit einer reinen Weste beginnen. Die Sammlung wird mit einer Dimension von 1024 erstellt, was der Ausgabedimension der Einbettungen von Twelve Labs entspricht.</p>
<h2 id="Generating-Embeddings-with-Twelve-Labs-Embed-API" class="common-anchor-header">Erzeugen von Einbettungen mit der Twelve Labs Embed API<button data-href="#Generating-Embeddings-with-Twelve-Labs-Embed-API" class="anchor-icon" translate="no">
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
    </button></h2><p>Um Einbettungen für unsere Videos mit der Twelve Labs Embed API zu erzeugen, verwenden wir das Twelve Labs Python SDK. Bei diesem Prozess wird eine Einbettungsaufgabe erstellt, auf ihre Fertigstellung gewartet und die Ergebnisse abgerufen. So wird dies umgesetzt:</p>
<p>Stellen Sie zunächst sicher, dass Sie das Twelve Labs SDK installiert haben und importieren Sie die erforderlichen Module:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> twelvelabs <span class="hljs-keyword">import</span> TwelveLabs
<span class="hljs-keyword">from</span> twelvelabs.models.embed <span class="hljs-keyword">import</span> EmbeddingsTask
<span class="hljs-keyword">import</span> os

<span class="hljs-comment"># Retrieve the API key from environment variables</span>
TWELVE_LABS_API_KEY = os.getenv(<span class="hljs-string">&#x27;TWELVE_LABS_API_KEY&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Initialize-the-Twelve-Labs-client" class="common-anchor-header">Initialisieren Sie den Twelve Labs-Client:<button data-href="#Initialize-the-Twelve-Labs-client" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">twelvelabs_client = TwelveLabs(api_key=TWELVE_LABS_API_KEY)
<button class="copy-code-btn"></button></code></pre>
<p>Erstellen Sie eine Funktion zur Erzeugung von Einbettungen für eine bestimmte Video-URL:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_embedding</span>(<span class="hljs-params">video_url</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Generate embeddings for a given video URL using the Twelve Labs API.

    This function creates an embedding task for the specified video URL using
    the Marengo-retrieval-2.6 engine. It monitors the task progress and waits
    for completion. Once done, it retrieves the task result and extracts the
    embeddings along with their associated metadata.

    Args:
        video_url (str): The URL of the video to generate embeddings for.

    Returns:
        tuple: A tuple containing two elements:
            1. list: A list of dictionaries, where each dictionary contains:
                - &#x27;embedding&#x27;: The embedding vector as a list of floats.
                - &#x27;start_offset_sec&#x27;: The start time of the segment in seconds.
                - &#x27;end_offset_sec&#x27;: The end time of the segment in seconds.
                - &#x27;embedding_scope&#x27;: The scope of the embedding (e.g., &#x27;shot&#x27;, &#x27;scene&#x27;).
            2. EmbeddingsTaskResult: The complete task result object from Twelve Labs API.

    Raises:
        Any exceptions raised by the Twelve Labs API during task creation,
        execution, or retrieval.
    &quot;&quot;&quot;</span>

    <span class="hljs-comment"># Create an embedding task</span>
    task = twelvelabs_client.embed.task.create(
        engine_name=<span class="hljs-string">&quot;Marengo-retrieval-2.6&quot;</span>,
        video_url=video_url
    )
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Created task: id=<span class="hljs-subst">{task.<span class="hljs-built_in">id</span>}</span> engine_name=<span class="hljs-subst">{task.engine_name}</span> status=<span class="hljs-subst">{task.status}</span>&quot;</span>)

    <span class="hljs-comment"># Define a callback function to monitor task progress</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">on_task_update</span>(<span class="hljs-params">task: EmbeddingsTask</span>):
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Status=<span class="hljs-subst">{task.status}</span>&quot;</span>)

    <span class="hljs-comment"># Wait for the task to complete</span>
    status = task.wait_for_done(
        sleep_interval=<span class="hljs-number">2</span>,
        callback=on_task_update
    )
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Embedding done: <span class="hljs-subst">{status}</span>&quot;</span>)

    <span class="hljs-comment"># Retrieve the task result</span>
    task_result = twelvelabs_client.embed.task.retrieve(task.<span class="hljs-built_in">id</span>)

    <span class="hljs-comment"># Extract and return the embeddings</span>
    embeddings = []
    <span class="hljs-keyword">for</span> v <span class="hljs-keyword">in</span> task_result.video_embeddings:
        embeddings.append({
            <span class="hljs-string">&#x27;embedding&#x27;</span>: v.embedding.<span class="hljs-built_in">float</span>,
            <span class="hljs-string">&#x27;start_offset_sec&#x27;</span>: v.start_offset_sec,
            <span class="hljs-string">&#x27;end_offset_sec&#x27;</span>: v.end_offset_sec,
            <span class="hljs-string">&#x27;embedding_scope&#x27;</span>: v.embedding_scope
        })
    
    <span class="hljs-keyword">return</span> embeddings, task_result
<button class="copy-code-btn"></button></code></pre>
<p>Verwenden Sie die Funktion, um Einbettungen für Ihre Videos zu generieren:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example usage</span>
video_url = <span class="hljs-string">&quot;https://example.com/your-video.mp4&quot;</span>

<span class="hljs-comment"># Generate embeddings for the video</span>
embeddings, task_result = generate_embedding(video_url)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Generated <span class="hljs-subst">{<span class="hljs-built_in">len</span>(embeddings)}</span> embeddings for the video&quot;</span>)
<span class="hljs-keyword">for</span> i, emb <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(embeddings):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Embedding <span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>:&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Scope: <span class="hljs-subst">{emb[<span class="hljs-string">&#x27;embedding_scope&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Time range: <span class="hljs-subst">{emb[<span class="hljs-string">&#x27;start_offset_sec&#x27;</span>]}</span> - <span class="hljs-subst">{emb[<span class="hljs-string">&#x27;end_offset_sec&#x27;</span>]}</span> seconds&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Embedding vector (first 5 values): <span class="hljs-subst">{emb[<span class="hljs-string">&#x27;embedding&#x27;</span>][:<span class="hljs-number">5</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p>Mit dieser Implementierung können Sie Einbettungen für jede beliebige Video-URL mithilfe der Twelve Labs Embed-API generieren. Die Funktion generate_embedding übernimmt den gesamten Prozess, von der Erstellung der Aufgabe bis zum Abrufen der Ergebnisse. Sie gibt eine Liste von Wörterbüchern zurück, die jeweils einen Einbettungsvektor zusammen mit seinen Metadaten (Zeitspanne und Umfang) enthalten. Denken Sie daran, mögliche Fehler wie Netzwerkprobleme oder API-Limits in einer Produktionsumgebung zu behandeln. Je nach Anwendungsfall können Sie auch Wiederholungsversuche oder eine robustere Fehlerbehandlung implementieren.</p>
<h2 id="Inserting-Embeddings-into-Milvus" class="common-anchor-header">Einfügen von Einbettungen in Milvus<button data-href="#Inserting-Embeddings-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Nach der Generierung von Einbettungen mit der Twelve Labs Embed API werden diese Einbettungen zusammen mit ihren Metadaten in unsere Milvus-Sammlung eingefügt. Dieser Prozess ermöglicht es uns, unsere Videoeinbettungen zu speichern und zu indizieren, um später eine effiziente Ähnlichkeitssuche durchzuführen.</p>
<p>So fügen Sie die Einbettungen in Milvus ein:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">insert_embeddings</span>(<span class="hljs-params">milvus_client, collection_name, task_result, video_url</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Insert embeddings into the Milvus collection.

    Args:
        milvus_client: The Milvus client instance.
        collection_name (str): The name of the Milvus collection to insert into.
        task_result (EmbeddingsTaskResult): The task result containing video embeddings.
        video_url (str): The URL of the video associated with the embeddings.

    Returns:
        MutationResult: The result of the insert operation.

    This function takes the video embeddings from the task result and inserts them
    into the specified Milvus collection. Each embedding is stored with additional
    metadata including its scope, start and end times, and the associated video URL.
    &quot;&quot;&quot;</span>
    data = []

    <span class="hljs-keyword">for</span> i, v <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(task_result.video_embeddings):
        data.append({
            <span class="hljs-string">&quot;id&quot;</span>: i,
            <span class="hljs-string">&quot;vector&quot;</span>: v.embedding.<span class="hljs-built_in">float</span>,
            <span class="hljs-string">&quot;embedding_scope&quot;</span>: v.embedding_scope,
            <span class="hljs-string">&quot;start_offset_sec&quot;</span>: v.start_offset_sec,
            <span class="hljs-string">&quot;end_offset_sec&quot;</span>: v.end_offset_sec,
            <span class="hljs-string">&quot;video_url&quot;</span>: video_url
        })

    insert_result = milvus_client.insert(collection_name=collection_name, data=data)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Inserted <span class="hljs-subst">{<span class="hljs-built_in">len</span>(data)}</span> embeddings into Milvus&quot;</span>)
    <span class="hljs-keyword">return</span> insert_result

<span class="hljs-comment"># Usage example</span>
video_url = <span class="hljs-string">&quot;https://example.com/your-video.mp4&quot;</span>

<span class="hljs-comment"># Assuming this function exists from previous step</span>
embeddings, task_result = generate_embedding(video_url)

<span class="hljs-comment"># Insert embeddings into the Milvus collection</span>
insert_result = insert_embeddings(milvus_client, collection_name, task_result, video_url)
<span class="hljs-built_in">print</span>(insert_result)
<button class="copy-code-btn"></button></code></pre>
<p>Diese Funktion bereitet die Daten für das Einfügen vor, einschließlich aller relevanten Metadaten wie dem Einbettungsvektor, dem Zeitbereich und der Quellvideo-URL. Anschließend verwendet sie den Milvus-Client, um diese Daten in die angegebene Sammlung einzufügen.</p>
<h2 id="Performing-Similarity-Search" class="common-anchor-header">Durchführen einer Ähnlichkeitssuche<button data-href="#Performing-Similarity-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Sobald wir unsere Einbettungen in Milvus gespeichert haben, können wir eine Ähnlichkeitssuche durchführen, um die relevantesten Videosegmente auf der Grundlage eines Abfragevektors zu finden. Im Folgenden wird beschrieben, wie diese Funktionalität implementiert wird:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">perform_similarity_search</span>(<span class="hljs-params">milvus_client, collection_name, query_vector, limit=<span class="hljs-number">5</span></span>):
    <span class="hljs-string">&quot;&quot;&quot;
    Perform a similarity search on the Milvus collection.

    Args:
        milvus_client: The Milvus client instance.
        collection_name (str): The name of the Milvus collection to search in.
        query_vector (list): The query vector to search for similar embeddings.
        limit (int, optional): The maximum number of results to return. Defaults to 5.

    Returns:
        list: A list of search results, where each result is a dictionary containing
              the matched entity&#x27;s metadata and similarity score.

    This function searches the specified Milvus collection for embeddings similar to
    the given query vector. It returns the top matching results, including metadata
    such as the embedding scope, time range, and associated video URL for each match.
    &quot;&quot;&quot;</span>
    search_results = milvus_client.search(
        collection_name=collection_name,
        data=[query_vector],
        limit=limit,
        output_fields=[<span class="hljs-string">&quot;embedding_scope&quot;</span>, <span class="hljs-string">&quot;start_offset_sec&quot;</span>, <span class="hljs-string">&quot;end_offset_sec&quot;</span>, <span class="hljs-string">&quot;video_url&quot;</span>]
    )

    <span class="hljs-keyword">return</span> search_results
    
<span class="hljs-comment"># define the query vector</span>
<span class="hljs-comment"># We use the embedding inserted previously as an example. In practice, you can replace it with any video embedding you want to query.</span>
query_vector = task_result.video_embeddings[<span class="hljs-number">0</span>].embedding.<span class="hljs-built_in">float</span>

<span class="hljs-comment"># Perform a similarity search on the Milvus collection</span>
search_results = perform_similarity_search(milvus_client, collection_name, query_vector)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Search Results:&quot;</span>)
<span class="hljs-keyword">for</span> i, result <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(search_results[<span class="hljs-number">0</span>]):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Result <span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>:&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Video URL: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;video_url&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Time Range: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;start_offset_sec&#x27;</span>]}</span> - <span class="hljs-subst">{result[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;end_offset_sec&#x27;</span>]}</span> seconds&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  Similarity Score: <span class="hljs-subst">{result[<span class="hljs-string">&#x27;distance&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>()
<button class="copy-code-btn"></button></code></pre>
<p>Diese Implementierung tut Folgendes:</p>
<ol>
<li>Definiert eine Funktion perform_similarity_search, die einen Abfragevektor nimmt und nach ähnlichen Einbettungen in der Milvus-Sammlung sucht.</li>
<li>Verwendet die Suchmethode des Milvus-Clients, um die ähnlichsten Vektoren zu finden.</li>
<li>Gibt die Ausgabefelder an, die wir abrufen möchten, einschließlich der Metadaten über die übereinstimmenden Videosegmente.</li>
<li>Bietet ein Beispiel für die Verwendung dieser Funktion mit einem Abfragevideo, wobei zunächst dessen Einbettung generiert und dann für die Suche verwendet wird.</li>
<li>Druckt die Suchergebnisse aus, einschließlich relevanter Metadaten und Ähnlichkeitswerte.</li>
</ol>
<p>Durch die Implementierung dieser Funktionen haben Sie einen vollständigen Arbeitsablauf für die Speicherung von Videoeinbettungen in Milvus und die Durchführung von Ähnlichkeitssuchen geschaffen. Diese Einrichtung ermöglicht eine effiziente Suche nach ähnlichen Videoinhalten auf der Grundlage der von der Embed-API von Twelve Labs generierten multimodalen Einbettungen.</p>
<h2 id="Optimizing-Performance" class="common-anchor-header">Optimierung der Leistung<button data-href="#Optimizing-Performance" class="anchor-icon" translate="no">
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
    </button></h2><p>Nun gut, bringen wir diese Anwendung auf die nächste Stufe! Beim Umgang mit großen Videosammlungen <strong>ist die Leistung entscheidend</strong>. Um diese zu optimieren, sollten wir eine <a href="https://milvus.io/docs/v2.3.x/bulk_insert.md">Stapelverarbeitung für die Erzeugung von Einbettungen und das Einfügen in Milvus</a> implementieren. Auf diese Weise können wir mehrere Videos gleichzeitig verarbeiten und die Gesamtverarbeitungszeit erheblich reduzieren. Außerdem könnten wir die <a href="https://milvus.io/docs/v2.2.x/partition_key.md">Partitionierungsfunktion von Milvus</a> nutzen, um unsere Daten effizienter zu organisieren, beispielsweise nach Videokategorien oder Zeiträumen. Dies würde die Abfragen beschleunigen, da wir nur relevante Partitionen durchsuchen könnten.</p>
<p>Ein weiterer Optimierungstrick ist die <strong>Verwendung von Caching-Mechanismen für häufig verwendete Einbettungen oder Suchergebnisse</strong>. Dies könnte die Antwortzeiten für beliebte Suchanfragen drastisch verbessern. Vergessen Sie nicht, <a href="https://milvus.io/docs/index-vector-fields.md?tab=floating">die Indexparameter von Milvus</a> auf der Grundlage Ihres spezifischen Datensatzes und Ihrer Abfragemuster <a href="https://milvus.io/docs/index-vector-fields.md?tab=floating">fein abzustimmen</a> - eine kleine Anpassung kann die Suchleistung erheblich verbessern.</p>
<h2 id="Advanced-Features" class="common-anchor-header">Erweiterte Funktionen<button data-href="#Advanced-Features" class="anchor-icon" translate="no">
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
    </button></h2><p>Fügen wir nun einige coole Funktionen hinzu, damit sich unsere Anwendung von anderen abhebt! Wir könnten <strong>eine hybride Suche</strong> implementieren <strong>, die Text- und Videoabfragen kombiniert</strong>. Tatsächlich <a href="https://docs.twelvelabs.io/docs/create-text-embeddings">kann die Twelve Labs Embed API auch Texteinbettungen für Ihre Textabfragen erzeugen</a>. Stellen Sie sich vor, die Nutzer könnten sowohl eine Textbeschreibung als auch ein Beispielvideo eingeben - wir würden Einbettungen für beide generieren und eine gewichtete Suche in Milvus durchführen. Das würde uns sehr präzise Ergebnisse liefern.</p>
<p>Eine weitere großartige Ergänzung wäre die <strong>zeitliche Suche innerhalb von Videos</strong>. <a href="https://docs.twelvelabs.io/docs/create-video-embeddings#customize-your-embeddings">Wir könnten lange Videos in kleinere Segmente unterteilen, jedes mit seiner eigenen Einbettung</a>. Auf diese Weise könnten die Nutzer bestimmte Momente in Videos finden, nicht nur ganze Clips. Und warum sollte man nicht auch eine grundlegende Videoanalyse einbauen? Wir könnten die Einbettungen verwenden, um ähnliche Videosegmente zu gruppieren, Trends zu erkennen oder sogar Ausreißer in großen Videosammlungen zu identifizieren.</p>
<h2 id="Error-Handling-and-Logging" class="common-anchor-header">Fehlerbehandlung und Protokollierung<button data-href="#Error-Handling-and-Logging" class="anchor-icon" translate="no">
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
    </button></h2><p>Machen wir uns nichts vor, es kann immer etwas schief gehen, und wenn das der Fall ist, müssen wir darauf vorbereitet sein. <strong>Die Implementierung einer robusten Fehlerbehandlung ist entscheidend</strong>. Wir sollten <a href="https://softwareengineering.stackexchange.com/questions/64180/good-use-of-try-catch-blocks">unsere API-Aufrufe und Datenbankoperationen in Try-Except-Blöcke verpacken</a> und den Benutzern informative Fehlermeldungen geben, wenn etwas fehlschlägt. Bei netzwerkbezogenen Problemen kann die <a href="https://learn.microsoft.com/en-us/dotnet/architecture/microservices/implement-resilient-applications/implement-retries-exponential-backoff">Implementierung von Wiederholungsversuchen mit exponentiellem Backoff</a> helfen, vorübergehende Störungen elegant zu behandeln.</p>
<p><strong>Die Protokollierung ist unser bester Freund beim Debuggen und Überwachen</strong>. Wir sollten <a href="https://blog.sentry.io/logging-in-python-a-developers-guide/">das Logging-Modul von Python</a> verwenden, um wichtige Ereignisse, Fehler und Leistungsmetriken in unserer Anwendung zu verfolgen. Wir sollten verschiedene Protokollierungsebenen einrichten - DEBUG für die Entwicklung, INFO für den allgemeinen Betrieb und ERROR für kritische Probleme. Vergessen Sie nicht, die Protokollrotation zu implementieren, um die Dateigrößen zu verwalten. Mit einer ordnungsgemäßen Protokollierung können wir Probleme schnell erkennen und beheben und sicherstellen, dass unsere Videosuchanwendung auch bei einer Erweiterung reibungslos funktioniert.</p>
<h2 id="Conclusion" class="common-anchor-header">Fazit<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Herzlichen Glückwunsch! Sie haben nun eine leistungsstarke semantische Videosuchanwendung mithilfe der Embed-API von Twelve Labs und Milvus erstellt. Diese Integration ermöglicht es Ihnen, Videoinhalte mit beispielloser Genauigkeit und Effizienz zu verarbeiten, zu speichern und abzurufen. Durch die Nutzung von multimodalen Einbettungen haben Sie ein System geschaffen, das die Nuancen von Videodaten versteht und spannende Möglichkeiten für die Erkennung von Inhalten, Empfehlungssysteme und fortschrittliche Videoanalysen eröffnet.</p>
<p>Denken Sie bei der weiteren Entwicklung und Verfeinerung Ihrer Anwendung daran, dass die Kombination aus der fortschrittlichen Einbettungsgenerierung von Twelve Labs und der skalierbaren Vektorspeicherung von Milvus eine solide Grundlage für die Bewältigung noch komplexerer Herausforderungen beim Verstehen von Videos bietet. Wir möchten Sie ermutigen, mit den besprochenen fortschrittlichen Funktionen zu experimentieren und die Grenzen dessen, was bei der Videosuche und -analyse möglich ist, zu erweitern.</p>
