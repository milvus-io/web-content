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
    </button></h1><p>Esta página lista os requisitos de hardware e software para colocar o Milvus em funcionamento.</p>
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
<tr><td>Disco rígido</td><td>SSD SATA 3.0 ou CloudStorage</td><td>SSD NVMe ou superior</td><td>O tamanho do disco rígido depende do volume de dados.</td></tr>
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
    </button></h2><p>Recomenda-se que execute o cluster Kubernetes em plataformas Linux.</p>
<p>kubectl é a ferramenta de linha de comando para o Kubernetes. Use uma versão do kubectl que esteja dentro de uma diferença de versão menor do seu cluster. Usar a versão mais recente do kubectl ajuda a evitar problemas imprevistos.</p>
<p>minikube é necessário ao executar o cluster Kubernetes localmente. minikube requer o Docker como uma dependência. Certifique-se de que instala o Docker antes de instalar o Milvus utilizando o Helm. Consulte <a href="https://docs.docker.com/get-docker">Obter o Docker</a> para <a href="https://docs.docker.com/get-docker">obter</a> mais informações.</p>
<table>
<thead>
<tr><th>Sistema operativo</th><th>Software</th><th>Nota</th></tr>
</thead>
<tbody>
<tr><td>Plataformas Linux</td><td><ul><li>Kubernetes 1.16 ou posterior</li><li>kubectl</li><li>Helm 3.0.0 ou posterior</li><li>minikube (para Milvus autónomo)</li><li>Docker 19.03 ou posterior (para Milvus autónomo)</li></ul></td><td>Consulte <a href="https://helm.sh/docs/">os documentos do Helm</a> para obter mais informações.</td></tr>
</tbody>
</table>
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
<h3 id="Additional-disk-requirements" class="common-anchor-header">Requisitos adicionais de disco</h3><p>O desempenho do disco é crítico para o etcd. É altamente recomendado que você use SSDs NVMe locais. A resposta mais lenta do disco pode causar eleições frequentes do cluster que eventualmente degradarão o serviço etcd.</p>
<p>Para testar se seu disco é qualificado, use <a href="https://github.com/axboe/fio">fio</a>.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>Idealmente, seu disco deve atingir mais de 500 IOPS e menos de 10ms para o percentil 99 da latência do fsync. Leia os <a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">documentos</a> do etcd para obter requisitos mais detalhados.</p>
<h2 id="FAQs" class="common-anchor-header">FAQs<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">Como posso iniciar um cluster K8s localmente para fins de teste?</h3><p>Você pode usar ferramentas como <a href="https://minikube.sigs.k8s.io/docs/">minikube</a>, <a href="https://kind.sigs.k8s.io/">kind</a> e <a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a> para configurar rapidamente um cluster Kubernetes localmente. O procedimento a seguir usa o minikube como exemplo.</p>
<ol>
<li>Descarregar o minikube</li>
</ol>
<p>Aceda à página <a href="https://minikube.sigs.k8s.io/docs/start/">Get Started</a>, verifique se cumpre as condições listadas na secção <strong>What you'll need</strong>, clique nos botões que descrevem a sua plataforma de destino e copie os comandos para transferir e instalar o binário.</p>
<ol start="2">
<li>Iniciar um cluster K8s usando o minikube</li>
</ol>
<pre><code translate="no" class="language-shell">$ minikube start
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Verificar o estado do cluster K8s</li>
</ol>
<p>Pode verificar o estado do cluster K8s instalado utilizando o seguinte comando.</p>
<pre><code translate="no" class="language-shell">$ kubectl cluster-info
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Certifique-se de que pode aceder ao cluster K8s através de <code translate="no">kubectl</code>. Se não tiver instalado o <code translate="no">kubectl</code> localmente, consulte <a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">Usar o kubectl dentro do minikube</a>.</p>
</div>
<h2 id="Whats-next" class="common-anchor-header">O que se segue<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>Se o seu hardware e software cumprem os requisitos, pode:</p>
<ul>
<li><a href="/docs/pt/v2.4.x/install_cluster-milvusoperator.md">Executar o Milvus em Kubernetes com o Milvus Operator</a></li>
<li><a href="/docs/pt/v2.4.x/install_cluster-helm.md">Executar o Milvus no Kubernetes com o Helm</a></li>
</ul></li>
<li><p>Veja <a href="/docs/pt/v2.4.x/system_configuration.md">Configuração do Sistema</a> para parâmetros que pode definir durante a instalação do Milvus.</p></li>
</ul>
