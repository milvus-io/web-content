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
    </button></h1><p>AISAQ عبارة عن فهرس متجه قائم على القرص يعمل على توسيع نطاق <a href="/docs/ar/diskann.md">DISKANN</a> للتعامل مع مجموعات بيانات بمليار حجم مع الحد الأدنى من بصمة DRAM.</p>
<p>على عكس DISKANN، الذي يحتفظ بالمتجهات المضغوطة في الذاكرة، تم تصميم AISAQ AISAQ مع "بنية DRAM شبه معدومة" مما يعني الاحتفاظ بجميع هياكل البيانات على SSD.</p>
<p>يتيح AISAQ تشغيل قواعد بيانات فائقة الاتساع باستخدام خوادم قياسية مع توفير أوضاع تشغيل لتحقيق التوازن بين الأداء وتكاليف التخزين.</p>
<h2 id="How-AISAQ-works" class="common-anchor-header">كيف يعمل AISAQ<button data-href="#How-AISAQ-works" class="anchor-icon" translate="no">
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
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/aisaq-vs-diskann.png" alt="Aisaq Vs Diskann" class="doc-image" id="aisaq-vs-diskann" />
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
<li><p>يُستخدَم المتجه الخام لحساب المسافة الدقيقة إلى متجه الاستعلام للترتيب.</p></li>
<li><p>تُستخدَم بيانات PQ في الذاكرة لتصفية المسافة التقريبية لتوجيه عملية العبور التالية.</p></li>
</ul>
<p>ونظرًا لأن بيانات PQ مخزنة بالفعل في ذاكرة DRAM، فإن كل زيارة للعقدة تتطلب إدخال/إخراج قرص واحد فقط، مما يحقق سرعة استعلام عالية مع استخدام معتدل للذاكرة.</p>
<p>للحصول على شرح مفصل لهذه المكونات والمعلمات راجع <a href="/docs/ar/diskann.md">DISKANN</a>.</p>
<h3 id="AISAQ-Operation-Modes" class="common-anchor-header">أوضاع تشغيل AISAQ<button data-href="#AISAQ-Operation-Modes" class="anchor-icon" translate="no">
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
    </button></h3><p>يوفر AISAQ وضعين للتشغيل لمعالجة حالتي استخدام متميزتين:</p>
