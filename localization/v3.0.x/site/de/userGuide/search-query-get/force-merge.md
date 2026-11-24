---
id: force-merge.md
title: ZwangskompaktierungCompatible with Milvus 3.0.x
summary: >-
  Verwenden Sie die „Force Merge“-Komprimierung, um kleine Segmente
  zusammenzufassen und so die Abfrageleistung sowie die Speichereffizienz zu
  verbessern.
beta: Milvus 3.0.x
---
<h1 id="Force-Merge-Compaction" class="common-anchor-header">Zwangskompaktierung<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>Die erzwungene Zusammenführung dient dazu, kleine und fragmentierte Segmente zu einer geringeren Anzahl größerer Segmente zusammenzufassen, um die Abfrageleistung und die Speichereffizienz zu verbessern. In diesem Leitfaden wird erläutert, wie Sie die erzwungene Zusammenführung nutzen können.</p>
<div class="alert note">
<p>Diese Funktion befindet sich in der öffentlichen Vorschau. Verwenden Sie sie nicht in Produktionsumgebungen.</p>
</div>
<h2 id="Overview" class="common-anchor-header">Übersicht<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md">Die Standardkomprimierung</a> hält die Segmentgrößen durch „Many-to-One“-Zusammenführungen nahe am konfigurierten „ <code translate="no">maxSize</code> “, kann jedoch dennoch mittelgroße Fragmente hinterlassen, die nicht weiter zusammengeführt werden können, ohne die Grenzwerte zu überschreiten. Wie unten dargestellt, würde beispielsweise bei einer Sammlung mit fünf 2-MB-Segmenten und einem „ <code translate="no">maxSize</code> “ von 3 MB die Zusammenführung beliebiger zweier Segmente die Grenze überschreiten, sodass die Standardkomprimierung die Segmentanzahl nicht weiter reduzieren kann und die fragmentierte Struktur bestehen bleibt.</p>
<p>Die erzwungene Zusammenführung fügt den Parameter „ <code translate="no">target_size</code> “ hinzu und unterstützt, sofern möglich, die Neuordnung von Segmenten auf die gewünschte Größe innerhalb einer engen Toleranz. Wie unten dargestellt: Wenn der angegebene „ <code translate="no">target_size</code> “ 4 MB beträgt, können die fünf kleinen 2-MB-Segmente weiter zu weniger, größeren Segmenten zusammengeführt werden. Dies reduziert die Anzahl überzähliger Segmente, unterstützt Zielgrößen, die größer sind als die Standardeinstellungen unter „ <code translate="no">maxSize</code> “, und ermöglicht es dem System bei sehr großen Zielgrößen, eine praktikable Ausgabegröße und Segmentanzahl für die aktuelle Hardware und die QueryNode-Topologie zu wählen.</p>
<p>Informationen dazu, welche Komprimierungsmethode verwendet werden sollte, finden Sie in <a href="#faq">den FAQ</a>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/compaction.png" alt="R8eow3kaqhktokblcmocnvxmnee" class="doc-image" id="r8eow3kaqhktokblcmocnvxmnee" /> 
   <span>R8eow3kaqhktokblcmocnvxmnee</span>
  
 </span></p>
