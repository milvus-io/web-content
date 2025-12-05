---
id: install-overview.md
summary: >-
  O Milvus é um banco de dados vetorial escalável e de alto desempenho. Ele
  suporta casos de uso de uma ampla gama de tamanhos, desde demonstrações
  executadas localmente em Jupyter Notebooks até clusters Kubernetes em grande
  escala que lidam com dezenas de bilhões de vetores. Atualmente, existem três
  opções de implantação do Milvus_ Milvus Lite, Milvus Standalone e Milvus
  Distributed.
title: Visão geral das opções de implantação do Milvus
---
<h1 id="Overview-of-Milvus-Deployment-Options" class="common-anchor-header">Visão geral das opções de implantação do Milvus<button data-href="#Overview-of-Milvus-Deployment-Options" class="anchor-icon" translate="no">
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
    </button></h1><p>O Milvus é um banco de dados vetorial escalável e de alto desempenho. Ele suporta casos de uso de uma ampla gama de tamanhos, desde demonstrações executadas localmente em Jupyter Notebooks até clusters Kubernetes em grande escala que lidam com dezenas de bilhões de vetores. Atualmente, existem três opções de implantação do Milvus: Milvus Lite, Milvus Standalone e Milvus Distributed.</p>
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
    </button></h2><p><a href="https://milvus.io/docs/milvus_lite.md">O Milvus Lite</a> é uma biblioteca Python que pode ser importada para as suas aplicações. Como uma versão leve do Milvus, é ideal para prototipagem rápida em Jupyter Notebooks ou para execução em dispositivos inteligentes com recursos limitados. O Milvus Lite suporta as mesmas APIs que outras implementações do Milvus. O código do lado do cliente que interage com o Milvus Lite também pode funcionar com instâncias do Milvus em outros modos de implantação.</p>
<p>Para integrar o Milvus Lite em seus aplicativos, execute <code translate="no">pip install pymilvus</code> para instalá-lo e use a instrução <code translate="no">MilvusClient(&quot;./demo.db&quot;)</code> para instanciar um banco de dados vetorial com um arquivo local que persiste todos os seus dados. Para obter mais detalhes, consulte <a href="https://milvus.io/docs/milvus_lite.md">Executar o Milvus Lite</a>.</p>
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
    </button></h2><p>O Milvus Standalone é uma implantação de servidor de máquina única. Todos os componentes do Milvus Standalone são empacotados em uma única <a href="https://milvus.io/docs/install_standalone-docker.md">imagem Docker</a>, tornando a implantação conveniente. Se tem uma carga de trabalho de produção mas prefere não utilizar Kubernetes, executar o Milvus Standalone numa única máquina com memória suficiente é uma boa opção. Além disso, o Milvus Standalone suporta alta disponibilidade através da replicação mestre-escravo.</p>
