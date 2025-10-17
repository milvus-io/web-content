---
id: aisaq.md
title: AISAQCompatible with Milvus 2.6.4+
summary: >-
  AISAQ عبارة عن فهرس متجه قائم على القرص يعمل على توسيع نطاق DISKANN للتعامل مع
  مجموعات بيانات بمليارات من البيانات دون تجاوز حدود ذاكرة الوصول العشوائي. على
  عكس DISKANN، الذي يحتفظ بالمتجهات المضغوطة في الذاكرة، يخزن AISAQ جميع
  البيانات على القرص - مما يوفر وضعين لتحقيق التوازن بين الأداء وتكاليف التخزين.
beta: Milvus 2.6.4+
---
<h1 id="AISAQ" class="common-anchor-header">AISAQ<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#AISAQ" class="anchor-icon" translate="no">
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
    </button></h1><p>AISAQ عبارة عن فهرس متجه قائم على القرص يعمل على توسيع نطاق <a href="/docs/ar/diskann.md">DISKANN</a> للتعامل مع مجموعات بيانات بمليارات من البيانات دون تجاوز حدود ذاكرة الوصول العشوائي. على عكس DISKANN، الذي يحتفظ بالمتجهات المضغوطة في الذاكرة، يخزن AISAQ جميع البيانات على القرص - مما يوفر وضعين لتحقيق التوازن بين الأداء وتكاليف التخزين.</p>
<p>استخدم AISAQ عندما تكون مجموعة بياناتك المتجهة كبيرة جدًا بحيث لا يمكن وضعها بشكل مريح في ذاكرة الوصول العشوائي، أو عندما تحتاج إلى تحسين تكاليف البنية التحتية من خلال مقايضة بعض أداء الاستعلام مقابل تقليل متطلبات الذاكرة.</p>
<h2 id="How-AISAQ-works" class="common-anchor-header">كيفية عمل AISAQ<button data-href="#How-AISAQ-works" class="anchor-icon" translate="no">
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
    </button></h2><p>يقارن الرسم البياني أعلاه بين تخطيطات التخزين في كل من <strong>DISKANN</strong> و <strong>AISAQ-Performance</strong> و <strong>AISAQ-Scale،</strong> ويوضح كيفية توزيع البيانات (المتجهات الخام وقوائم الحواف ورموز PQ) بين ذاكرة الوصول العشوائي والقرص.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/aisaq-vs-diskann.png" alt="Aisaq Vs Diskann" class="doc-image" id="aisaq-vs-diskann" />
   </span> <span class="img-wrapper"> <span>إيساق مقابل ديسكان</span> </span></p>
<h3 id="Foundation-DISKANN-recap" class="common-anchor-header">التأسيس: خلاصة DISKANN<button data-href="#Foundation-DISKANN-recap" class="anchor-icon" translate="no">
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
    </button></h3><p>في DISKANN، يتم تخزين المتجهات الخام وقوائم الحواف على القرص، بينما يتم الاحتفاظ بالمتجهات المضغوطة PQ في الذاكرة (DRAM).</p>
<p>عندما ينتقل DISKANN إلى عقدة (على سبيل المثال، <em>المتجه 0</em>):</p>
<ul>
<li><p>يقوم بتحميل المتجه الخام<strong>(raw_vector_0</strong>) وقائمة الحواف الخاصة به<strong>(edgelist_0</strong>) من القرص.</p></li>
<li><p>تشير قائمة الحافة إلى الجيران الذين يجب زيارتهم بعد ذلك (العقد 2 و3 و5 في هذا المثال).</p></li>
<li><p>يُستخدم المتجه الخام لحساب المسافة الدقيقة إلى متجه الاستعلام للترتيب.</p></li>
<li><p>تُستخدَم بيانات PQ في الذاكرة لتصفية المسافة التقريبية لتوجيه عملية العبور التالية.</p></li>
</ul>
<p>ونظرًا لأن بيانات PQ مخزنة بالفعل في ذاكرة DRAM، فإن كل زيارة للعقدة تتطلب إدخال/إخراج قرص واحد فقط، مما يحقق سرعة استعلام عالية مع استخدام معتدل للذاكرة.</p>
<p>للحصول على شرح مفصل لهذه المكونات والمعلمات راجع <a href="/docs/ar/diskann.md">DISKANN</a>.</p>
<h3 id="AISAQ-modes" class="common-anchor-header">أوضاع AISAQ<button data-href="#AISAQ-modes" class="anchor-icon" translate="no">
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
    </button></h3><p>يوفر AISAQ استراتيجيتين للتخزين على القرص. يتمثل الاختلاف الرئيسي في كيفية تخزين البيانات المضغوطة PQ.</p>
