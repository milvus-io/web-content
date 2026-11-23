---
id: configure_access_logs.md
title: Configurar los registros de acceso
---
<h1 id="Configure-Access-Logs" class="common-anchor-header">Configurar los registros de acceso<button data-href="#Configure-Access-Logs" class="anchor-icon" translate="no">
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
    </button></h1><p>La función de registros de acceso de Milvus permite a los administradores del servidor registrar y analizar el comportamiento de acceso de los usuarios, lo que ayuda a comprender aspectos como las tasas de éxito de las consultas y los motivos de los fallos.</p>
<p>Esta guía ofrece instrucciones detalladas sobre cómo configurar los registros de acceso en Milvus.</p>
<p>La configuración de los registros de acceso depende del método de instalación de Milvus:</p>
<ul>
<li><strong>Instalación con Helm</strong>: configúralos en <code translate="no">values.yaml</code>. Para obtener más información, consulta <a href="/docs/es/configure-helm.md">«Configurar Milvus con Helm Charts</a>».</li>
<li><strong>Instalación con Docker</strong>: configúralo en <code translate="no">milvus.yaml</code>. Para obtener más información, consulta <a href="/docs/es/configure-docker.md">«Configurar Milvus con Docker Compose</a>».</li>
<li><strong>Instalación con Operator</strong>: Modifique <code translate="no">spec.components</code> en el archivo de configuración. Para obtener más información, consulte <a href="/docs/es/configure_operator.md">«Configurar Milvus con Milvus Operator</a>».</li>
</ul>
<h2 id="Configuration-options" class="common-anchor-header">Opciones de configuración<button data-href="#Configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><p>Elige entre tres opciones de configuración en función de tus necesidades:</p>
<ul>
<li><strong>Configuración básica</strong>: para uso general.</li>
<li><strong>Configuración para archivos de registro de acceso locales</strong>: para almacenar registros localmente.</li>
<li><strong>Configuración para cargar los registros de acceso locales a MinIO</strong>: para almacenamiento en la nube y copias de seguridad.</li>
</ul>
<h3 id="Base-config" class="common-anchor-header">Configuración básica<button data-href="#Base-config" class="anchor-icon" translate="no">
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
    </button></h3><p>La configuración básica consiste en habilitar los registros de acceso y definir el nombre del archivo de registro o utilizar stdout.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-comment"># If `filename` is empty, logs will be printed to stdout.</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.enable</code>: Indica si se habilita la función de registro de acceso. El valor predeterminado es <strong>«false</strong>».</li>
<li><code translate="no">proxy.accessLog.filename</code>: El nombre del archivo de registro de acceso. Si se deja este parámetro vacío, los registros de acceso se enviarán a stdout.</li>
</ul>
<h3 id="Config-for-local-access-log-files" class="common-anchor-header">Configuración de los archivos de registro de acceso locales<button data-href="#Config-for-local-access-log-files" class="anchor-icon" translate="no">
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
    </button></h3><p>Configura el almacenamiento local de los archivos de registro de acceso con parámetros que incluyen la ruta del archivo local, el tamaño del archivo y el intervalo de rotación:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;access_log.txt&quot;</span> <span class="hljs-comment"># Name of the access log file</span>
    <span class="hljs-attr">localPath:</span> <span class="hljs-string">&quot;/var/logs/milvus&quot;</span> <span class="hljs-comment"># Local file path where the access log file is stored</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">500</span> <span class="hljs-comment"># Max size for each single access log file. Unit: MB</span>
    <span class="hljs-attr">rotatedTime:</span> <span class="hljs-number">86400</span> <span class="hljs-comment"># Time interval for log rotation. Unit: seconds</span>
    <span class="hljs-attr">maxBackups:</span> <span class="hljs-number">7</span> <span class="hljs-comment"># Max number of sealed access log files that can be retained</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Estos parámetros se especifican cuando ` <code translate="no">filename</code> ` no está vacío.</p>
