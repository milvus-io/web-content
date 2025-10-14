---
id: best-practices-for-array-of-structs.md
title: تصميم نموذج بيانات مع مجموعة من الهياكلCompatible with Milvus 2.6.4+
summary: >-
  تطبيقات الذكاء الاصطناعي الحديثة، خاصةً في إنترنت الأشياء (IoT) والقيادة
  الذاتية، عادةً ما تستند إلى أحداث غنية ومنظمة: قراءة مستشعر مع طابعها الزمني
  وتضمين متجهها، أو سجل تشخيصي مع رمز خطأ ومقتطف صوتي، أو مقطع رحلة مع الموقع
  والسرعة وسياق المشهد. يتطلب ذلك أن تدعم قاعدة البيانات أصلاً استيعاب البيانات
  المتداخلة والبحث فيها.
beta: Milvus 2.6.4+
---
<h1 id="Data-Model-Design-with-an-Array-of-Structs" class="common-anchor-header">تصميم نموذج بيانات مع مجموعة من الهياكل<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Data-Model-Design-with-an-Array-of-Structs" class="anchor-icon" translate="no">
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
    </button></h1><p>تطبيقات الذكاء الاصطناعي الحديثة، خاصة في إنترنت الأشياء (IoT) والقيادة الذاتية، عادةً ما تستند إلى أحداث غنية ومنظمة: قراءة مستشعر مع طابعها الزمني وتضمين متجهها، أو سجل تشخيصي مع رمز خطأ ومقتطف صوتي، أو مقطع رحلة مع الموقع والسرعة وسياق المشهد. يتطلب ذلك أن تدعم قاعدة البيانات أصلاً استيعاب البيانات المتداخلة والبحث فيها.</p>
<p>بدلًا من مطالبة المستخدم بتحويل أحداثه الهيكلية الذرية إلى نماذج بيانات مسطحة، يقدم Milvus مصفوفة الهياكل، حيث يمكن لكل هيكل في المصفوفة أن يحتوي على كميات قياسية ومتجهات، مع الحفاظ على التكامل الدلالي وتمكين التصفية المتداخلة القوية والبحث المختلط.</p>
<h2 id="Why-Array-of-Structs" class="common-anchor-header">لماذا صفيف الهياكل<button data-href="#Why-Array-of-Structs" class="anchor-icon" translate="no">
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
    </button></h2><p>تعتمد تطبيقات الذكاء الاصطناعي الحديثة، من القيادة الذاتية إلى الاسترجاع متعدد الوسائط، بشكل متزايد على البيانات المتداخلة وغير المتجانسة. وتكافح نماذج البيانات المسطحة التقليدية لتمثيل العلاقات المعقدة مثل<strong>"مستند واحد مع العديد من الأجزاء المشروحة</strong>" أو<strong>"مشهد قيادة واحد مع مناورات متعددة مرصودة</strong>". هذا هو المكان الذي يتألق فيه نوع بيانات Array of Structs في Milvus.</p>
<p>تسمح لك مصفوفة الهياكل بتخزين مجموعة مرتبة من العناصر المهيكلة، حيث تحتوي كل بنية على مجموعة خاصة بها من الحقول القياسية والتضمينات المتجهة. وهذا يجعلها مثالية لـ</p>
<ul>
<li><p><strong>البيانات الهرمية</strong>: الكيانات الأصلية ذات السجلات الفرعية المتعددة، مثل كتاب يحتوي على العديد من الأجزاء النصية، أو مقطع فيديو يحتوي على العديد من الإطارات المشروحة.</p></li>
<li><p><strong>التضمينات متعددة الوسائط</strong>: يمكن أن تحتوي كل بنية على متجهات متعددة، مثل تضمين النص بالإضافة إلى تضمين الصور، إلى جانب البيانات الوصفية.</p></li>
<li><p><strong>البيانات الزمنية أو المتسلسلة</strong>: تمثل الهياكل في حقل المصفوفة بشكل طبيعي سلاسل زمنية أو أحداث متسلسلة خطوة بخطوة.</p></li>
</ul>
<p>على عكس الحلول التقليدية التي تخزن نقاط JSON أو تقسم البيانات عبر مجموعات متعددة، توفر مصفوفة الهياكل تطبيقًا أصليًا للمخطط وفهرسة المتجهات والتخزين الفعال داخل Milvus.</p>
<h2 id="Schema-design-guidelines" class="common-anchor-header">إرشادات تصميم المخطط<button data-href="#Schema-design-guidelines" class="anchor-icon" translate="no">
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
    </button></h2><p>بالإضافة إلى جميع الإرشادات التي تمت مناقشتها في <a href="/docs/ar/schema-hands-on.md">تصميم نموذج البيانات للبحث،</a> يجب عليك أيضًا مراعاة الأمور التالية قبل البدء في استخدام مصفوفة الهياكل في تصميم نموذج البيانات الخاص بك.</p>
