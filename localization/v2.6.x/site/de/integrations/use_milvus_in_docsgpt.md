---
id: use_milvus_in_docsgpt.md
summary: >-
  In diesem Tutorial zeigen wir Ihnen, wie Sie Milvus als
  Backend-Vektordatenbank für DocsGPT verwenden können.
title: Verwenden Sie Milvus in DocsGPT
---
<h1 id="Use-Milvus-in-DocsGPT" class="common-anchor-header">Verwenden Sie Milvus in DocsGPT<button data-href="#Use-Milvus-in-DocsGPT" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/arc53/DocsGPT">DocsGPT</a> ist eine fortschrittliche Open-Source-Lösung, die das Auffinden von Informationen in der Projektdokumentation durch die Integration von leistungsstarken GPT-Modellen vereinfacht. Sie ermöglicht es Entwicklern, auf einfache Weise genaue Antworten auf ihre Fragen zu einem Projekt zu erhalten, wodurch zeitaufwändige manuelle Suchen vermieden werden.</p>
<p>In diesem Tutorial zeigen wir Ihnen, wie Sie Milvus als Backend-Vektor-Datenbank für DocsGPT verwenden.</p>
<div class="alert note">
<p>Dieses Tutorial bezieht sich hauptsächlich auf die offizielle <a href="https://github.com/arc53/DocsGPT?tab=readme-ov-file#quickstart">DocsGPT-Installationsanleitung</a>. Wenn Sie feststellen, dass diese Anleitung veraltete Teile enthält, können Sie vorrangig die offizielle Anleitung befolgen und eine Anfrage an uns stellen.</p>
</div>
<h2 id="Requirements" class="common-anchor-header">Anforderungen<button data-href="#Requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>Stellen Sie sicher, dass Sie <a href="https://docs.docker.com/engine/install/">Docker</a> installiert haben</p>
<h2 id="Clone-the-repository" class="common-anchor-header">Klonen Sie das Repository<button data-href="#Clone-the-repository" class="anchor-icon" translate="no">
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
    </button></h2><p>Klonen Sie das Repository und navigieren Sie zu ihm:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/arc53/DocsGPT.git</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">cd</span> DocsGPT</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Add-dependency" class="common-anchor-header">Add dependency<button data-href="#Add-dependency" class="anchor-icon" translate="no">
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
    </button></h2><p>Fügen Sie die Abhängigkeit <code translate="no">langchain-milvus</code> an die Datei <code translate="no">requirements.txt</code> im Ordner <code translate="no">application</code> an:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;\nlangchain-milvus==0.1.6&quot;</span> &gt;&gt; ./application/requirements.txt</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-environment-variables" class="common-anchor-header">Umgebungsvariablen setzen<button data-href="#Set-environment-variables" class="anchor-icon" translate="no">
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
    </button></h2><p>Fügen Sie <code translate="no">VECTOR_STORE=milvus</code>, <code translate="no">MILVUS_URI=...</code>, <code translate="no">MILVUS_TOKEN=...</code> zu den Umgebungsvariablen für die beiden Dienste <code translate="no">backend</code> und <code translate="no">worker</code> in der Datei <code translate="no">docker-compose.yaml</code> hinzu, genau so:</p>
<pre><code translate="no" class="language-yaml">  <span class="hljs-attr">backend:</span>
    <span class="hljs-attr">build:</span> <span class="hljs-string">./application</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">VECTOR_STORE=milvus</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">MILVUS_URI=...</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">MILVUS_TOKEN=...</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-yaml">  <span class="hljs-attr">worker:</span>
    <span class="hljs-attr">build:</span> <span class="hljs-string">./application</span>
    <span class="hljs-attr">command:</span> <span class="hljs-string">celery</span> <span class="hljs-string">-A</span> <span class="hljs-string">application.app.celery</span> <span class="hljs-string">worker</span> <span class="hljs-string">-l</span> <span class="hljs-string">INFO</span> <span class="hljs-string">-B</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">VECTOR_STORE=milvus</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">MILVUS_URI=...</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">MILVUS_TOKEN=...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Für die Dienste <code translate="no">MILVUS_URI</code> und <code translate="no">MILVUS_TOKEN</code> können Sie entweder den vollständig verwalteten Dienst <a href="https://zilliz.com/cloud">Zilliz Cloud</a>(empfohlen) oder den manuell gestarteten Dienst Milvus verwenden.</p>
<ul>
<li><p>Für den vollständig verwalteten Zillz Cloud-Dienst: Wir empfehlen die Verwendung des Zilliz-Cloud-Dienstes. Sie können sich für ein kostenloses Testkonto bei <a href="https://zilliz.com/cloud">Zilliz Cloud</a> anmelden. Danach erhalten Sie die <code translate="no">MILVUS_URI</code> und <code translate="no">MILVUS_TOKEN</code>, die dem <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">öffentlichen Endpunkt und dem API-Schlüssel</a> entsprechen.</p></li>
<li><p>Für manuell gestartete Milvus-Dienste: Wenn Sie einen Milvus-Dienst einrichten möchten, können Sie der <a href="https://milvus.io/docs/install_standalone-docker-compose.md">offiziellen Milvus-Dokumentation</a> folgen, um einen Milvus-Server einzurichten, und dann die <code translate="no">MILVUS_URI</code> und <code translate="no">MILVUS_TOKEN</code> vom Server abrufen. Die Dateien <code translate="no">MILVUS_URI</code> und <code translate="no">MILVUS_TOKEN</code> sollten das Format <code translate="no">http://&lt;your_server_ip&gt;:19530</code> bzw. <code translate="no">&lt;your_username&gt;:&lt;your_password&gt;</code> haben.</p></li>
</ul>
<h2 id="Start-the-services" class="common-anchor-header">Starten Sie die Dienste<button data-href="#Start-the-services" class="anchor-icon" translate="no">
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
    </button></h2><p>Ausführen: <code translate="no">./setup.sh</code></p>
<p>Navigieren Sie dann zu http://localhost:5173/.</p>
<p>Sie können mit der Benutzeroberfläche herumspielen und Fragen zu Ihren Dokumenten stellen.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/doscgpt_ui.png" alt="alt text" class="doc-image" id="alt-text" />
   </span> <span class="img-wrapper"> <span>Alt-Text</span> </span></p>
<p>Wenn Sie die Dienste stoppen wollen, führen Sie aus:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose down</span>
<button class="copy-code-btn"></button></code></pre>
<p>Weitere Details und fortgeschrittene Einstellungen finden Sie in der offiziellen <a href="https://github.com/arc53/DocsGPT">DocsGPT-Dokumentation</a>.</p>
