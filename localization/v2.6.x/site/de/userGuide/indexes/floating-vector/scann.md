---
id: scann.md
title: SCANN
summary: >-
  Der SCANN-Index in Milvus, der auf der ScaNN-Bibliothek von Google basiert,
  wurde entwickelt, um die Herausforderungen der skalierenden
  Vektorähnlichkeitssuche zu bewältigen und ein Gleichgewicht zwischen
  Geschwindigkeit und Genauigkeit herzustellen, selbst bei großen Datensätzen,
  die für die meisten Suchalgorithmen eine Herausforderung darstellen würden.
---
<h1 id="SCANN" class="common-anchor-header">SCANN<button data-href="#SCANN" class="anchor-icon" translate="no">
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
    </button></h1><p>Der auf der <a href="https://github.com/google-research/google-research/blob/master/scann%2FREADME.md">ScaNN-Bibliothek</a> von Google basierende Index <code translate="no">SCANN</code> in Milvus wurde entwickelt, um die Herausforderungen der skalierenden Vektorähnlichkeitssuche zu bewältigen und ein Gleichgewicht zwischen Geschwindigkeit und Genauigkeit herzustellen, selbst bei großen Datensätzen, die für die meisten Suchalgorithmen eine Herausforderung darstellen würden.</p>
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
    </button></h2><p>ScaNN wurde entwickelt, um eine der größten Herausforderungen bei der Vektorsuche zu lösen: das effiziente Auffinden der relevantesten Vektoren in hochdimensionalen Räumen, auch wenn die Datensätze größer und komplexer werden. Seine Architektur unterteilt den Prozess der Vektorsuche in verschiedene Phasen:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/scann.png" alt="Scann" class="doc-image" id="scann" />
   </span> <span class="img-wrapper"> <span>Scannen</span> </span></p>
<ol>
<li><p><strong>Partitionierung</strong>: Teilt den Datensatz in Cluster auf. Diese Methode engt den Suchraum ein, indem sie sich nur auf relevante Datenuntergruppen konzentriert, anstatt den gesamten Datensatz zu scannen, was Zeit und Verarbeitungsressourcen spart. ScaNN verwendet häufig Clustering-Algorithmen, wie z. B. <a href="https://zilliz.com/blog/k-means-clustering">k-means</a>, zur Identifizierung von Clustern, wodurch die Ähnlichkeitssuche effizienter durchgeführt werden kann.</p></li>
<li><p><strong>Quantisierung</strong>: ScaNN wendet nach der Partitionierung einen Quantisierungsprozess an, der als <a href="https://arxiv.org/abs/1908.10396">anisotrope Vektorquantisierung</a> bekannt ist. Die herkömmliche Quantisierung konzentriert sich auf die Minimierung des Gesamtabstands zwischen Original- und komprimierten Vektoren, was für Aufgaben wie die <a href="https://papers.nips.cc/paper/5329-asymmetric-lsh-alsh-for-sublinear-time-maximum-inner-product-search-mips.pdf">Maximum Inner Product Search (MIPS)</a>, bei der die Ähnlichkeit durch das innere Produkt der Vektoren und nicht durch den direkten Abstand bestimmt wird, nicht ideal ist. Bei der anisotropen Quantisierung werden stattdessen vorrangig die parallelen Komponenten zwischen den Vektoren beibehalten, d. h. die Teile, die für die Berechnung genauer innerer Produkte am wichtigsten sind. Dieser Ansatz ermöglicht es ScaNN, eine hohe MIPS-Genauigkeit beizubehalten, indem komprimierte Vektoren sorgfältig an der Abfrage ausgerichtet werden, was schnellere und präzisere Ähnlichkeitssuchen ermöglicht.</p></li>
<li><p><strong>Neueinstufung</strong>: Die Re-Ranking-Phase ist der letzte Schritt, in dem ScaNN die Suchergebnisse aus den Partitionierungs- und Quantisierungsphasen fein abstimmt. Diese Neueinstufung wendet präzise innere Produktberechnungen auf die Top-Kandidatenvektoren an, um sicherzustellen, dass die Endergebnisse äußerst genau sind. Die Neueinstufung ist von entscheidender Bedeutung für schnelle Empfehlungsmaschinen oder Bildsuchanwendungen, bei denen die anfängliche Filterung und das Clustering als grobe Schicht dienen und die letzte Stufe sicherstellt, dass dem Benutzer nur die relevantesten Ergebnisse angezeigt werden.</p></li>
</ol>
<p>Die Leistung von <code translate="no">SCANN</code> wird durch zwei Schlüsselparameter gesteuert, mit denen Sie das Gleichgewicht zwischen Geschwindigkeit und Genauigkeit feinabstimmen können:</p>
<ul>
<li><p><code translate="no">with_raw_data</code>: Legt fest, ob die ursprünglichen Vektordaten neben den quantisierten Darstellungen gespeichert werden. Die Aktivierung dieses Parameters verbessert die Genauigkeit beim Re-Ranking, erhöht aber die Speicheranforderungen.</p></li>
<li><p><code translate="no">reorder_k</code>: Legt fest, wie viele Kandidaten in der abschließenden Phase der Neueinstufung verfeinert werden. Höhere Werte verbessern die Genauigkeit, erhöhen aber die Suchlatenz.</p></li>
</ul>
<p>Eine ausführliche Anleitung zur Optimierung dieser Parameter für Ihren speziellen Anwendungsfall finden Sie unter <a href="/docs/de/scann.md#Index-params">Indexparameter</a>.</p>
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
    </button></h2><p>Um einen <code translate="no">SCANN</code> -Index für ein Vektorfeld in Milvus zu erstellen, verwenden Sie die Methode <code translate="no">add_index()</code> und geben Sie die Parameter <code translate="no">index_type</code>, <code translate="no">metric_type</code> und zusätzliche Parameter für den Index an.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;SCANN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span></span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;with_raw_data&quot;</span>: <span class="hljs-literal">True</span>, <span class="hljs-comment"># Whether to hold raw data</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In dieser Konfiguration:</p>
