---
id: milvus-sdk-helper-mcp.md
title: دليل مساعد كود Milvus SDK البرمجي
summary: ⚡️ التهيئة مرة واحدة، وتعزيز الكفاءة إلى الأبد!
---
<h1 id="Milvus-SDK-Code-Helper-Guide" class="common-anchor-header">دليل مساعد كود Milvus SDK البرمجي<button data-href="#Milvus-SDK-Code-Helper-Guide" class="anchor-icon" translate="no">
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
    </button></h1><h1 id="Overview" class="common-anchor-header">نظرة عامة<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>⚡️ تكوين مرة واحدة، وتعزيز الكفاءة إلى الأبد!</p>
<p>هل ما زلت محبطًا من النتائج القديمة من LLM؟ هل سئمت من إخراج LLM لمحتوى قديم حتى بعد تحديث الإصدارات؟ جرب هذا mcp لحل مشكلة تأخر المعلومات عند تطوير التعليمات البرمجية المتعلقة بـ Milvus مرة واحدة وإلى الأبد!</p>
<p>أصبح الآن مساعد كود Milvus SDK الرسمي على الإنترنت - ما عليك سوى العثور على IDE المقابل للذكاء الاصطناعي، وتهيئته مرة واحدة، ودع الذكاء الاصطناعي يكتب كود Milvus <strong>الموصى به رسميًا</strong> لك. قل وداعًا للأطر القديمة تمامًا!</p>
<p>➡️ اقفز الآن: <a href="#Quickstart">البدء السريع</a></p>
<h1 id="Effect-display" class="common-anchor-header">عرض التأثير<button data-href="#Effect-display" class="anchor-icon" translate="no">
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
    </button></h1><p>يقارن الشكل التالي بين تأثيرات إنشاء التعليمات البرمجية مع مساعد كود Milvus SDK وبدونه. إذا لم يتم استخدام مساعد كود Milvus SDK، فإن الكود المكتوب يتبع نهج ORM SDK القديم، والذي لم يعد موصى به. فيما يلي مقارنة بين لقطات شاشة التعليمات البرمجية مع وبدون مساعد التعليمات البرمجية MCP:</p>
<table>
   <tr>
     <th><p><strong>تم تمكين</strong> مساعد التعليمات البرمجية MCP</p></th>
     <th><p><strong>تم تعطيل</strong> مساعد الكود MCP</p></th>
   </tr>
   <tr>
     <td><p><img translate="no" src="/docs/v2.6.x/assets/code-helper-enabled.png" alt="Code Helper Enabled" /></p></td>
     <td><p><img translate="no" src="/docs/v2.6.x/assets/code-helper-disabled.png" alt="Code Helper Disabled" /></p></td>
   </tr>
   <tr>
     <td><p>استخدام واجهة MilvusClient الأحدث الموصى بها رسميًا لإنشاء مجموعة</p></td>
     <td><p>لا يوصى بإنشاء مجموعة باستخدام واجهة ORM القديمة.</p></td>
   </tr>
</table>
<h1 id="Quickstart" class="common-anchor-header">البدء السريع<button data-href="#Quickstart" class="anchor-icon" translate="no">
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
    </button></h1><p>ابحث عن معرف الذكاء الاصطناعي الخاص بك، وقم بتهيئته بنقرة واحدة، وافتح رحلة ترميز خالية من القلق.</p>
<h2 id="Cursor" class="common-anchor-header">المؤشر<button data-href="#Cursor" class="anchor-icon" translate="no">
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
    </button></h2><p>انتقل إلى <code translate="no">Settings</code> -&gt; <code translate="no">Cursor Settings</code> -&gt; <code translate="no">Tools &amp; Intergrations</code> -&gt; -&gt; <code translate="no">Add new global MCP server</code></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/cursor-mcp-settings.png" alt="Cursor Mcp Settings" class="doc-image" id="cursor-mcp-settings" />
   </span> <span class="img-wrapper"> <span>إعدادات Cursor Cursor Mcp</span> </span></p>
<p>إن لصق التهيئة التالية في ملف Cursor <code translate="no">~/.cursor/mcp.json</code> الخاص بك هو النهج الموصى به. يمكنك أيضًا تثبيت مشروع معين عن طريق إنشاء <code translate="no">.cursor/mcp.json</code> في مجلد المشروع الخاص بك. انظر <a href="https://docs.cursor.com/context/model-context-protocol">مستندات Cursor Cursor MCP</a> لمزيد من المعلومات.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;sdk-code-helper&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://sdk.milvus.io/mcp/&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Accept&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text/event-stream&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Claude-Desktop" class="common-anchor-header">سطح مكتب كلود<button data-href="#Claude-Desktop" class="anchor-icon" translate="no">
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
    </button></h2><p>أضف إلى تكوين Claude Desktop الخاص بك:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;sdk-code-helper&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://sdk.milvus.io/mcp/&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Accept&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text/event-stream&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Claude-Code" class="common-anchor-header">كلود كود<button data-href="#Claude-Code" class="anchor-icon" translate="no">
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
    </button></h2><p>يدعم Claude Code إضافة خوادم MCP مباشرةً من خلال تكوين JSON، بما في ذلك خوادم من نوع URL البعيد. استخدم الأمر التالي لإضافة التكوين إلى كلود كود:</p>
