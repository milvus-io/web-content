---
id: integrate_with_dspy.md
summary: >-
  Esta guía muestra cómo utilizar MilvusRM, uno de los módulos recuperadores de
  DSPy, para optimizar los programas RAG.
title: Integrar Milvus con DSPy
---
<h1 id="Integrate-Milvus-with-DSPy" class="common-anchor-header">Integrar Milvus con DSPy<button data-href="#Integrate-Milvus-with-DSPy" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/milvus_and_DSPy.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/milvus_and_DSPy.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<h2 id="What-is-DSPy" class="common-anchor-header">Qué es DSPy<button data-href="#What-is-DSPy" class="anchor-icon" translate="no">
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
    </button></h2><p>DSPy, introducido por el Stanford NLP Group, es un marco programático innovador diseñado para optimizar las indicaciones y los pesos dentro de los modelos lingüísticos, especialmente valioso en escenarios en los que se integran grandes modelos lingüísticos (LLM) en múltiples etapas de un proceso. A diferencia de las técnicas convencionales de ingeniería de avisos, que dependen de la elaboración y los ajustes manuales, DSPy adopta un enfoque basado en el aprendizaje. Mediante la asimilación de ejemplos de preguntas-respuestas, DSPy genera mensajes optimizados de forma dinámica, adaptados a tareas específicas. Esta metodología innovadora permite reensamblar sin problemas cadenas enteras, eliminando la necesidad de realizar continuos ajustes manuales de las instrucciones. La sintaxis pitónica de DSPy ofrece varios módulos componibles y declarativos, simplificando la instrucción de los LLM.</p>
<h2 id="Benefits-of-using-DSPy" class="common-anchor-header">Ventajas del uso de DSPy<button data-href="#Benefits-of-using-DSPy" class="anchor-icon" translate="no">
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
<li>Enfoque de programación: DSPy proporciona un enfoque de programación sistemático para el desarrollo de canalizaciones LM mediante la abstracción de canalizaciones como gráficos de transformación de texto en lugar de limitarse a indicar los LLM. Sus módulos declarativos permiten el diseño estructurado y la optimización, sustituyendo el método de ensayo y error de las plantillas tradicionales.</li>
<li>Mejora del rendimiento: DSPy demuestra una mejora significativa del rendimiento con respecto a los métodos existentes. A través de estudios de casos, supera a los avisos estándar y a las demostraciones creadas por expertos, mostrando su versatilidad y eficacia incluso cuando se compila en modelos LM más pequeños.</li>
<li>Abstracción modularizada: DSPy abstrae eficazmente los aspectos intrincados del desarrollo de canalizaciones LM, como la descomposición, el ajuste fino y la selección de modelos. Con DSPy, un programa conciso puede traducirse perfectamente en instrucciones para varios modelos, como GPT-4, Llama2-13b o T5-base, agilizando el desarrollo y mejorando el rendimiento.</li>
</ul>
<h2 id="Modules" class="common-anchor-header">Módulos<button data-href="#Modules" class="anchor-icon" translate="no">
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
    </button></h2><p>Existen numerosos componentes que contribuyen a construir un canal LLM. A continuación, describiremos algunos componentes clave para proporcionar una comprensión de alto nivel del funcionamiento de DSPy.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/dspy-01.png" alt="DSPy Modules" class="doc-image" id="dspy-modules" />
   </span> <span class="img-wrapper"> <span>Módulos DSPy</span> </span></p>
