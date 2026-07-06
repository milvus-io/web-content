---
id: resource_group.md
related_key: Manage Resource Groups
summary: تعرف على كيفية إدارة مجموعات الموارد.
title: إدارة مجموعات الموارد
---
<h1 id="Manage-Resource-Groups" class="common-anchor-header">إدارة مجموعات الموارد<button data-href="#Manage-Resource-Groups" class="anchor-icon" translate="no">
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
    </button></h1><p>في Milvus، يمكنك استخدام مجموعة الموارد لعزل بعض عقد الاستعلام فعليًا عن غيرها. يرشدك هذا الدليل إلى كيفية إنشاء وإدارة مجموعات الموارد المخصصة، بالإضافة إلى نقل العقد بينها.</p>
<h2 id="What-is-a-resource-group" class="common-anchor-header">ما هي مجموعة الموارد<button data-href="#What-is-a-resource-group" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكن لمجموعة الموارد أن تحتوي على عدد من عقد الاستعلام أو جميعها في مجموعة Milvus. أنت من يقرر كيفية توزيع عقد الاستعلام بين مجموعات الموارد بناءً على ما يناسبك بشكل أفضل. على سبيل المثال، في سيناريو متعدد المجموعات، يمكنك تخصيص عدد مناسب من عقد الاستعلام لكل مجموعة موارد وتحميل المجموعات في مجموعات موارد مختلفة، بحيث تكون العمليات داخل كل مجموعة مستقلة فعليًا عن تلك الموجودة في المجموعات الأخرى.</p>
<p>لاحظ أن مثيل Milvus يحتفظ بمجموعة موارد افتراضية لتضم جميع عقد الاستعلام عند بدء التشغيل ويطلق عليها اسم <strong>__default_resource_group</strong>.</p>
<p>بدءًا من الإصدار 2.4.1، يوفر Milvus واجهة برمجة تطبيقات (API) تعريفية لمجموعات الموارد، في حين تم إهمال واجهة برمجة التطبيقات القديمة لمجموعات الموارد. تتيح واجهة برمجة التطبيقات التعريفية الجديدة للمستخدمين تحقيق خاصية الإيدمبوتنس، مما يسهل إجراء التطوير الثانوي في البيئات السحابية الأصلية.</p>
<h2 id="Concepts-of-resource-group" class="common-anchor-header">مفاهيم مجموعة الموارد<button data-href="#Concepts-of-resource-group" class="anchor-icon" translate="no">
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
    </button></h2><p>يتم وصف مجموعة الموارد من خلال تكوين مجموعة الموارد:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;requests&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;nodeNum&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;limits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;nodeNum&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;transfer_from&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;resource_group&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rg1&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;transfer_to&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;resource_group&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rg2&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>تحدد السمة <strong>requests</strong> الشروط التي يجب أن تفي بها مجموعة الموارد.</li>
