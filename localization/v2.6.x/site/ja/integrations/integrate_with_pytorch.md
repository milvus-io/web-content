---
id: integrate_with_pytorch.md
summary: このページでは、PyTorchとmilvusを使って画像検索を構築する方法を説明します。
title: PyTorchとMilvusによる画像検索
---
<h1 id="Image-Search-with-PyTorch-and-Milvus" class="common-anchor-header">PyTorchとMilvusによる画像検索<button data-href="#Image-Search-with-PyTorch-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>このガイドでは、PyTorchとMilvusを統合して埋め込みを使った画像検索を行う例を紹介します。PyTorchは強力なオープンソースのディープラーニングフレームワークで、機械学習モデルの構築やデプロイに広く利用されています。この例では、Torchvisionライブラリと事前に訓練されたResNet50モデルを活用して、画像コンテンツを表す特徴ベクトル（埋め込み）を生成します。これらの埋め込みは、高性能ベクトルデータベースであるMilvusに保存され、効率的な類似検索を可能にする。使用するデータセットは、<a href="https://www.kaggle.com/datasets/delayedkarma/impressionist-classifier-data">Kaggleの</a>Impressionist-Classifier Datasetである。PyTorchのディープラーニング機能とMilvusのスケーラブルな検索機能を組み合わせることで、ロバストで効率的な画像検索システムを構築する方法を示します。</p>
<p>それでは始めましょう！</p>
<h2 id="Installing-the-requirements" class="common-anchor-header">要件のインストール<button data-href="#Installing-the-requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>この例では、Milvusを使用するための接続に<code translate="no">pymilvus</code> 、埋め込みモデルの実行に<code translate="no">torch</code> 、実際のモデルと前処理に<code translate="no">torchvision</code> 、サンプルデータセットのダウンロードに<code translate="no">gdown</code> 、バーの読み込みに<code translate="no">tqdm</code> 。</p>
<pre><code translate="no" class="language-shell">pip install pymilvus torch gdown torchvision tqdm
<button class="copy-code-btn"></button></code></pre>
<h2 id="Grabbing-the-data" class="common-anchor-header">データの取得<button data-href="#Grabbing-the-data" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">gdown</code> を使ってGoogle Driveからzipを取得し、組み込みの<code translate="no">zipfile</code> ライブラリで解凍する。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> gdown
<span class="hljs-keyword">import</span> zipfile

url = <span class="hljs-string">&#x27;https://drive.google.com/uc?id=1OYDHLEy992qu5C4C8HV5uDIkOWRTAR1_&#x27;</span>
output = <span class="hljs-string">&#x27;./paintings.zip&#x27;</span>
gdown.download(url, output)

