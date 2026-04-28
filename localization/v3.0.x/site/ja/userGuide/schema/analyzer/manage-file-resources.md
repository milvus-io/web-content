---
id: manage-file-resources.md
title: ファイルリソースの管理
summary: Milvusテキストアナライザが実行時に読み込む外部辞書ファイルを登録・管理します。
---
<h1 id="Manage-File-Resources" class="common-anchor-header">ファイルリソースの管理<button data-href="#Manage-File-Resources" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>ファイル・リソースとは</strong>、テキスト解析ツールが実行時に利用する外部辞書ファイルへの参照をサーバーに登録したものである。Milvus3.0では、4つのアナライザーコンポーネントがインライン配列からではなく、ファイルリソースから辞書をロードすることができます：</p>
<table>
   <tr>
     <th><p><strong>アナライザコンポーネント</strong></p></th>
     <th><p><strong>ファイルリソースを受け取るパラメータ</strong></p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/jieba-tokenizer.md">Jiebaトークナイザ</a></p></td>
     <td><p><code translate="no">extra_dict_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/stop-filter.md">停止フィルタ</a></p></td>
     <td><p><code translate="no">stop_words_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/decompounder-filter.md">逆コンパウンダー・フィルター</a></p></td>
     <td><p><code translate="no">word_list_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ja/synonym-filter.md">同義語フィルター</a></p></td>
     <td><p><code translate="no">synonyms_file</code></p></td>
   </tr>
</table>
<p>ファイル・リソースは、インライン辞書配列の2つの実用的な問題を解決する：</p>
<ul>
<li><p>実際の辞書は大きい。実際の辞書は大きい。中国語の Jieba 語彙は数万行になることがあり、類義語テーブルは通常数千ルールになる。同義語テーブルは通常、数千のルールである。これらを解析器構成にインライン化することは非現実的である。</p></li>
<li><p>同じ辞書は通常、コレクション間で共有されます。辞書を一度登録してから名前で参照することで、スキーマを小さく保ち、辞書の更新を1回の操作で済ませることができます。</p></li>
</ul>
<h2 id="File-resource-types" class="common-anchor-header">ファイル・リソース・タイプ<button data-href="#File-resource-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusは管理責任の異なる2つのファイルリソースタイプをサポートしています：</p>
<table>
   <tr>
     <th><p><strong>タイプ</strong></p></th>
     <th><p><strong>ファイルの保存場所</strong></p></th>
     <th><p><strong>ファイルの管理者</strong></p></th>
     <th><p><strong>フィット</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>リモート</strong></p></td>
     <td><p>Milvusクラスタが既に使用するように設定されているオブジェクトストア(MinIO / S3 / GCS / Azure)内</p></td>
     <td><p>Milvus,<code translate="no">add_file_resource</code> /<code translate="no">remove_file_resource</code> /<code translate="no">list_file_resources</code> クライアントAPI経由</p></td>
     <td><p>ほとんどのデプロイメントに推奨</p></td>
   </tr>
   <tr>
     <td><p><strong>ローカル</strong></p></td>
     <td><p>各Milvusコンポーネント（DataNode、QueryNode、StreamingNode）のローカルファイルシステム上の同じ絶対パス。</p></td>
     <td><p>お客様 - Kubernetesボリュームを経由するなどして、お客様自身でファイルをマウントしてください。</p></td>
     <td><p>オープンソース/セルフホストシナリオでは、Milvusの外部で辞書ファイルを管理します。</p></td>
   </tr>
</table>
<p>このページの残りの部分では、両方のタイプについて、より一般的なリモートタイプから説明します。</p>
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
    </button></h2><ul>
