---
id: build_rag_on_arm.md
summary: >-
  En este tutorial, aprenderá a crear una aplicación de generación mejorada de
  recuperación (RAG) en infraestructuras basadas en Arm. Para el almacenamiento
  vectorial, utilizamos Zilliz Cloud, la base de datos vectorial Milvus
  totalmente gestionada. Zilliz Cloud está disponible en las principales nubes
  como AWS, GCP y Azure. En esta demo utilizamos Zilliz Cloud desplegado en AWS
  con máquinas Arm. Para LLM, utilizamos el modelo Llama-3.1-8B en la CPU del
  servidor basado en Arm de AWS utilizando llama.cpp.
title: Construir RAG en arquitectura Arm
---
<h1 id="Build-RAG-on-Arm-Architecture" class="common-anchor-header">Construir RAG en arquitectura Arm<button data-href="#Build-RAG-on-Arm-Architecture" class="anchor-icon" translate="no">
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
    </button></h1><p>Las CPUs<a href="https://www.arm.com/">Arm</a> se utilizan ampliamente en una amplia gama de aplicaciones, incluyendo casos de uso tradicionales de aprendizaje automático (ML) e inteligencia artificial (AI).</p>
<p>En este tutorial, aprenderá a crear una aplicación de generación mejorada de recuperación (RAG) en infraestructuras basadas en Arm. Para el almacenamiento vectorial, utilizamos <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, la base de datos vectorial Milvus totalmente gestionada. Zilliz Cloud está disponible en las principales nubes como AWS, GCP y Azure. En esta demo utilizamos Zilliz Cloud desplegado en AWS con máquinas Arm. Para LLM, utilizamos el modelo <code translate="no">Llama-3.1-8B</code> en la CPU del servidor basado en Arm de AWS utilizando <code translate="no">llama.cpp</code>.</p>
<h2 id="Prerequisite" class="common-anchor-header">Requisitos previos<button data-href="#Prerequisite" class="anchor-icon" translate="no">
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
    </button></h2><p>Para ejecutar este ejemplo, recomendamos utilizar <a href="https://aws.amazon.com/ec2/graviton/">AWS Graviton</a>, que proporciona una forma rentable de ejecutar cargas de trabajo ML en servidores basados en Arm. Este cuaderno se ha probado en una instancia de AWS Graviton3 <code translate="no">c7g.2xlarge</code> con el sistema Ubuntu 22.04 LTS.</p>
<p>Necesita al menos cuatro núcleos y 8 GB de RAM para ejecutar este ejemplo. Configure un almacenamiento en disco de al menos 32 GB. Le recomendamos que utilice una instancia con las mismas o mejores especificaciones.</p>
<p>Después de lanzar la instancia, conéctese a ella y ejecute los siguientes comandos para preparar el entorno.</p>
<p>Instale python en el servidor:</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">sudo</span> apt update
$ <span class="hljs-built_in">sudo</span> apt install python-is-python3 python3-pip python3-venv -y
<button class="copy-code-btn"></button></code></pre>
<p>Cree y active un entorno virtual:</p>
<pre><code translate="no" class="language-bash">$ python -m venv venv
$ <span class="hljs-built_in">source</span> venv/bin/activate
<button class="copy-code-btn"></button></code></pre>
<p>Instalar las dependencias de python necesarias:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus openai requests langchain-huggingface huggingface_hub tqdm</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Offline-Data-Loading" class="common-anchor-header">Carga de datos sin conexión<button data-href="#Offline-Data-Loading" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-Collection" class="common-anchor-header">Crear la colección</h3><p>Utilizamos <a href="https://zilliz.com/cloud">Zilliz Cloud</a> desplegado en AWS con máquinas basadas en Arm para almacenar y recuperar los datos vectoriales. Para empezar rápidamente, basta con <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">registrar una cuenta</a> en Zilliz Cloud de forma gratuita.</p>
<div class="alert note">
<p>Además de Zilliz Cloud, Milvus autoalojado también es una opción (más complicada de configurar). También podemos desplegar <a href="https://milvus.io/docs/install_standalone-docker-compose.md">Milvus Standalone</a> y <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes</a> en máquinas basadas en ARM. Para más información sobre la instalación de Milvus, consulte la <a href="https://milvus.io/docs/install-overview.md">documentación de instalación</a>.</p>
</div>
<p>Configuramos <code translate="no">uri</code> y <code translate="no">token</code> como <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint y Api key</a> en Zilliz Cloud.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

