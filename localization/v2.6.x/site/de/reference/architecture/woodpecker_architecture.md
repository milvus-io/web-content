---
id: woodpecker_architecture.md
title: Woodpecker
summary: >-
  Woodpecker ist ein Cloud-natives WAL-System in Milvus 2.6. Mit einer
  Zero-Disk-Architektur und zwei Bereitstellungsmodi bietet es einen hohen
  Durchsatz, einen geringen betrieblichen Overhead und eine nahtlose
  Skalierbarkeit auf Objektspeicher.
---
<h1 id="Woodpecker" class="common-anchor-header">Woodpecker<button data-href="#Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>In Milvus 2.6 ersetzt Woodpecker Kafka und Pulsar durch ein speziell entwickeltes, Cloud-natives Write-Ahead-Log-System (WAL). Woodpecker wurde für die Objektspeicherung entwickelt, vereinfacht die Abläufe, maximiert den Durchsatz und lässt sich mühelos skalieren.</p>
<p>Die Entwicklungsziele von Woodpecker:</p>
<ul>
<li><p>Höchster Durchsatz in Cloud-Umgebungen</p></li>
<li><p>Dauerhafte, nur anhängende Protokollierung für zuverlässige Wiederherstellung</p></li>
<li><p>Minimaler betrieblicher Overhead ohne lokale Festplatten oder externe Makler</p></li>
</ul>
<h2 id="Zero-disk-architecture" class="common-anchor-header">Null-Festplatten-Architektur<button data-href="#Zero-disk-architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>Die zentrale Innovation von Woodpecker ist seine Zero-Disk-Architektur:</p>
<ul>
<li>Alle Protokolldaten werden in einem Cloud-Objektspeicher (wie Amazon S3, Google Cloud Storage oder Alibaba OS) gespeichert.</li>
<li>Metadaten werden über verteilte Key-Value-Stores wie <strong>etcd</strong> verwaltet</li>
<li>Keine Abhängigkeiten von lokalen Festplatten für Kernoperationen</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_layers.png" alt="woodpecker layers" class="doc-image" id="woodpecker-layers" />
   </span> <span class="img-wrapper"> <span>Woodpecker-Schichten</span> </span></p>
<h2 id="Architecture-components" class="common-anchor-header">Komponenten der Architektur<button data-href="#Architecture-components" class="anchor-icon" translate="no">
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
    </button></h2><p>Ein Standard-Woodpecker-Einsatz umfasst die folgenden Komponenten:</p>
<ul>
<li><strong>Client</strong>: Schnittstellenschicht für die Ausgabe von Lese- und Schreibanfragen</li>
<li><strong>LogStore</strong>: Verwaltet Hochgeschwindigkeits-Schreibpufferung, asynchrone Uploads in den Speicher und Protokollverdichtung</li>
<li><strong>Speicher-Backend</strong>: Unterstützt skalierbare, kostengünstige Speicherdienste wie S3, GCS und Dateisysteme wie EFS</li>
<li><strong>Etcd</strong>: Speichert Metadaten und koordiniert den Protokollstatus über verteilte Knoten hinweg</li>
</ul>
<h2 id="Deployment-modes" class="common-anchor-header">Bereitstellungsmodi<button data-href="#Deployment-modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Woodpecker bietet zwei Bereitstellungsmodi, um Ihren spezifischen Anforderungen gerecht zu werden:</p>
<h3 id="MemoryBuffer---Lightweight-and-maintenance-free" class="common-anchor-header">MemoryBuffer - Leichtgewichtig und wartungsfrei</h3><p>Der MemoryBuffer-Modus bietet eine einfache und leichtgewichtige Bereitstellungsoption, bei der der eingebettete Woodpecker-Client eingehende Schreibvorgänge vorübergehend im Speicher puffert und sie regelmäßig an einen Cloud-Objektspeicherdienst weiterleitet. In diesem Modus ist der Speicherpuffer direkt in den Client eingebettet, was ein effizientes Batching vor dem Flushing an S3 ermöglicht. Die Metadaten werden mit <strong>etcd</strong> verwaltet, um Konsistenz und Koordination zu gewährleisten. Dieser Modus eignet sich am besten für stapelintensive Arbeitslasten in kleineren Bereitstellungen oder Produktionsumgebungen, bei denen die Einfachheit Vorrang vor der Leistung hat, insbesondere wenn eine geringe Schreiblatenz nicht entscheidend ist.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_memorybuffer_mode_deployment.png" alt="woodpecker memory mode deployment" class="doc-image" id="woodpecker-memory-mode-deployment" />
   </span> <span class="img-wrapper"> <span>Einsatz des Specht-Speichermodus</span> </span></p>
<h3 id="QuorumBuffer---Optimized-for-low-latency-high-durability" class="common-anchor-header">QuorumBuffer - Optimiert für niedrige Latenzzeiten und hohe Ausfallsicherheit</h3><p>Der QuorumBuffer-Modus wurde für latenzempfindliche, hochfrequente Lese-/Schreib-Workloads entwickelt, die sowohl Reaktionsfähigkeit in Echtzeit als auch hohe Fehlertoleranz erfordern. In diesem Modus interagiert der Woodpecker-Client mit einem Quorum-System mit drei Replikaten, um eine Hochgeschwindigkeits-Schreibpufferung zu gewährleisten, die durch verteilten Konsens eine starke Konsistenz und hohe Verfügbarkeit sicherstellt.</p>
<p>Ein Schreibvorgang gilt als erfolgreich, wenn der Client die Daten erfolgreich an mindestens zwei der drei Quorum-Knoten repliziert, was in der Regel innerhalb eines einstelligen Millisekundenbereichs geschieht. Diese Architektur minimiert den Knotenstatus, macht große lokale Festplattenvolumina überflüssig und vermeidet komplexe Anti-Entropie-Reparaturen, die in herkömmlichen Quorum-basierten Systemen häufig erforderlich sind.</p>
<p>Das Ergebnis ist eine schlanke, robuste WAL-Schicht, die sich ideal für geschäftskritische Produktionsumgebungen eignet, in denen Konsistenz, Verfügbarkeit und schnelle Wiederherstellung wichtig sind.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_quorumbuffer_mode_deployment.png" alt="woodpecker quorum mode deployment" class="doc-image" id="woodpecker-quorum-mode-deployment" />
   </span> <span class="img-wrapper"> <span>Einsatz des Woodpecker Quorum-Modus</span> </span></p>
