---
id: integrate_with_phidata.md
title: MilvusとAgnoの統合
summary: >-
  Milvusのベクトルデータベースは、埋め込み情報として情報の効率的な保存と検索を可能にします。MilvusとAgnoを使用することで、Agentのワークフローにナレッジを簡単に統合することができます。このドキュメントは、MilvusとAgnoの統合の基本的な使い方を説明したものです。
---
<h1 id="Integrate-Milvus-with-Agno" class="common-anchor-header">MilvusとAgnoの統合<button data-href="#Integrate-Milvus-with-Agno" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://docs.agno.com/introduction">Agno</a>（旧Phidata）は、マルチモーダルエージェントを構築するための軽量ライブラリです。テキスト、画像、音声、ビデオを理解し、様々なツールや知識ソースを活用して複雑なタスクを実行するマルチモーダルエージェントを作成することができます。Agnoは、マルチエージェントのオーケストレーションをサポートし、エージェントのチームが協力して問題を解決することを可能にします。また、エージェントと対話するための美しいエージェントUIを提供します。</p>
<p>Milvusベクトルデータベースは、エンベッディングとして情報の効率的な保存と検索を可能にします。MilvusとAgnoを利用することで、お客様の知識をAgentのワークフローに簡単に統合することができます。このドキュメントは、MilvusとAgnoの統合の基本的な使い方を説明したものです。</p>
<h2 id="Preparation" class="common-anchor-header">準備<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><p>必要な依存関係をインストールします：</p>
<pre><code translate="no" class="language-python">$ pip install --upgrade agno pymilvus openai
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Google Colabを使用している場合、インストールした依存関係を有効にするために、<strong>ランタイムを再起動</strong>する必要があるかもしれません（画面上部の "Runtime "メニューをクリックし、ドロップダウンメニューから "Restart session "を選択してください）。</p>
</div>
<p>この例では、LLMとしてOpenAIを使います。環境変数として<a href="https://platform.openai.com/docs/quickstart">api key</a> <code translate="no">OPENAI_API_KEY</code> を用意してください。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-xxxx&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Initalize-Milvus" class="common-anchor-header">Milvusの初期化<button data-href="#Initalize-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>パッケージをインポートし、Milvusベクトルデータベースインスタンスを初期化します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> agno.agent <span class="hljs-keyword">import</span> Agent
<span class="hljs-keyword">from</span> agno.knowledge.pdf_url <span class="hljs-keyword">import</span> PDFUrlKnowledgeBase
<span class="hljs-keyword">from</span> agno.vectordb.milvus <span class="hljs-keyword">import</span> Milvus

