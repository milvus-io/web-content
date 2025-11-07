---
id: boost-ranker.md
title: مصنف التعزيزCompatible with Milvus v2.6.2+
summary: >-
  بدلًا من الاعتماد فقط على التشابه الدلالي المحسوب على أساس المسافات المتجهة،
  يتيح لك برنامج Boost Rankers التأثير على نتائج البحث بطريقة مفيدة. وهي مثالية
  لتعديل نتائج البحث بسرعة باستخدام تصفية البيانات الوصفية.
beta: Milvus v2.6.2+
---
<h1 id="Boost-Ranker" class="common-anchor-header">مصنف التعزيز<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.2+</span><button data-href="#Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>بدلًا من الاعتماد فقط على التشابه الدلالي المحسوب على أساس المسافات المتجهة، يتيح لك مصنفات Boost Rankers التأثير على نتائج البحث بطريقة مفيدة. وهي مثالية لتعديل نتائج البحث بسرعة باستخدام تصفية البيانات الوصفية.</p>
<p>عندما يشتمل طلب البحث على دالة Boost Ranker، يستخدم Milvus شرط التصفية الاختياري داخل الدالة للعثور على التطابقات بين الكيانات المرشحة لنتائج البحث ويعزز درجات تلك التطابقات من خلال تطبيق الوزن المحدد، مما يساعد على ترقية أو تخفيض تصنيف الكيانات المتطابقة في النتيجة النهائية.</p>
<h2 id="When-to-use-Boost-Ranker" class="common-anchor-header">متى تستخدم أداة تعزيز التصنيف<button data-href="#When-to-use-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>على عكس مصنفات التصنيف الأخرى التي تعتمد على نماذج التشفير المتقاطع أو خوارزميات الدمج، يقوم مصنف التعزيز بإدخال قواعد اختيارية تعتمد على البيانات الوصفية مباشرةً في عملية التصنيف، مما يجعله أكثر ملاءمة في السيناريوهات التالية.</p>
<table>
   <tr>
     <th><p>حالة الاستخدام</p></th>
     <th><p>أمثلة</p></th>
     <th><p>لماذا يعمل مصنف التعزيز بشكل جيد</p></th>
   </tr>
   <tr>
     <td><p>تحديد أولويات المحتوى القائم على الأعمال التجارية</p></td>
     <td><ul><li><p>إبراز المنتجات المتميزة في نتائج بحث التجارة الإلكترونية</p></li><li><p>زيادة ظهور المحتوى ذي مقاييس المشاركة العالية للمستخدمين (مثل المشاهدات والإعجابات والمشاركات)</p></li><li><p>رفع مستوى المحتوى الحديث في تطبيقات البحث الحساسة للوقت</p></li><li><p>إعطاء الأولوية للمحتوى من المصادر الموثوقة أو التي تم التحقق منها</p></li><li><p>تعزيز النتائج التي تطابق العبارات الدقيقة أو الكلمات المفتاحية ذات الصلة العالية</p></li></ul></td>
     <td rowspan="2"><p>من دون الحاجة إلى إعادة إنشاء الفهارس أو تعديل نماذج تضمين المتجهات - وهي عمليات قد تستغرق وقتاً طويلاً - يمكنك على الفور ترقية عناصر محددة أو خفض مرتبتها في نتائج البحث من خلال تطبيق مرشحات بيانات التعريف الاختيارية في الوقت الفعلي. تتيح هذه الآلية تصنيفات بحث مرنة وديناميكية تتكيف بسهولة مع متطلبات العمل المتطورة.</p></td>
   </tr>
   <tr>
     <td><p>خفض التصنيف الاستراتيجي للمحتوى</p></td>
     <td><ul><li><p>تقليل بروز العناصر ذات المخزون المنخفض دون إزالتها بالكامل</p></li><li><p>خفض رتبة المحتوى الذي يحتوي على مصطلحات يُحتمل أن تكون مرفوضة دون رقابة</p></li><li><p>خفض رتبة الوثائق القديمة مع إبقائها متاحة في عمليات البحث التقنية</p></li><li><p>تقليل ظهور المنتجات المنافسة بشكل غير ملحوظ في عمليات البحث في السوق</p></li><li><p>تقليل ملاءمة المحتوى مع مؤشرات الجودة المنخفضة (مثل مشكلات التنسيق والطول القصير وما إلى ذلك)</p></li></ul></td>
   </tr>
