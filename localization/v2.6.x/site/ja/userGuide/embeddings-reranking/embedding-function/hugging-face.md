---
id: hugging-face.md
title: Hugging FaceCompatible with Milvus v2.6.20+
summary: このトピックでは、Milvus でのテキスト埋め込みに、ホスト型 Hugging Face 推論プロバイダーを使用する方法について説明します。
beta: Milvus v2.6.20+
---
<h1 id="Hugging-Face" class="common-anchor-header">Hugging Face<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.20+</span><button data-href="#Hugging-Face" class="anchor-icon" translate="no">
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
    </button></h1><p>Hugging Faceの埋め込みモデルを使用する場合、通常はアプリケーション側で認証情報を管理し、モデルを個別に呼び出し、挿入されたデータや検索クエリに対して一貫して埋め込みを生成する必要があります。テキスト埋め込み機能を使用すると、Milvusはホスト<a href="https://huggingface.co/docs/inference-providers/index">型のHugging Face推論プロバイダー</a>を呼び出し、データの挿入時および検索時に生テキストをベクトルに変換します。</p>
<p>この統合では、ホスト型 Hugging Face ルーターが使用されます。Milvus を別途デプロイされた Text Embeddings Inference (TEI) サービスに接続するには、「<a href="/docs/ja/v2.6.x/hugging-face-tei.md">Hugging Face TEI」を</a>参照してください。</p>
<h2 id="Limits" class="common-anchor-header">制限事項<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li>Functionの出力フィールドには、<code translate="no">FLOAT_VECTOR</code> データ型を使用する必要があります。MilvusにおけるHugging Faceの埋め込み機能では、<code translate="no">INT8_VECTOR</code> 、<code translate="no">BINARY_VECTOR</code> 、<code translate="no">FLOAT16_VECTOR</code> 、または<code translate="no">BFLOAT16_VECTOR</code> の出力フィールドはサポートされていません。</li>
<li>「Function」出力フィールドの次元は、選択したモデルの出力次元と一致している必要があります。</li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">仕組み<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/hugging-face-embedding-flow.png" alt="Hugging Face text embedding workflow" class="doc-image" id="hugging-face-text-embedding-workflow" /> 
   <span>Hugging Face テキスト埋め込みワークフロー</span>
  
 </span></p>
