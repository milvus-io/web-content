---
id: install-overview.md
summary: >-
  Elige entre Milvus Lite, Standalone o Distributed en función de tu carga de
  trabajo, tus requisitos de disponibilidad y tu entorno operativo.
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
    </button></h1><p>Milvus admite prototipos locales y servicios de búsqueda vectorial a gran escala. Elige entre Milvus Lite, Milvus Standalone y Milvus Distributed en función de tus datos, la carga de lectura y escritura, los requisitos de disponibilidad y el entorno operativo.</p>
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
    </button></h2><p><a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> es una biblioteca de Python que se puede importar a sus aplicaciones. Al tratarse de una versión ligera de Milvus, resulta ideal para la creación rápida de prototipos en Jupyter Notebooks o para ejecutarse en dispositivos inteligentes con recursos limitados. Milvus Lite admite las mismas API que otras implementaciones de Milvus. El código del lado del cliente que interactúa con Milvus Lite también puede funcionar con instancias de Milvus en otros modos de implementación.</p>
<p>Para los ejemplos locales, utiliza Python 3.10 o posterior e instala explícitamente la dependencia opcional «Lite». En Windows, pip omite el complemento « <code translate="no">milvus-lite</code> », por lo que es necesario especificar el nombre del paquete de forma explícita:</p>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus[milvus-lite]==3.0.2&quot;</span> <span class="hljs-string">&quot;milvus-lite==3.2.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Utilice « <code translate="no">MilvusClient(&quot;./demo.db&quot;)</code> » para abrir el almacenamiento local. Milvus Lite 3.x crea un directorio en esta ruta; un archivo de base de datos existente de Milvus Lite 2.x requiere exportación y migración. Consulte <a href="/docs/es/milvus_lite.md">«Ejecutar Milvus Lite»</a> para conocer los requisitos de la plataforma y <a href="/docs/es/quickstart.md">«Inicio rápido»</a> para ver un ejemplo completo de inserción y búsqueda.</p>
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
    </button></h2><p>Milvus Standalone es una implementación de servidor en una sola máquina. Todos los componentes de Milvus Standalone están empaquetados en una única <a href="https://milvus.io/docs/install_standalone-docker.md">imagen de Docker</a>, lo que facilita la implementación. Si tienes una carga de trabajo en producción pero prefieres no utilizar Kubernetes, ejecutar Milvus Standalone en una sola máquina con memoria suficiente es una buena opción. Por defecto, Milvus Standalone ejecuta <strong>Woodpecker</strong> (integrado) como cola de mensajes, por lo que no es necesario gestionar un servicio de mensajería independiente.</p>
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
    </button></h2><p>Milvus Distributed se puede implementar en clústeres <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">de Kubernetes</a>. Esta implementación cuenta con una arquitectura nativa de la nube, en la que la carga de ingestión y las consultas de búsqueda se gestionan por separado mediante nodos aislados, lo que permite la redundancia de los componentes críticos. Ofrece la máxima escalabilidad y disponibilidad, así como flexibilidad a la hora de personalizar los recursos asignados a cada componente. Milvus Distributed es la mejor opción para usuarios empresariales que ejecutan sistemas de búsqueda vectorial a gran escala en producción. De forma predeterminada, Milvus Distributed utiliza <strong>Woodpecker</strong> como cola de mensajes, implementado como un servicio dedicado junto con Milvus.</p>
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
<p>Utilice Milvus Lite en un portátil para probar las representaciones, las estrategias de fragmentación RAG y el comportamiento de recuperación. Pase a Milvus Standalone cuando necesite un servidor compartido o cuando la memoria y la carga de consultas superen la capacidad del entorno local. La API de cliente es similar, pero compruebe las diferencias de funcionalidades y migre los datos almacenados por separado.</p></li>
<li><p><strong>Implementación en producción a pequeña escala</strong></p>
<p>Utiliza Milvus Standalone cuando un único servidor pueda satisfacer tus requisitos de carga de trabajo y disponibilidad, y prefieras operar sin Kubernetes. Calcula la memoria necesaria a partir de las dimensiones de los vectores, los campos escalares, la configuración del índice y las réplicas; a continuación, evalúa el rendimiento de la concurrencia de consultas y la tasa de escritura previstas. El recuento de vectores por sí solo no determina la capacidad.</p></li>
<li><p><strong>Implementación en producción a gran escala</strong></p>
<p>A medida que su negocio crece rápidamente y la escala de datos supera la capacidad de un único servidor, es el momento de plantearse utilizar Milvus Distributed. Puede seguir utilizando Milvus Standalone para el entorno de desarrollo o de prueba por su comodidad, y gestionar el clúster de K8s en el que se ejecuta Milvus Distributed. Esto te permitirá gestionar decenas de miles de millones de vectores, además de ofrecerte flexibilidad a la hora de adaptar el tamaño de los nodos a tu carga de trabajo concreta, ya sea en casos de alta lectura y escritura poco frecuente, o de alta escritura y baja lectura.</p></li>
<li><p><strong>Búsqueda local en dispositivos periféricos</strong></p>
<p>Para realizar búsquedas en dispositivos periféricos que contengan información privada o sensible, puede implementar Milvus Lite en el propio dispositivo sin depender de un servicio en la nube para realizar búsquedas de texto o imágenes. Esto resulta adecuado para casos como la búsqueda en documentos de propiedad exclusiva o la detección de objetos en el propio dispositivo.</p></li>
</ul>
<p>La elección del modo de implementación de Milvus depende de la fase y la escala de su proyecto. Milvus ofrece una solución flexible y potente para diversas necesidades, desde la creación rápida de prototipos hasta la implementación empresarial a gran escala.</p>
<ul>
<li><strong>Milvus Lite</strong> se adapta a la evaluación local y a las cargas de trabajo dentro de los recursos de una sola aplicación.</li>
<li><strong>Milvus Standalone</strong> ofrece un servicio compartido cuando un único servidor cumple con los requisitos de capacidad y disponibilidad que se hayan establecido.</li>
<li><strong>Milvus Distributed</strong> ofrece escalabilidad y redundancia a nivel de componentes cuando necesitas ampliar más allá de un servidor o aislar los recursos de lectura y escritura.</li>
</ul>
<p>Milvus Standalone y Distributed utilizan una cola de mensajes, almacenamiento de objetos y un almacén de metadatos. Milvus Lite se ejecuta localmente sin esos servicios independientes. Para conocer las dependencias predeterminadas de las implementaciones de servidor y las opciones de servicios externos, consulta <a href="/docs/es/data-infra-integration-overview.md">Infraestructura de datos</a>.</p>
<p>Si prefieres un servicio gestionado en lugar de gestionar tú mismo la infraestructura del servidor, plantéate utilizar <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. Para una implementación práctica, continúa con <a href="/docs/es/install_standalone-docker.md">Docker</a> o <a href="/docs/es/install_cluster-milvusoperator.md">Kubernetes</a>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/select-deployment-option.png" alt="Select deployment option for your use case" class="doc-image" id="select-deployment-option-for-your-use-case" /> 
   <span>Selecciona la opción de implementación adecuada para tu caso de uso</span>
  
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
    </button></h2><p>La columna «Lite» describe Milvus Lite 3.2.2. Comprueba <a href="/docs/es/milvus_lite.md#Supported-features-and-limits">los límites de Milvus Lite</a> antes de utilizar una función del servidor en una aplicación local.</p>
