---
id: manage-file-resources.md
title: Gestión de recursos de archivo
summary: >-
  Registre y gestione archivos de diccionario externos que los analizadores de
  texto Milvus pueden cargar en tiempo de ejecución.
---
<h1 id="Manage-File-Resources" class="common-anchor-header">Gestión de recursos de archivo<button data-href="#Manage-File-Resources" class="anchor-icon" translate="no">
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
    </button></h1><p>Un <strong>recurso de archivo</strong> es una referencia registrada en el servidor a un archivo de diccionario externo que los analizadores de texto consumen en tiempo de ejecución. En Milvus 3.0, cuatro componentes analizadores pueden cargar sus diccionarios desde un recurso de archivo en lugar de desde una matriz en línea:</p>
<table>
   <tr>
     <th><p><strong>Componente analizador</strong></p></th>
     <th><p><strong>Parámetro que acepta un recurso de archivo</strong></p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/es/jieba-tokenizer.md">Tokenizador Jieba</a></p></td>
     <td><p><code translate="no">extra_dict_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/stop-filter.md">Filtro de parada</a></p></td>
     <td><p><code translate="no">stop_words_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/decompounder-filter.md">Filtro descomponedor</a></p></td>
     <td><p><code translate="no">word_list_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/synonym-filter.md">Filtro de sinónimos</a></p></td>
     <td><p><code translate="no">synonyms_file</code></p></td>
   </tr>
</table>
<p>Los recursos de archivo resuelven dos problemas prácticos de las matrices de diccionarios en línea:</p>
<ul>
<li><p>Los diccionarios reales son grandes. Un vocabulario chino Jieba puede tener decenas de miles de líneas; las tablas de sinónimos suelen tener miles de reglas. Integrarlos en la configuración del analizador es poco práctico.</p></li>
<li><p>El mismo diccionario suele compartirse en todas las colecciones. Registrarlo una vez y luego referenciarlo por su nombre mantiene los esquemas pequeños y hace que las actualizaciones del diccionario sean una sola operación.</p></li>
</ul>
<h2 id="File-resource-types" class="common-anchor-header">Tipos de recursos de archivo<button data-href="#File-resource-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus admite dos tipos de recursos de archivo con diferentes responsabilidades de gestión:</p>
<table>
   <tr>
     <th><p><strong>Tipo</strong></p></th>
     <th><p><strong>Dónde vive el archivo</strong></p></th>
     <th><p><strong>Quién gestiona el archivo</strong></p></th>
     <th><p><strong>Ajustar</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>Remoto</strong></p></td>
     <td><p>En el almacén de objetos (MinIO / S3 / GCS / Azure) que su cluster Milvus ya está configurado para usar</p></td>
     <td><p>Milvus, a través de las API de cliente <code translate="no">add_file_resource</code> / <code translate="no">remove_file_resource</code> / <code translate="no">list_file_resources</code> </p></td>
     <td><p>Recomendado para la mayoría de los despliegues.</p></td>
   </tr>
   <tr>
     <td><p><strong>Local</strong></p></td>
     <td><p>En la misma ruta absoluta en el sistema de archivos local de cada componente Milvus (DataNode, QueryNode, StreamingNode)</p></td>
     <td><p>Usted - monte el archivo usted mismo, por ejemplo a través de un volumen Kubernetes</p></td>
     <td><p>Escenarios de código abierto / autoalojados en los que prefiere gestionar los archivos de diccionario fuera de Milvus.</p></td>
   </tr>
</table>
<p>El resto de esta página recorre ambos tipos, comenzando con el tipo remoto más común.</p>
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
    </button></h2><ul>