<p>このワークフローは 3 つの段階で構成されています。</p>
<ol>
<li><strong>生テキストの送信。</strong>アプリケーションは、挿入または検索リクエストで生テキストを提供します。</li>
<li><strong>埋め込みを生成します。</strong>「Text Embedding」関数は、<code translate="no">hf-inference</code> を経由して、Hugging Faceの<code translate="no">feature-extraction</code> パイプラインにテキストを送信します。この関数は<code translate="no">model_name</code> を使用してモデルを選択し、正規化や切り捨てなどのサポートされている推論オプションを渡すことができます。</li>
<li><strong>埋め込みを使用します。</strong>Hugging Faceは、入力テキスト1件につき1つの浮動小数点型埋め込みを返します。挿入時には、Milvusがこのベクトルを関数の出力フィールドに格納します。検索時には、Milvusがこのベクトルをクエリベクトルとして使用します。</li>
</ol>
<p>同じ関数設定で挿入と検索の両方を処理できるため、両操作においてモデルと推論パラメータの一貫性が保たれます。</p>
<h2 id="Before-you-start" class="common-anchor-header">開始する前に<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>Hugging Faceのホスト型テキスト埋め込み機能を使用する前に、以下の条件を満たしていることを確認してください：</p>
<ul>
<li>2.6リリースラインのMilvus 2.6.20以降。</li>
<li>PyMilvus 2.6.16以降。</li>
<li>推論プロバイダーを呼び出せる Hugging Face ユーザーアクセストークン。</li>
<li><code translate="no">hf-inference</code> によって現在提供されている、 <a href="https://huggingface.co/docs/inference-providers/en/tasks/feature-extraction"><code translate="no">feature-extraction</code></a> タスク用にxml-ph-0000@deepl.internalによって現在提供されているモデル。</li>
</ul>
<div class="alert note">
<p>Milvus は、Hugging Face モデルが<code translate="no">hf-inference</code> を通じて引き続き利用可能であるかどうか、あるいはそのモデルが安定性、レイテンシ、出力品質に関する要件を満たしているかどうかについては管理していません。本番環境で使用する前に、Hugging Face 上でモデルを確認し、ワークロードに対して評価を行ってください。</p>
</div>
<p>例では、 <a href="https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2"><code translate="no">sentence-transformers/all-MiniLM-L6-v2</code></a>を使用しており、これにより384次元の埋め込みが生成されます。このモデルは設定のデモ目的でのみ使用されており、Milvusによる推奨や認定を示すものではありません。</p>
<h2 id="Configure-credentials" class="common-anchor-header">認証情報の設定<button data-href="#Configure-credentials" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusでは、ホスト型ルーターを呼び出すためにHugging Faceのユーザーアクセストークンが必要です。トークンは<code translate="no">milvus.yaml</code> で設定するか、環境変数を通じて設定できます。</p>
<p>認証情報の優先順位は次のとおりです：</p>
<pre><code translate="no" class="language-text">Function credential label -&gt; provider credential label in milvus.yaml -&gt; environment variable
<button class="copy-code-btn"></button></code></pre>
<h3 id="Option-1-Configuration-file" class="common-anchor-header">オプション 1: 設定ファイル<button data-href="#Option-1-Configuration-file" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">milvus.yaml</code> の最上位セクションである<code translate="no">credential</code> 内にトークンを定義し、Hugging Face 埋め込みプロバイダーをその認証情報ラベルに指定します：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">huggingface_apikey:</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_HUGGING_FACE_TOKEN&gt;</span>

<span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">huggingface:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">huggingface_apikey</span>
        <span class="hljs-comment"># url: https://router.huggingface.co</span>
<button class="copy-code-btn"></button></code></pre>
<p>また、Functionパラメータで<code translate="no">credential</code> を設定することもできます。値は、トークンそのものではなく、<code translate="no">credential</code> セクションの最上位レベルで定義されたラベルでなければなりません。Functionレベルの認証情報ラベルは、プロバイダーレベルのラベルよりも優先されます。</p>
<h3 id="Option-2-Environment-variable" class="common-anchor-header">オプション 2: 環境変数<button data-href="#Option-2-Environment-variable" class="anchor-icon" translate="no">
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
    </button></h3><p>Function およびプロバイダーの設定のいずれにも認証情報ラベルが指定されていない場合、Milvus は `<code translate="no">MILVUS_HUGGINGFACE_API_KEY</code>` からトークンを読み取ります。</p>
<p>Docker Compose の場合、Milvus スタンドアロンサービス内で変数を設定します:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-attr">MILVUS_HUGGINGFACE_API_KEY:</span> <span class="hljs-string">&lt;YOUR_HUGGING_FACE_TOKEN&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Docker Compose 設定の適用に関する詳細については、「<a href="/docs/ja/v2.6.x/configure-docker.md">Docker Compose を使用した Milvus の設定</a>」を参照してください。</p>
<h2 id="Use-Hugging-Face-text-embedding" class="common-anchor-header">Hugging Faceのテキスト埋め込みを使用する<button data-href="#Use-Hugging-Face-text-embedding" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Create-a-collection-with-a-Text-Embedding-Function" class="common-anchor-header">ステップ 1: テキスト埋め込み関数を含むコレクションを作成する<button data-href="#Step-1-Create-a-collection-with-a-Text-Embedding-Function" class="anchor-icon" translate="no">
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
    </button></h3><p>プライマリフィールド、<code translate="no">VARCHAR</code> 入力フィールド、および<code translate="no">FLOAT_VECTOR</code> 出力フィールドを含むスキーマを作成します。出力次元は、選択したモデルと一致している必要があります。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

