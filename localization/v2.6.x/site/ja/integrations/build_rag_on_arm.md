---
id: build_rag_on_arm.md
summary: >-
  このチュートリアルでは、Armベースのインフラ上でRAG（Retrieval-Augmented
  Generation）アプリケーションを構築する方法を学びます。ベクトルストレージには、フルマネージドMilvusベクトルデータベースであるZilliz
  Cloudを利用します。Zilliz
  Cloudは、AWS、GCP、Azureなどの主要なクラウドで利用できる。このデモでは、ArmマシンとAWS上にデプロイされたZilliz
  Cloudを使用している。LLMについては、llama.cppを使用してAWSのArmベースのサーバーCPU上でLlama-3.1-8Bモデルを使用しています。
title: ArmアーキテクチャでRAGを構築
---
<h1 id="Build-RAG-on-Arm-Architecture" class="common-anchor-header">ArmアーキテクチャでRAGを構築<button data-href="#Build-RAG-on-Arm-Architecture" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://www.arm.com/">Arm</a>CPUは、従来の機械学習（ML）や人工知能（AI）のユースケースを含め、幅広いアプリケーションで幅広く利用されています。</p>
<p>このチュートリアルでは、Armベースのインフラストラクチャ上でRAG（Retrieval-Augmented Generation）アプリケーションを構築する方法を学びます。ベクトル・ストレージには、フルマネージドMilvusベクトル・データベースである<a href="https://zilliz.com/cloud">Zilliz Cloudを</a>利用します。Zilliz Cloudは、AWS、GCP、Azureなどの主要なクラウドで利用できる。このデモでは、ArmマシンとAWS上にデプロイされたZilliz Cloudを使用している。LLMについては、AWSのArmベースのサーバーCPU上で<code translate="no">llama.cpp</code> を用いて<code translate="no">Llama-3.1-8B</code> 。</p>
<h2 id="Prerequisite" class="common-anchor-header">前提条件<button data-href="#Prerequisite" class="anchor-icon" translate="no">
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
    </button></h2><p>この例を実行するには、<a href="https://aws.amazon.com/ec2/graviton/">AWS Graviton</a> を使用することを推奨します。<a href="https://aws.amazon.com/ec2/graviton/">AWS Graviton</a> は、Arm ベースのサーバー上で ML ワークロードを実行するためのコスト効率の良い方法を提供します。このノートブックは、Ubuntu 22.04 LTS システムの AWS Graviton3<code translate="no">c7g.2xlarge</code> インスタンスでテストされています。</p>
<p>この例を実行するには、少なくとも4つのコアと8GBのRAMが必要です。ディスクストレージは少なくとも32GBまで設定してください。同じかそれ以上のスペックのインスタンスを使用することを推奨する。</p>
<p>インスタンスを起動したら、インスタンスに接続し、以下のコマンドを実行して環境を準備します。</p>
<p>サーバに python をインストールする：</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">sudo</span> apt update
$ <span class="hljs-built_in">sudo</span> apt install python-is-python3 python3-pip python3-venv -y
<button class="copy-code-btn"></button></code></pre>
<p>仮想環境を作成し、起動します：</p>
<pre><code translate="no" class="language-bash">$ python -m venv venv
$ <span class="hljs-built_in">source</span> venv/bin/activate
<button class="copy-code-btn"></button></code></pre>
<p>必要なpythonの依存関係をインストールします：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus openai requests langchain-huggingface huggingface_hub tqdm</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Offline-Data-Loading" class="common-anchor-header">オフラインデータのロード<button data-href="#Offline-Data-Loading" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-Collection" class="common-anchor-header">コレクションの作成</h3><p>ArmベースのマシンでAWS上にデプロイされた<a href="https://zilliz.com/cloud">Zilliz Cloudを</a>使用して、ベクトルデータを保存し、取得します。クイックスタートするには、Zilliz Cloudに無料で<a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">アカウントを登録</a>するだけです。</p>
<div class="alert note">
<p>Zilliz Cloudに加えて、セルフホスティングのMilvusも（セットアップがより複雑な）オプションです。また、<a href="https://milvus.io/docs/install_standalone-docker-compose.md">Milvus Standaloneと</a> <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetesを</a>ARMベースのマシンにデプロイすることも可能です。Milvusのインストールの詳細については、<a href="https://milvus.io/docs/install-overview.md">インストールドキュメントを</a>参照してください。</p>
</div>
<p>Zilliz Cloudの<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public EndpointとApi keyとして</a> <code translate="no">uri</code> 、<code translate="no">token</code> 。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

