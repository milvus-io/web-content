---
id: llama_stack_with_milvus.md
title: Milvus를 사용하여 Llama Stack으로 RAG 구축하기
related_key: Llama Stack
summary: >-
  이 튜토리얼에서는 Milvus로 구성된 Llama Stack 서버를 구축하여, 사용자의 비공개 데이터를 가져와 지식 기반으로 활용하는 방법을
  소개합니다. 이후 서버에서 쿼리를 실행하여 완전한 RAG 애플리케이션을 구축해 보겠습니다.
---
<h1 id="Build-RAG-with-Llama-Stack-with-Milvus" class="common-anchor-header">Milvus를 활용한 Llama Stack 기반 RAG 구축<button data-href="#Build-RAG-with-Llama-Stack-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/meta-llama/llama-stack/tree/main">Llama Stack은</a> 프로덕션용 AI 애플리케이션을 구축하기 위한 서비스 지향적이고 API 우선의 접근 방식입니다. 이 플랫폼은 개발자가 어디서나 개발하고, 어디에나 배포하며, 진정한 공급자 독립성을 갖춘 프로덕션 준비 완료 빌딩 블록을 활용할 수 있도록 하는 범용 스택을 제공합니다. Llama Stack은 Meta의 Llama 모델, 조합성, 프로덕션 준비 상태, 그리고 파트너십 생태계에 중점을 둡니다.</p>
<p>이 튜토리얼에서는 Milvus로 구성된 Llama Stack 서버를 구축하여, 사용자의 비공개 데이터를 지식 기반으로 활용할 수 있도록 하는 방법을 소개합니다. 그런 다음 서버에서 쿼리를 실행하여 완전한 RAG 애플리케이션을 완성해 보겠습니다.</p>
<h2 id="Preparing-the-Environment" class="common-anchor-header">환경 준비<button data-href="#Preparing-the-Environment" class="anchor-icon" translate="no">
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
    </button></h2><p>Llama Stack 서버를 시작하는 방법에는 <a href="https://llama-stack.readthedocs.io/en/latest/distributions/importing_as_library.html">라이브러리 사용</a>, <a href="https://llama-stack.readthedocs.io/en/latest/distributions/building_distro.html">배포판 빌드</a> <a href="https://llama-stack.readthedocs.io/en/latest/distributions/importing_as_library.html">등</a> 여러 가지가 있습니다. 또한 Llama Stack의 각 구성 요소마다 다양한 제공자를 선택할 수 있습니다. 따라서 Llama Stack 서버를 실행하는 방법도 매우 다양합니다.</p>
<p>이 튜토리얼에서는 서비스를 시작하는 예시로 다음 구성을 사용합니다. 다른 방법으로 시작하고 싶다면 <a href="https://llama-stack.readthedocs.io/en/latest/distributions/index.html">‘Llama Stack 서버 시작하기’를</a> 참조하십시오.</p>
<ul>
<li>Conda를 사용하여 Milvus 구성이 포함된 사용자 지정 배포판을 빌드합니다.</li>
<li>LLM 제공자로는 <a href="https://llama-stack.readthedocs.io/en/latest/distributions/self_hosted_distro/together.html#via-conda">Together AI를</a> 사용합니다.</li>
<li>임베딩 모델로는 기본값인 <code translate="no">all-MiniLM-L6-v2</code> 를 사용합니다.</li>
</ul>
<div class="alert note">
<p>이 튜토리얼은 주로 <a href="https://llama-stack.readthedocs.io/en/latest/index.html">Llama Stack 문서의</a> 공식 설치 가이드를 참조합니다. 이 튜토리얼에서 오래된 내용이 발견될 경우, 공식 가이드를 우선적으로 따르고 저희에게 이슈를 등록해 주시기 바랍니다.</p>
</div>
<h2 id="Start-Llama-Stack-Server" class="common-anchor-header">Llama Stack 서버 시작<button data-href="#Start-Llama-Stack-Server" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prepare-the-Environment" class="common-anchor-header">환경 준비<button data-href="#Prepare-the-Environment" class="anchor-icon" translate="no">
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
    </button></h3><p>LLM 서비스로 Together AI를 사용해야 하므로, 먼저 공식 웹사이트에 로그인하여 <a href="https://api.together.xyz/settings/api-keys">API 키를</a> 신청하고, API 키 <code translate="no">TOGETHER_API_KEY</code> 를 환경 변수로 설정해야 합니다.</p>
