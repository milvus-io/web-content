---
id: clustering-compaction.md
title: Clustering-Verdichtung
related_key: 'clustering, compaction'
summary: >-
  Die Clustering-Kompaktierung wurde entwickelt, um die Suchleistung zu
  verbessern und die Kosten in großen Sammlungen zu senken. In diesem Leitfaden
  erfahren Sie, wie die Clustering-Kompaktierung die Suchleistung verbessern
  kann.
---
<h1 id="Clustering-Compaction" class="common-anchor-header">Clustering-Verdichtung<button data-href="#Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>Clustering Compaction wurde entwickelt, um die Suchleistung zu verbessern und die Kosten in großen Sammlungen zu reduzieren. In diesem Handbuch erfahren Sie, wie Sie die Clustering-Verdichtung nutzen können, um die Suchleistung zu verbessern.</p>
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
    </button></h2><p>Milvus speichert eingehende Entitäten in Segmenten innerhalb einer Sammlung und versiegelt ein Segment, wenn es voll ist. Wenn dies geschieht, wird ein neues Segment erstellt, um zusätzliche Entitäten aufzunehmen. Infolgedessen sind die Entitäten willkürlich über die Segmente verteilt. Diese Verteilung erfordert, dass Milvus mehrere Segmente durchsucht, um die nächsten Nachbarn für einen bestimmten Abfragevektor zu finden.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/clustering-compaction.png" alt="Without clustering Compaction" class="doc-image" id="without-clustering-compaction" />
   </span> <span class="img-wrapper"> <span>Ohne Clustering Verdichtung</span> </span></p>
<p>Wenn Milvus die Entitäten auf der Grundlage der Werte in einem bestimmten Feld auf die Segmente verteilen kann, lässt sich der Suchumfang innerhalb eines Segments einschränken, was die Suchleistung verbessert.</p>
<p><strong>Clustering Compaction</strong> ist eine Funktion in Milvus, die Entitäten zwischen Segmenten in einer Sammlung basierend auf den Werten in einem skalaren Feld umverteilt. Um diese Funktion zu aktivieren, müssen Sie zunächst ein skalares Feld als <strong>Clustering-Schlüssel</strong> auswählen. Dies ermöglicht Milvus, Entitäten in ein Segment umzuverteilen, wenn ihre Clustering-Schlüsselwerte in einen bestimmten Bereich fallen. Wenn Sie eine Clustering Compaction auslösen, generiert/aktualisiert Milvus einen globalen Index namens <strong>PartitionStats</strong>, der die Zuordnungsbeziehung zwischen Segmenten und Clustering-Schlüsselwerten aufzeichnet.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/clustering-compaction-2.png" alt="With Clustering Compaction" class="doc-image" id="with-clustering-compaction" />
   </span> <span class="img-wrapper"> <span>Mit Clustering-Verdichtung</span> </span></p>
<p>Unter Verwendung von <strong>PartitionStats</strong> als Referenz kann Milvus beim Empfang einer Such-/Abfrageanfrage, die einen Clustering-Schlüsselwert enthält, irrelevante Daten entfernen und den Suchbereich innerhalb der Segmente, die dem Wert zugeordnet sind, einschränken und so die Suchleistung verbessern. Einzelheiten zur Leistungsverbesserung finden Sie unter Benchmark-Tests.</p>
<h2 id="Use-Clustering-Compaction" class="common-anchor-header">Clustering-Verdichtung verwenden<button data-href="#Use-Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Clustering Compaction Funktion in Milvus ist in hohem Maße konfigurierbar. Sie können sie manuell auslösen oder sie so einstellen, dass sie automatisch in bestimmten Abständen von Milvus ausgelöst wird. Um die Clustering Compaction zu aktivieren, gehen Sie wie folgt vor:</p>
<h3 id="Global-Configuration" class="common-anchor-header">Globale Konfiguration</h3><p>Sie müssen Ihre Milvus-Konfigurationsdatei wie unten gezeigt ändern.</p>
<pre><code translate="no" class="language-yaml">dataCoord:
  compaction:
    clustering:
      <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span> 
      autoEnable: <span class="hljs-literal">false</span> 
      triggerInterval: 600 
      minInterval: 3600 
      maxInterval: 259200 
      newDataSizeThreshold: 512m 
      <span class="hljs-built_in">timeout</span>: 7200
     
