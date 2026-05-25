---
id: milvus_cdc_overview.md
summary: Milvus CDCは、プライマリ・スタンバイ・ディザスタリカバリのために、Milvusクラスタ間のデータ変更をレプリケートします。
title: Milvus CDC
---
<h1 id="Milvus-CDC" class="common-anchor-header">Milvus CDC<button data-href="#Milvus-CDC" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus CDC (Change Data Capture)は、Milvusクラスタ間のデータ変更をレプリケートします。CDCを使用してMilvusのプライマリ-スタンバイディザスタリカバリトポロジを構築することができます。</p>
<p>プライマリ-スタンバイ・トポロジでは、1つのクラスタがプライマリとして動作し、書き込みを受け付けます。1つまたは複数のスタンバイクラスタはプライマリからの変更を継続的に受信し、読み取りトラフィックに対応できます。プライマリクラスタが利用できなくなったり、メンテナンスが必要になったりした場合は、サービストラフィックをスタンバイクラスタに切り替えることができます。</p>
<h2 id="Architecture" class="common-anchor-header">アーキテクチャ<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>典型的なトポロジーには以下が含まれます：</p>
<ul>
<li><strong>プライマリクラスタ</strong>：レプリケーションのソース・クラスタ。読み取りと書き込みを受け付けます。</li>
<li><strong>スタンバイ・クラスタ</strong>：レプリケーションのターゲット・クラスタ。プライマリから変更を受け取り、スタンバイの間は読み取り専用です。</li>
<li><strong>CDCノード</strong>：現在のプライマリクラスタからスタンバイクラスタにWALの変更を転送するMilvusコンポーネント。スイッチオーバーまたはフェイルオーバー後にプライマリとなる可能性のある各クラスタにCDCを配置します。</li>
<li><strong>レプリケーショントポロジ</strong>：以下はトポロジーの説明図です。<span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/cdc-overview.png" alt="CDC workflow" class="doc-image" id="cdc-workflow" /><span>CDC ワークフロー</span> </span></li>
</ul>
<h3 id="Supported-Topologies" class="common-anchor-header">サポートされるトポロジー<button data-href="#Supported-Topologies" class="anchor-icon" translate="no">
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
    </button></h3><p>最も一般的なCDCの配置は、プライマリとスタンバイが1つずつです：</p>
<pre><code translate="no" class="language-text">Application writes
      |
      v
Primary cluster A  -- CDC replication --&gt;  Standby cluster B
<button class="copy-code-btn"></button></code></pre>
<p>Milvus CDCはシングルプライマリ、マルチスタンバイのトポロジもサポートしています：</p>
<pre><code translate="no" class="language-text">Primary cluster A  -- CDC replication --&gt;  Standby cluster B
                  \-- CDC replication --&gt;  Standby cluster C
<button class="copy-code-btn"></button></code></pre>
<p>Milvus CDCは、2つ以上のクラスタが同時に書き込みトラフィックを受け付けるマルチプライマリまたはアクティブ-アクティブな展開には対応していません。</p>
<h2 id="Primary-and-Standby-Behavior" class="common-anchor-header">プライマリとスタンバイの動作<button data-href="#Primary-and-Standby-Behavior" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>役割</th><th>読み込み</th><th>書き込み</th><th>レプリケーション動作</th></tr>
</thead>
<tbody>
<tr><td>プライマリ</td><td>リード</td><td>あり</td><td>スタンバイクラスタに変更を送信</td></tr>
<tr><td>スタンバイ</td><td>はい</td><td>いいえ</td><td>プライマリからレプリケートされた変更を受信</td></tr>
</tbody>
</table>
<p>スタンバイ・クラスタは直接の書き込み要求を拒否します。これにより、スプリットブレインを防ぎ、レプリケーショントポロジの一貫性を保つことができます。</p>
<h2 id="Planned-Switchover-vs-Failover" class="common-anchor-header">計画的なスイッチオーバーとフェイルオーバー<button data-href="#Planned-Switchover-vs-Failover" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus CDCでは、現在のプライマリからスタンバイクラスタにサービストラフィックを移動させる2つの方法を提供しています。</p>
<table>
<thead>
<tr><th>オペレーション</th><th>以下の場合に使用します。</th><th>データ損失</th><th>期待される動作</th></tr>
</thead>
<tbody>
<tr><td><strong><a href="/docs/ja/v2.6.x/cdc_switchover.md">スイッチオーバー</a></strong></td><td>現在のプライマリがまだ到達可能であるか、計画的なメンテナンスを行っている場合。</td><td>RPO = 0</td><td>ロール変更前にレプリケートされたデータの残りを待つ</td></tr>
<tr><td><strong><a href="/docs/ja/v2.6.x/cdc_failover.md">フェイルオーバー</a></strong></td><td>現在のプライマリが利用できず、迅速に復旧できない場合</td><td>可能</td><td>書き込みが再開できるようにスタンバイを直ちにプロモートする</td></tr>
</tbody>
</table>
<p>現在のプライマリがまだ応答できる場合は、いつでもスイッチオーバーを使用する。元のプライマリを待つよりも可用性を回復する方が重要な場合にのみフェイルオーバーを使用する。</p>
<h2 id="CDC-Lag-and-Why-It-Matters" class="common-anchor-header">CDCラグとその理由<button data-href="#CDC-Lag-and-Why-It-Matters" class="anchor-icon" translate="no">
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
    </button></h2><p>CDCラグとは、プライマリクラスタに書き込まれたものの、スタンバイクラスタにまだ適用されていないデータ量のことです。</p>