</table>
<p>يمكنك أيضًا الجمع بين العديد من مصنفات التعزيز لتنفيذ استراتيجية تصنيف أكثر ديناميكية وقوة قائمة على الوزن.</p>
<h2 id="Mechanism-of-Boost-Ranker" class="common-anchor-header">آلية مُصنِّف التعزيز<button data-href="#Mechanism-of-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>يوضح الرسم البياني التالي سير العمل الرئيسي لمصنفي التعزيز.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/boost-ranker-mechanism.png" alt="Boost Ranker Mechanism" class="doc-image" id="boost-ranker-mechanism" />
   </span> <span class="img-wrapper"> <span>آلية مصنف المعزز المعزز</span> </span></p>
<p>عندما تقوم بإدراج البيانات، يقوم ميلفوس بتوزيعها عبر شرائح. أثناء البحث، يقوم كل مقطع بإرجاع مجموعة من المرشحين، ويقوم Milvus بترتيب هؤلاء المرشحين من جميع المقاطع للحصول على النتائج النهائية. عندما يتضمن طلب البحث مصنفًا معززًا، يطبقه Milvus على النتائج المرشحة من كل شريحة لمنع فقدان الدقة المحتمل وتحسين الاستدعاء.</p>
<p>قبل وضع اللمسات الأخيرة على النتائج، يعالج ميلفوس هؤلاء المرشحين باستخدام مصنف التعزيز على النحو التالي:</p>
<ol>
<li><p>يطبق تعبير التصفية الاختياري المحدد في Boost Ranker لتحديد الكيانات التي تطابق التعبير.</p></li>
<li><p>يطبق الوزن المحدد في Boost Ranker لتعزيز درجات الكيانات المحددة.</p></li>
</ol>
<div class="alert note">
<p>لا يمكنك استخدام Boost Ranker كمرتب معزز كمرتب في بحث مختلط متعدد النواقل. ومع ذلك، يمكنك استخدامه كمرتب في أي من طلباته الفرعية (<code translate="no">AnnSearchRequest</code>).</p>
</div>
<h2 id="Examples-of-Boost-Ranker" class="common-anchor-header">أمثلة على Boost Ranker<button data-href="#Examples-of-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>يوضح المثال التالي استخدام مصنف Boost Ranker في بحث أحادي المتجه يتطلب إرجاع الكيانات الخمسة الأولى الأكثر صلة وإضافة أوزان إلى درجات الكيانات ذات نوع المستند المجرد.</p>
<ol>
<li><p><strong>جمع نتائج البحث المرشحة في شرائح.</strong></p>
<p>يفترض الجدول التالي أن ميلفوس يوزع الكيانات في شريحتين<strong>(0001</strong> و <strong>0002</strong>)، حيث تقوم كل شريحة بإرجاع خمسة مرشحين.</p>
<p><table>
<tr>
<th><p>المعرف</p></th>
<th><p>نوع المستند</p></th>
<th><p>الدرجة</p></th>
<th><p>الرتبة</p></th>
<th><p>شريحة</p></th>
</tr>
<tr>
<td><p>117</p></td>
<td><p>مجردة</p></td>
<td><p>0.344</p></td>
<td><p>1</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>89</p></td>
<td><p>ملخص</p></td>
<td><p>0.456</p></td>
<td><p>2</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>الجسم</p></td>
<td><p>0.578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>العنوان</p></td>
<td><p>0.788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>الجسم</p></td>
<td><p>0.899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>الجسم</p></td>
<td><p>0.189</p></td>
<td><p>1</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>الجسم</p></td>
<td><p>0265</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>561</p></td>
<td><p>ملخص</p></td>
<td><p>0.366</p></td>
<td><p>3</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>344</p></td>
<td><p>ملخص</p></td>
<td><p>0.444</p></td>
<td><p>4</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>276</p></td>
<td><p>ملخص</p></td>
<td><p>0.845</p></td>
<td><p>5</p></td>
<td><p>0002</p></td>
</tr>
</table></p></li>
<li><p><strong>قم بتطبيق تعبير التصفية المحدد في بووست رانكر</strong> (<code translate="no">doctype='abstract'</code>).</p>
<p>كما هو مبين في الحقل <code translate="no">DocType</code> في الجدول التالي، سيضع ميلفوس علامة على جميع الكيانات التي تم تعيين <code translate="no">doctype</code> على <code translate="no">abstract</code> لمزيد من المعالجة.</p>
<p><table>
<tr>
<th><p>المعرف</p></th>
<th><p>نوع المستند</p></th>
<th><p>الدرجة</p></th>
<th><p>الرتبة</p></th>
<th><p>الجزء</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>مجردة</strong></p></td>
<td><p><strong>0.344</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>ملخص</strong></p></td>
<td><p><strong>0.456</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>الجسم</p></td>
<td><p>0.578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>العنوان</p></td>
<td><p>0.788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>الجسم</p></td>
<td><p>0.899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>الجسم</p></td>
<td><p>0.189</p></td>
<td><p>1</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>الجسم</p></td>
<td><p>0265</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>ملخص</strong></p></td>
<td><p><strong>0.366</strong></p></td>
<td><p><strong>3</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>ملخص</strong></p></td>
<td><p><strong>0.444</strong></p></td>
<td><p><strong>4</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>276</strong></p></td>
<td><p><strong>ملخص</strong></p></td>
<td><p><strong>0.845</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
</table></p></li>
<li><p><strong>تطبيق الوزن المحدد في Boost Ranker</strong> (<code translate="no">weight=0.5</code>).</p>
<p>سيتم ضرب جميع الكيانات المحددة في الخطوة السابقة بالوزن المحدد في Boost Ranker، مما يؤدي إلى تغييرات في رتبها.</p>
<p><table>
<tr>
<th><p>المعرف</p></th>
<th><p>نوع المستند</p></th>
<th><p>الدرجة</p></th>
<th><p>الدرجة المرجحة </p><p>(= الدرجة × الوزن)</p></th>
<th><p>الرتبة</p></th>
<th><p>الشريحة</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>ملخص</strong></p></td>
<td><p><strong>0.344</strong></p></td>
<td><p><strong>0.172</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>ملخص</strong></p></td>
<td><p><strong>0.456</strong></p></td>
<td><p><strong>0.228</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>الجسم</p></td>
<td><p>0.578</p></td>
<td><p>0.578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>العنوان</p></td>
<td><p>0.788</p></td>
<td><p>0.788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>الجسم</p></td>
<td><p>0.899</p></td>
<td><p>0.899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>ملخص</strong></p></td>
<td><p><strong>0.366</strong></p></td>
<td><p><strong>0.183</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>الجسم</p></td>
<td><p>0.189</p></td>
<td><p>0.189</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>ملخص</strong></p></td>
<td><p><strong>0.444</strong></p></td>
<td><p><strong>0.222</strong></p></td>
<td><p><strong>3</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>الجسم</p></td>
<td><p>0.265</p></td>
<td><p>0.265</p></td>
<td><p>4</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>276</strong></p></td>
<td><p><strong>ملخص</strong></p></td>
<td><p><strong>0.845</strong></p></td>
<td><p><strong>0.423</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
</table></p>
<p><div class="alert note"></p>
<p>يجب أن يكون الوزن رقمًا عائمًا تختاره أنت. في حالات مثل المثال أعلاه، حيث تشير الدرجة الأصغر إلى أهمية أكبر، استخدم وزنًا أقل من <strong>1</strong>. خلاف ذلك، استخدم وزنًا أكبر من <strong>1</strong>.</p>
<p></div></p></li>
<li><p><strong>قم بتجميع المرشحين من جميع الشرائح بناءً على الدرجات الموزونة لوضع النتائج النهائية.</strong></p>
<p><table>
<tr>
<th><p>المعرف</p></th>
<th><p>نوع المستند</p></th>
<th><p>الدرجة</p></th>
<th><p>الدرجة المرجحة</p></th>
<th><p>الرتبة</p></th>
<th><p>الجزء</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>ملخص</strong></p></td>
<td><p><strong>0.344</strong></p></td>
<td><p><strong>0.172</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>ملخص</strong></p></td>
<td><p><strong>0.366</strong></p></td>
<td><p><strong>0.183</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>الجسم</p></td>
<td><p>0.189</p></td>
<td><p>0.189</p></td>
<td><p>3</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>ملخص</strong></p></td>
<td><p><strong>0.444</strong></p></td>
<td><p><strong>0.222</strong></p></td>
<td><p><strong>4</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>ملخص</strong></p></td>
<td><p><strong>0.456</strong></p></td>
<td><p><strong>0.228</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
</table></p></li>
</ol>
<h2 id="Usage-of-Boost-Ranker" class="common-anchor-header">استخدام بووست رانكر المعزز<button data-href="#Usage-of-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>في هذا القسم، سترى أمثلة على كيفية استخدام Boost Ranker للتأثير على نتائج بحث أحادي المتجه.</p>
<h3 id="Create-a-Boost-Ranker" class="common-anchor-header">إنشاء مصنف معزز التصنيف<button data-href="#Create-a-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>قبل تمرير بووست رانكر المعزّز كمعيد ترتيب لطلب بحث، يجب عليك تعريف بووست رانكر المعزّز كدالة إعادة ترتيب على النحو التالي:</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#go">جو</a> <a href="#javascript">نودجيس</a> <a href="#bash">CURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

