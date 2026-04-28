---
id: best-practices-for-tiered-storage.md
title: 階層型ストレージのベストプラクティスCompatible with Milvus 2.6.4+
summary: >-
  MilvusはTiered
  Storageを提供し、クエリのレイテンシ、容量、リソース使用量のバランスをとりながら、大規模データを効率的に処理することを支援します。このガイドでは、典型的なワークロードに対する推奨構成をまとめ、各チューニング戦略の背景となる理由を説明します。
beta: Milvus 2.6.4+
---
<h1 id="Best-Practices-for-Tiered-Storage" class="common-anchor-header">階層型ストレージのベストプラクティス<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Best-Practices-for-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusは、クエリのレイテンシ、容量、リソース使用量のバランスをとりながら、大規模データを効率的に処理するためのTiered Storageを提供します。このガイドでは、典型的なワークロードに対する推奨構成をまとめ、各チューニング戦略の背景となる理由を説明します。</p>
<h2 id="Before-you-start" class="common-anchor-header">始める前に<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
<li><p>Milvus v2.6.4以降であること。</p></li>
<li><p>QueryNodeは専用のローカルリソース（メモリとディスク）を持つ必要があります。共有環境はキャッシュの推定を歪め、退避の判断を誤らせる可能性があります。</p></li>
</ul>
<h2 id="Choose-the-right-strategy" class="common-anchor-header">適切な戦略を選択する<button data-href="#Choose-the-right-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>Tiered Storageは、ワークロードに合わせて組み合わせることができる柔軟なローディングとキャッシュ戦略を提供します。</p>
<table>
   <tr>
     <th><p>目標</p></th>
     <th><p>推奨されるフォーカス</p></th>
     <th><p>主要メカニズム</p></th>
   </tr>
   <tr>
     <td><p>ファーストクエリの待ち時間を最小化する</p></td>
     <td><p>重要なフィールドのプリロード</p></td>
     <td><p>ウォームアップ</p></td>
   </tr>
   <tr>
     <td><p>大規模データを効率的に扱う</p></td>
     <td><p>オンデマンドロード</p></td>
     <td><p>遅延ロード＋部分ロード</p></td>
   </tr>
   <tr>
     <td><p>長期安定性の維持</p></td>
     <td><p>キャッシュのオーバーフローを防ぐ</p></td>
     <td><p>立ち退き</p></td>
   </tr>
   <tr>
     <td><p>パフォーマンスと容量のバランス</p></td>
     <td><p>プリロードとダイナミック・キャッシュの組み合わせ</p></td>
     <td><p>ハイブリッド構成</p></td>
   </tr>
</table>
<h2 id="Scenario-1-real-time-low-latency-retrieval" class="common-anchor-header">シナリオ1：リアルタイム、低遅延検索<button data-href="#Scenario-1-real-time-low-latency-retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>どのような場合に使用するか</strong></p>
<ul>
<li><p>クエリーレイテンシーが重要な場合（例：リアルタイム推薦や検索ランキング）</p></li>
<li><p>コアベクターインデックスとスカラーフィルターが頻繁にアクセスされる</p></li>
<li><p>起動速度よりも安定したパフォーマンスが重要</p></li>
</ul>
<p><strong>推奨構成</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># scalar field/index warm-up to eliminate first-time latency</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>
        <span class="hljs-comment"># warm-up of vector fields is disabled (if the original vector is not required)</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-comment"># vector indexes warm-up to elminate first-time latenct</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>
      <span class="hljs-comment"># enable cache eviction, and also turn on background asynchronous eviction</span>
      <span class="hljs-comment"># to reduce the triggering of synchronous eviction.</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>
      <span class="hljs-comment"># no expiration time, which avoids frequent reloading</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">0</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>理由</strong></p>
