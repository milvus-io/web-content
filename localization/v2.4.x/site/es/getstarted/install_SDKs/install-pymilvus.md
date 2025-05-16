---
id: install-pymilvus.md
label: Install PyMilvus
related_key: SDK
summary: Aprenda a instalar el SDK Python de Milvus.
title: Instalar Milvus Python SDK
---
<h1 id="Install-Milvus-Python-SDK" class="common-anchor-header">Instalar Milvus Python SDK<button data-href="#Install-Milvus-Python-SDK" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tema describe cómo instalar Milvus python SDK pymilvus para Milvus.</p>
<p>La versión actual de Milvus soporta SDKs en Python, Node.js, GO, y Java.</p>
<h2 id="Requirements" class="common-anchor-header">Requisitos<button data-href="#Requirements" class="anchor-icon" translate="no">
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
<li>Se requiere Python 3.7 o posterior.</li>
<li>Google protobuf está instalado. Puede instalarlo con el comando <code translate="no">pip3 install protobuf==3.20.0</code>.</li>
<li>grpcio-tools está instalado. Puedes instalarlo con el comando <code translate="no">pip3 install grpcio-tools</code>.</li>
</ul>
<h2 id="Install-PyMilvus-via-pip" class="common-anchor-header">Instalar PyMilvus mediante pip<button data-href="#Install-PyMilvus-via-pip" class="anchor-icon" translate="no">
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
    </button></h2><p>PyMilvus está disponible en <a href="https://pypi.org/project/pymilvus/">Python Package Index</a>.</p>
<div class="alert note">
Se recomienda instalar una versión de PyMilvus que coincida con la versión del servidor Milvus que ha instalado. Para más información, consulte <a href="/docs/es/v2.4.x/release_notes.md">las Notas de la versión</a>.</div>
<pre><code translate="no">$ python3 -m pip install pymilvus==2.4.15
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-installation" class="common-anchor-header">Verifique la instalación<button data-href="#Verify-installation" class="anchor-icon" translate="no">
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
    </button></h2><p>Si PyMilvus está correctamente instalado, no se producirá ninguna excepción cuando ejecute el siguiente comando.</p>
<pre><code translate="no">$ python3 -c <span class="hljs-string">&quot;from pymilvus import Collection&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">A continuación<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez instalado PyMilvus, puede:</p>
<ul>
<li><p>Aprender las operaciones básicas de Milvus:</p>
<ul>
<li><a href="/docs/es/v2.4.x/manage-collections.md">Gestionar Colecciones</a></li>
<li><a href="/docs/es/v2.4.x/manage-partitions.md">Gestionar Particiones</a></li>
<li><a href="/docs/es/v2.4.x/insert-update-delete.md">Insertar, Subinsertar y Borrar</a></li>
<li><a href="/docs/es/v2.4.x/single-vector-search.md">Búsqueda en un solo vector</a></li>
<li><a href="/docs/es/v2.4.x/multi-vector-search.md">Búsqueda Híbrida</a></li>
</ul></li>
<li><p>Explorar <a href="/api-reference/pymilvus/v2.4.x/About.md">la referencia API de PyMilvus</a></p></li>
</ul>
