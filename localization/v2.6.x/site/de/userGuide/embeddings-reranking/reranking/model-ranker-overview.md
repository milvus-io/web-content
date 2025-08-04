---
id: model-ranker-overview.md
title: Model Ranker ÜberblickCompatible with Milvus 2.6.x
summary: >-
  Bei der herkömmlichen Vektorsuche werden die Ergebnisse rein nach
  mathematischer Ähnlichkeit eingestuft, d. h. danach, wie gut die Vektoren im
  hochdimensionalen Raum übereinstimmen. Dieser Ansatz ist zwar effizient, geht
  aber oft an der tatsächlichen semantischen Relevanz vorbei. Wenn Sie z. B.
  nach "Best Practices für die Datenbankoptimierung" suchen, erhalten Sie
  möglicherweise Dokumente mit hoher Vektorähnlichkeit, in denen diese Begriffe
  zwar häufig erwähnt werden, die aber keine konkreten Optimierungsstrategien
  enthalten.
beta: Milvus 2.6.x
---
<h1 id="Model-Ranker-Overview" class="common-anchor-header">Model Ranker Überblick<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Model-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Bei der herkömmlichen Vektorsuche werden die Ergebnisse rein nach mathematischer Ähnlichkeit eingestuft, d. h. danach, wie gut die Vektoren im hochdimensionalen Raum übereinstimmen. Dieser Ansatz ist zwar effizient, geht aber oft an der tatsächlichen semantischen Relevanz vorbei. Wenn Sie z. B. nach <strong>"Best Practices für die Datenbankoptimierung"</strong> suchen, erhalten Sie möglicherweise Dokumente mit hoher Vektorähnlichkeit, in denen diese Begriffe zwar häufig erwähnt werden, die aber keine wirklich umsetzbaren Optimierungsstrategien enthalten.</p>
<p>Model Ranker verändert die Milvus-Suche durch die Integration fortschrittlicher Sprachmodelle, die die semantischen Beziehungen zwischen Abfragen und Dokumenten verstehen. Anstatt sich nur auf die Vektorähnlichkeit zu verlassen, wertet es die Bedeutung des Inhalts und den Kontext aus, um intelligentere, relevante Ergebnisse zu liefern.</p>
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
<li><p>Model Rankers können nicht mit gruppierenden Suchen verwendet werden.</p></li>
<li><p>Felder, die für Model Ranker verwendet werden, müssen vom Typ Text sein (<code translate="no">VARCHAR</code>).</p></li>
<li><p>Jeder Model Ranker kann jeweils nur ein <code translate="no">VARCHAR</code> Feld für die Auswertung verwenden.</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">Wie funktioniert das?<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Model Ranker integrieren die Fähigkeiten zum Verstehen von Sprachmodellen in den Milvus-Suchprozess durch einen genau definierten Arbeitsablauf:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/model-ranker-overview.png" alt="Model Ranker Overview" class="doc-image" id="model-ranker-overview" />
   </span> <span class="img-wrapper"> <span>Model Ranker Überblick</span> </span></p>
<ol>
<li><p><strong>Erste Abfrage</strong>: Ihre Anwendung sendet eine Anfrage an Milvus</p></li>
<li><p><strong>Vektorsuche</strong>: Milvus führt eine Standard-Vektorsuche durch, um mögliche Dokumente zu identifizieren</p></li>
<li><p><strong>Abruf von Kandidaten</strong>: Das System identifiziert den ersten Satz von Kandidatendokumenten auf der Grundlage der Vektorähnlichkeit</p></li>
<li><p><strong>Modell-Bewertung</strong>: Die Model Ranker Funktion verarbeitet Abfrage-Dokumenten-Paare:</p>
<ul>
<li><p>Sendet die ursprüngliche Anfrage und die Kandidatendokumente an einen externen Modelldienst</p></li>
<li><p>Das Sprachmodell bewertet die semantische Relevanz zwischen Abfrage und jedem Dokument</p></li>
<li><p>Jedes Dokument erhält eine Relevanzbewertung basierend auf dem semantischen Verständnis</p></li>
</ul></li>
<li><p><strong>Intelligente Neuordnung</strong>: Die Dokumente werden auf der Grundlage der vom Modell generierten Relevanzwerte neu geordnet</p></li>
<li><p><strong>Verbesserte Ergebnisse</strong>: Ihre Anwendung erhält Ergebnisse, die nach semantischer Relevanz und nicht nur nach Vektorähnlichkeit geordnet sind</p></li>
</ol>
<h2 id="Choose-a-model-provider-for-your-needs" class="common-anchor-header">Wählen Sie einen Modellanbieter für Ihre Bedürfnisse<button data-href="#Choose-a-model-provider-for-your-needs" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus unterstützt die folgenden Modelldienstleister für das Reranking, die jeweils unterschiedliche Merkmale aufweisen:</p>
<table>
   <tr>
     <th><p>Anbieter</p></th>
     <th><p>Am besten geeignet für</p></th>
     <th><p>Merkmale</p></th>
     <th><p>Beispiel für einen Anwendungsfall</p></th>
   </tr>
   <tr>
     <td><p>vLLM</p></td>
     <td><p>Komplexe Anwendungen, die ein tiefes semantisches Verständnis und Anpassungen erfordern</p></td>
     <td><ul>