milvus_client = MilvusClient(
    uri=<span class="hljs-string">&quot;&lt;your_zilliz_public_endpoint&gt;&quot;</span>, token=<span class="hljs-string">&quot;&lt;your_zilliz_api_key&gt;&quot;</span>
)

collection_name = <span class="hljs-string">&quot;my_rag_collection&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<p>コレクションが既に存在するか確認し、存在する場合は削除します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>指定したパラメータで新しいコレクションを作成します。</p>
<p>フィールド情報を指定しない場合、Milvusは自動的にプライマリキー用のデフォルト<code translate="no">id</code> フィールドと、ベクトルデータを格納するための<code translate="no">vector</code> フィールドを作成します。予約されたJSONフィールドは、スキーマで定義されていないフィールドとその値を格納するために使用されます。</p>
<pre><code translate="no" class="language-python">milvus_client.create_collection(
    collection_name=collection_name,
    dimension=<span class="hljs-number">384</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>デフォルトのメトリックタイプとして内積距離を使用する。距離タイプの詳細については、<a href="https://milvus.io/docs/metric.md?tab=floating">類似度メトリクスのページを</a>参照してください。</p>
<h3 id="Prepare-the-data" class="common-anchor-header">データの準備</h3><p><a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">Milvusドキュメント2.4.xの</a>FAQページをRAGのプライベートナレッジとして使用します。</p>
<p>zipファイルをダウンロードし、<code translate="no">milvus_docs</code> フォルダにドキュメントを解凍する。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">unzip -q milvus_docs_2.4.x_en.zip -d milvus_docs</span>
<button class="copy-code-btn"></button></code></pre>
<p>フォルダ<code translate="no">milvus_docs/en/faq</code> からすべてのマークダウン・ファイルをロードする。各ドキュメントについて、単に "# "を使ってファイル内のコンテンツを区切るだけで、マークダウン・ファイルの各主要部分のコンテンツを大まかに区切ることができる。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []

<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()

    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data" class="common-anchor-header">データの挿入</h3><p>テキストを埋め込みベクトルに変換できる、シンプルだが効率的な埋め込みモデル<a href="https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2">all-MiniLM-L6-v2を</a>用意する。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_huggingface <span class="hljs-keyword">import</span> HuggingFaceEmbeddings

embedding_model = HuggingFaceEmbeddings(model_name=<span class="hljs-string">&quot;all-MiniLM-L6-v2&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>テキスト行を繰り返し、埋め込みを作成し、milvusにデータを挿入する。</p>
<p>ここに新しいフィールド<code translate="no">text</code> 、コレクションスキーマの非定義フィールドである。これは予約されたJSONダイナミックフィールドに自動的に追加され、高レベルでは通常のフィールドとして扱うことができる。</p>
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
<h2 id="Launch-LLM-Service-on-Arm" class="common-anchor-header">Arm上でLLMサービスを起動する<button data-href="#Launch-LLM-Service-on-Arm" class="anchor-icon" translate="no">
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
    </button></h2><p>このセクションでは、ArmベースのCPU上で<code translate="no">llama.cpp</code> サービスを構築し、起動します。</p>
<h3 id="Llama-31-model--llamacpp" class="common-anchor-header">Llama 3.1モデルとllama.cpp</h3><p>Meta社の<a href="https://huggingface.co/cognitivecomputations/dolphin-2.9.4-llama3.1-8b-gguf">Llama-3.1-8Bモデルは</a>、Llama 3.1モデルファミリーに属し、研究および商用目的で自由に使用できます。このモデルを使用する前に、Llamaの<a href="https://llama.meta.com/llama-downloads/">ウェブサイトに</a>アクセスし、フォームに記入してアクセスをリクエストしてください。</p>
<p><a href="https://github.com/ggerganov/llama.cpp">llama.cppは</a>オープンソースのC/C++プロジェクトで、ローカルでもクラウドでも、様々なハードウェア上で効率的なLLM推論を可能にします。<code translate="no">llama.cpp</code> を使えば、Llama 3.1モデルを簡単にホストすることができます。</p>
<h3 id="Download-and-build-llamacpp" class="common-anchor-header">llama.cppをダウンロードしてビルドする</h3><p>以下のコマンドを実行して、llama.cppをソースからビルドするのに必要なmake、cmake、gcc、g++、その他の必須ツールをインストールする：</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">sudo</span> apt install make cmake -y
$ <span class="hljs-built_in">sudo</span> apt install gcc g++ -y
$ <span class="hljs-built_in">sudo</span> apt install build-essential -y
<button class="copy-code-btn"></button></code></pre>
<p>これで<code translate="no">llama.cpp</code> のビルドを始める準備ができました。</p>
<p>llama.cpp のソースリポジトリをクローンします：</p>
<pre><code translate="no" class="language-bash">$ git <span class="hljs-built_in">clone</span> https://github.com/ggerganov/llama.cpp
<button class="copy-code-btn"></button></code></pre>
<p>デフォルトでは、<code translate="no">llama.cpp</code> は Linux と Windows でのみ CPU 用にビルドされます。実行するArm CPU用にビルドするために、余計なスイッチを用意する必要はない。</p>
<p><code translate="no">make</code> を実行してビルドする：</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">cd</span> llama.cpp
$ make GGML_NO_LLAMAFILE=1 -j$(<span class="hljs-built_in">nproc</span>)
<button class="copy-code-btn"></button></code></pre>
<p>help コマンドを実行して、<code translate="no">llama.cpp</code> が正しくビルドされたことを確認する：</p>
<pre><code translate="no" class="language-bash">$ ./llama-cli -h
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">llama.cpp</code> が正しくビルドされていれば、help オプションが表示されます。出力スニペットは次のようになります：</p>
<pre><code translate="no">example usage:

    text generation:     ./llama-cli -m your_model.gguf -p &quot;I believe the meaning of life is&quot; -n 128

    chat (conversation): ./llama-cli -m your_model.gguf -p &quot;You are a helpful assistant&quot; -cnv
</code></pre>
<p>これでhuggingface cliを使ってモデルをダウンロードすることができます：</p>
<pre><code translate="no" class="language-bash">$ huggingface-cli download cognitivecomputations/dolphin-2.9.4-llama3.1-8b-gguf dolphin-2.9.4-llama3.1-8b-Q4_0.gguf --local-dir . --local-dir-use-symlinks False
<button class="copy-code-btn"></button></code></pre>
<p>llama.cppチームによって導入されたGGUFモデルフォーマットは、圧縮と量子化を用いて重みの精度を4ビット整数に落とし、計算量とメモリ需要を大幅に削減し、Arm CPUをLLM推論に有効にします。</p>
<h3 id="Re-quantize-the-model-weights" class="common-anchor-header">モデル重みの再量子化</h3><p>再量子化するには、以下を実行します。</p>
<pre><code translate="no" class="language-bash">$ ./llama-quantize --allow-requantize dolphin-2.9.4-llama3.1-8b-Q4_0.gguf dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf Q4_0_8_8
<button class="copy-code-btn"></button></code></pre>
<p>これは、<code translate="no">llama-cli</code> がSVE 256とMATMUL_INT8サポートを使用できるように再設定された重みを含む、新しいファイル<code translate="no">dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf</code> を出力します。</p>
<div class="alert note">
<p>この再量子化はGraviton3に特に最適である。Graviton2 については、最適な再量子化は<code translate="no">Q4_0_4_4</code> フォーマットで実行されるべきであり、Graviton4 については<code translate="no">Q4_0_4_8</code> フォーマットが再量子化に最も適している。</p>
</div>
<h3 id="Start-the-LLM-Service" class="common-anchor-header">LLMサービスの開始</h3><p>llama.cppサーバープログラムを利用し、OpenAI互換のAPI経由でリクエストを送信することができます。これにより、LLMの起動と停止を繰り返すことなく、LLMと何度もやりとりするアプリケーションを開発することができます。さらに、LLMがネットワーク経由でホストされている別のマシンからサーバーにアクセスすることもできます。</p>
<p>コマンドラインからサーバーを起動すると、8080番ポートをリッスンします：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">./llama-server -m dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf -n 2048 -t 64 -c 65536  --port 8080</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'main: server is listening on 127.0.0.1:8080 - starting the main loop
</code></pre>
<p>また、起動したLLMのパラメータを調整して、サーバーのハードウェアに適合させ、理想的なパフォーマンスを得ることもできます。パラメータの詳細については、<code translate="no">llama-server --help</code> コマンドを参照してください。</p>
<p>このステップを実行するのに苦労した場合は、<a href="https://learn.arm.com/learning-paths/servers-and-cloud-computing/llama-cpu/llama-chatbot/">公式ドキュメントを</a>参照してください。</p>
<p>これで、ArmベースのCPU上でLLMサービスが開始されました。次に、OpenAI SDKを使用してサービスと直接対話します。</p>
<h2 id="Online-RAG" class="common-anchor-header">オンラインRAG<button data-href="#Online-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="LLM-Client-and-Embedding-Model" class="common-anchor-header">LLMクライアントと埋め込みモデル</h3><p>LLMクライアントを初期化し、エンベッディングモデルを準備します。</p>
<p>LLMでは、OpenAI SDKを使って、先に起動したLlamaサービスをリクエストします。実際にはローカルのllama.cppサービスなので、APIキーを使う必要はありません。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

llm_client = OpenAI(base_url=<span class="hljs-string">&quot;http://localhost:8080/v1&quot;</span>, api_key=<span class="hljs-string">&quot;no-key&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>テスト埋め込みを生成し、その次元と最初のいくつかの要素を表示します。</p>
<pre><code translate="no" class="language-python">test_embedding = embedding_model.embed_query(<span class="hljs-string">&quot;This is a test&quot;</span>)
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">384
[0.03061249852180481, 0.013831384479999542, -0.02084377221763134, 0.016327863559126854, -0.010231520049273968, -0.0479842908680439, -0.017313342541456223, 0.03728749603033066, 0.04588735103607178, 0.034405000507831573]
</code></pre>
<h3 id="Retrieve-data-for-a-query" class="common-anchor-header">クエリのデータを取得する</h3><p>milvusに関するよくある質問を指定してみましょう。</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>コレクションから質問を検索し、意味的にトップ3にマッチするものを取得します。</p>
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
<h3 id="Use-LLM-to-get-a-RAG-response" class="common-anchor-header">LLMを使ってRAGレスポンスを取得する</h3><p>検索されたドキュメントを文字列形式に変換する。</p>
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
<p>LLMを使って、プロンプトに基づいたレスポンスを生成する。パラメータ<code translate="no">model</code> はllama.cppサービスの冗長なパラメータなので、<code translate="no">not-used</code> に設定する。</p>
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
<p>おめでとうございます！あなたは、Armベースのインフラストラクチャの上にRAGアプリケーションを構築しました。</p>
