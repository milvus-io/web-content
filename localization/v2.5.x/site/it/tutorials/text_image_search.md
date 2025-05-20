---
id: text_image_search.md
summary: >-
  In questa esercitazione esploreremo come implementare il recupero di immagini
  basato sul testo utilizzando il modello CLIP (Contrastive Language-Image
  Pretraining) di OpenAI e Milvus. Genereremo le incorporazioni delle immagini
  con CLIP, le memorizzeremo in Milvus ed eseguiremo efficienti ricerche di
  somiglianza.
title: Ricerca da testo a immagine con Milvus
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/text_image_search_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/text_image_search_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Text-to-Image-Search-with-Milvus" class="common-anchor-header">Ricerca da testo a immagine con Milvus<button data-href="#Text-to-Image-Search-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>La ricerca da testo a immagine è una tecnologia avanzata che consente agli utenti di cercare immagini utilizzando descrizioni testuali in linguaggio naturale. Sfrutta un modello multimodale preaddestrato per convertire sia il testo che le immagini in incorporazioni in uno spazio semantico condiviso, consentendo confronti basati sulla somiglianza.</p>
<p>In questa esercitazione esploreremo come implementare il recupero di immagini basato sul testo utilizzando il modello CLIP (Contrastive Language-Image Pretraining) di OpenAI e Milvus. Genereremo embeddings di immagini con CLIP, li memorizzeremo in Milvus ed eseguiremo ricerche di similarità efficienti.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisiti<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Prima di iniziare, assicuratevi di avere pronti tutti i pacchetti necessari e i dati di esempio.</p>
<h3 id="Install-dependencies" class="common-anchor-header">Installare le dipendenze</h3><ul>
<li><strong>pymilvus&gt;=2.4.2</strong> per interagire con il database di Milvus</li>
<li><strong>clip</strong> per lavorare con il modello CLIP</li>
<li><strong>pillow</strong> per l'elaborazione e la visualizzazione delle immagini</li>
</ul>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus pillow</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install git+https://github.com/openai/CLIP.git</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Se si utilizza Google Colab, potrebbe essere necessario <strong>riavviare il runtime</strong> (andare al menu "Runtime" nella parte superiore dell'interfaccia e selezionare "Restart session" dal menu a discesa).</p>
</div>
<h3 id="Download-example-data" class="common-anchor-header">Scaricare i dati di esempio</h3><p>Utilizzeremo un sottoinsieme del dataset <a href="https://www.image-net.org">ImageNet</a> (100 classi, 10 immagini per ogni classe) come immagini di esempio. Il comando seguente scarica i dati di esempio e li estrae nella cartella locale <code translate="no">./images_folder</code>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/towhee-io/examples/releases/download/data/reverse_image_search.zip</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">unzip -q reverse_image_search.zip -d images_folder</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-up-Milvus" class="common-anchor-header">Configurare Milvus</h3><p>Prima di procedere, configurare il server Milvus e connettersi utilizzando il proprio URI (e, facoltativamente, un token):</p>
<ul>
<li><p><strong>Milvus Lite (consigliato per comodità)</strong>: Impostare l'URI su un file locale, come ./milvus.db. In questo modo si sfrutta automaticamente <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> per memorizzare tutti i dati in un unico file.</p></li>
<li><p><strong>Docker o Kubernetes (per dati su larga scala)</strong>: Per gestire insiemi di dati più grandi, distribuire un server Milvus più performante utilizzando <a href="https://milvus.io/docs/quickstart.md">Docker o Kubernetes</a>. In questo caso, per connettersi utilizzare l'URI del server, ad esempio http://localhost:19530.</p></li>
<li><p><strong>Zilliz Cloud (servizio gestito)</strong>: Se si utilizza <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, il servizio cloud completamente gestito da Milvus, impostare l'Endpoint pubblico come URI e la Chiave API come token.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;milvus.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Getting-Started" class="common-anchor-header">Iniziare<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><p>Ora che si dispone delle dipendenze e dei dati necessari, è il momento di impostare gli estrattori di funzioni e iniziare a lavorare con Milvus. Questa sezione illustra le fasi principali della costruzione di un sistema di ricerca da testo a immagine. Infine, dimostreremo come recuperare e visualizzare le immagini in base alle query di testo.</p>
<h3 id="Define-feature-extractors" class="common-anchor-header">Definire gli estrattori di caratteristiche</h3><p>Utilizzeremo un modello CLIP preaddestrato per generare embeddings di immagini e testo. In questa sezione, carichiamo la variante preaddestrata <strong>ViT-B/32</strong> di CLIP e definiamo le funzioni di aiuto per la codifica di immagini e testo:</p>
<ul>
<li><code translate="no">encode_image(image_path)</code>: elabora e codifica le immagini in vettori di caratteristiche</li>
<li><code translate="no">encode_text(text)</code>: Codifica le query di testo in vettori di caratteristiche</li>
</ul>
<p>Entrambe le funzioni normalizzano le caratteristiche in uscita per garantire confronti coerenti, convertendo i vettori in vettori di lunghezza unitaria, essenziali per un calcolo accurato della similarità del coseno.</p>
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
<h3 id="Data-Ingestion" class="common-anchor-header">Ingestione dei dati</h3><p>Per consentire la ricerca semantica delle immagini, dobbiamo innanzitutto generare le incorporazioni per tutte le immagini e memorizzarle in un database vettoriale per un'indicizzazione e un recupero efficienti. Questa sezione fornisce una guida passo passo per l'inserimento dei dati delle immagini in Milvus.</p>
<p><strong>1. Creare la raccolta Milvus</strong></p>
<p>Prima di memorizzare le incorporazioni di immagini, è necessario creare una raccolta Milvus. Il codice seguente mostra come creare una raccolta in modalità rapida con il tipo di metrica predefinito COSINE. La collezione comprende i seguenti campi:</p>
<ul>
<li><p><code translate="no">id</code>: Un campo primario con ID automatico abilitato.</p></li>
<li><p><code translate="no">vector</code>: Un campo per memorizzare le incorporazioni vettoriali in virgola mobile.</p></li>
</ul>
<p>Se si desidera uno schema personalizzato, consultare la <a href="https://milvus.io/docs/create-collection.md">documentazione</a> di <a href="https://milvus.io/docs/create-collection.md">Milvus</a> per istruzioni dettagliate.</p>
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
<p><strong>2. Inserire i dati in Milvus</strong></p>
<p>In questa fase, si utilizza un codificatore di immagini predefinito per generare le incorporazioni di tutte le immagini JPEG presenti nella directory dei dati di esempio. Questi embeddings vengono poi inseriti nella raccolta di Milvus, insieme ai percorsi dei file corrispondenti. Ogni voce della raccolta è composta da:</p>
<ul>
<li><strong>Vettore di incorporazione</strong>: La rappresentazione numerica dell'immagine. Memorizzato nel campo <code translate="no">vector</code>.</li>
<li><strong>Percorso del file</strong>: La posizione del file dell'immagine come riferimento. Memorizzato nel campo <code translate="no">filepath</code> come campo dinamico.</li>
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
<h3 id="Peform-a-Search" class="common-anchor-header">Eseguire una ricerca</h3><p>Eseguiamo ora una ricerca utilizzando una query di testo di esempio. In questo modo verranno recuperate le immagini più rilevanti in base alla loro somiglianza semantica con la descrizione testuale fornita.</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;a white dog&quot;</span>
query_embedding = encode_text(query_text)

search_results = milvus_client.search(
    collection_name=collection_name,
    data=[query_embedding],
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># return top 10 results</span>
    output_fields=[<span class="hljs-string">&quot;filepath&quot;</span>],  <span class="hljs-comment"># return the filepath field</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Visualizzare i risultati:</p>
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
