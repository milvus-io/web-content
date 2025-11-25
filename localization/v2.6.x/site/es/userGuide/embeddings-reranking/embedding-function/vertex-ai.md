---
id: vertex-ai.md
title: Vértice AICompatible with Milvus 2.6.x
summary: >-
  Google Cloud Vertex AI es un servicio de alto rendimiento diseñado
  específicamente para modelos de incrustación de texto. Esta guía explica cómo
  utilizar Google Cloud Vertex AI con Milvus para una generación eficiente de
  incrustación de texto.
beta: Milvus 2.6.x
---

<h1 id="Vertex-AI" class="common-anchor-header">Vértice AI<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Vertex-AI" class="anchor-icon" translate="no">
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
    </button></h1><p>Google Cloud <a href="https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-text-embeddings">Vertex AI</a> es un servicio de alto rendimiento diseñado específicamente para modelos de incrustación de texto. Esta guía explica cómo utilizar Google Cloud Vertex AI con Milvus para una generación eficiente de incrustación de texto.</p>
<p>Vertex AI admite varios modelos de incrustación para diferentes casos de uso:</p>
<ul>
<li><p>gemini-embedding-001 (Rendimiento de vanguardia en tareas en inglés, multilingües y de código)</p></li>
<li><p>text-embedding-005 (Último modelo de incrustación de texto)</p></li>
<li><p>text-multilingual-embedding-002 (Último modelo de incrustación de texto multilingüe)</p></li>
</ul>
<p>Para obtener más información, consulte los <a href="https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/text-embeddings">modelos de incrustación de texto de Vertex AI</a>.</p>
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
    </button></h2><p>Asegúrese de que cumple estos requisitos antes de configurar Vertex AI:</p>
<ul>
<li><p><strong>Ejecute Milvus versión 2.6 o superior</strong> - Compruebe que su implementación cumple el requisito mínimo de versión.</p></li>
<li><p><strong>Cree una cuenta de servicio de Google Cloud</strong> - Como mínimo, es probable que necesite funciones como "Usuario de Vertex AI" u otras funciones más específicas. Para obtener más información, consulta <a href="https://cloud.google.com/iam/docs/service-accounts-create?_gl=1*1jz33xw*_ga*MjE0NTAwMjk3Mi4xNzUwMTQwNTMw*_ga_WH2QY8WWF5*czE3NTAxNDA1MzEkbzEkZzEkdDE3NTAxNDIyOTEkajE0JGwwJGgw">Crear cuentas de servicio</a>.</p></li>
<li><p><strong>Descargue el archivo de clave JSON de la cuenta de servicio</strong>: almacene de forma segura este archivo de credenciales en su servidor o equipo local. Para obtener más información, consulte <a href="https://cloud.google.com/iam/docs/keys-create-delete?_gl=1*ittbs8*_ga*MjE0NTAwMjk3Mi4xNzUwMTQwNTMw*_ga_WH2QY8WWF5*czE3NTAxNDA1MzEkbzEkZzEkdDE3NTAxNDI0NjMkajYwJGwwJGgw#creating">Crear una clave de cuenta de servicio</a>.</p></li>
</ul>
<h2 id="Configure-credentials" class="common-anchor-header">Configurar credenciales<button data-href="#Configure-credentials" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de que Milvus pueda llamar a Vertex AI, necesita acceder a la clave JSON de su cuenta de servicio GCP. Admitimos dos métodos: elija uno en función de sus necesidades operativas y de implementación.</p>
<table>
   <tr>
     <th><p>Opción</p></th>
     <th><p>Prioridad</p></th>
     <th><p>Mejor para</p></th>
   </tr>
   <tr>
     <td><p>Archivo de configuración (<code translate="no">milvus.yaml</code>)</p></td>
     <td><p>Alta</p></td>
     <td><p>Configuración persistente para todo el clúster</p></td>
   </tr>
   <tr>
     <td><p>Variables de entorno (<code translate="no">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</code>)</p></td>
     <td><p>Bajo</p></td>
     <td><p>Flujos de trabajo de contenedores, pruebas rápidas</p></td>
   </tr>
