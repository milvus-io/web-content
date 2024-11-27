---
id: build_rag_on_arm.md
summary: >-
  In questa esercitazione si apprende come costruire un'applicazione di
  Retrieval-Augmented Generation (RAG) su infrastrutture basate su Arm. Per
  l'archiviazione vettoriale, utilizziamo Zilliz Cloud, il database vettoriale
  Milvus completamente gestito. Zilliz Cloud è disponibile sui principali cloud
  come AWS, GCP e Azure. In questa demo utilizziamo Zilliz Cloud distribuito su
  AWS con macchine Arm. Per LLM, utilizziamo il modello Llama-3.1-8B sulla CPU
  del server AWS Arm utilizzando llama.cpp.
title: Costruire RAG su architettura Arm
---
<h1 id="Build-RAG-on-Arm-Architecture" class="common-anchor-header">Costruire RAG su architettura Arm<button data-href="#Build-RAG-on-Arm-Architecture" class="anchor-icon" translate="no">
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
    </button></h1><p>Le CPU<a href="https://www.arm.com/">Arm</a> sono ampiamente utilizzate in un'ampia gamma di applicazioni, compresi i casi d'uso tradizionali di machine learning (ML) e intelligenza artificiale (AI).</p>
<p>In questo tutorial, imparerete a costruire un'applicazione di Retrieval-Augmented Generation (RAG) su infrastrutture basate su Arm. Per l'archiviazione vettoriale, utilizziamo <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, il database vettoriale Milvus completamente gestito. Zilliz Cloud è disponibile sui principali cloud come AWS, GCP e Azure. In questa demo utilizziamo Zilliz Cloud distribuito su AWS con macchine Arm. Per l'LLM, utilizziamo il modello <code translate="no">Llama-3.1-8B</code> sulla CPU del server AWS Arm utilizzando <code translate="no">llama.cpp</code>.</p>
<h2 id="Prerequisite" class="common-anchor-header">Prerequisiti<button data-href="#Prerequisite" class="anchor-icon" translate="no">
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
    </button></h2><p>Per eseguire questo esempio, si consiglia di utilizzare <a href="https://aws.amazon.com/ec2/graviton/">AWS Graviton</a>, che offre un modo economico per eseguire carichi di lavoro ML su server basati su Arm. Questo notebook è stato testato su un'istanza AWS Graviton3 <code translate="no">c7g.2xlarge</code> con sistema Ubuntu 22.04 LTS.</p>
<p>Per eseguire questo esempio sono necessari almeno quattro core e 8 GB di RAM. Configurare l'archiviazione su disco fino ad almeno 32 GB. Si consiglia di utilizzare un'istanza con specifiche uguali o migliori.</p>
<p>Dopo aver avviato l'istanza, collegarsi ad essa ed eseguire i seguenti comandi per preparare l'ambiente.</p>
<p>Installare python sul server:</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">sudo</span> apt update
$ <span class="hljs-built_in">sudo</span> apt install python-is-python3 python3-pip python3-venv -y
<button class="copy-code-btn"></button></code></pre>
<p>Creare e attivare un ambiente virtuale:</p>
<pre><code translate="no" class="language-bash">$ python -m venv venv
$ <span class="hljs-built_in">source</span> venv/bin/activate
<button class="copy-code-btn"></button></code></pre>
<p>Installare le dipendenze python necessarie:</p>
<pre><code translate="no" class="language-shell">$ pip install --upgrade pymilvus openai requests langchain-huggingface huggingface_hub tqdm
<button class="copy-code-btn"></button></code></pre>
<h2 id="Offline-Data-Loading" class="common-anchor-header">Caricamento dei dati offline<button data-href="#Offline-Data-Loading" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-Collection" class="common-anchor-header">Creare la raccolta</h3><p>Utilizziamo <a href="https://zilliz.com/cloud">Zilliz Cloud</a> distribuito su AWS con macchine basate su Arm per memorizzare e recuperare i dati vettoriali. Per iniziare rapidamente, è sufficiente <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">registrare</a> gratuitamente <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">un account</a> su Zilliz Cloud.</p>
<div class="alert note">
<p>Oltre a Zilliz Cloud, anche Milvus self-hosted è un'opzione (più complicata da configurare). Possiamo anche distribuire <a href="https://milvus.io/docs/install_standalone-docker-compose.md">Milvus Standalone</a> e <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes</a> su macchine basate su ARM. Per ulteriori informazioni sull'installazione di Milvus, consultare la <a href="https://milvus.io/docs/install-overview.md">documentazione di installazione</a>.</p>
</div>
<p>Impostiamo <code translate="no">uri</code> e <code translate="no">token</code> come <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Endpoint pubblico e chiave Api</a> in Zilliz Cloud.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>

