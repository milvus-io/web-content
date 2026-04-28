---
id: integrate_with_airbyte.md
summary: >-
  Airbyteは、抽出とロード（EL）データパイプラインを構築するためのオープンソースのデータ移動インフラストラクチャです。汎用性、拡張性、使いやすさを重視して設計されています。Airbyteのコネクタカタログには、350以上のコネクタがあらかじめ組み込まれています。これらのコネクタを使用すると、わずか数分でソースからデスティネーションへのデータ複製を開始できます。
title: エアバイトオープンソースのデータ移動基盤
---
<h1 id="Airbyte-Open-Source-Data-Movement-Infrastructure" class="common-anchor-header">エアバイトオープンソースのデータ移動基盤<button data-href="#Airbyte-Open-Source-Data-Movement-Infrastructure" class="anchor-icon" translate="no">
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
    </button></h1><p>Airbyteは、抽出とロード（EL）データパイプラインを構築するためのオープンソースのデータ移動インフラストラクチャです。汎用性、拡張性、使いやすさを重視して設計されています。Airbyteのコネクタカタログには、350以上のコネクタがあらかじめ組み込まれています。これらのコネクタを使用すると、わずか数分でソースからデスティネーションへのデータ複製を開始できます。</p>
<h2 id="Major-Components-of-Airbyte" class="common-anchor-header">Airbyteの主要コンポーネント<button data-href="#Major-Components-of-Airbyte" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Connector-Catalog" class="common-anchor-header">1.コネクタカタログ</h3><ul>
<li><strong>350以上の構築済みコネクタ</strong>：Airbyteのコネクタカタログには、350以上のコネクタがあらかじめ用意されています。これらのコネクタを使用すると、わずか数分でソースからデスティネーションへのデータ複製を開始できます。</li>
<li><strong>ノーコードコネクタビルダー</strong>：<a href="https://docs.airbyte.com/connector-development/connector-builder-ui/overview">No-Code Connector Builderのような</a>ツールを使って、Airbyteの機能を簡単に拡張し、カスタムのユースケースをサポートすることができます。</li>
</ul>
<h3 id="2-The-Platform" class="common-anchor-header">2.プラットフォーム</h3><p>Airbyteのプラットフォームは、<a href="https://airbyte.com/product/airbyte-cloud">クラウドマネージド</a>または<a href="https://airbyte.com/product/airbyte-enterprise">セルフマネージドとして</a>利用可能な、データ移動操作の構成とスケーリングに必要なすべての水平サービスを提供します。</p>
<h3 id="3-The-User-Interface" class="common-anchor-header">3.ユーザーインターフェース</h3><p>Airbyteは、UI、<a href="https://docs.airbyte.com/using-airbyte/pyairbyte/getting-started">PyAirbyte</a>（Pythonライブラリ）、<a href="https://docs.airbyte.com/api-documentation">API</a>、<a href="https://docs.airbyte.com/terraform-documentation">Terraform Providerを備えて</a>おり、好みのツールやインフラ管理のアプローチと統合することができます。</p>
<p>Airbyteの機能により、Milvusクラスタにデータソースを統合し、類似検索を行うことができます。</p>
<h2 id="Before-You-Begin" class="common-anchor-header">始める前に<button data-href="#Before-You-Begin" class="anchor-icon" translate="no">
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
    </button></h2><p>必要なもの</p>
