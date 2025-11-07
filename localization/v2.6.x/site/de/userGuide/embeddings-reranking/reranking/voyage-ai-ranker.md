---
id: voyage-ai-ranker.md
title: Voyage AI RankerCompatible with Milvus 2.6.x
summary: >-
  Der Voyage AI Ranker nutzt die spezialisierten Reranker von Voyage AI zur
  Verbesserung der Suchrelevanz durch semantisches Reranking. Er bietet
  leistungsstarke Reranking-Funktionen, die für Retrieval-augmented Generation
  (RAG) und Suchanwendungen optimiert sind.
beta: Milvus 2.6.x
---
<h1 id="Voyage-AI-Ranker" class="common-anchor-header">Voyage AI Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Voyage-AI-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>Der Voyage AI Ranker nutzt die spezialisierten Reranker <a href="https://www.voyageai.com/">von Voyage AI</a> zur Verbesserung der Suchrelevanz durch semantisches Reranking. Er bietet leistungsstarke Reranking-Funktionen, die für Retrieval-Augmented Generation (RAG) und Suchanwendungen optimiert sind.</p>
<p>Der Voyage AI Ranker ist besonders wertvoll für Anwendungen, die Folgendes erfordern</p>
<ul>
<li><p>Fortschrittliches semantisches Verständnis mit speziell für Reranking-Aufgaben trainierten Modellen</p></li>
<li><p>Leistungsstarke Verarbeitung mit optimierter Inferenz für Produktions-Workloads</p></li>
<li><p>Flexible Trunkierungssteuerungen für den Umgang mit unterschiedlichen Dokumentenlängen</p></li>
<li><p>Feinabgestimmte Leistung über verschiedene Modellvarianten (rerank-2, rerank-lite, etc.)</p></li>
</ul>
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
    </button></h2><p>Bevor Sie Voyage AI Ranker in Milvus implementieren, müssen Sie sicherstellen, dass Sie über Folgendes verfügen</p>
<ul>
<li><p>Eine Milvus-Sammlung mit einem <code translate="no">VARCHAR</code> -Feld, das den zu rankenden Text enthält</p></li>
<li><p>Einen gültigen Voyage AI API-Schlüssel mit Zugriff auf Reranker. Melden Sie sich auf der <a href="https://www.voyageai.com/">Plattform von Voyage AI</a> an, um Ihre API-Anmeldedaten zu erhalten. Sie können entweder:</p>
<ul>
<li><p>Setzen Sie die Umgebungsvariable <code translate="no">VOYAGE_API_KEY</code>, oder</p></li>
<li><p>Geben Sie den API-Schlüssel direkt in der Ranker-Konfiguration an</p></li>
</ul></li>
</ul>
<h2 id="Create-a-Voyage-AI-ranker-function" class="common-anchor-header">Erstellen Sie eine Voyage AI Ranker Funktion<button data-href="#Create-a-Voyage-AI-ranker-function" class="anchor-icon" translate="no">
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
    </button></h2><p>Um den Voyage AI Ranker in Ihrer Milvus-Anwendung zu verwenden, erstellen Sie ein Function-Objekt, das angibt, wie das Ranking funktionieren soll. Diese Funktion wird an Milvus-Suchoperationen übergeben, um das Ergebnis-Ranking zu verbessern.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType

<span class="hljs-comment"># Connect to your Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>  <span class="hljs-comment"># Replace with your Milvus server URI</span>
)

