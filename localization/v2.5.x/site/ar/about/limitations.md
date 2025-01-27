---
id: limitations.md
title: حدود ميلفوس
related_key: Limitations
summary: تعرف على الحدود أثناء استخدام ميلفوس.
---
<h1 id="Milvus-Limits" class="common-anchor-header">حدود ميلفوس<button data-href="#Milvus-Limits" class="anchor-icon" translate="no">
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
    </button></h1><p>تلتزم شركة Milvus بتوفير أفضل قواعد بيانات المتجهات لتشغيل تطبيقات الذكاء الاصطناعي والبحث عن تشابه المتجهات. ومع ذلك، يعمل الفريق باستمرار لجلب المزيد من الميزات وأفضل الأدوات المساعدة لتحسين تجربة المستخدم. تسرد هذه الصفحة بعض القيود المعروفة التي قد يواجهها المستخدمون عند استخدام Milvus.</p>
<h2 id="Length-of-a-resource-name" class="common-anchor-header">طول اسم المورد<button data-href="#Length-of-a-resource-name" class="anchor-icon" translate="no">
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
<tr><th>المورد</th><th>الحد</th></tr>
</thead>
<tbody>
<tr><td>المجموعة</td><td>255 حرفاً</td></tr>
<tr><td>الحقل</td><td>255 حرفاً</td></tr>
<tr><td>الفهرس</td><td>255 حرفاً</td></tr>
<tr><td>التقسيم</td><td>255 حرفاً</td></tr>
</tbody>
</table>
<h2 id="Naming-rules" class="common-anchor-header">قواعد التسمية<button data-href="#Naming-rules" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكن أن يحتوي اسم المورد مثل اسم المجموعة أو اسم القسم أو اسم الفهرس على أرقام وحروف وشرطة سفلية (_). يجب أن يبدأ اسم المورد بحرف أو شرطة سفلية (_).</p>
<h2 id="Number-of-resources" class="common-anchor-header">عدد الموارد<button data-href="#Number-of-resources" class="anchor-icon" translate="no">
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
<tr><th>المورد</th><th>الحد</th></tr>
</thead>
<tbody>
<tr><td>المجموعة</td><td>65,536</td></tr>
<tr><td>الاتصال/الوكيل</td><td>65,536</td></tr>
</tbody>
</table>
<h2 id="Number-of-resources-in-a-collection" class="common-anchor-header">عدد الموارد في المجموعة<button data-href="#Number-of-resources-in-a-collection" class="anchor-icon" translate="no">
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
<tr><th>الموارد</th><th>الحد</th></tr>
</thead>
<tbody>
<tr><td>التقسيم</td><td>1,024</td></tr>
<tr><td>الجزء</td><td>16</td></tr>
<tr><td>الحقل</td><td>64</td></tr>
<tr><td>الفهرس</td><td>1</td></tr>
<tr><td>الكيان</td><td>غير محدود</td></tr>
</tbody>
</table>
<h2 id="Length-of-a-string" class="common-anchor-header">طول السلسلة<button data-href="#Length-of-a-string" class="anchor-icon" translate="no">
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
<tr><th>نوع البيانات</th><th>الحد</th></tr>
</thead>
<tbody>
<tr><td>VARCHAR</td><td>65,535</td></tr>
</tbody>
</table>
<h2 id="Dimensions-of-a-vector" class="common-anchor-header">أبعاد المتجه<button data-href="#Dimensions-of-a-vector" class="anchor-icon" translate="no">
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
<tr><th>الخاصية</th><th>الحد</th></tr>
</thead>
<tbody>
<tr><td>البُعد</td><td>32,768</td></tr>
</tbody>
</table>
<h2 id="Input-and-Output-per-RPC" class="common-anchor-header">المدخلات والمخرجات لكل RPC<button data-href="#Input-and-Output-per-RPC" class="anchor-icon" translate="no">
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
<tr><th>العملية</th><th>الحد</th></tr>
</thead>
<tbody>
<tr><td>الإدخال</td><td>64 ميغابايت</td></tr>
<tr><td>بحث</td><td>64 ميغابايت</td></tr>
<tr><td>استعلام</td><td>64 ميغابايت</td></tr>
</tbody>
</table>
<h2 id="Load-limits" class="common-anchor-header">حدود التحميل<button data-href="#Load-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>في الإصدار الحالي، يجب أن تكون البيانات المراد تحميلها أقل من 90% من إجمالي موارد الذاكرة لجميع عقد الاستعلام لحجز موارد الذاكرة لمحرك التنفيذ.</p>
<h2 id="Search-limits" class="common-anchor-header">حدود البحث<button data-href="#Search-limits" class="anchor-icon" translate="no">
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
<tr><th>المتجهات</th><th>الحد</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">topk</code> (عدد النتائج الأكثر تشابهاً للإرجاع)</td><td>16,384</td></tr>
<tr><td><code translate="no">nq</code> (عدد طلبات البحث)</td><td>16,384</td></tr>
</tbody>
</table>
<h2 id="Index-limits-on-different-search-types" class="common-anchor-header">حدود الفهرس على أنواع البحث المختلفة<button data-href="#Index-limits-on-different-search-types" class="anchor-icon" translate="no">
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
    </button></h2><p>يقدم الجدول التالي نظرة عامة على دعم سلوكيات البحث المختلفة عبر أنواع الفهارس المختلفة.</p>