milvus_client = <span class="hljs-title class_">MilvusClient</span>(
    uri=<span class="hljs-string">&quot;&lt;your_zilliz_public_endpoint&gt;&quot;</span>, token=<span class="hljs-string">&quot;&lt;your_zilliz_api_key&gt;&quot;</span>
)

collection_name = <span class="hljs-string">&quot;my_rag_collection&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<p>Verificare se la raccolta esiste già e, in caso affermativo, eliminarla.</p>
<pre><code translate="no" class="language-python">if milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>Creare una nuova raccolta con i parametri specificati.</p>
<p>Se non si specifica alcun campo, Milvus creerà automaticamente un campo predefinito <code translate="no">id</code> per la chiave primaria e un campo <code translate="no">vector</code> per memorizzare i dati vettoriali. Un campo JSON riservato è usato per memorizzare campi non definiti da schemi e i loro valori.</p>
<pre><code translate="no" class="language-python">milvus_client.create_collection(
    collection_name=collection_name,
    dimension=<span class="hljs-number">384</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Strong consistency level</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Il tipo di metrica predefinito è la distanza del prodotto interno. Per ulteriori informazioni sui tipi di distanza, consultare la <a href="https://milvus.io/docs/metric.md?tab=floating">pagina Metriche di somiglianza</a>.</p>
<h3 id="Prepare-the-data" class="common-anchor-header">Preparare i dati</h3><p>Per il nostro RAG utilizziamo le pagine FAQ della <a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">Documentazione Milvus 2.4.x</a> come conoscenza privata, che è una buona fonte di dati per una semplice pipeline RAG.</p>
<p>Scaricare il file zip ed estrarre i documenti nella cartella <code translate="no">milvus_docs</code>.</p>
<pre><code translate="no" class="language-shell">$ wget https://github.com/milvus-io/milvus-docs/releases/download/v2<span class="hljs-number">.4</span><span class="hljs-number">.6</span>-preview/milvus_docs_2<span class="hljs-number">.4</span>.x_en.<span class="hljs-built_in">zip</span>
$ unzip -q milvus_docs_2<span class="hljs-number">.4</span>.x_en.<span class="hljs-built_in">zip</span> -d milvus_docs
<button class="copy-code-btn"></button></code></pre>
<p>Carichiamo tutti i file markdown dalla cartella <code translate="no">milvus_docs/en/faq</code>. Per ogni documento, usiamo semplicemente &quot;# &quot; per separare il contenuto del file, che può separare approssimativamente il contenuto di ogni parte principale del file markdown.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []

<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()

    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data" class="common-anchor-header">Inserire i dati</h3><p>Prepariamo un modello di embedding semplice ma efficiente <a href="https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2">, all-MiniLM-L6-v2</a>, in grado di convertire il testo in vettori di embedding.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_huggingface <span class="hljs-keyword">import</span> <span class="hljs-title class_">HuggingFaceEmbeddings</span>

embedding_model = <span class="hljs-title class_">HuggingFaceEmbeddings</span>(model_name=<span class="hljs-string">&quot;all-MiniLM-L6-v2&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Intervistiamo le righe di testo, creiamo gli embedding e poi inseriamo i dati in Milvus.</p>
<p>Ecco un nuovo campo <code translate="no">text</code>, che è un campo non definito nello schema della raccolta. Verrà aggiunto automaticamente al campo dinamico JSON riservato, che può essere trattato come un campo normale ad alto livello.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []

text_embeddings = embedding_model.embed_documents(text_lines)

<span class="hljs-keyword">for</span> i, (line, embedding) <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(
    tqdm(<span class="hljs-built_in">zip</span>(text_lines, text_embeddings), desc=<span class="hljs-string">&quot;Creating embeddings&quot;</span>)
):
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: embedding, <span class="hljs-string">&quot;text&quot;</span>: line})

