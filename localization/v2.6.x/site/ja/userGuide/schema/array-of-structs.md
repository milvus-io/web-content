---
id: array-of-structs.md
title: 構造体の配列Compatible with Milvus 2.6.4+
summary: >-
  エンティティ内のArray of Structsフィールドは、Struct要素の順序付きセットを格納します。Array 内の各 Struct
  は、複数のベクターとスカラー・フィールドで構成される、事前に定義された同じスキーマを共有します。
beta: Milvus 2.6.4+
---
<h1 id="Array-of-Structs" class="common-anchor-header">構造体の配列<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Array-of-Structs" class="anchor-icon" translate="no">
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
    </button></h1><p>エンティティのArray of Structsフィールドは、Struct要素の順序付きセットを格納します。Array内の各Structは、複数のベクトルとスカラーフィールドで構成される、定義済みの同じスキーマを共有します。</p>
<p>以下は、Array of Structs フィールドを含むコレクションのエンティティの例です。</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    &#x27;id&#x27;<span class="hljs-punctuation">:</span> <span class="hljs-number">0</span><span class="hljs-punctuation">,</span>
    &#x27;title&#x27;<span class="hljs-punctuation">:</span> &#x27;Walden&#x27;<span class="hljs-punctuation">,</span>
    &#x27;title_vector&#x27;<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.3</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.4</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.5</span><span class="hljs-punctuation">]</span>
    &#x27;author&#x27;<span class="hljs-punctuation">:</span> &#x27;Henry David Thoreau&#x27;<span class="hljs-punctuation">,</span>
    &#x27;year_of_publication&#x27;<span class="hljs-punctuation">:</span> <span class="hljs-number">1845</span><span class="hljs-punctuation">,</span>