<pre><code translate="no" class="language-sql">claude mcp <span class="hljs-keyword">add</span><span class="hljs-operator">-</span>json sdk<span class="hljs-operator">-</span>code<span class="hljs-operator">-</span>helper <span class="hljs-comment">--json &#x27;{</span>
  &quot;url&quot;: &quot;https://sdk.milvus.io/mcp/&quot;,
  &quot;headers&quot;: {
    &quot;Accept&quot;: &quot;text/event-stream&quot;
  }
}<span class="hljs-string">&#x27;
</span><button class="copy-code-btn"></button></code></pre>
<h2 id="Windsurf" class="common-anchor-header">ويندسورف<button data-href="#Windsurf" class="anchor-icon" translate="no">
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
    </button></h2><p>يدعم Windsurf تكوين MCP من خلال ملف JSON. أضف التكوين التالي إلى إعدادات Windsurf MCP الخاصة بك:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;sdk-code-helper&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://sdk.milvus.io/mcp/&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Accept&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text/event-stream&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="VS-Code" class="common-anchor-header">رمز VS<button data-href="#VS-Code" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكن استخدام خادم CodeIndexer MCP مع كود VS Code من خلال ملحقات متوافقة مع MCP. أضف التكوين التالي إلى إعدادات VS Code MCP الخاصة بك:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;sdk-code-helper&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://sdk.milvus.io/mcp/&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Accept&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text/event-stream&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Cherry-Studio" class="common-anchor-header">تشيري ستوديو<button data-href="#Cherry-Studio" class="anchor-icon" translate="no">
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
    </button></h2><p>يتيح Cherry Studio تكوين خادم MCP المرئي من خلال واجهة الإعدادات الخاصة به. على الرغم من أنه لا يدعم تكوين JSON اليدوي مباشرة، إلا أنه يمكنك إضافة خادم جديد عبر واجهة المستخدم الرسومية:</p>
<ol>
<li><p>انتقل إلى الإعدادات ← خوادم MCP ← إضافة خادم.</p></li>
<li><p>املأ تفاصيل الخادم:</p>
<ul>
<li><p>الاسم: <code translate="no">sdk code helper</code></p></li>
<li><p>النوع: <code translate="no">Streamable HTTP</code></p></li>
<li><p>عنوان URL: <code translate="no">https://sdk.milvus.io/mcp/</code></p></li>
<li><p>الرؤوس: <code translate="no">&quot;Accept&quot;: &quot;text/event-stream&quot;</code></p></li>
</ul></li>
<li><p>احفظ التكوين لتفعيل الخادم.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/cherry-studio-mcp-settings.png" alt="Cherry Studio Mcp Settings" class="doc-image" id="cherry-studio-mcp-settings" />
   </span> <span class="img-wrapper"> <span>إعدادات Cherry Studio Mcp</span> </span></p>
<h2 id="Cline" class="common-anchor-header">كلاين<button data-href="#Cline" class="anchor-icon" translate="no">
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
    </button></h2><p>يستخدم Cline ملف تكوين JSON لإدارة خوادم MCP. لدمج تكوين خادم MCP المقدم:</p>
<ol>
<li><p>افتح كلاين وانقر على أيقونة خوادم MCP في شريط التنقل العلوي.</p></li>
<li><p>حدد علامة التبويب المثبتة، ثم انقر فوق إعدادات MCP المتقدمة.</p></li>
<li><p>في الملف <code translate="no">cline_mcp_settings.json</code> ، أضف التكوين التالي:</p></li>
</ol>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;sdk-code-helper&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://sdk.milvus.io/mcp/&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Accept&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text/event-stream&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Augment" class="common-anchor-header">تعزيز<button data-href="#Augment" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>اضغط على Cmd/Ctrl Shift P أو انتقل إلى قائمة الهامبرغر في لوحة التعزيز</p></li>
<li><p>حدد تحرير الإعدادات</p></li>
<li><p>ضمن خيارات متقدمة، انقر فوق تحرير في settings.json</p></li>
<li><p>أضف تكوين الخادم إلى المصفوفة <code translate="no">mcpServers</code> في الكائن <code translate="no">augment.advanced</code>:</p></li>
</ol>
<pre><code translate="no" class="language-markdown">{
  &quot;mcpServers&quot;: {
<span class="hljs-code">    &quot;sdk-code-helper&quot;: {
      &quot;url&quot;: &quot;https://sdk.milvus.io/mcp/&quot;,
      &quot;headers&quot;: {
        &quot;Accept&quot;: &quot;text/event-stream&quot;
      }
    }
  }
}
</span><button class="copy-code-btn"></button></code></pre>
<h2 id="Gemini-CLI" class="common-anchor-header">Gemini CLI<button data-href="#Gemini-CLI" class="anchor-icon" translate="no">
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
    </button></h2><p>يتطلب Gemini CLI تكوينًا يدويًا من خلال ملف JSON:</p>
<ol>
<li><p>قم بإنشاء أو تحرير الملف <code translate="no">~/.gemini/settings.json</code>.</p></li>
<li><p>أضف التكوين التالي:</p></li>
</ol>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;sdk-code-helper&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://sdk.milvus.io/mcp/&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Accept&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text/event-stream&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<ol>
<li>احفظ الملف وأعد تشغيل Gemini CLI لتطبيق التغييرات.</li>
</ol>
<h2 id="Roo-Code" class="common-anchor-header">كود رو<button data-href="#Roo-Code" class="anchor-icon" translate="no">
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
    </button></h2><p>رو كود</p>
<p>يستخدم Roo Code ملف تكوين JSON لخوادم MCP:</p>
<ol>
<li><p>افتح Roo Code وانتقل إلى الإعدادات → خوادم MCP → تحرير التكوين العام.</p></li>
<li><p>في الملف <code translate="no">mcp_settings.json</code> ، أضف التكوين التالي:</p></li>
</ol>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;sdk-code-helper&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://sdk.milvus.io/mcp/&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Accept&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text/event-stream&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<ol>
<li>احفظ الملف لتفعيل الخادم.</li>
</ol>
