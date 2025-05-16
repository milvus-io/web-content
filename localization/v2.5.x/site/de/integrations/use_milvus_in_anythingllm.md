---
id: use_milvus_in_anythingllm.md
summary: >-
  Dieser Leitfaden führt Sie durch die Konfiguration von Milvus als
  Vektordatenbank in AnythingLLM, die es Ihnen ermöglicht, Ihre Dokumente
  einzubetten, zu speichern und zu durchsuchen, um sie auf intelligente Weise
  abzurufen und zu chatten.
title: Milvus in AnythingLLM verwenden
---
<h1 id="Use-Milvus-in-AnythingLLM" class="common-anchor-header">Milvus in AnythingLLM verwenden<button data-href="#Use-Milvus-in-AnythingLLM" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://anythingllm.com/">AnythingLLM</a> ist eine leistungsstarke, auf Datenschutz ausgerichtete KI-Desktop-Anwendung, die verschiedene LLMs, Dokumenttypen und Vektordatenbanken unterstützt. Sie ermöglicht es Ihnen, einen privaten, ChatGPT-ähnlichen Assistenten zu erstellen, der lokal ausgeführt oder aus der Ferne gehostet werden kann und es Ihnen ermöglicht, intelligent mit allen von Ihnen bereitgestellten Dokumenten zu chatten.</p>
<p>Diese Anleitung führt Sie durch die Konfiguration von Milvus als Vektordatenbank in AnythingLLM, die es Ihnen ermöglicht, Ihre Dokumente einzubetten, zu speichern und zu durchsuchen, um sie intelligent abzurufen und zu chatten.</p>
<blockquote>
<p>Diese Anleitung basiert auf der offiziellen AnythingLLM-Dokumentation und den realen Nutzungsschritten. Sollte sich die Benutzeroberfläche oder die Schritte ändern, beziehen Sie sich bitte auf die neuesten offiziellen Dokumente und machen Sie Verbesserungsvorschläge.</p>
</blockquote>
<hr>
<h2 id="1-Prerequisites" class="common-anchor-header">1. Voraussetzungen<button data-href="#1-Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><a href="https://milvus.io/docs/install-overview.md">Milvus</a> lokal installiert oder ein <a href="https://zilliz.com/cloud">Zilliz Cloud-Konto</a> </li>
<li><a href="https://anythingllm.com/desktop">AnythingLLM Desktop</a> installiert</li>
<li>Dokumente oder Datenquellen, die zum Hochladen und Einbetten bereit sind (PDF, Word, CSV, Webseiten, etc.)</li>
</ul>
<hr>
<h2 id="2-Configure-Milvus-as-the-Vector-Database" class="common-anchor-header">2. Konfigurieren Sie Milvus als Vektordatenbank<button data-href="#2-Configure-Milvus-as-the-Vector-Database" class="anchor-icon" translate="no">
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
<li>Öffnen Sie AnythingLLM und klicken Sie auf das <strong>Einstellungssymbol</strong> in der unteren linken Ecke<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_dashboard.png" alt="Open Settings" class="doc-image" id="open-settings" />
   </span> <span class="img-wrapper"> <span>Einstellungen öffnen</span> </span></li>
</ol>
<ol start="2">
<li><p>Wählen Sie im linken Menü <code translate="no">AI Providers</code> &gt; <code translate="no">Vector Database</code> <br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_config.png" alt="Select Vector Database" class="doc-image" id="select-vector-database" />
   </span> <span class="img-wrapper"> <span>Wählen Sie Vektordatenbank</span> </span></p></li>
<li><p>Wählen Sie in der Dropdown-Liste Vektordatenbankanbieter <strong>Milvus</strong> (oder Zilliz Cloud)<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_vectordb.png" alt="Choose Milvus" class="doc-image" id="choose-milvus" />
   </span> <span class="img-wrapper"> <span>Wählen Sie Milvus</span> </span></p></li>