</table>
<h3 id="Option-1-Configuration-file-recommended--higher-priority" class="common-anchor-header">Opción 1: Archivo de configuración (recomendado y de mayor prioridad)</h3><p>Milvus siempre preferirá las credenciales declaradas en <code translate="no">milvus.yaml</code> sobre cualquier variable de entorno para el mismo proveedor.</p>
<ol>
<li><p>Codifique en Base64 su clave JSON</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> credentials.json | jq . | <span class="hljs-built_in">base64</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Declare las credenciales en <code translate="no">milvus.yaml</code></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">gcp_vertex:</span>                      <span class="hljs-comment"># arbitrary label</span>
    <span class="hljs-attr">credential_json:</span> <span class="hljs-string">|
      &lt;YOUR_BASE64_ENCODED_JSON&gt;
</span><button class="copy-code-btn"></button></code></pre></li>
<li><p>Vincular la credencial al proveedor Vertex AI</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">vertexai:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">gcp_vertex</span>      <span class="hljs-comment"># must match the label above</span>
        <span class="hljs-attr">url:</span> <span class="hljs-string">&lt;optional:</span> <span class="hljs-string">custom</span> <span class="hljs-string">Vertex</span> <span class="hljs-string">AI</span> <span class="hljs-string">endpoint&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p><div class="alert note"></p>
<p>Si más adelante necesita rotar las claves, simplemente actualice la cadena Base64 en <code translate="no">credential_json</code> y reinicie Milvus; no se requieren cambios en su entorno ni en los contenedores.</p>
<p></div></p></li>
</ol>
<h3 id="Option-2-Environment-variables" class="common-anchor-header">Opción 2: Variables de entorno</h3><p>Utilice este método cuando prefiera inyectar secretos en el momento del despliegue. Milvus recurre a env-vars sólo si no existe una entrada coincidente en <code translate="no">milvus.yaml</code>.</p>
<div class="alert note">
<p>Los pasos de configuración dependen de su modo de despliegue de Milvus (independiente vs. cluster distribuido) y plataforma de orquestación (Docker Compose vs. Kubernetes).</p>
</div>
<div class="filter">
 <a href="#docker">Docker Compose</a> <a href="#helm">Helm</a></div>
<div class="filter-docker">
<div class="alert note">
<p>Para obtener su archivo de configuración Milvus<strong>(docker-compose.yaml</strong>), consulte <a href="/docs/es/configure-docker.md#Download-an-installation-file">Descargar un archivo de instalación</a>.</p>
</div>
<ol>
<li><p><strong>Monte su llave en el contenedor</strong></p>
<p>Edite su archivo <code translate="no">docker-compose.yaml</code> para incluir la asignación del volumen de credenciales:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-comment"># Map host credential file to container path</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/path/to/your/credentials.json:/milvus/configs/google_application_credentials.json:ro</span>
<button class="copy-code-btn"></button></code></pre>
<p>En la configuración anterior:</p>
<ul>
<li><p>Utilice rutas absolutas para un acceso fiable a los archivos (<code translate="no">/home/user/credentials.json</code> no <code translate="no">~/credentials.json</code>)</p></li>
<li><p>La ruta del contenedor debe terminar con la extensión <code translate="no">.json</code> </p></li>
<li><p><code translate="no">:ro</code> La bandera garantiza el acceso de sólo lectura por seguridad</p></li>
</ul></li>
<li><p><strong>Establezca la variable de entorno</strong></p>
<p>En el mismo archivo <code translate="no">docker-compose.yaml</code>, añada la variable de entorno que apunta a la ruta de credenciales:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-comment"># Essential for Vertex AI authentication</span>
      <span class="hljs-attr">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS:</span> <span class="hljs-string">/milvus/configs/google_application_credentials.json</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Aplique los cambios</strong></p>
<p>Reinicie su contenedor Milvus para activar la configuración:</p>
<pre><code translate="no" class="language-bash">docker-compose down &amp;&amp; docker-compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
</div>
<div class="filter-helm">
<div class="alert note">
<p>Para obtener su archivo de configuración de Milvus<strong>(values.yaml</strong>), consulte <a href="/docs/es/configure-helm.md#Configure-Milvus-via-configuration-file">Configurar Milvus mediante un archivo de configuración</a>.</p>
</div>
<ol>
<li><p><strong>Cree un Secreto de Kubernetes</strong></p>
<p>Ejecute esto en su máquina de control (donde está configurado <strong>kubectl</strong> ):</p>
<pre><code translate="no" class="language-bash">kubectl create secret generic vertex-ai-secret \
  --from-file=credentials.json=/path/to/your/credentials.json \
  -n &lt;your-milvus-namespace&gt;
