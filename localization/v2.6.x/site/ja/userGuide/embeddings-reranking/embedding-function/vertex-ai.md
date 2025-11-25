---
id: vertex-ai.md
title: バーテックスAICompatible with Milvus 2.6.x
summary: >-
  Google Cloud Vertex AIは、テキスト埋め込みモデルに特化した高性能なサービスです。このガイドでは、Google Cloud Vertex
  AIとMilvusを組み合わせて、テキスト埋め込みを効率的に生成する方法を説明します。
beta: Milvus 2.6.x
---

<h1 id="Vertex-AI" class="common-anchor-header">バーテックスAI<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Vertex-AI" class="anchor-icon" translate="no">
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
    </button></h1><p>Google Cloud<a href="https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-text-embeddings">Vertex AIは</a>、テキスト埋め込みモデルに特化した高性能なサービスです。このガイドでは、Google Cloud Vertex AIとMilvusを組み合わせて、テキスト埋め込みを効率的に生成する方法を説明します。</p>
<p>Vertex AIは、様々なユースケースに対応するため、いくつかの埋め込みモデルをサポートしています：</p>
<ul>
<li><p>gemini-embedding-001 (英語、多言語、コードタスクにおける最先端のパフォーマンス)</p></li>
<li><p>text-embedding-005 (最新のテキスト埋め込みモデル)</p></li>
<li><p>text-multilingual-embedding-002（最新の多言語テキスト埋め込みモデル）</p></li>
</ul>
<p>詳細については、<a href="https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/text-embeddings">Vertex AIテキスト埋め込み</a>モデルを参照してください。</p>
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
    </button></h2><p>Vertex AI を設定する前に、以下の要件を満たしていることを確認してください：</p>
<ul>
<li><p><strong>Milvus バージョン 2.6 以上を実行する</strong>- デプロイが最小バージョン要件を満たしていることを確認します。</p></li>
<li><p><strong>Google Cloud サービス アカウントの作成</strong>- 最低限、"Vertex AI User" のようなロール、またはより具体的なロールが必要です。詳細については、「<a href="https://cloud.google.com/iam/docs/service-accounts-create?_gl=1*1jz33xw*_ga*MjE0NTAwMjk3Mi4xNzUwMTQwNTMw*_ga_WH2QY8WWF5*czE3NTAxNDA1MzEkbzEkZzEkdDE3NTAxNDIyOTEkajE0JGwwJGgw">サービス アカウントの作成</a>」を参照してください。</p></li>
<li><p><strong>サービス アカウントの JSON キー ファイルをダウンロードする</strong>- このクレデンシャル ファイルをサーバーまたはローカル マシンに安全に保存します。詳細については、「<a href="https://cloud.google.com/iam/docs/keys-create-delete?_gl=1*ittbs8*_ga*MjE0NTAwMjk3Mi4xNzUwMTQwNTMw*_ga_WH2QY8WWF5*czE3NTAxNDA1MzEkbzEkZzEkdDE3NTAxNDI0NjMkajYwJGwwJGgw#creating">サービス アカウント キーの作成</a>」を参照してください。</p></li>
</ul>
<h2 id="Configure-credentials" class="common-anchor-header">認証情報の構成<button data-href="#Configure-credentials" class="anchor-icon" translate="no">
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
    </button></h2><p>MilvusがVertex AIを呼び出す前に、GCPサービスアカウントのJSONキーにアクセスする必要があります。以下の 2 つの方法をサポートしています。</p>
<table>
   <tr>
     <th><p>オプション</p></th>
     <th><p>優先順位</p></th>
     <th><p>最適な方法</p></th>
   </tr>
   <tr>
     <td><p>設定ファイル (<code translate="no">milvus.yaml</code>)</p></td>
     <td><p>高い</p></td>
     <td><p>クラスタ全体の永続的な設定</p></td>
   </tr>
   <tr>
     <td><p>環境変数 (<code translate="no">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</code>)</p></td>
     <td><p>低い</p></td>
     <td><p>コンテナワークフロー、クイックテスト</p></td>
   </tr>
