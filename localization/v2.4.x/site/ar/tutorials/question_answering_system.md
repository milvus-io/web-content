---
id: question_answering_system.md
summary: أنشئ نظاماً للإجابة على الأسئلة باستخدام Milvus.
title: نظام الإجابة على الأسئلة
---
<h1 id="Question-Answering-System" class="common-anchor-header">نظام الإجابة على الأسئلة<button data-href="#Question-Answering-System" class="anchor-icon" translate="no">
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
    </button></h1><p>يشرح هذا البرنامج التعليمي كيفية استخدام قاعدة البيانات المتجهة مفتوحة المصدر "ميلفوس" لبناء نظام للإجابة عن الأسئلة (QA).</p>
<ul>
<li><a href="https://github.com/towhee-io/examples/tree/main/nlp/question_answering">افتح دفتر ملاحظات Jupyter</a></li>
<li><a href="https://milvus.io/milvus-demos/">جرّب العرض التوضيحي عبر الإنترنت</a></li>
</ul>
<p>يتضمن نموذج التعلم الآلي وبرامج الطرف الثالث المستخدمة:</p>
<ul>
<li>بيرت</li>
<li>MySQL</li>
<li><a href="https://towhee.io/">تاهي</a></li>
</ul>
<p></br></p>
<p>نظام الإجابة على الأسئلة هو تطبيق شائع في العالم الحقيقي ينتمي إلى مجال معالجة اللغة الطبيعية. تتضمن أنظمة ضمان الجودة النموذجية أنظمة خدمة العملاء عبر الإنترنت، وروبوتات الدردشة الآلية لضمان الجودة وغيرها. يمكن تصنيف معظم أنظمة الإجابة على الأسئلة على النحو التالي: أنظمة الإجابة على الأسئلة التوليدية أو الاسترجاعية، أو أحادية الجولة أو متعددة الجولات أو مفتوحة المجال أو أنظمة الإجابة على أسئلة محددة.</p>
<p></br></p>
<p>في هذا البرنامج التعليمي، سوف تتعلم كيفية بناء نظام ضمان الجودة الذي يمكنه ربط أسئلة المستخدم الجديدة بإجابات ضخمة مخزنة مسبقًا في قاعدة بيانات المتجهات. لبناء روبوت الدردشة الآلي هذا، قم بإعداد مجموعة البيانات الخاصة بك من الأسئلة والإجابات المقابلة. قم بتخزين الأسئلة والأجوبة في MySQL، وهي قاعدة بيانات علائقية. ثم استخدم BERT، وهو نموذج التعلم الآلي (ML) لمعالجة اللغة الطبيعية (NLP) لتحويل الأسئلة إلى متجهات. يتم تخزين ناقلات الأسئلة هذه وفهرستها في Milvus.  عندما يُدخل المستخدمون سؤالاً جديدًا، يتم تحويله إلى متجه بواسطة نموذج BERT أيضًا، ويبحث Milvus عن متجه السؤال الأكثر تشابهًا مع هذا المتجه الجديد. يقوم نظام ضمان الجودة بإرجاع الإجابة المقابلة للأسئلة الأكثر تشابهًا.</p>
<p></br></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/qa_chatbot.png" alt="QA_Chatbot" class="doc-image" id="qa_chatbot" />
   </span> <span class="img-wrapper"> <span>QA_Chatbot</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/qa_chatbot_demo.png" alt="QA_chatbot_demo" class="doc-image" id="qa_chatbot_demo" />
   </span> <span class="img-wrapper"> <span>QA_Chatbot_demo</span> </span></p>
