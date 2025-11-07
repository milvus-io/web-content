---
id: tiered-storage-overview.md
title: Tiered Storage ÜberblickCompatible with Milvus 2.6.4+
summary: >-
  In Milvus erfordert der traditionelle Full-Load-Modus, dass jeder QueryNode
  bei der Initialisierung alle Datenfelder und Indizes eines Segments lädt,
  selbst Daten, auf die möglicherweise nie zugegriffen wird. Dies gewährleistet
  die sofortige Datenverfügbarkeit, führt jedoch häufig zu einer Verschwendung
  von Ressourcen, einschließlich hoher Speichernutzung, starker
  Festplattenaktivität und erheblichem E/A-Overhead, insbesondere bei der
  Verarbeitung großer Datensätze.
beta: Milvus 2.6.4+
---
<h1 id="Tiered-Storage-Overview" class="common-anchor-header">Tiered Storage Überblick<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Tiered-Storage-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>In Milvus erfordert der traditionelle <em>Full-Load-Modus</em>, dass jeder QueryNode alle Datenfelder und Indizes eines <a href="/docs/de/glossary.md#Segment">Segments</a> bei der Initialisierung lädt, selbst Daten, auf die möglicherweise nie zugegriffen wird. Dies gewährleistet die sofortige Datenverfügbarkeit, führt jedoch häufig zu einer Verschwendung von Ressourcen, einschließlich hoher Speicherauslastung, starker Festplattenaktivität und erheblichem E/A-Overhead, insbesondere bei der Verarbeitung großer Datensätze.</p>
<p><em>Tiered Storage</em> löst dieses Problem durch die Entkopplung des Daten-Cachings vom Laden der Segmente. Anstatt alle Daten auf einmal zu laden, führt Milvus eine Caching-Schicht ein, die zwischen heißen Daten (lokal zwischengespeichert) und kalten Daten (remote gespeichert) unterscheidet. Der QueryNode lädt nun zunächst nur leichtgewichtige <em>Metadaten</em> und holt bei Bedarf dynamisch Felddaten ab oder verdrängt sie. Dadurch wird die Ladezeit erheblich verkürzt, die lokale Ressourcennutzung optimiert und der QueryNode in die Lage versetzt, Datensätze zu verarbeiten, die seine physische Speicher- oder Festplattenkapazität weit übersteigen.</p>
<p>Erwägen Sie die Aktivierung von Tiered Storage in Szenarien wie:</p>
<ul>
<li><p>Sammlungen, die die verfügbare Speicher- oder NVMe-Kapazität eines einzelnen QueryNodes übersteigen</p></li>
<li><p>Analytische oder Batch-Workloads, bei denen ein schnelleres Laden wichtiger ist als die Latenzzeit bei der ersten Abfrage</p></li>
<li><p>Gemischte Arbeitslasten, die gelegentliche Cache-Misses für weniger häufig abgerufene Daten tolerieren können</p></li>
</ul>
<div class="alert note">
<ul>
<li><p>Zu den<em>Metadaten</em> gehören Schema, Indexdefinitionen, Chunk-Maps, Zeilenzahlen und Verweise auf Remoteobjekte. Diese Art von Daten ist klein, wird immer im Cache gespeichert und nie entfernt.</p></li>
<li><p>Weitere Einzelheiten zu Segmenten und Chunks finden Sie unter <a href="/docs/de/glossary.md#Segment">Segment</a>.</p></li>
</ul>
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
    </button></h2><p>Tiered Storage ändert die Art und Weise, wie QueryNode Segmentdaten verwaltet. Anstatt jedes Feld und jeden Index zum Zeitpunkt des Ladens zwischenzuspeichern, lädt QueryNode jetzt nur noch Metadaten und verwendet eine Zwischenspeicherschicht, um Daten dynamisch abzurufen und zu verdrängen.</p>
<h3 id="Full-load-mode-vs-Tiered-Storage-mode" class="common-anchor-header">Volllastmodus vs. Tiered Storage-Modus<button data-href="#Full-load-mode-vs-Tiered-Storage-mode" class="anchor-icon" translate="no">
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
    </button></h3><p>Die beiden Modi "Volllast" und "Tiered Storage" verarbeiten zwar dieselben Daten, unterscheiden sich aber darin, <em>wann</em> und <em>wie</em> QueryNode diese Komponenten zwischenspeichert.</p>
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
    </button></h3><p>Bei Tiered Storage besteht der Arbeitsablauf aus diesen Phasen:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/querynode-load-workflow.png" alt="Querynode Load Workflow" class="doc-image" id="querynode-load-workflow" />
   </span> <span class="img-wrapper"> <span>QueryNode-Lade-Workflow</span> </span></p>