<p>Die „Force merge“-Kompaktierung erweitert die bestehende <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md"><code translate="no">Compaction</code></a> API um den Parameter „ <code translate="no">target_size</code> “. Sie ist vollständig abwärtskompatibel: Bestehende Komprimierungsaufrufe ohne „ <code translate="no">target_size</code> “ funktionieren weiterhin wie bisher.</p>
<p>Die erzwungene Zusammenführung läuft asynchron ab. Sie blockiert keine Such- oder Abfragevorgänge, beansprucht jedoch während der Ausführung E/A- und Speicherressourcen.</p>
<h2 id="Use-Force-Merge-Compaction" class="common-anchor-header">Verwendung der „Force Merge“-Komprimierung<button data-href="#Use-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prerequisites" class="common-anchor-header">Voraussetzungen<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p>Milvus Version 3.0 oder höher</p></li>
<li><p>PyMilvus 3.0 oder höher</p></li>
</ul>
<h3 id="Global-Configuration" class="common-anchor-header">Globale Konfiguration<button data-href="#Global-Configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>Die folgenden Konfigurationsparameter steuern das Verhalten von „Force Merge“. Legen Sie diese in der Milvus-Konfigurationsdatei oder über Umgebungsvariablen fest.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">segment:</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">512</span>         <span class="hljs-comment"># Default segment max size (MB).</span>
                         <span class="hljs-comment"># Used when target_size is 0 or omitted.</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">maxFullSegmentThreshold:</span> <span class="hljs-number">100</span>
                         <span class="hljs-comment"># When segment count exceeds this threshold,</span>
                         <span class="hljs-comment"># a faster greedy algorithm is used instead</span>
                         <span class="hljs-comment"># of the standard merge algorithm.</span>
    <span class="hljs-attr">forceMerge:</span>
      <span class="hljs-attr">datanodeMemoryFactor:</span> <span class="hljs-number">4.0</span>
                         <span class="hljs-comment"># DataNode memory divided by this factor</span>
                         <span class="hljs-comment"># determines the the largest segment</span>
                         <span class="hljs-comment"># size the system can allow.</span>
      <span class="hljs-attr">querynodeMemoryFactor:</span> <span class="hljs-number">4.0</span>
                         <span class="hljs-comment"># Minimum QueryNode memory divided by this</span>
                         <span class="hljs-comment"># factor. Used in automatic size calculation</span>
                         <span class="hljs-comment"># to ensure merged segments can be loaded.</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Standardwert</p></th>
     <th><p>Beschreibung</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.segment.maxSize</code></p></td>
     <td><p>1024</p></td>
     <td><p>Standardmäßige maximale Segmentgröße in MB. Wird als Zielwert verwendet, wenn „ <code translate="no">target_size</code> “ den Wert 0 hat oder weggelassen wird. Dient außerdem als minimal zulässiger Wert für die explizite Angabe von „ <code translate="no">target_size</code> “.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code></p></td>
     <td><p>100</p></td>
     <td><p>Schwellenwert für die Segmentanzahl bei der Algorithmusauswahl. Wenn die Anzahl der Segmente diesen Wert überschreitet, verwendet Milvus einen schnelleren Greedy-Algorithmus für die Zusammenführungsplanung.</p><ul><li><p><strong>Standardalgorithmus</strong> (wird verwendet, wenn die Segmentanzahl &lt;= „ <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code> “ ist): liefert optimalere Zusammenführungsergebnisse, benötigt jedoch mehr Rechenzeit.</p></li><li><p><strong>Greedy-Algorithmus</strong> (wird verwendet, wenn die Segmentanzahl &gt; <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code> ist): schließt die Planung wesentlich schneller ab, allerdings auf Kosten einer etwas weniger optimalen Segmentgruppierung.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.datanodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>Der DataNode-Speicher wird durch diesen Faktor geteilt, um die größte Segmentgröße zu berechnen, die das System zulassen kann.</p><ul><li><p>Ein größerer Wert weist der Zusammenführung weniger Speicher zu, lässt jedoch mehr für andere DataNode-Operationen übrig, was die  Knotenstabilität verbessert.</p></li><li><p>Ein kleinerer Wert ermöglicht größere Zusammenführungen, erhöht jedoch die Speicherbelastung.</p></li><li><p>Beispielsweise beträgt bei dem Standardfaktor von 4,0 und einem DataNode mit 16 GB Speicher das Zusammenführungsbudget 4 GB. Das bedeutet, dass die Gesamtgröße der Segmente, die in einem einzigen Vorgang zusammengeführt werden, 4 GB nicht überschreiten darf.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.querynodeMemoryFactor</code></p></td>
     <td><p>4,0</p></td>
     <td><p>Der Mindestspeicher des QueryNodes wird durch diesen Faktor geteilt. Wird bei der automatischen Größenberechnung (<code translate="no">target_size=max_int64</code>) verwendet, um sicherzustellen, dass zusammengeführte Segmente von QueryNodes geladen werden können.</p><ul><li><p>Ein größerer Wert führt zu kleineren Segmenten, die von den QueryNodes leichter geladen werden können.</p></li><li><p>Ein kleinerer Wert ermöglicht größere Segmente, kann jedoch bei QueryNodes mit begrenzter Speichergröße zu Ladefehlern führen.</p></li><li><p>Beispiel: Bei einem Standardfaktor von 4,0 und einem kleinsten QueryNode mit 16 GB Arbeitsspeicher wird die automatisch berechnete Zielgröße 4 GB nicht überschreiten. Dadurch wird verhindert, dass „Force Merge“ Segmente erzeugt, die so groß sind, dass QueryNodes sie nicht laden können.</p></li></ul></td>
   </tr>
