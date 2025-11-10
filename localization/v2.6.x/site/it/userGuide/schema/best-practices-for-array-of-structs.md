---
id: best-practices-for-array-of-structs.md
title: >-
  Progettazione del modello di dati con un array di struttureCompatible with
  Milvus 2.6.4+
summary: >-
  Le moderne applicazioni di intelligenza artificiale, soprattutto nell'ambito
  dell'Internet delle cose (IoT) e della guida autonoma, ragionano tipicamente
  su eventi ricchi e strutturati: la lettura di un sensore con il suo timestamp
  e il suo embedding vettoriale, un log diagnostico con un codice di errore e un
  frammento audio, o un segmento di viaggio con posizione, velocità e contesto
  della scena. Per questo è necessario che il database supporti in modo nativo
  l'ingestione e la ricerca di dati annidati.
beta: Milvus 2.6.4+
---
<h1 id="Data-Model-Design-with-an-Array-of-Structs" class="common-anchor-header">Progettazione del modello di dati con un array di strutture<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Data-Model-Design-with-an-Array-of-Structs" class="anchor-icon" translate="no">
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
    </button></h1><p>Le moderne applicazioni di intelligenza artificiale, soprattutto nell'Internet delle cose (IoT) e nella guida autonoma, ragionano tipicamente su eventi ricchi e strutturati: la lettura di un sensore con il suo timestamp e il suo embedding vettoriale, un log diagnostico con un codice di errore e un frammento audio, o un segmento di viaggio con posizione, velocità e contesto della scena. Per questo è necessario che il database supporti in modo nativo l'inserimento e la ricerca di dati annidati.</p>
<p>Invece di chiedere all'utente di convertire gli eventi strutturali atomici in modelli di dati piatti, Milvus introduce l'array di strutture, dove ogni struttura dell'array può contenere scalari e vettori, preservando l'integrità semantica.</p>
<h2 id="Why-Array-of-Structs" class="common-anchor-header">Perché gli array di strutture<button data-href="#Why-Array-of-Structs" class="anchor-icon" translate="no">
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
    </button></h2><p>Le moderne applicazioni di intelligenza artificiale, dalla guida autonoma al recupero multimodale, si basano sempre più su dati eterogenei e annidati. I modelli di dati piatti tradizionali faticano a rappresentare relazioni complesse come<strong>"un documento con molti pezzi annotati</strong>" o<strong>"una scena di guida con più manovre osservate</strong>". È qui che il tipo di dati Array of Structs di Milvus si fa notare.</p>
<p>Un array di strutture consente di memorizzare un insieme ordinato di elementi strutturati, dove ogni struttura contiene la propria combinazione di campi scalari e incorporazioni vettoriali. Questo lo rende ideale per:</p>
<ul>
<li><p><strong>Dati gerarchici</strong>: Entità genitore con più record figlio, come un libro con molti pezzi di testo o un video con molti fotogrammi annotati.</p></li>
<li><p><strong>Incorporazione multimodale</strong>: Ogni struttura può contenere più vettori, come l'incorporazione di testo e l'incorporazione di immagini, oltre ai metadati.</p></li>
<li><p><strong>Dati temporali o sequenziali</strong>: Le strutture in un campo Array rappresentano naturalmente serie temporali o eventi graduali.</p></li>
</ul>
<p>A differenza delle soluzioni tradizionali, che memorizzano blob JSON o dividono i dati in più raccolte, l'array di strutture offre l'applicazione nativa dello schema, l'indicizzazione dei vettori e l'archiviazione efficiente all'interno di Milvus.</p>
<h2 id="Schema-design-guidelines" class="common-anchor-header">Linee guida per la progettazione degli schemi<button data-href="#Schema-design-guidelines" class="anchor-icon" translate="no">
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
    </button></h2><p>Oltre a tutte le linee guida discusse in <a href="/docs/it/schema-hands-on.md">Progettazione del modello di dati per la ricerca</a>, prima di iniziare a usare un Array di strutture nel modello di dati è necessario considerare anche i seguenti aspetti.</p>
