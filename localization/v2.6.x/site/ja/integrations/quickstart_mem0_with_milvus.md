---
id: quickstart_mem0_with_milvus.md
summary: >-
  このチュートリアルでは、効率的な記憶と検索を可能にする高性能なオープンソースのベクトル・データベースであるMilvusを使用して、Mem0のメモリ管理に不可欠な操作（メモリ履歴の追加、検索、更新、検索、削除、追跡）について説明します。このハンズオン入門では、Mem0とMilvusを使用してパーソナライズされたAIインタラクションを構築するのに役立つ、基礎的なメモリ操作について説明します。
title: Mem0とMilvusを使い始める
---
<h1 id="Getting-Started-with-Mem0-and-Milvus" class="common-anchor-header">Mem0とMilvusを使い始める<button data-href="#Getting-Started-with-Mem0-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/quickstart_mem0_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/quickstart_mem0_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p><a href="https://mem0.ai/">Mem0は</a>、AIアプリケーションのためのインテリジェントなメモリーレイヤーで、ユーザーの好みを保持し、時間の経過とともに継続的に適応することで、パーソナライズされた効率的なインタラクションを実現するように設計されています。チャットボットやAI主導のツールに最適なMem0は、シームレスでコンテキストを意識したエクスペリエンスを実現します。</p>
<p>このチュートリアルでは、効率的な保存と検索を可能にする高性能なオープンソース・ベクター・データベースである<a href="https://milvus.io/">Milvusを</a>使用して、Mem0に不可欠なメモリー管理操作（メモリー履歴の追加、検索、更新、検索、削除、追跡）について説明します。このハンズオン入門では、Mem0とMilvusを使用してパーソナライズされたAIインタラクションを構築するのに役立つ、基礎的なメモリー操作について説明します。</p>
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
    </button></h2><h3 id="Download-required-libraries" class="common-anchor-header">必要なライブラリのダウンロード<button data-href="#Download-required-libraries" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install mem0ai pymilvus milvus-lite</span>
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>Google Colabを使用している場合、インストールした依存関係を有効にするために、<strong>ランタイムを再起動</strong>する必要があります（画面上部の "Runtime "メニューをクリックし、ドロップダウンメニューから "Restart session "を選択してください）。</p>
</blockquote>
<h3 id="Configure-Mem0-with-Milvus" class="common-anchor-header">Milvusを使ったMem0の設定<button data-href="#Configure-Mem0-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>この例ではOpenAIをLLMとして使用します。環境変数として<a href="https://platform.openai.com/docs/quickstart">api key</a> <code translate="no">OPENAI_API_KEY</code> 。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>次に、Milvusをベクターストアとして使うようにMem0を設定します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define Config</span>
<span class="hljs-keyword">from</span> mem0 <span class="hljs-keyword">import</span> Memory

config = {
    <span class="hljs-string">&quot;vector_store&quot;</span>: {
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;milvus&quot;</span>,
        <span class="hljs-string">&quot;config&quot;</span>: {
            <span class="hljs-string">&quot;collection_name&quot;</span>: <span class="hljs-string">&quot;quickstart_mem0_with_milvus&quot;</span>,
            <span class="hljs-string">&quot;embedding_model_dims&quot;</span>: <span class="hljs-string">&quot;1536&quot;</span>,
            <span class="hljs-string">&quot;url&quot;</span>: <span class="hljs-string">&quot;./milvus.db&quot;</span>,  <span class="hljs-comment"># Use local vector database for demo purpose</span>
        },
    },
    <span class="hljs-string">&quot;version&quot;</span>: <span class="hljs-string">&quot;v1.1&quot;</span>,
}

