---
id: array-of-structs.md
title: نظرة عامة على StructArray
summary: >-
  استخدم StructArray عندما تحتاج إحدى الكيانات إلى تخزين قائمة مرتبة من العناصر
  المنظمة، مثل مستند واحد يتألف من عدة أجزاء، أو صفحة واحدة تتألف من عدة رقع
  مرئية، أو مقطع فيديو واحد يتألف من عدة مقاطع. يحافظ StructArray على هذه
  العناصر داخل الكيان الأصلي، مع السماح في الوقت نفسه بالبحث المتجه والتصفية
  القياسية على الحقول الموجودة داخل كل عنصر.
---
<h1 id="StructArray-Overview" class="common-anchor-header">نظرة عامة على StructArray<button data-href="#StructArray-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>استخدم StructArray عندما تحتاج إحدى الكيانات إلى تخزين قائمة مرتبة من العناصر المنظمة، مثل مستند واحد يحتوي على العديد من الأجزاء، أو صفحة واحدة تحتوي على العديد من الرقع المرئية، أو مقطع فيديو واحد يحتوي على العديد من المقاطع. يحافظ StructArray على هذه العناصر داخل الكيان الأصلي مع السماح في الوقت نفسه بالبحث المتجه والتصفية القياسية على الحقول داخل كل عنصر.</p>
<h2 id="What-is-StructArray" class="common-anchor-header">ما هو StructArray؟<button data-href="#What-is-StructArray" class="anchor-icon" translate="no">
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
    </button></h2><p>يخزن <strong>StructArray،</strong> المعروف أيضًا باسم مصفوفة الهياكل ( <strong>array</strong> of structs)، مجموعة مرتبة من عناصر Struct في كل كيان. يتبع كل عنصر Struct في المصفوفة نفس المخطط. يمكن أن يحتوي عنصر Struct على حقول فرعية قياسية أو حقول فرعية متجهة أو كليهما.</p>