<ul>
<li>Zendeskアカウント（またはデータを同期したい他のデータソース）</li>
<li>Airbyteアカウントまたはローカルインスタンス</li>
<li>OpenAI API キー</li>
<li>Milvus クラスタ</li>
<li>ローカルにインストールされた Python 3.10</li>
</ul>
<h2 id="Set-Up-Milvus-Cluster" class="common-anchor-header">Milvusクラスタのセットアップ<button data-href="#Set-Up-Milvus-Cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>本番用のK8sクラスタをすでにデプロイしている場合は、このステップをスキップして<a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus-Operator">Milvus Operatorのデプロイに</a>直接進むことができます。そうでない場合は、Milvus Operatorを使用してMilvusクラスタをデプロイする<a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Create-a-K8s-Cluster">手順に従って</a>ください。</p>
<p>個々のエンティティ(ここではサポートチケットとナレッジベース記事)は "コレクション "に保存されます - クラスタがセットアップされたら、コレクションを作成する必要があります。適切な名前を選択し、OpenAIのエンベッディングサービスによって生成されるベクトルの次元数に合わせてDimensionを1536に設定します。</p>
<p>作成後、エンドポイントと<a href="https://milvus.io/docs/authenticate.md?tab=docker">認証</a>情報を記録する。</p>
<h2 id="Set-Up-Connection-in-Airbyte" class="common-anchor-header">Airbyteで接続を設定する<button data-href="#Set-Up-Connection-in-Airbyte" class="anchor-icon" translate="no">
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
    </button></h2><p>データベースの準備ができたので、データを移動してみましょう！そのためには、Airbyteで接続を設定する必要があります。<a href="https://cloud.airbyte.com">cloud.airbyte.comで</a>Airbyteのクラウドアカウントにサインアップするか、<a href="https://docs.airbyte.com/using-airbyte/getting-started/">ドキュメントに</a>記載されているようにローカルインスタンスを立ち上げてください。</p>
