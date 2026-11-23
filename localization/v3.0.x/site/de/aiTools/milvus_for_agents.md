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
    </button></h1><p>Milvus bietet agentenfreundliche Schnittstellen, die es KI-Programmieragenten und autonomen Agentensystemen ermöglichen, programmgesteuert mit Vektordatenbanken zu interagieren. Ganz gleich, ob Sie RAG-Pipelines, semantische Suchfunktionen oder Agentenspeichersysteme entwickeln – Milvus bietet zahlreiche Möglichkeiten für die Anbindung und den Betrieb von Agenten.</p>
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
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Milvus-Skill</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Eine Agent-Funktion für Claude Code, die LLMs beibringt, PyMilvus für Operationen mit Vektordatenbanken zu nutzen.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/mcp-server-milvus" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">MCP-Server</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Model Context Protocol-Server, der es jedem MCP-kompatiblen Agenten ermöglicht, direkt mit Milvus zu interagieren.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/claude-context" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Claude Context MCP</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Ein speziell für Claude Code entwickelter MCP-Server, der einen kontextbezogenen Zugriff auf die Milvus-Dokumentation ermöglicht.</p>
  </a>
</div>
</div>
<h2 id="AI-prompts" class="common-anchor-header">KI-Prompts<button data-href="#AI-prompts" class="anchor-icon" translate="no">
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
    </button></h2><p>Sorgfältig zusammengestellte Eingabeaufforderungen, die KI-Programmierassistenten dabei helfen, korrekten Milvus-Code zu schreiben. Jede Eingabeaufforderung enthält die Regeln und Muster, die die häufigsten Fehler verhindern.</p>
<p><strong>So funktioniert es:</strong></p>
<ol>
<li><strong>Kopieren Sie</strong> eine Eingabeaufforderung aus dem Abschnitt „Vollständige Eingabeaufforderung“ auf einer beliebigen Eingabeaufforderungsseite.</li>
<li><strong>Speichern Sie</strong> ihn in dem Dateiformat, das Ihr KI-Tool erwartet (siehe <a href="#use-in-different-environments">Tabelle „Umgebungen“</a> unten).</li>
<li>Ihr KI-Assistent wendet die Regeln automatisch an, wenn er Milvus-Code generiert oder überprüft.</li>
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
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Regeln auf oberster Ebene für jeden KI-Codierungsagenten. Beginnen Sie hier, wenn Sie nur eine Datei wünschen.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/de/python_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Python-SDK</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Korrekte Verbindungsmuster, Verwendung von MilvusClient und Verbot der ORM-API.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/de/schema_design.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Schema-Design</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Feldtypen, Primärschlüssel, Unveränderlichkeit des Schemas und BM25-Konfiguration.</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/de/search_patterns.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Suchmuster</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">ANN-, Hybrid- und Volltextsuche mit kritischen Einschränkungsregeln.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/de/index_selection.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Indexauswahl</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Entscheidungsbaum für AUTOINDEX, HNSW, DiskANN und IVF_FLAT.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/de/rag_pipeline.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">RAG-Pipeline</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">End-to-End-Workflow zur abrufgestützten Generierung mit Milvus.</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/de/nodejs_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Node.js-SDK</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">MilvusClient-Methodenaufrufe, Felddefinitionen, Überprüfung des Antwortstatus und Formate der Suchergebnisse.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/de/go_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Go-SDK</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Go-SDK v3: Modulpfade, Verbindungszeitüberschreitungen, Laden von Sammlungen und Suchergebnismengen.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/de/restful_api.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">RESTful-API v2</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">v2-Endpunkte, „camelCase“-Anfragefelder, Überprüfung von Antwortcodes und Abfrage des Ladestatus.</p>
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
<tr><th>Umgebung</th><th>Wo soll die Eingabeaufforderung platziert werden?</th><th>Anweisungen</th></tr>
</thead>
<tbody>
<tr><td>Cursor</td><td><code translate="no">.cursor/rules/*.md</code></td><td><a href="https://docs.cursor.com/en/context/rules">Projektregeln konfigurieren</a></td></tr>
<tr><td>GitHub Copilot</td><td><code translate="no">.github/copilot-instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions">Benutzerdefinierte Anweisungen</a></td></tr>
<tr><td>Claude-Code</td><td><code translate="no">CLAUDE.md</code></td><td><a href="https://docs.anthropic.com/en/docs/claude-code/overview">Claude Code-Dokumentation</a></td></tr>
<tr><td>JetBrains-IDEs</td><td><code translate="no">guidelines.md</code></td><td><a href="https://www.jetbrains.com/help/junie/customize-guidelines.html">Richtlinien anpassen</a></td></tr>
<tr><td>Gemini CLI</td><td><code translate="no">GEMINI.md</code></td><td><a href="https://codelabs.developers.google.com/gemini-cli-hands-on">Gemini CLI-Codelab</a></td></tr>
<tr><td>VS Code</td><td><code translate="no">.instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization">.instructions.md konfigurieren</a></td></tr>
<tr><td>Windsurf</td><td><code translate="no">guidelines.md</code></td><td><a href="https://docs.windsurf.com/windsurf/customize">Konfigurieren von guidelines.md</a></td></tr>
</tbody>
</table>
<h2 id="Recommended-deployment-for-agents" class="common-anchor-header">Empfohlene Bereitstellung für Agenten<button data-href="#Recommended-deployment-for-agents" class="anchor-icon" translate="no">
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
    </button></h2><p>Die Wahl der richtigen Milvus-Bereitstellung hängt von Ihrer Entwicklungsphase ab.</p>
<table>
<thead>
<tr><th>Phase</th><th>Bereitstellung</th><th>Warum</th></tr>
</thead>
<tbody>
<tr><td>Prototyping</td><td><a href="/docs/de/milvus_lite.md">Milvus Lite</a></td><td>Keine Konfiguration erforderlich, läuft im laufenden Prozess. Läuft überall dort, wo Python läuft – ideal für die schnelle Erstellung von Agent-Prototypen.</td></tr>
<tr><td>Entwicklung</td><td><a href="/docs/de/install_standalone-docker.md">Milvus Standalone</a></td><td>Docker-Bereitstellung auf einem einzelnen Knoten. Gut geeignet für die lokale Entwicklung und das Testen mit realistischen Datenmengen.</td></tr>
<tr><td>Produktion</td><td><a href="https://cloud.zilliz.com/signup">Zilliz Cloud</a></td><td>Vollständig verwaltetes, serverloses Milvus. Keine Infrastruktur zu verwalten – Agenten verbinden sich einfach und laufen.</td></tr>
<tr><td>Selbst gehostete Produktion</td><td><a href="/docs/de/install_cluster-helm.md">Milvus Distributed</a></td><td>Kubernetes-Bereitstellung mit mehreren Knoten für Teams, die die volle Kontrolle über ihre Infrastruktur benötigen.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Für Agent-Workloads wird <strong><a href="https://zilliz.com/cloud">Zilliz Cloud</a></strong> für den Produktionseinsatz empfohlen. Da Agenten in der Regel keine Infrastruktur verwalten, entfallen bei einer serverlosen Bereitstellung der Betriebsaufwand und es wird eine automatische Skalierung bereitgestellt.</p>
</div>
