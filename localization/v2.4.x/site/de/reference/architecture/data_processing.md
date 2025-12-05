---
id: data_processing.md
summary: Informieren Sie sich über das Datenverarbeitungsverfahren in Milvus.
title: Datenverarbeitung
---
<h1 id="Data-processing" class="common-anchor-header">Datenverarbeitung<button data-href="#Data-processing" class="anchor-icon" translate="no">
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
    </button></h1><p>Dieser Artikel enthält eine detaillierte Beschreibung der Implementierung von Dateneinfügung, Indexerstellung und Datenabfrage in Milvus.</p>
<h2 id="Data-insertion" class="common-anchor-header">Einfügen von Daten<button data-href="#Data-insertion" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können eine Anzahl von Shards für jede Sammlung in Milvus angeben, wobei jeder Shard einem virtuellen Kanal<em>(vchannel</em>) entspricht. Wie die folgende Abbildung zeigt, weist Milvus jedem vchannel im Log-Broker einen physischen Kanal<em>(pchannel</em>) zu. Jede eingehende Einfüge-/Löschanforderung wird basierend auf dem Hash-Wert des Primärschlüssels an die Shards weitergeleitet.</p>
<p>Die Validierung von DML-Anfragen wird auf den Proxy verlagert, da Milvus keine komplizierten Transaktionen hat. Der Proxy fordert für jede Einfüge-/Löschanforderung einen Zeitstempel vom TSO (Timestamp Oracle) an, dem Zeitmodul, das mit dem Stammkoordinator zusammenarbeitet. Da der ältere Zeitstempel durch den neueren überschrieben wird, werden die Zeitstempel verwendet, um die Reihenfolge der zu verarbeitenden Datenanforderungen zu bestimmen. Der Proxy ruft Informationen in Stapeln von der Datenkoordination ab, einschließlich der Segmente und Primärschlüssel der Entitäten, um den Gesamtdurchsatz zu erhöhen und eine Überlastung des zentralen Knotens zu vermeiden.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/channels_1.jpg" alt="Channels 1" class="doc-image" id="channels-1" />
   </span> <span class="img-wrapper"> <span>Kanäle 1</span> </span></p>
<p>Sowohl DML (Data Manipulation Language)-Operationen als auch DDL (Data Definition Language)-Operationen werden in die Protokollsequenz geschrieben, aber DDL-Operationen werden aufgrund ihrer geringen Häufigkeit nur einem Kanal zugeordnet.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/channels_2.jpg" alt="Channels 2" class="doc-image" id="channels-2" />
   </span> <span class="img-wrapper"> <span>Kanäle 2</span> </span></p>
<p><em>V-Kanäle</em> werden in den zugrunde liegenden Log-Broker-Knoten verwaltet. Jeder Kanal ist physisch unteilbar und nur für einen einzigen Knoten verfügbar. Wenn die Dateneingangsrate einen Engpass erreicht, sind zwei Dinge zu beachten: ob der Log-Broker-Knoten überlastet ist und skaliert werden muss, und ob genügend Shards vorhanden sind, um einen Lastausgleich für jeden Knoten zu gewährleisten.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/write_log_sequence.jpg" alt="Write log sequence" class="doc-image" id="write-log-sequence" />
   </span> <span class="img-wrapper"> <span>Log-Sequenz schreiben</span> </span></p>
<p>Das obige Diagramm zeigt vier Komponenten, die am Prozess des Schreibens von Protokollsequenzen beteiligt sind: Proxy, Log Broker, Datenknoten und Objektspeicher. Der Prozess umfasst vier Aufgaben: Validierung von DML-Anforderungen, Veröffentlichung und Abonnement der Protokollsequenz, Konvertierung von einem Streaming-Protokoll in Protokoll-Snapshots und Persistenz der Protokoll-Snapshots. Die vier Aufgaben sind voneinander entkoppelt, um sicherzustellen, dass jede Aufgabe von dem entsprechenden Knotentyp bearbeitet wird. Knoten desselben Typs sind gleichberechtigt und können elastisch und unabhängig skaliert werden, um verschiedene Datenlasten, insbesondere massive und stark schwankende Streaming-Daten, zu bewältigen.</p>
<h2 id="Index-building" class="common-anchor-header">Indexaufbau<button data-href="#Index-building" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Indexaufbau wird von Indexknoten durchgeführt. Um häufige Indexerstellung bei Datenaktualisierungen zu vermeiden, wird eine Sammlung in Milvus weiter in Segmente unterteilt, die jeweils einen eigenen Index haben.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/index_building.jpg" alt="Index building" class="doc-image" id="index-building" />
   </span> <span class="img-wrapper"> <span>Indexerstellung</span> </span></p>
