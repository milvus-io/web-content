---
id: milvus_and_n8n.md
summary: >-
  n8n ist eine leistungsstarke Open-Source-Plattform zur
  Workflow-Automatisierung, mit der Sie verschiedene Anwendungen, Dienste und
  APIs miteinander verbinden können, um automatisierte Workflows ohne
  Programmierung zu erstellen. Mit seiner knotenbasierten visuellen
  Schnittstelle ermöglicht n8n Benutzern die Erstellung komplexer
  Automatisierungsprozesse durch einfaches Verbinden von Knoten, die
  verschiedene Dienste oder Aktionen darstellen. Es ist selbst-hostbar,
  hochgradig erweiterbar und unterstützt sowohl Fair-Code- als auch
  Enterprise-Lizenzen.
title: Erste Schritte mit Milvus und n8n
---
<h1 id="Getting-Started-with-Milvus-and-n8n" class="common-anchor-header">Erste Schritte mit Milvus und n8n<button data-href="#Getting-Started-with-Milvus-and-n8n" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Introduction-to-n8n-and-the-Milvus-Vector-Store-Node" class="common-anchor-header">Einführung in n8n und den Milvus-Vektorspeicher-Knoten<button data-href="#Introduction-to-n8n-and-the-Milvus-Vector-Store-Node" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://n8n.io/">n8n</a> ist eine leistungsstarke Open-Source-Plattform zur Workflow-Automatisierung, mit der Sie verschiedene Anwendungen, Dienste und APIs miteinander verbinden können, um automatisierte Workflows ohne Programmierung zu erstellen. Mit seiner knotenbasierten visuellen Schnittstelle ermöglicht n8n den Aufbau komplexer Automatisierungsprozesse durch einfaches Verbinden von Knoten, die verschiedene Dienste oder Aktionen darstellen. Es ist selbst-hostbar, hochgradig erweiterbar und unterstützt sowohl Fair-Code- als auch Enterprise-Lizenzen.</p>
<p>Der <strong>Milvus-Vektorspeicher-Knoten</strong> in n8n integriert <a href="https://milvus.io/">Milvus</a> in Ihre Automatisierungsabläufe. So können Sie semantische Suchen durchführen, RAG-Systeme (Retrieval-Augmented Generation) betreiben und intelligente KI-Anwendungen erstellen - alles innerhalb des n8n-Ökosystems.</p>
<p>Diese Dokumentation basiert hauptsächlich auf der offiziellen <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">n8n Milvus Vector Store-Dokumentation</a>. Sollten Sie veraltete oder inkonsistente Inhalte finden, bevorzugen Sie bitte die offizielle Dokumentation und zögern Sie nicht, uns ein Problem zu melden.</p>
<h2 id="Key-Features" class="common-anchor-header">Hauptmerkmale<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h2><p>Mit dem Milvus-Vektorspeicher-Knoten in n8n können Sie:</p>
<ul>
<li>Interaktion mit Ihrer Milvus-Datenbank als <a href="https://docs.n8n.io/glossary/#ai-vector-store">Vektorspeicher</a></li>
<li>Dokumente in Milvus einfügen</li>
<li>Dokumente aus Milvus abrufen</li>
<li>Dokumente abrufen, um sie einem mit einer <a href="https://docs.n8n.io/glossary/#ai-chain">Kette</a> verbundenen Retriever zur Verfügung zu stellen</li>
<li>sich direkt mit einem <a href="https://docs.n8n.io/glossary/#ai-agent">Agenten</a> als <a href="https://docs.n8n.io/glossary/#ai-tool">Werkzeug</a> verbinden</li>
<li>Dokumente auf der Grundlage von Metadaten filtern</li>
</ul>
<h2 id="Node-Usage-Patterns" class="common-anchor-header">Muster der Knotenverwendung<button data-href="#Node-Usage-Patterns" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können den Milvus-Vektorspeicher-Knoten in n8n nach den folgenden Mustern verwenden.</p>
<h3 id="Use-as-a-regular-node-to-insert-and-retrieve-documents" class="common-anchor-header">Verwendung als regulärer Knoten zum Einfügen und Abrufen von Dokumenten</h3><p>Sie können den Milvus-Vektor-Speicher als regulären Knoten verwenden, um Dokumente einzufügen oder abzurufen. Bei diesem Muster wird der Milvus-Vektorspeicher in den regulären Verbindungsfluss eingebunden, ohne dass ein Agent verwendet wird.</p>
<p>In dieser <a href="https://n8n.io/workflows/3573-create-a-rag-system-with-paul-essays-milvus-and-openai-for-cited-answers/">Beispielvorlage</a> sehen Sie, wie Sie ein System aufbauen, das Dokumente in Milvus speichert und abruft, um zitierte, chatbasierte Antworten zu unterstützen.</p>
<h3 id="Connect-directly-to-an-AI-agent-as-a-tool" class="common-anchor-header">Direkte Verbindung mit einem KI-Agenten als Werkzeug</h3><p>Sie können den Milvus-Vektorspeicher-Knoten direkt mit dem Tool-Connector eines <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/">KI-Agenten</a> verbinden, um einen Vektorspeicher als Ressource bei der Beantwortung von Anfragen zu verwenden.</p>
<p>Hier wäre die Verbindung wie folgt: AI-Agent (Werkzeugkonnektor) -&gt; Milvus-Vektorspeicher-Knoten. Siehe diese <a href="https://n8n.io/workflows/3576-paul-graham-essay-search-and-chat-with-milvus-vector-database/">Beispielvorlage</a>, bei der Daten in Milvus eingebettet und indiziert sind und der KI-Agent den Vektorspeicher als Wissenswerkzeug für die Beantwortung von Fragen verwendet.</p>
<h3 id="Use-a-retriever-to-fetch-documents" class="common-anchor-header">Verwenden Sie einen Retriever zum Abrufen von Dokumenten</h3><p>Sie können den <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievervectorstore/">Vektorspeicher-Retriever-Knoten</a> mit dem Milvus-Vektorspeicher-Knoten verwenden, um Dokumente aus dem Milvus-Vektorspeicher-Knoten abzurufen. Dies wird häufig mit dem <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa/">Frage- und Antwortkettenknoten</a> verwendet, um Dokumente aus dem Vektorspeicher zu holen, die der gegebenen Chateingabe entsprechen.</p>
<p>Ein typischer Knotenverbindungsfluss sieht wie folgt aus: Frage- und Antwortkette (Retriever-Verbindung) -&gt; Vektorspeicher Retriever (Vektorspeicher-Verbindung) -&gt; Milvus-Vektorspeicher.</p>
<p>Schauen Sie sich dieses <a href="https://n8n.io/workflows/3574-create-a-paul-graham-essay-qanda-system-with-openai-and-milvus-vector-database/">Workflow-Beispiel</a> an, um zu sehen, wie Sie externe Daten in Milvus aufnehmen und ein Chat-basiertes semantisches Q&amp;A-System aufbauen können.</p>
<h3 id="Use-the-Vector-Store-Question-Answer-Tool-to-answer-questions" class="common-anchor-header">Verwenden Sie das Vector Store Question Answer Tool, um Fragen zu beantworten</h3><p>Ein anderes Muster verwendet das <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore/">Vector Store Question Answer Tool</a>, um Ergebnisse zusammenzufassen und Fragen aus dem Milvus Vector Store-Knoten zu beantworten. Anstatt den Milvus-Vektorspeicher direkt als Werkzeug zu verbinden, verwendet dieses Muster ein Werkzeug, das speziell für die Zusammenfassung von Daten im Vektorspeicher entwickelt wurde.</p>
<p>Der Verbindungsfluss würde wie folgt aussehen: KI-Agent (Tools-Konnektor) -&gt; Vektorspeicher Frage-Antwort-Tool (Vektorspeicher-Konnektor) -&gt; Milvus-Vektorspeicher.</p>
<h2 id="Node-Operation-Modes" class="common-anchor-header">Betriebsmodi des Knotens<button data-href="#Node-Operation-Modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Milvus-Vektorspeicher-Knoten unterstützt mehrere Betriebsmodi, die jeweils auf unterschiedliche Workflow-Anwendungsfälle zugeschnitten sind. Das Verständnis dieser Modi hilft bei der Entwicklung effektiverer Arbeitsabläufe.</p>
<p>Im Folgenden geben wir einen Überblick über die verfügbaren Betriebsmodi und Optionen. Eine vollständige Liste der Eingabeparameter und Konfigurationsoptionen für jeden Modus finden Sie in der <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">offiziellen Dokumentation</a>.</p>
<hr>
<h3 id="Operation-Modes-Overview" class="common-anchor-header">Überblick über die Betriebsmodi</h3><p>Der Milvus-Vektorspeicher-Knoten unterstützt vier verschiedene Modi:</p>
<ul>
<li><strong>Viele abrufen</strong>: Abrufen mehrerer Dokumente auf der Grundlage der semantischen Ähnlichkeit mit einer Eingabeaufforderung.</li>
<li><strong>Dokumente einfügen</strong>: Fügen Sie neue Dokumente in Ihre Milvus-Sammlung ein.</li>
<li><strong>Dokumente abrufen (als Vektorspeicher für Kette/Tool)</strong>: Verwenden Sie den Knoten als Retriever innerhalb eines kettenbasierten Systems.</li>
<li><strong>Dokumente abrufen (als Tool für AI-Agent)</strong>: Verwenden Sie den Knoten als Tool-Ressource für einen KI-Agenten bei Frage-Antwort-Aufgaben.</li>
</ul>
<h3 id="Additional-Node-Options" class="common-anchor-header">Zusätzliche Knotenoptionen</h3><ul>
<li><strong>Metadatenfilter</strong> (nur im Modus Viele abrufen): Filtern Sie die Ergebnisse anhand von benutzerdefinierten Metadatenschlüsseln. Auf mehrere Felder wird eine UND-Bedingung angewendet.</li>
<li><strong>Sammlung löschen</strong> (nur im Modus Dokumente einfügen): Entfernen Sie vorhandene Dokumente aus der Sammlung, bevor Sie neue Dokumente einfügen.</li>
</ul>
<h3 id="Related-Resources" class="common-anchor-header">Verwandte Ressourcen</h3><ul>
<li><a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">n8n Milvus-Integrationsdokumentation</a></li>
<li><a href="https://js.langchain.com/docs/integrations/vectorstores/milvus/">LangChain Milvus-Dokumentation</a></li>
<li><a href="https://docs.n8n.io/advanced-ai/">n8n Erweiterte AI-Dokumentation</a></li>
</ul>
