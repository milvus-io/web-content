---
id: install-overview.md
summary: >-
  Milvus ist eine hochleistungsfähige, skalierbare Vektordatenbank. Sie
  unterstützt Anwendungsfälle unterschiedlichster Größe, von Demos, die lokal in
  Jupyter Notebooks ausgeführt werden, bis hin zu Kubernetes-Clustern, die
  mehrere Milliarden Vektoren verarbeiten. Derzeit gibt es drei
  Milvus-Bereitstellungsoptionen: Milvus Lite, Milvus Standalone und Milvus
  Distributed.
title: Überblick über die Milvus-Bereitstellungsoptionen
---
<h1 id="Overview-of-Milvus-Deployment-Options" class="common-anchor-header">Überblick über die Milvus-Bereitstellungsoptionen<button data-href="#Overview-of-Milvus-Deployment-Options" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus ist eine hochleistungsfähige, skalierbare Vektordatenbank. Sie unterstützt Anwendungsfälle unterschiedlichster Größe, von Demos, die lokal in Jupyter Notebooks ausgeführt werden, bis hin zu Kubernetes-Clustern, die mehrere Milliarden Vektoren verarbeiten. Derzeit gibt es drei Milvus-Bereitstellungsoptionen: Milvus Lite, Milvus Standalone und Milvus Distributed.</p>
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
    </button></h2><p><a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> ist eine Python-Bibliothek, die in Ihre Anwendungen importiert werden kann. Als leichtgewichtige Version von Milvus ist sie ideal für schnelles Prototyping in Jupyter Notebooks oder für die Ausführung auf Smart Devices mit begrenzten Ressourcen. Milvus Lite unterstützt die gleichen APIs wie andere Milvus-Implementierungen. Der clientseitige Code, der mit Milvus Lite interagiert, kann auch mit Milvus-Instanzen in anderen Bereitstellungsmodi arbeiten.</p>
<p>Um Milvus Lite in Ihre Anwendungen zu integrieren, führen Sie <code translate="no">pip install pymilvus</code> aus, um es zu installieren, und verwenden Sie die Anweisung <code translate="no">MilvusClient(&quot;./demo.db&quot;)</code>, um eine Vektordatenbank mit einer lokalen Datei zu instanziieren, in der alle Ihre Daten gespeichert sind. Weitere Einzelheiten finden Sie unter <a href="https://milvus.io/docs/milvus_lite.md">Ausführen von Milvus Lite</a>.</p>
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
    </button></h2><p>Milvus Standalone ist ein Servereinsatz auf einer einzigen Maschine. Alle Komponenten von Milvus Standalone sind in ein einziges <a href="https://milvus.io/docs/install_standalone-docker.md">Docker-Image</a> gepackt, was die Bereitstellung erleichtert. Wenn Sie eine produktive Arbeitslast haben, aber nicht Kubernetes verwenden möchten, ist die Ausführung von Milvus Standalone auf einem einzelnen Rechner mit ausreichend Speicher eine gute Option. Außerdem unterstützt Milvus Standalone hohe Verfügbarkeit durch Master-Slave-Replikation.</p>
<h2 id="Milvus-Distributed" class="common-anchor-header">Milvus Verteilt<button data-href="#Milvus-Distributed" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Distributed kann auf <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes-Clustern</a> bereitgestellt werden. Diese Bereitstellung zeichnet sich durch eine Cloud-native Architektur aus, bei der die Ingestion-Last und die Suchanfragen separat von isolierten Knoten verarbeitet werden, was Redundanz für kritische Komponenten ermöglicht. Sie bietet höchste Skalierbarkeit und Verfügbarkeit sowie die Flexibilität, die zugewiesenen Ressourcen in jeder Komponente anzupassen. Milvus Distributed ist die erste Wahl für Unternehmensanwender, die große Vektorsuchsysteme in der Produktion betreiben.</p>
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
    </button></h2><p>Die Wahl des Bereitstellungsmodus hängt in der Regel von der Entwicklungsphase Ihrer Anwendung ab:</p>