<ul>
<li><p>ウォームアップにより、アクセス頻度の高いスカラーおよびベクトル・インデックスのファーストヒット・レイテンシを排除。</p></li>
<li><p>バックグラウンド・エビクションにより、クエリをブロックすることなく安定したキャッシュ・プレッシャーを維持する。</p></li>
<li><p>キャッシュTTLを無効にすることで、ホットデータに対する不要なリロードを回避。</p></li>
</ul>
<h2 id="Scenario-2-offline-batch-analysis" class="common-anchor-header">シナリオ2：オフライン、バッチ分析<button data-href="#Scenario-2-offline-batch-analysis" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>使用する場合</strong></p>
<ul>
<li><p>クエリのレイテンシ耐性が高い</p></li>
<li><p>ワークロードが巨大なデータセットまたは多数のセグメントを含む</p></li>
<li><p>応答性よりも容量とスループットが優先される</p></li>
</ul>
<p><strong>推奨構成</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># disable scalar field/index warm-up to speed up loading</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">disable</span>
        <span class="hljs-comment"># disable vector field/index warm-up to speed up loading</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">disable</span>
      <span class="hljs-comment"># enable cache eviction, and also turn on background asynchronous eviction</span>
      <span class="hljs-comment"># to reduce the triggering of synchronous eviction.</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.7</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.85</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.7</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.85</span>
      <span class="hljs-comment"># use 1 day expiration to clean unused cache</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">86400</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>理由</strong></p>
<ul>
<li><p>ウォームアップを無効にすることで、多数のセグメントを初期化する際の起動が高速化される。</p></li>
<li><p>ウォーターマークを高くすることで、キャッシュをより密に使用できるようになり、総負荷容量が向上する。</p></li>
<li><p>キャッシュTTLが自動的に未使用データを削除し、ローカルスペースを解放する。</p></li>
</ul>
<h2 id="Scenario-3-hybrid-deployment-mixed-online-+-offline" class="common-anchor-header">シナリオ3：ハイブリッド展開（オンラインとオフラインの混合）<button data-href="#Scenario-3-hybrid-deployment-mixed-online-+-offline" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>使用する場合</strong></p>
<ul>
<li><p>単一のクラスタがオンラインと分析の両方のワークロードに対応</p></li>
<li><p>低レイテンシーを必要とするコレクションもあれば、容量を優先するコレクションもある。</p></li>
</ul>
<p><strong>推奨戦略</strong></p>
<ul>
<li><p>レイテンシに敏感なコレクションには<strong>リアルタイム構成を</strong>適用</p></li>
<li><p><strong>オフライン構成を</strong>分析またはアーカイブコレクションに適用する</p></li>
<li><p>ワークロードの種類ごとに、evictableMemoryCacheRatio、cacheTtl、および透かしの比率を個別に調整する。</p></li>
</ul>
<p><strong>理由</strong></p>
<p>構成を組み合わせることで、リソースの割り当てをきめ細かく制御できる。</p>
<p>クリティカル・コレクションは低レイテンシ保証を維持し、セカンダリ・コレクションはより多くのセグメントとデータ量を処理できます。</p>
<h2 id="Additional-tuning-tips" class="common-anchor-header">その他のチューニングのヒント<button data-href="#Additional-tuning-tips" class="anchor-icon" translate="no">
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
   <tr>
     <th><p>側面</p></th>
     <th><p>推奨事項</p></th>
     <th><p>説明</p></th>
   </tr>
   <tr>
     <td><p><strong>ウォームアップスコープ</strong></p></td>
     <td><p>クエリ頻度の高いフィールドまたはインデックスのみをプリロードする。</p></td>
     <td><p>不必要なプリロードはロード時間とリソース使用を増加させる。</p></td>
   </tr>
   <tr>
     <td><p><strong>立ち退きチューニング</strong></p></td>
     <td><p>デフォルトのウォーターマーク（75～80%）で開始し、徐々に調整する。</p></td>
     <td><p>ギャップが小さいと頻繁に立ち退きが発生し、ギャップが大きいとリソースの解放が遅れます。</p></td>
   </tr>
   <tr>
     <td><p><strong>キャッシュTTL</strong></p></td>
     <td><p>安定したホットデータセットの場合は無効、動的データの場合は有効（例：1～3日）。</p></td>
     <td><p>クリーンアップのオーバーヘッドのバランスをとりながら、古いキャッシュの蓄積を防ぎます。</p></td>
   </tr>
   <tr>
     <td><p><strong>オーバーコミット率</strong></p></td>
     <td><p>リソース・ヘッドルームが大きくない限り、0.7を超える値は避けてください。</p></td>
     <td><p>過剰なオーバーコミットは、キャッシュのスラッシングと不安定なレイテンシを引き起こす可能性があります。</p></td>
   </tr>
   <tr>
     <td><p><strong>モニタリング</strong></p></td>
     <td><p>キャッシュヒット率、リソースの使用率、退避頻度を追跡する。</p></td>
     <td><p>コールドロードが頻繁に発生する場合は、ウォームアップまたはウォーターマークの調整が必要であることを示している可能性があります。</p></td>
   </tr>
</table>
