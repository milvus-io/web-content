---
id: cdc_failover.md
summary: プライマリMilvusクラスタが利用できなくなった場合にフェイルオーバーを実行する方法について説明します。
title: フェイルオーバー
---
<h1 id="Failover" class="common-anchor-header">フェイルオーバー<button data-href="#Failover" class="anchor-icon" translate="no">
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
    </button></h1><p>フェイルオーバーは、元のプライマリが完全に利用できなくなった場合に、スタンバイクラスタをスタンドアロンのプライマリに昇格させます。これは可用性優先の操作であり、障害前にレプリケートされていなかったデータが失われる可能性があります。</p>
<p>このガイドでは、元のトポロジを前提としています：</p>
<pre><code translate="no" class="language-text">cluster-a (primary)  -&gt;  cluster-b (standby)
<button class="copy-code-btn"></button></code></pre>
<p>フェイルオーバー後、<code translate="no">cluster-b</code> はスタンドアロンのプライマリになります：</p>
<pre><code translate="no" class="language-text">cluster-b (primary)
<button class="copy-code-btn"></button></code></pre>
<h2 id="When-to-Use-Failover" class="common-anchor-header">フェイルオーバーを使用するタイミング<button data-href="#When-to-Use-Failover" class="anchor-icon" translate="no">
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
    </button></h2><p>フェイルオーバーは、以下の場合にのみ使用してください：</p>
<ul>
<li>元のプライマリが要求に応答できない。</li>
<li>プライマリを許容時間内に回復できない。</li>
<li>書き込み可用性を回復することの方が、古いプライマリを待つことよりも重要である。</li>
</ul>
<p>プライマリにまだ到達可能な場合は、代わりに<a href="/docs/ja/cdc_switchover.md">スイッチオーバーを</a>使用します。スイッチオーバーにより、データ損失を回避できます。</p>
<h2 id="Data-Loss-Risk" class="common-anchor-header">データ損失のリスク<button data-href="#Data-Loss-Risk" class="anchor-icon" translate="no">
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
    </button></h2><p>フェイルオーバーでは、元のプライマリを待つことはありません。旧プライマリに書き込まれ、スタンバイにまだレプリケートされていないデータは失われる可能性があります。</p>
<p>データ損失の可能性は、プライマリが使用できなくなった時点のCDCラグによって決まります。</p>
<p>フェイルオーバーを実行する前に、トレードオフを理解してください：</p>
<table>
<thead>
<tr><th>目標</th><th>スイッチオーバー</th><th>フェイルオーバー</th></tr>
</thead>
<tbody>
<tr><td>プライマリがアクセスできない間に書き込みをリストアする</td><td>いいえ</td><td>可</td></tr>
<tr><td>データ損失の回避</td><td>可</td><td>保証なし</td></tr>
<tr><td>旧プライマリの応答が必要</td><td>保証なし</td><td>保証しない</td></tr>
</tbody>
</table>
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
    </button></h2><p>以下を確認してください：</p>
<ul>
<li>元のプライマリが使用できない。</li>
<li>プライマリの復旧を待たないことにした。</li>
<li>アプリケーション・トラフィックをスタンバイにリダイレクトできる。</li>
<li>トラフィック・オートメーションが回復しても、古いプライマリに書き込みを送り返さない。</li>
<li>スタンバイ・クラスタID、アドレス、トークン、およびpchannelsを持っている。</li>
</ul>
<p>最も重要な安全要件はスプリットブレインを防ぐことです。フェイルオーバー後、昇格したスタンバイだけがアプリケーションの書き込みを受け付けるようにします。</p>
<h2 id="Build-the-Failover-Configuration" class="common-anchor-header">フェイルオーバー構成の構築<button data-href="#Build-the-Failover-Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>スタンバイ・クラスタのみを含み、レプリケーション・トポロジを含まない構成を構築します。<code translate="no">force_promote=True</code> を設定します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># If you followed Set Up CDC Replication, cluster B is the original target cluster.</span>
cluster_b_id = target_cluster_id
cluster_b_addr = target_cluster_addr
cluster_b_client_addr = target_client_addr
cluster_b_token = target_cluster_token
cluster_b_pchannels = target_cluster_pchannels

failover_config = {
    <span class="hljs-string">&quot;clusters&quot;</span>: [
        {
            <span class="hljs-string">&quot;cluster_id&quot;</span>: cluster_b_id,
            <span class="hljs-string">&quot;connection_param&quot;</span>: {
                <span class="hljs-string">&quot;uri&quot;</span>: cluster_b_addr,
                <span class="hljs-string">&quot;token&quot;</span>: cluster_b_token,
            },
            <span class="hljs-string">&quot;pchannels&quot;</span>: cluster_b_pchannels,
        }
    ],
    <span class="hljs-string">&quot;cross_cluster_topology&quot;</span>: [],
    <span class="hljs-string">&quot;force_promote&quot;</span>: <span class="hljs-literal">True</span>,
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Promote-the-Standby" class="common-anchor-header">スタンバイのプロモート<button data-href="#Promote-the-Standby" class="anchor-icon" translate="no">
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
    </button></h2><p>リクエストをスタンバイ・クラスタに送信します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client_b = MilvusClient(uri=cluster_b_client_addr, token=cluster_b_token)

<span class="hljs-keyword">try</span>:
    client_b.update_replicate_configuration(**failover_config)
<span class="hljs-keyword">finally</span>:
    client_b.close()
<button class="copy-code-btn"></button></code></pre>
<p>要求が成功すると、<code translate="no">cluster-b</code> はスタンドアロンのプライマリになり、書き込みを受け付けることができます。</p>
<h2 id="Redirect-Application-Traffic" class="common-anchor-header">アプリケーション・トラフィックのリダイレクト<button data-href="#Redirect-Application-Traffic" class="anchor-icon" translate="no">
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
    </button></h2><p>昇格後：</p>
<ol>
<li>書き込みトラフィックを<code translate="no">cluster-b</code> にリダイレクトします。</li>
<li>書き込みエンドポイント、ロードバランサー、DNSレコード、および自動化から<code translate="no">cluster-a</code> 。</li>
<li><code translate="no">cluster-b</code> が書き込みを受け付けることを確認する。</li>
<li><code translate="no">cluster-a</code> は、廃止されるか明示的に再構築されるまで隔離しておく。</li>
</ol>
<p>書き込みの検証例：</p>
<pre><code translate="no" class="language-python">client_b = MilvusClient(uri=cluster_b_client_addr, token=cluster_b_token)

<span class="hljs-keyword">try</span>:
    client_b.insert(
        collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
        data=[{<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.1</span>] * <span class="hljs-number">128</span>}],
    )