milvus_client = MilvusClient(
    uri=<span class="hljs-string">&quot;&lt;your_zilliz_public_endpoint&gt;&quot;</span>, token=<span class="hljs-string">&quot;&lt;your_zilliz_api_key&gt;&quot;</span>
)

collection_name = <span class="hljs-string">&quot;my_rag_collection&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<p>Compruebe si la colección ya existe y elimínela en caso afirmativo.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>Creamos una nueva colección con los parámetros especificados.</p>
<p>Si no especificamos ninguna información de campo, Milvus creará automáticamente un campo <code translate="no">id</code> por defecto para la clave primaria, y un campo <code translate="no">vector</code> para almacenar los datos vectoriales. Se utiliza un campo JSON reservado para almacenar campos no definidos por el esquema y sus valores.</p>
<pre><code translate="no" class="language-python">milvus_client.create_collection(
    collection_name=collection_name,
    dimension=<span class="hljs-number">384</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Utilizamos la distancia producto interior como tipo de métrica por defecto. Para más información sobre los tipos de distancia, puede consultar <a href="https://milvus.io/docs/metric.md?tab=floating">la página Métricas de similitud</a>.</p>
<h3 id="Prepare-the-data" class="common-anchor-header">Preparar los datos</h3><p>Utilizamos las páginas FAQ de la <a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">Documentación de Milvus 2.4.x</a> como conocimiento privado en nuestra RAG, que es una buena fuente de datos para una canalización RAG sencilla.</p>
<p>Descargamos el archivo zip y extraemos los documentos a la carpeta <code translate="no">milvus_docs</code>.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">unzip -q milvus_docs_2.4.x_en.zip -d milvus_docs</span>
<button class="copy-code-btn"></button></code></pre>
<p>Cargamos todos los archivos markdown de la carpeta <code translate="no">milvus_docs/en/faq</code>. Para cada documento, simplemente usamos "# " para separar el contenido en el archivo, lo que puede separar aproximadamente el contenido de cada parte principal del archivo markdown.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []

<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()

    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data" class="common-anchor-header">Insertar datos</h3><p>Preparamos un modelo de incrustación simple pero eficiente <a href="https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2">all-MiniLM-L6-v2</a> que puede convertir texto en vectores de incrustación.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_huggingface <span class="hljs-keyword">import</span> HuggingFaceEmbeddings

embedding_model = HuggingFaceEmbeddings(model_name=<span class="hljs-string">&quot;all-MiniLM-L6-v2&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Iteramos a través de las líneas de texto, creamos incrustaciones y luego insertamos los datos en Milvus.</p>
<p>Aquí hay un nuevo campo <code translate="no">text</code>, que es un campo no definido en el esquema de la colección. Se añadirá automáticamente al campo dinámico JSON reservado, que puede tratarse como un campo normal a alto nivel.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []

text_embeddings = embedding_model.embed_documents(text_lines)

<span class="hljs-keyword">for</span> i, (line, embedding) <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(
    tqdm(<span class="hljs-built_in">zip</span>(text_lines, text_embeddings), desc=<span class="hljs-string">&quot;Creating embeddings&quot;</span>)
):
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: embedding, <span class="hljs-string">&quot;text&quot;</span>: line})

milvus_client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Creating embeddings: 100%|███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 72/72 [00:18&lt;00:00,  3.91it/s]
</code></pre>
<h2 id="Launch-LLM-Service-on-Arm" class="common-anchor-header">Lanzar el servicio LLM en Arm<button data-href="#Launch-LLM-Service-on-Arm" class="anchor-icon" translate="no">
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
    </button></h2><p>En esta sección, construiremos y lanzaremos el servicio <code translate="no">llama.cpp</code> en la CPU basada en Arm.</p>
