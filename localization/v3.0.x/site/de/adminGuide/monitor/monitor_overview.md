---
id: monitor_overview.md
title: Monitor-Übersicht
related_key: 'monitor, alert'
summary: >-
  Erfahren Sie, wie Prometheus und Grafana in Milvus für die Überwachung und
  Alarmierung eingesetzt werden.
---
<h1 id="Milvus-monitoring-framework-overview" class="common-anchor-header">Überblick über das Milvus-Überwachungsframework<button data-href="#Milvus-monitoring-framework-overview" class="anchor-icon" translate="no">
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
    </button></h1><p>In diesem Abschnitt wird erläutert, wie Milvus Prometheus zur Überwachung von Metriken und Grafana zur Visualisierung von Metriken und zur Erstellung von Warnmeldungen nutzt.</p>
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
    </button></h2><p><a href="https://prometheus.io/docs/introduction/overview/">Prometheus</a> ist ein Open-Source-Toolkit für die Überwachung und Alarmierung in Kubernetes-Implementierungen. Es erfasst und speichert Metriken als Zeitreihendaten. Das bedeutet, dass Metriken bei der Erfassung mit Zeitstempeln sowie optionalen Schlüssel-Wert-Paaren, sogenannten Labels, gespeichert werden.</p>
<p>Derzeit nutzt Milvus die folgenden Komponenten von Prometheus:</p>
<ul>
<li>Prometheus-Endpunkt zum Abrufen von Daten aus den von Exportern festgelegten Endpunkten.</li>
<li>Prometheus-Operator zur effektiven Verwaltung von Prometheus-Überwachungsinstanzen.</li>
<li>Kube-Prometheus zur Bereitstellung einer einfach zu bedienenden End-to-End-Überwachung von Kubernetes-Clustern.</li>
</ul>
<h3 id="Metric-names" class="common-anchor-header">Metriknamen<button data-href="#Metric-names" class="anchor-icon" translate="no">
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
    </button></h3><p>Ein gültiger Metrikname in Prometheus besteht aus drei Elementen: Namespace, Subsystem und Name. Diese drei Elemente werden durch „_“ verbunden.</p>
<p>Der Namespace der von Prometheus überwachten Milvus-Metriken lautet „milvus“. Das Subsystem einer Metrik ist eines der folgenden: „cdc“, „cgo“, „datacoord“, „datanode“, „indexnode“, „logging“, „meta“, „msg_queue“, „msgstream“, „proxy“, „querycoord“, „querynode“, „rootcoord“, „storage“, „streaming“, „streamingcoord“, „streamingnode“ und „wal“. Einige Metriken, wie beispielsweise „ <code translate="no">milvus_build_info</code> “ und „ <code translate="no">milvus_num_node</code> “, haben kein Subsystem.</p>
<p>Beispielsweise heißt die Milvus-Metrik, die die Gesamtzahl der abgefragten Vektoren berechnet, „ <code translate="no">milvus_proxy_search_vectors_count</code> “.</p>
<h3 id="Metric-types" class="common-anchor-header">Metriktypen<button data-href="#Metric-types" class="anchor-icon" translate="no">
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
    </button></h3><p>Prometheus unterstützt vier Arten von Metriken:</p>
<ul>
<li>Zähler: Ein Typ kumulativer Metriken, deren Wert nur ansteigen oder bei einem Neustart auf Null zurückgesetzt werden kann.</li>
<li>Gauge: Ein Metriktyp, dessen Wert sowohl steigen als auch fallen kann.</li>
<li>Histogramm: Ein Metriktyp, der auf der Grundlage konfigurierbarer Buckets gezählt wird. Ein gängiges Beispiel ist die Anfragedauer.</li>
<li>Summary: Ein Metriktyp, der dem Histogramm ähnelt und konfigurierbare Quantile über ein gleitendes Zeitfenster berechnet.</li>
</ul>
<h3 id="Metric-labels" class="common-anchor-header">Metrik-Labels<button data-href="#Metric-labels" class="anchor-icon" translate="no">
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
    </button></h3><p>Prometheus unterscheidet Samples mit demselben Metriknamen durch die Vergabe von Labels. Ein Label ist ein bestimmtes Attribut einer Metrik. Metriken mit demselben Namen müssen denselben Wert für das Feld „ <code translate="no">variable_labels</code> “ aufweisen. Die folgende Tabelle listet die Namen und Bedeutungen gängiger Labels von Milvus-Metriken auf.</p>
