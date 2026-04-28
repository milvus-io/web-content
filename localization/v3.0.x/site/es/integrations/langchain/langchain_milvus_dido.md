---
id: langchain_milvus_dido.md
summary: >-
  Esta guía demuestra cómo utilizar la función de incrustación de texto de
  Milvus 2.6 (también conocida como Data In Data Out) con LangChain. Esta
  función permite que el servidor Milvus convierta automáticamente texto sin
  formato en incrustaciones vectoriales, simplificando el código del lado del
  cliente y centralizando la gestión de claves API.
title: Integración de la función de incrustación de texto de Milvus con LangChain
---
<h1 id="Integrating-Milvus-Text-Embedding-Function-with-LangChain" class="common-anchor-header">Integración de la función de incrustación de texto de Milvus con LangChain<button data-href="#Integrating-Milvus-Text-Embedding-Function-with-LangChain" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/langchain/langchain_milvus_dido.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/langchain/langchain_milvus_dido.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p>Esta guía muestra cómo utilizar la función de incrustación <strong>de texto</strong> de Milvus 2.6 (también conocida como Data In Data Out) con LangChain. Esta función permite al servidor Milvus convertir automáticamente texto sin formato en incrustaciones vectoriales, simplificando el código del lado del cliente y centralizando la gestión de claves API.</p>
<p><a href="https://milvus.io/">Milvus</a> es la base de datos vectorial de código abierto más avanzada del mundo, construida específicamente para soportar aplicaciones de búsqueda de similitud de incrustación y de IA. <a href="https://www.langchain.com/">LangChain</a> es un marco para el desarrollo de aplicaciones basadas en grandes modelos lingüísticos (LLM). Al integrar la función de incrustación de texto de Milvus, puede conseguir una solución de búsqueda vectorial más sencilla y eficaz en sus aplicaciones LangChain.</p>
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
    </button></h2><p>Antes de ejecutar este tutorial, asegúrese de haber instalado las siguientes dependencias:</p>
<pre><code translate="no" class="language-shell">! pip install --upgrade langchain-milvus langchain-core langchain-openai
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Si está utilizando Google Colab, para habilitar las dependencias recién instaladas, es posible que tenga que <strong>reiniciar el tiempo de ejecución</strong> (haga clic en el menú "Tiempo de ejecución" en la parte superior de la pantalla, y seleccione "Reiniciar sesión" en el menú desplegable).</p>
</div>
<h3 id="Configuring-the-Milvus-Server" class="common-anchor-header">Configuración del servidor Milvus<button data-href="#Configuring-the-Milvus-Server" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Importante</strong>: La función de incrustación de texto (entrada y salida de datos) sólo está disponible en <strong>Milvus Server</strong>. <strong>Milvus Lite no admite esta función</strong>. Necesita utilizar un servidor Milvus desplegado con Docker/Kubernetes.</p>
<p>Antes de utilizar la función de incrustación de texto, debe configurar las credenciales para los proveedores de servicios de incrustación en el servidor Milvus.</p>
<p><strong>Declare sus claves en credenciales:</strong></p>
<p>Usted puede listar una o muchas claves API - déle a cada una una etiqueta que usted invente y a la que hará referencia más tarde.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>

<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">apikey_dev:</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_OPENAI_API_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Dígale a Milvus qué clave utilizar para las llamadas OpenAI</strong></p>
<p>En el mismo archivo, indique al proveedor de OpenAI la etiqueta que desea que utilice.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">openai:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey_dev</span>
        <span class="hljs-comment"># url: https://api.openai.com/v1/embeddings   # (optional) custom url</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para más métodos de configuración, consulte la <a href="https://milvus.io/docs/embedding-function-overview.md">documentación de Milvus Embedding Function</a>.</p>
