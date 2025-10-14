---
id: tiered-storage-overview.md
title: Überblick über Tiered StorageCompatible with Milvus 2.6.4+
summary: >-
  In Milvus erfordert der traditionelle Full-Load-Modus, dass jeder QueryNode
  bei der Initialisierung alle Schemafelder und Indizes eines Segments lädt,
  auch Daten, auf die möglicherweise nie zugegriffen wird. Dies gewährleistet
  die sofortige Datenverfügbarkeit, führt jedoch häufig zu einer Verschwendung
  von Ressourcen, einschließlich hoher Speichernutzung, starker
  Festplattenaktivität und erheblichem E/A-Overhead, insbesondere bei der
  Verarbeitung großer Datensätze.
beta: Milvus 2.6.4+
---
<h1 id="Tiered-Storage-Overview" class="common-anchor-header">Überblick über Tiered Storage<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Tiered-Storage-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>In Milvus erfordert der traditionelle <strong>Full-Load-Modus</strong>, dass jeder QueryNode alle Schemafelder und Indizes eines <a href="https://zilliverse.feishu.cn/wiki/IBX3w5p4Tipy1KkNxI6cbEOwnGf">Segments</a> bei der Initialisierung lädt, auch Daten, auf die möglicherweise nie zugegriffen wird. Dies gewährleistet die sofortige Datenverfügbarkeit, führt jedoch häufig zu einer Verschwendung von Ressourcen, einschließlich hoher Speicherauslastung, starker Festplattenaktivität und erheblichem E/A-Overhead, insbesondere bei der Verarbeitung großer Datensätze.</p>
<p><strong>Tiered Storage</strong> löst dieses Problem durch die Entkopplung des Daten-Cachings vom Laden der Segmente. Anstatt alle Daten auf einmal zu laden, führt Milvus eine Caching-Schicht ein, die zwischen heißen Daten (lokal zwischengespeichert) und kalten Daten (remote gespeichert) unterscheidet. Der QueryNode lädt nun zunächst nur leichtgewichtige Metadaten und holt oder entfernt Daten dynamisch bei Bedarf. Dies verkürzt die Ladezeit erheblich, optimiert die lokale Ressourcennutzung und ermöglicht es QueryNodes, Datensätze zu verarbeiten, die ihre physische Speicher- oder Festplattenkapazität bei weitem übersteigen.</p>
<p>Sie können die Aktivierung von Tiered Storage in folgenden Szenarien in Betracht ziehen:</p>
<ul>
<li><p>Sammlungen, die die verfügbare Speicher- oder NVMe-Kapazität eines einzelnen QueryNodes übersteigen</p></li>
<li><p>Analytische oder Batch-Workloads, bei denen ein schnelleres Laden wichtiger ist als die Latenzzeit bei der ersten Abfrage</p></li>
<li><p>Gemischte Arbeitslasten, die gelegentliche Cache-Misses für weniger häufig abgerufene Daten tolerieren können</p></li>
</ul>
<div class="alert note">
<p>Weitere Einzelheiten zu Segmenten und Chunks finden Sie unter <a href="https://zilliverse.feishu.cn/wiki/IBX3w5p4Tipy1KkNxI6cbEOwnGf">Segment erklärt</a>.</p>
</div>
<h2 id="How-it-works" class="common-anchor-header">Wie funktioniert es?<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Tiered Storage ändert die Art und Weise, wie QueryNode Segmentdaten verwaltet. Anstatt jedes Feld und jeden Index beim Laden zwischenzuspeichern, lädt QueryNode jetzt nur noch <strong>Metadaten</strong> und verwendet eine Zwischenspeicherschicht, um Daten dynamisch abzurufen und zu entfernen.</p>
<div class="alert note">
<p>Zu<strong>den Metadaten</strong> gehören Schema, Indexdefinitionen, Chunk-Maps, Zeilenzahlen und Verweise auf Remote-Objekte. Diese Daten sind klein, werden immer im Cache gespeichert und nie verdrängt.</p>
</div>
<h3 id="Full-load-mode-vs-Tiered-Storage-mode" class="common-anchor-header">Full-Load-Modus vs. Tiered Storage-Modus<button data-href="#Full-load-mode-vs-Tiered-Storage-mode" class="anchor-icon" translate="no">
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
    </button></h3><p>Obwohl die Modi "Full Load" und "Tiered Storage" dieselben Daten verarbeiten, unterscheiden sie sich darin, wann und wie QueryNode diese Komponenten im Cache speichert.</p>
