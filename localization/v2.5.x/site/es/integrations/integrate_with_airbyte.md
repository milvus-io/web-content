---
id: integrate_with_airbyte.md
summary: >-
  Airbyte es una infraestructura de movimiento de datos de código abierto para
  crear canalizaciones de datos de extracción y carga (EL). Está diseñada para
  ofrecer versatilidad, escalabilidad y facilidad de uso. El catálogo de
  conectores de Airbyte viene "listo para usar" con más de 350 conectores
  preconfigurados. Estos conectores pueden utilizarse para empezar a replicar
  datos de un origen a un destino en cuestión de minutos.
title: 'Airbyte: Infraestructura de movimiento de datos de código abierto'
---
<h1 id="Airbyte-Open-Source-Data-Movement-Infrastructure" class="common-anchor-header">Airbyte: Infraestructura de movimiento de datos de código abierto<button data-href="#Airbyte-Open-Source-Data-Movement-Infrastructure" class="anchor-icon" translate="no">
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
    </button></h1><p>Airbyte es una infraestructura de movimiento de datos de código abierto para crear canalizaciones de datos de extracción y carga (EL). Está diseñada para ofrecer versatilidad, escalabilidad y facilidad de uso. El catálogo de conectores de Airbyte viene "listo para usar" con más de 350 conectores preconfigurados. Estos conectores pueden utilizarse para empezar a replicar datos de un origen a un destino en cuestión de minutos.</p>
<h2 id="Major-Components-of-Airbyte" class="common-anchor-header">Principales componentes de Airbyte<button data-href="#Major-Components-of-Airbyte" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Connector-Catalog" class="common-anchor-header">1. Catálogo de conectores</h3><ul>
<li><strong>Más de 350 conectores preconfigurados</strong>: El catálogo de conectores de Airbyte viene "listo para usar" con más de 350 conectores pre-construidos. Estos conectores se pueden utilizar para empezar a replicar datos de un origen a un destino en sólo unos minutos.</li>
<li><strong>Constructor de conectores sin código</strong>: Puede ampliar fácilmente la funcionalidad de Airbyte para soportar sus casos de uso personalizados a través de herramientas <a href="https://docs.airbyte.com/connector-development/connector-builder-ui/overview">como el No-Code Connector Builder</a>.</li>
</ul>
<h3 id="2-The-Platform" class="common-anchor-header">2. La plataforma</h3><p>La plataforma de Airbyte proporciona todos los servicios horizontales necesarios para configurar y escalar las operaciones de movimiento de datos, disponibles como <a href="https://airbyte.com/product/airbyte-cloud">gestionados en la nube</a> o <a href="https://airbyte.com/product/airbyte-enterprise">autogestionados</a>.</p>
<h3 id="3-The-User-Interface" class="common-anchor-header">3. La Interfaz de Usuario</h3><p>Airbyte cuenta con una interfaz de usuario, <a href="https://docs.airbyte.com/using-airbyte/pyairbyte/getting-started">PyAirbyte</a> (biblioteca Python), <a href="https://docs.airbyte.com/api-documentation">API</a> y <a href="https://docs.airbyte.com/terraform-documentation">Terraform Provider</a> para integrarse con sus herramientas y enfoque preferidos para la gestión de infraestructuras.</p>
<p>Con la capacidad de Airbyte, los usuarios pueden integrar fuentes de datos en el clúster Milvus para la búsqueda de similitudes.</p>
<h2 id="Before-You-Begin" class="common-anchor-header">Antes de empezar<button data-href="#Before-You-Begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Necesitará</p>
<ul>
<li>Cuenta de Zendesk (u otra fuente de datos desde la que desee sincronizar datos)</li>
<li>Cuenta Airbyte o instancia local</li>
<li>Clave API de OpenAI</li>
<li>Clúster Milvus</li>
<li>Python 3.10 instalado localmente</li>
</ul>
<h2 id="Set-Up-Milvus-Cluster" class="common-anchor-header">Configurar el clúster Milvus<button data-href="#Set-Up-Milvus-Cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Si ya ha desplegado un cluster K8s para producción, puede saltarse este paso y proceder directamente a <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus-Operator">desplegar Milvus Operator</a>. Si no, puede seguir <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Create-a-K8s-Cluster">los pasos</a> para desplegar un cluster Milvus con Milvus Operator.</p>
<p>Las entidades individuales (en nuestro caso, los tickets de soporte y los artículos de la base de conocimientos) se almacenan en una "colección" - una vez configurado el clúster, deberá crear una colección. Elija un nombre adecuado y establezca la Dimensión en 1536 para que coincida con la dimensionalidad vectorial generada por el servicio de incrustación de OpenAI.</p>
<p>Tras la creación, registra el endpoint y la información de <a href="https://milvus.io/docs/authenticate.md?tab=docker">autenticación</a>.</p>
<h2 id="Set-Up-Connection-in-Airbyte" class="common-anchor-header">Configurar la conexión en Airbyte<button data-href="#Set-Up-Connection-in-Airbyte" class="anchor-icon" translate="no">
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
    </button></h2><p>Nuestra base de datos está lista, ¡vamos a mover algunos datos! Para ello, necesitamos configurar una conexión en Airbyte. Regístrese para obtener una cuenta en la nube Airbyte en <a href="https://cloud.airbyte.com">cloud.airbyte.com</a> o inicie una instancia local como se describe <a href="https://docs.airbyte.com/using-airbyte/getting-started/">en la documentación</a>.</p>
