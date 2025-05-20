---
id: resource_group.md
related_key: Manage Resource Groups
summary: تعلم كيفية إدارة مجموعات الموارد.
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
    </button></h1><p>في ميلفوس، يمكنك استخدام مجموعة موارد لعزل بعض عقد الاستعلام فعلياً عن العقد الأخرى. يرشدك هذا الدليل إلى كيفية إنشاء مجموعات موارد مخصصة وإدارتها بالإضافة إلى نقل العقد بينها.</p>
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
    </button></h2><p>يمكن أن تحتوي مجموعة الموارد على عدة أو كل عقد الاستعلام في مجموعة Milvus. يمكنك تحديد الطريقة التي تريد بها تخصيص عقد الاستعلام بين مجموعات الموارد بناءً على ما هو الأكثر منطقية بالنسبة لك. على سبيل المثال، في سيناريو متعدد المجموعات، يمكنك تخصيص عدد مناسب من عقد الاستعلام لكل مجموعة موارد وتحميل المجموعات في مجموعة موارد مختلفة، بحيث تكون العمليات داخل كل مجموعة مستقلة فعليًا عن تلك الموجودة في المجموعات الأخرى.</p>
<p>لاحظ أن مثيل Milvus يحتفظ بمجموعة موارد افتراضية لاحتواء جميع عقد الاستعلام عند بدء التشغيل ويسميها <strong>__default_resource_group</strong>.</p>
<p>بدءًا من الإصدار 2.4.1، يوفر Milvus واجهة برمجة تطبيقات مجموعة الموارد التوضيحية، بينما تم إهمال واجهة برمجة تطبيقات مجموعة الموارد القديمة. تُمكِّن واجهة برمجة التطبيقات التوضيحية الجديدة المستخدمين من تحقيق الخصوصية في بيئات السحابة الأصلية بشكل أسهل.</p>
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
<pre><code translate="no" class="language-json">{
    <span class="hljs-string">&quot;requests&quot;</span>: { <span class="hljs-string">&quot;nodeNum&quot;</span>: <span class="hljs-number">1</span> },
    <span class="hljs-string">&quot;limits&quot;</span>: { <span class="hljs-string">&quot;nodeNum&quot;</span>: <span class="hljs-number">1</span> },
    <span class="hljs-string">&quot;transfer_from&quot;</span>: [{ <span class="hljs-string">&quot;resource_group&quot;</span>: <span class="hljs-string">&quot;rg1&quot;</span> }],
    <span class="hljs-string">&quot;transfer_to&quot;</span>: [{ <span class="hljs-string">&quot;resource_group&quot;</span>: <span class="hljs-string">&quot;rg2&quot;</span> }]
}
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>تحدد سمة <strong>الطلبات</strong> الشروط التي يجب أن تستوفيها مجموعة الموارد.</li>
<li>تحدد سمة <strong>الحدود الحدود</strong> الحدود القصوى لمجموعة الموارد.</li>
<li>تصف السمتان <strong>Transfer_from</strong> و <strong>Transfer_to</strong> مجموعات الموارد التي يفضل أن تحصل منها مجموعة الموارد على الموارد وإلى أي مجموعات الموارد يجب أن تنقل الموارد، على التوالي.</li>
</ul>
<p>بمجرد أن يتغير تكوين مجموعة الموارد، يقوم الميلفوس بتعديل موارد عقدة الاستعلام الحالية قدر الإمكان وفقاً للتكوين الجديد، مما يضمن أن جميع مجموعات الموارد تستوفي في النهاية الشرط التالي</p>
<p><code translate="no">.requests.nodeNum &lt; nodeNumOfResourceGroup &lt; .limits.nodeNum.</code></p>
<p>باستثناء الحالات التالية:</p>
<ul>
<li>عندما يكون عدد عُقد الاستعلام في مجموعة Milvus غير كافٍ، أي <code translate="no">NumOfQueryNode &lt; sum(.requests.nodeNum)</code> ، ستكون هناك دائمًا مجموعات موارد بدون عدد كافٍ من عُقد الاستعلام.</li>
<li>عندما يكون عدد عُقد الاستعلام في مجموعة Milvus زائدًا، أي <code translate="no">NumOfQueryNode &gt; sum(.limits.nodeNum)</code> ، سيتم دائمًا وضع عُقد الاستعلام الزائدة في <strong> مجموعة الموارد __المجموعة_الافتراضية_الموارد</strong> أولاً.</li>
</ul>
<p>وبالطبع، إذا تغير عدد عُقد الاستعلام في المجموعة، سيحاول الميلفوس باستمرار تعديلها لتلبية الشروط النهائية. لذلك، يمكنك أولًا تطبيق تغييرات تكوين مجموعة الموارد ثم إجراء تحجيم QueryNode.</p>
<h2 id="Use-declarative-api-to-manage-resource-group" class="common-anchor-header">استخدم واجهة برمجة التطبيقات التوضيحية لإدارة مجموعة الموارد<button data-href="#Use-declarative-api-to-manage-resource-group" class="anchor-icon" translate="no">
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
<p>جميع نماذج التعليمات البرمجية في هذه الصفحة موجودة في PyMilvus 2.4.15. قم بترقية تثبيت PyMilvus قبل تشغيلها.</p>
</div>
<ol>
<li><p>إنشاء مجموعة موارد.</p>
<p>لإنشاء مجموعة موارد، قم بتشغيل ما يلي بعد الاتصال بمثيل Milvus. يفترض المقتطف التالي أن <code translate="no">default</code> هو الاسم المستعار لاتصالك بـ Milvus.</p>
<pre><code translate="no" class="language-Python"><span class="hljs-keyword">import</span> pymilvus

