---
id: model-ranker-overview.md
title: Übersicht über den Model RankerCompatible with Milvus 2.6.x
summary: >-
  Bei der herkömmlichen Vektorsuche werden die Ergebnisse ausschließlich nach
  ihrer mathematischen Ähnlichkeit sortiert – also danach, wie gut die Vektoren
  im hochdimensionalen Raum übereinstimmen. Dieser Ansatz ist zwar effizient,
  lässt jedoch häufig die tatsächliche semantische Relevanz außer Acht. Nehmen
  wir als Beispiel die Suche nach „Best Practices für die Datenbankoptimierung“:
  Möglicherweise erhalten Sie Dokumente mit hoher Vektorähnlichkeit, in denen
  diese Begriffe zwar häufig vorkommen, die jedoch keine tatsächlich umsetzbaren
  Optimierungsstrategien bieten.
beta: Milvus 2.6.x
---
<h1 id="Model-Ranker-Overview" class="common-anchor-header">Übersicht über den Model Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Model-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Bei der herkömmlichen Vektorsuche werden Ergebnisse ausschließlich nach mathematischer Ähnlichkeit sortiert – also danach, wie gut Vektoren im hochdimensionalen Raum übereinstimmen. Dieser Ansatz ist zwar effizient, lässt jedoch oft die tatsächliche semantische Relevanz außer Acht. Stellen Sie sich vor, Sie suchen nach <strong>„Best Practices für die Datenbankoptimierung“:</strong> Möglicherweise erhalten Sie Dokumente mit hoher Vektorähnlichkeit, in denen diese Begriffe zwar häufig vorkommen, die jedoch keine tatsächlich umsetzbaren Optimierungsstrategien bieten.</p>
<p>Model Ranker revolutioniert die Milvus-Suche durch die Integration fortschrittlicher Sprachmodelle, die semantische Beziehungen zwischen Suchanfragen und Dokumenten verstehen. Anstatt sich ausschließlich auf die Vektorähnlichkeit zu stützen, wertet das System die Bedeutung und den Kontext der Inhalte aus, um intelligentere und relevantere Ergebnisse zu liefern.</p>
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
<li><p>Model Ranker können nicht bei Gruppierungssuchen verwendet werden.</p></li>
<li><p>Felder, die für das Modell-Ranking verwendet werden, müssen vom Typ „Text“ sein (<code translate="no">VARCHAR</code>).</p></li>
<li><p>Jeder Model Ranker kann jeweils nur ein Feld vom Typ „ <code translate="no">VARCHAR</code> “ zur Auswertung verwenden.</p></li>
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
    </button></h2><p>Modell-Ranker integrieren Funktionen zum Verständnis von Sprachmodellen über einen klar definierten Workflow in den Milvus-Suchprozess:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/model-ranker-overview.png" alt="Model Ranker Overview" class="doc-image" id="model-ranker-overview" /> 
   <span>Übersicht über Modell-Ranker</span>
  
 </span></p>