<p>على سبيل المثال، يمكن لمجموعة ما تخزين مقال واحد ككيان وتخزين أجزائه في حقل StructArray يُسمى <code translate="no">chunks</code>. يمكن أن يتضمن كل جزء نصًا، وبيانات وصفية للقسم، ودرجات الجودة، وتضمينًا متجهًا واحدًا أو أكثر.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;doc_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;title&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Vector search tuning guide&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;search&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;title_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.10</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.40</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;chunks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Use HNSW efSearch to trade recall for latency.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;page&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.92</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb_list_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.11</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.21</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.31</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.41</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.12</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.33</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.39</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Range search returns vectors within a distance boundary.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;search&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;page&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.86</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb_list_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.18</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.23</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.29</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.36</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.19</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.24</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.37</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>يمثل الحقلان الفرعيان المتجهان في هذا المثال نفس المقطع من منظورين للبحث. يُقصد بـ « <code translate="no">chunks[emb_list_vector]</code> » البحث في قائمة التضمينات (EmbeddingList) باستخدام مقاييس « <code translate="no">MAX_SIM*</code> »، بينما يُقصد بـ « <code translate="no">chunks[emb]</code> » البحث على مستوى العناصر باستخدام مقاييس متجهة عادية مثل « <code translate="no">COSINE</code> » أو « <code translate="no">IP</code> » أو « <code translate="no">L2</code> ».</p>
</div>
<h2 id="When-to-use-StructArray" class="common-anchor-header">متى تستخدم StructArray<button data-href="#When-to-use-StructArray" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم StructArray عندما تكون الوحدة الطبيعية التي تريد إرجاعها أكبر من الوحدة الطبيعية التي تريد البحث عنها أو تصفيتها.</p>
<table>
<thead>
<tr><th>حالة الاستخدام</th><th>لماذا يساعد StructArray</th><th>حقل StructArray نموذجي</th></tr>
</thead>
<tbody>
<tr><td>استرجاع المستندات</td><td>قم بتخزين مستند واحد ككيان أثناء البحث عبر أجزائه.</td><td><code translate="no">chunks</code></td></tr>
<tr><td>الاسترجاع بالتفاعل المتأخر</td><td>تخزين مستند أو صفحة كقائمة تضمين وتقييمها باستخدام <code translate="no">MAX_SIM*</code>.</td><td><code translate="no">chunks[emb_list_vector]</code> أو <code translate="no">patches[emb]</code></td></tr>
<tr><td>الاسترجاع على مستوى العناصر</td><td>إرجاع الجزء أو المقطع أو الرقعة أو الملاحظة الأكثر صلة، بما في ذلك إزاحة المصفوفة الخاصة بها.</td><td><code translate="no">chunks[emb]</code></td></tr>
<tr><td>التصفية المنظمة</td><td>قم بالتصفية حسب الحقول الفرعية القياسية داخل عناصر Struct، مثل القسم أو التقييم أو الصفحة أو العلامات.</td><td><code translate="no">chunks[section]</code>، <code translate="no">chunks[quality_score]</code></td></tr>
<tr><td>تقليل النتائج المكررة للكيانات الأصلية</td><td>الاحتفاظ بالعناصر الفرعية تحت نفس الكيان الأصلي بدلاً من تخزين كل عنصر فرعي كصف منفصل.</td><td><code translate="no">chunks</code>، <code translate="no">clips</code> ، <code translate="no">patches</code></td></tr>
</tbody>
</table>
<h2 id="Decision-Matrix" class="common-anchor-header">مصفوفة القرار<button data-href="#Decision-Matrix" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم المصفوفة التالية لاختيار مسار StructArray المناسب.</p>
<table>
<thead>
<tr><th>الهدف</th><th>المسار الموصى به</th><th>دقة النتيجة</th><th>ابدأ من هنا</th></tr>
</thead>
<tbody>
<tr><td>نمذجة كائن أب واحد مع العديد من الكائنات الفرعية المنظمة.</td><td>قم بإنشاء حقل StructArray.</td><td>يحتوي الكيان على عناصر Struct مرتبة.</td><td><a href="/docs/ar/create-structarray-field.md">إنشاء حقل StructArray</a></td></tr>
<tr><td>أدخل سجلات الأصل مع بيانات التابعين المتداخلة.</td><td>إدراج كيانات يكون حقل StructArray الخاص بها عبارة عن قائمة من كائنات Struct.</td><td>الإدراج على مستوى الكيان.</td><td><a href="/docs/ar/insert-data-into-structarray-fields.md">إدراج البيانات في حقول StructArray</a></td></tr>
<tr><td>تشغيل ColBERT أو ColPali أو استرجاع التفاعل المتأخر على مستوى المستند.</td><td>استخدام بحث EmbeddingList مع فهرس <code translate="no">MAX_SIM*</code>.</td><td>على مستوى الكيان.</td><td><a href="/docs/ar/search-with-embedding-lists.md">البحث باستخدام قوائم التضمين</a></td></tr>
<tr><td>ابحث في المقاطع الفردية أو المقاطع المصغرة أو الأجزاء.</td><td>استخدم البحث على مستوى العناصر باستخدام مقياس متجه عادي.</td><td>مستوى عنصر Struct، مع الإزاحة عند توفرها.</td><td><a href="/docs/ar/basic-vector-search-with-structarray.md">البحث المتجهي الأساسي باستخدام StructArray</a></td></tr>
<tr><td>قصر البحث المتجهي على مستوى العنصر على العناصر التي تتطابق مع الشروط القياسية.</td><td>استخدم <code translate="no">element_filter</code>.</td><td>التصفية على مستوى العناصر؛ يعتمد شكل النتيجة على نوع البحث.</td><td><a href="/docs/ar/filtered-search-with-structarray.md">البحث المُصفى باستخدام StructArray</a></td></tr>
<tr><td>تحديد الكيانات بناءً على عدد عناصر Struct التي تستوفي شرطًا ما.</td><td>استخدم <code translate="no">MATCH_ANY</code> أو <code translate="no">MATCH_ALL</code> أو <code translate="no">MATCH_LEAST</code> أو <code translate="no">MATCH_MOST</code> أو <code translate="no">MATCH_EXACT</code>.</td><td>مستوى الكيان.</td><td><a href="/docs/ar/struct-array-operators.md">عمليات StructArray</a></td></tr>
<tr><td>استخدم حدود النتيجة أو المسافة في الحقول الفرعية للمتجه StructArray.</td><td>استخدم البحث عن النطاق على مستوى العنصر.</td><td>مستوى عنصر Struct.</td><td><a href="/docs/ar/range-search-with-structarray.md">البحث عن النطاق باستخدام StructArray</a></td></tr>
<tr><td>إرجاع نتيجة واحدة كحد أقصى لكل كيان أب بعد البحث على مستوى العنصر.</td><td>استخدم البحث المجمّع حسب المفتاح الأساسي.</td><td>مستوى الكيان بعد التجميع.</td><td><a href="/docs/ar/grouping-search-with-structarray.md">البحث المجمّع باستخدام StructArray</a></td></tr>
<tr><td>دمج البحث عن عناصر StructArray مع حقل متجه آخر.</td><td>استخدم البحث الهجين باستخدام طلب AnnSearchRequest واحد يستهدف حقل فرعي متجه لـ StructArray.</td><td>بحث فرعي على مستوى العنصر، وإعادة ترتيب على مستوى الكيان.</td><td><a href="/docs/ar/hybrid-search-with-structarray.md">البحث الهجين باستخدام StructArray</a></td></tr>
</tbody>
</table>
<h2 id="Understand-the-two-search-models" class="common-anchor-header">فهم نموذجي البحث<button data-href="#Understand-the-two-search-models" class="anchor-icon" translate="no">
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
    <tr>
      <th scope="col"><h3>البحث في EmbeddingList</h3></th>
      <th scope="col"><h3>البحث على مستوى العناصر</h3></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <p>يعامل البحث باستخدام EmbeddingList المتجهات الموجودة داخل حقل فرعي من متجهات StructArray كقائمة تضمين واحدة للكيان الأصلي. ويكون الاستعلام أيضًا قائمة تضمين. يقارن Milvus قائمة تضمين الاستعلام بقائمة التضمين المخزنة باستخدام مقياس <code translate="no">MAX_SIM*</code> ، ثم يعرض الكيانات المطابقة.</p>
        <ul>
          <li>بيانات الاستعلام: قائمة التضمين.</li>
          <li>مجموعة المقاييس: <code translate="no">MAX_SIM*</code>.</li>
          <li>درجة تفصيل النتائج: مستوى الكيان.</li>
          <li>الأفضل لـ: استرجاع التفاعل المتأخر على مستوى المستند أو الصفحة.</li>
        </ul>
      </td>
      <td>
        <p>يعامل البحث على مستوى العنصر كل عنصر من عناصر Struct كمرشح مستقل للبحث المتجهي. يمثل كل نتيجة مطابقة عنصرًا متطابقًا داخل حقل StructArray، ويمكن أن تكشف النتائج غير المجمعة عن إزاحة العنصر.</p>
        <ul>
          <li>بيانات الاستعلام: متجه عادي.</li>
          <li>مجموعة المقاييس: مقاييس المتجهات العادية.</li>
          <li>تفصيل النتائج: مستوى عنصر Struct.</li>
          <li>الأفضل لـ: الاسترجاع على مستوى المقطع أو المقطع القصير أو الرقعة.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
