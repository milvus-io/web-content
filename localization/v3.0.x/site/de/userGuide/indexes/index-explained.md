---
id: index-explained.md
title: Erläuterung zum Index
summary: >-
  Ein Index ist eine zusätzliche Struktur, die auf den Daten aufbaut. Seine
  interne Struktur hängt vom verwendeten Algorithmus für die ungefähre Suche
  nach dem nächsten Nachbarn ab. Ein Index beschleunigt die Suche, verursacht
  jedoch während der Suche zusätzlichen Aufwand bei der Vorverarbeitung sowie
  zusätzlichen Speicherplatz- und RAM-Bedarf. Darüber hinaus senkt die
  Verwendung eines Index in der Regel die Recall-Rate (auch wenn der Effekt
  vernachlässigbar ist, spielt er dennoch eine Rolle). Daher wird in diesem
  Artikel erläutert, wie sich die Kosten für die Verwendung eines Index
  minimieren und gleichzeitig die Vorteile maximieren lassen.
---
<h1 id="Index-Explained" class="common-anchor-header">Erläuterung zum Index<button data-href="#Index-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Ein Index ist eine zusätzliche Struktur, die auf den Daten aufbaut. Seine interne Struktur hängt vom verwendeten Algorithmus für die ungefähre Suche nach dem nächsten Nachbarn ab. Ein Index beschleunigt die Suche, verursacht jedoch während der Suche zusätzlichen Aufwand bei der Vorverarbeitung sowie zusätzlichen Speicherplatz- und RAM-Bedarf. Darüber hinaus senkt die Verwendung eines Index in der Regel die Recall-Rate (auch wenn der Effekt vernachlässigbar ist, spielt er dennoch eine Rolle). Daher wird in diesem Artikel erläutert, wie sich die Kosten für die Verwendung eines Index minimieren und gleichzeitig die Vorteile maximieren lassen.</p>
<h2 id="Overview" class="common-anchor-header">Überblick<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>In Milvus sind Indizes feldspezifisch, und die anwendbaren Indextypen variieren je nach den Datentypen der Zielfelder. Als professionelle Vektordatenbank konzentriert sich Milvus darauf, sowohl die Leistung der Vektorsuche als auch die der skalaren Filterung zu verbessern, weshalb es verschiedene Indextypen anbietet.</p>
<p>Die folgende Tabelle listet die Zuordnung zwischen Felddatentypen und den entsprechenden Indextypen auf.</p>
<table>
   <tr>
     <th><p>Felddatentyp</p></th>
     <th><p>Geeignete Indextypen</p></th>
   </tr>
   <tr>
     <td><p>FLOAT_VECTOR</p></td>
     <td><ul><li><p>FLAT</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>IVF_RABITQ</p></li><li><p>HNSW</p></li><li><p>HNSW_SQ</p></li><li><p>HNSW_PQ</p></li><li><p>HNSW_PRQ</p></li><li><p>DISKANN</p></li><li><p>SCANN</p></li><li><p>AISAQ</p></li><li><p>FAISS</p></li><li><p>GPU_CAGRA</p></li><li><p>GPU_IVF_FLAT</p></li><li><p>GPU_IVF_PQ</p></li><li><p>GPU_BRUTE_FORCE</p></li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>FLOAT16_VECTOR</p></li><li><p>BFLOAT16_VECTOR</p></li><li><p>INT8_VECTOR</p></li></ul></td>
     <td><ul><li><p>FLAT</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>IVF_RABITQ</p></li><li><p>HNSW</p></li><li><p>HNSW_SQ</p></li><li><p>HNSW_PQ</p></li><li><p>HNSW_PRQ</p></li><li><p>DISKANN</p></li><li><p>SCANN</p></li><li><p>AISAQ</p></li><li><p>GPU_CAGRA</p></li><li><p>GPU_IVF_FLAT</p></li><li><p>GPU_IVF_PQ</p></li><li><p>GPU_BRUTE_FORCE</p></li></ul></td>
   </tr>
   <tr>
     <td><p>BINÄR_VEKTOR</p></td>
     <td><ul><li><p>BIN_FLAT</p></li><li><p>BIN_IVF_FLAT</p></li><li><p>MINHASH_LSH</p></li><li><p>FAISS</p></li></ul></td>
   </tr>
   <tr>
     <td><p>SPARSE_FLOAT_VECTOR</p></td>
     <td><p>SPARSE_INVERTED_INDEX</p></td>
   </tr>
   <tr>
     <td><p>VARCHAR</p></td>
     <td><ul><li><p>INVERTED (empfohlen)</p></li><li><p>BITMAP</p></li><li><p>Trie</p></li></ul></td>
   </tr>
   <tr>
     <td><p>BOOL</p></td>
     <td><ul><li><p>BITMAP (empfohlen)</p></li><li><p>INVERTIERT</p></li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>INT8</p></li><li><p>INT16</p></li><li><p>INT32</p></li><li><p>INT64</p></li></ul></td>
     <td><ul><li><p>INVERTIERT</p></li><li><p>STL_SORT</p></li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>FLOAT</p></li><li><p>DOUBLE</p></li></ul></td>
     <td><p>INVERTED</p></td>
   </tr>
   <tr>
     <td><p>ARRAY <sup>(Elemente der Typen BOOL, INT8/16/32/64 und VARCHAR)</sup></p></td>
     <td><p>BITMAP (empfohlen)</p></td>
   </tr>
   <tr>
     <td><p>ARRAY <sup>(Elemente der Typen BOOL, INT8/16/32/64, FLOAT, DOUBLE und VARCHAR)</sup></p></td>
     <td><p>INVERTIERT</p></td>
   </tr>
   <tr>
     <td><p>JSON</p></td>
     <td><p>INVERTED</p></td>
   </tr>
