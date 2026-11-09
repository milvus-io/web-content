---
id: boost-ranker.md
title: Boost RankerCompatible with Milvus v2.6.2+
summary: >-
  Boost Rankers
  では、ベクトル距離に基づいて計算された意味的類似性のみに依存するのではなく、検索結果に有意義な影響を与えることができます。メタデータによるフィルタリングを用いて検索結果を迅速に調整するのに最適です。
beta: Milvus v2.6.2+
---
<h1 id="Boost-Ranker" class="common-anchor-header">Boost Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.2+</span><button data-href="#Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>ブーストランカーを使用すると、ベクトル距離に基づいて計算された意味的類似性のみに依存するのではなく、検索結果に有意義な影響を与えることができます。メタデータによるフィルタリングを用いて検索結果を迅速に調整するのに最適です。</p>
<p>検索リクエストにブーストランカー関数が含まれている場合、Milvus はその関数内のオプションのフィルタリング条件を使用して検索結果候補の中から一致する項目を見つけ出し、指定された重みを適用してそれらのスコアを上昇させます。これにより、最終結果における一致したエンティティの順位を上げたり下げたりすることが可能になります。</p>
<h2 id="When-to-use-Boost-Ranker" class="common-anchor-header">Boost Rankerの使用場面<button data-href="#When-to-use-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>クロスエンコーダーモデルや融合アルゴリズムに依存する他のランカーとは異なり、Boost Rankerはオプションのメタデータ駆動型ルールをランキングプロセスに直接組み込むため、以下のシナリオでより適しています。</p>
<table>
   <tr>
     <th><p>ユースケース</p></th>
     <th><p>例</p></th>
     <th><p>Boost Rankerが効果的な理由</p></th>
   </tr>
   <tr>
     <td><p>ビジネス主導のコンテンツ優先順位付け</p></td>
     <td><ul><li><p>eコマースの検索結果でプレミアム商品を目立たせる</p></li><li><p>ユーザーエンゲージメント指標（閲覧数、いいね、シェアなど）の高いコンテンツの可視性を高める</p></li><li><p>タイムリーさが求められる検索アプリケーションにおいて、最新のコンテンツを上位に表示</p></li><li><p>検証済みまたは信頼できる情報源からのコンテンツを優先</p></li><li><p>完全一致のフレーズや関連性の高いキーワードに合致する検索結果を優先表示</p></li></ul></td>
     <td rowspan="2"><p>インデックスの再構築やベクトル埋め込みモデルの修正といった、時間がかかる作業を行う必要なく、オプションのメタデータフィルターをリアルタイムで適用することで、検索結果内の特定の項目を即座に上位表示または下位表示に調整できます。この仕組みにより、変化するビジネス要件に容易に適応できる、柔軟で動的な検索ランキングを実現します。</p></td>
   </tr>
   <tr>
     <td><p>戦略的なコンテンツの順位引き下げ</p></td>
     <td><ul><li><p>在庫が少ないアイテムを完全に削除することなく、その表示順位を下げる</p></li><li><p>検閲を行わずに、問題となる可能性のある用語を含むコンテンツの順位を下げる</p></li><li><p>古いドキュメントの順位を下げつつ、技術検索では引き続きアクセス可能に保つ</p></li><li><p>マーケットプレイス検索において、競合他社の製品の可視性を微妙に低下させる</p></li><li><p>品質が低いとみなされるコンテンツ（書式の問題や文章が短いなど）の関連性を低下させる</p></li></ul></td>
   </tr>
</table>
<p>また、複数の「Boost Ranker」を組み合わせて、より動的で堅牢な重み付けベースのランキング戦略を実装することも可能です。</p>
<h2 id="Mechanism-of-Boost-Ranker" class="common-anchor-header">Boost Rankerの仕組み<button data-href="#Mechanism-of-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>次の図は、Boost Rankerの主なワークフローを示しています。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/boost-ranker-mechanism.png" alt="Boost Ranker Mechanism" class="doc-image" id="boost-ranker-mechanism" /> 
   <span>Boost Rankerの仕組み</span>
  
 </span></p>
