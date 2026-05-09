---
id: milvus_and_mcp.md
summary: >-
  Dieses Tutorial führt Sie durch die Einrichtung eines MCP-Servers für Milvus,
  der es KI-Anwendungen ermöglicht, Vektorsuchen durchzuführen, Sammlungen zu
  verwalten und Daten mit Befehlen in natürlicher Sprache abzurufen, ohne eigene
  Datenbankabfragen schreiben zu müssen.
title: 'MCP + Milvus: Verknüpfung von KI mit Vektordatenbanken'
---
<h1 id="MCP-+-Milvus-Connecting-AI-with-Vector-Databases" class="common-anchor-header">MCP + Milvus: Verknüpfung von KI mit Vektordatenbanken<button data-href="#MCP-+-Milvus-Connecting-AI-with-Vector-Databases" class="anchor-icon" translate="no">
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
    </button></h1><iframe width="560" height="315" src="https://www.youtube.com/embed/0wAsrUxv8gM?si=BVyRqLJ2PuZIBF5c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<h2 id="Introduction" class="common-anchor-header">Einführung<button data-href="#Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p>Das <strong>Model Context Protocol (MCP)</strong> ist ein offenes Protokoll, das es KI-Anwendungen wie Claude und Cursor ermöglicht, nahtlos mit externen Datenquellen und Tools zu interagieren. Ganz gleich, ob Sie benutzerdefinierte KI-Anwendungen erstellen, KI-Workflows integrieren oder Chat-Schnittstellen verbessern möchten, MCP bietet eine standardisierte Möglichkeit, große Sprachmodelle (LLMs) mit relevanten Kontextdaten zu verbinden.</p>
<p>Dieses Tutorial führt Sie durch die <strong>Einrichtung eines MCP-Servers für Milvus</strong>, der es KI-Anwendungen ermöglicht, Vektorsuchen durchzuführen, Sammlungen zu verwalten und Daten mithilfe von <strong>Befehlen in natürlicher Sprache</strong>abzurufen <strong>, ohne</strong>eigene Datenbankabfragen schreiben zu müssen.</p>
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
    </button></h2><p>Bevor Sie den MCP-Server einrichten, stellen Sie sicher, dass Sie Folgendes haben</p>
<ul>
<li>Python 3.10 oder höher</li>
<li>Eine laufende <a href="https://milvus.io/">Milvus-Instanz</a> </li>
<li><a href="https://github.com/astral-sh/uv">uv</a> (für den Betrieb des Servers empfohlen)</li>
</ul>
<h2 id="Getting-Started" class="common-anchor-header">Erste Schritte<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><p>Es wird empfohlen, diesen MCP-Server ohne Installation direkt mit uv zu betreiben. In den folgenden Beispielen sind sowohl Claude Desktop als auch Cursor so konfiguriert, dass sie ihn verwenden.</p>
<p>Wenn Sie das Repository klonen möchten:</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/zilliztech/mcp-server-milvus.git
<span class="hljs-built_in">cd</span> mcp-server-milvus
<button class="copy-code-btn"></button></code></pre>
<p>Dann können Sie den Server direkt ausführen:</p>
<pre><code translate="no" class="language-bash">uv run src/mcp_server_milvus/server.py --milvus-uri http://localhost:19530
<button class="copy-code-btn"></button></code></pre>
<h2 id="Supported-Applications" class="common-anchor-header">Unterstützte Anwendungen<button data-href="#Supported-Applications" class="anchor-icon" translate="no">
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
    </button></h2><p>Dieser MCP-Server kann mit verschiedenen AI-Anwendungen verwendet werden, die das Model Context Protocol unterstützen, wie z. B:</p>