<span class="hljs-comment"># A resource group name should be a string of 1 to 255 characters, starting with a letter or an underscore (_) and containing only numbers, letters, and underscores (_).</span>
name = <span class="hljs-string">&quot;rg&quot;</span>
node_num = <span class="hljs-number">0</span>

<span class="hljs-comment"># create a resource group that exactly hold no query node.</span>
<span class="hljs-keyword">try</span>:
    utility.create_resource_group(name, config=utility.ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: node_num},
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: node_num},
    ), using=<span class="hljs-string">&#x27;default&#x27;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Succeeded in creating resource group <span class="hljs-subst">{name}</span>.&quot;</span>)
<span class="hljs-keyword">except</span> Exception:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Failed to create the resource group.&quot;</span>)
<button class="copy-code-btn"></button></code></pre></li>
<li><p>سرد مجموعات الموارد.</p>
<p>بمجرد إنشاء مجموعة موارد، يمكنك رؤيتها في قائمة مجموعات الموارد.</p>
<p>لعرض قائمة مجموعات الموارد في مثيل ميلفوس، قم بما يلي:</p>
<pre><code translate="no" class="language-Python">rgs = utility.list_resource_groups(using=<span class="hljs-string">&#x27;default&#x27;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Resource group list: <span class="hljs-subst">{rgs}</span>&quot;</span>)

<span class="hljs-comment"># Resource group list: [&#x27;__default_resource_group&#x27;, &#x27;rg&#x27;]</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>وصف مجموعة موارد.</p>
<p>يمكنك جعل ميلفوس يصف مجموعة موارد في قلق على النحو التالي:</p>
<pre><code translate="no" class="language-Python">info = utility.describe_resource_group(name, using=<span class="hljs-string">&quot;default&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Resource group description: <span class="hljs-subst">{info}</span>&quot;</span>)

<span class="hljs-comment"># Resource group description: </span>
<span class="hljs-comment">#        &lt;name:&quot;rg&quot;&gt;,           // string, rg name</span>
<span class="hljs-comment">#        &lt;capacity:1&gt;,            // int, num_node which has been transfer to this rg</span>
<span class="hljs-comment">#        &lt;num_available_node:0&gt;,  // int, available node_num, some node may shutdown</span>
<span class="hljs-comment">#        &lt;num_loaded_replica:{}&gt;, // map[string]int, from collection_name to loaded replica of each collecion in this rg</span>
<span class="hljs-comment">#        &lt;num_outgoing_node:{}&gt;,  // map[string]int, from collection_name to outgoging accessed node num by replica loaded in this rg </span>
<span class="hljs-comment">#        &lt;num_incoming_node:{}&gt;.  // map[string]int, from collection_name to incoming accessed node num by replica loaded in other rg</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>نقل العقد بين مجموعات الموارد.</p>
<p>قد تلاحظ أن مجموعة الموارد الموصوفة لا تحتوي على أي عقدة استعلام بعد. انقل بعض العُقد من مجموعة الموارد الافتراضية إلى المجموعة التي تقوم بإنشائها على النحو التالي: بافتراض وجود عقدة استعلام واحدة حاليًا في <strong>_مجموعة الموارد _المجموعة_الافتراضية_المجموعة_المجموعة_الموارد،</strong> ونريد نقل عقدة واحدة إلى <strong>rg</strong> المنشأة.<code translate="no">update_resource_groups</code> يضمن الذرية لتغييرات التكوين المتعددة، لذلك لن تكون هناك حالات وسيطة مرئية لـ Milvus.</p>
<pre><code translate="no" class="language-Python">source = <span class="hljs-string">&#x27;__default_resource_group&#x27;</span>
target = <span class="hljs-string">&#x27;rg&#x27;</span>
expected_num_nodes_in_default = <span class="hljs-number">0</span>
expected_num_nodes_in_rg = <span class="hljs-number">1</span>

<span class="hljs-keyword">try</span>:
    utility.update_resource_groups({
        source: ResourceGroupConfig(
            requests={<span class="hljs-string">&quot;node_num&quot;</span>: expected_num_nodes_in_default},
            limits={<span class="hljs-string">&quot;node_num&quot;</span>: expected_num_nodes_in_default},
        ),
        target: ResourceGroupConfig(
            requests={<span class="hljs-string">&quot;node_num&quot;</span>: expected_num_nodes_in_rg},
            limits={<span class="hljs-string">&quot;node_num&quot;</span>: expected_num_nodes_in_rg},
        )
    }, using=<span class="hljs-string">&quot;default&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Succeeded in move 1 node(s) from <span class="hljs-subst">{source}</span> to <span class="hljs-subst">{target}</span>.&quot;</span>)
<span class="hljs-keyword">except</span> Exception:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Something went wrong while moving nodes.&quot;</span>)

