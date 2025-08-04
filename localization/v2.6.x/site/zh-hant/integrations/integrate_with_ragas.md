---
id: integrate_with_ragas.md
summary: 本指南說明如何使用 Ragas 來評估建立在 Milvus 上的 Retrieval-Augmented Generation (RAG) 管道。
title: 使用 Ragas 進行評估
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/evaluation_with_ragas.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/evaluation_with_ragas.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Evaluation-with-Ragas" class="common-anchor-header">使用 Ragas 進行評估<button data-href="#Evaluation-with-Ragas" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南展示了如何使用 Ragas 來評估建立在<a href="https://milvus.io/">Milvus</a> 之上的檢索-增強生成 (RAG) 管道。</p>
<p>RAG 系統結合了檢索系統與生成模型，可根據給定的提示生成新的文字。該系統首先使用 Milvus 從語料庫中檢索相關文件，然後根據檢索到的文件使用生成模型生成新文本。</p>
<p><a href="https://docs.ragas.io/en/latest/index.html#">Ragas</a>是一個可以幫助您評估 RAG 管道的框架。現有的工具和框架可以幫助您建立這些管道，但是評估它和量化您的管道效能可能很困難。這就是 Ragas (RAG 評估) 的用武之地。</p>
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
    </button></h2><p>在執行本筆記本之前，請確定您已安裝下列依賴項目：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus openai requests tqdm pandas ragas</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>如果您使用的是 Google Colab，為了啟用剛安裝的相依性，您可能需要<strong>重新啟動執行時</strong>（點選畫面上方的「Runtime」功能表，並從下拉式功能表中選擇「Restart session」）。</p>
<p>在本範例中，我們將使用 OpenAI 作為 LLM。您應該準備<a href="https://platform.openai.com/docs/quickstart">api key</a> <code translate="no">OPENAI_API_KEY</code> 作為環境變數。</p>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Define-the-RAG-pipeline" class="common-anchor-header">定義 RAG 管道<button data-href="#Define-the-RAG-pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>我們將定義以 Milvus 作為向量儲存、OpenAI 作為 LLM 的 RAG 類。該類包含<code translate="no">load</code> 方法 (將文字資料載入 Milvus)、<code translate="no">retrieve</code> 方法 (擷取與給定問題最相似的文字資料)，以及<code translate="no">answer</code> 方法 (使用擷取的知識回答給定問題)。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">List</span>
<span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm
<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient


<span class="hljs-keyword">class</span> <span class="hljs-title class_">RAG</span>:
    <span class="hljs-string">&quot;&quot;&quot;
    RAG (Retrieval-Augmented Generation) class built upon OpenAI and Milvus.
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
        llm_model: <span class="hljs-built_in">str</span> = <span class="hljs-string">&quot;gpt-3.5-turbo&quot;</span>,
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
        embedding_dim = <span class="hljs-built_in">len</span>(<span class="hljs-variable language_">self</span>._emb_text(<span class="hljs-string">&quot;foo&quot;</span>))
        <span class="hljs-variable language_">self</span>.milvus_client.create_collection(
            collection_name=<span class="hljs-variable language_">self</span>.collection_name,
            dimension=embedding_dim,
            metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
            consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,  <span class="hljs-comment"># Strong consistency level</span>
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
            search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}},  <span class="hljs-comment"># Inner product distance</span>
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
<p>讓我們用 OpenAI 和 Milvus 客戶端初始化 RAG 類別。</p>
<pre><code translate="no" class="language-python">openai_client = OpenAI()
milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)