<p>データを挿入すると、Milvus はそのデータを各セグメントに分散させます。検索時には、各セグメントが一連の候補を返し、Milvus はすべてのセグメントからのこれらの候補をランク付けして最終結果を生成します。検索リクエストに Boost Ranker が含まれている場合、Milvus は各セグメントからの候補結果にこれを適用し、精度の低下を防ぎ、再現率を向上させます。</p>
<p>結果を確定する前に、MilvusはBoost Rankerを用いてこれらの候補を次のように処理します：</p>
<ol>
<li><p>Boost Rankerで指定されたオプションのフィルタリング式を適用し、式に一致するエンティティを特定します。</p></li>
<li><p>Boost Rankerで指定された重みを適用し、特定されたエンティティのスコアを向上させます。</p></li>
</ol>
<div class="alert note">
<p>マルチベクトルハイブリッド検索では、Boost Rankerをランカーとして使用することはできません。ただし、そのサブリクエスト（<code translate="no">AnnSearchRequest</code> ）のいずれかにおいて、ランカーとして使用することは可能です。</p>
</div>
<h2 id="Examples-of-Boost-Ranker" class="common-anchor-header">Boost Ranker の使用例<button data-href="#Examples-of-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>次の例は、関連性の高いエンティティ上位 5 件を返し、abstract ドキュメントタイプを持つエンティティのスコアに重みを加える必要があるシングルベクトル検索における Boost Ranker の使用例を示しています。</p>
<ol>
<li><p><strong>検索結果の候補をセグメントごとに収集します。</strong></p>
<p>以下の表は、Milvus がエンティティを 2 つのセグメント（<strong>0001</strong>および<strong>0002</strong>）に分散し、各セグメントから 5 つの候補を返すことを前提としています。</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>DocType</p></th>
<th><p>スコア</p></th>
<th><p>順位</p></th>
<th><p>セグメント</p></th>
</tr>
<tr>
<td><p>117</p></td>
<td><p>要旨</p></td>
<td><p>0.344</p></td>
<td><p>1</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>89</p></td>
<td><p>要旨</p></td>
<td><p>0.456</p></td>
<td><p>2</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>本文</p></td>
<td><p>0.578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>タイトル</p></td>
<td><p>0.788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>本文</p></td>
<td><p>0.899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>body</p></td>
<td><p>0.189</p></td>
<td><p>1</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>本体</p></td>
<td><p>0265</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>561</p></td>
<td><p>要旨</p></td>
<td><p>0.366</p></td>
<td><p>3</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>344</p></td>
<td><p>要旨</p></td>
<td><p>0.444</p></td>
<td><p>4</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>276</p></td>
<td><p>要旨</p></td>
<td><p>0.845</p></td>
<td><p>5</p></td>
<td><p>0002</p></td>
</tr>
</table></p></li>
<li><p><strong>Boost Ranker</strong>（<code translate="no">doctype='abstract'</code> ）<strong>で指定されたフィルタリング式を適用します</strong>。</p>
<p>以下の表の「<code translate="no">DocType</code> 」フィールドに示されているように、Milvusは、さらなる処理のために、<code translate="no">doctype</code> が<code translate="no">abstract</code> に設定されているすべてのエンティティにマークを付けます。</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>DocType</p></th>
<th><p>スコア</p></th>
<th><p>ランク</p></th>
<th><p>セグメント</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>要旨</strong></p></td>
<td><p><strong>0.344</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>抄録</strong></p></td>
<td><p><strong>0.456</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>本文</p></td>
<td><p>0.578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>タイトル</p></td>
<td><p>0.788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>本文</p></td>
<td><p>0.899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>body</p></td>
<td><p>0.189</p></td>
<td><p>1</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>本体</p></td>
<td><p>0265</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>要旨</strong></p></td>
<td><p><strong>0.366</strong></p></td>
<td><p><strong>3</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>要旨</strong></p></td>
<td><p><strong>0.444</strong></p></td>
<td><p><strong>4</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>276</strong></p></td>
<td><p><strong>要旨</strong></p></td>
<td><p><strong>0.845</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
</table></p></li>
<li><p><strong>Boost Ranker</strong>（<code translate="no">weight=0.5</code> ）<strong>で指定された重みを適用します</strong>。</p>
<p>前のステップで特定されたすべてのエンティティに、Boost Ranker で指定された重みが乗算され、その結果、それらの順位が変更されます。</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>DocType</p></th>
<th><p>スコア</p></th>
<th><p>重み付きスコア </p><p>(= スコア × 重み)</p></th>
<th><p>順位</p></th>
<th><p>セグメント</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>要旨</strong></p></td>
<td><p><strong>0.344</strong></p></td>
<td><p><strong>0.172</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>要旨</strong></p></td>
<td><p><strong>0.456</strong></p></td>
<td><p><strong>0.228</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>本体</p></td>
<td><p>0.578</p></td>
<td><p>0.578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>タイトル</p></td>
<td><p>0.788</p></td>
<td><p>0.788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>body</p></td>
<td><p>0.899</p></td>
<td><p>0.899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>要旨</strong></p></td>
<td><p><strong>0.366</strong></p></td>
<td><p><strong>0.183</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>本体</p></td>
<td><p>0.189</p></td>
<td><p>0.189</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>要旨</strong></p></td>
<td><p><strong>0.444</strong></p></td>
<td><p><strong>0.222</strong></p></td>
<td><p><strong>3</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>本体</p></td>
<td><p>0.265</p></td>
<td><p>0.265</p></td>
<td><p>4</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>276</strong></p></td>
<td><p><strong>要旨</strong></p></td>
<td><p><strong>0.845</strong></p></td>
<td><p><strong>0.423</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
</table></p>
<p><div class="alert note"></p>
<p>重みには、任意の浮動小数点数を指定する必要があります。上記の例のように、スコアが小さいほど関連性が高い場合は、<strong>1</strong> 未満の重みを使用してください。それ以外の場合は、<strong>1</strong> より大きい重みを使用してください。</p>
<p></div></p></li>
<li><p><strong>重み付けされたスコアに基づいて、すべてのセグメントの候補を集計し、結果を確定します。</strong></p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>DocType</p></th>
<th><p>スコア</p></th>
<th><p>重み付きスコア</p></th>
<th><p>順位</p></th>
<th><p>セグメント</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>要旨</strong></p></td>
<td><p><strong>0.344</strong></p></td>
<td><p><strong>0.172</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>要旨</strong></p></td>
<td><p><strong>0.366</strong></p></td>
<td><p><strong>0.183</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>本体</p></td>
<td><p>0.189</p></td>
<td><p>0.189</p></td>
<td><p>3</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>要旨</strong></p></td>
<td><p><strong>0.444</strong></p></td>
<td><p><strong>0.222</strong></p></td>
<td><p><strong>4</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>要旨</strong></p></td>
<td><p><strong>0.456</strong></p></td>
<td><p><strong>0.228</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
</table></p></li>
</ol>
<h2 id="Usage-of-Boost-Ranker" class="common-anchor-header">Boost Ranker の使用方法<button data-href="#Usage-of-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>このセクションでは、Boost Ranker を使用して単一ベクトル検索の結果に影響を与える方法の例を紹介します。</p>
<h3 id="Create-a-Boost-Ranker" class="common-anchor-header">Boost Rankerの作成<button data-href="#Create-a-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>検索リクエストの再ランク付け関数として Boost Ranker を渡す前に、次のように Boost Ranker を再ランク付け関数として適切に定義する必要があります：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