<p>Llama Stack 소스 코드 클론하기</p>
<pre><code translate="no" class="language-bash">$ git <span class="hljs-built_in">clone</span> https://github.com/meta-llama/llama-stack.git
$ <span class="hljs-built_in">cd</span> llama-stack
<button class="copy-code-btn"></button></code></pre>
<p>conda 환경 생성 및 종속성 설치</p>
<pre><code translate="no" class="language-bash">$ conda create -n stack python=3.10
$ conda activate stack

$ pip install -e .
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">llama_stack/llama_stack/templates/together/run.yaml</code> 파일의 내용을 수정하여 vector_io 섹션을 관련 Milvus 구성으로 변경합니다. 예를 들어, 다음을 추가합니다:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">vector_io:</span>
<span class="hljs-bullet">-</span> <span class="hljs-attr">provider_id:</span> <span class="hljs-string">milvus</span>
  <span class="hljs-attr">provider_type:</span> <span class="hljs-string">inline::milvus</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">db_path:</span> <span class="hljs-string">~/.llama/distributions/together/milvus_store.db</span>

<span class="hljs-comment">#  - provider_id: milvus</span>
<span class="hljs-comment">#    provider_type: remote::milvus</span>
<span class="hljs-comment">#    config:</span>
<span class="hljs-comment">#      uri: http://localhost:19530</span>
<span class="hljs-comment">#      token: root:Milvus</span>
<button class="copy-code-btn"></button></code></pre>
<p>Llama Stack에서 Milvus는 <code translate="no">inline::milvus</code> 인 로컬 구성과 <code translate="no">remote::milvus</code> 인 원격 구성, 두 가지 방법으로 설정할 수 있습니다.</p>
<ul>
<li><p>가장 간단한 방법은 로컬 구성으로, <a href="https://milvus.io/docs/quickstart.md">Milvus-Lite</a> 파일을 로컬에 저장할 경로인 <code translate="no">db_path</code> 를 설정해야 합니다.</p></li>
<li><p>원격 구성은 대용량 데이터 저장에 적합합니다.</p>
<ul>
<li>데이터 양이 많은 경우, <a href="https://milvus.io/docs/quickstart.md">Docker 또는 Kubernetes에서</a> 고성능 Milvus 서버를 설정할 수 있습니다. 이 설정에서는 <code translate="no">uri</code> 값으로 서버 URI(예: <code translate="no">http://localhost:19530</code>)를 사용하십시오. 기본 <code translate="no">token</code> 는 <code translate="no">root:Milvus</code> 입니다.</li>
<li>Milvus용 완전 관리형 클라우드 서비스인 <a href="https://zilliz.com/cloud">Zilliz Cloud를</a> 사용하려면, Zilliz Cloud의 <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">공개 엔드포인트(Public Endpoint) 및 API 키</a> 에 해당하는 <code translate="no">uri</code> 와 <code translate="no">token</code> 를 조정하십시오.</li>
</ul></li>
</ul>
<h3 id="Build-distribution-from-the-template" class="common-anchor-header">템플릿을 사용하여 배포판 빌드<button data-href="#Build-distribution-from-the-template" class="anchor-icon" translate="no">
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
    </button></h3><p>다음 명령어를 실행하여 배포판을 빌드하십시오:</p>
<pre><code translate="no" class="language-bash">$ llama stack build --template together --image-type conda
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">~/.llama/distributions/together/together-run.yaml</code> 에 파일이 생성됩니다. 그런 다음 다음 명령어를 실행하여 서버를 시작하십시오:</p>
<pre><code translate="no" class="language-bash">$ llama stack run --image-type conda ~/.llama/distributions/together/together-run.yaml
<button class="copy-code-btn"></button></code></pre>
<p>모든 과정이 순조롭게 진행되면, Llama Stack 서버가 포트 8321에서 정상적으로 실행되는 것을 확인할 수 있습니다.</p>
<h2 id="Perform-RAG-from-client" class="common-anchor-header">클라이언트에서 RAG 수행<button data-href="#Perform-RAG-from-client" class="anchor-icon" translate="no">
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
    </button></h2><p>서버를 시작한 후에는 서버에 액세스할 클라이언트 코드를 작성할 수 있습니다. 다음은 샘플 코드입니다:</p>
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
<p>이 코드를 실행하여 RAG 쿼리를 수행하세요.
모든 것이 정상적으로 작동하면 출력은 다음과 같아야 합니다:</p>
<pre><code translate="no" class="language-log">inserting...
finish init agent...
Response: 
* Fine-Tuning Llama3 with Chat Data
* Evaluating fine-tuned Llama3-8B models with EleutherAI's Eval Harness
* Generating text with our fine-tuned Llama3 model
* Faster generation via quantization
* Fine-tuning on a custom chat dataset
</code></pre>
