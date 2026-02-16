---
id: gpu-index-overview.md
title: GPUインデックスの概要
summary: MilvusのGPUサポートによるインデックスの構築は、高スループット、高リコールシナリオにおいて検索性能を大幅に向上させることができる。
---
<h1 id="GPU-Index-Overview" class="common-anchor-header">GPUインデックスの概要<button data-href="#GPU-Index-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>MilvusでGPUをサポートしたインデックスを構築することで、高スループット、高リコールシナリオでの検索性能を大幅に向上させることができます。</p>
<p>以下の図は、インデックス構成、ハードウェアセットアップ、ベクトルデータセット（CohereとOpenAI）、検索バッチサイズにおけるクエリスループット（クエリ/秒）を比較したもので、<code translate="no">GPU_CAGRA</code> が一貫して他の方法を上回っていることを示しています。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/gpu-index-performance.png" alt="Gpu Index Performance" class="doc-image" id="gpu-index-performance" />
   </span> <span class="img-wrapper"> <span>GPUインデックス性能</span> </span></p>
<h2 id="Configure-GPU-memory-pool-for-Milvus" class="common-anchor-header">MilvusのGPUメモリプールの設定<button data-href="#Configure-GPU-memory-pool-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>MilvusはグローバルGPUメモリプールをサポートしており、<a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">Milvus設定</a>ファイルに<code translate="no">initMemSize</code> と<code translate="no">maxMemSize</code> の2つの設定パラメータを提供しています。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># sets the maximum memory usage limit. When the memory usage exceeds initMemSize, Milvus will attempt to expand the memory pool.</span>
<button class="copy-code-btn"></button></code></pre>
<p>デフォルトの<code translate="no">initMemSize</code> は通常Milvus起動時のGPUメモリの半分で、<code translate="no">maxMemSize</code> はGPUメモリ全体がデフォルトです。GPU メモリ・プール・サイズは、最初は<code translate="no">initMemSize</code> に設定され、必要に応じて<code translate="no">maxMemSize</code> に自動的に拡張されます。</p>
<p>GPU-enabledインデックスが指定されている場合、Milvusは検索前にターゲットコレクションデータをGPUメモリにロードするので、<code translate="no">maxMemSize</code> は少なくともデータサイズでなければなりません。</p>
<h2 id="Limits" class="common-anchor-header">限界<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p><code translate="no">GPU_IVF_FLAT</code> の場合、<code translate="no">limit</code> の最大値は 1,024 です。</p></li>
<li><p><code translate="no">GPU_IVF_PQ</code> および<code translate="no">GPU_CAGRA</code> の場合、<code translate="no">limit</code> の最大値は 1,024 です。</p></li>
<li><p><code translate="no">GPU_BRUTE_FORCE</code> については、<code translate="no">limit</code> の設定はありませんが、潜在的なパフォーマンスの問題を避けるため、4,096 を超えないことが推奨されます。</p></li>
<li><p>現在、GPU インデックスは<code translate="no">COSINE</code> 距離をサポートしていません。<code translate="no">COSINE</code> 距離が必要な場合は、まずデータを正規化し、それから内積（IP）距離を代用として使用します。</p></li>
<li><p>GPU インデックスの OOM 保護のロードは完全にはサポートされておらず、データが多すぎると QueryNode がクラッシュする可能性があります。</p></li>
<li><p>GPUインデックスは<a href="/docs/ja/range-search.md">範囲検索や</a> <a href="/docs/ja/grouping-search.md">グループ検索の</a>ような検索機能をサポートしていません。</p></li>
</ul>
<h2 id="Supported-GPU-index-types" class="common-anchor-header">サポートされるGPUインデックス・タイプ<button data-href="#Supported-GPU-index-types" class="anchor-icon" translate="no">
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
    </button></h2><p>以下の表はMilvusがサポートするGPUインデックスタイプの一覧です。</p>