milvus_client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Creating embeddings: 100%|███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 72/72 [00:18&lt;00:00,  3.91it/s]
</code></pre>
<h2 id="Launch-LLM-Service-on-Arm" class="common-anchor-header">Avvio del servizio LLM su Arm<button data-href="#Launch-LLM-Service-on-Arm" class="anchor-icon" translate="no">
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
    </button></h2><p>In questa sezione, costruiremo e lanceremo il servizio <code translate="no">llama.cpp</code> sulla CPU basata su Arm.</p>
<h3 id="Llama-31-model--llamacpp" class="common-anchor-header">Modello Llama 3.1 e llama.cpp</h3><p>Il <a href="https://huggingface.co/cognitivecomputations/dolphin-2.9.4-llama3.1-8b-gguf">modello Llama-3.1-8B</a> di Meta appartiene alla famiglia dei modelli Llama 3.1 ed è libero di essere utilizzato per scopi di ricerca e commerciali. Prima di utilizzare il modello, visitare il <a href="https://llama.meta.com/llama-downloads/">sito web</a> di Llama e compilare il modulo per richiedere l'accesso.</p>
<p><a href="https://github.com/ggerganov/llama.cpp">llama.cpp</a> è un progetto open source in C/C++ che consente un'inferenza LLM efficiente su una varietà di hardware, sia a livello locale che nel cloud. È possibile ospitare comodamente un modello Llama 3.1 utilizzando <code translate="no">llama.cpp</code>.</p>
<h3 id="Download-and-build-llamacpp" class="common-anchor-header">Scaricare e compilare llama.cpp</h3><p>Eseguite i seguenti comandi per installare make, cmake, gcc, g++ e altri strumenti essenziali necessari per costruire llama.cpp dai sorgenti:</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">sudo</span> apt install make cmake -y
$ <span class="hljs-built_in">sudo</span> apt install gcc g++ -y
$ <span class="hljs-built_in">sudo</span> apt install build-essential -y
<button class="copy-code-btn"></button></code></pre>
<p>Ora si è pronti per iniziare a compilare <code translate="no">llama.cpp</code>.</p>
<p>Clonare il repository dei sorgenti di llama.cpp:</p>
<pre><code translate="no" class="language-bash">$ git <span class="hljs-built_in">clone</span> https://github.com/ggerganov/llama.cpp
<button class="copy-code-btn"></button></code></pre>
<p>Per impostazione predefinita, <code translate="no">llama.cpp</code> viene compilato solo per la CPU su Linux e Windows. Non è necessario fornire alcuno switch aggiuntivo per compilarlo per la CPU Arm su cui viene eseguito.</p>
<p>Eseguire <code translate="no">make</code> per compilarlo:</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">cd</span> llama.cpp
$ make GGML_NO_LLAMAFILE=1 -j$(<span class="hljs-built_in">nproc</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Verificare che <code translate="no">llama.cpp</code> sia stato compilato correttamente eseguendo il comando help:</p>
<pre><code translate="no" class="language-bash">$ ./llama-cli -h
<button class="copy-code-btn"></button></code></pre>
<p>Se <code translate="no">llama.cpp</code> è stato compilato correttamente, verrà visualizzata l'opzione help. Lo snippet di output appare come questo:</p>
<pre><code translate="no">example usage:

    text generation:     ./llama-cli -m your_model.gguf -p &quot;I believe the meaning of life is&quot; -n 128

    chat (conversation): ./llama-cli -m your_model.gguf -p &quot;You are a helpful assistant&quot; -cnv
</code></pre>
<p>È ora possibile scaricare il modello utilizzando il client huggingface:</p>
<pre><code translate="no" class="language-bash">$ huggingface-cli download cognitivecomputations/dolphin-<span class="hljs-number">2.9</span><span class="hljs-number">.4</span>-llama3<span class="hljs-number">.1</span>-8b-gguf dolphin-<span class="hljs-number">2.9</span><span class="hljs-number">.4</span>-llama3<span class="hljs-number">.1</span>-8b-Q4_0.gguf --local-<span class="hljs-built_in">dir</span> . --local-<span class="hljs-built_in">dir</span>-use-symlinks <span class="hljs-literal">False</span>
<button class="copy-code-btn"></button></code></pre>
<p>Il formato del modello GGUF, introdotto dal team di llama.cpp, utilizza la compressione e la quantizzazione per ridurre la precisione dei pesi a interi a 4 bit, riducendo in modo significativo i requisiti di calcolo e di memoria e rendendo le CPU Arm efficaci per l'inferenza LLM.</p>
<h3 id="Re-quantize-the-model-weights" class="common-anchor-header">Riquantizzare i pesi del modello</h3><p>Per riquantizzare, eseguire</p>
<pre><code translate="no" class="language-bash">$ ./llama-quantize --allow-requantize dolphin-2.9.4-llama3.1-8b-Q4_0.gguf dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf Q4_0_8_8
<button class="copy-code-btn"></button></code></pre>
<p>Si otterrà un nuovo file, <code translate="no">dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf</code>, che contiene i pesi riconfigurati che consentono a <code translate="no">llama-cli</code> di utilizzare SVE 256 e il supporto MATMUL_INT8.</p>
<div class="alert note">
<p>Questa riquantizzazione è ottimale specificamente per Graviton3. Per Graviton2, la riquantizzazione ottimale dovrebbe essere eseguita nel formato <code translate="no">Q4_0_4_4</code> e per Graviton4, il formato <code translate="no">Q4_0_4_8</code> è il più adatto per la riquantizzazione.</p>
</div>
<h3 id="Start-the-LLM-Service" class="common-anchor-header">Avviare il servizio LLM</h3><p>È possibile utilizzare il programma server llama.cpp e inviare richieste tramite un'API compatibile con OpenAI. Ciò consente di sviluppare applicazioni che interagiscono con l'LLM più volte senza doverlo avviare e arrestare ripetutamente. Inoltre, è possibile accedere al server da un'altra macchina in cui l'LLM è ospitato in rete.</p>
<p>Avviando il server dalla riga di comando, esso si mette in ascolto sulla porta 8080:</p>
<pre><code translate="no" class="language-shell">$ ./llama-server -m dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf -n 2048 -t 64 -c 65536  --port 8080
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'main: server is listening on 127.0.0.1:8080 - starting the main loop
</code></pre>
<p>È inoltre possibile regolare i parametri dell'LLM avviato per adattarlo all'hardware del server e ottenere prestazioni ottimali. Per ulteriori informazioni sui parametri, consultare il comando <code translate="no">llama-server --help</code>.</p>
<p>Se avete difficoltà a eseguire questo passaggio, potete consultare i <a href="https://learn.arm.com/learning-paths/servers-and-cloud-computing/llama-cpu/llama-chatbot/">documenti ufficiali</a> per ulteriori informazioni.</p>
<p>È stato avviato il servizio LLM sulla CPU basata su Arm. Ora interagiamo direttamente con il servizio utilizzando l'SDK OpenAI.</p>
<h2 id="Online-RAG" class="common-anchor-header">RAG online<button data-href="#Online-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="LLM-Client-and-Embedding-Model" class="common-anchor-header">Client LLM e modello di incorporazione</h3><p>Inizializziamo il client LLM e prepariamo il modello di embedding.</p>
<p>Per il LLM, utilizziamo l'OpenAI SDK per richiedere il servizio Llama lanciato in precedenza. Non è necessario utilizzare alcuna chiave API perché si tratta del nostro servizio locale llama.cpp.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> <span class="hljs-title class_">OpenAI</span>

llm_client = <span class="hljs-title class_">OpenAI</span>(base_url=<span class="hljs-string">&quot;http://localhost:8080/v1&quot;</span>, api_key=<span class="hljs-string">&quot;no-key&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Generiamo un embedding di prova e stampiamo la sua dimensione e i primi elementi.</p>
<pre><code translate="no" class="language-python">test_embedding = embedding_model.embed_query(<span class="hljs-string">&quot;This is a test&quot;</span>)
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">384
[0.03061249852180481, 0.013831384479999542, -0.02084377221763134, 0.016327863559126854, -0.010231520049273968, -0.0479842908680439, -0.017313342541456223, 0.03728749603033066, 0.04588735103607178, 0.034405000507831573]
</code></pre>
<h3 id="Retrieve-data-for-a-query" class="common-anchor-header">Recuperare i dati per una query</h3><p>Specifichiamo una domanda frequente su Milvus.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Cerchiamo la domanda nell'insieme e recuperiamo le prime tre corrispondenze semantiche.</p>
<pre><code translate="no" class="language-python">search_res = milvus_client.search(
    collection_name=collection_name,
    data=[
        embedding_model.embed_query(question)
    ],  <span class="hljs-comment"># Use the `emb_text` function to convert the question to an embedding vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># Return top 3 results</span>
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}},  <span class="hljs-comment"># Inner product distance</span>
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],  <span class="hljs-comment"># Return the text field</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Diamo un'occhiata ai risultati della ricerca della domanda</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json

