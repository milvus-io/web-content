---
id: embed-with-mistral-ai.md
order: 11
summary: >-
  توضح هذه المقالة كيفية استخدام دالة التضمين MistralAIEmbeddingFunction لترميز
  المستندات والاستعلامات باستخدام نموذج تضمين الذكاء الاصطناعي Mistral AI.
title: ميسترال للذكاء الاصطناعي
---
<h1 id="Mistral-AI" class="common-anchor-header">ميسترال للذكاء الاصطناعي<button data-href="#Mistral-AI" class="anchor-icon" translate="no">
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
    </button></h1><p>نماذج التضمين من<a href="https://mistral.ai/">ميسترال لل</a>ذكاء الاصطناعي هي نماذج تضمين نصية مصممة لتحويل المدخلات النصية إلى متجهات رقمية كثيفة، مما يؤدي إلى التقاط المعنى الأساسي للنص بشكل فعال. وقد تم تحسين هذه النماذج بدرجة كبيرة لمهام مثل البحث الدلالي وفهم اللغة الطبيعية والتطبيقات المدركة للسياق، مما يجعلها مناسبة لمجموعة واسعة من الحلول التي تعمل بالذكاء الاصطناعي.</p>
<p>تتكامل Milvus مع نماذج التضمين الخاصة ب Mistral AI عبر فئة MistralAIEmbeddingFunction. توفر هذه الفئة طرقًا لترميز المستندات والاستعلامات باستخدام نماذج تضمين Mistral AI وإرجاع التضمينات كمتجهات كثيفة متوافقة مع فهرسة Milvus. للاستفادة من هذه الوظيفة، احصل على مفتاح API من <a href="https://console.mistral.ai/">Mistral AI</a>.</p>
<p>لاستخدام هذه الميزة، قم بتثبيت التبعيات اللازمة:</p>
<pre><code translate="no" class="language-python">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>ثم، قم بإنشاء وظيفة MistralAIEmbeddingFunction:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> MistralAIEmbeddingFunction

ef = MistralAIEmbeddingFunction(
    model_name=<span class="hljs-string">&quot;mistral-embed&quot;</span>, <span class="hljs-comment"># Defaults to `mistral-embed`</span>
    api_key=<span class="hljs-string">&quot;MISTRAL_API_KEY&quot;</span> <span class="hljs-comment"># Provide your Mistral AI API key</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>المعلمات</strong>:</p>
<ul>
<li><p><code translate="no">model_name</code> <em>(سلسلة</em>)</p>
<p>اسم نموذج تضمين Mistral AI المراد استخدامه للترميز. القيمة الافتراضية إلى <code translate="no">mistral-embed</code>. لمزيد من المعلومات، راجع <a href="https://docs.mistral.ai/capabilities/embeddings/">تضمينات</a>.</p></li>
<li><p><code translate="no">api_key</code> <em>(سلسلة</em>)</p>
<p>مفتاح واجهة برمجة التطبيقات للوصول إلى واجهة برمجة تطبيقات Mistral AI.</p></li>
</ul>
<p>لإنشاء تضمينات للمستندات، استخدم الأسلوب <code translate="no">encode_documents()</code>:</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

docs_embeddings = ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, docs_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, ef.dim, docs_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>الناتج المتوقع مشابه لما يلي:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-0.06051636, 0.03207397, 0.04684448, ..., -0.01618958,
       0.02442932, -0.01302338]), array([-0.04675293, 0.06512451, 0.04290771, ..., -0.01454926,
       0.0014801 , 0.00686646]), array([-0.05978394, 0.08728027, 0.02217102, ..., -0.00681305,
       0.03634644, -0.01802063])]
Dim: 1024 (1024,)
<button class="copy-code-btn"></button></code></pre>
<p>لإنشاء تضمينات للاستعلامات، استخدم الأسلوب <code translate="no">encode_queries()</code>:</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>,
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = ef.encode_queries(queries)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim&quot;</span>, ef.dim, query_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>الناتج المتوقع مشابه لما يلي:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([-0.04916382, 0.04568481, 0.03594971, ..., -0.02653503,
       0.02804565, 0.00600815]), array([-0.05938721, 0.07098389, 0.01773071, ..., -0.01708984,
       0.03582764, 0.00366592])]
Dim 1024 (1024,)
<button class="copy-code-btn"></button></code></pre>