ranker = Function(
    name=<span class="hljs-string">&quot;boost&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;boost&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: <span class="hljs-string">&quot;doctype == &#x27;abstract&#x27;&quot;</span>,
        <span class="hljs-string">&quot;random_score&quot;</span>: { 
            <span class="hljs-string">&quot;seed&quot;</span>: <span class="hljs-number">126</span>,
            <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;id&quot;</span>
        },
        <span class="hljs-string">&quot;weight&quot;</span>: <span class="hljs-number">0.5</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.BoostRanker;

<span class="hljs-type">BoostRanker</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> BoostRanker.builder()
        .name(<span class="hljs-string">&quot;boost&quot;</span>)
        .filter(<span class="hljs-string">&quot;doctype == \&quot;abstract\&quot;&quot;</span>)
        .weight(<span class="hljs-number">5.0f</span>)
        .randomScoreField(<span class="hljs-string">&quot;id&quot;</span>)
        .randomScoreSeed(<span class="hljs-number">126</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> {<span class="hljs-title class_">FunctionType</span>} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> ranker = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;boost&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;boost&quot;</span>,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;doctype == &#x27;abstract&#x27;&quot;</span>,
    <span class="hljs-attr">random_score</span>: {
      <span class="hljs-attr">seed</span>: <span class="hljs-number">126</span>,
      <span class="hljs-attr">field</span>: <span class="hljs-string">&quot;id&quot;</span>,
    },
    <span class="hljs-attr">weight</span>: <span class="hljs-number">0.5</span>,
  },
};

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>مطلوب؟</p></th>
     <th><p>الوصف</p></th>
     <th><p>القيمة/مثال</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>نعم</p></td>
     <td><p>المعرف الفريد لهذه الوظيفة</p></td>
     <td><p><code translate="no">"boost"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>نعم</p></td>
     <td><p>قائمة بالحقول المتجهة لتطبيق الدالة عليها (يجب أن تكون فارغة لمصنف التعزيز)</p></td>
     <td><p><code translate="no">[]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>نعم</p></td>
     <td><p>نوع الدالة المراد استدعاؤها؛ استخدم <code translate="no">RERANK</code> لتحديد استراتيجية إعادة الترتيب</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>نعم</p></td>
     <td><p>تحديد نوع أداة إعادة الترتيب.</p><p>يجب ضبطه على <code translate="no">boost</code> لاستخدام Boost Ranker المعزز.</p></td>
     <td><p><code translate="no">"boost"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.weight</code></p></td>
     <td><p>نعم</p></td>
     <td><p>يحدد الوزن الذي سيتم ضربه في درجات أي كيانات مطابقة في نتائج البحث الأولية.</p><p>يجب أن تكون القيمة رقمًا ذا فاصلة عائمة. </p><ul><li><p>للتأكيد على أهمية الكيانات المطابقة، قم بتعيينه إلى قيمة تعزز الدرجات.</p></li><li><p>لتقليل أهمية الكيانات المطابقة، قم بتعيين هذه المعلمة بقيمة تقلل من درجاتها.</p></li></ul></td>
     <td><p><code translate="no">1</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.filter</code></p></td>
     <td><p>لا</p></td>
     <td><p>تحديد تعبير عامل التصفية الذي سيتم استخدامه لمطابقة الكيانات بين كيانات نتائج البحث. يمكن أن يكون أي تعبير تصفية أساسي صالح مذكور في <a href="/docs/ar/boolean.md">شرح التصفية</a>.</p><p><strong>ملاحظة</strong>: استخدم فقط العوامل الأساسية، مثل <code translate="no">==</code> أو <code translate="no">&gt;</code> أو أو <code translate="no">&lt;</code>. سيؤدي استخدام العوامل المتقدمة، مثل <code translate="no">text_match</code> أو <code translate="no">phrase_match</code> ، إلى خفض أداء البحث.</p></td>
     <td><p><code translate="no">"doctype == 'abstract'"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.random_score</code></p></td>
     <td><p>لا يوجد</p></td>
     <td><p>يحدد الدالة العشوائية التي تولد قيمة بين <code translate="no">0</code> و <code translate="no">1</code> عشوائيًا. لها الوسيمتان الاختياريتان التاليتان:</p><ul><li><p><code translate="no">seed</code> (رقم) يحدد القيمة الأولية المستخدمة لبدء مولد الأرقام العشوائية الزائفة (PRNG).</p></li><li><p><code translate="no">field</code> (سلسلة) يحدد اسم الحقل الذي سيتم استخدام قيمته كعامل عشوائي في توليد الرقم العشوائي. يكفي وجود حقل بقيم فريدة.</p><p>يُنصح بتعيين كل من <code translate="no">seed</code> و <code translate="no">field</code> لضمان الاتساق عبر الأجيال باستخدام نفس البذرة وقيم الحقل.</p></li></ul></td>
     <td><p><code translate="no">{"seed": 126, "field": "id"}</code></p></td>
   </tr>