<h3 id="Define-the-Struct-schema" class="common-anchor-header">Definire lo schema della struttura<button data-href="#Define-the-Struct-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>Prima di aggiungere il campo Array alla collezione, occorre definire lo schema interno della struct. Ogni campo della struct deve essere esplicitamente tipizzato, scalare<strong>(VARCHAR</strong>, <strong>INT</strong>, <strong>BOOLEAN</strong>, ecc.) o vettoriale<strong>(FLOAT_VECTOR</strong>).</p>
<p>Si consiglia di mantenere lo schema Struct snello, includendo solo i campi che si useranno per il recupero o la visualizzazione. Evitare di gonfiare i metadati inutilizzati.</p>
<h3 id="Set-the-max-capacity-thoughtfully" class="common-anchor-header">Impostare la capacità massima in modo ponderato<button data-href="#Set-the-max-capacity-thoughtfully" class="anchor-icon" translate="no">
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
    </button></h3><p>Ogni campo Array ha un attributo che specifica il numero massimo di elementi che il campo Array può contenere per ogni entità. Impostare questo attributo in base al limite superiore del caso d'uso. Ad esempio, ci sono 1.000 pezzi di testo per documento o 100 manovre per scena di guida.</p>
<p>Un valore troppo alto spreca memoria e sarà necessario fare alcuni calcoli per determinare il numero massimo di strutture nel campo Array.</p>
<h3 id="Index-vector-fields-in-Structs" class="common-anchor-header">Indicizzare i campi vettoriali nelle strutture<button data-href="#Index-vector-fields-in-Structs" class="anchor-icon" translate="no">
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
    </button></h3><p>L'indicizzazione è obbligatoria per i campi vettoriali, compresi quelli di una collezione e quelli definiti in una struttura. Per i campi vettoriali in una struttura, si deve usare <code translate="no">HNSW</code> come tipo di indice e <code translate="no">MAX_SIM</code> serie come tipo di metrica.</p>
<p>Per i dettagli su tutti i limiti applicabili, fare riferimento ai <a href="/docs/it/array-of-structs.md#Limits">limiti</a>.</p>
<h2 id="A-real-world-example-Modeling-the-CoVLA-dataset-for-autonomous-driving" class="common-anchor-header">Un esempio reale: Modellazione del set di dati CoVLA per la guida autonoma<button data-href="#A-real-world-example-Modeling-the-CoVLA-dataset-for-autonomous-driving" class="anchor-icon" translate="no">
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
    </button></h2><p>Il set di dati Comprehensive Vision-Language-Action (CoVLA), introdotto da <a href="https://tur.ing/posts/s1QUA1uh">Turing Motors</a> e accettato alla Winter Conference on Applications of Computer Vision (WACV) 2025, fornisce una ricca base per l'addestramento e la valutazione dei modelli Vision-Language-Action (VLA) nella guida autonoma. Ogni punto di dati, di solito un video clip, contiene non solo input visivi grezzi ma anche didascalie strutturate che descrivono:</p>
