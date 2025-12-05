---
id: milvus_rag_with_vllm.md
summary: >-
  Este blog le mostrará cómo construir y ejecutar un RAG con Milvus, vLLM y
  Llama 3.1. Más concretamente, te mostraré cómo incrustar y almacenar
  información de texto como incrustaciones vectoriales en Milvus y utilizar este
  almacén vectorial como base de conocimiento para recuperar de forma eficiente
  trozos de texto relevantes para las preguntas de los usuarios.
title: 'Creación de RAG con Milvus, vLLM y Llama 3.1'
---
<h1 id="Building-RAG-with-Milvus-vLLM-and-Llama-31" class="common-anchor-header">Creación de RAG con Milvus, vLLM y Llama 3.1<button data-href="#Building-RAG-with-Milvus-vLLM-and-Llama-31" class="anchor-icon" translate="no">
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
    </button></h1><p>La Universidad de California - Berkeley donó <a href="https://docs.vllm.ai/en/latest/index.html">vLLM</a>, una biblioteca rápida y fácil de usar para la inferencia y el servicio de LLM, a <a href="https://lfaidata.foundation/">la LF AI &amp; Data Foundation</a> como proyecto en fase de incubación en julio de 2024. Como proyecto miembro, nos gustaría dar la bienvenida a vLLM a la familia de LF AI &amp; Data. 🎉</p>
