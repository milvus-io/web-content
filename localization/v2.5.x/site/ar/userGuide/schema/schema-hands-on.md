---
id: schema-hands-on.md
title: التدريب العملي على تصميم المخطط
summary: >-
  يدعم Milvus تحديد نموذج البيانات من خلال مخطط مجموعة. وتنظم المجموعة البيانات
  غير المهيكلة مثل النصوص والصور، إلى جانب تمثيلاتها المتجهية، بما في ذلك
  المتجهات الكثيفة والمتناثرة بدقة مختلفة تستخدم للبحث الدلالي. بالإضافة إلى
  ذلك، يدعم Milvus تخزين وتصفية أنواع البيانات غير المتجهة التي تسمى "Scalar".
  تشمل الأنواع العددية BOOL و INT8/16/32/64 و FLOAT/DOUBLE و VARCHAR و JSON و
  Array.
---
<h1 id="Schema-Design-Hands-On​" class="common-anchor-header">التدريب العملي على تصميم المخطط<button data-href="#Schema-Design-Hands-On​" class="anchor-icon" translate="no">
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
    </button></h1><p>تُعد أنظمة استرجاع المعلومات (IR)، والمعروفة أيضًا باسم البحث، ضرورية لتطبيقات الذكاء الاصطناعي المختلفة مثل التوليد المعزز للاسترجاع (RAG) والبحث عن الصور والتوصية بالمنتجات. تتمثل الخطوة الأولى في تطوير نظام استرجاع المعلومات في تصميم نموذج البيانات، والذي يتضمن تحليل متطلبات العمل، وتحديد كيفية تنظيم المعلومات، وفهرسة البيانات لجعلها قابلة للبحث الدلالي.</p>
<p>يدعم Milvus تحديد نموذج البيانات من خلال مخطط تجميع. وتنظم المجموعة البيانات غير المهيكلة مثل النصوص والصور، إلى جانب تمثيلاتها المتجهة، بما في ذلك المتجهات الكثيفة والمتناثرة بدقة مختلفة تستخدم للبحث الدلالي. بالإضافة إلى ذلك، يدعم Milvus تخزين وتصفية أنواع البيانات غير المتجهة التي تسمى &quot;Scalar&quot;. تشمل الأنواع العددية BOOL و INT8/16/32/64 و FLOAT/DOUBLE و VARCHAR و JSON و Array.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/schema-hands-on.png" alt="Example data schema designed for searching news article" class="doc-image" id="example-data-schema-designed-for-searching-news-article" />
   </span> <span class="img-wrapper"> <span>مثال على مخطط بيانات مصمم للبحث في مقالة إخبارية</span> </span></p>
<p>يتضمن تصميم نموذج البيانات لنظام البحث تحليل احتياجات العمل وتجريد المعلومات في نموذج بيانات معبّر عن المخطط. على سبيل المثال، للبحث في جزء من النص، يجب &quot;فهرسته&quot; عن طريق تحويل السلسلة الحرفية إلى متجه من خلال &quot;التضمين&quot;، مما يتيح البحث في المتجه. بالإضافة إلى هذا الشرط الأساسي، قد يكون من الضروري تخزين خصائص أخرى مثل الطابع الزمني للنشر والمؤلف. تسمح هذه البيانات الوصفية بتنقيح عمليات البحث الدلالي من خلال التصفية، بحيث لا تُعيد سوى النصوص المنشورة بعد تاريخ محدد أو من قبل مؤلف معين. قد يلزم أيضًا استرجاعها مع النص الرئيسي، لعرض نتيجة البحث في التطبيق. ولتنظيم هذه الأجزاء النصية، يجب تعيين معرّف فريد لكل منها، يتم التعبير عنه كعدد صحيح أو سلسلة. هذه العناصر ضرورية لتحقيق منطق بحث متطور.</p>
<p>يعد المخطط المصمم جيدًا مهمًا لأنه يلخص نموذج البيانات ويقرر ما إذا كان يمكن تحقيق أهداف العمل من خلال البحث. علاوة على ذلك، نظرًا لأن كل صف من البيانات التي يتم إدراجها في المجموعة يجب أن يتبع المخطط، فإنه يساعد بشكل كبير في الحفاظ على اتساق البيانات والجودة على المدى الطويل. من من منظور تقني، يؤدي المخطط المحدد جيدًا إلى تخزين بيانات الأعمدة بشكل جيد التنظيم وهيكل فهرس أنظف، مما يمكن أن يعزز أداء البحث.</p>
<h1 id="An-Example-News-Search​" class="common-anchor-header">مثال على ذلك: البحث عن الأخبار<button data-href="#An-Example-News-Search​" class="anchor-icon" translate="no">
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
    </button></h1><p>لنفترض أننا نريد إنشاء بحث لموقع إلكتروني إخباري ولدينا مجموعة من الأخبار مع نصوص وصور مصغرة وبيانات وصفية أخرى. أولاً، نحتاج أولاً إلى تحليل كيفية استخدام البيانات لدعم متطلبات العمل الخاصة بالبحث. تخيل أن المتطلب هو استرداد الأخبار استنادًا إلى الصورة المصغرة وملخص المحتوى، وأخذ البيانات الوصفية مثل معلومات المؤلف ووقت النشر كمعايير لتصفية نتيجة البحث. يمكن تقسيم هذه المتطلبات إلى.</p>
