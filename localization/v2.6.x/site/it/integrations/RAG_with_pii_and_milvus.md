---
id: RAG_with_pii_and_milvus.md
summary: >-
  In questo tutorial vi mostreremo come costruire una pipeline RAG
  (Retrieval-Augmented Generation) con Milvus e PII Masker.
title: Costruire RAG con Milvus + PII Masker
---
<h1 id="Build-RAG-with-Milvus-+-PII-Masker" class="common-anchor-header">Costruire RAG con Milvus + PII Masker<button data-href="#Build-RAG-with-Milvus-+-PII-Masker" class="anchor-icon" translate="no">
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
    </button></h1><p>Le PII (Personally Identifiable Information) sono un tipo di dati sensibili che possono essere utilizzati per identificare le persone.</p>
<p><a href="https://github.com/HydroXai/pii-masker-v1/tree/main">PII Masker</a>, sviluppato da <a href="https://www.hydrox.ai/">HydroX AI</a>, è uno strumento open-source avanzato progettato per proteggere i vostri dati sensibili sfruttando modelli AI all'avanguardia. Che si tratti di gestire i dati dei clienti, di eseguire analisi dei dati o di garantire la conformità alle normative sulla privacy, PII Masker offre una soluzione robusta e scalabile per mantenere al sicuro le informazioni.</p>
<p>In questo tutorial mostreremo come utilizzare PII Masker con Milvus per proteggere i dati privati nelle applicazioni RAG (Retrieval-Augmented Generation). Combinando i punti di forza delle capacità di mascheramento dei dati di PII Masker con l'efficiente recupero dei dati di Milvus, è possibile creare pipeline sicure e conformi alla privacy per gestire le informazioni sensibili con fiducia. Questo approccio garantisce che le vostre applicazioni siano in grado di soddisfare gli standard di privacy e di proteggere efficacemente i dati degli utenti.</p>
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
    </button></h2><h3 id="Get-started-with-PII-Masker" class="common-anchor-header">Iniziare con PII Masker</h3><p>Seguite la <a href="https://github.com/HydroXai/pii-masker-v1/tree/main?tab=readme-ov-file#-installation">guida all'installazione</a> di PII Masker per installare le dipendenze necessarie e scaricare il modello. Ecco una semplice guida:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/HydroXai/pii-masker-v1.git</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">cd</span> pii-masker-v1/pii-masker</span>
<button class="copy-code-btn"></button></code></pre>
<p>Scaricare il modello da<code translate="no">https://huggingface.co/hydroxai/pii_model_weight</code>, e sostituirlo con i file in: <code translate="no">pii-masker/output_model/deberta3base_1024/</code></p>
<h3 id="Dependencies-and-Environment" class="common-anchor-header">Dipendenze e ambiente</h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus openai requests tqdm dataset</span>
<button class="copy-code-btn"></button></code></pre>
<p>In questo esempio utilizzeremo OpenAI come LLM. È necessario preparare la <a href="https://platform.openai.com/docs/quickstart">chiave api</a> <code translate="no">OPENAI_API_KEY</code> come variabile d'ambiente.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">export</span> OPENAI_API_KEY=sk-***********</span>
<button class="copy-code-btn"></button></code></pre>
<p>Quindi si può creare un notebook python o jupyter per eseguire il codice seguente.</p>
<h3 id="Prepare-the-data" class="common-anchor-header">Preparare i dati</h3><p>Generiamo alcune righe false che contengono informazioni PII a scopo di test o dimostrazione.</p>
<pre><code translate="no" class="language-python">text_lines = [
    <span class="hljs-string">&quot;Alice Johnson, a resident of Dublin, Ireland, attended a flower festival at Hyde Park on May 15, 2023. She entered the park at noon using her digital passport, number 23456789. Alice spent the afternoon admiring various flowers and plants, attending a gardening workshop, and having a light snack at one of the food stalls. While there, she met another visitor, Mr. Thompson, who was visiting from London. They exchanged tips on gardening and shared contact information: Mr. Thompson&#x27;s address was 492, Pine Lane, and his cell phone number was +018.221.431-4517. Alice gave her contact details: home address, Ranch 16&quot;</span>,
    <span class="hljs-string">&quot;Hiroshi Tanaka, a businessman from Tokyo, Japan, went to attend a tech expo at the Berlin Convention Center on November 10, 2023. He registered for the event at 9 AM using his digital passport, number Q-24567680. Hiroshi networked with industry professionals, participated in panel discussions, and had lunch with some potential partners. One of the partners he met was from Munich, and they decided to keep in touch: the partner&#x27;s office address was given as house No. 12, Road 7, Block E. Hiroshi offered his business card with the address, 654 Sakura Road, Tokyo.&quot;</span>,
    <span class="hljs-string">&quot;In an online forum discussion about culinary exchanges around the world, several participants shared their experiences. One user, Male, with the email 2022johndoe@example.com, shared his insights. He mentioned his ID code 1A2B3C4D5E and reference number L87654321 while residing in Italy but originally from Australia. He provided his +0-777-123-4567 and described his address at 456, Flavorful Lane, Pasta, IT, 00100.&quot;</span>,
    <span class="hljs-string">&quot;Another user joined the conversation on the topic of international volunteering opportunities. Identified as Female, she used the email 2023janedoe@example.com to share her story. She noted her 9876543210123 and M1234567890123 while residing in Germany but originally from Brazil. She provided her +0-333-987-6543 and described her address at 789, Sunny Side Street, Berlin, DE, 10178.&quot;</span>,
]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Mask-the-data-with-PIIMasker" class="common-anchor-header">Mascherare i dati con PIIMasker</h3><p>Inizializziamo l'oggetto PIIMasker e carichiamo il modello.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> model <span class="hljs-keyword">import</span> PIIMasker

