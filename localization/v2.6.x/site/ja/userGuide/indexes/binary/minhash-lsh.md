---
id: minhash-lsh.md
title: MINHASH_LSH
summary: >-
  効率的な重複排除と類似検索は、大規模な機械学習データセット、特に大規模言語モデル（Large Language Models:
  LLM）の学習コーパスのクリーニングのようなタスクにとって重要である。数百万、数十億のドキュメントを扱う場合、従来の完全マッチングでは時間とコストがかかりすぎる。
---
<h1 id="MINHASHLSH" class="common-anchor-header">MINHASH_LSH<button data-href="#MINHASHLSH" class="anchor-icon" translate="no">
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
    </button></h1><p>効率的な重複排除と類似検索は、大規模な機械学習データセット、特に大規模言語モデル(LLM)の学習コーパスのクリーニングのようなタスクにとって重要である。数百万から数十億のドキュメントを扱う場合、従来の完全マッチングでは時間とコストがかかりすぎる。</p>
<p>Milvusの<strong>MINHASH_LSH</strong>インデックスは、2つの強力な技術を組み合わせることで、高速でスケーラブルかつ正確な近似重複排除を可能にします：</p>
<ul>
<li><p><a href="https://en.wikipedia.org/wiki/MinHash">MinHash</a>：MinHash：文書の類似性を推定するためのコンパクトなシグネチャ（または「フィンガープリント」）を素早く生成する。</p></li>
<li><p><a href="https://en.wikipedia.org/wiki/Locality-sensitive_hashing">Locality-Sensitive Hashing (LSH)：</a>MinHash署名に基づいて、類似文書のグループを迅速に検出します。</p></li>
</ul>
<p>このガイドでは、MilvusでMINHASH_LSHを使用するための概念、前提条件、セットアップ、ベストプラクティスについて説明します。</p>
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
    </button></h2><h3 id="Jaccard-similarity" class="common-anchor-header">Jaccard類似度</h3><p>Jaccard類似度は2つの集合AとBの重なりを測定するもので、正式には以下のように定義される：</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>J</mi><mo stretchy="false">(</mo><mi>A</mi><mo separator="true">,</mo><mi>B</mi><mo stretchy="false">)</mo><mo>=</mo><mfrac><mrow><mi mathvariant="normal">∣</mi><mi>A</mi><mo>∩</mo><mi>B</mi><mi mathvariant="normal">∣</mi></mrow><mrow><mi mathvariant="normal">∣</mi><mi>A</mi><mo>∪</mo><mi>B</mi><mi mathvariant="normal">∣</mi></mrow></mfrac></mrow><annotation encoding="application/x-tex">J(A, B) = \frac{|A \cap B|}{|A \cup B|}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.09618em;">J</span><span class="mopen">(</span><span class="mord mathnormal">A</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.05017em;">B</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.363em;vertical-align:-0.936em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.427em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">∣</span><span class="mord mathnormal">A</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∪</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.05017em;">B</span><span class="mord">∣</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">∣</span><span class="mord mathnormal">A</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∩</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.05017em;">B</span><span class="mord">∣</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.936em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>ここで、その値は0（完全に不一致）から1（同一）までである。</p>
