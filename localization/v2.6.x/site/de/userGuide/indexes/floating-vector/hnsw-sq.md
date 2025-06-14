---
id: hnsw-sq.md
title: HNSW_SQ
summary: >-
  HNSW_SQ kombiniert Hierarchical Navigable Small World (HNSW)-Graphen mit
  Scalar Quantization (SQ) und schafft so eine fortschrittliche
  Vektorindizierungsmethode, die einen kontrollierbaren Kompromiss zwischen
  Größe und Genauigkeit bietet. Im Vergleich zu Standard-HNSW behält dieser
  Indextyp eine hohe Abfrageverarbeitungsgeschwindigkeit bei, während die
  Indexerstellungszeit leicht ansteigt.
---
<h1 id="HNSWSQ" class="common-anchor-header">HNSW_SQ<button data-href="#HNSWSQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>HNSW_SQ</strong> kombiniert Hierarchical Navigable Small World (HNSW)-Graphen mit Scalar Quantization (SQ) und schafft damit eine fortschrittliche Vektorindizierungsmethode, die einen kontrollierbaren Kompromiss zwischen Größe und Genauigkeit bietet. Im Vergleich zu <a href="/docs/de/hnsw.md">Standard-HNSW</a> behält dieser Indextyp eine hohe Abfrageverarbeitungsgeschwindigkeit bei, während die Indexerstellungszeit leicht ansteigt.</p>
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
    </button></h2><p>HNSW_SQ kombiniert zwei Indizierungstechniken: <strong>HNSW</strong> für schnelle graphbasierte Navigation und <strong>SQ</strong> für effiziente Vektorkompression.</p>
<h3 id="HNSW" class="common-anchor-header">HNSW</h3><p>HNSW konstruiert einen mehrschichtigen Graphen, bei dem jeder Knoten einem Vektor im Datensatz entspricht. In diesem Graphen sind die Knoten auf der Grundlage ihrer Ähnlichkeit miteinander verbunden, was eine schnelle Durchquerung des Datenraums ermöglicht. Die hierarchische Struktur ermöglicht es dem Suchalgorithmus, die in Frage kommenden Nachbarn einzugrenzen, wodurch der Suchprozess in hochdimensionalen Räumen erheblich beschleunigt wird.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/hnsw.md">HNSW</a>.</p>
<h3 id="SQ" class="common-anchor-header">SQ</h3><p>SQ ist eine Methode zur Komprimierung von Vektoren, indem sie mit weniger Bits dargestellt werden. Zum Beispiel:</p>
<ul>
<li><p><strong>SQ8</strong> verwendet 8 Bits, die Werte in 256 Stufen abbilden.  Weitere Informationen finden Sie unter <a href="/docs/de/ivf-sq8.md#SQ8">IVF_SQ8</a>.</p></li>
<li><p><strong>SQ6</strong> verwendet 6 Bits zur Darstellung jedes Gleitkommawertes, was zu 64 diskreten Stufen führt.</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/hnsw-sq.png" alt="Hnsw Sq" class="doc-image" id="hnsw-sq" />
   </span> <span class="img-wrapper"> <span>Hnsw Sq</span> </span></p>