<h3 id="Set-Up-Source" class="common-anchor-header">Configurar la fuente</h3><p>Una vez que su instancia esté funcionando, tenemos que configurar la conexión - haga clic en "Nueva conexión" y elija el conector "Zendesk Support" como la fuente. Después de hacer clic en el botón "Probar y guardar", Airbyte comprobará si se puede establecer la conexión.</p>
<p>En la nube de Airbyte, puede autenticarse fácilmente haciendo clic en el botón Autenticar. Si utiliza una instancia local de Airbyte, siga las instrucciones indicadas en la página <a href="https://docs.airbyte.com/integrations/sources/zendesk-support#airbyte-open-source-enable-api-token-access-and-generate-a-token">de documentación</a>.</p>
<h3 id="Set-Up-Destination" class="common-anchor-header">Configurar el destino</h3><p>Si todo funciona correctamente, el siguiente paso es configurar el destino al que mover los datos. Aquí, elija el conector "Milvus".</p>
<p>El conector Milvus hace tres cosas</p>
<ul>
<li><strong>Chunking y Formateo</strong> - Divide los registros de Zendesk en texto y metadatos. Si el texto es mayor que el tamaño de trozo especificado, los registros se dividen en varias partes que se cargan en la colección individualmente. La división de texto (o chunking) puede ocurrir, por ejemplo, en el caso de tickets de soporte o artículos de conocimiento de gran tamaño. Al dividir el texto, puede asegurarse de que las búsquedas siempre produzcan resultados útiles.</li>
</ul>
<p>Vamos a usar un tamaño de trozo de 1000 tokens y campos de texto de cuerpo, título, descripción y asunto, ya que estos estarán presentes en los datos que recibiremos de Zendesk.</p>
<ul>
<li><strong>Incrustación</strong> - El uso de modelos de aprendizaje automático transforma los trozos de texto producidos por la parte de procesamiento en incrustaciones vectoriales que luego puedes buscar por similitud semántica. Para crear las incrustaciones, debes proporcionar la clave de la API de OpenAI. Airbyte enviará cada trozo a OpenAI y añadirá el vector resultante a las entidades cargadas en su clúster Milvus.</li>
<li><strong>Indexación</strong> - Una vez que haya vectorizado los chunks, puede cargarlos en la base de datos. Para ello, inserta la información que obtuviste al configurar tu cluster y colección en Milvus cluster. <div><img translate="no" src="/docs/v2.5.x/assets/airbyte_with_milvus_1.png" width="40%"/></div> Haciendo clic en "Probar y guardar" comprobará si todo está alineado correctamente (credenciales válidas, la colección existe y tiene la misma dimensionalidad vectorial que la incrustación configurada, etc.)</li>
</ul>
<h3 id="Set-up-stream-sync-flow" class="common-anchor-header">Configurar el flujo de sincronización</h3><p>El último paso antes de que los datos estén listos para fluir es seleccionar qué "flujos" sincronizar. Un flujo es una colección de registros en la fuente. Como Zendesk soporta un gran número de flujos que no son relevantes para nuestro caso de uso, vamos a seleccionar sólo "tickets" y "artículos" y desactivar todos los demás para ahorrar ancho de banda y asegurarnos de que sólo la información relevante aparecerá en las búsquedas:<div><img translate="no" src="/docs/v2.5.x/assets/airbyte_with_milvus_2.png" width="40%"/></div> Puede seleccionar qué campos extraer de la fuente haciendo clic en el nombre del flujo. El modo de sincronización "Incremental | Append + Deduped" significa que las subsiguientes ejecuciones de la conexión mantienen a Zendesk y Milvus sincronizados mientras transfieren un mínimo de datos (solo los artículos y tickets que han cambiado desde la última ejecución).</p>
<p>En cuanto se establezca la conexión, Airbyte comenzará a sincronizar los datos. Puede tardar unos minutos en aparecer en su colección Milvus.</p>
<p>Si selecciona una frecuencia de replicación, Airbyte se ejecutará regularmente para mantener su colección de Milvus actualizada con los cambios en los artículos de Zendesk y los problemas recién creados.</p>
<h3 id="Check-flow" class="common-anchor-header">Comprobar el flujo</h3><p>Puede comprobar en la interfaz de usuario del clúster Milvus cómo están estructurados los datos en la colección navegando a la zona de juegos y ejecutando una consulta "Query Data" con un filtro establecido en "_ab_stream == \"tickets\"".<div><img translate="no" src="/docs/v2.5.x/assets/airbyte_with_milvus_3.png" width="40%"/></div> Como se puede ver en la vista Resultado, cada registro procedente de Zendesk se almacena como entidades separadas en Milvus con todos los metadatos especificados. El trozo de texto en el que se basa la incrustación se muestra como la propiedad "text" - este es el texto que se incrustó utilizando OpenAI y será lo que buscaremos.</p>
<h2 id="Build-Streamlit-app-querying-the-collection" class="common-anchor-header">Crear la aplicación Streamlit para consultar la colección<button data-href="#Build-Streamlit-app-querying-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Nuestros datos están listos - ahora tenemos que construir la aplicación para utilizarlos. En este caso, la aplicación será un simple formulario de soporte para que los usuarios envíen casos de soporte. Cuando el usuario pulse enviar, haremos dos cosas:</p>
<ul>
<li>Buscar tickets similares enviados por usuarios de la misma organización.</li>
<li>Buscar artículos basados en conocimientos que puedan ser relevantes para el usuario.</li>
</ul>
<p>En ambos casos, aprovecharemos la búsqueda semántica mediante incrustaciones de OpenAI. Para ello, la descripción del problema introducida por el usuario también se incrusta y se utiliza para recuperar entidades similares del clúster Milvus. Si hay resultados relevantes, se muestran debajo del formulario.</p>
<h3 id="Set-up-UI-environment" class="common-anchor-header">Configurar el entorno de la interfaz de usuario</h3><p>Necesitará una instalación local de Python, ya que utilizaremos Streamlit para implementar la aplicación.</p>
<p>En primer lugar, instale Streamlit, la biblioteca cliente Milvus, y la biblioteca cliente OpenAI localmente:</p>
<pre><code translate="no" class="language-shell">pip install streamlit pymilvus openai
<button class="copy-code-btn"></button></code></pre>
<p>Para renderizar un formulario de soporte básico, crea un archivo python <code translate="no">basic_support_form.py</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> streamlit <span class="hljs-keyword">as</span> st

