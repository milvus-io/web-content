---
id: multimodal_rag_with_milvus.md
summary: 使用 Milvus 的多模式 RAG
title: 使用 Milvus 的多模式 RAG
---
<h1 id="Multimodal-RAG-with-Milvus" class="common-anchor-header">使用 Milvus 的多模式 RAG<button data-href="#Multimodal-RAG-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/multimodal_rag_with_milvus.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/multimodal_rag_with_milvus.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p><img translate="no" src="https://raw.githubusercontent.com/milvus-io/bootcamp/master/bootcamp/tutorials/quickstart/apps/multimodal_rag_with_milvus/pics/step3.jpg
"/></p>
<p>本教學展示由 Milvus、<a href="https://github.com/FlagOpen/FlagEmbedding/tree/master/FlagEmbedding/visual">可視化 BGE 模型</a>和<a href="https://openai.com/index/hello-gpt-4o/">GPT-4o</a> 所提供的多模式 RAG。使用此系統，使用者可以上傳圖片並編輯文字說明，由 BGE 的組成檢索模型處理，以搜尋候選圖片。然後，GPT-4o 會扮演重新篩選者的角色，選出最適合的影像，並提供選擇背後的理由。這種強大的組合可實現無縫且直觀的圖像搜尋體驗，利用 Milvus 進行高效率的檢索，利用 BGE 模型進行精確的圖像處理和匹配，並利用 GPT-4o 進行先進的重新排序。</p>
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
    </button></h2><h3 id="Install-Dependencies" class="common-anchor-header">安裝相依性</h3><pre><code translate="no" class="language-shell">$ pip install --upgrade pymilvus openai datasets opencv-python timm einops ftfy peft tqdm
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">$ git <span class="hljs-built_in">clone</span> https://github.com/FlagOpen/FlagEmbedding.git
$ pip install -e FlagEmbedding
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>如果您正在使用 Google Colab，為了啟用剛安裝的相依性，您可能需要<strong>重新啟動執行時</strong>（點選畫面頂端的「Runtime」功能表，並從下拉式功能表中選擇「Restart session」）。</p>
</div>
<h3 id="Download-Data" class="common-anchor-header">下載資料</h3><p>以下指令會下載範例資料，並解壓縮到本機資料夾「./images_folder」，包括</p>
<ul>
<li><p><strong>images</strong>：<a href="https://github.com/hyp1231/AmazonReviews2023">Amazon Reviews 2023</a>的子集，包含「Appliance」、「Cell_Phones_and_Accessories」和「Electronics」類別中約 900 張圖片。</p></li>
<li><p><strong>leopard.jpg</strong>: 範例查詢影像。</p></li>
</ul>
<pre><code translate="no" class="language-shell">$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//github.com/milvus-io/bootcamp/releases/download/data/amazon_reviews_2023_subset.tar.gz</span>
$ tar -xzf amazon_reviews_2023_subset.<span class="hljs-property">tar</span>.<span class="hljs-property">gz</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Load-Embedding-Model" class="common-anchor-header">載入嵌入模型</h3><p>我們將使用 Visualized BGE 模型「bge-visualized-base-en-v1.5」來產生圖像和文字的嵌入。</p>
<p><strong>1.下載權重</strong></p>
<pre><code translate="no" class="language-shell">$ wget https://huggingface.co/BAAI/bge-visualized/resolve/main/Visualized_base_en_v1.5.pth
<button class="copy-code-btn"></button></code></pre>
<p><strong>2.建立編碼器</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> torch
<span class="hljs-keyword">from</span> FlagEmbedding.visual.modeling <span class="hljs-keyword">import</span> Visualized_BGE


