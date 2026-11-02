---
id: architecture_overview.md
summary: >-
  Milvus bietet eine schnelle, zuverlässige und stabile Vektordatenbank, die
  speziell für die Ähnlichkeitssuche und künstliche Intelligenz entwickelt
  wurde.
title: Überblick über die Milvus-Architektur
---
<h1 id="Milvus-Architecture-Overview" class="common-anchor-header">Überblick über die Milvus-Architektur<button data-href="#Milvus-Architecture-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus ist eine <strong>Open-Source-Vektordatenbank</strong>, die <strong>cloud-nativ ist</strong> und für die hochleistungsfähige Ähnlichkeitssuche in riesigen Vektordatensätzen entwickelt wurde. Sie basiert auf gängigen Vektorsuchbibliotheken wie Faiss, HNSW, DiskANN und SCANN und unterstützt KI-Anwendungen sowie Szenarien zur Abfrage unstrukturierter Daten. Bevor Sie fortfahren, machen Sie sich bitte mit den <a href="/docs/de/glossary.md">Grundprinzipien</a> der Embedding-Abfrage vertraut.</p>
<h2 id="Architecture-Diagram" class="common-anchor-header">Architekturdiagramm<button data-href="#Architecture-Diagram" class="anchor-icon" translate="no">
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
    </button></h2><p>Das folgende Diagramm veranschaulicht die allgemeine Architektur von Milvus und zeigt dessen modulares, skalierbares und cloud-natives Design mit vollständig entkoppelten Speicher- und Rechenebenen.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_architecture_2_6.png" alt="Architecture_diagram" class="doc-image" id="architecture_diagram" /> 
   <span>Architekturdiagramm</span>
  
 </span></p>
<h2 id="Architectural-Principles" class="common-anchor-header">Architekturprinzipien<button data-href="#Architectural-Principles" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus folgt dem Prinzip der Entkopplung von Daten- und Steuerungsebene und besteht aus vier Hauptschichten, die hinsichtlich Skalierbarkeit und Notfallwiederherstellung voneinander unabhängig sind. Diese Shared-Storage-Architektur mit vollständig entkoppelten Speicher- und Rechenschichten ermöglicht die horizontale Skalierung von Rechenknoten, während Woodpecker als Zero-Disk-WAL-Schicht implementiert wird, um die Elastizität zu erhöhen und den Betriebsaufwand zu reduzieren.</p>
<p>Durch die Trennung der Stream-Verarbeitung in den Streaming-Knoten und der Batch-Verarbeitung in den Abfrageknoten und den Datenknoten erzielt Milvus eine hohe Leistung und erfüllt gleichzeitig die Anforderungen an die Echtzeitverarbeitung.</p>
<h2 id="Detailed-Layer-Architecture" class="common-anchor-header">Detaillierte Schichtenarchitektur<button data-href="#Detailed-Layer-Architecture" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Layer-1-Access-Layer" class="common-anchor-header">Schicht 1: Zugriffsschicht<button data-href="#Layer-1-Access-Layer" class="anchor-icon" translate="no">
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
    </button></h3><p>Die Zugriffsebene besteht aus einer Gruppe zustandsloser Proxys und bildet die vorderste Ebene des Systems sowie den Endpunkt für die Benutzer. Sie validiert Client-Anfragen und filtert die zurückgegebenen Ergebnisse:</p>
<ul>
<li>Der Proxy ist an sich zustandslos. Er stellt eine einheitliche Serviceadresse bereit, wobei er Lastverteilungskomponenten wie Nginx, Kubernetes Ingress, NodePort und LVS nutzt.</li>
<li>Da Milvus eine Architektur mit massiv-paralleler Verarbeitung (MPP) nutzt, aggregiert und verarbeitet der Proxy die Zwischenergebnisse, bevor er die Endergebnisse an den Client zurückgibt.</li>
</ul>
<h3 id="Layer-2-Coordinator" class="common-anchor-header">Schicht 2: Koordinator<button data-href="#Layer-2-Coordinator" class="anchor-icon" translate="no">
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
    </button></h3><p>Der Koordinator fungiert als das Gehirn von Milvus. Zu jedem Zeitpunkt ist genau ein Koordinator im gesamten Cluster aktiv, der für die Aufrechterhaltung der Cluster-Topologie, die Planung aller Aufgabentypen und die Gewährleistung der Konsistenz auf Cluster-Ebene verantwortlich ist.</p>
