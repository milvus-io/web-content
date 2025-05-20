---
id: text_image_search.md
summary: >-
  في هذا البرنامج التعليمي، سنستكشف في هذا البرنامج التعليمي كيفية تنفيذ استرجاع
  الصور المستند إلى النصوص باستخدام نموذج CLIP (التدريب المسبق على لغة
  التباين-الصور المتباينة) من OpenAI و Milvus. سنقوم بإنشاء تضمينات للصور
  باستخدام CLIP، وتخزينها في Milvus، وإجراء عمليات بحث فعالة عن التشابه.
title: البحث من نص إلى صورة باستخدام ميلفوس
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/text_image_search_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/text_image_search_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Text-to-Image-Search-with-Milvus" class="common-anchor-header">البحث من نص إلى صورة باستخدام ميلفوس<button data-href="#Text-to-Image-Search-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>البحث من نص إلى صورة هو تقنية متقدمة تسمح للمستخدمين بالبحث عن الصور باستخدام أوصاف نصية بلغة طبيعية. وهي تستفيد من نموذج متعدد الوسائط تم تدريبه مسبقًا لتحويل كل من النص والصور إلى تضمينات في فضاء دلالي مشترك، مما يتيح إجراء مقارنات قائمة على التشابه.</p>
<p>في هذا البرنامج التعليمي، سنستكشف في هذا البرنامج التعليمي كيفية تنفيذ استرجاع الصور المستند إلى النص باستخدام نموذج CLIP (التدريب المسبق على اللغة المتباينة والصور) من OpenAI و Milvus. سنقوم بتوليد تضمينات الصور باستخدام CLIP، وتخزينها في Milvus، وإجراء عمليات بحث فعالة عن التشابه.</p>
<h2 id="Prerequisites" class="common-anchor-header">المتطلبات الأساسية<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>قبل البدء، تأكد من أن جميع الحزم المطلوبة وبيانات الأمثلة جاهزة.</p>
<h3 id="Install-dependencies" class="common-anchor-header">تثبيت التبعيات</h3><ul>
<li><strong>pymilvus&gt;=2.4.2</strong> للتفاعل مع قاعدة بيانات Milvus</li>
<li><strong>مقطع</strong> للعمل مع نموذج CLIP</li>
<li><strong>وسادة</strong> لمعالجة الصور وتصورها</li>
</ul>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus pillow</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install git+https://github.com/openai/CLIP.git</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>إذا كنت تستخدم Google Colab، فقد تحتاج إلى <strong>إعادة تشغيل وقت التشغيل</strong> (انتقل إلى قائمة "وقت التشغيل" في أعلى الواجهة، وحدد "إعادة تشغيل الجلسة" من القائمة المنسدلة).</p>
</div>
<h3 id="Download-example-data" class="common-anchor-header">تنزيل مثال على البيانات</h3><p>سنستخدم مجموعة فرعية من مجموعة بيانات <a href="https://www.image-net.org">ImageNet</a> (100 فئة، 10 صور لكل فئة) كمثال على الصور. سيقوم الأمر التالي بتنزيل بيانات المثال واستخراجها إلى المجلد المحلي <code translate="no">./images_folder</code>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/towhee-io/examples/releases/download/data/reverse_image_search.zip</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">unzip -q reverse_image_search.zip -d images_folder</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-up-Milvus" class="common-anchor-header">إعداد ميلفوس</h3><p>قبل المتابعة، قم بإعداد خادم Milvus والاتصال باستخدام URI الخاص بك (واختيارياً، رمز مميز):</p>
<ul>
<li><p><strong>ميلفوس لايت (موصى به للراحة)</strong>: قم بتعيين URI إلى ملف محلي، مثل ./milvus.db. هذا يستفيد تلقائيًا من <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> لتخزين جميع البيانات في ملف واحد.</p></li>
<li><p><strong>Docker أو Kubernetes (للبيانات كبيرة الحجم)</strong>: للتعامل مع مجموعات بيانات أكبر، قم بنشر خادم Milvus أكثر أداءً باستخدام <a href="https://milvus.io/docs/quickstart.md">Docker أو Kubernetes</a>. في هذه الحالة، استخدم URI الخادم، مثل http://localhost:19530، للاتصال.</p></li>
<li><p><strong>زيليز كلاود (خدمة مُدارة)</strong>: إذا كنت تستخدم <a href="https://zilliz.com/cloud">Zilliz Cloud</a>، خدمة Milvus السحابية المُدارة بالكامل، قم بتعيين نقطة النهاية العامة كـ URI ومفتاح API كرمز مميز.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;milvus.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Getting-Started" class="common-anchor-header">الشروع في العمل<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><p>الآن بعد أن أصبحت لديك التبعيات والبيانات اللازمة، حان الوقت لإعداد مستخرجات الميزات وبدء العمل مع ميلفوس. سيرشدك هذا القسم إلى الخطوات الرئيسية لبناء نظام بحث من نص إلى صورة. أخيرًا، سنشرح كيفية استرداد الصور وتصورها بناءً على استعلامات نصية.</p>
<h3 id="Define-feature-extractors" class="common-anchor-header">تحديد مستخرجات الميزات</h3><p>سنستخدم نموذج CLIP المدرّب مسبقًا لإنشاء تضمينات الصور والنصوص. في هذا القسم، سنقوم بتحميل متغير <strong>ViT-B/32</strong> المدرب مسبقًا من CLIP وتعريف الدوال المساعدة لترميز الصور والنصوص:</p>
<ul>
<li><code translate="no">encode_image(image_path)</code>: معالجة الصور وترميزها إلى متجهات ميزات</li>
<li><code translate="no">encode_text(text)</code>: ترميز الاستعلامات النصية إلى متجهات ميزات</li>
</ul>
<p>تعمل كلتا الدالتين على تطبيع ميزات الإخراج لضمان اتساق المقارنات من خلال تحويل المتجهات إلى وحدة الطول، وهو أمر ضروري لحسابات دقيقة لتشابه جيب التمام.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> clip
<span class="hljs-keyword">from</span> PIL <span class="hljs-keyword">import</span> Image


