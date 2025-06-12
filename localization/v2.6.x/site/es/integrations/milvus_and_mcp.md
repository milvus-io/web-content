---
id: milvus_and_mcp.md
summary: >-
  Este tutorial le guiará a través de la configuración de un servidor MCP para
  Milvus, permitiendo que las aplicaciones de IA realicen búsquedas vectoriales,
  gestionen colecciones y recuperen datos utilizando comandos de lenguaje
  natural, sin necesidad de escribir consultas personalizadas a la base de
  datos.
title: 'MCP + Milvus: Conectar la IA con las bases de datos vectoriales'
---
<h1 id="MCP-+-Milvus-Connecting-AI-with-Vector-Databases" class="common-anchor-header">MCP + Milvus: Conectar la IA con las bases de datos vectoriales<button data-href="#MCP-+-Milvus-Connecting-AI-with-Vector-Databases" class="anchor-icon" translate="no">
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
<h2 id="Introduction" class="common-anchor-header">Introducción<button data-href="#Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p>El <strong>Model Context Protocol (MCP)</strong> es un protocolo abierto que permite a las aplicaciones de IA, como Claude y Cursor, interactuar con fuentes de datos y herramientas externas sin problemas. Tanto si está creando aplicaciones de IA personalizadas, integrando flujos de trabajo de IA o mejorando interfaces de chat, MCP proporciona una forma estandarizada de conectar grandes modelos lingüísticos (LLM) con datos contextuales relevantes.</p>
<p>Este tutorial le guía a través de la <strong>configuración de un servidor MCP para Milvus</strong>, permitiendo que las aplicaciones de IA realicen búsquedas vectoriales, gestionen colecciones y recuperen datos utilizando <strong>comandos de lenguaje natural, sin</strong>escribir consultas personalizadas a bases de datos.</p>
<h2 id="Prerequisites" class="common-anchor-header">Requisitos previos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de configurar el servidor MCP, asegúrese de tener:</p>
<ul>
<li>Python 3.10 o superior</li>
<li>Una instancia de <a href="https://milvus.io/">Milvus</a> en ejecución</li>
<li><a href="https://github.com/astral-sh/uv">uv</a> (recomendado para ejecutar el servidor)</li>
</ul>
<h2 id="Getting-Started" class="common-anchor-header">Primeros pasos<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><p>La forma recomendada de utilizar este servidor MCP es ejecutarlo directamente con uv sin instalación. Así es como tanto Claude Desktop como Cursor están configurados para usarlo en los ejemplos de abajo.</p>
<p>Si desea clonar el repositorio:</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/zilliztech/mcp-server-milvus.git
<span class="hljs-built_in">cd</span> mcp-server-milvus
<button class="copy-code-btn"></button></code></pre>
<p>Entonces puede ejecutar el servidor directamente:</p>
<pre><code translate="no" class="language-bash">uv run src/mcp_server_milvus/server.py --milvus-uri http://localhost:19530
<button class="copy-code-btn"></button></code></pre>
<h2 id="Supported-Applications" class="common-anchor-header">Aplicaciones soportadas<button data-href="#Supported-Applications" class="anchor-icon" translate="no">
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
    </button></h2><p>Este servidor MCP puede ser utilizado con varias aplicaciones de IA que soportan el Protocolo de Contexto de Modelo, tales como:</p>
