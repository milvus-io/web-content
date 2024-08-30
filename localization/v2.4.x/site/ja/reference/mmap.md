---
id: mmap.md
summary: MMapは1つのノードでより多くのデータを可能にする。
title: MMap対応データストレージ
---
<h1 id="MMap-enabled-Data-Storage" class="common-anchor-header">MMap対応データストレージ<button data-href="#MMap-enabled-Data-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusでは、メモリマップドファイルにより、ファイルの内容を直接メモリにマッピングすることができます。この機能により、特に利用可能なメモリが乏しく、完全なデータロードが不可能な状況において、メモリ効率が向上します。この最適化メカニズムにより、ある限度まではパフォーマンスを確保しながらデータ容量を増やすことができますが、データ量がメモリを超過しすぎた場合、検索やクエリのパフォーマンスが著しく低下する可能性がありますので、適宜この機能のON/OFFを選択してください。</p>
<h2 id="Configure-memory-mapping" class="common-anchor-header">メモリマッピングの設定<button data-href="#Configure-memory-mapping" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 2.4からは、デプロイ前に静的設定ファイルを調整してクラスタ全体のデフォルトのメモリマッピング設定を行う柔軟性があります。さらに、パラメータを動的に変更してクラスタとインデックスの両方のレベルでメモリマッピング設定を微調整するオプションもあります。将来のアップデートでは、メモリマッピング機能を拡張し、フィールドレベルの設定を含める予定です。</p>
<h3 id="Before-cluster-deployment-global-configuration" class="common-anchor-header">クラスタ展開前：グローバル設定</h3><p>クラスタをデプロイする前に、<strong>クラスタレベルの</strong>設定でクラスタ全体にメモリマッピングを適用します。これにより、すべての新しいオブジェクトが自動的にこれらの設定に準拠するようになります。これらの設定を変更すると、有効にするにはクラスタを再起動する必要があることに注意してください。</p>
<p>クラスタのメモリマッピング設定を調整するには、<code translate="no">configs/milvus.yaml</code> ファイルを編集します。このファイルでは、デフォルトでメモリ・マッピングを有効にするかどうかを指定し、メモリ・マッピングされたファイルを格納するディレクトリ・パスを決定します。パス(<code translate="no">mmapDirPath</code>)を指定しないままにしておくと、システムのデフォルトでは、メモリ・マップされたファイルは<code translate="no">{localStorage.path}/mmap</code> に格納されます。詳細については、<a href="https://milvus.io/docs/configure_localstorage.md#localStoragepath">ローカル・ストレージ関連の構成を</a>参照してください。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># This parameter was set in configs/milvus.yaml</span>
...
queryNode:
  mmap:
    <span class="hljs-comment"># Set memory mapping property for whole cluster</span>
    mmapEnabled: false | true
    <span class="hljs-comment"># Set memory-mapped directory path, if you leave mmapDirPath unspecified, the memory-mapped files will be stored in {localStorage.path}/ mmap by default. </span>
    mmapDirPath: <span class="hljs-built_in">any</span>/valid/path 
....
<button class="copy-code-btn"></button></code></pre>
<h3 id="During-cluster-operation-dynamic-configuration" class="common-anchor-header">クラスタ動作中: 動的構成</h3><p>クラスタ実行時に、コレクションレベルまたはインデックスレベルでメモリマッピング設定を動的に調整できます。</p>
<p><strong>コレクションレベルでは</strong>、メモリマッピングは、プライマリキー、タイムスタンプ、および行IDを除く、コレクション内のインデックス付けされていないすべての未加工データに適用されます。このアプローチは、特に大規模なデータセットの包括的な管理に適している。</p>
<p>コレクション内のメモリマッピング設定を動的に調整するには、<code translate="no">set_properties()</code> メソッドを使用します。ここでは、<code translate="no">mmap.enabled</code> を<code translate="no">True</code> または<code translate="no">False</code> の間で必要に応じて切り替えることができる。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get existing collection</span>
collection = Collection(<span class="hljs-string">&quot;test_collection&quot;</span>) <span class="hljs-comment"># Replace with your collection name</span>

