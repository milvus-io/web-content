---
id: llama_stack_with_milvus.md
title: Construir RAG con Llama Stack con Milvus
related_key: Llama Stack
summary: >-
  Este tutorial presenta cómo construir un servidor Llama Stack configurado con
  Milvus, permitiéndole importar sus datos privados para que sirvan como base de
  conocimiento. A continuación, realizaremos consultas en el servidor, creando
  una aplicación RAG completa.
---
<h1 id="Build-RAG-with-Llama-Stack-with-Milvus" class="common-anchor-header">Construir RAG con Llama Stack con Milvus<button data-href="#Build-RAG-with-Llama-Stack-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/meta-llama/llama-stack/tree/main">Llama Sta</a> ck es un enfoque orientado a los servicios que da prioridad a las API para crear aplicaciones de IA de producción. Proporciona una pila universal que permite a los desarrolladores desarrollar en cualquier lugar, desplegar en todas partes y aprovechar los bloques de construcción listos para la producción con verdadera independencia del proveedor. La pila Llama se centra en los modelos Llama de Meta, la componibilidad, la preparación para la producción y un ecosistema de socios.</p>
<p>En este tutorial, presentaremos cómo construir un Servidor Llama Stack configurado con Milvus, permitiéndole importar sus datos privados para que sirvan como base de conocimiento. A continuación, realizaremos consultas en el servidor, creando una aplicación RAG completa.</p>
<h2 id="Preparing-the-Environment" class="common-anchor-header">Preparación del entorno<button data-href="#Preparing-the-Environment" class="anchor-icon" translate="no">
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
    </button></h2><p>Hay muchas maneras de iniciar el servidor Llama Stack, como <a href="https://llama-stack.readthedocs.io/en/latest/distributions/importing_as_library.html">una biblioteca</a>, <a href="https://llama-stack.readthedocs.io/en/latest/distributions/building_distro.html">construyendo una distribución</a>, etc. Para cada componente de Llama Stack, también se pueden elegir varios proveedores. Por lo tanto, existen numerosas formas de iniciar el servidor Llama Stack.</p>
<p>Este tutorial utiliza la siguiente configuración como ejemplo para iniciar el servicio. Si desea iniciarlo de otra forma, consulte <a href="https://llama-stack.readthedocs.io/en/latest/distributions/index.html">Iniciar un servidor Llama Stack</a>.</p>
<ul>
<li>Usamos Conda para construir una distribución personalizada con configuración Milvus.</li>
<li>Utilizamos <a href="https://llama-stack.readthedocs.io/en/latest/distributions/self_hosted_distro/together.html#via-conda">Together AI</a> como proveedor LLM.</li>
<li>Utilizamos <code translate="no">all-MiniLM-L6-v2</code> por defecto como modelo de incrustación.</li>
</ul>
<div class="alert note">
<p>Este tutorial se refiere principalmente a la guía de instalación oficial de la <a href="https://llama-stack.readthedocs.io/en/latest/index.html">documentación de Llama</a> Stack. Si encuentra alguna parte obsoleta en este tutorial, puede dar prioridad a seguir la guía oficial y crear una incidencia para nosotros.</p>
</div>
<h2 id="Start-Llama-Stack-Server" class="common-anchor-header">Iniciar el servidor Llama Stack<button data-href="#Start-Llama-Stack-Server" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prepare-the-Environment" class="common-anchor-header">Preparar el entorno</h3><p>Dado que necesitamos utilizar Together AI como el servicio LLM, primero debemos iniciar sesión en el sitio web oficial para solicitar una <a href="https://api.together.xyz/settings/api-keys">clave API</a> y establecer la clave API <code translate="no">TOGETHER_API_KEY</code> como una variable de entorno.</p>
<p>Clonar el código fuente de Llama Stack</p>
<pre><code translate="no" class="language-bash">$ git <span class="hljs-built_in">clone</span> https://github.com/meta-llama/llama-stack.git
$ <span class="hljs-built_in">cd</span> llama-stack
<button class="copy-code-btn"></button></code></pre>
<p>Crea un entorno conda e instala las dependencias</p>
<pre><code translate="no" class="language-bash">$ conda create -n stack python=3.10
$ conda activate stack

