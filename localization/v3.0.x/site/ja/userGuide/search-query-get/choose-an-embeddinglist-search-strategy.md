---
id: choose-an-embeddinglist-search-strategy.md
title: EmbeddingList 検索戦略の選択
summary: >-
  EmbeddingList検索戦略は、MilvusがEmbeddingList検索用の近似候補インデックスをどのように構築するかを決定します。デフォルトの戦略はtokenannです。エンベディングリストが巨大である場合、TokenANNの計算コストが高すぎる場合、あるいは学習済み／圧縮された行レベルの表現の方が適している場合には、muveraまたはlemurに切り替えることができます。
  emb_list_rerank が有効になっている場合、最終結果は依然として MaxSim による再ランク付けによって生成されます。
---
<h1 id="Choose-an-EmbeddingList-Search-Strategy" class="common-anchor-header">EmbeddingList 検索戦略の選択<button data-href="#Choose-an-EmbeddingList-Search-Strategy" class="anchor-icon" translate="no">
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
    </button></h1><p>EmbeddingList検索戦略は、MilvusがEmbeddingList検索用の近似候補インデックスをどのように構築するかを決定します。デフォルトの戦略は<code translate="no">tokenann</code> です。EmbeddingListの規模が大きい場合、TokenANNの計算コストが高すぎる場合、または学習済み／圧縮された行レベルの表現の方が適している場合は、<code translate="no">muvera</code> または<code translate="no">lemur</code> に切り替えることができます。<code translate="no">emb_list_rerank</code> が有効になっている場合、最終結果は依然としてMaxSimによる再ランク付けによって生成されます。</p>
<h2 id="Why-Search-Strategies-Exist" class="common-anchor-header">検索戦略が存在する理由<button data-href="#Why-Search-Strategies-Exist" class="anchor-icon" translate="no">
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
    </button></h2><p>EmbeddingListは、テキスト文書内のトークン埋め込み、画像文書内のパッチ埋め込み、動画内のクリップ埋め込みなど、複数のベクトルを含む行を対象として設計されています。MaxSimは、1つのクエリベクトルと1つの行ベクトルを比較するのではなく、クエリ埋め込みリストと文書埋め込みリストを比較し、最も一致度の高いものを集約します。</p>