<li><p><strong>リモート</strong>ファイル リソースの場合、Milvus デプロイメントにオブジェクト ストアが設定されている必要があります。ほとんどのデプロイメントではすでに設定されています。<code translate="no">milvus.yaml</code> (または同等の Helm チャート値) の<code translate="no">minio:</code> セクションを確認してください。<code translate="no">bucketName</code> と<code translate="no">rootPath</code> の値に注意してください。ファイルリソースを登録するときに必要になります。</p></li>
<li><p><strong>ローカル</strong>ファイルリソースの場合、すべてのMilvusポッド/コンテナに同じ絶対パスでファイルを配置できる必要があります。その方法は、デプロイメントによって異なります（バインドマウント、ConfigMap バックアップボリューム、init コンテナなど）。</p></li>
</ul>
<h2 id="Register-a-remote-file-resource" class="common-anchor-header">リモートファイルリソースの登録<button data-href="#Register-a-remote-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><p>リモートファイルリソースの登録は、オブジェクトストレージにファイルを<strong>アップロード</strong>し、任意の名前でMilvusに<strong>登録</strong>し、そのファイルを必要とするアナライザから<strong>参照</strong>するという3ステップのワークフローです。</p>
<h3 id="Step-1-Upload-the-dictionary-file-to-object-storage" class="common-anchor-header">ステップ 1.辞書ファイルをオブジェクト・ストレージにアップロードする。<button data-href="#Step-1-Upload-the-dictionary-file-to-object-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>独自のツール(<code translate="no">mc</code>,<code translate="no">aws s3 cp</code>,<code translate="no">boto3</code>, または任意のS3互換クライアント)を使用して、Milvusが使用するように設定されているバケットにファイルを置く。</p>
<p>例えば、<code translate="no">milvus.yaml</code> に</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">milvus-bucket</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">file</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">rootPath</code> をプレフィックスとして<code translate="no">chinese_terms.txt</code> という名前のファイルをアップロードすると、オブジェクトは<code translate="no">s3://milvus-bucket/file/chinese_terms.txt</code> に置かれます。</p>
<p>ステップ 2 で<code translate="no">add_file_resource</code> に渡す<code translate="no">path</code> 引数は、<strong>rootPath 接頭辞を含む完全なオブジェクトキーで</strong>、上記の例では<code translate="no">path=&quot;file/chinese_terms.txt&quot;</code> です。プレフィックスを含まないパス（たとえば、<code translate="no">&quot;chinese_terms.txt&quot;</code> だけ）は、エラー<code translate="no">file resource path not exist</code> で拒否されます。</p>
<h3 id="Step-2-Register-the-file-with-addfileresource" class="common-anchor-header">ステップ 2.でファイルを登録する。<code translate="no">add_file_resource</code><button data-href="#Step-2-Register-the-file-with-addfileresource" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

client.add_file_resource(
    name=<span class="hljs-string">&quot;chinese_terms&quot;</span>,                <span class="hljs-comment"># short, unique name you&#x27;ll reference later</span>
    path=<span class="hljs-string">&quot;file/chinese_terms.txt&quot;</span>,       <span class="hljs-comment"># full S3 object key, including the rootPath prefix</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">add_file_resource</code> Milvusが設定されたオブジェクトストアの<code translate="no">path</code> にオブジェクトが存在することを確認した後にのみ、呼び出しが返されます。オブジェクトが見つからない場合、呼び出しは<code translate="no">MilvusException(code=65535, &quot;file resource path not exist&quot;)</code> を発生させる - まずファイルをアップロードし、その後再試行する。</p>
<p>この呼び出しは冪等です。同じ<code translate="no">name</code> と<code translate="no">path</code> で<code translate="no">add_file_resource</code> を2回呼び出しても、重複は作成されない。</p>
<h3 id="Step-3-Reference-the-file-resource-from-an-analyzer" class="common-anchor-header">ステップ3.アナライザーからファイルリソースを参照する<button data-href="#Step-3-Reference-the-file-resource-from-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>アナライザー・パラメーターがファイル参照を受け付ける場合 (<code translate="no">extra_dict_file</code>,<code translate="no">stop_words_file</code>,<code translate="no">word_list_file</code>,<code translate="no">synonyms_file</code>)、正規のリモート形式を使用します：</p>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;remote&quot;</span>,
    <span class="hljs-string">&quot;resource_name&quot;</span>: <span class="hljs-string">&quot;chinese_terms&quot;</span>,    <span class="hljs-comment"># must match the name in add_file_resource</span>
    <span class="hljs-string">&quot;file_name&quot;</span>: <span class="hljs-string">&quot;chinese_terms.txt&quot;</span>,    <span class="hljs-comment"># filename only — Milvus uses this to identify the file inside the resource</span>
}
<button class="copy-code-btn"></button></code></pre>
<p>4つのアナライザー・パラメーターはすべて同じ形を使用します。解析器ごとの具体的な例としては、Jieba tokenizer、Stop filter、Decompounder filter、Synonym filterを参照のこと。</p>
<p>パラメータ名は<code translate="no">resource_name</code> と<code translate="no">file_name</code> であり、<code translate="no">name</code> と<code translate="no">file</code> ではない。<code translate="no">name</code> /<code translate="no">file</code> (または<code translate="no">&quot;type&quot;: &quot;remote&quot;</code> の代わりに<code translate="no">&quot;type&quot;: &quot;resource&quot;</code> ) を使用すると、分析器作成時に<code translate="no">resource name of remote file ... must be set</code> のようなメッセージとともに<code translate="no">MilvusException</code> が発生します。</p>
<h2 id="List-file-resources" class="common-anchor-header">ファイル・リソースのリスト<button data-href="#List-file-resources" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">resources = client.list_file_resources()
<span class="hljs-keyword">for</span> r <span class="hljs-keyword">in</span> resources:
    <span class="hljs-built_in">print</span>(r.name, r.path)