</table>
<h3 id="Search-with-a-single-Boost-Ranker" class="common-anchor-header">البحث باستخدام مصنف معزز واحد<button data-href="#Search-with-a-single-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>بمجرد أن تصبح دالة Boost Ranker جاهزة، يمكنك الإشارة إليها في طلب بحث. يفترض المثال التالي أنك قد أنشأت بالفعل مجموعة تحتوي على الحقول التالية: <strong>المعرف،</strong> <strong>والمتجه،</strong> <strong>والنوع</strong>.</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#go">جو</a> <a href="#javascript">نودجيس</a> <a href="#bash">CURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Connect to the Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Assume you have a collection set up</span>

<span class="hljs-comment"># Conduct a similarity search using the created ranker</span>
client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    params={},
    output_field=[<span class="hljs-string">&quot;doctype&quot;</span>],
    ranker=ranker
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());
        
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{-<span class="hljs-number">0.619954f</span>, <span class="hljs-number">0.447943f</span>, -<span class="hljs-number">0.174938f</span>, -<span class="hljs-number">0.424803f</span>, -<span class="hljs-number">0.864845f</span>})))
        .annsField(<span class="hljs-string">&quot;vector&quot;</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;doctype&quot;</span>))
        .functionScore(FunctionScore.builder()
                .addFunction(ranker)
                .build())
        .build());
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-comment">// Connect to the Milvus server</span>
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;localhost:19530&#x27;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&#x27;root:Milvus&#x27;</span>
});