<ul>
<li><p><strong>Volllast-Modus</strong>: Zum Zeitpunkt des Ladens speichert QueryNode die vollständigen Sammlungsdaten, einschließlich Metadaten, Felddaten und Indizes, aus dem Objektspeicher.</p></li>
<li><p><strong>Tiered Storage-Modus</strong>: Zum Zeitpunkt des Ladens speichert QueryNode nur Metadaten im Cache. Felddaten werden bei Bedarf mit Chunk-Granularität abgerufen. Indexdateien bleiben entfernt, bis die erste Abfrage sie benötigt; dann wird der gesamte Index pro Segment abgerufen und zwischengespeichert.</p></li>
</ul>
<p>Das folgende Diagramm zeigt diese Unterschiede.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/full-load-mode-vs-tiered-storage-mode.png" alt="Full Load Mode Vs Tiered Storage Mode" class="doc-image" id="full-load-mode-vs-tiered-storage-mode" />
   </span> <span class="img-wrapper"> <span>Volllastmodus vs. Tiered Storage Modus</span> </span></p>
<h3 id="QueryNode-loading-workflow" class="common-anchor-header">Arbeitsablauf beim Laden von QueryNode<button data-href="#QueryNode-loading-workflow" class="anchor-icon" translate="no">
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
    </button></h3><p>Bei Tiered Storage besteht der Arbeitsablauf aus drei Phasen:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/querynode-loading-workflow.png" alt="Querynode Loading Workflow" class="doc-image" id="querynode-loading-workflow" />
   </span> <span class="img-wrapper"> <span>QueryNode-Lade-Workflow</span> </span></p>