<span class="highlighted-comment-line">    &#x27;chunks&#x27;<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span></span>
<span class="highlighted-comment-line">        <span class="hljs-punctuation">{</span></span>
<span class="highlighted-comment-line">            &#x27;text&#x27;<span class="hljs-punctuation">:</span> &#x27;When I wrote the following pages<span class="hljs-punctuation">,</span> or rather the bulk of them...&#x27;<span class="hljs-punctuation">,</span></span>
<span class="highlighted-comment-line">            &#x27;text_vector&#x27;<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.3</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.3</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.5</span><span class="hljs-punctuation">]</span></span>
<span class="highlighted-comment-line">            &#x27;chapter&#x27;<span class="hljs-punctuation">:</span> &#x27;Economy&#x27;<span class="hljs-punctuation">,</span></span>
<span class="highlighted-comment-line">        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span></span>
<span class="highlighted-comment-line">        <span class="hljs-punctuation">{</span></span>
<span class="highlighted-comment-line">            &#x27;text&#x27;<span class="hljs-punctuation">:</span> &#x27;I would fain say something<span class="hljs-punctuation">,</span> not so much concerning the Chinese and...&#x27;<span class="hljs-punctuation">,</span></span>
<span class="highlighted-comment-line">            &#x27;text_vector&#x27;<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.7</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.4</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.7</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.8</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span></span>
<span class="highlighted-comment-line">            &#x27;chapter&#x27;<span class="hljs-punctuation">:</span> &#x27;Economy&#x27;</span>
<span class="highlighted-comment-line">        <span class="hljs-punctuation">}</span></span>
<span class="highlighted-comment-line">    <span class="hljs-punctuation">]</span></span>
<span class="highlighted-comment-line">    <span class="hljs-comment">// hightlight-end</span></span>
<span class="highlighted-comment-line"><span class="hljs-punctuation">}</span></span>
<span class="highlighted-comment-line"></span><button class="copy-code-btn"></button></code></pre>
<p>上記の例では、<code translate="no">chunks</code> フィールドが Array of Structs フィールドであり、各 Struct 要素はそれ自身のフィールド、すなわち<code translate="no">text</code> 、<code translate="no">text_vector</code> 、<code translate="no">chapter</code> を含んでいます。</p>
<h2 id="Limits" class="common-anchor-header">制限<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p><strong>データ型</strong></p>
<p>コレクションを作成するとき、Array フィールドの要素のデータ型として Struct 型を使用できます。しかし、既存のコレクションにArray of Structsを追加することはできず、Milvusはコレクションフィールドのデータ型としてStruct型の使用をサポートしていません。</p>
<p>ArrayフィールドのStructは同じスキーマを共有しており、Arrayフィールドの作成時に定義する必要があります。</p>
<p>Struct スキーマには、以下の表に示すように、ベクトルフィールドとスカラーフィールドの両方が含まれます：</p>
<p><table>
<tr>
<th><p>フィールド・タイプ</p></th>
<th><p>データ型</p></th>
</tr>
<tr>
<td><p>ベクター</p></td>
<td><p><code translate="no">FLOAT_VECTOR</code></p></td>
</tr>
<tr>
<td rowspan="5"><p>スカラー</p></td>
<td><p><code translate="no">VARCHAR</code></p></td>
</tr>
<tr>
<td><p><code translate="no">INT8/16/32/64</code></p></td>
</tr>
<tr>
<td><p><code translate="no">FLOAT</code></p></td>
</tr>
<tr>
<td><p><code translate="no">DOUBLE</code></p></td>
</tr>
<tr>
<td><p><code translate="no">BOOLEAN</code></p></td>
</tr>
</table></p>
<p>ベクトル・フィールドの数は、コレクション・レベルでも Structs でも 10 以下にしてください。</p></li>
<li><p><strong>ヌル値とデフォルト値</strong></p>
<p>Array of Structs フィールドは nullable ではなく、デフォルト値も受け付けません。</p></li>
<li><p><strong>関数</strong></p>
<p>Struct 内のスカラー・フィールドからベクトル・フィールドを導出するために関数を使用することはできません。</p></li>
<li><p><strong>インデックス型とメトリック型</strong></p>
<p>コレクション内のすべてのベクトル・フィールドにはインデックスを付ける必要があります。MilvusはArray of Structsフィールド内のベクトルフィールドにインデックスを付けるために、エンベッディングリストを使用して各Struct要素内のベクトルエンベッディングを整理し、エンベッディングリスト全体にインデックスを付けます。</p>
<p>インデックスタイプとして<code translate="no">HNSW</code> を使用し、Array of Structs フィールド内のエンベッディングリストのインデックスを作成するために以下に示すメトリックタイプを使用することができます。</p>
<p><table>
<tr>
<th><p>インデックスタイプ</p></th>
<th><p>メトリック型</p></th>
<th><p>備考</p></th>
</tr>
<tr>
<td rowspan="5"><p><code translate="no">HNSW</code></p></td>
<td><p><code translate="no">MAX_SIM_COSINE</code></p></td>
<td rowspan="3"><p>以下の型の埋め込みリスト用：</p><ul><li><p>FLOAT_VECTOR</p></li><li><p>FLOAT16_VECTOR</p></li><li><p>BLOAT16_VECTOR</p></li><li><p>INT8_VECTOR</p></li></ul></td>
</tr>
<tr>
<td><p><code translate="no">MAX_SIM_IP</code></p></td>
</tr>
<tr>
<td><p><code translate="no">MAX_SIM_L2</code></p></td>
</tr>
<tr>
<td><p><code translate="no">MAX_SIM_HAMMING</code></p></td>
<td rowspan="2"><p>BINARY_VECTOR型の埋め込みリスト用</p></td>
</tr>
<tr>
<td><p><code translate="no">MAX_SIM_JACCARD</code></p></td>
</tr>
</table></p>
<p>Array of Structsフィールドのスカラー・フィールドはインデックスをサポートしていません。</p></li>
<li><p><strong>アップサート・データ</strong></p>
<p>構造体はマージ・モードでのアップサートをサポートしていません。ただし、オーバーライド・モードでアップサートを実行して Structs 内のデータを更新することはできます。マージ・モードでのアップサートとオーバーライド・モードでのアップサートの違いの詳細については、<a href="/docs/ja/upsert-entities.md#Overview">アップサート・エンティティを</a>参照してください。</p></li>
<li><p><strong>スカラー・フィルタリング</strong></p>
<p>検索やクエリ内のフィルタリング式では、Array of Structs や Struct 要素内のフィールドを使用できません。</p></li>
</ul>
<h2 id="Add-Array-of-Structs" class="common-anchor-header">構造体配列の追加<button data-href="#Add-Array-of-Structs" class="anchor-icon" translate="no">
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
    </button></h2><p>MilvusでArray of Structsを使用するには、コレクション作成時に配列フィールドを定義し、その要素のデータ型をStructに設定する必要があります。手順は以下の通りです：</p>