<li><p>Unterstützt verschiedene große Sprachmodelle</p></li>
<li><p>Flexible Einsatzmöglichkeiten</p></li>
<li><p>Höhere Anforderungen an die Rechenleistung</p></li>
<li><p>Größeres Anpassungspotenzial</p></li>
</ul></td>
     <td><p>Juristische Forschungsplattform, die domänenspezifische Modelle einsetzt, die juristische Terminologie und Rechtsprechungsbeziehungen verstehen</p></td>
   </tr>
   <tr>
     <td><p>TEI</p></td>
     <td><p>Schnelle Implementierung mit effizienter Ressourcennutzung</p></td>
     <td><ul>
<li><p>Leichtgewichtiger, für Textoperationen optimierter Dienst</p></li>
<li><p>Leichtere Bereitstellung mit geringerem Ressourcenbedarf</p></li>
<li><p>Voroptimierte Reranking-Modelle</p></li>
<li><p>Minimaler Aufwand für die Infrastruktur</p></li>
</ul></td>
     <td><p>Content-Management-System, das effiziente Reranking-Funktionen mit Standardanforderungen benötigt</p></td>
   </tr>
</table>
<p>Detaillierte Informationen zur Implementierung der einzelnen Modelldienste finden Sie in der entsprechenden Dokumentation:</p>
<ul>
<li><p><a href="/docs/de/vllm-ranker.md">vLLM-Rangierer</a></p></li>
<li><p><a href="/docs/de/tei-ranker.md">TEI-Rangierer</a></p></li>
</ul>
<h2 id="Implementation" class="common-anchor-header">Implementierung<button data-href="#Implementation" class="anchor-icon" translate="no">
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
    </button></h2><p>Bevor Sie Model Ranker implementieren, stellen Sie sicher, dass Sie über Folgendes verfügen</p>
<ul>
<li><p>Eine Milvus-Sammlung mit einem <code translate="no">VARCHAR</code> Feld, das den zu bewertenden Text enthält</p></li>
<li><p>Einen laufenden externen Modelldienst (vLLM oder TEI), der für Ihre Milvus-Instanz zugänglich ist</p></li>
<li><p>Geeignete Netzwerkverbindungen zwischen Milvus und dem von Ihnen gewählten Modelldienst</p></li>
</ul>
<p>Modell-Ranker lassen sich nahtlos sowohl in die Standard-Vektorsuche als auch in hybride Suchoperationen integrieren. Die Implementierung umfasst die Erstellung eines Funktionsobjekts, das Ihre Rangordnungskonfiguration definiert, und dessen Übergabe an Suchoperationen.</p>
<h3 id="Create-a-model-ranker" class="common-anchor-header">Erstellen eines Modell-Rankers</h3><p>Um Modell-Ranking zu implementieren, definieren Sie zunächst ein Function-Objekt mit der entsprechenden Konfiguration:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType

<span class="hljs-comment"># Connect to your Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>  <span class="hljs-comment"># Replace with your Milvus server URI</span>
)

