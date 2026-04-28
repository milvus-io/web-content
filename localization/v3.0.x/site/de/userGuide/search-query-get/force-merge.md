---
id: force-merge.md
title: Force Merge VerdichtungCompatible with Milvus 3.0.x
summary: >-
  Verwenden Sie Force Merge Compaction, um kleine Segmente zu konsolidieren und
  die Abfrageleistung und Speichereffizienz zu verbessern.
beta: Milvus 3.0.x
---
<h1 id="Force-Merge-Compaction" class="common-anchor-header">Force Merge Verdichtung<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>Force Merge wurde entwickelt, um kleine und fragmentierte Segmente in weniger und größere Segmente zu konsolidieren, um die Abfrageleistung und Speichereffizienz zu verbessern. In diesem Leitfaden wird erklärt, wie Sie die Force Merge Compaction verwenden können.</p>
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
    </button></h2><p>Die <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md">Standardverdichtung</a> hält die Segmentgrößen durch die Zusammenführung von mehreren Segmenten in der Nähe der konfigurierten <code translate="no">maxSize</code>, aber es können immer noch mittelgroße Fragmente zurückbleiben, die nicht weiter zusammengeführt werden können, ohne die Grenzen zu überschreiten. Wenn eine Sammlung beispielsweise fünf 2-MB-Segmente hat und <code translate="no">maxSize</code> 3 MB beträgt, würde das Zusammenführen von zwei beliebigen Segmenten den Grenzwert überschreiten, sodass die Standardkompaktierung die Segmentanzahl nicht weiter reduzieren kann und das fragmentierte Layout bestehen bleibt.</p>
<p>Force merge fügt einen <code translate="no">target_size</code> Parameter hinzu und unterstützt die Reorganisation von Segmenten in Richtung der gewünschten Größe innerhalb einer engen Toleranz, wenn möglich. Wenn die angegebene <code translate="no">target_size</code> 4 MB beträgt, können die fünf kleinen 2 MB-Segmente in weniger größere Segmente zusammengeführt werden (siehe unten). Auf diese Weise wird die Anzahl der überzähligen Segmente reduziert, es werden Ziele unterstützt, die größer sind als die Standardeinstellungen von <code translate="no">maxSize</code>, und wenn das Ziel sehr groß ist, kann das System eine praktische Ausgabegröße und Segmentanzahl für die aktuelle Hardware und QueryNode-Topologie wählen.</p>
<p>Um zu verstehen, welche Verdichtungsmethode zu verwenden ist, siehe <a href="#faq">FAQ</a>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v3.0.x/assets/compaction.png" alt="R8eow3kaqhktokblcmocnvxmnee" class="doc-image" id="r8eow3kaqhktokblcmocnvxmnee" />
   </span> <span class="img-wrapper"> <span>R8eow3kaqhktokblcmocnvxmnee</span> </span></p>