<li><p>Geben Sie Ihre Milvus-Verbindungsdetails ein (für lokales Milvus). Hier ist ein Beispiel:</p>
<ul>
<li><strong>Milvus DB Adresse</strong>: <code translate="no">http://localhost:19530</code></li>
<li><strong>Milvus Benutzername</strong>: <code translate="no">root</code></li>
<li><strong>Milvus Kennwort</strong>: <code translate="no">Milvus</code>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_milvus.png" alt="Milvus Connection" class="doc-image" id="milvus-connection" />
   </span> <span class="img-wrapper"> <span>Milvus-Verbindung</span> </span></li>
</ul>
<blockquote>
<p>Wenn Sie Zilliz Cloud verwenden, geben Sie stattdessen Ihren Cluster-Endpunkt und Ihr API-Token ein:</p>
</blockquote>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_zilliz_cloud.png" alt="Zilliz Cloud Connection" class="doc-image" id="zilliz-cloud-connection" />
   </span> <span class="img-wrapper"> <span>Zilliz-Cloud-Verbindung</span> </span></p></li>
<li><p>Klicken Sie auf <strong>Änderungen speichern</strong>, um Ihre Einstellungen zu übernehmen.</p></li>
</ol>
<hr>
<h2 id="3-Create-a-Workspace-and-Upload-Documents" class="common-anchor-header">3. Erstellen Sie einen Arbeitsbereich und laden Sie Dokumente hoch<button data-href="#3-Create-a-Workspace-and-Upload-Documents" class="anchor-icon" translate="no">
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
<li><p>Geben Sie Ihren Arbeitsbereich ein und klicken Sie auf das <strong>Upload-Symbol</strong>, um den Dialog zum Hochladen von Dokumenten zu öffnen<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_upload_file.png" alt="Open Upload Dialog" class="doc-image" id="open-upload-dialog" />
   </span> <span class="img-wrapper"> <span>Upload-Dialog öffnen</span> </span></p></li>
<li><p>Sie können eine breite Palette von Datenquellen hochladen:</p>
<ul>
<li><strong>Lokale Dateien</strong>: PDF, Word, CSV, TXT, Audiodateien, usw.</li>
<li><strong>Web-Seiten</strong>: Fügen Sie eine URL ein und rufen Sie den Inhalt einer Website direkt ab.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_upload_interface.png" alt="Upload Documents" class="doc-image" id="upload-documents" />
   </span> <span class="img-wrapper"> <span>Dokumente hochladen</span> </span></p></li>
<li><p>Klicken Sie nach dem Hochladen oder Abrufen auf <strong>In Arbeitsbereich verschieben</strong>, um das Dokument oder die Daten in Ihren aktuellen Arbeitsbereich zu verschieben<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_move_to_workspace.png" alt="Move to Workspace" class="doc-image" id="move-to-workspace" />
   </span> <span class="img-wrapper"> <span>In Arbeitsbereich verschieben</span> </span></p></li>
<li><p>Wählen Sie das Dokument oder die Daten aus und klicken Sie auf <strong>Speichern und einbetten</strong>. AnythingLLM wird Ihre Inhalte automatisch in Milvus chunking, einbetten und speichern<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_save_and_embed.png" alt="Save and Embed" class="doc-image" id="save-and-embed" />
   </span> <span class="img-wrapper"> <span>Speichern und einbetten</span> </span></p></li>
</ol>
<hr>
<h2 id="4-Chat-and-Retrieve-Answers-from-Milvus" class="common-anchor-header">4. Chatten und Antworten aus Milvus abrufen<button data-href="#4-Chat-and-Retrieve-Answers-from-Milvus" class="anchor-icon" translate="no">
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
<li>Kehren Sie zur Chat-Schnittstelle des Arbeitsbereichs zurück und stellen Sie Fragen. AnythingLLM durchsucht Ihre Milvus-Vektordatenbank nach relevanten Inhalten und verwendet den LLM, um Antworten zu generieren.<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_chat.png" alt="Chat with Docs" class="doc-image" id="chat-with-docs" />
   </span> <span class="img-wrapper"> <span>Chatten mit Docs</span> </span></li>
</ol>
<hr>