<li>تحدد السمة <strong>limits</strong> الحدود القصوى لمجموعة الموارد.</li>
<li>تصف السمتان <strong>transfer_from</strong> و <strong>transfer_to</strong> مجموعات الموارد التي يُفضل أن تحصل منها مجموعة الموارد على الموارد، ومجموعات الموارد التي يجب أن تنقل إليها الموارد، على التوالي.</li>
</ul>
<p>بمجرد تغيير تكوين مجموعة الموارد، سيقوم Milvus بتعديل موارد عقدة الاستعلام الحالية قدر الإمكان وفقًا للتكوين الجديد، مما يضمن أن جميع مجموعات الموارد ستستوفي في النهاية الشرط التالي:</p>
<p><code translate="no">.requests.nodeNum &lt; nodeNumOfResourceGroup &lt; .limits.nodeNum.</code></p>
<p>باستثناء الحالات التالية:</p>
<ul>
<li>عندما يكون عدد عقد الاستعلام (QueryNodes) في مجموعة Milvus غير كافٍ، أي <code translate="no">NumOfQueryNode &lt; sum(.requests.nodeNum)</code> ، ستكون هناك دائمًا مجموعات موارد تفتقر إلى عدد كافٍ من عقد الاستعلام.</li>
<li>عندما يكون عدد عقد الاستعلام (QueryNodes) في مجموعة Milvus زائدًا، أي <code translate="no">NumOfQueryNode &gt; sum(.limits.nodeNum)</code> ، فسيتم دائمًا وضع عقد الاستعلام الزائدة في <strong>__default_resource_group</strong> أولاً.</li>
</ul>
<p>وبالطبع، إذا تغير عدد عقد الاستعلام (QueryNodes) في المجموعة، فسيحاول Milvus باستمرار التكيف لتلبية الشروط النهائية. لذلك، يمكنك أولاً تطبيق تغييرات تكوين مجموعة الموارد ثم إجراء توسيع نطاق عقد الاستعلام (QueryNode).</p>
<h2 id="Use-declarative-api-to-manage-resource-group" class="common-anchor-header">استخدم واجهة برمجة التطبيقات (API) التصريحية لإدارة مجموعة الموارد<button data-href="#Use-declarative-api-to-manage-resource-group" class="anchor-icon" translate="no">
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
<p>جميع أمثلة الكود في هذه الصفحة مكتوبة بلغة PyMilvus 2.6.16. قم بترقية إصدار PyMilvus المثبت لديك قبل تشغيلها.</p>
</div>
<ol>
<li><p>إنشاء مجموعة موارد.</p>
<p>لإنشاء مجموعة موارد، قم بتشغيل ما يلي بعد الاتصال بمثيل Milvus. يفترض المقتطف التالي أن <code translate="no">default</code> هو الاسم المستعار لاتصال Milvus الخاص بك.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> pymilvus

<span class="hljs-comment"># A resource group name should be a string of 1 to 255 characters, starting with a letter or an underscore (_) and containing only numbers, letters, and underscores (_).</span>
name = <span class="hljs-string">&quot;rg&quot;</span>
node_num = <span class="hljs-number">0</span>

<span class="hljs-comment"># create a resource group that exactly hold no query node.</span>
<span class="hljs-keyword">try</span>:
    milvus_client.create_resource_group(name, config=ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: node_num},
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: node_num},
    ))
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Succeeded in creating resource group <span class="hljs-subst">{name}</span>.&quot;</span>)
<span class="hljs-keyword">except</span> Exception:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Failed to create the resource group.&quot;</span>)
<button class="copy-code-btn"></button></code></pre></li>
<li><p>سرد مجموعات الموارد.</p>
<p>بمجرد إنشاء مجموعة موارد، يمكنك رؤيتها في قائمة مجموعات الموارد.</p>
<p>لعرض قائمة مجموعات الموارد في مثيل Milvus، اتبع الخطوات التالية:</p>
<pre><code translate="no" class="language-python">rgs = milvus_client.list_resource_groups()
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Resource group list: <span class="hljs-subst">{rgs}</span>&quot;</span>)

<span class="hljs-comment"># Resource group list: [&#x27;__default_resource_group&#x27;, &#x27;rg&#x27;]</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>وصف مجموعة موارد.</p>
<p>يمكنك جعل Milvus يصف مجموعة الموارد المعنية على النحو التالي:</p>
<pre><code translate="no" class="language-python">info = milvus_client.describe_resource_group(name)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Resource group description: <span class="hljs-subst">{info}</span>&quot;</span>)

