---
id: kafka-connect-milvus.md
summary: >-
  Apache KafkaはMilvusおよびZilliz
  Cloudと統合され、ベクトルデータをストリーミングします。Kafka-Milvusコネクタを使用して、セマンティック検索、レコメンデーションシステム、AI駆動型分析のためのリアルタイムパイプラインを構築する方法をご紹介します。
title: Apache Kafka®とMilvus/Zilliz Cloudを接続してリアルタイムでベクターデータを取り込む
---
<h1 id="Connect-Apache-Kafka®-with-MilvusZilliz-Cloud-for-Real-Time-Vector-Data-Ingestion" class="common-anchor-header">Apache Kafka®とMilvus/Zilliz Cloudを接続してリアルタイムでベクターデータを取り込む<button data-href="#Connect-Apache-Kafka®-with-MilvusZilliz-Cloud-for-Real-Time-Vector-Data-Ingestion" class="anchor-icon" translate="no">
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
    </button></h1><p>このクイックスタートガイドでは、オープンソースカフカとZilliz Cloudをセットアップしてベクトルデータを取り込む方法を紹介します。</p>
<p>このチュートリアルでは、Apache Kafka®を使用してベクトルデータをMilvusベクトルデータベースとZilliz Cloud（フルマネージドMilvus）にストリーミングして取り込み、セマンティック検索、レコメンデーションシステム、AIを活用した分析などの高度なリアルタイムアプリケーションを実現する方法を説明します。</p>
<p>Apache Kafkaは、高スループット、低レイテンシーのパイプライン用に設計された分散イベントストリーミングプラットフォームです。データベース、IoTデバイス、モバイルアプリ、クラウドサービスなどのソースからリアルタイムのデータストリームを収集、保存、処理するために広く使用されている。Kafkaは大量のデータを扱うことができるため、MilvusやZilliz Cloudのようなベクトルデータベースの重要なデータソースとなっている。</p>
<p>例えば、Kafkaは、ユーザーとのインタラクションやセンサーの測定値などのリアルタイムのデータストリームを、機械学習モデルからのエンベッディングとともにキャプチャし、これらのストリームをMilvusやZilliz Cloudに直接パブリッシュすることができます。いったんベクトル・データベースに格納されると、このデータはインデックス化され、検索され、効率的に分析される。</p>
<p>KafkaとMilvusおよびZilliz Cloudとの統合は、非構造化データワークフローのための強力なパイプラインを構築するシームレスな方法を提供します。このコネクターは、オープンソースのKafkaデプロイメントと、<a href="https://www.confluent.io/hub/zilliz/kafka-connect-milvus">Confluentや</a> <a href="https://docs.streamnative.io/hub/connector-kafka-connect-milvus-sink-v0.1">StreamNativeの</a>ようなホスト型サービスの両方で動作します。</p>
<p>このチュートリアルでは、Zilliz Cloudをデモとして使用する：</p>
<h2 id="Step-1-Download-the-kafka-connect-milvus-plugin" class="common-anchor-header">ステップ1：kafka-connect-milvusプラグインのダウンロード<button data-href="#Step-1-Download-the-kafka-connect-milvus-plugin" class="anchor-icon" translate="no">
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
    </button></h2><p>以下の手順でkafka-connect-milvusプラグインをダウンロードする。</p>
<ol>
<li><a href="https://github.com/zilliztech/kafka-connect-milvus/releases">ここから</a>最新のプラグインZIPファイル<code translate="no">zilliz-kafka-connect-milvus-xxx.zip</code> をダウンロードしてください。</li>
</ol>
<h2 id="Step-2-Download-Kafka" class="common-anchor-header">ステップ2：Kafkaのダウンロード<button data-href="#Step-2-Download-Kafka" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><a href="https://kafka.apache.org/downloads">ここから</a>最新のkafkaをダウンロードします。</li>
<li>ダウンロードしたファイルを解凍し、kafkaディレクトリに移動します。</li>
</ol>
<pre><code translate="no" class="language-shell">$ tar -xzf kafka_2.13-3.6.1.tgz
$ <span class="hljs-built_in">cd</span> kafka_2.13-3.6.1
<button class="copy-code-btn"></button></code></pre>
<h2 id="STEP-3-Start-the-Kafka-Environment" class="common-anchor-header">ステップ3：Kafka環境の起動<button data-href="#STEP-3-Start-the-Kafka-Environment" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">
<p>注：ローカル環境にはJava 8+がインストールされている必要があります。</p>
</div>
<p>すべてのサービスを正しい順序で開始するために、以下のコマンドを実行します：</p>
<ol>
<li><p>ZooKeeperサービスを開始する。</p>
<pre><code translate="no" class="language-shell">$ bin/zookeeper-server-start.sh config/zookeeper.properties
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Kafkaブローカーサービスを開始する。</p>
<p>別のターミナルセッションを開いて実行する：</p>
<pre><code translate="no" class="language-shell">$ bin/kafka-server-start.sh config/server.properties
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>すべてのサービスが正常に起動したら、基本的なKafka環境が起動し、使用できるようになります。</p>
<ul>
<li>詳細については、公式のクイックスタートガイド（https://kafka.apache.org/quickstart）を参照してください。</li>
</ul>
<h2 id="Step-4-Configure-Kafka-and-Zilliz-Cloud" class="common-anchor-header">ステップ4：KafkaとZilliz Cloudの設定<button data-href="#Step-4-Configure-Kafka-and-Zilliz-Cloud" class="anchor-icon" translate="no">
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
    </button></h2><p>KafkaとZilliz Cloudがセットアップされ、適切に設定されていることを確認します。</p>
