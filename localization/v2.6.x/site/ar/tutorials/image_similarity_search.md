---
id: image_similarity_search.md
summary: البحث عن الصور مع ميلفوس
title: البحث عن الصور باستخدام ميلفوس
---
<h1 id="Image-Search-with-Milvus" class="common-anchor-header">البحث عن الصور باستخدام ميلفوس<button data-href="#Image-Search-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/tutorials/quickstart/image_search_with_milvus.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/tutorials/quickstart/image_search_with_milvus.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p><img translate="no" src="https://raw.githubusercontent.com/milvus-io/bootcamp/master/tutorials/quickstart/apps/image_search_with_milvus/pics/image_search_demo.png"/></p>
<p>في هذا الدفتر، سنوضح لك كيفية استخدام Milvus للبحث عن صور متشابهة في مجموعة بيانات. سوف نستخدم مجموعة فرعية من مجموعة بيانات <a href="https://www.image-net.org/">ImageNet،</a> ثم نبحث عن صورة كلب صيد أفغاني لتوضيح ذلك.</p>
<h2 id="Dataset-Preparation" class="common-anchor-header">إعداد مجموعة البيانات<button data-href="#Dataset-Preparation" class="anchor-icon" translate="no">
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
    </button></h2><p>أولاً، نحتاج أولاً إلى تحميل مجموعة البيانات وإلغاء استخراجها لمزيد من المعالجة.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/pymilvus-assets/releases/download/imagedata/reverse_image_search.zip</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">unzip -q -o reverse_image_search.zip</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prequisites" class="common-anchor-header">المتطلبات الأساسية<button data-href="#Prequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>لتشغيل هذا الدفتر، تحتاج إلى تثبيت التبعيات التالية:</p>
<ul>
<li>pymilvus&gt;=2.4.2</li>
<li>تيم</li>
<li>الشعلة</li>
<li>numpy</li>
<li>سكليرن</li>
<li>الوسادة</li>
</ul>
<p>لتشغيل Colab، نقدم الأوامر المفيدة لتثبيت التبعيات اللازمة.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install pymilvus --upgrade</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install timm</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>إذا كنت تستخدم Google Colab، لتمكين التبعيات المثبتة للتو، قد تحتاج إلى <strong>إعادة تشغيل وقت التشغيل</strong>. (انقر على قائمة "وقت التشغيل" في أعلى الشاشة، وحدد "إعادة تشغيل الجلسة" من القائمة المنسدلة).</p>
</div>
<h2 id="Define-the-Feature-Extractor" class="common-anchor-header">تعريف مستخرج الميزات<button data-href="#Define-the-Feature-Extractor" class="anchor-icon" translate="no">
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
    </button></h2><p>بعد ذلك، نحن بحاجة إلى تحديد مستخرج الميزة الذي يستخرج التضمين من صورة باستخدام نموذج "ريسنت-34" الخاص بـ timm.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> torch
<span class="hljs-keyword">from</span> PIL <span class="hljs-keyword">import</span> Image
<span class="hljs-keyword">import</span> timm
<span class="hljs-keyword">from</span> sklearn.preprocessing <span class="hljs-keyword">import</span> normalize
<span class="hljs-keyword">from</span> timm.data <span class="hljs-keyword">import</span> resolve_data_config
<span class="hljs-keyword">from</span> timm.data.transforms_factory <span class="hljs-keyword">import</span> create_transform


