---
id: integration_with_mindsdb.md
summary: >-
  يوضح هذا البرنامج التعليمي كيفية دمج Milvus مع MindsDB، مما يتيح لك الاستفادة
  من إمكانيات الذكاء الاصطناعي في MindsDB مع وظيفة قاعدة بيانات المتجهات في
  Milvus من خلال عمليات شبيهة ب SQL لإدارة واستعلام التضمينات المتجهة.
title: تكامل Milvus مع MindsDB
---
<h1 id="Integrate-Milvus-with-MindsDB" class="common-anchor-header">تكامل Milvus مع MindsDB<button data-href="#Integrate-Milvus-with-MindsDB" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://docs.mindsdb.com/what-is-mindsdb">MindsDB</a> هو أداة قوية لدمج تطبيقات الذكاء الاصطناعي مع مصادر بيانات المؤسسة المتنوعة. وهو يعمل كمحرك استعلام موحد يضفي النظام على البيانات المبعثرة بينما يجيب بدقة على الاستعلامات عبر البيانات المهيكلة وغير المهيكلة. سواءً كانت بياناتك مبعثرة عبر تطبيقات SaaS أو قواعد البيانات أو مستودعات البيانات، يمكن لـ MindsDB ربطها والاستعلام عنها جميعًا باستخدام SQL القياسية. وهو يتميز بأحدث أنظمة RAG المستقلة من خلال قواعد المعرفة، ويدعم المئات من مصادر البيانات، ويوفر خيارات نشر مرنة من التطوير المحلي إلى البيئات السحابية.</p>
<p>يوضح هذا البرنامج التعليمي كيفية دمج Milvus مع MindsDB، مما يتيح لك الاستفادة من إمكانيات الذكاء الاصطناعي في MindsDB مع وظيفة قاعدة بيانات المتجهات في Milvus من خلال عمليات شبيهة بـ SQL لإدارة واستعلام التضمينات المتجهة.</p>
<div class="alert note">
<p>يشير هذا البرنامج التعليمي بشكل أساسي إلى الوثائق الرسمية <a href="https://github.com/mindsdb/mindsdb/tree/main/mindsdb/integrations/handlers/milvus_handler">لمعالج MindsDB Milvus Milvus Handler</a>. إذا وجدت أي أجزاء قديمة في هذا البرنامج التعليمي، يمكنك إعطاء الأولوية لاتباع الوثائق الرسمية وإنشاء مشكلة لنا.</p>
</div>
<h2 id="Install-MindsDB" class="common-anchor-header">تثبيت MindsDB<button data-href="#Install-MindsDB" class="anchor-icon" translate="no">
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
    </button></h2><p>قبل أن نبدأ، قم بتثبيت MindsDB محليًا عبر <a href="https://docs.mindsdb.com/setup/self-hosted/docker">Docker</a> أو <a href="https://docs.mindsdb.com/setup/self-hosted/docker-desktop">Docker Desktop</a>.</p>
