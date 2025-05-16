---
id: integrate_with_langchain.md
summary: 이 가이드는 LangChain과 Milvus를 사용하여 검색 증강 세대(RAG) 시스템을 구축하는 방법을 설명합니다.
title: Milvus와 LangChain을 사용한 검색 증강 생성(RAG)
---
<h1 id="Retrieval-Augmented-Generation-RAG-with-Milvus-and-LangChain" class="common-anchor-header">Milvus와 LangChain을 사용한 검색 증강 생성(RAG)<button data-href="#Retrieval-Augmented-Generation-RAG-with-Milvus-and-LangChain" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/langchain/rag_with_milvus_and_langchain.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>   <a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/langchain/rag_with_milvus_and_langchain.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p>이 가이드는 LangChain과 Milvus를 사용하여 검색 증강 생성(RAG) 시스템을 구축하는 방법을 설명합니다.</p>
<p>RAG 시스템은 검색 시스템과 생성 모델을 결합하여 주어진 프롬프트에 따라 새로운 텍스트를 생성합니다. 시스템은 먼저 Milvus를 사용하여 말뭉치에서 관련 문서를 검색한 다음, 생성 모델을 사용하여 검색된 문서를 기반으로 새로운 텍스트를 생성합니다.</p>
<p><a href="https://www.langchain.com/">LangChain은</a> 대규모 언어 모델(LLM)로 구동되는 애플리케이션을 개발하기 위한 프레임워크입니다. <a href="https://milvus.io/">Milvus는</a> 세계에서 가장 진보된 오픈 소스 벡터 데이터베이스로, 임베딩 유사도 검색 및 AI 애플리케이션을 강화하기 위해 구축되었습니다.</p>
<h2 id="Prerequisites" class="common-anchor-header">전제 조건<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>이 노트북을 실행하기 전에 다음 종속성이 설치되어 있는지 확인하세요:</p>
<pre><code translate="no" class="language-shell">pip install --upgrade --quiet  langchain langchain-core langchain-community langchain-text-splitters langchain-milvus langchain-openai bs4
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Google Colab을 사용하는 경우 방금 설치한 종속성을 사용하려면 <strong>런타임을 다시 시작해야</strong> 할 수 있습니다(화면 상단의 '런타임' 메뉴를 클릭하고 드롭다운 메뉴에서 '세션 다시 시작'을 선택).</p>
</div>
<p>OpenAI의 모델을 사용합니다. 환경 변수로 <code translate="no">OPENAI_API_KEY</code> <a href="https://platform.openai.com/docs/quickstart">API 키를</a> 준비해야 합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prepare-the-data" class="common-anchor-header">데이터 준비<button data-href="#Prepare-the-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Langchain WebBaseLoader를 사용해 웹 소스에서 문서를 로드하고 RecursiveCharacterTextSplitter를 사용해 청크로 분할합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> bs4
<span class="hljs-keyword">from</span> langchain_community.document_loaders <span class="hljs-keyword">import</span> WebBaseLoader
<span class="hljs-keyword">from</span> langchain_text_splitters <span class="hljs-keyword">import</span> RecursiveCharacterTextSplitter

<span class="hljs-comment"># Create a WebBaseLoader instance to load documents from web sources</span>
loader = WebBaseLoader(
    web_paths=(
        <span class="hljs-string">&quot;https://lilianweng.github.io/posts/2023-06-23-agent/&quot;</span>,
        <span class="hljs-string">&quot;https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/&quot;</span>,
    ),
    bs_kwargs=<span class="hljs-built_in">dict</span>(
        parse_only=bs4.SoupStrainer(
            class_=(<span class="hljs-string">&quot;post-content&quot;</span>, <span class="hljs-string">&quot;post-title&quot;</span>, <span class="hljs-string">&quot;post-header&quot;</span>)
        )
    ),
)
<span class="hljs-comment"># Load documents from web sources using the loader</span>
documents = loader.load()
<span class="hljs-comment"># Initialize a RecursiveCharacterTextSplitter for splitting text into chunks</span>
text_splitter = RecursiveCharacterTextSplitter(chunk_size=<span class="hljs-number">2000</span>, chunk_overlap=<span class="hljs-number">200</span>)

