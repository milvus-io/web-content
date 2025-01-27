---
id: ivf-pq.md
order: 2
summary: In diesem Artikel wird der IVF_PQ-Index in Milvus vorgestellt.
title: IVF_PQ
---
<h1 id="IVFPQ" class="common-anchor-header">IVF_PQ<button data-href="#IVFPQ" class="anchor-icon" translate="no">
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
    </button></h1><p>Der <strong>IVF_PQ-Index</strong> ist ein <strong>quantisierungsbasierter</strong> Indizierungsalgorithmus für die ungefähre Suche nach dem nächsten Nachbarn in hochdimensionalen Räumen. <strong>IVF_PQ</strong> ist zwar nicht so schnell wie einige graphenbasierte Methoden, benötigt aber oft deutlich weniger Speicherplatz, was ihn zu einer praktischen Wahl für große Datensätze macht.</p>
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
    </button></h2><p><strong>IVF_PQ</strong> steht für <strong>Inverted File with Product Quantization (Invertierte Datei mit Produktquantisierung</strong>), ein hybrider Ansatz, der Indizierung und Komprimierung für effiziente Vektorsuche und -abfrage kombiniert. Dabei werden zwei Kernkomponenten genutzt: <strong>Invertierte Datei (IVF)</strong> und <strong>Produktquantisierung (PQ)</strong>.</p>
<h3 id="IVF" class="common-anchor-header">IVF</h3><p>IVF ist wie die Erstellung eines Index in einem Buch. Anstatt jede Seite (oder in unserem Fall jeden Vektor) zu durchsuchen, suchen Sie nach bestimmten Schlüsselwörtern (Clustern) im Index, um die relevanten Seiten (Vektoren) schnell zu finden. In unserem Szenario werden die Vektoren in Clustern gruppiert, und der Algorithmus sucht in einigen wenigen Clustern, die nahe am Abfragevektor liegen.</p>
<p>Und so funktioniert's:</p>
<ol>
<li><strong>Clustering:</strong> Ihr Vektordatensatz wird mithilfe eines Clustering-Algorithmus wie k-means in eine bestimmte Anzahl von Clustern unterteilt. Jeder Cluster hat einen Zentroid (einen repräsentativen Vektor für den Cluster).</li>
<li><strong>Zuweisung:</strong> Jeder Vektor wird dem Cluster zugewiesen, dessen Zentroid ihm am nächsten ist.</li>
<li><strong>Invertierter Index:</strong> Es wird ein Index erstellt, der jeden Clusterschwerpunkt auf die Liste der diesem Cluster zugeordneten Vektoren abbildet.</li>
<li><strong>Suche:</strong> Bei der Suche nach den nächsten Nachbarn vergleicht der Suchalgorithmus Ihren Abfragevektor mit den Clusterschwerpunkten und wählt den/die vielversprechendsten Cluster aus. Die Suche wird dann auf die Vektoren innerhalb dieser ausgewählten Cluster eingegrenzt.</li>
</ol>
<p>Weitere Informationen zu den technischen Details finden Sie unter <a href="/docs/de/ivf-flat.md">IVF_FLAT</a>.</p>
<h3 id="PQ" class="common-anchor-header">PQ</h3><p>Die<strong>Produktquantisierung (PQ)</strong> ist eine Komprimierungsmethode für hochdimensionale Vektoren, die den Speicherbedarf erheblich reduziert und gleichzeitig schnelle Ähnlichkeitssuchoperationen ermöglicht.</p>
<p>Der PQ-Prozess umfasst die folgenden Hauptschritte:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-pq-1.png" alt="pq-process-1" class="doc-image" id="pq-process-1" />
   </span> <span class="img-wrapper"> <span>pq-prozess-1</span> </span></p>
