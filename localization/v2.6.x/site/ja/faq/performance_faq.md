---
id: performance_faq.md
summary: 検索パフォーマンス、パフォーマンスの向上、およびその他のパフォーマンス関連の問題について、よくある質問とその回答をご覧ください。
title: パフォーマンスに関するよくある質問
---
<h1 id="Performance-FAQ" class="common-anchor-header">パフォーマンスに関するよくある質問<button data-href="#Performance-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="How-to-set-nlist-and-nprobe-for-IVF-indexes" class="common-anchor-header">IVFインデックスの<code translate="no">nlist</code> および<code translate="no">nprobe</code> の設定方法は？</h4><p><code translate="no">nlist</code> の設定は、使用シナリオによって異なります。経験則として、<code translate="no">nlist</code> の推奨値は<code translate="no">4 × sqrt(n)</code> です。ここで、<code translate="no">n</code> はセグメント内のエンティティの総数です。</p>
<p>各セグメントのサイズは、<code translate="no">datacoord.segment.maxSize</code> パラメータによって決定され、デフォルトでは1024 MBに設定されています。セグメントn内のエンティティの総数は、<code translate="no">datacoord.segment.maxSize</code> を各エンティティのサイズで割ることで推定できます。</p>
<p><code translate="no">nprobe</code> の設定はデータセットやシナリオによって異なり、精度とクエリパフォーマンスのトレードオフが伴います。繰り返し実験を行い、最適な値を見つけることをお勧めします。</p>
<p>以下のグラフは、sift50mデータセットとIVF_SQ8インデックス上で実行したテストの結果であり、さまざまな<code translate="no">nlist</code>/<code translate="no">nprobe</code> の組み合わせにおけるリコール率とクエリパフォーマンスを比較したものです。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/accuracy_nlist_nprobe.png" alt="Accuracy test" class="doc-image" id="accuracy-test" /> 
   <span>精度テスト</span>
 </span> <span class="img-wrapper"> 


  
   <img translate="no" src="/docs/v2.6.x/assets/performance_nlist_nprobe.png" alt="Performance test" class="doc-image" id="performance-test" /> 
 <span>   パフォーマンステスト</span>
  
 </span></p>
<h4 id="Why-do-queries-sometimes-take-longer-on-smaller-datasets" class="common-anchor-header">なぜ、データセットが小さい場合、クエリに時間がかかることがあるのでしょうか？</h4><p>クエリ操作はセグメント単位で行われます。インデックスは、セグメントに対するクエリ処理にかかる時間を短縮します。セグメントにインデックスが構築されていない場合、Milvusは生データに対する総当たり検索に頼ることになり、クエリ時間が大幅に増加します。</p>
<p>したがって、小規模なデータセット（コレクション）では、インデックスが構築されていないため、通常、クエリに時間がかかります。これは、そのセグメントのサイズが、<code translate="no">rootCoord.minSegmentSizeToEnableindex</code> で設定されたインデックス構築の閾値に達していないためです。<code translate="no">create_index()</code> を呼び出すことで、閾値に達しているにもかかわらずまだ自動的にインデックス化されていないセグメントに対してMilvusにインデックス作成を強制させ、クエリのパフォーマンスを大幅に向上させることができます。</p>
<h4 id="What-factors-impact-CPU-usage" class="common-anchor-header">CPU使用率に影響を与える要因は何ですか？</h4><p>Milvusがインデックスを構築しているときやクエリを実行しているときは、CPU使用率が高くなります。一般的に、インデックスの構築はCPUを大量に消費しますが、単一スレッドで実行されるAnnoyを使用する場合は例外です。</p>
<p>クエリの実行時、CPU使用率は<code translate="no">nq</code> および<code translate="no">nprobe</code> の影響を受けます。<code translate="no">nq</code> と<code translate="no">nprobe</code> の値が小さい場合、同時実行数は少なく、CPU使用率も低水準に抑えられます。</p>
<h4 id="Does-simultaneously-inserting-data-and-searching-impact-query-performance" class="common-anchor-header">データの挿入と検索を同時に行うと、クエリのパフォーマンスに影響しますか？</h4><p>挿入操作自体はCPU負荷が高くありません。しかし、新しいセグメントがインデックス構築のしきい値に達していない可能性があるため、Milvusは総当たり検索に頼ることになり、クエリのパフォーマンスに大きな影響を与えます。</p>
<p><code translate="no">rootcoord.minSegmentSizeToEnableIndex</code> パラメータは、セグメントのインデックス構築のしきい値を決定するもので、デフォルトでは1024行に設定されています。詳細については、「<a href="/docs/ja/v2.6.x/system_configuration.md">システム構成</a>」を参照してください。</p>
<h4 id="Can-indexing-a-VARCHAR-field-improve-deletion-speed" class="common-anchor-header">VARCHARフィールドにインデックスを付与すると、削除速度は向上しますか？</h4><p>VARCHARフィールドにインデックスを付与すると、「Delete By Expression」操作の速度が向上する可能性がありますが、それは特定の条件下でのみです：</p>
<ul>
<li><strong>INVERTEDインデックス</strong>：このインデックスは、主キーではないVARCHARフィールドに対する<code translate="no">IN</code> または<code translate="no">==</code> 式に有効です。</li>
<li><strong>Trieインデックス</strong>：このインデックスは、主キーではないVARCHARフィールドに対するプレフィックスクエリ（例：<code translate="no">LIKE prefix%</code> ）に有効です。</li>
</ul>
<p>ただし、VARCHARフィールドにインデックスを付与しても、以下の処理の高速化にはつながりません：</p>
<ul>
<li><strong>ID による削除</strong>：VARCHAR フィールドが主キーである場合。</li>
<li><strong>無関係な式</strong>：VARCHAR フィールドが DELETE 式の構成要素ではない場合。</li>
</ul>
<h4 id="Still-have-questions" class="common-anchor-header">まだご質問がありますか？</h4><p>以下の方法があります：</p>
<ul>
<li>GitHubで<a href="https://github.com/milvus-io/milvus/issues">Milvus</a>をご覧ください。質問をしたり、アイデアを共有したり、他のユーザーを支援したりしてください。</li>
<li><a href="https://discord.com/invite/8uyFbECzPX">Discordチャンネル</a>に参加して、サポートを受けたり、オープンソースコミュニティと交流したりしましょう。</li>
</ul>