<p>Firma: Las firmas en DSPy sirven como especificaciones declarativas, delineando el comportamiento de entrada/salida de los módulos, guiando el modelo de lenguaje en la ejecución de tareas. Módulo: Los módulos DSPy sirven como componentes fundamentales para los programas que aprovechan los modelos de lenguaje (LM). Abstraen diversas técnicas de instrucción, como la cadena de pensamiento o ReAct, y son adaptables para manejar cualquier firma DSPy. Con parámetros aprendibles y la capacidad de procesar entradas y producir salidas, estos módulos pueden combinarse para formar programas más amplios, inspirándose en los módulos NN de PyTorch pero adaptados a las aplicaciones LM. Optimizador: Los optimizadores en DSPy ajustan los parámetros de los programas DSPy, como las indicaciones y los pesos LLM, para maximizar las métricas especificadas como la precisión, mejorando la eficiencia del programa.</p>
<h2 id="Why-Milvus-in-DSPy" class="common-anchor-header">Por qué Milvus en DSPy<button data-href="#Why-Milvus-in-DSPy" class="anchor-icon" translate="no">
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
    </button></h2><p>DSPy es un potente marco de programación que potencia las aplicaciones RAG. Estas aplicaciones necesitan recuperar información útil para mejorar la calidad de las respuestas, lo que requiere una base de datos vectorial. Milvus es una conocida base de datos vectorial de código abierto para mejorar el rendimiento y la escalabilidad. Con MilvusRM, un módulo recuperador en DSPy, la integración de Milvus se realiza sin problemas. Ahora, los desarrolladores pueden definir y optimizar fácilmente programas RAG utilizando DSPy, aprovechando las potentes capacidades de búsqueda vectorial de Milvus. Esta colaboración hace que las aplicaciones RAG sean más eficientes y escalables, combinando las capacidades de programación de DSPy con las funciones de búsqueda de Milvus.</p>
<h2 id="Examples" class="common-anchor-header">Ejemplos<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Ahora, vamos a recorrer un ejemplo rápido para demostrar cómo aprovechar Milvus en DSPy para optimizar una aplicación RAG.</p>
<h3 id="Prerequisites" class="common-anchor-header">Requisitos previos</h3><p>Antes de construir la aplicación RAG, instale DSPy y PyMilvus.</p>
<pre><code translate="no" class="language-python">$ pip install <span class="hljs-string">&quot;dspy-ai[milvus]&quot;</span>
$ pip install -U pymilvus
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Si estás usando Google Colab, para habilitar las dependencias recién instaladas, puede que necesites **reiniciar el runtime** (Haz click en el menú "Runtime" en la parte superior de la pantalla, y selecciona "Restart session" del menú desplegable).</div>
<h3 id="Loading-the-dataset" class="common-anchor-header">Cargar el conjunto de datos</h3><p>En este ejemplo, utilizamos HotPotQA, una colección de pares de preguntas-respuestas complejas, como nuestro conjunto de datos de entrenamiento. Podemos cargarlos a través de la clase HotPotQA.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> dspy.datasets <span class="hljs-keyword">import</span> HotPotQA

<span class="hljs-comment"># Load the dataset.</span>
dataset = HotPotQA(
    train_seed=<span class="hljs-number">1</span>, train_size=<span class="hljs-number">20</span>, eval_seed=<span class="hljs-number">2023</span>, dev_size=<span class="hljs-number">50</span>, test_size=<span class="hljs-number">0</span>
)

<span class="hljs-comment"># Tell DSPy that the &#x27;question&#x27; field is the input. Any other fields are labels and/or metadata.</span>
trainset = [x.with_inputs(<span class="hljs-string">&quot;question&quot;</span>) <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> dataset.train]
devset = [x.with_inputs(<span class="hljs-string">&quot;question&quot;</span>) <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> dataset.dev]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Ingest-data-into-the-Milvus-vector-database" class="common-anchor-header">Ingesta de datos en la base de datos vectorial Milvus</h3><p>Introduzca la información contextual en la colección Milvus para la recuperación de vectores. Esta colección debe tener un campo <code translate="no">embedding</code> y un campo <code translate="no">text</code>. En este caso utilizamos el modelo <code translate="no">text-embedding-3-small</code> de OpenAI como función de incrustación de consultas por defecto.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> requests
<span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;&lt;YOUR_OPENAI_API_KEY&gt;&quot;</span>
MILVUS_URI = <span class="hljs-string">&quot;example.db&quot;</span>
MILVUS_TOKEN = <span class="hljs-string">&quot;&quot;</span>

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Collection
<span class="hljs-keyword">from</span> dspy.retrieve.milvus_rm <span class="hljs-keyword">import</span> openai_embedding_function

client = MilvusClient(uri=MILVUS_URI, token=MILVUS_TOKEN)

