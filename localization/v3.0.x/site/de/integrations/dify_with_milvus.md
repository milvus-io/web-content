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
<div class="alert note">
<p>Diese Dokumentation basiert hauptsächlich auf der offiziellen <a href="https://docs.dify.ai/">Dify-Dokumentation</a>. Sollten Sie veraltete oder inkonsistente Inhalte finden, bevorzugen Sie bitte die offizielle Dokumentation und zögern Sie nicht, uns ein Problem zu melden.</p>
</div>
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
    </button></h2><h3 id="Clone-the-Repository" class="common-anchor-header">Klonen Sie das Repository</h3><p>Klonen Sie den Dify-Quellcode auf Ihren lokalen Rechner:</p>
<pre><code translate="no" class="language-shell">git clone https://github.com/langgenius/dify.git
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-Environment-Configuration" class="common-anchor-header">Umgebungskonfiguration vorbereiten</h3><p>Navigieren Sie zu dem Docker-Verzeichnis im Dify-Quellcode</p>
<pre><code translate="no" class="language-shell">cd dify/docker
<button class="copy-code-btn"></button></code></pre>
<p>Kopieren Sie die Umgebungskonfigurationsdatei</p>
<pre><code translate="no" class="language-shell">cp .env.example .env
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deployment-Options" class="common-anchor-header">Bereitstellungsoptionen<button data-href="#Deployment-Options" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können Dify mit Milvus auf zwei verschiedene Arten bereitstellen. Wählen Sie diejenige, die Ihren Anforderungen am besten entspricht:</p>
<h2 id="Option-1-Using-Milvus-with-Docker" class="common-anchor-header">Option 1: Verwendung von Milvus mit Docker<button data-href="#Option-1-Using-Milvus-with-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Bei dieser Option werden Milvus-Container neben Dify auf Ihrem lokalen Rechner mit Docker Compose ausgeführt.</p>
<h3 id="Configure-Environment-Variables" class="common-anchor-header">Konfigurieren Sie die Umgebungsvariablen</h3><p>Bearbeiten Sie die Datei <code translate="no">.env</code> mit der folgenden Milvus-Konfiguration:</p>
<pre><code translate="no">VECTOR_STORE=milvus
MILVUS_URI=http://host.docker.internal:19530
MILVUS_TOKEN=
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><code translate="no">MILVUS_URI</code> verwendet <code translate="no">host.docker.internal:19530</code>, wodurch Docker-Container über das interne Netzwerk von Docker auf Milvus zugreifen können, das auf dem Host-Rechner läuft.</li>
<li><code translate="no">MILVUS_TOKEN</code> kann für lokale Milvus-Einsätze leer gelassen werden.</li>
</ul>
</div>
<h3 id="Start-the-Docker-Containers" class="common-anchor-header">Starten Sie die Docker-Container</h3><p>Starten Sie die Container mit dem Profil <code translate="no">milvus</code>, um Milvus-Dienste einzubinden:</p>
<pre><code translate="no" class="language-shell">docker compose --profile milvus up -d
<button class="copy-code-btn"></button></code></pre>
<p>Mit diesem Befehl wird der Dify-Dienst zusammen mit den Containern <code translate="no">milvus-standalone</code>, <code translate="no">etcd</code> und <code translate="no">minio</code> gestartet.</p>
<h2 id="Option-2-Using-Zilliz-Cloud" class="common-anchor-header">Option 2: Verwendung der Zilliz Cloud<button data-href="#Option-2-Using-Zilliz-Cloud" class="anchor-icon" translate="no">
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
    </button></h2><p>Diese Option verbindet Dify mit einem verwalteten Milvus-Dienst auf Zilliz Cloud.</p>
<h3 id="Configure-Environment-Variables" class="common-anchor-header">Konfigurieren Sie die Umgebungsvariablen</h3><p>Bearbeiten Sie die Datei <code translate="no">.env</code> mit Ihren Zilliz-Cloud-Verbindungsdetails:</p>
<pre><code translate="no"><span class="hljs-attr">VECTOR_STORE</span>=milvus
<span class="hljs-attr">MILVUS_URI</span>=YOUR_ZILLIZ_CLOUD_ENDPOINT
<span class="hljs-attr">MILVUS_TOKEN</span>=YOUR_ZILLIZ_CLOUD_API_KEY
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>Ersetzen Sie <code translate="no">YOUR_ZILLIZ_CLOUD_ENDPOINT</code> durch Ihren <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">öffentlichen Endpunkt</a> von Zilliz Cloud.</li>
<li>Ersetzen Sie <code translate="no">YOUR_ZILLIZ_CLOUD_API_KEY</code> durch Ihren <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">API-Schlüssel</a> von Zilliz Cloud.</li>
</ul>
</div>
<h3 id="Start-the-Docker-Containers" class="common-anchor-header">Starten Sie die Docker-Container</h3><p>Starten Sie nur die Dify-Container ohne das Milvus-Profil:</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h2 id="Accessing-Dify" class="common-anchor-header">Zugriff auf Dify<button data-href="#Accessing-Dify" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Log-in-to-Dify" class="common-anchor-header">Melden Sie sich bei Dify an</h3><p>Öffnen Sie Ihren Browser und rufen Sie die Dify-Installationsseite auf. Hier können Sie Ihr Administratorkonto einrichten:<code translate="no">http://localhost/install</code>. Melden Sie sich dann auf der Hauptseite von Dify an, um weitere Informationen zu erhalten.</p>
<p>Weitere Informationen zur Nutzung und Anleitung finden Sie in der <a href="https://docs.dify.ai/">Dify-Dokumentation</a>.</p>
