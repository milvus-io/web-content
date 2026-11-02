---
id: install-overview.md
summary: >-
  Escolha o Milvus Lite, o Standalone ou o Distributed consoante a sua carga de
  trabalho, os requisitos de disponibilidade e o ambiente operativo.
title: Visão geral das opções de implementação do Milvus
---
<h1 id="Overview-of-Milvus-Deployment-Options" class="common-anchor-header">Visão geral das opções de implementação do Milvus<button data-href="#Overview-of-Milvus-Deployment-Options" class="anchor-icon" translate="no">
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
    </button></h1><p>O Milvus suporta protótipos locais e serviços de pesquisa vetorial em grande escala. Escolha entre o Milvus Lite, o Milvus Standalone e o Milvus Distributed com base nos seus dados, na carga de leitura e escrita, nos requisitos de disponibilidade e no ambiente operativo.</p>
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
    </button></h2><p><a href="https://milvus.io/docs/milvus_lite.md">O Milvus Lite</a> é uma biblioteca Python que pode ser importada para as suas aplicações. Sendo uma versão leve do Milvus, é ideal para a prototipagem rápida em Jupyter Notebooks ou para execução em dispositivos inteligentes com recursos limitados. O Milvus Lite suporta as mesmas APIs que outras implementações do Milvus. O código do lado do cliente que interage com o Milvus Lite também pode funcionar com instâncias do Milvus noutros modos de implementação.</p>
<p>Para os exemplos locais, utilize o Python 3.10 ou posterior e instale explicitamente a dependência opcional «Lite». No Windows, o pip ignora o extra « <code translate="no">milvus-lite</code> », pelo que é necessário indicar explicitamente o nome do pacote:</p>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus[milvus-lite]==3.0.2&quot;</span> <span class="hljs-string">&quot;milvus-lite==3.2.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Utilize <code translate="no">MilvusClient(&quot;./demo.db&quot;)</code> para aceder ao armazenamento local. O Milvus Lite 3.x cria um diretório neste caminho; um ficheiro de base de dados existente do Milvus Lite 2.x requer exportação e migração. Consulte <a href="/docs/pt/milvus_lite.md">Executar o Milvus Lite</a> para conhecer os requisitos da plataforma e <a href="/docs/pt/quickstart.md">o Guia de Início Rápido</a> para um exemplo completo de inserção e pesquisa.</p>
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
    </button></h2><p>O Milvus Standalone é uma implementação de servidor numa única máquina. Todos os componentes do Milvus Standalone estão incluídos numa única <a href="https://milvus.io/docs/install_standalone-docker.md">imagem Docker</a>, o que facilita a implementação. Se tiver uma carga de trabalho de produção, mas preferir não utilizar o Kubernetes, executar o Milvus Standalone numa única máquina com memória suficiente é uma boa opção. Por predefinição, o Milvus Standalone executa <strong>o Woodpecker</strong> (incorporado) como a sua fila de mensagens, pelo que não é necessário operar um serviço de mensagens separado.</p>
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
    </button></h2><p>O Milvus Distributed pode ser implementado em clusters <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">do Kubernetes</a>. Esta implementação apresenta uma arquitetura nativa da nuvem, na qual a carga de ingestão e as consultas de pesquisa são tratadas separadamente por nós isolados, permitindo redundância para componentes críticos. Oferece a máxima escalabilidade e disponibilidade, bem como flexibilidade na personalização dos recursos alocados em cada componente. O Milvus Distributed é a melhor escolha para utilizadores empresariais que executam sistemas de pesquisa vetorial em grande escala em produção. Por predefinição, o Milvus Distributed utiliza <strong>o Woodpecker</strong> como fila de mensagens, implementado como um serviço dedicado a par do Milvus.</p>
<h2 id="Choose-the-Right-Deployment-for-Your-Use-Case" class="common-anchor-header">Escolha a implementação adequada para o seu caso de utilização<button data-href="#Choose-the-Right-Deployment-for-Your-Use-Case" class="anchor-icon" translate="no">
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
    </button></h2><p>A seleção de um modo de implementação depende normalmente da fase de desenvolvimento da sua aplicação:</p>
