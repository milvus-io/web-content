---
id: overview.md
title: Was ist Milvus?
related_key: Milvus Overview
summary: >-
  Milvus ist eine leistungsstarke, hochskalierbare Vektordatenbank, die in einer
  Vielzahl von Umgebungen – vom Laptop bis hin zu groß angelegten verteilten
  Systemen – effizient läuft. Sie ist sowohl als Open-Source-Software als auch
  als Cloud-Dienst verfügbar.
---
<h1 id="What-is-Milvus" class="common-anchor-header">Was ist Milvus?<button data-href="#What-is-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><span>Milvus <span style="display: inline-block; vertical-align: middle;">
<audio id="milvus-audio" style="display: none;">
<source src="https://en-audio.howtopronounce.com/15783806805e142d8844912.mp3" type="audio/mp3" />
</audio>
<span style="
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url('https://milvus.io/docs/v2.6.x/assets/hearing.png') no-repeat center center;
    background-size: contain;
    cursor: pointer;
    margin-left: 4px;
  " onclick="document.getElementById('milvus-audio').play()"></span>
</span></span> ist ein Raubvogel aus der Gattung Milvus der Familie der Habichtartigen (Accipitridae), der für seine Fluggeschwindigkeit, sein scharfes Sehvermögen und seine bemerkenswerte Anpassungsfähigkeit bekannt ist.</p>
<style>
  audio::-webkit-media-controls {
    display: none !important;
  }
</style>
<p>Zilliz wählt den Namen Milvus für seine leistungsstarke, hochskalierbare Open-Source-Vektordatenbank, die in einer Vielzahl von Umgebungen – vom Laptop bis hin zu groß angelegten verteilten Systemen – effizient läuft. Sie ist sowohl als Open-Source-Software als auch als Cloud-Dienst verfügbar.</p>
<p>Milvus wurde von Zilliz entwickelt und wird in Kürze an die LF AI &amp; Data Foundation unter dem Dach der Linux Foundation gespendet. Damit hat sich Milvus zu einem der weltweit führenden Open-Source-Projekte für Vektordatenbanken entwickelt. Es wird unter der Apache-2.0-Lizenz vertrieben, und die meisten Mitwirkenden sind Experten aus der High-Performance-Computing-Community (HPC), die sich auf den Aufbau groß angelegter Systeme und die Optimierung hardwareorientierten Codes spezialisiert haben. Zu den wichtigsten Mitwirkenden zählen Fachleute von Zilliz, ARM, NVIDIA, AMD, Intel, Meta, IBM, Salesforce, Alibaba und Microsoft.</p>
<p>Interessanterweise ist jedes Open-Source-Projekt von Zilliz nach einem Vogel benannt – eine Namenskonvention, die Freiheit, Weitsicht und die agile Weiterentwicklung der Technologie symbolisiert.</p>
<h2 id="Unstructured-Data-Embeddings-and-Milvus" class="common-anchor-header">Unstrukturierte Daten, Einbettungen und Milvus<button data-href="#Unstructured-Data-Embeddings-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Unstrukturierte Daten wie Text, Bilder und Audio variieren im Format und enthalten eine reichhaltige zugrunde liegende Semantik, was ihre Analyse zu einer Herausforderung macht. Um diese Komplexität zu bewältigen, werden Einbettungen verwendet, um unstrukturierte Daten in numerische Vektoren umzuwandeln, die ihre wesentlichen Merkmale erfassen. Diese Vektoren werden dann in einer Vektordatenbank gespeichert, was schnelle und skalierbare Such- und Analysevorgänge ermöglicht.</p>
<p>Milvus bietet robuste Funktionen zur Datenmodellierung, mit denen Sie Ihre unstrukturierten oder multimodalen Daten in strukturierte Sammlungen organisieren können. Es unterstützt eine breite Palette von Datentypen für unterschiedliche Attributmodellierungen, darunter gängige numerische und Zeichen-Typen, verschiedene Vektortypen, Arrays, Mengen und JSON, wodurch Ihnen der Aufwand für die Pflege mehrerer Datenbanksysteme erspart bleibt.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/unstructured-data-embedding-and-milvus.png" alt="Untructured data, embeddings, and Milvus" class="doc-image" id="untructured-data,-embeddings,-and-milvus" /> 
   <span>Unstrukturierte Daten, Einbettungen und Milvus</span>
  
 </span></p>
