---
id: integrate_with_airbyte.md
summary: >-
  Airbyte ist eine Open-Source-Infrastruktur für die Datenverschiebung zum
  Aufbau von Datenpipelines für das Extrahieren und Laden (EL). Sie ist auf
  Vielseitigkeit, Skalierbarkeit und Benutzerfreundlichkeit ausgelegt. Der
  Konnektorkatalog von Airbyte enthält mehr als 350 vorkonfigurierte
  Konnektoren. Mit diesen Konnektoren kann die Replikation von Daten von einer
  Quelle zu einem Ziel in nur wenigen Minuten beginnen.
title: 'Airbyte: Open-Source-Infrastruktur für den Datenverkehr'
---
<h1 id="Airbyte-Open-Source-Data-Movement-Infrastructure" class="common-anchor-header">Airbyte: Open-Source-Infrastruktur für die Datenübertragung<button data-href="#Airbyte-Open-Source-Data-Movement-Infrastructure" class="anchor-icon" translate="no">
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
    </button></h1><p>Airbyte ist eine Open-Source-Infrastruktur für die Datenübertragung zum Aufbau von Extraktions- und Ladepipelines (EL). Sie ist auf Vielseitigkeit, Skalierbarkeit und Benutzerfreundlichkeit ausgelegt. Der Konnektorkatalog von Airbyte enthält mehr als 350 vorkonfigurierte Konnektoren. Mit diesen Konnektoren kann die Replikation von Daten von einer Quelle zu einem Ziel in nur wenigen Minuten beginnen.</p>
<h2 id="Major-Components-of-Airbyte" class="common-anchor-header">Die wichtigsten Komponenten von Airbyte<button data-href="#Major-Components-of-Airbyte" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Connector-Catalog" class="common-anchor-header">1. Konnektor-Katalog</h3><ul>
<li><strong>Über 350 vorgefertigte Konnektoren</strong>: Der Konnektorkatalog von Airbyte enthält mehr als 350 vorkonfigurierte Konnektoren. Mit diesen Konnektoren können Sie in wenigen Minuten mit der Replikation von Daten von einer Quelle zu einem Ziel beginnen.</li>
<li><strong>No-Code Connector Builder</strong>: Mit Hilfe von Tools <a href="https://docs.airbyte.com/connector-development/connector-builder-ui/overview">wie dem No-Code Connector Builder</a> können Sie die Funktionalität von Airbyte ganz einfach erweitern, um Ihre eigenen Anwendungsfälle zu unterstützen.</li>
</ul>
<h3 id="2-The-Platform" class="common-anchor-header">2. Die Plattform</h3><p>Die Plattform von Airbyte bietet alle horizontalen Dienste, die für die Konfiguration und Skalierung von Datenverschiebungsvorgängen erforderlich sind, und ist als <a href="https://airbyte.com/product/airbyte-cloud">Cloud-Managed</a> oder <a href="https://airbyte.com/product/airbyte-enterprise">Self-Managed</a> verfügbar.</p>
<h3 id="3-The-User-Interface" class="common-anchor-header">3. Die Benutzeroberfläche</h3><p>Airbyte verfügt über eine Benutzeroberfläche, <a href="https://docs.airbyte.com/using-airbyte/pyairbyte/getting-started">PyAirbyte</a> (Python-Bibliothek), eine <a href="https://docs.airbyte.com/api-documentation">API</a> und einen <a href="https://docs.airbyte.com/terraform-documentation">Terraform-Provider</a> zur Integration mit den von Ihnen bevorzugten Werkzeugen und Ansätzen für das Infrastrukturmanagement.</p>
<p>Mit der Fähigkeit von Airbyte können Benutzer Datenquellen in Milvus-Cluster für die Ähnlichkeitssuche integrieren.</p>
<h2 id="Before-You-Begin" class="common-anchor-header">Bevor Sie beginnen<button data-href="#Before-You-Begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie benötigen:</p>
<ul>
<li>Zendesk-Konto (oder eine andere Datenquelle, mit der Sie Daten synchronisieren möchten)</li>
<li>Airbyte-Konto oder lokale Instanz</li>
<li>OpenAI-API-Schlüssel</li>
<li>Milvus-Cluster</li>
<li>Lokal installiertes Python 3.10</li>
</ul>
<h2 id="Set-Up-Milvus-Cluster" class="common-anchor-header">Milvus-Cluster einrichten<button data-href="#Set-Up-Milvus-Cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Wenn Sie bereits einen K8s-Cluster für die Produktion eingerichtet haben, können Sie diesen Schritt überspringen und direkt mit der <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus-Operator">Einrichtung von Milvus Operator</a> fortfahren. Falls nicht, können Sie <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Create-a-K8s-Cluster">den Schritten</a> zur Einrichtung eines Milvus-Clusters mit Milvus Operator folgen.</p>
<p>Einzelne Entitäten (in unserem Fall Support-Tickets und Knowledge-Base-Artikel) werden in einer "Sammlung" gespeichert - nachdem Ihr Cluster eingerichtet ist, müssen Sie eine Sammlung erstellen. Wählen Sie einen geeigneten Namen und setzen Sie die Dimension auf 1536, um die vom OpenAI Embeddings Service generierte Vektordimensionalität zu erreichen.</p>
<p>Tragen Sie nach der Erstellung den Endpunkt und die <a href="https://milvus.io/docs/authenticate.md?tab=docker">Authentifizierungsdaten</a> ein.</p>
<h2 id="Set-Up-Connection-in-Airbyte" class="common-anchor-header">Einrichten der Verbindung in Airbyte<button data-href="#Set-Up-Connection-in-Airbyte" class="anchor-icon" translate="no">
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
    </button></h2><p>Unsere Datenbank ist fertig, jetzt können wir einige Daten übertragen! Zu diesem Zweck müssen wir eine Verbindung in Airbyte konfigurieren. Melden Sie sich entweder für ein Airbyte-Cloud-Konto unter <a href="https://cloud.airbyte.com">cloud.airbyte.com</a> an oder richten Sie eine lokale Instanz ein, wie <a href="https://docs.airbyte.com/using-airbyte/getting-started/">in der Dokumentation</a> beschrieben.</p>
