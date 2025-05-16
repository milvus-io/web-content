---
id: install_cluster-helm.md
label: Helm
related_key: Kubernetes
summary: Saiba como instalar o cluster Milvus no Kubernetes.
title: Instalar o Milvus Cluster com o Helm
---
<h1 id="Run-Milvus-in-Kubernetes-with-Helm" class="common-anchor-header">Executar o Milvus no Kubernetes com o Helm<button data-href="#Run-Milvus-in-Kubernetes-with-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta página ilustra como iniciar uma instância do Milvus no Kubernetes usando <a href="https://github.com/zilliztech/milvus-helm">os gráficos do Milvus Helm</a>.</p>
<h2 id="Overview" class="common-anchor-header">Visão geral<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>O Helm usa um formato de empacotamento chamado gráficos. Um gráfico é uma coleção de arquivos que descrevem um conjunto relacionado de recursos do Kubernetes. O Milvus fornece um conjunto de gráficos para ajudá-lo a implantar dependências e componentes do Milvus.</p>
<h2 id="Prerequisites" class="common-anchor-header">Pré-requisitos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><p><a href="https://helm.sh/docs/intro/install/">Instalar o Helm CLI</a>.</p></li>
<li><p><a href="/docs/pt/v2.4.x/prerequisite-helm.md#How-can-I-start-a-K8s-cluster-locally-for-test-purposes">Criar um cluster K8s</a>.</p></li>
<li><p>Instalar uma <a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">StorageClass</a>. Pode verificar a StorageClass instalada da seguinte forma.</p>
<pre><code translate="no" class="language-bash">$ kubectl get sc

NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
<span class="hljs-title function_">standard</span> <span class="hljs-params">(<span class="hljs-keyword">default</span>)</span>    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Verifique <a href="/docs/pt/v2.4.x/prerequisite-helm.md">os requisitos de hardware e software</a> antes da instalação.</p></li>
<li><p>Antes de instalar o Milvus, recomenda-se a utilização da <a href="https://milvus.io/tools/sizing">Milvus Sizing Tool</a> para estimar os requisitos de hardware com base no tamanho dos dados. Isso ajuda a garantir o desempenho ideal e a alocação de recursos para a instalação do Milvus.</p></li>
</ul>
<div class="alert note">
<p>Se encontrar algum problema ao puxar a imagem, contacte-nos em <a href="mailto:community@zilliz.com">community@zilliz.com</a> com detalhes sobre o problema, e nós forneceremos o suporte necessário.</p>
</div>
<h2 id="Install-Milvus-Helm-Chart" class="common-anchor-header">Instalar o Milvus Helm Chart<button data-href="#Install-Milvus-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de instalar o Milvus Helm Charts, é necessário adicionar o repositório Milvus Helm.</p>
<pre><code translate="no">$ helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm/</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>O repositório do Milvus Helm Charts em <code translate="no">https://github.com/milvus-io/milvus-helm</code> foi arquivado e pode obter mais actualizações em <code translate="no">https://github.com/zilliztech/milvus-helm</code> da seguinte forma:</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm/
helm repo update
<span class="hljs-comment"># upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus
<button class="copy-code-btn"></button></code></pre>
<p>O repositório arquivado ainda está disponível para os gráficos até à versão 4.0.31. Para versões posteriores, utilize o novo repositório.</p>
</div>
<p>De seguida, obtenha os gráficos Milvus a partir do repositório da seguinte forma:</p>
<pre><code translate="no">$ helm repo update
<button class="copy-code-btn"></button></code></pre>
<p>Pode sempre executar este comando para obter os gráficos mais recentes do Milvus Helm.</p>
<h2 id="Online-install" class="common-anchor-header">Instalação online<button data-href="#Online-install" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Deploy-a-Milvus-cluster" class="common-anchor-header">1. Implantar um cluster do Milvus</h3><p>Depois de instalar o Helm chart, você pode iniciar o Milvus no Kubernetes. Esta secção irá guiá-lo através dos passos para iniciar o Milvus.</p>
<pre><code translate="no" class="language-shell">$ helm install my-release milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>No comando acima, <code translate="no">my-release</code> é o nome da versão e <code translate="no">milvus/milvus</code> é o repositório de gráficos instalado localmente. Para usar um nome diferente, substitua <code translate="no">my-release</code> pelo que achar melhor.</p>
<p>O comando acima implementa um cluster Milvus com seus componentes e dependências usando configurações padrão. Para personalizar estas definições, recomendamos que utilize a <a href="https://milvus.io/tools/sizing">Milvus Sizing Tool</a> para ajustar as configurações com base no tamanho real dos seus dados e, em seguida, transfira o ficheiro YAML correspondente. Para saber mais sobre os parâmetros de configuração, consulte a <a href="https://milvus.io/docs/system_configuration.md">Lista de verificação das configurações do sistema Milvus</a>.</p>
<div class="alert note">
  <ul>
    <li>O nome da versão deve conter apenas letras, números e traços. Não são permitidos pontos no nome da versão.</li>
    <li>A linha de comando padrão instala a versão de cluster do Milvus durante a instalação do Milvus com o Helm. São necessárias outras definições durante a instalação do Milvus autónomo.</li>
    <li>De acordo com o <a href="https://kubernetes.io/docs/reference/using-api/deprecation-guide/#v1-25">guia de migração de APIs obsoletas do Kubernetes</a>, a versão da API <b>policy/v1beta1</b> do PodDisruptionBudget não é mais servida a partir da versão 1.25. Sugere-se que você migre manifestos e clientes de API para usar a versão de API <b>policy/v1</b>. <br/>Como solução alternativa para os usuários que ainda usam a versão da API <b>policy/v1beta1</b> do PodDisruptionBudget no Kubernetes v1.25 e posterior, você pode executar o seguinte comando para instalar o Milvus:<br/> <code translate="no">helm install my-release milvus/milvus --set pulsar.bookkeeper.pdb.usePolicy=false,pulsar.broker.pdb.usePolicy=false,pulsar.proxy.pdb.usePolicy=false,pulsar.zookeeper.pdb.usePolicy=false</code></li> 
    <li>Consulte <a href="https://artifacthub.io/packages/helm/milvus/milvus">Gráfico de Helm do Milvus</a> e <a href="https://helm.sh/docs/">Helm</a> para obter mais informações.</li>
  </ul>
