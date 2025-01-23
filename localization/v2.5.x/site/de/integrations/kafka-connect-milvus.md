---
id: kafka-connect-milvus.md
summary: >-
  Apache Kafka ist mit Milvus und Zilliz Cloud integriert, um Vektordaten zu
  streamen. Erfahren Sie, wie Sie mit dem Kafka-Milvus-Connector
  Echtzeit-Pipelines für die semantische Suche, Empfehlungssysteme und
  KI-gesteuerte Analysen erstellen können.
title: >-
  Verbindung von Apache Kafka® mit Milvus/Zilliz Cloud für
  Echtzeit-Vektordaten-Ingestion
---
<h1 id="Connect-Apache-Kafka®-with-MilvusZilliz-Cloud-for-Real-Time-Vector-Data-Ingestion" class="common-anchor-header">Verbindung von Apache Kafka® mit Milvus/Zilliz Cloud für Echtzeit-Vektordaten-Ingestion<button data-href="#Connect-Apache-Kafka®-with-MilvusZilliz-Cloud-for-Real-Time-Vector-Data-Ingestion" class="anchor-icon" translate="no">
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
    </button></h1><p>In dieser Schnellstartanleitung zeigen wir, wie man Open Source Kafka und Zilliz Cloud für die Aufnahme von Vektordaten einrichtet.</p>
<p>In diesem Tutorial wird erklärt, wie Apache Kafka® zum Streamen und Aufnehmen von Vektordaten in die Milvus-Vektordatenbank und die Zilliz-Cloud (vollständig verwaltetes Milvus) verwendet wird, um fortschrittliche Echtzeitanwendungen wie semantische Suche, Empfehlungssysteme und KI-gestützte Analysen zu ermöglichen.</p>
<p>Apache Kafka ist eine verteilte Event-Streaming-Plattform, die für Pipelines mit hohem Durchsatz und geringer Latenz entwickelt wurde. Sie wird häufig zum Sammeln, Speichern und Verarbeiten von Echtzeit-Datenströmen aus Quellen wie Datenbanken, IoT-Geräten, mobilen Apps und Cloud-Diensten verwendet. Die Fähigkeit von Kafka, große Datenmengen zu verarbeiten, macht es zu einer wichtigen Datenquelle für Vektordatenbanken wie Milvus oder Zilliz Cloud.</p>
<p>Kafka kann beispielsweise Echtzeit-Datenströme - wie Benutzerinteraktionen oder Sensormesswerte - zusammen mit ihren Einbettungen aus maschinellen Lernmodellen erfassen und diese Ströme direkt in Milvus oder Zilliz Cloud veröffentlichen. Einmal in der Vektordatenbank angekommen, können diese Daten effizient indiziert, durchsucht und analysiert werden.</p>
<p>Die Kafka-Integration mit Milvus und Zilliz Cloud bietet eine nahtlose Möglichkeit zum Aufbau leistungsstarker Pipelines für unstrukturierte Daten-Workflows. Der Konnektor funktioniert sowohl für den Einsatz von Open-Source-Kafka als auch für gehostete Dienste wie <a href="https://www.confluent.io/hub/zilliz/kafka-connect-milvus">Confluent</a> und <a href="https://docs.streamnative.io/hub/connector-kafka-connect-milvus-sink-v0.1">StreamNative</a>.</p>
<p>In diesem Tutorial verwenden wir Zilliz Cloud als Demonstration:</p>
<h2 id="Step-1-Download-the-kafka-connect-milvus-plugin" class="common-anchor-header">Schritt 1: Herunterladen des kafka-connect-milvus-Plugins<button data-href="#Step-1-Download-the-kafka-connect-milvus-plugin" class="anchor-icon" translate="no">
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
    </button></h2><p>Führen Sie die folgenden Schritte aus, um das kafka-connect-milvus-Plugin herunterzuladen.</p>