$ pip install -e .
<button class="copy-code-btn"></button></code></pre>
<p>Modifica el contenido en <code translate="no">llama_stack/llama_stack/template/together/run.yaml</code>, cambiando la sección vector_io a la configuración Milvus relevante. Por ejemplo, añada:</p>
<pre><code translate="no" class="language-yaml">vector_io:
- provider_id: milvus
  provider_type: inline::milvus
  config:
    db_path: ~/.llama/distributions/together/milvus_store.db

<span class="hljs-comment">#  - provider_id: milvus</span>
<span class="hljs-comment">#    provider_type: remote::milvus</span>
<span class="hljs-comment">#    config:</span>
<span class="hljs-comment">#      uri: http://localhost:19530</span>
<span class="hljs-comment">#      token: root:Milvus</span>
<button class="copy-code-btn"></button></code></pre>
<p>En Llama Stack, Milvus puede configurarse de dos maneras: configuración local, que es <code translate="no">inline::milvus</code>, y configuración remota, que es <code translate="no">remote::milvus</code>.</p>
<ul>
<li><p>El método más sencillo es la configuración local, que requiere establecer <code translate="no">db_path</code>, una ruta para almacenar localmente los archivos <a href="https://milvus.io/docs/quickstart.md">de Milvus-Lite</a>.</p></li>
<li><p>La configuración remota es adecuada para el almacenamiento de grandes cantidades de datos.</p>
<ul>
<li>Si tiene una gran cantidad de datos, puede configurar un servidor Milvus de alto rendimiento en <a href="https://milvus.io/docs/quickstart.md">Docker o Kubernetes</a>. En esta configuración, utilice el URI del servidor, por ejemplo, <code translate="no">http://localhost:19530</code>, como su <code translate="no">uri</code>. El <code translate="no">token</code> por defecto es <code translate="no">root:Milvus</code>.</li>
<li>Si desea utilizar <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, el servicio en la nube totalmente gestionado para Milvus, ajuste los <code translate="no">uri</code> y <code translate="no">token</code>, que corresponden al <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint y a la clave API</a> en Zilliz Cloud.</li>
</ul></li>
</ul>
<h3 id="Build-distribution-from-the-template" class="common-anchor-header">Construir la distribución a partir de la plantilla</h3><p>Ejecute el siguiente comando para construir la distribución:</p>
<pre><code translate="no" class="language-bash">$ llama stack build --template together --image-<span class="hljs-built_in">type</span> conda
<button class="copy-code-btn"></button></code></pre>
<p>Se generará un archivo en <code translate="no">~/.llama/distributions/together/together-run.yaml</code>. A continuación, ejecute este comando para iniciar el servidor:</p>
<pre><code translate="no" class="language-bash">$ llama stack run --image-type conda ~<span class="hljs-regexp">/.llama/</span>distributions/together/together-run.<span class="hljs-property">yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Si todo va bien, deberías ver el servidor Llama Stack ejecutándose correctamente en el puerto 8321.</p>
<h2 id="Perform-RAG-from-client" class="common-anchor-header">Ejecutar la RAG desde el cliente<button data-href="#Perform-RAG-from-client" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez que hayas iniciado el servidor, puedes escribir el código cliente para acceder a él. Aquí tienes un código de ejemplo:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> uuid
<span class="hljs-keyword">from</span> llama_stack_client.types <span class="hljs-keyword">import</span> Document
<span class="hljs-keyword">from</span> llama_stack_client.lib.agents.agent <span class="hljs-keyword">import</span> Agent
<span class="hljs-keyword">from</span> llama_stack_client.types.agent_create_params <span class="hljs-keyword">import</span> AgentConfig

<span class="hljs-comment"># See https://www.together.ai/models for all available models</span>
INFERENCE_MODEL = <span class="hljs-string">&quot;meta-llama/Llama-3.3-70B-Instruct-Turbo&quot;</span>
LLAMA_STACK_PORT = <span class="hljs-number">8321</span>