<p>Durch diese Präzisionsreduzierung wird der Speicherplatzbedarf drastisch verringert und die Berechnung beschleunigt, wobei die wesentliche Struktur der Daten erhalten bleibt.</p>
<h3 id="HNSW-+-SQ" class="common-anchor-header">HNSW + SQ</h3><p>HNSW_SQ kombiniert die Stärken von HNSW und SQ, um eine effiziente approximative Suche nach dem nächsten Nachbarn zu ermöglichen. So funktioniert der Prozess:</p>
<ol>
<li><p><strong>Datenkomprimierung:</strong> SQ komprimiert die Vektoren unter Verwendung von <code translate="no">sq_type</code> (z. B. SQ6 oder SQ8), was den Speicherbedarf reduziert. Diese Komprimierung kann zu einer geringeren Genauigkeit führen, ermöglicht es dem System jedoch, größere Datensätze zu verarbeiten.</p></li>
<li><p><strong>Konstruktion von Graphen:</strong> Die komprimierten Vektoren werden verwendet, um einen HNSW-Graphen zu erstellen. Da die Daten komprimiert sind, ist der resultierende Graph kleiner und schneller zu durchsuchen.</p></li>
<li><p><strong>Abfrage von Kandidaten:</strong> Wenn ein Abfragevektor bereitgestellt wird, verwendet der Algorithmus die komprimierten Daten, um schnell einen Pool von Nachbarschaftskandidaten aus dem HNSW-Graphen zu ermitteln.</p></li>
<li><p><strong>(Optional) Verfeinerung der Ergebnisse:</strong> Die anfänglichen Kandidatenergebnisse können zur Verbesserung der Genauigkeit anhand der folgenden Parameter verfeinert werden:</p>
<ul>
<li><p><code translate="no">refine</code>: Steuert, ob dieser Verfeinerungsschritt aktiviert ist. Wenn er auf <code translate="no">true</code> gesetzt ist, berechnet das System die Abstände unter Verwendung höherer Genauigkeit oder unkomprimierter Darstellungen neu.</p></li>
<li><p><code translate="no">refine_type</code>: Gibt den Präzisionsgrad der Daten an, die während der Verfeinerung verwendet werden (z. B. SQ6, SQ8, BF16). Eine höhere Genauigkeit wie <code translate="no">FP32</code> kann genauere Ergebnisse liefern, erfordert aber mehr Speicherplatz. Diese muss die Genauigkeit des ursprünglichen komprimierten Datensatzes um <code translate="no">sq_type</code> übersteigen.</p></li>
<li><p><code translate="no">refine_k</code>: Wirkt wie ein Vergrößerungsfaktor. Wenn z. B. Ihr Top <em>k</em> 100 und <code translate="no">refine_k</code> 2 ist, ordnet das System die 200 besten Kandidaten neu und gibt die besten 100 zurück, was die Gesamtgenauigkeit erhöht.</p></li>
</ul></li>
</ol>
<p>Eine vollständige Liste der Parameter und der gültigen Werte finden Sie unter <a href="/docs/de/hnsw-sq.md#Index-params">Indexparametern</a>.</p>
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
    </button></h2><p>Um einen <code translate="no">HNSW_SQ</code> -Index für ein Vektorfeld in Milvus zu erstellen, verwenden Sie die Methode <code translate="no">add_index()</code> und geben Sie die Parameter <code translate="no">index_type</code>, <code translate="no">metric_type</code> und zusätzliche Parameter für den Index an.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_SQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">100</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;sq_type&quot;</span>: <span class="hljs-string">&quot;SQ6&quot;</span>, <span class="hljs-comment"># Scalar quantizer type</span>
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In dieser Konfiguration:</p>
<ul>
<li><p><code translate="no">index_type</code>: Der Typ des zu erstellenden Index. In diesem Beispiel setzen Sie den Wert auf <code translate="no">HNSW_SQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Die Methode zur Berechnung des Abstands zwischen Vektoren. Unterstützte Werte sind <code translate="no">COSINE</code>, <code translate="no">L2</code> und <code translate="no">IP</code>. Einzelheiten finden Sie unter <a href="/docs/de/metric.md">Metrische Typen</a>.</p></li>
<li><p><code translate="no">params</code>: Zusätzliche Konfigurationsoptionen für den Aufbau des Index. Weitere Informationen finden Sie unter <a href="/docs/de/hnsw-sq.md#Index-building-params">Indexerstellungsparameter</a>.</p></li>
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
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Parameter controlling query time/accuracy trade-off</span>
        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">1</span> <span class="hljs-comment"># The magnification factor</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,  <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>In dieser Konfiguration:</p>
<ul>
<li><code translate="no">params</code>: Zusätzliche Konfigurationsoptionen für die Suche im Index. Details finden Sie unter <a href="/docs/de/hnsw-sq.md#Index-specific-search-params">Indexspezifische Suchparameter</a>.</li>
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
<h3 id="Index-building-params" class="common-anchor-header">Indexaufbau-Parameter</h3><p>In der folgenden Tabelle sind die Parameter aufgeführt, die in <code translate="no">params</code> beim <a href="/docs/de/hnsw-sq.md#share-PRYPd4xBJonkoZxPpNWcdnebnNh">Aufbau eines Index</a> konfiguriert werden können.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wertebereich</p></th>
     <th><p>Tuning-Vorschlag</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">M</code></p></td>
     <td><p>Maximale Anzahl der Verbindungen （oder Kanten), die jeder Knoten im Graphen haben kann, einschließlich der ausgehenden und eingehenden Kanten. Dieser Parameter wirkt sich direkt auf den Indexaufbau und die Suche aus.</p></td>
     <td><p><strong>Typ</strong>: Integer <strong>Bereich</strong>: [2, 2048]</p>
