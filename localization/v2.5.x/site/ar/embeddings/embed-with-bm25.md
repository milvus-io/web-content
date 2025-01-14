---
id: embed-with-bm25.md
order: 5
summary: >-
  BM25 هي دالة ترتيب تُستخدم في استرجاع المعلومات لتقدير مدى صلة المستندات
  باستعلام بحث معين.
title: BM25
---
<h1 id="BM25" class="common-anchor-header">BM25<button data-href="#BM25" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://en.wikipedia.org/wiki/Okapi_BM25">BM25</a> هي دالة ترتيب تُستخدم في استرجاع المعلومات لتقدير مدى صلة المستندات باستعلام بحث معين. تعمل هذه الدالة على تحسين نهج تردد المصطلح الأساسي من خلال دمج تطبيع طول المستند وإشباع تردد المصطلح. يمكن ل BM25 إنشاء تضمينات متفرقة من خلال تمثيل المستندات كمتجهات لدرجات أهمية المصطلحات، مما يسمح باسترجاع وترتيب فعال في مساحات متجهات متفرقة.</p>
<p>يتكامل ميلفوس مع نموذج BM25 باستخدام فئة <strong>BM25EmbeddingFunction</strong>. تتعامل هذه الفئة مع حساب التضمينات وتعيدها بتنسيق متوافق مع Milvus للفهرسة والبحث. من الضروري لهذه العملية بناء محلل للتضمين الرمزي.</p>
<p>لاستخدام هذه الميزة، قم بتثبيت التبعيات اللازمة:</p>
<pre><code translate="no" class="language-bash">pip install --upgrade pymilvus
pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>لإنشاء مُحلل ترميز بسهولة، تقدم Milvus محللاً افتراضياً لا يتطلب سوى تحديد لغة النص.</p>
<p><strong>مثال</strong>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.sparse.bm25.tokenizers <span class="hljs-keyword">import</span> build_default_analyzer
<span class="hljs-keyword">from</span> pymilvus.model.sparse <span class="hljs-keyword">import</span> BM25EmbeddingFunction

<span class="hljs-comment"># there are some built-in analyzers for several languages, now we use &#x27;en&#x27; for English.</span>
analyzer = build_default_analyzer(language=<span class="hljs-string">&quot;en&quot;</span>)

corpus = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

