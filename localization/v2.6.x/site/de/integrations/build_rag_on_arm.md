---
id: build_rag_on_arm.md
summary: >-
  In diesem Tutorial lernen Sie, wie Sie eine Retrieval-Augmented Generation
  (RAG)-Anwendung auf Arm-basierten Infrastrukturen erstellen. Für die
  Vektorspeicherung verwenden wir Zilliz Cloud, die vollständig verwaltete
  Milvus-Vektordatenbank. Zilliz Cloud ist in den wichtigsten Clouds wie AWS,
  GCP und Azure verfügbar. In dieser Demo verwenden wir Zilliz Cloud, die auf
  AWS mit Arm-Maschinen bereitgestellt wird. Für LLM verwenden wir das
  Llama-3.1-8B-Modell auf der AWS Arm-basierten Server-CPU mit llama.cpp.
title: RAG auf Arm-Architektur aufbauen
---
<h1 id="Build-RAG-on-Arm-Architecture" class="common-anchor-header">RAG auf Arm-Architektur aufbauen<button data-href="#Build-RAG-on-Arm-Architecture" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://www.arm.com/">Arm-CPUs</a> werden in einer Vielzahl von Anwendungen eingesetzt, darunter auch traditionelle Anwendungen für maschinelles Lernen (ML) und künstliche Intelligenz (KI).</p>
<p>In diesem Tutorial lernen Sie, wie Sie eine Retrieval-Augmented Generation (RAG)-Anwendung auf Arm-basierten Infrastrukturen erstellen. Für die Vektorspeicherung verwenden wir <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, die vollständig verwaltete Milvus-Vektordatenbank. Zilliz Cloud ist in den wichtigsten Clouds wie AWS, GCP und Azure verfügbar. In dieser Demo verwenden wir Zilliz Cloud, die auf AWS mit Arm-Maschinen bereitgestellt wird. Für LLM verwenden wir das Modell <code translate="no">Llama-3.1-8B</code> auf der AWS Arm-basierten Server-CPU mit <code translate="no">llama.cpp</code>.</p>
<h2 id="Prerequisite" class="common-anchor-header">Voraussetzung<button data-href="#Prerequisite" class="anchor-icon" translate="no">
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
    </button></h2><p>Um dieses Beispiel auszuführen, empfehlen wir die Verwendung von <a href="https://aws.amazon.com/ec2/graviton/">AWS Graviton</a>, das eine kostengünstige Möglichkeit zur Ausführung von ML-Arbeitslasten auf Arm-basierten Servern bietet. Dieses Notebook wurde auf einer AWS Graviton3 <code translate="no">c7g.2xlarge</code> -Instanz mit einem Ubuntu 22.04 LTS-System getestet.</p>
<p>Sie benötigen mindestens vier Kerne und 8 GB RAM, um dieses Beispiel auszuführen. Konfigurieren Sie den Festplattenspeicher auf mindestens 32 GB. Wir empfehlen Ihnen, eine Instanz mit denselben oder besseren Spezifikationen zu verwenden.</p>
<p>Nachdem Sie die Instanz gestartet haben, verbinden Sie sich mit ihr und führen Sie die folgenden Befehle aus, um die Umgebung vorzubereiten.</p>
<p>Installieren Sie python auf dem Server:</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">sudo</span> apt update
$ <span class="hljs-built_in">sudo</span> apt install python-is-python3 python3-pip python3-venv -y
<button class="copy-code-btn"></button></code></pre>
<p>Erstellen und aktivieren Sie eine virtuelle Umgebung:</p>
<pre><code translate="no" class="language-bash">$ python -m venv venv
$ <span class="hljs-built_in">source</span> venv/bin/activate
<button class="copy-code-btn"></button></code></pre>
<p>Installieren Sie die erforderlichen Python-Abhängigkeiten:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus openai requests langchain-huggingface huggingface_hub tqdm</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Offline-Data-Loading" class="common-anchor-header">Offline-Daten laden<button data-href="#Offline-Data-Loading" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-Collection" class="common-anchor-header">Erstellen Sie die Sammlung</h3><p>Wir verwenden die <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, die auf AWS mit Arm-basierten Maschinen bereitgestellt wird, um die Vektordaten zu speichern und abzurufen. Um schnell zu beginnen, <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">registrieren Sie</a> einfach <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">ein</a> kostenloses <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">Konto</a> bei Zilliz Cloud.</p>
<div class="alert note">
<p>Neben der Zilliz Cloud ist auch das selbst gehostete Milvus eine (komplizierter einzurichtende) Option. Wir können auch <a href="https://milvus.io/docs/install_standalone-docker-compose.md">Milvus Standalone</a> und <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes</a> auf ARM-basierten Maschinen bereitstellen. Weitere Informationen zur Milvus-Installation finden Sie in der <a href="https://milvus.io/docs/install-overview.md">Installationsdokumentation</a>.</p>
</div>
<p>Wir setzen <code translate="no">uri</code> und <code translate="no">token</code> als <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">öffentlichen Endpunkt und Api-Schlüssel</a> in Zilliz Cloud.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

