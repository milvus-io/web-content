---
id: install-overview.md
summary: >-
  Milvus es una base de datos vectorial de alto rendimiento y escalable. Admite
  casos de uso de muy diversa envergadura, desde demostraciones que se ejecutan
  localmente en Jupyter Notebooks hasta clústeres de Kubernetes a gran escala
  que gestionan decenas de miles de millones de vectores. Actualmente, existen
  tres opciones de implementación de Milvus: Milvus Lite, Milvus Standalone y
  Milvus Distributed.
title: Resumen de las opciones de implementación de Milvus
---
<h1 id="Overview-of-Milvus-Deployment-Options" class="common-anchor-header">Resumen de las opciones de implementación de Milvus<button data-href="#Overview-of-Milvus-Deployment-Options" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus es una base de datos vectorial altamente performante y escalable. Admite casos de uso de muy diversa envergadura, desde demostraciones que se ejecutan localmente en Jupyter Notebooks hasta clústeres de Kubernetes a gran escala que gestionan decenas de miles de millones de vectores. Actualmente, existen tres opciones de implementación de Milvus: Milvus Lite, Milvus Standalone y Milvus Distributed.</p>
<h2 id="Milvus-Lite" class="common-anchor-header">Milvus Lite<button data-href="#Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> es una biblioteca de Python que se puede importar a tus aplicaciones. Al tratarse de una versión ligera de Milvus, resulta ideal para la creación rápida de prototipos en Jupyter Notebooks o para ejecutarse en dispositivos inteligentes con recursos limitados. Milvus Lite es compatible con las mismas API que otras implementaciones de Milvus. El código del lado del cliente que interactúa con Milvus Lite también puede funcionar con instancias de Milvus en otros modos de implementación.</p>
<p>Para integrar Milvus Lite en tus aplicaciones, ejecuta « <code translate="no">pip install pymilvus</code> » para instalarlo y utiliza la instrucción « <code translate="no">MilvusClient(&quot;./demo.db&quot;)</code> » para instanciar una base de datos vectorial con un archivo local que conserve todos tus datos. Para obtener más detalles, consulta <a href="https://milvus.io/docs/milvus_lite.md">«Ejecutar Milvus Lite</a>».</p>
<h2 id="Milvus-Standalone" class="common-anchor-header">Milvus Standalone<button data-href="#Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Standalone es una implementación de servidor en una sola máquina. Todos los componentes de Milvus Standalone están empaquetados en una única <a href="https://milvus.io/docs/install_standalone-docker.md">imagen de Docker</a>, lo que facilita la implementación. Si tienes una carga de trabajo de producción pero prefieres no utilizar Kubernetes, ejecutar Milvus Standalone en una sola máquina con memoria suficiente es una buena opción. Por defecto, Milvus Standalone ejecuta <strong>Woodpecker</strong> (integrado) como cola de mensajes, por lo que no es necesario gestionar un servicio de mensajería independiente.</p>
<h2 id="Milvus-Distributed" class="common-anchor-header">Milvus Distributed<button data-href="#Milvus-Distributed" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Distributed se puede implementar en clústeres <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">de Kubernetes</a>. Esta implementación cuenta con una arquitectura nativa de la nube, en la que la carga de ingestión y las consultas de búsqueda se gestionan por separado mediante nodos aislados, lo que permite la redundancia de los componentes críticos. Ofrece la máxima escalabilidad y disponibilidad, así como flexibilidad a la hora de personalizar los recursos asignados a cada componente. Milvus Distributed es la mejor opción para los usuarios empresariales que ejecutan sistemas de búsqueda vectorial a gran escala en producción. De forma predeterminada, Milvus Distributed utiliza <strong>Woodpecker</strong> como cola de mensajes, desplegado como un servicio dedicado junto con Milvus.</p>
<h2 id="Choose-the-Right-Deployment-for-Your-Use-Case" class="common-anchor-header">Elige la implementación adecuada para tu caso de uso<button data-href="#Choose-the-Right-Deployment-for-Your-Use-Case" class="anchor-icon" translate="no">
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
    </button></h2><p>La elección de un modo de implementación suele depender de la fase de desarrollo de su aplicación:</p>