<span class="hljs-keyword">class</span> <span class="hljs-title class_">Encoder</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, model_name: <span class="hljs-built_in">str</span>, model_path: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-variable language_">self</span>.model = Visualized_BGE(model_name_bge=model_name, model_weight=model_path)
        <span class="hljs-variable language_">self</span>.model.<span class="hljs-built_in">eval</span>()

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_query</span>(<span class="hljs-params">self, image_path: <span class="hljs-built_in">str</span>, text: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">list</span>[<span class="hljs-built_in">float</span>]:
        <span class="hljs-keyword">with</span> torch.no_grad():
            query_emb = <span class="hljs-variable language_">self</span>.model.encode(image=image_path, text=text)
        <span class="hljs-keyword">return</span> query_emb.tolist()[<span class="hljs-number">0</span>]

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_image</span>(<span class="hljs-params">self, image_path: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">list</span>[<span class="hljs-built_in">float</span>]:
        <span class="hljs-keyword">with</span> torch.no_grad():
            query_emb = <span class="hljs-variable language_">self</span>.model.encode(image=image_path)
        <span class="hljs-keyword">return</span> query_emb.tolist()[<span class="hljs-number">0</span>]


model_name = <span class="hljs-string">&quot;BAAI/bge-base-en-v1.5&quot;</span>
model_path = <span class="hljs-string">&quot;./Visualized_base_en_v1.5.pth&quot;</span>  <span class="hljs-comment"># Change to your own value if using a different model path</span>
encoder = Encoder(model_name, model_path)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Load-Data" class="common-anchor-header">載入資料<button data-href="#Load-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>本節將把範例圖片載入資料庫，並載入相應的嵌入式資料。</p>
<h3 id="Generate-embeddings" class="common-anchor-header">生成嵌入式</h3><p>從資料目錄載入所有 jpeg 圖片，並應用編碼器將圖片轉換為嵌入資料。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm
<span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob


<span class="hljs-comment"># Generate embeddings for the image dataset</span>
data_dir = (
    <span class="hljs-string">&quot;./images_folder&quot;</span>  <span class="hljs-comment"># Change to your own value if using a different data directory</span>
)
image_list = glob(
    os.path.join(data_dir, <span class="hljs-string">&quot;images&quot;</span>, <span class="hljs-string">&quot;*.jpg&quot;</span>)
)  <span class="hljs-comment"># We will only use images ending with &quot;.jpg&quot;</span>
image_dict = {}
<span class="hljs-keyword">for</span> image_path <span class="hljs-keyword">in</span> tqdm(image_list, desc=<span class="hljs-string">&quot;Generating image embeddings: &quot;</span>):
    <span class="hljs-keyword">try</span>:
        image_dict[image_path] = encoder.encode_image(image_path)
    <span class="hljs-keyword">except</span> Exception <span class="hljs-keyword">as</span> e:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Failed to generate embedding for <span class="hljs-subst">{image_path}</span>. Skipped.&quot;</span>)
        <span class="hljs-keyword">continue</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Number of encoded images:&quot;</span>, <span class="hljs-built_in">len</span>(image_dict))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Generating image embeddings: 100%|██████████| 900/900 [00:20&lt;00:00, 44.08it/s]

Number of encoded images: 900
</code></pre>
<h3 id="Insert-into-Milvus" class="common-anchor-header">插入到 Milvus</h3><p>將圖片連同相對應的路徑和嵌入資料插入 Milvus 資料庫。</p>
<div class="alert note">
<p>至於<code translate="no">MilvusClient</code> 的參數：</p>
<ul>
<li>將<code translate="no">uri</code> 設定為本機檔案，例如<code translate="no">./milvus_demo.db</code> ，是最方便的方法，因為它會自動利用<a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>將所有資料儲存在這個檔案中。</li>
<li>如果您有大規模的資料，您可以在<a href="https://milvus.io/docs/quickstart.md">docker 或 kubernetes</a> 上架設效能更高的 Milvus 伺服器。在此設定中，請使用伺服器的 uri，例如<code translate="no">http://localhost:19530</code> ，作為您的<code translate="no">uri</code> 。</li>
<li>如果您想使用<a href="https://zilliz.com/cloud">Zilliz Cloud</a>（Milvus 的完全管理<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">雲端</a>服務），請調整<code translate="no">uri</code> 和<code translate="no">token</code> ，與 Zilliz Cloud 的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint 和 Api key</a>對應。</li>
</ul>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient


dim = <span class="hljs-built_in">len</span>(<span class="hljs-built_in">list</span>(image_dict.values())[<span class="hljs-number">0</span>])
collection_name = <span class="hljs-string">&quot;multimodal_rag_demo&quot;</span>