<p>これにより表現力が向上しますが、大規模な環境では厳密なMaxSimの計算コストが高くなります。ブルートフォース方式のMaxSim検索では、クエリベクトルを候補となる各行のすべてのベクトルと比較する必要があります。これは通常、本番環境での検索には遅すぎます。</p>
<table>
<thead>
<tr><th>### 問題点 - 各行には多数のベクトルが含まれる可能性がある。 - すべての行に対して厳密なMaxSimを実行すると計算コストが高くなる。 - インデックスのサイズと検索のレイテンシが急速に増加する可能性がある。</th><th>### 戦略 - 第1段階の検索には近似手法を使用する。 - 要求されたtopKよりも多くの候補を抽出する。 - 正確なMaxSimを用いて候補を再ランク付けする。</th></tr>
</thead>
<tbody>
</tbody>
</table>
<p>この意味で、<code translate="no">emb_list_strategy</code> は主にインデックス構築および候補抽出の戦略である。これはインデックス構築時に設定され、第1段階のANN候補セットがどのように生成されるかを決定する。その後、<code translate="no">retrieval_ann_ratio</code> や<code translate="no">emb_list_rerank</code> といった検索時のパラメータによって、抽出される候補の数や、MaxSimによる再ランク付けが適用されるかどうかが制御される。</p>
<hr>
<h2 id="Available-Strategies" class="common-anchor-header">利用可能な戦略<button data-href="#Available-Strategies" class="anchor-icon" translate="no">
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
<thead>
<tr><th>戦略</th><th>候補取得ユニット</th><th>解決対象</th><th>ベストフィット</th><th>主なトレードオフ</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">tokenann</code></td><td>各行内の個々のベクトル</td><td>元のベクトルを保持し、圧縮による損失を回避できる。</td><td>品質優先の検索、短・中程度の埋め込みリスト、識別性の高い埋め込み。</td><td>インデックスが大きくなり、候補の検索コストが高くなる。</td></tr>
<tr><td><code translate="no">muvera</code></td><td>行ごとに1つのエンコード済みベクトル</td><td>学習を行わずに、埋め込みリストを固定次元の FDE 表現に圧縮します。</td><td>長いドキュメント、識別力の高い埋め込み、TokenANN が負荷が大きすぎる場合。</td><td>ランダム投影により近似損失が生じる。FDE の次元はレイテンシに影響する。</td></tr>
<tr><td><code translate="no">lemur</code></td><td>行ごとに1つの学習済みベクトル</td><td>埋め込みリストから固定次元の行ベクトルへの、コーパス固有の圧縮を学習する。</td><td>識別力の低い埋め込み、マルチモーダルまたは視覚的文書検索、大規模な埋め込みリスト。</td><td>トレーニングが必要であり、コーパスの分布や文書長バイアスに敏感になる可能性がある。</td></tr>
</tbody>
</table>
<h2 id="TokenANN" class="common-anchor-header">TokenANN<button data-href="#TokenANN" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">tokenann</code> 埋め込みリスト内のすべてのベクトルにインデックスを付けます。検索時には、各クエリベクトルに対してANN検索が行われ、一致したベクトルは元の行に集約され、その結果得られた行候補はMaxSimを用いて再ランク付けされます。</p>
<div class="alert note">
<p><strong>品質を最優先する場合は、TokenANN を使用してください。</strong>第<strong>1</strong>段階のインデックスですべてのベクトルが利用可能な状態を維持するため、元の MaxSim 計算に最も近い近似となります<strong>。</strong></p>
</div>
<ul>
<li><p><strong>適しているケース：</strong>短いテキストチャンク、ベクトル数が少ないまたは中程度の行、トークンレベルでの意味的な分離が明確な場合、品質を重視するベースライン。</p></li>
<li><p><strong>あまり適さないケース：</strong>非常に長い文書、数千のパッチベクトルを含むビジュアルページ、メモリやレイテンシの制約が厳しい場合。</p></li>
<li><p><strong>要素レベルの挙動：</strong>TokenANNは、個々のベクトルから候補を取得し、それらを行に集約し直すことができます。MaxSimによるスコアリング後の最終的なEmbeddingListの検索結果は、依然として行レベルとなります。</p></li>
</ul>
<h2 id="MUVERA" class="common-anchor-header">MUVERA<button data-href="#MUVERA" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">muvera</code> は、ランダム投影を用いて各埋め込みリストを固定次元のベクトルにエンコードします。これにより、第1段階の検索は標準的な行レベルのベクトル検索となります。その後、候補はMaxSimを用いて再ランク付けされます。</p>
<div class="alert note">
<p><strong>TokenANNでは負荷が高すぎるが、トレーニングステップは省きたい場合にMUVERAを使用します。</strong>これは、品質とコストのバランスが取れた実用的な妥協点です。</p>
</div>
<ul>
<li><p><strong>適しているケース：</strong>長文ドキュメント、識別能力の高い埋め込み空間、TokenANNよりもインデックスサイズを小さくする必要があるワークロード。</p></li>
<li><p><strong>あまり適さないケース：</strong>識別力の低い埋め込み空間、またはFDE表現の次元数が遅延許容範囲を超えてしまう場合。</p></li>
<li><p><strong>重要なパラメータ：</strong><code translate="no">muvera_num_projections</code> 、<code translate="no">muvera_num_repeats</code> 、および<code translate="no">muvera_seed</code> 。</p></li>
</ul>
<h2 id="LEMUR" class="common-anchor-header">LEMUR<button data-href="#LEMUR" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">lemur</code> は、各埋め込みリストを固定次元の表現に圧縮するモデルを学習させます。第1段階のANN検索は学習済みの行レベルベクトルに対して実行され、候補はMaxSimを用いて再ランク付けされます。</p>
<div class="alert note">
<p><strong>学習による圧縮がトレーニングコストに見合う場合は、LEMURを使用してください。</strong>識別度の低い埋め込み空間やマルチモーダル検索では良好な性能を発揮しますが、文書長分布の影響を受けやすいため、対象コーパスに対して検証を行う必要があります。</p>
</div>
<ul>
<li><p><strong>適しているケース：</strong>ビジュアル・ドキュメント検索、マルチモーダルパッチ埋め込み、識別度の低い埋め込み空間、TokenANNが実用的でない大規模な埋め込みリスト。</p></li>
<li><p><strong>あまり適さない用途：</strong>頻繁に変化するコーパス、文書長が著しく偏っている高識別度の埋め込み空間、トレーニングコストが許容できないワークロード。</p></li>
<li><p><strong>重要なパラメータ：</strong><code translate="no">lemur_hidden_dim</code> 、<code translate="no">lemur_num_train_samples</code> 、<code translate="no">lemur_num_epochs</code> 、<code translate="no">lemur_batch_size</code> 、<code translate="no">lemur_learning_rate</code> 、<code translate="no">lemur_seed</code> 、および<code translate="no">lemur_num_layers</code> 。</p></li>
</ul>
<hr>
<h2 id="Default-Behavior-and-Configuration" class="common-anchor-header">デフォルトの動作と設定<button data-href="#Default-Behavior-and-Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Knowhere のデフォルトの EmbeddingList 戦略は<code translate="no">tokenann</code> です。<code translate="no">emb_list_strategy</code> を指定しない場合、Knowhere は TokenANN を使用します。検索時のデフォルトには、<code translate="no">retrieval_ann_ratio=3.0</code> および<code translate="no">emb_list_rerank=true</code> が含まれます。</p>
<h2 id="Configuration-Items-by-Strategy" class="common-anchor-header">戦略ごとの設定項目<button data-href="#Configuration-Items-by-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>次の表に、各戦略固有の設定項目を一覧表示します。Milvusでは、通常、インデックス作成時に<code translate="no">params</code> マップを通じてビルド時の設定項目が渡されます。サーバー側のデフォルト設定が必要な場合は、Milvusの設定ファイル内の<code translate="no">knowhere</code> セクションで定義する必要があります。</p>
<table>
<thead>
<tr><th>戦略</th><th>設定項目</th><th>ステージ</th><th>デフォルト</th><th>変更が必要な場合</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">tokenann</code></td><td><code translate="no">emb_list_strategy=&quot;tokenann&quot;</code></td><td>インデックスの構築</td><td><code translate="no">tokenann</code></td><td>デフォルトの要素ベクトルインデックス作成動作を適用したい場合や、DiskANN を使用する場合は、明示的に使用してください。</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">emb_list_strategy=&quot;muvera&quot;</code></td><td>インデックス構築</td><td><code translate="no">tokenann</code></td><td>トレーニングを行わずに、行レベルのエンコードされた検索を行いたい場合に使用します。</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_num_projections</code></td><td>インデックスの構築</td><td><code translate="no">4</code></td><td>SimHash の投影数を制御します。値が大きいほどバケット数が増え、エンコーディング品質が向上する可能性がありますが、エンコード後の次元数は増加します。</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_num_repeats</code></td><td>インデックスの構築</td><td><code translate="no">7</code></td><td>連結される独立したFDEエンコーディングの数を制御します。値を高くすると堅牢性が向上する可能性がありますが、インデックス作成および検索のコストが増加します。</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_seed</code></td><td>インデックス構築</td><td><code translate="no">42</code></td><td>特にテストやベンチマーク比較において、再現性のあるランダムな射影を行うために設定します。</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">emb_list_strategy=&quot;lemur&quot;</code></td><td>インデックス構築</td><td><code translate="no">tokenann</code></td><td>学習済み行レベル圧縮が、固定ランダム投影よりも優れた性能を発揮すると予想される場合に使用します。</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_hidden_dim</code></td><td>インデックス構築</td><td><code translate="no">256</code></td><td>圧縮後の表現サイズを制御します。容量を増やすには値を大きくし、メモリ使用量を減らして検索速度を向上させるには値を小さくします。</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_train_samples</code></td><td>インデックスの構築</td><td><code translate="no">20000</code></td><td>コーパスが多様で、学習された圧縮が過小適合している場合は値を大きくします。値を下げるのは、小規模なテストや構築速度の向上の場合に限ります。</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_epochs</code></td><td>インデックス構築</td><td><code translate="no">50</code></td><td>学習が収束していない場合は値を大きくし、構築時間が主な制約となる場合は値を小さくします。</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_batch_size</code></td><td>インデックス構築</td><td><code translate="no">512</code></td><td>トレーニングのスループットとメモリ使用量に合わせて調整する。</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_learning_rate</code></td><td>インデックス構築</td><td><code translate="no">0.001</code></td><td>トレーニングが不安定な場合や収束が遅すぎる場合は調整する。</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_seed</code></td><td>インデックスの構築</td><td><code translate="no">42</code></td><td>トレーニングの実行結果を再現可能にするために設定します。</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_layers</code></td><td>インデックスの構築</td><td><code translate="no">2</code></td><td>コーパスにより表現力の高い特徴量抽出器が必要であり、かつ追加の学習コストを負担できる場合にのみ、この値を増加させてください。</td></tr>
<tr><td>すべての戦略</td><td><code translate="no">retrieval_ann_ratio</code></td><td>検索</td><td><code translate="no">3.0</code></td><td>値を大きくすると、第1段階の候補をより多く取得してリコールが向上し、小さくするとレイテンシが低減します。</td></tr>
<tr><td>すべての戦略</td><td><code translate="no">emb_list_rerank</code></td><td>検索</td><td><code translate="no">true</code></td><td>MaxSimによる再ランク付けを行う場合は有効のままにしておきます。第1段階のANNの品質を直接測定する制御された実験の場合にのみ無効にしてください。</td></tr>
</tbody>
</table>
<h2 id="Configure-the-Strategy-in-Milvus" class="common-anchor-header">Milvus での戦略の設定<button data-href="#Configure-the-Strategy-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus では、StructArray ベクトルサブフィールドなどの EmbeddingList フィールドにインデックスを作成する際、戦略はインデックスパラメータとして渡されます。</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;clips[clip_embedding]&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">96</span>,
        <span class="hljs-string">&quot;emb_list_strategy&quot;</span>: <span class="hljs-string">&quot;muvera&quot;</span>,
        <span class="hljs-string">&quot;muvera_num_projections&quot;</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">&quot;muvera_num_repeats&quot;</span>: <span class="hljs-number">7</span>,
        <span class="hljs-string">&quot;muvera_seed&quot;</span>: <span class="hljs-number">42</span>,
    },
)
<button class="copy-code-btn"></button></code></pre>
<p>LEMUR の場合、同じ `<code translate="no">params</code> ` マップ内に LEMUR のトレーニングパラメータを指定してください。</p>
<pre><code translate="no" class="language-python">params={
    <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
    <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">96</span>,
    <span class="hljs-string">&quot;emb_list_strategy&quot;</span>: <span class="hljs-string">&quot;lemur&quot;</span>,
    <span class="hljs-string">&quot;lemur_hidden_dim&quot;</span>: <span class="hljs-number">256</span>,
    <span class="hljs-string">&quot;lemur_num_train_samples&quot;</span>: <span class="hljs-number">20000</span>,
    <span class="hljs-string">&quot;lemur_num_epochs&quot;</span>: <span class="hljs-number">50</span>,
    <span class="hljs-string">&quot;lemur_batch_size&quot;</span>: <span class="hljs-number">512</span>,
    <span class="hljs-string">&quot;lemur_learning_rate&quot;</span>: <span class="hljs-number">0.001</span>,
    <span class="hljs-string">&quot;lemur_seed&quot;</span>: <span class="hljs-number">42</span>,
    <span class="hljs-string">&quot;lemur_num_layers&quot;</span>: <span class="hljs-number">2</span>,
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Server-side-Defaults-in-Milvus" class="common-anchor-header">Milvusでのサーバーサイドのデフォルト設定<button data-href="#Configure-Server-side-Defaults-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusは、<code translate="no">milvus.yaml</code> からインデックスパラメータを設定することもできます。関連するセクションは<code translate="no">knowhere</code> です。パラメータは、<code translate="no">knowhere.&lt;INDEX_TYPE&gt;.&lt;stage&gt;.&lt;parameter&gt;</code> というパターンに従って、インデックスのタイプとステージごとに整理されています。ユーザーが指定したインデックスパラメータは、これらのデフォルト設定よりも優先されます。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">HNSW:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">emb_list_strategy:</span> <span class="hljs-string">muvera</span>
      <span class="hljs-attr">muvera_num_projections:</span> <span class="hljs-number">4</span>
      <span class="hljs-attr">muvera_num_repeats:</span> <span class="hljs-number">7</span>
      <span class="hljs-attr">muvera_seed:</span> <span class="hljs-number">42</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">retrieval_ann_ratio:</span> <span class="hljs-number">3.0</span>
      <span class="hljs-attr">emb_list_rerank:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>戦略の選択には、インデックスごとのパラメータを優先してください。</strong>Milvusの設定ファイルのデフォルト値は、そのタイプおよびステージのインデックス全体に広く適用されます。異なるコレクションやフィールドで異なるEmbeddingList戦略が必要な場合は、<code translate="no">create_index</code> のパラメータを使用してください。</p>
</div>
<h2 id="Configure-Candidate-Retrieval-at-Search-Time" class="common-anchor-header">検索時の候補取得の設定<button data-href="#Configure-Candidate-Retrieval-at-Search-Time" class="anchor-icon" translate="no">
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
    </button></h2><p>この戦略によって、インデックスの構築方法が決定されます。検索時には、<code translate="no">retrieval_ann_ratio</code> を使用して、MaxSim による再ランク付けの前に、第 1 ステージの候補をいくつ取得するかを制御します。通常、この値を高く設定するとリコール率は向上しますが、レイテンシは増加します。</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=collection_name,
    data=[query_embedding_list],
    anns_field=<span class="hljs-string">&quot;clips[clip_embedding]&quot;</span>,
    search_params={
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">64</span>,
            <span class="hljs-string">&quot;retrieval_ann_ratio&quot;</span>: <span class="hljs-number">3.0</span>,
            <span class="hljs-string">&quot;emb_list_rerank&quot;</span>: <span class="hljs-literal">True</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
)
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th>パラメータ</th><th>ステージ</th><th>デフォルト</th><th>意味</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">emb_list_strategy</code></td><td>インデックス構築</td><td><code translate="no">tokenann</code></td><td>EmbeddingList の候補がどのようにインデックス化され、取得されるかを選択します。</td></tr>
<tr><td><code translate="no">retrieval_ann_ratio</code></td><td>検索</td><td><code translate="no">3.0</code></td><td>ANNの第1ラウンドにおける候補の拡張係数。</td></tr>
<tr><td><code translate="no">emb_list_rerank</code></td><td>検索</td><td><code translate="no">true</code></td><td>MaxSim を使用して、検索された候補の再ランク付けを行うかどうか。</td></tr>
</tbody>
</table>
<div class="alert note">
<p><strong>互換性に関する注意事項：</strong>MUVERA および LEMUR は現在、Knowhere での fp32 データをサポートしています。DiskANN は、TokenANN 戦略でのみ EmbeddingList をサポートしています。fp32 以外のベクトル型や DiskANN を使用する場合は、デフォルトを変更する前に、戦略のサポート状況を確認してください。</p>
</div>
<hr>
<h2 id="How-to-Choose-a-Strategy" class="common-anchor-header">戦略の選び方<button data-href="#How-to-Choose-a-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>普遍的に最良の戦略というものはありません。埋め込みリストの長さ、埋め込み空間の識別能力、レイテンシの許容範囲、インデックスのサイズ、およびトレーニングステップの実施が可能かどうかに基づいて選択してください。</p>
<table>
<thead>
<tr><th>質問</th><th>シグナル</th><th>推奨される出発点</th></tr>
</thead>
<tbody>
<tr><td>高品質なベースラインが必要ですか？</td><td>コストを最適化する前に、実用上最良の近似値を測定したい場合。</td><td><code translate="no">tokenann</code></td></tr>
<tr><td>ベクトル数の行は少ないですか、それとも中程度ですか？</td><td>各行に含まれるトークン、パッチ、またはクリップベクトルの数は少ないですか？</td><td><code translate="no">tokenann</code></td></tr>
<tr><td>TokenANNが大きすぎる、あるいは処理が遅すぎるでしょうか？</td><td>インデックスのサイズや第1段階の検索レイテンシがボトルネックとなっています。</td><td><code translate="no">muvera</code></td></tr>
<tr><td>トレーニングを行わずに圧縮を行いたいですか？</td><td>よりシンプルな運用モデルと再現性のあるエンコーディングが必要です。</td><td><code translate="no">muvera</code></td></tr>
<tr><td>埋め込み空間の識別能力は低いですか？</td><td>トークンレベルのANN候補にはノイズが多く、ランダム投影では十分な信号が保持されません。</td><td><code translate="no">lemur</code></td></tr>
<tr><td>ワークロードは視覚的か、それともマルチモーダルか？</td><td>行には多くのパッチベクトルが含まれており、TokenANNは計算コストが高すぎます。</td><td><code translate="no">lemur</code> あるいは<code translate="no">muvera</code></td></tr>
<tr><td>文書の長さに大きな偏りがあるか？</td><td>一部の行には、他の行よりもはるかに多くのベクトルが含まれています。</td><td>まずは<code translate="no">muvera</code> から始め、<code translate="no">lemur</code> を慎重に検証してください。</td></tr>
</tbody>
</table>
<h2 id="Suggested-Evaluation-Workflow" class="common-anchor-header">推奨される評価ワークフロー<button data-href="#Suggested-Evaluation-Workflow" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>データセットのサイズが許す場合は、品質のベースラインとして<code translate="no">tokenann</code> から開始してください。</p></li>
<li><p><code translate="no">muvera</code> を使用して同じクエリを実行し、リコール、nDCG、レイテンシ、およびインデックスサイズを比較してください。</p></li>
<li><p>埋め込みリストが膨大である場合、埋め込み空間にノイズが多い場合、またはワークロードが視覚的あるいはマルチモーダルである場合は、<code translate="no">lemur</code> を試してみてください。</p></li>
<li><p>ビルド時のパラメータを大幅に変更する前に、<code translate="no">retrieval_ann_ratio</code> を調整してください。リコール率が低い場合は値を大きくし、レイテンシが高すぎる場合は値を小さくしてください。</p></li>
<li><p>常に、代表的なクエリや文書長分布を用いて検証を行ってください。短いテキストで有効な戦略でも、視覚的ドキュメントやロングテールコーパスでは機能しない場合があります。</p></li>
</ol>
<table>
<thead>
<tr><th>### 品質重視 まずは `<code translate="no">tokenann</code>` から始めましょう。これを MaxSim の近似品質のベースラインとして使用してください。</th><th>### バランス重視 トレーニングパイプラインを追加せずにコストを抑える必要がある場合は、<code translate="no">muvera</code> を試してみてください。</th><th>### 圧縮：学習された行レベルの圧縮が、固定のランダムプロジェクションよりも優れた性能を発揮する可能性が高い場合は、<code translate="no">lemur</code> を試してみてください。</th></tr>
</thead>
<tbody>
</tbody>
</table>
<hr>
<h2 id="References-Used-for-This-Draft" class="common-anchor-header">本草案で使用した参考文献<button data-href="#References-Used-for-This-Draft" class="anchor-icon" translate="no">
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
<li><p><code translate="no">emb_list_strategy</code> 、<code translate="no">retrieval_ann_ratio</code> 、および<code translate="no">emb_list_rerank</code> に関する Milvus のテスト。</p></li>
<li><p>Milvusのサーバーサイドインデックスのデフォルト設定に関する設定ファイルの取り扱いについては、「<code translate="no">knowhere</code> 」セクションを参照してください。</p></li>
<li><p>デフォルト値およびサポートされる戦略名に関する Knowhere パラメータの定義。</p></li>
<li><p>fp32 専用の MUVERA/LEMUR および DiskANN TokenANN のみのサポートに関する Knowhere の互換性チェック。</p></li>
<li><p>MaxSim 候補の検索における TokenANN、MUVERA、および LEMUR を比較した内部評価ノート。</p></li>
</ul>
<div class="alert note">
<p><strong>公開に関する注意：</strong>外部に公開する前に、対象の Milvus リリースでどのパラメータが公式にサポートされているか、また、その製品がすべての低レベルの Knowhere パラメータを公開するつもりなのか、それとも文書化されたより限定的なサブセットのみを公開するつもりなのかを確認してください。</p>
</div>
