---
id: milvus-sdk-helper-mcp.md
title: Guía del ayudante de código Milvus SDK
summary: '⚡️ ¡Configure una vez, aumente la eficiencia para siempre!'
---
<h1 id="Milvus-SDK-Code-Helper-Guide" class="common-anchor-header">Guía del ayudante de código Milvus SDK<button data-href="#Milvus-SDK-Code-Helper-Guide" class="anchor-icon" translate="no">
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
    </button></h1><h1 id="Overview" class="common-anchor-header">Visión general<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>⚡️ ¡Configure una vez, aumente la eficiencia para siempre!</p>
<p>¿Sigue frustrado por los resultados obsoletos de LLM? ¿Cansado de que LLM muestre contenido obsoleto incluso después de actualizar las versiones? Pruebe este mcp para resolver de una vez por todas el problema del desfase de información al desarrollar código relacionado con Milvus.</p>
<p>El Ayudante de Código SDK oficial de Milvus está ahora en línea - simplemente encuentre el IDE AI correspondiente, configúrelo una vez, y deje que AI escriba por usted el código Milvus <strong>recomendado oficialmente</strong>. ¡Despídase por completo de los frameworks obsoletos!</p>
<p>➡️ Salta ahora: <a href="#Quickstart">Inicio rápido</a></p>
<h1 id="Effect-display" class="common-anchor-header">Visualización de efectos<button data-href="#Effect-display" class="anchor-icon" translate="no">
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
    </button></h1><p>La siguiente figura compara los efectos de generar código con y sin el ayudante de código Milvus SDK. Si no se utiliza el ayudante de código Milvus SDK, el código escrito sigue el antiguo enfoque ORM SDK, que ya no se recomienda. A continuación se muestra una comparación de capturas de pantalla de código con y sin el ayudante de código MCP:</p>
<table>
   <tr>
     <th><p>Ayudante de código MCP <strong>activado</strong></p></th>
     <th><p>Ayudante de código MCP <strong>desactivado</strong></p></th>
   </tr>
   <tr>
     <td><p><img translate="no" width="400" src="/docs/v2.6.x/assets/code-helper-enabled.png" alt="Code Helper Enabled" /></p></td>
     <td><p><img translate="no" width="400"src="/docs/v2.6.x/assets/code-helper-disabled.png" alt="Code Helper Disabled" /></p></td>
   </tr>
   <tr>
     <td><p>Utilice la última interfaz MilvusClient recomendada oficialmente para crear una colección</p></td>
     <td><p>No se recomienda crear una colección utilizando la antigua interfaz ORM.</p></td>
   </tr>
</table>
<h1 id="Quickstart" class="common-anchor-header">Inicio rápido<button data-href="#Quickstart" class="anchor-icon" translate="no">
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
    </button></h1><p>Encuentre su IDE AI, configúrelo con un solo clic, y desbloquee un viaje de codificación sin preocupaciones.</p>
<h2 id="Cursor" class="common-anchor-header">Cursor<button data-href="#Cursor" class="anchor-icon" translate="no">
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
    </button></h2><p>Vaya a: <code translate="no">Settings</code> -&gt; <code translate="no">Cursor Settings</code> -&gt; <code translate="no">Tools &amp; Intergrations</code> -&gt; <code translate="no">Add new global MCP server</code></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/cursor-mcp-settings.png" alt="Cursor Mcp Settings" class="doc-image" id="cursor-mcp-settings" />
   </span> <span class="img-wrapper"> <span>Cursor Mcp Configuración</span> </span></p>
<p>El enfoque recomendado es pegar la siguiente configuración en tu archivo Cursor <code translate="no">~/.cursor/mcp.json</code>. También puede instalar un proyecto específico creando <code translate="no">.cursor/mcp.json</code> en su carpeta de proyecto. Vea <a href="https://docs.cursor.com/context/model-context-protocol">los documentos de Cursor M</a> CP para más información.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;sdk-code-helper&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://sdk.milvus.io/mcp/&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Accept&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text/event-stream&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Claude-Desktop" class="common-anchor-header">Escritorio Claude<button data-href="#Claude-Desktop" class="anchor-icon" translate="no">
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
    </button></h2><p>Agregue a su configuración Claude Desktop:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;sdk-code-helper&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://sdk.milvus.io/mcp/&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Accept&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text/event-stream&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Claude-Code" class="common-anchor-header">Claude Code<button data-href="#Claude-Code" class="anchor-icon" translate="no">
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
    </button></h2><p>Claude Code soporta añadir servidores MCP directamente a través de la configuración JSON, incluyendo servidores del tipo URL remota. Utilice el siguiente comando para añadir la configuración a Claude Code:</p>
