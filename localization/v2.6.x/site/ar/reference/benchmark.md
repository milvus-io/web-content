---
id: benchmark.md
summary: تعرف على النتيجة القياسية لميلفوس.
title: تقرير اختبار Milvus 2.2.2 المعياري
---
<h1 id="Milvus-22-Benchmark-Test-Report" class="common-anchor-header">تقرير اختبار Milvus 2.2.2 المعياري<button data-href="#Milvus-22-Benchmark-Test-Report" class="anchor-icon" translate="no">
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
    </button></h1><p>يعرض هذا التقرير نتائج الاختبار الرئيسية لـ Milvus 2.2.0. ويهدف إلى تقديم صورة عن أداء البحث في Milvus 2.2.0، خاصةً في القدرة على التوسيع والتوسع.</p>
<div class="alert note">
  <div style="display: flex;">
      <div style="flex:0.3;">
        <img translate="no" src="https://zilliz.com/images/whitepaper/performance.png" alt="Milvus Performance Evaluation 2023" />
      </div>
  </div>
  <div style="flex:1;padding: 10px;">
    <p>لقد أجرينا مؤخرًا معيارًا قياسيًا مقابل Milvus 2.2.3 وتوصلنا إلى النتائج الرئيسية التالية:</p>
    <ul>
      <li>انخفاض بمقدار 2.5 أضعاف في زمن انتقال البحث</li>
      <li>زيادة بمقدار 4.5 أضعاف في QPS</li>
      <li>بحث تشابه على نطاق المليار مع انخفاض طفيف في الأداء</li>
      <li>قابلية التوسع الخطي عند استخدام نسخ متماثلة متعددة</li>
    </ul>
    <p>للحصول على التفاصيل، يرجى الرجوع إلى <a href="https://zilliz.com/resources/whitepaper/milvus-performance-benchmark">هذه الورقة البيضاء</a> <a href="https://github.com/zilliztech/VectorDBBench">ورمز الاختبار القياسي ذي الصلة</a>. </p>
  </div>
</div>
<h2 id="Summary" class="common-anchor-header">الملخص<button data-href="#Summary" class="anchor-icon" translate="no">
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
<li>بالمقارنة مع Milvus 2.1، تزيد QPS في Milvus 2.2.0 من Milvus 2.2.0 بأكثر من 48% في وضع التجميع وأكثر من 75% في الوضع المستقل.</li>
<li>يتمتع Milvus 2.2.0 بقدرة مذهلة على التوسع والتوسع:<ul>
<li>تزداد QPS خطيًا عند توسيع نوى وحدة المعالجة المركزية من 8 إلى 32 نواة.</li>
<li>تزداد QPS خطيًا عند توسيع نسخ Querynode المتماثلة من 1 إلى 8.</li>
</ul></li>
</ul>
<h2 id="Terminology" class="common-anchor-header">المصطلحات<button data-href="#Terminology" class="anchor-icon" translate="no">
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
    </button></h2><p><details>
<summary>انقر للاطلاع على تفاصيل المصطلحات المستخدمة في الاختبار</summary>
<table class="terminology">
<thead>
<tr>
<th>المصطلح</th>
<th>الوصف</th>
</tr>
</thead>
<tbody>
<tr>
<td>ن كيو كيو</td>
<td>عدد المتجهات المراد البحث عنها في طلب بحث واحد</td>
</tr>
<tr>
<td>توبك</td>
<td>عدد أقرب المتجهات المطلوب استرجاعها لكل متجه (في nq) في طلب البحث</td>
</tr>
<tr>
<td>هف</td>
<td>معلمة بحث خاصة <a href="https://milvus.io/docs/v2.2.x/index.md">بفهرس HNSW</a></td>
</tr>
<tr>
<td>RT</td>
<td>زمن الاستجابة من إرسال الطلب إلى استلام الاستجابة</td>
</tr>
<tr>
<td>كيو بي إس</td>
<td>عدد طلبات البحث التي تتم معالجتها بنجاح في الثانية الواحدة</td>
</tr>
</tbody>
</table>
</details></p>
<h2 id="Test-environment" class="common-anchor-header">بيئة الاختبار<button data-href="#Test-environment" class="anchor-icon" translate="no">
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
    </button></h2><p>يتم إجراء جميع الاختبارات في البيئات التالية.</p>