<p>Milvus bietet drei Bereitstellungsmodi, die ein breites Spektrum an Datenumfängen abdecken – vom lokalen Prototyping in Jupyter-Notebooks bis hin zu riesigen Kubernetes-Clustern, die Dutzende Milliarden von Vektoren verwalten:</p>
<ul>
<li>Milvus Lite ist eine Python-Bibliothek, die sich problemlos in Ihre Anwendungen integrieren lässt. Als leichtgewichtige Version von Milvus eignet sie sich ideal für schnelles Prototyping in Jupyter-Notebooks oder für den Einsatz auf Edge-Geräten mit begrenzten Ressourcen. <a href="/docs/de/milvus_lite.md">Erfahren Sie mehr</a>.</li>
<li>Milvus Standalone ist eine Serverbereitstellung auf einem einzelnen Rechner, bei der alle Komponenten in einem einzigen Docker-Image gebündelt sind, um die Bereitstellung zu vereinfachen. <a href="/docs/de/install_standalone-docker.md">Erfahren Sie mehr</a>.</li>
<li>Milvus Distributed lässt sich auf Kubernetes-Clustern bereitstellen und verfügt über eine cloudnative Architektur, die für Szenarien im Milliardenbereich oder sogar darüber hinaus ausgelegt ist. Diese Architektur gewährleistet Redundanz bei kritischen Komponenten. <a href="/docs/de/install_cluster-milvusoperator.md">Erfahren Sie mehr</a>.</li>
</ul>
<h2 id="What-Makes-Milvus-so-Fast" class="common-anchor-header">Was macht Milvus so schnell?<button data-href="#What-Makes-Milvus-so-Fast" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus wurde von Anfang an als hocheffizientes Vektordatenbanksystem konzipiert. In den meisten Fällen übertrifft Milvus andere Vektordatenbanken um das 2- bis 5-Fache (siehe die Ergebnisse des VectorDBBench). Diese hohe Leistung ist das Ergebnis mehrerer wichtiger Designentscheidungen:</p>
<p><strong>Hardware-orientierte Optimierung</strong>: Um Milvus in verschiedenen Hardwareumgebungen einsetzen zu können, haben wir seine Leistung speziell für zahlreiche Hardwarearchitekturen und Plattformen optimiert, darunter AVX512, SIMD, GPUs und NVMe-SSDs.</p>
<p><strong>Fortschrittliche Suchalgorithmen</strong>: Milvus unterstützt eine breite Palette von In-Memory- und On-Disk-Indizierungs- und Suchalgorithmen, darunter IVF, HNSW, DiskANN und weitere, die alle umfassend optimiert wurden. Im Vergleich zu gängigen Implementierungen wie FAISS und HNSWLib liefert Milvus eine um 30–70 % bessere Leistung.</p>
<p><strong>Suchmaschine in C++</strong>: Über 80 % der Leistung einer Vektordatenbank werden von ihrer Suchmaschine bestimmt. Milvus nutzt für diese entscheidende Komponente C++ aufgrund der hohen Leistung der Sprache, der Low-Level-Optimierung und der effizienten Ressourcenverwaltung. Vor allem integriert Milvus zahlreiche hardwareorientierte Code-Optimierungen, die von Vektorisierung auf Assembler-Ebene bis hin zu Multithread-Parallelisierung und -Scheduling reichen, um die Hardware-Fähigkeiten voll auszuschöpfen.</p>
<p><strong>Spaltenorientiert</strong>: Milvus ist ein spaltenorientiertes Vektordatenbanksystem. Die Hauptvorteile ergeben sich aus den Datenzugriffsmustern. Bei der Ausführung von Abfragen liest eine spaltenorientierte Datenbank nur die spezifischen Felder, die an der Abfrage beteiligt sind, anstatt ganze Zeilen, was die Menge der abgerufenen Daten erheblich reduziert. Darüber hinaus lassen sich Operationen auf spaltenbasierten Daten leicht vektorisieren, sodass Operationen auf ganze Spalten auf einmal angewendet werden können, was die Leistung weiter steigert.</p>
<h2 id="What-Makes-Milvus-so-Scalable" class="common-anchor-header">Was Milvus so skalierbar macht<button data-href="#What-Makes-Milvus-so-Scalable" class="anchor-icon" translate="no">
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
    </button></h2><p>Im Jahr 2022 unterstützte Milvus Vektoren im Milliardenbereich, und im Jahr 2023 skalierte es bei konstanter Stabilität auf mehrere zehn Milliarden, wodurch groß angelegte Szenarien für über 300 große Unternehmen ermöglicht wurden, darunter Salesforce, PayPal, Shopee, Airbnb, eBay, NVIDIA, IBM, AT&amp;T, LINE, ROBLOX, Inflection usw.</p>