</table>
<p>Dieser Artikel befasst sich mit der Auswahl geeigneter Vektorindizes. Für skalare Felder können Sie stets den empfohlenen Index-Typ verwenden.</p>
<p>Die Auswahl eines geeigneten Indextyps für eine Vektorsuche kann sich erheblich auf die Leistung und die Ressourcennutzung auswirken. Bei der Auswahl eines Indextyps für ein Vektorfeld müssen verschiedene Faktoren berücksichtigt werden, darunter die zugrunde liegende Datenstruktur, die Speicherauslastung und die Leistungsanforderungen.</p>
<h2 id="Vector-Index-anatomy" class="common-anchor-header">Aufbau eines Vektorindex<button data-href="#Vector-Index-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>Wie in der folgenden Abbildung dargestellt, besteht ein Indextyp in Milvus aus drei Kernkomponenten: <strong>Datenstruktur</strong>, <strong>Quantisierung</strong> und <strong>Refiner</strong>. Quantisierung und Refiner sind optional, werden jedoch aufgrund eines hervorragenden Verhältnisses von Nutzen und Kosten häufig eingesetzt.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/vector-index-anatomy.png" alt="Vector Index Anatomy" class="doc-image" id="vector-index-anatomy" /> 
   <span>Aufbau eines Vektorindex</span>
  
 </span></p>
<p>Bei der Indexerstellung kombiniert Milvus die gewählte Datenstruktur und die Quantisierungsmethode, um eine optimale <strong>Expansionsrate</strong> zu ermitteln. Bei der Abfrage ruft das System <code translate="no">topK × expansion rate</code> Kandidatenvektoren ab, wendet den Refiner an, um Abstände mit höherer Präzision neu zu berechnen, und gibt schließlich die genauesten <code translate="no">topK</code> Ergebnisse zurück. Dieser hybride Ansatz schafft ein Gleichgewicht zwischen Geschwindigkeit und Genauigkeit, indem die ressourcenintensive Verfeinerung auf eine gefilterte Teilmenge von Kandidaten beschränkt wird.</p>
<h3 id="Data-structure" class="common-anchor-header">Datenstruktur<button data-href="#Data-structure" class="anchor-icon" translate="no">
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
    </button></h3><p>Die Datenstruktur bildet die grundlegende Ebene des Index. Zu den gängigen Typen gehören:</p>
