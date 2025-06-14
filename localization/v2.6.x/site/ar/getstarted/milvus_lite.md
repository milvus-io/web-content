---
id: milvus_lite.md
summary: ابدأ مع ميلفوس لايت
title: تشغيل ميلفوس لايت محلياً
---
<h1 id="Run-Milvus-Lite-Locally" class="common-anchor-header">تشغيل ميلفوس لايت محلياً<button data-href="#Run-Milvus-Lite-Locally" class="anchor-icon" translate="no">
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
    </button></h1><p>توضح هذه الصفحة كيفية تشغيل Milvus محلياً باستخدام Milvus Lite. Milvus Lite هو نسخة خفيفة الوزن من <a href="https://github.com/milvus-io/milvus">Milvus،</a> وهي قاعدة بيانات متجهة مفتوحة المصدر تعمل على تشغيل تطبيقات الذكاء الاصطناعي مع تضمينات المتجهات والبحث عن التشابه.</p>
<h2 id="Overview" class="common-anchor-header">نظرة عامة<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكن استيراد Milvus Lite إلى تطبيق Python الخاص بك، مما يوفر وظيفة البحث المتجه الأساسية في Milvus. تم تضمين Milvus Lite بالفعل في <a href="https://github.com/milvus-io/pymilvus">مجموعة أدوات تطوير البرمجيات الخاصة بـ Python SDK الخاصة بـ Milvus</a>. يمكن نشره ببساطة باستخدام <code translate="no">pip install pymilvus</code>.</p>
<p>باستخدام Milvus Lite، يمكنك البدء في إنشاء تطبيق ذكاء اصطناعي مع البحث عن التشابه المتجه في غضون دقائق! ميلفوس لايت جيد للتشغيل في البيئة التالية:</p>
<ul>
<li>Jupyter Notebook / Google Colab</li>
<li>أجهزة الكمبيوتر المحمولة</li>
<li>أجهزة الحافة</li>
</ul>
<p>يشترك Milvus Lite في نفس واجهة برمجة التطبيقات مع Milvus Standalone و Distributed، ويغطي معظم الميزات مثل ثبات البيانات المتجهة وإدارتها، وعمليات CRUD المتجهة، والبحث المتجه المتناثر والكثيف عن المتجهات، وتصفية البيانات الوصفية، والمتجهات المتعددة والبحث الهجين. يوفران معًا تجربة متسقة عبر أنواع مختلفة من البيئات، بدءًا من الأجهزة المتطورة إلى المجموعات في السحابة، بما يتناسب مع حالات الاستخدام ذات الأحجام المختلفة. باستخدام نفس الكود من جانب العميل، يمكنك تشغيل تطبيقات GenAI باستخدام Milvus Lite على كمبيوتر محمول أو دفتر Jupyter Notebook، أو Milvus Standalone على حاوية Docker، أو Milvus Distributed على مجموعة Kubernetes ضخمة الحجم تخدم مليارات المتجهات في الإنتاج.</p>
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
    </button></h2><p>يدعم ميلفوس لايت حاليًا البيئات التالية:</p>
