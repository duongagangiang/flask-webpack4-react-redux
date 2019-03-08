**Blog**
-
Technologies:
+ Flask
+ ReactJS, Webpack, Babel and Redux
---
### Run project
```
git clone https://github.com/duongagangiang/flask-webpack4-react-redux.git    
cd flask-webpack4-react-redux/flask-blog/client
```
### Execute commandline
###### Install all package in package.json
```
npm install
```
###### Build project with webpack
```
npm run build
```
> To make sure virtualenv for Flask project has been installed in flask-blog project

### Now, let's run project
```
python blog.py
or
python3 blog.py
``` 
---
Issue:
+ Material icons not render on google-chrome

Solved:
<code>
\<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</code>