<h3 id="Starting-the-Milvus-Service" class="common-anchor-header">Iniciando el Servicio Milvus<button data-href="#Starting-the-Milvus-Service" class="anchor-icon" translate="no">
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
    </button></h3><p>Asegúrese de que Milvus Server se está ejecutando y que la función de incrustación está activada. Puede desplegar el servidor Milvus utilizando <a href="https://milvus.io/docs/install_standalone-docker.md">Docker</a> o <a href="https://milvus.io/docs/install_cluster-helm.md">Kubernetes</a>. Nota: <strong>Milvus Lite no es compatible con la función de incrustación de texto</strong>.</p>
<h2 id="Understanding-Embedding-Client-side-vs-Server-side" class="common-anchor-header">Entendiendo la incrustación: Del lado del cliente vs del lado del servidor<button data-href="#Understanding-Embedding-Client-side-vs-Server-side" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de sumergirnos en el uso, entendamos primero las diferencias entre los dos enfoques de incrustación.</p>
<h3 id="Embedding-using-LangChains-Embeddings-class-Client-side" class="common-anchor-header">Incrustación utilizando la clase <code translate="no">Embeddings</code> de LangChain (del lado del cliente)<button data-href="#Embedding-using-LangChains-Embeddings-class-Client-side" class="anchor-icon" translate="no">
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
    </button></h3><p>En el enfoque tradicional de LangChain, la generación de la incrustación se realiza en el lado del cliente utilizando la <a href="https://python.langchain.com/docs/api_reference/embeddings/langchain_core.embeddings.Embeddings">clase<code translate="no">Embeddings</code> </a>. Su aplicación necesita utilizar el método <code translate="no">embed_query</code> de la clase para llamar a la API de incrustación, luego almacenar los vectores generados en Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> OpenAIEmbeddings
<span class="hljs-keyword">from</span> langchain_milvus <span class="hljs-keyword">import</span> Milvus

<span class="hljs-comment"># Generate embedding on client side</span>
embeddings = OpenAIEmbeddings()
vector = embeddings.embed_query(<span class="hljs-string">&quot;Hello, world!&quot;</span>)
<span class="hljs-comment"># [0.123, -0.456, ...] A vector of floats</span>

