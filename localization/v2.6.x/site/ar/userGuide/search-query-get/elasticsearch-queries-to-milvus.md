---
id: elasticsearch-queries-to-milvus.md
title: استعلامات Elasticsearch إلى ميلفوس
summary: >-
  يعد Elasticsearch، المبني على Apache Lucene، محرك بحث رائد مفتوح المصدر. ومع
  ذلك، فإنه يواجه تحديات في تطبيقات الذكاء الاصطناعي الحديثة، بما في ذلك ارتفاع
  تكاليف التحديث، وضعف الأداء في الوقت الحقيقي، وإدارة القطع غير الفعالة،
  والتصميم غير السحابي الأصلي، والمتطلبات المفرطة للموارد. وباعتبارها قاعدة
  بيانات متجهة سحابية أصلية، تتغلب Milvus على هذه المشكلات من خلال التخزين
  والحوسبة المنفصلين، والفهرسة الفعالة للبيانات عالية الأبعاد، والتكامل السلس مع
  البنى التحتية الحديثة. يوفر أداءً فائقًا وقابلية توسع فائقة لأعباء عمل الذكاء
  الاصطناعي.
---
<h1 id="Elasticsearch-Queries-to-Milvus" class="common-anchor-header">استعلامات Elasticsearch إلى ميلفوس<button data-href="#Elasticsearch-Queries-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>يعد Elasticsearch، المبني على Apache Lucene، محرك بحث رائد مفتوح المصدر. ومع ذلك، فإنه يواجه تحديات في تطبيقات الذكاء الاصطناعي الحديثة، بما في ذلك ارتفاع تكاليف التحديث، وضعف الأداء في الوقت الحقيقي، وإدارة القطع غير الفعالة، والتصميم غير السحابي الأصلي، والمتطلبات المفرطة للموارد. وباعتبارها قاعدة بيانات متجهة سحابية أصلية، تتغلب Milvus على هذه المشكلات من خلال التخزين والحوسبة المنفصلين، والفهرسة الفعالة للبيانات عالية الأبعاد، والتكامل السلس مع البنى التحتية الحديثة. يوفر أداءً فائقًا وقابلية توسع فائقة لأعباء عمل الذكاء الاصطناعي.</p>
<p>تهدف هذه المقالة إلى تسهيل عملية ترحيل قاعدة التعليمات البرمجية الخاصة بك من Elasticsearch إلى Milvus، مع تقديم أمثلة متنوعة لتحويل الاستعلامات بينهما.</p>
<h2 id="Overview" class="common-anchor-header">نظرة عامة<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>في Elasticsearch، تُنشئ العمليات في سياق الاستعلام درجات الملاءمة، بينما لا تُنشئ العمليات في سياق التصفية. وبالمثل، تنتج عمليات البحث في Milvus درجات تشابه، في حين أن الاستعلامات الشبيهة بالفلتر لا تنتج درجات تشابه. عند ترحيل قاعدة التعليمات البرمجية الخاصة بك من Elasticsearch إلى Milvus، فإن المبدأ الأساسي هو تحويل الحقول المستخدمة في سياق استعلام Elasticsearch إلى حقول متجهة لتمكين توليد درجات التشابه.</p>
<p>يوجز الجدول أدناه بعض أنماط استعلامات Elasticsearch ومكافئاتها المقابلة في Milvus.</p>
<table>
   <tr>
     <th><p>استعلامات Elasticsearch</p></th>
     <th><p>معادلات ميلفوس</p></th>
     <th><p>الملاحظات</p></th>
   </tr>
   <tr>
     <td colspan="3"><p><strong>استعلامات النص الكامل</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/elasticsearch-queries-to-milvus.md#Match-query">استعلام مطابقة</a></p></td>
     <td><p>بحث النص الكامل</p></td>
     <td><p>كلاهما يوفران مجموعات متشابهة من الإمكانيات.</p></td>
   </tr>
   <tr>
     <td colspan="3"><p><strong>استعلامات على مستوى المصطلح</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/elasticsearch-queries-to-milvus.md#IDs">المعرفات</a></p></td>
     <td><p><code translate="no">in</code> المشغل</p></td>
     <td rowspan="6"><p>كلاهما يوفران نفس مجموعة الإمكانيات أو مجموعة مماثلة من الإمكانيات عند استخدام استعلامات Elasticsearch هذه في سياق التصفية.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/elasticsearch-queries-to-milvus.md#Prefix-query">استعلام البادئة</a></p></td>
     <td><p><code translate="no">like</code> المشغّل</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/elasticsearch-queries-to-milvus.md#Range-query">استعلام النطاق</a></p></td>
     <td><p>مشغلات المقارنة مثل <code translate="no">&gt;</code> ، <code translate="no">&lt;</code> ، ، <code translate="no">&gt;=</code> ، و <code translate="no">&lt;=</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/elasticsearch-queries-to-milvus.md#Term-query">استعلام المدى</a></p></td>
     <td><p>عوامل المقارنة مثل <code translate="no">==</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/elasticsearch-queries-to-milvus.md#Terms-query">استعلام المصطلحات</a></p></td>
     <td><p><code translate="no">in</code> المشغل</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/elasticsearch-queries-to-milvus.md#Wildcard-query">استعلام أحرف البدل</a></p></td>
     <td><p><code translate="no">like</code> مشغّل</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/elasticsearch-queries-to-milvus.md#Boolean-query">الاستعلام المنطقي</a></p></td>
     <td><p>المشغلات المنطقية مثل <code translate="no">AND</code></p></td>
     <td><p>كلاهما يوفران مجموعات متشابهة من الإمكانيات عند استخدامهما في سياق التصفية.</p></td>
   </tr>
   <tr>
     <td colspan="3"><p><strong>الاستعلامات المتجهة</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/elasticsearch-queries-to-milvus.md#Knn-query">استعلام kNN</a></p></td>
     <td><p>بحث</p></td>
     <td><p>يوفر ميلفوس إمكانيات بحث متجهية أكثر تقدمًا.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ar/elasticsearch-queries-to-milvus.md#Reciprocal-rank-fusion">دمج الرتب المتبادلة</a></p></td>
     <td><p>البحث الهجين</p></td>
     <td><p>يدعم ميلفوس استراتيجيات متعددة لإعادة الترتيب.</p></td>
   </tr>
