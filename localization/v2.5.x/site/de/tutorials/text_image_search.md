---
id: text_image_search.md
summary: >-
  In diesem Tutorial werden wir untersuchen, wie man textbasierte Bildsuche mit
  dem CLIP-Modell (Contrastive Language-Image Pretraining) von OpenAI und Milvus
  implementiert. Wir werden Bildeinbettungen mit CLIP erzeugen, sie in Milvus
  speichern und effiziente Ähnlichkeitssuchen durchführen.
title: Text-zu-Bildern-Suche mit Milvus
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/text_image_search_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/text_image_search_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Text-to-Image-Search-with-Milvus" class="common-anchor-header">Text-zu-Bildern-Suche mit Milvus<button data-href="#Text-to-Image-Search-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Die Text-zu-Bild-Suche ist eine fortschrittliche Technologie, die es Benutzern ermöglicht, anhand von Textbeschreibungen in natürlicher Sprache nach Bildern zu suchen. Sie nutzt ein vorab trainiertes multimodales Modell, um sowohl Text als auch Bilder in Einbettungen in einem gemeinsamen semantischen Raum zu konvertieren und ermöglicht so Ähnlichkeitsvergleiche.</p>
<p>In diesem Tutorial werden wir untersuchen, wie textbasierte Bildsuche mit Hilfe des CLIP-Modells (Contrastive Language-Image Pretraining) von OpenAI und Milvus implementiert werden kann. Wir werden Bildeinbettungen mit CLIP erzeugen, sie in Milvus speichern und effiziente Ähnlichkeitssuchen durchführen.</p>
<h2 id="Prerequisites" class="common-anchor-header">Voraussetzungen<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Bevor Sie beginnen, stellen Sie sicher, dass Sie alle erforderlichen Pakete und Beispieldaten bereithalten.</p>
<h3 id="Install-dependencies" class="common-anchor-header">Installieren Sie die Abhängigkeiten</h3><ul>
<li><strong>pymilvus&gt;=2.4.2</strong> für die Interaktion mit der Milvus-Datenbank</li>
<li><strong>clip</strong> für die Arbeit mit dem CLIP-Modell</li>
<li><strong>pillow</strong> für die Bildverarbeitung und Visualisierung</li>
</ul>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install --upgrade pymilvus pillow</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install git+https://github.com/openai/CLIP.git</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Wenn Sie Google Colab verwenden, müssen Sie möglicherweise <strong>die Runtime neu starten</strong> (navigieren Sie zum Menü "Runtime" am oberen Rand der Benutzeroberfläche und wählen Sie "Restart session" aus dem Dropdown-Menü).</p>
</div>
<h3 id="Download-example-data" class="common-anchor-header">Herunterladen von Beispieldaten</h3><p>Wir werden eine Teilmenge des <a href="https://www.image-net.org">ImageNet-Datensatzes</a> (100 Klassen, 10 Bilder für jede Klasse) als Beispielbilder verwenden. Der folgende Befehl lädt die Beispieldaten herunter und extrahiert sie in den lokalen Ordner <code translate="no">./images_folder</code>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/towhee-io/examples/releases/download/data/reverse_image_search.zip</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">unzip -q reverse_image_search.zip -d images_folder</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-up-Milvus" class="common-anchor-header">Milvus einrichten</h3><p>Bevor Sie fortfahren, richten Sie Ihren Milvus-Server ein und verbinden Sie sich mit Ihrer URI (und optional mit einem Token):</p>
<ul>
<li><p><strong>Milvus Lite (aus Gründen der Bequemlichkeit empfohlen)</strong>: Setzen Sie den URI auf eine lokale Datei, z. B. ./milvus.db. Dadurch wird <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> automatisch genutzt, um alle Daten in einer einzigen Datei zu speichern.</p></li>
<li><p><strong>Docker oder Kubernetes (für große Datenmengen)</strong>: Für die Verarbeitung größerer Datenmengen können Sie einen leistungsfähigeren Milvus-Server mit <a href="https://milvus.io/docs/quickstart.md">Docker oder Kubernetes</a> bereitstellen. Verwenden Sie in diesem Fall die Server-URI, z. B. http://localhost:19530, um eine Verbindung herzustellen.</p></li>
<li><p><strong>Zilliz Cloud (Managed Service)</strong>: Wenn Sie <a href="https://zilliz.com/cloud">Zilliz Cloud</a> verwenden, den vollständig verwalteten Cloud-Service von Milvus, legen Sie den öffentlichen Endpunkt als URI und den API-Schlüssel als Token fest.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;milvus.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Getting-Started" class="common-anchor-header">Erste Schritte<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><p>Jetzt, da Sie die notwendigen Abhängigkeiten und Daten haben, ist es an der Zeit, Feature-Extraktoren einzurichten und mit Milvus zu arbeiten. Dieser Abschnitt führt Sie durch die wichtigsten Schritte beim Aufbau eines Text-zu-Bild-Suchsystems. Abschließend zeigen wir Ihnen, wie Sie Bilder auf der Grundlage von Textabfragen abrufen und visualisieren können.</p>
<h3 id="Define-feature-extractors" class="common-anchor-header">Definieren von Merkmalsextraktoren</h3><p>Wir werden ein vortrainiertes CLIP-Modell verwenden, um Bild- und Texteinbettungen zu erzeugen. In diesem Abschnitt laden wir die vortrainierte <strong>ViT-B/32-Variante</strong> von CLIP und definieren Hilfsfunktionen zur Kodierung von Bild und Text:</p>
<ul>
<li><code translate="no">encode_image(image_path)</code>: Verarbeitet und kodiert Bilder in Feature-Vektoren</li>
<li><code translate="no">encode_text(text)</code>: Kodierung von Textanfragen in Merkmalsvektoren</li>
</ul>
<p>Beide Funktionen normalisieren die ausgegebenen Merkmale, um konsistente Vergleiche zu gewährleisten, indem sie die Vektoren in Einheitslängen umwandeln, was für genaue Kosinusähnlichkeitsberechnungen unerlässlich ist.</p>
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
<h3 id="Data-Ingestion" class="common-anchor-header">Dateneingabe</h3><p>Um eine semantische Bildsuche zu ermöglichen, müssen wir zunächst Einbettungen für alle Bilder erzeugen und sie in einer Vektordatenbank speichern, um sie effizient indizieren und abrufen zu können. Dieser Abschnitt enthält eine schrittweise Anleitung zur Aufnahme von Bilddaten in Milvus.</p>
<p><strong>1. Milvus-Sammlung erstellen</strong></p>
<p>Bevor Sie Bildeinbettungen speichern können, müssen Sie eine Milvus-Sammlung erstellen. Der folgende Code veranschaulicht, wie eine Sammlung im Schnelleinstellungsmodus mit dem Standard-Metrik-Typ COSINE erstellt wird. Die Sammlung enthält die folgenden Felder:</p>
<ul>
<li><p><code translate="no">id</code>: Ein Primärfeld mit aktivierter automatischer ID.</p></li>
<li><p><code translate="no">vector</code>: Ein Feld zum Speichern von Fließkomma-Vektoreinbettungen.</p></li>
</ul>
<p>Wenn Sie ein benutzerdefiniertes Schema benötigen, finden Sie detaillierte Anweisungen in der <a href="https://milvus.io/docs/create-collection.md">Milvus-Dokumentation</a>.</p>
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
<p><strong>2. Daten in Milvus einfügen</strong></p>
<p>In diesem Schritt verwenden wir einen vordefinierten Bildkodierer, um Einbettungen für alle JPEG-Bilder im Beispieldatenverzeichnis zu erzeugen. Diese Einbettungen werden dann in die Milvus-Sammlung eingefügt, zusammen mit den entsprechenden Dateipfaden. Jeder Eintrag in der Sammlung besteht aus:</p>
<ul>
<li><strong>Einbettungsvektor</strong>: Die numerische Darstellung des Bildes. Sie wird im Feld <code translate="no">vector</code> gespeichert.</li>
<li><strong>Dateipfad</strong>: Der Speicherort der Bilddatei als Referenz. Wird im Feld <code translate="no">filepath</code> als dynamisches Feld gespeichert.</li>
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
<h3 id="Peform-a-Search" class="common-anchor-header">Durchführen einer Suche</h3><p>Führen wir nun eine Suche mit einer Beispiel-Textabfrage durch. Dadurch werden die relevantesten Bilder auf der Grundlage ihrer semantischen Ähnlichkeit mit der angegebenen Textbeschreibung abgerufen.</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;a white dog&quot;</span>
query_embedding = encode_text(query_text)

search_results = milvus_client.search(
    collection_name=collection_name,
    data=[query_embedding],
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># return top 10 results</span>
    output_fields=[<span class="hljs-string">&quot;filepath&quot;</span>],  <span class="hljs-comment"># return the filepath field</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Visualisieren Sie die Ergebnisse:</p>
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
