---
id: system_configuration.md
related_key: configure
group: system_configuration.md
summary: Erfahren Sie mehr über die Systemkonfiguration von Milvus.
title: ''
---
<h1 id="Milvus-System-Configurations-Checklist" class="common-anchor-header">Checkliste für Milvus-Systemkonfigurationen<button data-href="#Milvus-System-Configurations-Checklist" class="anchor-icon" translate="no">
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
    </button></h1><p>In diesem Thema werden die allgemeinen Abschnitte der Systemkonfigurationen in Milvus vorgestellt.</p>
<p>Milvus verwaltet eine beträchtliche Anzahl von Parametern, die das System konfigurieren. Jede Konfiguration hat einen Standardwert, der direkt verwendet werden kann. Sie können diese Parameter flexibel ändern, damit Milvus Ihre Anwendung besser bedienen kann. Siehe <a href="/docs/de/v2.4.x/configure-docker.md">Milvus konfigurieren</a> für weitere Informationen.</p>
<div class="alert note">
In der aktuellen Version werden alle Parameter erst wirksam, nachdem sie beim Start von Milvus konfiguriert wurden.</div>
<h2 id="Sections" class="common-anchor-header">Abschnitte<button data-href="#Sections" class="anchor-icon" translate="no">
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
    </button></h2><p>Zur Vereinfachung der Wartung unterteilt Milvus seine Konfigurationen in %s-Abschnitte, basierend auf seinen Komponenten, Abhängigkeiten und der allgemeinen Verwendung.</p>
<h3 id="etcd" class="common-anchor-header"><code translate="no">etcd</code></h3><p>Verwandte Konfigurationen von etcd, das zum Speichern von Milvus-Metadaten und zur Service-Erkennung verwendet wird.</p>
<p>Siehe <a href="/docs/de/v2.4.x/configure_etcd.md">etcd-bezogene Konfigurationen</a> für eine detaillierte Beschreibung der einzelnen Parameter in diesem Abschnitt.</p>
<h3 id="metastore" class="common-anchor-header"><code translate="no">metastore</code></h3><p>Siehe <a href="/docs/de/v2.4.x/configure_metastore.md">metastore-bezogene Konfigurationen</a> für eine detaillierte Beschreibung der einzelnen Parameter in diesem Abschnitt.</p>
<h3 id="tikv" class="common-anchor-header"><code translate="no">tikv</code></h3><p>Zugehörige Konfiguration von tikv, das zum Speichern von Milvus-Metadaten verwendet wird.</p>
<p>Beachten Sie, dass Sie, wenn TiKV für den Metaspeicher aktiviert ist, immer noch etcd für die Diensterkennung benötigen.</p>
<p>TiKV ist eine gute Option, wenn die Größe der Metadaten eine bessere horizontale Skalierbarkeit erfordert.</p>
<p>Eine detaillierte Beschreibung der einzelnen Parameter in diesem Abschnitt finden Sie unter <a href="/docs/de/v2.4.x/configure_tikv.md">tikv-bezogene Konfigurationen</a>.</p>
<h3 id="localStorage" class="common-anchor-header"><code translate="no">localStorage</code></h3><p>Eine ausführliche Beschreibung der einzelnen Parameter in diesem Abschnitt finden Sie unter <a href="/docs/de/v2.4.x/configure_localstorage.md">localStorage-bezogene Konfigurationen</a>.</p>
<h3 id="minio" class="common-anchor-header"><code translate="no">minio</code></h3><p>Die entsprechende Konfiguration von MinIO/S3/GCS oder eines anderen Dienstes unterstützt die S3-API, die für die Datenpersistenz von Milvus verantwortlich ist.</p>
<p>Der Einfachheit halber bezeichnen wir den Speicherdienst in der folgenden Beschreibung als MinIO/S3.</p>
<p>Eine ausführliche Beschreibung der einzelnen Parameter finden Sie unter <a href="/docs/de/v2.4.x/configure_minio.md">MinIO-bezogene Konfigurationen</a> in diesem Abschnitt.</p>
<h3 id="mq" class="common-anchor-header"><code translate="no">mq</code></h3><p>Milvus unterstützt vier MQ: rocksmq (basierend auf RockDB), natsmq (eingebetteter nats-Server), Pulsar und Kafka.</p>
<p>Sie können Ihr MQ durch Setzen des Feldes mq.type ändern.</p>
<p>Wenn Sie das Feld mq.type nicht als Standard einstellen, gibt es einen Hinweis zur Aktivierung der Priorität, wenn wir mehrere mq in dieser Datei konfigurieren.</p>
<ol>
<li><p>Standalone(lokaler) Modus: rocksmq(Standard) &gt; natsmq &gt; Pulsar &gt; Kafka</p></li>
<li><p>Clustermodus:  Pulsar(Standard) &gt; Kafka (rocksmq und natsmq werden im Clustermodus nicht unterstützt)</p></li>
</ol>
<p>Siehe <a href="/docs/de/v2.4.x/configure_mq.md">mq-bezogene Konfigurationen</a> für eine detaillierte Beschreibung der einzelnen Parameter in diesem Abschnitt.</p>
<h3 id="pulsar" class="common-anchor-header"><code translate="no">pulsar</code></h3><p>Verwandte Konfiguration von pulsar, die zur Verwaltung von Milvus-Protokollen der letzten Mutationsoperationen, zur Ausgabe von Streaming-Protokollen und zur Bereitstellung von Protokollveröffentlichungs- und -abonnementdiensten verwendet wird.</p>
<p>Siehe <a href="/docs/de/v2.4.x/configure_pulsar.md">pulsar-bezogene Konfigurationen</a> für eine detaillierte Beschreibung der einzelnen Parameter in diesem Abschnitt.</p>
<h3 id="rocksmq" class="common-anchor-header"><code translate="no">rocksmq</code></h3><p>Wenn Sie kafka aktivieren wollen, müssen Sie die pulsar-Konfigurationen kommentieren</p>
<p>kafka:</p>
<p>brokerList:</p>
<p>saslUsername:</p>
<p>saslPassword:</p>
<p>saslMechanisms:</p>
<p>securityProtocol:</p>
<p>ssl:</p>
<pre><code translate="no">enabled: false # whether to enable ssl mode

