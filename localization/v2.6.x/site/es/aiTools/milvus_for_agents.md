---
id: milvus_for_agents.md
title: Milvus para agentes de IA
summary: >-
  Aprenda cómo los agentes de IA pueden utilizar Milvus como base de datos
  vectorial para RAG, búsqueda semántica y memoria a largo plazo.
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
    </button></h1><p>Milvus proporciona interfaces amigables con los agentes que permiten a los agentes de codificación de IA y a los sistemas de agentes autónomos interactuar con bases de datos vectoriales mediante programación. Tanto si está construyendo canalizaciones RAG, búsquedas semánticas o sistemas de memoria de agentes, Milvus ofrece múltiples formas para que los agentes se conecten y operen.</p>
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
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Habilidad Milvus</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Una habilidad de agente para Claude Code que enseña a los LLM a utilizar PyMilvus para operaciones de bases de datos vectoriales.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/mcp-server-milvus" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Servidor MCP</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Servidor del Protocolo de Contexto de Modelo que permite a cualquier agente compatible con MCP interactuar con Milvus directamente.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/claude-context" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">MCP de Contexto Claude</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Servidor MCP diseñado para Claude Code, que proporciona acceso a la documentación de Milvus consciente del contexto.</p>
  </a>
</div>
</div>
<h2 id="AI-prompts" class="common-anchor-header">Avisos AI<button data-href="#AI-prompts" class="anchor-icon" translate="no">
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
    </button></h2><p>Indicaciones seleccionadas que ayudan a los asistentes de codificación de inteligencia artificial a escribir código Milvus correcto. Cada instrucción codifica las reglas y patrones que evitan los errores más comunes.</p>
<p><strong>Cómo utilizarlo:</strong></p>
<ol>
<li><strong>Copie</strong> una instrucción de la sección "Instrucción completa" de cualquier página de instrucciones.</li>
<li><strong>Guárdelo</strong> en el archivo que espera su herramienta de IA (véase <a href="#use-in-different-environments">la tabla de entornos</a> más abajo).</li>
<li>Su asistente de IA aplicará automáticamente las reglas cuando genere o revise código Milvus.</li>
</ol>
<h3 id="Prompt-pages" class="common-anchor-header">Páginas de instrucciones<button data-href="#Prompt-pages" class="anchor-icon" translate="no">
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
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">AGENTES.md</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Reglas de nivel superior para cualquier agente de codificación de IA. Empieza aquí si sólo quieres un archivo.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/es/python_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">SDK Python</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Patrones de conexión correctos, uso de MilvusClient y prohibición de API ORM.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/es/schema_design.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Diseño de esquemas</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Tipos de campo, claves primarias, inmutabilidad del esquema y configuración de BM25.</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/es/search_patterns.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Patrones de búsqueda</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Búsqueda RNA, híbrida y de texto completo con reglas de restricciones críticas.</p>
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
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Canal RAG</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Flujo de generación de extremo a extremo con Milvus.</p>
  </a>
</div>
</div>
<h3 id="Use-in-different-environments" class="common-anchor-header">Uso en distintos entornos<button data-href="#Use-in-different-environments" class="anchor-icon" translate="no">
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
<tr><th>Entorno</th><th>Dónde poner el prompt</th><th>Instrucciones</th></tr>
</thead>
<tbody>
<tr><td>Cursor</td><td><code translate="no">.cursor/rules/*.md</code></td><td><a href="https://docs.cursor.com/en/context/rules">Configurar las reglas del proyecto</a></td></tr>
<tr><td>Copiloto GitHub</td><td><code translate="no">.github/copilot-instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions">Instrucciones personalizadas</a></td></tr>
<tr><td>Código Claude</td><td><code translate="no">CLAUDE.md</code></td><td><a href="https://docs.anthropic.com/en/docs/claude-code/overview">Documentación de Claude Code</a></td></tr>
<tr><td>IDEs JetBrains</td><td><code translate="no">guidelines.md</code></td><td><a href="https://www.jetbrains.com/help/junie/customize-guidelines.html">Personalizar directrices</a></td></tr>
<tr><td>Gemini CLI</td><td><code translate="no">GEMINI.md</code></td><td><a href="https://codelabs.developers.google.com/gemini-cli-hands-on">Laboratorio de código Gemini CLI</a></td></tr>
<tr><td>Código VS</td><td><code translate="no">.instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization">Configurar .instructions.md</a></td></tr>
<tr><td>Windsurf</td><td><code translate="no">guidelines.md</code></td><td><a href="https://docs.windsurf.com/windsurf/customize">Configurar guidelines.md</a></td></tr>
</tbody>
</table>
<h2 id="Recommended-deployment-for-agents" class="common-anchor-header">Despliegue recomendado para agentes<button data-href="#Recommended-deployment-for-agents" class="anchor-icon" translate="no">
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
    </button></h2><p>La elección del despliegue adecuado de Milvus depende de su etapa de desarrollo.</p>
<table>
<thead>
<tr><th>Etapa</th><th>Despliegue</th><th>Por qué</th></tr>
</thead>
<tbody>
<tr><td>Creación de prototipos</td><td><a href="/docs/es/milvus_lite.md">Milvus Lite</a></td><td>Cero configuración, en proceso. Se ejecuta en cualquier lugar donde se ejecute Python - ideal para la creación rápida de prototipos de agentes.</td></tr>
<tr><td>Desarrollo</td><td><a href="/docs/es/install_standalone-docker.md">Milvus Independiente</a></td><td>Despliegue Docker de nodo único. Bueno para desarrollo local y pruebas con volúmenes de datos realistas.</td></tr>
<tr><td>Producción</td><td><a href="https://cloud.zilliz.com/signup">Nube Zilliz</a></td><td>Milvus totalmente gestionado y sin servidor. Sin infraestructura que gestionar: los agentes simplemente se conectan y operan.</td></tr>
<tr><td>Producción autoalojada</td><td><a href="/docs/es/install_cluster-helm.md">Milvus Distribuido</a></td><td>Despliegue Kubernetes multinodo para equipos que necesitan control total sobre su infraestructura.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Para cargas de trabajo de agentes, se recomienda <strong>Zilliz Cloud</strong> para uso en producción. Los agentes no suelen gestionar la infraestructura, por lo que un despliegue sin servidor elimina la sobrecarga operativa y proporciona escalado automático.</p>
</div>
