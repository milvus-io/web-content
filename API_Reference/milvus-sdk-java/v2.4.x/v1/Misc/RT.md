# R\<T>

A template class to hold the status code, error message, and the response returned by each client interface.

```java
package io.milvus.param;
public class R<T>
```

## R.Status

R.Status is an enumeration of the status codes. Each R\<T> object holds an integer value that can be mapped to the R.Status.

Note: Not all status codes are used, some of them are reserved.

<table>
   <tr>
     <th><strong>Status</strong></th>
     <th><strong>Code</strong></th>
     <th><strong>Description</strong></th>
   </tr>
   <tr>
     <td>IllegalResponse</td>
     <td>-6</td>
     <td>The response returned by the server is incorrect. Parsing the response on the client side fails.</td>
   </tr>
   <tr>
     <td>ParamError</td>
     <td>-5</td>
     <td>The parameter is illegal on the client side.</td>
   </tr>
   <tr>
     <td>VersionMismatch</td>
     <td>-4</td>
     <td>*<em>This error is reserved and not used for now.</em></td>
   </tr>
   <tr>
     <td>Unknown</td>
     <td>-3</td>
     <td>General error for an unknown reason.</td>
   </tr>
   <tr>
     <td>ClientNotConnected</td>
     <td>-2</td>
     <td>The connection is not ready.</td>
   </tr>
   <tr>
     <td>RpcError</td>
     <td>-1</td>
     <td>*<em>This error is reserved and not used for now.</em></td>
   </tr>
   <tr>
     <td>Success</td>
     <td>0</td>
     <td>Operation succeeded.</td>
   </tr>
   <tr>
     <td>UnexpectedError</td>
     <td>1</td>
     <td>Error caused by unexpected reason.</td>
   </tr>
   <tr>
     <td>ConnectFailed</td>
     <td>2</td>
     <td>*<em>This error is reserved and not used for now.</em></td>
   </tr>
   <tr>
     <td>PermissionDenied</td>
     <td>3</td>
     <td>*<em>This error is reserved and not used for now.</em></td>
   </tr>
   <tr>
     <td>CollectionNotExists</td>
     <td>4</td>
     <td>*<em>This error is reserved and not used for now.</em></td>
   </tr>
   <tr>
     <td>IllegalArgument</td>
     <td>5</td>
     <td>The parameter is illegal on the server side.</td>
   </tr>
   <tr>
     <td>IllegalDimension</td>
     <td>7</td>
     <td>*<em>This error is reserved and not used for now.</em></td>
   </tr>
   <tr>
     <td>IllegalIndexType</td>
     <td>8</td>
     <td>*<em>This error is reserved and not used for now.</em></td>
   </tr>
   <tr>
     <td>IllegalCollectionName</td>
     <td>9</td>
     <td>*<em>This error is reserved and not used for now.</em></td>
   </tr>
   <tr>
     <td>IllegalTOPK</td>
     <td>10</td>
     <td>*<em>This error is reserved and not used for now.</em></td>
   </tr>
   <tr>
     <td>IllegalRowRecord</td>
     <td>11</td>
     <td>*<em>This error is reserved and not used for now.</em></td>
   </tr>
   <tr>
     <td>IllegalVectorID</td>
     <td>12</td>
     <td>*<em>This error is reserved and not used for now.</em></td>
   </tr>
   <tr>
     <td>IllegalSearchResult</td>
     <td>13</td>
     <td>*<em>This error is reserved and not used for now.</em></td>
   </tr>
   <tr>
     <td>FileNotFound</td>
     <td>14</td>
     <td>*<em>This error is reserved and not used for now.</em></td>
   </tr>
   <tr>
     <td>MetaFailed</td>
     <td>15</td>
     <td>Getting metadata fails on the server side.</td>
   </tr>
   <tr>
     <td>CacheFailed</td>
     <td>16</td>
     <td>*<em>This error is reserved and not used for now.</em></td>
   </tr>
   <tr>
     <td>CannotCreateFolder</td>
     <td>17</td>
     <td>*<em>This error is reserved and not used for now.</em></td>
   </tr>
   <tr>
     <td>CannotCreateFile</td>
     <td>18</td>
     <td>*<em>This error is reserved and not used for now.</em></td>
   </tr>
   <tr>
     <td>CannotDeleteFolder</td>
     <td>19</td>
     <td>*<em>This error is reserved and not used for now.</em></td>
   </tr>
   <tr>
     <td>CannotDeleteFile</td>
     <td>20</td>
     <td>*<em>This error is reserved and not used for now.</em></td>
   </tr>
   <tr>
     <td>BuildIndexError</td>
     <td>21</td>
     <td>*<em>This error is reserved and not used for now.</em></td>
   </tr>
   <tr>
     <td>IllegalNLIST</td>
     <td>22</td>
     <td>*<em>This error is reserved and not used for now.</em></td>
   </tr>
   <tr>
     <td>IllegalMetricType</td>
     <td>23</td>
     <td>*<em>This error is reserved and not used for now.</em></td>
   </tr>
   <tr>
     <td>OutOfMemory</td>
     <td>24</td>
     <td>*<em>This error is reserved and not used for now.</em></td>
   </tr>
   <tr>
     <td>IndexNotExist</td>
     <td>25</td>
     <td>*<em>This error is reserved and not used for now.</em></td>
   </tr>
   <tr>
     <td>EmptyCollection</td>
     <td>26</td>
     <td>*<em>This error is reserved and not used for now.</em></td>
   </tr>
</table>

## Methods

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Return</th>
    </tr>
    <tr>
        <td>getMessage()</td>
        <td>Gets the error message.</td>
        <td>String</td>
    </tr>
    <tr>
        <td>getStatus()</td>
        <td>Gets the status code.</td>
        <td>Integer</td>
    </tr>
    <tr>
        <td>getData()</td>
        <td>Gets the response object returned by the server.</td>
        <td>RPC response class</td>
    </tr>
</table>

## Example

```java
import io.milvus.param.*;

R<RpcStatus> response = client.dropCollection(DropCollectionParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .build());
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