<ul>
<li><strong>Claude Desktop</strong>: Anthropic's Desktop-Anwendung für Claude</li>
<li><strong>Cursor</strong>: KI-gestützter Code-Editor mit MCP-Unterstützung in seiner Composer-Funktion</li>
<li><strong>Andere kundenspezifische MCP-Clients</strong> Jede Anwendung, die die MCP-Client-Spezifikation implementiert</li>
</ul>
<h2 id="Using-MCP-with-Claude-Desktop" class="common-anchor-header">Verwendung von MCP mit Claude Desktop<button data-href="#Using-MCP-with-Claude-Desktop" class="anchor-icon" translate="no">
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
<li>Installieren Sie <a href="https://claude.ai/download">Claude Desktop</a>.</li>
<li>Öffnen Sie die Claude-Konfigurationsdatei:<ul>
<li>Unter macOS: <code translate="no">~/Library/Application Support/Claude/claude_desktop_config.json</code></li>
</ul></li>
<li>Fügen Sie die folgende Konfiguration hinzu:</li>
</ol>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;milvus&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/PATH/TO/uv&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;args&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">&quot;--directory&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;/path/to/mcp-server-milvus/src/mcp_server_milvus&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;run&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;server.py&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;--milvus-uri&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
      <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="4">
<li>Starten Sie Claude Desktop neu, um die Änderungen zu übernehmen.</li>
</ol>
<h2 id="Using-MCP-with-Cursor" class="common-anchor-header">Verwendung von MCP mit Cursor<button data-href="#Using-MCP-with-Cursor" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://docs.cursor.com/context/model-context-protocol">Cursor</a> unterstützt auch MCP-Tools durch seine Agent-Funktion im Composer. Sie können den Milvus MCP-Server auf zwei Arten zu Cursor hinzufügen:</p>
<h3 id="Option-1-Using-Cursor-Settings-UI" class="common-anchor-header">Option 1: Über die Cursor Settings UI<button data-href="#Option-1-Using-Cursor-Settings-UI" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>Öffnen Sie <code translate="no">Cursor Settings</code> → <code translate="no">Features</code> → <code translate="no">MCP</code>.</li>
<li>Klicken Sie auf <code translate="no">+ Add New MCP Server</code>.</li>
<li>Füllen Sie aus:<ul>
<li>Typ: <code translate="no">stdio</code></li>
<li>Name: <code translate="no">milvus</code></li>
<li>Befehl:<pre><code translate="no" class="language-bash">/PATH/TO/uv --directory /path/to/mcp-server-milvus/src/mcp_server_milvus run server.py --milvus-uri http://127.0.0.1:19530
<button class="copy-code-btn"></button></code></pre></li>
<li>⚠️ Tipp: Verwenden Sie <code translate="no">127.0.0.1</code> anstelle von <code translate="no">localhost</code>, um mögliche DNS-Auflösungsprobleme zu vermeiden.</li>
</ul></li>
</ol>
<h3 id="Option-2-Using-Project-specific-Configuration-Recommended" class="common-anchor-header">Option 2: Verwendung einer projektspezifischen Konfiguration (empfohlen)<button data-href="#Option-2-Using-Project-specific-Configuration-Recommended" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>Erstellen Sie eine Datei <code translate="no">.cursor/mcp.json</code> in Ihrem <strong>Projekt-Stammverzeichnis</strong>:</li>
</ol>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;milvus&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/PATH/TO/uv&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;args&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">&quot;--directory&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;/path/to/mcp-server-milvus/src/mcp_server_milvus&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;run&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;server.py&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;--milvus-uri&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;http://127.0.0.1:19530&quot;</span>
      <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Starten Sie Cursor neu, um die Konfiguration zu übernehmen.</li>
</ol>
<p>Nach dem Hinzufügen des Servers müssen Sie möglicherweise die Schaltfläche "Aktualisieren" in den MCP-Einstellungen drücken, um die Tool-Liste aufzufüllen. Der Composer Agent wird automatisch die Milvus-Tools verwenden, wenn sie für Ihre Abfragen relevant sind.</p>
<h2 id="Verifying-the-Integration" class="common-anchor-header">Überprüfen der Integration<button data-href="#Verifying-the-Integration" class="anchor-icon" translate="no">
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
    </button></h2><p>So stellen Sie sicher, dass der MCP-Server korrekt eingerichtet ist:</p>