<ol>
<li><p><strong>Anfängliche Abfrage</strong>: Ihre Anwendung sendet eine Abfrage an Milvus</p></li>
<li><p><strong>Vektorsuche</strong>: Milvus führt eine Standard-Vektorsuche durch, um Dokumentenkandidaten zu identifizieren</p></li>
<li><p><strong>Abruf der Kandidaten</strong>: Das System ermittelt anhand der Vektorähnlichkeit eine erste Auswahl an Dokumentenkandidaten</p></li>
<li><p><strong>Modellauswertung</strong>: Die Model-Ranker-Funktion verarbeitet Abfrage-Dokument-Paare:</p>
<ul>
<li><p>Es sendet die ursprüngliche Abfrage und die in Frage kommenden Dokumente an einen externen Modelldienst</p></li>
<li><p>Das Sprachmodell bewertet die semantische Relevanz zwischen der Abfrage und jedem Dokument</p></li>
<li><p>Jedes Dokument erhält auf der Grundlage des semantischen Verständnisses einen Relevanzwert</p></li>
</ul></li>
<li><p><strong>Intelligente Neuanordnung</strong>: Die Dokumente werden auf der Grundlage der vom Modell generierten Relevanzwerte neu geordnet</p></li>
<li><p><strong>Verbesserte Ergebnisse</strong>: Ihre Anwendung erhält Ergebnisse, die nach semantischer Relevanz und nicht nur nach Vektorähnlichkeit geordnet sind</p></li>
</ol>
<h2 id="Choose-a-model-provider-for-your-needs" class="common-anchor-header">Wählen Sie einen Modellanbieter, der Ihren Anforderungen entspricht<button data-href="#Choose-a-model-provider-for-your-needs" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus unterstützt die folgenden Modelldienstleister für das Reranking, die jeweils unterschiedliche Eigenschaften aufweisen:</p>
<table>
   <tr>
     <th><p>Anbieter</p></th>
     <th><p>Am besten geeignet für</p></th>
     <th><p>Eigenschaften</p></th>
     <th><p>Anwendungsbeispiel</p></th>
   </tr>
   <tr>
     <td><p>vLLM</p></td>
     <td><p>Komplexe Anwendungen, die ein tiefes semantisches Verständnis und eine individuelle Anpassung erfordern</p></td>
     <td><ul><li><p>Unterstützt verschiedene große Sprachmodelle</p></li><li><p>Flexible Bereitstellungsoptionen</p></li><li><p>Höhere Rechenanforderungen</p></li><li><p>Größeres Potenzial zur Anpassung</p></li></ul></td>
     <td><p>Rechtsrechercheplattform, die fachspezifische Modelle einsetzt, die juristische Terminologie und Zusammenhänge in der Rechtsprechung verstehen</p></td>
   </tr>
   <tr>
     <td><p>TEI</p></td>
     <td><p>Schnelle Implementierung bei effizienter Ressourcennutzung</p></td>
     <td><ul><li><p>Leichter, für Textoperationen optimierter Dienst</p></li><li><p>Einfachere Bereitstellung mit geringerem Ressourcenbedarf</p></li><li><p>Voroptimierte Reranking-Modelle</p></li><li><p>Minimaler Infrastrukturaufwand</p></li></ul></td>
     <td><p>Content-Management-System, das effiziente Reranking-Funktionen mit Standardanforderungen benötigt</p></td>
   </tr>
   <tr>
     <td><p>Cohere</p></td>
     <td><p>Unternehmensanwendungen, bei denen Zuverlässigkeit und einfache Integration im Vordergrund stehen</p></td>
     <td><ul><li><p>Zuverlässigkeit und Skalierbarkeit auf Unternehmensniveau</p></li><li><p>Managed Service ohne Wartungsaufwand für die Infrastruktur</p></li><li><p>Mehrsprachige Funktionen zur Neugewichtung</p></li><li><p>Integrierte Ratenbegrenzung und Fehlerbehandlung</p></li></ul></td>
     <td><p>E-Commerce-Plattform, die eine hochverfügbare Suche mit konsistenter API-Leistung und mehrsprachigen Produktkatalogen erfordert</p></td>
   </tr>
   <tr>
     <td><p>Voyage AI</p></td>
     <td><p>RAG-Anwendungen mit spezifischen Anforderungen an Leistung und Kontext</p></td>
     <td><ul><li><p>Modelle, die speziell für Reranking-Aufgaben trainiert wurden</p></li><li><p>Detaillierte Trunkierungssteuerung für unterschiedliche Dokumentlängen</p></li><li><p>Optimierte Inferenz für Produktions-Workloads</p></li><li><p>Mehrere Modellvarianten (rerank-2, rerank-lite usw.)</p></li></ul></td>
     <td><p>Forschungsdatenbank mit unterschiedlichen Dokumentlängen, die eine fein abgestimmte Leistungssteuerung und ein spezialisiertes semantisches Verständnis erfordern</p></td>
   </tr>
   <tr>
     <td><p>SiliconFlow</p></td>
     <td><p>Anwendungen zur Verarbeitung langer Dokumente mit Schwerpunkt auf Kosteneffizienz</p></td>
     <td><ul><li><p>Erweiterte Dokumentaufteilung in Blöcke mit konfigurierbarer Überlappung</p></li><li><p>Chunk-basierte Bewertung (der Chunk mit der höchsten Punktzahl repräsentiert das Dokument)</p></li><li><p>Unterstützung für verschiedene Reranking-Modelle</p></li><li><p>Kosteneffizient dank Standard- und Pro-Modellvarianten</p></li></ul></td>
     <td><p>Suchsystem für technische Dokumentation zur Verarbeitung umfangreicher Handbücher und Fachartikel, die eine intelligente Segmentierung und Überlappungssteuerung erfordern</p></td>
   </tr>
   <tr>
     <td><p>Hugging Face</p></td>
     <td><p>Anwendungen, die gehostete Hugging-Face-Modelle zur Satzähnlichkeit nutzen</p></td>
     <td><ul><li><p>Nutzt den gehosteten „ <code translate="no">hf-inference</code> “-Anbieter</p></li><li><p>Wählt Modelle aus dem Hugging Face Hub aus</p></li><li><p>Berechnet einen Satzähnlichkeitswert pro Kandidat</p></li><li><p>Verwendet die Authentifizierung per API-Schlüssel</p></li></ul></td>
     <td><p>Anwendungen für die semantische Suche, die Textkandidaten mit einem Hugging-Face-Modell neu bewerten möchten, ohne einen separaten Inferenzdienst zu betreiben</p></td>
   </tr>