</table>
<h3 id="Option-1-Configuration-file-recommended--higher-priority" class="common-anchor-header">オプション 1: 設定ファイル (推奨 &amp; 優先度高)</h3><p>milvusは常に、同じプロバイダの環境変数よりも、<code translate="no">milvus.yaml</code> で宣言されたクレデンシャルを優先します。</p>
<ol>
<li><p>JSONキーをBase64エンコードする</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> credentials.json | jq . | <span class="hljs-built_in">base64</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>でクレデンシャルを宣言します。<code translate="no">milvus.yaml</code></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-attr">gcp_vertex:</span>                      <span class="hljs-comment"># arbitrary label</span>
    <span class="hljs-attr">credential_json:</span> <span class="hljs-string">|
      &lt;YOUR_BASE64_ENCODED_JSON&gt;
</span><button class="copy-code-btn"></button></code></pre></li>
<li><p>クレデンシャルをVertex AIプロバイダにバインドする。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">vertexai:</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">gcp_vertex</span>      <span class="hljs-comment"># must match the label above</span>
        <span class="hljs-attr">url:</span> <span class="hljs-string">&lt;optional:</span> <span class="hljs-string">custom</span> <span class="hljs-string">Vertex</span> <span class="hljs-string">AI</span> <span class="hljs-string">endpoint&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p><div class="alert note"></p>
<p>後でキーをローテーションする必要がある場合は、<code translate="no">credential_json</code> の Base64 文字列を更新し、milvus を再起動するだけです。</p>
<p></div></p></li>
</ol>
<h3 id="Option-2-Environment-variables" class="common-anchor-header">オプション 2: 環境変数</h3><p>デプロイ時にシークレットを注入したい場合は、この方法を使用してください。Milvusは、<code translate="no">milvus.yaml</code> に一致するエントリが存在しない場合にのみ、env-varsにフォールバックします。</p>
<div class="alert note">
<p>設定手順は、Milvusのデプロイモード(スタンドアロン vs. 分散クラスタ)とオーケストレーションプラットフォーム(Docker Compose vs. Kubernetes)によって異なります。</p>
</div>
<div class="filter">
 <a href="#docker">Docker Compose</a> <a href="#helm">Helm</a></div>
<div class="filter-docker">
<div class="alert note">
<p>Milvusの設定ファイル<strong>（docker-compose.yaml</strong>）を入手するには、<a href="/docs/ja/configure-docker.md#Download-an-installation-file">インストールファイルのダウンロードを</a>参照してください。</p>
</div>
<ol>
<li><p><strong>キーをコンテナにマウントする。</strong></p>
<p><code translate="no">docker-compose.yaml</code> ファイルを編集して、クレデンシャルボリュームマッピングを含める：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-comment"># Map host credential file to container path</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/path/to/your/credentials.json:/milvus/configs/google_application_credentials.json:ro</span>
<button class="copy-code-btn"></button></code></pre>
<p>前述の構成では</p>
<ul>
<li><p>信頼性の高いファイルアクセスのために絶対パスを使用する (<code translate="no">~/credentials.json</code> ではなく<code translate="no">/home/user/credentials.json</code> )。</p></li>
<li><p>コンテナ・パスは<code translate="no">.json</code> 拡張子で終わる必要がある。</p></li>
<li><p><code translate="no">:ro</code> フラグを使用して、セキュリティのための読み取り専用アクセスを保証する。</p></li>
</ul></li>
<li><p><strong>環境変数の設定</strong></p>
<p>同じ<code translate="no">docker-compose.yaml</code> ファイルに、クレデンシャル・パスを指す環境変数を追加する：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">environment:</span>
      <span class="hljs-comment"># Essential for Vertex AI authentication</span>
      <span class="hljs-attr">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS:</span> <span class="hljs-string">/milvus/configs/google_application_credentials.json</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>変更を適用する。</strong></p>
<p>Milvusコンテナを再起動し、設定を有効にする：</p>
<pre><code translate="no" class="language-bash">docker-compose down &amp;&amp; docker-compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
</div>
<div class="filter-helm">
<div class="alert note">
<p>Milvus設定ファイル<strong>（values.yaml</strong>）を取得するには、<a href="/docs/ja/configure-helm.md#Configure-Milvus-via-configuration-file">設定ファイルによるMilvusの設定を</a>参照してください。</p>
</div>
<ol>
<li><p><strong>Kubernetesシークレットの作成</strong></p>
<p>コントロールマシン（<strong>kubectlが</strong>設定されているマシン）で実行します：</p>
<pre><code translate="no" class="language-bash">kubectl create secret generic vertex-ai-secret \
  --from-file=credentials.json=/path/to/your/credentials.json \
  -n &lt;your-milvus-namespace&gt;
