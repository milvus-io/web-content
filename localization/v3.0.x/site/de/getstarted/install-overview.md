---
id: install-overview.md
summary: >-
  Milvus ist eine hochleistungsfähige, skalierbare Vektordatenbank. Sie
  unterstützt Anwendungsfälle unterschiedlichster Größenordnung – von lokal in
  Jupyter-Notebooks ausgeführten Demos bis hin zu riesigen Kubernetes-Clustern,
  die mehrere zehn Milliarden Vektoren verarbeiten. Derzeit gibt es drei
  Milvus-Bereitstellungsoptionen: Milvus Lite, Milvus Standalone und Milvus
  Distributed.
title: Übersicht über die Bereitstellungsoptionen von Milvus
---
<h1 id="Overview-of-Milvus-Deployment-Options" class="common-anchor-header">Übersicht über die Bereitstellungsoptionen von Milvus<button data-href="#Overview-of-Milvus-Deployment-Options" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus ist eine hochleistungsfähige, skalierbare Vektordatenbank. Sie unterstützt Anwendungsfälle unterschiedlichster Größenordnungen, von lokal in Jupyter-Notebooks ausgeführten Demos bis hin zu riesigen Kubernetes-Clustern, die mehrere zehn Milliarden Vektoren verarbeiten. Derzeit gibt es drei Milvus-Bereitstellungsoptionen: Milvus Lite, Milvus Standalone und Milvus Distributed.</p>
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
<p>Um Milvus Lite in Ihre Anwendungen zu integrieren, führen Sie „ <code translate="no">pip install pymilvus</code> “ aus, um es zu installieren, und verwenden Sie die Anweisung „ <code translate="no">MilvusClient(&quot;./demo.db&quot;)</code> “, um eine Vektordatenbank mit einer lokalen Datei zu instanziieren, in der alle Ihre Daten gespeichert werden. Weitere Informationen finden Sie unter <a href="https://milvus.io/docs/milvus_lite.md">„Milvus Lite ausführen</a>“.</p>
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
    </button></h2><p>Milvus Standalone ist eine Serverbereitstellung auf einem einzelnen Rechner. Alle Komponenten von Milvus Standalone sind in einem einzigen <a href="https://milvus.io/docs/install_standalone-docker.md">Docker-Image</a> zusammengefasst, was die Bereitstellung vereinfacht. Wenn Sie eine Produktionsumgebung betreiben, aber lieber auf Kubernetes verzichten möchten, ist der Betrieb von Milvus Standalone auf einem einzelnen Rechner mit ausreichendem Arbeitsspeicher eine gute Option. Standardmäßig nutzt Milvus Standalone <strong>„Woodpecker“</strong> (eingebettet) als Nachrichtenwarteschlange, sodass kein separater Messaging-Dienst betrieben werden muss.</p>
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
    </button></h2><p>Milvus Distributed kann auf <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes-Clustern</a> bereitgestellt werden. Diese Bereitstellung zeichnet sich durch eine cloudnative Architektur aus, bei der die Erfassungslast und Suchanfragen separat von isolierten Knoten verarbeitet werden, was Redundanz für kritische Komponenten ermöglicht. Sie bietet höchste Skalierbarkeit und Verfügbarkeit sowie Flexibilität bei der Anpassung der zugewiesenen Ressourcen für jede Komponente. Milvus Distributed ist die erste Wahl für Unternehmensanwender, die groß angelegte Vektorsuchsysteme im Produktivbetrieb einsetzen. Standardmäßig nutzt Milvus Distributed <strong>Woodpecker</strong> als Nachrichtenwarteschlange, das als dedizierter Dienst neben Milvus bereitgestellt wird.</p>
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
<p>Wenn Sie schnell einen Prototyp erstellen oder zu Lernzwecken arbeiten möchten, beispielsweise für RAG-Demos (Retrieval Augmented Generation), KI-Chatbots oder multimodale Suche, eignet sich Milvus Lite allein oder in Kombination mit Milvus Standalone. Sie können Milvus Lite in Notebooks für das schnelle Prototyping nutzen und verschiedene Ansätze wie unterschiedliche Chunking-Strategien bei RAG ausprobieren. Möglicherweise möchten Sie die mit Milvus Lite erstellte Anwendung in einer kleinen Produktionsumgebung bereitstellen, um echte Nutzer zu bedienen, oder die Idee anhand größerer Datensätze – beispielsweise mit mehr als einigen Millionen Vektoren – validieren. In diesem Fall ist Milvus Standalone die richtige Wahl. Die Anwendungslogik für Milvus Lite kann weiterhin gemeinsam genutzt werden, da alle Milvus-Bereitstellungen über dieselbe clientseitige API verfügen. Die in Milvus Lite gespeicherten Daten lassen sich zudem mit einem Befehlszeilentool auf Milvus Standalone übertragen.</p></li>
<li><p><strong>Bereitstellung in einer kleinen Produktionsumgebung</strong></p>
<p>Für die frühe Produktionsphase, in der das Projekt noch nach der Produkt-Markt-Passung sucht und Agilität wichtiger ist als Skalierbarkeit, ist Milvus Standalone die beste Wahl. Es lässt sich bei ausreichenden Maschinenressourcen immer noch auf bis zu 100 Millionen Vektoren skalieren, erfordert dabei jedoch deutlich weniger DevOps-Aufwand als die Wartung eines K8s-Clusters.</p></li>
<li><p><strong>Groß angelegter Produktionsbetrieb</strong></p>
<p>Wenn Ihr Unternehmen schnell wächst und der Datenumfang die Kapazität eines einzelnen Servers übersteigt, ist es an der Zeit, Milvus Distributed in Betracht zu ziehen. Sie können Milvus Standalone aufgrund seiner Benutzerfreundlichkeit weiterhin für Entwicklungs- oder Staging-Umgebungen nutzen und gleichzeitig den K8s-Cluster betreiben, auf dem Milvus Distributed läuft. Dies ermöglicht Ihnen den Umgang mit mehreren zehn Milliarden Vektoren und bietet Ihnen zudem Flexibilität bei der Anpassung der Knotengröße an Ihre spezifische Arbeitslast, beispielsweise bei Szenarien mit vielen Lesezugriffen und seltenen Schreibvorgängen oder umgekehrt mit vielen Schreibvorgängen und wenigen Lesezugriffen.</p></li>
<li><p><strong>Lokale Suche auf Edge-Geräten</strong></p>
<p>Für die Suche in privaten oder sensiblen Daten auf Edge-Geräten können Sie Milvus Lite direkt auf dem Gerät bereitstellen, ohne für die Text- oder Bildsuche auf einen cloudbasierten Dienst angewiesen zu sein. Dies eignet sich beispielsweise für die Suche in firmeneigenen Dokumenten oder die Objekterkennung direkt auf dem Gerät.</p></li>
</ul>
<p>Die Wahl des Milvus-Bereitstellungsmodus hängt von der Phase und dem Umfang Ihres Projekts ab. Milvus bietet eine flexible und leistungsstarke Lösung für verschiedene Anforderungen, vom schnellen Prototyping bis hin zum groß angelegten Einsatz in Unternehmen.</p>
<ul>
<li><strong>Milvus Lite</strong> wird für kleinere Datensätze mit bis zu einigen Millionen Vektoren empfohlen.</li>
<li><strong>Milvus Standalone</strong> eignet sich für mittelgroße Datensätze mit bis zu 100 Millionen Vektoren.</li>
<li><strong>Milvus Distributed</strong> ist für groß angelegte Bereitstellungen konzipiert und kann Datensätze von 100 Millionen bis zu mehreren zehn Milliarden Vektoren verarbeiten.</li>
</ul>
<p>Unabhängig vom Bereitstellungsmodus stützt sich jede Milvus-Instanz auf eine Nachrichtenwarteschlange, einen Objektspeicher und einen Metadatenspeicher – standardmäßig <strong>Woodpecker</strong>, <strong>MinIO</strong> und <strong>etcd</strong>. Um mehr über diese Abhängigkeiten zu erfahren, sie anzupassen oder externe Dienste anzubinden, lesen Sie <a href="/docs/de/data-infra-integration-overview.md">den Abschnitt „Dateninfrastruktur</a>“.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/select-deployment-option.png" alt="Select deployment option for your use case" class="doc-image" id="select-deployment-option-for-your-use-case" /> 
   <span>Wählen Sie die für Ihren Anwendungsfall geeignete Bereitstellungsoption</span>
  
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
    </button></h2><table>
