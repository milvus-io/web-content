---
id: time_sync.md
title: 時間同期
summary: Milvusの時間同期システムについて学ぶ。
---
<h1 id="Time-Synchronization" class="common-anchor-header">時刻同期<button data-href="#Time-Synchronization" class="anchor-icon" translate="no">
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
    </button></h1><p>このトピックでは、Milvusの時刻同期メカニズムについて紹介します。</p>
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
    </button></h2><p>Milvusのイベントは一般的に2つのタイプに分類することができます：</p>
<ul>
<li><p>データ定義言語 (DDL) イベント: コレクションの作成/削除、パーティションの作成/削除など。</p></li>
<li><p>データ操作言語(DML)イベント: 挿入、検索など。</p></li>
</ul>
<p>DDLイベントであれDMLイベントであれ、どのイベントにも、このイベントがいつ発生したかを示すタイムスタンプが付けられます。</p>
<p>Milvus の一連の DML および DDL イベントを以下の表に示す時間順で開始する 2 人のユーザがいるとします。</p>
<table>
<thead>
<tr><th style="text-align:center">タイムスタンプ</th><th style="text-align:center">ユーザ 1</th><th style="text-align:center">ユーザ 2</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">t0</td><td style="text-align:center"><code translate="no">C0</code> という名前のコレクションを作成した。</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t2</td><td style="text-align:center">/</td><td style="text-align:center">コレクション<code translate="no">C0</code> を検索。</td></tr>
<tr><td style="text-align:center">t5</td><td style="text-align:center">データ<code translate="no">A1</code> をコレクションに挿入<code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t7</td><td style="text-align:center">/</td><td style="text-align:center">コレクション<code translate="no">C0</code> を検索。</td></tr>
<tr><td style="text-align:center">t10</td><td style="text-align:center">データ<code translate="no">A2</code> をコレクションに挿入<code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t12</td><td style="text-align:center">/</td><td style="text-align:center">コレクションを検索<code translate="no">C0</code></td></tr>
<tr><td style="text-align:center">t15</td><td style="text-align:center">コレクションからデータ<code translate="no">A1</code> を削除<code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t17</td><td style="text-align:center">/</td><td style="text-align:center">コレクションを検索<code translate="no">C0</code></td></tr>
</tbody>
</table>
<p>理想的には、ユーザー2は以下を見ることができる：</p>
<ul>
<li><p>空のコレクション<code translate="no">C0</code> at<code translate="no">t2</code>.</p></li>
<li><p><code translate="no">t7</code> にあるデータ<code translate="no">A1</code> 。</p></li>
<li><p><code translate="no">t12</code> のデータ<code translate="no">A1</code> と<code translate="no">A2</code> の両方。</p></li>
<li><p><code translate="no">t17</code> のデータ<code translate="no">A2</code> のみ（この時点より前に、データ<code translate="no">A1</code> がコレクションから削除されているため）。</p></li>
</ul>
<p>この理想的なシナリオは、ノードが1つしかない場合には容易に達成できる。しかし、Milvusは分散ベクタデータベースであり、異なるノードにおけるすべてのDMLおよびDDL操作が整然と保たれるように、Milvusは以下の2つの問題に対処する必要がある：</p>
<ol>
<li><p>上の例の2人のユーザが異なるノードにいる場合、タイムクロックが異なります。例えば、ユーザ 2 がユーザ 1 より 24 時間遅れている場合、ユーザ 1 によるすべての操作は翌日までユーザ 2 には見えません。</p></li>
<li><p>ネットワーク遅延が発生する可能性もあります。ユーザ2がコレクション<code translate="no">C0</code> 、<code translate="no">t17</code> で検索を行った場合、Milvusは<code translate="no">t17</code> 以前のすべての操作が正常に処理され完了することを保証できるはずです。<code translate="no">t15</code> での削除操作がネットワーク遅延のために遅延した場合、ユーザ2が<code translate="no">t17</code> で検索を行う際に、削除されたはずのデータ<code translate="no">A1</code> をまだ見ることができる可能性が非常に高い。</p></li>
</ol>
<p>そこでMilvusでは、この問題を解決するために時刻同期システム（timetick）を採用している。</p>
<h2 id="Timestamp-oracle-TSO" class="common-anchor-header">タイムスタンプ・オラクル（TSO）<button data-href="#Timestamp-oracle-TSO" class="anchor-icon" translate="no">
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
    </button></h2><p>前節で述べた最初の問題を解決するために、Milvusは他の分散システム同様、タイムスタンプオラクル（TSO）サービスを提供している。つまり、Milvusのすべてのイベントはローカルクロックからではなく、TSOからのタイムスタンプで割り当てられなければならない。</p>
<p>TSOサービスはMilvusのルートコーディネーターによって提供される。クライアントは1つのタイムスタンプ割り当てリクエストで1つ以上のタイムスタンプを割り当てることができます。</p>
<p>TSOタイムスタンプは物理的な部分と論理的な部分で構成される<code translate="no">uint64</code> 。下図はタイムスタンプのフォーマットを示している。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/TSO_Timestamp.png" alt="TSO_Timestamp" class="doc-image" id="tso_timestamp" />
   </span> <span class="img-wrapper"> <span>TSO_Timestamp</span>。 </span></p>