<p>قبل المتابعة، تأكد من أن لديك فهمًا راسخًا للمفاهيم والعمليات الأساسية لكل من MindsDB و Milvus.</p>
<h2 id="Arguments-Introduction" class="common-anchor-header">مقدمة الوسيطات<button data-href="#Arguments-Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p>الوسيطات المطلوبة لإنشاء اتصال هي</p>
<ul>
<li><code translate="no">uri</code>: uri لقاعدة بيانات Milvus، يمكن تعيينها إلى ملف ".db" المحلي أو خدمة docker أو السحابة</li>
<li><code translate="no">token</code>: الرمز المميز لدعم docker أو الخدمة السحابية وفقًا لخيار uri</li>
</ul>
<p>الوسيطات الاختيارية لإنشاء اتصال هي:</p>
<p>يتم استخدامها في <code translate="no">SELECT</code> الاستعلامات:</p>
<ul>
<li><code translate="no">search_default_limit</code>: الحد الافتراضي الذي سيتم تمريره في عبارات التحديد (افتراضي = 100)</li>
<li><code translate="no">search_metric_type</code>: نوع المقياس المستخدم في عمليات البحث (افتراضي="L2")</li>
<li><code translate="no">search_ignore_growing</code>: ما إذا كان يجب تجاهل المقاطع المتزايدة أثناء عمليات البحث عن التشابه (افتراضي="خطأ")</li>
<li><code translate="no">search_params</code>: خاص بـ <code translate="no">search_metric_type</code> (افتراضي={"nprobe": 10})</li>
</ul>
<p>تُستخدم هذه لـ <code translate="no">CREATE</code> الاستعلامات</p>
<ul>
<li><code translate="no">create_auto_id</code>: ما إذا كان سيتم إنشاء المعرف تلقائيًا عند إدراج سجلات بدون معرف (افتراضي = خطأ)</li>
<li><code translate="no">create_id_max_len</code>: الحد الأقصى لطول حقل المعرف عند إنشاء جدول (افتراضي=64)</li>
<li><code translate="no">create_embedding_dim</code>: تضمين البعد لإنشاء جدول (افتراضي=8)</li>
<li><code translate="no">create_dynamic_field</code>: ما إذا كانت الجداول المنشأة تحتوي على حقول ديناميكية أم لا (افتراضي=صحيح)</li>
<li><code translate="no">create_content_max_len</code>: الحد الأقصى لطول عمود المحتوى (افتراضي=200)</li>
<li><code translate="no">create_content_default_value</code>: القيمة الافتراضية لعمود المحتوى (افتراضي='')</li>
<li><code translate="no">create_schema_description</code>: وصف المخططات المنشأة (افتراضي=''')</li>
<li><code translate="no">create_alias</code>: الاسم المستعار للمخططات التي تم إنشاؤها (افتراضي=''' افتراضي'')</li>
<li><code translate="no">create_index_params</code>: معلمات الفهرس الذي تم إنشاؤه على عمود التضمينات (افتراضي='''''')</li>
<li><code translate="no">create_index_metric_type</code>: المقياس المستخدم لإنشاء الفهرس (افتراضي='''L2'')</li>
<li><code translate="no">create_index_type</code>: نوع الفهرس (افتراضي='AUTOINDEX')</li>
</ul>
<h2 id="Usage" class="common-anchor-header">الاستخدام<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>قبل المتابعة، تأكد من أن الإصدار <code translate="no">pymilvus</code> هو نفس الإصدار <a href="https://github.com/mindsdb/mindsdb/blob/main/mindsdb/integrations/handlers/milvus_handler/requirements.txt">المثبت</a> هذا. إذا وجدت أي مشاكل في توافق الإصدار، يمكنك التراجع عن إصدار pymilvus، أو تخصيصه في <a href="https://github.com/mindsdb/mindsdb/tree/main/mindsdb/integrations/handlers/milvus_handler">ملف المتطلبات</a> هذا.</p>
<h3 id="Creating-connection" class="common-anchor-header">إنشاء اتصال</h3><p>من أجل الاستفادة من هذا المعالج والاتصال بخادم ميلفوس في MindsDB، يمكن استخدام الصيغة التالية:</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">CREATE</span> DATABASE milvus_datasource
<span class="hljs-keyword">WITH</span>
  ENGINE <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;milvus&#x27;</span>,
  PARAMETERS <span class="hljs-operator">=</span> {
    &quot;uri&quot;: &quot;./milvus_local.db&quot;,
    &quot;token&quot;: &quot;&quot;,
    &quot;create_embedding_dim&quot;: <span class="hljs-number">3</span>,
    &quot;create_auto_id&quot;: <span class="hljs-literal">true</span>
};
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<ul>
<li>إذا كنت تحتاج فقط إلى قاعدة بيانات متجهية محلية للبيانات صغيرة الحجم أو النماذج الأولية، فإن تعيين uri كملف محلي، على سبيل المثال<code translate="no">./milvus.db</code> ، هو الطريقة الأكثر ملاءمة، حيث يستخدم تلقائيًا <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> لتخزين جميع البيانات في هذا الملف.</li>
<li>بالنسبة للبيانات الأكبر حجمًا وحركة المرور في الإنتاج، يمكنك إعداد خادم Milvus على <a href="https://milvus.io/docs/install-overview.md">Docker أو Kubernetes</a>. في هذا الإعداد، يُرجى استخدام عنوان الخادم والمنفذ كعنوان الخادم الخاص بك <code translate="no">uri</code> ، على سبيل المثال<code translate="no">http://localhost:19530</code>. إذا قمت بتمكين ميزة المصادقة على Milvus، قم بتعيين <code translate="no">token</code> على أنه <code translate="no">&quot;&lt;your_username&gt;:&lt;your_password&gt;&quot;</code> ، وإلا فلا حاجة لتعيين الرمز المميز.</li>
<li>يمكنك أيضًا استخدام Milvus المُدار بالكامل على <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. ما عليك سوى تعيين <code translate="no">uri</code> و <code translate="no">token</code> على <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">نقطة النهاية العامة ومفتاح واجهة برمجة التطبيقات</a> لمثيل Zilliz Cloud الخاص بك.</li>
</ul>
</blockquote>
<h3 id="Dropping-connection" class="common-anchor-header">إسقاط الاتصال</h3><p>لإسقاط الاتصال، استخدم هذا الأمر</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">DROP</span> DATABASE milvus_datasource;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Creating-tables" class="common-anchor-header">إنشاء الجداول</h3><p>لإدراج بيانات من جدول موجود مسبقًا، استخدم الأمر <code translate="no">CREATE</code></p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">TABLE</span> milvus_datasource.test
(<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">FROM</span> sqlitedb.test);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Dropping-collections" class="common-anchor-header">إسقاط المجموعات</h3><p>إسقاط مجموعة غير مدعوم</p>
<h3 id="Querying-and-selecting" class="common-anchor-header">الاستعلام والاختيار</h3><p>للاستعلام عن قاعدة البيانات باستخدام متجه بحث، يمكنك استخدام <code translate="no">search_vector</code> في البند <code translate="no">WHERE</code> </p>
<p>تحذيرات:</p>
<ul>
<li>إذا قمت بحذف <code translate="no">LIMIT</code> ، يتم استخدام <code translate="no">search_default_limit</code> نظرًا لأن ميلفوس يتطلب ذلك</li>
<li>عمود البيانات الوصفية غير مدعوم، ولكن إذا كانت المجموعة تحتوي على مخطط ديناميكي ممكّن، يمكنك الاستعلام كالمعتاد، انظر المثال أدناه</li>
<li>لا يمكن عرض الحقول الديناميكية ولكن يمكن الاستعلام عنها</li>
</ul>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">from</span> milvus_datasource.test
<span class="hljs-keyword">WHERE</span> search_vector <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;[3.0, 1.0, 2.0, 4.5]&#x27;</span>
LIMIT <span class="hljs-number">10</span>;
<button class="copy-code-btn"></button></code></pre>
<p>إذا قمت بحذف <code translate="no">search_vector</code> ، يصبح هذا بحثًا أساسيًا ويتم إرجاع <code translate="no">LIMIT</code> أو <code translate="no">search_default_limit</code> من الإدخالات في المجموعة</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">from</span> milvus_datasource.test
<button class="copy-code-btn"></button></code></pre>
<p>يمكنك استخدام بند <code translate="no">WHERE</code> على الحقول الديناميكية مثل SQL العادية</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">FROM</span> milvus_datasource.createtest
<span class="hljs-keyword">WHERE</span> category <span class="hljs-operator">=</span> &quot;science&quot;;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Deleting-records" class="common-anchor-header">حذف السجلات</h3><p>يمكنك حذف الإدخالات باستخدام <code translate="no">DELETE</code> تمامًا كما هو الحال في SQL.</p>
<p>تنبيهات:</p>
<ul>
<li>يدعم ميلفوس فقط حذف الكيانات ذات المفاتيح الأساسية المحددة بوضوح</li>
<li>يمكنك فقط استخدام المشغل <code translate="no">IN</code> </li>
</ul>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">DELETE</span> <span class="hljs-keyword">FROM</span> milvus_datasource.test
<span class="hljs-keyword">WHERE</span> id <span class="hljs-keyword">IN</span> (<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Inserting-records" class="common-anchor-header">إدراج السجلات</h3><p>يمكنك أيضًا إدراج صفوف فردية مثل ذلك:</p>
<pre><code translate="no" class="language-sql"><span class="hljs-keyword">INSERT</span> <span class="hljs-keyword">INTO</span> milvus_test.testable (id,content,metadata,embeddings)
<span class="hljs-keyword">VALUES</span> (&quot;id3&quot;, <span class="hljs-string">&#x27;this is a test&#x27;</span>, <span class="hljs-string">&#x27;{&quot;test&quot;: &quot;test&quot;}&#x27;</span>, <span class="hljs-string">&#x27;[1.0, 8.0, 9.0]&#x27;</span>);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Updating" class="common-anchor-header">تحديث</h3><p>تحديث السجلات غير مدعوم من قبل واجهة برمجة تطبيقات Milvus. يمكنك محاولة استخدام مزيج من <code translate="no">DELETE</code> و <code translate="no">INSERT</code></p>
<hr>
<p>لمزيد من التفاصيل والأمثلة، يرجى الرجوع إلى <a href="https://docs.mindsdb.com/what-is-mindsdb">الوثائق الرسمية لـ MindsDB</a>.</p>
