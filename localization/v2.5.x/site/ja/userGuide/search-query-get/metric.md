---
id: metric.md
title: メトリクスの種類
summary: >-
  類似度メトリクスは、ベクトル間の類似性を測定するために使用される。適切な距離メトリックを選択することで、分類やクラスタリングの性能を大幅に向上させることができる。
---
<h1 id="Metric-Types" class="common-anchor-header">メトリクスの種類<button data-href="#Metric-Types" class="anchor-icon" translate="no">
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
    </button></h1><p>類似度メトリクスは、ベクトル間の類似度を測定するために使用されます。適切な距離メトリックを選択することで、分類やクラスタリングのパフォーマンスを大幅に向上させることができます。</p>
<p>現在、milvusは以下の類似度メトリックをサポートしています：ユークリッド距離(<code translate="no">L2</code>)、内積(<code translate="no">IP</code>)、コサイン類似度(<code translate="no">COSINE</code>)、<code translate="no">JACCARD</code> 、<code translate="no">HAMMING</code> 、<code translate="no">BM25</code> (特に疎なベクトルの全文検索用に設計)。</p>
<p>以下の表は、さまざまなフィールド・タイプと、それらに対応するメトリック・タイプとの対応をまとめたものです。</p>
<table>
   <tr>
     <th><p>フィールド・タイプ</p></th>
     <th><p>次元範囲</p></th>
     <th><p>サポートされるメトリック型</p></th>
     <th><p>デフォルトのメトリック型</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">FLOAT_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code translate="no">COSINE</code> <code translate="no">L2</code> 、<code translate="no">IP</code></p></td>
     <td><p><code translate="no">COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">FLOAT16_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code translate="no">COSINE</code> <code translate="no">L2</code> 、<code translate="no">IP</code></p></td>
     <td><p><code translate="no">COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BFLOAT16_VECTOR</code></p></td>
     <td><p>2-32,768</p></td>
     <td><p><code translate="no">COSINE</code> <code translate="no">L2</code> 、<code translate="no">IP</code></p></td>
     <td><p><code translate="no">COSINE</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">SPARSE\_FLOAT\_VECTOR</code></p></td>
     <td><p>次元を指定する必要はありません。</p></td>
     <td><p><code translate="no">IP</code>,<code translate="no">BM25</code> (全文検索にのみ使用)</p></td>
     <td><p><code translate="no">IP</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BINARY_VECTOR</code></p></td>
     <td><p>8-32,768*8</p></td>
     <td><p><code translate="no">HAMMING</code>,<code translate="no">JACCARD</code></p></td>
     <td><p><code translate="no">HAMMING</code></p></td>
   </tr>