<span class="hljs-comment"># Split the documents into chunks using the text_splitter</span>
docs = text_splitter.split_documents(documents)

<span class="hljs-comment"># Let&#x27;s take a look at the first document</span>
docs[<span class="hljs-number">1</span>]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Document(page_content='Fig. 1. Overview of a LLM-powered autonomous agent system.\nComponent One: Planning#\nA complicated task usually involves many steps. An agent needs to know what they are and plan ahead.\nTask Decomposition#\nChain of thought (CoT; Wei et al. 2022) has become a standard prompting technique for enhancing model performance on complex tasks. The model is instructed to “think step by step” to utilize more test-time computation to decompose hard tasks into smaller and simpler steps. CoT transforms big tasks into multiple manageable tasks and shed lights into an interpretation of the model’s thinking process.\nTree of Thoughts (Yao et al. 2023) extends CoT by exploring multiple reasoning possibilities at each step. It first decomposes the problem into multiple thought steps and generates multiple thoughts per step, creating a tree structure. The search process can be BFS (breadth-first search) or DFS (depth-first search) with each state evaluated by a classifier (via a prompt) or majority vote.\nTask decomposition can be done (1) by LLM with simple prompting like &quot;Steps for XYZ.\\n1.&quot;, &quot;What are the subgoals for achieving XYZ?&quot;, (2) by using task-specific instructions; e.g. &quot;Write a story outline.&quot; for writing a novel, or (3) with human inputs.\nAnother quite distinct approach, LLM+P (Liu et al. 2023), involves relying on an external classical planner to do long-horizon planning. This approach utilizes the Planning Domain Definition Language (PDDL) as an intermediate interface to describe the planning problem. In this process, LLM (1) translates the problem into “Problem PDDL”, then (2) requests a classical planner to generate a PDDL plan based on an existing “Domain PDDL”, and finally (3) translates the PDDL plan back into natural language. Essentially, the planning step is outsourced to an external tool, assuming the availability of domain-specific PDDL and a suitable planner which is common in certain robotic setups but not in many other domains.\nSelf-Reflection#', metadata={'source': 'https://lilianweng.github.io/posts/2023-06-23-agent/'})
</code></pre>
<p>보시다시피, 문서는 이미 청크로 분할되어 있습니다. 그리고 데이터의 내용은 AI 에이전트에 관한 내용입니다.</p>
<h2 id="Build-RAG-chain-with-Milvus-Vector-Store" class="common-anchor-header">Milvus 벡터 스토어로 RAG 체인 구축하기<button data-href="#Build-RAG-chain-with-Milvus-Vector-Store" class="anchor-icon" translate="no">
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
    </button></h2><p>문서로 Milvus 벡터 스토어를 초기화하여 Milvus 벡터 스토어에 문서를 로드하고 내부적으로 인덱스를 구축하겠습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_milvus <span class="hljs-keyword">import</span> Milvus
<span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> OpenAIEmbeddings

embeddings = OpenAIEmbeddings()