</table>
<h2 id="Full-text-queries" class="common-anchor-header">استعلامات النص الكامل<button data-href="#Full-text-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>في Elasticsearch، تمكّنك استعلامات النص الكامل من البحث في حقول نصية محللة مثل نص رسالة بريد إلكتروني. تتم معالجة سلسلة الاستعلام باستخدام نفس المحلل الذي تم تطبيقه على الحقل أثناء الفهرسة.</p>
<h3 id="Match-query" class="common-anchor-header">استعلام المطابقة</h3><p>في Elasticsearch، يقوم استعلام المطابقة بإرجاع المستندات التي تطابق نصًا أو رقمًا أو تاريخًا أو قيمة منطقية. يتم تحليل النص المُقدَّم قبل المطابقة.</p>
<p>فيما يلي مثال لطلب بحث في Elasticsearch مع استعلام مطابقة.</p>
<pre><code translate="no" class="language-bash">resp = client.search(
    query={
        <span class="hljs-string">&quot;match&quot;</span>: {
            <span class="hljs-string">&quot;message&quot;</span>: {
                <span class="hljs-string">&quot;query&quot;</span>: <span class="hljs-string">&quot;this is a test&quot;</span>
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>يوفر ميلفوس نفس الإمكانية من خلال ميزة البحث في النص الكامل. يمكنك تحويل استعلام Elasticsearch أعلاه إلى Milvus على النحو التالي:</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[<span class="hljs-string">&#x27;How is the weather in Jamaica?&#x27;</span>],
    anns_field=<span class="hljs-string">&quot;message_sparse&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;message&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>في المثال أعلاه، <code translate="no">message_sparse</code> هو حقل متجه متناثر مشتق من حقل VarChar اسمه <code translate="no">message</code>. يستخدم Milvus نموذج التضمين BM25 لتحويل القيم الموجودة في الحقل <code translate="no">message</code> إلى تضمينات متجهات متناثرة ويخزنها في الحقل <code translate="no">message_sparse</code>. عند تلقي طلب البحث، يقوم Milvus بتضمين حمولة الاستعلام النصية العادية باستخدام نفس نموذج BM25 ويقوم بإجراء بحث متجهي متناثر وإرجاع الحقلين <code translate="no">id</code> و <code translate="no">message</code> المحددين في المعلمة <code translate="no">output_fields</code> مع درجات التشابه المقابلة.</p>
<p>لاستخدام هذه الوظيفة، يجب تمكين المحلل على الحقل <code translate="no">message</code> وتحديد دالة لاشتقاق الحقل <code translate="no">message_sparse</code> منه. للحصول على إرشادات مفصلة حول تمكين المحلل وإنشاء الدالة المشتقة في ميلفوس، راجع <a href="/docs/ar/full-text-search.md">البحث في النص الكامل</a>.</p>
<h2 id="Term-level-queries" class="common-anchor-header">الاستعلامات على مستوى المصطلح<button data-href="#Term-level-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>في Elasticsearch، تُستخدم الاستعلامات على مستوى المصطلح للعثور على المستندات بناءً على القيم الدقيقة في البيانات المهيكلة، مثل نطاقات التواريخ أو عناوين IP أو الأسعار أو معرّفات المنتجات. يوضح هذا القسم المعادلات الممكنة لبعض استعلامات مستوى المصطلح في Elasticsearch في ميلفوس. تم تكييف جميع الأمثلة في هذا القسم لتعمل ضمن سياق التصفية لتتماشى مع إمكانيات ملفوس.</p>
<h3 id="IDs" class="common-anchor-header">المعرفات</h3><p>في Elasticsearch، يمكنك العثور على المستندات بناءً على معرّفاتها في سياق التصفية على النحو التالي:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;ids&quot;</span>: {
                    <span class="hljs-string">&quot;values&quot;</span>: [
                        <span class="hljs-string">&quot;1&quot;</span>,
                        <span class="hljs-string">&quot;4&quot;</span>,
                        <span class="hljs-string">&quot;100&quot;</span>
                    ]
                }            
            }
        }
    },
)
<button class="copy-code-btn"></button></code></pre>
<p>في ميلفوس، يمكنك أيضًا العثور على الكيانات بناءً على معرّفاتها على النحو التالي:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the filter parameter</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id in [1, 4, 100]&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>]
)

