---
id: prerequisite-docker.md
label: Docker requirements
related_key: Docker
summary: >-
  Conozca los preparativos necesarios antes de instalar Milvus con Docker
  Compose.
title: Requisitos para instalar Milvus con Docker Compose
---
<h1 id="Requirements-for-Installing-Milvus-with-Docker-Compose" class="common-anchor-header">Requisitos para instalar Milvus con Docker Compose<button data-href="#Requirements-for-Installing-Milvus-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>Antes de instalar una instancia de Milvus, compruebe su hardware y software para ver si cumplen los requisitos.</p>
<h2 id="Hardware-requirements" class="common-anchor-header">Requisitos de hardware<button data-href="#Hardware-requirements" class="anchor-icon" translate="no">
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
<tr><th>Componente</th><th>Requisito</th><th>Recomendación</th><th>Nota</th></tr>
</thead>
<tbody>
<tr><td>CPU</td><td><ul><li>CPU Intel 2nd Gen Core o superior</li><li>Silicio Apple</li></ul></td><td><ul><li>Independiente: 4 núcleos o más</li><li>Clúster: 8 núcleos o más</li></ul></td><td></td></tr>
<tr><td>Conjunto de instrucciones de la CPU</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>La búsqueda de similitud vectorial y la creación de índices en Milvus requieren que la CPU soporte conjuntos de extensiones SIMD (instrucción única, datos múltiples). Asegúrese de que la CPU soporta al menos una de las extensiones SIMD listadas. Consulte <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">CPUs con AVX</a> para obtener más información.</td></tr>
<tr><td>RAM</td><td><ul><li>Independiente: 8G</li><li>Clúster: 32G</li></ul></td><td><ul><li>Independiente: 16G</li><li>Clúster: 128G</li></ul></td><td>El tamaño de la RAM depende del volumen de datos.</td></tr>
<tr><td>Disco duro</td><td>SSD SATA 3.0 o superior</td><td>SSD NVMe o superior</td><td>El tamaño del disco duro depende del volumen de datos.</td></tr>
</tbody>
</table>
<h2 id="Software-requirements" class="common-anchor-header">Requisitos de software<button data-href="#Software-requirements" class="anchor-icon" translate="no">
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
<tr><th>Sistema operativo</th><th>Software</th><th>Nota</th></tr>
</thead>
<tbody>
<tr><td>macOS 10.14 o posterior</td><td>Escritorio Docker</td><td>Configure la máquina virtual (VM) de Docker para que utilice un mínimo de 2 CPU virtuales (vCPU) y 8 GB de memoria inicial. De lo contrario, la instalación podría fallar. <br/>Consulte <a href="https://docs.docker.com/desktop/mac/install/">Instalar Docker Desktop en Mac</a> para obtener más información.</td></tr>
<tr><td>Plataformas Linux</td><td><ul><li>Docker 19.03 o posterior</li><li>Docker Compose 1.25.1 o posterior</li></ul></td><td>Consulte <a href="https://docs.docker.com/engine/install/">Instalar Docker Engine</a> e <a href="https://docs.docker.com/compose/install/">Instalar Docker Comp</a> ose para obtener más información.</td></tr>
<tr><td>Windows con WSL 2 habilitado</td><td>Escritorio Docker</td><td>Le recomendamos que almacene el código fuente y otros datos montados en contenedores Linux en el sistema de archivos Linux en lugar del sistema de archivos Windows.<br/>Consulte <a href="https://docs.docker.com/desktop/windows/install/#wsl-2-backend">Instalar Docker Desktop en Windows con WSL 2 backend</a> para obtener más información.</td></tr>
</tbody>
</table>
<p>Las siguientes dependencias se obtendrán y configurarán automáticamente cuando Milvus Standalone se instale utilizando el script Docker, o la configuración Docker Compose:</p>
<table>
<thead>
<tr><th>Software</th><th>Versión</th><th>Nota</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td>Consulte <a href="#Additional-disk-requirements">los requisitos de disco adicionales</a>.</td></tr>
<tr><td>MinIO</td><td>RELEASE.2023-03-20T20-16-18Z</td><td></td></tr>
<tr><td>Pulsar</td><td>2.8.2</td><td></td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">Requisitos adicionales del disco</h3><p>El rendimiento del disco es crítico para etcd. Se recomienda encarecidamente utilizar unidades SSD NVMe locales. Una respuesta más lenta del disco puede causar frecuentes elecciones de cluster que acabarán degradando el servicio etcd.</p>
<p>Para comprobar si su disco está cualificado, utilice <a href="https://github.com/axboe/fio">fio</a>.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>Idealmente, su disco debería alcanzar más de 500 IOPS y por debajo de 10ms para el percentil 99 de latencia fsync. Lee <a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">la documentación de</a> etcd para conocer los requisitos con más detalle.</p>
<h2 id="Whats-next" class="common-anchor-header">Lo que sigue<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Si su hardware y software cumplen los requisitos anteriores, puede</p>
<ul>
<li><a href="/docs/es/v2.4.x/install_standalone-docker.md">Ejecutar Milvus en Docker</a></li>
<li><a href="/docs/es/v2.4.x/install_standalone-docker-compose.md">Ejecutar Milvus con Docker Compose</a></li>
</ul>