<ul>
<li><p><strong>Für schnelles Prototyping</strong></p>
<p>Wenn Sie schnell etwas als Prototyp oder zu Lernzwecken erstellen möchten, wie z. B. Retrieval Augmented Generation (RAG)-Demos, KI-Chatbots, multimodale Suche, ist Milvus Lite selbst oder eine Kombination aus Milvus Lite und Milvus Standalone geeignet. Sie können Milvus Lite in Notebooks für Rapid Prototyping verwenden und verschiedene Ansätze wie z. B. verschiedene Chunking-Strategien in RAG erkunden. Möglicherweise möchten Sie die mit Milvus Lite erstellte Anwendung in einem kleinen Produktionsmaßstab einsetzen, um echte Benutzer zu bedienen oder die Idee an größeren Datensätzen zu validieren, z. B. an mehr als ein paar Millionen Vektoren. Milvus Standalone ist dafür geeignet. Die Anwendungslogik für Milvus Lite kann weiterhin gemeinsam genutzt werden, da alle Milvus-Implementierungen dieselbe clientseitige API haben. Die in Milvus Lite gespeicherten Daten können auch mit einem Befehlszeilentool auf Milvus Standalone portiert werden.</p></li>
<li><p><strong>Produktionseinsatz in kleinem Maßstab</strong></p>
<p>Für die frühe Produktionsphase, wenn das Projekt noch auf der Suche nach der Anpassung an den Produktmarkt ist und Agilität wichtiger ist als Skalierbarkeit, ist Milvus Standalone die beste Wahl. Es kann bei ausreichenden Maschinenressourcen bis zu 100 Mio. Vektoren skalieren und erfordert dabei viel weniger DevOps als die Wartung eines K8s-Clusters.</p></li>
<li><p><strong>Groß angelegte Produktionsimplementierung</strong></p>
<p>Wenn Ihr Unternehmen schnell wächst und die Datenmenge die Kapazität eines einzelnen Servers übersteigt, ist es an der Zeit, Milvus Distributed in Betracht zu ziehen. Sie können Milvus Standalone weiterhin für die Entwicklungs- oder Staging-Umgebung verwenden und den K8s-Cluster betreiben, auf dem Milvus Distributed läuft. Damit können Sie mehrere Milliarden Vektoren verwalten und die Knotengröße flexibel an Ihre spezielle Arbeitslast anpassen, z. B. an Fälle mit hohem Leseaufkommen und seltenen Schreibvorgängen oder mit hohem Schreibaufkommen und geringem Leseaufkommen.</p></li>
<li><p><strong>Lokale Suche auf Edge-Geräten</strong></p>
<p>Für die Suche in privaten oder sensiblen Daten auf Edge-Geräten können Sie Milvus Lite auf dem Gerät einsetzen, ohne sich für die Text- oder Bildsuche auf einen Cloud-basierten Dienst zu verlassen. Dies eignet sich z. B. für die Suche nach proprietären Dokumenten oder die Erkennung von Objekten auf dem Gerät.</p></li>
</ul>
<p>Die Wahl des Milvus-Bereitstellungsmodus hängt von der Phase und dem Umfang Ihres Projekts ab. Milvus bietet eine flexible und leistungsstarke Lösung für verschiedene Anforderungen, vom schnellen Prototyping bis zum Einsatz in großen Unternehmen.</p>
<ul>
<li><strong>Milvus Lite</strong> wird für kleinere Datensätze mit bis zu einigen Millionen Vektoren empfohlen.</li>
<li><strong>Milvus Standalone</strong> ist für mittelgroße Datensätze geeignet, die bis zu 100 Millionen Vektoren umfassen.</li>
<li><strong>Milvus Distributed</strong> ist für große Bereitstellungen konzipiert und kann Datensätze von 100 Millionen bis zu zehn Milliarden Vektoren verarbeiten.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/select-deployment-option.png" alt="Select deployment option for your use case" class="doc-image" id="select-deployment-option-for-your-use-case" />
   </span> <span class="img-wrapper"> <span>Wählen Sie die Einsatzoption für Ihren Anwendungsfall</span> </span></p>
<h2 id="Comparison-on-functionalities" class="common-anchor-header">Vergleich der Funktionalitäten<button data-href="#Comparison-on-functionalities" class="anchor-icon" translate="no">
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
<tr><th>Merkmal</th><th>Milvus Lite</th><th>Milvus Eigenständig</th><th>Milvus Verteilt</th></tr>
</thead>
<tbody>
<tr><td>SDK/Klient-Lirary</td><td>Python<br/>gRPC</td><td>Python<br/>Go<br/>Java<br/>Node.js<br/>C#<br/>RESTful</td><td>Python<br/>Java<br/>Go<br/>Node.js<br/>C#<br/>RESTful</td></tr>
<tr><td>Datentypen</td><td>Dense Vector<br/>Sparse Vector<br/>Binary Vector<br/>Boolean<br/>Integer<br/>Floating Point<br/>VarChar<br/>Array<br/>JSON</td><td>Dense Vector<br/>Sparse Vector<br/>Binary Vector<br/>Boolean<br/>Integer<br/>Floating Point<br/>VarChar<br/>Array<br/>JSON</td><td>Dense Vector<br/>Sparse Vector<br/>Binary Vector<br/>Boolean<br/>Integer<br/>Floating Point<br/>VarChar<br/>Array<br/>JSON</td></tr>
<tr><td>Suchmöglichkeiten</td><td>Vektorsuche (ANN-Suche)<br/>Metadatenfilterung<br/>Bereichssuche<br/>Skalarabfrage<br/>Entitäten nach Primärschlüssel abrufen<br/>Hybride Suche</td><td>Vektorsuche (ANN-Suche)<br/>Metadatenfilterung<br/>Bereichssuche<br/>Skalarabfrage<br/>Einträge nach Primärschlüssel abrufen<br/>Hybride Suche</td><td>Vektorsuche (ANN-Suche)<br/>Metadatenfilterung<br/>Bereichssuche<br/>Skalarabfrage<br/>Einträge nach Primärschlüssel abrufen<br/>Hybride Suche</td></tr>
<tr><td>CRUD-Vorgänge</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
<tr><td>Erweiterte Datenverwaltung</td><td>NICHT ZUTREFFEND</td><td>Zugriffskontrolle<br/>Partition<br/>Partitionsschlüssel</td><td>Zugriffskontrolle<br/>Partition<br/>Partitionsschlüssel<br/>Physische Ressourcengruppierung</td></tr>
<tr><td>Konsistenz-Ebenen</td><td>Stark</td><td>Stark<br/>Bounded Staleness<br/>Session<br/>Eventual</td><td>Stark<br/>Begrenzte Staleness<br/>Sitzung<br/>Eventuell</td></tr>
</tbody>
</table>