<ul>
<li><p><code translate="no">index_type</code>: Der Typ des zu erstellenden Index. In diesem Beispiel setzen Sie den Wert auf <code translate="no">SCANN</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Die Methode zur Berechnung des Abstands zwischen Vektoren. Unterstützte Werte sind <code translate="no">COSINE</code>, <code translate="no">L2</code> und <code translate="no">IP</code>. Einzelheiten finden Sie unter <a href="/docs/de/metric.md">Metrische Typen</a>.</p></li>
<li><p><code translate="no">params</code>: Zusätzliche Konfigurationsoptionen für den Aufbau des Index.</p>
<ul>
<li><code translate="no">with_raw_data</code>: Ob die ursprünglichen Vektordaten neben der quantisierten Darstellung gespeichert werden sollen.</li>
</ul>
<p>Weitere Informationen zu den für den <code translate="no">SCANN</code> Index verfügbaren Parametern finden Sie unter <a href="/docs/de/scann.md#Index-building-params">Indexerstellungsparameter</a>.</p></li>
</ul>
<p>Sobald die Index-Parameter konfiguriert sind, können Sie den Index erstellen, indem Sie die Methode <code translate="no">create_index()</code> direkt verwenden oder die Index-Parameter in der Methode <code translate="no">create_collection</code> übergeben. Weitere Informationen finden Sie unter <a href="/docs/de/create-collection.md">Sammlung erstellen</a>.</p>
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
        <span class="hljs-string">&quot;reorder_k&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of candidates to refine</span>
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">8</span> <span class="hljs-comment"># Number of clusters to search</span>
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
<li><code translate="no">reorder_k</code>: Anzahl der zu verfeinernden Kandidaten während der Re-Ranking-Phase.</li>
<li><code translate="no">nprobe</code>: Anzahl der Cluster, nach denen gesucht werden soll.</li>
</ul>
<p>Weitere Suchparameter, die für den Index <code translate="no">SCANN</code> verfügbar sind, finden Sie unter <a href="/docs/de/scann.md#Index-specific-search-params">Indexspezifische Suchparameter</a>.</p></li>
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
    </button></h2><p>Dieser Abschnitt gibt einen Überblick über die Parameter, die für den Aufbau eines Index und die Durchführung von Suchvorgängen im Index verwendet werden.</p>
