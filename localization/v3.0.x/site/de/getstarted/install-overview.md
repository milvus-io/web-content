---
id: install-overview.md
summary: >-
  Wählen Sie je nach Ihrer Arbeitslast, Ihren Verfügbarkeitsanforderungen und
  Ihrer Betriebsumgebung zwischen Milvus Lite, Standalone oder Distributed.
title: Übersicht über die Milvus-Bereitstellungsoptionen
---
<h1 id="Overview-of-Milvus-Deployment-Options" class="common-anchor-header">Übersicht über die Milvus-Bereitstellungsoptionen<button data-href="#Overview-of-Milvus-Deployment-Options" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus unterstützt lokale Prototypen und groß angelegte Vektorsuchdienste. Wählen Sie je nach Ihren Daten, der Lese- und Schreibauslastung, den Verfügbarkeitsanforderungen und der Betriebsumgebung zwischen Milvus Lite, Milvus Standalone und Milvus Distributed.</p>
<h2 id="Milvus-Lite" class="common-anchor-header">Milvus Lite<button data-href="#Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> ist eine Python-Bibliothek, die in Ihre Anwendungen importiert werden kann. Als leichtgewichtige Version von Milvus eignet sie sich ideal für die schnelle Prototypenerstellung in Jupyter-Notebooks oder für den Einsatz auf Smart-Geräten mit begrenzten Ressourcen. Milvus Lite unterstützt dieselben APIs wie andere Milvus-Bereitstellungsarten. Der clientseitige Code, der mit Milvus Lite interagiert, kann auch mit Milvus-Instanzen in anderen Bereitstellungsmodi verwendet werden.</p>
<p>Verwenden Sie für die lokalen Beispiele Python 3.10 oder höher und installieren Sie die optionale Lite-Abhängigkeit explizit. Unter Windows überspringt pip den Zusatz „ <code translate="no">milvus-lite</code> “, daher ist die Angabe des vollständigen Paketnamens erforderlich:</p>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus[milvus-lite]==3.0.2&quot;</span> <span class="hljs-string">&quot;milvus-lite==3.2.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Verwenden Sie „ <code translate="no">MilvusClient(&quot;./demo.db&quot;)</code> “, um den lokalen Speicher zu öffnen. Milvus Lite 3.x erstellt ein Verzeichnis unter diesem Pfad; eine vorhandene Milvus Lite 2.x-Datenbankdatei muss exportiert und migriert werden. Informationen zu den Plattformanforderungen finden Sie unter <a href="/docs/de/milvus_lite.md">„Milvus Lite ausführen“</a> und ein vollständiges Beispiel zum Einfügen und Suchen unter <a href="/docs/de/quickstart.md">„Schnellstart</a> “.</p>
<h2 id="Milvus-Standalone" class="common-anchor-header">Milvus Standalone<button data-href="#Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Standalone ist eine Serverbereitstellung auf einem einzelnen Rechner. Alle Komponenten von Milvus Standalone sind in einem einzigen <a href="https://milvus.io/docs/install_standalone-docker.md">Docker-Image</a> zusammengefasst, was die Bereitstellung vereinfacht. Wenn Sie eine Produktionslast haben, aber lieber auf Kubernetes verzichten möchten, ist der Betrieb von Milvus Standalone auf einem einzelnen Rechner mit ausreichendem Arbeitsspeicher eine gute Option. Standardmäßig nutzt Milvus Standalone <strong>„Woodpecker“</strong> (eingebettet) als Nachrichtenwarteschlange, sodass kein separater Messaging-Dienst betrieben werden muss.</p>
<h2 id="Milvus-Distributed" class="common-anchor-header">Milvus Distributed<button data-href="#Milvus-Distributed" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Distributed kann auf <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes-Clustern</a> bereitgestellt werden. Diese Bereitstellung zeichnet sich durch eine cloudnative Architektur aus, bei der die Eingabelast und Suchanfragen separat von isolierten Knoten verarbeitet werden, was Redundanz für kritische Komponenten ermöglicht. Sie bietet höchste Skalierbarkeit und Verfügbarkeit sowie Flexibilität bei der Anpassung der zugewiesenen Ressourcen für jede Komponente. Milvus Distributed ist die erste Wahl für Unternehmensanwender, die groß angelegte Vektorsuchsysteme im Produktivbetrieb einsetzen. Standardmäßig nutzt Milvus Distributed <strong>Woodpecker</strong> als Nachrichtenwarteschlange, das als dedizierter Dienst neben Milvus bereitgestellt wird.</p>
<h2 id="Choose-the-Right-Deployment-for-Your-Use-Case" class="common-anchor-header">Wählen Sie die richtige Bereitstellung für Ihren Anwendungsfall<button data-href="#Choose-the-Right-Deployment-for-Your-Use-Case" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Wahl des Bereitstellungsmodus hängt in der Regel vom Entwicklungsstand Ihrer Anwendung ab:</p>
<ul>
<li><p><strong>Für schnelles Prototyping</strong></p>
<p>Verwenden Sie Milvus Lite in einem Notebook, um Embeddings, RAG-Chunking-Strategien und das Abrufverhalten zu testen. Wechseln Sie zu Milvus Standalone, wenn Sie einen gemeinsam genutzten Server benötigen oder wenn der gemessene Speicher- und Abfrageaufwand die Kapazitäten der lokalen Umgebung übersteigt. Die Client-API ist ähnlich, prüfen Sie jedoch die Funktionsunterschiede und migrieren Sie die gespeicherten Daten separat.</p></li>
<li><p><strong>Produktivbereitstellung in kleinem Maßstab</strong></p>
<p>Verwenden Sie Milvus Standalone, wenn ein einzelner Server Ihre Anforderungen an Arbeitslast und Verfügbarkeit erfüllen kann und Sie den Betrieb ohne Kubernetes bevorzugen. Schätzen Sie den Speicherbedarf anhand von Vektordimensionen, Skalarfeldern, Indexeinstellungen und Replikaten und führen Sie anschließend einen Benchmark der erwarteten Abfrage-Parallelität und Schreibrate durch. Die Anzahl der Vektoren allein sagt nichts über die Kapazität aus.</p></li>
<li><p><strong>Groß angelegter Produktionsbetrieb</strong></p>
<p>Wenn Ihr Unternehmen schnell wächst und der Datenumfang die Kapazität eines einzelnen Servers übersteigt, ist es an der Zeit, Milvus Distributed in Betracht zu ziehen. Sie können Milvus Standalone aufgrund seiner Benutzerfreundlichkeit weiterhin für Entwicklungs- oder Staging-Umgebungen nutzen und gleichzeitig den K8s-Cluster betreiben, auf dem Milvus Distributed läuft. Dies ermöglicht die Skalierung auf mehrere zehn Milliarden Vektoren und bietet zudem Flexibilität bei der Anpassung der Knotengröße an Ihre spezifische Arbeitslast, beispielsweise bei Szenarien mit hohem Leseaufkommen und seltenen Schreibvorgängen oder umgekehrt mit hohem Schreibaufkommen und geringem Leseaufkommen.</p></li>
<li><p><strong>Lokale Suche auf Edge-Geräten</strong></p>
<p>Für die Suche in privaten oder sensiblen Daten auf Edge-Geräten können Sie Milvus Lite direkt auf dem Gerät bereitstellen, ohne für die Text- oder Bildsuche auf einen cloudbasierten Dienst angewiesen zu sein. Dies eignet sich beispielsweise für die Suche in firmeneigenen Dokumenten oder die Objekterkennung direkt auf dem Gerät.</p></li>
</ul>
<p>Die Wahl des Milvus-Bereitstellungsmodus hängt von der Phase und dem Umfang Ihres Projekts ab. Milvus bietet eine flexible und leistungsstarke Lösung für verschiedene Anforderungen, vom schnellen Prototyping bis hin zum groß angelegten Einsatz in Unternehmen.</p>
<ul>
<li><strong>Milvus Lite</strong> eignet sich für lokale Auswertungen und Workloads, die mit den Ressourcen einer einzelnen Anwendung bewältigt werden können.</li>
<li><strong>Milvus Standalone</strong> bietet einen gemeinsam genutzten Dienst, wenn ein Server Ihre Anforderungen an Kapazität und Verfügbarkeit erfüllt.</li>
<li><strong>Milvus Distributed</strong> bietet Skalierbarkeit auf Komponentenebene und Redundanz, wenn Sie über einen Server hinauswachsen oder Lese- und Schreibressourcen voneinander trennen müssen.</li>
</ul>
<p>Milvus Standalone und Distributed nutzen eine Nachrichtenwarteschlange, einen Objektspeicher und einen Metadatenspeicher. Milvus Lite läuft lokal ohne diese separaten Dienste. Informationen zu den Standardabhängigkeiten der Serverbereitstellungen und zu Optionen für externe Dienste finden Sie unter <a href="/docs/de/data-infra-integration-overview.md">„Dateninfrastruktur</a>“.</p>
<p>Wenn Sie einen Managed Service bevorzugen, anstatt die Serverinfrastruktur selbst zu betreiben, sollten Sie <a href="https://zilliz.com/cloud">Zilliz Cloud</a> in Betracht ziehen. Für eine eigenständige Bereitstellung fahren Sie mit <a href="/docs/de/install_standalone-docker.md">Docker</a> oder <a href="/docs/de/install_cluster-milvusoperator.md">Kubernetes</a> fort.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/select-deployment-option.png" alt="Select deployment option for your use case" class="doc-image" id="select-deployment-option-for-your-use-case" /> 
   <span>Wählen Sie die Bereitstellungsoption für Ihren Anwendungsfall</span>
  
 </span></p>