<span class="hljs-comment"># After a while, succeeded in moving 1 node(s) from __default_resource_group to rg.</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>تحميل المجموعات والأقسام إلى مجموعة موارد.</p>
<p>بمجرد وجود عقد الاستعلام في مجموعة موارد، يمكنك تحميل المجموعات إلى مجموعة الموارد هذه. يفترض المقتطف التالي وجود مجموعة باسم <code translate="no">demo</code> موجودة بالفعل.</p>
<pre><code translate="no" class="language-Python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection

collection = Collection(<span class="hljs-string">&#x27;demo&#x27;</span>)

<span class="hljs-comment"># Milvus loads the collection to the default resource group.</span>
collection.load(replica_number=<span class="hljs-number">2</span>)

<span class="hljs-comment"># Or, you can ask Milvus load the collection to the desired resource group.</span>
<span class="hljs-comment"># make sure that query nodes num should be greater or equal to replica_number</span>
resource_groups = [<span class="hljs-string">&#x27;rg&#x27;</span>]
collection.load(replica_number=<span class="hljs-number">2</span>, _resource_groups=resource_groups) 
<button class="copy-code-btn"></button></code></pre>
<p>أيضًا، يمكنك فقط تحميل قسم في مجموعة موارد وتوزيع نسخه المتماثلة على عدة مجموعات موارد. يفترض ما يلي أن المجموعة المسماة <code translate="no">Books</code> موجودة بالفعل ولديها قسم اسمه <code translate="no">Novels</code>.</p>
<pre><code translate="no" class="language-Python">collection = Collection(<span class="hljs-string">&quot;Books&quot;</span>)

<span class="hljs-comment"># Use the load method of a collection to load one of its partition</span>
collection.load([<span class="hljs-string">&quot;Novels&quot;</span>], replica_number=<span class="hljs-number">2</span>, _resource_groups=resource_groups)

<span class="hljs-comment"># Or, you can use the load method of a partition directly</span>
partition = Partition(collection, <span class="hljs-string">&quot;Novels&quot;</span>)
partition.load(replica_number=<span class="hljs-number">2</span>, _resource_groups=resource_groups)
<button class="copy-code-btn"></button></code></pre>
<p>لاحظ أن <code translate="no">_resource_groups</code> هو معلمة اختيارية، وتركه غير محدد يجعل ميلفوس يقوم بتحميل النسخ المتماثلة على عقد الاستعلام في مجموعة الموارد الافتراضية.</p>
<p>لجعل ميلفوس يقوم بتحميل كل نسخة متماثلة من المجموعة في مجموعة موارد منفصلة، تأكد من أن عدد مجموعات الموارد يساوي عدد النسخ المتماثلة.</p></li>
<li><p>نقل النسخ المتماثلة بين مجموعات الموارد.</p>
<p>يستخدم ميلفوس <a href="/docs/ar/v2.4.x/replica.md">النسخ المتماثلة</a> لتحقيق موازنة التحميل بين <a href="/docs/ar/v2.4.x/glossary.md#Segment">المجموعات</a> الموزعة عبر عدة عقد استعلام. يمكنك نقل نسخ متماثلة معينة من مجموعة ما من مجموعة موارد إلى أخرى على النحو التالي:</p>
<pre><code translate="no" class="language-Python">source = <span class="hljs-string">&#x27;__default_resource_group&#x27;</span>
target = <span class="hljs-string">&#x27;rg&#x27;</span>
collection_name = <span class="hljs-string">&#x27;c&#x27;</span>
num_replicas = <span class="hljs-number">1</span>

<span class="hljs-keyword">try</span>:
    utility.transfer_replica(source, target, collection_name, num_replicas, using=<span class="hljs-string">&quot;default&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Succeeded in moving <span class="hljs-subst">{num_node}</span> replica(s) of <span class="hljs-subst">{collection_name}</span> from <span class="hljs-subst">{source}</span> to <span class="hljs-subst">{target}</span>.&quot;</span>)
<span class="hljs-keyword">except</span> Exception:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Something went wrong while moving replicas.&quot;</span>)

<span class="hljs-comment"># Succeeded in moving 1 replica(s) of c from __default_resource_group to rg.</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>إسقاط مجموعة موارد.</p>
<p>يمكنك إسقاط مجموعة موارد لا تحتوي على عقدة استعلام (<code translate="no">limits.node_num = 0</code>) في أي وقت. في هذا الدليل، تحتوي مجموعة الموارد <code translate="no">rg</code> الآن على عقدة استعلام واحدة. تحتاج إلى تغيير التكوين <code translate="no">limits.node_num</code> لمجموعة الموارد إلى صفر أولاً.</p>
<pre><code translate="no" class="language-Python"><span class="hljs-keyword">try</span>:
    utility.update_resource_groups({
        <span class="hljs-string">&quot;rg&quot;</span>: utility.ResourceGroupConfig(
            requests={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>},
            limits={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>},
        ),
    }, using=<span class="hljs-string">&quot;default&quot;</span>)
    utility.drop_resource_group(<span class="hljs-string">&quot;rg&quot;</span>, using=<span class="hljs-string">&quot;default&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Succeeded in dropping <span class="hljs-subst">{source}</span>.&quot;</span>)
<span class="hljs-keyword">except</span> Exception:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Something went wrong while dropping <span class="hljs-subst">{source}</span>.&quot;</span>)
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>لمزيد من التفاصيل، يرجى الرجوع إلى <a href="https://github.com/milvus-io/pymilvus/blob/v2.4.3/examples/resource_group_declarative_api.py">الأمثلة ذات الصلة في pymilvus</a></p>
<h2 id="A-good-practice-to-manage-cluster-scaling" class="common-anchor-header">ممارسة جيدة لإدارة توسيع نطاق المجموعة<button data-href="#A-good-practice-to-manage-cluster-scaling" class="anchor-icon" translate="no">
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
    </button></h2><p>في الوقت الحالي، لا يمكن لـ Milvus التوسع بشكل مستقل في البيئات السحابية الأصلية. ومع ذلك، باستخدام <strong>واجهة برمجة تطبيقات مجموعة الموارد التوضيحية</strong> بالاقتران مع تنسيق الحاويات، يمكن لـ Milvus تحقيق عزل الموارد وإدارتها بسهولة لـ QueryNodes. فيما يلي ممارسة جيدة لإدارة QueryNodes في بيئة سحابية:</p>