<ul>
<li><p><strong>Para prototipagem rápida</strong></p>
<p>Utilize o Milvus Lite num notebook para testar embeddings, estratégias de fragmentação RAG e comportamento de recuperação. Mude para o Milvus Standalone quando precisar de um servidor partilhado ou quando a memória e a carga de consultas excederem a capacidade do ambiente local. A API do cliente é semelhante, mas verifique as diferenças de funcionalidades e migre os dados armazenados separadamente.</p></li>
<li><p><strong>Implementação em produção em pequena escala</strong></p>
<p>Utilize o Milvus Standalone quando um único servidor puder satisfazer os seus requisitos de carga de trabalho e disponibilidade e preferir operar sem o Kubernetes. Estime a memória com base nas dimensões dos vetores, nos campos escalares, nas definições do índice e nas réplicas; em seguida, avalie o desempenho da simultaneidade de consultas e da taxa de gravação esperadas. A contagem de vetores, por si só, não determina a capacidade.</p></li>
<li><p><strong>Implementação em produção em grande escala</strong></p>
<p>À medida que o seu negócio cresce rapidamente e a escala de dados excede a capacidade de um único servidor, é altura de considerar o Milvus Distributed. Pode continuar a utilizar o Milvus Standalone para o ambiente de desenvolvimento ou de teste, pela sua conveniência, e operar o cluster K8s que executa o Milvus Distributed. Isto permite-lhe suportar dezenas de milhares de milhões de vetores, além de proporcionar flexibilidade na adaptação do tamanho dos nós à sua carga de trabalho específica, como casos de elevada leitura e gravação pouco frequente ou de elevada gravação e baixa leitura.</p></li>
<li><p><strong>Pesquisa local em dispositivos de borda</strong></p>
<p>Para efetuar pesquisas em dispositivos de borda que contenham dados privados ou sensíveis, pode implementar o Milvus Lite no próprio dispositivo sem depender de um serviço baseado na nuvem para realizar pesquisas de texto ou imagens. Isto é adequado para casos como a pesquisa de documentos proprietários ou a deteção de objetos no próprio dispositivo.</p></li>
</ul>
<p>A escolha do modo de implementação do Milvus depende da fase e da escala do seu projeto. O Milvus oferece uma solução flexível e poderosa para diversas necessidades, desde a prototipagem rápida até à implementação empresarial em grande escala.</p>
<ul>
<li><strong>O Milvus Lite</strong> adapta-se à avaliação local e a cargas de trabalho dentro dos recursos de uma única aplicação.</li>
<li><strong>O Milvus Standalone</strong> fornece um serviço partilhado quando um servidor satisfaz os seus requisitos de capacidade e disponibilidade.</li>
<li><strong>O Milvus Distributed</strong> proporciona escalabilidade e redundância ao nível dos componentes quando é necessário expandir para além de um servidor ou isolar recursos de leitura e escrita.</li>
</ul>
<p>O Milvus Standalone e o Distributed utilizam uma fila de mensagens, armazenamento de objetos e um repositório de metadados. O Milvus Lite é executado localmente sem esses serviços separados. Para conhecer as dependências predefinidas das implementações de servidor e as opções de serviços externos, consulte <a href="/docs/pt/data-infra-integration-overview.md">Infraestrutura de Dados</a>.</p>
<p>Se preferir um serviço gerido em vez de gerir a infraestrutura do servidor, considere <a href="https://zilliz.com/cloud">o Zilliz Cloud</a>. Para uma implementação prática, continue com <a href="/docs/pt/install_standalone-docker.md">o Docker</a> ou <a href="/docs/pt/install_cluster-milvusoperator.md">o Kubernetes</a>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/select-deployment-option.png" alt="Select deployment option for your use case" class="doc-image" id="select-deployment-option-for-your-use-case" /> 
   <span>Selecione a opção de implementação adequada ao seu caso de utilização</span>
  
 </span></p>
<h2 id="Comparison-on-functionalities" class="common-anchor-header">Comparação de funcionalidades<button data-href="#Comparison-on-functionalities" class="anchor-icon" translate="no">
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
    </button></h2><p>A coluna «Lite» descreve o Milvus Lite 3.2.2. Verifique <a href="/docs/pt/milvus_lite.md#Supported-features-and-limits">os limites do Milvus Lite</a> antes de contar com uma funcionalidade do servidor numa aplicação local.</p>
<table>
<thead>
<tr><th>Funcionalidade</th><th>Milvus Lite</th><th>Milvus Standalone</th><th>Milvus Distributed</th></tr>
</thead>
<tbody>
<tr><td>SDK / biblioteca cliente</td><td>Python (adaptador PyMilvus local)</td><td>Python<br/>Go<br/>Java<br/>Node.js<br/>C#<br/>RESTful</td><td>Python<br/>Java<br/>Go<br/>Node.js<br/>C#<br/>RESTful</td></tr>
<tr><td>Tipos de dados</td><td>Vetor denso<br/>Vetor esparso<br/>Booleano<br/>Inteiro<br/>Ponto flutuante<br/>VarChar<br/>Matriz<br/>JSON</td><td>Vetor denso<br/>Vetor esparso<br/>Vetor binário<br/>Booleano<br/>Inteiro<br/>Ponto flutuante<br/>VarChar<br/>Matriz<br/>JSON</td><td>Vetor denso<br/>Vetor esparso<br/>Vetor binário<br/>Booleano<br/>Inteiro<br/>Ponto flutuante<br/>VarChar<br/>Matriz<br/>JSON</td></tr>
<tr><td>Funcionalidades de pesquisa</td><td>Pesquisa vetorial (Pesquisa ANN)<br/>Filtragem por metadados<br/>Pesquisa por intervalo<br/>Consulta escalar<br/>Obter entidades pela chave primária<br/>Pesquisa híbrida</td><td>Pesquisa vetorial (Pesquisa ANN)<br/>Filtragem de metadados<br/>Pesquisa por intervalo<br/>Consulta escalar<br/>Obter entidades pela chave primária<br/>Pesquisa híbrida</td><td>Pesquisa vetorial (Pesquisa ANN)<br/>Filtragem de metadados<br/>Pesquisa por intervalo<br/>Consulta escalar<br/>Obter entidades pela chave primária<br/>Pesquisa híbrida</td></tr>
<tr><td>Operações CRUD</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
<tr><td>Gestão avançada de dados</td><td>Bases de dados<br/>Partições<br/>Aliases<br/>Sem controlo de acesso</td><td>Controlo de acesso<br/>Partição<br/>Chave de partição</td><td>Controlo de acesso<br/>Partição<br/>Chave de partição<br/>Agrupamento de recursos físicos</td></tr>
<tr><td>Níveis de consistência</td><td>Não aplicável: um único processo local atende a todos os pedidos; o parâmetro « <code translate="no">consistency_level</code> » é aceite, mas não tem efeito</td><td><br/>forte; com obsolescência limitada;<br/>;<br/>de sessão; eventual</td><td><br/>forte, obsolescência limitada,<br/>, sessão,<br/>, eventual</td></tr>
<tr><td>Fila de mensagens</td><td>N/A</td><td>Woodpecker (incorporado)</td><td>Woodpecker (serviço)</td></tr>
</tbody>
</table>