masker = PIIMasker()
<button class="copy-code-btn"></button></code></pre>
<p>Quindi mascheriamo le PII da un elenco di righe di testo e stampiamo i risultati mascherati.</p>
<pre><code translate="no" class="language-python">masked_results = []
<span class="hljs-keyword">for</span> full_text <span class="hljs-keyword">in</span> text_lines:
    masked_text, _ = masker.mask_pii(full_text)
    masked_results.append(masked_text)

<span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> masked_results:
    <span class="hljs-built_in">print</span>(res + <span class="hljs-string">&quot;\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Alice [B-NAME] , a resident of Dublin Ireland attended flower festival at Hyde Park on May 15 2023 [B-PHONE_NUM] She entered the park noon using her digital passport number 23 [B-ID_NUM] [B-NAME] afternoon admiring various flowers and plants attending gardening workshop having light snack one food stalls While there she met another visitor Mr Thompson who was visiting from London They exchanged tips shared contact information : ' s address 492 [I-STREET_ADDRESS] his cell phone + [B-PHONE_NUM] [B-NAME] details home Ranch [B-STREET_ADDRESS]

Hiroshi [B-NAME] [I-STREET_ADDRESS] a businessman from Tokyo Japan went to attend tech expo at the Berlin Convention Center on November 10 2023 . He registered for event 9 AM using his digital passport number Q [B-ID_NUM] [B-NAME] with industry professionals participated in panel discussions and had lunch some potential partners One of he met was Munich they decided keep touch : partner ' s office address given as house No [I-STREET_ADDRESS] [B-NAME] business card 654 [B-STREET_ADDRESS]

In an online forum discussion about culinary exchanges around the world [I-STREET_ADDRESS] several participants shared their experiences [I-STREET_ADDRESS] One user Male with email 2022 [B-EMAIL] his insights He mentioned ID code 1 [B-ID_NUM] [I-PHONE_NUM] reference number L [B-ID_NUM] residing in Italy but originally from Australia provided + [B-PHONE_NUM] [I-PHONE_NUM] described address at 456 [I-STREET_ADDRESS]

Another user joined the conversation on topic of international volunteering opportunities . Identified as Female , she used email 2023 [B-EMAIL] share her story She noted 98 [B-ID_NUM] [I-PHONE_NUM] M [B-ID_NUM] residing in Germany but originally from Brazil provided + [B-PHONE_NUM] [I-PHONE_NUM] described address at 789 [I-STREET_ADDRESS] DE 10 178
</code></pre>
<h3 id="Prepare-the-Embedding-Model" class="common-anchor-header">Preparare il modello da incorporare</h3><p>Inizializziamo il client OpenAI per preparare il modello di incorporamento.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

openai_client = OpenAI()
<button class="copy-code-btn"></button></code></pre>
<p>Definiamo una funzione per generare embeddings di testo utilizzando il client OpenAI. Utilizziamo il modello <code translate="no">text-embedding-3-small</code> come esempio.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">emb_text</span>(<span class="hljs-params">text</span>):
    <span class="hljs-keyword">return</span> (
        openai_client.embeddings.create(<span class="hljs-built_in">input</span>=text, model=<span class="hljs-string">&quot;text-embedding-3-small&quot;</span>)
        .data[<span class="hljs-number">0</span>]
        .embedding
    )
<button class="copy-code-btn"></button></code></pre>
<p>Generare un embedding di prova e stamparne la dimensione e i primi elementi.</p>
<pre><code translate="no" class="language-python">test_embedding = emb_text(<span class="hljs-string">&quot;This is a test&quot;</span>)
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">1536
[0.009889289736747742, -0.005578675772994757, 0.00683477520942688, -0.03805781528353691, -0.01824733428657055, -0.04121600463986397, -0.007636285852640867, 0.03225184231996536, 0.018949154764413834, 9.352207416668534e-05]
</code></pre>
<h2 id="Load-data-into-Milvus" class="common-anchor-header">Caricare i dati in Milvus<button data-href="#Load-data-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-Collection" class="common-anchor-header">Creare la collezione</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Come per l'argomento di <code translate="no">MilvusClient</code>:</p>
<ul>
<li>Impostare <code translate="no">uri</code> come file locale, ad esempio<code translate="no">./milvus.db</code>, è il metodo più conveniente, poiché utilizza automaticamente <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> per memorizzare tutti i dati in questo file.</li>
<li>Se si dispone di una grande quantità di dati, ad esempio più di un milione di vettori, è possibile configurare un server Milvus più performante su <a href="https://milvus.io/docs/quickstart.md">Docker o Kubernetes</a>. In questa configurazione, utilizzare l'indirizzo e la porta del server come uri, ad esempio<code translate="no">http://localhost:19530</code>. Se si attiva la funzione di autenticazione su Milvus, utilizzare "<your_username>:<your_password>" come token, altrimenti non impostare il token.</li>
<li>Se si desidera utilizzare <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, il servizio cloud completamente gestito per Milvus, impostare <code translate="no">uri</code> e <code translate="no">token</code>, che corrispondono all'<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">endpoint pubblico e alla chiave Api</a> di Zilliz Cloud.</li>
</ul>
</div>
<p>Verificare se la raccolta esiste già e, in caso affermativo, eliminarla.</p>
<pre><code translate="no" class="language-python">collection_name = <span class="hljs-string">&quot;my_rag_collection&quot;</span>

<span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>Creare una nuova raccolta con i parametri specificati.</p>
<p>Se non si specifica alcun campo, Milvus creerà automaticamente un campo predefinito <code translate="no">id</code> per la chiave primaria e un campo <code translate="no">vector</code> per memorizzare i dati vettoriali. Un campo JSON riservato è usato per memorizzare campi non definiti dalla mappa e i loro valori.</p>
<pre><code translate="no" class="language-python">milvus_client.create_collection(
    collection_name=collection_name,
    dimension=embedding_dim,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data" class="common-anchor-header">Inserire i dati</h3><p>Si interviene sulle righe di testo mascherate, si creano le incorporazioni e si inseriscono i dati in Milvus.</p>
<p>Ecco un nuovo campo <code translate="no">text</code>, che è un campo non definito nello schema della collezione. Verrà aggiunto automaticamente al campo dinamico JSON riservato, che può essere trattato come un campo normale ad alto livello.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []

<span class="hljs-keyword">for</span> i, line <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(tqdm(masked_results, desc=<span class="hljs-string">&quot;Creating embeddings&quot;</span>)):
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: emb_text(line), <span class="hljs-string">&quot;text&quot;</span>: line})

