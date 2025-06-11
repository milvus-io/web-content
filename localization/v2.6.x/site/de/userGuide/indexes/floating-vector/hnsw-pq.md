---
id: hnsw-pq.md
title: HNSW_PQ
summary: >-
  HNSW_PQ nutzt Hierarchical Navigable Small World (HNSW)-Graphen mit Product
  Quantization (PQ) und schafft so eine fortschrittliche
  Vektorindizierungsmethode, die einen kontrollierbaren Kompromiss zwischen
  Größe und Genauigkeit bietet. Im Vergleich zu HNSW_SQ bietet dieser Indextyp
  eine höhere Wiederauffindungsrate bei gleichem Komprimierungsgrad, wenn auch
  mit geringerer Abfragegeschwindigkeit und längerer Indexaufbauzeit.
---
<h1 id="HNSWPQ" class="common-anchor-header">HNSW_PQ<button data-href="#HNSWPQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>HNSW_PQ</strong> nutzt Hierarchical Navigable Small World (HNSW)-Graphen mit Product Quantization (PQ), um eine fortschrittliche Vektorindizierungsmethode zu schaffen, die einen kontrollierbaren Kompromiss zwischen Größe und Genauigkeit bietet. Im Vergleich zu <a href="/docs/de/hnsw-sq.md">HNSW_SQ</a> liefert dieser Indextyp eine höhere Wiederauffindungsrate bei gleichem Komprimierungsgrad, wenn auch mit geringerer Abfrageverarbeitungsgeschwindigkeit und längerer Indexaufbauzeit.</p>
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
    </button></h2><p>HNSW_PQ kombiniert zwei Indizierungstechniken: <strong>HNSW</strong> für schnelle graphbasierte Navigation und <strong>PQ</strong> für effiziente Vektorkompression.</p>