<span class="hljs-comment">// Assume you have a collection set up</span>

<span class="hljs-comment">// Conduct a similarity search</span>
<span class="hljs-keyword">const</span> searchResults = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
  <span class="hljs-attr">data</span>: [-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&#x27;vector&#x27;</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;doctype&#x27;</span>],
  <span class="hljs-attr">rerank</span>: ranker,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Search results:&#x27;</span>, searchResults);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Search-with-multiple-Boost-Rankers" class="common-anchor-header">البحث مع عدة مصنفات معززة متعددة<button data-href="#Search-with-multiple-Boost-Rankers" class="anchor-icon" translate="no">
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
    </button></h3><p>يمكنك دمج العديد من مصنّفي Boost في بحث واحد للتأثير على نتائج البحث. للقيام بذلك، قم بإنشاء العديد من مصنفات Boost Rankers، وقم بالرجوع إليها في مثيل <strong>FunctionScore،</strong> واستخدم مثيل <strong>FunctionScore</strong> كمصنّف في طلب البحث.</p>
<p>يوضح المثال التالي كيفية تعديل درجات جميع الكيانات المحددة من خلال تطبيق وزن بين <strong>0.8</strong> و <strong>1.2</strong>.</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#go">جو</a> <a href="#javascript">نودجيس</a> <a href="#bash">CURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType, FunctionScore

<span class="hljs-comment"># Create a Boost Ranker with a fixed weight</span>
fix_weight_ranker = Function(
    name=<span class="hljs-string">&quot;boost&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;boost&quot;</span>,
        <span class="hljs-string">&quot;weight&quot;</span>: <span class="hljs-number">0.8</span>
    }
)

