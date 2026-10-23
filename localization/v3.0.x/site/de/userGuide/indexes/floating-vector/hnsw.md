---
id: hnsw.md
title: HNSW
summary: >-
  Der HNSW-Index ist ein graphbasierter Indizierungsalgorithmus, der die
  Leistung bei der Suche nach hochdimensionalen Gleitkomma-Vektoren verbessern
  kann. Er bietet eine hervorragende Suchgenauigkeit und geringe Latenz,
  erfordert jedoch einen hohen Speicheraufwand, um seine hierarchische
  Graphstruktur aufrechtzuerhalten.
---
<h1 id="HNSW" class="common-anchor-header">HNSW<button data-href="#HNSW" class="anchor-icon" translate="no">
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
    </button></h1><p>Der <strong>HNSW-Index</strong> ist ein <strong>graphbasierter</strong> Indizierungsalgorithmus, der die Leistung bei der Suche nach hochdimensionalen Gleitkomma-Vektoren verbessern kann. Er bietet eine <strong>hervorragende</strong> Suchgenauigkeit und <strong>geringe</strong> Latenz, erfordert jedoch einen <strong>hohen</strong> Speicheraufwand zur Aufrechterhaltung seiner hierarchischen Graphstruktur.</p>
<h2 id="Overview" class="common-anchor-header">Überblick<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Der HNSW-Algorithmus (Hierarchical Navigable Small World) erstellt einen mehrschichtigen Graphen, ähnlich einer Karte mit verschiedenen Zoomstufen. Die <strong>unterste Schicht</strong> enthält alle Datenpunkte, während die <strong>oberen Schichten</strong> aus einer Teilmenge von Datenpunkten bestehen, die aus der unteren Schicht entnommen wurden.</p>
<p>In dieser Hierarchie enthält jede Ebene Knoten, die Datenpunkte darstellen und durch Kanten verbunden sind, die deren Nähe zueinander anzeigen. Die höheren Ebenen ermöglichen Sprünge über große Entfernungen, um schnell in die Nähe des Ziels zu gelangen, während die unteren Ebenen eine feinmaschige Suche für die genauesten Ergebnisse ermöglichen.</p>
<p>So funktioniert es:</p>
<ol>
<li><p><strong>Einstiegspunkt</strong>: Die Suche beginnt an einem festen Einstiegspunkt in der obersten Ebene, bei dem es sich um einen vorab festgelegten Knoten im Graphen handelt.</p></li>
<li><p><strong>Gierige Suche</strong>: Der Algorithmus bewegt sich gierig zum nächsten Nachbarn auf der aktuellen Ebene, bis er dem Abfragevektor nicht mehr näher kommen kann. Die oberen Ebenen dienen der Navigation und fungieren als Grobfilter, um potenzielle Einstiegspunkte für die feinere Suche auf den unteren Ebenen zu lokalisieren.</p></li>
<li><p><strong>Ebene-Wechsel</strong>: Sobald auf der aktuellen Ebene ein <strong>lokales Minimum</strong> erreicht ist, springt der Algorithmus über eine vorab festgelegte Verbindung auf die darunterliegende Ebene und wiederholt die „greedy“-Suche.</p></li>
<li><p><strong>Abschließende</strong> <strong>Verfeinerung</strong>: Dieser Vorgang wird fortgesetzt, bis die unterste Ebene erreicht ist, wo in einem abschließenden Verfeinerungsschritt die nächsten Nachbarn ermittelt werden.</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/hnsw.png" alt="HNSW" class="doc-image" id="hnsw" /> 
   <span>HNSW</span>
  
 </span></p>
<p>Die Leistung von HNSW hängt von mehreren Schlüsselparametern ab, die sowohl die Struktur des Graphen als auch das Suchverhalten steuern. Dazu gehören:</p>
<ul>
<li><p><code translate="no">M</code>: Die maximale Anzahl an Kanten oder Verbindungen, die jeder Knoten im Graphen auf jeder Hierarchieebene haben kann. Ein höherer Wert für „ <code translate="no">M</code> “ führt zu einem dichteren Graphen und erhöht den Recall sowie die Genauigkeit, da die Suche mehr Pfade zu erkunden hat; dies beansprucht jedoch auch mehr Speicher und verlangsamt die Einfügungszeit aufgrund zusätzlicher Verbindungen. Wie in der Abbildung oben dargestellt, bedeutet <strong>M = 5</strong>, dass jeder Knoten im HNSW-Graphen direkt mit maximal 5 anderen Knoten verbunden ist. Dadurch entsteht eine mäßig dichte Graphstruktur, in der Knoten über mehrere Pfade andere Knoten erreichen können.</p></li>
<li><p><code translate="no">efConstruction</code>: Die Anzahl der Kandidaten, die bei der Indexerstellung berücksichtigt werden. Ein höherer Wert für „ <code translate="no">efConstruction</code> “ führt im Allgemeinen zu einem qualitativ besseren Graphen, erfordert jedoch mehr Zeit für die Erstellung.</p></li>
<li><p><code translate="no">ef</code>: Die Anzahl der Nachbarn, die bei einer Suche ausgewertet werden. Eine Erhöhung von „ <code translate="no">ef</code> “ verbessert die Wahrscheinlichkeit, die nächsten Nachbarn zu finden, verlangsamt jedoch den Suchvorgang.</p></li>
</ul>
<p>Einzelheiten dazu, wie Sie diese Einstellungen an Ihre Anforderungen anpassen können, finden Sie unter <a href="/docs/de/hnsw.md#Index-params">„Indexparameter</a>“.</p>
<h2 id="Build-index" class="common-anchor-header">Index erstellen<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>In diesem Beispiel wird ein verbundener Client namens „ <code translate="no">client</code> “ und eine vorhandene Sammlung namens „ <code translate="no">your_collection_name</code> “ verwendet. Die Sammlung enthält ein fünfdimensionales Vektorfeld namens „ <code translate="no">your_vector_field_name</code> “.</p>
<p>Definieren Sie die Indexparameter mit „ <code translate="no">add_index()</code> “ und erstellen Sie anschließend den Index mit „ <code translate="no">create_index()</code> “.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">100</span> <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
    } <span class="hljs-comment"># Index building params</span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>In dieser Konfiguration:</p>
