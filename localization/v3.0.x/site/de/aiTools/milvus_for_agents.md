---
id: milvus_for_agents.md
title: Milvus für KI-Agenten
summary: >-
  Erfahren Sie, wie KI-Agenten Milvus als Vektordatenbank für RAG, semantische
  Suche und Langzeitgedächtnis nutzen können.
---
<h1 id="Milvus-for-AI-Agents" class="common-anchor-header">Milvus für KI-Agenten<button data-href="#Milvus-for-AI-Agents" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus bietet agentenfreundliche Schnittstellen, die es KI-Codieragenten und autonomen Agentensystemen ermöglichen, programmatisch mit Vektordatenbanken zu interagieren. Egal, ob Sie RAG-Pipelines, semantische Suche oder Agentenspeichersysteme aufbauen, Milvus bietet mehrere Möglichkeiten für Agenten, sich zu verbinden und zu arbeiten.</p>
<h2 id="Agent-tools" class="common-anchor-header">Agenten-Tools<button data-href="#Agent-tools" class="anchor-icon" translate="no">
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
    </button></h2><div class="card-wrapper">
<div class="start_card_container">
  <a href="https://github.com/zilliztech/milvus-skill" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Milvus-Fähigkeit</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Ein Agentenskill für Claude Code, der LLMs lehrt, PyMilvus für Vektordatenbankoperationen zu verwenden.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/mcp-server-milvus" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">MCP-Server</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Model Context Protocol Server, der jeden MCP-kompatiblen Agenten direkt mit Milvus interagieren lässt.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/claude-context" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Claude-Kontext-MCP</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">MCP-Server für Claude Code, der kontextabhängigen Zugriff auf die Milvus-Dokumentation ermöglicht.</p>
  </a>
</div>
</div>
<h2 id="AI-prompts" class="common-anchor-header">KI-Eingabeaufforderungen<button data-href="#AI-prompts" class="anchor-icon" translate="no">
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
    </button></h2><p>Kuratierte Prompts, die KI-Codierassistenten helfen, korrekten Milvus-Code zu schreiben. Jeder Prompt kodiert die Regeln und Muster, die die häufigsten Fehler verhindern.</p>
<p><strong>Wie man sie benutzt:</strong></p>
<ol>
<li><strong>Kopieren Sie</strong> einen Prompt aus dem Abschnitt "Vollständiger Prompt" auf einer beliebigen Prompt-Seite.</li>
<li><strong>Speichern Sie</strong> sie in der Datei, die Ihr KI-Tool erwartet (siehe <a href="#use-in-different-environments">Umgebungstabelle</a> unten).</li>
<li>Ihr KI-Assistent wird die Regeln automatisch anwenden, wenn er Milvus-Code generiert oder überprüft.</li>
</ol>
<h3 id="Prompt-pages" class="common-anchor-header">Prompt-Seiten<button data-href="#Prompt-pages" class="anchor-icon" translate="no">
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
    </button></h3><div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/de/agents_overview.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">AGENTS.md</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Top-Level-Regeln für jeden KI-Codieragenten. Beginnen Sie hier, wenn Sie nur eine Datei benötigen.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/de/python_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Python SDK</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Korrekte Verbindungsmuster, Verwendung von MilvusClient und Verbot von ORM-APIs.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/de/schema_design.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Schema-Entwurf</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Feldtypen, Primärschlüssel, Unveränderlichkeit des Schemas und BM25-Konfiguration.</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/de/search_patterns.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Suchmuster</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">ANN-, Hybrid- und Volltextsuche mit kritischen Beschränkungsregeln.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/de/index_selection.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Index-Auswahl</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Entscheidungsbaum für AUTOINDEX, HNSW, DiskANN und IVF_FLAT.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/de/rag_pipeline.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">RAG-Pipeline</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">End-to-End Retrieval-augmentierter Generierungsfluss mit Milvus.</p>
  </a>
</div>
</div>
<h3 id="Use-in-different-environments" class="common-anchor-header">Einsatz in verschiedenen Umgebungen<button data-href="#Use-in-different-environments" class="anchor-icon" translate="no">
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
    </button></h3><table>
<thead>
<tr><th>Umgebung</th><th>Wo soll der Prompt platziert werden?</th><th>Anweisungen</th></tr>
</thead>
<tbody>
<tr><td>Cursor</td><td><code translate="no">.cursor/rules/*.md</code></td><td><a href="https://docs.cursor.com/en/context/rules">Projektregeln konfigurieren</a></td></tr>
<tr><td>GitHub Copilot</td><td><code translate="no">.github/copilot-instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions">Benutzerdefinierte Anweisungen</a></td></tr>
<tr><td>Claude Code</td><td><code translate="no">CLAUDE.md</code></td><td><a href="https://docs.anthropic.com/en/docs/claude-code/overview">Claude Code-Dokumente</a></td></tr>
<tr><td>JetBrains-IDEs</td><td><code translate="no">guidelines.md</code></td><td><a href="https://www.jetbrains.com/help/junie/customize-guidelines.html">Anleitungen anpassen</a></td></tr>
<tr><td>Gemini CLI</td><td><code translate="no">GEMINI.md</code></td><td><a href="https://codelabs.developers.google.com/gemini-cli-hands-on">Gemini CLI-Codelab</a></td></tr>
<tr><td>VS-Code</td><td><code translate="no">.instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization">Anleitungen.md konfigurieren</a></td></tr>
<tr><td>Windsurf</td><td><code translate="no">guidelines.md</code></td><td><a href="https://docs.windsurf.com/windsurf/customize">Richtlinien konfigurieren.md</a></td></tr>
</tbody>
</table>
<h2 id="Recommended-deployment-for-agents" class="common-anchor-header">Empfohlener Einsatz für Agenten<button data-href="#Recommended-deployment-for-agents" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Wahl des richtigen Milvus-Einsatzes hängt von Ihrem Entwicklungsstadium ab.</p>
<table>
<thead>
<tr><th>Stufe</th><th>Einsatz</th><th>Warum</th></tr>
</thead>
<tbody>
<tr><td>Prototyping</td><td><a href="/docs/de/milvus_lite.md">Milvus Lite</a></td><td>Null-Konfiguration, prozessbegleitend. Läuft überall, wo Python läuft - ideal für Rapid Agent Prototyping.</td></tr>
<tr><td>Entwicklung</td><td><a href="/docs/de/install_standalone-docker.md">Milvus Eigenständig</a></td><td>Einzelknoten-Docker-Bereitstellung. Gut geeignet für lokale Entwicklung und Tests mit realistischen Datenmengen.</td></tr>
<tr><td>Produktion</td><td><a href="https://cloud.zilliz.com/signup">Zilliz Cloud</a></td><td>Vollständig verwaltetes, serverloses Milvus. Keine zu verwaltende Infrastruktur - Agenten verbinden sich einfach und arbeiten.</td></tr>
<tr><td>Selbstgehostete Produktion</td><td><a href="/docs/de/install_cluster-helm.md">Milvus Verteilt</a></td><td>Kubernetes-Bereitstellung mit mehreren Knoten für Teams, die volle Kontrolle über ihre Infrastruktur benötigen.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Für Agenten-Workloads wird <strong><a href="https://zilliz.com/cloud">Zilliz Cloud</a></strong> für den Produktionseinsatz empfohlen. Agenten verwalten in der Regel keine Infrastruktur, sodass eine serverlose Bereitstellung den betrieblichen Overhead eliminiert und eine automatische Skalierung ermöglicht.</p>
</div>