<span class="hljs-comment"># analyzer can tokenize the text into tokens</span>
tokens = analyzer(corpus[<span class="hljs-number">0</span>])
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;tokens:&quot;</span>, tokens)
<button class="copy-code-btn"></button></code></pre>
<p><strong>المعلمات</strong>:</p>
<ul>
<li><p><strong>اللغة</strong><em>(سلسلة</em>)</p>
<p>لغة النص المراد ترميزه. الخيارات الصالحة هي <strong>en</strong> (الإنجليزية)، <strong>de</strong> (الألمانية)، <strong>fr</strong> (الفرنسية)، <strong>ru</strong> (الروسية)، <strong>sp</strong> (الإسبانية)، <strong>it</strong> (الإيطالية)، <strong>pt</strong> (البرتغالية)، <strong>zh</strong> (الصينية)، <strong>jp</strong> (اليابانية)، <strong>kr</strong> (الكورية).</p></li>
</ul>
<p>الناتج المتوقع مشابه لما يلي:</p>
<pre><code translate="no" class="language-python"><span class="hljs-attr">tokens</span>: [<span class="hljs-string">&#x27;artifici&#x27;</span>, <span class="hljs-string">&#x27;intellig&#x27;</span>, <span class="hljs-string">&#x27;found&#x27;</span>, <span class="hljs-string">&#x27;academ&#x27;</span>, <span class="hljs-string">&#x27;disciplin&#x27;</span>, <span class="hljs-string">&#x27;1956&#x27;</span>]
<button class="copy-code-btn"></button></code></pre>
<p>تقوم خوارزمية BM25 بمعالجة النص عن طريق تقسيمه أولاً إلى رموز باستخدام محلل مدمج، كما هو موضح مع رموز اللغة الإنجليزية مثل <strong>"artifici" و</strong> <strong>"intellig"</strong> و <strong>"academ".</strong> ثم تقوم بجمع إحصائيات حول هذه الرموز، وتقييم تواترها وتوزيعها عبر المستندات. يقوم جوهر BM25 بحساب درجة أهمية كل رمز بناءً على أهميته، حيث تحصل الرموز النادرة على درجات أعلى. تتيح هذه العملية الموجزة ترتيبًا فعالاً للمستندات حسب أهميتها بالنسبة للاستعلام.</p>
<p>لجمع إحصائيات عن مجموعة المستندات، استخدم طريقة <strong>fit()</strong>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the analyzer to instantiate the BM25EmbeddingFunction</span>
bm25_ef = BM25EmbeddingFunction(analyzer)

<span class="hljs-comment"># Fit the model on the corpus to get the statstics of the corpus</span>
bm25_ef.fit(corpus)
<button class="copy-code-btn"></button></code></pre>
<p>ثم استخدم <strong>تشفير_المستندات()</strong> لإنشاء تضمينات للمستندات:</p>
<pre><code translate="no" class="language-python">docs = [
    <span class="hljs-string">&quot;The field of artificial intelligence was established as an academic subject in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the pioneer in conducting significant research in artificial intelligence.&quot;</span>,
    <span class="hljs-string">&quot;Originating in Maida Vale, London, Turing grew up in the southern regions of England.&quot;</span>,
    <span class="hljs-string">&quot;In 1956, artificial intelligence emerged as a scholarly field.&quot;</span>,
    <span class="hljs-string">&quot;Turing, originally from Maida Vale, London, was brought up in the south of England.&quot;</span>
]

<span class="hljs-comment"># Create embeddings for the documents</span>
docs_embeddings = bm25_ef.encode_documents(docs)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, docs_embeddings)
<span class="hljs-comment"># Since the output embeddings are in a 2D csr_array format, we convert them to a list for easier manipulation.</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Sparse dim:&quot;</span>, bm25_ef.dim, <span class="hljs-built_in">list</span>(docs_embeddings)[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>الناتج المتوقع مشابه لما يلي:</p>
<pre><code translate="no" class="language-python">Embeddings:   (0, 0)        1.0208816705336425
  (0, 1)        1.0208816705336425
  (0, 3)        1.0208816705336425
...
  (4, 16)        0.9606986899563318
  (4, 17)        0.9606986899563318
  (4, 20)        0.9606986899563318
Sparse dim: 21 (1, 21)
<button class="copy-code-btn"></button></code></pre>
<p>لإنشاء تضمينات للاستعلامات، استخدم الأسلوب <strong>encode_queries()</strong>:</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded&quot;</span>, 
           <span class="hljs-string">&quot;Where was Alan Turing born?&quot;</span>]

query_embeddings = bm25_ef.encode_queries(queries)

<span class="hljs-comment"># Print embeddings</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Embeddings:&quot;</span>, query_embeddings)
<span class="hljs-comment"># Since the output embeddings are in a 2D csr_array format, we convert them to a list for easier manipulation.</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Sparse dim:&quot;</span>, bm25_ef.dim, <span class="hljs-built_in">list</span>(query_embeddings)[<span class="hljs-number">0</span>].shape)
<button class="copy-code-btn"></button></code></pre>
<p>الناتج المتوقع مشابه لما يلي:</p>
<pre><code translate="no" class="language-python">Embeddings:   (0, 0)        0.5108256237659907
  (0, 1)        0.5108256237659907
  (0, 2)        0.5108256237659907
  (1, 6)        0.5108256237659907
  (1, 7)        0.11554389108992644
  (1, 14)        0.5108256237659907
Sparse dim: 21 (1, 21)
<button class="copy-code-btn"></button></code></pre>
<p><strong>ملاحظات:</strong></p>
<p>عند استخدام <strong>دالة التضمين BM25EmbeddingFunction،</strong> لاحظ أنه لا يمكن تبادل عمليات <strong>ترميز_الاستعلامات(</strong> ) <strong>وترميز المستندات()</strong> رياضيًا. لذلك، لا يتوفر <strong>bm25_ef(النصوص)</strong> المنفذة.</p>