<ul>
<li><p><strong>Inverted File (IVF)</strong></p>
<p>Index-Typen der IVF-Reihe ermöglichen es Milvus, Vektoren durch zentroidbasierte Partitionierung in Buckets zu clustern. Im Allgemeinen kann man davon ausgehen, dass alle Vektoren in einem Bucket wahrscheinlich nahe am Abfragevektor liegen, wenn das Zentrum des Buckets nahe am Abfragevektor liegt. Basierend auf dieser Prämisse durchsucht Milvus nur die Vektor-Embeddings in jenen Buckets, deren Zentren nahe am Abfragevektor liegen, anstatt den gesamten Datensatz zu untersuchen. Diese Strategie reduziert den Rechenaufwand bei gleichzeitiger Beibehaltung einer akzeptablen Genauigkeit.</p>
<p>Diese Art von Indexdatenstruktur eignet sich ideal für große Datensätze, die einen schnellen Durchsatz erfordern.</p></li>
<li><p><strong>Graphbasierte Struktur</strong></p>
<p>Eine graphbasierte Datenstruktur für die Vektorsuche, wie beispielsweise „Hierarchical Navigable Small World“ (<a href="https://arxiv.org/abs/1603.09320">HNSW</a>), bildet einen geschichteten Graphen, in dem jeder Vektor mit seinen nächsten Nachbarn verbunden ist. Abfragen durchlaufen diese Hierarchie, beginnend bei den groben oberen Schichten und wechselnd zu den unteren Schichten, was eine effiziente Suchkomplexität in logarithmischer Zeit ermöglicht.</p>
<p>Diese Art von Indexdatenstruktur eignet sich besonders für hochdimensionale Räume und Szenarien, die Abfragen mit geringer Latenz erfordern.</p></li>
</ul>
<h3 id="Quantization" class="common-anchor-header">Quantisierung<button data-href="#Quantization" class="anchor-icon" translate="no">
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
    </button></h3><p>Die Quantisierung reduziert den Speicherbedarf und den Rechenaufwand durch eine verfeinerte Darstellung:</p>
<ul>
<li><p><strong>Die skalare Quantisierung</strong> (z. B. <strong>SQ8</strong>) ermöglicht es Milvus, jede Vektordimension auf ein einzelnes Byte (8 Bit) zu komprimieren, wodurch der Speicherbedarf im Vergleich zu 32-Bit-Float-Werten um 75 % reduziert wird, während eine angemessene Genauigkeit erhalten bleibt.</p></li>
<li><p><strong>Die Produktquantisierung</strong> (<strong>PQ</strong>) ermöglicht es Milvus, Vektoren in Teilvektoren aufzuteilen und diese mithilfe von Codebuch-basiertem Clustering zu kodieren. Dadurch werden höhere Kompressionsverhältnisse (z. B. 4-32-fach) auf Kosten einer geringfügig reduzierten Wiederauffindungsrate erzielt, was diese Methode für Umgebungen mit begrenzten Speicherressourcen geeignet macht.</p></li>
</ul>
<h3 id="Refiner" class="common-anchor-header">Verfeinerer<button data-href="#Refiner" class="anchor-icon" translate="no">
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
    </button></h3><p>Die Quantisierung ist von Natur aus verlustbehaftet. Um die Wiederauffindungsrate aufrechtzuerhalten, erzeugt die Quantisierung durchweg mehr Top-K-Kandidaten als erforderlich. Dadurch können Refiner mit höherer Genauigkeit die Top-K-Ergebnisse aus diesen Kandidaten weiter auswählen und so die Wiederauffindungsrate verbessern.</p>
<p>Beispielsweise verarbeitet der FP32-Refiner die durch die Quantisierung zurückgegebenen Suchergebniskandidaten, indem er die Abstände mit FP32-Genauigkeit anstelle der quantisierten Werte neu berechnet.</p>
<p>Dies ist entscheidend für Anwendungen, die einen Kompromiss zwischen Sucheffizienz und Präzision erfordern, wie beispielsweise die semantische Suche oder Empfehlungssysteme, bei denen geringfügige Abstandsabweichungen die Ergebnisqualität erheblich beeinflussen.</p>
<h3 id="Summary" class="common-anchor-header">Zusammenfassung<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h3><p>Diese mehrstufige Architektur – grobe Filterung über Datenstrukturen, effiziente Berechnung durch Quantisierung und Präzisionsoptimierung durch Verfeinerung – ermöglicht es Milvus, den Kompromiss zwischen Genauigkeit und Leistung adaptiv zu optimieren.</p>
<h2 id="Performance-trade-offs" class="common-anchor-header">Leistungskompromisse<button data-href="#Performance-trade-offs" class="anchor-icon" translate="no">
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
    </button></h2><p>Bei der Bewertung der Leistung ist es entscheidend, ein Gleichgewicht zwischen <strong>Erstellungszeit</strong>, <strong>Abfragen pro Sekunde (QPS)</strong> und <strong>Recall-Rate</strong> herzustellen. Die allgemeinen Regeln lauten wie folgt:</p>