<span class="hljs-comment"># Create a model ranker function</span>
model_ranker = Function(
    name=<span class="hljs-string">&quot;semantic_ranker&quot;</span>,  <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># VARCHAR field to use for reranking</span>
    function_type=FunctionType.RERANK,  <span class="hljs-comment"># Must be set to RERANK</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,  <span class="hljs-comment"># Specify model reranker. Must be &quot;model&quot;</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;tei&quot;</span>,  <span class="hljs-comment"># Choose provider: &quot;tei&quot; or &quot;vllm&quot;</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;machine learning for time series&quot;</span>],  <span class="hljs-comment"># Query text</span>
        <span class="hljs-string">&quot;endpoint&quot;</span>: <span class="hljs-string">&quot;http://model-service:8080&quot;</span>,  <span class="hljs-comment"># Model service endpoint</span>
        <span class="hljs-comment"># &quot;maxBatch&quot;: 32  # Optional: batch size for processing</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Erforderlich?</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wert / Beispiel</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Kennung für Ihre Funktion, die bei der Ausführung von Suchen verwendet wird.</p></td>
     <td><p><code translate="no">"semantic_ranker"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Name des Textfeldes, das für die Neueinstufung verwendet werden soll. Muss ein Feld vom Typ <code translate="no">VARCHAR</code> sein.</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Gibt den Typ der zu erstellenden Funktion an. Muss für alle Modell-Ranker auf <code translate="no">RERANK</code> gesetzt werden.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Ein Wörterbuch, das die Konfiguration für die modellbasierte Ranglistenfunktion enthält. Die verfügbaren Parameter (Schlüssel) variieren je nach Anbieter (<code translate="no">tei</code> oder <code translate="no">vllm</code>). Weitere Einzelheiten finden Sie unter <a href="/docs/de/vllm-ranker.md">vLLM Ranker</a> oder <a href="/docs/de/tei-ranker.md">TEI Ranker</a>.</p></td>
     <td><p>{...}</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Muss auf <code translate="no">"model"</code> gesetzt werden, um das Modell-Reranking zu aktivieren.</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.provider</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Der Modelldienstanbieter, der für das Reranking verwendet werden soll.</p></td>
     <td><p><code translate="no">"tei"</code> oder <code translate="no">"vllm"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.queries</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Die Anzahl der Abfrage-Strings muss genau mit der Anzahl der Abfragen in Ihrem Suchvorgang übereinstimmen (auch bei Verwendung von Abfrage-Vektoren anstelle von Text), andernfalls wird ein Fehler gemeldet.</p></td>
     <td><p><code translate="no">["search query"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.endpoint</code></p></td>
     <td><p>Ja</p></td>
     <td><p>URL des Modelldienstes.</p></td>
     <td><p><code translate="no">"http://localhost:8080"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">maxBatch</code></p></td>
     <td><p>Nein</p></td>
     <td><p>Maximale Anzahl von Dokumenten, die in einem einzigen Stapel verarbeitet werden. Größere Werte erhöhen den Durchsatz, benötigen aber mehr Speicher.</p></td>
     <td><p><code translate="no">32</code> (Standard)</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">Auf Standard-Vektorsuche anwenden</h3><p>Nachdem Sie Ihren Modell-Ranker definiert haben, können Sie ihn bei Suchvorgängen anwenden, indem Sie ihn an den Ranker-Parameter übergeben:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Use the model ranker in standard vector search</span>
results = client.search(
    collection_name,
    data=[<span class="hljs-string">&quot;machine learning for time series&quot;</span>], <span class="hljs-comment"># Number of queries must match that specified in model_ranker.params[&quot;queries&quot;] </span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># Include the text field in outputs</span>
<span class="highlighted-wrapper-line">    ranker=model_ranker,  <span class="hljs-comment"># Apply the model ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">Auf hybride Suche anwenden</h3><p>Modell-Ranker können auch auf hybride Suchvorgänge angewendet werden, die mehrere Vektorfelder kombinieren:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Define search requests for different vector fields</span>
dense_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;machine learning for time series&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

sparse_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;machine learning for time series&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

<span class="hljs-comment"># Apply model ranker to hybrid search</span>
hybrid_results = client.hybrid_search(
    collection_name,
    [dense_request, sparse_request],
<span class="highlighted-wrapper-line">    ranker=model_ranker,  <span class="hljs-comment"># Same model ranker works with hybrid search</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