<h3 id="For-Cursor" class="common-anchor-header">Für Cursor<button data-href="#For-Cursor" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>Gehen Sie zu <code translate="no">Cursor Settings</code> → <code translate="no">Features</code> → <code translate="no">MCP</code>.</li>
<li>Bestätigen Sie, dass <code translate="no">&quot;Milvus&quot;</code> in der Liste der MCP-Server erscheint.</li>
<li>Prüfen Sie, ob die Milvus-Tools (z. B. <code translate="no">milvus_list_collections</code>, <code translate="no">milvus_vector_search</code>) aufgeführt sind.</li>
<li>Wenn Fehler auftreten, lesen Sie den Abschnitt <strong>Fehlerbehebung</strong> weiter unten.</li>
</ol>
<h2 id="MCP-Server-Tools-for-Milvus" class="common-anchor-header">MCP-Server-Tools für Milvus<button data-href="#MCP-Server-Tools-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Dieser MCP-Server bietet mehrere Tools für die <strong>Suche, Abfrage und Verwaltung von Vektordaten in Milvus</strong>. Weitere Einzelheiten entnehmen Sie bitte der Dokumentation <a href="https://github.com/zilliztech/mcp-server-milvus">mcp-server-milvus</a>.</p>
<h3 id="🔍-Search-and-Query-Tools" class="common-anchor-header">🔍 Such- und Abfragetools<button data-href="#🔍-Search-and-Query-Tools" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong><code translate="no">milvus-text-search</code></strong> → Suche nach Dokumenten mittels Volltextsuche.</li>
<li><strong><code translate="no">milvus-vector-search</code></strong> → Durchführen einer Vektorähnlichkeitssuche in einer Sammlung.</li>
<li><strong><code translate="no">milvus-hybrid-search</code></strong> → Durchführen einer hybriden Suche, die Vektorähnlichkeit und Attributfilterung kombiniert.</li>
<li><strong><code translate="no">milvus-multi-vector-search</code></strong> → Durchführen einer Vektorähnlichkeitssuche mit mehreren Abfragevektoren.</li>
<li><strong><code translate="no">milvus-query</code></strong> → Abfrage einer Sammlung mit Filterausdrücken.</li>
<li><strong><code translate="no">milvus-count</code></strong> → Zählen von Entitäten in einer Sammlung.</li>
</ul>
<h3 id="📁-Collection-Management" class="common-anchor-header">📁 Sammlungsverwaltung<button data-href="#📁-Collection-Management" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong><code translate="no">milvus-list-collections</code></strong> → Auflisten aller Sammlungen in der Datenbank.</li>
<li><strong><code translate="no">milvus-collection-info</code></strong> → Detaillierte Informationen über eine Sammlung abrufen.</li>
<li><strong><code translate="no">milvus-get-collection-stats</code></strong> → Abrufen von Statistiken über eine Sammlung.</li>
<li><strong><code translate="no">milvus-create-collection</code></strong> → Erstellen einer neuen Sammlung mit einem bestimmten Schema.</li>
<li><strong><code translate="no">milvus-load-collection</code></strong> → Laden einer Sammlung in den Speicher zur Suche und Abfrage.</li>
<li><strong><code translate="no">milvus-release-collection</code></strong> → Eine Sammlung aus dem Speicher freigeben.</li>
<li><strong><code translate="no">milvus-get-query-segment-info</code></strong> → Informationen über Abfragesegmente abrufen.</li>
<li><strong><code translate="no">milvus-get-collection-loading-progress</code></strong> → Abrufen des Ladefortschritts einer Sammlung.</li>
</ul>
<h3 id="📊-Data-Operations" class="common-anchor-header">📊 Datenoperationen<button data-href="#📊-Data-Operations" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong><code translate="no">milvus-insert-data</code></strong> → Einfügen von Daten in eine Sammlung.</li>
<li><strong><code translate="no">milvus-bulk-insert</code></strong> → Einfügen von Daten in Stapeln für bessere Leistung.</li>
<li><strong><code translate="no">milvus-upsert-data</code></strong> → Daten in eine Sammlung einfügen (einfügen oder aktualisieren, falls vorhanden).</li>
<li><strong><code translate="no">milvus-delete-entities</code></strong> → Löschen von Entitäten aus einer Sammlung basierend auf einem Filterausdruck.</li>
<li><strong><code translate="no">milvus-create-dynamic-field</code></strong> → Hinzufügen eines dynamischen Feldes zu einer bestehenden Sammlung.</li>
</ul>
<h3 id="⚙️-Index-Management" class="common-anchor-header">⚙️ Index-Verwaltung<button data-href="#⚙️-Index-Management" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong><code translate="no">milvus-create-index</code></strong> → Einen Index für ein Vektorfeld erstellen.</li>
<li><strong><code translate="no">milvus-get-index-info</code></strong> → Abrufen von Informationen über Indizes in einer Sammlung.</li>
</ul>
<h2 id="Environment-Variables" class="common-anchor-header">Umgebungsvariablen<button data-href="#Environment-Variables" class="anchor-icon" translate="no">
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
<li><strong><code translate="no">MILVUS_URI</code></strong> → Milvus-Server-URI (kann anstelle von <code translate="no">--milvus-uri</code> gesetzt werden).</li>
<li><strong><code translate="no">MILVUS_TOKEN</code></strong> → Optionales Authentifizierungs-Token.</li>
<li><strong><code translate="no">MILVUS_DB</code></strong> → Datenbankname (Standardwert ist "default").</li>
</ul>
<h2 id="Development" class="common-anchor-header">Entwicklung<button data-href="#Development" class="anchor-icon" translate="no">
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
    </button></h2><p>Zum direkten Ausführen des Servers:</p>
