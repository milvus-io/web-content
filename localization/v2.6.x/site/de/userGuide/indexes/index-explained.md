---
id: index-explained.md
title: Index Erklärt
summary: >-
  Ein Index ist eine zusätzliche Struktur, die über den Daten aufgebaut wird.
  Seine interne Struktur hängt von dem verwendeten Algorithmus für die ungefähre
  Suche nach dem nächsten Nachbarn ab. Ein Index beschleunigt die Suche,
  verursacht aber zusätzliche Vorverarbeitungszeit, Speicherplatz und RAM
  während der Suche. Außerdem wird durch die Verwendung eines Indexes in der
  Regel die Wiederfindungsrate gesenkt (obwohl der Effekt vernachlässigbar ist,
  ist er dennoch von Bedeutung). In diesem Artikel wird daher erläutert, wie die
  Kosten für die Verwendung eines Indexes minimiert und gleichzeitig der Nutzen
  maximiert werden kann.
---
<h1 id="Index-Explained" class="common-anchor-header">Index Erklärt<button data-href="#Index-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Ein Index ist eine zusätzliche Struktur, die über den Daten aufgebaut wird. Seine interne Struktur hängt von dem verwendeten Algorithmus für die ungefähre Suche nach dem nächsten Nachbarn ab. Ein Index beschleunigt die Suche, verursacht aber zusätzliche Vorverarbeitungszeit, Speicherplatz und RAM während der Suche. Außerdem wird durch die Verwendung eines Indexes in der Regel die Wiederfindungsrate gesenkt (obwohl der Effekt vernachlässigbar ist, ist er dennoch von Bedeutung). In diesem Artikel wird daher erläutert, wie die Kosten für die Verwendung eines Indexes minimiert und gleichzeitig der Nutzen maximiert werden kann.</p>
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
    </button></h2><p>In Milvus sind Indizes feldspezifisch, und die anwendbaren Indextypen variieren je nach den Datentypen der Zielfelder. Als professionelle Vektordatenbank konzentriert sich Milvus darauf, sowohl die Leistung der Vektorsuche als auch der skalaren Filterung zu verbessern, weshalb es verschiedene Indextypen anbietet.</p>
<p>In der folgenden Tabelle ist die Zuordnungsbeziehung zwischen Felddatentypen und anwendbaren Indextypen aufgeführt.</p>
<table>
   <tr>
     <th><p>Felddatentyp</p></th>
     <th><p>Anwendbare Indextypen</p></th>
   </tr>
   <tr>
     <td><ul><li><p>FLOAT_VECTOR</p></li><li><p>FLOAT16_VECTOR</p></li><li><p>BFLOAT16_VECTOR</p></li><li><p>INT8_VECTOR</p></li></ul></td>
     <td><ul><li><p>FLAT</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>IVF_RABITQ</p></li><li><p>GPU_IVF_FLAT</p></li><li><p>GPU_IVF_PQ</p></li><li><p>HNSW</p></li><li><p>DISKANN</p></li></ul></td>
   </tr>
   <tr>
     <td><p>BINÄR_VECTOR</p></td>
     <td><ul><li>BIN_FLAT</li><li>BIN_IVF_FLAT</li></ul></td>
   </tr>
   <tr>
     <td><p>SPARSE_FLOAT_VECTOR</p></td>
     <td><p>SPARSE_INVERTIERTER_INDEX</p></td>
   </tr>
   <tr>
     <td><p>VARCHAR</p></td>
     <td><ul><li><p>INVERTED (Empfohlen)</p></li><li><p>BITMAP</p></li><li><p>Trie</p></li></ul></td>
   </tr>
   <tr>
     <td><p>BOOL</p></td>
     <td><ul><li>BITMAP (Empfohlen)</li><li>INVERTED</li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>INT8</p></li><li><p>INT16</p></li><li><p>INT32</p></li><li><p>INT64</p></li></ul></td>
     <td><ul><li>INVERTED</li><li>STL_SORT</li></ul></td>
   </tr>
   <tr>
     <td><ul><li>FLOAT</li><li>DOUBLE</li></ul></td>
     <td><p>INVERTED</p></td>
   </tr>
   <tr>
     <td><p>ARRAY <sup>(Elemente der Typen BOOL, INT8/16/32/64 und VARCHAR)</sup></p></td>
     <td><p>BITMAP (empfohlen)</p></td>
   </tr>
   <tr>
     <td><p>ARRAY <sup>(Elemente der Typen BOOL, INT8/16/32/64, FLOAT, DOUBLE und VARCHAR)</sup></p></td>
     <td><p>INVERTED</p></td>
   </tr>
   <tr>
     <td><p>JSON</p></td>
     <td><p>INVERTED</p></td>
   </tr>
