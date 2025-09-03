---
id: cohere-ranker.md
title: Cohere RankerCompatible with Milvus 2.6.x
summary: >-
  Der Cohere Ranker nutzt die leistungsstarken Rerank-Modelle von Cohere zur
  Verbesserung der Suchrelevanz durch semantisches Reranking. Er bietet
  Reranking-Funktionen auf Unternehmensniveau mit robuster API-Infrastruktur und
  optimierter Leistung für Produktionsumgebungen.
beta: Milvus 2.6.x
---
<h1 id="Cohere-Ranker" class="common-anchor-header">Cohere Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Cohere-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>Der Cohere Ranker nutzt die leistungsstarken Rerank-Modelle <a href="https://cohere.com/">von Cohere</a> zur Verbesserung der Suchrelevanz durch semantisches Reranking. Er bietet Reranking-Funktionen auf Unternehmensniveau mit einer robusten API-Infrastruktur und optimierter Leistung für Produktionsumgebungen.</p>
<p>Cohere Ranker ist besonders wertvoll für Anwendungen, die Folgendes erfordern</p>
<ul>
<li><p>Hochwertiges semantisches Verständnis mit modernsten Rerank-Modellen</p></li>
<li><p>Zuverlässigkeit und Skalierbarkeit auf Unternehmensebene für Produktionsworkloads</p></li>
<li><p>Mehrsprachige Reranking-Funktionen für verschiedene Inhaltstypen</p></li>
<li><p>Konsistente API-Leistung mit integrierter Ratenbegrenzung und Fehlerbehandlung</p></li>
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
    </button></h2><p>Bevor Sie Cohere Ranker in Milvus implementieren, müssen Sie sicherstellen, dass Sie über Folgendes verfügen:</p>
<ul>
<li><p>Eine Milvus-Sammlung mit einem <code translate="no">VARCHAR</code> -Feld, das den neu zu bewertenden Text enthält</p></li>
<li><p>Einen gültigen Cohere-API-Schlüssel mit Zugriff auf die Ranglistenmodelle. Melden Sie sich auf der <a href="https://dashboard.cohere.com/">Plattform von Cohere</a> an, um Ihre API-Zugangsdaten zu erhalten. Sie können entweder:</p>
<ul>
<li><p>Setzen Sie die Umgebungsvariable <code translate="no">COHERE_API_KEY</code>, oder</p></li>
<li><p>Geben Sie den API-Schlüssel direkt in der <code translate="no">credential</code> der <a href="/docs/de/cohere-ranker.md#Create-a-Cohere-ranker-function">Ranker-Konfiguration</a> an.</p></li>
</ul></li>
</ul>
<h2 id="Create-a-Cohere-ranker-function" class="common-anchor-header">Erstellen Sie eine Cohere Ranker-Funktion<button data-href="#Create-a-Cohere-ranker-function" class="anchor-icon" translate="no">
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
    </button></h2><p>Um Cohere Ranker in Ihrer Milvus-Anwendung zu verwenden, erstellen Sie ein Function-Objekt, das angibt, wie das Ranking funktionieren soll. Diese Funktion wird an Milvus-Suchoperationen übergeben, um das Ranking der Ergebnisse zu verbessern.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType

<span class="hljs-comment"># Connect to your Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>  <span class="hljs-comment"># Replace with your Milvus server URI</span>
)