<span class="hljs-keyword">class</span> <span class="hljs-title class_">FeatureExtractor</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, modelname</span>):
        <span class="hljs-comment"># Load the pre-trained model</span>
        <span class="hljs-variable language_">self</span>.model = timm.create_model(
            modelname, pretrained=<span class="hljs-literal">True</span>, num_classes=<span class="hljs-number">0</span>, global_pool=<span class="hljs-string">&quot;avg&quot;</span>
        )
        <span class="hljs-variable language_">self</span>.model.<span class="hljs-built_in">eval</span>()

        <span class="hljs-comment"># Get the input size required by the model</span>
        <span class="hljs-variable language_">self</span>.input_size = <span class="hljs-variable language_">self</span>.model.default_cfg[<span class="hljs-string">&quot;input_size&quot;</span>]

        config = resolve_data_config({}, model=modelname)
        <span class="hljs-comment"># Get the preprocessing function provided by TIMM for the model</span>
        <span class="hljs-variable language_">self</span>.preprocess = create_transform(**config)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__call__</span>(<span class="hljs-params">self, imagepath</span>):
        <span class="hljs-comment"># Preprocess the input image</span>
        input_image = Image.<span class="hljs-built_in">open</span>(imagepath).convert(<span class="hljs-string">&quot;RGB&quot;</span>)  <span class="hljs-comment"># Convert to RGB if needed</span>
        input_image = <span class="hljs-variable language_">self</span>.preprocess(input_image)

        <span class="hljs-comment"># Convert the image to a PyTorch tensor and add a batch dimension</span>
        input_tensor = input_image.unsqueeze(<span class="hljs-number">0</span>)

        <span class="hljs-comment"># Perform inference</span>
        <span class="hljs-keyword">with</span> torch.no_grad():
            output = <span class="hljs-variable language_">self</span>.model(input_tensor)

        <span class="hljs-comment"># Extract the feature vector</span>
        feature_vector = output.squeeze().numpy()

        <span class="hljs-keyword">return</span> normalize(feature_vector.reshape(<span class="hljs-number">1</span>, -<span class="hljs-number">1</span>), norm=<span class="hljs-string">&quot;l2&quot;</span>).flatten()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-a-Milvus-Collection" class="common-anchor-header">إنشاء مجموعة ميلفوس<button data-href="#Create-a-Milvus-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>ثم نحتاج بعد ذلك إلى إنشاء مجموعة Milvus لتخزين تضمينات الصورة</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Set up a Milvus client</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;example.db&quot;</span>)
<span class="hljs-comment"># Create a collection in quick setup mode</span>
<span class="hljs-keyword">if</span> client.has_collection(collection_name=<span class="hljs-string">&quot;image_embeddings&quot;</span>):
    client.drop_collection(collection_name=<span class="hljs-string">&quot;image_embeddings&quot;</span>)
