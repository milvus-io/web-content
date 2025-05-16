---
id: performance_faq.md
summary: >-
  Encontre respostas a perguntas frequentes sobre o desempenho da pesquisa,
  melhorias de desempenho e outras questões relacionadas com o desempenho.
title: FAQ sobre desempenho
---
<h1 id="Performance-FAQ" class="common-anchor-header">FAQ sobre desempenho<button data-href="#Performance-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="How-to-set-nlist-and-nprobe-for-IVF-indexes" class="common-anchor-header">Como definir <code translate="no">nlist</code> e <code translate="no">nprobe</code> para índices IVF?</h4><p>A definição de <code translate="no">nlist</code> é específica do cenário. Como regra geral, o valor recomendado de <code translate="no">nlist</code> é <code translate="no">4 × sqrt(n)</code>, em que <code translate="no">n</code> é o número total de entidades num segmento.</p>
<p>O tamanho de cada segmento é determinado pelo parâmetro <code translate="no">datacoord.segment.maxSize</code>, que é definido para 512 MB por padrão. O número total de entidades num segmento n pode ser estimado dividindo <code translate="no">datacoord.segment.maxSize</code> pelo tamanho de cada entidade.</p>
<p>A definição de <code translate="no">nprobe</code> é específica do conjunto de dados e do cenário, e envolve um compromisso entre a precisão e o desempenho da consulta. Recomendamos que encontre o valor ideal através de experiências repetidas.</p>
<p>Os gráficos a seguir são resultados de um teste executado no conjunto de dados sift50m e no índice IVF_SQ8, que compara a recuperação e o desempenho da consulta de diferentes pares <code translate="no">nlist</code>/<code translate="no">nprobe</code>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/accuracy_nlist_nprobe.png" alt="Accuracy test" class="doc-image" id="accuracy-test" />
   </span> <span class="img-wrapper"> <span>Teste de exatidão</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/performance_nlist_nprobe.png" alt="Performance test" class="doc-image" id="performance-test" /><span>Teste de desempenho</span> </span></p>