<ol>
<li><p>بشكل افتراضي، ينشئ Milvus <strong> مجموعة_موارد_افتراضية</strong>. لا يمكن حذف مجموعة الموارد هذه وتعمل أيضًا كمجموعة موارد التحميل الافتراضية لجميع المجموعات ويتم دائمًا تعيين QueryNodes الزائدة عن الحاجة إليها. لذلك، يمكننا إنشاء مجموعة موارد معلقة للاحتفاظ بموارد QueryNode غير المستخدمة، مما يمنع موارد QueryNode من أن تشغلها <strong>_مجموعة_الموارد_الافتراضية_المجموعة</strong>.</p>
<p>بالإضافة إلى ذلك، إذا فرضنا القيد بصرامة <code translate="no">sum(.requests.nodeNum) &lt;= queryNodeNum</code> ، يمكننا التحكم بدقة في تخصيص QueryNode في المجموعة. لنفترض أنه يوجد حاليًا عقدة استعلام واحدة فقط في المجموعة ونقوم بتهيئة المجموعة. إليك مثال على الإعداد:</p>
<pre><code translate="no" class="language-Python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> utility
<span class="hljs-keyword">from</span> pymilvus.client.types <span class="hljs-keyword">import</span> ResourceGroupConfig

_PENDING_NODES_RESOURCE_GROUP=<span class="hljs-string">&quot;__pending_nodes&quot;</span>