<p><strong>Standardwert</strong>: <code translate="no">30</code> (bis zu 30 ausgehende und 30 eingehende Kanten pro Knoten)</p></td>
     <td><p>Ein größerer <code translate="no">M</code> führt im Allgemeinen zu einer <strong>höheren Genauigkeit</strong>, <strong>erhöht</strong> jedoch <strong>den Speicheraufwand</strong> und <strong>verlangsamt sowohl den Indexaufbau als auch die Suche</strong>. <code translate="no">M</code> sollte für Datensätze mit hoher Dimensionalität oder wenn eine hohe Wiederauffindbarkeit entscheidend ist, erhöht werden.</p>
<p>Verringern Sie <code translate="no">M</code>, wenn die Speichernutzung und die Suchgeschwindigkeit im Vordergrund stehen.</p>
<p>In den meisten Fällen empfehlen wir Ihnen, einen Wert innerhalb dieses Bereichs zu wählen: [5, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Anzahl der Nachbarschaftskandidaten, die bei der Indexerstellung für eine Verbindung in Betracht gezogen werden. Für jedes neue Element wird ein größerer Pool von Kandidaten ausgewertet, aber die maximale Anzahl der tatsächlich hergestellten Verbindungen ist immer noch durch <code translate="no">M</code> begrenzt.</p></td>
     <td><p><strong>Typ</strong>: Integer <strong>Bereich</strong>: [1, <em>int_max</em>]</p>
<p><strong>Standardwert</strong>: <code translate="no">360</code></p></td>
     <td><p>Ein höherer <code translate="no">efConstruction</code> führt normalerweise zu einem <strong>genaueren Index</strong>, da mehr potenzielle Verbindungen untersucht werden. Dies führt jedoch auch zu einer <strong>längeren Indizierungszeit und einem erhöhten Speicherverbrauch</strong> während des Aufbaus. Erwägen Sie, <code translate="no">efConstruction</code> zu erhöhen, um die Genauigkeit zu verbessern, insbesondere in Szenarien, in denen die Indizierungszeit weniger kritisch ist.</p>
<p>Ziehen Sie eine Verringerung von <code translate="no">efConstruction</code> in Betracht, um den Indexaufbau zu beschleunigen, wenn Ressourcenbeschränkungen ein Problem darstellen.</p>
<p>In den meisten Fällen wird empfohlen, einen Wert innerhalb dieses Bereichs festzulegen: [50, 500].</p></td>
   </tr>
   <tr>
     <td><p>SQ</p></td>
     <td><p><code translate="no">sq_type</code></p></td>
     <td><p>Legt die skalare Quantisierungsmethode für die Komprimierung von Vektoren fest. Jede Option bietet ein anderes Gleichgewicht zwischen Komprimierung und Genauigkeit:</p>
<ul>
<li><p><code translate="no">SQ6</code>: Kodiert Vektoren mit 6-Bit-Ganzzahlen.</p></li>
<li><p><code translate="no">SQ8</code>: Kodiert Vektoren unter Verwendung von 8-Bit-Ganzzahlen.</p></li>
<li><p><code translate="no">BF16</code>: Verwendet das Format Bfloat16.</p></li>
<li><p><code translate="no">FP16</code>: Verwendet das standardmäßige 16-Bit-Gleitkommaformat.</p></li>
</ul></td>
     <td><p><strong>Typ</strong>: String <strong>Bereich</strong>: [ <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code> ]</p>
<p><strong>Standardwert</strong>: <code translate="no">SQ8</code></p></td>
     <td><p>Die Wahl von <code translate="no">sq_type</code> hängt von den Anforderungen der jeweiligen Anwendung ab. Wenn die Speichereffizienz ein Hauptanliegen ist, könnten <code translate="no">SQ6</code> oder <code translate="no">SQ8</code> geeignet sein. Wenn andererseits die Genauigkeit im Vordergrund steht, könnte <code translate="no">BF16</code> oder <code translate="no">FP16</code> bevorzugt werden.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Ein boolesches Flag, das steuert, ob während der Suche ein Verfeinerungsschritt durchgeführt wird. Bei der Verfeinerung werden die ursprünglichen Ergebnisse neu geordnet, indem genaue Abstände zwischen dem Abfragevektor und den Kandidaten berechnet werden.</p></td>
     <td><p><strong>Typ</strong>: Boolean <strong>Bereich</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]</p>