</table>
<p>Dieser Artikel konzentriert sich auf die Auswahl geeigneter Vektorindizes. Für skalare Felder können Sie immer den empfohlenen Indextyp verwenden.</p>
<p>Die Auswahl eines geeigneten Indextyps für eine Vektorsuche kann die Leistung und den Ressourcenverbrauch erheblich beeinflussen. Bei der Auswahl eines Indextyps für ein Vektorfeld müssen verschiedene Faktoren berücksichtigt werden, darunter die zugrunde liegende Datenstruktur, der Speicherverbrauch und die Leistungsanforderungen.</p>
<h2 id="Vector-Index-anatomy" class="common-anchor-header">Anatomie des Vektorindex<button data-href="#Vector-Index-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>Wie im folgenden Diagramm dargestellt, besteht ein Index-Typ in Milvus aus drei Kernkomponenten, nämlich der <strong>Datenstruktur</strong>, der <strong>Quantisierung</strong> und dem <strong>Verfeinerer</strong>. Quantisierung und Refiner sind optional, werden aber aufgrund eines signifikanten Nutzen-Kosten-Verhältnisses häufig verwendet.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/vector-index-anatomy.png" alt="Vector Index Anatomy" class="doc-image" id="vector-index-anatomy" />
   </span> <span class="img-wrapper"> <span>Anatomie des Vektorindex</span> </span></p>
