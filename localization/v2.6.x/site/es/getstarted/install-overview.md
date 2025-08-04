---
id: install-overview.md
summary: >-
  Milvus es una base de datos vectorial escalable y de alto rendimiento. Es
  compatible con casos de uso de una amplia gama de tamaños, desde
  demostraciones que se ejecutan localmente en Jupyter Notebooks hasta clústeres
  Kubernetes de escala masiva que manejan decenas de miles de millones de
  vectores. Actualmente, hay tres opciones de despliegue de Milvus_ Milvus Lite,
  Milvus Standalone y Milvus Distributed.
title: Resumen de las opciones de despliegue de Milvus
---
<h1 id="Overview-of-Milvus-Deployment-Options" class="common-anchor-header">Resumen de las opciones de despliegue de Milvus<button data-href="#Overview-of-Milvus-Deployment-Options" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus es una base de datos vectorial escalable y de alto rendimiento. Es compatible con casos de uso de una amplia gama de tamaños, desde demostraciones que se ejecutan localmente en cuadernos Jupyter hasta clústeres Kubernetes de escala masiva que manejan decenas de miles de millones de vectores. Actualmente, existen tres opciones de despliegue de Milvus: Milvus Lite, Milvus Standalone y Milvus Distributed.</p>
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
    </button></h2><p><a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> es una biblioteca Python que puede importarse en sus aplicaciones. Como versión ligera de Milvus, es ideal para la creación rápida de prototipos en cuadernos Jupyter o para su ejecución en dispositivos inteligentes con recursos limitados. Milvus Lite soporta las mismas API que otras implementaciones de Milvus. El código del lado del cliente que interactúa con Milvus Lite también puede funcionar con instancias Milvus en otros modos de despliegue.</p>
<p>Para integrar Milvus Lite en sus aplicaciones, ejecute <code translate="no">pip install pymilvus</code> para instalarlo y utilice la sentencia <code translate="no">MilvusClient(&quot;./demo.db&quot;)</code> para instanciar una base de datos vectorial con un archivo local que persista todos sus datos. Para más detalles, consulte <a href="https://milvus.io/docs/milvus_lite.md">Ejecutar Milvus Lite</a>.</p>
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
    </button></h2><p>Milvus Standalone es un despliegue de servidor de una sola máquina. Todos los componentes de Milvus Standalone están empaquetados en una sola <a href="https://milvus.io/docs/install_standalone-docker.md">imagen Docker</a>, lo que hace que el despliegue sea conveniente. Si tiene una carga de trabajo de producción pero prefiere no usar Kubernetes, ejecutar Milvus Standalone en una sola máquina con suficiente memoria es una buena opción.</p>
<h2 id="Milvus-Distributed" class="common-anchor-header">Milvus Distribuido<button data-href="#Milvus-Distributed" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Distributed puede desplegarse en clústeres <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes</a>. Este despliegue cuenta con una arquitectura nativa de la nube, donde la carga de ingestión y las consultas de búsqueda son gestionadas por separado por nodos aislados, lo que permite la redundancia de los componentes críticos. Ofrece la máxima escalabilidad y disponibilidad, así como la flexibilidad de personalizar los recursos asignados en cada componente. Milvus Distributed es la mejor opción para los usuarios empresariales que ejecutan sistemas de búsqueda vectorial a gran escala en producción.</p>
<h2 id="Choose-the-Right-Deployment-for-Your-Use-Case" class="common-anchor-header">Elija el despliegue adecuado para su caso de uso<button data-href="#Choose-the-Right-Deployment-for-Your-Use-Case" class="anchor-icon" translate="no">
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
    </button></h2><p>La selección de un modo de despliegue depende típicamente de la etapa de desarrollo de su aplicación:</p>
