---
id: evaluation_with_deepeval.md
summary: >-
  このガイドでは、DeepEvalを使用して、Milvusに基づいて構築されたRAG（Retrieval-Augmented
  Generation）パイプラインを評価する方法を示します。
title: DeepEvalによる評価
---
<h1 id="Evaluation-with-DeepEval" class="common-anchor-header">DeepEvalによる評価<button data-href="#Evaluation-with-DeepEval" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/evaluation_with_deepeval.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/evaluation_with_deepeval.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p>このガイドでは、<a href="https://milvus.io/">Milvusを</a>ベースに構築されたRAG（Retrieval-Augmented Generation）パイプラインを評価するために<a href="https://docs.confident-ai.com/">DeepEvalを</a>使用する方法を示します。</p>
<p>RAGシステムは、検索システムと生成モデルを組み合わせて、与えられたプロンプトに基づいて新しいテキストを生成します。このシステムは、まずMilvusを使用してコーパスから関連文書を検索し、次に生成モデルを使用して検索された文書に基づいて新しいテキストを生成する。</p>
<p>DeepEvalは、RAGパイプラインの評価を支援するフレームワークである。このようなパイプラインの構築を支援する既存のツールやフレームワークはありますが、パイプラインを評価し、パイプラインのパフォーマンスを定量化することは困難です。そこでDeepEvalの出番です。</p>
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
<pre><code translate="no" class="language-python">$ pip install --upgrade pymilvus milvus-lite openai requests tqdm pandas deepeval
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Google Colabを使用している場合、インストールしたばかりの依存関係を有効にするには、<strong>ランタイムを再起動</strong>する必要があるかもしれません（画面上部の "Runtime "メニューをクリックし、ドロップダウンメニューから "Restart session "を選択してください）。</p>
</div>
<p>この例では、LLMとしてOpenAIを使います。<a href="https://platform.openai.com/docs/quickstart">api key</a> <code translate="no">OPENAI_API_KEY</code> を環境変数として用意してください。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-*****************&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Define-the-RAG-pipeline" class="common-anchor-header">RAGパイプラインの定義<button data-href="#Define-the-RAG-pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusをベクトルストアとして、OpenAIをLLMとして使用するRAGクラスを定義します。このクラスには、テキストデータをMilvusにロードする<code translate="no">load</code> メソッド、与えられた質問に最も類似したテキストデータを検索する<code translate="no">retrieve</code> メソッド、検索された知識を用いて与えられた質問に回答する<code translate="no">answer</code> メソッドが含まれます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">List</span>
<span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm
<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient


<span class="hljs-keyword">class</span> <span class="hljs-title class_">RAG</span>:
    <span class="hljs-string">&quot;&quot;&quot;
    RAG(Retrieval-Augmented Generation) class built upon OpenAI and Milvus.
    &quot;&quot;&quot;</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, openai_client: OpenAI, milvus_client: MilvusClient</span>):
        <span class="hljs-variable language_">self</span>._prepare_openai(openai_client)
        <span class="hljs-variable language_">self</span>._prepare_milvus(milvus_client)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">_emb_text</span>(<span class="hljs-params">self, text: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-type">List</span>[<span class="hljs-built_in">float</span>]:
        <span class="hljs-keyword">return</span> (
            <span class="hljs-variable language_">self</span>.openai_client.embeddings.create(<span class="hljs-built_in">input</span>=text, model=<span class="hljs-variable language_">self</span>.embedding_model)
            .data[<span class="hljs-number">0</span>]
            .embedding
        )

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">_prepare_openai</span>(<span class="hljs-params">
        self,
        openai_client: OpenAI,
        embedding_model: <span class="hljs-built_in">str</span> = <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>,
        llm_model: <span class="hljs-built_in">str</span> = <span class="hljs-string">&quot;gpt-4o-mini&quot;</span>,
    </span>):
        <span class="hljs-variable language_">self</span>.openai_client = openai_client
        <span class="hljs-variable language_">self</span>.embedding_model = embedding_model
        <span class="hljs-variable language_">self</span>.llm_model = llm_model
        <span class="hljs-variable language_">self</span>.SYSTEM_PROMPT = <span class="hljs-string">&quot;&quot;&quot;
            Human: You are an AI assistant. You are able to find answers to the questions from the contextual passage snippets provided.
        &quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>.USER_PROMPT = <span class="hljs-string">&quot;&quot;&quot;
            Use the following pieces of information enclosed in &lt;context&gt; tags to provide an answer to the question enclosed in &lt;question&gt; tags.
            &lt;context&gt;
            {context}
            &lt;/context&gt;
            &lt;question&gt;
            {question}
            &lt;/question&gt;
        &quot;&quot;&quot;</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">_prepare_milvus</span>(<span class="hljs-params">
        self, milvus_client: MilvusClient, collection_name: <span class="hljs-built_in">str</span> = <span class="hljs-string">&quot;rag_collection&quot;</span>
    </span>):
        <span class="hljs-variable language_">self</span>.milvus_client = milvus_client
        <span class="hljs-variable language_">self</span>.collection_name = collection_name
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.milvus_client.has_collection(<span class="hljs-variable language_">self</span>.collection_name):
            <span class="hljs-variable language_">self</span>.milvus_client.drop_collection(<span class="hljs-variable language_">self</span>.collection_name)
        embedding_dim = <span class="hljs-built_in">len</span>(<span class="hljs-variable language_">self</span>._emb_text(<span class="hljs-string">&quot;demo&quot;</span>))
        <span class="hljs-variable language_">self</span>.milvus_client.create_collection(
            collection_name=<span class="hljs-variable language_">self</span>.collection_name,
            dimension=embedding_dim,
            metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
            consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
        )

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">load</span>(<span class="hljs-params">self, texts: <span class="hljs-type">List</span>[<span class="hljs-built_in">str</span>]</span>):
        <span class="hljs-string">&quot;&quot;&quot;
        Load the text data into Milvus.
        &quot;&quot;&quot;</span>
        data = []
        <span class="hljs-keyword">for</span> i, line <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(tqdm(texts, desc=<span class="hljs-string">&quot;Creating embeddings&quot;</span>)):
            data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: <span class="hljs-variable language_">self</span>._emb_text(line), <span class="hljs-string">&quot;text&quot;</span>: line})
        <span class="hljs-variable language_">self</span>.milvus_client.insert(collection_name=<span class="hljs-variable language_">self</span>.collection_name, data=data)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">retrieve</span>(<span class="hljs-params">self, question: <span class="hljs-built_in">str</span>, top_k: <span class="hljs-built_in">int</span> = <span class="hljs-number">3</span></span>) -&gt; <span class="hljs-type">List</span>[<span class="hljs-built_in">str</span>]:
        <span class="hljs-string">&quot;&quot;&quot;
        Retrieve the most similar text data to the given question.
        &quot;&quot;&quot;</span>
        search_res = <span class="hljs-variable language_">self</span>.milvus_client.search(
            collection_name=<span class="hljs-variable language_">self</span>.collection_name,
            data=[<span class="hljs-variable language_">self</span>._emb_text(question)],
            limit=top_k,
            search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}},  <span class="hljs-comment"># inner product distance</span>
            output_fields=[<span class="hljs-string">&quot;text&quot;</span>],  <span class="hljs-comment"># Return the text field</span>
        )
        retrieved_texts = [res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>] <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> search_res[<span class="hljs-number">0</span>]]
        <span class="hljs-keyword">return</span> retrieved_texts[:top_k]

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">answer</span>(<span class="hljs-params">
        self,
        question: <span class="hljs-built_in">str</span>,
        retrieval_top_k: <span class="hljs-built_in">int</span> = <span class="hljs-number">3</span>,
        return_retrieved_text: <span class="hljs-built_in">bool</span> = <span class="hljs-literal">False</span>,
    </span>):
        <span class="hljs-string">&quot;&quot;&quot;
        Answer the given question with the retrieved knowledge.
        &quot;&quot;&quot;</span>
        retrieved_texts = <span class="hljs-variable language_">self</span>.retrieve(question, top_k=retrieval_top_k)
        user_prompt = <span class="hljs-variable language_">self</span>.USER_PROMPT.<span class="hljs-built_in">format</span>(
            context=<span class="hljs-string">&quot;\n&quot;</span>.join(retrieved_texts), question=question
        )
        response = <span class="hljs-variable language_">self</span>.openai_client.chat.completions.create(
            model=<span class="hljs-variable language_">self</span>.llm_model,
            messages=[
                {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-variable language_">self</span>.SYSTEM_PROMPT},
                {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: user_prompt},
            ],
        )
        <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> return_retrieved_text:
            <span class="hljs-keyword">return</span> response.choices[<span class="hljs-number">0</span>].message.content
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">return</span> response.choices[<span class="hljs-number">0</span>].message.content, retrieved_texts
<button class="copy-code-btn"></button></code></pre>
<p>RAGクラスをOpenAIとMilvusクライアントで初期化してみよう。</p>
<pre><code translate="no" class="language-python">openai_client = OpenAI()
milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)