vector_store = Milvus(
    embedding_function=embeddings,
    connection_args={<span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>},
    collection_name=<span class="hljs-string">&quot;traditional_approach_collection&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Diagrama de secuencia:</strong></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/langchain_milvus_dito_langchain_embedding.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p><strong>Características:</strong></p>
<ul>
<li>El cliente llama directamente a la API de incrustación</li>
<li>Necesidad de gestionar las claves API en el lado del cliente</li>
<li>Flujo de datos: Texto → Cliente → API de incrustación → Vector → Milvus</li>
</ul>
<h3 id="Milvus-Text-Embedding-Function-Server-side-Data-In-Data-Out" class="common-anchor-header">Función de incrustación de texto de Milvus (datos de entrada datos de salida del lado del servidor)<button data-href="#Milvus-Text-Embedding-Function-Server-side-Data-In-Data-Out" class="anchor-icon" translate="no">
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
    </button></h3><p>La función de incrustación de texto (entrada y salida de datos) de Milvus 2.6 permite al servidor de Milvus convertir automáticamente texto en bruto en incrustaciones vectoriales. El cliente sólo tiene que proporcionar el texto, y Milvus se encargará automáticamente de la generación de la incrustación.</p>
<p><strong>Diagrama de secuencia:</strong></p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/langchain_milvus_dito_milvus_embedding.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p><strong>Características:</strong></p>
<ul>
<li>El servidor Milvus llama a la API de incrustación</li>
<li>Las claves de la API se gestionan de forma centralizada en el servidor.</li>
<li>Flujo de datos: Texto → Milvus → API de incrustación → Vector (almacenado en Milvus)</li>
</ul>
<h3 id="Comparison-of-the-Two-Methods" class="common-anchor-header">Comparación de los dos métodos<button data-href="#Comparison-of-the-Two-Methods" class="anchor-icon" translate="no">
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
    </button></h3><table>
<thead>
<tr><th>Característica</th><th>Incrustación LangChain (del lado del cliente)</th><th>Función de incrustación de texto de Milvus (del lado del servidor)</th></tr>
</thead>
<tbody>
<tr><td><strong>Lugar de procesamiento</strong></td><td>Aplicación cliente</td><td>Servidor Milvus</td></tr>
<tr><td><strong>Llamadas a la API</strong></td><td>El cliente llama directamente a la API de incrustación</td><td>El servidor Milvus llama a la API de incrustación</td></tr>
<tr><td><strong>Gestión de claves API</strong></td><td>Necesidad de gestión en el lado del cliente</td><td>Gestión centralizada en el servidor, más segura</td></tr>
<tr><td><strong>Complejidad del código</strong></td><td>Necesidad de gestionar claves y llamadas API en el lado del cliente</td><td>Sólo es necesario configurarlo una vez en la configuración de Milvus</td></tr>
<tr><td><strong>Casos de uso</strong></td><td>- Necesidad de control del cliente sobre el proceso de incrustación<br>- Necesidad de almacenar en caché los resultados de la incrustación en el lado del cliente<br>- Necesidad de soportar múltiples cambios de modelo de incrustación</td><td>- Simplificar el código del lado del cliente<br>- Gestión centralizada de las claves API en el servidor<br>- Necesidad de procesar por lotes grandes volúmenes de documentos<br>- Necesidad de reducir las interacciones del cliente con API externas<br>- Necesidad de combinar con las funciones integradas de Milvus como BM25</td></tr>
<tr><td><strong>Requisitos de la versión de Milvus</strong></td><td>Todas las versiones (incluida Milvus Lite)</td><td>Milvus Lite no es compatible</td></tr>
</tbody>
</table>
<p><strong>Este tutorial presenta principalmente el método Milvus Text Embedding Function (Data In Data Out) del lado del servidor</strong>, que es una nueva característica introducida en Milvus 2.6 que puede simplificar significativamente el código del lado del cliente y mejorar la seguridad.</p>
<h2 id="Using-Text-Embedding-Function" class="common-anchor-header">Uso de la función de incrustación de texto<button data-href="#Using-Text-Embedding-Function" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Example-1-Server-side-Embedding-Only" class="common-anchor-header">Ejemplo 1: Sólo incrustación en el servidor<button data-href="#Example-1-Server-side-Embedding-Only" class="anchor-icon" translate="no">
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
    </button></h3><p>Este es el caso de uso más simple, dependiendo completamente del servidor Milvus para generar incrustaciones. El cliente no necesita ninguna función de incrustación.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_milvus <span class="hljs-keyword">import</span> Milvus
<span class="hljs-keyword">from</span> langchain_milvus.function <span class="hljs-keyword">import</span> TextEmbeddingBuiltInFunction
<span class="hljs-keyword">from</span> langchain_core.documents <span class="hljs-keyword">import</span> Document

<span class="hljs-comment"># Create Text Embedding Function</span>
text_embedding_func = TextEmbeddingBuiltInFunction(
    input_field_names=<span class="hljs-string">&quot;text&quot;</span>,  <span class="hljs-comment"># Input field name (field containing text)</span>
    output_field_names=<span class="hljs-string">&quot;vector&quot;</span>,  <span class="hljs-comment"># Output field name (field storing vectors)</span>
    dim=<span class="hljs-number">1536</span>,  <span class="hljs-comment"># Vector dimension (must specify)</span>
    params={
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;openai&quot;</span>,  <span class="hljs-comment"># Service provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>,  <span class="hljs-comment"># Model name</span>
        <span class="hljs-string">&quot;credential&quot;</span>: <span class="hljs-string">&quot;apikey_dev&quot;</span>,    <span class="hljs-comment"># Optional: use credential label configured in milvus.yaml</span>
    },
)

<span class="hljs-comment"># Create Milvus vector store</span>
<span class="hljs-comment"># Note: embedding_function=None, because embedding is done on server side</span>
vector_store = Milvus(
    embedding_function=<span class="hljs-literal">None</span>,  <span class="hljs-comment"># Do not use client-side embedding</span>
    builtin_function=text_embedding_func,
    connection_args={<span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>},
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-comment"># consistency_level=&quot;Strong&quot;,    # Strong consistency level, default is &quot;Session&quot;</span>
    auto_id=<span class="hljs-literal">True</span>,
    <span class="hljs-comment"># drop_old=True,  # If you want to drop old collection and create a new one</span>
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Para <code translate="no">connection_args</code>:</p>
<ul>
<li><strong>Debe utilizar Milvus Server</strong>: La función de incrustación de texto sólo está disponible en Milvus Server, Milvus Lite no es compatible.</li>
<li>Utilice la uri del servidor, como <code translate="no">http://localhost:19530</code> (despliegue Docker local) o <code translate="no">http://your-server:19530</code> (servidor remoto).</li>
<li>Si utiliza <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, utilice el Public Endpoint como <code translate="no">uri</code> y establezca el parámetro <code translate="no">token</code>.</li>
</ul>
<p>Al añadir documentos, sólo necesita proporcionar texto, no es necesario precalcular vectores. Milvus llamará automáticamente a la API de OpenAI para generar incrustaciones.</p>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add documents (only need to provide text, no need to pre-compute vectors)</span>
documents = [
    Document(page_content=<span class="hljs-string">&quot;Milvus simplifies semantic search through embeddings.&quot;</span>),
    Document(
        page_content=<span class="hljs-string">&quot;Vector embeddings convert text into searchable numeric data.&quot;</span>
    ),
    Document(
        page_content=<span class="hljs-string">&quot;Semantic search helps users find relevant information quickly.&quot;</span>
    ),
]

vector_store.add_documents(documents)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[462726375729313252, 462726375729313253, 462726375729313254]
</code></pre>
<p>Durante la búsqueda, utilice directamente consultas de texto, y Milvus convertirá automáticamente el texto de la consulta en vectores para la búsqueda.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Search (directly use text query)</span>
results = vector_store.similarity_search(
    query=<span class="hljs-string">&quot;How does Milvus handle semantic search?&quot;</span>, k=<span class="hljs-number">2</span>
)

<span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> results:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Content: <span class="hljs-subst">{doc.page_content}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Metadata: <span class="hljs-subst">{doc.metadata}</span>\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">WARNING: All log messages before absl::InitializeLog() is called are written to STDERR
I0000 00:00:1765186679.227345 12227536 fork_posix.cc:71] Other threads are currently calling into gRPC, skipping fork() handlers


Content: Milvus simplifies semantic search through embeddings.
Metadata: {'pk': 462726375729313252}

Content: Semantic search helps users find relevant information quickly.
Metadata: {'pk': 462726375729313254}
</code></pre>
<h3 id="Example-2-Combining-Text-Embedding-and-BM25-Hybrid-Search" class="common-anchor-header">Ejemplo 2: Combinación de incrustación de texto y BM25 (búsqueda híbrida)<button data-href="#Example-2-Combining-Text-Embedding-and-BM25-Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h3><p>La combinación de la búsqueda semántica (Text Embedding) y la búsqueda por palabras clave (BM25) permite realizar búsquedas híbridas más potentes. La búsqueda semántica permite comprender mejor la intención de la consulta, mientras que la búsqueda por palabras clave permite obtener una correspondencia exacta.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_milvus <span class="hljs-keyword">import</span> Milvus
<span class="hljs-keyword">from</span> langchain_milvus.function <span class="hljs-keyword">import</span> TextEmbeddingBuiltInFunction, BM25BuiltInFunction

<span class="hljs-comment"># Text Embedding Function (semantic search)</span>
text_embedding_func = TextEmbeddingBuiltInFunction(
    input_field_names=<span class="hljs-string">&quot;text&quot;</span>,
    output_field_names=<span class="hljs-string">&quot;vector_dense&quot;</span>,
    dim=<span class="hljs-number">1536</span>,
    params={
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;openai&quot;</span>,
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>,
    },
)

<span class="hljs-comment"># BM25 Function (keyword search)</span>
bm25_func = BM25BuiltInFunction(
    input_field_names=<span class="hljs-string">&quot;text&quot;</span>,
    output_field_names=<span class="hljs-string">&quot;vector_sparse&quot;</span>,
)

<span class="hljs-comment"># Create Milvus vector store</span>
vector_store = Milvus(
    embedding_function=<span class="hljs-literal">None</span>,
    builtin_function=[text_embedding_func, bm25_func],
    connection_args={<span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>},
    vector_field=[<span class="hljs-string">&quot;vector_dense&quot;</span>, <span class="hljs-string">&quot;vector_sparse&quot;</span>],
    collection_name=<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,
    <span class="hljs-comment"># consistency_level=&quot;Strong&quot;,    # Strong consistency level, default is &quot;Session&quot;</span>
    auto_id=<span class="hljs-literal">True</span>,
    <span class="hljs-comment"># drop_old=True,  # If you want to drop old collection and create a new one</span>
)

<span class="hljs-comment"># Add documents</span>
documents = [
    Document(page_content=<span class="hljs-string">&quot;Machine learning and artificial intelligence&quot;</span>),
    Document(page_content=<span class="hljs-string">&quot;The cat sat on the mat&quot;</span>),
]

vector_store.add_documents(documents)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[462726375729313255, 462726375729313256]
</code></pre>
<p>Utilice <code translate="no">WeightedRanker</code> para controlar el peso de la búsqueda semántica y de la búsqueda por palabras clave. Cuando la ponderación densa es mayor, los resultados están más sesgados hacia la similitud semántica; cuando la ponderación dispersa es mayor, los resultados están más sesgados hacia la coincidencia de palabras clave.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Hybrid search, use WeightedRanker to control weights</span>
<span class="hljs-comment"># 70% semantic search, 30% keyword search</span>
results = vector_store.similarity_search(
    query=<span class="hljs-string">&quot;AI technology&quot;</span>,
    k=<span class="hljs-number">2</span>,
    ranker_type=<span class="hljs-string">&quot;weighted&quot;</span>,
    ranker_params={<span class="hljs-string">&quot;weights&quot;</span>: [<span class="hljs-number">0.7</span>, <span class="hljs-number">0.3</span>]},
)

<span class="hljs-comment"># If you want to be more biased towards keyword matching, you can adjust weights</span>
<span class="hljs-comment"># 30% semantic search, 70% keyword search</span>
results_keyword_focused = vector_store.similarity_search(
    query=<span class="hljs-string">&quot;cat mat&quot;</span>,
    k=<span class="hljs-number">2</span>,
    ranker_type=<span class="hljs-string">&quot;weighted&quot;</span>,
    ranker_params={<span class="hljs-string">&quot;weights&quot;</span>: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.7</span>]},
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">results
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[Document(metadata={'pk': 462726375729313255}, page_content='Machine learning and artificial intelligence'),
 Document(metadata={'pk': 462726375729313256}, page_content='The cat sat on the mat')]
</code></pre>
<pre><code translate="no" class="language-python">results_keyword_focused
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[Document(metadata={'pk': 462726375729313256}, page_content='The cat sat on the mat'),
 Document(metadata={'pk': 462726375729313255}, page_content='Machine learning and artificial intelligence')]
</code></pre>
<h2 id="Summary" class="common-anchor-header">Resumen<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h2><p>Enhorabuena. Ha aprendido a utilizar la función de incrustación de texto (Data In Data Out) de Milvus con LangChain. Al mover la generación de incrustaciones al lado del servidor, puede simplificar el código del lado del cliente, gestionar de forma centralizada las claves API e implementar fácilmente la búsqueda híbrida. Combinado con Text Embedding Function y BM25, Milvus le proporciona potentes capacidades de búsqueda vectorial.</p>