<ul>
<li><p>Il <strong>comportamento</strong> del <strong>veicolo ego</strong> (ad esempio, "accodarsi a sinistra mentre si accosta al traffico in arrivo"),</p></li>
<li><p>Gli <strong>oggetti rilevati</strong> presenti (ad esempio, veicoli in testa, pedoni, semafori).</p></li>
<li><p>una <strong>didascalia</strong> della scena a livello di fotogramma.</p></li>
</ul>
<p>Questa natura gerarchica e multimodale lo rende un candidato ideale per la funzione Array of Structs. Per maggiori dettagli sul set di dati CoVLA, consultare il <a href="https://turingmotors.github.io/covla-ad/">sito web del set di dati CoVLA</a>.</p>
<h3 id="Step-1-Map-the-dataset-into-a-collection-schema" class="common-anchor-header">Passo 1: mappare il dataset in uno schema di raccolta<button data-href="#Step-1-Map-the-dataset-into-a-collection-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>Il dataset CoVLA è un dataset di guida multimodale su larga scala che comprende 10.000 videoclip, per un totale di oltre 80 ore di filmati. Campiona i fotogrammi a una frequenza di 20Hz e annota ogni fotogramma con didascalie dettagliate in linguaggio naturale, oltre a informazioni sullo stato del veicolo e sulle coordinate degli oggetti rilevati.</p>
<p>La struttura del dataset è la seguente:</p>
<pre><code translate="no" class="language-python">├── video_1                                       (VIDEO) <span class="hljs-comment"># video.mp4</span>
│   ├── video_id                                  (INT)
│   ├── video_url                                 (STRING)
│   ├── frames                                    (ARRAY)
│   │   ├── frame_1                               (STRUCT)
│   │   │   ├── caption                           (STRUCT) <span class="hljs-comment"># captions.jsonl</span>
│   │   │   │   ├── plain_caption                 (STRING)
│   │   │   │   ├── rich_caption                  (STRING)
│   │   │   │   ├── risk                          (STRING)
│   │   │   │   ├── risk_correct                  (BOOL)
│   │   │   │   ├── risk_yes_rate                 (FLOAT)
│   │   │   │   ├── weather                       (STRING)
│   │   │   │   ├── weather_rate                  (FLOAT)
│   │   │   │   ├── road                          (STRING)
│   │   │   │   ├── road_rate                     (FLOAT)
│   │   │   │   ├── is_tunnel                     (BOOL)
│   │   │   │   ├── is_tunnel_yes_rate            (FLOAT)
│   │   │   │   ├── is_highway                    (BOOL)
│   │   │   │   ├── is_highway_yes_rate           (FLOAT)
│   │   │   │   ├── has_pedestrain                (BOOL)
│   │   │   │   ├── has_pedestrain_yes_rate       (FLOAT)
│   │   │   │   ├── has_carrier_car               (BOOL)
│   │   │   ├── traffic_light                     (STRUCT) <span class="hljs-comment"># traffic_lights.jsonl</span>
│   │   │   │   ├── index                         (INT)
│   │   │   │   ├── <span class="hljs-keyword">class</span>                         (STRING)
│   │   │   │   ├── bbox                          (LIST&lt;FLOAT&gt;)
│   │   │   ├── front_car                         (STRUCT) <span class="hljs-comment"># front_cars.jsonl</span>
│   │   │   │   ├── has_lead                      (BOOL)
│   │   │   │   ├── lead_prob                     (FLOAT)
│   │   │   │   ├── lead_x                        (FLOAT)
│   │   │   │   ├── lead_y                        (FLOAT)
│   │   │   │   ├── lead_speed_kmh                (FLOAT)
│   │   │   │   ├── lead_a                        (FLOAT)
│   │   ├── frame_2                               (STRUCT)
│   │   ├── ...                                   (STRUCT)
│   │   ├── frame_n                               (STRUCT)
├── video_2
├── ...
├── video_n
<button class="copy-code-btn"></button></code></pre>
<p>Si può notare che la struttura del dataset CoVLA è altamente gerarchica, dividendo i dati raccolti in più file <code translate="no">.jsonl</code>, insieme ai video clip nel formato <code translate="no">.mp4</code>.</p>
<p>In Milvus, è possibile utilizzare un campo JSON o un campo Array-of-Structs per creare strutture annidate all'interno di uno schema di raccolta. Quando le incorporazioni vettoriali fanno parte del formato annidato, è supportato solo un campo Array-of-Structs. Tuttavia, una struttura all'interno di un array non può a sua volta contenere altre strutture annidate. Per memorizzare il set di dati CoVLA mantenendo le relazioni essenziali, è necessario rimuovere la gerarchia non necessaria e appiattire i dati in modo che si adattino allo schema della raccolta Milvus.</p>
<p>Il diagramma seguente illustra come possiamo modellare questo set di dati utilizzando lo schema illustrato nello schema seguente:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/dataset-model.png" alt="Dataset Model" class="doc-image" id="dataset-model" />
   </span> <span class="img-wrapper"> <span>Modello del set di dati</span> </span></p>
