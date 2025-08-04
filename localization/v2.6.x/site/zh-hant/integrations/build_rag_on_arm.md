---
id: build_rag_on_arm.md
summary: >-
  在本教程中，您將學習如何在以 Arm 為基礎的基礎架構上建立一個 Retrieval-Augmented Generation (RAG)
  應用程式。在向量儲存方面，我們利用 Zilliz Cloud 這個完全由 Milvus 管理的向量資料庫。Zilliz Cloud 可在 AWS、GCP 和
  Azure 等主要雲端上使用。在這個示範中，我們使用 Zilliz Cloud 部署在 AWS 上的 Arm 機器。對於 LLM，我們在 AWS Arm
  架構的伺服器 CPU 上使用 Llama-3.1-8B 模型，並使用 llama.cpp。
title: 在 Arm 架構上建立 RAG
---
<h1 id="Build-RAG-on-Arm-Architecture" class="common-anchor-header">在 Arm 架構上建立 RAG<button data-href="#Build-RAG-on-Arm-Architecture" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://www.arm.com/">Arm</a>CPU 廣泛應用於各式各樣的應用程式，包括傳統的機器學習 (ML) 和人工智能 (AI) 用例。</p>
<p>在本教程中，您將學習如何在 Arm 架構的基礎架構上建立檢索增強世代 (RAG) 應用程式。在向量儲存方面，我們利用<a href="https://zilliz.com/cloud">Zilliz Cloud</a> 這個完全由 Milvus 管理的向量資料庫。Zilliz Cloud 可在 AWS、GCP 和 Azure 等主要雲端上使用。在這個示範中，我們使用 Zilliz Cloud 部署在 AWS 上的 Arm 機器。對於 LLM，我們使用<code translate="no">llama.cpp</code> 在 AWS Arm 架構的伺服器 CPU 上建立<code translate="no">Llama-3.1-8B</code> 模型。</p>
<h2 id="Prerequisite" class="common-anchor-header">前提條件<button data-href="#Prerequisite" class="anchor-icon" translate="no">
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
    </button></h2><p>若要執行本範例，我們建議您使用<a href="https://aws.amazon.com/ec2/graviton/">AWS Graviton</a>，它提供了在基於 Arm 的伺服器上執行 ML 工作負載的高成本效益方式。本筆記本已在使用 Ubuntu 22.04 LTS 系統的 AWS Graviton3<code translate="no">c7g.2xlarge</code> 實例上進行測試。</p>
<p>您至少需要四個核心和 8GB 記憶體才能執行本範例。配置磁碟儲存至少達 32 GB。我們建議您使用相同或更好規格的實例。</p>
<p>啟動實例後，連線到該實例，並執行下列指令準備環境。</p>
<p>在伺服器上安裝 python：</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">sudo</span> apt update
$ <span class="hljs-built_in">sudo</span> apt install python-is-python3 python3-pip python3-venv -y
<button class="copy-code-btn"></button></code></pre>
<p>建立並啟動虛擬環境：</p>
<pre><code translate="no" class="language-bash">$ python -m venv venv
$ <span class="hljs-built_in">source</span> venv/bin/activate
<button class="copy-code-btn"></button></code></pre>
<p>安裝所需的 python 相依性：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus openai requests langchain-huggingface huggingface_hub tqdm</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Offline-Data-Loading" class="common-anchor-header">離線資料載入<button data-href="#Offline-Data-Loading" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-Collection" class="common-anchor-header">建立資料集</h3><p>我們使用部署在 AWS 上的<a href="https://zilliz.com/cloud">Zilliz Cloud</a>與 Arm 型機器來儲存與擷取向量資料。若要快速上手，只需在 Zilliz Cloud 免費<a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">註冊一個帳號</a>。</p>
<div class="alert note">
<p>除了 Zilliz Cloud 之外，自我託管的 Milvus 也是一個選擇（設定比較複雜）。我們也可以在以 ARM 為基礎的機器上部署<a href="https://milvus.io/docs/install_standalone-docker-compose.md">Milvus Standalone</a>和<a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes</a>。有關 Milvus 安裝的詳細資訊，請參閱安裝<a href="https://milvus.io/docs/install-overview.md">說明文件</a>。</p>
</div>
<p>我們在 Zilliz Cloud 設定<code translate="no">uri</code> 和<code translate="no">token</code> 為<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint 和 Api key</a>。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