<pre><code translate="no" class="language-bash">uv run server.py --milvus-uri http://localhost:19530
<button class="copy-code-btn"></button></code></pre>
<h2 id="Examples" class="common-anchor-header">Beispiele<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Using-Claude-Desktop" class="common-anchor-header">Verwendung von Claude Desktop<button data-href="#Using-Claude-Desktop" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Example-1-Listing-Collections" class="common-anchor-header">Beispiel 1: Auflistung von Sammlungen</h4><pre><code translate="no">What are the collections <span class="hljs-selector-tag">I</span> have in my Milvus DB?
<button class="copy-code-btn"></button></code></pre>
<p>Claude wird dann MCP verwenden, um diese Informationen in unserer Milvus-DB zu überprüfen.</p>
<pre><code translate="no">I<span class="hljs-comment">&#x27;ll check what collections are available in your Milvus database.</span>

&gt; View result <span class="hljs-keyword">from</span> milvus-list-collections <span class="hljs-keyword">from</span> milvus (local)

Here are the collections <span class="hljs-keyword">in</span> your Milvus database:

<span class="hljs-number">1</span>. rag_demo
<span class="hljs-number">2</span>. test
<span class="hljs-number">3</span>. chat_messages
<span class="hljs-number">4</span>. text_collection
<span class="hljs-number">5</span>. image_collection
<span class="hljs-number">6</span>. customized_setup
<span class="hljs-number">7</span>. streaming_rag_demo
<button class="copy-code-btn"></button></code></pre>
<h4 id="Example-2-Searching-for-Documents" class="common-anchor-header">Beispiel 2: Suche nach Dokumenten</h4><pre><code translate="no">Find documents in <span class="hljs-keyword">my</span> text_collection that mention <span class="hljs-string">&quot;machine learning&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Claude wird die Volltextsuchfunktionen von Milvus nutzen, um relevante Dokumente zu finden:</p>
<pre><code translate="no">I<span class="hljs-comment">&#x27;ll search for documents about machine learning in your text_collection.</span>

&gt; View result <span class="hljs-keyword">from</span> milvus-<span class="hljs-keyword">text</span>-search <span class="hljs-keyword">from</span> milvus (local)

Here are the documents I found that mention machine learning:
[Results will appear here based <span class="hljs-keyword">on</span> your actual data]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-Cursor" class="common-anchor-header">Cursor verwenden<button data-href="#Using-Cursor" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Example-Creating-a-Collection" class="common-anchor-header">Beispiel: Erstellen einer Sammlung</h4><p>Im Composer von Cursor können Sie eine Anfrage stellen:</p>
<pre><code translate="no">Create a <span class="hljs-keyword">new</span> collection called <span class="hljs-string">&#x27;articles&#x27;</span> <span class="hljs-function"><span class="hljs-keyword">in</span> Milvus <span class="hljs-keyword">with</span> fields <span class="hljs-keyword">for</span> <span class="hljs-title">title</span> (<span class="hljs-params"><span class="hljs-built_in">string</span></span>), <span class="hljs-title">content</span> (<span class="hljs-params"><span class="hljs-built_in">string</span></span>), <span class="hljs-keyword">and</span> a vector <span class="hljs-title">field</span> (<span class="hljs-params"><span class="hljs-number">128</span> dimensions</span>)
</span><button class="copy-code-btn"></button></code></pre>
<p>Cursor wird den MCP-Server verwenden, um diesen Vorgang auszuführen:</p>
<pre><code translate="no">I<span class="hljs-comment">&#x27;ll create a new collection called &#x27;articles&#x27; with the specified fields.</span>

