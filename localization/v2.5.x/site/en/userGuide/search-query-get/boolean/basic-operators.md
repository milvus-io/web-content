---
id: basic-operators.md
summary: >-
  Milvus provides a rich set of basic operators to help you filter and query
  data efficiently. These operators allow you to refine your search conditions
  based on scalar fields, numeric calculations, logical conditions, and more.
  Understanding how to use these operators is crucial for building precise
  queries and maximizing the efficiency of your searches.​
title: Basic Operators
---
<h1 id="Basic-Operators​" class="common-anchor-header">Basic Operators​<button data-href="#Basic-Operators​" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus provides a rich set of basic operators to help you filter and query data efficiently. These operators allow you to refine your search conditions based on scalar fields, numeric calculations, logical conditions, and more. Understanding how to use these operators is crucial for building precise queries and maximizing the efficiency of your searches.​</p>
<h2 id="Comparison-operators​" class="common-anchor-header">Comparison operators​<button data-href="#Comparison-operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Comparison operators are used to filter data based on equality, inequality, or size. They are applicable to numeric, text, and date fields.​</p>
<h3 id="Supported-Comparison-Operators​" class="common-anchor-header">Supported Comparison Operators:​</h3><ul>
<li><p><code translate="no">==</code> (Equal to)​</p></li>
<li><p><code translate="no">!=</code> (Not equal to)​</p></li>
<li><p><code translate="no">&gt;</code> (Greater than)​</p></li>
<li><p><code translate="no">&lt;</code> (Less than)​</p></li>
<li><p><code translate="no">&gt;=</code> (Greater than or equal to)​</p></li>
<li><p><code translate="no">&lt;=</code> (Less than or equal to)​</p></li>
</ul>
<h3 id="Example-1-Filtering-with-Equal-To-​" class="common-anchor-header">Example 1: Filtering with Equal To (<code translate="no">==</code>)​</h3><p>Assume you have a field named <code translate="no">status</code> and you want to find all entities where <code translate="no">status</code> is &quot;active&quot;. You can use the equality operator <code translate="no">==</code>:​</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;status == &quot;active&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Filtering-with-Not-Equal-To-​" class="common-anchor-header">Example 2: Filtering with Not Equal To (<code translate="no">!=</code>)​</h3><p>To find entities where <code translate="no">status</code> is not &quot;inactive&quot;:​</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;status != &quot;inactive&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Filtering-with-Greater-Than-​" class="common-anchor-header">Example 3: Filtering with Greater Than (<code translate="no">&gt;</code>)​</h3><p>If you want to find all entities with an <code translate="no">age</code> greater than 30:​</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;age &gt; 30&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-4-Filtering-with-Less-Than-​" class="common-anchor-header">Example 4: Filtering with Less Than (<code translate="no">&lt;</code>)​</h3><p>To find entities where <code translate="no">price</code> is less than 100:​</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price &lt; 100&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-5-Filtering-with-Greater-Than-or-Equal-To-​" class="common-anchor-header">Example 5: Filtering with Greater Than or Equal To (<code translate="no">&gt;=</code>)​</h3><p>If you want to find all entities with <code translate="no">rating</code> greater than or equal to 4:​</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;rating &gt;= 4&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-6-Filtering-with-Less-Than-or-Equal-To-​" class="common-anchor-header">Example 6: Filtering with Less Than or Equal To (<code translate="no">&lt;=</code>)​</h3><p>To find entities with <code translate="no">discount</code> less than or equal to 10%:​</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;discount &lt;= 10&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Range-operators​" class="common-anchor-header">Range operators​<button data-href="#Range-operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Range operators help filter data based on specific sets or ranges of values.​</p>
<h3 id="Supported-Range-Operators​" class="common-anchor-header">Supported Range Operators:​</h3><ul>
<li><p><code translate="no">IN</code>: Used to match values within a specific set or range.​</p></li>
<li><p><code translate="no">LIKE</code>: Used to match a pattern (mostly for text fields).​</p></li>
</ul>
<h3 id="Example-1-Using-IN-to-Match-Multiple-Values​" class="common-anchor-header">Example 1: Using <code translate="no">IN</code> to Match Multiple Values​</h3><p>If you want to find all entities where the <code translate="no">color</code> is either &quot;red&quot;, &quot;green&quot;, or &quot;blue&quot;:​</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>This is useful when you want to check for membership in a list of values.​</p>
<h3 id="Example-2-Using-LIKE-for-Pattern-Matching​" class="common-anchor-header">Example 2: Using <code translate="no">LIKE</code> for Pattern Matching​</h3><p>The <code translate="no">LIKE</code> operator is used for pattern matching in string fields. It can match substrings in different positions within the text: as a <strong>prefix</strong>, <strong>infix</strong>, or <strong>suffix</strong>. The <code translate="no">LIKE</code> operator uses the <code translate="no">%</code> symbol as a wildcard, which can match any number of characters (including zero).​</p>
<h4 id="Prefix-Match-Starts-With​" class="common-anchor-header">Prefix Match (Starts With)​</h4><p>To perform a <strong>prefix</strong> match, where the string starts with a given pattern, you can place the pattern at the beginning and use <code translate="no">%</code> to match any characters following it. For example, to find all products whose <code translate="no">name</code> starts with &quot;Prod&quot;:​</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;Prod%&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>This will match any product whose name starts with &quot;Prod&quot;, such as &quot;Product A&quot;, &quot;Product B&quot;, etc.​</p>
<h4 id="Suffix-Match-Ends-With​" class="common-anchor-header">Suffix Match (Ends With)​</h4><p>For a <strong>suffix</strong> match, where the string ends with a given pattern, place the <code translate="no">%</code> symbol at the beginning of the pattern. For example, to find all products whose <code translate="no">name</code> ends with &quot;XYZ&quot;:​</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;%XYZ&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>This will match any product whose name ends with &quot;XYZ&quot;, such as &quot;ProductXYZ&quot;, &quot;SampleXYZ&quot;, etc.​</p>
<h4 id="Infix-Match-Contains​" class="common-anchor-header">Infix Match (Contains)​</h4><p>To perform an <strong>infix</strong> match, where the pattern can appear anywhere in the string, you can place the <code translate="no">%</code> symbol at both the beginning and the end of the pattern. For example, to find all products whose <code translate="no">name</code> contains the word &quot;Pro&quot;:​</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;%Pro%&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>This will match any product whose name contains the substring &quot;Pro&quot;, such as &quot;Product&quot;, &quot;ProLine&quot;, or &quot;SuperPro&quot;.​</p>
<h2 id="Arithmetic-Operators​" class="common-anchor-header">Arithmetic Operators​<button data-href="#Arithmetic-Operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Arithmetic operators allow you to create conditions based on calculations involving numeric fields.​</p>
<h3 id="Supported-Arithmetic-Operators​" class="common-anchor-header">Supported Arithmetic Operators:​</h3><ul>
<li><p><code translate="no">+</code> (Addition)​</p></li>
<li><p><code translate="no">-</code> (Subtraction)​</p></li>
<li><p><code translate="no">*</code> (Multiplication)​</p></li>
<li><p><code translate="no">/</code> (Division)​</p></li>
<li><p><code translate="no">%</code> (Modulus)​</p></li>
<li><p><code translate="no">**</code> (Exponentiation)​</p></li>
</ul>
<h3 id="Example-1-Using-Addition-+​" class="common-anchor-header">Example 1: Using Addition (<code translate="no">+</code>)​</h3><p>To find entities where the <code translate="no">total</code> price is the sum of <code translate="no">base_price</code> and <code translate="no">tax</code>:​</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;total == base_price + tax&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-Subtraction--​" class="common-anchor-header">Example 2: Using Subtraction (<code translate="no">-</code>)​</h3><p>To find entities where <code translate="no">quantity</code> is greater than 50 and <code translate="no">quantity_sold</code> is less than 30:​</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;quantity - quantity_sold &gt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Using-Multiplication-​" class="common-anchor-header">Example 3: Using Multiplication (<code translate="no">*</code>)​</h3><p>To find entities where <code translate="no">price</code> is greater than 100 and <code translate="no">quantity</code> is greater than 10, multiplied:​</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price * quantity &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-4-Using-Division-​" class="common-anchor-header">Example 4: Using Division (<code translate="no">/</code>)​</h3><p>To find products where <code translate="no">total_price</code> divided by <code translate="no">quantity</code> is less than 50:​</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;total_price / quantity &lt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-5-Using-Modulus-​" class="common-anchor-header">Example 5: Using Modulus (<code translate="no">%</code>)​</h3><p>To find entities where the <code translate="no">id</code> is an even number (i.e., divisible by 2):​</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;id % 2 == 0&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-6-Using-Exponentiation-​" class="common-anchor-header">Example 6: Using Exponentiation (<code translate="no">**</code>)​</h3><p>To find entities where <code translate="no">price</code> raised to the power of 2 is greater than 1000:​</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price ** 2 &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Logical-Operators​" class="common-anchor-header">Logical Operators​<button data-href="#Logical-Operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Logical operators are used to combine multiple conditions into a more complex filter expression. These include <code translate="no">AND</code>, <code translate="no">OR</code>, and <code translate="no">NOT</code>.​</p>
<h3 id="Supported-Logical-Operators​" class="common-anchor-header">Supported Logical Operators:​</h3><ul>
<li><p><code translate="no">AND</code>: Combines multiple conditions that must all be true.​</p></li>
<li><p><code translate="no">OR</code>: Combines conditions where at least one must be true.​</p></li>
<li><p><code translate="no">NOT</code>: Negates a condition.​</p></li>
</ul>
<h3 id="Example-1-Using-AND-to-Combine-Conditions​" class="common-anchor-header">Example 1: Using <code translate="no">AND</code> to Combine Conditions​</h3><p>To find all products where <code translate="no">price</code> is greater than 100 and <code translate="no">stock</code> is greater than 50:​</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price &gt; 100 AND stock &gt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-OR-to-Combine-Conditions​" class="common-anchor-header">Example 2: Using <code translate="no">OR</code> to Combine Conditions​</h3><p>To find all products where <code translate="no">color</code> is either “red” or &quot;blue&quot;:​</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color == &quot;red&quot; OR color == &quot;blue&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Using-NOT-to-Exclude-a-Condition​" class="common-anchor-header">Example 3: Using <code translate="no">NOT</code> to Exclude a Condition​</h3><p>To find all products where <code translate="no">color</code> is not &quot;green&quot;:​</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;NOT color == &quot;green&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Tips-on-Using-Basic-Operators-with-JSON-and-ARRAY-Fields​" class="common-anchor-header">Tips on Using Basic Operators with JSON and ARRAY Fields​<button data-href="#Tips-on-Using-Basic-Operators-with-JSON-and-ARRAY-Fields​" class="anchor-icon" translate="no">
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
    </button></h2><p>While the basic operators in Milvus are versatile and can be applied to scalar fields, they can also be effectively used with the keys and indexes in the JSON and ARRAY fields.​</p>
<p>For example, if you have a <code translate="no">product</code> field that contains multiple keys like <code translate="no">price</code>, <code translate="no">model</code>, and <code translate="no">tags</code>, always reference the key directly:​</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;product[&quot;price&quot;] &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>To find records where the first temperature in an array of recorded temperatures exceeds a certain value, use:​</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;history_temperatures[0] &gt; 30&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Conclusion​" class="common-anchor-header">Conclusion​<button data-href="#Conclusion​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus offers a range of basic operators that give you flexibility in filtering and querying your data. By combining comparison, range, arithmetic, and logical operators, you can create powerful filter expressions to narrow down your search results and retrieve the data you need efficiently.​</p>