milvus_client = MilvusClient(
    uri=<span class="hljs-string">&quot;&lt;your_zilliz_public_endpoint&gt;&quot;</span>, token=<span class="hljs-string">&quot;&lt;your_zilliz_api_key&gt;&quot;</span>
)

collection_name = <span class="hljs-string">&quot;my_rag_collection&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<p>檢查資料集是否已存在，若已存在，請將其刪除。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>使用指定的參數建立新的集合。</p>
<p>如果我們沒有指定任何欄位資訊，Milvus 會自動建立一個預設的<code translate="no">id</code> 欄位作為主索引鍵，以及一個<code translate="no">vector</code> 欄位來儲存向量資料。保留的 JSON 欄位用來儲存非結構描述定義的欄位及其值。</p>
<pre><code translate="no" class="language-python">milvus_client.create_collection(
    collection_name=collection_name,
    dimension=<span class="hljs-number">384</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>我們使用內乘距離作為預設的度量類型。如需更多關於距離類型的資訊，您可以參考<a href="https://milvus.io/docs/metric.md?tab=floating">相似度量頁面</a></p>
<h3 id="Prepare-the-data" class="common-anchor-header">準備資料</h3><p>我們使用<a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">Milvus 文件 2.4.x</a>中的常見問題頁面作為 RAG 中的私有知識，對於簡單的 RAG 管道來說，這是一個很好的資料來源。</p>
<p>下載 zip 檔案並解壓縮文件到資料夾<code translate="no">milvus_docs</code> 。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">unzip -q milvus_docs_2.4.x_en.zip -d milvus_docs</span>
<button class="copy-code-btn"></button></code></pre>
<p>我們從資料夾<code translate="no">milvus_docs/en/faq</code> 載入所有 markdown 檔案。對於每個文件，我們只需簡單地使用「#」來分隔文件中的內容，這樣就可以大致分隔出 markdown 檔案中每個主要部分的內容。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []

<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()

    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data" class="common-anchor-header">插入資料</h3><p>我們準備了一個簡單但有效率的嵌入模型<a href="https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2">all-MiniLM-L6-v2</a>，可以將文字轉換成嵌入向量。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_huggingface <span class="hljs-keyword">import</span> HuggingFaceEmbeddings

embedding_model = HuggingFaceEmbeddings(model_name=<span class="hljs-string">&quot;all-MiniLM-L6-v2&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>遍歷文字行，建立嵌入，然後將資料插入 Milvus。</p>
<p>這裡有一個新欄位<code translate="no">text</code> ，它是集合模式中的非定義欄位。它會自動加入保留的 JSON 動態欄位，在高層次上可視為一般欄位。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []

text_embeddings = embedding_model.embed_documents(text_lines)

<span class="hljs-keyword">for</span> i, (line, embedding) <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(
    tqdm(<span class="hljs-built_in">zip</span>(text_lines, text_embeddings), desc=<span class="hljs-string">&quot;Creating embeddings&quot;</span>)
):
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: embedding, <span class="hljs-string">&quot;text&quot;</span>: line})

milvus_client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Creating embeddings: 100%|███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 72/72 [00:18&lt;00:00,  3.91it/s]
</code></pre>
<h2 id="Launch-LLM-Service-on-Arm" class="common-anchor-header">在 Arm 上啟動 LLM 服務<button data-href="#Launch-LLM-Service-on-Arm" class="anchor-icon" translate="no">
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
    </button></h2><p>在本節中，我們將在 Arm-based CPU 上建立並啟動<code translate="no">llama.cpp</code> 服務。</p>