client.create_collection(
    collection_name=<span class="hljs-string">&quot;image_embeddings&quot;</span>,
    vector_field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    dimension=<span class="hljs-number">512</span>,
    auto_id=<span class="hljs-literal">True</span>,
    enable_dynamic_field=<span class="hljs-literal">True</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>بالنسبة لحجة <code translate="no">MilvusClient</code>:</p>
<ul>
<li>يعد تعيين <code translate="no">uri</code> كملف محلي، على سبيل المثال<code translate="no">./milvus.db</code> ، هو الطريقة الأكثر ملاءمة، حيث يستخدم تلقائيًا Milvus <a href="https://milvus.io/docs/milvus_lite.md">Lite</a> لتخزين جميع البيانات في هذا الملف.</li>
<li>إذا كان لديك حجم كبير من البيانات، يمكنك إعداد خادم Milvus أكثر أداءً على <a href="https://milvus.io/docs/quickstart.md">docker أو kubernetes</a>. في هذا الإعداد، يُرجى استخدام الخادم uri، على سبيل المثال<code translate="no">http://localhost:19530</code> ، كـ <code translate="no">uri</code>.</li>
<li>إذا كنت ترغب في استخدام <a href="https://zilliz.com/cloud">Zilliz Cloud،</a> الخدمة السحابية المدارة بالكامل لـ Milvus، اضبط <code translate="no">uri</code> و <code translate="no">token</code> ، والتي تتوافق مع <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">نقطة النهاية العامة ومفتاح Api</a> في Zilliz Cloud.</li>
</ul>
</div>
<h2 id="Insert-the-Embeddings-to-Milvus" class="common-anchor-header">إدراج التضمينات في ميلفوس<button data-href="#Insert-the-Embeddings-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>سنقوم باستخراج تضمينات كل صورة باستخدام نموذج ResNet34 وإدراج الصور من مجموعة التدريب في Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

extractor = FeatureExtractor(<span class="hljs-string">&quot;resnet34&quot;</span>)

root = <span class="hljs-string">&quot;./train&quot;</span>
insert = <span class="hljs-literal">True</span>
<span class="hljs-keyword">if</span> insert <span class="hljs-keyword">is</span> <span class="hljs-literal">True</span>:
    <span class="hljs-keyword">for</span> dirpath, foldername, filenames <span class="hljs-keyword">in</span> os.walk(root):
        <span class="hljs-keyword">for</span> filename <span class="hljs-keyword">in</span> filenames:
            <span class="hljs-keyword">if</span> filename.endswith(<span class="hljs-string">&quot;.JPEG&quot;</span>):
                filepath = dirpath + <span class="hljs-string">&quot;/&quot;</span> + filename
                image_embedding = extractor(filepath)
                client.insert(
                    <span class="hljs-string">&quot;image_embeddings&quot;</span>,
                    {<span class="hljs-string">&quot;vector&quot;</span>: image_embedding, <span class="hljs-string">&quot;filename&quot;</span>: filepath},
                )
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> IPython.display <span class="hljs-keyword">import</span> display

query_image = <span class="hljs-string">&quot;./test/Afghan_hound/n02088094_4261.JPEG&quot;</span>

results = client.search(
    <span class="hljs-string">&quot;image_embeddings&quot;</span>,
    data=[extractor(query_image)],
    output_fields=[<span class="hljs-string">&quot;filename&quot;</span>],
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>},
)
images = []
<span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> result[:<span class="hljs-number">10</span>]:
        filename = hit[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;filename&quot;</span>]
        img = Image.<span class="hljs-built_in">open</span>(filename)
        img = img.resize((<span class="hljs-number">150</span>, <span class="hljs-number">150</span>))
        images.append(img)

width = <span class="hljs-number">150</span> * <span class="hljs-number">5</span>
height = <span class="hljs-number">150</span> * <span class="hljs-number">2</span>
concatenated_image = Image.new(<span class="hljs-string">&quot;RGB&quot;</span>, (width, height))

<span class="hljs-keyword">for</span> idx, img <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(images):
    x = idx % <span class="hljs-number">5</span>
    y = idx // <span class="hljs-number">5</span>
    concatenated_image.paste(img, (x * <span class="hljs-number">150</span>, y * <span class="hljs-number">150</span>))
display(<span class="hljs-string">&quot;query&quot;</span>)
display(Image.<span class="hljs-built_in">open</span>(query_image).resize((<span class="hljs-number">150</span>, <span class="hljs-number">150</span>)))
display(<span class="hljs-string">&quot;results&quot;</span>)
display(concatenated_image)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'query'
</code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/image_search_with_milvus_14_1.png" alt="png" class="doc-image" id="png" />
   </span> <span class="img-wrapper"> <span>png</span> </span></p>
<pre><code translate="no">'results'
</code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/results.png" alt="Results" class="doc-image" id="results" />
   </span> <span class="img-wrapper"> <span>النتائج</span> </span></p>
<p>يمكننا أن نرى أن معظم الصور من نفس فئة صورة البحث، وهي صورة كلب الصيد الأفغاني. هذا يعني أننا وجدنا صوراً مشابهة لصورة البحث.</p>
<h2 id="Quick-Deploy" class="common-anchor-header">النشر السريع<button data-href="#Quick-Deploy" class="anchor-icon" translate="no">
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
    </button></h2><p>لمعرفة كيفية بدء عرض توضيحي عبر الإنترنت باستخدام هذا البرنامج التعليمي، يرجى الرجوع إلى <a href="https://github.com/milvus-io/bootcamp/tree/master/tutorials/quickstart/apps/image_search_with_milvus">مثال التطبيق</a>.</p>
