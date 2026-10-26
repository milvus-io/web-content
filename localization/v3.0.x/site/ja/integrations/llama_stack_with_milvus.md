---
id: llama_stack_with_milvus.md
title: Milvus を使用して Llama Stack で RAG を構築する
related_key: Llama Stack
summary: >-
  このチュートリアルでは、Milvus を設定した Llama Stack
  サーバーを構築し、プライベートデータをインポートしてナレッジベースとして活用する方法をご紹介します。その後、サーバーに対してクエリを実行し、完全な RAG
  アプリケーションを構築します。
---
<h1 id="Build-RAG-with-Llama-Stack-with-Milvus" class="common-anchor-header">Milvus を使用して Llama Stack で RAG を構築する<button data-href="#Build-RAG-with-Llama-Stack-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/meta-llama/llama-stack/tree/main">Llama Stackは</a>、本番環境向けのAIアプリケーションを構築するための、サービス指向かつAPIファーストのアプローチです。開発者がどこでも開発し、どこにでもデプロイでき、真のプロバイダー非依存性を備えた本番環境対応のビルディングブロックを活用できる、汎用的なスタックを提供します。Llama Stackは、MetaのLlamaモデル、コンポーザビリティ、本番環境対応性、そしてパートナーエコシステムに重点を置いています。</p>
<p>このチュートリアルでは、Milvusで構成されたLlama Stackサーバーを構築し、プライベートデータをインポートしてナレッジベースとして活用する方法をご紹介します。その後、サーバーに対してクエリを実行し、完全なRAGアプリケーションを作成します。</p>
<h2 id="Preparing-the-Environment" class="common-anchor-header">環境の準備<button data-href="#Preparing-the-Environment" class="anchor-icon" translate="no">
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
    </button></h2><p>Llama Stackサーバーを起動するには、<a href="https://llama-stack.readthedocs.io/en/latest/distributions/importing_as_library.html">ライブラリとして利用したり</a>、<a href="https://llama-stack.readthedocs.io/en/latest/distributions/building_distro.html">ディストリビューションをビルドしたりするなど</a>、多くの方法があります。また、Llama Stackの各コンポーネントについても、さまざまなプロバイダーを選択できます。そのため、Llama Stackサーバーを起動する方法は数多く存在します。</p>
<p>このチュートリアルでは、サービスを起動する例として以下の構成を使用します。別の方法で起動したい場合は、「<a href="https://llama-stack.readthedocs.io/en/latest/distributions/index.html">Llama Stackサーバーの起動</a>」を参照してください。</p>
<ul>
<li>Condaを使用して、Milvusの設定を含むカスタムディストリビューションを構築します。</li>
<li>LLMプロバイダーには<a href="https://llama-stack.readthedocs.io/en/latest/distributions/self_hosted_distro/together.html#via-conda">Together AI</a>を使用します。</li>
<li>埋め込みモデルには、デフォルトの<code translate="no">all-MiniLM-L6-v2</code> を使用します。</li>
</ul>
<div class="alert note">
<p>このチュートリアルでは、<a href="https://llama-stack.readthedocs.io/en/latest/index.html">主にLlama Stackドキュメントの</a>公式インストールガイドを参照しています。このチュートリアルに古い情報がある場合は、公式ガイドを優先して参照し、問題報告（issue）を提出してください。</p>
</div>
<h2 id="Start-Llama-Stack-Server" class="common-anchor-header">Llama Stackサーバーの起動<button data-href="#Start-Llama-Stack-Server" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prepare-the-Environment" class="common-anchor-header">環境の準備<button data-href="#Prepare-the-Environment" class="anchor-icon" translate="no">
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
    </button></h3><p>LLMサービスとしてTogether AIを使用する必要があるため、まず公式サイトにログインして<a href="https://api.together.xyz/settings/api-keys">APIキー</a>を申請し、そのAPIキー<code translate="no">TOGETHER_API_KEY</code> を環境変数として設定する必要があります。</p>
<p>Llama Stackのソースコードをクローンする</p>
<pre><code translate="no" class="language-bash">$ git <span class="hljs-built_in">clone</span> https://github.com/meta-llama/llama-stack.git
$ <span class="hljs-built_in">cd</span> llama-stack
<button class="copy-code-btn"></button></code></pre>
<p>conda環境を作成し、依存関係をインストールする</p>
<pre><code translate="no" class="language-bash">$ conda create -n stack python=3.10
$ conda activate stack