&gt; View result <span class="hljs-keyword">from</span> milvus-create-collection <span class="hljs-keyword">from</span> milvus (local)

Collection <span class="hljs-comment">&#x27;articles&#x27; has been created successfully with the following schema:</span>
- title: <span class="hljs-type">string</span>
- content: <span class="hljs-type">string</span>
- vector: float vector[<span class="hljs-number">128</span>]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Troubleshooting" class="common-anchor-header">Fehlersuche<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Common-Issues" class="common-anchor-header">Häufige Probleme<button data-href="#Common-Issues" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Connection-Errors" class="common-anchor-header">Verbindungsfehler</h4><p>Wenn Sie Fehler wie "Failed to connect to Milvus server" sehen:</p>
<ol>
<li>Überprüfen Sie, ob Ihre Milvus-Instanz ausgeführt wird: <code translate="no">docker ps</code> (bei Verwendung von Docker)</li>
<li>Überprüfen Sie, ob der URI in Ihrer Konfiguration korrekt ist.</li>
<li>Stellen Sie sicher, dass die Verbindung nicht durch Firewall-Regeln blockiert wird.</li>
<li>Versuchen Sie, <code translate="no">127.0.0.1</code> anstelle von <code translate="no">localhost</code> im URI zu verwenden.</li>
</ol>
<h4 id="Authentication-Issues" class="common-anchor-header">Probleme mit der Authentifizierung</h4><p>Wenn Sie Authentifizierungsfehler sehen:</p>
<ol>
<li>Überprüfen Sie, ob Ihre <code translate="no">MILVUS_TOKEN</code> korrekt ist.</li>
<li>Prüfen Sie, ob Ihre Milvus-Instanz eine Authentifizierung erfordert</li>
<li>Vergewissern Sie sich, dass Sie die richtigen Berechtigungen für die Vorgänge haben, die Sie durchführen möchten.</li>
</ol>
<h4 id="Tool-Not-Found" class="common-anchor-header">Werkzeug nicht gefunden</h4><p>Wenn die MCP-Tools nicht in Claude Desktop oder Cursor angezeigt werden:</p>
<ol>
<li>Starten Sie die Anwendung neu</li>
<li>Prüfen Sie die Serverprotokolle auf eventuelle Fehler</li>
<li>Überprüfen Sie, ob der MCP-Server korrekt läuft.</li>
<li>Drücken Sie die Aktualisierungsschaltfläche in den MCP-Einstellungen (für Cursor)</li>
</ol>
<h3 id="Getting-Help" class="common-anchor-header">Hilfe erhalten<button data-href="#Getting-Help" class="anchor-icon" translate="no">
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
    </button></h3><p>Wenn Sie weiterhin Probleme haben:</p>
<ol>
<li>Überprüfen Sie die <a href="https://github.com/zilliztech/mcp-server-milvus/issues">GitHub Issues</a> auf ähnliche Probleme</li>
<li>Treten Sie dem <a href="https://discord.gg/zilliz">Zilliz Community Discord</a> bei, um Unterstützung zu erhalten</li>
<li>Erstelle einen neuen Issue mit detaillierten Informationen zu deinem Problem</li>
</ol>
<h2 id="Conclusion" class="common-anchor-header">Schlussfolgerung<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Mit diesem Tutorial haben Sie nun einen <strong>MCP-Server</strong> in Betrieb genommen, der die KI-gestützte Vektorsuche in Milvus ermöglicht. Unabhängig davon, ob Sie <strong>Claude Desktop</strong> oder <strong>Cursor</strong> verwenden, können Sie jetzt Ihre Milvus-Datenbank mit <strong>natürlichsprachlichen Befehlen</strong>abfragen, verwalten und durchsuchen <strong>- ohne</strong>Datenbankcode zu schreiben!</p>
