---
id: search-with-embedding-lists.md
title: 'البحث باستخدام EmbeddingLists: ColBERT و ColPali'
summary: >-
  يوضح هذا الدليل التعليمي كيفية إنشاء أنظمة استرجاع على غرار ColBERT وColPali
  باستخدام البحث EmbeddingList على الحقول الفرعية للمتجهات في StructArray في
  Milvus. استخدمه عندما يتم تمثيل كل من استعلامك والبيانات المخزنة على شكل قوائم
  من المتجهات، وترغب في إجراء استرجاع قائم على التفاعل المتأخر على مستوى الكيان
  باستخدام مقاييس MAX_SIM*.
---
<h1 id="Search-with-EmbeddingLists-ColBERT-and-ColPali" class="common-anchor-header">البحث باستخدام EmbeddingLists: ColBERT و ColPali<button data-href="#Search-with-EmbeddingLists-ColBERT-and-ColPali" class="anchor-icon" translate="no">
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
    </button></h1><p>يوضح هذا البرنامج التعليمي كيفية إنشاء أنظمة استرجاع على غرار ColBERT وColPali باستخدام البحث عن قوائم التضمين (EmbeddingList) في الحقول الفرعية للمتجهات StructArray في Milvus. استخدمه عندما يتم تمثيل كل من استعلامك والبيانات المخزنة على شكل قوائم من المتجهات، وترغب في إجراء استرجاع متأخر على مستوى الكيان باستخدام مقاييس التفاعل المتأخر ( <code translate="no">MAX_SIM*</code> ).</p>
<p>للاطلاع على أساسيات StructArray التي يستند إليها هذا البرنامج التعليمي، راجع <a href="/docs/ar/create-structarray-field.md">«إنشاء حقل StructArray</a>» <a href="/docs/ar/index-structarray-fields.md">و«فهرسة حقول StructArray</a>» <a href="/docs/ar/basic-vector-search-with-structarray.md">و«البحث المتجهي الأساسي باستخدام StructArray</a>». يركز هذا البرنامج التعليمي على سير عمل ColBERT وColPali بدلاً من بناء جملة StructArray العامة.</p>
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
    </button></h2><p>لبناء نظام استرجاع نصي، قد تحتاج إلى تقسيم المستندات إلى أجزاء وتخزين كل جزء مع تضميناته ككيان في قاعدة بيانات متجهات لضمان الدقة والضبط، خاصةً بالنسبة للمستندات الطويلة حيث قد تؤدي تضمينات النص الكامل إلى إضعاف الخصوصية الدلالية أو تجاوز حدود إدخال النموذج.</p>
<p>ومع ذلك، يؤدي تخزين البيانات في أجزاء إلى نتائج بحث على أساس الأجزاء، مما يعني أن عملية الاسترجاع تحدد في البداية <em>المقاطع</em> ذات الصلة بدلاً من <em>المستندات</em> المتماسكة. لمعالجة ذلك، يجب إجراء معالجة إضافية بعد البحث.</p>
<p>ColBERT (arXiv: <a href="https://arxiv.org/abs/2004.12832">2004.12832</a>) هو نظام استرجاع نص-نص يوفر بحثًا فعالاً وناجعًا عن المقاطع من خلال التفاعلات المتأخرة في السياق عبر BERT. وهو يتيح الترميز المستقل للاستعلامات والمستندات على أساس الرموز (token) ويحسب مدى تشابهها.</p>
<h3 id="Token-wise-encoding" class="common-anchor-header">الترميز على مستوى الرموز<button data-href="#Token-wise-encoding" class="anchor-icon" translate="no">
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
    </button></h3><p>أثناء استيعاب البيانات في ColBERT، يتم تقسيم كل وثيقة إلى رموز، ثم يتم تحويلها إلى متجهات وتخزينها كقائمة تضمين، كما في <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo> d→Ed=</mo><mo stretchy="false">[</mo><msub><mrow><mn>ed1</mn></mrow></msub><mo separator="true">,</mo><msub><mrow><mn>ed2</mn></mrow></msub><mo separator="true">,</mo><mo>…</mo><mo separator="true">,</mo><msub><mrow><mi>edn</mi></mrow></msub><mo stretchy="false">]</mo></mrow><annotation encoding="application/x-tex">∈Rn×dd \rightarrow E_d = [e_{d1}, e_{d2}, \dots, e_{dn}] ∈ \R^{n×d}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mrel"></span><span class="mord mathnormal">d</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">→</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight"> </span></span></span></span></span></span></span></span></span></span></span> E <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mrel"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">d​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mrel"></span> <span class="katex"><span class="katex-html" aria-hidden="true"></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mopen"> </span></span> = <span class="katex"><span class="katex-html" aria-hidden="true"></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mopen"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen"> </span></span></span></span>[ <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">d1​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span></span></span></span></span></span></span></span><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">d2​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="minner"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct"></span><span class="minner">…</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mclose"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">dn​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mclose"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mclose">]</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathbb"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mrel">∈</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathbb"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"> </span></span></span></span></span></span></span></span></span></span></span></span> R <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span><span class="mord mathnormal mtight">n×d</span></span></span></span></span></span></span></span></span></span></span></span>. عند وصول استعلام، يتم أيضًا تجزئته وتحويله إلى متجهات وتخزينه كقائمة تضمين، كما في <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo> q→Eq=</mo><mo stretchy="false">[</mo><msub><mrow><mn>eq1</mn></mrow></msub><mo separator="true">,</mo><msub><mrow><mn>eq2</mn></mrow></msub><mo separator="true">,</mo><mo>…</mo><mo separator="true">,</mo><msub><mrow><mi>eqm</mi></mrow></msub><mo stretchy="false">]</mo></mrow><annotation encoding="application/x-tex">∈Rm×dq \rightarrow E_q = [e_{q1}, e_{q2}, \dots, e_{qm}] ∈ \R^{m×d}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.625em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">q</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mrel">→</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9694em;vertical-align:-0.2861em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.03588em;"> </span></span></span></span></span></span></span></span></span></span></span> E <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mrel"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">q​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span><span class="mrel"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel"> =</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mopen"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0361em;vertical-align:-0.2861em;"></span><span class="mopen"> </span></span> [<span class="base"><span class="mord"><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">q1​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">q2​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct"></span><span class="minner">…</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mclose"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">qm​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span><span class="mclose"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mclose">]</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">∈</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathbb"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"> </span></span></span></span></span></span></span></span></span></span></span></span> R <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span><span class="mord mathnormal mtight">m×d</span></span></span></span></span></span></span></span></span></span></span></span>.</p>
