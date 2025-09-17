---
id: boost-ranker.md
title: ブースト・ランカーCompatible with Milvus v2.6.2+
summary: >-
  ブースト・ランカーは、ベクトル距離に基づいて計算された意味的類似性だけに頼るのではなく、意味のある方法で検索結果に影響を与えることができます。メタデータフィルタリングを使って検索結果を素早く調整するのに最適です。
beta: Milvus v2.6.2+
---
<h1 id="Boost-Ranker" class="common-anchor-header">ブースト・ランカー<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.2+</span><button data-href="#Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>ブースト・ランカーは、ベクトル距離に基づいて計算された意味的類似性だけに頼るのではなく、意味のある方法で検索結果に影響を与えることができます。メタデータフィルタリングを使って検索結果を素早く調整するのに理想的です。</p>
<p>検索リクエストにBoost Ranker機能が含まれている場合、Milvusは機能内のオプションのフィルタリング条件を使用して検索結果候補の中から一致するものを見つけ、指定されたウェイトを適用することで一致したエンティティのスコアをブーストし、最終結果における一致したエンティティの順位を昇格または降格させます。</p>
<h2 id="When-to-use-Boost-Ranker" class="common-anchor-header">Boost Rankerを使用するタイミング<button data-href="#When-to-use-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>クロスエンコーダーモデルやフュージョンアルゴリズムに依存する他のランカーとは異なり、Boost Rankerはオプションのメタデータドリブンルールをランキングプロセスに直接注入します。</p>
<table>
   <tr>
     <th><p>使用例</p></th>
     <th><p>使用例</p></th>
     <th><p>Boost Rankerが効果的な理由</p></th>
   </tr>
   <tr>
     <td><p>ビジネス主導のコンテンツ優先順位付け</p></td>
     <td><ul><li><p>Eコマースの検索結果でプレミアム商品を強調する</p></li><li><p>ユーザーエンゲージメント指標（閲覧数、「いいね！」数、シェア数など）が高いコンテンツの認知度を高める</p></li><li><p>タイムセンシティブな検索アプリケーションで最近のコンテンツを上位表示する</p></li><li><p>検証済みまたは信頼できるソースからのコンテンツを優先する</p></li><li><p>正確なフレーズまたは関連性の高いキーワードに一致する検索結果を高める</p></li></ul></td>
     <td rowspan="2"><p>インデックスを再構築したり、ベクトル埋め込みモデルを変更したりする必要がなく、オプションのメタデータフィルタをリアルタイムに適用することで、検索結果で特定のアイテムを即座に昇格または降格させることができます。このメカニズムにより、進化するビジネス要件に容易に適応する、柔軟でダイナミックな検索ランキングが可能になります。</p></td>
   </tr>
   <tr>
     <td><p>戦略的コンテンツダウンランキング</p></td>
     <td><ul><li><p>完全に削除することなく、在庫の少ないアイテムの順位を下げます。</p></li><li><p>検閲を行うことなく、好ましくない用語が含まれる可能性のあるコンテンツのランクを下げる。</p></li><li><p>技術的な検索でアクセス可能な状態を維持しながら、古いドキュメントの順位を下げます。</p></li><li><p>マーケットプレイス検索で競合製品の可視性を微妙に下げる</p></li><li><p>低品質表示（フォーマットの問題、長さが短いなど）のコンテンツの関連性を低下させます。</p></li></ul></td>
   </tr>
</table>
<p>複数のBoost Rankerを組み合わせて、よりダイナミックで強固なウェイトベースのランキング戦略を実施することもできます。</p>
<h2 id="Mechanism-of-Boost-Ranker" class="common-anchor-header">ブースト・ランカーのメカニズム<button data-href="#Mechanism-of-Boost-Ranker" class="anchor-icon" translate="no">
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
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/boost-ranker-mechanism.png" alt="Boost Ranker Mechanism" class="doc-image" id="boost-ranker-mechanism" />
   </span> <span class="img-wrapper"> <span>ブーストランカーのメカニズム</span> </span></p>