<span class="hljs-comment"># Load CLIP model</span>
model_name = <span class="hljs-string">&quot;ViT-B/32&quot;</span>
model, preprocess = clip.load(model_name)
model.<span class="hljs-built_in">eval</span>()


<span class="hljs-comment"># Define a function to encode images</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_image</span>(<span class="hljs-params">image_path</span>):
    image = preprocess(Image.<span class="hljs-built_in">open</span>(image_path)).unsqueeze(<span class="hljs-number">0</span>)
    image_features = model.encode_image(image)
    image_features /= image_features.norm(
        dim=-<span class="hljs-number">1</span>, keepdim=<span class="hljs-literal">True</span>
    )  <span class="hljs-comment"># Normalize the image features</span>
    <span class="hljs-keyword">return</span> image_features.squeeze().tolist()


<span class="hljs-comment"># Define a function to encode text</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_text</span>(<span class="hljs-params">text</span>):
    text_tokens = clip.tokenize(text)
    text_features = model.encode_text(text_tokens)
    text_features /= text_features.norm(
        dim=-<span class="hljs-number">1</span>, keepdim=<span class="hljs-literal">True</span>
    )  <span class="hljs-comment"># Normalize the text features</span>
    <span class="hljs-keyword">return</span> text_features.squeeze().tolist()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Data-Ingestion" class="common-anchor-header">استيعاب البيانات</h3><p>لتمكين البحث الدلالي عن الصور، نحتاج أولاً إلى إنشاء تضمينات لجميع الصور وتخزينها في قاعدة بيانات متجهة للفهرسة والاسترجاع بكفاءة. يقدّم هذا القسم دليلًا تفصيليًا لإدخال بيانات الصور في ملفوس.</p>
<p><strong>1. إنشاء مجموعة ميلفوس</strong></p>
<p>قبل تخزين تضمينات الصور، تحتاج إلى إنشاء مجموعة ميلفوس. يوضح الرمز التالي كيفية إنشاء مجموعة في وضع الإعداد السريع بنوع مقياس كوسين الافتراضي. تتضمن المجموعة الحقول التالية:</p>
<ul>
<li><p><code translate="no">id</code>: حقل أساسي مع تمكين المعرف التلقائي.</p></li>
<li><p><code translate="no">vector</code>: حقل لتخزين التضمينات المتجهة ذات الفاصلة العائمة.</p></li>
</ul>
<p>إذا كنت بحاجة إلى مخطط مخصص، فارجع إلى <a href="https://milvus.io/docs/create-collection.md">وثائق ميلفوس</a> للحصول على تعليمات مفصلة.</p>
<pre><code translate="no" class="language-python">collection_name = <span class="hljs-string">&quot;image_collection&quot;</span>

