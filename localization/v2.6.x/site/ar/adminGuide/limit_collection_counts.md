---
id: limit_collection_counts.md
title: وضع حدود على عدد التحصيل
---
<h1 id="Limit-Collection-Counts" class="common-anchor-header">الحد من عدد المجموعات<button data-href="#Limit-Collection-Counts" class="anchor-icon" translate="no">
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
    </button></h1><p>يسمح مثيل Milvus بحد أقصى 65,536 مجموعة. ومع ذلك، قد يؤدي وجود عدد كبير جدًا من المجموعات إلى حدوث مشكلات في الأداء. لذلك، يوصى بالحد من عدد المجموعات التي تم إنشاؤها في مثيل Milvus.</p>
<p>يوفر هذا الدليل إرشادات حول كيفية تعيين حدود لعدد المجموعات في مثيل Milvus.</p>
<p>يختلف التكوين باختلاف طريقة تثبيت مثيل Milvus.</p>
<ul>
<li><p>لمثيلات Milvus المثبتة باستخدام مخططات Helm</p>
<p>أضف التكوين إلى الملف <code translate="no">values.yaml</code> ضمن القسم <code translate="no">config</code>. للحصول على التفاصيل، راجع <a href="/docs/ar/configure-helm.md">تكوين Milvus باستخدام مخططات Helm Charts</a>.</p></li>
<li><p>لمثيلات Milvus المثبتة باستخدام Docker Compose</p>
<p>أضف التكوين إلى الملف <code translate="no">milvus.yaml</code> الذي استخدمته لبدء تشغيل مثيل Milvus. للحصول على التفاصيل، راجع <a href="/docs/ar/configure-docker.md">تكوين Milvus باستخدام Docker Compose</a>.</p></li>
<li><p>لمثيلات Milvus المثبتة باستخدام المشغل</p>
<p>أضف التكوين إلى قسم <code translate="no">spec.components</code> في المورد المخصص <code translate="no">Milvus</code>. للحصول على التفاصيل، راجع <a href="/docs/ar/configure_operator.md">تكوين Milvus مع المشغل</a>.</p></li>
</ul>
<h2 id="Configuration-options" class="common-anchor-header">خيارات التكوين<button data-href="#Configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml"><span class="hljs-attr">rootCoord:</span>
    <span class="hljs-attr">maxGeneralCapacity:</span> <span class="hljs-number">65536</span>
<button class="copy-code-btn"></button></code></pre>
<p>تقوم المعلمة <code translate="no">maxGeneralCapacity</code> بتعيين الحد الأقصى لعدد المجموعات التي يمكن لمثيل Milvus الحالي الاحتفاظ بها. القيمة الافتراضية هي <code translate="no">65536</code>.</p>
<h2 id="Calculating-the-number-of-collections" class="common-anchor-header">حساب عدد المجموعات<button data-href="#Calculating-the-number-of-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>في المجموعة، يمكنك إعداد أجزاء وأقسام متعددة. الأجزاء هي وحدات منطقية تستخدم لتوزيع عمليات كتابة البيانات بين عقد بيانات متعددة. أما الأقسام فهي وحدات منطقية تستخدم لتحسين كفاءة استرجاع البيانات عن طريق تحميل مجموعة فرعية فقط من بيانات المجموعة. عند حساب عدد المجموعات في مثيل Milvus الحالي، تحتاج أيضًا إلى حساب الأجزاء والأقسام.</p>
<p>على سبيل المثال، لنفترض أنك قمت بالفعل بإنشاء <strong>100</strong> مجموعة، مع وجود <strong>جزأين</strong> <strong>و4</strong> أقسام في <strong>60</strong> منها وجزء <strong>واحد</strong> <strong>و12</strong> قسمًا في <strong>الـ40</strong> مجموعة المتبقية. يمكن تحديد العدد الإجمالي لوحدات التجميع (محسوبًا على <code translate="no">shards × partitions</code>) على النحو التالي:</p>
<pre><code translate="no">60 (collections) x 2 (shards) x 4 (partitions) + 40 (collections) x 1 (shard) x 12 (partitions) = 960
<button class="copy-code-btn"></button></code></pre>
<p>في هذا المثال، يمثل المجموع المحسوب البالغ 960 وحدة تجميع يمثل الاستخدام الحالي. يحدد <code translate="no">maxGeneralCapacity</code> الحد الأقصى لعدد وحدات التجميع التي يمكن أن يدعمها المثيل، والذي يتم تعيينه على <code translate="no">65536</code> افتراضيًا. وهذا يعني أن المثيل يمكنه استيعاب ما يصل إلى 65,536 وحدة تجميع. إذا تجاوز العدد الإجمالي هذا الحد، سيعرض النظام رسالة الخطأ التالية:</p>
<pre><code translate="no" class="language-shell">failed checking constraint: sum_collections(parition*shard) exceeding the max general capacity:
<button class="copy-code-btn"></button></code></pre>
<p>لتجنب هذا الخطأ، يمكنك إما تقليل عدد الأجزاء أو الأقسام في المجموعات الحالية أو الجديدة أو حذف بعض المجموعات أو زيادة القيمة <code translate="no">maxGeneralCapacity</code>.</p>