<p>Während der Indexerstellung kombiniert Milvus die gewählte Datenstruktur und die Quantisierungsmethode, um eine optimale <strong>Expansionsrate</strong> zu ermitteln. Zum Zeitpunkt der Abfrage ruft das System <code translate="no">topK × expansion rate</code> Kandidatenvektoren ab, wendet den Refiner an, um die Abstände mit höherer Genauigkeit neu zu berechnen, und gibt schließlich die genauesten Ergebnisse zurück <code translate="no">topK</code>. Dieser hybride Ansatz stellt ein Gleichgewicht zwischen Geschwindigkeit und Genauigkeit her, indem er die ressourcenintensive Verfeinerung auf eine gefilterte Teilmenge von Kandidaten beschränkt.</p>
<h3 id="Data-structure" class="common-anchor-header">Datenstruktur</h3><p>Die Datenstruktur bildet die grundlegende Schicht des Indexes. Übliche Typen sind:</p>
<ul>
<li><p><strong>Invertierte Datei (IVF)</strong></p>
<p>IVF-Indextypen ermöglichen es Milvus, Vektoren durch eine auf dem Zentroid basierende Partitionierung in Bereiche zu gruppieren. Im Allgemeinen kann man davon ausgehen, dass alle Vektoren in einem Bucket wahrscheinlich nahe am Abfragevektor liegen, wenn der Bucket-Schwerpunkt nahe am Abfragevektor liegt. Ausgehend von dieser Prämisse scannt Milvus nur die Vektoreinbettungen in denjenigen Buckets, deren Zentroide sich in der Nähe des Abfragevektors befinden, anstatt den gesamten Datensatz zu untersuchen. Diese Strategie senkt die Rechenkosten und gewährleistet gleichzeitig eine akzeptable Genauigkeit.</p>
<p>Diese Art der Indexdatenstruktur ist ideal für große Datensätze, die einen schnellen Durchsatz erfordern.</p></li>
<li><p><strong>Graphenbasierte Struktur</strong></p>
<p>Eine graphenbasierte Datenstruktur für die Vektorsuche, wie z. B. Hierarchical Navigable Small World<a href="https://arxiv.org/abs/1603.09320">(HNSW</a>), konstruiert einen mehrschichtigen Graphen, bei dem jeder Vektor mit seinen nächsten Nachbarn verbunden ist. Abfragen navigieren durch diese Hierarchie, wobei sie von groben oberen Schichten ausgehen und durch die unteren Schichten wechseln, was eine effiziente Suchkomplexität in logarithmischer Zeit ermöglicht.</p>
<p>Diese Art von Indexdatenstruktur eignet sich hervorragend für hochdimensionale Räume und Szenarien, die Abfragen mit geringer Latenz erfordern.</p></li>
</ul>
<h3 id="Quantization" class="common-anchor-header">Quantisierung</h3><p>Die Quantisierung reduziert den Speicherplatzbedarf und die Rechenkosten durch eine gröbere Darstellung:</p>
<ul>
<li><p><strong>Die Skalarquantisierung</strong> (z. B. <strong>SQ8</strong>) ermöglicht Milvus die Komprimierung jeder Vektordimension in ein einziges Byte (8-Bit), wodurch der Speicherbedarf im Vergleich zu 32-Bit-Fließkommazahlen um 75 % reduziert wird, wobei eine angemessene Genauigkeit erhalten bleibt.</p></li>
<li><p><strong>Die Produktquantisierung</strong><strong>(PQ</strong>) ermöglicht es Milvus, Vektoren in Untervektoren aufzuteilen und sie mit Hilfe von Codebuch-basiertem Clustering zu kodieren. Dadurch werden höhere Komprimierungsraten (z. B. 4-32x) auf Kosten einer geringfügig reduzierten Wiederauffindbarkeit erreicht, was es für Umgebungen mit begrenztem Speicherplatz geeignet macht.</p></li>
</ul>
<h3 id="Refiner" class="common-anchor-header">Verfeinerungsprogramm</h3><p>Quantisierung ist von Natur aus verlustbehaftet. Um die Wiederfindungsrate aufrechtzuerhalten, produziert die Quantisierung durchweg mehr Top-K-Kandidaten als nötig, so dass die Verfeinerer eine höhere Präzision verwenden können, um die Top-K-Ergebnisse aus diesen Kandidaten weiter auszuwählen, was die Wiederfindungsrate erhöht.</p>
<p>Der FP32-Verfeinerer bearbeitet beispielsweise die von der Quantisierung zurückgegebenen Suchergebniskandidaten, indem er die Abstände unter Verwendung der FP32-Präzision anstelle der quantisierten Werte neu berechnet.</p>
<p>Dies ist von entscheidender Bedeutung für Anwendungen, bei denen ein Kompromiss zwischen Sucheffizienz und Präzision erforderlich ist, wie z. B. bei der semantischen Suche oder bei Empfehlungssystemen, bei denen geringfügige Abstandsabweichungen die Ergebnisqualität erheblich beeinträchtigen.</p>
<h3 id="Summary" class="common-anchor-header">Zusammenfassung</h3><p>Diese mehrstufige Architektur - grobe Filterung über Datenstrukturen, effiziente Berechnung durch Quantisierung und Präzisionsabstimmung über Verfeinerung - ermöglicht Milvus eine adaptive Optimierung des Kompromisses zwischen Genauigkeit und Leistung.</p>
<h2 id="Performance-trade-offs" class="common-anchor-header">Leistungsabwägungen<button data-href="#Performance-trade-offs" class="anchor-icon" translate="no">
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
    </button></h2><p>Bei der Bewertung der Leistung ist es von entscheidender Bedeutung, ein Gleichgewicht zwischen <strong>Erstellungszeit</strong>, <strong>Abfrage pro Sekunde (QPS)</strong> und <strong>Wiederfindungsrate</strong> herzustellen. Die allgemeinen Regeln lauten wie folgt:</p>
