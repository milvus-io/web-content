---
id: manage-cdc-tasks.md
order: 3
summary: >-
  تعمل مهمة التقاط تغيير البيانات (CDC) على تمكين مزامنة البيانات من مثيل Milvus
  المصدر إلى مثيل Milvus الهدف.
title: إدارة مهام CDC
---
<h1 id="Manage-CDC-Tasks" class="common-anchor-header">إدارة مهام CDC<button data-href="#Manage-CDC-Tasks" class="anchor-icon" translate="no">
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
    </button></h1><p>تمكّن مهمة التقاط تغيير البيانات (CDC) من مزامنة البيانات من مثيل Milvus المصدر إلى مثيل Milvus الهدف. وهي تراقب سجلات التشغيل من المصدر وتنسخ تغييرات البيانات مثل عمليات الإدراج والحذف وعمليات الفهرسة إلى الهدف في الوقت الفعلي. وهذا يسهل عملية التعافي من الكوارث في الوقت الحقيقي أو موازنة التحميل النشط النشط بين عمليات نشر Milvus.</p>
<p>يغطي هذا الدليل كيفية إدارة مهام CDC، بما في ذلك الإنشاء والإيقاف المؤقت والاستئناف واسترداد التفاصيل والإدراج والحذف من خلال طلبات HTTP.</p>
<h2 id="Create-a-task" class="common-anchor-header">إنشاء مهمة<button data-href="#Create-a-task" class="anchor-icon" translate="no">
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
    </button></h2><p>يسمح إنشاء مهمة CDC بمزامنة عمليات تغيير البيانات في المصدر Milvus إلى الهدف Milvus.</p>
<p>لإنشاء مهمة CDC:</p>
<pre><code translate="no" class="language-bash">curl -X POST http:_//localhost:8444/cdc \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
  &quot;request_type&quot;: &quot;create&quot;,
  &quot;request_data&quot;: {
    &quot;milvus_connect_param&quot;: {
      &quot;uri&quot;: &quot;http://localhost:19530&quot;,
      &quot;token&quot;:&quot;root:Milvus&quot;,
      &quot;connect_timeout&quot;: 10
    },
    &quot;collection_infos&quot;: [
      {
        &quot;name&quot;: &quot;*&quot;
      }
    ]
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>استبدل <strong>المضيف المحلي</strong> بعنوان IP الخاص بخادم ملفوس الهدف.</p>
<p><strong>المعلمات</strong>:</p>
<ul>
<li><p><strong>milvus_connect_param</strong>: معلمات الاتصال الخاصة بخادم ملفوس الهدف.</p>
<ul>
<li><p><strong>المضيف</strong>: اسم المضيف أو عنوان IP لخادم ميلفوس.</p></li>
<li><p><strong>المنفذ</strong>: رقم المنفذ الذي يستمع إليه خادم ميلفوس.</p></li>
<li><p><strong>اسم المستخدم</strong>: اسم المستخدم للمصادقة مع خادم ملفوس.</p></li>
<li><p><strong>كلمة المرور</strong>: كلمة المرور للمصادقة مع خادم مالفوس.</p></li>
<li><p><strong>تمكين_tls</strong>: ما إذا كان يجب استخدام تشفير TLS/SSL للاتصال.</p></li>
<li><p><strong>مهلة_الاتصال</strong>: فترة المهلة بالثواني لإنشاء الاتصال.</p></li>
</ul></li>
<li><p><strong>مجموعات_المعلومات</strong>: المجموعات المراد مزامنتها. في الوقت الحالي، يتم دعم علامة النجمة<strong>(*</strong>) فقط، حيث تتم مزامنة Milvus-CDC على مستوى المجموعة، وليس المجموعات الفردية.</p></li>
</ul>
<p>الاستجابة المتوقعة:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">200</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;task_id&quot;</span><span class="hljs-punctuation">:</span><span class="hljs-string">&quot;xxxx&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="List-tasks" class="common-anchor-header">سرد المهام<button data-href="#List-tasks" class="anchor-icon" translate="no">
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
    </button></h2><p>لسرد جميع مهام CDC التي تم إنشاؤها:</p>
<pre><code translate="no" class="language-bash">curl -X POST -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> -d <span class="hljs-string">&#x27;{
  &quot;request_type&quot;: &quot;list&quot;
}&#x27;</span> http://localhost:8444/cdc
<button class="copy-code-btn"></button></code></pre>
<p>استبدل <strong>المضيف المحلي</strong> بعنوان IP لخادم Milvus الهدف.</p>
<p>الاستجابة المتوقعة:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">200</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;tasks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;task_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;xxxxx&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;milvus_connect_param&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;uri&quot;</span><span class="hljs-punctuation">:</span><span class="hljs-string">&quot;http://localhost:19530&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;connect_timeout&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">10</span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;collection_infos&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
          <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;*&quot;</span>
          <span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;state&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Running&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Pause-a-task" class="common-anchor-header">إيقاف مهمة مؤقتاً<button data-href="#Pause-a-task" class="anchor-icon" translate="no">
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
    </button></h2><p>لإيقاف مهمة CDC مؤقتاً:</p>