<p>Los grandes modelos lingüísticos<a href="https://zilliz.com/glossary/large-language-models-(llms)">(LLM)</a> y <a href="https://zilliz.com/learn/what-is-vector-database">las bases de datos vectoriales</a> suelen emparejarse para construir la Generación Aumentada de Recuperación<a href="https://zilliz.com/learn/Retrieval-Augmented-Generation">(RAG</a>), una arquitectura de aplicación de IA popular para abordar <a href="https://zilliz.com/glossary/ai-hallucination">las alucinaciones de la IA</a>. Este blog le mostrará cómo construir y ejecutar una RAG con Milvus, vLLM y Llama 3.1. Más concretamente, le mostraré cómo incrustar y almacenar información de texto como <a href="https://zilliz.com/glossary/vector-embeddings">incrustaciones vectoriales</a> en Milvus y utilizar este almacén vectorial como base de conocimiento para recuperar de forma eficiente trozos de texto relevantes para las preguntas de los usuarios. Por último, aprovecharemos vLLM para servir el modelo Llama 3.1-8B de Meta para generar respuestas aumentadas por el texto recuperado. Empecemos.</p>
<h2 id="Introduction-to-Milvus-vLLM-and-Meta’s-Llama-31" class="common-anchor-header">Introducción a Milvus, vLLM y Meta's Llama 3.1<button data-href="#Introduction-to-Milvus-vLLM-and-Meta’s-Llama-31" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Milvus-vector-database" class="common-anchor-header">Base de datos vectorial Milvus</h3><p><a href="https://zilliz.com/what-is-milvus"><strong>Milvus</strong></a> es una base de datos vectorial distribuida, de código abierto y <a href="https://zilliz.com/blog/what-is-a-real-vector-database">creada específicamente</a> para almacenar, indexar y buscar vectores para cargas de trabajo de <a href="https://zilliz.com/learn/generative-ai">IA Generativa</a> (GenAI). Su capacidad para realizar <a href="https://zilliz.com/blog/a-review-of-hybrid-search-in-milvus">búsquedas híbridas,</a> <a href="https://zilliz.com/blog/what-is-new-with-metadata-filtering-in-milvus">filtrado de metadatos</a>, reordenación y gestión eficiente de billones de vectores convierte a Milvus en la elección perfecta para cargas de trabajo de IA y aprendizaje automático. <a href="https://github.com/milvus-io/">Milvus</a> puede ejecutarse localmente, en un clúster o alojarse en la <a href="https://zilliz.com/cloud">nube Zilliz</a> totalmente gestionada.</p>
<h3 id="vLLM" class="common-anchor-header">vLLM</h3><p><a href="https://vllm.readthedocs.io/en/latest/index.html"><strong>vLLM</strong></a> es un proyecto de código abierto iniciado en UC Berkeley SkyLab centrado en optimizar el rendimiento de los servicios LLM. Utiliza una gestión eficiente de la memoria con PagedAttention, batching continuo y kernels CUDA optimizados. En comparación con los métodos tradicionales, vLLM mejora el rendimiento del servicio hasta 24 veces y reduce el uso de memoria de la GPU a la mitad.</p>
<p>Según el artículo &quot;<a href="https://arxiv.org/abs/2309.06180">Efficient Memory Management for Large Language Model Serving with PagedAttention</a>&quot;, la caché de KV utiliza alrededor del 30% de la memoria de la GPU, lo que puede provocar problemas de memoria. La caché KV se almacena en memoria contigua, pero el cambio de tamaño puede provocar la fragmentación de la memoria, lo que resulta ineficiente para el cálculo.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/vllm_1.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p><em>Imagen 1. Gestión de la memoria caché KV en los sistemas actuales ( <a href="https://arxiv.org/pdf/2309.06180">documento</a> 2023 Paged Attention)</em></p>
<p>Al utilizar memoria virtual para la caché KV, vLLM sólo asigna memoria física de la GPU cuando es necesario, lo que elimina la fragmentación de la memoria y evita la preasignación. En las pruebas, vLLM superó a <a href="https://huggingface.co/docs/transformers/main_classes/text_generation">HuggingFace Transformers</a> (HF) y <a href="https://github.com/huggingface/text-generation-inference">Text Generation Inference</a> (TGI), logrando hasta 24 veces más rendimiento que HF y 3,5 veces más que TGI en las GPU NVIDIA A10G y A100.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/vllm_2.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p><em>Imagen 2. vLLM alcanza un rendimiento 8,5x-15x superior al de HF y 3,3x-3,5x superior al de TGI ( <a href="https://blog.vllm.ai/2023/06/20/vllm.html">blog</a> 2023 <a href="https://blog.vllm.ai/2023/06/20/vllm.html">vLLM</a>).</em></p>
<h3 id="Meta’s-Llama-31" class="common-anchor-header">Llama de Meta 3.1</h3><p><a href="https://ai.meta.com/research/publications/the-llama-3-herd-of-models"><strong>Meta's Llama 3.1</strong></a> se anunció el 23 de julio de 2024. El modelo 405B ofrece un rendimiento puntero en varias pruebas de referencia públicas y tiene una ventana de contexto de 128.000 tokens de entrada con varios usos comerciales permitidos. Junto con el modelo de 405.000 millones de parámetros, Meta lanzó una versión actualizada de Llama3 70B (70.000 millones de parámetros) y 8B (8.000 millones de parámetros). Los pesos de los modelos pueden descargarse <a href="https://info.deeplearning.ai/e3t/Ctc/LX+113/cJhC404/VWbMJv2vnLfjW3Rh6L96gqS5YW7MhRLh5j9tjNN8BHR5W3qgyTW6N1vHY6lZ3l8N8htfRfqP8DzW72mhHB6vwYd2W77hFt886l4_PV22X226RPmZbW67mSH08gVp9MW2jcZvf24w97BW207Jmf8gPH0yW20YPQv261xxjW8nc6VW3jj-nNW6XdRhg5HhZk_W1QS0yL9dJZb0W818zFK1w62kdW8y-_4m1gfjfNW2jswrd3xbv-yW5mrvdk3n-KqyW45sLMF21qDrwW5TR3vr2MYxZ9W2hWhq23q-nQdW4blHqh3JlZWfW937hlZ58-KJCW82Pgv9384MbYW7yp56M6pvzd6f77wnH004">del sitio web de Meta</a>.</p>
<p>Una de las principales conclusiones fue que el ajuste de los datos generados puede aumentar el rendimiento, pero los ejemplos de mala calidad pueden degradarlo. El equipo de Llama trabajó intensamente para identificar y eliminar estos malos ejemplos utilizando el propio modelo, modelos auxiliares y otras herramientas.</p>
<h2 id="Build-and-Perform-the-RAG-Retrieval-with-Milvus" class="common-anchor-header">Construir y realizar la recuperación RAG con Milvus<button data-href="#Build-and-Perform-the-RAG-Retrieval-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prepare-your-dataset" class="common-anchor-header">Prepare su conjunto de datos.</h3><p>Utilicé la <a href="https://milvus.io/docs/">documentación</a> oficial <a href="https://milvus.io/docs/">de</a> Milvus como conjunto de datos para esta demostración, que descargué y guardé localmente.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain.document_loaders <span class="hljs-keyword">import</span> DirectoryLoader
<span class="hljs-comment"># Load HTML files already saved in a local directory</span>
path = <span class="hljs-string">&quot;../../RAG/rtdocs_new/&quot;</span>
global_pattern = <span class="hljs-string">&#x27;*.html&#x27;</span>
loader = DirectoryLoader(path=path, glob=global_pattern)
docs = loader.load()