<p>CDCラグは両方のリカバリオプションに影響します：</p>
<ul>
<li>スイッチオーバーの場合、CDCラグが小さいほど、通常、処理が速く完了することを意味します。</li>
<li>フェイルオーバー中、CDCラグは、元のプライマリが利用できない場合に失われる可能性のあるデータウィンドウを表します。</li>
</ul>
<p>CDCラグを継続的に監視し、可能な限り低く保つ必要があります。<a href="/docs/ja/v2.6.x/set_up_cdc_replication.md">Set Up CDC Replicationの</a>ページには、CDCラグを見積もるためのPromQLの例が含まれています。</p>
<h2 id="Limitations" class="common-anchor-header">制限事項<button data-href="#Limitations" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus CDCには現在以下の制限があります：</p>
<ul>
<li><strong>シングルプライマリートポロジーのみを</strong>サポートします。</li>
<li>アクティブ-アクティブまたはマルチプライマリ・ライトをサポートして<strong>いません</strong>。</li>
<li>スタンバイ・クラスタは読み込みトラフィックに対応できますが、スタンバイのままでは直接の書き込みは拒否されます。</li>
<li>フェイルオーバーでは、古いプライマリに書き込まれたがスタンバイにはまだレプリケートされていないデータが失われる可能性があります。</li>
<li>設定された<code translate="no">pchannels</code> 、各クラスタの実際のチャネル・レイアウトと一致する必要があります。</li>
</ul>
<h2 id="FAQ" class="common-anchor-header">よくある質問<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Can-a-standby-cluster-serve-queries" class="common-anchor-header">スタンバイ・クラスタはクエリを処理できますか?<button data-href="#Can-a-standby-cluster-serve-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>はい。スタンバイ・クラスタは読み取りトラフィックに対応できます。プライマリになるまで書き込みを受け付けることはできません。</p>
<h3 id="Does-Milvus-CDC-support-active-active-writes" class="common-anchor-header">Milvus CDCはアクティブ-アクティブ書き込みに対応していますか？<button data-href="#Does-Milvus-CDC-support-active-active-writes" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus CDCはシングル・プライマリ・トポロジ向けに設計されています。複数のクラスタに同時に書き込みを行うと、スプリットブレインやデータの発散が発生する可能性があります。</p>
<h3 id="Does-switchover-lose-data" class="common-anchor-header">スイッチオーバーによってデータは失われますか？<button data-href="#Does-switchover-lose-data" class="anchor-icon" translate="no">
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
    </button></h3><p>スタンバイがプライマリになる前に、残りのデータがレプリケートされるのを待ちます。</p>
<h3 id="Does-failover-lose-data" class="common-anchor-header">フェイルオーバーによってデータは失われますか？<button data-href="#Does-failover-lose-data" class="anchor-icon" translate="no">
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
    </button></h3><p>あり得ます。旧プライマリに書き込まれ、スタンバイにまだレプリケートされていないデータは失われる可能性があります。</p>
<h3 id="How-much-data-can-be-lost-during-failover" class="common-anchor-header">フェイルオーバー中にどの程度のデータが失われる可能性がありますか？<button data-href="#How-much-data-can-be-lost-during-failover" class="anchor-icon" translate="no">
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
    </button></h3><p>データ損失の可能性は、プライマリが利用できなくなった時点のCDCラグによって制限されます。</p>
