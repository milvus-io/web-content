---
id: prerequisite-helm.md
label: Install on Kubernetes
related_key: Kubernetes
summary: Conheça os preparativos necessários antes de instalar o Milvus com o Helm.
title: Requisitos para executar o Milvus no Kubernetes
---
<h1 id="Requirements-for-running-Milvus-on-Kubernetes" class="common-anchor-header">Requisitos para executar o Milvus no Kubernetes<button data-href="#Requirements-for-running-Milvus-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta página enumera os requisitos de hardware e software necessários para colocar o Milvus em funcionamento.</p>
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
<tr><td>Disco rígido</td><td>SSD SATA 3.0 ou CloudStorage</td><td>SSD NVMe ou superior</td><td>A capacidade do disco rígido depende do volume de dados.</td></tr>
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
    </button></h2><p>Recomenda-se que execute o cluster do Kubernetes em plataformas Linux.</p>
<p>O kubectl é a ferramenta de linha de comandos do Kubernetes. Utilize uma versão do kubectl que tenha, no máximo, uma diferença de versão secundária em relação ao seu cluster. A utilização da versão mais recente do kubectl ajuda a evitar problemas imprevistos.</p>
<p>O minikube é necessário para executar o cluster do Kubernetes localmente. O minikube requer o Docker como dependência. Certifique-se de que instala o Docker antes de instalar o Milvus utilizando o Helm. Consulte <a href="https://docs.docker.com/get-docker">Obter o Docker</a> para obter mais informações.</p>
<table>
<thead>
<tr><th>Sistema operativo</th><th>Software</th><th>Nota</th></tr>
</thead>
<tbody>
<tr><td>Plataformas Linux</td><td><ul><li>Kubernetes 1.16 ou posterior</li><li>kubectl</li><li>Helm 3.0.0 ou posterior</li><li>minikube (para o Milvus autónomo)</li><li>Docker 19.03 ou posterior (para o Milvus autónomo)</li></ul></td><td>Consulte <a href="https://helm.sh/docs/">a documentação do Helm</a> para obter mais informações.</td></tr>
</tbody>
</table>
<table>
<thead>
<tr><th>Software</th><th>Versão</th><th>Nota</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td>Consulte <a href="#Additional-disk-requirements">os requisitos adicionais de espaço em disco</a>.</td></tr>
<tr><td>MinIO</td><td>LANÇAMENTO.2024-12-18T13-15-44Z</td><td></td></tr>
<tr><td>Woodpecker</td><td>Incluído no Milvus (modo de serviço: <code translate="no">v0.1.36</code>+)</td><td>Fila de mensagens predefinida. Para implementações distribuídas, o Woodpecker pode ser executado como um <strong>serviço</strong> dedicado; fixe a sua versão com <code translate="no">--set woodpecker.image.tag</code>. O modo de serviço é suportado a partir da versão <code translate="no">v0.1.36</code> do Woodpecker.</td></tr>
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
    </button></h3><p>O desempenho do disco é fundamental para o etcd. É altamente recomendável que utilize SSDs NVMe locais. Uma resposta mais lenta do disco pode causar eleições frequentes no cluster, o que acabará por degradar o serviço etcd.</p>
<p>Para testar se o seu disco está apto, utilize <a href="https://github.com/axboe/fio">o fio</a>.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>Idealmente, o seu disco deve atingir mais de 500 IOPS e um tempo de latência fsync inferior a 10 ms no 99.º percentil. Consulte a <a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">documentação</a> do etcd para obter requisitos mais detalhados.</p>
<h2 id="FAQs" class="common-anchor-header">Perguntas frequentes<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">Como posso iniciar um cluster K8s localmente para fins de teste?<button data-href="#How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="anchor-icon" translate="no">
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
    </button></h3><p>Pode utilizar ferramentas como <a href="https://minikube.sigs.k8s.io/docs/">o minikube</a>, <a href="https://kind.sigs.k8s.io/">o kind</a> e <a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">o Kubeadm</a> para configurar rapidamente um cluster do Kubernetes localmente. O procedimento seguinte utiliza o minikube como exemplo.</p>
<ol>
<li>Descarregue o minikube</li>
</ol>
<p>Aceda à página <a href="https://minikube.sigs.k8s.io/docs/start/">«Começar»</a>, verifique se cumpre as condições indicadas na secção <strong>«O que vai precisar»</strong>, clique nos botões correspondentes à sua plataforma de destino e copie os comandos para descarregar e instalar o binário.</p>
<ol start="2">
<li>Inicie um cluster K8s utilizando o minikube</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">minikube start</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Verifique o estado do cluster K8s</li>
</ol>
<p>Pode verificar o estado do cluster K8s instalado utilizando o comando seguinte.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl cluster-info</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Certifique-se de que consegue aceder ao cluster K8s através de <code translate="no">kubectl</code>. Se ainda não instalou o <code translate="no">kubectl</code> localmente, consulte <a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">«Utilizar o kubectl no minikube</a>».</p>
</div>
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
    </button></h2><ul>
<li><p>Se o seu hardware e software cumprirem os requisitos, pode:</p>
<ul>
<li><a href="/docs/pt/install_cluster-milvusoperator.md">Executar o Milvus no Kubernetes com o Milvus Operator</a></li>
<li><a href="/docs/pt/install_cluster-helm.md">Executar o Milvus no Kubernetes com o Helm</a></li>
</ul></li>
<li><p>Consulte <a href="/docs/pt/system_configuration.md">«Configuração do sistema»</a> para conhecer os parâmetros que pode definir durante a instalação do Milvus.</p></li>
</ul>