<h3 id="Hardware-environment" class="common-anchor-header">بيئة الأجهزة</h3><table>
<thead>
<tr><th>الأجهزة</th><th>المواصفات</th></tr>
</thead>
<tbody>
<tr><td>وحدة المعالجة المركزية</td><td>وحدة المعالجة المركزية Intel® Xeon® Gold 6226R @ 2.90 جيجاهرتز</td></tr>
<tr><td>الذاكرة</td><td>16*\32 جيجابايت RDIMM، 3200 طن متري/ثانية</td></tr>
<tr><td>قرص SSD</td><td>SATA 6 جيجابت في الثانية</td></tr>
</tbody>
</table>
<h3 id="Software-environment" class="common-anchor-header">بيئة البرامج</h3><table>
<thead>
<tr><th>البرمجيات</th><th>الإصدار</th></tr>
</thead>
<tbody>
<tr><td>ميلفوس</td><td>v2.2.0</td></tr>
<tr><td>مجموعة تطوير البرمجيات Milvus GO SDK</td><td>v2.2.0</td></tr>
</tbody>
</table>
<h3 id="Deployment-scheme" class="common-anchor-header">مخطط النشر</h3><ul>
<li>يتم نشر مثيلات Milvus (مستقلة أو عنقودية) عبر <a href="https://milvus.io/docs/install_standalone-helm.md">Helm</a> على مجموعة Kubernetes على مجموعة Kubernetes استنادًا إلى أجهزة فعلية أو افتراضية.</li>
<li>تختلف الاختبارات المختلفة فقط في عدد نوى وحدة المعالجة المركزية وحجم الذاكرة وعدد النسخ المتماثلة (العقد العاملة)، والتي تنطبق فقط على مجموعات Milvus.</li>
<li>تتطابق التكوينات غير المحددة مع <a href="https://github.com/milvus-io/milvus-helm/blob/master/charts/milvus/values.yaml">التكوينات الافتراضية</a>.</li>
<li>تخزّن تبعيات Milvus (MinIO وPulsar وEtcd) البيانات على SSD المحلي في كل عقدة.</li>
<li>يتم إرسال طلبات البحث إلى مثيلات Milvus عبر <a href="https://github.com/milvus-io/milvus-sdk-go/tree/master/tests">Milvus GO SDK</a>.</li>
</ul>
<h3 id="Data-sets" class="common-anchor-header">مجموعات البيانات</h3><p>يستخدم الاختبار مجموعة البيانات مفتوحة المصدر SIFT (128 بُعدًا) من <a href="https://github.com/erikbern/ann-benchmarks/#data-sets">ANN-Benchmarks</a>.</p>
<h2 id="Test-pipeline" class="common-anchor-header">خط أنابيب الاختبار<button data-href="#Test-pipeline" class="anchor-icon" translate="no">
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
<li>ابدأ تشغيل مثيل Milvus بواسطة Helm مع تكوينات الخادم المعنية كما هو مدرج في كل اختبار.</li>
<li>اتصل بنظير Milvus عبر Milvus GO SDK واحصل على نتائج الاختبار المقابلة.</li>
<li>إنشاء مجموعة.</li>
<li>أدخل مليون ناقل SIFT. أنشئ فهرس HNSW وقم بتكوين معلمات الفهرس عن طريق تعيين <code translate="no">M</code> إلى <code translate="no">8</code> و <code translate="no">efConstruction</code> إلى <code translate="no">200</code>.</li>
<li>تحميل المجموعة.</li>
<li>ابحث بأرقام متزامنة مختلفة مع معلمات البحث <code translate="no">nq=1, topk=1, ef=64</code> ، مدة كل تزامن ساعة واحدة على الأقل.</li>
</ol>
<h2 id="Test-results" class="common-anchor-header">نتائج الاختبار<button data-href="#Test-results" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Milvus-220-vs-Milvus-210" class="common-anchor-header">Milvus 2.2.0 v.s. Milvus 2.1.0</h3><h4 id="Cluster" class="common-anchor-header">الكتلة</h4><p><details>
<summary><b>تكوينات الخادم (الكتلة)</b></summary><code translate="no">yaml queryNode: replicas: 1 resources: limits: cpu: &quot;12.0&quot; memory: 8Gi requests: cpu: &quot;12.0&quot; memory: 8Gi</code></details></p>
<p><strong>أداء البحث</strong></p>
<table>
<thead>
<tr><th>ميلفوس</th><th>QPS</th><th>معدل نقل البيانات (TP99) / مللي ثانية</th><th>RT(TP50) / مللي ثانية</th><th>فشل / ثانية</th></tr>
</thead>
<tbody>
<tr><td>2.1.0</td><td>6904</td><td>59</td><td>28</td><td>0</td></tr>
<tr><td>2.2.0</td><td>10248</td><td>63</td><td>24</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/cluster_search_performance_210_vs_220.png" alt="Cluster search performance" class="doc-image" id="cluster-search-performance" />
   </span> <span class="img-wrapper"> <span>أداء البحث العنقودي</span> </span></p>
