---
id: RAG_with_pii_and_milvus.md
summary: >-
  このチュートリアルでは、MilvusとPII Maskerを使ってRAG（Retrieval-Augmented
  Generation）パイプラインを構築する方法を紹介します。
title: Milvus + PII MaskerでRAGを構築する
---
<h1 id="Build-RAG-with-Milvus-+-PII-Masker" class="common-anchor-header">Milvus + PII MaskerでRAGを構築する<button data-href="#Build-RAG-with-Milvus-+-PII-Masker" class="anchor-icon" translate="no">
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
    </button></h1><p>PII（Personally Identifiable Information）とは、個人を特定するために使用できる機密データの一種です。</p>
<p><a href="https://www.hydrox.ai/">HydroX AIが</a>開発した<a href="https://github.com/HydroXai/pii-masker-v1/tree/main">PII Maskerは</a>、最先端のAIモデルを活用することで、機密データを保護するように設計された先進的なオープンソースツールです。PII Masker は、顧客データの取り扱い、データ分析の実行、プライバシー規制の遵守のいずれにおいても、情報を安全に保護するための堅牢で拡張可能なソリューションを提供します。</p>
<p>このチュートリアルでは、RAG(Retrieval-Augmented Generation)アプリケーションでプライベートデータを保護するためにPII MaskerとMilvusを使用する方法を紹介します。PII Maskerのデータマスキング機能とMilvusの効率的なデータ検索機能を組み合わせることで、機密情報を安心して取り扱うためのセキュアでプライバシーに準拠したパイプラインを作成することができます。このアプローチにより、お客様のアプリケーションはプライバシー基準を満たし、ユーザーデータを効果的に保護することができます。</p>
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
    </button></h2><h3 id="Get-started-with-PII-Masker" class="common-anchor-header">PII Masker を使い始める</h3><p>PII Masker の<a href="https://github.com/HydroXai/pii-masker-v1/tree/main?tab=readme-ov-file#-installation">インストールガイドに従って</a>、必要な依存関係をインストールし、モデルをダウンロードします。以下は簡単なガイドです：</p>
<pre><code translate="no" class="language-shell">$ git <span class="hljs-built_in">clone</span> https://github.com/HydroXai/pii-masker-v1.git
$ <span class="hljs-built_in">cd</span> pii-masker-v1/pii-masker
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">https://huggingface.co/hydroxai/pii_model_weight</code> からモデルをダウンロードし、以下のファイルと置き換えます：<code translate="no">pii-masker/output_model/deberta3base_1024/</code></p>
<h3 id="Dependencies-and-Environment" class="common-anchor-header">依存関係と環境</h3><pre><code translate="no" class="language-shell">$ pip install --upgrade pymilvus openai requests tqdm dataset
<button class="copy-code-btn"></button></code></pre>
<p>この例ではLLMとしてOpenAIを使用します。<a href="https://platform.openai.com/docs/quickstart">apiキー</a> <code translate="no">OPENAI_API_KEY</code> を環境変数として用意してください。</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-keyword">export</span> <span class="hljs-variable constant_">OPENAI_API_KEY</span>=sk-***********
<button class="copy-code-btn"></button></code></pre>
<p>そして、pythonかjupyterのノートブックを作成し、以下のコードを実行します。</p>
<h3 id="Prepare-the-data" class="common-anchor-header">データの準備</h3><p>テストやデモンストレーションのために、PII情報を含む偽の行をいくつか生成してみましょう。</p>
<pre><code translate="no" class="language-python">text_lines = [
    <span class="hljs-string">&quot;Alice Johnson, a resident of Dublin, Ireland, attended a flower festival at Hyde Park on May 15, 2023. She entered the park at noon using her digital passport, number 23456789. Alice spent the afternoon admiring various flowers and plants, attending a gardening workshop, and having a light snack at one of the food stalls. While there, she met another visitor, Mr. Thompson, who was visiting from London. They exchanged tips on gardening and shared contact information: Mr. Thompson&#x27;s address was 492, Pine Lane, and his cell phone number was +018.221.431-4517. Alice gave her contact details: home address, Ranch 16&quot;</span>,
    <span class="hljs-string">&quot;Hiroshi Tanaka, a businessman from Tokyo, Japan, went to attend a tech expo at the Berlin Convention Center on November 10, 2023. He registered for the event at 9 AM using his digital passport, number Q-24567680. Hiroshi networked with industry professionals, participated in panel discussions, and had lunch with some potential partners. One of the partners he met was from Munich, and they decided to keep in touch: the partner&#x27;s office address was given as house No. 12, Road 7, Block E. Hiroshi offered his business card with the address, 654 Sakura Road, Tokyo.&quot;</span>,
    <span class="hljs-string">&quot;In an online forum discussion about culinary exchanges around the world, several participants shared their experiences. One user, Male, with the email 2022johndoe@example.com, shared his insights. He mentioned his ID code 1A2B3C4D5E and reference number L87654321 while residing in Italy but originally from Australia. He provided his +0-777-123-4567 and described his address at 456, Flavorful Lane, Pasta, IT, 00100.&quot;</span>,
    <span class="hljs-string">&quot;Another user joined the conversation on the topic of international volunteering opportunities. Identified as Female, she used the email 2023janedoe@example.com to share her story. She noted her 9876543210123 and M1234567890123 while residing in Germany but originally from Brazil. She provided her +0-333-987-6543 and described her address at 789, Sunny Side Street, Berlin, DE, 10178.&quot;</span>,
]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Mask-the-data-with-PIIMasker" class="common-anchor-header">PIIMasker でデータをマスクする</h3><p>PIIMasker オブジェクトを初期化し、モデルを読み込みます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> model <span class="hljs-keyword">import</span> <span class="hljs-title class_">PIIMasker</span>

