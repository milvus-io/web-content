---
id: milvus_rag_with_vllm.md
summary: >-
  In diesem Blog zeige ich Ihnen, wie Sie einen RAG mit Milvus, vLLM und Llama
  3.1 erstellen und betreiben können. Genauer gesagt zeige ich Ihnen, wie Sie
  Textinformationen als Vektoreinbettungen in Milvus einbetten und speichern und
  diesen Vektorspeicher als Wissensdatenbank verwenden, um effizient
  Textabschnitte abzurufen, die für Benutzerfragen relevant sind.
title: 'Aufbau von RAG mit Milvus, vLLM und Llama 3.1'
---
<h1 id="Building-RAG-with-Milvus-vLLM-and-Llama-31" class="common-anchor-header">Aufbau von RAG mit Milvus, vLLM und Llama 3.1<button data-href="#Building-RAG-with-Milvus-vLLM-and-Llama-31" class="anchor-icon" translate="no">
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
    </button></h1><p>Die University of California - Berkeley hat der <a href="https://lfaidata.foundation/">LF AI &amp; Data Foundation</a> im Juli 2024 <a href="https://docs.vllm.ai/en/latest/index.html">vLLM</a>, eine schnelle und einfach zu bedienende Bibliothek für LLM Inferenz und Serving, als Projekt im Inkubationsstadium gespendet. Als Mitgliedsprojekt heißen wir vLLM in der LF AI &amp; Data Familie herzlich willkommen! 🎉</p>