<h4 id="Standalone" class="common-anchor-header">مستقل</h4><p><details>
<summary><b>تكوينات الخادم (مستقل)</b></summary><code translate="no">yaml standalone: replicas: 1 resources: limits: cpu: &quot;12.0&quot; memory: 16Gi requests: cpu: &quot;12.0&quot; memory: 16Gi</code></details></p>
<p><strong>أداء البحث</strong></p>
<table>
<thead>
<tr><th>ميلفوس</th><th>QPS</th><th>RT(TP99) / مللي ثانية</th><th>RT(TP50) / مللي ثانية</th><th>فشل / ثانية</th></tr>
</thead>
<tbody>
<tr><td>2.1.0</td><td>4287</td><td>104</td><td>76</td><td>0</td></tr>
<tr><td>2.2.0</td><td>7522</td><td>127</td><td>79</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/standalone_search_performance_210_vs_220.png" alt="Standalone search performance" class="doc-image" id="standalone-search-performance" />
   </span> <span class="img-wrapper"> <span>أداء البحث المستقل</span> </span></p>
<h3 id="Milvus-220-Scale-up" class="common-anchor-header">توسيع نطاق Milvus 2.2.0 Milvus 2.2.0</h3><p>قم بتوسيع نوى وحدة المعالجة المركزية في Querynode واحد للتحقق من القدرة على التوسع.</p>
<p><details>
<summary><b>تكوينات الخادم (الكتلة)</b></summary><code translate="no">yaml queryNode: replicas: 1 resources: limits: cpu: &quot;8.0&quot; /&quot;12.0&quot; /&quot;16.0&quot; /&quot;32.0&quot; memory: 8Gi requests: cpu: &quot;8.0&quot; /&quot;12.0&quot; /&quot;16.0&quot; /&quot;32.0&quot; memory: 8Gi</code></details></p>
<p><strong>أداء البحث</strong></p>
<table>
<thead>
<tr><th>أنوية وحدة المعالجة المركزية</th><th>العدد المتزامن</th><th>كيو بي إس</th><th>معدل نقل البيانات (TP99) / مللي ثانية</th><th>RT(TP50) / مللي ثانية</th><th>فشل/ث</th></tr>
</thead>
<tbody>
<tr><td>8</td><td>500</td><td>7153</td><td>127</td><td>83</td><td>0</td></tr>
<tr><td>12</td><td>300</td><td>10248</td><td>63</td><td>24</td><td>0</td></tr>
<tr><td>16</td><td>600</td><td>14135</td><td>85</td><td>42</td><td>0</td></tr>
<tr><td>32</td><td>600</td><td>20281</td><td>63</td><td>28</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/search_performance_by_querynode_cpu_cores.png" alt="Search performance by Querynode CPU cores" class="doc-image" id="search-performance-by-querynode-cpu-cores" />
   </span> <span class="img-wrapper"> <span>أداء البحث حسب أنوية وحدة المعالجة المركزية Querynode</span> </span></p>
<h3 id="Milvus-220-Scale-out" class="common-anchor-header">ميلفوس 2.2.0 توسيع النطاق</h3><p>قم بتوسيع المزيد من النسخ المتماثلة مع المزيد من Querynodes للتحقق من القدرة على التوسع.</p>
<div class="alert note">
<p>ملاحظة: عدد Querynodes يساوي <code translate="no">replica_number</code> عند تحميل المجموعة.</p>
</div>
<p><details>
<summary><b>تكوينات الخادم (المجموعة)</b></summary><code translate="no">yaml queryNode: replicas: 1 / 2 / 4 / 8 resources: limits: cpu: &quot;8.0&quot; memory: 8Gi requests: cpu: &quot;8.0&quot; memory: 8Gi</code></details></p>
<table>
<thead>
<tr><th>النسخ المتماثلة</th><th>العدد المتزامن</th><th>كيو بي إس</th><th>RT(TP99) / مللي ثانية</th><th>RT(TP50) / مللي ثانية</th><th>فشل/ث</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>500</td><td>7153</td><td>127</td><td>83</td><td>0</td></tr>
<tr><td>2</td><td>500</td><td>15903</td><td>105</td><td>27</td><td>0</td></tr>
<tr><td>4</td><td>800</td><td>19281</td><td>109</td><td>40</td><td>0</td></tr>
<tr><td>8</td><td>1200</td><td>30655</td><td>93</td><td>38</td><td>0</td></tr>
</tbody>
</table>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/search_performance_by_querynode_replicas.png" alt="Search performance by Querynode replicas" class="doc-image" id="search-performance-by-querynode-replicas" />
   </span> <span class="img-wrapper"> <span>أداء البحث حسب النسخ المتماثلة ل Querynode</span> </span></p>
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
    </button></h2><ul>
<li>جرّب إجراء اختبارات Milvus 2.2.0 المعيارية بنفسك بالرجوع إلى <a href="https://milvus.io/blog/2022-08-16-A-Quick-Guide-to-Benchmarking-Milvus-2-1.md">هذا الدليل</a>، إلا أنه يجب عليك بدلاً من ذلك استخدام Milvus 2.2 و Pymilvus 2.2 في هذا الدليل.</li>
</ul>
