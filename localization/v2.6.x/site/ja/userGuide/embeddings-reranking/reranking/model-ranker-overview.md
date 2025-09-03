---
id: model-ranker-overview.md
title: モデル・ランカーの概要Compatible with Milvus 2.6.x
summary: >-
  従来のベクトル検索は、純粋に数学的な類似性によって結果をランク付けする。効率的ではあるが、このアプローチはしばしば真の意味的関連性を見逃してしまう。データベース最適化のベストプラクティス」を検索することを考えてみましょう。ベクトル類似度が高く、これらの用語に頻繁に言及している文書を受け取るかもしれませんが、実際には実用的な最適化戦略を提供していません。
beta: Milvus 2.6.x
---
<h1 id="Model-Ranker-Overview" class="common-anchor-header">モデル・ランカーの概要<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Model-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>従来のベクトル検索は、純粋に数学的な類似性によって結果をランク付けする。効率的ではあるが、このアプローチはしばしば真の意味的関連性を見逃してしまう。例えば、<strong>「データベース最適化のベストプラクティス」を</strong>検索してみましょう。ベクトル類似度が高く、これらの用語に頻繁に言及している文書を受け取るかもしれませんが、実際には実用的な最適化戦略を提供しているわけではありません。</p>
<p>Model Rankerは、クエリとドキュメント間の意味的関係を理解する高度な言語モデルを統合することで、Milvusの検索を変えます。ベクトル類似度だけに頼るのではなく、コンテンツの意味と文脈を評価し、よりインテリジェントで関連性の高い結果を提供します。</p>
<h2 id="Limits" class="common-anchor-header">制限事項<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>モデル・ランカーはグループ化検索では使用できません。</p></li>
<li><p>モデル・ランカーに使用されるフィールドはテキスト型（<code translate="no">VARCHAR</code> ）でなければなりません。</p></li>
<li><p>各モデルランカーは、一度に1つのフィールド（<code translate="no">VARCHAR</code> ）のみを評価に使用することができます。</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">仕組み<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>モデルランカーは明確に定義されたワークフローを通じて、言語モデル理解機能をMilvusの検索プロセスに統合します：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/model-ranker-overview.png" alt="Model Ranker Overview" class="doc-image" id="model-ranker-overview" />
   </span> <span class="img-wrapper"> <span>モデルランカーの概要</span> </span></p>
<ol>
<li><p><strong>最初のクエリ</strong>：お客様のアプリケーションからMilvusへクエリが送信されます。</p></li>
<li><p><strong>ベクトル検索</strong>Milvusは標準的なベクトル検索を行い、候補文書を特定します。</p></li>
<li><p><strong>候補文書の検索</strong>ベクトル類似度に基づいて候補文書の初期セットを特定する。</p></li>
<li><p><strong>モデル評価</strong>モデルランカー機能はクエリと文書のペアを処理する：</p>
<ul>
<li><p>元のクエリと候補文書を外部のモデルサービスに送る。</p></li>
<li><p>言語モデルがクエリと各文書の意味的関連性を評価する。</p></li>
<li><p>各文書は意味理解に基づく関連性スコアを受け取る</p></li>
</ul></li>
<li><p><strong>インテリジェントな並べ替え</strong>：文書がモデルによって生成された関連性スコアに基づいて並べ替えられる。</p></li>
<li><p><strong>向上した結果</strong>：アプリケーションはベクトルの類似性だけでなく、意味的な関連性によってランク付けされた結果を受け取ります。</p></li>
</ol>
<h2 id="Choose-a-model-provider-for-your-needs" class="common-anchor-header">ニーズに合ったモデルプロバイダーを選択<button data-href="#Choose-a-model-provider-for-your-needs" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusは以下のリランキング用モデルサービスプロバイダをサポートしており、それぞれ特徴があります：</p>
<table>
   <tr>
     <th><p>プロバイダ</p></th>
     <th><p>最適</p></th>
     <th><p>特徴</p></th>
     <th><p>使用例</p></th>
   </tr>
   <tr>
     <td><p>vLLM</p></td>
     <td><p>深い意味理解とカスタマイズを必要とする複雑なアプリケーション</p></td>
     <td><ul>
<li><p>様々な大規模言語モデルをサポート</p></li>
<li><p>柔軟な展開オプション</p></li>
<li><p>より高い計算要件</p></li>
<li><p>より大きなカスタマイズの可能性</p></li>
</ul></td>
     <td><p>法律用語と判例関係を理解するドメイン固有のモデルを展開する法律研究プラットフォーム</p></td>
   </tr>
   <tr>
     <td><p>TEI</p></td>
     <td><p>効率的なリソース使用による迅速な実装</p></td>
     <td><ul>
