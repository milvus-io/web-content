---
id: embed-with-gemini.md
order: 2
summary: يتكامل Milvus مع نماذج OpenAI عبر فئة GeminiEmbeddingFunction.
title: الجوزاء
---
<h1 id="Gemini" class="common-anchor-header">الجوزاء<button data-href="#Gemini" class="anchor-icon" translate="no">
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
    </button></h1><p>تتكامل Milvus مع نماذج Gemini عبر فئة <strong>GeminiEmbeddingFunction</strong>. توفر هذه الفئة طرقًا لترميز المستندات والاستعلامات باستخدام نماذج Gemini المدربة مسبقًا وإرجاع التضمينات كمتجهات كثيفة متوافقة مع فهرسة Milvus. للاستفادة من هذه الوظيفة، احصل على مفتاح واجهة برمجة التطبيقات من <a href="https://ai.google.dev/gemini-api/docs/api-key">Gemini</a> عن طريق إنشاء حساب على منصتهم.</p>
<p>لاستخدام هذه الميزة، قم بتثبيت التبعيات اللازمة:</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>ثم، قم بإنشاء <strong>GeminiEmbeddingFunction</strong>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model

gemini_ef = model.dense.GeminiEmbeddingFunction(
    model_name=<span class="hljs-string">&#x27;gemini-embedding-exp-03-07&#x27;</span>, <span class="hljs-comment"># Specify the model name</span>
    api_key=<span class="hljs-string">&#x27;YOUR_API_KEY&#x27;</span>, <span class="hljs-comment"># Provide your OpenAI API key</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>المعلمات</strong>:</p>
<ul>
<li><p><strong>اسم_النموذج</strong><em>(سلسلة</em>)</p>
<p>اسم نموذج Gemini المراد استخدامه للترميز. الخيارات الصالحة هي <strong>gemini-dembedding-exp-03-07</strong>(افتراضي)، و <strong>models/dembedding-001،</strong> و <strong>models/text-dembedding-004</strong>.</p></li>
<li><p><strong>مفتاح_API</strong><em>(سلسلة</em>)</p>
<p>مفتاح واجهة برمجة التطبيقات للوصول إلى واجهة برمجة تطبيقات Gemini.</p></li>
<li><p><strong>التكوين</strong><em>(types.EmbedContentConfig</em>) تكوين اختياري لنموذج التضمين.</p>
<ul>
<li>يمكن تحديد <strong>البعد_المخرجات</strong> إلى عدد التضمينات الناتجة.</li>
<li>يمكن تحديد <strong>نوع_المهمة</strong> لإنشاء تضمينات مُحسَّنة لمهام محددة، مما يوفر لك الوقت والتكلفة ويحسن الأداء. مدعوم فقط في نموذج <strong>gemini-embedding-exp-03-07</strong>.</li>
</ul></li>
</ul>
<table>
<thead>
<tr><th>اسم النموذج</th><th>الأبعاد</th></tr>
</thead>
<tbody>
<tr><td>gemini-embedding-exp-03-07</td><td>3072<em>(default</em>),1536,768</td></tr>
<tr><td>النماذج/التضمين-001</td><td>768</td></tr>
<tr><td>النماذج/تضمين النص-004</td><td>768</td></tr>
</tbody>
</table>
<table>
<thead>
<tr><th>نوع المهمة</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td>التشابه الدلالي</td><td>تُستخدم لتوليد التضمينات التي تم تحسينها لتقييم تشابه النص.</td></tr>
<tr><td>التصنيف</td><td>يُستخدم لتوليد التضمينات التي تم تحسينها لتصنيف النصوص وفقًا لتسميات محددة مسبقًا.</td></tr>
<tr><td>التجميع</td><td>يُستخدم لإنشاء التضمينات التي تم تحسينها لتجميع النصوص بناءً على أوجه التشابه بينها.</td></tr>
<tr><td>RETRIREREVAL_DOCUMENT وRETREVAL_QUERY_QUERY وQESTION_ANSWERING وFACT_VERIFICATION</td><td>تُستخدم لتوليد التضمينات المحسّنة للبحث عن المستندات أو استرجاع المعلومات.</td></tr>
<tr><td>استعلام_استرجاع_الكود</td><td>يُستخدم لاسترداد كتلة كود بناءً على استعلام لغة طبيعية، مثل فرز مصفوفة أو عكس قائمة مرتبطة. يتم حساب تضمينات كتل التعليمات البرمجية باستخدام RETRIEVAL_DOCUMENT.</td></tr>
</tbody>
</table>
<p>لإنشاء تضمينات للمستندات، استخدم طريقة <strong>ترميز_المستندات()</strong>:</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

docs_embeddings = gemini_ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, docs_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, gemini_ef.dim, docs_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>الناتج المتوقع مشابه لما يلي:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-<span class="hljs-number">0.00894029</span>,  <span class="hljs-number">0.00573813</span>,  <span class="hljs-number">0.013351</span>  , ..., -<span class="hljs-number">0.00042766</span>,
       -<span class="hljs-number">0.00603091</span>, -<span class="hljs-number">0.00341043</span>], shape=(<span class="hljs-number">3072</span>,)), array([ <span class="hljs-number">0.00222347</span>,  <span class="hljs-number">0.03725113</span>,  <span class="hljs-number">0.01152256</span>, ...,  <span class="hljs-number">0.01047272</span>,
       -<span class="hljs-number">0.01701597</span>,  <span class="hljs-number">0.00565377</span>], shape=(<span class="hljs-number">3072</span>,)), array([ <span class="hljs-number">0.00661134</span>,  <span class="hljs-number">0.00232328</span>, -<span class="hljs-number">0.01342973</span>, ..., -<span class="hljs-number">0.00514429</span>,
       -<span class="hljs-number">0.02374139</span>, -<span class="hljs-number">0.00701721</span>], shape=(<span class="hljs-number">3072</span>,))]
Dim: <span class="hljs-number">3072</span> (<span class="hljs-number">3072</span>,)
<button class="copy-code-btn"></button></code></pre>
<p>لإنشاء تضمينات للاستعلامات، استخدم الأسلوب <strong>encode_queries()</strong>:</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = gemini_ef.encode_queries(queries)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim&quot;</span>, gemini_ef.dim, query_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>الناتج المتوقع مشابه لما يلي:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-<span class="hljs-number">0.02066572</span>,  <span class="hljs-number">0.02459551</span>,  <span class="hljs-number">0.00707774</span>, ...,  <span class="hljs-number">0.00259341</span>,
       -<span class="hljs-number">0.01797572</span>, -<span class="hljs-number">0.00626168</span>], shape=(<span class="hljs-number">3072</span>,)), array([ <span class="hljs-number">0.00674969</span>,  <span class="hljs-number">0.03023903</span>,  <span class="hljs-number">0.01230692</span>, ...,  <span class="hljs-number">0.00160009</span>,
       -<span class="hljs-number">0.01710967</span>,  <span class="hljs-number">0.00972728</span>], shape=(<span class="hljs-number">3072</span>,))]
Dim <span class="hljs-number">3072</span> (<span class="hljs-number">3072</span>,)
<button class="copy-code-btn"></button></code></pre>