<h2 id="Milvus-Distributed" class="common-anchor-header">Milvus Distribuído<button data-href="#Milvus-Distributed" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus Distributed pode ser implantado em clusters <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes</a>. Esta implementação apresenta uma arquitetura nativa da nuvem, em que a carga de ingestão e as consultas de pesquisa são tratadas separadamente por nós isolados, permitindo a redundância de componentes críticos. Oferece a maior escalabilidade e disponibilidade, bem como a flexibilidade na personalização dos recursos alocados em cada componente. O Milvus Distributed é a melhor escolha para utilizadores empresariais que executam sistemas de pesquisa vetorial de grande escala em produção.</p>
<h2 id="Choose-the-Right-Deployment-for-Your-Use-Case" class="common-anchor-header">Escolha a implementação correta para o seu caso de utilização<button data-href="#Choose-the-Right-Deployment-for-Your-Use-Case" class="anchor-icon" translate="no">
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
<p>Se pretender construir rapidamente algo como protótipo ou para fins de aprendizagem, como demos de Retrieval Augmented Generation (RAG), chatbots de IA, pesquisa multimodal, o Milvus Lite ou uma combinação do Milvus Lite e do Milvus Standalone é adequado. Pode utilizar o Milvus Lite em notebooks para prototipagem rápida e explorar várias abordagens, como diferentes estratégias de fragmentação em RAG. Poderá querer implementar a aplicação construída com o Milvus Lite numa produção em pequena escala para servir utilizadores reais, ou validar a ideia em conjuntos de dados maiores, digamos mais do que alguns milhões de vectores. O Milvus Standalone é apropriado. A lógica da aplicação do Milvus Lite pode ser partilhada, uma vez que todas as implementações do Milvus têm a mesma API do lado do cliente. Os dados armazenados no Milvus Lite também podem ser transferidos para o Milvus Standalone com uma ferramenta de linha de comando.</p></li>
<li><p><strong>Implantação de produção em pequena escala</strong></p>
<p>Para a fase inicial de produção, quando o projeto ainda está à procura de um produto adequado ao mercado e a agilidade é mais importante do que a escalabilidade, o Milvus Standalone é a melhor escolha. Ele ainda pode escalar até 100M de vetores com recursos de máquina suficientes, enquanto exige muito menos DevOps do que manter um cluster K8s.</p></li>
<li><p><strong>Implantação de produção em larga escala</strong></p>
<p>Como o seu negócio está a crescer rapidamente e a escala de dados excede a capacidade de um único servidor, é altura de considerar o Milvus Distributed. Pode continuar a usar o Milvus Standalone para desenvolvimento ou ambiente de teste por conveniência, e operar o cluster K8s que corre o Milvus Distributed. Isso pode sustentá-lo em dezenas de bilhões de vetores, além de fornecer flexibilidade na adaptação do tamanho do nó para sua carga de trabalho específica, como casos de alta leitura e gravação pouco frequente ou alta gravação e baixa leitura.</p></li>
<li><p><strong>Pesquisa local em dispositivos de borda</strong></p>
<p>Para pesquisar através de dispositivos de ponta privados ou sensíveis, pode implementar o Milvus Lite no dispositivo sem depender de um serviço baseado na nuvem para fazer pesquisa de texto ou imagem. Isto é adequado para casos como a pesquisa de documentos proprietários ou a deteção de objectos no dispositivo.</p></li>
</ul>
<p>A escolha do modo de implementação do Milvus depende da fase e da escala do seu projeto. O Milvus oferece uma solução flexível e poderosa para várias necessidades, desde a criação rápida de protótipos até à implementação em grande escala numa empresa.</p>
<ul>
<li><strong>O Milvus Lite</strong> é recomendado para conjuntos de dados mais pequenos, até alguns milhões de vectores.</li>
<li><strong>O Milvus Standalone</strong> é adequado para conjuntos de dados de média dimensão, com escalas até 100 milhões de vectores.</li>
<li><strong>O Milvus Distributed</strong> foi concebido para implementações em grande escala, capaz de lidar com conjuntos de dados de 100 milhões a dezenas de milhares de milhões de vectores.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/select-deployment-option.png" alt="Select deployment option for your use case" class="doc-image" id="select-deployment-option-for-your-use-case" />
   </span> <span class="img-wrapper"> <span>Selecione a opção de implementação para o seu caso de utilização</span> </span></p>
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
    </button></h2><table>
<thead>
<tr><th>Funcionalidade</th><th>Milvus Lite</th><th>Milvus Standalone</th><th>Milvus Distribuído</th></tr>
</thead>
<tbody>
<tr><td>SDK / Manual do cliente</td><td>Python<br/>gRPC</td><td>Python<br/>Go<br/>Java<br/>Node.js<br/>C#<br/>RESTful</td><td>Python<br/>Java<br/>Go<br/>Node.js<br/>C#<br/>RESTful</td></tr>
<tr><td>Tipos de dados</td><td>Vetor denso<br/>Vetor esparso<br/>Vetor binário<br/>Booleano<br/>Inteiro<br/>Ponto flutuante<br/>VarChar<br/>Matriz<br/>JSON</td><td>Vetor Denso<br/>Vetor Esparso<br/>Vetor Binário<br/>Booleano<br/>Inteiro<br/>Ponto Flutuante<br/>VarChar<br/>Matriz<br/>JSON</td><td>Vetor Denso<br/>Vetor Esparso<br/>Vetor Binário<br/>Booleano<br/>Inteiro<br/>Ponto Flutuante<br/>VarChar<br/>Matriz<br/>JSON</td></tr>
<tr><td>Capacidades de pesquisa</td><td>Pesquisa vetorial (Pesquisa ANN)<br/>Filtragem de metadados<br/>Pesquisa de intervalos<br/>Consulta escalar<br/>Obter entidades por chave primária<br/>Pesquisa híbrida</td><td>Pesquisa vetorial (Pesquisa ANN)<br/>Filtragem de metadados<br/>Pesquisa de intervalos<br/>Consulta escalar<br/>Obter entidades por chave primária<br/>Pesquisa híbrida</td><td>Pesquisa vetorial (Pesquisa ANN)<br/>Filtragem de metadados<br/>Pesquisa de intervalos<br/>Consulta escalar<br/>Obter entidades por chave primária<br/>Pesquisa híbrida</td></tr>
<tr><td>Operações CRUD</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
<tr><td>Gestão avançada de dados</td><td>N/A</td><td>Controlo de acesso<br/>Partição<br/>Chave de partição</td><td>Controlo de acesso<br/>Partição<br/>Chave de partição<br/>Agrupamento de recursos físicos</td></tr>
<tr><td>Níveis de consistência</td><td>Forte</td><td>Forte<br/>Staleness limitado<br/>Sessão<br/>Eventual</td><td>Forte<br/>Staleness limitado<br/>Sessão<br/>Eventual</td></tr>
</tbody>
</table>
