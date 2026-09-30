---
id: storage-v3.md
title: Speicher V3Compatible with Milvus 3.0.x
summary: >-
  Erfahren Sie, für welche Funktionen von Milvus 3.0 „Storage V3“ erforderlich
  ist, wie Sie diese aktivieren und welche Kompatibilitätsbeschränkungen gelten.
beta: Milvus 3.0.x
---
<h1 id="Storage-V3" class="common-anchor-header">Speicher V3<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Storage-V3" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">Übersicht<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>KI-Datensätze entwickeln sich oft weiter, nachdem eine Sammlung erstellt wurde. Wenn sich Modelle und Arbeitsabläufe ändern, müssen Teams möglicherweise Text hinzufügen, neue Vektorfelder für bestehende Entitäten generieren oder Daten verwenden, die außerhalb von Milvus gespeichert sind. Um diese Arbeitsabläufe zu unterstützen, ist ein Speichermodell erforderlich, das sich gemeinsam mit dem Datensatz weiterentwickeln kann.</p>
<p>Storage V3 bietet dieses Modell in Milvus 3.0. Es nutzt ein versioniertes Speicherlayout, um im Laufe der Zeit hinzugefügte oder überschriebene Daten zu integrieren, während Anwendungen weiterhin über dieselben Milvus-APIs auf Sammlungen zugreifen.</p>
<p>Storage V3 ist standardmäßig deaktiviert. Sobald „ <code translate="no">common.storage.useLoonFFI</code> “ wirksam wird, verwenden neue Schreibvorgänge und die Ergebnisse der Komprimierung Storage V3. Vorhandene Daten verbleiben in ihrem aktuellen Layout, bis die entsprechenden Daten durch die Hintergrundkomprimierung neu geschrieben werden. Milvus kann während dieser Übergangsphase beide Layouts lesen. Aktivieren Sie Storage V3, um die davon abhängigen Funktionen zu nutzen – nicht als allgemeine Leistungsoptimierung.</p>
<h2 id="Data-formats-in-Storage-V3" class="common-anchor-header">Datenformate in Storage V3<button data-href="#Data-formats-in-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><p>Storage V3 verwendet Manifeste, um Sammlungsdaten unabhängig vom zugrunde liegenden Datenformat zu beschreiben. Dadurch kann dieselbe Speicherschicht sowohl mit von Milvus verwalteten Daten als auch mit Daten arbeiten, die in einem externen System verbleiben.</p>
<h3 id="Managed-collection-file-formats" class="common-anchor-header">Dateiformate für verwaltete Sammlungen<button data-href="#Managed-collection-file-formats" class="anchor-icon" translate="no">
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
    </button></h3><p>Bei verwalteten Sammlungen wählt „ <code translate="no">dataNode.storage.format</code> “ das Dateiformat für neue Storage V3-Daten aus. Die Einstellung unterstützt die folgenden Werte:</p>
<table>
<thead>
<tr><th>Format</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">parquet</code></td><td>Das standardmäßige, weit verbreitete spaltenorientierte Dateiformat mit umfassender Ökosystemkompatibilität und ausgereiften Tools. Parquet organisiert Daten in Zeilengruppen und unterstützt spaltenweise Kodierung und Komprimierung, sodass Milvus nur die erforderlichen Spalten lesen und große sequenzielle Scans effizient verarbeiten kann.</td></tr>
<tr><td><code translate="no">vortex</code></td><td>Ein optionales, spaltenorientiertes Dateiformat der nächsten Generation, das auf erweiterbaren, kombinierbaren Kodierungen und umfangreichen Statistiken basiert. In Milvus unterstützt Vortex Spaltenprojektion, Bereichs- und Direktzugriffs-Lesevorgänge. Diese Funktionen können bei geeigneten Workloads unnötige Datenlesevorgänge reduzieren.</td></tr>
</tbody>
</table>
<p>Eine Änderung der „ <code translate="no">dataNode.storage.format</code> “-Einstellung wirkt sich auf neue Schreibvorgänge in „Storage V3“ aus. Bestehende Dateien behalten ihr aktuelles Format bei, bis die Komprimierung die entsprechenden Segmente neu schreibt. Bei den meisten Bereitstellungen sollte das Standardformat „ <code translate="no">parquet</code> “ beibehalten werden, es sei denn, repräsentative Benchmarks zeigen, dass „ <code translate="no">vortex</code> “ besser zu den jeweiligen Daten und Zugriffsmustern passt.</p>
<h3 id="External-collections-and-supported-source-formats" class="common-anchor-header">Externe Sammlungen und unterstützte Quellformate<button data-href="#External-collections-and-supported-source-formats" class="anchor-icon" translate="no">
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
    </button></h3><p>Externe Sammlungen ermöglichen es Milvus, Daten zu nutzen, die in externen Dateien oder Tabellen gespeichert sind. Storage V3 unterstützt die folgenden externen Quellformate:</p>
