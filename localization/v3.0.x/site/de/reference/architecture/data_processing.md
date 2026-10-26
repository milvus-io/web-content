---
id: data_processing.md
summary: Erfahren Sie mehr über den Datenverarbeitungsprozess in Milvus.
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
    </button></h1><p>Dieser Artikel enthält eine detaillierte Beschreibung der Implementierung von Dateneinfügung, Indexerstellung und Datenabfrage in Milvus.</p>
<h2 id="Data-insertion" class="common-anchor-header">Dateneinfügung<button data-href="#Data-insertion" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können festlegen, wie viele Shards eine Sammlung in Milvus verwendet – jeder Shard wird einem virtuellen Kanal (<em>vchannel</em>) zugeordnet. Wie unten dargestellt, ordnet Milvus anschließend jeden <em>vchannel</em> einem physischen Kanal (<em>pchannel</em>) zu, und jeder <em>pchannel</em> ist an einen bestimmten Streaming-Knoten gebunden.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/pvchannel_wal.png" alt="VChannel, PChannel, and Streaming Node" class="doc-image" id="vchannel,-pchannel,-and-streaming-node" /> 
   <span>VChannel, PChannel und Streaming-Knoten</span>
  
 </span></p>
<p>Nach der Datenüberprüfung teilt der Proxy die geschriebene Nachricht gemäß den festgelegten Shard-Routing-Regeln in verschiedene Datenpakete der Shards auf.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/channels_1.png" alt="Channels 1" class="doc-image" id="channels-1" /> 
   <span>Kanäle 1</span>
  
 </span></p>
<p>Anschließend werden die geschriebenen Daten eines Shards (<em>vChannel</em>) an den entsprechenden Streaming-Knoten des <em>pChannel</em> gesendet.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/written_data_flow.png" alt="write flow" class="doc-image" id="write-flow" /> 
   <span>Schreibablauf</span>
  
 </span></p>
<p>Der Streaming-Knoten weist jedem Datenpaket einen Timestamp Oracle (TSO) zu, um eine vollständige Reihenfolge der Operationen festzulegen. Er führt Konsistenzprüfungen der Nutzdaten durch, bevor er diese in das zugrunde liegende Write-Ahead-Log (WAL) schreibt. Sobald Daten dauerhaft im WAL festgeschrieben sind, ist garantiert, dass sie nicht verloren gehen – selbst im Falle eines Absturzes kann der Streaming-Knoten das WAL wiedergeben, um alle ausstehenden Operationen vollständig wiederherzustellen.</p>
<p>Gleichzeitig zerlegt der Streaming-Knoten die festgeschriebenen WAL-Einträge asynchron in einzelne Segmente. Es gibt zwei Segmenttypen:</p>
<ul>
<li><strong>Wachsendes Segment</strong>: Alle Daten, die noch nicht im Objektspeicher dauerhaft gespeichert wurden.</li>
<li><strong>Versiegeltes Segment</strong>: Alle Daten wurden im Objektspeicher dauerhaft gespeichert; die Daten eines versiegelten Segments sind unveränderlich.</li>
</ul>
<p>Der Übergang eines wachsenden Segments in ein versiegeltes Segment wird als „Flush“ bezeichnet. Der Streaming-Knoten löst einen Flush aus, sobald er alle verfügbaren WAL-Einträge für dieses Segment erfasst und geschrieben hat – d. h., wenn keine ausstehenden Datensätze mehr im zugrunde liegenden Write-Ahead-Log vorhanden sind. Zu diesem Zeitpunkt wird das Segment finalisiert und für den Lesezugriff optimiert.</p>
<h2 id="Index-building" class="common-anchor-header">Indexerstellung<button data-href="#Index-building" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Indexerstellung erfolgt durch den Datenknoten. Um eine häufige Indexerstellung bei Datenaktualisierungen zu vermeiden, wird eine Sammlung in Milvus weiter in Segmente unterteilt, von denen jedes über einen eigenen Index verfügt.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/index_building.png" alt="Index building" class="doc-image" id="index-building" /> 
   <span>Indexaufbau</span>
  
 </span></p>