<span class="hljs-keyword">with</span> st.form(<span class="hljs-string">&quot;my_form&quot;</span>):
    st.write(<span class="hljs-string">&quot;Submit a support case&quot;</span>)
    text_val = st.text_area(<span class="hljs-string">&quot;Describe your problem&quot;</span>)

    submitted = st.form_submit_button(<span class="hljs-string">&quot;Submit&quot;</span>)
    <span class="hljs-keyword">if</span> submitted:
        <span class="hljs-comment"># TODO check for related support cases and articles</span>
        st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Para ejecutar su aplicación, utilice Streamlit run:</p>
<pre><code translate="no" class="language-shell">streamlit run basic_support_form.py
<button class="copy-code-btn"></button></code></pre>
<p>Esto renderizará un formulario básico:<div><img translate="no" src="/docs/v2.5.x/assets/airbyte_with_milvus_4.png" width="40%"/></div>El código de este ejemplo también se puede encontrar en <a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/1_basic_support_form.py">GitHub</a>.</p>
<h3 id="Set-up-backend-query-service" class="common-anchor-header">Configurar el servicio de consulta backend</h3><p>A continuación, vamos a comprobar si existen tickets abiertos que puedan ser relevantes. Para hacer esto, incrustamos el texto que el usuario ingresó usando OpenAI, luego hicimos una búsqueda de similitud en nuestra colección, filtrando por tickets aún abiertos. Si hay uno con una distancia muy baja entre el ticket suministrado y el ticket existente, se lo hacemos saber al usuario y no lo enviamos:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> streamlit <span class="hljs-keyword">as</span> st
<span class="hljs-keyword">import</span> os
<span class="hljs-keyword">import</span> pymilvus
<span class="hljs-keyword">import</span> openai


