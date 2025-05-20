---
id: prerequisite-docker.md
label: Docker requirements
related_key: Docker
summary: >-
  Saiba quais são os preparativos necessários antes de instalar o Milvus com o
  Docker Compose.
title: Requisitos para instalar o Milvus com o Docker Compose
---
<h1 id="Requirements-for-Installing-Milvus-with-Docker-Compose" class="common-anchor-header">Requisitos para instalar o Milvus com o Docker Compose<button data-href="#Requirements-for-Installing-Milvus-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>Antes de instalar uma instância do Milvus, verifique seu hardware e software para ver se eles atendem aos requisitos.</p>
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
<tr><th>Componente</th><th>Requisito</th><th>Recomendação</th><th>Nota</th></tr>
</thead>
<tbody>
<tr><td>CPU</td><td><ul><li>CPU Intel 2nd Gen Core ou superior</li><li>Silício Apple</li></ul></td><td><ul><li>Autónomo: 4 núcleos ou mais</li><li>Cluster: 8 núcleos ou mais</li></ul></td><td></td></tr>
<tr><td>Conjunto de instruções da CPU</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>A pesquisa de similaridade de vectores e a construção de índices no Milvus requerem o suporte da CPU para conjuntos de extensões de instrução única e dados múltiplos (SIMD). Certifique-se de que a CPU suporta pelo menos uma das extensões SIMD listadas. Consulte <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">CPUs com AVX</a> para obter mais informações.</td></tr>
<tr><td>RAM</td><td><ul><li>Autónomo: 8G</li><li>Cluster: 32G</li></ul></td><td><ul><li>Autónomo: 16G</li><li>Cluster: 128G</li></ul></td><td>O tamanho da RAM depende do volume de dados.</td></tr>
<tr><td>Disco rígido</td><td>SSD SATA 3.0 ou superior</td><td>SSD NVMe ou superior</td><td>O tamanho do disco rígido depende do volume de dados.</td></tr>
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
<tr><td>macOS 10.14 ou posterior</td><td>Ambiente de trabalho do Docker</td><td>Defina a máquina virtual (VM) do Docker para usar um mínimo de 2 CPUs virtuais (vCPUs) e 8 GB de memória inicial. Caso contrário, a instalação poderá falhar. <br/>Consulte <a href="https://docs.docker.com/desktop/mac/install/">Instalar o Docker Desktop no Mac</a> para obter mais informações.</td></tr>
<tr><td>Plataformas Linux</td><td><ul><li>Docker 19.03 ou posterior</li><li>Docker Compose 1.25.1 ou posterior</li></ul></td><td>Consulte <a href="https://docs.docker.com/engine/install/">Instalar o Docker Engine</a> e <a href="https://docs.docker.com/compose/install/">Instalar o Docker Compose</a> para obter mais informações.</td></tr>
<tr><td>Windows com WSL 2 ativado</td><td>Ambiente de trabalho do Docker</td><td>Recomendamos que armazene o código-fonte e outros dados montados em contentores Linux no sistema de ficheiros Linux em vez do sistema de ficheiros Windows.<br/>Consulte <a href="https://docs.docker.com/desktop/windows/install/#wsl-2-backend">Instalar o Docker Desktop no Windows com backend WSL 2</a> para obter mais informações.</td></tr>
</tbody>
</table>
<p>As seguintes dependências serão obtidas e configuradas automaticamente quando o Milvus Standalone for instalado usando o script do Docker ou a configuração do Docker Compose:</p>
<table>
<thead>
<tr><th>Software</th><th>Versão do software</th><th>Nota</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td>Consulte <a href="#Additional-disk-requirements">os requisitos de disco adicionais</a>.</td></tr>
<tr><td>MinIO</td><td>RELEASE.2023-03-20T20-16-18Z</td><td></td></tr>
<tr><td>Pulsar</td><td>2.8.2</td><td></td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">Requisitos adicionais de disco</h3><p>O desempenho do disco é crítico para o etcd. É altamente recomendado que você use SSDs NVMe locais. Uma resposta mais lenta do disco pode causar eleições frequentes do cluster que eventualmente degradarão o serviço etcd.</p>
<p>Para testar se seu disco é qualificado, use <a href="https://github.com/axboe/fio">fio</a>.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>Idealmente, seu disco deve atingir mais de 500 IOPS e menos de 10ms para o percentil 99 da latência do fsync. Leia os <a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">documentos</a> do etcd para obter requisitos mais detalhados.</p>
<h2 id="Whats-next" class="common-anchor-header">O que vem a seguir<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Se o seu hardware e software atenderem aos requisitos acima, você poderá</p>
<ul>
<li><a href="/docs/pt/v2.4.x/install_standalone-docker.md">Executar o Milvus no Docker</a></li>
<li><a href="/docs/pt/v2.4.x/install_standalone-docker-compose.md">Executar o Milvus com o Docker Compose</a></li>
</ul>
