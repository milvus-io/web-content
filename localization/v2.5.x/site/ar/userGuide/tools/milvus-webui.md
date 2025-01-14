---
id: milvus-webui.md
summary: >-
  Milvus Web UI هي أداة إدارة رسومية لـ Milvus. وهي تعزز إمكانية مراقبة النظام
  بواجهة بسيطة وبديهية. يمكنك
title: واجهة مستخدم ويب ميلفوس
---
<h1 id="Milvus-WebUI" class="common-anchor-header">واجهة مستخدم ويب ميلفوس<button data-href="#Milvus-WebUI" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Web UI هي أداة إدارة رسومية ل Milvus. وهي تعزز إمكانية مراقبة النظام بواجهة بسيطة وبديهية. يمكنك استخدام واجهة مستخدم الويب Milvus Web UI لمراقبة الإحصائيات والمقاييس الخاصة بمكونات وتبعيات Milvus، والتحقق من تفاصيل قاعدة البيانات والتجميع، وسرد تكوينات Milvus التفصيلية.</p>
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
    </button></h2><p>تختلف واجهة مستخدم الويب Milvus Web UI عن Birdwatcher و Attu في أنها أداة مدمجة لتوفير إمكانية مراقبة النظام بشكل عام مع واجهة بسيطة وبديهية.</p>
<p>الجدول التالي يقارن بين ميزات واجهة مستخدم ميلفوس ويب وواجهة مستخدم بيردواتشر/أتو:</p>
<table>
<thead>
<tr><th>الميزة</th><th>واجهة مستخدم ميلفوس ويب</th><th>مراقب الطيور</th><th>أتو</th></tr>
</thead>
<tbody>
<tr><td>نموذج التشغيل</td><td>واجهة المستخدم الرسومية</td><td>واجهة المستخدم الرسومية</td><td>واجهة المستخدم الرسومية</td></tr>
<tr><td>المستخدمون المستهدفون</td><td>المشرفون والمطورون</td><td>المشرفون</td><td>المطورون</td></tr>
<tr><td>التثبيت</td><td>مدمج</td><td>أداة مستقلة</td><td>أداة مستقلة</td></tr>
<tr><td>التبعيات</td><td>ميلفوس</td><td>ميلفوس / إلخd</td><td>ميلفوس</td></tr>
<tr><td>الوظائف الأساسية</td><td>بيئة وقت التشغيل، وتفاصيل قاعدة البيانات/المجموعة، والشرائح، والقنوات، والمهام، وطلبات الاستعلام البطيئة</td><td>فحص البيانات الوصفية وتنفيذ واجهة برمجة تطبيقات ميلفوس</td><td>إدارة قاعدة البيانات والمهام التشغيلية</td></tr>
<tr><td>متوفر منذ</td><td>v2.5.0</td><td>v2.0.0</td><td>v0.1.8</td></tr>
</tbody>
</table>
<p>اعتبارًا من الإصدار 2.5.0، يمكنك الوصول إلى واجهة مستخدم ويب Milvus Web UI باستخدام عنوان URL التالي على مثيل Milvus قيد التشغيل:</p>
<pre><code translate="no">http://<span class="hljs-variable">${MILVUS_PROXY_IP}</span>:9091/webui
<button class="copy-code-btn"></button></code></pre>
<h2 id="Features" class="common-anchor-header">الميزات<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h2><p>توفر واجهة مستخدم ويب Milvus Web UI الميزات التالية:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/milvus-webui-overview.png" alt="Milvus Web UI overview" class="doc-image" id="milvus-web-ui-overview" />
   </span> <span class="img-wrapper"> <span>نظرة عامة على واجهة مستخدم ويب ميلفوس ويب</span> </span></p>
