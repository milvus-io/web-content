---
id: integrate_with_agno.md
title: Интеграция Milvus с Agno
summary: >-
  Векторная база данных Milvus позволяет эффективно хранить и извлекать
  информацию в виде вкраплений. С помощью Milvus и Agno вы можете легко
  интегрировать свои знания в рабочие процессы агентов. Этот документ
  представляет собой базовое руководство по использованию интеграции Milvus с
  Agno.
---
<h1 id="Integrate-Milvus-with-Agno" class="common-anchor-header">Интеграция Milvus с Agno<button data-href="#Integrate-Milvus-with-Agno" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/integrate_with_phidata.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/integrate_with_phidata.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p><a href="https://docs.agno.com/introduction">Agno</a>(ранее известная как Phidata) - это легкая библиотека для создания мультимодальных агентов. Она позволяет создавать мультимодальные агенты, которые могут понимать текст, изображения, аудио и видео, а также использовать различные инструменты и источники знаний для выполнения сложных задач. Agno поддерживает оркестровку мультиагентов, позволяя командам агентов сотрудничать и совместно решать проблемы. Кроме того, Agno предоставляет красивый пользовательский интерфейс для взаимодействия с агентами.</p>
<p>Векторная база данных Milvus позволяет эффективно хранить и извлекать информацию в виде вкраплений. С помощью Milvus и Agno вы можете легко интегрировать свои знания в рабочие процессы агентов. Этот документ представляет собой базовое руководство по использованию интеграции Milvus с Agno.</p>
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
    </button></h2><p>Установите необходимые зависимости:</p>
<pre><code translate="no" class="language-python">$ pip install --upgrade agno pymilvus milvus-lite openai
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Если вы используете Google Colab, для включения только что установленных зависимостей вам может потребоваться <strong>перезапустить среду выполнения</strong> (нажмите на меню "Runtime" в верхней части экрана и выберите "Restart session" из выпадающего меню).</p>
</div>
<p>В этом примере мы будем использовать OpenAI в качестве LLM. Вам следует подготовить <a href="https://platform.openai.com/docs/quickstart">api ключ</a> <code translate="no">OPENAI_API_KEY</code> в качестве переменной окружения.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-xxxx&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Initalize-Milvus" class="common-anchor-header">Инициализация Milvus<button data-href="#Initalize-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Импортируйте пакеты и инициализируйте экземпляр векторной базы данных Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> agno.agent <span class="hljs-keyword">import</span> Agent
<span class="hljs-keyword">from</span> agno.knowledge.pdf_url <span class="hljs-keyword">import</span> PDFUrlKnowledgeBase
<span class="hljs-keyword">from</span> agno.vectordb.milvus <span class="hljs-keyword">import</span> Milvus

