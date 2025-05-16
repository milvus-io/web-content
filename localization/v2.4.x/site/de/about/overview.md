---
id: overview.md
title: Was ist Milvus
related_key: Milvus Overview
summary: >-
  Milvus ist eine leistungsstarke, hoch skalierbare Vektordatenbank, die
  effizient in einer Vielzahl von Umgebungen läuft, von einem Laptop bis hin zu
  großen verteilten Systemen. Sie ist sowohl als Open-Source-Software als auch
  als Cloud-Service verfügbar.
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
    </button></h1><p>Milvus ist eine leistungsstarke, hoch skalierbare Vektordatenbank, die effizient in einer Vielzahl von Umgebungen läuft, von einem Laptop bis hin zu großen verteilten Systemen. Sie ist sowohl als Open-Source-Software als auch als Cloud-Service verfügbar.</p>
<p>Milvus ist ein Open-Source-Projekt der LF AI &amp; Data Foundation und steht unter der Apache 2.0-Lizenz. Die meisten Mitwirkenden sind Experten aus der High-Performance-Computing (HPC)-Gemeinschaft, die sich auf den Aufbau von Großsystemen und die Optimierung von hardwaregerechtem Code spezialisiert haben. Zu den wichtigsten Mitwirkenden gehören Experten von Zilliz, ARM, NVIDIA, AMD, Intel, Meta, IBM, Salesforce, Alibaba und Microsoft.</p>
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
    </button></h2><p>Unstrukturierte Daten, wie z. B. Text, Bilder und Audio, variieren in ihrem Format und weisen eine umfangreiche zugrunde liegende Semantik auf, was ihre Analyse schwierig macht. Um diese Komplexität zu bewältigen, werden Einbettungen verwendet, um unstrukturierte Daten in numerische Vektoren umzuwandeln, die ihre wesentlichen Merkmale erfassen. Diese Vektoren werden dann in einer Vektordatenbank gespeichert, die schnelle und skalierbare Such- und Analysevorgänge ermöglicht.</p>
<p>Milvus bietet robuste Datenmodellierungsfunktionen, mit denen Sie Ihre unstrukturierten oder multimodalen Daten in strukturierten Sammlungen organisieren können. Milvus unterstützt eine breite Palette von Datentypen für die Modellierung verschiedener Attribute, darunter gängige Zahlen- und Zeichentypen, verschiedene Vektortypen, Arrays, Sets und JSON, was Ihnen den Aufwand für die Pflege mehrerer Datenbanksysteme erspart.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/unstructured-data-embedding-and-milvus.png" alt="Untructured data, embeddings, and Milvus" class="doc-image" id="untructured-data,-embeddings,-and-milvus" />
   </span> <span class="img-wrapper"> <span>Unstrukturierte Daten, Einbettungen und Milvus</span> </span></p>