milvus_client = MilvusClient(
    uri=<span class="hljs-string">&quot;&lt;your_zilliz_public_endpoint&gt;&quot;</span>, token=<span class="hljs-string">&quot;&lt;your_zilliz_api_key&gt;&quot;</span>
)

collection_name = <span class="hljs-string">&quot;my_rag_collection&quot;</span>

<button class="copy-code-btn"></button></code></pre>
<p>Prüfen Sie, ob die Sammlung bereits existiert und löschen Sie sie, falls dies der Fall ist.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>Erstellen Sie eine neue Sammlung mit den angegebenen Parametern.</p>
<p>Wenn wir keine Feldinformationen angeben, erstellt Milvus automatisch ein Standardfeld <code translate="no">id</code> für den Primärschlüssel und ein Feld <code translate="no">vector</code> zum Speichern der Vektordaten. Ein reserviertes JSON-Feld wird verwendet, um nicht schema-definierte Felder und ihre Werte zu speichern.</p>
<pre><code translate="no" class="language-python">milvus_client.create_collection(
    collection_name=collection_name,
    dimension=<span class="hljs-number">384</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Wir verwenden den inneren Produktabstand als Standard-Metrik-Typ. Weitere Informationen über Abstandsarten finden Sie auf der <a href="https://milvus.io/docs/metric.md?tab=floating">Seite Ähnlichkeitsmetriken</a></p>
<h3 id="Prepare-the-data" class="common-anchor-header">Vorbereiten der Daten</h3><p>Wir verwenden die FAQ-Seiten aus der <a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">Milvus-Dokumentation 2.4.x</a> als privates Wissen in unserem RAG, was eine gute Datenquelle für eine einfache RAG-Pipeline ist.</p>
<p>Laden Sie die Zip-Datei herunter und entpacken Sie die Dokumente in den Ordner <code translate="no">milvus_docs</code>.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">unzip -q milvus_docs_2.4.x_en.zip -d milvus_docs</span>
<button class="copy-code-btn"></button></code></pre>
<p>Wir laden alle Markdown-Dateien aus dem Ordner <code translate="no">milvus_docs/en/faq</code>. Für jedes Dokument verwenden wir einfach "# ", um den Inhalt in der Datei zu trennen, wodurch der Inhalt jedes Hauptteils der Markdown-Datei grob getrennt werden kann.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []

<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()

    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data" class="common-anchor-header">Daten einfügen</h3><p>Wir bereiten ein einfaches, aber effizientes Einbettungsmodell <a href="https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2">all-MiniLM-L6-v2</a> vor, das Text in Einbettungsvektoren umwandeln kann.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> langchain_huggingface <span class="hljs-keyword">import</span> HuggingFaceEmbeddings

embedding_model = HuggingFaceEmbeddings(model_name=<span class="hljs-string">&quot;all-MiniLM-L6-v2&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Iterieren Sie durch die Textzeilen, erstellen Sie Einbettungen und fügen Sie die Daten dann in Milvus ein.</p>
<p>Hier ist ein neues Feld <code translate="no">text</code>, das ein nicht definiertes Feld im Sammlungsschema ist. Es wird automatisch zu dem reservierten dynamischen JSON-Feld hinzugefügt, das auf hoher Ebene als normales Feld behandelt werden kann.</p>
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
<h2 id="Launch-LLM-Service-on-Arm" class="common-anchor-header">Starten des LLM-Dienstes auf Arm<button data-href="#Launch-LLM-Service-on-Arm" class="anchor-icon" translate="no">
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
    </button></h2><p>In diesem Abschnitt werden wir den <code translate="no">llama.cpp</code> Dienst auf der Arm-basierten CPU erstellen und starten.</p>
<h3 id="Llama-31-model--llamacpp" class="common-anchor-header">Llama 3.1 Modell &amp; llama.cpp</h3><p>Das <a href="https://huggingface.co/cognitivecomputations/dolphin-2.9.4-llama3.1-8b-gguf">Llama-3.1-8B-Modell</a> von Meta gehört zur Llama-3.1-Modellfamilie und kann für Forschungs- und kommerzielle Zwecke frei verwendet werden. Bevor Sie das Modell verwenden, besuchen Sie die <a href="https://llama.meta.com/llama-downloads/">Llama-Website</a> und füllen Sie das Formular aus, um Zugang zu beantragen.</p>
<p><a href="https://github.com/ggerganov/llama.cpp">llama.cpp</a> ist ein Open-Source-C/C++-Projekt, das effiziente LLM-Inferenz auf einer Vielzahl von Hardware ermöglicht - sowohl lokal als auch in der Cloud. Sie können ein Llama 3.1-Modell bequem mit <code translate="no">llama.cpp</code> hosten.</p>
<h3 id="Download-and-build-llamacpp" class="common-anchor-header">llama.cpp herunterladen und erstellen</h3><p>Führen Sie die folgenden Befehle aus, um make, cmake, gcc, g++ und andere wichtige Tools zu installieren, die für die Erstellung von llama.cpp aus den Quellen erforderlich sind:</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">sudo</span> apt install make cmake -y
$ <span class="hljs-built_in">sudo</span> apt install gcc g++ -y
$ <span class="hljs-built_in">sudo</span> apt install build-essential -y
<button class="copy-code-btn"></button></code></pre>
<p>Sie sind nun bereit, mit der Erstellung von <code translate="no">llama.cpp</code> zu beginnen.</p>
<p>Klonen Sie das Quellcode-Repository für llama.cpp:</p>
<pre><code translate="no" class="language-bash">$ git <span class="hljs-built_in">clone</span> https://github.com/ggerganov/llama.cpp
<button class="copy-code-btn"></button></code></pre>
<p>Standardmäßig wird <code translate="no">llama.cpp</code> nur für die CPU von Linux und Windows erstellt. Sie müssen keine zusätzlichen Schalter bereitstellen, um es für die Arm-CPU zu bauen, auf der Sie es ausführen.</p>
<p>Führen Sie <code translate="no">make</code> aus, um es zu bauen:</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">cd</span> llama.cpp
$ make GGML_NO_LLAMAFILE=1 -j$(<span class="hljs-built_in">nproc</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Überprüfen Sie, ob <code translate="no">llama.cpp</code> korrekt gebaut wurde, indem Sie den Befehl help ausführen:</p>
<pre><code translate="no" class="language-bash">$ ./llama-cli -h
<button class="copy-code-btn"></button></code></pre>
<p>Wenn <code translate="no">llama.cpp</code> korrekt gebaut wurde, wird die Option help angezeigt. Der Ausschnitt der Ausgabe sieht wie folgt aus:</p>
<pre><code translate="no">example usage:

    text generation:     ./llama-cli -m your_model.gguf -p &quot;I believe the meaning of life is&quot; -n 128

    chat (conversation): ./llama-cli -m your_model.gguf -p &quot;You are a helpful assistant&quot; -cnv
</code></pre>
<p>Sie können das Modell nun mit dem huggingface cli herunterladen:</p>
<pre><code translate="no" class="language-bash">$ huggingface-cli download cognitivecomputations/dolphin-2.9.4-llama3.1-8b-gguf dolphin-2.9.4-llama3.1-8b-Q4_0.gguf --local-dir . --local-dir-use-symlinks False
<button class="copy-code-btn"></button></code></pre>
<p>Das GGUF-Modellformat, das vom llama.cpp-Team eingeführt wurde, verwendet Komprimierung und Quantisierung, um die Genauigkeit der Gewichte auf 4-Bit-Ganzzahlen zu reduzieren, was den Rechen- und Speicherbedarf erheblich verringert und Arm-CPUs für LLM-Inferenz effektiv macht.</p>
<h3 id="Re-quantize-the-model-weights" class="common-anchor-header">Re-Quantisierung der Modellgewichte</h3><p>Um die Gewichte neu zu quantisieren, führen Sie</p>
<pre><code translate="no" class="language-bash">$ ./llama-quantize --allow-requantize dolphin-2.9.4-llama3.1-8b-Q4_0.gguf dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf Q4_0_8_8
<button class="copy-code-btn"></button></code></pre>
<p>Dadurch wird eine neue Datei <code translate="no">dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf</code> ausgegeben, die rekonfigurierte Gewichte enthält, die es <code translate="no">llama-cli</code> ermöglichen, SVE 256 und MATMUL_INT8-Unterstützung zu verwenden.</p>
<div class="alert note">
<p>Diese Re-Quantisierung ist speziell für Graviton3 optimal. Für Graviton2 sollte die optimale Requantisierung im Format <code translate="no">Q4_0_4_4</code> durchgeführt werden, und für Graviton4 ist das Format <code translate="no">Q4_0_4_8</code> am besten für die Requantisierung geeignet.</p>
</div>
<h3 id="Start-the-LLM-Service" class="common-anchor-header">Starten Sie den LLM-Dienst</h3><p>Sie können das Serverprogramm llama.cpp verwenden und Anfragen über eine OpenAI-kompatible API senden. So können Sie Anwendungen entwickeln, die mehrfach mit dem LLM interagieren, ohne ihn wiederholt starten und stoppen zu müssen. Außerdem können Sie von einem anderen Rechner, auf dem der LLM über das Netzwerk gehostet wird, auf den Server zugreifen.</p>
<p>Starten Sie den Server von der Befehlszeile aus, und er lauscht am Port 8080:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">./llama-server -m dolphin-2.9.4-llama3.1-8b-Q4_0_8_8.gguf -n 2048 -t 64 -c 65536  --port 8080</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">'main: server is listening on 127.0.0.1:8080 - starting the main loop
</code></pre>
<p>Sie können auch die Parameter des gestarteten LLM anpassen, um ihn an Ihre Serverhardware anzupassen und eine optimale Leistung zu erzielen. Weitere Informationen zu den Parametern finden Sie unter dem Befehl <code translate="no">llama-server --help</code>.</p>
<p>Wenn Sie Schwierigkeiten haben, diesen Schritt auszuführen, können Sie weitere Informationen in den <a href="https://learn.arm.com/learning-paths/servers-and-cloud-computing/llama-cpu/llama-chatbot/">offiziellen Dokumenten</a> nachlesen.</p>
<p>Sie haben den LLM-Dienst auf Ihrer Arm-basierten CPU gestartet. Als nächstes interagieren wir direkt mit dem Dienst, indem wir das OpenAI SDK verwenden.</p>
<h2 id="Online-RAG" class="common-anchor-header">Online RAG<button data-href="#Online-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="LLM-Client-and-Embedding-Model" class="common-anchor-header">LLM-Client und Einbettungsmodell</h3><p>Wir initialisieren den LLM-Client und bereiten das Einbettungsmodell vor.</p>
<p>Für den LLM verwenden wir das OpenAI SDK, um den zuvor gestarteten Llama-Dienst anzufordern. Wir brauchen keinen API-Schlüssel zu verwenden, da es sich um unseren lokalen llama.cpp-Dienst handelt.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

llm_client = OpenAI(base_url=<span class="hljs-string">&quot;http://localhost:8080/v1&quot;</span>, api_key=<span class="hljs-string">&quot;no-key&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Erzeugen Sie eine Testeinbettung und geben Sie deren Dimension und die ersten Elemente aus.</p>
<pre><code translate="no" class="language-python">test_embedding = embedding_model.embed_query(<span class="hljs-string">&quot;This is a test&quot;</span>)
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">384
[0.03061249852180481, 0.013831384479999542, -0.02084377221763134, 0.016327863559126854, -0.010231520049273968, -0.0479842908680439, -0.017313342541456223, 0.03728749603033066, 0.04588735103607178, 0.034405000507831573]
</code></pre>
<h3 id="Retrieve-data-for-a-query" class="common-anchor-header">Abrufen von Daten für eine Abfrage</h3><p>Geben wir eine häufige Frage über Milvus an.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Suchen Sie nach der Frage in der Sammlung und rufen Sie die semantischen Top-3-Treffer ab.</p>
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
<p>Werfen wir einen Blick auf die Suchergebnisse der Abfrage</p>
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
<h3 id="Use-LLM-to-get-a-RAG-response" class="common-anchor-header">LLM verwenden, um eine RAG-Antwort zu erhalten</h3><p>Konvertieren Sie die abgerufenen Dokumente in ein String-Format.</p>
<pre><code translate="no" class="language-python">context = <span class="hljs-string">&quot;\n&quot;</span>.join(
    [line_with_distance[<span class="hljs-number">0</span>] <span class="hljs-keyword">for</span> line_with_distance <span class="hljs-keyword">in</span> retrieved_lines_with_distances]
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
<p>Verwenden Sie LLM, um eine Antwort basierend auf den Eingabeaufforderungen zu generieren. Wir setzen den Parameter <code translate="no">model</code> auf <code translate="no">not-used</code>, da er ein redundanter Parameter für den Dienst llama.cpp ist.</p>
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
<p>Herzlichen Glückwunsch! Sie haben eine RAG-Anwendung auf Basis der Arm-basierten Infrastrukturen erstellt.</p>