</div>
<h3 id="2-Check-Milvus-cluster-status" class="common-anchor-header">2. Verificar o status do cluster do Milvus</h3><p>Execute o seguinte comando para verificar o estado de todos os pods no seu cluster Milvus.</p>
<pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> pods
<button class="copy-code-btn"></button></code></pre>
<p>Quando todos os pods estiverem em execução, a saída do comando acima deverá ser semelhante à seguinte:</p>
<pre><code translate="no">NAME                                             READY  STATUS   RESTARTS  AGE
my-release-etcd-0                                1/1    Running   0        3m23s
my-release-etcd-1                                1/1    Running   0        3m23s
my-release-etcd-2                                1/1    Running   0        3m23s
my-release-milvus-datanode-68cb87dcbd-4khpm      1/1    Running   0        3m23s
my-release-milvus-indexnode-5c5f7b5bd9-l8hjg     1/1    Running   0        3m24s
my-release-milvus-mixcoord-7fb9488465-dmbbj      1/1    Running   0        3m23s
my-release-milvus-proxy-6bd7f5587-ds2xv          1/1    Running   0        3m24s
my-release-milvus-querynode-5cd8fff495-k6gtg     1/1    Running   0        3m24s
my-release-minio-0                               1/1    Running   0        3m23s
my-release-minio-1                               1/1    Running   0        3m23s
my-release-minio-2                               1/1    Running   0        3m23s
my-release-minio-3                               1/1    Running   0        3m23s
my-release-pulsar-autorecovery-86f5dbdf77-lchpc  1/1    Running   0        3m24s
my-release-pulsar-bookkeeper-0                   1/1    Running   0        3m23s
my-release-pulsar-bookkeeper-1                   1/1    Running   0        98s
my-release-pulsar-broker-556ff89d4c-2m29m        1/1    Running   0        3m23s
my-release-pulsar-proxy-6fbd75db75-nhg4v         1/1    Running   0        3m23s
my-release-pulsar-zookeeper-0                    1/1    Running   0        3m23s
my-release-pulsar-zookeeper-metadata-98zbr       0/1   Completed  0        3m24s
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Forward-a-local-port-to-Milvus" class="common-anchor-header">3. Encaminhar uma porta local para o Milvus</h3><p>Execute o seguinte comando para obter a porta em que o seu cluster Milvus serve.</p>
<pre><code translate="no" class="language-bash">$ kubectl <span class="hljs-keyword">get</span> pod my-release-milvus-proxy<span class="hljs-number">-6b</span>d7f5587-ds2xv --template
=<span class="hljs-string">&#x27;{{(index (index .spec.containers 0).ports 0).containerPort}}{{&quot;\n&quot;}}&#x27;</span>
<span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>A saída mostra que a instância do Milvus é servida na porta padrão <strong>19530</strong>.</p>
<div class="alert note">
<p>Se você implantou o Milvus no modo autônomo, altere o nome do pod de <code translate="no">my-release-milvus-proxy-xxxxxxxxxx-xxxxx</code> para <code translate="no">my-release-milvus-xxxxxxxxxx-xxxxx</code>.</p>
</div>
<p>Em seguida, execute o seguinte comando para encaminhar uma porta local para a porta em que o Milvus serve.</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward service/my-release-milvus <span class="hljs-number">27017</span>:<span class="hljs-number">19530</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>:<span class="hljs-number">27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>Opcionalmente, pode utilizar <code translate="no">:19530</code> em vez de <code translate="no">27017:19530</code> no comando acima para permitir que <code translate="no">kubectl</code> atribua uma porta local para si, para que não tenha de gerir conflitos de portas.</p>
<p>Por predefinição, o encaminhamento de portas do kubectl apenas escuta em <code translate="no">localhost</code>. Use a flag <code translate="no">address</code> se quiser que o Milvus escute nos endereços IP selecionados ou em todos. O seguinte comando faz com que o port-forward escute em todos os endereços IP na máquina hospedeira.</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward --address <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span> service/my-release-milvus <span class="hljs-number">27017</span>:<span class="hljs-number">19530</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>:<span class="hljs-number">27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Offline-install" class="common-anchor-header">Instalação offline<button data-href="#Offline-install" class="anchor-icon" translate="no">
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
    </button></h2><p>Se estiver num ambiente com restrições de rede, siga o procedimento desta secção para iniciar um cluster Milvus.</p>