<ul>
<li><p><strong>Graphbasierte Indextypen</strong> übertreffen <strong>IVF-Varianten</strong> in der Regel hinsichtlich der <strong>QPS</strong>.</p></li>
<li><p><strong>IVF-Varianten</strong> eignen sich besonders für Szenarien mit <strong>einem hohen Top-K-Wert (z. B. über 2.000)</strong>.</p></li>
<li><p><strong>PQ</strong> bietet im Vergleich zu <strong>SQ</strong> bei ähnlichen Kompressionsraten in der Regel eine bessere Recall-Rate, obwohl letzteres eine höhere Leistung bietet.</p></li>
<li><p>Die Verwendung von Festplatten für einen Teil des Index (wie bei <strong>DiskANN</strong>) hilft bei der Verwaltung großer Datensätze, führt jedoch auch zu potenziellen IOPS-Engpässen.</p></li>
</ul>
<h3 id="Capacity" class="common-anchor-header">Kapazität<button data-href="#Capacity" class="anchor-icon" translate="no">
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
    </button></h3><p>Bei der Kapazität geht es in der Regel um das Verhältnis zwischen Datengröße und verfügbarem RAM. Beachten Sie beim Umgang mit der Kapazität Folgendes:</p>
<ul>
<li><p>Wenn ein Viertel Ihrer Rohdaten in den Arbeitsspeicher passt, sollten Sie DiskANN wegen seiner stabilen Latenz in Betracht ziehen.</p></li>
<li><p>Wenn alle Ihre Rohdaten in den Arbeitsspeicher passen, sollten Sie speicherbasierte Indextypen und mmap in Betracht ziehen.</p></li>
<li><p>Sie können die quantisierten Indextypen und mmap nutzen, um Genauigkeit zugunsten der maximalen Kapazität einzubüßen.</p></li>
</ul>
<div class="alert note">
<p>Mmap ist nicht immer die Lösung. Wenn sich der Großteil Ihrer Daten auf der Festplatte befindet, bietet DiskANN eine bessere Latenz.</p>
</div>
<h3 id="Recall" class="common-anchor-header">Recall<button data-href="#Recall" class="anchor-icon" translate="no">
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
    </button></h3><p>Der Recall hängt in der Regel mit der Filterquote zusammen, die sich auf die Daten bezieht, die vor der Suche herausgefiltert werden. Beachten Sie beim Umgang mit dem Recall Folgendes:</p>
<ul>
<li><p>Liegt die Filterquote unter 85 %, schneiden graphbasierte Indextypen besser ab als IVF-Varianten.</p></li>
<li><p>Liegt die Filterquote zwischen 85 % und 95 %, sollten Sie IVF-Varianten verwenden.</p></li>
<li><p>Liegt die Filterquote über 98 %, verwenden Sie „Brute-Force“ (FLAT), um die genauesten Suchergebnisse zu erzielen.</p></li>
</ul>
<div class="alert note">
<p>Die oben genannten Punkte treffen nicht immer zu. Es wird empfohlen, den Recall mit verschiedenen Indizierungstypen zu optimieren, um festzustellen, welcher Indizierungstyp am besten geeignet ist.</p>
</div>
<h3 id="Performance" class="common-anchor-header">Leistung<button data-href="#Performance" class="anchor-icon" translate="no">
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
    </button></h3><p>Die Leistung einer Suche wird in der Regel anhand des Top-K-Werts gemessen, der sich auf die Anzahl der Datensätze bezieht, die die Suche zurückgibt. Berücksichtigen Sie bei der Beurteilung der Leistung Folgendes:</p>