<ol>
<li><p>コレクションスキーマにArrayフィールドとしてフィールドを追加する際に、フィールドのデータ型を<code translate="no">DataType.ARRAY</code> 。</p></li>
<li><p>フィールドの<code translate="no">element_type</code> 属性を<code translate="no">DataType.STRUCT</code> に設定して、フィールドを Struct の Array にします。</p></li>
<li><p>Struct スキーマを作成し、必要なフィールドを含めます。次に、フィールドの<code translate="no">struct_schema</code> 属性で Struct スキーマを参照します。</p></li>
<li><p>フィールドの<code translate="no">max_capacity</code> 属性を適切な値に設定し、各エンティティがこのフィールドに含めることができる Struct の最大数を指定します。</p></li>
<li><p><strong>(オプション</strong>）Struct 要素内の任意のフィールドに<code translate="no">mmap.enabled</code> を設定して、Struct 内のホットデータとコールドデータのバランスを取ることができます。</p></li>
</ol>
<p>以下は、Struct の Array を含むコレクションスキーマを定義する方法です：</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

schema = MilvusClient.create_schema()

<span class="hljs-comment"># add the primary field to the collection</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># add some scalar fields to the collection</span>
schema.add_field(field_name=<span class="hljs-string">&quot;title&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;author&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;year_of_publication&quot;</span>, datatype=DataType.INT64)

<span class="hljs-comment"># add a vector field to the collection</span>
schema.add_field(field_name=<span class="hljs-string">&quot;title_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)

<span class="highlighted-comment-line"><span class="hljs-comment"># Create a struct schema</span></span>
<span class="highlighted-comment-line">struct_schema = MilvusClient.create_struct_field_schema()</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># add a scalar field to the struct</span></span>
<span class="highlighted-comment-line">struct_schema.add_field(<span class="hljs-string">&quot;text&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>)</span>
<span class="highlighted-comment-line">struct_schema.add_field(<span class="hljs-string">&quot;chapter&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># add a vector field to the struct with mmap enabled</span></span>
<span class="highlighted-comment-line">struct_schema.add_field(<span class="hljs-string">&quot;text_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># reference the struct schema in an Array field with its </span></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># element type set to `DataType.STRUCT`</span></span>
<span class="highlighted-comment-line">schema.add_field(<span class="hljs-string">&quot;chunks&quot;</span>, datatype=DataType.ARRAY, element_type=DataType.STRUCT, </span>
<span class="highlighted-comment-line">                    struct_schema=struct_schema, max_capacity=<span class="hljs-number">1000</span>)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>上記のコード例のハイライト行は、コレクションスキーマにArray of Structsを含める手順を示しています。</p>
<h2 id="Set-index-params" class="common-anchor-header">インデックスパラメタの設定<button data-href="#Set-index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクション内のベクトルフィールドと、要素Structで定義されたベクトルフィールドの両方を含む、すべてのベクトルフィールドに対してインデックスの設定が必須です。</p>
<p>適用可能なインデックス・パラメータは、使用するインデックス・タイプによって異なります。適用可能なインデックス・パラメータの詳細については、<a href="/docs/ja/index-explained.md">Index Explained</a>や、選択したインデックス・タイプに固有のドキュメント・ページを参照してください。</p>
<p>埋め込みリストフィールドにインデックスを付けるには、そのインデックスタイプを<code translate="no">HNSW</code> に設定し、埋め込みリスト間の類似性を測定するMilvusのメトリックタイプとして<code translate="no">MAX_SIM_COSINE</code> を使用する必要があります。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create index parameters</span>
index_params = MilvusClient.prepare_index_params()

<span class="hljs-comment"># Create an index for the vector field in the collection</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;title_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>,
    params={<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>}
)

<span class="highlighted-comment-line"><span class="hljs-comment"># Create an index for the vector field in the element Struct</span></span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks[text_vector]&quot;</span>,</span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">200</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-a-collection" class="common-anchor-header">コレクションの作成<button data-href="#Create-a-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>スキーマとインデックスの準備ができたら、Array of Structsフィールドを含むコレクションを作成します。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-data" class="common-anchor-header">データの挿入<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションを作成したら、以下のようにArray of Structsを含むデータを挿入します。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample data</span>
data = {
    <span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-number">0</span>,
    <span class="hljs-string">&#x27;title&#x27;</span>: <span class="hljs-string">&#x27;Walden&#x27;</span>,
    <span class="hljs-string">&#x27;title_vector&#x27;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]
    <span class="hljs-string">&#x27;author&#x27;</span>: <span class="hljs-string">&#x27;Henry David Thoreau&#x27;</span>,
    <span class="hljs-string">&#x27;year-of-publication&#x27;</span>: <span class="hljs-number">1845</span>,
    <span class="hljs-string">&#x27;chunks&#x27;</span>: [
        {
            <span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;When I wrote the following pages, or rather the bulk of them...&#x27;</span>,
            <span class="hljs-string">&#x27;text_vector&#x27;</span>: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.5</span>]
            <span class="hljs-string">&#x27;chapter&#x27;</span>: <span class="hljs-string">&#x27;Economy&#x27;</span>,
        },
        {
            <span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;I would fain say something, not so much concerning the Chinese and...&#x27;</span>,
            <span class="hljs-string">&#x27;text_vector&#x27;</span>: [<span class="hljs-number">0.7</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>],
            <span class="hljs-string">&#x27;chapter&#x27;</span>: <span class="hljs-string">&#x27;Economy&#x27;</span>
        }
    ]
}

<span class="hljs-comment"># insert data</span>
client.insert(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[data]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>さらにデータが必要ですか？</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json
<span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">List</span>, <span class="hljs-type">Dict</span>, <span class="hljs-type">Any</span>

<span class="hljs-comment"># Real classic books (title, author, year)</span>
BOOKS = [
    (<span class="hljs-string">&quot;Pride and Prejudice&quot;</span>, <span class="hljs-string">&quot;Jane Austen&quot;</span>, <span class="hljs-number">1813</span>),
    (<span class="hljs-string">&quot;Moby Dick&quot;</span>, <span class="hljs-string">&quot;Herman Melville&quot;</span>, <span class="hljs-number">1851</span>),
    (<span class="hljs-string">&quot;Frankenstein&quot;</span>, <span class="hljs-string">&quot;Mary Shelley&quot;</span>, <span class="hljs-number">1818</span>),
    (<span class="hljs-string">&quot;The Picture of Dorian Gray&quot;</span>, <span class="hljs-string">&quot;Oscar Wilde&quot;</span>, <span class="hljs-number">1890</span>),
    (<span class="hljs-string">&quot;Dracula&quot;</span>, <span class="hljs-string">&quot;Bram Stoker&quot;</span>, <span class="hljs-number">1897</span>),
    (<span class="hljs-string">&quot;The Adventures of Sherlock Holmes&quot;</span>, <span class="hljs-string">&quot;Arthur Conan Doyle&quot;</span>, <span class="hljs-number">1892</span>),
    (<span class="hljs-string">&quot;Alice&#x27;s Adventures in Wonderland&quot;</span>, <span class="hljs-string">&quot;Lewis Carroll&quot;</span>, <span class="hljs-number">1865</span>),
    (<span class="hljs-string">&quot;The Time Machine&quot;</span>, <span class="hljs-string">&quot;H.G. Wells&quot;</span>, <span class="hljs-number">1895</span>),
    (<span class="hljs-string">&quot;The Scarlet Letter&quot;</span>, <span class="hljs-string">&quot;Nathaniel Hawthorne&quot;</span>, <span class="hljs-number">1850</span>),
    (<span class="hljs-string">&quot;Leaves of Grass&quot;</span>, <span class="hljs-string">&quot;Walt Whitman&quot;</span>, <span class="hljs-number">1855</span>),
    (<span class="hljs-string">&quot;The Brothers Karamazov&quot;</span>, <span class="hljs-string">&quot;Fyodor Dostoevsky&quot;</span>, <span class="hljs-number">1880</span>),
    (<span class="hljs-string">&quot;Crime and Punishment&quot;</span>, <span class="hljs-string">&quot;Fyodor Dostoevsky&quot;</span>, <span class="hljs-number">1866</span>),
    (<span class="hljs-string">&quot;Anna Karenina&quot;</span>, <span class="hljs-string">&quot;Leo Tolstoy&quot;</span>, <span class="hljs-number">1877</span>),
    (<span class="hljs-string">&quot;War and Peace&quot;</span>, <span class="hljs-string">&quot;Leo Tolstoy&quot;</span>, <span class="hljs-number">1869</span>),
    (<span class="hljs-string">&quot;Great Expectations&quot;</span>, <span class="hljs-string">&quot;Charles Dickens&quot;</span>, <span class="hljs-number">1861</span>),
    (<span class="hljs-string">&quot;Oliver Twist&quot;</span>, <span class="hljs-string">&quot;Charles Dickens&quot;</span>, <span class="hljs-number">1837</span>),
    (<span class="hljs-string">&quot;Wuthering Heights&quot;</span>, <span class="hljs-string">&quot;Emily Brontë&quot;</span>, <span class="hljs-number">1847</span>),
    (<span class="hljs-string">&quot;Jane Eyre&quot;</span>, <span class="hljs-string">&quot;Charlotte Brontë&quot;</span>, <span class="hljs-number">1847</span>),
    (<span class="hljs-string">&quot;The Call of the Wild&quot;</span>, <span class="hljs-string">&quot;Jack London&quot;</span>, <span class="hljs-number">1903</span>),
    (<span class="hljs-string">&quot;The Jungle Book&quot;</span>, <span class="hljs-string">&quot;Rudyard Kipling&quot;</span>, <span class="hljs-number">1894</span>),
]

<span class="hljs-comment"># Common chapter names for classics</span>
CHAPTERS = [
    <span class="hljs-string">&quot;Introduction&quot;</span>, <span class="hljs-string">&quot;Prologue&quot;</span>, <span class="hljs-string">&quot;Chapter I&quot;</span>, <span class="hljs-string">&quot;Chapter II&quot;</span>, <span class="hljs-string">&quot;Chapter III&quot;</span>,
    <span class="hljs-string">&quot;Chapter IV&quot;</span>, <span class="hljs-string">&quot;Chapter V&quot;</span>, <span class="hljs-string">&quot;Chapter VI&quot;</span>, <span class="hljs-string">&quot;Chapter VII&quot;</span>, <span class="hljs-string">&quot;Chapter VIII&quot;</span>,
    <span class="hljs-string">&quot;Chapter IX&quot;</span>, <span class="hljs-string">&quot;Chapter X&quot;</span>, <span class="hljs-string">&quot;Epilogue&quot;</span>, <span class="hljs-string">&quot;Conclusion&quot;</span>, <span class="hljs-string">&quot;Afterword&quot;</span>,
    <span class="hljs-string">&quot;Economy&quot;</span>, <span class="hljs-string">&quot;Where I Lived&quot;</span>, <span class="hljs-string">&quot;Reading&quot;</span>, <span class="hljs-string">&quot;Sounds&quot;</span>, <span class="hljs-string">&quot;Solitude&quot;</span>,
    <span class="hljs-string">&quot;Visitors&quot;</span>, <span class="hljs-string">&quot;The Bean-Field&quot;</span>, <span class="hljs-string">&quot;The Village&quot;</span>, <span class="hljs-string">&quot;The Ponds&quot;</span>, <span class="hljs-string">&quot;Baker Farm&quot;</span>
]

<span class="hljs-comment"># Placeholder text snippets (mimicking 19th-century prose)</span>
TEXT_SNIPPETS = [
    <span class="hljs-string">&quot;When I wrote the following pages, or rather the bulk of them...&quot;</span>,
    <span class="hljs-string">&quot;I would fain say something, not so much concerning the Chinese and...&quot;</span>,
    <span class="hljs-string">&quot;It is a truth universally acknowledged, that a single man in possession...&quot;</span>,
    <span class="hljs-string">&quot;Call me Ishmael. Some years ago—never mind how long precisely...&quot;</span>,
    <span class="hljs-string">&quot;It was the best of times, it was the worst of times...&quot;</span>,
    <span class="hljs-string">&quot;All happy families are alike; each unhappy family is unhappy in its own way.&quot;</span>,
    <span class="hljs-string">&quot;Whether I shall turn out to be the hero of my own life, or whether that station...&quot;</span>,
    <span class="hljs-string">&quot;You will rejoice to hear that no disaster has accompanied the commencement...&quot;</span>,
    <span class="hljs-string">&quot;The world is too much with us; late and soon, getting and spending...&quot;</span>,
    <span class="hljs-string">&quot;He was an old man who fished alone in a skiff in the Gulf Stream...&quot;</span>
]

<span class="hljs-keyword">def</span> <span class="hljs-title function_">random_vector</span>() -&gt; <span class="hljs-type">List</span>[<span class="hljs-built_in">float</span>]:
    <span class="hljs-keyword">return</span> [<span class="hljs-built_in">round</span>(random.random(), <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>)]

<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_chunk</span>() -&gt; <span class="hljs-type">Dict</span>[<span class="hljs-built_in">str</span>, <span class="hljs-type">Any</span>]:
    <span class="hljs-keyword">return</span> {
        <span class="hljs-string">&quot;text&quot;</span>: random.choice(TEXT_SNIPPETS),
        <span class="hljs-string">&quot;text_vector&quot;</span>: random_vector(),
        <span class="hljs-string">&quot;chapter&quot;</span>: random.choice(CHAPTERS)
    }

<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_record</span>(<span class="hljs-params">record_id: <span class="hljs-built_in">int</span></span>) -&gt; <span class="hljs-type">Dict</span>[<span class="hljs-built_in">str</span>, <span class="hljs-type">Any</span>]:
    title, author, year = random.choice(BOOKS)
    num_chunks = random.randint(<span class="hljs-number">1</span>, <span class="hljs-number">5</span>)  <span class="hljs-comment"># 1 to 5 chunks per book</span>
    chunks = [generate_chunk() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_chunks)]
    <span class="hljs-keyword">return</span> {
        <span class="hljs-string">&quot;title&quot;</span>: title,
        <span class="hljs-string">&quot;title_vector&quot;</span>: random_vector(),
        <span class="hljs-string">&quot;author&quot;</span>: author,
        <span class="hljs-string">&quot;year_of_publication&quot;</span>: year,
        <span class="hljs-string">&quot;chunks&quot;</span>: chunks
    }

<span class="hljs-comment"># Generate 1000 records</span>
data = [generate_record(i) <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1000</span>)]
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h2 id="Vector-search-against-an-Array-of-Structs-field" class="common-anchor-header">Array of Structsフィールドに対するベクトル検索<button data-href="#Vector-search-against-an-Array-of-Structs-field" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションやArray of Structsのベクトルフィールドに対してベクトル検索を行うことができます。</p>
<p>具体的には、検索リクエストの<code translate="no">anns_field</code> パラメータの値として Struct 要素内のベクトルフィールド名を直接使用することができ、<code translate="no">EmbeddingList</code> を使用してクエリベクトルを整然と整理することができます。</p>
<div class="alert note">
<p>Milvusは、Array of Structs内のエンベッディングリストに対する検索のクエリベクタをよりきれいに整理するために、<code translate="no">EmbeddingList</code> 。</p>
<p>しかし、<code translate="no">EmbeddingList</code> は、<code translate="no">search_iterator()</code> リクエストはもちろん、範囲検索やグループ化検索パラメータを持たない<code translate="no">search()</code> リクエストでしか使えません。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> EmbeddingList

<span class="hljs-comment"># each query embedding list triggers a single search</span>
embeddingList1 = EmbeddingList()
embeddingList1.add([<span class="hljs-number">0.2</span>, <span class="hljs-number">0.9</span>, <span class="hljs-number">0.4</span>, -<span class="hljs-number">0.3</span>, <span class="hljs-number">0.2</span>])

embeddingList2 = EmbeddingList()
embeddingList2.add([-<span class="hljs-number">0.2</span>, -<span class="hljs-number">0.2</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.9</span>])
embeddingList2.add([-<span class="hljs-number">0.4</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.2</span>])

<span class="hljs-comment"># a search with a single embedding list</span>
results = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[ embeddingList1 ],
    anns_field=<span class="hljs-string">&quot;chunks[text_vector]&quot;</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>},
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;chunks[text]&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>上記の検索リクエストでは、<code translate="no">chunks[text_vector]</code> を使って Struct 要素の<code translate="no">text_vector</code> フィールドを参照しています。この構文を使用して、<code translate="no">anns_field</code> と<code translate="no">output_fields</code> パラメータを設定できます。</p>
<p>出力は、最も類似した3つのエンティティのリストになる。</p>
<p><details></p>
<p><summary>出力</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># [</span>
<span class="hljs-comment">#     [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &#x27;id&#x27;: 461417939772144945,</span>
<span class="hljs-comment">#             &#x27;distance&#x27;: 0.9675756096839905,</span>
<span class="hljs-comment">#             &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#                 &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;All happy families are alike; each unhappy family is unhappy in its own way.&#x27;}</span>
<span class="hljs-comment">#                 ]</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &#x27;id&#x27;: 461417939772144965,</span>
<span class="hljs-comment">#             &#x27;distance&#x27;: 0.9555778503417969,</span>
<span class="hljs-comment">#             &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#                 &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;He was an old man who fished alone in a skiff in the Gulf Stream...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;When I wrote the following pages, or rather the bulk of them...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;It was the best of times, it was the worst of times...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;}</span>
<span class="hljs-comment">#                 ]</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &#x27;id&#x27;: 461417939772144962,</span>
<span class="hljs-comment">#             &#x27;distance&#x27;: 0.9469035863876343,</span>
<span class="hljs-comment">#             &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#                 &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;He was an old man who fished alone in a skiff in the Gulf Stream...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;}</span>
<span class="hljs-comment">#                 ]</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>また、<code translate="no">data</code> パラメータに複数のエンベッディングリストを含めることで、それぞれのエンベッディングリストの検索結果を取得することができます。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># a search with multiple embedding lists</span>
results = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[ embeddingList1, embeddingList2 ],
    anns_field=<span class="hljs-string">&quot;chunks[text_vector]&quot;</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>},
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;chunks[text]&quot;</span>]
)

