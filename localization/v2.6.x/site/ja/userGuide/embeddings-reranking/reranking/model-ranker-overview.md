---
id: model-ranker-overview.md
title: モデルランカーの概要Compatible with Milvus 2.6.x
summary: >-
  従来のベクトル検索では、高次元空間におけるベクトルの一致度、つまり数学的な類似性のみに基づいて検索結果の順位付けが行われます。このアプローチは効率的ですが、真の意味でのセマンティックな関連性を見逃してしまうことがよくあります。例えば、「データベース最適化のベストプラクティス」を検索する場合を考えてみましょう。ベクトルの類似度が高く、これらの用語が頻繁に言及されている文書が検索結果として表示されるかもしれませんが、実際には実用的な最適化戦略が提示されていない可能性があります。
beta: Milvus 2.6.x
---
<h1 id="Model-Ranker-Overview" class="common-anchor-header">モデルランカーの概要<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Model-Ranker-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>従来のベクトル検索は、高次元空間におけるベクトルの一致度、つまり純粋に数学的な類似性に基づいて検索結果をランク付けします。このアプローチは効率的ですが、真の意味でのセマンティックな関連性を見逃してしまうことがよくあります。例えば<strong>、「データベース最適化のベストプラクティス」</strong>を検索する場合を考えてみましょう<strong>。</strong>ベクトルの類似度が高く、これらの用語が頻繁に言及されているドキュメントが表示されるかもしれませんが、実際には実行可能な最適化戦略が提供されていない可能性があります。</p>
<p>Model Rankerは、クエリとドキュメント間の意味的な関係を理解する高度な言語モデルを統合することで、Milvusの検索機能を一新します。ベクトル類似性のみに依存するのではなく、コンテンツの意味や文脈を評価することで、より知的で関連性の高い検索結果を提供します。</p>
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
<li><p>モデルランカーは、グループ化検索では使用できません。</p></li>
<li><p>モデルによる再ランク付けに使用されるフィールドは、テキスト型（<code translate="no">VARCHAR</code> ）である必要があります。</p></li>
<li><p>各モデルランカーは、評価に一度に 1 つの<code translate="no">VARCHAR</code> フィールドのみを使用できます。</p></li>
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
    </button></h2><p>モデルランカーは、明確に定義されたワークフローを通じて、言語モデルの理解機能をMilvusの検索プロセスに統合します：</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/model-ranker-overview.png" alt="Model Ranker Overview" class="doc-image" id="model-ranker-overview" /> 
   <span>モデルランカーの概要</span>
  
 </span></p>
<ol>
<li><p><strong>初期クエリ</strong>：アプリケーションが Milvus にクエリを送信します</p></li>
<li><p><strong>ベクトル検索</strong>：Milvusが標準的なベクトル検索を実行し、候補ドキュメントを特定します</p></li>
<li><p><strong>候補の抽出</strong>：システムはベクトル類似度に基づいて、最初の候補ドキュメントセットを特定します</p></li>
<li><p><strong>モデル評価</strong>：モデルランカー関数がクエリとドキュメントのペアを処理します：</p>
<ul>
<li><p>元のクエリと候補ドキュメントを外部のモデルサービスに送信します</p></li>
<li><p>言語モデルが、クエリと各ドキュメント間の意味的関連性を評価します</p></li>
<li><p>各文書には、意味的理解に基づいて関連性スコアが割り当てられる</p></li>
</ul></li>
<li><p><strong>インテリジェントな再ランク付け</strong>：モデルによって生成された関連性スコアに基づいて、文書の順序が再編成されます</p></li>
<li><p><strong>検索結果の向上</strong>：アプリケーションは、単なるベクトル類似度ではなく、意味的関連性に基づいてランク付けされた検索結果を受け取ります</p></li>
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
    </button></h2><p>Milvusは、再ランク付けのために以下のモデルサービスプロバイダーをサポートしており、それぞれに独自の特性があります：</p>
