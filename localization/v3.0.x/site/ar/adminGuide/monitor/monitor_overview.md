---
id: monitor_overview.md
title: نظرة عامة على الشاشة
related_key: 'monitor, alert'
summary: >-
  تعرف على كيفية استخدام كل من Prometheus وGrafana في Milvus لمراقبة الخدمات
  وإرسال التنبيهات.
---
<h1 id="Milvus-monitoring-framework-overview" class="common-anchor-header">نظرة عامة على إطار عمل المراقبة Milvus<button data-href="#Milvus-monitoring-framework-overview" class="anchor-icon" translate="no">
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
    </button></h1><p>يشرح هذا الموضوع كيفية استخدام Milvus لـ Prometheus لمراقبة المقاييس، و Grafana لتصور المقاييس وإنشاء التنبيهات.</p>
<h2 id="Prometheus-in-Milvus" class="common-anchor-header">Prometheus في Milvus<button data-href="#Prometheus-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://prometheus.io/docs/introduction/overview/">Prometheus</a> هي مجموعة أدوات مفتوحة المصدر للمراقبة والتنبيه مخصصة لتطبيقات Kubernetes. وهي تجمع المقاييس وتخزنها كبيانات متسلسلة زمنياً. وهذا يعني أن المقاييس تُخزّن مع طوابع زمنية عند تسجيلها، إلى جانب أزواج مفتاح-قيمة اختيارية تُسمى العلامات.</p>
<p>يستخدم Milvus حاليًا المكونات التالية من Prometheus:</p>
<ul>
<li>نقطة نهاية Prometheus لسحب البيانات من نقاط النهاية التي يحددها المُصدِّرون.</li>
<li>مشغل Prometheus لإدارة مثيلات مراقبة Prometheus بفعالية.</li>
<li>Kube-prometheus لتوفير مراقبة شاملة وسهلة التشغيل لمجموعات Kubernetes.</li>
</ul>
<h3 id="Metric-names" class="common-anchor-header">أسماء المقاييس<button data-href="#Metric-names" class="anchor-icon" translate="no">
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
    </button></h3><p>يتكون اسم المقياس الصحيح في Prometheus من ثلاثة عناصر: مساحة الاسم، والنظام الفرعي، والاسم. وترتبط هذه العناصر الثلاثة بعلامة "_".</p>
<p>مساحة اسم مقاييس Milvus التي يراقبها Prometheus هي "milvus". النظام الفرعي للمقياس هو أحد الخيارات التالية: "cdc"، "cgo"، "datacoord"، "datanode"، "indexnode"، "logging"، "meta"، "msg_queue"، "msgstream"، "proxy"، "querycoord"، "querynode"، "rootcoord"، "storage"، "streaming"، "streamingcoord"، "streamingnode"، و"wal". بعض المقاييس، مثل <code translate="no">milvus_build_info</code> و <code translate="no">milvus_num_node</code> ، لا تحتوي على نظام فرعي.</p>
<p>على سبيل المثال، يُسمى المقياس في Milvus الذي يحسب العدد الإجمالي للمتجهات التي تم الاستعلام عنها « <code translate="no">milvus_proxy_search_vectors_count</code> ».</p>
<h3 id="Metric-types" class="common-anchor-header">أنواع المقاييس<button data-href="#Metric-types" class="anchor-icon" translate="no">
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
    </button></h3><p>يدعم Prometheus أربعة أنواع من المقاييس:</p>