<ul>
<li><p>للبحث عن الصور من خلال النص، يمكننا تضمين الصور في متجهات عبر نموذج تضمين متعدد الوسائط يمكنه تعيين بيانات النص والصورة في نفس المساحة الكامنة.</p></li>
<li><p>يتم تضمين النص الموجز لمقالة ما في متجهات عبر نموذج تضمين النص.</p></li>
<li><p>للتصفية استنادًا إلى وقت النشر، يتم تخزين التواريخ كحقل قياسي ويلزم وجود فهرس للحقل القياسي للتصفية الفعالة. يمكن تخزين هياكل بيانات أخرى أكثر تعقيدًا مثل JSON في عدد قياسي وإجراء بحث مصفى على محتوياتها (فهرسة JSON ميزة قادمة).</p></li>
<li><p>لاسترداد الصورة المصغرة للصور بالبايت وعرضها على صفحة نتائج البحث، يتم تخزين عنوان url الخاص بالصورة أيضًا. وبالمثل، لنص الملخص والعنوان. (بدلاً من ذلك، يمكننا تخزين بيانات النص الخام وبيانات ملف الصورة كحقول قياسية إذا لزم الأمر).</p></li>
<li><p>لتحسين نتيجة البحث على النص الملخص، نقوم بتصميم نهج بحث هجين. بالنسبة لأحد مسارات الاسترجاع، نستخدم نموذج التضمين العادي لتوليد متجه كثيف من النص، مثل OpenAI's <code translate="no">text-embedding-3-large</code> أو نموذج <code translate="no">bge-large-en-v1.5</code> المفتوح المصدر. هذه النماذج جيدة في تمثيل الدلالات الإجمالية للنص. والمسار الآخر هو استخدام نماذج التضمين المتناثر مثل BM25 أو SPLADE لتوليد متجه متناثر، يشبه البحث في النص الكامل الذي يجيد استيعاب التفاصيل والمفاهيم الفردية في النص. يدعم Milvus استخدام كليهما في نفس مجموعة البيانات بفضل ميزة المتجهات المتعددة. يمكن إجراء البحث على متجهات متعددة في عملية واحدة <code translate="no">hybrid_search()</code>.</p></li>
<li><p>أخيرًا، نحتاج أيضًا إلى حقل معرّف لتحديد كل صفحة أخبار فردية، يشار إليه رسميًا باسم "كيان" في مصطلحات ميلفوس. يُستخدم هذا الحقل كمفتاح أساسي (أو "pk" اختصارًا).</p></li>
</ul>
<table data-block-token="EOxnd1GqhoODuWx4UyucOMahn0e"><thead><tr><th data-block-token="P2g0djnY5oRKT7xw7aSceiaQnRb" colspan="1" rowspan="1"><p data-block-token="TrIsdjxzooLqxUxiqkTcfN5pnHd">اسم الحقل</p>
</th><th data-block-token="KVq4dDr4BovOHSxtWd5cZBnnnn5" colspan="1" rowspan="1"><p data-block-token="D9uYdwp8ToHqXmxqueVcBAi2n6b">article_id (المفتاح الأساسي)</p>
</th><th data-block-token="O6jTdN4rBouwtQxFNgpcM7GFnyp" colspan="1" rowspan="1"><p data-block-token="IJuldjRIeoNHRgx0ix5c2eBSn6f">العنوان</p>
</th><th data-block-token="V4EKdYzLqoENTTxXuOwcVTIGnLg" colspan="1" rowspan="1"><p data-block-token="Tldydg7BboZeSUxiaTfcUnsfnqd">المؤلف_المعلومات</p>
</th><th data-block-token="GHF6dqGRVoQ6Kpxv9tUcijFXnVc" colspan="1" rowspan="1"><p data-block-token="Ih0jdg4yToRJOkxyriwcKJ39nVd">نشر_ت</p>
</th><th data-block-token="Ui3ldA2BwovU8LxMHcIcrmVvnLg" colspan="1" rowspan="1"><p data-block-token="PJGJdX1efoo647xvgCDcuhkznye">صورة_url</p>
</th><th data-block-token="VCskd6ySvocz8IxF5CVcpmF5n0b" colspan="1" rowspan="1"><p data-block-token="Cx7idKjgYoctpYxsnskc7OD0nxb">متجه_الصورة</p>
</th><th data-block-token="WSbhdTqglocn3KxpvBscFOh2n6d" colspan="1" rowspan="1"><p data-block-token="Q16ods013oZUOQxk9vicK0JGn2e">ملخص</p>
</th><th data-block-token="T5HAdXwado1qJpxCpf9cwDjmnhe" colspan="1" rowspan="1"><p data-block-token="ZG3odG5k2oMqFSxM8TFcE8kZnCh">ملخص_المتجه_الكثيف</p>
</th><th data-block-token="MWAHdYgIvogpIfxsRnscz5WWnOe" colspan="1" rowspan="1"><p data-block-token="MeU1dGziaodmTkxc5q9cvYR9ndd">ملخص_ملخص_المتجه_الكثيف</p>
</th></tr></thead><tbody><tr><td data-block-token="V1x7d7y15oxxNSxpvRJcoW7VnWh" colspan="1" rowspan="1"><p data-block-token="X9old4LgooPgrexElIBc2JgNnac">النوع</p>
</td><td data-block-token="EWlPdiRtBoqrOYxLoWDcnPUQn3f" colspan="1" rowspan="1"><p data-block-token="TtABd1mq0o2ShTxtXfncI8i9n8g">INT64</p>
</td><td data-block-token="ZICad5qEYohcTvxo477cZIWInCh" colspan="1" rowspan="1"><p data-block-token="CBHWdVhLKo2wn1xR3Pocf43NnRs">VARCHAR</p>
</td><td data-block-token="VTwJdpuQboqurJxXbQUctG8fnNc" colspan="1" rowspan="1"><p data-block-token="OI1ldgzbAoEIOUx7boRcooR0nvb">JSON</p>
</td><td data-block-token="UVWKdd69Mo8hyyxOqLLcZn7kncc" colspan="1" rowspan="1"><p data-block-token="QJUZdxgzEora0PxAxf8c1axknbp">INT32</p>
</td><td data-block-token="Wf8AdfYj1on0OkxjHkocPiqInYe" colspan="1" rowspan="1"><p data-block-token="KE0QdVg3doF05Exq3fmccqOcnvc">VARCHAR</p>
</td><td data-block-token="JVHgd9P9aoSl9mxqoFfcM7ownXz" colspan="1" rowspan="1"><p data-block-token="TwotdcMshoE2TSxGIauclTZjnLh">FLOAT_VECTOR</p>
</td><td data-block-token="MUwwdyV4co3V2QxOxc1cMuD9nbc" colspan="1" rowspan="1"><p data-block-token="RpfxdP0AHoW0xhx8sfBclJvtnyc">VARCHAR</p>
</td><td data-block-token="P4bqdeIGOoV67FxhYmtclfBpn1d" colspan="1" rowspan="1"><p data-block-token="RyztdWGXzoP4IBxHd8Pcu0q2nbe">FLOAT_VECTOR</p>
</td><td data-block-token="AtJldXTWUoT5FPxY6EncUqWsnrc" colspan="1" rowspan="1"><p data-block-token="FJMJdqKeFodc73xGlnpcYgJanWg">متناثر_مُتجه_مُتفرق</p>
</td></tr><tr><td data-block-token="ZAKYdJAv6oj5IxxYUaUcLFOEnkh" colspan="1" rowspan="1"><p data-block-token="Frr0dWnzWo5UFDxLfqaceqvSnmg">تحتاج إلى فهرس</p>
</td><td data-block-token="ONHadATa9ojiwAxEwUdcaJpOnbb" colspan="1" rowspan="1"><p data-block-token="ZGT8dgMGbo8r22xpFztcycKDn9c">N</p>
</td><td data-block-token="E3Hod6CkXozMt4x0xF6cPkdin4e" colspan="1" rowspan="1"><p data-block-token="Ha0PdI0byocer9xXJGac8QYdnPg">N</p>
</td><td data-block-token="NaJ5dcptooRPe8xk9VTcx6Amnld" colspan="1" rowspan="1"><p data-block-token="U57edD6zqoPY7LxQjPDcnNDVnxc">N (الدعم قريبًا)</p>
</td><td data-block-token="MqejdtkWboMHmZxWWCAcK7X0n1e" colspan="1" rowspan="1"><p data-block-token="NeNJdcEvloQ4E7xN9JeczCORnQX">Y</p>
</td><td data-block-token="VKy3driI9owHhCx1l4Iczj8Hnkb" colspan="1" rowspan="1"><p data-block-token="QRWQdK0J3oWYc0x8xT6c4Me5nXb">N</p>
</td><td data-block-token="EZR0dRNXpotMtdxAKG9cHj8zn2c" colspan="1" rowspan="1"><p data-block-token="LTyRduM2FoGmkVxa1HgceBFbnKf">Y</p>
</td><td data-block-token="W3MydyW7bod6UaxdNURcqTnBnFb" colspan="1" rowspan="1"><p data-block-token="EwbCdu2ZZop4zJxbyhZcR2HunUh">N</p>
</td><td data-block-token="XQdvd35mVov5cUxstzpcipmlni8" colspan="1" rowspan="1"><p data-block-token="SJoudzWmiouT20xXCCpcQR1Mnsz">Y</p>
</td><td data-block-token="MXntdRmaUo91QoxGeNgc9goanee" colspan="1" rowspan="1"><p data-block-token="Sxfzdk7VoocU6kxAV63cI3ObnTe">Y</p>
</td></tr></tbody></table>
<h1 id="How-to-Implement-the-Example-Schema​" class="common-anchor-header">كيفية تنفيذ مخطط المثال<button data-href="#How-to-Implement-the-Example-Schema​" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Create-Schema​" class="common-anchor-header">إنشاء مخطط<button data-href="#Create-Schema​" class="anchor-icon" translate="no">
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
    </button></h2><p>أولاً، نقوم بإنشاء مثيل عميل Milvus، والذي يمكن استخدامه للاتصال بخادم Milvus وإدارة المجموعات والبيانات. </p>
