---
id: build_RAG_with_milvus_and_ollama.md
summary: >-
  このガイドでは、OllamaとMilvusを活用し、RAG（Retrieval-Augmented
  Generation）パイプラインを効率的かつ安全に構築する方法をご紹介します。
title: MilvusとOllamaでRAGを構築する
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_ollama.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_ollama.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Build-RAG-with-Milvus-and-Ollama" class="common-anchor-header">MilvusとOllamaでRAGを構築する<button data-href="#Build-RAG-with-Milvus-and-Ollama" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://ollama.com/">Ollamaは</a>、大規模言語モデル（LLM）のローカルでの実行とカスタマイズを簡素化するオープンソースのプラットフォームです。高度な技術スキルを必要とすることなく、モデルのダウンロード、インストール、インタラクションを簡単に行うことができます。汎用的なものからドメインに特化したものまで、トレーニング済みのLLMライブラリが充実しているため、Ollamaは様々なアプリケーション向けにモデルの管理やカスタマイズを簡単に行うことができます。データのプライバシーと柔軟性が確保され、ユーザーは自分のマシン上でAI主導のソリューションを微調整、最適化、展開できるようになります。</p>
<p>このガイドでは、OllamaとMilvusを活用してRAG（Retrieval-Augmented Generation）パイプラインを効率的かつ安全に構築する方法を紹介します。</p>
<h2 id="Preparation" class="common-anchor-header">準備<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Dependencies-and-Environment" class="common-anchor-header">依存関係と環境</h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install pymilvus ollama</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Google Colabを使用している場合、インストールしたばかりの依存関係を有効にするために、<strong>ランタイムを再起動</strong>する必要があるかもしれない（画面上部の "Runtime "メニューをクリックし、ドロップダウンメニューから "Restart session "を選択する）。</p>
</div>
<h3 id="Prepare-the-data" class="common-anchor-header">データの準備</h3><p><a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">Milvusドキュメント2.4.xの</a>FAQページをRAGのプライベートナレッジとして使用する。</p>
<p>zipファイルをダウンロードし、<code translate="no">milvus_docs</code> フォルダにドキュメントを展開する。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">unzip -q milvus_docs_2.4.x_en.zip -d milvus_docs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">--2024-11-26 21:47:19--  https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip
Resolving github.com (github.com)... 140.82.112.4
Connecting to github.com (github.com)|140.82.112.4|:443... connected.
HTTP request sent, awaiting response... 302 Found
Location: https://objects.githubusercontent.com/github-production-release-asset-2e65be/267273319/c52902a0-e13c-4ca7-92e0-086751098a05?X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=releaseassetproduction%2F20241127%2Fus-east-1%2Fs3%2Faws4_request&amp;X-Amz-Date=20241127T024720Z&amp;X-Amz-Expires=300&amp;X-Amz-Signature=7808b77cbdaa7e122196bcd75a73f29f2540333a350c4830bbdf5f286e876304&amp;X-Amz-SignedHeaders=host&amp;response-content-disposition=attachment%3B%20filename%3Dmilvus_docs_2.4.x_en.zip&amp;response-content-type=application%2Foctet-stream [following]
--2024-11-26 21:47:20--  https://objects.githubusercontent.com/github-production-release-asset-2e65be/267273319/c52902a0-e13c-4ca7-92e0-086751098a05?X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=releaseassetproduction%2F20241127%2Fus-east-1%2Fs3%2Faws4_request&amp;X-Amz-Date=20241127T024720Z&amp;X-Amz-Expires=300&amp;X-Amz-Signature=7808b77cbdaa7e122196bcd75a73f29f2540333a350c4830bbdf5f286e876304&amp;X-Amz-SignedHeaders=host&amp;response-content-disposition=attachment%3B%20filename%3Dmilvus_docs_2.4.x_en.zip&amp;response-content-type=application%2Foctet-stream
Resolving objects.githubusercontent.com (objects.githubusercontent.com)... 185.199.109.133, 185.199.111.133, 185.199.108.133, ...
Connecting to objects.githubusercontent.com (objects.githubusercontent.com)|185.199.109.133|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 613094 (599K) [application/octet-stream]
Saving to: ‘milvus_docs_2.4.x_en.zip’