m = Memory.from_config(config)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<blockquote>
<ul>
<li>小規模なデータやプロトタイピングのためにローカルのベクターデータベースが必要なだけであれば、uriをローカルファイル、例えば<code translate="no">./milvus.db</code> に設定するのが最も便利な方法です。</li>
<li>もし、100万ベクトルを超えるような大規模なデータがある場合は、<a href="https://milvus.io/docs/quickstart.md">DockerやKubernetes</a>上に、よりパフォーマンスの高いMilvusサーバを構築することができます。このセットアップでは、サーバのアドレスとポートをURIとして使用してください（例：<code translate="no">http://localhost:19530</code> ）。Milvusで認証機能を有効にしている場合は、トークンとして "<your_username>:<your_password>" を使用します。そうでない場合は、トークンを設定しないでください。</li>
<li>Milvusのフルマネージドクラウドサービスである<a href="https://zilliz.com/cloud">Zilliz Cloudを</a>ご利用の場合は、Zilliz Cloudの<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">Public EndpointとAPI keyに</a>対応する<code translate="no">uri</code> と<code translate="no">token</code> を調整してください。</li>
</ul>
</blockquote>
</div>
<h2 id="Managing-User-Memories-with-Mem0-and-Milvus" class="common-anchor-header">Mem0とMilvusでユーザーメモリを管理する<button data-href="#Managing-User-Memories-with-Mem0-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Adding-a-Memory" class="common-anchor-header">メモリの追加<button data-href="#Adding-a-Memory" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">add</code> 関数は構造化されていないテキストをMilvusにメモリとして保存し、特定のユーザとオプションのメタデータを関連付けます。</p>
<p>ここでは、Aliceの「テニスの上達に取り組んでいる」というメモリーと、Milvusのコンテキストに関連するメタデータを追加しています。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add a memory to user: Working on improving tennis skills</span>
res = m.add(
    messages=<span class="hljs-string">&quot;I am working on improving my tennis skills.&quot;</span>,
    user_id=<span class="hljs-string">&quot;alice&quot;</span>,
    metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;hobbies&quot;</span>},
)

res
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'results': [{'id': '77162018-663b-4dfa-88b1-4f029d6136ab',
   'memory': 'Working on improving tennis skills',
   'event': 'ADD'}],
 'relations': []}
</code></pre>
<h3 id="Update-a-Memory" class="common-anchor-header">メモリの更新<button data-href="#Update-a-Memory" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">add</code> 関数の戻り値を使ってメモリ ID を取得し、<code translate="no">update</code> を使って新しい情報でメモリを更新することができます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get memory_id</span>
memory_id = res[<span class="hljs-string">&quot;results&quot;</span>][<span class="hljs-number">0</span>][<span class="hljs-string">&quot;id&quot;</span>]

<span class="hljs-comment"># Update this memory with new information: Likes to play tennis on weekends</span>
m.update(memory_id=memory_id, data=<span class="hljs-string">&quot;Likes to play tennis on weekends&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'message': 'Memory updated successfully!'}
</code></pre>
<h3 id="Get-All-Memory-For-a-User" class="common-anchor-header">ユーザの全メモリの取得<button data-href="#Get-All-Memory-For-a-User" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvusでは、<code translate="no">get_all</code> 関数を使用して、挿入されたすべてのメモリを表示したり、<code translate="no">user_id</code> でフィルタリングすることができます。</p>
<p>メモリが「テニスのスキルを磨く」から「週末にテニスをするのが好き」に変更されていることがわかります。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get all memory for the user Alice</span>
m.get_all(user_id=<span class="hljs-string">&quot;alice&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'results': [{'id': '77162018-663b-4dfa-88b1-4f029d6136ab',
   'memory': 'Likes to play tennis on weekends',
   'hash': '4c3bc9f87b78418f19df6407bc86e006',
   'metadata': None,
   'created_at': '2024-11-01T19:33:44.116920-07:00',
   'updated_at': '2024-11-01T19:33:47.619857-07:00',
   'user_id': 'alice'}]}
</code></pre>
<h3 id="View-Memory-Update-History" class="common-anchor-header">メモリの更新履歴を見る<button data-href="#View-Memory-Update-History" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">history</code> 、どのmemory_idに興味があるかを指定することで、メモリの更新履歴を見ることもできます。</p>
<pre><code translate="no" class="language-python">m.history(memory_id=memory_id)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[{'id': '71ed3cec-5d9a-4fa6-a009-59802450c0b9',
  'memory_id': '77162018-663b-4dfa-88b1-4f029d6136ab',
  'old_memory': None,
  'new_memory': 'Working on improving tennis skills',
  'event': 'ADD',
  'created_at': '2024-11-01T19:33:44.116920-07:00',
  'updated_at': None},
 {'id': 'db2b003c-ffb7-42e4-bd8a-b9cf56a02bb9',
  'memory_id': '77162018-663b-4dfa-88b1-4f029d6136ab',
  'old_memory': 'Working on improving tennis skills',
  'new_memory': 'Likes to play tennis on weekends',
  'event': 'UPDATE',
  'created_at': '2024-11-01T19:33:44.116920-07:00',
  'updated_at': '2024-11-01T19:33:47.619857-07:00'}]