<h3 id="Set-Up-Source" class="common-anchor-header">Quelle einrichten</h3><p>Sobald Ihre Instanz läuft, müssen wir die Verbindung einrichten - klicken Sie auf "Neue Verbindung" und wählen Sie den Connector "Zendesk Support" als Quelle. Nachdem Sie auf die Schaltfläche "Testen und Speichern" geklickt haben, prüft Airbyte, ob die Verbindung hergestellt werden kann.</p>
<p>In der Airbyte-Cloud können Sie sich ganz einfach authentifizieren, indem Sie auf die Schaltfläche "Authentifizieren" klicken. Wenn Sie eine lokale Airbyte-Instanz verwenden, folgen Sie den Anweisungen auf der <a href="https://docs.airbyte.com/integrations/sources/zendesk-support#airbyte-open-source-enable-api-token-access-and-generate-a-token">Dokumentationsseite</a>.</p>
<h3 id="Set-Up-Destination" class="common-anchor-header">Ziel einrichten</h3><p>Wenn alles korrekt funktioniert, ist der nächste Schritt die Einrichtung des Ziels, zu dem die Daten verschoben werden sollen. Wählen Sie hier den "Milvus"-Konnektor.</p>
<p>Der Milvus-Konnektor erfüllt drei Aufgaben:</p>
<ul>
<li><strong>Chunking und Formatierung</strong> - Aufteilung der Zendesk-Datensätze in Text und Metadaten. Wenn der Text größer als die angegebene Chunk-Größe ist, werden die Datensätze in mehrere Teile aufgeteilt, die einzeln in die Sammlung geladen werden. Die Aufteilung von Text (oder Chunking) kann zum Beispiel bei umfangreichen Support-Tickets oder Wissensartikeln erfolgen. Durch die Aufteilung des Textes können Sie sicherstellen, dass die Suche immer nützliche Ergebnisse liefert.</li>
</ul>
<p>Nehmen wir eine Chunk-Größe von 1000 Token und die Textfelder body, title, description und subject, da diese in den Daten, die wir von Zendesk erhalten, vorhanden sein werden.</p>
<ul>
<li><strong>Einbettung</strong> - Mithilfe von Modellen für maschinelles Lernen werden die vom Verarbeitungsteil erzeugten Textabschnitte in Vektoreinbettungen umgewandelt, die Sie dann nach semantischer Ähnlichkeit durchsuchen können. Um die Einbettungen zu erstellen, müssen Sie den OpenAI-API-Schlüssel angeben. Airbyte sendet jeden Chunk an OpenAI und fügt den resultierenden Vektor zu den Entitäten hinzu, die in Ihren Milvus-Cluster geladen wurden.</li>
<li><strong>Indexierung</strong> - Sobald Sie die Chunks vektorisiert haben, können Sie sie in die Datenbank laden. Geben Sie dazu die Informationen ein, die Sie beim Einrichten Ihres Clusters und Ihrer Sammlung in Milvus Cluster erhalten haben. <div><img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/airbyte_with_milvus_1.png" width="40%"/></div> Wenn Sie auf "Testen und speichern" klicken, wird geprüft, ob alles richtig eingestellt ist (gültige Anmeldeinformationen, die Sammlung existiert und hat die gleiche Vektordimensionalität wie die konfigurierte Einbettung usw.)</li>
</ul>
<h3 id="Set-up-stream-sync-flow" class="common-anchor-header">Stream-Synchronisierungsfluss einrichten</h3><p>Der letzte Schritt, bevor die Daten fließen können, ist die Auswahl der zu synchronisierenden "Streams". Ein Stream ist eine Sammlung von Datensätzen in der Quelle. Da Zendesk eine große Anzahl von Streams unterstützt, die für unseren Anwendungsfall nicht relevant sind, wählen wir nur "Tickets" und "Artikel" aus und deaktivieren alle anderen, um Bandbreite zu sparen und sicherzustellen, dass nur die relevanten Informationen bei der Suche angezeigt werden:<div><img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/airbyte_with_milvus_2.png" width="40%"/></div> Sie können auswählen, welche Felder aus der Quelle extrahiert werden sollen, indem Sie auf den Streamnamen klicken. Der Synchronisationsmodus "Inkrementell | Append + Deduped" bedeutet, dass bei nachfolgenden Verbindungsläufen Zendesk und Milvus synchron gehalten werden, wobei nur minimale Daten übertragen werden (nur die Artikel und Tickets, die sich seit dem letzten Lauf geändert haben).</p>
<p>Sobald die Verbindung hergestellt ist, beginnt Airbyte mit der Synchronisierung der Daten. Es kann ein paar Minuten dauern, bis sie in Ihrer Milvus-Sammlung erscheinen.</p>
<p>Wenn Sie eine Replikationsfrequenz auswählen, wird Airbyte regelmäßig ausgeführt, um Ihre Milvus-Sammlung mit Änderungen an Zendesk-Artikeln und neu erstellten Tickets auf dem neuesten Stand zu halten.</p>
<h3 id="Check-flow" class="common-anchor-header">Ablauf prüfen</h3><p>Sie können in der Milvus-Cluster-Benutzeroberfläche überprüfen, wie die Daten in der Sammlung strukturiert sind, indem Sie zur Spielwiese navigieren und eine "Query Data"-Abfrage mit einem auf "_ab_stream == \"tickets\"" gesetzten Filter ausführen.<div><img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/airbyte_with_milvus_3.png" width="40%"/></div> Wie Sie in der Ergebnisansicht sehen können, wird jeder Datensatz, der von Zendesk kommt, als separate Entität in Milvus mit allen angegebenen Metadaten gespeichert. Der Textchunk, auf dem die Einbettung basiert, wird als Eigenschaft "text" angezeigt - dies ist der Text, der mit OpenAI eingebettet wurde und nach dem wir suchen werden.</p>
<h2 id="Build-Streamlit-app-querying-the-collection" class="common-anchor-header">Erstellen einer Streamlit-App zur Abfrage der Sammlung<button data-href="#Build-Streamlit-app-querying-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Unsere Daten sind fertig - jetzt müssen wir die Anwendung erstellen, die sie nutzen soll. In diesem Fall wird die Anwendung ein einfaches Support-Formular sein, mit dem Benutzer Support-Fälle einreichen können. Wenn der Benutzer auf "Senden" klickt, werden wir zwei Dinge tun:</p>
<ul>
<li>Suche nach ähnlichen Anfragen, die von Benutzern der gleichen Organisation eingereicht wurden</li>
<li>Suche nach wissensbasierten Artikeln, die für den Benutzer relevant sein könnten</li>
</ul>
<p>In beiden Fällen werden wir die semantische Suche mit OpenAI-Einbettungen nutzen. Zu diesem Zweck wird die Beschreibung des vom Benutzer eingegebenen Problems ebenfalls eingebettet und verwendet, um ähnliche Entitäten aus dem Milvus-Cluster zu finden. Wenn es relevante Ergebnisse gibt, werden diese unterhalb des Formulars angezeigt.</p>
<h3 id="Set-up-UI-environment" class="common-anchor-header">Einrichten der UI-Umgebung</h3><p>Sie benötigen eine lokale Python-Installation, da wir Streamlit zur Implementierung der Anwendung verwenden werden.</p>
<p>Installieren Sie zunächst Streamlit, die Milvus-Client-Bibliothek und die OpenAI-Client-Bibliothek lokal:</p>
<pre><code translate="no" class="language-shell">pip install streamlit pymilvus openai
<button class="copy-code-btn"></button></code></pre>
<p>Um ein einfaches Unterstützungsformular zu rendern, erstellen Sie eine Python-Datei <code translate="no">basic_support_form.py</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> streamlit <span class="hljs-keyword">as</span> st

