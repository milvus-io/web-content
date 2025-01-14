---
id: embed-with-voyage.md
order: 7
summary: >-
  توضح هذه المقالة كيفية استخدام VoyageEmbeddingFunction لترميز المستندات
  والاستعلامات باستخدام نموذج Voyage.
title: تضمين الرحلة
---
<h1 id="Voyage" class="common-anchor-header">فوياج<button data-href="#Voyage" class="anchor-icon" translate="no">
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
    </button></h1><p>تتكامل Milvus مع نماذج Voyage عبر فئة VoyageEmbeddingFunction. توفر هذه الفئة طرقًا لترميز المستندات والاستعلامات باستخدام نماذج Voyage وإرجاع التضمينات كمتجهات كثيفة متوافقة مع فهرسة Milvus. للاستفادة من هذه الوظيفة، احصل على مفتاح API من <a href="https://docs.voyageai.com/docs/api-key-and-installation">Voyage</a> من خلال إنشاء حساب على منصتهم.</p>
<p>لاستخدام هذه الميزة، قم بتثبيت التبعيات اللازمة:</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>ثم، قم بإنشاء <code translate="no">VoyageEmbeddingFunction</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> VoyageEmbeddingFunction

voyage_ef = VoyageEmbeddingFunction(
    model_name=<span class="hljs-string">&quot;voyage-3&quot;</span>, <span class="hljs-comment"># Defaults to `voyage-3`</span>
    api_key=VOYAGE_API_KEY <span class="hljs-comment"># Provide your Voyage API key</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>المعلمات</strong>:</p>
<ul>
<li><code translate="no">model_name</code> (سلسلة) اسم نموذج Voyage المراد استخدامه للترميز. يمكنك تحديد أي من أسماء نماذج Voyage المتاحة، على سبيل المثال، <code translate="no">voyage-3-lite</code> ، <code translate="no">voyage-finance-2</code> ، إلخ. إذا تركت هذه المعلمة غير محددة، فسيتم استخدام <code translate="no">voyage-3</code>. للحصول على قائمة النماذج المتاحة، راجع <a href="https://docs.voyageai.com/docs/embeddings">وثائق Voyage الرسمية</a>.</li>
<li><code translate="no">api_key</code> (سلسلة) مفتاح API للوصول إلى واجهة برمجة التطبيقات Voyage API. للحصول على معلومات حول كيفية إنشاء مفتاح واجهة برمجة التطبيقات، راجع <a href="https://docs.voyageai.com/docs/api-key-and-installation">مفتاح واجهة برمجة التطبيقات وعميل بايثون</a>.</li>
</ul>
<p>لإنشاء تضمينات للمستندات، استخدم الطريقة <code translate="no">encode_documents()</code>:</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

docs_embeddings = voyage_ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, docs_embeddings)
<span class="hljs-comment"># Print dimension and shape of embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim:&quot;</span>, voyage_ef.dim, docs_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>الناتج المتوقع مشابه لما يلي:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([ 0.02582654, -0.00907086, -0.04604037, ..., -0.01227521,
        0.04420955, -0.00038829]), array([ 0.03844212, -0.01597065, -0.03728884, ..., -0.02118733,
        0.03349845,  0.0065346 ]), array([ 0.05143557, -0.01096631, -0.02690451, ..., -0.02416254,
        0.07658645,  0.03064499])]
Dim: 1024 (1024,)
<button class="copy-code-btn"></button></code></pre>
<p>لإنشاء تضمينات للاستعلامات، استخدم الأسلوب <code translate="no">encode_queries()</code>:</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = voyage_ef.encode_queries(queries)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dim&quot;</span>, voyage_ef.dim, query_embeddings[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>المخرجات المتوقعة مشابهة لما يلي:</p>
<pre><code translate="no" class="language-python">Embeddings: [array([ 0.01733501, -0.0230672 , -0.05208827, ..., -0.00957995,
        0.04493361,  0.01485138]), array([ 0.05937521, -0.00729363, -0.02184347, ..., -0.02107683,
        0.05706626,  0.0263358 ])]
Dim 1024 (1024,)
<button class="copy-code-btn"></button></code></pre>
