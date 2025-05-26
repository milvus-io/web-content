---
id: build_RAG_with_milvus_and_crawl4ai.md
summary: >-
  В этом руководстве мы покажем вам, как построить конвейер Retrieval-Augmented
  Generation (RAG) с использованием Milvus и Crawl4AI. Конвейер объединяет
  Crawl4AI для сбора веб-данных, Milvus для хранения векторов и OpenAI для
  генерации проницательных, учитывающих контекст ответов.
title: Создание RAG с помощью Milvus и Crawl4AI
---
<h1 id="Building-RAG-with-Milvus-and-Crawl4AI" class="common-anchor-header">Создание RAG с помощью Milvus и Crawl4AI<button data-href="#Building-RAG-with-Milvus-and-Crawl4AI" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_crawl4ai.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_crawl4ai.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p><a href="https://crawl4ai.com/mkdocs/">Crawl4AI</a> обеспечивает молниеносный, готовый к искусственному интеллекту веб-скраппинг для LLM. С открытым исходным кодом и оптимизированный для RAG, он упрощает поиск с помощью расширенного извлечения и производительности в реальном времени.</p>
<p>В этом руководстве мы покажем вам, как построить конвейер Retrieval-Augmented Generation (RAG) с использованием Milvus и Crawl4AI. Конвейер объединяет Crawl4AI для сбора веб-данных, Milvus для хранения векторов и OpenAI для генерации проницательных ответов, учитывающих контекст.</p>
<h2 id="Preparation" class="common-anchor-header">Подготовка<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Dependencies-and-Environment" class="common-anchor-header">Зависимости и среда</h3><p>Для начала установите необходимые зависимости, выполнив следующую команду:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install -U crawl4ai pymilvus openai requests tqdm</span>
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>Если вы используете Google Colab, для включения только что установленных зависимостей вам может потребоваться <strong>перезапустить среду выполнения</strong> (нажмите на меню "Runtime" в верхней части экрана и выберите "Restart session" в выпадающем меню).</p>
</blockquote>
<p>Чтобы полностью настроить crawl4ai, выполните следующие команды:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Run post-installation setup</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">crawl4ai-setup</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Verify installation</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">crawl4ai-doctor</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[36m[INIT].... → Running post-installation setup...[0m
[36m[INIT].... → Installing Playwright browsers...[0m
[32m[COMPLETE] ● Playwright installation completed successfully.[0m
[36m[INIT].... → Starting database initialization...[0m
[32m[COMPLETE] ● Database initialization completed successfully.[0m
[32m[COMPLETE] ● Post-installation setup completed![0m
[0m[36m[INIT].... → Running Crawl4AI health check...[0m
[36m[INIT].... → Crawl4AI 0.4.247[0m
[36m[TEST].... ℹ Testing crawling capabilities...[0m
[36m[EXPORT].. ℹ Exporting PDF and taking screenshot took 0.80s[0m
[32m[FETCH]... ↓ https://crawl4ai.com... | Status: [32mTrue[0m | Time: 4.22s[0m
[36m[SCRAPE].. ◆ Processed https://crawl4ai.com... | Time: 14ms[0m
[32m[COMPLETE] ● https://crawl4ai.com... | Status: [32mTrue[0m | Total: [33m4.23s[0m[0m
[32m[COMPLETE] ● ✅ Crawling test passed![0m
[0m
</code></pre>
<h3 id="Setting-Up-OpenAI-API-Key" class="common-anchor-header">Настройка ключа API OpenAI</h3><p>В этом примере мы будем использовать OpenAI в качестве LLM. Вы должны подготовить <a href="https://platform.openai.com/docs/quickstart">OPENAI_API_KEY</a> в качестве переменной окружения.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-the-LLM-and-Embedding-Model" class="common-anchor-header">Подготовка LLM и модели встраивания</h3><p>Мы инициализируем клиент OpenAI, чтобы подготовить модель встраивания.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

openai_client = OpenAI()
<button class="copy-code-btn"></button></code></pre>
<p>Определите функцию для генерации текстовых вкраплений с помощью клиента OpenAI. В качестве примера мы используем модель <a href="https://platform.openai.com/docs/guides/embeddings">text-embedding-3-small</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">emb_text</span>(<span class="hljs-params">text</span>):
    <span class="hljs-keyword">return</span> (
        openai_client.embeddings.create(<span class="hljs-built_in">input</span>=text, model=<span class="hljs-string">&quot;text-embedding-3-small&quot;</span>)
        .data[<span class="hljs-number">0</span>]
        .embedding
    )
<button class="copy-code-btn"></button></code></pre>
<p>Сгенерируйте тестовое вкрапление и выведите его размерность и первые несколько элементов.</p>
<pre><code translate="no" class="language-python">test_embedding = emb_text(<span class="hljs-string">&quot;This is a test&quot;</span>)
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">1536
[0.009889289736747742, -0.005578675772994757, 0.00683477520942688, -0.03805781528353691, -0.01824733428657055, -0.04121600463986397, -0.007636285852640867, 0.03225184231996536, 0.018949154764413834, 9.352207416668534e-05]
</code></pre>
<h2 id="Crawl-Data-Using-Crawl4AI" class="common-anchor-header">Сбор данных с помощью Crawl4AI<button data-href="#Crawl-Data-Using-Crawl4AI" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> crawl4ai <span class="hljs-keyword">import</span> *


<span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">crawl</span>():
    <span class="hljs-keyword">async</span> <span class="hljs-keyword">with</span> AsyncWebCrawler() <span class="hljs-keyword">as</span> crawler:
        result = <span class="hljs-keyword">await</span> crawler.arun(
            url=<span class="hljs-string">&quot;https://lilianweng.github.io/posts/2023-06-23-agent/&quot;</span>,
        )
        <span class="hljs-keyword">return</span> result.markdown


markdown_content = <span class="hljs-keyword">await</span> crawl()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[INIT].... → Crawl4AI 0.4.247
[FETCH]... ↓ https://lilianweng.github.io/posts/2023-06-23-agen... | Status: True | Time: 0.07s
[COMPLETE] ● https://lilianweng.github.io/posts/2023-06-23-agen... | Status: True | Total: 0.08s
</code></pre>
<h3 id="Process-the-Crawled-Content" class="common-anchor-header">Обработка полученного контента</h3><p>Чтобы сделать собранный контент управляемым для вставки в Milvus, мы просто используем "# " для разделения контента, что позволяет примерно разделить содержимое каждой основной части собранного файла разметки.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">split_markdown_content</span>(<span class="hljs-params">content</span>):
    <span class="hljs-keyword">return</span> [section.strip() <span class="hljs-keyword">for</span> section <span class="hljs-keyword">in</span> content.split(<span class="hljs-string">&quot;# &quot;</span>) <span class="hljs-keyword">if</span> section.strip()]


<span class="hljs-comment"># Process the crawled markdown content</span>
sections = split_markdown_content(markdown_content)

<span class="hljs-comment"># Print the first few sections to understand the structure</span>
<span class="hljs-keyword">for</span> i, section <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(sections[:<span class="hljs-number">3</span>]):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Section <span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>:&quot;</span>)
    <span class="hljs-built_in">print</span>(section[:<span class="hljs-number">300</span>] + <span class="hljs-string">&quot;...&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;-&quot;</span> * <span class="hljs-number">50</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Section 1:
[Lil'Log](https://lilianweng.github.io/posts/2023-06-23-agent/&lt;https:/lilianweng.github.io/&gt; &quot;Lil'Log \(Alt + H\)&quot;)
  * |


  * [ Posts ](https://lilianweng.github.io/posts/2023-06-23-agent/&lt;https:/lilianweng.github.io/&gt; &quot;Posts&quot;)
  * [ Archive ](https://lilianweng.github.io/posts/2023-06-23-agent/&lt;h...
--------------------------------------------------
Section 2:
LLM Powered Autonomous Agents 
Date: June 23, 2023 | Estimated Reading Time: 31 min | Author: Lilian Weng 
Table of Contents
  * [Agent System Overview](https://lilianweng.github.io/posts/2023-06-23-agent/&lt;#agent-system-overview&gt;)
  * [Component One: Planning](https://lilianweng.github.io/posts/2023...
--------------------------------------------------
Section 3:
Agent System Overview[#](https://lilianweng.github.io/posts/2023-06-23-agent/&lt;#agent-system-overview&gt;)
In a LLM-powered autonomous agent system, LLM functions as the agent’s brain, complemented by several key components:
  * **Planning**
    * Subgoal and decomposition: The agent breaks down large t...
--------------------------------------------------
</code></pre>
<h2 id="Load-Data-into-Milvus" class="common-anchor-header">Загрузка данных в Milvus<button data-href="#Load-Data-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-collection" class="common-anchor-header">Создание коллекции</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
collection_name = <span class="hljs-string">&quot;my_rag_collection&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">INFO:numexpr.utils:Note: NumExpr detected 10 cores but &quot;NUMEXPR_MAX_THREADS&quot; not set, so enforcing safe limit of 8.
INFO:numexpr.utils:NumExpr defaulting to 8 threads.
</code></pre>
<div class="alert note">
<p>Что касается аргумента <code translate="no">MilvusClient</code>:</p>
<ul>
<li><p>Задание <code translate="no">uri</code> в качестве локального файла, например<code translate="no">./milvus.db</code>, является наиболее удобным методом, так как он автоматически использует <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> для хранения всех данных в этом файле.</p></li>
<li><p>Если у вас большой объем данных, вы можете настроить более производительный сервер Milvus на <a href="https://milvus.io/docs/quickstart.md">docker или kubernetes</a>. В этом случае используйте ури сервера, например<code translate="no">http://localhost:19530</code>, в качестве <code translate="no">uri</code>.</p></li>
<li><p>Если вы хотите использовать <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, полностью управляемый облачный сервис для Milvus, настройте <code translate="no">uri</code> и <code translate="no">token</code>, которые соответствуют <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">публичной конечной точке и ключу Api</a> в Zilliz Cloud.</p></li>
</ul>
</div>
<p>Проверьте, не существует ли уже коллекция, и удалите ее, если она существует.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>Создайте новую коллекцию с указанными параметрами.</p>
<p>Если мы не укажем информацию о полях, Milvus автоматически создаст поле по умолчанию <code translate="no">id</code> для первичного ключа и поле <code translate="no">vector</code> для хранения векторных данных. Зарезервированное поле JSON используется для хранения не определенных схемой полей и их значений.</p>
<pre><code translate="no" class="language-python">milvus_client.create_collection(
    collection_name=collection_name,
    dimension=embedding_dim,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data" class="common-anchor-header">Вставка данных</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []
<span class="hljs-keyword">for</span> i, section <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(tqdm(sections, desc=<span class="hljs-string">&quot;Processing sections&quot;</span>)):
    embedding = emb_text(section)
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: embedding, <span class="hljs-string">&quot;text&quot;</span>: section})

<span class="hljs-comment"># Insert data into Milvus</span>
milvus_client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Processing sections:   0%|          | 0/18 [00:00&lt;?, ?it/s]INFO:httpx:HTTP Request: POST https://api.openai.com/v1/embeddings &quot;HTTP/1.1 200 OK&quot;
Processing sections:   6%|▌         | 1/18 [00:00&lt;00:12,  1.37it/s]INFO:httpx:HTTP Request: POST https://api.openai.com/v1/embeddings &quot;HTTP/1.1 200 OK&quot;
Processing sections:  11%|█         | 2/18 [00:01&lt;00:11,  1.39it/s]INFO:httpx:HTTP Request: POST https://api.openai.com/v1/embeddings &quot;HTTP/1.1 200 OK&quot;
Processing sections:  17%|█▋        | 3/18 [00:02&lt;00:10,  1.40it/s]INFO:httpx:HTTP Request: POST https://api.openai.com/v1/embeddings &quot;HTTP/1.1 200 OK&quot;
Processing sections:  22%|██▏       | 4/18 [00:02&lt;00:07,  1.85it/s]INFO:httpx:HTTP Request: POST https://api.openai.com/v1/embeddings &quot;HTTP/1.1 200 OK&quot;
Processing sections:  28%|██▊       | 5/18 [00:02&lt;00:06,  2.06it/s]INFO:httpx:HTTP Request: POST https://api.openai.com/v1/embeddings &quot;HTTP/1.1 200 OK&quot;
Processing sections:  33%|███▎      | 6/18 [00:03&lt;00:06,  1.94it/s]INFO:httpx:HTTP Request: POST https://api.openai.com/v1/embeddings &quot;HTTP/1.1 200 OK&quot;
Processing sections:  39%|███▉      | 7/18 [00:03&lt;00:05,  2.14it/s]INFO:httpx:HTTP Request: POST https://api.openai.com/v1/embeddings &quot;HTTP/1.1 200 OK&quot;
Processing sections:  44%|████▍     | 8/18 [00:04&lt;00:04,  2.29it/s]INFO:httpx:HTTP Request: POST https://api.openai.com/v1/embeddings &quot;HTTP/1.1 200 OK&quot;
Processing sections:  50%|█████     | 9/18 [00:04&lt;00:04,  2.20it/s]INFO:httpx:HTTP Request: POST https://api.openai.com/v1/embeddings &quot;HTTP/1.1 200 OK&quot;
Processing sections:  56%|█████▌    | 10/18 [00:05&lt;00:03,  2.09it/s]INFO:httpx:HTTP Request: POST https://api.openai.com/v1/embeddings &quot;HTTP/1.1 200 OK&quot;
Processing sections:  61%|██████    | 11/18 [00:06&lt;00:04,  1.68it/s]INFO:httpx:HTTP Request: POST https://api.openai.com/v1/embeddings &quot;HTTP/1.1 200 OK&quot;
Processing sections:  67%|██████▋   | 12/18 [00:06&lt;00:04,  1.48it/s]INFO:httpx:HTTP Request: POST https://api.openai.com/v1/embeddings &quot;HTTP/1.1 200 OK&quot;
Processing sections:  72%|███████▏  | 13/18 [00:07&lt;00:02,  1.75it/s]INFO:httpx:HTTP Request: POST https://api.openai.com/v1/embeddings &quot;HTTP/1.1 200 OK&quot;
Processing sections:  78%|███████▊  | 14/18 [00:07&lt;00:01,  2.02it/s]INFO:httpx:HTTP Request: POST https://api.openai.com/v1/embeddings &quot;HTTP/1.1 200 OK&quot;
Processing sections:  83%|████████▎ | 15/18 [00:07&lt;00:01,  2.12it/s]INFO:httpx:HTTP Request: POST https://api.openai.com/v1/embeddings &quot;HTTP/1.1 200 OK&quot;
Processing sections:  89%|████████▉ | 16/18 [00:08&lt;00:01,  1.61it/s]INFO:httpx:HTTP Request: POST https://api.openai.com/v1/embeddings &quot;HTTP/1.1 200 OK&quot;
Processing sections:  94%|█████████▍| 17/18 [00:09&lt;00:00,  1.92it/s]INFO:httpx:HTTP Request: POST https://api.openai.com/v1/embeddings &quot;HTTP/1.1 200 OK&quot;
Processing sections: 100%|██████████| 18/18 [00:09&lt;00:00,  1.83it/s]





{'insert_count': 18, 'ids': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 'cost': 0}
</code></pre>
<h2 id="Build-RAG" class="common-anchor-header">Построить RAG<button data-href="#Build-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Retrieve-data-for-a-query" class="common-anchor-header">Получение данных для запроса</h3><p>Давайте зададим вопрос о сайте, который мы только что просмотрели.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;What are the main components of autonomous agents?&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Найдем этот вопрос в коллекции и получим семантический топ-3 совпадений.</p>
<pre><code translate="no" class="language-python">search_res = milvus_client.search(
    collection_name=collection_name,
    data=[emb_text(question)],
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}},
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">INFO:httpx:HTTP Request: POST https://api.openai.com/v1/embeddings &quot;HTTP/1.1 200 OK&quot;
</code></pre>
<p>Давайте посмотрим на результаты поиска по этому запросу.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json

retrieved_lines_with_distances = [
    (res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>], res[<span class="hljs-string">&quot;distance&quot;</span>]) <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> search_res[<span class="hljs-number">0</span>]
]
<span class="hljs-built_in">print</span>(json.dumps(retrieved_lines_with_distances, indent=<span class="hljs-number">4</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[
    [
        &quot;Agent System Overview[#](https://lilianweng.github.io/posts/2023-06-23-agent/&lt;#agent-system-overview&gt;)\nIn a LLM-powered autonomous agent system, LLM functions as the agent\u2019s brain, complemented by several key components:\n  * **Planning**\n    * Subgoal and decomposition: The agent breaks down large tasks into smaller, manageable subgoals, enabling efficient handling of complex tasks.\n    * Reflection and refinement: The agent can do self-criticism and self-reflection over past actions, learn from mistakes and refine them for future steps, thereby improving the quality of final results.\n  * **Memory**\n    * Short-term memory: I would consider all the in-context learning (See [Prompt Engineering](https://lilianweng.github.io/posts/2023-06-23-agent/&lt;https:/lilianweng.github.io/posts/2023-03-15-prompt-engineering/&gt;)) as utilizing short-term memory of the model to learn.\n    * Long-term memory: This provides the agent with the capability to retain and recall (infinite) information over extended periods, often by leveraging an external vector store and fast retrieval.\n  * **Tool use**\n    * The agent learns to call external APIs for extra information that is missing from the model weights (often hard to change after pre-training), including current information, code execution capability, access to proprietary information sources and more.\n\n![](https://lilianweng.github.io/posts/2023-06-23-agent/agent-overview.png) Fig. 1. Overview of a LLM-powered autonomous agent system.&quot;,
        0.6433743238449097
    ],
    [
        &quot;LLM Powered Autonomous Agents \nDate: June 23, 2023 | Estimated Reading Time: 31 min | Author: Lilian Weng \nTable of Contents\n  * [Agent System Overview](https://lilianweng.github.io/posts/2023-06-23-agent/&lt;#agent-system-overview&gt;)\n  * [Component One: Planning](https://lilianweng.github.io/posts/2023-06-23-agent/&lt;#component-one-planning&gt;)\n    * [Task Decomposition](https://lilianweng.github.io/posts/2023-06-23-agent/&lt;#task-decomposition&gt;)\n    * [Self-Reflection](https://lilianweng.github.io/posts/2023-06-23-agent/&lt;#self-reflection&gt;)\n  * [Component Two: Memory](https://lilianweng.github.io/posts/2023-06-23-agent/&lt;#component-two-memory&gt;)\n    * [Types of Memory](https://lilianweng.github.io/posts/2023-06-23-agent/&lt;#types-of-memory&gt;)\n    * [Maximum Inner Product Search (MIPS)](https://lilianweng.github.io/posts/2023-06-23-agent/&lt;#maximum-inner-product-search-mips&gt;)\n  * [Component Three: Tool Use](https://lilianweng.github.io/posts/2023-06-23-agent/&lt;#component-three-tool-use&gt;)\n  * [Case Studies](https://lilianweng.github.io/posts/2023-06-23-agent/&lt;#case-studies&gt;)\n    * [Scientific Discovery Agent](https://lilianweng.github.io/posts/2023-06-23-agent/&lt;#scientific-discovery-agent&gt;)\n    * [Generative Agents Simulation](https://lilianweng.github.io/posts/2023-06-23-agent/&lt;#generative-agents-simulation&gt;)\n    * [Proof-of-Concept Examples](https://lilianweng.github.io/posts/2023-06-23-agent/&lt;#proof-of-concept-examples&gt;)\n  * [Challenges](https://lilianweng.github.io/posts/2023-06-23-agent/&lt;#challenges&gt;)\n  * [Citation](https://lilianweng.github.io/posts/2023-06-23-agent/&lt;#citation&gt;)\n  * [References](https://lilianweng.github.io/posts/2023-06-23-agent/&lt;#references&gt;)\n\n\nBuilding agents with LLM (large language model) as its core controller is a cool concept. Several proof-of-concepts demos, such as [AutoGPT](https://lilianweng.github.io/posts/2023-06-23-agent/&lt;https:/github.com/Significant-Gravitas/Auto-GPT&gt;), [GPT-Engineer](https://lilianweng.github.io/posts/2023-06-23-agent/&lt;https:/github.com/AntonOsika/gpt-engineer&gt;) and [BabyAGI](https://lilianweng.github.io/posts/2023-06-23-agent/&lt;https:/github.com/yoheinakajima/babyagi&gt;), serve as inspiring examples. The potentiality of LLM extends beyond generating well-written copies, stories, essays and programs; it can be framed as a powerful general problem solver.&quot;,
        0.5462194085121155
    ],
    [
        &quot;Component One: Planning[#](https://lilianweng.github.io/posts/2023-06-23-agent/&lt;#component-one-planning&gt;)\nA complicated task usually involves many steps. An agent needs to know what they are and plan ahead.\n#&quot;,
        0.5223420858383179
    ]
]
</code></pre>
<h3 id="Use-LLM-to-get-a-RAG-response" class="common-anchor-header">Использование LLM для получения ответа RAG</h3><p>Преобразуйте полученные документы в строковый формат.</p>
<pre><code translate="no" class="language-python">context = <span class="hljs-string">&quot;\n&quot;</span>.join(
    [line_with_distance[<span class="hljs-number">0</span>] <span class="hljs-keyword">for</span> line_with_distance <span class="hljs-keyword">in</span> retrieved_lines_with_distances]
)
<button class="copy-code-btn"></button></code></pre>
<p>Определите системные и пользовательские подсказки для модели Lanage. Эта подсказка собрана из документов, полученных из Milvus.</p>
<pre><code translate="no" class="language-python">SYSTEM_PROMPT = <span class="hljs-string">&quot;&quot;&quot;
Human: You are an AI assistant. You are able to find answers to the questions from the contextual passage snippets provided.
&quot;&quot;&quot;</span>
USER_PROMPT = <span class="hljs-string">f&quot;&quot;&quot;
Use the following pieces of information enclosed in &lt;context&gt; tags to provide an answer to the question enclosed in &lt;question&gt; tags.
&lt;context&gt;
<span class="hljs-subst">{context}</span>
&lt;/context&gt;
&lt;question&gt;
<span class="hljs-subst">{question}</span>
&lt;/question&gt;
&quot;&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Используйте OpenAI ChatGPT для генерации ответа на основе подсказок.</p>
<pre><code translate="no" class="language-python">response = openai_client.chat.completions.create(
    model=<span class="hljs-string">&quot;gpt-4o&quot;</span>,
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: SYSTEM_PROMPT},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: USER_PROMPT},
    ],
)
<span class="hljs-built_in">print</span>(response.choices[<span class="hljs-number">0</span>].message.content)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">INFO:httpx:HTTP Request: POST https://api.openai.com/v1/chat/completions &quot;HTTP/1.1 200 OK&quot;


The main components of autonomous agents are:

1. **Planning**:
   - Subgoal and decomposition: Breaking down large tasks into smaller, manageable subgoals.
   - Reflection and refinement: Self-criticism and reflection to learn from past actions and improve future steps.

2. **Memory**:
   - Short-term memory: In-context learning using prompt engineering.
   - Long-term memory: Retaining and recalling information over extended periods using an external vector store and fast retrieval.

3. **Tool use**:
   - Calling external APIs for information not contained in the model weights, accessing current information, code execution capabilities, and proprietary information sources.
</code></pre>
