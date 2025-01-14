---
id: mmap.md
summary: يتيح MMap المزيد من البيانات في عقدة واحدة.
title: تخزين البيانات الممكّنة لخريطة الذاكرة
---
<h1 id="MMap-enabled-Data-Storage" class="common-anchor-header">تخزين البيانات الممكّنة لخريطة الذاكرة<button data-href="#MMap-enabled-Data-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>في Milvus، تسمح الملفات المعينة بالذاكرة بتعيين محتويات الملف مباشرة في الذاكرة. تعمل هذه الميزة على تحسين كفاءة الذاكرة، خاصةً في الحالات التي تكون فيها الذاكرة المتوفرة نادرة ولكن تحميل البيانات بالكامل غير ممكن. يمكن لآلية التحسين هذه أن تزيد من سعة البيانات مع ضمان الأداء حتى حد معين؛ ومع ذلك، عندما تتجاوز كمية البيانات الذاكرة بمقدار كبير، قد يعاني أداء البحث والاستعلام من تدهور خطير، لذا يرجى اختيار تشغيل هذه الميزة أو إيقاف تشغيلها حسب الاقتضاء.</p>
<h2 id="Configure-memory-mapping" class="common-anchor-header">تكوين تعيين الذاكرة<button data-href="#Configure-memory-mapping" class="anchor-icon" translate="no">
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
    </button></h2><p>بدءًا من Milvus 2.4، لديك المرونة لضبط ملف التكوين الثابت لتكوين إعدادات تعيين الذاكرة الافتراضية للمجموعة بأكملها قبل النشر. بالإضافة إلى ذلك، هناك خيار يمكنك من تغيير المعلمات ديناميكيًا لضبط إعدادات تعيين الذاكرة على مستوى المجموعة والفهرس. بالنظر إلى المستقبل، ستعمل التحديثات المستقبلية على توسيع إمكانيات تعيين الذاكرة لتشمل التكوينات على مستوى الحقل.</p>
<h3 id="Before-cluster-deployment-global-configuration" class="common-anchor-header">قبل نشر المجموعة: التكوين العام</h3><p>قبل نشر المجموعة، تطبق الإعدادات <strong>على مستوى المجموعة</strong> تعيين الذاكرة عبر المجموعة بأكملها. يضمن ذلك التزام جميع الكائنات الجديدة تلقائيًا بهذه التكوينات. من المهم ملاحظة أن تعديل هذه الإعدادات يتطلب إعادة تشغيل المجموعة لتصبح فعالة.</p>
<p>لضبط إعدادات تعيين ذاكرة مجموعتك، قم بتحرير الملف <code translate="no">configs/milvus.yaml</code>. ضمن هذا الملف، يمكنك تحديد ما إذا كنت تريد تمكين تعيين الذاكرة بشكل افتراضي وتحديد مسار الدليل لتخزين الملفات المعينة بالذاكرة. إذا تم ترك المسار (<code translate="no">mmapDirPath</code>) غير محدد، فسيقوم النظام افتراضيًا بتخزين الملفات المعينة للذاكرة في <code translate="no">{localStorage.path}/mmap</code>. لمزيد من المعلومات، راجع <a href="https://milvus.io/docs/configure_localstorage.md#localStoragepath">التكوينات المتعلقة بالتخزين المحلي</a>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># This parameter was set in configs/milvus.yaml</span>
...
queryNode:
  mmap:
    <span class="hljs-comment"># Set memory mapping property for whole cluster</span>
    mmapEnabled: false | true
    <span class="hljs-comment"># Set memory-mapped directory path, if you leave mmapDirPath unspecified, the memory-mapped files will be stored in {localStorage.path}/ mmap by default. </span>
    mmapDirPath: <span class="hljs-built_in">any</span>/valid/path 
....
<button class="copy-code-btn"></button></code></pre>
<p>بعد <code translate="no">2.4.10</code> ، ينقسم التكوين <code translate="no">queryNode.mmap.mmapEnabled</code> إلى أربعة حقول منفصلة أدناه، وجميع الإعدادات الافتراضية هي <code translate="no">false</code>:</p>
<ul>
<li><code translate="no">queryNode.mmap.vectorField</code>، يتحكم فيما إذا كانت بيانات المتجه هي mmap;</li>
<li><code translate="no">queryNode.mmap.vectorIndex</code>، يتحكم فيما إذا كان فهرس المتجه هو mmap;</li>
<li><code translate="no">queryNode.mmap.scalarField</code>، يتحكم فيما إذا كانت البيانات القياسية هي mmap;</li>
<li><code translate="no">queryNode.mmap.scalarIndex</code>، يتحكم فيما إذا كان الفهرس القياسي هو mmap;</li>
</ul>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># This parameter was set in configs/milvus.yaml</span>
...
queryNode:
  mmap:
    vectorField: false <span class="hljs-comment"># Enable mmap for loading vector data</span>
    vectorIndex: false <span class="hljs-comment"># Enable mmap for loading vector index</span>
    scalarField: false <span class="hljs-comment"># Enable mmap for loading scalar data</span>
    scalarIndex: false <span class="hljs-comment"># Enable mmap for loading scalar index</span>
