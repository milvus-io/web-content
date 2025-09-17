---
id: siliconflow-ranker.md
title: SiliconFlow ランカーCompatible with Milvus 2.6.x
summary: >-
  SiliconFlow
  Rankerは、SiliconFlowの包括的なリランキングモデルを活用し、セマンティックリランキングによって検索の関連性を高めます。柔軟なドキュメントのチャンキング機能を提供し、様々なプロバイダーから提供される幅広い専門的なリランキングモデルをサポートします。
beta: Milvus 2.6.x
---
<h1 id="SiliconFlow-Ranker" class="common-anchor-header">SiliconFlow ランカー<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#SiliconFlow-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>SiliconFlow Rankerは<a href="https://www.siliconflow.com/">SiliconFlowの</a>包括的なリランキングモデルを活用し、セマンティックなリランキングによって検索の関連性を高めます。SiliconFlow Rankerは柔軟なドキュメント チャンキング機能を提供し、さまざまなプロバイダが提供する幅広い特殊なリランキング モデルをサポートします。</p>
<p>SiliconFlow Rankerは特に以下のようなアプリケーションに最適です：</p>
<ul>
<li><p>長いドキュメントを扱うためのオーバーラップを設定できる高度なドキュメントチャンキング</p></li>
<li><p>BAAI/bge-rerankerシリーズやその他の特殊モデルを含む多様なリランキングモデルへのアクセス</p></li>
<li><p>最もスコアの高いチャンクがドキュメントのスコアを表す、柔軟なチャンクベースのスコアリング</p></li>
<li><p>標準モデルとプロモデルの両バリエーションをサポートした費用対効果の高いリランキング</p></li>
</ul>
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
    </button></h2><p>MilvusにSiliconFlow Rankerを実装する前に、以下のものをご用意ください：</p>
<ul>
<li><p>リランキングするテキストを含む<code translate="no">VARCHAR</code> フィールドを持つ Milvus コレクション。</p></li>
<li><p>リランキングモデルにアクセスできる有効なSiliconFlow APIキー。<a href="https://www.siliconflow.com/">SiliconFlowのプラットフォームで</a>サインアップし、API認証情報を取得します。以下のいずれかを実行します：</p>
<ul>
<li><p><code translate="no">SILICONFLOW_API_KEY</code> 環境変数を設定する。</p></li>
<li><p>ランカー構成で API キーを直接指定する。</p></li>
</ul></li>
</ul>
<h2 id="Create-a-SiliconFlow-ranker-function" class="common-anchor-header">SiliconFlow ランカー関数の作成<button data-href="#Create-a-SiliconFlow-ranker-function" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus アプリケーションで SiliconFlow ランカーを使用するには、再ランキングの動作方法を指定する Function オブジェクトを作成します。この関数はMilvusの検索操作に渡され、結果のランキングを向上させます。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType

<span class="hljs-comment"># Connect to your Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>  <span class="hljs-comment"># Replace with your Milvus server URI</span>
)