<p>لإعداد مخطط، نستخدم <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a> لإنشاء كائن مخطط و <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md"><code translate="no">add_field()</code></a> لإضافة حقول إلى المخطط.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
collection_name = <span class="hljs-string">&quot;my_collection&quot;</span>​
​
<span class="hljs-comment"># client = MilvusClient(uri=&quot;http://localhost:19530&quot;)​</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)​
​
schema = MilvusClient.create_schema(​
    auto_id=<span class="hljs-literal">False</span>,​
)​
​
schema.add_field(field_name=<span class="hljs-string">&quot;article_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article id&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;title&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">200</span>, description=<span class="hljs-string">&quot;article title&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;author_info&quot;</span>, datatype=DataType.JSON, description=<span class="hljs-string">&quot;author information&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;publish_ts&quot;</span>, datatype=DataType.INT32, description=<span class="hljs-string">&quot;publish timestamp&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;image_url&quot;</span>, datatype=DataType.VARCHAR,  max_length=<span class="hljs-number">500</span>, description=<span class="hljs-string">&quot;image URL&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;image_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;image vector&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;summary&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, description=<span class="hljs-string">&quot;article summary&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;summary_dense_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;summary dense vector&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR, description=<span class="hljs-string">&quot;summary sparse vector&quot;</span>)​

<button class="copy-code-btn"></button></code></pre>
<p>قد تلاحظ الوسيطة <code translate="no">uri</code> في <code translate="no">MilvusClient</code> ، والتي تُستخدم للاتصال بخادم ميلفوس. يمكنك تعيين الوسيطات على النحو التالي.</p>
<ul>
<li><p>إذا كنت تحتاج فقط إلى قاعدة بيانات متجهية محلية للبيانات ذات النطاق الصغير أو النموذج الأولي، فإن تعيين الوسيطة كملف محلي، على سبيل المثال<code translate="no">./milvus.db</code> ، هي الطريقة الأكثر ملاءمة، حيث تستخدم تلقائيًا <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> لتخزين جميع البيانات في هذا الملف.</p></li>
<li><p>إذا كان لديك حجم كبير من البيانات، على سبيل المثال أكثر من مليون ناقل، يمكنك إعداد خادم Milvus أكثر أداءً على <a href="https://milvus.io/docs/quickstart.md">Docker أو Kubernetes</a>. في هذا الإعداد، يُرجى استخدام عنوان الخادم والمنفذ كـ uri، على سبيل المثال<code translate="no">http://localhost:19530</code>. إذا قمت بتمكين خاصية المصادقة على Milvus، استخدم "&lt;your_username&gt;: &lt;your_password&gt;" كرمز مميز، وإلا فلا تقم بتعيين الرمز المميز.</p></li>
<li><p>إذا كنت تستخدم <a href="https://zilliz.com/cloud">Zilliz Cloud،</a> الخدمة السحابية المدارة بالكامل لـ Milvus، فاضبط <code translate="no">uri</code> و <code translate="no">token</code> ، والتي تتوافق مع <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">نقطة النهاية العامة ومفتاح واجهة برمجة التطبيقات</a> في Zilliz Cloud.</p></li>
</ul>
<p>أما بالنسبة إلى <code translate="no">auto_id</code> في <code translate="no">MilvusClient.create_schema</code> ، فإن المعرف التلقائي هو سمة للحقل الأساسي الذي يحدد ما إذا كان سيتم تمكين الزيادة التلقائية للحقل الأساسي.  نظرًا لأننا قمنا بتعيين الحقل<code translate="no">article_id</code> كمفتاح أساسي ونريد إضافة معرف المقالة يدويًا، قمنا بتعيين <code translate="no">auto_id</code> False لتعطيل هذه الميزة.</p>
<p>بعد إضافة جميع الحقول إلى كائن المخطط، يتوافق كائن المخطط الخاص بنا مع الإدخالات في الجدول أعلاه.</p>
<h2 id="Define-Index​" class="common-anchor-header">تعريف الفهرس<button data-href="#Define-Index​" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد تعريف المخطط بحقول مختلفة، بما في ذلك حقول البيانات الوصفية والحقول المتجهة لبيانات الصور والملخص، تتضمن الخطوة التالية إعداد معلمات الفهرس. الفهرسة أمر بالغ الأهمية لتحسين البحث عن المتجهات واسترجاعها، مما يضمن أداء استعلام فعال. في القسم التالي، سنقوم بتعريف معلمات الفهرس للحقول المتجهة والحقول القياسية المحددة في المجموعة.</p>
<pre><code translate="no" class="language-python">index_params = client.<span class="hljs-title function_">prepare_index_params</span>()​
​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;image_vector&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
)​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;summary_dense_vector&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
)​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>,​
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
)​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;publish_ts&quot;</span>,​
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,​
)​

