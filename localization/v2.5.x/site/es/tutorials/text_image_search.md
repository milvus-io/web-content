---
id: text_image_search.md
summary: >-
  En este tutorial, exploraremos cómo implementar la recuperación de imágenes
  basada en texto utilizando el modelo CLIP (Contrastive Language-Image
  Pretraining) de OpenAI y Milvus. Generaremos incrustaciones de imágenes con
  CLIP, las almacenaremos en Milvus y realizaremos búsquedas de similitud
  eficientes.
title: Búsqueda texto-imagen con Milvus
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/text_image_search_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/text_image_search_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Text-to-Image-Search-with-Milvus" class="common-anchor-header">Búsqueda texto-imagen con Milvus<button data-href="#Text-to-Image-Search-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>La búsqueda de texto a imagen es una tecnología avanzada que permite a los usuarios buscar imágenes utilizando descripciones de texto en lenguaje natural. Aprovecha un modelo multimodal previamente entrenado para convertir tanto el texto como las imágenes en incrustaciones en un espacio semántico compartido, lo que permite realizar comparaciones basadas en similitudes.</p>
<p>En este tutorial, exploraremos cómo implementar la recuperación de imágenes basada en texto utilizando el modelo CLIP (Contrastive Language-Image Pretraining) de OpenAI y Milvus. Generaremos incrustaciones de imágenes con CLIP, las almacenaremos en Milvus y realizaremos búsquedas de similitud eficientes.</p>
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
    </button></h2><p>Antes de empezar, asegúrese de tener listos todos los paquetes necesarios y los datos de ejemplo.</p>
<h3 id="Install-dependencies" class="common-anchor-header">Instale las dependencias</h3><ul>
<li><strong>pymilvus&gt;=2.4.2</strong> para interactuar con la base de datos Milvus</li>
<li><strong>clip</strong> para trabajar con el modelo CLIP</li>
<li><strong>pillow</strong> para el procesamiento y visualización de imágenes</li>
</ul>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus pillow</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install git+https://github.com/openai/CLIP.git</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Si estás utilizando Google Colab, puede que necesites <strong>reiniciar el tiempo de ejecución</strong> (Navega hasta el menú "Tiempo de ejecución" en la parte superior de la interfaz, y selecciona "Reiniciar sesión" en el menú desplegable).</p>
</div>
<h3 id="Download-example-data" class="common-anchor-header">Descargar datos de ejemplo</h3><p>Utilizaremos un subconjunto del conjunto de datos <a href="https://www.image-net.org">ImageNet</a> (100 clases, 10 imágenes para cada clase) como imágenes de ejemplo. El siguiente comando descargará los datos de ejemplo y los extraerá a la carpeta local <code translate="no">./images_folder</code>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/towhee-io/examples/releases/download/data/reverse_image_search.zip</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">unzip -q reverse_image_search.zip -d images_folder</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-up-Milvus" class="common-anchor-header">Configurar Milvus</h3><p>Antes de continuar, configure su servidor Milvus y conéctese utilizando su URI (y opcionalmente, un token):</p>
<ul>
<li><p><strong>Milvus Lite (Recomendado por conveniencia)</strong>: Establezca el URI en un archivo local, como ./milvus.db. Esto aprovecha automáticamente <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> para almacenar todos los datos en un único archivo.</p></li>
<li><p><strong>Docker o Kubernetes (para datos a gran escala)</strong>: Para manejar conjuntos de datos más grandes, despliegue un servidor Milvus de mayor rendimiento utilizando <a href="https://milvus.io/docs/quickstart.md">Docker o Kubernetes</a>. En este caso, utilice el URI del servidor, como http://localhost:19530, para conectarse.</p></li>
<li><p><strong>Zilliz Cloud (servicio gestionado)</strong>: Si está utilizando <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, el servicio en la nube totalmente gestionado de Milvus, establezca el Public Endpoint como URI y API Key como token.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;milvus.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Getting-Started" class="common-anchor-header">Primeros pasos<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><p>Ahora que tiene las dependencias y datos necesarios, es hora de configurar los extractores de características y comenzar a trabajar con Milvus. Esta sección le guiará a través de los pasos clave para construir un sistema de búsqueda de texto a imagen. Finalmente, demostraremos cómo recuperar y visualizar imágenes basadas en consultas de texto.</p>
<h3 id="Define-feature-extractors" class="common-anchor-header">Definir extractores de características</h3><p>Utilizaremos un modelo CLIP preentrenado para generar incrustaciones de imagen y texto. En esta sección, cargaremos la variante <strong>ViT-B/32</strong> preentrenada de CLIP y definiremos funciones de ayuda para la codificación de imágenes y texto:</p>
<ul>
<li><code translate="no">encode_image(image_path)</code>: Procesa y codifica imágenes en vectores de características.</li>
<li><code translate="no">encode_text(text)</code>: Codifica consultas de texto en vectores de características</li>
</ul>
<p>Ambas funciones normalizan las características de salida para garantizar comparaciones coherentes convirtiendo los vectores a longitud unitaria, lo que resulta esencial para calcular con precisión la similitud del coseno.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> clip
<span class="hljs-keyword">from</span> PIL <span class="hljs-keyword">import</span> Image


