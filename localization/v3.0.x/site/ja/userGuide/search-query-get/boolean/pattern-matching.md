---
id: pattern-matching.md
title: パターンマッチング
summary: >-
  MilvusはLIKEワイルドカードパターンとRE2正規表現による文字列パターンマッチをサポートしています。パターンフィルタを使用して、VARCHARフィールド、JSON文字列パス、またはARRAY要素内の接頭辞、接尾辞、部分文字列、構造化コード、電子メールドメイン、URLパス、およびその他の文字列パターンにマッチします。
---
<h1 id="Pattern-Matching" class="common-anchor-header">パターンマッチング<button data-href="#Pattern-Matching" class="anchor-icon" translate="no">
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
    </button></h1><p>エージェント型検索アプリケーションでは、ベクトル検索と grep スタイルのパターンマッチングはしばしば互いに補完し合う。ベクトル検索は意味的に関連するエンティティを検索し、パターンマッチはエラーコード、ログ接頭辞、電子メールドメイン、URLパス、識別子などの正確な文字列構造によって結果を絞り込みます。</p>
<p>Milvusでは、単純なワイルドカードマッチングには<code translate="no">LIKE</code> 、<a href="https://github.com/google/re2/wiki/syntax">RE2</a>正規表現には<code translate="no">=~</code> または<code translate="no">!~</code> 、スカラーフィルタでこれらのパターン制約を表現することができます。これらのフィルタを<code translate="no">query</code> 、<code translate="no">search</code> 、またはハイブリッド検索と組み合わせることができます。</p>
<p>パターン・マッチ式は<code translate="no">filter</code> パラメータに記述します。例えば、以下のクエリは、<code translate="no">E1001</code> のようなエラーコードを含むログメッセージにマッチします：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