<ul>
<li>العداد (Counter): نوع من المقاييس التراكمية التي لا يمكن لقيمتها إلا أن تزداد أو تُعاد إلى الصفر عند إعادة التشغيل.</li>
<li>مقياس: نوع من المقاييس التي يمكن أن ترتفع قيمتها أو تنخفض.</li>
<li>الرسم البياني التكراري (Histogram): نوع من المقاييس التي يتم حسابها بناءً على مجموعات قابلة للتكوين. ومن الأمثلة الشائعة على ذلك مدة الطلب.</li>
<li>الملخص: نوع من المقاييس مشابه للرسم البياني التراكمي، حيث يحسب الشرائح القابلة للتكوين خلال نافذة زمنية متغيرة.</li>
</ul>
<h3 id="Metric-labels" class="common-anchor-header">تسميات المقاييس<button data-href="#Metric-labels" class="anchor-icon" translate="no">
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
    </button></h3><p>يميز Prometheus العينات التي تحمل نفس اسم المقياس عن طريق وضع تسميات عليها. التسمية هي سمة معينة للمقياس. يجب أن يكون للمقاييس التي تحمل نفس الاسم نفس القيمة لحقل « <code translate="no">variable_labels</code> ». يسرد الجدول التالي أسماء ومعاني التسميات الشائعة لمقاييس Milvus.</p>
<table>
<thead>
<tr><th>اسم التسمية</th><th>التعريف</th><th>القيم</th></tr>
</thead>
<tbody>
<tr><td>"node_id"</td><td>الهوية الفريدة للدور.</td><td>معرف فريد عالميًا تم إنشاؤه بواسطة milvus.</td></tr>
<tr><td>"status"</td><td>حالة العملية أو الطلب الذي تمت معالجته.</td><td>"abandon" أو "success" أو "fail".</td></tr>
<tr><td>"query_type"</td><td>نوع طلب القراءة.</td><td>"search" أو "query".</td></tr>
<tr><td>"msg_type"</td><td>نوع الرسائل.</td><td>"insert" أو "delete" أو "search" أو "query".</td></tr>
<tr><td>"segment_state"</td><td>حالة المقطع.</td><td>"Sealed" أو "Growing" أو "Flushed" أو "Flushing" أو "Dropped" أو "Importing".</td></tr>
<tr><td>"cache_state"</td><td>حالة الكائن المخزّن مؤقتًا.</td><td>"hit" أو "miss".</td></tr>
<tr><td>"cache_name"</td><td>اسم الكائن المخزّن مؤقتًا. تُستخدم هذه التسمية مع التسمية "cache_state".</td><td>على سبيل المثال: "CollectionID"، "Schema"، إلخ.</td></tr>
<tr><td>"channel_name"</td><td>المواضيع المادية في مخزن الرسائل (Pulsar أو Kafka).</td><td>على سبيل المثال: "by-dev-rootcoord-dml_0"، "by-dev-rootcoord-dml_255"، إلخ.</td></tr>
<tr><td>"function_name"</td><td>اسم الدالة التي تتولى معالجة طلبات معينة.</td><td>على سبيل المثال: "CreateCollection"، "CreatePartition"، "CreateIndex"، إلخ.</td></tr>
<tr><td>"user_name"</td><td>اسم المستخدم المستخدم للمصادقة.</td><td>اسم مستخدم من اختيارك.</td></tr>
<tr><td>"index_task_status"</td><td>حالة مهمة الفهرسة في التخزين التلوي.</td><td>"لم تصدر"، "قيد التقدم"، "فشلت"، "انتهت"، أو "أعيد تدويرها".</td></tr>
</tbody>
</table>
<h2 id="Grafana-in-Milvus" class="common-anchor-header">Grafana في Milvus<button data-href="#Grafana-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://grafana.com/docs/grafana/latest/introduction/">Grafana</a> هي منصة عرض بيانات مفتوحة المصدر يمكنها الاتصال بجميع مصادر البيانات. ومن خلال عرض المقاييس، تساعد المستخدمين على فهم البيانات الضخمة وتحليلها ومراقبتها.</p>
<p>يستخدم Milvus لوحات التحكم القابلة للتخصيص في Grafana لتصور المقاييس.</p>
<h2 id="Whats-next" class="common-anchor-header">الخطوة التالية<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد التعرف على سير العمل الأساسي للمراقبة والتنبيهات، تعرف على:</p>
<ul>
<li><a href="/docs/ar/monitor.md">نشر خدمات المراقبة</a></li>
<li><a href="/docs/ar/visualize.md">تصور مقاييس Milvus</a></li>
<li><a href="/docs/ar/alert.md">إنشاء تنبيه</a></li>
</ul>
