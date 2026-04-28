---
id: best-practices-for-tiered-storage.md
title: Best Practices für Tiered StorageCompatible with Milvus 2.6.4+
summary: >-
  Milvus bietet Tiered Storage, um Sie bei der effizienten Verarbeitung großer
  Datenmengen zu unterstützen und gleichzeitig Abfragelatenz, Kapazität und
  Ressourcennutzung auszugleichen. Dieser Leitfaden fasst die empfohlenen
  Konfigurationen für typische Arbeitslasten zusammen und erläutert die Gründe
  für jede Tuning-Strategie.
beta: Milvus 2.6.4+
---
<h1 id="Best-Practices-for-Tiered-Storage" class="common-anchor-header">Best Practices für Tiered Storage<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Best-Practices-for-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus bietet Tiered Storage, um Sie bei der effizienten Verarbeitung großer Datenmengen zu unterstützen und gleichzeitig Abfragelatenz, Kapazität und Ressourcennutzung auszugleichen. Dieser Leitfaden fasst die empfohlenen Konfigurationen für typische Arbeitslasten zusammen und erläutert die Gründe für jede Tuning-Strategie.</p>
<h2 id="Before-you-start" class="common-anchor-header">Bevor Sie beginnen<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
<li><p>Milvus v2.6.4 oder höher</p></li>
<li><p>QueryNodes müssen über dedizierte lokale Ressourcen (Speicher und Festplatte) verfügen. Gemeinsam genutzte Umgebungen können die Cache-Schätzung verzerren und zu Fehleinschätzungen bei der Auslagerung führen.</p></li>
</ul>
<h2 id="Choose-the-right-strategy" class="common-anchor-header">Wählen Sie die richtige Strategie<button data-href="#Choose-the-right-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>Tiered Storage bietet flexible Lade- und Caching-Strategien, die je nach Arbeitslast kombiniert werden können.</p>
<table>
   <tr>
     <th><p>Ziel</p></th>
     <th><p>Empfohlener Schwerpunkt</p></th>
     <th><p>Schlüsselmechanismus</p></th>
   </tr>
   <tr>
     <td><p>Minimierung der Latenzzeit bei der ersten Abfrage</p></td>
     <td><p>Vorladen kritischer Felder</p></td>
     <td><p>Aufwärmen</p></td>
   </tr>
   <tr>
     <td><p>Effizienter Umgang mit großen Datenmengen</p></td>
     <td><p>Laden nach Bedarf</p></td>
     <td><p>Lazy Load + Partial Load</p></td>
   </tr>
   <tr>
     <td><p>Aufrechterhaltung der langfristigen Stabilität</p></td>
     <td><p>Verhinderung von Cache-Überlauf</p></td>
     <td><p>Auslagerung</p></td>
   </tr>
   <tr>
     <td><p>Gleichgewicht zwischen Leistung und Kapazität</p></td>
     <td><p>Kombinieren Sie Preload und dynamisches Caching</p></td>
     <td><p>Hybride Konfiguration</p></td>
   </tr>
</table>
<h2 id="Scenario-1-real-time-low-latency-retrieval" class="common-anchor-header">Szenario 1: Abruf in Echtzeit mit geringer Latenzzeit<button data-href="#Scenario-1-real-time-low-latency-retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Wann sollte man sie verwenden?</strong></p>
<ul>
<li><p>Abfragelatenz ist kritisch (z. B. Echtzeit-Empfehlung oder Such-Ranking)</p></li>
<li><p>Auf zentrale Vektorindizes und skalare Filter wird häufig zugegriffen</p></li>
<li><p>Konsistente Leistung ist wichtiger als Startgeschwindigkeit</p></li>
</ul>
<p><strong>Empfohlene Konfiguration</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># scalar field/index warm-up to eliminate first-time latency</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>
        <span class="hljs-comment"># warm-up of vector fields is disabled (if the original vector is not required)</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-comment"># vector indexes warm-up to elminate first-time latenct</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>
      <span class="hljs-comment"># enable cache eviction, and also turn on background asynchronous eviction</span>
      <span class="hljs-comment"># to reduce the triggering of synchronous eviction.</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>
      <span class="hljs-comment"># no expiration time, which avoids frequent reloading</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">0</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Begründung</strong></p>
<ul>
<li><p>Warmup eliminiert die First-Hit-Latenz für hochfrequente Skalar- und Vektorindizes.</p></li>
<li><p>Die Verdrängung im Hintergrund hält den Cache-Druck stabil, ohne Abfragen zu blockieren.</p></li>
<li><p>Durch die Deaktivierung der Cache-TTL werden unnötige Neuladungen für heiße Daten vermieden.</p></li>
</ul>
<h2 id="Scenario-2-offline-batch-analysis" class="common-anchor-header">Szenario 2: Offline, Batch-Analyse<button data-href="#Scenario-2-offline-batch-analysis" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Wann sollte man sie verwenden?</strong></p>
<ul>
<li><p>Die Toleranz für Abfragelatenz ist hoch</p></li>
<li><p>Die Arbeitslast umfasst große Datensätze oder viele Segmente</p></li>
<li><p>Kapazität und Durchsatz haben Vorrang vor der Reaktionsfähigkeit</p></li>
</ul>
<p><strong>Empfohlene Konfiguration</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># disable scalar field/index warm-up to speed up loading</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">disable</span>
        <span class="hljs-comment"># disable vector field/index warm-up to speed up loading</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">disable</span>
      <span class="hljs-comment"># enable cache eviction, and also turn on background asynchronous eviction</span>
      <span class="hljs-comment"># to reduce the triggering of synchronous eviction.</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.7</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.85</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.7</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.85</span>
      <span class="hljs-comment"># use 1 day expiration to clean unused cache</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">86400</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Begründung</strong></p>