masker = <span class="hljs-title class_">PIIMasker</span>()
<button class="copy-code-btn"></button></code></pre>
<p>そして、テキスト行のリストからPIIをマスクし、マスクされた結果を表示します。</p>
<pre><code translate="no" class="language-python">masked_results = []
<span class="hljs-keyword">for</span> full_text in text_lines:
    masked_text, _ = masker.mask_pii(full_text)
    masked_results.<span class="hljs-built_in">append</span>(masked_text)

<span class="hljs-keyword">for</span> res in masked_results:
    <span class="hljs-built_in">print</span>(res + <span class="hljs-string">&quot;\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Alice [B-NAME] , a resident of Dublin Ireland attended flower festival at Hyde Park on May 15 2023 [B-PHONE_NUM] She entered the park noon using her digital passport number 23 [B-ID_NUM] [B-NAME] afternoon admiring various flowers and plants attending gardening workshop having light snack one food stalls While there she met another visitor Mr Thompson who was visiting from London They exchanged tips shared contact information : ' s address 492 [I-STREET_ADDRESS] his cell phone + [B-PHONE_NUM] [B-NAME] details home Ranch [B-STREET_ADDRESS]

Hiroshi [B-NAME] [I-STREET_ADDRESS] a businessman from Tokyo Japan went to attend tech expo at the Berlin Convention Center on November 10 2023 . He registered for event 9 AM using his digital passport number Q [B-ID_NUM] [B-NAME] with industry professionals participated in panel discussions and had lunch some potential partners One of he met was Munich they decided keep touch : partner ' s office address given as house No [I-STREET_ADDRESS] [B-NAME] business card 654 [B-STREET_ADDRESS]

In an online forum discussion about culinary exchanges around the world [I-STREET_ADDRESS] several participants shared their experiences [I-STREET_ADDRESS] One user Male with email 2022 [B-EMAIL] his insights He mentioned ID code 1 [B-ID_NUM] [I-PHONE_NUM] reference number L [B-ID_NUM] residing in Italy but originally from Australia provided + [B-PHONE_NUM] [I-PHONE_NUM] described address at 456 [I-STREET_ADDRESS]

Another user joined the conversation on topic of international volunteering opportunities . Identified as Female , she used email 2023 [B-EMAIL] share her story She noted 98 [B-ID_NUM] [I-PHONE_NUM] M [B-ID_NUM] residing in Germany but originally from Brazil provided + [B-PHONE_NUM] [I-PHONE_NUM] described address at 789 [I-STREET_ADDRESS] DE 10 178
</code></pre>
<h3 id="Prepare-the-Embedding-Model" class="common-anchor-header">埋め込みモデルの準備</h3><p>埋め込みモデルを準備するために、OpenAIクライアントを初期化します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> <span class="hljs-title class_">OpenAI</span>

openai_client = <span class="hljs-title class_">OpenAI</span>()
<button class="copy-code-btn"></button></code></pre>
<p>OpenAIクライアントを使って、テキスト埋め込みを生成する関数を定義します。例として、<code translate="no">text-embedding-3-small</code> のモデルを使います。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">emb_text</span>(<span class="hljs-params">text</span>):
    <span class="hljs-keyword">return</span> (
        openai_client.embeddings.create(<span class="hljs-built_in">input</span>=text, model=<span class="hljs-string">&quot;text-embedding-3-small&quot;</span>)
        .data[<span class="hljs-number">0</span>]
        .embedding
    )
<button class="copy-code-btn"></button></code></pre>
<p>テスト埋め込みを生成し、その次元と最初の数要素を表示します。</p>
<pre><code translate="no" class="language-python">test_embedding = emb_text(<span class="hljs-string">&quot;This is a test&quot;</span>)
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">1536
[0.009889289736747742, -0.005578675772994757, 0.00683477520942688, -0.03805781528353691, -0.01824733428657055, -0.04121600463986397, -0.007636285852640867, 0.03225184231996536, 0.018949154764413834, 9.352207416668534e-05]
</code></pre>
<h2 id="Load-data-into-Milvus" class="common-anchor-header">Milvusにデータをロードする。<button data-href="#Load-data-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-Collection" class="common-anchor-header">コレクションの作成</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>

milvus_client = <span class="hljs-title class_">MilvusClient</span>(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">MilvusClient</code> の引数については以下の通りです：</p>
<ul>
<li><code translate="no">uri</code> をローカルファイル、例えば<code translate="no">./milvus.db</code> とするのが最も便利な方法です。</li>
<li>100万ベクトルを超えるような大規模なデータをお持ちの場合は、<a href="https://milvus.io/docs/quickstart.md">DockerやKubernetes</a>上に、よりパフォーマンスの高いMilvusサーバを構築することができます。このセットアップでは、サーバのアドレスとポートをURIとして使用してください（例：<code translate="no">http://localhost:19530</code> ）。Milvusの認証機能を有効にしている場合は、トークンに"&lt;your_username&gt;:&lt;your_password&gt;"を使用してください。</li>
<li>Milvusのフルマネージドクラウドサービスである<a href="https://zilliz.com/cloud">Zilliz Cloudを</a>利用する場合は、Zilliz Cloudの<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public EndpointとApi keyに</a>対応する<code translate="no">uri</code> と<code translate="no">token</code> を調整してください。</li>
</ul>
</div>
<p>コレクションが既に存在するか確認し、存在する場合は削除します。</p>
<pre><code translate="no" class="language-python">collection_name = <span class="hljs-string">&quot;my_rag_collection&quot;</span>

<span class="hljs-keyword">if</span> milvus_client.<span class="hljs-title function_">has_collection</span>(collection_name):
    milvus_client.<span class="hljs-title function_">drop_collection</span>(collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>指定したパラメータで新しいコレクションを作成します。</p>
<p>フィールド情報を指定しない場合、Milvusは自動的にプライマリキー用のデフォルト<code translate="no">id</code> フィールドと、ベクトルデータを格納するための<code translate="no">vector</code> フィールドを作成します。予約されたJSONフィールドは、スキーマで定義されていないフィールドとその値を格納するために使用されます。</p>
<pre><code translate="no" class="language-python">milvus_client.create_collection(
    collection_name=collection_name,
    dimension=embedding_dim,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  # Inner product distance
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  # Supported values are (<span class="hljs-string">`&quot;Strong&quot;`</span>, <span class="hljs-string">`&quot;Session&quot;`</span>, <span class="hljs-string">`&quot;Bounded&quot;`</span>, <span class="hljs-string">`&quot;Eventually&quot;`</span>). See https:<span class="hljs-comment">//milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data" class="common-anchor-header">データの挿入</h3><p>マスクされたテキスト行を繰り返し、エンベッディングを作成し、Milvusにデータを挿入します。</p>
<p>ここに新しいフィールド<code translate="no">text</code> 、コレクションスキーマの非定義フィールドです。これは、予約されたJSONダイナミックフィールドに自動的に追加され、高レベルでは通常のフィールドとして扱われます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []

<span class="hljs-keyword">for</span> i, line <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(tqdm(masked_results, desc=<span class="hljs-string">&quot;Creating embeddings&quot;</span>)):
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: emb_text(line), <span class="hljs-string">&quot;text&quot;</span>: line})

milvus_client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Creating embeddings: 100%|██████████| 4/4 [00:01&lt;00:00,  2.60it/s]





{'insert_count': 4, 'ids': [0, 1, 2, 3], 'cost': 0}
</code></pre>
<h2 id="Build-RAG" class="common-anchor-header">RAGの構築<button data-href="#Build-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Retrieve-data-for-a-query" class="common-anchor-header">クエリのデータを取得する</h3><p>ドキュメントに関する質問を指定してみましょう。</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;What was the office address of Hiroshi&#x27;s partner from Munich?&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>コレクションで質問を検索し、セマンティックトップ1マッチを取得する。</p>
<pre><code translate="no" class="language-python">search_res = milvus_client.search(
    collection_name=collection_name,
    data=[
        emb_text(question)
    ],  <span class="hljs-comment"># Use the `emb_text` function to convert the question to an embedding vector</span>
    limit=<span class="hljs-number">1</span>,  <span class="hljs-comment"># Return top 1 results</span>
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}},  <span class="hljs-comment"># Inner product distance</span>
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],  <span class="hljs-comment"># Return the text field</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>クエリの検索結果を見てみよう</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json