</table>
<div class="alert note">
<ul>
<li><p><code translate="no">SPARSE\_FLOAT\_VECTOR</code> 型のベクトル・フィールドについては、全文検索を実行する場合にのみ<code translate="no">BM25</code> メトリック型を使用する。詳細については、「<a href="/docs/ja/full-text-search.md">全文検索</a>」を参照してください。</p></li>
<li><p><code translate="no">BINARY_VECTOR</code> 型のベクトル・フィールドの場合、次元値 (<code translate="no">dim</code>) は 8 の倍数でなければなりません。</p></li>
</ul>
</div>
<p>以下の表は、サポー ト さ れてい る すべての メ ト リ ッ ク タ イ プの類似度距離値の特徴 と 、 その値域をまとめた も のです。</p>
<table>
   <tr>
     <th><p>メトリック・タイプ</p></th>
     <th><p>類似性距離値の特性</p></th>
     <th><p>類似性距離値の範囲</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">L2</code></p></td>
     <td><p>値が小さいほど類似度が高いことを示す。</p></td>
     <td><p>[0, ∞)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">IP</code></p></td>
     <td><p>値が大きいほど類似性が高い。</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">COSINE</code></p></td>
     <td><p>値が大きいほど類似度が高い。</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">JACCARD</code></p></td>
     <td><p>値が小さいほど類似性が高い。</p></td>
     <td><p>[0, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">HAMMING</code></p></td>
     <td><p>値が小さいほど類似度が高いことを示す。</p></td>
     <td><p>[0, dim(ベクトル)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">BM25</code></p></td>
     <td><p>項頻度、逆文書頻度、文書正規化に基づいて関連性をスコア化する。</p></td>
     <td><p>[0, ∞)</p></td>
   </tr>
</table>
<h2 id="Euclidean-distance-L2" class="common-anchor-header">ユークリッド距離 (L2)<button data-href="#Euclidean-distance-L2" class="anchor-icon" translate="no">
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
    </button></h2><p>基本的に、ユークリッド距離は2点を結ぶセグメントの長さを測定する。</p>
<p>ユークリッド距離の公式は以下の通り：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/euclidean-metric.png" alt="Euclidean Metric" class="doc-image" id="euclidean-metric" />
   </span> <span class="img-wrapper"> <span>ユークリッド距離</span> </span></p>
<p>ここで、<strong>a = (<sub>a0</sub>,<sub>a1</sub>,...,<sub>an-1</sub>)</strong>と<strong>b = (<sub>b0</sub>,<sub>b1</sub>,...,<sub>bn</sub>-1)</strong>はn次元ユークリッド空間の2点である。</p>
<p>これは最も一般的に使用される距離メトリックであり、データが連続的である場合に非常に有用である。</p>
<div class="alert note">
<p>Milvusはユークリッド距離が距離メトリックとして選択された場合、平方根を適用する前の値のみを計算します。</p>
</div>
<h2 id="Inner-product-IP" class="common-anchor-header">内積 (IP)<button data-href="#Inner-product-IP" class="anchor-icon" translate="no">
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
    </button></h2><p>2つの埋め込み間のIP距離は次のように定義されます：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/IP-formula.png" alt="IP Formula" class="doc-image" id="ip-formula" />
   </span> <span class="img-wrapper"> <span>IPの公式</span> </span></p>
<p>IPは、正規化されていないデータを比較する場合や、大きさや角度を気にする場合に便利です。</p>
<div class="alert note">
<p>IPを使って埋め込み間の類似度を計算する場合、埋め込みを正規化する必要があります。正規化後の内積は余弦類似度に等しくなります。</p>
</div>
<p>X'が埋め込みXから正規化されたとします：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/normalize-formula.png" alt="Normalize Formula" class="doc-image" id="normalize-formula" />
   </span> <span class="img-wrapper"> <span>正規化式</span> </span></p>
<p>2つの埋め込み間の相関は次のようになります：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/correlation-between-embeddings.png" alt="Correlation Between Embeddings" class="doc-image" id="correlation-between-embeddings" />
   </span> <span class="img-wrapper"> <span>埋め込み間の相関</span> </span></p>
<h2 id="Cosine-similarity" class="common-anchor-header">コサイン類似度<button data-href="#Cosine-similarity" class="anchor-icon" translate="no">
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
    </button></h2><p>コサイン類似度は、2組のベクトル間の角度の余弦を用いて、それらの類似度を測定します。2組のベクトルは、[0,0,...]のような同じ点から出発し、異なる方向を向いている線分と考えることができます。</p>
<p>2組のベクトル<strong>A = (<sub>a0</sub>,<sub>a1</sub>,...,<sub>an-1</sub>)</strong>と<strong>B = (<sub>b0</sub>,<sub>b1</sub>,...,<sub>bn</sub>-1)</strong>のコサイン類似度を計算するには、次の式を使います：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/cosine-similarity.png" alt="Cosine Similarity" class="doc-image" id="cosine-similarity" />
   </span> <span class="img-wrapper"> <span>コサイン類似度</span> </span></p>
<p>余弦類似度は常に区間<strong>[-1, 1]</strong>にある。例えば、2つの比例ベクトルは<strong>1の</strong>余弦類似度を持ち、2つの直交ベクトルは<strong>0の</strong>類似度を持ち、2つの反対ベクトルは<strong>-</strong>1の類似度を持ちます。余弦が大きいほど、2つのベクトル間の角度が小さくなり、これらの2つのベクトルが互いに似ていることを示します。</p>
<p>2つのベクトルの余弦類似度を1から引くことで、2つのベクトル間の余弦距離を求めることができます。</p>
<h2 id="JACCARD-distance" class="common-anchor-header">JACCARD 距離<button data-href="#JACCARD-distance" class="anchor-icon" translate="no">
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
    </button></h2><p>JACCARD類似度係数は，2つの標本集合間の類似度を測定し，定義された集合の交点のカーディナリティをそれらの和のカーディナリティで割ったものとして定義される．有限の標本集合にのみ適用できる．</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/JACCARD-similarity-coefficient-formula.png" alt="JACCARD Similarity Coefficient Formula" class="doc-image" id="jaccard-similarity-coefficient-formula" />
   </span> <span class="img-wrapper"> <span>JACCARD類似度係数公式</span> </span></p>
<p>JACCARD 距離は，データ集合間の非類似度を測定し，JACCARD 類似度係数を1から引くことによって得られる．</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/JACCARD-distance-formula.png" alt="JACCARD Distance Formula" class="doc-image" id="jaccard-distance-formula" />
   </span> <span class="img-wrapper"> <span>JACCARD 距離の公式</span> </span></p>
<h2 id="HAMMING-distance" class="common-anchor-header">HAMMING距離<button data-href="#HAMMING-distance" class="anchor-icon" translate="no">
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
    </button></h2><p>HAMMING 距離はバイナリ・データ文字列を測定する．同じ長さの2つの文字列間の距離は、ビットが異なるビット位置の数である。</p>
<p>例えば、1101 1001 と 1001 1101 という2つの文字列があるとする。</p>
<p>11011001 ⊕ 10011101 = 01000100.これには2つの1が含まれるため、ハミング距離d (11011001, 10011101) = 2となる。</p>
<h2 id="BM25-similarity" class="common-anchor-header">BM25類似度<button data-href="#BM25-similarity" class="anchor-icon" translate="no">
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
    </button></h2><p>BM25は広く使われているテキスト関連性測定法で、特に<a href="/docs/ja/full-text-search.md">全文検索</a>用に設計されている。以下の3つの重要な要素を組み合わせている：</p>
<ul>
<li><p><strong>用語頻度（TF）：</strong>ある用語が文書に出現する頻度を測定する。頻度が高いほど重要度が高いことを示すことが多いが、BM25では飽和パラメータk_1を使用して、頻度が高すぎる用語が関連性スコアを支配するのを防ぐ。</p></li>
<li><p><strong>逆ドキュメント頻度（IDF）：</strong>コーパス全体における用語の重要度を反映する。より少ない文書に出現する用語ほどIDF値が高くなり、関連性に大きく寄与していることを示す。</p></li>
<li><p><strong>文書の長さの正規化：</strong>長い文書は、より多くの用語を含むため、スコアが高くなる傾向があります。BM25は文書の長さを正規化することでこのバイアスを軽減し、パラメータbはこの正規化の強さを制御する。</p></li>
</ul>
<p>BM25のスコアリングは以下のように計算される：</p>
<p>score(D, Q)=\sum_{i=1}^{n}IDF(q_i)\cdot {{TF(q_i,D)\cdot(k_1+1)}\over{TF(q_i, D)+k_1\cdot(1-b+b\cdot {{|D|}\over{avgdl}})}}</p>
<p>パラメータの説明：</p>
<ul>
<li><p>Q: ユーザーが入力したクエリテキスト。</p></li>
<li><p>D: 評価対象の文書。</p></li>
<li><p>TF(q_i, D)：項頻度。項q_iが文書Dに出現する頻度を表す。</p></li>
<li><p>IDF(q_i)：逆文書頻度：</p>
<p>IDF(q_i)=\log({N-n(q_i)+0.5\over n(q_i)+0.5}+ 1)</p>
<p>ここで、Nはコーパスに含まれる文書の総数、n(q_i)は用語q_iを含む文書の数である。</p></li>
<li><p>|D|:文書Dの長さ（用語の総数）。</p></li>
<li><p>avgdl: コーパスに含まれる全文書の平均長。</p></li>
<li><p>k_1: スコアに対する用語頻度の影響を制御する。値が高いほど用語頻度の重要度が増す。典型的な範囲は[1.2, 2.0]であるが、Milvusでは[0, 3]の範囲を許す。</p></li>
<li><p>b:長さの正規化の度合いを0から1の範囲で制御する。値が0の場合、正規化は行われず、値が1の場合、完全な正規化が行われる。</p></li>
</ul>