$ pip install -e .
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">llama_stack/llama_stack/templates/together/run.yaml</code> 内の内容を変更し、vector_io セクションを Milvus 用の適切な設定に置き換えます。例えば、次のように追加します：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">vector_io:</span>
<span class="hljs-bullet">-</span> <span class="hljs-attr">provider_id:</span> <span class="hljs-string">milvus</span>
  <span class="hljs-attr">provider_type:</span> <span class="hljs-string">inline::milvus</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">db_path:</span> <span class="hljs-string">~/.llama/distributions/together/milvus_store.db</span>

<span class="hljs-comment">#  - provider_id: milvus</span>
<span class="hljs-comment">#    provider_type: remote::milvus</span>
<span class="hljs-comment">#    config:</span>
<span class="hljs-comment">#      uri: http://localhost:19530</span>
<span class="hljs-comment">#      token: root:Milvus</span>
<button class="copy-code-btn"></button></code></pre>
<p>Llama Stackでは、Milvusは2つの方法で設定できます。1つは<code translate="no">inline::milvus</code> によるローカル設定、もう1つは<code translate="no">remote::milvus</code> によるリモート設定です。</p>
<ul>
<li><p>最も簡単な方法はローカル設定であり、<a href="https://milvus.io/docs/quickstart.md">Milvus-Lite</a>ファイルをローカルに保存するためのパスである<code translate="no">db_path</code> を設定する必要があります。</p></li>
<li><p>リモート設定は、大規模なデータストレージに適しています。</p>
<ul>
<li>データ量が多い場合は、<a href="https://milvus.io/docs/quickstart.md">Docker や Kubernetes</a> 上で高性能な Milvus サーバーをセットアップできます。この設定では、<code translate="no">uri</code> として、サーバーの URI（例:<code translate="no">http://localhost:19530</code> ）を使用してください。<code translate="no">token</code> のデフォルト値は<code translate="no">root:Milvus</code> です。</li>
<li>Milvus向けのフルマネージドクラウドサービス<a href="https://zilliz.com/cloud">であるZilliz Cloud</a>をご利用になる場合は、Zilliz Cloudの「<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">パブリックエンドポイント」および「APIキー」</a>に対応する<code translate="no">uri</code> と<code translate="no">token</code> を調整してください。</li>
</ul></li>
</ul>
<h3 id="Build-distribution-from-the-template" class="common-anchor-header">テンプレートからディストリビューションをビルドする<button data-href="#Build-distribution-from-the-template" class="anchor-icon" translate="no">
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
    </button></h3><p>ディストリビューションをビルドするには、次のコマンドを実行してください:</p>
<pre><code translate="no" class="language-bash">$ llama stack build --template together --image-type conda
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">~/.llama/distributions/together/together-run.yaml</code> にファイルが生成されます。その後、次のコマンドを実行してサーバーを起動してください：</p>
<pre><code translate="no" class="language-bash">$ llama stack run --image-type conda ~/.llama/distributions/together/together-run.yaml
<button class="copy-code-btn"></button></code></pre>
<p>すべてが順調に進めば、Llama Stack サーバーがポート 8321 で正常に動作していることが確認できるはずです。</p>
<h2 id="Perform-RAG-from-client" class="common-anchor-header">クライアントからRAGを実行する<button data-href="#Perform-RAG-from-client" class="anchor-icon" translate="no">
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
    </button></h2><p>サーバーを起動したら、サーバーにアクセスするためのクライアントコードを記述できます。以下にサンプルコードを示します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> uuid
<span class="hljs-keyword">from</span> llama_stack_client.types <span class="hljs-keyword">import</span> Document
<span class="hljs-keyword">from</span> llama_stack_client.lib.agents.agent <span class="hljs-keyword">import</span> Agent
<span class="hljs-keyword">from</span> llama_stack_client.types.agent_create_params <span class="hljs-keyword">import</span> AgentConfig

<span class="hljs-comment"># See https://www.together.ai/models for all available models</span>
INFERENCE_MODEL = <span class="hljs-string">&quot;meta-llama/Llama-3.3-70B-Instruct-Turbo&quot;</span>
LLAMA_STACK_PORT = <span class="hljs-number">8321</span>


