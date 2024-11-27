---
id: use_milvus_with_sambanova.md
summary: >-
  Dieses Tutorial nutzt die Milvus-Integration in den SambaNova AI Starter Kits,
  um ein Enterprise Knowledge Retrieval System, ähnlich wie RAG
  (Retrieval-Augmented Generation), für das Retrieval und die Beantwortung von
  Fragen auf Basis der privaten Dokumente des Unternehmens zu erstellen.
title: Verwenden Sie Milvus mit SambaNova
---
<h1 id="Use-Milvus-with-SambaNova" class="common-anchor-header">Verwenden Sie Milvus mit SambaNova<button data-href="#Use-Milvus-with-SambaNova" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://sambanova.ai/">SambaNova</a> ist eine innovative KI-Technologieplattform, die den Einsatz fortschrittlicher KI- und Deep-Learning-Funktionen beschleunigt. Sie wurde für den Einsatz in Unternehmen entwickelt und ermöglicht es Organisationen, generative KI für mehr Leistung und Effizienz zu nutzen. Durch die Bereitstellung von Spitzenlösungen wie der SambaNova Suite und DataScale ermöglicht die Plattform Unternehmen, wertvolle Erkenntnisse aus ihren Daten zu gewinnen, betriebliche Verbesserungen voranzutreiben und neue Möglichkeiten in der KI-Landschaft zu fördern.</p>
<p><a href="https://github.com/sambanova/ai-starter-kit">Die SambaNova AI Starter Kits</a> sind eine Sammlung von Open-Source-Ressourcen, die Entwicklern und Unternehmen bei der Implementierung von KI-gesteuerten Anwendungen mit SambaNova helfen sollen. Diese Kits enthalten praktische Beispiele und Anleitungen, die die Implementierung verschiedener KI-Anwendungsfälle erleichtern und es den Benutzern ermöglichen, die fortschrittliche Technologie von SambaNova zu nutzen.</p>
<p>Dieses Tutorial nutzt die Milvus-Integration in den SambaNova AI Starter Kits, um ein Enterprise Knowledge Retrieval System, ähnlich wie RAG (Retrieval-Augmented Generation), für das Retrieval und die Beantwortung von Fragen auf Basis der privaten Dokumente des Unternehmens zu erstellen.</p>
<div class="alert note">
<p>Dieses Tutorial bezieht sich hauptsächlich auf das offizielle <a href="https://github.com/sambanova/ai-starter-kit/tree/main">SambaNova AI Starter Kits</a> Handbuch. Wenn Sie feststellen, dass dieses Tutorial veraltete Teile enthält, können Sie sich vorrangig an die offizielle Anleitung halten und eine Anfrage an uns stellen.</p>
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
    </button></h2><p>Wir empfehlen die Verwendung von Python &gt;= 3.10 und &lt; 3.12.</p>
<p>Besuchen Sie die <a href="https://cloud.sambanova.ai/">SambaNova Cloud</a>, um einen SambaNova API Schlüssel zu erhalten.</p>
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
    </button></h2><pre><code translate="no" class="language-shell">$ git <span class="hljs-built_in">clone</span> https://github.com/sambanova/ai-starter-kit.git
$ d ai-starter-kit/enterprise_knowledge_retriever
<button class="copy-code-btn"></button></code></pre>
<h2 id="Change-the-vector-store-type" class="common-anchor-header">Ändern Sie den Typ des Vektorspeichers<button data-href="#Change-the-vector-store-type" class="anchor-icon" translate="no">
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
    </button></h2><p>Ändern Sie den Vektorspeicher, indem Sie <code translate="no">db_type='milvus'</code> in den Funktionen <code translate="no">create_vector_store()</code> und <code translate="no">load_vdb()</code> in <code translate="no">src/document_retrieval.py</code> einstellen.</p>
<pre><code translate="no" class="language-python">...
vectorstore = <span class="hljs-variable language_">self</span>.vectordb.create_vector_store(
    ..., db_type=<span class="hljs-string">&#x27;milvus&#x27;</span>
)
...
vectorstore = <span class="hljs-variable language_">self</span>.vectordb.load_vdb(..., db_type=<span class="hljs-string">&#x27;milvus&#x27;</span>, ...)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-dependencies" class="common-anchor-header">Installieren Sie Abhängigkeiten<button data-href="#Install-dependencies" class="anchor-icon" translate="no">
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
    </button></h2><p>Installieren Sie die erforderlichen Abhängigkeiten, indem Sie den folgenden Befehl ausführen:</p>
<pre><code translate="no" class="language-shell">python3 -m venv enterprise_knowledge_env
<span class="hljs-built_in">source</span> enterprise_knowledge_env/bin/activate
pip install -r requirements.txt
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-the-application" class="common-anchor-header">Starten Sie die Anwendung<button data-href="#Start-the-application" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie den folgenden Befehl, um die Anwendung zu starten:</p>
<pre><code translate="no" class="language-bash">$ streamlit run streamlit/app.py --browser.gatherUsageStats <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre>
<p>Danach sehen Sie die Benutzeroberfläche in Ihrem Browser:<code translate="no">http://localhost:8501/</code></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/sambanava_ui.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Nachdem Sie Ihren SambaNova-API-Schlüssel in der Benutzeroberfläche festgelegt haben, können Sie mit der Benutzeroberfläche spielen und Fragen zu Ihren Dokumenten stellen.</p>
<p>Weitere Details finden Sie in der offiziellen Dokumentation zum <a href="https://github.com/sambanova/ai-starter-kit/tree/main/enterprise_knowledge_retriever">Enterprise Knowledge Retrieval des SambaNova AI Starter Kits</a>.</p>
