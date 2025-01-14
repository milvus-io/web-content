---
id: basic-operators.md
summary: >-
  Milvus
  提供豐富的基本運算符號，幫助您有效地過濾和查詢資料。這些運算符允許您根據標量字段、數值計算、邏輯條件等細化搜尋條件。瞭解如何使用這些運算符號，對建立精確的查詢和最大化搜尋效率至關重要。
title: 基本操作員
---
<h1 id="Basic-Operators​" class="common-anchor-header">基本運算符號<button data-href="#Basic-Operators​" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 提供豐富的基本運算符號，幫助您有效地過濾和查詢資料。這些運算符允許您根據標量字段、數字計算、邏輯條件等細化搜尋條件。了解如何使用這些運算符號，對建立精確的查詢和最大化搜尋效率至關重要。</p>
<h2 id="Comparison-operators​" class="common-anchor-header">比較運算符號<button data-href="#Comparison-operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>比較運算符用於根據相等、不相等或大小篩選資料。它們適用於數值、文字和日期欄位。</p>
<h3 id="Supported-Comparison-Operators​" class="common-anchor-header">支援的比較運算符。</h3><ul>
<li><p><code translate="no">==</code> (相等於)</p></li>
<li><p><code translate="no">!=</code> (不等於)</p></li>
<li><p><code translate="no">&gt;</code> (大於)</p></li>
<li><p><code translate="no">&lt;</code> (小於)</p></li>
<li><p><code translate="no">&gt;=</code> (大於或等於)</p></li>
<li><p><code translate="no">&lt;=</code> (小於或等於)</p></li>
</ul>
<h3 id="Example-1-Filtering-with-Equal-To-​" class="common-anchor-header">範例 1：使用 Equal To 過濾 (<code translate="no">==</code>)</h3><p>假設您有一個名為<code translate="no">status</code> 的欄位，而您想要找出<code translate="no">status</code> 為「活躍」的所有實體。您可以使用相等運算符<code translate="no">==</code> 。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;status == &quot;active&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Filtering-with-Not-Equal-To-​" class="common-anchor-header">範例 2：使用 Not Equal To 過濾 (<code translate="no">!=</code>)</h3><p>尋找<code translate="no">status</code> 不是「非活躍」的實體。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;status != &quot;inactive&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Filtering-with-Greater-Than-​" class="common-anchor-header">範例 3：使用「大於」篩選 (<code translate="no">&gt;</code>)</h3><p>如果要尋找<code translate="no">age</code> 大於 30 的所有實體。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;age &gt; 30&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-4-Filtering-with-Less-Than-​" class="common-anchor-header">範例 4: 使用小於 (<code translate="no">&lt;</code>) 過濾</h3><p>若要尋找<code translate="no">price</code> 小於 100 的實體。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price &lt; 100&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-5-Filtering-with-Greater-Than-or-Equal-To-​" class="common-anchor-header">範例 5: 過濾大於或等於 (<code translate="no">&gt;=</code>)</h3><p>若要尋找<code translate="no">rating</code> 大於或等於 4 的所有實體。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;rating &gt;= 4&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-6-Filtering-with-Less-Than-or-Equal-To-​" class="common-anchor-header">範例 6：使用小於或等於 (<code translate="no">&lt;=</code>) 過濾</h3><p>若要尋找<code translate="no">discount</code> 小於或等於 10% 的實體。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;discount &lt;= 10&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Range-operators​" class="common-anchor-header">範圍運算符號<button data-href="#Range-operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>範圍運算符有助於根據特定的值集或範圍篩選資料。</p>
<h3 id="Supported-Range-Operators​" class="common-anchor-header">支援的範圍運算符。</h3><ul>
<li><p><code translate="no">IN</code>:用於匹配特定集合或範圍內的值。</p></li>
<li><p><code translate="no">LIKE</code>:用於匹配模式 (主要用於文字欄位)。</p></li>
</ul>
<h3 id="Example-1-Using-IN-to-Match-Multiple-Values​" class="common-anchor-header">範例 1：使用<code translate="no">IN</code> 來匹配多個值</h3><p>如果您要尋找<code translate="no">color</code> 為「紅」、「綠」或「藍」的所有實體。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>當您要檢查一個值清單中的成員身分時，這就很有用。</p>
<h3 id="Example-2-Using-LIKE-for-Pattern-Matching​" class="common-anchor-header">範例 2：使用<code translate="no">LIKE</code> 進行模式匹配</h3><p><code translate="no">LIKE</code> 運算符號用於字串欄位中的模式匹配。它可以匹配文本中不同位置的子串：<strong>前綴</strong>、<strong>後綴</strong>或<strong>後綴</strong>。<code translate="no">LIKE</code> 運算符號使用<code translate="no">%</code> 符號作為通配符，可以匹配任何數量的字元（包括 0）。</p>
<h4 id="Prefix-Match-Starts-With​" class="common-anchor-header">前綴匹配（從開始</h4><p>若要執行<strong>前綴</strong>匹配，即字串以指定的模式開始，您可以將模式放在開頭，並使用<code translate="no">%</code> 來匹配其後的任何字元。例如，搜尋<code translate="no">name</code> 以「Prod」開頭的所有產品。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;Prod%&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>這將匹配任何名稱以 &quot;Prod 「開頭的產品，例如 」Product A&quot;、&quot;Product B &quot;等。</p>
<h4 id="Suffix-Match-Ends-With​" class="common-anchor-header">後綴匹配 (結尾為)</h4><p>對於<strong>後綴</strong>匹配，如果字串以指定的樣式結束，請將<code translate="no">%</code> 符號放在樣式的開頭。例如，搜尋<code translate="no">name</code> 以「XYZ」結尾的所有產品。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;%XYZ&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>這將匹配任何名稱以 &quot;XYZ 「結尾的產品，例如 」ProductXYZ&quot;、&quot;SampleXYZ &quot;等。</p>
<h4 id="Infix-Match-Contains​" class="common-anchor-header">下位元匹配 (包含)</h4><p>若要執行中位元（<strong>infix</strong>）匹配，即模式可以出現在字串中的任何位置，您可以將<code translate="no">%</code> 符號放在模式的開頭和結尾。例如，要搜尋<code translate="no">name</code> 包含「Pro」的所有產品。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;%Pro%&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>這將匹配任何名稱包含子串「Pro」的產品，例如「Product」、「ProLine」或「SuperPro」。</p>
<h2 id="Arithmetic-Operators​" class="common-anchor-header">算術運算符號<button data-href="#Arithmetic-Operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>算術運算符允許您根據涉及數字欄位的計算建立條件。</p>
<h3 id="Supported-Arithmetic-Operators​" class="common-anchor-header">支援的算術運算元。</h3><ul>
<li><p><code translate="no">+</code> (加法)</p></li>
<li><p><code translate="no">-</code> (減法)</p></li>
<li><p><code translate="no">*</code> (乘法)</p></li>
<li><p><code translate="no">/</code> (除法)</p></li>
<li><p><code translate="no">%</code> (模乘)</p></li>
<li><p><code translate="no">**</code> (幂级数)</p></li>
</ul>
<h3 id="Example-1-Using-Addition-+​" class="common-anchor-header">範例 1：使用加法 (<code translate="no">+</code>)</h3><p>尋找<code translate="no">total</code> 價格是<code translate="no">base_price</code> 和<code translate="no">tax</code> 之和的實體。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;total == base_price + tax&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-Subtraction--​" class="common-anchor-header">範例 2：使用減法 (<code translate="no">-</code>)</h3><p>尋找<code translate="no">quantity</code> 大於 50 且<code translate="no">quantity_sold</code> 小於 30 的實體。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;quantity - quantity_sold &gt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Using-Multiplication-​" class="common-anchor-header">範例 3：使用乘法 (<code translate="no">*</code>)</h3><p>若要尋找<code translate="no">price</code> 大於 100 且<code translate="no">quantity</code> 大於 10 的實體，請使用乘法。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price * quantity &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-4-Using-Division-​" class="common-anchor-header">範例 4：使用除法 (<code translate="no">/</code>)</h3><p>尋找<code translate="no">total_price</code> 除以<code translate="no">quantity</code> 小於 50 的乘積。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;total_price / quantity &lt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-5-Using-Modulus-​" class="common-anchor-header">範例 5: 使用模數 (<code translate="no">%</code>)</h3><p>尋找<code translate="no">id</code> 是偶數 (即能被 2 整除) 的實體。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;id % 2 == 0&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-6-Using-Exponentiation-​" class="common-anchor-header">例六：使用幂 (<code translate="no">**</code>)</h3><p>尋找<code translate="no">price</code> 升為 2 的幂大於 1000 的實體。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price ** 2 &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Logical-Operators​" class="common-anchor-header">邏輯運算符號<button data-href="#Logical-Operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>邏輯運算符用來將多重條件結合為更複雜的篩選表達式。這些運算符包括<code translate="no">AND</code>,<code translate="no">OR</code>, 和<code translate="no">NOT</code> 。</p>
<h3 id="Supported-Logical-Operators​" class="common-anchor-header">支援的邏輯運算符。</h3><ul>
<li><p><code translate="no">AND</code>:結合必須全為真的多個條件。</p></li>
<li><p><code translate="no">OR</code>:組合條件，其中至少有一個條件必須為真。</p></li>
<li><p><code translate="no">NOT</code>:否定一個條件。</p></li>
</ul>
<h3 id="Example-1-Using-AND-to-Combine-Conditions​" class="common-anchor-header">範例 1：使用<code translate="no">AND</code> 來合併條件</h3><p>查找<code translate="no">price</code> 大於 100 且<code translate="no">stock</code> 大於 50 的所有產品。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price &gt; 100 AND stock &gt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-OR-to-Combine-Conditions​" class="common-anchor-header">範例 2：使用<code translate="no">OR</code> 來合併條件</h3><p>查找<code translate="no">color</code> 為「紅色」或「藍色」的所有產品。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color == &quot;red&quot; OR color == &quot;blue&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Using-NOT-to-Exclude-a-Condition​" class="common-anchor-header">範例 3：使用<code translate="no">NOT</code> 來排除條件</h3><p>找出<code translate="no">color</code> 不是「綠色」的所有產品。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;NOT color == &quot;green&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Tips-on-Using-Basic-Operators-with-JSON-and-ARRAY-Fields​" class="common-anchor-header">在 JSON 和 ARRAY 字段中使用基本運算符的提示<button data-href="#Tips-on-Using-Basic-Operators-with-JSON-and-ARRAY-Fields​" class="anchor-icon" translate="no">
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
    </button></h2><p>雖然 Milvus 中的基本運算符是多用途的，可以應用於標量欄位，但它們也可以有效地用於 JSON 和 ARRAY 欄位中的鍵和索引。</p>
<p>例如，如果您有一個<code translate="no">product</code> 欄位，其中包含多個鍵值，如<code translate="no">price</code>,<code translate="no">model</code>, 和<code translate="no">tags</code> ，總是直接引用鍵值。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;product[&quot;price&quot;] &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>若要尋找記錄溫度陣列中第一個溫度超過特定值的記錄，請使用。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;history_temperatures[0] &gt; 30&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Conclusion​" class="common-anchor-header">結論<button data-href="#Conclusion​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 提供了一系列基本運算符號，讓您可以靈活地過濾和查詢資料。透過結合比較、範圍、算術和邏輯運算符號，您可以建立強大的篩選表達式，縮小搜尋結果的範圍，並有效率地擷取所需的資料。</p>