<p>Im Folgenden sind einige der vom <strong>Koordinator</strong> übernommenen Aufgaben aufgeführt:</p>
<ul>
<li><strong>DDL/DCL/TSO-Verwaltung</strong>: Bearbeitet Anfragen der Datendefinitionssprache (DDL) und der Datensteuerungssprache (DCL), wie z. B. das Anlegen oder Löschen von Sammlungen, Partitionen oder Indizes, sowie die Verwaltung von Oracle-Zeitstempeln (TSO) und die Ausgabe von Zeitmarken.</li>
<li><strong>Verwaltung des Streaming-Dienstes</strong>: Verbindet das Write-Ahead-Log (WAL) mit den Streaming-Knoten und stellt die Dienstermittlung für den Streaming-Dienst bereit.</li>
<li><strong>Abfrageverwaltung</strong>: Verwaltet die Topologie und den Lastausgleich für die Abfrageknoten und stellt die für die Abfrageauswertung relevanten Ansichten bereit sowie verwaltet diese, um das Abfrage-Routing zu steuern.</li>
<li><strong>Verwaltung historischer Daten</strong>: Verteilt Offline-Aufgaben wie Komprimierung und Indexerstellung an Datenknoten und verwaltet die Topologie von Segmenten und Datenansichten.</li>
</ul>
<h3 id="Layer-3-Worker-Nodes" class="common-anchor-header">Ebene 3: Worker-Knoten<button data-href="#Layer-3-Worker-Nodes" class="anchor-icon" translate="no">
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
    </button></h3><p>Die „Arme und Beine“. Worker-Knoten sind einfache Ausführungsinstanzen, die den Anweisungen des Koordinators folgen. Dank der Trennung von Speicher und Rechenleistung sind Worker-Knoten zustandslos und können bei der Bereitstellung auf Kubernetes die horizontale Skalierung des Systems sowie die Notfallwiederherstellung erleichtern. Es gibt drei Arten von Worker-Knoten:</p>
<h3 id="Streaming-node" class="common-anchor-header">Streaming-Knoten<button data-href="#Streaming-node" class="anchor-icon" translate="no">
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
    </button></h3><p>Der Streaming-Knoten dient als „Mini-Gehirn“ auf Shard-Ebene und bietet Konsistenzgarantien auf Shard-Ebene sowie Fehlerbehebung auf Basis des zugrunde liegenden WAL-Speichers. Gleichzeitig ist der Streaming-Knoten auch für die Abfrage wachsender Datenmengen und die Erstellung von Abfrageplänen zuständig. Darüber hinaus übernimmt er die Umwandlung wachsender Daten in versiegelte (historische) Daten.</p>
<h3 id="Query-node" class="common-anchor-header">Abfrageknoten<button data-href="#Query-node" class="anchor-icon" translate="no">
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
    </button></h3><p>Der Abfrageknoten lädt die historischen Daten aus dem Objektspeicher und ermöglicht die Abfrage historischer Daten.</p>
<h3 id="Data-node" class="common-anchor-header">Datenknoten<button data-href="#Data-node" class="anchor-icon" translate="no">
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
    </button></h3><p>Der Datenknoten ist für die Offline-Verarbeitung historischer Daten zuständig, beispielsweise für die Komprimierung und den Indexaufbau.</p>
