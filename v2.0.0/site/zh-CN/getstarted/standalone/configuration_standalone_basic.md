---
id: configuration_standalone_basic.md
title: Milvus Standalone System Configurations
label: Basic Configurations
order: 0
group: standalone_sys
---

# Milvus Standalone System Configurations

Milvus cluster maintains many system variables that configure the operation. All configurations can be set manually before server startup. Each configuration has a default value, which can be used directly.



<div class="tab-wrapper"><a href="configuration_standalone_basic.md" class='active '>Basic Configurations</a><a href="configuration_standalone_advanced.md" class=''>Advanced Configurations</a></div>


If you are an entry-level user of a Milvus Cluster, you only need to change the following two configurations to primarily adapt Milvus to your test / development / production environment.

## Log Configurations

This session configures the system log output. Using Milvus generates a collection of logs. By default, Milvus uses logs to record information at `debug` or even higher level for standard output (stdout) and standard error (stderr). You can set these configurations in **milvus.yaml**.

<table id="casual_user">
<thead>
  <tr>     
    <th class="width20">Configuration</th>     
    <th class="width70">Description</th>     
    <th class="width10">Default Value</th>   
  </tr>
</thead>
<tbody>
  <tr>     
    <td><code>log.level</code></td>
    <td>
      <details>
       <summary>Log level in Milvus</summary>
        <li>
           You can configure this parameter as <code>debug</code>, <code>info</code>, <code>warn</code>, <code>error</code>, <code>panic</code>, or <code>fatal</code>.
        </li> 
        <li>
           We recommend using <code>debug</code> level under test and development environments, and <code>info</code> level in production environment.
         </li>
      </details>
    </td>     
    <td><code>debug</code></td>
  </tr>
  <tr>     
    <td><code>log.file.rootPath</code></td>
    <td>
      <details>
       <summary>Root path to the log files</summary>
        <li>
           The default value is set empty, indicating to output log files to standard output (stdout) and standard error (stderr).
        </li>
        <li>
           If this parameter is set to a valid local path, Milvus log will be written and stored in this path.
        </li>
        <li>
           Set this parameter as the path that you have permission to write. We recommend using <b>/tmp/milvus</b>.
         </li>
      </details>
    </td>     
    <td>""</td>
  </tr>
</tbody>
</table>