<h3 id="Define-the-Struct-schema" class="common-anchor-header">تحديد مخطط الهياكل<button data-href="#Define-the-Struct-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>قبل إضافة حقل المصفوفة إلى مجموعتك، حدد مخطط الهيكل الداخلي. يجب أن يكون كل حقل في الهيكل مكتوبًا بشكل صريح، سواءً كان مكتوبًا بشكل صريح، أو قياسيًا<strong>(VARCHAR،</strong> <strong>INT،</strong> <strong>BOOLEAN،</strong> إلخ) أو متجهًا<strong>(FLOAT_VECTOR</strong>).</p>
<p>يُنصح بالحفاظ على مخطط الهيكل بسيطًا من خلال تضمين الحقول التي ستستخدمها للاسترجاع أو العرض فقط. تجنب الانتفاخ بالبيانات الوصفية غير المستخدمة.</p>
<h3 id="Set-the-max-capacity-thoughtfully" class="common-anchor-header">عيّن السعة القصوى بعناية<button data-href="#Set-the-max-capacity-thoughtfully" class="anchor-icon" translate="no">
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
    </button></h3><p>يحتوي كل حقل مصفوفة على سمة تحدد الحد الأقصى لعدد العناصر التي يمكن أن يحتفظ بها حقل المصفوفة لكل كيان. قم بتعيين هذا بناءً على الحد الأعلى لحالة الاستخدام الخاصة بك. على سبيل المثال، هناك 1000 قطعة نصية لكل مستند، أو 100 مناورة لكل مشهد قيادة.</p>
<p>القيمة العالية للغاية تهدر الذاكرة، وستحتاج إلى إجراء بعض الحسابات لتحديد الحد الأقصى لعدد الهياكل في حقل المصفوفة.</p>
<h3 id="Index-vector-fields-in-Structs" class="common-anchor-header">فهرسة الحقول المتجهة في الهياكل<button data-href="#Index-vector-fields-in-Structs" class="anchor-icon" translate="no">
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
    </button></h3><p>تعتبر الفهرسة إلزامية للحقول المتجهة، بما في ذلك كل من الحقول المتجهة في مجموعة وتلك المحددة في بنية. بالنسبة للحقول المتجهة في هيكل، يجب استخدام <code translate="no">EMB_LIST_HNSW</code> كنوع الفهرس و <code translate="no">MAX_SIM</code> كنوع القياس.</p>
<p>للحصول على تفاصيل حول جميع الحدود المطبقة، راجع <a href="/docs/ar/array-of-structs.md#Limits">الحدود</a>.</p>
<h2 id="A-real-world-example-Modeling-the-CoVLA-dataset-for-autonomous-driving" class="common-anchor-header">مثال واقعي: نمذجة مجموعة بيانات CoVLA للقيادة الذاتية<button data-href="#A-real-world-example-Modeling-the-CoVLA-dataset-for-autonomous-driving" class="anchor-icon" translate="no">
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
    </button></h2><p>توفر مجموعة بيانات الرؤية-اللغة-الإجراء الشاملة (CoVLA)، التي قدمتها شركة <a href="https://tur.ing/posts/s1QUA1uh">Turing Motors</a> وتم قبولها في المؤتمر الشتوي لتطبيقات الرؤية الحاسوبية (WACV) لعام 2025، أساساً غنياً لتدريب وتقييم نماذج الرؤية-اللغة-الإجراء في القيادة الذاتية. ولا تحتوي كل نقطة بيانات، والتي عادةً ما تكون مقطع فيديو، على مدخلات بصرية أولية فحسب، بل تحتوي أيضاً على تعليقات منظمة تصف</p>