<span class="hljs-keyword">def</span> <span class="hljs-title function_">create_http_client</span>():
    <span class="hljs-keyword">from</span> llama_stack_client <span class="hljs-keyword">import</span> LlamaStackClient

    <span class="hljs-keyword">return</span> LlamaStackClient(
        base_url=<span class="hljs-string">f&quot;http://localhost:<span class="hljs-subst">{LLAMA_STACK_PORT}</span>&quot;</span>  <span class="hljs-comment"># Your Llama Stack Server URL</span>
    )


client = create_http_client()

<span class="hljs-comment"># Documents to be used for RAG</span>
urls = [<span class="hljs-string">&quot;chat.rst&quot;</span>, <span class="hljs-string">&quot;llama3.rst&quot;</span>, <span class="hljs-string">&quot;memory_optimizations.rst&quot;</span>, <span class="hljs-string">&quot;lora_finetune.rst&quot;</span>]
documents = [
    Document(
        document_id=<span class="hljs-string">f&quot;num-<span class="hljs-subst">{i}</span>&quot;</span>,
        content=<span class="hljs-string">f&quot;https://raw.githubusercontent.com/pytorch/torchtune/main/docs/source/tutorials/<span class="hljs-subst">{url}</span>&quot;</span>,
        mime_type=<span class="hljs-string">&quot;text/plain&quot;</span>,
        metadata={},
    )
    <span class="hljs-keyword">for</span> i, url <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(urls)
]

<span class="hljs-comment"># Register a vector database</span>
vector_db_id = <span class="hljs-string">f&quot;test-vector-db-<span class="hljs-subst">{uuid.uuid4().<span class="hljs-built_in">hex</span>}</span>&quot;</span>
client.vector_dbs.register(
    vector_db_id=vector_db_id,
    embedding_model=<span class="hljs-string">&quot;all-MiniLM-L6-v2&quot;</span>,
    embedding_dimension=<span class="hljs-number">384</span>,
    provider_id=<span class="hljs-string">&quot;milvus&quot;</span>,
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;inserting...&quot;</span>)
<span class="hljs-comment"># Insert the documents into the vector database</span>
client.tool_runtime.rag_tool.insert(
    documents=documents, vector_db_id=vector_db_id, chunk_size_in_tokens=<span class="hljs-number">1024</span>,
)

agent_config = AgentConfig(
    model=INFERENCE_MODEL,
    <span class="hljs-comment"># Define instructions for the agent ( aka system prompt)</span>
    instructions=<span class="hljs-string">&quot;You are a helpful assistant&quot;</span>,
    enable_session_persistence=<span class="hljs-literal">False</span>,
    <span class="hljs-comment"># Define tools available to the agent</span>
    toolgroups=[{<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;builtin::rag&quot;</span>, <span class="hljs-string">&quot;args&quot;</span>: {<span class="hljs-string">&quot;vector_db_ids&quot;</span>: [vector_db_id]}}],
)

rag_agent = Agent(client, agent_config)
session_id = rag_agent.create_session(<span class="hljs-string">&quot;test-session&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;finish init agent...&quot;</span>)
user_prompt = (
    <span class="hljs-string">&quot;What are the top 5 topics that were explained? Only list succinct bullet points.&quot;</span>
)

<span class="hljs-comment"># Get the final answer from the agent</span>
response = rag_agent.create_turn(
    messages=[{<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: user_prompt}],
    session_id=session_id,
    stream=<span class="hljs-literal">False</span>,
)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Response: &quot;</span>)
<span class="hljs-built_in">print</span>(response.output_message.content)
<button class="copy-code-btn"></button></code></pre>
<p>Ejecuta este código para realizar la consulta RAG. Si todo funciona correctamente, la salida debería tener este aspecto:</p>
<pre><code translate="no" class="language-log">inserting...
finish init agent...
Response: 
* Fine-Tuning Llama3 with Chat Data
* Evaluating fine-tuned Llama3-8B models with EleutherAI&#x27;s Eval Harness
* Generating text with our fine-tuned Llama3 model
* Faster generation via quantization
* Fine-tuning on a custom chat dataset
<button class="copy-code-btn"></button></code></pre>
