---
id: architecture_overview.md
summary: >-
  توفر Milvus قاعدة بيانات متجهات سريعة وموثوقة ومستقرة، تم إنشاؤها خصيصًا للبحث
  عن أوجه التشابه والذكاء الاصطناعي.
title: نظرة عامة على بنية Milvus
---
<h1 id="Milvus-Architecture-Overview" class="common-anchor-header">نظرة عامة على بنية Milvus<button data-href="#Milvus-Architecture-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus هي قاعدة بيانات متجهة <strong>مفتوحة المصدر</strong> <strong>ومصممة خصيصًا للسحابة،</strong> ومخصصة لإجراء عمليات بحث عالية الأداء عن أوجه التشابه في مجموعات البيانات المتجهة الضخمة. وقد تم تطويرها بالاعتماد على مكتبات البحث المتجهة الشائعة، بما في ذلك Faiss وHNSW وDiskANN وSCANN، مما يتيح استخدامها في تطبيقات الذكاء الاصطناعي وسيناريوهات استرجاع البيانات غير المنظمة. قبل المتابعة، يرجى الاطلاع على <a href="/docs/ar/glossary.md">المبادئ الأساسية</a> لعملية استرجاع التضمين.</p>
<h2 id="Architecture-Diagram" class="common-anchor-header">رسم تخطيطي للبنية<button data-href="#Architecture-Diagram" class="anchor-icon" translate="no">
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
    </button></h2><p>يوضح الرسم التخطيطي التالي بنية Milvus عالية المستوى، حيث يُبرز تصميمها المعياري والقابل للتوسع والمصمم خصيصًا للسحابة مع طبقات تخزين وحوسبة منفصلة تمامًا.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_architecture_2_6.png" alt="Architecture_diagram" class="doc-image" id="architecture_diagram" /> 
   <span>Architecture_diagram</span>
  
 </span></p>
<h2 id="Architectural-Principles" class="common-anchor-header">المبادئ المعمارية<button data-href="#Architectural-Principles" class="anchor-icon" translate="no">
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
    </button></h2><p>يتبع Milvus مبدأ فصل مستوى البيانات عن مستوى التحكم، ويتألف من أربع طبقات رئيسية مستقلة عن بعضها البعض من حيث قابلية التوسع واستعادة البيانات في حالات الكوارث. تتيح بنية التخزين المشترك هذه، مع طبقات التخزين والحوسبة المنفصلة تمامًا، التوسع الأفقي لعقد الحوسبة مع تنفيذ Woodpecker كطبقة WAL بدون أقراص لزيادة المرونة وتقليل النفقات التشغيلية.</p>
<p>من خلال فصل معالجة التدفق إلى «عقدة التدفق» (Streaming Node) ومعالجة الدُفعات إلى «عقدة الاستعلام» (Query Node) و«عقدة البيانات» (Data Node)، يحقق Milvus أداءً عاليًا مع تلبية متطلبات المعالجة في الوقت الفعلي في آن واحد.</p>
<h2 id="Detailed-Layer-Architecture" class="common-anchor-header">بنية الطبقات التفصيلية<button data-href="#Detailed-Layer-Architecture" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Layer-1-Access-Layer" class="common-anchor-header">الطبقة 1: طبقة الوصول<button data-href="#Layer-1-Access-Layer" class="anchor-icon" translate="no">
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
    </button></h3><p>تتألف طبقة الوصول من مجموعة من الوكلاء عديمي الحالة، وهي الطبقة الأمامية للنظام ونقطة النهاية للمستخدمين. وهي تتحقق من صحة طلبات العملاء وتقلل من النتائج المرجعة:</p>
