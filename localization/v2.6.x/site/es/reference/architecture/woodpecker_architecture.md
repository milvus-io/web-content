---
id: woodpecker_architecture.md
title: Woodpecker
summary: >-
  Woodpecker es un sistema WAL nativo de la nube en Milvus 2.6. Con una
  arquitectura de disco cero y dos modos de despliegue, ofrece un alto
  rendimiento, una baja sobrecarga operativa y una escalabilidad perfecta en el
  almacenamiento de objetos.
---
<h1 id="Woodpecker" class="common-anchor-header">Woodpecker<button data-href="#Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>En Milvus 2.6, Woodpecker sustituye a Kafka y Pulsar por un sistema de registro de escritura anticipada (WAL) nativo de la nube y creado específicamente. Diseñado para el almacenamiento de objetos, Woodpecker simplifica las operaciones, maximiza el rendimiento y se escala sin esfuerzo.</p>
<p>Objetivos de diseño de Woodpecker:</p>
<ul>
<li><p>Máximo rendimiento en entornos de nube</p></li>
<li><p>Registro duradero de sólo apéndices para una recuperación fiable</p></li>
<li><p>Mínima sobrecarga operativa sin discos locales ni intermediarios externos</p></li>
</ul>
<h2 id="Zero-disk-architecture" class="common-anchor-header">Arquitectura de disco cero<button data-href="#Zero-disk-architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>La principal innovación de Woodpecker es su arquitectura de disco cero:</p>
<ul>
<li>Todos los datos de registro se almacenan en almacenamiento de objetos en la nube (como Amazon S3, Google Cloud Storage o Alibaba OS).</li>
<li>Metadatos gestionados a través de almacenes de valores clave distribuidos como <strong>etcd</strong></li>
<li>Sin dependencias del disco local para las operaciones principales</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_layers.png" alt="woodpecker layers" class="doc-image" id="woodpecker-layers" />
   </span> <span class="img-wrapper"> <span>capas de woodpecker</span> </span></p>
<h2 id="Architecture-components" class="common-anchor-header">Componentes de la arquitectura<button data-href="#Architecture-components" class="anchor-icon" translate="no">
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
    </button></h2><p>Una implementación estándar de Woodpecker incluye los siguientes componentes:</p>
<ul>
<li><strong>Cliente</strong>: Capa de interfaz para emitir peticiones de lectura y escritura</li>
<li><strong>LogStore</strong>: Gestiona el almacenamiento en búfer de escritura de alta velocidad, las cargas asíncronas al almacenamiento y la compactación de registros.</li>
<li><strong>Backend de almacenamiento</strong>: Admite servicios de almacenamiento escalables y de bajo coste como S3, GCS y sistemas de archivos como EFS</li>
<li><strong>Etcd</strong>: Almacena metadatos y coordina el estado de los registros en nodos distribuidos</li>
</ul>
<h2 id="Deployment-modes" class="common-anchor-header">Modos de despliegue<button data-href="#Deployment-modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Woodpecker ofrece dos modos de despliegue para adaptarse a sus necesidades específicas:</p>
<h3 id="MemoryBuffer---Lightweight-and-maintenance-free" class="common-anchor-header">MemoryBuffer: ligero y sin mantenimiento.</h3><p>El modo MemoryBuffer proporciona una opción de despliegue sencilla y ligera en la que Woodpecker almacena temporalmente en memoria las escrituras entrantes y las descarga periódicamente en un servicio de almacenamiento de objetos en la nube. Los metadatos se gestionan mediante <strong>etcd</strong> para garantizar la coherencia y la coordinación. Este modo es el más adecuado para cargas de trabajo de lotes pesados en implementaciones a pequeña escala o entornos de producción que priorizan la simplicidad sobre el rendimiento, especialmente cuando la baja latencia de escritura no es crítica.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_memorybuffer_mode_deployment.png" alt="woodpecker memory mode deployment" class="doc-image" id="woodpecker-memory-mode-deployment" />
   </span> <span class="img-wrapper"> <span>despliegue del modo de memoria woodpecker</span> </span></p>
<h3 id="QuorumBuffer---Optimized-for-low-latency-high-durability" class="common-anchor-header">QuorumBuffer - Optimizado para baja latencia y alta durabilidad</h3><p>El modo QuorumBuffer está diseñado para cargas de trabajo de lectura/escritura sensibles a la latencia y de alta frecuencia que requieren tanto capacidad de respuesta en tiempo real como una fuerte tolerancia a fallos. En este modo, el Woodpecker funciona como un búfer de escritura de alta velocidad con escrituras de quórum de tres réplicas, lo que garantiza una gran coherencia y alta disponibilidad.</p>
<p>Una escritura se considera correcta cuando se replica en al menos dos de los tres nodos, y normalmente se completa en milisegundos de un solo dígito, tras lo cual los datos se vuelcan de forma asíncrona al almacenamiento de objetos en la nube para una durabilidad a largo plazo. Esta arquitectura minimiza el estado en el nodo, elimina la necesidad de grandes volúmenes de disco locales y evita las complejas reparaciones antientropía que suelen requerir los sistemas tradicionales basados en quórum.</p>
<p>El resultado es una capa WAL racionalizada y robusta, ideal para entornos de producción de misión crítica en los que la coherencia, la disponibilidad y la recuperación rápida son esenciales.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_memorybuffer_mode_deployment.png" alt="woodpecker memory mode deployment" class="doc-image" id="woodpecker-memory-mode-deployment" />
   </span> <span class="img-wrapper"> <span>despliegue del modo de memoria woodpecker</span> </span></p>
