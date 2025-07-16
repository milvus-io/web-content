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
    </button></h1><p>تتألف مجموعة Milvus من خمسة مكونات أساسية وثلاثة مكونات تابعة لجهات خارجية. يمكن نشر كل مكون بشكل مستقل على Kubernetes:</p>
<h2 id="Milvus-components" class="common-anchor-header">مكونات ميلفوس<button data-href="#Milvus-components" class="anchor-icon" translate="no">
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
<li>المنسق: يمكن تمكين وضع رئيسي-عبد لتوفير توافر عالٍ.</li>
<li>الوكيل: واحد أو أكثر لكل مجموعة</li>
<li>عقدة التدفق: واحدة أو أكثر لكل مجموعة</li>
<li>عقدة الاستعلام: واحدة أو أكثر لكل مجموعة</li>
<li>عقدة البيانات: واحدة أو أكثر لكل مجموعة</li>
</ul>
<h2 id="Third-party-dependencies" class="common-anchor-header">تبعيات الطرف الثالث<button data-href="#Third-party-dependencies" class="anchor-icon" translate="no">
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
<li><strong>مخزن التعريف:</strong> يخزن البيانات الوصفية للمكونات المختلفة في الميلفوس، على سبيل المثال: إلخ.</li>
<li><strong>تخزين الكائنات:</strong> مسؤول عن استمرار البيانات للملفات الكبيرة في الميلفوس، مثل الفهرس وملفات السجل الثنائي، مثل S3</li>
<li><strong>تخزين WAL:</strong> يوفر خدمة سجل الكتابة الأمامية (WAL) لخدمة سجلات الكتابة الأمامية (WAL) للميلفوس، مثل نقار الخشب.<ul>
<li>تحت وضع نقار الخشب بدون قرص، يستخدم <strong>WAL</strong> مباشرةً تخزين الكائنات والتخزين التعريفي دون نشر آخر، مما يقلل من تبعيات الطرف الثالث.</li>
</ul></li>
</ul>
<h2 id="Milvus-deployment-modes" class="common-anchor-header">أوضاع نشر ميلفوس<button data-href="#Milvus-deployment-modes" class="anchor-icon" translate="no">
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
    </button></h2><p>هناك وضعان لتشغيل ميلفوس:</p>
<h3 id="Standalone" class="common-anchor-header">مستقل</h3><p>مثيل واحد من Milvus يقوم بتشغيل جميع المكونات في عملية واحدة، وهو مناسب لمجموعات البيانات الصغيرة وأعباء العمل المنخفضة. بالإضافة إلى ذلك، في الوضع المستقل، يمكن اختيار تطبيق WAL الأبسط، مثل Woodpecker و rocksmq، في الوضع المستقل لإلغاء متطلبات تبعيات تخزين WAL من طرف ثالث.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/standalone_architecture.png" alt="Standalone_architecture" class="doc-image" id="standalone_architecture" />
   </span> <span class="img-wrapper"> <span>البنية_المستقلة</span> </span></p>
<p>في الوقت الحالي، لا يمكنك إجراء ترقية عبر الإنترنت من مثيل Milvus مستقل إلى مجموعة Milvus، حتى لو كانت الواجهة الخلفية لتخزين WAL تدعم وضع المجموعة.</p>
<h3 id="Cluster" class="common-anchor-header">الكتلة</h3><p>وضع النشر الموزع ل Milvus حيث يعمل كل مكون بشكل مستقل ويمكن توسيعه لتحقيق المرونة. هذا الإعداد مناسب لمجموعات البيانات الكبيرة وسيناريوهات الأحمال العالية.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/distributed_architecture.png" alt="Distributed_architecture" class="doc-image" id="distributed_architecture" />
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
<li>اقرأ <a href="/docs/ar/four_layers.md">تفكيك الحوسبة/التخزين</a> لفهم آلية ومبدأ تصميم ميلفوس.</li>
</ul>