retrieved_lines_with_distances = [
    (res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>], res[<span class="hljs-string">&quot;distance&quot;</span>]) <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> search_res[<span class="hljs-number">0</span>]
]
<span class="hljs-built_in">print</span>(json.dumps(retrieved_lines_with_distances, indent=<span class="hljs-number">4</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[
    [
        &quot;Hiroshi [B-NAME] [I-STREET_ADDRESS] a businessman from Tokyo Japan went to attend tech expo at the Berlin Convention Center on November 10 2023 . He registered for event 9 AM using his digital passport number Q [B-ID_NUM] [B-NAME] with industry professionals participated in panel discussions and had lunch some potential partners One of he met was Munich they decided keep touch : partner ' s office address given as house No [I-STREET_ADDRESS] [B-NAME] business card 654 [B-STREET_ADDRESS]&quot;,
        0.6544462442398071
    ]
]
</code></pre>
<h3 id="Use-LLM-to-get-a-RAG-response" class="common-anchor-header">LLMを使ってRAGレスポンスを取得する</h3><p>検索されたドキュメントを文字列形式に変換する。</p>
<pre><code translate="no" class="language-python">context = <span class="hljs-string">&quot;\n&quot;</span>.<span class="hljs-keyword">join</span>(
    [<span class="hljs-meta">line_with_distance[0</span>] <span class="hljs-keyword">for</span> line_with_distance <span class="hljs-keyword">in</span> retrieved_lines_with_distances]
)
<button class="copy-code-btn"></button></code></pre>
<p>LLMのシステムプロンプトとユーザープロンプトを定義する。</p>
<p>注：スニペットの中に有用な情報がない場合は、&quot;I don't know &quot;と言ってくださいとLLMに伝えます。</p>
<pre><code translate="no" class="language-python">SYSTEM_PROMPT = <span class="hljs-string">&quot;&quot;&quot;
Human: You are an AI assistant. You are able to find answers to the questions from the contextual passage snippets provided. If there are no useful information in the snippets, just say &quot;I don&#x27;t know&quot;.
AI:
&quot;&quot;&quot;</span>
USER_PROMPT = <span class="hljs-string">f&quot;&quot;&quot;
Use the following pieces of information enclosed in &lt;context&gt; tags to provide an answer to the question enclosed in &lt;question&gt; tags.
&lt;context&gt;
<span class="hljs-subst">{context}</span>
&lt;/context&gt;
&lt;question&gt;
<span class="hljs-subst">{question}</span>
&lt;/question&gt;
&quot;&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>OpenAI ChatGPTを使って、プロンプトに基づいた応答を生成します。</p>
<pre><code translate="no" class="language-python">response = openai_client.chat.completions.create(
    model=<span class="hljs-string">&quot;gpt-4o-mini&quot;</span>,
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: SYSTEM_PROMPT},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: USER_PROMPT},
    ],
)
<span class="hljs-built_in">print</span>(response.choices[<span class="hljs-number">0</span>].message.content)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">I don't know.
</code></pre>
<p>ここでは、PIIをマスクに置き換えているため、LLMはPIIの情報を文脈から取得できないことがわかります。このようにして、ユーザーのプライバシーを効果的に保護することができます。</p>
