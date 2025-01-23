---
id: kafka-connect-milvus.md
summary: >-
  تم دمج Apache Kafka مع Milvus وZilliz Cloud لدفق البيانات المتجهة. تعرّف على
  كيفية استخدام موصل Kafka-Milvus لإنشاء خطوط أنابيب في الوقت الفعلي للبحث
  الدلالي وأنظمة التوصيات والتحليلات القائمة على الذكاء الاصطناعي.
title: >-
  ربط أباتشي كافكا Apache Kafka® مع سحابة ميلفوس/زيليز لاستيعاب البيانات المتجهة
  في الوقت الحقيقي
---
<h1 id="Connect-Apache-Kafka®-with-MilvusZilliz-Cloud-for-Real-Time-Vector-Data-Ingestion" class="common-anchor-header">ربط أباتشي كافكا Apache Kafka® مع سحابة ميلفوس/زيليز لاستيعاب البيانات المتجهة في الوقت الحقيقي<button data-href="#Connect-Apache-Kafka®-with-MilvusZilliz-Cloud-for-Real-Time-Vector-Data-Ingestion" class="anchor-icon" translate="no">
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
    </button></h1><p>نوضح في دليل البدء السريع هذا كيفية إعداد كافكا مفتوحة المصدر وزيليز كلاود لاستيعاب البيانات المتجهة.</p>
<p>يشرح هذا البرنامج التعليمي كيفية استخدام Apache Kafka® لدفق البيانات المتجهة واستيعابها في قاعدة بيانات Milvus vector و Zilliz Cloud (Milvus Cloud المدارة بالكامل)، مما يتيح تطبيقات متقدمة في الوقت الفعلي مثل البحث الدلالي وأنظمة التوصيات والتحليلات المدعومة بالذكاء الاصطناعي.</p>
<p>Apache Kafka عبارة عن منصة تدفق أحداث موزعة مصممة لخطوط أنابيب عالية الإنتاجية ومنخفضة الكمون. وهي تُستخدم على نطاق واسع لجمع وتخزين ومعالجة تدفقات البيانات في الوقت الحقيقي من مصادر مثل قواعد البيانات وأجهزة إنترنت الأشياء وتطبيقات الجوال والخدمات السحابية. إن قدرة Kafka على التعامل مع كميات كبيرة من البيانات تجعلها مصدرًا مهمًا للبيانات لقواعد البيانات المتجهة مثل Milvus أو Zilliz Cloud.</p>
<p>على سبيل المثال، يمكن لكافكا التقاط تدفقات البيانات في الوقت الفعلي - مثل تفاعلات المستخدم، وقراءات أجهزة الاستشعار، مع تضمينها من نماذج التعلم الآلي - ونشر هذه التدفقات مباشرةً إلى Milvus أو Zilliz Cloud. وبمجرد وصولها إلى قاعدة البيانات المتجهة، يمكن فهرسة هذه البيانات والبحث فيها وتحليلها بكفاءة.</p>
<p>يوفّر تكامل Kafka مع Milvus وZilliz Cloud طريقة سلسة لبناء خطوط أنابيب قوية لسير عمل البيانات غير المهيكلة. يعمل الموصل مع كل من نشر كافكا مفتوح المصدر والخدمات المستضافة مثل <a href="https://www.confluent.io/hub/zilliz/kafka-connect-milvus">Confluent</a> و <a href="https://docs.streamnative.io/hub/connector-kafka-connect-milvus-sink-v0.1">StreamNative</a>.</p>
<p>في هذا البرنامج التعليمي نستخدم Zilliz Cloud كعرض توضيحي:</p>
<h2 id="Step-1-Download-the-kafka-connect-milvus-plugin" class="common-anchor-header">الخطوة 1: تنزيل المكون الإضافي kafka-connect-milvus<button data-href="#Step-1-Download-the-kafka-connect-milvus-plugin" class="anchor-icon" translate="no">
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
    </button></h2><p>أكمل الخطوات التالية لتنزيل الإضافة kafka-connect-milvus.</p>
