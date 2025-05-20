---
id: performance_faq.md
summary: 検索パフォーマンス、パフォーマンス強化、その他のパフォーマンスに関するよくある質問への回答をご覧いただけます。
title: パフォーマンスFAQ
---
<h1 id="Performance-FAQ" class="common-anchor-header">パフォーマンスFAQ<button data-href="#Performance-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="How-to-set-nlist-and-nprobe-for-IVF-indexes" class="common-anchor-header">IVFインデックスの<code translate="no">nlist</code> 、<code translate="no">nprobe</code> の設定方法を教えてください。</h4><p><code translate="no">nlist</code> の設定はシナリオによって異なります。経験則として、<code translate="no">nlist</code> の推奨値は<code translate="no">4 × sqrt(n)</code> で、<code translate="no">n</code> はセグメント内のエンティティの総数です。</p>
<p>各セグメントのサイズは<code translate="no">datacoord.segment.maxSize</code> パラメータによって決定され、デフォルトでは 512 MB に設定されている。セグメント内のエンティティの総数 n は、<code translate="no">datacoord.segment.maxSize</code> を各エンティティのサイズで割ることで推定できる。</p>
<p><code translate="no">nprobe</code> の設定は、データセットとシナリオに固有であり、精度とクエリパフォーマンスのトレードオフを伴います。実験を繰り返して理想的な値を見つけることをお勧めします。</p>
<p>以下のグラフは、sift50mデータセットとIVF_SQ8インデックスで実行したテストの結果です。<code translate="no">nlist</code>/<code translate="no">nprobe</code> の異なるペアのリコールとクエリのパフォーマンスを比較しています。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/accuracy_nlist_nprobe.png" alt="Accuracy test" class="doc-image" id="accuracy-test" />
   </span> <span class="img-wrapper"> <span>精度テスト</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/performance_nlist_nprobe.png" alt="Performance test" class="doc-image" id="performance-test" /><span>パフォーマンステスト</span> </span></p>