<span class="hljs-comment"># Create a Boost Ranker with a randomly generated weight between 0 and 0.4</span>
random_weight_ranker = Function(
    name=<span class="hljs-string">&quot;boost&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;boost&quot;</span>,
        <span class="hljs-string">&quot;random_score&quot;</span>: {
            <span class="hljs-string">&quot;seed&quot;</span>: <span class="hljs-number">126</span>,
        },
        <span class="hljs-string">&quot;weight&quot;</span>: <span class="hljs-number">0.4</span>
    }
)

<span class="hljs-comment"># Create a Function Score</span>
ranker = FunctionScore(
    functions=[
        fix_weight_ranker, 
        random_weight_ranker
    ],
    params={
        <span class="hljs-string">&quot;boost_mode&quot;</span>: <span class="hljs-string">&quot;Multiply&quot;</span>,
        <span class="hljs-string">&quot;function_mode&quot;</span>: <span class="hljs-string">&quot;Sum&quot;</span>
    }
)

<span class="hljs-comment"># Conduct a similarity search using the created Function Score</span>
client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    params={},
    output_field=[<span class="hljs-string">&quot;doctype&quot;</span>],
    ranker=ranker
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">fixWeightRanker</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
                 .functionType(FunctionType.RERANK)
                 .name(<span class="hljs-string">&quot;boost&quot;</span>)
                 .param(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>)
                 .param(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.8&quot;</span>)
                 .build();
                 
CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">randomWeightRanker</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
                 .functionType(FunctionType.RERANK)
                 .name(<span class="hljs-string">&quot;boost&quot;</span>)
                 .param(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>)
                 .param(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.4&quot;</span>)
                 .param(<span class="hljs-string">&quot;random_score&quot;</span>, <span class="hljs-string">&quot;{\&quot;seed\&quot;: 126}&quot;</span>)
                 .build();

Map&lt;String, String&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;boost_mode&quot;</span>,<span class="hljs-string">&quot;Multiply&quot;</span>);
params.put(<span class="hljs-string">&quot;function_mode&quot;</span>,<span class="hljs-string">&quot;Sum&quot;</span>);     
<span class="hljs-type">FunctionScore</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> FunctionScore.builder()
                 .addFunction(fixWeightRanker)
                 .addFunction(randomWeightRanker)
                 .params(params)
                 .build()

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
                 .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
                 .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{-<span class="hljs-number">0.619954f</span>, <span class="hljs-number">0.447943f</span>, -<span class="hljs-number">0.174938f</span>, -<span class="hljs-number">0.424803f</span>, -<span class="hljs-number">0.864845f</span>})))
                 .annsField(<span class="hljs-string">&quot;vector&quot;</span>)
                 .outputFields(Collections.singletonList(<span class="hljs-string">&quot;doctype&quot;</span>))
                 .addFunction(ranker)
                 .build());
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> {<span class="hljs-title class_">FunctionType</span>} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> fix_weight_ranker = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;boost&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;boost&quot;</span>,
    <span class="hljs-attr">weight</span>: <span class="hljs-number">0.8</span>,
  },
};

