---
id: llama_stack_with_milvus.md
title: Постройте RAG с помощью Llama Stack с Milvus
related_key: Llama Stack
summary: >-
  В этом уроке рассказывается о том, как создать сервер Llama Stack Server,
  сконфигурированный с Milvus, позволяющий импортировать ваши личные данные в
  качестве базы знаний. Затем мы будем выполнять запросы на сервере, создавая
  полноценное RAG-приложение.
---
<h1 id="Build-RAG-with-Llama-Stack-with-Milvus" class="common-anchor-header">Создайте RAG на основе Llama Stack с помощью Milvus<button data-href="#Build-RAG-with-Llama-Stack-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/meta-llama/llama-stack/tree/main">Llama Stack</a> - это сервис-ориентированный, API-ориентированный подход к созданию производственных приложений искусственного интеллекта. Он представляет собой универсальный стек, который позволяет разработчикам разрабатывать в любом месте, развертывать в любом месте и использовать готовые к производству строительные блоки с подлинной независимостью от поставщика. Стек Llama Stack фокусируется на моделях Meta Llama, композитности, готовности к производству и партнерской экосистеме.</p>
<p>В этом учебном пособии мы расскажем, как создать сервер Llama Stack Server, сконфигурированный с Milvus, что позволит вам импортировать свои частные данные в качестве базы знаний. Затем мы выполним запросы на сервере, создав полноценное RAG-приложение.</p>
<h2 id="Preparing-the-Environment" class="common-anchor-header">Подготовка среды<button data-href="#Preparing-the-Environment" class="anchor-icon" translate="no">
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
    </button></h2><p>Существует множество способов запустить сервер Llama Stack, например в <a href="https://llama-stack.readthedocs.io/en/latest/distributions/importing_as_library.html">виде библиотеки</a>, <a href="https://llama-stack.readthedocs.io/en/latest/distributions/building_distro.html">сборки дистрибутива</a> и т. д. Для каждого компонента Llama Stack также можно выбрать различных провайдеров. Таким образом, существует множество способов запустить сервер Llama Stack.</p>
<p>В этом руководстве в качестве примера используется следующая конфигурация для запуска службы. Если вы хотите запустить его другим способом, обратитесь к разделу <a href="https://llama-stack.readthedocs.io/en/latest/distributions/index.html">"Запуск сервера Llama Stack</a>".</p>
<ul>
<li>Мы используем Conda для создания пользовательского дистрибутива с конфигурацией Milvus.</li>
<li>В качестве провайдера LLM мы используем <a href="https://llama-stack.readthedocs.io/en/latest/distributions/self_hosted_distro/together.html#via-conda">Together AI</a>.</li>
<li>В качестве модели встраивания мы используем стандартный <code translate="no">all-MiniLM-L6-v2</code>.</li>
</ul>
<div class="alert note">
<p>Это руководство в основном ссылается на официальное руководство по установке в <a href="https://llama-stack.readthedocs.io/en/latest/index.html">документации Llama Stack</a>. Если вы найдете в этом руководстве устаревшие части, вы можете отдать предпочтение официальному руководству и создать для нас проблему.</p>
</div>
<h2 id="Start-Llama-Stack-Server" class="common-anchor-header">Запуск сервера Llama Stack<button data-href="#Start-Llama-Stack-Server" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prepare-the-Environment" class="common-anchor-header">Подготовьте среду</h3><p>Поскольку нам нужно использовать Together AI в качестве LLM-сервиса, мы должны сначала войти на официальный сайт, чтобы подать заявку на получение <a href="https://api.together.xyz/settings/api-keys">API-ключа</a>, и установить API-ключ <code translate="no">TOGETHER_API_KEY</code> в качестве переменной окружения.</p>
<p>Клонирование исходного кода Llama Stack</p>
<pre><code translate="no" class="language-bash">$ git <span class="hljs-built_in">clone</span> https://github.com/meta-llama/llama-stack.git
$ <span class="hljs-built_in">cd</span> llama-stack
<button class="copy-code-btn"></button></code></pre>
<p>Создайте окружение conda и установите зависимости</p>
<pre><code translate="no" class="language-bash">$ conda create -n stack python=3.10
$ conda activate stack

$ pip install -e .
<button class="copy-code-btn"></button></code></pre>
<p>Измените содержимое <code translate="no">llama_stack/llama_stack/template/together/run.yaml</code>, изменив секцию vector_io на соответствующую конфигурацию Milvus. Например, добавьте:</p>
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
<p>В Llama Stack Milvus может быть настроен двумя способами: локальная конфигурация, которая находится на <code translate="no">inline::milvus</code>, и удаленная конфигурация, которая находится на <code translate="no">remote::milvus</code>.</p>
<ul>
<li><p>Самый простой способ - локальная конфигурация, которая требует установки <code translate="no">db_path</code>, пути для локального хранения файлов <a href="https://milvus.io/docs/quickstart.md">Milvus-Lite</a>.</p></li>
<li><p>Удаленная конфигурация подходит для хранения большого объема данных.</p>
<ul>
<li>Если у вас большой объем данных, вы можете создать производительный сервер Milvus на <a href="https://milvus.io/docs/quickstart.md">Docker или Kubernetes</a>. При такой настройке используйте URI сервера, например, <code translate="no">http://localhost:19530</code>, в качестве <code translate="no">uri</code>. По умолчанию <code translate="no">token</code> - это <code translate="no">root:Milvus</code>.</li>
<li>Если вы хотите использовать <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, полностью управляемый облачный сервис для Milvus, измените <code translate="no">uri</code> и <code translate="no">token</code>, которые соответствуют <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">публичной конечной точке и ключу API</a> в Zilliz Cloud.</li>
</ul></li>
</ul>
<h3 id="Build-distribution-from-the-template" class="common-anchor-header">Сборка дистрибутива из шаблона</h3><p>Выполните следующую команду для сборки дистрибутива:</p>
<pre><code translate="no" class="language-bash">$ llama stack build --template together --image-<span class="hljs-built_in">type</span> conda
<button class="copy-code-btn"></button></code></pre>
<p>Будет создан файл по адресу <code translate="no">~/.llama/distributions/together/together-run.yaml</code>. Затем выполните эту команду, чтобы запустить сервер:</p>
<pre><code translate="no" class="language-bash">$ llama stack run --image-type conda ~<span class="hljs-regexp">/.llama/</span>distributions/together/together-run.<span class="hljs-property">yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Если все прошло гладко, вы должны увидеть, что сервер Llama Stack успешно запущен на порту 8321.</p>
<h2 id="Perform-RAG-from-client" class="common-anchor-header">Выполнение RAG с клиента<button data-href="#Perform-RAG-from-client" class="anchor-icon" translate="no">
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
    </button></h2><p>После запуска сервера можно написать код клиента для доступа к нему. Вот пример кода:</p>
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
<p>Запустите этот код для выполнения запроса RAG. Если все работает правильно, вывод должен выглядеть следующим образом:</p>
<pre><code translate="no" class="language-log">inserting...
finish init agent...
Response: 
* Fine-Tuning Llama3 with Chat Data
* Evaluating fine-tuned Llama3-8B models with EleutherAI&#x27;s Eval Harness
* Generating text with our fine-tuned Llama3 model
* Faster generation via quantization
* Fine-tuning on a custom chat dataset
<button class="copy-code-btn"></button></code></pre>