<span class="hljs-comment"># Initialize Milvus</span>
vector_db = Milvus(
    collection=<span class="hljs-string">&quot;recipes&quot;</span>,
    uri=<span class="hljs-string">&quot;./milvus.db&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Укажите имя коллекции, uri и token(optinal) для вашего сервера Milvus.</p>
<div class="alert note">
<p>Здесь описано, как задать uri и token:</p>
<ul>
<li>Если вам нужна локальная векторная база данных только для небольших масштабов данных или прототипирования, установка uri в качестве локального файла, например<code translate="no">./milvus.db</code>, является наиболее удобным методом, поскольку он автоматически использует <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> для хранения всех данных в этом файле.</li>
<li>Если у вас большой объем данных, скажем, более миллиона векторов, вы можете настроить более производительный сервер Milvus на <a href="https://milvus.io/docs/quickstart.md">Docker или Kubernetes</a>. В этом случае используйте адрес и порт сервера в качестве uri, например,<code translate="no">http://localhost:19530</code>. Если вы включили функцию аутентификации на Milvus, используйте "<your_username>:<your_password>" в качестве токена, в противном случае не задавайте токен.</li>
<li>Если вы используете <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, полностью управляемый облачный сервис для Milvus, настройте <code translate="no">uri</code> и <code translate="no">token</code>, которые соответствуют <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">публичной конечной точке и ключу API</a> в Zilliz Cloud.</li>
</ul>
</div>
<h2 id="Load-data" class="common-anchor-header">Загрузка данных<button data-href="#Load-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Создайте экземпляр базы знаний PDF url и загрузите в него данные. В качестве примера мы используем публичные pdf-данные рецептов.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create knowledge base</span>
knowledge_base = PDFUrlKnowledgeBase(
    urls=[<span class="hljs-string">&quot;https://phi-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf&quot;</span>],
    vector_db=vector_db,
)

knowledge_base.load(recreate=<span class="hljs-literal">False</span>)  <span class="hljs-comment"># Comment out after first run</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">INFO    Creating
INFO    Loading knowledge  
INFO    Reading: https://phi-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf       
INFO    Added documents to knowledge base                                                                             
</code></pre>
<h2 id="Use-agent-to-response-to-a-question" class="common-anchor-header">Использование агента для ответа на вопрос<button data-href="#Use-agent-to-response-to-a-question" class="anchor-icon" translate="no">
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
    </button></h2><p>Интегрируйте базу знаний в агента, после чего мы сможем задать ему вопрос и получить ответ.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create and use the agent</span>
agent = Agent(knowledge=knowledge_base, show_tool_calls=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Query the agent</span>
agent.print_response(<span class="hljs-string">&quot;How to make Tom Kha Gai&quot;</span>, markdown=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Output()


┏━ Message ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                                                                                                             ┃
┃ How to make Tom Kha Gai                                                                                                                                     ┃
┃                                                                                                                                                             ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
┏━ Response (6.9s) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                                                                                                             ┃
┃ Running:                                                                                                                                                    ┃
┃                                                                                                                                                             ┃
┃  • search_knowledge_base(query=Tom Kha Gai recipe)                                                                                                          ┃
┃                                                                                                                                                             ┃
┃ Here's a recipe for Tom Kha Gai, a delicious Thai chicken and galangal soup made with coconut milk:                                                         ┃
┃                                                                                                                                                             ┃
┃ Ingredients (One serving):                                                                                                                                  ┃
┃                                                                                                                                                             ┃
┃  • 150 grams chicken, cut into bite-size pieces                                                                                                             ┃
┃  • 50 grams sliced young galangal                                                                                                                           ┃
┃  • 100 grams lightly crushed lemongrass, julienned                                                                                                          ┃
┃  • 100 grams straw mushrooms                                                                                                                                ┃
┃  • 250 grams coconut milk                                                                                                                                   ┃
┃  • 100 grams chicken stock                                                                                                                                  ┃
┃  • 3 tbsp lime juice                                                                                                                                        ┃
┃  • 3 tbsp fish sauce                                                                                                                                        ┃
┃  • 2 leaves kaffir lime, shredded                                                                                                                           ┃
┃  • 1-2 bird’s eye chilies, pounded                                                                                                                          ┃
┃  • 3 leaves coriander                                                                                                                                       ┃
┃                                                                                                                                                             ┃
┃ Directions:                                                                                                                                                 ┃
┃                                                                                                                                                             ┃
┃  1 Bring the chicken stock and coconut milk to a slow boil.                                                                                                 ┃
┃  2 Add galangal, lemongrass, chicken, and mushrooms. Once the soup returns to a boil, season it with fish sauce.                                            ┃
┃  3 Wait until the chicken is cooked, then add the kaffir lime leaves and bird’s eye chilies.                                                                ┃
┃  4 Remove the pot from heat and add lime juice.                                                                                                             ┃
┃  5 Garnish with coriander leaves.                                                                                                                           ┃
┃                                                                                                                                                             ┃
┃ Tips:                                                                                                                                                       ┃
┃                                                                                                                                                             ┃
┃  • Keep the heat low throughout the cooking process to prevent the oil in the coconut milk from separating.                                                 ┃
┃  • If using mature galangal, reduce the amount.                                                                                                             ┃
┃  • Adding lime juice after removing the pot from heat makes it more aromatic.                                                                               ┃
┃  • Reduce the number of chilies for a milder taste.                                                                                                         ┃
┃                                                                                                                                                             ┃
┃ Enjoy making and savoring this flavorful Thai soup!                                                                                                         ┃
┃                                                                                                                                                             ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
</code></pre>
<p>Поздравляем, вы изучили основы использования Milvus в Agno. Если вы хотите узнать больше о том, как использовать Agno, обратитесь к <a href="https://docs.agno.com/introduction">официальной документации</a>.</p>