<span class="hljs-keyword">def</span> <span class="hljs-title function_">init_cluster</span>(<span class="hljs-params">node_num: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Init cluster with <span class="hljs-subst">{node_num}</span> nodes, all nodes will be put in default resource group&quot;</span>)
    <span class="hljs-comment"># create a pending resource group, which can used to hold the pending nodes that do not hold any data.</span>
    utility.create_resource_group(name=_PENDING_NODES_RESOURCE_GROUP, config=ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>}, <span class="hljs-comment"># this resource group can hold 0 nodes, no data will be load on it.</span>
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">10000</span>}, <span class="hljs-comment"># this resource group can hold at most 10000 nodes </span>
    ))

    <span class="hljs-comment"># update default resource group, which can used to hold the nodes that all initial node in it.</span>
    utility.update_resource_groups({
        <span class="hljs-string">&quot;__default_resource_group&quot;</span>: ResourceGroupConfig(
            requests={<span class="hljs-string">&quot;node_num&quot;</span>: node_num},
            limits={<span class="hljs-string">&quot;node_num&quot;</span>: node_num},
            transfer_from=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}], <span class="hljs-comment"># recover missing node from pending resource group at high priority.</span>
            transfer_to=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}], <span class="hljs-comment"># recover redundant node to pending resource group at low priority.</span>
        )})
    utility.create_resource_group(name=<span class="hljs-string">&quot;rg1&quot;</span>, config=ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>},
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>},
        transfer_from=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}], 
        transfer_to=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
    ))
    utility.create_resource_group(name=<span class="hljs-string">&quot;rg2&quot;</span>, config=ResourceGroupConfig(
        requests={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>},
        limits={<span class="hljs-string">&quot;node_num&quot;</span>: <span class="hljs-number">0</span>},
        transfer_from=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}], 
        transfer_to=[{<span class="hljs-string">&quot;resource_group&quot;</span>: _PENDING_NODES_RESOURCE_GROUP}],
    ))