queryNode:
  enableSegmentPrune: <span class="hljs-literal">true</span> 

datanode:
  clusteringCompaction:
    memoryBufferRatio: 0.1 
    workPoolSize: 8  
common:
  usePartitionKeyAsClusteringKey: <span class="hljs-literal">true</span> 
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">dataCoord.compaction.clustering</code></p>
<table>
<thead>
<tr><th>Konfiguration Element</th><th>Beschreibung</th><th>Standardwert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">enable</code></td><td>Gibt an, ob die Clustering-Verdichtung aktiviert werden soll.<br>Setzen Sie dies auf <code translate="no">true</code>, wenn Sie diese Funktion für jede Sammlung mit einem Clustering-Schlüssel aktivieren müssen.</td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">autoEnable</code></td><td>Legt fest, ob die automatisch ausgelöste Verdichtung aktiviert werden soll.<br>Die Einstellung <code translate="no">true</code> bedeutet, dass Milvus die Sammlungen mit einem Clustering-Schlüssel in den angegebenen Intervallen komprimiert.</td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">triggerInterval</code></td><td>Gibt das Intervall in Millisekunden an, in dem Milvus die Gruppierungsverdichtung startet.<br>Dieser Parameter ist nur gültig, wenn <code translate="no">autoEnable</code> auf <code translate="no">true</code> eingestellt ist.</td><td>-</td></tr>
<tr><td><code translate="no">minInterval</code></td><td>Legt das Mindestintervall in Sekunden fest.<br>Dieser Parameter ist nur gültig, wenn <code translate="no">autoEnable</code> auf <code translate="no">true</code> eingestellt ist.<br>Die Einstellung auf eine ganze Zahl größer als triggerInterval hilft, wiederholte Verdichtungen innerhalb eines kurzen Zeitraums zu vermeiden.</td><td>-</td></tr>
<tr><td><code translate="no">maxInterval</code></td><td>Gibt das maximale Intervall in Sekunden an.<br>Dieser Parameter ist nur gültig, wenn <code translate="no">autoEnable</code> auf <code translate="no">true</code> eingestellt ist.<br>Sobald Milvus feststellt, dass eine Sammlung länger als diese Zeitspanne nicht komprimiert wurde, erzwingt es eine Komprimierung durch Clustering.</td><td>-</td></tr>
<tr><td><code translate="no">newDataSizeThreshold</code></td><td>Legt den oberen Schwellenwert für die Auslösung einer Clustering-Verdichtung fest.<br>Dieser Parameter ist nur gültig, wenn <code translate="no">autoEnable</code> auf <code translate="no">true</code> eingestellt ist.<br>Sobald Milvus feststellt, dass das Datenvolumen in einer Sammlung diesen Wert übersteigt, wird ein Clustering-Compaction-Prozess eingeleitet.</td><td>-</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Gibt die Timeout-Dauer für eine Clustering-Compaction an.<br>Eine Clustering-Compaction schlägt fehl, wenn ihre Ausführungszeit diesen Wert überschreitet.</td><td>-</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">queryNode</code></p>
<table>
<thead>
<tr><th>Konfiguration Element</th><th>Beschreibung</th><th>Standardwert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">enableSegmentPrune</code></td><td>Gibt an, ob Milvus beim Empfang von Such-/Abfrageanfragen Daten unter Bezugnahme auf PartitionStats bereinigt.<br>Die Einstellung <code translate="no">true</code> ermöglicht es Milvus, irrelevante Daten aus Segmenten während einer Such-/Abfrageanfrage zu entfernen.</td><td><code translate="no">false</code></td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">dataNode.clusteringCompaction</code></p>
<table>
<thead>
<tr><th>Konfiguration Element</th><th>Beschreibung</th><th>Standardwert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">memoryBufferRatio</code></td><td>Legt das Speicherpufferverhältnis für Clustering-Kompaktierungsaufgaben fest. <br>Milvus löscht Daten, wenn die Datengröße die zugewiesene Puffergröße überschreitet, die mit diesem Verhältnis berechnet wurde.</td><td>-</td></tr>
<tr><td><code translate="no">workPoolSize</code></td><td>Legt die Größe des Worker-Pools für eine Clustering-Compaction-Task fest.</td><td>-</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">common</code></p>
<table>
<thead>
<tr><th>Konfiguration Element</th><th>Beschreibung</th><th>Standardwert</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">usePartitionKeyAsClusteringKey</code></td><td>Gibt an, ob der Partitionsschlüssel in Sammlungen als Clustering-Schlüssel verwendet werden soll.<br>Die Einstellung <code translate="no">true</code> bedeutet, dass der Partitionsschlüssel als Clustering-Schlüssel verwendet wird.<br>Sie können diese Einstellung in einer Sammlung jederzeit außer Kraft setzen, indem Sie explizit einen Clustering-Schlüssel festlegen.</td><td><code translate="no">false</code></td></tr>
</tbody>
</table>
</li>
</ul>
<p>Um die oben genannten Änderungen auf Ihren Milvus-Cluster anzuwenden, folgen Sie bitte den Schritten in <a href="/docs/de/v2.4.x/configure-helm.md">Konfigurieren Sie Milvus mit Helm</a> und <a href="/docs/de/v2.4.x/configure_operator.md">Konfigurieren Sie Milvus mit Milvus Operators</a>.</p>
<h3 id="Collection-Configuration" class="common-anchor-header">Konfiguration der Sammlung</h3><p>Für die Clusterverdichtung in einer bestimmten Sammlung sollten Sie ein skalares Feld aus der Sammlung als Clusterschlüssel auswählen.</p>
<pre><code translate="no" class="language-python">default_fields = [
    FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;key&quot;</span>, dtype=DataType.INT64, is_clustering_key=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;var&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, is_primary=<span class="hljs-literal">False</span>),
    FieldSchema(name=<span class="hljs-string">&quot;embeddings&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=dim)
]