<h3 id="Set-Up-Source" class="common-anchor-header">ソースのセットアップ</h3><p>新規接続」をクリックし、ソースとして「Zendesk Support」コネクタを選択します。Test and Save "ボタンをクリックすると、Airbyteが接続の確立を確認します。</p>
<p>Airbyteクラウド上では、[認証]ボタンをクリックすることで簡単に認証できます。ローカルのAirbyteインスタンスを使用する場合は、<a href="https://docs.airbyte.com/integrations/sources/zendesk-support#airbyte-open-source-enable-api-token-access-and-generate-a-token">ドキュメント</a>ページに記載されている手順に従ってください。</p>
<h3 id="Set-Up-Destination" class="common-anchor-header">接続先の設定</h3><p>すべて正常に動作している場合、次はデータの移動先を設定します。ここでは「Milvus」コネクタを選択します。</p>
<p>Milvusコネクタは以下の3つのことを行う：</p>
<ul>
<li><strong>チャンキングとフォーマット</strong>- Zendesk レコードをテキストとメタデータに分割します。テキストが指定されたチャンクサイズより大きい場合、レコードは複数の部分に分割され、個別にコレクションに読み込まれます。テキストの分割（またはチャンキング）は、たとえば大規模なサポートチケットやナレッジ記事の場合に発生します。テキストを分割することで、検索が常に有益な結果をもたらすようにすることができます。</li>
</ul>
<p>チャンクサイズを1000トークン、テキストフィールドをbody、title、description、subjectとします。</p>
<ul>
<li><strong>埋め込み</strong>- 機械学習モデルを使用して、処理部分によって生成されたテキストチャンクをベクトル埋め込みに変換します。埋め込みを作成するには、OpenAIのAPIキーを提供する必要があります。Airbyteは各チャンクをOpenAIに送信し、生成されたベクトルをMilvusクラスタにロードされたエンティティに追加します。</li>
<li><strong>インデックス作成</strong>- チャンクをベクトル化したら、データベースにロードします。そのためには、Milvusクラスタにクラスタとコレクションをセットアップするときに得た情報を挿入します。 <div><img translate="no" src="/docs/v2.6.x/assets/airbyte_with_milvus_1.png" width="40%"/></div>Test and save "をクリックすると、すべてが正しく並んでいるかチェックされる（有効な認証情報、コレクションが存在し、設定されたエンベッディングと同じベクトル次元を持っているなど）。</li>
</ul>
<h3 id="Set-up-stream-sync-flow" class="common-anchor-header">ストリーム同期フローの設定</h3><p>データがフローできるようになる前の最後のステップは、同期する "ストリーム "を選択することである。ストリームとは、ソース内のレコードの集まりです。Zendesk は、今回のユースケースには関係のない多数のストリームをサポートしているので、帯域幅を節約し、関連する情報だけが検索に表示されるようにするために、「チケット」と「記事」だけを選択し、他はすべて無効にしましょう：<div><img translate="no" src="/docs/v2.6.x/assets/airbyte_with_milvus_2.png" width="40%"/></div>ストリーム名をクリックすると、ソースから抽出するフィールドを選択できます。Incremental | Append + Deduped "同期モードは、ZendeskとMilvusの同期を維持しながら、最小限のデータ（前回の実行以降に変更された記事とチケットのみ）を転送することを意味します。</p>
<p>接続が設定されるとすぐに、Airbyteはデータの同期を開始します。Milvusコレクションに表示されるまで数分かかることがあります。</p>
<p>レプリケーションの頻度を選択した場合、Airbyteは定期的に実行され、Zendeskアーティクルの変更や新しく作成されたチケットをMilvusコレクションに反映します。</p>
<h3 id="Check-flow" class="common-anchor-header">チェックフロー</h3><p>MilvusクラスタUIで、プレイグラウンドに移動し、"_ab_stream == \"にフィルタを設定した "Query Data "クエリを実行することで、コレクション内のデータがどのような構造になっているかを確認することができます。<div><img translate="no" src="/docs/v2.6.x/assets/airbyte_with_milvus_3.png" width="40%"/></div>結果ビューを見るとわかるように、Zendeskから送られてきた各レコードは、指定されたすべてのメタデータとともにmilvusに個別のエンティティとして保存されています。埋め込んだテキストチャンクは、"text" プロパティとして表示されます。</p>
<h2 id="Build-Streamlit-app-querying-the-collection" class="common-anchor-header">コレクションをクエリするStreamlitアプリのビルド<button data-href="#Build-Streamlit-app-querying-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>データの準備は整いました - 次はそれを使うアプリケーションをビルドする必要があります。この場合、アプリケーションはユーザーがサポートケースを提出するためのシンプルなサポートフォームになります。ユーザーが送信をクリックすると、次の2つのことを行います：</p>
<ul>
<li>同じ組織のユーザによって提出された類似のチケットを検索する。</li>
<li>ユーザーに関連しそうな知識ベースの記事を検索する。</li>
</ul>
<p>どちらの場合も、OpenAIのエンベッディングを使ったセマンティック検索を活用します。そのために、ユーザが入力した問題の説明も埋め込まれ、Milvusクラスタから類似のエンティティを検索するために使用されます。関連する結果があれば、フォームの下に表示されます。</p>
<h3 id="Set-up-UI-environment" class="common-anchor-header">UI環境のセットアップ</h3><p>アプリケーションの実装にStreamlitを使用するため、ローカルにPythonをインストールする必要があります。</p>
<p>まず、Streamlit、Milvusクライアントライブラリ、OpenAIクライアントライブラリをローカルにインストールします：</p>
<pre><code translate="no" class="language-shell">pip install streamlit pymilvus openai
<button class="copy-code-btn"></button></code></pre>
<p>基本的なサポートフォームをレンダリングするために、Pythonファイル<code translate="no">basic_support_form.py</code> を作成します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> streamlit <span class="hljs-keyword">as</span> st

<span class="hljs-keyword">with</span> st.form(<span class="hljs-string">&quot;my_form&quot;</span>):
    st.write(<span class="hljs-string">&quot;Submit a support case&quot;</span>)
    text_val = st.text_area(<span class="hljs-string">&quot;Describe your problem&quot;</span>)

    submitted = st.form_submit_button(<span class="hljs-string">&quot;Submit&quot;</span>)
    <span class="hljs-keyword">if</span> submitted:
        <span class="hljs-comment"># TODO check for related support cases and articles</span>
        st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>アプリケーションを実行するには、Streamlit runを使います：</p>
