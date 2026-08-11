---
id: milvus_cdc_overview.md
summary: Milvus CDCは、プライマリ・スタンバイ方式の災害復旧のために、あるMilvusクラスタから別のMilvusクラスタへデータ変更を複製します。
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
    </button></h1><p>Milvus CDC（Change Data Capture）は、あるMilvusクラスターから別のMilvusクラスターへデータ変更をレプリケートします。CDCを使用することで、Milvus向けのプライマリ・スタンバイ型ディザスタリカバリトポロジーを構築できます。</p>
<p>プライマリ・スタンバイ構成では、1つのクラスタがプライマリとして機能し、書き込みを受け付けます。1つ以上のスタンバイクラスタは、プライマリからの変更を継続的に受信し、読み取りトラフィックを処理できます。プライマリクラスタが利用できなくなったり、メンテナンスが必要になった場合は、サービストラフィックをスタンバイクラスタに切り替えることができます。</p>
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
    </button></h2><p>一般的なトポロジーには以下が含まれます：</p>
<ul>
<li><strong>プライマリ・クラスタ</strong>：レプリケーションのソースとなるクラスタです。読み取りおよび書き込みを受け付けます。</li>
<li><strong>スタンバイクラスタ</strong>：レプリケーションのターゲットクラスタです。プライマリから変更を受け取り、スタンバイ状態にある間は読み取り専用となります。</li>
<li><strong>CDC ノード</strong>：現在のプライマリからスタンバイクラスタへ WAL の変更を転送する Milvus コンポーネントです。スイッチオーバーまたはフェイルオーバー後にプライマリとなる可能性のある各クラスタに CDC をデプロイします。</li>
<li><strong>レプリケーション・トポロジー</strong>：クラスタA → クラスタB など、設定された送信元から宛先への関係。
以下に、このトポロジーの図を示します。<span class="img-wrapper">

  
   <img translate="no" src="/docs/v3.0.x/assets/cdc-overview.png" alt="CDC workflow" class="doc-image" id="cdc-workflow" /> 
 <span>   CDCワークフロー</span>
  
 </span></li>
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
    </button></h3><p>最も一般的なCDCの展開形態は、プライマリ1つとスタンバイ1つです：</p>
<pre><code translate="no" class="language-text">Application writes
      |
      v
Primary cluster A  -- CDC replication --&gt;  Standby cluster B
<button class="copy-code-btn"></button></code></pre>
<p>Milvus CDC は、プライマリが 1 つ、スタンバイが複数あるトポロジーもサポートしています：</p>
<pre><code translate="no" class="language-text">Primary cluster A  -- CDC replication --&gt;  Standby cluster B
                  \-- CDC replication --&gt;  Standby cluster C
<button class="copy-code-btn"></button></code></pre>
<p>Milvus CDCは、2つ以上のクラスタが同時に書き込みトラフィックを受け入れるマルチプライマリまたはアクティブ-アクティブ構成には対応していません。</p>
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
<tr><th>役割</th><th>読み取り</th><th>書き込み</th><th>レプリケーションの動作</th></tr>
</thead>
<tbody>
<tr><td>プライマリ</td><td>はい</td><td>はい</td><td>変更内容をスタンバイクラスタに送信する</td></tr>
<tr><td>スタンバイ</td><td>はい</td><td>いいえ</td><td>プライマリからレプリケートされた変更を受信します</td></tr>
</tbody>
</table>
<p>スタンバイクラスタは、直接の書き込み要求を拒否します。これにより、スプリットブレインを防止し、レプリケーショントポロジの一貫性を維持します。</p>
<h2 id="Planned-Switchover-vs-Failover" class="common-anchor-header">計画的な切り替えとフェイルオーバー<button data-href="#Planned-Switchover-vs-Failover" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus CDCでは、現在のプライマリからスタンバイクラスタへサービストラフィックを移行する2つの方法を提供しています。</p>
<table>
<thead>
<tr><th>操作</th><th>以下の場合に使用</th><th>データ損失</th><th>想定される動作</th></tr>
</thead>
<tbody>
<tr><td><strong><a href="/docs/ja/cdc_switchover.md">切り替え</a></strong></td><td>現在のプライマリにまだ接続できる場合、または計画的なメンテナンスを行っている場合</td><td>RPO = 0</td><td>ロール変更前に、残りのレプリケートされたデータが到着するのを待機する</td></tr>
<tr><td><strong><a href="/docs/ja/cdc_failover.md">フェイルオーバー</a></strong></td><td>現在のプライマリが利用不能であり、迅速に復旧できない場合</td><td>可能</td><td>スタンバイを直ちにプライマリに昇格させ、書き込みを再開できるようにする</td></tr>
</tbody>
</table>
<p>現在のプライマリがまだ応答可能な場合は、常にスイッチオーバーを使用してください。フェイルオーバーは、元のプライマリを待つことよりも可用性の回復が優先される場合にのみ使用してください。</p>
<h2 id="CDC-Lag-and-Why-It-Matters" class="common-anchor-header">CDCの遅延とその重要性<button data-href="#CDC-Lag-and-Why-It-Matters" class="anchor-icon" translate="no">
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
    </button></h2><p>CDCラグとは、プライマリクラスタに書き込まれたものの、まだスタンバイクラスタに適用されていないデータの量のことです。</p>