<span class="hljs-keyword">def</span> <span class="hljs-title function_">create_http_client</span>():
    <span class="hljs-keyword">from</span> llama_stack_client <span class="hljs-keyword">import</span> LlamaStackClient

    <span class="hljs-keyword">return</span> LlamaStackClient(
        base_url=<span class="hljs-string">f&quot;http://localhost:<span class="hljs-subst">{LLAMA_STACK_PORT}</span>&quot;</span>  <span class="hljs-comment"># Your Llama Stack Server URL</span>
    )


client = create_http_client()

<span class="hljs-comment"># Documents to be used for RAG</span>
urls = [<span class="hljs-string">&quot;chat.rst&quot;</span>, <span class="hljs-string">&quot;llama3.rst&quot;</span>, <span class="hljs-string">&quot;memory_optimizations.rst&quot;</span>, <span class="hljs-string">&quot;lora_finetune.rst&quot;</span>]
documents = [
    Document(
        document_id=<span class="hljs-string">f&quot;num-<span class="hljs-subst">{i}</span>&quot;</span>,
        content=<span class="hljs-string">f&quot;https://raw.githubusercontent.com/pytorch/torchtune/main/docs/source/tutorials/<span class="hljs-subst">{url}</span>&quot;</span>,
        mime_type=<span class="hljs-string">&quot;text/plain&quot;</span>,
        metadata={},
    )
    <span class="hljs-keyword">for</span> i, url <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(urls)
]

<span class="hljs-comment"># Register a vector database</span>
vector_db_id = <span class="hljs-string">f&quot;test-vector-db-<span class="hljs-subst">{uuid.uuid4().<span class="hljs-built_in">hex</span>}</span>&quot;</span>
client.vector_dbs.register(
    vector_db_id=vector_db_id,
    embedding_model=<span class="hljs-string">&quot;all-MiniLM-L6-v2&quot;</span>,
    embedding_dimension=<span class="hljs-number">384</span>,
    provider_id=<span class="hljs-string">&quot;milvus&quot;</span>,
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;inserting...&quot;</span>)
<span class="hljs-comment"># Insert the documents into the vector database</span>
client.tool_runtime.rag_tool.insert(
    documents=documents, vector_db_id=vector_db_id, chunk_size_in_tokens=<span class="hljs-number">1024</span>,
)

agent_config = AgentConfig(
    model=INFERENCE_MODEL,
    <span class="hljs-comment"># Define instructions for the agent ( aka system prompt)</span>
    instructions=<span class="hljs-string">&quot;You are a helpful assistant&quot;</span>,
    enable_session_persistence=<span class="hljs-literal">False</span>,
    <span class="hljs-comment"># Define tools available to the agent</span>
    toolgroups=[{<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;builtin::rag&quot;</span>, <span class="hljs-string">&quot;args&quot;</span>: {<span class="hljs-string">&quot;vector_db_ids&quot;</span>: [vector_db_id]}}],
)

rag_agent = Agent(client, agent_config)
session_id = rag_agent.create_session(<span class="hljs-string">&quot;test-session&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;finish init agent...&quot;</span>)
user_prompt = (
    <span class="hljs-string">&quot;What are the top 5 topics that were explained? Only list succinct bullet points.&quot;</span>
)

<span class="hljs-comment"># Get the final answer from the agent</span>
response = rag_agent.create_turn(
    messages=[{<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: user_prompt}],
    session_id=session_id,
    stream=<span class="hljs-literal">False</span>,
)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Response: &quot;</span>)
<span class="hljs-built_in">print</span>(response.output_message.content)
<button class="copy-code-btn"></button></code></pre>
<p>このコードを実行して、RAGクエリを実行します。
すべてが正常に動作していれば、出力は次のようになります:</p>
<pre><code translate="no" class="language-log">inserting...
finish init agent...
Response: 
* Fine-Tuning Llama3 with Chat Data
* Evaluating fine-tuned Llama3-8B models with EleutherAI's Eval Harness
* Generating text with our fine-tuned Llama3 model
* Faster generation via quantization
* Fine-tuning on a custom chat dataset
</code></pre>