<h4 id="Lazy-load" class="common-anchor-header">Faule Ladung</h4><p>Bei der Initialisierung führt Milvus ein "Lazy Load" durch und speichert nur <strong>Metadaten</strong>, die Schemadefinitionen, Indexinformationen, Chunk-Mappings und Zeilenzahlen enthalten.</p>
<p>In diesem Stadium werden keine Felddaten oder Indexdateien heruntergeladen. Dadurch sind die Sammlungen schnell abfragbar und der Ressourcenverbrauch beim Start wird minimiert.</p>
<p><strong>Vorteile</strong></p>
<ul>
<li><p>Erheblich schnellere Ladezeit der Sammlung</p></li>
<li><p>Minimaler Speicher- und Festplattenbedarf</p></li>
<li><p>Ermöglicht QueryNodes die gleichzeitige Bearbeitung von mehr Segmenten</p></li>
</ul>
<p><strong>Konfiguration</strong></p>
<p>Wird automatisch angewendet, wenn Tiered Storage aktiviert ist. Eine manuelle Einstellung ist nicht erforderlich.</p>
<h4 id="Partial-load" class="common-anchor-header">Teilweise Belastung</h4><p>Wenn eine Abfrage oder ein Suchvorgang beginnt, führt der QueryNode eine Teilladung durch, indem er nur die erforderlichen Feldchunks oder Indizes aus dem Objektspeicher abruft und sie vorübergehend zur Wiederverwendung zwischenspeichert.</p>
<ul>
<li><p><strong>Felder</strong>: Werden bei Bedarf auf der <strong>Chunk-Ebene</strong> geladen</p></li>
<li><p><strong>Indizes:</strong> Werden beim ersten Zugriff auf der <strong>Segmentebene</strong> geladen</p></li>
</ul>
<p><strong>Vorteile</strong></p>
<ul>
<li><p>Reduziert die Belastung von Speicher und Festplatte</p></li>
<li><p>Ermöglicht Milvus die effiziente Abfrage großer Datenmengen</p></li>
<li><p>Gleichgewicht zwischen Abfragelatenz und Ressourceneffizienz</p></li>
</ul>
<p><strong>Konfiguration</strong></p>
<p>Bei aktiviertem Tiered Storage ist Teillast das Standardverhalten. Um die First-Hit-Latenz für kritische Felder oder Indizes zu minimieren, verwenden Sie <strong>Warm Up</strong>, um die Daten vor den Abfragen vorzuladen. Siehe <a href="/docs/de/warm-up.md">Warm Up</a> für Konfigurationsbeispiele.</p>
<h4 id="Eviction" class="common-anchor-header">Verdrängung</h4><p>Um eine gesunde Ressourcennutzung aufrechtzuerhalten, gibt Milvus automatisch ungenutzte Daten im Cache frei, wenn Schwellenwerte erreicht werden.</p>
<p>Die Freigabe folgt einer <a href="https://en.wikipedia.org/wiki/Cache_replacement_policies">LRU-Richtlinie (Least Recently Used)</a> und wird durch konfigurierbare Parameter gesteuert:</p>
<ul>
<li><p><strong>Wasserzeichen:</strong> Definieren Sie Start- und Stopp-Schwellenwerte für die Verdrängung</p></li>
<li><p><strong>Cache-TTL:</strong> Entfernt veraltete Cache-Elemente nach einer bestimmten Dauer</p></li>
<li><p><strong>Überbelegungsquote:</strong> Erlaubt eine vorübergehende Überbelegung, bevor die Räumung beschleunigt wird</p></li>
</ul>
<p><strong>Vorteile</strong></p>
<ul>
<li><p>Hält die Cache-Nutzung bei verschiedenen Arbeitsbelastungen stabil</p></li>
<li><p>Maximiert die Cache-Wiederverwendung und verhindert Abstürze</p></li>
<li><p>Behält die vorhersehbare Leistung über die Zeit bei</p></li>
</ul>
<p><strong>Konfiguration</strong></p>
<p>Aktivieren Sie die Verdrängungsparameter unter <code translate="no">milvus.yaml</code> und stellen Sie sie ein. Ausführliche Informationen zur Konfiguration finden Sie unter <a href="/docs/de/eviction.md">Verdrängung</a>.</p>
<h2 id="Getting-started" class="common-anchor-header">Erste Schritte<button data-href="#Getting-started" class="anchor-icon" translate="no">
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
<li><p>Milvus 2.6.4+</p></li>
<li><p>QueryNodes mit dedizierten Speicher- und Festplattenressourcen</p></li>
<li><p>Objektspeicher-Backend (S3, MinIO, usw.)</p></li>
</ul>
<div class="alert warning">
<p>QueryNode-Ressourcen sollten nicht mit anderen Workloads geteilt werden. Gemeinsam genutzte Ressourcen können dazu führen, dass Tiered Storage die verfügbare Kapazität falsch einschätzt, was zu Abstürzen führt.</p>
</div>
<h3 id="Basic-configuration-template" class="common-anchor-header">Grundlegende Konfigurationsvorlage<button data-href="#Basic-configuration-template" class="anchor-icon" translate="no">
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
    </button></h3><p>Bearbeiten Sie die Milvus-Konfigurationsdatei (<code translate="no">milvus.yaml</code>), um Tiered Storage-Einstellungen zu konfigurieren:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-comment"># Warm Up Configuration</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload scalar field data</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload scalar indexes</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>   <span class="hljs-comment"># Don&#x27;t preload vector field data (large)</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload vector indexes</span>
      
      <span class="hljs-comment"># Eviction Configuration</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      
      <span class="hljs-comment"># Memory Watermarks</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>   <span class="hljs-comment"># Stop evicting at 75%</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.80</span>  <span class="hljs-comment"># Start evicting at 80%</span>
      
      <span class="hljs-comment"># Disk Watermarks  </span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.80</span>
      
      <span class="hljs-comment"># Cache TTL (7 days)</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">604800</span>
      
      <span class="hljs-comment"># Overcommit Ratios</span>
      <span class="hljs-attr">evictableMemoryCacheRatio:</span> <span class="hljs-number">0.3</span>
      <span class="hljs-attr">evictableDiskCacheRatio:</span> <span class="hljs-number">0.3</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Next-steps" class="common-anchor-header">Nächste Schritte<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li><p><strong>Konfigurieren Sie Warm Up</strong> - Optimieren Sie das Vorladen für Ihre Zugriffsmuster. Siehe <a href="/docs/de/warm-up.md">Warm Up</a>.</p></li>
<li><p><strong>Tune Eviction</strong> - Stellen Sie geeignete Wasserzeichen und TTL für Ihre Ressourcenbeschränkungen ein. Siehe <a href="/docs/de/eviction.md">Eviction</a>.</p></li>
<li><p><strong>Leistung überwachen</strong> - Verfolgen Sie Cache-Trefferraten, Auslagerungshäufigkeit und Abfragelatenzmuster.</p></li>
<li><p><strong>Konfiguration iterieren</strong> - Passen Sie die Einstellungen auf der Grundlage der beobachteten Arbeitslastmerkmale an.</p></li>
</ol>
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
    </button></h2><h3 id="Can-I-change-Tiered-Storage-parameters-at-runtime" class="common-anchor-header">Kann ich Tiered Storage-Parameter während der Laufzeit ändern?<button data-href="#Can-I-change-Tiered-Storage-parameters-at-runtime" class="anchor-icon" translate="no">
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
    </button></h3><p>Nein. Alle Parameter müssen vor dem Start von Milvus unter <code translate="no">milvus.yaml</code> eingestellt werden. Änderungen erfordern einen Neustart, um wirksam zu werden.</p>