<p>CDCラグは、以下の両方の復旧オプションに影響を与えます：</p>
<ul>
<li>スイッチオーバー中、CDCラグが小さいほど、通常は操作がより早く完了します。</li>
<li>フェイルオーバー時には、CDCラグは、元のプライマリが利用できない場合に失われる可能性のあるデータの範囲を表します。</li>
</ul>
<p>CDCラグは継続的に監視し、可能な限り低く抑える必要があります。「<a href="/docs/ja/set_up_cdc_replication.md">CDCレプリケーションの設定」</a>ページには、CDCラグを推定するためのPromQLの例が掲載されています。</p>
<h2 id="Bulk-Import-in-CDC-Replication" class="common-anchor-header">CDCレプリケーションにおける一括インポート<button data-href="#Bulk-Import-in-CDC-Replication" class="anchor-icon" translate="no">
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
    </button></h2><p>CDCレプリケーションのトポロジでは、一括インポートでは<code translate="no">auto_commit=false</code> を使用した2フェーズコミット（2PC）モードを使用する必要があります。インポートとコミットはプライマリクラスタに対してのみ実行し、インポートファイルがプライマリクラスタとスタンバイクラスタの両方で利用可能であることを確認してください。詳細については、<a href="/docs/ja/bulk-import-in-cdc-replication.md">「CDCレプリケーションにおける一括インポート</a>」を参照してください。</p>
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
    </button></h2><p>Milvus CDCには現在、以下の制限があります。</p>
<ul>
<li><strong>シングルプライマリトポロジ</strong>のみをサポートしています。</li>
<li>アクティブ-アクティブまたはマルチプライマリ書き込みはサポートされて<strong>いません</strong>。</li>
<li>スタンバイクラスタは読み取りトラフィックを処理できますが、スタンバイ状態にある間は直接書き込みを拒否します。</li>
<li>フェイルオーバーの際、旧プライマリに書き込まれたものの、まだスタンバイにレプリケートされていないデータが失われる可能性があります。</li>
<li>設定された<code translate="no">pchannels</code> は、各クラスタの実際のチャネルレイアウトと一致している必要があります。</li>
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
    </button></h2><h3 id="Can-a-standby-cluster-serve-queries" class="common-anchor-header">スタンバイクラスタはクエリを処理できますか？<button data-href="#Can-a-standby-cluster-serve-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>はい。スタンバイクラスタは読み取りトラフィックを処理できます。プライマリになるまでは、書き込みを受け付けることはできません。</p>
<h3 id="Does-Milvus-CDC-support-active-active-writes" class="common-anchor-header">Milvus CDCはアクティブ-アクティブ書き込みをサポートしていますか？<button data-href="#Does-Milvus-CDC-support-active-active-writes" class="anchor-icon" translate="no">
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
    </button></h3><p>いいえ。Milvus CDCはシングルプライマリトポロジー向けに設計されています。複数のクラスタへの同時書き込みは、スプリットブレインやデータの不整合を引き起こす可能性があります。</p>
<h3 id="Does-switchover-lose-data" class="common-anchor-header">スイッチオーバー時にデータは失われますか？<button data-href="#Does-switchover-lose-data" class="anchor-icon" translate="no">
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
    </button></h3><p>いいえ。スイッチオーバーでは、スタンバイがプライマリになる前に、残りのデータがレプリケートされるのを待ちます。</p>
<h3 id="Does-failover-lose-data" class="common-anchor-header">フェイルオーバー時にデータは失われますか？<button data-href="#Does-failover-lose-data" class="anchor-icon" translate="no">
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
    </button></h3><p>その可能性があります。旧プライマリに書き込まれたものの、まだスタンバイにレプリケートされていないデータは失われる可能性があります。</p>
<h3 id="How-much-data-can-be-lost-during-failover" class="common-anchor-header">フェイルオーバー中に失われる可能性のあるデータの量はどれくらいですか？<button data-href="#How-much-data-can-be-lost-during-failover" class="anchor-icon" translate="no">
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
    </button></h3><p>潜在的なデータ損失量は、プライマリが利用不能になった時点でのCDCの遅延によって制限されます。</p>