<h3 id="Layer-4-Storage" class="common-anchor-header">Schicht 4: Speicher<button data-href="#Layer-4-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Der Speicher ist das Rückgrat des Systems und für die Datenpersistenz zuständig. Er umfasst den Metaspeicher, den Log-Broker und den Objektspeicher.</p>
<h3 id="Meta-storage" class="common-anchor-header">Metaspeicher<button data-href="#Meta-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Der Metaspeicher speichert Snapshots von Metadaten wie das Erfassungsschema und Checkpoints zum Nachrichtenverbrauch. Die Speicherung von Metadaten erfordert extrem hohe Verfügbarkeit, starke Konsistenz und Transaktionsunterstützung, weshalb Milvus etcd als Metaspeicher gewählt hat. Milvus nutzt etcd außerdem für die Dienstregistrierung und den Zustandscheck.</p>
<h3 id="Object-storage" class="common-anchor-header">Objektspeicher<button data-href="#Object-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Der Objektspeicher sorgt für die dauerhafte Speicherung von Daten und Indexdateien. Milvus unterstützt Objektspeicher-Backends wie MinIO, AWS S3 und Azure Blob Storage. QueryNodes speichern die für die Bearbeitung von Abfragen benötigten Daten und Indizes im Cache.</p>
<p>Mit <a href="/docs/de/tiered-storage-overview.md">„Tiered Storage“</a>, das ab Milvus 2.6.4 verfügbar ist, können QueryNodes zunächst Segment-Metadaten laden und Felddaten oder Indizes bei Bedarf abrufen, anstatt bereits bei der Initialisierung alles zu laden. Der entfernte Objektspeicher bleibt die persistente Quelle; das Entfernen eines lokalen Cache-Eintrags löscht die gespeicherten Daten nicht. Der Zugriff auf nicht zwischengespeicherte Daten verursacht zusätzliche Speicher-E/A und kann die Abfragelatenz erhöhen. Verwenden Sie <a href="/docs/de/warm-up.md">„Warm Up“</a> für latenzempfindliche Felder oder Indizes und bewerten Sie sowohl die Latenz bei „Cold-Queries“ als auch die Latenz im „Warm-Cache“, bevor Sie sich für eine Ladestrategie entscheiden.</p>
<h3 id="WAL-storage" class="common-anchor-header">WAL-Speicher<button data-href="#WAL-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Der Write-Ahead-Log-Speicher (WAL) bildet die Grundlage für die Datenbeständigkeit und -konsistenz in verteilten Systemen. Bevor eine Änderung festgeschrieben wird, wird sie zunächst in einem Protokoll aufgezeichnet – so wird sichergestellt, dass Sie im Falle eines Ausfalls genau dort weitermachen können, wo Sie aufgehört haben.</p>
<p>Zu den gängigen WAL-Implementierungen gehören Kafka, Pulsar und Woodpecker. Im Gegensatz zu herkömmlichen festplattenbasierten Lösungen nutzt Woodpecker ein cloud-natives, festplattenloses Design, das direkt in den Objektspeicher schreibt. Dieser Ansatz lässt sich mühelos an Ihre Anforderungen anpassen und vereinfacht den Betrieb, da der Aufwand für die Verwaltung lokaler Festplatten entfällt.</p>
<p>Durch die vorzeitige Protokollierung jedes Schreibvorgangs garantiert die WAL-Schicht einen zuverlässigen, systemweiten Mechanismus für Wiederherstellung und Konsistenz – ganz gleich, wie komplex Ihre verteilte Umgebung auch werden mag.</p>
<h2 id="Data-Flow-and-API-Categories" class="common-anchor-header">Datenfluss und API-Kategorien<button data-href="#Data-Flow-and-API-Categories" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus-APIs werden nach ihrer Funktion kategorisiert und folgen spezifischen Pfaden durch die Architektur:</p>
<table>
<thead>
<tr><th>API-Kategorie</th><th>Operationen</th><th>Beispiel-APIs</th><th>Architekturablauf</th></tr>
</thead>
<tbody>
<tr><td><strong>DDL/DCL</strong></td><td>Schema und Zugriffskontrolle</td><td><code translate="no">createCollection</code>, <code translate="no">dropCollection</code>, <code translate="no">hasCollection</code>, <code translate="no">createPartition</code></td><td>Zugriffsebene → Koordinator</td></tr>
<tr><td><strong>DML</strong></td><td>Datenmanipulation</td><td><code translate="no">insert</code>, <code translate="no">delete</code>, <code translate="no">upsert</code></td><td>Zugriffsebene → Streaming-Worker-Knoten</td></tr>
<tr><td><strong>DQL</strong></td><td>Datenabfrage</td><td><code translate="no">search</code>, <code translate="no">query</code></td><td>Zugriffsebene → Batch-Worker-Knoten (Abfrageknoten)</td></tr>
</tbody>
</table>
<h3 id="Example-Data-Flow-Search-Operation" class="common-anchor-header">Beispiel für einen Datenfluss: Suchvorgang<button data-href="#Example-Data-Flow-Search-Operation" class="anchor-icon" translate="no">
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
<li>Der Client sendet eine Suchanfrage über SDK/RESTful-API</li>
<li>Der Load Balancer leitet die Anfrage an einen verfügbaren Proxy in der Zugriffsebene weiter</li>
<li>Der Proxy ermittelt die Zielknoten mithilfe des Routing-Caches; er kontaktiert den Koordinator nur, wenn der Cache nicht verfügbar ist</li>
<li>Der Proxy leitet die Anfrage an die entsprechenden Streaming-Knoten weiter, die sich dann mit den Abfrageknoten zur Suche nach versiegelten Daten abstimmen, während sie lokal die Suche in wachsenden Datenmengen durchführen</li>
<li>Abfrageknoten laden bei Bedarf versiegelte Segmente aus dem Objektspeicher und führen eine Suche auf Segmentebene durch</li>
<li>Die Suchergebnisse durchlaufen eine mehrstufige Reduktion: Die Abfrageknoten reduzieren die Ergebnisse über mehrere Segmente hinweg, die Streaming-Knoten reduzieren die Ergebnisse der Abfrageknoten und der Proxy reduziert die Ergebnisse aller Streaming-Knoten, bevor sie an den Client zurückgegeben werden</li>
</ol>
<h3 id="Example-Data-Flow-Data-Insertion" class="common-anchor-header">Beispiel für einen Datenfluss: Dateneinfügung<button data-href="#Example-Data-Flow-Data-Insertion" class="anchor-icon" translate="no">
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
<li>Der Client sendet eine Einfügeanfrage mit Vektordaten</li>
<li>Die Zugriffsebene validiert die Anfrage und leitet sie an den Streaming-Knoten weiter</li>
<li>Der Streaming-Knoten protokolliert den Vorgang zur Gewährleistung der Dauerhaftigkeit im WAL-Speicher</li>
<li>Die Daten werden in Echtzeit verarbeitet und für Abfragen bereitgestellt</li>
<li>Wenn Segmente ihre Kapazitätsgrenze erreichen, löst der Streaming-Knoten die Umwandlung in versiegelte Segmente aus</li>
<li>Der Datenknoten übernimmt die Komprimierung und erstellt Indizes auf Basis der versiegelten Segmente, wobei die Ergebnisse im Objektspeicher abgelegt werden</li>
<li>Abfrageknoten laden die neu erstellten Indizes und ersetzen die entsprechenden wachsenden Daten</li>
</ol>
<h2 id="Whats-Next" class="common-anchor-header">Was kommt als Nächstes?<button data-href="#Whats-Next" class="anchor-icon" translate="no">
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
<li>Entdecken Sie die <a href="/docs/de/main_components.md">Hauptkomponenten</a> für detaillierte Implementierungsdetails</li>
<li>Erfahren Sie mehr über <a href="/docs/de/data_processing.md">Datenverarbeitungs</a> -Workflows und Optimierungsstrategien</li>
<li>Machen Sie sich mit dem <a href="/docs/de/tune_consistency.md">Konsistenzmodell</a> und den Transaktionsgarantien in Milvus vertraut</li>
</ul>