rerank = Function(
    name=<span class="hljs-string">&quot;boost&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;boost&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: <span class="hljs-string">&quot;doctype == &#x27;abstract&#x27;&quot;</span>,
        <span class="hljs-string">&quot;random_score&quot;</span>: {
            <span class="hljs-string">&quot;seed&quot;</span>: <span class="hljs-number">126</span>,
            <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;id&quot;</span>
        },
        <span class="hljs-string">&quot;weight&quot;</span>: <span class="hljs-number">0.5</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.BoostRanker;

<span class="hljs-type">BoostRanker</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> BoostRanker.builder()
        .name(<span class="hljs-string">&quot;boost&quot;</span>)
        .filter(<span class="hljs-string">&quot;doctype == \&quot;abstract\&quot;&quot;</span>)
        .weight(<span class="hljs-number">0.5f</span>)
        .randomScoreField(<span class="hljs-string">&quot;id&quot;</span>)
        .randomScoreSeed(<span class="hljs-number">126L</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

rerank := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;boost&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>).
    WithParam(<span class="hljs-string">&quot;filter&quot;</span>, <span class="hljs-string">&quot;doctype == &#x27;abstract&#x27;&quot;</span>).
    WithParam(<span class="hljs-string">&quot;random_score&quot;</span>, <span class="hljs-string">&quot;{\&quot;seed\&quot;: 126, \&quot;field\&quot;: \&quot;id\&quot;}&quot;</span>).
    WithParam(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.5&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">rerank</span> = Function::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;boost&quot;</span>)
    .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Rerank)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;filter&quot;</span>, <span class="hljs-string">&quot;doctype == &#x27;abstract&#x27;&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;random_score&quot;</span>, <span class="hljs-string">&quot;{\&quot;seed\&quot;: 126, \&quot;field\&quot;: \&quot;id\&quot;}&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.5&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> rerank = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::BoostRerank&gt;(<span class="hljs-string">&quot;boost&quot;</span>);
rerank-&gt;<span class="hljs-built_in">SetFilter</span>(<span class="hljs-string">&quot;doctype == &#x27;abstract&#x27;&quot;</span>);
rerank-&gt;<span class="hljs-built_in">SetWeight</span>(<span class="hljs-number">0.5</span>);
<span class="hljs-comment">// Note: SetRandomScoreField()/SetRandomScoreSeed() are not usable as of</span>
<span class="hljs-comment">// milvus-sdk-cpp v3.0.3 - the SDK sends the seed as a string, which the</span>
<span class="hljs-comment">// server rejects (a numeric seed is required).</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> {<span class="hljs-title class_">FunctionType</span>} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> rerank = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;boost&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;boost&quot;</span>,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;doctype == &#x27;abstract&#x27;&quot;</span>,
    <span class="hljs-attr">random_score</span>: {
      <span class="hljs-attr">seed</span>: <span class="hljs-number">126</span>,
      <span class="hljs-attr">field</span>: <span class="hljs-string">&quot;id&quot;</span>,
    },
    <span class="hljs-attr">weight</span>: <span class="hljs-number">0.5</span>,
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> RANKER=<span class="hljs-string">&#x27;{
    &quot;name&quot;: &quot;boost&quot;,
    &quot;type&quot;: &quot;Rerank&quot;,
    &quot;inputFieldNames&quot;: [],
    &quot;outputFieldNames&quot;: [],
    &quot;params&quot;: {
        &quot;reranker&quot;: &quot;boost&quot;,
        &quot;filter&quot;: &quot;doctype == &#x27;</span>\&#x27;<span class="hljs-string">&#x27;abstract&#x27;</span>\&#x27;<span class="hljs-string">&#x27;&quot;,
        &quot;random_score&quot;: {&quot;seed&quot;: 126, &quot;field&quot;: &quot;id&quot;},
        &quot;weight&quot;: 0.5
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>必須？</p></th>
     <th><p>説明</p></th>
     <th><p>値/例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>はい</p></td>
     <td><p>この関数の固有の識別子</p></td>
     <td><p><code translate="no">"boost"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>はい</p></td>
     <td><p>関数を適用するベクトルフィールドのリスト（Boost Rankerの場合は空でなければならない）</p></td>
     <td><p><code translate="no">[]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>はい</p></td>
     <td><p>呼び出す関数のタイプ。再ランク付け戦略を指定するには、<code translate="no">RERANK</code> を使用してください</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>はい</p></td>
     <td><p>再ランク付け機能のタイプを指定します。</p><p>Boost Ranker を使用するには、<code translate="no">boost</code> に設定する必要があります。</p></td>
     <td><p><code translate="no">"boost"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.weight</code></p></td>
     <td><p>はい</p></td>
     <td><p>生の検索結果に含まれる一致するエンティティのスコアに掛けられる重みを指定します。</p><p>値は浮動小数点数である必要があります。 </p><ul><li><p>一致するエンティティの重要性を強調するには、スコアを上昇させる値に設定してください。</p></li><li><p>一致するエンティティの重要度を下げるには、スコアを下げる値をこのパラメータに割り当てます。</p></li></ul></td>
     <td><p><code translate="no">1</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.filter</code></p></td>
     <td><p>いいえ</p></td>
     <td><p>検索結果のエンティティの中から一致するエンティティを特定するために使用されるフィルタ式を指定します。これは、「<a href="/docs/ja/boolean.md">フィルタリングの説明</a>」に記載されている、有効な基本的なフィルタ式であればどれでも使用できます。</p><p><strong>注</strong>：<code translate="no">==</code> 、<code translate="no">&gt;</code> 、<code translate="no">&lt;</code> などの基本演算子のみを使用してください。<code translate="no">text_match</code> や<code translate="no">phrase_match</code> などの高度な演算子を使用すると、検索パフォーマンスが低下します。</p></td>
     <td><p><code translate="no">"doctype == 'abstract'"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.random_score</code></p></td>
     <td><p>いいえ</p></td>
     <td><p><code translate="no">0</code> と<code translate="no">1</code> の間の値をランダムに生成する乱数関数を指定します。以下の 2 つのオプション引数があります：</p><ul><li><p><code translate="no">seed</code> (number) 擬似乱数生成器（PRNG）の初期値として使用する値を指定します。</p></li><li><p><code translate="no">field</code> (文字列) 乱数を生成する際のランダム要因として使用されるフィールド名を指定します。一意の値を持つフィールドであれば十分です。</p><p>生成結果の一貫性を確保するため、<code translate="no">seed</code> と<code translate="no">field</code> の両方を設定し、同じシード値とフィールド値を使用することをお勧めします。</p></li></ul></td>
     <td><p><code translate="no">{"seed": 126, "field": "id"}</code></p></td>
   </tr>
</table>
<h3 id="Search-with-a-single-Boost-Ranker" class="common-anchor-header">単一の Boost Ranker を使用した検索<button data-href="#Search-with-a-single-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Boost Ranker 関数の準備が整ったら、検索リクエスト内でそれを参照できます。以下の例では、<strong>id</strong>、<strong>vector</strong>、<strong>doctype</strong> というフィールドを持つコレクションがすでに作成されていることを前提としています。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Connect to the Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Assume you have a collection set up</span>

<span class="hljs-comment"># Conduct a similarity search using the created ranker</span>
client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    params={},
    output_fields=[<span class="hljs-string">&quot;doctype&quot;</span>],
    ranker=rerank
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.FunctionScore;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{-<span class="hljs-number">0.619954f</span>, <span class="hljs-number">0.447943f</span>, -<span class="hljs-number">0.174938f</span>, -<span class="hljs-number">0.424803f</span>, -<span class="hljs-number">0.864845f</span>})))
        .annsField(<span class="hljs-string">&quot;vector&quot;</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;doctype&quot;</span>))
        .topK(<span class="hljs-number">10</span>)
        .functionScore(FunctionScore.builder()
                .addFunction(rerank)
                .build())
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