<ul>
<li><strong>Claude Desktop</strong>: La aplicación de escritorio de Anthropic para Claude</li>
<li><strong>Cursor</strong>: Editor de código basado en IA con soporte MCP en su función Composer.</li>
<li><strong>Otros clientes MCP personalizados</strong> Cualquier aplicación que implemente la especificación de cliente MCP</li>
</ul>
<h2 id="Using-MCP-with-Claude-Desktop" class="common-anchor-header">Uso de MCP con Claude Desktop<button data-href="#Using-MCP-with-Claude-Desktop" class="anchor-icon" translate="no">
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
<li>Instale <a href="https://claude.ai/download">Claude Desktop</a>.</li>
<li>Abra el archivo de configuración de Claude:<ul>
<li>En macOS: <code translate="no">~/Library/Application Support/Claude/claude_desktop_config.json</code></li>
</ul></li>
<li>Añada la siguiente configuración:</li>
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
<li>Reinicie Claude Desktop para aplicar los cambios.</li>
</ol>
<h2 id="Using-MCP-with-Cursor" class="common-anchor-header">Uso de MCP con Cursor<button data-href="#Using-MCP-with-Cursor" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://docs.cursor.com/context/model-context-protocol">Cursor</a> también soporta herramientas MCP a través de su función de Agente en Composer. Puede añadir el servidor Milvus MCP a Cursor de dos maneras:</p>
<h3 id="Option-1-Using-Cursor-Settings-UI" class="common-anchor-header">Opción 1: Utilizando la interfaz de usuario de configuración de Cursor.</h3><ol>
<li>Abra <code translate="no">Cursor Settings</code> → <code translate="no">Features</code> → <code translate="no">MCP</code>.</li>
<li>Haga clic en <code translate="no">+ Add New MCP Server</code>.</li>
<li>Rellene:<ul>
<li>Tipo: <code translate="no">stdio</code></li>
<li>Nombre: <code translate="no">milvus</code></li>
<li>Comando:<pre><code translate="no" class="language-bash">/PATH/TO/uv --directory /path/to/mcp-server-milvus/src/mcp_server_milvus run server.py --milvus-uri http://127.0.0.1:19530
<button class="copy-code-btn"></button></code></pre></li>
<li>⚠️ Consejo: Utilice <code translate="no">127.0.0.1</code> en lugar de <code translate="no">localhost</code> para evitar posibles problemas de resolución DNS.</li>
</ul></li>
</ol>
<h3 id="Option-2-Using-Project-specific-Configuration-Recommended" class="common-anchor-header">Opción 2: Utilizar la configuración específica del proyecto (recomendado)</h3><ol>
<li>Cree un archivo <code translate="no">.cursor/mcp.json</code> en el <strong>directorio raíz de</strong> su <strong>proyecto</strong>:</li>
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
<li>Reinicie Cursor para aplicar la configuración.</li>
</ol>
<p>Después de añadir el servidor, es posible que tenga que pulsar el botón de actualización en la configuración de MCP para rellenar la lista de herramientas. El Agente Compositor utilizará automáticamente las herramientas Milvus cuando sean relevantes para sus consultas.</p>
<h2 id="Verifying-the-Integration" class="common-anchor-header">Verificación de la integración<button data-href="#Verifying-the-Integration" class="anchor-icon" translate="no">
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
    </button></h2><p>Para asegurarse de que el servidor MCP está correctamente configurado:</p>