<p>Milvus bietet drei Bereitstellungsmodi, die ein breites Spektrum an Datenskalen abdecken - vom lokalen Prototyping in Jupyter Notebooks bis hin zu massiven Kubernetes-Clustern, die Dutzende von Milliarden Vektoren verwalten:</p>
<ul>
<li>Milvus Lite ist eine Python-Bibliothek, die einfach in Ihre Anwendungen integriert werden kann. Als leichtgewichtige Version von Milvus ist sie ideal für schnelles Prototyping in Jupyter Notebooks oder die Ausführung auf Edge-Geräten mit begrenzten Ressourcen. <a href="/docs/de/v2.4.x/milvus_lite.md">Erfahren Sie mehr</a>.</li>
<li>Milvus Standalone ist eine Serverimplementierung für eine einzelne Maschine, bei der alle Komponenten in einem einzigen Docker-Image gebündelt sind, um eine einfache Bereitstellung zu ermöglichen. <a href="/docs/de/v2.4.x/install_standalone-docker.md">Erfahren Sie mehr</a>.</li>
<li>Milvus Distributed kann auf Kubernetes-Clustern bereitgestellt werden und verfügt über eine Cloud-native Architektur, die für Szenarien im Milliardenmaßstab oder noch größer ausgelegt ist. Diese Architektur gewährleistet Redundanz bei kritischen Komponenten. <a href="/docs/de/v2.4.x/install_cluster-milvusoperator.md">Erfahren Sie mehr</a>.</li>
</ul>
<h2 id="What-Makes-Milvus-so-Fast" class="common-anchor-header">Was macht Milvus so schnell？<button data-href="#What-Makes-Milvus-so-Fast" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus wurde vom ersten Tag an als hocheffizientes Vektordatenbanksystem konzipiert. In den meisten Fällen übertrifft Milvus andere Vektordatenbanken um das 2-5fache (siehe die Ergebnisse des VectorDBBench). Diese hohe Leistung ist das Ergebnis mehrerer wichtiger Designentscheidungen:</p>
<p><strong>Hardware-gerechte Optimierung</strong>: Um Milvus in verschiedenen Hardwareumgebungen einsetzen zu können, haben wir seine Leistung speziell für viele Hardwarearchitekturen und Plattformen optimiert, darunter AVX512, SIMD, GPUs und NVMe SSD.</p>
<p><strong>Erweiterte Suchalgorithmen</strong>: Milvus unterstützt eine breite Palette von In-Memory- und On-Disk-Indizierungs-/Suchalgorithmen, einschließlich IVF, HNSW, DiskANN und mehr, die alle tiefgreifend optimiert wurden. Im Vergleich zu gängigen Implementierungen wie FAISS und HNSWLib bietet Milvus eine um 30-70 % bessere Leistung.</p>
<p><strong>Suchmaschine in C++</strong>: Über 80 % der Leistung einer Vektordatenbank wird durch ihre Suchmaschine bestimmt. Milvus verwendet C++ für diese kritische Komponente aufgrund der hohen Leistung, der Low-Level-Optimierung und der effizienten Ressourcenverwaltung dieser Sprache. Am wichtigsten ist jedoch, dass Milvus zahlreiche hardwarenahe Code-Optimierungen integriert, die von Vektorisierung auf Assembler-Ebene bis hin zu Multi-Thread-Parallelisierung und Scheduling reichen, um die Möglichkeiten der Hardware voll auszuschöpfen.</p>
<p><strong>Spaltenorientiert</strong>: Milvus ist ein spaltenorientiertes Vektor-Datenbanksystem. Die Hauptvorteile ergeben sich aus den Datenzugriffsmustern. Bei der Durchführung von Abfragen liest eine spaltenorientierte Datenbank nur die spezifischen Felder, die an der Abfrage beteiligt sind, und nicht ganze Zeilen, was die Menge der abgerufenen Daten erheblich reduziert. Darüber hinaus können Operationen auf spaltenbasierte Daten leicht vektorisiert werden, so dass Operationen auf die gesamten Spalten auf einmal angewendet werden können, was die Leistung weiter verbessert.</p>
<h2 id="What-Makes-Milvus-so-Scalable" class="common-anchor-header">Was macht Milvus so skalierbar?<button data-href="#What-Makes-Milvus-so-Scalable" class="anchor-icon" translate="no">
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
    </button></h2><p>Im Jahr 2022 unterstützte Milvus Vektoren im Milliardenbereich und im Jahr 2023 skalierte es mit gleichbleibender Stabilität auf Dutzende von Milliarden und unterstützte Großszenarien für über 300 große Unternehmen, darunter Salesforce, PayPal, Shopee, Airbnb, eBay, NVIDIA, IBM, AT&amp;T, LINE, ROBLOX, Inflection usw.</p>
<p>Die Cloud-native und hochgradig entkoppelte Systemarchitektur von Milvus stellt sicher, dass das System kontinuierlich mit dem Datenwachstum wachsen kann:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/highly-decoupled-architecture.png" alt="Highly decoupled system architecture of Milvus" class="doc-image" id="highly-decoupled-system-architecture-of-milvus" />
   </span> <span class="img-wrapper"> <span>Hochgradig entkoppelte Systemarchitektur von Milvus</span> </span></p>