<p>وضع الأداء: مُحسَّن للتطبيقات التي تتطلب زمن استجابة منخفض وإنتاجية عالية على نطاق واسع، مثل البحث الدلالي عبر الإنترنت.</p>
<p>وضع النطاق: مُحسَّن للتطبيقات ذات قيود زمن انتقال أكثر مرونة، مثل RAG والبحث الدلالي دون اتصال بالإنترنت، مع تمكين التوسع الفعال من حيث التكلفة لمجموعات البيانات إلى نطاق فائق الارتفاع.</p>
<h4 id="AISAQ-performance-mode" class="common-anchor-header">وضع AISAQ-أداء AISAQ</h4><p>يحقق<strong>وضع AISAQ-performance</strong> "بصمة DRAM تقترب من الصفر" عن طريق نقل بيانات PQ من الذاكرة إلى القرص مع الحفاظ على معدل IOPS منخفض من خلال تجميع البيانات وتكرارها.</p>
<ul>
<li><p>يتم تخزين المتجه الخام لكل عقدة وقائمة الحواف وبيانات PQ الخاصة بجيرانها معًا على القرص.</p></li>
<li><p>يضمن هذا التخطيط أن زيارة عقدة (على سبيل المثال، المتجه 0) لا تزال تتطلب إدخال/إخراج قرص واحد فقط.</p></li>
<li><p>نظرًا لتخزين بيانات PQ بشكل متكرر بالقرب من عقد متعددة، يزداد حجم ملف الفهرس بشكل كبير، مما يستهلك مساحة أكبر على القرص.</p></li>
</ul>
<h4 id="AISAQ-scale-mode" class="common-anchor-header">وضع AISAQ-scale</h4><p>يركز<strong>AISAQ-scale</strong> على تقليل استخدام مساحة القرص مع تلبية متطلبات الأداء للتطبيقات المستهدفة.</p>
<p>في هذا الوضع:</p>
<ul>
<li><p>يتم تخزين بيانات PQ بشكل منفصل على القرص، دون تكرار.</p></li>
<li><p>يقلل هذا التصميم من حجم الفهرس ولكنه يؤدي إلى المزيد من عمليات الإدخال/الإخراج أثناء اجتياز الرسم البياني.</p></li>
<li><p>وللتخفيف من الحمل الزائد على IOPS، يقدم AISAQ تحسينين:</p>
<ul>
<li><p>خوارزمية إعادة ترتيب متجهات PQ حسب الأولوية لتحسين موقع البيانات.</p></li>
<li><p>ذاكرة تخزين مؤقتة PQ في DRAM (pq_read_page_cache_cache_cache_size) التي تخزن بيانات PQ التي يتم الوصول إليها بشكل متكرر.</p></li>
</ul></li>
</ul>
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
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Controls the maximum number of connections (edges) each data point can have in the Vamana graph</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># During index construction, this parameter defines the size of the candidate pool used when searching for the nearest neighbors for each node. For every node being added to the graph, the algorithm maintains a list of the search_list_size best candidates found so far. The search for neighbors stops when this list can no longer be improved. From this final candidate pool, the top max_degree nodes are selected to form the final edges</span>
      <span class="hljs-attr">inline_pq:</span> <span class="hljs-number">-1</span> <span class="hljs-comment"># Number of PQ vectors stored inline per Index node (read when node is accessed, to reduce IO)</span>
      <span class="hljs-attr">rearrange:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Re-arrange the PQ vectors data structure to improve data locality and reduce disk accesses during search (ignored in performance mode)</span>
      <span class="hljs-attr">num_entry_points:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Number of candidate entry points to optimize search entry-point selection</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Controls the size of the PQ codes (compressed representations of data points) compared to the size of the uncompressed data</span>
      <span class="hljs-attr">disk_pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.25</span> <span class="hljs-comment"># Controls the size of the PQ codes of the high precision vectors stored in the index (used for re-ranking), compared to the size of the uncompressed data</span>
      <span class="hljs-attr">pq_cache_size:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># PQ vectors cache size in DRAM (bytes). The PQ vectors cache is loaded during Index load and used during search to reduce IOs (ignored in performance mode)</span>
      <span class="hljs-attr">search_cache_budget_gb_ratio:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># Controls the amount of DRAM to be used for caching frequently accessed index nodes. This cache is loaded during index load and used during search to reduce IOs</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">search_list:</span> <span class="hljs-number">16</span> <span class="hljs-comment"># During a search operation, this parameter determines the size of the candidate pool that the algorithm maintains as it traverses the graph. A larger value increases the chances of finding the true nearest neighbors (higher recall) but also increases search latency</span>
      <span class="hljs-attr">beamwidth:</span> <span class="hljs-number">8</span> <span class="hljs-comment"># Controls the degree of parallelism during search by determining the maximum number of parallel disk I/O requests to read the index nodes</span>
      <span class="hljs-attr">vectors_beamwidth:</span> <span class="hljs-number">1</span> <span class="hljs-comment"># Controls the degree of parallelism during search by determining the maximum number of parallel disk I/O requests to read groups of neighboring PQ vectors (ignored in performance mode)</span>
      <span class="hljs-attr">pq_read_page_cache_size:</span> <span class="hljs-number">5242880</span> <span class="hljs-string">(5MiB)</span> <span class="hljs-comment"># PQ read cache size in DRAM per search thread (bytes). It caches frequently accessed data pages containing PQ vectors (ignored in performance mode and applicable only when rearrange is true). The PQ read cache memory is reused across all AISAQ segments</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="AISAQ-parameters" class="common-anchor-header">معلمات AISAQ<button data-href="#AISAQ-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>يرث AISAQ بعض المعلمات من DISKANN - <code translate="no">max_degree</code> و <code translate="no">search_list_size</code> و <code translate="no">pq_code_budget_gb_ratio</code>.</p>