<p>Die erzwungene Zusammenführung erweitert die bestehende <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md"><code translate="no">Compaction</code></a> API mit einem <code translate="no">target_size</code> Parameter. Sie ist vollständig abwärtskompatibel: bestehende Verdichtungsaufrufe ohne <code translate="no">target_size</code> funktionieren weiterhin wie bisher.</p>
<p>Force Merge arbeitet asynchron. Sie blockiert keine Such- oder Abfrageoperationen, verbraucht aber während der Ausführung E/A- und Speicherressourcen.</p>
<h2 id="Use-Force-Merge-Compaction" class="common-anchor-header">Force Merge Compaction verwenden<button data-href="#Use-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
<li><p>Milvus Version 2.6.15 oder höher</p></li>
<li><p>pymilvus 2.6.13 oder höher</p></li>
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
    </button></h3><p>Die folgenden Konfigurationsparameter steuern das Verhalten von Force Merge. Setzen Sie sie in der Milvus-Konfigurationsdatei oder über Umgebungsvariablen.</p>
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
     <td><p>512</p></td>
     <td><p>Voreingestellte maximale Segmentgröße in MB. Wird als Ziel verwendet, wenn <code translate="no">target_size</code> 0 ist oder weggelassen wird. Dient auch als zulässiger Mindestwert für explizite <code translate="no">target_size</code>.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code></p></td>
     <td><p>100</p></td>
     <td><p>Schwellenwert der Segmentanzahl für die Auswahl des Algorithmus. Wenn die Anzahl der Segmente diesen Wert überschreitet, verwendet Milvus einen schnelleren Greedy-Algorithmus für die Zusammenführungsplanung.</p><ul><li><p><strong>Standardalgorithmus</strong> (wird verwendet, wenn die Anzahl der Segmente &lt;= <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>): führt zu optimaleren Zusammenführungsergebnissen, benötigt aber mehr Zeit für die Berechnung.</p></li><li><p><strong>Greedy-Algorithmus</strong> (wird verwendet, wenn die Anzahl der Abschnitte &gt; <code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code>): schließt die Planung viel schneller ab, allerdings auf Kosten einer etwas weniger optimalen Gruppierung der Abschnitte.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.datanodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>Der Datenknotenspeicher wird durch diesen Faktor geteilt, um die größte Segmentgröße zu berechnen, die das System zulässt.</p><ul><li><p>Ein größerer Wert weist der Zusammenführung weniger Speicher zu, lässt aber mehr für andere DataNode-Operationen übrig, was die Knotenstabilität verbessert.</p></li><li><p>Ein kleinerer Wert ermöglicht größere Zusammenführungen, erhöht aber den Speicherdruck.</p></li><li><p>Bei einem Standardfaktor von 4,0 und einem DataNode mit 16 GB Speicher beträgt das Zusammenführungsbudget beispielsweise 4 GB. Das bedeutet, dass die Gesamtgröße der Segmente, die in einem einzigen Vorgang zusammengeführt werden, 4 GB nicht überschreiten darf.</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.querynodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>Der minimale QueryNode-Speicher wird durch diesen Faktor geteilt. Wird bei der automatischen Größenberechnung (<code translate="no">target_size=max_int64</code>) verwendet, um sicherzustellen, dass zusammengeführte Segmente von QueryNodes geladen werden können.</p><ul><li><p>Ein größerer Wert führt zu kleineren Segmenten, die für QueryNodes leichter zu laden sind.</p></li><li><p>Ein kleinerer Wert ermöglicht größere Segmente, kann aber bei QueryNodes mit begrenztem Speicherplatz zu Ladefehlern führen.</p></li><li><p>Bei einem Standardfaktor von 4,0 und einem kleinsten QueryNode mit 16 GB Arbeitsspeicher wird die automatisch berechnete Zielgröße beispielsweise 4 GB nicht überschreiten. Dadurch wird verhindert, dass Force Merge so große Segmente erzeugt, dass QueryNodes sie nicht laden können.</p></li></ul></td>
   </tr>
</table>
<p>Um die oben genannten Änderungen auf Ihren Milvus-Cluster anzuwenden, folgen Sie bitte den Schritten in <a href="/docs/de/configure-helm.md#Configure-Milvus-via-configuration-file">Konfigurieren von Milvus mit Helm</a> und <a href="/docs/de/configure_operator.md">Konfigurieren von Milvus mit Milvus Operators</a>.</p>
<h3 id="Trigger-Force-Merge-Compaction" class="common-anchor-header">Force Merge-Verdichtung auslösen<button data-href="#Trigger-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h3><p>Sie lösen Force Merge Compaction aus, indem Sie <code translate="no">compact()</code> mit dem Parameter <code translate="no">target_size</code> aufrufen. Einzelheiten zu den Parametern finden Sie unter <a href="#parameter-reference">Parameterreferenz</a> weiter unten.</p>
<p>Es stehen drei Modi für die Force Merge Compaction zur Verfügung:</p>
<pre><code translate="no" class="language-plaintext">compact(&quot;my_collection&quot;, target_size=?)
│
├─ Mode 1: target_size = 0 (or omitted)
│  Uses config maxSize (default 512 MB)
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
<p>Im Folgenden finden Sie Beispiele für die Verwendung der einzelnen Verdichtungsmodi.</p>
<h4 id="Default-standard-compaction" class="common-anchor-header">Standard (Standardverdichtung)</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Standard compaction — uses config maxSize (default 512 MB)</span>
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
<h4 id="Parameter-reference" class="common-anchor-header">Parameter-Referenz</h4><p>In der folgenden Tabelle werden die Parameter erläutert.</p>
<table>
   <tr>
     <th><p><strong>Parameter</strong></p></th>
     <th><p><strong>Typ</strong></p></th>
     <th><p><strong>Beschreibung</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">collection_name</code></p></td>
     <td><p>str</p></td>
     <td><p>Erforderlich. Der Name der zu verdichtenden Sammlung.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">target_size</code></p></td>
     <td><p>int</p></td>
     <td><p>Optional. Die Zielsegmentgröße in MB. Es gibt 3 Optionen für den Parameterwert:</p><ul><li><p><strong>0 oder weggelassen</strong>: Verwendet die konfigurierte <code translate="no">dataCoord.segment.maxSize</code> (Standard: 512 MB). Entspricht der Standardkompaktierung.</p></li><li><p><strong>Expliziter Wert</strong>: Führt Segmente zu ungefähr der angegebenen Größe in MB zusammen (z. B. 2048). Muss größer oder gleich der konfigurierten <code translate="no">dataCoord.segment.maxSize</code> sein.</p></li><li><p><strong>max_int64 ((1 &lt;&lt; 63) - 1)</strong>: Berechnet automatisch die optimale Größe auf der Grundlage der aktuellen Segmentverteilung und der verfügbaren Knotenressourcen.</p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>Wenn die angegebene <code translate="no">target_size</code> kleiner als die konfigurierte <code translate="no">dataCoord.segment.maxSize</code> ist, wird die Anfrage mit einem Fehler zurückgewiesen.</p>