<ul>
<li><p><strong>سلوكيات مركبة الأنا</strong> (على سبيل المثال، "الانعطاف يسارًا أثناء الانعطاف إلى حركة المرور القادمة"),</p></li>
<li><p><strong>الأجسام المكتشفة</strong> الموجودة (على سبيل المثال، المركبات الأمامية والمشاة وإشارات المرور)، و</p></li>
<li><p><strong>شرح</strong> على مستوى الإطار للمشهد.</p></li>
</ul>
<p>هذه الطبيعة الهرمية والمتعددة الوسائط تجعلها مرشحة مثالية لميزة صفيف الهياكل. للحصول على تفاصيل حول مجموعة بيانات CoVLA، راجع <a href="https://turingmotors.github.io/covla-ad/">الموقع الإلكتروني لمجموعة بيانات CoVLA</a>.</p>
<h3 id="Step-1-Map-the-dataset-into-a-collection-schema" class="common-anchor-header">الخطوة 1: تعيين مجموعة البيانات في مخطط مجموعة<button data-href="#Step-1-Map-the-dataset-into-a-collection-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>مجموعة بيانات CoVLA عبارة عن مجموعة بيانات قيادة متعددة الوسائط وواسعة النطاق تضم 10,000 مقطع فيديو، بإجمالي أكثر من 80 ساعة من اللقطات. تقوم المجموعة بأخذ عينات من الإطارات بمعدل 20 هرتز وتعلق على كل إطار بتعليقات توضيحية مفصلة باللغة الطبيعية إلى جانب معلومات عن حالة السيارة وإحداثيات الأجسام المكتشفة.</p>
<p>هيكل مجموعة البيانات على النحو التالي:</p>
<pre><code translate="no" class="language-python">├── video_1                                       (VIDEO) <span class="hljs-comment"># video.mp4</span>
│   ├── video_id                                  (INT)
│   ├── video_url                                 (STRING)
│   ├── frames                                    (ARRAY)
│   │   ├── frame_1                               (STRUCT)
│   │   │   ├── caption                           (STRUCT) <span class="hljs-comment"># captions.jsonl</span>
│   │   │   │   ├── plain_caption                 (STRING)
│   │   │   │   ├── rich_caption                  (STRING)
│   │   │   │   ├── risk                          (STRING)
│   │   │   │   ├── risk_correct                  (BOOL)
│   │   │   │   ├── risk_yes_rate                 (FLOAT)
│   │   │   │   ├── weather                       (STRING)
│   │   │   │   ├── weather_rate                  (FLOAT)
│   │   │   │   ├── road                          (STRING)
│   │   │   │   ├── road_rate                     (FLOAT)
│   │   │   │   ├── is_tunnel                     (BOOL)
│   │   │   │   ├── is_tunnel_yes_rate            (FLOAT)
│   │   │   │   ├── is_highway                    (BOOL)
│   │   │   │   ├── is_highway_yes_rate           (FLOAT)
│   │   │   │   ├── has_pedestrain                (BOOL)
│   │   │   │   ├── has_pedestrain_yes_rate       (FLOAT)
│   │   │   │   ├── has_carrier_car               (BOOL)
│   │   │   ├── traffic_light                     (STRUCT) <span class="hljs-comment"># traffic_lights.jsonl</span>
│   │   │   │   ├── index                         (INT)
│   │   │   │   ├── <span class="hljs-keyword">class</span>                         (STRING)
│   │   │   │   ├── bbox                          (LIST&lt;FLOAT&gt;)
│   │   │   ├── front_car                         (STRUCT) <span class="hljs-comment"># front_cars.jsonl</span>
│   │   │   │   ├── has_lead                      (BOOL)
│   │   │   │   ├── lead_prob                     (FLOAT)
│   │   │   │   ├── lead_x                        (FLOAT)
│   │   │   │   ├── lead_y                        (FLOAT)
│   │   │   │   ├── lead_speed_kmh                (FLOAT)
│   │   │   │   ├── lead_a                        (FLOAT)
│   │   ├── frame_2                               (STRUCT)
│   │   ├── ...                                   (STRUCT)
│   │   ├── frame_n                               (STRUCT)
├── video_2
├── ...
├── video_n
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك أن تجد أن بنية مجموعة بيانات CoVLA هرمية إلى حد كبير، حيث تقسم البيانات المجمعة إلى عدة ملفات <code translate="no">.jsonl</code> ، إلى جانب مقاطع الفيديو بتنسيق <code translate="no">.mp4</code>.</p>
<p>في Milvus، يمكنك استخدام حقل JSON أو حقل Array-of-Structs لإنشاء بنيات متداخلة داخل مخطط المجموعة. عندما تكون التضمينات المتجهة جزءًا من التنسيق المتداخل، يتم دعم حقل صفيف من البنى فقط. ومع ذلك، لا يمكن أن تحتوي بنية داخل مصفوفة في حد ذاتها على هياكل متداخلة أخرى. لتخزين مجموعة بيانات CoVLA مع الاحتفاظ بالعلاقات الأساسية، تحتاج إلى إزالة التسلسل الهرمي غير الضروري وتسوية البيانات بحيث تناسب مخطط مجموعة Milvus.</p>
<p>يوضح الرسم البياني أدناه كيف يمكننا نمذجة مجموعة البيانات هذه باستخدام المخطط الموضح في المخطط التالي:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/dataset-model.png" alt="Dataset Model" class="doc-image" id="dataset-model" />
   </span> <span class="img-wrapper"> <span>نموذج مجموعة البيانات</span> </span></p>