</code></pre>
<h3 id="Search-Memory" class="common-anchor-header">メモリの検索<button data-href="#Search-Memory" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">search</code> 関数を使うと、そのユーザーに最も関連するメモリーを検索することができる。</p>
<p>まずアリスのメモリーを追加します。</p>
<pre><code translate="no" class="language-python">new_mem = m.add(
    <span class="hljs-string">&quot;I have a linear algebra midterm exam on November 20&quot;</span>,
    user_id=<span class="hljs-string">&quot;alice&quot;</span>,
    metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;task&quot;</span>},
)
<button class="copy-code-btn"></button></code></pre>
<p>ここで、user_idを指定して<code translate="no">get_all</code> 。</p>
<pre><code translate="no" class="language-python">m.get_all(user_id=<span class="hljs-string">&quot;alice&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'results': [{'id': '77162018-663b-4dfa-88b1-4f029d6136ab',
   'memory': 'Likes to play tennis on weekends',
   'hash': '4c3bc9f87b78418f19df6407bc86e006',
   'metadata': None,
   'created_at': '2024-11-01T19:33:44.116920-07:00',
   'updated_at': '2024-11-01T19:33:47.619857-07:00',
   'user_id': 'alice'},
  {'id': 'aa8eaa38-74d6-4b58-8207-b881d6d93d02',
   'memory': 'Has a linear algebra midterm exam on November 20',
   'hash': '575182f46965111ca0a8279c44920ea2',
   'metadata': {'category': 'task'},
   'created_at': '2024-11-01T19:33:57.271657-07:00',
   'updated_at': None,
   'user_id': 'alice'}]}
</code></pre>
<p><code translate="no">search</code> <code translate="no">query</code> 、 。デフォルトでは メトリックを類似性検索に使っているので、 が小さいほど類似性が高いことに注意してください。<code translate="no">user_id</code> <code translate="no">L2</code> <code translate="no">score</code> </p>
<pre><code translate="no" class="language-python">m.search(query=<span class="hljs-string">&quot;What are Alice&#x27;s hobbies&quot;</span>, user_id=<span class="hljs-string">&quot;alice&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'results': [{'id': '77162018-663b-4dfa-88b1-4f029d6136ab',
   'memory': 'Likes to play tennis on weekends',
   'hash': '4c3bc9f87b78418f19df6407bc86e006',
   'metadata': None,
   'score': 1.2807445526123047,
   'created_at': '2024-11-01T19:33:44.116920-07:00',
   'updated_at': '2024-11-01T19:33:47.619857-07:00',
   'user_id': 'alice'},
  {'id': 'aa8eaa38-74d6-4b58-8207-b881d6d93d02',
   'memory': 'Has a linear algebra midterm exam on November 20',
   'hash': '575182f46965111ca0a8279c44920ea2',
   'metadata': {'category': 'task'},
   'score': 1.728922724723816,
   'created_at': '2024-11-01T19:33:57.271657-07:00',
   'updated_at': None,
   'user_id': 'alice'}]}
</code></pre>
<h3 id="Delete-Memory" class="common-anchor-header">メモリの削除<button data-href="#Delete-Memory" class="anchor-icon" translate="no">
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
    </button></h3><p>対応する<code translate="no">memory_id</code> を指定することで、<code translate="no">delete</code> メモリを削除することもできる。</p>
<p><code translate="no">memory_id</code> はすでに検索されているので、"Likes to play tennis on weekends" というメモリーを削除し、<code translate="no">get_all</code> を呼び出して削除が成功したことを確認する。</p>
<pre><code translate="no" class="language-python">m.delete(memory_id=memory_id)

m.get_all(<span class="hljs-string">&quot;alice&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'results': [{'id': 'aa8eaa38-74d6-4b58-8207-b881d6d93d02',
   'memory': 'Has a linear algebra midterm exam on November 20',
   'hash': '575182f46965111ca0a8279c44920ea2',
   'metadata': {'category': 'task'},
   'created_at': '2024-11-01T19:33:57.271657-07:00',
   'updated_at': None,
   'user_id': 'alice'}]}
</code></pre>