res = client.query(
    collection_name=<span class="hljs-string">&quot;log_events&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>このページの例では、<code translate="no">filter</code> に割り当てられた式に焦点を当てています。<code translate="no">query</code> 、<code translate="no">search</code> 、ハイブリッド検索など、スカラーフィルターを受け付けるMilvusの操作でも同じフィルター式の構文を使用することができます。</p>
<h2 id="Supported-field-types" class="common-anchor-header">サポートされるフィールドタイプ<button data-href="#Supported-field-types" class="anchor-icon" translate="no">
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
    </button></h2><p>パターン・マッチは文字列値に対して利用可能です。</p>
<table>
<thead>
<tr><th>対象</th><th><code translate="no">LIKE</code></th><th>正規表現<code translate="no">=~</code> /<code translate="no">!~</code></th><th>備考</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">VARCHAR</code> フィールド</td><td>はい</td><td>あり</td><td>文字列フィールドのパターンマッチの典型的なターゲット。</td></tr>
<tr><td><code translate="no">JSON</code> <code translate="no">VARCHAR</code> のキャスト型を持つパス</td><td>はい</td><td>はい</td><td>JSON パス値は、正のマッチングでは文字列でなければならない。加速のために JSON パスにインデックスを作成する場合は、<code translate="no">json_cast_type=&quot;varchar&quot;</code>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code> 要素</td><td>はい</td><td>はい</td><td><code translate="no">tags[0]</code> のように、インデックスによって特定の要素にマッチします。パターン・マッチングはすべての要素をスキャンする<strong>のではなく</strong>、指定されたインデックスの要素にのみ適用されます。</td></tr>
<tr><td>数値、ブール値、ベクトル、<code translate="no">TEXT</code> 、またはその他の非<code translate="no">VARCHAR</code> 対象</td><td>いいえ</td><td>いいえ</td><td>パターン・マッチは、<code translate="no">VARCHAR</code> 値、文字列に解決される JSON パス、またはインデックス付き<code translate="no">ARRAY&lt;VARCHAR&gt;</code> 要素に対してのみ使用できます。</td></tr>
</tbody>
</table>
<h2 id="Choose-LIKE-or-regex" class="common-anchor-header">LIKEまたは正規表現を選択<button data-href="#Choose-LIKE-or-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>必要なパターンを表現する最も単純な演算子を選択します。</p>
<p>文字列の完全一致が必要な場合は、パターン・マッチではなく<code translate="no">==</code> を使用することをお勧めします。フィルタがパターンにマッチする必要がある場合にのみ、<code translate="no">LIKE</code> または regex を使用してください。</p>
<table>
<thead>
<tr><th>要件</th><th>推奨演算子</th><th>例</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td>文字列の完全一致</td><td><code translate="no">==</code></td><td><code translate="no">status == &quot;active&quot;</code></td><td>文字列<code translate="no">active</code> の完全一致。</td></tr>
<tr><td>単純前方一致</td><td><code translate="no">LIKE</code></td><td><code translate="no">name LIKE &quot;Prod%&quot;</code></td><td><code translate="no">Prod</code> で始まる文字列にマッチします。</td></tr>
<tr><td>単純接尾辞マッチ</td><td><code translate="no">LIKE</code></td><td><code translate="no">filename LIKE &quot;%.json&quot;</code></td><td><code translate="no">.json</code> で終わる文字列にマッチします。</td></tr>
<tr><td>単純包含マッチ</td><td><code translate="no">LIKE</code></td><td><code translate="no">description LIKE &quot;%vector database%&quot;</code></td><td>文字列のどこかに<code translate="no">vector database</code> を含む値にマッチします。</td></tr>
<tr><td>構造化コードまたは固定長パターンにマッチします。</td><td><code translate="no">=~</code></td><td><code translate="no">code =~ &quot;E[0-9]{4}&quot;</code></td><td>大文字小文字を区別して、<code translate="no">E1001</code> のように、<code translate="no">E</code> の後に 4 桁の数字が続く文字列にマッチします。</td></tr>
<tr><td>大文字小文字を区別しないパターンマッチング</td><td><code translate="no">=~</code> 大文字小文字を区別しません。<code translate="no">(?i)</code></td><td><code translate="no">message =~ &quot;(?i)error&quot;</code></td><td><code translate="no">error</code> や<code translate="no">ERROR</code> などの大文字小文字を区別しないパターンにマッチします。</td></tr>
<tr><td>正規表現パターンにマッチする値を除外する</td><td><code translate="no">!~</code></td><td><code translate="no">message !~ &quot;^DEBUG&quot;</code></td><td><code translate="no">DEBUG</code> で始まる文字列を除外します。</td></tr>
</tbody>
</table>
<p>単純なワイルドカード・マッチングには<code translate="no">LIKE</code> を使用します。パターンに文字クラス、繰り返し、<code translate="no">error|failed</code> のような交替、アンカー、大文字小文字を区別しないマッチングが必要な場合は、正規表現を使用します。</p>
<h2 id="Use-LIKE" class="common-anchor-header">LIKEの使用<button data-href="#Use-LIKE" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">LIKE</code> 演算子は文字列値の単純なワイルドカード・マッチング用です。以下のワイルドカードにのみ対応しています：</p>
<table>
<thead>
<tr><th>ワイルドカード</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">%</code></td><td>0文字以上にマッチします。</td></tr>
<tr><td><code translate="no">_</code></td><td>正確に1文字にマッチします。</td></tr>
</tbody>
</table>
<h3 id="Common-LIKE-patterns" class="common-anchor-header">一般的なLIKEパターン<button data-href="#Common-LIKE-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">%</code> と<code translate="no">_</code> の位置を使用して、一致する文字列のどこに固定テキストが表示されるかを制御します。</p>
<table>
<thead>
<tr><th>条件</th><th>パターン</th><th>フィルタ例</th></tr>
</thead>
<tbody>
<tr><td>接頭辞で始まる</td><td><code translate="no">Prod%</code></td><td><code translate="no">filter = 'name LIKE &quot;Prod%&quot;'</code></td></tr>
<tr><td>接尾辞で終わる</td><td><code translate="no">%.json</code></td><td><code translate="no">filter = 'filename LIKE &quot;%.json&quot;'</code></td></tr>
<tr><td>部分文字列を含む</td><td><code translate="no">%vector%</code></td><td><code translate="no">filter = 'description LIKE &quot;%vector%&quot;'</code></td></tr>
<tr><td>固定位置の1文字にマッチ</td><td><code translate="no">AB_%</code></td><td><code translate="no">filter = 'code LIKE &quot;AB_%&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="LIKE-matching-behavior" class="common-anchor-header">LIKEマッチング動作<button data-href="#LIKE-matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p>プレフィックス、サフィックス、contains、固定位置の1文字マッチには<code translate="no">LIKE</code> を使用してください。<code translate="no">LIKE</code> は、<code translate="no">[0-9]</code> のような文字クラス、<code translate="no">error|failed</code> のような交替、<code translate="no">{4}</code> のような繰り返しカウント、<code translate="no">^</code> や<code translate="no">$</code> のようなアンカー、<code translate="no">(?i)</code> のような大文字小文字を区別しないフラグには対応していません。これらのパターンには正規表現を使用する。</p>
<p>文字列が完全に等しい場合は<code translate="no">==</code> を使ってください。<code translate="no">LIKE</code> は、フィルタにワイルドカードマッチングが必要な場合のみ使用してください。</p>
<h2 id="Use-regex" class="common-anchor-header">正規表現を使う<button data-href="#Use-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>パターンに文字クラス、繰り返し、交替、アンカー、大文字小文字を区別しないマッチングなどの正規表現機能が必要な場合、正規表現フィルタを使用します。milvusは<a href="https://github.com/google/re2/wiki/syntax">RE2</a>正規表現を文字列値に適用します。</p>
<p><code translate="no">=~</code> または<code translate="no">!~</code> の右辺は文字列リテラルでなければなりません。</p>
<table>
<thead>
<tr><th>演算子</th><th>意味</th><th>例</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">=~</code></td><td>正規表現パターンを満たす値にマッチします。</td><td><code translate="no">filter = 'message =~ &quot;E[0-9]{4}&quot;'</code></td></tr>
<tr><td><code translate="no">!~</code></td><td>正規表現パターンを満たす値を除外します。</td><td><code translate="no">filter = 'message !~ &quot;^DEBUG&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="Common-regex-patterns" class="common-anchor-header">一般的な正規表現パターン<button data-href="#Common-regex-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>以下の例では、Milvusフィルタ式で一般的なRE2構文を使用しています。完全な正規表現構文については、<a href="https://github.com/google/re2/wiki/syntax">RE2構文</a>リファレンスを参照してください。</p>
<table>
<thead>
<tr><th>要件</th><th>パターン</th><th>フィルタ例</th></tr>
</thead>
<tbody>
<tr><td>リテラル テキストを含む</td><td><code translate="no">error</code></td><td><code translate="no">filter = 'message =~ &quot;error&quot;'</code></td></tr>
<tr><td>接頭辞で始まる</td><td><code translate="no">^ERR</code></td><td><code translate="no">filter = 'code =~ &quot;^ERR&quot;'</code></td></tr>
<tr><td>接尾辞で終わる</td><td><code translate="no">\.json$</code></td><td><code translate="no">filter = 'filename =~ &quot;\\.json$&quot;'</code></td></tr>
<tr><td>数字列にマッチ</td><td><code translate="no">[0-9]+</code></td><td><code translate="no">filter = 'message =~ &quot;[0-9]+&quot;'</code></td></tr>
<tr><td>固定桁数</td><td><code translate="no">[0-9]{4}</code></td><td><code translate="no">filter = 'code =~ &quot;[0-9]{4}&quot;'</code></td></tr>
<tr><td>メールドメインにマッチ</td><td><code translate="no">@example\.com$</code></td><td><code translate="no">filter = 'email =~ &quot;@example\\.com$&quot;'</code></td></tr>
<tr><td>大文字小文字を区別しない</td><td><code translate="no">(?i)error</code></td><td><code translate="no">filter = 'message =~ &quot;(?i)error&quot;'</code></td></tr>
<tr><td>完全な文字列にマッチ</td><td><code translate="no">^prod-[0-9]+$</code></td><td><code translate="no">filter = 'name =~ &quot;^prod-[0-9]+$&quot;'</code></td></tr>
</tbody>
</table>
<p>複数の単語のうちの1つにマッチさせるには、<code translate="no">|</code> ：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>正規表現のメタキャラクタを文字通りにマッチさせる場合は、正規表現パターンの中でエスケープしてください。例えば、リテラルドット(<code translate="no">\.</code> in regex)にマッチさせるには、Pythonのフィルタ文字列で<code translate="no">\\.</code> と記述します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>注意: milvusの正規表現フィルタはRE2構文に従っています。Milvusの正規表現フィルタはRE2の構文に従います。正規表現パターンがRE2がサポートしていない構文を使用していたり、無効な場合、Milvusはそのフィルタ式を拒否します。正規表現のメタキャラクタ、フラグ、マッチング動作の詳細については、<a href="https://github.com/google/re2/wiki/syntax">RE2構文</a>リファレンスを参照してください。</p>
<h3 id="Matching-behavior" class="common-anchor-header">マッチングの動作<button data-href="#Matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>部分文字列マッチング</strong></p>
<p>Milvusの正規表現マッチングは部分文字列のセマンティクスを使用します。パターンはフィールド値全体にマッチする必要はありません。例えば、以下のフィルタは<code translate="no">E1001</code> と<code translate="no">failed with E1001 after retry</code> の両方にマッチします：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>フィールド値全体にマッチするには、<code translate="no">^</code> と<code translate="no">$</code> アンカーを使用します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match only values that are exactly E followed by four digits</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>NULL可能なVARCHARフィールド</strong></p>
<p>正規表現フィルタはNULL値にはマッチしません。これは<code translate="no">=~</code> と<code translate="no">!~</code> の両方に適用されます。 正規表現パターンを除外してヌル値を残したい場合は、明示的に<code translate="no">OR field IS NULL</code> を追加してください：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>JSONパス</strong></p>
<p>JSONパスの場合、パスがない、NULL、または文字列でない値に解決される場合、正規表現フィルターは異なる動作をします：</p>
<table>
<thead>
<tr><th>フィルター</th><th>欠損値、NULL値、非文字列値を含むか？</th><th>備考</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">json_field[&quot;path&quot;] =~ &quot;pattern&quot;</code></td><td>いいえ</td><td>正規表現パターンを満たす文字列値のみにマッチします。</td></tr>
<tr><td><code translate="no">json_field[&quot;path&quot;] !~ &quot;pattern&quot;</code></td><td>はい</td><td>パスが見つからない、NULL、非文字列、または正規表現パターンに一致しない文字列のエンティティを返します。</td></tr>
</tbody>
</table>
<h2 id="Accelerate-pattern-matching-with-indexes" class="common-anchor-header">インデックスによるパターンマッチの高速化<button data-href="#Accelerate-pattern-matching-with-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusは、<code translate="no">LIKE</code> や、<code translate="no">NGRAM</code> 、<code translate="no">STL_SORT</code> 、<code translate="no">INVERTED</code> 、<code translate="no">BITMAP</code> のような、<code translate="no">VARCHAR</code> フィールドやJSON文字列パスに対する正規表現フィルタと共に使用できる、文字列フィールドに対するいくつかのインデックスタイプをサポートしています。パターン・マッチはインデックスなしでも動作するが、インデックスを使用することで、大規模なデータセットのパフォーマンスを向上させることができる。</p>
<p>インデックスの有効性は、パターン表現、Milvusが固定リテラル部分文字列を抽出できるかどうか、対象フィールドのカーディナリティと分布に依存する。<code translate="no">name LIKE &quot;Prod%&quot;</code> のような接頭辞スタイルのパターンは、<code translate="no">description LIKE &quot;%vector%&quot;</code> や<code translate="no">filename LIKE &quot;%.json&quot;</code> のような接尾辞または接尾辞パターンとは異なるインデックス戦略が有効な場合があります。</p>
<p>以下の表を出発点として、独自のワークロードでベンチマークを行ってください：</p>
<table>
<thead>
<tr><th>パターンまたはデータ特性</th><th>検討すべきインデックス</th><th>備考</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">message =~ &quot;error.*timeout&quot;</code> や のような固定リテラル部分文字列を含む。<code translate="no">message LIKE &quot;%database%&quot;</code></td><td><code translate="no">NGRAM</code></td><td>Milvusがパターンから意味のあるリテラル部分文字列を抽出できる場合に役立ちます。詳細は<a href="/docs/ja/ngram.md">NGRAMを</a>参照してください。</td></tr>
<tr><td>特にカーディナリティが低～中程度のフィールドでは、接頭辞、完全一致、または等号類似の文字列フィルタが有効です。</td><td><code translate="no">STL_SORT</code>または<code translate="no">INVERTED</code> <code translate="no">BITMAP</code></td><td>フィールドに繰り返し値がある場合や、フィルタが完全一致に近い場合に効果的です。詳細については、<a href="/docs/ja/stl-sort.md">STL_SORT</a>、<a href="/docs/ja/inverted.md">INVERTED</a>、<a href="/docs/ja/bitmap.md">BITMAPを</a>参照してください。</td></tr>
<tr><td>固定リテラルを持たない正規表現パターン、または文字クラス、短いトークン、ワイルドカードが支配的なパターン</td><td>インデックス高速化に依存する前のベンチマーク</td><td>これらのパターンでは、インデックスの選択性が制限され、より広範なスキャンにフォールバックする可能性があります。</td></tr>
</tbody>
</table>