<table>
<thead>
<tr><th>Label-Name</th><th>Definition</th><th>Werte</th></tr>
</thead>
<tbody>
<tr><td>„node_id“</td><td>Die eindeutige Kennung einer Rolle.</td><td>Eine von Milvus generierte, global eindeutige ID.</td></tr>
<tr><td>„status“</td><td>Der Status einer verarbeiteten Operation oder Anfrage.</td><td>„abandon“, „success“ oder „fail“.</td></tr>
<tr><td>„query_type“</td><td>Der Typ einer Leseanfrage.</td><td>„search“ oder „query“.</td></tr>
<tr><td>„msg_type“</td><td>Der Typ der Nachrichten.</td><td>„insert“, „delete“, „search“ oder „query“.</td></tr>
<tr><td>„segment_state“</td><td>Der Status eines Segments.</td><td>„Sealed“, „Growing“, „Flushed“, „Flushing“, „Dropped“ oder „Importing“.</td></tr>
<tr><td>„cache_state“</td><td>Der Status eines zwischengespeicherten Objekts.</td><td>„hit“ oder „miss“.</td></tr>
<tr><td>„cache_name“</td><td>Der Name eines zwischengespeicherten Objekts. Diese Bezeichnung wird zusammen mit der Bezeichnung „cache_state“ verwendet.</td><td>Z. B. „CollectionID“, „Schema“ usw.</td></tr>
<tr><td>„channel_name“</td><td>Physische Topics im Nachrichtenspeicher (Pulsar oder Kafka).</td><td>Z. B. „by-dev-rootcoord-dml_0“, „by-dev-rootcoord-dml_255“ usw.</td></tr>
<tr><td>„function_name“</td><td>Der Name einer Funktion, die bestimmte Anfragen verarbeitet.</td><td>Z. B. „CreateCollection“, „CreatePartition“, „CreateIndex“ usw.</td></tr>
<tr><td>„user_name“</td><td>Der für die Authentifizierung verwendete Benutzername.</td><td>Ein Benutzername Ihrer Wahl.</td></tr>
<tr><td>„index_task_status“</td><td>Der Status einer Indizierungsaufgabe im Metaspeicher.</td><td>„unissued“, „in-progress“, „failed“, „finished“ oder „recycled“.</td></tr>
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
    </button></h2><p><a href="https://grafana.com/docs/grafana/latest/introduction/">Grafana</a> ist eine Open-Source-Visualisierungsplattform, die sich mit allen Datenquellen verbinden lässt. Durch das Abrufen von Metriken hilft sie Benutzern, große Datenmengen zu verstehen, zu analysieren und zu überwachen.</p>
<p>Milvus nutzt die anpassbaren Dashboards von Grafana zur Visualisierung von Metriken.</p>
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
    </button></h2><p>Nachdem Sie sich mit dem grundlegenden Arbeitsablauf der Überwachung und Alarmierung vertraut gemacht haben, lernen Sie Folgendes:</p>
<ul>
<li><a href="/docs/de/monitor.md">Überwachungsdienste bereitstellen</a></li>
<li><a href="/docs/de/visualize.md">Visualisieren Sie Milvus-Metriken</a></li>
<li><a href="/docs/de/alert.md">Erstellen einer Warnmeldung</a></li>
</ul>