<p>データを挿入すると、milvusはデータをセグメントに分散します。検索中、各セグメントは候補のセットを返し、Milvusはすべてのセグメントからこれらの候補をランク付けし、最終結果を生成します。検索リクエストにBoost Rankerが含まれている場合、Milvusは各セグメントからの候補結果にBoost Rankerを適用し、潜在的な精度の低下を防ぎ、リコールを向上させます。</p>
<p>結果を確定する前に、Milvusはこれらの候補をBoost Rankerで以下のように処理します：</p>
<ol>
<li><p>Boost Rankerで指定されたオプションのフィルタリング式を適用し、式に一致するエンティティを特定する。</p></li>
<li><p>Boost Ranker で指定された重みを適用して、特定されたエンティティのスコアをブーストする。</p></li>
</ol>
<div class="alert note">
<p>Boost Ranker をマルチベクトルハイブリッドサーチのランカーとして使用することはできません。ただし、サブリクエスト(<code translate="no">AnnSearchRequest</code>)のランカーとして使用することはできます。</p>
</div>
<h2 id="Examples-of-Boost-Ranker" class="common-anchor-header">Boost ランカーの使用例<button data-href="#Examples-of-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>次の例は、最も関連性の高い上位 5 つのエンティティを返す必要がある単一ベクトル検索で Boost ランカーを使用し、抽象 doc タイプのエンティティのスコアに重みを追加する例です。</p>
<ol>
<li><p><strong>検索結果の候補をセグメントで収集する。</strong></p>
<p>次の表は、Milvusがエンティティを2つのセグメント<strong>（0001と</strong> <strong>0002</strong>）に分配し、各セグメントが5つの候補を返すと仮定しています。</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>docタイプ</p></th>
<th><p>スコア</p></th>
<th><p>ランク</p></th>
<th><p>セグメント</p></th>
</tr>
<tr>
<td><p>117</p></td>
<td><p>抽象的</p></td>
<td><p>0.344</p></td>
<td><p>1</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>89</p></td>
<td><p>抽象</p></td>
<td><p>0.456</p></td>
<td><p>2</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>ボディ</p></td>
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
<td><p>ボディ</p></td>
<td><p>0.899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>ボディ</p></td>
<td><p>0.189</p></td>
<td><p>1</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>ボディ</p></td>
<td><p>0265</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>561</p></td>
<td><p>抽象的</p></td>
<td><p>0.366</p></td>
<td><p>3</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>344</p></td>
<td><p>抽象</p></td>
<td><p>0.444</p></td>
<td><p>4</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>276</p></td>
<td><p>アブストラクト</p></td>
<td><p>0.845</p></td>
<td><p>5</p></td>
<td><p>0002</p></td>
</tr>
</table></p></li>
<li><p><strong>Boost Ranker (</strong><code translate="no">doctype='abstract'</code><strong>) で指定されたフィルタリング式を適用する</strong>。</p>
<p>以下の表の<code translate="no">DocType</code> フィールドで示されるように、Milvusは<code translate="no">doctype</code> が<code translate="no">abstract</code> に設定されたすべてのエンティティをマークし、さらなる処理を行う。</p>
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
<td><p><strong>抽象的</strong></p></td>
<td><p><strong>0.344</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>抽象</strong></p></td>
<td><p><strong>0.456</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>ボディ</p></td>
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
<td><p>ボディ</p></td>
<td><p>0.899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>ボディ</p></td>
<td><p>0.189</p></td>
<td><p>1</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>ボディ</p></td>
<td><p>0265</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>抽象的</strong></p></td>
<td><p><strong>0.366</strong></p></td>
<td><p><strong>3</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>抽象</strong></p></td>
<td><p><strong>0.444</strong></p></td>
<td><p><strong>4</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>276</strong></p></td>
<td><p><strong>アブストラクト</strong></p></td>
<td><p><strong>0.845</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
</table></p></li>
<li><p><strong>Boost Ranker (</strong><code translate="no">weight=0.5</code><strong>) で指定された重みを適用する</strong>。</p>
<p>前のステップで識別されたすべてのエンティティに、Boost Ranker で指定された重みが乗算され、ランクが変更される。</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>DocType</p></th>
<th><p>スコア</p></th>
<th><p>重み付きスコア </p><p>(=スコア×重み)</p></th>
<th><p>ランク</p></th>
<th><p>セグメント</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>抽象的</strong></p></td>
<td><p><strong>0.344</strong></p></td>
<td><p><strong>0.172</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>抽象的</strong></p></td>
<td><p><strong>0.456</strong></p></td>
<td><p><strong>0.228</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>ボディ</p></td>
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
<td><p>ボディ</p></td>
<td><p>0.899</p></td>
<td><p>0.899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>抽象的</strong></p></td>
<td><p><strong>0.366</strong></p></td>
<td><p><strong>0.183</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>ボディ</p></td>
<td><p>0.189</p></td>
<td><p>0.189</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>抽象的</strong></p></td>
<td><p><strong>0.444</strong></p></td>
<td><p><strong>0.222</strong></p></td>
<td><p><strong>3</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>ボディ</p></td>
<td><p>0.265</p></td>
<td><p>0.265</p></td>
<td><p>4</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>276</strong></p></td>
<td><p><strong>抽象的</strong></p></td>
<td><p><strong>0.845</strong></p></td>
<td><p><strong>0.423</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
</table></p>
<p><div class="alert note"></p>
<p>重みは浮動小数点数で指定する。上記の例のように、スコアが小さいほど関連性が高い場合は、<strong>1より</strong>小さいウェイトを使用します。そうでない場合は、<strong>1より</strong>大きいウェイトを使用します。</p>
<p></div></p></li>
<li><p><strong>すべてのセグメントの候補を、重み付けされたスコアに基づいて集計し、結果を確定する。</strong></p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>ドックタイプ</p></th>
<th><p>スコア</p></th>
<th><p>重み付けスコア</p></th>
<th><p>順位</p></th>
<th><p>セグメント</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>抽象的</strong></p></td>
<td><p><strong>0.344</strong></p></td>
<td><p><strong>0.172</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>抽象的</strong></p></td>
<td><p><strong>0.366</strong></p></td>
<td><p><strong>0.183</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>ボディ</p></td>
<td><p>0.189</p></td>
<td><p>0.189</p></td>
<td><p>3</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>抽象的</strong></p></td>
<td><p><strong>0.444</strong></p></td>
<td><p><strong>0.222</strong></p></td>
<td><p><strong>4</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>抽象的</strong></p></td>
<td><p><strong>0.456</strong></p></td>
<td><p><strong>0.228</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
</table></p></li>
</ol>
<h2 id="Usage-of-Boost-Ranker" class="common-anchor-header">Boost Rankerの使用法<button data-href="#Usage-of-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>このセクションでは、単一ベクトル検索の結果に影響を与えるBoost Rankerの使用例を紹介します。</p>
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
    </button></h3><p>検索リクエストのリランカーとしてBoost Rankerを渡す前に、以下のようにBoost Rankerをリランカー関数として適切に定義する必要があります：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