<span class="hljs-comment"># Connect to Milvus client given URI</span>
milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)

<span class="hljs-comment"># Create Milvus Collection</span>
<span class="hljs-comment"># By default, vector field name is &quot;vector&quot;</span>
milvus_client.create_collection(
    collection_name=collection_name,
    auto_id=<span class="hljs-literal">True</span>,
    dimension=dim,
    enable_dynamic_field=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Insert data into collection</span>
milvus_client.insert(
    collection_name=collection_name,
    data=[{<span class="hljs-string">&quot;image_path&quot;</span>: k, <span class="hljs-string">&quot;vector&quot;</span>: v} <span class="hljs-keyword">for</span> k, v <span class="hljs-keyword">in</span> image_dict.items()],
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'insert_count': 900,
 'ids': [451537887696781312, 451537887696781313, ..., 451537887696782211],
 'cost': 0}
</code></pre>
<h2 id="Multimodal-Search-with-Generative-Reranker" class="common-anchor-header">使用生成式重排器進行多模態搜尋<button data-href="#Multimodal-Search-with-Generative-Reranker" class="anchor-icon" translate="no">
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
    </button></h2><p>在本節中，我們會先使用多模態查詢搜尋相關的圖片，然後再使用 LLM 服務將結果重新排序，找出最佳的圖片並解釋。</p>
<h3 id="Run-search" class="common-anchor-header">執行搜尋</h3><p>現在我們準備好以圖片和文字指令組成的查詢資料執行進階圖片搜尋。</p>
<pre><code translate="no" class="language-python">query_image = os.path.join(
    data_dir, <span class="hljs-string">&quot;leopard.jpg&quot;</span>
)  <span class="hljs-comment"># Change to your own query image path</span>
query_text = <span class="hljs-string">&quot;phone case with this image theme&quot;</span>

<span class="hljs-comment"># Generate query embedding given image and text instructions</span>
query_vec = encoder.encode_query(image_path=query_image, text=query_text)

search_results = milvus_client.search(
    collection_name=collection_name,
    data=[query_vec],
    output_fields=[<span class="hljs-string">&quot;image_path&quot;</span>],
    limit=<span class="hljs-number">9</span>,  <span class="hljs-comment"># Max number of search results to return</span>
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}},  <span class="hljs-comment"># Search parameters</span>
)[<span class="hljs-number">0</span>]

retrieved_images = [hit.get(<span class="hljs-string">&quot;entity&quot;</span>).get(<span class="hljs-string">&quot;image_path&quot;</span>) <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> search_results]
<span class="hljs-built_in">print</span>(retrieved_images)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">['./images_folder/images/518Gj1WQ-RL._AC_.jpg', './images_folder/images/41n00AOfWhL._AC_.jpg', './images_folder/images/51Wqge9HySL._AC_.jpg', './images_folder/images/51R2SZiywnL._AC_.jpg', './images_folder/images/516PebbMAcL._AC_.jpg', './images_folder/images/51RrgfYKUfL._AC_.jpg', './images_folder/images/515DzQVKKwL._AC_.jpg', './images_folder/images/51BsgVw6RhL._AC_.jpg', './images_folder/images/51INtcXu9FL._AC_.jpg']
</code></pre>
<h3 id="Rerank-with-GPT-4o" class="common-anchor-header">使用 GPT-4o 重新排序</h3><p>我們將根據使用者的查詢和擷取的結果，使用 LLM 對影像進行排序，並產生最佳結果的說明。</p>
<p><strong>1.建立全景圖</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
<span class="hljs-keyword">import</span> cv2

img_height = <span class="hljs-number">300</span>
img_width = <span class="hljs-number">300</span>
row_count = <span class="hljs-number">3</span>


