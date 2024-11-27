---
id: schema-hands-on.md
title: スキーマ設計ハンズオン
summary: >-
  Milvusはコレクションスキーマによるデータモデルの定義をサポートしている。コレクションは、テキストや画像のような非構造化データを、セマンティック検索に使用される様々な精度の密なベクトルや疎なベクトルを含むベクトル表現とともに整理します。さらに、Milvusは
  "スカラー
  "と呼ばれる非ベクトルデータ型の保存とフィルタリングをサポートしています。スカラー型にはBOOL、INT8/16/32/64、FLOAT/DOUBLE、VARCHAR、JSON、Arrayがあります。
---
<h1 id="Schema-Design-Hands-On​" class="common-anchor-header">スキーマ設計ハンズオン<button data-href="#Schema-Design-Hands-On​" class="anchor-icon" translate="no">
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
    </button></h1><p>検索としても知られる情報検索（IR）システムは、検索支援生成（RAG）、画像検索、商品推薦など、さまざまなAIアプリケーションに不可欠です。IRシステム開発の最初のステップはデータモデルの設計であり、これにはビジネス要件の分析、情報の整理方法の決定、データを意味的に検索可能にするためのインデックス作成が含まれます。</p>
<p>Milvusはコレクションスキーマを通してデータモデルの定義をサポートします。コレクションは、テキストや画像のような非構造化データを、セマンティック検索に使用される様々な精度の密なベクトルや疎なベクトルを含むベクトル表現とともに整理します。さらに、Milvusは &quot;スカラー &quot;と呼ばれる非ベクトルデータ型の保存とフィルタリングをサポートしています。スカラー型にはBOOL、INT8/16/32/64、FLOAT/DOUBLE、VARCHAR、JSON、Arrayが含まれます。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/schema-hands-on.png" alt="Example data schema designed for searching news article" class="doc-image" id="example-data-schema-designed-for-searching-news-article" />
   </span> <span class="img-wrapper"> <span>ニュース記事を検索するために設計されたデータ・スキーマの例</span> </span></p>
<p>検索システムのデータモデル設計には、ビジネスニーズを分析し、情報をスキーマで表現されたデータモデルに抽象化することが含まれる。例えば、テキストを検索するためには、リテラル文字列を「埋め込み」によってベクトルに変換し、ベクトル検索を可能にすることで「インデックス化」しなければならない。この基本要件以外にも、出版タイムスタンプや著者などのプロパティを格納する必要があるかもしれない。このメタデータによって、フィルタリングによってセマンティック検索を絞り込み、特定の日付以降に出版されたテキストや特定の著者によるテキストだけを返すことができる。また、アプリケーションで検索結果をレンダリングするために、メインテキストと一緒に検索する必要がある場合もある。これらのテキスト片を整理するために、それぞれに整数または文字列で表される一意の識別子を割り当てる必要がある。これらの要素は洗練された検索ロジックを実現するために不可欠です。</p>
<p>よく設計されたスキーマはデータモデルを抽象化し、検索によってビジネス目標を達成できるかどうかを決定するため重要です。さらに、コレクションに挿入されるすべてのデータ行はスキーマに従う必要があるため、データの一貫性と長期的な品質の維持に大いに役立ちます。技術的な観点からは、よく定義されたスキーマは、よく整理されたカラム・データ・ストレージとすっきりとしたインデックス構造につながり、検索パフォーマンスを高めることができる。</p>
<h1 id="An-Example-News-Search​" class="common-anchor-header">例ニュース検索<button data-href="#An-Example-News-Search​" class="anchor-icon" translate="no">
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
    </button></h1><p>例えば、あるニュースサイトの検索を構築し、テキスト、サムネイル画像、その他のメタデータを含むニュースのコーパスがあるとしよう。まず、検索というビジネス要件をサポートするために、データをどのように活用したいかを分析する必要がある。例えば、サムネイル画像と内容の要約に基づいてニュースを検索し、著者情報や公開時間などのメタデータを条件として検索結果をフィルタリングする、というような要件があるとします。これらの要件は、さらに次のように分解できる。</p>