my_rag = RAG(openai_client=openai_client, milvus_client=milvus_client)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">MilvusClient</code> の引数については以下の通り：</p>
<ul>
<li><code translate="no">uri</code> の引数をローカルファイル、例えば<code translate="no">./milvus.db</code> に設定するのが最も便利である。</li>
<li>データ規模が大きい場合は、<a href="https://milvus.io/docs/quickstart.md">dockerやkubernetes</a>上に、よりパフォーマンスの高いMilvusサーバを構築することができます。このセットアップでは、サーバの uri、例えば<code translate="no">http://localhost:19530</code> を<code translate="no">uri</code> として使用してください。</li>
<li>Milvusのフルマネージドクラウドサービスである<a href="https://zilliz.com/cloud">Zilliz Cloudを</a>使用する場合は、Zilliz Cloudの<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public EndpointとApi keyに</a>対応する<code translate="no">uri</code> と<code translate="no">token</code> を調整してください。</li>
</ul>
</div>
<h2 id="Run-the-RAG-pipeline-and-get-results" class="common-anchor-header">RAGパイプラインの実行と結果の取得<button data-href="#Run-the-RAG-pipeline-and-get-results" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/milvus-io/milvus/blob/master/DEVELOPMENT.md">Milvusの開発ガイドを</a>RAGのプライベートナレッジとして使用します。</p>
<p>ダウンロードし、RAGパイプラインにロードする。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> urllib.request
<span class="hljs-keyword">import</span> os

url = <span class="hljs-string">&quot;https://raw.githubusercontent.com/milvus-io/milvus/master/DEVELOPMENT.md&quot;</span>
file_path = <span class="hljs-string">&quot;./Milvus_DEVELOPMENT.md&quot;</span>

<span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> os.path.exists(file_path):
    urllib.request.urlretrieve(url, file_path)
<span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
    file_text = file.read()