<li><p>Para los recursos de archivos <strong>remotos</strong>, su implementación de Milvus debe estar configurada con un almacén de objetos. La mayoría de los despliegues ya lo están - compruebe la sección <code translate="no">minio:</code> de su <code translate="no">milvus.yaml</code> (o los valores equivalentes de la tabla Helm). Tenga en cuenta los valores <code translate="no">bucketName</code> y <code translate="no">rootPath</code>; los necesitará cuando registre los recursos de archivo.</p></li>
<li><p>Para los recursos de archivos <strong>locales</strong>, debe ser capaz de colocar archivos en cada pod / contenedor Milvus en la misma ruta absoluta. La forma de hacerlo depende de su despliegue (montaje bind, volumen respaldado por ConfigMap, contenedor init, etc.).</p></li>
</ul>
<h2 id="Register-a-remote-file-resource" class="common-anchor-header">Registrar un recurso de archivo remoto<button data-href="#Register-a-remote-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><p>Registrar un recurso de archivo remoto es un flujo de trabajo de tres pasos: <strong>cargue</strong> el archivo en el almacenamiento de objetos, <strong>regístrelo</strong> en Milvus con el nombre elegido y, a continuación, <strong>haga referencia a</strong> él desde cualquier analizador que lo necesite.</p>
<h3 id="Step-1-Upload-the-dictionary-file-to-object-storage" class="common-anchor-header">Primer paso Cargar el archivo del diccionario en el almacenamiento de objetos<button data-href="#Step-1-Upload-the-dictionary-file-to-object-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilice sus propias herramientas (<code translate="no">mc</code>, <code translate="no">aws s3 cp</code>, <code translate="no">boto3</code>, o cualquier cliente compatible con S3) para colocar el archivo en el cubo que Milvus está configurado para utilizar.</p>
<p>Por ejemplo, si <code translate="no">milvus.yaml</code> contiene:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">milvus-bucket</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">file</span>
<button class="copy-code-btn"></button></code></pre>
<p>Cargar un archivo llamado <code translate="no">chinese_terms.txt</code> con <code translate="no">rootPath</code> como prefijo coloca el objeto en <code translate="no">s3://milvus-bucket/file/chinese_terms.txt</code>.</p>
<p>El argumento <code translate="no">path</code> que pasará a <code translate="no">add_file_resource</code> en el Paso 2 es la <strong>clave completa del objeto, incluyendo el prefijo rootPath</strong> - para el ejemplo anterior, <code translate="no">path=&quot;file/chinese_terms.txt&quot;</code>. Una ruta sin el prefijo (por ejemplo, sólo <code translate="no">&quot;chinese_terms.txt&quot;</code>) se rechaza con el error <code translate="no">file resource path not exist</code>.</p>
<h3 id="Step-2-Register-the-file-with-addfileresource" class="common-anchor-header">Paso 2. Registrar el archivo Registrar el archivo con <code translate="no">add_file_resource</code><button data-href="#Step-2-Register-the-file-with-addfileresource" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

client.add_file_resource(
    name=<span class="hljs-string">&quot;chinese_terms&quot;</span>,                <span class="hljs-comment"># short, unique name you&#x27;ll reference later</span>
    path=<span class="hljs-string">&quot;file/chinese_terms.txt&quot;</span>,       <span class="hljs-comment"># full S3 object key, including the rootPath prefix</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">add_file_resource</code> valida de forma sincrónica: la llamada vuelve sólo después de que Milvus haya confirmado que el objeto existe en <code translate="no">path</code> en el almacén de objetos configurado. Si falta el objeto, la llamada genera el error <code translate="no">MilvusException(code=65535, &quot;file resource path not exist&quot;)</code> - cargue el archivo primero, luego vuelva a intentarlo.</p>
<p>La llamada es idempotente. Llamar a <code translate="no">add_file_resource</code> dos veces con los mismos <code translate="no">name</code> y <code translate="no">path</code> no crea duplicados.</p>
<h3 id="Step-3-Reference-the-file-resource-from-an-analyzer" class="common-anchor-header">Tercer paso. Hacer referencia al recurso de archivo desde un analizador<button data-href="#Step-3-Reference-the-file-resource-from-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Siempre que un parámetro del analizador acepte una referencia de archivo (<code translate="no">extra_dict_file</code>, <code translate="no">stop_words_file</code>, <code translate="no">word_list_file</code>, <code translate="no">synonyms_file</code>), utilice la forma remota canónica:</p>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;remote&quot;</span>,
    <span class="hljs-string">&quot;resource_name&quot;</span>: <span class="hljs-string">&quot;chinese_terms&quot;</span>,    <span class="hljs-comment"># must match the name in add_file_resource</span>
    <span class="hljs-string">&quot;file_name&quot;</span>: <span class="hljs-string">&quot;chinese_terms.txt&quot;</span>,    <span class="hljs-comment"># filename only — Milvus uses this to identify the file inside the resource</span>
}
<button class="copy-code-btn"></button></code></pre>
<p>Los cuatro parámetros del analizador utilizan la misma forma; sólo difiere la clave del analizador que los rodea. Para ver ejemplos concretos por analizador, consulte Jieba tokenizer, Stop filter, Decompounder filter y Synonym filter.</p>
<p>Los nombres de los parámetros son <code translate="no">resource_name</code> y <code translate="no">file_name</code> - no <code translate="no">name</code> y <code translate="no">file</code>. El uso de <code translate="no">name</code> / <code translate="no">file</code> (o <code translate="no">&quot;type&quot;: &quot;resource&quot;</code> en lugar de <code translate="no">&quot;type&quot;: &quot;remote&quot;</code>) genera <code translate="no">MilvusException</code> en el momento de creación del analizador con un mensaje como <code translate="no">resource name of remote file ... must be set</code>.</p>
<h2 id="List-file-resources" class="common-anchor-header">Lista de recursos de archivos<button data-href="#List-file-resources" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">resources = client.list_file_resources()
<span class="hljs-keyword">for</span> r <span class="hljs-keyword">in</span> resources:
    <span class="hljs-built_in">print</span>(r.name, r.path)
