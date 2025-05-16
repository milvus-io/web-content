---
id: use_milvus_in_anythingllm.md
summary: >-
  سيرشدك هذا الدليل خلال تهيئة Milvus كقاعدة بيانات المتجهات في AnythingLLLM،
  مما يتيح لك تضمين مستنداتك وتخزينها والبحث فيها لاسترجاعها والدردشة الذكية.
title: استخدام Milvus في AnythingLLLM
---
<h1 id="Use-Milvus-in-AnythingLLM" class="common-anchor-header">استخدام Milvus في AnythingLLLM<button data-href="#Use-Milvus-in-AnythingLLM" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://anythingllm.com/">AnythingLLLLM</a> هو تطبيق سطح مكتب ذكاء اصطناعي قوي يركز على الخصوصية ومتكامل يدعم مختلف أنواع LLM وأنواع المستندات وقواعد البيانات المتجهة. يمكّنك من إنشاء مساعد خاص يشبه ChatGPT يمكن تشغيله محليًا أو استضافته عن بُعد، مما يتيح لك الدردشة بذكاء مع أي مستندات تقدمها.</p>
<p>سيرشدك هذا الدليل إلى كيفية تكوين Milvus كقاعدة بيانات المتجهات في AnythingLLLM، مما يتيح لك تضمين مستنداتك وتخزينها والبحث فيها لاسترجاعها والدردشة الذكية.</p>
<blockquote>
<p>يستند هذا البرنامج التعليمي إلى وثائق AnythingLLLM الرسمية وخطوات الاستخدام الحقيقية. إذا تغيرت واجهة المستخدم أو الخطوات، يرجى الرجوع إلى أحدث المستندات الرسمية ولا تتردد في اقتراح تحسينات.</p>
</blockquote>
<hr>
<h2 id="1-Prerequisites" class="common-anchor-header">1. المتطلبات الأساسية<button data-href="#1-Prerequisites" class="anchor-icon" translate="no">
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
<li><a href="https://milvus.io/docs/install-overview.md">ميلفوس</a> مثبت محليًا أو حساب <a href="https://zilliz.com/cloud">زيليز كلاود</a> </li>
<li>تثبيت<a href="https://anythingllm.com/desktop">AnythingLLLM Desktop</a> </li>
<li>المستندات أو مصادر البيانات الجاهزة للتحميل والتضمين (PDF، Word، CSV، صفحات الويب، إلخ)</li>
</ul>
<hr>
<h2 id="2-Configure-Milvus-as-the-Vector-Database" class="common-anchor-header">2. تكوين Milvus كقاعدة بيانات المتجهات<button data-href="#2-Configure-Milvus-as-the-Vector-Database" class="anchor-icon" translate="no">
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
<li>افتح AnythingLLLM وانقر على أيقونة <strong>الإعدادات</strong> في الزاوية اليسرى السفلى<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_dashboard.png" alt="Open Settings" class="doc-image" id="open-settings" />
   </span> <span class="img-wrapper"> <span>افتح الإعدادات</span> </span></li>
</ol>
<ol start="2">
<li><p>في القائمة اليسرى، حدد <code translate="no">AI Providers</code> &gt; <code translate="no">Vector Database</code> <br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_config.png" alt="Select Vector Database" class="doc-image" id="select-vector-database" />
   </span> <span class="img-wrapper"> <span>حدد قاعدة بيانات المتجهات</span> </span></p></li>
<li><p>في القائمة المنسدلة موفر قاعدة بيانات المتجهات، حدد <strong>ميلفوس</strong> (أو زيليز كلاود)<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_vectordb.png" alt="Choose Milvus" class="doc-image" id="choose-milvus" />
   </span> <span class="img-wrapper"> <span>اختر ميلفوس</span> </span></p></li>
