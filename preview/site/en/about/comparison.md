---
id: comparison.md
title: What is New in Milvus 2.0
---

# What is New in Milvus 2.0

<table class="comparison">
	<tr>
		<th>&nbsp;</th>
		<th><b>Milvus 1.x</b></th>
		<th><b>Milvus 2.0</b></th>
	</tr>
	<tr>
		<td><b>Architecture</b></td>
		<td>Shared storage</td>
		<td>Cloud native</td>
	</tr>
	<tr>
		<td><b>Scalability</b></td>
		<td>1 to 32 read nodes with only one write node</td>
		<td>500+ nodes</td>
	</tr>
  	<tr>
		<td><b>Durability</b></td>
		<td><li>Local disk</li><li>Network file system (NFS)</li></td>
		<td><li>Object storage service (OSS)</li><li>Distributed file system (DFS)</li></td>
	</tr>
  	<tr>
		<td><b>Availability</b></td>
		<td>99%</td>
		<td>99.9%</td>
	</tr>
	<tr>
		<td><b>Data consistency</b></td>
		<td>Eventual consistency</td>
		<td>Three levels of consistency:<li>Strong</li><li>Session</li><li>Consistent prefix</li></td>
	</tr>
	<tr>
		<td><b>Data types supported</b></td>
		<td>Vectors</td>
		<td><li>Vectors</li><li>Fixed-length scalars</li><li>String and text (in planning)</li></td>
	</tr>
	<tr>
		<td><b>Basic operations supported</b></td>
		<td><li>Data insertion</li><li>Data deletion</li><li>Approximate nearest neighbor (ANN) Search</li></td>
		<td><li>Data insertion</li><li>Data deletion (in planning)</li><li>Data query</li><li>Approximate nearest neighbor (ANN) Search</li><li>Recurrent neural network (RNN) search (in planning)</li></td>
	</tr>
	<tr>
		<td><b>Advanced features</b></td>
		<td><li>Mishards</li><li>Milvus DM</li></td>
		<td><li>Scalar filtering</li><li>Time Travel</li><li>Multi-site deployment and multi-cloud integration</li><li>Data management tools</li></td>
	</tr>
	<tr>
		<td><b>Index types and libraries</b></td>
		<td><li>Faiss</li><li>Annoy</li><li>Hnswlib</li><li>RNSG</li></td>
		<td><li>Faiss</li><li>Annoy</li><li>Hnswlib</li><li>RNSG</li><li>ScaNN (in planning)</li><li>On-disk index (in planning)</li></td>
	</tr>
	<tr>
		<td><b>SDKs</b></td>
		<td><li>Python</li><li>Java</li><li>Go</li><li>RESTful</li><li>C++</li></td>
		<td><li>Python</li><li>Go (in planning)</li><li>RESTful (in planning)</li><li>C++ (in planning)</li></td>
	</tr>
	<tr>
		<td><b>Release status</b></td>
		<td>Long-term support (LTS)</td>
		<td>Release candidate. A stable version will be released in August.</td>
	</tr>
</table>