<ol>
<li>قم بتنزيل أحدث ملف مضغوط للمكون الإضافي <code translate="no">zilliz-kafka-connect-milvus-xxx.zip</code> من <a href="https://github.com/zilliztech/kafka-connect-milvus/releases">هنا</a>.</li>
</ol>
<h2 id="Step-2-Download-Kafka" class="common-anchor-header">الخطوة 2: تنزيل كافكا<button data-href="#Step-2-Download-Kafka" class="anchor-icon" translate="no">
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
<li>قم بتنزيل أحدث ملف كافكا من <a href="https://kafka.apache.org/downloads">هنا</a>.</li>
<li>قم بفك ضغط الملف الذي تم تنزيله وانتقل إلى دليل كافكا.</li>
</ol>
<pre><code translate="no" class="language-shell">$ tar -xzf kafka_2.13-3.6.1.tgz
$ <span class="hljs-built_in">cd</span> kafka_2.13-3.6.1
<button class="copy-code-btn"></button></code></pre>
<h2 id="STEP-3-Start-the-Kafka-Environment" class="common-anchor-header">الخطوة 3: ابدأ تشغيل بيئة كافكا<button data-href="#STEP-3-Start-the-Kafka-Environment" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">
<p>ملاحظة: يجب أن تكون بيئتك المحلية مثبت بها Java 8+.</p>
</div>
<p>قم بتشغيل الأوامر التالية لبدء تشغيل جميع الخدمات بالترتيب الصحيح:</p>
<ol>
<li><p>ابدأ تشغيل خدمة ZooKeeper</p>
<pre><code translate="no" class="language-shell">$ bin/zookeeper-server-start.sh config/zookeeper.properties
<button class="copy-code-btn"></button></code></pre></li>
<li><p>ابدأ تشغيل خدمة وسيط كافكا</p>
<p>افتح جلسة طرفية أخرى وقم بتشغيلها:</p>
<pre><code translate="no" class="language-shell">$ bin/kafka-server-start.sh config/server.properties
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>بمجرد تشغيل جميع الخدمات بنجاح، سيكون لديك بيئة كافكا الأساسية قيد التشغيل وجاهزة للاستخدام.</p>
<ul>
<li>راجع دليل البدء السريع الرسمي من كافكا للحصول على التفاصيل: https://kafka.apache.org/quickstart</li>
</ul>
<h2 id="Step-4-Configure-Kafka-and-Zilliz-Cloud" class="common-anchor-header">الخطوة 4: تكوين كافكا وزيليز كلاود<button data-href="#Step-4-Configure-Kafka-and-Zilliz-Cloud" class="anchor-icon" translate="no">
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
    </button></h2><p>تأكد من إعداد وتهيئة كافكا وزيليز كلاود بشكل صحيح.</p>