resultSet, err := client.Search(ctx, milvusclient.NewSearchOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-number">10</span>, []entity.Vector{
    entity.FloatVector{<span class="hljs-number">-0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, <span class="hljs-number">-0.17493894838751745</span>, <span class="hljs-number">-0.4248030059917294</span>, <span class="hljs-number">-0.8648452746018911</span>},
}).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;doctype&quot;</span>).
    WithFunctionScore(entity.NewFunctionScore().AddFunction(rerank)))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(resultSet)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>)).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-built_in">vec!</span>[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>]]))
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;doctype&quot;</span>])
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
            .<span class="hljs-title function_ invoke__">rerank</span>(FunctionScore::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">add_function</span>(rerank.<span class="hljs-title function_ invoke__">clone</span>()))
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, response);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;vector&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-keyword">auto</span> function_score = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::FunctionScore&gt;();
function_score-&gt;<span class="hljs-built_in">AddFunction</span>(rerank);

std::vector&lt;<span class="hljs-type">float</span>&gt; query_vector = {<span class="hljs-number">-0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, <span class="hljs-number">-0.17493894838751745</span>, <span class="hljs-number">-0.4248030059917294</span>, <span class="hljs-number">-0.8648452746018911</span>};
<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vector&quot;</span>)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                   .<span class="hljs-built_in">WithRerank</span>(function_score)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;doctype&quot;</span>)
                   .<span class="hljs-built_in">AddFloatVector</span>(query_vector);

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-comment">// Connect to the Milvus server</span>
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&#x27;root:Milvus&#x27;</span>
});