<ul>
<li><p><strong>Para la creación rápida de prototipos</strong></p>
<p>Si deseas crear rápidamente algo a modo de prototipo o con fines de aprendizaje, como demostraciones de Generación Aumentada por Recuperación (RAG), chatbots con IA o búsqueda multimodal, lo más adecuado es utilizar Milvus Lite por sí solo o una combinación de Milvus Lite y Milvus Standalone. Puedes utilizar Milvus Lite en cuadernos de trabajo para la creación rápida de prototipos y explorar diversos enfoques, como diferentes estrategias de segmentación en RAG. Es posible que desees implementar la aplicación creada con Milvus Lite en un entorno de producción a pequeña escala para dar servicio a usuarios reales, o validar la idea con conjuntos de datos más grandes, por ejemplo, de más de unos pocos millones de vectores. En ese caso, Milvus Standalone es la opción adecuada. La lógica de la aplicación de Milvus Lite se puede seguir compartiendo, ya que todas las implementaciones de Milvus cuentan con la misma API del lado del cliente. Los datos almacenados en Milvus Lite también se pueden transferir a Milvus Standalone mediante una herramienta de línea de comandos.</p></li>
<li><p><strong>Implementación en producción a pequeña escala</strong></p>
<p>Para las primeras fases de producción, cuando el proyecto aún busca el ajuste entre el producto y el mercado y la agilidad es más importante que la escalabilidad, Milvus Standalone es la mejor opción. Puede escalar hasta 100 millones de vectores si se dispone de suficientes recursos de máquina, al tiempo que requiere mucho menos trabajo de DevOps que el mantenimiento de un clúster de K8s.</p></li>
<li><p><strong>Implementación en producción a gran escala</strong></p>
<p>A medida que tu negocio crece rápidamente y el volumen de datos supera la capacidad de un único servidor, es el momento de plantearse utilizar Milvus Distributed. Puedes seguir utilizando Milvus Standalone para el entorno de desarrollo o de prueba por su comodidad, y gestionar el clúster de K8s en el que se ejecuta Milvus Distributed. Esto te permitirá alcanzar decenas de miles de millones de vectores, además de ofrecerte flexibilidad a la hora de adaptar el tamaño de los nodos a tu carga de trabajo concreta, ya sea en casos de alta lectura y escritura poco frecuente, o de alta escritura y baja lectura.</p></li>
<li><p><strong>Búsqueda local en dispositivos periféricos</strong></p>
<p>Para realizar búsquedas en dispositivos periféricos que contengan información privada o sensible, puede implementar Milvus Lite en el propio dispositivo sin depender de un servicio en la nube para realizar búsquedas de texto o imágenes. Esto resulta adecuado para casos como la búsqueda en documentos de propiedad exclusiva o la detección de objetos en el propio dispositivo.</p></li>
</ul>
<p>La elección del modo de implementación de Milvus depende de la fase y la escala de su proyecto. Milvus ofrece una solución flexible y potente para diversas necesidades, desde la creación rápida de prototipos hasta la implementación empresarial a gran escala.</p>
<ul>
<li>Se recomienda<strong>Milvus Lite</strong> para conjuntos de datos más pequeños, de hasta unos pocos millones de vectores.</li>
<li><strong>Milvus Standalone</strong> es adecuado para conjuntos de datos de tamaño medio, con capacidad para hasta 100 millones de vectores.</li>
<li><strong>Milvus Distributed</strong> está diseñado para implementaciones a gran escala, capaz de gestionar conjuntos de datos de entre 100 millones y decenas de miles de millones de vectores.</li>
</ul>
<p>Independientemente del modo de implementación, cada instancia de Milvus se basa en una cola de mensajes, un almacenamiento de objetos y un almacén de metadatos —por defecto, <strong>Woodpecker</strong>, <strong>MinIO</strong> y <strong>etcd—</strong>. Para obtener más información sobre estas dependencias, ajustarlas o conectar servicios externos, consulta <a href="/docs/es/data-infra-integration-overview.md">Infraestructura de datos</a>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/select-deployment-option.png" alt="Select deployment option for your use case" class="doc-image" id="select-deployment-option-for-your-use-case" /> 
   <span>Seleccione la opción de implementación adecuada para su caso de uso</span>
  
 </span></p>
<h2 id="Comparison-on-functionalities" class="common-anchor-header">Comparación de funcionalidades<button data-href="#Comparison-on-functionalities" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Característica</th><th>Milvus Lite</th><th>Milvus Standalone</th><th>Milvus Distributed</th></tr>
</thead>
<tbody>
<tr><td>SDK / Biblioteca de cliente</td><td>Python<br/>gRPC</td><td>Python<br/>Go<br/>Java<br/>Node.js<br/>C#<br/>RESTful</td><td>Python<br/>Java<br/>Go<br/>Node.js<br/>C#<br/>RESTful</td></tr>
<tr><td>Tipos de datos</td><td>Vector denso<br/>Vector disperso<br/>Vector binario<br/>Booleano<br/>Entero<br/>Punto flotante<br/>VarChar<br/>Matriz<br/>JSON</td><td>Vector denso<br/>Vector disperso<br/>Vector binario<br/>Booleano<br/>Entero<br/>Punto flotante<br/>VarChar<br/>Matriz<br/>JSON</td><td>Vector denso<br/>Vector disperso<br/>Vector binario<br/>Booleano<br/>Entero<br/>Punto flotante<br/>VarChar<br/>Matriz<br/>JSON</td></tr>
<tr><td>Funcionalidades de búsqueda</td><td>Búsqueda vectorial (búsqueda ANN)<br/>Filtrado por metadatos<br/>Búsqueda por rango<br/>Consulta escalar<br/>Obtener entidades por clave primaria<br/>Búsqueda híbrida</td><td>Búsqueda vectorial (búsqueda ANN)<br/>Filtrado de metadatos<br/>Búsqueda por rango<br/>Consulta escalar<br/>Obtener entidades por clave primaria<br/>Búsqueda híbrida</td><td>Búsqueda vectorial (búsqueda ANN)<br/>Filtrado de metadatos<br/>Búsqueda por rango<br/>Consulta escalar<br/>Obtener entidades por clave primaria<br/>Búsqueda híbrida</td></tr>
<tr><td>Operaciones CRUD</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
<tr><td>Gestión avanzada de datos</td><td>N/A</td><td>Control de acceso<br/>Partición<br/>Clave de partición</td><td>Control de acceso<br/>Partición<br/>Clave de partición<br/>Agrupación de recursos físicos</td></tr>
<tr><td>Niveles de consistencia</td><td>Fuerte</td><td>Fuerte<br/>Caducidad limitada<br/>Sesión<br/>Eventual</td><td>Fuerte<br/>Caducidad limitada<br/>Sesión<br/>Eventual</td></tr>
<tr><td>Cola de mensajes</td><td>N/A</td><td>Woodpecker (integrado)</td><td>Woodpecker (servicio)</td></tr>
</tbody>
</table>