<span class="hljs-comment"># Configure Voyage AI Ranker</span>
voyageai_ranker = Function(
    name=<span class="hljs-string">&quot;voyageai_semantic_ranker&quot;</span>,        <span class="hljs-comment"># Unique identifier for your ranker</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],         <span class="hljs-comment"># VARCHAR field containing text to rerank</span>
    function_type=FunctionType.RERANK,      <span class="hljs-comment"># Must be RERANK for reranking functions</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,                <span class="hljs-comment"># Enables model-based reranking</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;voyageai&quot;</span>,             <span class="hljs-comment"># Specifies Voyage AI as the service provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;rerank-2.5&quot;</span>,           <span class="hljs-comment"># Voyage AI reranker to use</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;renewable energy developments&quot;</span>], <span class="hljs-comment"># Query text for relevance evaluation</span>
        <span class="hljs-string">&quot;max_client_batch_size&quot;</span>: <span class="hljs-number">128</span>,       <span class="hljs-comment"># Optional: batch size for model service requests (default: 128)</span>
        <span class="hljs-string">&quot;truncation&quot;</span>: <span class="hljs-literal">True</span>,                 <span class="hljs-comment"># Optional: enable input truncation (default: True)</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;your-voyage-api-key&quot; # Optional: if not set, uses VOYAGE_API_KEY env var</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
                       .functionType(FunctionType.RERANK)
                       .name(<span class="hljs-string">&quot;voyageai_semantic_ranker&quot;</span>)
                       .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;document&quot;</span>))
                       .param(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;model&quot;</span>)
                       .param(<span class="hljs-string">&quot;provider&quot;</span>, <span class="hljs-string">&quot;voyageai&quot;</span>)
                       .param(<span class="hljs-string">&quot;model_name&quot;</span>, <span class="hljs-string">&quot;rerank-2.5&quot;</span>)
                       .param(<span class="hljs-string">&quot;queries&quot;</span>, <span class="hljs-string">&quot;[\&quot;renewable energy developments\&quot;]&quot;</span>)
                       .param(<span class="hljs-string">&quot;endpoint&quot;</span>, <span class="hljs-string">&quot;http://localhost:8080&quot;</span>)
                       .param(<span class="hljs-string">&quot;max_client_batch_size&quot;</span>, <span class="hljs-string">&quot;128&quot;</span>)
                       .param(<span class="hljs-string">&quot;truncation&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>)
                       .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Voyage-AI-ranker-specific-parameters" class="common-anchor-header">Voyage AI Ranker-spezifische Parameter<button data-href="#Voyage-AI-ranker-specific-parameters" class="anchor-icon" translate="no">
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
    </button></h3><p>Die folgenden Parameter sind spezifisch für den Voyage AI Ranker:</p>
<table>
   <tr>
     <th><p><strong>Parameter</strong></p></th>
     <th><p><strong>Erforderlich?</strong></p></th>
     <th><p><strong>Beschreibung</strong></p></th>
     <th><p><strong>Wert / Beispiel</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">reranker</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Muss auf <code translate="no">"model"</code> gesetzt werden, um das Modell-Reranking zu aktivieren.</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Der Modelldienstanbieter, der für das Reranking verwendet werden soll.</p></td>
     <td><p><code translate="no">"voyageai"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Der Voyage AI Reranker, der von den unterstützten Modellen auf der Voyage AI Plattform verwendet werden soll.</p><p>Eine Liste der verfügbaren Reranker finden Sie in der <a href="https://docs.voyageai.com/docs/reranker">Voyage</a><a href="https://docs.voyageai.com/docs/reranker"> AI-Dokumentation</a>.</p></td>
     <td><p><code translate="no">"rerank-2.5"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queries</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Liste der Abfrage-Strings, die vom Rerank-Modell zur Berechnung der Relevanz-Scores verwendet werden. Die Anzahl der Abfrage-Strings muss genau mit der Anzahl der Abfragen in Ihrem Suchvorgang übereinstimmen (auch bei Verwendung von Abfrage-Vektoren anstelle von Text), andernfalls wird ein Fehler gemeldet.</p></td>
     <td><p><em>["Suchanfrage"]</em></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>Nein</p></td>
     <td><p>Da Modelldienste möglicherweise nicht alle Daten auf einmal verarbeiten, wird hier die Stapelgröße für den Zugriff auf den Modelldienst in mehreren Anfragen festgelegt.</p></td>
     <td><p><code translate="no">128</code> (Voreinstellung)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">truncation</code></p></td>
     <td><p>Nein</p></td>
     <td><p>Ob die Eingabe gekürzt werden soll, um die "Kontextlängenbegrenzung" für die Abfrage und die Dokumente zu erfüllen.</p><ul><li><p>Wenn <code translate="no">True</code>, werden die Abfrage und die Dokumente so gekürzt, dass sie in die Kontextlängenbegrenzung passen, bevor sie vom Reranker-Modell verarbeitet werden.</p></li><li><p>Wenn <code translate="no">False</code>, wird ein Fehler ausgelöst, wenn die Abfrage 8.000 Token für <code translate="no">rerank-2.5</code> und <code translate="no">rerank-2.5-lite</code>; 4.000 Token für <code translate="no">rerank-2</code>; 2.000 Token <code translate="no">rerank-2-lite</code> und <code translate="no">rerank-1</code>; und 1.000 Token für <code translate="no">rerank-lite-1</code> überschreitet, oder die Summe der Anzahl der Token in der Abfrage und der Anzahl der Token in einem einzelnen Dokument 16.000 für <code translate="no">rerank-2</code>; 8.000 für <code translate="no">rerank-2-lite</code> und <code translate="no">rerank-1</code>; und 4.000 für <code translate="no">rerank-lite-1</code> übersteigt.</p></li></ul></td>
     <td><p><code translate="no">True</code> (Standard) oder <code translate="no">False</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">credential</code></p></td>
     <td><p>Keine</p></td>
     <td><p>Authentifizierungsnachweis für den Zugriff auf Voyage AI API-Dienste. Wenn nicht angegeben, sucht das System nach der Umgebungsvariablen <code translate="no">VOYAGE_API_KEY</code>.</p></td>
     <td><p><em>"ihr-voyage-api-schlüssel"</em></p></td>
   </tr>
</table>
<div class="alert note">
<p>Für allgemeine Parameter, die von allen Model Rankern verwendet werden (z.B. <code translate="no">provider</code>, <code translate="no">queries</code>), siehe <a href="/docs/de/model-ranker-overview.md#Create-a-model-ranker">Erstellen eines Model Rankers</a>.</p>
</div>
<h2 id="Apply-to-standard-vector-search" class="common-anchor-header">Auf Standard-Vektorsuche anwenden<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h2><p>So wenden Sie den Voyage AI Ranker auf eine Standard-Vektorsuche an:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Execute search with Voyage AI reranker</span>
results = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    data=[your_query_vector],  <span class="hljs-comment"># Replace with your query vector</span>
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,                   <span class="hljs-comment"># Vector field to search</span>
    limit=<span class="hljs-number">5</span>,                                     <span class="hljs-comment"># Number of results to return</span>
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],                  <span class="hljs-comment"># Include text field for reranking</span>
<span class="highlighted-wrapper-line">    ranker=voyageai_ranker,                     <span class="hljs-comment"># Apply Voyage AI reranker</span></span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;your_collection&quot;</span>)
        .data(Arrays.asList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;AI Research Progress&quot;</span>), <span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;What is AI&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;vector_field&quot;</span>)
        .limit(<span class="hljs-number">10</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;document&quot;</span>))
        .functionScore(FunctionScore.builder()
                .addFunction(ranker)
                .build())
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Apply-to-hybrid-search" class="common-anchor-header">Anwenden auf eine hybride Suche<button data-href="#Apply-to-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Voyage AI Ranker kann auch mit hybrider Suche verwendet werden, um dichte und spärliche Suchmethoden zu kombinieren:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Configure dense vector search</span>
dense_search = AnnSearchRequest(
    data=[your_query_vector_1], <span class="hljs-comment"># Replace with your query vector</span>
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">5</span>
)