<span class="hljs-comment">// Assume you have a collection set up</span>

<span class="hljs-comment">// Conduct a similarity search</span>
<span class="hljs-keyword">const</span> searchResults = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
  <span class="hljs-attr">data</span>: [-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&#x27;vector&#x27;</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;doctype&#x27;</span>],
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">rerank</span>: rerank,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Search results:&#x27;</span>, searchResults);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [[-0.619954382375778, 0.4479436794798608, -0.17493894838751745, -0.4248030059917294, -0.8648452746018911]],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;limit&quot;: 10,
    &quot;outputFields&quot;: [&quot;doctype&quot;],
    &quot;functionScore&quot;: {
        &quot;functions&quot;: [
            {
                &quot;name&quot;: &quot;boost&quot;,
                &quot;type&quot;: &quot;Rerank&quot;,
                &quot;inputFieldNames&quot;: [],
                &quot;outputFieldNames&quot;: [],
                &quot;params&quot;: {
                    &quot;reranker&quot;: &quot;boost&quot;,
                    &quot;filter&quot;: &quot;doctype == &#x27;</span>\&#x27;<span class="hljs-string">&#x27;abstract&#x27;</span>\&#x27;<span class="hljs-string">&#x27;&quot;,
                    &quot;random_score&quot;: {&quot;seed&quot;: 126, &quot;field&quot;: &quot;id&quot;},
                    &quot;weight&quot;: 0.5
                }
            }
        ]
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Search-with-multiple-Boost-Rankers" class="common-anchor-header">複数の Boost Ranker を使用した検索<button data-href="#Search-with-multiple-Boost-Rankers" class="anchor-icon" translate="no">
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
    </button></h3><p>1回の検索で複数のBoost Rankerを組み合わせて、検索結果に影響を与えることができます。これを行うには、複数のBoost Rankerを作成し、それらを<strong>FunctionScore</strong>インスタンスで参照し、その<strong>FunctionScore</strong>インスタンスを検索リクエストのランカーとして使用します。</p>
<p>次の例は、<strong>0.8</strong>から<strong>1.2</strong> の間の重みを適用して、特定されたすべてのエンティティのスコアを変更する方法を示しています。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType, FunctionScore

<span class="hljs-comment"># Create a Boost Ranker with a fixed weight</span>
fix_weight_ranker = Function(
    name=<span class="hljs-string">&quot;boost&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;boost&quot;</span>,
        <span class="hljs-string">&quot;weight&quot;</span>: <span class="hljs-number">0.8</span>
    }
)

<span class="hljs-comment"># Create a Boost Ranker with a randomly generated weight between 0 and 0.4</span>
random_weight_ranker = Function(
    name=<span class="hljs-string">&quot;boost&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;boost&quot;</span>,
        <span class="hljs-string">&quot;random_score&quot;</span>: {
            <span class="hljs-string">&quot;seed&quot;</span>: <span class="hljs-number">126</span>,
        },
        <span class="hljs-string">&quot;weight&quot;</span>: <span class="hljs-number">0.4</span>
    }
)

