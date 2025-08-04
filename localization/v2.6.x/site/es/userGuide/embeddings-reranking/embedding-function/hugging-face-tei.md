---
id: hugging-face-tei.md
title: TEI de Hugging FaceCompatible with Milvus 2.6.x
summary: >-
  Hugging Face Text Embeddings Inference (TEI) es un servidor de inferencia de
  alto rendimiento diseñado específicamente para modelos de incrustación de
  texto. Esta guía explica cómo utilizar Hugging Face TEI con Milvus para una
  generación eficiente de incrustaciones de texto.
beta: Milvus 2.6.x
---
<h1 id="Hugging-Face-TEI" class="common-anchor-header">TEI de Hugging Face<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Hugging-Face-TEI" class="anchor-icon" translate="no">
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
    </button></h1><p>Hugging Face <a href="https://huggingface.co/docs/text-embeddings-inference/en/index">Text Embeddings Inference (TEI)</a> es un servidor de inferencia de alto rendimiento diseñado específicamente para modelos de incrustación de texto. Esta guía explica cómo utilizar Hugging Face TEI con Milvus para una generación eficiente de incrustación de texto.</p>
<p>TEI funciona con muchos modelos de incrustación de texto del Hugging Face Hub, entre los que se incluyen:</p>
<ul>
<li><p>Serie BAAI/bge-*</p></li>
<li><p>serie sentence-transformers/*</p></li>
<li><p>Modelos E5</p></li>
<li><p>Modelos GTE</p></li>
<li><p>Y muchos más</p></li>
</ul>
<div class="alert note">
<p>Para obtener la lista más reciente de modelos compatibles, consulte el <a href="https://github.com/huggingface/text-embeddings-inference">repositorio GitHub</a> de <a href="https://github.com/huggingface/text-embeddings-inference">TEI</a> y <a href="https://huggingface.co/models?pipeline_tag=text-embedding">Hugging Face Hub</a>.</p>
</div>
<h2 id="TEI-deployment" class="common-anchor-header">Despliegue de TEI<button data-href="#TEI-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de configurar Milvus con la función TEI, necesita tener un servicio TEI en ejecución. Milvus soporta dos enfoques para el despliegue TEI:</p>
<h3 id="Standard-deployment-external" class="common-anchor-header">Despliegue estándar (externo)</h3><p>Puede desplegar TEI como un servicio independiente utilizando los métodos oficiales de Hugging Face. Este enfoque le da la máxima flexibilidad y control sobre su servicio TEI.</p>
<p>Para obtener instrucciones detalladas sobre el despliegue de TEI utilizando Docker u otros métodos, consulte la <a href="https://huggingface.co/docs/text-embeddings-inference/en/quick_tour#deploy">documentación oficial de Hugging Face Text Embeddings Inference</a>.</p>
<p>Después del despliegue, tome nota de su punto final del servicio TEI (por ejemplo, <code translate="no">http://localhost:8080</code>) ya que lo necesitará cuando <a href="/docs/es/hugging-face-tei.md#Use-embedding-function-">utilice la función TEI en Milvus</a>.</p>
<h3 id="Milvus-Helm-Chart-deployment-integrated" class="common-anchor-header">Despliegue de Milvus Helm Chart (integrado)</h3><p>Para entornos Kubernetes, Milvus ofrece una opción de despliegue integrado a través de su carta Helm. Esto simplifica el proceso desplegando y configurando TEI junto con Milvus.</p>
<p>Para habilitar TEI en su despliegue Milvus Helm:</p>
<ol>
<li><p>Configure <strong>values.yaml</strong> para habilitar TEI:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">tei:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">image:</span>
    <span class="hljs-attr">repository:</span> <span class="hljs-string">ghcr.io/huggingface/text-embeddings-inference</span>
    <span class="hljs-attr">tag:</span> <span class="hljs-string">&quot;1.7&quot;</span> <span class="hljs-comment"># Modify based on hardware</span>
  <span class="hljs-attr">model:</span> <span class="hljs-string">&quot;BAAI/bge-large-en-v1.5&quot;</span> <span class="hljs-comment"># Modify based on requirements</span>
  <span class="hljs-comment"># revision: &quot;main&quot;</span>
  <span class="hljs-comment"># hfTokenSecretName: &quot;my-huggingface-token-secret&quot;</span>
  <span class="hljs-comment"># apiKey: &quot;your_secure_api_key&quot;</span>
  <span class="hljs-comment"># apiKeySecret:</span>
  <span class="hljs-comment">#   name: &quot;my-tei-api-key-secret&quot;</span>
  <span class="hljs-comment">#   key: &quot;api-key&quot;</span>
  <span class="hljs-attr">resources:</span>
    <span class="hljs-attr">requests:</span>
      <span class="hljs-attr">cpu:</span> <span class="hljs-string">&quot;1&quot;</span>
      <span class="hljs-attr">memory:</span> <span class="hljs-string">&quot;4Gi&quot;</span>
      <span class="hljs-comment"># nvidia.com/gpu: &quot;1&quot; # For GPU</span>
    <span class="hljs-attr">limits:</span>
      <span class="hljs-attr">cpu:</span> <span class="hljs-string">&quot;2&quot;</span>
      <span class="hljs-attr">memory:</span> <span class="hljs-string">&quot;8Gi&quot;</span>
      <span class="hljs-comment"># nvidia.com/gpu: &quot;1&quot; # For GPU</span>
  <span class="hljs-attr">extraArgs:</span> []

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Despliegue o actualice Milvus:</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus -f values.yaml -n &lt;your-milvus-namespace&gt;
<span class="hljs-comment"># or</span>
helm upgrade my-release milvus/milvus -f values.yaml --reset-then-reuse-values -n &lt;your-milvus-namespace&gt;
<button class="copy-code-btn"></button></code></pre>
<p><div class="alert note"></p>
<p>Cuando utilice el despliegue gráfico de Helm, el servicio TEI será accesible dentro de su clúster Kubernetes en <code translate="no">http://my-release-milvus-tei:80</code> (utilizando su nombre de versión). Utilice esto como su punto final en la configuración de la función TEI.</p>
<p></div></p></li>
</ol>
<h2 id="Configuration-in-Milvus" class="common-anchor-header">Configuración en Milvus<button data-href="#Configuration-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Después de desplegar su servicio TEI, necesitará proporcionar su punto final cuando defina una función de incrustación TEI. En la mayoría de los casos, no se requiere ninguna configuración adicional ya que TEI está habilitado por defecto en Milvus.</p>
<p>Sin embargo, si su servicio TEI fue desplegado con autenticación de clave API (<code translate="no">--api-key</code> flag), necesitará configurar Milvus para usar esta clave:</p>
<ol>
<li><p><strong>Defina las claves API en la sección <code translate="no">credential</code>:</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">tei_key:</span>  <span class="hljs-comment"># You can use any label name</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_TEI_API_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Haga referencia a la credencial en milvus.yaml:</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">tei:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">tei_key</span>      <span class="hljs-comment"># ← choose any label you defined above</span>
        <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># enabled by default. no action required.</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
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
    </button></h2><p>Una vez configurado el servicio TEI, siga estos pasos para definir y utilizar las funciones de incrustación.</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">Paso 1: Definir campos de esquema</h3><p>Para utilizar una función de incrustación, cree una colección con un esquema específico. Este esquema debe incluir al menos tres campos necesarios:</p>
<ul>
<li><p>El campo primario que identifica de forma única a cada entidad de una colección.</p></li>
<li><p>Un campo escalar que almacena los datos brutos que se van a incrustar.</p></li>
<li><p>Un campo vectorial reservado para almacenar las incrustaciones vectoriales que la función generará para el campo escalar.</p></li>
</ul>
<p>El siguiente ejemplo define un esquema con un campo escalar <code translate="no">&quot;document&quot;</code> para almacenar datos textuales y un campo vectorial <code translate="no">&quot;dense_vector&quot;</code> para almacenar las incrustaciones que generará el módulo Función. Recuerde ajustar la dimensión del vector (<code translate="no">dim</code>) para que coincida con la salida del modelo de incrustación elegido.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType, CollectionSchema, FieldSchema

<span class="hljs-comment"># Assume you have connected to Milvus</span>
<span class="hljs-comment"># client = MilvusClient(uri=&quot;http://localhost:19530&quot;)</span>

<span class="hljs-comment"># 1. Create Schema</span>
schema = MilvusClient.create_schema()

<span class="hljs-comment"># 2. Add fields</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>) <span class="hljs-comment"># Store text data</span>
<span class="hljs-comment"># IMPORTANT: Set dim to exactly match the TEI model&#x27;s output dimension</span>
schema.add_field(<span class="hljs-string">&quot;dense_vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1024</span>) <span class="hljs-comment"># Store embedding vectors (example dimension)</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">Paso 2: Añadir la función de incrustación al esquema</h3><p>El módulo Function de Milvus convierte automáticamente los datos brutos almacenados en un campo escalar en incrustaciones y los almacena en el campo vectorial definido explícitamente.</p>
<p>El ejemplo siguiente añade un módulo Function (<code translate="no">tei_func</code>) que convierte el campo escalar <code translate="no">&quot;document&quot;</code> en incrustaciones, almacenando los vectores resultantes en el campo vectorial <code translate="no">&quot;dense_vector&quot;</code> definido anteriormente.</p>
<p>Una vez que haya definido su función de incrustación, añádala a su esquema de colección. Esto indica a Milvus que utilice la función de incrustación especificada para procesar y almacenar las incrustaciones de sus datos de texto.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. Define TEI embedding function</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;tei_func&quot;</span>,                            <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,   <span class="hljs-comment"># Indicates a text embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],             <span class="hljs-comment"># Scalar field(s) containing text data to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense_vector&quot;</span>],        <span class="hljs-comment"># Vector field(s) for storing embeddings</span>
    params={                                    <span class="hljs-comment"># TEI specific parameters (function-level)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;TEI&quot;</span>,                      <span class="hljs-comment"># Must be set to &quot;TEI&quot;</span>
        <span class="hljs-string">&quot;endpoint&quot;</span>: <span class="hljs-string">&quot;http://your-tei-service-endpoint:80&quot;</span>, <span class="hljs-comment"># Required: Points to your TEI service address</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;truncate&quot;: &quot;true&quot;,                   # Optional: Whether to truncate long input (default false)</span>
        <span class="hljs-comment"># &quot;truncation_direction&quot;: &quot;right&quot;,      # Optional: Truncation direction (default right)</span>
        <span class="hljs-comment"># &quot;max_client_batch_size&quot;: 64,          # Optional: Client max batch size (default 32)</span>
        <span class="hljs-comment"># &quot;ingestion_prompt&quot;: &quot;passage: &quot;,      # Optional: (Advanced) Ingestion phase prompt</span>
        <span class="hljs-comment"># &quot;search_prompt&quot;: &quot;query: &quot;            # Optional: (Advanced) Search phase prompt</span>
    }
)

<span class="hljs-comment"># Add the configured embedding function to your existing collection schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p><strong>Parámetro</strong></p></th>
     <th><p><strong>Obligatorio</strong></p></th>
     <th><p><strong>Descripción</strong></p></th>
     <th><p><strong>Ejemplo Valor</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>Sí</p></td>
     <td><p>El proveedor del modelo de incrustación. Establézcalo en "TEI".</p></td>
     <td><p>"TEI</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">endpoint</code></p></td>
     <td><p>Sí</p></td>
     <td><p>La dirección de red que apunta a su servicio TEI desplegado. Si se despliega a través de Milvus Helm Chart, suele ser la dirección interna del servicio.</p></td>
     <td><p>"http://localhost:8080", "http://my-release-milvus-tei:80"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">truncate</code></p></td>
     <td><p>No</p></td>
     <td><p>Si se deben truncar los textos de entrada que excedan la longitud máxima del modelo. Por defecto es false.</p></td>
     <td><p>"true"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">truncation_direction</code></p></td>
     <td><p>No</p></td>
     <td><p>Efectivo cuando truncar es true. Especifica si el truncado se realiza por la izquierda o por la derecha. El valor predeterminado es "right".</p></td>
     <td><p>"izquierda</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>No</p></td>
     <td><p>El tamaño máximo de lote que el cliente Milvus envía a TEI. Por defecto es 32.</p></td>
     <td><p>64</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">prompt_name</code></p></td>
     <td><p>No</p></td>
     <td><p>(Avanzado) Especifica una clave en el diccionario de avisos de configuración de los transformadores de frases. Se utiliza para determinados modelos que requieren formatos de avisos específicos. La compatibilidad con TEI puede ser limitada y depende de la configuración del modelo en el Hub.</p></td>
     <td><p>"su_clave_de_prompta"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ingestion_prompt</code></p></td>
     <td><p>No</p></td>
     <td><p>(Avanzado) Especifica el prompt a utilizar durante la fase de inserción (ingestión) de datos. Depende del modelo TEI utilizado; el modelo debe admitir avisos.</p></td>
     <td><p>"paso "</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_prompt</code></p></td>
     <td><p>No</p></td>
     <td><p>(Avanzado) Especifica el mensaje que se utilizará durante la fase de búsqueda. Depende del modelo TEI utilizado; el modelo debe admitir avisos.</p></td>
     <td><p>"consulta: "</p></td>
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
    </button></h2><p>Después de configurar la función de incrustación, consulte la <a href="/docs/es/embedding-function-overview.md">Descripción general de la función</a> para obtener orientación adicional sobre la configuración del índice, ejemplos de inserción de datos y operaciones de búsqueda semántica.</p>