<span class="hljs-comment"># Set memory mapping property to True or Flase</span>
collection.set_properties({<span class="hljs-string">&#x27;mmap.enabled&#x27;</span>: <span class="hljs-literal">True</span>})
<button class="copy-code-btn"></button></code></pre>
<p><strong>インデックスレベルの</strong>設定では、他のデータ型に影響を与えることなく、メモリマッピングをベクトルインデックスに特別に適用することができます。この機能は、ベクトル検索に最適化されたパフォーマンスを必要とするコレクションにとって非常に貴重です。</p>
<p>コレクション内のインデックスのメモリマッピングを有効または無効にするには、<code translate="no">index_name</code> でターゲットインデックス名を指定し、<code translate="no">mmap.enabled</code> を<code translate="no">True</code> または<code translate="no">False</code> に設定して、<code translate="no">alter_index()</code> メソッドを呼び出します。</p>
<pre><code translate="no" class="language-python">collection.alter_index(
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Replace with your vector index name</span>
    extra_params={<span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">True</span>} <span class="hljs-comment"># Enable memory mapping for index</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Customize-storage-path-in-different-deployments" class="common-anchor-header">異なるデプロイメントでのストレージパスのカスタマイズ<button data-href="#Customize-storage-path-in-different-deployments" class="anchor-icon" translate="no">
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
    </button></h2><p>メモリマップされたファイルのデフォルトは、<code translate="no">localStorage.path</code> 内の<code translate="no">/mmap</code> ディレクトリです。ここでは、さまざまなデプロイメント方法でこの設定をカスタマイズする方法を説明します：</p>
<ul>
<li>Helm Chartを使用してインストールされたMilvusの場合：</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># new-values.yaml</span>
extraConfigFiles:
   user.yaml: |+
      queryNode:
         mmap:
           mmapEnabled: <span class="hljs-literal">true</span>
           mmapDirPath: any/valid/path
        
helm upgrade &lt;milvus-release&gt; --reuse-values -f new-values.yaml milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Milvus Operatorを使用してインストールされたMilvusの場合：</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># patch.yaml</span>
spec:
  config:
    queryNode:
      mmap:
        mmapEnabled: <span class="hljs-literal">true</span>
        mmapDirPath: any/valid/path
      
 kubectl patch milvus &lt;milvus-name&gt; --patch-file patch.yaml
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Dockerを使用してインストールされたMilvusの場合：</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># A new installation script is provided to enable mmap-related settings.</span>
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><ul>
<li><p>メモリマッピングを有効にする前に、コレクションがリリースされていることを確認してください。</p></li>
<li><p>メモリマッピングはDiskANNまたはGPUクラスのインデックスには対応していません。</p></li>
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
    </button></h2><ul>
<li><p><strong>どのようなシナリオでメモリマッピングを有効にすることが推奨されますか？この機能を有効にした後のトレードオフは何ですか？</strong></p>
<p>メモリー・マッピングは、メモリーが限られている場合やパフォーマンス要件が中程度の場合に推奨されます。この機能を有効にすると、データ・ロードの容量が増加します。例えば、2つのCPUと8GBのメモリの構成では、メモリマッピングを有効にすると、有効にしない場合に比べて最大4倍のデータをロードすることができます。パフォーマンスへの影響はさまざまです：</p>
<ul>
<li><p>十分なメモリがあれば、期待される性能はメモリのみを使用した場合と同様です。</p></li>
<li><p>メモリが十分でない場合、期待されるパフォーマンスは低下する可能性があります。</p></li>
</ul></li>
<li><p><strong>コレクションレベル構成とインデックスレベル構成の関係は?</strong></p>
<p>コレクション・レベルとインデックス・レベルは包括的な関係ではなく、コレクション・レベルは元のデータがmmap有効かどうかを制御し、インデックス・レベルはベクトル・インデックスのみを制御します。</p></li>
<li><p><strong>メモリマッピングに推奨されるインデックスタイプはありますか？</strong></p>
<p>はい、HNSWを推奨します。以前、HNSW、IVF_FLAT、IVF_PQ/SQ シリーズのインデックスをテストしたことがありますが、IVF シリーズのインデックスの性能は著しく低下しました。</p></li>
<li><p><strong>メモリマッピングにはどのようなローカルストレージが必要ですか？</strong></p>
<p>NVMeドライブが望ましい。</p></li>
<li><p><strong>スカラーデータはメモリマッピングできますか？</strong></p>
<p>メモリー・マッピングはスカラー・データに適用できますが、スカラー・フィールド上に構築されたインデックスには適用できません。</p></li>
<li><p><strong>異なるレベルにまたがるメモリマッピング構成の優先順位はどのように決定されますか？</strong></p>
<p>Milvusでは、メモリマッピング構成が複数のレベルにまたがって明示的に定義されている場合、インデックスレベルとコレクションレベルの構成が最も高い優先度を共有し、次にクラスタレベルの構成が続きます。</p></li>
<li><p><strong>Milvus 2.3からアップグレードし、メモリマッピングディレクトリパスを設定した場合、どうなりますか?</strong></p>
<p>Milvus 2.3 からアップグレードし、メモリマッピングディレクトリパス (<code translate="no">mmapDirPath</code>) を設定した場合、設定は保持され、メモリマッピング有効 (<code translate="no">mmapEnabled</code>) のデフォルト設定は<code translate="no">true</code> になります。既存のメモリマッピングされたファイルの設定を同期するために、メタデータをマイグレートすることが重要です。詳細については、<a href="https://milvus.io/docs/upgrade_milvus_standalone-docker.md#Migrate-the-metadata">メタデータの移行を</a>参照してください。</p></li>
</ul>