<button class="copy-code-btn"></button></code></pre>
<p>وبمجرد إعداد معلمات الفهرس وتطبيقها، يتم تحسين Milvus للتعامل مع الاستعلامات المعقدة على البيانات المتجهة والقياسية. تعمل هذه الفهرسة على تحسين أداء ودقة عمليات البحث عن التشابه داخل المجموعة، مما يسمح باسترجاع المقالات بكفاءة استنادًا إلى متجهات الصور والمتجهات القياسية. من خلال الاستفادة من <a href="https://milvus.io/docs/glossary.md#Auto-Index"><code translate="no">AUTOINDEX</code></a> للمتجهات الكثيفة، و <a href="https://milvus.io/docs/sparse_vector.md#Index-the-collection"><code translate="no">SPARSE_INVERTED_INDEX</code></a> للمتجهات المتفرقة و <a href="https://milvus.io/docs/scalar_index.md#Inverted-indexing"><code translate="no">INVERTED_INDEX</code></a> للمقاييس القياسية، يمكن لـ Milvus تحديد النتائج الأكثر صلة وإرجاعها بسرعة، مما يحسن بشكل كبير من تجربة المستخدم الإجمالية وفعالية عملية استرجاع البيانات.</p>
<p>هناك العديد من أنواع المؤشرات والمقاييس. لمزيد من المعلومات حولها، يمكنك الرجوع إلى <a href="https://milvus.io/docs/overview.md#Index-types">نوع فهرس Milvus</a> <a href="https://milvus.io/docs/glossary.md#Metric-type">ونوع مقياس Milvus</a>.</p>
<h2 id="Create-Collection​" class="common-anchor-header">إنشاء مجموعة<button data-href="#Create-Collection​" class="anchor-icon" translate="no">
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
    </button></h2><p>مع تحديد المخطط والفهارس، نقوم بإنشاء "مجموعة" بهذه المعلمات. المجموعة بالنسبة لـ Milvus تشبه جدولاً في قاعدة بيانات علائقية.</p>
