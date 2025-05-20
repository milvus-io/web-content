---
id: disk_index.md
related_key: disk_index
summary: Plattenindex-Mechanismus in Milvus.
title: On-Disk-Index
---
<h1 id="On-disk-Index" class="common-anchor-header">On-Disk-Index<button data-href="#On-disk-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>In diesem Artikel wird ein Algorithmus zur Indexierung auf der Festplatte namens DiskANN vorgestellt. DiskANN basiert auf Vamana-Graphen und ermöglicht eine effiziente Suche in großen Datenbeständen.</p>
<p>Um die Abfrageleistung zu verbessern, können Sie für jedes Vektorfeld <a href="/docs/de/v2.4.x/index-vector-fields.md">einen Indextyp angeben</a>.</p>
<div class="alert note"> 
Derzeit unterstützt ein Vektorfeld nur einen Index-Typ. Milvus löscht automatisch den alten Index, wenn der Indextyp gewechselt wird.</div>
<h2 id="Prerequisites" class="common-anchor-header">Voraussetzungen<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Um DiskANN zu verwenden, beachten Sie, dass</p>
<ul>
<li>DiskANN standardmäßig deaktiviert ist. Wenn Sie einen In-Memory-Index einem On-Disk-Index vorziehen, sollten Sie diese Funktion deaktivieren, um eine bessere Leistung zu erzielen.<ul>
<li>Um sie zu deaktivieren, können Sie in Ihrer milvus-Konfigurationsdatei <code translate="no">queryNode.enableDisk</code> in <code translate="no">false</code> ändern.</li>
<li>Um sie wieder zu aktivieren, können Sie <code translate="no">queryNode.enableDisk</code> auf <code translate="no">true</code> setzen.</li>
</ul></li>
<li>Die Milvus-Instanz läuft auf Ubuntu 18.04.6 oder einer späteren Version.</li>
<li>Der Milvus-Datenpfad sollte auf eine NVMe-SSD gemountet werden, um die volle Leistung zu erreichen:<ul>
<li>Bei einer Milvus-Einzelinstanz sollte der Datenpfad <strong>/var/lib/milvus/data</strong> in dem Container sein, in dem die Instanz läuft.</li>
<li>Für eine Milvus-Cluster-Instanz sollte der Datenpfad <strong>/var/lib/milvus/data</strong> in den Containern sein, in denen die QueryNodes und IndexNodes ausgeführt werden.</li>
</ul></li>
</ul>
<h2 id="Limits" class="common-anchor-header">Begrenzungen<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Um DiskANN zu verwenden, müssen Sie sicherstellen, dass Sie</p>
<ul>
<li>Verwenden Sie nur Float-Vektoren mit mindestens 1 Dimension in Ihren Daten.</li>
<li>Verwenden Sie nur Euklidische Distanz (L2), Inneres Produkt (IP) oder COSINE, um den Abstand zwischen Vektoren zu messen.</li>
</ul>
<h2 id="Index-and-search-settings" class="common-anchor-header">Index- und Sucheinstellungen<button data-href="#Index-and-search-settings" class="anchor-icon" translate="no">
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
<li><p>Parameter für den Indexaufbau</p>
<p>Wenn Sie einen DiskANN-Index erstellen, verwenden Sie <code translate="no">DISKANN</code> als Indextyp. Es sind keine Indexparameter erforderlich.</p></li>
<li><p>Suchparameter</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Bereich</th><th>Standardwert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">search_list</code></td><td>Größe der Kandidatenliste, eine größere Größe bietet eine höhere Auffindungsrate bei verminderter Leistung.</td><td>[topk, int32_max]</td><td>16</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="DiskANN-related-Milvus-configurations" class="common-anchor-header">DiskANN-bezogene Milvus-Konfigurationen<button data-href="#DiskANN-related-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>DiskANN ist abstimmbar. Sie können die DiskANN-bezogenen Parameter in <code translate="no">${MILVUS_ROOT_PATH}/configs/milvus.yaml</code> ändern, um die Leistung zu verbessern.</p>
<pre><code translate="no" class="language-YAML">...
DiskIndex:
  MaxDegree: 56
  SearchListSize: 100
  PQCodeBugetGBRatio: 0.125
  SearchCacheBudgetGBRatio: 0.125
  BeamWidthRatio: 4.0
...
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th>Parameter</th><th>Beschreibung</th><th>Wertebereich</th><th>Standardwert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MaxDegree</code></td><td>Maximaler Grad des Vamana-Graphen. <br/> Ein größerer Wert bietet eine höhere Auffindungsrate, erhöht aber die Größe des Index und die Zeit für den Aufbau des Index.</td><td>[1, 512]</td><td>56</td></tr>
<tr><td><code translate="no">SearchListSize</code></td><td>Größe der Kandidatenliste. <br/> Ein größerer Wert erhöht den Zeitaufwand für den Aufbau des Indexes, bietet aber eine höhere Wiederfindungsrate. <br/> Setzen Sie ihn auf einen Wert kleiner als <code translate="no">MaxDegree</code>, es sei denn, Sie müssen die Zeit für den Indexaufbau reduzieren.</td><td>[1, int32_max]</td><td>100</td></tr>
<tr><td><code translate="no">PQCodeBugetGBRatio</code></td><td>Größenbeschränkung für den PQ-Code. <br/> Ein größerer Wert bietet eine höhere Abrufrate, erhöht aber den Speicherverbrauch.</td><td>(0.0, 0.25]</td><td>0.125</td></tr>
<tr><td><code translate="no">SearchCacheBudgetGBRatio</code></td><td>Verhältnis von zwischengespeicherten Knotennummern zu Rohdaten. <br/> Ein größerer Wert verbessert die Indexerstellungsleistung bei erhöhtem Speicherbedarf.</td><td>[0.0, 0.3)</td><td>0.10</td></tr>
<tr><td><code translate="no">BeamWidthRatio</code></td><td>Verhältnis zwischen der maximalen Anzahl von IO-Anfragen pro Suchiteration und der CPU-Anzahl.</td><td>[1, max(128 / CPU-Anzahl, 16)]</td><td>4.0</td></tr>
</tbody>
</table>
<h2 id="Troubleshooting" class="common-anchor-header">Fehlersuche<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
<li><p>Wie kann man mit dem <code translate="no">io_setup() failed; returned -11, errno=11:Resource temporarily unavailable</code> Fehler umgehen?</p>
<p>Der Linux-Kernel bietet die Funktion Asynchronous non-blocking I/O (AIO), die es einem Prozess ermöglicht, mehrere E/A-Operationen gleichzeitig zu initiieren, ohne auf die Fertigstellung einer dieser Operationen warten zu müssen. Dies trägt zur Leistungssteigerung von Anwendungen bei, bei denen sich Verarbeitung und E/A überschneiden können.</p>
<p>Die Leistung kann mithilfe der virtuellen Datei <code translate="no">/proc/sys/fs/aio-max-nr</code> im proc-Dateisystem eingestellt werden. Der Parameter <code translate="no">aio-max-nr</code> bestimmt die maximale Anzahl der zulässigen gleichzeitigen Anfragen.</p>
<p>Der Standardwert für <code translate="no">aio-max-nr</code> ist <code translate="no">65535</code>, Sie können ihn auf <code translate="no">10485760</code> erhöhen.</p></li>
</ul>
