---
id: configure_access_logs.md
title: Configurar registros de acceso
summary: ''
---
<h1 id="Configure-Access-Logs" class="common-anchor-header">Configurar registros de acceso<button data-href="#Configure-Access-Logs" class="anchor-icon" translate="no">
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
    </button></h1><p>La función de registro de acceso en Milvus permite a los administradores de servidores registrar y analizar el comportamiento de acceso de los usuarios, ayudando a comprender aspectos como las tasas de éxito de las consultas y las razones de los fallos.</p>
<p>Esta guía proporciona instrucciones detalladas para configurar los registros de acceso en Milvus.</p>
<p>La configuración de los registros de acceso depende del método de instalación de Milvus:</p>
<ul>
<li><strong>Instalación de Helm</strong>: Configure en <code translate="no">values.yaml</code>. Para obtener más información, consulte <a href="/docs/es/v2.4.x/configure-helm.md">Configurar Milvus con gráficos Helm</a>.</li>
<li><strong>Instalación de Docker</strong>: Configure en <code translate="no">milvus.yaml</code>. Para más información, consulte <a href="/docs/es/v2.4.x/configure-docker.md">Configurar Milvus con Docker Compose</a>.</li>
<li><strong>Instalación de Operador</strong>: Modifique <code translate="no">spec.components</code> en el archivo de configuración. Para más información, consulte <a href="/docs/es/v2.4.x/configure_operator.md">Configurar Milvus con Milvus Operator</a>.</li>
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
    </button></h2><p>Elija entre tres opciones de configuración en función de sus necesidades:</p>
<ul>
<li><strong>Base config</strong>: Para propósitos generales.</li>
<li><strong>Configuración para archivos de registro de acceso local</strong>: Para almacenar registros localmente.</li>
<li><strong>Configuración para subir los logs de acceso local a MinIO</strong>: Para almacenamiento en la nube y copias de seguridad.</li>
</ul>
<h3 id="Base-config" class="common-anchor-header">Configuración básica</h3><p>La configuración básica consiste en habilitar los registros de acceso y definir el nombre del archivo de registro o utilizar stdout.</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span>
    <span class="hljs-comment"># If `filename` is emtpy, logs will be printed to stdout.</span>
    filename: <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.enable</code>: Habilitar o no la función de registro de acceso. Por defecto es <strong>false</strong>.</li>
<li><code translate="no">proxy.accessLog.filename</code>: El nombre del archivo de registro de acceso. Si deja este parámetro vacío, los registros de acceso se imprimirán en stdout.</li>
</ul>
<h3 id="Config-for-local-access-log-files" class="common-anchor-header">Configuración de archivos de registro de acceso locales</h3><p>Configure el almacenamiento local para los archivos de registro de acceso con parámetros que incluyen la ruta del archivo local, el tamaño del archivo y el intervalo de rotación:</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    enable: true
    filename: <span class="hljs-string">&quot;access_log.txt&quot;</span> <span class="hljs-comment"># Name of the access log file</span>
    localPath: <span class="hljs-string">&quot;/var/logs/milvus&quot;</span> <span class="hljs-comment"># Local file path where the access log file is stored</span>
    maxSize: <span class="hljs-number">500</span> <span class="hljs-comment"># Max size for each single access log file. Unit: MB</span>
    rotatedTime: <span class="hljs-number">24</span> <span class="hljs-comment"># Time interval for log rotation. Unit: seconds</span>
    maxBackups: <span class="hljs-number">7</span> <span class="hljs-comment"># Max number of sealed access log files that can be retained</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Estos parámetros se especifican cuando <code translate="no">filename</code> no está vacío.</p>