<table>
<thead>
<tr><th></th><th>HNSW</th><th>القرص</th><th>مسطح</th><th>IVF_FLAT</th><th>IVF_SQ8</th><th>IVF_PQ</th><th>SCANN</th><th>GPU_IFV_FLAT</th><th>GPU_IVF_PQ</th><th>GPU_CAGRA</th><th>GPU_brute_brute_force</th><th>sparse_inverted_index</th><th>BIN_FLAT</th><th>BIN_IVF_FLAT</th></tr>
</thead>
<tbody>
<tr><td>بحث أساسي</td><td>نعم</td><td>نعم</td><td>نعم</td><td>نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم</td></tr>
<tr><td>بحث التقسيم</td><td>نعم</td><td>نعم</td><td>نعم</td><td>نعم</td><td>نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم</td></tr>
<tr><td>البحث الأساسي مع البيانات الأولية المسترجعة</td><td>نعم</td><td>نعم</td><td>نعم</td><td>نعم نعم</td><td>نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم</td></tr>
<tr><td>بحث أساسي مع ترقيم الصفحات</td><td>نعم</td><td>نعم نعم</td><td>نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم</td></tr>
<tr><td>بحث مصفى</td><td>نعم</td><td>نعم نعم</td><td>نعم نعم</td><td>نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم</td></tr>
<tr><td>البحث عن النطاق</td><td>نعم</td><td>نعم</td><td>نعم نعم</td><td>نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>لا</td><td>لا يوجد</td><td>لا يوجد</td><td>لا يوجد</td><td>لا</td><td>لا</td><td>لا</td><td>نعم</td></tr>
<tr><td>تجميع البحث في مجموعات</td><td>نعم</td><td>لا</td><td>نعم نعم</td><td>لا</td><td>لا يوجد</td><td>لا يوجد</td><td>لا يوجد</td><td>لا يوجد</td><td>لا يوجد</td><td>لا يوجد</td><td>لا يوجد</td><td>لا</td><td>لا يوجد</td><td>لا يوجد</td></tr>
<tr><td>البحث باستخدام أداة التكرار</td><td>نعم</td><td>نعم</td><td>لا يوجد</td><td>نعم</td><td>نعم</td><td>نعم نعم نعم</td><td>لا</td><td>لا يوجد</td><td>لا يوجد</td><td>لا يوجد</td><td>لا</td><td>لا</td><td>لا يوجد</td><td>لا يوجد</td></tr>
<tr><td>بحث هجين</td><td>نعم</td><td>نعم نعم</td><td>لا يوجد</td><td>نعم نعم</td><td>بحث هجين</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم</td><td>نعم (فقط RRFRanker)</td><td>نعم نعم</td><td>نعم</td></tr>
<tr><td>الاستعلام/الإحضار</td><td>نعم</td><td>نعم</td><td>نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم نعم نعم</td><td>نعم</td></tr>
<tr><td>استعلام مع مكرر</td><td>نعم</td><td>نعم</td><td>نعم نعم</td><td>نعم</td><td>نعم</td><td>نعم نعم نعم</td><td>لا</td><td>لا يوجد</td><td>لا يوجد</td><td>لا يوجد</td><td>لا</td><td>لا</td><td>لا</td><td>نعم</td></tr>
</tbody>
</table>