<ul>
<li><p>Bei einer Suche mit einem kleinen Top-K (z. B. 2.000), die eine hohe Recall-Rate erfordert, schneiden graphbasierte Indextypen besser ab als IVF-Varianten.</p></li>
<li><p>Bei einer Suche mit einem großen Top-K (im Vergleich zur Gesamtzahl der Vektor-Einbettungen) sind IVF-Varianten die bessere Wahl als graphbasierte Indextypen.</p></li>
<li><p>Bei einer Suche mit einem mittelgroßen Top-K und einer hohen Filterquote sind IVF-Varianten die bessere Wahl.</p></li>
</ul>
<h3 id="Decision-Matrix-Choosing-the-most-appropriate-index-type" class="common-anchor-header">Entscheidungsmatrix: Auswahl des am besten geeigneten Index-Typs<button data-href="#Decision-Matrix-Choosing-the-most-appropriate-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>Die folgende Tabelle ist eine Entscheidungsmatrix, an der Sie sich bei der Auswahl eines geeigneten Index-Typs orientieren können.</p>
<table>
   <tr>
     <th><p>Szenario</p></th>
     <th><p>Empfohlener Index</p></th>
     <th><p>Anmerkungen</p></th>
   </tr>
   <tr>
     <td><p>Rohdaten passen in den Arbeitsspeicher</p></td>
     <td><p>HNSW, IVF + Verfeinerung</p></td>
     <td><p>Verwenden Sie HNSW für Low-<code translate="no">k</code>/High-Recall.</p></td>
   </tr>
   <tr>
     <td><p>Rohdaten auf Festplatte, SSD</p></td>
     <td><p>DiskANN</p></td>
     <td><p>Optimal für latenzempfindliche Abfragen.</p></td>
   </tr>
   <tr>
     <td><p>Rohdaten auf Festplatte, begrenzter Arbeitsspeicher</p></td>
     <td><p>IVFPQ/SQ + mmap</p></td>
     <td><p>Gleicht Speicher- und Festplattenzugriff aus.</p></td>
   </tr>
   <tr>
     <td><p>Hohe Filterquote (&gt;95 %)</p></td>
     <td><p>Brute-Force (FLAT)</p></td>
     <td><p>Vermeidet Index-Overhead bei sehr kleinen Kandidatenmengen.</p></td>
   </tr>
   <tr>
     <td><p>Großes „ <code translate="no">k</code> “ (≥1 % des Datensatzes)</p></td>
     <td><p>IVF</p></td>
     <td><p>Cluster-Pruning reduziert den Rechenaufwand.</p></td>
   </tr>
   <tr>
     <td><p>Extrem hohe Recall-Rate (&gt;99 %)</p></td>
     <td><p>Brute-Force (FLAT) + GPUs</p></td>
     <td><p>--</p></td>
   </tr>
</table>
<h2 id="Memory-usage-estimation" class="common-anchor-header">Schätzung des Speicherbedarfs<button data-href="#Memory-usage-estimation" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">
<p>Dieser Abschnitt befasst sich mit der Berechnung des Speicherverbrauchs eines bestimmten Index-Typs und enthält viele technische Details. Sie können diesen Abschnitt getrost überspringen, wenn er nicht Ihren Interessen entspricht.</p>
</div>
<p>Der Speicherverbrauch eines Indexes wird durch seine Datenstruktur, die Kompressionsrate durch Quantisierung und den verwendeten Refiner beeinflusst. Generell haben graphbasierte Indizes aufgrund der Graphstruktur (z. B. <strong>HNSW</strong>) typischerweise einen höheren Speicherbedarf, was in der Regel einen spürbaren Overhead pro Vektorraum mit sich bringt. Im Gegensatz dazu sind IVF und seine Varianten speichereffizienter, da der Overhead pro Vektorraum geringer ist. Fortgeschrittene Techniken wie <strong>DiskANN</strong> ermöglichen es jedoch, Teile des Indexes, wie den Graphen oder den Refiner, auf der Festplatte zu speichern, wodurch die Speicherbelastung reduziert wird, während die Leistung erhalten bleibt.</p>
<p>Konkret lässt sich der Speicherbedarf eines Index wie folgt berechnen:</p>
<h3 id="IVF-index-memory-usage" class="common-anchor-header">Speicherbedarf von IVF-Indizes<button data-href="#IVF-index-memory-usage" class="anchor-icon" translate="no">
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
    </button></h3><p>IVF-Indizes schaffen einen Ausgleich zwischen Speichereffizienz und Suchleistung, indem sie Daten in Cluster partitionieren. Nachfolgend finden Sie eine Aufschlüsselung des Speicherbedarfs für 1 Million 128-dimensionale Vektoren, die mit IVF-Varianten indiziert wurden.</p>
