---
id: pattern-matching.md
title: パターンマッチング
summary: >-
  Milvus は、LIKE ワイルドカードパターンおよび RE2
  正規表現による文字列パターンマッチングをサポートしています。パターンフィルターを使用することで、VARCHAR フィールド、JSON 文字列パス、または
  ARRAY 要素内の接頭辞、接尾辞、部分文字列、構造化コード、メールアドレスのドメイン、URL パス、その他の文字列パターンに一致させることができます。
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
    </button></h1><p>エージェント型検索アプリケーションでは、ベクトル検索とgrep形式のパターンマッチングが互いに補完し合うことがよくあります。ベクトル検索は意味的に関連性の高いエンティティを検索し、パターンマッチングはエラーコード、ログのプレフィックス、メールドメイン、URLパス、識別子などの正確な文字列構造に基づいて、その結果を絞り込みます。</p>
<p>Milvusでは、これらのパターン制約をスカラーフィルターで表現できます。単純なワイルドカードマッチングには<code translate="no">LIKE</code> を、<a href="https://github.com/google/re2/wiki/syntax">RE2</a>正規表現には<code translate="no">=~</code> または<code translate="no">!~</code> を使用します。これらのフィルターは、<code translate="no">query</code> 、<code translate="no">search</code> 、またはハイブリッド検索と組み合わせることができます。</p>
<p>パターンマッチング式は、<code translate="no">filter</code> パラメータに記述します。たとえば、次のクエリは、<code translate="no">E1001</code> などのエラーコードを含むログメッセージに一致します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

