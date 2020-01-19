# 五子棋

### 学习使用设计模式之 Revealing Module（揭示模块）模式

> 示例

```js
var orderModule = (function() {
  var orderNum = 1;
  function getNum() {
    return orderNum;
  }
  function addNum() {
    orderNum = orderNum + 1;
  }
  function subNum() {
    orderNum = orderNum > 1 ? orderNum - 1 : orderNum;
  }
  //将暴露的公有指针指向到私有函数和属性上
  return {
    get: getNum,
    add: addNum,
    sub: subNum
  };
})();

orderModule.get();
```
