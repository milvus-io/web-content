---
id: rag_with_langflow.md
summary: >-
  Dieser Leitfaden zeigt, wie man Langflow verwendet, um eine
  Retrieval-Augmented Generation (RAG) Pipeline mit Milvus aufzubauen.
title: Aufbau eines RAG-Systems mit Langflow und Milvus
---
<h1 id="Building-a-RAG-System-Using-Langflow-with-Milvus" class="common-anchor-header">Aufbau eines RAG-Systems mit Langflow und Milvus<button data-href="#Building-a-RAG-System-Using-Langflow-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Dieser Leitfaden zeigt, wie man <a href="https://www.langflow.org/">Langflow</a> verwendet, um eine Retrieval-Augmented Generation (RAG) Pipeline mit <a href="https://milvus.io/">Milvus</a> zu erstellen.</p>
<p>Das RAG-System verbessert die Texterzeugung, indem es zunächst relevante Dokumente aus einer Wissensbasis abruft und dann auf der Grundlage dieses Kontexts neue Antworten generiert. Milvus wird verwendet, um Texteinbettungen zu speichern und abzurufen, während Langflow die Integration von Abruf und Generierung in einen visuellen Workflow erleichtert.</p>
<p>Langflow ermöglicht den einfachen Aufbau von RAG-Pipelines, bei denen Textabschnitte eingebettet, in Milvus gespeichert und bei relevanten Abfragen abgerufen werden. So kann das Sprachmodell kontextbezogene Antworten generieren.</p>
<p>Milvus dient als skalierbare Vektordatenbank, die schnell semantisch ähnlichen Text findet, während Langflow es Ihnen ermöglicht, zu verwalten, wie Ihre Pipeline den Textabruf und die Generierung von Antworten handhabt. Zusammen bieten sie eine effiziente Möglichkeit, eine robuste RAG-Pipeline für erweiterte textbasierte Anwendungen zu erstellen.</p>
<h2 id="Prerequisites" class="common-anchor-header">Voraussetzungen<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Vergewissern Sie sich, dass Sie die folgenden Abhängigkeiten installiert haben, bevor Sie dieses Notizbuch ausführen:</p>
<pre><code translate="no" class="language-shell">$ python -m pip install langflow -U
<button class="copy-code-btn"></button></code></pre>
<h2 id="Tutorial" class="common-anchor-header">Tutorial<button data-href="#Tutorial" class="anchor-icon" translate="no">
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
    </button></h2><p>Sobald alle Abhängigkeiten installiert sind, starten Sie ein Langflow-Dashboard, indem Sie den folgenden Befehl eingeben:</p>
<pre><code translate="no" class="language-shell">$ python -m langflow run
<button class="copy-code-btn"></button></code></pre>
<p>Daraufhin öffnet sich ein Dashboard wie unten gezeigt: <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/langflow_dashboard_start.png" alt="langflow" class="doc-image" id="langflow" /><span>langflow</span> </span></p>
<p>Wir wollen ein <strong>Vector Store</strong> Projekt erstellen, also müssen wir zuerst auf die Schaltfläche <strong>Neues Projekt</strong> klicken. Es öffnet sich ein Fenster, in dem wir die Option <strong>Vector Store RAG</strong> auswählen: <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/langflow_dashboard_new_project.png" alt="panel" class="doc-image" id="panel" /><span>panel</span> </span></p>
<p>Sobald das Vector Store Rag-Projekt erfolgreich erstellt wurde, ist der Standard-Vektorspeicher AstraDB, während wir Milvus verwenden möchten. Also müssen wir diese beiden astraDB-Module durch Milvus ersetzen, um Milvus als Vektorspeicher zu verwenden. <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/langflow_default_structure.png" alt="astraDB" class="doc-image" id="astradb" /><span>astraDB</span> </span></p>
<h3 id="Steps-to-replace-astraDB-with-Milvus" class="common-anchor-header">Schritte zum Ersetzen von astraDB durch Milvus:</h3><ol>
<li>Entfernen Sie die vorhandenen Karten des Vektorspeichers. Klicken Sie auf zwei AstraDB-Karten, die im obigen Bild rot markiert sind, und drücken Sie die <strong>Rücktaste</strong>, um sie zu löschen.</li>
<li>Klicken Sie auf die Option <strong>Vector Store</strong> in der Seitenleiste, wählen Sie Milvus und ziehen Sie es in den Canvas. Tun Sie dies zweimal, da wir 2 Milvus-Karten benötigen, eine für die Speicherung des Dateiverarbeitungs-Workflows und eine für den Such-Workflow.</li>
<li>Verknüpfen Sie die Milvus-Module mit den übrigen Komponenten. Siehe das Bild unten als Referenz.</li>
<li>Konfigurieren Sie die Milvus-Anmeldeinformationen für beide Milvus-Module. Am einfachsten ist es, Milvus Lite zu verwenden, indem Sie den Connection URI auf milvus_demo.db setzen. Wenn Sie einen Milvus-Server im Eigenbetrieb oder in der Zilliz-Cloud haben, setzen Sie die Connection URI auf den Server-Endpunkt und das Connection Password auf den Token (für Milvus ist das die Verkettung &quot;<username>:<password>&quot;, für die Zilliz-Cloud ist es der API-Schlüssel). Siehe Bild unten als Referenz:</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/langflow_milvus_structure.png" alt="Milvus Structure demo" class="doc-image" id="milvus-structure-demo" />
   </span> <span class="img-wrapper"> <span>Milvus Struktur Demo</span> </span></p>
<h3 id="Embed-knowledge-into-the-RAG-system" class="common-anchor-header">Wissen in das RAG-System einbinden</h3><ol>
<li>Laden Sie eine Datei als LLM-Wissensbasis über das Dateimodul unten links hoch. Hier haben wir eine Datei hochgeladen, die eine kurze Einführung in Milvus enthält.</li>
<li>Starten Sie den Einfüge-Workflow, indem Sie auf die Schaltfläche "Ausführen" im Milvus-Modul unten rechts klicken. Dadurch wird das Wissen in den Milvus-Vektorspeicher eingefügt.</li>
<li>Testen Sie, ob das Wissen im Speicher ist. Öffnen Sie die Spielwiese und stellen Sie Fragen zu der hochgeladenen Datei.</li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/langflow_why_milvus.png" alt="why milvus" class="doc-image" id="why-milvus" />
   </span> <span class="img-wrapper"> <span>warum Milvus</span> </span></p>
