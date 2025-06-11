---
id: ivf-sq8.md
title: IVF_SQ8
summary: >-
  Der IVF_SQ8-Index ist ein quantisierungsbasierter Indizierungsalgorithmus, der
  für die Bewältigung umfangreicher Ähnlichkeitssuchen entwickelt wurde. Dieser
  Indextyp ermöglicht schnellere Suchvorgänge mit einem viel geringeren
  Speicherbedarf im Vergleich zu erschöpfenden Suchmethoden.
---
<h1 id="IVFSQ8" class="common-anchor-header">IVF_SQ8<button data-href="#IVFSQ8" class="anchor-icon" translate="no">
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
    </button></h1><p>Der <strong>IVF_SQ8-Index</strong> ist ein <strong>quantisierungsbasierter</strong> Indizierungsalgorithmus, der für die Bewältigung umfangreicher Ähnlichkeitssuchen entwickelt wurde. Dieser Indextyp ermöglicht eine schnellere Suche mit einem wesentlich geringeren Speicherbedarf im Vergleich zu erschöpfenden Suchmethoden.</p>
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
    </button></h2><p>Der IVF_SQ8-Index basiert auf zwei Schlüsselkomponenten:</p>
<ul>
<li><p><strong>Inverted File (IVF)</strong>: Organisiert die Daten in Clustern, so dass sich der Suchalgorithmus nur auf die relevantesten Teilmengen von Vektoren konzentrieren kann.</p></li>
<li><p><strong>Skalare Quantisierung (SQ8)</strong>: Komprimiert die Vektoren in eine kompaktere Form, wodurch die Speichernutzung drastisch reduziert wird, während gleichzeitig eine ausreichende Präzision für schnelle Ähnlichkeitsberechnungen erhalten bleibt.</p></li>
</ul>
<h3 id="IVF" class="common-anchor-header">IVF</h3><p>IVF ist wie die Erstellung eines Index in einem Buch. Anstatt jede Seite (oder in unserem Fall jeden Vektor) zu durchsuchen, suchen Sie nach bestimmten Schlüsselwörtern (Clustern) im Index, um die relevanten Seiten (Vektoren) schnell zu finden. In unserem Szenario werden die Vektoren in Clustern gruppiert, und der Algorithmus sucht in einigen Clustern, die dem Abfragevektor nahe kommen.</p>
<p>Und so funktioniert's:</p>
<ol>
<li><p><strong>Clustering:</strong> Ihr Vektordatensatz wird mithilfe eines Clustering-Algorithmus wie k-means in eine bestimmte Anzahl von Clustern unterteilt. Jeder Cluster hat einen Zentroid (einen repräsentativen Vektor für den Cluster).</p></li>
<li><p><strong>Zuweisung:</strong> Jeder Vektor wird dem Cluster zugewiesen, dessen Zentroid ihm am nächsten ist.</p></li>
<li><p><strong>Invertierter Index:</strong> Es wird ein Index erstellt, der jeden Clusterschwerpunkt auf die Liste der diesem Cluster zugeordneten Vektoren abbildet.</p></li>
<li><p><strong>Suche:</strong> Bei der Suche nach den nächsten Nachbarn vergleicht der Suchalgorithmus Ihren Abfragevektor mit den Clusterschwerpunkten und wählt den/die vielversprechendsten Cluster aus. Die Suche wird dann auf die Vektoren innerhalb dieser ausgewählten Cluster eingegrenzt.</p></li>
</ol>
<p>Mehr über die technischen Details erfahren Sie unter <a href="/docs/de/ivf-flat.md">IVF_FLAT</a>.</p>
<h3 id="SQ8" class="common-anchor-header">SQ8</h3><p>Die Skalarquantisierung (SQ) ist eine Technik zur Verringerung der Größe von hochdimensionalen Vektoren, indem ihre Werte durch kleinere, kompaktere Darstellungen ersetzt werden. Die <strong>SQ8-Variante</strong> verwendet 8-Bit-Ganzzahlen anstelle der typischen 32-Bit-Gleitkommazahlen, um jeden Dimensionswert eines Vektors zu speichern. Dadurch wird der für die Speicherung der Daten erforderliche Speicherplatz erheblich reduziert.</p>
<p>So funktioniert SQ8:</p>
<ol>
<li><p><strong>Identifizierung des Bereichs:</strong> Zunächst werden die Mindest- und Höchstwerte innerhalb des Vektors ermittelt. Dieser Bereich definiert die Grenzen für die Quantisierung.</p></li>
<li><p><strong>Normalisierung:</strong> Normalisieren Sie die Vektorwerte mithilfe der Formel auf einen Bereich zwischen 0 und 1:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mtext>normalized_value</mtext><mo>=</mo><mfrac><mrow><mtext>value</mtext><mo>−</mo><mtext>min</mtext></mrow><mrow><mtext>max</mtext><mo>−</mo><mtext>min</mtext></mrow></mfrac></mrow><annotation encoding="application/x-tex">\text{normalized\_value} = \frac{\text{value} - \text{min}}{\text{max} - \text{min}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0044em;vertical-align:-0.31em;"></span><span class="mord text"><span class="mord">normalized_value</span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.1408em;vertical-align:-0.7693em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3714em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">max</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">min</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">value</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">min</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.7693em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>Dadurch wird sichergestellt, dass alle Werte proportional innerhalb eines standardisierten Bereichs abgebildet werden, um sie für die Komprimierung vorzubereiten.</p></li>
<li><p><strong>8-Bit-Komprimierung:</strong> Multiplizieren Sie den normalisierten Wert mit 255 (dem Höchstwert für eine 8-Bit-Ganzzahl) und runden Sie das Ergebnis auf die nächste Ganzzahl. Auf diese Weise wird jeder Wert effektiv in eine 8-Bit-Darstellung komprimiert.</p></li>
</ol>
<p>Nehmen wir an, Sie haben einen Dimensionswert von 1,2, mit einem Minimalwert von -1,7 und einem Maximalwert von 2,3. Die folgende Abbildung zeigt, wie SQ8 angewendet wird, um einen float32-Wert in eine int8-Ganzzahl zu konvertieren.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/ivf-sq8.png" alt="Ivf Sq8" class="doc-image" id="ivf-sq8" />
   </span> <span class="img-wrapper"> <span>Ivf Sq8</span> </span></p>
<h3 id="IVF-+-SQ8" class="common-anchor-header">IVF + SQ8</h3><p>Der Index IVF_SQ8 kombiniert IVF und SQ8, um Ähnlichkeitssuchen effizient durchzuführen:</p>
<ol>
<li><p><strong>IVF grenzt den Suchbereich ein</strong>: Der Datensatz wird in Cluster unterteilt, und wenn eine Abfrage gestellt wird, vergleicht IVF die Abfrage zunächst mit den Clusterschwerpunkten und wählt die relevantesten Cluster aus.</p></li>
<li><p><strong>SQ8 beschleunigt die Abstandsberechnungen</strong>: Innerhalb der ausgewählten Cluster komprimiert SQ8 die Vektoren in 8-Bit-Ganzzahlen, wodurch die Speichernutzung reduziert und die Abstandsberechnungen beschleunigt werden.</p></li>
</ol>
<p>Durch den Einsatz von IVF zur Fokussierung der Suche und SQ8 zur Beschleunigung der Berechnungen erreicht IVF_SQ8 sowohl schnelle Suchzeiten als auch Speichereffizienz.</p>
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
    </button></h2><p>Um einen <code translate="no">IVF_SQ8</code> -Index für ein Vektorfeld in Milvus zu erstellen, verwenden Sie die Methode <code translate="no">add_index()</code>, wobei Sie die Parameter <code translate="no">index_type</code>, <code translate="no">metric_type</code> und zusätzliche Parameter für den Index angeben.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_SQ8&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Number of clusters to create using the k-means algorithm during index building</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In dieser Konfiguration:</p>
<ul>
<li><p><code translate="no">index_type</code>: Der Typ des zu erstellenden Index. In diesem Beispiel setzen Sie den Wert auf <code translate="no">IVF_SQ8</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Die Methode zur Berechnung des Abstands zwischen Vektoren. Unterstützte Werte sind <code translate="no">COSINE</code>, <code translate="no">L2</code> und <code translate="no">IP</code>. Einzelheiten finden Sie unter <a href="/docs/de/metric.md">Metrische Typen</a>.</p></li>
<li><p><code translate="no">params</code>: Zusätzliche Konfigurationsoptionen für den Aufbau des Index.</p>
<ul>
<li><code translate="no">nlist</code>: Anzahl der Cluster, die während der Indexerstellung mit dem k-means-Algorithmus erstellt werden.</li>
</ul>
<p>Weitere Informationen zu den für den Index <code translate="no">IVF_SQ8</code> verfügbaren Erstellungsparametern finden Sie unter <a href="/docs/de/ivf-sq8.md#share-BwprdWFCjoMBtMxorO0cWrUPnjb">Indexerstellungsparameter</a>.</p></li>
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
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">8</span>, <span class="hljs-comment"># Number of clusters to search for candidates</span>
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
<li><code translate="no">nprobe</code>: Anzahl der Cluster, in denen nach Kandidaten gesucht werden soll.</li>
</ul>
<p>Weitere Suchparameter, die für den Index <code translate="no">IVF_SQ8</code> verfügbar sind, finden Sie unter <a href="/docs/de/ivf-sq8.md#share-PJhqdqNaNodKiexm6F1cD2IInbe">Indexspezifische Suchparameter</a>.</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">Indexaufbau-Parameter</h3><p>In der folgenden Tabelle sind die Parameter aufgeführt, die in <code translate="no">params</code> beim <a href="/docs/de/ivf-sq8.md#share-X9Y9dTuhDohRRBxSvzBcXmIEnu4">Aufbau eines Index</a> konfiguriert werden können.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wertebereich</p></th>
     <th><p>Tuning-Vorschlag</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>Die Anzahl der Cluster, die mit dem k-means-Algorithmus während der Indexerstellung erstellt werden.</p></td>
     <td><p><strong>Typ</strong>: Integer <strong>Bereich</strong>: [1, 65536]</p>
<p><strong>Standardwert</strong>: <code translate="no">128</code></p></td>
     <td><p>Größere <code translate="no">nlist</code> Werte verbessern die Wiederauffindbarkeit durch die Erstellung von feineren Clustern, erhöhen aber die Indexerstellungszeit. Optimieren Sie den Wert je nach Größe des Datensatzes und der verfügbaren Ressourcen. In den meisten Fällen wird empfohlen, einen Wert innerhalb dieses Bereichs festzulegen: [32, 4096].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Indexspezifische Suchparameter</h3><p>In der folgenden Tabelle sind die Parameter aufgeführt, die in <code translate="no">search_params.params</code> für die <a href="/docs/de/ivf-sq8.md#share-TI73dmWBOoEnocxQ8H7clSYUnLg">Suche im Index</a> konfiguriert werden können.</p>
<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Wertebereich</p></th>
     <th><p>Tuning-Vorschlag</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>Die Anzahl der Cluster, in denen nach Kandidaten gesucht wird.</p></td>
     <td><p><strong>Typ</strong>: Integer <strong>Bereich</strong>: [1, <em>nlist</em>]</p>
<p><strong>Standardwert</strong>: <code translate="no">8</code></p></td>
     <td><p>Höhere Werte ermöglichen die Suche nach mehr Clustern, was die Wiederauffindbarkeit durch die Erweiterung des Suchbereichs verbessert, jedoch auf Kosten einer erhöhten Abfragelatenz. Setzen Sie <code translate="no">nprobe</code> proportional zu <code translate="no">nlist</code>, um ein Gleichgewicht zwischen Geschwindigkeit und Genauigkeit herzustellen.</p>
<p>In den meisten Fällen wird empfohlen, einen Wert innerhalb dieses Bereichs festzulegen: [1, nlist].</p></td>
   </tr>
</table>