<ol>
<li><strong>Dekomposition der Dimensionen</strong>: Der Algorithmus beginnt mit der Zerlegung jedes hochdimensionalen Vektors in <code translate="no">m</code> gleich große Untervektoren. Durch diese Zerlegung wird der ursprünglich D-dimensionale Raum in <code translate="no">m</code> disjunkte Unterräume transformiert, wobei jeder Unterraum <em>D/m</em> Dimensionen enthält. Der Parameter <code translate="no">m</code> steuert die Granularität der Zerlegung und beeinflusst direkt die Kompressionsrate.</li>
<li><strong>Erzeugung eines Unterraum-Codebuchs</strong>: In jedem Unterraum wendet der Algorithmus das <a href="https://en.wikipedia.org/wiki/K-means_clustering">k-means-Clustering</a> an, um einen Satz repräsentativer Vektoren (Zentroide) zu lernen. Diese Zentroide bilden zusammen ein Codebuch für diesen Unterraum. Die Anzahl der Zentroide in jedem Codebuch wird durch den Parameter <code translate="no">nbits</code> bestimmt, wobei jedes Codebuch 2^nbits Zentroide enthält. Wenn beispielsweise <code translate="no">nbits = 8</code> verwendet wird, enthält jedes Codebuch 256 Zentroide. Jedem Zentroid wird ein eindeutiger Index mit <code translate="no">nbits</code> Bits zugewiesen.</li>
<li><strong>Vektorquantisierung</strong>: Für jeden Untervektor des ursprünglichen Vektors identifiziert PQ den nächstgelegenen Schwerpunkt innerhalb des entsprechenden Unterraums unter Verwendung eines bestimmten metrischen Typs. Durch diesen Prozess wird jeder Untervektor effektiv auf den nächstgelegenen repräsentativen Vektor im Codebuch abgebildet. Anstatt die vollständigen Koordinaten des Untervektors zu speichern, wird nur der Index des übereinstimmenden Schwerpunkts beibehalten.</li>
<li><strong>Komprimierte Darstellung</strong>: Die endgültige komprimierte Darstellung besteht aus <code translate="no">m</code> Indizes, einem aus jedem Unterraum, die zusammen als <strong>PQ-Codes</strong> bezeichnet werden. Diese Kodierung reduziert den Speicherbedarf von <em>D × 32</em> Bits (unter der Annahme von 32-Bit-Gleitkommazahlen) auf <em>m</em> × <em>n Bits</em>, wodurch eine erhebliche Komprimierung erreicht wird, während die Fähigkeit zur Annäherung der Vektorabstände erhalten bleibt.</li>
</ol>
<p>Weitere Einzelheiten zur Parametereinstellung und -optimierung finden Sie unter <a href="#index-params">Indexparameter</a>.</p>
<div class="alert note">
<p><strong>Beispiel für die Komprimierung</strong></p>
<p>Betrachten wir einen Vektor mit <em>D = 128</em> Dimensionen unter Verwendung von 32-Bit-Gleitkommazahlen. Mit den PQ-Parametern <em>m = 64</em> (Untervektoren) und <em>nbits = 8</em> (also <em>k =</em> 2^8 <em>= 256</em> Zentroide pro Unterraum) können wir die Speicheranforderungen vergleichen:</p>
<ul>
<li>Originalvektor: 128 Dimensionen × 32 Bits = 4.096 Bits</li>
<li>PQ-komprimierter Vektor: 64 Untervektoren × 8 Bits = 512 Bits</li>
</ul>
<p>Dies entspricht einer 8-fachen Reduzierung des Speicherbedarfs.</p>
</div>
<p><strong>Abstandsberechnung mit PQ</strong></p>
<p>Bei der Durchführung einer Ähnlichkeitssuche mit einem Abfragevektor ermöglicht PQ eine effiziente Abstandsberechnung durch die folgenden Schritte:</p>
<ol>
<li><p><strong>Vorverarbeitung der Abfrage</strong></p>
<ol>
<li>Der Abfragevektor wird in <code translate="no">m</code> Untervektoren zerlegt, die der ursprünglichen PQ-Zerlegungsstruktur entsprechen.</li>
<li>Für jeden Untervektor der Abfrage und sein entsprechendes Codebuch (mit 2^nbits Zentren) werden die Abstände zu allen Zentren berechnet und gespeichert.</li>
<li>Dies erzeugt <code translate="no">m</code> Nachschlagetabellen, wobei jede Tabelle 2^nbits Abstände enthält.</li>
</ol></li>
<li><p><strong>Annäherung der Abstände</strong></p>
<p>Für jeden Datenbankvektor, der durch PQ-Codes dargestellt wird, wird sein ungefährer Abstand zum Abfragevektor wie folgt berechnet:</p>
<ol>
<li>Für jeden der <code translate="no">m</code> Untervektoren wird der vorberechnete Abstand aus der entsprechenden Nachschlagetabelle unter Verwendung des gespeicherten Schwerpunktindexes abgerufen.</li>
<li>Summieren Sie diese <code translate="no">m</code> Abstände, um den ungefähren Abstand auf der Grundlage eines bestimmten metrischen Typs (z. B. Euklidischer Abstand) zu erhalten.</li>
</ol></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-pq-2.png" alt="pq-process-1" class="doc-image" id="pq-process-1" />
   </span> <span class="img-wrapper"> <span>pq-prozess-1</span> </span></p>