<span class="hljs-comment"># Initialize Milvus</span>
vector_db = Milvus(
    collection=<span class="hljs-string">&quot;recipes&quot;</span>,
    uri=<span class="hljs-string">&quot;./milvus.db&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>コレクション名、Milvusサーバのuriとtoken(optinal)を指定します。</p>
<div class="alert note">
<p>uriとtokenの設定方法は以下の通りです：</p>
<ul>
<li>小規模なデータやプロトタイピングのためにローカルのベクターデータベースが必要な場合、uriをローカルファイル、例えば<code translate="no">./milvus.db</code> に設定するのが最も便利です。</li>
<li>もし、100万ベクトルを超えるような大規模なデータがある場合は、<a href="https://milvus.io/docs/quickstart.md">DockerやKubernetes</a>上に、よりパフォーマンスの高いMilvusサーバを構築することができます。このセットアップでは、サーバのアドレスとポートをURIとして使用してください（例：<code translate="no">http://localhost:19530</code> ）。Milvusで認証機能を有効にしている場合、トークンには"&lt;your_username&gt;:&lt;your_password&gt;"を使用します。</li>
<li>Milvusのフルマネージドクラウドサービスである<a href="https://zilliz.com/cloud">Zilliz Cloudを</a>ご利用の場合は、Zilliz Cloudの<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">Public EndpointとAPI keyに</a>対応する<code translate="no">uri</code> 、<code translate="no">token</code> 。</li>
</ul>
</div>
<h2 id="Load-data" class="common-anchor-header">データのロード<button data-href="#Load-data" class="anchor-icon" translate="no">
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
    </button></h2><p>PDF url knowledageのベースインスタンスを作成し、データをインスタンスにロードします。例として公開レシピのPDFデータを使用します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create knowledge base</span>
knowledge_base = PDFUrlKnowledgeBase(
    urls=[<span class="hljs-string">&quot;https://phi-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf&quot;</span>],
    vector_db=vector_db,
)

knowledge_base.load(recreate=<span class="hljs-literal">False</span>)  <span class="hljs-comment"># Comment out after first run</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">INFO    Creating
INFO    Loading knowledge  
INFO    Reading: https://phi-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf       
INFO    Added documents to knowledge base                                                                             
</code></pre>
<h2 id="Use-agent-to-response-to-a-question" class="common-anchor-header">エージェントを使って質問に答える<button data-href="#Use-agent-to-response-to-a-question" class="anchor-icon" translate="no">
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
    </button></h2><p>ナレッジベースをエージェントに統合し、エージェントに質問をして回答を得ます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create and use the agent</span>
agent = Agent(knowledge=knowledge_base, show_tool_calls=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Query the agent</span>
agent.print_response(<span class="hljs-string">&quot;How to make Tom Kha Gai&quot;</span>, markdown=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Output()


┏━ Message ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                                                                                                             ┃
┃ How to make Tom Kha Gai                                                                                                                                     ┃
┃                                                                                                                                                             ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
┏━ Response (6.9s) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                                                                                                             ┃
┃ Running:                                                                                                                                                    ┃
┃                                                                                                                                                             ┃
┃  • search_knowledge_base(query=Tom Kha Gai recipe)                                                                                                          ┃
┃                                                                                                                                                             ┃
┃ Here's a recipe for Tom Kha Gai, a delicious Thai chicken and galangal soup made with coconut milk:                                                         ┃
┃                                                                                                                                                             ┃
┃ Ingredients (One serving):                                                                                                                                  ┃
┃                                                                                                                                                             ┃
┃  • 150 grams chicken, cut into bite-size pieces                                                                                                             ┃
┃  • 50 grams sliced young galangal                                                                                                                           ┃
┃  • 100 grams lightly crushed lemongrass, julienned                                                                                                          ┃
┃  • 100 grams straw mushrooms                                                                                                                                ┃
┃  • 250 grams coconut milk                                                                                                                                   ┃
┃  • 100 grams chicken stock                                                                                                                                  ┃
┃  • 3 tbsp lime juice                                                                                                                                        ┃
┃  • 3 tbsp fish sauce                                                                                                                                        ┃
┃  • 2 leaves kaffir lime, shredded                                                                                                                           ┃
┃  • 1-2 bird’s eye chilies, pounded                                                                                                                          ┃
┃  • 3 leaves coriander                                                                                                                                       ┃
┃                                                                                                                                                             ┃
┃ Directions:                                                                                                                                                 ┃
┃                                                                                                                                                             ┃
┃  1 Bring the chicken stock and coconut milk to a slow boil.                                                                                                 ┃
┃  2 Add galangal, lemongrass, chicken, and mushrooms. Once the soup returns to a boil, season it with fish sauce.                                            ┃
┃  3 Wait until the chicken is cooked, then add the kaffir lime leaves and bird’s eye chilies.                                                                ┃
┃  4 Remove the pot from heat and add lime juice.                                                                                                             ┃
┃  5 Garnish with coriander leaves.                                                                                                                           ┃
┃                                                                                                                                                             ┃
┃ Tips:                                                                                                                                                       ┃
┃                                                                                                                                                             ┃
┃  • Keep the heat low throughout the cooking process to prevent the oil in the coconut milk from separating.                                                 ┃
┃  • If using mature galangal, reduce the amount.                                                                                                             ┃
┃  • Adding lime juice after removing the pot from heat makes it more aromatic.                                                                               ┃
┃  • Reduce the number of chilies for a milder taste.                                                                                                         ┃
┃                                                                                                                                                             ┃
┃ Enjoy making and savoring this flavorful Thai soup!                                                                                                         ┃
┃                                                                                                                                                             ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
</code></pre>
<p>おめでとうございます、あなたはAgnoでのMilvusの使い方の基本を学びました。Agnoの使い方についてもっと知りたい場合は、<a href="https://docs.agno.com/introduction">公式ドキュメントを</a>参照してください。</p>
