---
id: aisaq.md
title: AISAQCompatible with Milvus 2.6.4+
summary: >-
  AISAQはディスクベースのベクトルインデックスで、DISKANNを拡張し、RAMの制限を超えることなく億単位のデータセットを扱うことができます。圧縮されたベクトルをメモリ上に保持するDISKANNとは異なり、AISAQはすべてのデータをディスク上に保持し、性能とストレージコストのバランスをとるために2つのモードを提供します。
beta: Milvus 2.6.4+
---
<h1 id="AISAQ" class="common-anchor-header">AISAQ<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#AISAQ" class="anchor-icon" translate="no">
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
    </button></h1><p>AISAQはディスクベースのベクトルインデックスで、<a href="/docs/ja/diskann.md">DISKANNを</a>拡張してRAMの制限を超えることなく億単位のデータセットを扱えるようにしたものです。圧縮されたベクトルをメモリ上に保持するDISKANNとは異なり、AISAQはすべてのデータをディスク上に保存し、パフォーマンスとストレージコストのバランスを取るために2つのモードを提供します。</p>
<p>ベクトルデータセットが大きすぎてRAMに快適に収まらない場合や、クエリパフォーマンスをメモリ要件の削減と引き換えにすることでインフラコストを最適化する必要がある場合に、AISAQをご利用ください。</p>
<h2 id="How-AISAQ-works" class="common-anchor-header">AISAQの仕組み<button data-href="#How-AISAQ-works" class="anchor-icon" translate="no">
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
    </button></h2><p>上図は、<strong>DISKANN</strong>、<strong>AISAQ-Performance</strong>、<strong>AISAQ-Scaleの</strong>ストレージレイアウトを比較したもので、データ（生ベクトル、エッジリスト、PQコード）がRAMとディスクの間でどのように分配されるかを示しています。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/aisaq-vs-diskann.png" alt="Aisaq Vs Diskann" class="doc-image" id="aisaq-vs-diskann" />
   </span> <span class="img-wrapper"> <span>AisaqとDiskannの比較</span> </span></p>
<h3 id="Foundation-DISKANN-recap" class="common-anchor-header">ファウンデーションDISKANNのまとめ<button data-href="#Foundation-DISKANN-recap" class="anchor-icon" translate="no">
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
    </button></h3><p>DISKANNでは、生のベクトルとエッジリストはディスクに保存され、PQ圧縮されたベクトルはメモリ（DRAM）に保存される。</p>
<p>DISKANNがノード（例えば、<em>ベクトル0</em>）にトラバースするとき：</p>
<ul>
<li><p>生のベクトル<strong>（raw_vector_0</strong>）とそのエッジリスト<strong>（edgelist_0</strong>）をディスクからロードします。</p></li>
<li><p>エッジリストは、次に訪問する隣接ノード（この例ではノード2、3、5）を示します。</p></li>
<li><p>生ベクトルは、クエリーベクトルとの正確な距離を計算するために使用されます。</p></li>
<li><p>メモリ上のPQデータは、次の探索を導くための近似距離フィルタリングに使用される。</p></li>
</ul>
<p>PQデータはすでにDRAMにキャッシュされているため、各ノードへのアクセスに必要なディスクI/Oは1回のみであり、適度なメモリ使用量で高いクエリー速度を実現する。</p>
<p>これらのコンポーネントとパラメータの詳細については、<a href="/docs/ja/diskann.md">DISKANNを</a>参照してください。</p>
<h3 id="AISAQ-modes" class="common-anchor-header">AISAQモード<button data-href="#AISAQ-modes" class="anchor-icon" translate="no">
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
    </button></h3><p>AISAQは2つのディスクベースのストレージ戦略を提供する。主な違いは、PQ圧縮データの保存方法です。</p>
