---
id: dify_with_milvus.md
summary: >-
  In diesem Tutorial zeigen wir Ihnen, wie Sie Dify mit Milvus einsetzen, um ein
  effizientes Retrieval und eine RAG-Engine zu ermöglichen.
title: Bereitstellung von Dify mit Milvus
---
<h1 id="Deploying-Dify-with-Milvus" class="common-anchor-header">Bereitstellung von Dify mit Milvus<button data-href="#Deploying-Dify-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://dify.ai/">Dify</a> ist eine Open-Source-Plattform, die die Entwicklung von KI-Anwendungen durch die Kombination von Backend-as-a-Service mit LLMOps vereinfachen soll. Sie unterstützt gängige LLMs, bietet eine intuitive Prompt-Orchestrierungsschnittstelle, hochwertige RAG-Engines und ein flexibles KI-Agenten-Framework. Mit Low-Code-Workflows, benutzerfreundlichen Schnittstellen und APIs ermöglicht es Dify sowohl Entwicklern als auch technisch nicht versierten Anwendern, sich auf die Erstellung innovativer, realer KI-Lösungen zu konzentrieren, ohne sich mit Komplexität auseinandersetzen zu müssen.</p>
<p>In diesem Tutorial zeigen wir Ihnen, wie Sie Dify mit Milvus einsetzen können, um ein effizientes Retrieval und eine RAG-Engine zu ermöglichen.</p>
<h2 id="Clone-the-Repository" class="common-anchor-header">Klonen des Repositorys<button data-href="#Clone-the-Repository" class="anchor-icon" translate="no">
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
    </button></h2><p>Klonen Sie den Dify-Quellcode auf Ihren lokalen Rechner:</p>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> https://github.com/langgenius/dify.git
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-the-Environment-Variables" class="common-anchor-header">Setzen Sie die Umgebungsvariablen<button data-href="#Set-the-Environment-Variables" class="anchor-icon" translate="no">
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
    </button></h2><p>Navigieren Sie zu dem Docker-Verzeichnis im Dify-Quellcode</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">cd</span> dify/docker
<button class="copy-code-btn"></button></code></pre>
<p>Kopieren Sie die Umgebungskonfigurationsdatei</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">cp</span> .env.example .<span class="hljs-built_in">env</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ändern Sie den Wert <code translate="no">VECTOR_STORE</code> in der Datei <code translate="no">.env</code> </p>
<pre><code translate="no">VECTOR_STORE=milvus
<button class="copy-code-btn"></button></code></pre>
<p>Stellen Sie sicher, dass die Milvus-Konfiguration in der Datei <code translate="no">.env</code> die folgende Zeile enthält:</p>
<pre><code translate="no"><span class="hljs-variable constant_">MILVUS_URI</span>=<span class="hljs-attr">http</span>:<span class="hljs-comment">//host.docker.internal:19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>Beachten Sie, dass Dify durch die Angabe von <code translate="no">VECTOR_STORE=milvus</code> einen Milvus-Standalone-Server in Docker aufruft. Obwohl Sie von außerhalb von Docker über <code translate="no">http://localhost:19530</code> auf den Server zugreifen können, müssen sich andere Dify-Container mit dem speziellen DNS-Namen <code translate="no">host.docker.internal</code> verbinden, um mit ihm innerhalb der Docker-Umgebung zu kommunizieren. Daher setzen wir <code translate="no">http://host.docker.internal:19530</code> als <code translate="no">MILVUS_URI</code>.</p>
<p>Für den Einsatz in der Produktion möchten Sie vielleicht die Authentifizierung anpassen. Weitere Informationen zum Festlegen von Token oder Benutzernamen und Passwort in Milvus finden Sie auf der <a href="https://milvus.io/docs/authenticate.md?tab=docker#Update-user-password">Seite authenticate</a>.</p>
<h2 id="Start-the-Docker-Containers" class="common-anchor-header">Starten Sie die Docker-Container<button data-href="#Start-the-Docker-Containers" class="anchor-icon" translate="no">
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
    </button></h2><p>Wählen Sie den entsprechenden Befehl zum Starten der Container auf der Grundlage der Docker Compose-Version auf Ihrem System. Sie können den Befehl <code translate="no">$ docker compose version</code> verwenden, um die Version zu überprüfen, und weitere Informationen in der Docker-Dokumentation nachlesen:</p>
<p>Wenn Sie Docker Compose V2 haben, verwenden Sie den folgenden Befehl:</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<p>Wenn Sie Docker Compose V1 haben, verwenden Sie den folgenden Befehl:</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h2 id="Log-in-to-Dify" class="common-anchor-header">Melden Sie sich bei Dify an<button data-href="#Log-in-to-Dify" class="anchor-icon" translate="no">
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
    </button></h2><p>Öffnen Sie Ihren Browser und rufen Sie die Dify-Installationsseite auf. Hier können Sie Ihr Administratorkonto einrichten:<code translate="no">http://localhost/install</code>. Dann melden Sie sich auf der Dify-Hauptseite zur weiteren Verwendung an.</p>
<p>Weitere Informationen zur Verwendung und Anleitung finden Sie in der <a href="https://docs.dify.ai/">Dify-Dokumentation</a>.</p>