<p>في الصيغ أعلاه،</p>
<ul>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">dd</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal">d</span></span></span></span>: وثيقة</p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">qq</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.625em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">q</span></span></span></span>: الاستعلام</p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">EdE_d</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;">E</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight"></span></span></span></span><span class="vlist-s">d​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>: قائمة التضمين التي تمثل الوثيقة.</p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">EqE_q</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9694em;vertical-align:-0.2861em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;">E</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.03588em;"></span></span></span></span><span class="vlist-s">q​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span></span></span></span>: قائمة التضمين التي تمثل الاستعلام.</p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">[</mo><msub><mrow><mn>ed1</mn></mrow></msub><mo separator="true">,</mo><msub><mrow><mn>ed2</mn></mrow></msub><mo separator="true">,</mo><mo>…</mo><mo separator="true">,</mo><msub><mrow><mi>edn</mi></mrow></msub><mo stretchy="false">]</mo><msup><mrow><mi>∈Rn×d</mi></mrow></msup></mrow><annotation encoding="application/x-tex">[e_{d1}, e_{d2}, \dots, e_{dn}] ∈ \R^{n×d}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">[</span><span class="mord"><span class="mord mathnormal">e</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span></span></span></span></span><span class="vlist-s">d1​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mpunct"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">e</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span></span></span></span></span><span class="vlist-s">d2​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mpunct"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner">…</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct"></span></span></span></span> ،<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">و</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span></span></span></span></span><span class="vlist-s">dn​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mclose"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mclose">]</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">∈</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathbb"></span></span></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"> </span></span></span></span></span></span></span></span></span></span></span></span> R<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span><span class="mord mathnormal mtight">n×d</span></span></span></span></span></span></span></span></span></span></span></span>: عدد التضمينات المتجهة في قائمة التضمينات التي تمثل المستند يقع ضمن نطاق <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mrow><mi>Rn×d</mi></mrow></msup></mrow><annotation encoding="application/x-tex">\R^{n×d}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span><span class="mord"><span class="mord mathbb">R</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span><span class="mord mathnormal mtight">n×d</span></span></span></span></span></span></span></span></span></span></span></span>.</p></li>
<li><p><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">[</mo><msub><mrow><mn>eq1</mn></mrow></msub><mo separator="true">,</mo><msub><mrow><mn>eq2</mn></mrow></msub><mo separator="true">,</mo><mo>…</mo><mo separator="true">,</mo><msub><mrow><mi>eqm</mi></mrow></msub><mo stretchy="false">]</mo><msup><mrow><mi>∈Rm×d</mi></mrow></msup></mrow><annotation encoding="application/x-tex">[e_{q1}, e_{q2}, \dots, e_{qm}] ∈ \R^{m×d}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0361em;vertical-align:-0.2861em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.03588em;"></span></span></span></span></span></span></span></span></span><span class="mopen">[</span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">e</span></span></span></span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="vlist-s"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">q1​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span><span class="mpunct"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal"></span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">e</span></span></span></span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="vlist-s"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">q2​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span><span class="mpunct"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner">…</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mclose"></span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">e</span></span></span></span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="vlist-s"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">qm​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span><span class="mclose"></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mclose">]</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">∈</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathbb"></span></span></span><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span><span class="mord"><span class="mord mathbb"> </span></span></span></span></span> R<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span><span class="mord mathnormal mtight">m×d</span></span></span></span></span></span></span></span></span></span></span></span>: عدد التضمينات المتجهة في قائمة التضمينات التي تمثل الاستعلام يقع ضمن نطاق <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mrow><mi>Rm×d</mi></mrow></msup></mrow><annotation encoding="application/x-tex">\R^{m×d}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span><span class="mord"><span class="mord mathbb">R</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span><span class="mord mathnormal mtight">m×d</span></span></span></span></span></span></span></span></span></span></span></span>.</p></li>
</ul>
<h3 id="Late-interaction" class="common-anchor-header">التفاعل المتأخر<button data-href="#Late-interaction" class="anchor-icon" translate="no">
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
    </button></h3><p>بمجرد اكتمال التحويل إلى متجهات، تتم مقارنة قائمة تضمينات الاستعلام بقائمة تضمينات كل وثيقة، رمزًا برمز، لتحديد درجة التشابه النهائية.</p>
