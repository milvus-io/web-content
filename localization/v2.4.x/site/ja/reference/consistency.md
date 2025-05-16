---
id: consistency.md
summary: Milvusの4つの一貫性レベルについて学ぶ。
title: 一貫性
---

<h1 id="Consistency" class="common-anchor-header">一貫性<button data-href="#Consistency" class="anchor-icon" translate="no">
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
    </button></h1><p>このトピックでは、Milvusにおける4つの一貫性のレベルと、それらに最適なシナリオを紹介します。また、Milvusにおける一貫性確保のメカニズムについても説明します。</p>
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
    </button></h2><p>分散データベースにおける一貫性とは、特にデータの書き込みまたは読み出し時に、すべてのノードまたはレプリカが同じデータのビューを持つことを保証する特性を指します。</p>
<p>Milvusは、strong、bounded staleness、session、enduallyの4つの一貫性レベルをサポートしています。Milvusのデフォルトの一貫性レベルはbounded stalenessです。 <a href="/docs/ja/v2.4.x/single-vector-search.md">単一ベクトル検索</a>、<a href="/docs/ja/v2.4.x/multi-vector-search.md">ハイブリッド検索</a>、<a href="/docs/ja/v2.4.x/get-and-scalar-query.md">クエリを</a>実行する際に一貫性レベルを簡単に調整し、アプリケーションに最適なものにすることができます。</p>
<h2 id="Consistency-levels" class="common-anchor-header">一貫性レベル<button data-href="#Consistency-levels" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://en.wikipedia.org/wiki/PACELC_theorem">PACELCの</a>定理で定義されているように、分散データベースは一貫性、可用性、レイテンシの間でトレードオフを行う必要があります。高い一貫性は高い精度と高い検索レイテンシーを意味し、低い一貫性は速い検索速度をもたらしますが、データの可視性はある程度失われます。したがって、異なる一貫性レベルは異なるシナリオに適している。</p>
<p>以下では、Milvusがサポートする4つの一貫性レベルの違いと、それぞれが適合するシナリオについて説明する。</p>
<h3 id="Strong" class="common-anchor-header">強力</h3><p>Strongは最も高く、最も厳格な一貫性レベルです。ユーザが最新バージョンのデータを読めることを保証します。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Consistency_Strong.png" alt="Strong consistency" class="doc-image" id="strong-consistency" />
   </span> <span class="img-wrapper"> <span>強力な一貫性</span> </span></p>
<p>PACELCの定理によると、一貫性レベルをstrongに設定すると、レイテンシが増加します。したがって、テスト結果の正確性を保証するために、機能テストでは強い一貫性を選択することを推奨します。強い一貫性は、検索速度を犠牲にしてもデータの一貫性を厳しく要求するアプリケーションにも最適です。例えば、注文の支払いや請求に対応するオンライン金融システムなどです。</p>
<h3 id="Bounded-staleness" class="common-anchor-header">境界的陳腐性</h3><p>Bounded stalenessは、その名が示すように、ある一定期間のデータの一貫性のなさを許容する。しかし一般的に、その期間外ではデータは常にグローバルに一貫している。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Consistency_Bounded.png" alt="Bounded staleness consistency" class="doc-image" id="bounded-staleness-consistency" />
   </span> <span class="img-wrapper"> <span>バウンデッド・スタルネスの一貫性</span> </span></p>
<p>Bounded stalenessは、検索レイテンシを制御する必要があり、散発的なデータの不可視性を許容できるシナリオに適している。例えば、ビデオ推薦エンジンのような推薦システムにおいて、データの不可視性は全体的な想起率への影響は小さいが、推薦システムの性能を大幅に向上させることがある。</p>
<h3 id="Session" class="common-anchor-header">セッション</h3><p>セッションは、すべてのデータの書き込みが同じセッション中の読み込みで即座に認識できることを保証します。言い換えれば、あるクライアントを介してデータを書き込むと、新しく挿入されたデータは即座に検索可能になります。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Consistency_Session.png" alt="Session consistency" class="doc-image" id="session-consistency" />
   </span> <span class="img-wrapper"> <span>セッション一貫性</span> </span></p>