<h3 id="Index-building-params" class="common-anchor-header">معلمات بناء الفهرس<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>تؤثر هذه المعلمات على كيفية إنشاء فهرس AISAQ. يمكن أن يؤثر تعديلها على حجم الفهرس ووقت الإنشاء وجودة البحث.</p>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>نطاق القيمة</p></th>
     <th><p>اقتراح الضبط</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">max_degree</code></p></td>
     <td><p>يتحكم في الحد الأقصى لعدد الاتصالات (الحواف) التي يمكن أن تحتويها كل نقطة بيانات في الرسم البياني لفامانا.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح</p><p><strong>المدى</strong>: [1, 512]</p><p><strong>القيمة الافتراضية</strong>: <code translate="no">56</code></p></td>
     <td><p>تنشئ القيم الأعلى رسومات بيانية أكثر كثافة، مما قد يزيد من الاستدعاء (العثور على نتائج أكثر صلة) ولكن أيضًا يزيد من استخدام الذاكرة ووقت الإنشاء. في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: [10, 100].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_list_size</code></p></td>
     <td><p>أثناء إنشاء الفهرس، تحدد هذه المعلمة حجم مجموعة المرشحين المستخدمة عند البحث عن أقرب الجيران لكل عقدة. لكل عقدة تتم إضافتها إلى الرسم البياني، تحتفظ الخوارزمية بقائمة بأفضل المرشحين الذين تم العثور عليهم حتى الآن. يتوقف البحث عن الجيران عندما لا يعود بالإمكان تحسين هذه القائمة. من مجموعة المرشحين النهائيين هذه، يتم اختيار أعلى_عُقد_درجة_قصوى لتشكيل الحواف النهائية.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح</p><p><strong>المدى</strong>: [1, 512]</p><p><strong>القيمة الافتراضية</strong>: <code translate="no">100</code></p></td>
     <td><p>يزيد حجم_قائمة_البحث_الأكبر من احتمالية العثور على أقرب الجيران الحقيقيين لكل عقدة، مما قد يؤدي إلى رسم بياني عالي الجودة وأداء بحث أفضل (استرجاع). ومع ذلك، يأتي ذلك على حساب وقت إنشاء فهرس أطول بكثير. يجب تعيينه دائمًا على قيمة أكبر من أو تساوي max_degree.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">inline_pq</code></p></td>
     <td><p>عدد متجهات PQ المخزنة مضمنة لكل عقدة فهرس (تُقرأ عند الوصول إلى العقدة، لتقليل الإدخال والإخراج)</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح</p><p><strong>المدى</strong>: [0، <em>max_degree</em>]</p><p><strong>القيمة الافتراضية</strong>: <code translate="no">-1</code></p></td>
     <td><p>القيم الأعلى من <code translate="no">inline_pq</code> تحسن الأداء ولكنها تزيد من مساحة القرص.</p><p>قم بتعيين <code translate="no">inline_pq</code>= 0 لـ AISAQ في وضع المقياس.</p><p>قم بتعيين <code translate="no">inline_pq</code>= 1 لملء أي مساحة غير مستخدمة في الفهرس تلقائيًا بمتجهات PQ لمزيد من التحسين لـ AISAQ في وضع المقياس.</p><p>اضبط <code translate="no">inline_pq</code>= <em>max_degree</em> لـ AISAQ في وضع الأداء.</p><p><code translate="no">inline_pq</code> تمكّن الإعدادات بين 0 و <em>max_degree</em> من تحقيق توازن قابل للتعديل بين الأداء واستهلاك مساحة القرص.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rearrange</code></p></td>
     <td><p>إعادة ترتيب بنية بيانات ناقلات PQ لتحسين موقع البيانات وتقليل عمليات الوصول إلى القرص أثناء البحث (يتم تجاهلها في وضع الأداء).</p></td>
     <td><p><strong>النوع</strong>: منطقية</p><p><strong>المدى</strong>: [صواب، خطأ]</p><p><strong>القيمة الافتراضية</strong>: <code translate="no">true</code></p></td>
     <td><p>عندما تكون صواب، تقلل من عدد الإدخالات أثناء البحث مع زيادة طفيفة في الذاكرة وفي وقت إنشاء الفهرس.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">num_entry_points</code></p></td>
     <td><p>عدد نقاط الدخول المرشحة لتحسين اختيار نقطة دخول البحث.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح</p><p><strong>المدى</strong>: [0, 1000]</p><p><strong>القيمة الافتراضية</strong>: <code translate="no">100</code></p></td>
     <td><p>قد تقلل القيم العالية من وقت البحث عن طريق بدء البحث من نقطة دخول أقرب.</p><p>قم بتعيين قيم أعلى للقطاعات الكبيرة (على سبيل المثال لمتجهات 10M وما فوق استخدم قيمة 1000).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_code_budget_gb_ratio</code></p></td>
     <td><p>يتحكم في حجم رموز PQ (التمثيل المضغوط لنقاط البيانات) مقارنةً بحجم البيانات غير المضغوطة.</p></td>
     <td><p><strong>النوع</strong>: عائم</p><p><strong>المدى</strong>: (0.0، 0.25]</p><p><strong>القيمة الافتراضية</strong>: <code translate="no">0.125</code></p></td>
     <td><p>تؤدي النسبة الأعلى إلى نتائج بحث أكثر دقة، مما يؤدي إلى تخزين المزيد من المعلومات حول المتجهات الأصلية بشكل فعال، ولكنها تزيد من التعقيد الحسابي أثناء البحث.</p><p>في معظم الحالات، نوصي بتعيين قيمة ضمن هذا النطاق: (0.0417، 0.25].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disk_pq_code_budget_gb_ratio</code></p></td>
     <td><p>يتحكم في حجم أكواد PQ للمتجهات عالية الدقة المخزنة في الفهرس (المستخدمة لإعادة الترتيب)، مقارنةً بحجم البيانات غير المضغوطة.</p></td>
     <td><p><strong>النوع</strong>: عائم</p><p><strong>المدى</strong>: [0, 0.25]</p><p><strong>القيمة الافتراضية</strong>: <code translate="no">0.25</code></p></td>
     <td><p>باستخدام القيمة الافتراضية 0.25، سيتم تكميم المتجهات إلى 25% من حجمها الأصلي (ضغط 4×4)، مما يقلل من مساحة القرص مع تأثير دقة ضئيل نسبيًا.</p><p>قم بتعيين القيمة 0 لتخزين متجهات الدقة الكاملة في فهرس القرص لإعادة الترتيب. توفر القيمة الأكبر معدل استدعاء أعلى ولكنها تزيد من استخدام القرص.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_cache_size</code></p></td>
     <td><p>حجم ذاكرة التخزين المؤقت لناقلات PQ في DRAM (بايت). يتم تحميل ذاكرة التخزين المؤقت لناقلات PQ أثناء تحميل الفهرس واستخدامها أثناء البحث لتقليل عمليات الإدخال والإخراج (يتم تجاهلها في وضع الأداء).</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح</p><p><strong>المدى</strong>: [0, 1073741824]</p><p><strong>القيمة الافتراضية</strong>: <code translate="no">0</code></p></td>
     <td><p>تعمل ذاكرة التخزين المؤقت الأكبر على تحسين أداء الاستعلام ولكنها تزيد من استخدام DRAM.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_cache_budget_gb_ratio</code></p></td>
     <td><p>يتحكم في مقدار DRAM الذي سيتم استخدامه لتخزين عقد الفهرس التي يتم الوصول إليها بشكل متكرر مؤقتًا</p><p>يتم تحميل ذاكرة التخزين المؤقت هذه أثناء تحميل الفهرس واستخدامها أثناء البحث لتقليل عمليات التشغيل الداخلي.</p></td>
     <td><p><strong>النوع</strong>: عائم</p><p><strong>النطاق</strong>: [0.0, 0.3)</p><p><strong>القيمة الافتراضية</strong>: <code translate="no">0</code></p></td>
     <td><p>تؤدي القيمة الأعلى إلى تخصيص ذاكرة أكبر للتخزين المؤقت، مما يقلل من عمليات الدخول إلى القرص ولكن يستهلك المزيد من ذاكرة النظام. القيمة الأقل تستخدم ذاكرة أقل للتخزين المؤقت، مما يزيد من الحاجة إلى الوصول إلى القرص.</p></td>
   </tr>