<span class="hljs-comment"># chinese_terms file/chinese_terms.txt</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">list_file_resources()</code> devuelve una lista de objetos <code translate="no">FileResourceInfo</code>, cada uno con atributos <code translate="no">.name</code> y <code translate="no">.path</code>. La agrupación vacía devuelve <code translate="no">[]</code>. No hay ningún <code translate="no">get</code> por recurso; <code translate="no">list_file_resources</code> es la única API de lectura.</p>
<h2 id="Remove-a-file-resource" class="common-anchor-header">Eliminar un recurso de archivo<button data-href="#Remove-a-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">client.remove_file_resource(name=<span class="hljs-string">&quot;chinese_terms&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">remove_file_resource</code> es idempotente: llamarlo para un nombre que no existe devuelve <code translate="no">None</code> sin levantar.</p>
<p>Antes de eliminar un recurso de archivo, elimine o modifique cualquier colección cuyas configuraciones de analizador hagan referencia a él. Mantener un recurso de archivo hasta que ninguna colección dependa de él evita el riesgo de que las búsquedas del analizador fallen después de que el recurso haya desaparecido.</p>
<h2 id="Use-a-local-file-resource" class="common-anchor-header">Utilizar un recurso de archivo local<button data-href="#Use-a-local-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><p>Un recurso de archivo <strong>local</strong> apunta directamente a una ruta en el sistema de archivos local de cada componente Milvus. No hay llamada a <code translate="no">add_file_resource</code> - Milvus no rastrea los recursos locales. Usted mismo coloca el fichero en la misma ruta absoluta en cada pod o contenedor relevante, y luego lo referencia por ruta:</p>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;local&quot;</span>,
    <span class="hljs-string">&quot;path&quot;</span>: <span class="hljs-string">&quot;/var/lib/milvus/dicts/chinese_terms.txt&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<p>Los recursos de archivos locales solo son válidos en despliegues donde usted controla los sistemas de archivos de DataNodes, QueryNodes y StreamingNodes - típicamente Milvus autoalojado en bare-metal o en un clúster Kubernetes donde puede añadir un montaje de volumen. El archivo debe existir exactamente en la misma ruta absoluta en cada componente; de lo contrario, algunos nodos fallan al cargar el analizador.</p>
<p>El archivo se abre cuando el analizador se crea por primera vez. Si la ruta no existe en ese momento, la creación del analizador falla con <code translate="no">MilvusException(code=2000, &quot;IOError: No such file or directory&quot;)</code>.</p>
<h2 id="Considerations" class="common-anchor-header">Consideraciones<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p><strong>La disponibilidad de todo el cluster no es instantánea.</strong> Tras el regreso de <code translate="no">add_file_resource</code>, Milvus sincroniza el archivo con todos los componentes que lo necesitan. Durante esta breve ventana, puede fallar la creación de una colección que haga referencia al recurso en nodos que aún no se hayan sincronizado. La solución típica es reintentar la llamada de creación después de unos segundos.</p></li>
<li><p><strong>Eliminar sólo cuando ninguna colección dependa del recurso.</strong> Elimine o modifique cualquier colección cuya configuración del analizador haga referencia al recurso antes de llamar a <code translate="no">remove_file_resource</code>, para evitar que las búsquedas del analizador no encuentren el archivo.</p></li>
<li><p><strong>Sólo metadatos.</strong> <code translate="no">list_file_resources()</code> devuelve <code translate="no">name</code> y <code translate="no">path</code> - no hay tamaño, suma de comprobación, tiempo de carga ni otros metadatos. Mantenga un registro de las versiones del diccionario con su propia convención de nomenclatura si lo necesita.</p></li>
</ul>
