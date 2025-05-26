---
id: integrate_with_dspy.md
summary: 本指南展示了如何使用DSPy的retriever模組之一MilvusRM來優化RAG程式。
title: 整合 Milvus 與 DSPy
---
<h1 id="Integrate-Milvus-with-DSPy" class="common-anchor-header">整合 Milvus 與 DSPy<button data-href="#Integrate-Milvus-with-DSPy" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/milvus_and_DSPy.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/milvus_and_DSPy.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<h2 id="What-is-DSPy" class="common-anchor-header">什麼是 DSPy<button data-href="#What-is-DSPy" class="anchor-icon" translate="no">
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
    </button></h2><p>DSPy 由 Stanford NLP Group 推出，是一個突破性的程式框架，專門用來優化語言模型中的提示和權重，尤其是在大型語言模型 (LLM) 整合在管道的多個階段的情況下，更有價值。DSPy 採用了以學習為基礎的方法，有別於依賴手動製作和調整的傳統提示工程技術。透過吸收問答範例，DSPy 可針對特定任務動態產生最佳化的提示。這種創新的方法能夠無縫地重新組合整個管道，省去持續手動調整提示的需要。DSPy 的 Pythonic 語法提供各種可組合與宣告式模組，簡化了 LLM 的指令。</p>
<h2 id="Benefits-of-using-DSPy" class="common-anchor-header">使用 DSPy 的優點<button data-href="#Benefits-of-using-DSPy" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li>程式設計方法：DSPy 將管道抽象為文字轉換圖形，而不只是提示 LLM，為 LM 管道開發提供了系統化的程式設計方法。其宣告式模組可進行結構化設計與最佳化，取代傳統提示範本的試誤法。</li>
<li>效能提升：DSPy 證實比現有方法有顯著的效能提升。透過案例研究，它的表現優於標準提示和專家建立的示範，即使編譯成較小的 LM 模型，也能展示其多功能性和有效性。</li>
<li>模組化抽象：DSPy 有效地抽象出 LM 管線開發的複雜層面，例如分解、微調與模型選擇。有了 DSPy，一個簡潔的程式可以無縫地轉換成各種模型的指令，例如 GPT-4、Llama2-13b 或 T5-base，從而簡化開發過程並提昇效能。</li>
</ul>
<h2 id="Modules" class="common-anchor-header">模組<button data-href="#Modules" class="anchor-icon" translate="no">
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
    </button></h2><p>建構 LLM 管道有許多元件。在此，我們將介紹一些關鍵元件，以提供對 DSPy 運作方式的高層次瞭解。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/dspy-01.png" alt="DSPy Modules" class="doc-image" id="dspy-modules" />
   </span> <span class="img-wrapper"> <span>DSPy 模組</span> </span></p>
<p>簽名：DSPy 中的簽章 (Signature) 是宣告性的規格，概述模組的輸入/輸出行為，在執行任務時引導語言模型。 模組 (Module)：DSPy 模組是程式利用語言模型 (LM) 的基本元件。它們抽象出各種提示技術，例如連鎖思考或 ReAct，並可適應處理任何 DSPy Signature。這些模組具有可學習的參數，以及處理輸入和產生輸出的能力，可結合形成更大的程式，其靈感來自 PyTorch 中的 NN 模組，但專為 LM 應用程式量身打造。 優化器：DSPy 中的優化器可微調 DSPy 程式的參數，例如提示和 LLM 權重，以最大化指定的準確度等指標，進而提升程式效率。</p>
<h2 id="Why-Milvus-in-DSPy" class="common-anchor-header">為什麼在 DSPy 中使用 Milvus<button data-href="#Why-Milvus-in-DSPy" class="anchor-icon" translate="no">
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
    </button></h2><p>DSPy 是一個強大的程式設計框架，可提升 RAG 應用程式。這類應用程式需要擷取有用的資訊來提升答案品質，而這需要向量資料庫。Milvus 是知名的開放原始碼向量資料庫，可提升效能與擴充性。有了 DSPy 中的retriever 模組 MilvusRM，整合 Milvus 變得無縫。現在，開發人員可以利用 Milvus 強大的向量搜尋功能，使用 DSPy 輕鬆定義和優化 RAG 程式。這項合作結合了 DSPy 的程式設計能力與 Milvus 的搜尋功能，讓 RAG 應用程式更有效率且更具擴充性。</p>
<h2 id="Examples" class="common-anchor-header">範例<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>現在，讓我們以一個快速的範例來說明如何在 DSPy 中利用 Milvus 來優化 RAG 應用程式。</p>
<h3 id="Prerequisites" class="common-anchor-header">先決條件</h3><p>在建立 RAG 應用程式之前，先安裝 DSPy 和 PyMilvus。</p>
<pre><code translate="no" class="language-python">$ pip install <span class="hljs-string">&quot;dspy-ai[milvus]&quot;</span>
$ pip install -U pymilvus
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
如果您使用的是 Google Colab，為了啟用剛安裝的相依性，您可能需要**重新啟動運行時間** (點選螢幕上方的「Runtime」功能表，並從下拉式功能表中選擇「Restart session」)。</div>
<h3 id="Loading-the-dataset" class="common-anchor-header">載入資料集</h3><p>在本範例中，我們使用 HotPotQA 這個複雜問題-答案對的集合作為訓練資料集。我們可以透過 HotPotQA 類載入它們。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> dspy.datasets <span class="hljs-keyword">import</span> HotPotQA

