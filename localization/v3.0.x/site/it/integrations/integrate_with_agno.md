---
id: integrate_with_agno.md
title: Integrare Milvus con Agno
summary: >-
  I database vettoriali Milvus consentono di memorizzare e recuperare in modo
  efficiente le informazioni sotto forma di embeddings. Con Milvus e Agno, è
  possibile integrare facilmente le conoscenze nei flussi di lavoro degli
  agenti. Questo documento è una guida di base su come utilizzare l'integrazione
  di Milvus con Agno.
---
<h1 id="Integrate-Milvus-with-Agno" class="common-anchor-header">Integrare Milvus con Agno<button data-href="#Integrate-Milvus-with-Agno" class="anchor-icon" translate="no">
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
<p><a href="https://docs.agno.com/introduction">Agno</a>(precedentemente noto come Phidata) è una libreria leggera per la creazione di agenti multimodali. Consente di creare agenti multimodali in grado di comprendere testo, immagini, audio e video e di sfruttare vari strumenti e fonti di conoscenza per svolgere compiti complessi. Agno supporta l'orchestrazione multi-agente, consentendo a team di agenti di collaborare e risolvere problemi insieme. Fornisce inoltre una bella interfaccia utente per interagire con gli agenti.</p>
<p>Il database vettoriale Milvus consente di memorizzare e recuperare in modo efficiente le informazioni sotto forma di embeddings. Con Milvus e Agno, è possibile integrare facilmente le conoscenze nei flussi di lavoro degli agenti. Questo documento è una guida di base su come utilizzare l'integrazione di Milvus con Agno.</p>
<h2 id="Preparation" class="common-anchor-header">Preparazione<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><p>Installare le dipendenze necessarie:</p>
<pre><code translate="no" class="language-python">$ pip install --upgrade agno pymilvus milvus-lite openai
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Se si utilizza Google Colab, per abilitare le dipendenze appena installate potrebbe essere necessario <strong>riavviare il runtime</strong> (fare clic sul menu "Runtime" nella parte superiore dello schermo e selezionare "Riavvia sessione" dal menu a discesa).</p>
</div>
<p>In questo esempio utilizzeremo OpenAI come LLM. È necessario preparare la <a href="https://platform.openai.com/docs/quickstart">chiave api</a> <code translate="no">OPENAI_API_KEY</code> come variabile d'ambiente.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-xxxx&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Initalize-Milvus" class="common-anchor-header">Inizializzare Milvus<button data-href="#Initalize-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Importare i pacchetti e inizializzare l'istanza del database vettoriale Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> agno.agent <span class="hljs-keyword">import</span> Agent
<span class="hljs-keyword">from</span> agno.knowledge.pdf_url <span class="hljs-keyword">import</span> PDFUrlKnowledgeBase
<span class="hljs-keyword">from</span> agno.vectordb.milvus <span class="hljs-keyword">import</span> Milvus

<span class="hljs-comment"># Initialize Milvus</span>
vector_db = Milvus(
    collection=<span class="hljs-string">&quot;recipes&quot;</span>,
    uri=<span class="hljs-string">&quot;./milvus.db&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Specificare il nome della collezione, l'uri e il token (opzionale) per il server Milvus.</p>
<div class="alert note">
<p>Ecco come impostare l'uri e il token:</p>
<ul>
<li>Se si ha bisogno di un database vettoriale locale solo per dati su piccola scala o per la prototipazione, impostare l'uri come un file locale, ad esempio<code translate="no">./milvus.db</code>, è il metodo più conveniente, in quanto utilizza automaticamente <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> per memorizzare tutti i dati in questo file.</li>
<li>Se si dispone di una grande quantità di dati, ad esempio più di un milione di vettori, è possibile configurare un server Milvus più performante su <a href="https://milvus.io/docs/quickstart.md">Docker o Kubernetes</a>. In questa configurazione, utilizzare l'indirizzo e la porta del server come uri, ad esempio<code translate="no">http://localhost:19530</code>. Se si attiva la funzione di autenticazione su Milvus, utilizzare "<your_username>:<your_password>" come token, altrimenti non impostare il token.</li>
<li>Se si utilizza <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, il servizio cloud completamente gestito per Milvus, impostare <code translate="no">uri</code> e <code translate="no">token</code>, che corrispondono all'<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">endpoint pubblico e alla chiave API</a> di Zilliz Cloud.</li>
</ul>
</div>
<h2 id="Load-data" class="common-anchor-header">Caricare i dati<button data-href="#Load-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Creare un'istanza di base di PDF url knowledage e caricare i dati nell'istanza. Utilizziamo i dati pdf di una ricetta pubblica come esempio.</p>
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
<h2 id="Use-agent-to-response-to-a-question" class="common-anchor-header">Utilizzare l'agente per rispondere a una domanda<button data-href="#Use-agent-to-response-to-a-question" class="anchor-icon" translate="no">
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
    </button></h2><p>Integrare la base di conoscenza in un agente, in modo da poter porre una domanda all'agente e ottenere una risposta.</p>
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
<p>Congratulazioni, avete imparato le basi dell'uso di Milvus in Agno. Se volete saperne di più sull'uso di Agno, consultate la <a href="https://docs.agno.com/introduction">documentazione ufficiale</a>.</p>