tlsCert:  # path to client's public key (PEM) used for authentication

tlsKey:  # path to client's private key (PEM) used for authentication

tlsCaCert:  # file or directory path to CA certificate(s) for verifying the broker's key

tlsKeyPassword:  # private key passphrase for use with ssl.key.location and set_ssl_cert(), if any
</code></pre>
<p>readTimeout: 10</p>
<p>Siehe <a href="/docs/de/v2.4.x/configure_rocksmq.md">rocksmq-bezogene Konfigurationen</a> für eine detaillierte Beschreibung der einzelnen Parameter in diesem Abschnitt.</p>
<h3 id="natsmq" class="common-anchor-header"><code translate="no">natsmq</code></h3><p>natsmq-Konfiguration.</p>
<p>Weitere Einzelheiten: https://docs.nats.io/running-a-nats-service/configuration</p>
<p>Siehe <a href="/docs/de/v2.4.x/configure_natsmq.md">natsmq-bezogene Konfigurationen</a> für eine ausführliche Beschreibung der einzelnen Parameter in diesem Abschnitt.</p>
<h3 id="rootCoord" class="common-anchor-header"><code translate="no">rootCoord</code></h3><p>Verwandte Konfigurationen von rootCoord, die zur Bearbeitung von Data Definition Language (DDL)- und Data Control Language (DCL)-Anfragen verwendet werden</p>
<p>Siehe <a href="/docs/de/v2.4.x/configure_rootcoord.md">rootCoord-bezogene Konfigurationen</a> für eine ausführliche Beschreibung der einzelnen Parameter in diesem Abschnitt.</p>
<h3 id="proxy" class="common-anchor-header"><code translate="no">proxy</code></h3><p>Zugehörige Konfiguration von proxy, die zur Validierung von Client-Anfragen und zur Reduzierung der zurückgegebenen Ergebnisse verwendet wird.</p>
<p>Siehe <a href="/docs/de/v2.4.x/configure_proxy.md">proxy-bezogene Konfigurationen</a> für eine ausführliche Beschreibung der einzelnen Parameter in diesem Abschnitt.</p>
<h3 id="queryCoord" class="common-anchor-header"><code translate="no">queryCoord</code></h3><p>Zugehörige Konfiguration von queryCoord, die zur Verwaltung der Topologie und des Lastausgleichs für die Abfrageknoten sowie zur Übergabe von wachsenden Segmenten an geschlossene Segmente verwendet wird.</p>
<p>Siehe <a href="/docs/de/v2.4.x/configure_querycoord.md">queryCoord-bezogene Konfigurationen</a> für eine detaillierte Beschreibung der einzelnen Parameter in diesem Abschnitt.</p>
<h3 id="queryNode" class="common-anchor-header"><code translate="no">queryNode</code></h3><p>Verwandte Konfiguration von queryNode, die zur Durchführung einer hybriden Suche zwischen Vektor- und Skalardaten verwendet wird.</p>
<p>Siehe <a href="/docs/de/v2.4.x/configure_querynode.md">queryNode-bezogene Konfigurationen</a> für eine ausführliche Beschreibung der einzelnen Parameter in diesem Abschnitt.</p>
<h3 id="indexCoord" class="common-anchor-header"><code translate="no">indexCoord</code></h3><p>Siehe <a href="/docs/de/v2.4.x/configure_indexcoord.md">indexCoord-bezogene Konfigurationen</a> für eine ausführliche Beschreibung der einzelnen Parameter in diesem Abschnitt.</p>
<h3 id="indexNode" class="common-anchor-header"><code translate="no">indexNode</code></h3><p>Siehe <a href="/docs/de/v2.4.x/configure_indexnode.md">indexNode-bezogene Konfigurationen</a> für eine ausführliche Beschreibung der einzelnen Parameter in diesem Abschnitt.</p>
<h3 id="dataCoord" class="common-anchor-header"><code translate="no">dataCoord</code></h3><p>Siehe <a href="/docs/de/v2.4.x/configure_datacoord.md">dataCoord-related Configurations</a> für eine ausführliche Beschreibung der einzelnen Parameter in diesem Abschnitt.</p>
<h3 id="dataNode" class="common-anchor-header"><code translate="no">dataNode</code></h3><p>Siehe <a href="/docs/de/v2.4.x/configure_datanode.md">dataNode-bezogene Konfigurationen</a> für eine ausführliche Beschreibung der einzelnen Parameter in diesem Abschnitt.</p>
<h3 id="msgChannel" class="common-anchor-header"><code translate="no">msgChannel</code></h3><p>Dieses Thema stellt die Konfigurationen von Milvus vor, die sich auf den Nachrichtenkanal beziehen.</p>
<p>Siehe <a href="/docs/de/v2.4.x/configure_msgchannel.md">msgChannel-bezogene Konfigurationen</a> für eine ausführliche Beschreibung der einzelnen Parameter in diesem Abschnitt.</p>
<h3 id="log" class="common-anchor-header"><code translate="no">log</code></h3><p>Konfiguriert die Ausgabe des Systemprotokolls.</p>
<p>Siehe <a href="/docs/de/v2.4.x/configure_log.md">log-bezogene Konfigurationen</a> für eine detaillierte Beschreibung der einzelnen Parameter in diesem Abschnitt.</p>
<h3 id="grpc" class="common-anchor-header"><code translate="no">grpc</code></h3><p>Siehe <a href="/docs/de/v2.4.x/configure_grpc.md">grpc-bezogene Konfigurationen</a> für eine ausführliche Beschreibung der einzelnen Parameter in diesem Abschnitt.</p>
<h3 id="tls" class="common-anchor-header"><code translate="no">tls</code></h3><p>Konfiguriert den Proxy tls enable.</p>
<p>Siehe <a href="/docs/de/v2.4.x/configure_tls.md">tls-bezogene Konfigurationen</a> für eine ausführliche Beschreibung der einzelnen Parameter in diesem Abschnitt.</p>
<h3 id="common" class="common-anchor-header"><code translate="no">common</code></h3><p>Eine ausführliche Beschreibung der einzelnen Parameter in diesem Abschnitt finden Sie unter <a href="/docs/de/v2.4.x/configure_common.md">Konfigurationen für allgemeine Zwecke</a>.</p>
<h3 id="quotaAndLimits" class="common-anchor-header"><code translate="no">quotaAndLimits</code></h3><p>QuotaConfig, Konfigurationen der Milvus-Quote und -Limits.</p>
<p>Standardmäßig sind aktiviert:</p>
<ol>
<li><p>TT-Schutz;</p></li>
<li><p>Speicherschutz.</p></li>
<li><p>Festplatten-Quotenschutz.</p></li>
</ol>
<p>Sie können aktivieren:</p>
<ol>
<li><p>Begrenzung des DML-Durchsatzes;</p></li>
<li><p>DDL, DQL qps/rps Begrenzung;</p></li>
<li><p>DQL-Warteschlangenlänge/Latenzschutz;</p></li>
<li><p>Schutz der DQL-Ergebnisrate;</p></li>
</ol>
<p>Falls erforderlich, können Sie auch manuell erzwingen, dass RW-Anforderungen abgelehnt werden.</p>
<p>Siehe <a href="/docs/de/v2.4.x/configure_quotaandlimits.md">quotaAndLimits-bezogene Konfigurationen</a> für eine detaillierte Beschreibung der einzelnen Parameter in diesem Abschnitt.</p>
<h3 id="trace" class="common-anchor-header"><code translate="no">trace</code></h3><p>Eine ausführliche Beschreibung der einzelnen Parameter in diesem Abschnitt finden Sie unter <a href="/docs/de/v2.4.x/configure_trace.md">Konfigurationen für die Ablaufverfolgung (trace-related Configurations)</a>.</p>
<h3 id="gpu" class="common-anchor-header"><code translate="no">gpu</code></h3><p>#Wenn Sie GPU-Indizierung verwenden, verwendet Milvus einen Speicherpool, um häufige Speicherzuweisungen und -freigaben zu vermeiden.</p>
<p>#Hier können Sie die Größe des vom Speicherpool belegten Speichers einstellen, wobei die Einheit MB ist.</p>
<p>#Beachten Sie, dass die Möglichkeit besteht, dass Milvus abstürzt, wenn der tatsächliche Speicherbedarf den durch maxMemSize festgelegten Wert überschreitet.</p>
<p>#wenn initMemSize und MaxMemSize beide auf Null gesetzt sind,</p>
<p>wird #milvus automatisch die Hälfte des verfügbaren GPU-Speichers initialisieren,</p>
<p>#maxMemSize wird der gesamte verfügbare GPU-Speicher.</p>
<p>Siehe <a href="/docs/de/v2.4.x/configure_gpu.md">gpu-bezogene Konfigurationen</a> für eine detaillierte Beschreibung für jeden Parameter in diesem Abschnitt.</p>