<span class="hljs-comment"># Create a Function Score</span>
ranker = FunctionScore(
    functions=[
        fix_weight_ranker,
        random_weight_ranker
    ],
    params={
        <span class="hljs-string">&quot;boost_mode&quot;</span>: <span class="hljs-string">&quot;Multiply&quot;</span>,
        <span class="hljs-string">&quot;function_mode&quot;</span>: <span class="hljs-string">&quot;Sum&quot;</span>
    }
)

<span class="hljs-comment"># Conduct a similarity search using the created Function Score</span>
client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    params={},
    output_fields=[<span class="hljs-string">&quot;doctype&quot;</span>],
    ranker=ranker
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.FunctionScore;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.*;

CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">fixWeightRanker</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
        .functionType(FunctionType.RERANK)
        .name(<span class="hljs-string">&quot;boost&quot;</span>)
        .param(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>)
        .param(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.8&quot;</span>)
        .build();

CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">randomWeightRanker</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
        .functionType(FunctionType.RERANK)
        .name(<span class="hljs-string">&quot;boost&quot;</span>)
        .param(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>)
        .param(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.4&quot;</span>)
        .param(<span class="hljs-string">&quot;random_score&quot;</span>, <span class="hljs-string">&quot;{\&quot;seed\&quot;: 126}&quot;</span>)
        .build();

Map&lt;String, String&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;boost_mode&quot;</span>, <span class="hljs-string">&quot;Multiply&quot;</span>);
params.put(<span class="hljs-string">&quot;function_mode&quot;</span>, <span class="hljs-string">&quot;Sum&quot;</span>);

<span class="hljs-type">FunctionScore</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> FunctionScore.builder()
        .addFunction(fixWeightRanker)
        .addFunction(randomWeightRanker)
        .params(params)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{-<span class="hljs-number">0.619954382375778f</span>, <span class="hljs-number">0.4479436794798608f</span>, -<span class="hljs-number">0.17493894838751745f</span>, -<span class="hljs-number">0.4248030059917294f</span>, -<span class="hljs-number">0.8648452746018911f</span>})))
        .annsField(<span class="hljs-string">&quot;vector&quot;</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;doctype&quot;</span>))
        .topK(<span class="hljs-number">10</span>)
        .functionScore(ranker)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

