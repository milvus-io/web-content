---
id: integrate_with_agno.md
title: Integrate Milvus with Agno
summary: >-
  Milvus vector database enable efficient storage and retrieval of information
  as embeddings. With Milvus and Agno, you can easily integrate your knowledge
  into your Agent workflows. This document is a basic guide on how to use Milvus
  integration with Agno.
---
<h1 id="Integrate-Milvus-with-Agno" class="common-anchor-header">Integrate Milvus with Agno<button data-href="#Integrate-Milvus-with-Agno" class="anchor-icon" translate="no">
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
<p><a href="https://docs.agno.com/introduction">Agno</a>(formerly known as Phidata) is a lightweight library for building Multimodal Agents. It allows you to create multi-modal agents that can understand text, images, audio, and video, and leverage various tools and knowledge sources to accomplish complex tasks. Agno supports multi-agent orchestration, enabling teams of agents to collaborate and solve problems together. It also provides a beautiful Agent UI for interacting with your agents.</p>
<p>Milvus vector database enable efficient storage and retrieval of information as embeddings. With Milvus and Agno, you can easily integrate your knowledge into your Agent workflows. This document is a basic guide on how to use Milvus integration with Agno.</p>
<h2 id="Preparation" class="common-anchor-header">Preparation<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><p>Install the necessary dependencies:</p>
<pre><code translate="no" class="language-python">$ pip install --upgrade agno pymilvus openai
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>If you are using Google Colab, to enable dependencies just installed, you may need to <strong>restart the runtime</strong> (click on the “Runtime” menu at the top of the screen, and select “Restart session” from the dropdown menu).</p>
</div>
<p>We will use OpenAI as the LLM in this example. You should prepare the <a href="https://platform.openai.com/docs/quickstart">api key</a> <code translate="no">OPENAI_API_KEY</code> as an environment variable.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-xxxx&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Initalize-Milvus" class="common-anchor-header">Initalize Milvus<button data-href="#Initalize-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Import the packages and initialize the Milvus vector database instance.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> agno.agent <span class="hljs-keyword">import</span> Agent
<span class="hljs-keyword">from</span> agno.knowledge.pdf_url <span class="hljs-keyword">import</span> PDFUrlKnowledgeBase
<span class="hljs-keyword">from</span> agno.vectordb.milvus <span class="hljs-keyword">import</span> Milvus

<span class="hljs-comment"># Initialize Milvus</span>
vector_db = Milvus(
    collection=<span class="hljs-string">&quot;recipes&quot;</span>,
    uri=<span class="hljs-string">&quot;./milvus.db&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Specify the collection name and the uri and token(optinal) for your Milvus server.</p>
<div class="alert note">
<p>Here is how to set the uri and token:</p>
<ul>
<li>If you only need a local vector database for small scale data or prototyping, setting the uri as a local file, e.g.<code translate="no">./milvus.db</code>, is the most convenient method, as it automatically utilizes <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> to store all data in this file.</li>
<li>If you have large scale of data, say more than a million vectors, you can set up a more performant Milvus server on <a href="https://milvus.io/docs/quickstart.md">Docker or Kubernetes</a>. In this setup, please use the server address and port as your uri, e.g.<code translate="no">http://localhost:19530</code>. If you enable the authentication feature on Milvus, use “<your_username>:<your_password>” as the token, otherwise don’t set the token.</li>
<li>If you use <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, the fully managed cloud service for Milvus, adjust the <code translate="no">uri</code> and <code translate="no">token</code>, which correspond to the <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">Public Endpoint and API key</a> in Zilliz Cloud.</li>
</ul>
</div>
<h2 id="Load-data" class="common-anchor-header">Load data<button data-href="#Load-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Create a PDF url knowledage base instance and load the data into the instance. We use a public recipe pdf data as an example.</p>
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
<h2 id="Use-agent-to-response-to-a-question" class="common-anchor-header">Use agent to response to a question<button data-href="#Use-agent-to-response-to-a-question" class="anchor-icon" translate="no">
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
    </button></h2><p>Integrate the knowledge base into an agent, then we can ask the agent a question and get a response.</p>
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
<p>Congratulations, you have learned the basics of using Milvus in Agno. If you want to know more about how to use Agno, please refer to the <a href="https://docs.agno.com/introduction">official documentation</a>.</p>
