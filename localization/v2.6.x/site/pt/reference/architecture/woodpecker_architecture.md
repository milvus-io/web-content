---
id: woodpecker_architecture.md
title: Pica-pau
summary: >-
  O Woodpecker é um sistema WAL nativo da nuvem no Milvus 2.6. Com uma
  arquitetura de disco zero e dois modos de implantação, ele oferece alta taxa
  de transferência, baixa sobrecarga operacional e escalabilidade contínua no
  armazenamento de objetos.
---
<h1 id="Woodpecker" class="common-anchor-header">Pica-pau<button data-href="#Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>No Milvus 2.6, o Woodpecker substitui o Kafka e o Pulsar por um sistema de log de gravação antecipada (WAL) nativo da nuvem. Projetado para armazenamento de objetos, o Woodpecker simplifica as operações, maximiza o rendimento e escala sem esforço.</p>
<p>Objetivos de design do Woodpecker:</p>
<ul>
<li><p>A mais alta taxa de transferência em ambientes de nuvem</p></li>
<li><p>Registo duradouro, apenas de anexos, para uma recuperação fiável</p></li>
<li><p>Mínima sobrecarga operacional, sem discos locais ou brokers externos</p></li>
</ul>
<h2 id="Zero-disk-architecture" class="common-anchor-header">Arquitetura de disco zero<button data-href="#Zero-disk-architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>A principal inovação do Woodpecker é a sua arquitetura de disco zero:</p>
<ul>
<li>Todos os dados de registo armazenados no armazenamento de objectos na nuvem (como o Amazon S3, o Google Cloud Storage ou o Alibaba OS)</li>
<li>Metadados geridos através de armazenamentos de valores chave distribuídos como o <strong>etcd</strong></li>
<li>Sem dependências de disco local para operações principais</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_layers.png" alt="woodpecker layers" class="doc-image" id="woodpecker-layers" />
   </span> <span class="img-wrapper"> <span>camadas do woodpecker</span> </span></p>
<h2 id="Architecture-components" class="common-anchor-header">Componentes da arquitetura<button data-href="#Architecture-components" class="anchor-icon" translate="no">
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
    </button></h2><p>Uma implantação padrão do Woodpecker inclui os seguintes componentes:</p>
<ul>
<li><strong>Cliente</strong>: Camada de interface para emitir solicitações de leitura e gravação</li>
<li><strong>LogStore</strong>: Gerencia o buffer de gravação de alta velocidade, os uploads assíncronos para o armazenamento e a compactação de logs</li>
<li><strong>Backend de armazenamento</strong>: Suporta serviços de armazenamento escaláveis e de baixo custo, como S3, GCS e sistemas de arquivos como EFS</li>
<li><strong>Etcd</strong>: Armazena metadados e coordena o estado do log em nós distribuídos</li>
</ul>
<h2 id="Deployment-modes" class="common-anchor-header">Modos de implantação<button data-href="#Deployment-modes" class="anchor-icon" translate="no">
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
    </button></h2><p>O Woodpecker oferece dois modos de implantação para atender às suas necessidades específicas:</p>
<h3 id="MemoryBuffer---Lightweight-and-maintenance-free" class="common-anchor-header">MemoryBuffer - Leve e livre de manutenção</h3><p>O modo MemoryBuffer oferece uma opção de implantação simples e leve, em que o cliente incorporado do Woodpecker armazena temporariamente em memória as gravações recebidas e as envia periodicamente para um serviço de armazenamento de objetos na nuvem. Neste modo, o buffer de memória é embutido diretamente no cliente, permitindo um agrupamento eficiente antes da descarga para o S3. Os metadados são gerenciados usando <strong>o etcd</strong> para garantir consistência e coordenação. Este modo é mais adequado para cargas de trabalho pesadas em lote em implantações de menor escala ou ambientes de produção que priorizam a simplicidade sobre o desempenho, especialmente quando a baixa latência de gravação não é crítica. A latência de gravação neste modo é geralmente entre 200-500 ms.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_memorybuffer_mode_deployment.png" alt="woodpecker memory mode deployment" class="doc-image" id="woodpecker-memory-mode-deployment" />
   </span> <span class="img-wrapper"> <span>implantação do modo de memória do pica-pau</span> </span></p>
<h3 id="QuorumBuffer---Optimized-for-low-latency-high-durability" class="common-anchor-header">QuorumBuffer - Optimizado para baixa latência e alta durabilidade</h3><p>O modo QuorumBuffer foi projetado para cargas de trabalho de leitura/gravação sensíveis à latência e de alta frequência que requerem capacidade de resposta em tempo real e forte tolerância a falhas. Nesse modo, o cliente do Woodpecker interage com um sistema de quorum de três réplicas para fornecer buffer de gravação de alta velocidade, garantindo forte consistência e alta disponibilidade por meio de consenso distribuído.</p>
<p>Uma gravação é considerada bem-sucedida quando o cliente replica com sucesso os dados para pelo menos dois dos três nós de quorum, geralmente concluindo em milissegundos de um dígito, após o que os dados são descarregados de forma assíncrona no armazenamento de objetos na nuvem para durabilidade a longo prazo. Esta arquitetura minimiza o estado no nó, elimina a necessidade de grandes volumes de disco locais e evita reparações complexas de anti-entropia frequentemente necessárias nos sistemas tradicionais baseados em quorum.</p>
<p>O resultado é uma camada WAL simplificada e robusta, ideal para ambientes de produção de missão crítica, onde consistência, disponibilidade e recuperação rápida são essenciais.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_quorumbuffer_mode_deployment.png" alt="woodpecker quorum mode deployment" class="doc-image" id="woodpecker-quorum-mode-deployment" />
   </span> <span class="img-wrapper"> <span>implantação do modo quorum do woodpecker</span> </span></p>