<span class="hljs-keyword">with</span> st.form(<span class="hljs-string">&quot;my_form&quot;</span>):
    st.write(<span class="hljs-string">&quot;Submit a support case&quot;</span>)
    text_val = st.text_area(<span class="hljs-string">&quot;Describe your problem?&quot;</span>)

    submitted = st.form_submit_button(<span class="hljs-string">&quot;Submit&quot;</span>)
    <span class="hljs-keyword">if</span> submitted:
        <span class="hljs-keyword">import</span> os
        <span class="hljs-keyword">import</span> pymilvus
        <span class="hljs-keyword">import</span> openai

        org_id = <span class="hljs-number">360033549136</span> <span class="hljs-comment"># TODO Load from customer login data</span>

        pymilvus.connections.connect(uri=os.environ[<span class="hljs-string">&quot;MILVUS_URL&quot;</span>], token=os.environ[<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>])
        collection = pymilvus.Collection(<span class="hljs-string">&quot;zendesk&quot;</span>)

        embedding = openai.Embedding.create(<span class="hljs-built_in">input</span>=text_val, model=<span class="hljs-string">&quot;text-embedding-ada-002&quot;</span>)[<span class="hljs-string">&#x27;data&#x27;</span>][<span class="hljs-number">0</span>][<span class="hljs-string">&#x27;embedding&#x27;</span>]

        results = collection.search(data=[embedding], anns_field=<span class="hljs-string">&quot;vector&quot;</span>, param={}, limit=<span class="hljs-number">2</span>, output_fields=[<span class="hljs-string">&quot;_id&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>, <span class="hljs-string">&quot;description&quot;</span>], expr=<span class="hljs-string">f&#x27;status == &quot;new&quot; and organization_id == <span class="hljs-subst">{org_id}</span>&#x27;</span>)

        st.write(results[<span class="hljs-number">0</span>])
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(results[<span class="hljs-number">0</span>]) &gt; <span class="hljs-number">0</span> <span class="hljs-keyword">and</span> results[<span class="hljs-number">0</span>].distances[<span class="hljs-number">0</span>] &lt; <span class="hljs-number">0.35</span>:
            matching_ticket = results[<span class="hljs-number">0</span>][<span class="hljs-number">0</span>].entity
            st.write(<span class="hljs-string">f&quot;This case seems very similar to <span class="hljs-subst">{matching_ticket.get(<span class="hljs-string">&#x27;subject&#x27;</span>)}</span> (id #<span class="hljs-subst">{matching_ticket.get(<span class="hljs-string">&#x27;_id&#x27;</span>)}</span>). Make sure it has not been submitted before&quot;</span>)
        <span class="hljs-keyword">else</span>:
            st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)
            
<button class="copy-code-btn"></button></code></pre>
<p>Aquí ocurren varias cosas:</p>
<ul>
<li>Se establece la conexión con el clúster Milvus.</li>
<li>Se utiliza el servicio OpenAI para generar una incrustación de la descripción introducida por el usuario.</li>
<li>Se realiza una búsqueda de similitudes, filtrando los resultados por el estado del ticket y el id de la organización (ya que sólo son relevantes los tickets abiertos de la misma organización).</li>
<li>Si hay resultados y la distancia entre los vectores de incrustación del ticket existente y el texto recién introducido está por debajo de un determinado umbral, llama la atención sobre este hecho.</li>
</ul>
<p>Para ejecutar la nueva aplicación, es necesario configurar primero las variables de entorno para OpenAI y Milvus:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">export</span> <span class="hljs-variable constant_">MILVUS_TOKEN</span>=...
<span class="hljs-keyword">export</span> <span class="hljs-variable constant_">MILVUS_URL</span>=<span class="hljs-attr">https</span>:<span class="hljs-comment">//...</span>
<span class="hljs-keyword">export</span> <span class="hljs-variable constant_">OPENAI_API_KEY</span>=sk-...

streamlit run app.<span class="hljs-property">py</span>
<button class="copy-code-btn"></button></code></pre>
<p>Al intentar enviar un ticket que ya existe, el resultado será el siguiente:<div><img translate="no" src="/docs/v2.5.x/assets/airbyte_with_milvus_5.png" width="40%"/></div> El código de este ejemplo también se puede encontrar en <a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/2_open_ticket_check.py">GitHub</a>.</p>
<h3 id="Show-more-relevant-information" class="common-anchor-header">Mostrar más información relevante</h3><p>Como puede ver en la salida de depuración verde oculta en la versión final, dos tickets coincidían con nuestra búsqueda (en estado nuevo, de la organización actual y cerca del vector de incrustación). Sin embargo, el primero (relevante) se clasificó mejor que el segundo (irrelevante en esta situación), lo que se refleja en el menor valor de distancia. Esta relación queda reflejada en los vectores de incrustación sin que las palabras coincidan directamente, como en una búsqueda normal de texto completo.</p>
<p>Para terminar, vamos a mostrar información útil después de que se envíe el ticket para dar al usuario tanta información relevante por adelantado como sea posible.</p>
<p>Para ello, vamos a realizar una segunda búsqueda después de enviar el ticket para obtener los artículos de la base de conocimientos que más coincidan:</p>
<pre><code translate="no" class="language-python">   ......
   
        <span class="hljs-keyword">else</span>:
            <span class="hljs-comment"># TODO Actually send out the ticket</span>
            st.write(<span class="hljs-string">&quot;Submitted!&quot;</span>)
            article_results = collection.search(data=[embedding], anns_field=<span class="hljs-string">&quot;vector&quot;</span>, param={}, limit=<span class="hljs-number">5</span>, output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;html_url&quot;</span>], expr=<span class="hljs-string">f&#x27;_ab_stream == &quot;articles&quot;&#x27;</span>)
            st.write(article_results[<span class="hljs-number">0</span>])
            <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(article_results[<span class="hljs-number">0</span>]) &gt; <span class="hljs-number">0</span>:
                st.write(<span class="hljs-string">&quot;We also found some articles that might help you:&quot;</span>)
                <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> article_results[<span class="hljs-number">0</span>]:
                    <span class="hljs-keyword">if</span> hit.distance &lt; <span class="hljs-number">0.362</span>:
                        st.write(<span class="hljs-string">f&quot;* [<span class="hljs-subst">{hit.entity.get(<span class="hljs-string">&#x27;title&#x27;</span>)}</span>](<span class="hljs-subst">{hit.entity.get(<span class="hljs-string">&#x27;html_url&#x27;</span>)}</span>)&quot;</span>)

<button class="copy-code-btn"></button></code></pre>
<p>Si no hay ningún ticket de soporte abierto con una alta puntuación de similitud, el nuevo ticket se envía y los artículos de conocimiento relevantes se muestran a continuación:<div><img translate="no" src="/docs/v2.5.x/assets/airbyte_with_milvus_6.png" width="40%"/></div> El código de este ejemplo también se puede encontrar en <a href="https://github.com/airbytehq/tutorial-similarity-search/blob/main/3_relevant_articles.py">Github</a>.</p>
<h2 id="Conclusion" class="common-anchor-header">Conclusión<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Aunque la interfaz de usuario que se muestra aquí no es un formulario de soporte real, sino un ejemplo para ilustrar el caso de uso, la combinación de Airbyte y Milvus es muy potente: facilita la carga de texto desde una amplia variedad de fuentes (desde bases de datos como Postgres, pasando por API como Zendesk o GitHub, hasta fuentes completamente personalizadas creadas mediante el SDK de Airbyte o el creador de conectores visuales) y su indexación de forma incrustada en Milvus, un potente motor de búsqueda vectorial capaz de escalar a enormes cantidades de datos.</p>
<p>Airbyte y Milvus son de código abierto y de uso completamente gratuito en su infraestructura, con ofertas en la nube para descargar las operaciones si lo desea.</p>
<p>Más allá del caso de uso clásico de búsqueda semántica ilustrado en este artículo, la configuración general también puede utilizarse para construir un bot de chat que responda a preguntas utilizando el método RAG (Retrieval Augmented Generation), sistemas de recomendación o para ayudar a que la publicidad sea más relevante y eficiente.</p>
