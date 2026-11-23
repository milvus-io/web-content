---
id: milvus_for_agents.md
title: Milvus para agentes de IA
summary: >-
  Descubre cómo los agentes de IA pueden utilizar Milvus como base de datos
  vectorial para RAG, la búsqueda semántica y la memoria a largo plazo.
---
<h1 id="Milvus-for-AI-Agents" class="common-anchor-header">Milvus para agentes de IA<button data-href="#Milvus-for-AI-Agents" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus ofrece interfaces adaptadas a los agentes que permiten a los agentes de programación de IA y a los sistemas de agentes autónomos interactuar con bases de datos vectoriales mediante programación. Tanto si estás desarrollando flujos de trabajo RAG, búsqueda semántica o sistemas de memoria para agentes, Milvus ofrece múltiples formas para que los agentes se conecten y funcionen.</p>
<h2 id="Agent-tools" class="common-anchor-header">Herramientas para agentes<button data-href="#Agent-tools" class="anchor-icon" translate="no">
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
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Habilidad de Milvus</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Una habilidad de agente para Claude Code que enseña a los modelos de lenguaje grande (LLM) a utilizar PyMilvus para realizar operaciones con bases de datos vectoriales.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/mcp-server-milvus" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Servidor MCP</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Servidor del Protocolo de Contexto de Modelos (MCP) que permite a cualquier agente compatible con MCP interactuar directamente con Milvus.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/claude-context" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">MCP de contexto de Claude</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Servidor MCP diseñado para Claude Code, que proporciona acceso a la documentación de Milvus con reconocimiento de contexto.</p>
  </a>
</div>
</div>
<h2 id="AI-prompts" class="common-anchor-header">Indicaciones de IA<button data-href="#AI-prompts" class="anchor-icon" translate="no">
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
    </button></h2><p>Indicaciones seleccionadas que ayudan a los asistentes de programación basados en IA a escribir código Milvus correcto. Cada indicación incorpora las reglas y patrones que evitan los errores más comunes.</p>
<p><strong>Cómo utilizarlo:</strong></p>
<ol>
<li><strong>Copia</strong> una indicación de la sección «Indicación completa» en cualquier página de indicaciones.</li>
<li><strong>Guárdala</strong> en el formato que requiera tu herramienta de IA (consulta <a href="#use-in-different-environments">la tabla de entornos</a> más abajo).</li>
<li>Tu asistente de IA aplicará automáticamente las reglas al generar o revisar código Milvus.</li>
</ol>
<h3 id="Prompt-pages" class="common-anchor-header">Páginas de indicaciones<button data-href="#Prompt-pages" class="anchor-icon" translate="no">
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
  <a href="/docs/es/agents_overview.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">AGENTS.md</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Reglas de nivel superior para cualquier agente de programación de IA. Empieza por aquí si solo quieres un archivo.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/es/python_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">SDK de Python</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Patrones de conexión correctos, uso de MilvusClient y prohibición del uso de la API ORM.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/es/schema_design.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Diseño del esquema</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Tipos de campo, claves primarias, inmutabilidad del esquema y configuración de BM25.</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/es/search_patterns.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Patrones de búsqueda</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Búsqueda ANN, híbrida y de texto completo con reglas de restricción críticas.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/es/index_selection.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Selección de índices</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Árbol de decisión para AUTOINDEX, HNSW, DiskANN e IVF_FLAT.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/es/rag_pipeline.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Flujo de trabajo RAG</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Flujo de generación reforzada por recuperación de extremo a extremo con Milvus.</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/es/nodejs_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">SDK de Node.js</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Llamadas a métodos de MilvusClient, definiciones de campos, comprobaciones del estado de las respuestas y formatos de los resultados de búsqueda.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/es/go_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">SDK de Go</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Rutas de módulos del SDK de Go v3, tiempos de espera de conexión, carga de colecciones y conjuntos de resultados de búsqueda.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/es/restful_api.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">API RESTful v2</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Puntos finales de la v2, campos de solicitud en camelCase, comprobaciones de códigos de respuesta y sondeo del estado de carga.</p>
  </a>
</div>
</div>
<h3 id="Use-in-different-environments" class="common-anchor-header">Uso en diferentes entornos<button data-href="#Use-in-different-environments" class="anchor-icon" translate="no">
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
<tr><th>Entorno</th><th>Dónde colocar el mensaje de solicitud</th><th>Instrucciones</th></tr>
</thead>
<tbody>
<tr><td>Cursor</td><td><code translate="no">.cursor/rules/*.md</code></td><td><a href="https://docs.cursor.com/en/context/rules">Configurar las reglas del proyecto</a></td></tr>
<tr><td>GitHub Copilot</td><td><code translate="no">.github/copilot-instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions">Instrucciones personalizadas</a></td></tr>
<tr><td>Claude Code</td><td><code translate="no">CLAUDE.md</code></td><td><a href="https://docs.anthropic.com/en/docs/claude-code/overview">Documentación de Claude Code</a></td></tr>
<tr><td>IDE de JetBrains</td><td><code translate="no">guidelines.md</code></td><td><a href="https://www.jetbrains.com/help/junie/customize-guidelines.html">Personalizar directrices</a></td></tr>
<tr><td>Gemini CLI</td><td><code translate="no">GEMINI.md</code></td><td><a href="https://codelabs.developers.google.com/gemini-cli-hands-on">Laboratorio de programación de Gemini CLI</a></td></tr>
<tr><td>VS Code</td><td><code translate="no">.instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization">Configurar .instructions.md</a></td></tr>
<tr><td>Windsurf</td><td><code translate="no">guidelines.md</code></td><td><a href="https://docs.windsurf.com/windsurf/customize">Configurar guidelines.md</a></td></tr>
</tbody>
</table>
<h2 id="Recommended-deployment-for-agents" class="common-anchor-header">Implementación recomendada para agentes<button data-href="#Recommended-deployment-for-agents" class="anchor-icon" translate="no">
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
    </button></h2><p>La elección de la implementación adecuada de Milvus depende de tu fase de desarrollo.</p>
<table>
<thead>
<tr><th>Fase</th><th>Implementación</th><th>Por qué</th></tr>
</thead>
<tbody>
<tr><td>Creación de prototipos</td><td><a href="/docs/es/milvus_lite.md">Milvus Lite</a></td><td>Sin configuración, en tiempo de ejecución. Funciona en cualquier entorno donde se ejecute Python: ideal para la creación rápida de prototipos de agentes.</td></tr>
<tr><td>Desarrollo</td><td><a href="/docs/es/install_standalone-docker.md">Milvus Standalone</a></td><td>Implementación en Docker de un solo nodo. Ideal para el desarrollo local y las pruebas con volúmenes de datos realistas.</td></tr>
<tr><td>Producción</td><td><a href="https://cloud.zilliz.com/signup">Zilliz Cloud</a></td><td>Milvus totalmente gestionado y sin servidores. No hay que gestionar ninguna infraestructura: los agentes simplemente se conectan y funcionan.</td></tr>
<tr><td>Producción autohospedada</td><td><a href="/docs/es/install_cluster-helm.md">Milvus Distribuido</a></td><td>Implementación de Kubernetes con múltiples nodos para equipos que necesitan un control total sobre su infraestructura.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Para las cargas de trabajo de los agentes, se recomienda <strong><a href="https://zilliz.com/cloud">Zilliz Cloud</a></strong> para su uso en producción. Los agentes no suelen gestionar la infraestructura, por lo que una implementación sin servidores elimina la sobrecarga operativa y proporciona un escalado automático.</p>
</div>