res = client.query(
    collection_name=<span class="hljs-string">&quot;log_events&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>このページの例では、<code translate="no">filter</code> に割り当てられた式に焦点を当てています。<code translate="no">query</code> 、<code translate="no">search</code> 、ハイブリッド検索など、スカラーフィルターを受け付けるMilvus操作では、同じフィルター式構文を使用できます。</p>
<h2 id="Supported-field-types" class="common-anchor-header">サポートされているフィールド型<button data-href="#Supported-field-types" class="anchor-icon" translate="no">
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
    </button></h2><p>パターンマッチングは、文字列値に対して利用可能です。</p>
<table>
<thead>
<tr><th>対象</th><th><code translate="no">LIKE</code></th><th>正規表現<code translate="no">=~</code> /<code translate="no">!~</code></th><th>注</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">VARCHAR</code> フィールド</td><td>はい</td><td>はい</td><td>文字列フィールドでのパターンマッチングの典型的な対象。</td></tr>
<tr><td><code translate="no">JSON</code> <code translate="no">VARCHAR</code> 型にキャストされたパス</td><td>はい</td><td>はい</td><td>JSON パスの値は、正の一致を得るためには文字列でなければなりません。高速化のために JSON パスにインデックスを作成する場合は、<code translate="no">json_cast_type=&quot;varchar&quot;</code> を設定してください。</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code> element</td><td>はい</td><td>はい</td><td><code translate="no">tags[0]</code> など、インデックスによって特定の要素に一致させます。パターンマッチングはすべての要素をスキャン<strong>するわけではなく</strong>、指定されたインデックスの要素にのみ適用されます。</td></tr>
<tr><td>数値、ブール値、ベクトル、<code translate="no">TEXT</code> 、またはその他の非<code translate="no">VARCHAR</code> ターゲット</td><td>いいえ</td><td>いいえ</td><td>パターンマッチングは、<code translate="no">VARCHAR</code> 値、文字列に解決される JSON パス、またはインデックス付き<code translate="no">ARRAY&lt;VARCHAR&gt;</code> 要素でのみ使用できます。</td></tr>
</tbody>
</table>
<h2 id="Choose-LIKE-or-regex" class="common-anchor-header">LIKE または正規表現を選択<button data-href="#Choose-LIKE-or-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>必要なパターンを表現する最も単純な演算子を選択してください。</p>
<p>文字列の完全一致が必要な場合は、パターンマッチングの代わりに<code translate="no">==</code> を使用することをお勧めします。<code translate="no">LIKE</code> やregexは、フィルタがパターンに一致する必要がある場合にのみ使用してください。</p>
<table>
<thead>
<tr><th>要件</th><th>推奨される演算子</th><th>例</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td>文字列の完全一致</td><td><code translate="no">==</code></td><td><code translate="no">status == &quot;active&quot;</code></td><td>文字列「<code translate="no">active</code> 」との完全一致。</td></tr>
<tr><td>単純な接頭辞一致</td><td><code translate="no">LIKE</code></td><td><code translate="no">name LIKE &quot;Prod%&quot;</code></td><td>「<code translate="no">Prod</code> 」で始まる文字列に一致します。</td></tr>
<tr><td>単純なサフィックス一致</td><td><code translate="no">LIKE</code></td><td><code translate="no">filename LIKE &quot;%.json&quot;</code></td><td><code translate="no">.json</code> で終わる文字列に一致します。</td></tr>
<tr><td>単純な「含む」一致</td><td><code translate="no">LIKE</code></td><td><code translate="no">description LIKE &quot;%vector database%&quot;</code></td><td>文字列内のどこかに<code translate="no">vector database</code> が含まれる値に一致します。</td></tr>
<tr><td>構造化されたコードまたは固定長のパターンに一致させる</td><td><code translate="no">=~</code></td><td><code translate="no">code =~ &quot;E[0-9]{4}&quot;</code></td><td>大文字と小文字を区別して、<code translate="no">E</code> の後に 4 桁の数字が続く文字列（例:<code translate="no">E1001</code> ）に一致します。</td></tr>
<tr><td>大文字小文字を区別しないパターン一致</td><td><code translate="no">=~</code> で<code translate="no">(?i)</code></td><td><code translate="no">message =~ &quot;(?i)error&quot;</code></td><td><code translate="no">error</code> 、<code translate="no">ERROR</code> 、またはその他の大文字小文字のバリエーションに一致します。</td></tr>
<tr><td>正規表現パターンに一致する値を除外する</td><td><code translate="no">!~</code></td><td><code translate="no">message !~ &quot;^DEBUG&quot;</code></td><td><code translate="no">DEBUG</code> で始まる文字列を除外します。</td></tr>
</tbody>
</table>
<p>単純なワイルドカード一致には「<code translate="no">LIKE</code> 」を使用します。パターンに文字クラス、繰り返し、<code translate="no">error|failed</code> などの選択、アンカー、または大文字小文字を区別しない一致が必要な場合は、正規表現を使用します。</p>
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
    </button></h2><p><code translate="no">LIKE</code> 演算子は、文字列値に対する単純なワイルドカード一致に使用します。以下のワイルドカードのみをサポートしています：</p>
<table>
<thead>
<tr><th>ワイルドカード</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">%</code></td><td>0個以上の文字に一致します。</td></tr>
<tr><td><code translate="no">_</code></td><td>正確に1文字に一致します。</td></tr>
</tbody>
</table>
<h3 id="Common-LIKE-patterns" class="common-anchor-header">一般的な LIKE パターン<button data-href="#Common-LIKE-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">%</code> および<code translate="no">_</code> の位置を使用して、一致した文字列内のどこに固定テキストが表示されるかを制御します。</p>
<table>
<thead>
<tr><th>要件</th><th>パターン</th><th>フィルタの例</th></tr>
</thead>
<tbody>
<tr><td>プレフィックスで始まる</td><td><code translate="no">Prod%</code></td><td><code translate="no">filter = 'name LIKE &quot;Prod%&quot;'</code></td></tr>
<tr><td>接尾辞で終わる</td><td><code translate="no">%.json</code></td><td><code translate="no">filter = 'filename LIKE &quot;%.json&quot;'</code></td></tr>
<tr><td>部分文字列を含む</td><td><code translate="no">%vector%</code></td><td><code translate="no">filter = 'description LIKE &quot;%vector%&quot;'</code></td></tr>
<tr><td>固定位置の1文字に一致</td><td><code translate="no">AB_%</code></td><td><code translate="no">filter = 'code LIKE &quot;AB_%&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="LIKE-matching-behavior" class="common-anchor-header">LIKE による一致動作<button data-href="#LIKE-matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p>接頭辞、接尾辞、部分文字列の包含、および固定位置の単一文字の一致には、<code translate="no">LIKE</code> を使用してください。<code translate="no">LIKE</code> では、<code translate="no">[0-9]</code> のような文字クラス、<code translate="no">error|failed</code> のような選択、<code translate="no">{4}</code> のような繰り返し回数、<code translate="no">^</code> や<code translate="no">$</code> のようなアンカー、<code translate="no">(?i)</code> のような大文字小文字を区別しないフラグはサポートされていません。これらのパターンには正規表現（regex）を使用してください。</p>
<p>文字列全体が完全に一致する場合は、<code translate="no">==</code> を使用してください。<code translate="no">LIKE</code> は、フィルタでワイルドカードマッチングが必要な場合にのみ使用してください。</p>
<h3 id="Escaping-wildcards-in-a-LIKE-pattern" class="common-anchor-header">LIKE パターンにおけるワイルドカードのエスケープ<button data-href="#Escaping-wildcards-in-a-LIKE-pattern" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">LIKE</code> パターンでは、<code translate="no">%</code> は 0 個以上の文字に一致し、<code translate="no">_</code> は正確に 1 文字に一致します。<code translate="no">%</code> 、<code translate="no">_</code> 、または<code translate="no">\</code> をリテラルとして一致させるには、バックスラッシュ (<code translate="no">\</code>) で文字をエスケープします：</p>
<ul>
<li><code translate="no">name LIKE r&quot;\%&quot;</code> は、リテラル値<code translate="no">%</code> に一致します。</li>
<li><code translate="no">name LIKE r&quot;\_%&quot;</code> リテラル「<code translate="no">_</code> 」で始まる値に一致します。</li>
<li><code translate="no">name LIKE r&quot;\\%&quot;</code> リテラルなバックスラッシュで始まる値に一致します。</li>
</ul>
<p><code translate="no">r&quot;...&quot;</code> または<code translate="no">r'...'</code> と記述される生文字列リテラルは、Milvus のフィルター式においてバックスラッシュをそのまま保持します。これらは、<code translate="no">LIKE</code> や、バックスラッシュを含む正規表現パターンに推奨されます。生文字列を使用しない場合、通常の文字列リテラルはパターンが評価される前にエスケープシーケンスを処理するため、より多くのバックスラッシュが必要になる可能性があります。</p>
<h2 id="Use-regex--Milvus-30x" class="common-anchor-header">正規表現の使用<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Use-regex--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h2><p>パターンに文字クラス、反復、選択、アンカー、大文字小文字を区別しない一致などの正規表現機能が必要な場合は、正規表現フィルターを使用してください。Milvusは、文字列値に対して<a href="https://github.com/google/re2/wiki/syntax">RE2</a>正規表現を適用します。</p>
<p><code translate="no">=~</code> または<code translate="no">!~</code> の右辺は、文字列リテラルでなければなりません。</p>
<table>
<thead>
<tr><th>演算子</th><th>意味</th><th>例</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">=~</code></td><td>正規表現パターンに一致する値にマッチします。</td><td><code translate="no">filter = 'message =~ &quot;E[0-9]{4}&quot;'</code></td></tr>
<tr><td><code translate="no">!~</code></td><td>正規表現パターンに一致する値を除外します。</td><td><code translate="no">filter = 'message !~ &quot;^DEBUG&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="Use-raw-string-literals" class="common-anchor-header">生の文字列リテラルを使用する<button data-href="#Use-raw-string-literals" class="anchor-icon" translate="no">
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
    </button></h3><p>バックスラッシュを含む正規表現パターンには、生の文字列リテラルを使用することを推奨します。<code translate="no">r&quot;...&quot;</code> や<code translate="no">r'...'</code> のように記述された生の文字列では、バックスラッシュがそのまま正規表現エンジンに渡されます。これにより、通常の文字列リテラルで必要となる余分なエスケープ処理が不要になります。</p>
<p>例：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ r&quot;\d{4}-\d{2}-\d{2}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>これは、<code translate="no">2026-07-01</code> のような日付形式の値を含む文字列に一致します。</p>
<p>生の文字列を使用しない場合、通常の文字列リテラルでは正規表現パターンが評価される前にエスケープシーケンスが処理されるため、<code translate="no">\d</code> や<code translate="no">\s</code> といったパターン、あるいはエスケープされたリテラル文字には、追加のバックスラッシュが必要になる場合があります。</p>
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
    </button></h3><p>以下の例では、Milvus のフィルター式で一般的に使用される RE2 構文を使用しています。正規表現の完全な構文については、<a href="https://github.com/google/re2/wiki/syntax">RE2 構文</a>リファレンスを参照してください。</p>
<table>
<thead>
<tr><th>要件</th><th>パターン</th><th>フィルタの例</th></tr>
</thead>
<tbody>
<tr><td>リテラルテキストを含む</td><td><code translate="no">error</code></td><td><code translate="no">filter = 'message =~ &quot;error&quot;'</code></td></tr>
<tr><td>接頭辞で始まる</td><td><code translate="no">^ERR</code></td><td><code translate="no">filter = 'code =~ &quot;^ERR&quot;'</code></td></tr>
<tr><td>接尾辞で終わる</td><td><code translate="no">\.json$</code></td><td><code translate="no">filter = 'filename =~ &quot;\\.json$&quot;'</code></td></tr>
<tr><td>数字の連続に一致</td><td><code translate="no">[0-9]+</code></td><td><code translate="no">filter = 'message =~ &quot;[0-9]+&quot;'</code></td></tr>
<tr><td>固定桁数の数字に一致</td><td><code translate="no">[0-9]{4}</code></td><td><code translate="no">filter = 'code =~ &quot;[0-9]{4}&quot;'</code></td></tr>
<tr><td>メールアドレスのドメインに一致する</td><td><code translate="no">@example\.com$</code></td><td><code translate="no">filter = 'email =~ &quot;@example\\.com$&quot;'</code></td></tr>
<tr><td>大文字小文字を区別せずに一致</td><td><code translate="no">(?i)error</code></td><td><code translate="no">filter = 'message =~ &quot;(?i)error&quot;'</code></td></tr>
<tr><td>文字列全体に一致する</td><td><code translate="no">^prod-[0-9]+$</code></td><td><code translate="no">filter = 'name =~ &quot;^prod-[0-9]+$&quot;'</code></td></tr>
</tbody>
</table>
<p>複数の単語のうちいずれか1つに一致させるには、<code translate="no">|</code> を使用した選択（alternation）を利用します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>正規表現のメタ文字をリテラルとして一致させる場合は、正規表現パターン内でエスケープしてください。たとえば、リテラルとしてのドット（正規表現では `<code translate="no">\.</code> `）に一致させるには、Python フィルター文字列で `<code translate="no">\\.</code> ` と記述します:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>注：Milvusの正規表現フィルターはRE2構文に従います。正規表現パターンがRE2でサポートされていない構文を使用している場合、またはその他の理由で無効な場合、Milvusはそのフィルター式を拒否します。正規表現のメタ文字、フラグ、およびマッチング動作の詳細については、<a href="https://github.com/google/re2/wiki/syntax">RE2構文</a>リファレンスを参照してください。</p>
<h3 id="Matching-behavior" class="common-anchor-header">マッチングの挙動<button data-href="#Matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>部分文字列の一致</strong></p>
<p>Milvus の正規表現マッチングは部分文字列のセマンティクスを使用します。パターンはフィールド値全体と一致する必要はありません。たとえば、次のフィルターは<code translate="no">E1001</code> と<code translate="no">failed with E1001 after retry</code> の両方に一致します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>フィールド値全体に一致させるには、<code translate="no">^</code> および<code translate="no">$</code> というアンカーを使用します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match only values that are exactly E followed by four digits</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>NULL 許容の VARCHAR フィールド</strong></p>
<p>正規表現フィルターはNULL値には一致しません。これは、<code translate="no">=~</code> および<code translate="no">!~</code> の両方に適用されます。正規表現パターンを除外しつつNULL値は保持したい場合は、明示的に<code translate="no">OR field IS NULL</code> を追加してください：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>JSONパス</strong></p>
<p>JSONパスについては、パスが欠落している場合、nullの場合、または文字列以外の値に解決される場合、正規表現フィルターの動作が異なります:</p>
<table>
<thead>
<tr><th>フィルタ</th><th>欠落値／null値／文字列以外の値を含みますか？</th><th>備考</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">json_field[&quot;path&quot;] =~ &quot;pattern&quot;</code></td><td>いいえ</td><td>正規表現パターンに一致する文字列値のみをマッチさせます。</td></tr>
<tr><td><code translate="no">json_field[&quot;path&quot;] !~ &quot;pattern&quot;</code></td><td>はい</td><td>パスが欠落している、null、文字列以外、または正規表現パターンに一致しない文字列であるエンティティを返します。</td></tr>
</tbody>
</table>
<h2 id="Accelerate-pattern-matching-with-indexes" class="common-anchor-header">インデックスを使用したパターンマッチングの高速化<button data-href="#Accelerate-pattern-matching-with-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus は、文字列フィールドに対して、<code translate="no">LIKE</code> や、<code translate="no">VARCHAR</code> フィールドまたは JSON 文字列パスに対する正規表現フィルターと組み合わせて使用できる、いくつかのインデックスタイプをサポートしています。例としては、<code translate="no">NGRAM</code> 、<code translate="no">STL_SORT</code> 、<code translate="no">INVERTED</code> 、<code translate="no">BITMAP</code> などがあります。パターンマッチングはインデックスなしでも機能しますが、インデックスを使用することで、大規模なデータセットでのパフォーマンスを向上させることができます。</p>
<p>インデックスの有効性は、パターン式、Milvusが固定のリテラル部分文字列を抽出できるかどうか、および対象フィールドのカーディナリティと分布によって異なります。<code translate="no">name LIKE &quot;Prod%&quot;</code> のようなプレフィックス形式のパターンは、<code translate="no">description LIKE &quot;%vector%&quot;</code> や<code translate="no">filename LIKE &quot;%.json&quot;</code> のようなインフィックスやサフィックス形式のパターンとは異なるインデックス戦略を採用することで、パフォーマンス向上が期待できる場合があります。</p>
<p>以下の表を参考として、実際のワークロードでベンチマークテストを行ってください：</p>
<table>
<thead>
<tr><th>パターンまたはデータの特性</th><th>検討すべきインデックス</th><th>備考</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">message =~ &quot;error.*timeout&quot;</code> のような固定のリテラル部分文字列を含む、または<code translate="no">message LIKE &quot;%database%&quot;</code></td><td><code translate="no">NGRAM</code></td><td>Milvus がパターンから意味のあるリテラル部分文字列を抽出できる場合に有効です。詳細については、<a href="/docs/ja/ngram.md">NGRAM</a> を参照してください。</td></tr>
<tr><td>プレフィックス、完全一致、または等価のような文字列フィルター。特に、カーディナリティが低～中程度のフィールドで有効</td><td><code translate="no">STL_SORT</code>、<code translate="no">INVERTED</code> 、または<code translate="no">BITMAP</code></td><td>フィールドに重複する値がある場合や、フィルタが完全一致に近い場合に、より効果的である可能性があります。詳細については、<a href="/docs/ja/stl-sort.md">STL_SORT</a>、<a href="/docs/ja/inverted.md">INVERTED</a>、および<a href="/docs/ja/bitmap.md">BITMAP</a> を参照してください。</td></tr>
<tr><td>固定リテラルを含まない正規表現パターン、または文字クラス、短いトークン、ワイルドカードが主体となるパターン</td><td>インデックスによる高速化を頼りにする前にベンチマークを実行してください</td><td>これらのパターンは、インデックスによる選択性が限定的となり、より広範囲なスキャンに切り替わってしまう可能性があります。</td></tr>
</tbody>
</table>