<h3 id="Llama-31-model--llamacpp" class="common-anchor-header">Llama 3.1 模型與 llama.cpp</h3><p>Meta 的<a href="https://huggingface.co/cognitivecomputations/dolphin-2.9.4-llama3.1-8b-gguf">Llama-3.1-8B 模型</a>屬於 Llama 3.1 模型系列，可免費用於研究與商業用途。在使用該模型之前，請造訪 Llama<a href="https://llama.meta.com/llama-downloads/">網站</a>並填寫表格以申請存取權限。</p>
<p><a href="https://github.com/ggerganov/llama.cpp">llama.cpp</a>是一個開放原始碼的 C/C++ 專案，可在各種硬體上實現有效的 LLM 推論 - 包括本機和雲端。您可以使用<code translate="no">llama.cpp</code> 方便地託管 Llama 3.1 模型。</p>
<h3 id="Download-and-build-llamacpp" class="common-anchor-header">下載並建立 llama.cpp</h3><p>執行下列指令以安裝 make、cmake、gcc、g++ 及其他從原始碼建立 llama.cpp 所需的基本工具：</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">sudo</span> apt install make cmake -y
$ <span class="hljs-built_in">sudo</span> apt install gcc g++ -y
$ <span class="hljs-built_in">sudo</span> apt install build-essential -y
<button class="copy-code-btn"></button></code></pre>
<p>現在您可以開始建立<code translate="no">llama.cpp</code> 。</p>
<p>克隆 llama.cpp 的原始碼套件庫：</p>
<pre><code translate="no" class="language-bash">$ git <span class="hljs-built_in">clone</span> https://github.com/ggerganov/llama.cpp
<button class="copy-code-btn"></button></code></pre>
<p>預設情況下，<code translate="no">llama.cpp</code> 只會在 Linux 和 Windows 上為 CPU 建立。您不需要提供任何額外的開關，就可以針對您所執行的 Arm CPU 建立它。</p>
<p>執行<code translate="no">make</code> 以建立它：</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">cd</span> llama.cpp
$ make GGML_NO_LLAMAFILE=1 -j$(<span class="hljs-built_in">nproc</span>)
<button class="copy-code-btn"></button></code></pre>
<p>執行 help 指令檢查<code translate="no">llama.cpp</code> 是否已正確建立：</p>
<pre><code translate="no" class="language-bash">$ ./llama-cli -h
<button class="copy-code-btn"></button></code></pre>
<p>如果<code translate="no">llama.cpp</code> 已正確建立，您會看到幫助選項顯示。輸出片段看起來像這樣：</p>
<pre><code translate="no">example usage:

    text generation:     ./llama-cli -m your_model.gguf -p &quot;I believe the meaning of life is&quot; -n 128

    chat (conversation): ./llama-cli -m your_model.gguf -p &quot;You are a helpful assistant&quot; -cnv
