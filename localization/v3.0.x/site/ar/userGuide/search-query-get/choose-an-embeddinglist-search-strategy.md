---
id: choose-an-embeddinglist-search-strategy.md
title: اختر إستراتيجية بحث EmbeddingList
summary: >-
  تحدد استراتيجيات البحث في EmbeddingList الطريقة التي يبني بها Milvus فهرسًا
  تقريبيًّا للمرشحين من أجل البحث في EmbeddingList. الاستراتيجية الافتراضية هي
  tokenann. يمكنك التبديل إلى muvera أو lemur عندما تكون قائمة التضمين كبيرة، أو
  عندما تكون استراتيجية TokenANN مكلفة للغاية، أو عندما يكون التمثيل
  المُتعلم/المضغوط على مستوى الصف هو الخيار الأنسب. يتم إنتاج النتيجة النهائية
  عبر إعادة الترتيب بواسطة MaxSim عند تمكين الخيار emb_list_rerank.
---
<h1 id="Choose-an-EmbeddingList-Search-Strategy" class="common-anchor-header">اختر إستراتيجية بحث EmbeddingList<button data-href="#Choose-an-EmbeddingList-Search-Strategy" class="anchor-icon" translate="no">
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
    </button></h1><p>تحدد استراتيجيات البحث في EmbeddingList كيفية قيام Milvus بإنشاء فهرس مرشح تقريبي للبحث في EmbeddingList. الاستراتيجية الافتراضية هي " <code translate="no">tokenann</code>". يمكنك التبديل إلى " <code translate="no">muvera</code> " أو " <code translate="no">lemur</code> " عندما تكون قائمة التضمين كبيرة، أو عندما يكون TokenANN مكلفًا للغاية، أو عندما يكون التمثيل المُتعلم/المضغوط على مستوى الصفوف أكثر ملاءمة. لا تزال النتيجة النهائية تُنتج عن طريق إعادة الترتيب بواسطة MaxSim عند تمكين « <code translate="no">emb_list_rerank</code> ».</p>
<h2 id="Why-Search-Strategies-Exist" class="common-anchor-header">لماذا توجد استراتيجيات البحث<button data-href="#Why-Search-Strategies-Exist" class="anchor-icon" translate="no">
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
    </button></h2><p>تم تصميم قائمة التضمين (EmbeddingList) للصفوف التي تحتوي على متجهات متعددة، مثل تضمينات الرموز في مستند نصي، أو تضمينات البقع في مستند مرئي، أو تضمينات المقاطع في مقطع فيديو. بدلاً من مقارنة متجه استعلام واحد بمتجه صف واحد، يقارن MaxSim قائمة تضمينات الاستعلام بقائمة تضمينات المستند ويجمع أفضل التطابقات.</p>
