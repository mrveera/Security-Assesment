[![Waffle.io - Columns and their card count](https://badge.waffle.io/veera83372/Security-Assesment.svg?columns=all)](https://waffle.io/veera83372/Security-Assesment)



## Generating reports ##

1. Download template and responses as tsv format and save it in lib directory
2. In template sheet add the logic(function body) which returns a value after calculation  all options are available in object(For example if you want to access value of a your code is simmilar to below)

```js
{
  a:10
  b:3
}

//your code should be like this
return Math.min((options.a,options.b))

// more examples

if(options.a==10){
  return 5
}else{
  return options.a+20;
}
```

```bash
 node ./lib/reporter.js questionsFilePath answersFilePath "key"
```
` key ` refers to column name like  " Email address "