<span class="hljs-comment"># Load the dataset.</span>
dataset = HotPotQA(
    train_seed=<span class="hljs-number">1</span>, train_size=<span class="hljs-number">20</span>, eval_seed=<span class="hljs-number">2023</span>, dev_size=<span class="hljs-number">50</span>, test_size=<span class="hljs-number">0</span>
)

<span class="hljs-comment"># Tell DSPy that the &#x27;question&#x27; field is the input. Any other fields are labels and/or metadata.</span>
trainset = [x.with_inputs(<span class="hljs-string">&quot;question&quot;</span>) <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> dataset.train]
devset = [x.with_inputs(<span class="hljs-string">&quot;question&quot;</span>) <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> dataset.dev]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Ingest-data-into-the-Milvus-vector-database" class="common-anchor-header">將資料擷取至 Milvus 向量資料庫</h3><p>將上下文資訊擷取至 Milvus 資料庫，以便進行向量檢索。這個集合應該有<code translate="no">embedding</code> 欄位和<code translate="no">text</code> 欄位。在這種情況下，我們使用 OpenAI 的<code translate="no">text-embedding-3-small</code> 模型作為預設的查詢嵌入函式。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> requests
<span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;&lt;YOUR_OPENAI_API_KEY&gt;&quot;</span>
MILVUS_URI = <span class="hljs-string">&quot;example.db&quot;</span>
MILVUS_TOKEN = <span class="hljs-string">&quot;&quot;</span>

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Collection
<span class="hljs-keyword">from</span> dspy.retrieve.milvus_rm <span class="hljs-keyword">import</span> openai_embedding_function

client = MilvusClient(uri=MILVUS_URI, token=MILVUS_TOKEN)

<span class="hljs-keyword">if</span> <span class="hljs-string">&quot;dspy_example&quot;</span> <span class="hljs-keyword">not</span> <span class="hljs-keyword">in</span> client.list_collections():
    client.create_collection(
        collection_name=<span class="hljs-string">&quot;dspy_example&quot;</span>,
        overwrite=<span class="hljs-literal">True</span>,
        dimension=<span class="hljs-number">1536</span>,
        primary_field_name=<span class="hljs-string">&quot;id&quot;</span>,
        vector_field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
        id_type=<span class="hljs-string">&quot;int&quot;</span>,
        metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
        max_length=<span class="hljs-number">65535</span>,
        enable_dynamic=<span class="hljs-literal">True</span>,
    )
text = requests.get(
    <span class="hljs-string">&quot;https://raw.githubusercontent.com/wxywb/dspy_dataset_sample/master/sample_data.txt&quot;</span>
).text

<span class="hljs-keyword">for</span> idx, passage <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(text.split(<span class="hljs-string">&quot;\n&quot;</span>)):
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(passage) == <span class="hljs-number">0</span>:
        <span class="hljs-keyword">continue</span>
    client.insert(
        collection_name=<span class="hljs-string">&quot;dspy_example&quot;</span>,
        data=[
            {
                <span class="hljs-string">&quot;id&quot;</span>: idx,
                <span class="hljs-string">&quot;embedding&quot;</span>: openai_embedding_function(passage)[<span class="hljs-number">0</span>],
                <span class="hljs-string">&quot;text&quot;</span>: passage,
            }
        ],
    )
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-MilvusRM" class="common-anchor-header">定義 MilvusRM。</h3><p>現在，您需要定義 MilvusRM。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> dspy.retrieve.milvus_rm <span class="hljs-keyword">import</span> MilvusRM
<span class="hljs-keyword">import</span> dspy