<h4 id="Why-do-queries-sometimes-take-longer-on-smaller-datasets" class="common-anchor-header">なぜ小さいデータセットではクエリに時間がかかるのか？</h4><p>クエリー操作はセグメントに対して行われる。インデックスがあると、セグメントへのクエリにかかる時間が短縮される。セグメントがインデックス化されていない場合、Milvusは生データに対して総当り検索を行うため、クエリ時間が大幅に増加します。</p>
<p>そのため、インデックスが作成されていない小さなデータセット（コレクション）に対するクエリには通常時間がかかる。これはセグメントのサイズが<code translate="no">rootCoord.minSegmentSizeToEnableindex</code> で設定されたインデックス構築のしきい値に達していないためである。<code translate="no">create_index()</code> を呼び出すと、Milvusは閾値に達しているがまだ自動的にインデックスが作成されていないセグメントに強制的にインデックスを作成し、クエリのパフォーマンスを大幅に向上させることができます。</p>
<h4 id="What-factors-impact-CPU-usage" class="common-anchor-header">CPU使用率に影響を与える要因は何ですか?</h4><p>Milvusがインデックスを構築したり、クエリを実行したりすると、CPU使用率が増加します。一般的に、インデックス構築はシングルスレッドで実行されるAnnoyを使用する場合を除き、CPUを集中的に使用します。</p>
<p>クエリを実行する場合、CPU使用率は<code translate="no">nq</code> と<code translate="no">nprobe</code> の影響を受けます。<code translate="no">nq</code> と<code translate="no">nprobe</code> が小さい場合、同時実行性は低く、CPU使用率は低く保たれる。</p>
<h4 id="Does-simultaneously-inserting-data-and-searching-impact-query-performance" class="common-anchor-header">データの挿入と検索を同時に行うと、クエリのパフォーマンスに影響しますか？</h4><p>挿入操作に CPU が集中することはありません。しかし、新しいセグメントがインデックス構築のしきい値に達していない可能性があるため、milvusは総当たり検索に頼り、クエリ性能に大きな影響を与えます。</p>
<p><code translate="no">rootcoord.minSegmentSizeToEnableIndex</code> パラメータはセグメントのインデックス構築しきい値を決定し、デフォルトでは1024行に設定されています。詳細は<a href="/docs/ja/v2.4.x/system_configuration.md">システム構成を</a>参照してください。</p>
<h4 id="Is-storage-space-released-right-after-data-deletion-in-Milvus" class="common-anchor-header">Milvusでデータを削除した後、ストレージ容量はすぐに解放されますか？</h4><p>いいえ、Milvusでデータを削除してもストレージ容量はすぐに解放されません。データを削除するとエンティティは「論理的に削除された」ことになりますが、実際の容量はすぐに解放されない場合があります。その理由は以下の通りです：</p>
<ul>
<li><strong>コンパクション</strong>：Milvusはバックグラウンドで自動的にデータを圧縮します。このプロセスは、より小さなデータセグメントをより大きなデータセグメントに統合し、論理的に削除されたデータ（削除マークが付けられたエンティティ）やTTL（Time-To-Live）を超えたデータを削除します。ただし、コンパクションは新しいセグメントを作成する一方で、古いセグメントには "Dropped "というマークを付ける。</li>
<li><strong>ガベージコレクション</strong>：ガベージコレクション (GC) と呼ばれる別プロセスが、定期的に "Dropped" セグメントを削除する。これにより、ストレージの効率的な利用が保証されますが、削除とスペースの再利用の間に若干の遅延が生じることがあります。</li>
</ul>
<h4 id="Can-I-see-inserted-deleted-or-upserted-data-immediately-after-the-operation-without-waiting-for-a-flush" class="common-anchor-header">挿入、削除、またはアップサートされたデータを、フラッシュを待たずに操作直後に見ることはできますか？</h4><p>Milvusでは、ストレージとコンピュートの分離アーキテクチャを採用しているため、データの可視性はフラッシュ操作に直接関係しません。一貫性レベルを使用してデータの可読性を管理することができます。</p>
<p>一貫性レベルを選択する際には、一貫性とパフォーマンスのトレードオフを考慮してください。即時の可視性が必要な操作には、"Strong "一貫性レベルを使用する。書き込みを高速に行うには、一貫性を弱くすることを優先します（データはすぐには見えないかもしれません）。詳細は<a href="/docs/ja/v2.4.x/consistency.md">一貫</a>性を参照してください。</p>
<h4 id="Can-indexing-a-VARCHAR-field-improve-deletion-speed" class="common-anchor-header">VARCHARフィールドにインデックスを付けると削除速度が向上しますか?</h4><p>VARCHARフィールドにインデックスを付けると、"Delete By Expression "操作を高速化できますが、特定の条件下でのみ可能です：</p>
<ul>
<li><strong>INVERTEDインデックス</strong>：INVERTED インデックス：このインデックスは、プライマリ・キーでない VARCHAR フィールドの<code translate="no">IN</code> または<code translate="no">==</code> 式に役立ちます。</li>
<li><strong>トライ・インデックス</strong>：このインデックスは、主キーでないVARCHARフィールドに対する接頭辞クエリ（例えば、<code translate="no">LIKE prefix%</code> ）に役立ちます。</li>
</ul>
<p>しかし、VARCHARフィールドにインデックスを付けてもスピードは上がりません：</p>
<ul>
<li><strong>IDによる削除</strong>：VARCHARフィールドが主キーの場合。</li>
<li><strong>関連性のない式</strong>：VARCHARフィールドが削除式の一部でない場合。</li>
</ul>
<h4 id="Still-have-questions" class="common-anchor-header">まだ質問がありますか?</h4><p>できます：</p>
<ul>
<li>GitHubで<a href="https://github.com/milvus-io/milvus/issues">Milvusを</a>チェックしてください。自由に質問し、アイデアを共有し、他の人を助けてください。</li>
<li><a href="https://discord.com/invite/8uyFbECzPX">Discordサーバーに</a>参加して、サポートを探したり、オープンソースコミュニティに参加してください。</li>
</ul>
