---
id: integrate_with_pytorch.md
summary: 本页讨论如何使用 Milvus 进行图像搜索
title: 使用 Milvus 进行图像搜索 - 集成
---
<h1 id="Image-Search-with-Milvus" class="common-anchor-header">使用 Milvus 进行图像搜索<button data-href="#Image-Search-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>在本页中，我们将使用 Milvus 演示一个简单的图像搜索示例。我们搜索的数据集是<a href="https://www.kaggle.com/datasets/delayedkarma/impressionist-classifier-data">Kaggle</a> 上的印象派分类器数据集。在本示例中，我们将数据重新托管在谷歌公共驱动器中。</p>
<p>在本例中，我们只使用 Torchvision 预先训练好的 Resnet50 模型进行嵌入。让我们开始吧</p>
<h2 id="Installing-the-requirements" class="common-anchor-header">安装要求<button data-href="#Installing-the-requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>在本例中，我们将使用<code translate="no">pymilvus</code> 连接使用 Milvus，<code translate="no">torch</code> 运行嵌入模型，<code translate="no">torchvision</code> 实际模型和预处理，<code translate="no">gdown</code> 下载示例数据集，<code translate="no">tqdm</code> 加载条形图。</p>
<pre><code translate="no" class="language-shell">pip install pymilvus torch gdown torchvision tqdm
<button class="copy-code-btn"></button></code></pre>
<h2 id="Grabbing-the-data" class="common-anchor-header">抓取数据<button data-href="#Grabbing-the-data" class="anchor-icon" translate="no">
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
    </button></h2><p>我们将使用<code translate="no">gdown</code> 从 Google Drive 抓取压缩包，然后使用内置的<code translate="no">zipfile</code> 库解压。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> gdown
<span class="hljs-keyword">import</span> zipfile

url = <span class="hljs-string">&#x27;https://drive.google.com/uc?id=1OYDHLEy992qu5C4C8HV5uDIkOWRTAR1_&#x27;</span>
output = <span class="hljs-string">&#x27;./paintings.zip&#x27;</span>
gdown.<span class="hljs-title function_">download</span>(url, output)