<ul>
<li>الوكيل في حد ذاته عديم الحالة. ويوفر عنوان خدمة موحدًا باستخدام مكونات موازنة الحمل مثل Nginx وKubernetes Ingress وNodePort وLVS.</li>
<li>نظرًا لأن Milvus تستخدم بنية معالجة متوازية ضخمة (MPP)، يقوم الوكيل بتجميع النتائج الوسيطة ومعالجتها لاحقًا قبل إرجاع النتائج النهائية إلى العميل.</li>
</ul>
<h3 id="Layer-2-Coordinator" class="common-anchor-header">الطبقة 2: المنسق<button data-href="#Layer-2-Coordinator" class="anchor-icon" translate="no">
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
    </button></h3><p>يعمل المنسق بمثابة «دماغ» Milvus. في أي لحظة، يكون هناك منسق واحد فقط نشط عبر المجموعة بأكملها، وهو مسؤول عن الحفاظ على طوبولوجيا المجموعة، وجدولة جميع أنواع المهام، وضمان الاتساق على مستوى المجموعة.</p>
<p>فيما يلي بعض المهام التي يتولى <strong>المنسق</strong> تنفيذها:</p>
<ul>
<li><strong>إدارة DDL/DCL/TSO</strong>: يتولى معالجة طلبات لغة تعريف البيانات (DDL) ولغة التحكم في البيانات (DCL)، مثل إنشاء أو حذف المجموعات أو الأقسام أو الفهارس، بالإضافة إلى إدارة الطابع الزمني لـ Oracle (TSO) وإصدار علامات الوقت.</li>
<li><strong>إدارة خدمة البث</strong>: يربط سجل الكتابة المسبقة (WAL) بعقد البث ويوفر اكتشاف الخدمة لخدمة البث.</li>
<li><strong>إدارة الاستعلامات</strong>: يدير الطوبولوجيا وموازنة الحمل لعقد الاستعلام، ويوفر ويدير طرق عرض الاستعلامات لتوجيه توجيه الاستعلامات.</li>
<li><strong>إدارة البيانات التاريخية</strong>: توزع المهام غير المتصلة بالإنترنت، مثل الضغط وبناء الفهارس، على عقد البيانات، وتدير طوبولوجيا الشرائح وطرق عرض البيانات.</li>
</ul>
<h3 id="Layer-3-Worker-Nodes" class="common-anchor-header">الطبقة 3: العقد العاملة<button data-href="#Layer-3-Worker-Nodes" class="anchor-icon" translate="no">
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
    </button></h3><p>الأذرع والأرجل. العقد العاملة هي منفذات بسيطة تتبع تعليمات المنسق. العقد العاملة عديمة الحالة بفضل الفصل بين التخزين والحساب، ويمكنها تسهيل توسيع نطاق النظام واستعادة البيانات بعد الكوارث عند نشرها على Kubernetes. هناك ثلاثة أنواع من العقد العاملة:</p>
<h3 id="Streaming-node" class="common-anchor-header">عقدة البث<button data-href="#Streaming-node" class="anchor-icon" translate="no">
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
    </button></h3><p>تعمل عقدة البث كـ«دماغ صغير» على مستوى الشارد، حيث توفر ضمانات الاتساق على مستوى الشارد واستعادة الأعطال استنادًا إلى تخزين WAL الأساسي. وفي الوقت نفسه، تتولى عقدة البث أيضًا مسؤولية الاستعلام عن البيانات المتزايدة وإنشاء خطط الاستعلام. بالإضافة إلى ذلك، تتولى أيضًا تحويل البيانات المتزايدة إلى بيانات مختومة (تاريخية).</p>
<h3 id="Query-node" class="common-anchor-header">عقدة الاستعلام<button data-href="#Query-node" class="anchor-icon" translate="no">
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
    </button></h3><p>تقوم عقدة الاستعلام بتحميل البيانات التاريخية من تخزين الكائنات، وتوفر إمكانية الاستعلام عن البيانات التاريخية.</p>
<h3 id="Data-node" class="common-anchor-header">عقدة البيانات<button data-href="#Data-node" class="anchor-icon" translate="no">
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
    </button></h3><p>تتولى عقدة البيانات مسؤولية المعالجة غير المتصلة بالإنترنت للبيانات التاريخية، مثل الضغط وبناء الفهرس.</p>
