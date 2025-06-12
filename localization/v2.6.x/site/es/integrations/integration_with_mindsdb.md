---
id: integration_with_mindsdb.md
summary: >-
  Este tutorial muestra cómo integrar Milvus con MindsDB, permitiéndole
  aprovechar las capacidades de IA de MindsDB con la funcionalidad de base de
  datos vectorial de Milvus a través de operaciones tipo SQL para gestionar y
  consultar incrustaciones vectoriales.
title: Integrar Milvus con MindsDB
---
<h1 id="Integrate-Milvus-with-MindsDB" class="common-anchor-header">Integrar Milvus con MindsDB<button data-href="#Integrate-Milvus-with-MindsDB" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://docs.mindsdb.com/what-is-mindsdb">MindsDB</a> es una potente herramienta para integrar aplicaciones de IA con diversas fuentes de datos empresariales. Actúa como un motor de consulta federado que pone orden en la dispersión de datos al tiempo que responde meticulosamente a las consultas a través de datos estructurados y no estructurados. Tanto si sus datos están dispersos en aplicaciones SaaS, bases de datos o almacenes de datos, MindsDB puede conectarlos y consultarlos todos utilizando SQL estándar. Cuenta con sistemas RAG autónomos de última generación a través de Bases de Conocimiento, soporta cientos de fuentes de datos, y proporciona opciones flexibles de despliegue desde el desarrollo local hasta entornos en la nube.</p>
<p>Este tutorial demuestra cómo integrar Milvus con MindsDB, permitiéndole aprovechar las capacidades de IA de MindsDB con la funcionalidad de base de datos vectorial de Milvus a través de operaciones similares a SQL para gestionar y consultar incrustaciones vectoriales.</p>
<div class="alert note">
<p>Este tutorial se refiere principalmente a la documentación oficial del <a href="https://github.com/mindsdb/mindsdb/tree/main/mindsdb/integrations/handlers/milvus_handler">MindsDB Milvus Handler</a>. Si encuentra alguna parte obsoleta en este tutorial, puede dar prioridad a seguir la documentación oficial y crear un problema para nosotros.</p>
</div>
<h2 id="Install-MindsDB" class="common-anchor-header">Instalar MindsDB<button data-href="#Install-MindsDB" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de empezar, instala MindsDB localmente vía <a href="https://docs.mindsdb.com/setup/self-hosted/docker">Docker</a> o <a href="https://docs.mindsdb.com/setup/self-hosted/docker-desktop">Docker Desktop</a>.</p>
<p>Antes de continuar, asegúrese de tener una sólida comprensión de los conceptos y operaciones fundamentales tanto de MindsDB como de Milvus.</p>
<h2 id="Arguments-Introduction" class="common-anchor-header">Introducción de Argumentos<button data-href="#Arguments-Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p>Los argumentos necesarios para establecer una conexión son:</p>
<ul>
<li><code translate="no">uri</code>: uri para la base de datos milvus, puede establecerse en el archivo local ".db" o en el servicio docker o en la nube</li>
<li><code translate="no">token</code>: token para soportar docker o servicio en la nube según la opción uri</li>
</ul>
<p>Los argumentos opcionales para establecer una conexión son:</p>
<p>Se utilizan para las consultas <code translate="no">SELECT</code>:</p>
<ul>
<li><code translate="no">search_default_limit</code>: límite por defecto a pasar en sentencias select (por defecto=100)</li>
<li><code translate="no">search_metric_type</code>: tipo de métrica utilizada para las búsquedas (por defecto="L2")</li>
<li><code translate="no">search_ignore_growing</code>si se deben ignorar los segmentos en crecimiento durante las búsquedas de similitud (por defecto = False)</li>
<li><code translate="no">search_params</code>: específico de <code translate="no">search_metric_type</code> (por defecto={"nprobe": 10})</li>
</ul>
<p>Se utilizan para las consultas de <code translate="no">CREATE</code>:</p>
<ul>
<li><code translate="no">create_auto_id</code>: si se debe generar automáticamente el identificador al insertar registros sin identificador (por defecto=False)</li>
<li><code translate="no">create_id_max_len</code>longitud máxima del campo de identificación al crear una tabla (por defecto = 64)</li>
<li><code translate="no">create_embedding_dim</code>dimensión de incrustación para crear una tabla (por defecto = 8)</li>
<li><code translate="no">create_dynamic_field</code>: si las tablas creadas tienen o no campos dinámicos (por defecto=True)</li>
<li><code translate="no">create_content_max_len</code>Longitud máxima de la columna de contenido (por defecto = 200)</li>
<li><code translate="no">create_content_default_value</code>valor por defecto de la columna de contenido (por defecto ='')</li>
<li><code translate="no">create_schema_description</code>descripción de los esquemas creados (por defecto ='')</li>
<li><code translate="no">create_alias</code>alias de los esquemas creados (por defecto='por defecto')</li>
<li><code translate="no">create_index_params</code>parámetros del índice creado en la columna de incrustaciones (por defecto = {})</li>
<li><code translate="no">create_index_metric_type</code>métrica utilizada para crear el índice (por defecto = 'L2')</li>
<li><code translate="no">create_index_type</code>: tipo de índice (por defecto='AUTOINDEX')</li>
</ul>
<h2 id="Usage" class="common-anchor-header">Utilización<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de continuar, asegúrese de que la versión de <code translate="no">pymilvus</code> es la misma que esta <a href="https://github.com/mindsdb/mindsdb/blob/main/mindsdb/integrations/handlers/milvus_handler/requirements.txt">versión anclada</a>. Si encuentra algún problema con la compatibilidad de versiones, puede hacer retroceder su versión de pymilvus, o personalizarla en este <a href="https://github.com/mindsdb/mindsdb/tree/main/mindsdb/integrations/handlers/milvus_handler">archivo de requisitos</a>.</p>
<h3 id="Creating-connection" class="common-anchor-header">Creación de la conexión</h3><p>Para hacer uso de este manejador y conectarse a un servidor Milvus en MindsDB, se puede utilizar la siguiente sintaxis:</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">CREATE</span> DATABASE milvus_datasource
<span class="hljs-keyword">WITH</span>
  ENGINE <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;milvus&#x27;</span>,
  PARAMETERS <span class="hljs-operator">=</span> {
    &quot;uri&quot;: &quot;./milvus_local.db&quot;,
    &quot;token&quot;: &quot;&quot;,
    &quot;create_embedding_dim&quot;: <span class="hljs-number">3</span>,
    &quot;create_auto_id&quot;: <span class="hljs-literal">true</span>
};
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<ul>
<li>Si sólo necesita una base de datos vectorial local para datos a pequeña escala o prototipos, establecer la uri como un archivo local, por ejemplo<code translate="no">./milvus.db</code>, es el método más conveniente, ya que utiliza automáticamente <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> para almacenar todos los datos en este archivo.</li>
<li>Para datos a mayor escala y tráfico en producción, puede configurar un servidor Milvus en <a href="https://milvus.io/docs/install-overview.md">Docker o Kubernetes</a>. En esta configuración, por favor utilice la dirección del servidor y el puerto como su <code translate="no">uri</code>, por ejemplo<code translate="no">http://localhost:19530</code>. Si habilita la función de autenticación en Milvus, configure el <code translate="no">token</code> como <code translate="no">&quot;&lt;your_username&gt;:&lt;your_password&gt;&quot;</code>, de lo contrario no es necesario configurar el token.</li>
<li>También puede utilizar Milvus totalmente gestionado en <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. Simplemente configure <code translate="no">uri</code> y <code translate="no">token</code> con el <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">punto final público y la clave API</a> de su instancia de Zilliz Cloud.</li>
</ul>
</blockquote>
<h3 id="Dropping-connection" class="common-anchor-header">Desconexión</h3><p>Para eliminar la conexión, utilice este comando</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">DROP</span> DATABASE milvus_datasource;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Creating-tables" class="common-anchor-header">Creación de tablas</h3><p>Para insertar datos de una tabla preexistente, utilice <code translate="no">CREATE</code></p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">TABLE</span> milvus_datasource.test
(<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">FROM</span> sqlitedb.test);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Dropping-collections" class="common-anchor-header">Eliminación de colecciones</h3><p>No es posible eliminar una colección</p>
<h3 id="Querying-and-selecting" class="common-anchor-header">Consulta y selección</h3><p>Para consultar la base de datos mediante un vector de búsqueda, puede utilizar <code translate="no">search_vector</code> en la cláusula <code translate="no">WHERE</code> </p>
<p>Advertencia:</p>
<ul>
<li>Si omite <code translate="no">LIMIT</code>, se utiliza <code translate="no">search_default_limit</code>, ya que Milvus lo requiere.</li>
<li>No se admite la columna de metadatos, pero si la colección tiene habilitado el esquema dinámico, puede realizar la consulta de forma normal, véase el ejemplo siguiente</li>
<li>Los campos dinámicos no se pueden mostrar pero se pueden consultar</li>
</ul>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">from</span> milvus_datasource.test
<span class="hljs-keyword">WHERE</span> search_vector <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;[3.0, 1.0, 2.0, 4.5]&#x27;</span>
LIMIT <span class="hljs-number">10</span>;
<button class="copy-code-btn"></button></code></pre>
<p>Si omite <code translate="no">search_vector</code>, se convierte en una búsqueda básica y se devuelve <code translate="no">LIMIT</code> o <code translate="no">search_default_limit</code> cantidad de entradas de la colección</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">from</span> milvus_datasource.test
<button class="copy-code-btn"></button></code></pre>
<p>Puede utilizar la cláusula <code translate="no">WHERE</code> en los campos dinámicos como en SQL normal.</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">FROM</span> milvus_datasource.createtest
<span class="hljs-keyword">WHERE</span> category <span class="hljs-operator">=</span> &quot;science&quot;;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Deleting-records" class="common-anchor-header">Eliminación de registros</h3><p>Puede borrar entradas utilizando <code translate="no">DELETE</code> como en SQL.</p>
<p>Advertencias:</p>
<ul>
<li>Milvus sólo admite la eliminación de entidades con claves primarias claramente especificadas</li>
<li>Sólo puede utilizar el operador <code translate="no">IN</code> </li>
</ul>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">DELETE</span> <span class="hljs-keyword">FROM</span> milvus_datasource.test
<span class="hljs-keyword">WHERE</span> id <span class="hljs-keyword">IN</span> (<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Inserting-records" class="common-anchor-header">Inserción de registros</h3><p>También puede insertar filas individuales de esta forma:</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">INSERT</span> <span class="hljs-keyword">INTO</span> milvus_test.testable (id,content,metadata,embeddings)
<span class="hljs-keyword">VALUES</span> (&quot;id3&quot;, <span class="hljs-string">&#x27;this is a test&#x27;</span>, <span class="hljs-string">&#x27;{&quot;test&quot;: &quot;test&quot;}&#x27;</span>, <span class="hljs-string">&#x27;[1.0, 8.0, 9.0]&#x27;</span>);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Updating" class="common-anchor-header">Actualización</h3><p>La API de Milvus no admite la actualización de registros. Puede intentar usar una combinación de <code translate="no">DELETE</code> y <code translate="no">INSERT</code></p>
<hr>
<p>Para más detalles y ejemplos, consulte la <a href="https://docs.mindsdb.com/what-is-mindsdb">Documentación Oficial de MindsDB</a>.</p>
