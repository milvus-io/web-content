---
id: timestamp.md
title: Milvusでのタイムスタンプ
summary: タイムスタンプの概念と、Milvusベクトルデータベースにおけるタイムスタンプ関連の4つの主なパラメータについて学びます。
---
<h1 id="Timestamp" class="common-anchor-header">タイムスタンプ<button data-href="#Timestamp" class="anchor-icon" translate="no">
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
    </button></h1><p>このトピックでは、タイムスタンプの概念を説明し、Milvusベクトルデータベースの4つの主要なタイムスタンプ関連パラメータを紹介します。</p>
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
    </button></h2><p>Milvusは非構造化データから変換されたベクトルを検索・照会できるベクトルデータベースです。<a href="https://milvus.io/docs/v2.1.x/data_processing.md">データの挿入や削除を</a>含むデータ操作言語 (DML) 操作を行う際、Milvus は操作に関与するエンティティにタイムスタンプを割り当てます。したがって、Milvusのすべてのエンティティはタイムスタンプ属性を持っている。また、同じDML操作のエンティティのバッチは同じタイムスタンプ値を共有します。</p>
<h2 id="Timestamp-parameters" class="common-anchor-header">タイムスタンプパラメータ<button data-href="#Timestamp-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusでベクトル類似検索やクエリを実行する場合、いくつかのタイムスタンプ関連パラメータが関係します。</p>
<ul>
<li><p><code translate="no">Guarantee_timestamp</code></p></li>
<li><p><code translate="no">Service_timestamp</code></p></li>
<li><p><code translate="no">Graceful_time</code></p></li>
<li><p><code translate="no">Travel_timestamp</code></p></li>
</ul>
<h3 id="Guaranteetimestamp" class="common-anchor-header"><code translate="no">Guarantee_timestamp</code></h3><p><code translate="no">Guarantee_timestamp</code> はタイムスタンプの一種で、 より前の DML 操作によるすべてのデータ更新がベクトル類似性検索またはクエリの実行時に表示されるようにするために使用されます。例えば、午後3時にデータのバッチを挿入し、午後5時に別のバッチを挿入した場合、ベクトルの類似性検索中に の値が午後6時に設定されます。これは、それぞれ午後3時と午後5時に挿入された2つのデータバッチが検索に関与することを意味する。<code translate="no">Guarantee_timestamp</code> <code translate="no">Guarantee_timestamp</code> </p>
<p><code translate="no">Guarantee_timestamp</code> が設定されていない場合、Milvus は検索要求がなされた時点を自動的に採用する。従って、検索は検索前のDML操作により全てのデータが更新されたデータビューに対して行われます。</p>
<p>Milvus内部で<a href="https://github.com/milvus-io/milvus/blob/master/docs/design_docs/20211214-milvus_hybrid_ts.md">TSOを</a>理解する手間を省くため、ユーザーとして<code translate="no">Guarantee_timestamp</code> パラメータを直接設定する必要はありません。<a href="https://milvus.io/docs/v2.1.x/consistency.md">一貫性レベルを</a>選択するだけで、Milvusは自動的に<code translate="no">Guarantee_timestamp</code> パラメータを処理します。各整合性レベルは特定の<code translate="no">Guarantee_timestamp</code> 値に対応しています。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Guarantee_Timestamp.png" alt="Guarantee_Timestamp" class="doc-image" id="guarantee_timestamp" />
   </span> <span class="img-wrapper"> <span>Guarantee_Timestamp</span>. </span></p>
<h4 id="Example" class="common-anchor-header">例</h4><p>上の図に示すように、<code translate="no">Guarantee_timestamp</code> の値を<code translate="no">2021-08-26T18:15:00</code> と設定します（簡単のため、この例ではタイムスタンプを物理時間で表しています）。検索またはクエリを実行すると、2021-08-26T18:15:00 より前のすべてのデータが検索またはクエリされます。</p>
<h3 id="Servicetimestamp" class="common-anchor-header"><code translate="no">Service_timestamp</code></h3><p><code translate="no">Service_timestamp</code> はMilvusのクエリノードが自動的に生成・管理するタイムスタンプの一種です。どのDML操作がクエリノードによって実行されるかを示すために使用されます。</p>
<p>クエリノードが管理するデータは2種類に分類されます：</p>
<ul>
<li><p>履歴データ（バッチデータとも呼ばれる）</p></li>
<li><p>インクリメンタルデータ（ストリーミングデータとも呼ばれる）。</p></li>
</ul>
<p>Milvusでは、検索やクエリを実行する前にデータをロードする必要があります。そのため、コレクション内のバッチデータは検索やクエリ要求が行われる前にクエリノードによってロードされます。しかし、ストリーミング・データはオンザフライでMilvusに挿入またはMilvusから削除されるため、クエリ・ノードはDML操作と検索またはクエリ要求のタイムラインを保持する必要があります。その結果、クエリノードは<code translate="no">Service_timestamp</code> 、そのようなタイムラインを保持するために使用します。<code translate="no">Service_timestamp</code> は、クエリノードが<code translate="no">Service_timestamp</code> 以前のすべてのDML操作が完了していることを確認できるため、特定のデータが表示される時点とみなすことができます。</p>
<p>検索またはクエリ要求が来ると、クエリノードは<code translate="no">Service_timestamp</code> と<code translate="no">Guarantee_timestamp</code> の値を比較する。主に2つのシナリオがある。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Service_Timestamp.png" alt="Service_Timestamp" class="doc-image" id="service_timestamp" />
   </span> <span class="img-wrapper"> <span>Service_Timestamp</span>. </span></p>