<h4 id="Phase-1-Lazy-load" class="common-anchor-header">Phase 1: Faule Ladung</h4><p>Bei der Initialisierung führt Milvus ein "Lazy Load" durch, wobei nur Metadaten auf Segmentebene wie Schemadefinitionen, Indexinformationen und Chunk-Mappings zwischengespeichert werden.</p>
<p>In diesem Stadium werden keine tatsächlichen Felddaten oder Indexdateien zwischengespeichert. Dadurch können Sammlungen fast sofort nach dem Start abgefragt werden, während der Speicher- und Festplattenverbrauch minimal bleibt.</p>
<p>Da die Felddaten und Indexdateien bis zum ersten Zugriff im entfernten Speicher verbleiben, kann es bei der <em>ersten Abfrage</em> zu einer zusätzlichen Latenzzeit kommen, da die erforderlichen Daten bei Bedarf abgerufen werden müssen. Um diesen Effekt für kritische Felder oder Indizes abzuschwächen, können Sie die <a href="/docs/de/tiered-storage-overview.md#Phase-2-Warm-up">Warm-Up-Strategie</a> verwenden, um sie proaktiv vorzuladen, bevor das Segment abfragbar wird.</p>
<p><strong>Konfiguration</strong></p>
<p>Wird automatisch angewendet, wenn Tiered Storage aktiviert ist. Eine manuelle Einstellung ist nicht erforderlich.</p>
<h4 id="Phase-2-Warm-up" class="common-anchor-header">Phase 2: Aufwärmen</h4><p>Um die durch <a href="/docs/de/tiered-storage-overview.md#Phase-1-Lazy-load">Lazy Load</a> verursachte First-Hit-Latenz zu reduzieren, bietet Milvus einen <em>Warm Up-Mechanismus</em>.</p>
<p>Bevor ein Segment abfragbar wird, kann Milvus proaktiv bestimmte Felder oder Indizes aus dem Objektspeicher abrufen und zwischenspeichern, um sicherzustellen, dass die erste Abfrage direkt auf zwischengespeicherte Daten trifft, anstatt ein bedarfsgesteuertes Laden auszulösen.</p>
<p>Während der Aufwärmphase werden Felder auf Chunk-Ebene vorgeladen, während Indizes auf Segmentebene vorgeladen werden.</p>
<p><strong>Konfiguration</strong></p>
<p>Die Einstellungen für das Aufwärmen werden im Abschnitt "Tiered Storage" auf <code translate="no">milvus.yaml</code> definiert. Sie können das Vorladen für jeden Feld- oder Indextyp aktivieren oder deaktivieren und die bevorzugte Strategie angeben. Detaillierte Konfigurationen finden Sie unter <a href="/docs/de/warm-up.md">Warm Up</a>.</p>
<h4 id="Phase-3-Partial-load" class="common-anchor-header">Phase 3: Teilweises Laden</h4><p>Sobald Abfragen oder Suchvorgänge beginnen, führt der QueryNode eine <em>Teilladung</em> durch und holt nur die erforderlichen Datenchunks oder Indexdateien aus dem Objektspeicher.</p>
<ul>
<li><p><strong>Felder</strong>: Werden bei Bedarf auf der <strong>Chunk-Ebene</strong> geladen. Es werden nur Datenchunks abgerufen, die den aktuellen Abfragebedingungen entsprechen, wodurch die E/A- und Speichernutzung minimiert wird.</p></li>
<li><p><strong>Indizes</strong>: Werden bei Bedarf auf <strong>Segmentebene</strong> geladen. Indexdateien müssen als komplette Einheiten abgerufen werden und können nicht auf Chunks aufgeteilt werden.</p></li>
</ul>
<p><strong>Konfiguration</strong></p>
<p>Die Teillast wird automatisch angewendet, wenn Tiered Storage aktiviert ist. Eine manuelle Einstellung ist nicht erforderlich. Um die First-Hit-Latenz für kritische Daten zu minimieren, kombinieren Sie diese Option mit <a href="/docs/de/warm-up.md">Warm Up</a>.</p>
<h4 id="Phase-4-Eviction" class="common-anchor-header">Phase 4: Auslagerung</h4><p>Um eine gesunde Ressourcennutzung aufrechtzuerhalten, gibt Milvus automatisch ungenutzte Daten im Cache frei, wenn bestimmte Schwellenwerte erreicht werden.</p>
<p>Die Freigabe erfolgt nach einer <a href="https://en.wikipedia.org/wiki/Cache_replacement_policies">LRU-Richtlinie (Least Recently Used)</a>, die sicherstellt, dass Daten, auf die nur selten zugegriffen wird, zuerst entfernt werden, während aktive Daten im Cache verbleiben.</p>
<p>Die Auslagerung wird durch die folgenden konfigurierbaren Elemente gesteuert:</p>
<ul>
<li><p><strong>Wasserzeichen</strong>: Definieren Sie Speicher- oder Festplattenschwellenwerte, die die Auslagerung auslösen und stoppen.</p></li>
<li><p><strong>Cache-TTL</strong>: Entfernt veraltete Daten aus dem Cache nach einer bestimmten Dauer der Inaktivität.</p></li>
</ul>
<p><strong>Konfiguration</strong></p>
<p>Aktivieren Sie die Verdrängungsparameter in <strong>milvus.yaml</strong> und stellen Sie sie ein. Siehe <a href="/docs/de/eviction.md">Verdrängung</a> für eine detaillierte Konfiguration.</p>
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
<li><p>QueryNode-Ressourcen werden mit anderen Workloads geteilt, so dass Tiered Storage die tatsächlich verfügbare Kapazität nicht richtig einschätzen kann.</p></li>
</ul>
<p>Um dieses Problem zu beheben, empfehlen wir Ihnen, dedizierte Ressourcen für QueryNodes zuzuweisen.</p>
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
    </button></h3><p>Wenn zu viele Abfragen gleichzeitig auf heiße Daten zugreifen, können die Ressourcengrenzen der QueryNodes dennoch überschritten werden. Einige Threads können aufgrund von Timeouts bei der Ressourcenreservierung fehlschlagen. Ein erneuter Versuch, nachdem die Last abgenommen hat, oder die Zuweisung weiterer Ressourcen kann dieses Problem beheben.</p>
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
<li><p>Wasserzeichen, die zu dicht beieinander liegen, was zu häufigen synchronen Auslagerungen führt.</p></li>
</ul>