<span class="hljs-keyword">with</span> st.form(<span class="hljs-string">&quot;my_form&quot;</span>):
    st.write(<span class="hljs-string">&quot;Submit a support case&quot;</span>)
    text_val = st.text_area(<span class="hljs-string">&quot;Describe your problem&quot;</span>)

    submitted = st.form_submit_button(<span class="hljs-string">&quot;Submit&quot;</span>)
    <span class="hljs-keyword">if</span> submitted:
        <span class="hljs-comment"># TODO check for related support cases and articles</span>
        st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Um Ihre Anwendung auszuführen, verwenden Sie Streamlit run:</p>
<pre><code translate="no" class="language-shell">streamlit run basic_support_form.py
<button class="copy-code-btn"></button></code></pre>
<p>Dadurch wird ein einfaches Formular gerendert:<div><img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/airbyte_with_milvus_4.png" width="40%"/></div>Der Code für dieses Beispiel kann auch auf <a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/1_basic_support_form.py">GitHub</a> gefunden werden.</p>
<h3 id="Set-up-backend-query-service" class="common-anchor-header">Backend-Abfragedienst einrichten</h3><p>Als Nächstes wollen wir nach bestehenden offenen Tickets suchen, die relevant sein könnten. Dazu betten wir den Text ein, den der Benutzer mit OpenAI eingegeben hat, und führen dann eine Ähnlichkeitssuche in unserer Sammlung durch, wobei wir nach noch offenen Tickets filtern. Wenn es eines gibt, bei dem der Abstand zwischen dem eingegebenen Ticket und dem bestehenden Ticket sehr gering ist, wird der Benutzer darauf hingewiesen und das Ticket nicht abgeschickt:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> streamlit <span class="hljs-keyword">as</span> st
<span class="hljs-keyword">import</span> os
<span class="hljs-keyword">import</span> pymilvus
<span class="hljs-keyword">import</span> openai