<table>
   <tr>
     <th><p>インデックスタイプ</p></th>
     <th><p>説明</p></th>
     <th><p>メモリ使用量</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/gpu-cagra.md">GPU_CAGRA</a></p></td>
     <td><p>GPU_CAGRAはGPU用に最適化されたグラフベースのインデックスです。Milvus GPUバージョンを実行するために推論グレードのGPUを使用することは、高価なトレーニンググレードのGPUを使用することと比較して、より費用対効果が高くなります。</p></td>
     <td><p>メモリ使用量は元のベクトルデータの約1.8倍です。</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/gpu-ivf-flat.md">GPU_IVF_FLAT</a></p></td>
     <td><p>GPU_IVF_FLATは最も基本的なIVFインデックスで、各ユニットに格納されるエンコードされたデータは元のデータと一致します。検索を行う場合、GPU_IVF_FLAT インデックスのコレクションに対する検索では、top-k (<code translate="no">limit</code>) を256まで設定できることに注意してください。</p></td>
     <td><p>元データのサイズと同じメモリが必要です。</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/gpu-ivf-pq.md">GPU_IVF_PQ</a></p></td>
     <td><p>GPU_IVF_PQはベクトルの積を量子化する前にIVFインデックスのクラスタリングを行います。検索を行う場合、GPU_IVF_FLAT インデックス付きコレクションに対する検索では、 top-k (<code translate="no">limit</code>) を 8,192 まで設定できることに注意してください。</p></td>
     <td><p>圧縮パラメータの設定に依存しますが、より小さなメモリフットプリントを使用します。</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/gpu-brute-force.md">GPU_BRUTE_FORCE</a></p></td>
     <td><p>GPU_BRUTE_FORCEは、非常に高いリコールが重要なケース向けに調整されており、各クエリをデータセット内のすべてのベクトルと比較することで、1のリコールを保証します。インデックス構築と検索のパラメータとして、メトリックタイプ(<code translate="no">metric_type</code>)とtop-k(<code translate="no">limit</code>)のみを必要とする。</p></td>
     <td><p>元データのサイズに等しいメモリを必要とする。</p></td>
   </tr>
</table>
<h2 id="Configure-Milvus-settings-for-GPU-memory-control" class="common-anchor-header">GPUメモリ制御のためのMilvus設定<button data-href="#Configure-Milvus-settings-for-GPU-memory-control" class="anchor-icon" translate="no">
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
    </button></h2><p>MilvusはGPUメモリを割り当てるためにグローバルグラフィックメモリプールを使用します。<a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">Milvus設定</a>ファイルの<code translate="no">initMemSize</code> と<code translate="no">maxMemSize</code> の2つのパラメータをサポートしています。プールサイズは最初は<code translate="no">initMemSize</code> に設定され、この制限を超えると自動的に<code translate="no">maxMemSize</code> に拡張されます。</p>
<p>デフォルトの<code translate="no">initMemSize</code> は Milvus 起動時に利用可能な GPU メモリの 1/2 で、デフォルトの<code translate="no">maxMemSize</code> は利用可能なすべての GPU メモリと等しくなります。</p>
<p>Milvus 2.4.1 までは、Milvus は統一された GPU メモリプールを使用します。2.4.1より前のバージョンでは、両方の値を0に設定することが推奨されていました。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus2.4.1以降、GPUメモリプールは検索中の一時的なGPUデータにのみ使用されます。そのため、2048と4096に設定することを推奨します。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">2048</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">4096</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>GPUインデックスの構築方法については、各インデックスタイプのガイドを参照してください。</p>
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
    </button></h2><ul>
<li><p><strong>GPUインデックスはどのような場合に利用するのが適切ですか？</strong></p>
<p>GPUインデックスは、高スループットまたは高リコールが要求される状況で特に有益です。例えば、大きなバッチを扱う場合、GPUインデックスのスループットはCPUインデックスのそれを100倍も上回ることができます。より小さなバッチを扱うシナリオでは、GPUインデックスが性能の点でCPUインデックスを大きく上回ることに変わりはありません。さらに、迅速なデータ挿入が必要な場合、GPUを組み込むことで、インデックスの構築プロセスを大幅にスピードアップすることができます。</p></li>
<li><p><strong>GPU_CAGRA、GPU_IVF_PQ、GPU_IVF_FLAT、GPU_BRUTE_FORCE などの GPU インデックスは、どのようなシナリオに最適ですか？</strong></p>
<p><code translate="no">GPU_CAGRA</code> GPU_IVF_FQ、GPU_IVF_FLAT、GPU_BRUTE_FORCE のような GPU インデックスは、より多くのメモリを消費する代償はあるにせよ、より高いパフォーマンスを求めるシナリオに最適です。メモリの節約が優先される環境では、<code translate="no">GPU_IVF_PQ</code> インデックスがストレージ要件を最小化するのに役立ちますが、これは精度の高い損失を伴います。<code translate="no">GPU_IVF_FLAT</code> インデックスは、性能とメモリ使用量の妥協点を提供する、バランスの取れたオプションとして機能する。最後に、<code translate="no">GPU_BRUTE_FORCE</code> インデックスは、網羅的な検索操作のために設計されており、トラバーサル検索を実行することで、想起率1を保証している。</p></li>
</ul>
