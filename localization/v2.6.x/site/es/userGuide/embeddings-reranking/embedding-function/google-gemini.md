---
id: google-gemini.md
title: Google Gemini
summary: >-
  Utilice un modelo de incrustación de Google Gemini con Milvus eligiendo un
  modelo y configurando Milvus con su clave API Gemini.
---
<h1 id="Google-Gemini" class="common-anchor-header">Google Gemini<button data-href="#Google-Gemini" class="anchor-icon" translate="no">
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
    </button></h1><p>Utilice un modelo de incrustación de Google Gemini con Milvus eligiendo un modelo y configurando Milvus con su clave API Gemini.</p>
<h2 id="Choose-an-embedding-model" class="common-anchor-header">Elija un modelo de incrustación<button data-href="#Choose-an-embedding-model" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus es compatible con los modelos de incrustación proporcionados por Google Gemini. A continuación se muestran los modelos de incrustación de Gemini disponibles actualmente para una referencia rápida:</p>
<table>
   <tr>
     <th><p><strong>Nombre del modelo</strong></p></th>
     <th><p><strong>Dimensiones</strong></p></th>
     <th><p><strong>Fichas máximas</strong></p></th>
     <th><p><strong>Descripción</strong></p></th>
   </tr>
   <tr>
     <td><p>gemini-incrustación-001</p></td>
     <td><p>Predeterminado: 3.072 (recomendado: 768, 1.536 o 3.072)</p></td>
     <td><p>8,192</p></td>
     <td><p>Modelo de incrustación de texto con dimensiones flexibles, entrenado mediante Matryoshka Representation Learning (MRL).</p></td>
   </tr>
   <tr>
     <td><p>gemini-incrustación-2</p></td>
     <td><p>Por defecto: 3.072 (recomendado: 768, 1.536 o 3.072)</p></td>
     <td><p>8,192</p></td>
     <td><p>El primer modelo de incrustación multimodal nativo de Google, que admite texto, imágenes, vídeo, audio y documentos en un espacio de incrustación unificado.</p></td>
   </tr>
</table>
<p>Ambos modelos se entrenan mediante la técnica Matryoshka Representation Learning (MRL), que permite dimensiones de salida flexibles a través del parámetro <code translate="no">dim</code>. Se recomienda empezar con 768 dimensiones y ampliarlas a 1.536 o 3.072 si es necesario. Para más información, consulte <a href="https://ai.google.dev/gemini-api/docs/embeddings">Modelos de incrustación Gemini</a>.</p>
<p>Los modelos de incrustación Gemini también admiten un parámetro de <strong>tipo de tarea</strong> que optimiza las incrustaciones para casos de uso específicos. Milvus establece automáticamente el tipo de tarea en función de la operación:</p>
<ul>
<li><p><strong>Insertar / Subinsertar</strong>: <code translate="no">RETRIEVAL_DOCUMENT</code></p></li>
<li><p><strong>Buscar</strong>: <code translate="no">RETRIEVAL_QUERY</code></p></li>
</ul>
<p>Puede anular esto especificando explícitamente un parámetro <code translate="no">task</code> (por ejemplo, <code translate="no">SEMANTIC_SIMILARITY</code>, <code translate="no">CLASSIFICATION</code>, <code translate="no">CLUSTERING</code>).</p>
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
    </button></h2><p>Milvus debe conocer su clave API Gemini antes de poder solicitar incrustaciones. Milvus proporciona dos métodos para configurar las credenciales:</p>
<ul>
<li><p><strong>Archivo de configuración (recomendado):</strong> Almacene la clave API en <code translate="no">milvus.yaml</code> para que cada reinicio y nodo la recoja automáticamente.</p></li>
<li><p><strong>Variables de entorno:</strong> Inyectar la clave en el momento del despliegue, ideal para Docker Compose.</p></li>
</ul>
<p>Elija uno de los dos métodos siguientes: el archivo de configuración es más fácil de mantener en máquinas virtuales y máquinas sin infraestructura, mientras que la ruta de las variables de entorno se adapta a los flujos de trabajo de los contenedores.</p>
<p>Si una clave API para el mismo proveedor está presente tanto en el archivo de configuración como en una variable de entorno, Milvus siempre utiliza el valor en <code translate="no">milvus.yaml</code> e ignora la variable de entorno.</p>
<h3 id="Option-1-Configuration-file-recommended--higher-priority" class="common-anchor-header">Opción 1: Archivo de configuración (recomendado y de mayor prioridad)<button data-href="#Option-1-Configuration-file-recommended--higher-priority" class="anchor-icon" translate="no">
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
    </button></h3><p>Mantenga sus claves API en <code translate="no">milvus.yaml</code>; Milvus las lee al inicio y anula cualquier variable de entorno para el mismo proveedor.</p>