<h2 id="Performance-benchmarks" class="common-anchor-header">Pruebas de rendimiento<button data-href="#Performance-benchmarks" class="anchor-icon" translate="no">
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
    </button></h2><p>Ejecutamos pruebas comparativas exhaustivas para evaluar el rendimiento de Woodpecker en una configuración de nodo único, cliente único y flujo de registro único. Los resultados fueron impresionantes en comparación con Kafka y Pulsar:</p>
<table>
<thead>
<tr><th>Sistema</th><th>Kafka</th><th>Pulsar</th><th>WP Minio</th><th>WP Local</th><th>WP S3</th></tr>
</thead>
<tbody>
<tr><td>Rendimiento</td><td>129,96 MB/s</td><td>107 MB/s</td><td>71 MB/s</td><td>450 MB/s</td><td>750 MB/s</td></tr>
<tr><td>latencia</td><td>58 ms</td><td>35 ms</td><td>184 ms</td><td>1,8 ms</td><td>166 ms</td></tr>
</tbody>
</table>
<p>Para contextualizar, hemos medido los límites teóricos de rendimiento de distintos backends de almacenamiento en nuestra máquina de pruebas:</p>
<ul>
<li>MinIO: ~110 MB/s</li>
<li>Sistema de archivos local: 600-750 MB/s</li>
<li>Amazon S3 (instancia EC2 única): hasta 1,1 GB/s</li>
</ul>
<p>Sorprendentemente, Woodpecker alcanzó sistemáticamente entre el 60 y el 80% del rendimiento máximo posible para cada backend, un nivel de eficiencia excepcional para el middleware.</p>
<h3 id="Key-performance-insights" class="common-anchor-header">Principales datos de rendimiento</h3><ul>
<li>Modo de sistema de archivos local: Woodpecker alcanzó 450 MB/s -3,5 veces más rápido que Kafka y 4,2 veces más rápido que Pulsar- con una latencia ultrabaja de tan solo 1,8 ms, lo que lo hace ideal para implantaciones de un solo nodo de alto rendimiento.</li>
<li>Modo de almacenamiento en la nube (S3): Al escribir directamente en S3, Woodpecker alcanzó 750 MB/s (alrededor del 68% del límite teórico de S3), 5,8 veces más que Kafka y 7 veces más que Pulsar. Aunque la latencia es mayor (166 ms), esta configuración proporciona un rendimiento excepcional para cargas de trabajo por lotes.</li>
<li>Modo de almacenamiento de objetos (MinIO): Incluso con MinIO, Woodpecker alcanzó 71 MB/s, alrededor del 65% de la capacidad de MinIO. Este rendimiento es comparable al de Kafka y Pulsar, pero con unos requisitos de recursos significativamente menores.</li>
</ul>
<p>Woodpecker está especialmente optimizado para escrituras concurrentes de gran volumen en las que es fundamental mantener el orden. Y estos resultados sólo reflejan las primeras fases de desarrollo: se espera que las optimizaciones en curso de la fusión de E/S, el almacenamiento en búfer inteligente y la precarga lleven el rendimiento aún más cerca de los límites teóricos.</p>
<h2 id="Operational-benefits" class="common-anchor-header">Ventajas operativas<button data-href="#Operational-benefits" class="anchor-icon" translate="no">
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
    </button></h2><p>La arquitectura nativa de la nube de Woodpecker agiliza la implantación, reduce el mantenimiento y mejora la fiabilidad.</p>