<ul>
<li><p>テキストから画像を検索するために、テキストと画像データを同じ潜在空間にマッピングできるマルチモーダル埋め込みモデルによって、画像をベクトルに埋め込むことができる。</p></li>
<li><p>記事の要約テキストは、テキスト埋め込みモデルによってベクトルに埋め込まれる。</p></li>
<li><p>公開時間に基づいてフィルタリングするために、日付はスカラーフィールドとして格納され、効率的なフィルタリングのためにスカラーフィールドのインデックスが必要である。JSONのような、より複雑なデータ構造をスカラーに格納し、その内容からフィルタリング検索を実行することもできる（JSONのインデックス化は今後の機能）。</p></li>
<li><p>画像のサムネイルバイトを取得して検索結果ページにレンダリングするために、画像のURLも格納される。同様に、要約テキストとタイトルについても同様です。(必要に応じて、生のテキストと画像ファイルのデータをスカラーフィールドとして格納することもできます)。</p></li>
<li><p>要約テキストでの検索結果を改善するために、ハイブリッド検索アプローチを設計する。一つの検索パスに対して、OpenAIの<code translate="no">text-embedding-3-large</code> やオープンソースの<code translate="no">bge-large-en-v1.5</code> のような、テキストから密なベクトルを生成する通常の埋め込みモデルを使用する。これらのモデルはテキストの全体的な意味を表現するのに適している。もう1つの方法は、BM25やSPLADEのようなスパース埋め込みモデルを使用してスパースベクトルを生成することである。Milvusは、マルチベクトル機能により、同じデータコレクションで両方を使用することをサポートしています。複数のベクトルに対する検索は、単一の<code translate="no">hybrid_search()</code> 操作で行うことができる。</p></li>
<li><p>最後に、Milvusの用語では正式には「エンティティ」と呼ばれる、個々のニュースページを識別するためのIDフィールドも必要である。このフィールドは主キー（略して "pk"）として使用される。</p></li>
</ul>
<table data-block-token="EOxnd1GqhoODuWx4UyucOMahn0e"><thead><tr><th data-block-token="P2g0djnY5oRKT7xw7aSceiaQnRb" colspan="1" rowspan="1"><p data-block-token="TrIsdjxzooLqxUxiqkTcfN5pnHd">フィールド名</p>
</th><th data-block-token="KVq4dDr4BovOHSxtWd5cZBnnnn5" colspan="1" rowspan="1"><p data-block-token="D9uYdwp8ToHqXmxqueVcBAi2n6b">article_id (主キー)</p>
</th><th data-block-token="O6jTdN4rBouwtQxFNgpcM7GFnyp" colspan="1" rowspan="1"><p data-block-token="IJuldjRIeoNHRgx0ix5c2eBSn6f">タイトル</p>
</th><th data-block-token="V4EKdYzLqoENTTxXuOwcVTIGnLg" colspan="1" rowspan="1"><p data-block-token="Tldydg7BboZeSUxiaTfcUnsfnqd">著者情報</p>
</th><th data-block-token="GHF6dqGRVoQ6Kpxv9tUcijFXnVc" colspan="1" rowspan="1"><p data-block-token="Ih0jdg4yToRJOkxyriwcKJ39nVd">パブリッシュ</p>
</th><th data-block-token="Ui3ldA2BwovU8LxMHcIcrmVvnLg" colspan="1" rowspan="1"><p data-block-token="PJGJdX1efoo647xvgCDcuhkznye">画像URL</p>
</th><th data-block-token="VCskd6ySvocz8IxF5CVcpmF5n0b" colspan="1" rowspan="1"><p data-block-token="Cx7idKjgYoctpYxsnskc7OD0nxb">画像ベクトル</p>
</th><th data-block-token="WSbhdTqglocn3KxpvBscFOh2n6d" colspan="1" rowspan="1"><p data-block-token="Q16ods013oZUOQxk9vicK0JGn2e">要約</p>
</th><th data-block-token="T5HAdXwado1qJpxCpf9cwDjmnhe" colspan="1" rowspan="1"><p data-block-token="ZG3odG5k2oMqFSxM8TFcE8kZnCh">要約_デンスベクトル</p>
</th><th data-block-token="MWAHdYgIvogpIfxsRnscz5WWnOe" colspan="1" rowspan="1"><p data-block-token="MeU1dGziaodmTkxc5q9cvYR9ndd">要約_疎ベクトル</p>
</th></tr></thead><tbody><tr><td data-block-token="V1x7d7y15oxxNSxpvRJcoW7VnWh" colspan="1" rowspan="1"><p data-block-token="X9old4LgooPgrexElIBc2JgNnac">型</p>
</td><td data-block-token="EWlPdiRtBoqrOYxLoWDcnPUQn3f" colspan="1" rowspan="1"><p data-block-token="TtABd1mq0o2ShTxtXfncI8i9n8g">INT64</p>
</td><td data-block-token="ZICad5qEYohcTvxo477cZIWInCh" colspan="1" rowspan="1"><p data-block-token="CBHWdVhLKo2wn1xR3Pocf43NnRs">VARCHAR</p>
</td><td data-block-token="VTwJdpuQboqurJxXbQUctG8fnNc" colspan="1" rowspan="1"><p data-block-token="OI1ldgzbAoEIOUx7boRcooR0nvb">JSON</p>
</td><td data-block-token="UVWKdd69Mo8hyyxOqLLcZn7kncc" colspan="1" rowspan="1"><p data-block-token="QJUZdxgzEora0PxAxf8c1axknbp">INT32</p>
</td><td data-block-token="Wf8AdfYj1on0OkxjHkocPiqInYe" colspan="1" rowspan="1"><p data-block-token="KE0QdVg3doF05Exq3fmccqOcnvc">VARCHAR</p>
</td><td data-block-token="JVHgd9P9aoSl9mxqoFfcM7ownXz" colspan="1" rowspan="1"><p data-block-token="TwotdcMshoE2TSxGIauclTZjnLh">FLOAT_VECTOR</p>
</td><td data-block-token="MUwwdyV4co3V2QxOxc1cMuD9nbc" colspan="1" rowspan="1"><p data-block-token="RpfxdP0AHoW0xhx8sfBclJvtnyc">VARCHAR</p>
</td><td data-block-token="P4bqdeIGOoV67FxhYmtclfBpn1d" colspan="1" rowspan="1"><p data-block-token="RyztdWGXzoP4IBxHd8Pcu0q2nbe">FLOAT_VECTOR</p>
</td><td data-block-token="AtJldXTWUoT5FPxY6EncUqWsnrc" colspan="1" rowspan="1"><p data-block-token="FJMJdqKeFodc73xGlnpcYgJanWg">スパース・フロート・ベクトル</p>
</td></tr><tr><td data-block-token="ZAKYdJAv6oj5IxxYUaUcLFOEnkh" colspan="1" rowspan="1"><p data-block-token="Frr0dWnzWo5UFDxLfqaceqvSnmg">インデックスが必要</p>
</td><td data-block-token="ONHadATa9ojiwAxEwUdcaJpOnbb" colspan="1" rowspan="1"><p data-block-token="ZGT8dgMGbo8r22xpFztcycKDn9c">N</p>
</td><td data-block-token="E3Hod6CkXozMt4x0xF6cPkdin4e" colspan="1" rowspan="1"><p data-block-token="Ha0PdI0byocer9xXJGac8QYdnPg">N</p>
</td><td data-block-token="NaJ5dcptooRPe8xk9VTcx6Amnld" colspan="1" rowspan="1"><p data-block-token="U57edD6zqoPY7LxQjPDcnNDVnxc">N (近日サポート開始)</p>
</td><td data-block-token="MqejdtkWboMHmZxWWCAcK7X0n1e" colspan="1" rowspan="1"><p data-block-token="NeNJdcEvloQ4E7xN9JeczCORnQX">Y</p>
</td><td data-block-token="VKy3driI9owHhCx1l4Iczj8Hnkb" colspan="1" rowspan="1"><p data-block-token="QRWQdK0J3oWYc0x8xT6c4Me5nXb">N</p>
</td><td data-block-token="EZR0dRNXpotMtdxAKG9cHj8zn2c" colspan="1" rowspan="1"><p data-block-token="LTyRduM2FoGmkVxa1HgceBFbnKf">Y</p>
</td><td data-block-token="W3MydyW7bod6UaxdNURcqTnBnFb" colspan="1" rowspan="1"><p data-block-token="EwbCdu2ZZop4zJxbyhZcR2HunUh">N</p>
</td><td data-block-token="XQdvd35mVov5cUxstzpcipmlni8" colspan="1" rowspan="1"><p data-block-token="SJoudzWmiouT20xXCCpcQR1Mnsz">Y</p>
</td><td data-block-token="MXntdRmaUo91QoxGeNgc9goanee" colspan="1" rowspan="1"><p data-block-token="Sxfzdk7VoocU6kxAV63cI3ObnTe">Y</p>
</td></tr></tbody></table>
<h1 id="How-to-Implement-the-Example-Schema​" class="common-anchor-header">スキーマ例の実装方法<button data-href="#How-to-Implement-the-Example-Schema​" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Create-Schema​" class="common-anchor-header">スキーマの作成<button data-href="#Create-Schema​" class="anchor-icon" translate="no">
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
    </button></h2><p>まず、Milvusサーバに接続し、コレクションとデータを管理するためのMilvusクライアントインスタンスを作成します。</p>
