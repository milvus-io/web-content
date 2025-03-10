---
id: roadmap.md
title: Milvus 路线图
related_key: Milvus roadmap
summary: Milvus 是一个开源向量数据库，旨在为人工智能应用提供动力。以下是我们的发展路线图。
---
<h1 id="Milvus-Roadmap" class="common-anchor-header">Milvus 路线图<button data-href="#Milvus-Roadmap" class="anchor-icon" translate="no">
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
    </button></h1><p>欢迎访问 Milvus 路线图！加入我们不断增强和发展 Milvus 的旅程。我们很高兴与大家分享我们的成就、未来计划以及对未来的展望。我们的路线图不仅仅是一份即将推出的功能列表，它还反映了我们对创新的承诺以及与社区合作的决心。我们邀请您深入了解我们的路线图，提供您的反馈意见，帮助塑造 Milvus 的未来！</p>
<h2 id="Roadmap" class="common-anchor-header">路线图<button data-href="#Roadmap" class="anchor-icon" translate="no">
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
        <tr>
            <th>类别</th>
            <th>Milvus 2.5.x (在最近的版本中实现)</th>
            <th>下一个版本 - Milvus 2.6（25 年中期）</th>
            <th>未来路线图 - Milvus 3.0（1 年内）</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>人工智能驱动的非结构化数据处理</strong><br/><i>利用人工智能模型和先进技术加强处理和分析非结构化数据的能力</i></td>
            <td><strong>全文搜索</strong><br/><i>利用 Sparse-BM25 支持全文搜索。新的 API 接受文本作为输入，并在 Milvus 内部自动生成稀疏向量</i><br/><br/><strong>稀疏向量 (GA)</strong><br/><i>支持稀疏向量的高效存储和索引方法</i><br/></td>
            <td><strong>数据输入和数据输出</strong><br/><i>支持主要的模型服务，以摄取原始文本</i><br/><br/><strong>高级</strong><i>Reranker</i><br/><i>支持基于模型的 Reranker 和用户定义的评分函数</i><br/><br/> 迭代<strong>搜索</strong><br/><i>根据用户标签修改查询向量</i></td>
            <td><strong>支持</strong><i>向量</i><br/><i>支持向量列表，典型用法如 Colbert、Copali 和视频表示</i><br/><br/><strong>支持更多数据类型</strong><br/><i>，如日期时间、地图、GIS 等</i></td>
        </tr>
        <tr>
            <td><strong>搜索质量和性能</strong><br/><i>通过优化架构、算法和 API 提供准确、相关和快速的</i><strong>搜索</strong><i>结果</i></td>
            <td><strong>文本匹配功能</strong><br/><i>快速过滤文本/varchar 中的关键词/关键字</i><br/><br/><strong>增强分组搜索</strong><br/><i>在混合搜索中引入分组_大小并添加分组支持</i><br/><br/> 位图<strong>索引和反向索引</strong><br/><i>加速标签过滤</i></td>
            <td><strong>高级匹配</strong><br/> 如<i>phrase_match、multi_match </i><br/><br/><strong>分析器增强</strong><br/><i>通过扩展标记符号支持和改进可观察性来增强分析器</i><br/><br/><strong>JSON 过滤</strong><br/><i>优化 JSON 索引和解析，以加快处理速度</i></td>
            <td><strong>排序功能</strong><br/><i>在执行过程中按标量字段</i>排序<br/><br/><strong>支持数据集群</strong><br/><i>数据共定位</i></td>
        </tr>
        <tr>
            <td><strong>丰富的功能和管理</strong><br/><i>对开发人员友好的强大数据管理功能</i></td>
            <td><strong>在数据导入中支持 csv 文件</strong><br/><i>Bulkinsert 支持 csv 格式</i><br/><br/><strong>支持空值和默认值</strong><br/><i>空值和默认值类型使从其他 DBMS 导入数据更加容易</i><br/><br/><strong>Milvus WebUI（测试版）</strong><br/><i>面向 DBA 的可视化管理工具</i></td>
            <td><strong>Schema 更改</strong><br/> 如<i>添加/删除字段、修改 varchar 长度</i><br/><br/> 聚合<br/><i>标量字段聚合，如计数、不同值、最小值、最大值</i><br/><br/><strong>支持 UDF</strong><br/><i>用户自定义函数</i></td>
            <td><strong>批量更新</strong><br/><i>支持对特定字段值的批量更新</i><br/><br/><strong>主键重复数据删除</strong><br/><i>通过使用全局 pk 索引</i><br/><br/><strong>数据版本管理和还原</strong><br/><i>支持通过快照进行数据版本管理</i></td>
        </tr>
        <tr>
            <td><strong>成本效益与架构</strong><br/><i>具有稳定性、成本效益和简化部署的先进系统。</i></td>
            <td><strong>内存优化</strong><br/><i>减少 OOM 和增强负载</i><br/><br/><strong>集群压缩</strong><br/><i>根据配置重新分配数据，加快读取性能</i><br/><br/><strong>存储格式 V2（测试版）</strong><br/><i>通用格式设计和基于磁盘的数据访问基础</i></td>
            <td><strong>分层存储</strong><br/><i>支持冷热存储以优化成本</i><br/><br/><strong>Stream Node</strong><br/><i>处理流数据并简化增量写入流</i><br/><br/><strong>MixCoord</strong><br/><i>将 Coord 逻辑合二为一</i></td>
            <td><strong>向量湖</strong><br/><i>具有成本效益的离线解决方案，Spark 连接器并与 iceberg 集成</i><br/><br/><strong>Logstore 组件</strong><br/><i>减少对 pulsar 等外部组件的依赖</i><br/><br/><strong>数据驱逐策略</strong><br/><i>用户可以定义自己的驱逐策略</i></td>
        </tr>
    </tbody>
