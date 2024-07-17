# R\<T>

A template class to hold the status code, error message, and the response returned by each client interface.

```java
package io.milvus.param;
public class R<T>
```

#### R.Status

`R.Status` is an enumeration of the status codes. Each `R<T>` object holds an integer value that can be mapped to the `R.Status`.

Note: Not all status codes are used, some of them are reserved.

<table>
   <tr>
     <th><p><strong>Status</strong></p></th>
     <th><p><strong>Code</strong></p></th>
     <th><p><strong>Description</strong></p></th>
   </tr>
   <tr>
     <td><p>IllegalResponse</p></td>
     <td><p>-6</p></td>
     <td><p>The response returned by the server is incorrect. Parsing the response on the client side fails.</p></td>
   </tr>
   <tr>
     <td><p>ParamError</p></td>
     <td><p>-5</p></td>
     <td><p>The parameter is illegal on the client side.</p></td>
   </tr>
   <tr>
     <td><p>VersionMismatch</p></td>
     <td><p>-4</p></td>
     <td><p>*<em>This error is reserved and not used for now.</em></p></td>
   </tr>
   <tr>
     <td><p>Unknown</p></td>
     <td><p>-3</p></td>
     <td><p>General error for an unknown reason.</p></td>
   </tr>
   <tr>
     <td><p>ClientNotConnected</p></td>
     <td><p>-2</p></td>
     <td><p>The connection is not ready.</p></td>
   </tr>
   <tr>
     <td><p>RpcError</p></td>
     <td><p>-1</p></td>
     <td><p>*<em>This error is reserved and not used for now.</em></p></td>
   </tr>
   <tr>
     <td><p>Success</p></td>
     <td><p>0</p></td>
     <td><p>Operation succeeded.</p></td>
   </tr>
   <tr>
     <td><p>UnexpectedError</p></td>
     <td><p>1</p></td>
     <td><p>Error caused by unexpected reason.</p></td>
   </tr>
   <tr>
     <td><p>ConnectFailed</p></td>
     <td><p>2</p></td>
     <td><p>*<em>This error is reserved and not used for now.</em></p></td>
   </tr>
   <tr>
     <td><p>PermissionDenied</p></td>
     <td><p>3</p></td>
     <td><p>*<em>This error is reserved and not used for now.</em></p></td>
   </tr>
   <tr>
     <td><p>CollectionNotExists</p></td>
     <td><p>4</p></td>
     <td><p>*<em>This error is reserved and not used for now.</em></p></td>
   </tr>
   <tr>
     <td><p>IllegalArgument</p></td>
     <td><p>5</p></td>
     <td><p>The parameter is illegal on the server side.</p></td>
   </tr>
   <tr>
     <td><p>IllegalDimension</p></td>
     <td><p>7</p></td>
     <td><p>*<em>This error is reserved and not used for now.</em></p></td>
   </tr>
   <tr>
     <td><p>IllegalIndexType</p></td>
     <td><p>8</p></td>
     <td><p>*<em>This error is reserved and not used for now.</em></p></td>
   </tr>
   <tr>
     <td><p>IllegalCollectionName</p></td>
     <td><p>9</p></td>
     <td><p>*<em>This error is reserved and not used for now.</em></p></td>
   </tr>
   <tr>
     <td><p>IllegalTOPK</p></td>
     <td><p>10</p></td>
     <td><p>*<em>This error is reserved and not used for now.</em></p></td>
   </tr>
   <tr>
     <td><p>IllegalRowRecord</p></td>
     <td><p>11</p></td>
     <td><p>*<em>This error is reserved and not used for now.</em></p></td>
   </tr>
   <tr>
     <td><p>IllegalVectorID</p></td>
     <td><p>12</p></td>
     <td><p>*<em>This error is reserved and not used for now.</em></p></td>
   </tr>
   <tr>
     <td><p>IllegalSearchResult</p></td>
     <td><p>13</p></td>
     <td><p>*<em>This error is reserved and not used for now.</em></p></td>
   </tr>
   <tr>
     <td><p>FileNotFound</p></td>
     <td><p>14</p></td>
     <td><p>*<em>This error is reserved and not used for now.</em></p></td>
   </tr>
   <tr>
     <td><p>MetaFailed</p></td>
     <td><p>15</p></td>
     <td><p>Getting metadata fails on the server side.</p></td>
   </tr>
   <tr>
     <td><p>CacheFailed</p></td>
     <td><p>16</p></td>
     <td><p>*<em>This error is reserved and not used for now.</em></p></td>
   </tr>
   <tr>
     <td><p>CannotCreateFolder</p></td>
     <td><p>17</p></td>
     <td><p>*<em>This error is reserved and not used for now.</em></p></td>
   </tr>
   <tr>
     <td><p>CannotCreateFile</p></td>
     <td><p>18</p></td>
     <td><p>*<em>This error is reserved and not used for now.</em></p></td>
   </tr>
   <tr>
     <td><p>CannotDeleteFolder</p></td>
     <td><p>19</p></td>
     <td><p>*<em>This error is reserved and not used for now.</em></p></td>
   </tr>
   <tr>
     <td><p>CannotDeleteFile</p></td>
     <td><p>20</p></td>
     <td><p>*<em>This error is reserved and not used for now.</em></p></td>
   </tr>
   <tr>
     <td><p>BuildIndexError</p></td>
     <td><p>21</p></td>
     <td><p>*<em>This error is reserved and not used for now.</em></p></td>
   </tr>
   <tr>
     <td><p>IllegalNLIST</p></td>
     <td><p>22</p></td>
     <td><p>*<em>This error is reserved and not used for now.</em></p></td>
   </tr>
   <tr>
     <td><p>IllegalMetricType</p></td>
     <td><p>23</p></td>
     <td><p>*<em>This error is reserved and not used for now.</em></p></td>
   </tr>
   <tr>
     <td><p>OutOfMemory</p></td>
     <td><p>24</p></td>
     <td><p>*<em>This error is reserved and not used for now.</em></p></td>
   </tr>
   <tr>
     <td><p>IndexNotExist</p></td>
     <td><p>25</p></td>
     <td><p>*<em>This error is reserved and not used for now.</em></p></td>
   </tr>
   <tr>
     <td><p>EmptyCollection</p></td>
     <td><p>26</p></td>
     <td><p>*<em>This error is reserved and not used for now.</em></p></td>
   </tr>
</table>

#### Methods

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Return</p></th>
    </tr>
    <tr>
        <td><p>getMessage()</p></td>
        <td><p>Gets the error message.</p></td>
        <td><p>String</p></td>
    </tr>
    <tr>
        <td><p>getStatus()</p></td>
        <td><p>Gets the status code.</p></td>
        <td><p>Integer</p></td>
    </tr>
    <tr>
        <td><p>getData()</p></td>
        <td><p>Gets the response object returned by the server.</p></td>
        <td><p>RPC response class</p></td>
    </tr>
</table>

#### Example

```java
import io.milvus.param.*;

R<RpcStatus> response = client.dropCollection(DropCollectionParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .build());
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