....
<button class="copy-code-btn"></button></code></pre>
<p>بالإضافة إلى ذلك، يمكن فقط تشغيل وإيقاف تشغيل فهرس المتجه وبيانات المتجه mmap لمجموعة على حدة، ولكن ليس للآخرين.</p>
<p>التوافق: إذا تم تعيين التكوين الأصلي <code translate="no">queryNode.mmap.mmapEnabled</code> إلى <code translate="no">true</code> ، فسيتم تعيين التكوين المضاف حديثًا إلى <code translate="no">true</code> في هذا الوقت. إذا تم تعيين <code translate="no">queryNode.mmap.mmapEnabled</code> على <code translate="no">false</code> ، إذا تم تعيين التكوين الجديد على <code translate="no">true</code> ، فستكون القيمة النهائية <code translate="no">true</code>.</p>
<h3 id="During-cluster-operation-dynamic-configuration" class="common-anchor-header">أثناء تشغيل الكتلة: التكوين الديناميكي</h3><p>أثناء وقت تشغيل المجموعة، يمكنك ضبط إعدادات تعيين الذاكرة ديناميكيًا على مستوى المجموعة أو الفهرس.</p>
<p>على <strong>مستوى</strong> المجموعة، يتم تطبيق تعيين الذاكرة على جميع البيانات الأولية غير المفهرسة داخل المجموعة، باستثناء المفاتيح الأساسية والطوابع الزمنية ومعرفات الصفوف. هذا النهج مناسب بشكل خاص للإدارة الشاملة لمجموعات البيانات الكبيرة.</p>
<p>لإجراء تعديلات ديناميكية على إعدادات تعيين الذاكرة داخل مجموعة، استخدم الأسلوب <code translate="no">set_properties()</code>. هنا، يمكنك التبديل <code translate="no">mmap.enabled</code> بين <code translate="no">True</code> أو <code translate="no">False</code> حسب الحاجة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get existing collection</span>
collection = Collection(<span class="hljs-string">&quot;test_collection&quot;</span>) <span class="hljs-comment"># Replace with your collection name</span>