<span class="hljs-comment"># Use the ids parameter</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    ids=[<span class="hljs-number">1</span>, <span class="hljs-number">4</span>, <span class="hljs-number">100</span>],
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك العثور على مثال Elasticsearch في <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-ids-query.html">هذه الصفحة</a>. للحصول على تفاصيل حول طلبات الاستعلام والحصول على الطلبات بالإضافة إلى تعبيرات التصفية في Milvus، راجع <a href="/docs/ar/get-and-scalar-query.md">الاستعلام</a> <a href="/docs/ar/filtering">والتصفية</a>.</p>
<h3 id="Prefix-query" class="common-anchor-header">استعلام البادئة</h3><p>في Elasticsesearch، يمكنك العثور على المستندات التي تحتوي على بادئة محددة في حقل متوفر في سياق التصفية على النحو التالي:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                 <span class="hljs-string">&quot;prefix&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;ki&quot;</span>
                    }
                }           
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>في ميلفوس، يمكنك العثور على الكيانات التي تبدأ قيمها بالبادئة المحددة على النحو التالي:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;ki%&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك العثور على مثال Elasticsearch في <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-prefix-query.html">هذه الصفحة</a>. للحصول على تفاصيل حول مشغل <code translate="no">like</code> في ميلفوس، راجع <a href="/docs/ar/basic-operators.md#Example-2-Using-LIKE-for-Pattern-Matching">استخدام </a><code translate="no">LIKE</code><a href="/docs/ar/basic-operators.md#Example-2-Using-LIKE-for-Pattern-Matching"> لمطابقة الأنماط</a>.</p>
<h3 id="Range-query" class="common-anchor-header">استعلام النطاق</h3><p>في Elasticsearch، يمكنك العثور على المستندات التي تحتوي على مصطلحات ضمن نطاق محدد على النحو التالي:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;range&quot;</span>: {
                    <span class="hljs-string">&quot;age&quot;</span>: {
                        <span class="hljs-string">&quot;gte&quot;</span>: <span class="hljs-number">10</span>,
                        <span class="hljs-string">&quot;lte&quot;</span>: <span class="hljs-number">20</span>
                    }
                }           
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>في Milvus، يمكنك العثور على الكيانات التي تقع قيمها في حقل معين ضمن نطاق محدد على النحو التالي:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;10 &lt;= age &lt;= 20&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك العثور على مثال Elasticsearch في <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html">هذه الصفحة</a>. للحصول على تفاصيل حول عوامل المقارنة في ملفوس، راجع <a href="/docs/ar/basic-operators.md#Comparison-operators">عوامل المقارنة</a>.</p>
<h3 id="Term-query" class="common-anchor-header">استعلام المدى</h3><p>في Elasticsearch، يمكنك العثور على المستندات التي تحتوي على مصطلح <strong>محدد</strong> في حقل معين على النحو التالي:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;status&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;retired&quot;</span>
                    }
                }            
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>في ميلفوس، يمكنك العثور على الكيانات التي تكون قيمها في الحقل المحدد هي بالضبط المصطلح المحدد على النحو التالي:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># use ==</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;status==&quot;retired&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]
)