<p>كما هو موضح في الرسم البياني أعلاه، يحتوي الاستعلام على رمزين، وهما <code translate="no">machine</code> و <code translate="no">learning</code> ، بينما يحتوي المستند الموجود في النافذة على أربعة رموز: <code translate="no">neural</code> و <code translate="no">network</code> و <code translate="no">python</code> و <code translate="no">tutorial</code>. بمجرد تحويل هذه الرموز إلى متجهات، تتم مقارنة تضمينات المتجهات لكل رمز من رموز الاستعلام بتلك الموجودة في المستند للحصول على قائمة بدرجات التشابه. ثم يتم جمع أعلى الدرجات من كل قائمة درجات للحصول على الدرجة النهائية. تُعرف عملية تحديد الدرجة النهائية للوثيقة باسم «التشابه الأقصى» (<strong>MAX_SIM</strong>). للحصول على تفاصيل حول التشابه الأقصى، راجع «التشابه الأقصى».</p>
<div class="alert note">
<p>عند تنفيذ نظام استرجاع نصي شبيه بـ ColBERT في Milvus، لا تقتصر على تقسيم المستندات إلى رموز.</p>
<p>بدلاً من ذلك، يمكنك تقسيم المستندات إلى مقاطع بأي حجم مناسب، وتضمين كل مقطع لإنشاء قائمة تضمينات، وتخزين المستند مع مقاطعه المضمنة في كيان.</p>
</div>
<h3 id="ColPali-extension" class="common-anchor-header">امتداد ColPali<button data-href="#ColPali-extension" class="anchor-icon" translate="no">
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
    </button></h3><p>استنادًا إلى ColBERT، يقترح ColPali (arXiv: <a href="https://arxiv.org/abs/2407.01449?spm=a2ty_o01.29997173.0.0.31c4c9217HFv28&amp;file=2407.01449">2407.01449</a>) نهجًا مبتكرًا لاسترجاع المستندات الغنية بصريًّا والذي يستفيد من نماذج الرؤية واللغة (VLMs). أثناء استيعاب البيانات، يتم تحويل كل صفحة من المستند إلى صورة عالية الدقة، ثم تقسيمها إلى أجزاء، بدلاً من تحويلها إلى رموز. على سبيل المثال، يمكن أن تنتج صورة صفحة مستند بحجم 448 × 448 بكسل 1,024 جزءًا، يبلغ حجم كل منها 14 × 14 بكسل.</p>
