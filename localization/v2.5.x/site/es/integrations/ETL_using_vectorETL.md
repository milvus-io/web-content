---
id: ETL_using_vectorETL.md
summary: >-
  En este tutorial, exploraremos cómo cargar datos eficientemente en Milvus
  utilizando [VectorETL](https://github.com/ContextData/VectorETL), un marco ETL
  ligero diseñado para bases de datos vectoriales. VectorETL simplifica el
  proceso de extraer datos de varias fuentes, transformarlos en incrustaciones
  vectoriales utilizando modelos de IA y almacenarlos en Milvus para una
  recuperación rápida y escalable. Al final de este tutorial, dispondrá de una
  canalización ETL operativa que le permitirá integrar y gestionar sistemas de
  búsqueda vectorial con facilidad. ¡Vamos a sumergirnos!
title: Carga eficiente de datos en Milvus con VectorETL
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/ETL_using_vectorETL.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/ETL_using_vectorETL.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Efficient-Data-Loading-into-Milvus-with-VectorETL" class="common-anchor-header">Carga eficiente de datos en Milvus con VectorETL<button data-href="#Efficient-Data-Loading-into-Milvus-with-VectorETL" class="anchor-icon" translate="no">
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
    </button></h1><p>En este tutorial, exploraremos cómo cargar datos eficientemente en Milvus utilizando <a href="https://github.com/ContextData/VectorETL">VectorETL</a>, un marco ETL ligero diseñado para bases de datos vectoriales. VectorETL simplifica el proceso de extraer datos de varias fuentes, transformarlos en incrustaciones vectoriales utilizando modelos de IA y almacenarlos en Milvus para una recuperación rápida y escalable. Al final de este tutorial, dispondrá de una canalización ETL operativa que le permitirá integrar y gestionar sistemas de búsqueda vectorial con facilidad. ¡A trabajar!</p>
<h2 id="Preparation" class="common-anchor-header">Preparación<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Dependency-and-Environment" class="common-anchor-header">Dependencia y entorno</h3><pre><code translate="no" class="language-shell">$ pip install --upgrade vector-etl pymilvus
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Si utilizas Google Colab, para habilitar las dependencias que acabas de instalar, es posible que tengas que <strong>reiniciar el tiempo de ejecución</strong> (haz clic en el menú "Tiempo de ejecución" en la parte superior de la pantalla y selecciona "Reiniciar sesión" en el menú desplegable).</p>
</div>
<p>VectorETL soporta múltiples fuentes de datos, incluyendo Amazon S3, Google Cloud Storage, Local File, etc. Puedes consultar la lista completa de fuentes soportadas <a href="https://github.com/ContextData/VectorETL?tab=readme-ov-file#source-configuration">aquí</a>. En este tutorial, nos centraremos en Amazon S3 como ejemplo de fuente de datos.</p>
<p>Cargaremos documentos desde Amazon S3. Por lo tanto, necesitas preparar <code translate="no">AWS_ACCESS_KEY_ID</code> y <code translate="no">AWS_SECRET_ACCESS_KEY</code> como variables de entorno para acceder de forma segura a tu bucket S3. Además, utilizaremos el modelo de incrustación <code translate="no">text-embedding-ada-002</code> de OpenAI para generar incrustaciones para los datos. También debes preparar la <a href="https://platform.openai.com/docs/quickstart">clave api</a> <code translate="no">OPENAI_API_KEY</code> como variable de entorno.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;your-openai-api-key&quot;</span>
os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;AWS_ACCESS_KEY_ID&quot;</span>] = <span class="hljs-string">&quot;your-aws-access-key-id&quot;</span>
os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;AWS_SECRET_ACCESS_KEY&quot;</span>] = <span class="hljs-string">&quot;your-aws-secret-access-key&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Workflow" class="common-anchor-header">Flujo de trabajo<button data-href="#Workflow" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Defining-the-Data-Source-Amazon-S3" class="common-anchor-header">Definición de la fuente de datos (Amazon S3)</h3><p>En este caso, estamos extrayendo documentos de un bucket de Amazon S3. VectorETL nos permite especificar el nombre del bucket, la ruta a los archivos y el tipo de datos con los que estamos trabajando.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">source</span> = {
    <span class="hljs-string">&quot;source_data_type&quot;</span>: <span class="hljs-string">&quot;Amazon S3&quot;</span>,
    <span class="hljs-string">&quot;bucket_name&quot;</span>: <span class="hljs-string">&quot;my-bucket&quot;</span>,
    <span class="hljs-string">&quot;key&quot;</span>: <span class="hljs-string">&quot;path/to/files/&quot;</span>,
    <span class="hljs-string">&quot;file_type&quot;</span>: <span class="hljs-string">&quot;.csv&quot;</span>,
    <span class="hljs-string">&quot;aws_access_key_id&quot;</span>: os.environ[<span class="hljs-string">&quot;AWS_ACCESS_KEY_ID&quot;</span>],
    <span class="hljs-string">&quot;aws_secret_access_key&quot;</span>: os.environ[<span class="hljs-string">&quot;AWS_SECRET_ACCESS_KEY&quot;</span>],
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuring-the-Embedding-Model-OpenAI" class="common-anchor-header">Configuración del modelo de incrustación (OpenAI)</h3><p>Una vez que tenemos nuestra fuente de datos configurada, necesitamos definir el modelo de incrustación que transformará nuestros datos textuales en incrustaciones vectoriales. En este ejemplo, utilizaremos <code translate="no">text-embedding-ada-002</code> de OpenAI.</p>
<pre><code translate="no" class="language-python">embedding = {
    <span class="hljs-string">&quot;embedding_model&quot;</span>: <span class="hljs-string">&quot;OpenAI&quot;</span>,
    <span class="hljs-string">&quot;api_key&quot;</span>: os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>],
    <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-ada-002&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Setting-Up-Milvus-as-the-Target-Database" class="common-anchor-header">Configuración de Milvus como base de datos de destino</h3><p>Necesitamos almacenar las incrustaciones generadas en Milvus. Aquí, definimos nuestros parámetros de conexión Milvus utilizando Milvus Lite.</p>