<p>同一セッション内でのデータの一貫性に対する要求が高いシナリオでは、一貫性レベルとしてセッションを選択することをお勧めします。例えば、図書館システムから本のエントリーのデータを削除し、削除を確認してページを更新（別のセッション）すると、その本は検索結果に表示されなくなります。</p>
<h3 id="Eventually" class="common-anchor-header">結局</h3><p>読み込みと書き込みの順序は保証されておらず、それ以上書き込み操作が行われなければ、レプリカは最終的に同じ状態に収束します。最終的に &quot;の一貫性の下では、レプリカは最新の更新された値で読み取り要求の処理を開始します。最終的一貫性は、4つの中で最も弱いレベルである。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Consistency_Eventual.png" alt="Eventual consistency" class="doc-image" id="eventual-consistency" />
   </span> <span class="img-wrapper"> <span>最終的一貫性</span> </span></p>
<p>しかし、PACELCの定理によれば、一貫性を犠牲にすることで、検索レイテンシを驚異的に短縮することができる。従って、最終的一貫性は、データの一貫性はあまり要求されないが、高速な検索性能が要求されるシナリオに最適である。例えば、Amazonの商品のレビューや評価を、最終的に一貫性のあるレベルで検索することができます。</p>
<h2 id="Guarantee-timestamp" class="common-anchor-header">タイムスタンプの保証<button data-href="#Guarantee-timestamp" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusは<a href="https://github.com/milvus-io/milvus/blob/f3f46d3bb2dcae2de0bdb7bc0f7b20a72efceaab/docs/developer_guides/how-guarantee-ts-works.md">Guarantee timestamp</a>(GuaranteeTs)を導入することで、異なる一貫性レベルを実現しています。</p>
<p>GuaranteeTsは、GuaranteeTs以前のすべてのデータがクエリノードによって見られるようになるまで、検索またはクエリ要求が実行されないことをクエリノードに通知する役割を果たします。整合性レベルを指定すると、整合性レベルは特定の GuaranteeTs 値に対応付けられます。異なる GuaranteeTs 値は、異なる整合性レベルに対応します：</p>
<ul>
<li><p><strong>Strong</strong>：GuaranteeTsは最新のシステム・タイムスタンプと同一に設定され、クエリ・ノードは検索またはクエリ・リクエストを処理する前に、最新のシステム・タイムスタンプより前のデータがすべて見えるようになるまで待ちます。</p></li>
<li><p><strong>制約のある陳腐化</strong>：GuaranteeTsは最新のシステムタイムスタンプよりも相対的に小さく設定され、クエリノードは許容範囲内の更新の少ないデータビューを検索する。</p></li>
<li><p><strong>セッション</strong>：クライアントは最新の書き込み操作のタイムスタンプをGuaranteeTsとして使用し、各クライアントは少なくとも同じクライアントが挿入したデータを取得できるようにする。</p></li>
<li><p><strong>最終的には</strong>整合性チェックをスキップするため、GuaranteeTsは非常に小さな値に設定される。クエリ・ノードは既存のデータ・ビューを直ちに検索します。</p></li>
</ul>
<p>Milvusの様々なレベルの一貫性を保証する仕組みの詳細については、<a href="https://github.com/milvus-io/milvus/blob/f3f46d3bb2dcae2de0bdb7bc0f7b20a72efceaab/docs/developer_guides/how-guarantee-ts-works.md">GuaranteeTsの仕組みを</a>参照してください。</p>
<h2 id="Whats-next" class="common-anchor-header">次のステップ<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>一貫性レベルの調整方法について説明します：<ul>
<li><a href="/docs/ja/v2.4.x/single-vector-search.md">単一ベクトル検索</a></li>
<li><a href="/docs/ja/v2.4.x/multi-vector-search.md">ハイブリッド検索</a></li>
<li><a href="/docs/ja/v2.4.x/get-and-scalar-query.md">スカラ検索を行う</a></li>
</ul></li>
</ul>