<table>
<thead>
<tr><th>Funcionalidad</th><th>Milvus Lite</th><th>Milvus Standalone</th><th>Milvus Distributed</th></tr>
</thead>
<tbody>
<tr><td>SDK / biblioteca de cliente</td><td>Python (adaptador PyMilvus local)</td><td>Python<br/>Go<br/>Java<br/>Node.js<br/>C#<br/>RESTful</td><td>Python<br/>Java<br/>Go<br/>Node.js<br/>C#<br/>RESTful</td></tr>
<tr><td>Tipos de datos</td><td>Vector denso<br/>Vector disperso<br/>Booleano<br/>Entero<br/>Punto flotante<br/>VarChar<br/>Matriz<br/>JSON</td><td>Vector denso<br/>Vector disperso<br/>Vector binario<br/>Booleano<br/>Entero<br/>Punto flotante<br/>VarChar<br/>Matriz<br/>JSON</td><td>Vector denso<br/>Vector disperso<br/>Vector binario<br/>Booleano<br/>Entero<br/>Punto flotante<br/>VarChar<br/>Matriz<br/>JSON</td></tr>
<tr><td>Funcionalidades de búsqueda</td><td>Búsqueda vectorial (búsqueda ANN)<br/>Filtrado por metadatos<br/>Búsqueda por rango<br/>Consulta escalar<br/>Obtener entidades por clave primaria<br/>Búsqueda híbrida</td><td>Búsqueda vectorial (búsqueda ANN)<br/>Filtrado de metadatos<br/>Búsqueda por rango<br/>Consulta escalar<br/>Obtener entidades por clave primaria<br/>Búsqueda híbrida</td><td>Búsqueda vectorial (búsqueda ANN)<br/>Filtrado de metadatos<br/>Búsqueda por rango<br/>Consulta escalar<br/>Obtener entidades por clave primaria<br/>Búsqueda híbrida</td></tr>
<tr><td>Operaciones CRUD</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
<tr><td>Gestión avanzada de datos</td><td>Bases de datos<br/>Particiones<br/>Alias<br/>Sin control de acceso</td><td>Control de acceso<br/>Partición<br/>Clave de partición</td><td>Control de acceso<br/>Partición<br/>Clave de partición<br/>Agrupación de recursos físicos</td></tr>
<tr><td>Niveles de consistencia</td><td>No aplicable: un único proceso local atiende todas las solicitudes; se acepta « <code translate="no">consistency_level</code> », pero no tiene ningún efecto</td><td><br/>fuerte Caducidad limitada<br/>Sesión<br/>Eventual</td><td><br/>o fuerte Caducidad limitada<br/>Sesión<br/>Eventual</td></tr>
<tr><td>Cola de mensajes</td><td>N/A</td><td>Woodpecker (integrado)</td><td>Woodpecker (servicio)</td></tr>
</tbody>
</table>