<h4 id="AISAQ-performance" class="common-anchor-header">AISAQ-performance</h4><p>يحقق<strong>أداء AISAQ-performance</strong> التخزين القائم على القرص بالكامل من خلال نقل بيانات PQ من الذاكرة إلى القرص مع الحفاظ على IOPS منخفضة من خلال تجميع البيانات والتكرار.</p>
<p>في هذا الوضع:</p>
<ul>
<li><p>يتم تخزين المتجه الخام لكل عقدة وقائمة الحواف وبيانات PQ الخاصة بجيرانها معًا على القرص.</p></li>
<li><p>يضمن هذا التخطيط أن زيارة عقدة ما (على سبيل المثال، <em>المتجه 0</em>) لا تزال تتطلب إدخال/إخراج قرص واحد فقط.</p></li>
<li><p>ومع ذلك، نظرًا لتخزين بيانات PQ بشكل متكرر بالقرب من عقد متعددة، يزداد حجم ملف الفهرس بشكل كبير، مما يستهلك مساحة أكبر على القرص.</p></li>
</ul>
<h4 id="AISAQ-scale" class="common-anchor-header">مقياس AISAQ</h4><p>يركز<strong>AISAQ-scale</strong> على <em>تقليل استخدام مساحة القرص</em> مع الاحتفاظ بجميع البيانات على القرص.</p>
<p>في هذا الوضع:</p>
<ul>
<li><p>يتم تخزين بيانات PQ بشكل منفصل على القرص، دون تكرار.</p></li>
<li><p>يقلل هذا التصميم من حجم الفهرس ولكنه يؤدي إلى المزيد من عمليات الإدخال/الإخراج أثناء اجتياز الرسم البياني.</p></li>
<li><p>للتخفيف من عبء IOPS الزائد، يقدم AISAQ تحسينين:</p>
<ul>
<li><p>استراتيجية إعادة ترتيب متجهات PQ حسب الأولوية لتحسين موقع البيانات.</p></li>
<li><p>ذاكرة تخزين مؤقتة PQ في DRAM (pq_cache_size) تقوم بتخزين بيانات PQ التي يتم الوصول إليها بشكل متكرر.</p></li>
</ul></li>
</ul>
<p>نتيجةً لذلك، يحقق مقياس AISAQ-scale كفاءة تخزين أفضل ولكن أداءً أقل من DISKANN أو AISAQ-Performance.</p>
<h2 id="Example-configuration" class="common-anchor-header">مثال على التكوين<button data-href="#Example-configuration" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">AISAQ:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Maximum degree of the Vamana graph</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Size limit on the PQ code (compared with raw data)</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Size of the candidate list during building graph</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">beam_width_ratio:</span> <span class="hljs-number">4</span> <span class="hljs-comment"># Ratio between the maximum number of IO requests per search iteration and CPU number</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="AISAQ-specific-parameters" class="common-anchor-header">المعلمات الخاصة ب AISAQ<button data-href="#AISAQ-specific-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>يرث AISAQ العديد من المعلمات من DISKANN. لتجنب التكرار، يتم تفصيل المعلمات الخاصة ب AISAQ فقط أدناه. للاطلاع على أوصاف المعلمات المشتركة مثل <code translate="no">max_degree</code> و <code translate="no">pq_code_budget_gb_ratio</code> و <code translate="no">search_list_size</code> و <code translate="no">beam_width_ratio</code> ، راجع <a href="/docs/ar/diskann.md#DISKANN-params">DISKANN</a>.</p>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>نطاق القيمة</p></th>
     <th><p>اقتراح الضبط</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inline_pq</code></p></td>
     <td><p>عدد متجهات PQ المخزنة مضمنة لكل عقدة. يحدد تخطيط التخزين (وضع الأداء مقابل وضع القياس).</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح</p><p><strong>المدى</strong>: [0، <em>أقصى درجة</em>]</p><p><strong>القيمة الافتراضية</strong>: <code translate="no">-1</code></p></td>
     <td><p>كلما اقترب <code translate="no">inline_pq</code> من <em>الحد الأقصى_للدرجة،</em> كلما كان الأداء أفضل، لكن حجم ملف الفهرس يزداد بشكل كبير.</p><p>عندما يقترب <code translate="no">inline_pq</code> من 0، ينخفض الأداء، ويصبح حجم الفهرس مشابهًا لحجم DISKANN.</p><p><strong>ملاحظة</strong>: يعتمد بشكل كبير على أداء القرص. إذا كان أداء القرص ضعيفًا، لا يُنصح بتمكين هذا الخيار، حيث قد يصبح النطاق الترددي المحدود للقرص عنق الزجاجة ويؤدي إلى تدهور الأداء الكلي.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rearrange</code></p></td>
     <td><p>تمكين فرز متجه PQ حسب الأولوية لتحسين موقع الإدخال/الإخراج.</p></td>
     <td><p><strong>النوع</strong>: منطقية</p><p><strong>المدى</strong>: [صواب، خطأ]</p><p><strong>القيمة الافتراضية</strong>: <code translate="no">false</code></p></td>
     <td><p>يقلل من إدخال/إخراج الاستعلام ولكنه يزيد من وقت إنشاء الفهرس.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_cache_size</code></p></td>
     <td><p>حجم ذاكرة التخزين المؤقت PQ في DRAM (بايت).</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح</p><p><strong>المدى</strong>: [0, 1&lt;&lt;30]</p><p><strong>القيمة الافتراضية</strong>: <code translate="no">0</code></p></td>
     <td><p>تعمل ذاكرة التخزين المؤقت الأكبر على تحسين أداء الاستعلام ولكنها تزيد من استخدام DRAM.</p></td>
   </tr>
</table>
<h2 id="Considerations" class="common-anchor-header">الاعتبارات<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>أداء القرص مهم. يعتمد AISAQ بشكل كبير على IOPS لـ SSD؛ يمكن أن يؤدي التخزين الضعيف إلى تقليل QPS.</p></li>
<li><p>وضع AISAQ-أداء AISAQ ≈ زمن انتقال القرص ≈DiskanN، ولكنه قد يتطلب مساحة قرص أكبر بعدة مرات.</p></li>
<li><p>يناسب وضع AISAQAQ-مقياس الأداء AISAQ أعباء عمل البحث دون اتصال بالإنترنت أو أعباء عمل أرشفة البيانات حيث تكون QPS أقل أهمية.</p></li>
</ul>