<h3 id="HNSW" class="common-anchor-header">HNSW</h3><p>HNSW konstruiert einen mehrschichtigen Graphen, bei dem jeder Knoten einem Vektor im Datensatz entspricht. In diesem Graphen sind die Knoten auf der Grundlage ihrer Ähnlichkeit miteinander verbunden, was eine schnelle Durchquerung des Datenraums ermöglicht. Die hierarchische Struktur ermöglicht es dem Suchalgorithmus, die in Frage kommenden Nachbarn einzugrenzen, wodurch der Suchprozess in hochdimensionalen Räumen erheblich beschleunigt wird.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/hnsw.md">HNSW</a>.</p>
<h3 id="PQ" class="common-anchor-header">PQ</h3><p>PQ ist eine Vektorkomprimierungstechnik, die hochdimensionale Vektoren in kleinere Untervektoren zerlegt, die dann quantisiert und komprimiert werden. Die Komprimierung reduziert den Speicherbedarf erheblich und beschleunigt die Entfernungsberechnungen.</p>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/ivf-pq.md#PQ">IVF_PQ</a>.</p>
<h3 id="HNSW-+-PQ" class="common-anchor-header">HNSW + PQ</h3><p>HNSW_PQ kombiniert die Stärken von HNSW und PQ, um eine effiziente ungefähre Suche nach den nächsten Nachbarn zu ermöglichen. Der Algorithmus verwendet PQ, um die Daten zu komprimieren (und damit den Speicherbedarf zu verringern), und baut dann einen HNSW-Graphen auf diesen komprimierten Vektoren auf, um ein schnelles Auffinden von Kandidaten zu ermöglichen. Während der Suche kann der Algorithmus optional die Kandidatenergebnisse mit Hilfe von Daten höherer Präzision verfeinern, um die Genauigkeit zu verbessern. So funktioniert der Prozess:</p>
<ol>
<li><p><strong>Datenkomprimierung</strong>: PQ teilt jeden Vektor in mehrere Untervektoren auf und quantisiert sie mithilfe eines Codebuchs von Zentroiden, das durch Parameter wie <code translate="no">m</code> (Anzahl der Untervektoren) und <code translate="no">nbits</code> (Bits pro Untervektor) gesteuert wird.</p></li>
<li><p><strong>Konstruktion des Graphen</strong>: Die komprimierten Vektoren werden dann verwendet, um einen HNSW-Graphen zu erstellen. Da die Vektoren in komprimierter Form gespeichert werden, ist der resultierende Graph in der Regel kleiner, benötigt weniger Speicherplatz und kann schneller durchlaufen werden, was den Schritt des Kandidatenabrufs erheblich beschleunigt.</p></li>
<li><p><strong>Abruf von Kandidaten</strong>: Wenn eine Abfrage ausgeführt wird, verwendet der Algorithmus die komprimierten Daten im HNSW-Graphen, um effizient einen Pool von Nachbarschaftskandidaten zu identifizieren. Durch diese graphbasierte Suche wird die Anzahl der zu berücksichtigenden Vektoren drastisch reduziert, wodurch sich die Abfragelatenz im Vergleich zu Brute-Force-Suchen verbessert.</p></li>
<li><p><strong>(Optional) Verfeinerung der Ergebnisse</strong>: Die anfänglichen Kandidatenergebnisse können zur Verbesserung der Genauigkeit anhand der folgenden Parameter verfeinert werden:</p>
<ul>
<li><p><code translate="no">refine</code>: Steuert, ob dieser Verfeinerungsschritt aktiviert ist. Wenn er auf <code translate="no">true</code> gesetzt ist, berechnet das System Entfernungen mit höherer Genauigkeit oder unkomprimierten Darstellungen neu.</p></li>
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
    </button></h2><p>Um einen <code translate="no">HNSW_PQ</code> -Index für ein Vektorfeld in Milvus zu erstellen, verwenden Sie die Methode <code translate="no">add_index()</code> und geben Sie die Parameter <code translate="no">index_type</code>, <code translate="no">metric_type</code> und zusätzliche Parameter für den Index an.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_PQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">30</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">360</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">384</span>, 
        <span class="hljs-string">&quot;nbits&quot;</span>: <span class="hljs-number">8</span>,
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In dieser Konfiguration:</p>
<ul>
<li><p><code translate="no">index_type</code>: Der Typ des zu erstellenden Index. In diesem Beispiel setzen Sie den Wert auf <code translate="no">HNSW_PQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Die Methode zur Berechnung des Abstands zwischen Vektoren. Unterstützte Werte sind <code translate="no">COSINE</code>, <code translate="no">L2</code> und <code translate="no">IP</code>. Einzelheiten finden Sie unter <a href="/docs/de/metric.md">Metrische Typen</a>.</p></li>
<li><p><code translate="no">params</code>: Zusätzliche Konfigurationsoptionen für den Aufbau des Index. Weitere Informationen finden Sie unter <a href="/docs/de/hnsw-pq.md#Index-building-params">Indexerstellungsparameter</a>.</p></li>
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
<li><code translate="no">params</code>: Zusätzliche Konfigurationsoptionen für die Suche im Index. Details finden Sie unter <a href="/docs/de/hnsw-pq.md#Index-specific-search-params">Indexspezifische Suchparameter</a>.</li>
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
<h3 id="Index-building-params" class="common-anchor-header">Indexaufbau-Parameter</h3><p>In der folgenden Tabelle sind die Parameter aufgeführt, die in <code translate="no">params</code> beim <a href="/docs/de/hnsw-pq.md#Build-index">Aufbau eines Index</a> konfiguriert werden können.</p>
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
     <td><p>PQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>Die Anzahl der Untervektoren (für die Quantisierung), in die jeder hochdimensionale Vektor während des Quantisierungsprozesses unterteilt wird.</p></td>
     <td><p><strong>Typ</strong>: Integer <strong>Bereich</strong>: [1, 65536]</p>
<p><strong>Standardwert</strong>: Keine</p></td>
     <td><p>Ein höherer Wert von <code translate="no">m</code> kann die Genauigkeit verbessern, erhöht aber auch die Rechenkomplexität und den Speicherverbrauch. <code translate="no">m</code> muss ein Divisor der Vektordimension<em>(D</em>) sein, um eine korrekte Zerlegung zu gewährleisten. Ein allgemein empfohlener Wert ist <em>m = D/2</em>.</p>
