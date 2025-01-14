---
id: deploy-cdc-server.md
order: 2
summary: يوفر هذا الدليل عملية خطوة بخطوة لنشر خادم Milvus-CDC.
title: نشر خادم CDC
---
<h1 id="Deploy-CDC-Server" class="common-anchor-header">نشر خادم CDC<button data-href="#Deploy-CDC-Server" class="anchor-icon" translate="no">
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
    </button></h1><p>يوفر هذا الدليل عملية خطوة بخطوة لنشر خادم Milvus-CDC.</p>
<h2 id="Prerequisites" class="common-anchor-header">المتطلبات الأساسية<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>تأكد من استيفاء الشروط التالية قبل نشر خادم Milvus-CDC:</p>
<ul>
<li><p><strong>مثيلات ميلفوس</strong>: يجب نشر وتشغيل كل من الميلفوس المصدر وميلفوس مستهدف واحد على الأقل.</p>
<ul>
<li><p>يجب أن يكون كلا الإصدارين المصدر والهدف Milvus 2.3.2 أو أعلى، ويفضل أن يكون 2.4.x. نوصي باستخدام نفس الإصدار للمصدر والهدف Milvus لضمان التوافق.</p></li>
<li><p>قم بتعيين التكوين <code translate="no">common.ttMsgEnabled</code> للهدف Milvus على <code translate="no">false</code>.</p></li>
<li><p>تكوين المصدر والهدف ميلفوس المصدر والهدف مع إعدادات تخزين التعريف والرسائل المختلفة لمنع التعارضات. على سبيل المثال، تجنب استخدام نفس تكوينات etcd و rootPath، بالإضافة إلى خدمات Pulsar و <code translate="no">chanNamePrefix</code> المتطابقة في مثيلات Milvus المتعددة.</p></li>
</ul></li>
<li><p><strong>المخزن الوصفية</strong>: قم بتجهيز قاعدة بيانات إلخd أو قاعدة بيانات MySQL لقاعدة بيانات Milvus-CDC الوصفية.</p></li>
</ul>
<h2 id="Steps" class="common-anchor-header">الخطوات<button data-href="#Steps" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Obtain-the-Milvus-CDC-config-file" class="common-anchor-header">الحصول على ملف تكوين Milvus-CDC</h3><p>استنسخ <a href="https://github.com/zilliztech/milvus-cdc">الريبو Mil</a> vus-CDC وانتقل إلى الدليل <code translate="no">milvus-cdc/server/configs</code> للوصول إلى ملف التكوين <code translate="no">cdc.yaml</code>.</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/zilliztech/milvus-cdc.git

