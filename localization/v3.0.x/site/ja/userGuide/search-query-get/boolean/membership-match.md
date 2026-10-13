---
id: membership-match.md
title: メンバーシップ・マッチCompatible with Milvus v3.0.2+
summary: >-
  コンパクトなブルームフィルターや完全なローリングビットマップを使用して、大規模なメンバーセットに対してエンティティのフィルタリングを行います。これには、構文、SDKリクエストパターン、削除のセマンティクス、および操作上の制限が含まれます。
beta: Milvus v3.0.2+
---
<h1 id="Membership-Match" class="common-anchor-header">メンバーシップ・マッチ<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v3.0.2+</span><button data-href="#Membership-Match" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">概要<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>メンバーシップマッチは、スカラーフィールドの値が呼び出し元から提供された集合に属するかどうかを検証することで、エンティティをフィルタリングします。クライアントは、コンパクトなバイナリ形式のメンバーシップフィルタブロブを構築し、それを式テンプレートの値として渡します。</p>
<p>これは、大規模な<code translate="no">IN [...]</code> リストに代わるものです。<code translate="no">IN</code> フィルターは、すべてのメンバーをリクエストにシリアライズするため、メンバーセットが十分に大きい場合、プロキシのgRPC受信制限を超える可能性があります。<code translate="no">membership_match</code> を使用すると、プロキシはblobを検証し、メンバーリストを再構築することなくクエリプランに埋め込みます。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/membership-match-workflow.jpg" alt="Membership Match workflow: the client builds a reusable blob, the proxy validates it, and QueryNodes evaluate it." class="doc-image" id="membership-match-workflow:-the-client-builds-a-reusable-blob,-the-proxy-validates-it,-and-querynodes-evaluate-it." /> 
   <span>メンバーシップ・マッチのワークフロー：クライアントが再利用可能なblobを構築し、プロキシがそれを検証し、QueryNodesがそれを評価します。</span>
  
 </span></p>
<p>この図は、固定された役割分担を示しています。クライアントは Blob を一度構築してリクエスト間で再利用し、プロキシはエンベロープとサイズ制限を検証して Blob をそのままクエリプランに埋め込み、QueryNodes は生データまたはインデックスに対してそのプランを評価します。</p>
<p>この演算子には、正確性の保証レベルが異なる 2 種類のエンコーディングがあります：</p>
<ul>
<li><strong>Bloom</strong>(<code translate="no">type=bloom</code>): 近似メンバーシップ。偽陽性が発生する可能性がありますが、有効なフィルタでは偽陰性は想定されません。代表的な用途：時折の偽陽性が許容される、大規模なオーディエンス向けフィルタや除外フィルタ。</li>
<li><strong>Roaring</strong>(<code translate="no">type=roaring</code>): 整数値に対する厳密なメンバーシップ判定。代表的な用途：ACL、テナントの可視性、コンプライアンス・フィルター、および ID セットによる削除操作。</li>
</ul>
<p>認証の決定や破壊的な削除には、<strong>ブルーム</strong>メンバーシップを使用しないでください。誤検知が発生すると、意図したセットに含まれていないエンティティが公開されたり、削除されたりする可能性があります。</p>
<h3 id="Operational-checklist" class="common-anchor-header">運用チェックリスト<button data-href="#Operational-checklist" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>対象フィールドの型を確認し、その値のドメインに基づいてBLOBを構築してください。</li>
<li>誤検知が許容できる場合にのみ、ブルームを選択してください。</li>
<li>ACL、コンプライアンス、テナントの分離、および削除操作には「Roaring」を選択してください。</li>
<li>大きな Blob は一度生成して再利用し、リクエストごとに再生成しないでください。</li>
<li>Blobのサイズを、メンバー数ではなくシリアライズされたバイト数で予算を立てる。</li>
<li>バージョンが混在するクラスターでは、<code translate="no">membership_match</code> を有効にする前に、プロキシから順にローリングアップグレードを完了させてください。</li>
<li>破壊的なワークフローを有効にする前に、本番環境以外のコレクションで式をテストしてください。</li>
</ul>
<h2 id="Expression-syntax" class="common-anchor-header">式の構文<button data-href="#Expression-syntax" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-text">membership_match(&lt;field&gt;, {&lt;template&gt;}, type=bloom)
membership_match(&lt;field&gt;, {&lt;template&gt;}, type=roaring)
membership_match(&lt;field&gt;, {&lt;template&gt;})
not membership_match(&lt;field&gt;, {&lt;template&gt;}, type=bloom)
<button class="copy-code-btn"></button></code></pre>
<p>2 番目の引数はテンプレートのプレースホルダーです。SDK は、クライアントが構築したフィルター Blob を含む protobuf<code translate="no">bytes</code> として、プレースホルダーの値を提供します。本番環境の式では、<code translate="no">type</code> を明示的に指定し、意図した正確性の契約がコードやログで確認できるようにしてください。</p>
<p><code translate="no">type</code> 引数はオプションです。すべてのブロブには自己記述型のマジックヘッダー（Bloomの場合は<code translate="no">MBF1</code> 、Roaringの場合は<code translate="no">MRB1</code> ）が含まれており、<code translate="no">type</code> が省略された場合、サーバーはこのヘッダーを検知します。ブロブのヘッダーと競合する明示的な<code translate="no">type</code> はリクエストエラーとして拒否され、不明または切り詰められたヘッダーはfail-closed状態となります。</p>
<h2 id="Choose-the-encoding" class="common-anchor-header">エンコーディングの選択<button data-href="#Choose-the-encoding" class="anchor-icon" translate="no">
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
    </button></h2><p>誤検知（false positive）が許容できる場合は、Bloomを使用してください。Bloomは、符号付き整数フィールド（<strong>INT8/16/32/64</strong>）、<strong>VARCHARフィールド</strong>、および<strong>JSONパス</strong>を受け付けます。Bloomフィルターは厳密な許可リストではありません。</p>