<ol>
<li>Laden Sie die neueste Plugin-Zip-Datei <code translate="no">zilliz-kafka-connect-milvus-xxx.zip</code> von <a href="https://github.com/zilliztech/kafka-connect-milvus/releases">hier</a> herunter.</li>
</ol>
<h2 id="Step-2-Download-Kafka" class="common-anchor-header">Schritt 2: Kafka herunterladen<button data-href="#Step-2-Download-Kafka" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Laden Sie die neueste Kafka-Version von <a href="https://kafka.apache.org/downloads">hier</a> herunter.</li>
<li>Entpacken Sie die heruntergeladene Datei und wechseln Sie in das Kafka-Verzeichnis.</li>
</ol>
<pre><code translate="no" class="language-shell">$ tar -xzf kafka_2.13-3.6.1.tgz
$ <span class="hljs-built_in">cd</span> kafka_2.13-3.6.1
<button class="copy-code-btn"></button></code></pre>
<h2 id="STEP-3-Start-the-Kafka-Environment" class="common-anchor-header">SCHRITT 3: Starten Sie die Kafka-Umgebung<button data-href="#STEP-3-Start-the-Kafka-Environment" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">
<p>HINWEIS: In Ihrer lokalen Umgebung muss Java 8+ installiert sein.</p>
</div>
<p>Führen Sie die folgenden Befehle aus, um alle Dienste in der richtigen Reihenfolge zu starten:</p>
<ol>
<li><p>Starten Sie den ZooKeeper-Dienst</p>
<pre><code translate="no" class="language-shell">$ bin/zookeeper-server-start.sh config/zookeeper.properties
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Starten Sie den Kafka-Broker-Dienst</p>
<p>Öffnen Sie eine weitere Terminalsitzung und führen Sie den Befehl aus:</p>
<pre><code translate="no" class="language-shell">$ bin/kafka-server-start.sh config/server.properties
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>Sobald alle Dienste erfolgreich gestartet wurden, verfügen Sie über eine grundlegende Kafka-Umgebung, die sofort einsatzbereit ist.</p>
<ul>
<li>Einzelheiten finden Sie in der offiziellen Schnellstartanleitung für Kafka: https://kafka.apache.org/quickstart</li>
</ul>
<h2 id="Step-4-Configure-Kafka-and-Zilliz-Cloud" class="common-anchor-header">Schritt 4: Konfigurieren Sie Kafka und Zilliz Cloud<button data-href="#Step-4-Configure-Kafka-and-Zilliz-Cloud" class="anchor-icon" translate="no">
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
    </button></h2><p>Stellen Sie sicher, dass Sie Kafka und Zilliz Cloud eingerichtet und richtig konfiguriert haben.</p>