<p>Große Sprachmodelle<a href="https://zilliz.com/glossary/large-language-models-(llms)">(</a>Large Language Models<a href="https://zilliz.com/glossary/large-language-models-(llms)">, LLMs</a>) und <a href="https://zilliz.com/learn/what-is-vector-database">Vektordatenbanken</a> werden in der Regel kombiniert, um Retrieval Augmented Generation<a href="https://zilliz.com/learn/Retrieval-Augmented-Generation">(RAG</a>) zu erstellen, eine beliebte KI-Anwendungsarchitektur zur Bewältigung von <a href="https://zilliz.com/glossary/ai-hallucination">KI-Halluzinationen</a>. Dieser Blog wird Ihnen zeigen, wie Sie eine RAG mit Milvus, vLLM und Llama 3.1 erstellen und ausführen. Genauer gesagt zeige ich Ihnen, wie Sie Textinformationen als <a href="https://zilliz.com/glossary/vector-embeddings">Vektoreinbettungen</a> in Milvus einbetten und speichern und diesen Vektorspeicher als Wissensdatenbank verwenden, um Textabschnitte, die für Benutzerfragen relevant sind, effizient abzurufen. Schließlich werden wir vLLM nutzen, um Metas Llama 3.1-8B Modell zu verwenden, um Antworten zu generieren, die durch den abgerufenen Text ergänzt werden. Tauchen wir ein!</p>
<h2 id="Introduction-to-Milvus-vLLM-and-Meta’s-Llama-31" class="common-anchor-header">Einführung in Milvus, vLLM und Metas Llama 3.1<button data-href="#Introduction-to-Milvus-vLLM-and-Meta’s-Llama-31" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Milvus-vector-database" class="common-anchor-header">Milvus Vektor-Datenbank</h3><p><a href="https://zilliz.com/what-is-milvus"><strong>Milvus</strong></a> ist eine <a href="https://zilliz.com/blog/what-is-a-real-vector-database">zweckbestimmte</a>, verteilte Open-Source-Vektordatenbank zum Speichern, Indizieren und Durchsuchen von Vektoren für <a href="https://zilliz.com/learn/generative-ai">generative KI</a> (GenAI) Workloads. Seine Fähigkeit, eine <a href="https://zilliz.com/blog/a-review-of-hybrid-search-in-milvus">hybride Suche,</a> <a href="https://zilliz.com/blog/what-is-new-with-metadata-filtering-in-milvus">Metadatenfilterung</a> und ein Reranking durchzuführen und Billionen von Vektoren effizient zu verarbeiten, macht Milvus zur ersten Wahl für KI- und Machine-Learning-Workloads. <a href="https://github.com/milvus-io/">Milvus</a> kann lokal, in einem Cluster oder in der vollständig verwalteten <a href="https://zilliz.com/cloud">Zilliz Cloud</a> betrieben werden.</p>
<h3 id="vLLM" class="common-anchor-header">vLLM</h3><p><a href="https://vllm.readthedocs.io/en/latest/index.html"><strong>vLLM</strong></a> ist ein Open-Source-Projekt, das am UC Berkeley SkyLab gestartet wurde und sich auf die Optimierung der LLM-Serving-Leistung konzentriert. Es verwendet eine effiziente Speicherverwaltung mit PagedAttention, kontinuierliche Stapelverarbeitung und optimierte CUDA-Kernel. Im Vergleich zu herkömmlichen Methoden verbessert vLLM die Serving-Leistung um das bis zu 24-fache und halbiert gleichzeitig den Speicherbedarf der GPU.</p>
<p>Laut dem Papier &quot;<a href="https://arxiv.org/abs/2309.06180">Efficient Memory Management for Large Language Model Serving with PagedAttention</a>&quot; belegt der KV-Cache etwa 30 % des GPU-Speichers, was zu potenziellen Speicherproblemen führt. Der KV-Cache wird in einem zusammenhängenden Speicher gespeichert, aber eine Änderung der Größe kann zu einer Fragmentierung des Speichers führen, was für Berechnungen ineffizient ist.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/vllm_1.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p><em>Abbildung 1. KV-Cache-Speicherverwaltung in bestehenden Systemen (2023 Paged Attention <a href="https://arxiv.org/pdf/2309.06180">paper</a>)</em></p>
<p>Durch die Verwendung von virtuellem Speicher für den KV-Cache weist vLLM den physischen GPU-Speicher nur bei Bedarf zu, wodurch eine Speicherfragmentierung vermieden und eine Vorabzuweisung vermieden wird. In Tests übertraf vLLM <a href="https://huggingface.co/docs/transformers/main_classes/text_generation">HuggingFace Transformers</a> (HF) und <a href="https://github.com/huggingface/text-generation-inference">Text Generation Inference</a> (TGI) und erreichte einen bis zu 24-mal höheren Durchsatz als HF und einen 3,5-mal höheren als TGI auf NVIDIA A10G und A100 GPUs.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/vllm_2.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p><em>Abbildung 2. Serving-Durchsatz, wenn für jede Anfrage drei parallele Output-Vervollständigungen angefordert werden. vLLM erreicht einen 8,5- bis 15-mal höheren Durchsatz als HF und einen 3,3- bis 3,5-mal höheren Durchsatz als TGI (2023 <a href="https://blog.vllm.ai/2023/06/20/vllm.html">vLLM Blog</a>).</em></p>
<h3 id="Meta’s-Llama-31" class="common-anchor-header">Metas Llama 3.1</h3><p><a href="https://ai.meta.com/research/publications/the-llama-3-herd-of-models"><strong>Metas Llama 3.1</strong></a> wurde am 23. Juli 2024 angekündigt. Das 405B-Modell bietet modernste Leistung bei mehreren öffentlichen Benchmarks und hat ein Kontextfenster von 128.000 Eingabe-Token, wobei verschiedene kommerzielle Verwendungen zulässig sind. Neben dem 405-Milliarden-Parameter-Modell hat Meta auch eine aktualisierte Version von Llama3 70B (70 Milliarden Parameter) und 8B (8 Milliarden Parameter) veröffentlicht. Die Modellgewichte stehen <a href="https://info.deeplearning.ai/e3t/Ctc/LX+113/cJhC404/VWbMJv2vnLfjW3Rh6L96gqS5YW7MhRLh5j9tjNN8BHR5W3qgyTW6N1vHY6lZ3l8N8htfRfqP8DzW72mhHB6vwYd2W77hFt886l4_PV22X226RPmZbW67mSH08gVp9MW2jcZvf24w97BW207Jmf8gPH0yW20YPQv261xxjW8nc6VW3jj-nNW6XdRhg5HhZk_W1QS0yL9dJZb0W818zFK1w62kdW8y-_4m1gfjfNW2jswrd3xbv-yW5mrvdk3n-KqyW45sLMF21qDrwW5TR3vr2MYxZ9W2hWhq23q-nQdW4blHqh3JlZWfW937hlZ58-KJCW82Pgv9384MbYW7yp56M6pvzd6f77wnH004">auf der Website von Meta</a> zum Download bereit.</p>
<p>Eine wichtige Erkenntnis war, dass eine Feinabstimmung der generierten Daten die Leistung steigern kann, Beispiele von schlechter Qualität sie jedoch verschlechtern können. Das Llama-Team hat intensiv daran gearbeitet, diese schlechten Beispiele mithilfe des Modells selbst, von Hilfsmodellen und anderen Tools zu identifizieren und zu entfernen.</p>
<h2 id="Build-and-Perform-the-RAG-Retrieval-with-Milvus" class="common-anchor-header">Aufbau und Durchführung des RAG-Retrievals mit Milvus<button data-href="#Build-and-Perform-the-RAG-Retrieval-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prepare-your-dataset" class="common-anchor-header">Bereiten Sie Ihren Datensatz vor.</h3><p>Ich habe die offizielle <a href="https://milvus.io/docs/">Milvus-Dokumentation</a> als Datensatz für diese Demo verwendet, die ich heruntergeladen und lokal gespeichert habe.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain.document_loaders <span class="hljs-keyword">import</span> DirectoryLoader
<span class="hljs-comment"># Load HTML files already saved in a local directory</span>
path = <span class="hljs-string">&quot;../../RAG/rtdocs_new/&quot;</span>
global_pattern = <span class="hljs-string">&#x27;*.html&#x27;</span>
loader = DirectoryLoader(path=path, glob=global_pattern)
docs = loader.load()