</table>
<h3 id="Index-search-params" class="common-anchor-header">بارامترات البحث عن الفهرس<button data-href="#Index-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>تؤثر هذه المعلمات على كيفية إجراء AISAQ لعمليات البحث. يمكن أن يؤثر ضبطها على سرعة البحث، وزمن الاستجابة، واستخدام الموارد.</p>
<table>
   <tr>
     <th><p>المعلمة</p></th>
     <th><p>الوصف</p></th>
     <th><p>نطاق القيمة</p></th>
     <th><p>اقتراح الضبط</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">search_list</code></p></td>
     <td><p>أثناء عملية البحث، تحدد هذه المعلمة حجم مجموعة المرشحين التي تحتفظ بها الخوارزمية أثناء اجتيازها للرسم البياني. تزيد القيمة الأكبر من فرص العثور على أقرب الجيران الحقيقيين (استدعاء أعلى) ولكنها تزيد أيضًا من زمن انتقال البحث.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح</p><p><strong>المدى</strong>: [topk، int32_max]</p><p><strong>القيمة الافتراضية</strong>: <code translate="no">16</code></p></td>
     <td><p>لتحقيق توازن جيد بين الأداء والدقة، يوصى بتعيين هذه القيمة لتكون مساوية لعدد النتائج التي تريد استرجاعها (top_k) أو أكبر قليلاً من عدد النتائج التي تريد استرجاعها.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">beamwidth</code></p></td>
     <td><p>يتحكم في درجة التوازي أثناء البحث عن طريق تحديد الحد الأقصى لعدد طلبات الإدخال/الإخراج المتوازي للقرص لقراءة عقد الفهرس.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح</p><p><strong>المدى</strong>: [1, 16]</p><p><strong>القيمة الافتراضية</strong>: <code translate="no">8</code></p></td>
     <td><p>تعمل القيم الأعلى على زيادة التوازي، مما قد يؤدي إلى تسريع البحث على الأنظمة ذات وحدات المعالجة المركزية القوية ومحركات أقراص SSD. ومع ذلك، فإن تعيين قيمة عالية جدًا قد يؤدي إلى تنازع مفرط على الموارد.</p><p>في معظم الحالات، نوصي بتعيين القيمة 2.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectors_beamwidth</code></p></td>
     <td><p>يتحكم في درجة التوازي أثناء البحث عن طريق تحديد الحد الأقصى لعدد طلبات الإدخال/الإخراج المتوازي للقرص لقراءة مجموعات من ناقلات PQ المجاورة (يتم تجاهلها في وضع الأداء).</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح</p><p><strong>المدى</strong>: [1، 4] يجب أن يكون &lt;= <em>عرض الشعاع</em></p><p><strong>القيمة الافتراضية</strong>: <code translate="no">1</code></p></td>
     <td><p>تزيد القيم الأعلى من التوازي، مما قد يؤدي إلى تسريع البحث على الأنظمة ذات وحدات المعالجة المركزية القوية ومحركات أقراص الحالة الصلبة. ومع ذلك، قد يؤدي تعيينها أعلى من اللازم إلى تنازع مفرط على الموارد، حيث قد تحتوي كل مجموعة متجهات PQ المجاورة على ما يصل إلى max_degree vectors.</p><p>في معظم الحالات، نوصي بتعيين قيمة 1.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_read_page_cache_size</code></p></td>
     <td><p>حجم ذاكرة التخزين المؤقت لقراءة PQ في DRAM لكل مؤشر ترابط بحث (بايت). تقوم بتخزين صفحات البيانات التي يتم الوصول إليها بشكل متكرر والتي تحتوي على ناقلات PQ مؤقتًا (يتم تجاهلها في وضع الأداء ولا تنطبق إلا عندما تكون إعادة الترتيب صحيحة).</p><p>يتم إعادة استخدام ذاكرة التخزين المؤقت للقراءة PQ للقراءة عبر جميع قطاعات AISAQ.</p></td>
     <td><p><strong>النوع</strong>: عدد صحيح</p><p><strong>المدى</strong>: [0, 33554432]</p><p><strong>القيمة الافتراضية</strong>: <code translate="no">5242880 (5MiB)</code></p></td>
     <td><p>تعمل ذاكرة التخزين المؤقت الأكبر على تحسين أداء الاستعلام ولكنها تزيد من استخدام DRAM.</p><p>تتراوح القيم الموصى بها بين 2 ميغابايت للقطاعات الصغيرة (1 ميغابايت من المتجهات) و5 ميغابايت للقطاعات المتوسطة (50 ميغابايت من المتجهات) و10 ميغابايت للقطاعات الكبيرة (250 ميغابايت من المتجهات).</p></td>
   </tr>
</table>
