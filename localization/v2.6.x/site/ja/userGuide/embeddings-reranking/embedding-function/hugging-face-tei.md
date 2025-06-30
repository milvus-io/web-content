---
id: hugging-face-tei.md
title: ハギング・フェイスTEICompatible with Milvus 2.6.x
summary: >-
  Hugging Face Text Embeddings Inference
  (TEI)は、特にテキスト埋め込みモデルのために設計された高性能推論サーバーです。このガイドでは、MilvusでHugging Face
  TEIを使用し、効率的にテキスト埋め込みを生成する方法を説明します。
beta: Milvus 2.6.x
---
<h1 id="Hugging-Face-TEI" class="common-anchor-header">ハギング・フェイスTEI<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Hugging-Face-TEI" class="anchor-icon" translate="no">
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
    </button></h1><p>Hugging Face<a href="https://huggingface.co/docs/text-embeddings-inference/en/index">Text Embeddings Inference (TEI)</a>は、特にテキスト埋め込みモデルのために設計された高性能推論サーバーです。このガイドでは、MilvusでHugging Face TEIを使用し、効率的にテキスト埋め込みを生成する方法を説明します。</p>
<p>TEIはHugging Face Hubが提供する以下のような多くのテキスト埋め込みモデルに対応しています：</p>
<ul>
<li><p>BAAI/bge-*シリーズ</p></li>
<li><p>sentence-transformers/* シリーズ</p></li>
<li><p>E5モデル</p></li>
<li><p>GTEモデル</p></li>
<li><p>その他多数</p></li>
</ul>
<div class="alert note">
<p>最新の対応機種一覧は、<a href="https://github.com/huggingface/text-embeddings-inference">TEI GitHubリポジトリ</a>および<a href="https://huggingface.co/models?pipeline_tag=text-embedding">Hugging Face Hubを</a>ご参照ください。</p>
</div>
<h2 id="TEI-deployment" class="common-anchor-header">TEIの導入<button data-href="#TEI-deployment" class="anchor-icon" translate="no">
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
    </button></h2><p>MilvusにTEI機能を設定する前に、TEIサービスが動作している必要があります。Milvusは2つのTEIデプロイ方法をサポートしています：</p>
<h3 id="Standard-deployment-external" class="common-anchor-header">標準デプロイメント（外部デプロイメント）</h3><p>Hugging Faceの公式メソッドを使用して、TEIをスタンドアロンサービスとしてデプロイすることができます。このアプローチでは、TEIサービスを最大限に柔軟にコントロールすることができます。</p>
<p>Dockerやその他の方法を用いたTEIのデプロイに関する詳しい説明は、<a href="https://huggingface.co/docs/text-embeddings-inference/en/quick_tour#deploy">Hugging Face Text Embeddings Inferenceの公式ドキュメントを</a>参照してください。</p>
<p>デプロイ後、<a href="/docs/ja/hugging-face-tei.md#Use-embedding-function-">MilvusのTEI機能を使用する</a>際に必要となりますので、TEIサービスのエンドポイント（例:<code translate="no">http://localhost:8080</code> ）を控えておいてください。</p>
<h3 id="Milvus-Helm-Chart-deployment-integrated" class="common-anchor-header">Milvus Helm Chartのデプロイ(統合)</h3><p>Kubernetes環境向けに、MilvusはHelmチャートによる統合デプロイオプションを提供しています。これにより、Milvusと一緒にTEIのデプロイと設定を行うことで、プロセスを簡素化することができます。</p>
<p>MilvusのHelmデプロイメントでTEIを有効にするには：</p>
<ol>
<li><p>TEIを有効にするために<strong>values.yamlを</strong>設定します：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">tei:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">image:</span>
    <span class="hljs-attr">repository:</span> <span class="hljs-string">ghcr.io/huggingface/text-embeddings-inference</span>
    <span class="hljs-attr">tag:</span> <span class="hljs-string">&quot;1.7&quot;</span> <span class="hljs-comment"># Modify based on hardware</span>
  <span class="hljs-attr">model:</span> <span class="hljs-string">&quot;BAAI/bge-large-en-v1.5&quot;</span> <span class="hljs-comment"># Modify based on requirements</span>
  <span class="hljs-comment"># revision: &quot;main&quot;</span>
  <span class="hljs-comment"># hfTokenSecretName: &quot;my-huggingface-token-secret&quot;</span>
  <span class="hljs-comment"># apiKey: &quot;your_secure_api_key&quot;</span>
  <span class="hljs-comment"># apiKeySecret:</span>
  <span class="hljs-comment">#   name: &quot;my-tei-api-key-secret&quot;</span>
  <span class="hljs-comment">#   key: &quot;api-key&quot;</span>
  <span class="hljs-attr">resources:</span>
    <span class="hljs-attr">requests:</span>
      <span class="hljs-attr">cpu:</span> <span class="hljs-string">&quot;1&quot;</span>
      <span class="hljs-attr">memory:</span> <span class="hljs-string">&quot;4Gi&quot;</span>
      <span class="hljs-comment"># nvidia.com/gpu: &quot;1&quot; # For GPU</span>
    <span class="hljs-attr">limits:</span>
      <span class="hljs-attr">cpu:</span> <span class="hljs-string">&quot;2&quot;</span>
      <span class="hljs-attr">memory:</span> <span class="hljs-string">&quot;8Gi&quot;</span>
      <span class="hljs-comment"># nvidia.com/gpu: &quot;1&quot; # For GPU</span>
  <span class="hljs-attr">extraArgs:</span> []

<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvusをデプロイまたはアップグレードします：</p>
<pre><code translate="no" class="language-bash">helm install my-release milvus/milvus -f values.yaml -n &lt;your-milvus-namespace&gt;
<span class="hljs-comment"># or</span>
helm upgrade my-release milvus/milvus -f values.yaml --reset-then-reuse-values -n &lt;your-milvus-namespace&gt;
<button class="copy-code-btn"></button></code></pre>
<p><div class="alert note"></p>
<p>Helmチャートデプロイメントを使用する場合、TEIサービスはKubernetesクラスタ内の<code translate="no">http://my-release-milvus-tei:80</code> （リリース名を使用）でアクセスできるようになります。これをTEI機能設定のエンドポイントとして使用します。</p>
<p></div></p></li>
</ol>
<h2 id="Configuration-in-Milvus" class="common-anchor-header">milvusでの設定<button data-href="#Configuration-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>TEIサービスをデプロイした後、TEIエンベッディング関数を定義する際にエンドポイントを指定する必要があります。MilvusではデフォルトでTEIが有効になっているため、ほとんどの場合、追加の設定は必要ありません。</p>
<p>ただし、TEIサービスがAPIキー認証(<code translate="no">--api-key</code> フラグ)付きでデプロイされている場合、Milvusがこのキーを使用するように設定する必要があります：</p>
<ol>
<li><p><strong> <code translate="no">credential</code> ：</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">tei_key:</span>  <span class="hljs-comment"># You can use any label name</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_TEI_API_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>milvus.yamlでクレデンシャルを参照する：</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">tei:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">tei_key</span>      <span class="hljs-comment"># ← choose any label you defined above</span>
        <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># enabled by default. no action required.</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Use-embedding-function" class="common-anchor-header">埋め込み関数を使用する<button data-href="#Use-embedding-function" class="anchor-icon" translate="no">
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
    </button></h2><p>TEIサービスが設定されたら、以下のステップに従って埋め込み関数を定義し、使用してください。</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">ステップ1：スキーマ・フィールドの定義</h3><p>埋め込み関数を使用するには、特定のスキーマを持つコレクションを作成します。このスキーマには、少なくとも3つの必要なフィールドが含まれていなければなりません：</p>
<ul>
<li><p>コレクション内の各エンティティを一意に識別するプライマリフィールド。</p></li>
<li><p>埋め込む生データを格納するスカラーフィールド。</p></li>
<li><p>スカラー・フィールドに対して関数が生成するベクトル埋め込みを格納するために予約されたベクトル・フィールド。</p></li>
</ul>
<p>次の例では、テキストデータを格納するためのスカラーフィールド<code translate="no">&quot;document&quot;</code> と、Functionモジュールによって生成される埋め込みデータを格納するためのベクトルフィールド<code translate="no">&quot;dense_vector&quot;</code> を持つスキーマを定義しています。ベクトル次元(<code translate="no">dim</code>)は、選択した埋め込みモデルの出力に合わせて設定することを忘れないでください。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType, CollectionSchema, FieldSchema

<span class="hljs-comment"># Assume you have connected to Milvus</span>
<span class="hljs-comment"># client = MilvusClient(uri=&quot;http://localhost:19530&quot;)</span>

<span class="hljs-comment"># 1. Create Schema</span>
schema = MilvusClient.create_schema()

<span class="hljs-comment"># 2. Add fields</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>) <span class="hljs-comment"># Store text data</span>
<span class="hljs-comment"># IMPORTANT: Set dim to exactly match the TEI model&#x27;s output dimension</span>
schema.add_field(<span class="hljs-string">&quot;dense_vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1024</span>) <span class="hljs-comment"># Store embedding vectors (example dimension)</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">ステップ 2: スキーマへの埋め込み関数の追加</h3><p>MilvusのFunctionモジュールは、スカラーフィールドに格納された生データを自動的に埋め込みデータに変換し、明示的に定義されたベクトルフィールドに格納します。</p>
<p>下の例では、スカラーフィールド<code translate="no">&quot;document&quot;</code> をエンベッディングに変換する Function モジュール (<code translate="no">tei_func</code>) を追加し、結果のベクトルを先に定義した<code translate="no">&quot;dense_vector&quot;</code> ベクトルフィールドに格納しています。</p>
<p>埋め込み関数を定義したら、コレクションスキーマに追加します。これにより、Milvusは指定された埋め込み関数を使用して、テキストデータの埋め込みを処理し、格納するようになります。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. Define TEI embedding function</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;tei_func&quot;</span>,                            <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,   <span class="hljs-comment"># Indicates a text embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],             <span class="hljs-comment"># Scalar field(s) containing text data to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense_vector&quot;</span>],        <span class="hljs-comment"># Vector field(s) for storing embeddings</span>
    params={                                    <span class="hljs-comment"># TEI specific parameters (function-level)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;TEI&quot;</span>,                      <span class="hljs-comment"># Must be set to &quot;TEI&quot;</span>
        <span class="hljs-string">&quot;endpoint&quot;</span>: <span class="hljs-string">&quot;http://your-tei-service-endpoint:80&quot;</span>, <span class="hljs-comment"># Required: Points to your TEI service address</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;truncate&quot;: &quot;true&quot;,                   # Optional: Whether to truncate long input (default false)</span>
        <span class="hljs-comment"># &quot;truncation_direction&quot;: &quot;right&quot;,      # Optional: Truncation direction (default right)</span>
        <span class="hljs-comment"># &quot;max_client_batch_size&quot;: 64,          # Optional: Client max batch size (default 32)</span>
        <span class="hljs-comment"># &quot;ingestion_prompt&quot;: &quot;passage: &quot;,      # Optional: (Advanced) Ingestion phase prompt</span>
        <span class="hljs-comment"># &quot;search_prompt&quot;: &quot;query: &quot;            # Optional: (Advanced) Search phase prompt</span>
    }
)

<span class="hljs-comment"># Add the configured embedding function to your existing collection schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p><strong>パラメータ</strong></p></th>
     <th><p><strong>必須</strong></p></th>
     <th><p><strong>説明</strong></p></th>
     <th><p><strong>値の例</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>はい</p></td>
     <td><p>埋め込みモデルプロバイダ。TEI "に設定する。</p></td>
     <td><p>"TEI"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">endpoint</code></p></td>
     <td><p>Yes</p></td>
     <td><p>デプロイされたTEIサービスを指すネットワークアドレス。Milvus Helm Chart 経由でデプロイされた場合、通常は内部サービスアドレスになります。</p></td>
     <td><p>"http://localhost:8080", "http://my-release-milvus-tei:80"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">truncate</code></p></td>
     <td><p>いいえ</p></td>
     <td><p>モデルの最大長を超える入力テキストを切り捨てるかどうか。デフォルトはfalse。</p></td>
     <td><p>"true"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">truncation_direction</code></p></td>
     <td><p>いいえ</p></td>
     <td><p>truncateがtrueの場合に有効。左から切り捨てるか、右から切り捨てるかを指定します。デフォルトは右。</p></td>
     <td><p>"left"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>いいえ</p></td>
     <td><p>MilvusクライアントがTEIに送信する最大バッチサイズ。デフォルトは32。</p></td>
     <td><p>64</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">prompt_name</code></p></td>
     <td><p>いいえ</p></td>
     <td><p>(詳細) 文節変換設定プロンプト辞書のキーを指定する。特定のプロンプト形式を必要とする特定のモデルに使用される。TEIのサポートは制限される場合があり、Hub上のモデルの設定に依存する。</p></td>
     <td><p>"your_prompt_key"</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ingestion_prompt</code></p></td>
     <td><p>いいえ</p></td>
     <td><p>(詳細）データ挿入（取り込み）フェーズで使用するプロンプトを指定します。使用するTEIモデルによって異なります。モデルはプロンプトをサポートしている必要があります。</p></td>
     <td><p>「プロンプトをサポートしている必要があります："</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_prompt</code></p></td>
     <td><p>いいえ</p></td>
     <td><p>(詳細）検索フェーズで使用するプロンプトを指定する。使用するTEIモデルに依存する。モデルはプロンプトをサポートしていなければならない。</p></td>
     <td><p>"query："</p></td>
   </tr>
</table>
<h2 id="Next-steps" class="common-anchor-header">次のステップ<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><p>埋め込み関数を設定した後、インデックス設定、データ挿入例、セマンティック検索操作に関する追加ガイダンスについては、「<a href="/docs/ja/embedding-function-overview.md">関数の概要</a>」を参照してください。</p>
