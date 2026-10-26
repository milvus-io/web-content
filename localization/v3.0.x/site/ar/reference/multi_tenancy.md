---
id: multi_tenancy.md
title: تنفيذ نظام الاستخدام المتعدد
summary: >-
  في Milvus، تعني ميزة «التعددية» أن عدة عملاء أو فرق — يُشار إليهم باسم
  «المستأجرين» — يتشاركون نفس المجموعة مع الحفاظ على بيئات بيانات منفصلة.
---
<h1 id="Implement-Multi-tenancy" class="common-anchor-header">تنفيذ نظام الاستخدام المتعدد<button data-href="#Implement-Multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h1><p>في Milvus، تعني ميزة تعدد المستأجرين أن عدة عملاء أو فرق — يُشار إليهم باسم <strong>المستأجرين</strong>— يتشاركون نفس المجموعة مع الحفاظ على بيئات بيانات معزولة.</p>
<p>يدعم Milvus أربع استراتيجيات للتعددية، تقدم كل منها توازنًا مختلفًا بين قابلية التوسع وعزل البيانات والمرونة. يرشدك هذا الدليل عبر كل خيار، مما يساعدك على اختيار الاستراتيجية الأنسب لحالة الاستخدام الخاصة بك.</p>
<h2 id="Multi-tenancy-strategies" class="common-anchor-header">استراتيجيات الاستخدام المتعدد<button data-href="#Multi-tenancy-strategies" class="anchor-icon" translate="no">
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
    </button></h2><p>يدعم Milvus الاستخدام المتعدد على أربعة مستويات: <strong>قاعدة البيانات</strong>، <strong>والمجموعة</strong>، <strong>والقسم</strong>، <strong>ومفتاح القسم</strong>.</p>
<h3 id="Database-level-multi-tenancy" class="common-anchor-header">التعددية على مستوى قاعدة البيانات<button data-href="#Database-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>مع الاستضافة المتعددة على مستوى قاعدة البيانات، يتلقى كل مستأجر <a href="/docs/ar/manage_databases.md">قاعدة بيانات</a> مقابلة تحتوي على مجموعة واحدة أو أكثر.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/database-level-multi-tenancy.png" alt="Database Level Multi Tenancy" class="doc-image" id="database-level-multi-tenancy" /> 
   <span>التعددية على مستوى قاعدة البيانات</span>
  
 </span></p>
<ul>
<li><p><strong>قابلية التوسع</strong>: تدعم استراتيجية الاستخدام المتعدد على مستوى قاعدة البيانات ما يصل إلى 64 مستأجرًا كحد أقصى بشكل افتراضي.</p></li>
<li><p><strong>عزل البيانات</strong>: يتم فصل البيانات في كل قاعدة بيانات بشكل كامل، مما يوفر عزلًا للبيانات على مستوى المؤسسات، وهو أمر مثالي للبيئات الخاضعة للتنظيم أو العملاء الذين لديهم احتياجات امتثال صارمة.</p></li>
<li><p><strong>المرونة</strong>: يمكن أن تحتوي كل قاعدة بيانات على مجموعات ذات مخططات مختلفة، مما يوفر تنظيمًا عالي المرونة للبيانات ويسمح لكل مستأجر بامتلاك مخطط البيانات الخاص به.</p></li>
<li><p><strong>أمور أخرى</strong>: تدعم هذه الاستراتيجية أيضًا نموذج RBAC، مما يتيح تحكمًا دقيقًا في وصول المستخدم لكل مستأجر. بالإضافة إلى ذلك، يمكنك تحميل البيانات أو تحريرها بمرونة لمستأجرين محددين لإدارة البيانات الساخنة والباردة بفعالية.</p></li>
</ul>
<h3 id="Collection-level-multi-tenancy" class="common-anchor-header">التعددية على مستوى المجموعات<button data-href="#Collection-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>مع التعددية على مستوى المجموعات، يتم تخصيص <a href="/docs/ar/manage-collections.md">مجموعة</a> لكل مستأجر، مما يوفر عزلًا قويًا للبيانات.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/collection-level-multi-tenancy.png" alt="Collection Level Multi Tenancy" class="doc-image" id="collection-level-multi-tenancy" /> 
   <span>التعددية على مستوى المجموعة</span>
  
 </span></p>