<p>図示されているように、先頭の46ビットは物理的な部分、すなわちミリ秒単位のUTC時間である。最後の18ビットは論理部分である。</p>
<h2 id="Time-synchronization-system-timetick" class="common-anchor-header">時刻同期システム（timetick）<button data-href="#Time-synchronization-system-timetick" class="anchor-icon" translate="no">
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
    </button></h2><p>ここではデータ挿入操作を例に、Milvusの時刻同期機構を説明する。</p>
<p>プロキシはSDKからデータ挿入要求を受け取ると、主キーのハッシュ値に従って挿入メッセージを異なるメッセージストリーム(<code translate="no">MsgStream</code>)に分割する。</p>
<p>各挿入メッセージ(<code translate="no">InsertMsg</code>)は<code translate="no">MsgStream</code> に送信される前にタイムスタンプが割り当てられる。</p>
<div class="alert note">
  <code translate="no">MsgStream</code> はメッセージ・キューのラッパーであり、Milvus 2.0ではデフォルトでPulsarとなっている。</div>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/timesync_proxy_insert_msg.png" alt="timesync_proxy_insert_msg" class="doc-image" id="timesync_proxy_insert_msg" />
   </span> <span class="img-wrapper"> <span>timesync_proxy_insert_msg</span> </span></p>
<p>一般的な原則の1つは、<code translate="no">MsgStream</code> 、同じプロキシからの<code translate="no">InsertMsgs</code> のタイムスタンプはインクリメンタルでなければならないということである。しかし、異なるプロキシからの<code translate="no">InsertMsgs</code> のタイムスタンプにはそのようなルールはない。</p>
<p>以下の図は、<code translate="no">MsgStream</code> の中の<code translate="no">InsertMsgs</code> の例である。このスニペットには5つの<code translate="no">InsertMsgs</code> が含まれ、そのうちの3つは<code translate="no">Proxy1</code> からのもので、残りは<code translate="no">Proxy2</code> からのものである。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/msgstream.png" alt="msgstream" class="doc-image" id="msgstream" />
   </span> <span class="img-wrapper"> <span>msgstream</span> </span></p>
<p><code translate="no">Proxy1</code> からの3つの<code translate="no">InsertMsgs</code> のタイムスタンプはインクリメンタルであり、<code translate="no">Proxy2</code> からの2つの<code translate="no">InsertMsgs</code> もインクリメンタルである。しかし、<code translate="no">Proxy1</code> と<code translate="no">Proxy2</code> <code translate="no">InsertMsgs</code> の間には特定の順序はない。</p>
<p>考えられるシナリオとしては、<code translate="no">Proxy2</code> からのタイムスタンプ<code translate="no">110</code> のメッセージを読むときに、<code translate="no">Proxy1</code> からのタイムスタンプ<code translate="no">80</code> のメッセージがまだ<code translate="no">MsgStream</code> の中にあることをMilvusが発見することです。したがって、Milvusは、<code translate="no">MsgStream</code> からのメッセージを読むときに、タイムスタンプ値の小さいメッセージはすべて消費されなければならないことを保証するために、timetickという時間同期システムを導入しています。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/time_synchronization.png" alt="time_synchronization" class="doc-image" id="time_synchronization" />
   </span> <span class="img-wrapper"> <span>時間同期</span> </span></p>
<p>上の図に示すように</p>
<ul>
<li><p>各プロキシは、定期的(デフォルトでは200ミリ秒ごと)に、<code translate="no">MsgStream</code>の最新の<code translate="no">InsertMsg</code> の最大のタイムスタンプ値をroot coordに報告する。</p></li>
<li><p>ルートコーデ ィックは、<code translate="no">InsertMsgs</code> がどのプロキシに属していても、この<code translate="no">Msgstream</code> の最小タイムスタンプ値を特定する。それからルートコーデ ィックは、この最小タイムスタンプを<code translate="no">Msgstream</code> 。 このタイムスタンプはtimetickとも呼ばれる。</p></li>
<li><p>コンシューマーコンポーネントがルートコー ディネートによって挿入されたタイムスティックを読むとき、コンシューマー コンポーネントは、より小さいタイムスタンプ値を持つすべての挿入メッセー ジが消費されたことを理解する。したがって、関連するリクエストは、オー ダーを中断することなく安全に実行できる。</p></li>
</ul>
<p>以下の図は、タイムティックが挿入された<code translate="no">Msgstream</code> の例である。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/timetick.png" alt="timetick" class="doc-image" id="timetick" />
   </span> <span class="img-wrapper"> <span>タイムティック</span> </span></p>
<p><code translate="no">MsgStream</code> は、出力メッセージがタイムスタンプの要件を満たすように、タイムティックに従ってバッチでメッセージを処理します。</p>
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
<li><a href="/docs/ja/v2.4.x/timestamp.md">タイムスタンプの</a>概念について学ぶ。</li>
<li>Milvusの<a href="/docs/ja/v2.4.x/data_processing.md">データ処理ワークフローについて</a>学ぶ。</li>
</ul>