<p>يوضح الرسم البياني أعلاه بنية مقطع الفيديو، والذي يتألف من الحقول التالية:</p>
<ul>
<li><p><code translate="no">video_id</code> بمثابة المفتاح الأساسي، والذي يقبل الأعداد الصحيحة من نوع INT64.</p></li>
<li><p><code translate="no">states</code> هو جسم JSON الخام الذي يحتوي على حالة مركبة الأنا في كل إطار من الفيديو الحالي.</p></li>
<li><p><code translate="no">captions</code> عبارة عن مصفوفة من الهياكل مع كل هيكل يحتوي على الحقول التالية:</p>
<ul>
<li><p><code translate="no">frame_id</code> تحدد إطارًا محددًا داخل الفيديو الحالي.</p></li>
<li><p><code translate="no">plain_caption</code> هو وصف للإطار الحالي بدون البيئة المحيطة، مثل الطقس، وحالة الطريق، وما إلى ذلك، و <code translate="no">plain_cap_vector</code> هو التضمين المتجه المقابل له.</p></li>
<li><p><code translate="no">rich_caption</code> هو وصف للإطار الحالي مع البيئة المحيطة، و <code translate="no">rich_cap_vector</code> هو التضمينات المتجهة المقابلة له.</p></li>
<li><p><code translate="no">risk</code> هو وصف للمخاطر التي تواجهها مركبة الأنا في الإطار الحالي، و <code translate="no">risk_vector</code> هو التضمينات المتجهة المقابلة لها، و</p></li>
<li><p>جميع السمات الأخرى للإطار، مثل <code translate="no">road</code> ، <code translate="no">weather</code> ، ، <code translate="no">is_tunnel</code> ، <code translate="no">has_pedestrain</code> ، إلخ...</p></li>
</ul></li>
<li><p><code translate="no">traffic_lights</code> هي هيئة JSON تحتوي على جميع إشارات المرور الضوئية المحددة في الإطار الحالي.</p></li>
<li><p><code translate="no">front_cars</code> هو أيضًا جسم JSON يحتوي على جميع السيارات الرائدة المحددة في الإطار الحالي.</p></li>
</ul>
<h3 id="Step-2-Initialize-the-schemas" class="common-anchor-header">الخطوة 2: تهيئة المخططات<button data-href="#Step-2-Initialize-the-schemas" class="anchor-icon" translate="no">
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
    </button></h3><p>للبدء، نحتاج إلى تهيئة المخطط الخاص ببنية التسمية التوضيحية والمجموعة.</p>