<ol>
<li><p>إذا لم يكن لديك موضوع بالفعل في كافكا، قم بإنشاء موضوع (على سبيل المثال <code translate="no">topic_0</code>) في كافكا.</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">bin</span>/kafka-topics.sh --create --topic topic_0 --bootstrap-server localhost:<span class="hljs-number">9092</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>إذا لم يكن لديك بالفعل مجموعة في زيليز كلاود، فأنشئ مجموعة مع حقل متجه (في هذا المثال المتجه <code translate="no">dimension=8</code>). يمكنك استخدام مثال المخطط التالي على زيليز كلاود:</p>
<p><img translate="no" src="https://github.com/zilliztech/kafka-connect-milvus/raw/main/src/main/resources/images/collection_schema.png" width="100%"  alt=""/></p>
<p><div class="alert note"></p>
<p>ملاحظة: تأكد من تطابق المخطط على كلا الجانبين. في المخطط، يوجد حقل متجه واحد فقط. أسماء كل حقل على كلا الجانبين هي نفسها تمامًا.</p>
<p></div></p></li>
</ol>
<h2 id="Step-5-Load-the-kafka-connect-milvus-plugin-to-Kafka-Instance" class="common-anchor-header">الخطوة 5: تحميل المكون الإضافي kafka-connect-milvus إلى مثيل كافكا<button data-href="#Step-5-Load-the-kafka-connect-milvus-plugin-to-Kafka-Instance" class="anchor-icon" translate="no">
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
<li><p>فك ضغط الملف <code translate="no">zilliz-kafka-connect-milvus-xxx.zip</code> الذي قمت بتحميله في الخطوة 1.</p></li>
<li><p>انسخ الدلائل <code translate="no">zilliz-kafka-connect-milvus</code> إلى الدليل <code translate="no">libs</code> من تثبيت كافكا الخاص بك.</p></li>
<li><p>قم بتعديل الملف <code translate="no">connect-standalone.properties</code> في الدليل <code translate="no">config</code> الخاص بتثبيت كافكا الخاص بك.</p>
<pre><code translate="no" class="language-properties">key.converter.schemas.enable=<span class="hljs-literal">false</span>
value.converter.schemas.enable=<span class="hljs-literal">false</span>
plugin.path=libs/zilliz-kafka-connect-milvus-xxx
<button class="copy-code-btn"></button></code></pre></li>
<li><p>قم بإنشاء وتكوين ملف <code translate="no">milvus-sink-connector.properties</code> في الدليل <code translate="no">config</code> الخاص بتثبيت كافكا الخاص بك.</p>
<pre><code translate="no" class="language-properties">name=zilliz-kafka-connect-milvus
connector.<span class="hljs-keyword">class</span>=com.milvus.io.kafka.MilvusSinkConnector
<span class="hljs-keyword">public</span>.endpoint=https:<span class="hljs-comment">//&lt;public.endpoint&gt;:port</span>
token=*****************************************
collection.name=topic_0
topics=topic_0
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Step-6-Launch-the-connector" class="common-anchor-header">الخطوة 6: تشغيل الموصل<button data-href="#Step-6-Launch-the-connector" class="anchor-icon" translate="no">
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
<li><p>ابدأ تشغيل الموصل بملف التكوين السابق</p>
<pre><code translate="no" class="language-shell">$ bin/connect-standalone.sh config/connect-standalone.properties config/milvus-sink-connector.properties
<button class="copy-code-btn"></button></code></pre></li>
<li><p>جرّب إنتاج رسالة إلى موضوع كافكا الذي قمت بإنشائه للتو في كافكا</p>
<pre><code translate="no" class="language-shell">bin/kafka-<span class="hljs-variable language_">console</span>-producer.<span class="hljs-property">sh</span> --topic topic_0 --bootstrap-server <span class="hljs-attr">localhost</span>:<span class="hljs-number">9092</span>                        
&gt;{<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>, <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;The Reported Mortality Rate of Coronavirus Is Not Important&quot;</span>, <span class="hljs-string">&quot;title_vector&quot;</span>: [<span class="hljs-number">0.041732933</span>, <span class="hljs-number">0.013779674</span>, -<span class="hljs-number">0.027564144</span>, -<span class="hljs-number">0.013061441</span>, <span class="hljs-number">0.009748648</span>, <span class="hljs-number">0.00082446384</span>, -<span class="hljs-number">0.00071647146</span>, <span class="hljs-number">0.048612226</span>], <span class="hljs-string">&quot;link&quot;</span>: <span class="hljs-string">&quot;https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912&quot;</span>}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>تحقق مما إذا تم إدراج الكيان في المجموعة في زيليز كلاود. هذا ما يبدو عليه الأمر في زيليز كلاود إذا نجح الإدراج:</p>
<p><img translate="no" src="https://github.com/zilliztech/kafka-connect-milvus/raw/main/src/main/resources/images/insearted_entities.png" width="80%" /></p></li>
</ol>
<h3 id="Support" class="common-anchor-header">الدعم</h3><p>إذا كنت بحاجة إلى أي مساعدة أو كانت لديك أسئلة بخصوص موصل Kafka Connect Milvus Connector، فلا تتردد في التواصل مع المشرف على الموصل: <strong>البريد الإلكتروني:</strong> <a href="mailto:support@zilliz.com">support@zilliz.com</a></p>
