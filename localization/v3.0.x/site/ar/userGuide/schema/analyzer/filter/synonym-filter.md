---
id: synonym-filter.md
title: المرادفات
summary: >-
  استخدم مرشح المرادفات لإعادة كتابة الرموز باستخدام قاموس المرادفات أثناء تحليل
  النص.
---
<h1 id="Synonym" class="common-anchor-header">المرادفات<button data-href="#Synonym" class="anchor-icon" translate="no">
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
    </button></h1><p>يقوم عامل التصفية <code translate="no">synonym</code> بإعادة كتابة الرموز وفقًا لقاموس المرادفات، بحيث تتطابق المصطلحات ذات الصلة أثناء البحث. يدعم وضعين للتشغيل وطريقتين لتزويد القاموس:</p>
<ul>
<li><p><strong>وضعي التشغيل</strong> - وضع <code translate="no">expand</code> يحافظ على الرمز الأصلي ويصدر مرادفات إضافية إلى جانبه؛ وضع التطبيع (<code translate="no">expand: false</code>) يعيد كتابة الرموز إلى شكل متعارف عليه.</p></li>
<li><p><strong>مصادر القاموس</strong> - يمكن تسطير القواميس الصغيرة في تكوين المرشح عبر مصفوفة <code translate="no">synonyms</code> ؛ أما القواميس الكبيرة فيجب تخزينها <a href="/docs/ar/manage-file-resources.md">كمورد ملف</a> والإشارة إليها عبر <code translate="no">synonyms_file</code>.</p></li>
</ul>
<h2 id="Dictionary-format" class="common-anchor-header">تنسيق القاموس<button data-href="#Dictionary-format" class="anchor-icon" translate="no">
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
    </button></h2><p>قاموس المرادفات هو عبارة عن مستند نصي عادي (أو مصفوفة مضمنة) يحدد فيه كل سطر قاعدة واحدة. يتم دعم شكلين من القواعد.</p>