<p>スキーマをセットアップするために <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a>を使用してスキーマオブジェクトを作成し <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md"><code translate="no">add_field()</code></a>を使用してスキーマにフィールドを追加します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
collection_name = <span class="hljs-string">&quot;my_collection&quot;</span>​
​
<span class="hljs-comment"># client = MilvusClient(uri=&quot;http://localhost:19530&quot;)​</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)​
​
schema = MilvusClient.create_schema(​
    auto_id=<span class="hljs-literal">False</span>,​
)​
​
schema.add_field(field_name=<span class="hljs-string">&quot;article_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article id&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;title&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">200</span>, description=<span class="hljs-string">&quot;article title&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;author_info&quot;</span>, datatype=DataType.JSON, description=<span class="hljs-string">&quot;author information&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;publish_ts&quot;</span>, datatype=DataType.INT32, description=<span class="hljs-string">&quot;publish timestamp&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;image_url&quot;</span>, datatype=DataType.VARCHAR,  max_length=<span class="hljs-number">500</span>, description=<span class="hljs-string">&quot;image URL&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;image_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;image vector&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;summary&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, description=<span class="hljs-string">&quot;article summary&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;summary_dense_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;summary dense vector&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR, description=<span class="hljs-string">&quot;summary sparse vector&quot;</span>)​

<button class="copy-code-btn"></button></code></pre>
<p>Milvus サーバに接続するために<code translate="no">MilvusClient</code> の引数<code translate="no">uri</code> にお気づきでしょうか。引数は以下のように設定できます。</p>
<ul>
<li><p>小規模なデータやプロトタイプを作成するためにローカルのベクターデータベースが必要なだけであれば、uri をローカルファイル、例えば<code translate="no">./milvus.db</code> に設定するのが最も便利な方法です。</p></li>
<li><p>もし、100万ベクトルを超えるような大規模なデータがある場合は、<a href="https://milvus.io/docs/quickstart.md">DockerやKubernetes</a>上に、よりパフォーマンスの高いMilvusサーバを構築することができます。このセットアップでは、サーバのアドレスとポートをURIとして使用してください（例：<code translate="no">http://localhost:19530</code> ）。Milvusで認証機能を有効にしている場合、トークンには"&lt;your_username&gt;:&lt;your_password&gt;"を使用します。</p></li>
<li><p>Milvusのフルマネージドクラウドサービスである<a href="https://zilliz.com/cloud">Zilliz Cloudを</a>ご利用の場合は、Zilliz Cloudの<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public EndpointとAPI keyに</a>対応する<code translate="no">uri</code> と<code translate="no">token</code> を調整してください。</p></li>
</ul>
<p><code translate="no">MilvusClient.create_schema</code> の<code translate="no">auto_id</code> については、AutoID はプライマリフィールドの属性で、プライマリフィールドのオートインクリメントを有効にするかどうかを決定します。  フィールド<code translate="no">article_id</code> を主キーとして設定し、記事 ID を手動で追加したいので、この機能を無効にするために<code translate="no">auto_id</code> を False に設定します。</p>
<p>スキーマオブジェクトにすべてのフィールドを追加した後、スキーマオブジェクトは上の表のエントリと一致します。</p>
<h2 id="Define-Index​" class="common-anchor-header">インデックスの定義<button data-href="#Define-Index​" class="anchor-icon" translate="no">
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
    </button></h2><p>メタデータや画像や要約データのためのベクター・フィールドを含む様々なフィールドでスキーマを定義した後、次のステップではインデックス・パラメーターを準備します。インデックスの作成は、ベクターの検索と取得を最適化し、効率的なクエリ・パフォーマンスを確保するために非常に重要です。次のセクションでは、コレクション内の指定されたベクトルフィールドとスカラーフィールドのインデックスパラ メータを定義します。</p>
<pre><code translate="no" class="language-python">index_params = client.<span class="hljs-title function_">prepare_index_params</span>()​
​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;image_vector&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
)​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;summary_dense_vector&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
)​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>,​
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
)​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;publish_ts&quot;</span>,​
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,​
)​