<h4 id="Scenario-1-Servicetimestamp--Guaranteetimestamp" class="common-anchor-header">シナリオ1：<code translate="no">Service_timestamp</code> &gt;=<code translate="no">Guarantee_timestamp</code></h4><p>図1に示すように、<code translate="no">Guarantee_timestamp</code> の値は<code translate="no">2021-08-26T18:15:00</code> として設定される。<code translate="no">Service_timestamp</code> の値が<code translate="no">2021-08-26T18:15:01</code> に成長すると、<code translate="no">Guarantee_timestamp</code> で示される時刻より前の DML 操作を含め、この時点より前のすべての DML 操作がクエリ・ノードによって実行され、完了することを意味します。その結果、検索またはクエリ要求は即座に実行できる。</p>
<h4 id="Scenario-2-Servicetimestamp--Guaranteetimestamp" class="common-anchor-header">シナリオ2:<code translate="no">Service_timestamp</code> &lt;<code translate="no">Guarantee_timestamp</code></h4><p>図2に示すように、<code translate="no">Guarantee_timestamp</code> の値は<code translate="no">2021-08-26T18:15:00</code> に設定され、<code translate="no">Service_timestamp</code> の現在の値は<code translate="no">2021-08-26T18:14:55</code> のみである。これは、<code translate="no">2021-08-26T18:14:55</code> より前の DML オペレーションのみが実行され完了することを意味し、この時点より後、<code translate="no">Guarantee_timestamp</code> より前の DML オペレーションの一部は未完了のままである。この時点で検索やクエリを実行すると、必要なデータの一部が不可視でまだ利用できないため、検索やクエリの結果の精度に深刻な影響を与える。したがって、クエリ・ノードは<code translate="no">guarantee_timestamp</code> の前のDML操作が完了するまで（つまり、<code translate="no">Service_timestamp</code> &gt;=<code translate="no">Guarantee_timestamp</code> ）、検索やクエリの要求を延期する必要があります。</p>
<h3 id="Gracefultime" class="common-anchor-header"><code translate="no">Graceful_time</code></h3><p>技術的に言えば、<code translate="no">Graceful_time</code> はタイムスタンプではなく、期間（例えば100ms）である。しかし、<code translate="no">Graceful_time</code> は<code translate="no">Guarantee_timestamp</code> と<code translate="no">Service_timestamp</code> に強く関連しているため、言及する価値がある。<code translate="no">Graceful_time</code> はMilvus設定ファイルで設定可能なパラメータである。これは特定のデータが表示されるまでに許容できる時間を示すために使用されます。つまり、<code translate="no">Graceful_time</code> 中の未完了の DML 操作は許容されます。</p>
<p>検索またはクエリ要求があった場合、2つのシナリオが考えられます。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Graceful_Time.png" alt="Graceful_Time" class="doc-image" id="graceful_time" />
   </span> <span class="img-wrapper"> <span>Graceful_Time</span>. </span></p>
<h4 id="Scenario-1-Servicetimestamp--+--Gracefultime--Guaranteetimestamp" class="common-anchor-header">シナリオ1：<code translate="no">Service_timestamp</code> +<code translate="no">Graceful_time</code> &gt;=<code translate="no">Guarantee_timestamp</code></h4><p>図1に示すように、<code translate="no">Guarantee_timestamp</code> の値を<code translate="no">2021-08-26T18:15:01</code> とし、<code translate="no">Graceful_time</code> の値を<code translate="no">2s</code> とする。<code translate="no">Service_timestamp</code> <code translate="no">2021-08-26T18:15:00</code> <code translate="no">Service_timestamp</code> の値は の値よりまだ小さく、 より前のすべての DML 操作が完了したわけではありませんが、 の値で示されるように、2 秒間のデータ不可視期間が許容されます。したがって、入力された検索またはクエリ要求は直ちに実行することができます。<code translate="no">Guarantee_timestamp</code> <code translate="no">2021-08-26T18:15:01</code> <code translate="no">Graceful_time</code></p>
<h4 id="Scenario-2-Servicetimestamp--+--Gracefultime--Guaranteetimestamp" class="common-anchor-header">シナリオ2:<code translate="no">Service_timestamp</code> +<code translate="no">Graceful_time</code> &lt;<code translate="no">Guarantee_timestamp</code></h4><p>図2に示すように、<code translate="no">Guarantee_timestamp</code> の値は<code translate="no">2021-08-26T18:15:01</code> として設定され、<code translate="no">Graceful_time</code> は<code translate="no">2s</code> として設定される。<code translate="no">Service_timestamp</code> <code translate="no">2021-08-26T18:14:54</code>これは、期待されるDML操作がまだ完了していないことを意味し、2秒の猶予時間を考慮しても、データの不可視化はまだ耐えられない。したがって、クエリーノードは特定のDML要求が完了するまで（すなわち、<code translate="no">Service_timestamp</code> +<code translate="no">Graceful_time</code> &gt;=<code translate="no">Guarantee_timestamp</code> ）、検索またはクエリー要求を延期する必要があります。</p>
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
<li><a href="/docs/ja/v2.4.x/consistency.md">ギャランティ・タイムスタンプがMilvusで</a>どのように<a href="/docs/ja/v2.4.x/consistency.md">調整可能な一貫性を実現</a>するかを学ぶ。</li>
</ul>