<p>Il diagramma precedente illustra la struttura di un videoclip, che comprende i seguenti campi:</p>
<ul>
<li><p><code translate="no">video_id</code> serve come chiave primaria, che accetta numeri interi di tipo INT64.</p></li>
<li><p><code translate="no">states</code> è un corpo JSON grezzo che contiene lo stato del veicolo ego in ogni fotogramma del video corrente.</p></li>
<li><p><code translate="no">captions</code> è un array di strutture e ogni struttura ha i seguenti campi:</p>
<ul>
<li><p><code translate="no">frame_id</code> identifica un fotogramma specifico all'interno del video corrente.</p></li>
<li><p><code translate="no">plain_caption</code> è una descrizione del fotogramma corrente senza l'ambiente circostante, come il tempo, le condizioni della strada, ecc. e <code translate="no">plain_cap_vector</code> è il suo corrispondente embedding vettoriale.</p></li>
<li><p><code translate="no">rich_caption</code> è una descrizione del fotogramma corrente con l'ambiente circostante e <code translate="no">rich_cap_vector</code> è il suo corrispondente embedding vettoriale.</p></li>
<li><p><code translate="no">risk</code> è una descrizione del rischio che il veicolo ego affronta nel fotogramma corrente, e <code translate="no">risk_vector</code> è il suo corrispondente vettore embeddings, e</p></li>
<li><p>Tutti gli altri attributi del frame, come <code translate="no">road</code>, <code translate="no">weather</code>, <code translate="no">is_tunnel</code>, <code translate="no">has_pedestrain</code>, ecc...</p></li>
</ul></li>
<li><p><code translate="no">traffic_lights</code> è un corpo JSON che contiene tutti i segnali semaforici identificati nel frame corrente.</p></li>
<li><p><code translate="no">front_cars</code> è anche un array di strutture che contiene tutte le auto in testa identificate nel frame corrente.</p></li>
</ul>
<h3 id="Step-2-Initialize-the-schemas" class="common-anchor-header">Passo 2: inizializzare gli schemi<button data-href="#Step-2-Initialize-the-schemas" class="anchor-icon" translate="no">
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
    </button></h3><p>Per iniziare, occorre inizializzare gli schemi per una struttura Caption, una struttura Front_cars e la collezione.</p>
<ul>
<li><p>Inizializzare lo schema per la struttura Caption.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># create the schema for the caption struct</span>
schema_for_caption = client.create_struct_field_schema()

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;frame_id&quot;</span>,
    datatype=DataType.INT64,
    description=<span class="hljs-string">&quot;ID of the frame to which the ego vehicle&#x27;s behavior belongs&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;plain_caption&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">1024</span>,
    description=<span class="hljs-string">&quot;plain description of the ego vehicle&#x27;s behaviors&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;plain_cap_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    description=<span class="hljs-string">&quot;vectors for the plain description of the ego vehicle&#x27;s behaviors&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;rich_caption&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">1024</span>,
    description=<span class="hljs-string">&quot;rich description of the ego vehicle&#x27;s behaviors&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;rich_cap_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    description=<span class="hljs-string">&quot;vectors for the rich description of the ego vehicle&#x27;s behaviors&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;risk&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">1024</span>,
    description=<span class="hljs-string">&quot;description of the ego vehicle&#x27;s risks&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;risk_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    description=<span class="hljs-string">&quot;vectors for the description of the ego vehicle&#x27;s risks&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;risk_correct&quot;</span>,
    datatype=DataType.BOOL,
    description=<span class="hljs-string">&quot;whether the risk assessment is correct&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;risk_yes_rate&quot;</span>,
    datatype=DataType.FLOAT,
    description=<span class="hljs-string">&quot;probability/confidence of risk being present&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;weather&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">50</span>,
    description=<span class="hljs-string">&quot;weather condition&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;weather_rate&quot;</span>,
    datatype=DataType.FLOAT,
    description=<span class="hljs-string">&quot;probability/confidence of the weather condition&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;road&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">50</span>,
    description=<span class="hljs-string">&quot;road type&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;road_rate&quot;</span>,
    datatype=DataType.FLOAT,
    description=<span class="hljs-string">&quot;probability/confidence of the road type&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;is_tunnel&quot;</span>,
    datatype=DataType.BOOL,
    description=<span class="hljs-string">&quot;whether the road is a tunnel&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;is_tunnel_yes_rate&quot;</span>,
    datatype=DataType.FLOAT,
    description=<span class="hljs-string">&quot;probability/confidence of the road being a tunnel&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;is_highway&quot;</span>,
    datatype=DataType.BOOL,
    description=<span class="hljs-string">&quot;whether the road is a highway&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;is_highway_yes_rate&quot;</span>,
    datatype=DataType.FLOAT,
    description=<span class="hljs-string">&quot;probability/confidence of the road being a highway&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;has_pedestrian&quot;</span>,
    datatype=DataType.BOOL,
    description=<span class="hljs-string">&quot;whether there is a pedestrian present&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;has_pedestrian_yes_rate&quot;</span>,
    datatype=DataType.FLOAT,
    description=<span class="hljs-string">&quot;probability/confidence of pedestrian presence&quot;</span>
)