<li><p>املأ تفاصيل اتصال Milvus الخاص بك (لـ Milvus المحلي). إليك مثال على ذلك</p>
<ul>
<li><strong>عنوان قاعدة بيانات ميلفوس</strong> <code translate="no">http://localhost:19530</code></li>
<li><strong>اسم مستخدم ميلفوس</strong>: <code translate="no">root</code></li>
<li><strong>كلمة مرور ميلفوس</strong>: <code translate="no">Milvus</code>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_milvus.png" alt="Milvus Connection" class="doc-image" id="milvus-connection" />
   </span> <span class="img-wrapper"> <span>اتصال ميلفوس</span> </span></li>
</ul>
<blockquote>
<p>إذا كنت تستخدم Zilliz Cloud، أدخل نقطة نهاية المجموعة ورمز API بدلاً من ذلك:</p>
</blockquote>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_zilliz_cloud.png" alt="Zilliz Cloud Connection" class="doc-image" id="zilliz-cloud-connection" />
   </span> <span class="img-wrapper"> <span>اتصال زيليز كلاود</span> </span></p></li>
<li><p>انقر على <strong>حفظ التغييرات</strong> لتطبيق إعداداتك.</p></li>
</ol>
<hr>
<h2 id="3-Create-a-Workspace-and-Upload-Documents" class="common-anchor-header">3. إنشاء مساحة عمل وتحميل المستندات<button data-href="#3-Create-a-Workspace-and-Upload-Documents" class="anchor-icon" translate="no">
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
<li><p>أدخل مساحة العمل الخاصة بك وانقر على أيقونة <strong>التحميل</strong> لفتح مربع حوار تحميل المستندات<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_upload_file.png" alt="Open Upload Dialog" class="doc-image" id="open-upload-dialog" />
   </span> <span class="img-wrapper"> <span>افتح مربع حوار التحميل</span> </span></p></li>
<li><p>يمكنك تحميل مجموعة متنوعة من مصادر البيانات:</p>
<ul>
<li><strong>الملفات المحلية</strong>: PDF، Word، CSV، TXT، ملفات صوتية، إلخ.</li>
<li><strong>صفحات الويب</strong>: الصق عنوان URL وجلب محتوى الموقع مباشرةً.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_upload_interface.png" alt="Upload Documents" class="doc-image" id="upload-documents" />
   </span> <span class="img-wrapper"> <span>تحميل المستندات</span> </span></p></li>
<li><p>بعد الرفع أو الجلب، انقر على <strong>نقل إلى مساحة العمل</strong> لنقل المستند أو البيانات إلى مساحة العمل الحالية<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_move_to_workspace.png" alt="Move to Workspace" class="doc-image" id="move-to-workspace" />
   </span> <span class="img-wrapper"> <span>نقل إلى مساحة العمل</span> </span></p></li>
<li><p>حدد المستند أو البيانات وانقر على <strong>حفظ وتضمين</strong>. سيقوم برنامج AnythingLLLM تلقائيًا بتقطيع المحتوى الخاص بك وتضمينه وتخزينه في ملفوس<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_save_and_embed.png" alt="Save and Embed" class="doc-image" id="save-and-embed" />
   </span> <span class="img-wrapper"> <span>الحفظ والتضمين</span> </span></p></li>
</ol>
<hr>
<h2 id="4-Chat-and-Retrieve-Answers-from-Milvus" class="common-anchor-header">4. الدردشة واسترجاع الإجابات من ملفوس<button data-href="#4-Chat-and-Retrieve-Answers-from-Milvus" class="anchor-icon" translate="no">
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
<li>ارجع إلى واجهة دردشة مساحة العمل واطرح الأسئلة. سيقوم AnythingLLLLM بالبحث في قاعدة بيانات Milvus vector الخاصة بك عن المحتوى ذي الصلة واستخدام LLM لإنشاء الإجابات<br>

  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/anythingllm_chat.png" alt="Chat with Docs" class="doc-image" id="chat-with-docs" />
   </span> <span class="img-wrapper"> <span>الدردشة مع المستندات</span> </span></li>
</ol>
<hr>
