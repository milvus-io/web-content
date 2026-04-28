---
id: data_processing.md
summary: Informieren Sie sich über das Datenverarbeitungsverfahren in Milvus.
title: Datenverarbeitung
---
<h1 id="Data-Processing" class="common-anchor-header">Datenverarbeitung<button data-href="#Data-Processing" class="anchor-icon" translate="no">
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
    </button></h1><p>Dieser Artikel enthält eine detaillierte Beschreibung der Implementierung von Dateneinfügung, Indexaufbau und Datenabfrage in Milvus.</p>
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
    </button></h2><p>Sie können wählen, wie viele Shards eine Sammlung in Milvus verwendet - jeder Shard ist einem virtuellen Kanal<em>(vchannel</em>) zugeordnet. Wie unten dargestellt, weist Milvus dann jeden <em>vChannel</em> einem physischen Channel<em>(pChannel</em>) zu, und jeder <em>pChannel</em> ist an einen bestimmten Streaming-Knoten gebunden.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/pvchannel_wal.png" alt="VChannel PChannel and StreamingNode" class="doc-image" id="vchannel-pchannel-and-streamingnode" />
   </span> <span class="img-wrapper"> <span>VKanal PC-Kanal und StreamingNode</span> </span></p>
<p>Nach der Datenüberprüfung teilt der Proxy die geschriebene Nachricht in verschiedene Datenpakete von Shards gemäß den festgelegten Shard-Routing-Regeln auf.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/channels_1.png" alt="Channels 1" class="doc-image" id="channels-1" />
   </span> <span class="img-wrapper"> <span>Kanäle 1</span> </span></p>
<p>Dann werden die geschriebenen Daten eines Shards<em>(vchannel</em>) an den entsprechenden Streaming Node von <em>pchannel</em> gesendet.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/written_data_flow.png" alt="write flow" class="doc-image" id="write-flow" />
   </span> <span class="img-wrapper"> <span>Schreibfluss</span> </span></p>
<p>Der Streaming-Knoten weist jedem Datenpaket ein Zeitstempel-Orakel (TSO) zu, um eine Gesamtreihenfolge der Vorgänge festzulegen. Er führt Konsistenzprüfungen an der Nutzlast durch, bevor er sie in das zugrunde liegende Write-Ahead-Log (WAL) schreibt. Sobald die Daten dauerhaft im WAL gespeichert sind, gehen sie garantiert nicht mehr verloren - selbst im Falle eines Absturzes kann der StreamingNode das WAL erneut abspielen, um alle anstehenden Vorgänge vollständig wiederherzustellen.</p>
<p>In der Zwischenzeit zerlegt der StreamingNode die übertragenen WAL-Einträge asynchron in einzelne Segmente. Es gibt zwei Segmenttypen:</p>
<ul>
<li><strong>Wachsendes Segment</strong>: alle Daten, die noch nicht im Objektspeicher vorhanden sind.</li>
<li><strong>Versiegeltes Segment</strong>: alle Daten wurden in den Objektspeicher persistiert, die Daten des versiegelten Segments sind unveränderlich.</li>
</ul>
<p>Der Übergang von einem wachsenden Segment in ein versiegeltes Segment wird als Flush bezeichnet. Der Streaming Node löst einen Flush aus, sobald er alle verfügbaren WAL-Einträge für dieses Segment aufgenommen und geschrieben hat, d. h. wenn es keine ausstehenden Datensätze mehr im zugrunde liegenden Write-Ahead-Log gibt.</p>
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
    </button></h2><p>Der Indexaufbau wird von den Datenknoten durchgeführt. Um häufige Indexerstellung bei Datenaktualisierungen zu vermeiden, wird eine Sammlung in Milvus weiter in Segmente unterteilt, die jeweils einen eigenen Index haben.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/index_building.png" alt="Index building" class="doc-image" id="index-building" />
   </span> <span class="img-wrapper"> <span>Indexerstellung</span> </span></p>
