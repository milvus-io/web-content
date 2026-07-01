---
id: insert-data-into-structarray-fields.md
title: إدراج البيانات في حقول StructArray
summary: >-
  أدخل البيانات في حقل StructArray عندما تحتوي كل كيان على قائمة مرتبة من
  العناصر المنظمة. في حمولة الإدراج، يُمثَّل حقل StructArray كمصفوفة من
  الكائنات. ويمثل كل كائن عنصرًا واحدًا من عناصر Struct ويستخدم أسماء الحقول
  الفرعية لـ Struct المُعرَّفة في مخطط المجموعة.
---
<h1 id="Insert-Data-into-StructArray-Fields" class="common-anchor-header">إدراج البيانات في حقول StructArray<button data-href="#Insert-Data-into-StructArray-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>أدخل البيانات في حقل StructArray عندما تحتوي كل كيان على قائمة مرتبة من العناصر المنظمة. في حمولة الإدخال، يُمثَّل حقل StructArray كمصفوفة من الكائنات. يمثل كل كائن عنصر Struct واحدًا ويستخدم أسماء الحقول الفرعية لـ Struct المُعرَّفة في مخطط المجموعة.</p>
<p>تستخدم هذه الصفحة مجموعة « <code translate="no">tech_articles</code> » من <a href="/docs/ar/create-structarray-field.md">«إنشاء حقل StructArray</a>». كل كيان هو مقال تقني، ويخزن حقل « <code translate="no">chunks</code> » أجزاء المقال كعناصر Struct.</p>
<h2 id="Before-you-begin" class="common-anchor-header">قبل البدء<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>تأكد من أن مخطط المجموعة يحتوي بالفعل على حقل StructArray المسمى « <code translate="no">chunks</code> ».</p>
<table>
<thead>
<tr><th>الحقل</th><th>النوع</th><th>إدراج القيمة</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">doc_id</code></td><td><code translate="no">INT64</code></td><td>معرف المقالة.</td></tr>
<tr><td><code translate="no">title</code></td><td><code translate="no">VARCHAR</code></td><td>عنوان المقالة.</td></tr>
<tr><td><code translate="no">category</code></td><td><code translate="no">VARCHAR</code></td><td>فئة المقالة.</td></tr>
<tr><td><code translate="no">title_vector</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>التضمين على مستوى المقالة.</td></tr>
<tr><td><code translate="no">chunks</code></td><td><code translate="no">ARRAY</code></td><td>قائمة بكائنات المقتطفات.</td></tr>
</tbody>
</table>
<p>يجب أن يتبع كل كائن في " <code translate="no">chunks</code> " مخطط Struct.</p>
<table>
<thead>
<tr><th>الحقل الفرعي</th><th>النوع</th><th>قيمة الإدراج</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">text</code></td><td><code translate="no">VARCHAR</code></td><td>نص المقطع.</td></tr>
<tr><td><code translate="no">section</code></td><td><code translate="no">VARCHAR</code></td><td>اسم القسم، مثل <code translate="no">index</code> أو <code translate="no">search</code> أو <code translate="no">filter</code>.</td></tr>
<tr><td><code translate="no">page</code></td><td><code translate="no">INT64</code></td><td>رقم الصفحة أو الموضع المنطقي.</td></tr>
<tr><td><code translate="no">quality_score</code></td><td><code translate="no">FLOAT</code></td><td>النتيجة على مستوى الجزء.</td></tr>
<tr><td><code translate="no">has_code</code></td><td><code translate="no">BOOL</code></td><td>ما إذا كانت المقطوعة تحتوي على كود أم لا.</td></tr>
<tr><td><code translate="no">emb_list_vector</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>المتجه المكتوب للبحث في EmbeddingList.</td></tr>
<tr><td><code translate="no">emb</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>المتجه المكتوب للبحث على مستوى العنصر.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>في حمولة الإدراج، يُعد « <code translate="no">chunks</code> » حقلًا عاديًا تكون قيمته عبارة عن مصفوفة من كائنات Struct. داخل كل كائن، استخدم أسماء الحقول الفرعية مثل « <code translate="no">text</code> » و« <code translate="no">emb</code> ». استخدم صيغة المسار، مثل « <code translate="no">chunks[text]</code> » أو « <code translate="no">chunks[emb]</code> »، فقط بعد الإدراج عند إنشاء الفهارس أو إجراء عمليات البحث أو إنشاء المرشحات أو تحديد حقول الإخراج.</p>
</div>
<h2 id="Understand-the-insert-payload-shape" class="common-anchor-header">فهم شكل حمولة الإدراج<button data-href="#Understand-the-insert-payload-shape" class="anchor-icon" translate="no">
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
    </button></h2><p>تعد قيمة « <code translate="no">chunks</code> » مصفوفة من عناصر Struct. كل عنصر هو كائن تكون مفاتيحه أسماء حقول فرعية.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;doc_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;title&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;StructArray indexing patterns&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;title_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.12</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.08</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.32</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.48</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;chunks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Create one index for each vector subfield.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;page&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.96</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb_list_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.10</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.40</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.10</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.40</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Use MAX_SIM metrics for EmbeddingList search.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;page&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.91</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb_list_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.16</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.24</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.35</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.45</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.16</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.24</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.35</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.45</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">emb_list_vector</code> و <code translate="no">emb</code> هما حقلان فرعيان متجهان منفصلان لأنهما يدعمان أوضاع بحث مختلفة. يعامل البحث في EmbeddingList جميع المتجهات في حقل StructArray كقائمة تضمين واحدة ويعرض نتائج على مستوى الكيان باستخدام مقاييس <code translate="no">MAX_SIM*</code>. أما البحث على مستوى العنصر فيبحث في كل عنصر Struct بشكل مستقل ويمكنه عرض إزاحة العنصر المطابق. يخزن هذا المثال نفس قيم المتجهات في كلا الحقلين للتبسيط. في تطبيق الإنتاج، يمكنك تخزين نفس التضمينات في كلا الحقلين الفرعيين عندما يستخدم كلا وضعي البحث نفس تضمين المقطع، أو تخزين تضمينات مختلفة عندما يستخدم وضعي البحث تمثيلات مختلفة.</p>