retrieved_lines_with_distances = [
    (res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>], res[<span class="hljs-string">&quot;distance&quot;</span>]) <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> search_res[<span class="hljs-number">0</span>]
]
<span class="hljs-built_in">print</span>(json.dumps(retrieved_lines_with_distances, indent=<span class="hljs-number">4</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[
    [
        &quot; Where does Milvus store data?\n\nMilvus deals with two types of data, inserted data and metadata. \n\nInserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends, including [MinIO](https://min.io/), [AWS S3](https://aws.amazon.com/s3/?nc1=h_ls), [Google Cloud Storage](https://cloud.google.com/storage?hl=en#object-storage-for-companies-of-all-sizes) (GCS), [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs), [Alibaba Cloud OSS](https://www.alibabacloud.com/product/object-storage-service), and [Tencent Cloud Object Storage](https://www.tencentcloud.com/products/cos) (COS).\n\nMetadata are generated within Milvus. Each Milvus module has its own metadata that are stored in etcd.\n\n###&quot;,
        0.6488019824028015
    ],
    [
        &quot;How does Milvus flush data?\n\nMilvus returns success when inserted data are loaded to the message queue. However, the data are not yet flushed to the disk. Then Milvus' data node writes the data in the message queue to persistent storage as incremental logs. If `flush()` is called, the data node is forced to write all data in the message queue to persistent storage immediately.\n\n###&quot;,
        0.5974207520484924
    ],
    [
        &quot;What is the maximum dataset size Milvus can handle?\n\n  \nTheoretically, the maximum dataset size Milvus can handle is determined by the hardware it is run on, specifically system memory and storage:\n\n- Milvus loads all specified collections and partitions into memory before running queries. Therefore, memory size determines the maximum amount of data Milvus can query.\n- When new entities and and collection-related schema (currently only MinIO is supported for data persistence) are added to Milvus, system storage determines the maximum allowable size of inserted data.\n\n###&quot;,
        0.5833579301834106
    ]
]
</code></pre>
<h3 id="Use-LLM-to-get-a-RAG-response" class="common-anchor-header">Utilizzare LLM per ottenere una risposta RAG</h3><p>Convertire i documenti recuperati in un formato stringa.</p>
<pre><code translate="no" class="language-python">context = <span class="hljs-string">&quot;\n&quot;</span>.<span class="hljs-keyword">join</span>(
    [<span class="hljs-meta">line_with_distance[0</span>] <span class="hljs-keyword">for</span> line_with_distance <span class="hljs-keyword">in</span> retrieved_lines_with_distances]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Define system and user prompts for the Language Model. This prompt is assembled with the retrieved documents from Milvus.

SYSTEM_PROMPT = &quot;&quot;&quot;
Human: You are an AI assistant. You are able to find answers to the questions from the contextual passage snippets provided.
&quot;&quot;&quot;
USER_PROMPT = f&quot;&quot;&quot;
Use the following pieces of information enclosed in &lt;context&gt; tags to provide an answer to the question enclosed in &lt;question&gt; tags.
&lt;context&gt;
{context}
&lt;/context&gt;
&lt;question&gt;
{question}
&lt;/question&gt;
&quot;&quot;&quot;
</code></pre>
<p>Utilizzare LLM per generare una risposta basata sulle richieste. Impostiamo il parametro <code translate="no">model</code> a <code translate="no">not-used</code>, poiché è un parametro ridondante per il servizio llama.cpp.</p>
<pre><code translate="no" class="language-python">response = llm_client.chat.completions.create(
    model=<span class="hljs-string">&quot;not-used&quot;</span>,
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: SYSTEM_PROMPT},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: USER_PROMPT},
    ],
)
<span class="hljs-built_in">print</span>(response.choices[<span class="hljs-number">0</span>].message.content)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Milvus stores data in two types: inserted data and metadata. Inserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends such as MinIO, AWS S3, Google Cloud Storage (GCS), Azure Blob Storage, Alibaba Cloud OSS, and Tencent Cloud Object Storage (COS). Metadata are generated within Milvus and each Milvus module has its own metadata that are stored in etcd.
</code></pre>
<p>Congratulazioni! Avete costruito un'applicazione RAG in cima alle infrastrutture basate su Arm.</p>
