---
id: embedding-function-overview.md
title: 埋め込み関数の概要Compatible with Milvus 2.6.x
summary: >-
  MilvusのFunctionモジュールを使うと、外部のモデルプロバイダー（OpenAI、AWS Bedrock、Google Vertex
  AIなど）を自動的に呼び出すことで、生のテキストデータをベクトル埋め込みデータに変換することができます。Milvusは、プロバイダーへのリクエストの送信、埋め込みデータの受信、コレクションへの保存をすべて行います。セマンティック検索では、クエリベクトルではなく、生のクエリデータのみを提供する必要があります。Milvusは、インジェストに使用したのと同じモデルでクエリベクトルを生成し、保存されたベクターと比較し、最も関連性の高い結果を返します。
beta: Milvus 2.6.x
---
<h1 id="Embedding-Function-Overview" class="common-anchor-header">埋め込み関数の概要<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Embedding-Function-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>MilvusのFunctionモジュールを使うと、外部のモデルプロバイダー（OpenAI、AWS Bedrock、Google Vertex AIなど）を自動的に呼び出すことで、生のテキストデータをベクトル埋め込みデータに変換することができます。Milvusは、プロバイダーへのリクエストの送信、埋め込みデータの受信、コレクションへの保存をすべて行います。セマンティック検索では、クエリベクトルではなく、生のクエリデータのみを提供する必要があります。Milvusはインジェストに使用したのと同じモデルでクエリベクトルを生成し、保存されたベクターと比較し、最も関連性の高い結果を返します。</p>
<h2 id="Limits" class="common-anchor-header">制限<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Functionモジュールが埋め込む入力フィールドは常に値を含んでいなければなりません。</p></li>
<li><p>Functionモジュールは、コレクションスキーマで明示的に定義されたフィールドのみを処理します。</p></li>
<li><p>埋め込む入力フィールドは<code translate="no">VARCHAR</code> 型でなければなりません。</p></li>
<li><p>Functionモジュールは入力フィールドを次のように埋め込むことができる：</p>
<ul>
<li><p><code translate="no">FLOAT_VECTOR</code></p></li>
<li><p><code translate="no">INT8_VECTOR</code></p></li>
</ul>
<p><code translate="no">BINARY_VECTOR</code> 、<code translate="no">FLOAT16_VECTOR</code> 、<code translate="no">BFLOAT16_VECTOR</code> への変換はサポートされていません。</p></li>
</ul>
<h2 id="Overview" class="common-anchor-header">概要<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Functionモジュールは、選択した外部モデルプロバイダを呼び出すことで、生のテキストをベクトル埋め込みに変換します。プロバイダによって、サポートするモデル、埋め込みフォーマット、認証方法が異なります。</p>
<h3 id="Supported-model-providers" class="common-anchor-header">サポートされているモデルプロバイダー</h3><table>
   <tr>
     <th><p>プロバイダ</p></th>
     <th><p>代表的なモデル</p></th>
     <th><p>埋め込み形式</p></th>
     <th><p>認証方法</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/openai.md">OpenAI</a></p></td>
     <td><p>テキスト埋め込み</p></td>
     <td><p>高密度 (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>APIキー</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/azure-openai.md">Azure OpenAI</a></p></td>
     <td><p>デプロイメントベース</p></td>
     <td><p>濃い (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>APIキー</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/dashscope.md">ダッシュスコープ</a></p></td>
     <td><p>テキスト埋め込み-v3</p></td>
     <td><p>デンス (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>APIキー</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/bedrock.md">ベッドロック</a></p></td>
     <td><p>amazon.titan-embed-text-v2</p></td>
     <td><p>密 (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>AK/SKペア</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/vertex-ai.md">バーテックスAI</a></p></td>
     <td><p>テキスト埋め込み-005</p></td>
     <td><p>密 (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>GCPサービスアカウントJSON</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/voyage-ai.md">航海AI</a></p></td>
     <td><p>voyage-3, voyage-lite-02</p></td>
     <td><p>密 (<code translate="no">FLOAT_VECTOR</code> /<code translate="no">INT8_VECTOR</code>)</p></td>
     <td><p>APIキー</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/cohere.md">Cohere</a></p></td>
     <td><p>エンベッド-英語-v3.0</p></td>
     <td><p>密 (<code translate="no">FLOAT_VECTOR</code> /<code translate="no">INT8_VECTOR</code>)</p></td>
     <td><p>APIキー</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/siliconflow.md">シリコンフロー</a></p></td>
     <td><p>BAAI/bge-large-zh-v1.5</p></td>
     <td><p>高密度 (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>APIキー</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/hugging-face-tei.md">ハグ顔</a></p></td>
     <td><p>任意のTEIサービスモデル</p></td>
     <td><p>密集 (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>オプションのAPIキー</p></td>
   </tr>
</table>
<h3 id="Workflow" class="common-anchor-header">ワークフロー</h3><p>以下の図は、Milvusにおける本機能の動作を示しています。</p>
<ol>
<li><p><strong>テキストを入力する</strong>：ユーザはMilvusに生のデータ(文書など)を入力する。</p></li>
<li><p><strong>埋め込みデータを生成する</strong>：MilvusのFunctionモジュールは自動的に設定されたモデルプロバイダを呼び出し、生データをベクトル埋め込みデータに変換します。</p></li>
<li><p><strong>埋め込みデータを保存</strong>します：生成された埋め込みデータはMilvusコレクション内の明示的に定義されたベクトルフィールドに格納されます。</p></li>
<li><p><strong>テキストクエリ</strong>ユーザはMilvusにテキストクエリを送信する。</p></li>
<li><p><strong>セマンティック検索</strong>：Milvusは内部でクエリをベクトルの埋め込みに変換し、保存された埋め込みに対して類似検索を行い、関連する結果を取得します。</p></li>
<li><p><strong>結果を返す</strong>：Milvusはトップマッチの結果をアプリケーションに返します。</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/embedding-function-overview.png" alt="Embedding Function Overview" class="doc-image" id="embedding-function-overview" />
   </span> <span class="img-wrapper"> <span>埋め込み機能の概要</span> </span></p>
<h3 id="Credential-management" class="common-anchor-header">クレデンシャル管理</h3><p>外部のエンベッディングAPIに接続するには、認証情報（APIキーまたはアクセスキーとシークレットキーのペア）が必要です。これらの認証情報をアプリケーションコードに公開することはセキュリティリスクを生みます。Milvusは、認証情報をMilvus設定ファイル(<code translate="no">milvus.yaml</code>)に安全に保存することでこれを解決します。</p>
<ol>
<li><p><strong>認証情報を追加</strong>します：トップレベル<code translate="no">credential:</code> ブロックの下で、各クレデンシャルにユニークなラベルを付け、<code translate="no">function:</code> ブロックでそのラベルを指すようにします。</p></li>
<li><p><strong>サーバはコンフィグをロード</strong>します：MilvusはYAMLファイルを読み込み、生の鍵をメモリにキャッシュし、ラベルのみを記憶する(例:<code translate="no">apikey1</code>)。</p></li>
<li><p><strong>関数を呼び出す</strong>：オプションで<code translate="no">credential</code> 引数を指定する。</p>
<ul>
<li><p>関数定義でクレデンシャル名を指定した場合、Milvusは指定されたクレデンシャルを使用します。</p></li>
<li><p>引数を省略した場合、Milvusは自動的に<code translate="no">milvus.yaml</code> でそのモデルプロバイダ用に設定されたクレデンシャルにフォールバックする。</p>
<p>いずれにせよ、秘密鍵がサーバから離れることはありません。</p></li>
</ul></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/credential-config-overflow.png" alt="Credential Config Overflow" class="doc-image" id="credential-config-overflow" />
   </span> <span class="img-wrapper"> <span>クレデンシャル設定のオーバーフロー</span> </span></p>
<div class="alert note">
<p>Docker ComposeでMilvusをデプロイする場合、環境変数を通して同じフィールドを注入することもできます。正確な変数名については、プロバイダ別のガイドを参照してください。</p>
</div>
<h2 id="Configure-credentials" class="common-anchor-header">クレデンシャルの設定<button data-href="#Configure-credentials" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusで埋め込み関数を使用する前に、アクセス認証情報を設定します。</p>
<h3 id="Step-1-Add-credentials-to-Milvus-configuration" class="common-anchor-header">ステップ1: Milvus設定への認証情報の追加</h3><p><code translate="no">milvus.yaml</code> ファイルの<code translate="no">credential</code> ブロックを編集し、アクセスが必要な各プロバイダのエントリを追加します：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml credential store section</span>
<span class="hljs-comment"># This section defines all your authentication credentials for external embedding providers</span>
<span class="hljs-comment"># Each credential gets a unique name (e.g., aksk1, apikey1) that you&#x27;ll reference elsewhere</span>
<span class="hljs-attr">credential:</span>
  <span class="hljs-comment"># For AWS Bedrock or services using access/secret key pairs</span>
  <span class="hljs-comment"># &#x27;aksk1&#x27; is just an example name - you can choose any meaningful identifier</span>
  <span class="hljs-attr">aksk1:</span>                       
    <span class="hljs-attr">access_key_id:</span> <span class="hljs-string">&lt;YOUR_AK&gt;</span>      
    <span class="hljs-attr">secret_access_key:</span> <span class="hljs-string">&lt;YOUR_SK&gt;</span>  
  
  <span class="hljs-comment"># For OpenAI, Voyage AI, or other API key-based services</span>
  <span class="hljs-comment"># &#x27;apikey1&#x27; is a custom name you choose to identify this credential  </span>
  <span class="hljs-attr">apikey1:</span>                     
    <span class="hljs-attr">apikey:</span> <span class="hljs-string">&lt;YOUR_API_KEY&gt;</span>        
  
  <span class="hljs-comment"># For Google Vertex AI using service account credentials</span>
  <span class="hljs-comment"># &#x27;gcp1&#x27; is an example name for your Google Cloud credentials</span>
  <span class="hljs-attr">gcp1:</span>                        
    <span class="hljs-attr">credential_json:</span> <span class="hljs-string">&lt;BASE64_OF_JSON&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>プロバイダタイプ</p></th>
     <th><p>必須項目</p></th>
     <th><p>設定例</p></th>
   </tr>
   <tr>
     <td><p>AK/SK ペア (AWS Bedrock)</p></td>
     <td><p><code translate="no">access_key_id</code>,<code translate="no">secret_access_key</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     aksk1:    # custom label
         access_key_id: &lt;YOUR_AK&gt;
         secret_access_key: &lt;YOUR_SK&gt;
     ...
</code></pre></td>
   </tr>
   <tr>
     <td><p>APIキーベース（OpenAI、Voyage AIなど）</p></td>
     <td><p><code translate="no">apikey</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     apikey1:    # custom label
         apikey: &lt;YOUR_API_KEY&gt;
     ...
</code></pre></td>
   </tr>
   <tr>
     <td><p>GCPサービスアカウントJSON（Vertex AI）</p></td>
     <td><p><code translate="no">credential_json</code></p></td>
     <td><pre><code translate="no" class="yaml language-yaml"> credential:
     ...
     gcp1:    # custom label
         credential_json: &lt;BASE64_OF_JSON&gt;
     ...
</code></pre></td>
   </tr>
</table>
<h3 id="Step-2-Configure-provider-settings" class="common-anchor-header">ステップ2：プロバイダーの設定</h3><p>同じ設定ファイルで、<code translate="no">function</code> ブロックを編集し、Milvus にサービスコールの埋め込みに使用するキーを伝えます：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">function:</span>
  <span class="hljs-attr">textEmbedding:</span>
    <span class="hljs-attr">providers:</span>
      <span class="hljs-attr">openai:</span>                         <span class="hljs-comment"># calls OpenAI</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">apikey1</span>           <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-comment"># url: https://api.openai.com/v1/embeddings   # (optional) custom endpoint</span>

      <span class="hljs-attr">bedrock:</span>                        <span class="hljs-comment"># calls AWS Bedrock</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">aksk1</span>             <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-attr">region:</span> <span class="hljs-string">us-east-2</span>

      <span class="hljs-attr">vertexai:</span>                       <span class="hljs-comment"># calls Google Vertex AI</span>
        <span class="hljs-attr">credential:</span> <span class="hljs-string">gcp1</span>              <span class="hljs-comment"># Reference to the credential label</span>
        <span class="hljs-comment"># url:                        # (optional) custom endpoint</span>

      <span class="hljs-attr">tei:</span>                            <span class="hljs-comment"># Built-in Tiny Embedding model</span>
        <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>                  <span class="hljs-comment"># Whether to enable TEI model service</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus設定を適用する方法の詳細については、「<a href="/docs/ja/dynamic_config.md">オンザフライでMilvusを設定する</a>」を参照してください。</p>
<h2 id="Use-embedding-function" class="common-anchor-header">埋め込み機能の使用<button data-href="#Use-embedding-function" class="anchor-icon" translate="no">
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
    </button></h2><p>クレデンシャルが構成されたら、埋め込み関数を定義して使用するために以下の手順に従ってください。</p>
<h3 id="Step-1-Define-schema-fields" class="common-anchor-header">ステップ 1: スキーマフィールドの定義</h3><p>埋め込み関数を使用するには、特定のスキーマを持つコレクションを作成します。このスキーマには、少なくとも3つの必要なフィールドが含まれていなければなりません：</p>
<ul>
<li><p>コレクション内の各エンティティを一意に識別するプライマリフィールド。</p></li>
<li><p>埋め込む生データを格納するスカラーフィールド。</p></li>
<li><p>スカラー・フィールドに対して関数が生成するベクトル埋め込みを格納するために予約されたベクトル・フィールド。</p></li>
</ul>
<p>以下の例では、テキストデータを格納するためのスカラーフィールド<code translate="no">&quot;document&quot;</code> と、Functionモジュールによって生成される埋め込みデータを格納するためのベクトルフィールド<code translate="no">&quot;dense&quot;</code> を持つスキーマを定義しています。ベクトル次元(<code translate="no">dim</code>)は、選択した埋め込みモデルの出力に合わせて設定することを忘れないでください。</p>
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
<span class="hljs-comment"># For instance, OpenAI&#x27;s text-embedding-3-small model outputs 1536-dimensional vectors.</span>
<span class="hljs-comment"># For dense vector, data type can be FLOAT_VECTOR or INT8_VECTOR</span>
<span class="hljs-comment"># For sparse vector, data type must be SPARSE_FLOAT_VECTOR</span>
schema.add_field(<span class="hljs-string">&quot;dense&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">1536</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Add-embedding-function-to-schema" class="common-anchor-header">ステップ 2: スキーマへの埋め込み関数の追加</h3><p>MilvusのFunctionモジュールは、スカラーフィールドに格納された生データを自動的に埋め込みデータに変換し、明示的に定義されたベクトルフィールドに格納します。</p>
<p>以下の例では、スカラーフィールド<code translate="no">&quot;document&quot;</code> をエンベッディングに変換するFunctionモジュール(<code translate="no">openai_embedding</code>)を追加し、結果のベクトルを先に定義した<code translate="no">&quot;dense&quot;</code> ベクトルフィールドに格納しています。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define embedding function (example: OpenAI provider)</span>
text_embedding_function = Function(
    name=<span class="hljs-string">&quot;openai_embedding&quot;</span>,                        <span class="hljs-comment"># Unique identifier for this embedding function</span>
    function_type=FunctionType.TEXTEMBEDDING,       <span class="hljs-comment"># Type of embedding function</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],                 <span class="hljs-comment"># Scalar field to embed</span>
    output_field_names=[<span class="hljs-string">&quot;dense&quot;</span>],                   <span class="hljs-comment"># Vector field to store embeddings</span>
    params={                                        <span class="hljs-comment"># Provider-specific configuration (highest priority)</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;openai&quot;</span>,                       <span class="hljs-comment"># Embedding model provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>,     <span class="hljs-comment"># Embedding model</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;apikey1&quot;,                    # Optional: Credential label specified in milvus.yaml</span>
        <span class="hljs-comment"># Optional parameters:</span>
        <span class="hljs-comment"># &quot;dim&quot;: &quot;1536&quot;,                            # Optionally shorten the output vector dimension</span>
        <span class="hljs-comment"># &quot;user&quot;: &quot;user123&quot;                         # Optional: identifier for API tracking</span>
    }
)

<span class="hljs-comment"># Add the embedding function to your schema</span>
schema.add_function(text_embedding_function)
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
     <th><p>例 値</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Milvus内での埋め込み関数の一意な識別子。</p></td>
     <td><p><code translate="no">"openai_embedding"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>使用される埋め込み関数のタイプ。可能な値：</p>
<ul>
<li><p><code translate="no">FunctionType.TEXTEMBEDDING</code>:テキスト内の意味的な意味を捕捉する密なベクトルを生成する。</p></li>
<li><p><code translate="no">FunctionType.BM25</code>:用語頻度と逆文書頻度を使用して関連性スコアを計算するBM25ランキングアルゴリズムに基づいて、疎なベクトルを生成する。詳細は「<a href="/docs/ja/full-text-search.md">全文検索</a>」を参照。</p></li>
</ul></td>
     <td><p><code translate="no">FunctionType.TEXTEMBEDDING</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>埋め込む生データを含むスカラーフィールド。現在、このパラメータは1つのフィールド名のみを受け付ける。</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">output_field_names</code></p></td>
     <td><p>生成された埋め込みデータを格納するベクトルフィールド。現在、このパラメータは1つのフィールド名のみを受け付ける。</p></td>
     <td><p><code translate="no">["dense"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>埋め込み設定を格納する辞書。注:<code translate="no">params</code> 内のパラメータは、埋め込みモデルプロバイダによって異なります。</p></td>
     <td><p><code translate="no">{...}</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>埋め込みモデルプロバイダ。</p></td>
     <td><p><code translate="no">"openai"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>使用する埋め込みモデルを指定します。</p></td>
     <td><p><code translate="no">"text-embedding-3-small"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">credential</code></p></td>
     <td><p><code translate="no">milvus.yaml</code> のトップレベル<code translate="no">credential:</code> セクションで定義されたクレデンシャルのラベル。 </p>
<ul>
<li><p>指定された場合、milvusは一致するキーペアまたはAPIトークンを取得し、サーバ側でリクエストに署名します。</p></li>
<li><p>省略された場合(<code translate="no">None</code>)、Milvusは<code translate="no">milvus.yaml</code> でターゲットモデルプロバイダ用に明示的に設定されたクレデンシャルにフォールバックします。</p></li>
<li><p>ラベルが不明な場合、または参照されるキーが見つからない場合、呼び出しは失敗します。</p></li>
</ul></td>
     <td><p><code translate="no">"apikey1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dim</code></p></td>
     <td><p>出力埋め込みの次元数。OpenAIの第3世代モデルでは、意味情報を大きく失うことなくコストとレイテンシを削減するために、完全なベクトルを短くすることができます。詳細については、<a href="https://openai.com/blog/new-embedding-models-and-api-updates">OpenAIのアナウンスブログポストを</a>参照してください。<strong>注意：</strong>ベクトルの次元を短くする場合、スキーマの<code translate="no">add_field</code> メソッドで指定されたベクトルフィールドの<code translate="no">dim</code> 値が、エンベッディング関数の最終的な出力次元と一致していることを確認してください。</p></td>
     <td><p><code translate="no">"1536"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">user</code></p></td>
     <td><p>API の使用状況を追跡するためのユーザーレベルの識別子。</p></td>
     <td><p><code translate="no">"user123"</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>テキストからベクトルへの変換が必要な複数のスカラー・フィールドを持つコレクションの場合は、コレクション・スキーマに個別の関数を追加し、各関数が一意の名前と<code translate="no">output_field_names</code> 値を持つようにします。</p>
</div>
<h3 id="Step-3-Configure-index" class="common-anchor-header">ステップ 3: インデックスの構成</h3><p>必要なフィールドと組み込み関数でスキーマを定義した後、コレクションのインデックスを設定します。このプロセスを簡素化するために、<code translate="no">index_type</code> として<code translate="no">AUTOINDEX</code> を使用します。このオプションにより、Milvusはデータの構造に基づいて最適なインデックスタイプを選択し、設定することができます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add AUTOINDEX to automatically select optimal indexing method</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span> 
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-4-Create-collection" class="common-anchor-header">ステップ 4: コレクションの作成</h3><p>定義したスキーマとインデックスパラメータを使用して、コレクションを作成します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create collection named &quot;demo&quot;</span>
client.create_collection(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    schema=schema, 
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-5-Insert-data" class="common-anchor-header">ステップ 5: データの挿入</h3><p>コレクションとインデックスを設定したら、生データを挿入する準備が整いました。このプロセスでは、生のテキストを提供するだけでよい。先に定義したFunctionモジュールが、各テキスト入力に対応するスパースベクトルを自動的に生成します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert sample documents</span>
client.insert(<span class="hljs-string">&#x27;demo&#x27;</span>, [
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Milvus simplifies semantic search through embeddings.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Vector embeddings convert text into searchable numeric data.&#x27;</span>},
    {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&#x27;document&#x27;</span>: <span class="hljs-string">&#x27;Semantic search helps users find relevant information quickly.&#x27;</span>},
])
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-6-Perform-vector-search" class="common-anchor-header">ステップ6：ベクトル探索の実行</h3><p>データ挿入後、生のクエリテキストを使ってセマンティック検索を実行します。milvusは自動的にクエリを埋め込みベクトルに変換し、類似性に基づいて関連文書を検索し、トップマッチの結果を返します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Perform semantic search</span>
results = client.search(
    collection_name=<span class="hljs-string">&#x27;demo&#x27;</span>, 
    data=[<span class="hljs-string">&#x27;How does Milvus handle semantic search?&#x27;</span>], <span class="hljs-comment"># Use text query rather than query vector</span>
    anns_field=<span class="hljs-string">&#x27;dense&#x27;</span>,   <span class="hljs-comment"># Use the vector field that stores embeddings</span>
    limit=<span class="hljs-number">1</span>,
    output_fields=[<span class="hljs-string">&#x27;document&#x27;</span>],
)

<span class="hljs-built_in">print</span>(results)

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: 1, &#x27;distance&#x27;: 0.8821347951889038, &#x27;entity&#x27;: {&#x27;document&#x27;: &#x27;Milvus simplifies semantic search through embeddings.&#x27;}}]&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<p>検索とクエリ操作の詳細については、「<a href="/docs/ja/single-vector-search.md">基本的なベクトル検索と</a> <a href="/docs/ja/get-and-scalar-query.md">クエリ</a>」を参照してください。</p>