<ul>
<li><p><strong>Para la creación rápida de prototipos</strong></p>
<p>Si desea construir rápidamente algo como prototipo o con fines de aprendizaje, como demostraciones de Generación Aumentada de Recuperación (RAG), chatbots de IA, búsqueda multimodal, Milvus Lite por sí mismo o una combinación de Milvus Lite y Milvus Standalone es adecuado. Puede utilizar Milvus Lite en cuadernos para la creación rápida de prototipos y explorar varios enfoques, como diferentes estrategias de fragmentación en RAG. Es posible que desee desplegar la aplicación construida con Milvus Lite en una producción a pequeña escala para servir a usuarios reales, o validar la idea en conjuntos de datos más grandes, digamos más de unos pocos millones de vectores. Milvus Standalone es apropiado. La lógica de la aplicación para Milvus Lite aún puede compartirse ya que todas las implementaciones de Milvus tienen la misma API del lado del cliente. Los datos almacenados en Milvus Lite también pueden trasladarse a Milvus Standalone con una herramienta de línea de comandos.</p></li>
<li><p><strong>Despliegue de producción a pequeña escala</strong></p>
<p>Para las primeras fases de producción, cuando el proyecto todavía está buscando la adecuación del producto al mercado y la agilidad es más importante que la escalabilidad, Milvus Standalone es la mejor opción. Aún puede escalar hasta 100M de vectores si se cuenta con suficientes recursos de máquina, mientras que requiere mucho menos DevOps que mantener un clúster K8s.</p></li>
<li><p><strong>Despliegue de producción a gran escala</strong></p>
<p>A medida que su negocio crece rápidamente y la escala de datos excede la capacidad de un solo servidor, es hora de considerar Milvus Distributed. Puede seguir utilizando Milvus Standalone para el entorno de desarrollo o puesta en escena por su comodidad, y operar el clúster K8s que ejecuta Milvus Distributed. Esto puede sostenerle hacia decenas de miles de millones de vectores, así como proporcionar flexibilidad en la adaptación del tamaño del nodo para su carga de trabajo particular, como casos de alta lectura, escritura infrecuente o alta escritura, baja lectura.</p></li>
<li><p><strong>Búsqueda local en dispositivos periféricos</strong></p>
<p>Para realizar búsquedas privadas o confidenciales en dispositivos periféricos, puede implementar Milvus Lite en el dispositivo sin depender de un servicio basado en la nube para realizar búsquedas de texto o imágenes. Esto es adecuado para casos como la búsqueda de documentos propios o la detección de objetos en el dispositivo.</p></li>
</ul>
<p>La elección del modo de despliegue de Milvus depende de la fase y la escala de su proyecto. Milvus proporciona una solución flexible y potente para diversas necesidades, desde la creación rápida de prototipos hasta el despliegue empresarial a gran escala.</p>
<ul>
<li><strong>Milvus Lite</strong> se recomienda para conjuntos de datos más pequeños, de hasta unos pocos millones de vectores.</li>
<li><strong>Milvus Standalone</strong> es adecuado para conjuntos de datos de tamaño medio, hasta 100 millones de vectores.</li>
<li><strong>Milvus Distributed</strong> está diseñado para despliegues a gran escala, capaz de manejar conjuntos de datos desde 100 millones hasta decenas de miles de millones de vectores.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/select-deployment-option.png" alt="Select deployment option for your use case" class="doc-image" id="select-deployment-option-for-your-use-case" />
   </span> <span class="img-wrapper"> <span>Seleccione la opción de despliegue para su caso de uso</span> </span></p>
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
<tr><th>Características</th><th>Milvus Lite</th><th>Milvus Independiente</th><th>Milvus Distribuido</th></tr>
</thead>
<tbody>
<tr><td>SDK / Lirario cliente</td><td>Python<br/>gRPC</td><td>Python<br/>Go<br/>Java<br/>Node.js<br/>C#<br/>RESTful</td><td>Python<br/>Java<br/>Go<br/>Node.js<br/>C#<br/>RESTful</td></tr>
<tr><td>Tipos de datos</td><td>Vector denso<br/>Vector disperso<br/>Vector binario<br/>Booleano<br/>Entero<br/>Punto flotante<br/>VarChar<br/>Matriz<br/>JSON</td><td>Vector denso<br/>Vector disperso<br/>Vector binario<br/>Booleano<br/>Entero<br/>Punto flotante<br/>VarChar<br/>Matriz<br/>JSON</td><td>Vector denso<br/>Vector disperso<br/>Vector binario<br/>Booleano<br/>Entero<br/>Punto flotante<br/>VarChar<br/>Matriz<br/>JSON</td></tr>
<tr><td>Capacidades de búsqueda</td><td>Búsqueda vectorial (Búsqueda RNA)<br/>Filtrado de metadatos<br/>Búsqueda por rangos<br/>Consulta escalar<br/>Obtención de entidades por clave principal<br/>Búsqueda híbrida</td><td>Búsqueda vectorial (búsqueda RNA)<br/>Filtrado de metadatos<br/>Búsqueda por rango<br/>Consulta escalar<br/>Obtención de entidades por clave principal<br/>Búsqueda híbrida</td><td>Búsqueda vectorial (Búsqueda RNA)<br/>Filtrado de metadatos<br/>Búsqueda por rango<br/>Consulta escalar<br/>Obtención de entidades por clave principal<br/>Búsqueda híbrida</td></tr>
<tr><td>Operaciones CRUD</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
<tr><td>Gestión avanzada de datos</td><td>N/A</td><td>Control de acceso<br/>Partición<br/>Clave de partición</td><td>Control de acceso<br/>Partición<br/>Clave de partición<br/>Agrupación de recursos físicos</td></tr>
<tr><td>Niveles de coherencia</td><td>Fuerte</td><td>Fuerte<br/>Estancamiento limitado<br/>Sesión<br/>Eventual</td><td>Fuerte<br/>Estancamiento limitado<br/>Sesión<br/>Eventual</td></tr>
</tbody>
</table>
