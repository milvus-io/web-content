# Introduction of Characteristic Vector Database

## Feature vector

### What is a feature vector
A vector is a series of numbers. It is like a matrix with only one row but multiple columns (or only one column but multiple rows), for example [2,0,1,9,0,6,3,0].

A feature vector is a vector that contains information describing an object's important characteristics. An example of a feature vector you might be familiar with is RGB (red-green-blue) color descriptions. A color can be described by how much red, blue, and green there is in it. A feature vector for this would be color = [R, G, B].

### Why feature vector
A scalar, data type used in traditional relational databases, describes only one property of an object. However, with the booming of machine learning and artificial intelligence, the need to process data with more than one dimention is growing fast. And this is where feature vectors come along. Compared to traditional scalar type of data, a feature vector describes an object from multiple dimentions. 

In machine learning, feature vectors are used to represent numeric or symbolic characteristics, called features, of an object in a mathematical, easily analyzable way. They are important for many different areas of machine learning and pattern processing. Machine learning algorithms typically require a numerical representation of objects in order for the algorithms to do processing and statistical analysis.

### Use cases
Feature vectors are used widely in machine learning because of the effectiveness and practicality of representing objects in a numerical way to help with many kinds of analyses. They are good for analysis because there are many techniques for comparing feature vectors. One simple way to compare the feature vectors of two objects is to take the Euclidean distance.

Feature vectors are mainly used in these specific areas:

- Image processing

  Features can be gradient magnitude, color, grayscale intensity, edges, areas, and more. Feature vectors are particularly popular for analyses in image processing because of the convenient way attributes about an image, like the examples listed, can be compared numerically once put into feature vectors.

- Speech recognition

  Features can be sound lengths, noise level, noise ratios, and more.

- Spam-fighting initiatives

  Features are abundant. They can be IP location, text structure, frequency of certain words, or certain email headers.


## Traditional database & feature vector indexing
Traditional relational database are designed to organize alphanumeric data into interrelated collections. However, this technology is not well suited to the management of multimedia information. The feature vector data type, vector storing and indexing methods, the large size of media objects are entirely foreign to traditional databases. 

Although some traditional database now provide plug-ins tailored for feature vector indexing, for example  these toos are far from good enough. 


## Vector indexing methods


## Feature vector database



## Milvus database