<ol>
<li><p><strong>Declare sus claves bajo credencial:</strong></p>
<p>Puedes listar una o muchas claves API - dale a cada una una etiqueta que inventes y a la que harás referencia más tarde.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">apikey_dev:</span>            <span class="hljs-comment"># dev environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_DEV_KEY&gt;</span>
  <span class="hljs-attr">apikey_prod:</span>           <span class="hljs-comment"># production environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_PROD_KEY&gt;</span>    
<button class="copy-code-btn"></button></code></pre>
<p>Poner las claves API aquí las hace persistentes a través de reinicios y le permite cambiar las claves simplemente cambiando una etiqueta.</p></li>
<li><p><strong>Indique a Milvus qué clave debe utilizar para las llamadas a Gemini</strong></p>
<p>En el mismo archivo, indique al proveedor Gemini la etiqueta que desea que utilice.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">gemini:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey_dev</span>      <span class="hljs-comment"># ← choose any label you defined above</span>
<button class="copy-code-btn"></button></code></pre>
<p>Esto vincula una clave específica a cada solicitud que Milvus envía al punto final de incrustaciones Gemini.</p></li>
</ol>
<h3 id="Option-2-Environment-variable" class="common-anchor-header">Opción 2: Variable de entorno<button data-href="#Option-2-Environment-variable" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilice este método cuando ejecute Milvus con Docker Compose y prefiera mantener los secretos fuera de los archivos e imágenes.</p>
<p>Milvus recurre a la variable de entorno sólo si no se encuentra ninguna clave para el proveedor en <code translate="no">milvus.yaml</code>.</p>
<table>
   <tr>
     <th><p><strong>Variable</strong></p></th>
     <th><p><strong>Requerida</strong></p></th>
     <th><p><strong>Descripción</strong></p></th>
   </tr>
   <tr>
     <td><p>MILVUS_GEMINI_API_KEY</p></td>
     <td><p>Sí</p></td>
     <td><p>Hace que la clave Gemini esté disponible dentro de cada contenedor Milvus (se ignora cuando existe una clave para Gemini en milvus.yaml)</p></td>
   </tr>
</table>
<p>En su archivo <strong>docker-compose.yaml</strong>, establezca la variable de entorno <code translate="no">MILVUS_GEMINI_API_KEY</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml (standalone service section)</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-comment"># ... other configurations ...</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-comment"># ... other environment variables ...</span>
    <span class="hljs-comment"># Set the environment variable pointing to the Gemini API key inside the container</span>
    <span class="hljs-attr">MILVUS_GEMINI_API_KEY:</span> <span class="hljs-string">&lt;YOUR_GEMINI_API_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>El bloque <code translate="no">environment:</code> inyecta la clave sólo en el contenedor Milvus, dejando su sistema operativo anfitrión intacto. Para más detalles, consulte <a href="http://configure-docker.md#Configure-Milvus-with-Docker-Compose">Configurar Milvus con Docker Compose</a>.</p>
<h2 id="Step-1-Create-a-collection-with-a-text-embedding-function" class="common-anchor-header">Paso 1: Crear una colección con una función de incrustación de texto<button data-href="#Step-1-Create-a-collection-with-a-text-embedding-function" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Define-schema-fields" class="common-anchor-header">Definir campos de esquema<button data-href="#Define-schema-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Para utilizar una función de incrustación, cree una colección con un esquema específico. Este esquema debe incluir al menos tres campos necesarios:</p>
<ul>
<li><p>El campo primario que identifica de forma única a cada entidad de una colección.</p></li>
<li><p>Un campo <code translate="no">VARCHAR</code> que almacena los datos brutos que se van a incrustar.</p></li>
<li><p>Un campo vectorial reservado para almacenar las incrustaciones vectoriales densas que la función de incrustación de texto generará para el campo <code translate="no">VARCHAR</code>.</p></li>
</ul>
<p>El siguiente ejemplo define un esquema con un campo escalar <code translate="no">&quot;document&quot;</code> para almacenar los datos textuales y un campo vectorial <code translate="no">&quot;dense&quot;</code> para almacenar las incrustaciones que generará el módulo Función. Recuerde ajustar la dimensión del vector (<code translate="no">dim</code>) para que coincida con la salida del modelo de incrustación elegido.</p>
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
<span class="hljs-comment"># For instance, Gemini&#x27;s gemini-embedding-001 model outputs 3072-dimensional vectors by default,</span>
<span class="hljs-comment"># but can be shortened to 768 or 1536 dimensions.</span>
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-the-text-embedding-function" class="common-anchor-header">Definir la función de incrustación de texto<button data-href="#Define-the-text-embedding-function" class="anchor-icon" translate="no">
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
    </button></h3><p>La función de incrustación de texto convierte automáticamente los datos brutos almacenados en un campo <code translate="no">VARCHAR</code> en incrustaciones y los almacena en el campo vectorial definido explícitamente.</p>