<h2 id="Comparison-on-functionalities" class="common-anchor-header">Vergleich der Funktionen<button data-href="#Comparison-on-functionalities" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Spalte „Lite“ beschreibt Milvus Lite 3.2.2. Prüfen Sie <a href="/docs/de/milvus_lite.md#Supported-features-and-limits">die Einschränkungen von Milvus Lite</a>, bevor Sie sich in einer lokalen Anwendung auf eine Serverfunktion verlassen.</p>
<table>
<thead>
<tr><th>Funktion</th><th>Milvus Lite</th><th>Milvus Standalone</th><th>Milvus Distributed</th></tr>
</thead>
<tbody>
<tr><td>SDK / Client-Bibliothek</td><td>Python (lokaler PyMilvus-Adapter)</td><td>Python<br/>Go<br/>Java<br/>Node.js<br/>C#<br/>RESTful</td><td>Python<br/>Java<br/>Go<br/>Node.js<br/>C#<br/>RESTful</td></tr>
<tr><td>Datentypen</td><td>Dichter Vektor<br/>Sparse-Vektor<br/>Boolescher Wert<br/>Ganzzahl<br/>Gleitkomma<br/>VarChar<br/>Array<br/>JSON</td><td>Dichter Vektor<br/>Sparse-Vektor<br/>Binärvektor<br/>Boolescher Wert<br/>Ganzzahl<br/>Gleitkomma<br/>VarChar<br/>Array<br/>JSON</td><td>Dichter Vektor<br/>Sparse-Vektor<br/>Binärvektor<br/>Boolesche Werte<br/>Ganzzahlen<br/>Gleitkommazahlen<br/>VarChar<br/>Array<br/>JSON</td></tr>
<tr><td>Suchfunktionen</td><td>Vektorsuche (ANN-Suche)<br/>Metadatenfilterung<br/>Bereichssuche<br/>Skalare Abfrage<br/>Entitäten nach Primärschlüssel abrufen<br/>Hybride Suche</td><td>Vektorsuche (ANN-Suche)<br/>Metadatenfilterung<br/>Bereichssuche<br/>Skalare Abfrage<br/>Entitäten nach Primärschlüssel abrufen<br/>Hybride Suche</td><td>Vektorsuche (ANN-Suche)<br/>Metadatenfilterung<br/>Bereichssuche<br/>Skalare Abfrage<br/>Entitäten nach Primärschlüssel abrufen<br/>Hybride Suche</td></tr>
<tr><td>CRUD-Operationen</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
<tr><td>Erweiterte Datenverwaltung</td><td>Datenbanken<br/>Partitionen<br/>Aliase<br/>Keine Zugriffskontrolle</td><td>Zugriffskontrolle<br/>Partition<br/>Partitionsschlüssel</td><td>Zugriffskontrolle<br/>Partition<br/>Partitionsschlüssel<br/>Physische Ressourcengruppierung</td></tr>
<tr><td>Konsistenzstufen</td><td>Nicht zutreffend: Ein einzelner lokaler Prozess bedient alle Anfragen; „ <code translate="no">consistency_level</code> “ wird akzeptiert, hat jedoch keine Auswirkung</td><td>Starke<br/>Begrenzte Veralterung<br/>Sitzung<br/>Eventuell</td><td>Starkes „<br/>“, „Bounded Staleness“, „<br/>“, „Session“, „<br/>“, „Eventual“</td></tr>
<tr><td>Nachrichtenwarteschlange</td><td>k. A.</td><td>Woodpecker (eingebettet)</td><td>Woodpecker (Dienst)</td></tr>
</tbody>
</table>
