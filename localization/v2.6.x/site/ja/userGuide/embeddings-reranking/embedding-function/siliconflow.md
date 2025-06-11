---
id: siliconflow.md
title: SiliconFLowCompatible with Milvus 2.6.x
summary: このトピックでは、MilvusにおけるSiliconFLowエンベッディング関数の設定方法と使用方法について説明します。
beta: Milvus 2.6.x
---
<h1 id="SiliconFLow" class="common-anchor-header">SiliconFLow<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#SiliconFLow" class="anchor-icon" translate="no">
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
    </button></h1><p>このトピックでは、MilvusにおけるSiliconFLowエンベッディング関数の設定方法と使用方法について説明します。</p>
<h2 id="Choose-an-embedding-model" class="common-anchor-header">エンベッディングモデルの選択<button data-href="#Choose-an-embedding-model" class="anchor-icon" translate="no">
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
    </button></h2><p>MilvusはSiliconFLowが提供するエンベッディングモデルに対応しています。以下に、現在利用可能なSiliconFLowのエンベッディングモデルを示しますので、ご参照ください：</p>
<table>
   <tr>
     <th><p>モデル名</p></th>
     <th><p>寸法</p></th>
     <th><p>最大トークン数</p></th>
     <th><p>説明</p></th>
   </tr>
   <tr>
     <td><p>BAAI/bge-large-zh-v1.5</p></td>
     <td><p>1,024</p></td>
     <td><p>512</p></td>
     <td><p>BGE(BAAI General Embedding)シリーズに含まれる大規模な中国語テキスト埋め込みモデル。</p></td>
   </tr>
   <tr>
     <td><p>BAAI/bge-large-ja-v1.5</p></td>
     <td><p>1,024</p></td>
     <td><p>512</p></td>
     <td><p>BGE (BAAI General Embedding)シリーズに含まれる大規模英語テキスト埋め込みモデル。</p></td>
   </tr>
   <tr>
     <td><p>netease-youdao/bce-embedding-base_v1</p></td>
     <td><p>768</p></td>
     <td><p>512</p></td>
     <td><p>NetEase Youdaoが開発したバイリンガル/クロスリンガル埋め込みモデルです。中国語と英語の意味表現と検索タスクで優れた性能を発揮し、特にクロスリンガルシナリオで優れている。</p></td>
   </tr>
   <tr>
     <td><p>BAAI/bge-m3</p></td>
     <td><p>1,024</p></td>
     <td><p>8,192</p></td>
     <td><p>多機能・多言語・多粒度のテキスト埋め込みモデル。密検索、多ベクトル検索、疎検索の3つの一般的な検索機能をサポート。</p></td>
   </tr>
   <tr>
     <td><p>Pro/BAAI/bge-m3</p></td>
     <td><p>1,024</p></td>
     <td><p>8,192</p></td>
     <td><p>多機能、多言語、多粒度のテキスト埋め込みモデル。密検索、多ベクトル検索、疎検索の3つの一般的な検索機能をサポートする。100以上の言語の入力を処理でき、異なる粒度を扱うことができる。</p></td>
   </tr>
</table>
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
    </button></h2><p>Milvusはエンベッディングをリクエストする前にSiliconFlow APIキーを知っている必要があります。Milvusはクレデンシャルを設定するために2つの方法を提供します：</p>
<ul>
<li><p><strong>設定ファイル（推奨）：</strong>APIキーを<code translate="no">milvus.yaml</code> に保存しておくと、再起動するたびにノードが自動的にAPIキーを取得します。</p></li>
<li><p><strong>環境変数：</strong>Docker Composeに最適です。</p></li>
</ul>
<p>コンフィギュレーション・ファイルはベアメタルやVMでメンテナンスしやすく、env-varルートはコンテナのワークフローに適している。</p>
<div class="alert note">
<p>同じプロバイダのAPIキーが設定ファイルと環境変数の両方に存在する場合、Milvusは常に<code translate="no">milvus.yaml</code> の値を使用し、環境変数は無視します。</p>
</div>
<h3 id="Option-1-Configuration-file" class="common-anchor-header">オプション 1: 設定ファイル</h3><p><code translate="no">milvus.yaml</code>Milvusは起動時にAPIキーを読み込み、同じプロバイダの環境変数を上書きします。</p>
<ol>
<li><p>**の下にキーを宣言してください。<code translate="no">credential:</code></p>
<p>APIキーは1つでも多くてもかまいません。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">apikey_dev:</span>            <span class="hljs-comment"># dev environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_DEV_KEY&gt;</span>
  <span class="hljs-attr">apikey_prod:</span>           <span class="hljs-comment"># production environment</span>
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_PROD_KEY&gt;</span>    
<button class="copy-code-btn"></button></code></pre>
<p>APIキーをここに記述することで、再起動後もAPIキーが保持され、ラベルを変更するだけでAPIキーを切り替えることができます。</p></li>
<li><p><strong>Milvusに、サービス呼び出しに使用するキーを知らせる。</strong></p>
<p>同じファイルで、SiliconFlow プロバイダに使用するラベルを指定します。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">siliconflow:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey_dev</span>      <span class="hljs-comment"># ← choose any label you defined above</span>
        <span class="hljs-comment"># url: https://api.siliconflow.cn/v1/embeddings   # (optional) custom endpoint</span>
