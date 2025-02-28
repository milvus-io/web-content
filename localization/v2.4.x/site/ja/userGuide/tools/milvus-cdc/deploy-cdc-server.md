---
id: deploy-cdc-server.md
order: 2
summary: 本ガイドでは、Milvus-CDCサーバーのデプロイ手順を順を追って説明します。
title: CDCサーバのデプロイ
---
<h1 id="Deploy-CDC-Server" class="common-anchor-header">CDCサーバのデプロイ<button data-href="#Deploy-CDC-Server" class="anchor-icon" translate="no">
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
    </button></h1><p>このガイドでは、Milvus-CDCサーバをデプロイするためのステップバイステップのプロセスを説明します。</p>
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
    </button></h2><p>Milvus-CDCサーバをデプロイする前に、以下の条件が満たされていることを確認してください：</p>
<ul>
<li><p><strong>Milvusインスタンス</strong>：Milvusインスタンス：ソースMilvusと少なくとも1つのターゲットMilvusの両方がデプロイされ、稼動していること。</p>
<ul>
<li><p>ソースとターゲットのMilvusのバージョンは2.3.2以上、できれば2.4.xであることが望ましい。</p></li>
<li><p>ターゲットMilvusの<code translate="no">common.ttMsgEnabled</code> の設定を<code translate="no">false</code> に設定する。</p></li>
<li><p>ソースMilvusとターゲットMilvusのコンフリクトを防ぐため、メタとメッセージストレージを別々に設定する。例えば、複数のMilvusインスタンスで同じetcdおよびrootPath構成、同じPulsarサービスおよび<code translate="no">chanNamePrefix</code> 。</p></li>
</ul></li>
<li><p><strong>メタストア</strong>：Milvus-CDCメタストア用に、etcdまたはMySQLデータベースを用意してください。</p></li>
</ul>
<h2 id="Steps" class="common-anchor-header">ステップ<button data-href="#Steps" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Obtain-the-Milvus-CDC-config-file" class="common-anchor-header">Milvus-CDC設定ファイルを入手する。</h3><p><a href="https://github.com/zilliztech/milvus-cdc">Milvus-CDCのリポジトリを</a>クローンし、<code translate="no">milvus-cdc/server/configs</code> ディレクトリに移動して、<code translate="no">cdc.yaml</code> 設定ファイルにアクセスします。</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/zilliztech/milvus-cdc.git