<h3 id="Llama-31-model--llamacpp" class="common-anchor-header">Modelo Llama 3.1 y llama.cpp</h3><p>El <a href="https://huggingface.co/cognitivecomputations/dolphin-2.9.4-llama3.1-8b-gguf">modelo Llama-3.1-8B</a> de Meta pertenece a la familia de modelos Llama 3.1 y es de uso libre para investigación y fines comerciales. Antes de utilizar el modelo, visite el <a href="https://llama.meta.com/llama-downloads/">sitio web</a> de Llama y rellene el formulario para solicitar acceso.</p>
<p><a href="https://github.com/ggerganov/llama.cpp">llama.cpp</a> es un proyecto C/C++ de código abierto que permite una inferencia LLM eficiente en una variedad de hardware, tanto localmente como en la nube. Puede alojar cómodamente un modelo Llama 3.1 utilizando <code translate="no">llama.cpp</code>.</p>
<h3 id="Download-and-build-llamacpp" class="common-anchor-header">Descarga y compila llama.cpp</h3><p>Ejecuta los siguientes comandos para instalar make, cmake, gcc, g++ y otras herramientas esenciales necesarias para compilar llama.cpp desde el código fuente:</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">sudo</span> apt install make cmake -y
$ <span class="hljs-built_in">sudo</span> apt install gcc g++ -y
$ <span class="hljs-built_in">sudo</span> apt install build-essential -y
<button class="copy-code-btn"></button></code></pre>
<p>Ahora estás listo para empezar a construir <code translate="no">llama.cpp</code>.</p>
<p>Clona el repositorio fuente de llama.cpp:</p>
<pre><code translate="no" class="language-bash">$ git <span class="hljs-built_in">clone</span> https://github.com/ggerganov/llama.cpp
<button class="copy-code-btn"></button></code></pre>
<p>Por defecto, <code translate="no">llama.cpp</code> construye sólo para CPU en Linux y Windows. No necesitas proporcionar ningún switch extra para construirlo para la CPU Arm en la que lo ejecutes.</p>
<p>Ejecute <code translate="no">make</code> para compilarlo:</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">cd</span> llama.cpp
$ make GGML_NO_LLAMAFILE=1 -j$(<span class="hljs-built_in">nproc</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Comprueba que <code translate="no">llama.cpp</code> se ha compilado correctamente ejecutando el comando help:</p>
<pre><code translate="no" class="language-bash">$ ./llama-cli -h
<button class="copy-code-btn"></button></code></pre>
<p>Si <code translate="no">llama.cpp</code> se ha compilado correctamente, verás que aparece la opción help. El fragmento de salida tiene este aspecto:</p>
<pre><code translate="no">example usage:

    text generation:     ./llama-cli -m your_model.gguf -p &quot;I believe the meaning of life is&quot; -n 128

    chat (conversation): ./llama-cli -m your_model.gguf -p &quot;You are a helpful assistant&quot; -cnv
</code></pre>
<p>Ahora puede descargar el modelo utilizando el cli huggingface:</p>
<pre><code translate="no" class="language-bash">$ huggingface-cli download cognitivecomputations/dolphin-2.9.4-llama3.1-8b-gguf dolphin-2.9.4-llama3.1-8b-Q4_0.gguf --local-dir . --local-dir-use-symlinks False
<button class="copy-code-btn"></button></code></pre>
<p>El formato de modelo GGUF, introducido por el equipo de llama.cpp, utiliza compresión y cuantización para reducir la precisión de los pesos a enteros de 4 bits, disminuyendo significativamente las demandas computacionales y de memoria y haciendo que las CPUs Arm sean efectivas para la inferencia LLM.</p>
<h3 id="Re-quantize-the-model-weights" class="common-anchor-header">Recuantificar los pesos del modelo</h3><p>Para volver a cuantificar, ejecute</p>
<pre><code translate="no" class="language-bash">$ ./llama-quantize --allow-requantize dolphin-2.9.4-llama3.1-8b-Q4_0.gguf dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf Q4_0_8_8
<button class="copy-code-btn"></button></code></pre>
<p>Esto generará un nuevo archivo, <code translate="no">dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf</code>, que contiene pesos reconfigurados que permiten a <code translate="no">llama-cli</code> utilizar SVE 256 y el soporte MATMUL_INT8.</p>
<div class="alert note">
<p>Esta recantización es óptima específicamente para Graviton3. Para Graviton2, la recantización óptima debe realizarse en el formato <code translate="no">Q4_0_4_4</code>, y para Graviton4, el formato <code translate="no">Q4_0_4_8</code> es el más adecuado para la recantización.</p>
</div>
<h3 id="Start-the-LLM-Service" class="common-anchor-header">Iniciar el servicio LLM</h3><p>Puedes utilizar el programa servidor llama.cpp y enviar peticiones a través de una API compatible con OpenAI. Esto te permite desarrollar aplicaciones que interactúen con el LLM varias veces sin tener que iniciarlo y detenerlo repetidamente. Además, puedes acceder al servidor desde otra máquina en la que el LLM esté alojado a través de la red.</p>
<p>Inicia el servidor desde la línea de comandos, y escucha en el puerto 8080:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">./llama-server -m dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf -n 2048 -t 64 -c 65536  --port 8080</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'main: server is listening on 127.0.0.1:8080 - starting the main loop
</code></pre>
<p>También puede ajustar los parámetros del LLM iniciado para adaptarlo al hardware de su servidor y obtener un rendimiento ideal. Para obtener más información sobre los parámetros, consulta el comando <code translate="no">llama-server --help</code>.</p>
<p>Si tienes dificultades para realizar este paso, puedes consultar los <a href="https://learn.arm.com/learning-paths/servers-and-cloud-computing/llama-cpu/llama-chatbot/">documentos oficiales</a> para obtener más información.</p>
<p>Ya has iniciado el servicio LLM en tu CPU basada en Arm. A continuación, interactuaremos directamente con el servicio utilizando el SDK de OpenAI.</p>
<h2 id="Online-RAG" class="common-anchor-header">RAG en línea<button data-href="#Online-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="LLM-Client-and-Embedding-Model" class="common-anchor-header">Cliente LLM y modelo de incrustación</h3><p>Inicializamos el cliente LLM y preparamos el modelo de incrustación.</p>
<p>Para el LLM, utilizamos el SDK de OpenAI para solicitar el servicio Llama lanzado anteriormente. No necesitamos usar ninguna clave API porque en realidad es nuestro servicio local llama.cpp.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

llm_client = OpenAI(base_url=<span class="hljs-string">&quot;http://localhost:8080/v1&quot;</span>, api_key=<span class="hljs-string">&quot;no-key&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Generamos una incrustación de prueba e imprimimos su dimensión y sus primeros elementos.</p>
<pre><code translate="no" class="language-python">test_embedding = embedding_model.embed_query(<span class="hljs-string">&quot;This is a test&quot;</span>)
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">384
[0.03061249852180481, 0.013831384479999542, -0.02084377221763134, 0.016327863559126854, -0.010231520049273968, -0.0479842908680439, -0.017313342541456223, 0.03728749603033066, 0.04588735103607178, 0.034405000507831573]
</code></pre>
<h3 id="Retrieve-data-for-a-query" class="common-anchor-header">Recuperar datos para una consulta</h3><p>Especifiquemos una pregunta frecuente sobre Milvus.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Busquemos la pregunta en la colección y recuperemos las 3 primeras coincidencias semánticas.</p>
<pre><code translate="no" class="language-python">search_res = milvus_client.search(
    collection_name=collection_name,
    data=[
        embedding_model.embed_query(question)
    ],  <span class="hljs-comment"># Use the `emb_text` function to convert the question to an embedding vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># Return top 3 results</span>
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}},  <span class="hljs-comment"># Inner product distance</span>
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],  <span class="hljs-comment"># Return the text field</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Veamos los resultados de la consulta</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json

