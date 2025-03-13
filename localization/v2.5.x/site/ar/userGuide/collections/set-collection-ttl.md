---
id: set-collection-ttl.md
title: تعيين TTL للمجموعة
summary: >-
  بمجرد إدراج البيانات في مجموعة، تظل هناك بشكل افتراضي. ومع ذلك، في بعض
  السيناريوهات، قد ترغب في إزالة البيانات أو تنظيفها بعد فترة معينة. في مثل هذه
  الحالات، يمكنك تكوين خاصية وقت بقاء المجموعة حية (TTL) بحيث يقوم Milvus
  تلقائيًا بحذف البيانات بمجرد انتهاء وقت بقاء المجموعة حية.
---
<h1 id="Set-Collection-TTL" class="common-anchor-header">تعيين TTL للمجموعة<button data-href="#Set-Collection-TTL" class="anchor-icon" translate="no">
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
    </button></h1><p>بمجرد إدراج البيانات في مجموعة، تظل هناك بشكل افتراضي. ومع ذلك، في بعض السيناريوهات، قد ترغب في إزالة البيانات أو تنظيفها بعد فترة معينة. في مثل هذه الحالات، يمكنك تكوين خاصية وقت الصلاحية للمجموعة (TTL) بحيث يقوم Milvus تلقائيًا بحذف البيانات بمجرد انتهاء وقت الصلاحية.</p>
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
    </button></h2><p>يتم استخدام Time-to-Live (TTL) بشكل شائع في قواعد البيانات للسيناريوهات التي يجب أن تظل فيها البيانات صالحة أو يمكن الوصول إليها لفترة معينة فقط بعد أي إدراج أو تعديل. بعد ذلك، يمكن إزالة البيانات تلقائيًا.</p>
<p>على سبيل المثال، إذا كنت تقوم بإدخال البيانات يوميًا ولكنك تحتاج فقط إلى الاحتفاظ بالسجلات لمدة 14 يومًا، يمكنك تكوين Milvus لإزالة أي بيانات أقدم من ذلك تلقائيًا عن طريق تعيين TTL TTL للمجموعة إلى <strong>14 × 24 × 3600 = 1209600</strong> ثانية. وهذا يضمن بقاء بيانات ال 14 يومًا الأخيرة فقط في المجموعة.</p>
<p>يتم تحديد خاصية TTL TTL في مجموعة Milvus كعدد صحيح بالثواني. وبمجرد تعيينها، سيتم حذف أي بيانات تتجاوز مدة صلاحيتها المؤقتة تلقائيًا من المجموعة.</p>
<p>نظرًا لأن عملية الحذف غير متزامنة، قد لا تتم إزالة البيانات من نتائج البحث بالضبط بمجرد انقضاء فترة الاختبار المحددة. وبدلاً من ذلك، قد يكون هناك تأخير، حيث تعتمد عملية الحذف على عمليتي تجميع البيانات المهملة (GC) والضغط، اللتين تحدثان على فترات غير محددة.</p>
<h2 id="Set-TTL" class="common-anchor-header">تعيين TTL<button data-href="#Set-TTL" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك تعيين خاصية TTL عندما تقوم بما يلي</p>
<ul>
<li><p><a href="/docs/ar/set-collection-ttl.md#null">إنشاء مجموعة.</a></p></li>
<li><p><a href="/docs/ar/set-collection-ttl.md#null">تغيير خاصية TTL TTL لمجموعة موجودة.</a></p></li>
</ul>
<h3 id="Set-TTL-when-creating-a-collection" class="common-anchor-header">تعيين TTL TTL عند إنشاء مجموعة</h3><p>يوضح مقتطف الشيفرة التالي كيفية تعيين خاصية TTL عند إنشاء مجموعة.</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#javascript">NodeJS</a> <a href="#go">الذهاب</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># With TTL</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_5&quot;</span>,
    schema=schema,
    <span class="hljs-comment"># highlight-start</span>
    properties={
        <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1209600</span>
    }
    <span class="hljs-comment"># highlight-end</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AlterCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.param.Constant;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-comment">// With TTL</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq5</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;customized_setup_5&quot;</span>)
        .collectionSchema(schema)
        <span class="hljs-comment">// highlight-next-line</span>
        .property(Constant.TTL_SECONDS, <span class="hljs-string">&quot;1209600&quot;</span>)
        .build();