<li><p>テキスト操作に最適化された軽量サービス</p></li>
<li><p>少ないリソース要件で容易な導入</p></li>
<li><p>最適化済みのリランキングモデル</p></li>
<li><p>インフラストラクチャーのオーバーヘッドを最小化</p></li>
</ul></td>
     <td><p>標準的な要件で効率的なリランキング機能を必要とするコンテンツ管理システム</p></td>
   </tr>
   <tr>
     <td><p>コヒーレ</p></td>
     <td><p>信頼性と統合の容易さを優先するエンタープライズ・アプリケーション</p></td>
     <td><ul>
<li><p>エンタープライズ・グレードの信頼性と拡張性</p></li>
<li><p>インフラストラクチャのメンテナンスが不要なマネージド・サービス</p></li>
<li><p>多言語リランキング機能</p></li>
<li><p>組み込みのレート制限とエラー処理</p></li>
</ul></td>
     <td><p>一貫したAPIパフォーマンスと多言語製品カタログによる高可用性検索を必要とするEコマースプラットフォーム</p></td>
   </tr>
   <tr>
     <td><p>Voyage AI</p></td>
     <td><p>特定のパフォーマンスとコンテキストを必要とするRAGアプリケーション</p></td>
     <td><ul>
<li><p>リランキングタスクのために特別にトレーニングされたモデル</p></li>
<li><p>多様なドキュメント長に対応するきめ細かな切り捨て制御</p></li>
<li><p>プロダクションワークロード用に最適化された推論</p></li>
<li><p>複数のモデルバリエーション（rerank-2、rerank-liteなど）</p></li>
</ul></td>
     <td><p>きめ細かなパフォーマンス制御と専門的な意味理解を必要とする、ドキュメントの長さが異なる研究用データベース</p></td>
   </tr>
   <tr>
     <td><p>シリコンフロー</p></td>
     <td><p>費用対効果を優先する長文のドキュメントを処理するアプリケーション</p></td>
     <td><ul>
<li><p>オーバーラップを設定できる高度なドキュメントチャンキング</p></li>
<li><p>チャンクベースのスコアリング（最もスコアの高いチャンクがドキュメントを表す）</p></li>
<li><p>多様な再ランク付けモデルをサポート</p></li>
<li><p>標準モデルとプロモデルのバリエーションで費用対効果に優れる</p></li>
</ul></td>
     <td><p>インテリジェントなセグメンテーションとオーバーラップ制御を必要とする長いマニュアルや論文を処理する技術文書検索システム</p></td>
   </tr>
</table>
<p>各モデルサービスの実装に関する詳細情報は、専用ドキュメントをご参照ください：</p>
<ul>
<li><p><a href="/docs/ja/vllm-ranker.md">vLLM ランカー</a></p></li>
<li><p><a href="/docs/ja/tei-ranker.md">TEIランカー</a></p></li>
<li><p><a href="/docs/ja/cohere-ranker.md">Cohere ランカー</a></p></li>
<li><p><a href="/docs/ja/voyage-ai-ranker.md">Voyage AI ランカー</a></p></li>
<li><p><a href="/docs/ja/siliconflow-ranker.md">SiliconFlow ランカー</a></p></li>
</ul>
<h2 id="Implementation" class="common-anchor-header">実装<button data-href="#Implementation" class="anchor-icon" translate="no">
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
    </button></h2><p>Model Rankerを実装する前に、以下を確認してください：</p>
<ul>
<li><p>再ランクされるテキストを含む<code translate="no">VARCHAR</code> フィールドを持つMilvusコレクション。</p></li>
<li><p>Milvusインスタンスにアクセス可能な外部モデルサービス</p></li>
<li><p>Milvusと選択したモデルサービス間の適切なネットワーク接続性</p></li>
</ul>
<p>モデルランカーは標準的なベクトル検索やハイブリッド検索操作とシームレスに統合されます。実装としては、リランキング設定を定義するFunctionオブジェクトを作成し、検索操作に渡します。</p>
<h3 id="Create-a-model-ranker" class="common-anchor-header">モデル・ランカーの作成<button data-href="#Create-a-model-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>モデル・ランカーを実装するには、まず適切な設定を持つFunctionオブジェクトを定義します。この例では、サービス・プロバイダーとしてTEIを使用します：</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType

<span class="hljs-comment"># Connect to your Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>  <span class="hljs-comment"># Replace with your Milvus server URI</span>
)

<span class="hljs-comment"># Create a model ranker function</span>
model_ranker = Function(
    name=<span class="hljs-string">&quot;semantic_ranker&quot;</span>,  <span class="hljs-comment"># Function identifier</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># VARCHAR field to use for reranking</span>
    function_type=FunctionType.RERANK,  <span class="hljs-comment"># Must be set to RERANK</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,  <span class="hljs-comment"># Specify model reranker. Must be &quot;model&quot;</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;tei&quot;</span>,  <span class="hljs-comment"># Choose provider: &quot;tei&quot;, &quot;vllm&quot;, etc.</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;machine learning for time series&quot;</span>],  <span class="hljs-comment"># Query text</span>
        <span class="hljs-string">&quot;endpoint&quot;</span>: <span class="hljs-string">&quot;http://model-service:8080&quot;</span>,  <span class="hljs-comment"># Model service endpoint</span>
        <span class="hljs-comment"># &quot;maxBatch&quot;: 32  # Optional: batch size for processing</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>必須か？</p></th>
     <th><p>説明</p></th>
     <th><p>値 / 例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>はい</p></td>
     <td><p>検索実行時に使用する関数の識別子。</p></td>
     <td><p><code translate="no">"semantic_ranker"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>はい</p></td>
     <td><p>再ランク付けに使用するテキストフィールドの名前。<code translate="no">VARCHAR</code> タイプのフィールドでなければならない。</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>はい</p></td>
     <td><p>作成する関数のタイプを指定します。 すべてのモデルランカーに対して<code translate="no">RERANK</code> に設定する必要があります。</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>はい</p></td>
     <td><p>モデルベース・リランキング関数の設定を含む辞書。利用可能なパラメータ（キー）はサービスプロバイダによって異なる。</p></td>
     <td><p>{...}</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>はい</p></td>
     <td><p>モデルリランキングを有効にするには、<code translate="no">"model"</code> に設定する必要がある。</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.provider</code></p></td>
     <td><p>Yes</p></td>
     <td><p>リランキングに使用するモデルサービスプロバイダ。</p></td>
     <td><p><code translate="no">"tei"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.queries</code></p></td>
     <td><p>はい</p></td>
     <td><p>リランキングモデルが関連性スコアを計算するために使用するクエリ文字列のリスト。 クエリ文字列の数は検索操作のクエリの数と正確に一致する必要があります(テキストの代わりにクエリベクトルを使用する場合でも)。</p></td>
     <td><p><em>[検索クエリ］</em></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.endpoint</code></p></td>
     <td><p>はい</p></td>
     <td><p>モデルサービスのURL。</p></td>
     <td><p><code translate="no">"http://localhost:8080"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>いいえ</p></td>
     <td><p>1バッチで処理する文書の最大数。値が大きいほどスループットは向上するが、より多くのメモリを必要とする。</p></td>
     <td><p><code translate="no">32</code> (デフォルト)</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">標準ベクトル検索への適用<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>モデル・ランカーを定義した後、それを ranker パラメータに渡すことで、検索処理中に適用することができます：</p>
<div class="multipleCode">
   <a href="#bash">cURL</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Use the model ranker in standard vector search</span>
results = client.search(
    collection_name,
    data=[<span class="hljs-string">&quot;machine learning for time series&quot;</span>], <span class="hljs-comment"># Number of queries must match that specified in model_ranker.params[&quot;queries&quot;] </span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># Include the text field in outputs</span>
<span class="highlighted-wrapper-line">    ranker=model_ranker,  <span class="hljs-comment"># Apply the model ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Apply-to-hybrid-search" class="common-anchor-header">ハイブリッド検索への適用<button data-href="#Apply-to-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h3><p>モデル・ランカーは、複数のベクトル・フィールドを組み合わせたハイブリッド検索にも適用できます：</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Define search requests for different vector fields</span>
dense_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;machine learning for time series&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

sparse_request = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;machine learning for time series&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">20</span>
)

<span class="hljs-comment"># Apply model ranker to hybrid search</span>
hybrid_results = client.hybrid_search(
    collection_name,
    [dense_request, sparse_request],
<span class="highlighted-wrapper-line">    ranker=model_ranker,  <span class="hljs-comment"># Same model ranker works with hybrid search</span></span>
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