<h3 id="For-Cursor" class="common-anchor-header">Para Cursor</h3><ol>
<li>Vaya a <code translate="no">Cursor Settings</code> → <code translate="no">Features</code> → <code translate="no">MCP</code>.</li>
<li>Confirme que <code translate="no">&quot;Milvus&quot;</code> aparece en la lista de servidores MCP.</li>
<li>Compruebe si las herramientas Milvus (por ejemplo, <code translate="no">milvus_list_collections</code>, <code translate="no">milvus_vector_search</code>) aparecen en la lista.</li>
<li>Si aparecen errores, consulte la sección <strong>Solución de problemas</strong> a continuación.</li>
</ol>
<h2 id="MCP-Server-Tools-for-Milvus" class="common-anchor-header">Herramientas del servidor MCP para Milvus<button data-href="#MCP-Server-Tools-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Este servidor MCP proporciona múltiples herramientas para <strong>buscar, consultar y gestionar datos vectoriales en Milvus</strong>. Para más detalles, consulte la documentación <a href="https://github.com/zilliztech/mcp-server-milvus">mcp-server-milvus</a>.</p>
<h3 id="🔍-Search-and-Query-Tools" class="common-anchor-header">🔍 Herramientas de búsqueda y consulta</h3><ul>
<li><strong><code translate="no">milvus-text-search</code></strong> → Buscar documentos utilizando la búsqueda de texto completo.</li>
<li><strong><code translate="no">milvus-vector-search</code></strong> → Realizar búsqueda por similitud vectorial en una colección.</li>
<li><strong><code translate="no">milvus-hybrid-search</code></strong> → Realizar búsqueda híbrida combinando similitud vectorial y filtrado por atributos.</li>
<li><strong><code translate="no">milvus-multi-vector-search</code></strong> → Realizar búsqueda de similitud vectorial con múltiples vectores de consulta.</li>
<li><strong><code translate="no">milvus-query</code></strong> → Consultar la colección utilizando expresiones de filtro.</li>
<li><strong><code translate="no">milvus-count</code></strong> → Contar entidades en una colección.</li>
</ul>
<h3 id="📁-Collection-Management" class="common-anchor-header">📁 Gestión de colecciones</h3><ul>
<li><strong><code translate="no">milvus-list-collections</code></strong> → Listar todas las colecciones de la base de datos.</li>
<li><strong><code translate="no">milvus-collection-info</code></strong> → Obtener información detallada sobre una colección.</li>
<li><strong><code translate="no">milvus-get-collection-stats</code></strong> → Obtener estadísticas sobre una colección.</li>
<li><strong><code translate="no">milvus-create-collection</code></strong> → Crear una nueva colección con el esquema especificado.</li>
<li><strong><code translate="no">milvus-load-collection</code></strong> → Cargar una colección en memoria para búsqueda y consulta.</li>
<li><strong><code translate="no">milvus-release-collection</code></strong> → Liberar una colección de la memoria.</li>
<li><strong><code translate="no">milvus-get-query-segment-info</code></strong> → Obtener información sobre segmentos de consulta.</li>
<li><strong><code translate="no">milvus-get-collection-loading-progress</code></strong> → Obtener el progreso de carga de una colección.</li>
</ul>
<h3 id="📊-Data-Operations" class="common-anchor-header">📊 Operaciones con datos</h3><ul>
<li><strong><code translate="no">milvus-insert-data</code></strong> → Insertar datos en una colección.</li>
<li><strong><code translate="no">milvus-bulk-insert</code></strong> → Insertar datos en lotes para mejorar el rendimiento.</li>
<li><strong><code translate="no">milvus-upsert-data</code></strong> → Volver a insertar datos en una colección (insertar o actualizar si existe).</li>
<li><strong><code translate="no">milvus-delete-entities</code></strong> → Eliminar entidades de una colección en función de una expresión de filtro.</li>
<li><strong><code translate="no">milvus-create-dynamic-field</code></strong> → Añadir un campo dinámico a una colección existente.</li>
</ul>
<h3 id="⚙️-Index-Management" class="common-anchor-header">⚙️ Gestión de índices</h3><ul>
<li><strong><code translate="no">milvus-create-index</code></strong> → Crear un índice en un campo vectorial.</li>
<li><strong><code translate="no">milvus-get-index-info</code></strong> → Obtener información sobre índices en una colección.</li>
</ul>
<h2 id="Environment-Variables" class="common-anchor-header">Variables de entorno<button data-href="#Environment-Variables" class="anchor-icon" translate="no">
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
<li><strong><code translate="no">MILVUS_URI</code></strong> → URI del servidor Milvus (puede establecerse en lugar de <code translate="no">--milvus-uri</code>).</li>
<li><strong><code translate="no">MILVUS_TOKEN</code></strong> → Token de autenticación opcional.</li>
<li><strong><code translate="no">MILVUS_DB</code></strong> → Nombre de la base de datos (por defecto "default").</li>
</ul>
<h2 id="Development" class="common-anchor-header">Desarrollo<button data-href="#Development" class="anchor-icon" translate="no">
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
    </button></h2><p>Para ejecutar el servidor directamente:</p>
<pre><code translate="no" class="language-bash">uv run server.py --milvus-uri http://localhost:19530
<button class="copy-code-btn"></button></code></pre>
<h2 id="Examples" class="common-anchor-header">Ejemplos<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Using-Claude-Desktop" class="common-anchor-header">Utilizando Claude Desktop</h3><h4 id="Example-1-Listing-Collections" class="common-anchor-header">Ejemplo 1: Listado de colecciones</h4><pre><code translate="no">What are the collections <span class="hljs-selector-tag">I</span> have in my Milvus DB?
<button class="copy-code-btn"></button></code></pre>
<p>Claude utilizará MCP para comprobar esta información en nuestra base de datos Milvus.</p>
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
<h4 id="Example-2-Searching-for-Documents" class="common-anchor-header">Ejemplo 2: Búsqueda de documentos</h4><pre><code translate="no">Find documents in <span class="hljs-keyword">my</span> text_collection that mention <span class="hljs-string">&quot;machine learning&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Claude utilizará las capacidades de búsqueda de texto completo de Milvus para encontrar documentos relevantes:</p>
<pre><code translate="no">I<span class="hljs-comment">&#x27;ll search for documents about machine learning in your text_collection.</span>

&gt; View result <span class="hljs-keyword">from</span> milvus-<span class="hljs-keyword">text</span>-search <span class="hljs-keyword">from</span> milvus (local)

