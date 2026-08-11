---
id: array-operators.md
title: ARRAY演算子
summary: Milvus には、ARRAY フィールドのフィルタリングや ARRAY フィールドの値の一部更新を行うための ARRAY 演算子が用意されています。
---
<h1 id="ARRAY-Operators" class="common-anchor-header">ARRAY演算子<button data-href="#ARRAY-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus には、ARRAY フィールドのフィルタリングや ARRAY フィールド値の部分的な更新を行うための ARRAY 演算子が用意されています。</p>
<div class="alert note">
<p>配列内のすべての要素は同じ型でなければならず、配列内のネストされた構造体は単純な文字列として扱われます。したがって、ARRAYフィールドを扱う際は、過度なネストを避け、パフォーマンスを最適化するためにデータ構造をできるだけフラットに保つことをお勧めします。</p>
</div>
<p>Milvus の ARRAY 演算子は、次の 2 つの使用シナリオに対応しています。</p>
<ul>
<li><p>クエリおよび検索のためのフィルタ式。</p></li>
<li><p><code translate="no">upsert</code> リクエストにおける部分更新。</p></li>
</ul>
<h2 id="Available-ARRAY-operators" class="common-anchor-header">利用可能なARRAY演算子<button data-href="#Available-ARRAY-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>以下の表は、Milvusで利用可能なARRAY演算子の一覧です。</p>
<table>
<thead>
<tr><th>演算子</th><th>使用場所</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/ja/array-operators.md#ARRAYCONTAINS">ARRAY_CONTAINS(識別子, 式)</a></td><td>フィルタ式</td><td>ARRAY フィールドに特定の要素が存在するかどうかを確認します。</td></tr>
<tr><td><a href="/docs/ja/array-operators.md#ARRAYCONTAINSALL">ARRAY_CONTAINS_ALL(識別子, 式)</a></td><td>フィルタ式</td><td>指定されたリスト内のすべての要素が ARRAY フィールドに存在するかどうかを調べます。</td></tr>
<tr><td><a href="/docs/ja/array-operators.md#ARRAYCONTAINSANY">ARRAY_CONTAINS_ANY(識別子, 式)</a></td><td>フィルタ式</td><td>指定されたリスト内のいずれかの要素が ARRAY フィールドに存在するかどうかを調べます。</td></tr>
<tr><td><a href="/docs/ja/array-operators.md#ARRAYLENGTH">ARRAY_LENGTH(識別子)</a></td><td>フィルタ式</td><td>ARRAY フィールド内の要素数を返し、フィルタリングのために比較演算子と組み合わせることができます。</td></tr>
<tr><td><a href="/docs/ja/array-operators.md#ARRAYAPPEND">ARRAY_APPEND</a></td><td><code translate="no">upsert</code> with<code translate="no">field_ops</code></td><td>既存のARRAYフィールドにペイロード要素を追加します。Milvus v2.6.17以降で利用可能です。</td></tr>
<tr><td><a href="/docs/ja/array-operators.md#ARRAYREMOVE">ARRAY_REMOVE</a></td><td><code translate="no">upsert</code> と<code translate="no">field_ops</code></td><td>リクエストペイロード内の値と一致する要素を、既存のARRAYフィールドからすべて削除します。Milvus v2.6.17以降で利用可能です。</td></tr>
</tbody>
</table>
<h2 id="ARRAYCONTAINS" class="common-anchor-header">ARRAY_CONTAINS<button data-href="#ARRAYCONTAINS" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ARRAY_CONTAINS</code> 演算子は、配列フィールドに特定の要素が存在するかどうかを確認します。配列内に指定された要素が含まれるエンティティを検索したい場合に便利です。</p>
<p><strong>例</strong></p>
<p><code translate="no">history_temperatures</code> という配列フィールドがあり、そこに各年の観測最低気温が格納されているとします。この配列に値「<code translate="no">23</code> 」が含まれるすべてのエンティティを検索するには、次のフィルタ式を使用できます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS(history_temperatures, 23)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>これにより、<code translate="no">history_temperatures</code> 配列に<code translate="no">23</code> という値が含まれるすべてのエンティティが返されます。</p>
<h2 id="ARRAYCONTAINSALL" class="common-anchor-header">ARRAY_CONTAINS_ALL<button data-href="#ARRAYCONTAINSALL" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ARRAY_CONTAINS_ALL</code> 演算子は、指定されたリストのすべての要素が配列フィールドに含まれていることを保証します。この演算子は、配列に複数の値を含むエンティティを照合したい場合に役立ちます。</p>
<p><strong>例</strong></p>
<p><code translate="no">history_temperatures</code> 配列に<code translate="no">23</code> と<code translate="no">24</code> の両方が含まれるすべてのエンティティを検索するには、次のようにします。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>これにより、<code translate="no">history_temperatures</code> 配列に指定された両方の値が含まれているすべてのエンティティが返されます。</p>
<h2 id="ARRAYCONTAINSANY" class="common-anchor-header">ARRAY_CONTAINS_ANY<button data-href="#ARRAYCONTAINSANY" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ARRAY_CONTAINS_ANY</code> 演算子は、指定されたリストの要素のいずれかが配列フィールドに含まれているかどうかを確認します。これは、配列内の指定された値のうち少なくとも1つを含むエンティティを抽出したい場合に役立ちます。</p>
<p><strong>例</strong></p>
<p><code translate="no">history_temperatures</code> 配列に<code translate="no">23</code> または<code translate="no">24</code> のいずれかが含まれるすべてのエンティティを検索するには、次のようにします：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>これにより、<code translate="no">history_temperatures</code> 配列に<code translate="no">23</code> または<code translate="no">24</code> のいずれか1つ以上が含まれるすべてのエンティティが返されます。</p>
<h2 id="ARRAYLENGTH" class="common-anchor-header">ARRAY_LENGTH<button data-href="#ARRAYLENGTH" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ARRAY_LENGTH</code> は、配列フィールドの長さ（要素数）を返します。この関数は、配列フィールドの識別子という、ちょうど1つのパラメータを受け取ります。</p>
<p><strong>例</strong></p>
<p><code translate="no">history_temperatures</code> 配列の要素数が10未満であるすべてのエンティティを検索するには：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_LENGTH(history_temperatures) &lt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>これにより、<code translate="no">history_temperatures</code> 配列の要素数が10未満であるすべてのエンティティが返されます。</p>
<h2 id="ARRAYAPPEND--Milvus-2617+" class="common-anchor-header">ARRAY_APPEND<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.17+</span><button data-href="#ARRAYAPPEND--Milvus-2617+" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ARRAY_APPEND</code> 演算子は、<code translate="no">upsert</code> リクエスト中に、既存のARRAYフィールドにペイロード要素を追加します。これはフィルタ式ではありません。現在の配列値を事前に照会せずに配列に値を追加したい場合に使用します。</p>
<p>次の Python の例は、プライマリキーが `<code translate="no">1</code>` であるエンティティの `<code translate="no">tags</code> ` ARRAY フィールドに `<code translate="no">&quot;premium&quot;</code> ` を追加するものです。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldOp, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.upsert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
    data=[{<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;premium&quot;</span>]}],