my_rag = RAG(openai_client=openai_client, milvus_client=milvus_client)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>至於<code translate="no">MilvusClient</code> 的參數 ：</p>
<ul>
<li>將<code translate="no">uri</code> 設定為本機檔案，例如<code translate="no">./milvus.db</code> ，是最方便的方法，因為它會自動利用<a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>將所有資料儲存在這個檔案中。</li>
<li>如果您有大規模的資料，您可以在<a href="https://milvus.io/docs/quickstart.md">docker 或 kubernetes</a> 上架設效能更高的 Milvus 伺服器。在此設定中，請使用伺服器的 uri，例如<code translate="no">http://localhost:19530</code> ，作為您的<code translate="no">uri</code> 。</li>
<li>如果您想使用<a href="https://zilliz.com/cloud">Zilliz Cloud</a>（Milvus 的完全管理<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">雲端</a>服務），請調整<code translate="no">uri</code> 和<code translate="no">token</code> ，與 Zilliz Cloud 中的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint 和 Api key</a>對應。</li>
</ul>
</div>
<h2 id="Run-the-RAG-pipeline-and-get-results" class="common-anchor-header">執行 RAG 管道並獲得結果<button data-href="#Run-the-RAG-pipeline-and-get-results" class="anchor-icon" translate="no">
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
    </button></h2><p>我們使用<a href="https://github.com/milvus-io/milvus/blob/master/DEVELOPMENT.md">Milvus 開發指南</a>作為 RAG 中的私有知識，這是簡單 RAG 管道的良好資料來源。</p>
<p>下載並載入 RAG 管道。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">import</span> urllib.request

url = <span class="hljs-string">&quot;https://raw.githubusercontent.com/milvus-io/milvus/master/DEVELOPMENT.md&quot;</span>
file_path = <span class="hljs-string">&quot;./Milvus_DEVELOPMENT.md&quot;</span>

<span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> os.path.exists(file_path):
    urllib.request.urlretrieve(url, file_path)
<span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
    file_text = file.read()