<p>Die cloudnative und stark entkoppelte Systemarchitektur von Milvus stellt sicher, dass das System mit dem Datenwachstum kontinuierlich erweitert werden kann:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_architecture_2_6.png" alt="Highly decoupled system architecture of Milvus" class="doc-image" id="highly-decoupled-system-architecture-of-milvus" /> 
   <span>Stark entkoppelte Systemarchitektur von Milvus</span>
  
 </span></p>
<p>Milvus selbst ist vollständig zustandslos und lässt sich daher mithilfe von Kubernetes oder öffentlichen Clouds problemlos skalieren. Darüber hinaus sind die Milvus-Komponenten gut entkoppelt: Die drei wichtigsten Aufgaben – Suche, Dateneinfügung sowie Indizierung/Kompaktierung – sind als leicht parallelisierbare Prozesse konzipiert, wobei komplexe Logik ausgegliedert wurde. Dies gewährleistet, dass die entsprechenden Abfrage-, Daten- und Indexknoten sowohl vertikal als auch horizontal unabhängig voneinander skaliert werden können, wodurch Leistung und Kosteneffizienz optimiert werden.</p>
<h2 id="Types-of-Searches-Supported-by-Milvus" class="common-anchor-header">Von Milvus unterstützte Sucharten<button data-href="#Types-of-Searches-Supported-by-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus unterstützt verschiedene Suchfunktionen, um den Anforderungen unterschiedlicher Anwendungsfälle gerecht zu werden:</p>
<ul>
<li><a href="/docs/de/single-vector-search.md#Basic-search">ANN-Suche</a>: Findet die K Vektoren, die Ihrem Suchvektor am nächsten liegen.</li>
<li><a href="/docs/de/single-vector-search.md#Filtered-search">Filter-Suche</a>: Führt eine ANN-Suche unter festgelegten Filterbedingungen durch.</li>
<li><a href="/docs/de/single-vector-search.md#Range-search">Bereichssuche</a>: Findet Vektoren innerhalb eines festgelegten Radius um Ihren Suchvektor.</li>
<li><a href="/docs/de/multi-vector-search.md">Hybridsuche</a>: Führt eine ANN-Suche auf der Grundlage mehrerer Vektorfelder durch.</li>
<li><a href="/docs/de/full-text-search.md">Volltextsuche</a>: Volltextsuche auf Basis von BM25.</li>
<li><a href="/docs/de/weighted-ranker.md">Neurangierung</a>: Passt die Reihenfolge der Suchergebnisse anhand zusätzlicher Kriterien oder eines sekundären Algorithmus an und verfeinert so die ursprünglichen ANN-Suchergebnisse.</li>
<li><a href="/docs/de/get-and-scalar-query.md#Get-Entities-by-ID">Abruf</a>: Ruft Daten anhand ihrer Primärschlüssel ab.</li>
<li><a href="/docs/de/get-and-scalar-query.md#Use-Basic-Operators">Abfrage</a>: Ruft Daten anhand spezifischer Ausdrücke ab.</li>
</ul>
<h2 id="Comprehensive-Feature-Set" class="common-anchor-header">Umfassender Funktionsumfang<button data-href="#Comprehensive-Feature-Set" class="anchor-icon" translate="no">
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
    </button></h2><p>Zusätzlich zu den oben genannten zentralen Suchfunktionen bietet Milvus eine Reihe von Funktionen rund um die ANN-Suche, damit Sie deren Möglichkeiten voll ausschöpfen können.</p>