<span class="hljs-comment"># Resource group description: </span>
<span class="hljs-comment"># ResourceGroupInfo:</span>
<span class="hljs-comment">#   &lt;name:rg1&gt;,     // resource group name</span>
<span class="hljs-comment">#   &lt;capacity:0&gt;,   // resource group capacity</span>
<span class="hljs-comment">#   &lt;num_available_node:1&gt;,  // resource group node num</span>
<span class="hljs-comment">#   &lt;num_loaded_replica:{}&gt;, // collection loaded replica num in resource group</span>
<span class="hljs-comment">#   &lt;num_outgoing_node:{}&gt;, // node num which still in use by replica in other resource group</span>
<span class="hljs-comment">#   &lt;num_incoming_node:{}&gt;, // node num which is in use by replica but belong to other resource group </span>
<span class="hljs-comment">#   &lt;config:{}&gt;,            // resource group config</span>
<span class="hljs-comment">#   &lt;nodes:[]&gt;              // node detail info</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>نقل العقد بين مجموعات الموارد.</p>
<p>قد تلاحظ أن مجموعة الموارد الموصوفة لا تحتوي على أي عقدة استعلام حتى الآن. انقل بعض العقد من مجموعة الموارد الافتراضية إلى المجموعة التي أنشأتها على النحو التالي:
بافتراض وجود عقدة استعلام واحدة حاليًا في <strong>__default_resource_group</strong> الخاصة بالمجموعة، ونريد نقل عقدة واحدة إلى <strong>مجموعة الموارد</strong> التي تم إنشاؤها.
يضمن الأمر<code translate="no">update_resource_groups</code> الترابطية للتغييرات المتعددة في التكوين، لذا لن تظهر أي حالات وسيطة لـ Milvus.</p>
<pre><code translate="no" class="language-python">source = <span class="hljs-string">&#x27;__default_resource_group&#x27;</span>
target = <span class="hljs-string">&#x27;rg&#x27;</span>
expected_num_nodes_in_default = <span class="hljs-number">0</span>
expected_num_nodes_in_rg = <span class="hljs-number">1</span>

<span class="hljs-keyword">try</span>:
    milvus_client.update_resource_groups({
        source: ResourceGroupConfig(
            requests={<span class="hljs-string">&quot;node_num&quot;</span>: expected_num_nodes_in_default},
            limits={<span class="hljs-string">&quot;node_num&quot;</span>: expected_num_nodes_in_default},
        ),
        target: ResourceGroupConfig(
            requests={<span class="hljs-string">&quot;node_num&quot;</span>: expected_num_nodes_in_rg},
            limits={<span class="hljs-string">&quot;node_num&quot;</span>: expected_num_nodes_in_rg},
        )
    })
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Succeeded in move 1 node(s) from <span class="hljs-subst">{source}</span> to <span class="hljs-subst">{target}</span>.&quot;</span>)
<span class="hljs-keyword">except</span> Exception:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Something went wrong while moving nodes.&quot;</span>)

<span class="hljs-comment"># After a while, succeeded in moving 1 node(s) from __default_resource_group to rg.</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>قم بتحميل المجموعات والأقسام إلى مجموعة الموارد.</p>
<p>بمجرد وجود عقد استعلام في مجموعة موارد، يمكنك تحميل المجموعات إلى مجموعة الموارد هذه. يفترض المقتطف التالي وجود مجموعة باسم <code translate="no">demo</code> بالفعل.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection

collection_name = <span class="hljs-string">&quot;demo&quot;</span>

<span class="hljs-comment"># Milvus loads the collection to the default resource group.</span>
milvus_client.load_collection(collection_name, replica_number=<span class="hljs-number">2</span>)

