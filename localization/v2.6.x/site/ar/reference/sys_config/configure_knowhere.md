---
id: configure_knowhere.md
related_key: configure
group: system_configuration.md
summary: تعرّف على كيفية تهيئة موقع المعرفة في ميلفوس.
---
<h1 id="knowhere-related-Configurations" class="common-anchor-header">التكوينات المتعلقة بـ knowhere<button data-href="#knowhere-related-Configurations" class="anchor-icon" translate="no">
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
    </button></h1><p>أي تكوين متعلق بمحرك البحث المتجه في Knowledgehere</p>
<h2 id="knowhereenable" class="common-anchor-header"><code translate="no">knowhere.enable</code><button data-href="#knowhereenable" class="anchor-icon" translate="no">
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
    </button></h2><table id="knowhere.enable">
  <thead>
    <tr>
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        عند تمكين هذا التكوين، ستتم تعبئة معلمات الفهرس المحددة التالية تلقائياً كمعلمات فهرس، دون الحاجة إلى إدخال المستخدم.      </td>
      <td>صحيح</td>
    </tr>
  </tbody>
</table>
<h2 id="knowhereDISKANNbuildmaxdegree" class="common-anchor-header"><code translate="no">knowhere.DISKANN.build.max_degree</code><button data-href="#knowhereDISKANNbuildmaxdegree" class="anchor-icon" translate="no">
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
    </button></h2><table id="knowhere.DISKANN.build.max_degree">
  <thead>
    <tr>
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        الدرجة القصوى لرسم فامانا البياني      </td>
      <td>56</td>
    </tr>
  </tbody>
</table>
<h2 id="knowhereDISKANNbuildpqcodebudgetgbratio" class="common-anchor-header"><code translate="no">knowhere.DISKANN.build.pq_code_budget_gb_ratio</code><button data-href="#knowhereDISKANNbuildpqcodebudgetgbratio" class="anchor-icon" translate="no">
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
    </button></h2><table id="knowhere.DISKANN.build.pq_code_budget_gb_ratio">
  <thead>
    <tr>
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        الحد الأقصى لحجم رمز PQ (مقارنة بالبيانات الأولية)      </td>
      <td>0.125</td>
    </tr>
  </tbody>
</table>
<h2 id="knowhereDISKANNbuildsearchcachebudgetgbratio" class="common-anchor-header"><code translate="no">knowhere.DISKANN.build.search_cache_budget_gb_ratio</code><button data-href="#knowhereDISKANNbuildsearchcachebudgetgbratio" class="anchor-icon" translate="no">
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
    </button></h2><table id="knowhere.DISKANN.build.search_cache_budget_gb_ratio">
  <thead>
    <tr>
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        نسبة أرقام العقدة المخزنة مؤقتًا إلى البيانات الأولية      </td>
      <td>0.1</td>
    </tr>
  </tbody>
</table>
<h2 id="knowhereDISKANNbuildsearchlistsize" class="common-anchor-header"><code translate="no">knowhere.DISKANN.build.search_list_size</code><button data-href="#knowhereDISKANNbuildsearchlistsize" class="anchor-icon" translate="no">
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
    </button></h2><table id="knowhere.DISKANN.build.search_list_size">
  <thead>
    <tr>
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        حجم القائمة المرشحة أثناء بناء الرسم البياني      </td>
      <td>100</td>
    </tr>
  </tbody>
</table>
<h2 id="knowhereDISKANNsearchbeamwidthratio" class="common-anchor-header"><code translate="no">knowhere.DISKANN.search.beam_width_ratio</code><button data-href="#knowhereDISKANNsearchbeamwidthratio" class="anchor-icon" translate="no">
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
    </button></h2><table id="knowhere.DISKANN.search.beam_width_ratio">
  <thead>
    <tr>
      <th class="width80">الوصف</th>
      <th class="width20">القيمة الافتراضية</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        النسبة بين الحد الأقصى لعدد طلبات الإدخال/الإخراج لكل تكرار بحث ورقم وحدة المعالجة المركزية      </td>
      <td>4</td>
    </tr>
  </tbody>
</table>