<h3 id="API-and-SDK" class="common-anchor-header">API und SDK<button data-href="#API-and-SDK" class="anchor-icon" translate="no">
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
<li><a href="https://milvus.io/api-reference/restful/v2.6.x/About.md">RESTful-API</a> (offiziell)</li>
<li><a href="https://milvus.io/api-reference/pymilvus/v2.6.x/About.md">PyMilvus</a> (Python-SDK) (offiziell)</li>
<li><a href="https://milvus.io/api-reference/go/v2.6.x/About.md">Go-SDK</a> (offiziell)</li>
<li><a href="https://milvus.io/api-reference/java/v2.6.x/About.md">Java-SDK</a> (offiziell)</li>
<li><a href="https://milvus.io/api-reference/node/v2.6.x/About.md">Node.js</a> (JavaScript) SDK (offiziell)</li>
<li><a href="https://milvus.io/api-reference/csharp/v2.2.x/About.md">C#</a> (von Microsoft bereitgestellt)</li>
<li><a href="https://milvus.io/api-reference/cpp/v2.6.x/About.md">C++ SDK</a> (offiziell)</li>
<li>Rust SDK (in Entwicklung)</li>
</ul>
<h3 id="Advanced-Data-Types" class="common-anchor-header">Erweiterte Datentypen<button data-href="#Advanced-Data-Types" class="anchor-icon" translate="no">
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
    </button></h3><p>Neben den primitiven Datentypen unterstützt Milvus verschiedene erweiterte Datentypen und die jeweils anwendbaren Abstandsmetriken.</p>