<ul>
<li><p><strong>قابلية التوسع</strong>: نظرًا لأن المجموعة يمكنها استيعاب ما يصل إلى 65,536 مجموعة بشكل افتراضي، يمكن لهذه الاستراتيجية استيعاب نفس العدد من المستأجرين داخل المجموعة.</p></li>
<li><p><strong>عزل البيانات</strong>: المجموعات معزولة ماديًا عن بعضها البعض. توفر هذه الاستراتيجية عزلًا قويًا للبيانات.</p></li>
<li><p><strong>المرونة</strong>: تتيح هذه الاستراتيجية لكل مجموعة أن يكون لها مخططها الخاص، مما يستوعب المستأجرين الذين لديهم مخططات بيانات مختلفة.</p></li>
<li><p><strong>أمور أخرى</strong>: تدعم هذه الاستراتيجية أيضًا نموذج RBAC، مما يتيح التحكم الدقيق في الوصول للمستأجرين. بالإضافة إلى ذلك، يمكنك تحميل أو تحرير البيانات بمرونة لمستأجرين محددين لإدارة البيانات الساخنة والباردة بفعالية.</p></li>
</ul>
<h3 id="Partition-level-multi-tenancy" class="common-anchor-header">التعددية على مستوى الأقسام<button data-href="#Partition-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>في التعددية على مستوى القسم، يتم تعيين كل مستأجر إلى <a href="/docs/ar/manage-partitions.md">قسم</a> تم إنشاؤه يدويًّا داخل مجموعة مشتركة.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/partition-level-multi-tenancy.png" alt="Partition Level Multi Tenancy" class="doc-image" id="partition-level-multi-tenancy" /> 
   <span>التعددية على مستوى القسم</span>
  
 </span></p>
<ul>
<li><p><strong>قابلية التوسع</strong>: يمكن أن تحتوي المجموعة الواحدة على ما يصل إلى 1,024 قسمًا، مما يسمح بوجود نفس العدد من المستأجرين داخلها.</p></li>
<li><p><strong>عزل البيانات</strong>: يتم فصل بيانات كل مستأجر ماديًا بواسطة الأقسام.</p></li>
<li><p><strong>المرونة</strong>: تتطلب هذه الاستراتيجية أن يتشارك جميع المستأجرين نفس مخطط البيانات. كما يجب إنشاء الأقسام يدويًا.</p></li>
<li><p><strong>أمور أخرى</strong>: لا يتم دعم نموذج RBAC على مستوى القسم. يمكن الاستعلام عن المستأجرين إما بشكل فردي أو عبر أقسام متعددة، مما يجعل هذا النهج مناسبًا تمامًا للسيناريوهات التي تتضمن استعلامات مجمعة أو تحليلات عبر شرائح المستأجرين. بالإضافة إلى ذلك، يمكنك تحميل البيانات أو تحريرها بمرونة لمستأجرين محددين لإدارة البيانات الساخنة والباردة بفعالية.</p></li>
</ul>
<h3 id="Partition-key-level-multi-tenancy" class="common-anchor-header">التعددية على مستوى مفتاح القسم<button data-href="#Partition-key-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>في هذه الاستراتيجية، يتشارك جميع المستأجرين مجموعة واحدة ومخططًا واحدًا، ولكن يتم توجيه بيانات كل مستأجر تلقائيًا إلى 16 قسمًا معزولًا ماديًا استنادًا إلى قيمة <a href="/docs/ar/use-partition-key.md">مفتاح القسم</a>. وعلى الرغم من أن كل قسم مادي يمكن أن يحتوي على مستأجرين متعددين، تظل البيانات من المستأجرين المختلفين منفصلة منطقيًا.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/partition-key-level-multi-tenancy.png" alt="Partition Key Level Multi Tenancy" class="doc-image" id="partition-key-level-multi-tenancy" /> 
   <span>التعددية على مستوى مفتاح التقسيم</span>
  
 </span></p>