<h2 id="Performance-benchmarks" class="common-anchor-header">Leistungs-Benchmarks<button data-href="#Performance-benchmarks" class="anchor-icon" translate="no">
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
    </button></h2><p>Wir haben umfassende Benchmarks durchgeführt, um die Leistung von Woodpecker in einem Single-Node, Single-Client, Single-Log-Stream Setup zu bewerten. Die Ergebnisse waren im Vergleich zu Kafka und Pulsar beeindruckend:</p>
<table>
<thead>
<tr><th>System</th><th>Kafka</th><th>Pulsar</th><th>WP Minio</th><th>WP Lokal</th><th>WP S3</th></tr>
</thead>
<tbody>
<tr><td>Durchsatz</td><td>129.96MB/s</td><td>107MB/s</td><td>71MB/s</td><td>450MB/s</td><td>750MB/s</td></tr>
<tr><td>Latenzzeit</td><td>58ms</td><td>35 ms</td><td>184ms</td><td>1,8 ms</td><td>166ms</td></tr>
</tbody>
</table>
<p>Zur Veranschaulichung haben wir die theoretischen Durchsatzgrenzen der verschiedenen Speicher-Backends auf unserem Testrechner gemessen:</p>
<ul>
<li>MinIO: ~110 MB/s</li>
<li>Lokales Dateisystem: 600-750 MB/s</li>
<li>Amazon S3 (einzelne EC2-Instanz): bis zu 1,1 GB/s</li>
</ul>
<p>Bemerkenswerterweise erreichte Woodpecker durchgängig 60-80% des maximal möglichen Durchsatzes für jedes Backend - ein außergewöhnliches Effizienzniveau für Middleware.</p>
<h3 id="Key-performance-insights" class="common-anchor-header">Wichtige Leistungsdaten</h3><ul>
<li>Lokaler Dateisystem-Modus: Woodpecker erreichte 450 MB/s - 3,5 Mal schneller als Kafka und 4,2 Mal schneller als Pulsar - bei einer extrem niedrigen Latenz von nur 1,8 ms, was ihn ideal für hochleistungsfähige Single-Node-Implementierungen macht.</li>
<li>Cloud-Speicher-Modus (S3): Beim direkten Schreiben auf S3 erreichte Woodpecker 750 MB/s (ca. 68 % der theoretischen Grenze von S3), 5,8× schneller als Kafka und 7× schneller als Pulsar. Obwohl die Latenzzeit höher ist (166 ms), bietet dieses Setup einen außergewöhnlichen Durchsatz für stapelorientierte Arbeitslasten.</li>
<li>Objektspeicher-Modus (MinIO): Selbst mit MinIO erreichte Woodpecker 71 MB/s - etwa 65 % der Kapazität von MinIO. Diese Leistung ist mit der von Kafka und Pulsar vergleichbar, allerdings bei deutlich geringerem Ressourcenbedarf.</li>
</ul>
<p>Woodpecker ist besonders für gleichzeitige Schreibvorgänge mit hohem Volumen optimiert, bei denen die Aufrechterhaltung der Reihenfolge entscheidend ist. Und diese Ergebnisse spiegeln nur die frühen Stadien der Entwicklung wider - laufende Optimierungen bei der E/A-Zusammenführung, der intelligenten Pufferung und dem Prefetching werden die Leistung voraussichtlich noch näher an die theoretischen Grenzen bringen.</p>
<h2 id="Operational-benefits" class="common-anchor-header">Betriebliche Vorteile<button data-href="#Operational-benefits" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Cloud-native Architektur von Woodpecker bietet erhebliche betriebliche Vorteile:</p>
<ul>
<li><strong>Keine lokale Speicherverwaltung</strong>: Keine Festplattenverwaltung, keine RAID-Konfiguration, keine Hardware-Ausfälle</li>
<li><strong>Automatische Skalierung</strong>: Speicher skaliert mit Cloud Object Storage ohne Kapazitätsplanung</li>
<li><strong>Kosteneffizienz</strong>: Pay-as-you-go-Speicher mit automatischem Tiering und Komprimierung</li>
<li><strong>Hohe Verfügbarkeit</strong>: Nutzt die 11-nines-Dauerhaftigkeit der Cloud-Anbieter mit schneller Wiederherstellung</li>
<li><strong>Vereinfachte Bereitstellung</strong>: Zwei Bereitstellungsmodi (MemoryBuffer/QuorumBuffer) für unterschiedliche betriebliche Anforderungen</li>
<li><strong>Entwicklerfreundlich</strong>: Schnellere Einrichtung der Umgebung und konsistente Architektur in allen Umgebungen</li>
</ul>
<p>Diese Vorteile machen Woodpecker besonders wertvoll für unternehmenskritische RAG-, KI-Agenten- und Such-Workloads mit niedriger Latenz, bei denen die Einfachheit des Betriebs ebenso wichtig ist wie die Leistung.</p>