<span class="hljs-comment"># use TEXT_MATCH</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;TEXT_MATCH(status, &quot;retired&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك العثور على مثال Elasticsearch في <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html">هذه الصفحة</a>. للحصول على تفاصيل حول عوامل المقارنة في ميلفوس، راجع <a href="/docs/ar/basic-operators.md#Comparison-operators">عوامل المقارنة</a>.</p>
<h3 id="Terms-query" class="common-anchor-header">استعلام المصطلحات</h3><p>في Elasticsearch، يمكنك العثور على المستندات التي تحتوي على مصطلح واحد أو أكثر من المصطلحات <strong>الدقيقة</strong> في حقل محدد على النحو التالي:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;terms&quot;</span>: {
                    <span class="hljs-string">&quot;degree&quot;</span>: [
                        <span class="hljs-string">&quot;graduate&quot;</span>,
                        <span class="hljs-string">&quot;post-graduate&quot;</span>
                    ]
                }        
            }
        }
    }
)

<button class="copy-code-btn"></button></code></pre>
<p>ليس لدى ميلفوس مكافئ كامل لهذا. ومع ذلك، يمكنك العثور على الكيانات التي تكون قيمها في الحقل المحدد أحد المصطلحات المحددة على النحو التالي:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># use in</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;degree in [&quot;graduate&quot;, &quot;post-graduate&quot;]&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;degree&quot;</span>]
)

<span class="hljs-comment"># use TEXT_MATCH</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;TEXT_MATCH(degree, &quot;graduate post-graduate&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;degree&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك العثور على مثال Elasticsearch في <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-query.html">هذه الصفحة</a>. للحصول على تفاصيل حول مشغلي النطاق في ميلفوس، راجع <a href="/docs/ar/basic-operators.md#Range-operators">مشغلي النطاق</a>.</p>
<h3 id="Wildcard-query" class="common-anchor-header">استعلام أحرف البدل</h3><p>في Elasticsearch، يمكنك العثور على المستندات التي تحتوي على مصطلحات مطابقة لنمط حرف بدل على النحو التالي:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;wildcard&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;ki*y&quot;</span>
                    }
                }          
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>لا يدعم Milvus أحرف البدل في شروط التصفية الخاصة به. ومع ذلك، يمكنك استخدام المشغل <code translate="no">like</code> لتحقيق تأثير مماثل على النحو التالي:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;ki%&quot; AND user like &quot;%y&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك العثور على مثال Elasticsearch في <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-wildcard-query.html">هذه الصفحة</a>. للحصول على تفاصيل حول مشغلات النطاق في ميلفوس، راجع <a href="/docs/ar/basic-operators.md#Range-operators">مشغلات النطاق</a>.</p>
<h2 id="Boolean-query" class="common-anchor-header">الاستعلام المنطقي<button data-href="#Boolean-query" class="anchor-icon" translate="no">
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
    </button></h2><p>في Elasticsearch، الاستعلام المنطقي هو استعلام يطابق المستندات التي تطابق مجموعات منطقية من الاستعلامات الأخرى.</p>
<p>المثال التالي مقتبس من مثال في وثائق Elasticsearch في <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html">هذه الصفحة</a>. سيعيد الاستعلام المستخدمين الذين لديهم <code translate="no">kimchy</code> في أسمائهم مع علامة <code translate="no">production</code>.</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: <span class="hljs-string">&quot;kimchy&quot;</span>
                }
            },
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;tags&quot;</span>: <span class="hljs-string">&quot;production&quot;</span>
                }
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>في ميلفوس، يمكنك القيام بالأمر نفسه على النحو التالي:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = 