<h3 id="Layer-4-Storage" class="common-anchor-header">الطبقة 4: التخزين<button data-href="#Layer-4-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>يُعد التخزين العمود الفقري للنظام، وهو مسؤول عن استمرارية البيانات. ويتألف من التخزين التلوي، ووسيط السجلات، وتخزين الكائنات.</p>
<h3 id="Meta-storage" class="common-anchor-header">تخزين البيانات الوصفية<button data-href="#Meta-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>يخزن تخزين البيانات الوصفية لقطات من البيانات الوصفية مثل مخطط المجموعة ونقاط فحص استهلاك الرسائل. يتطلب تخزين البيانات الوصفية توفرًا عاليًا للغاية واتساقًا قويًا ودعمًا للمعاملات، لذلك اختارت Milvus etcd لتخزين البيانات الوصفية. تستخدم Milvus أيضًا etcd لتسجيل الخدمة وفحص الحالة.</p>
<h3 id="Object-storage" class="common-anchor-header">تخزين الكائنات<button data-href="#Object-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>تعمل وحدة تخزين الكائنات على الحفاظ على البيانات وملفات الفهرس. تدعم Milvus الخلفيات الخاصة بوحدة تخزين الكائنات مثل MinIO و AWS S3 و Azure Blob Storage. تقوم QueryNodes بتخزين البيانات والفهارس اللازمة لتلبية الاستعلامات مؤقتًا.</p>
<p>مع <a href="/docs/ar/tiered-storage-overview.md">التخزين المتدرج (Tiered Storage)</a>، المتوفر في Milvus 2.6.4 والإصدارات الأحدث، يمكن لـ QueryNodes تحميل بيانات تعريف الشرائح أولاً وجلب بيانات الحقول أو الفهارس عند الطلب، بدلاً من تحميل كل شيء عند التهيئة. يظل تخزين الكائنات عن بُعد هو المصدر الدائم؛ حيث إن إزالة إدخال من ذاكرة التخزين المؤقتة المحلية لا تؤدي إلى حذف البيانات المخزنة. يؤدي الوصول إلى البيانات غير المخزنة مؤقتًا إلى زيادة عمليات الإدخال/الإخراج للتخزين وقد يزيد من زمن استجابة الاستعلام. استخدم <a href="/docs/ar/warm-up.md">ميزة «Warm Up»</a> للحقول أو الفهارس الحساسة لزمن الاستجابة، وقم بتقييم زمن استجابة الاستعلامات الباردة وكذلك زمن استجابة ذاكرة التخزين المؤقت الدافئة قبل اختيار استراتيجية التحميل.</p>
<h3 id="WAL-storage" class="common-anchor-header">تخزين سجل الكتابة المسبقة (WAL)<button data-href="#WAL-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>يُعد تخزين سجل الكتابة المسبقة (WAL) أساس متانة البيانات واتساقها في الأنظمة الموزعة. قبل تثبيت أي تغيير، يتم تسجيله أولاً في سجل — مما يضمن أنه في حالة حدوث عطل، يمكنك الاستعادة من النقطة التي توقفت عندها بالضبط.</p>
<p>تشمل تطبيقات WAL الشائعة Kafka وPulsar وWoodpecker. على عكس الحلول التقليدية القائمة على الأقراص، يتبنى Woodpecker تصميمًا سحابيًّا أصليًّا خاليًّا من الأقراص يكتب مباشرةً إلى تخزين الكائنات. يتكيف هذا النهج بسهولة مع احتياجاتك ويبسط العمليات من خلال التخلص من العبء الإضافي لإدارة الأقراص المحلية.</p>
<p>من خلال تسجيل كل عملية كتابة مسبقًا، تضمن طبقة WAL آلية موثوقة على مستوى النظام للاستعادة والاتساق — بغض النظر عن مدى تعقيد بيئتك الموزعة.</p>
<h2 id="Data-Flow-and-API-Categories" class="common-anchor-header">تدفق البيانات وفئات واجهات برمجة التطبيقات<button data-href="#Data-Flow-and-API-Categories" class="anchor-icon" translate="no">
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
    </button></h2><p>يتم تصنيف واجهات برمجة التطبيقات (API) الخاصة بـ Milvus وفقًا لوظائفها وتتبع مسارات محددة عبر البنية:</p>
