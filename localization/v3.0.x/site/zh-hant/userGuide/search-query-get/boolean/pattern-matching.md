---
id: pattern-matching.md
title: 模式匹配
summary: >-
  Milvus 支援使用 LIKE 通配符模式和 RE2 正規表達式的字串模式匹配。使用模式篩選器來匹配 VARCHAR 欄位、JSON 字串路徑或
  ARRAY 元素中的前綴、後綴、子串、結構代碼、電子郵件網域、URL 路徑和其他字串模式。
---
<h1 id="Pattern-Matching" class="common-anchor-header">模式匹配<button data-href="#Pattern-Matching" class="anchor-icon" translate="no">
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
    </button></h1><p>在代理搜尋應用程式中，向量搜尋與 grep 式模式匹配通常是相輔相成的。向量搜尋會擷取語意相關的實體，而模式匹配則會透過精確的字串結構（例如錯誤代碼、日誌前綴、電子郵件網域、URL 路徑或識別碼）來縮小搜尋結果的範圍。</p>
<p>在 Milvus 中，您可以在標量篩選器中表達這些模式約束，<code translate="no">LIKE</code> 表示簡單的通配符匹配，<code translate="no">=~</code> 或<code translate="no">!~</code> 表示<a href="https://github.com/google/re2/wiki/syntax">RE2</a>正則表達式。您可以將這些篩選器與<code translate="no">query</code> 、<code translate="no">search</code> 或混合搜尋結合。</p>
<p>模式匹配表達式寫在<code translate="no">filter</code> 參數中。例如，以下查詢會匹配包含錯誤代碼的日誌訊息，如<code translate="no">E1001</code> ：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