retriever_model = MilvusRM(
    collection_name=<span class="hljs-string">&quot;dspy_example&quot;</span>,
    uri=MILVUS_URI,
    token=MILVUS_TOKEN,  <span class="hljs-comment"># ignore this if no token is required for Milvus connection</span>
    embedding_function=openai_embedding_function,
)
turbo = dspy.OpenAI(model=<span class="hljs-string">&quot;gpt-3.5-turbo&quot;</span>)
dspy.settings.configure(lm=turbo)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Building-signatures" class="common-anchor-header">建立簽章</h3><p>現在我們已經載入資料，讓我們開始定義管道中子任務的簽章。我們可以定義我們簡單的輸入<code translate="no">question</code> 和輸出<code translate="no">answer</code> ，但因為我們正在建立一個 RAG 管道，所以我們會從 Milvus 擷取上下文資訊。因此，讓我們定義我們的簽章為<code translate="no">context, question --&gt; answer</code> 。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">GenerateAnswer</span>(dspy.Signature):
    <span class="hljs-string">&quot;&quot;&quot;Answer questions with short factoid answers.&quot;&quot;&quot;</span>

    context = dspy.InputField(desc=<span class="hljs-string">&quot;may contain relevant facts&quot;</span>)
    question = dspy.InputField()
    answer = dspy.OutputField(desc=<span class="hljs-string">&quot;often between 1 and 5 words&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>我們包含<code translate="no">context</code> 和<code translate="no">answer</code> 欄位的簡短說明，以定義更清楚的指引，說明模型將會接收什麼，應該產生什麼。</p>
<h3 id="Building-the-pipeline" class="common-anchor-header">建立管道</h3><p>現在，讓我們定義 RAG 管道。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">RAG</span>(dspy.Module):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, rm</span>):
        <span class="hljs-built_in">super</span>().__init__()
        <span class="hljs-variable language_">self</span>.retrieve = rm

        <span class="hljs-comment"># This signature indicates the task imposed on the COT module.</span>
        <span class="hljs-variable language_">self</span>.generate_answer = dspy.ChainOfThought(GenerateAnswer)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">forward</span>(<span class="hljs-params">self, question</span>):
        <span class="hljs-comment"># Use milvus_rm to retrieve context for the question.</span>
        context = <span class="hljs-variable language_">self</span>.retrieve(question).passages
        <span class="hljs-comment"># COT module takes &quot;context, query&quot; and output &quot;answer&quot;.</span>
        prediction = <span class="hljs-variable language_">self</span>.generate_answer(context=context, question=question)
        <span class="hljs-keyword">return</span> dspy.Prediction(
            context=[item.long_text <span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> context], answer=prediction.answer
        )
<button class="copy-code-btn"></button></code></pre>
<h3 id="Executing-the-pipeline-and-getting-the-results" class="common-anchor-header">執行管道並取得結果</h3><p>現在，我們已經建立了 RAG 管道。讓我們試試並得到結果。</p>
<pre><code translate="no" class="language-python">rag = RAG(retriever_model)
<span class="hljs-built_in">print</span>(rag(<span class="hljs-string">&quot;who write At My Window&quot;</span>).answer)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Townes Van Zandt
</code></pre>
<p>我們可以評估資料集的量化結果。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> dspy.evaluate.evaluate <span class="hljs-keyword">import</span> Evaluate
<span class="hljs-keyword">from</span> dspy.datasets <span class="hljs-keyword">import</span> HotPotQA

evaluate_on_hotpotqa = Evaluate(
    devset=devset, num_threads=<span class="hljs-number">1</span>, display_progress=<span class="hljs-literal">False</span>, display_table=<span class="hljs-number">5</span>
)

metric = dspy.evaluate.answer_exact_match
score = evaluate_on_hotpotqa(rag, metric=metric)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;rag:&quot;</span>, score)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Optimizing-the-pipeline" class="common-anchor-header">優化管道</h3><p>定義這個程式之後，下一步就是編譯。這個過程會更新每個模組內的參數，以提升效能。編譯過程取決於三個關鍵因素：</p>
<ul>
<li>訓練集：我們會利用訓練資料集中的 20 個問答範例來進行示範。</li>
<li>驗證指標：我們會建立一個簡單的<code translate="no">validate_context_and_answer</code> 公制。此標準可驗證預測答案的準確性，並確保擷取的上下文包含該答案。</li>
<li>特定優化器 (提詞器)：DSPy 的編譯器結合了多個 teleprompter，旨在有效優化您的程式。</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> dspy.teleprompt <span class="hljs-keyword">import</span> BootstrapFewShot

<span class="hljs-comment"># Validation logic: check that the predicted answer is correct.# Also check that the retrieved context does contain that answer.</span>


<span class="hljs-keyword">def</span> <span class="hljs-title function_">validate_context_and_answer</span>(<span class="hljs-params">example, pred, trace=<span class="hljs-literal">None</span></span>):
    answer_EM = dspy.evaluate.answer_exact_match(example, pred)
    answer_PM = dspy.evaluate.answer_passage_match(example, pred)
    <span class="hljs-keyword">return</span> answer_EM <span class="hljs-keyword">and</span> answer_PM


<span class="hljs-comment"># Set up a basic teleprompter, which will compile our RAG program.</span>
teleprompter = BootstrapFewShot(metric=validate_context_and_answer)

<span class="hljs-comment"># Compile!</span>
compiled_rag = teleprompter.<span class="hljs-built_in">compile</span>(rag, trainset=trainset)

<span class="hljs-comment"># Now compiled_rag is optimized and ready to answer your new question!</span>
<span class="hljs-comment"># Now, let’s evaluate the compiled RAG program.</span>
score = evaluate_on_hotpotqa(compiled_rag, metric=metric)
<span class="hljs-built_in">print</span>(score)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;compile_rag:&quot;</span>, score)
<button class="copy-code-btn"></button></code></pre>
<p>Ragas 分數從之前的 50.0 增加到 52.0，顯示答案品質有所提升。</p>
<h2 id="Summary" class="common-anchor-header">總結<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h2><p>DSPy 標誌著語言模型互動的一大躍進，透過其可編程介面，有助於演算法和自動最佳化模型提示和權重。利用 DSPy 實作 RAG，可輕鬆適應不同的語言模型或資料集，大幅減少繁瑣的手動介入。</p>
