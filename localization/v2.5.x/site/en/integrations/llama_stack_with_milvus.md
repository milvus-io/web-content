---
id: llama_stack_with_milvus.md
title: Build RAG with Llama Stack with Milvus
related_key: Llama Stack
summary: >-
  This tutorial introduces how to build a Llama Stack Server configured with
  Milvus, enabling you to import your private data to serve as your knowledge
  base. We will then perform queries on the server, creating a complete RAG
  application.
---
<h1 id="Build-RAG-with-Llama-Stack-with-Milvus" class="common-anchor-header">Build RAG with Llama Stack with Milvus<button data-href="#Build-RAG-with-Llama-Stack-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/meta-llama/llama-stack/tree/main">Llama Stack</a> is a service-oriented, API-first approach for building production AI applications. It provides a universal stack that allows developers to develop anywhere, deploy everywhere, and leverage production-ready building blocks with true provider independence. The Llama Stack focuses on Meta’s Llama models, composability, production-readiness, and a partnering ecosystem.</p>
<p>In this tutorial, we will introduce how to build a Llama Stack Server configured with Milvus, enabling you to import your private data to serve as your knowledge base. We will then perform queries on the server, creating a complete RAG application.</p>
<h2 id="Preparing-the-Environment" class="common-anchor-header">Preparing the Environment<button data-href="#Preparing-the-Environment" class="anchor-icon" translate="no">
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
    </button></h2><p>There are many ways to start the Llama Stack server, such as <a href="https://llama-stack.readthedocs.io/en/latest/distributions/importing_as_library.html">as a library</a>, <a href="https://llama-stack.readthedocs.io/en/latest/distributions/building_distro.html">building a distribution</a>, etc. For each component in the Llama Stack, various providers can also be chosen. Therefore, there are numerous ways to launch the Llama Stack server.</p>
<p>This tutorial uses the following configuration as an example to start the service. If you wish to start it in another way, please refer to <a href="https://llama-stack.readthedocs.io/en/latest/distributions/index.html">Starting a Llama Stack Server</a>.</p>
<ul>
<li>We use Conda to build a custom distribution with Milvus configuration.</li>
<li>We use <a href="https://llama-stack.readthedocs.io/en/latest/distributions/self_hosted_distro/together.html#via-conda">Together AI</a> as the LLM provider.</li>
<li>We use the default <code translate="no">all-MiniLM-L6-v2</code> as the embedding model.</li>
</ul>
<div class="alert note">
<p>This tutorial mainly refers to the official installation guide of the <a href="https://llama-stack.readthedocs.io/en/latest/index.html">Llama Stack documentation</a>. If you find any outdated parts in this tutorial, you can prioritize following the official guide and create an issue for us.</p>
</div>
<h2 id="Start-Llama-Stack-Server" class="common-anchor-header">Start Llama Stack Server<button data-href="#Start-Llama-Stack-Server" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prepare-the-Environment" class="common-anchor-header">Prepare the Environment</h3><p>Since we need to use Together AI as the LLM service, we must first log in to the official website to apply for an <a href="https://api.together.xyz/settings/api-keys">API key</a> and set the API key <code translate="no">TOGETHER_API_KEY</code> as an environment variable.</p>
<p>Clone the Llama Stack source code</p>
<pre><code translate="no" class="language-bash">$ git <span class="hljs-built_in">clone</span> https://github.com/meta-llama/llama-stack.git
$ <span class="hljs-built_in">cd</span> llama-stack
<button class="copy-code-btn"></button></code></pre>
<p>Create a conda environment and install dependencies</p>
<pre><code translate="no" class="language-bash">$ conda create -n stack python=3.10
$ conda activate stack

$ pip install -e .
<button class="copy-code-btn"></button></code></pre>
<p>Modify the content in <code translate="no">llama_stack/llama_stack/template/together/run.yaml</code>, changing the vector_io section to the relevant Milvus configuration. For example, add:</p>
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
<p>In Llama Stack, Milvus can be configured in two ways: local configuration, which is <code translate="no">inline::milvus</code>, and remote configuration, which is <code translate="no">remote::milvus</code>.</p>
<ul>
<li><p>The simplest method is local configuration, which requires setting <code translate="no">db_path</code>, a path for locally storing <a href="https://milvus.io/docs/quickstart.md">Milvus-Lite</a> files.</p></li>
<li><p>Remote configuration is suitable for large data storage.</p>
<ul>
<li>If you have a large amount of data, you can set up a performant Milvus server on <a href="https://milvus.io/docs/quickstart.md">Docker or Kubernetes</a>. In this setup, please use the server URI, e.g., <code translate="no">http://localhost:19530</code>, as your <code translate="no">uri</code>. The default <code translate="no">token</code> is <code translate="no">root:Milvus</code>.</li>
<li>If you want to use <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, the fully managed cloud service for Milvus, adjust the <code translate="no">uri</code> and <code translate="no">token</code>, which correspond to the <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint and API key</a> in Zilliz Cloud.</li>
</ul></li>
</ul>
<h3 id="Build-distribution-from-the-template" class="common-anchor-header">Build distribution from the template</h3><p>Run the following command to build the distribution:</p>
<pre><code translate="no" class="language-bash">$ llama stack build --template together --image-<span class="hljs-built_in">type</span> conda
<button class="copy-code-btn"></button></code></pre>
<p>A file will be generated at <code translate="no">~/.llama/distributions/together/together-run.yaml</code>. Then, run this command to start the server:</p>
<pre><code translate="no" class="language-bash">$ llama stack run --image-type conda ~<span class="hljs-regexp">/.llama/</span>distributions/together/together-run.<span class="hljs-property">yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>If everything goes smoothly, you should see the Llama Stack server successfully running on port 8321.</p>
<h2 id="Perform-RAG-from-client" class="common-anchor-header">Perform RAG from client<button data-href="#Perform-RAG-from-client" class="anchor-icon" translate="no">
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
    </button></h2><p>Once you have started the server, you can write the client code to access it. Here is a sample code:</p>
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
<p>Run this code to perform the RAG query.
If everything is working properly, the output should look like this:</p>
<pre><code translate="no" class="language-log">inserting...
finish init agent...
Response: 
* Fine-Tuning Llama3 with Chat Data
* Evaluating fine-tuned Llama3-8B models with EleutherAI&#x27;s Eval Harness
* Generating text with our fine-tuned Llama3 model
* Faster generation via quantization
* Fine-tuning on a custom chat dataset
<button class="copy-code-btn"></button></code></pre>
