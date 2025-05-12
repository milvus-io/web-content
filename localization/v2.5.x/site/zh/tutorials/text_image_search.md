---
id: text_image_search.md
summary: >-
  在本教程中，我们将探讨如何使用 OpenAI 的 CLIP（对比语言-图像预训练）模型和 Milvus 实现基于文本的图像检索。我们将使用 CLIP
  生成图像嵌入，将其存储在 Milvus 中，并执行高效的相似性搜索。
title: 使用 Milvus 进行文本到图像搜索
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/text_image_search_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/text_image_search_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Text-to-Image-Search-with-Milvus" class="common-anchor-header">使用 Milvus 进行文本到图像搜索<button data-href="#Text-to-Image-Search-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>文本到图像搜索是一种先进的技术，允许用户使用自然语言文本描述搜索图像。它利用预训练的多模态模型将文本和图像转换为共享语义空间中的 Embeddings，从而实现基于相似性的比较。</p>
<p>在本教程中，我们将探讨如何使用 OpenAI 的 CLIP（对比语言-图像预训练）模型和 Milvus 实现基于文本的图像检索。我们将使用 CLIP 生成图像嵌入，将其存储在 Milvus 中，并执行高效的相似性搜索。</p>
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
    </button></h2><p>开始之前，请确保已准备好所有必需的软件包和示例数据。</p>
<h3 id="Install-dependencies" class="common-anchor-header">安装依赖项</h3><ul>
<li><strong>pymilvus&gt;=2.4.2</strong>用于与 Milvus 数据库交互</li>
<li><strong>clip</strong>用于使用 CLIP 模型</li>
<li><strong>pillow</strong>用于图像处理和可视化</li>
</ul>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus pillow</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install git+https://github.com/openai/CLIP.git</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>如果使用的是 Google Colab，可能需要<strong>重启运行时</strong>（导航至界面顶部的 "运行时 "菜单，从下拉菜单中选择 "重启会话"）。</p>
</div>
<h3 id="Download-example-data" class="common-anchor-header">下载示例数据</h3><p>我们将使用<a href="https://www.image-net.org">ImageNet</a>数据集的一个子集（100 个类别，每个类别 10 幅图像）作为示例图像。以下命令将下载示例数据，并将其解压缩到本地文件夹<code translate="no">./images_folder</code> 中：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/towhee-io/examples/releases/download/data/reverse_image_search.zip</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">unzip -q reverse_image_search.zip -d images_folder</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-up-Milvus" class="common-anchor-header">设置 Milvus</h3><p>在继续之前，请设置您的 Milvus 服务器，并使用您的 URI（以及可选的令牌）进行连接：</p>
<ul>
<li><p><strong>Milvus Lite（为方便起见推荐使用）</strong>：将 URI 设置为本地文件，如 ./milvus.db。这会自动利用<a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>将所有数据存储在一个文件中。</p></li>
<li><p><strong>Docker 或 Kubernetes（用于大规模数据）</strong>：要处理更大的数据集，可使用<a href="https://milvus.io/docs/quickstart.md">Docker 或 Kubernetes</a> 部署性能更强的 Milvus 服务器。在这种情况下，请使用服务器 URI（如 http://localhost:19530）进行连接。</p></li>
<li><p><strong>Zilliz Cloud（托管服务）</strong>：如果使用<a href="https://zilliz.com/cloud">Zilliz Cloud</a>（Milvus 的完全托管云服务），请将公共端点设为 URI，将 API Key 设为令牌。</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;milvus.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Getting-Started" class="common-anchor-header">开始使用<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><p>现在您已经有了必要的依赖项和数据，是时候设置功能提取器并开始使用 Milvus 了。本节将引导你完成构建文本到图片搜索系统的关键步骤。最后，我们将演示如何根据文本查询检索图像并将其可视化。</p>
<h3 id="Define-feature-extractors" class="common-anchor-header">定义特征提取器</h3><p>我们将使用预训练的 CLIP 模型来生成图像和文本嵌入。在本节中，我们将加载经过预训练的 CLIP<strong>ViT-B/32</strong>变体，并定义用于图像和文本编码的辅助函数：</p>
<ul>
<li><code translate="no">encode_image(image_path)</code>:将图像处理和编码为特征向量</li>
<li><code translate="no">encode_text(text)</code>:将文本查询编码为特征向量</li>
</ul>
<p>这两个函数都对输出特征进行归一化处理，通过将向量转换为单位长度来确保一致的比较，这对于精确的余弦相似性计算至关重要。</p>
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
<h3 id="Data-Ingestion" class="common-anchor-header">数据输入</h3><p>要实现语义图像搜索，我们首先需要为所有图像生成 Embeddings，并将其存储到向量数据库中，以便进行高效索引和检索。本节将逐步介绍如何将图像数据导入 Milvus。</p>
<p><strong>1.创建 Milvus Collections</strong></p>
<p>在存储图像 Embeddings 之前，需要创建一个 Milvus Collections。下面的代码演示了如何以默认的 COSINE 度量类型在快速设置模式下创建一个 Collection。Collections 包括以下字段：</p>
<ul>
<li><p><code translate="no">id</code>:启用自动 ID 的主字段。</p></li>
<li><p><code translate="no">vector</code>:用于存储浮点向量 Embeddings 的字段。</p></li>
</ul>
<p>如果需要自定义 Schema，详细说明请参阅<a href="https://milvus.io/docs/create-collection.md">Milvus 文档</a>。</p>
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
<p><strong>2.向 Milvus 插入数据</strong></p>
<p>在这一步中，我们使用预定义的图像编码器为示例数据目录中的所有 JPEG 图像生成嵌入。然后将这些嵌入信息连同相应的文件路径一起插入到 Milvus Collections 中。Collections 中的每个条目都由以下内容组成：</p>
<ul>
<li><strong>嵌入向量</strong>：图像的数字表示。存储在字段<code translate="no">vector</code> 中。</li>
<li><strong>文件路径</strong>：供参考的图像文件位置。作为动态字段存储在<code translate="no">filepath</code> 字段中。</li>
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
<h3 id="Peform-a-Search" class="common-anchor-header">执行搜索</h3><p>现在，让我们使用示例文本查询执行一次搜索。这将根据图像与给定文本描述的语义相似性检索出最相关的图像。</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;a white dog&quot;</span>
query_embedding = encode_text(query_text)

search_results = milvus_client.search(
    collection_name=collection_name,
    data=[query_embedding],
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># return top 10 results</span>
    output_fields=[<span class="hljs-string">&quot;filepath&quot;</span>],  <span class="hljs-comment"># return the filepath field</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>可视化结果：</p>
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