milvus_docs_2.4.x_e 100%[===================&gt;] 598.72K  1.20MB/s    in 0.5s    

2024-11-26 21:47:20 (1.20 MB/s) - ‘milvus_docs_2.4.x_en.zip’ saved [613094/613094]
</code></pre>
<p>フォルダ<code translate="no">milvus_docs/en/faq</code> からすべてのマークダウン・ファイルをロードする。各ドキュメントについて、単に "# "を使ってファイル内のコンテンツを区切るだけで、マークダウン・ファイルの各主要部分のコンテンツを大まかに区切ることができる。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []

<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()

    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-the-LLM-and-Embedding-Model" class="common-anchor-header">LLMと埋め込みモデルの準備</h3><p>OllamaはLLMベースのタスクと埋め込み生成の両方に複数のモデルをサポートしており、検索支援生成（RAG）アプリケーションを簡単に開発することができる。このセットアップでは</p>
<ul>
<li>テキスト生成タスク用のLLMとして、<strong>Llama 3.2（3B）を</strong>使用します。</li>
<li>埋め込み生成には、意味的類似性に最適化された334Mのパラメータを持つモデル、<strong>mxbai-embed-largeを</strong>使う。</li>
</ul>
<p>開始する前に、両方のモデルがローカルに引き込まれていることを確認する：</p>
<pre><code translate="no" class="language-python">! ollama pull mxbai-embed-large
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[?25lpulling manifest ⠋ [?25h[?25l[2K[1Gpulling manifest ⠙ [?25h[?25l[2K[1Gpulling manifest ⠹ [?25h[?25l[2K[1Gpulling manifest ⠸ [?25h[?25l[2K[1Gpulling manifest ⠼ [?25h[?25l[2K[1Gpulling manifest ⠴ [?25h[?25l[2K[1Gpulling manifest 
pulling 819c2adf5ce6... 100% ▕████████████████▏ 669 MB                         
pulling c71d239df917... 100% ▕████████████████▏  11 KB                         
pulling b837481ff855... 100% ▕████████████████▏   16 B                         
pulling 38badd946f91... 100% ▕████████████████▏  408 B                         
verifying sha256 digest 
writing manifest 
success [?25h
</code></pre>
<pre><code translate="no" class="language-python">! ollama pull llama3<span class="hljs-number">.2</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[?25lpulling manifest ⠋ [?25h[?25l[2K[1Gpulling manifest ⠙ [?25h[?25l[2K[1Gpulling manifest ⠹ [?25h[?25l[2K[1Gpulling manifest ⠸ [?25h[?25l[2K[1Gpulling manifest ⠼ [?25h[?25l[2K[1Gpulling manifest ⠴ [?25h[?25l[2K[1Gpulling manifest 
pulling dde5aa3fc5ff... 100% ▕████████████████▏ 2.0 GB                         
pulling 966de95ca8a6... 100% ▕████████████████▏ 1.4 KB                         
pulling fcc5a6bec9da... 100% ▕████████████████▏ 7.7 KB                         
pulling a70ff7e570d9... 100% ▕████████████████▏ 6.0 KB                         
pulling 56bb8bd477a5... 100% ▕████████████████▏   96 B                         
pulling 34bb5ab01051... 100% ▕████████████████▏  561 B                         
verifying sha256 digest 
writing manifest 
success [?25h
</code></pre>
<p>これらのモデルの準備ができたので、LLM駆動生成と埋め込みベースの検索ワークフローの実装に進むことができます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> ollama


<span class="hljs-keyword">def</span> <span class="hljs-title function_">emb_text</span>(<span class="hljs-params">text</span>):
    response = ollama.embeddings(model=<span class="hljs-string">&quot;mxbai-embed-large&quot;</span>, prompt=text)
    <span class="hljs-keyword">return</span> response[<span class="hljs-string">&quot;embedding&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<p>テスト埋め込みを生成し、その次元と最初のいくつかの要素を表示します。</p>
<pre><code translate="no" class="language-python">test_embedding = emb_text(<span class="hljs-string">&quot;This is a test&quot;</span>)
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">1024
[0.23276396095752716, 0.4257211685180664, 0.19724100828170776, 0.46120673418045044, -0.46039995551109314, -0.1413791924715042, -0.18261606991291046, -0.07602324336767197, 0.39991313219070435, 0.8337644338607788]
</code></pre>
<h2 id="Load-data-into-Milvus" class="common-anchor-header">Milvusにデータをロードする。<button data-href="#Load-data-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-Collection" class="common-anchor-header">コレクションの作成</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)

collection_name = <span class="hljs-string">&quot;my_rag_collection&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">MilvusClient</code> ：</p>
<ul>
<li><code translate="no">uri</code> をローカルファイル、例えば<code translate="no">./milvus.db</code> とするのが最も便利な方法です。</li>
<li>データ規模が大きい場合は、<a href="https://milvus.io/docs/quickstart.md">dockerやkubernetes</a>上に、よりパフォーマンスの高いMilvusサーバを構築することができます。このセットアップでは、サーバの uri、例えば<code translate="no">http://localhost:19530</code> を<code translate="no">uri</code> として使用してください。</li>
<li>Milvusのフルマネージドクラウドサービスである<a href="https://zilliz.com/cloud">Zilliz Cloudを</a>利用する場合は、Zilliz Cloudの<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public EndpointとApi keyに</a>対応する<code translate="no">uri</code> と<code translate="no">token</code> を調整してください。</li>
</ul>
</div>
<p>コレクションが既に存在するか確認し、存在する場合は削除します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>指定したパラメータで新しいコレクションを作成します。</p>
<p>フィールド情報を指定しない場合、Milvusは自動的にプライマリキー用のデフォルト<code translate="no">id</code> フィールドと、ベクトルデータを格納するための<code translate="no">vector</code> フィールドを作成します。予約されたJSONフィールドは、スキーマで定義されていないフィールドとその値を格納するために使用されます。</p>
<pre><code translate="no" class="language-python">milvus_client.create_collection(
    collection_name=collection_name,
    dimension=embedding_dim,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data" class="common-anchor-header">データの挿入</h3><p>テキスト行を繰り返し、エンベッディングを作成し、milvusにデータを挿入します。</p>
<p>ここに新しいフィールド<code translate="no">text</code> 、コレクションスキーマで定義されていないフィールドです。これは予約されたJSONダイナミックフィールドに自動的に追加され、高レベルでは通常のフィールドとして扱うことができる。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []

<span class="hljs-keyword">for</span> i, line <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(tqdm(text_lines, desc=<span class="hljs-string">&quot;Creating embeddings&quot;</span>)):
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: emb_text(line), <span class="hljs-string">&quot;text&quot;</span>: line})

milvus_client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Creating embeddings: 100%|██████████| 72/72 [00:03&lt;00:00, 22.56it/s]





{'insert_count': 72, 'ids': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71], 'cost': 0}
</code></pre>
<h2 id="Build-RAG" class="common-anchor-header">RAGの構築<button data-href="#Build-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Retrieve-data-for-a-query" class="common-anchor-header">クエリのデータを取得する</h3><p>Milvusに関するよくある質問を指定してみましょう。</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>コレクションで質問を検索し、セマンティックトップ3マッチを取得します。</p>
<pre><code translate="no" class="language-python">search_res = milvus_client.search(
    collection_name=collection_name,
    data=[
        emb_text(question)
    ],  <span class="hljs-comment"># Use the `emb_text` function to convert the question to an embedding vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># Return top 3 results</span>
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}},  <span class="hljs-comment"># Inner product distance</span>
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],  <span class="hljs-comment"># Return the text field</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>クエリの検索結果を見てみましょう。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json

retrieved_lines_with_distances = [
    (res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>], res[<span class="hljs-string">&quot;distance&quot;</span>]) <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> search_res[<span class="hljs-number">0</span>]
]
<span class="hljs-built_in">print</span>(json.dumps(retrieved_lines_with_distances, indent=<span class="hljs-number">4</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[
    [
        &quot; Where does Milvus store data?\n\nMilvus deals with two types of data, inserted data and metadata. \n\nInserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends, including [MinIO](https://min.io/), [AWS S3](https://aws.amazon.com/s3/?nc1=h_ls), [Google Cloud Storage](https://cloud.google.com/storage?hl=en#object-storage-for-companies-of-all-sizes) (GCS), [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs), [Alibaba Cloud OSS](https://www.alibabacloud.com/product/object-storage-service), and [Tencent Cloud Object Storage](https://www.tencentcloud.com/products/cos) (COS).\n\nMetadata are generated within Milvus. Each Milvus module has its own metadata that are stored in etcd.\n\n###&quot;,
        231.9398193359375
    ],
    [
        &quot;How does Milvus flush data?\n\nMilvus returns success when inserted data are loaded to the message queue. However, the data are not yet flushed to the disk. Then Milvus' data node writes the data in the message queue to persistent storage as incremental logs. If `flush()` is called, the data node is forced to write all data in the message queue to persistent storage immediately.\n\n###&quot;,
        226.48316955566406
    ],
    [
        &quot;What is the maximum dataset size Milvus can handle?\n\n  \nTheoretically, the maximum dataset size Milvus can handle is determined by the hardware it is run on, specifically system memory and storage:\n\n- Milvus loads all specified collections and partitions into memory before running queries. Therefore, memory size determines the maximum amount of data Milvus can query.\n- When new entities and and collection-related schema (currently only MinIO is supported for data persistence) are added to Milvus, system storage determines the maximum allowable size of inserted data.\n\n###&quot;,
        210.60745239257812
    ]
]
</code></pre>
<h3 id="Use-LLM-to-get-a-RAG-response" class="common-anchor-header">LLMを使ってRAGレスポンスを取得する</h3><p>検索されたドキュメントを文字列形式に変換する。</p>
<pre><code translate="no" class="language-python">context = <span class="hljs-string">&quot;\n&quot;</span>.join(
    [line_with_distance[<span class="hljs-number">0</span>] <span class="hljs-keyword">for</span> line_with_distance <span class="hljs-keyword">in</span> retrieved_lines_with_distances]
)
<button class="copy-code-btn"></button></code></pre>
<p>ラネージ・モデルのシステム・プロンプトとユーザー・プロンプトを定義する。このプロンプトはmilvusから検索された文書で組み立てられる。</p>
<pre><code translate="no" class="language-python">SYSTEM_PROMPT = <span class="hljs-string">&quot;&quot;&quot;
Human: You are an AI assistant. You are able to find answers to the questions from the contextual passage snippets provided.
&quot;&quot;&quot;</span>
USER_PROMPT = <span class="hljs-string">f&quot;&quot;&quot;
Use the following pieces of information enclosed in &lt;context&gt; tags to provide an answer to the question enclosed in &lt;question&gt; tags.
&lt;context&gt;
<span class="hljs-subst">{context}</span>
&lt;/context&gt;
&lt;question&gt;
<span class="hljs-subst">{question}</span>
&lt;/question&gt;
&quot;&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ollamaが提供する<code translate="no">llama3.2</code> モデルを使って、プロンプトに基づいたレスポンスを生成する。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> ollama <span class="hljs-keyword">import</span> chat
<span class="hljs-keyword">from</span> ollama <span class="hljs-keyword">import</span> ChatResponse

response: ChatResponse = chat(
    model=<span class="hljs-string">&quot;llama3.2&quot;</span>,
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: SYSTEM_PROMPT},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: USER_PROMPT},
    ],
)
<span class="hljs-built_in">print</span>(response[<span class="hljs-string">&quot;message&quot;</span>][<span class="hljs-string">&quot;content&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">According to the provided context, data in Milvus is stored in two types:

1. **Inserted data**: Storing data in persistent storage as incremental log. It supports multiple object storage backends such as MinIO, AWS S3, Google Cloud Storage (GCS), Azure Blob Storage, Alibaba Cloud OSS, and Tencent Cloud Object Storage.

2. **Metadata**: Generated within Milvus and stored in etcd.
</code></pre>
<p>素晴らしい！MilvusとOllamaでRAGパイプラインの構築に成功した。</p>