<ul>
<li>Ubuntu &gt;= 20.04 (x86_64 و arm64)</li>
<li>MacOS &gt;= 11.0 (Apple Silicon M1/M2 و x86_64)</li>
</ul>
<p>يُرجى ملاحظة أن Milvus Lite مناسب فقط لحالات استخدام البحث المتجه على نطاق صغير. لحالات الاستخدام على نطاق واسع، نوصي باستخدام <a href="https://milvus.io/docs/install-overview.md#Milvus-Standalone">Milvus Standalone</a> أو <a href="https://milvus.io/docs/install-overview.md#Milvus-Distributed">Milvus Distributed</a>. يمكنك أيضًا التفكير في استخدام Milvus المُدار بالكامل على <a href="https://zilliz.com/cloud">Zilliz Cloud</a>.</p>
<h2 id="Set-up-Milvus-Lite" class="common-anchor-header">إعداد ميلفوس لايت<button data-href="#Set-up-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-shell">pip install -U pymilvus
<button class="copy-code-btn"></button></code></pre>
<p>نوصي باستخدام <code translate="no">pymilvus</code>. نظرًا لأن <code translate="no">milvus-lite</code> مضمن في <code translate="no">pymilvus</code> الإصدار 2.4.2 أو أعلى، يمكنك <code translate="no">pip install</code> مع <code translate="no">-U</code> لفرض التحديث إلى أحدث إصدار ويتم تثبيت <code translate="no">milvus-lite</code> تلقائيًا.</p>
<p>إذا كنت ترغب في تثبيت الحزمة <code translate="no">milvus-lite</code> بشكل صريح، أو كنت قد قمت بتثبيت إصدار أقدم من <code translate="no">milvus-lite</code> وترغب في تحديثه، يمكنك القيام بذلك <code translate="no">pip install -U milvus-lite</code>.</p>
<h2 id="Connect-to-Milvus-Lite" class="common-anchor-header">الاتصال بميلفوس لايت<button data-href="#Connect-to-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>في <code translate="no">pymilvus</code> ، حدد اسم ملف محلي كمعلمة uri لـ MilvusClient سيستخدم Milvus Lite.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>بعد تشغيل مقتطف الشفرة أعلاه، سيتم إنشاء ملف قاعدة بيانات باسم <strong>milvus_demo.db</strong> في المجلد الحالي.</p>
<blockquote>
<p><strong><em>ملحوظة:</em></strong> لاحظ أن نفس واجهة برمجة التطبيقات تنطبق أيضًا على Milvus Standalone و Milvus Distributed و Zilliz Cloud، والفرق الوحيد هو استبدال اسم الملف المحلي بنقطة نهاية الخادم البعيد وبيانات الاعتماد، على سبيل المثال<code translate="no">client = MilvusClient(uri=&quot;http://localhost:19530&quot;, token=&quot;username:password&quot;)</code>.</p>
</blockquote>
<h2 id="Examples" class="common-anchor-header">أمثلة<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>فيما يلي عرض توضيحي بسيط يوضح كيفية استخدام Milvus Lite للبحث عن النص. هناك <a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/tutorials">أمثلة</a> أكثر شمولاً لاستخدام Milvus Lite لبناء تطبيقات مثل <a href="https://github.com/milvus-io/bootcamp/blob/master/tutorials/quickstart/build_RAG_with_milvus.ipynb">RAG،</a> <a href="https://github.com/milvus-io/bootcamp/blob/master/tutorials/quickstart/image_search_with_milvus.ipynb">والبحث عن الصور،</a> واستخدام Milvus Lite في إطار عمل RAG الشهير مثل <a href="https://github.com/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_langchain.ipynb">LangChain</a> و <a href="https://github.com/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_llamaindex.ipynb">LlamaIndex</a>!</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
client.create_collection(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    dimension=<span class="hljs-number">384</span>  <span class="hljs-comment"># The vectors we will use in this demo has 384 dimensions</span>
)

<span class="hljs-comment"># Text strings to search from.</span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
<span class="hljs-comment"># For illustration, here we use fake vectors with random numbers (384 dimension).</span>

vectors = [[ np.random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">384</span>) ] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(docs)) ]
data = [ {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>} <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(vectors)) ]
res = client.insert(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    data=data
)

<span class="hljs-comment"># This will exclude any text in &quot;history&quot; subject despite close to the query vector.</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    data=[vectors[<span class="hljs-number">0</span>]],
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    limit=<span class="hljs-number">2</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># a query that retrieves all entities matching filter expressions.</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># delete</span>
res = client.delete(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">الحدود<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>عند تشغيل Milvus Lite، لاحظ أن بعض الميزات غير مدعومة. تلخص الجداول التالية حدود الاستخدام على Milvus Lite.</p>
<h3 id="Collection" class="common-anchor-header">المجموعة</h3><table>
<thead>
<tr><th>الطريقة / المعلمة</th><th>مدعومة في ميلفوس لايت</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md">إنشاء_مجموعة()</a></td><td>الدعم بمعلمات محدودة</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">dimension</code></td><td>Y</td></tr>
<tr><td><code translate="no">primary_field_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">id_type</code></td><td>Y</td></tr>
<tr><td><code translate="no">vector_field_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">metric_type</code></td><td>Y</td></tr>
<tr><td><code translate="no">auto_id</code></td><td>Y</td></tr>
<tr><td><code translate="no">schema</code></td><td>Y</td></tr>
<tr><td><code translate="no">index_params</code></td><td>Y</td></tr>
<tr><td><code translate="no">enable_dynamic_field</code></td><td>Y</td></tr>
<tr><td><code translate="no">num_shards</code></td><td>N</td></tr>
<tr><td><code translate="no">partition_key_field</code></td><td>N</td></tr>
<tr><td><code translate="no">num_partitions</code></td><td>N</td></tr>
<tr><td><code translate="no">consistency_level</code></td><td>N (يدعم فقط <code translate="no">Strong</code> ؛ سيتم التعامل مع أي تكوين على أنه <code translate="no">Strong</code>).</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a></td><td>يدعم الحصول على إحصائيات المجموعة.</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/describe_collection.md">وصف_التجميع()</a></td><td><code translate="no">num_shards</code>و <code translate="no">consistency_level</code> و <code translate="no">collection_id</code> في الاستجابة غير صالحة.</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/has_collection.md">لديها_مجموعة()</a></td><td>يدعم التحقق مما إذا كانت المجموعة موجودة.</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/list_collections.md">سرد_المجموعات()</a></td><td>يدعم سرد كل المجموعات.</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/drop_collection.md">إسقاط_مجموعة()</a></td><td>يدعم إسقاط مجموعة.</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/rename_collection.md">إعادة تسمية_مجموعة()</a></td><td>إعادة تسمية مجموعة غير مدعومة.</td></tr>
</tbody>
</table>
<h3 id="Field--Schema" class="common-anchor-header">الحقل والمخطط</h3><table>
<thead>
<tr><th>الطريقة / المعلمة</th><th>مدعوم في ميلفوس لايت</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md">إنشاء_مخطط()</a></td><td>الدعم بمعلمات محدودة</td></tr>
<tr><td><code translate="no">auto_id</code></td><td>Y</td></tr>
<tr><td><code translate="no">enable_dynamic_field</code></td><td>Y</td></tr>
<tr><td><code translate="no">primary_field</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_key_field</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md">إضافة_حقل()</a></td><td>الدعم بمعلمات محدودة</td></tr>
<tr><td><code translate="no">field_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">datatype</code></td><td>Y</td></tr>
<tr><td><code translate="no">is_primary</code></td><td>Y</td></tr>
<tr><td><code translate="no">max_length</code></td><td>Y</td></tr>
<tr><td><code translate="no">element_type</code></td><td>Y</td></tr>
<tr><td><code translate="no">max_capacity</code></td><td>Y</td></tr>
<tr><td><code translate="no">dim</code></td><td>Y</td></tr>
<tr><td><code translate="no">is_partition_key</code></td><td>N</td></tr>
</tbody>
</table>
<h3 id="Insert--Search" class="common-anchor-header">الإدراج والبحث</h3><table>
<thead>
<tr><th>الطريقة / المعلمة</th><th>مدعوم في ميلفوس لايت</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md">بحث()</a></td><td>الدعم بمعلمات محدودة</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">data</code></td><td>Y</td></tr>
<tr><td><code translate="no">filter</code></td><td>Y</td></tr>
<tr><td><code translate="no">limit</code></td><td>Y</td></tr>
<tr><td><code translate="no">output_fields</code></td><td>Y</td></tr>
<tr><td><code translate="no">search_params</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_names</code></td><td>N</td></tr>
<tr><td><code translate="no">anns_field</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/query.md">استعلام()</a></td><td>الدعم بمعلمات محدودة</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">filter</code></td><td>Y</td></tr>
<tr><td><code translate="no">output_fields</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">ids</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_names</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/get.md">الحصول على ()</a></td><td>الدعم بمعلمات محدودة</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">ids</code></td><td>Y</td></tr>
<tr><td><code translate="no">output_fields</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_names</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/delete.md">حذف()</a></td><td>الدعم بمعلمات محدودة</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">ids</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">filter</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_name</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/insert.md">إدراج ()</a></td><td>الدعم بمعلمات محدودة</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">data</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_name</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/upsert.md">إدراج ()</a></td><td>الدعم بمعلمات محدودة</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">data</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_name</code></td><td>N</td></tr>
</tbody>
</table>
<h3 id="Load--Release" class="common-anchor-header">التحميل والإصدار</h3><table>
<thead>
<tr><th>الطريقة / المعلمة</th><th>مدعوم في ميلفوس لايت</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/load_collection.md">تحميل_مجموعة()</a></td><td>Y</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/release_collection.md">إصدار_مجموعة()</a></td><td>Y</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/get_load_state.md">الحصول على_حالة_التحميل()</a></td><td>الحصول على حالة التحميل غير مدعوم.</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/refresh_load.md">تحديث_التحميل()</a></td><td>تحميل البيانات التي تم إلغاء تحميلها من مجموعة محملة غير معتمد.</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/close.md">إغلاق()</a></td><td>Y</td></tr>
</tbody>
</table>
<h3 id="Index" class="common-anchor-header">فهرس</h3><table>
<thead>
<tr><th>الطريقة / المعلمة</th><th>مدعوم في ميلفوس لايت</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/list_collections.md">list_indexes()</a></td><td>سرد الفهارس مدعوم.</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">field_name</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/create_index.md">إنشاء_الفهرس()</a></td><td>يدعم فقط نوع الفهرس <code translate="no">FLAT</code>.</td></tr>
<tr><td><code translate="no">index_params</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/drop_index.md">إسقاط_الفهرس()</a></td><td>إسقاط الفهارس مدعوم.</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">index_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/describe_index.md">وصف_الفهرس()</a></td><td>وصف الفهارس معتمد.</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">index_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
</tbody>
</table>
<h3 id="Vector-Index-Types" class="common-anchor-header">أنواع الفهرس المتجه</h3><p>يدعم Milvus Lite نوع الفهرس <a href="https://milvus.io/docs/index.md?tab=floating#FLAT">المسطح</a> فقط. يستخدم نوع FLAT بغض النظر عن نوع الفهرس المحدد في المجموعة.</p>
<h3 id="Search-Features" class="common-anchor-header">ميزات البحث</h3><p>يدعم Milvus Lite البحث الهجين في المتجهات المتفرقة والمتجهات المتعددة.</p>
<h3 id="Partition" class="common-anchor-header">التقسيم</h3><p>لا يدعم Milvus Lite الأقسام والطرق المتعلقة بالتقسيم.</p>
<h3 id="Users--Roles" class="common-anchor-header">المستخدمون والأدوار</h3><p>لا يدعم Milvus Lite المستخدمين والأدوار والأساليب ذات الصلة.</p>
<h3 id="Alias" class="common-anchor-header">الأسماء المستعارة</h3><p>لا يدعم Milvus Lite الأسماء المستعارة والأساليب المتعلقة بالأسماء المستعارة.</p>
<h2 id="Migrating-data-from-Milvus-Lite" class="common-anchor-header">ترحيل البيانات من ميلفوس لايت<button data-href="#Migrating-data-from-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكن تصدير جميع البيانات المخزنة في Milvus Lite بسهولة وتحميلها إلى أنواع أخرى من نشر Milvus، مثل Milvus Standalone على Docker، أو Milvus Distributed على K8s، أو Milvus المدارة بالكامل على <a href="https://zilliz.com/cloud">Zilliz Cloud</a>.</p>
<p>يوفّر Milvus Lite أداة سطر أوامر يمكنها تفريغ البيانات في ملف json، والذي يمكن استيراده إلى <a href="https://github.com/milvus-io/milvus">milvus</a> وZilliz <a href="https://zilliz.com/cloud">Cloud</a>(الخدمة السحابية المدارة بالكامل لـ Milvus). سيتم تثبيت أمر ميلفوس لايت مع حزمة ميلفوس لايت بايثون</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Install</span>
pip install -U &quot;pymilvus[bulk_writer]&quot;

milvus-lite dump -h

usage: milvus-lite dump [-h] [-d DB_FILE] [-c COLLECTION] [-p PATH]

optional arguments:
  -h, --help            show this help message and exit
  -d DB_FILE, --db-file DB_FILE
                        milvus lite db file
  -c COLLECTION, --collection COLLECTION
                        collection that need to be dumped
  -p PATH, --path PATH  dump file storage dir
<button class="copy-code-btn"></button></code></pre>
<p>يقوم المثال التالي بتفريغ جميع البيانات من مجموعة <code translate="no">demo_collection</code> المخزنة في <code translate="no">./milvus_demo.db</code> (ملف قاعدة بيانات Milvus Lite)</p>
<p>لتصدير البيانات:</p>
<pre><code translate="no" class="language-shell">milvus-lite dump -d ./milvus_demo.db -c demo_collection -p ./data_dir
<span class="hljs-meta prompt_"># </span><span class="language-bash">./milvus_demo.db: milvus lite db file</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">demo_collection: collection that need to be dumped</span>
<span class="hljs-meta prompt_">#</span><span class="language-bash">./data_dir : dump file storage <span class="hljs-built_in">dir</span></span>
<button class="copy-code-btn"></button></code></pre>
<p>باستخدام ملف التفريغ، يمكنك تحميل البيانات إلى زيليز كلاود عبر <a href="https://docs.zilliz.com/docs/data-import">استيراد البيانات،</a> أو تحميل البيانات إلى خوادم ميلفوس عبر <a href="https://milvus.io/docs/import-data.md">الإدراج بالجملة</a>.</p>
<h2 id="Whats-next" class="common-anchor-header">الخطوة التالية<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد الاتصال بـ Milvus Lite، يمكنك</p>
<ul>
<li><p>التحقق من <a href="/docs/ar/quickstart.md">Quickstart</a> لمعرفة ما يمكن لـ Milvus القيام به.</p></li>
<li><p>تعلم العمليات الأساسية لميلفوس:</p>
<ul>
<li><a href="/docs/ar/manage_databases.md">إدارة قواعد البيانات</a></li>
<li><a href="/docs/ar/manage-collections.md">إدارة المجموعات</a></li>
<li><a href="/docs/ar/manage-partitions.md">إدارة الأقسام</a></li>
<li><a href="/docs/ar/insert-update-delete.md">إدراج وإدراج وحذف وإدراج وحذف</a></li>
<li><a href="/docs/ar/single-vector-search.md">البحث في متجه واحد</a></li>
<li><a href="/docs/ar/multi-vector-search.md">البحث الهجين</a></li>
</ul></li>
<li><p><a href="/docs/ar/upgrade_milvus_cluster-helm.md">ترقية Milvus باستخدام مخطط Helm</a>.</p></li>
<li><p><a href="/docs/ar/scaleout.md">توسيع نطاق مجموعة ميلفوس الخاصة بك</a>.</p></li>
<li><p>نشر مجموعة ميلفوس العنقودية الخاصة بك على السحب:</p>
<ul>
<li><a href="/docs/ar/eks.md">أمازون EKS</a></li>
<li><a href="/docs/ar/gcp.md">جوجل كلاود</a></li>
<li><a href="/docs/ar/azure.md">مايكروسوفت أزور</a></li>
</ul></li>
<li><p>استكشف <a href="/docs/ar/milvus_backup_overview.md">Milvus Backup،</a> وهي أداة مفتوحة المصدر للنسخ الاحتياطي لبيانات Milvus.</p></li>
<li><p>استكشف <a href="/docs/ar/birdwatcher_overview.md">Birdwatcher،</a> وهي أداة مفتوحة المصدر لتصحيح أخطاء ميلفوس وتحديثات التكوين الديناميكية.</p></li>
<li><p>استكشف <a href="https://github.com/zilliztech/attu">Attu،</a> وهي أداة مفتوحة المصدر لواجهة المستخدم الرسومية لإدارة Milvus بسهولة.</p></li>
<li><p><a href="/docs/ar/monitor.md">راقب ميلفوس باستخدام بروميثيوس</a>.</p></li>
</ul>