client.createCollection(customizedSetupReq5);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> createCollectionReq = {
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_5&quot;</span>,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-comment">// highlight-start</span>
    <span class="hljs-attr">properties</span>: {
        <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1209600</span>
    }
    <span class="hljs-comment">// highlight-end</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/pkg/common&quot;</span>
)

err = cli.CreateCollection(ctx, client.NewCreateCollectionOption(<span class="hljs-string">&quot;customized_setup_5&quot;</span>, schema).
        WithProperty(common.CollectionTTLConfigKey, <span class="hljs-number">1209600</span>)) <span class="hljs-comment">//  TTL in seconds</span>
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        <span class="hljs-comment">// handle error</span>
}
fmt.Println(<span class="hljs-string">&quot;collection created&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{
    &quot;ttlSeconds&quot;: 1209600
}&#x27;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;customized_setup_5\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-TTL-for-an-existing-collection" class="common-anchor-header">تعيين TTL TTL لمجموعة موجودة</h3><p>يوضح مقتطف الشيفرة التالي كيفية تغيير خاصية TTL في مجموعة موجودة.</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#javascript">نودجيز</a> <a href="#go">جو</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">alter_collection_properties</span>(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    properties={<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1209600</span>}
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">String</span>&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
properties.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>, <span class="hljs-string">&quot;1209600&quot;</span>);

<span class="hljs-title class_">AlterCollectionReq</span> alterCollectionReq = <span class="hljs-title class_">AlterCollectionReq</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .<span class="hljs-title function_">properties</span>(properties)
        .<span class="hljs-title function_">build</span>();

client.<span class="hljs-title function_">alterCollection</span>(alterCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">properties</span>: {
        <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">1209600</span>
    }
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;127.0.0.1:19530&quot;</span>

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to connect to milvus server: &quot;</span>, err.Error())
}

<span class="hljs-keyword">defer</span> cli.Close(ctx)

err = cli.AlterCollectionProperties(ctx, milvusclient.NewAlterCollectionPropertiesOption(<span class="hljs-string">&quot;my_collection&quot;</span>).WithProperty(common.CollectionTTLConfigKey, <span class="hljs-number">60</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;customized_setup_5\&quot;,
    \&quot;properties\&quot;: {
        \&quot;collection.ttl.seconds\&quot;: 1209600
    }
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Drop-TTL-setting" class="common-anchor-header">إسقاط إعداد TTL<button data-href="#Drop-TTL-setting" class="anchor-icon" translate="no">
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
    </button></h2><p>إذا قررت الاحتفاظ بالبيانات في مجموعة إلى أجل غير مسمى، يمكنك ببساطة إسقاط إعداد TTL من تلك المجموعة.</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#javascript">نودجيز</a> <a href="#go">جو</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">drop_collection_properties</span>(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    property_keys=[<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">propertyKeys = <span class="hljs-keyword">new</span> <span class="hljs-title class_">String</span>[<span class="hljs-number">1</span>]
propertyKeys[<span class="hljs-number">0</span>] = <span class="hljs-string">&quot;collection.ttl.second&quot;</span>

<span class="hljs-title class_">DropCollectionReq</span> dropCollectionReq = <span class="hljs-title class_">DropCollectionReq</span>.<span class="hljs-title function_">builder</span>()
        .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .<span class="hljs-title function_">propertyKeys</span>(propertyKeys)
        .<span class="hljs-title function_">build</span>();

client.<span class="hljs-title function_">dropCollection</span>(dropCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollectionProperties</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">properties</span>: [<span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>]
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;127.0.0.1:19530&quot;</span>

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to connect to milvus server: &quot;</span>, err.Error())
}

<span class="hljs-keyword">defer</span> cli.Close(ctx)

err = cli.DropCollectionProperties(ctx, milvusclient.NewDropCollectionPropertiesOption(<span class="hljs-string">&quot;my_collection&quot;</span>, common.CollectionTTLConfigKey))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/alter_properties&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;customized_setup_5\&quot;,
    \&quot;properties\&quot;: {
        \&quot;collection.ttl.seconds\&quot;: 60
    }
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