</table>
<p>Ausführliche Informationen zur Implementierung der einzelnen Modelldienste finden Sie in der entsprechenden Dokumentation:</p>
<ul>
<li><p><a href="/docs/de/v2.6.x/vllm-ranker.md">vLLM Ranker</a></p></li>
<li><p><a href="/docs/de/v2.6.x/tei-ranker.md">TEI Ranker</a></p></li>
<li><p><a href="/docs/de/v2.6.x/cohere-ranker.md">Cohere Ranker</a></p></li>
<li><p><a href="/docs/de/v2.6.x/voyage-ai-ranker.md">Voyage AI Ranker</a></p></li>
<li><p><a href="/docs/de/v2.6.x/siliconflow-ranker.md">SiliconFlow Ranker</a></p></li>
<li><p><a href="/docs/de/v2.6.x/hugging-face-ranker.md">Hugging Face-Ranker</a></p></li>
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
    </button></h2><p>Bevor Sie den Model Ranker implementieren, stellen Sie sicher, dass Sie Folgendes haben:</p>
<ul>
<li><p>Eine Milvus-Sammlung mit einem Feld „ <code translate="no">VARCHAR</code> “, das den neu zu bewertenden Text enthält</p></li>
<li><p>Ein laufender externer Modelldienst, auf den Ihre Milvus-Instanz zugreifen kann</p></li>
<li><p>Eine geeignete Netzwerkverbindung zwischen Milvus und dem von Ihnen gewählten Modelldienst</p></li>
</ul>
<p>Model Ranker lassen sich nahtlos sowohl in Standard-Vektorsuchen als auch in hybride Suchvorgänge integrieren. Die Implementierung umfasst die Erstellung eines Function-Objekts, das Ihre Neukonfigurations-Einstellungen definiert, sowie dessen Übergabe an Suchvorgänge.</p>
<h3 id="Create-a-model-ranker" class="common-anchor-header">Erstellen eines Model Rankers<button data-href="#Create-a-model-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Um das Modell-Ranking zu implementieren, definieren Sie zunächst ein „Function“-Objekt mit der entsprechenden Konfiguration. In diesem Beispiel verwenden wir TEI als Dienstanbieter:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
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
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;tei&quot;</span>,  <span class="hljs-comment"># Choose provider: &quot;tei&quot;, &quot;vllm&quot;, etc.</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;machine learning for time series&quot;</span>],  <span class="hljs-comment"># Query text</span>
        <span class="hljs-string">&quot;endpoint&quot;</span>: <span class="hljs-string">&quot;http://model-service:8080&quot;</span>,  <span class="hljs-comment"># Model service endpoint</span>
        <span class="hljs-comment"># &quot;maxBatch&quot;: 32  # Optional: batch size for processing</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.ModelRanker;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-type">ModelRanker</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> ModelRanker.builder()
        .name(<span class="hljs-string">&quot;semantic_ranker&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;document&quot;</span>))
        .provider(<span class="hljs-string">&quot;tei&quot;</span>)
        .queries(Collections.singletonList(<span class="hljs-string">&quot;machine learning for time series&quot;</span>))
        .endpoint(<span class="hljs-string">&quot;http://model-service:8080&quot;</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
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
     <td><p>Bezeichner für Ihre Funktion, der bei der Durchführung von Suchvorgängen verwendet wird.</p></td>
     <td><p><code translate="no">"semantic_ranker"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Name des Textfelds, das für die Neugewichtung verwendet werden soll.</p><p>Muss ein Feld vom Typ „ <code translate="no">VARCHAR</code> “ sein.</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Gibt den Typ der zu erstellenden Funktion an.</p><p>Muss für alle Modell-Ranker auf „ <code translate="no">RERANK</code> “ gesetzt sein.</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Ein Dictionary, das die Konfiguration für die modellbasierte Reranking-Funktion enthält. Die verfügbaren Parameter (Schlüssel) variieren je nach Dienstanbieter.</p></td>
     <td><p><code translate="no">{...}</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Muss auf „ <code translate="no">"model"</code> “ gesetzt werden, um das modellbasierte Reranking zu aktivieren.</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.provider</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Der Modell-Dienstanbieter, der für die Neureihung verwendet werden soll.</p></td>
     <td><p><code translate="no">"tei"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.queries</code></p></td>
     <td><p>Ja</p></td>
     <td><p>Liste der Suchbegriffe, die vom Neurangordnungsmodell zur Berechnung der Relevanzwerte verwendet werden.</p><p>Die Anzahl der Suchbegriffe muss genau mit der Anzahl der Suchanfragen in Ihrem Suchvorgang übereinstimmen (auch bei Verwendung von Suchvektoren anstelle von Text), andernfalls wird ein Fehler gemeldet.</p></td>
     <td><p><code translate="no">["search query"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.endpoint</code></p></td>
     <td><p>Ja</p></td>
     <td><p>URL des Modelldienstes.</p></td>
     <td><p><code translate="no">"http://localhost:8080"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>Nein</p></td>
     <td><p>Maximale Anzahl der Dokumente, die in einem einzelnen Stapel verarbeitet werden sollen. Höhere Werte erhöhen den Durchsatz, erfordern jedoch mehr Arbeitsspeicher.</p></td>
     <td><p><code translate="no">32</code> (Standard)</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">Auf die Standard-Vektorsuche anwenden<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Nachdem Sie Ihren Modell-Ranker definiert haben, können Sie ihn bei Suchvorgängen anwenden, indem Sie ihn an den Parameter „ranker“ übergeben:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the model ranker in standard vector search</span>
results = client.search(
    collection_name,
    data=[your_query_vector], <span class="hljs-comment"># Number of query vectors must match that specified in model_ranker.params[&quot;queries&quot;] </span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># Include the text field in outputs</span>
<span class="highlighted-wrapper-line">    ranker=model_ranker,  <span class="hljs-comment"># Apply the model ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;machine learning for time series&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;vector_field&quot;</span>)
        .limit(<span class="hljs-number">10</span>)
        .outputFields(Collections.singletonList(document))
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