<p>Milvus unterstützt den Aufbau von Indizes für jedes Vektorfeld, Skalarfeld und Primärfeld. Sowohl die Eingabe als auch die Ausgabe der Indexerstellung greifen auf die Objektspeicherung zu: Der Indexknoten lädt die zu indizierenden Protokoll-Snapshots aus einem Segment (das sich im Objektspeicher befindet) in den Speicher, deserialisiert die entsprechenden Daten und Metadaten für den Indexaufbau, serialisiert den Index nach Abschluss des Indexaufbaus und schreibt ihn zurück in den Objektspeicher.</p>
<p>Der Indexaufbau umfasst hauptsächlich Vektor- und Matrixoperationen und ist daher rechen- und speicherintensiv. Vektoren können aufgrund ihrer hochdimensionalen Beschaffenheit nicht effizient mit herkömmlichen baumbasierten Indizes indiziert werden, wohl aber mit speziell für diese Aufgabe entwickelten Techniken wie cluster- oder graphbasierten Indizes. Unabhängig von der Art der Indizierung erfordert der Aufbau eines Index massive iterative Berechnungen für große Vektoren, wie z. B. K-means oder Graphentraversal.</p>
<p>Im Gegensatz zur Indizierung skalarer Daten profitiert die Erstellung eines Vektorindexes in hohem Maße von der SIMD-Beschleunigung (Einzelbefehl, mehrere Daten). Milvus bietet von Haus aus Unterstützung für SIMD-Befehlssätze, z. B. SSE, AVX2 und AVX512. Angesichts des "Schluckaufs" und der ressourcenintensiven Natur der Vektorindexerstellung ist Elastizität für Milvus in wirtschaftlicher Hinsicht von entscheidender Bedeutung. Zukünftige Milvus-Versionen werden die Erforschung von heterogenem Computing und serverloser Berechnung weiter vorantreiben, um die damit verbundenen Kosten zu senken.</p>
<p>Milvus unterstützt auch skalare Filterung und Primärfeldabfragen. Es verfügt über eingebaute Indizes zur Verbesserung der Abfrageeffizienz, z. B. Bloom-Filter-Indizes, Hash-Indizes, baumbasierte Indizes und invertierte Indizes, und plant die Einführung weiterer externer Indizes, z. B. Bitmap-Indizes und grobe Indizes.</p>
<h2 id="Data-query" class="common-anchor-header">Datenabfrage<button data-href="#Data-query" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Begriff "Datenabfrage" bezieht sich auf das Durchsuchen einer bestimmten Sammlung nach <em>k</em> Vektoren, die einem Zielvektor am nächsten liegen, oder nach <em>allen</em> Vektoren innerhalb eines bestimmten Abstands zum Vektor. Die Vektoren werden zusammen mit dem entsprechenden Primärschlüssel und den Feldern zurückgegeben.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/data_query.jpg" alt="Data query" class="doc-image" id="data-query" />
   </span> <span class="img-wrapper"> <span>Datenabfrage</span> </span></p>
<p>Eine Sammlung in Milvus ist in mehrere Segmente unterteilt, und die Abfrageknoten laden Indizes nach Segment. Wenn eine Suchanfrage eintrifft, wird sie an alle Abfrageknoten gesendet, um eine gleichzeitige Suche durchzuführen. Jeder Knoten durchforstet dann die lokalen Segmente, sucht nach Vektoren, die den Kriterien entsprechen, und reduziert die Suchergebnisse und gibt sie zurück.</p>
<p>Die Abfrageknoten sind bei einer Datenabfrage unabhängig voneinander. Jeder Knoten ist nur für zwei Aufgaben zuständig: Laden oder Freigeben von Segmenten gemäß den Anweisungen des Abfragekoordinators und Durchführen einer Suche innerhalb der lokalen Segmente. Und der Proxy ist für die Reduzierung der Suchergebnisse von jedem Abfrageknoten und die Rückgabe der Endergebnisse an den Client verantwortlich.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/handoff.jpg" alt="Handoff" class="doc-image" id="handoff" />
   </span> <span class="img-wrapper"> <span>Weiterleitung</span> </span></p>
<p>Es gibt zwei Arten von Segmenten: wachsende Segmente (für inkrementelle Daten) und geschlossene Segmente (für historische Daten). Abfrageknoten abonnieren den vchannel, um aktuelle Aktualisierungen (inkrementelle Daten) als wachsende Segmente zu erhalten. Wenn ein wachsendes Segment einen vordefinierten Schwellenwert erreicht, wird es von der Datenkoordination versiegelt und der Indexaufbau beginnt. Anschließend werden die inkrementellen Daten durch eine vom Abfragekoordinator initiierte <em>Übergabeoperation</em> in historische Daten umgewandelt. Die Abfragekoordination verteilt die versiegelten Segmente gleichmäßig auf alle Abfrageknoten entsprechend der Speichernutzung, dem CPU-Overhead und der Segmentanzahl.</p>
<h2 id="Whats-next" class="common-anchor-header">Der nächste Schritt<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Erfahren Sie, wie Sie <a href="https://milvus.io/blog/deep-dive-5-real-time-query.md">die Milvus-Vektordatenbank für Echtzeitabfragen nutzen</a> können.</li>
<li>Lernen Sie das <a href="https://milvus.io/blog/deep-dive-4-data-insertion-and-data-persistence.md">Einfügen von Daten und die Datenpersistenz in Milvus</a> kennen.</li>
<li>Lernen Sie, wie <a href="https://milvus.io/blog/deep-dive-3-data-processing.md">Daten in Milvus verarbeitet werden</a>.</li>
</ul>