<p>تحافظ هذه الطريقة على المعلومات غير النصية، مثل تخطيط المستند والصور وهياكل الجداول، والتي تُفقد عند استخدام أنظمة الاسترجاع النصية فقط.</p>
<p>يُسمى نموذج اللغة المرئي (VLM) المستخدم في ColPali بـ PaliGemma (arXiv: <a href="https://arxiv.org/html/2407.07726v2#S1">2407.07726</a>)، والذي يتألف من مُشفّر صور (<strong>SigLIP-400M</strong>)، ونموذج لغوي مخصص للفك فقط (<strong>Gemma2-2B</strong>)، وطبقة خطية تعمل على إسقاط ناتج مشفر الصور في الفضاء المتجهي لنموذج اللغة، كما هو موضح في الرسم البياني أعلاه.</p>
<p>أثناء استيعاب البيانات، تُقسَّم صفحة المستند، المُمثَّلة كصورة خام، إلى بقع بصرية متعددة، يتم تضمين كل منها لتوليد قائمة من التضمينات المتجهة. ثم يتم إسقاطها في الفضاء المتجهي لنموذج اللغة للحصول على قائمة التضمينات النهائية، كما في <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo> d→Ed=</mo><mo stretchy="false">[</mo><msub><mrow><mn>ed1</mn></mrow></msub><mo separator="true">,</mo><msub><mrow><mn>ed2</mn></mrow></msub><mo separator="true">,</mo><mo>…</mo><mo separator="true">,</mo><msub><mrow><mi>edn</mi></mrow></msub><mo stretchy="false">]</mo></mrow><annotation encoding="application/x-tex">∈Rn×dd \rightarrow E_d = [e_{d1}, e_{d2}, \dots, e_{dn}] ∈ \R^{n×d}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mrel"></span><span class="mord mathnormal">d</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">→</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight"> </span></span></span></span></span></span></span></span></span></span></span> E <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mrel"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">d​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mrel"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel"> </span></span></span></span>= <span class="katex"><span class="katex-html" aria-hidden="true"></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mopen"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen"> </span></span></span></span>[ <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">d1​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">d2​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct"></span><span class="minner">…</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mclose"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">dn​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span><span class="mclose"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mclose">]</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">∈</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathbb"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"> </span></span></span></span></span></span></span></span></span></span></span></span> R <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span><span class="mord mathnormal mtight">n×d</span></span></span></span></span></span></span></span></span></span></span></span>. عند وصول استعلام، يتم تجزئته إلى رموز، ويتم تضمين كل رمز لتوليد قائمة من التضمينات المتجهة، كما في <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo> q→Eq=</mo><mo stretchy="false">[</mo><msub><mrow><mn>eq1</mn></mrow></msub><mo separator="true">,</mo><msub><mrow><mn>eq2</mn></mrow></msub><mo separator="true">,</mo><mo>…</mo><mo separator="true">,</mo><msub><mrow><mi>eqm</mi></mrow></msub><mo stretchy="false">]</mo></mrow><annotation encoding="application/x-tex">∈Rm×dq \rightarrow E_q = [e_{q1}, e_{q2}, \dots, e_{qm}] ∈ \R^{m×d}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.625em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">q</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mrel">→</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9694em;vertical-align:-0.2861em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.0576em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.03588em;"> </span></span></span></span></span></span></span></span></span></span></span> E <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mrel"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">q​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span><span class="mrel"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel"> =</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mopen"></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0361em;vertical-align:-0.2861em;"></span><span class="mopen"> </span></span> [<span class="base"><span class="mord"><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">q1​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">q2​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span><span class="mpunct"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct"></span><span class="minner">…</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mord mathnormal">e</span></span></span></span></span><span class="pstrut" style="height:2.7em;"></span><span class="mclose"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist-s">qm​</span></span></span></span></span></span></span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span><span class="mclose"></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mclose">]</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">∈</span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="base"><span class="mord"><span class="mord mathbb"></span></span></span> <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"> </span></span></span></span></span></span></span></span></span></span></span></span> R <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight"></span><span class="mord mathnormal mtight">m×d</span></span></span></span></span></span></span></span></span></span></span></span>. ثم تم تطبيق <strong>MAX_SIM</strong> لمقارنة قائمتي التضمين والحصول على النتيجة النهائية بين الاستعلام وصفحة الوثيقة.</p>
<h2 id="ColBERT-text-retrieval-system" class="common-anchor-header">نظام استرجاع النصوص ColBERT<button data-href="#ColBERT-text-retrieval-system" class="anchor-icon" translate="no">
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
    </button></h2><p>في هذا القسم، سنقوم بإعداد نظام استرجاع النصوص ColBERT باستخدام StructArray. قبل ذلك، قم بإعداد مثيل Milvus v2.6.x، واحصل على رمز وصول Cohere.</p>
<h3 id="Step-1-Install-the-dependencies" class="common-anchor-header">الخطوة 1: تثبيت التبعيات<button data-href="#Step-1-Install-the-dependencies" class="anchor-icon" translate="no">
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
    </button></h3><p>قم بتشغيل الأمر التالي لتثبيت التبعيات.</p>
<pre><code translate="no" class="language-Shell">pip install --upgrade huggingface-hub transformers datasets pymilvus cohere
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Load-the-Cohere-dataset" class="common-anchor-header">الخطوة 2: تحميل مجموعة بيانات Cohere<button data-href="#Step-2-Load-the-Cohere-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>في هذا المثال، سنستخدم مجموعة بيانات ويكيبيديا من Cohere ونسترد أول 10,000 سجل. يمكنك العثور على معلومات حول مجموعة البيانات هذه في <a href="https://huggingface.co/datasets/Cohere/wikipedia-2023-11-embed-multilingual-v3">هذه الصفحة</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datasets <span class="hljs-keyword">import</span> load_dataset