<span class="hljs-comment"># Configure Cohere Ranker</span>
cohere_ranker = Function(
    name=<span class="hljs-string">&quot;cohere_semantic_ranker&quot;</span>,          <span class="hljs-comment"># Unique identifier for your ranker</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],         <span class="hljs-comment"># VARCHAR field containing text to rerank</span>
    function_type=FunctionType.RERANK,      <span class="hljs-comment"># Must be RERANK for reranking functions</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,                <span class="hljs-comment"># Enables model-based reranking</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;cohere&quot;</span>,               <span class="hljs-comment"># Specifies Cohere as the service provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;rerank-english-v3.0&quot;</span>, <span class="hljs-comment"># Cohere rerank model to use</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;renewable energy developments&quot;</span>], <span class="hljs-comment"># Query text for relevance evaluation</span>
        <span class="hljs-string">&quot;max_client_batch_size&quot;</span>: <span class="hljs-number">128</span>,       <span class="hljs-comment"># Optional: batch size for model service requests (default: 128)</span>
        <span class="hljs-string">&quot;max_tokens_per_doc&quot;</span>: <span class="hljs-number">4096</span>,         <span class="hljs-comment"># Optional: max tokens per document (default: 4096)</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;your-cohere-api-key&quot; # Optional: authentication credential for Cohere API</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Cohere-ranker-specific-parameters" class="common-anchor-header">Cohere Ranker-spezifische Parameter<button data-href="#Cohere-ranker-specific-parameters" class="anchor-icon" translate="no">
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
    </button></h3><p>Die folgenden Parameter sind spezifisch für den Cohere Ranker:</p>
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
     <td><p><code translate="no">"cohere"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Das zu verwendende Cohere-Rerank-Modell aus den unterstützten Modellen der Cohere-Plattform. Eine Liste der verfügbaren Rerank-Modelle finden Sie in der <a href="https://docs.cohere.com/docs/rerank">Cohere-Dokumentation</a>.</p></td>
     <td><p><code translate="no">"rerank-english-v3.0"</code>, <code translate="no">"rerank-multilingual-v3.0"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queries</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Liste der Abfrage-Strings, die vom Rerank-Modell zur Berechnung der Relevanzwerte verwendet werden. Die Anzahl der Abfragezeichenfolgen muss genau mit der Anzahl der Abfragen in Ihrem Suchvorgang übereinstimmen (auch bei Verwendung von Abfragevektoren anstelle von Text), andernfalls wird ein Fehler gemeldet.</p></td>
     <td><p><em>["Suchanfrage"]</em></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>Nein</p></td>
     <td><p>Da Modelldienste möglicherweise nicht alle Daten auf einmal verarbeiten, wird hier die Stapelgröße für den Zugriff auf den Modelldienst in mehreren Anfragen festgelegt.</p></td>
     <td><p><code translate="no">128</code> (Voreinstellung)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_tokens_per_doc</code></p></td>
     <td><p>Nein</p></td>
     <td><p>Maximale Anzahl von Token pro Dokument. Lange Dokumente werden automatisch auf die angegebene Anzahl von Token gekürzt.</p></td>
     <td><p><code translate="no">4096</code> (Voreinstellung)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">credential</code></p></td>
     <td><p>Nein</p></td>
     <td><p>Authentifizierungsnachweis für den Zugriff auf Cohere-API-Dienste. Wenn nicht angegeben, sucht das System nach der Umgebungsvariablen <code translate="no">COHERE_API_KEY</code>.</p></td>
     <td><p><em>"ihr-cohere-api-schlüssel"</em></p></td>
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
    </button></h2><p>So wenden Sie Cohere Ranker auf eine Standard-Vektorsuche an:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Execute search with Cohere reranking</span>
results = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    data=[<span class="hljs-string">&quot;AI Research Progress&quot;</span>, <span class="hljs-string">&quot;What is AI&quot;</span>],  <span class="hljs-comment"># Search queries</span>
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,                   <span class="hljs-comment"># Vector field to search</span>
    limit=<span class="hljs-number">5</span>,                                     <span class="hljs-comment"># Number of results to return</span>
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],                  <span class="hljs-comment"># Include text field for reranking</span>
<span class="highlighted-wrapper-line">    ranker=cohere_ranker,                       <span class="hljs-comment"># Apply Cohere reranking</span></span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
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
    </button></h2><p>Cohere Ranker kann auch mit hybrider Suche verwendet werden, um dichte und spärliche Suchmethoden zu kombinieren:</p>
<div class="multipleCode">
   <a href="#bash">cURL</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-bash">from pymilvus import AnnSearchRequest

<span class="hljs-comment"># Configure dense vector search</span>
dense_search = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;AI Research Progress&quot;</span>, <span class="hljs-string">&quot;What is AI&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    param={},
    <span class="hljs-built_in">limit</span>=5
)

<span class="hljs-comment"># Configure sparse vector search  </span>
sparse_search = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;AI Research Progress&quot;</span>, <span class="hljs-string">&quot;What is AI&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>, 
    param={},
    <span class="hljs-built_in">limit</span>=5
)

<span class="hljs-comment"># Execute hybrid search with Cohere reranking</span>
hybrid_results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    [dense_search, sparse_search],              <span class="hljs-comment"># Multiple search requests</span>
<span class="highlighted-wrapper-line">    ranker=cohere_ranker,                      <span class="hljs-comment"># Apply Cohere reranking to combined results</span></span>
    <span class="hljs-built_in">limit</span>=5,                                   <span class="hljs-comment"># Final number of results</span>
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