res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;%kimchy%&quot; AND ARRAY_CONTAINS(tags, &quot;production&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;tags&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>يفترض المثال أعلاه أن لديك حقل <code translate="no">user</code> من نوع <strong>VarChar</strong> وحقل <code translate="no">tags</code> من نوع <strong>Array،</strong> في المجموعة المستهدفة. سيعيد الاستعلام المستخدمين الذين لديهم <code translate="no">kimchy</code> في أسمائهم بعلامة <code translate="no">production</code>.</p>
<h2 id="Vector-queries" class="common-anchor-header">الاستعلامات المتجهة<button data-href="#Vector-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>في Elasticsearch، الاستعلامات المتجهة هي استعلامات متخصصة تعمل على الحقول المتجهة لإجراء بحث دلالي بكفاءة.</p>
<h3 id="Knn-query" class="common-anchor-header">استعلام كن</h3><p>يدعم Elasticsearch كلاً من استعلامات kNN التقريبية واستعلامات kNN الدقيقة والغاشمة. يمكنك العثور على أقرب متجهات <em>k</em> إلى متجه استعلام بأي من الطريقتين، كما تقاس بمقياس تشابه، على النحو التالي:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    index=<span class="hljs-string">&quot;my-image-index&quot;</span>,
    size=<span class="hljs-number">3</span>,
    query={
        <span class="hljs-string">&quot;knn&quot;</span>: {
            <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;image-vector&quot;</span>,
            <span class="hljs-string">&quot;query_vector&quot;</span>: [
                -<span class="hljs-number">5</span>,
                <span class="hljs-number">9</span>,
                -<span class="hljs-number">12</span>
            ],
            <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">10</span>
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>يستخدم ميلفوس، باعتباره قاعدة بيانات متجهات متخصصة، أنواع الفهارس لتحسين عمليات البحث عن المتجهات. وعادةً ما يعطي الأولوية للبحث عن أقرب جار تقريبي (ANN) لبيانات المتجهات عالية الأبعاد. على الرغم من أن البحث باستخدام القوة الغاشمة kNN باستخدام نوع الفهرس المسطح يوفر نتائج دقيقة، إلا أنه يستغرق وقتًا طويلاً ويستهلك الكثير من الموارد. في المقابل، يوازن البحث باستخدام ANN باستخدام AUTOINDEX أو أنواع الفهارس الأخرى بين السرعة والدقة، مما يوفر أداءً أسرع بكثير وأكثر كفاءة في استخدام الموارد من kNN.</p>
<p>هناك مكافئ مماثل للاستعلام المتجه أعلاه في Mlivus على هذا النحو:</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    anns_field=<span class="hljs-string">&quot;image-vector&quot;</span>
    data=[[-<span class="hljs-number">5</span>, <span class="hljs-number">9</span>, -<span class="hljs-number">12</span>]],
    limit=<span class="hljs-number">10</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك العثور على مثال Elasticsearch في <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-knn-query.html">هذه الصفحة</a>. للحصول على تفاصيل حول عمليات بحث الشبكة العصبية الاصطناعية في ميليفوس، اقرأ <a href="/docs/ar/single-vector-search.md">بحث الشبكة العصبية الاصطناعية الأساسي</a>.</p>
<h3 id="Reciprocal-Rank-Fusion" class="common-anchor-header">دمج الرتب المتبادلة</h3><p>يوفّر Elasticsearch خاصية دمج الرتب المتبادلة (RRF) لدمج مجموعات نتائج متعددة بمؤشرات صلة مختلفة في مجموعة نتائج واحدة مرتبة.</p>
<p>يوضح المثال التالي الجمع بين بحث تقليدي قائم على المصطلح مع بحث متجه على أساس k-أقرب الجيران (kNN) لتحسين ملاءمة البحث:</p>
<pre><code translate="no" class="language-python">client.search(
    index=<span class="hljs-string">&quot;my_index&quot;</span>,
    size=<span class="hljs-number">10</span>,
    query={
        <span class="hljs-string">&quot;retriever&quot;</span>: {
            <span class="hljs-string">&quot;rrf&quot;</span>: {
                <span class="hljs-string">&quot;retrievers&quot;</span>: [
                    {
                        <span class="hljs-string">&quot;standard&quot;</span>: {
                            <span class="hljs-string">&quot;query&quot;</span>: {
                                <span class="hljs-string">&quot;term&quot;</span>: {
                                    <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;shoes&quot;</span>
                                }
                            }
                        }
                    },
                    {
                        <span class="hljs-string">&quot;knn&quot;</span>: {
                            <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;vector&quot;</span>,
                            <span class="hljs-string">&quot;query_vector&quot;</span>: [<span class="hljs-number">1.25</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3.5</span>],  <span class="hljs-comment"># Example vector; replace with your actual query vector</span>
                            <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">50</span>,
                            <span class="hljs-string">&quot;num_candidates&quot;</span>: <span class="hljs-number">100</span>
                        }
                    }
                ],
                <span class="hljs-string">&quot;rank_window_size&quot;</span>: <span class="hljs-number">50</span>,
                <span class="hljs-string">&quot;rank_constant&quot;</span>: <span class="hljs-number">20</span>
            }
        }
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>في هذا المثال، يجمع RRF في هذا المثال بين نتائج من مسترجعين اثنين:</p>
<ul>
<li><p>بحث قياسي قائم على المصطلح عن المستندات التي تحتوي على المصطلح <code translate="no">&quot;shoes&quot;</code> في الحقل <code translate="no">text</code>.</p></li>
<li><p>بحث kNN على الحقل <code translate="no">vector</code> باستخدام متجه الاستعلام المقدم.</p></li>
</ul>
<p>يساهم كل مسترجع بما يصل إلى 50 من أفضل التطابقات، والتي يتم إعادة ترتيبها بواسطة RRF، ويتم إرجاع أفضل 10 نتائج نهائية.</p>
<p>في Milvus، يمكنك تحقيق بحث هجين مماثل من خلال الجمع بين عمليات البحث عبر حقول متجهات متعددة، وتطبيق استراتيجية إعادة الترتيب، واسترجاع أفضل النتائج من القائمة المدمجة. يدعم Milvus كلاً من استراتيجيات إعادة الترتيب الموزونة واستراتيجيات إعادة الترتيب الموزونة. لمزيد من التفاصيل، راجع <a href="/docs/ar/reranking.md">إعادة الترتيب</a>.</p>
<p>ما يلي هو معادلة غير صارمة لمثال Elasticsearch أعلاه في Milvus.</p>
<pre><code translate="no" class="language-python">search_params_dense = {
    <span class="hljs-string">&quot;data&quot;</span>: [[<span class="hljs-number">1.25</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3.5</span>]],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;vector&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}, 
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">100</span>
}

req_dense = ANNSearchRequest(**search_params_dense)

search_params_sparse = {
    <span class="hljs-string">&quot;data&quot;</span>: [<span class="hljs-string">&quot;shoes&quot;</span>],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;text_sparse&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>}
    }
}

req_sparse = ANNSearchRequest(**search_params_sparse)

res = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    reqs=[req_dense, req_sparse],
    reranker=RRFRanker(),
    limit=<span class="hljs-number">10</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>يوضح هذا المثال بحثًا هجينًا في ميلفوس يجمع بين:</p>
<ol>
<li><p><strong>بحث متجه كثيف</strong>: استخدام مقياس الضرب الداخلي (IP) مع ضبط <code translate="no">nprobe</code> على 10 للبحث التقريبي لأقرب جار (ANN) على الحقل <code translate="no">vector</code>.</p></li>
<li><p><strong>بحث متجه متناثر</strong>: استخدام مقياس التشابه BM25 مع معلمة <code translate="no">drop_ratio_search</code> تبلغ 0.2 على الحقل <code translate="no">text_sparse</code>.</p></li>
</ol>
<p>يتم تنفيذ النتائج من عمليات البحث هذه بشكل منفصل ودمجها وإعادة ترتيبها باستخدام مصنف دمج الرتب المتبادل (RRF). يُرجع البحث المختلط أفضل 10 كيانات من القائمة المعاد ترتيبها.</p>
<p>على عكس تصنيف RRRF الخاص بـ Elasticsearch، الذي يدمج النتائج من الاستعلامات القياسية المستندة إلى النص وعمليات البحث kNN، يجمع Milvus بين النتائج من عمليات البحث المتفرقة والكثيفة المتجهة، مما يوفر إمكانية بحث هجين فريدة من نوعها ومُحسّنة للبيانات متعددة الوسائط.</p>
<h2 id="Recap" class="common-anchor-header">الخلاصة<button data-href="#Recap" class="anchor-icon" translate="no">
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
    </button></h2><p>في هذه المقالة، قمنا بتغطية تحويل استعلامات Elasticsearch النموذجية إلى معادلاتها في Milvus، بما في ذلك الاستعلامات على مستوى المصطلح والاستعلامات المنطقية واستعلامات النص الكامل والاستعلامات المتجهة. إذا كانت لديك أسئلة أخرى حول تحويل استعلامات Elasticsearch الأخرى، فلا تتردد في التواصل معنا.</p>