Here are the documents I found that mention machine learning:
[Results will appear here based <span class="hljs-keyword">on</span> your actual data]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-Cursor" class="common-anchor-header">Uso del cursor</h3><h4 id="Example-Creating-a-Collection" class="common-anchor-header">Ejemplo: Creación de una colección</h4><p>En el Compositor de Cursor, puede pedir:</p>
<pre><code translate="no">Create a <span class="hljs-keyword">new</span> collection called <span class="hljs-string">&#x27;articles&#x27;</span> <span class="hljs-function"><span class="hljs-keyword">in</span> Milvus <span class="hljs-keyword">with</span> fields <span class="hljs-keyword">for</span> <span class="hljs-title">title</span> (<span class="hljs-params"><span class="hljs-built_in">string</span></span>), <span class="hljs-title">content</span> (<span class="hljs-params"><span class="hljs-built_in">string</span></span>), <span class="hljs-keyword">and</span> a vector <span class="hljs-title">field</span> (<span class="hljs-params"><span class="hljs-number">128</span> dimensions</span>)
</span><button class="copy-code-btn"></button></code></pre>
<p>Cursor utilizará el servidor MCP para ejecutar esta operación:</p>
<pre><code translate="no">I<span class="hljs-comment">&#x27;ll create a new collection called &#x27;articles&#x27; with the specified fields.</span>

&gt; View result <span class="hljs-keyword">from</span> milvus-create-collection <span class="hljs-keyword">from</span> milvus (local)

Collection <span class="hljs-comment">&#x27;articles&#x27; has been created successfully with the following schema:</span>
- title: <span class="hljs-type">string</span>
- content: <span class="hljs-type">string</span>
- vector: float vector[<span class="hljs-number">128</span>]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Troubleshooting" class="common-anchor-header">Solución de problemas<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Common-Issues" class="common-anchor-header">Problemas Comunes</h3><h4 id="Connection-Errors" class="common-anchor-header">Errores de Conexión</h4><p>Si ve errores como "Failed to connect to Milvus server":</p>
<ol>
<li>Compruebe que su instancia de Milvus se está ejecutando: <code translate="no">docker ps</code> (si utiliza Docker)</li>
<li>Compruebe que el URI es correcto en su configuración</li>
<li>Asegúrese de que no hay reglas de firewall que bloqueen la conexión</li>
<li>Pruebe a utilizar <code translate="no">127.0.0.1</code> en lugar de <code translate="no">localhost</code> en el URI</li>
</ol>
<h4 id="Authentication-Issues" class="common-anchor-header">Problemas de autenticación</h4><p>Si ve errores de autenticación</p>
<ol>
<li>Verifique que su <code translate="no">MILVUS_TOKEN</code> es correcto</li>
<li>Compruebe si su instancia de Milvus requiere autenticación</li>
<li>Asegúrese de que tiene los permisos correctos para las operaciones que está intentando realizar</li>
</ol>
<h4 id="Tool-Not-Found" class="common-anchor-header">Herramienta no encontrada</h4><p>Si las herramientas MCP no aparecen en Claude Desktop o Cursor:</p>
<ol>
<li>Reinicie la aplicación</li>
<li>Compruebe si hay errores en los registros del servidor</li>
<li>Compruebe que el servidor MCP funciona correctamente</li>
<li>Pulse el botón de actualización en la configuración de MCP (para Cursor)</li>
</ol>
<h3 id="Getting-Help" class="common-anchor-header">Obtener ayuda</h3><p>Si sigues teniendo problemas</p>
<ol>
<li>Comprueba los <a href="https://github.com/zilliztech/mcp-server-milvus/issues">Problemas de GitHub</a> para problemas similares</li>
<li>Únete al <a href="https://discord.gg/zilliz">Discord de la Comunidad Zilliz</a> para obtener ayuda</li>
<li>Presenta una nueva incidencia con información detallada sobre tu problema</li>
</ol>
<h2 id="Conclusion" class="common-anchor-header">Conclusión<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Siguiendo este tutorial, ahora tiene un <strong>servidor MCP</strong> funcionando, habilitando la búsqueda vectorial potenciada por IA en Milvus. Ya sea que esté utilizando <strong>Claude Desktop</strong> o <strong>Cursor</strong>, ahora puede consultar, administrar y buscar en su base de datos Milvus utilizando <strong>comandos de lenguaje natural, ¡sin</strong>escribir código de base de datos!</p>