vectorstore = Milvus.from_documents(
    documents=docs,
    embedding=embeddings,
    connection_args={
        <span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;./milvus_demo.db&quot;</span>,
    },
    drop_old=<span class="hljs-literal">False</span>,  <span class="hljs-comment"># Drop the old Milvus collection if it exists</span>
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">connection_args</code>:</p>
<ul>
<li><code translate="no">uri</code> 을 로컬 파일(예:<code translate="no">./milvus.db</code>)로 설정하는 것이 가장 편리한 방법인데, 이 파일에 모든 데이터를 저장하기 위해 <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite를</a> 자동으로 활용하기 때문입니다.</li>
<li>데이터 규모가 큰 경우, <a href="https://milvus.io/docs/quickstart.md">도커나 쿠버네티스에</a> 더 성능이 좋은 Milvus 서버를 설정할 수 있습니다. 이 설정에서는 서버 URL(예:<code translate="no">http://localhost:19530</code>)을 <code translate="no">uri</code> 으로 사용하세요.</li>
<li>밀버스의 완전 관리형 클라우드 서비스인 <a href="https://zilliz.com/cloud">질리즈 클라우드를</a> 사용하려면, 질리즈 클라우드의 <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">퍼블릭 엔드포인트와 API 키에</a> 해당하는 <code translate="no">uri</code> 와 <code translate="no">token</code> 을 조정해 주세요.</li>
</ul>
</div>
<p>테스트 쿼리 문제를 사용하여 Milvus 벡터 스토어에서 문서를 검색합니다. 상위 1개 문서를 살펴보겠습니다.</p>
<pre><code translate="no" class="language-python">query = <span class="hljs-string">&quot;What is self-reflection of an AI Agent?&quot;</span>
vectorstore.similarity_search(query, k=<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[Document(page_content='Self-Reflection#\nSelf-reflection is a vital aspect that allows autonomous agents to improve iteratively by refining past action decisions and correcting previous mistakes. It plays a crucial role in real-world tasks where trial and error are inevitable.\nReAct (Yao et al. 2023) integrates reasoning and acting within LLM by extending the action space to be a combination of task-specific discrete actions and the language space. The former enables LLM to interact with the environment (e.g. use Wikipedia search API), while the latter prompting LLM to generate reasoning traces in natural language.\nThe ReAct prompt template incorporates explicit steps for LLM to think, roughly formatted as:\nThought: ...\nAction: ...\nObservation: ...\n... (Repeated many times)', metadata={'source': 'https://lilianweng.github.io/posts/2023-06-23-agent/', 'pk': 449281835035555859})]
</code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_core.runnables <span class="hljs-keyword">import</span> RunnablePassthrough
<span class="hljs-keyword">from</span> langchain_core.prompts <span class="hljs-keyword">import</span> PromptTemplate
<span class="hljs-keyword">from</span> langchain_core.output_parsers <span class="hljs-keyword">import</span> StrOutputParser
<span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> ChatOpenAI

<span class="hljs-comment"># Initialize the OpenAI language model for response generation</span>
llm = ChatOpenAI(model_name=<span class="hljs-string">&quot;gpt-3.5-turbo&quot;</span>, temperature=<span class="hljs-number">0</span>)

<span class="hljs-comment"># Define the prompt template for generating AI responses</span>
PROMPT_TEMPLATE = <span class="hljs-string">&quot;&quot;&quot;
Human: You are an AI assistant, and provides answers to questions by using fact based and statistical information when possible.
Use the following pieces of information to provide a concise answer to the question enclosed in &lt;question&gt; tags.
If you don&#x27;t know the answer, just say that you don&#x27;t know, don&#x27;t try to make up an answer.
&lt;context&gt;
{context}
&lt;/context&gt;

&lt;question&gt;
{question}
&lt;/question&gt;

The response should be specific and use statistics or numbers when possible.

Assistant:&quot;&quot;&quot;</span>

<span class="hljs-comment"># Create a PromptTemplate instance with the defined template and input variables</span>
prompt = PromptTemplate(
    template=PROMPT_TEMPLATE, input_variables=[<span class="hljs-string">&quot;context&quot;</span>, <span class="hljs-string">&quot;question&quot;</span>]
)
<span class="hljs-comment"># Convert the vector store to a retriever</span>
retriever = vectorstore.as_retriever()


<span class="hljs-comment"># Define a function to format the retrieved documents</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">format_docs</span>(<span class="hljs-params">docs</span>):
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;\n\n&quot;</span>.join(doc.page_content <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> docs)
<button class="copy-code-btn"></button></code></pre>
<p>LCEL(LangChain 표현 언어)을 사용하여 RAG 체인을 구축합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define the RAG (Retrieval-Augmented Generation) chain for AI response generation</span>
rag_chain = (
    {<span class="hljs-string">&quot;context&quot;</span>: retriever | format_docs, <span class="hljs-string">&quot;question&quot;</span>: RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

<span class="hljs-comment"># rag_chain.get_graph().print_ascii()</span>

<span class="hljs-comment"># Invoke the RAG chain with a specific question and retrieve the response</span>
res = rag_chain.invoke(query)
res
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">&quot;Self-reflection of an AI agent involves the process of synthesizing memories into higher-level inferences over time to guide the agent's future behavior. It serves as a mechanism to create higher-level summaries of past events. One approach to self-reflection involves prompting the language model with the 100 most recent observations and asking it to generate the 3 most salient high-level questions based on those observations. This process helps the AI agent optimize believability in the current moment and over time.&quot;
</code></pre>
<p>축하합니다! 여러분은 Milvus와 LangChain으로 구동되는 기본 RAG 체인을 구축했습니다.</p>
<h2 id="Metadata-filtering" class="common-anchor-header">메타데이터 필터링<button data-href="#Metadata-filtering" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://milvus.io/docs/boolean.md">Milvus 스칼라 필터링 규칙을</a> 사용하여 메타데이터를 기반으로 문서를 필터링할 수 있습니다. 두 개의 다른 소스에서 문서를 로드했으며, 메타데이터 <code translate="no">source</code> 를 기준으로 문서를 필터링할 수 있습니다.</p>
<pre><code translate="no" class="language-python">vectorstore.similarity_search(
    <span class="hljs-string">&quot;What is CoT?&quot;</span>,
    k=<span class="hljs-number">1</span>,
    expr=<span class="hljs-string">&quot;source == &#x27;https://lilianweng.github.io/posts/2023-06-23-agent/&#x27;&quot;</span>,
)

<span class="hljs-comment"># The same as:</span>
<span class="hljs-comment"># vectorstore.as_retriever(search_kwargs=dict(</span>
<span class="hljs-comment">#     k=1,</span>
<span class="hljs-comment">#     expr=&quot;source == &#x27;https://lilianweng.github.io/posts/2023-06-23-agent/&#x27;&quot;,</span>
<span class="hljs-comment"># )).invoke(&quot;What is CoT?&quot;)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[Document(page_content='Fig. 1. Overview of a LLM-powered autonomous agent system.\nComponent One: Planning#\nA complicated task usually involves many steps. An agent needs to know what they are and plan ahead.\nTask Decomposition#\nChain of thought (CoT; Wei et al. 2022) has become a standard prompting technique for enhancing model performance on complex tasks. The model is instructed to “think step by step” to utilize more test-time computation to decompose hard tasks into smaller and simpler steps. CoT transforms big tasks into multiple manageable tasks and shed lights into an interpretation of the model’s thinking process.\nTree of Thoughts (Yao et al. 2023) extends CoT by exploring multiple reasoning possibilities at each step. It first decomposes the problem into multiple thought steps and generates multiple thoughts per step, creating a tree structure. The search process can be BFS (breadth-first search) or DFS (depth-first search) with each state evaluated by a classifier (via a prompt) or majority vote.\nTask decomposition can be done (1) by LLM with simple prompting like &quot;Steps for XYZ.\\n1.&quot;, &quot;What are the subgoals for achieving XYZ?&quot;, (2) by using task-specific instructions; e.g. &quot;Write a story outline.&quot; for writing a novel, or (3) with human inputs.\nAnother quite distinct approach, LLM+P (Liu et al. 2023), involves relying on an external classical planner to do long-horizon planning. This approach utilizes the Planning Domain Definition Language (PDDL) as an intermediate interface to describe the planning problem. In this process, LLM (1) translates the problem into “Problem PDDL”, then (2) requests a classical planner to generate a PDDL plan based on an existing “Domain PDDL”, and finally (3) translates the PDDL plan back into natural language. Essentially, the planning step is outsourced to an external tool, assuming the availability of domain-specific PDDL and a suitable planner which is common in certain robotic setups but not in many other domains.\nSelf-Reflection#', metadata={'source': 'https://lilianweng.github.io/posts/2023-06-23-agent/', 'pk': 449281835035555858})]
</code></pre>
<p>체인을 다시 빌드하지 않고 검색 매개변수를 동적으로 변경하려면 <a href="https://python.langchain.com/v0.2/docs/how_to/configure/">런타임 체인 내부를 구성하면</a> 됩니다. 이 동적 구성으로 새 리트리버를 정의하고 이를 사용해 새 RAG 체인을 구축해 보겠습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_core.runnables <span class="hljs-keyword">import</span> ConfigurableField

<span class="hljs-comment"># Define a new retriever with a configurable field for search_kwargs</span>
retriever2 = vectorstore.as_retriever().configurable_fields(
    search_kwargs=ConfigurableField(
        <span class="hljs-built_in">id</span>=<span class="hljs-string">&quot;retriever_search_kwargs&quot;</span>,
    )
)

<span class="hljs-comment"># Invoke the retriever with a specific search_kwargs which filter the documents by source</span>
retriever2.with_config(
    configurable={
        <span class="hljs-string">&quot;retriever_search_kwargs&quot;</span>: <span class="hljs-built_in">dict</span>(
            expr=<span class="hljs-string">&quot;source == &#x27;https://lilianweng.github.io/posts/2023-06-23-agent/&#x27;&quot;</span>,
            k=<span class="hljs-number">1</span>,
        )
    }
).invoke(query)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[Document(page_content='Self-Reflection#\nSelf-reflection is a vital aspect that allows autonomous agents to improve iteratively by refining past action decisions and correcting previous mistakes. It plays a crucial role in real-world tasks where trial and error are inevitable.\nReAct (Yao et al. 2023) integrates reasoning and acting within LLM by extending the action space to be a combination of task-specific discrete actions and the language space. The former enables LLM to interact with the environment (e.g. use Wikipedia search API), while the latter prompting LLM to generate reasoning traces in natural language.\nThe ReAct prompt template incorporates explicit steps for LLM to think, roughly formatted as:\nThought: ...\nAction: ...\nObservation: ...\n... (Repeated many times)', metadata={'source': 'https://lilianweng.github.io/posts/2023-06-23-agent/', 'pk': 449281835035555859})]
</code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define a new RAG chain with this dynamically configurable retriever</span>
rag_chain2 = (
    {<span class="hljs-string">&quot;context&quot;</span>: retriever2 | format_docs, <span class="hljs-string">&quot;question&quot;</span>: RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)
<button class="copy-code-btn"></button></code></pre>
<p>이 동적 구성이 가능한 RAG 체인을 다양한 필터 조건으로 사용해 보겠습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Invoke this RAG chain with a specific question and config</span>
rag_chain2.with_config(
    configurable={
        <span class="hljs-string">&quot;retriever_search_kwargs&quot;</span>: <span class="hljs-built_in">dict</span>(
            expr=<span class="hljs-string">&quot;source == &#x27;https://lilianweng.github.io/posts/2023-06-23-agent/&#x27;&quot;</span>,
        )
    }
).invoke(query)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">&quot;Self-reflection of an AI agent involves the process of synthesizing memories into higher-level inferences over time to guide the agent's future behavior. It serves as a mechanism to create higher-level summaries of past events. One approach to self-reflection involves prompting the language model with the 100 most recent observations and asking it to generate the 3 most salient high-level questions based on those observations. This process helps the AI agent optimize believability in the current moment and over time.&quot;
</code></pre>
<p>두 번째 소스로 문서를 필터링하도록 검색 조건을 변경하면 이 블로그 소스의 콘텐츠가 쿼리 질문과 관련이 없으므로 관련 정보가 없는 답변이 표시됩니다.</p>
<pre><code translate="no" class="language-python">rag_chain2.with_config(
    configurable={
        <span class="hljs-string">&quot;retriever_search_kwargs&quot;</span>: <span class="hljs-built_in">dict</span>(
            expr=<span class="hljs-string">&quot;source == &#x27;https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/&#x27;&quot;</span>,
        )
    }
).invoke(query)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">&quot;I'm sorry, but based on the provided context, there is no specific information or statistical data available regarding the self-reflection of an AI agent.&quot;
</code></pre>
<hr>
<p>이 튜토리얼에서는 밀버스 랭체인 연동과 간단한 RAG 접근 방식의 기본 사용법을 중점적으로 다룹니다. 보다 고급 RAG 기술에 대해서는 <a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/advanced_rag">고급 RAG 부트캠프를</a> 참조하시기 바랍니다.</p>