<ul>
<li><p>قم بتهيئة المخطط لهيكل التسمية التوضيحية.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># create the schema for the caption struct</span>
schema_for_caption = MilvusClient.create_struct_field_schema()

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;frame_id&quot;</span>,
    datatype=DataType.INT64,
    description=<span class="hljs-string">&quot;ID of the frame to which the ego vehicle&#x27;s behavior belongs&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;plain_caption&quot;</span>,
    datatype=DataType.VARCHAR,
    description=<span class="hljs-string">&quot;plain description of the ego vehicle&#x27;s behaviors&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;plain_cap_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    description=<span class="hljs-string">&quot;vectors for the plain description of the ego vehicle&#x27;s behaviors&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;rich_caption&quot;</span>,
    datatype=DataType.VARCHAR,
    description=<span class="hljs-string">&quot;rich description of the ego vehicle&#x27;s behaviors&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;rich_cap_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    description=<span class="hljs-string">&quot;vectors for the rich description of the ego vehicle&#x27;s behaviors&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;risk&quot;</span>,
    datatype=DataType.VARCHAR,
    description=<span class="hljs-string">&quot;description of the ego vehicle&#x27;s risks&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;risk_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    description=<span class="hljs-string">&quot;vectors for the description of the ego vehicle&#x27;s risks&quot;</span>
)

...
<button class="copy-code-btn"></button></code></pre></li>
<li><p>تهيئة المخطط الخاص بالمجموعة</p>
<pre><code translate="no" class="language-python">schema = MilvusClient.create_schema()

schema.add_field(
    field_name=<span class="hljs-string">&quot;video_id&quot;</span>,
    datatype=DataType.VARCHAR,
    description=<span class="hljs-string">&quot;primary key&quot;</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;video_url&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">512</span>,
    description=<span class="hljs-string">&quot;URL of the video&quot;</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;states&quot;</span>,
    datatype=DataType.JSON,
    description=<span class="hljs-string">&quot;frame-specific state of the ego vehicle in the current video&quot;</span>
)

<span class="highlighted-comment-line">schema.add_field(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;captions&quot;</span>,</span>
<span class="highlighted-comment-line">    datatype=DataType.ARRAY,</span>
<span class="highlighted-comment-line">    element_type=DataType.STRUCT,</span>
<span class="highlighted-comment-line">    struct_schema=struct_for_caption,</span>
<span class="highlighted-comment-line">    max_capacity=<span class="hljs-number">600</span>,</span>
<span class="highlighted-comment-line">    description=<span class="hljs-string">&quot;captions for the current video&quot;</span></span>
<span class="highlighted-comment-line">)</span>

schema.add_field(
    field_name=<span class="hljs-string">&quot;traffic_lights&quot;</span>,
    datatype=DataType.JSON,
    description=<span class="hljs-string">&quot;frame-specific traffic lights identified in the current video&quot;</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;front_cars&quot;</span>,
    datatype=DataType.JSON,
    description=<span class="hljs-string">&quot;frame-specific leading cars identified in the current video&quot;</span>
)
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="Step-3-Set-index-parameters" class="common-anchor-header">الخطوة 3: تعيين معلمات الفهرس<button data-href="#Step-3-Set-index-parameters" class="anchor-icon" translate="no">
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
    </button></h3><p>يجب فهرسة جميع الحقول المتجهة. لفهرسة حقول المتجهات في بنية عنصر، تحتاج إلى استخدام <code translate="no">EMB_LIST_HNSW</code> كنوع الفهرس ونوع المقياس <code translate="no">MAX_SIM</code> لقياس أوجه التشابه بين تضمينات المتجهات.</p>