text_lines = file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
my_rag.load(text_lines)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Creating embeddings: 100%|██████████| 47/47 [00:20&lt;00:00,  2.26it/s]
</code></pre>
<p>開発ガイドのドキュメントの内容に関するクエリの質問を定義します。そして、<code translate="no">answer</code> メソッドを使用して、答えと取得したコンテキストテキストを取得します。</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;what is the hardware requirements specification if I want to build Milvus and run from source code?&quot;</span>
my_rag.answer(question, return_retrieved_text=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">('The hardware requirements specification to build and run Milvus from source code is as follows:\n\n- 8GB of RAM\n- 50GB of free disk space',
 ['Hardware Requirements\n\nThe following specification (either physical or virtual machine resources) is recommended for Milvus to build and run from source code.\n\n```\n- 8GB of RAM\n- 50GB of free disk space\n```\n\n##',
  'Building Milvus on a local OS/shell environment\n\nThe details below outline the hardware and software requirements for building on Linux and MacOS.\n\n##',
  &quot;Software Requirements\n\nAll Linux distributions are available for Milvus development. However a majority of our contributor worked with Ubuntu or CentOS systems, with a small portion of Mac (both x86_64 and Apple Silicon) contributors. If you would like Milvus to build and run on other distributions, you are more than welcome to file an issue and contribute!\n\nHere's a list of verified OS types where Milvus can successfully build and run:\n\n- Debian/Ubuntu\n- Amazon Linux\n- MacOS (x86_64)\n- MacOS (Apple Silicon)\n\n##&quot;])
</code></pre>
<p>それでは、いくつかの質問とそれに対応するグランドトゥルースの答えを用意しましょう。RAGパイプラインから回答とコンテキストを取得します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datasets <span class="hljs-keyword">import</span> Dataset
<span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd

question_list = [
    <span class="hljs-string">&quot;what is the hardware requirements specification if I want to build Milvus and run from source code?&quot;</span>,
    <span class="hljs-string">&quot;What is the programming language used to write Knowhere?&quot;</span>,
    <span class="hljs-string">&quot;What should be ensured before running code coverage?&quot;</span>,
]
ground_truth_list = [
    <span class="hljs-string">&quot;If you want to build Milvus and run from source code, the recommended hardware requirements specification is:\n\n- 8GB of RAM\n- 50GB of free disk space.&quot;</span>,
    <span class="hljs-string">&quot;The programming language used to write Knowhere is C++.&quot;</span>,
    <span class="hljs-string">&quot;Before running code coverage, you should make sure that your code changes are covered by unit tests.&quot;</span>,
]
contexts_list = []
answer_list = []
<span class="hljs-keyword">for</span> question <span class="hljs-keyword">in</span> tqdm(question_list, desc=<span class="hljs-string">&quot;Answering questions&quot;</span>):
    answer, contexts = my_rag.answer(question, return_retrieved_text=<span class="hljs-literal">True</span>)
    contexts_list.append(contexts)
    answer_list.append(answer)

df = pd.DataFrame(
    {
        <span class="hljs-string">&quot;question&quot;</span>: question_list,
        <span class="hljs-string">&quot;contexts&quot;</span>: contexts_list,
        <span class="hljs-string">&quot;answer&quot;</span>: answer_list,
        <span class="hljs-string">&quot;ground_truth&quot;</span>: ground_truth_list,
    }
)
rag_results = Dataset.from_pandas(df)
df
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">/Users/eureka/miniconda3/envs/zilliz/lib/python3.9/site-packages/tqdm/auto.py:21: TqdmWarning: IProgress not found. Please update jupyter and ipywidgets. See https://ipywidgets.readthedocs.io/en/stable/user_install.html
  from .autonotebook import tqdm as notebook_tqdm
Answering questions: 100%|██████████| 3/3 [00:03&lt;00:00,  1.06s/it]
</code></pre>
<div>
<style scoped>
    .dataframe tbody tr th:only-of-type { vertical-align: middle; }.<pre><code translate="no">.dataframe tbody tr th {
    vertical-align: top;
}

.dataframe thead th {
    text-align: right;
}
</code></pre>
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>質問</th>
      <th>コンテキスト</th>
      <th>答え</th>
      <th>真実</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>ハードウェア要件とは何ですか？</td>
      <td>[Hardware Requirementsn次の仕様がある。</td>
      <td>Milvusをビルドするためのハードウェア要件は何ですか？</td>
      <td>Milvusをビルドし、ソースから実行する場合、...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Milvusをビルドしてソースから実行したいのですが、プログラミング言語は何ですか？</td>
      <td>[Milvusのアルゴリズムライブラリは、CMakeとConan...</td>
      <td>Knowherを記述するために使用されるプログラミング言語...</td>
      <td>Knowherを記述するために使用されるプログラミング言語...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>コードカバレッジを実行する前に確認すべきことは？</td>
      <td>[Code coveragenBefore submitting your pull ...</td>
      <td>コードカバレッジを実行する前に、...</td>
      <td>コードカバレッジを実行する前に、...</td>
    </tr>
  </tbody>
</table>
</div>
<h2 id="Evaluating-Retriever" class="common-anchor-header">レトリバーの評価<button data-href="#Evaluating-Retriever" class="anchor-icon" translate="no">
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
    </button></h2><p>大規模言語モデル（LLM）システムでリトリーバーを評価する場合、以下の点を評価することが重要だ：</p>
<ol>
<li><p><strong>ランキングの妥当性</strong>：リトリーバーが、関連性のないデータよりも関連性のある情報をいかに効果的に優先させるか。</p></li>
<li><p><strong>文脈検索</strong>：入力に基づき、文脈に関連する情報を捕捉し、検索する能力。</p></li>
<li><p><strong>バランス</strong>：テキストチャンクのサイズと検索範囲をいかにうまく管理し、関連性のない情報を最小限に抑えるか。</p></li>
</ol>
<p>これらの要素を組み合わせることで、リトリーバがどのように優先順位を付け、最も有用な情報を取得し、提示しているかを包括的に理解することができます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> deepeval.metrics <span class="hljs-keyword">import</span> (
    ContextualPrecisionMetric,
    ContextualRecallMetric,
    ContextualRelevancyMetric,
)
<span class="hljs-keyword">from</span> deepeval.test_case <span class="hljs-keyword">import</span> LLMTestCase
<span class="hljs-keyword">from</span> deepeval <span class="hljs-keyword">import</span> evaluate

contextual_precision = ContextualPrecisionMetric()
contextual_recall = ContextualRecallMetric()
contextual_relevancy = ContextualRelevancyMetric()

test_cases = []

<span class="hljs-keyword">for</span> index, row <span class="hljs-keyword">in</span> df.iterrows():
    test_case = LLMTestCase(
        <span class="hljs-built_in">input</span>=row[<span class="hljs-string">&quot;question&quot;</span>],
        actual_output=row[<span class="hljs-string">&quot;answer&quot;</span>],
        expected_output=row[<span class="hljs-string">&quot;ground_truth&quot;</span>],
        retrieval_context=row[<span class="hljs-string">&quot;contexts&quot;</span>],
    )
    test_cases.append(test_case)

<span class="hljs-comment"># test_cases</span>
result = evaluate(
    test_cases=test_cases,
    metrics=[contextual_precision, contextual_recall, contextual_relevancy],
    print_results=<span class="hljs-literal">False</span>,  <span class="hljs-comment"># Change to True to see detailed metric results</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">/Users/eureka/miniconda3/envs/zilliz/lib/python3.9/site-packages/deepeval/__init__.py:49: UserWarning: You are using deepeval version 1.1.6, however version 1.2.2 is available. You should consider upgrading via the &quot;pip install --upgrade deepeval&quot; command.
  warnings.warn(
</code></pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace">DeepEvalの最新の<span style="color: #6a00ff; text-decoration-color: #6a00ff">Contextual Precision Metricを</span>実行しています！<span style="color: #374151; text-decoration-color: #374151; font-weight: bold">(</span><span style="color: #374151; text-decoration-color: #374151">gpt-4o、 </span><span style="color: #374151; text-decoration-color: #374151; font-style: italic">strict</span><span style="color: #374151; text-decoration-color: #374151">=False</span><span style="color: #374151; text-decoration-color: #374151">、 </span><span style="color: #374151; text-decoration-color: #374151">async_</span><span style="color: #374151; text-decoration-color: #374151; font-style: italic">mode</span><span style="color: #374151; text-decoration-color: #374151">=True を</span><span style="color: #374151; text-decoration-color: #374151">使用 </span><span style="color: #374151; text-decoration-color: #374151; font-weight: bold">)</span><span style="color: #374151; text-decoration-color: #374151">...</span></pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace">DeepEval の最新の<span style="color: #6a00ff; text-decoration-color: #6a00ff">コンテキスト・リコール測定を</span>実行しています！<span style="color: #374151; text-decoration-color: #374151">(gpt-4o、 </span><span style="color: #374151; text-decoration-color: #374151; font-style: italic">strict</span><span style="color: #374151; text-decoration-color: #374151">=False</span><span style="color: #374151; text-decoration-color: #374151">、 </span><span style="color: #374151; text-decoration-color: #374151">async_mode=</span><span style="color: #374151; text-decoration-color: #374151; font-style: italic">True</span><span style="color: #374151; text-decoration-color: #374151">を</span><span style="color: #374151; text-decoration-color: #374151">使用 </span><span style="color: #374151; text-decoration-color: #374151; font-weight: bold">)</span><span style="color: #374151; text-decoration-color: #374151">...</span></pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace">DeepEval の最新の<span style="color: #6a00ff; text-decoration-color: #6a00ff">Contextual Relevancy Metric を</span>実行しています！<span style="color: #374151; text-decoration-color: #374151">(gpt-4o を使用、 </span><span style="color: #374151; text-decoration-color: #374151">strict=</span><span style="color: #374151; text-decoration-color: #374151; font-style: italic">False</span><span style="color: #374151; text-decoration-color: #374151">、 </span><span style="color: #374151; text-decoration-color: #374151">async_mode=</span><span style="color: #374151; text-decoration-color: #374151; font-style: italic">True</span><span style="color: #374151; text-decoration-color: #374151; font-weight: bold">)</span><span style="color: #374151; text-decoration-color: #374151">...</span></pre>
<pre><code translate="no">Event loop is already running. Applying nest_asyncio patch to allow async execution...


Evaluating 3 test case(s) in parallel: |██████████|100% (3/3) [Time Taken: 00:11,  3.91s/test case]
</code></pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace">テストが終了しました<span style="color: #05f58d; text-decoration-color: #05f58d">！</span>Confident AIで評価結果を見るには、<span style="color: #008000; text-decoration-color: #008000">'deepeval login'</span>を実行してください。 
‼️ 注意：代わりにConfident AI上でdeepevalの全メトリクスの評価を直接実行することもできます。</pre>
<h2 id="Evaluating-Generation" class="common-anchor-header">生成の評価<button data-href="#Evaluating-Generation" class="anchor-icon" translate="no">
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
    </button></h2><p>大規模言語モデル（LLM）で生成された出力の品質を評価するには、2つの重要な側面に注目することが重要です：</p>
<ol>
<li><p><strong>関連性</strong>：プロンプトがLLMを効果的に誘導し、有益で文脈に適した応答を生成するかどうかを評価する。</p></li>
<li><p><strong>忠実性</strong>：モデルが事実上正しく、幻覚や矛盾のない情報を生成することを確認し、出力の正確さを測定する。生成されたコンテンツは、検索コンテキストで提供された事実情報と一致していなければならない。</p></li>
</ol>
<p>これらの要素を組み合わせることで、出力が適切かつ信頼できるものになります。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> deepeval.metrics <span class="hljs-keyword">import</span> AnswerRelevancyMetric, FaithfulnessMetric
<span class="hljs-keyword">from</span> deepeval.test_case <span class="hljs-keyword">import</span> LLMTestCase
<span class="hljs-keyword">from</span> deepeval <span class="hljs-keyword">import</span> evaluate

answer_relevancy = AnswerRelevancyMetric()
faithfulness = FaithfulnessMetric()

test_cases = []

<span class="hljs-keyword">for</span> index, row <span class="hljs-keyword">in</span> df.iterrows():
    test_case = LLMTestCase(
        <span class="hljs-built_in">input</span>=row[<span class="hljs-string">&quot;question&quot;</span>],
        actual_output=row[<span class="hljs-string">&quot;answer&quot;</span>],
        expected_output=row[<span class="hljs-string">&quot;ground_truth&quot;</span>],
        retrieval_context=row[<span class="hljs-string">&quot;contexts&quot;</span>],
    )
    test_cases.append(test_case)

<span class="hljs-comment"># test_cases</span>
result = evaluate(
    test_cases=test_cases,
    metrics=[answer_relevancy, faithfulness],
    print_results=<span class="hljs-literal">False</span>,  <span class="hljs-comment"># Change to True to see detailed metric results</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace">DeepEval の最新の<span style="color: #6a00ff; text-decoration-color: #6a00ff">回答関連性メトリックを</span>実行しています！<span style="color: #374151; text-decoration-color: #374151; font-weight: bold">(</span><span style="color: #374151; text-decoration-color: #374151">gpt-4o、 </span><span style="color: #374151; text-decoration-color: #374151; font-style: italic">strict</span><span style="color: #374151; text-decoration-color: #374151">=False</span><span style="color: #374151; text-decoration-color: #374151">、 </span><span style="color: #374151; text-decoration-color: #374151">async_</span><span style="color: #374151; text-decoration-color: #374151; font-style: italic">mode</span><span style="color: #374151; text-decoration-color: #374151">=True を</span><span style="color: #374151; text-decoration-color: #374151">使用 </span><span style="color: #374151; text-decoration-color: #374151; font-weight: bold">)</span><span style="color: #374151; text-decoration-color: #374151">...</span></pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace">DeepEval の最新の<span style="color: #6a00ff; text-decoration-color: #6a00ff">忠実度メトリックを</span>実行しています！<span style="color: #374151; text-decoration-color: #374151">(gpt-4o を使用、 </span><span style="color: #374151; text-decoration-color: #374151">strict</span><span style="color: #374151; text-decoration-color: #374151; font-style: italic">=</span><span style="color: #374151; text-decoration-color: #374151">False</span><span style="color: #374151; text-decoration-color: #374151">、 </span><span style="color: #374151; text-decoration-color: #374151">async_mode=</span><span style="color: #374151; text-decoration-color: #374151; font-style: italic">True</span><span style="color: #374151; text-decoration-color: #374151; font-weight: bold">)</span><span style="color: #374151; text-decoration-color: #374151">...</span></pre>
<pre><code translate="no">Event loop is already running. Applying nest_asyncio patch to allow async execution...


Evaluating 3 test case(s) in parallel: |██████████|100% (3/3) [Time Taken: 00:11,  3.97s/test case]
</code></pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace">テストが終了しました<span style="color: #05f58d; text-decoration-color: #05f58d">！</span>Confident AIで評価結果を見るには<span style="color: #008000; text-decoration-color: #008000">'deepeval login'</span>を実行する。 
‼️ 注意: 代わりに Confident AI 上で直接、deepeval のすべてのメトリクスに対する評価を実行することもできます。</pre>