retrieved_lines_with_distances = [
    (res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>], res[<span class="hljs-string">&quot;distance&quot;</span>]) <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> search_res[<span class="hljs-number">0</span>]
]
<span class="hljs-built_in">print</span>(json.dumps(retrieved_lines_with_distances, indent=<span class="hljs-number">4</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[
    [
        &quot; Where does Milvus store data?\n\nMilvus deals with two types of data, inserted data and metadata. \n\nInserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends, including [MinIO](https://min.io/), [AWS S3](https://aws.amazon.com/s3/?nc1=h_ls), [Google Cloud Storage](https://cloud.google.com/storage?hl=en#object-storage-for-companies-of-all-sizes) (GCS), [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs), [Alibaba Cloud OSS](https://www.alibabacloud.com/product/object-storage-service), and [Tencent Cloud Object Storage](https://www.tencentcloud.com/products/cos) (COS).\n\nMetadata are generated within Milvus. Each Milvus module has its own metadata that are stored in etcd.\n\n###&quot;,
        0.6488019824028015
    ],
    [
        &quot;How does Milvus flush data?\n\nMilvus returns success when inserted data are loaded to the message queue. However, the data are not yet flushed to the disk. Then Milvus' data node writes the data in the message queue to persistent storage as incremental logs. If `flush()` is called, the data node is forced to write all data in the message queue to persistent storage immediately.\n\n###&quot;,
        0.5974207520484924
    ],
    [
        &quot;What is the maximum dataset size Milvus can handle?\n\n  \nTheoretically, the maximum dataset size Milvus can handle is determined by the hardware it is run on, specifically system memory and storage:\n\n- Milvus loads all specified collections and partitions into memory before running queries. Therefore, memory size determines the maximum amount of data Milvus can query.\n- When new entities and and collection-related schema (currently only MinIO is supported for data persistence) are added to Milvus, system storage determines the maximum allowable size of inserted data.\n\n###&quot;,
        0.5833579301834106
    ]
]
</code></pre>
<h3 id="Use-LLM-to-get-a-RAG-response" class="common-anchor-header">Utilizar LLM para obtener una respuesta RAG</h3><p>Convertir los documentos recuperados en un formato de cadena.</p>
<pre><code translate="no" class="language-python">context = <span class="hljs-string">&quot;\n&quot;</span>.join(
    [line_with_distance[<span class="hljs-number">0</span>] <span class="hljs-keyword">for</span> line_with_distance <span class="hljs-keyword">in</span> retrieved_lines_with_distances]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Define system and user prompts for the Language Model. This prompt is assembled with the retrieved documents from Milvus.

SYSTEM_PROMPT = &quot;&quot;&quot;
Human: You are an AI assistant. You are able to find answers to the questions from the contextual passage snippets provided.
&quot;&quot;&quot;
USER_PROMPT = f&quot;&quot;&quot;
Use the following pieces of information enclosed in &lt;context&gt; tags to provide an answer to the question enclosed in &lt;question&gt; tags.
&lt;context&gt;
{context}
&lt;/context&gt;
&lt;question&gt;
{question}
&lt;/question&gt;
&quot;&quot;&quot;
</code></pre>
<p>Utilizar LLM para generar una respuesta basada en las instrucciones. Establecemos el parámetro <code translate="no">model</code> en <code translate="no">not-used</code> ya que es un parámetro redundante para el servicio llama.cpp.</p>
<pre><code translate="no" class="language-python">response = llm_client.chat.completions.create(
    model=<span class="hljs-string">&quot;not-used&quot;</span>,
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: SYSTEM_PROMPT},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: USER_PROMPT},
    ],
)
<span class="hljs-built_in">print</span>(response.choices[<span class="hljs-number">0</span>].message.content)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Milvus stores data in two types: inserted data and metadata. Inserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends such as MinIO, AWS S3, Google Cloud Storage (GCS), Azure Blob Storage, Alibaba Cloud OSS, and Tencent Cloud Object Storage (COS). Metadata are generated within Milvus and each Milvus module has its own metadata that are stored in etcd.
</code></pre>
<p>¡Enhorabuena! Has construido una aplicación RAG sobre las infraestructuras basadas en Arm.</p>
