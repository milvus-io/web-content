---
id: integrate_with_phidata.md
title: Integrieren Sie Milvus mit Phidata
summary: >-
  Diese Seite befasst sich mit der Integration von Vektordatenbanken in Phidata,
  einem leistungsstarken Framework für den Aufbau intelligenter Agenten und
  Arbeitsabläufe.
---
<h1 id="Integrate-Milvus-with-Phidata" class="common-anchor-header">Integrieren Sie Milvus mit Phidata<button data-href="#Integrate-Milvus-with-Phidata" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/phidatahq/phidata/tree/main">Phidata</a> ist ein leistungsfähiges Framework für die Entwicklung intelligenter Agenten und Workflows. Es ermöglicht Ihnen, multimodale Agenten zu erstellen, die Text, Bilder, Audio und Video verstehen und verschiedene Tools und Wissensquellen nutzen können, um komplexe Aufgaben zu bewältigen. Phidata unterstützt die Orchestrierung mehrerer Agenten und ermöglicht es Teams von Agenten, zusammenzuarbeiten und Probleme gemeinsam zu lösen. Es bietet auch eine schöne Agenten-UI für die Interaktion mit Ihren Agenten.</p>
<p>Die Vektordatenbank Milvus ermöglicht die effiziente Speicherung und Abfrage von Informationen in Form von Einbettungen. Mit Milvus und Phidata können Sie Ihr Wissen einfach in Ihre Agenten-Workflows integrieren. Dieses Dokument ist ein grundlegender Leitfaden für die Verwendung der Milvus-Integration mit Phidata.</p>
<h2 id="Preparation" class="common-anchor-header">Vorbereitung<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><p>Installieren Sie die notwendigen Abhängigkeiten:</p>
<pre><code translate="no" class="language-shell">$ pip install --upgrade phidata pymilvus openai
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Wenn Sie Google Colab verwenden, müssen Sie möglicherweise <strong>die Runtime neu starten</strong>, um die soeben installierten Abhängigkeiten zu aktivieren (klicken Sie auf das Menü "Runtime" am oberen Bildschirmrand und wählen Sie "Restart session" aus dem Dropdown-Menü).</p>
</div>
<p>Wir werden in diesem Beispiel OpenAI als LLM verwenden. Sie sollten den <a href="https://platform.openai.com/docs/quickstart">Api-Schlüssel</a> <code translate="no">OPENAI_API_KEY</code> als Umgebungsvariable vorbereiten.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Initalize-Milvus" class="common-anchor-header">Milvus initialisieren<button data-href="#Initalize-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Importieren Sie die Pakete und initialisieren Sie die Milvus-Vektor-Datenbankinstanz.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> phi.agent <span class="hljs-keyword">import</span> Agent
<span class="hljs-keyword">from</span> phi.knowledge.pdf <span class="hljs-keyword">import</span> PDFUrlKnowledgeBase
<span class="hljs-keyword">from</span> phi.vectordb.milvus <span class="hljs-keyword">import</span> Milvus

