---
id: text_image_search.md
summary: >-
  このチュートリアルでは、OpenAIのCLIP(Contrastive Language-Image
  Pretraining)モデルとMilvusを使って、テキストベースの画像検索を実装する方法を探ります。CLIPで画像埋め込みを生成し、Milvusに保存し、効率的な類似検索を行います。
title: Milvusによるテキスト画像検索
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/text_image_search_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/text_image_search_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Text-to-Image-Search-with-Milvus" class="common-anchor-header">Milvusによるテキスト画像検索<button data-href="#Text-to-Image-Search-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Text-to-image検索は、ユーザが自然言語のテキスト記述を使って画像を検索できる高度な技術です。これは、事前に訓練されたマルチモーダルモデルを活用し、テキストと画像の両方を共有された意味空間の埋め込みに変換し、類似性に基づいた比較を可能にします。</p>
<p>このチュートリアルでは、OpenAIのCLIP(Contrastive Language-Image Pretraining)モデルとmilvusを使って、テキストベースの画像検索を実装する方法を探ります。CLIPを用いて画像埋め込みを生成し、Milvusに保存し、効率的な類似検索を行います。</p>
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
    </button></h2><p>始める前に、必要なパッケージとサンプルデータが揃っていることを確認してください。</p>
<h3 id="Install-dependencies" class="common-anchor-header">依存関係のインストール</h3><ul>
<li><strong>pymilvus&gt;=2.4.2</strong>:Milvusデータベースとやりとりするため。</li>
<li>CLIPモデルを扱うための<strong>clip</strong></li>
<li>画像処理と可視化のための<strong>pillow</strong></li>
</ul>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus pillow</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install git+https://github.com/openai/CLIP.git</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Google Colabを使用している場合、<strong>ランタイムを再起動</strong>する必要があるかもしれません (インターフェースの上部にある "Runtime "メニューに移動し、ドロップダウンメニューから "Restart session "を選択してください)。</p>
</div>
<h3 id="Download-example-data" class="common-anchor-header">サンプルデータのダウンロード</h3><p><a href="https://www.image-net.org">ImageNet</a>データセットのサブセット（100クラス、各クラス10画像）をサンプル画像として使います。以下のコマンドでサンプルデータをダウンロードし、ローカルフォルダ<code translate="no">./images_folder</code> に展開します：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/towhee-io/examples/releases/download/data/reverse_image_search.zip</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">unzip -q reverse_image_search.zip -d images_folder</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-up-Milvus" class="common-anchor-header">Milvusのセットアップ</h3><p>先に進む前に、Milvusサーバのセットアップを行い、URI（オプションでトークン）を使って接続してください：</p>
<ul>
<li><p><strong>Milvus Lite (便宜上推奨)</strong>：URIを./milvus.dbのようなローカルファイルに設定します。これは自動的に<a href="https://milvus.io/docs/milvus_lite.md">Milvus Liteを</a>活用し、すべてのデータを単一のファイルに保存します。</p></li>
<li><p><strong>DockerまたはKubernetes（大規模データ用）</strong>：より大規模なデータセットを扱うには、<a href="https://milvus.io/docs/quickstart.md">DockerまたはKubernetesを</a>使用して、よりパフォーマンスの高いMilvusサーバをデプロイします。この場合、http://localhost:19530 のようなサーバURIを使用して接続します。</p></li>
<li><p><strong>Zillizクラウド（マネージドサービス）</strong>：Milvusのフルマネージドクラウドサービスである<a href="https://zilliz.com/cloud">Zilliz Cloudを</a>ご利用の場合は、URIにPublic Endpoint、トークンにAPI Keyを設定してください。</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;milvus.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Getting-Started" class="common-anchor-header">開始<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><p>必要な依存関係やデータが揃ったところで、いよいよ機能抽出ツールをセットアップし、Milvusを使い始めましょう。このセクションでは、テキストから画像への検索システムを構築するための重要なステップを説明します。最後に、テキストクエリに基づいて画像を検索し、視覚化する方法を示します。</p>
<h3 id="Define-feature-extractors" class="common-anchor-header">特徴抽出器の定義</h3><p>画像とテキストの埋め込みを生成するために、事前に学習されたCLIPモデルを使用します。このセクションでは、事前に学習された<strong>ViT-B/32</strong>variant of CLIPをロードし、画像とテキストをエンコードするためのヘルパー関数を定義する：</p>
<ul>
<li><code translate="no">encode_image(image_path)</code>:画像を処理して特徴ベクトルにエンコードする。</li>
<li><code translate="no">encode_text(text)</code>:テキストクエリを特徴ベクトルにエンコード</li>
</ul>
<p>両関数とも、正確な余弦類似度計算に不可欠な単位長にベクトルを変換することにより、一貫した比較を保証するために出力特徴を正規化する。</p>
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
<h3 id="Data-Ingestion" class="common-anchor-header">データの取り込み</h3><p>セマンティック画像検索を可能にするために、まずすべての画像の埋め込みを生成し、効率的なインデックス付けと検索のためにベクトルデータベースに格納する必要があります。このセクションでは、画像データをmilvusに取り込むためのステップバイステップのガイドを提供します。</p>
<p><strong>1.Milvusコレクションの作成</strong></p>
<p>画像の埋め込みを保存する前に、Milvusコレクションを作成する必要があります。以下のコードは、デフォルトのCOSINE メトリックタイプでクイックセットアップモードでコレクションを作成する方法を示しています。コレクションは以下のフィールドを含む：</p>
<ul>
<li><p><code translate="no">id</code>:オートIDが有効なプライマリフィールド。</p></li>
<li><p><code translate="no">vector</code>:浮動小数点ベクトル埋め込みを格納するフィールド。</p></li>
</ul>
<p>カスタムスキーマが必要な場合は、<a href="https://milvus.io/docs/create-collection.md">Milvusのドキュメントを</a>参照してください。</p>
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
<p><strong>2.Milvusへのデータ挿入</strong></p>
<p>このステップでは、あらかじめ定義された画像エンコーダを使用して、サンプル・データ・ディレクトリ内のすべてのJPEG画像の埋め込みデータを生成します。これらのエンベッディングは、対応するファイルパスとともにMilvusコレクションに挿入されます。コレクション内の各エントリは以下から構成される：</p>
<ul>
<li><strong>埋め込みベクトル</strong>：画像の数値表現。<code translate="no">vector</code> フィールドに格納される。</li>
<li><strong>ファイルパス</strong>：参照用の画像ファイルの場所。動的フィールドとしてフィールド<code translate="no">filepath</code> に格納される。</li>
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
<h3 id="Peform-a-Search" class="common-anchor-header">検索の実行</h3><p>それでは、テキストクエリの例を使って検索を実行してみましょう。これは、指定されたテキスト記述との意味的類似性に基づいて、最も関連性の高い画像を検索します。</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;a white dog&quot;</span>
query_embedding = encode_text(query_text)

search_results = milvus_client.search(
    collection_name=collection_name,
    data=[query_embedding],
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># return top 10 results</span>
    output_fields=[<span class="hljs-string">&quot;filepath&quot;</span>],  <span class="hljs-comment"># return the filepath field</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>結果を視覚化してみましょう：</p>
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
