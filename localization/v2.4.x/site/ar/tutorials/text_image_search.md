---
id: text_image_search.md
summary: أنشئ محرك بحث من نص إلى صورة باستخدام Milvus.
title: محرك بحث النص إلى صورة
---
<h1 id="Text-to-Image-Search-Engine" class="common-anchor-header">محرك بحث النص إلى صورة<button data-href="#Text-to-Image-Search-Engine" class="anchor-icon" translate="no">
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
    </button></h1><p>يوضح هذا البرنامج التعليمي كيفية استخدام قاعدة البيانات المتجهة مفتوحة المصدر "ميلفوس" لبناء محرك بحث من نص إلى صورة.</p>
<p>يمكنك بسرعة إنشاء محرك بحث من نص إلى صورة بالحد الأدنى من الصلاحية باتباع البرنامج التعليمي الأساسي. بدلاً من ذلك، يمكنك أيضًا قراءة البرنامج التعليمي المتعمق الذي يغطي كل شيء بدءًا من اختيار النموذج إلى نشر الخدمة. يمكنك إنشاء محرك بحث أكثر تقدماً من نص إلى صورة يلبي احتياجات عملك الخاصة باتباع الإرشادات الواردة في البرنامج التعليمي المتعمق.</p>
<ul>
<li><p><a href="https://github.com/towhee-io/examples/blob/main/image/text_image_search/1_build_text_image_search_engine.ipynb">البرنامج التعليمي الأساسي في دفتر الملاحظات</a></p></li>
<li><p><a href="https://github.com/towhee-io/examples/blob/main/image/text_image_search/2_deep_dive_text_image_search.ipynb">البرنامج التعليمي المتعمق في دفتر الملاحظات</a></p></li>
</ul>
<p>يتضمن نموذج التعلم الآلي والبرامج الخارجية المستخدمة:</p>
<ul>
<li><p><a href="https://openai.com/blog/clip/">CLIP</a></p></li>
<li><p><a href="https://towhee.io/">تاهي</a></p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwj3nvvEhNj7AhVZSGwGHUFuA6sQFnoECA0QAQ&amp;url=https%3A%2F%2Fgradio.app%2F&amp;usg=AOvVaw0Rmnp2xYgYvkDcMb9d-9TR">غراديو</a></p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwjawLa4hNj7AhWrSGwGHSWKD1sQFnoECA0QAQ&amp;url=https%3A%2F%2Fdocs.opencv.org%2F4.x%2Fd6%2Fd00%2Ftutorial_py_root.html&amp;usg=AOvVaw3YMr9iiY-FTDoGSWWqppvP">OpenCV-Python</a></p></li>
</ul>
<p>في الوقت الحاضر، تفقد محركات البحث النصية التقليدية سحرها مع تزايد عدد الأشخاص الذين يتجهون إلى TikTok كمحرك البحث المفضل لديهم. خلال البحث النصي التقليدي، يقوم الأشخاص بإدخال الكلمات المفتاحية لتظهر لهم جميع النصوص التي تحتوي على الكلمة المفتاحية. ومع ذلك، يشتكي الناس من أنهم لا يستطيعون دائمًا العثور على ما يريدون في بحث كهذا. والأكثر من ذلك، فإن النتائج ليست بديهية بما فيه الكفاية. يقول الناس إنهم يجدون الصور ومقاطع الفيديو أكثر سهولة ومتعة من الاضطرار إلى الزحف عبر سطور النص. ونتيجة لذلك، ظهر محرك البحث من النص إلى الصورة كنتيجة لذلك. مع هذا النوع الجديد من محركات البحث، يمكن للأشخاص العثور على الصور ذات الصلة عن طريق إدخال جزء من نص بعض الكلمات الرئيسية.</p>
<p>ستتعلم في هذا البرنامج التعليمي كيفية إنشاء محرك بحث من نص إلى صورة. يستخدم هذا البرنامج التعليمي نموذج CLIP لاستخراج ميزات الصور وتحويلها إلى متجهات. ثم يتم تخزين متجهات الصور هذه في قاعدة بيانات متجهات ميلفوس. عندما يقوم المستخدمون بإدخال نصوص الاستعلام، يتم تحويل هذه النصوص أيضًا إلى متجهات تضمين باستخدام نفس نموذج CLIP الخاص بتحويل الصور إلى صور. بعد ذلك، يتم إجراء بحث عن تشابه المتجهات في Milvus لاسترداد متجهات الصور الأكثر تشابهًا مع متجه النص المدخل.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/text_to_image_workflow.png" alt="Text_image_search" class="doc-image" id="text_image_search" />
   </span> <span class="img-wrapper"> <span>بحث_الصورة_النصية</span> </span></p>
