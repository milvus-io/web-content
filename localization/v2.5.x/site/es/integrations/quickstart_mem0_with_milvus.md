---
id: quickstart_mem0_with_milvus.md
summary: >-
  En este tutorial, cubriremos las operaciones esenciales de gestión de memoria
  de Mem0 -añadir, recuperar, actualizar, buscar, borrar y rastrear el historial
  de memoria- utilizando Milvus, una base de datos vectorial de alto rendimiento
  y código abierto que potencia el almacenamiento y la recuperación eficientes.
  Esta introducción práctica le guiará a través de las operaciones básicas de
  memoria para ayudarle a crear interacciones de IA personalizadas con Mem0 y
  Milvus.
title: Primeros pasos con Mem0 y Milvus
---
<h1 id="Getting-Started-with-Mem0-and-Milvus" class="common-anchor-header">Primeros pasos con Mem0 y Milvus<button data-href="#Getting-Started-with-Mem0-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/quickstart_mem0_with_milvus.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/quickstart_mem0_with_milvus.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p><a href="https://mem0.ai/">Mem0</a> es una capa de memoria inteligente para aplicaciones de IA, diseñada para ofrecer interacciones personalizadas y eficientes reteniendo las preferencias del usuario y adaptándose continuamente a lo largo del tiempo. Ideal para chatbots y herramientas basadas en IA, Mem0 crea experiencias fluidas y conscientes del contexto.</p>
<p>En este tutorial, cubriremos las operaciones esenciales de gestión de memoria de Mem0 (añadir, recuperar, actualizar, buscar, eliminar y realizar un seguimiento del historial de memoria) utilizando <a href="https://milvus.io/">Milvus</a>, una base de datos vectorial de código abierto y alto rendimiento que permite un almacenamiento y una recuperación eficientes. Esta introducción práctica le guiará a través de las operaciones básicas de memoria para ayudarle a crear interacciones de IA personalizadas con Mem0 y Milvus.</p>
<h2 id="Preparation" class="common-anchor-header">Preparación<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Download-required-libraries" class="common-anchor-header">Descarga de las bibliotecas necesarias</h3><pre><code translate="no" class="language-shell">$ pip install mem0ai pymilvus
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>Si utilizas Google Colab, para habilitar las dependencias que acabas de instalar, es posible que tengas que <strong>reiniciar el tiempo de ejecución</strong> (haz clic en el menú "Tiempo de ejecución" en la parte superior de la pantalla y selecciona "Reiniciar sesión" en el menú desplegable).</p>
</blockquote>
<h3 id="Configure-Mem0-with-Milvus" class="common-anchor-header">Configurar Mem0 con Milvus</h3><p>En este ejemplo utilizaremos OpenAI como LLM. Deberías preparar la <a href="https://platform.openai.com/docs/quickstart">clave api</a> <code translate="no">OPENAI_API_KEY</code> como variable de entorno.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ahora, podemos configurar Mem0 para usar Milvus como almacén de vectores</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define Config</span>
<span class="hljs-keyword">from</span> mem0 <span class="hljs-keyword">import</span> Memory

config = {
    <span class="hljs-string">&quot;vector_store&quot;</span>: {
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;milvus&quot;</span>,
        <span class="hljs-string">&quot;config&quot;</span>: {
            <span class="hljs-string">&quot;collection_name&quot;</span>: <span class="hljs-string">&quot;quickstart_mem0_with_milvus&quot;</span>,
            <span class="hljs-string">&quot;embedding_model_dims&quot;</span>: <span class="hljs-string">&quot;1536&quot;</span>,
            <span class="hljs-string">&quot;url&quot;</span>: <span class="hljs-string">&quot;./milvus.db&quot;</span>,  <span class="hljs-comment"># Use local vector database for demo purpose</span>
        },
    },
    <span class="hljs-string">&quot;version&quot;</span>: <span class="hljs-string">&quot;v1.1&quot;</span>,
}

