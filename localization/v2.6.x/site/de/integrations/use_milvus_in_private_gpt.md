---
id: use_milvus_in_private_gpt.md
summary: >-
  In diesem Tutorial zeigen wir Ihnen, wie Sie Milvus als
  Backend-Vektordatenbank für PrivateGPT verwenden können.
title: Milvus in PrivateGPT verwenden
---
<h1 id="Use-Milvus-in-PrivateGPT" class="common-anchor-header">Milvus in PrivateGPT verwenden<button data-href="#Use-Milvus-in-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://privategpt.dev/">PrivateGPT</a> ist ein produktionsreifes KI-Projekt, das es Nutzern ermöglicht, Fragen zu ihren Dokumenten mit Hilfe von Large Language Models zu stellen, ohne dass eine Internetverbindung erforderlich ist, wobei ein 100%iger Datenschutz gewährleistet ist. PrivateGPT bietet eine API, die in High-Level- und Low-Level-Blöcke unterteilt ist. Außerdem bietet es einen Gradio UI-Client und nützliche Tools wie Skripte zum Herunterladen von Massenmodellen und Skripte zum Einlesen. Das Konzept von PrivateGPT besteht darin, eine RAG-Pipeline zu umhüllen und ihre Primitive offenzulegen. Es ist sofort einsatzbereit und bietet eine vollständige Implementierung der API und der RAG-Pipeline.</p>
<p>In diesem Tutorial zeigen wir Ihnen, wie Sie Milvus als Backend-Vektordatenbank für PrivateGPT verwenden können.</p>
<div class="alert note">
<p>Dieses Tutorial bezieht sich hauptsächlich auf die offizielle <a href="https://docs.privategpt.dev/installation/getting-started/installation">PrivateGPT-Installationsanleitung</a>. Wenn Sie feststellen, dass diese Anleitung veraltete Teile enthält, können Sie vorrangig die offizielle Anleitung befolgen und eine Anfrage an uns stellen.</p>
</div>
<h2 id="Base-requirements-to-run-PrivateGPT" class="common-anchor-header">Grundvoraussetzungen für den Betrieb von PrivateGPT<button data-href="#Base-requirements-to-run-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Clone-the-PrivateGPT-Repository" class="common-anchor-header">1. Klonen Sie das PrivateGPT-Repository</h3><p>Klonen Sie das Repository und navigieren Sie zu ihm:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/zylon-ai/private-gpt</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">cd</span> private-gpt</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Install-Poetry" class="common-anchor-header">2. Poetry installieren</h3><p>Installieren Sie <a href="https://python-poetry.org/docs/#installing-with-the-official-installer">Poetry</a> für die Verwaltung von Abhängigkeiten: Folgen Sie den Anweisungen auf der offiziellen Poetry-Website, um es zu installieren.</p>
<h3 id="3-Optional-Install-make" class="common-anchor-header">3. (Optional) Installieren Sie make</h3><p>Um verschiedene Skripte auszuführen, müssen Sie make installieren.</p>
<p>macOS (mit Homebrew):</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">brew install make</span>
<button class="copy-code-btn"></button></code></pre>
<p>Windows (unter Verwendung von Chocolatey):</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">choco install make</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-Available-Modules" class="common-anchor-header">Verfügbare Module installieren<button data-href="#Install-Available-Modules" class="anchor-icon" translate="no">
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
    </button></h2><p>PrivateGPT erlaubt die Anpassung des Setups für einige Module, z.B. LLM, Embeddings, Vector Stores, UI.</p>
<p>In diesem Tutorium werden wir die folgenden Module verwenden:</p>
<ul>
<li><strong>LLM</strong>: Ollama</li>
<li><strong>Einbettungen</strong>: Ollama</li>
<li><strong>Vektorspeicher</strong>: Milvus</li>
<li><strong>UI</strong>: Gradio</li>
</ul>
<p>Führen Sie den folgenden Befehl aus, um mit Hilfe von poetry die erforderlichen Modulabhängigkeiten zu installieren:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">poetry install --extras <span class="hljs-string">&quot;llms-ollama embeddings-ollama vector-stores-milvus ui&quot;</span></span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-Ollama-service" class="common-anchor-header">Starten Sie den Ollama-Dienst<button data-href="#Start-Ollama-service" class="anchor-icon" translate="no">
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
    </button></h2><p>Gehen Sie zu <a href="https://ollama.com/">ollama.ai</a> und folgen Sie den Anweisungen, um Ollama auf Ihrem Rechner zu installieren.</p>