<ul>
<li><code translate="no">proxy.accessLog.localPath</code>: La ruta del archivo local donde se almacena el archivo de registro de acceso.</li>
<li><code translate="no">proxy.accessLog.maxSize</code>: El tamaño máximo en MB permitido para un único archivo de registro de acceso. Si el tamaño del archivo de registro alcanza este límite, se iniciará un proceso de rotación. Este proceso sella el archivo de registro de acceso actual, crea un nuevo archivo de registro y borra el contenido del archivo de registro original.</li>
<li><code translate="no">proxy.accessLog.rotatedTime</code>: El intervalo de tiempo máximo en segundos permitido para rotar un único archivo de registro de acceso. Al alcanzar el intervalo de tiempo especificado, se desencadenará un proceso de rotación, que resultará en la creación de un nuevo archivo de registro de acceso y el sellado del anterior.</li>
<li><code translate="no">proxy.accessLog.maxBackups</code>: El número máximo de archivos de registro de acceso sellados que se pueden conservar. Si el número de archivos de registro de acceso sellados supera este límite, se eliminará el más antiguo.</li>
</ul>
<h3 id="Config-for-uploading-local-access-log-files-to-MinIO" class="common-anchor-header">Configuración para cargar archivos de registro de acceso local en MinIO</h3><p>Habilite y configure los parámetros para cargar archivos de registro de acceso local a MinIO:</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span>
    filename: <span class="hljs-string">&quot;access_log.txt&quot;</span>
    localPath: <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    maxSize: 500
    rotatedTime: 24 
    maxBackups: 7
    minioEnable: <span class="hljs-literal">true</span>
    remotePath: <span class="hljs-string">&quot;/milvus/logs/access_logs&quot;</span>
    remoteMaxTime: 0
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Al configurar los parámetros de MinIO, asegúrese de haber establecido <code translate="no">maxSize</code> o <code translate="no">rotatedTime</code>. Si no lo hace, es posible que los archivos de registro de acceso local no se carguen en MinIO.</p>
<ul>
<li><code translate="no">proxy.accessLog.minioEnable</code>: Si desea cargar archivos de registro de acceso local a MinIO. Por defecto es <strong>false</strong>.</li>
<li><code translate="no">proxy.accessLog.remotePath</code>: La ruta del objeto de almacenamiento para cargar los archivos de registro de acceso.</li>
<li><code translate="no">proxy.accessLog.remoteMaxTime</code>: El intervalo de tiempo permitido para cargar archivos de registro de acceso. Si el tiempo de carga de un archivo de registro supera este intervalo, el archivo se eliminará. El valor 0 desactiva esta función.</li>
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
    </button></h2><p>El formato de registro por defecto utilizado para todos los métodos es el formato <code translate="no">base</code>, que no requiere asociaciones específicas de métodos. Sin embargo, si desea personalizar la salida de registro para métodos específicos, puede definir un formato de registro personalizado y aplicarlo a los métodos asociados.</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span>
    filename: <span class="hljs-string">&quot;access_log.txt&quot;</span>
    localPath: <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    <span class="hljs-comment"># Define custom formatters for access logs with format and applicable methods</span>
    formatters:
      <span class="hljs-comment"># The `base` formatter applies to all methods by default</span>
      <span class="hljs-comment"># The `base` formatter does not require specific method association</span>
      base: 
        <span class="hljs-comment"># Format string; an empty string means no log output</span>
        format: <span class="hljs-string">&quot;[<span class="hljs-variable">$time_now</span>] [ACCESS] &lt;<span class="hljs-variable">$user_name</span>: <span class="hljs-variable">$user_addr</span>&gt; <span class="hljs-variable">$method_name</span>-<span class="hljs-variable">$method_status</span>-<span class="hljs-variable">$error_code</span> [traceID: <span class="hljs-variable">$trace_id</span>] [timeCost: <span class="hljs-variable">$time_cost</span>]&quot;</span>
      <span class="hljs-comment"># Custom formatter for specific methods (e.g., Query, Search)</span>
      query: 
        format: <span class="hljs-string">&quot;[<span class="hljs-variable">$time_now</span>] [ACCESS] &lt;<span class="hljs-variable">$user_name</span>: <span class="hljs-variable">$user_addr</span>&gt; <span class="hljs-variable">$method_status</span>-<span class="hljs-variable">$method_name</span> [traceID: <span class="hljs-variable">$trace_id</span>] [timeCost: <span class="hljs-variable">$time_cost</span>] [database: <span class="hljs-variable">$database_name</span>] [collection: <span class="hljs-variable">$collection_name</span>] [partitions: <span class="hljs-variable">$partition_name</span>] [expr: <span class="hljs-variable">$method_expr</span>]&quot;</span>
        <span class="hljs-comment"># Specify the methods to which this custom formatter applies</span>
        methods: [<span class="hljs-string">&quot;Query&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.&lt;formatter_name&gt;.format</code>: Define el formato de registro con métricas dinámicas. Para obtener más información, consulte <a href="#reference-supported-metrics">Métricas admitidas</a>.</li>
<li><code translate="no">proxy.accessLog.&lt;formatter_name&gt;.methods</code>: Lista las operaciones Milvus que utilizan este formateador. Para obtener los nombres de los métodos, consulte <strong>MilvusService</strong> en <a href="https://github.com/milvus-io/milvus-proto/blob/master/proto/milvus.proto">Métodos Milvus</a>.</li>
</ul>
<h2 id="Reference-Supported-metrics" class="common-anchor-header">Referencia: Métricas admitidas<button data-href="#Reference-Supported-metrics" class="anchor-icon" translate="no">
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
<tr><th>Métrica Nombre</th><th>Descripción</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">$method_name</code></td><td>Nombre del método</td></tr>
<tr><td><code translate="no">$method_status</code></td><td>Estado del acceso: <strong>OK</strong> o <strong>Fail</strong></td></tr>
<tr><td><code translate="no">$method_expr</code></td><td>Expresión utilizada para las operaciones de consulta, búsqueda o eliminación</td></tr>
<tr><td><code translate="no">$trace_id</code></td><td>TraceID asociado al acceso</td></tr>
<tr><td><code translate="no">$user_addr</code></td><td>Dirección IP del usuario</td></tr>
<tr><td><code translate="no">$user_name</code></td><td>Nombre del usuario</td></tr>
<tr><td><code translate="no">$response_size</code></td><td>Tamaño de los datos de respuesta</td></tr>
<tr><td><code translate="no">$error_code</code></td><td>Código de error específico de Milvus</td></tr>
<tr><td><code translate="no">$error_msg</code></td><td>Mensaje de error detallado</td></tr>
<tr><td><code translate="no">$database_name</code></td><td>Nombre de la base de datos Milvus de destino</td></tr>
<tr><td><code translate="no">$collection_name</code></td><td>Nombre de la colección Milvus de destino</td></tr>
<tr><td><code translate="no">$partition_name</code></td><td>Nombre o nombres de la(s) partición(es) Milvus de destino</td></tr>
<tr><td><code translate="no">$time_cost</code></td><td>Tiempo necesario para completar el acceso</td></tr>
<tr><td><code translate="no">$time_now</code></td><td>Hora a la que se imprime el registro de acceso (normalmente equivalente a <code translate="no">$time_end</code>)</td></tr>
<tr><td><code translate="no">$time_start</code></td><td>Hora de inicio del acceso</td></tr>
<tr><td><code translate="no">$time_end</code></td><td>Hora a la que finaliza el acceso</td></tr>
<tr><td><code translate="no">$sdk_version</code></td><td>Versión del SDK de Milvus utilizada por el usuario</td></tr>
</tbody>
</table>