<ul>
<li><code translate="no">proxy.accessLog.localPath</code>: La ruta de archivo local donde se almacena el archivo de registro de acceso. El valor predeterminado es <code translate="no">/tmp/milvus_access</code>.</li>
<li><code translate="no">proxy.accessLog.maxSize</code>: El tamaño máximo en MB permitido para un único archivo de registro de acceso. Si el tamaño del archivo de registro alcanza este límite, se activará un proceso de rotación. Este proceso sella el archivo de registro de acceso actual, crea un nuevo archivo de registro y borra el contenido del archivo de registro original. El valor por defecto es <strong>64</strong>.</li>
<li><code translate="no">proxy.accessLog.rotatedTime</code>: El intervalo de tiempo máximo, en segundos, permitido para la rotación de un único archivo de registro de acceso. Al alcanzarse el intervalo de tiempo especificado, se activa un proceso de rotación que da lugar a la creación de un nuevo archivo de registro de acceso y al cierre del anterior. El valor predeterminado es <strong>0</strong>.</li>
<li><code translate="no">proxy.accessLog.maxBackups</code>: El número máximo de archivos de registro de acceso sellados que se pueden conservar. Si el número de archivos de registro de acceso sellados supera este límite, se eliminará el más antiguo. El valor predeterminado es <strong>8</strong>.</li>
</ul>
<h3 id="Config-for-uploading-local-access-log-files-to-MinIO" class="common-anchor-header">Configuración para cargar archivos de registro de acceso locales en MinIO<button data-href="#Config-for-uploading-local-access-log-files-to-MinIO" class="anchor-icon" translate="no">
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
    </button></h3><p>Habilita y configura los ajustes para subir archivos de registro de acceso locales a MinIO:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;access_log.txt&quot;</span>
    <span class="hljs-attr">localPath:</span> <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">500</span>
    <span class="hljs-attr">rotatedTime:</span> <span class="hljs-number">86400</span>
    <span class="hljs-attr">maxBackups:</span> <span class="hljs-number">7</span>
    <span class="hljs-attr">minioEnable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">remotePath:</span> <span class="hljs-string">&quot;/milvus/logs/access_logs&quot;</span>
    <span class="hljs-attr">remoteMaxTime:</span> <span class="hljs-number">0</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Al configurar los parámetros de MinIO, asegúrese de haber establecido <code translate="no">maxSize</code> o <code translate="no">rotatedTime</code>. De lo contrario, es posible que la subida de los archivos de registro de acceso locales a MinIO no se realice correctamente.</p>