<span class="hljs-comment"># Drop the collection if it already exists</span>
<span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)

<span class="hljs-comment"># Create a new collection in quickstart mode</span>
milvus_client.create_collection(
    collection_name=collection_name,
    dimension=<span class="hljs-number">512</span>,  <span class="hljs-comment"># this should match the dimension of the image embedding</span>
    auto_id=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># auto generate id and store in the id field</span>
    enable_dynamic_field=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># enable dynamic field for scalar fields</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>2. إدراج البيانات في ملفوس</strong></p>
<p>في هذه الخطوة، نستخدم أداة تشفير صور محددة مسبقًا لإنشاء تضمينات لجميع صور JPEG في دليل بيانات المثال. يتم بعد ذلك إدراج هذه التضمينات في مجموعة Milvus، إلى جانب مسارات الملفات المقابلة لها. يتكون كل إدخال في المجموعة من:</p>
<ul>
<li><strong>متجه التضمين</strong>: التمثيل العددي للصورة. يتم تخزينه في الحقل <code translate="no">vector</code>.</li>
<li><strong>مسار الملف</strong>: موقع ملف الصورة للرجوع إليه. مخزن في الحقل <code translate="no">filepath</code> كحقل ديناميكي.</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob


image_dir = <span class="hljs-string">&quot;./images_folder/train&quot;</span>
raw_data = []

<span class="hljs-keyword">for</span> image_path <span class="hljs-keyword">in</span> glob(os.path.join(image_dir, <span class="hljs-string">&quot;**/*.JPEG&quot;</span>)):
    image_embedding = encode_image(image_path)
    image_dict = {<span class="hljs-string">&quot;vector&quot;</span>: image_embedding, <span class="hljs-string">&quot;filepath&quot;</span>: image_path}
    raw_data.append(image_dict)
insert_result = milvus_client.insert(collection_name=collection_name, data=raw_data)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Inserted&quot;</span>, insert_result[<span class="hljs-string">&quot;insert_count&quot;</span>], <span class="hljs-string">&quot;images into Milvus.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Inserted 1000 images into Milvus.
</code></pre>
<h3 id="Peform-a-Search" class="common-anchor-header">إجراء بحث</h3><p>الآن، دعنا نجري بحثًا باستخدام مثال استعلام نصي. سيؤدي ذلك إلى استرداد الصور الأكثر صلة بناءً على تشابهها الدلالي مع الوصف النصي المحدد.</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;a white dog&quot;</span>
query_embedding = encode_text(query_text)

search_results = milvus_client.search(
    collection_name=collection_name,
    data=[query_embedding],
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># return top 10 results</span>
    output_fields=[<span class="hljs-string">&quot;filepath&quot;</span>],  <span class="hljs-comment"># return the filepath field</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>عرض النتائج:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> IPython.display <span class="hljs-keyword">import</span> display


width = <span class="hljs-number">150</span> * <span class="hljs-number">5</span>
height = <span class="hljs-number">150</span> * <span class="hljs-number">2</span>
concatenated_image = Image.new(<span class="hljs-string">&quot;RGB&quot;</span>, (width, height))

result_images = []
<span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> search_results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> result:
        filename = hit[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;filepath&quot;</span>]
        img = Image.<span class="hljs-built_in">open</span>(filename)
        img = img.resize((<span class="hljs-number">150</span>, <span class="hljs-number">150</span>))
        result_images.append(img)

<span class="hljs-keyword">for</span> idx, img <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(result_images):
    x = idx % <span class="hljs-number">5</span>
    y = idx // <span class="hljs-number">5</span>
    concatenated_image.paste(img, (x * <span class="hljs-number">150</span>, y * <span class="hljs-number">150</span>))
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Query text: <span class="hljs-subst">{query_text}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\nSearch results:&quot;</span>)
display(concatenated_image)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Query text: a white dog

Search results:
</code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/text_image_search_with_milvus_20_1.png" alt="png" class="doc-image" id="png" />
   </span> <span class="img-wrapper"> <span>png</span> </span></p>