</code></pre>
<p>現在您可以使用 huggingface cli 下載模型：</p>
<pre><code translate="no" class="language-bash">$ huggingface-cli download cognitivecomputations/dolphin-2.9.4-llama3.1-8b-gguf dolphin-2.9.4-llama3.1-8b-Q4_0.gguf --local-dir . --local-dir-use-symlinks False
<button class="copy-code-btn"></button></code></pre>
<p>由 llama.cpp 團隊推出的 GGUF 模型格式，使用壓縮與量化的方式，將權值精確度降低為 4 位元整數，大幅降低計算與記憶體需求，讓 Arm CPU 有效運用於 LLM 推論。</p>
<h3 id="Re-quantize-the-model-weights" class="common-anchor-header">重新量化模型權值</h3><p>要重新量化，請執行</p>
<pre><code translate="no" class="language-bash">$ ./llama-quantize --allow-requantize dolphin-2.9.4-llama3.1-8b-Q4_0.gguf dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf Q4_0_8_8
<button class="copy-code-btn"></button></code></pre>
<p>這將會輸出一個新檔案<code translate="no">dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf</code> ，其中包含重新配置的權值，讓<code translate="no">llama-cli</code> 可以使用 SVE 256 和 MATMUL_INT8 支援。</p>
<div class="alert note">
<p>此重新量化特別針對 Graviton3 而言是最佳的。對於 Graviton2，最佳的重新量化應以<code translate="no">Q4_0_4_4</code> 格式執行，而對於 Graviton4，<code translate="no">Q4_0_4_8</code> 格式最適合重新量化。</p>
</div>
<h3 id="Start-the-LLM-Service" class="common-anchor-header">啟動 LLM 服務</h3><p>您可以利用 llama.cpp 伺服器程式，並透過 OpenAI 相容的 API 傳送請求。這可讓您開發與 LLM 多次互動的應用程式，而無須重複啟動和停止 LLM。此外，您也可以從另一台透過網路託管 LLM 的機器存取伺服器。</p>
<p>從命令列啟動伺服器，它會在 8080 連接埠監聽：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">./llama-server -m dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf -n 2048 -t 64 -c 65536  --port 8080</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'main: server is listening on 127.0.0.1:8080 - starting the main loop
</code></pre>
<p>您也可以調整已啟動 LLM 的參數，使其適應您的伺服器硬體，以獲得理想的效能。如需更多參數資訊，請參閱<code translate="no">llama-server --help</code> 指令。</p>
<p>如果您在執行此步驟時感到吃力，可以參考<a href="https://learn.arm.com/learning-paths/servers-and-cloud-computing/llama-cpu/llama-chatbot/">官方文件</a>以獲得更多資訊。</p>
<p>您已經在 Arm-based CPU 上啟動了 LLM 服務。接下來，我們直接使用 OpenAI SDK 與服務互動。</p>
<h2 id="Online-RAG" class="common-anchor-header">線上 RAG<button data-href="#Online-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="LLM-Client-and-Embedding-Model" class="common-anchor-header">LLM 用戶端與嵌入模型</h3><p>我們初始化 LLM 用戶端並準備嵌入模型。</p>
<p>對於 LLM，我們使用 OpenAI SDK 來請求之前啟動的 Llama 服務。我們不需要使用任何 API key，因為它實際上是我們本機的 llama.cpp 服務。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

llm_client = OpenAI(base_url=<span class="hljs-string">&quot;http://localhost:8080/v1&quot;</span>, api_key=<span class="hljs-string">&quot;no-key&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>產生一個測試嵌入，並列印其尺寸和前幾個元素。</p>
<pre><code translate="no" class="language-python">test_embedding = embedding_model.embed_query(<span class="hljs-string">&quot;This is a test&quot;</span>)
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">384
[0.03061249852180481, 0.013831384479999542, -0.02084377221763134, 0.016327863559126854, -0.010231520049273968, -0.0479842908680439, -0.017313342541456223, 0.03728749603033066, 0.04588735103607178, 0.034405000507831573]
</code></pre>
<h3 id="Retrieve-data-for-a-query" class="common-anchor-header">擷取查詢資料</h3><p>讓我們指定一個關於 Milvus 的常見問題。</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>在集合中搜尋該問題，並擷取語義上前三名的符合資料。</p>
<pre><code translate="no" class="language-python">search_res = milvus_client.search(
    collection_name=collection_name,
    data=[
        embedding_model.embed_query(question)
    ],  <span class="hljs-comment"># Use the `emb_text` function to convert the question to an embedding vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># Return top 3 results</span>
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}},  <span class="hljs-comment"># Inner product distance</span>
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],  <span class="hljs-comment"># Return the text field</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>讓我們來看看查詢的搜尋結果</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json