<button class="copy-code-btn"></button></code></pre>
<p>インデックスパラメータが設定され適用されると、Milvusはベクトルおよびスカラーデータに対する複雑なクエリを処理するために最適化されます。このインデックス作成により、コレクション内の類似検索の性能と精度が向上し、画像ベクトルや要約ベクトルに基づく記事の効率的な検索が可能になる。密なベクトルに対する <a href="https://milvus.io/docs/glossary.md#Auto-Index"><code translate="no">AUTOINDEX</code></a>を活用することで <a href="https://milvus.io/docs/sparse_vector.md#Index-the-collection"><code translate="no">SPARSE_INVERTED_INDEX</code></a>疎ベクトルには <a href="https://milvus.io/docs/scalar_index.md#Inverted-indexing"><code translate="no">INVERTED_INDEX</code></a>forスカラーを活用することで、Milvusは最も関連性の高い結果を素早く識別して返すことができ、全体的なユーザーエクスペリエンスとデータ検索プロセスの有効性を大幅に向上させることができる。</p>
<p>インデックスとメトリックには多くの種類があります。これらの詳細については、<a href="https://milvus.io/docs/overview.md#Index-types">Milvusインデックス</a>タイプと<a href="https://milvus.io/docs/glossary.md#Metric-type">Milvusメトリックタイプを</a>参照してください。</p>
<h2 id="Create-Collection​" class="common-anchor-header">コレクションの作成<button data-href="#Create-Collection​" class="anchor-icon" translate="no">
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
    </button></h2><p>スキーマとインデックスが定義されたので、これらのパラメータで "コレクション "を作成します。MilvusにとってのコレクションはリレーショナルDBにとってのテーブルのようなものです。</p>
