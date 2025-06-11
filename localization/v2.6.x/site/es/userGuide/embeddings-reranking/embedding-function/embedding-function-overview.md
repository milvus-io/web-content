---
id: embedding-function-overview.md
title: Visión general de la función de incrustaciónCompatible with Milvus 2.6.x
summary: >-
  El módulo Function de Milvus le permite transformar datos de texto sin
  procesar en incrustaciones vectoriales llamando automáticamente a proveedores
  de modelos externos (como OpenAI, AWS Bedrock, Google Vertex AI, etc.). Con el
  módulo Function, ya no es necesario interactuar manualmente con las API de
  incrustación: Milvus se encarga de todo el proceso de enviar solicitudes a los
  proveedores, recibir incrustaciones y almacenarlas en sus colecciones. Para la
  búsqueda semántica, sólo necesita proporcionar datos de consulta sin procesar,
  no un vector de consulta. Milvus genera el vector de consulta con el mismo
  modelo que utilizó para la ingesta, lo compara con los vectores almacenados y
  devuelve los resultados más relevantes.
beta: Milvus 2.6.x
---
<h1 id="Embedding-Function-Overview" class="common-anchor-header">Visión general de la función de incrustación<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Embedding-Function-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>El módulo Function de Milvus le permite transformar datos de texto sin procesar en incrustaciones vectoriales llamando automáticamente a proveedores de modelos externos (como OpenAI, AWS Bedrock, Google Vertex AI, etc.). Con el módulo Function, ya no es necesario interactuar manualmente con las API de incrustación: Milvus se encarga de todo el proceso de enviar solicitudes a los proveedores, recibir incrustaciones y almacenarlas en sus colecciones. Para la búsqueda semántica, sólo necesita proporcionar datos de consulta sin procesar, no un vector de consulta. Milvus genera el vector de consulta con el mismo modelo que utilizó para la ingesta, lo compara con los vectores almacenados y devuelve los resultados más relevantes.</p>
<h2 id="Limits" class="common-anchor-header">Límites<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Cualquier campo de entrada que incorpore el módulo Function debe contener siempre un valor; si se proporciona un valor nulo, el módulo lanzará un error.</p></li>
<li><p>El módulo Function sólo procesa campos definidos explícitamente en el esquema de la colección; no genera incrustaciones para campos dinámicos.</p></li>
<li><p>Los campos de entrada que se incrusten deben ser del tipo <code translate="no">VARCHAR</code>.</p></li>
<li><p>El módulo Function puede incrustar un campo de entrada en:</p>
<ul>
<li><p><code translate="no">FLOAT_VECTOR</code></p></li>
<li><p><code translate="no">INT8_VECTOR</code></p></li>
</ul>
<p>No se admiten conversiones a <code translate="no">BINARY_VECTOR</code>, <code translate="no">FLOAT16_VECTOR</code> o <code translate="no">BFLOAT16_VECTOR</code>.</p></li>
</ul>
<h2 id="Overview" class="common-anchor-header">Visión general<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>El módulo Function convierte texto sin formato en incrustaciones vectoriales llamando a un proveedor de modelos externo de su elección. Los distintos proveedores admiten diferentes modelos, formatos de incrustación y métodos de autenticación, que se resumen a continuación.</p>
<h3 id="Supported-model-providers" class="common-anchor-header">Proveedores de modelos compatibles</h3><table>
   <tr>
     <th><p>Proveedor</p></th>
     <th><p>Modelos típicos</p></th>
     <th><p>Tipo de incrustación</p></th>
     <th><p>Método de autenticación</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/es/openai.md">OpenAI</a></p></td>
     <td><p>incrustación de texto-3-*</p></td>
     <td><p>Denso (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Clave API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/azure-openai.md">Azure OpenAI</a></p></td>
     <td><p>Basado en el despliegue</p></td>
     <td><p>Denso (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Clave API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/dashscope.md">DashScope</a></p></td>
     <td><p>texto-incrustación-v3</p></td>
     <td><p>Denso (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Clave API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/bedrock.md">Bedrock</a></p></td>
     <td><p>amazon.titan-embed-text-v2</p></td>
     <td><p>Denso (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Par AK/SK</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/vertex-ai.md">Vértice AI</a></p></td>
     <td><p>texto-incrustado-005</p></td>
     <td><p>Denso (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Cuenta de servicio GCP JSON</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/voyage-ai.md">Viaje AI</a></p></td>
     <td><p>voyage-3, voyage-lite-02</p></td>
     <td><p>Denso (<code translate="no">FLOAT_VECTOR</code> / <code translate="no">INT8_VECTOR</code>)</p></td>
     <td><p>Clave API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/cohere.md">Cohere</a></p></td>
     <td><p>embed-english-v3.0</p></td>
     <td><p>Denso (<code translate="no">FLOAT_VECTOR</code> / <code translate="no">INT8_VECTOR</code>)</p></td>
     <td><p>Clave API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/siliconflow.md">SiliconFlow</a></p></td>
     <td><p>BAAI/bge-large-zh-v1.5</p></td>
     <td><p>Denso (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Clave API</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/es/hugging-face-tei.md">Cara abrazada</a></p></td>
     <td><p>Cualquier modelo servido por TEI</p></td>
     <td><p>Denso (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>Clave API opcional</p></td>
   </tr>
</table>
<h3 id="Workflow" class="common-anchor-header">Flujo de trabajo</h3><p>El siguiente diagrama muestra cómo funciona la función en Milvus.</p>
<ol>
<li><p><strong>Texto de entrada</strong>: Los usuarios introducen datos en bruto (por ejemplo, documentos) en Milvus.</p></li>
<li><p><strong>Generación de incrustaciones</strong>: El módulo Function dentro de Milvus llama automáticamente al proveedor de modelos configurado para convertir los datos brutos en incrustaciones vectoriales.</p></li>
<li><p><strong>Almacenar incrustaciones</strong>: Las incrustaciones resultantes se almacenan en campos vectoriales definidos explícitamente dentro de las colecciones de Milvus.</p></li>
<li><p><strong>Consulta de texto</strong>: Los usuarios envían consultas de texto a Milvus.</p></li>
<li><p><strong>Búsqueda semántica</strong>: Milvus convierte internamente las consultas en incrustaciones vectoriales, realiza búsquedas de similitud con las incrustaciones almacenadas y recupera los resultados relevantes.</p></li>
<li><p><strong>Devolución de resultados</strong>: Milvus devuelve a la aplicación los resultados más similares.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/embedding-function-overview.png" alt="Embedding Function Overview" class="doc-image" id="embedding-function-overview" />
   </span> <span class="img-wrapper"> <span>Visión general de las funciones de incrustación</span> </span></p>
<h3 id="Credential-management" class="common-anchor-header">Gestión de credenciales</h3><p>La conexión a API de incrustación externas requiere credenciales de autenticación (claves de API o pares de claves de acceso/secretas). Exponer estas credenciales en el código de su aplicación crea riesgos de seguridad. Milvus resuelve esto almacenando las credenciales de forma segura en el archivo de configuración de Milvus (<code translate="no">milvus.yaml</code>).</p>
<ol>
<li><p><strong>Añada credenciales</strong>: Bajo el bloque de nivel superior <code translate="no">credential:</code>, dé a cada credencial una etiqueta única; luego apunte a esa etiqueta en el bloque <code translate="no">function:</code>.</p></li>
<li><p><strong>El servidor carga la configuración</strong>: Milvus lee el archivo YAML, almacena en caché las claves sin procesar en la memoria y sólo recuerda sus etiquetas (por ejemplo, <code translate="no">apikey1</code>).</p></li>
<li><p><strong>Llama a la función</strong>: Especifique opcionalmente el argumento <code translate="no">credential</code>.</p>
<ul>
<li><p>Si proporciona un nombre de credencial con la definición de la función, Milvus utiliza la credencial especificada.</p></li>
<li><p>Si omite el argumento, Milvus utilizará automáticamente la credencial configurada para ese modelo de proveedor en <code translate="no">milvus.yaml</code>.</p>
<p>En cualquier caso, la clave secreta nunca abandona el servidor.</p></li>
</ul></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/credential-config-overflow.png" alt="Credential Config Overflow" class="doc-image" id="credential-config-overflow" />
   </span> <span class="img-wrapper"> <span>Desbordamiento de la configuración de credenciales</span> </span></p>
<div class="alert note">
<p>Si despliega Milvus con Docker Compose, también puede inyectar los mismos campos a través de variables de entorno. Consulte las guías específicas del proveedor para conocer los nombres exactos de las variables.</p>
</div>
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
    </button></h2><p>Antes de utilizar una función de incrustación con Milvus, configure las credenciales de acceso.</p>
<h3 id="Step-1-Add-credentials-to-Milvus-configuration" class="common-anchor-header">Paso 1: Añadir credenciales a la configuración de Milvus</h3><p>En su archivo <code translate="no">milvus.yaml</code>, edite el bloque <code translate="no">credential</code> con entradas para cada proveedor al que necesite acceder:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml credential store section</span>
<span class="hljs-comment"># This section defines all your authentication credentials for external embedding providers</span>
<span class="hljs-comment"># Each credential gets a unique name (e.g., aksk1, apikey1) that you&#x27;ll reference elsewhere</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-comment"># For AWS Bedrock or services using access/secret key pairs</span>
  <span class="hljs-comment"># &#x27;aksk1&#x27; is just an example name - you can choose any meaningful identifier</span>
  <span class="hljs-attr">aksk1:</span>                       
    <span class="hljs-attr">access_key_id:</span> <span class="hljs-string">&lt;YOUR_AK&gt;</span>      
    <span class="hljs-attr">secret_access_key:</span> <span class="hljs-string">&lt;YOUR_SK&gt;</span>  
  
  <span class="hljs-comment"># For OpenAI, Voyage AI, or other API key-based services</span>
  <span class="hljs-comment"># &#x27;apikey1&#x27; is a custom name you choose to identify this credential  </span>
  <span class="hljs-attr">apikey1:</span>                     
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_API_KEY&gt;</span>        
  
  <span class="hljs-comment"># For Google Vertex AI using service account credentials</span>
  <span class="hljs-comment"># &#x27;gcp1&#x27; is an example name for your Google Cloud credentials</span>
  <span class="hljs-attr">gcp1:</span>                        
    <span class="hljs-attr">credential_json:</span> <span class="hljs-string">&lt;BASE64_OF_JSON&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Tipo de proveedor</p></th>
     <th><p>Campos obligatorios</p></th>
     <th><p>Ejemplo de configuración</p></th>
   </tr>
   <tr>
     <td><p>Par AK/SK (AWS Bedrock)</p></td>
     <td><p><code translate="no">access_key_id</code>, <code translate="no">secret_access_key</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     aksk1:    # custom label
         access_key_id: &lt;YOUR_AK&gt;
         secret_access_key: &lt;YOUR_SK&gt;
     ...
</code></pre></td>
   </tr>
   <tr>
     <td><p>basado en clave API (OpenAI, Voyage AI, etc.)</p></td>
     <td><p><code translate="no">apikey</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     apikey1:    # custom label
         apikey: &lt;YOUR_API_KEY&gt;
     ...
</code></pre></td>
   </tr>
   <tr>
     <td><p>JSON de cuenta de servicio GCP (Vertex AI)</p></td>
     <td><p><code translate="no">credential_json</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     gcp1:    # custom label
         credential_json: &lt;BASE64_OF_JSON&gt;
     ...
</code></pre></td>
   </tr>
</table>
<h3 id="Step-2-Configure-provider-settings" class="common-anchor-header">Paso 2: Configurar los ajustes del proveedor</h3><p>En el mismo archivo de configuración, edite el bloque <code translate="no">function</code> para indicar a Milvus qué clave debe utilizar para incrustar las llamadas de servicio:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">openai:</span>                         <span class="hljs-comment"># calls OpenAI</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey1</span>           <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-comment"># url: https://api.openai.com/v1/embeddings   # (optional) custom endpoint</span>

      <span class="hljs-attr">bedrock:</span>                        <span class="hljs-comment"># calls AWS Bedrock</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">aksk1</span>             <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-attr">region:</span> <span class="hljs-string">us-east-2</span>

      <span class="hljs-attr">vertexai:</span>                       <span class="hljs-comment"># calls Google Vertex AI</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">gcp1</span>              <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-comment"># url:                        # (optional) custom endpoint</span>

      <span class="hljs-attr">tei:</span>                            <span class="hljs-comment"># Built-in Tiny Embedding model</span>
        <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>                  <span class="hljs-comment"># Whether to enable TEI model service</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para más información sobre cómo aplicar la configuración de Milvus, consulte <a href="/docs/es/dynamic_config.md">Configurar Milvus sobre la marcha</a>.</p>
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
    </button></h2><p>Una vez configuradas las credenciales, siga estos pasos para definir y utilizar las funciones de incrustación.</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">Paso 1: Definir campos de esquema</h3><p>Para utilizar una función de incrustación, cree una colección con un esquema específico. Este esquema debe incluir al menos tres campos necesarios:</p>
<ul>
<li><p>El campo primario que identifica de forma única a cada entidad de una colección.</p></li>
<li><p>Un campo escalar que almacena los datos brutos que se van a incrustar.</p></li>
<li><p>Un campo vectorial reservado para almacenar las incrustaciones vectoriales que la función generará para el campo escalar.</p></li>
</ul>
<p>El siguiente ejemplo define un esquema con un campo escalar <code translate="no">&quot;document&quot;</code> para almacenar datos textuales y un campo vectorial <code translate="no">&quot;dense&quot;</code> para almacenar las incrustaciones que generará el módulo Función. Recuerde ajustar la dimensión del vector (<code translate="no">dim</code>) para que coincida con la salida del modelo de incrustación elegido.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType

<span class="hljs-comment"># Initialize Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
)

<span class="hljs-comment"># Create a new schema for the collection</span>
schema = client.create_schema()

<span class="hljs-comment"># Add primary field &quot;id&quot;</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)

<span class="hljs-comment"># Add scalar field &quot;document&quot; for storing textual data</span>
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>)

<span class="hljs-comment"># Add vector field &quot;dense&quot; for storing embeddings.</span>
<span class="hljs-comment"># IMPORTANT: Set dim to match the exact output dimension of the embedding model.</span>
<span class="hljs-comment"># For instance, OpenAI&#x27;s text-embedding-3-small model outputs 1536-dimensional vectors.</span>
<span class="hljs-comment"># For dense vector, data type can be FLOAT_VECTOR or INT8_VECTOR</span>
<span class="hljs-comment"># For sparse vector, data type must be SPARSE_FLOAT_VECTOR</span>
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1536</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">Paso 2: Añadir la función de incrustación al esquema</h3><p>El módulo Function de Milvus convierte automáticamente los datos brutos almacenados en un campo escalar en incrustaciones y los almacena en el campo vectorial definido explícitamente.</p>
<p>El ejemplo siguiente añade un módulo Function (<code translate="no">openai_embedding</code>) que convierte el campo escalar <code translate="no">&quot;document&quot;</code> en incrustaciones, almacenando los vectores resultantes en el campo vectorial <code translate="no">&quot;dense&quot;</code> definido anteriormente.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function (example: OpenAI provider)</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;openai_embedding&quot;</span>,                        <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,       <span class="hljs-comment"># Type of embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],                 <span class="hljs-comment"># Scalar field to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],                   <span class="hljs-comment"># Vector field to store embeddings</span>
    params={                                        <span class="hljs-comment"># Provider-specific configuration (highest priority)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;openai&quot;</span>,                       <span class="hljs-comment"># Embedding model provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>,     <span class="hljs-comment"># Embedding model</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey1&quot;,                    # Optional: Credential label specified in milvus.yaml</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;dim&quot;: &quot;1536&quot;,                            # Optionally shorten the output vector dimension</span>
        <span class="hljs-comment"># &quot;user&quot;: &quot;user123&quot;                         # Optional: identifier for API tracking</span>
    }
)

<span class="hljs-comment"># Add the embedding function to your schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parámetro</p></th>
     <th><p>Descripción</p></th>
     <th><p>Ejemplo Valor</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Identificador único para la función de incrustación dentro de Milvus.</p></td>
     <td><p><code translate="no">"openai_embedding"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Tipo de función de incrustación utilizada. Valores posibles:</p>
<ul>
<li><p><code translate="no">FunctionType.TEXTEMBEDDING</code>: Genera vectores densos que capturan el significado semántico del texto.</p></li>
<li><p><code translate="no">FunctionType.BM25</code>: Genera vectores dispersos basados en el algoritmo de clasificación BM25, que calcula las puntuaciones de relevancia utilizando la frecuencia de términos y la frecuencia inversa de documentos. Para más información, consulte <a href="/docs/es/full-text-search.md">Búsqueda de texto completo</a>.</p></li>
</ul></td>
     <td><p><code translate="no">FunctionType.TEXTEMBEDDING</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Campo escalar que contiene los datos brutos que deben incrustarse. Actualmente, este parámetro sólo acepta un nombre de campo.</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">output_field_names</code></p></td>
     <td><p>Campo vectorial para almacenar las incrustaciones generadas. Actualmente, este parámetro sólo acepta un nombre de campo.</p></td>
     <td><p><code translate="no">["dense"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>Diccionario que contiene las configuraciones de incrustación. Nota: Los parámetros de <code translate="no">params</code> varían en función de los proveedores de modelos de incrustación.</p></td>
     <td><p><code translate="no">{...}</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>El proveedor del modelo de incrustación.</p></td>
     <td><p><code translate="no">"openai"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>Especifica qué modelo de incrustación utilizar.</p></td>
     <td><p><code translate="no">"text-embedding-3-small"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">credential</code></p></td>
     <td><p>La etiqueta de una credencial definida en la sección de nivel superior <code translate="no">credential:</code> de <code translate="no">milvus.yaml</code>. </p>
<ul>
<li><p>Cuando se proporciona, Milvus recupera el par de claves o token de API coincidente y firma la solicitud en el lado del servidor.</p></li>
<li><p>Cuando se omite (<code translate="no">None</code>), Milvus vuelve a la credencial configurada explícitamente para el proveedor del modelo de destino en <code translate="no">milvus.yaml</code>.</p></li>
<li><p>Si la etiqueta es desconocida o falta la clave referenciada, la llamada falla.</p></li>
</ul></td>
     <td><p><code translate="no">"apikey1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dim</code></p></td>
     <td><p>El número de dimensiones para las incrustaciones de salida. Para los modelos de tercera generación de OpenAI, se puede acortar el vector completo para reducir el coste y la latencia sin una pérdida significativa de información semántica. Para obtener más información, consulte <a href="https://openai.com/blog/new-embedding-models-and-api-updates">la publicación del blog del anuncio de OpenAI</a>. <strong>Nota:</strong> Si acorta la dimensión del vector, asegúrese de que el valor <code translate="no">dim</code> especificado en el método <code translate="no">add_field</code> del esquema para el campo del vector coincida con la dimensión de salida final de su función de incrustación.</p></td>
     <td><p><code translate="no">"1536"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">user</code></p></td>
     <td><p>Un identificador a nivel de usuario para realizar un seguimiento del uso de la API.</p></td>
     <td><p><code translate="no">"user123"</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>Para colecciones con varios campos escalares que requieren conversión de texto a vector, añada funciones independientes al esquema de la colección, asegurándose de que cada función tiene un nombre y un valor <code translate="no">output_field_names</code> únicos.</p>
</div>
<h3 id="Step-3-Configure-index" class="common-anchor-header">Paso 3: Configurar el índice</h3><p>Tras definir el esquema con los campos necesarios y la función incorporada, configure el índice para su colección. Para simplificar este proceso, utilice <code translate="no">AUTOINDEX</code> como <code translate="no">index_type</code>, una opción que permite a Milvus elegir y configurar el tipo de índice más adecuado en función de la estructura de sus datos.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add AUTOINDEX to automatically select optimal indexing method</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span> 
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-4-Create-collection" class="common-anchor-header">Paso 4: Crear la colección</h3><p>Ahora cree la colección utilizando el esquema y los parámetros de índice definidos.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create collection named &quot;demo&quot;</span>
client.create_collection(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    schema=schema, 
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-5-Insert-data" class="common-anchor-header">Paso 5: Insertar datos</h3><p>Una vez configurada la colección y el índice, está listo para insertar los datos sin procesar. En este proceso, sólo necesita proporcionar el texto sin procesar. El módulo Function que definimos anteriormente genera automáticamente el vector disperso correspondiente para cada entrada de texto.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert sample documents</span>
client.insert(<span class="hljs-string">&#x27;demo&#x27;</span>, [
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Milvus simplifies semantic search through embeddings.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Vector embeddings convert text into searchable numeric data.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Semantic search helps users find relevant information quickly.&#x27;</span>},
])
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-6-Perform-vector-search" class="common-anchor-header">Paso 6: Realizar la búsqueda de vectores</h3><p>Después de insertar los datos, realice una búsqueda semántica utilizando el texto en bruto de la consulta. Milvus convierte automáticamente su consulta en un vector de incrustación, recupera los documentos relevantes basándose en la similitud y devuelve los resultados más coincidentes.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Perform semantic search</span>
results = client.search(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    data=[<span class="hljs-string">&#x27;How does Milvus handle semantic search?&#x27;</span>], <span class="hljs-comment"># Use text query rather than query vector</span>
    anns_field=<span class="hljs-string">&#x27;dense&#x27;</span>,   <span class="hljs-comment"># Use the vector field that stores embeddings</span>
    limit=<span class="hljs-number">1</span>,
    output_fields=[<span class="hljs-string">&#x27;document&#x27;</span>],
)

<span class="hljs-built_in">print</span>(results)

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: 1, &#x27;distance&#x27;: 0.8821347951889038, &#x27;entity&#x27;: {&#x27;document&#x27;: &#x27;Milvus simplifies semantic search through embeddings.&#x27;}}]&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para más información sobre las operaciones de búsqueda y consulta, consulte <a href="/docs/es/single-vector-search.md">Búsqueda vectorial básica</a> y <a href="/docs/es/get-and-scalar-query.md">consulta</a>.</p>
