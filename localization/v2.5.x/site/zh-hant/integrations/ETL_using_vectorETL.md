---
id: ETL_using_vectorETL.md
summary: >-
  在本教程中，我們將探討如何使用
  [VectorETL](https://github.com/ContextData/VectorETL)，一個專為向量資料庫設計的輕量級 ETL
  框架，有效率地將資料載入 Milvus。VectorETL 簡化了從各種來源擷取資料的流程，使用 AI 模型將資料轉換成向量嵌入，並儲存在 Milvus
  中，以進行快速且可擴充的擷取。本教學結束時，您將擁有一個可運作的 ETL 管道，讓您輕鬆整合和管理向量搜尋系統。讓我們深入瞭解！
title: 使用 VectorETL 有效率地將資料載入 Milvus
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/ETL_using_vectorETL.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/ETL_using_vectorETL.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Efficient-Data-Loading-into-Milvus-with-VectorETL" class="common-anchor-header">使用 VectorETL 有效率地將資料載入 Milvus<button data-href="#Efficient-Data-Loading-into-Milvus-with-VectorETL" class="anchor-icon" translate="no">
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
    </button></h1><p>在本教程中，我們將探討如何使用<a href="https://github.com/ContextData/VectorETL">VectorETL</a>（一個專為向量資料庫設計的輕量級 ETL 框架）將資料有效地載入 Milvus。VectorETL 簡化了從各種來源擷取資料的流程，使用 AI 模型將資料轉換成向量嵌入，並儲存在 Milvus 中，以進行快速且可擴充的擷取。本教學結束時，您將擁有一個可運作的 ETL 管道，讓您輕鬆整合和管理向量搜尋系統。讓我們深入瞭解！</p>
<h2 id="Preparation" class="common-anchor-header">準備工作<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Dependency-and-Environment" class="common-anchor-header">依賴與環境</h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade vector-etl pymilvus</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>如果您使用的是 Google Colab，為了啟用剛安裝的依賴，您可能需要<strong>重新啟動運行時</strong>（點選畫面上方的「Runtime」功能表，從下拉式功能表中選擇「Restart session」）。</p>
</div>
<p>VectorETL 支援多種資料來源，包括 Amazon S3、Google Cloud Storage、Local File 等。您可以<a href="https://github.com/ContextData/VectorETL?tab=readme-ov-file#source-configuration">在這裡</a>查看完整的支援來源清單。在本教程中，我們將以 Amazon S3 為資料來源範例。</p>
<p>我們將從 Amazon S3 載入文件。因此，您需要準備<code translate="no">AWS_ACCESS_KEY_ID</code> 和<code translate="no">AWS_SECRET_ACCESS_KEY</code> 作為環境變數，以安全存取您的 S3 資料桶。此外，我們會使用 OpenAI 的<code translate="no">text-embedding-ada-002</code> embedding model 來產生資料的 embeddings。您也應該準備<a href="https://platform.openai.com/docs/quickstart">api key</a> <code translate="no">OPENAI_API_KEY</code> 作為環境變數。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;your-openai-api-key&quot;</span>
os.environ[<span class="hljs-string">&quot;AWS_ACCESS_KEY_ID&quot;</span>] = <span class="hljs-string">&quot;your-aws-access-key-id&quot;</span>
os.environ[<span class="hljs-string">&quot;AWS_SECRET_ACCESS_KEY&quot;</span>] = <span class="hljs-string">&quot;your-aws-secret-access-key&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Workflow" class="common-anchor-header">工作流程<button data-href="#Workflow" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Defining-the-Data-Source-Amazon-S3" class="common-anchor-header">定義資料來源 (Amazon S3)</h3><p>在這個案例中，我們要從 Amazon S3 的資料桶中抽取文件。VectorETL 允許我們指定儲存桶名稱、檔案路徑，以及我們正在處理的資料類型。</p>
<pre><code translate="no" class="language-python">source = {
    <span class="hljs-string">&quot;source_data_type&quot;</span>: <span class="hljs-string">&quot;Amazon S3&quot;</span>,
    <span class="hljs-string">&quot;bucket_name&quot;</span>: <span class="hljs-string">&quot;my-bucket&quot;</span>,
    <span class="hljs-string">&quot;key&quot;</span>: <span class="hljs-string">&quot;path/to/files/&quot;</span>,
    <span class="hljs-string">&quot;file_type&quot;</span>: <span class="hljs-string">&quot;.csv&quot;</span>,
    <span class="hljs-string">&quot;aws_access_key_id&quot;</span>: os.environ[<span class="hljs-string">&quot;AWS_ACCESS_KEY_ID&quot;</span>],
    <span class="hljs-string">&quot;aws_secret_access_key&quot;</span>: os.environ[<span class="hljs-string">&quot;AWS_SECRET_ACCESS_KEY&quot;</span>],
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuring-the-Embedding-Model-OpenAI" class="common-anchor-header">設定嵌入模型 (OpenAI)</h3><p>設定好資料來源後，我們需要定義嵌入模型，將文字資料轉換成向量嵌入。在此範例中，我們使用 OpenAI 的<code translate="no">text-embedding-ada-002</code> 。</p>
<pre><code translate="no" class="language-python">embedding = {
    <span class="hljs-string">&quot;embedding_model&quot;</span>: <span class="hljs-string">&quot;OpenAI&quot;</span>,
    <span class="hljs-string">&quot;api_key&quot;</span>: os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>],
    <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-ada-002&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Setting-Up-Milvus-as-the-Target-Database" class="common-anchor-header">設定 Milvus 為目標資料庫</h3><p>我們需要在 Milvus 中儲存生成的嵌入模型。在此，我們使用 Milvus Lite 定義 Milvus 連線參數。</p>
<pre><code translate="no" class="language-python">target = {
    <span class="hljs-string">&quot;target_database&quot;</span>: <span class="hljs-string">&quot;Milvus&quot;</span>,
    <span class="hljs-string">&quot;host&quot;</span>: <span class="hljs-string">&quot;./milvus.db&quot;</span>,  <span class="hljs-comment"># os.environ[&quot;ZILLIZ_CLOUD_PUBLIC_ENDPOINT&quot;] if using Zilliz Cloud</span>
    <span class="hljs-string">&quot;api_key&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,  <span class="hljs-comment"># os.environ[&quot;ZILLIZ_CLOUD_TOKEN&quot;] if using Zilliz Cloud</span>
    <span class="hljs-string">&quot;collection_name&quot;</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-string">&quot;vector_dim&quot;</span>: <span class="hljs-number">1536</span>,  <span class="hljs-comment"># 1536 for text-embedding-ada-002</span>
}
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>對於<code translate="no">host</code> 和<code translate="no">api_key</code> ：</p>
<ul>
<li><p>將<code translate="no">host</code> 設定為本機檔案，例如<code translate="no">./milvus.db</code> ，並將<code translate="no">api_key</code> 留空是最方便的方法，因為它會自動利用<a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>將所有資料存入這個檔案。</p></li>
<li><p>如果您有大規模的資料，您可以在<a href="https://milvus.io/docs/quickstart.md">docker 或 kubernetes</a> 上架設效能更高的 Milvus 伺服器。在此設定中，請使用伺服器的 uri，例如<code translate="no">http://localhost:19530</code> ，作為您的<code translate="no">host</code> ，並將<code translate="no">api_key</code> 留空。</p></li>
<li><p>如果您要使用<a href="https://zilliz.com/cloud">Zilliz Cloud</a>（Milvus 的完全管理<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">雲端</a>服務），請調整<code translate="no">host</code> 和<code translate="no">api_key</code> ，它們對應於 Zilliz Cloud 的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint 和 Api key</a>。</p></li>
</ul>
</div>
<h3 id="Specifying-Columns-for-Embedding" class="common-anchor-header">指定要嵌入的欄位</h3><p>現在，我們需要指定 CSV 檔案中哪些欄位應該轉換為嵌入內容。這可確保只處理相關的文字欄位，優化效率與儲存。</p>
<pre><code translate="no" class="language-python">embed_columns = [<span class="hljs-string">&quot;col_1&quot;</span>, <span class="hljs-string">&quot;col_2&quot;</span>, <span class="hljs-string">&quot;col_3&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Creating-and-Executing-the-VectorETL-Pipeline" class="common-anchor-header">建立並執行 VectorETL Pipeline</h3><p>所有配置都就緒後，我們現在初始化 ETL 管道、設定資料流並執行它。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> vector_etl <span class="hljs-keyword">import</span> create_flow

flow = create_flow()
flow.set_source(source)
flow.set_embedding(embedding)
flow.set_target(target)
flow.set_embed_columns(embed_columns)

<span class="hljs-comment"># Execute the flow</span>
flow.execute()
<button class="copy-code-btn"></button></code></pre>
<p>按照這個教學，我們成功地建立了一個端對端的 ETL 管道，使用 VectorETL 將文件從 Amazon S3 移到 Milvus。VectorETL 的資料來源非常靈活，您可以依據您特定的應用需求，選擇任何您喜歡的資料來源。透過 VectorETL 的模組化設計，您可以輕鬆擴充此管道，以支援其他資料來源、嵌入模型，使其成為 AI 和資料工程工作流程的強大工具！</p>