<ol>
<li><p><strong>Berechnung des von Zentren belegten Speichers.</strong></p>
<p>Index-Typen der IVF-Serie ermöglichen es Milvus, Vektoren mithilfe einer zentroidbasierten Partitionierung in Buckets zu clustern. Jeder Zentroid wird im Index als rohe Vektor-Einbettung gespeichert. Wenn Sie die Vektoren in 2.000 Cluster aufteilen, lässt sich der Speicherbedarf wie folgt berechnen:</p>
<pre><code translate="no" class="language-plaintext">2,000 clusters × 128 dimensions × 4 bytes = 1.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Berechnen Sie den Speicherbedarf für die Clusterzuordnungen.</strong></p>
<p>Jede Vektor-Einbettung wird einem Cluster zugeordnet und als ganzzahlige ID gespeichert. Für 2.000 Cluster reicht eine 2-Byte-Ganzzahl aus. Der Speicherbedarf lässt sich wie folgt berechnen:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 2 bytes = 2.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Berechnen Sie die durch die Quantisierung verursachte Komprimierung.</strong></p>
<p>IVF-Varianten verwenden typischerweise PQ und SQ8, und der Speicherbedarf lässt sich wie folgt abschätzen:</p>
<ul>
<li><p>Verwendung von PQ mit 8 Subquantisierern</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Verwendung von SQ8</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 1 byte = 128 MB 
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Die folgende Tabelle listet den geschätzten Speicherbedarf bei verschiedenen Konfigurationen auf:</p>
<p><table>
<tr>
<th><p>Konfiguration</p></th>
<th><p>Geschätzter Speicherbedarf</p></th>
<th><p>Gesamtspeicher</p></th>
</tr>
<tr>
<td><p>IVF-PQ (ohne Verfeinerung)</p></td>
<td><p>1,0 MB + 2,0 MB + 8,0 MB</p></td>
<td><p>11,0 MB</p></td>
</tr>
<tr>
<td><p>IVF-PQ + 10 % grobe Verfeinerung</p></td>
<td><p>1,0 MB + 2,0 MB + 8,0 MB + 51,2 MB</p></td>
<td><p>62,2 MB</p></td>
</tr>
<tr>
<td><p>IVF-SQ8 (keine Verfeinerung)</p></td>
<td><p>1,0 MB + 2,0 MB + 128 MB</p></td>
<td><p>131,0 MB</p></td>
</tr>
<tr>
<td><p>IVF-FLAT (vollständige Rohvektoren)</p></td>
<td><p>1,0 MB + 2,0 MB + 512 MB</p></td>
<td><p>515,0 MB</p></td>
</tr>
</table></p></li>
<li><p><strong>Berechnen Sie den Refinement-Overhead.</strong></p>
<p>IVF-Varianten werden häufig mit einem Refiner kombiniert, um Kandidaten neu zu ordnen. Für eine Suche, die die 10 besten Ergebnisse mit einer Erweiterungsrate von 5 liefert, lässt sich der Overhead der Verfeinerung wie folgt abschätzen:</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Graph-based-index-memory-usage" class="common-anchor-header">Speicherbedarf graphbasierter Indizes<button data-href="#Graph-based-index-memory-usage" class="anchor-icon" translate="no">
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
    </button></h3><p>Graphbasierte Indextypen wie HNSW benötigen erheblichen Speicherplatz, um sowohl die Graphstruktur als auch die rohen Vektor-Einbettungen zu speichern. Nachfolgend finden Sie eine detaillierte Aufschlüsselung des Speicherbedarfs für 1 Million 128-dimensionale Vektoren, die mit dem HNSW-Indextyp indiziert wurden.</p>