<button class="copy-code-btn"></button></code></pre>
<p>これにより、MilvusがOpenAIのembeddingsエンドポイントに送信するすべてのリクエストに特定のキーがバインドされます。</p></li>
</ol>
<h3 id="Option-2-Environment-variable" class="common-anchor-header">オプション 2: 環境変数</h3><p>Docker ComposeでMilvusを実行し、ファイルやイメージから秘密を守りたい場合は、この方法を使用してください。</p>
<p>Milvus は<code translate="no">milvus.yaml</code> にプロバイダのキーが見つからない場合のみ、環境変数にフォールバックします。</p>
<table>
   <tr>
     <th><p>変数</p></th>
     <th><p>必須</p></th>
     <th><p>説明</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">MILVUSAI_SILICONFLOW_API_KEY</code></p></td>
     <td><p>はい</p></td>
     <td><p>有効な SiliconFlow API キー。</p></td>
   </tr>
</table>
<p><strong>docker-compose.yaml</strong>ファイルで、<code translate="no">MILVUSAI_SILICONFLOW_API_KEY</code> 環境変数を設定します。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># docker-compose.yaml (standalone service section)</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-comment"># ... other configurations ...</span>
  <span class="hljs-attr">environment:</span>
    <span class="hljs-comment"># ... other environment variables ...</span>
    <span class="hljs-comment"># Set the environment variable pointing to the SiliconFlow API key inside the container</span>
    <span class="hljs-attr">MILVUSAI_SILICONFLOW_API_KEY:</span> <span class="hljs-string">&lt;MILVUSAI_SILICONFLOW_API_KEY&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">environment:</code> ブロックは、Milvus コンテナにのみキーを注入し、ホスト OS はそのままにします。詳しくは、<a href="/docs/ja/configure-docker.md#Configure-Milvus-with-Docker-Compose">Docker Composeでmilvusを設定するを</a>参照してください。</p>
<h2 id="Use-embedding-function" class="common-anchor-header">埋め込み関数の使用<button data-href="#Use-embedding-function" class="anchor-icon" translate="no">
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
    </button></h2><p>認証情報の設定が完了したら、以下の手順で埋め込み関数を定義し、使用します。</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">ステップ1: スキーマフィールドの定義</h3><p>埋め込み関数を使用するには、特定のスキーマを持つコレクションを作成します。このスキーマには、少なくとも3つの必要なフィールドが含まれていなければなりません：</p>
<ul>
<li><p>コレクション内の各エンティティを一意に識別するプライマリフィールド。</p></li>
<li><p>埋め込む生データを格納するスカラーフィールド。</p></li>
<li><p>スカラー・フィールドに対して関数が生成するベクトル埋め込みを格納するために予約されたベクトル・フィールド。</p></li>
</ul>
<p>次の例では、テキストデータを格納するためのスカラーフィールド<code translate="no">&quot;document&quot;</code> と、Functionモジュールによって生成される埋め込みデータを格納するためのベクトルフィールド<code translate="no">&quot;dense&quot;</code> を持つスキーマを定義しています。ベクトル次元(<code translate="no">dim</code>)は、選択した埋め込みモデルの出力に合わせて設定することを忘れないでください。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType

<span class="hljs-comment"># Initialize Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
)

<span class="hljs-comment"># Create a new schema for the collection</span>
schema = client.create_schema()

<span class="hljs-comment"># Add primary field &quot;id&quot;</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)

<span class="hljs-comment"># Add scalar field &quot;document&quot; for storing textual data</span>
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>)

<span class="hljs-comment"># Add vector field &quot;dense&quot; for storing embeddings.</span>
<span class="hljs-comment"># IMPORTANT: Set dim to match the exact output dimension of the embedding model.</span>
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1024</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">ステップ 2: スキーマへの埋め込み関数の追加</h3><p>MilvusのFunctionモジュールは、スカラーフィールドに格納された生データを自動的に埋め込みデータに変換し、明示的に定義されたベクトルフィールドに格納します。</p>
<p>下の例では、スカラーフィールド<code translate="no">&quot;document&quot;</code> をエンベッディングに変換する Function モジュール (<code translate="no">siliconflow_embedding</code>) を追加し、結果のベクトルを先に定義した<code translate="no">&quot;dense&quot;</code> ベクトルフィールドに格納しています。</p>
<p>埋め込み関数を定義したら、コレクションスキーマに追加します。これにより、Milvusは指定された埋め込み関数を使用して、テキストデータの埋め込みを処理し、格納するようになります。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function specifically for embedding model provider</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;siliconflow_embedding&quot;</span>,                        <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,       <span class="hljs-comment"># Indicates a text embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],                 <span class="hljs-comment"># Scalar field(s) containing text data to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],                   <span class="hljs-comment"># Vector field(s) for storing embeddings</span>
    params={                                      <span class="hljs-comment"># Provider-specific embedding parameters (function-level)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;siliconflow&quot;</span>,                <span class="hljs-comment"># Must be set to &quot;siliconflow&quot;</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;BAAI/bge-large-en-v1.5&quot;</span>,    <span class="hljs-comment"># Specifies the SiliconFlow embedding model to use</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey_dev&quot;,          # Optional: Credential label specified in milvus.yaml</span>
        <span class="hljs-comment"># &quot;url&quot;: &quot;https://api.siliconflow.cn/v1/embeddings&quot;,  # Defaults to the official endpoint if omitted</span>
    }
)

<span class="hljs-comment"># Add the configured embedding function to your existing collection schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
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