<p>Nach der Installation stellen Sie sicher, dass die Ollama-Desktop-Anwendung geschlossen ist.</p>
<p>Starten Sie nun den Ollama-Dienst (es wird ein lokaler Inferenz-Server gestartet, der sowohl den LLM als auch die Einbettungen bedient):</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">ollama serve</span>
<button class="copy-code-btn"></button></code></pre>
<p>Installieren Sie die zu verwendenden Modelle. <code translate="no">settings-ollama.yaml</code> ist standardmäßig auf den Benutzer <code translate="no">llama3.1</code> 8b LLM (~4GB) und <code translate="no">nomic-embed-text</code> Embeddings (~275MB) konfiguriert.</p>
<p>Standardmäßig zieht PrivateGPT die Modelle automatisch nach Bedarf. Dieses Verhalten kann durch Ändern der Eigenschaft <code translate="no">ollama.autopull_models</code> geändert werden.</p>
<p>Wenn Sie die Modelle manuell abrufen möchten, führen Sie die folgenden Befehle aus:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">ollama pull llama3.1</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">ollama pull nomic-embed-text</span>
<button class="copy-code-btn"></button></code></pre>
<p>Sie können optional zu Ihren bevorzugten Modellen in der Datei <code translate="no">settings-ollama.yaml</code> wechseln und diese manuell abrufen.</p>
<h2 id="Change-Milvus-Settings" class="common-anchor-header">Milvus-Einstellungen ändern<button data-href="#Change-Milvus-Settings" class="anchor-icon" translate="no">
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
    </button></h2><p>Setzen Sie in der Datei <code translate="no">settings-ollama.yaml</code> den Vektorspeicher auf Milvus:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">vectorstore:</span>
  <span class="hljs-attr">database:</span> <span class="hljs-string">milvus</span>
<button class="copy-code-btn"></button></code></pre>
<p>Sie können auch eine eigene Milvus-Konfiguration hinzufügen, um Ihre Einstellungen zu spezifizieren, etwa so:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">milvus:</span>
  <span class="hljs-attr">uri:</span> <span class="hljs-string">http://localhost:19530</span>
  <span class="hljs-attr">collection_name:</span> <span class="hljs-string">my_collection</span>
<button class="copy-code-btn"></button></code></pre>
<p>Die verfügbaren Konfigurationsoptionen sind:</p>
<table>
<thead>
<tr><th>Feld Option</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td>uri</td><td>Standardmäßig ist "local_data/private_gpt/milvus/milvus_local.db" als lokale Datei eingestellt; Sie können auch einen leistungsfähigeren Milvus-Server auf Docker oder k8s, z. B. http://localhost:19530, als Ihre uri einrichten; Um <a href="https://zilliz.com/cloud">Zilliz Cloud</a> zu verwenden, passen Sie die uri und das Token an den <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">öffentlichen Endpunkt und den API-Schlüssel</a> in Zilliz Cloud an.</td></tr>
<tr><td>Token</td><td>Pair mit Milvus Server auf Docker oder k8s oder Zilliz Cloud api Schlüssel.</td></tr>
<tr><td>sammlung_name</td><td>Der Name der Sammlung, standardmäßig auf "milvus_db" eingestellt.</td></tr>
<tr><td>überschreiben</td><td>Überschreibt die Daten in der Sammlung, falls vorhanden, standardmäßig auf True gesetzt.</td></tr>
</tbody>
</table>
<h2 id="Start-PrivateGPT" class="common-anchor-header">PrivateGPT starten<button data-href="#Start-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h2><p>Sobald alle Einstellungen vorgenommen wurden, können Sie PrivateGPT mit einer Gradio-Benutzeroberfläche starten.</p>
<pre><code translate="no" class="language-shell">PGPT_PROFILES=ollama make run
<button class="copy-code-btn"></button></code></pre>
<p>Die UI wird unter <code translate="no">http://0.0.0.0:8001</code> verfügbar sein.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/private_gpt_ui.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Sie können mit der UI herumspielen und Fragen zu Ihren Dokumenten stellen.</p>
<p>Weitere Details finden Sie in der offiziellen <a href="https://docs.privategpt.dev/">PrivateGPT-Dokumentation</a>.</p>