<ul>
<li><a href="/docs/de/sparse_vector.md">Sparse-Vektoren</a></li>
<li><a href="/docs/de/index-vector-fields.md">Binäre Vektoren</a></li>
<li><a href="/docs/de/use-json-fields.md">JSON-Unterstützung</a></li>
<li><a href="/docs/de/array_data_type.md">Array-Unterstützung</a></li>
<li><a href="/docs/de/geometry-field.md">Geolokalisierung</a></li>
<li>Text (in Entwicklung)</li>
</ul>
<h3 id="Why-Milvus" class="common-anchor-header">Warum Milvus?<button data-href="#Why-Milvus" class="anchor-icon" translate="no">
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
<li><p><strong>Hohe Leistung bei Skalierbarkeit und hoher Verfügbarkeit</strong></p>
<p>Milvus verfügt über eine <a href="/docs/de/architecture_overview.md">verteilte Architektur</a>, die <a href="/docs/de/data_processing.md#Data-query">Rechenleistung</a> und <a href="/docs/de/data_processing.md#Data-insertion">Speicher</a> voneinander trennt. Milvus lässt sich horizontal skalieren und an unterschiedliche Zugriffsmuster anpassen. So wird optimale Leistung erzielt, indem bei leseintensiven Workloads die Anzahl der Abfrageknoten und bei schreibintensiven Workloads die Anzahl der Datenknoten unabhängig voneinander erhöht wird. Die zustandslosen Microservices auf K8s ermöglichen <a href="/docs/de/coordinator_ha.md#Coordinator-HA">eine schnelle Wiederherstellung</a> nach Ausfällen und gewährleisten so eine hohe Verfügbarkeit. Die Unterstützung von <a href="/docs/de/replica.md">Replikaten</a> verbessert die Fehlertoleranz und den Durchsatz zusätzlich, indem Datensegmente auf mehrere Abfrageknoten verteilt werden. Siehe <a href="https://zilliz.com/vector-database-benchmark-tool">Benchmark</a> für einen Leistungsvergleich.</p></li>
<li><p><strong>Unterstützung verschiedener Vektorindex-Typen und Hardwarebeschleunigung</strong></p>
<p>Milvus trennt das System von der zentralen Vektorsuchmaschine und unterstützt so alle wichtigen Vektorindextypen, die für unterschiedliche Szenarien optimiert sind, darunter HNSW, IVF, FLAT (Brute-Force), SCANN und DiskANN, einschließlich <a href="/docs/de/index-explained.md">quantisierungsbasierter</a> Varianten und <a href="/docs/de/mmap.md">mmap</a>. Milvus optimiert die Vektorsuche für erweiterte Funktionen wie <a href="/docs/de/boolean.md">Metadatenfilterung</a> und <a href="/docs/de/range-search.md">Bereichssuche</a>. Darüber hinaus implementiert Milvus Hardwarebeschleunigung zur Steigerung der Vektorsuchleistung und unterstützt GPU-Indizierung, wie beispielsweise NVIDIA <a href="/docs/de/gpu-cagra.md">CAGRA</a>.</p></li>
<li><p><strong>Flexible Mandantenfähigkeit und Hot/Cold-Speicher</strong></p>
<p>Milvus unterstützt <a href="/docs/de/multi_tenancy.md#Multi-tenancy-strategies">Multi-Tenancy</a> durch Isolation auf Datenbank-, Collection-, Partitions- oder Partitionsschlüsselebene. Die flexiblen Strategien ermöglichen es einem einzelnen Cluster, Hunderte bis Millionen von Mandanten zu verwalten, und gewährleisten zudem eine optimierte Suchleistung sowie eine flexible Zugriffskontrolle. Milvus steigert die Kosteneffizienz durch Hot-/Cold-Speicher. Häufig abgerufene „Hot“-Daten können zur Leistungssteigerung im Arbeitsspeicher oder auf SSDs gespeichert werden, während seltener abgerufene „Cold“-Daten auf langsameren, kostengünstigen Speichermedien aufbewahrt werden. Dieser Mechanismus kann die Kosten erheblich senken und gleichzeitig eine hohe Leistung für kritische Aufgaben gewährleisten.</p></li>
<li><p><strong>Sparse-Vektoren für Volltextsuche und hybride Suche</strong></p>
<p>Neben der semantischen Suche mittels „Dense Vector“ unterstützt Milvus nativ auch <a href="/docs/de/full-text-search.md">die Volltextsuche</a> mit BM25 sowie trainierte „Sparse Embeddings“ wie SPLADE und BGE-M3. Benutzer können „Sparse Vectors“ und „Dense Vectors“ in derselben Sammlung speichern und Funktionen definieren, um die Ergebnisse aus mehreren Suchanfragen neu zu ordnen. Siehe Beispiele für <a href="/docs/de/full_text_search_with_milvus.md">die hybride Suche mit semantischer Suche + Volltextsuche</a>.</p></li>
<li><p><strong>Datensicherheit und fein abgestufte Zugriffskontrolle</strong></p>
<p>Milvus gewährleistet Datensicherheit durch die Implementierung <a href="/docs/de/authenticate.md">einer obligatorischen Benutzerauthentifizierung</a>, <a href="/docs/de/tls.md">TLS-Verschlüsselung</a> und <a href="/docs/de/rbac.md">rollenbasierter Zugriffskontrolle (RBAC)</a>. Die Benutzerauthentifizierung stellt sicher, dass nur autorisierte Benutzer mit gültigen Anmeldedaten auf die Datenbank zugreifen können, während die TLS-Verschlüsselung die gesamte Kommunikation innerhalb des Netzwerks schützt. Darüber hinaus ermöglicht RBAC eine fein abgestufte Zugriffskontrolle, indem Benutzern je nach ihrer Rolle spezifische Berechtigungen zugewiesen werden. Diese Funktionen machen Milvus zu einer robusten und sicheren Wahl für Unternehmensanwendungen und schützen sensible Daten vor unbefugtem Zugriff und potenziellen Sicherheitsverletzungen.</p></li>
</ul>
<h3 id="AI-Integrations" class="common-anchor-header">KI-Integrationen<button data-href="#AI-Integrations" class="anchor-icon" translate="no">
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
<li><p>Integration von Einbettungsmodellen
Einbettungsmodelle wandeln unstrukturierte Daten in ihre numerische Darstellung in einem hochdimensionalen Datenraum um, sodass Sie diese in Milvus speichern können. Derzeit integriert PyMilvus, das Python-SDK, mehrere Einbettungsmodelle, mit denen Sie Ihre Daten schnell in Vektoreinbettungen aufbereiten können. Weitere Informationen finden Sie unter <a href="/docs/de/embeddings.md">„Übersicht über Einbettungsmodelle</a>“.</p></li>
<li><p>Integration von Reranking-Modellen
Im Bereich der Informationsgewinnung und der generativen KI ist ein Reranker ein unverzichtbares Werkzeug, das die Reihenfolge der Ergebnisse aus ersten Suchläufen optimiert. PyMilvus integriert ebenfalls mehrere Reranking-Modelle, um die Reihenfolge der aus ersten Suchläufen zurückgegebenen Ergebnisse zu optimieren. Weitere Informationen finden Sie unter <a href="/docs/de/rerankers-overview.md">„Übersicht über Reranker</a>“.</p></li>
<li><p>Integration von LangChain und anderen KI-Tools
Im Zeitalter der generativen KI (GenAI) finden Tools wie LangChain große Beachtung bei Anwendungsentwicklern. Als Kernkomponente dient Milvus in solchen Tools in der Regel als Vektorspeicher. Informationen zur Integration von Milvus in Ihre bevorzugten KI-Tools finden Sie unter <a href="/docs/de/integrate_with_openai.md">„Integrationen</a> und <a href="/docs/de/build-rag-with-milvus.md">Tutorials</a>“.</p></li>
</ul>
<h3 id="Tools-and-Ecosystem" class="common-anchor-header">Tools und Ökosystem<button data-href="#Tools-and-Ecosystem" class="anchor-icon" translate="no">
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
<li><p>Attu
Attu ist eine intuitive All-in-One-GUI, die Ihnen bei der Verwaltung von Milvus und den darin gespeicherten Daten hilft. Weitere Informationen finden Sie im <a href="https://github.com/zilliztech/attu">Attu-Repository</a>.</p></li>
<li><p>Birdwatcher
Birdwatcher ist ein Debugging-Tool für Milvus. Wenn Sie damit eine Verbindung zu etcd herstellen, können Sie den Status Ihres Milvus-Systems überprüfen oder es im laufenden Betrieb konfigurieren. Weitere Informationen finden Sie unter <a href="/docs/de/birdwatcher_overview.md">BirdWatcher</a>.</p></li>
<li><p>Prometheus- und Grafana-Integrationen
Prometheus ist ein Open-Source-Toolkit zur Systemüberwachung und Alarmierung für Kubernetes. Grafana ist ein Open-Source-Visualisierungsstack, der sich mit allen Datenquellen verbinden lässt. Sie können Prometheus und Grafana als Überwachungsdienstleister nutzen, um die Leistung des verteilten Milvus-Systems visuell zu überwachen. Weitere Informationen finden Sie unter <a href="/docs/de/monitor.md">„Bereitstellung von Überwachungsdiensten</a>“.</p></li>
<li><p>Milvus Backup
Milvus Backup ist ein Tool, mit dem Benutzer Milvus-Daten sichern und wiederherstellen können. Es bietet sowohl eine CLI als auch eine API, um sich an verschiedene Anwendungsszenarien anzupassen. Weitere Informationen finden Sie unter <a href="/docs/de/milvus_backup_overview.md">„Milvus Backup</a>“.</p></li>
<li><p>Milvus Capture Data Change (CDC)
Milvus CDC kann Datenänderungen von einem Milvus-Cluster in einen anderen replizieren und ermöglicht so eine Disaster Recovery im Primär-Standby-Modus. Weitere Informationen finden Sie unter <a href="/docs/de/milvus_cdc_overview.md">„Milvus CDC</a>“.</p></li>
<li><p>Milvus-Konnektoren
Milvus bietet eine Reihe von Konnektoren, mit denen Sie Milvus nahtlos in Tools von Drittanbietern wie Apache Spark integrieren können. Derzeit können Sie unseren Spark-Konnektor nutzen, um Ihre Milvus-Daten zur Verarbeitung im Rahmen des maschinellen Lernens an Apache Spark zu übermitteln. Weitere Informationen finden Sie unter <a href="/docs/de/integrate_with_spark.md">„Spark-Milvus-Konnektor</a>“.</p></li>
<li><p>Vector Transmission Services (VTS)
Milvus bietet eine Reihe von Tools, mit denen Sie Ihre Daten zwischen einer Milvus-Instanz und verschiedenen Datenquellen übertragen können, darunter Zilliz-Cluster, Elasticsearch, Postgres (PgVector) und eine andere Milvus-Instanz. Weitere Informationen finden Sie unter <a href="https://github.com/zilliztech/vts">VTS</a>.</p></li>
</ul>
