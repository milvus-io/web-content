---
id: dashscope-ranker.md
title: DashScope RankerCompatible with Milvus 2.6.x
summary: >-
  In diesem Thema wird beschrieben, wie man DashScope-Reranking-Modelle, wie
  beispielsweise Qwen-Reranking-Modelle, in Milvus konfiguriert und verwendet.
beta: Milvus 2.6.x
---
<h1 id="DashScope-Ranker" class="common-anchor-header">DashScope Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#DashScope-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>Mit dem DashScope Ranker kann Milvus die DashScope-Reranking-Modelle von Alibaba Cloud aufrufen, um Suchergebnisse nach semantischer Relevanz neu zu ordnen.</p>
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
    </button></h2><p>Bevor Sie den DashScope Ranker verwenden, stellen Sie sicher, dass Sie über Folgendes verfügen:</p>
<ul>
<li><p>Eine Milvus-Sammlung mit einem Feld „ <code translate="no">VARCHAR</code> “, das den zu neu gewerteten Text enthält.</p></li>
<li><p>Einen gültigen DashScope-API-Schlüssel.</p></li>
<li><p>Zugriff auf ein DashScope-Reranking-Modell, z. B. „ <code translate="no">gte-rerank-v2</code> “.</p></li>
</ul>
<p>Informationen zu verfügbaren Reranking-Modellen und regionalen Endpunkten finden Sie in der <a href="https://www.alibabacloud.com/help/en/model-studio/text-rerank-api">Alibaba Cloud Model Studio Text Rerank API</a>.</p>
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
    </button></h2><p>Milvus muss Ihren DashScope-API-Schlüssel kennen, bevor es eine Neuordnung bei DashScope anfordern kann. Sie können den API-Schlüssel in <code translate="no">milvus.yaml</code> oder über eine Umgebungsvariable konfigurieren.</p>
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
    </button></h3><p>Speichern Sie Ihren API-Schlüssel unter <code translate="no">milvus.yaml</code> und verweisen Sie den DashScope-Rerank-Anbieter auf das Anmeldeinformationen-Label.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">dashscope_apikey:</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_DASHSCOPE_API_KEY&gt;</span>

<span class="hljs-attr">function:</span>
  <span class="hljs-attr">rerank:</span>
    <span class="hljs-attr">model:</span>
      <span class="hljs-attr">providers:</span>
        <span class="hljs-attr">ali:</span>
          <span class="hljs-attr">credential:</span> <span class="hljs-string">dashscope_apikey</span>
          <span class="hljs-comment"># url: https://dashscope.aliyuncs.com/api/v1/services/rerank/text-rerank/text-rerank</span>
<button class="copy-code-btn"></button></code></pre>
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
    </button></h3><p>Wenn in der Datei „ <code translate="no">milvus.yaml</code> “ keine passenden Anmeldedaten konfiguriert sind, kann Milvus den DashScope-API-Schlüssel aus der folgenden Umgebungsvariablen auslesen:</p>
<table>
   <tr>
     <th><p>Variable</p></th>
     <th><p>Erforderlich?</p></th>
     <th><p>Beschreibung</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">MILVUS_DASHSCOPE_API_KEY</code></p></td>
     <td><p>Ja</p></td>
     <td><p>DashScope-API-Schlüssel, der vom Milvus-Dienst zum Aufruf von Alibaba Cloud DashScope verwendet wird.</p></td>
   </tr>
</table>
<h2 id="Create-a-DashScope-ranker-function" class="common-anchor-header">Erstellen Sie eine DashScope-Ranking-Funktion<button data-href="#Create-a-DashScope-ranker-function" class="anchor-icon" translate="no">
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
    </button></h2><p>Um den DashScope-Ranker zu verwenden, erstellen Sie ein Function-Objekt, das das DashScope-Reranking-Modell und den Abfragetext angibt. Verwenden Sie „ <code translate="no">provider: &quot;ali&quot;</code> “ für das DashScope-Reranking.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

dashscope_ranker = Function(
    name=<span class="hljs-string">&quot;dashscope_semantic_ranker&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;ali&quot;</span>,
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;gte-rerank-v2&quot;</span>,
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;renewable energy developments&quot;</span>],
        <span class="hljs-string">&quot;max_client_batch_size&quot;</span>: <span class="hljs-number">128</span>,
        <span class="hljs-string">&quot;credential&quot;</span>: <span class="hljs-string">&quot;dashscope_apikey&quot;</span>,
    },
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="DashScope-ranker-specific-parameters" class="common-anchor-header">DashScope-Ranker-spezifische Parameter<button data-href="#DashScope-ranker-specific-parameters" class="anchor-icon" translate="no">
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
    </button></h3><table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Erforderlich?</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wert / Beispiel</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">reranker</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Muss auf „ <code translate="no">"model"</code> “ gesetzt werden, um die Neureihung des Modells zu aktivieren.</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Der für die Neubewertung zu verwendende Modelldienstanbieter. Verwenden Sie für DashScope „ <code translate="no">"ali"</code> “.</p></td>
     <td><p><code translate="no">"ali"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Das zu verwendende DashScope-Modell für die Neubewertung.</p></td>
     <td><p><code translate="no">"gte-rerank-v2"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queries</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Liste der Suchbegriffe, die vom Reranking-Modell zur Berechnung der Relevanzwerte verwendet werden. Die Anzahl der Suchbegriffe muss mit der Anzahl der Suchanfragen in der Suchanforderung übereinstimmen.</p></td>
     <td><p><code translate="no">["renewable energy developments"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>Nein</p></td>
     <td><p>Maximale Anzahl an Dokumenten, die pro Anfrage an den Modelldienst gesendet werden sollen.</p></td>
     <td><p><code translate="no">128</code> (Standard)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">credential</code></p></td>
     <td><p>Nein</p></td>
     <td><p>Die Bezeichnung einer Anmeldeinformation, die im obersten Abschnitt „ <code translate="no">credential:</code> “ unter <code translate="no">milvus.yaml</code> definiert ist.</p></td>
     <td><p><code translate="no">"dashscope_apikey"</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>Informationen zu allgemeinen Parametern, die für alle Modell-Ranker gelten, wie z. B. „ <code translate="no">provider</code> “ und „ <code translate="no">queries</code> “, finden Sie unter <a href="/docs/de/model-ranker-overview.md#Create-a-model-ranker">„Modell-Ranker erstellen</a>“.</p>
</div>
<h2 id="Apply-to-standard-vector-search" class="common-anchor-header">Anwendung auf die Standard-Vektorsuche<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Um den DashScope Ranker auf eine Standard-Vektorsuche anzuwenden, übergeben Sie die Ranker-Funktion an „ <code translate="no">search()</code> “.</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    data=[your_query_vector],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],
    ranker=dashscope_ranker,
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