<ul>
<li><p><a href="#Home">الصفحة الرئيسية</a></p>
<p>يمكنك العثور على معلومات حول مثيل Milvus قيد التشغيل الحالي ومكوناته والعملاء المتصلين والتبعيات.</p></li>
<li><p><a href="#Collections">المجموعات</a></p>
<p>يمكنك عرض قائمة قواعد البيانات والمجموعات الموجودة حالياً في ملفوس والتحقق من تفاصيلها.</p></li>
<li><p><a href="#Query">الاستعلام</a></p>
<p>يمكنك عرض الإحصائيات المجمعة لعقد الاستعلام ومنسقي الاستعلام من حيث المقاطع والقنوات والنسخ المتماثلة ومجموعات الموارد.</p></li>
<li><p><a href="#Data">البيانات</a></p>
<p>يمكنك عرض الإحصائيات المجمعة لعقد البيانات من حيث المقاطع والقنوات.</p></li>
<li><p><a href="#Tasks">المهام</a></p>
<p>يمكنك عرض قائمة المهام التي تعمل في Milvus، بما في ذلك مهام جدولة Querycoord ومهام الضغط ومهام بناء الفهرس ومهام الاستيراد ومهام مزامنة البيانات.</p></li>
<li><p><a href="#Slow-requests">الطلبات البطيئة</a></p>
<p>يمكنك عرض قائمة الطلبات البطيئة في Milvus، بما في ذلك نوع الطلب ومدة الطلب ومعلمات الطلب.</p></li>
<li><p><a href="#Configurations">التكوينات</a></p>
<p>يمكنك عرض قائمة تكوينات Milvus وقيمها.</p></li>
<li><p><a href="#Tools">الأدوات</a></p>
<p>يمكنك الوصول إلى الأداتين المدمجتين، أداة pprof وأداة تصور بيانات Milvus، من واجهة مستخدم الويب.</p></li>
</ul>
<h2 id="Home" class="common-anchor-header">الصفحة الرئيسية<button data-href="#Home" class="anchor-icon" translate="no">
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
    </button></h2><p>في الصفحة الرئيسية، يمكنك العثور على المعلومات التالية:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-home.png" alt="Milvus Web UI Home" class="doc-image" id="milvus-web-ui-home" />
   </span> <span class="img-wrapper"> <span>الصفحة الرئيسية لواجهة مستخدم الويب ميلفوس ويب</span> </span></p>
<ul>
<li><p><strong>معلومات النظام</strong>: عرض معلومات النظام، بما في ذلك معلومات حول وضع النشر والصورة المستخدمة في النشر والمعلومات ذات الصلة.</p></li>
<li><p><strong>معلومات المكونات</strong>: عرض حالة ومقاييس المكونات في Milvus، بما في ذلك حالة ومقاييس عقد الاستعلام وعقد البيانات وعقد الفهرس والمنسقين والوكلاء.</p></li>
<li><p><strong>العملاء المتصلين</strong>: عرض العملاء المتصلين ومعلوماتهم، بما في ذلك نوع SDK وإصداره، واسم المستخدم، وسجل الوصول الخاص بهم.</p></li>
<li><p><strong>تبعيات النظام</strong>: عرض حالة ومقاييس التبعيات الخاصة ب Milvus، بما في ذلك حالة ومقاييس مخزن التعريف وقائمة انتظار الرسائل وتخزين الكائنات.</p></li>
</ul>
<h2 id="Collections" class="common-anchor-header">المجموعات<button data-href="#Collections" class="anchor-icon" translate="no">
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
    </button></h2><p>في صفحة المجموعات، يمكنك عرض قائمة قواعد البيانات والمجموعات الموجودة حاليًا في Milvus والتحقق من تفاصيلها.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-collections.png" alt="Milvus Web UI Collections" class="doc-image" id="milvus-web-ui-collections" />
   </span> <span class="img-wrapper"> <span>مجموعات واجهة مستخدم ويب ميلفوس ويب</span> </span></p>
<ul>
<li><p><strong>قواعد البيانات</strong>: عرض قائمة قواعد البيانات الموجودة حاليًا في Milvus وتفاصيلها.</p></li>
<li><p><strong>المجموعات</strong>: عرض قائمة المجموعات في كل قاعدة بيانات وتفاصيلها.</p>
<p>يمكنك النقر على مجموعة لعرض تفاصيلها، بما في ذلك عدد الحقول والأقسام والفهارس وغيرها من المعلومات بالتفصيل.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-collection-details.png" alt="Milvus Web UI Collection Details" class="doc-image" id="milvus-web-ui-collection-details" />
   </span> <span class="img-wrapper"> <span>تفاصيل مجموعة واجهة مستخدم الويب Milvus Web UI</span> </span></p></li>
</ul>
<h2 id="Query" class="common-anchor-header">استعلام<button data-href="#Query" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-query.png" alt="Milvus Web UI Query Page" class="doc-image" id="milvus-web-ui-query-page" />
   </span> <span class="img-wrapper"> <span>صفحة استعلام واجهة مستخدم ويب ميلفوس ويب</span> </span></p>