<span class="hljs-comment"># Print num documents and a preview.</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;loaded <span class="hljs-subst">{<span class="hljs-built_in">len</span>(docs)}</span> documents&quot;</span>)
<span class="hljs-built_in">print</span>(docs[<span class="hljs-number">0</span>].page_content)
pprint.pprint(docs[<span class="hljs-number">0</span>].metadata)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text">loaded <span class="hljs-number">22</span> documents
<span class="hljs-title class_">Why</span> <span class="hljs-title class_">Milvus</span> <span class="hljs-title class_">Docs</span> <span class="hljs-title class_">Tutorials</span> <span class="hljs-title class_">Tools</span> <span class="hljs-title class_">Blog</span> <span class="hljs-title class_">Community</span> <span class="hljs-title class_">Stars0</span> <span class="hljs-title class_">Try</span> <span class="hljs-title class_">Managed</span> <span class="hljs-title class_">Milvus</span> <span class="hljs-variable constant_">FREE</span> <span class="hljs-title class_">Search</span> <span class="hljs-title class_">Home</span> v2<span class="hljs-number">.4</span>.<span class="hljs-property">x</span> <span class="hljs-title class_">About</span> ...
{<span class="hljs-string">&#x27;source&#x27;</span>: <span class="hljs-string">&#x27;https://milvus.io/docs/quickstart.md&#x27;</span>}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Download-an-embedding-model" class="common-anchor-header">Laden Sie ein Einbettungsmodell herunter.</h3><p>Laden Sie als Nächstes ein kostenloses, quelloffenes <a href="https://zilliz.com/ai-models">Einbettungsmodell</a> von HuggingFace herunter.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> torch
<span class="hljs-keyword">from</span> sentence_transformers <span class="hljs-keyword">import</span> SentenceTransformer


<span class="hljs-comment"># Initialize torch settings for device-agnostic code.</span>
N_GPU = torch.cuda.device_count()
DEVICE = torch.device(<span class="hljs-string">&#x27;cuda:N_GPU&#x27;</span> <span class="hljs-keyword">if</span> torch.cuda.is_available() <span class="hljs-keyword">else</span> <span class="hljs-string">&#x27;cpu&#x27;</span>)


<span class="hljs-comment"># Download the model from huggingface model hub.</span>
model_name = <span class="hljs-string">&quot;BAAI/bge-large-en-v1.5&quot;</span>
encoder = SentenceTransformer(model_name, device=DEVICE)


<span class="hljs-comment"># Get the model parameters and save for later.</span>
EMBEDDING_DIM = encoder.get_sentence_embedding_dimension()
MAX_SEQ_LENGTH_IN_TOKENS = encoder.get_max_seq_length()


<span class="hljs-comment"># Inspect model parameters.</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;model_name: <span class="hljs-subst">{model_name}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;EMBEDDING_DIM: <span class="hljs-subst">{EMBEDDING_DIM}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;MAX_SEQ_LENGTH: <span class="hljs-subst">{MAX_SEQ_LENGTH}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text">model_name: BAAI/bge-large-en-v1.5
EMBEDDING_DIM: 1024
MAX_SEQ_LENGTH: 512
<button class="copy-code-btn"></button></code></pre>
<h3 id="Chunk-and-encode-your-custom-data-as-vectors" class="common-anchor-header">Zerlegen und kodieren Sie Ihre eigenen Daten als Vektoren.</h3><p>Ich werde eine feste Länge von 512 Zeichen mit 10 % Überlappung verwenden.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain.text_splitter <span class="hljs-keyword">import</span> RecursiveCharacterTextSplitter


CHUNK_SIZE = <span class="hljs-number">512</span>
chunk_overlap = np.<span class="hljs-built_in">round</span>(CHUNK_SIZE * <span class="hljs-number">0.10</span>, <span class="hljs-number">0</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;chunk_size: <span class="hljs-subst">{CHUNK_SIZE}</span>, chunk_overlap: <span class="hljs-subst">{chunk_overlap}</span>&quot;</span>)


<span class="hljs-comment"># Define the splitter.</span>
child_splitter = RecursiveCharacterTextSplitter(
   chunk_size=CHUNK_SIZE,
   chunk_overlap=chunk_overlap)


<span class="hljs-comment"># Chunk the docs.</span>
chunks = child_splitter.split_documents(docs)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{<span class="hljs-built_in">len</span>(docs)}</span> docs split into <span class="hljs-subst">{<span class="hljs-built_in">len</span>(chunks)}</span> child documents.&quot;</span>)


<span class="hljs-comment"># Encoder input is doc.page_content as strings.</span>
list_of_strings = [doc.page_content <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> chunks <span class="hljs-keyword">if</span> <span class="hljs-built_in">hasattr</span>(doc, <span class="hljs-string">&#x27;page_content&#x27;</span>)]


<span class="hljs-comment"># Embedding inference using HuggingFace encoder.</span>
embeddings = torch.tensor(encoder.encode(list_of_strings))


<span class="hljs-comment"># Normalize the embeddings.</span>
embeddings = np.array(embeddings / np.linalg.norm(embeddings))


<span class="hljs-comment"># Milvus expects a list of `numpy.ndarray` of `numpy.float32` numbers.</span>
converted_values = <span class="hljs-built_in">list</span>(<span class="hljs-built_in">map</span>(np.float32, embeddings))


<span class="hljs-comment"># Create dict_list for Milvus insertion.</span>
dict_list = []
<span class="hljs-keyword">for</span> chunk, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">zip</span>(chunks, converted_values):
   <span class="hljs-comment"># Assemble embedding vector, original text chunk, metadata.</span>
   chunk_dict = {
       <span class="hljs-string">&#x27;chunk&#x27;</span>: chunk.page_content,
       <span class="hljs-string">&#x27;source&#x27;</span>: chunk.metadata.get(<span class="hljs-string">&#x27;source&#x27;</span>, <span class="hljs-string">&quot;&quot;</span>),
       <span class="hljs-string">&#x27;vector&#x27;</span>: vector,
   }
   dict_list.append(chunk_dict)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text">chunk_size: 512, chunk_overlap: 51.0
22 docs <span class="hljs-built_in">split</span> into 355 child documents.
<button class="copy-code-btn"></button></code></pre>
<h3 id="Save-the-vectors-in-Milvus" class="common-anchor-header">Speichern Sie die Vektoren in Milvus.</h3><p>Nehmen Sie die kodierte Vektoreinbettung in die Milvus-Vektordatenbank auf.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Connect a client to the Milvus Lite server.</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
mc = MilvusClient(<span class="hljs-string">&quot;milvus_demo.db&quot;</span>)


<span class="hljs-comment"># Create a collection with flexible schema and AUTOINDEX.</span>
COLLECTION_NAME = <span class="hljs-string">&quot;MilvusDocs&quot;</span>
mc.create_collection(COLLECTION_NAME,
       EMBEDDING_DIM,
       consistency_level=<span class="hljs-string">&quot;Eventually&quot;</span>,
       auto_id=<span class="hljs-literal">True</span>, 
       overwrite=<span class="hljs-literal">True</span>)


<span class="hljs-comment"># Insert data into the Milvus collection.</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Start inserting entities&quot;</span>)
start_time = time.time()
mc.insert(
   COLLECTION_NAME,
   data=dict_list,
   progress_bar=<span class="hljs-literal">True</span>)


end_time = time.time()
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Milvus insert time for <span class="hljs-subst">{<span class="hljs-built_in">len</span>(dict_list)}</span> vectors: &quot;</span>, end=<span class="hljs-string">&quot;&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{<span class="hljs-built_in">round</span>(end_time - start_time, <span class="hljs-number">2</span>)}</span> seconds&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text">Start inserting entities
Milvus insert time for 355 vectors: 0.2 seconds
<button class="copy-code-btn"></button></code></pre>
<h3 id="Perform-a-vector-search" class="common-anchor-header">Führen Sie eine Vektorsuche durch.</h3><p>Stellen Sie eine Frage und suchen Sie nach den nächstgelegenen Chunks aus Ihrer Wissensbasis in Milvus.</p>
<pre><code translate="no" class="language-python">SAMPLE_QUESTION = <span class="hljs-string">&quot;What do the parameters for HNSW mean?&quot;</span>


<span class="hljs-comment"># Embed the question using the same encoder.</span>
query_embeddings = torch.tensor(encoder.encode(SAMPLE_QUESTION))
<span class="hljs-comment"># Normalize embeddings to unit length.</span>
query_embeddings = F.normalize(query_embeddings, p=<span class="hljs-number">2</span>, dim=<span class="hljs-number">1</span>)
<span class="hljs-comment"># Convert the embeddings to list of list of np.float32.</span>
query_embeddings = <span class="hljs-built_in">list</span>(<span class="hljs-built_in">map</span>(np.float32, query_embeddings))


<span class="hljs-comment"># Define metadata fields you can filter on.</span>
OUTPUT_FIELDS = <span class="hljs-built_in">list</span>(dict_list[<span class="hljs-number">0</span>].keys())
OUTPUT_FIELDS.remove(<span class="hljs-string">&#x27;vector&#x27;</span>)


<span class="hljs-comment"># Define how many top-k results you want to retrieve.</span>
TOP_K = <span class="hljs-number">2</span>


<span class="hljs-comment"># Run semantic vector search using your query and the vector database.</span>
results = mc.search(
    COLLECTION_NAME,
    data=query_embeddings,
    output_fields=OUTPUT_FIELDS,
    limit=TOP_K,
    consistency_level=<span class="hljs-string">&quot;Eventually&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Das Ergebnis sieht wie unten dargestellt aus.</p>
<pre><code translate="no" class="language-text">Retrieved result <span class="hljs-comment">#1</span>
distance = 0.7001987099647522
(<span class="hljs-string">&#x27;Chunk text: layer, finds the node closest to the target in this layer, and&#x27;</span>
...
<span class="hljs-string">&#x27;outgoing&#x27;</span>)
<span class="hljs-built_in">source</span>: https://milvus.io/docs/index.md

Retrieved result <span class="hljs-comment">#2</span>
distance = 0.6953287124633789
(<span class="hljs-string">&#x27;Chunk text: this value can improve recall rate at the cost of increased&#x27;</span>
...
<span class="hljs-string">&#x27;to the target&#x27;</span>)
<span class="hljs-built_in">source</span>: https://milvus.io/docs/index.md
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-and-Perform-the-RAG-Generation-with-vLLM-and-Llama-31-8B" class="common-anchor-header">Erstellen und Durchführen der RAG-Generierung mit vLLM und Llama 3.1-8B<button data-href="#Build-and-Perform-the-RAG-Generation-with-vLLM-and-Llama-31-8B" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Install-vLLM-and-models-from-HuggingFace" class="common-anchor-header">Installieren Sie vLLM und die Modelle von HuggingFace</h3><p>vLLM lädt standardmäßig große Sprachmodelle von HuggingFace herunter. Wenn Sie ein neues Modell von HuggingFace verwenden wollen, sollten Sie pip install --upgrade oder -U ausführen. Außerdem benötigen Sie eine GPU, um die Inferenz von Metas Llama 3.1-Modellen mit vLLM durchzuführen.</p>
<p>Eine vollständige Liste aller von vLLM unterstützten Modelle finden Sie auf dieser <a href="https://docs.vllm.ai/en/latest/models/supported_models.html#supported-models">Dokumentationsseite</a>.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># (Recommended) Create a new conda environment.</span>
conda create -n myenv python=<span class="hljs-number">3.11</span> -y
conda activate myenv


<span class="hljs-comment"># Install vLLM with CUDA 12.1.</span>
pip install -U vllm transformers torch


<span class="hljs-keyword">import</span> vllm, torch
<span class="hljs-keyword">from</span> vllm <span class="hljs-keyword">import</span> LLM, SamplingParams


<span class="hljs-comment"># Clear the GPU memory cache.</span>
torch.cuda.empty_cache()


<span class="hljs-comment"># Check the GPU.</span>
!nvidia-smi
<button class="copy-code-btn"></button></code></pre>
<p>Weitere Informationen über die Installation von vLLM finden Sie auf der <a href="https://docs.vllm.ai/en/latest/getting_started/installation.html">Installationsseite</a>.</p>
<h3 id="Get-a-HuggingFace-token" class="common-anchor-header">Holen Sie sich ein HuggingFace-Token.</h3><p>Bei einigen Modellen auf HuggingFace, wie Meta Llama 3.1, muss der Benutzer die Lizenz akzeptieren, bevor er die Gewichte herunterladen kann. Daher müssen Sie ein HuggingFace-Konto erstellen, die Lizenz des Modells akzeptieren und ein Token generieren.</p>
<p>Wenn du diese <a href="https://huggingface.co/meta-llama/Meta-Llama-3.1-70B">Llama3.1-Seite</a> auf HuggingFace besuchst, erhältst du eine Nachricht, in der du aufgefordert wirst, den Bedingungen zuzustimmen. Klicken Sie auf "<strong>Lizenz akzeptieren</strong>", um die Meta-Bedingungen zu akzeptieren, bevor Sie die Modellgewichte herunterladen. Die Genehmigung dauert normalerweise weniger als einen Tag.</p>
<p><strong>Nachdem Sie die Genehmigung erhalten haben, müssen Sie ein neues HuggingFace-Token erstellen. Ihre alten Token funktionieren nicht mehr mit den neuen Berechtigungen.</strong></p>
<p>Bevor Sie vLLM installieren, melden Sie sich bei HuggingFace mit Ihrem neuen Token an. Im Folgenden habe ich Colab-Geheimnisse verwendet, um das Token zu speichern.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Login to HuggingFace using your new token.</span>
<span class="hljs-keyword">from</span> huggingface_hub <span class="hljs-keyword">import</span> login
<span class="hljs-keyword">from</span> google.colab <span class="hljs-keyword">import</span> userdata
hf_token = userdata.get(<span class="hljs-string">&#x27;HF_TOKEN&#x27;</span>)
login(token = hf_token, add_to_git_credential=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Run-the-RAG-Generation" class="common-anchor-header">Ausführen der RAG-Generierung</h3><p>In der Demo führen wir das Modell <code translate="no">Llama-3.1-8B</code> aus, das einen Grafikprozessor und einen großen Arbeitsspeicher benötigt, um zu laufen. Das folgende Beispiel wurde auf Google Colab Pro ($10/Monat) mit einer A100 GPU ausgeführt. Weitere Informationen über die Ausführung von vLLM finden Sie in der <a href="https://docs.vllm.ai/en/latest/getting_started/quickstart.html">Quickstart-Dokumentation</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 1. Choose a model</span>
MODELTORUN = <span class="hljs-string">&quot;meta-llama/Meta-Llama-3.1-8B-Instruct&quot;</span>


<span class="hljs-comment"># 2. Clear the GPU memory cache, you&#x27;re going to need it all!</span>
torch.cuda.empty_cache()


<span class="hljs-comment"># 3. Instantiate a vLLM model instance.</span>
llm = LLM(model=MODELTORUN,
         enforce_eager=<span class="hljs-literal">True</span>,
         dtype=torch.bfloat16,
         gpu_memory_utilization=<span class="hljs-number">0.5</span>,
         max_model_len=<span class="hljs-number">1000</span>,
         seed=<span class="hljs-number">415</span>,
         max_num_batched_tokens=<span class="hljs-number">3000</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Schreiben Sie eine Eingabeaufforderung unter Verwendung von Kontexten und Quellen, die von Milvus abgerufen wurden.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Separate all the context together by space.</span>
contexts_combined = <span class="hljs-string">&#x27; &#x27;</span>.join(contexts)
<span class="hljs-comment"># Lance Martin, LangChain, says put the best contexts at the end.</span>
contexts_combined = <span class="hljs-string">&#x27; &#x27;</span>.join(<span class="hljs-built_in">reversed</span>(contexts))


<span class="hljs-comment"># Separate all the unique sources together by comma.</span>
source_combined = <span class="hljs-string">&#x27; &#x27;</span>.join(<span class="hljs-built_in">reversed</span>(<span class="hljs-built_in">list</span>(<span class="hljs-built_in">dict</span>.fromkeys(sources))))


SYSTEM_PROMPT = <span class="hljs-string">f&quot;&quot;&quot;First, check if the provided Context is relevant to
the user&#x27;s question.  Second, only if the provided Context is strongly relevant, answer the question using the Context.  Otherwise, if the Context is not strongly relevant, answer the question without using the Context. 
Be clear, concise, relevant.  Answer clearly, in fewer than 2 sentences.
Grounding sources: <span class="hljs-subst">{source_combined}</span>
Context: <span class="hljs-subst">{contexts_combined}</span>
User&#x27;s question: <span class="hljs-subst">{SAMPLE_QUESTION}</span>
&quot;&quot;&quot;</span>


prompts = [SYSTEM_PROMPT]
<button class="copy-code-btn"></button></code></pre>
<p>Generieren Sie nun eine Antwort unter Verwendung der abgerufenen Chunks und der ursprünglichen Frage, die in die Eingabeaufforderung eingefügt wurde.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sampling parameters</span>
sampling_params = SamplingParams(temperature=<span class="hljs-number">0.2</span>, top_p=<span class="hljs-number">0.95</span>)


<span class="hljs-comment"># Invoke the vLLM model.</span>
outputs = llm.generate(prompts, sampling_params)


<span class="hljs-comment"># Print the outputs.</span>
<span class="hljs-keyword">for</span> output <span class="hljs-keyword">in</span> outputs:
   prompt = output.prompt
   generated_text = output.outputs[<span class="hljs-number">0</span>].text
   <span class="hljs-comment"># !r calls repr(), which prints a string inside quotes.</span>
   <span class="hljs-built_in">print</span>()
   <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Question: <span class="hljs-subst">{SAMPLE_QUESTION!r}</span>&quot;</span>)
   pprint.pprint(<span class="hljs-string">f&quot;Generated text: <span class="hljs-subst">{generated_text!r}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-text"><span class="hljs-title class_">Question</span>: <span class="hljs-string">&#x27;What do the parameters for HNSW MEAN!?&#x27;</span>
<span class="hljs-title class_">Generated</span> <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;Answer: The parameters for HNSW (Hiera(rchical Navigable Small World Graph) are: &#x27;</span>
<span class="hljs-string">&#x27;* M: The maximum degree of nodes on each layer oof the graph, which can improve &#x27;</span>
<span class="hljs-string">&#x27;recall rate at the cost of increased search time. * efConstruction and ef: &#x27;</span> 
<span class="hljs-string">&#x27;These parameters specify a search range when building or searching an index.&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Die obige Antwort sieht für mich perfekt aus!</p>
<p>Wenn Sie an dieser Demo interessiert sind, können Sie sie gerne selbst ausprobieren und uns Ihre Meinung mitteilen. Sie sind auch herzlich eingeladen, unserer <a href="https://discord.com/invite/8uyFbECzPX">Milvus-Community auf Discord</a> beizutreten, um sich direkt mit den GenAI-Entwicklern auszutauschen.</p>
<h2 id="References" class="common-anchor-header">Referenzen<button data-href="#References" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p>vLLM <a href="https://docs.vllm.ai/en/latest/getting_started/installation.html">offizielle Dokumentation</a> und <a href="https://docs.vllm.ai/en/latest/models/supported_models.html#supported-models">Modellseite</a>.</p></li>
<li><p><a href="https://arxiv.org/pdf/2309.06180">2023 vLLM-Papier zu Paged Attention</a></p></li>
<li><p><a href="https://www.youtube.com/watch?v=80bIUggRJf4">2023 vLLM-Präsentation</a> auf dem Ray Summit</p></li>
<li><p>vLLM-Blog: <a href="https://blog.vllm.ai/2023/06/20/vllm.html">vLLM: Einfaches, schnelles und günstiges LLM Serving mit PagedAttention</a></p></li>
<li><p>Hilfreicher Blog über den Betrieb des vLLM-Servers: <a href="https://ploomber.io/blog/vllm-deploy/">Bereitstellung von vLLM: eine schrittweise Anleitung</a></p></li>
<li><p><a href="https://ai.meta.com/research/publications/the-llama-3-herd-of-models/">Die Llama 3-Herde von Models | Research - AI at Meta</a></p></li>
</ul>