<pre><code translate="no" class="language-python">index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;plain_cap_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">128</span>
    }
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;rich_cap_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">128</span>
    }
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;risk_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">128</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>يُنصح بتمكين تمزيق JSON لحقول JSON لتسريع التصفية داخل هذه الحقول.</p>
<h3 id="Step-4-Create-a-collection" class="common-anchor-header">الخطوة 4: إنشاء مجموعة<button data-href="#Step-4-Create-a-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>بمجرد أن تصبح المخططات والفهارس جاهزة، يمكنك إنشاء المجموعة المستهدفة على النحو التالي:</p>
<pre><code translate="no" class="language-python">client = MilvusClient(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;covla_dataset&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-5-Insert-the-data" class="common-anchor-header">الخطوة 5: إدراج البيانات<button data-href="#Step-5-Insert-the-data" class="anchor-icon" translate="no">
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
    </button></h3><p>ينظّم تورينج موتوس مجموعة بيانات CoVLA في ملفات متعددة، بما في ذلك مقاطع الفيديو الخام (<code translate="no">.mp4</code>)، والحالات (<code translate="no">states.jsonl</code>)، والتعليقات التوضيحية (<code translate="no">captions.jsonl</code>)، وإشارات المرور (<code translate="no">traffic_lights.jsonl</code>)، والسيارات الأمامية (<code translate="no">front_cars.jsonl</code>).</p>
<p>تحتاج إلى دمج أجزاء البيانات لكل مقطع فيديو من هذه الملفات وإدراج البيانات. فيما يلي كيان مدمج للرجوع إليها.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;video_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;0a0fc7a5db365174&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;video_url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;videos/0a0fc7a5db365174.mp4&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;states&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;0&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;trajectory&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">[</span><span class="hljs-number">0.0</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.0</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.0</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> ...<span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;extrinsic_matrix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">[</span><span class="hljs-number">-0.016034273081459105</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-0.9998714384933313</span><span class="hljs-punctuation">,</span> <span class="hljs-number">-8.280132118064406e-05</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.0</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> ...<span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;intrinsic_matrix&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">[</span><span class="hljs-number">2648.0</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.0</span><span class="hljs-punctuation">,</span> <span class="hljs-number">964.0</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> ...<span class="hljs-punctuation">]</span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;1&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>...<span class="hljs-punctuation">}</span>
        ...
        <span class="hljs-attr">&quot;599&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>...<span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;captions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;frame_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;plain_caption&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;The ego vehicle is moving at a moderate speed with deceleration and turning right. There are 2 traffic lights;one which displays a red signal, and one which displays a right arrow, and straight arrow signal. Caution is required because the distance between the ego vehicle and the leading car is narrow.&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;rich_caption&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;The ego vehicle is moving at a moderate speed with deceleration and turning right. There are 2 traffic lights;one which displays a red signal, and one which displays a right arrow, and straight arrow signal. Caution is required because the distance between the ego vehicle and the leading car is narrow. It is cloudy. The car is driving on a wide road. No pedestrians appear to be present. What the driver of ego vehicle should be careful is to maintain a safe distance from the leading car and to be prepared to stop if necessary&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;risk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;to maintain a safe distance from the leading car and to be prepared to stop if necessary&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;risk_correct&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;risk_yes_rate&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.6062515935356961</span><span class="hljs-punctuation">,</span>
            ...
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;frame_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span>
            ...
        <span class="hljs-punctuation">}</span>
        ...
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;frame_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">599</span>
            ...
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;traffic_lights&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;0&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;0&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;index&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;class&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;red&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;bbox&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">485.9914855957031</span><span class="hljs-punctuation">,</span> <span class="hljs-number">294.18536376953125</span><span class="hljs-punctuation">,</span> <span class="hljs-number">574.1666259765625</span><span class="hljs-punctuation">,</span> <span class="hljs-number">360.3130798339844</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">}</span>
            <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;1&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;index&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;class&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;right&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;bbox&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">487.6523742675781</span><span class="hljs-punctuation">,</span> <span class="hljs-number">294.0285339355469</span><span class="hljs-punctuation">,</span> <span class="hljs-number">574.2948608398438</span><span class="hljs-punctuation">,</span> <span class="hljs-number">359.5504455566406</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">}</span>
            <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;2&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;index&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;class&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;straight&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;bbox&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">487.6523742675781</span><span class="hljs-punctuation">,</span> <span class="hljs-number">294.0285339355469</span><span class="hljs-punctuation">,</span> <span class="hljs-number">574.2948608398438</span><span class="hljs-punctuation">,</span> <span class="hljs-number">359.5504455566406</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;1&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>...<span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
        ...
        <span class="hljs-attr">&quot;599&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>...<span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;front_cars&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;0&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;0&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;has_lead&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;lead_prob&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.967777669429779</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;lead_x&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">5.26953125</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;lead_y&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1.07421875</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;lead_speed_kmh&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">23.6953125</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;lead_a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.546875</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;1&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>...<span class="hljs-punctuation">]</span>
        ...
        <span class="hljs-attr">&quot;599&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>...<span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>بمجرد الانتهاء من معالجة البيانات وفقًا لذلك، يمكنك إدراجها على النحو التالي:</p>
<pre><code translate="no" class="language-python">data = [
    {<span class="hljs-string">&quot;video_id&quot;</span>: <span class="hljs-string">&quot;0a0fc7a5db365174&quot;</span>, ...}
    ...
]

client.insert(
    collection_name=<span class="hljs-string">&quot;covla_dataset&quot;</span>,
    data=data
)
<button class="copy-code-btn"></button></code></pre>