<span class="hljs-comment"># Set memory mapping property to True or Flase</span>
collection.set_properties({<span class="hljs-string">&#x27;mmap.enabled&#x27;</span>: <span class="hljs-literal">True</span>})
<button class="copy-code-btn"></button></code></pre>
<p>بعد <code translate="no">2.4.10</code> ، إعدادات تعيين الذاكرة داخل مجموعة، استخدم الأسلوب <code translate="no">add_field</code>. هنا، يمكنك التبديل <code translate="no">mmap_enabled</code> بين <code translate="no">True</code> أو <code translate="no">False</code> حسب الحاجة.</p>
<pre><code translate="no" class="language-python">schema = MilvusClient.create_schema()

schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, mmap_enabled=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>بالنسبة للإعدادات <strong>على مستوى الفهرس،</strong> يمكن تطبيق تعيين الذاكرة بشكل خاص على فهارس المتجهات دون التأثير على أنواع البيانات الأخرى. هذه الميزة لا تقدر بثمن بالنسبة للمجموعات التي تتطلب أداءً محسنًا لعمليات البحث عن المتجهات.</p>
<p>لتمكين أو تعطيل تعيين الذاكرة لفهرس داخل مجموعة، قم باستدعاء الأسلوب <code translate="no">alter_index()</code> ، مع تحديد اسم الفهرس الهدف في <code translate="no">index_name</code> وتعيين <code translate="no">mmap.enabled</code> إلى <code translate="no">True</code> أو <code translate="no">False</code>.</p>
<pre><code translate="no" class="language-python">collection.alter_index(
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Replace with your vector index name</span>
    extra_params={<span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">True</span>} <span class="hljs-comment"># Enable memory mapping for index</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Customize-storage-path-in-different-deployments" class="common-anchor-header">تخصيص مسار التخزين في عمليات النشر المختلفة<button data-href="#Customize-storage-path-in-different-deployments" class="anchor-icon" translate="no">
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
    </button></h2><p>يتم تعيين الملفات المعينة بالذاكرة افتراضيًا إلى الدليل <code translate="no">/mmap</code> داخل <code translate="no">localStorage.path</code>. إليك كيفية تخصيص هذا الإعداد عبر طرق النشر المختلفة:</p>
<ul>
<li>بالنسبة لـ Milvus المثبت باستخدام مخطط Helm:</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># new-values.yaml</span>
extraConfigFiles:
   user.yaml: |+
      queryNode:
         mmap:
           mmapEnabled: <span class="hljs-literal">true</span>
           mmapDirPath: any/valid/path
        
helm upgrade &lt;milvus-release&gt; --reuse-values -f new-values.yaml milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>بالنسبة ل Milvus المثبتة باستخدام مشغل Milvus:</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># patch.yaml</span>
spec:
  config:
    queryNode:
      mmap:
        mmapEnabled: <span class="hljs-literal">true</span>
        mmapDirPath: any/valid/path
      
 kubectl patch milvus &lt;milvus-name&gt; --patch-file patch.yaml
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>بالنسبة لـ Milvus المثبت باستخدام Docker:</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># A new installation script is provided to enable mmap-related settings.</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">الحدود<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>لا يمكن تمكين تعيين الذاكرة لمجموعة محملة، تأكد من تحرير المجموعة قبل تمكين تعيين الذاكرة.</p></li>
<li><p>تعيين الذاكرة غير مدعوم لفهارس DiskANN أو فئة GPU.</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">الأسئلة الشائعة<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>في أي السيناريوهات يوصى بتمكين تعيين الذاكرة؟ ما هي المفاضلات بعد تمكين هذه الميزة؟</strong></p>
<p>يوصى بتعيين الذاكرة عندما تكون الذاكرة محدودة أو عندما تكون متطلبات الأداء معتدلة. يؤدي تمكين هذه الميزة إلى زيادة سعة تحميل البيانات. على سبيل المثال، في حالة تكوين وحدتي معالجة مركزية وذاكرة بسعة 8 جيجابايت، يمكن أن يسمح تمكين تعيين الذاكرة بتحميل بيانات أكثر بما يصل إلى 4 أضعاف مقارنةً بعدم تمكينها. يختلف التأثير على الأداء:</p>
<ul>
<li><p>مع وجود ذاكرة كافية، يكون الأداء المتوقع مشابهًا لأداء استخدام الذاكرة فقط.</p></li>
<li><p>في حالة عدم كفاية الذاكرة، قد يتدهور الأداء المتوقع.</p></li>
</ul></li>
<li><p><strong>ما هي العلاقة بين تكوينات مستوى المجموعة ومستوى الفهرس؟</strong></p>
<p>مستوى التجميع ومستوى الفهرس ليست علاقات شاملة، يتحكم مستوى التجميع فيما إذا كانت البيانات الأصلية ممكّنة على مستوى الذاكرة أم لا، بينما مستوى الفهرس مخصص للفهارس المتجهة فقط.</p></li>
<li><p><strong>هل هناك أي نوع فهرس موصى به لتعيين الذاكرة؟</strong></p>
<p>نعم، يوصى باستخدام HNSW لتمكين mmap. لقد اختبرنا فهارس سلاسل HNSW و IVF_FLAT و IVF_PQ/SQ من قبل، وانخفض أداء فهارس سلسلة IVF بشكل خطير، بينما لا يزال انخفاض الأداء عند تشغيل mmap لفهارس HNSW ضمن التوقعات.</p></li>
<li><p><strong>ما نوع التخزين المحلي المطلوب لتعيين الذاكرة؟</strong></p>
<p>يعمل القرص عالي الجودة على تحسين الأداء، مع كون محركات أقراص NVMe الخيار المفضل.</p></li>
<li><p><strong>هل يمكن تعيين الذاكرة للبيانات القياسية؟</strong></p>
<p>يمكن تطبيق تعيين الذاكرة على البيانات القياسية، ولكن لا يمكن تطبيقه على الفهارس المبنية على الحقول القياسية.</p></li>
<li><p><strong>كيف يتم تحديد الأولوية لتكوينات تعيين الذاكرة عبر مستويات مختلفة؟</strong></p>
<p>في Milvus، عندما يتم تحديد تكوينات تعيين الذاكرة بشكل صريح عبر مستويات متعددة، تشترك التكوينات على مستوى الفهرس ومستوى المجموعة في الأولوية العليا، ثم تليها التكوينات على مستوى المجموعة.</p></li>
<li><p><strong>إذا قمتُ بالترقية من Milvus 2.3 وقمتُ بتكوين مسار دليل تعيين الذاكرة، ماذا سيحدث؟</strong></p>
<p>إذا قمت بالترقية من Milvus 2.3 وقمت بتكوين مسار دليل تعيين الذاكرة (<code translate="no">mmapDirPath</code>)، فسيتم الاحتفاظ بالتكوين الخاص بك، وسيكون الإعداد الافتراضي لتعيين الذاكرة الممكّن (<code translate="no">mmapEnabled</code>) <code translate="no">true</code>. من المهم ترحيل البيانات الوصفية لمزامنة تكوين ملفاتك الحالية المعينة للذاكرة. لمزيد من التفاصيل، راجع <a href="https://milvus.io/docs/upgrade_milvus_standalone-docker.md#Migrate-the-metadata">ترحيل البيانات الوصفية</a>.</p></li>
</ul>