<p>Milvus unterstützt die Indexerstellung für jedes Vektorfeld, Skalarfeld und Primärfeld. Sowohl die Eingabe als auch die Ausgabe der Indexerstellung greifen auf die Objektspeicherung zu: Der Datenknoten lädt die zu indizierenden Protokoll-Snapshots aus einem Segment (das sich im Objektspeicher befindet) in den Speicher, deserialisiert die entsprechenden Daten und Metadaten für den Indexaufbau, serialisiert den Index nach Abschluss des Indexaufbaus und schreibt ihn zurück in den Objektspeicher.</p>
<p>Der Indexaufbau umfasst hauptsächlich Vektor- und Matrixoperationen und ist daher rechen- und speicherintensiv. Vektoren können aufgrund ihrer hochdimensionalen Natur nicht effizient mit traditionellen baumbasierten Indizes indiziert werden, aber sie können mit Techniken indiziert werden, die in diesem Bereich ausgereifter sind, wie z. B. cluster- oder graphbasierte Indizes. Unabhängig von der Art des Indexes erfordert die Indexerstellung massive iterative Berechnungen für große Vektoren, wie Kmeans oder Graph Traverse.</p>
<p>Anders als bei der Indexierung skalarer Daten muss bei der Erstellung von Vektorindizes die SIMD-Beschleunigung (Single Instruction, Multiple Data) voll genutzt werden. Milvus bietet von Haus aus Unterstützung für SIMD-Befehlssätze, z. B. SSE, AVX2 und AVX512. Angesichts des "Schluckaufs" und der ressourcenintensiven Natur der Vektorindexerstellung ist Elastizität für Milvus in wirtschaftlicher Hinsicht von entscheidender Bedeutung. Zukünftige Milvus-Versionen werden die Erforschung von heterogenem Computing und serverloser Berechnung weiter vorantreiben, um die damit verbundenen Kosten zu senken.</p>
<p>Außerdem unterstützt Milvus auch skalare Filterung und Primärfeldabfragen. Es verfügt über eingebaute Indizes zur Verbesserung der Abfrageeffizienz, z. B. Bloom-Filter-Indizes, Hash-Indizes, baumbasierte Indizes und invertierte Indizes, und plant die Einführung weiterer externer Indizes, z. B. Bitmap-Indizes und grobe Indizes.</p>
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
    </button></h2><p>Die Datenabfrage bezieht sich auf das Durchsuchen einer bestimmten Sammlung nach <em>k</em> Vektoren, die einem Zielvektor am nächsten liegen, oder nach <em>allen</em> Vektoren innerhalb eines bestimmten Abstandsbereichs zum Vektor. Die Vektoren werden zusammen mit den entsprechenden Primärschlüsseln und Feldern zurückgegeben.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/data_query.jpg" alt="Data query" class="doc-image" id="data-query" />
   </span> <span class="img-wrapper"> <span>Datenabfrage</span> </span></p>
<p>Eine Sammlung in Milvus ist in mehrere Segmente aufgeteilt; der Streaming-Knoten lädt wachsende Segmente und verwaltet Echtzeitdaten, während die Abfrageknoten versiegelte Segmente laden.</p>
<p>Wenn eine Abfrage/Suchanfrage eintrifft, sendet der Proxy die Anfrage an alle Streaming Nodes, die für die entsprechenden Shards zuständig sind, um eine gleichzeitige Suche zu ermöglichen.</p>
<p>Wenn eine Abfrageanfrage eintrifft, fordert der Proxy die Streaming Nodes, die die entsprechenden Shards halten, gleichzeitig auf, die Suche durchzuführen.</p>
<p>Jeder Streaming-Knoten erstellt einen Abfrageplan, durchsucht seine lokalen wachsenden Daten und kontaktiert gleichzeitig entfernte Abfrageknoten, um historische Ergebnisse abzurufen, und fasst diese dann zu einem einzigen Shard-Ergebnis zusammen.</p>
<p>Schließlich sammelt der Proxy alle Shard-Ergebnisse, führt sie zu einem Endergebnis zusammen und sendet es an den Client zurück.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/handoff.png" alt="Handoff" class="doc-image" id="handoff" />
   </span> <span class="img-wrapper"> <span>Weiterleitung</span> </span></p>
<p>Wenn das wachsende Segment auf einem Streaming-Knoten in ein versiegeltes Segment gespült wird - oder wenn ein Datenknoten eine Verdichtung abschließt - initiiert der Koordinator eine Übergabeoperation, um diese wachsenden Daten in historische Daten umzuwandeln. Anschließend verteilt der Koordinator die versiegelten Segmente gleichmäßig auf alle Abfrageknoten, wobei er die Speichernutzung, den CPU-Overhead und die Segmentanzahl ausgleicht, und gibt alle redundanten Segmente frei.</p>
<h2 id="Whats-next" class="common-anchor-header">Was kommt als Nächstes?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