retrieved_lines_with_distances = [
    (res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>], res[<span class="hljs-string">&quot;distance&quot;</span>]) <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> search_res[<span class="hljs-number">0</span>]
]
<span class="hljs-built_in">print</span>(json.dumps(retrieved_lines_with_distances, indent=<span class="hljs-number">4</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[
    [
        &quot; Where does Milvus store data?\n\nMilvus deals with two types of data, inserted data and metadata. \n\nInserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends, including [MinIO](https://min.io/), [AWS S3](https://aws.amazon.com/s3/?nc1=h_ls), [Google Cloud Storage](https://cloud.google.com/storage?hl=en#object-storage-for-companies-of-all-sizes) (GCS), [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs), [Alibaba Cloud OSS](https://www.alibabacloud.com/product/object-storage-service), and [Tencent Cloud Object Storage](https://www.tencentcloud.com/products/cos) (COS).\n\nMetadata are generated within Milvus. Each Milvus module has its own metadata that are stored in etcd.\n\n###&quot;,
        0.6488019824028015
    ],
    [
        &quot;How does Milvus flush data?\n\nMilvus returns success when inserted data are loaded to the message queue. However, the data are not yet flushed to the disk. Then Milvus' data node writes the data in the message queue to persistent storage as incremental logs. If `flush()` is called, the data node is forced to write all data in the message queue to persistent storage immediately.\n\n###&quot;,
        0.5974207520484924
    ],
    [
        &quot;What is the maximum dataset size Milvus can handle?\n\n  \nTheoretically, the maximum dataset size Milvus can handle is determined by the hardware it is run on, specifically system memory and storage:\n\n- Milvus loads all specified collections and partitions into memory before running queries. Therefore, memory size determines the maximum amount of data Milvus can query.\n- When new entities and and collection-related schema (currently only MinIO is supported for data persistence) are added to Milvus, system storage determines the maximum allowable size of inserted data.\n\n###&quot;,
        0.5833579301834106
    ]
]
</code></pre>
<h3 id="Use-LLM-to-get-a-RAG-response" class="common-anchor-header">使用 LLM 獲得 RAG 回應</h3><p>將擷取的文件轉換成字串格式。</p>
<pre><code translate="no" class="language-python">context = <span class="hljs-string">&quot;\n&quot;</span>.join(
    [line_with_distance[<span class="hljs-number">0</span>] <span class="hljs-keyword">for</span> line_with_distance <span class="hljs-keyword">in</span> retrieved_lines_with_distances]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Define system and user prompts for the Language Model. This prompt is assembled with the retrieved documents from Milvus.

SYSTEM_PROMPT = &quot;&quot;&quot;
Human: You are an AI assistant. You are able to find answers to the questions from the contextual passage snippets provided.
&quot;&quot;&quot;
USER_PROMPT = f&quot;&quot;&quot;
Use the following pieces of information enclosed in &lt;context&gt; tags to provide an answer to the question enclosed in &lt;question&gt; tags.
&lt;context&gt;
{context}
&lt;/context&gt;
&lt;question&gt;
{question}
&lt;/question&gt;
&quot;&quot;&quot;
</code></pre>
<p>使用 LLM 根據提示產生回應。我們將<code translate="no">model</code> 參數設定為<code translate="no">not-used</code> ，因為它是 llama.cpp 服務的多餘參數。</p>
<pre><code translate="no" class="language-python">response = llm_client.chat.completions.create(
    model=<span class="hljs-string">&quot;not-used&quot;</span>,
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: SYSTEM_PROMPT},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: USER_PROMPT},
    ],
)
<span class="hljs-built_in">print</span>(response.choices[<span class="hljs-number">0</span>].message.content)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Milvus stores data in two types: inserted data and metadata. Inserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends such as MinIO, AWS S3, Google Cloud Storage (GCS), Azure Blob Storage, Alibaba Cloud OSS, and Tencent Cloud Object Storage (COS). Metadata are generated within Milvus and each Milvus module has its own metadata that are stored in etcd.
</code></pre>
<p>恭喜您！您已經在以 Arm 為基礎的基礎架構之上建立了一個 RAG 應用程式。</p>