<p>しかしながら、大規模なデータセットにおける全ての文書対の間でジャカード類似度を正確に計算することは、<strong>nが</strong>大きい場合、時間とメモリに計算量-O<strong>(n²)</strong>を要する。このため、LLM訓練コーパスのクリーニングやウェブスケールの文書解析のようなユースケースでは実行不可能である。</p>
<h3 id="MinHash-signatures-Approximate-Jaccard-similarity" class="common-anchor-header">MinHash署名：近似ジャカード類似度</h3><p><a href="https://en.wikipedia.org/wiki/MinHash">MinHashは</a>、Jaccard類似度を推定する効率的な方法を提供する確率的手法である。各集合をコンパクトな<strong>署名ベクトルに</strong>変換し、集合の類似性を効率的に近似するのに十分な情報を保持する。</p>
<p><strong>核となる考え方</strong></p>
<p>2つのセットが類似しているほど、MinHash署名が同じ位置で一致する可能性が高くなります。この特性により、MinHashはセット間のJaccard類似度を近似できます。</p>
<p>この特性により、MinHashは、完全なセットを直接比較する必要なく、セット間の<strong>Jaccard類似度を近似する</strong>ことができます。</p>
<p>MinHashのプロセスには以下が含まれます：</p>
<ol>
<li><p><strong>シングリング</strong>：ドキュメントを、重複するトークン列の集合（シングルス）に変換する。</p></li>
<li><p><strong>ハッシュ化</strong>：各シングルに複数の独立したハッシュ関数を適用する。</p></li>
<li><p><strong>最小選択</strong>：各ハッシュ関数について、すべてのシングルの<strong>最小</strong>ハッシュ値を記録する。</p></li>
</ol>
<p>全プロセスを以下に示します：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/minhash-workflow.png" alt="Minhash Workflow" class="doc-image" id="minhash-workflow" />
   </span> <span class="img-wrapper"> <span>Minhashワークフロー</span> </span></p>
<div class="alert note">
<p>使用するハッシュ関数の数によって、MinHash署名の次元が決まります。次元数が高いほど近似精度が向上しますが、ストレージと計算量が増加します。</p>
</div>
<h3 id="LSH-for-MinHash" class="common-anchor-header">MinHashのLSH</h3><p>MinHash署名は、文書間の正確なJaccard類似度を計算するコストを大幅に削減しますが、署名ベクトルのすべてのペアを網羅的に比較することは、規模が大きくなるとまだ非効率的です。</p>
<p>これを解決するために、<a href="https://zilliz.com/learn/Local-Sensitivity-Hashing-A-Comprehensive-Guide">LSHが</a>使用される。LSHは、類似したアイテムが高い確率で同じ「バケット」にハッシュ化されるようにすることで、すべてのペアを直接比較する必要性を回避し、高速な近似類似性検索を可能にします。</p>
<p>プロセスには以下が含まれる：</p>
<ol>
<li><p><strong>署名のセグメンテーション：</strong></p>
<p><em>n次元の</em>MinHash署名は<em>b個の</em>バンドに分割される。各バンドには<em>r個の</em>連続したハッシュ値が含まれるため、署名の長さは<em>n = b × rを</em>満たす。</p>
<p>たとえば、128次元のMinHash署名<em>（n = 128</em>）を32のバンド<em>（b = 32</em>）に分割する場合、各バンドには4つのハッシュ値<em>（r = 4</em>）が含まれる。</p></li>
<li><p><strong>バンドレベルのハッシュ：</strong></p>
<p>セグメンテーション後、各バンドは標準的なハッシュ関数を使用して独立に処理され、バケツに割り当てられる。バンド内で2つの署名が同じハッシュ値を生成する場合、つまり同じバケツに入る場合、それらは一致する可能性があるとみなされる。</p></li>
<li><p><strong>候補の選択：</strong></p>
<p>少なくとも1つのバンドで衝突するペアが類似候補として選択される。</p></li>
</ol>
<div class="alert note">
<p>なぜ機能するのか？</p>
<p>数学的には、2つのシグネチャがJaccard類似度<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span> sを持つ場合、</p>
<ul>
<li><p>それらが1つの行（ハッシュ位置）で同一である確率は<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">ss</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span>sである。</p></li>
<li><p>バンドのすべての行（<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">rr</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span></span></span></span>r）で一致する確率は<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">srs^r</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6644em;"></span></span></span></span>s<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> r</span></span></span></span></span></span></span></span></span></p></li>
<li><p><strong>少なくとも1つのバンドで</strong>一致する確率は、である：</p></li>
</ul>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mn>1</mn><mo>−</mo><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><msup><mi>s</mi><mi>r</mi></msup><msup><mo stretchy="false">)</mo><mi>b</mi></msup></mrow><annotation encoding="application/x-tex">1 - (1 - s^r)^b</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1.1491em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathnormal">s</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7144em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.02778em;">r</span></span></span></span></span></span></span></span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8991em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">b</span></span></span></span></span></span></span></span></span></span></span></span></p>
<p>詳細は<a href="https://en.wikipedia.org/wiki/Locality-sensitive_hashing">Locality-sensitive hashingを</a>参照のこと。</p>
</div>
<p>128次元のMinHash署名を持つ3つのドキュメントを考える：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/lsh-workflow-1.png" alt="Lsh Workflow 1" class="doc-image" id="lsh-workflow-1" />
   </span> <span class="img-wrapper"> <span>Lshワークフロー1</span> </span></p>
