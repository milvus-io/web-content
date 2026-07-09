---
id: pattern-matching.md
title: 模式比對
summary: >-
  Milvus 支援使用 LIKE 萬用字元模式和 RE2 正規表達式進行字串模式比對。可運用模式篩選器，在 VARCHAR 欄位、JSON 字串路徑或
  ARRAY 元素中，比對前綴、後綴、子字串、結構化代碼、電子郵件網域、URL 路徑及其他字串模式。
---
<h1 id="Pattern-Matching" class="common-anchor-header">模式比對<button data-href="#Pattern-Matching" class="anchor-icon" translate="no">
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
    </button></h1><p>在代理式搜尋應用中，向量搜尋與 grep 風格的模式比對往往相輔相成。向量搜尋會檢索出語義相關的實體，而模式比對則透過精確的字串結構（例如錯誤代碼、日誌前綴、電子郵件網域、URL 路徑或識別碼）來縮小搜尋結果範圍。</p>
<p>在 Milvus 中，您可以透過標量篩選器來表達這些模式限制：使用 `<code translate="no">LIKE</code> ` 進行簡單的萬用字元匹配，以及使用 `<code translate="no">=~</code> ` 或 `<code translate="no">!~</code> ` 進行<a href="https://github.com/google/re2/wiki/syntax">RE2</a>正規表達式匹配。您可以將這些篩選器與 `<code translate="no">query</code>`、`<code translate="no">search</code>` 或混合搜尋結合使用。</p>
<p>模式匹配表達式需寫入<code translate="no">filter</code> 參數中。例如，以下查詢會匹配包含<code translate="no">E1001</code> 等錯誤代碼的日誌訊息：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

