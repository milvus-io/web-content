---
id: hnsw.md
title: HNSW
summary: >-
  Der HNSW-Index ist ein graphbasierter Indizierungsalgorithmus, der die
  Leistung bei der Suche nach hochdimensionalen fließenden Vektoren verbessern
  kann. Er bietet eine hervorragende Suchgenauigkeit und eine geringe
  Latenzzeit, erfordert aber einen hohen Speicheraufwand, um seine hierarchische
  Graphenstruktur zu erhalten.
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
    </button></h1><p>Der <strong>HNSW-Index</strong> ist ein <strong>graphbasierter</strong> Indizierungsalgorithmus, der die Leistung bei der Suche nach hochdimensionalen fließenden Vektoren verbessern kann. Er bietet eine <strong>hervorragende</strong> Suchgenauigkeit und eine <strong>geringe</strong> Latenzzeit, erfordert jedoch <strong>einen hohen</strong> Speicheraufwand, um seine hierarchische Graphenstruktur zu erhalten.</p>
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
    </button></h2><p>Der Algorithmus Hierarchical Navigable Small World (HNSW) baut einen mehrschichtigen Graphen auf, ähnlich wie eine Karte mit verschiedenen Zoomstufen. Die <strong>unterste Ebene</strong> enthält alle Datenpunkte, während die <strong>oberen Ebenen</strong> aus einer Teilmenge von Datenpunkten bestehen, die aus der unteren Ebene entnommen wurden.</p>
<p>In dieser Hierarchie enthält jede Ebene Knoten, die Datenpunkte darstellen und durch Kanten verbunden sind, die ihre Nähe anzeigen. Die höheren Schichten ermöglichen Sprünge über große Entfernungen, um schnell in die Nähe des Ziels zu gelangen, während die unteren Schichten eine feinkörnige Suche ermöglichen, um möglichst genaue Ergebnisse zu erzielen.</p>
<p>Und so funktioniert es:</p>
<ol>
<li><p><strong>Einstiegspunkt</strong>: Die Suche beginnt an einem festen Einstiegspunkt auf der obersten Ebene, der ein vorher festgelegter Knoten im Graphen ist.</p></li>
<li><p><strong>Gierige Suche</strong>: Der Algorithmus bewegt sich gierig zum nächstgelegenen Nachbarn auf der aktuellen Ebene, bis er nicht mehr näher an den Abfragevektor herankommt. Die oberen Ebenen dienen der Navigation und fungieren als grober Filter, um potenzielle Einstiegspunkte für die feinere Suche auf den unteren Ebenen zu finden.</p></li>
<li><p><strong>Ebene absteigen</strong>: Sobald in der aktuellen Ebene ein <strong>lokales Minimum</strong> erreicht ist, springt der Algorithmus über eine zuvor hergestellte Verbindung in die untere Ebene und wiederholt die gierige Suche.</p></li>
<li><p><strong>Letzte</strong> <strong>Verfeinerung</strong>: Dieser Prozess wird fortgesetzt, bis die unterste Ebene erreicht ist, wo in einem letzten Verfeinerungsschritt die nächsten Nachbarn ermittelt werden.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/hnsw.png" alt="HNSW" class="doc-image" id="hnsw" />
   </span> <span class="img-wrapper"> <span>HNSW</span> </span></p>