collection_name = <span class="hljs-string">&quot;hugging_face_embedding_demo&quot;</span>
schema = client.create_schema()

schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    auto_id=<span class="hljs-literal">False</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;document&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">9000</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
<span class="highlighted-wrapper-line">    dim=<span class="hljs-number">384</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>`<code translate="no">document</code> ` から `<code translate="no">dense</code>` へ埋め込みを書き込む `<code translate="no">TEXTEMBEDDING</code> ` 関数を定義します：</p>
<pre><code translate="no" class="language-python">text_embedding_function = Function(
    name=<span class="hljs-string">&quot;hugging_face_embedding&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],
    function_type=FunctionType.TEXTEMBEDDING,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;huggingface&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;sentence-transformers/all-MiniLM-L6-v2&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;hf_provider&quot;</span>: <span class="hljs-string">&quot;hf-inference&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;credential&quot;</span>: <span class="hljs-string">&quot;huggingface_apikey&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;normalize&quot;</span>: <span class="hljs-string">&quot;true&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;truncate&quot;</span>: <span class="hljs-string">&quot;true&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;max_client_batch_size&quot;</span>: <span class="hljs-number">128</span>,</span>
<span class="highlighted-comment-line">    },</span>
)

schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<p>プロバイダーレベルの認証情報または環境変数のみを使用する場合は、関数パラメータから<code translate="no">credential</code> を省略してください。</p>
<p>出力フィールドのインデックスを設定し、コレクションを作成します：</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>次の表は、Hugging Face固有の関数パラメータについて説明しています：</p>
<table>
<thead>
<tr><th>パラメータ</th><th>必須？</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">provider</code></td><td>はい</td><td>埋め込みモデルのプロバイダー。この値を<code translate="no">huggingface</code> に設定してください。</td></tr>
<tr><td><code translate="no">model_name</code></td><td>はい</td><td><code translate="no">feature-extraction</code> タスク向けに<code translate="no">hf-inference</code> を通じて提供されるモデルのHugging FaceモデルID。</td></tr>
<tr><td><code translate="no">hf_provider</code></td><td>いいえ</td><td>Hugging Face 推論プロバイダーのルート。Milvus 2.6.20 におけるデフォルト値かつ唯一サポートされている値は<code translate="no">hf-inference</code> です。</td></tr>
<tr><td><code translate="no">credential</code></td><td>いいえ</td><td><code translate="no">milvus.yaml</code> の最上位セクションである<code translate="no">credential</code> で定義された認証情報のラベル。この値はトークンそのものではありません。</td></tr>
<tr><td><code translate="no">normalize</code></td><td>いいえ</td><td>Hugging Faceが正規化された埋め込みを返すかどうか。サポートされる値は<code translate="no">true</code> および<code translate="no">false</code> です。省略された場合、Milvusはこのオプションをリクエストに設定しません。</td></tr>
<tr><td><code translate="no">prompt_name</code></td><td>いいえ</td><td>選択したモデルの Sentence Transformers 設定で定義されたプロンプトの名前。</td></tr>
<tr><td><code translate="no">truncate</code></td><td>いいえ</td><td>Hugging Faceが、モデルのサポートする長さを超える入力を切り捨てるかどうか。サポートされる値は、<code translate="no">true</code> および<code translate="no">false</code> です。</td></tr>
<tr><td><code translate="no">truncation_direction</code></td><td>いいえ</td><td>Hugging Faceが入力を切り詰める方向。サポートされている値は、<code translate="no">left</code> および<code translate="no">right</code> です。</td></tr>
<tr><td><code translate="no">max_client_batch_size</code></td><td>なし</td><td>1回のHugging Faceリクエストで送信される入力テキストの最大数。デフォルト値は<code translate="no">128</code> であり、この値は<code translate="no">0</code> より大きくなければなりません。</td></tr>
</tbody>
</table>
<h3 id="Step-2-Insert-raw-text" class="common-anchor-header">ステップ 2: 生のテキストを挿入<button data-href="#Step-2-Insert-raw-text" class="anchor-icon" translate="no">
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
    </button></h3><p>ベクトルを指定せずにテキストを挿入します。MilvusはHugging Faceを呼び出し、生成されたエンベディングを<code translate="no">dense</code> に書き込みます。</p>