<span class="hljs-comment"># Load CLIP model</span>
model_name = <span class="hljs-string">&quot;ViT-B/32&quot;</span>
model, preprocess = clip.load(model_name)
model.<span class="hljs-built_in">eval</span>()


<span class="hljs-comment"># Define a function to encode images</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_image</span>(<span class="hljs-params">image_path</span>):
    image = preprocess(Image.<span class="hljs-built_in">open</span>(image_path)).unsqueeze(<span class="hljs-number">0</span>)
    image_features = model.encode_image(image)
    image_features /= image_features.norm(
        dim=-<span class="hljs-number">1</span>, keepdim=<span class="hljs-literal">True</span>
    )  <span class="hljs-comment"># Normalize the image features</span>
    <span class="hljs-keyword">return</span> image_features.squeeze().tolist()


<span class="hljs-comment"># Define a function to encode text</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_text</span>(<span class="hljs-params">text</span>):
    text_tokens = clip.tokenize(text)
    text_features = model.encode_text(text_tokens)
    text_features /= text_features.norm(
        dim=-<span class="hljs-number">1</span>, keepdim=<span class="hljs-literal">True</span>
    )  <span class="hljs-comment"># Normalize the text features</span>
    <span class="hljs-keyword">return</span> text_features.squeeze().tolist()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Data-Ingestion" class="common-anchor-header">Ingestión de datos</h3><p>Para permitir la búsqueda semántica de imágenes, primero necesitamos generar incrustaciones para todas las imágenes y almacenarlas en una base de datos vectorial para una indexación y recuperación eficientes. Esta sección proporciona una guía paso a paso para introducir datos de imágenes en Milvus.</p>
<p><strong>1. Crear una colección Milvus</strong></p>
<p>Antes de almacenar las incrustaciones de imágenes, debe crear una colección Milvus. El siguiente código muestra cómo crear una colección en modo de configuración rápida con el tipo de métrica COSINE por defecto. La colección incluye los siguientes campos:</p>
<ul>
<li><p><code translate="no">id</code>: Un campo primario con ID automático activado.</p></li>
<li><p><code translate="no">vector</code>: Un campo para almacenar incrustaciones de vectores de punto flotante.</p></li>
</ul>
<p>Si necesita un esquema personalizado, consulte la <a href="https://milvus.io/docs/create-collection.md">documentación de Milvus</a> para obtener instrucciones detalladas.</p>
<pre><code translate="no" class="language-python">collection_name = <span class="hljs-string">&quot;image_collection&quot;</span>