<p>El ejemplo siguiente añade un módulo de función (<code translate="no">gemini_embedding</code>) que convierte el campo escalar <code translate="no">&quot;document&quot;</code> en incrustaciones, almacenando los vectores resultantes en el campo vectorial <code translate="no">&quot;dense&quot;</code> definido anteriormente.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function (example: Gemini provider)</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;gemini_embedding&quot;</span>,                        <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,       <span class="hljs-comment"># Type of embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],                 <span class="hljs-comment"># Scalar field to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],                   <span class="hljs-comment"># Vector field to store embeddings</span>
    params={                                        <span class="hljs-comment"># Provider-specific configuration (highest priority)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;gemini&quot;</span>,                       <span class="hljs-comment"># Embedding model provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;gemini-embedding-001&quot;</span>,       <span class="hljs-comment"># Embedding model</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey_dev&quot;,               # Optional: Credential label specified in milvus.yaml</span>
        <span class="hljs-comment"># &quot;dim&quot;: &quot;768&quot;,                             # Optional: Output vector dimension (default 3072)</span>
        <span class="hljs-comment"># &quot;task&quot;: &quot;RETRIEVAL_DOCUMENT&quot;,             # Optional: Task type for embedding optimization</span>
    }
)

<span class="hljs-comment"># Add the embedding function to your schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Tipos de tarea admitidos para el parámetro task:</strong></p>
<ul>
<li><p><code translate="no">RETRIEVAL_DOCUMENT</code> - Optimiza las incrustaciones para la indexación de documentos (por defecto para insertar/insertar).</p></li>
<li><p><code translate="no">RETRIEVAL_QUERY</code> - Optimiza las incrustaciones para la recuperación de consultas (por defecto para la búsqueda).</p></li>
<li><p><code translate="no">SEMANTIC_SIMILARITY</code> - Optimiza las incrustaciones para medir la similitud de textos.</p></li>
<li><p><code translate="no">CLASSIFICATION</code> - Optimiza las incrustaciones para la clasificación de textos.</p></li>
<li><p><code translate="no">CLUSTERING</code> - Optimiza las incrustaciones para la agrupación.</p></li>
</ul>
<p>Cuando no se establece explícitamente, Milvus utiliza automáticamente <code translate="no">RETRIEVAL_DOCUMENT</code> durante la inserción/inserción y <code translate="no">RETRIEVAL_QUERY</code> durante la búsqueda.</p>
<h3 id="Configure-the-index" class="common-anchor-header">Configurar el índice<button data-href="#Configure-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Después de definir el esquema con los campos necesarios y la función incorporada, configure el índice para su colección. Para simplificar este proceso, utilice <code translate="no">AUTOINDEX</code> como <code translate="no">index_type</code>, una opción que permite a Milvus elegir y configurar el tipo de índice más adecuado en función de la estructura de sus datos.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add AUTOINDEX to automatically select optimal indexing method</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span> 
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-the-collection" class="common-anchor-header">Crear la colección<button data-href="#Create-the-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Ahora cree la colección utilizando el esquema y los parámetros de índice definidos.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create collection named &quot;demo&quot;</span>
client.create_collection(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    schema=schema, 
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-2-Insert-data" class="common-anchor-header">Paso 2: Insertar datos<button data-href="#Step-2-Insert-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez configurada la colección y el índice, está listo para insertar los datos sin procesar. En este proceso, sólo necesita proporcionar el texto sin procesar. El módulo Function que definimos anteriormente genera automáticamente el vector disperso correspondiente para cada entrada de texto.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert sample documents</span>
client.insert(<span class="hljs-string">&#x27;demo&#x27;</span>, [
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Milvus simplifies semantic search through embeddings.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Vector embeddings convert text into searchable numeric data.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Semantic search helps users find relevant information quickly.&#x27;</span>},
])
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-3-Search-with-text" class="common-anchor-header">Paso 3: Búsqueda con texto<button data-href="#Step-3-Search-with-text" class="anchor-icon" translate="no">
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
    </button></h2><p>Después de insertar los datos, realice una búsqueda semántica utilizando el texto en bruto de la consulta. Milvus convierte automáticamente su consulta en un vector de incrustación, recupera los documentos relevantes basándose en la similitud y devuelve los resultados más coincidentes.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Perform semantic search</span>
results = client.search(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    data=[<span class="hljs-string">&#x27;How does Milvus handle semantic search?&#x27;</span>], <span class="hljs-comment"># Use text query rather than query vector</span>
    anns_field=<span class="hljs-string">&#x27;dense&#x27;</span>,   <span class="hljs-comment"># Use the vector field that stores embeddings</span>
    limit=<span class="hljs-number">1</span>,
    output_fields=[<span class="hljs-string">&#x27;document&#x27;</span>],
)

<span class="hljs-built_in">print</span>(results)
<button class="copy-code-btn"></button></code></pre>
<p>Para obtener más información sobre las operaciones de búsqueda y consulta, consulte <a href="/docs/es/single-vector-search.md">Búsqueda vectorial básica</a> y <a href="/docs/es/get-and-scalar-query.md">consulta</a>.</p>