</div>
<h3 id="Check-Compaction-Progress" class="common-anchor-header">Überprüfung des Verdichtungsfortschritts<button data-href="#Check-Compaction-Progress" class="anchor-icon" translate="no">
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
    </button></h3><p>Die Force Merge-Verdichtung läuft asynchron. Verwenden Sie die zurückgegebene Job-ID, um den Fortschritt zu überprüfen:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Check compaction state</span>
state = client.get_compaction_state(job_id)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;State: <span class="hljs-subst">{state}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Best-practices" class="common-anchor-header">Bewährte Verfahren<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>Verwenden Sie Force Merge Compaction nicht in Produktionsumgebungen.</strong></p></li>
<li><p><strong>Verwenden Sie in den meisten Fällen den automatischen Größenberechnungsmodus.</strong> Wenn Sie <code translate="no">target_size</code> auf <code translate="no">max_int64</code> setzen, kann Milvus Ihre Segmentverteilung und Knotenressourcen analysieren, um die beste Größe zu bestimmen. Dies ist der empfohlene Ansatz, es sei denn, Sie haben spezielle Anforderungen an die Größe.</p></li>
<li><p><strong>Berücksichtigen Sie den Kompromiss bei der Leistung.</strong> Force Merge Verdichtung ist ein ressourcenintensiver Vorgang. Es werden Segmentdaten gelesen, zusammengeführt und neu geschrieben. Planen Sie ihn in Zeiten mit geringem Datenverkehr, um die Auswirkungen auf die Abfragelatenz zu minimieren.</p></li>
<li><p><strong>Überwachen Sie die Segmentanzahl vorher und nachher.</strong> Verwenden Sie <code translate="no">get_compaction_state()</code> und <code translate="no">list_persistent_segments</code>, um zu überprüfen, ob die Verdichtung wie erwartet weniger und größere Segmente erzeugt hat.</p></li>
</ul>
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
    </button></h2><p><strong>Wie unterscheidet sich Force Merge von der Standardverdichtung?</strong></p>