<ol>
<li><p>Kafkaにまだトピックがない場合は、Kafkaにトピック（例：<code translate="no">topic_0</code> ）を作成します。</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">bin</span>/kafka-topics.sh --create --topic topic_0 --bootstrap-server localhost:<span class="hljs-number">9092</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Zilliz Cloudにまだコレクションがない場合は、ベクトルフィールドを持つコレクションを作成します（この例ではベクトルは<code translate="no">dimension=8</code> ）。Zilliz Cloudでは以下のスキーマ例を使用できます：</p>
<p><img translate="no" src="https://github.com/zilliztech/kafka-connect-milvus/raw/main/src/main/resources/images/collection_schema.png" width="100%"  alt=""/></p>
<p><div class="alert note"></p>
<p>注意：双方のスキーマが一致していることを確認してください。このスキーマでは、ベクトルフィールドは正確に1つです。双方のフィールド名は全く同じです。</p>
<p></div></p></li>
</ol>
<h2 id="Step-5-Load-the-kafka-connect-milvus-plugin-to-Kafka-Instance" class="common-anchor-header">ステップ5：kafka-connect-milvusプラグインをKafkaインスタンスにロードする。<button data-href="#Step-5-Load-the-kafka-connect-milvus-plugin-to-Kafka-Instance" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>ステップ1でダウンロードした<code translate="no">zilliz-kafka-connect-milvus-xxx.zip</code> ファイルを解凍します。</p></li>
<li><p><code translate="no">zilliz-kafka-connect-milvus</code> ディレクトリを Kafka インストールの<code translate="no">libs</code> ディレクトリにコピーします。</p></li>
<li><p>Kafka インストールの<code translate="no">config</code> ディレクトリにある<code translate="no">connect-standalone.properties</code> ファイルを修正します。</p>
<pre><code translate="no" class="language-properties">key.converter.schemas.enable=<span class="hljs-literal">false</span>
value.converter.schemas.enable=<span class="hljs-literal">false</span>
plugin.path=libs/zilliz-kafka-connect-milvus-xxx
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Kafka インストールの<code translate="no">config</code> ディレクトリに<code translate="no">milvus-sink-connector.properties</code> ファイルを作成し、設定します。</p>
<pre><code translate="no" class="language-properties">name=zilliz-kafka-connect-milvus
connector.<span class="hljs-keyword">class</span>=com.milvus.io.kafka.MilvusSinkConnector
<span class="hljs-keyword">public</span>.endpoint=https:<span class="hljs-comment">//&lt;public.endpoint&gt;:port</span>
token=*****************************************
collection.name=topic_0
topics=topic_0
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Step-6-Launch-the-connector" class="common-anchor-header">ステップ6：コネクターを起動する<button data-href="#Step-6-Launch-the-connector" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>前の設定ファイルを使用してコネクタを起動します。</p>
<pre><code translate="no" class="language-shell">$ bin/connect-standalone.sh config/connect-standalone.properties config/milvus-sink-connector.properties
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Kafkaで作成したKafkaトピックにメッセージを生成してみる</p>
<pre><code translate="no" class="language-shell">bin/kafka-<span class="hljs-variable language_">console</span>-producer.<span class="hljs-property">sh</span> --topic topic_0 --bootstrap-server <span class="hljs-attr">localhost</span>:<span class="hljs-number">9092</span>                        
&gt;{<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>, <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;The Reported Mortality Rate of Coronavirus Is Not Important&quot;</span>, <span class="hljs-string">&quot;title_vector&quot;</span>: [<span class="hljs-number">0.041732933</span>, <span class="hljs-number">0.013779674</span>, -<span class="hljs-number">0.027564144</span>, -<span class="hljs-number">0.013061441</span>, <span class="hljs-number">0.009748648</span>, <span class="hljs-number">0.00082446384</span>, -<span class="hljs-number">0.00071647146</span>, <span class="hljs-number">0.048612226</span>], <span class="hljs-string">&quot;link&quot;</span>: <span class="hljs-string">&quot;https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912&quot;</span>}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>エンティティがZilliz Cloudのコレクションに挿入されているか確認します。挿入に成功した場合のZilliz Cloud上の表示は以下のようになります：</p>
<p><img translate="no" src="https://github.com/zilliztech/kafka-connect-milvus/raw/main/src/main/resources/images/insearted_entities.png" width="80%" /></p></li>
</ol>
<h3 id="Support" class="common-anchor-header">サポート</h3><p>Kafka Connect Milvus Connectorに関するご質問やサポートが必要な場合は、コネクタのメンテナまでお気軽にお問い合わせください：<strong>メール</strong> <a href="mailto:support@zilliz.com">：support@zilliz.com</a></p>