<p>يوفر هذا قدرة تمثيل أفضل، لكن تطبيق MaxSim الدقيق مكلف عند التوسع. سيتطلب البحث باستخدام طريقة القوة الغاشمة في MaxSim مقارنة متجهات الاستعلام بكل متجه في كل صف مرشح. وعادةً ما يكون ذلك بطيئًا جدًّا بالنسبة للبحث في بيئة الإنتاج.</p>
<table>
<thead>
<tr><th>### المشكلة - قد يحتوي كل صف على العديد من المتجهات. - تنفيذ MaxSim الدقيق على جميع الصفوف مكلف. - قد يزداد حجم الفهرس وزمن استجابة البحث بسرعة.</th><th>### الإستراتيجية - استخدام طريقة استرجاع تقريبية في المرحلة الأولى. - استرجاع عدد من المرشحين أكبر من عدد topK المطلوب. - إعادة ترتيب المرشحين باستخدام MaxSim الدقيق.</th></tr>
</thead>
<tbody>
</tbody>
</table>
<p>وبهذا المعنى، فإن «البحث التقديري» ( <code translate="no">emb_list_strategy</code> ) هو في الأساس استراتيجية لبناء الفهرس واسترجاع المرشحين. يتم تكوينه عند بناء الفهرس، وهو يحدد كيفية إنتاج مجموعة المرشحين من الشبكة العصبية الاصطناعية (ANN) في المرحلة الأولى. ثم تتحكم المعلمات الخاصة بوقت البحث، مثل « <code translate="no">retrieval_ann_ratio</code> » و« <code translate="no">emb_list_rerank</code> »، في عدد المرشحين الذين يتم استرجاعهم وما إذا كان سيتم تطبيق إعادة الترتيب باستخدام MaxSim أم لا.</p>
<hr>
<h2 id="Available-Strategies" class="common-anchor-header">الاستراتيجيات المتاحة<button data-href="#Available-Strategies" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>الاستراتيجية</th><th>وحدة استرجاع المرشحين</th><th>ما تحله</th><th>أفضل مطابقة</th><th>المفاضلة الرئيسية</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">tokenann</code></td><td>المتجهات الفردية داخل كل صف</td><td>يحتفظ بالمتجهات الأصلية ويتجنب فقدان البيانات الناتج عن الضغط.</td><td>البحث الذي يركز على الجودة أولاً، وقوائم التضمين القصيرة أو المتوسطة، والتضمينات عالية التمييز.</td><td>فهرس أكبر وتكلفة أعلى لاسترجاع المرشحين.</td></tr>
<tr><td><code translate="no">muvera</code></td><td>متجه واحد مشفر لكل صف</td><td>يضغط قائمة التضمين إلى تمثيل FDE ذي أبعاد ثابتة دون الحاجة إلى التدريب.</td><td>المستندات الأطول، والتضمينات عالية التمييز، والحالات التي يكون فيها TokenANN ثقيلًا جدًّا.</td><td>يؤدي الإسقاط العشوائي إلى خسارة في الدقة؛ ويؤثر بُعد FDE على زمن الاستجابة.</td></tr>
<tr><td><code translate="no">lemur</code></td><td>متجه واحد مُتعلم لكل صف</td><td>يتعلم ضغطًا خاصًا بالمجموعة النصية من قوائم التضمين إلى متجهات صفية ذات أبعاد ثابتة.</td><td>التضمينات منخفضة التمييز، واسترجاع المستندات متعددة الوسائط أو المرئية، وقوائم التضمين الكبيرة.</td><td>يتطلب تدريبًا وقد يكون حساسًا لتوزيع المجموعة وللتحيز المتعلق بطول المستند.</td></tr>
</tbody>
</table>
<h2 id="TokenANN" class="common-anchor-header">TokenANN<button data-href="#TokenANN" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">tokenann</code> يقوم بفهرسة كل متجه في قائمة التضمين. أثناء البحث، يقوم كل متجه استعلام بإجراء استرجاع ANN، ويتم تجميع المتجهات المتطابقة مرة أخرى إلى صفوفها، ويتم إعادة ترتيب الصفوف المرشحة الناتجة باستخدام MaxSim.</p>
<div class="alert note">
<p><strong>استخدم TokenANN عندما تكون الجودة هي الأولوية الأولى.</strong> إنه أقرب تقريب لحساب MaxSim الأصلي لأنه يحافظ على توفر جميع المتجهات في فهرس المرحلة الأولى.</p>
</div>
<ul>
<li><p><strong>مناسب تمامًا:</strong> أجزاء نصية قصيرة، صفوف تحتوي على عدد صغير أو متوسط من المتجهات، فصل دلالي قوي على مستوى الرموز، خطوط أساس حساسة للجودة.</p></li>
<li><p><strong>أقل ملاءمة:</strong> المستندات الطويلة جدًّا، والصفحات المرئية التي تحتوي على آلاف متجهات الباتشات، وميزانيات الذاكرة أو زمن الاستجابة الصارمة.</p></li>
<li><p><strong>السلوك على مستوى العناصر:</strong> يمكن لـ TokenANN استرداد المرشحات من المتجهات الفردية قبل تجميعها مرة أخرى في صفوف. تظل نتيجة البحث النهائية في EmbeddingList على مستوى الصفوف بعد تقييم MaxSim.</p></li>
</ul>
<h2 id="MUVERA" class="common-anchor-header">MUVERA<button data-href="#MUVERA" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">muvera</code> يقوم بترميز كل قائمة تضمين إلى متجه ذي أبعاد ثابتة باستخدام إسقاطات عشوائية. وهذا يحول عملية الاسترجاع في المرحلة الأولى إلى بحث قياسي للمتجهات على مستوى الصفوف. ثم يتم إعادة ترتيب المرشحات باستخدام MaxSim.</p>
<div class="alert note">
<p><strong>استخدم MUVERA عندما يكون TokenANN ثقيلًا جدًّا ولكنك لا ترغب في خطوة تدريب.</strong> إنه حل وسط عملي بين الجودة والتكلفة.</p>
</div>
<ul>
<li><p><strong>مناسبة تمامًا:</strong> المستندات النصية الطويلة، ومساحات التضمين عالية التمييز، وأحمال العمل التي تتطلب حجم فهرس أصغر من TokenANN.</p></li>
<li><p><strong>الحالات الأقل ملاءمة:</strong> مساحات التضمين ذات التمييز المنخفض أو الحالات التي يصبح فيها تمثيل FDE عالي الأبعاد بشكل لا يتناسب مع ميزانية زمن الاستجابة.</p></li>
<li><p><strong>المعلمات المهمة:</strong><code translate="no">muvera_num_projections</code> و <code translate="no">muvera_num_repeats</code> و <code translate="no">muvera_seed</code>.</p></li>
</ul>
<h2 id="LEMUR" class="common-anchor-header">LEMUR<button data-href="#LEMUR" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">lemur</code> يقوم بتدريب نموذج لضغط كل قائمة تضمين إلى تمثيل ذي أبعاد ثابتة. يتم تشغيل البحث ANN في المرحلة الأولى على المتجهات المُتعلمة على مستوى الصفوف، ويتم إعادة ترتيب المرشحين باستخدام MaxSim.</p>
<div class="alert note">
<p><strong>استخدم LEMUR عندما يكون الضغط المُتعلم يستحق تكلفة التدريب.</strong> يمكن أن يعمل بشكل جيد مع مساحات التضمين منخفضة التمييز والاسترجاع متعدد الوسائط، ولكن يجب التحقق من صحته مقابل المجموعة النصية المستهدفة لأنه قد يكون حساسًا لتوزيع طول المستندات.</p>
</div>
<ul>
<li><p><strong>مناسب تمامًا:</strong> البحث عن المستندات المرئية، وتضمينات الرقع متعددة الوسائط، ومساحات التضمين منخفضة التمييز، وقوائم التضمين الكبيرة التي لا يكون فيها استخدام TokenANN عمليًا.</p></li>
<li><p><strong>أقل ملاءمة:</strong> المجموعات النصية المتغيرة باستمرار، والتضمينات عالية التمييز ذات أطوال المستندات شديدة الانحراف، وأحمال العمل التي تكون فيها تكلفة التدريب غير مقبولة.</p></li>
<li><p><strong>المعلمات المهمة:</strong><code translate="no">lemur_hidden_dim</code> ، <code translate="no">lemur_num_train_samples</code> ، <code translate="no">lemur_num_epochs</code> ، <code translate="no">lemur_batch_size</code> ، <code translate="no">lemur_learning_rate</code> ، <code translate="no">lemur_seed</code> ، و <code translate="no">lemur_num_layers</code>.</p></li>
</ul>
<hr>
<h2 id="Default-Behavior-and-Configuration" class="common-anchor-header">السلوك والتكوين الافتراضيان<button data-href="#Default-Behavior-and-Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>استراتيجية EmbeddingList الافتراضية في Knowhere هي <code translate="no">tokenann</code>. إذا لم تحدد <code translate="no">emb_list_strategy</code> ، فسيستخدم Knowhere TokenANN. تشمل الإعدادات الافتراضية لوقت البحث <code translate="no">retrieval_ann_ratio=3.0</code> و <code translate="no">emb_list_rerank=true</code>.</p>
<h2 id="Configuration-Items-by-Strategy" class="common-anchor-header">عناصر التكوين حسب الاستراتيجية<button data-href="#Configuration-Items-by-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>يسرد الجدول التالي عناصر التكوين الخاصة بكل استراتيجية. في Milvus، عادةً ما يتم تمرير عناصر وقت البناء في خريطة <code translate="no">params</code> عند إنشاء فهرس. إذا كنت بحاجة إلى قيم افتراضية من جانب الخادم، فيجب تعريفها في ملف تكوين Milvus ضمن قسم <code translate="no">knowhere</code>.</p>
<table>
<thead>
<tr><th>الاستراتيجية</th><th>عنصر التكوين</th><th>المرحلة</th><th>القيمة الافتراضية</th><th>متى يتم تغييره</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">tokenann</code></td><td><code translate="no">emb_list_strategy=&quot;tokenann&quot;</code></td><td>إنشاء الفهرس</td><td><code translate="no">tokenann</code></td><td>استخدمه بشكل صريح عندما تريد سلوك الفهرسة الافتراضي لمتجه العناصر أو عند استخدام DiskANN.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">emb_list_strategy=&quot;muvera&quot;</code></td><td>بناء الفهرس</td><td><code translate="no">tokenann</code></td><td>استخدمه عندما تريد استرجاعًا مشفرًا على مستوى الصفوف دون تدريب.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_num_projections</code></td><td>إنشاء الفهرس</td><td><code translate="no">4</code></td><td>يتحكم في عدد إسقاطات SimHash. تؤدي القيم الأعلى إلى إنشاء المزيد من المجموعات وقد تحسن جودة الترميز، ولكنها تزيد من أبعاد الترميز.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_num_repeats</code></td><td>إنشاء الفهرس</td><td><code translate="no">7</code></td><td>يتحكم في عدد عمليات الترميز FDE المستقلة التي يتم ربطها معًا. قد تؤدي القيم الأعلى إلى تحسين المتانة، ولكنها تزيد من تكلفة الفهرسة/البحث.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_seed</code></td><td>إنشاء الفهرس</td><td><code translate="no">42</code></td><td>يُضبط للحصول على إسقاطات عشوائية قابلة للتكرار، خاصة في الاختبارات ومقارنات المعايير.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">emb_list_strategy=&quot;lemur&quot;</code></td><td>بناء الفهرس</td><td><code translate="no">tokenann</code></td><td>يُستخدم عندما يُتوقع أن يعمل الضغط المُتعلم على مستوى الصفوف بشكل أفضل من الإسقاط العشوائي الثابت.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_hidden_dim</code></td><td>إنشاء الفهرس</td><td><code translate="no">256</code></td><td>يتحكم في حجم التمثيل المضغوط. قم بزيادته للحصول على سعة أكبر؛ وقم بتقليله لتقليل استخدام الذاكرة وتسريع عملية الاسترجاع.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_train_samples</code></td><td>إنشاء الفهرس</td><td><code translate="no">20000</code></td><td>قم بزيادته عندما يكون النص متنوعًا ويكون الضغط المُتعلم غير ملائم؛ وقم بتقليله فقط للاختبارات الصغيرة أو لعمليات الإنشاء الأسرع.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_epochs</code></td><td>بناء الفهرس</td><td><code translate="no">50</code></td><td>قم بزيادته إذا لم يتقارب التدريب؛ وقم بتقليله عندما يكون وقت الإنشاء هو القيد الرئيسي.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_batch_size</code></td><td>بناء الفهرس</td><td><code translate="no">512</code></td><td>اضبط وفقًا لإنتاجية التدريب واستخدام الذاكرة.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_learning_rate</code></td><td>بناء الفهرس</td><td><code translate="no">0.001</code></td><td>اضبطه عندما يكون التدريب غير مستقر أو يتقارب ببطء شديد.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_seed</code></td><td>بناء الفهرس</td><td><code translate="no">42</code></td><td>اضبطه لإجراء عمليات تدريب قابلة للتكرار.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_layers</code></td><td>بناء الفهرس</td><td><code translate="no">2</code></td><td>قم بزيادته فقط عندما يحتاج المجموع إلى مستخرج ميزات أكثر تعبيرًا ويمكنك تحمل تكلفة التدريب الإضافية.</td></tr>
<tr><td>جميع الاستراتيجيات</td><td><code translate="no">retrieval_ann_ratio</code></td><td>البحث</td><td><code translate="no">3.0</code></td><td>قم بزيادة القيمة لاسترداد المزيد من المرشحين في المرحلة الأولى وتحسين معدل الاسترجاع؛ وقم بتخفيضها لتقليل زمن الاستجابة.</td></tr>
<tr><td>جميع الاستراتيجيات</td><td><code translate="no">emb_list_rerank</code></td><td>البحث</td><td><code translate="no">true</code></td><td>اترك هذه الخيار مفعّلاً لإعادة ترتيب MaxSim. قم بتعطيله فقط في التجارب الخاضعة للرقابة حيث يتم قياس جودة الشبكة العصبية الاصطناعية (ANN) في المرحلة الأولى بشكل مباشر.</td></tr>
</tbody>
</table>
<h2 id="Configure-the-Strategy-in-Milvus" class="common-anchor-header">تكوين الاستراتيجية في Milvus<button data-href="#Configure-the-Strategy-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>في Milvus، يتم تمرير الاستراتيجية كمعلمة فهرس عند إنشاء فهرس في حقل EmbeddingList، مثل الحقل الفرعي للمتجه StructArray.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;clips[clip_embedding]&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">96</span>,
        <span class="hljs-string">&quot;emb_list_strategy&quot;</span>: <span class="hljs-string">&quot;muvera&quot;</span>,
        <span class="hljs-string">&quot;muvera_num_projections&quot;</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">&quot;muvera_num_repeats&quot;</span>: <span class="hljs-number">7</span>,
        <span class="hljs-string">&quot;muvera_seed&quot;</span>: <span class="hljs-number">42</span>,
    },
)
<button class="copy-code-btn"></button></code></pre>
<p>بالنسبة لـ LEMUR، قم بتوفير معلمات تدريب LEMUR في نفس خريطة <code translate="no">params</code>.</p>
<pre><code translate="no" class="language-python">params={
    <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
    <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">96</span>,
    <span class="hljs-string">&quot;emb_list_strategy&quot;</span>: <span class="hljs-string">&quot;lemur&quot;</span>,
    <span class="hljs-string">&quot;lemur_hidden_dim&quot;</span>: <span class="hljs-number">256</span>,
    <span class="hljs-string">&quot;lemur_num_train_samples&quot;</span>: <span class="hljs-number">20000</span>,
    <span class="hljs-string">&quot;lemur_num_epochs&quot;</span>: <span class="hljs-number">50</span>,
    <span class="hljs-string">&quot;lemur_batch_size&quot;</span>: <span class="hljs-number">512</span>,
    <span class="hljs-string">&quot;lemur_learning_rate&quot;</span>: <span class="hljs-number">0.001</span>,
    <span class="hljs-string">&quot;lemur_seed&quot;</span>: <span class="hljs-number">42</span>,
    <span class="hljs-string">&quot;lemur_num_layers&quot;</span>: <span class="hljs-number">2</span>,
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Server-side-Defaults-in-Milvus" class="common-anchor-header">تكوين الإعدادات الافتراضية من جانب الخادم في Milvus<button data-href="#Configure-Server-side-Defaults-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكن لـ Milvus أيضًا ملء معلمات الفهرس من <code translate="no">milvus.yaml</code>. القسم ذو الصلة هو <code translate="no">knowhere</code>. يتم تنظيم المعلمات حسب نوع الفهرس والمرحلة، باستخدام النمط <code translate="no">knowhere.&lt;INDEX_TYPE&gt;.&lt;stage&gt;.&lt;parameter&gt;</code>. معلمات الفهرس التي يوفرها المستخدم لها الأسبقية على هذه القيم الافتراضية.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">HNSW:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">emb_list_strategy:</span> <span class="hljs-string">muvera</span>
      <span class="hljs-attr">muvera_num_projections:</span> <span class="hljs-number">4</span>
      <span class="hljs-attr">muvera_num_repeats:</span> <span class="hljs-number">7</span>
      <span class="hljs-attr">muvera_seed:</span> <span class="hljs-number">42</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">retrieval_ann_ratio:</span> <span class="hljs-number">3.0</span>
      <span class="hljs-attr">emb_list_rerank:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>يفضل استخدام المعلمات الخاصة بكل فهرس لاختيار الاستراتيجية.</strong> تنطبق القيمة الافتراضية في ملف تكوين Milvus بشكل عام على الفهارس من ذلك النوع والمرحلة. استخدم معلمات <code translate="no">create_index</code> عندما تحتاج مجموعات أو حقول مختلفة إلى استراتيجيات EmbeddingList مختلفة.</p>
</div>
<h2 id="Configure-Candidate-Retrieval-at-Search-Time" class="common-anchor-header">تكوين استرجاع المرشحين في وقت البحث<button data-href="#Configure-Candidate-Retrieval-at-Search-Time" class="anchor-icon" translate="no">
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
    </button></h2><p>تحدد الاستراتيجية كيفية بناء الفهرس. في وقت البحث، استخدم <code translate="no">retrieval_ann_ratio</code> للتحكم في عدد المرشحين في المرحلة الأولى الذين يتم استرجاعهم قبل إعادة الترتيب باستخدام MaxSim. عادةً ما تؤدي القيم الأعلى إلى تحسين معدل الاسترجاع (recall) ولكنها تزيد من زمن الاستجابة.</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=collection_name,
    data=[query_embedding_list],
    anns_field=<span class="hljs-string">&quot;clips[clip_embedding]&quot;</span>,
    search_params={
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">64</span>,
            <span class="hljs-string">&quot;retrieval_ann_ratio&quot;</span>: <span class="hljs-number">3.0</span>,
            <span class="hljs-string">&quot;emb_list_rerank&quot;</span>: <span class="hljs-literal">True</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
)
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th>المعلمة</th><th>المرحلة</th><th>القيمة الافتراضية</th><th>المعنى</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">emb_list_strategy</code></td><td>بناء الفهرس</td><td><code translate="no">tokenann</code></td><td>يحدد كيفية فهرسة واسترجاع المرشحين في EmbeddingList.</td></tr>
<tr><td><code translate="no">retrieval_ann_ratio</code></td><td>البحث</td><td><code translate="no">3.0</code></td><td>معامل توسيع المرشحين للجولة الأولى من الشبكة العصبية الاصطناعية (ANN).</td></tr>
<tr><td><code translate="no">emb_list_rerank</code></td><td>البحث</td><td><code translate="no">true</code></td><td>تحديد ما إذا كان سيتم إعادة ترتيب المرشحين المسترجعين باستخدام MaxSim.</td></tr>
</tbody>
</table>
<div class="alert note">
<p><strong>ملاحظات التوافق:</strong> يدعم كل من MUVERA و LEMUR حاليًا بيانات fp32 في Knowhere. يدعم DiskANN قائمة EmbeddingList فقط مع استراتيجية TokenANN. إذا كنت تستخدم أنواع متجهات غير fp32 أو DiskANN، فتأكد من دعم الاستراتيجية قبل تغيير الإعداد الافتراضي.</p>
</div>
<hr>
<h2 id="How-to-Choose-a-Strategy" class="common-anchor-header">كيفية اختيار الاستراتيجية<button data-href="#How-to-Choose-a-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>لا توجد استراتيجية واحدة تعتبر الأفضل بشكل عام. اختر الاستراتيجية بناءً على طول قائمة التضمين، والتمييز في مساحة التضمين، وميزانية زمن الاستجابة، وحجم الفهرس، وما إذا كان بإمكانك تحمل خطوة التدريب أم لا.</p>
<table>
<thead>
<tr><th>السؤال</th><th>الإشارة</th><th>نقطة البداية الموصى بها</th></tr>
</thead>
<tbody>
<tr><td>هل تحتاج إلى خط أساس عالي الجودة؟</td><td>تريد قياس أفضل تقريب عملي قبل تحسين التكلفة.</td><td><code translate="no">tokenann</code></td></tr>
<tr><td>هل عدد المتجهات في كل صف قصير أم متوسط؟</td><td>يحتوي كل صف على عدد صغير من متجهات الرموز أو الباتشات أو المقاطع.</td><td><code translate="no">tokenann</code></td></tr>
<tr><td>هل TokenANN كبير جدًا أم بطيء جدًا؟</td><td>يُعد حجم الفهرس أو زمن استرجاع المرحلة الأولى هو عنق الزجاجة.</td><td><code translate="no">muvera</code></td></tr>
<tr><td>هل تريد الضغط دون تدريب؟</td><td>تحتاج إلى نموذج تشغيلي أبسط وترميز قابل للتكرار.</td><td><code translate="no">muvera</code></td></tr>
<tr><td>هل مساحة التضمين منخفضة التمييز؟</td><td>تتميز شبكات ANN المرشحة على مستوى الرموز بوجود ضوضاء، كما أن الإسقاط العشوائي لا يحافظ على إشارة كافية.</td><td><code translate="no">lemur</code></td></tr>
<tr><td>هل عبء العمل بصري أم متعدد الوسائط؟</td><td>تحتوي الصفوف على العديد من متجهات البقع، وتكلفة شبكة ANN على مستوى الرموز باهظة للغاية.</td><td><code translate="no">lemur</code> أو <code translate="no">muvera</code></td></tr>
<tr><td>هل طول المستندات متفاوت بشكل كبير؟</td><td>تحتوي بعض الصفوف على متجهات أكثر بكثير من غيرها.</td><td>ابدأ بـ <code translate="no">muvera</code> ؛ وتحقق من صحة <code translate="no">lemur</code> بعناية.</td></tr>
</tbody>
</table>
<h2 id="Suggested-Evaluation-Workflow" class="common-anchor-header">سير عمل التقييم المقترح<button data-href="#Suggested-Evaluation-Workflow" class="anchor-icon" translate="no">
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
<li><p>ابدأ بـ <code translate="no">tokenann</code> كخط أساس للجودة عندما يسمح حجم مجموعة البيانات بذلك.</p></li>
<li><p>قم بتشغيل نفس الاستعلامات باستخدام <code translate="no">muvera</code> وقارن بين معدل الاسترجاع وnDCG وزمن الاستجابة وحجم الفهرس.</p></li>
<li><p>جرب <code translate="no">lemur</code> عندما تكون قائمة التضمين كبيرة، أو تكون مساحة التضمين مشوشة، أو يكون عبء العمل مرئيًا أو متعدد الوسائط.</p></li>
<li><p>اضبط <code translate="no">retrieval_ann_ratio</code> قبل تغيير الكثير من معلمات وقت البناء. قم بزيادته إذا كان معدل الاسترجاع منخفضًا؛ وقم بتخفيضه إذا كان زمن الاستجابة مرتفعًا جدًّا.</p></li>
<li><p>قم دائمًا بالتحقق من صحة النتائج باستخدام استعلامات تمثيلية وتوزيعات طول المستندات. قد لا تنجح الاستراتيجية التي تعمل مع النصوص القصيرة مع المستندات المرئية أو مجموعات النصوص ذات الذيل الطويل.</p></li>
</ol>
<table>
<thead>
<tr><th>### الجودة أولاً ابدأ بـ <code translate="no">tokenann</code>. استخدمه كخط أساس لجودة تقريب MaxSim.</th><th>### التوازن جرب <code translate="no">muvera</code> عندما تحتاج إلى تكلفة أقل دون إضافة مسار تدريب.</th><th>### المضغوط: جرب <code translate="no">lemur</code> عندما يُرجح أن يتفوق الضغط المُتعلم على مستوى الصفوف على الإسقاط العشوائي الثابت.</th></tr>
</thead>
<tbody>
</tbody>
</table>
<hr>
<h2 id="References-Used-for-This-Draft" class="common-anchor-header">المراجع المستخدمة في هذه المسودة<button data-href="#References-Used-for-This-Draft" class="anchor-icon" translate="no">
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
<li><p>اختبارات Milvus لـ <code translate="no">emb_list_strategy</code> و <code translate="no">retrieval_ann_ratio</code> و <code translate="no">emb_list_rerank</code>.</p></li>
<li><p>معالجة ملفات التكوين في Milvus لإعدادات الفهرس الافتراضية من جانب الخادم ضمن قسم <code translate="no">knowhere</code>.</p></li>
<li><p>تعريفات معلمات Knowhere للقيم الافتراضية وأسماء الاستراتيجيات المدعومة.</p></li>
<li><p>فحوصات التوافق في Knowhere لـ MUVERA/LEMUR التي تعمل بـ fp32 فقط، ودعم DiskANN الذي يعمل بـ TokenANN فقط.</p></li>
<li><p>ملاحظات التقييم الداخلية التي تقارن بين TokenANN و MUVERA و LEMUR لاسترجاع المرشحين في MaxSim.</p></li>
</ul>
<div class="alert note">
<p><strong>ملاحظة بشأن النشر:</strong> قبل النشر خارجيًا، تحقق من المعلمات المدعومة رسميًا في إصدار Milvus المستهدف، وما إذا كان المنتج يرغب في الكشف عن جميع معلمات Knowhere منخفضة المستوى أم فقط مجموعة فرعية أصغر موثقة.</p>
</div>
