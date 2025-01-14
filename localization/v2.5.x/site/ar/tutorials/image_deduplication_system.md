---
id: image_deduplication_system.md
summary: إنشاء نظام إلغاء البيانات المكررة للصور باستخدام Milvus.
title: إلغاء تكرار الصور
---
<h1 id="Image-Deduplication" class="common-anchor-header">إلغاء تكرار الصور<button data-href="#Image-Deduplication" class="anchor-icon" translate="no">
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
    </button></h1><p>يوضح هذا البرنامج التعليمي كيفية استخدام Milvus، قاعدة البيانات المتجهة مفتوحة المصدر، لبناء نظام إلغاء تكرار الصور.</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/blob/main/image/image_deduplication/image_deduplication.ipynb">دفتر ملاحظات مفتوح</a></li>
</ul>
<p>يتضمن نموذج التعلم الآلي وبرامج الطرف الثالث المستخدمة:</p>
<ul>
<li><p>ريس نت-50</p></li>
<li><p><a href="https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;cad=rja&amp;uact=8&amp;ved=2ahUKEwjm8-KEjtj7AhVPcGwGHapPB40QFnoECAgQAQ&amp;url=https%3A%2F%2Ftowhee.io%2F&amp;usg=AOvVaw37IzMMiyxGtj82K7O4fInn">تاهي</a></p></li>
</ul>
<p>شهدت السنوات الأخيرة انفجاراً هائلاً في المحتوى الذي ينشئه المستخدمون. يمكن للأشخاص تحميل صورة التقطوها على الفور على إحدى منصات التواصل الاجتماعي. ومع ذلك، مع هذه الوفرة في بيانات الصور، نرى العديد من المحتويات المكررة. ومن أجل تحسين تجربة المستخدم، يجب إزالة هذه الصور المكررة. يوفر علينا نظام إلغاء تكرار الصور من العمل اليدوي لمقارنة الصور في قاعدة البيانات واحدة تلو الأخرى لاستخراج الصور المكررة. انتقاء الصور المتطابقة تمامًا ليست مهمة معقدة على الإطلاق. ومع ذلك، يمكن في بعض الأحيان تكبير الصورة أو اقتصاصها أو تعديل درجة سطوعها أو مقياسها الرمادي. يحتاج نظام إلغاء تكرار الصور إلى تحديد هذه الصور المتشابهة وإزالتها أيضًا.</p>
<p>في هذا البرنامج التعليمي، ستتعلم في هذا البرنامج التعليمي كيفية إنشاء نظام إلغاء تكرار الصور. يستخدم هذا البرنامج التعليمي نموذج ResNet-50 لاستخراج ميزات الصور وتحويلها إلى متجهات. ثم يتم تخزين متجهات الصور هذه في قاعدة بيانات متجهات Milvus ويتم إجراء بحث عن تشابه المتجهات في Milvus أيضًا.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/image_deduplication.png" alt="Image_deduplication_workflow" class="doc-image" id="image_deduplication_workflow" />
   </span> <span class="img-wrapper"> <span>سير عمل_تكرار_الصور</span> </span></p>
