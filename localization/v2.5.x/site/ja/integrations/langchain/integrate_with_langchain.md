---
id: integrate_with_langchain.md
summary: >-
  このガイドでは、LangChainとmilvusを使ったRAG（Retrieval-Augmented
  Generation）システムの構築方法を紹介します。
title: MilvusとLangChainによる検索拡張生成(RAG)
---
<h1 id="Retrieval-Augmented-Generation-RAG-with-Milvus-and-LangChain" class="common-anchor-header">MilvusとLangChainによる検索拡張生成(RAG)<button data-href="#Retrieval-Augmented-Generation-RAG-with-Milvus-and-LangChain" class="anchor-icon" translate="no">
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
<p>このガイドではLangChainとMilvusを使ったRAG（Retrieval-Augmented Generation）システムの構築方法を説明します。</p>
<p>RAGシステムは検索システムと生成モデルを組み合わせ、与えられたプロンプトに基づいて新しいテキストを生成します。システムはまずMilvusを使ってコーパスから関連文書を検索し、次に生成モデルを使って検索された文書に基づいて新しいテキストを生成する。</p>
<p><a href="https://www.langchain.com/">LangChainは</a>大規模言語モデル（LLM）を利用したアプリケーション開発のためのフレームワークである。<a href="https://milvus.io/">Milvusは</a>世界で最も先進的なオープンソースのベクトルデータベースであり、埋め込み類似検索やAIアプリケーションのために構築されています。</p>
<h2 id="Prerequisites" class="common-anchor-header">前提条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>このノートブックを実行する前に、以下の依存関係がインストールされていることを確認してください：</p>
<pre><code translate="no" class="language-shell">pip install --upgrade --quiet  langchain langchain-core langchain-community langchain-text-splitters langchain-milvus langchain-openai bs4
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Google Colabを使用している場合、インストールしたばかりの依存関係を有効にするには、<strong>ランタイムを再起動する</strong>必要があるかもしれません（画面上部の "Runtime "メニューをクリックし、ドロップダウンメニューから "Restart session "を選択してください）。</p>
</div>
<p>OpenAIのモデルを使います。<a href="https://platform.openai.com/docs/quickstart">api key</a> <code translate="no">OPENAI_API_KEY</code> を環境変数として用意してください。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prepare-the-data" class="common-anchor-header">データの準備<button data-href="#Prepare-the-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Langchain WebBaseLoaderを使ってウェブソースからドキュメントを読み込み、RecursiveCharacterTextSplitterを使ってチャンクに分割する。</p>
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
<p>見ての通り、ドキュメントは既にチャンクに分割されています。そして、データの内容はAIエージェントに関するものである。</p>
<h2 id="Build-RAG-chain-with-Milvus-Vector-Store" class="common-anchor-header">Milvusベクターストアを使ったRAGチェーンの構築<button data-href="#Build-RAG-chain-with-Milvus-Vector-Store" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusベクターストアをドキュメントで初期化し、Milvusベクターストアにドキュメントをロードし、その下にインデックスを構築する。</p>
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
<p><code translate="no">connection_args</code> ：</p>
<ul>
<li><code translate="no">./milvus.db</code> のように<code translate="no">uri</code> をローカルファイルとして設定する方法は、<a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite を</a>自動的に利用してすべてのデータをこのファイルに格納するため、最も便利な方法です。</li>
<li>データ規模が大きい場合は、<a href="https://milvus.io/docs/quickstart.md">dockerやkubernetes</a>上に、よりパフォーマンスの高いMilvusサーバを構築することができます。このセットアップでは、サーバの uri、例えば<code translate="no">http://localhost:19530</code> を<code translate="no">uri</code> として使用してください。</li>
<li>Milvusのフルマネージドクラウドサービスである<a href="https://zilliz.com/cloud">Zilliz Cloudを</a>利用する場合は、Zilliz Cloudの<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public EndpointとApi keyに</a>対応する<code translate="no">uri</code> と<code translate="no">token</code> を調整してください。</li>
</ul>
</div>
<p>Milvusベクトルストアのドキュメントをテストクエリの質問を使って検索します。トップ1のドキュメントを見てみましょう。</p>
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
<p>LCEL(LangChain Expression Language)を使ってRAGチェーンを構築する。</p>
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
<p>おめでとうございます！MilvusとLangChainを使った基本的なRAGチェーンが構築できました。</p>
<h2 id="Metadata-filtering" class="common-anchor-header">メタデータのフィルタリング<button data-href="#Metadata-filtering" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://milvus.io/docs/boolean.md">Milvusのスカラフィルタリングルールを使って</a>、メタデータに基づいてドキュメントをフィルタリングすることができます。つの異なるソースからドキュメントをロードし、メタデータ<code translate="no">source</code> によってドキュメントをフィルタリングすることができます。</p>
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
<p>チェーンを再構築することなく検索パラメータを動的に変更したい場合は、<a href="https://python.langchain.com/v0.2/docs/how_to/configure/">ランタイムチェーン内部を設定します</a>。このdynamically configureを使って新しいretrieverを定義し、それを使って新しいRAGチェーンを構築してみよう。</p>
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
<p>この動的に設定可能なRAGチェーンを、フィルター条件を変えて試してみよう。</p>
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
<p>検索条件を変更し、2つ目のソースによってドキュメントをフィルタリングすると、このブログソースのコンテンツはクエリの質問とは無関係であるため、関連する情報のない回答が得られます。</p>
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
<p>このチュートリアルでは、Milvus LangChain統合の基本的な使い方とシンプルなRAGアプローチに焦点を当てています。より高度なRAGテクニックについては、<a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/advanced_rag">advanced rag bootcampを</a>参照してください。</p>
