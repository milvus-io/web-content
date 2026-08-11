---
id: snapshot-use-cases.md
title: Anwendungsfälle für SnapshotsCompatible with Milvus 3.0.x
summary: In diesem Leitfaden finden Sie gängige Anwendungsfälle für Snapshots.
beta: Milvus 3.0.x
---
<h1 id="Snapshot-Use-Cases" class="common-anchor-header">Anwendungsfälle für Snapshots<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Snapshot-Use-Cases" class="anchor-icon" translate="no">
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
    </button></h1><p>In diesem Leitfaden finden Sie gängige Anwendungsfälle für Snapshots.</p>
<h2 id="Data-backup-and-restoration" class="common-anchor-header">Datensicherung und -wiederherstellung<button data-href="#Data-backup-and-restoration" class="anchor-icon" translate="no">
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
    </button></h2><p>Snapshots sind schnelle Momentaufnahmen von Daten, die sich für schnelle Rollbacks oder Tests eignen (Tage bis Wochen). Im Gegensatz dazu sind Backups eigenständige, vollständige Kopien, die separat gespeichert werden – für die langfristige Notfallwiederherstellung (Wochen bis Jahre) und zum besseren Schutz vor einem vollständigen Speicherausfall.</p>
<p>Die folgende Tabelle vergleicht Snapshots und Backups.</p>
<table>
   <tr>
     <th></th>
     <th><p>Sicherung</p></th>
     <th><p>Snapshot</p></th>
   </tr>
   <tr>
     <td><p>Erstellung der Sicherung</p></td>
     <td><p>Kopiert alle Datendateien (zeitaufwendig)</p></td>
     <td><p>Erstellt nur Metadaten (in Millisekunden)</p></td>
   </tr>
   <tr>
     <td><p>Wiederherstellung</p></td>
     <td><p>Importiert Daten und baut Indizes neu auf</p></td>
     <td><p>Kopiert nur vorhandene Daten- und Indexdateien</p></td>
   </tr>
   <tr>
     <td><p>Leistung</p></td>
     <td><p>Langsam und ressourcenintensiv</p></td>
     <td><p>Schnell und ressourcenschonend (in Sekunden bis Minuten)</p></td>
   </tr>
   <tr>
     <td><p>Auswirkungen auf das System</p></td>
     <td><p>Hohe E/A- und CPU-Auslastung</p></td>
     <td><p>Minimale Auswirkungen</p></td>
   </tr>
</table>
<p>Das Erstellen eines Snapshots dauert in der Regel Millisekunden, und die Wiederherstellung dauert je nach Datenvolumen Sekunden bis Minuten.</p>
<p>Weitere Informationen zu Snapshot-Limits, Einschränkungen und deren Auswirkungen auf das System finden Sie unter <a href="/docs/de/snapshots.md">„Snapshots</a>“.</p>
<h2 id="Data-processing-with-external-collections" class="common-anchor-header">Datenverarbeitung mit externen Sammlungen<button data-href="#Data-processing-with-external-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>Snapshots können stabile, zeitpunktbezogene Quellen für Analyse- oder Validierungsaufgaben bereitstellen. Verwenden Sie für Milvus-Snapshots das externe Sammlungsformat „ <code translate="no">milvus-table</code> “, anstatt Snapshot-Dateien direkt als generische Spark-Eingabe einzulesen. Ein Milvus-Snapshot speichert Metadaten der Sammlung, Segmentmanifeste, Löschprotokolle und Primärschlüsselstatistiken. Daher benötigt Milvus die Snapshot-Metadaten im JSON-Format sowie den „ <code translate="no">milvus-table</code> “-Reader, um das korrekte Schema und die Löschsemantik beizubehalten.</p>
<p>Dieser Workflow erstellt eine abfragbare externe Sammlung über die Snapshot-Daten. Die Daten der Hauptspalte werden weiterhin aus der Snapshot-Quelle referenziert, und die Aktualisierung ordnet die StorageV3-Manifeste der Quelle den externen Zielsegmenten zu.</p>
<h3 id="Step-1-Get-the-snapshot-metadata-path" class="common-anchor-header">Schritt 1: Den Pfad zu den Snapshot-Metadaten abrufen<button data-href="#Step-1-Get-the-snapshot-metadata-path" class="anchor-icon" translate="no">
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
    </button></h3><p>Erstellen Sie einen Snapshot aus einer normalen Milvus-Sammlung oder wählen Sie einen aus und beschreiben Sie ihn anschließend, um seinen Speicherort im Objektspeicher zu ermitteln.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

snapshot_info = client.describe_snapshot(
    snapshot_name=<span class="hljs-string">&quot;analytics_snapshot_20260321&quot;</span>,
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    include_collection_info=<span class="hljs-literal">True</span>
)

external_source = <span class="hljs-string">f&quot;s3://bucket/<span class="hljs-subst">{snapshot_info.s3_location}</span>&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Create-and-refresh-a-milvus-table-external-collection" class="common-anchor-header">Schritt 2: Erstellen und Aktualisieren einer externen „ <code translate="no">milvus-table</code> “-Sammlung<button data-href="#Step-2-Create-and-refresh-a-milvus-table-external-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Erstellen Sie eine externe Sammlung, deren Schema mit der Snapshot-Quellsammlung übereinstimmt. Setzen Sie „ <code translate="no">external_spec.format</code> “ auf „ <code translate="no">&quot;milvus-table&quot;</code> “ und legen Sie für jedes Zieldatenfeld unter „ <code translate="no">external_field</code> “ den entsprechenden Quellfeldnamen fest.</p>
<pre><code translate="no" class="language-python">schema = client.create_schema(
    external_source=external_source,
    external_spec=<span class="hljs-string">&quot;&quot;&quot;{
        &quot;format&quot;: &quot;milvus-table&quot;,
        &quot;extfs&quot;: {
            &quot;cloud_provider&quot;: &quot;aws&quot;,
            &quot;region&quot;: &quot;us-west-2&quot;,
            &quot;access_key_id&quot;: &quot;YOUR_ACCESS_KEY&quot;,
            &quot;access_key_value&quot;: &quot;YOUR_SECRET_KEY&quot;
        }
    }&quot;&quot;&quot;</span>,
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    external_field=<span class="hljs-string">&quot;id&quot;</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    external_field=<span class="hljs-string">&quot;embedding&quot;</span>,
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;snapshot_external_collection&quot;</span>,
    schema=schema,
)

job_id = client.refresh_external_collection(
    collection_name=<span class="hljs-string">&quot;snapshot_external_collection&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Nach Abschluss der Aktualisierung können Sie Indizes erstellen, die externe Sammlung laden und Such- oder Abfragevorgänge für die auf dem Snapshot basierende Ansicht ausführen.</p>
