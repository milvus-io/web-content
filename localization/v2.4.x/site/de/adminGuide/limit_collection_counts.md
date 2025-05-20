---
id: limit_collection_counts.md
title: Begrenzung der Erfassungsanzahl festlegen
---
<h1 id="Limit-Collection-Counts" class="common-anchor-header">Begrenzung der Anzahl der Sammlungen<button data-href="#Limit-Collection-Counts" class="anchor-icon" translate="no">
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
    </button></h1><p>Eine Milvus-Instanz erlaubt bis zu 65.536 Sammlungen. Zu viele Sammlungen können jedoch zu Leistungsproblemen führen. Daher ist es empfehlenswert, die Anzahl der in einer Milvus-Instanz erstellten Sammlungen zu begrenzen.</p>
<p>Dieser Leitfaden enthält Anweisungen, wie Sie die Anzahl der Sammlungen in einer Milvus-Instanz begrenzen können.</p>
<p>Die Konfiguration hängt von der Art und Weise ab, wie Sie die Milvus-Instanz installieren.</p>
<ul>
<li><p>Für Milvus-Instanzen, die mit Helm Charts installiert wurden</p>
<p>Fügen Sie die Konfiguration in die Datei <code translate="no">values.yaml</code> unter dem Abschnitt <code translate="no">config</code> ein. Einzelheiten finden Sie unter <a href="/docs/de/v2.4.x/configure-helm.md">Konfigurieren von Milvus mit Helm Charts</a>.</p></li>
<li><p>Für Milvus-Instanzen, die mit Docker Compose installiert wurden</p>
<p>Fügen Sie die Konfiguration in die Datei <code translate="no">milvus.yaml</code> ein, die Sie zum Starten der Milvus-Instanz verwendet haben. Einzelheiten finden Sie unter <a href="/docs/de/v2.4.x/configure-docker.md">Konfigurieren von Milvus mit Docker Compose</a>.</p></li>
<li><p>Für Milvus-Instanzen, die mit Operator installiert wurden</p>
<p>Fügen Sie die Konfiguration in den Abschnitt <code translate="no">spec.components</code> der benutzerdefinierten Ressource <code translate="no">Milvus</code> ein. Weitere Informationen finden Sie unter <a href="/docs/de/v2.4.x/configure_operator.md">Konfigurieren von Milvus mit Operator</a>.</p></li>
</ul>
<h2 id="Configuration-options" class="common-anchor-header">Konfigurationsoptionen<button data-href="#Configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml">rootCoord:
    maxGeneralCapacity: 65536
<button class="copy-code-btn"></button></code></pre>
<p>Der Parameter <code translate="no">maxGeneralCapacity</code> legt die maximale Anzahl von Sammlungen fest, die die aktuelle Milvus-Instanz enthalten kann. Der Standardwert ist <code translate="no">65536</code>.</p>
<h2 id="Calculating-the-number-of-collections" class="common-anchor-header">Berechnen der Anzahl der Sammlungen<button data-href="#Calculating-the-number-of-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>In einer Sammlung können Sie mehrere Shards und Partitionen einrichten. Shards sind logische Einheiten, die verwendet werden, um Datenschreiboperationen auf mehrere Datenknoten zu verteilen. Partitionen sind logische Einheiten, die dazu dienen, die Effizienz der Datenabfrage zu verbessern, indem nur eine Teilmenge der Sammlungsdaten geladen wird. Wenn Sie die Anzahl der Sammlungen in der aktuellen Milvus-Instanz berechnen, müssen Sie auch die Shards und Partitionen zählen.</p>
<p>Nehmen wir zum Beispiel an, Sie haben bereits <strong>100</strong> Sammlungen angelegt, von denen <strong>60</strong> <strong>mit 2</strong> Shards und <strong>4</strong> Partitionen und die restlichen <strong>40</strong> mit <strong>1</strong> Shard und <strong>12</strong> Partitionen ausgestattet sind. Die aktuelle Anzahl der Sammlungen kann wie folgt berechnet werden:</p>
<pre><code translate="no">60 (collections) x 2 (shards) x 4 (partitions) + 40 (collections) x 1 (shard) x 12 (partitions) = 960
<button class="copy-code-btn"></button></code></pre>
<p>Im obigen Beispiel haben Sie bereits <strong>960</strong> der Standardgrenzen genutzt. Wenn Sie nun eine neue Sammlung mit <strong>4</strong> Scherben und <strong>20</strong> Partitionen erstellen möchten, erhalten Sie folgende Fehlermeldung, da die Gesamtzahl der Sammlungen die maximale Kapazität überschreitet:</p>
<pre><code translate="no" class="language-shell">failed checking constraint: sum_collections(parition*shard) exceeding the <span class="hljs-built_in">max</span> general capacity:
<button class="copy-code-btn"></button></code></pre>
<p>Um diesen Fehler zu vermeiden, können Sie entweder die Anzahl der Shards oder Partitionen in bestehenden oder neuen Sammlungen reduzieren, einige Sammlungen löschen oder den Wert <code translate="no">maxGeneralCapacity</code> erhöhen.</p>