<span class="hljs-keyword">with</span> st.form(<span class="hljs-string">&quot;my_form&quot;</span>):
    st.write(<span class="hljs-string">&quot;Submit a support case&quot;</span>)
    text_val = st.text_area(<span class="hljs-string">&quot;Describe your problem?&quot;</span>)

    submitted = st.form_submit_button(<span class="hljs-string">&quot;Submit&quot;</span>)
    <span class="hljs-keyword">if</span> submitted:
        <span class="hljs-keyword">import</span> os
        <span class="hljs-keyword">import</span> pymilvus
        <span class="hljs-keyword">import</span> openai

        org_id = <span class="hljs-number">360033549136</span> <span class="hljs-comment"># TODO Load from customer login data</span>

        pymilvus.connections.connect(uri=os.environ[<span class="hljs-string">&quot;MILVUS_URL&quot;</span>], token=os.environ[<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>])
        collection = pymilvus.Collection(<span class="hljs-string">&quot;zendesk&quot;</span>)

        embedding = openai.Embedding.create(<span class="hljs-built_in">input</span>=text_val, model=<span class="hljs-string">&quot;text-embedding-ada-002&quot;</span>)[<span class="hljs-string">&#x27;data&#x27;</span>][<span class="hljs-number">0</span>][<span class="hljs-string">&#x27;embedding&#x27;</span>]

        results = collection.search(data=[embedding], anns_field=<span class="hljs-string">&quot;vector&quot;</span>, param={}, limit=<span class="hljs-number">2</span>, output_fields=[<span class="hljs-string">&quot;_id&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>, <span class="hljs-string">&quot;description&quot;</span>], expr=<span class="hljs-string">f&#x27;status == &quot;new&quot; and organization_id == <span class="hljs-subst">{org_id}</span>&#x27;</span>)

        st.write(results[<span class="hljs-number">0</span>])
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(results[<span class="hljs-number">0</span>]) &gt; <span class="hljs-number">0</span> <span class="hljs-keyword">and</span> results[<span class="hljs-number">0</span>].distances[<span class="hljs-number">0</span>] &lt; <span class="hljs-number">0.35</span>:
            matching_ticket = results[<span class="hljs-number">0</span>][<span class="hljs-number">0</span>].entity
            st.write(<span class="hljs-string">f&quot;This case seems very similar to <span class="hljs-subst">{matching_ticket.get(<span class="hljs-string">&#x27;subject&#x27;</span>)}</span> (id #<span class="hljs-subst">{matching_ticket.get(<span class="hljs-string">&#x27;_id&#x27;</span>)}</span>). Make sure it has not been submitted before&quot;</span>)
        <span class="hljs-keyword">else</span>:
            st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)
            
<button class="copy-code-btn"></button></code></pre>
<p>Hier geschehen mehrere Dinge:</p>
<ul>
<li>Die Verbindung zum Milvus-Cluster wird aufgebaut.</li>
<li>Der OpenAI-Dienst wird verwendet, um eine Einbettung der vom Benutzer eingegebenen Beschreibung zu erstellen.</li>
<li>Es wird eine Ähnlichkeitssuche durchgeführt, wobei die Ergebnisse nach dem Ticketstatus und der Organisations-ID gefiltert werden (da nur offene Tickets derselben Organisation relevant sind).</li>
<li>Wenn es Ergebnisse gibt und der Abstand zwischen den Einbettungsvektoren des bestehenden Tickets und des neu eingegebenen Textes unter einem bestimmten Schwellenwert liegt, wird diese Tatsache angezeigt.</li>
</ul>
<p>Um die neue App zu starten, müssen Sie zunächst die Umgebungsvariablen für OpenAI und Milvus setzen:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">export</span> <span class="hljs-variable constant_">MILVUS_TOKEN</span>=...
<span class="hljs-keyword">export</span> <span class="hljs-variable constant_">MILVUS_URL</span>=<span class="hljs-attr">https</span>:<span class="hljs-comment">//...</span>
<span class="hljs-keyword">export</span> <span class="hljs-variable constant_">OPENAI_API_KEY</span>=sk-...

streamlit run app.<span class="hljs-property">py</span>
<button class="copy-code-btn"></button></code></pre>
<p>Wenn Sie versuchen, ein bereits bestehendes Ticket einzureichen, sieht das Ergebnis so aus:<div><img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/airbyte_with_milvus_5.png" width="40%"/></div> Der Code für dieses Beispiel ist ebenfalls auf <a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/2_open_ticket_check.py">GitHub</a> zu finden.</p>
<h3 id="Show-more-relevant-information" class="common-anchor-header">Weitere relevante Informationen anzeigen</h3><p>Wie Sie in der grünen Debug-Ausgabe sehen können, die in der endgültigen Version verborgen ist, entsprachen zwei Tickets unserer Suche (im Status "neu", von der aktuellen Organisation und in der Nähe des Einbettungsvektors). Das erste (relevante) Ticket wurde jedoch höher eingestuft als das zweite (in dieser Situation irrelevant), was sich im niedrigeren Abstandswert widerspiegelt. Diese Beziehung wird in den Einbettungsvektoren erfasst, ohne dass die Wörter direkt miteinander verglichen werden, wie bei einer normalen Volltextsuche.</p>
<p>Um das Ganze abzurunden, sollten wir hilfreiche Informationen anzeigen, nachdem das Ticket eingereicht wurde, um dem Benutzer so viele relevante Informationen wie möglich im Voraus zu geben.</p>
<p>Zu diesem Zweck führen wir eine zweite Suche durch, nachdem das Ticket eingereicht wurde, um die am besten übereinstimmenden Artikel der Wissensdatenbank abzurufen:</p>
<pre><code translate="no" class="language-python">   ......
   
        <span class="hljs-keyword">else</span>:
            <span class="hljs-comment"># TODO Actually send out the ticket</span>
            st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)
            article_results = collection.search(data=[embedding], anns_field=<span class="hljs-string">&quot;vector&quot;</span>, param={}, limit=<span class="hljs-number">5</span>, output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;html_url&quot;</span>], expr=<span class="hljs-string">f&#x27;_ab_stream == &quot;articles&quot;&#x27;</span>)
            st.write(article_results[<span class="hljs-number">0</span>])
            <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(article_results[<span class="hljs-number">0</span>]) &gt; <span class="hljs-number">0</span>:
                st.write(<span class="hljs-string">&quot;We also found some articles that might help you:&quot;</span>)
                <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> article_results[<span class="hljs-number">0</span>]:
                    <span class="hljs-keyword">if</span> hit.distance &lt; <span class="hljs-number">0.362</span>:
                        st.write(<span class="hljs-string">f&quot;* [<span class="hljs-subst">{hit.entity.get(<span class="hljs-string">&#x27;title&#x27;</span>)}</span>](<span class="hljs-subst">{hit.entity.get(<span class="hljs-string">&#x27;html_url&#x27;</span>)}</span>)&quot;</span>)

<button class="copy-code-btn"></button></code></pre>
<p>Wenn es kein offenes Support-Ticket mit einer hohen Ähnlichkeitsbewertung gibt, wird das neue Ticket eingereicht und die relevanten Wissensartikel werden unten angezeigt:<div><img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/airbyte_with_milvus_6.png" width="40%"/></div> Der Code für dieses Beispiel ist ebenfalls auf <a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/3_relevant_articles.py">Github</a> zu finden.</p>
<h2 id="Conclusion" class="common-anchor-header">Fazit<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Auch wenn die hier gezeigte Benutzeroberfläche kein tatsächliches Support-Formular ist, sondern nur ein Beispiel zur Veranschaulichung des Anwendungsfalls, ist die Kombination von Airbyte und Milvus sehr leistungsfähig - sie macht es einfach, Text aus einer Vielzahl von Quellen zu laden (von Datenbanken wie Postgres über APIs wie Zendesk oder GitHub bis hin zu vollständig benutzerdefinierten Quellen, die mit dem SDK von Airbyte oder dem Visual Connector Builder erstellt wurden) und ihn in eingebetteter Form in Milvus zu indizieren, einer leistungsstarken Vektorsuchmaschine, die auf große Datenmengen skalieren kann.</p>
<p>Airbyte und Milvus sind quelloffen und können völlig kostenlos in Ihrer Infrastruktur eingesetzt werden, mit Cloud-Angeboten zur Auslagerung von Operationen, falls gewünscht.</p>
<p>Neben dem klassischen Anwendungsfall der semantischen Suche, der in diesem Artikel dargestellt wird, kann das allgemeine Setup auch für den Aufbau eines Chatbots zur Beantwortung von Fragen nach der RAG-Methode (Retrieval Augmented Generation), für Empfehlungssysteme oder für die Verbesserung der Relevanz und Effizienz von Werbung verwendet werden.</p>