schema_for_caption.add_field(
    field_name=<span class="hljs-string">&quot;has_carrier_car&quot;</span>,
    datatype=DataType.BOOL,
    description=<span class="hljs-string">&quot;whether there is a carrier car present&quot;</span>
)
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Inizializzare lo schema per la struttura Front Car</p>
<p><div class="alert note"></p>
<p>Anche se un'auto anteriore non comporta incorporazioni vettoriali, è comunque necessario includerla come array di Struct, perché la dimensione dei dati supera il massimo per un campo JSON.</p>
<p></div></p>
<pre><code translate="no" class="language-python">schema_for_front_car = client.create_struct_field_schema()

schema_for_front_car.add_field(
    field_name=<span class="hljs-string">&quot;frame_id&quot;</span>,
    datatype=DataType.INT64,
    description=<span class="hljs-string">&quot;ID of the frame to which the ego vehicle&#x27;s behavior belongs&quot;</span>
)

schema_for_front_car.add_field(
    field_name=<span class="hljs-string">&quot;has_lead&quot;</span>,
    datatype=DataType.BOOL,
    description=<span class="hljs-string">&quot;whether there is a leading vehicle&quot;</span>
)

schema_for_front_car.add_field(
    field_name=<span class="hljs-string">&quot;lead_prob&quot;</span>,
    datatype=DataType.FLOAT,
    description=<span class="hljs-string">&quot;probability/confidence of the leading vehicle&#x27;s presence&quot;</span>
)

schema_for_front_car.add_field(
    field_name=<span class="hljs-string">&quot;lead_x&quot;</span>,
    datatype=DataType.FLOAT,
    description=<span class="hljs-string">&quot;x position of the leading vehicle relative to the ego vehicle&quot;</span>
)

schema_for_front_car.add_field(
    field_name=<span class="hljs-string">&quot;lead_y&quot;</span>,
    datatype=DataType.FLOAT,
    description=<span class="hljs-string">&quot;y position of the leading vehicle relative to the ego vehicle&quot;</span>
)

schema_for_front_car.add_field(
    field_name=<span class="hljs-string">&quot;lead_speed_kmh&quot;</span>,
    datatype=DataType.FLOAT,
    description=<span class="hljs-string">&quot;speed of the leading vehicle in km/h&quot;</span>
)

schema_for_front_car.add_field(
    field_name=<span class="hljs-string">&quot;lead_a&quot;</span>,
    datatype=DataType.FLOAT,
    description=<span class="hljs-string">&quot;acceleration of the leading vehicle&quot;</span>
)
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Inizializzare lo schema per la collezione</p>
<pre><code translate="no" class="language-python">schema = client.create_schema()