<span class="hljs-comment"># Configure SiliconFlow Ranker</span>
siliconflow_ranker = Function(
    name=<span class="hljs-string">&quot;siliconflow_semantic_ranker&quot;</span>,     <span class="hljs-comment"># Unique identifier for your ranker</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],         <span class="hljs-comment"># VARCHAR field containing text to rerank</span>
    function_type=FunctionType.RERANK,      <span class="hljs-comment"># Must be RERANK for reranking functions</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,                <span class="hljs-comment"># Enables model-based reranking</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;siliconflow&quot;</span>,          <span class="hljs-comment"># Specifies SiliconFlow as the service provider</span>
        <span class="hljs-string">&quot;model_name&quot;</span>: <span class="hljs-string">&quot;BAAI/bge-reranker-v2-m3&quot;</span>, <span class="hljs-comment"># SiliconFlow reranking model to use</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;renewable energy developments&quot;</span>], <span class="hljs-comment"># Query text for relevance evaluation</span>
        <span class="hljs-string">&quot;max_client_batch_size&quot;</span>: <span class="hljs-number">128</span>,       <span class="hljs-comment"># Optional: batch size for model service requests (default: 128)</span>
        <span class="hljs-string">&quot;max_chunks_per_doc&quot;</span>: <span class="hljs-number">5</span>,            <span class="hljs-comment"># Optional: max chunks per document for supported models</span>
        <span class="hljs-string">&quot;overlap_tokens&quot;</span>: <span class="hljs-number">50</span>,               <span class="hljs-comment"># Optional: token overlap between chunks for supported models</span>
        <span class="hljs-comment"># &quot;credential&quot;: &quot;your-siliconflow-api-key&quot; # Optional: if not set, uses SILICONFLOW_API_KEY env var</span>
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
<h3 id="SiliconFlow-ranker-specific-parameters" class="common-anchor-header">SiliconFlow ランカー固有のパラメータ<button data-href="#SiliconFlow-ranker-specific-parameters" class="anchor-icon" translate="no">
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
    </button></h3><p>以下のパラメータは SiliconFlow ランカー固有のものです：</p>
<table>
   <tr>
     <th><p><strong>パラメータ</strong></p></th>
     <th><p><strong>必須か？</strong></p></th>
     <th><p><strong>パラメータ 説明</strong></p></th>
     <th><p><strong>値 / 例</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">reranker</code></p></td>
     <td><p>Yes</p></td>
     <td><p>モデルの再ランキングを有効にするには、<code translate="no">"model"</code> に設定する必要がある。</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>Yes</p></td>
     <td><p>リランキングに使用するモデルサービスプロバイダ。</p></td>
     <td><p><code translate="no">"siliconflow"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">model_name</code></p></td>
     <td><p>はい</p></td>
     <td><p>SiliconFlow プラットフォームでサポートされているモデルの中から使用する SiliconFlow リランキング モデル。 使用可能なリランキング モデルのリストについては、<a href="https://docs.siliconflow.cn/en/api-reference/rerank/create-rerank">SiliconFlow のドキュメントを</a>参照してください。</p></td>
     <td><p><code translate="no">"BAAI/bge-reranker-v2-m3"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queries</code></p></td>
     <td><p>はい</p></td>
     <td><p>リランク モデルが関連性スコアを計算するために使用するクエリ文字列のリスト。クエリ文字列の数は、検索操作のクエリの数と正確に一致する必要があります（テキストの代わりにクエリベクタを使用する場合も同様）。</p></td>
     <td><p><em>[検索クエリ］</em></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>いいえ</p></td>
     <td><p>モデルサービスは一度にすべてのデータを処理しない可能性があるため、複数のリクエストでモデルサービスにアクセスする際のバッチサイズを設定します。</p></td>
     <td><p><code translate="no">128</code> (デフォルト)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_chunks_per_doc</code></p></td>
     <td><p>いいえ</p></td>
     <td><p>文書内から生成されるチャンクの最大数。長い文書を複数のチャンクに分割して計算し、その中で最も高いスコアを文書のスコアとする。特定のモデルでのみサポート：<code translate="no">BAAI/bge-reranker-v2-m3</code> <code translate="no">Pro/BAAI/bge-reranker-v2-m3</code> および<code translate="no">netease-youdao/bce-reranker-base_v1</code> 。</p></td>
     <td><p><code translate="no">5</code>,<code translate="no">10</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">overlap_tokens</code></p></td>
     <td><p>いいえ</p></td>
     <td><p>文書がチャンク化されたときに、隣接するチャンク間で重複するトークンの数。これにより、チャンクの境界を越えた連続性が確保され、より良い意味理解が可能になる。特定のモデルでのみサポート：<code translate="no">BAAI/bge-reranker-v2-m3</code> <code translate="no">Pro/BAAI/bge-reranker-v2-m3</code> 、および<code translate="no">netease-youdao/bce-reranker-base_v1</code> 。</p></td>
     <td><p><code translate="no">50</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">credential</code></p></td>
     <td><p>いいえ</p></td>
     <td><p>SiliconFlow API サービスにアクセスするための認証クレデンシャル。指定されていない場合、システムは<code translate="no">SILICONFLOW_API_KEY</code> 環境変数を探します。</p></td>
     <td><p><em>"your-siliconflow-api-key"。</em></p></td>
   </tr>
</table>
<p><strong>モデル固有の機能のサポート</strong>：<code translate="no">max_chunks_per_doc</code> および<code translate="no">overlap_tokens</code> パラメータは、特定のモデルでのみサポートされています。他のモデルを使用する場合、これらのパラメータは無視されます。</p>
<div class="alert note">
<p>すべてのモデルランカーで共有される一般的なパラメーター（例：<code translate="no">provider</code> 、<code translate="no">queries</code> ）については、<a href="/docs/ja/model-ranker-overview.md#Create-a-model-ranker">モデルランカーを作成するを</a>参照してください。</p>
</div>
<h2 id="Apply-to-standard-vector-search" class="common-anchor-header">標準ベクトル検索への適用<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h2><p>SiliconFlow ランカーを標準的なベクトル検索に適用します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Execute search with SiliconFlow reranking</span>
results = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    data=[<span class="hljs-string">&quot;AI Research Progress&quot;</span>, <span class="hljs-string">&quot;What is AI&quot;</span>],  <span class="hljs-comment"># Search queries</span>
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,                   <span class="hljs-comment"># Vector field to search</span>
    limit=<span class="hljs-number">5</span>,                                     <span class="hljs-comment"># Number of results to return</span>
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],                  <span class="hljs-comment"># Include text field for reranking</span>
<span class="highlighted-wrapper-line">    ranker=siliconflow_ranker,                  <span class="hljs-comment"># Apply SiliconFlow reranking</span></span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Apply-to-hybrid-search" class="common-anchor-header">ハイブリッド検索への適用<button data-href="#Apply-to-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>SiliconFlow Ranker は、密検索と疎検索を組み合わせたハイブリッド検索にも使用できる：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Configure dense vector search</span>
dense_search = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;AI Research Progress&quot;</span>, <span class="hljs-string">&quot;What is AI&quot;</span>],
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,
    param={},
    limit=<span class="hljs-number">5</span>
)

<span class="hljs-comment"># Configure sparse vector search  </span>
sparse_search = AnnSearchRequest(
    data=[<span class="hljs-string">&quot;AI Research Progress&quot;</span>, <span class="hljs-string">&quot;What is AI&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>, 
    param={},
    limit=<span class="hljs-number">5</span>
)

<span class="hljs-comment"># Execute hybrid search with SiliconFlow reranking</span>
hybrid_results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    [dense_search, sparse_search],              <span class="hljs-comment"># Multiple search requests</span>
<span class="highlighted-wrapper-line">    ranker=siliconflow_ranker,                 <span class="hljs-comment"># Apply SiliconFlow reranking to combined results</span></span>
    limit=<span class="hljs-number">5</span>,                                   <span class="hljs-comment"># Final number of results</span>
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