<div class="alert note">
<p>تحذير</p>
<p>إذا كانت مجموعتك تحتاج إلى كل من البحث في EmbeddingList والبحث على مستوى العنصر، فاستخدم حقلين فرعيين متجهين منفصلين. لا يقبل الحقل المتجه أو الحقل الفرعي المتجه سوى فهرس واحد، ويتطلب وضعا البحث عائلات مقاييس مختلفة.</p>
</div>
<h2 id="Documentation-map" class="common-anchor-header">خريطة الوثائق<button data-href="#Documentation-map" class="anchor-icon" translate="no">
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
    </button></h2><p>تنقسم وثائق StructArray إلى صفحات النمذجة وصفحات البحث. استخدم صفحات النمذجة لتعريف البيانات وإعدادها. استخدم صفحات البحث لاختيار سلوك الاسترجاع والتصفية المناسب.</p>
<table>
<thead>
<tr><th>المنطقة</th><th>الصفحة</th><th>استخدمها من أجل</th></tr>
</thead>
<tbody>
<tr><td>النمذجة</td><td><a href="/docs/ar/create-structarray-field.md">إنشاء حقل StructArray</a></td><td>تحديد مخطط Struct وإضافة حقل StructArray.</td></tr>
<tr><td>النمذجة</td><td><a href="/docs/ar/insert-data-into-structarray-fields.md">إدراج البيانات في حقول StructArray</a></td><td>قم بإعداد وإدراج بيانات StructArray المتداخلة.</td></tr>
<tr><td>النمذجة</td><td><a href="/docs/ar/index-structarray-fields.md">فهرسة حقول StructArray</a></td><td>إنشاء فهارس متجهة وعددية على الحقول الفرعية لـ StructArray.</td></tr>
<tr><td>المرجع</td><td><a href="/docs/ar/structarray-limits.md">حدود StructArray</a></td><td>تحقق من حدود المخطط ونوع البيانات والفهرس والبحث والتصفية والإصدار.</td></tr>
<tr><td>البحث</td><td><a href="/docs/ar/basic-vector-search-with-structarray.md">البحث المتجهي الأساسي باستخدام StructArray</a></td><td>قارن بين البحث في EmbeddingList والبحث المتجه على مستوى العناصر.</td></tr>
<tr><td>البحث</td><td><a href="/docs/ar/range-search-with-structarray.md">البحث في النطاق باستخدام StructArray</a></td><td>استخدم قيود النطاق مع الحقول الفرعية للمتجهات في StructArray.</td></tr>
<tr><td>البحث</td><td><a href="/docs/ar/grouping-search-with-structarray.md">البحث المجمّع باستخدام StructArray</a></td><td>تجميع نتائج البحث على مستوى العناصر حسب المفتاح الأساسي.</td></tr>
<tr><td>البحث</td><td><a href="/docs/ar/hybrid-search-with-structarray.md">البحث المختلط باستخدام StructArray</a></td><td>دمج البحث على مستوى العناصر باستخدام StructArray مع عمليات البحث المتجهة الأخرى.</td></tr>
<tr><td>البحث</td><td><a href="/docs/ar/filtered-search-with-structarray.md">البحث المُصفى باستخدام StructArray</a></td><td>استخدم عوامل تصفية StructArray في البحث والاستعلام والبحث الهجين.</td></tr>
<tr><td>البحث</td><td><a href="/docs/ar/search-with-embedding-lists.md">البحث باستخدام قوائم التضمين</a></td><td>قم ببناء أنظمة استرجاع على غرار ColBERT وColPali باستخدام StructArray.</td></tr>
<tr><td>التصفية</td><td><a href="/docs/ar/struct-array-operators.md">مشغلات StructArray</a></td><td>بناء جملة مرجعية لمشغلات <code translate="no">element_filter</code> و <code translate="no">MATCH_*</code>.</td></tr>
</tbody>
</table>
<h2 id="Key-limits-to-check-first" class="common-anchor-header">القيود الرئيسية التي يجب التحقق منها أولاً<button data-href="#Key-limits-to-check-first" class="anchor-icon" translate="no">
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
<li><p>يمكن استخدام Struct كنوع عنصر لحقل Array. ولا يُستخدم كحقل تجميع من المستوى الأعلى.</p></li>
<li><p>تشترك جميع عناصر Struct في حقل StructArray نفسه في مخطط واحد محدد مسبقًا.</p></li>
<li><p>تتطلب الحقول الفرعية من نوع Vector وجود فهارس. يستخدم البحث في EmbeddingList مقاييس <code translate="no">MAX_SIM*</code> ، بينما يستخدم البحث على مستوى العناصر مقاييس Vector العادية.</p></li>
<li><p><code translate="no">element_filter</code> وتستخدم <code translate="no">MATCH_*</code> للحقول الفرعية القياسية داخل حقول StructArray. استخدم <code translate="no">$[subfield]</code> فقط داخل هذه العوامل.</p></li>
<li><p>بعض تركيبات البحث مقيدة بالإصدار أو خاصة بوضع معين. تحقق من <a href="/docs/ar/structarray-limits.md">حدود StructArray</a> قبل الاعتماد على البحث في النطاق، أو البحث بالتجميع، أو البحث الهجين، أو الحقول القابلة للقيمة الفارغة، أو الحقول المضافة ديناميكيًا.</p></li>
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
<li><p>لتصميم مخطط، اقرأ <a href="/docs/ar/create-structarray-field.md">إنشاء حقل StructArray</a>.</p></li>
<li><p>لتحضير البيانات، اقرأ " <a href="/docs/ar/insert-data-into-structarray-fields.md">إدراج البيانات في حقول StructArray</a>".</p></li>
<li><p>لاختيار الفهارس، اقرأ <a href="/docs/ar/index-structarray-fields.md">«فهرسة حقول StructArray</a>».</p></li>
<li><p>للبحث في الحقول الفرعية المتجهة لـ StructArray، ابدأ بـ " <a href="/docs/ar/basic-vector-search-with-structarray.md">البحث المتجه الأساسي باستخدام StructArray</a>".</p></li>
<li><p>لتصفية الحقول الفرعية القياسية في StructArray، اقرأ " <a href="/docs/ar/struct-array-operators.md">عوامل StructArray</a> " و" <a href="/docs/ar/filtered-search-with-structarray.md">البحث المُصفى باستخدام StructArray</a>".</p></li>
</ol>