<pre><code translate="no" class="language-python">client.insert(
    collection_name=collection_name,
    data=[
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;Milvus simplifies semantic search through embeddings.&quot;</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;Vector embeddings convert text into searchable numeric data.&quot;</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
            <span class="hljs-string">&quot;document&quot;</span>: <span class="hljs-string">&quot;Semantic search helps users find relevant information quickly.&quot;</span>,
        },
    ],
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Search-with-raw-text" class="common-anchor-header">ステップ 3: 生テキストでの検索<button data-href="#Step-3-Search-with-raw-text" class="anchor-icon" translate="no">
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
    </button></h3><p>テキストクエリを使用して検索します。Milvusは、ベクトル検索を実行する前に、同じ関数設定を適用してクエリベクトルを作成します。</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=collection_name,
    data=[<span class="hljs-string">&quot;How does Milvus handle semantic search?&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,
)

<span class="hljs-built_in">print</span>(results)
<button class="copy-code-btn"></button></code></pre>
<p>結果には、クエリテキストに最も関連性の高いドキュメントが、コサイン類似度順に表示されます。</p>
<h2 id="Troubleshooting" class="common-anchor-header">トラブルシューティング<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="The-model-is-unavailable-for-feature-extraction" class="common-anchor-header">特徴量抽出にモデルが利用できません<button data-href="#The-model-is-unavailable-for-feature-extraction" class="anchor-icon" translate="no">
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
    </button></h3><p>Hugging Faceでモデルページを開き、「<strong>Inference Providers</strong>」セクションを確認してください。「<code translate="no">hf-inference</code> 」が<code translate="no">feature-extraction</code> のモデルを提供していることを確認してください。そうでない場合は、別のモデルを選択し、必要に応じてベクトルフィールドの次元を更新してください。</p>
<h3 id="The-returned-vector-dimension-does-not-match-the-field" class="common-anchor-header">返されたベクトルの次元がフィールドと一致しません<button data-href="#The-returned-vector-dimension-does-not-match-the-field" class="anchor-icon" translate="no">
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
    </button></h3><p>モデルの出力次元を確認し、「Function output」フィールドの<code translate="no">dim</code> と比較してください。Milvusは、ベクトルの次元が<code translate="no">FLOAT_VECTOR</code> フィールドの次元と異なるレスポンスを拒否します。</p>
<h3 id="Milvus-reports-missing-Hugging-Face-credentials" class="common-anchor-header">Milvus から Hugging Face の認証情報が不足していると報告される<button data-href="#Milvus-reports-missing-Hugging-Face-credentials" class="anchor-icon" translate="no">
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
    </button></h3><p>トップレベルの「<code translate="no">credential</code> 」セクションに「Function」の認証情報ラベルが存在すること、プロバイダーレベルのラベルが有効であること、またはMilvusのサービス環境に<code translate="no">MILVUS_HUGGINGFACE_API_KEY</code> が存在することを確認してください。</p>
<h2 id="Next-steps" class="common-anchor-header">次の手順<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li>Function の一般的な概念および挿入/検索の動作については、「<a href="/docs/ja/v2.6.x/embedding-function-overview.md">Embedding Function の概要</a>」を参照してください。</li>
<li>ホスト型 Hugging Face の文類似度スコアを使用してベクトル検索の候補を再ランク付けするには、「<a href="/docs/ja/v2.6.x/hugging-face-ranker.md">Hugging Face Ranker</a>」を参照してください。</li>
</ul>
