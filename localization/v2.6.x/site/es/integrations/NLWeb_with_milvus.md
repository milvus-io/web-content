---
id: NLWeb_with_milvus.md
summary: >-
  Aprenda a integrar Microsoft NLWeb con Milvus para crear potentes interfaces
  de lenguaje natural para sitios web. Este tutorial demuestra cómo aprovechar
  las capacidades de la base de datos vectorial de Milvus para una búsqueda
  semántica eficiente, el almacenamiento incrustado y la recuperación de
  contexto en aplicaciones NLWeb.
title: Uso de NLWeb con Milvus
---
<h1 id="Using-NLWeb-with-Milvus" class="common-anchor-header">Uso de NLWeb con Milvus<button data-href="#Using-NLWeb-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/microsoft/NLWeb">NLWeb de Microsoft</a> es un marco propuesto que permite interfaces de lenguaje natural para sitios web, utilizando <a href="https://schema.org/">Schema.org</a>, formatos como RSS y el emergente protocolo MCP.</p>
<p><a href="https://milvus.io/">Milvus</a> es compatible como backend de base de datos vectorial dentro de NLWeb para incrustar almacenamiento y búsqueda eficiente de similitud vectorial, permitiendo una potente recuperación de contexto para aplicaciones de procesamiento de lenguaje natural.</p>
<blockquote>
<p>Esta documentación se basa principalmente en la documentación oficial <a href="https://github.com/microsoft/NLWeb/blob/main/HelloWorld.md">de inicio rápido</a>. Si encuentra algún contenido desactualizado o inconsistente, por favor priorice la documentación oficial y no dude en plantearnos un problema.</p>
</blockquote>
<h2 id="Usage" class="common-anchor-header">Uso<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>NLWeb puede configurarse para utilizar Milvus como motor de recuperación. A continuación encontrará una guía sobre cómo configurar y utilizar NLWeb con Milvus.</p>
<h3 id="Installation" class="common-anchor-header">Instalación</h3><p>Clone el repositorio y configure su entorno:</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/microsoft/NLWeb
<span class="hljs-built_in">cd</span> NLWeb
python -m venv .venv
<span class="hljs-built_in">source</span> .venv/bin/activate  <span class="hljs-comment"># or `.venv\Scripts\activate` on Windows</span>
<span class="hljs-built_in">cd</span> code
pip install -r requirements.txt
pip install pymilvus  <span class="hljs-comment"># Add Milvus Python client</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuring-Milvus" class="common-anchor-header">Configuración de Milvus</h3><p>Para utilizar <strong>Milvus</strong>, actualice su configuración.</p>
<h4 id="Update-config-files-in-codeconfig" class="common-anchor-header">Actualice los archivos de configuración en <code translate="no">code/config</code></h4><p>Abra el archivo <code translate="no">config_retrieval.yaml</code> y añada la configuración de Milvus:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">preferred_endpoint:</span> <span class="hljs-string">milvus_local</span>

<span class="hljs-attr">endpoints:</span>
  <span class="hljs-attr">milvus_local:</span>
    <span class="hljs-attr">database_path:</span> <span class="hljs-string">&quot;../data/milvus.db&quot;</span>
    <span class="hljs-comment"># Set the collection name to use</span>
    <span class="hljs-attr">index_name:</span> <span class="hljs-string">nlweb_collection</span>
    <span class="hljs-comment"># Specify the database type</span>
    <span class="hljs-attr">db_type:</span> <span class="hljs-string">milvus</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Loading-Data" class="common-anchor-header">Cargar datos</h3><p>Una vez configurado, cargue su contenido utilizando fuentes RSS.</p>
<p>Desde el directorio <code translate="no">code</code>:</p>
<pre><code translate="no" class="language-bash">python -m tools.db_load https://feeds.libsyn.com/121695/rss Behind-the-Tech
<button class="copy-code-btn"></button></code></pre>
<p>Esto incorporará el contenido a su colección Milvus, almacenando tanto los datos de texto como las incrustaciones vectoriales.</p>
<h3 id="Running-the-Server" class="common-anchor-header">Ejecutar el servidor</h3><p>Para iniciar NLWeb, desde el directorio <code translate="no">code</code>, ejecute:</p>
<pre><code translate="no" class="language-bash">python app-file.py
<button class="copy-code-btn"></button></code></pre>
<p>Ahora puede consultar su contenido mediante lenguaje natural utilizando la interfaz de usuario web en http://localhost:8000/ o directamente a través de la API REST compatible con MCP.</p>
<h2 id="Further-Reading" class="common-anchor-header">Más información<button data-href="#Further-Reading" class="anchor-icon" translate="no">
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
<li><a href="https://milvus.io/docs">Documentación de Milvus</a></li>
<li><a href="https://github.com/microsoft/NLWeb">Fuente NLWeb</a></li>
<li>Vida de una consulta de chat</li>
<li>Modificar el comportamiento cambiando los avisos</li>
<li>Modificación del flujo de control</li>
<li>Modificación de la interfaz de usuario</li>
</ul>