<ul>
<li><p>Die Deaktivierung der Aufwärmphase beschleunigt den Startvorgang bei der Initialisierung vieler Segmente.</p></li>
<li><p>Höhere Wasserzeichen ermöglichen eine dichtere Cache-Nutzung und verbessern die Gesamtlastkapazität.</p></li>
<li><p>Die Cache-TTL bereinigt automatisch ungenutzte Daten, um lokalen Speicherplatz freizugeben.</p></li>
</ul>
<h2 id="Scenario-3-hybrid-deployment-mixed-online-+-offline" class="common-anchor-header">Szenario 3: Hybride Bereitstellung (gemischt online + offline)<button data-href="#Scenario-3-hybrid-deployment-mixed-online-+-offline" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Wann verwenden</strong></p>
<ul>
<li><p>Ein einziger Cluster bedient sowohl Online- als auch analytische Workloads</p></li>
<li><p>Einige Sammlungen erfordern niedrige Latenzzeiten, bei anderen steht die Kapazität im Vordergrund</p></li>
</ul>
<p><strong>Empfohlene Strategie</strong></p>
<ul>
<li><p>Anwendung der <strong>Echtzeitkonfiguration</strong> auf latenzempfindliche Sammlungen</p></li>
<li><p>Anwendung der <strong>Offline-Konfiguration</strong> auf analytische oder archivierte Sammlungen</p></li>
<li><p>Passen Sie evictableMemoryCacheRatio, cacheTtl und Watermark-Ratios unabhängig für jeden Workload-Typ an</p></li>
</ul>
<p><strong>Begründung</strong></p>
<p>Die Kombination von Konfigurationen ermöglicht eine feinkörnige Steuerung der Ressourcenzuweisung.</p>
<p>Kritische Sammlungen behalten Garantien für niedrige Latenzzeiten bei, während sekundäre Sammlungen mehr Segmente und Datenvolumen verarbeiten können.</p>
<h2 id="Additional-tuning-tips" class="common-anchor-header">Zusätzliche Tuning-Tipps<button data-href="#Additional-tuning-tips" class="anchor-icon" translate="no">
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
    </button></h2><table>
   <tr>
     <th><p>Aspekt</p></th>
     <th><p>Empfehlung</p></th>
     <th><p>Erläuterung</p></th>
   </tr>
   <tr>
     <td><p><strong>Warm Up-Bereich</strong></p></td>
     <td><p>Laden Sie nur Felder oder Indizes mit hoher Abfragehäufigkeit vor.</p></td>
     <td><p>Unnötiges Vorladen erhöht die Ladezeit und den Ressourcenverbrauch.</p></td>
   </tr>
   <tr>
     <td><p><strong>Optimierung der Verdrängung</strong></p></td>
     <td><p>Beginnen Sie mit den Standard-Wasserzeichen (75-80%) und passen Sie sie schrittweise an.</p></td>
     <td><p>Eine kleine Lücke führt zu häufigen Auslagerungen; eine große Lücke verzögert die Freigabe von Ressourcen.</p></td>
   </tr>
   <tr>
     <td><p><strong>Cache-TTL</strong></p></td>
     <td><p>Deaktivieren Sie diese Option für stabile Hot-Datensätze; aktivieren Sie sie (z. B. 1-3 Tage) für dynamische Daten.</p></td>
     <td><p>Verhindert den Aufbau eines veralteten Caches und gleicht gleichzeitig den Bereinigungs-Overhead aus.</p></td>
   </tr>
   <tr>
     <td><p><strong>Overcommit-Verhältnis</strong></p></td>
     <td><p>Vermeiden Sie Werte &gt; 0,7, es sei denn, Sie haben einen großen Spielraum bei den Ressourcen.</p></td>
     <td><p>Übermäßiges Overcommit kann zu Cache-Thrashing und instabiler Latenz führen.</p></td>
   </tr>
   <tr>
     <td><p><strong>Überwachung</strong></p></td>
     <td><p>Überwachen Sie die Cache-Trefferrate, die Ressourcennutzung und die Häufigkeit der Auslagerungen.</p></td>
     <td><p>Häufige Cold Loads können darauf hinweisen, dass die Aufwärmzeit oder die Wasserzeichen angepasst werden müssen.</p></td>
   </tr>
</table>