<ul>
<li><p><strong>Graphenbasierte Indextypen</strong> übertreffen in der Regel die <strong>IVF-Varianten</strong> in Bezug auf die <strong>QPS</strong>.</p></li>
<li><p><strong>IVF-Varianten</strong> eignen sich besonders für Szenarien mit <strong>einem großen TopK (z. B. über 2.000)</strong>.</p></li>
<li><p><strong>PQ</strong> bietet typischerweise eine bessere Wiederauffindungsrate bei ähnlichen Kompressionsraten im Vergleich zu <strong>SQ</strong>, obwohl letztere eine schnellere Leistung bietet.</p></li>
<li><p>Die Verwendung von Festplatten für einen Teil des Index (wie bei <strong>DiskANN</strong>) hilft bei der Verwaltung großer Datenmengen, führt aber auch zu potenziellen IOPS-Engpässen.</p></li>
</ul>
<h3 id="Capacity" class="common-anchor-header">Kapazität</h3><p>Bei der Kapazität geht es in der Regel um das Verhältnis zwischen Datengröße und verfügbarem RAM. Wenn es um die Kapazität geht, sollten Sie Folgendes bedenken:</p>
<ul>
<li><p>Wenn ein Viertel Ihrer Rohdaten in den Speicher passt, sollten Sie DiskANN wegen der stabilen Latenzzeit in Betracht ziehen.</p></li>
<li><p>Wenn alle Ihre Rohdaten in den Speicher passen, sollten Sie speicherbasierte Indextypen und mmap in Betracht ziehen.</p></li>
<li><p>Mit den quantisierungsbasierten Indextypen und mmap können Sie Genauigkeit gegen maximale Kapazität eintauschen.</p></li>
</ul>
<div class="alert note">
<p>Mmap ist nicht immer die Lösung. Wenn sich die meisten Ihrer Daten auf der Festplatte befinden, bietet DiskANN eine bessere Latenzzeit.</p>
</div>
<h3 id="Recall" class="common-anchor-header">Rückruf</h3><p>Beim Recall handelt es sich in der Regel um das Filterverhältnis, das sich auf die Daten bezieht, die vor der Suche herausgefiltert werden. Beim Recall ist Folgendes zu beachten:</p>
<ul>
<li><p>Wenn das Filterverhältnis weniger als 85 % beträgt, sind graphbasierte Indextypen besser als IVF-Varianten.</p></li>
<li><p>Liegt das Filterverhältnis zwischen 85% und 95%, sollten IVF-Varianten verwendet werden.</p></li>
<li><p>Bei einem Filterverhältnis von über 98% sollten Sie Brute-Force (FLAT) verwenden, um die genauesten Suchergebnisse zu erhalten.</p></li>
</ul>
<div class="alert note">
<p>Die oben genannten Punkte sind nicht immer korrekt. Es ist ratsam, den Abruf mit verschiedenen Indexarten abzustimmen, um festzustellen, welche Indexart am besten funktioniert.</p>
</div>
<h3 id="Performance" class="common-anchor-header">Leistung</h3><p>Die Leistung einer Suche bezieht sich in der Regel auf das Top-K, das sich auf die Anzahl der Datensätze bezieht, die die Suche zurückgibt. Wenn es um die Leistung geht, ist Folgendes zu beachten:</p>
<ul>
<li><p>Bei einer Suche mit einem kleinen Top-K (z.B. 2.000), die eine hohe Recall-Rate erfordert, sind graphbasierte Indextypen besser als IVF-Varianten.</p></li>
<li><p>Bei einer Suche mit einem großen Top-K (im Vergleich zur Gesamtzahl der Vektoreinbettungen) sind IVF-Varianten die bessere Wahl als graphbasierte Indextypen.</p></li>
<li><p>Für eine Suche mit einem mittleren Top-K und einem hohen Filterverhältnis sind IVF-Varianten die bessere Wahl.</p></li>
</ul>
<h3 id="Decision-Matrix-Choosing-the-most-appropriate-index-type" class="common-anchor-header">Entscheidungsmatrix: Auswahl des am besten geeigneten Indextyps</h3><p>Die folgende Tabelle ist eine Entscheidungsmatrix, auf die Sie sich bei der Wahl eines geeigneten Indextyps beziehen können.</p>
<table>
   <tr>
     <th><p>Szenario</p></th>
     <th><p>Empfohlener Index</p></th>
     <th><p>Hinweise</p></th>
   </tr>
   <tr>
     <td><p>Rohdaten passen in den Speicher</p></td>
     <td><p>HNSW, IVF + Verfeinerung</p></td>
     <td><p>Verwenden Sie HNSW für niedrige<code translate="no">k</code>/high recall.</p></td>
   </tr>
   <tr>
     <td><p>Rohdaten auf Festplatte, SSD</p></td>
     <td><p>DiskANN</p></td>
     <td><p>Optimal für latenzempfindliche Abfragen.</p></td>
   </tr>
   <tr>
     <td><p>Rohdaten auf der Festplatte, begrenzter RAM</p></td>
     <td><p>IVFPQ/SQ + mmap</p></td>
     <td><p>Gleicht Speicher- und Festplattenzugriff aus.</p></td>
   </tr>
   <tr>
     <td><p>Hohes Filterverhältnis (&gt;95%)</p></td>
     <td><p>Brute-Force (FLAT)</p></td>
     <td><p>Vermeidet Index-Overhead für kleine Kandidatenmengen.</p></td>
   </tr>
   <tr>
     <td><p>Große <code translate="no">k</code> (≥1% des Datensatzes)</p></td>
     <td><p>IVF</p></td>
     <td><p>Cluster Pruning reduziert den Rechenaufwand.</p></td>
   </tr>
   <tr>
     <td><p>Extrem hohe Wiederfindungsrate (&gt;99%)</p></td>
     <td><p>Brute-Force (FLAT) + GPUs</p></td>
     <td><p>--</p></td>
   </tr>