<pre><code translate="no" class="language-sql">claude mcp <span class="hljs-keyword">add</span><span class="hljs-operator">-</span>json sdk<span class="hljs-operator">-</span>code<span class="hljs-operator">-</span>helper <span class="hljs-comment">--json &#x27;{</span>
  &quot;url&quot;: &quot;https://sdk.milvus.io/mcp/&quot;,
  &quot;headers&quot;: {
    &quot;Accept&quot;: &quot;text/event-stream&quot;
  }
}<span class="hljs-string">&#x27;
</span><button class="copy-code-btn"></button></code></pre>
<h2 id="Windsurf" class="common-anchor-header">Windsurf<button data-href="#Windsurf" class="anchor-icon" translate="no">
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
    </button></h2><p>Windsurf soporta configuración MCP a través de un archivo JSON. Añada la siguiente configuración a su configuración MCP Windsurf:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;sdk-code-helper&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://sdk.milvus.io/mcp/&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Accept&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text/event-stream&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="VS-Code" class="common-anchor-header">Código VS<button data-href="#VS-Code" class="anchor-icon" translate="no">
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
    </button></h2><p>El servidor MCP CodeIndexer puede utilizarse con VS Code a través de extensiones compatibles con MCP. Añada la siguiente configuración a los ajustes MCP de VS Code:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;sdk-code-helper&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://sdk.milvus.io/mcp/&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Accept&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text/event-stream&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Cherry-Studio" class="common-anchor-header">Cherry Studio<button data-href="#Cherry-Studio" class="anchor-icon" translate="no">
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
    </button></h2><p>Cherry Studio permite la configuración visual del servidor MCP a través de su interfaz de configuración. Aunque no admite directamente la configuración manual de JSON, puede agregar un nuevo servidor a través de la interfaz gráfica de usuario:</p>
<ol>
<li><p>Vaya a Configuración → Servidores MCP → Agregar servidor.</p></li>
<li><p>Rellene los detalles del servidor:</p>
<ul>
<li><p>Nombre: <code translate="no">sdk code helper</code></p></li>
<li><p>Tipo: <code translate="no">Streamable HTTP</code></p></li>
<li><p>URL: <code translate="no">https://sdk.milvus.io/mcp/</code></p></li>
<li><p>Cabeceras: <code translate="no">&quot;Accept&quot;: &quot;text/event-stream&quot;</code></p></li>
</ul></li>
<li><p>Guarde la configuración para activar el servidor.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/cherry-studio-mcp-settings.png" alt="Cherry Studio Mcp Settings" class="doc-image" id="cherry-studio-mcp-settings" />
   </span> <span class="img-wrapper"> <span>Configuración Mcp de Cherry Studio</span> </span></p>
<h2 id="Cline" class="common-anchor-header">Cline<button data-href="#Cline" class="anchor-icon" translate="no">
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
    </button></h2><p>Cline utiliza un archivo de configuración JSON para administrar los servidores MCP. Para integrar la configuración del servidor MCP proporcionada:</p>
<ol>
<li><p>Abra Cline y haga clic en el icono Servidores MCP en la barra de navegación superior.</p></li>
<li><p>Selecciona la pestaña Instalado y, a continuación, haz clic en Configuración avanzada de MCP.</p></li>
<li><p>En el archivo <code translate="no">cline_mcp_settings.json</code>, añada la siguiente configuración:</p></li>
</ol>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;sdk-code-helper&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://sdk.milvus.io/mcp/&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Accept&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text/event-stream&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Augment" class="common-anchor-header">Aumentar<button data-href="#Augment" class="anchor-icon" translate="no">
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
<li><p>Pulse Cmd/Ctrl Mayús P o vaya al menú hamburguesa del panel Aumento</p></li>
<li><p>Seleccione Editar configuración</p></li>
<li><p>En Avanzado, haga clic en Editar en settings.json</p></li>
<li><p>Añada la configuración del servidor a la matriz <code translate="no">mcpServers</code> en el objeto <code translate="no">augment.advanced</code>:</p></li>
</ol>
<pre><code translate="no" class="language-markdown">{
  &quot;mcpServers&quot;: {
<span class="hljs-code">    &quot;sdk-code-helper&quot;: {
      &quot;url&quot;: &quot;https://sdk.milvus.io/mcp/&quot;,
      &quot;headers&quot;: {
        &quot;Accept&quot;: &quot;text/event-stream&quot;
      }
    }
  }
}
</span><button class="copy-code-btn"></button></code></pre>
<h2 id="Gemini-CLI" class="common-anchor-header">Gemini CLI<button data-href="#Gemini-CLI" class="anchor-icon" translate="no">
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
    </button></h2><p>Gemini CLI requiere configuración manual a través de un archivo JSON:</p>
<ol>
<li><p>Cree o edite el archivo <code translate="no">~/.gemini/settings.json</code>.</p></li>
<li><p>Añada la siguiente configuración:</p></li>
</ol>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;sdk-code-helper&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://sdk.milvus.io/mcp/&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Accept&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text/event-stream&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<ol>
<li>Guarde el archivo y reinicie Gemini CLI para aplicar los cambios.</li>
</ol>
<h2 id="Roo-Code" class="common-anchor-header">Código Roo<button data-href="#Roo-Code" class="anchor-icon" translate="no">
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
    </button></h2><p>Código Roo</p>
<p>Roo Code utiliza un archivo de configuración JSON para los servidores MCP:</p>
<ol>
<li><p>Abra Roo Code y vaya a Settings → MCP Servers → Edit Global Config.</p></li>
<li><p>En el archivo <code translate="no">mcp_settings.json</code>, añada la siguiente configuración:</p></li>
</ol>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;sdk-code-helper&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://sdk.milvus.io/mcp/&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Accept&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text/event-stream&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<ol>
<li>Guarde el archivo para activar el servidor.</li>
</ol>