<h3 id="Does-Tiered-Storage-affect-data-durability" class="common-anchor-header">Beeinflusst Tiered Storage die Haltbarkeit der Daten?<button data-href="#Does-Tiered-Storage-affect-data-durability" class="anchor-icon" translate="no">
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
    </button></h3><p>Nein. Die Datenpersistenz wird nach wie vor durch den entfernten Objektspeicher gewährleistet. Tiered Storage verwaltet nur das Caching auf QueryNodes.</p>
<h3 id="Will-queries-always-be-faster-with-Tiered-Storage" class="common-anchor-header">Werden Abfragen mit Tiered Storage immer schneller sein?<button data-href="#Will-queries-always-be-faster-with-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Nicht unbedingt. Tiered Storage reduziert die Ladezeit und die Ressourcennutzung, aber Abfragen, die auf nicht zwischengespeicherte (kalte) Daten zugreifen, können eine höhere Latenz aufweisen. Für latenzempfindliche Workloads wird der Volllastmodus empfohlen.</p>
<h3 id="Why-does-a-QueryNode-still-run-out-of-resources-even-with-Tiered-Storage-enabled" class="common-anchor-header">Warum gehen einem QueryNode auch bei aktiviertem Tiered Storage die Ressourcen aus?<button data-href="#Why-does-a-QueryNode-still-run-out-of-resources-even-with-Tiered-Storage-enabled" class="anchor-icon" translate="no">
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
    </button></h3><p>Dafür gibt es zwei häufige Ursachen:</p>
<ul>
<li><p>Der QueryNode wurde mit zu wenig Ressourcen konfiguriert. Wasserzeichen sind relativ zu den verfügbaren Ressourcen, so dass eine Unterversorgung eine Fehleinschätzung noch verstärkt.</p></li>
<li><p>QueryNode-Ressourcen werden mit anderen Workloads gemeinsam genutzt, so dass Tiered Storage die tatsächlich verfügbare Kapazität nicht richtig einschätzen kann.</p></li>
</ul>
<h3 id="Why-do-some-queries-fail-under-high-concurrency" class="common-anchor-header">Warum schlagen einige Abfragen bei hoher Gleichzeitigkeit fehl?<button data-href="#Why-do-some-queries-fail-under-high-concurrency" class="anchor-icon" translate="no">
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
    </button></h3><p>Wenn zu viele Abfragen gleichzeitig auf heiße Daten zugreifen, können die Ressourcengrenzen des QueryNode dennoch überschritten werden. Einige Threads können aufgrund von Zeitüberschreitungen bei der Ressourcenreservierung fehlschlagen. Ein erneuter Versuch, nachdem die Last abgenommen hat, oder die Zuweisung weiterer Ressourcen kann dieses Problem beheben.</p>
<h3 id="Why-does-searchquery-latency-increase-after-enabling-Tiered-Storage" class="common-anchor-header">Warum erhöht sich die Such-/Abfrage-Latenzzeit nach der Aktivierung von Tiered Storage?<button data-href="#Why-does-searchquery-latency-increase-after-enabling-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Mögliche Ursachen sind:</p>
<ul>
<li><p>Häufige Abfragen auf kalte Daten, die aus dem Speicher geholt werden müssen.</p></li>
<li><p>Ein zu hohes Overcommit-Verhältnis, das zu häufigen Auslagerungen führt.</p></li>
<li><p>Zu dicht beieinander liegende Wasserzeichen, was zu häufigen synchronen Auslagerungen führt.</p></li>
</ul>
<h3 id="Can-Tiered-Storage-handle-unlimited-data-by-overcommitting-cache" class="common-anchor-header">Kann Tiered Storage unbegrenzte Daten verarbeiten, indem es den Cache überbelegt?<button data-href="#Can-Tiered-Storage-handle-unlimited-data-by-overcommitting-cache" class="anchor-icon" translate="no">
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
    </button></h3><p>Nein. Overcommit-Ratios ermöglichen es QueryNodes, mit mehr Segmenten zu arbeiten, als der physische Speicher zulässt, aber übermäßig hohe Ratios können zu häufigen Auslagerungen, Cache-Thrashing oder Abfragefehlern führen.</p>
