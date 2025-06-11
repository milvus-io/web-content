---
id: voyage-ai.md
title: IA de VoyageCompatible with Milvus 2.6.x
summary: >-
  Este tema describe cómo configurar y utilizar las funciones de incrustación de
  Voyage AI en Milvus.
beta: Milvus 2.6.x
---
<h1 id="Voyage-AI" class="common-anchor-header">IA de Voyage<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Voyage-AI" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tema describe cómo configurar y utilizar las funciones de incrustación de Voyage AI en Milvus.</p>
<h2 id="Choose-an-embedding-model" class="common-anchor-header">Elegir un modelo de incrustación<button data-href="#Choose-an-embedding-model" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus es compatible con los modelos de incrustación proporcionados por Voyage AI. A continuación se muestran los modelos de incrustación disponibles actualmente para una referencia rápida:</p>
<table>
   <tr>
     <th><p>Nombre del modelo</p></th>
     <th><p>Dimensiones</p></th>
     <th><p>Fichas máximas</p></th>
     <th><p>Descripción</p></th>
   </tr>
   <tr>
     <td><p>voyage-3-large</p></td>
     <td><p>1.024 (por defecto), 256, 512, 2.048</p></td>
     <td><p>32,000</p></td>
     <td><p>La mejor calidad de recuperación general y multilingüe.</p></td>
   </tr>
   <tr>
     <td><p>voyage-3</p></td>
     <td><p>1,024</p></td>
     <td><p>32,000</p></td>
     <td><p>Optimizado para una calidad de recuperación general y multilingüe. Consulte la <a href="https://blog.voyageai.com/2024/09/18/voyage-3/">entrada del blog</a> para obtener más información.</p></td>
   </tr>
   <tr>
     <td><p>voyage-3-lite</p></td>
     <td><p>512</p></td>
     <td><p>32,000</p></td>
     <td><p>Optimizado para latencia y coste. Consulte la <a href="https://blog.voyageai.com/2024/09/18/voyage-3/">entrada del blog</a> para obtener más información.</p></td>
   </tr>
   <tr>
     <td><p>voyage-código-3</p></td>
     <td><p>1.024 (por defecto), 256, 512, 2.048</p></td>
     <td><p>32,000</p></td>
     <td><p>Optimizado para la recuperación de códigos. Consulte la <a href="https://blog.voyageai.com/2024/12/04/voyage-code-3/">entrada del blog</a> para obtener más información.</p></td>
   </tr>
   <tr>
     <td><p>voyage-finance-2</p></td>
     <td><p>1,024</p></td>
     <td><p>32,000</p></td>
     <td><p>Optimizado para la recuperación de finanzas y RAG. Consulte la <a href="https://blog.voyageai.com/2024/06/03/domain-specific-embeddings-finance-edition-voyage-finance-2/">entrada del blog</a> para obtener más información.</p></td>
   </tr>
   <tr>
     <td><p>voyage-ley-2</p></td>
     <td><p>1,024</p></td>
     <td><p>16,000</p></td>
     <td><p>Optimizado para recuperación legal y RAG. También se ha mejorado el rendimiento en todos los dominios. Consulte la <a href="https://blog.voyageai.com/2024/04/15/domain-specific-embeddings-and-retrieval-legal-edition-voyage-law-2/">entrada del blog</a> para obtener más información.</p></td>
   </tr>
   <tr>
     <td><p>voyage-code-2</p></td>
     <td><p>1,536</p></td>
     <td><p>16,000</p></td>
     <td><p>Optimizado para la recuperación de código (un 17% mejor que las alternativas) / Generación anterior de incrustaciones de código. Para más detalles, consulte la <a href="https://blog.voyageai.com/2024/01/23/voyage-code-2-elevate-your-code-retrieval/">entrada del blog</a>.</p></td>
   </tr>
</table>
<p>Para más detalles, consulte <a href="https://docs.voyageai.com/reference/embeddings-api">Modelos de incrustación de texto</a>.</p>
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
    </button></h2><p>Milvus debe conocer su clave API Voyage AI antes de poder solicitar incrustaciones. Milvus proporciona dos métodos para configurar las credenciales:</p>
<ul>
<li><p><strong>Archivo de configuración (recomendado):</strong> Almacene la clave API en <code translate="no">milvus.yaml</code> para que cada reinicio y nodo la recoja automáticamente.</p></li>
<li><p><strong>Variables de entorno:</strong> Inyectar la clave en el momento del despliegue, ideal para Docker Compose.</p></li>
</ul>
<p>Elija uno de los dos métodos siguientes: el archivo de configuración es más fácil de mantener en máquinas virtuales y máquinas sin infraestructura, mientras que la ruta de las variables de entorno se adapta a los flujos de trabajo de los contenedores.</p>
<div class="alert note">
<p>Si una clave API para el mismo proveedor está presente tanto en el archivo de configuración como en una variable de entorno, Milvus siempre utiliza el valor en <code translate="no">milvus.yaml</code> e ignora la variable de entorno.</p>
</div>
<h3 id="Option-1-Configuration-file-recommended--higher-priority" class="common-anchor-header">Opción 1: Archivo de configuración (recomendado y de mayor prioridad)</h3><p>Mantenga sus claves API en <code translate="no">milvus.yaml</code>; Milvus las lee al inicio y anula cualquier variable de entorno para el mismo proveedor.</p>
<ol>
<li><p>**Declare sus claves en <code translate="no">credential:</code></p>
<p>Puedes listar una o muchas claves API - dale a cada una una etiqueta que inventes y a la que harás referencia más tarde.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">apikey_dev:</span>            <span class="hljs-comment"># dev environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_DEV_KEY&gt;</span>
  <span class="hljs-attr">apikey_prod:</span>           <span class="hljs-comment"># production environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_PROD_KEY&gt;</span>    