<button class="copy-code-btn"></button></code></pre>
<p>前のコマンドで</p>
<ul>
<li><p><code translate="no">vertex-ai-secret</code>:シークレットの名前（カスタマイズ可能）</p></li>
<li><p><code translate="no">/path/to/your/credentials.json</code>:GCPクレデンシャルファイルのローカルファイル名</p></li>
<li><p><code translate="no">&lt;your-milvus-namespace&gt;</code>:MilvusをホストするKubernetesの名前空間</p></li>
</ul></li>
<li><p><strong>Helmの値を設定する</strong></p>
<p>デプロイメントタイプに基づいて、<code translate="no">values.yaml</code> を更新します：</p>
<ul>
<li><p><strong>スタンドアロンデプロイの場合</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">standalone:</span>
  <span class="hljs-attr">extraEnv:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</span>
      <span class="hljs-attr">value:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>  <span class="hljs-comment"># Container path</span>
  
  <span class="hljs-attr">volumes:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
      <span class="hljs-attr">secret:</span>
        <span class="hljs-attr">secretName:</span> <span class="hljs-string">vertex-ai-secret</span>  <span class="hljs-comment"># Must match Step 1</span>
  
  <span class="hljs-attr">volumeMounts:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
      <span class="hljs-attr">mountPath:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>  <span class="hljs-comment"># Must match extraEnv value</span>
      <span class="hljs-attr">subPath:</span> <span class="hljs-string">credentials.json</span>  <span class="hljs-comment"># Must match secret key name</span>
      <span class="hljs-attr">readOnly:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>分散デプロイの場合（各コンポーネントに追加）</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">extraEnv:</span> 
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">MILVUSAI_GOOGLE_APPLICATION_CREDENTIALS</span>
      <span class="hljs-attr">value:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>
  <span class="hljs-attr">volumes:</span> 
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
      <span class="hljs-attr">secret:</span>
        <span class="hljs-attr">secretName:</span> <span class="hljs-string">vertex-ai-secret</span>
  <span class="hljs-attr">volumeMounts:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vertex-ai-credentials-vol</span>
      <span class="hljs-attr">mountPath:</span> <span class="hljs-string">/milvus/configs/credentials.json</span>
      <span class="hljs-attr">subPath:</span> <span class="hljs-string">credentials.json</span>
      <span class="hljs-attr">readOnly:</span> <span class="hljs-literal">true</span>

<span class="hljs-comment"># Repeat same configuration for dataNode, etc.</span>
<button class="copy-code-btn"></button></code></pre></li>

</ul></li>
<li><p><strong>Helmの設定を適用する</strong></p>
<p>更新した設定をクラスタにデプロイします：</p>
<pre><code translate="no" class="language-bash">helm upgrade milvus milvus/milvus -f values.yaml -n &lt;your-milvus-namespace&gt;
<button class="copy-code-btn"></button></code></pre></li>
</ol>
</div>
<h2 id="Use-embedding-function" class="common-anchor-header">埋め込み機能を使用する<button data-href="#Use-embedding-function" class="anchor-icon" translate="no">
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
    </button></h2><p>Vertex AIが構成されたら、以下の手順に従って埋め込み関数を定義し、使用します。</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">ステップ1：スキーマフィールドの定義</h3><p>埋め込み関数を使用するには、特定のスキーマを持つコレクションを作成します。このスキーマには、少なくとも3つの必要なフィールドが含まれていなければなりません：</p>
<ul>
<li><p>コレクション内の各エンティティを一意に識別するプライマリフィールド。</p></li>
<li><p>埋め込む生データを格納するスカラーフィールド。</p></li>
<li><p>スカラーフィールドに対して関数が生成するベクトル埋め込みを格納するために予約されたベクトルフィールド。</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Function, FunctionType, CollectionSchema, FieldSchema

<span class="hljs-comment"># Assume you have connected to Milvus</span>
<span class="hljs-comment"># client = MilvusClient(uri=&quot;http://localhost:19530&quot;)</span>