m = Memory.from_config(config)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<blockquote>
<ul>
<li>Si sólo necesitas una base de datos de vectores local para datos a pequeña escala o prototipado, configurar la uri como un archivo local, por ejemplo<code translate="no">./milvus.db</code>, es el método más conveniente, ya que automáticamente utiliza <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> para almacenar todos los datos en este archivo.</li>
<li>Si tiene una gran escala de datos, digamos más de un millón de vectores, puede configurar un servidor Milvus más eficiente en <a href="https://milvus.io/docs/quickstart.md">Docker o Kubernetes</a>. En esta configuración, por favor utilice la dirección del servidor y el puerto como su uri, por ejemplo<code translate="no">http://localhost:19530</code>. Si habilita la función de autenticación en Milvus, utilice "&lt;su_nombre_de_usuario&gt;:&lt;su_contraseña&gt;" como token, de lo contrario no configure el token.</li>
<li>Si utiliza <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, el servicio en la nube totalmente gestionado para Milvus, ajuste <code translate="no">uri</code> y <code translate="no">token</code>, que corresponden al <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">punto final público y a la clave API</a> en Zilliz Cloud.</li>
</ul>
</blockquote>
</div>
<h2 id="Managing-User-Memories-with-Mem0-and-Milvus" class="common-anchor-header">Gestión de memorias de usuario con Mem0 y Milvus<button data-href="#Managing-User-Memories-with-Mem0-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Adding-a-Memory" class="common-anchor-header">Añadir una memoria</h3><p>La función <code translate="no">add</code> almacena texto no estructurado en Milvus como una memoria, asociándolo con un usuario específico y metadatos opcionales.</p>
<p>Aquí, estamos añadiendo la memoria de Alice, "trabajando en mejorar mis habilidades de tenis", junto con metadatos relevantes para el contexto de Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add a memory to user: Working on improving tennis skills</span>
res = m.add(
    messages=<span class="hljs-string">&quot;I am working on improving my tennis skills.&quot;</span>,
    user_id=<span class="hljs-string">&quot;alice&quot;</span>,
    metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;hobbies&quot;</span>},
)

res
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'results': [{'id': '77162018-663b-4dfa-88b1-4f029d6136ab',
   'memory': 'Working on improving tennis skills',
   'event': 'ADD'}],
 'relations': []}
</code></pre>
<h3 id="Update-a-Memory" class="common-anchor-header">Actualizar una memoria</h3><p>Podemos utilizar el valor de retorno de la función <code translate="no">add</code> para recuperar el ID de la memoria, lo que nos permite actualizar esta memoria con nueva información a través de <code translate="no">update</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get memory_id</span>
memory_id = res[<span class="hljs-string">&quot;results&quot;</span>][<span class="hljs-number">0</span>][<span class="hljs-string">&quot;id&quot;</span>]

<span class="hljs-comment"># Update this memory with new information: Likes to play tennis on weekends</span>
m.update(memory_id=memory_id, data=<span class="hljs-string">&quot;Likes to play tennis on weekends&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'message': 'Memory updated successfully!'}
</code></pre>
<h3 id="Get-All-Memory-For-a-User" class="common-anchor-header">Obtener todas las memorias de un usuario</h3><p>Podemos utilizar la función <code translate="no">get_all</code> para ver todas las memorias insertadas o filtrar por <code translate="no">user_id</code> en Milvus.</p>
<p>Observe que la memoria ha cambiado de &quot;Trabajando para mejorar sus habilidades tenísticas&quot; a &quot;Le gusta jugar al tenis los fines de semana&quot;.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get all memory for the user Alice</span>
m.get_all(user_id=<span class="hljs-string">&quot;alice&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'results': [{'id': '77162018-663b-4dfa-88b1-4f029d6136ab',
   'memory': 'Likes to play tennis on weekends',
   'hash': '4c3bc9f87b78418f19df6407bc86e006',
   'metadata': None,
   'created_at': '2024-11-01T19:33:44.116920-07:00',
   'updated_at': '2024-11-01T19:33:47.619857-07:00',
   'user_id': 'alice'}]}
</code></pre>
<h3 id="View-Memory-Update-History" class="common-anchor-header">Ver el historial de actualizaciones de la memoria</h3><p>También podemos ver el historial de actualización de la memoria especificando qué memory_id nos interesa a través de la función <code translate="no">history</code>.</p>
<pre><code translate="no" class="language-python">m.history(memory_id=memory_id)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[{'id': '71ed3cec-5d9a-4fa6-a009-59802450c0b9',
  'memory_id': '77162018-663b-4dfa-88b1-4f029d6136ab',
  'old_memory': None,
  'new_memory': 'Working on improving tennis skills',
  'event': 'ADD',
  'created_at': '2024-11-01T19:33:44.116920-07:00',
  'updated_at': None},
 {'id': 'db2b003c-ffb7-42e4-bd8a-b9cf56a02bb9',
  'memory_id': '77162018-663b-4dfa-88b1-4f029d6136ab',
  'old_memory': 'Working on improving tennis skills',
  'new_memory': 'Likes to play tennis on weekends',
  'event': 'UPDATE',
  'created_at': '2024-11-01T19:33:44.116920-07:00',
  'updated_at': '2024-11-01T19:33:47.619857-07:00'}]
