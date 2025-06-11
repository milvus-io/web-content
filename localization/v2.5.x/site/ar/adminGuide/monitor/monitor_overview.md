---
id: monitor_overview.md
title: نظرة عامة على الشاشة
related_key: "monitor, alert"
summary: >-
  تعرّف على كيفية استخدام Prometheus وGrafana في Milvus لمراقبة خدمات المراقبة
  والتنبيه.
---

<h1 id="Milvus-monitoring-framework-overview" class="common-anchor-header">نظرة عامة على إطار عمل مراقبة ميلفوس<button data-href="#Milvus-monitoring-framework-overview" class="anchor-icon" translate="no">
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
    </button></h1><p>يشرح هذا الموضوع كيفية استخدام Milvus لبرنامج Prometheus لمراقبة المقاييس و Grafana لتصور المقاييس وإنشاء التنبيهات.</p>
<h2 id="Prometheus-in-Milvus" class="common-anchor-header">بروميثيوس في ميلفوس<button data-href="#Prometheus-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://prometheus.io/docs/introduction/overview/">Prometheus</a> هي مجموعة أدوات مراقبة وتنبيهات مفتوحة المصدر لتطبيقات Kubernetes. يجمع المقاييس ويخزنها كبيانات متسلسلة زمنيًا. وهذا يعني أن المقاييس يتم تخزينها مع الطوابع الزمنية عند تسجيلها، إلى جانب أزواج اختيارية من القيمة الرئيسية تسمى التسميات.</p>
<p>يستخدم ميلفوس حاليًا المكونات التالية من بروميثيوس:</p>
<ul>
<li>نقطة نهاية بروميثيوس لسحب البيانات من نقاط النهاية التي حددها المصدرون.</li>
<li>مشغل بروميثيوس لإدارة مثيلات مراقبة بروميثيوس بفعالية.</li>
<li>Kube-prometheus لتوفير مراقبة مجموعة Kubernetes من طرف إلى طرف سهلة التشغيل.</li>
</ul>
<h3 id="Metric-names" class="common-anchor-header">أسماء المقاييس</h3><p>يحتوي الاسم المتري الصالح في Prometheus على ثلاثة عناصر: مساحة الاسم، والنظام الفرعي، والاسم. ترتبط هذه العناصر الثلاثة بحرف &quot;_&quot;.</p>
<p>مساحة اسم مقاييس Milvus التي يراقبها Prometheus هي &quot;milvus&quot;. واعتمادًا على الدور الذي ينتمي إليه المقياس، يجب أن يكون النظام الفرعي الخاص به أحد الأدوار الثمانية التالية: &quot;جذر&quot;، &quot;وكيل&quot;، &quot;وكيل&quot;، &quot;استعلام&quot;، &quot;كويرينود&quot;، &quot;فهرس&quot;، &quot;فهرس&quot;، &quot;فهرس عقدة&quot;، &quot;داتاكورد&quot;، &quot;داتا كورد&quot;، &quot;داتانود&quot;.</p>
<p>على سبيل المثال، مقياس ميلفوس الذي يحسب إجمالي عدد المتجهات التي تم الاستعلام عنها يسمى <code translate="no">milvus_proxy_search_vectors_count</code>.</p>
<h3 id="Metric-types" class="common-anchor-header">أنواع المقاييس</h3><p>يدعم بروميثيوس أربعة أنواع من المقاييس:</p>
<ul>
<li>العداد: نوع من المقاييس التراكمية التي لا يمكن زيادة قيمتها أو إعادة تعيينها إلى الصفر إلا عند إعادة التشغيل.</li>
<li>المقياس: نوع من المقاييس التي يمكن أن ترتفع قيمتها أو تنخفض.</li>
<li>المدرج التكراري: نوع من المقاييس التي يتم حسابها بناءً على دلاء قابلة للتكوين. مثال شائع هو مدة الطلب.</li>
<li>الملخص: نوع من المقاييس المشابهة للمدرج التكراري الذي يحسب الكميات القابلة للتكوين على مدى نافذة زمنية منزلقة.</li>
</ul>
<h3 id="Metric-labels" class="common-anchor-header">التسميات المترية</h3><p>يميز Prometheus بين العينات التي تحمل نفس الاسم القياسي من خلال تسميتها. التسمية هي سمة معينة للمقياس. يجب أن يكون للمقاييس التي تحمل نفس الاسم نفس القيمة للحقل <code translate="no">variable_labels</code>. يسرد الجدول التالي أسماء ومعاني التسميات الشائعة لمقاييس ميلفوس.</p>
<table>
<thead>
<tr><th>اسم التسمية</th><th>التعريف</th><th>القيم</th></tr>
</thead>
<tbody>
<tr><td>"node_id"</td><td>الهوية الفريدة للدور.</td><td>معرف فريد عالميًا تم إنشاؤه بواسطة ميلفوس.</td></tr>
<tr><td>"الحالة"</td><td>حالة العملية أو الطلب الذي تمت معالجته.</td><td>&quot;التخلي&quot; أو &quot;نجاح&quot; أو &quot;فشل&quot;.</td></tr>
<tr><td>"نوع_الاستعلام"</td><td>نوع طلب القراءة.</td><td>&quot;بحث&quot; أو &quot;استعلام&quot;.</td></tr>
<tr><td>"msg_type"</td><td>نوع الرسائل.</td><td>&quot;إدراج&quot; أو &quot;حذف&quot; أو &quot;بحث&quot; أو &quot;استعلام&quot;.</td></tr>
<tr><td>"حالة_قطاع"</td><td>حالة المقطع.</td><td>&quot;مغلق&quot; أو &quot;متزايد&quot; أو &quot;مسح&quot; أو &quot;مسح&quot; أو &quot;مسح&quot; أو &quot;إسقاط&quot; أو &quot;استيراد&quot;.</td></tr>
<tr><td>"حالة_حالة_ذاكرة_مخبأة"</td><td>حالة الكائن المخزن مؤقتًا.</td><td>&quot;إصابة&quot; أو &quot;خطأ&quot;.</td></tr>
<tr><td>"اسم_ذاكرة_مخبأة"</td><td>اسم الكائن المخزن مؤقتًا. تُستخدم هذه التسمية مع تسمية &quot;cache_state&quot;.</td><td>مثل &quot;معرّف المجموعة&quot; أو &quot;المخطط&quot;، إلخ.</td></tr>
<tr><td>&quot;channel_name&quot;</td><td>المواضيع الفعلية في تخزين الرسائل (بولسار أو كافكا).</td><td>على سبيل المثال.&quot;by-dev-rootcoord-dml_0&quot;، &quot;by-dev-rootcoord-dml_255&quot;، إلخ.</td></tr>
<tr><td>"اسم_الدالة"</td><td>اسم الدالة التي تعالج طلبات معينة.</td><td>مثل &quot;CreateCollection&quot;، &quot;CreatePartition&quot;، &quot;CreateIndex&quot;، إلخ.</td></tr>
<tr><td>"اسم_المستخدم"</td><td>اسم المستخدم المستخدم المستخدم للمصادقة.</td><td>اسم المستخدم الذي تفضله.</td></tr>
<tr><td>"Index_task_status"</td><td>حالة مهمة الفهرس في التخزين التعريفي.</td><td>&quot;لم يتم إصدارها&quot; أو &quot;قيد التنفيذ&quot; أو &quot;فاشلة&quot; أو &quot;منتهية&quot; أو &quot;معاد تدويرها&quot;.</td></tr>
</tbody>
</table>
<h2 id="Grafana-in-Milvus" class="common-anchor-header">غرافانا في ميلفوس<button data-href="#Grafana-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://grafana.com/docs/grafana/latest/introduction/">Grafana</a> عبارة عن مكدس تصور مفتوح المصدر يمكنه الاتصال بجميع مصادر البيانات. من خلال سحب المقاييس، تساعد المستخدمين على فهم وتحليل ومراقبة البيانات الضخمة.</p>
<p>يستخدم تطبيق Milvus لوحات معلومات Grafana القابلة للتخصيص لتصور المقاييس.</p>
<h2 id="Whats-next" class="common-anchor-header">ما التالي<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد التعرف على سير العمل الأساسي للمراقبة والتنبيه، تعلّم</p>
<ul>
<li><a href="/docs/ar/v2.5.x/monitor.md">نشر خدمات المراقبة</a></li>
<li><a href="/docs/ar/v2.5.x/visualize.md">تصور مقاييس ميلفوس</a></li>
<li><a href="/docs/ar/v2.5.x/alert.md">إنشاء تنبيه</a></li>
</ul>