milvus_client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Creating embeddings: 100%|██████████| 4/4 [00:01&lt;00:00,  2.60it/s]





{'insert_count': 4, 'ids': [0, 1, 2, 3], 'cost': 0}
</code></pre>
<h2 id="Build-RAG" class="common-anchor-header">Costruire la RAG<button data-href="#Build-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Retrieve-data-for-a-query" class="common-anchor-header">Recuperare i dati per una query</h3><p>Specifichiamo una domanda sui documenti.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;What was the office address of Hiroshi&#x27;s partner from Munich?&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Cerchiamo la domanda nella raccolta e recuperiamo la corrispondenza semantica top-1.</p>
<pre><code translate="no" class="language-python">search_res = milvus_client.search(
    collection_name=collection_name,
    data=[
        emb_text(question)
    ],  <span class="hljs-comment"># Use the `emb_text` function to convert the question to an embedding vector</span>
    limit=<span class="hljs-number">1</span>,  <span class="hljs-comment"># Return top 1 results</span>
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}},  <span class="hljs-comment"># Inner product distance</span>
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],  <span class="hljs-comment"># Return the text field</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Diamo un'occhiata ai risultati della ricerca della query</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json

retrieved_lines_with_distances = [
    (res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>], res[<span class="hljs-string">&quot;distance&quot;</span>]) <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> search_res[<span class="hljs-number">0</span>]
]
<span class="hljs-built_in">print</span>(json.dumps(retrieved_lines_with_distances, indent=<span class="hljs-number">4</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[
    [
        &quot;Hiroshi [B-NAME] [I-STREET_ADDRESS] a businessman from Tokyo Japan went to attend tech expo at the Berlin Convention Center on November 10 2023 . He registered for event 9 AM using his digital passport number Q [B-ID_NUM] [B-NAME] with industry professionals participated in panel discussions and had lunch some potential partners One of he met was Munich they decided keep touch : partner ' s office address given as house No [I-STREET_ADDRESS] [B-NAME] business card 654 [B-STREET_ADDRESS]&quot;,
        0.6544462442398071
    ]
]
</code></pre>
<h3 id="Use-LLM-to-get-a-RAG-response" class="common-anchor-header">Utilizzare LLM per ottenere una risposta RAG</h3><p>Convertire i documenti recuperati in un formato stringa.</p>
<pre><code translate="no" class="language-python">context = <span class="hljs-string">&quot;\n&quot;</span>.join(
    [line_with_distance[<span class="hljs-number">0</span>] <span class="hljs-keyword">for</span> line_with_distance <span class="hljs-keyword">in</span> retrieved_lines_with_distances]
)
<button class="copy-code-btn"></button></code></pre>
<p>Definire le richieste del sistema e dell'utente per il Lanage Model.</p>
<p>Nota: diciamo a LLM che se non ci sono informazioni utili negli snippet, basta dire "non lo so".</p>
<pre><code translate="no" class="language-python">SYSTEM_PROMPT = <span class="hljs-string">&quot;&quot;&quot;
Human: You are an AI assistant. You are able to find answers to the questions from the contextual passage snippets provided. If there are no useful information in the snippets, just say &quot;I don&#x27;t know&quot;.
AI:
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
<p>Utilizzare OpenAI ChatGPT per generare una risposta basata sui prompt.</p>
<pre><code translate="no" class="language-python">response = openai_client.chat.completions.create(
    model=<span class="hljs-string">&quot;gpt-4o-mini&quot;</span>,
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: SYSTEM_PROMPT},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: USER_PROMPT},
    ],
)
<span class="hljs-built_in">print</span>(response.choices[<span class="hljs-number">0</span>].message.content)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">I don't know.
</code></pre>
<p>Qui possiamo vedere che, poiché abbiamo sostituito le PII con delle maschere, l'LLM non può ottenere le informazioni PII nel contesto. Quindi risponde: "In questo modo, possiamo proteggere efficacemente la privacy degli utenti.</p>