<thead>
<tr><th>Funktion</th><th>Milvus Lite</th><th>Milvus Standalone</th><th>Milvus Distributed</th></tr>
</thead>
<tbody>
<tr><td>SDK / Client-Bibliothek</td><td>Python-<br/>-gRPC</td><td>Python-<br/>Go-<br/>Java-<br/>Node.js-<br/>C#-<br/>RESTful</td><td>Python<br/>Java<br/>Go<br/>Node.js<br/>C#<br/>RESTful</td></tr>
<tr><td>Datentypen</td><td>Dichter Vektor<br/>Sparse-Vektor<br/>Binärvektor<br/>Boolescher Wert<br/>Ganzzahl<br/>Gleitkomma<br/>VarChar<br/>Array<br/>JSON</td><td>Dichter Vektor<br/>Sparse-Vektor<br/>Binärvektor<br/>Boolescher Wert<br/>Ganzzahl<br/>Gleitkomma<br/>VarChar<br/>Array<br/>JSON</td><td>Dichter Vektor<br/>Sparse-Vektor<br/>Binärvektor<br/>Boolesche Werte<br/>Ganzzahl<br/>Gleitkomma<br/>VarChar<br/>Array<br/>JSON</td></tr>
<tr><td>Suchfunktionen</td><td>Vektorsuche (ANN-Suche)<br/>Metadatenfilterung<br/>Bereichssuche<br/>Skalare Abfrage<br/>Entitäten nach Primärschlüssel abrufen<br/>Hybride Suche</td><td>Vektorsuche (ANN-Suche)<br/>Metadatenfilterung<br/>Bereichssuche<br/>Skalare Abfrage<br/>Entitäten nach Primärschlüssel abrufen<br/>Hybride Suche</td><td>Vektorsuche (ANN-Suche)<br/>Metadatenfilterung<br/>Bereichssuche<br/>Skalare Abfrage<br/>Entitäten nach Primärschlüssel abrufen<br/>Hybride Suche</td></tr>
<tr><td>CRUD-Operationen</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
<tr><td>Erweiterte Datenverwaltung</td><td>k. A.</td><td>Zugriffskontrolle<br/>Partition<br/>Partitionsschlüssel</td><td>Zugriffskontroll-<br/>-Partition<br/>-Partitionsschlüssel<br/>Gruppierung physischer Ressourcen</td></tr>
<tr><td>Konsistenzstufen</td><td>Stark</td><td>Stark<br/>Begrenzte Veralterung<br/>Sitzung<br/>Eventuell</td><td>Stark<br/>Begrenzte Veralterung<br/>Sitzungs<br/>Eventual</td></tr>
<tr><td>Nachrichtenwarteschlange</td><td>k. A.</td><td>Woodpecker (eingebettet)</td><td>Woodpecker (Dienst)</td></tr>
</tbody>
</table>