<p>Milvus selbst ist vollständig zustandslos, sodass es mit Hilfe von Kubernetes oder öffentlichen Clouds leicht skaliert werden kann. Darüber hinaus sind die Milvus-Komponenten gut entkoppelt, wobei die drei kritischsten Aufgaben - die Suche, das Einfügen von Daten und die Indizierung/Verdichtung - als leicht parallelisierbare Prozesse konzipiert sind, bei denen die komplexe Logik ausgegliedert ist. Dadurch wird sichergestellt, dass die entsprechenden Abfrage-, Daten- und Indexknoten unabhängig voneinander skaliert werden können, wodurch Leistung und Kosteneffizienz optimiert werden.</p>
<h2 id="Types-of-Searches-Supported-by-Milvus" class="common-anchor-header">Von Milvus unterstützte Arten von Suchvorgängen<button data-href="#Types-of-Searches-Supported-by-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus unterstützt verschiedene Arten von Suchfunktionen, um die Anforderungen verschiedener Anwendungsfälle zu erfüllen:</p>
<ul>
<li><a href="/docs/de/v2.4.x/single-vector-search.md#Basic-search">ANN-Suche</a>: Findet die besten K Vektoren, die Ihrem Abfragevektor am nächsten kommen.</li>
<li><a href="/docs/de/v2.4.x/single-vector-search.md#Filtered-search">Filternde Suche</a>: Führt eine ANN-Suche unter bestimmten Filterbedingungen durch.</li>
<li><a href="/docs/de/v2.4.x/single-vector-search.md#Range-search">Bereichssuche</a>: Findet Vektoren innerhalb eines bestimmten Radius von Ihrem Abfragevektor.</li>
<li><a href="/docs/de/v2.4.x/multi-vector-search.md">Hybride Suche</a>: Führt die ANN-Suche auf der Grundlage mehrerer Vektorfelder durch.</li>
<li>Schlüsselwort-Suche: Schlüsselwortsuche auf der Grundlage von BM25.</li>
<li><a href="/docs/de/v2.4.x/reranking.md">Neu ordnen</a>: Passt die Reihenfolge der Suchergebnisse auf der Grundlage zusätzlicher Kriterien oder eines sekundären Algorithmus an und verfeinert die ursprünglichen ANN-Suchergebnisse.</li>
<li><a href="/docs/de/v2.4.x/get-and-scalar-query.md#Get-Entities-by-ID">Abrufen</a>: Ruft Daten anhand ihrer Primärschlüssel ab.</li>
<li><a href="/docs/de/v2.4.x/get-and-scalar-query.md#Use-Basic-Operators">Abfragen</a>: Ruft Daten anhand bestimmter Ausdrücke ab.</li>
</ul>
<h2 id="Comprehensive-Feature-Set" class="common-anchor-header">Umfassender Funktionssatz<button data-href="#Comprehensive-Feature-Set" class="anchor-icon" translate="no">
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
    </button></h2><p>Zusätzlich zu den oben erwähnten Schlüsselfunktionen bietet Milvus eine Reihe von Funktionen, die um ANN-Suchen herum implementiert wurden, so dass Sie die Möglichkeiten von Milvus voll ausschöpfen können.</p>