<button class="copy-code-btn"></button></code></pre>
<p>Poner las claves API aquí las hace persistentes a través de reinicios y le permite cambiar las claves con sólo cambiar una etiqueta.</p></li>
<li><p><strong>Indique a Milvus qué clave debe utilizar para las llamadas de servicio</strong></p>
<p>En el mismo archivo, indique al proveedor Voyage AI la etiqueta que desea que utilice.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">voyageai:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey_dev</span>      <span class="hljs-comment"># ← choose any label you defined above</span>
        <span class="hljs-comment"># url: https://api.voyageai.com/v1/embeddings   # (optional) custom endpoint</span>
<button class="copy-code-btn"></button></code></pre>
<p>Esto vincula una clave específica a cada solicitud que Milvus envía al punto final de incrustaciones Voyage AI.</p></li>
</ol>
<h3 id="Option-2-Environment-variable" class="common-anchor-header">Opción 2: Variable de entorno</h3><p>Utilice este método cuando ejecute Milvus con Docker Compose y prefiera mantener los secretos fuera de los archivos e imágenes.</p>
<p>Milvus recurre a la variable de entorno sólo si no se encuentra ninguna clave para el proveedor en <code translate="no">milvus.yaml</code>.</p>
<table>
   <tr>
     <th><p>Variable</p></th>
     <th><p>Requerida</p></th>
     <th><p>Descripción</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">MILVUSAI_VOYAGEAI_API_KEY</code></p></td>
     <td><p>Sí</p></td>
     <td><p>Tu clave API Voyage AI válida.</p></td>
   </tr>
</table>
<p>En tu archivo <strong>docker-compose.yaml</strong>, establece la variable de entorno <code translate="no">MILVUSAI_VOYAGEAI_API_KEY</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml (standalone service section)</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-comment"># ... other configurations ...</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-comment"># ... other environment variables ...</span>
    <span class="hljs-comment"># Set the environment variable pointing to the Voyage AI API key inside the container</span>
    <span class="hljs-attr">MILVUSAI_VOYAGEAI_API_KEY:</span> <span class="hljs-string">&lt;MILVUSAI_VOYAGEAI_API_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>El bloque <code translate="no">environment:</code> inyecta la clave sólo en el contenedor Milvus, dejando su sistema operativo anfitrión intacto. Para más detalles, consulte <a href="/docs/es/configure-docker.md#Configure-Milvus-with-Docker-Compose">Configurar Milvus con Docker Compose</a>.</p>
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
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1024</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">Paso 2: Añadir la función de incrustación al esquema</h3><p>El módulo Function de Milvus convierte automáticamente los datos brutos almacenados en un campo escalar en incrustaciones y los almacena en el campo vectorial definido explícitamente.</p>
<p>El ejemplo siguiente añade un módulo Function (<code translate="no">voya</code>) que convierte el campo escalar <code translate="no">&quot;document&quot;</code> en incrustaciones, almacenando los vectores resultantes en el campo vectorial <code translate="no">&quot;dense&quot;</code> definido anteriormente.</p>
<p>Una vez que haya definido su función de incrustación, añádala a su esquema de colección. Esto indica a Milvus que utilice la función de incrustación especificada para procesar y almacenar las incrustaciones de sus datos de texto.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function specifically for embedding model provider</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;voya&quot;</span>,                                  <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,     <span class="hljs-comment"># Indicates a text embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],               <span class="hljs-comment"># Scalar field(s) containing text data to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],                 <span class="hljs-comment"># Vector field(s) for storing embeddings</span>
    params={                                      <span class="hljs-comment"># Provider-specific embedding parameters (function-level)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;voyageai&quot;</span>,                   <span class="hljs-comment"># Must be set to &quot;voyageai&quot;</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;voyage-3-large&quot;</span>,                 <span class="hljs-comment"># Specifies the embedding model to use</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey_dev&quot;,      # Optional: Credential label specified in milvus.yaml</span>
        <span class="hljs-comment"># &quot;url&quot;: &quot;https://api.voyageai.com/v1/embeddings&quot;,     # Defaults to the official endpoint if omitted</span>
        <span class="hljs-comment"># &quot;dim&quot;: &quot;1024&quot;                           # Output dimension of the vector embeddings after truncation</span>
        <span class="hljs-comment"># &quot;truncation&quot;: &quot;true&quot;                    # Whether to truncate the input texts to fit within the context length. Defaults to true.</span>
    }
)

<span class="hljs-comment"># Add the configured embedding function to your existing collection schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Después de configurar la función de incrustación, consulte la <a href="/docs/es/embedding-function-overview.md">Descripción general de la función</a> para obtener orientación adicional sobre la configuración del índice, ejemplos de inserción de datos y operaciones de búsqueda semántica.</p>