<span class="hljs-comment"># 1. Create Schema</span>
schema = MilvusClient.create_schema()

<span class="hljs-comment"># 2. Add fields</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">9000</span>) <span class="hljs-comment"># Store text data</span>
<span class="hljs-comment"># IMPORTANT: Set dim to match the output dimension of the model and parameters</span>
schema.add_field(<span class="hljs-string">&quot;dense_vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>) <span class="hljs-comment"># Store embedding vectors (example dimension)</span>
<button class="copy-code-btn"></button></code></pre>

<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">ステップ 2: スキーマへの埋め込み関数の追加</h3><p>MilvusのFunctionモジュールは、スカラーフィールドに格納された生データを自動的に埋め込みデータに変換し、明示的に定義されたベクトルフィールドに格納します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. Define Vertex AI embedding function</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;vert_func&quot;</span>,                           <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,   <span class="hljs-comment"># Indicates a text embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],             <span class="hljs-comment"># Scalar field(s) containing text data to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense_vector&quot;</span>],        <span class="hljs-comment"># Vector field(s) for storing embeddings</span>
    params={                                    <span class="hljs-comment"># Vertex AI specific parameters (function-level)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;vertexai&quot;</span>,                 <span class="hljs-comment"># Must be set to &quot;vertexai&quot;</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-005&quot;</span>,     <span class="hljs-comment"># Required: Specifies the Vertex AI model to use</span>
        <span class="hljs-string">&quot;projectid&quot;</span>: <span class="hljs-string">&quot;your-gcp-project-id&quot;</span>,     <span class="hljs-comment"># Required: Your Google Cloud project ID</span>
        <span class="hljs-comment"># Optional parameters (include these only if necessary):</span>
        <span class="hljs-comment"># &quot;location&quot;: &quot;us-central1&quot;,            # Optional: Vertex AI service region (default us-central1)</span>
        <span class="hljs-comment"># &quot;task&quot;: &quot;DOC_RETRIEVAL&quot;,              # Optional: Embedding task type (default DOC_RETRIEVAL)</span>
        <span class="hljs-comment"># &quot;dim&quot;: 768                            # Optional: Output vector dimension (1-768)</span>
    }
)

<span class="hljs-comment"># Add the configured embedding function to your existing collection schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>

<table>
   <tr>
     <th><p><strong>パラメータ</strong></p></th>
     <th><p><strong>説明</strong></p></th>
     <th><p><strong>必須か？</strong></p></th>
     <th><p><strong>値の例</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>埋め込みモデルプロバイダ。vertexai "に設定。</p></td>
     <td><p>はい</p></td>
     <td><p><code translate="no">"vertexai"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>使用する頂点AI埋め込みモデルを指定する。</p></td>
     <td><p>はい</p></td>
     <td><p><code translate="no">"text-embedding-005"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">projectid</code></p></td>
     <td><p>Google CloudのプロジェクトID。</p></td>
     <td><p>はい</p></td>
     <td><p><code translate="no">"your-gcp-project-id"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">location</code></p></td>
     <td><p>Vertex AI サービスのリージョン。現在、Vertex AI エンベッディングは主に us-central1 をサポートしています。デフォルトは us-central1 です。</p></td>
     <td><p>いいえ</p></td>
     <td><p><code translate="no">"us-central1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">task</code></p></td>
     <td><p>埋め込み結果に影響する埋め込みタスクのタイプを指定します。指定可能な値：DOC_RETRIEVAL（デフォルト）、CODE_RETRIEVAL（005のみサポート）、STS（Semantic Textual Similarity）。</p></td>
     <td><p>いいえ</p></td>
     <td><p><code translate="no">"DOC_RETRIEVAL"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dim</code></p></td>
     <td><p>出力埋め込みベクトルの次元。1から768までの整数を受け付ける。<strong>注：</strong>指定する場合は、スキーマのベクトル・フィールドの次元がこの値と一致するようにしてください。</p></td>
     <td><p>いいえ</p></td>
     <td><p><code translate="no">768</code></p></td>
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
    </button></h2><p>埋め込み関数を設定した後、インデックス設定、データ挿入例、セマンティック検索操作に関する追加ガイダンスについては、<a href="/docs/ja/embeddings.md">関数の概要を</a>参照してください。</p>