<h3 id="Index-building-params" class="common-anchor-header">Indexaufbau-Parameter<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>In der folgenden Tabelle sind die Parameter aufgeführt, die in <code translate="no">params</code> beim <a href="/docs/de/scann.md#Build-index">Aufbau eines Index</a> konfiguriert werden können.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wertebereich</p></th>
     <th><p>Tuning-Vorschlag</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>Anzahl der Cluster-Einheiten</p></td>
     <td><p>[1, 65536]</p></td>
     <td><p>Eine höhere <em>nlist</em> erhöht die Effizienz des Pruning und beschleunigt in der Regel die grobe Suche, aber die Partitionen können zu klein werden, was die Wiederauffindbarkeit verringern kann; eine niedrigere <em>nlist</em> scannt größere Cluster, was die Wiederauffindbarkeit verbessert, aber die Suche verlangsamt.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">with_raw_data</code></p></td>
     <td><p>Ob die ursprünglichen Vektordaten neben der quantisierten Darstellung gespeichert werden sollen. Wenn diese Option aktiviert ist, ermöglicht sie genauere Ähnlichkeitsberechnungen während der Re-Ranking-Phase, da die ursprünglichen Vektoren anstelle der quantisierten Approximationen verwendet werden.</p></td>
     <td><p><strong>Typ</strong>: Boolean</p><p><strong>Bereich</strong>: <code translate="no">true</code>, <code translate="no">false</code></p><p><strong>Standardwert</strong>: <code translate="no">true</code></p></td>
     <td><p>Setzen Sie diesen Wert auf <code translate="no">true</code>, um <strong>eine höhere Suchgenauigkeit</strong> zu erzielen und wenn der Speicherplatz keine große Rolle spielt. Die ursprünglichen Vektordaten ermöglichen präzisere Ähnlichkeitsberechnungen bei der Neueinstufung.</p><p>Setzen Sie den Wert auf <code translate="no">false</code>, um <strong>den Speicheraufwand</strong> und die Speichernutzung <strong>zu reduzieren</strong>, insbesondere bei großen Datensätzen. Dies kann jedoch zu einer etwas geringeren Suchgenauigkeit führen, da in der Phase der Neueinordnung quantisierte Vektoren verwendet werden.</p><p><strong>Empfohlen</strong>: Verwenden Sie <code translate="no">true</code> für Produktionsanwendungen, bei denen die Genauigkeit entscheidend ist.</p></td>
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
    </button></h3><p>In der folgenden Tabelle sind die Parameter aufgeführt, die in <code translate="no">search_params.params</code> für die <a href="/docs/de/scann.md#Search-on-index">Suche im Index</a> konfiguriert werden können.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wertebereich</p></th>
     <th><p>Tuning-Vorschlag</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">reorder_k</code></p></td>
     <td><p>Steuert die Anzahl der Kandidatenvektoren, die während der Re-Ranking-Phase verfeinert werden. Dieser Parameter legt fest, wie viele Top-Kandidaten aus der anfänglichen Partitionierungs- und Quantisierungsphase durch genauere Ähnlichkeitsberechnungen neu bewertet werden.</p></td>
     <td><p><strong>Typ</strong>: Integer</p><p><strong>Bereich</strong>: [1, <em>int_max</em>]</p><p><strong>Standardwert</strong>: Keine</p></td>
     <td><p>Eine größere <code translate="no">reorder_k</code> führt im Allgemeinen zu einer <strong>höheren Suchgenauigkeit</strong>, da in der letzten Verfeinerungsphase mehr Kandidaten berücksichtigt werden. Allerdings <strong>erhöht sich</strong> dadurch auch <strong>die Suchzeit</strong> aufgrund der zusätzlichen Berechnungen.</p><p>Erwägen Sie eine Erhöhung von <code translate="no">reorder_k</code>, wenn eine hohe Wiederfindungsrate entscheidend ist und die Suchgeschwindigkeit weniger wichtig ist. Ein guter Ausgangspunkt ist das 2-5fache der gewünschten <code translate="no">limit</code> (TopK-Ergebnisse, die zurückgegeben werden).</p><p>Ziehen Sie in Erwägung, <code translate="no">reorder_k</code> zu verringern, um schnelleren Suchen den Vorzug zu geben, insbesondere in Szenarien, in denen eine leichte Verringerung der Genauigkeit akzeptabel ist.</p><p>In den meisten Fällen empfehlen wir Ihnen, einen Wert innerhalb dieses Bereichs festzulegen:<em>[limit</em>, <em>limit</em> * 5].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>Die Anzahl der Cluster, in denen nach Kandidaten gesucht werden soll.</p></td>
     <td><p><strong>Typ</strong>: Integer</p><p><strong>Bereich</strong>: [1, <em>nlist</em>]</p><p><strong>Standardwert</strong>: <code translate="no">8</code></p></td>
     <td><p>Höhere Werte ermöglichen die Suche nach mehr Clustern, was die Wiederauffindbarkeit durch Erweiterung des Suchbereichs verbessert, jedoch auf Kosten einer erhöhten Abfrage-Latenz.</p><p>Stellen Sie <code translate="no">nprobe</code> proportional zu <code translate="no">nlist</code> ein, um Geschwindigkeit und Genauigkeit auszugleichen.</p><p>In den meisten Fällen wird empfohlen, einen Wert innerhalb dieses Bereichs einzustellen: [1, nlist].</p></td>
   </tr>
</table>
