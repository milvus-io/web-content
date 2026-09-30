---
id: integrate_with_langfuse.md
summary: >-
  이 문서는 라마인덱스 랑퓨즈 통합을 사용하는 방법을 보여주는 간단한 쿡북입니다. 문서와 쿼리를 저장하기 위해 Milvus Lite를
  사용합니다.
title: Langfuse를 사용하여 RAG 품질 평가하기
---
<h1 id="Using-Langfuse-to-Trace-Queries-in-RAG" class="common-anchor-header">Langfuse를 사용하여 RAG에서 쿼리 추적하기<button data-href="#Using-Langfuse-to-Trace-Queries-in-RAG" class="anchor-icon" translate="no">
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
    </button></h1><p><a target="_blank" href="https://colab.research.google.com/github/langfuse/langfuse-docs/blob/main/cookbook/integration_llama-index_milvus-lite.ipynb">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a></p>
<p>이 문서는 Langfuse를 사용해 RAG에서 쿼리를 추적하는 방법을 보여주는 간단한 쿡북입니다. RAG 파이프라인은 문서를 저장하고 검색하기 위해 LlamaIndex와 Milvus Lite로 구현됩니다.</p>
<p>이 빠른 시작에서는 Milvus Lite를 벡터 저장소로 사용하여 LlamaIndex 애플리케이션을 설정하는 방법을 보여드리겠습니다. 또한 Langfuse LlamaIndex 통합을 사용하여 애플리케이션을 추적하는 방법도 보여드리겠습니다.</p>
<p><a href="https://github.com/langfuse/langfuse">Langfuse는</a> 팀이 LLM 애플리케이션을 공동으로 디버그, 분석 및 반복할 수 있도록 지원하는 오픈 소스 LLM 엔지니어링 플랫폼입니다. 모든 플랫폼 기능이 기본적으로 통합되어 개발 워크플로를 가속화합니다.</p>
<p><a href="https://github.com/milvus-io/milvus-lite/">Milvus Lite는</a> 벡터 임베딩 및 유사성 검색을 통해 AI 애플리케이션을 지원하는 오픈 소스 벡터 데이터베이스인 Milvus의 경량 버전입니다.</p>
<h2 id="Setup" class="common-anchor-header">설치<button data-href="#Setup" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">llama-index</code> 및 <code translate="no">langfuse</code> 이 모두 설치되어 있는지 확인합니다.</p>
<pre><code translate="no" class="language-python">$ pip install llama-index langfuse llama-index-vector-stores-milvus --upgrade
<button class="copy-code-btn"></button></code></pre>
<p>연동을 초기화합니다. <a href="https://cloud.langfuse.com">Langfuse 프로젝트 설정에서</a> API 키를 가져와 public_key secret_key를 키 값으로 바꿉니다. 이 예제에서는 임베딩 및 채팅 완성을 위해 OpenAI를 사용하므로 환경 변수에 OpenAI 키도 지정해야 합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

<span class="hljs-comment"># Get keys for your project from the project settings page</span>
<span class="hljs-comment"># https://cloud.langfuse.com</span>
os.environ[<span class="hljs-string">&quot;LANGFUSE_PUBLIC_KEY&quot;</span>] = <span class="hljs-string">&quot;&quot;</span>
os.environ[<span class="hljs-string">&quot;LANGFUSE_SECRET_KEY&quot;</span>] = <span class="hljs-string">&quot;&quot;</span>
os.environ[<span class="hljs-string">&quot;LANGFUSE_HOST&quot;</span>] = <span class="hljs-string">&quot;https://cloud.langfuse.com&quot;</span> <span class="hljs-comment"># 🇪🇺 EU region</span>
<span class="hljs-comment"># os.environ[&quot;LANGFUSE_HOST&quot;] = &quot;https://us.cloud.langfuse.com&quot; # 🇺🇸 US region</span>

<span class="hljs-comment"># Your openai key</span>
os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> Settings
<span class="hljs-keyword">from</span> llama_index.core.callbacks <span class="hljs-keyword">import</span> CallbackManager
<span class="hljs-keyword">from</span> langfuse.llama_index <span class="hljs-keyword">import</span> LlamaIndexCallbackHandler
 