<h3 id="Simplified-infrastructure-management" class="common-anchor-header">Gestión simplificada de la infraestructura</h3><ul>
<li><strong>Sin gestión del almacenamiento local:</strong> Elimina la necesidad de gestionar volúmenes de disco, RAID o fallos de disco.</li>
<li><strong>Menor dependencia del hardware:</strong> Elimina la configuración y supervisión del hardware; la durabilidad y disponibilidad son gestionadas por el almacenamiento de objetos en la nube.</li>
<li><strong>Planificación simplificada de la capacidad:</strong> El almacenamiento se escala automáticamente con el almacenamiento de objetos en la nube, lo que elimina la necesidad de realizar previsiones manuales.</li>
</ul>
<h3 id="Simplified-deployment" class="common-anchor-header">Despliegue simplificado</h3><ul>
<li><strong>Modo MemoryBuffer:</strong> Utiliza recursos mínimos y se integra con el almacenamiento en la nube, ideal para el desarrollo y la producción a pequeña escala.</li>
<li><strong>Modo QuorumBuffer:</strong> Proporciona fiabilidad de nivel empresarial sin la complejidad del almacenamiento distribuido tradicional.</li>
</ul>
<h2 id="Cost-efficiency-and-resource-optimization" class="common-anchor-header">Rentabilidad y optimización de recursos<button data-href="#Cost-efficiency-and-resource-optimization" class="anchor-icon" translate="no">
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
<li><strong>Menor uso de memoria:</strong> El almacenamiento en búfer eficiente reduce los requisitos de memoria en comparación con los corredores tradicionales.</li>
<li><strong>Escalado elástico:</strong> El almacenamiento en la nube de pago por uso elimina el sobreaprovisionamiento.</li>
<li><strong>Reducción de los gastos generales de infraestructura:</strong> Menos componentes significan menores costes de despliegue y mantenimiento.</li>
</ul>
<h3 id="Storage-cost-advantages" class="common-anchor-header">Ventajas de costes de almacenamiento</h3><ul>
<li><strong>Almacenamiento por niveles:</strong> Migra automáticamente los datos a niveles de almacenamiento en nube rentables para su conservación a largo plazo.</li>
<li><strong>Compresión y deduplicación:</strong> Las funciones integradas reducen los costes de almacenamiento sin esfuerzo operativo adicional.</li>
<li><strong>Sin sobrecarga de replicación:</strong> La durabilidad es gestionada por el almacenamiento en la nube, eliminando la necesidad de gestión manual de réplicas.</li>
</ul>
<h2 id="High-availability-and-disaster-recovery" class="common-anchor-header">Alta disponibilidad y recuperación ante desastres<button data-href="#High-availability-and-disaster-recovery" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Simplified-fault-tolerance" class="common-anchor-header">Tolerancia a fallos simplificada</h3><ul>
<li><strong>Durabilidad nativa de la nube:</strong> Aprovecha las garantías de durabilidad de 11 nueves (99,999999999%) de los proveedores de la nube.</li>
<li><strong>Recuperación rápida:</strong> El estado local mínimo permite la sustitución rápida de nodos y la recuperación de clústeres.</li>
<li><strong>Resistencia entre regiones:</strong> Admite la replicación entre regiones mediante funciones de almacenamiento en la nube.</li>
</ul>
<h3 id="Operational-resilience" class="common-anchor-header">Resistencia operativa</h3><ul>
<li><strong>Menos puntos únicos de fallo:</strong> La reducción del número de componentes disminuye el riesgo de fallos.</li>
<li><strong>Conmutación automática por error:</strong> La redundancia del almacenamiento en la nube simplifica la conmutación por error.</li>
<li><strong>Copias de seguridad simplificadas:</strong> El almacenamiento en la nube integrado proporciona copias de seguridad y versiones automáticas.</li>
</ul>
<h2 id="Development-and-operational-experience" class="common-anchor-header">Experiencia operativa y de desarrollo<button data-href="#Development-and-operational-experience" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Improved-development-workflow" class="common-anchor-header">Flujo de trabajo de desarrollo mejorado</h3><ul>
<li><strong>Configuración más rápida del entorno:</strong> Las dependencias mínimas aceleran el desarrollo y las pruebas.</li>
<li><strong>Arquitectura coherente:</strong> Diseño uniforme en desarrollo, staging y producción.</li>
<li><strong>Integración nativa en la nube:</strong> Compatibilidad perfecta con servicios en la nube y orquestación de contenedores.</li>
</ul>
<h3 id="Enhanced-production-operations" class="common-anchor-header">Operaciones de producción mejoradas</h3><ul>
<li><strong>Rendimiento predecible:</strong> Resultados coherentes en todas las escalas y configuraciones de despliegue.</li>
<li><strong>Actualizaciones simplificadas:</strong> El diseño sin estado permite actualizaciones continuas con un tiempo de inactividad mínimo.</li>
<li><strong>Previsibilidad de recursos:</strong> Uso de recursos más estable en comparación con los agentes de mensajes tradicionales.</li>
</ul>
<p>Estas ventajas operativas son revolucionarias para las bases de datos vectoriales que soportan cargas de trabajo de misión crítica de GAR, agentes de IA y búsquedas de baja latencia. La transición de las complejas pilas de intermediarios de mensajes a la arquitectura simplificada de Woodpecker no solo aumenta el rendimiento, sino que también reduce significativamente la carga operativa de los equipos de desarrollo e infraestructura.</p>
<p>A medida que la infraestructura de nube sigue evolucionando con innovaciones como S3 Express One Zone, la arquitectura de Woodpecker permite a las organizaciones beneficiarse automáticamente de estos avances sin necesidad de grandes cambios operativos o rediseños del sistema.</p>