<span class="hljs-comment"># Or, you can ask Milvus load the collection to the desired resource group.</span>
<span class="hljs-comment"># make sure that query nodes num should be greater or equal to replica_number</span>
resource_groups = [<span class="hljs-string">&#x27;rg&#x27;</span>]
milvus_client.load_collection(replica_number=<span class="hljs-number">2</span>, _resource_groups=resource_groups) 
<button class="copy-code-btn"></button></code></pre>
<p>كما يمكنك ببساطة تحميل قسم إلى مجموعة موارد وتوزيع نسخه المتماثلة على عدة مجموعات موارد. يفترض المقتطف التالي وجود مجموعة باسم <code translate="no">Books</code> بالفعل وأنها تحتوي على قسم باسم <code translate="no">Novels</code>.</p>
<pre><code translate="no" class="language-python">collection = <span class="hljs-string">&quot;Books&quot;</span>
partition = <span class="hljs-string">&quot;Novels&quot;</span>

<span class="hljs-comment"># Use the load method of a collection to load one of its partition</span>
milvus_client.load_partitions(collection, [partition], replica_number=<span class="hljs-number">2</span>, _resource_groups=resource_groups)
<button class="copy-code-btn"></button></code></pre>
<p>لاحظ أن <code translate="no">_resource_groups</code> هو معلمة اختيارية، وتركها غير محددة سيؤدي إلى قيام Milvus بتحميل النسخ المتماثلة على عقد الاستعلام في مجموعة الموارد الافتراضية.</p>
<p>لجعل Milvus يقوم بتحميل كل نسخة متماثلة لمجموعة في مجموعة موارد منفصلة، تأكد من أن عدد مجموعات الموارد يساوي عدد النسخ المتماثلة.</p></li>
<li><p>نقل النسخ المتماثلة بين مجموعات الموارد.</p>
<p>يستخدم Milvus <a href="/docs/ar/v2.6.x/replica.md">النسخ المتماثلة</a> لتحقيق توازن الحمل بين <a href="/docs/ar/v2.6.x/glossary.md#Segment">المقاطع</a> الموزعة عبر عدة عقد استعلام. يمكنك نقل نسخ متماثلة معينة من مجموعة ما من مجموعة موارد إلى أخرى على النحو التالي:</p>
<pre><code translate="no" class="language-python">source = <span class="hljs-string">&#x27;__default_resource_group&#x27;</span>
target = <span class="hljs-string">&#x27;rg&#x27;</span>
collection_name = <span class="hljs-string">&#x27;c&#x27;</span>
num_replicas = <span class="hljs-number">1</span>

<span class="hljs-keyword">try</span>:
    milvus_client.transfer_replica(source, target, collection_name, num_replicas)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Succeeded in moving <span class="hljs-subst">{num_replicas}</span> replica(s) of <span class="hljs-subst">{collection_name}</span> from <span class="hljs-subst">{source}</span> to <span class="hljs-subst">{target}</span>.&quot;</span>)
<span class="hljs-keyword">except</span> Exception:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Something went wrong while moving replicas.&quot;</span>)

<span class="hljs-comment"># Succeeded in moving 1 replica(s) of c from __default_resource_group to rg.</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>إزالة مجموعة موارد.</p>
<p>يمكنك حذف مجموعة موارد لا تحتوي على أي عقدة استعلام (<code translate="no">limits.node_num = 0</code>) في أي وقت. في هذا الدليل، تحتوي مجموعة الموارد <code translate="no">rg</code> الآن على عقدة استعلام واحدة. تحتاج أولاً إلى تغيير التكوين <code translate="no">limits.node_num</code> لمجموعة الموارد إلى صفر.</p>
<pre><code translate="no" class="language-python">resource_group = <span class="hljs-string">&quot;rg
try:
    milvus_client.update_resource_groups({
        resource_group: ResourceGroupConfig(
            requests={&quot;</span>node_num<span class="hljs-string">&quot;: 0},
            limits={&quot;</span>node_num<span class="hljs-string">&quot;: 0},
        ),
    })
    milvus_client.drop_resource_group(resource_group)
    print(f&quot;</span>Succeeded <span class="hljs-keyword">in</span> dropping {resource_group}.<span class="hljs-string">&quot;)
except Exception:
    print(f&quot;</span>Something went wrong <span class="hljs-keyword">while</span> dropping {resource_group}.<span class="hljs-string">&quot;)