<ul>
<li><code translate="no">proxy.accessLog.minioEnable</code>: Indica si se deben subir los archivos de registro de acceso locales a MinIO. El valor predeterminado es <strong>«false</strong>».</li>
<li><code translate="no">proxy.accessLog.remotePath</code>: Ruta del almacenamiento de objetos para la carga de los archivos de registro de acceso. El valor predeterminado es <code translate="no">access_log/</code>.</li>
<li><code translate="no">proxy.accessLog.remoteMaxTime</code>: Intervalo de tiempo permitido para la subida de los archivos de registro de acceso. Si el tiempo de subida de un archivo de registro supera este intervalo, el archivo se eliminará. Si se establece el valor en 0, se desactiva esta función. El valor por defecto es <strong>0</strong>.</li>
</ul>
<h2 id="Formatter-config" class="common-anchor-header">Configuración del formateador<button data-href="#Formatter-config" class="anchor-icon" translate="no">
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
    </button></h2><p>El formato de registro predeterminado utilizado para todos los métodos es el formato <code translate="no">base</code>, que no requiere asociaciones específicas con métodos. Sin embargo, si deseas personalizar la salida de registro para métodos específicos, puedes definir un formato de registro personalizado y aplicarlo a los métodos asociados.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;access_log.txt&quot;</span>
    <span class="hljs-attr">localPath:</span> <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    <span class="hljs-comment"># Define custom formatters for access logs with format and applicable methods</span>
    <span class="hljs-attr">formatters:</span>
      <span class="hljs-comment"># The `base` formatter applies to all methods by default</span>
      <span class="hljs-comment"># The `base` formatter does not require specific method association</span>
      <span class="hljs-attr">base:</span> 
        <span class="hljs-comment"># Format string; an empty string means no log output</span>
        <span class="hljs-attr">format:</span> <span class="hljs-string">&quot;[$time_now] [ACCESS] &lt;$user_name: $user_addr&gt; $method_name-$method_status-$error_code [traceID: $trace_id] [timeCost: $time_cost]&quot;</span>
      <span class="hljs-comment"># Custom formatter for specific methods (e.g., Query, Search)</span>
      <span class="hljs-attr">query:</span> 
        <span class="hljs-attr">format:</span> <span class="hljs-string">&quot;[$time_now] [ACCESS] &lt;$user_name: $user_addr&gt; $method_status-$method_name [traceID: $trace_id] [timeCost: $time_cost] [database: $database_name] [collection: $collection_name] [partitions: $partition_name] [expr: $method_expr]&quot;</span>
        <span class="hljs-comment"># Specify the methods to which this custom formatter applies</span>
        <span class="hljs-attr">methods:</span> [<span class="hljs-string">&quot;Query&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.formatters.&lt;formatter_name&gt;.format</code>: Define el formato de registro con métricas dinámicas. Para obtener más información, consulta <a href="#reference-supported-metrics">Métricas compatibles</a>.</li>
<li><code translate="no">proxy.accessLog.formatters.&lt;formatter_name&gt;.methods</code>: Enumera las operaciones de Milvus que utilizan este formateador. Para obtener los nombres de los métodos, consulte <strong>MilvusService</strong> en <a href="https://github.com/milvus-io/milvus-proto/blob/master/proto/milvus.proto">Métodos de Milvus</a>.</li>
</ul>
<h2 id="Reference-Supported-metrics" class="common-anchor-header">Referencia: Métricas compatibles<button data-href="#Reference-Supported-metrics" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Nombre de la métrica</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">$method_name</code></td><td>Nombre del método</td></tr>
<tr><td><code translate="no">$method_status</code></td><td>Estado del acceso: <strong>OK</strong> o <strong>Fallo</strong></td></tr>
<tr><td><code translate="no">$method_expr</code></td><td>Expresión utilizada para operaciones de consulta, búsqueda o eliminación</td></tr>
<tr><td><code translate="no">$trace_id</code></td><td>ID de seguimiento asociado al acceso</td></tr>
<tr><td><code translate="no">$user_addr</code></td><td>Dirección IP del usuario</td></tr>
<tr><td><code translate="no">$user_name</code></td><td>Nombre del usuario</td></tr>
<tr><td><code translate="no">$response_size</code></td><td>Tamaño de los datos de respuesta</td></tr>
<tr><td><code translate="no">$error_code</code></td><td>Código de error específico de Milvus</td></tr>
<tr><td><code translate="no">$error_msg</code></td><td>Mensaje de error detallado</td></tr>
<tr><td><code translate="no">$database_name</code></td><td>Nombre de la base de datos de Milvus de destino</td></tr>
<tr><td><code translate="no">$collection_name</code></td><td>Nombre de la colección de Milvus de destino</td></tr>
<tr><td><code translate="no">$partition_name</code></td><td>Nombre o nombres de la(s) partición(es) de Milvus de destino</td></tr>
<tr><td><code translate="no">$time_cost</code></td><td>Tiempo empleado en completar el acceso</td></tr>
<tr><td><code translate="no">$time_now</code></td><td>Hora en la que se imprime el registro de acceso (normalmente equivale a <code translate="no">$time_end</code>)</td></tr>
<tr><td><code translate="no">$time_start</code></td><td>Hora en la que comienza el acceso</td></tr>
<tr><td><code translate="no">$time_end</code></td><td>Hora en la que finaliza el acceso</td></tr>
<tr><td><code translate="no">$sdk_version</code></td><td>Versión del SDK de Milvus utilizada por el usuario</td></tr>
<tr><td><code translate="no">$error_type</code></td><td>Tipo de error: <strong>system_error</strong> o <strong>input_error</strong></td></tr>
<tr><td><code translate="no">$output_fields</code></td><td>Campos de salida de la solicitud</td></tr>
<tr><td><code translate="no">$cluster_prefix</code></td><td>Prefijo del clúster establecido en <code translate="no">msgChannel.chanNamePrefix.cluster</code></td></tr>
<tr><td><code translate="no">$consistency_level</code></td><td>Nivel de consistencia de la solicitud</td></tr>
<tr><td><code translate="no">$anns_field</code></td><td>Campo vectorial de una solicitud de búsqueda o de búsqueda híbrida</td></tr>
<tr><td><code translate="no">$nq</code></td><td>Número de vectores de consulta de una solicitud de búsqueda o de búsqueda híbrida</td></tr>
<tr><td><code translate="no">$search_params</code></td><td>Parámetros de búsqueda de una solicitud de búsqueda o de búsqueda híbrida</td></tr>
<tr><td><code translate="no">$query_params</code></td><td>Parámetros de consulta de una solicitud de consulta</td></tr>
<tr><td><code translate="no">$client_request_time</code></td><td>Tiempo de solicitud que el cliente establece en los metadatos de gRPC</td></tr>
<tr><td><code translate="no">$template_value_length</code></td><td>Longitud de cada valor de la plantilla de expresión</td></tr>
<tr><td><code translate="no">$partial_update</code></td><td>Si una solicitud de «upsert» es una actualización parcial</td></tr>
</tbody>
</table>
