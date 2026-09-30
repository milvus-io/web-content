---
id: prerequisite-docker.md
label: Standalone requirements
related_key: Standalone
summary: Conheça os preparativos necessários antes de instalar o Milvus Standalone.
title: Requisitos para a instalação do Milvus Standalone
---
<h1 id="Requirements-for-Installing-Milvus-Standalone" class="common-anchor-header">Requisitos para a instalação do Milvus Standalone<button data-href="#Requirements-for-Installing-Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h1><p>Antes de instalar uma instância do Milvus Standalone, verifique se o seu hardware e software cumprem os requisitos.</p>
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
<tr><td>CPU</td><td><ul><li>CPU Intel Core de 2.ª geração ou superior</li><li>Apple Silicon</li></ul></td><td><ul><li>Autónomo: 4 núcleos ou mais</li><li>Cluster: 8 núcleos ou mais</li></ul></td><td></td></tr>
<tr><td>Conjunto de instruções da CPU</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>A pesquisa de similaridade de vetores e a criação de índices no Milvus requerem que a CPU suporte conjuntos de extensões de instrução única, dados múltiplos (SIMD). Certifique-se de que a CPU suporta, pelo menos, uma das extensões SIMD listadas. Consulte <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">CPUs com AVX</a> para obter mais informações.</td></tr>
<tr><td>RAM</td><td><ul><li>Autónomo: 8G</li><li>Cluster: 32 G</li></ul></td><td><ul><li>Autónomo: 16 G</li><li>Cluster: 128 G</li></ul></td><td>A capacidade da RAM depende do volume de dados.</td></tr>
<tr><td>Disco rígido</td><td>SSD SATA 3.0 ou superior</td><td>SSD NVMe ou superior</td><td>A capacidade do disco rígido depende do volume de dados.</td></tr>
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
<tr><td>macOS 10.14 ou posterior</td><td>Docker Desktop</td><td>Configure a máquina virtual (VM) do Docker para utilizar, no mínimo, 2 CPUs virtuais (vCPUs) e 8 GB de memória inicial. Caso contrário, a instalação poderá falhar. <br/>Consulte <a href="https://docs.docker.com/desktop/mac/install/">Instalar o Docker Desktop no Mac</a> para obter mais informações.</td></tr>
<tr><td>Plataformas Linux</td><td><ul><li>Docker 19.03 ou posterior</li><li>Docker Compose 1.25.1 ou posterior</li></ul></td><td>Consulte <a href="https://docs.docker.com/engine/install/">Instalar o Docker Engine</a> e <a href="https://docs.docker.com/compose/install/">Instalar o Docker Compose</a> para obter mais informações.</td></tr>
<tr><td>Windows com o WSL 2 ativado</td><td>Docker Desktop</td><td>Recomendamos que armazene o código-fonte e outros dados montados por ligação em contentores Linux no sistema de ficheiros Linux, em vez de no sistema de ficheiros do Windows.<br/>Consulte <a href="https://docs.docker.com/desktop/windows/install/#wsl-2-backend">Instalar o Docker Desktop no Windows com backend WSL 2</a> para obter mais informações.</td></tr>
</tbody>
</table>
<p>As seguintes dependências serão obtidas e configuradas automaticamente quando o Milvus Standalone for instalado utilizando o script do Docker ou a configuração do Docker Compose:</p>
<table>
<thead>
<tr><th>Software</th><th>Versão</th><th>Nota</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td>Consulte <a href="#Additional-disk-requirements">os requisitos adicionais de espaço em disco</a>.</td></tr>
<tr><td>MinIO</td><td>LANÇAMENTO.2024-12-18T13-15-44Z</td><td></td></tr>
<tr><td>Woodpecker</td><td>Incluído no Milvus</td><td>Fila de mensagens predefinida (incorporada); não é necessário instalar nenhum serviço separado.</td></tr>
<tr><td>Pulsar</td><td>2.8.2</td><td>Opcional — apenas se mudar a fila de mensagens para o Pulsar; não é instalado por predefinição.</td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">Requisitos adicionais de disco<button data-href="#Additional-disk-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>O desempenho do disco é fundamental para o etcd. É altamente recomendável que utilize SSDs NVMe locais. Uma resposta mais lenta do disco pode causar eleições frequentes no cluster, o que acabará por prejudicar o serviço etcd.</p>
<p>Para testar se o seu disco está apto, utilize <a href="https://github.com/axboe/fio">o fio</a>.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>Idealmente, o disco dedicado ao etcd deve atingir mais de 500 IOPS e uma latência de fsync no 99.º percentil inferior a 10 ms. Consulte a <a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">documentação</a> do etcd para obter requisitos mais detalhados.</p>
<h2 id="Whats-next" class="common-anchor-header">Próximos passos<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Se o seu hardware e software cumprirem os requisitos acima, pode</p>
<ul>
<li><a href="/docs/pt/install_standalone-docker.md">Executar o Milvus no Docker</a></li>
<li><a href="/docs/pt/install_standalone-docker-compose.md">Executar o Milvus com o Docker Compose</a></li>
</ul>