langfuse_callback_handler = LlamaIndexCallbackHandler()
Settings.callback_manager = CallbackManager([langfuse_callback_handler])
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-using-Milvus-Lite" class="common-anchor-header">Milvus Lite를 사용한 색인<button data-href="#Index-using-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> Document

doc1 = Document(text=<span class="hljs-string">&quot;&quot;&quot;
Maxwell &quot;Max&quot; Silverstein, a lauded movie director, screenwriter, and producer, was born on October 25, 1978, in Boston, Massachusetts. A film enthusiast from a young age, his journey began with home movies shot on a Super 8 camera. His passion led him to the University of Southern California (USC), majoring in Film Production. Eventually, he started his career as an assistant director at Paramount Pictures. Silverstein&#x27;s directorial debut, “Doors Unseen,” a psychological thriller, earned him recognition at the Sundance Film Festival and marked the beginning of a successful directing career.
&quot;&quot;&quot;</span>)
doc2 = Document(text=<span class="hljs-string">&quot;&quot;&quot;
Throughout his career, Silverstein has been celebrated for his diverse range of filmography and unique narrative technique. He masterfully blends suspense, human emotion, and subtle humor in his storylines. Among his notable works are &quot;Fleeting Echoes,&quot; &quot;Halcyon Dusk,&quot; and the Academy Award-winning sci-fi epic, &quot;Event Horizon&#x27;s Brink.&quot; His contribution to cinema revolves around examining human nature, the complexity of relationships, and probing reality and perception. Off-camera, he is a dedicated philanthropist living in Los Angeles with his wife and two children.
&quot;&quot;&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example index construction + LLM query</span>

<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> VectorStoreIndex
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> StorageContext
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore


vector_store = MilvusVectorStore(
    uri=<span class="hljs-string">&quot;tmp/milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1536</span>, overwrite=<span class="hljs-literal">False</span>
)
storage_context = StorageContext.from_defaults(vector_store=vector_store)

index = VectorStoreIndex.from_documents(
    [doc1,doc2], storage_context=storage_context
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Query" class="common-anchor-header">쿼리<button data-href="#Query" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python"><span class="hljs-comment"># Query</span>
response = index.as_query_engine().query(<span class="hljs-string">&quot;What did he do growing up?&quot;</span>)
<span class="hljs-built_in">print</span>(response)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Chat</span>
response = index.as_chat_engine().chat(<span class="hljs-string">&quot;What did he do growing up?&quot;</span>)
<span class="hljs-built_in">print</span>(response)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Explore-traces-in-Langfuse" class="common-anchor-header">Langfuse에서 추적 탐색<button data-href="#Explore-traces-in-Langfuse" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python"><span class="hljs-comment"># As we want to immediately see result in Langfuse, we need to flush the callback handler</span>
langfuse_callback_handler.flush()
<button class="copy-code-btn"></button></code></pre>
<p>완료! 랭퓨즈 프로젝트에서 인덱스와 쿼리의 추적을 확인할 수 있습니다.</p>
<p>트레이스 예시(공개 링크):</p>
<ol>
<li><a href="https://cloud.langfuse.com/project/cloramnkj0002jz088vzn1ja4/traces/2b26fc72-044f-4b0b-a3c3-485328975161">Query</a></li>
<li><a href="https://cloud.langfuse.com/project/cloramnkj0002jz088vzn1ja4/traces/72503163-2b25-4693-9cc9-56190b8e32b9">쿼리(채팅)</a></li>
</ol>
<p>Langfuse에서 추적:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://static.langfuse.com/llamaindex-langfuse-docs.gif" alt="Langfuse Traces" class="doc-image" id="langfuse-traces" />
   </span> <span class="img-wrapper"> <span>Langfuse 추적</span> </span></p>
<h2 id="Interested-in-more-advanced-features" class="common-anchor-header">고급 기능에 관심이 있으신가요?<button data-href="#Interested-in-more-advanced-features" class="anchor-icon" translate="no">
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
    </button></h2><p>전체 <a href="https://langfuse.com/docs/integrations/llama-index/get-started">통합 문서를</a> 참조하여 고급 기능 및 사용 방법에 대해 자세히 알아보세요:</p>
<ul>
<li>Langfuse Python SDK 및 기타 통합과의 상호 운용성</li>
<li>트레이스에 사용자 정의 메타데이터 및 속성 추가하기</li>
</ul>