<span class="hljs-built_in">cd</span> milvus-cdc/server/configs
<button class="copy-code-btn"></button></code></pre>
<h3 id="Edit-the-config-file" class="common-anchor-header">قم بتحرير ملف التكوين</h3><p>في الدليل <code translate="no">milvus-cdc/server/configs</code> ، قم بتعديل الملف <code translate="no">cdc.yaml</code> لتخصيص التكوينات المتعلقة بمخزن ميتاستور Milvus-CDC وتفاصيل الاتصال بمصدر Milvus.</p>
<ul>
<li><p><strong>تكوين المستودع الوصفية</strong>:</p>
<ul>
<li><p><code translate="no">metaStoreConfig.storeType</code>: نوع المخزن الوصفية لـ Milvus-CDC. القيم الممكنة هي <code translate="no">etcd</code> أو <code translate="no">mysql</code>.</p></li>
<li><p><code translate="no">metaStoreConfig.etcdEndpoints</code>: :: عنوان الاتصال بـ إلخd لـ Milvus-CDC. مطلوب إذا تم تعيين <code translate="no">storeType</code> على <code translate="no">etcd</code>.</p></li>
<li><p><code translate="no">metaStoreConfig.mysqlSourceUrl</code>: عنوان الاتصال لقاعدة بيانات MySQL لخادم Milvus-CDC. مطلوب إذا تم تعيين <code translate="no">storeType</code> على <code translate="no">mysql</code>.</p></li>
<li><p><code translate="no">metaStoreConfig.rootPath</code>: المسار الجذر لخادم Milvus-CDC metastore. يتيح هذا التكوين إمكانية تعدد الاستئجار، مما يسمح لخدمات CDC المتعددة باستخدام نفس مثيل إلخd أو MySQL مع تحقيق العزل من خلال مسارات جذر مختلفة.</p></li>
</ul>
<p>مثال على التكوين:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># cdc meta data config</span>
metaStoreConfig:
  <span class="hljs-comment"># the metastore type, available value: etcd, mysql</span>
  storeType: etcd
  <span class="hljs-comment"># etcd address</span>
  etcdEndpoints:
    - localhost:<span class="hljs-number">2379</span>
  <span class="hljs-comment"># mysql connection address</span>
  <span class="hljs-comment"># mysqlSourceUrl: root:root@tcp(127.0.0.1:3306)/milvus-cdc?charset=utf8</span>
  <span class="hljs-comment"># meta data prefix, if multiple cdc services use the same store service, you can set different rootPaths to achieve multi-tenancy</span>
  rootPath: cdc
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>تكوين المصدر Milvus المصدر:</strong></p>
<p>تحديد تفاصيل الاتصال الخاصة بمصدر Milvus، بما في ذلك مصدر Milvus، بما في ذلك إلخd وتخزين الرسائل، لإنشاء اتصال بين خادم Milvus-CDC ومصدر Milvus.</p>
<ul>
<li><p><code translate="no">sourceConfig.etcdAddress</code>: عنوان الاتصال بـ إلخd الخاص بالمصدر Milvus. للمزيد من المعلومات، راجع <a href="https://milvus.io/docs/configure_etcd.md#etcd-related-Configurations">التكوينات المتعلقة بـ إلخd</a>.</p></li>
<li><p><code translate="no">sourceConfig.etcdRootPath</code>: البادئة الجذرية للمفتاح الذي يخزن فيه المصدر Milvus البيانات في إلخd. قد تختلف القيمة بناءً على طريقة نشر مثيل Milvus:</p>
<ul>
<li><p><strong>Helm</strong> أو <strong>Docker Compose</strong>: الإعداد الافتراضي إلى <code translate="no">by-dev</code>.</p></li>
<li><p><strong>المشغل</strong>: افتراضي إلى <code translate="no">&lt;release_name&gt;</code>.</p></li>
</ul></li>
<li><p><code translate="no">replicateChan</code>:: اسم قناة النسخ المتماثل لـ milvus، وهو <code translate="no">{msgChannel.chanNamePrefix.cluster}/{msgChannel.chanNamePrefix.replicateMsg}</code> في ملف milvus.yaml</p></li>
<li><p><code translate="no">sourceConfig.pulsar</code>: تكوينات النابض لمصدر Milvus Milvus. إذا كان المصدر Milvus المصدر يستخدم Kafka لتخزين الرسائل، فقم بإزالة جميع التكوينات المتعلقة بـ Pulsar. لمزيد من المعلومات، راجع <a href="https://milvus.io/docs/configure_pulsar.md">التكوينات المتعلقة</a> بـ <a href="https://milvus.io/docs/configure_pulsar.md">Pulsar</a>.</p></li>
<li><p><code translate="no">sourceConfig.kafka.address</code>: عنوان كافكا للمصدر Milvus. قم بإلغاء هذا التكوين إذا كان المصدر Milvus يستخدم Kafka لتخزين الرسائل.</p></li>
</ul></li>
</ul>
<p>مثال على التكوين:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus-source config, these settings are basically the same as the corresponding configuration of milvus.yaml in milvus source.</span>
sourceConfig:
  <span class="hljs-comment"># etcd config</span>
  etcdAddress:
    - localhost:<span class="hljs-number">2379</span>
  etcdRootPath: by-dev
  etcdMetaSubPath: meta
  <span class="hljs-comment"># default partition name</span>
  defaultPartitionName: _default
  <span class="hljs-comment"># read buffer length, mainly used for buffering if writing data to milvus-target is slow.</span>
  readChanLen: <span class="hljs-number">10</span>
  replicateChan: by-dev-replicate-msg
  <span class="hljs-comment"># milvus-source mq config, which is pulsar or kafka</span>
  pulsar:
    address: pulsar://localhost:<span class="hljs-number">6650</span>
    webAddress: localhost:<span class="hljs-number">80</span>
    maxMessageSize: <span class="hljs-number">5242880</span>
    tenant: public
    namespace: default
<span class="hljs-comment">#    authPlugin: org.apache.pulsar.client.impl.auth.AuthenticationToken</span>
<span class="hljs-comment">#    authParams: token:xxx</span>
<span class="hljs-comment">#  kafka:</span>
<span class="hljs-comment">#    address: 127.0.0.1:9092</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Compile-the-Milvus-CDC-server" class="common-anchor-header">تجميع خادم Milvus-CDC</h3><p>بعد حفظ الملف <code translate="no">cdc.yaml</code> ، انتقل إلى الدليل <code translate="no">milvus-cdc</code> وقم بتشغيل أحد الأوامر التالية لتجميع الخادم:</p>
<ul>
<li><p>لملف ثنائي:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">make</span> build
<button class="copy-code-btn"></button></code></pre></li>
<li><p>لصورة Docker:</p>
<pre><code translate="no" class="language-bash">bash build_image.sh
<button class="copy-code-btn"></button></code></pre>
<p>بالنسبة لصورة Docker، قم بتحميل الملف المجمّع إلى <code translate="no">/app/server/configs/cdc.yaml</code> داخل الحاوية.</p></li>
</ul>
<h3 id="Start-the-server" class="common-anchor-header">ابدأ تشغيل الخادم</h3><ul>
<li><p>باستخدام الملف الثنائي</p>
<p>انتقل إلى الدليل الذي يحتوي على الملف الثنائي <code translate="no">milvus-cdc</code> والدليل <code translate="no">configs</code> مع الملف <code translate="no">cdc.yaml</code> ، ثم ابدأ تشغيل الخادم:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># dir tree</span>
.
├── milvus-cdc <span class="hljs-comment"># build from source code or download from release page</span>
├── configs
│   └── cdc.yaml <span class="hljs-comment"># config for cdc and source milvus</span>

<span class="hljs-comment"># start milvus cdc</span>
./milvus-cdc server
<button class="copy-code-btn"></button></code></pre></li>
<li><p>باستخدام Docker Compose:</p>
<pre><code translate="no" class="language-bash">docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ul>