<ul>
<li><p><strong>قابلية التوسع</strong>: توفر استراتيجية مستوى مفتاح التقسيم النهج الأكثر قابلية للتوسع، حيث تدعم ملايين المستأجرين.</p></li>
<li><p><strong>عزل البيانات</strong>: توفر هذه الاستراتيجية عزلًا ضعيفًا نسبيًا للبيانات لأن عدة مستأجرين يمكنهم مشاركة قسم مادي واحد.</p></li>
<li><p><strong>المرونة</strong>: نظرًا لأن جميع المستأجرين يجب أن يتشاركون نفس مخطط البيانات، فإن هذه الاستراتيجية توفر مرونة محدودة في البيانات.</p></li>
<li><p><strong>أمور أخرى</strong>: لا يتم دعم RBAC على مستوى مفتاح التقسيم. يمكن الاستعلام عن المستأجرين إما بشكل فردي أو عبر أقسام متعددة، مما يجعل هذا النهج مناسبًا تمامًا للسيناريوهات التي تتضمن استعلامات مجمعة أو تحليلات عبر شرائح المستأجرين.</p></li>
</ul>
<div class="alert note">
<p>نوصي بإنشاء فهرس قياسي على حقل مفتاح القسم. نظرًا لأن كل قسم مادي يحتوي على مستأجرين متعددين، يقوم Milvus بتقييم مرشح المستأجر مقابل كل كيان في الأقسام التي يتم البحث فيها، وبدون فهرس، فإن هذا يمثل مسحًا كاملاً. للحصول على التفاصيل، راجع <a href="/docs/ar/use-partition-key.md#Index-Partition-Key">فهرسة مفتاح القسم</a>.</p>
</div>
<h2 id="Choosing-the-right-multi-tenancy-strategy" class="common-anchor-header">اختيار استراتيجية الاستخدام المتعدد المناسبة<button data-href="#Choosing-the-right-multi-tenancy-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>يقدم الجدول أدناه مقارنة شاملة بين المستويات الأربعة لاستراتيجيات الاستخدام المتعدد.</p>
<table>
   <tr>
     <th></th>
     <th><p><strong>مستوى قاعدة البيانات</strong></p></th>
     <th><p><strong>مستوى المجموعة</strong></p></th>
     <th><p><strong>على مستوى القسم</strong></p></th>
     <th><p><strong>مستوى مفتاح التقسيم</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>عزل البيانات</strong></p></td>
     <td><p>المادي</p></td>
     <td><p>مادي</p></td>
     <td><p>مادي</p></td>
     <td><p>مادي + منطقي</p></td>
   </tr>
   <tr>
     <td><p><strong>الحد الأقصى لعدد المستأجرين</strong></p></td>
     <td><p>بشكل افتراضي، 64. يمكنك زيادة هذا العدد عن طريق تعديل المعلمة <code translate="no">maxDatabaseNum</code> في ملف التكوين Milvus.yaml. </p></td>
     <td><p>بشكل افتراضي، 65,536. يمكنك زيادته عن طريق تعديل المعلمة <code translate="no">maxCollectionNum</code> في ملف التكوين Milvus.yaml.</p></td>
     <td><p>ما يصل إلى 1,024 لكل مجموعة. </p></td>
     <td><p>ملايين</p></td>
   </tr>
   <tr>
     <td><p><strong>مرونة مخطط البيانات</strong></p></td>
     <td><p>عالية</p></td>
     <td><p>متوسطة</p></td>
     <td><p>منخفضة</p></td>
     <td><p>منخفضة</p></td>
   </tr>
   <tr>
     <td><p><strong>دعم نموذج RBAC</strong></p></td>
     <td><p>نعم</p></td>
     <td><p>نعم</p></td>
     <td><p>لا</p></td>
     <td><p>لا</p></td>
   </tr>
   <tr>
     <td><p><strong>أداء البحث</strong></p></td>
     <td><p>قوي</p></td>
     <td><p>قوي</p></td>
     <td><p>متوسط</p></td>
     <td><p>متوسط</p></td>
   </tr>
   <tr>
     <td><p><strong>دعم البحث عبر المستأجرين</strong></p></td>
     <td><p>لا</p></td>
     <td><p>لا</p></td>
     <td><p>نعم</p></td>
     <td><p>نعم</p></td>
   </tr>
   <tr>
     <td><p><strong>دعم المعالجة الفعالة للبيانات الساخنة والباردة</strong></p></td>
     <td><p>نعم</p></td>
     <td><p>نعم</p></td>
     <td><p>نعم</p></td>
     <td><p>لا لا يُدعم حاليًا لاستراتيجية مستوى مفتاح التقسيم.</p></td>
   </tr>
</table>
<p>هناك عدة عوامل يجب أخذها في الاعتبار عند اختيار استراتيجية الاستخدام المتعدد في Milvus.</p>
<ol>
<li><p><strong>قابلية التوسع:</strong> مفتاح التقسيم &gt; التقسيم &gt; المجموعة &gt; قاعدة البيانات</p>
<p>إذا كنت تتوقع دعم عدد كبير جدًا من المستأجرين (ملايين أو أكثر)، فاستخدم استراتيجية مستوى مفتاح التقسيم.</p></li>
<li><p><strong>متطلبات عزل البيانات الصارمة</strong>: قاعدة البيانات = المجموعة &gt; القسم &gt; مفتاح القسم</p>
<p>اختر استراتيجيات على مستوى قاعدة البيانات أو المجموعة أو القسم إذا كانت لديك متطلبات صارمة لعزل البيانات المادي.</p></li>
<li><p><strong>مخطط بيانات مرن لبيانات كل مستأجر:</strong> قاعدة البيانات &gt; المجموعة &gt; القسم = مفتاح القسم</p>
<p>توفر الاستراتيجيات على مستوى قاعدة البيانات والمجموعة مرونة كاملة في مخططات البيانات. إذا كانت هياكل بيانات المستأجرين مختلفة، فاختر الاستراتيجية متعددة المستأجرين على مستوى قاعدة البيانات أو المجموعة.</p></li>
<li><p><strong>أمور أخرى</strong></p>
<ol>
<li><p><strong>الأداء:</strong> يتحدد أداء البحث بناءً على عوامل متنوعة، بما في ذلك الفهارس ومعلمات البحث وتكوينات الأجهزة. كما يدعم Milvus ضبط الأداء. يُوصى باختبار الأداء الفعلي قبل اختيار استراتيجية الاستخدام المتعدد.</p></li>
<li><p><strong>التعامل الفعال مع البيانات الساخنة والباردة</strong>: حاليًا، تدعم الاستراتيجيات على مستوى قاعدة البيانات والمجموعات والأقسام التعامل مع البيانات الساخنة والباردة.</p></li>
<li><p><strong>عمليات البحث عبر المستأجرين</strong>: لا تدعم سوى الاستراتيجيات على مستوى القسم ومستوى مفتاح القسم الاستعلامات عبر المستأجرين.</p></li>
</ol></li>
</ol>