<pre><code translate="no" class="language-shell">streamlit run basic_support_form.py
<button class="copy-code-btn"></button></code></pre>
<p>これで基本フォームがレンダリングされます：<div><img translate="no" src="/docs/v2.6.x/assets/airbyte_with_milvus_4.png" width="40%"/></div>この例のコードは<a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/1_basic_support_form.py">GitHubにも</a>あります。</p>
<h3 id="Set-up-backend-query-service" class="common-anchor-header">バックエンドクエリーサービスのセットアップ</h3><p>次に、関連するかもしれない既存のオープンチケットをチェックしてみましょう。これを行うために、OpenAI を使ってユーザが入力したテキストを埋め込み、コレクションで類似検索を行い、まだ開いているチケットをフィルタリングします。もし、入力されたチケットと既存のチケットの間の距離が非常に低いものがあれば、ユーザに知らせ、送信しないようにします：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> streamlit <span class="hljs-keyword">as</span> st
<span class="hljs-keyword">import</span> os
<span class="hljs-keyword">import</span> pymilvus
<span class="hljs-keyword">import</span> openai


<span class="hljs-keyword">with</span> st.form(<span class="hljs-string">&quot;my_form&quot;</span>):
    st.write(<span class="hljs-string">&quot;Submit a support case&quot;</span>)
    text_val = st.text_area(<span class="hljs-string">&quot;Describe your problem?&quot;</span>)

    submitted = st.form_submit_button(<span class="hljs-string">&quot;Submit&quot;</span>)
    <span class="hljs-keyword">if</span> submitted:
        <span class="hljs-keyword">import</span> os
        <span class="hljs-keyword">import</span> pymilvus
        <span class="hljs-keyword">import</span> openai

        org_id = <span class="hljs-number">360033549136</span> <span class="hljs-comment"># TODO Load from customer login data</span>

        pymilvus.connections.connect(uri=os.environ[<span class="hljs-string">&quot;MILVUS_URL&quot;</span>], token=os.environ[<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>])
        collection = pymilvus.Collection(<span class="hljs-string">&quot;zendesk&quot;</span>)

        embedding = openai.Embedding.create(<span class="hljs-built_in">input</span>=text_val, model=<span class="hljs-string">&quot;text-embedding-ada-002&quot;</span>)[<span class="hljs-string">&#x27;data&#x27;</span>][<span class="hljs-number">0</span>][<span class="hljs-string">&#x27;embedding&#x27;</span>]

        results = collection.search(data=[embedding], anns_field=<span class="hljs-string">&quot;vector&quot;</span>, param={}, limit=<span class="hljs-number">2</span>, output_fields=[<span class="hljs-string">&quot;_id&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>, <span class="hljs-string">&quot;description&quot;</span>], expr=<span class="hljs-string">f&#x27;status == &quot;new&quot; and organization_id == <span class="hljs-subst">{org_id}</span>&#x27;</span>)

        st.write(results[<span class="hljs-number">0</span>])
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(results[<span class="hljs-number">0</span>]) &gt; <span class="hljs-number">0</span> <span class="hljs-keyword">and</span> results[<span class="hljs-number">0</span>].distances[<span class="hljs-number">0</span>] &lt; <span class="hljs-number">0.35</span>:
            matching_ticket = results[<span class="hljs-number">0</span>][<span class="hljs-number">0</span>].entity
            st.write(<span class="hljs-string">f&quot;This case seems very similar to <span class="hljs-subst">{matching_ticket.get(<span class="hljs-string">&#x27;subject&#x27;</span>)}</span> (id #<span class="hljs-subst">{matching_ticket.get(<span class="hljs-string">&#x27;_id&#x27;</span>)}</span>). Make sure it has not been submitted before&quot;</span>)
        <span class="hljs-keyword">else</span>:
            st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)
            
<button class="copy-code-btn"></button></code></pre>
<p>ここでいくつかのことが起こっています：</p>
<ul>
<li>Milvusクラスタへの接続が設定されます。</li>
<li>OpenAIサービスは、ユーザが入力した説明の埋め込みを生成するために使用されます。</li>
<li>類似検索が実行され、チケットのステータスと組織 ID によって結果がフィルタリングされます (同じ組織のオープンチケットのみが関連するため)。</li>
<li>結果があり、既存のチケットと新しく入力されたテキストの埋め込みベクトル間の距離がある閾値以下であれば、この事実を呼び出します。</li>
</ul>
<p>新しいアプリを実行するには、まず OpenAI と Milvus の環境変数を設定する必要があります：</p>
<pre><code translate="no" class="language-shell">export MILVUS_TOKEN=...
export MILVUS_URL=https://...
export OPENAI_API_KEY=sk-...

streamlit run app.py
<button class="copy-code-btn"></button></code></pre>
<p>すでに存在するチケットを送信しようとすると、このようになります：<div><img translate="no" src="/docs/v2.6.x/assets/airbyte_with_milvus_5.png" width="40%"/></div>この例のコードは<a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/2_open_ticket_check.py">GitHub</a> にもあります。</p>
<h3 id="Show-more-relevant-information" class="common-anchor-header">より多くの関連情報を表示する</h3><p>最終バージョンに隠された緑色のデバッグ出力でわかるように、2つのチケットが私たちの検索にマッチしました（ステータスが新規で、現在の組織からで、埋め込みベクトルに近い）。しかし、最初のチケット(関連)は2番目のチケット(この状況では無関係)よりも上位にランクされ、それは低い距離値に反映されています。この関係は、通常の全文検索のように、単語を直接マッチングさせることなく、埋め込みベクトルに取り込まれる。</p>
<p>最後に、チケットの提出後に役立つ情報を表示して、ユーザにできるだけ多くの関連情報を前もって与えましょう。</p>
<p>そのために、チケットが送信された後に2回目の検索を行い、上位にマッチするナレッジベースの記事を取得します：</p>
<pre><code translate="no" class="language-python">   ......
   
        <span class="hljs-keyword">else</span>:
            <span class="hljs-comment"># TODO Actually send out the ticket</span>
            st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)
            article_results = collection.search(data=[embedding], anns_field=<span class="hljs-string">&quot;vector&quot;</span>, param={}, limit=<span class="hljs-number">5</span>, output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;html_url&quot;</span>], expr=<span class="hljs-string">f&#x27;_ab_stream == &quot;articles&quot;&#x27;</span>)
            st.write(article_results[<span class="hljs-number">0</span>])
            <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(article_results[<span class="hljs-number">0</span>]) &gt; <span class="hljs-number">0</span>:
                st.write(<span class="hljs-string">&quot;We also found some articles that might help you:&quot;</span>)
                <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> article_results[<span class="hljs-number">0</span>]:
                    <span class="hljs-keyword">if</span> hit.distance &lt; <span class="hljs-number">0.362</span>:
                        st.write(<span class="hljs-string">f&quot;* [<span class="hljs-subst">{hit.entity.get(<span class="hljs-string">&#x27;title&#x27;</span>)}</span>](<span class="hljs-subst">{hit.entity.get(<span class="hljs-string">&#x27;html_url&#x27;</span>)}</span>)&quot;</span>)

<button class="copy-code-btn"></button></code></pre>
<p>高い類似度スコアを持つオープンサポートチケットがない場合、新しいチケットが送信され、関連するナレッジ記事が下に表示されます：<div><img translate="no" src="/docs/v2.6.x/assets/airbyte_with_milvus_6.png" width="40%"/></div>この例のコードは<a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/3_relevant_articles.py">Github</a> にもあります。</p>
<h2 id="Conclusion" class="common-anchor-header">結論<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>ここに示したUIは実際のサポートフォームではなく、ユースケースを説明するための一例ですが、AirbyteとMilvusの組み合わせは非常に強力なものです - さまざまなソース（ZendeskやGitHubのようなAPI、Postgresのようなデータベースから、AirbyteのSDKやビジュアルコネクタビルダーを使用して構築された完全なカスタムソースまで）からテキストを簡単に読み込むことができ、膨大なデータ量に拡張できる強力なベクトル検索エンジンであるMilvusに埋め込み形式でインデックスを作成することができます。</p>
<p>AirbyteとMilvusはオープンソースであり、お客様のインフラ上で完全に無料で使用することができ、必要であればクラウドオファリングで運用をオフロードすることもできます。</p>
<p>この記事で説明されている古典的なセマンティック検索の使用例以外にも、一般的なセットアップは、RAGメソッド（Retrieval Augmented Generation）を使用した質問応答チャットボットや、レコメンダーシステムを構築したり、より適切で効率的な広告を作成したりするのにも使用できる。</p>