</table>
<p>Um die oben genannten Änderungen auf Ihren Milvus-Cluster anzuwenden, befolgen Sie bitte die Schritte unter <a href="/docs/de/configure-helm.md#Configure-Milvus-via-configuration-file">„Milvus mit Helm konfigurieren</a> “ und <a href="/docs/de/configure_operator.md">„Milvus mit Milvus-Operatoren konfigurieren</a>“.</p>
<h3 id="Trigger-Force-Merge-Compaction" class="common-anchor-header">„Force Merge“-Komprimierung auslösen<button data-href="#Trigger-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h3><p>Sie lösen die „Force Merge“-Komprimierung aus, indem Sie „ <code translate="no">compact()</code> “ mit dem Parameter „ <code translate="no">target_size</code> “ aufrufen. Einzelheiten zu den Parametern finden Sie unten unter <a href="#parameter-reference">„Parameterreferenz</a> “.</p>
<p>Es stehen drei Modi für die „Force Merge“-Kompaktierung zur Verfügung:</p>
<pre><code translate="no" class="language-plaintext">compact(&quot;my_collection&quot;, target_size=?)
│
├─ Mode 1: target_size = 0 (or omitted)
│  Uses config maxSize (default 1024 MB)
│  Equivalent to standard compaction
│
├─ Mode 2: target_size = 2048
│  Merges segments to ~2 GB each
│  Must be &gt;= config maxSize
│
└─ Mode 3: target_size = max_int64
   Auto-calculates optimal size based on
   segment distribution and node memory