<pre><code translate="no" class="language-python">client.create_collection(​
    collection_name=collection_name,​
    schema=schema,​
    index_params=index_params,​
)​

<button class="copy-code-btn"></button></code></pre>
<p>يمكننا التحقق من أن المجموعة قد تم إنشاؤها بنجاح من خلال وصف المجموعة.</p>
<pre><code translate="no" class="language-python">collection_desc = client.describe_collection(​
    collection_name=collection_name​
)​
<span class="hljs-built_in">print</span>(collection_desc)​

<button class="copy-code-btn"></button></code></pre>
<h1 id="Other-Considerations​" class="common-anchor-header">اعتبارات أخرى<button data-href="#Other-Considerations​" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Loading-Index​" class="common-anchor-header">تحميل الفهرس<button data-href="#Loading-Index​" class="anchor-icon" translate="no">
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
    </button></h2><p>عند إنشاء مجموعة في Milvus، يمكنك اختيار تحميل الفهرس على الفور أو تأجيله إلى ما بعد استيعاب بعض البيانات بشكل مجمّع. عادةً لا تحتاج إلى اتخاذ خيار صريح حول هذا الأمر، حيث توضح الأمثلة أعلاه أن الفهرس يتم إنشاؤه تلقائيًا لأي بيانات تم استيعابها مباشرةً بعد إنشاء المجموعة. هذا يسمح بإمكانية البحث الفوري عن البيانات التي تم استيعابها. ومع ذلك، إذا كان لديك عملية إدراج مجمعة كبيرة بعد إنشاء المجموعة ولا تحتاج إلى البحث عن أي بيانات حتى نقطة معينة، يمكنك تأجيل بناء الفهرس عن طريق حذف index_params في إنشاء المجموعة وإنشاء الفهرس عن طريق استدعاء التحميل صراحةً بعد استيعاب جميع البيانات. تعتبر هذه الطريقة أكثر فعالية لبناء الفهرس على مجموعة كبيرة، ولكن لا يمكن إجراء أي عمليات بحث حتى استدعاء التحميل().</p>