fixWeightRanker := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;boost&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>).
    WithParam(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.8&quot;</span>)

randomWeightRanker := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;boost&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>).
    WithParam(<span class="hljs-string">&quot;random_score&quot;</span>, <span class="hljs-string">&quot;{\&quot;seed\&quot;: 126}&quot;</span>).
    WithParam(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.4&quot;</span>)

ranker := entity.NewFunctionScore().
    AddFunction(fixWeightRanker).
    AddFunction(randomWeightRanker).
    WithParam(<span class="hljs-string">&quot;boost_mode&quot;</span>, <span class="hljs-string">&quot;Multiply&quot;</span>).
    WithParam(<span class="hljs-string">&quot;function_mode&quot;</span>, <span class="hljs-string">&quot;Sum&quot;</span>)

resultSet, err := client.Search(ctx, milvusclient.NewSearchOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-number">10</span>, []entity.Vector{entity.FloatVector{<span class="hljs-number">-0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, <span class="hljs-number">-0.17493894838751745</span>, <span class="hljs-number">-0.4248030059917294</span>, <span class="hljs-number">-0.8648452746018911</span>}}).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;doctype&quot;</span>).
    WithFunctionScore(ranker))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(resultSet)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>)).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">fix_weight_ranker</span> = Function::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;boost&quot;</span>)
    .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Rerank)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.8&quot;</span>);

<span class="hljs-keyword">let</span> <span class="hljs-variable">random_weight_ranker</span> = Function::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;boost&quot;</span>)
    .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Rerank)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;random_score&quot;</span>, <span class="hljs-string">&quot;{\&quot;seed\&quot;: 126}&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.4&quot;</span>);

<span class="hljs-keyword">let</span> <span class="hljs-variable">function_score</span> = FunctionScore::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">add_function</span>(fix_weight_ranker)
    .<span class="hljs-title function_ invoke__">add_function</span>(random_weight_ranker)
    .<span class="hljs-title function_ invoke__">params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([
        (<span class="hljs-string">&quot;boost_mode&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;Multiply&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()),
        (<span class="hljs-string">&quot;function_mode&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;Sum&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()),
    ]));

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-built_in">vec!</span>[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>]]))
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;doctype&quot;</span>])
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
            .<span class="hljs-title function_ invoke__">rerank</span>(function_score)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, response);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;vector&gt;</span></span>

<span class="hljs-keyword">auto</span> fix_weight_ranker = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::BoostRerank&gt;(<span class="hljs-string">&quot;boost&quot;</span>);
fix_weight_ranker-&gt;<span class="hljs-built_in">SetWeight</span>(<span class="hljs-number">0.8</span>);

<span class="hljs-keyword">auto</span> random_weight_ranker = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::BoostRerank&gt;(<span class="hljs-string">&quot;boost&quot;</span>);
random_weight_ranker-&gt;<span class="hljs-built_in">SetWeight</span>(<span class="hljs-number">0.4</span>);
<span class="hljs-comment">// Note: SetRandomScoreSeed() is not usable as of milvus-sdk-cpp v3.0.3 —</span>
<span class="hljs-comment">// the SDK sends the seed as a string, which the server rejects.</span>

<span class="hljs-keyword">auto</span> function_score = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::FunctionScore&gt;();
function_score-&gt;<span class="hljs-built_in">AddFunction</span>(fix_weight_ranker);
function_score-&gt;<span class="hljs-built_in">AddFunction</span>(random_weight_ranker);

std::vector&lt;<span class="hljs-type">float</span>&gt; query_vector = {<span class="hljs-number">-0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, <span class="hljs-number">-0.17493894838751745</span>, <span class="hljs-number">-0.4248030059917294</span>, <span class="hljs-number">-0.8648452746018911</span>};
<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vector&quot;</span>)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                   .<span class="hljs-built_in">WithRerank</span>(function_score)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;doctype&quot;</span>)
                   .<span class="hljs-built_in">AddFloatVector</span>(query_vector);

milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> {<span class="hljs-title class_">FunctionType</span>} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> fix_weight_ranker = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;boost&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;boost&quot;</span>,
    <span class="hljs-attr">weight</span>: <span class="hljs-number">0.8</span>,
  },
};