<button class="copy-code-btn"></button></code></pre>
<p>En el comando anterior:</p>
<ul>
<li><p><code translate="no">vertex-ai-secret</code>: Nombre para su secreto (personalizable)</p></li>
<li><p><code translate="no">/path/to/your/credentials.json</code>: Nombre local de su archivo de credenciales GCP</p></li>
<li><p><code translate="no">&lt;your-milvus-namespace&gt;</code>: Espacio de nombres de Kubernetes que aloja Milvus</p></li>
</ul></li>
<li><p><strong>Configure los valores de Helm</strong></p>
<p>Actualice su <code translate="no">values.yaml</code> en función de su tipo de despliegue:</p>
<ul>
<li><p><strong>Para despliegue autónomo</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">standalone:</span>
  <span class="hljs-attr">extraEnv:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</span>
      <span class="hljs-attr">value:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>  <span class="hljs-comment"># Container path</span>
  
  <span class="hljs-attr">volumes:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
      <span class="hljs-attr">secret:</span>
        <span class="hljs-attr">secretName:</span> <span class="hljs-string">vertex-ai-secret</span>  <span class="hljs-comment"># Must match Step 1</span>
  
  <span class="hljs-attr">volumeMounts:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
      <span class="hljs-attr">mountPath:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>  <span class="hljs-comment"># Must match extraEnv value</span>
      <span class="hljs-attr">subPath:</span> <span class="hljs-string">credentials.json</span>  <span class="hljs-comment"># Must match secret key name</span>
      <span class="hljs-attr">readOnly:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Para despliegue distribuido (añadir a cada componente)</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">extraEnv:</span> 
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</span>
      <span class="hljs-attr">value:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>
  <span class="hljs-attr">volumes:</span> 
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
      <span class="hljs-attr">secret:</span>
        <span class="hljs-attr">secretName:</span> <span class="hljs-string">vertex-ai-secret</span>
  <span class="hljs-attr">volumeMounts:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
      <span class="hljs-attr">mountPath:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>
      <span class="hljs-attr">subPath:</span> <span class="hljs-string">credentials.json</span>
      <span class="hljs-attr">readOnly:</span> <span class="hljs-literal">true</span>

<span class="hljs-comment"># Repeat same configuration for dataNode, etc.</span>
<button class="copy-code-btn"></button></code></pre></li>

</ul></li>
<li><p><strong>Aplique la configuración de Helm</strong></p>
<p>Despliegue la configuración actualizada en su cluster:</p>
<pre><code translate="no" class="language-bash">helm upgrade milvus milvus/milvus -f values.yaml -n &lt;your-milvus-namespace&gt;
<button class="copy-code-btn"></button></code></pre></li>
</ol>
</div>
<h2 id="Use-embedding-function" class="common-anchor-header">Utilizar la función de incrustación<button data-href="#Use-embedding-function" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez configurado Vertex AI, siga estos pasos para definir y utilizar las funciones de incrustación.</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">Paso 1: Definir campos de esquema</h3><p>Para utilizar una función de incrustación, cree una colección con un esquema específico. Este esquema debe incluir al menos tres campos necesarios:</p>
<ul>
<li><p>El campo primario que identifica de forma única a cada entidad de una colección.</p></li>
<li><p>Un campo escalar que almacena los datos brutos que se van a incrustar.</p></li>
<li><p>Un campo vectorial reservado para almacenar las incrustaciones vectoriales que la función generará para el campo escalar.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType, CollectionSchema, FieldSchema

<span class="hljs-comment"># Assume you have connected to Milvus</span>
<span class="hljs-comment"># client = MilvusClient(uri=&quot;http://localhost:19530&quot;)</span>

<span class="hljs-comment"># 1. Create Schema</span>
schema = MilvusClient.create_schema()