<table>
   <tr>
     <th><p>プロバイダー</p></th>
     <th><p>適した用途</p></th>
     <th><p>特徴</p></th>
     <th><p>使用例</p></th>
   </tr>
   <tr>
     <td><p>vLLM</p></td>
     <td><p>深い意味理解とカスタマイズを必要とする複雑なアプリケーション</p></td>
     <td><ul><li><p>様々な大規模言語モデルに対応</p></li><li><p>柔軟な導入オプション</p></li><li><p>より高い計算リソースが必要</p></li><li><p>カスタマイズの可能性がさらに広がる</p></li></ul></td>
     <td><p>法律用語や判例間の関係を理解する、ドメイン特化型モデルを導入した法律研究プラットフォーム</p></td>
   </tr>
   <tr>
     <td><p>TEI</p></td>
     <td><p>リソースを効率的に活用した迅速な導入</p></td>
     <td><ul><li><p>テキスト操作に最適化された軽量なサービス</p></li><li><p>リソース要件を抑え、導入を容易に</p></li><li><p>事前に最適化された再ランク付けモデル</p></li><li><p>インフラのオーバーヘッドを最小限に抑える</p></li></ul></td>
     <td><p>標準的な要件を満たしつつ、効率的な再ランク付け機能が必要なコンテンツ管理システム</p></td>
   </tr>
   <tr>
     <td><p>Cohere</p></td>
     <td><p>信頼性と統合の容易さを優先するエンタープライズアプリケーション</p></td>
     <td><ul><li><p>エンタープライズレベルの信頼性とスケーラビリティ</p></li><li><p>インフラのメンテナンスが不要なマネージドサービス</p></li><li><p>多言語対応の再ランク付け機能</p></li><li><p>組み込みのレート制限およびエラー処理</p></li></ul></td>
     <td><p>一貫したAPIパフォーマンスと多言語商品カタログを備えた、高可用性の検索機能を必要とするEコマースプラットフォーム</p></td>
   </tr>
   <tr>
     <td><p>Voyage AI</p></td>
     <td><p>特定のパフォーマンスおよびコンテキスト要件を持つRAGアプリケーション</p></td>
     <td><ul><li><p>再ランク付けタスク向けに特別にトレーニングされたモデル</p></li><li><p>多様なドキュメント長に対応したきめ細かな切り捨て制御</p></li><li><p>本番環境のワークロード向けに最適化された推論</p></li><li><p>複数のモデルバリエーション（rerank-2、rerank-liteなど）</p></li></ul></td>
     <td><p>文書長が様々で、微調整された性能制御と専門的な意味理解を必要とする研究用データベース</p></td>
   </tr>
   <tr>
     <td><p>SiliconFlow</p></td>
     <td><p>費用対効果を優先した長文ドキュメントの処理アプリケーション</p></td>
     <td><ul><li><p>オーバーラップを構成可能な高度なドキュメントチャンキング</p></li><li><p>チャンクベースのスコアリング（最高スコアのチャンクが文書を代表する）</p></li><li><p>多様な再ランク付けモデルのサポート</p></li><li><p>スタンダード版とプロ版のモデルバリエーションにより、コスト効率に優れる</p></li></ul></td>
     <td><p>インテリジェントなセグメンテーションとオーバーラップ制御を必要とする長文のマニュアルや論文を処理する技術文書検索システム</p></td>
   </tr>
</table>
<p>各モデルサービスの実装に関する詳細については、専用のドキュメントを参照してください：</p>
<ul>
<li><p><a href="/docs/ja/v2.6.x/vllm-ranker.md">vLLM Ranker</a></p></li>
<li><p><a href="/docs/ja/v2.6.x/tei-ranker.md">TEI Ranker</a></p></li>
<li><p><a href="/docs/ja/v2.6.x/cohere-ranker.md">Cohere Ranker</a></p></li>
<li><p><a href="/docs/ja/v2.6.x/voyage-ai-ranker.md">Voyage AI Ranker</a></p></li>
<li><p><a href="/docs/ja/v2.6.x/siliconflow-ranker.md">SiliconFlow Ranker</a></p></li>
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
    </button></h2><p>Model Ranker を実装する前に、以下の条件を満たしていることを確認してください：</p>