<span class="hljs-built_in">print</span>(results)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>出力は、各埋め込みリストについて、最も類似した3つのエンティティのリストとなる。</p>
<p><details></p>
<p><summary>出力</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># [</span>
<span class="hljs-comment">#   [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#       &#x27;id&#x27;: 461417939772144945,</span>
<span class="hljs-comment">#       &#x27;distance&#x27;: 0.9675756096839905,</span>
<span class="hljs-comment">#       &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#         &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;All happy families are alike; each unhappy family is unhappy in its own way.&#x27;}</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#       }</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#       &#x27;id&#x27;: 461417939772144965,</span>
<span class="hljs-comment">#       &#x27;distance&#x27;: 0.9555778503417969,</span>
<span class="hljs-comment">#       &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#         &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;He was an old man who fished alone in a skiff in the Gulf Stream...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;When I wrote the following pages, or rather the bulk of them...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;It was the best of times, it was the worst of times...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;}</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#       }</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#       &#x27;id&#x27;: 461417939772144962,</span>
<span class="hljs-comment">#       &#x27;distance&#x27;: 0.9469035863876343,</span>
<span class="hljs-comment">#       &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#         &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;He was an old man who fished alone in a skiff in the Gulf Stream...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;}</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#       }</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment">#   ],</span>
<span class="hljs-comment">#   [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#       &#x27;id&#x27;: 461417939772144663,</span>
<span class="hljs-comment">#       &#x27;distance&#x27;: 1.9761409759521484,</span>
<span class="hljs-comment">#       &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#         &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;It was the best of times, it was the worst of times...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;It is a truth universally acknowledged, that a single man in possession...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;Whether I shall turn out to be the hero of my own life, or whether that station...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;He was an old man who fished alone in a skiff in the Gulf Stream...&#x27;}</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#       }</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#       &#x27;id&#x27;: 461417939772144692,</span>
<span class="hljs-comment">#       &#x27;distance&#x27;: 1.974656581878662,</span>
<span class="hljs-comment">#       &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#         &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;It is a truth universally acknowledged, that a single man in possession...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;}</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#       }</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#       &#x27;id&#x27;: 461417939772144662,</span>
<span class="hljs-comment">#       &#x27;distance&#x27;: 1.9406685829162598,</span>
<span class="hljs-comment">#       &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#         &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;It is a truth universally acknowledged, that a single man in possession...&#x27;}</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#       }</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment">#   ]</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>上記のコード例では、<code translate="no">embeddingList1</code> は1つのベクトルの埋め込みリストで、<code translate="no">embeddingList2</code> は2つのベクトルを含んでいます。それぞれが別々の検索リクエストをトリガーし、上位K個の類似エンティティのリストを期待する。</p>
<h2 id="Next-steps" class="common-anchor-header">次のステップ<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><p>ネイティブのArray of Structsデータ型の開発は、milvusの複雑なデータ構造を扱う能力の大きな進歩を意味します。その使用例をより理解し、この新機能を最大限に活用するために、<a href="/docs/ja/best-practices-for-array-of-structs.md">Array of Structsを使用したスキーマ設計を</a>読むことをお勧めします。</p>