<span class="hljs-comment"># We simply use &quot;# &quot; to separate the content in the file, which can roughly separate the content of each main part of the markdown file.</span>
text_lines = file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
my_rag.load(text_lines)  <span class="hljs-comment"># Load the text data into RAG pipeline</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Creating embeddings: 100%|██████████| 27/27 [00:20&lt;00:00,  1.34it/s]
</code></pre>
<p>讓我們定義一個關於開發指南文件內容的查詢問題。然後使用<code translate="no">answer</code> 方法取得答案和擷取的上下文文字。</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;what is the hardware requirements specification if I want to build Milvus and run from source code?&quot;</span>
my_rag.answer(question, return_retrieved_text=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">('The hardware requirements specification for building Milvus and running it from source code is as follows:\n\n- 8GB of RAM\n- 50GB of free disk space',
 ['Hardware Requirements\n\nThe following specification (either physical or virtual machine resources) is recommended for Milvus to build and run from source code.\n\n```yaml\n- 8GB of RAM\n- 50GB of free disk space\n```\n\n##',
  'Building Milvus on a local OS/shell environment\n\nThe details below outline the hardware and software requirements for building on Linux and MacOS.\n\n##',
  &quot;Software Requirements\n\nAll Linux distributions are available for Milvus development. However a majority of our contributor worked with Ubuntu or CentOS systems, with a small portion of Mac (both x86_64 and Apple Silicon) contributors. If you would like Milvus to build and run on other distributions, you are more than welcome to file an issue and contribute!\n\nHere's a list of verified OS types where Milvus can successfully build and run:\n\n- Debian/Ubuntu\n- Amazon Linux\n- MacOS (x86_64)\n- MacOS (Apple Silicon)\n\n##&quot;])
</code></pre>
<p>現在讓我們準備一些問題與其相對應的地面真實答案。我們從 RAG 管道取得答案和上下文。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> ragas <span class="hljs-keyword">import</span> EvaluationDataset
<span class="hljs-keyword">from</span> datasets <span class="hljs-keyword">import</span> Dataset
<span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd

user_input_list = [
    <span class="hljs-string">&quot;what is the hardware requirements specification if I want to build Milvus and run from source code?&quot;</span>,
    <span class="hljs-string">&quot;What is the programming language used to write Knowhere?&quot;</span>,
    <span class="hljs-string">&quot;What should be ensured before running code coverage?&quot;</span>,
]
reference_list = [
    <span class="hljs-string">&quot;If you want to build Milvus and run from source code, the recommended hardware requirements specification is:\n\n- 8GB of RAM\n- 50GB of free disk space.&quot;</span>,
    <span class="hljs-string">&quot;The programming language used to write Knowhere is C++.&quot;</span>,
    <span class="hljs-string">&quot;Before running code coverage, you should make sure that your code changes are covered by unit tests.&quot;</span>,
]
retrieved_contexts_list = []
response_list = []

<span class="hljs-keyword">for</span> user_input <span class="hljs-keyword">in</span> tqdm(user_input_list, desc=<span class="hljs-string">&quot;Answering questions&quot;</span>):
    response, retrieved_context = my_rag.answer(user_input, return_retrieved_text=<span class="hljs-literal">True</span>)
    retrieved_contexts_list.append(retrieved_context)
    response_list.append(response)

df = pd.DataFrame(
    {
        <span class="hljs-string">&quot;user_input&quot;</span>: user_input_list,
        <span class="hljs-string">&quot;retrieved_contexts&quot;</span>: retrieved_contexts_list,
        <span class="hljs-string">&quot;response&quot;</span>: response_list,
        <span class="hljs-string">&quot;reference&quot;</span>: reference_list,
    }
)
rag_results = EvaluationDataset.from_pandas(df)
df
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Answering questions: 100%|██████████| 3/3 [00:04&lt;00:00,  1.37s/it]
</code></pre>
<div>
<style scoped>
    .dataframe tbody tr th:only-of-type { vertical-align: middle; }<pre><code translate="no">.dataframe tbody tr th {
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
      <th>使用者輸入</th>
      <th>擷取的上下文</th>
      <th>回應</th>
      <th>參考</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>什麼是硬體需求規格？</td>
      <td>[Hardware Requirements/n（硬體需求規格）：下列規格...</td>
      <td>硬體需求規格(Hardware Requirements Specification)</td>
      <td>如果您想建立 Milvus 並從來源執行，您需要...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>用什麼編程語言來寫...</td>
      <td>[CMake &amp; Conan\n\nMilvus 的演算法函式庫...</td>
      <td>編寫 Knowherus 的程式語言是...</td>
      <td>用來編寫 Knowher...</td>
    </tr>
    <tr>
      <th>2</th>
      <td>在運行代碼覆蓋之前應確保哪些...</td>
      <td>[Code coverage\n/nBefore submitting your pull ...</td>
      <td>在執行程式碼覆蓋之前，應該確保...</td>
      <td>在執行程式碼覆蓋之前，您應該確保 ...</td>
    </tr>
  </tbody>
</table>
</div>
<h2 id="Evaluation-with-Ragas" class="common-anchor-header">使用 Ragas 進行評估<button data-href="#Evaluation-with-Ragas" class="anchor-icon" translate="no">
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
    </button></h2><p>我們使用 Ragas 來評估 RAG pipeline 結果的效能。</p>
<p>Ragas 提供了一套易於使用的度量指標。我們以<code translate="no">Answer relevancy</code>,<code translate="no">Faithfulness</code>,<code translate="no">Context recall</code>, 和<code translate="no">Context precision</code> 作為評估 RAG 管道的指標。有關指標的詳細資訊，請參閱<a href="https://docs.ragas.io/en/latest/concepts/metrics/index.html">Ragas Metrics</a>。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> ragas <span class="hljs-keyword">import</span> evaluate
<span class="hljs-keyword">from</span> ragas.metrics <span class="hljs-keyword">import</span> AnswerRelevancy, Faithfulness, ContextRecall, ContextPrecision

<span class="hljs-keyword">from</span> ragas.llms <span class="hljs-keyword">import</span> LangchainLLMWrapper
<span class="hljs-keyword">from</span> langchain_openai <span class="hljs-keyword">import</span> ChatOpenAI

llm = ChatOpenAI(model=<span class="hljs-string">&quot;gpt-4o-mini&quot;</span>)
evaluator_llm = LangchainLLMWrapper(llm)

results = evaluate(
    dataset=rag_results,
    metrics=[
        AnswerRelevancy(llm=evaluator_llm),
        Faithfulness(llm=evaluator_llm),
        ContextRecall(llm=evaluator_llm),
        ContextPrecision(llm=evaluator_llm),
    ],
)
results
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Evaluating: 100%|██████████| 12/12 [00:10&lt;00:00,  1.11it/s]





{'answer_relevancy': 0.9894, 'faithfulness': 1.0000, 'context_recall': 1.0000, 'context_precision': 1.0000}
</code></pre>