<span class="hljs-keyword">def</span> <span class="hljs-title function_">create_panoramic_view</span>(<span class="hljs-params">query_image_path: <span class="hljs-built_in">str</span>, retrieved_images: <span class="hljs-built_in">list</span></span>) -&gt; np.ndarray:
    <span class="hljs-string">&quot;&quot;&quot;
    creates a 5x5 panoramic view image from a list of images

    args:
        images: list of images to be combined

    returns:
        np.ndarray: the panoramic view image
    &quot;&quot;&quot;</span>
    panoramic_width = img_width * row_count
    panoramic_height = img_height * row_count
    panoramic_image = np.full(
        (panoramic_height, panoramic_width, <span class="hljs-number">3</span>), <span class="hljs-number">255</span>, dtype=np.uint8
    )

    <span class="hljs-comment"># create and resize the query image with a blue border</span>
    query_image_null = np.full((panoramic_height, img_width, <span class="hljs-number">3</span>), <span class="hljs-number">255</span>, dtype=np.uint8)
    query_image = Image.<span class="hljs-built_in">open</span>(query_image_path).convert(<span class="hljs-string">&quot;RGB&quot;</span>)
    query_array = np.array(query_image)[:, :, ::-<span class="hljs-number">1</span>]
    resized_image = cv2.resize(query_array, (img_width, img_height))

    border_size = <span class="hljs-number">10</span>
    blue = (<span class="hljs-number">255</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>)  <span class="hljs-comment"># blue color in BGR</span>
    bordered_query_image = cv2.copyMakeBorder(
        resized_image,
        border_size,
        border_size,
        border_size,
        border_size,
        cv2.BORDER_CONSTANT,
        value=blue,
    )

    query_image_null[img_height * <span class="hljs-number">2</span> : img_height * <span class="hljs-number">3</span>, <span class="hljs-number">0</span>:img_width] = cv2.resize(
        bordered_query_image, (img_width, img_height)
    )

    <span class="hljs-comment"># add text &quot;query&quot; below the query image</span>
    text = <span class="hljs-string">&quot;query&quot;</span>
    font_scale = <span class="hljs-number">1</span>
    font_thickness = <span class="hljs-number">2</span>
    text_org = (<span class="hljs-number">10</span>, img_height * <span class="hljs-number">3</span> + <span class="hljs-number">30</span>)
    cv2.putText(
        query_image_null,
        text,
        text_org,
        cv2.FONT_HERSHEY_SIMPLEX,
        font_scale,
        blue,
        font_thickness,
        cv2.LINE_AA,
    )

    <span class="hljs-comment"># combine the rest of the images into the panoramic view</span>
    retrieved_imgs = [
        np.array(Image.<span class="hljs-built_in">open</span>(img).convert(<span class="hljs-string">&quot;RGB&quot;</span>))[:, :, ::-<span class="hljs-number">1</span>] <span class="hljs-keyword">for</span> img <span class="hljs-keyword">in</span> retrieved_images
    ]
    <span class="hljs-keyword">for</span> i, image <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(retrieved_imgs):
        image = cv2.resize(image, (img_width - <span class="hljs-number">4</span>, img_height - <span class="hljs-number">4</span>))
        row = i // row_count
        col = i % row_count
        start_row = row * img_height
        start_col = col * img_width

        border_size = <span class="hljs-number">2</span>
        bordered_image = cv2.copyMakeBorder(
            image,
            border_size,
            border_size,
            border_size,
            border_size,
            cv2.BORDER_CONSTANT,
            value=(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>),
        )
        panoramic_image[
            start_row : start_row + img_height, start_col : start_col + img_width
        ] = bordered_image

        <span class="hljs-comment"># add red index numbers to each image</span>
        text = <span class="hljs-built_in">str</span>(i)
        org = (start_col + <span class="hljs-number">50</span>, start_row + <span class="hljs-number">30</span>)
        (font_width, font_height), baseline = cv2.getTextSize(
            text, cv2.FONT_HERSHEY_SIMPLEX, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>
        )

        top_left = (org[<span class="hljs-number">0</span>] - <span class="hljs-number">48</span>, start_row + <span class="hljs-number">2</span>)
        bottom_right = (org[<span class="hljs-number">0</span>] - <span class="hljs-number">48</span> + font_width + <span class="hljs-number">5</span>, org[<span class="hljs-number">1</span>] + baseline + <span class="hljs-number">5</span>)

        cv2.rectangle(
            panoramic_image, top_left, bottom_right, (<span class="hljs-number">255</span>, <span class="hljs-number">255</span>, <span class="hljs-number">255</span>), cv2.FILLED
        )
        cv2.putText(
            panoramic_image,
            text,
            (start_col + <span class="hljs-number">10</span>, start_row + <span class="hljs-number">30</span>),
            cv2.FONT_HERSHEY_SIMPLEX,
            <span class="hljs-number">1</span>,
            (<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">255</span>),
            <span class="hljs-number">2</span>,
            cv2.LINE_AA,
        )

    <span class="hljs-comment"># combine the query image with the panoramic view</span>
    panoramic_image = np.hstack([query_image_null, panoramic_image])
    <span class="hljs-keyword">return</span> panoramic_image
<button class="copy-code-btn"></button></code></pre>
<p>將查詢的圖片和擷取的圖片與索引結合為全景檢視。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> PIL <span class="hljs-keyword">import</span> Image

combined_image_path = os.path.join(data_dir, <span class="hljs-string">&quot;combined_image.jpg&quot;</span>)
panoramic_image = create_panoramic_view(query_image, retrieved_images)
cv2.imwrite(combined_image_path, panoramic_image)

combined_image = Image.<span class="hljs-built_in">open</span>(combined_image_path)
show_combined_image = combined_image.resize((<span class="hljs-number">300</span>, <span class="hljs-number">300</span>))
show_combined_image.show()
<button class="copy-code-btn"></button></code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/multimodal_rag_with_milvus_22_0.png" alt="Create a panoramic view" class="doc-image" id="create-a-panoramic-view" />
   </span> <span class="img-wrapper"> <span>建立全景檢視</span> </span></p>
<p><strong>2.重新排名與說明</strong></p>
<p>我們會將合併後的影像傳送至多模態 LLM 服務，並附上適當的提示，以便對檢索結果進行排序與說明。若要啟用 GPT-4o 作為 LLM，您需要準備<a href="https://platform.openai.com/docs/quickstart">OpenAI API Key</a>。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> requests
<span class="hljs-keyword">import</span> base64

openai_api_key = <span class="hljs-string">&quot;sk-***&quot;</span>  <span class="hljs-comment"># Change to your OpenAI API Key</span>


<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_ranking_explanation</span>(<span class="hljs-params">
    combined_image_path: <span class="hljs-built_in">str</span>, caption: <span class="hljs-built_in">str</span>, infos: <span class="hljs-built_in">dict</span> = <span class="hljs-literal">None</span>
</span>) -&gt; <span class="hljs-built_in">tuple</span>[<span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>], <span class="hljs-built_in">str</span>]:
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(combined_image_path, <span class="hljs-string">&quot;rb&quot;</span>) <span class="hljs-keyword">as</span> image_file:
        base64_image = base64.b64encode(image_file.read()).decode(<span class="hljs-string">&quot;utf-8&quot;</span>)

    information = (
        <span class="hljs-string">&quot;You are responsible for ranking results for a Composed Image Retrieval. &quot;</span>
        <span class="hljs-string">&quot;The user retrieves an image with an &#x27;instruction&#x27; indicating their retrieval intent. &quot;</span>
        <span class="hljs-string">&quot;For example, if the user queries a red car with the instruction &#x27;change this car to blue,&#x27; a similar type of car in blue would be ranked higher in the results. &quot;</span>
        <span class="hljs-string">&quot;Now you would receive instruction and query image with blue border. Every item has its red index number in its top left. Do not misunderstand it. &quot;</span>
        <span class="hljs-string">f&quot;User instruction: <span class="hljs-subst">{caption}</span> \n\n&quot;</span>
    )

    <span class="hljs-comment"># add additional information for each image</span>
    <span class="hljs-keyword">if</span> infos:
        <span class="hljs-keyword">for</span> i, info <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(infos[<span class="hljs-string">&quot;product&quot;</span>]):
            information += <span class="hljs-string">f&quot;<span class="hljs-subst">{i}</span>. <span class="hljs-subst">{info}</span>\n&quot;</span>

    information += (
        <span class="hljs-string">&quot;Provide a new ranked list of indices from most suitable to least suitable, followed by an explanation for the top 1 most suitable item only. &quot;</span>
        <span class="hljs-string">&quot;The format of the response has to be &#x27;Ranked list: []&#x27; with the indices in brackets as integers, followed by &#x27;Reasons:&#x27; plus the explanation why this most fit user&#x27;s query intent.&quot;</span>
    )

    headers = {
        <span class="hljs-string">&quot;Content-Type&quot;</span>: <span class="hljs-string">&quot;application/json&quot;</span>,
        <span class="hljs-string">&quot;Authorization&quot;</span>: <span class="hljs-string">f&quot;Bearer <span class="hljs-subst">{openai_api_key}</span>&quot;</span>,
    }

    payload = {
        <span class="hljs-string">&quot;model&quot;</span>: <span class="hljs-string">&quot;gpt-4o&quot;</span>,
        <span class="hljs-string">&quot;messages&quot;</span>: [
            {
                <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>,
                <span class="hljs-string">&quot;content&quot;</span>: [
                    {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>: information},
                    {
                        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;image_url&quot;</span>,
                        <span class="hljs-string">&quot;image_url&quot;</span>: {<span class="hljs-string">&quot;url&quot;</span>: <span class="hljs-string">f&quot;data:image/jpeg;base64,<span class="hljs-subst">{base64_image}</span>&quot;</span>},
                    },
                ],
            }
        ],
        <span class="hljs-string">&quot;max_tokens&quot;</span>: <span class="hljs-number">300</span>,
    }

    response = requests.post(
        <span class="hljs-string">&quot;https://api.openai.com/v1/chat/completions&quot;</span>, headers=headers, json=payload
    )
    result = response.json()[<span class="hljs-string">&quot;choices&quot;</span>][<span class="hljs-number">0</span>][<span class="hljs-string">&quot;message&quot;</span>][<span class="hljs-string">&quot;content&quot;</span>]

    <span class="hljs-comment"># parse the ranked indices from the response</span>
    start_idx = result.find(<span class="hljs-string">&quot;[&quot;</span>)
    end_idx = result.find(<span class="hljs-string">&quot;]&quot;</span>)
    ranked_indices_str = result[start_idx + <span class="hljs-number">1</span> : end_idx].split(<span class="hljs-string">&quot;,&quot;</span>)
    ranked_indices = [<span class="hljs-built_in">int</span>(index.strip()) <span class="hljs-keyword">for</span> index <span class="hljs-keyword">in</span> ranked_indices_str]

    <span class="hljs-comment"># extract explanation</span>
    explanation = result[end_idx + <span class="hljs-number">1</span> :].strip()

    <span class="hljs-keyword">return</span> ranked_indices, explanation
