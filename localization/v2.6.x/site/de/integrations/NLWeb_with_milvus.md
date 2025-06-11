---
id: NLWeb_with_milvus.md
summary: >-
  Lernen Sie, wie Sie Microsoft NLWeb mit Milvus integrieren können, um
  leistungsstarke natürlichsprachliche Schnittstellen für Websites zu erstellen.
  Dieses Tutorial zeigt Ihnen, wie Sie die Fähigkeiten der Vektordatenbank
  Milvus für eine effiziente semantische Suche, Einbettung und Kontextabfrage in
  NLWeb-Anwendungen nutzen können.
title: Verwendung von NLWeb mit Milvus
---
<h1 id="Using-NLWeb-with-Milvus" class="common-anchor-header">Verwendung von NLWeb mit Milvus<button data-href="#Using-NLWeb-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/microsoft/NLWeb">NLWeb von Microsoft</a> ist ein vorgeschlagenes Rahmenwerk, das natürlichsprachliche Schnittstellen für Websites ermöglicht, die <a href="https://schema.org/">Schema.org</a>, Formate wie RSS und das neue MCP-Protokoll verwenden.</p>
<p><a href="https://milvus.io/">Milvus</a> wird als Vektordatenbank-Backend innerhalb von NLWeb unterstützt, um die Speicherung und die effiziente Suche nach Vektorähnlichkeiten einzubetten, was eine leistungsstarke Kontextabfrage für Anwendungen zur Verarbeitung natürlicher Sprache ermöglicht.</p>
<blockquote>
<p>Diese Dokumentation basiert hauptsächlich auf der offiziellen <a href="https://github.com/microsoft/NLWeb/blob/main/HelloWorld.md">Schnellstart-Dokumentation</a>. Sollten Sie veraltete oder inkonsistente Inhalte finden, bevorzugen Sie bitte die offizielle Dokumentation und zögern Sie nicht, uns ein Problem zu melden.</p>
</blockquote>
<h2 id="Usage" class="common-anchor-header">Verwendung<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>NLWeb kann so konfiguriert werden, dass es Milvus als Retrieval Engine verwendet. Im Folgenden finden Sie eine Anleitung, wie Sie NLWeb mit Milvus einrichten und verwenden.</p>
<h3 id="Installation" class="common-anchor-header">Einrichtung</h3><p>Klonen Sie das Repo und richten Sie Ihre Umgebung ein:</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/microsoft/NLWeb
<span class="hljs-built_in">cd</span> NLWeb
python -m venv .venv
<span class="hljs-built_in">source</span> .venv/bin/activate  <span class="hljs-comment"># or `.venv\Scripts\activate` on Windows</span>
<span class="hljs-built_in">cd</span> code
pip install -r requirements.txt
pip install pymilvus  <span class="hljs-comment"># Add Milvus Python client</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuring-Milvus" class="common-anchor-header">Milvus konfigurieren</h3><p>Um <strong>Milvus</strong> zu verwenden, aktualisieren Sie Ihre Konfiguration.</p>
<h4 id="Update-config-files-in-codeconfig" class="common-anchor-header">Aktualisieren Sie die Konfigurationsdateien in <code translate="no">code/config</code></h4><p>Öffnen Sie die Datei <code translate="no">config_retrieval.yaml</code> und fügen Sie die Milvus-Konfiguration hinzu:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">preferred_endpoint:</span> <span class="hljs-string">milvus_local</span>

<span class="hljs-attr">endpoints:</span>
  <span class="hljs-attr">milvus_local:</span>
    <span class="hljs-attr">database_path:</span> <span class="hljs-string">&quot;../data/milvus.db&quot;</span>
    <span class="hljs-comment"># Set the collection name to use</span>
    <span class="hljs-attr">index_name:</span> <span class="hljs-string">nlweb_collection</span>
    <span class="hljs-comment"># Specify the database type</span>
    <span class="hljs-attr">db_type:</span> <span class="hljs-string">milvus</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Loading-Data" class="common-anchor-header">Daten laden</h3><p>Nach der Konfiguration laden Sie Ihre Inhalte über RSS-Feeds.</p>
<p>Aus dem Verzeichnis <code translate="no">code</code>:</p>
<pre><code translate="no" class="language-bash">python -m tools.db_load https://feeds.libsyn.com/121695/rss Behind-the-Tech
<button class="copy-code-btn"></button></code></pre>
<p>Dadurch wird der Inhalt in Ihre Milvus-Sammlung aufgenommen, wobei sowohl die Textdaten als auch die Vektoreinbettungen gespeichert werden.</p>
<h3 id="Running-the-Server" class="common-anchor-header">Starten des Servers</h3><p>Um NLWeb zu starten, starten Sie im Verzeichnis <code translate="no">code</code> den Befehl run:</p>
<pre><code translate="no" class="language-bash">python app-file.py
<button class="copy-code-btn"></button></code></pre>
<p>Sie können nun Ihre Inhalte über natürliche Sprache entweder über die Web-UI auf http://localhost:8000/ oder direkt über die MCP-kompatible REST-API abfragen.</p>
<h2 id="Further-Reading" class="common-anchor-header">Weitere Lektüre<button data-href="#Further-Reading" class="anchor-icon" translate="no">
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
<li><a href="https://milvus.io/docs">Milvus-Dokumentation</a></li>
<li><a href="https://github.com/microsoft/NLWeb">NLWeb-Quelle</a></li>
<li>Leben einer Chat-Abfrage</li>
<li>Ändern des Verhaltens durch Ändern der Prompts</li>
<li>Ändern des Kontrollflusses</li>
<li>Ändern der Benutzeroberfläche</li>
</ul>