<span class="hljs-comment"># 2. Add fields</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>) <span class="hljs-comment"># Store text data</span>
<span class="hljs-comment"># IMPORTANT: Set dim to match the output dimension of the model and parameters</span>
schema.add_field(<span class="hljs-string">&quot;dense_vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>) <span class="hljs-comment"># Store embedding vectors (example dimension)</span>
<button class="copy-code-btn"></button></code></pre>

<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">Paso 2: Añadir la función de incrustación al esquema</h3><p>El módulo Function de Milvus convierte automáticamente los datos brutos almacenados en un campo escalar en incrustaciones y las almacena en el campo vectorial definido explícitamente.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. Define Vertex AI embedding function</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;vert_func&quot;</span>,                           <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,   <span class="hljs-comment"># Indicates a text embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],             <span class="hljs-comment"># Scalar field(s) containing text data to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense_vector&quot;</span>],        <span class="hljs-comment"># Vector field(s) for storing embeddings</span>
    params={                                    <span class="hljs-comment"># Vertex AI specific parameters (function-level)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;vertexai&quot;</span>,                 <span class="hljs-comment"># Must be set to &quot;vertexai&quot;</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-005&quot;</span>,     <span class="hljs-comment"># Required: Specifies the Vertex AI model to use</span>
        <span class="hljs-string">&quot;projectid&quot;</span>: <span class="hljs-string">&quot;your-gcp-project-id&quot;</span>,     <span class="hljs-comment"># Required: Your Google Cloud project ID</span>
        <span class="hljs-comment"># Optional parameters (include these only if necessary):</span>
        <span class="hljs-comment"># &quot;location&quot;: &quot;us-central1&quot;,            # Optional: Vertex AI service region (default us-central1)</span>
        <span class="hljs-comment"># &quot;task&quot;: &quot;DOC_RETRIEVAL&quot;,              # Optional: Embedding task type (default DOC_RETRIEVAL)</span>
        <span class="hljs-comment"># &quot;dim&quot;: 768                            # Optional: Output vector dimension (1-768)</span>
    }
)

<span class="hljs-comment"># Add the configured embedding function to your existing collection schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>

<table>
   <tr>
     <th><p><strong>Parámetro</strong></p></th>
     <th><p><strong>Descripción</strong></p></th>
     <th><p><strong>¿Necesario?</strong></p></th>
     <th><p><strong>Ejemplo Valor</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>El proveedor del modelo de incrustación. Establecer como "vertexai".</p></td>
     <td><p>Sí</p></td>
     <td><p><code translate="no">"vertexai"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>Especifica el modelo de incrustación Vertex AI que se va a utilizar.</p></td>
     <td><p>Sí</p></td>
     <td><p><code translate="no">"text-embedding-005"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">projectid</code></p></td>
     <td><p>Su ID de proyecto de Google Cloud.</p></td>
     <td><p>Sí</p></td>
     <td><p><code translate="no">"your-gcp-project-id"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">location</code></p></td>
     <td><p>La región para el servicio Vertex AI. Actualmente, las incrustaciones de Vértice AI admiten principalmente us-central1. Por defecto es us-central1.</p></td>
     <td><p>No</p></td>
     <td><p><code translate="no">"us-central1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">task</code></p></td>
     <td><p>Especifica el tipo de tarea de incrustación, que afecta a los resultados de la incrustación. Valores aceptados: DOC_RETRIEVAL (por defecto), CODE_RETRIEVAL (sólo se admite 005), STS (Semantic Textual Similarity).</p></td>
     <td><p>No</p></td>
     <td><p><code translate="no">"DOC_RETRIEVAL"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dim</code></p></td>
     <td><p>La dimensión de los vectores de incrustación de salida. Acepta números enteros entre 1 y 768. <strong>Nota:</strong> Si se especifica, asegúrese de que la dimensión del campo vectorial en el esquema coincide con este valor.</p></td>
     <td><p>No</p></td>
     <td><p><code translate="no">768</code></p></td>
   </tr>
</table>
<h2 id="Next-steps" class="common-anchor-header">Pasos siguientes<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><p>Después de configurar la función de incrustación, consulte la <a href="/docs/es/embeddings.md">Descripción general de la función</a> para obtener orientación adicional sobre la configuración de índices, ejemplos de inserción de datos y operaciones de búsqueda semántica.</p>