default_schema = CollectionSchema(
    fields=default_fields, 
    description=<span class="hljs-string">&quot;test clustering-key collection&quot;</span>
)

coll1 = Collection(name=<span class="hljs-string">&quot;clustering_test&quot;</span>, schema=default_schema)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Sie können die skalaren Felder der folgenden Datentypen als Clustering-Schlüssel verwenden: <code translate="no">Int8</code>, <code translate="no">Int16</code>, <code translate="no">Int32</code>, <code translate="no">Int64</code>, <code translate="no">Float</code>, <code translate="no">Double</code> und <code translate="no">VarChar</code>.</p>
</div>
<h2 id="Trigger-Clustering-Compaction" class="common-anchor-header">Clustering-Verdichtung auslösen<button data-href="#Trigger-Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><p>Wenn Sie die automatische Clustering-Verdichtung aktiviert haben, löst Milvus die Verdichtung automatisch in dem angegebenen Intervall aus. Alternativ dazu können Sie die Verdichtung wie folgt manuell auslösen:</p>
<pre><code translate="no" class="language-python">coll1.compact(is_clustering=<span class="hljs-literal">True</span>)
coll1.get_compaction_state(is_clustering=<span class="hljs-literal">True</span>)
coll1.wait_for_compaction_completed(is_clustering=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Benchmark-Test" class="common-anchor-header">Benchmark-Test</h3><p>Das Datenvolumen und die Abfragemuster zusammen bestimmen die Leistungsverbesserung, die die Clustering-Verdichtung bringen kann. Ein interner Benchmark-Test zeigt, dass die Clustering-Verdichtung zu einer bis zu 25-fachen Verbesserung der Abfragen pro Sekunde (QPS) führt.</p>
<p>Der Benchmark-Test wird mit einer Sammlung durchgeführt, die Entitäten aus einem 20 Millionen, 768-dimensionalen LAION-Datensatz enthält, wobei das Schlüsselfeld als Clustering-Schlüssel bestimmt wurde. Nachdem die Clustering-Kompaktierung in der Sammlung ausgelöst wurde, werden gleichzeitige Suchanfragen gesendet, bis die CPU-Auslastung einen hohen Pegel erreicht.</p>
<table>
  <thead>
    <tr>
      <th rowspan="2">Suchfilter</th>
      <th rowspan="2">Prune-Verhältnis</th>
      <th colspan="5">Latenz (ms)</th>
      <th rowspan="2">QPS (Abfragen/s)</th>
    </tr>
    <tr>
      <th>Avg</th>
      <th>Min</th>
      <th>Max</th>
      <th>Median</th>
      <th>TP99</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Keine</td>
      <td>0%</td>
      <td>1685</td>
      <td>672</td>
      <td>2294</td>
      <td>1710</td>
      <td>2291</td>
      <td>17.75</td>
    </tr>
    <tr>
      <td>Schlüssel &gt; 200 und Schlüssel &lt; 800</td>
      <td>40.2%</td>
      <td>1045</td>
      <td>47</td>
      <td>1828</td>
      <td>1085</td>
      <td>1617</td>
      <td>28.38</td>
    </tr>
    <tr>
      <td>Schlüssel &gt; 200 und Schlüssel &lt; 600</td>
      <td>59.8%</td>
      <td>829</td>
      <td>45</td>
      <td>1483</td>
      <td>882</td>
      <td>1303</td>
      <td>35.78</td>
    </tr>
    <tr>
      <td>Schlüssel &gt; 200 und Schlüssel &lt; 400</td>
      <td>79.5%</td>
      <td>550</td>
      <td>100</td>
      <td>985</td>
      <td>584</td>
      <td>898</td>
      <td>54.00</td>
    </tr>
    <tr>
      <td>Schlüssel == 1000</td>
      <td>99%</td>
      <td>68</td>
      <td>24</td>
      <td>1273</td>
      <td>70</td>
      <td>246</td>
      <td>431.41</td>
    </tr>
  </tbody>
</table>
<p>Je enger der Suchbereich in den Suchfiltern ist, desto höher ist die Prune-Ratio. Das bedeutet, dass mehr Entitäten während des Suchvorgangs übersprungen werden. Ein Vergleich der Statistiken in der ersten und letzten Zeile zeigt, dass bei einer Suche ohne Clustering-Verdichtung die gesamte Sammlung durchsucht werden muss. Andererseits kann eine Suche mit Clustering-Verdichtung unter Verwendung eines bestimmten Schlüssels eine bis zu 25-fache Verbesserung erzielen.</p>
<h2 id="Best-practices" class="common-anchor-header">Bewährte Verfahren<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
    </button></h2><p>Im Folgenden finden Sie einige Tipps zur effizienten Nutzung der Clustering-Kompaktierung:</p>
<ul>
<li><p>Aktivieren Sie diese Funktion für Sammlungen mit großen Datenmengen. Die Suchleistung verbessert sich mit größeren Datenmengen in einer Sammlung. Es ist eine gute Wahl, diese Funktion für Sammlungen mit mehr als 1 Million Entitäten zu aktivieren.</p></li>
<li><p>Wählen Sie einen geeigneten Clustering-Schlüssel: Sie können skalare Felder, die üblicherweise als Filterbedingungen verwendet werden, als Clustering-Schlüssel verwenden. Für eine Sammlung, die Daten von mehreren Tenants enthält, können Sie das Feld, das einen Tenant von einem anderen unterscheidet, als Clustering-Schlüssel verwenden.</p></li>
<li><p>Verwenden Sie den Partitionsschlüssel als Clustering-Schlüssel. Sie können <code translate="no">common.usePartitionKeyAsClusteringKey</code> auf true setzen, wenn Sie diese Funktion für alle Sammlungen in Ihrer Milvus-Instanz aktivieren möchten oder wenn Sie in einer großen Sammlung mit einem Partitionsschlüssel immer noch Leistungsprobleme haben. Auf diese Weise haben Sie einen Clustering-Schlüssel und einen Partitionsschlüssel, wenn Sie ein skalares Feld in einer Sammlung als Partitionsschlüssel wählen.</p>
<p>Beachten Sie, dass diese Einstellung Sie nicht daran hindert, ein anderes skalares Feld als Clustering-Schlüssel zu wählen. Der explizit angegebene Clustering-Schlüssel hat immer Vorrang.</p></li>
</ul>
