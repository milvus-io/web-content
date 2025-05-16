---
id: monitor_overview.md
title: Monitor-Übersicht
related_key: 'monitor, alert'
summary: >-
  Erfahren Sie, wie Prometheus und Grafana in Milvus für Überwachungs- und
  Alarmierungsdienste eingesetzt werden.
---
<h1 id="Milvus-monitoring-framework-overview" class="common-anchor-header">Überblick über das Milvus-Überwachungs-Framework<button data-href="#Milvus-monitoring-framework-overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Dieses Thema erklärt, wie Milvus Prometheus zur Überwachung von Metriken und Grafana zur Visualisierung von Metriken und zur Erstellung von Alarmen verwendet.</p>
<h2 id="Prometheus-in-Milvus" class="common-anchor-header">Prometheus in Milvus<button data-href="#Prometheus-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://prometheus.io/docs/introduction/overview/">Prometheus</a> ist ein Open-Source-Überwachungs- und Alarmierungs-Toolkit für Kubernetes-Implementierungen. Es sammelt und speichert Metriken als Zeitseriendaten. Das bedeutet, dass die Metriken mit Zeitstempeln gespeichert werden, wenn sie aufgezeichnet werden, zusammen mit optionalen Schlüssel-Wert-Paaren, den so genannten Labels.</p>
<p>Derzeit verwendet Milvus die folgenden Komponenten von Prometheus:</p>
<ul>
<li>Prometheus-Endpunkt zum Abrufen von Daten von Endpunkten, die von Exporteuren festgelegt wurden.</li>
<li>Prometheus-Operator zur effektiven Verwaltung von Prometheus-Überwachungsinstanzen.</li>
<li>Kube-prometheus für eine einfach zu bedienende End-to-End-Überwachung von Kubernetes-Clustern.</li>
</ul>
<h3 id="Metric-names" class="common-anchor-header">Metrik-Namen</h3><p>Ein gültiger Metrikname in Prometheus enthält drei Elemente: Namespace, Subsystem und Name. Diese drei Elemente sind mit &quot;_&quot; verbunden.</p>
<p>Der Namespace der Milvus-Metriken, die von Prometheus überwacht werden, ist &quot;milvus&quot;. Je nach der Rolle, zu der eine Metrik gehört, sollte ihr Subsystem eine der folgenden acht Rollen sein: &quot;rootcoord&quot;, &quot;proxy&quot;, &quot;querycoord&quot;, &quot;querynode&quot;, &quot;indexcoord&quot;, &quot;indexnode&quot;, &quot;datacoord&quot;, &quot;datanode&quot;.</p>
<p>Die Milvus-Metrik, die die Gesamtzahl der abgefragten Vektoren berechnet, heißt zum Beispiel <code translate="no">milvus_proxy_search_vectors_count</code>.</p>
<h3 id="Metric-types" class="common-anchor-header">Metrik-Typen</h3><p>Prometheus unterstützt vier Arten von Metriken:</p>
<ul>
<li>Zähler: ein Typ kumulativer Metriken, deren Wert nur bei einem Neustart erhöht oder auf Null zurückgesetzt werden kann.</li>
<li>Gauge: ein Typ von Metriken, deren Wert entweder steigen oder fallen kann.</li>
<li>Histogramm: eine Art von Metriken, die auf der Grundlage von konfigurierbaren Bereichen gezählt werden. Ein gängiges Beispiel ist die Anfragedauer.</li>
<li>Zusammenfassung: Eine Art von Metrik, die dem Histogramm ähnelt und konfigurierbare Quantile über ein gleitendes Zeitfenster berechnet.</li>
</ul>
<h3 id="Metric-labels" class="common-anchor-header">Metrik-Bezeichnungen</h3><p>Prometheus unterscheidet Stichproben mit demselben Metriknamen, indem es sie beschriftet. Ein Label ist ein bestimmtes Attribut einer Metrik. Metriken mit demselben Namen müssen denselben Wert für das Feld <code translate="no">variable_labels</code> haben. In der folgenden Tabelle sind die Namen und Bedeutungen der gebräuchlichen Bezeichnungen von Milvus-Metriken aufgeführt.</p>
<table>
<thead>
<tr><th>Name des Labels</th><th>Definition</th><th>Werte</th></tr>
</thead>
<tbody>
<tr><td>"node_id"</td><td>Die eindeutige Identität einer Rolle.</td><td>Eine von milvus generierte, weltweit eindeutige ID.</td></tr>
<tr><td>"status"</td><td>Der Status einer verarbeiteten Operation oder Anfrage.</td><td>&quot;abandon&quot;, &quot;success&quot;, oder &quot;fail&quot;.</td></tr>
<tr><td>"query_type"</td><td>Der Typ einer Leseanfrage.</td><td>&quot;search&quot; oder &quot;query&quot;.</td></tr>
<tr><td>"msg_type"</td><td>Die Art der Meldungen.</td><td>&quot;einfügen&quot;, &quot;löschen&quot;, &quot;suchen&quot; oder &quot;abfragen&quot;.</td></tr>
<tr><td>"segment_state"</td><td>Der Status eines Segments.</td><td>&quot;Sealed&quot;, &quot;Growing&quot;, &quot;Flushed&quot;, &quot;Flushing&quot;, &quot;Dropped&quot;, oder &quot;Importing&quot;.</td></tr>
<tr><td>"cache_state"</td><td>Der Status eines zwischengespeicherten Objekts.</td><td>&quot;Hit&quot; oder &quot;Miss&quot;.</td></tr>
<tr><td>"cache_name"</td><td>Der Name eines zwischengespeicherten Objekts. Diese Bezeichnung wird zusammen mit der Bezeichnung &quot;cache_state&quot; verwendet.</td><td>Z.B. &quot;CollectionID&quot;, &quot;Schema&quot;, usw.</td></tr>
<tr><td>&quot;kanal_name</td><td>Physische Themen im Nachrichtenspeicher (Pulsar oder Kafka).</td><td>Z. B. &quot;by-dev-rootcoord-dml_0&quot;, &quot;by-dev-rootcoord-dml_255&quot;, usw.</td></tr>
<tr><td>"funktion_name"</td><td>Der Name einer Funktion, die bestimmte Anfragen bearbeitet.</td><td>Z.B. &quot;CreateCollection&quot;, &quot;CreatePartition&quot;, &quot;CreateIndex&quot;, usw.</td></tr>
<tr><td>"user_name"</td><td>Der für die Authentifizierung verwendete Benutzername.</td><td>Geben Sie einen Benutzernamen Ihrer Wahl an.</td></tr>
<tr><td>"index_task_status"</td><td>Der Status eines Index-Tasks im Metaspeicher.</td><td>&quot;unissued&quot;, &quot;in-progress&quot;, &quot;failed&quot;, &quot;finished&quot;, oder &quot;recycled&quot;.</td></tr>
</tbody>
</table>
<h2 id="Grafana-in-Milvus" class="common-anchor-header">Grafana in Milvus<button data-href="#Grafana-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://grafana.com/docs/grafana/latest/introduction/">Grafana</a> ist ein Open-Source-Visualisierungs-Stack, der mit allen Datenquellen verbunden werden kann. Durch das Abrufen von Metriken hilft es Benutzern, große Datenmengen zu verstehen, zu analysieren und zu überwachen.</p>
<p>Milvus nutzt die anpassbaren Dashboards von Grafana für die Visualisierung von Metriken.</p>
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
    </button></h2><p>Nachdem Sie den grundlegenden Arbeitsablauf der Überwachung und Alarmierung kennengelernt haben, lernen Sie:</p>
<ul>
<li><a href="/docs/de/v2.4.x/monitor.md">Bereitstellen von Überwachungsdiensten</a></li>
<li><a href="/docs/de/v2.4.x/visualize.md">Visualisierung von Milvus-Metriken</a></li>
<li><a href="/docs/de/v2.4.x/alert.md">Einen Alarm erstellen</a></li>
</ul>
