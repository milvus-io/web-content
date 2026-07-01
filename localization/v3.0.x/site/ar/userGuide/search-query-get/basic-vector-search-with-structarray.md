---
id: basic-vector-search-with-structarray.md
title: البحث المتجهي الأساسي باستخدام StructArray
summary: >-
  استخدم هذه الصفحة لإجراء بحث متجهي في الحقول الفرعية المتجهة داخل حقل
  StructArray. يدعم StructArray وضعين أساسيين للبحث المتجهي: البحث في قائمة
  التضمين (EmbeddingList)، الذي يقوم بتقييم قائمة التضمين المخزنة في كل كيان،
  والبحث على مستوى العناصر، الذي يبحث في كل عنصر من عناصر Struct بشكل مستقل.
---
<h1 id="Basic-Vector-Search-with-StructArray" class="common-anchor-header">البحث المتجهي الأساسي باستخدام StructArray<button data-href="#Basic-Vector-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>استخدم هذه الصفحة لإجراء بحث متجهي على الحقول الفرعية المتجهة داخل حقل StructArray. يدعم StructArray وضعين أساسيين للبحث المتجهي: البحث في قائمة التضمين (EmbeddingList)، الذي يقوم بتقييم قائمة التضمين المخزنة في كل كيان، والبحث على مستوى العناصر، الذي يبحث في كل عنصر من عناصر Struct بشكل مستقل.</p>
<p>تستخدم هذه الصفحة مجموعة « <code translate="no">tech_articles</code> » من <a href="/docs/ar/create-structarray-field.md">«إنشاء حقل StructArray</a>». تحتوي المجموعة على حقل StructArray باسم « <code translate="no">chunks</code> ». يحتوي كل جزء على نص وبيانات وصفية قياسية وحقل فرعي متجه باسم « <code translate="no">emb_list_vector</code> » مع فهرس للبحث في قائمة التضمين، وحقل فرعي متجه باسم « <code translate="no">emb</code> » مع فهرس للبحث على مستوى العنصر.</p>
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
    </button></h2><p>تأكد من أن مخطط المجموعة والبيانات والفهارس جاهزة بالفعل.</p>