<p>Diese beiden Arten von Verdichtungsoperationen dienen unterschiedlichen Zwecken.</p>
<ul>
<li><p>Bei der Standardverdichtung (targetSize=0 oder weggelassen) handelt es sich um einen inkrementellen Bereinigungspfad nach bestem Wissen und Gewissen.</p></li>
<li><p>Zusammenführen erzwingen (targetSize&gt;0) ist ein Umpackungspfad auf Sammlungsebene, um weniger, größere, zielnahe Segmente zu erzeugen.</p></li>
</ul>
<p>Der Hauptunterschied ist die Form der Zusammenführung: Die Standardverdichtung ist effektiv m → 1 pro Aufgabe, während die erzwungene Zusammenführung m → n über gruppierte Eingaben ist. Aus diesem Grund kann die erzwungene Zusammenführung Segment-Layouts lösen, die mit der Standardverdichtung nicht möglich sind. In der folgenden Tabelle werden die beiden Arten von Operationen miteinander verglichen.</p>
<table>
   <tr>
     <th><p><strong>Dimension</strong></p></th>
     <th><p><strong>Standardverdichtung (Standard)</strong></p></th>
     <th><p><strong>Zusammenführen erzwingen</strong></p></th>
   </tr>
   <tr>
     <td><p>API-Auslöser</p></td>
     <td><p>targetSize=0 (oder nicht gesetzt), kein Major/L0-Flag</p></td>
     <td><p>targetSize&gt;0 (MB)</p></td>
   </tr>
   <tr>
     <td><p>Primäres Ziel</p></td>
     <td><p>Inkrementelle Bereinigung von offensichtlichen Fragmenten; Routinewartung</p></td>
     <td><p>Sammlungsweite Konsolidierung für Suche und Abgleich</p></td>
   </tr>
   <tr>
     <td><p>Quelle der Segmentgröße</p></td>
     <td><p>Feste dataCoord.segment.maxSize (Serverkonfiguration)</p></td>
     <td><p>Benutzer targetSize, dann durch maxSafeSize sicherheitsbegrenzt</p></td>
   </tr>
   <tr>
     <td><p>Gültigkeit der Parameter</p></td>
     <td><p>Keine Einstellung der Benutzergröße</p></td>
     <td><p>Benutzer targetSize muss &gt;= dataCoord.segment.maxSize sein; sonst abgelehnt</p></td>
   </tr>
   <tr>
     <td><p>Obere Sicherheitsgrenze</p></td>
     <td><p>Nur Config Cap</p></td>
     <td><p>maxSafeSize = min(QueryNode mem, DataNode mem) / memory_factor (standalone non-pooling: weiter halbiert)</p></td>
   </tr>
   <tr>
     <td><p>Merge-Form</p></td>
     <td><p>m → 1 pro Task, Ausgabe &lt;= configMaxSize</p></td>
     <td><p>m → n, Ausgaben nahe targetSize</p></td>
   </tr>
   <tr>
     <td><p>Mittel-Segment-Verhalten</p></td>
     <td><p>Kann dauerhaft stecken bleiben (z. B. können zwei 60%-Segmente nicht legal zu einem 120%-Segment werden)</p></td>
     <td><p>Umpacken + Aufteilen funktioniert; kein "Steckenbleiben bei 60 %"-Muster</p></td>
   </tr>
   <tr>
     <td><p>Fähigkeit zur Abflachung der Sammlung</p></td>
     <td><p>Begrenzt; wiederholte Durchläufe können immer noch viele mittlere Segmente hinterlassen</p></td>
     <td><p>Stark; entwickelt, um die Anzahl der Segmente zu verringern und die Fülle zu erhöhen</p></td>
   </tr>
   <tr>
     <td><p>Topologie-Bewusstsein</p></td>
     <td><p>Keine</p></td>
     <td><p>Ja; verwendet QueryNode/Replica/Shard-Layout</p></td>
   </tr>
   <tr>
     <td><p>Abstimmung der Lesepfad-Parallelität</p></td>
     <td><p>Keine</p></td>
     <td><p>Passt die Anzahl der Ausgaben mit queryNodeCount / (Replikate × Shards) an, wenn gültig</p></td>
   </tr>
   <tr>
     <td><p>Typischer Anwendungsfall</p></td>
     <td><p>Tägliche Aufräumarbeiten mit hohem Aufwand nach Schreibvorgängen/Löschvorgängen</p></td>
     <td><p>Benchmark-Vorbereitung, Suchoptimierung, Anpassung der Lastparallelität</p></td>
   </tr>
   <tr>
     <td><p>Umfangserwartung</p></td>
     <td><p>Erwartet keine vollständige Neupackung der Sammlung</p></td>
     <td><p>Vorgesehen für Repack-Ergebnisse auf Sammlungsebene</p></td>
   </tr>
</table>
<p><strong>Anleitung zur Auswahl:</strong></p>
<ul>
<li><p>Wählen Sie die Standardkompaktierung für risikoarme, inkrementelle Bereinigungen.</p></li>
<li><p>Wählen Sie Force Merge, wenn Sie die Sammlung explizit in weniger, größere Segmente umgestalten möchten, die dem Such- und Ladeverhalten entsprechen.</p></li>
</ul>
<p><strong>Was ist der Unterschied zwischen Force Merge und Clustering Compaction?</strong></p>
<p><a href="/docs/de/clustering-compaction.md">Clustering Compaction</a> (<code translate="no">is_clustering=True</code>) reorganisiert Daten innerhalb von Segmenten auf der Grundlage eines Clustering-Schlüssels, um die Suche zu verbessern. Force Merge (<code translate="no">target_size=N</code>) optimiert die Segmentgrößen, ohne die Datenverteilung zu verändern. Sie dienen unterschiedlichen Zwecken und können zusammen verwendet werden: Führen Sie zuerst die Clustering-Compaction aus, um die Daten zu organisieren, und dann Force Merge, um die resultierenden Segmente zu konsolidieren.</p>
<p><strong>Kann ich Force Merge für eine Sammlung ausführen, die gerade abgefragt wird?</strong></p>
<p>Ja. Force Merge wird asynchron ausgeführt und blockiert keine Abfragen. Es verbraucht jedoch DataNode- und Festplatten-E/A-Ressourcen, so dass sich die Abfragelatenz während der Verdichtung erhöhen kann. Planen Sie Force Merge in Zeiten mit geringem Datenverkehr, um optimale Ergebnisse zu erzielen.</p>
<p><strong>Was passiert, wenn ich eine target_size kleiner als maxSize einstelle?</strong></p>
<p>Die Anfrage wird mit einer Fehlermeldung zurückgewiesen. Die Zielgröße muss größer als oder gleich der konfigurierten <code translate="no">dataCoord.segment.maxSize</code> sein.</p>