<span class="hljs-keyword">finally</span>:
    client_b.close()
<button class="copy-code-btn"></button></code></pre>
<p>コレクション名とスキーマフィールドを、デプロイメントに合わせて調整する。</p>
<h2 id="Verify-the-Result" class="common-anchor-header">結果の検証<button data-href="#Verify-the-Result" class="anchor-icon" translate="no">
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
    </button></h2><p>プロモートされたクラスタを直接検証します：</p>
<ul>
<li>書き込みは<code translate="no">cluster-b</code> で成功します。</li>
<li>読み取りは期待されるデータを返します。</li>
<li><code translate="no">cluster-a</code> へのアプリケーション・コンポーネントの書き込みはありません。</li>
</ul>
<h2 id="Handling-the-Old-Primary" class="common-anchor-header">古いプライマリの処理<button data-href="#Handling-the-Old-Primary" class="anchor-icon" translate="no">
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
    </button></h2><p>フェイルオーバー後、<code translate="no">cluster-a</code> をステールとして扱います。再び到達可能になった場合は、アプリケーションの書き込みを送信しないでください。<code translate="no">cluster-b</code> にレプリケー トされなかったデータが含まれている可能性があり、フェイルオーバー後に<code translate="no">cluster-b</code> に新しい書き込みが既に含まれている可能性があります。</p>
<p><code translate="no">cluster-a</code> を古いトポロジーに自動的に再接続しないでください。古いプライマリの再導入は、慎重に計画する必要がある別の復旧作業です。</p>
<h2 id="Minimizing-Data-Loss" class="common-anchor-header">データ損失の最小化<button data-href="#Minimizing-Data-Loss" class="anchor-icon" translate="no">
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
    </button></h2><p>フェイルオーバーによるデータ損失のリスクをすべて取り除くことはできませんが、減らすことはできます：</p>
<ul>
<li>CDCのラグを継続的に監視する。</li>
<li>プライマリの書き込みレートを処理できるようにスタンバイ・クラスタをプロビジョニングしておく。</li>
<li>クロス・クラスタのネットワーク・レイテンシとパケット・ロスを低く抑える。</li>
<li>アプリケーションの書き込みを偶発的なものにする。</li>
<li>フェイルオーバー後に成功が不確実な書き込みを再試行する。</li>
<li>プライマリがまだ応答できる場合は、いつでも切り替えを優先する。</li>
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
    </button></h2><h3 id="Does-failover-always-lose-data" class="common-anchor-header">フェイルオーバーすると必ずデータが失われますか？<button data-href="#Does-failover-always-lose-data" class="anchor-icon" translate="no">
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
    </button></h3><p>いいえ。プライマリに障害が発生する前にすべての書き込みがすでにレプリケートされていた場合、データは失われません。CDCのラグが存在する場合、ラグのあるデータが失われる可能性があります。</p>
<h3 id="How-long-does-failover-take" class="common-anchor-header">フェイルオーバーにはどのくらい時間がかかりますか？<button data-href="#How-long-does-failover-take" class="anchor-icon" translate="no">
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
    </button></h3><p>スタンバイのクラスタ状態と制御プレーンの可用性によりますが、通常は数秒以内に完了します。</p>
<h3 id="Can-I-run-failover-on-the-primary" class="common-anchor-header">プライマリでフェイルオーバーを実行できますか?<button data-href="#Can-I-run-failover-on-the-primary" class="anchor-icon" translate="no">
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
    </button></h3><p>フェイルオーバーはスタンバイクラスタを対象としています。現在のプライマリが利用可能な場合は、スイッチオーバーを使用してください。</p>
<h3 id="Can-the-old-primary-rejoin-automatically" class="common-anchor-header">古いプライマリは自動的に再参加できますか?<button data-href="#Can-the-old-primary-rejoin-automatically" class="anchor-icon" translate="no">
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
    </button></h3><p>いいえ。フェイルオーバー後、古いプライマリが再びレプリケーションに参加できるようになるには、古いプライマリをステールとして扱い、退役させるか再構築する必要があります。</p>
<h3 id="How-do-I-avoid-split-brain" class="common-anchor-header">スプリットブレインを回避するにはどうすればよいですか?<button data-href="#How-do-I-avoid-split-brain" class="anchor-icon" translate="no">
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
    </button></h3><p>昇格したクラスタのみが書き込みを受け取るようにします。復旧してトラフィックを受け付ける前に、すべての書き込みパスから古いプライマリを削除します。</p>