</code></pre>
<h3 id="Search-Memory" class="common-anchor-header">Buscar memoria</h3><p>Podemos utilizar la función <code translate="no">search</code> para buscar la memoria más relacionada con el usuario.</p>
<p>Empecemos añadiendo otra memoria para Alice.</p>
<pre><code translate="no" class="language-python">new_mem = m.<span class="hljs-keyword">add</span>(
    <span class="hljs-string">&quot;I have a linear algebra midterm exam on November 20&quot;</span>,
    user_id=<span class="hljs-string">&quot;alice&quot;</span>,
    metadata={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;task&quot;</span>},
)
<button class="copy-code-btn"></button></code></pre>
<p>Ahora, llamamos a <code translate="no">get_all</code> especificando el user_id para verificar que efectivamente tenemos 2 entradas de memoria para el usuario Alice.</p>
<pre><code translate="no" class="language-python">m.<span class="hljs-title function_">get_all</span>(user_id=<span class="hljs-string">&quot;alice&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'results': [{'id': '77162018-663b-4dfa-88b1-4f029d6136ab',
   'memory': 'Likes to play tennis on weekends',
   'hash': '4c3bc9f87b78418f19df6407bc86e006',
   'metadata': None,
   'created_at': '2024-11-01T19:33:44.116920-07:00',
   'updated_at': '2024-11-01T19:33:47.619857-07:00',
   'user_id': 'alice'},
  {'id': 'aa8eaa38-74d6-4b58-8207-b881d6d93d02',
   'memory': 'Has a linear algebra midterm exam on November 20',
   'hash': '575182f46965111ca0a8279c44920ea2',
   'metadata': {'category': 'task'},
   'created_at': '2024-11-01T19:33:57.271657-07:00',
   'updated_at': None,
   'user_id': 'alice'}]}
</code></pre>
<p>Ahora podemos realizar <code translate="no">search</code> proporcionando <code translate="no">query</code> y <code translate="no">user_id</code>. Ten en cuenta que por defecto estamos utilizando la métrica <code translate="no">L2</code> para la búsqueda de similitud, por lo que un <code translate="no">score</code> más pequeño significa mayor similitud.</p>
<pre><code translate="no" class="language-python">m.<span class="hljs-title function_">search</span>(query=<span class="hljs-string">&quot;What are Alice&#x27;s hobbies&quot;</span>, user_id=<span class="hljs-string">&quot;alice&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'results': [{'id': '77162018-663b-4dfa-88b1-4f029d6136ab',
   'memory': 'Likes to play tennis on weekends',
   'hash': '4c3bc9f87b78418f19df6407bc86e006',
   'metadata': None,
   'score': 1.2807445526123047,
   'created_at': '2024-11-01T19:33:44.116920-07:00',
   'updated_at': '2024-11-01T19:33:47.619857-07:00',
   'user_id': 'alice'},
  {'id': 'aa8eaa38-74d6-4b58-8207-b881d6d93d02',
   'memory': 'Has a linear algebra midterm exam on November 20',
   'hash': '575182f46965111ca0a8279c44920ea2',
   'metadata': {'category': 'task'},
   'score': 1.728922724723816,
   'created_at': '2024-11-01T19:33:57.271657-07:00',
   'updated_at': None,
   'user_id': 'alice'}]}
</code></pre>
<h3 id="Delete-Memory" class="common-anchor-header">Borrar memoria</h3><p>También podemos <code translate="no">delete</code> una memoria proporcionando la correspondiente <code translate="no">memory_id</code>.</p>
<p>Eliminaremos la memoria "Le gusta jugar al tenis los fines de semana", ya que su <code translate="no">memory_id</code> ya ha sido recuperada, y llamaremos a <code translate="no">get_all</code> para verificar que la eliminación se ha realizado correctamente.</p>
<pre><code translate="no" class="language-python">m.<span class="hljs-built_in">delete</span>(memory_id=memory_id)

m.get_all(<span class="hljs-string">&quot;alice&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'results': [{'id': 'aa8eaa38-74d6-4b58-8207-b881d6d93d02',
   'memory': 'Has a linear algebra midterm exam on November 20',
   'hash': '575182f46965111ca0a8279c44920ea2',
   'metadata': {'category': 'task'},
   'created_at': '2024-11-01T19:33:57.271657-07:00',
   'updated_at': None,
   'user_id': 'alice'}]}
</code></pre>