<h4 id="Why-do-queries-sometimes-take-longer-on-smaller-datasets" class="common-anchor-header">Porque é que as consultas por vezes demoram mais tempo em conjuntos de dados mais pequenos?</h4><p>As operações de consulta são efectuadas em segmentos. Os índices reduzem o tempo necessário para consultar um segmento. Se um segmento não tiver sido indexado, o Milvus recorre à pesquisa de força bruta nos dados em bruto - aumentando drasticamente o tempo de consulta.</p>
<p>Portanto, normalmente demora mais tempo a consultar um pequeno conjunto de dados (coleção) porque não tem um índice construído. Isto deve-se ao facto de os tamanhos dos seus segmentos não terem atingido o limiar de construção de índices definido por <code translate="no">rootCoord.minSegmentSizeToEnableindex</code>. Chame <code translate="no">create_index()</code> para forçar o Milvus a indexar os segmentos que atingiram o limiar mas ainda não foram indexados automaticamente, melhorando significativamente o desempenho da consulta.</p>
<h4 id="What-factors-impact-CPU-usage" class="common-anchor-header">Que factores afectam a utilização da CPU?</h4><p>O uso da CPU aumenta quando o Milvus está construindo índices ou executando consultas. Em geral, a construção de índices é intensiva em CPU, exceto quando se usa Annoy, que é executado em um único thread.</p>
<p>Ao executar consultas, o uso da CPU é afetado por <code translate="no">nq</code> e <code translate="no">nprobe</code>. Quando <code translate="no">nq</code> e <code translate="no">nprobe</code> são pequenos, a concorrência é baixa e o uso da CPU permanece baixo.</p>
<h4 id="Does-simultaneously-inserting-data-and-searching-impact-query-performance" class="common-anchor-header">A inserção simultânea de dados e a pesquisa afectam o desempenho da consulta?</h4><p>As operações de inserção não consomem muita CPU. No entanto, como os novos segmentos podem não ter atingido o limite para a construção do índice, o Milvus recorre à pesquisa de força bruta - afetando significativamente o desempenho da consulta.</p>
<p>O parâmetro <code translate="no">rootcoord.minSegmentSizeToEnableIndex</code> determina o limite de construção de índice para um segmento, e é definido para 1024 linhas por padrão. Consulte <a href="/docs/pt/v2.4.x/system_configuration.md">Configuração do sistema</a> para obter mais informações.</p>
<h4 id="Is-storage-space-released-right-after-data-deletion-in-Milvus" class="common-anchor-header">O espaço de armazenamento é libertado logo após a eliminação de dados no Milvus?</h4><p>Não, o espaço de armazenamento não será imediatamente libertado quando eliminar dados no Milvus. Embora a eliminação de dados marque as entidades como "logicamente eliminadas", o espaço real pode não ser libertado instantaneamente. Eis o porquê:</p>
<ul>
<li><strong>Compactação</strong>: O Milvus compacta automaticamente os dados em segundo plano. Este processo junta segmentos de dados mais pequenos em segmentos maiores e remove dados logicamente eliminados (entidades marcadas para eliminação) ou dados que tenham excedido o seu Tempo de Vida (TTL). No entanto, a compactação cria novos segmentos enquanto marca os antigos como "abandonados".</li>
<li><strong>Recolha de lixo</strong>: Um processo separado chamado Garbage Collection (GC) remove periodicamente esses segmentos "Dropped", liberando o espaço de armazenamento que eles ocupavam. Isto assegura uma utilização eficiente do armazenamento, mas pode introduzir um ligeiro atraso entre a eliminação e a recuperação de espaço.</li>
</ul>
<h4 id="Can-I-see-inserted-deleted-or-upserted-data-immediately-after-the-operation-without-waiting-for-a-flush" class="common-anchor-header">Posso ver os dados inseridos, eliminados ou reinseridos imediatamente após a operação sem esperar por uma descarga?</h4><p>Sim, no Milvus, a visibilidade dos dados não está diretamente ligada às operações de descarga devido à sua arquitetura de desagregação armazenamento-computador. É possível gerenciar a legibilidade dos dados usando níveis de consistência.</p>
<p>Ao selecionar um nível de consistência, considere as compensações entre consistência e desempenho. Para operações que exigem visibilidade imediata, use um nível de consistência "Forte". Para gravações mais rápidas, dê prioridade a uma consistência mais fraca (os dados podem não ser imediatamente visíveis). Para obter mais informações, consulte <a href="/docs/pt/v2.4.x/consistency.md">Consistência</a>.</p>
<h4 id="Can-indexing-a-VARCHAR-field-improve-deletion-speed" class="common-anchor-header">A indexação de um campo VARCHAR pode melhorar a velocidade de eliminação?</h4><p>A indexação de um campo VARCHAR pode acelerar as operações "Eliminar por expressão", mas apenas em determinadas condições:</p>
<ul>
<li><strong>Índice INVERTED</strong>: Este índice ajuda para <code translate="no">IN</code> ou <code translate="no">==</code> expressões em campos VARCHAR de chave não primária.</li>
<li><strong>Índice Trie</strong>: Este índice ajuda nas consultas de prefixo (por exemplo, <code translate="no">LIKE prefix%</code>) em campos VARCHAR não primários.</li>
</ul>
<p>No entanto, a indexação de um campo VARCHAR não acelera:</p>
<ul>
<li><strong>Eliminação por IDs</strong>: Quando o campo VARCHAR é a chave primária.</li>
<li><strong>Expressões não relacionadas</strong>: Quando o campo VARCHAR não faz parte da expressão de exclusão.</li>
</ul>
<h4 id="Still-have-questions" class="common-anchor-header">Ainda tem dúvidas?</h4><p>Você pode:</p>
<ul>
<li>Verificar o <a href="https://github.com/milvus-io/milvus/issues">Milvus</a> no GitHub. Sinta-se à vontade para fazer perguntas, partilhar ideias e ajudar os outros.</li>
<li>Junte-se ao nosso <a href="https://discord.com/invite/8uyFbECzPX">servidor Discord</a> para encontrar suporte e envolver-se com a nossa comunidade de código aberto.</li>
</ul>
