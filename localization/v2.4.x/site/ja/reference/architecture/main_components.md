---
id: main_components.md
summary: Milvusのスタンドアロンおよびクラスタの主要コンポーネントについて学びます。
title: 主要コンポーネント
---
<h1 id="Main-Components" class="common-anchor-header">主要コンポーネント<button data-href="#Main-Components" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusにはスタンドアロンとクラスタの2つの動作モードがあります。この2つのモードは同じ機能を共有しています。データセットのサイズやトラフィックデータなどに応じて、最適なモードを選択することができます。現在のところ、MilvusスタンドアロンからMilvusクラスタへの "オンライン "アップグレードはできません。</p>
<h2 id="Milvus-standalone" class="common-anchor-header">Milvusスタンドアロン<button data-href="#Milvus-standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusスタンドアロンには3つのコンポーネントがあります：</p>
<ul>
<li><p><strong>Milvus：</strong>中核となる機能コンポーネント</p></li>
<li><p><strong>メタストア</strong>プロキシ、インデックスノードなどのMilvus内部コンポーネントのメタデータにアクセスし、保存するメタデータエンジン。</p></li>
<li><p><strong>オブジェクトストレージ</strong>Milvusのデータ永続化を担うストレージエンジン。</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/standalone_architecture.jpg" alt="Standalone_architecture" class="doc-image" id="standalone_architecture" />
   </span> <span class="img-wrapper"> <span>スタンドアロンアーキテクチャ</span> </span></p>
<h2 id="Milvus-cluster" class="common-anchor-header">Milvusクラスタ<button data-href="#Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Milvusクラスタには</strong>7つのマイクロサービスコンポーネントと3つのサードパーティの依存関係が含まれます。すべてのマイクロサービスは互いに独立してKubernetes上にデプロイできる。</p>
<h3 id="Microservice-components" class="common-anchor-header">マイクロサービスコンポーネント</h3><ul>
<li>ルートコーディネーション</li>
<li>プロキシ</li>
<li>クエリコーデック</li>
<li>クエリノード</li>
<li>データ・ノード</li>
<li>インデックスノード</li>
<li>データノード</li>
</ul>
<h3 id="Third-party-dependencies" class="common-anchor-header">サードパーティの依存関係</h3><ul>
<li><strong>メタストア：</strong>クラスタ内のさまざまなコンポーネント（etcdなど）のメタデータを格納する。</li>
<li><strong>オブジェクトストレージ：</strong> インデックスやバイナリログファイルなど、クラスタ内の大容量ファイルのデータ永続化を担当。</li>
<li><strong>ログブローカー：</strong>最近の突然変異操作のログを管理し、ストリーミング・ログを出力し、ログ・パブリッシュ・サブスクライブ・サービスを提供する。</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/distributed_architecture.jpg" alt="Distributed_architecture" class="doc-image" id="distributed_architecture" />
   </span> <span class="img-wrapper"> <span>分散アーキテクチャ</span> </span></p>
<h2 id="Whats-next" class="common-anchor-header">次のページ<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Milvusの仕組みと設計原理を理解するには、<a href="/docs/ja/v2.4.x/four_layers.md">コンピューティング/ストレージ分散を</a>お読みください。</li>
</ul>