<h2 id="Performance-benchmarks" class="common-anchor-header">Benchmarks de desempenho<button data-href="#Performance-benchmarks" class="anchor-icon" translate="no">
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
    </button></h2><p>Executamos benchmarks abrangentes para avaliar o desempenho do Woodpecker em uma configuração de nó único, cliente único e fluxo de log único. Os resultados foram impressionantes quando comparados ao Kafka e ao Pulsar:</p>
<table>
<thead>
<tr><th>Sistema</th><th>Kafka</th><th>Pulsar</th><th>WP Minio</th><th>WP Local</th><th>WP S3</th></tr>
</thead>
<tbody>
<tr><td>Taxa de transferência</td><td>129,96MB/s</td><td>107MB/s</td><td>71MB/s</td><td>450MB/s</td><td>750MB/s</td></tr>
<tr><td>latência</td><td>58ms</td><td>35ms</td><td>184ms</td><td>1,8 ms</td><td>166ms</td></tr>
</tbody>
</table>
<p>Para contextualizar, medimos os limites teóricos de throughput de diferentes backends de armazenamento em nossa máquina de teste:</p>
<ul>
<li>MinIO: ~110 MB/s</li>
<li>Sistema de ficheiros local: 600-750 MB/s</li>
<li>Amazon S3 (instância única do EC2): até 1,1 GB/s</li>
</ul>
<p>Notavelmente, o Woodpecker atingiu consistentemente 60-80% da taxa de transferência máxima possível para cada backend - um nível de eficiência excecional para middleware.</p>
<h3 id="Key-performance-insights" class="common-anchor-header">Principais informações sobre desempenho</h3><ul>
<li>Modo de sistema de arquivos local: O Woodpecker alcançou 450 MB/s - 3,5 vezes mais rápido que o Kafka e 4,2 vezes mais rápido que o Pulsar - com latência ultrabaixa de apenas 1,8 ms, o que o torna ideal para implantações de nó único de alto desempenho.</li>
<li>Modo de armazenamento em nuvem (S3): Ao gravar diretamente no S3, o Woodpecker atingiu 750 MB/s (cerca de 68% do limite teórico do S3), 5,8 vezes mais rápido que o Kafka e 7 vezes mais rápido que o Pulsar. Embora a latência seja maior (166 ms), essa configuração fornece uma taxa de transferência excecional para cargas de trabalho orientadas por lote.</li>
<li>Modo de armazenamento de objetos (MinIO): Mesmo com o MinIO, o Woodpecker atingiu 71 MB/s - cerca de 65% da capacidade do MinIO. Esse desempenho é comparável ao do Kafka e do Pulsar, mas com requisitos de recursos significativamente menores.</li>
</ul>
<p>O Woodpecker é particularmente otimizado para gravações simultâneas e de alto volume, em que manter a ordem é fundamental. E esses resultados refletem apenas os estágios iniciais de desenvolvimento - espera-se que as otimizações em andamento na fusão de E/S, no buffer inteligente e na pré-busca levem o desempenho ainda mais perto dos limites teóricos.</p>
<h2 id="Operational-benefits" class="common-anchor-header">Benefícios operacionais<button data-href="#Operational-benefits" class="anchor-icon" translate="no">
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
    </button></h2><p>A arquitetura nativa da nuvem do Woodpecker oferece vantagens operacionais significativas:</p>
<ul>
<li><strong>Gerenciamento de armazenamento local zero</strong>: Elimina o gerenciamento de volumes de disco, a configuração de RAID e as falhas de hardware</li>
<li><strong>Dimensionamento automático</strong>: O armazenamento é dimensionado com o armazenamento de objetos na nuvem sem planejamento de capacidade</li>
<li><strong>Eficiência de custos</strong>: Armazenamento pago conforme o uso com classificação e compactação automáticas</li>
<li><strong>Alta disponibilidade</strong>: Aproveita a durabilidade de 11 noves dos provedores de nuvem com recuperação rápida</li>
<li><strong>Implantação simplificada</strong>: Dois modos de implantação (MemoryBuffer/QuorumBuffer) atendem a diferentes necessidades operacionais</li>
<li><strong>Fácil de usar para desenvolvedores</strong>: Configuração mais rápida do ambiente e arquitetura consistente em todos os ambientes</li>
</ul>
<p>Essas vantagens tornam o Woodpecker particularmente valioso para RAGs de missão crítica, agentes de IA e cargas de trabalho de pesquisa de baixa latência, em que a simplicidade operacional é tão importante quanto o desempenho.</p>