<span class="hljs-keyword">if</span> <span class="hljs-string">&quot;dspy_example&quot;</span> <span class="hljs-keyword">not</span> <span class="hljs-keyword">in</span> client.list_collections():
    client.create_collection(
        collection_name=<span class="hljs-string">&quot;dspy_example&quot;</span>,
        overwrite=<span class="hljs-literal">True</span>,
        dimension=<span class="hljs-number">1536</span>,
        primary_field_name=<span class="hljs-string">&quot;id&quot;</span>,
        vector_field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
        id_type=<span class="hljs-string">&quot;int&quot;</span>,
        metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
        max_length=<span class="hljs-number">65535</span>,
        enable_dynamic=<span class="hljs-literal">True</span>,
    )
text = requests.get(
    <span class="hljs-string">&quot;https://raw.githubusercontent.com/wxywb/dspy_dataset_sample/master/sample_data.txt&quot;</span>
).text

<span class="hljs-keyword">for</span> idx, passage <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(text.split(<span class="hljs-string">&quot;\n&quot;</span>)):
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(passage) == <span class="hljs-number">0</span>:
        <span class="hljs-keyword">continue</span>
    client.insert(
        collection_name=<span class="hljs-string">&quot;dspy_example&quot;</span>,
        data=[
            {
                <span class="hljs-string">&quot;id&quot;</span>: idx,
                <span class="hljs-string">&quot;embedding&quot;</span>: openai_embedding_function(passage)[<span class="hljs-number">0</span>],
                <span class="hljs-string">&quot;text&quot;</span>: passage,
            }
        ],
    )
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-MilvusRM" class="common-anchor-header">Definir MilvusRM.</h3><p>Ahora tiene que definir el MilvusRM.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> dspy.retrieve.milvus_rm <span class="hljs-keyword">import</span> MilvusRM
<span class="hljs-keyword">import</span> dspy

retriever_model = MilvusRM(
    collection_name=<span class="hljs-string">&quot;dspy_example&quot;</span>,
    uri=MILVUS_URI,
    token=MILVUS_TOKEN,  <span class="hljs-comment"># ignore this if no token is required for Milvus connection</span>
    embedding_function=openai_embedding_function,
)
turbo = dspy.OpenAI(model=<span class="hljs-string">&quot;gpt-3.5-turbo&quot;</span>)
dspy.settings.configure(lm=turbo)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Building-signatures" class="common-anchor-header">Creación de firmas</h3><p>Ahora que hemos cargado los datos, empecemos a definir las firmas para las subtareas de nuestro pipeline. Podemos identificar nuestra simple entrada <code translate="no">question</code> y salida <code translate="no">answer</code>, pero dado que estamos construyendo un pipeline RAG, recuperaremos información contextual de Milvus. Así que vamos a definir nuestra firma como <code translate="no">context, question --&gt; answer</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">GenerateAnswer</span>(dspy.Signature):
    <span class="hljs-string">&quot;&quot;&quot;Answer questions with short factoid answers.&quot;&quot;&quot;</span>

    context = dspy.InputField(desc=<span class="hljs-string">&quot;may contain relevant facts&quot;</span>)
    question = dspy.InputField()
    answer = dspy.OutputField(desc=<span class="hljs-string">&quot;often between 1 and 5 words&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Incluimos breves descripciones de los campos <code translate="no">context</code> y <code translate="no">answer</code> para definir directrices más claras sobre lo que el modelo recibirá y deberá generar.</p>
<h3 id="Building-the-pipeline" class="common-anchor-header">Construcción de la canalización</h3><p>Ahora vamos a definir el proceso RAG.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">RAG</span>(dspy.Module):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, rm</span>):
        <span class="hljs-built_in">super</span>().__init__()
        <span class="hljs-variable language_">self</span>.retrieve = rm

        <span class="hljs-comment"># This signature indicates the task imposed on the COT module.</span>
        <span class="hljs-variable language_">self</span>.generate_answer = dspy.ChainOfThought(GenerateAnswer)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">forward</span>(<span class="hljs-params">self, question</span>):
        <span class="hljs-comment"># Use milvus_rm to retrieve context for the question.</span>
        context = <span class="hljs-variable language_">self</span>.retrieve(question).passages
        <span class="hljs-comment"># COT module takes &quot;context, query&quot; and output &quot;answer&quot;.</span>
        prediction = <span class="hljs-variable language_">self</span>.generate_answer(context=context, question=question)
        <span class="hljs-keyword">return</span> dspy.Prediction(
            context=[item.long_text <span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> context], answer=prediction.answer
        )
<button class="copy-code-btn"></button></code></pre>
<h3 id="Executing-the-pipeline-and-getting-the-results" class="common-anchor-header">Ejecutar el proceso y obtener los resultados</h3><p>Ahora, hemos construido esta canalización RAG. Probémosla y obtengamos resultados.</p>
<pre><code translate="no" class="language-python">rag = RAG(retriever_model)
<span class="hljs-built_in">print</span>(rag(<span class="hljs-string">&quot;who write At My Window&quot;</span>).answer)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Townes Van Zandt
</code></pre>
<p>Podemos evaluar los resultados cuantitativos en el conjunto de datos.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> dspy.evaluate.evaluate <span class="hljs-keyword">import</span> Evaluate
<span class="hljs-keyword">from</span> dspy.datasets <span class="hljs-keyword">import</span> HotPotQA

evaluate_on_hotpotqa = Evaluate(
    devset=devset, num_threads=<span class="hljs-number">1</span>, display_progress=<span class="hljs-literal">False</span>, display_table=<span class="hljs-number">5</span>
)

metric = dspy.evaluate.answer_exact_match
score = evaluate_on_hotpotqa(rag, metric=metric)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;rag:&quot;</span>, score)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Optimizing-the-pipeline" class="common-anchor-header">Optimización del programa</h3><p>Después de definir este programa, el siguiente paso es la compilación. Este proceso actualiza los parámetros dentro de cada módulo para mejorar el rendimiento. El proceso de compilación depende de tres factores críticos:</p>
<ul>
<li>Conjunto de entrenamiento: Utilizaremos los 20 ejemplos de pregunta-respuesta de nuestro conjunto de datos de entrenamiento para esta demostración.</li>
<li>Métrica de validación: Estableceremos una métrica sencilla <code translate="no">validate_context_and_answer</code>. Esta métrica verifica la precisión de la respuesta predicha y garantiza que el contexto recuperado incluye la respuesta.</li>
<li>Optimizador específico (Teleprompter): El compilador de DSPy incorpora múltiples teleprompters diseñados para optimizar sus programas de forma efectiva.</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> dspy.teleprompt <span class="hljs-keyword">import</span> BootstrapFewShot