<h3 id="IVF-+-PQ" class="common-anchor-header">IVF + PQ</h3><p>Der Index <strong>IVF_PQ</strong> kombiniert die Stärken von <strong>IVF</strong> und <strong>PQ</strong>, um die Suche zu beschleunigen. Das Verfahren arbeitet in zwei Schritten:</p>
<ol>
<li><strong>Grobfilterung mit IVF</strong>: IVF partitioniert den Vektorraum in Cluster, wodurch der Suchumfang reduziert wird. Anstatt den gesamten Datensatz auszuwerten, konzentriert sich der Algorithmus nur auf die Cluster, die dem Abfragevektor am nächsten liegen.</li>
<li><strong>Feinkörniger Vergleich mit PQ</strong>: Innerhalb der ausgewählten Cluster verwendet PQ komprimierte und quantisierte Vektordarstellungen, um ungefähre Abstände schnell zu berechnen.</li>
</ol>
<p>Die Leistung des <strong>IVF_PQ-Index</strong> wird erheblich von den Parametern beeinflusst, die sowohl den IVF- als auch den PQ-Algorithmus steuern. Die Abstimmung dieser Parameter ist entscheidend, um optimale Ergebnisse für einen bestimmten Datensatz und eine bestimmte Anwendung zu erzielen. Ausführlichere Informationen zu diesen Parametern und deren Einstellung finden Sie unter <a href="#index-params">Indexparameter</a>.</p>
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
    </button></h2><p>Um einen <code translate="no">IVF_PQ</code> -Index auf einem Vektorfeld in Milvus zu erstellen, verwenden Sie die Methode <code translate="no">add_index()</code> und geben Sie die Parameter <code translate="no">index_type</code>, <code translate="no">metric_type</code> und zusätzliche Parameter für den Index an.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_PQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-comment"># Number of sub-vectors to split eahc vector into</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In dieser Konfiguration:</p>
<ul>
<li><p><code translate="no">index_type</code>: Der Typ des zu erstellenden Index. In diesem Beispiel setzen Sie den Wert auf <code translate="no">IVF_PQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Die Methode zur Berechnung des Abstands zwischen Vektoren. Unterstützte Werte sind <code translate="no">COSINE</code>, <code translate="no">L2</code> und <code translate="no">IP</code>. Einzelheiten finden Sie unter <a href="/docs/de/metric.md">Metrische Typen</a>.</p></li>
<li><p><code translate="no">params</code>: Zusätzliche Konfigurationsoptionen für den Aufbau des Index.</p>
<ul>
<li><code translate="no">m</code>: Anzahl der Untervektoren, in die der Vektor aufgeteilt werden soll.</li>
</ul>
<p>Weitere Informationen zu den für den Index <code translate="no">IVF_PQ</code> verfügbaren Parametern finden Sie unter <a href="#Index-building-params">Parameter für den Indexaufbau</a>.</p></li>
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
        <span class="hljs-string">&quot;nprobe&quot;</span>: 10, <span class="hljs-comment"># Number of clusters to search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    data=[[0.1, 0.2, 0.3, 0.4, 0.5]],  <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">limit</span>=3,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)