<p>In den meisten Fällen wird empfohlen, einen Wert in diesem Bereich zu wählen: [D/8, D].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>Die Anzahl der Bits, die verwendet werden, um den Index des Schwerpunkts jedes Untervektors in komprimierter Form darzustellen. Sie bestimmt direkt die Größe jedes Codebuchs. Jedes Codebuch enthält $2^{\textit{nbits}}$ Zentroide. Wenn <code translate="no">nbits</code> beispielsweise auf 8 gesetzt ist, wird jeder Untervektor durch einen 8-Bit-Index des Schwerpunkts dargestellt. Dies ermöglicht $2^8$ (256) mögliche Zentroide im Codebuch für diesen Untervektor.</p></td>
     <td><p><strong>Typ</strong>: Integer <strong>Bereich</strong>: [1, 64]</p>
<p><strong>Standardwert</strong>: <code translate="no">8</code></p></td>
     <td><p>Ein höherer Wert von <code translate="no">nbits</code> ermöglicht größere Codebücher, was zu genaueren Darstellungen der ursprünglichen Vektoren führen kann. Allerdings bedeutet dies auch, dass mehr Bits zum Speichern jedes Index verwendet werden, was zu einer geringeren Komprimierung führt. In den meisten Fällen wird empfohlen, einen Wert innerhalb dieses Bereichs zu wählen: [1, 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Ein boolesches Flag, das steuert, ob während der Suche ein Verfeinerungsschritt angewendet wird. Bei der Verfeinerung werden die ursprünglichen Ergebnisse neu geordnet, indem die genauen Abstände zwischen dem Abfragevektor und den Kandidaten berechnet werden.</p></td>
     <td><p><strong>Typ</strong>: Boolean <strong>Bereich</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]</p>
<p><strong>Standardwert</strong>: <code translate="no">false</code></p></td>
     <td><p>Setzen Sie <code translate="no">true</code>, wenn hohe Genauigkeit wichtig ist und Sie etwas langsamere Suchzeiten tolerieren können. Verwenden Sie <code translate="no">false</code>, wenn Geschwindigkeit eine Priorität ist und ein kleiner Kompromiss bei der Genauigkeit akzeptabel ist.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>Bestimmt die Genauigkeit der Daten, die während des Verfeinerungsprozesses verwendet werden. Diese Genauigkeit muss höher sein als die der komprimierten Vektoren (wie durch die Parameter <code translate="no">m</code> und <code translate="no">nbits</code> festgelegt).</p></td>
     <td><p><strong>Typ</strong>: String <strong>Bereich</strong>:[ <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code> ]</p>
<p><strong>Standardwert</strong>: Keine</p></td>
     <td><p>Verwenden Sie <code translate="no">FP32</code> für maximale Präzision bei höheren Speicherkosten oder <code translate="no">SQ6</code>/<code translate="no">SQ8</code> für eine bessere Komprimierung. <code translate="no">BF16</code> und <code translate="no">FP16</code> bieten eine ausgewogene Alternative.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Indexspezifische Suchparameter</h3><p>In der folgenden Tabelle sind die Parameter aufgeführt, die in <code translate="no">search_params.params</code> für die <a href="/docs/de/hnsw-pq.md#Search-on-index">Suche im Index</a> konfiguriert werden können.</p>
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
     <td><p>PQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Der Vergrößerungsfaktor, der steuert, wie viele zusätzliche Kandidaten während der Verfeinerungsphase (Reranking) im Verhältnis zu den angeforderten Top-K-Ergebnissen untersucht werden.</p></td>
     <td><p><strong>Typ</strong>: Float <strong>Bereich</strong>: [1, <em>float_max</em>)</p>
<p><strong>Standardwert</strong>: 1</p></td>
     <td><p>Höhere Werte von <code translate="no">refine_k</code> können die Auffindbarkeit und Genauigkeit verbessern, erhöhen aber auch die Suchzeit und den Ressourcenverbrauch. Ein Wert von 1 bedeutet, dass der Verfeinerungsprozess nur die anfänglichen Top-K-Ergebnisse berücksichtigt.</p></td>
   </tr>
</table>