</table>
<h2 id="Memory-usage-estimation" class="common-anchor-header">Schätzung des Speicherverbrauchs<button data-href="#Memory-usage-estimation" class="anchor-icon" translate="no">
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
<p>Dieser Abschnitt konzentriert sich auf die Berechnung des Speicherverbrauchs eines bestimmten Indextyps und enthält viele technische Details. Sie können diesen Abschnitt getrost überspringen, wenn er nicht mit Ihren Interessen übereinstimmt.</p>
</div>
<p>Der Speicherverbrauch eines Indexes wird durch seine Datenstruktur, die Komprimierungsrate durch Quantisierung und den verwendeten Refiner beeinflusst. Im Allgemeinen haben graphenbasierte Indizes aufgrund der Struktur des Graphen (z. B. <strong>HNSW</strong>) einen höheren Speicherbedarf, was in der Regel einen spürbaren Overhead pro Vektor mit sich bringt. Im Gegensatz dazu sind IVF und seine Varianten speichereffizienter, da sie weniger Speicherplatz pro Vektor beanspruchen. Fortgeschrittene Techniken wie <strong>DiskANN</strong> ermöglichen es jedoch, Teile des Index, wie den Graphen oder den Refiner, auf der Festplatte zu speichern, wodurch die Speicherbelastung bei gleichbleibender Leistung verringert wird.</p>
<p>Die Speichernutzung eines Indexes kann wie folgt berechnet werden:</p>
<h3 id="IVF-index-memory-usage" class="common-anchor-header">IVF-Index-Speicherverbrauch</h3><p>IVF-Indizes schaffen ein Gleichgewicht zwischen Speichereffizienz und Suchleistung, indem sie die Daten in Cluster aufteilen. Nachfolgend eine Aufschlüsselung des Speicherverbrauchs von 1 Million 128-dimensionaler Vektoren, die mit IVF-Varianten indiziert wurden.</p>
<ol>
<li><p><strong>Berechnen Sie den von den Zentroiden verwendeten Speicherplatz.</strong></p>
<p>IVF-Indizierungstypen ermöglichen es Milvus, Vektoren mit Hilfe von Zentroid-basierter Partitionierung in Buckets zu clustern. Jeder Zentroid ist im Index der rohen Vektoreinbettung enthalten. Wenn Sie die Vektoren in 2.000 Cluster unterteilen, kann der Speicherverbrauch wie folgt berechnet werden:</p>
<pre><code translate="no" class="language-plaintext">2,000 clusters × 128 dimensions × 4 bytes = 1.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Berechnen Sie den von den Clusterzuweisungen verwendeten Speicher.</strong></p>
<p>Jede Vektoreinbettung wird einem Cluster zugewiesen und als ganzzahlige IDs gespeichert. Bei 2.000 Clustern reicht eine 2-Byte-Ganzzahl aus. Der Speicherverbrauch kann wie folgt berechnet werden:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 2 bytes = 2.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Berechnen Sie die durch die Quantisierung verursachte Kompression.</strong></p>
<p>IVF-Varianten verwenden in der Regel PQ und SQ8, und der Speicherverbrauch kann wie folgt geschätzt werden:</p>
<ul>
<li><p>Verwendung von PQ mit 8 Unterquantisierern</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Verwendung von SQ8</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 1 byte = 128 MB 
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>In der folgenden Tabelle ist der geschätzte Speicherverbrauch bei verschiedenen Konfigurationen aufgeführt:</p>
<p><table>
<tr>
<th><p>Konfiguration</p></th>
<th><p>Speicher Schätzung</p></th>
<th><p>Gesamtspeicher</p></th>
</tr>
<tr>
<td><p>IVF-PQ (keine Verfeinerung)</p></td>
<td><p>1,0 MB + 2,0 MB + 8,0 MB</p></td>
<td><p>11,0 MB</p></td>
</tr>
<tr>
<td><p>IVF-PQ + 10% Rohverfeinerung</p></td>
<td><p>1,0 MB + 2,0 MB + 8,0 MB + 51,2 MB</p></td>
<td><p>62,2 MB</p></td>
</tr>
<tr>
<td><p>IVF-SQ8 (keine Verfeinerung)</p></td>
<td><p>1,0 MB + 2,0 MB + 128 MB</p></td>
<td><p>131,0 MB</p></td>
</tr>
<tr>
<td><p>IVF-FLAT (vollständige rohe Vektoren)</p></td>
<td><p>1,0 MB + 2,0 MB + 512 MB</p></td>
<td><p>515,0 MB</p></td>
</tr>
</table></p></li>
<li><p><strong>Berechnen Sie den Verfeinerungs-Overhead.</strong></p>
<p>IVF-Varianten werden oft mit einem Verfeinerer kombiniert, um die Kandidaten neu zu ordnen. Für eine Suche, die die 10 besten Ergebnisse mit einer Expansionsrate von 5 abruft, kann der Verfeinerungs-Overhead wie folgt geschätzt werden:</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Graph-based-index-memory-usage" class="common-anchor-header">Graph-basierter Index-Speicherverbrauch</h3><p>Graphenbasierte Indextypen wie HNSW benötigen viel Speicherplatz, um sowohl die Graphenstruktur als auch die Rohvektoreinbettungen zu speichern. Es folgt eine detaillierte Aufschlüsselung des Speicherverbrauchs von 1 Million 128-dimensionaler Vektoren, die mit dem HNSW-Indextyp indiziert werden.</p>
<ol>
<li><p><strong>Berechnen Sie den von der Graphenstruktur verwendeten Speicherplatz.</strong></p>
<p>Jeder Vektor in HNSW unterhält Verbindungen zu seinen Nachbarn. Bei einem Graphengrad (Kanten pro Knoten) von 32 kann der Speicherverbrauch wie folgt berechnet werden:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 32 links × 4 bytes (for 32-bit integer storage) = 128 MB  
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Berechnen Sie den von den rohen Vektoreinbettungen verwendeten Speicher.</strong></p>
<p>Der durch die Speicherung unkomprimierter FP32-Vektoren verbrauchte Speicher kann wie folgt berechnet werden:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 4 bytes = 512 MB  
<button class="copy-code-btn"></button></code></pre>
<p>Wenn Sie HNSW verwenden, um die 1 Million 128-dimensionalen Vektoreinbettungen zu indizieren, würde der gesamte verwendete Speicher <strong>128 MB (Graph) + 512 MB (Vektoren) = 640 MB</strong> betragen.</p></li>
<li><p><strong>Berechnen Sie die durch die Quantisierung verursachte Kompression.</strong></p>
<p>Die Quantisierung reduziert die Vektorgröße. Beispielsweise führt die Verwendung von PQ mit 8 Unterquantisierern (8 Byte pro Vektor) zu einer drastischen Kompression. Der von den komprimierten Vektoreinbettungen verbrauchte Speicher kann wie folgt berechnet werden:</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8 MB
<button class="copy-code-btn"></button></code></pre>
<p>Im Vergleich zu den unkomprimierten Vektoreinbettungen wird eine 64-fache Komprimierungsrate erreicht, und der vom Index-Typ <strong>HNSWPQ</strong> verwendete Gesamtspeicher beträgt <strong>128 MB (Graph) + 8 MB (komprimierter Vektor) = 136 MB</strong>.</p></li>
<li><p><strong>Berechnen Sie den Verfeinerungs-Overhead.</strong></p>
<p>Bei der Verfeinerung, z. B. bei der Neueinordnung mit Rohvektoren, werden vorübergehend hochpräzise Daten in den Speicher geladen. Für eine Suche, die die 10 besten Ergebnisse mit einer Expansionsrate von 5 abruft, kann der Verfeinerungs-Overhead wie folgt geschätzt werden:</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Other-considerations" class="common-anchor-header">Weitere Überlegungen</h3><p>Während IVF und graphenbasierte Indizes die Speichernutzung durch Quantisierung optimieren, befassen sich memory-mapped files (mmap) und DiskANN mit Szenarien, in denen Datensätze den verfügbaren Arbeitsspeicher (RAM) übersteigen.</p>
<h4 id="DiskANN" class="common-anchor-header">DiskANN</h4><p>DiskANN ist ein auf einem Vamana-Graphen basierender Index, der Datenpunkte für eine effiziente Navigation während der Suche miteinander verbindet und gleichzeitig PQ anwendet, um die Größe der Vektoren zu reduzieren und eine schnelle Berechnung des ungefähren Abstands zwischen Vektoren zu ermöglichen.</p>
<p>Der Vamana-Graph wird auf der Festplatte gespeichert, so dass DiskANN große Datensätze verarbeiten kann, die andernfalls nicht in den Speicher passen würden. Dies ist besonders nützlich für Datensätze mit Milliarden von Punkten.</p>
<h4 id="Memory-mapped-files-mmap" class="common-anchor-header">Speicherabbildende Dateien (mmap)</h4><p>Memory-Mapping (Mmap) ermöglicht den direkten Speicherzugriff auf große Dateien auf der Festplatte, so dass Milvus Indizes und Daten sowohl im Speicher als auch auf den Festplatten speichern kann. Dieser Ansatz trägt zur Optimierung von E/A-Vorgängen bei, indem er den Overhead von E/A-Aufrufen auf der Grundlage der Zugriffshäufigkeit reduziert und so die Speicherkapazität für Sammlungen erweitert, ohne die Suchleistung wesentlich zu beeinträchtigen.</p>
<p>Insbesondere können Sie Milvus so konfigurieren, dass die Rohdaten in bestimmten Feldern im Speicher abgebildet werden, anstatt sie vollständig in den Speicher zu laden. Auf diese Weise können Sie direkten Speicherzugriff auf die Felder erhalten, ohne sich über Speicherprobleme Gedanken machen zu müssen, und die Kapazität der Sammlung erweitern.</p>