<span class="hljs-keyword">const</span> random_weight_ranker = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;boost&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;boost&quot;</span>,
    <span class="hljs-attr">random_score</span>: {
      <span class="hljs-attr">seed</span>: <span class="hljs-number">126</span>,
    },
    <span class="hljs-attr">weight</span>: <span class="hljs-number">0.4</span>,
  },
};

<span class="hljs-keyword">const</span> ranker = {
  <span class="hljs-attr">functions</span>: [fix_weight_ranker, random_weight_ranker],
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">boost_mode</span>: <span class="hljs-string">&quot;Multiply&quot;</span>,
    <span class="hljs-attr">function_mode</span>: <span class="hljs-string">&quot;Sum&quot;</span>,
  },
};

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">data</span>: [[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>]],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;vector&quot;</span>,
  <span class="hljs-attr">params</span>: {},
  <span class="hljs-attr">output_field</span>: [<span class="hljs-string">&quot;doctype&quot;</span>],
  <span class="hljs-attr">ranker</span>: ranker
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>على وجه التحديد، هناك نوعان من مصنّفي التعزيز: أحدهما يطبّق وزنًا ثابتًا على جميع الكيانات التي تم العثور عليها، بينما يعيّن الآخر وزنًا عشوائيًا لها. بعد ذلك، نشير إلى هذين المصنفين في <strong>FunctionScore،</strong> والذي يحدد أيضًا كيفية تأثير الأوزان على درجات الكيانات التي تم العثور عليها.</p>
<p>يسرد الجدول التالي المعلمات المطلوبة لإنشاء مثيل <strong>FunctionScore</strong>.</p>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>مطلوب؟</p></th>
     <th><p>الوصف</p></th>
     <th><p>القيمة/مثال</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">functions</code></p></td>
     <td><p>نعم</p></td>
     <td><p>تحديد أسماء المصنفين المستهدفين في قائمة.</p></td>
     <td><p><code translate="no">["fix_weight_ranker", "random_weight_ranker"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.boost_mode</code></p></td>
     <td><p>لا يوجد</p></td>
     <td><p>يحدد كيفية تأثير الأوزان المحددة على درجات أي كيانات مطابقة.</p><p>القيم الممكنة هي:</p><ul><li><p><code translate="no">Multiply</code></p><p>تشير إلى أن القيمة الموزونة تساوي الدرجة الأصلية للكيان المطابق مضروبة في الوزن المحدد. </p><p>هذه هي القيمة الافتراضية.</p></li><li><p><code translate="no">Sum</code></p><p>تشير إلى أن القيمة الموزونة تساوي مجموع الدرجة الأصلية للكيان المطابق والوزن المحدد</p></li></ul></td>
     <td><p><code translate="no">"Sum"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function_mode</code></p></td>
     <td><p>لا يوجد</p></td>
     <td><p>يحدد كيفية معالجة القيم الموزونة من مختلف مصنفات التعزيز المختلفة.</p><p>القيم الممكنة هي:</p><ul><li><p><code translate="no">Multiply</code></p><p>تشير إلى أن الدرجة النهائية للكيان المطابق تساوي حاصل ضرب القيم الموزونة من جميع مصنفات التصنيف المعززة.</p><p>هذه هي القيمة الافتراضية.</p></li><li><p><code translate="no">Sum</code></p><p>تشير إلى أن الدرجة النهائية للكيان المطابق تساوي مجموع القيم الموزونة من جميع مصنفات التصنيف المعززة.</p></li></ul></td>
     <td><p><code translate="no">"Sum"</code></p></td>
   </tr>
</table>
