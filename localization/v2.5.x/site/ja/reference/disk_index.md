---
id: disk_index.md
related_key: disk_index
summary: Milvusにおけるディスク最適化ベクトル探索のためのディスクインデックス機構。
title: オンディスク インデックス
---
<h1 id="On-disk-Index" class="common-anchor-header">オンディスク インデックス<button data-href="#On-disk-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>この記事では、ディスクに最適化されたベクトル検索用のオンディスク インデキシング アルゴリズムである DiskANN を紹介する。Vamana グラフに基づく DiskANN は、大規模データセット内の効率的なディスク上ベクトル検索を可能にします。</p>
<p>クエリー性能を向上させるために、各ベクトルフィールドに<a href="/docs/ja/index-vector-fields.md">インデックスタイプを指定する</a>ことができます。</p>
<div class="alert note"> 
現在、ベクトルフィールドは1つのインデックスタイプしかサポートしていません。Milvusはインデックスタイプを切り替えると、古いインデックスを自動的に削除します。</div>
<h2 id="Prerequisites" class="common-anchor-header">前提条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>MilvusでDiskANNを使用するには、以下の点に注意してください。</p>
<ul>
<li>MilvusインスタンスがUbuntu 18.04.6またはそれ以降のリリースで動作していること。</li>
<li>MilvusのデータパスはNVMe SSDにマウントされている必要があります：<ul>
<li>Milvusスタンドアロンインスタンスの場合、データパスはインスタンスが動作するコンテナ内の<strong>/var/lib/milvus/dataと</strong>する。</li>
<li>Milvusクラスタインスタンスの場合、データパスはQueryNodesおよびIndexNodesが実行されるコンテナ内の<strong>/var/lib/milvus/data</strong>である必要があります。</li>
</ul></li>
</ul>
<h2 id="Limits" class="common-anchor-header">制限<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>DiskANNを使用するには、以下を確認してください。</p>
<ul>
<li>データに少なくとも 1 次元の浮動小数点ベクトルだけを使用する。</li>
<li>ベクトル間の距離の測定にはユークリッド距離 (L2)、内積 (IP)、または COSINE のみを使用する。</li>
</ul>
<h2 id="Index-and-search-settings" class="common-anchor-header">インデックスと検索の設定<button data-href="#Index-and-search-settings" class="anchor-icon" translate="no">
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
<li><p>インデックス構築パラメータ</p>
<p>DiskANNインデックスを構築する場合、<code translate="no">DISKANN</code> をインデックスタイプとして使用します。インデックスパラメータは必要ありません。</p></li>
<li><p>検索パラメータ</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>範囲</th><th>デフォルト値</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">search_list</code></td><td>候補リストのサイズ。サイズが大きいほど、性能は低下するが、より高い想起率を提供する。</td><td>[topk, int32_max] を指定する。</td><td>16</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="DiskANN-related-Milvus-configurations" class="common-anchor-header">DiskANN関連のMilvus設定<button data-href="#DiskANN-related-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>DiskANNは調整可能である。<code translate="no">${MILVUS_ROOT_PATH}/configs/milvus.yaml</code> 、DiskANN関連のパラメータを変更して性能を向上させることができます。</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-string">...</span>
<span class="hljs-attr">DiskIndex:</span>
  <span class="hljs-attr">MaxDegree:</span> <span class="hljs-number">56</span>
  <span class="hljs-attr">SearchListSize:</span> <span class="hljs-number">100</span>
  <span class="hljs-attr">PQCodeBugetGBRatio:</span> <span class="hljs-number">0.125</span>
  <span class="hljs-attr">SearchCacheBudgetGBRatio:</span> <span class="hljs-number">0.125</span>
  <span class="hljs-attr">BeamWidthRatio:</span> <span class="hljs-number">4.0</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>値の範囲</th><th>デフォルト値</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MaxDegree</code></td><td>Vamanaグラフの最大次数。 <br/> 値を大きくすると想起率が高くなるが、インデックスのサイズと構築時間が増加する。</td><td>[1, 512]</td><td>56</td></tr>
<tr><td><code translate="no">SearchListSize</code></td><td>候補リストのサイズ。 <br/> 値が大きいほどインデックス構築にかかる時間が長くなるが、高い想起率が得られる。 <br/> インデックス構築時間を短縮する必要がない限り、<code translate="no">MaxDegree</code> より小さい値に設定する。</td><td>[1, int32_max］</td><td>100</td></tr>
<tr><td><code translate="no">PQCodeBugetGBRatio</code></td><td>PQコードのサイズ制限。 <br/> 値を大きくすると想起率が高くなるが、メモリ使用量が増加する。</td><td>(0.0, 0.25]</td><td>0.125</td></tr>
<tr><td><code translate="no">SearchCacheBudgetGBRatio</code></td><td>生データに対するキャッシュされたノード番号の比率。 <br/> 値を大きくするとインデックス構築性能が向上するが、メモリ使用量は増加する。</td><td>[0.0, 0.3)</td><td>0.10</td></tr>
<tr><td><code translate="no">BeamWidthRatio</code></td><td>検索反復あたりの最大 IO リクエスト数と CPU 数との比率。</td><td>[1, max(128 / CPU数, 16)] を指定する。</td><td>4.0</td></tr>
</tbody>
</table>
<h2 id="Troubleshooting" class="common-anchor-header">トラブルシューティング<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
<li><p><code translate="no">io_setup() failed; returned -11, errno=11:Resource temporarily unavailable</code> エラーの対処法は？</p>
<p>Linuxカーネルは非同期ノンブロッキングI/O（Asynchronous non-blocking I/O: AIO）機能を提供しており、プロセスが複数のI/O操作を同時に開始しても、そのいずれかが完了するのを待つ必要はありません。これは、処理とI/Oが重複するアプリケーションのパフォーマンスを向上させるのに役立ちます。</p>
<p>この性能は、proc ファイルシステム内の<code translate="no">/proc/sys/fs/aio-max-nr</code> 仮想ファイルを使用して調整できる。<code translate="no">aio-max-nr</code> パラメーターは、許容される同時リクエストの最大数を決定する。</p>
<p><code translate="no">aio-max-nr</code> のデフォルトは<code translate="no">65535</code> であるが、<code translate="no">10485760</code> に設定することもできる。</p></li>
</ul>