res = client.query(
    collection_name=<span class="hljs-string">&quot;log_events&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>本頁的範例主要著重於指派給 `<code translate="no">filter</code>` 的表達式。您可以在接受標量篩選器的 Milvus 操作中使用相同的篩選表達式語法，例如 `<code translate="no">query</code>`、`<code translate="no">search</code>` 以及混合搜尋。</p>
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
    </button></h2><p>模式比對僅適用於字串值。</p>
<table>
<thead>
<tr><th>目標</th><th><code translate="no">LIKE</code></th><th>正規表達式<code translate="no">=~</code> /<code translate="no">!~</code></th><th>備註</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">VARCHAR</code> 欄位</td><td>是</td><td>是</td><td>字串欄位進行模式比對的典型目標。</td></tr>
<tr><td><code translate="no">JSON</code> 路徑，其<code translate="no">VARCHAR</code> 已進行型別轉換</td><td>是</td><td>是</td><td>若要進行正向匹配，JSON 路徑值必須為字串。若您為加速目的在 JSON 路徑上建立索引，請設定<code translate="no">json_cast_type=&quot;varchar&quot;</code> 。</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code> 元素</td><td>是</td><td>是</td><td>根據索引匹配特定元素，例如<code translate="no">tags[0]</code> 。模式匹配<strong>不會</strong>掃描所有元素；它僅適用於指定索引處的元素。</td></tr>
<tr><td>數值、布林值、向量、<code translate="no">TEXT</code> 或其他非<code translate="no">VARCHAR</code> 目標</td><td>否</td><td>否</td><td>模式匹配僅適用於 `<code translate="no">VARCHAR</code> ` 值、解析為字串的 JSON 路徑，或具有索引的 `<code translate="no">ARRAY&lt;VARCHAR&gt;</code> ` 元素。</td></tr>
</tbody>
</table>
<h2 id="Choose-LIKE-or-regex" class="common-anchor-header">選擇 LIKE 或 正規表達式<button data-href="#Choose-LIKE-or-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>請選擇能最簡潔地表達所需模式的運算子。</p>
<p>若需進行字串精確比對，建議您使用 `<code translate="no">==</code> ` 而非模式比對。僅當篩選條件需要比對特定模式時，才應使用 `<code translate="no">LIKE</code> ` 或正規表達式。</p>
<table>
<thead>
<tr><th>需求</th><th>建議運算子</th><th>範例</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td>字串完全相等</td><td><code translate="no">==</code></td><td><code translate="no">status == &quot;active&quot;</code></td><td>與字串<code translate="no">active</code> 完全相等。</td></tr>
<tr><td>簡單前綴匹配</td><td><code translate="no">LIKE</code></td><td><code translate="no">name LIKE &quot;Prod%&quot;</code></td><td>匹配以<code translate="no">Prod</code> 開頭的字串。</td></tr>
<tr><td>簡單後綴匹配</td><td><code translate="no">LIKE</code></td><td><code translate="no">filename LIKE &quot;%.json&quot;</code></td><td>匹配以<code translate="no">.json</code> 結尾的字串。</td></tr>
<tr><td>簡單包含匹配</td><td><code translate="no">LIKE</code></td><td><code translate="no">description LIKE &quot;%vector database%&quot;</code></td><td>匹配字串中任何位置包含<code translate="no">vector database</code> 的值。</td></tr>
<tr><td>匹配結構化代碼或固定長度模式</td><td><code translate="no">=~</code></td><td><code translate="no">code =~ &quot;E[0-9]{4}&quot;</code></td><td>匹配那些區分大小寫且包含<code translate="no">E</code> 後接四位數字的字串，例如<code translate="no">E1001</code> 。</td></tr>
<tr><td>不區分大小寫的模式比對</td><td><code translate="no">=~</code> 使用<code translate="no">(?i)</code></td><td><code translate="no">message =~ &quot;(?i)error&quot;</code></td><td>匹配<code translate="no">error</code> 、<code translate="no">ERROR</code> 或其他大小寫變體。</td></tr>
<tr><td>排除符合正規表達式模式的值</td><td><code translate="no">!~</code></td><td><code translate="no">message !~ &quot;^DEBUG&quot;</code></td><td>排除以<code translate="no">DEBUG</code> 開頭的字串。</td></tr>
</tbody>
</table>
<p>使用<code translate="no">LIKE</code> 進行簡單的萬用字元比對。當模式需要字元類別、重複、選擇（例如<code translate="no">error|failed</code> ）、錨點或不區分大小寫的比對時，請使用正規表達式。</p>
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
    </button></h2><p><code translate="no">LIKE</code> 運算子用於對字串值進行簡單的萬用字元比對。它僅支援以下萬用字元：</p>
<table>
<thead>
<tr><th>通配符</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">%</code></td><td>匹配零個或多個字元。</td></tr>
<tr><td><code translate="no">_</code></td><td>匹配恰好一個字元。</td></tr>
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
    </button></h3><p>使用<code translate="no">%</code> 和<code translate="no">_</code> 的位置來控制固定文字在匹配字串中的出現位置。</p>
<table>
<thead>
<tr><th>需求</th><th>模式</th><th>篩選範例</th></tr>
</thead>
<tbody>
<tr><td>以前綴開頭</td><td><code translate="no">Prod%</code></td><td><code translate="no">filter = 'name LIKE &quot;Prod%&quot;'</code></td></tr>
<tr><td>以後綴結尾</td><td><code translate="no">%.json</code></td><td><code translate="no">filter = 'filename LIKE &quot;%.json&quot;'</code></td></tr>
<tr><td>包含子字串</td><td><code translate="no">%vector%</code></td><td><code translate="no">filter = 'description LIKE &quot;%vector%&quot;'</code></td></tr>
<tr><td>匹配固定位置上的單一字元</td><td><code translate="no">AB_%</code></td><td><code translate="no">filter = 'code LIKE &quot;AB_%&quot;'</code></td></tr>
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
    </button></h3><p>請使用<code translate="no">LIKE</code> 進行前綴、後綴、包含以及固定位置單一字元匹配。<code translate="no">LIKE</code> 不支援字元類別（例如<code translate="no">[0-9]</code> ）、選擇關係（例如<code translate="no">error|failed</code> ）、重複次數（例如<code translate="no">{4}</code> ）、錨點（例如<code translate="no">^</code> 或<code translate="no">$</code> ），亦不支援不區分大小寫的標誌（例如<code translate="no">(?i)</code> ）。若需使用此類模式，請改用正規表達式。</p>
<p>若需進行完全字串相等比對，請使用<code translate="no">==</code> 。僅當篩選條件需要通配符比對時，才使用<code translate="no">LIKE</code> 。</p>
<h3 id="Escaping-wildcards-in-a-LIKE-pattern" class="common-anchor-header">在 LIKE 模式中對通配符進行轉義<button data-href="#Escaping-wildcards-in-a-LIKE-pattern" class="anchor-icon" translate="no">
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
    </button></h3><p>在<code translate="no">LIKE</code> 模式中，<code translate="no">%</code> 匹配零個或多個字元，而<code translate="no">_</code> 則匹配精確一個字元。若要精確匹配<code translate="no">%</code> 、<code translate="no">_</code> 或<code translate="no">\</code> 這些字面值，請使用反斜線 (<code translate="no">\</code>) 對字元進行轉義：</p>
<ul>
<li><code translate="no">name LIKE r&quot;\%&quot;</code> 會匹配字面值<code translate="no">%</code> 。</li>
<li><code translate="no">name LIKE r&quot;\_%&quot;</code> 匹配以字面值<code translate="no">_</code> 開頭的值。</li>
<li><code translate="no">name LIKE r&quot;\\%&quot;</code> 匹配以字面值反斜線開頭的值。</li>
</ul>
<p>原始字串字面值（寫法為<code translate="no">r&quot;...&quot;</code> 或<code translate="no">r'...'</code> ）會在 Milvus 篩選器表達式中保留反斜線的原始形式。建議在<code translate="no">LIKE</code> 以及包含反斜線的正規表達式中使用此格式。若未使用原始字串，一般字串字面值在評估模式前仍會處理轉義序列，因此可能需要更多反斜線。</p>
<h2 id="Use-regex--Milvus-30x" class="common-anchor-header">使用正規表達式<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Use-regex--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h2><p>當模式需要正則表達式功能（例如字元類別、重複、選擇、錨點或不區分大小寫的匹配）時，請使用正則表達式篩選器。Milvus 會將<a href="https://github.com/google/re2/wiki/syntax">RE2</a>正則表達式套用至字串值。</p>
<p><code translate="no">=~</code> 或<code translate="no">!~</code> 的右側必須為字串文字。</p>
<table>
<thead>
<tr><th>運算子</th><th>含義</th><th>範例</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">=~</code></td><td>匹配符合正規表達式模式的值。</td><td><code translate="no">filter = 'message =~ &quot;E[0-9]{4}&quot;'</code></td></tr>
<tr><td><code translate="no">!~</code></td><td>排除符合正規表達式模式的值。</td><td><code translate="no">filter = 'message !~ &quot;^DEBUG&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="Use-raw-string-literals" class="common-anchor-header">使用原始字串文字<button data-href="#Use-raw-string-literals" class="anchor-icon" translate="no">
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
    </button></h3><p>對於包含反斜線的正規表達式模式，建議使用原始字串文字。在原始字串中（寫法為<code translate="no">r&quot;...&quot;</code> 或<code translate="no">r'...'</code> ），反斜線會原樣傳遞給正規表達式引擎。這可避免一般字串文字所需的額外轉義。</p>
<p>例如：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ r&quot;\d{4}-\d{2}-\d{2}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>這會匹配包含類似日期的字串，例如<code translate="no">2026-07-01</code> 。</p>
<p>若未使用原始字串，一般字串文字會在評估正規表達式模式之前先處理轉義序列，因此像<code translate="no">\d</code> 、<code translate="no">\s</code> 這樣的模式，或是包含轉義字元的字串，可能需要額外的反斜線。</p>
<h3 id="Common-regex-patterns" class="common-anchor-header">常見的正規表達式模式<button data-href="#Common-regex-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>以下範例在 Milvus 篩選表達式中使用常見的 RE2 語法。如需完整的正規表達式語法，請參閱<a href="https://github.com/google/re2/wiki/syntax">RE2 語法</a>參考。</p>
<table>
<thead>
<tr><th>需求</th><th>模式</th><th>篩選範例</th></tr>
</thead>
<tbody>
<tr><td>包含字面文字</td><td><code translate="no">error</code></td><td><code translate="no">filter = 'message =~ &quot;error&quot;'</code></td></tr>
<tr><td>以前綴開頭</td><td><code translate="no">^ERR</code></td><td><code translate="no">filter = 'code =~ &quot;^ERR&quot;'</code></td></tr>
<tr><td>以後綴結尾</td><td><code translate="no">\.json$</code></td><td><code translate="no">filter = 'filename =~ &quot;\\.json$&quot;'</code></td></tr>
<tr><td>匹配一串數字</td><td><code translate="no">[0-9]+</code></td><td><code translate="no">filter = 'message =~ &quot;[0-9]+&quot;'</code></td></tr>
<tr><td>匹配固定數量的數字</td><td><code translate="no">[0-9]{4}</code></td><td><code translate="no">filter = 'code =~ &quot;[0-9]{4}&quot;'</code></td></tr>
<tr><td>匹配電子郵件網域</td><td><code translate="no">@example\.com$</code></td><td><code translate="no">filter = 'email =~ &quot;@example\\.com$&quot;'</code></td></tr>
<tr><td>不區分大小寫</td><td><code translate="no">(?i)error</code></td><td><code translate="no">filter = 'message =~ &quot;(?i)error&quot;'</code></td></tr>
<tr><td>匹配完整字串</td><td><code translate="no">^prod-[0-9]+$</code></td><td><code translate="no">filter = 'name =~ &quot;^prod-[0-9]+$&quot;'</code></td></tr>
</tbody>
</table>
<p>若要匹配多個單字中的任一個，請使用<code translate="no">|</code> 進行選擇：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>若要字面匹配正則表達式元字元，請在正則表達式模式中對其進行轉義。例如，若要匹配字面上的點（正則表達式中的 `<code translate="no">\.</code> `），請在 Python 篩選器字串中寫作 `<code translate="no">\\.</code> `：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>注意：Milvus 的正規表達式篩選器遵循 RE2 語法。若正規表達式模式使用了 RE2 不支援的語法，或因其他原因而無效，Milvus 將拒絕該篩選器表達式。有關正規表達式元字元、標誌及匹配行為的詳細資訊，請參閱<a href="https://github.com/google/re2/wiki/syntax">RE2 語法參考</a>。</p>
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
    </button></h3><p><strong>子字串匹配</strong></p>
<p>Milvus 的正規表達式比對採用子字串語義。模式無需與整個欄位值完全匹配。例如，以下篩選器會同時匹配<code translate="no">E1001</code> 和<code translate="no">failed with E1001 after retry</code> ：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>若要匹配整個欄位值，請使用<code translate="no">^</code> 和<code translate="no">$</code> 錨點：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match only values that are exactly E followed by four digits</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>可為空的 VARCHAR 欄位</strong></p>
<p>正規表達式篩選器不會匹配 null 值。這同時適用於<code translate="no">=~</code> 和<code translate="no">!~</code> 。若要排除某個正規表達式模式但保留 null 值，請明確加入<code translate="no">OR field IS NULL</code> ：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>JSON 路徑</strong></p>
<p>對於 JSON 路徑，當路徑缺失、為 null 或解析為非字串值時，正規表達式篩選器的行為會有所不同：</p>
<table>
<thead>
<tr><th>篩選器</th><th>是否包含缺失／null／非字串值？</th><th>備註</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">json_field[&quot;path&quot;] =~ &quot;pattern&quot;</code></td><td>否</td><td>僅匹配符合正規表達式模式的字串值。</td></tr>
<tr><td><code translate="no">json_field[&quot;path&quot;] !~ &quot;pattern&quot;</code></td><td>是</td><td>回傳路徑為缺失、null、非字串，或不符合正規表達式模式之字串的實體。</td></tr>
</tbody>
</table>
<h2 id="Accelerate-pattern-matching-with-indexes" class="common-anchor-header">利用索引加速模式比對<button data-href="#Accelerate-pattern-matching-with-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 支援多種適用於字串欄位的索引類型，可與<code translate="no">LIKE</code> 以及針對<code translate="no">VARCHAR</code> 欄位或 JSON 字串路徑的正規表達式篩選器搭配使用，例如<code translate="no">NGRAM</code> 、<code translate="no">STL_SORT</code> 、<code translate="no">INVERTED</code> 及<code translate="no">BITMAP</code> 。模式比對雖可在無索引的情況下運作，但建立索引可提升大型資料集的處理效能。</p>
<p>索引的效能取決於模式表達式、Milvus 能否提取固定的字面子字串，以及目標欄位的基數與分佈。前綴式模式（例如<code translate="no">name LIKE &quot;Prod%&quot;</code> ）所適用的索引策略，可能與中綴或後綴模式（例如<code translate="no">description LIKE &quot;%vector%&quot;</code> 或<code translate="no">filename LIKE &quot;%.json&quot;</code> ）有所不同。</p>
<p>請將下表作為起點，然後根據您自己的工作負載進行效能測試：</p>
<table>
<thead>
<tr><th>模式或資料特性</th><th>應考慮的索引</th><th>備註</th></tr>
</thead>
<tbody>
<tr><td>包含固定的字面值子字串，例如<code translate="no">message =~ &quot;error.*timeout&quot;</code> 或<code translate="no">message LIKE &quot;%database%&quot;</code></td><td><code translate="no">NGRAM</code></td><td>當 Milvus 能從模式中提取有意義的字面值子字串時，此設定會有所幫助。詳細資訊請參閱<a href="/docs/zh-hant/ngram.md">NGRAM</a>。</td></tr>
<tr><td>前綴、精確或等值類型的字串篩選器，特別適用於基數較低至中等的欄位</td><td><code translate="no">STL_SORT</code>、<code translate="no">INVERTED</code> ，或<code translate="no">BITMAP</code></td><td>當欄位具有重複值，或篩選條件接近完全匹配時，此方法可能更為有效。詳情請參閱<a href="/docs/zh-hant/stl-sort.md">STL_SORT</a>、<a href="/docs/zh-hant/inverted.md">INVERTED</a> 及<a href="/docs/zh-hant/bitmap.md">BITMAP</a>。</td></tr>
<tr><td>不含固定字面值的正規表達式模式，或以字元類別、短標記或萬用字元為主的模式</td><td>在依賴索引加速之前請先進行效能測試</td><td>這些模式可能僅提供有限的索引選擇性，並可能退而採用更廣泛的掃描。</td></tr>
</tbody>
</table>