<p>Die Leistung von HNSW hängt von mehreren Schlüsselparametern ab, die sowohl die Struktur des Graphen als auch das Suchverhalten steuern. Dazu gehören:</p>
<ul>
<li><p><code translate="no">M</code>: Die maximale Anzahl von Kanten oder Verbindungen, die jeder Knoten im Graphen auf jeder Ebene der Hierarchie haben kann. Eine höhere <code translate="no">M</code> führt zu einem dichteren Graphen und erhöht die Auffindbarkeit und die Genauigkeit, da die Suche mehr Pfade zu erkunden hat, was aber auch mehr Speicherplatz verbraucht und die Einfügezeit aufgrund der zusätzlichen Verbindungen verlangsamt. Wie in der obigen Abbildung dargestellt, bedeutet <strong>M = 5</strong>, dass jeder Knoten im HNSW-Graphen direkt mit maximal 5 anderen Knoten verbunden ist. Dadurch entsteht eine mäßig dichte Graphenstruktur, bei der die Knoten über mehrere Pfade zu anderen Knoten gelangen.</p></li>
<li><p><code translate="no">efConstruction</code>: Die Anzahl der Kandidaten, die bei der Indexerstellung berücksichtigt werden. Eine höhere <code translate="no">efConstruction</code> führt im Allgemeinen zu einer besseren Qualität des Graphen, erfordert aber mehr Zeit für die Erstellung.</p></li>
<li><p><code translate="no">ef</code>: Die Anzahl der Nachbarn, die während einer Suche ausgewertet werden. Eine Erhöhung von <code translate="no">ef</code> verbessert die Wahrscheinlichkeit, die nächsten Nachbarn zu finden, verlangsamt aber den Suchprozess.</p></li>
</ul>
<p>Wie Sie diese Einstellungen an Ihre Bedürfnisse anpassen können, erfahren Sie unter <a href="/docs/de/hnsw.md#Index-params">Index-Parameter</a>.</p>
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
    </button></h2><p>Um einen <code translate="no">HNSW</code> -Index für ein Vektorfeld in Milvus zu erstellen, verwenden Sie die Methode <code translate="no">add_index()</code> und geben Sie die Parameter <code translate="no">index_type</code>, <code translate="no">metric_type</code> und zusätzliche Parameter für den Index an.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

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
<button class="copy-code-btn"></button></code></pre>
<p>In dieser Konfiguration:</p>
<ul>
<li><p><code translate="no">index_type</code>: Der Typ des zu erstellenden Index. In diesem Beispiel setzen Sie den Wert auf <code translate="no">HNSW</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Die Methode zur Berechnung des Abstands zwischen Vektoren. Unterstützte Werte sind <code translate="no">COSINE</code>, <code translate="no">L2</code> und <code translate="no">IP</code>. Einzelheiten finden Sie unter <a href="/docs/de/metric.md">Metrische Typen</a>.</p></li>
<li><p><code translate="no">params</code>: Zusätzliche Konfigurationsoptionen für den Aufbau des Index.</p>
<ul>
<li><p><code translate="no">M</code>: Maximale Anzahl von Nachbarn, mit denen sich jeder Knoten verbinden kann.</p></li>
<li><p><code translate="no">efConstruction</code>: Anzahl der Nachbarschaftskandidaten, die während des Indexaufbaus für eine Verbindung in Frage kommen.</p></li>
</ul>
<p>Weitere Informationen zu den für den Index <code translate="no">HNSW</code> verfügbaren Parametern finden Sie unter <a href="/docs/de/hnsw.md#Index-building-params">Indexaufbau-Parameter</a>.</p></li>
</ul>
<p>Sobald die Indexparameter konfiguriert sind, können Sie den Index erstellen, indem Sie die Methode <code translate="no">create_index()</code> direkt verwenden oder die Indexparameter in der Methode <code translate="no">create_collection</code> übergeben. Weitere Informationen finden Sie unter <a href="/docs/de/create-collection.md">Sammlung erstellen</a>.</p>
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
    </button></h2><p>Sobald der Index erstellt und die Entitäten eingefügt sind, können Sie Ähnlichkeitssuchen im Index durchführen.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of neighbors to consider during the search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
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
<p>Weitere Suchparameter, die für den Index <code translate="no">HNSW</code> verfügbar sind, finden Sie unter <a href="/docs/de/hnsw.md#Index-specific-search-params">Indexspezifische Suchparameter</a>.</p></li>
</ul>
<h2 id="Index-params" class="common-anchor-header">Index-Parameter<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Dieser Abschnitt gibt einen Überblick über die Parameter, die für den Aufbau eines Index und die Durchführung von Suchen im Index verwendet werden.</p>
<h3 id="Index-building-params" class="common-anchor-header">Indexaufbau-Parameter</h3><p>In der folgenden Tabelle sind die Parameter aufgeführt, die in <code translate="no">params</code> beim <a href="/docs/de/hnsw.md#Build-index">Aufbau eines Index</a> konfiguriert werden können.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wertebereich</p></th>
     <th><p>Tuning-Vorschlag</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">M</code></p></td>
     <td><p>Maximale Anzahl von Verbindungen （oder Kanten), die jeder Knoten im Graphen haben kann, einschließlich ausgehender und eingehender Kanten. Dieser Parameter wirkt sich direkt auf den Indexaufbau und die Suche aus.</p></td>
     <td><p><strong>Typ</strong>: Integer <strong>Bereich</strong>: [2, 2048]</p><p><strong>Standardwert</strong>: <code translate="no">30</code> (bis zu 30 ausgehende und 30 eingehende Kanten pro Knoten)</p></td>
     <td><p>Eine größere <code translate="no">M</code> führt im Allgemeinen zu einer <strong>höheren Genauigkeit</strong>, <strong>erhöht</strong> jedoch <strong>den Speicher-Overhead</strong> und <strong>verlangsamt sowohl den Indexaufbau als auch die Suche</strong>. Erwägen Sie eine Erhöhung von <code translate="no">M</code> für Datensätze mit hoher Dimensionalität oder wenn eine hohe Wiederauffindbarkeit entscheidend ist.</p><p>Ziehen Sie eine Verringerung von <code translate="no">M</code> in Betracht, wenn die Speichernutzung und die Suchgeschwindigkeit im Vordergrund stehen.</p><p>In den meisten Fällen wird empfohlen, einen Wert innerhalb dieses Bereichs festzulegen: [5, 100].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Anzahl der Nachbarschaftskandidaten, die bei der Indexerstellung für die Verbindung berücksichtigt werden. Für jedes neue Element wird ein größerer Pool von Kandidaten ausgewertet, aber die maximale Anzahl der tatsächlich hergestellten Verbindungen ist immer noch durch <code translate="no">M</code> begrenzt.</p></td>
     <td><p><strong>Typ</strong>: Integer <strong>Bereich</strong>: [1, <em>int_max</em>]</p><p><strong>Standardwert</strong>: <code translate="no">360</code></p></td>
     <td><p>Ein höherer <code translate="no">efConstruction</code> führt normalerweise zu einem <strong>genaueren Index</strong>, da mehr potenzielle Verbindungen untersucht werden. Dies führt jedoch auch zu einer <strong>längeren Indizierungszeit und einem erhöhten Speicherverbrauch</strong> während der Erstellung. Erwägen Sie, <code translate="no">efConstruction</code> zu erhöhen, um die Genauigkeit zu verbessern, insbesondere in Szenarien, in denen die Indizierungszeit weniger kritisch ist.</p><p>Ziehen Sie eine Verringerung von <code translate="no">efConstruction</code> in Betracht, um den Indexaufbau zu beschleunigen, wenn Ressourcenbeschränkungen ein Problem darstellen.</p><p>In den meisten Fällen wird empfohlen, einen Wert innerhalb dieses Bereichs festzulegen: [50, 500].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Indexspezifische Suchparameter</h3><p>In der folgenden Tabelle sind die Parameter aufgeführt, die in <code translate="no">search_params.params</code> für die <a href="/docs/de/hnsw.md#Search-on-index">Suche im Index</a> konfiguriert werden können.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wertebereich</p></th>
     <th><p>Tuning-Vorschlag</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Steuert die Breite der Suche während der Abfrage der nächsten Nachbarn. Er bestimmt, wie viele Knoten besucht und als potenzielle nächste Nachbarn bewertet werden.  Dieser Parameter wirkt sich nur auf den Suchprozess aus und gilt ausschließlich für die unterste Schicht des Graphen.</p></td>
     <td><p><strong>Typ</strong>: Integer <strong>Bereich</strong>: [1, <em>int_max</em>]</p><p><strong>Standardwert</strong>: <em>limit</em> (TopK nächste Nachbarn, die zurückgegeben werden)</p></td>
     <td><p>Eine größere <code translate="no">ef</code> führt im Allgemeinen zu einer <strong>höheren Suchgenauigkeit</strong>, da mehr potenzielle Nachbarn berücksichtigt werden. Dies <strong>erhöht</strong> jedoch auch <strong>die Suchzeit</strong>. Erwägen Sie, <code translate="no">ef</code> zu erhöhen, wenn eine hohe Wiederfindungsrate entscheidend ist und die Suchgeschwindigkeit weniger wichtig ist.</p><p>Ziehen Sie in Erwägung, <code translate="no">ef</code> zu verringern, um schnelleren Suchen den Vorzug zu geben, insbesondere in Szenarien, in denen eine leichte Verringerung der Genauigkeit akzeptabel ist.</p><p>In den meisten Fällen wird empfohlen, einen Wert innerhalb dieses Bereichs zu wählen: [K, 10K].</p></td>
   </tr>
</table>