<h3 id="1-Get-Milvus-manifest" class="common-anchor-header">1. Obter o manifesto do Milvus</h3><p>Execute o seguinte comando para obter o manifesto do Milvus.</p>
<pre><code translate="no" class="language-shell">$ helm template my-release milvus/milvus &gt; milvus_manifest.yaml
<button class="copy-code-btn"></button></code></pre>
<p>O comando acima renderiza modelos de gráficos para um cluster Milvus e salva a saída em um arquivo de manifesto chamado <code translate="no">milvus_manifest.yaml</code>. Usando esse manifesto, você pode instalar um cluster do Milvus com seus componentes e dependências em pods separados.</p>
<div class="alert note">
<ul>
<li>Para instalar uma instância do Milvus no modo autónomo, em que todos os componentes do Milvus estão contidos num único pod, deve executar <code translate="no">helm template my-release --set cluster.enabled=false --set etcd.replicaCount=1 --set minio.mode=standalone --set pulsar.enabled=false milvus/milvus &gt; milvus_manifest.yaml</code> para renderizar modelos de gráficos para uma instância do Milvus num modo autónomo.</li>
<li>Para alterar as configurações do Milvus, descarregue o modelo <a href="https://raw.githubusercontent.com/milvus-io/milvus-helm/master/charts/milvus/values.yaml"><code translate="no">value.yaml</code></a> coloque as configurações desejadas nele e use <code translate="no">helm template -f values.yaml my-release milvus/milvus &gt; milvus_manifest.yaml</code> para renderizar o manifesto de acordo.</li>
</ul>
</div>
<h3 id="2-Download-image-pulling-script" class="common-anchor-header">2. Descarregar o script de extração de imagens</h3><p>O script de extração de imagens é desenvolvido em Python. Deve descarregar o script juntamente com as suas dependências no ficheiro <code translate="no">requirement.txt</code>.</p>
<pre><code translate="no" class="language-shell">$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/requirements.txt</span>
$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/save_image.py</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Pull-and-save-images" class="common-anchor-header">3. Extrair e guardar imagens</h3><p>Execute o seguinte comando para extrair e guardar as imagens necessárias.</p>
<pre><code translate="no" class="language-shell">$ pip3 install -r requirements.txt
$ python3 save_image.py --manifest milvus_manifest.yaml
<button class="copy-code-btn"></button></code></pre>
<p>As imagens são puxadas para uma subpasta chamada <code translate="no">images</code> no diretório atual.</p>
<h3 id="4-Load-images" class="common-anchor-header">4. Carregar imagens</h3><p>Pode agora carregar as imagens para os anfitriões no ambiente de rede restrita da seguinte forma:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-keyword">for</span> image <span class="hljs-keyword">in</span> $(find . -<span class="hljs-built_in">type</span> f -name <span class="hljs-string">&quot;*.tar.gz&quot;</span>) ; <span class="hljs-keyword">do</span> gunzip -c <span class="hljs-variable">$image</span> | docker load; <span class="hljs-keyword">done</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="5-Deploy-Milvus" class="common-anchor-header">5. Implantar o Milvus</h3><pre><code translate="no" class="language-shell">$ kubectl apply -f milvus_manifest.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Até agora, pode seguir os passos <a href="#2-Check-Milvus-cluster-status">2</a> e <a href="#3-Forward-a-local-port-to-Milvus">3</a> da instalação online para verificar o estado do cluster e encaminhar uma porta local para o Milvus.</p>
<h2 id="Upgrade-running-Milvus-cluster" class="common-anchor-header">Atualizar o cluster do Milvus em execução<button data-href="#Upgrade-running-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Execute o seguinte comando para atualizar o seu cluster Milvus em execução para a versão mais recente:</p>
<pre><code translate="no" class="language-shell">$ helm repo update
$ helm upgrade my-release zilliztech/milvus
<button class="copy-code-btn"></button></code></pre>
<h2 id="Uninstall-Milvus" class="common-anchor-header">Desinstalar o Milvus<button data-href="#Uninstall-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Execute o seguinte comando para desinstalar o Milvus.</p>
<pre><code translate="no" class="language-bash">$ helm uninstall my-release
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Depois de instalar o Milvus no Docker, você pode:</p>
<ul>
<li><p>Verificar o <a href="/docs/pt/v2.4.x/quickstart.md">Hello Milvus</a> para ver o que o Milvus pode fazer.</p></li>
<li><p>Aprender as operações básicas do Milvus:</p>
<ul>
<li><a href="/docs/pt/v2.4.x/manage_databases.md">Gerenciar bancos de dados</a></li>
<li><a href="/docs/pt/v2.4.x/manage-collections.md">Gerenciar coleções</a></li>
<li><a href="/docs/pt/v2.4.x/manage-partitions.md">Gerir partições</a></li>
<li><a href="/docs/pt/v2.4.x/insert-update-delete.md">Inserir, Upsert e Apagar</a></li>
<li><a href="/docs/pt/v2.4.x/single-vector-search.md">Pesquisa de vetor único</a></li>
<li><a href="/docs/pt/v2.4.x/multi-vector-search.md">Pesquisa híbrida</a></li>
</ul></li>
<li><p><a href="/docs/pt/v2.4.x/upgrade_milvus_cluster-helm.md">Atualizar o Milvus usando o Helm Chart</a>.</p></li>
<li><p><a href="/docs/pt/v2.4.x/scaleout.md">Escalar o cluster do Milvus</a>.</p></li>
<li><p>Implantar seu cluster Milvus em nuvens:</p>
<ul>
<li><a href="/docs/pt/v2.4.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/pt/v2.4.x/gcp.md">Google Cloud</a></li>
<li><a href="/docs/pt/v2.4.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Explore <a href="/docs/pt/v2.4.x/milvus_backup_overview.md">o Milvus Backup</a>, uma ferramenta de código aberto para backups de dados do Milvus.</p></li>
<li><p>Explore o <a href="/docs/pt/v2.4.x/birdwatcher_overview.md">Birdwatcher</a>, uma ferramenta de código aberto para depuração do Milvus e actualizações de configuração dinâmica.</p></li>
<li><p>Explore <a href="https://milvus.io/docs/attu.md">o Attu</a>, uma ferramenta GUI de código aberto para gerenciamento intuitivo do Milvus.</p></li>
<li><p><a href="/docs/pt/v2.4.x/monitor.md">Monitore o Milvus com o Prometheus</a>.</p></li>
</ul>