<p>まず、LSHは128次元の署名を、それぞれ連続する4つの値からなる32のバンドに分割する：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/lsh-workflow-2.png" alt="Lsh Workflow 2" class="doc-image" id="lsh-workflow-2" />
   </span> <span class="img-wrapper"> <span>Lshワークフロー2</span> </span></p>
<p>次に、各バンドはハッシュ関数を使用して異なるバケットにハッシュ化される。バケットを共有する文書ペアが類似候補として選択される。以下の例では、文書Aと文書Bは<strong>バンド</strong>0でハッシュ結果が衝突するため、類似候補として選択される：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/lsh-workflow-3.png" alt="Lsh Workflow 3" class="doc-image" id="lsh-workflow-3" />
   </span> <span class="img-wrapper"> <span>Lsh ワークフロー 3</span> </span></p>
<div class="alert note">
<p>バンドの数は<code translate="no">mh_lsh_band</code> パラメータによって制御される。詳細については、<a href="/docs/ja/minhash-lsh.md#Index-building-params">インデックス作成パラメータを</a>参照。</p>
</div>
<h3 id="MHJACCARD-Comparing-MinHash-signatures-in-Milvus" class="common-anchor-header">MHJACCARDを参照：MilvusにおけるMinHash署名の比較。</h3><p>MinHash署名は、固定長のバイナリベクトルを使用してセット間のJaccard類似度を近似します。しかし、これらのシグネチャは元の集合を保持しないため、<code translate="no">JACCARD</code> 、<code translate="no">L2</code> 、<code translate="no">COSINE</code> のような標準的なメトリクスを直接適用して比較することはできない。</p>
<p>これに対処するため、MilvusはMinHashシグネチャを比較するために特別に設計された、<code translate="no">MHJACCARD</code> と呼ばれる特別なメトリックタイプを導入している。</p>
<p>MilvusでMinHashを使用する場合：</p>
<ul>
<li><p>ベクトルフィールドは<code translate="no">BINARY_VECTOR</code></p></li>
<li><p><code translate="no">index_type</code> は<code translate="no">MINHASH_LSH</code> (または<code translate="no">BIN_FLAT</code>) でなければならない。</p></li>
<li><p><code translate="no">metric_type</code> は必ず<code translate="no">MHJACCARD</code></p></li>
</ul>
<p>他のメトリックを使用すると、無効であるか、正しくない結果が得られます。</p>
<p>このメトリックタイプの詳細については、<a href="/docs/ja/metric.md#MHJACCARD">MHJACCARDを</a>参照してください。</p>
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
    </button></h2><p>MilvusでMinHash LSHを使用する前に、まず<strong>MinHash署名を</strong>生成する必要があります。このコンパクトなバイナリ署名は、集合間のJaccard類似度を近似するもので、Milvusの<code translate="no">MHJACCARD</code>-based検索に必要です。</p>
