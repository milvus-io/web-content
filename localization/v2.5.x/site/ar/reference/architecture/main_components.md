---
id: main_components.md
summary: تعرف على المكونات الرئيسية في Milvus المستقلة والمجموعة العنقودية.
title: المكونات الرئيسية
---
<h1 id="Main-Components" class="common-anchor-header">المكونات الرئيسية<button data-href="#Main-Components" class="anchor-icon" translate="no">
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
    </button></h1><p>هناك وضعان لتشغيل Milvus: الوضع المستقل والوضع العنقودي. يشترك هذان الوضعان في نفس الميزات. يمكنك اختيار الوضع الذي يناسب حجم مجموعة بياناتك وبيانات حركة المرور وغير ذلك. في الوقت الراهن، لا يمكن ترقية ميلفوس المستقل "عبر الإنترنت" إلى مجموعة ميلفوس العنقودية.</p>
<h2 id="Milvus-standalone" class="common-anchor-header">ميلفوس مستقل<button data-href="#Milvus-standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>يتضمن ميلفوس المستقل ثلاثة مكونات:</p>
<ul>
<li><p><strong>ميلفوس:</strong> المكون الوظيفي الأساسي.</p></li>
<li><p><strong>مخزن التعريف:</strong> محرك البيانات الوصفية الذي يقوم بالوصول إلى البيانات الوصفية لمكونات Milvus الداخلية وتخزينها، بما في ذلك الوكلاء وعقد الفهرس وغيرها.</p></li>
<li><p><strong>تخزين الكائنات:</strong> محرك التخزين، وهو المسؤول عن ثبات البيانات في ملفوس.</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/standalone_architecture.jpg" alt="Standalone_architecture" class="doc-image" id="standalone_architecture" />
   </span> <span class="img-wrapper"> <span>البنية_المستقلة</span> </span></p>
<h2 id="Milvus-cluster" class="common-anchor-header">مجموعة ميلفوس العنقودية<button data-href="#Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>تتضمن<strong>مجموعة Milvus</strong> سبعة مكونات للخدمات المصغرة وثلاثة تبعيات لجهات خارجية. يمكن نشر جميع الخدمات المصغرة على Kubernetes، بشكل مستقل عن بعضها البعض.</p>
<h3 id="Microservice-components" class="common-anchor-header">مكونات الخدمات المصغرة</h3><ul>
<li>التنسيق الجذري</li>
<li>الوكيل</li>
<li>تنسيق الاستعلام</li>
<li>عقدة الاستعلام</li>
<li>تنسيق البيانات</li>
<li>عقدة الفهرس</li>
<li>عقدة البيانات</li>
</ul>
<h3 id="Third-party-dependencies" class="common-anchor-header">تبعيات الطرف الثالث</h3><ul>
<li><strong>مخزن التعريف:</strong> يخزن البيانات الوصفية للمكونات المختلفة في المجموعة، على سبيل المثال.</li>
<li><strong>تخزين الكائنات:</strong> مسؤول عن ثبات البيانات للملفات الكبيرة في المجموعة، مثل الفهرس وملفات السجل الثنائي، مثل S3</li>
<li><strong>وسيط السجلات:</strong> يدير سجلات عمليات الطفرات الحديثة، ويخرج سجل التدفق، ويوفر خدمات نشر السجل والاشتراك في السجل، مثل Pulsar.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/distributed_architecture.jpg" alt="Distributed_architecture" class="doc-image" id="distributed_architecture" />
   </span> <span class="img-wrapper"> <span>البنية_الموزعة</span> </span></p>
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
<li>اقرأ <a href="/docs/ar/four_layers.md">الحوسبة/التخزين الموزع</a> لفهم آلية ومبدأ تصميم ميلفوس.</li>
</ul>