<span class="hljs-keyword">with</span> zipfile.ZipFile(<span class="hljs-string">&quot;./paintings.zip&quot;</span>,<span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> zip_ref:
    zip_ref.extractall(<span class="hljs-string">&quot;./paintings&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>データセットのサイズは2.35GBで、ダウンロードにかかる時間はネットワークの状態に依存する。</p>
</div>
<h2 id="Global-Arguments" class="common-anchor-header">グローバル引数<button data-href="#Global-Arguments" class="anchor-icon" translate="no">
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
    </button></h2><p>トラッキングとアップデートを容易にするために使用する主なグローバル引数である。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Milvus Setup Arguments</span>
COLLECTION_NAME = <span class="hljs-string">&#x27;image_search&#x27;</span>  <span class="hljs-comment"># Collection name</span>
DIMENSION = <span class="hljs-number">2048</span>  <span class="hljs-comment"># Embedding vector size in this example</span>
MILVUS_HOST = <span class="hljs-string">&quot;localhost&quot;</span>
MILVUS_PORT = <span class="hljs-string">&quot;19530&quot;</span>

<span class="hljs-comment"># Inference Arguments</span>
BATCH_SIZE = <span class="hljs-number">128</span>
TOP_K = <span class="hljs-number">3</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Setting-up-Milvus" class="common-anchor-header">Milvusのセットアップ<button data-href="#Setting-up-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>この時点で、Milvusのセットアップを開始します。手順は以下の通りです：</p>
<ol>
<li><p>提供されたURIを使用してMilvusインスタンスに接続する。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections

<span class="hljs-comment"># Connect to the instance</span>
connections.connect(host=MILVUS_HOST, port=MILVUS_PORT)
<button class="copy-code-btn"></button></code></pre></li>
<li><p>コレクションが既に存在する場合は、それを削除する。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> utility

<span class="hljs-comment"># Remove any previous collections with the same name</span>
<span class="hljs-keyword">if</span> utility.has_collection(COLLECTION_NAME):
    utility.drop_collection(COLLECTION_NAME)
<button class="copy-code-btn"></button></code></pre></li>
<li><p>ID、画像のファイルパス、埋め込みを保持するコレクションを作成する。</p>
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
<li><p>新しく作成したコレクションにインデックスを作成し、メモリにロードする。</p>
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
<p>これらの手順が完了すると、コレクションに挿入して検索する準備が整います。追加されたデータは自動的にインデックスが作成され、すぐに検索できるようになります。データが非常に新しい場合、まだインデックスが作成されていないデータに対して総当たり検索が使用されるため、検索が遅くなる可能性があります。</p>
<h2 id="Inserting-the-data" class="common-anchor-header">データの挿入<button data-href="#Inserting-the-data" class="anchor-icon" translate="no">
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
    </button></h2><p>この例では、<code translate="no">torch</code> とそのモデルハブが提供する ResNet50 モデルを使用する。エンベッディングを得るために、最後の分類レイヤーを取り除きます。<code translate="no">torch</code> にあるビジョン・モデルはすべて、ここで紹介したのと同じ前処理を使用しています。</p>
<p>次のいくつかのステップでは</p>
<ol>
<li><p>データをロードする。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> glob

<span class="hljs-comment"># Get the filepaths of the images</span>
paths = glob.glob(<span class="hljs-string">&#x27;./paintings/paintings/**/*.jpg&#x27;</span>, recursive=<span class="hljs-literal">True</span>)
<span class="hljs-built_in">len</span>(paths)
<button class="copy-code-btn"></button></code></pre></li>
<li><p>データをバッチに前処理する。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> torch

<span class="hljs-comment"># Load the embedding model with the last layer removed</span>
model = torch.hub.load(<span class="hljs-string">&#x27;pytorch/vision:v0.10.0&#x27;</span>, <span class="hljs-string">&#x27;resnet50&#x27;</span>, pretrained=<span class="hljs-literal">True</span>)
model = torch.nn.Sequential(*(<span class="hljs-built_in">list</span>(model.children())[:-<span class="hljs-number">1</span>]))
model.<span class="hljs-built_in">eval</span>()
<button class="copy-code-btn"></button></code></pre></li>
<li><p>データの埋め込み</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> torchvision <span class="hljs-keyword">import</span> transforms

<span class="hljs-comment"># Preprocessing for images</span>
preprocess = transforms.Compose([
    transforms.Resize(<span class="hljs-number">256</span>),
    transforms.CenterCrop(<span class="hljs-number">224</span>),
    transforms.ToTensor(),
    transforms.Normalize(mean=[<span class="hljs-number">0.485</span>, <span class="hljs-number">0.456</span>, <span class="hljs-number">0.406</span>], std=[<span class="hljs-number">0.229</span>, <span class="hljs-number">0.224</span>, <span class="hljs-number">0.225</span>]),
])
<button class="copy-code-btn"></button></code></pre></li>
<li><p>データを挿入する。</p>
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
<li>埋め込みには時間がかかるので、このステップは比較的時間がかかる。コーヒーを一口飲んでリラックスしてください。</li>
<li>PyTorch は Python 3.9 以前のバージョンではうまく動かないかもしれません。代わりに Python 3.10 以降を使うことを検討してください。</li>
</ul>
   </div>
</li>
</ol>
<h2 id="Performing-the-search" class="common-anchor-header">検索の実行<button data-href="#Performing-the-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusにすべてのデータが挿入されたので、検索を開始することができます。この例では、2つの画像を検索します。バッチ検索を行っているため、検索時間はバッチの画像で共有されます。</p>
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
<p>検索結果の画像は以下のようになるはずです：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/integrate_with_pytorch.png" alt="Image search output" class="doc-image" id="image-search-output" />
   </span> <span class="img-wrapper"> <span>画像検索の出力</span> </span></p>