<span class="hljs-keyword">const</span> random_weight_ranker = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;boost&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;boost&quot;</span>,
    <span class="hljs-attr">random_score</span>: {
      <span class="hljs-attr">seed</span>: <span class="hljs-number">126</span>,
    },
    <span class="hljs-attr">weight</span>: <span class="hljs-number">0.4</span>,
  },
};

<span class="hljs-keyword">const</span> ranker = {
  <span class="hljs-attr">functions</span>: [fix_weight_ranker, random_weight_ranker],
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">boost_mode</span>: <span class="hljs-string">&quot;Multiply&quot;</span>,
    <span class="hljs-attr">function_mode</span>: <span class="hljs-string">&quot;Sum&quot;</span>,
  },
};

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">data</span>: [[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>]],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;vector&quot;</span>,
  <span class="hljs-attr">params</span>: {},
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;doctype&quot;</span>],
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">rerank</span>: ranker
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [[-0.619954382375778, 0.4479436794798608, -0.17493894838751745, -0.4248030059917294, -0.8648452746018911]],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;limit&quot;: 10,
    &quot;outputFields&quot;: [&quot;doctype&quot;],
    &quot;functionScore&quot;: {
        &quot;functions&quot;: [
            {
                &quot;name&quot;: &quot;boost&quot;,
                &quot;type&quot;: &quot;Rerank&quot;,
                &quot;inputFieldNames&quot;: [],
                &quot;outputFieldNames&quot;: [],
                &quot;params&quot;: {
                    &quot;reranker&quot;: &quot;boost&quot;,
                    &quot;weight&quot;: 0.8
                }
            },
            {
                &quot;name&quot;: &quot;boost&quot;,
                &quot;type&quot;: &quot;Rerank&quot;,
                &quot;inputFieldNames&quot;: [],
                &quot;outputFieldNames&quot;: [],
                &quot;params&quot;: {
                    &quot;reranker&quot;: &quot;boost&quot;,
                    &quot;random_score&quot;: {&quot;seed&quot;: 126},
                    &quot;weight&quot;: 0.4
                }
            }
        ],
        &quot;params&quot;: {
            &quot;boost_mode&quot;: &quot;Multiply&quot;,
            &quot;function_mode&quot;: &quot;Sum&quot;
        }
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>具体的には、2つのBoost Rankerがあります。1つは検出されたすべてのエンティティに固定の重みを適用し、もう1つはそれらにランダムな重みを割り当てます。次に、これら2つのランカー<strong>をFunctionScore内で</strong>参照します。<strong>FunctionScoreでは</strong>、重みが検出されたエンティティのスコアにどのように影響するかも定義されます。</p>
<p>以下の表は、<strong>FunctionScoreインスタンス</strong>を作成するために必要なパラメータを一覧にしたものです。</p>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>必須？</p></th>
     <th><p>説明</p></th>
     <th><p>値/例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">functions</code></p></td>
     <td><p>はい</p></td>
     <td><p>リスト内のターゲット・ランカーの名前を指定します。</p></td>
     <td><p><code translate="no">["fix_weight_ranker", "random_weight_ranker"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.boost_mode</code></p></td>
     <td><p>いいえ</p></td>
     <td><p>指定された重みが、一致するエンティティのスコアにどのように影響するかを指定します。</p><p>指定可能な値は次のとおりです：</p><ul><li><p><code translate="no">Multiply</code></p><p>重み付けされた値が、一致するエンティティの元のスコアに指定された重みを乗じた値に等しくなることを示します。 </p><p>これがデフォルト値です。</p></li><li><p><code translate="no">Sum</code></p><p>重み付けされた値が、一致するエンティティの元のスコアと指定された重みの和に等しくなることを示します。</p></li></ul></td>
     <td><p><code translate="no">"Sum"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function_mode</code></p></td>
     <td><p>なし</p></td>
     <td><p>さまざまな Boost ランカーからの重み付き値の処理方法を指定します。</p><p>指定可能な値は次のとおりです。</p><ul><li><p><code translate="no">Multiply</code></p><p>一致したエンティティの最終スコアが、すべての Boost Ranker からの重み付き値の積に等しくなることを示します。</p><p>これがデフォルト値です。</p></li><li><p><code translate="no">Sum</code></p><p>一致したエンティティの最終スコアが、すべてのBoostランカーからの重み付き値の合計に等しくなることを示します。</p></li></ul></td>
     <td><p><code translate="no">"Sum"</code></p></td>
   </tr>
</table>
