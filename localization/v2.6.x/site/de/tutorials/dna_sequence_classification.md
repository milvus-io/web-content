---
id: dna_sequence_classification.md
summary: Erstellen Sie mit Milvus ein System zur Klassifizierung von DNA-Sequenzen.
title: Klassifizierung von DNA-Sequenzen
---
<h1 id="DNA-Sequence-Classification" class="common-anchor-header">Klassifizierung von DNA-Sequenzen<button data-href="#DNA-Sequence-Classification" class="anchor-icon" translate="no">
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
    </button></h1><p>Dieses Tutorial zeigt, wie Milvus, die Open-Source-Vektor-Datenbank, verwendet wird, um ein DNA-Sequenz-Klassifizierungsmodell zu erstellen.</p>
<p>Das ML-Modell und die verwendete Software von Drittanbietern umfassen:</p>
<ul>
<li>CountVectorizer</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">Towhee</a></li>
</ul>
<p><br/></p>
<p>Die DNA-Sequenz ist ein beliebtes Konzept für die Rückverfolgbarkeit von Genen, die Identifizierung von Arten, die Diagnose von Krankheiten und viele andere Bereiche. Während alle Branchen nach einer intelligenteren und effizienteren Forschungsmethode suchen, hat die künstliche Intelligenz vor allem im biologischen und medizinischen Bereich viel Aufmerksamkeit auf sich gezogen. Immer mehr Wissenschaftler und Forscher leisten einen Beitrag zum maschinellen Lernen und zum Deep Learning auf dem Gebiet der Bioinformatik. Um experimentelle Ergebnisse überzeugender zu machen, besteht eine gängige Option darin, den Stichprobenumfang zu erhöhen. Die Zusammenarbeit mit Big Data in der Genomik bringt in der Realität mehr Anwendungsmöglichkeiten mit sich. Der traditionelle Sequenzabgleich hat jedoch seine Grenzen, so dass er für große Datensätze nicht geeignet ist. Um in der Realität weniger Kompromisse eingehen zu müssen, ist die Vektorisierung eine gute Wahl für einen großen Datensatz von DNA-Sequenzen.</p>
<p><br/></p>
<p>In diesem Tutorial lernen Sie, wie Sie ein DNA-Sequenz-Klassifikationsmodell erstellen. Dieses Tutorial verwendet CountVectorizer, um Merkmale von DNA-Sequenzen zu extrahieren und sie in Vektoren umzuwandeln. Anschließend werden diese Vektoren in Milvus gespeichert und die entsprechenden DNA-Klassen in MySQL abgelegt. Benutzer können eine Vektorähnlichkeitssuche in Milvus durchführen und die entsprechende DNA-Klassifikation aus MySQL abrufen.</p>
<p><br/></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/dna.png" alt="dna" class="doc-image" id="dna" />
   </span> <span class="img-wrapper"> <span>dna</span> </span></p>
