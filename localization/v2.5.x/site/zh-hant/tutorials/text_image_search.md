---
id: text_image_search.md
summary: >-
  在本教程中，我們將探討如何使用 OpenAI 的 CLIP (Contrastive Language-Image Pretraining) 模型和
  Milvus 實現基於文字的圖像檢索。我們將透過 CLIP 產生圖片嵌入，將圖片嵌入儲存於 Milvus，並執行有效率的相似性搜尋。
title: 使用 Milvus 進行文字轉圖像搜尋
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/text_image_search_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/text_image_search_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Text-to-Image-Search-with-Milvus" class="common-anchor-header">使用 Milvus 進行文字轉圖像搜尋<button data-href="#Text-to-Image-Search-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>文字到圖像搜尋是一項先進的技術，可讓使用者使用自然語言文字描述搜尋圖像。它利用預先訓練的多模態模型，將文字和圖像轉換成共享語意空間中的嵌入，從而實現基於相似性的比較。</p>
<p>在本教程中，我們將探討如何使用 OpenAI 的 CLIP (Contrastive Language-Image Pretraining) 模型和 Milvus 來實現基於文字的圖像檢索。我們將透過 CLIP 產生圖片嵌入，將圖片嵌入儲存在 Milvus 中，並執行有效率的相似性檢索。</p>
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
    </button></h2><p>在開始之前，請確認您已準備好所有所需的套件和範例資料。</p>
<h3 id="Install-dependencies" class="common-anchor-header">安裝相依性</h3><ul>
<li><strong>pymilvus&gt;=2.4.2</strong>用於與 Milvus 資料庫互動</li>
<li><strong>clip</strong>用於 CLIP 模型</li>
<li><strong>pillow</strong>用於圖像處理和可視化</li>
</ul>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus pillow</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install git+https://github.com/openai/CLIP.git</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>如果您使用的是 Google Colab，可能需要<strong>重新啟動運行時</strong>（導航到介面上方的「Runtime」功能表，並從下拉式功能表中選擇「Restart session」）。</p>
</div>
<h3 id="Download-example-data" class="common-anchor-header">下載範例資料</h3><p>我們將使用<a href="https://www.image-net.org">ImageNet</a>資料集（100 個類別，每個類別 10 張圖像）的子集作為範例圖像。以下命令將下載範例資料，並將其解壓縮到本機資料夾<code translate="no">./images_folder</code> ：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/towhee-io/examples/releases/download/data/reverse_image_search.zip</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">unzip -q reverse_image_search.zip -d images_folder</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-up-Milvus" class="common-anchor-header">設定 Milvus</h3><p>在繼續之前，請設定您的 Milvus 伺服器，並使用您的 URI (以及可選的令牌) 連線：</p>
<ul>
<li><p><strong>Milvus Lite (為方便起見推薦使用)：</strong>將 URI 設定為本機檔案，例如 ./milvus.db。這會自動利用<a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>將所有資料儲存在單一檔案中。</p></li>
<li><p><strong>Docker 或 Kubernetes (適用於大型資料)：</strong>若要處理較大的資料集，請使用<a href="https://milvus.io/docs/quickstart.md">Docker 或 Kubernetes</a> 部署效能較高的 Milvus 伺服器。在這種情況下，請使用伺服器 URI 連線，例如 http://localhost:19530。</p></li>
<li><p><strong>Zilliz Cloud (管理服務)：</strong>如果您使用的是<a href="https://zilliz.com/cloud">Zilliz Cloud</a>，Milvus 的完全管理雲端服務，請將公共端點設定為 URI，並將 API Key 設定為 token。</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;milvus.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Getting-Started" class="common-anchor-header">開始使用<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><p>現在您已經擁有必要的相依性與資料，是時候設定功能擷取器並開始使用 Milvus。本節將介紹建立文字到圖片搜尋系統的關鍵步驟。最後，我們將示範如何根據文字查詢擷取圖片並將其視覺化。</p>
<h3 id="Define-feature-extractors" class="common-anchor-header">定義特徵萃取器</h3><p>我們將使用預先訓練好的 CLIP 模型來產生圖像和文字嵌入。在本節中，我們將載入 CLIP 的預訓<strong>ViT-B/32</strong>變體，並定義用於編碼圖像和文字的輔助函式：</p>
<ul>
<li><code translate="no">encode_image(image_path)</code>:處理影像並將其編碼為特徵向量</li>
<li><code translate="no">encode_text(text)</code>:將文字查詢編碼為特徵向量</li>
</ul>
<p>這兩個函式都會將輸出的特徵歸一化，以確保透過將向量轉換為單位長度來進行一致的比較，這對於精確的余弦相似度計算非常重要。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> clip
<span class="hljs-keyword">from</span> PIL <span class="hljs-keyword">import</span> Image


<span class="hljs-comment"># Load CLIP model</span>
model_name = <span class="hljs-string">&quot;ViT-B/32&quot;</span>
model, preprocess = clip.load(model_name)
model.<span class="hljs-built_in">eval</span>()


<span class="hljs-comment"># Define a function to encode images</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_image</span>(<span class="hljs-params">image_path</span>):
    image = preprocess(Image.<span class="hljs-built_in">open</span>(image_path)).unsqueeze(<span class="hljs-number">0</span>)
    image_features = model.encode_image(image)
    image_features /= image_features.norm(
        dim=-<span class="hljs-number">1</span>, keepdim=<span class="hljs-literal">True</span>
    )  <span class="hljs-comment"># Normalize the image features</span>
    <span class="hljs-keyword">return</span> image_features.squeeze().tolist()