<h2 id="Insert-rows" class="common-anchor-header">إدراج الصفوف<button data-href="#Insert-rows" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم ` <code translate="no">client.insert()</code> ` لإدراج صفوف تحتوي على قيم StructArray.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

data = [
    {
        <span class="hljs-string">&quot;doc_id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;StructArray indexing patterns&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;index&quot;</span>,
        <span class="hljs-string">&quot;title_vector&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.08</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.48</span>],
        <span class="hljs-string">&quot;chunks&quot;</span>: [
            {
                <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Create one index for each vector subfield.&quot;</span>,
                <span class="hljs-string">&quot;section&quot;</span>: <span class="hljs-string">&quot;index&quot;</span>,
                <span class="hljs-string">&quot;page&quot;</span>: <span class="hljs-number">1</span>,
                <span class="hljs-string">&quot;quality_score&quot;</span>: <span class="hljs-number">0.96</span>,
                <span class="hljs-string">&quot;has_code&quot;</span>: <span class="hljs-literal">False</span>,
                <span class="hljs-string">&quot;emb_list_vector&quot;</span>: [<span class="hljs-number">0.10</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.40</span>],
                <span class="hljs-string">&quot;emb&quot;</span>: [<span class="hljs-number">0.10</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.40</span>],
            },
            {
                <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Use MAX_SIM metrics for EmbeddingList search.&quot;</span>,
                <span class="hljs-string">&quot;section&quot;</span>: <span class="hljs-string">&quot;index&quot;</span>,
                <span class="hljs-string">&quot;page&quot;</span>: <span class="hljs-number">2</span>,
                <span class="hljs-string">&quot;quality_score&quot;</span>: <span class="hljs-number">0.91</span>,
                <span class="hljs-string">&quot;has_code&quot;</span>: <span class="hljs-literal">True</span>,
                <span class="hljs-string">&quot;emb_list_vector&quot;</span>: [<span class="hljs-number">0.16</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.35</span>, <span class="hljs-number">0.45</span>],
                <span class="hljs-string">&quot;emb&quot;</span>: [<span class="hljs-number">0.16</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.35</span>, <span class="hljs-number">0.45</span>],
            },
        ],
    },
    {
        <span class="hljs-string">&quot;doc_id&quot;</span>: <span class="hljs-number">2</span>,
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Filtered StructArray search&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;filter&quot;</span>,
        <span class="hljs-string">&quot;title_vector&quot;</span>: [<span class="hljs-number">0.20</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.40</span>],
        <span class="hljs-string">&quot;chunks&quot;</span>: [
            {
                <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Use element_filter to match scalar conditions within the same Struct element.&quot;</span>,
                <span class="hljs-string">&quot;section&quot;</span>: <span class="hljs-string">&quot;filter&quot;</span>,
                <span class="hljs-string">&quot;page&quot;</span>: <span class="hljs-number">1</span>,
                <span class="hljs-string">&quot;quality_score&quot;</span>: <span class="hljs-number">0.93</span>,
                <span class="hljs-string">&quot;has_code&quot;</span>: <span class="hljs-literal">True</span>,
                <span class="hljs-string">&quot;emb_list_vector&quot;</span>: [<span class="hljs-number">0.21</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.33</span>, <span class="hljs-number">0.44</span>],
                <span class="hljs-string">&quot;emb&quot;</span>: [<span class="hljs-number">0.21</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.33</span>, <span class="hljs-number">0.44</span>],
            },
            {
                <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;MATCH_LEAST checks how many elements satisfy a predicate.&quot;</span>,
                <span class="hljs-string">&quot;section&quot;</span>: <span class="hljs-string">&quot;filter&quot;</span>,
                <span class="hljs-string">&quot;page&quot;</span>: <span class="hljs-number">2</span>,
                <span class="hljs-string">&quot;quality_score&quot;</span>: <span class="hljs-number">0.88</span>,
                <span class="hljs-string">&quot;has_code&quot;</span>: <span class="hljs-literal">False</span>,
                <span class="hljs-string">&quot;emb_list_vector&quot;</span>: [<span class="hljs-number">0.24</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.31</span>, <span class="hljs-number">0.39</span>],
                <span class="hljs-string">&quot;emb&quot;</span>: [<span class="hljs-number">0.24</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.31</span>, <span class="hljs-number">0.39</span>],
            },
        ],
    },
    {
        <span class="hljs-string">&quot;doc_id&quot;</span>: <span class="hljs-number">3</span>,
        <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Element-level search with offsets&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;search&quot;</span>,
        <span class="hljs-string">&quot;title_vector&quot;</span>: [<span class="hljs-number">0.33</span>, <span class="hljs-number">0.11</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.37</span>],
        <span class="hljs-string">&quot;chunks&quot;</span>: [
            {
                <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Element-level search can return the offset of the matched Struct element.&quot;</span>,
                <span class="hljs-string">&quot;section&quot;</span>: <span class="hljs-string">&quot;search&quot;</span>,
                <span class="hljs-string">&quot;page&quot;</span>: <span class="hljs-number">1</span>,
                <span class="hljs-string">&quot;quality_score&quot;</span>: <span class="hljs-number">0.95</span>,
                <span class="hljs-string">&quot;has_code&quot;</span>: <span class="hljs-literal">False</span>,
                <span class="hljs-string">&quot;emb_list_vector&quot;</span>: [<span class="hljs-number">0.32</span>, <span class="hljs-number">0.14</span>, <span class="hljs-number">0.28</span>, <span class="hljs-number">0.41</span>],
                <span class="hljs-string">&quot;emb&quot;</span>: [<span class="hljs-number">0.32</span>, <span class="hljs-number">0.14</span>, <span class="hljs-number">0.28</span>, <span class="hljs-number">0.41</span>],
            }
        ],
    },
]