<span class="hljs-keyword">with</span> zipfile.<span class="hljs-title class_">ZipFile</span>(<span class="hljs-string">&quot;./paintings.zip&quot;</span>,<span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> <span class="hljs-attr">zip_ref</span>:
    zip_ref.<span class="hljs-title function_">extractall</span>(<span class="hljs-string">&quot;./paintings&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>数据集的大小为 2.35 GB，下载时间取决于网络状况。</p>
</div>
<h2 id="Global-Arguments" class="common-anchor-header">全局参数<button data-href="#Global-Arguments" class="anchor-icon" translate="no">
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
    </button></h2><p>这些是我们将使用的一些主要全局参数，以便于跟踪和更新。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Milvus Setup Arguments</span>
COLLECTION_NAME = <span class="hljs-string">&#x27;image_search&#x27;</span>  <span class="hljs-comment"># Collection name</span>
DIMENSION = <span class="hljs-number">2048</span>  <span class="hljs-comment"># Embedding vector size in this example</span>
MILVUS_HOST = <span class="hljs-string">&quot;localhost&quot;</span>
MILVUS_PORT = <span class="hljs-string">&quot;19530&quot;</span>

<span class="hljs-comment"># Inference Arguments</span>
BATCH_SIZE = <span class="hljs-number">128</span>
TOP_K = <span class="hljs-number">3</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Setting-up-Milvus" class="common-anchor-header">设置 Milvus<button data-href="#Setting-up-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>此时，我们要开始设置 Milvus。具体步骤如下</p>
<ol>
<li><p>使用提供的 URI 连接到 Milvus 实例。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections

<span class="hljs-comment"># Connect to the instance</span>
connections.connect(host=MILVUS_HOST, port=MILVUS_PORT)
<button class="copy-code-btn"></button></code></pre></li>
<li><p>如果 Collections 已经存在，则将其删除。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> utility

<span class="hljs-comment"># Remove any previous collections with the same name</span>
<span class="hljs-keyword">if</span> utility.has_collection(COLLECTION_NAME):
    utility.drop_collection(COLLECTION_NAME)
<button class="copy-code-btn"></button></code></pre></li>
<li><p>创建保存 ID、图片文件路径及其 Embeddings 的 Collection。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema, CollectionSchema, DataType, Collection

<span class="hljs-comment"># Create collection which includes the id, filepath of the image, and image embedding</span>
fields = [
    FieldSchema(name=<span class="hljs-string">&#x27;id&#x27;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&#x27;filepath&#x27;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">200</span>),  <span class="hljs-comment"># VARCHARS need a maximum length, so for this example they are set to 200 characters</span>
    FieldSchema(name=<span class="hljs-string">&#x27;image_embedding&#x27;</span>, dtype=DataType.FLOAT_VECTOR, dim=DIMENSION)
]
schema = CollectionSchema(fields=fields)
collection = Collection(name=COLLECTION_NAME, schema=schema)
<button class="copy-code-btn"></button></code></pre></li>
<li><p>在新创建的 Collections 上创建索引，并将其加载到内存中。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create an AutoIndex index for collection</span>
index_params = {
<span class="hljs-string">&#x27;metric_type&#x27;</span>:<span class="hljs-string">&#x27;L2&#x27;</span>,
<span class="hljs-string">&#x27;index_type&#x27;</span>:<span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
<span class="hljs-string">&#x27;params&#x27;</span>:{<span class="hljs-string">&#x27;nlist&#x27;</span>: <span class="hljs-number">16384</span>}
}
collection.create_index(field_name=<span class="hljs-string">&quot;image_embedding&quot;</span>, index_params=index_params)
collection.load()
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>完成这些步骤后，就可以插入并搜索 Collections 了。任何添加的数据都会自动编入索引，并立即可供搜索。如果数据非常新，搜索速度可能会慢一些，因为将对仍在编制索引过程中的数据使用暴力搜索。</p>
<h2 id="Inserting-the-data" class="common-anchor-header">插入数据<button data-href="#Inserting-the-data" class="anchor-icon" translate="no">
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
    </button></h2><p>在本例中，我们将使用<code translate="no">torch</code> 及其模型中心提供的 ResNet50 模型。为了获得 Embeddings，我们要去掉最后的分类层，这样模型就能为我们提供 2048 维的 embeddings。在<code translate="no">torch</code> 上找到的所有视觉模型都使用了与我们这里相同的预处理。</p>
<p>在接下来的几个步骤中，我们将</p>
<ol>
<li><p>加载数据。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> glob

<span class="hljs-comment"># Get the filepaths of the images</span>
paths = glob.glob(<span class="hljs-string">&#x27;./paintings/paintings/**/*.jpg&#x27;</span>, recursive=<span class="hljs-literal">True</span>)
<span class="hljs-built_in">len</span>(paths)
<button class="copy-code-btn"></button></code></pre></li>
<li><p>分批预处理数据。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> torch

<span class="hljs-comment"># Load the embedding model with the last layer removed</span>
model = torch.hub.load(<span class="hljs-string">&#x27;pytorch/vision:v0.10.0&#x27;</span>, <span class="hljs-string">&#x27;resnet50&#x27;</span>, pretrained=<span class="hljs-literal">True</span>)
model = torch.nn.Sequential(*(<span class="hljs-built_in">list</span>(model.children())[:-<span class="hljs-number">1</span>]))
model.<span class="hljs-built_in">eval</span>()
<button class="copy-code-btn"></button></code></pre></li>
<li><p>嵌入数据。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> torchvision <span class="hljs-keyword">import</span> transforms

<span class="hljs-comment"># Preprocessing for images</span>
preprocess = transforms.Compose([
    transforms.Resize(<span class="hljs-number">256</span>),
    transforms.CenterCrop(<span class="hljs-number">224</span>),
    transforms.ToTensor(),
    transforms.Normalize(mean=[<span class="hljs-number">0.485</span>, <span class="hljs-number">0.456</span>, <span class="hljs-number">0.406</span>], std=[<span class="hljs-number">0.229</span>, <span class="hljs-number">0.224</span>, <span class="hljs-number">0.225</span>]),
])
<button class="copy-code-btn"></button></code></pre></li>
<li><p>插入数据。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> PIL <span class="hljs-keyword">import</span> Image
<span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

<span class="hljs-comment"># Embed function that embeds the batch and inserts it</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">embed</span>(<span class="hljs-params">data</span>):
    <span class="hljs-keyword">with</span> torch.no_grad():
        output = model(torch.stack(data[<span class="hljs-number">0</span>])).squeeze()
        collection.insert([data[<span class="hljs-number">1</span>], output.tolist()])

data_batch = [[],[]]

<span class="hljs-comment"># Read the images into batches for embedding and insertion</span>
<span class="hljs-keyword">for</span> path <span class="hljs-keyword">in</span> tqdm(paths):
    im = Image.<span class="hljs-built_in">open</span>(path).convert(<span class="hljs-string">&#x27;RGB&#x27;</span>)
    data_batch[<span class="hljs-number">0</span>].append(preprocess(im))
    data_batch[<span class="hljs-number">1</span>].append(path)
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(data_batch[<span class="hljs-number">0</span>]) % BATCH_SIZE == <span class="hljs-number">0</span>:
        embed(data_batch)
        data_batch = [[],[]]

<span class="hljs-comment"># Embed and insert the remainder</span>
<span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(data_batch[<span class="hljs-number">0</span>]) != <span class="hljs-number">0</span>:
    embed(data_batch)

<span class="hljs-comment"># Call a flush to index any unsealed segments.</span>
collection.flush()
<button class="copy-code-btn"></button></code></pre>
   <div class="alert note">
<ul>
<li>这一步相对耗时，因为 Embeddings 需要时间。喝一口咖啡，放松一下。</li>
<li>PyTorch 可能无法在 Python 3.9 及更早版本中很好地运行。请考虑使用 Python 3.10 及更高版本。</li>
</ul>
   </div>
</li>
</ol>
<h2 id="Performing-the-search" class="common-anchor-header">执行搜索<button data-href="#Performing-the-search" class="anchor-icon" translate="no">
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
    </button></h2><p>将所有数据插入 Milvus 后，我们就可以开始执行搜索了。在本例中，我们将搜索两张示例图片。由于我们进行的是批量搜索，因此搜索时间由批量中的图像共享。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> glob

<span class="hljs-comment"># Get the filepaths of the search images</span>
search_paths = glob.glob(<span class="hljs-string">&#x27;./paintings/test_paintings/**/*.jpg&#x27;</span>, recursive=<span class="hljs-literal">True</span>)
<span class="hljs-built_in">len</span>(search_paths)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> time
<span class="hljs-keyword">from</span> matplotlib <span class="hljs-keyword">import</span> pyplot <span class="hljs-keyword">as</span> plt

<span class="hljs-comment"># Embed the search images</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">embed</span>(<span class="hljs-params">data</span>):
    <span class="hljs-keyword">with</span> torch.no_grad():
        ret = model(torch.stack(data))
        <span class="hljs-comment"># If more than one image, use squeeze</span>
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(ret) &gt; <span class="hljs-number">1</span>:
            <span class="hljs-keyword">return</span> ret.squeeze().tolist()
        <span class="hljs-comment"># Squeeze would remove batch for single image, so using flatten</span>
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">return</span> torch.flatten(ret, start_dim=<span class="hljs-number">1</span>).tolist()

data_batch = [[],[]]

<span class="hljs-keyword">for</span> path <span class="hljs-keyword">in</span> search_paths:
    im = Image.<span class="hljs-built_in">open</span>(path).convert(<span class="hljs-string">&#x27;RGB&#x27;</span>)
    data_batch[<span class="hljs-number">0</span>].append(preprocess(im))
    data_batch[<span class="hljs-number">1</span>].append(path)

embeds = embed(data_batch[<span class="hljs-number">0</span>])
start = time.time()
res = collection.search(embeds, anns_field=<span class="hljs-string">&#x27;image_embedding&#x27;</span>, param={<span class="hljs-string">&#x27;nprobe&#x27;</span>: <span class="hljs-number">128</span>}, limit=TOP_K, output_fields=[<span class="hljs-string">&#x27;filepath&#x27;</span>])
finish = time.time()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Show the image results</span>
f, axarr = plt.subplots(<span class="hljs-built_in">len</span>(data_batch[<span class="hljs-number">1</span>]), TOP_K + <span class="hljs-number">1</span>, figsize=(<span class="hljs-number">20</span>, <span class="hljs-number">10</span>), squeeze=<span class="hljs-literal">False</span>)

<span class="hljs-keyword">for</span> hits_i, hits <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(res):
    axarr[hits_i][<span class="hljs-number">0</span>].imshow(Image.<span class="hljs-built_in">open</span>(data_batch[<span class="hljs-number">1</span>][hits_i]))
    axarr[hits_i][<span class="hljs-number">0</span>].set_axis_off()
    axarr[hits_i][<span class="hljs-number">0</span>].set_title(<span class="hljs-string">&#x27;Search Time: &#x27;</span> + <span class="hljs-built_in">str</span>(finish - start))
    <span class="hljs-keyword">for</span> hit_i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(hits):
        axarr[hits_i][hit_i + <span class="hljs-number">1</span>].imshow(Image.<span class="hljs-built_in">open</span>(hit.entity.get(<span class="hljs-string">&#x27;filepath&#x27;</span>)))
        axarr[hits_i][hit_i + <span class="hljs-number">1</span>].set_axis_off()
        axarr[hits_i][hit_i + <span class="hljs-number">1</span>].set_title(<span class="hljs-string">&#x27;Distance: &#x27;</span> + <span class="hljs-built_in">str</span>(hit.distance))

<span class="hljs-comment"># Save the search result in a separate image file alongside your script.</span>
plt.savefig(<span class="hljs-string">&#x27;search_result.png&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>搜索结果图像应与下图类似：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/integrate_with_pytorch.png" alt="Image search output" class="doc-image" id="image-search-output" />
   </span> <span class="img-wrapper"> <span>图像搜索输出</span> </span></p>
