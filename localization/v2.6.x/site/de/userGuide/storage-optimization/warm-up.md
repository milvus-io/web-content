---
id: warm-up.md
title: AufwärmenCompatible with Milvus 2.6.4+
summary: >-
  In Milvus ergänzt Warm Up den Tiered Storage, indem es die First-Hit-Latenz
  verringert, die auftritt, wenn zum ersten Mal auf kalte Daten zugegriffen
  wird. Einmal konfiguriert, lädt Warm Up ausgewählte Felder oder Indizes in den
  Cache vor, bevor ein Segment abfragbar wird, um sicherzustellen, dass Daten,
  auf die häufig zugegriffen wird, sofort nach dem Laden verfügbar sind.
beta: Milvus 2.6.4+
---
<h1 id="Warm-Up" class="common-anchor-header">Aufwärmen<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Warm-Up" class="anchor-icon" translate="no">
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
    </button></h1><p>In Milvus ergänzt <strong>Warm Up</strong> den Tiered Storage, indem es die First-Hit-Latenz verringert, die auftritt, wenn zum ersten Mal auf kalte Daten zugegriffen wird. Einmal konfiguriert, lädt Warm Up ausgewählte Felder oder Indizes in den Cache vor, bevor ein Segment abfragbar wird, um sicherzustellen, dass Daten, auf die häufig zugegriffen wird, sofort nach dem Laden verfügbar sind.</p>
<h2 id="Why-warm-up" class="common-anchor-header">Warum Warm Up<button data-href="#Why-warm-up" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="/docs/de/tiered-storage-overview.md#Phase-1-Lazy-load">Lazy Load</a> in Tiered Storage verbessert die Effizienz, indem zunächst nur Metadaten geladen werden. Dies kann jedoch bei der ersten Abfrage von kalten Daten zu Latenzzeiten führen, da die erforderlichen Chunks oder Indizes aus dem Objektspeicher geholt werden müssen.</p>
<p><strong>Warm Up</strong> löst dieses Problem durch proaktives Zwischenspeichern kritischer Daten während der Segmentinitialisierung.</p>
<p>Dies ist besonders vorteilhaft, wenn:</p>
<ul>
<li><p>Bestimmte skalare Indizes werden häufig in Filterbedingungen verwendet.</p></li>
<li><p>Vektorindizes sind für die Suchleistung wichtig und müssen sofort verfügbar sein.</p></li>
<li><p>Die Kaltstart-Latenzzeit nach einem QueryNode-Neustart oder dem Laden eines neuen Segments ist inakzeptabel.</p></li>
</ul>
<p>Im Gegensatz dazu wird Warm Up <strong>nicht</strong> für Felder oder Indizes <strong>empfohlen</strong>, die nur selten abgefragt werden. Die Deaktivierung von Warm Up verkürzt die Segmentladezeit und spart Cache-Speicherplatz - ideal für große Vektorfelder oder unkritische skalare Felder.</p>
<h2 id="Configuration" class="common-anchor-header">Konfiguration<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Warm Up wird unter <code translate="no">queryNode.segcore.tieredStorage.warmup</code> in <code translate="no">milvus.yaml</code> gesteuert. Sie können es separat für skalare Felder, skalare Indizes, Vektorfelder und Vektorindizes konfigurieren. Jedes Ziel unterstützt zwei Modi:</p>
<table>
   <tr>
     <th><p>Modus</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Typisches Szenario</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code> (Standard)</p></td>
     <td><p>Vorladen, bevor das Segment abfragbar wird. Die Ladezeit erhöht sich leicht, aber die erste Abfrage verursacht keine Latenz.</p></td>
     <td><p>Verwenden Sie diese Option für leistungskritische Daten, die sofort verfügbar sein müssen, wie z. B. skalare Indizes mit hoher Frequenz oder Schlüsselvektorindizes, die bei der Suche verwendet werden.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p>Vorladen überspringen. Das Segment wird schneller abfragbar, aber die erste Abfrage kann ein bedarfsgesteuertes Laden auslösen.</p></td>
     <td><p>Geeignet für seltene Zugriffe oder große Daten wie rohe Vektorfelder oder unkritische skalare Felder.</p></td>
   </tr>
</table>
<p><strong>Beispiel YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># options: sync, disable.</span>
        <span class="hljs-comment"># Specifies the timing for warming up the Tiered Storage cache.</span>
        <span class="hljs-comment"># - &quot;sync&quot;: data will be loaded into the cache before a segment is considered loaded.</span>
        <span class="hljs-comment"># - &quot;disable&quot;: data will not be proactively loaded into the cache, and loaded only if needed by search/query tasks.</span>
        <span class="hljs-comment"># Defaults to &quot;sync&quot;, except for vector field which defaults to &quot;disable&quot;.</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span> <span class="hljs-comment"># cache warmup for vector field raw data is by default disabled.</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Werte</p></th>
     <th><p>Beschreibung</p></th>
     <th><p>Empfohlener Anwendungsfall</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">scalarField</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Steuert, ob skalare Felddaten vorgeladen werden.</p></td>
     <td><p>Verwenden Sie <code translate="no">sync</code> nur, wenn skalare Felder klein sind und in Filtern häufig aufgerufen werden. Ansonsten <code translate="no">disable</code>, um die Ladezeit zu verkürzen.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">scalarIndex</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Steuert, ob skalare Indizes vorgeladen werden.</p></td>
     <td><p>Verwenden Sie <code translate="no">sync</code> für skalare Indizes, die in häufigen Filterbedingungen oder Bereichsabfragen verwendet werden.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectorField</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Legt fest, ob Vektorfelddaten vorgeladen werden.</p></td>
     <td><p>Im Allgemeinen <code translate="no">disable</code>, um eine starke Nutzung des Cache zu vermeiden. Aktivieren Sie <code translate="no">sync</code> nur, wenn Rohvektoren unmittelbar nach der Suche abgerufen werden müssen (z. B. Ähnlichkeitsergebnisse mit Vektorabruf).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectorIndex</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Steuert, ob Vektorindizes vorgeladen werden.</p></td>
     <td><p>Verwenden Sie <code translate="no">sync</code> für Vektorindizes, die für die Suchlatenz entscheidend sind. Bei Batch- oder Niedrigfrequenz-Workloads: <code translate="no">disable</code> für schnellere Segmentbereitschaft.</p></td>
   </tr>
</table>
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
    </button></h2><p>Warm Up wirkt sich nur auf die anfängliche Last aus. Wenn zwischengespeicherte Daten später entfernt werden, werden sie bei der nächsten Abfrage bei Bedarf neu geladen.</p>
<ul>
<li><p>Vermeiden Sie die übermäßige Verwendung von <code translate="no">sync</code>. Das Vorladen zu vieler Felder erhöht die Ladezeit und den Druck auf den Cache.</p></li>
<li><p>Beginnen Sie konservativ - aktivieren Sie Warm Up nur für Felder und Indizes, auf die häufig zugegriffen wird.</p></li>
<li><p>Überwachen Sie die Abfragelatenz und die Cache-Metriken und erweitern Sie das Preloading dann nach Bedarf.</p></li>
<li><p>Wenden Sie bei gemischten Arbeitslasten <code translate="no">sync</code> auf leistungsempfindliche Sammlungen und <code translate="no">disable</code> auf kapazitätsorientierte Sammlungen an.</p></li>
</ul>