<h3 id="Choose-a-method-to-generate-MinHash-signatures" class="common-anchor-header">MinHashシグネチャの生成方法の選択</h3><p>作業負荷に応じて、以下の方法を選択できます：</p>
<ul>
<li><p>シンプルなPythonの<code translate="no">datasketch</code> （プロトタイピングに推奨）を使用する。</p></li>
<li><p>大規模データセットには分散ツール（Spark、Rayなど）を使用する。</p></li>
<li><p>パフォーマンスチューニングが重要な場合は、カスタムロジック（NumPy、C++など）を実装する。</p></li>
</ul>
<p>このガイドでは、シンプルさとMilvus入力フォーマットとの互換性のために<code translate="no">datasketch</code> 。</p>
<h3 id="Install-required-libraries" class="common-anchor-header">必要なライブラリのインストール</h3><p>この例に必要なパッケージをインストールする：</p>
<pre><code translate="no" class="language-bash">pip install pymilvus datasketch numpy
<button class="copy-code-btn"></button></code></pre>
<h3 id="Generate-MinHash-signatures" class="common-anchor-header">MinHashシグネチャの生成</h3><p>256次元のMinHash署名を生成し、各ハッシュ値を64ビット整数で表現する。これは、<code translate="no">MINHASH_LSH</code> で期待されるベクトル形式と一致している。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datasketch <span class="hljs-keyword">import</span> MinHash
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

MINHASH_DIM = <span class="hljs-number">256</span>
HASH_BIT_WIDTH = <span class="hljs-number">64</span>

<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_minhash_signature</span>(<span class="hljs-params">text, num_perm=MINHASH_DIM</span>) -&gt; <span class="hljs-built_in">bytes</span>:
    m = MinHash(num_perm=num_perm)
    <span class="hljs-keyword">for</span> token <span class="hljs-keyword">in</span> text.lower().split():
        m.update(token.encode(<span class="hljs-string">&quot;utf8&quot;</span>))
    <span class="hljs-keyword">return</span> m.hashvalues.astype(<span class="hljs-string">&#x27;&gt;u8&#x27;</span>).tobytes()  <span class="hljs-comment"># Returns 2048 bytes</span>
<button class="copy-code-btn"></button></code></pre>
<p>各署名は256×64ビット=2048バイトである。このバイト列はmilvus<code translate="no">BINARY_VECTOR</code> フィールドに直接挿入することができる。Milvusで使用されるバイナリベクタの詳細については、<a href="/docs/ja/binary-vector.md">バイナリベクタを</a>参照してください。</p>
<h3 id="Optional-Prepare-raw-token-sets-for-refined-search" class="common-anchor-header">(オプション) (絞り込み検索用) 生トークンセットの準備</h3><p>デフォルトでは、MilvusはMinHashシグネチャとLSHインデックスのみを使用して近似近傍語を検索します。これは高速ですが、偽陽性を返したり、近い一致を見逃す可能性があります。</p>
<p><strong>正確なJaccard類似度を</strong>求める場合、Milvusはオリジナルのトークンセットを使用した絞り込み検索をサポートしています。これを有効にするには</p>
<ul>
<li><p>トークンセットを別の<code translate="no">VARCHAR</code> フィールドとして保存する。</p></li>
<li><p><a href="/docs/ja/minhash-lsh.md#Build-index-parameters-and-create-collection">インデックスパラメータを作成する</a>際に<code translate="no">&quot;with_raw_data&quot;: True</code> を設定する。</p></li>
<li><p>また、<a href="/docs/ja/minhash-lsh.md#Perform-similarity-search">類似検索の実行</a>時に<code translate="no">&quot;mh_search_with_jaccard&quot;: True</code> を有効にします。</p></li>
</ul>
<p><strong>トークンセット抽出の例</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">extract_token_set</span>(<span class="hljs-params">text: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">str</span>:
    tokens = <span class="hljs-built_in">set</span>(text.lower().split())
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot; &quot;</span>.join(tokens)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-MinHash-LSH-in-Milvus" class="common-anchor-header">MilvusでMinHash LSHを使う<button data-href="#Use-MinHash-LSH-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>MinHashベクトルとオリジナルのトークンセットの準備ができたら、Milvusを使用して、<code translate="no">MINHASH_LSH</code> を使用して、それらを保存、インデックス、検索することができます。</p>
<h3 id="Connect-to-Milvus" class="common-anchor-header">Milvusへの接続</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)  <span class="hljs-comment"># Update if your URI is different</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-collection-schema" class="common-anchor-header">コレクションスキーマの定義</h3><p>スキーマを定義する：</p>
<ul>
<li><p>主キー</p></li>
<li><p>MinHashシグネチャ用の<code translate="no">BINARY_VECTOR</code> フィールド</p></li>
<li><p>オリジナルのトークンセットの<code translate="no">VARCHAR</code> フィールド（絞り込み検索が有効な場合）</p></li>
<li><p>オプションで、元のテキスト用の<code translate="no">document</code> フィールド</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType

VECTOR_DIM = MINHASH_DIM * HASH_BIT_WIDTH  <span class="hljs-comment"># 256 × 64 = 8192 bits</span>

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;doc_id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;minhash_signature&quot;</span>, DataType.BINARY_VECTOR, dim=VECTOR_DIM)
schema.add_field(<span class="hljs-string">&quot;token_set&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)  <span class="hljs-comment"># required for refinement</span>
schema.add_field(<span class="hljs-string">&quot;document&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Build-index-parameters-and-create-collection" class="common-anchor-header">インデックスパラメータの構築とコレクションの作成</h3><p>Jaccard絞り込みを有効にして、<code translate="no">MINHASH_LSH</code> インデックスを構築します：</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;minhash_signature&quot;</span>,
    index_type=<span class="hljs-string">&quot;MINHASH_LSH&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MHJACCARD&quot;</span>,
    params={
        <span class="hljs-string">&quot;mh_element_bit_width&quot;</span>: HASH_BIT_WIDTH,  <span class="hljs-comment"># Must match signature bit width</span>
        <span class="hljs-string">&quot;mh_lsh_band&quot;</span>: <span class="hljs-number">16</span>,                       <span class="hljs-comment"># Band count (128/16 = 8 hashes per band)</span>
        <span class="hljs-string">&quot;with_raw_data&quot;</span>: <span class="hljs-literal">True</span>                    <span class="hljs-comment"># Required for Jaccard refinement</span>
    }
)