<ol>
<li><p><strong>Berechnung des von der Graphstruktur belegten Speichers.</strong></p>
<p>Jeder Vektor in HNSW unterhält Verbindungen zu seinen Nachbarn. Bei einem Graphgrad (Kanten pro Knoten) von 32 lässt sich der Speicherbedarf wie folgt berechnen:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 32 links × 4 bytes (for 32-bit integer storage) = 128 MB  
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Berechnen Sie den Speicherbedarf der rohen Vektor-Einbettungen.</strong></p>
<p>Der Speicherbedarf für die Speicherung unkomprimierter FP32-Vektoren lässt sich wie folgt berechnen:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 4 bytes = 512 MB  
<button class="copy-code-btn"></button></code></pre>
<p>Wenn Sie HNSW zur Indizierung der 1 Million 128-dimensionalen Vektoreinbettungen verwenden, beträgt der insgesamt belegte Speicher <strong>128 MB (Graph) + 512 MB (Vektoren) = 640 MB</strong>.</p></li>
<li><p><strong>Berechnen Sie die durch die Quantisierung bewirkte Komprimierung.</strong></p>
<p>Die Quantisierung reduziert die Vektorgröße. Die Verwendung von PQ mit 8 Subquantisierern (8 Byte pro Vektor) führt beispielsweise zu einer drastischen Komprimierung. Der von den komprimierten Vektor-Einbettungen beanspruchte Speicher lässt sich wie folgt berechnen:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8 MB
<button class="copy-code-btn"></button></code></pre>
<p>Dies ergibt im Vergleich zu den Roh-Vektor-Einbettungen eine 64-fache Kompressionsrate, und der vom <strong>HNSWPQ-Index</strong> -Typ belegte Gesamtspeicher würde <strong>128 MB (Graph) + 8 MB (komprimierte Vektoren) = 136 MB</strong> betragen.</p></li>
<li><p><strong>Berechnen Sie den Overhead für die Verfeinerung.</strong></p>
<p>Bei der Verfeinerung, wie beispielsweise einer Neureihung mit Rohvektoren, werden vorübergehend hochpräzise Daten in den Speicher geladen. Für eine Suche, bei der die ersten 10 Ergebnisse mit einer Erweiterungsrate von 5 abgerufen werden, lässt sich der Overhead bei der Verfeinerung wie folgt abschätzen:</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Other-considerations" class="common-anchor-header">Weitere Überlegungen<button data-href="#Other-considerations" class="anchor-icon" translate="no">
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
    </button></h3><p>Während IVF- und graphbasierte Indizes die Speichernutzung durch Quantisierung optimieren, sind Memory-Mapped-Dateien (mmap) und DiskANN für Szenarien vorgesehen, in denen Datensätze den verfügbaren Arbeitsspeicher (RAM) überschreiten.</p>
<h4 id="DiskANN" class="common-anchor-header">DiskANN</h4><p>DiskANN ist ein auf dem Vamana-Graphen basierender Index, der Datenpunkte für eine effiziente Navigation während der Suche miteinander verknüpft und gleichzeitig PQ anwendet, um die Größe der Vektoren zu reduzieren und eine schnelle, approximative Berechnung der Abstände zwischen den Vektoren zu ermöglichen.</p>
<p>Der Vamana-Graph wird auf der Festplatte gespeichert, wodurch DiskANN große Datensätze verarbeiten kann, die andernfalls zu groß wären, um in den Arbeitsspeicher zu passen. Dies ist besonders nützlich für Datensätze mit Milliarden von Punkten.</p>
<h4 id="Memory-mapped-files-mmap" class="common-anchor-header">Memory-Mapped-Dateien (mmap)</h4><p>Memory Mapping (mmap) ermöglicht den direkten Speicherzugriff auf große Dateien auf der Festplatte, sodass Milvus Indizes und Daten sowohl im Arbeitsspeicher als auch auf Festplatten speichern kann. Dieser Ansatz trägt zur Optimierung von E/A-Vorgängen bei, indem er den Overhead von E/A-Aufrufen je nach Zugriffshäufigkeit reduziert und dadurch die Speicherkapazität für Sammlungen erweitert, ohne die Suchleistung wesentlich zu beeinträchtigen.</p>
<p>Insbesondere können Sie Milvus so konfigurieren, dass die Rohdaten in bestimmten Feldern per Memory-Mapping zugeordnet werden, anstatt sie vollständig in den Arbeitsspeicher zu laden. Auf diese Weise erhalten Sie direkten Speicherzugriff auf die Felder, ohne sich um Speicherprobleme sorgen zu müssen, und können die Kapazität der Sammlung erweitern.</p>