<span class="hljs-comment"># Drop the collection if it already exists</span>
<span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)

<span class="hljs-comment"># Create a new collection in quickstart mode</span>
milvus_client.create_collection(
    collection_name=collection_name,
    dimension=<span class="hljs-number">512</span>,  <span class="hljs-comment"># this should match the dimension of the image embedding</span>
    auto_id=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># auto generate id and store in the id field</span>
    enable_dynamic_field=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># enable dynamic field for scalar fields</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>2. Insertar datos en Milvus</strong></p>
<p>En este paso, utilizamos un codificador de imágenes predefinido para generar incrustaciones para todas las imágenes JPEG del directorio de datos de ejemplo. Estas incrustaciones se insertan en la colección Milvus, junto con sus correspondientes rutas de archivo. Cada entrada de la colección consta de</p>
<ul>
<li><strong>Vector de incrustación</strong>: La representación numérica de la imagen. Se almacena en el campo <code translate="no">vector</code>.</li>
<li><strong>Ruta del archivo</strong>: La ubicación del archivo de imagen como referencia. Se almacena en el campo <code translate="no">filepath</code> como campo dinámico.</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob


image_dir = <span class="hljs-string">&quot;./images_folder/train&quot;</span>
raw_data = []

<span class="hljs-keyword">for</span> image_path <span class="hljs-keyword">in</span> glob(os.path.join(image_dir, <span class="hljs-string">&quot;**/*.JPEG&quot;</span>)):
    image_embedding = encode_image(image_path)
    image_dict = {<span class="hljs-string">&quot;vector&quot;</span>: image_embedding, <span class="hljs-string">&quot;filepath&quot;</span>: image_path}
    raw_data.append(image_dict)
insert_result = milvus_client.insert(collection_name=collection_name, data=raw_data)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Inserted&quot;</span>, insert_result[<span class="hljs-string">&quot;insert_count&quot;</span>], <span class="hljs-string">&quot;images into Milvus.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Inserted 1000 images into Milvus.
</code></pre>
<h3 id="Peform-a-Search" class="common-anchor-header">Realizar una búsqueda</h3><p>Ahora vamos a realizar una búsqueda utilizando una consulta de texto de ejemplo. Esto recuperará las imágenes más relevantes basándose en su similitud semántica con la descripción de texto dada.</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;a white dog&quot;</span>
query_embedding = encode_text(query_text)

search_results = milvus_client.search(
    collection_name=collection_name,
    data=[query_embedding],
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># return top 10 results</span>
    output_fields=[<span class="hljs-string">&quot;filepath&quot;</span>],  <span class="hljs-comment"># return the filepath field</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Visualice los resultados:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> IPython.display <span class="hljs-keyword">import</span> display


width = <span class="hljs-number">150</span> * <span class="hljs-number">5</span>
height = <span class="hljs-number">150</span> * <span class="hljs-number">2</span>
concatenated_image = Image.new(<span class="hljs-string">&quot;RGB&quot;</span>, (width, height))

result_images = []
<span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> search_results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> result:
        filename = hit[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;filepath&quot;</span>]
        img = Image.<span class="hljs-built_in">open</span>(filename)
        img = img.resize((<span class="hljs-number">150</span>, <span class="hljs-number">150</span>))
        result_images.append(img)

<span class="hljs-keyword">for</span> idx, img <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(result_images):
    x = idx % <span class="hljs-number">5</span>
    y = idx // <span class="hljs-number">5</span>
    concatenated_image.paste(img, (x * <span class="hljs-number">150</span>, y * <span class="hljs-number">150</span>))
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Query text: <span class="hljs-subst">{query_text}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\nSearch results:&quot;</span>)
display(concatenated_image)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Query text: a white dog

Search results:
</code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/text_image_search_with_milvus_20_1.png" alt="png" class="doc-image" id="png" />
   </span> <span class="img-wrapper"> <span>png</span> </span></p>