<pre><code translate="no" class="language-python">client.create_collection(​
    collection_name=collection_name,​
    schema=schema,​
    index_params=index_params,​
)​

<button class="copy-code-btn"></button></code></pre>
<p>コレクションを記述することで、コレクションが正常に作成されたことを確認できます。</p>
<pre><code translate="no" class="language-python">collection_desc = client.describe_collection(​
    collection_name=collection_name​
)​
<span class="hljs-built_in">print</span>(collection_desc)​

<button class="copy-code-btn"></button></code></pre>
<h1 id="Other-Considerations​" class="common-anchor-header">その他の検討事項<button data-href="#Other-Considerations​" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Loading-Index​" class="common-anchor-header">インデックスの読み込み<button data-href="#Loading-Index​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusでコレクションを作成する際、インデックスのロードを即座に行うか、いくつかのデータを一括インジェストした後まで延期するかを選択することができます。上記の例では、コレクション作成直後に取り込まれたデータに対してインデックスが自動的に構築されるため、通常、明示的に選択する必要はありません。これにより、取り込まれたデータをすぐに検索できるようになります。しかし、コレクション作成後に大量の一括挿入があり、ある時点までデータを検索する必要がない場合は、コレクション作成でindex_paramsを省略することでインデックス構築を延期し、すべてのデータを取り込んだ後に明示的にloadを呼び出すことでインデックスを構築できます。この方法は、大きなコレクションにインデックスを構築する場合に効率的ですが、load() を呼び出すまで検索はできません。</p>
<h2 id="How-to-Define-Data-Model-For-Multi-tenancy​" class="common-anchor-header">マルチテナントのデータモデルの定義方法<button data-href="#How-to-Define-Data-Model-For-Multi-tenancy​" class="anchor-icon" translate="no">
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
    </button></h2><p>複数のテナントという概念は、1つのソフトウェア・アプリケーションやサービスが、それぞれ独立した環境を持つ複数のユーザーや組織にサービスを提供する必要がある場合によく使われる。これは、クラウドコンピューティング、SaaS（Software as a Service）アプリケーション、データベースシステムで頻繁に見られます。例えば、クラウドストレージサービスでは、マルチテナントを利用することで、同じインフラを共有しながら、異なる企業が別々にデータを保存・管理できるようにすることができる。このアプローチは、各テナントのデータ・セキュリティとプライバシーを確保しながら、リソースの利用と効率を最大化する。</p>
<p>テナントを区別する最も簡単な方法は、データとリソースを互いに分離することです。各テナントは特定のリソースに排他的にアクセスするか、他のテナントとリソースを共有してデータベース、コレクション、パーティションなどのMilvusエンティティを管理します。Milvusのマルチテナントを実装するには、これらのエンティティに沿った特定の方法があります。詳細は<a href="https://milvus.io/docs/multi_tenancy.md#Multi-tenancy-strategies">Milvusマルチテナンシーページを</a>ご参照ください。</p>