<span class="hljs-comment"># Define a function to encode text</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_text</span>(<span class="hljs-params">text</span>):
    text_tokens = clip.tokenize(text)
    text_features = model.encode_text(text_tokens)
    text_features /= text_features.norm(
        dim=-<span class="hljs-number">1</span>, keepdim=<span class="hljs-literal">True</span>
    )  <span class="hljs-comment"># Normalize the text features</span>
    <span class="hljs-keyword">return</span> text_features.squeeze().tolist()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Data-Ingestion" class="common-anchor-header">資料輸入</h3><p>為了實現語義圖像搜尋，我們首先需要為所有圖像產生嵌入，並將它們儲存到向量資料庫中，以便進行有效的索引和檢索。本節將逐步介紹如何將圖像資料導入 Milvus。</p>
<p><strong>1.建立 Milvus 套件</strong></p>
<p>在儲存影像嵌入之前，您需要先建立一個 Milvus 套件。以下程式碼示範如何以預設的 COSINE 公制類型，在快速設定模式下建立一個集合。集合包含以下欄位：</p>
<ul>
<li><p><code translate="no">id</code>:啟用自動 ID 的主要欄位。</p></li>
<li><p><code translate="no">vector</code>:一個用來儲存浮點向量嵌入的欄位。</p></li>
</ul>
<p>如果您需要自訂模式，請參閱<a href="https://milvus.io/docs/create-collection.md">Milvus 文件</a>以取得詳細說明。</p>
<pre><code translate="no" class="language-python">collection_name = <span class="hljs-string">&quot;image_collection&quot;</span>

<span class="hljs-comment"># Drop the collection if it already exists</span>
<span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)

<span class="hljs-comment"># Create a new collection in quickstart mode</span>
milvus_client.create_collection(
    collection_name=collection_name,
    dimension=<span class="hljs-number">512</span>,  <span class="hljs-comment"># this should match the dimension of the image embedding</span>
    auto_id=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># auto generate id and store in the id field</span>
    enable_dynamic_field=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># enable dynamic field for scalar fields</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>2.將資料插入 Milvus</strong></p>
<p>在這個步驟中，我們使用預先定義的影像編碼器，為範例資料目錄中的所有 JPEG 影像產生內嵌。然後，這些內嵌會連同相對應的檔案路徑一起插入 Milvus 資料集中。集合中的每個項目包括</p>
<ul>
<li><strong>嵌入向量</strong>：影像的數值表示。儲存於欄位<code translate="no">vector</code> 。</li>
<li><strong>檔案路徑</strong>：影像檔案的位置，以供參考。以動態欄位儲存於<code translate="no">filepath</code> 。</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob


image_dir = <span class="hljs-string">&quot;./images_folder/train&quot;</span>
raw_data = []

<span class="hljs-keyword">for</span> image_path <span class="hljs-keyword">in</span> glob(os.path.join(image_dir, <span class="hljs-string">&quot;**/*.JPEG&quot;</span>)):
    image_embedding = encode_image(image_path)
    image_dict = {<span class="hljs-string">&quot;vector&quot;</span>: image_embedding, <span class="hljs-string">&quot;filepath&quot;</span>: image_path}
    raw_data.append(image_dict)
insert_result = milvus_client.insert(collection_name=collection_name, data=raw_data)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Inserted&quot;</span>, insert_result[<span class="hljs-string">&quot;insert_count&quot;</span>], <span class="hljs-string">&quot;images into Milvus.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Inserted 1000 images into Milvus.
</code></pre>
<h3 id="Peform-a-Search" class="common-anchor-header">執行搜尋</h3><p>現在，讓我們使用範例文字查詢執行搜尋。這將根據圖片與給定文字描述的語意相似度，擷取最相關的圖片。</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;a white dog&quot;</span>
query_embedding = encode_text(query_text)

search_results = milvus_client.search(
    collection_name=collection_name,
    data=[query_embedding],
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># return top 10 results</span>
    output_fields=[<span class="hljs-string">&quot;filepath&quot;</span>],  <span class="hljs-comment"># return the filepath field</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>可視化結果：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> IPython.display <span class="hljs-keyword">import</span> display


width = <span class="hljs-number">150</span> * <span class="hljs-number">5</span>
height = <span class="hljs-number">150</span> * <span class="hljs-number">2</span>
concatenated_image = Image.new(<span class="hljs-string">&quot;RGB&quot;</span>, (width, height))

result_images = []
<span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> search_results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> result:
        filename = hit[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;filepath&quot;</span>]
        img = Image.<span class="hljs-built_in">open</span>(filename)
        img = img.resize((<span class="hljs-number">150</span>, <span class="hljs-number">150</span>))
        result_images.append(img)

<span class="hljs-keyword">for</span> idx, img <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(result_images):
    x = idx % <span class="hljs-number">5</span>
    y = idx // <span class="hljs-number">5</span>
    concatenated_image.paste(img, (x * <span class="hljs-number">150</span>, y * <span class="hljs-number">150</span>))
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Query text: <span class="hljs-subst">{query_text}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\nSearch results:&quot;</span>)
display(concatenated_image)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Query text: a white dog

Search results:
</code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/text_image_search_with_milvus_20_1.png" alt="png" class="doc-image" id="png" />
   </span> <span class="img-wrapper"> <span>png</span> </span></p>