client.create_collection(<span class="hljs-string">&quot;minhash_demo&quot;</span>, schema=schema, index_params=index_params)
<button class="copy-code-btn"></button></code></pre>
<p>インデックス構築パラメータの詳細については、<a href="/docs/ja/minhash-lsh.md#Index-building-params">インデックス構築パラメータを</a>参照してください。</p>
<h3 id="Insert-data" class="common-anchor-header">データの挿入</h3><p>各文書について、以下を準備する：</p>
<ul>
<li><p>バイナリMinHash署名</p></li>
<li><p>シリアライズされたトークンセット文字列</p></li>
<li><p>(オプション）元のテキスト</p></li>
</ul>
<pre><code translate="no" class="language-python">documents = [
    <span class="hljs-string">&quot;machine learning algorithms process data automatically&quot;</span>,
    <span class="hljs-string">&quot;deep learning uses neural networks to model patterns&quot;</span>
]

insert_data = []
<span class="hljs-keyword">for</span> i, doc <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(documents):
    sig = generate_minhash_signature(doc)
    token_str = extract_token_set(doc)
    insert_data.append({
        <span class="hljs-string">&quot;doc_id&quot;</span>: i,
        <span class="hljs-string">&quot;minhash_signature&quot;</span>: sig,
        <span class="hljs-string">&quot;token_set&quot;</span>: token_str,
        <span class="hljs-string">&quot;document&quot;</span>: doc
    })

client.insert(<span class="hljs-string">&quot;minhash_demo&quot;</span>, insert_data)
client.flush(<span class="hljs-string">&quot;minhash_demo&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Perform-similarity-search" class="common-anchor-header">類似検索の実行</h3><p>Milvusは、MinHash LSHを使用した類似検索の2つのモードをサポートしています：</p>
<ul>
<li><p><strong>近似検索</strong>- MinHash署名とLSHのみを使用し、高速だが確率的な結果を得る。</p></li>
<li><p><strong>絞り込み検索</strong>- 精度を向上させるために、元のトークンセットを使用してJaccard類似度を再計算します。</p></li>
</ul>
<h4 id="51-Prepare-the-query" class="common-anchor-header">5.1 クエリの準備</h4><p>類似性検索を実行するには、クエリ文書のMinHash署名を生成します。この署名は、データ挿入時に使用されたディメンションおよびエンコード形式と一致する必要があります。</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;neural networks model patterns in data&quot;</span>
query_sig = generate_minhash_signature(query_text)
<button class="copy-code-btn"></button></code></pre>
<h4 id="52-Approximate-search-LSH-only" class="common-anchor-header">5.2 近似検索（LSHのみ）</h4><p>これは高速でスケーラブルですが、近い一致を見逃したり、誤検出を含む場合があります：</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params={</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>, </span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {}</span>
<span class="highlighted-comment-line">}</span>

approx_results = client.search(
    collection_name=<span class="hljs-string">&quot;minhash_demo&quot;</span>,
    data=[query_sig],
    anns_field=<span class="hljs-string">&quot;minhash_signature&quot;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>],
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)

<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(approx_results[<span class="hljs-number">0</span>]):
    sim = <span class="hljs-number">1</span> - hit[<span class="hljs-string">&#x27;distance&#x27;</span>]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">{sim:<span class="hljs-number">.3</span>f}</span> | <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;document&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h4 id="53-Refined-search-recommended-for-accuracy" class="common-anchor-header">5.3 絞り込み検索（精度のために推奨）：</h4><p>Milvusに保存されているオリジナルのトークンセットを使用して、正確なJaccard比較が可能です。若干遅いですが、品質を重視するタスクに推奨されます：</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MHJACCARD&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;mh_search_with_jaccard&quot;</span>: <span class="hljs-literal">True</span>,  <span class="hljs-comment"># Enable real Jaccard computation</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">5</span>                    <span class="hljs-comment"># Refine top 5 candidates</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">}</span>

refined_results = client.search(
    collection_name=<span class="hljs-string">&quot;minhash_demo&quot;</span>,
    data=[query_sig],
    anns_field=<span class="hljs-string">&quot;minhash_signature&quot;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;document&quot;</span>],
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)

<span class="hljs-keyword">for</span> i, hit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(refined_results[<span class="hljs-number">0</span>]):
    sim = <span class="hljs-number">1</span> - hit[<span class="hljs-string">&#x27;distance&#x27;</span>]
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>. Similarity: <span class="hljs-subst">{sim:<span class="hljs-number">.3</span>f}</span> | <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;document&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-params" class="common-anchor-header">インデックスパラメータ<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>このセクションでは、インデックスを構築し、インデックスに対して検索を実行するために使用されるパラメータの概要について説明します。</p>
<h3 id="Index-building-params" class="common-anchor-header">インデックス構築パラメータ</h3><p>以下の表は、<a href="/docs/ja/minhash-lsh.md#Build-index-parameters-and-create-collection">インデックスを構築</a>する際に<code translate="no">params</code> で設定可能なパラメータの一覧です。</p>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
     <th><p>値の範囲</p></th>
     <th><p>チューニングの提案</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">mh_element_bit_width</code></p></td>
     <td><p>MinHash署名の各ハッシュ値のビット幅。8で割り切れる値でなければならない。</p></td>
     <td><p>8, 16, 32, 64</p></td>
     <td><p>パフォーマンスと精度のバランスをとるには<code translate="no">32</code> 。より大きなデータセットでより高い精度を得るには、<code translate="no">64</code> を使用する。精度の低下を許容してメモリを節約するには、<code translate="no">16</code> を使用する。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_band</code></p></td>
     <td><p>LSHのMinHashシグネチャを分割するバンドの数。リコールと性能のトレードオフを制御する。</p></td>
     <td><p>[1,<em>signature_length</em>]。</p></td>
     <td><p>128 dimシグネチャの場合：32バンド（4値/バンド）で開始。より高い想起のためには64バンドに増やし、より良い性能のためには16バンドに減らす。署名の長さを均等に分割する必要がある。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_code_in_mem</code></p></td>
     <td><p>LSH ハッシュ・コードを匿名メモリー (<code translate="no">true</code>) に格納するか、メモリー・マッピング (<code translate="no">false</code>) を使うか。</p></td>
     <td><p>true, false</p></td>
     <td><p>大規模なデータセット（&gt;1M セット）には<code translate="no">false</code> を使用してメモリ使用量を減らす。最大限の検索速度を必要とする小規模なデータセットには、<code translate="no">true</code> を使用します。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">with_raw_data</code></p></td>
     <td><p>洗練化のために、元のMinHashシグネチャをLSHコードと一緒に保存するかどうか。</p></td>
     <td><p>true、false</p></td>
     <td><p>高精度が必要で、ストレージコストが許容できる場合は、<code translate="no">true</code> を使用します。<code translate="no">false</code> を使用すると、精度は若干低下するが、ストレージのオーバーヘッドを最小限に抑えることができる。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_bloom_false_positive_prob</code></p></td>
     <td><p>LSHバケット最適化で使用するブルームフィルターの誤検出確率。</p></td>
     <td><p>[0.001, 0.1]</p></td>
     <td><p>メモリ使用量と精度のバランスをとるために<code translate="no">0.01</code> を使用。低い値(<code translate="no">0.001</code>)は誤検出を減らすが、メモリを増加させる。高い値 (<code translate="no">0.05</code>) はメモリを節約しますが、精度が低下する可能性があります。</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">インデックス固有の検索パラメータ</h3><p>次の表は、<a href="/docs/ja/minhash-lsh.md#Perform-similarity-search">インデックスで検索する</a>際に<code translate="no">search_params.params</code> で設定できるパラメータの一覧です。</p>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
     <th><p>値の範囲</p></th>
     <th><p>チューニング・サジェスチョン</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">mh_search_with_jaccard</code></p></td>
     <td><p>絞り込みの候補結果に対して厳密な Jaccard 類似度計算を行うかどうか。</p></td>
     <td><p>true, false</p></td>
     <td><p>高精度を必要とするアプリケーション（重複排除など）には<code translate="no">true</code> を使用する。わずかな精度低下を許容できる場合、より高速な近似検索には<code translate="no">false</code> を使用する。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Jaccard絞り込みの前に検索する候補の数。<code translate="no">mh_search_with_jaccard</code> が<code translate="no">true</code> のときのみ有効。</p></td>
     <td><p>[<em>top_k</em>, *top_k * 10*]。</p></td>
     <td><p>良好な想起-性能バランスを得るために、希望する<em>top_k</em>の 2-5 倍に設定する。値を大きくすると再現率は向上するが、計算コストは増加する。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">mh_lsh_batch_search</code></p></td>
     <td><p>複数の同時クエリに対してバッチ最適化を有効にするかどうか。</p></td>
     <td><p>true, false</p></td>
     <td><p>スループットを向上させるため、複数のクエリを同時に検索する場合は<code translate="no">true</code> を使用する。メモリ・オーバーヘッドを削減するため、単一クエリのシナリオでは<code translate="no">false</code> を使用します。</p></td>
   </tr>
</table>