<h3 id="API-and-SDK" class="common-anchor-header">API und SDK</h3><ul>
<li><a href="https://milvus.io/api-reference/restful/v2.4.x/About.md">RESTful API</a> (offiziell)</li>
<li><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">PyMilvus</a> (Python SDK) (offiziell)</li>
<li><a href="https://milvus.io/api-reference/go/v2.4.x/About.md">Go SDK</a> (offiziell)</li>
<li><a href="https://milvus.io/api-reference/java/v2.4.x/About.md">Java SDK</a> (offiziell)</li>
<li><a href="https://milvus.io/api-reference/node/v2.4.x/About.md">Node.js</a> (JavaScript) SDK (offiziell)</li>
<li><a href="https://milvus.io/api-reference/csharp/v2.2.x/About.md">C#</a> (beigesteuert von Microsoft)</li>
</ul>
<h3 id="Advanced-Data-Types" class="common-anchor-header">Erweiterte Datentypen</h3><p>Zusätzlich zu den primitiven Datentypen unterstützt Milvus verschiedene fortgeschrittene Datentypen und ihre jeweils anwendbaren Abstandsmetriken.</p>
<ul>
<li><a href="/docs/de/v2.4.x/sparse_vector.md">Spärliche Vektoren</a></li>
<li><a href="/docs/de/v2.4.x/index-vector-fields.md">Binäre Vektoren</a></li>
<li><a href="/docs/de/v2.4.x/use-json-fields.md">JSON-Unterstützung</a></li>
<li><a href="/docs/de/v2.4.x/array_data_type.md">Array-Unterstützung</a></li>
<li><a href="/docs/de/v2.4.x/metric.md">Abstandsmetriken</a></li>
</ul>
<h3 id="Acceleration" class="common-anchor-header">Beschleunigung</h3><ul>
<li><p>Suchalgorithmen Milvus unterstützt eine Reihe von einstellbaren Indizierungs- und Suchalgorithmen. Details finden Sie unter <a href="/docs/de/v2.4.x/index.md">In-memory Index</a>, <a href="/docs/de/v2.4.x/disk_index.md">On-disk Index</a> und <a href="/docs/de/v2.4.x/gpu_index.md">GPU Index</a>.</p></li>
<li><p>Partitionen und Partitionsschlüssel Partitionen sind Unterabteilungen einer Milvus-Sammlung. Sie können ein skalares Feld als Partitionsschlüssel wählen, um die Suchleistung zu verbessern. Weitere Informationen finden Sie unter <a href="/docs/de/v2.4.x/manage-partitions.md">Verwalten von Partitionen</a> und <a href="/docs/de/v2.4.x/use-partition-key.md">Verwenden von Partitionsschlüsseln</a>.</p></li>
<li><p>Abstimmbares Konsistenzmodell Konsistenz stellt sicher, dass jeder Milvus-Knoten oder jede Replik dieselbe Sicht auf die Daten hat, wenn sie zu einem bestimmten Zeitpunkt Daten schreiben oder lesen. Sie können die Konsistenzstufe bei der Durchführung von ANN-Suchen in Milvus leicht abstimmen. Details finden Sie unter <a href="/docs/de/v2.4.x/consistency.md">Konsistenz</a>.</p></li>
<li><p>Hochdurchsatz-Datenimport Um eine große Datenmenge in Milvus zu importieren, anstatt sie nacheinander einzufügen, sollten Sie unsere Hochdurchsatz-Datenimport-Tools verwenden. Einzelheiten finden Sie unter <a href="/docs/de/v2.4.x/prepare-source-data.md">Vorbereiten von Quelldaten</a> und <a href="/docs/de/v2.4.x/import-data.md">Importieren von Daten</a>.</p></li>
<li><p>Unterstützung von Mehrmandantenfähigkeit Milvus hat viele Funktionen implementiert, die auf Mehrmandantenszenarien ausgerichtet sind, einschließlich Partitionsschlüssel, Clustering-Schlüssel und mehr. Details finden Sie unter <a href="/docs/de/v2.4.x/multi_tenancy.md">Mehrmandanten-Strategien</a>.</p></li>
</ul>
<h3 id="Security-and-Authorization" class="common-anchor-header">Sicherheit und Autorisierung</h3><ul>
<li><p>Abstimmbares Konsistenzmodell Konsistenz stellt sicher, dass jeder Milvus-Knoten oder jede Replik dieselbe Sicht auf die Daten hat, wenn sie zu einem bestimmten Zeitpunkt Daten schreiben oder lesen. Sie können die Konsistenzstufe bei der Durchführung von ANN-Suchen in Milvus leicht abstimmen. Für Details siehe <a href="/docs/de/v2.4.x/consistency.md">Konsistenz</a>.</p></li>
<li><p>Datenisolierung und Ressourcenkontrolle Für Multi-Tenancy-Szenarien ist die Datenisolierung die grundlegende Sicherheitsanforderung. Milvus implementiert mehrere Funktionen, um Ihre Sicherheitsbedenken auszuräumen. Details finden Sie unter <a href="/docs/de/v2.4.x/resource_group.md">Verwalten von Ressourcengruppen</a> und <a href="/docs/de/v2.4.x/clustering-compaction.md">Clustering Compaction</a>.</p></li>
</ul>
<h3 id="AI-Integrations" class="common-anchor-header">AI-Integrationen</h3><ul>
<li><p>Einbettungsmodell-Integrationen Einbettungsmodelle konvertieren unstrukturierte Daten in ihre numerische Darstellung im hochdimensionalen Datenraum, so dass Sie sie in Milvus speichern können. Derzeit sind in PyMilvus, dem Python-SDK, mehrere Einbettungsmodelle integriert, so dass Sie Ihre Daten schnell in Vektoreinbettungen aufbereiten können. Details finden Sie unter <a href="/docs/de/v2.4.x/embeddings.md">Einbettungsübersicht</a>.</p></li>
<li><p>Integration von Reranking-Modellen Im Bereich des Information Retrieval und der generativen KI ist ein Reranker ein unverzichtbares Werkzeug, das die Reihenfolge der Ergebnisse der ersten Suche optimiert. PyMilvus integriert auch mehrere Reranking-Modelle, um die Reihenfolge der Ergebnisse aus den ersten Suchen zu optimieren. Weitere Informationen finden Sie unter <a href="/docs/de/v2.4.x/rerankers-overview.md">Rerankers Übersicht</a>.</p></li>
<li><p>LangChain und andere KI-Tool-Integrationen In der GenAI-Ära gewinnen Tools wie LangChain viel Aufmerksamkeit von Anwendungsentwicklern. Als Kernkomponente dient Milvus normalerweise als Vektorspeicher in solchen Tools. Um zu erfahren, wie Sie Milvus in Ihre bevorzugten KI-Tools integrieren können, lesen Sie bitte unsere <a href="/docs/de/v2.4.x/integrate_with_openai.md">Integrationen</a> und <a href="/docs/de/v2.4.x/build-rag-with-milvus.md">Tutorials</a>.</p></li>
</ul>
<h3 id="Tools-and-Ecosystem" class="common-anchor-header">Werkzeuge und Ökosystem</h3><ul>
<li><p>Attu Attu ist eine intuitiv bedienbare Benutzeroberfläche, mit der Sie Milvus und die darin gespeicherten Daten verwalten können. Details finden Sie im <a href="https://github.com/zilliztech/attu">Attu-Repository</a>.</p></li>
<li><p>Birdwatcher Birdwatcher ist ein Debugging-Tool für Milvus. Mit ihm können Sie sich mit etcd verbinden, um den Zustand Ihres Milvus-Systems zu überprüfen oder es im laufenden Betrieb zu konfigurieren. Details finden Sie unter <a href="/docs/de/v2.4.x/birdwatcher_overview.md">BirdWatcher</a>.</p></li>
<li><p>Promethus- und Grafana-Integrationen Prometheus ist ein Open-Source-Toolkit zur Systemüberwachung und Alarmierung für Kubernetes. Grafana ist ein Open-Source-Visualisierungs-Stack, der mit allen Datenquellen verbunden werden kann. Sie können Promethus &amp; Grafana als Überwachungsdienstanbieter verwenden, um die Leistung von Milvus distributed visuell zu überwachen. Details finden Sie unter <a href="/docs/de/v2.4.x/monitor.md">Bereitstellen von Überwachungsdiensten</a>.</p></li>
<li><p>Milvus Backup Milvus Backup ist ein Tool, mit dem Benutzer Milvus-Daten sichern und wiederherstellen können. Es bietet sowohl CLI als auch API, um sich in verschiedene Anwendungsszenarien einzupassen. Einzelheiten finden Sie unter <a href="/docs/de/v2.4.x/milvus_backup_overview.md">Milvus Backup</a>.</p></li>
<li><p>Milvus Capture Data Change (CDC) Milvus-CDC kann inkrementelle Daten in Milvus-Instanzen erfassen und synchronisieren und stellt die Zuverlässigkeit von Geschäftsdaten sicher, indem es sie nahtlos zwischen Quell- und Zielinstanzen überträgt, was eine einfache inkrementelle Sicherung und Notfallwiederherstellung ermöglicht. Einzelheiten finden Sie unter <a href="/docs/de/v2.4.x/milvus-cdc-overview.md">Milvus CDC</a>.</p></li>
<li><p>Milvus-Konnektoren Milvus hat eine Reihe von Konnektoren für die nahtlose Integration von Milvus mit Tools von Drittanbietern, wie z. B. Apache Spark, geplant. Derzeit können Sie unseren Spark-Konnektor verwenden, um Ihre Milvus-Daten für die Verarbeitung durch maschinelles Lernen in Apache Spark einzuspeisen. Einzelheiten finden Sie unter <a href="/docs/de/v2.4.x/integrate_with_spark.md">Spark-Milvus Connector</a>.</p></li>
<li><p>Vector Transmission Services (VTS) Milvus bietet eine Reihe von Tools, mit denen Sie Ihre Daten zwischen einer Milvus-Instanz und einer Reihe von Datenquellen übertragen können, darunter Zilliz-Cluster, Elasticsearch, Postgres (PgVector) und eine andere Milvus-Instanz. Einzelheiten finden Sie unter <a href="https://github.com/zilliztech/vts">VTS</a>.</p></li>
</ul>