<ul>
<li><p><strong>الشرائح</strong>: عرض قائمة المقاطع وتفاصيلها، بما في ذلك معرّف المقطع والمجموعة المقابلة والحالة والحجم وما إلى ذلك.</p></li>
<li><p><strong>القنوات</strong>: عرض قائمة القنوات وتفاصيلها، بما في ذلك اسم القناة والمجموعات المقابلة لها، إلخ.</p></li>
<li><p><strong>النسخ المتماثلة</strong>: عرض قائمة بالنسخ المتماثلة وتفاصيلها، بما في ذلك معرف النسخة المتماثلة والمجموعة المقابلة لها، إلخ.</p></li>
<li><p><strong>مجموعات الموارد</strong>: عرض قائمة مجموعات الموارد وتفاصيلها، بما في ذلك اسم مجموعة الموارد وعدد عقد الاستعلام في المجموعة وتكويناتها، إلخ.</p></li>
</ul>
<h2 id="Data" class="common-anchor-header">البيانات<button data-href="#Data" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-data.png" alt="Milvus Web UI Data Page" class="doc-image" id="milvus-web-ui-data-page" />
   </span> <span class="img-wrapper"> <span>صفحة بيانات واجهة مستخدم ويب ميلفوس ويب</span> </span></p>
<ul>
<li><p><strong>الشرائح</strong>: عرض قائمة المقاطع من عقد/منسقي البيانات وتفاصيلها، بما في ذلك معرف المقطع، والمجموعة المقابلة، والحالة، والحجم، وما إلى ذلك.</p></li>
<li><p><strong>القنوات</strong>: عرض قائمة القنوات من عُقد البيانات/المنسقين وتفاصيلها، بما في ذلك اسم القناة والمجموعات المقابلة لها، إلخ.</p></li>
</ul>
<h2 id="Tasks" class="common-anchor-header">المهام<button data-href="#Tasks" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-tasks.png" alt="Milvus Web UI Tasks Page" class="doc-image" id="milvus-web-ui-tasks-page" />
   </span> <span class="img-wrapper"> <span>صفحة مهام واجهة مستخدم ويب ميلفوس ويب</span> </span></p>
<ul>
<li><p><strong>المهام</strong>: عرض قائمة المهام التي تعمل في ملفوس، بما في ذلك نوع المهمة وحالتها وإجراءاتها.</p>
<ul>
<li><p><strong>مهام QueryCoord</strong>: عرض جميع مهام جدولة QueryCoord، بما في ذلك الموازن والفهرس/الجزء/القناة/المدقق القائد في آخر 15 دقيقة.</p></li>
<li><p><strong>مهام الضغط</strong>: عرض جميع مهام الضغط من منسقي البيانات في آخر 15 دقيقة.</p></li>
<li><p><strong>مهام بناء الفهرس</strong>: عرض جميع مهام إنشاء الفهرس من منسقي البيانات في آخر 30 دقيقة.</p></li>
<li><p><strong>مهام الاستيراد</strong>: عرض جميع مهام الاستيراد من منسقي البيانات في آخر 30 دقيقة.</p></li>
<li><p><strong>مهام مزامنة البيانات</strong>: عرض جميع مهام مزامنة البيانات من عقد البيانات في آخر 15 دقيقة.</p></li>
</ul></li>
</ul>
<h2 id="Slow-requests" class="common-anchor-header">الطلبات البطيئة<button data-href="#Slow-requests" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-slow-requests.png" alt="Milvus Web UI Slow Requests Page" class="doc-image" id="milvus-web-ui-slow-requests-page" />
   </span> <span class="img-wrapper"> <span>صفحة الطلبات البطيئة لواجهة مستخدم الويب Milvus Web UI</span> </span></p>
<ul>
<li><strong>الطلبات البطيئة</strong>: الطلب البطيء هو طلب بحث أو استعلام له زمن انتقال أطول من قيمة <code translate="no">proxy.slowQuerySpanInSeconds</code> المحددة في التكوين. تعرض قائمة الطلبات البطيئة جميع الطلبات البطيئة في آخر 15 دقيقة.</li>
</ul>
<h2 id="Configurations" class="common-anchor-header">التكوينات<button data-href="#Configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-configurations.png" alt="Milvus Web UI Configurations Page" class="doc-image" id="milvus-web-ui-configurations-page" />
   </span> <span class="img-wrapper"> <span>صفحة تكوينات واجهة مستخدم ويب ميلفوس ويب</span> </span></p>
<ul>
<li><strong>التكوينات</strong>: عرض قائمة تكوينات وقت تشغيل Milvus وقيمها.</li>
</ul>
<h2 id="Tools" class="common-anchor-header">الأدوات<button data-href="#Tools" class="anchor-icon" translate="no">
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
<li><p>أداة<strong>pprof</strong>: الوصول إلى أداة pprof لتنميط وتصحيح أخطاء ميلفوس.</p></li>
<li><p><strong>أداة تصور بيانات ميلفوس</strong>: الوصول إلى أداة تصور بيانات Milvus لتصور البيانات في Milvus.</p></li>
</ul>