<pre><code translate="no" class="language-python">target = {
    <span class="hljs-string">&quot;target_database&quot;</span>: <span class="hljs-string">&quot;Milvus&quot;</span>,
    <span class="hljs-string">&quot;host&quot;</span>: <span class="hljs-string">&quot;./milvus.db&quot;</span>,  <span class="hljs-comment"># os.environ[&quot;ZILLIZ_CLOUD_PUBLIC_ENDPOINT&quot;] if using Zilliz Cloud</span>
    <span class="hljs-string">&quot;api_key&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,  <span class="hljs-comment"># os.environ[&quot;ZILLIZ_CLOUD_TOKEN&quot;] if using Zilliz Cloud</span>
    <span class="hljs-string">&quot;collection_name&quot;</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-string">&quot;vector_dim&quot;</span>: <span class="hljs-number">1536</span>,  <span class="hljs-comment"># 1536 for text-embedding-ada-002</span>
}
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Para el <code translate="no">host</code> y <code translate="no">api_key</code>:</p>
<ul>
<li><p>Establecer el <code translate="no">host</code> como un archivo local, por ejemplo<code translate="no">./milvus.db</code>, y dejar <code translate="no">api_key</code> vacío es el método más conveniente, ya que utiliza automáticamente <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> para almacenar todos los datos en este archivo.</p></li>
<li><p>Si tiene una gran escala de datos, puede configurar un servidor Milvus de mayor rendimiento en <a href="https://milvus.io/docs/quickstart.md">docker o kubernetes</a>. En esta configuración, por favor utilice la uri del servidor, por ejemplo<code translate="no">http://localhost:19530</code>, como su <code translate="no">host</code> y deje <code translate="no">api_key</code> vacío.</p></li>
<li><p>Si desea utilizar <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, el servicio en la nube totalmente gestionado para Milvus, ajuste <code translate="no">host</code> y <code translate="no">api_key</code>, que corresponden al <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">punto final público y a la clave Api</a> en Zilliz Cloud.</p></li>
</ul>
</div>
<h3 id="Specifying-Columns-for-Embedding" class="common-anchor-header">Especificación de columnas para incrustación</h3><p>Ahora, tenemos que especificar qué columnas de nuestros archivos CSV deben convertirse en incrustaciones. Esto asegura que sólo se procesen los campos de texto relevantes, optimizando tanto la eficiencia como el almacenamiento.</p>
<pre><code translate="no" class="language-python">embed_columns = [<span class="hljs-string">&quot;col_1&quot;</span>, <span class="hljs-string">&quot;col_2&quot;</span>, <span class="hljs-string">&quot;col_3&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Creating-and-Executing-the-VectorETL-Pipeline" class="common-anchor-header">Creación y ejecución de la canalización VectorETL</h3><p>Con todas las configuraciones en su lugar, ahora inicializamos el ETL pipeline, configuramos el flujo de datos y lo ejecutamos.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> vector_etl <span class="hljs-keyword">import</span> create_flow

flow = create_flow()
flow.set_source(source)
flow.set_embedding(embedding)
flow.set_target(target)
flow.set_embed_columns(embed_columns)

<span class="hljs-comment"># Execute the flow</span>
flow.execute()
<button class="copy-code-btn"></button></code></pre>
<p>Siguiendo este tutorial, hemos creado con éxito una canalización ETL de extremo a extremo para mover documentos de Amazon S3 a Milvus utilizando VectorETL. VectorETL es flexible en las fuentes de datos, por lo que puede elegir las fuentes de datos que desee en función de las necesidades específicas de su aplicación. Con el diseño modular de VectorETL, puede ampliar fácilmente esta tubería para admitir otras fuentes de datos, incrustando modelos, ¡lo que la convierte en una potente herramienta para flujos de trabajo de IA e ingeniería de datos!</p>