<button class="copy-code-btn"></button></code></pre>
<p>In dieser Konfiguration:</p>
<ul>
<li><p><code translate="no">params</code>: Zusätzliche Konfigurationsoptionen für die Suche im Index.</p>
<ul>
<li><code translate="no">nprobe</code>: Anzahl der Cluster, nach denen gesucht werden soll.</li>
</ul>
<p>Weitere Suchparameter, die für den Index <code translate="no">IVF_PQ</code> verfügbar sind, finden Sie unter <a href="#index-specific-search-params">Indexspezifische Suchparameter</a>.</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">Indexaufbau-Parameter</h3><p>In der folgenden Tabelle sind die Parameter aufgeführt, die in <code translate="no">params</code> beim <a href="#Build-index">Aufbau eines Index</a> konfiguriert werden können.</p>
<table>
<thead>
<tr><th></th><th><strong>Parameter</strong></th><th><strong>Beschreibung</strong></th><th><strong>Wertebereich</strong></th><th><strong>Tuning-Vorschlag</strong></th></tr>
</thead>
<tbody>
<tr><td>IVF</td><td><code translate="no">nlist</code></td><td>Die Anzahl der Cluster, die mit dem k-means-Algorithmus während der Indexerstellung erstellt werden.</td><td><strong>Typ</strong>: Integer<br><strong>Bereich</strong>: [1, 65536]<br><strong>Standardwert</strong>: <code translate="no">128</code></td><td>Größere <code translate="no">nlist</code> Werte verbessern die Wiederauffindbarkeit durch die Erstellung von feineren Clustern, erhöhen aber die Indexerstellungszeit. Optimieren Sie den Wert anhand der Größe des Datensatzes und der verfügbaren Ressourcen.<br>In den meisten Fällen wird empfohlen, einen Wert innerhalb dieses Bereichs festzulegen: [32, 4096].</td></tr>
<tr><td>PQ</td><td><code translate="no">m</code></td><td>Die Anzahl der Untervektoren (für die Quantisierung), in die jeder hochdimensionale Vektor während des Quantisierungsprozesses unterteilt wird.</td><td><strong>Typ</strong>: Integer<br><strong>Bereich</strong>: [1, 65536]<br><strong>Standardwert</strong>: Keine</td><td>Ein höherer <code translate="no">m</code> Wert kann die Genauigkeit verbessern, erhöht aber auch die Rechenkomplexität und den Speicherverbrauch.<br><code translate="no">m</code> muss ein Divisor der Vektordimension<em>(D</em>) sein, um eine korrekte Zerlegung zu gewährleisten. Ein allgemein empfohlener Wert ist <em>m = D/2</em>.<br>In den meisten Fällen wird empfohlen, einen Wert innerhalb dieses Bereichs zu wählen: [D/8, D].</td></tr>
<tr><td></td><td><code translate="no">nbits</code></td><td>Die Anzahl der Bits, die verwendet werden, um den Index des Schwerpunkts jedes Untervektors in komprimierter Form darzustellen. Sie bestimmt direkt die Größe jedes Codebuchs, das jeweils 2^nbits Zentroide enthält. Wenn zum Beispiel <code translate="no">nbits</code> auf 8 gesetzt ist, wird jeder Untervektor durch einen 8-Bit-Schwerpunktindex dargestellt. Dies ermöglicht 2^8 (256) mögliche Zentroide im Codebuch für diesen Untervektor.</td><td><strong>Typ</strong>: Integer<br><strong>Bereich</strong>: [1, 64]<br><strong>Standardwert</strong>: <code translate="no">8</code></td><td>Ein höherer Wert von <code translate="no">nbits</code> ermöglicht größere Codebücher, was zu genaueren Darstellungen der ursprünglichen Vektoren führen kann. Allerdings bedeutet dies auch, dass mehr Bits zum Speichern jedes Index verwendet werden, was zu einer geringeren Komprimierung führt.<br>In den meisten Fällen wird empfohlen, einen Wert innerhalb dieses Bereichs zu wählen: [1, 16].</td></tr>
</tbody>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Indexspezifische Suchparameter</h3><p>In der folgenden Tabelle sind die Parameter aufgeführt, die in <code translate="no">search_params.params</code> für die <a href="#Search-on-index">Suche im Index</a> konfiguriert werden können.</p>
<table>
<thead>
<tr><th></th><th><strong>Parameter</strong></th><th><strong>Beschreibung</strong></th><th><strong>Wertebereich</strong></th><th><strong>Tuning-Vorschlag</strong></th></tr>
</thead>
<tbody>
<tr><td>IVF</td><td><code translate="no">nprobe</code></td><td>Die Anzahl der Cluster, in denen nach Kandidaten gesucht wird.</td><td><strong>Typ</strong>: Ganzzahl<br><strong>Bereich</strong>: [1, <em>nlist</em>]<br><strong>Standardwert</strong>: <code translate="no">8</code></td><td>Höhere Werte ermöglichen die Suche nach mehr Clustern, was die Wiederauffindbarkeit durch Erweiterung des Suchbereichs verbessert, jedoch auf Kosten einer erhöhten Abfrage-Latenz.<br>Stellen Sie <code translate="no">nprobe</code> proportional zu <code translate="no">nlist</code> ein, um Geschwindigkeit und Genauigkeit auszugleichen.<br>In den meisten Fällen wird empfohlen, einen Wert innerhalb dieses Bereichs festzulegen: [1, nlist].</td></tr>
</tbody>
</table>