</span><button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>لمزيد من التفاصيل، يرجى الرجوع إلى <a href="https://github.com/milvus-io/pymilvus/blob/v2.4.3/examples/resource_group_declarative_api.py">الأمثلة ذات الصلة في pymilvus</a></p>
<h2 id="A-good-practice-to-manage-cluster-scaling" class="common-anchor-header">ممارسة جيدة لإدارة توسيع نطاق الكتلة<button data-href="#A-good-practice-to-manage-cluster-scaling" class="anchor-icon" translate="no">
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
    </button></h2><p>حاليًا، لا يمكن لـ Milvus توسيع نطاقه أو تقليصه بشكل مستقل في البيئات السحابية الأصلية. ومع ذلك، باستخدام <strong>واجهة برمجة تطبيقات مجموعة الموارد التصريحية (Declarative Resource Group API)</strong> بالاقتران مع تنسيق الحاويات، يمكن لـ Milvus تحقيق عزل الموارد وإدارتها بسهولة لعقد الاستعلام (QueryNodes).
فيما يلي ممارسة جيدة لإدارة عقد الاستعلام (QueryNodes) في بيئة سحابية:</p>
<ol>
<li><p>بشكل افتراضي، يقوم Milvus بإنشاء <strong>__default_resource_group</strong>. لا يمكن حذف مجموعة الموارد هذه، كما أنها تعمل كمجموعة الموارد الافتراضية للتحميل لجميع المجموعات، ويتم تخصيص عقد الاستعلام الزائدة لها دائمًا. لذلك، يمكننا إنشاء مجموعة موارد معلقة لاحتواء موارد «QueryNode» غير المستخدمة، مما يمنع احتلال موارد «QueryNode» من قبل مجموعة <strong> الموارد __default_resource_group</strong>.</p>
<p>بالإضافة إلى ذلك، إذا قمنا بفرض القيد <code translate="no">sum(.requests.nodeNum) &lt;= queryNodeNum</code> بصرامة، فيمكننا التحكم بدقة في تخصيص عقد الاستعلام (QueryNodes) في المجموعة. لنفترض أن هناك حاليًا عقدة استعلام واحدة فقط في المجموعة، ثم نقوم بتهيئة المجموعة.
فيما يلي مثال على الإعداد:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.client.types <span class="hljs-keyword">import</span> ResourceGroupConfig

_PENDING_NODES_RESOURCE_GROUP=<span class="hljs-string">&quot;__pending_nodes&quot;</span>

<span class="hljs-keyword">def</span> <span class="hljs-title function_">init_cluster</span>(<span class="hljs-params">node_num: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Init cluster with <span class="hljs-subst">{node_num}</span> nodes, all nodes will be put in default resource group&quot;</span>)
    <span class="hljs-comment"># create a pending resource group, which can used to hold the pending nodes that do not hold any data.</span>
    milvus_client.create_resource_group(name=_PENDING_NODES_RESOURCE_GROUP, config=ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>}, <span class="hljs-comment"># this resource group can hold 0 nodes, no data will be load on it.</span>
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">10000</span>}, <span class="hljs-comment"># this resource group can hold at most 10000 nodes </span>
    ))

    <span class="hljs-comment"># update default resource group, which can used to hold the nodes that all initial node in it.</span>
    milvus_client.update_resource_groups({
        <span class="hljs-string">&quot;__default_resource_group&quot;</span>: ResourceGroupConfig(
            requests={<span class="hljs-string">&quot;node_num&quot;</span>: node_num},
            limits={<span class="hljs-string">&quot;node_num&quot;</span>: node_num},
            transfer_from=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}], <span class="hljs-comment"># recover missing node from pending resource group at high priority.</span>
            transfer_to=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}], <span class="hljs-comment"># recover redundant node to pending resource group at low priority.</span>
        )})
    milvus_client.create_resource_group(name=<span class="hljs-string">&quot;rg1&quot;</span>, config=ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>},
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>},
        transfer_from=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}], 
        transfer_to=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
    ))
    milvus_client.create_resource_group(name=<span class="hljs-string">&quot;rg2&quot;</span>, config=ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>},
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>},
        transfer_from=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}], 
        transfer_to=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
    ))