</table>
<ul>
<li>我们的路线图通常分为三个部分：最新发布的版本、即将发布的下一个版本以及明年的中长期愿景。</li>
<li>随着工作的进展，我们会不断学习，偶尔调整重点，根据需要添加或删除项目。</li>
<li>这些计划仅供参考，可能会根据订阅服务的不同而有所变化。</li>
<li>我们将坚定不移地遵循我们的路线图，并以我们的<a href="/docs/zh/release_notes.md">发布说明</a>作为参考。</li>
</ul>
<h2 id="How-to-contribute" class="common-anchor-header">如何贡献<button data-href="#How-to-contribute" class="anchor-icon" translate="no">
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
    </button></h2><p>作为一个开源项目，Milvus 的发展离不开社区的贡献。以下是您如何参与我们的旅程。</p>
<h3 id="Share-feedback" class="common-anchor-header">分享反馈</h3><ul>
<li><p>问题报告：遇到错误或有建议？在我们的<a href="https://github.com/milvus-io/milvus/issues">GitHub 页面</a>上打开一个问题。</p></li>
<li><p>功能建议：有关于新功能或改进的想法？加入<a href="https://github.com/milvus-io/milvus/discussions/40263">我们的讨论主题吧</a>。</p></li>
</ul>
<h3 id="Code-contributions" class="common-anchor-header">代码贡献</h3><ul>
<li><p>拉取请求：直接向我们的<a href="https://github.com/milvus-io/milvus/pulls">代码库</a>投稿。无论是修复错误、添加功能还是改进文档，我们都欢迎您的贡献。</p></li>
<li><p>开发指南：查看我们的<a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">贡献者指南</a>，了解代码贡献指南。</p></li>
</ul>
<h3 id="Spread-the-word" class="common-anchor-header">传播信息</h3><ul>
<li><p>社交分享：喜欢 Milvus 吗？在社交媒体和技术博客上分享您的使用案例和经验。</p></li>
<li><p>在 GitHub 上为我们加星：在我们的<a href="https://github.com/milvus-io/milvus">GitHub 存储库上</a>加星，表示您对我们的支持。</p></li>
</ul>