<button class="copy-code-btn"></button></code></pre>
<p>Im Folgenden finden Sie Beispiele zur Verwendung der einzelnen Modi der „Force Merge“-Kompaktierung.</p>
<h4 id="Default-standard-compaction" class="common-anchor-header">Standard (Standard-Kompaktierung)</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Standard compaction — uses config maxSize (default 1024 MB)</span>
job_id = client.compact(<span class="hljs-string">&quot;target_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Explicit-target-size" class="common-anchor-header">Explizite Zielgröße</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Merge segments to approximately 2 GB each</span>
job_id = client.compact(
    <span class="hljs-string">&quot;target_collection&quot;</span>,
    target_size=<span class="hljs-string">&quot;2048&quot;</span>  <span class="hljs-comment"># The unit is MB</span>
)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Automatic-size-calculation" class="common-anchor-header">Automatische Größenberechnung</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Let Milvus determine the optimal segment size</span>
max_int64 = (<span class="hljs-number">1</span> &lt;&lt; <span class="hljs-number">63</span>) - <span class="hljs-number">1</span>
job_id = client.compact(
    <span class="hljs-string">&quot;target_collection&quot;</span>,
    target_size=max_int64
)
<button class="copy-code-btn"></button></code></pre>
<p><a id="parameter-reference"></a></p>
<h4 id="Parameter-reference" class="common-anchor-header">Parameterübersicht</h4><p>In der folgenden Tabelle werden die Parameter erläutert.</p>
<table>
   <tr>
     <th><p><strong>Parameter</strong></p></th>
     <th><p><strong>Typ</strong></p></th>
     <th><p><strong>Beschreibung</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">collection_name</code></p></td>
     <td><p>str</p></td>
     <td><p>Erforderlich. Der Name der zu komprimierenden Sammlung.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">target_size</code></p></td>
     <td><p>int</p></td>
     <td><p>Optional. Die Zielsegmentgröße in MB. Es gibt drei mögliche Werte für diesen Parameter:</p><ul><li><p><strong>0 oder weggelassen</strong>: Verwendet den konfigurierten Wert für „ <code translate="no">dataCoord.segment.maxSize</code> “ (Standard: 1024 MB). Entspricht der Standardkomprimierung.</p></li><li><p><strong>Expliziter Wert</strong>: Führt eine Zusammenführung der Segmente auf ungefähr die angegebene Größe in MB durch (z. B. 2048). Muss größer oder gleich dem konfigurierten „ <code translate="no">dataCoord.segment.maxSize</code> “ sein.</p></li><li><p><strong>max_int64 ((1 &lt;&lt; 63) - 1)</strong>: Berechnet automatisch die optimale Größe basierend auf der aktuellen Segmentverteilung und den verfügbaren Knotenressourcen.</p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>Wenn der angegebene Wert „ <code translate="no">target_size</code> “ kleiner ist als der konfigurierte Wert „ <code translate="no">dataCoord.segment.maxSize</code> “, wird die Anfrage mit einer Fehlermeldung abgelehnt.</p>
</div>
<h3 id="Check-Compaction-Progress" class="common-anchor-header">Fortschritt der Komprimierung überprüfen<button data-href="#Check-Compaction-Progress" class="anchor-icon" translate="no">
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
    </button></h3><p>Die „Force Merge“-Kompaktierung läuft asynchron. Verwenden Sie die zurückgegebene Job-ID, um den Fortschritt zu überprüfen:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Check compaction state</span>
state = client.get_compaction_state(job_id)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;State: <span class="hljs-subst">{state}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Best-practices" class="common-anchor-header">Bewährte Vorgehensweisen<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>Verwenden Sie die „Force Merge“-Kompaktierung nicht in Produktionsumgebungen.</strong></p></li>
<li><p><strong>Verwenden Sie in den meisten Fällen den automatischen Modus zur Größenberechnung.</strong> Wenn Sie „ <code translate="no">target_size</code> “ auf „ <code translate="no">max_int64</code> “ setzen, analysiert Milvus Ihre Segmentverteilung und Knotenressourcen, um die optimale Größe zu ermitteln. Dies ist der empfohlene Ansatz, sofern Sie keine spezifischen Anforderungen an die Größe haben.</p></li>
<li><p><strong>Berücksichtigen Sie die Auswirkungen auf die Leistung.</strong> Die „Force Merge“-Kompaktierung ist ein ressourcenintensiver Vorgang. Dabei werden Segmentdaten gelesen, zusammengeführt und neu geschrieben. Planen Sie den Vorgang in Zeiten mit geringem Datenverkehr ein, um die Auswirkungen auf die Abfragelatenz zu minimieren.</p></li>
<li><p><strong>Überwachen Sie die Segmentanzahl vor und nach der Komprimierung.</strong> Verwenden Sie <code translate="no">get_compaction_state()</code> und <code translate="no">list_persistent_segments</code>, um zu überprüfen, ob die Komprimierung wie erwartet zu weniger, aber größeren Segmenten geführt hat.</p></li>
</ul>
<p><a id="faq"></a></p>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Wie unterscheidet sich die „Force Merge“-Komprimierung von der Standardkomprimierung?</strong></p>
<p>Diese beiden Arten von Komprimierungsvorgängen dienen unterschiedlichen Zwecken.</p>
<ul>
<li><p>Die Standardverdichtung (targetSize=0 oder weggelassen) ist ein inkrementeller Bereinigungspfad nach bestem Bemühen.</p></li>
<li><p>„Force Merge“ (targetSize &gt; 0) ist ein Repack-Vorgang auf Collection-Ebene, der weniger, aber größere Segmente erzeugt, die näher am Zielwert liegen.</p></li>
</ul>
<p>Der wesentliche Unterschied liegt in der Art der Zusammenführung: Bei der Standardkomprimierung erfolgt effektiv eine Reduzierung von m → 1 pro Aufgabe, während beim „Force Merge“ eine Reduzierung von m → n über gruppierte Eingaben hinweg stattfindet. Aus diesem Grund kann „Force Merge“ Segmentanordnungen lösen, die mit der Standardkomprimierung nicht möglich sind. Die folgende Tabelle vergleicht die beiden Arten von Vorgängen.</p>
<table>
   <tr>
     <th><p><strong>Dimension</strong></p></th>
     <th><p><strong>Standardkomprimierung (Standard)</strong></p></th>
     <th><p><strong>Force Merge</strong></p></th>
   </tr>
   <tr>
     <td><p>API-Auslöser</p></td>
     <td><p>targetSize=0 (oder nicht festgelegt), kein Major/L0-Flag</p></td>
     <td><p>targetSize &gt; 0 (MB)</p></td>
   </tr>
   <tr>
     <td><p>Primäres Ziel</p></td>
     <td><p>Inkrementelle Bereinigung offensichtlicher Fragmente; routinemäßige Wartung</p></td>
     <td><p>Kollektionsweite Konsolidierung für Suche und Ausbalancierung</p></td>
   </tr>
   <tr>
     <td><p>Quelle der Segmentgröße</p></td>
     <td><p>Festgelegte Größe von `dataCoord.segment.maxSize` (Serverkonfiguration)</p></td>
     <td><p>Vom Benutzer festgelegte „targetSize“, anschließend durch „maxSafeSize“ sicher begrenzt</p></td>
   </tr>
   <tr>
     <td><p>Gültigkeit der Parameter</p></td>
     <td><p>Keine Anpassung der Größe durch den Benutzer</p></td>
     <td><p>Die vom Benutzer angegebene „targetSize“ muss ≥ „dataCoord.segment.maxSize“ sein; andernfalls wird sie abgelehnt</p></td>
   </tr>
   <tr>
     <td><p>Sicherheitsobergrenze</p></td>
     <td><p>Nur konfigurierbare Obergrenze</p></td>
     <td><p>maxSafeSize = min(QueryNode mem, DataNode mem) / memory_factor (Standalone ohne Pooling: wird zusätzlich halbiert)</p></td>
   </tr>
   <tr>
     <td><p>Zusammenführungsform</p></td>
     <td><p>m → 1 pro Aufgabe, Ausgabe ≤ configMaxSize</p></td>
     <td><p>m → n, Ausgänge nahe targetSize</p></td>
   </tr>
   <tr>
     <td><p>Verhalten bei mittleren Segmenten</p></td>
     <td><p>Kann dauerhaft hängen bleiben (beispielsweise können zwei 60-%-Segmente rechtlich nicht zu einem 120-%-Segment werden)</p></td>
     <td><p>Neuverpacken + Aufteilen funktioniert; kein „Feststecken bei 60 %“-Muster</p></td>
   </tr>
   <tr>
     <td><p>Fähigkeit zur Abflachung der Sammlung</p></td>
     <td><p>Eingeschränkt; wiederholte Durchläufe können dennoch viele mittlere Segmente hinterlassen</p></td>
     <td><p>Stark; darauf ausgelegt, die Segmentanzahl zu reduzieren und den Füllgrad zu erhöhen</p></td>
   </tr>
   <tr>
     <td><p>Topologie-Erkennung</p></td>
     <td><p>Keine</p></td>
     <td><p>Ja; nutzt das Layout von QueryNode, Replik und Shard</p></td>
   </tr>
   <tr>
     <td><p>Optimierung der Parallelität auf dem Lesepfad</p></td>
     <td><p>Keine</p></td>
     <td><p>Passt die Ausgabeanzahl anhand von queryNodeCount / (Replikate × Shards) an, sofern gültig</p></td>
   </tr>
   <tr>
     <td><p>Typischer Anwendungsfall</p></td>
     <td><p>Tägliche Bereinigung bei hoher Fluktuation nach Schreib- und Löschvorgängen</p></td>
     <td><p>Vorbereitung von Benchmarks, Suchoptimierung, Abstimmung der Lastparallelität</p></td>
   </tr>
   <tr>
     <td><p>Erwarteter Umfang</p></td>
     <td><p>Rechnen Sie nicht mit einer vollständigen Neuverpackung der Sammlung</p></td>
     <td><p>Beabsichtigtes Ergebnis: Neupackung auf Collection-Ebene</p></td>
   </tr>
</table>
<p><strong>Auswahlhinweise:</strong></p>
<ul>
<li><p>Wählen Sie die Standardkomprimierung für eine risikoarme, inkrementelle Bereinigung.</p></li>
<li><p>Wählen Sie die erzwungene Zusammenführung, wenn Sie die Sammlung explizit in weniger, größere Segmente umgestalten möchten, die auf das Such- und Ladeverhalten abgestimmt sind.</p></li>
</ul>
<p><strong>Wie unterscheidet sich die erzwungene Zusammenführung von der Clustering-Komprimierung?</strong></p>
<p>Die Clustering-Kompaktierung (<code translate="no">is_clustering=True</code>) reorganisiert Daten innerhalb von Segmenten auf Basis eines Clustering-Schlüssels, um das Such-Pruning zu verbessern. „Force Merge“ (<code translate="no">target_size=N</code>) optimiert die Segmentgrößen, ohne die Datenverteilung zu verändern. Sie dienen unterschiedlichen Zwecken und können zusammen verwendet werden – führen Sie zunächst die Clustering-Kompaktierung durch, um die Daten zu organisieren, und anschließend „Force Merge“, um die resultierenden Segmente zu konsolidieren.</p>
<p><strong>Kann ich „Force Merge“ für eine Sammlung ausführen, die gerade abgefragt wird?</strong></p>
<p>Ja. „Force Merge“ läuft asynchron und blockiert keine Abfragen. Es beansprucht jedoch DataNode- und Festplatten-E/A-Ressourcen, sodass sich die Abfragelatenz während der Komprimierung erhöhen kann. Planen Sie „Force Merge“ für optimale Ergebnisse in Zeiten mit geringem Datenverkehr ein.</p>
<p><strong>Was passiert, wenn ich eine `target_size` festlege, die kleiner als `maxSize` ist?</strong></p>
<p>Die Anfrage wird mit einer Fehlermeldung abgelehnt. Die Zielgröße muss größer oder gleich dem konfigurierten ` <code translate="no">dataCoord.segment.maxSize</code>` sein.</p>