<p><code translate="no">fpr</code> （偽陽性率）とは、値が一度も挿入されていないにもかかわらず、Bloomフィルタがその値をメンバーとして報告する確率のことです。<code translate="no">fpr=0.005</code> の場合、およそ200個に1個の非メンバー値が、誤って存在すると報告されることを意味します。fprが低いほど、blobのサイズは大きくなります。</p>
<p>すべての一致が完全一致でなければならない場合は、<strong>Roaring</strong>を使用してください。<strong>Roaringは</strong>符号付き整数フィールドのみを受け付けます。メンバーはシリアライズ前に<strong>INT64</strong>に符号拡張されるため、INT8の-1とINT64の-1は同じメンバーとなります。UUIDやその他の文字列フィールドには使用しないでください。</p>
<table>
<thead>
<tr><th>ディメンション</th><th>Bloom (type=bloom)</th><th>Roaring (type=roaring)</th></tr>
</thead>
<tbody>
<tr><td>精度</td><td>近似；偽陽性の可能性あり；偽陰性なし</td><td>正確；偽陽性および偽陰性なし</td></tr>
<tr><td>フィールド</td><td>INT8/16/32/64、VARCHAR、JSONパス</td><td>符号付き INT8/16/32/64 のみ</td></tr>
<tr><td>BLOB サイズ</td><td>メンバー数と FPR。FPR 0.005 の場合、メンバー 1 つあたり約 11 ビット。本体は 2 の冪</td><td>値の分布。密度の高い集合ははるかに小さなサイズに圧縮される。ランダムな 64 ビットの値は、コンテナの上限である 262,144 に達する</td></tr>
<tr><td>削除</td><td>解析時に拒否される</td><td>許可</td></tr>
<tr><td>代表的な用途</td><td>対象および除外フィルター</td><td>ACL、コンプライアンス、テナントの分離、IDセットによる削除</td></tr>
</tbody>
</table>
<p><strong>JSON</strong>パスは、行ごとに厳密に型指定されます。<strong>JSON</strong>文字列は<strong>VARCHAR</strong>値として、<strong>JSON</strong>整数は<strong>INT64</strong>値として検査され、<strong>JSON</strong>倍精度浮動小数点数は整数メンバーとは決して一致しません。これは、5.0 が 5. に等しい厳密な<code translate="no">IN</code> とは異なります。 ライターが整数を浮動小数点形式でエンコードする場合は、書き込み時に正規化するか、型付きスカラーフィールドを使用してください。</p>
<p>どちらのエンコーディングの場合も、ターゲットフィールドと同じ値ドメインからメンバセットを構築してください。 文字列<code translate="no">&quot;10086&quot;</code> からブルームフィルタを構築し、それを<code translate="no">INT64</code> フィールドに適用しないでください。BLOB ヘッダーには挿入された値のドメインが記録されており、ドメインが間違っている BLOB は、何も一致しないまま黙って処理されるのではなく、パラメータエラーとしてプロキシによって拒否されます。クエリごとに BLOB を再構築するのではなく、構築済みの BLOB をリクエスト間で再利用してください。</p>
<p>メンバー数が数千以下のセットについては、単純な `<code translate="no">IN</code> ` が依然として最も簡単な選択肢です。サーバーは<strong>`IN`</strong>、<strong>`Bloom`</strong>、<strong>`Roaring</strong>` のいずれかを選択することはありません。エンコーディングの選択は呼び出し側の責任です。</p>
<p>エンコーディングを選択するには：</p>
<ol>
<li>ワークロードが誤検知（false positive）を許容するかどうかを判断します。許容しない場合は、<strong>Bloomは</strong>選択肢になりません。</li>
<li>正確なメンバーシップが必要な場合は、符号付き整数フィールドを使用して<strong>Roaring</strong>を使用します。値が密集している場合やクラスタ化されている場合は、Blob が最小サイズに圧縮されます。</li>
<li>サイズ制限を確認します。一様乱数による 64 ビット値は、コンテナの上限である 262,144 またはサイズ制限を超える可能性があります。その場合は、リクエストの制限に収まる従来の<strong>IN</strong>リストを使用してください。</li>
<li>整数以外のフィールドで厳密なメンバーシップを指定する場合は、<strong>IN</strong>を使用してください。これらのフィールドには、厳密なメンバーシップのエンコーディングは存在しません。</li>
</ol>
<p>メンバーシップの一致判定は、RESTful HTTP API では利用できません。HTTP 式テンプレートのパラメータは、bool、number、string、および array 値のみを受け付けます。blob 用のバイナリ型 `<code translate="no">bytes</code> ` は存在しません。メンバーシップ blob を渡すには、gRPC ベースの SDK を使用してください。</p>
<h2 id="SDK-request-patterns" class="common-anchor-header">SDKのリクエストパターン<button data-href="#SDK-request-patterns" class="anchor-icon" translate="no">
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
    </button></h2><p>以下のスニペットは、メンバーシップブロブの構築と、それらをフィルタテンプレートパラメータとして渡すことに焦点を当てています。これらは、コレクションとフィールドがすでに存在し読み込まれていること、SDKクライアントが接続されていること、およびクエリベクトル、メンバーリスト、その他の参照変数が定義されていることを前提としています。コレクションの設定やアプリケーションの完全なスケルトン構築については省略しています。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#go">   Go</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, build_bloom_filter, build_roaring_bitmap

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
bloom_blob = build_bloom_filter([<span class="hljs-string">&quot;creator-a&quot;</span>, <span class="hljs-string">&quot;creator-b&quot;</span>], fpr=<span class="hljs-number">0.005</span>)
client.search(collection_name=<span class="hljs-string">&quot;posts&quot;</span>, data=[query_vector], anns_field=<span class="hljs-string">&quot;embedding&quot;</span>, limit=<span class="hljs-number">10</span>,
              <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(creator_id, {members}, type=bloom)&quot;</span>,
              filter_params={<span class="hljs-string">&quot;members&quot;</span>: bloom_blob})