<table>
<thead>
<tr><th>Format</th><th>Kategorie</th><th>Erwartete Quelle</th><th>Unterstützung durch Storage V3</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">parquet</code></td><td>Dateiformat</td><td>Ein Verzeichnis oder ein Objektspeicher-Präfix, das Parquet-Dateien enthält.</td><td>Erkennt die Dateien, liest deren Metadaten und Zeilengruppen aus und erfasst sie in einem Storage V3-Manifest.</td></tr>
<tr><td><code translate="no">vortex</code></td><td>Dateiformat</td><td>Ein Verzeichnis oder ein Objekt-Speicher-Präfix, das Vortex-Dateien enthält.</td><td>Erkennt die Dateien und nutzt das Vortex-Layout sowie die Statistiken für Projektionen, Bereichs- und Direktzugriffs-Lesevorgänge.</td></tr>
<tr><td><code translate="no">lance-table</code></td><td>Tabellenformat</td><td>Ein Lance-Datensatzverzeichnis.</td><td>Liest die Metadaten des Datensatzes und ordnet dessen Fragmente einem Storage-V3-Manifest zu.</td></tr>
<tr><td><code translate="no">iceberg-table</code></td><td>Tabellenformat</td><td>Eine Iceberg-Metadaten-JSON-Datei und eine Snapshot-ID.</td><td>Löst den angegebenen Snapshot auf, ordnet dessen Datendateien zu und bewahrt Metadaten zu Positionslöschungen auf. Gleichheitslöschungen werden nicht unterstützt und müssen vor der Aktualisierung der externen Sammlung in Positionslöschungen umgewandelt werden.</td></tr>
</tbody>
</table>
<p>Externe Quellen sind schreibgeschützt. Storage V3 erstellt und aktualisiert sein eigenes Manifest, ohne die Quelldaten zu ändern oder zu kopieren. Milvus kann dann Indizes erstellen und Suchvorgänge sowie Abfragen über die Daten einer externen Sammlung ausführen.</p>
<h4 id="Cloud-storage-and-cross-account-authentication" class="common-anchor-header">Cloud-Speicher und kontoübergreifende Authentifizierung</h4><p>Die folgende Tabelle beschreibt lediglich, wie eine externe Sammlung auf Quelldaten zugreift, die in einem anderen Cloud-Konto gespeichert sind. Sie beschreibt nicht den Objektspeicher, der für von Milvus verwaltete Daten verwendet wird.</p>
<table>
<thead>
<tr><th>Cloud-Speicher</th><th>Unterstützte externe Formate</th><th>Kontoübergreifende Authentifizierung für externe Sammlungen</th></tr>
</thead>
<tbody>
<tr><td>Amazon S3</td><td>Alle vier oben aufgeführten Formate.</td><td>Geben Sie die ARN der kundeneigenen IAM-Rolle an. Storage V3 nutzt AWS STS- <code translate="no">AssumeRole</code>, um temporäre Anmeldeinformationen abzurufen und diese bei Bedarf zu aktualisieren. Sie können auch eine externe ID angeben, wenn dies gemäß der Vertrauensrichtlinie der Rolle erforderlich ist.</td></tr>
<tr><td>Google Cloud Storage (GCS)</td><td>Alle vier oben aufgeführten Formate.</td><td>Geben Sie das Ziel-Dienstkonto an. Storage V3 schlüpft in die Rolle dieses Dienstkontos, nutzt dessen kurzlebige OAuth-Zugriffstoken für den Zugriff auf den Quell-Bucket und aktualisiert die Token, bevor sie ablaufen.</td></tr>
<tr><td>Azure Blob Storage</td><td><code translate="no">parquet</code>, <code translate="no">vortex</code> und <code translate="no">lance-table</code>. <code translate="no">iceberg-table</code> wird nicht unterstützt.</td><td>Milvus fordert kurzlebige SAS-Anmeldeinformationen über den privaten gRPC-Dienst „ <code translate="no">milvus-tools</code> “ an. Storage V3 nutzt die SAS-Anmeldeinformationen für den Zugriff auf den Quellcontainer, und die Anmeldeinformationen werden vor ihrem Ablauf erneuert.</td></tr>
<tr><td>Azure Data Lake Storage Gen2 (ADLS Gen2)</td><td>Alle vier oben aufgeführten Formate.</td><td>Milvus fordert kurzlebige SAS-Anmeldeinformationen über den privaten gRPC-Dienst „ <code translate="no">milvus-tools</code> “ an. Storage V3 verwendet die SAS-Anmeldeinformationen für den Zugriff auf den Quellcontainer, und die Anmeldeinformationen werden vor ihrem Ablauf erneuert.</td></tr>
<tr><td>Alibaba Cloud Object Storage Service (OSS)</td><td>Alle vier oben aufgeführten Formate.</td><td>Geben Sie die ARN der kundeneigenen RAM-Rolle an. Storage V3 übernimmt die Rolle unter Verwendung der Workload-Identität der Laufzeitumgebung oder der ECS-RAM-Rolle und nutzt anschließend temporäre Anmeldeinformationen für den Zugriff auf den Quell-Bucket.</td></tr>
</tbody>
</table>
<p>Anweisungen zur Konfiguration und Verwendung der externen Erfassung finden Sie unter <a href="/docs/de/create-an-external-collection.md">„Externe Erfassung erstellen</a>“.</p>
<h2 id="Features-that-require-Storage-V3" class="common-anchor-header">Funktionen, die Storage V3 erfordern<button data-href="#Features-that-require-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Funktion</th><th>Beschreibung</th><th>Erforderliche Konfiguration</th></tr>
</thead>
<tbody>
<tr><td>Vortex-Dateiformat</td><td>Schreiben Sie neue Daten der verwalteten Sammlung im Vortex-Dateiformat.</td><td><ul><li><a href="/docs/de/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></li><li><code translate="no">dataNode.storage.format=vortex</code></li></ul></td></tr>
<tr><td><a href="/docs/de/text.md"><code translate="no">TEXT</code> Feld</a></td><td>Speichern Sie lange Quelltexte wie Passagen, Dokumente, Tickets oder Protokolle, ohne im Sammlungsschema eine feste maximale Länge festzulegen.</td><td><a href="/docs/de/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
<tr><td><a href="/docs/de/add-fields-to-an-existing-collection.md">Funktionsgenerierte Vektorfelder</a></td><td>Fügen Sie einer bestehenden Sammlung eine BM25- oder MinHash-Funktion hinzu, damit Milvus aus einem bestehenden „ <code translate="no">VARCHAR</code> “-Feld ein neues Vektorfeld generiert. Milvus füllt die generierten Werte für bestehende Entitäten asynchron durch eine Kompaktierung im Hintergrund nach.</td><td><ul><li><a href="/docs/de/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></li><li><a href="/docs/de/configure_datacoord.md#dataCoordcompactionbumpSchemaVersionenabled"><code translate="no">dataCoord.compaction.bumpSchemaVersion.enabled</code></a><code translate="no">=true</code></li><li><a href="/docs/de/configure_datacoord.md#dataCoordcompactionstorageVersionenabled"><code translate="no">dataCoord.compaction.storageVersion.enabled</code></a><code translate="no">=true</code></li></ul></td></tr>
<tr><td><a href="/docs/de/create-an-external-collection.md">Externe Sammlungen</a></td><td>Abfragen von Daten, die außerhalb von Milvus gespeichert sind, ohne diese in eine verwaltete Sammlung zu kopieren. Aktualisieren Sie die externe Sammlung, wenn sich die Quelldaten ändern. Informationen zum Hinzufügen weiterer Quellfelder finden Sie unter <a href="/docs/de/alter-external-collection-schema.md">„Schema einer externen Sammlung ändern</a>“.</td><td><a href="/docs/de/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
</tbody>
</table>
<h2 id="Before-you-enable-Storage-V3" class="common-anchor-header">Bevor Sie „Storage V3“ aktivieren<button data-href="#Before-you-enable-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert warning">
<p>Sobald Milvus Daten in „Storage V3“ schreibt, wird ein Downgrade auf eine Milvus-Version, die „Storage V3“ nicht lesen kann, nicht unterstützt. Das spätere Deaktivieren von „Storage V3“ führt nicht sofort zur Konvertierung aller vorhandenen „Storage V3“-Daten oder zur Wiederherstellung der Kompatibilität mit der älteren Version.</p>
</div>
<p>Beachten Sie vor der Aktivierung von Storage V3 das folgende Datenverhalten:</p>
<ul>
<li>Da „ <code translate="no">dataCoord.compaction.storageVersion.enabled</code> “ standardmäßig aktiviert ist, können geeignete vorhandene Daten schrittweise durch eine Kompaktierung im Hintergrund auf „Storage V3“ umgestellt werden.</li>
<li>Das Deaktivieren von „Storage V3“ ändert die Zielspeicherversion für zukünftige Schreibvorgänge und die Ergebnisse der Komprimierung geeigneter Daten. Es führt nicht zu einer synchronen Konvertierung aller vorhandenen „Storage V3“-Daten und macht ein Versions-Downgrade nicht sicher.</li>
</ul>
<h2 id="Enable-Storage-V3" class="common-anchor-header">Storage V3 aktivieren<button data-href="#Enable-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><p>Setzen Sie „ <code translate="no">common.storage.useLoonFFI</code> “ in Ihrer Milvus-Konfiguration auf „ <code translate="no">true</code> “:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">common:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">useLoonFFI:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus behandelt diese Einstellung als aktualisierbar. Übernehmen Sie die Änderung über den von Ihrer Bereitstellung unterstützten Workflow zur Konfigurationsaktualisierung. Das Bearbeiten einer statischen Konfigurationsdatei allein garantiert nicht, dass die laufende Bereitstellung den neuen Wert erhalten hat.</p>
<p>Wenn Sie planen, eine Funktion und ihr generiertes Vektorfeld zu einer bestehenden Sammlung hinzuzufügen, aktivieren Sie außerdem die beiden für das Nachfüllen bestehender Daten erforderlichen Komprimierungseinstellungen:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">bumpSchemaVersion:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">storageVersion:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>Die Funktionsausgabe für vorhandene Entitäten wird asynchron durch eine Kompaktierung im Hintergrund generiert. Eine erfolgreiche Schemaaktualisierung bedeutet nicht, dass das Nachfüllen für jede vorhandene Entität abgeschlossen ist.</p>
<h2 id="Related-documentation" class="common-anchor-header">Zugehörige Dokumentation<button data-href="#Related-documentation" class="anchor-icon" translate="no">
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
<li><a href="/docs/de/text.md">Textfeld</a></li>
<li><a href="/docs/de/add-fields-to-an-existing-collection.md">Sammlungsschema ändern</a></li>
<li><a href="/docs/de/create-an-external-collection.md">Externe Sammlung erstellen</a></li>
<li><a href="/docs/de/install-overview.md">Übersicht über die Milvus-Bereitstellungsoptionen</a></li>
<li><a href="/docs/de/upgrade_milvus_standalone-helm.md">Milvus Standalone mit Helm-Chart aktualisieren</a></li>
<li><a href="/docs/de/upgrade_milvus_cluster-helm.md">Milvus-Cluster mit Helm-Chart aktualisieren</a></li>
<li><a href="/docs/de/configure_common.md">Allgemeine Konfigurationen</a></li>
<li><a href="/docs/de/configure_datacoord.md">Konfigurationen im Zusammenhang mit dataCoord</a></li>
<li><a href="https://milvus.io/blog/why-we-built-loon-a-storage-engine-for-ai-data-that-never-stops-changing.md">Warum wir Loon entwickelt haben: Eine Speicher-Engine für KI-Daten, die sich ständig ändern</a> – Technische Hintergründe zu den Designmotiven hinter Storage V3.</li>
</ul>