result = client.insert(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=data,
)

<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-into-nullable-StructArray-fields" class="common-anchor-header">الإدراج في حقول StructArray القابلة للقيمة الفارغة<button data-href="#Insert-into-nullable-StructArray-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>إذا كان حقل ` <code translate="no">chunks</code> ` قابلاً للقيمة الفارغة، فيمكن للكيان تعيين حقل ` <code translate="no">chunks</code> ` بأكمله إلى القيمة الفارغة. في لغة Python، استخدم ` <code translate="no">None</code> ` لتمثيل القيمة الفارغة.</p>
<pre><code translate="no" class="language-python">client.insert(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[
        {
            <span class="hljs-string">&quot;doc_id&quot;</span>: <span class="hljs-number">10</span>,
            <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Article without chunks yet&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;draft&quot;</span>,
            <span class="hljs-string">&quot;title_vector&quot;</span>: [<span class="hljs-number">0.05</span>, <span class="hljs-number">0.10</span>, <span class="hljs-number">0.15</span>, <span class="hljs-number">0.20</span>],
            <span class="hljs-string">&quot;chunks&quot;</span>: <span class="hljs-literal">None</span>,
        }
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>عندما يحتوي حقل StructArray القابل للقيمة الفارغة على قيمة StructArray صالحة، يجب أن تكون جميع الحقول الفرعية في تلك القيمة إما فارغة أو ذات قيم صالحة. يؤدي إدراج كيان مع تعيين بعض الحقول الفرعية على القيمة الفارغة وتعيين أخرى على قيم صالحة إلى حدوث خطأ.</p>
<div class="alert note">
<p>تحذير
حقول StructArray القابلة للتعيين بقيمة null متاحة فقط في Milvus v3.0.x. إذا قمت بإضافة حقل StructArray ديناميكيًا إلى مجموعة موجودة، فيجب أن يكون الحقل المضاف قابلاً للتعيين بقيمة null، وتقوم الكيانات الموجودة بإرجاع قيمة " <code translate="no">null</code> " للحقل الجديد عبر جميع حقوله الفرعية.</p>
</div>
<h2 id="Validate-inserted-data" class="common-anchor-header">التحقق من صحة البيانات المُدرجة<button data-href="#Validate-inserted-data" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك الاستعلام عن المجموعة وإرجاع حقل StructArray أو الحقول الفرعية المحددة.</p>
<pre><code translate="no" class="language-python">rows = client.query(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;doc_id in [1, 2, 3]&quot;</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)

<span class="hljs-keyword">for</span> row <span class="hljs-keyword">in</span> rows:
    <span class="hljs-built_in">print</span>(row)
<button class="copy-code-btn"></button></code></pre>
<p>استخدم مسارات حقول StructArray، مثل <code translate="no">chunks[text]</code> ، فقط عند الاستعلام أو البحث أو التصفية أو إنشاء الفهارس. يجب أن تستمر حمولات الإدراج في استخدام الكائنات المتداخلة ضمن <code translate="no">chunks</code>.</p>
<h2 id="Insert-rules" class="common-anchor-header">قواعد الإدراج<button data-href="#Insert-rules" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>القاعدة</th><th>التفسير</th></tr>
</thead>
<tbody>
<tr><td>استخدم مصفوفة من الكائنات لحقل StructArray.</td><td>قيمة <code translate="no">chunks</code> هي قائمة، وكل عنصر في القائمة هو عنصر Struct.</td></tr>
<tr><td>استخدم أسماء الحقول الفرعية داخل كل عنصر من عناصر Struct.</td><td>أدخل " <code translate="no">{&quot;text&quot;: &quot;...&quot;, &quot;emb&quot;: [...]}</code> " داخل " <code translate="no">chunks</code>"، وليس " <code translate="no">{&quot;chunks[text]&quot;: &quot;...&quot;}</code>".</td></tr>
<tr><td>تأكد من مطابقة مخطط Struct.</td><td>يجب أن يستخدم كل عنصر Struct الحقول الفرعية المحددة في مخطط Struct.</td></tr>
<tr><td>تطابق أبعاد المتجه.</td><td>يجب أن تتطابق قيم المتجهات مع <code translate="no">dim</code> المُعدة لحقولها الفرعية المتجهة.</td></tr>
<tr><td>يجب مراعاة " <code translate="no">max_capacity</code>".</td><td>يجب ألا يتجاوز عدد عناصر Struct في كيان واحد القيم المحددة مسبقًا ( <code translate="no">max_capacity</code> ) لحقل StructArray.</td></tr>
<tr><td>استخدم حقول فرعية متجهة منفصلة لأوضاع البحث المنفصلة.</td><td>إذا كان كل من البحث في EmbeddingList والبحث على مستوى العنصر مطلوبين، فاكتب قيم المتجهات في كل من الحقول الفرعية للمتجهات.</td></tr>
<tr><td>استخدم <code translate="no">null</code> فقط عندما يكون الحقل قابلاً للقيمة الفارغة.</td><td>تتطلب حقول StructArray غير القابلة للقيمة الفارغة قيم StructArray صالحة.</td></tr>
</tbody>
</table>
<h2 id="Common-mistakes" class="common-anchor-header">الأخطاء الشائعة<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
<li><p>استخدام مسارات الحقول مثل <code translate="no">chunks[text]</code> في حمولات الإدراج.</p></li>
<li><p>إغفال الحقول الفرعية المطلوبة من عنصر Struct.</p></li>
<li><p>إدراج متجهات ذات أبعاد خاطئة.</p></li>
<li><p>إدراج عناصر Struct أكثر مما يسمح به <code translate="no">max_capacity</code>.</p></li>
<li><p>تعيين حقل فرعي واحد فقط إلى <code translate="no">null</code> بينما تكون الحقول الفرعية الأخرى في نفس قيمة StructArray صالحة.</p></li>
<li><p>كتابة المتجهات إلى <code translate="no">emb_list_vector</code> فقط ثم محاولة إجراء بحث على مستوى العناصر في <code translate="no">chunks[emb]</code>.</p></li>
<li><p>كتابة المتجهات إلى <code translate="no">emb</code> فقط ثم محاولة إجراء بحث EmbeddingList على <code translate="no">chunks[emb_list_vector]</code>.</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">الخطوات التالية<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>لإنشاء فهارس لـ <code translate="no">chunks[emb_list_vector]</code> و <code translate="no">chunks[emb]</code> والحقول الفرعية القياسية، اقرأ <a href="/docs/ar/index-structarray-fields.md">«فهرسة حقول StructArray</a>».</p></li>
<li><p>للبحث في الحقول الفرعية المتجهة لـ StructArray، اقرأ "البحث المتجه الأساسي باستخدام StructArray".</p></li>
<li><p>لمراجعة سلوك القيم القابلة للفراغ والقيود الخاصة بالإصدار، اقرأ " <a href="/docs/ar/structarray-limits.md">حدود StructArray</a>".</p></li>
</ol>