roaring_blob = build_roaring_bitmap([<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>])
client.query(collection_name=<span class="hljs-string">&quot;docs&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(user_id, {members}, type=roaring)&quot;</span>,
             filter_params={<span class="hljs-string">&quot;members&quot;</span>: roaring_blob}, output_fields=[<span class="hljs-string">&quot;user_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">bloomBlob, err := milvusclient.NewBloomFilterBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>}, fpr)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
search := milvusclient.NewSearchOption(<span class="hljs-string">&quot;posts&quot;</span>, topK, vectors).
    WithFilter(<span class="hljs-string">&quot;membership_match(creator_id, {members}, type=bloom)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, bloomBlob)

roaringBlob, err := milvusclient.NewRoaringBitmapBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
query := milvusclient.NewQueryOption(<span class="hljs-string">&quot;docs&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;membership_match(user_id, {members}, type=roaring)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">byte</span>[] bloomBlob = BloomFilterUtils.buildBloomFilter(userIds, BloomFilterUtils.DEFAULT_FPR);
<span class="hljs-type">QueryReq</span> <span class="hljs-variable">request</span> <span class="hljs-operator">=</span> QueryReq.builder().collectionName(<span class="hljs-string">&quot;docs&quot;</span>)
    .filter(<span class="hljs-string">&quot;membership_match(user_id, {members}, type=bloom)&quot;</span>)
    .filterTemplateValues(Collections.singletonMap(<span class="hljs-string">&quot;members&quot;</span>, bloomBlob)).build();
<span class="hljs-type">byte</span>[] roaringBlob = RoaringBitmapUtils.buildRoaringBitmap(userIds);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> bloomBlob = <span class="hljs-title function_">buildBloomFilter</span>(userIds);
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;docs&#x27;</span>,
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;membership_match(user_id, {members}, type=bloom)&#x27;</span>,
  <span class="hljs-attr">exprValues</span>: { <span class="hljs-attr">members</span>: bloomBlob } });
<span class="hljs-keyword">const</span> roaringBlob = <span class="hljs-title function_">buildRoaringBitmap</span>(integerIds);
<button class="copy-code-btn"></button></code></pre>
<h2 id="Delete-with-Roaring" class="common-anchor-header">Roaring を使用した削除<button data-href="#Delete-with-Roaring" class="anchor-icon" translate="no">
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
    </button></h2><p>外部の整数IDセットで選択されたエンティティを削除する際は、厳密<strong>なRoaring</strong>Blobを使用してください。削除を実行する前に、メンバーセットとコレクションのフィールド型を確認してください。Bloomは使用しないでください。近似メンバーシップは安全な削除述語ではなく、Bloom形式は解析時にDelete式で拒否されます。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#go">   Go</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
</div>
<pre><code translate="no" class="language-python">roaring_blob = build_roaring_bitmap([<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>])
client.delete(collection_name=<span class="hljs-string">&quot;docs&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>,
              filter_params={<span class="hljs-string">&quot;members&quot;</span>: roaring_blob})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">roaringBlob, err := milvusclient.NewRoaringBitmapBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
_, err = client.Delete(ctx, milvusclient.NewDeleteOption(<span class="hljs-string">&quot;docs&quot;</span>).
    WithExpr(<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">byte</span>[] roaringBlob = RoaringBitmapUtils.buildRoaringBitmap(userIds);
<span class="hljs-type">DeleteReq</span> <span class="hljs-variable">request</span> <span class="hljs-operator">=</span> DeleteReq.builder().collectionName(<span class="hljs-string">&quot;docs&quot;</span>)
    .filter(<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>)
    .filterTemplateValues(Collections.singletonMap(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob)).build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> roaringBlob = <span class="hljs-title function_">buildRoaringBitmap</span>(integerIds);
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">delete</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;docs&#x27;</span>,
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;membership_match(id, {members}, type=roaring)&#x27;</span>,
  <span class="hljs-attr">exprValues</span>: { <span class="hljs-attr">members</span>: roaringBlob } });
<button class="copy-code-btn"></button></code></pre>
<p>削除のセマンティクスは、厳密な三値マッチングに従います：</p>
<table>
<thead>
<tr><th>フィールド値</th><th>membership_match(…)</th><th>not membership_match(…)</th></tr>
</thead>
<tbody>
<tr><td>NULL</td><td>一致なし (NULL)</td><td>一致なし (NULL)</td></tr>
<tr><td>メンバーセット内</td><td>一致</td><td>一致なし</td></tr>
<tr><td>集合外</td><td>一致なし</td><td>一致</td></tr>
</tbody>
</table>
<p>この表は行ごとに次のように読み取れます。<code translate="no">membership_match</code> による削除はセット内のエンティティを削除し、<code translate="no">not membership_match</code> による削除はセット外のエンティティを削除し、NULL のエンティティはどちらの極性でも削除されません。</p>
<ul>
<li>フィールド値が NULL のエンティティは、どちらの極性でも削除されることはありません。</li>
<li>空のビットマップは何も削除しません。<code translate="no">not membership_match(&lt;field&gt;, {&lt;empty&gt;}, type=roaring)</code> は、フィールド値が NULL ではないすべてのエンティティを削除します。これは正確な補集合であり、設計上、大きな集合になる場合があります。</li>
<li><code translate="no">not membership_match</code> これは、NULL ではないエンティティに対するメンバーセットの厳密な補集合であり、近似値ではありません。</li>
</ul>
<p>インデックスのみが読み込まれ、生のスカラーデータがないシールドされたセグメントでは、インデックスがサポートしている場合、評価には境界付き逆引きが使用されます。生のフィールドデータも適格なインデックスも利用できない場合、リクエストはフィルタリングされていないエンティティを返すのではなく、<code translate="no">FieldNotLoaded</code> として失敗します。</p>
<h2 id="Operational-limits" class="common-anchor-header">操作上の制限<button data-href="#Operational-limits" class="anchor-icon" translate="no">
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
<tr><th>設定</th><th>デフォルト</th><th>設定可能</th><th>制限対象</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">proxy.maxMembershipFilterSize</code></td><td>64 MiB</td><td><code translate="no">milvus.yaml</code> プロキシ</td><td>1つのBlob本体</td></tr>
<tr><td><code translate="no">proxy.maxMembershipFilterPlanSize</code></td><td>128 MiB</td><td><code translate="no">milvus.yaml</code> プロキシ</td><td>リクエストごとの集計値</td></tr>
<tr><td><code translate="no">proxy.grpc.serverMaxRecvSize</code></td><td>128 MiB</td><td><code translate="no">milvus.yaml</code> プロキシ</td><td>リクエスト全体</td></tr>
<tr><td>Roaringのコンテナ上限</td><td>262,144</td><td>コード内で修正済み</td><td>フィルタごとに</td></tr>
<tr><td>Roaringのデコード済みメモリ推定値</td><td>64 MiB</td><td>コード内で固定</td><td>フィルタごとに</td></tr>
<tr><td>MBF1 フォーマットの上限</td><td>128 MiB</td><td>コードで固定</td><td>BLOB 形式の上限</td></tr>
<tr><td>ブルーム<code translate="no">fpr</code></td><td>0.005</td><td>クライアントビルダー</td><td>偽陽性のターゲット</td></tr>
</tbody>
</table>
<p><code translate="no">proxy.*</code> の設定はMilvusサーバーの設定です。これらはクラスターオペレーターが<code translate="no">milvus.yaml</code> の<code translate="no">proxy</code> セクションで設定するものであり、フィルタリング時にリクエストごとや式ごとに調整することはできません。<strong>Roaring</strong>admissions および MBF1 フォーマットの上限は実装上で固定されており、どこでも設定することはできません。<code translate="no">fpr</code> 行は、クライアント側で制御できる唯一の項目です。これは Blob の構築時に選択され、許容範囲は 0.0001 から 0.05 です。</p>
<p>Blob ボディの最大容量は、デフォルトの FPR において約 4,860 万個の INT64 メンバーを収容可能であり、その上に固定の 32 バイトのエンベロープヘッダーが追加されます。 リクエスト全体の予算は、メンバーを含むプランのシリアライズされた合計サイズと、Roaringフィルターのデコード後の推定合計サイズをカバーしており、HybridSearchのサブリクエストとスコアラーフィルターはこの予算を共有します。ブルームボディのサイズは2の冪になります。つまり、メンバー数がティアの境界をわずかに超えるとBLOBのサイズは2倍になり、FPRをわずかに高く設定すると、多くの場合、1つ下のティアに収まります。 プロキシがサイズ超過のブルームブロブを拒否した場合、エラーメッセージには、収まる<code translate="no">fpr</code> が示唆されます。</p>
<ul>
<li>メンバーシップ式の結果は、リクエスト間でキャッシュされません。</li>
<li>バージョンが混在するクラスタでは、クエリが失敗します。古いコードを実行しているクエリノードは、メンバーシッププランノードを含むプランを拒否します。まずプロキシをアップグレードし、オペレーターを有効にする前にローリングアップグレードを完了させてください。</li>
<li>サーバーログでは、ブロブのバイトデータが伏せられます。式テキストにはテンプレート名のみが含まれ、バイナリペイロードはテンプレート値として帯域外で送信されます。</li>
</ul>