<p>Milvus unterstützt die Indexerstellung für jedes Vektorfeld, jedes Skalarfeld und jedes Primärfeld. Sowohl die Eingabe als auch die Ausgabe der Indexerstellung erfolgen über den Objektspeicher: Der Datenknoten lädt die zu indizierenden Protokoll-Snapshots aus einem Segment (das sich im Objektspeicher befindet) in den Arbeitsspeicher, deserialisiert die entsprechenden Daten und Metadaten zur Erstellung des Index, serialisiert den Index nach Abschluss der Indexerstellung und schreibt ihn zurück in den Objektspeicher.</p>
<p>Die Indexerstellung umfasst hauptsächlich Vektor- und Matrixoperationen und ist daher rechen- und speicherintensiv. Vektoren lassen sich aufgrund ihrer hohen Dimension nicht effizient mit herkömmlichen baumbasierten Indizes indizieren, können jedoch mit in diesem Bereich ausgereifteren Techniken wie cluster- oder graphenbasierten Indizes indiziert werden. Unabhängig vom Typ erfordert der Indexaufbau bei großdimensionalen Vektoren umfangreiche iterative Berechnungen, wie beispielsweise K-Means oder Graphdurchläufe.</p>
<p>Im Gegensatz zur Indizierung skalarer Daten muss die Erstellung von Vektorindizes die Vorteile der SIMD-Beschleunigung (Single Instruction, Multiple Data) voll ausschöpfen. Milvus bietet native Unterstützung für SIMD-Befehlssätze wie beispielsweise SSE, AVX2 und AVX512. Angesichts der „Hürden“ und des hohen Ressourcenbedarfs beim Aufbau von Vektorindizes kommt der Skalierbarkeit für Milvus aus wirtschaftlicher Sicht entscheidende Bedeutung zu. Zukünftige Milvus-Versionen werden weitere Möglichkeiten im Bereich des heterogenen und serverlosen Rechnens ausloten, um die damit verbundenen Kosten zu senken.</p>
<p>Darüber hinaus unterstützt Milvus auch skalare Filterung und Abfragen nach Primärfeldern. Es verfügt über integrierte Indizes zur Verbesserung der Abfrageeffizienz, z. B. Bloom-Filter-Indizes, Hash-Indizes, baumbasierte Indizes und invertierte Indizes, und plant die Einführung weiterer externer Indizes, z. B. Bitmap-Indizes und Rough-Indizes.</p>
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
    </button></h2><p>Unter Datenabfrage versteht man den Vorgang, in einer bestimmten Sammlung nach <em>k</em> Vektoren zu suchen, die einem Zielvektor am nächsten liegen, oder nach <em>allen</em> Vektoren, die sich in einem bestimmten Abstandsbereich zu diesem Vektor befinden. Die Vektoren werden zusammen mit ihrem entsprechenden Primärschlüssel und ihren Feldern zurückgegeben.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/data_query.jpg" alt="Data query" class="doc-image" id="data-query" /> 
   <span>Datenabfrage</span>
  
 </span></p>
<p>Eine Sammlung in Milvus ist in mehrere Segmente unterteilt; der Streaming-Knoten lädt wachsende Segmente und verwaltet Echtzeitdaten, während die Abfrageknoten versiegelte Segmente laden.</p>
<p>Wenn eine Abfrage- oder Suchanfrage eintrifft, leitet der Proxy die Anfrage zur parallelen Suche an alle Streaming-Knoten weiter, die für die entsprechenden Shards zuständig sind.</p>
<p>Wenn eine Abfrageanforderung eintrifft, fordert der Proxy gleichzeitig die Streaming-Knoten, die die entsprechenden Shards enthalten, auf, die Suche auszuführen.</p>
<p>Jeder Streaming-Knoten erstellt einen Abfrageplan, durchsucht seine lokalen, sich vergrößernden Daten und kontaktiert gleichzeitig entfernte Abfrageknoten, um historische Ergebnisse abzurufen, und aggregiert diese anschließend zu einem einzigen Shard-Ergebnis.</p>
<p>Schließlich sammelt der Proxy alle Shard-Ergebnisse, führt sie zum Endergebnis zusammen und gibt dieses an den Client zurück.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/handoff.png" alt="Handoff" class="doc-image" id="handoff" /> 
   <span>Übergabe</span>
  
 </span></p>
<p>Wenn das wachsende Segment auf einem Streaming-Knoten in ein versiegeltes Segment übertragen wird – oder wenn ein Datenknoten eine Komprimierung abschließt –, leitet der Koordinator einen Übergabevorgang ein, um diese wachsenden Daten in historische Daten umzuwandeln. Anschließend verteilt der Koordinator die versiegelten Segmente gleichmäßig auf alle Abfrageknoten, wobei er die Speicherauslastung, den CPU-Overhead und die Segmentanzahl ausgleicht, und gibt alle redundanten Segmente frei.</p>
<h2 id="Whats-next" class="common-anchor-header">Was kommt als Nächstes<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Erfahren Sie, wie Sie <a href="https://milvus.io/blog/deep-dive-5-real-time-query.md">die Milvus-Vektordatenbank für Echtzeitabfragen nutzen können</a>.</li>
<li>Erfahren Sie mehr über <a href="https://milvus.io/blog/deep-dive-4-data-insertion-and-data-persistence.md">das Einfügen und die Persistenz von Daten in Milvus</a>.</li>
<li>Erfahren Sie, wie <a href="https://milvus.io/blog/deep-dive-3-data-processing.md">Daten in Milvus verarbeitet werden</a>.</li>
</ul>