init_cluster(<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<p>باستخدام كود المثال أعلاه، ننشئ مجموعة موارد باسم <strong>__عُقد_معلقة_للاحتفاظ</strong> بعُقد استعلام إضافية. نقوم أيضًا بإنشاء مجموعتي موارد خاصة بالمستخدم باسم <strong>rg1</strong> و <strong>rg2</strong>. بالإضافة إلى ذلك، نتأكد من أن مجموعة الموارد الأخرى تعطي الأولوية لاستعادة عقد الاستعلام المفقودة أو الزائدة عن الحاجة من <strong>__عقد_انتظار_نود</strong>.</p></li>
<li><p>توسيع نطاق المجموعة</p>
<p>بافتراض أن لدينا وظيفة القياس التالية:</p>
<pre><code translate="no" class="language-Python">
<span class="hljs-keyword">def</span> <span class="hljs-title function_">scale_to</span>(<span class="hljs-params">node_num: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-comment"># scale the querynode number in Milvus into node_num.</span>
    <span class="hljs-keyword">pass</span>
<button class="copy-code-btn"></button></code></pre>
<p>يمكننا استخدام واجهة برمجة التطبيقات لتوسيع نطاق مجموعة موارد محددة إلى عدد معين من عُقد الاستعلام دون التأثير على أي مجموعات موارد أخرى.</p>
<pre><code translate="no" class="language-Python"><span class="hljs-comment"># scale rg1 into 3 nodes, rg2 into 1 nodes</span>
utility.update_resource_groups({
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
<li><p>توسيع نطاق المجموعة إلى الداخل</p>
<p>وبالمثل، يمكننا إنشاء قواعد توسيع نطاق في التي تعطي الأولوية لاختيار QueryNodes من مجموعة الموارد <strong>_pending_nodes</strong>. يمكن الحصول على هذه المعلومات من خلال واجهة برمجة التطبيقات <code translate="no">describe_resource_group</code>. تحقيق هدف التوسع في مجموعة الموارد المحددة.</p>
<pre><code translate="no" class="language-Python"><span class="hljs-comment"># scale rg1 from 3 nodes into 2 nodes</span>
utility.update_resource_groups({
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
<h2 id="How-resource-groups-interacts-with-multiple-replicas" class="common-anchor-header">كيف تتفاعل مجموعات الموارد مع النسخ المتماثلة المتعددة<button data-href="#How-resource-groups-interacts-with-multiple-replicas" class="anchor-icon" translate="no">
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
<li>تمتلك النسخ المتماثلة لمجموعة واحدة ومجموعات الموارد علاقة N إلى N.</li>
<li>عندما يتم تحميل نسخ متماثلة متعددة من مجموعة واحدة في مجموعة موارد واحدة، يتم توزيع QueryNodes من مجموعة الموارد تلك بالتساوي بين النسخ المتماثلة، مما يضمن ألا يتجاوز الفرق في عدد QueryNodes لكل نسخة متماثلة 1.</li>
</ul>
<h1 id="Whats-next" class="common-anchor-header">ما التالي<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><a href="/docs/ar/v2.4.x/rbac.md">تمكين RBAC</a></li>
<li><a href="/docs/ar/v2.4.x/users_and_roles.md">المستخدمون والأدوار</a></li>
</ul>