<h2 id="How-to-Define-Data-Model-For-Multi-tenancy​" class="common-anchor-header">كيفية تعريف نموذج البيانات للمستأجرين المتعددين<button data-href="#How-to-Define-Data-Model-For-Multi-tenancy​" class="anchor-icon" translate="no">
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
    </button></h2><p>يُستخدم مفهوم المستأجرين المتعددين بشكل شائع في السيناريوهات التي يحتاج فيها تطبيق أو خدمة برمجية واحدة لخدمة عدة مستخدمين أو مؤسسات مستقلة، لكل منها بيئتها المعزولة. يظهر هذا بشكل متكرر في الحوسبة السحابية وتطبيقات SaaS (البرمجيات كخدمة) وأنظمة قواعد البيانات. على سبيل المثال، يمكن أن تستخدم خدمة التخزين السحابي الإيجار المتعدد للسماح لشركات مختلفة بتخزين بياناتها وإدارتها بشكل منفصل مع مشاركة نفس البنية التحتية الأساسية. هذا النهج يزيد من استخدام الموارد والكفاءة مع ضمان أمن البيانات والخصوصية لكل مستأجر.</p>
<p>أسهل طريقة للتمييز بين المستأجرين هي عزل بياناتهم ومواردهم عن بعضهم البعض. كل مستأجر إما لديه وصول حصري إلى موارد محددة أو يشارك الموارد مع الآخرين لإدارة كيانات Milvus مثل قواعد البيانات والمجموعات والأقسام. هناك طرق محددة تتماشى مع هذه الكيانات لتنفيذ الإيجار المتعدد في ميلفوس. يمكنك الرجوع إلى <a href="https://milvus.io/docs/multi_tenancy.md#Multi-tenancy-strategies">صفحة الإيجار المتعدد</a> في <a href="https://milvus.io/docs/multi_tenancy.md#Multi-tenancy-strategies">ميلفوس</a> للمزيد من المعلومات.</p>