<span class="hljs-comment"># Initialize Milvus</span>
vector_db = Milvus(
    collection=<span class="hljs-string">&quot;recipes&quot;</span>,
    uri=<span class="hljs-string">&quot;./milvus.db&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Geben Sie den Sammlungsnamen, die uri und das Token(optinal) für Ihren Milvus-Server an.</p>
<p>Hier sehen Sie, wie Sie die uri und das Token festlegen:</p>
<ul>
<li><p>Wenn Sie nur eine lokale Vektordatenbank für kleine Datenmengen oder Prototypen benötigen, ist es am bequemsten, wenn Sie als uri eine lokale Datei angeben, z. B.<code translate="no">./milvus.db</code>, da <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> dann automatisch alle Daten in dieser Datei speichert.</p></li>
<li><p>Wenn Sie große Datenmengen haben, z. B. mehr als eine Million Vektoren, können Sie einen leistungsfähigeren Milvus-Server auf <a href="https://milvus.io/docs/quickstart.md">Docker oder Kubernetes</a> einrichten. Bei dieser Einrichtung verwenden Sie bitte die Serveradresse und den Port als Uri, z. B.<code translate="no">http://localhost:19530</code>. Wenn Sie die Authentifizierungsfunktion auf Milvus aktivieren, verwenden Sie "&lt;Ihr_Benutzername&gt;:&lt;Ihr_Passwort&gt;" als Token, andernfalls setzen Sie das Token nicht.</p></li>
<li><p>Wenn Sie <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, den vollständig verwalteten Cloud-Dienst für Milvus, verwenden, passen Sie <code translate="no">uri</code> und <code translate="no">token</code> an, die dem <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">öffentlichen Endpunkt und dem API-Schlüssel</a> in Zilliz Cloud entsprechen.</p></li>
</ul>
<h2 id="Load-data" class="common-anchor-header">Daten laden<button data-href="#Load-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Erstellen Sie eine Basisinstanz von PDF url knowledage und laden Sie die Daten in die Instanz. Wir verwenden die PDF-Daten eines öffentlichen Rezepts als Beispiel.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create knowledge base</span>
knowledge_base = PDFUrlKnowledgeBase(
    urls=[<span class="hljs-string">&quot;https://phi-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf&quot;</span>],
    vector_db=vector_db,
)

knowledge_base.load(recreate=<span class="hljs-literal">False</span>)  <span class="hljs-comment"># Comment out after first run</span>
<button class="copy-code-btn"></button></code></pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace"><span style="color: #000080; text-decoration-color: #000080">INFO </span> Erstellen der Sammlung</pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace"><span style="color: #000080; text-decoration-color: #000080">INFO </span> Laden der Wissensdatenbank</pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace"><span style="color: #000080; text-decoration-color: #000080">INFO </span> Lesen: <span style="color: #0000ff; text-decoration-color: #0000ff; text-decoration: underline">https:</span> //phi-public.s3.amazonaws.com/recipes/ThaiRecipes.pdf</pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace"><span style="color: #000080; text-decoration-color: #000080">INFO </span> <span style="color: #008080; text-decoration-color: #008080; font-weight: bold">0</span> Dokumente zur Wissensdatenbank hinzugefügt</pre>
<h2 id="Use-agent-to-response-to-a-question" class="common-anchor-header">Agenten als Antwort auf eine Frage verwenden<button data-href="#Use-agent-to-response-to-a-question" class="anchor-icon" translate="no">
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
    </button></h2><p>Integrieren Sie die Wissensdatenbank in einen Agenten, dann können wir dem Agenten eine Frage stellen und eine Antwort erhalten.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create and use the agent</span>
agent = Agent(knowledge_base=knowledge_base, use_tools=<span class="hljs-literal">True</span>, show_tool_calls=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Query the agent</span>
agent.print_response(<span class="hljs-string">&quot;How to make Tom Kha Gai&quot;</span>, markdown=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Output()
</code></pre>
<pre style="white-space:pre;overflow-x:auto;line-height:normal;font-family:Menlo,'DejaVu Sans Mono',consolas,'Courier New',monospace"></pre>
<pre><code translate="no">    ┏━ Message ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
    ┃                                                                                                       ┃
    ┃ How to make Tom Kha Gai                                                                               ┃
    ┃                                                                                                       ┃
    ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
    ┏━ Response (6.9s) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
    ┃                                                                                                       ┃
    ┃ Running:                                                                                              ┃
    ┃                                                                                                       ┃
    ┃  • search_knowledge_base(query=Tom Kha Gai recipe)                                                    ┃
    ┃                                                                                                       ┃
    ┃ Here's a recipe for Tom Kha Gai, a delicious Thai chicken and galangal soup made with coconut milk:   ┃
    ┃                                                                                                       ┃
    ┃ Ingredients (One serving):                                                                            ┃
    ┃                                                                                                       ┃
    ┃  • 150 grams chicken, cut into bite-size pieces                                                       ┃
    ┃  • 50 grams sliced young galangal                                                                     ┃
    ┃  • 100 grams lightly crushed lemongrass, julienned                                                    ┃
    ┃  • 100 grams straw mushrooms                                                                          ┃
    ┃  • 250 grams coconut milk                                                                             ┃
    ┃  • 100 grams chicken stock                                                                            ┃
    ┃  • 3 tbsp lime juice                                                                                  ┃
    ┃  • 3 tbsp fish sauce                                                                                  ┃
    ┃  • 2 leaves kaffir lime, shredded                                                                     ┃
    ┃  • 1-2 bird’s eye chilies, pounded                                                                    ┃
    ┃  • 3 leaves coriander                                                                                 ┃
    ┃                                                                                                       ┃
    ┃ Directions:                                                                                           ┃
    ┃                                                                                                       ┃
    ┃  1 Bring the chicken stock and coconut milk to a slow boil.                                           ┃
    ┃  2 Add galangal, lemongrass, chicken, and mushrooms. Once the soup returns to a boil, season it with f┃
    ┃  3 Wait until the chicken is cooked, then add the kaffir lime leaves and bird’s eye chilies.          ┃
    ┃  4 Remove the pot from heat and add lime juice.                                                       ┃
    ┃  5 Garnish with coriander leaves.                                                                     ┃
    ┃                                                                                                       ┃
    ┃ Tips:                                                                                                 ┃
    ┃                                                                                                       ┃
    ┃  • Keep the heat low throughout the cooking process to prevent the oil in the coconut milk from separ ┃
    ┃  • If using mature galangal, reduce the amount.                                                       ┃
    ┃  • Adding lime juice after removing the pot from heat makes it more aromatic.                         ┃
    ┃  • Reduce the number of chilies for a milder taste.                                                   ┃
    ┃                                                                                                       ┃
    ┃ Enjoy making and savoring this flavorful Thai soup!                                                   ┃
    ┃                                                                                                       ┃
    ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
</code></pre>
<p>Glückwunsch, Sie haben die Grundlagen der Verwendung von Milvus in Phidata gelernt. Wenn Sie mehr über die Verwendung von Phidata wissen wollen, lesen Sie bitte die <a href="https://docs.phidata.com/introduction">offizielle Dokumentation</a>.</p>