<h4 id="AISAQ-performance" class="common-anchor-header">AISAQ-パフォーマンス</h4><p><strong>AISAQ-performanceは</strong>、データのコロケーションと冗長性により低IOPSを維持しながら、PQデータをメモリからディスクに移動することで、完全なディスクベースのストレージを実現します。</p>
<p>このモードでは</p>
<ul>
<li><p>各ノードの生ベクトル、エッジ・リスト、および隣接ノードのPQデータは、ディスク上に一緒に保存されます。</p></li>
<li><p>このレイアウトにより、あるノード（例：<em>ベクター0</em>）を訪問しても、ディスクI/Oは1回で済みます。</p></li>
<li><p>しかし、複数のノードの近傍にPQデータが冗長に格納されるため、インデックスファイルのサイズは大幅に増加し、より多くのディスクスペースを消費します。</p></li>
</ul>
<h4 id="AISAQ-scale" class="common-anchor-header">AISAQスケール</h4><p><strong>AISAQ-scaleは</strong>、すべてのデータをディスク上に保持しながら、<em>ディスク使用量を削減する</em>ことに重点を置いています。</p>
<p>このモードでは</p>
<ul>
<li><p>PQデータは冗長性を持たせずにディスク上に別々に保存される。</p></li>
<li><p>この設計はインデックスサイズを最小化するが、グラフ探索時のI/O操作の増加につながる。</p></li>
<li><p>IOPSオーバーヘッドを軽減するために、AISAQは2つの最適化を導入している：</p>
<ul>
<li><p>データの局所性を向上させるために、PQベクトルを優先順位でソートするリアレンジ戦略。</p></li>
<li><p>頻繁にアクセスされるPQデータをキャッシュするDRAM内のPQキャッシュ（pq_cache_size）。</p></li>
</ul></li>
</ul>
<p>その結果、AISAQ-scaleはDISKANNやAISAQ-Performanceよりもストレージ効率は向上するが、性能は低下する。</p>
<h2 id="Example-configuration" class="common-anchor-header">構成例<button data-href="#Example-configuration" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">AISAQ:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Maximum degree of the Vamana graph</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Size limit on the PQ code (compared with raw data)</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Size of the candidate list during building graph</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">beam_width_ratio:</span> <span class="hljs-number">4</span> <span class="hljs-comment"># Ratio between the maximum number of IO requests per search iteration and CPU number</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="AISAQ-specific-parameters" class="common-anchor-header">AISAQ固有のパラメータ<button data-href="#AISAQ-specific-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>AISAQはDISKANNから多くのパラメータを継承しています。冗長性を避けるため、以下ではAISAQ固有のパラメータのみを詳述する。<code translate="no">max_degree</code> 、<code translate="no">pq_code_budget_gb_ratio</code> 、<code translate="no">search_list_size</code> 、<code translate="no">beam_width_ratio</code> などの共有パラメータの説明については、<a href="/docs/ja/diskann.md#DISKANN-params">DISKANN</a> を参照してください。</p>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
     <th><p>値の範囲</p></th>
     <th><p>チューニングの提案</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inline_pq</code></p></td>
     <td><p>ノードごとにインラインで保存される PQ ベクトルの数。ストレージレイアウトを決定する（パフォーマンス対スケールモード）。</p></td>
     <td><p><strong>型</strong>：整数</p><p><strong>範囲</strong>：[0, max_degree[0,<em>max_degree］</em></p><p><strong>デフォルト値</strong>：<code translate="no">-1</code></p></td>
     <td><p><code translate="no">inline_pq</code> が<em>max_degreeに</em>近いほど性能は向上する傾向にあるが、インデックスファイルのサイズは大幅に増加する。</p><p><code translate="no">inline_pq</code> が0に近づくと性能は低下し、インデックスサイズはDISKANNと同様になる。</p><p><strong>注意</strong>：ディスク性能に大きく依存する。限られたディスク帯域幅がボトルネックとなり、全体的なパフォーマンスを低下させる可能性があるからである。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rearrange</code></p></td>
     <td><p>I/Oの局所性を向上させるために、PQベクトルの優先順位によるソートを有効にする。</p></td>
     <td><p><strong>タイプ</strong>ブール値</p><p><strong>範囲</strong>：[true, false[true, false］</p><p><strong>デフォルト値</strong>：<code translate="no">false</code></p></td>
     <td><p>クエリI/Oを減らしますが、インデックス構築時間が長くなります。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_cache_size</code></p></td>
     <td><p>DRAM内のPQキャッシュサイズ（バイト）。</p></td>
     <td><p><strong>型</strong>：整数</p><p><strong>範囲</strong>： [0, 1&lt;&lt;30[0, 1&lt;&lt;30]</p><p><strong>デフォルト値</strong>：<code translate="no">0</code></p></td>
     <td><p>より大きなキャッシュはクエリーパフォーマンスを向上させるが、DRAM使用量を増加させる。</p></td>
   </tr>
</table>
<h2 id="Considerations" class="common-anchor-header">考慮事項<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>ディスク性能は重要です。AISAQはSSDのIOPSに大きく依存します。ストレージの性能が低いとQPSが低下します。</p></li>
<li><p>AISAQ-performanceモード≈DISKANNレイテンシですが、数倍のディスク容量が必要になる場合があります。</p></li>
<li><p>AISAQスケールモードは、QPSがそれほど重要でないオフライン検索やデータアーカイブのワークロードに適しています。</p></li>
</ul>