<ul>
<li><p><code translate="no">index_type</code>: Der Typ des zu erstellenden Index. Setzen Sie den Wert in diesem Beispiel auf „ <code translate="no">HNSW</code> “.</p></li>
<li><p><code translate="no">metric_type</code>: Die Methode zur Berechnung des Abstands zwischen Vektoren. Zu den unterstützten Werten gehören „ <code translate="no">COSINE</code> “, „ <code translate="no">L2</code> “ und „ <code translate="no">IP</code> “. Weitere Informationen finden Sie unter <a href="/docs/de/metric.md">„Metriktypen</a>“.</p></li>
<li><p><code translate="no">params</code>: Zusätzliche Konfigurationsoptionen für die Erstellung des Index.</p>
<ul>
<li><p><code translate="no">M</code>: Maximale Anzahl von Nachbarn, mit denen sich jeder Knoten verbinden kann.</p></li>
<li><p><code translate="no">efConstruction</code>: Anzahl der potenziellen Nachbarn, die beim Aufbau des Indexes für eine Verbindung in Betracht gezogen werden.</p></li>
</ul>
<p>Im Beispiel werden „ <code translate="no">M=64</code> “ und „ <code translate="no">efConstruction=100</code> “ als Optimierungsüberschreibungen festgelegt. Informationen zu Standardwerten und zulässigen Bereichen finden Sie unter <a href="/docs/de/hnsw.md#Index-building-params">„Parameter für den Indexaufbau</a>“.</p></li>
</ul>
<p>Um eine Sammlung und ihren Index gemeinsam zu erstellen, übergeben Sie die Indexparameter an „ <code translate="no">create_collection()</code> “. Weitere Informationen finden Sie unter <a href="/docs/de/create-collection.md">„Sammlung erstellen</a>“.</p>
<h2 id="Search-on-index" class="common-anchor-header">Suche im Index<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Laden Sie nach dem Erstellen des Index und dem Einfügen von Entitäten die Sammlung und suchen Sie in ihrem Vektorfeld. Für gewöhnliche kNN-Suchen setzen Sie „ <code translate="no">ef</code> “ auf mindestens „ <code translate="no">limit</code> “.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of neighbors to consider during the search</span>
    }
}