ranker = Function(
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
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>必須か？</p></th>
     <th><p>説明</p></th>
     <th><p>値/例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>はい</p></td>
     <td><p>このファンクションの一意な識別子</p></td>
     <td><p><code translate="no">"rrf"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>はい</p></td>
     <td><p>関数を適用するベクトルフィールドのリスト（RRFランカーでは空でなければならない）</p></td>
     <td><p><code translate="no">[]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>はい</p></td>
     <td><p>呼び出すFunctionのタイプ。<code translate="no">RERANK</code> を使用してリランキング戦略を指定する。</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>はい</p></td>
     <td><p>リランカーのタイプを指定する。</p><p>Boost Ranker を使用するには<code translate="no">boost</code> に設定する必要がある。</p></td>
     <td><p><code translate="no">"boost"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.weight</code></p></td>
     <td><p>はい</p></td>
     <td><p>生の検索結果で一致したエンティティのスコアに乗 じる重みを指定する。</p><p>値は浮動小数点数でなければならない。 </p><ul><li><p>一致するエンティティの重要性を強調するには、スコアを押し上げる値に設定します。</p></li><li><p>一致するエンティティを降格させるには、スコアを下げる値をこのパラメータに割り当てます。</p></li></ul></td>
     <td><p><code translate="no">1</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.filter</code></p></td>
     <td><p>No</p></td>
     <td><p>検索結果のエンティティ間のマッチングに使用するフィルタ式を指定する。<a href="/docs/ja/boolean.md">フィルタリングの説明</a>」で説明した、有効な基本フィルタ式を指定できます。</p><p><strong>注：</strong> <code translate="no">==</code> 、<code translate="no">&gt;</code> 、<code translate="no">&lt;</code> などの基本的な演算子のみを使用します。<code translate="no">text_match</code> 、<code translate="no">phrase_match</code> などの高度な演算子を使用すると、検索パ フォーマンスが低下します。</p></td>
     <td><p><code translate="no">"doctype == 'abstract'"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.random_score</code></p></td>
     <td><p>No</p></td>
     <td><p><code translate="no">0</code> と<code translate="no">1</code> の間の値をランダムに生成するランダム関数を指定します。以下の 2 つのオプション引数を持つ：</p><ul><li><p><code translate="no">seed</code> (数値）擬似乱数生成器（PRNG）を開始するための初期値を指定する。</p></li><li><p><code translate="no">field</code> (文字列) 乱数を生成する際に乱数因子として使用されるフィールド名を指定します。一意な値を持つフィールドで十分です。</p><p><code translate="no">seed</code> と<code translate="no">field</code> の両方を設定し、同じシードとフィールド値を使用することで、世代間の一貫性を確保することをお勧めします。</p></li></ul></td>
     <td><p><code translate="no">{"seed": 126, "field": "id"}</code></p></td>
   </tr>
</table>
<h3 id="Search-with-a-single-Boost-Ranker" class="common-anchor-header">単一のBoost Rankerで検索する<button data-href="#Search-with-a-single-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Boost Ranker関数の準備ができたら、検索リクエストで参照することができます。以下の例では、<strong>id</strong>、<strong>vector</strong>、<strong>doctypeという</strong>フィールドを持つコレクションを作成済みであると仮定しています。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Connect to the Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Assume you have a collection set up</span>

<span class="hljs-comment"># Conduct a similarity search using the created ranker</span>
client.search(
    data=[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    params={},
    output_field=[<span class="hljs-string">&quot;doctype&quot;</span>],
    ranker=ranker
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Search-with-multiple-Boost-Rankers" class="common-anchor-header">複数のBoost Rankerを使った検索<button data-href="#Search-with-multiple-Boost-Rankers" class="anchor-icon" translate="no">
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
    </button></h3><p>検索結果に影響を与えるために、1つの検索で複数のBoost Rankerを組み合わせることができます。そのためには、複数の Boost Rankers を作成し、<strong>FunctionScore</strong>インスタンスでそれらを参照し、<strong>FunctionScore</strong>インスタンスを検索リクエストのランカーとして使用します。</p>
<p>次の例では、<strong>0.8</strong>から<strong>1.2</strong> の間の重みを適用して、識別されたすべてのエンティティのスコアを変更する方法を示します。</p>
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
    params: {
        <span class="hljs-string">&quot;boost_mode&quot;</span>: <span class="hljs-string">&quot;Multiply&quot;</span>
        <span class="hljs-string">&quot;function_mode&quot;</span>: <span class="hljs-string">&quot;Sum&quot;</span>
    }
)

<span class="hljs-comment"># Conduct a similarity search using the created Function Score</span>
client.search(
    data=[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    params={},
    output_field=[<span class="hljs-string">&quot;doctype&quot;</span>],
    ranker=ranker
)
<button class="copy-code-btn"></button></code></pre>
<p>具体的には、2 つの Boost ランカーがあり、1 つは見つかったすべてのエンティティに固定の重みを適用し、もう 1 つはランダムな重みを割り当てます。次に、<strong>FunctionScore</strong> でこれら 2 つのランカーを参照し、重みが検出されたエンティティのスコアにどのように影響するかを定義する。</p>
<p>次の表に、<strong>FunctionScore</strong>インスタンスの作成に必要なパラメータを示します。</p>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>必須か？</p></th>
     <th><p>説明</p></th>
     <th><p>値/例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">functions</code></p></td>
     <td><p>Yes</p></td>
     <td><p>対象ランカーの名前をリストで指定する。</p></td>
     <td><p><code translate="no">["fix_weight_ranker", "random_weight_ranker"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.boost_mode</code></p></td>
     <td><p>いいえ</p></td>
     <td><p>指定された重みが、一致するエンティティのスコアにどのように影響するかを指定します。</p><p>指定可能な値は以下のとおりです：</p><ul><li><p><code translate="no">Multiple</code></p><p>重み付けされた値が、一致するエンティティの元のスコアに指定の重みを乗じた値と等しいことを示します。 </p><p>これが既定値です。</p></li><li><p><code translate="no">Sum</code></p><p>重み付けされた値が、一致するエンティティの元のスコアと指定された重みの合計に等しいことを示します。</p></li></ul></td>
     <td><p><code translate="no">"Sum"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function_mode</code></p></td>
     <td><p>いいえ</p></td>
     <td><p>さまざまなブースト・ランカからの加重値の処理方法を指定します。</p><p>指定可能な値は以下のとおりです：</p><ul><li><p><code translate="no">Multiplify</code></p><p>一致するエンティティの最終スコアが、すべての Boost Rankers からの加重値の積に等しいことを示します。</p><p>これはデフォルト値です。</p></li><li><p><code translate="no">Sum</code></p><p>一致するエンティティの最終スコアが、すべてのブースト・ランカーからの加重値の合計に等しいことを示します。</p></li></ul></td>
     <td><p><code translate="no">"Sum"</code></p></td>
   </tr>
</table>