<table>
<thead>
<tr><th>المتطلبات</th><th>مكان الإعداد</th></tr>
</thead>
<tbody>
<tr><td>قم بإنشاء حقل StructArray، مثل <code translate="no">chunks</code>.</td><td><a href="/docs/ar/create-structarray-field.md">إنشاء حقل StructArray</a></td></tr>
<tr><td>أدخل الكيانات التي يحتوي حقل <code translate="no">chunks</code> الخاص بها على كائنات Struct.</td><td><a href="/docs/ar/insert-data-into-structarray-fields.md">إدراج البيانات في حقول StructArray</a></td></tr>
<tr><td>قم بإنشاء فهرس <code translate="no">MAX_SIM*</code> على <code translate="no">chunks[emb_list_vector]</code> من أجل البحث في EmbeddingList.</td><td><a href="/docs/ar/index-structarray-fields.md">فهرسة حقول StructArray</a></td></tr>
<tr><td>إنشاء فهرس متجهي قياسي على <code translate="no">chunks[emb]</code> للبحث على مستوى العناصر.</td><td><a href="/docs/ar/index-structarray-fields.md">فهرسة حقول StructArray</a></td></tr>
</tbody>
</table>
<div class="alert note">
<p>تحذير</p>
<p>لا يقبل الحقل المتجه أو الحقل الفرعي المتجه سوى فهرس واحد. إذا كنت بحاجة إلى كل من البحث في EmbeddingList والبحث على مستوى العناصر، فأنشئ حقلين فرعيين متجهين منفصلين. في هذه الصفحة، يتم فهرسة <code translate="no">chunks[emb_list_vector]</code> للبحث في EmbeddingList، ويتم فهرسة <code translate="no">chunks[emb]</code> للبحث على مستوى العناصر.</p>
</div>
<h2 id="Choose-a-search-mode" class="common-anchor-header">اختر وضع البحث<button data-href="#Choose-a-search-mode" class="anchor-icon" translate="no">
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
<tr><th>الجانب</th><th>البحث في EmbeddingList</th><th>البحث على مستوى العنصر</th></tr>
</thead>
<tbody>
<tr><td>الحقل الفرعي المستهدف</td><td><code translate="no">chunks[emb_list_vector]</code></td><td><code translate="no">chunks[emb]</code></td></tr>
<tr><td>بيانات الاستعلام</td><td>قائمة تضمين تحتوي على متجه واحد أو أكثر.</td><td>متجه عادي.</td></tr>
<tr><td>عائلة المقاييس</td><td><code translate="no">MAX_SIM*</code>، مثل <code translate="no">MAX_SIM_COSINE</code>.</td><td>مقاييس متجهات عادية، مثل <code translate="no">COSINE</code> أو <code translate="no">IP</code> أو <code translate="no">L2</code>.</td></tr>
<tr><td>ما يمثله كل نتيجة</td><td>كيان مطابق يكون حقل StructArray الفرعي الخاص به مشابهًا لقائمة تضمين الاستعلام.</td><td>عنصر Struct متطابق داخل حقل StructArray.</td></tr>
<tr><td>تفصيل النتائج</td><td>مستوى الكيان.</td><td>مستوى عنصر Struct.</td></tr>
<tr><td>الإزاحة</td><td>غير قابل للتطبيق.</td><td>يحدد الموضع الذي يبدأ من الصفر لعنصر Struct المطابق عند إرجاعه.</td></tr>
<tr><td>الاستخدام النموذجي</td><td>ColBERT و ColPali وأنماط الاسترجاع الأخرى ذات التفاعل المتأخر.</td><td>الاسترجاع على مستوى المقطع، أو مستوى الفقرة، أو مستوى المقتطف، أو مستوى الرقعة، أو مستوى الحقيقة.</td></tr>
</tbody>
</table>
<h2 id="Run-EmbeddingList-search" class="common-anchor-header">تشغيل بحث EmbeddingList<button data-href="#Run-EmbeddingList-search" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم بحث EmbeddingList عندما يحتوي الاستعلام نفسه على متجهات متعددة ويتم فهرسة الحقل الفرعي للمتجه StructArray المستهدف باستخدام مقياس " <code translate="no">MAX_SIM*</code> ". والنتيجة هي تطابق على مستوى الكيان.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">from</span> pymilvus.client.embedding_list <span class="hljs-keyword">import</span> EmbeddingList

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query = EmbeddingList()
query.add([<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>])
query.add([<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>])

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit[<span class="hljs-string">&quot;id&quot;</span>], hit[<span class="hljs-string">&quot;distance&quot;</span>], hit[<span class="hljs-string">&quot;entity&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<p>في وضع البحث هذا، يتحكم مقياس « <code translate="no">limit</code> » في عدد الكيانات التي يتم إرجاعها لكل استعلام. يمكن أن تتضمن النتيجة حقول فرعية لـ StructArray، لكن النتيجة نفسها تمثل الكيان الأصلي المطابق بدلاً من عنصر Struct واحد محدد.</p>
<div class="alert note">
<p>للحصول على شرح تفصيلي كامل على غرار ColBERT أو ColPali، راجع <a href="/docs/ar/search-with-embedding-lists.md">«البحث باستخدام قوائم التضمين</a>». تغطي هذه الصفحة فقط سلوك البحث الأساسي في StructArray.</p>
</div>
<h2 id="Run-element-level-search" class="common-anchor-header">تشغيل البحث على مستوى العناصر<button data-href="#Run-element-level-search" class="anchor-icon" translate="no">
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
    </button></h2><p>استخدم البحث على مستوى العناصر عندما يتعين أن يشارك كل عنصر من عناصر Struct في البحث المتجه بشكل مستقل. يكون الاستعلام متجهًا عاديًا، ويجب فهرسة الحقل الفرعي للمتجه الهدف باستخدام مقياس متجه عادي.</p>
<pre><code translate="no" class="language-python">query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">5</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[page]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(
            <span class="hljs-string">&quot;doc_id:&quot;</span>, hit[<span class="hljs-string">&quot;id&quot;</span>],
            <span class="hljs-string">&quot;distance:&quot;</span>, hit[<span class="hljs-string">&quot;distance&quot;</span>],
            <span class="hljs-string">&quot;offset:&quot;</span>, hit.get(<span class="hljs-string">&quot;offset&quot;</span>),
            <span class="hljs-string">&quot;entity:&quot;</span>, hit[<span class="hljs-string">&quot;entity&quot;</span>],
        )