<p><strong>Standardwert</strong>: <code translate="no">false</code></p></td>
     <td><p>Setzen Sie <code translate="no">true</code>, wenn hohe Genauigkeit wichtig ist und Sie etwas langsamere Suchzeiten tolerieren können. Verwenden Sie <code translate="no">false</code>, wenn Geschwindigkeit eine Priorität ist und ein kleiner Kompromiss bei der Genauigkeit akzeptabel ist.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>Bestimmt die Genauigkeit der Daten, die für die Verfeinerung verwendet werden. Diese Genauigkeit muss höher sein als die der komprimierten Vektoren (wie durch <code translate="no">sq_type</code> festgelegt), was sich sowohl auf die Genauigkeit der neu eingestuften Vektoren als auch auf deren Speicherbedarf auswirkt.</p></td>
     <td><p><strong>Typ</strong>: String <strong>Bereich</strong>:[ <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code> ]</p>
<p><strong>Standardwert</strong>: Keine</p></td>
     <td><p>Verwenden Sie <code translate="no">FP32</code> für maximale Genauigkeit bei höheren Speicherkosten oder <code translate="no">SQ6</code>/<code translate="no">SQ8</code> für eine bessere Komprimierung. <code translate="no">BF16</code> und <code translate="no">FP16</code> bieten eine ausgewogene Alternative.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Indexspezifische Suchparameter</h3><p>In der folgenden Tabelle sind die Parameter aufgeführt, die in <code translate="no">search_params.params</code> für die <a href="/docs/de/hnsw-sq.md#share-DeFldzMQQoc2W4x2YiIcYUbqnne">Suche im Index</a> konfiguriert werden können.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wertebereich</p></th>
     <th><p>Tuning-Vorschlag</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Steuert die Breite der Suche während der Suche nach den nächsten Nachbarn. Er bestimmt, wie viele Knoten besucht und als potenzielle nächste Nachbarn bewertet werden. 
 Dieser Parameter wirkt sich nur auf den Suchprozess aus und gilt ausschließlich für die unterste Schicht des Graphen.</p></td>
     <td><p><strong>Typ</strong>: Integer <strong>Bereich</strong>: [1, <em>int_max</em>]</p>
<p><strong>Standardwert</strong>: <em>limit</em> (TopK nächste Nachbarn, die zurückgegeben werden)</p></td>
     <td><p>Eine größere <code translate="no">ef</code> führt im Allgemeinen zu einer <strong>höheren Suchgenauigkeit</strong>, da mehr potenzielle Nachbarn berücksichtigt werden. Allerdings <strong>erhöht sich</strong> dadurch auch <strong>die Suchzeit</strong>. <code translate="no">ef</code> sollte erhöht werden, wenn eine hohe Wiederfindungsrate entscheidend ist und die Suchgeschwindigkeit weniger wichtig ist.</p>
<p>Ziehen Sie in Erwägung, <code translate="no">ef</code> zu verringern, um schnelleren Suchen den Vorzug zu geben, insbesondere in Szenarien, in denen eine leichte Verringerung der Genauigkeit akzeptabel ist.</p>
<p>In den meisten Fällen wird empfohlen, einen Wert innerhalb dieses Bereichs zu wählen: [K, 10K].</p></td>
   </tr>
   <tr>
     <td><p>SQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Der Vergrößerungsfaktor, der steuert, wie viele zusätzliche Kandidaten während der Verfeinerungsphase im Verhältnis zu den angeforderten Top-K-Ergebnissen untersucht werden.</p></td>
     <td><p><strong>Typ</strong>: Float <strong>Bereich</strong>: [1, <em>float_max</em>)</p>
<p><strong>Standardwert</strong>: 1</p></td>
     <td><p>Höhere Werte von <code translate="no">refine_k</code> können die Auffindbarkeit und Genauigkeit verbessern, erhöhen aber auch die Suchzeit und den Ressourcenverbrauch. Ein Wert von 1 bedeutet, dass der Verfeinerungsprozess nur die anfänglichen Top-K-Ergebnisse berücksichtigt.</p></td>
   </tr>
</table>