<button class="copy-code-btn"></button></code></pre>
<p>取得排序後的影像指數，以及最佳結果的原因：</p>
<pre><code translate="no" class="language-python">ranked_indices, explanation = generate_ranking_explanation(
    combined_image_path, query_text
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>3.顯示最佳結果並解釋</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">print</span>(explanation)

best_index = ranked_indices[<span class="hljs-number">0</span>]
best_img = Image.<span class="hljs-built_in">open</span>(retrieved_images[best_index])
best_img = best_img.resize((<span class="hljs-number">150</span>, <span class="hljs-number">150</span>))
best_img.show()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Reasons: The most suitable item for the user's query intent is index 6 because the instruction specifies a phone case with the theme of the image, which is a leopard. The phone case with index 6 has a thematic design resembling the leopard pattern, making it the closest match to the user's request for a phone case with the image theme.
</code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/multimodal_rag_with_milvus_28_1.png" alt="The best result" class="doc-image" id="the-best-result" />
   </span> <span class="img-wrapper"> <span>最佳結果</span> </span></p>
<h3 id="Quick-Deploy" class="common-anchor-header">快速部署</h3><p>若要瞭解如何使用本教學開始線上演示，請參閱<a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/tutorials/quickstart/apps/multimodal_rag_with_milvus">範例應用程式</a>。</p>