<button class="copy-code-btn"></button></code></pre>
<p>في البحث على مستوى العناصر، تمثل كل نتيجة عنصر Struct مطابق. قيمة « <code translate="no">offset</code> » هي الموضع الذي يبدأ من الصفر لهذا العنصر في حقل StructArray. يمكن أن تظهر الكيان نفسه أكثر من مرة إذا تطابق أكثر من عنصر Struct واحد مع الاستعلام. تنطبق قيمة « <code translate="no">limit</code> » على نتائج العناصر، وليس على الكيانات الأصلية الفريدة.</p>
<h2 id="Interpret-results" class="common-anchor-header">تفسير النتائج<button data-href="#Interpret-results" class="anchor-icon" translate="no">
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
<tr><th>عنصر النتيجة</th><th>البحث في EmbeddingList</th><th>البحث على مستوى العناصر</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">id</code></td><td>المفتاح الأساسي للكيان المطابق.</td><td>المفتاح الأساسي للكيان الذي يحتوي على عنصر Struct المطابق.</td></tr>
<tr><td><code translate="no">distance</code> أو النتيجة</td><td>النتيجة أو المسافة بين قائمة التضمين الخاصة بالاستعلام وقائمة التضمين المخزنة.</td><td>النتيجة أو المسافة بين متجه الاستعلام ومتجه عنصر Struct المطابق.</td></tr>
<tr><td><code translate="no">offset</code></td><td>غير قابل للتطبيق.</td><td>الموضع الذي يبدأ من الصفر لعنصر Struct المطابق عند إرجاعه.</td></tr>
<tr><td>المفاتيح الأساسية المتكررة</td><td>غير متوقع في الاستعلام الفردي لأن النتائج تكون على مستوى الكيان.</td><td>ممكن، لأن عناصر Struct متعددة في نفس الكيان يمكن أن تتطابق.</td></tr>
<tr><td>حقول الإخراج المطلوبة لـ StructArray</td><td>يتم إرجاعها من الكيان المطابق.</td><td>يتم إرجاعها مع شكل النتائج على مستوى العنصر الذي تدعمه واجهة برمجة التطبيقات (API) ومجموعة أدوات تطوير البرامج (SDK) المستهدفة.</td></tr>
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
<li><p>استخدام <code translate="no">chunks.emb</code> بدلاً من صيغة مسار الحقل الفرعي المطلوبة <code translate="no">chunks[emb]</code>.</p></li>
<li><p>استخدام استعلام EmbeddingList على حقل فرعي متجه تم فهرسته باستخدام مقياس متجه عادي.</p></li>
<li><p>استخدام استعلام متجه عادي على حقل فرعي متجه مفهرس باستخدام مقياس <code translate="no">MAX_SIM*</code>.</p></li>
<li><p>توقع أن يعرض البحث على مستوى العنصر <code translate="no">limit</code> هذا العدد من الكيانات الأصلية الفريدة. فهو يعرض نتائج العناصر المطابقة.</p></li>
<li><p>توقع أن يعيد بحث EmbeddingList إزاحة عنصر واحد محدد. لكنه يعيد نتائج مطابقة على مستوى الكيان.</p></li>
<li><p>إعادة استخدام حقل فرعي متجه واحد لكلا وضعي البحث. استخدم حقول فرعية متجهة منفصلة لأن كل حقل فرعي متجه لا يقبل سوى فهرس واحد.</p></li>
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
<li><p>لتقييد البحث على مستوى العناصر بشروط قياسية، اقرأ <a href="/docs/ar/filtered-search-with-structarray.md">البحث المُصفى باستخدام StructArray</a>.</p></li>
<li><p>للبحث حسب حدود النتيجة أو المسافة، اقرأ " <a href="/docs/ar/range-search-with-structarray.md">البحث في النطاق باستخدام StructArray</a>".</p></li>
<li><p>لإرجاع نتيجة واحدة على الأكثر لكل كيان أب بعد البحث على مستوى العنصر، اقرأ " <a href="/docs/ar/grouping-search-with-structarray.md">البحث المجمّع باستخدام StructArray</a>".</p></li>
<li><p>لدمج البحث باستخدام StructArray مع عمليات بحث متجهة أخرى، اقرأ " <a href="/docs/ar/hybrid-search-with-structarray.md">البحث الهجين باستخدام StructArray</a>".</p></li>
<li><p>لمراجعة أنواع البيانات المدعومة والمقاييس والمرشحات والحدود الخاصة بكل إصدار، اقرأ <a href="/docs/ar/structarray-limits.md">«حدود StructArray</a>».</p></li>
</ol>