<span class="hljs-comment"># Print num documents and a preview.</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;loaded <span class="hljs-subst">{<span class="hljs-built_in">len</span>(docs)}</span> documents&quot;</span>)
<span class="hljs-built_in">print</span>(docs[<span class="hljs-number">0</span>].page_content)
pprint.pprint(docs[<span class="hljs-number">0</span>].metadata)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text">loaded <span class="hljs-number">22</span> documents
<span class="hljs-title class_">Why</span> <span class="hljs-title class_">Milvus</span> <span class="hljs-title class_">Docs</span> <span class="hljs-title class_">Tutorials</span> <span class="hljs-title class_">Tools</span> <span class="hljs-title class_">Blog</span> <span class="hljs-title class_">Community</span> <span class="hljs-title class_">Stars0</span> <span class="hljs-title class_">Try</span> <span class="hljs-title class_">Managed</span> <span class="hljs-title class_">Milvus</span> <span class="hljs-variable constant_">FREE</span> <span class="hljs-title class_">Search</span> <span class="hljs-title class_">Home</span> v2<span class="hljs-number">.4</span>.<span class="hljs-property">x</span> <span class="hljs-title class_">About</span> ...
{<span class="hljs-string">&#x27;source&#x27;</span>: <span class="hljs-string">&#x27;https://milvus.io/docs/quickstart.md&#x27;</span>}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Download-an-embedding-model" class="common-anchor-header">Descargue un modelo de incrustación.</h3><p>A continuación, descargue un <a href="https://zilliz.com/ai-models">modelo de incrustación</a> gratuito y de código abierto de HuggingFace.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> torch
<span class="hljs-keyword">from</span> sentence_transformers <span class="hljs-keyword">import</span> SentenceTransformer


<span class="hljs-comment"># Initialize torch settings for device-agnostic code.</span>
N_GPU = torch.cuda.device_count()
DEVICE = torch.device(<span class="hljs-string">&#x27;cuda:N_GPU&#x27;</span> <span class="hljs-keyword">if</span> torch.cuda.is_available() <span class="hljs-keyword">else</span> <span class="hljs-string">&#x27;cpu&#x27;</span>)


<span class="hljs-comment"># Download the model from huggingface model hub.</span>
model_name = <span class="hljs-string">&quot;BAAI/bge-large-en-v1.5&quot;</span>
encoder = SentenceTransformer(model_name, device=DEVICE)


<span class="hljs-comment"># Get the model parameters and save for later.</span>
EMBEDDING_DIM = encoder.get_sentence_embedding_dimension()
MAX_SEQ_LENGTH_IN_TOKENS = encoder.get_max_seq_length()


<span class="hljs-comment"># Inspect model parameters.</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;model_name: <span class="hljs-subst">{model_name}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;EMBEDDING_DIM: <span class="hljs-subst">{EMBEDDING_DIM}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;MAX_SEQ_LENGTH: <span class="hljs-subst">{MAX_SEQ_LENGTH}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text">model_name: BAAI/bge-large-en-v1.5
EMBEDDING_DIM: 1024
MAX_SEQ_LENGTH: 512
<button class="copy-code-btn"></button></code></pre>
<h3 id="Chunk-and-encode-your-custom-data-as-vectors" class="common-anchor-header">Trocea y codifica tus datos personalizados como vectores.</h3><p>Yo utilizaré una longitud fija de 512 caracteres con un solapamiento del 10%.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain.text_splitter <span class="hljs-keyword">import</span> RecursiveCharacterTextSplitter


CHUNK_SIZE = <span class="hljs-number">512</span>
chunk_overlap = np.<span class="hljs-built_in">round</span>(CHUNK_SIZE * <span class="hljs-number">0.10</span>, <span class="hljs-number">0</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;chunk_size: <span class="hljs-subst">{CHUNK_SIZE}</span>, chunk_overlap: <span class="hljs-subst">{chunk_overlap}</span>&quot;</span>)


<span class="hljs-comment"># Define the splitter.</span>
child_splitter = RecursiveCharacterTextSplitter(
   chunk_size=CHUNK_SIZE,
   chunk_overlap=chunk_overlap)


<span class="hljs-comment"># Chunk the docs.</span>
chunks = child_splitter.split_documents(docs)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{<span class="hljs-built_in">len</span>(docs)}</span> docs split into <span class="hljs-subst">{<span class="hljs-built_in">len</span>(chunks)}</span> child documents.&quot;</span>)


<span class="hljs-comment"># Encoder input is doc.page_content as strings.</span>
list_of_strings = [doc.page_content <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> chunks <span class="hljs-keyword">if</span> <span class="hljs-built_in">hasattr</span>(doc, <span class="hljs-string">&#x27;page_content&#x27;</span>)]


<span class="hljs-comment"># Embedding inference using HuggingFace encoder.</span>
embeddings = torch.tensor(encoder.encode(list_of_strings))


<span class="hljs-comment"># Normalize the embeddings.</span>
embeddings = np.array(embeddings / np.linalg.norm(embeddings))


<span class="hljs-comment"># Milvus expects a list of `numpy.ndarray` of `numpy.float32` numbers.</span>
converted_values = <span class="hljs-built_in">list</span>(<span class="hljs-built_in">map</span>(np.float32, embeddings))


<span class="hljs-comment"># Create dict_list for Milvus insertion.</span>
dict_list = []
<span class="hljs-keyword">for</span> chunk, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(chunks, converted_values):
   <span class="hljs-comment"># Assemble embedding vector, original text chunk, metadata.</span>
   chunk_dict = {
       <span class="hljs-string">&#x27;chunk&#x27;</span>: chunk.page_content,
       <span class="hljs-string">&#x27;source&#x27;</span>: chunk.metadata.get(<span class="hljs-string">&#x27;source&#x27;</span>, <span class="hljs-string">&quot;&quot;</span>),
       <span class="hljs-string">&#x27;vector&#x27;</span>: vector,
   }
   dict_list.append(chunk_dict)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text">chunk_size: 512, chunk_overlap: 51.0
22 docs <span class="hljs-built_in">split</span> into 355 child documents.
<button class="copy-code-btn"></button></code></pre>
<h3 id="Save-the-vectors-in-Milvus" class="common-anchor-header">Guarde los vectores en Milvus.</h3><p>Ingest the encoded vector embedding in the Milvus vector database.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Connect a client to the Milvus Lite server.</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
mc = MilvusClient(<span class="hljs-string">&quot;milvus_demo.db&quot;</span>)


<span class="hljs-comment"># Create a collection with flexible schema and AUTOINDEX.</span>
COLLECTION_NAME = <span class="hljs-string">&quot;MilvusDocs&quot;</span>
mc.create_collection(COLLECTION_NAME,
       EMBEDDING_DIM,
       consistency_level=<span class="hljs-string">&quot;Eventually&quot;</span>,
       auto_id=<span class="hljs-literal">True</span>, 
       overwrite=<span class="hljs-literal">True</span>)


<span class="hljs-comment"># Insert data into the Milvus collection.</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Start inserting entities&quot;</span>)
start_time = time.time()
mc.insert(
   COLLECTION_NAME,
   data=dict_list,
   progress_bar=<span class="hljs-literal">True</span>)


end_time = time.time()
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Milvus insert time for <span class="hljs-subst">{<span class="hljs-built_in">len</span>(dict_list)}</span> vectors: &quot;</span>, end=<span class="hljs-string">&quot;&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{<span class="hljs-built_in">round</span>(end_time - start_time, <span class="hljs-number">2</span>)}</span> seconds&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text">Start inserting entities
Milvus insert time for 355 vectors: 0.2 seconds
<button class="copy-code-btn"></button></code></pre>
<h3 id="Perform-a-vector-search" class="common-anchor-header">Realice una búsqueda de vectores.</h3><p>Formule una pregunta y busque los trozos vecinos más cercanos de su base de conocimientos en Milvus.</p>
<pre><code translate="no" class="language-python">SAMPLE_QUESTION = <span class="hljs-string">&quot;What do the parameters for HNSW mean?&quot;</span>


<span class="hljs-comment"># Embed the question using the same encoder.</span>
query_embeddings = torch.tensor(encoder.encode(SAMPLE_QUESTION))
<span class="hljs-comment"># Normalize embeddings to unit length.</span>
query_embeddings = F.normalize(query_embeddings, p=<span class="hljs-number">2</span>, dim=<span class="hljs-number">1</span>)
<span class="hljs-comment"># Convert the embeddings to list of list of np.float32.</span>
query_embeddings = <span class="hljs-built_in">list</span>(<span class="hljs-built_in">map</span>(np.float32, query_embeddings))


<span class="hljs-comment"># Define metadata fields you can filter on.</span>
OUTPUT_FIELDS = <span class="hljs-built_in">list</span>(dict_list[<span class="hljs-number">0</span>].keys())
OUTPUT_FIELDS.remove(<span class="hljs-string">&#x27;vector&#x27;</span>)


<span class="hljs-comment"># Define how many top-k results you want to retrieve.</span>
TOP_K = <span class="hljs-number">2</span>


<span class="hljs-comment"># Run semantic vector search using your query and the vector database.</span>
results = mc.search(
    COLLECTION_NAME,
    data=query_embeddings,
    output_fields=OUTPUT_FIELDS,
    limit=TOP_K,
    consistency_level=<span class="hljs-string">&quot;Eventually&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>El resultado recuperado es el que se muestra a continuación.</p>
<pre><code translate="no" class="language-text">Retrieved result <span class="hljs-comment">#1</span>
distance = 0.7001987099647522
(<span class="hljs-string">&#x27;Chunk text: layer, finds the node closest to the target in this layer, and&#x27;</span>
...
<span class="hljs-string">&#x27;outgoing&#x27;</span>)
<span class="hljs-built_in">source</span>: https://milvus.io/docs/index.md

Retrieved result <span class="hljs-comment">#2</span>
distance = 0.6953287124633789
(<span class="hljs-string">&#x27;Chunk text: this value can improve recall rate at the cost of increased&#x27;</span>
...
<span class="hljs-string">&#x27;to the target&#x27;</span>)
<span class="hljs-built_in">source</span>: https://milvus.io/docs/index.md
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-and-Perform-the-RAG-Generation-with-vLLM-and-Llama-31-8B" class="common-anchor-header">Construir y realizar la generación RAG con vLLM y Llama 3.1-8B<button data-href="#Build-and-Perform-the-RAG-Generation-with-vLLM-and-Llama-31-8B" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Install-vLLM-and-models-from-HuggingFace" class="common-anchor-header">Instalar vLLM y los modelos de HuggingFace</h3><p>vLLM descarga por defecto grandes modelos lingüísticos de HuggingFace. En general, siempre que desee utilizar un modelo nuevo en HuggingFace, debe hacer un pip install --upgrade o -U. Además, necesitarás una GPU para ejecutar la inferencia de los modelos Llama 3.1 de Meta con vLLM.</p>
<p>Para obtener una lista completa de todos los modelos compatibles con vLLM, consulte esta <a href="https://docs.vllm.ai/en/latest/models/supported_models.html#supported-models">página de documentación</a>.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># (Recommended) Create a new conda environment.</span>
conda create -n myenv python=<span class="hljs-number">3.11</span> -y
conda activate myenv


<span class="hljs-comment"># Install vLLM with CUDA 12.1.</span>
pip install -U vllm transformers torch


<span class="hljs-keyword">import</span> vllm, torch
<span class="hljs-keyword">from</span> vllm <span class="hljs-keyword">import</span> LLM, SamplingParams


<span class="hljs-comment"># Clear the GPU memory cache.</span>
torch.cuda.empty_cache()


<span class="hljs-comment"># Check the GPU.</span>
!nvidia-smi
<button class="copy-code-btn"></button></code></pre>
<p>Para saber más sobre cómo instalar vLLM, consulta su página de <a href="https://docs.vllm.ai/en/latest/getting_started/installation.html">instalación</a>.</p>
<h3 id="Get-a-HuggingFace-token" class="common-anchor-header">Consigue un token de HuggingFace.</h3><p>Algunos modelos en HuggingFace, como Meta Llama 3.1, requieren que el usuario acepte su licencia antes de poder descargar los pesos. Por lo tanto, debes crear una cuenta en HuggingFace, aceptar la licencia del modelo y generar un token.</p>
<p>Al visitar esta <a href="https://huggingface.co/meta-llama/Meta-Llama-3.1-70B">página de Llama3.1</a> en HuggingFace, aparecerá un mensaje pidiéndote que aceptes los términos. Haz clic en "<strong>Aceptar licencia</strong>" para aceptar los términos de Meta antes de descargar los pesos del modelo. La aprobación suele tardar menos de un día.</p>
<p><strong>Tras recibir la aprobación, deberás generar un nuevo token de HuggingFace. Sus antiguos tokens no funcionarán con los nuevos permisos.</strong></p>
<p>Antes de instalar vLLM, inicie sesión en HuggingFace con su nuevo token. A continuación, he utilizado Colab secrets para almacenar el token.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Login to HuggingFace using your new token.</span>
<span class="hljs-keyword">from</span> huggingface_hub <span class="hljs-keyword">import</span> login
<span class="hljs-keyword">from</span> google.colab <span class="hljs-keyword">import</span> userdata
hf_token = userdata.get(<span class="hljs-string">&#x27;HF_TOKEN&#x27;</span>)
login(token = hf_token, add_to_git_credential=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Run-the-RAG-Generation" class="common-anchor-header">Ejecutar la generación RAG</h3><p>En la demostración, ejecutamos el modelo <code translate="no">Llama-3.1-8B</code>, que requiere GPU y memoria considerable para girar. El siguiente ejemplo se ejecutó en Google Colab Pro (10$/mes) con una GPU A100. Para obtener más información sobre cómo ejecutar vLLM, puedes consultar la <a href="https://docs.vllm.ai/en/latest/getting_started/quickstart.html">documentación de inicio rápido</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 1. Choose a model</span>
MODELTORUN = <span class="hljs-string">&quot;meta-llama/Meta-Llama-3.1-8B-Instruct&quot;</span>


<span class="hljs-comment"># 2. Clear the GPU memory cache, you&#x27;re going to need it all!</span>
torch.cuda.empty_cache()


<span class="hljs-comment"># 3. Instantiate a vLLM model instance.</span>
llm = LLM(model=MODELTORUN,
         enforce_eager=<span class="hljs-literal">True</span>,
         dtype=torch.bfloat16,
         gpu_memory_utilization=<span class="hljs-number">0.5</span>,
         max_model_len=<span class="hljs-number">1000</span>,
         seed=<span class="hljs-number">415</span>,
         max_num_batched_tokens=<span class="hljs-number">3000</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Escriba una pregunta utilizando contextos y fuentes recuperados de Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Separate all the context together by space.</span>
contexts_combined = <span class="hljs-string">&#x27; &#x27;</span>.join(contexts)
<span class="hljs-comment"># Lance Martin, LangChain, says put the best contexts at the end.</span>
contexts_combined = <span class="hljs-string">&#x27; &#x27;</span>.join(<span class="hljs-built_in">reversed</span>(contexts))


<span class="hljs-comment"># Separate all the unique sources together by comma.</span>
source_combined = <span class="hljs-string">&#x27; &#x27;</span>.join(<span class="hljs-built_in">reversed</span>(<span class="hljs-built_in">list</span>(<span class="hljs-built_in">dict</span>.fromkeys(sources))))


SYSTEM_PROMPT = <span class="hljs-string">f&quot;&quot;&quot;First, check if the provided Context is relevant to
the user&#x27;s question.  Second, only if the provided Context is strongly relevant, answer the question using the Context.  Otherwise, if the Context is not strongly relevant, answer the question without using the Context. 
Be clear, concise, relevant.  Answer clearly, in fewer than 2 sentences.
Grounding sources: <span class="hljs-subst">{source_combined}</span>
Context: <span class="hljs-subst">{contexts_combined}</span>
User&#x27;s question: <span class="hljs-subst">{SAMPLE_QUESTION}</span>
&quot;&quot;&quot;</span>


prompts = [SYSTEM_PROMPT]
<button class="copy-code-btn"></button></code></pre>
<p>Ahora, genera una respuesta utilizando los trozos recuperados y la pregunta original introducida en el prompt.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sampling parameters</span>
sampling_params = SamplingParams(temperature=<span class="hljs-number">0.2</span>, top_p=<span class="hljs-number">0.95</span>)


<span class="hljs-comment"># Invoke the vLLM model.</span>
outputs = llm.generate(prompts, sampling_params)


<span class="hljs-comment"># Print the outputs.</span>
<span class="hljs-keyword">for</span> output <span class="hljs-keyword">in</span> outputs:
   prompt = output.prompt
   generated_text = output.outputs[<span class="hljs-number">0</span>].text
   <span class="hljs-comment"># !r calls repr(), which prints a string inside quotes.</span>
   <span class="hljs-built_in">print</span>()
   <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Question: <span class="hljs-subst">{SAMPLE_QUESTION!r}</span>&quot;</span>)
   pprint.pprint(<span class="hljs-string">f&quot;Generated text: <span class="hljs-subst">{generated_text!r}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text"><span class="hljs-title class_">Question</span>: <span class="hljs-string">&#x27;What do the parameters for HNSW MEAN!?&#x27;</span>
<span class="hljs-title class_">Generated</span> <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;Answer: The parameters for HNSW (Hiera(rchical Navigable Small World Graph) are: &#x27;</span>
<span class="hljs-string">&#x27;* M: The maximum degree of nodes on each layer oof the graph, which can improve &#x27;</span>
<span class="hljs-string">&#x27;recall rate at the cost of increased search time. * efConstruction and ef: &#x27;</span> 
<span class="hljs-string">&#x27;These parameters specify a search range when building or searching an index.&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>La respuesta de arriba me parece perfecta.</p>
<p>Si te interesa esta demostración, no dudes en probarla y contarnos lo que piensas. También puedes unirte a nuestra <a href="https://discord.com/invite/8uyFbECzPX">comunidad Milvus en Discord</a> para conversar directamente con todos los desarrolladores de GenAI.</p>
<h2 id="References" class="common-anchor-header">Referencias<button data-href="#References" class="anchor-icon" translate="no">
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
<li><p><a href="https://docs.vllm.ai/en/latest/getting_started/installation.html">Documentación oficial</a> y <a href="https://docs.vllm.ai/en/latest/models/supported_models.html#supported-models">página del modelo</a> vLLM.</p></li>
<li><p><a href="https://arxiv.org/pdf/2309.06180">2023 vLLM paper on Paged Attention (en inglés)</a></p></li>
<li><p><a href="https://www.youtube.com/watch?v=80bIUggRJf4">Presentación de 2023 vLLM</a> en Ray Summit</p></li>
<li><p>Blog de vLLM: <a href="https://blog.vllm.ai/2023/06/20/vllm.html">vLLM: Servicio LLM fácil, rápido y barato con PagedAttention</a></p></li>
<li><p>Blog útil sobre el funcionamiento del servidor vLLM: <a href="https://ploomber.io/blog/vllm-deploy/">Despliegue de vLLM: guía paso a paso</a></p></li>
<li><p><a href="https://ai.meta.com/research/publications/the-llama-3-herd-of-models/">La manada de modelos Llama 3 | Investigación - AI en Meta</a></p></li>
</ul>