<span class="highlighted-wrapper-line">    field_ops={<span class="hljs-string">&quot;tags&quot;</span>: FieldOp.array_append()},</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">field_ops</code> を通じてフィールドに<code translate="no">ARRAY_APPEND</code> を添付することで、そのフィールドに対して部分更新のセマンティクスが有効になります。完全なワークフロー、サポートされている要素タイプ、および制限については、「<a href="/docs/ja/upsert-entities.md#Upsert-ARRAY-fields-in-merge-mode">マージモードでの ARRAY フィールドのアップサート</a>」を参照してください。</p>
<h2 id="ARRAYREMOVE--Milvus-2617+" class="common-anchor-header">ARRAY_REMOVE<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.17+</span><button data-href="#ARRAYREMOVE--Milvus-2617+" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ARRAY_REMOVE</code> 演算子は、<code translate="no">upsert</code> リクエスト中に、リクエストペイロード内の値と一致する既存のARRAYフィールドからすべての要素を削除します。これはフィルタ式ではありません。現在の配列値を事前にクエリすることなく、配列から一致する値を削除したい場合に使用します。</p>
<p>次の Python の例は、プライマリキーが<code translate="no">1</code> であるエンティティの<code translate="no">tags</code> ARRAY フィールドから、<code translate="no">&quot;trial&quot;</code> を削除します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldOp, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.upsert(
    collection_name=<span class="hljs-string">&quot;users&quot;</span>,
    data=[{<span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;trial&quot;</span>]}],
<span class="highlighted-wrapper-line">    field_ops={<span class="hljs-string">&quot;tags&quot;</span>: FieldOp.array_remove()},</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">field_ops</code> を通じてフィールドに `<code translate="no">ARRAY_REMOVE</code> ` を添付すると、そのフィールドに対して部分更新のセマンティクスが有効になります。完全なワークフロー、サポートされている要素タイプ、および制限については、「<a href="/docs/ja/upsert-entities.md#Upsert-ARRAY-fields-in-merge-mode">マージモードでの Upsert ARRAY フィールド</a>」を参照してください。</p>