res = client.query(
    collection_name=<span class="hljs-string">&quot;log_events&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>本頁的範例著重於指定給<code translate="no">filter</code> 的表達式。您可以在接受標量篩選器的 Milvus 作業中使用相同的篩選器表達式語法，例如<code translate="no">query</code>,<code translate="no">search</code>, 和混合搜尋。</p>
<h2 id="Supported-field-types" class="common-anchor-header">支援的欄位類型<button data-href="#Supported-field-types" class="anchor-icon" translate="no">
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
    </button></h2><p>模式匹配適用於字串值。</p>
<table>
<thead>
<tr><th>目標</th><th><code translate="no">LIKE</code></th><th>Regex<code translate="no">=~</code> /<code translate="no">!~</code></th><th>注意事項</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">VARCHAR</code> 欄位</td><td>是</td><td>是</td><td>字串欄位上模式匹配的典型目標。</td></tr>
<tr><td><code translate="no">JSON</code> <code translate="no">VARCHAR</code> 轉換類型的路徑</td><td>是</td><td>是</td><td>JSON 路徑值必須是字串，才能進行正向匹配。如果您在 JSON 路徑上建立加速索引，請設定<code translate="no">json_cast_type=&quot;varchar&quot;</code>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code> 元素</td><td>是</td><td>是</td><td>按索引匹配特定元素，例如<code translate="no">tags[0]</code> 。模式匹配<strong>不會</strong>掃描所有元素；它只適用於指定索引的元素。</td></tr>
<tr><td>數字、布林、向量、<code translate="no">TEXT</code> 或其他非<code translate="no">VARCHAR</code> 目標</td><td>無</td><td>無</td><td>模式匹配僅適用於<code translate="no">VARCHAR</code> 值、解析為字串的 JSON 路徑或索引<code translate="no">ARRAY&lt;VARCHAR&gt;</code> 元素。</td></tr>
</tbody>
</table>
<h2 id="Choose-LIKE-or-regex" class="common-anchor-header">選擇 LIKE 或 regex<button data-href="#Choose-LIKE-or-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>選擇能表達所需模式的最簡單操作符。</p>
<p>如果您需要精確的字串匹配，建議您使用<code translate="no">==</code> ，而不是模式匹配。只有在篩選器需要匹配模式時，才使用<code translate="no">LIKE</code> 或 regex。</p>
<table>
<thead>
<tr><th>需求</th><th>建議運算符號</th><th>範例</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td>精確字串相等</td><td><code translate="no">==</code></td><td><code translate="no">status == &quot;active&quot;</code></td><td>字串<code translate="no">active</code> 的完全匹配。</td></tr>
<tr><td>簡單前綴匹配</td><td><code translate="no">LIKE</code></td><td><code translate="no">name LIKE &quot;Prod%&quot;</code></td><td>匹配以<code translate="no">Prod</code> 開頭的字串。</td></tr>
<tr><td>簡單後綴匹配</td><td><code translate="no">LIKE</code></td><td><code translate="no">filename LIKE &quot;%.json&quot;</code></td><td>匹配以<code translate="no">.json</code> 結尾的字串。</td></tr>
<tr><td>簡單包含匹配</td><td><code translate="no">LIKE</code></td><td><code translate="no">description LIKE &quot;%vector database%&quot;</code></td><td>匹配字串中任何地方包含<code translate="no">vector database</code> 的值。</td></tr>
<tr><td>匹配結構化程式碼或固定長度模式</td><td><code translate="no">=~</code></td><td><code translate="no">code =~ &quot;E[0-9]{4}&quot;</code></td><td>匹配大小寫敏感的包含<code translate="no">E</code> 後跟四位數的字串，例如<code translate="no">E1001</code> 。</td></tr>
<tr><td>不區分大小寫的模式匹配</td><td><code translate="no">=~</code> 與<code translate="no">(?i)</code></td><td><code translate="no">message =~ &quot;(?i)error&quot;</code></td><td>匹配<code translate="no">error</code>,<code translate="no">ERROR</code>, 或其他大小寫變異。</td></tr>
<tr><td>排除與 regex 模式相符的值</td><td><code translate="no">!~</code></td><td><code translate="no">message !~ &quot;^DEBUG&quot;</code></td><td>排除以<code translate="no">DEBUG</code> 開頭的字串。</td></tr>
</tbody>
</table>
<p>使用<code translate="no">LIKE</code> 進行簡單的通配符匹配。當模式需要字元類別、重複、交替 (例如<code translate="no">error|failed</code> 、錨點) 或不區分大小寫的匹配時，請使用 regex。</p>
<h2 id="Use-LIKE" class="common-anchor-header">使用 LIKE<button data-href="#Use-LIKE" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">LIKE</code> 運算符號用於字串值的簡單通配符匹配。它只支援下列通配符：</p>
<table>
<thead>
<tr><th>通配符</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">%</code></td><td>匹配零個或多個字符。</td></tr>
<tr><td><code translate="no">_</code></td><td>完全匹配一個字元。</td></tr>
</tbody>
</table>
<h3 id="Common-LIKE-patterns" class="common-anchor-header">常見的 LIKE 模式<button data-href="#Common-LIKE-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>使用<code translate="no">%</code> 和<code translate="no">_</code> 的位置來控制固定文字在匹配字串中出現的位置。</p>
<table>
<thead>
<tr><th>要求</th><th>模式</th><th>篩選範例</th></tr>
</thead>
<tbody>
<tr><td>以前綴開始</td><td><code translate="no">Prod%</code></td><td><code translate="no">filter = 'name LIKE &quot;Prod%&quot;'</code></td></tr>
<tr><td>以後綴結束</td><td><code translate="no">%.json</code></td><td><code translate="no">filter = 'filename LIKE &quot;%.json&quot;'</code></td></tr>
<tr><td>包含子串</td><td><code translate="no">%vector%</code></td><td><code translate="no">filter = 'description LIKE &quot;%vector%&quot;'</code></td></tr>
<tr><td>在固定位置匹配一個字元</td><td><code translate="no">AB_%</code></td><td><code translate="no">filter = 'code LIKE &quot;AB_%&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="LIKE-matching-behavior" class="common-anchor-header">LIKE 匹配行為<button data-href="#LIKE-matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p>使用<code translate="no">LIKE</code> 進行前綴、後綴、包含和固定位置的單字元匹配。<code translate="no">LIKE</code> 不支援字元類別（如<code translate="no">[0-9]</code> ）、交替（如<code translate="no">error|failed</code> ）、重複次數（如<code translate="no">{4}</code> ）、錨點（如<code translate="no">^</code> 或<code translate="no">$</code> ）或大小寫不敏感旗標（如<code translate="no">(?i)</code> ）。對於這些模式，請使用 regex。</p>
<p>對於精確的全字串相等，請使用<code translate="no">==</code> 。僅在過濾器需要通配符匹配時才使用<code translate="no">LIKE</code> 。</p>
<h2 id="Use-regex" class="common-anchor-header">使用 regex<button data-href="#Use-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>當模式需要正規表達特性，例如字元類別、重複、交替、錨點或不區分大小寫的匹配時，請使用 regex 過濾器。Milvus 將<a href="https://github.com/google/re2/wiki/syntax">RE2</a>正規表達式套用至字串值。</p>
<p><code translate="no">=~</code> 或<code translate="no">!~</code> 的右側必須是字串字面意義。</p>
<table>
<thead>
<tr><th>運算符號</th><th>意義</th><th>範例</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">=~</code></td><td>匹配滿足 regex 模式的值。</td><td><code translate="no">filter = 'message =~ &quot;E[0-9]{4}&quot;'</code></td></tr>
<tr><td><code translate="no">!~</code></td><td>排除滿足 regex 模式的值。</td><td><code translate="no">filter = 'message !~ &quot;^DEBUG&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="Common-regex-patterns" class="common-anchor-header">常見的 regex 模式<button data-href="#Common-regex-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>以下範例在 Milvus 過濾表達式中使用常見的 RE2 語法。關於完整的 regex 語法，請參考<a href="https://github.com/google/re2/wiki/syntax">RE2 語法</a>參考。</p>
<table>
<thead>
<tr><th>要求</th><th>模式</th><th>篩選範例</th></tr>
</thead>
<tbody>
<tr><td>包含字面文字</td><td><code translate="no">error</code></td><td><code translate="no">filter = 'message =~ &quot;error&quot;'</code></td></tr>
<tr><td>以前綴開始</td><td><code translate="no">^ERR</code></td><td><code translate="no">filter = 'code =~ &quot;^ERR&quot;'</code></td></tr>
<tr><td>以後綴結束</td><td><code translate="no">\.json$</code></td><td><code translate="no">filter = 'filename =~ &quot;\\.json$&quot;'</code></td></tr>
<tr><td>匹配數字序列</td><td><code translate="no">[0-9]+</code></td><td><code translate="no">filter = 'message =~ &quot;[0-9]+&quot;'</code></td></tr>
<tr><td>匹配固定數字</td><td><code translate="no">[0-9]{4}</code></td><td><code translate="no">filter = 'code =~ &quot;[0-9]{4}&quot;'</code></td></tr>
<tr><td>匹配電子郵件網域</td><td><code translate="no">@example\.com$</code></td><td><code translate="no">filter = 'email =~ &quot;@example\\.com$&quot;'</code></td></tr>
<tr><td>不區分大小寫進行匹配</td><td><code translate="no">(?i)error</code></td><td><code translate="no">filter = 'message =~ &quot;(?i)error&quot;'</code></td></tr>
<tr><td>匹配完整字串</td><td><code translate="no">^prod-[0-9]+$</code></td><td><code translate="no">filter = 'name =~ &quot;^prod-[0-9]+$&quot;'</code></td></tr>
</tbody>
</table>
<p>若要匹配多個單字中的一個，請使用<code translate="no">|</code> ：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>當要匹配字面上的 regex 元符號時，請在 regex 模式中將它們轉義。例如，若要匹配字面上的點 (<code translate="no">\.</code> 在 regex 中)，請在 Python 篩選字串中寫入<code translate="no">\\.</code> ：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>注意：Milvus regex 篩選器遵循 RE2 語法。如果一個 regex 模式使用 RE2 不支援的語法或其他無效的語法，Milvus 會拒絕篩選表達式。有關 regex 元字元、旗標和匹配行為的詳細資訊，請參閱<a href="https://github.com/google/re2/wiki/syntax">RE2 語法</a>參考。</p>
<h3 id="Matching-behavior" class="common-anchor-header">匹配行為<button data-href="#Matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>子串匹配</strong></p>
<p>Milvus regex 匹配使用子串語義。模式不需要匹配整個欄位值。例如，以下篩選條件同時匹配<code translate="no">E1001</code> 和<code translate="no">failed with E1001 after retry</code> ：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>若要匹配整個欄位值，請使用<code translate="no">^</code> 和<code translate="no">$</code> 錨點：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match only values that are exactly E followed by four digits</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>可為空的 VARCHAR 欄位</strong></p>
<p>Regex 過濾器不匹配空值。這適用於<code translate="no">=~</code> 和<code translate="no">!~</code> 。如果要排除 regex 模式但保留空值，請明確加入<code translate="no">OR field IS NULL</code> ：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>JSON 路徑</strong></p>
<p>對於 JSON 路徑，當路徑遺失、為空或解析為非字串值時，regex 過濾器會有不同的行為：</p>
<table>
<thead>
<tr><th>篩選</th><th>包含遺漏/空值/非字串值？</th><th>備註</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">json_field[&quot;path&quot;] =~ &quot;pattern&quot;</code></td><td>不包含</td><td>僅匹配符合 regex 模式的字串值。</td></tr>
<tr><td><code translate="no">json_field[&quot;path&quot;] !~ &quot;pattern&quot;</code></td><td>是</td><td>返回路徑遺失、空、非字串或字串不符合 regex 模式的實體。</td></tr>
</tbody>
</table>
<h2 id="Accelerate-pattern-matching-with-indexes" class="common-anchor-header">使用索引加速模式匹配<button data-href="#Accelerate-pattern-matching-with-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 支援多種字串欄位的索引類型，可與<code translate="no">LIKE</code> 和<code translate="no">VARCHAR</code> 欄位或 JSON 字串路徑的 regex 過濾器一起使用，例如<code translate="no">NGRAM</code>,<code translate="no">STL_SORT</code>,<code translate="no">INVERTED</code>, 和<code translate="no">BITMAP</code> 。模式匹配可以在沒有索引的情況下運作，但索引可以改善大型資料集的效能。</p>
<p>索引的有效性取決於模式的表達方式、Milvus 是否可以抽取固定字面的子串，以及目標欄位的 cardinality 和分佈情況。前綴式樣式（如<code translate="no">name LIKE &quot;Prod%&quot;</code> ）與後綴式樣式（如<code translate="no">description LIKE &quot;%vector%&quot;</code> 或<code translate="no">filename LIKE &quot;%.json&quot;</code> ）可能會從不同的索引策略中獲益。</p>
<p>使用下表作為起點，然後以您自己的工作負載作為基準：</p>
<table>
<thead>
<tr><th>模式或資料特性</th><th>要考慮的索引</th><th>備註</th></tr>
</thead>
<tbody>
<tr><td>包含固定字面的子字串，例如<code translate="no">message =~ &quot;error.*timeout&quot;</code> 或<code translate="no">message LIKE &quot;%database%&quot;</code></td><td><code translate="no">NGRAM</code></td><td>有助於 Milvus 從模式中提取有意義的字面子串。詳情請參閱<a href="/docs/zh-hant/ngram.md">NGRAM</a>。</td></tr>
<tr><td>前綴、精確或類似相等的字串篩選器，特別是在具有低到中等卡達性的欄位上。</td><td><code translate="no">STL_SORT</code>,<code translate="no">INVERTED</code>, 或<code translate="no">BITMAP</code></td><td>當字段有重複值或篩選條件接近精確匹配時，可能會更有效。詳情請參閱<a href="/docs/zh-hant/stl-sort.md">STL_SORT</a>、<a href="/docs/zh-hant/inverted.md">INVERTED</a> 和<a href="/docs/zh-hant/bitmap.md">BITMAP</a>。</td></tr>
<tr><td>沒有固定字元的 Regex 模式，或以字元類別、短字元或通配符為主的模式</td><td>在依賴索引加速之前先進行基準測試</td><td>這些模式可能會提供有限的索引選擇性，並可能會退回到更廣泛的掃描。</td></tr>
</tbody>
</table>