<ul>
<li><p>再ランク付け対象のテキストを含む「<code translate="no">VARCHAR</code> 」フィールドを持つMilvusコレクション</p></li>
<li><p>Milvusインスタンスからアクセス可能な、稼働中の外部モデルサービス</p></li>
<li><p>Milvusと選択したモデルサービス間の適切なネットワーク接続</p></li>
</ul>
<p>モデルランカーは、標準のベクトル検索およびハイブリッド検索操作の両方にシームレスに統合されます。実装には、再ランク付けの設定を定義するFunctionオブジェクトを作成し、それを検索操作に渡す手順が含まれます。</p>
<h3 id="Create-a-model-ranker" class="common-anchor-header">モデルランカーの作成<button data-href="#Create-a-model-ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>モデル再ランク付けを実装するには、まず適切な設定を持つFunctionオブジェクトを定義します。この例では、サービスプロバイダーとしてTEIを使用します：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.ModelRanker;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-type">ModelRanker</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> ModelRanker.builder()
        .name(<span class="hljs-string">&quot;semantic_ranker&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;document&quot;</span>))
        .provider(<span class="hljs-string">&quot;tei&quot;</span>)
        .queries(Collections.singletonList(<span class="hljs-string">&quot;machine learning for time series&quot;</span>))
        .endpoint(<span class="hljs-string">&quot;http://model-service:8080&quot;</span>)
        .build();
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
     <th><p>必須？</p></th>
     <th><p>説明</p></th>
     <th><p>値 / 例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>はい</p></td>
     <td><p>検索の実行時に使用される、関数の識別子。</p></td>
     <td><p><code translate="no">"semantic_ranker"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>はい</p></td>
     <td><p>再ランク付けに使用するテキストフィールドの名前。</p><p><code translate="no">VARCHAR</code> 型のフィールドである必要があります。</p></td>
     <td><p><code translate="no">["document"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>はい</p></td>
     <td><p>作成する関数のタイプを指定します。</p><p>すべてのモデルランカーについて、<code translate="no">RERANK</code> に設定する必要があります。</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params</code></p></td>
     <td><p>はい</p></td>
     <td><p>モデルベースの再ランク付け関数の設定を含む辞書。使用可能なパラメータ（キー）は、サービスプロバイダによって異なります。</p></td>
     <td><p><code translate="no">{...}</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>はい</p></td>
     <td><p>モデル再ランク付けを有効にするには、<code translate="no">"model"</code> に設定する必要があります。</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.provider</code></p></td>
     <td><p>はい</p></td>
     <td><p>再ランク付けに使用するモデルサービスプロバイダー。</p></td>
     <td><p><code translate="no">"tei"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.queries</code></p></td>
     <td><p>はい</p></td>
     <td><p>再ランク付けモデルが関連性スコアを計算するために使用するクエリ文字列のリスト。</p><p>クエリ文字列の数は、検索操作におけるクエリの数と完全に一致している必要があります（テキストの代わりにクエリベクトルを使用している場合でも同様です）。一致しない場合、エラーが報告されます。</p></td>
     <td><p><code translate="no">["search query"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.endpoint</code></p></td>
     <td><p>はい</p></td>
     <td><p>モデルサービスの URL。</p></td>
     <td><p><code translate="no">"http://localhost:8080"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>いいえ</p></td>
     <td><p>1回のバッチで処理するドキュメントの最大数。値を大きくするとスループットは向上しますが、より多くのメモリが必要になります。</p></td>
     <td><p><code translate="no">32</code> (デフォルト)</p></td>
   </tr>
</table>
<h3 id="Apply-to-standard-vector-search" class="common-anchor-header">標準ベクトル検索に適用<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h3><p>モデルランカーを定義したら、検索操作の際に `ranker` パラメータに指定することで適用できます：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the model ranker in standard vector search</span>
results = client.search(
    collection_name,
    data=[your_query_vector], <span class="hljs-comment"># Number of query vectors must match that specified in model_ranker.params[&quot;queries&quot;] </span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># Include the text field in outputs</span>
<span class="highlighted-wrapper-line">    ranker=model_ranker,  <span class="hljs-comment"># Apply the model ranker here</span></span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;machine learning for time series&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;vector_field&quot;</span>)
        .limit(<span class="hljs-number">10</span>)
        .outputFields(Collections.singletonList(document))
        .functionScore(FunctionScore.builder()
                .addFunction(ranker)
                .build())
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