<span class="hljs-comment"># Validation logic: check that the predicted answer is correct.# Also check that the retrieved context does contain that answer.</span>


<span class="hljs-keyword">def</span> <span class="hljs-title function_">validate_context_and_answer</span>(<span class="hljs-params">example, pred, trace=<span class="hljs-literal">None</span></span>):
    answer_EM = dspy.evaluate.answer_exact_match(example, pred)
    answer_PM = dspy.evaluate.answer_passage_match(example, pred)
    <span class="hljs-keyword">return</span> answer_EM <span class="hljs-keyword">and</span> answer_PM


<span class="hljs-comment"># Set up a basic teleprompter, which will compile our RAG program.</span>
teleprompter = BootstrapFewShot(metric=validate_context_and_answer)

<span class="hljs-comment"># Compile!</span>
compiled_rag = teleprompter.<span class="hljs-built_in">compile</span>(rag, trainset=trainset)

<span class="hljs-comment"># Now compiled_rag is optimized and ready to answer your new question!</span>
<span class="hljs-comment"># Now, let’s evaluate the compiled RAG program.</span>
score = evaluate_on_hotpotqa(compiled_rag, metric=metric)
<span class="hljs-built_in">print</span>(score)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;compile_rag:&quot;</span>, score)
<button class="copy-code-btn"></button></code></pre>
<p>La puntuación de Ragas ha aumentado de su valor anterior de 50,0 a 52,0, lo que indica una mejora en la calidad de la respuesta.</p>
<h2 id="Summary" class="common-anchor-header">Resumen<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h2><p>DSPy marca un salto en las interacciones de los modelos lingüísticos gracias a su interfaz programable, que facilita la optimización algorítmica y automatizada de los teleprompters y pesos de los modelos. Al aprovechar DSPy para la implementación de la GAR, la adaptabilidad a diferentes modelos lingüísticos o conjuntos de datos se convierte en un juego de niños, reduciendo drásticamente la necesidad de tediosas intervenciones manuales.</p>
