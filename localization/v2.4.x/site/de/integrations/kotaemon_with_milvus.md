---
id: kotaemon_with_milvus.md
summary: >-
  Dieses Tutorial zeigt Ihnen, wie Sie Ihre kotaemon-Anwendung mit Milvus
  anpassen können.
title: Kotaemon RAG mit Milvus
---
<h1 id="Kotaemon-RAG-with-Milvus" class="common-anchor-header">Kotaemon RAG mit Milvus<button data-href="#Kotaemon-RAG-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/Cinnamon/kotaemon">Kotaemon</a> ist eine saubere und anpassbare Open-Source-RAG-Oberfläche zum Chatten mit Ihren Dokumenten. Es wurde sowohl für Endbenutzer als auch für Entwickler entwickelt.</p>
<p>Kotaemon bietet eine anpassbare, mehrbenutzerfähige QA-Web-UI für Dokumente, die lokale und API-basierte LLMs unterstützt. Es bietet eine hybride RAG-Pipeline mit Volltext- und Vektorrecherche, multimodale QA für Dokumente mit Abbildungen und Tabellen sowie erweiterte Zitierfunktionen mit Dokumentenvorschau. Es unterstützt komplexe Reasoning-Methoden wie ReAct und ReWOO und bietet konfigurierbare Einstellungen für Retrieval und Generierung.</p>
<p>Dieses Tutorial zeigt Ihnen, wie Sie Ihre kotaemon-Anwendung mit <a href="https://milvus.io/">Milvus</a> anpassen können.</p>
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
    </button></h2><h3 id="Installation" class="common-anchor-header">Installation</h3><p>Wir empfehlen, kotaemon auf diese Weise zu installieren:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># optional (setup env)</span>
conda create -n kotaemon python=3.10
conda activate kotaemon

git <span class="hljs-built_in">clone</span> https://github.com/Cinnamon/kotaemon
<span class="hljs-built_in">cd</span> kotaemon

pip install -e <span class="hljs-string">&quot;libs/kotaemon[all]&quot;</span>
pip install -e <span class="hljs-string">&quot;libs/ktem&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Neben diesem Weg gibt es noch einige andere Möglichkeiten, kotaemon zu installieren. Sie können die <a href="https://github.com/Cinnamon/kotaemon?tab=readme-ov-file#installation">offizielle Dokumentation</a> für weitere Details konsultieren.</p>
<h3 id="Set-Milvus-as-the-default-vector-storage" class="common-anchor-header">Milvus als Standard-Vektorspeicher einstellen</h3><p>Um den Standard-Vektorspeicher auf Milvus umzustellen, müssen Sie die Datei <code translate="no">flowsettings.py</code> ändern, indem Sie <code translate="no">KH_VECTORSTORE</code> auf umstellen:</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;__type__&quot;</span>: <span class="hljs-string">&quot;kotaemon.storages.MilvusVectorStore&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-Environment-Variables" class="common-anchor-header">Umgebungsvariablen setzen</h3><p>können Sie die Modelle über die Datei <code translate="no">.env</code> mit den Informationen konfigurieren, die für die Verbindung zu den LLMs und Einbettungsmodellen benötigt werden. z.B. OpenAI, Azure, Ollama, etc.</p>
<h3 id="Run-Kotaemon" class="common-anchor-header">Kotaemon ausführen</h3><p>Nach dem Einrichten der Umgebungsvariablen und dem Ändern des Vektorspeichers können Sie kotaemon mit dem folgenden Befehl starten:</p>
<pre><code translate="no" class="language-shell">python app.py
<button class="copy-code-btn"></button></code></pre>
<p>Standard-Benutzername/Passwort sind: <code translate="no">admin</code> / <code translate="no">admin</code></p>
<h2 id="Start-RAG-with-kotaemon" class="common-anchor-header">RAG mit kotaemon starten<button data-href="#Start-RAG-with-kotaemon" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Add-your-AI-models" class="common-anchor-header">1. Fügen Sie Ihre KI-Modelle hinzu</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/kotaemon_1.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Auf der Registerkarte <code translate="no">Resources</code> können Sie Ihre LLMs und Einbettungsmodelle hinzufügen und einstellen. Sie können mehrere Modelle hinzufügen und sie als aktiv oder inaktiv festlegen. Sie müssen nur mindestens ein Modell angeben. Sie können auch mehrere Modelle angeben, um zwischen ihnen wechseln zu können.</p>
<h3 id="2-Upload-your-documents" class="common-anchor-header">2. Hochladen Ihrer Dokumente</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/kotaemon_2.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Um Ihre Dokumente einer Qualitätskontrolle zu unterziehen, müssen Sie sie zunächst in die Anwendung hochladen. Wechseln Sie zur Registerkarte <code translate="no">File Index</code>, um Ihre benutzerdefinierten Dokumente hochzuladen und zu verwalten.</p>
<p>Standardmäßig werden alle Anwendungsdaten im Ordner <code translate="no">./ktem_app_data</code> gespeichert. Die Daten der Milvus-Datenbank werden in <code translate="no">./ktem_app_data/user_data/vectorstore</code> gespeichert. Sie können diesen Ordner sichern oder kopieren, um Ihre Installation auf einen neuen Rechner zu übertragen.</p>
<h3 id="3-Chat-with-your-documents" class="common-anchor-header">3. Chatten Sie mit Ihren Dokumenten</h3><p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/kotaemon_3.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Navigieren Sie nun zurück zur Registerkarte <code translate="no">Chat</code>. Die Registerkarte "Chat" besteht aus drei Bereichen: dem Bereich "Konversationseinstellungen", in dem Sie Konversationen und Dateiverweise verwalten; dem Bereich "Chat" für die Interaktion mit dem Chatbot; und dem Bereich "Informationen", in dem unterstützende Belege, Vertrauenswerte und Relevanzbewertungen für Antworten angezeigt werden.</p>
<p>Sie können Ihre Dokumente im Konversationseinstellungspanel auswählen. Starten Sie RAG dann einfach mit Ihren Dokumenten, indem Sie eine Nachricht in das Eingabefeld eingeben und an den Chatbot senden.</p>
<p>Wenn Sie tiefer in die Verwendung von kotaemon eintauchen möchten, können Sie eine vollständige Anleitung in der <a href="https://cinnamon.github.io/kotaemon/usage/">offiziellen Dokumentation</a> erhalten.</p>