<h3 id="Mapping-rule" class="common-anchor-header">قاعدة التعيين<button data-href="#Mapping-rule" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-plaintext">fast, quick =&gt; speedy
<button class="copy-code-btn"></button></code></pre>
<p>يتم إعادة كتابة الرموز الموجودة على اليسار (<code translate="no">fast</code> ، <code translate="no">quick</code>) إلى الرموز الموجودة على اليمين (<code translate="no">speedy</code>). يُسمح بتعدد الأهداف:</p>
<pre><code translate="no" class="language-plaintext">small, little =&gt; tiny, compact
<button class="copy-code-btn"></button></code></pre>
<p>مع <code translate="no">expand: true</code> ، يتم الاحتفاظ بالرموز الأصلية إلى جانب الأهداف:</p>
<ul>
<li><p>الإدخال <code translate="no">fast</code> مع <code translate="no">expand: true</code> → <code translate="no">fast</code>, <code translate="no">speedy</code></p></li>
<li><p>الإدخال <code translate="no">fast</code> مع <code translate="no">expand: false</code> → → <code translate="no">speedy</code></p></li>
</ul>
<h3 id="Equivalence-group" class="common-anchor-header">مجموعة التكافؤ<button data-href="#Equivalence-group" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-plaintext">happy, joyful, cheerful
<button class="copy-code-btn"></button></code></pre>
<p>تعتبر جميع الرموز المدرجة متكافئة:</p>
<ul>
<li><p>مع <code translate="no">expand: true</code> ، أي تكرار لأي رمز مميز في المجموعة ينبعث منه كل رمز مميز في المجموعة. المدخلات <code translate="no">happy</code> → <code translate="no">happy</code> ، <code translate="no">joyful</code> ، <code translate="no">cheerful</code>.</p></li>
<li><p>باستخدام <code translate="no">expand: false</code> ، تتم إعادة كتابة كل تكرار للرمز المميز الأول في المجموعة. المدخلات <code translate="no">joyful</code> → <code translate="no">happy</code> ؛ المدخلات <code translate="no">happy</code> هي بالفعل الرمز الأول في المجموعة ولم تتغير.</p></li>
</ul>
<h2 id="Configuration" class="common-anchor-header">التكوين<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>عامل التصفية <code translate="no">synonym</code> هو عامل تصفية مخصص. حدد <code translate="no">&quot;type&quot;: &quot;synonym&quot;</code> مع واحد على الأقل من <code translate="no">synonyms</code> (مضمن) أو <code translate="no">synonyms_file</code> (خارجي)، بالإضافة إلى علامة <code translate="no">expand</code>.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;synonym&quot;</span>,
            <span class="hljs-string">&quot;synonyms&quot;</span>: [                       <span class="hljs-comment"># inline rules (optional)</span>
                <span class="hljs-string">&quot;fast, quick =&gt; speedy&quot;</span>,
                <span class="hljs-string">&quot;happy, joyful, cheerful&quot;</span>,
            ],
            <span class="hljs-string">&quot;synonyms_file&quot;</span>: {                  <span class="hljs-comment"># external rules (optional)</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;remote&quot;</span>,
                <span class="hljs-string">&quot;resource_name&quot;</span>: <span class="hljs-string">&quot;en_synonyms&quot;</span>,
                <span class="hljs-string">&quot;file_name&quot;</span>: <span class="hljs-string">&quot;synonyms.txt&quot;</span>,
            },
            <span class="hljs-string">&quot;expand&quot;</span>: <span class="hljs-literal">True</span>,
        }
    ],
}
<button class="copy-code-btn"></button></code></pre>
<p>يقبل عامل التصفية <code translate="no">synonym</code> المعلمات التالية.</p>
<table>
   <tr>
     <th><p><strong>المعلمة</strong></p></th>
     <th><p><strong>الوصف</strong></p></th>
     <th><p><strong>افتراضي</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">synonyms</code></p></td>
     <td><p>مصفوفة مضمنة من سلاسل القواعد. تستخدم كل سلسلة تنسيق القاموس الموضح أعلاه. مناسبة للقواميس الصغيرة (حتى بضع عشرات من القواعد).</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">synonyms_file</code></p></td>
     <td><p>مرجع إلى <a href="/docs/ar/manage-file-resources.md">مورد ملف</a> يخزن قواعد المرادفات، واحدة لكل سطر. يُستخدم للقواميس الأكبر. انظر <a href="/docs/ar/synonym-filter.md#External-dictionary-file">ملف القاموس الخارجي</a> أدناه.</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">expand</code></p></td>
     <td><p>علامة منطقية تتحكم في كيفية تطبيق القواعد. صواب يحافظ على الرمز المميز الأصلي ويصدر مرادفات إلى جانبه؛ خطأ يعيد كتابة الرموز إلى شكلها المتعارف عليه (الجانب الأيمن من التعيين أو الرمز الأول لمجموعة التكافؤ).</p></td>
     <td><p>خطأ</p></td>
   </tr>
</table>
<p>يمكنك تحديد <code translate="no">synonyms</code> أو <code translate="no">synonyms_file</code> أو كليهما. عند وجود كليهما، يدمج عامل التصفية المصدرين. يعمل عامل التصفية على الرموز التي تنتجها أداة الترميز؛ لذلك يجب دمجه مع أداة ترميز مثل أداة الترميز <a href="/docs/ar/standard-tokenizer.md">القياسية</a>.</p>
<h3 id="External-dictionary-file" class="common-anchor-header">ملف القاموس الخارجي<button data-href="#External-dictionary-file" class="anchor-icon" translate="no">
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
    </button></h3><p>بالنسبة للقواميس بحجم الإنتاج، قم بتسجيل الملف كمورد ملف بعيد وقم بالرجوع إليه من <code translate="no">synonyms_file</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Register the file once, then reference it from any analyzer that needs it.</span>
client.add_file_resource(
    name=<span class="hljs-string">&quot;en_synonyms&quot;</span>,
    path=<span class="hljs-string">&quot;file/synonyms.txt&quot;</span>,     <span class="hljs-comment"># full S3 object key, including rootPath</span>
)

analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;synonym&quot;</span>,
        <span class="hljs-string">&quot;synonyms_file&quot;</span>: {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;remote&quot;</span>,
            <span class="hljs-string">&quot;resource_name&quot;</span>: <span class="hljs-string">&quot;en_synonyms&quot;</span>,
            <span class="hljs-string">&quot;file_name&quot;</span>: <span class="hljs-string">&quot;synonyms.txt&quot;</span>,
        },
        <span class="hljs-string">&quot;expand&quot;</span>: <span class="hljs-literal">True</span>,
    }],
}
<button class="copy-code-btn"></button></code></pre>
<p>انظر إدارة موارد الملفات للاطلاع على سير العمل الكامل (التحميل، التسجيل، الإدراج، الإزالة) وللاطلاع على النموذج البديل <code translate="no">&quot;type&quot;: &quot;local&quot;</code>.</p>
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
    </button></h2><p>قبل تطبيق المحلل على مخطط مجموعة، تحقق من سلوكه باستخدام <code translate="no">run_analyzer</code>. تستخدم الأمثلة التالية مصفوفة <code translate="no">synonyms</code> المضمنة للإيجاز؛ استبدلها بـ <code translate="no">synonyms_file</code> للقواميس الأكبر.</p>
<h3 id="expand-true--keep-the-original-add-synonyms" class="common-anchor-header"><code translate="no">expand: true</code> - احتفظ بالأصل، وأضف المرادفات<button data-href="#expand-true--keep-the-original-add-synonyms" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;synonym&quot;</span>,
        <span class="hljs-string">&quot;synonyms&quot;</span>: [
            <span class="hljs-string">&quot;fast, quick =&gt; speedy&quot;</span>,
            <span class="hljs-string">&quot;happy, joyful, cheerful&quot;</span>,
        ],
        <span class="hljs-string">&quot;expand&quot;</span>: <span class="hljs-literal">True</span>,
    }],
}

<span class="hljs-built_in">print</span>(client.run_analyzer([<span class="hljs-string">&quot;a fast car&quot;</span>], analyzer_params))
<span class="hljs-comment"># → [[&#x27;a&#x27;, &#x27;fast&#x27;, &#x27;speedy&#x27;, &#x27;car&#x27;]]</span>

<span class="hljs-built_in">print</span>(client.run_analyzer([<span class="hljs-string">&quot;i am happy today&quot;</span>], analyzer_params))
<span class="hljs-comment"># → [[&#x27;i&#x27;, &#x27;am&#x27;, &#x27;happy&#x27;, &#x27;joyful&#x27;, &#x27;cheerful&#x27;, &#x27;today&#x27;]]</span>
<button class="copy-code-btn"></button></code></pre>
<p>يتم الإبقاء على كل من <code translate="no">fast</code> و <code translate="no">happy</code> ؛ يتم الاحتفاظ بمرادفاتهما معًا.</p>
<h3 id="expand-false--rewrite-to-canonical-form" class="common-anchor-header"><code translate="no">expand: false</code> - إعادة الكتابة إلى الشكل المتعارف عليه<button data-href="#expand-false--rewrite-to-canonical-form" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python">analyzer_params_norm = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;synonym&quot;</span>,
        <span class="hljs-string">&quot;synonyms&quot;</span>: [
            <span class="hljs-string">&quot;fast, quick =&gt; speedy&quot;</span>,
            <span class="hljs-string">&quot;happy, joyful, cheerful&quot;</span>,
        ],
        <span class="hljs-string">&quot;expand&quot;</span>: <span class="hljs-literal">False</span>,
    }],
}

<span class="hljs-built_in">print</span>(client.run_analyzer([<span class="hljs-string">&quot;a fast car&quot;</span>], analyzer_params_norm))
<span class="hljs-comment"># → [[&#x27;a&#x27;, &#x27;speedy&#x27;, &#x27;car&#x27;]]</span>

<span class="hljs-built_in">print</span>(client.run_analyzer([<span class="hljs-string">&quot;i am happy today&quot;</span>], analyzer_params_norm))
<span class="hljs-comment"># → [[&#x27;i&#x27;, &#x27;am&#x27;, &#x27;happy&#x27;, &#x27;today&#x27;]]</span>
<button class="copy-code-btn"></button></code></pre>
<p>تقوم قاعدة التعيين بإعادة كتابة <code translate="no">fast</code> إلى <code translate="no">speedy</code>. تترك مجموعة التكافؤ <code translate="no">happy</code> دون تغيير لأنه الرمز الأول في المجموعة؛ أي مدخل يحتوي على <code translate="no">joyful</code> أو <code translate="no">cheerful</code> كان من الممكن إعادة كتابته إلى <code translate="no">happy</code>.</p>
