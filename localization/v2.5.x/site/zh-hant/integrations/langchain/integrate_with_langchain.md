---
id: integrate_with_langchain.md
summary: 本指南示範如何使用 LangChain 和 Milvus 建立一個 Retrieval-Augmented Generation (RAG) 系統。
title: 使用 Milvus 和 LangChain 的檢索-增強世代 (RAG)
---
<h1 id="Retrieval-Augmented-Generation-RAG-with-Milvus-and-LangChain" class="common-anchor-header">使用 Milvus 和 LangChain 的檢索-增強世代 (RAG)<button data-href="#Retrieval-Augmented-Generation-RAG-with-Milvus-and-LangChain" class="anchor-icon" translate="no">
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
<p>本指南展示了如何使用 LangChain 和 Milvus 建立一個檢索-增強生成 (RAG) 系統。</p>
<p>RAG 系統結合了檢索系統與生成模型，可根據給定的提示產生新的文字。該系統首先使用 Milvus 從語料庫中檢索相關文件，然後根據檢索到的文件使用生成模型生成新文本。</p>
<p><a href="https://www.langchain.com/">LangChain</a>是一個由大型語言模型 (LLM) 驅動的應用程式開發框架。<a href="https://milvus.io/">Milvus</a>是世界上最先進的開放源碼向量資料庫，用於嵌入相似性搜尋和人工智能應用程式。</p>
<h2 id="Prerequisites" class="common-anchor-header">先決條件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>執行本筆記本之前，請確定您已安裝下列相依性：</p>
<pre><code translate="no" class="language-shell">pip install --upgrade --quiet  langchain langchain-core langchain-community langchain-text-splitters langchain-milvus langchain-openai bs4
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>如果您使用的是 Google Colab，為了啟用剛安裝的相依性，您可能需要<strong>重新啟動執行時</strong>（點選畫面頂端的「Runtime」功能表，並從下拉式功能表中選擇「Restart session」）。</p>
</div>
<p>我們將使用 OpenAI 的模型。您應該準備<a href="https://platform.openai.com/docs/quickstart">api key</a> <code translate="no">OPENAI_API_KEY</code> 作為環境變數。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prepare-the-data" class="common-anchor-header">準備資料<button data-href="#Prepare-the-data" class="anchor-icon" translate="no">
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
    </button></h2><p>我們使用 Langchain WebBaseLoader 從網頁來源載入文件，並使用 RecursiveCharacterTextSplitter 將文件分割成小塊。</p>
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
<p>我們可以看到，文件已經被分割成幾個區塊。而資料的內容是關於 AI 代理的。</p>
<h2 id="Build-RAG-chain-with-Milvus-Vector-Store" class="common-anchor-header">使用 Milvus 向量儲存建立 RAG 鏈<button data-href="#Build-RAG-chain-with-Milvus-Vector-Store" class="anchor-icon" translate="no">
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
    </button></h2><p>我們將以文件初始化一個 Milvus 向量儲存庫，將文件載入 Milvus 向量儲存庫，並在引擎蓋下建立索引。</p>
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
<p>對於<code translate="no">connection_args</code> ：</p>
<ul>
<li>將<code translate="no">uri</code> 設定為本機檔案，例如<code translate="no">./milvus.db</code> ，是最方便的方法，因為它會自動利用<a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>將所有資料儲存在這個檔案中。</li>
<li>如果您有大規模的資料，您可以在<a href="https://milvus.io/docs/quickstart.md">docker 或 kubernetes</a> 上架設效能更高的 Milvus 伺服器。在此設定中，請使用伺服器的 uri，例如<code translate="no">http://localhost:19530</code> ，作為您的<code translate="no">uri</code> 。</li>
<li>如果您想使用<a href="https://zilliz.com/cloud">Zilliz Cloud</a>，Milvus 的完全管理<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">雲端</a>服務，請調整<code translate="no">uri</code> 和<code translate="no">token</code> ，對應 Zilliz Cloud 的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint 和 Api key</a>。</li>
</ul>
</div>
<p>使用測試查詢問題搜尋 Milvus 向量商店中的文件。讓我們來看看最頂端的 1 個文件。</p>
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
<p>使用 LCEL(LangChain Expression Language) 建立 RAG 鏈。</p>
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
<p>恭喜您！您已經建立了一個由 Milvus 和 LangChain 驅動的基本 RAG 鏈。</p>
<h2 id="Metadata-filtering" class="common-anchor-header">元資料過濾<button data-href="#Metadata-filtering" class="anchor-icon" translate="no">
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
    </button></h2><p>我們可以使用<a href="https://milvus.io/docs/boolean.md">Milvus Scalar 過濾規則</a>來根據 metadata 過濾文件。我們從兩個不同的來源載入了文件，我們可以根據元資料來過濾文件<code translate="no">source</code> 。</p>
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
<p>如果我們想要動態地變更搜尋參數，而不需要重建鏈，我們可以<a href="https://python.langchain.com/v0.2/docs/how_to/configure/">設定 runtime chain internals</a>。讓我們用這個動態配置定義一個新的 retriever，然後用它來建立一個新的 RAG 鏈。</p>
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
<p>讓我們用不同的篩選條件試試這個動態配置的 RAG 鏈。</p>
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
<p>當我們改變搜尋條件，以第二個來源過濾文件時，由於這個部落格來源的內容與查詢問題毫無關係，因此我們得到一個沒有相關資訊的答案。</p>
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
<p>本教學著重於 Milvus LangChain 整合的基本用法和簡單的 RAG 方法。如需更進階的 RAG 技術，請參考<a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/advanced_rag">進階 RAG Bootcamp</a>。</p>