<pre><code translate="no" class="language-bash">curl -X POST -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> -d <span class="hljs-string">&#x27;{
  &quot;request_type&quot;:&quot;pause&quot;,
  &quot;request_data&quot;: {
    &quot;task_id&quot;: &quot;xxxx&quot;
  }
}&#x27;</span> http://localhost:8444/cdc
<button class="copy-code-btn"></button></code></pre>
<p>استبدل المضيف <strong>المحلي</strong> بعنوان IP الخاص بخادم Milvus الهدف.</p>
<p><strong>المعلمات</strong>:</p>
<ul>
<li><strong>task_id</strong>: معرف مهمة CDC المراد إيقافها مؤقتاً.</li>
</ul>
<p>الاستجابة المتوقعة:</p>
<pre><code translate="no" class="language-bash">{
  <span class="hljs-string">&quot;code&quot;</span>: 200,
  <span class="hljs-string">&quot;data&quot;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Resume-a-task" class="common-anchor-header">استئناف مهمة<button data-href="#Resume-a-task" class="anchor-icon" translate="no">
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
    </button></h2><p>لاستئناف مهمة CDC متوقفة مؤقتاً:</p>
<pre><code translate="no" class="language-bash">curl -X POST -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> -d <span class="hljs-string">&#x27;{
  &quot;request_type&quot;:&quot;resume&quot;,
  &quot;request_data&quot;: {
    &quot;task_id&quot;: &quot;xxxx&quot;
  }
}&#x27;</span> http://localhost:8444/cdc
<button class="copy-code-btn"></button></code></pre>
<p>استبدل <strong>المضيف المحلي</strong> بعنوان IP الخاص بخادم Milvus الهدف.</p>
<p><strong>المعلمات</strong>:</p>
<ul>
<li><strong>task_id</strong>: معرف مهمة CDC المراد استئنافها.</li>
</ul>
<p>الاستجابة المتوقعة:</p>
<pre><code translate="no" class="language-bash">{
  <span class="hljs-string">&quot;code&quot;</span>: 200,
  <span class="hljs-string">&quot;data&quot;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Retrieve-task-details" class="common-anchor-header">استرداد تفاصيل المهمة<button data-href="#Retrieve-task-details" class="anchor-icon" translate="no">
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
    </button></h2><p>لاسترداد تفاصيل مهمة CDC محددة:</p>
<pre><code translate="no" class="language-bash">curl -X POST -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> -d <span class="hljs-string">&#x27;{
  &quot;request_type&quot;:&quot;get&quot;,
  &quot;request_data&quot;: {
    &quot;task_id&quot;: &quot;xxxx&quot;
  }
}&#x27;</span> http://localhost:8444/cdc
<button class="copy-code-btn"></button></code></pre>
<p>استبدل <strong>المضيف المحلي</strong> بعنوان IP الخاص بخادم ميلفوس الهدف.</p>
<p><strong>المعلمات</strong>:</p>
<ul>
<li><strong>task_id</strong>: معرف مهمة CDC المراد الاستعلام عنها.</li>
</ul>
<p>الاستجابة المتوقعة:</p>
<pre><code translate="no" class="language-bash">{
  <span class="hljs-string">&quot;code&quot;</span>: 200,
  <span class="hljs-string">&quot;data&quot;</span>: {
    <span class="hljs-string">&quot;Task&quot;</span>: {
      <span class="hljs-string">&quot;collection_infos&quot;</span>: [
        {
          <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>
        }
      ],
      <span class="hljs-string">&quot;milvus_connect_param&quot;</span>: {
        <span class="hljs-string">&quot;connect_timeout&quot;</span>: 10,
        <span class="hljs-string">&quot;uri&quot;</span>:<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
      },
      <span class="hljs-string">&quot;state&quot;</span>: <span class="hljs-string">&quot;Running&quot;</span>,
      <span class="hljs-string">&quot;task_id&quot;</span>: <span class="hljs-string">&quot;xxxx&quot;</span>
    }
  }
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Delete-a-task" class="common-anchor-header">حذف مهمة<button data-href="#Delete-a-task" class="anchor-icon" translate="no">
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
    </button></h2><p>لحذف مهمة CDC:</p>
<pre><code translate="no" class="language-bash">curl -X POST -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> -d <span class="hljs-string">&#x27;{
  &quot;request_type&quot;:&quot;delete&quot;,
  &quot;request_data&quot;: {
    &quot;task_id&quot;: &quot;30d1e325df604ebb99e14c2a335a1421&quot;
  }
}&#x27;</span> http://localhost:8444/cdc
<button class="copy-code-btn"></button></code></pre>
<p>استبدل <strong>المضيف المحلي</strong> بعنوان IP الخاص بخادم ميلفوس الهدف.</p>
<p><strong>المعلمات</strong>:</p>
<ul>
<li><strong>task_id</strong>: معرف مهمة CDC المراد حذفها.</li>
</ul>
<p>الاستجابة المتوقعة:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">200</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