<span class="hljs-comment"># chinese_terms file/chinese_terms.txt</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">list_file_resources()</code> は、<code translate="no">.name</code> と<code translate="no">.path</code> 属性を持つ<code translate="no">FileResourceInfo</code> オブジェクトのリストを返します。空のクラスタは<code translate="no">[]</code> を返します。リソースごとの<code translate="no">get</code> はありません。<code translate="no">list_file_resources</code> が唯一の読み取りAPIです。</p>
<h2 id="Remove-a-file-resource" class="common-anchor-header">ファイル・リソースの削除<button data-href="#Remove-a-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">client.remove_file_resource(name=<span class="hljs-string">&quot;chinese_terms&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">remove_file_resource</code> はべき等です。存在しない名前で呼び出すと、<code translate="no">None</code> がそのまま返されます。</p>
<p>ファイル・リソースを削除する前に、アナライザ・コンフィギュレーションがそれを参照しているコレクションをすべて削除または変更してください。コレクションがファイル・リソースに依存しなくなるまでファイル・リソースを保持することで、リソースがなくなった後にアナライザ・ルックアップが失敗するリスクを回避できます。</p>
<h2 id="Use-a-local-file-resource" class="common-anchor-header">ローカルファイルリソースの使用<button data-href="#Use-a-local-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>ローカル</strong>ファイルリソースは、Milvusコンポーネントのローカルファイルシステム上のパスを直接指定します。Milvusはローカルリソースを追跡しませんので、<code translate="no">add_file_resource</code> 。関連するすべてのポッドまたはコンテナ上の同じ絶対パスにファイルを配置し、パスで参照します：</p>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;local&quot;</span>,
    <span class="hljs-string">&quot;path&quot;</span>: <span class="hljs-string">&quot;/var/lib/milvus/dicts/chinese_terms.txt&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<p>ローカルファイルリソースは、DataNodes、QueryNodes、StreamingNodesのファイルシステムをコントロールするデプロイでのみ有効です。通常は、ベアメタル上のセルフホストMilvus、またはボリュームマウントを追加できるKubernetesクラスタ上です。ファイルは各コンポーネントで全く同じ絶対パスに存在する必要があります。そうでない場合、アナライザをロードする際に失敗するノードがあります。</p>
<p>このファイルは、アナライザーが最初に作成されたときに開かれます。その時点でパスが存在しない場合、アナライザーの作成は<code translate="no">MilvusException(code=2000, &quot;IOError: No such file or directory&quot;)</code> で失敗します。</p>
<h2 id="Considerations" class="common-anchor-header">考慮事項<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p><strong>クラスタ全体の可用性は即時ではありません。</strong> <code translate="no">add_file_resource</code> 、Milvusはファイルを必要とするすべてのコンポーネントにファイルを同期します。この短いウィンドウの間に、まだ同期していないノードでリソースを参照するコレクションが作成に失敗することがあります。典型的な修正は、数秒後にcreateコールを再試行することです。</p></li>
<li><p><strong>リソースに依存するコレクションがない場合にのみ削除します。</strong> <code translate="no">remove_file_resource</code> を呼び出す前に、アナライザ構成がリソースを参照しているコ レクションを削除または変更することで、アナライザの検索でファイルが見つ からないことを回避できる。</p></li>
<li><p><strong>メタデータのみ。</strong> <code translate="no">list_file_resources()</code> は、<code translate="no">name</code> と<code translate="no">path</code> を返します。サイズ、チェックサム、アップロード時間、その他のメタデータはありません。必要であれば、独自の命名規則で辞書のバージョンを追跡してください。</p></li>
</ul>