client.load_collection(collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>)

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>In dieser Konfiguration:</p>
<ul>
<li><p><code translate="no">params</code>: Zusätzliche Konfigurationsoptionen für die Suche im Index.</p>
<ul>
<li><code translate="no">ef</code>: Anzahl der Nachbarn, die bei einer Suche berücksichtigt werden sollen.</li>
</ul>
<p>Weitere Informationen zu den für den „ <code translate="no">HNSW</code> “-Index verfügbaren Suchparametern finden Sie unter <a href="/docs/de/hnsw.md#Index-specific-search-params">„Indexspezifische Suchparameter</a>“.</p></li>
</ul>
<h2 id="Index-params" class="common-anchor-header">Indexparameter<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>In den folgenden Tabellen sind die Parameter für die Indexerstellung und die Suche aufgeführt. Die Standardeinstellungen für Parameter, die Sie weglassen, können durch Servereinstellungen überschrieben werden.</p>
<h3 id="Index-building-params" class="common-anchor-header">Parameter für die Indexerstellung<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Die folgende Tabelle listet die Parameter auf, die in „ <code translate="no">params</code> “ beim <a href="/docs/de/hnsw.md#Build-index">Erstellen eines Indexes</a> konfiguriert werden können.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wertebereich</p></th>
     <th><p>Empfehlung zur Optimierung</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">M</code></p></td>
     <td><p>Maximale Anzahl von Verbindungen (oder Kanten), die jeder Knoten im Graphen haben kann, einschließlich ausgehender und eingehender Kanten. Dieser Parameter wirkt sich direkt sowohl auf die Indexerstellung als auch auf die Suche aus.</p></td>
     <td><p><strong>Typ</strong>: Ganzzahl <strong>Bereich</strong>: [2, 2048]</p><p><strong>Standardwert</strong>: <code translate="no">30</code> (bis zu 30 ausgehende und 30 eingehende Kanten pro Knoten)</p></td>
     <td><p>Ein größerer Wert für „ <code translate="no">M</code> “ führt im Allgemeinen zu <strong>einer höheren Genauigkeit</strong>, <strong>erhöht</strong> jedoch <strong>den Speicherbedarf</strong> und <strong>verlangsamt sowohl den Indexaufbau als auch die Suche</strong>. Erwägen Sie eine Erhöhung von „ <code translate="no">M</code> “ für Datensätze mit hoher Dimensionalität oder wenn eine hohe Wiederauffindbarkeit entscheidend ist.</p><p>Erwägen Sie eine Verringerung von ` <code translate="no">M</code> `, wenn Speicherverbrauch und Suchgeschwindigkeit im Vordergrund stehen.</p><p>In den meisten Fällen empfehlen wir, einen Wert innerhalb dieses Bereichs festzulegen: [5, 100].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Anzahl der potenziellen Nachbarn, die bei der Indexerstellung für eine Verbindung in Betracht gezogen werden. Für jedes neue Element wird ein größerer Pool an Kandidaten ausgewertet, doch die maximale Anzahl der tatsächlich hergestellten Verbindungen wird weiterhin durch ` <code translate="no">M</code>` begrenzt.</p></td>
     <td><p><strong>Typ</strong>: Ganzzahl <strong>Bereich</strong>: [1, <em>int_max</em>]</p><p><strong>Standardwert</strong>: <code translate="no">360</code></p></td>
     <td><p>Ein höherer Wert für „ <code translate="no">efConstruction</code> “ führt in der Regel zu einem <strong>genaueren Index</strong>, da mehr potenzielle Verbindungen untersucht werden. Dies führt jedoch auch zu <strong>einer längeren Indizierungszeit und einem erhöhten Speicherbedarf</strong> während der Erstellung. Erwägen Sie eine Erhöhung von „ <code translate="no">efConstruction</code> “, um die Genauigkeit zu verbessern, insbesondere in Szenarien, in denen die Indizierungszeit weniger kritisch ist.</p><p>Erwägen Sie eine Verringerung von „ <code translate="no">efConstruction</code> “, um die Indexerstellung zu beschleunigen, wenn Ressourcenbeschränkungen eine Rolle spielen.</p><p>In den meisten Fällen empfehlen wir, einen Wert innerhalb dieses Bereichs festzulegen: [50, 500].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Indexspezifische Suchparameter<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Die folgende Tabelle listet die Parameter auf, die unter „ <code translate="no">search_params.params</code> “ bei <a href="/docs/de/hnsw.md#Search-on-index">der Suche im Index</a> konfiguriert werden können.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wertebereich</p></th>
     <th><p>Optimierungsempfehlung</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Steuert die Reichweite der Suche bei der Ermittlung der nächsten Nachbarn. Er bestimmt, wie viele Knoten besucht und als potenzielle nächste Nachbarn bewertet werden. Dieser Parameter wirkt sich nur auf den Suchvorgang aus und gilt ausschließlich für die unterste Ebene des Graphen.</p></td>
     <td><p><strong>Typ</strong>: Ganzzahl <strong>Bereich</strong>: [1, <em>int_max</em>]</p><p><strong>Standardwert</strong>: <code translate="no">max(limit, 16)</code> für die gewöhnliche kNN-Suche; <code translate="no">512</code> für die Bereichssuche.</p><p>Bei der gewöhnlichen kNN-Suche muss ein expliziter Wert für ` <code translate="no">ef</code> ` größer oder gleich ` <code translate="no">limit</code> ` sein (die Anzahl der zurückzugebenden nächsten Nachbarn).</p></td>
     <td><p>Ein größerer Wert für „ <code translate="no">ef</code> “ führt im Allgemeinen zu <strong>einer höheren Suchgenauigkeit</strong>, da mehr potenzielle Nachbarn berücksichtigt werden. Dies <strong>verlängert</strong> jedoch auch <strong>die Suchzeit</strong>. Erwägen Sie eine Erhöhung von „ <code translate="no">ef</code> “, wenn eine hohe Wiederauffindungsrate entscheidend ist und die Suchgeschwindigkeit weniger wichtig ist.</p><p>Erwägen Sie eine Verringerung von „ <code translate="no">ef</code> “, um einer schnelleren Suche Vorrang zu geben, insbesondere in Szenarien, in denen eine leichte Verringerung der Genauigkeit akzeptabel ist.</p><p>In den meisten Fällen empfehlen wir, einen Wert innerhalb dieses Bereichs festzulegen: [K, 10K].</p></td>
   </tr>
</table>