<span class="hljs-comment"># Configure sparse vector search  </span>
sparse_search = AnnSearchRequest(
    data=[your_query_vector_2], <span class="hljs-comment"># Replace with your query vector</span>
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>, 
    param={},
    limit=<span class="hljs-number">5</span>
)

<span class="hljs-comment"># Execute hybrid search with Voyage AI reranker</span>
hybrid_results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    [dense_search, sparse_search],              <span class="hljs-comment"># Multiple search requests</span>
<span class="highlighted-wrapper-line">    ranker=voyageai_ranker,                    <span class="hljs-comment"># Apply Voyage AI reranker to combined results</span></span>
    limit=<span class="hljs-number">5</span>,                                   <span class="hljs-comment"># Final number of results</span>
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.AnnSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.HybridSearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
        
List&lt;AnnSearchReq&gt; searchRequests = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;dense_vector&quot;</span>)
        .vectors(Arrays.asList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(embedding1), <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(embedding2)))
        .limit(<span class="hljs-number">5</span>)
        .build());
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName(<span class="hljs-string">&quot;sparse_vector&quot;</span>)
        .data(Arrays.asList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;AI Research Progress&quot;</span>), <span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;What is AI&quot;</span>)))
        .limit(<span class="hljs-number">5</span>)
        .build());

<span class="hljs-type">HybridSearchReq</span> <span class="hljs-variable">hybridSearchReq</span> <span class="hljs-operator">=</span> HybridSearchReq.builder()
                .collectionName(<span class="hljs-string">&quot;your_collection&quot;</span>)
                .searchRequests(searchRequests)
                .ranker(ranker)
                .limit(<span class="hljs-number">5</span>)
                .outputFields(Collections.singletonList(<span class="hljs-string">&quot;document&quot;</span>))
                .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.hybridSearch(hybridSearchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