init_cluster(<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<p>باستخدام كود المثال أعلاه، نقوم بإنشاء مجموعة موارد باسم <strong>__pending_nodes</strong> لتخزين عقد QueryNode الإضافية. كما نقوم بإنشاء مجموعتي موارد خاصتين بالمستخدمين باسم <strong>rg1</strong> و <strong>rg2</strong>. بالإضافة إلى ذلك، نضمن أن تعطي مجموعة الموارد الأخرى الأولوية لاستعادة عقد QueryNode المفقودة أو الزائدة عن الحاجة من <strong>__pending_nodes</strong>.</p></li>
<li><p>توسيع نطاق المجموعة</p>
<p>بافتراض أن لدينا دالة التوسع التالية:</p>
<pre><code translate="no" class="language-python">
<span class="hljs-keyword">def</span> <span class="hljs-title function_">scale_to</span>(<span class="hljs-params">node_num: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-comment"># scale the querynode number in Milvus into node_num.</span>
    <span class="hljs-keyword">pass</span>
<button class="copy-code-btn"></button></code></pre>
<p>يمكننا استخدام واجهة برمجة التطبيقات (API) لتوسيع نطاق مجموعة موارد محددة إلى عدد معين من عقد الاستعلام (QueryNodes) دون التأثير على أي مجموعات موارد أخرى.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># scale rg1 into 3 nodes, rg2 into 1 nodes</span>
milvus_client.update_resource_groups({
    <span class="hljs-string">&quot;rg1&quot;</span>: ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">3</span>},
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">3</span>},
        transfer_from=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
        transfer_to=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
    ),
    <span class="hljs-string">&quot;rg2&quot;</span>: ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">1</span>},
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">1</span>},
        transfer_from=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
        transfer_to=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
    ),
})
scale_to(<span class="hljs-number">5</span>)
<span class="hljs-comment"># rg1 has 3 nodes, rg2 has 1 node, __default_resource_group has 1 node.</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>تقليص حجم المجموعة</p>
<p>وبالمثل، يمكننا وضع قواعد لتقليص المجموعة تعطي الأولوية لاختيار عقد الاستعلام من مجموعة الموارد <strong>__pending_nodes</strong>. ويمكن الحصول على هذه المعلومات من خلال واجهة برمجة التطبيقات (API) <code translate="no">describe_resource_group</code>. تحقيق هدف تقليص مجموعة الموارد المحددة.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># scale rg1 from 3 nodes into 2 nodes</span>
milvus_client.update_resource_groups({
    <span class="hljs-string">&quot;rg1&quot;</span>: ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">2</span>},
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">2</span>},
        transfer_from=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
        transfer_to=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
    ),
})

<span class="hljs-comment"># rg1 has 2 nodes, rg2 has 1 node, __default_resource_group has 1 node, __pending_nodes has 1 node.</span>
scale_to(<span class="hljs-number">4</span>)
<span class="hljs-comment"># scale the node in __pending_nodes</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="How-resource-groups-interacts-with-multiple-replicas" class="common-anchor-header">كيف تتفاعل مجموعات الموارد مع النسخ المتعددة<button data-href="#How-resource-groups-interacts-with-multiple-replicas" class="anchor-icon" translate="no">
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
<li>ترتبط النسخ المتماثلة لمجموعة واحدة ومجموعات الموارد بعلاقة N-إلى-N.</li>
<li>عند تحميل نسخ متعددة من مجموعة واحدة إلى مجموعة موارد واحدة، يتم توزيع عقد الاستعلام (QueryNodes) الخاصة بتلك المجموعة بالتساوي بين النسخ، مما يضمن ألا يتجاوز الفرق في عدد عقد الاستعلام لكل نسخة 1.</li>
</ul>
<h1 id="Whats-next" class="common-anchor-header">الخطوة التالية<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h1><p>لنشر مثيل Milvus متعدد المستأجرين، اقرأ ما يلي:</p>
<ul>
<li><a href="/docs/ar/v2.6.x/rbac.md">تمكين RBAC</a></li>
<li><a href="/docs/ar/v2.6.x/users_and_roles.md">المستخدمون والأدوار</a></li>
</ul>