schema.add_field(
    field_name=<span class="hljs-string">&quot;video_id&quot;</span>,
    datatype=DataType.VARCHAR,
    description=<span class="hljs-string">&quot;primary key&quot;</span>,
    max_length=<span class="hljs-number">16</span>,
    is_primary=<span class="hljs-literal">True</span>,
    auto_id=<span class="hljs-literal">False</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;video_url&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">512</span>,
    description=<span class="hljs-string">&quot;URL of the video&quot;</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;captions&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=schema_for_caption,
    max_capacity=<span class="hljs-number">600</span>,
    description=<span class="hljs-string">&quot;captions for the current video&quot;</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;traffic_lights&quot;</span>,
    datatype=DataType.JSON,
    description=<span class="hljs-string">&quot;frame-specific traffic lights identified in the current video&quot;</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;front_cars&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=schema_for_front_car,
    max_capacity=<span class="hljs-number">600</span>,
    description=<span class="hljs-string">&quot;frame-specific leading cars identified in the current video&quot;</span>
)
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="Step-3-Set-index-parameters" class="common-anchor-header">Passo 3: Impostare i parametri dell'indice<button data-href="#Step-3-Set-index-parameters" class="anchor-icon" translate="no">
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
    </button></h3><p>Tutti i campi vettoriali devono essere indicizzati. Per indicizzare i campi vettoriali in un elemento Struct, è necessario utilizzare <code translate="no">HNSW</code> come tipo di indice e il tipo di metrica della serie <code translate="no">MAX_SIM</code> per misurare le somiglianze tra gli elenchi di incorporazioni.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;captions[plain_cap_vector]&quot;</span>, 
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>, 
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>, 
    index_name=<span class="hljs-string">&quot;captions_plain_cap_vector_idx&quot;</span>, <span class="hljs-comment"># mandatory for now</span>
    index_params={<span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>, <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">200</span>}
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;captions[rich_cap_vector]&quot;</span>, 
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>, 
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>, 
    index_name=<span class="hljs-string">&quot;captions_rich_cap_vector_idx&quot;</span>, <span class="hljs-comment"># mandatory for now</span>
    index_params={<span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>, <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">200</span>}
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;captions[risk_vector]&quot;</span>, 
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>, 
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>, 
    index_name=<span class="hljs-string">&quot;captions_risk_vector_idx&quot;</span>, <span class="hljs-comment"># mandatory for now</span>
    index_params={<span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>, <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">200</span>}
)
<button class="copy-code-btn"></button></code></pre>
<p>Si consiglia di abilitare la triturazione JSON per i campi JSON, per accelerare il filtraggio all'interno di questi campi.</p>
<h3 id="Step-4-Create-a-collection" class="common-anchor-header">Passo 4: Creare una raccolta<button data-href="#Step-4-Create-a-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Una volta che gli schemi e gli indici sono pronti, è possibile creare la raccolta di destinazione come segue:</p>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;covla_dataset&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-5-Insert-the-data" class="common-anchor-header">Passo 5: Inserire i dati<button data-href="#Step-5-Insert-the-data" class="anchor-icon" translate="no">
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
    </button></h3><p>Turing Motos organizza il set di dati CoVLA in più file, tra cui i video grezzi (<code translate="no">.mp4</code>), gli stati (<code translate="no">states.jsonl</code>), le didascalie (<code translate="no">captions.jsonl</code>), i semafori (<code translate="no">traffic_lights.jsonl</code>) e le auto frontali (<code translate="no">front_cars.jsonl</code>).</p>
<p>È necessario unire i dati per ciascun video clip da questi file e inserire i dati. Di seguito è riportato lo script per unire i dati di uno specifico videoclip.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json
<span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

openai_client = OpenAI(
    api_key=<span class="hljs-string">&#x27;YOUR_OPENAI_API_KEY&#x27;</span>,
)

video_id = <span class="hljs-string">&quot;0a0fc7a5db365174&quot;</span> <span class="hljs-comment"># represent a single video with 600 frames</span>

<span class="hljs-comment"># get all front car records in the specified video clip</span>
entries = []
front_cars = []
<span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(<span class="hljs-string">&#x27;data/front_car/{}.jsonl&#x27;</span>.<span class="hljs-built_in">format</span>(video_id), <span class="hljs-string">&#x27;r&#x27;</span>) <span class="hljs-keyword">as</span> f:
    <span class="hljs-keyword">for</span> line <span class="hljs-keyword">in</span> f:
        entries.append(json.loads(line))

<span class="hljs-keyword">for</span> entry <span class="hljs-keyword">in</span> entries:
    <span class="hljs-keyword">for</span> key, value <span class="hljs-keyword">in</span> entry.items():
        value[<span class="hljs-string">&#x27;frame_id&#x27;</span>] = <span class="hljs-built_in">int</span>(key)
        front_cars.append(value)

<span class="hljs-comment"># get all traffic lights identified in the specified video clip</span>
entries = []
traffic_lights = []
frame_id = <span class="hljs-number">0</span>
<span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(<span class="hljs-string">&#x27;data/traffic_lights/{}.jsonl&#x27;</span>.<span class="hljs-built_in">format</span>(video_id), <span class="hljs-string">&#x27;r&#x27;</span>) <span class="hljs-keyword">as</span> f:
    <span class="hljs-keyword">for</span> line <span class="hljs-keyword">in</span> f:
        entries.append(json.loads(line))

<span class="hljs-keyword">for</span> entry <span class="hljs-keyword">in</span> entries:
    <span class="hljs-keyword">for</span> key, value <span class="hljs-keyword">in</span> entry.items():
        <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> value <span class="hljs-keyword">or</span> (value[<span class="hljs-string">&#x27;index&#x27;</span>] == <span class="hljs-number">1</span> <span class="hljs-keyword">and</span> key != <span class="hljs-string">&#x27;0&#x27;</span>):
            frame_id+=<span class="hljs-number">1</span>

        <span class="hljs-keyword">if</span> value:
            value[<span class="hljs-string">&#x27;frame_id&#x27;</span>] = frame_id
            traffic_lights.append(value)
        <span class="hljs-keyword">else</span>:
            value_dict = {}
            value_dict[<span class="hljs-string">&#x27;frame_id&#x27;</span>] = frame_id
            traffic_lights.append(value_dict)

<span class="hljs-comment"># get all captions generated in the video clip and convert them into vector embeddings</span>
entries = []
captions = []
<span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(<span class="hljs-string">&#x27;data/captions/{}.jsonl&#x27;</span>.<span class="hljs-built_in">format</span>(video_id), <span class="hljs-string">&#x27;r&#x27;</span>) <span class="hljs-keyword">as</span> f:
    <span class="hljs-keyword">for</span> line <span class="hljs-keyword">in</span> f:
        entries.append(json.loads(line))

<span class="hljs-keyword">def</span> <span class="hljs-title function_">get_embedding</span>(<span class="hljs-params">text, model=<span class="hljs-string">&quot;embeddinggemma:latest&quot;</span></span>):
    response = openai_client.embeddings.create(<span class="hljs-built_in">input</span>=text, model=model)
    <span class="hljs-keyword">return</span> response.data[<span class="hljs-number">0</span>].embedding

<span class="hljs-comment"># Add embeddings to each entry</span>
<span class="hljs-keyword">for</span> entry <span class="hljs-keyword">in</span> entries:
    <span class="hljs-comment"># Each entry is a dict with a single key (e.g., &#x27;0&#x27;, &#x27;1&#x27;, ...)</span>
    <span class="hljs-keyword">for</span> key, value <span class="hljs-keyword">in</span> entry.items():
        value[<span class="hljs-string">&#x27;frame_id&#x27;</span>] = <span class="hljs-built_in">int</span>(key)  <span class="hljs-comment"># Convert key to integer and assign to frame_id</span>

        <span class="hljs-keyword">if</span> <span class="hljs-string">&quot;plain_caption&quot;</span> <span class="hljs-keyword">in</span> value <span class="hljs-keyword">and</span> value[<span class="hljs-string">&quot;plain_caption&quot;</span>]:
            value[<span class="hljs-string">&quot;plain_cap_vector&quot;</span>] = get_embedding(value[<span class="hljs-string">&quot;plain_caption&quot;</span>])
        <span class="hljs-keyword">if</span> <span class="hljs-string">&quot;rich_caption&quot;</span> <span class="hljs-keyword">in</span> value <span class="hljs-keyword">and</span> value[<span class="hljs-string">&quot;rich_caption&quot;</span>]:
            value[<span class="hljs-string">&quot;rich_cap_vector&quot;</span>] = get_embedding(value[<span class="hljs-string">&quot;rich_caption&quot;</span>])
        <span class="hljs-keyword">if</span> <span class="hljs-string">&quot;risk&quot;</span> <span class="hljs-keyword">in</span> value <span class="hljs-keyword">and</span> value[<span class="hljs-string">&quot;risk&quot;</span>]:
            value[<span class="hljs-string">&quot;risk_vector&quot;</span>] = get_embedding(value[<span class="hljs-string">&quot;risk&quot;</span>])

        captions.append(value)

data = {
    <span class="hljs-string">&quot;video_id&quot;</span>: video_id,
    <span class="hljs-string">&quot;video_url&quot;</span>: <span class="hljs-string">&quot;https://your-storage.com/{}&quot;</span>.<span class="hljs-built_in">format</span>(video_id),
    <span class="hljs-string">&quot;captions&quot;</span>: captions,
    <span class="hljs-string">&quot;traffic_lights&quot;</span>: traffic_lights,
    <span class="hljs-string">&quot;front_cars&quot;</span>: front_cars
}
<button class="copy-code-btn"></button></code></pre>
<p>Una volta elaborati i dati, è possibile inserirli come segue:</p>
<pre><code translate="no" class="language-python">client.insert(
    collection_name=<span class="hljs-string">&quot;covla_dataset&quot;</span>,
    data=[data]
)

<span class="hljs-comment"># {&#x27;insert_count&#x27;: 1, &#x27;ids&#x27;: [&#x27;0a0fc7a5db365174&#x27;], &#x27;cost&#x27;: 0}</span>
<button class="copy-code-btn"></button></code></pre>