<ol>
<li><p>Wenn Sie noch kein Topic in Kafka haben, erstellen Sie ein Topic (z.B. <code translate="no">topic_0</code>) in Kafka.</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">bin</span>/kafka-topics.sh --create --topic topic_0 --bootstrap-server localhost:<span class="hljs-number">9092</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Wenn Sie noch keine Sammlung in Zilliz Cloud haben, erstellen Sie eine Sammlung mit einem Vektorfeld (in diesem Beispiel hat der Vektor <code translate="no">dimension=8</code>). Sie können das folgende Beispielschema auf Zilliz Cloud verwenden:</p>
<p><img translate="no" src="https://github.com/zilliztech/kafka-connect-milvus/raw/main/src/main/resources/images/collection_schema.png" width="100%"  alt=""/></p>
<p><div class="alert note"></p>
<p>Hinweis: Achten Sie darauf, dass die Schemata auf beiden Seiten übereinstimmen. In dem Schema gibt es genau ein Vektorfeld. Die Namen der einzelnen Felder auf beiden Seiten sind exakt gleich.</p>
<p></div></p></li>
</ol>
<h2 id="Step-5-Load-the-kafka-connect-milvus-plugin-to-Kafka-Instance" class="common-anchor-header">Schritt 5: Laden Sie das kafka-connect-milvus-Plugin in die Kafka-Instanz<button data-href="#Step-5-Load-the-kafka-connect-milvus-plugin-to-Kafka-Instance" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Entpacken Sie die Datei <code translate="no">zilliz-kafka-connect-milvus-xxx.zip</code>, die Sie in Schritt 1 heruntergeladen haben.</p></li>
<li><p>Kopieren Sie die Verzeichnisse <code translate="no">zilliz-kafka-connect-milvus</code> in das Verzeichnis <code translate="no">libs</code> Ihrer Kafka-Installation.</p></li>
<li><p>Ändern Sie die Datei <code translate="no">connect-standalone.properties</code> im Verzeichnis <code translate="no">config</code> Ihrer Kafka-Installation.</p>
<pre><code translate="no" class="language-properties">key.converter.schemas.enable=<span class="hljs-literal">false</span>
value.converter.schemas.enable=<span class="hljs-literal">false</span>
plugin.path=libs/zilliz-kafka-connect-milvus-xxx
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Erstellen und konfigurieren Sie eine <code translate="no">milvus-sink-connector.properties</code> -Datei im <code translate="no">config</code> -Verzeichnis Ihrer Kafka-Installation.</p>
<pre><code translate="no" class="language-properties">name=zilliz-kafka-connect-milvus
connector.<span class="hljs-keyword">class</span>=com.milvus.io.kafka.MilvusSinkConnector
<span class="hljs-keyword">public</span>.endpoint=https:<span class="hljs-comment">//&lt;public.endpoint&gt;:port</span>
token=*****************************************
collection.name=topic_0
topics=topic_0
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Step-6-Launch-the-connector" class="common-anchor-header">Schritt 6: Starten Sie den Konnektor<button data-href="#Step-6-Launch-the-connector" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Starten Sie den Konnektor mit der vorherigen Konfigurationsdatei</p>
<pre><code translate="no" class="language-shell">$ bin/connect-standalone.sh config/connect-standalone.properties config/milvus-sink-connector.properties
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Versuchen Sie, eine Nachricht an das soeben erstellte Kafka-Topic in Kafka zu erzeugen</p>
<pre><code translate="no" class="language-shell">bin/kafka-<span class="hljs-variable language_">console</span>-producer.<span class="hljs-property">sh</span> --topic topic_0 --bootstrap-server <span class="hljs-attr">localhost</span>:<span class="hljs-number">9092</span>                        
&gt;{<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>, <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;The Reported Mortality Rate of Coronavirus Is Not Important&quot;</span>, <span class="hljs-string">&quot;title_vector&quot;</span>: [<span class="hljs-number">0.041732933</span>, <span class="hljs-number">0.013779674</span>, -<span class="hljs-number">0.027564144</span>, -<span class="hljs-number">0.013061441</span>, <span class="hljs-number">0.009748648</span>, <span class="hljs-number">0.00082446384</span>, -<span class="hljs-number">0.00071647146</span>, <span class="hljs-number">0.048612226</span>], <span class="hljs-string">&quot;link&quot;</span>: <span class="hljs-string">&quot;https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912&quot;</span>}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Prüfen Sie, ob die Entität in die Sammlung in Zilliz Cloud eingefügt wurde. So sieht es auf Zilliz Cloud aus, wenn die Einfügung erfolgreich war:</p>
<p><img translate="no" src="https://github.com/zilliztech/kafka-connect-milvus/raw/main/src/main/resources/images/insearted_entities.png" width="80%" /></p></li>
</ol>
<h3 id="Support" class="common-anchor-header">Unterstützung</h3><p>Wenn Sie Unterstützung benötigen oder Fragen zum Kafka Connect Milvus Connector haben, wenden Sie sich bitte an den Maintainer des Connectors: <strong>E-Mail:</strong> <a href="mailto:support@zilliz.com">support@zilliz.com</a></p>