lang = <span class="hljs-string">&quot;simple&quot;</span>
docs = load_dataset(
    <span class="hljs-string">&quot;Cohere/wikipedia-2023-11-embed-multilingual-v3&quot;</span>,
    lang,
    split=<span class="hljs-string">&quot;train[:10000]&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>سيؤدي تشغيل البرامج النصية المذكورة أعلاه إلى تنزيل مجموعة البيانات إذا لم تكن متوفرة محليًّا. كل سجل في مجموعة البيانات يمثل فقرة من إحدى صفحات ويكيبيديا. يوضح الجدول التالي بنية مجموعة البيانات هذه.</p>
<table>
<thead>
<tr><th>اسم العمود</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">_id</code></td><td>معرف السجل</td></tr>
<tr><td><code translate="no">url</code></td><td>عنوان URL للسجل الحالي.</td></tr>
<tr><td><code translate="no">title</code></td><td>عنوان المستند المصدر.</td></tr>
<tr><td><code translate="no">text</code></td><td>فقرة من المستند المصدر.</td></tr>
<tr><td><code translate="no">emb</code></td><td>عمليات التضمين للنص المأخوذ من المستند المصدر.</td></tr>
</tbody>
</table>
<h3 id="Step-3-Group-paragraphs-by-title" class="common-anchor-header">الخطوة 3: تجميع الفقرات حسب العنوان<button data-href="#Step-3-Group-paragraphs-by-title" class="anchor-icon" translate="no">
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
    </button></h3><p>للبحث عن المستندات بدلاً من الفقرات، يجب تجميع الفقرات حسب العنوان.</p>
<pre><code translate="no" class="language-python">df = docs.to_pandas()
groups = df.groupby(<span class="hljs-string">&#x27;title&#x27;</span>)

data = []

<span class="hljs-keyword">for</span> title, group <span class="hljs-keyword">in</span> groups:
  data.append({
      <span class="hljs-string">&quot;title&quot;</span>: title,
      <span class="hljs-string">&quot;paragraphs&quot;</span>: [{
          <span class="hljs-string">&quot;text&quot;</span>: row[<span class="hljs-string">&#x27;text&#x27;</span>],
          <span class="hljs-string">&#x27;emb&#x27;</span>: row[<span class="hljs-string">&#x27;emb&#x27;</span>]
      } <span class="hljs-keyword">for</span> _, row <span class="hljs-keyword">in</span> group.iterrows()]
  })
<button class="copy-code-btn"></button></code></pre>
<p>في هذا الكود، نقوم بتخزين الفقرات المجمعة كوثائق وإدراجها في قائمة <code translate="no">data</code>. تحتوي كل وثيقة على مفتاح <code translate="no">paragraphs</code> ، وهو عبارة عن قائمة بالفقرات؛ ويحتوي كل كائن فقرة على مفتاحي <code translate="no">text</code> و <code translate="no">emb</code>.</p>
<h3 id="Step-4-Create-a-collection-for-the-Cohere-dataset" class="common-anchor-header">الخطوة 4: إنشاء مجموعة لمجموعة بيانات Cohere<button data-href="#Step-4-Create-a-collection-for-the-Cohere-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>بمجرد أن تصبح البيانات جاهزة، سنقوم بإنشاء مجموعة. في المجموعة، يُعد « <code translate="no">paragraphs</code> » حقل StructArray. للحصول على شرح عام لمخططات StructArray، راجع <a href="/docs/ar/create-structarray-field.md">«إنشاء حقل StructArray</a>».</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Create collection schema</span>
schema = client.create_schema()

schema.add_field(<span class="hljs-string">&#x27;id&#x27;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&#x27;title&#x27;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)

<span class="hljs-comment"># Create struct schema</span>
struct_schema = client.create_struct_field_schema()
struct_schema.add_field(<span class="hljs-string">&#x27;text&#x27;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>)
struct_schema.add_field(<span class="hljs-string">&#x27;emb&#x27;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">512</span>)

schema.add_field(<span class="hljs-string">&#x27;paragraphs&#x27;</span>, DataType.ARRAY,
                 element_type=DataType.STRUCT,
                 struct_schema=struct_schema, max_capacity=<span class="hljs-number">200</span>)

<span class="hljs-comment"># Create index parameters</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;paragraphs[emb]&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>
)

<span class="hljs-comment"># Create a collection</span>
client.create_collection(
    collection_name=<span class="hljs-string">&#x27;wiki_documents&#x27;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-5-Insert-Cohere-dataset-into-the-collection" class="common-anchor-header">الخطوة 5: إدراج مجموعة بيانات Cohere في المجموعة<button data-href="#Step-5-Insert-Cohere-dataset-into-the-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>يمكننا الآن إدراج البيانات المعدة في المجموعة التي أنشأناها أعلاه.</p>
<pre><code translate="no" class="language-python">client.insert(
    collection_name=<span class="hljs-string">&#x27;wiki_documents&#x27;</span>,
    data=data
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-6-Search-within-the-Cohere-dataset" class="common-anchor-header">الخطوة 6: البحث داخل مجموعة بيانات Cohere<button data-href="#Step-6-Search-within-the-Cohere-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>وفقًا لتصميم ColBERT، يجب تقطيع نص الاستعلام إلى رموز (tokenized) ثم تضمينه في قائمة EmbeddingList. في هذه الخطوة، سنستخدم نفس النموذج الذي استخدمه Cohere لتوليد التضمينات (embeddings) للفقرات في مجموعة بيانات ويكيبيديا.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> cohere

co = cohere.ClientV2(<span class="hljs-string">&quot;COHERE_API_KEY&quot;</span>)

query_inputs = [
    {
        <span class="hljs-string">&#x27;content&#x27;</span>: [
            {<span class="hljs-string">&#x27;type&#x27;</span>: <span class="hljs-string">&#x27;text&#x27;</span>, <span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;Adobe&#x27;</span>},
        ]
    },
    {
        <span class="hljs-string">&#x27;content&#x27;</span>: [
            {<span class="hljs-string">&#x27;type&#x27;</span>: <span class="hljs-string">&#x27;text&#x27;</span>, <span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;software&#x27;</span>}
        ]
    }
]

embeddings = co.embed(
    inputs=query_inputs,
    model=<span class="hljs-string">&#x27;embed-multilingual-v3.0&#x27;</span>,
    input_type=<span class="hljs-string">&quot;classification&quot;</span>,
    embedding_types=[<span class="hljs-string">&quot;float&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>في الكود، يتم تنظيم نصوص الاستعلام إلى رموز في ` <code translate="no">query_inputs</code> ` وتضمينها في قائمة من المتجهات العائمة. بعد ذلك، يمكنك استخدام `EmbeddingList` من Milvus لإجراء بحث عن التشابه على النحو التالي.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.client.embedding_list <span class="hljs-keyword">import</span> EmbeddingList

query_emb_list = EmbeddingList()

<span class="hljs-keyword">if</span> (embeddings.embeddings.<span class="hljs-built_in">float</span>):
  query_emb_list.add_batch(embeddings.embeddings.<span class="hljs-built_in">float</span>)

results = client.search(
    collection_name=<span class="hljs-string">&quot;wiki_documents&quot;</span>,
    data=[query_emb_list],
    anns_field=<span class="hljs-string">&quot;paragraphs[emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>]
)

<span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
  <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Document <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;title&#x27;</span>]}</span>: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;distance&#x27;</span>]:<span class="hljs-number">.4</span>f}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>تكون ناتج الكود أعلاه مشابهًا لما يلي:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Document Software: 2.3035</span>
<span class="hljs-comment"># Document Application: 2.1875</span>
<span class="hljs-comment"># Document Adobe Illustrator: 2.1167</span>
<span class="hljs-comment"># Document Open source: 2.0542</span>
<span class="hljs-comment"># Document Computer: 1.9811</span>
<span class="hljs-comment"># Document Microsoft: 1.9784</span>
<span class="hljs-comment"># Document Web browser: 1.9655</span>
<span class="hljs-comment"># Document Program: 1.9627</span>
<span class="hljs-comment"># Document Website: 1.9594</span>
<span class="hljs-comment"># Document Computer science: 1.9460</span>
<button class="copy-code-btn"></button></code></pre>
<p>تتراوح كل درجة تشابه جيب التمام بين <code translate="no">-1</code> و <code translate="no">1</code>. قد تكون درجة <code translate="no">MAX_SIM_COSINE</code> النهائية أكبر من <code translate="no">1</code> لأنها تجمع بين عدة درجات تشابه قصوى على مستوى الرموز.</p>
<h2 id="ColPali-document-retrieval-system" class="common-anchor-header">نظام استرجاع المستندات ColPali<button data-href="#ColPali-document-retrieval-system" class="anchor-icon" translate="no">
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
    </button></h2><p>في هذا القسم، سنقوم بإعداد نظام استرجاع المستندات القائم على ColPali باستخدام StructArray. قبل ذلك، قم بإعداد مثيل Milvus v2.6.x.</p>
<h3 id="Step-1-Install-the-dependencies" class="common-anchor-header">الخطوة 1: تثبيت التبعيات<button data-href="#Step-1-Install-the-dependencies" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-Shell">pip install --upgrade huggingface-hub transformers datasets pymilvus &#x27;colpali-engine&gt;=0.3.0,&lt;0.4.0&#x27;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Load-the-Vidore-dataset" class="common-anchor-header">الخطوة 2: تحميل مجموعة بيانات Vidore<button data-href="#Step-2-Load-the-Vidore-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>في هذا القسم، سنستخدم مجموعة بيانات Vidore المسماة <strong>vidore_v2_finance_en</strong>. هذه المجموعة عبارة عن مجموعة من التقارير السنوية من القطاع المصرفي، مخصصة لمهام فهم المستندات الطويلة. وهي واحدة من المجموعات العشر التي يتألف منها معيار ViDoRe v3. يمكنك العثور على تفاصيل حول مجموعة البيانات هذه على <a href="https://huggingface.co/datasets/vidore/vidore_v3_finance_en">هذه الصفحة</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> datasets <span class="hljs-keyword">import</span> load_dataset

ds = load_dataset(<span class="hljs-string">&quot;vidore/vidore_v3_finance_en&quot;</span>, <span class="hljs-string">&quot;corpus&quot;</span>)
df = ds[<span class="hljs-string">&#x27;test&#x27;</span>].to_pandas()
<button class="copy-code-btn"></button></code></pre>
<p>سيؤدي تشغيل البرامج النصية المذكورة أعلاه إلى تنزيل مجموعة البيانات إذا لم تكن متوفرة محليًا. كل سجل في مجموعة البيانات يمثل صفحة من تقرير مالي. يوضح الجدول التالي بنية مجموعة البيانات هذه.</p>
<table>
<thead>
<tr><th>اسم العمود</th><th>الوصف</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">corpus_id</code></td><td>سجل في المجموعة</td></tr>
<tr><td><code translate="no">image</code></td><td>صورة الصفحة بالبايت.</td></tr>
<tr><td><code translate="no">doc_id</code></td><td>معرف المستند الوصفي.</td></tr>
<tr><td><code translate="no">page_number_in_doc</code></td><td>رقم الصفحة الحالية في المستند.</td></tr>
</tbody>
</table>
<h3 id="Step-3-Generate-embeddings-for-the-page-images" class="common-anchor-header">الخطوة 3: إنشاء تضمينات لصور الصفحات<button data-href="#Step-3-Generate-embeddings-for-the-page-images" class="anchor-icon" translate="no">
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
    </button></h3><p>كما هو موضح في قسم <a href="/docs/ar/search-with-embedding-lists.md#overview">"نظرة عامة"</a> ، فإن نموذج ColPali هو نموذج VLM الذي يعرض الصور في الفضاء المتجهي لنموذج نصي. في هذه الخطوة، سنستخدم أحدث إصدار من نموذج ColPali <strong>وهو vidore/colpali-v1.3.</strong> يمكنك العثور على تفاصيل حول هذا النموذج في <a href="https://huggingface.co/vidore/colpali-v1.3">هذه الصفحة</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> torch
<span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> cast
<span class="hljs-keyword">from</span> colpali_engine.models <span class="hljs-keyword">import</span> ColPali, ColPaliProcessor

model_name = <span class="hljs-string">&quot;vidore/colpali-v1.3&quot;</span>

model = ColPali.from_pretrained(
    model_name,
    torch_dtype=torch.bfloat16,
    device_map=<span class="hljs-string">&quot;cuda:0&quot;</span>,  <span class="hljs-comment"># or &quot;mps&quot; if on Apple Silicon</span>
).<span class="hljs-built_in">eval</span>()

processor = ColPaliProcessor.from_pretrained(model_name)
<button class="copy-code-btn"></button></code></pre>
<p>بمجرد أن يصبح النموذج جاهزًا، يمكنك محاولة إنشاء رقع لصورة معينة على النحو التالي.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> PIL <span class="hljs-keyword">import</span> Image
<span class="hljs-keyword">from</span> io <span class="hljs-keyword">import</span> BytesIO

<span class="hljs-comment"># Use the iterrows() generator to get the first row.</span>
row = <span class="hljs-built_in">next</span>(df.iterrows())[<span class="hljs-number">1</span>]

<span class="hljs-comment"># Decode the image bytes and generate patch embeddings.</span>
images = [Image.<span class="hljs-built_in">open</span>(BytesIO(row[<span class="hljs-string">&quot;image&quot;</span>][<span class="hljs-string">&quot;bytes&quot;</span>]))]
batch_images = processor.process_images(images).to(model.device)

<span class="hljs-keyword">with</span> torch.no_grad():
    patches_embeddings = model(**batch_images)[<span class="hljs-number">0</span>]

<span class="hljs-comment"># Check the shape of the embeddings generated for the patches.</span>
<span class="hljs-built_in">print</span>(patches_embeddings.shape)

<span class="hljs-comment"># [1031, 128]</span>
<button class="copy-code-btn"></button></code></pre>
<p>في الكود أعلاه، يقوم نموذج ColPali بتغيير حجم الصورة إلى 448 × 448 بكسل، ثم يقسمها إلى أجزاء، يبلغ حجم كل منها 14 × 14 بكسل. وأخيرًا، يتم تضمين هذه الأجزاء في 1,031 تمثيلًا، لكل منها 128 بُعدًا.</p>
<p>يمكنك إنشاء التضمينات لجميع الصور باستخدام حلقة كما يلي:</p>
<pre><code translate="no" class="language-python">data = []

<span class="hljs-keyword">for</span> _, row <span class="hljs-keyword">in</span> df.iterrows():
    corpus_id = row[<span class="hljs-string">&quot;corpus_id&quot;</span>]
    images = [Image.<span class="hljs-built_in">open</span>(BytesIO(row[<span class="hljs-string">&quot;image&quot;</span>][<span class="hljs-string">&quot;bytes&quot;</span>]))]
    batch_images = processor.process_images(images).to(model.device)

    <span class="hljs-keyword">with</span> torch.no_grad():
        patches = model(**batch_images)[<span class="hljs-number">0</span>]

    doc_id = row[<span class="hljs-string">&quot;doc_id&quot;</span>]
    page_number_in_doc = row[<span class="hljs-string">&quot;page_number_in_doc&quot;</span>]

    data.append({
        <span class="hljs-string">&quot;corpus_id&quot;</span>: corpus_id,
        <span class="hljs-string">&quot;patches&quot;</span>: [
            {<span class="hljs-string">&quot;emb&quot;</span>: emb.<span class="hljs-built_in">float</span>().cpu().tolist()}
            <span class="hljs-keyword">for</span> emb <span class="hljs-keyword">in</span> patches
        ],
        <span class="hljs-string">&quot;doc_id&quot;</span>: doc_id,
        <span class="hljs-string">&quot;page_number_in_doc&quot;</span>: page_number_in_doc,
    })
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>تستغرق هذه الخطوة وقتًا طويلاً نسبيًا نظرًا للكمية الكبيرة من البيانات التي يجب تضمينها.</p>
</div>
<h3 id="Step-4-Create-a-collection-for-the-financial-reports-dataset" class="common-anchor-header">الخطوة 4: إنشاء مجموعة لمجموعة بيانات التقارير المالية<button data-href="#Step-4-Create-a-collection-for-the-financial-reports-dataset" class="anchor-icon" translate="no">
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
    </button></h3><p>بمجرد أن تصبح البيانات جاهزة، سنقوم بإنشاء مجموعة. في المجموعة، يُعد « <code translate="no">patches</code> » حقل StructArray. يخزن كل عنصر من عناصر Struct تضمينًا واحدًا للرقعة. للاطلاع على متطلبات الفهرسة الخاصة بحقول StructArray الفرعية المتجهة، راجع <a href="/docs/ar/index-structarray-fields.md">فهرسة حقول StructArray</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(
    uri=YOUR_CLUSTER_ENDPOINT,
    token=YOUR_API_KEY
)

schema = client.create_schema()

schema.add_field(
    field_name=<span class="hljs-string">&quot;corpus_id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>
)

patch_schema = client.create_struct_field_schema()

patch_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">128</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;patches&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=patch_schema,
    max_capacity=<span class="hljs-number">1031</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;doc_id&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">512</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;page_number_in_doc&quot;</span>,
    datatype=DataType.INT64
)

index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;patches[emb]&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;financial_reports&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-5-Insert-the-financial-reports-into-the-collection" class="common-anchor-header">الخطوة 5: إدراج التقارير المالية في المجموعة<button data-href="#Step-5-Insert-the-financial-reports-into-the-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>يمكننا الآن إدراج التقارير المالية المعدة في المجموعة.</p>
<pre><code translate="no" class="language-python">client.insert(
    collection_name=<span class="hljs-string">&quot;financial_reports&quot;</span>,
    data=data
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>قد يستغرق إدراج التقارير المالية وقتًا طويلاً. يمكن أن تحتوي كل صفحة على أكثر من ألف متجه رقعة، ويتم تخزين كل متجه داخل حقل StructArray الخاص بـ <code translate="no">patches</code>. بالنسبة لمجموعات البيانات الأكبر حجمًا، قم بتقسيم <code translate="no">data</code> إلى دفعات أصغر وقم بإدراج دفعة واحدة في كل مرة.</p>
</div>
<p>من الناتج، يمكنك ملاحظة أن جميع الصفحات من مجموعة بيانات Vidore قد تم إدراجها.</p>
<h3 id="Step-6-Search-within-the-financial-reports" class="common-anchor-header">الخطوة 6: البحث داخل التقارير المالية<button data-href="#Step-6-Search-within-the-financial-reports" class="anchor-icon" translate="no">
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
    </button></h3><p>بمجرد أن تصبح البيانات جاهزة، يمكننا إجراء عمليات بحث في البيانات الموجودة في المجموعة على النحو التالي:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.client.embedding_list <span class="hljs-keyword">import</span> EmbeddingList

queries = [
    <span class="hljs-string">&quot;quarterly revenue growth chart&quot;</span>
]

batch_queries = processor.process_queries(queries).to(model.device)

<span class="hljs-keyword">with</span> torch.no_grad():
    query_embeddings = model(**batch_queries)

query_emb_list = EmbeddingList()
query_emb_list.add_batch(query_embeddings[<span class="hljs-number">0</span>].<span class="hljs-built_in">float</span>().cpu().tolist())

results = client.search(
    collection_name=<span class="hljs-string">&quot;financial_reports&quot;</span>,
    data=[query_emb_list],
    anns_field=<span class="hljs-string">&quot;patches[emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;doc_id&quot;</span>, <span class="hljs-string">&quot;page_number_in_doc&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