<span class="hljs-built_in">cd</span> milvus-cdc/server/configs
<button class="copy-code-btn"></button></code></pre>
<h3 id="Edit-the-config-file" class="common-anchor-header">設定ファイルの編集</h3><p><code translate="no">milvus-cdc/server/configs</code> ディレクトリで、<code translate="no">cdc.yaml</code> ファイルを修正し、Milvus-CDC メタストアとソース Milvus の接続詳細に関連する設定をカスタマイズします。</p>
<ul>
<li><p><strong>メタストア設定</strong>：</p>
<ul>
<li><p><code translate="no">metaStoreConfig.storeType</code>:Milvus-CDCのメタストアのタイプ。設定可能な値は<code translate="no">etcd</code> または<code translate="no">mysql</code> です。</p></li>
<li><p><code translate="no">metaStoreConfig.etcdEndpoints</code>:Milvus-CDCのetcdに接続するためのアドレス。<code translate="no">storeType</code> が<code translate="no">etcd</code> に設定されている場合は必須です。</p></li>
<li><p><code translate="no">metaStoreConfig.mysqlSourceUrl</code>:Milvus-CDCサーバのMySQLデータベースの接続アドレス。<code translate="no">storeType</code> が<code translate="no">mysql</code> に設定されている場合は必須。</p></li>
<li><p><code translate="no">metaStoreConfig.rootPath</code>:Milvus-CDCメタストアのルートパス。この設定により、複数のCDCサービスが同じetcdまたはMySQLインスタンスを利用しながら、異なるルートパスによる分離を実現するマルチテナントが可能になります。</p></li>
</ul>
<p>設定例</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># cdc meta data config</span>
metaStoreConfig:
  <span class="hljs-comment"># the metastore type, available value: etcd, mysql</span>
  storeType: etcd
  <span class="hljs-comment"># etcd address</span>
  etcdEndpoints:
    - localhost:<span class="hljs-number">2379</span>
  <span class="hljs-comment"># mysql connection address</span>
  <span class="hljs-comment"># mysqlSourceUrl: root:root@tcp(127.0.0.1:3306)/milvus-cdc?charset=utf8</span>
  <span class="hljs-comment"># meta data prefix, if multiple cdc services use the same store service, you can set different rootPaths to achieve multi-tenancy</span>
  rootPath: cdc
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>ソースMilvusコンフィギュレーション：</strong></p>
<p>Milvus-CDCサーバとソースMilvus間の接続を確立するために、etcdやメッセージストレージを含むソースMilvusの接続詳細を指定します。</p>
<ul>
<li><p><code translate="no">sourceConfig.etcdAddress</code>:Milvusのetcdに接続するためのアドレス。詳細は<a href="https://milvus.io/docs/configure_etcd.md#etcd-related-Configurations">etcd 関連設定を</a>参照。</p></li>
<li><p><code translate="no">sourceConfig.etcdRootPath</code>:ソースMilvusがetcdにデータを保存するキーのルート接頭辞。Milvusインスタンスのデプロイ方法によって値が異なる場合があります：</p>
<ul>
<li><p><strong>Helm</strong>または<strong>Docker Compose</strong>: デフォルトは<code translate="no">by-dev</code> です。</p></li>
<li><p><strong>オペレータ</strong>：デフォルトは<code translate="no">&lt;release_name&gt;</code> 。</p></li>
</ul></li>
<li><p><code translate="no">replicateChan</code>: milvusレプリケートチャネル名。milvus.yamlファイルの<code translate="no">{msgChannel.chanNamePrefix.cluster}/{msgChannel.chanNamePrefix.replicateMsg}</code> 。</p></li>
<li><p><code translate="no">sourceConfig.pulsar</code>:ソースmilvusのパルサー・コンフィギュレーション。ソースMilvusがメッセージ・ストレージにKafkaを使用している場合は、Pulsar関連の設定をすべて削除してください。詳細は<a href="https://milvus.io/docs/configure_pulsar.md">Pulsar関連コンフィギュレーションを</a>参照。</p></li>
<li><p><code translate="no">sourceConfig.kafka.address</code>:ソースMilvusのKafkaアドレス。ソースMilvusがメッセージ保存にKafkaを使用する場合は、このコンフィギュレーションのコメントを外します。</p></li>
</ul></li>
</ul>
<p>設定例：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus-source config, these settings are basically the same as the corresponding configuration of milvus.yaml in milvus source.</span>
sourceConfig:
  <span class="hljs-comment"># etcd config</span>
  etcdAddress:
    - localhost:<span class="hljs-number">2379</span>
  etcdRootPath: by-dev
  etcdMetaSubPath: meta
  <span class="hljs-comment"># default partition name</span>
  defaultPartitionName: _default
  <span class="hljs-comment"># read buffer length, mainly used for buffering if writing data to milvus-target is slow.</span>
  readChanLen: <span class="hljs-number">10</span>
  replicateChan: by-dev-replicate-msg
  <span class="hljs-comment"># milvus-source mq config, which is pulsar or kafka</span>
  pulsar:
    address: pulsar://localhost:<span class="hljs-number">6650</span>
    webAddress: localhost:<span class="hljs-number">80</span>
    maxMessageSize: <span class="hljs-number">5242880</span>
    tenant: public
    namespace: default
<span class="hljs-comment">#    authPlugin: org.apache.pulsar.client.impl.auth.AuthenticationToken</span>
<span class="hljs-comment">#    authParams: token:xxx</span>
<span class="hljs-comment">#  kafka:</span>
<span class="hljs-comment">#    address: 127.0.0.1:9092</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Compile-the-Milvus-CDC-server" class="common-anchor-header">Milvus-CDCサーバのコンパイル</h3><p><code translate="no">cdc.yaml</code> ファイルを保存した後、<code translate="no">milvus-cdc</code> ディレクトリに移動し、以下のコマンドのいずれかを実行してサーバをコンパイルする：</p>
<ul>
<li><p>バイナリファイルの場合</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">make</span> build
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Dockerイメージの場合：</p>
<pre><code translate="no" class="language-bash">bash build_image.sh
<button class="copy-code-btn"></button></code></pre>
<p>Docker イメージの場合： コンパイルしたファイルをコンテナ内の<code translate="no">/app/server/configs/cdc.yaml</code> にマウントする。</p></li>
</ul>
<h3 id="Start-the-server" class="common-anchor-header">サーバーの起動</h3><ul>
<li><p>バイナリを使用する</p>
<p><code translate="no">milvus-cdc</code> バイナリのあるディレクトリと<code translate="no">cdc.yaml</code> ファイルのある<code translate="no">configs</code> ディレクトリに移動し、サーバを起動します：</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># dir tree</span>
.
├── milvus-cdc <span class="hljs-comment"># build from source code or download from release page</span>
├── configs
│   └── cdc.yaml <span class="hljs-comment"># config for cdc and source milvus</span>

<span class="hljs-comment"># start milvus cdc</span>
./milvus-cdc server
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Docker Composeを使用する：</p>
<pre><code translate="no" class="language-bash">docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ul>