<table>
<thead>
<tr><th>فئة واجهة برمجة التطبيقات</th><th>العمليات</th><th>أمثلة على واجهات برمجة التطبيقات</th><th>تدفق البنية</th></tr>
</thead>
<tbody>
<tr><td><strong>DDL/DCL</strong></td><td>المخطط والتحكم في الوصول</td><td><code translate="no">createCollection</code>، <code translate="no">dropCollection</code> ، <code translate="no">hasCollection</code> ، <code translate="no">createPartition</code></td><td>طبقة الوصول → المنسق</td></tr>
<tr><td><strong>DML</strong></td><td>معالجة البيانات</td><td><code translate="no">insert</code>، <code translate="no">delete</code> ، <code translate="no">upsert</code></td><td>طبقة الوصول → عقدة عامل البث</td></tr>
<tr><td><strong>DQL</strong></td><td>استعلام البيانات</td><td><code translate="no">search</code>، <code translate="no">query</code></td><td>طبقة الوصول → عقدة معالجة الدُفعات (عقد الاستعلام)</td></tr>
</tbody>
</table>
<h3 id="Example-Data-Flow-Search-Operation" class="common-anchor-header">مثال على تدفق البيانات: عملية البحث<button data-href="#Example-Data-Flow-Search-Operation" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>يرسل العميل طلب بحث عبر SDK/واجهة برمجة التطبيقات RESTful</li>
<li>يقوم موزع الحمل بتوجيه الطلب إلى الوكيل المتاح في طبقة الوصول</li>
<li>يستخدم الوكيل ذاكرة التخزين المؤقتة للتوجيه لتحديد العقد المستهدفة؛ ولا يتصل بالمنسق إلا في حالة عدم توفر ذاكرة التخزين المؤقتة</li>
<li>يقوم الوكيل بإعادة توجيه الطلب إلى عقد البث المناسبة، والتي تنسق بعد ذلك مع عقد الاستعلام للبحث عن البيانات المختومة أثناء تنفيذ البحث عن البيانات المتزايدة محليًا</li>
<li>تقوم عقد الاستعلام بتحميل المقاطع المختومة من تخزين الكائنات حسب الحاجة وإجراء البحث على مستوى المقطع</li>
<li>تخضع نتائج البحث لعملية تقليص متعددة المستويات: تقوم «عقد الاستعلام» بتقليص النتائج عبر شرائح متعددة، وتقوم «عقد البث» بتقليص النتائج الواردة من «عقد الاستعلام»، ويقوم «الوكيل» بتقليص النتائج الواردة من جميع «عقد البث» قبل إعادتها إلى العميل</li>
</ol>
<h3 id="Example-Data-Flow-Data-Insertion" class="common-anchor-header">مثال على تدفق البيانات: إدراج البيانات<button data-href="#Example-Data-Flow-Data-Insertion" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>يرسل العميل طلب إدراج مع بيانات متجهة</li>
<li>تقوم طبقة الوصول بالتحقق من صحة الطلب وإعادة توجيهه إلى عقدة البث</li>
<li>تقوم عقدة البث بتسجيل العملية في تخزين WAL لضمان المتانة</li>
<li>تتم معالجة البيانات في الوقت الفعلي وإتاحتها للاستعلامات</li>
<li>عندما تصل الشرائح إلى سعتها القصوى، تقوم عقدة البث بتحويلها إلى شرائح مختومة</li>
<li>تتولى عقدة البيانات عملية الضغط وتبني الفهارس فوق الشرائح المختومة، وتخزن النتائج في تخزين الكائنات</li>
<li>تقوم «عقد الاستعلام» بتحميل الفهارس التي تم إنشاؤها حديثًا واستبدال البيانات المتزايدة المقابلة لها</li>
</ol>
<h2 id="Whats-Next" class="common-anchor-header">الخطوة التالية<button data-href="#Whats-Next" class="anchor-icon" translate="no">
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
<li>استكشف <a href="/docs/ar/main_components.md">المكونات الرئيسية</a> للتعرف على تفاصيل التنفيذ</li>
<li>تعرف على سير عمل <a href="/docs/ar/data_processing.md">معالجة البيانات</a> واستراتيجيات التحسين</li>
<li>افهم <a href="/docs/ar/tune_consistency.md">نموذج الاتساق</a> وضمانات المعاملات في Milvus</li>
</ul>
