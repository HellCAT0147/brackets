module.exports = function check(str, bracketsConfig) {
  const openBrackets = [];
  const closeBrackets = {};
  const mirrorBrackets = [];
  const queue = [];
  
  bracketsConfig.forEach(element => openBrackets.push(element[0]));
  bracketsConfig.forEach(element => {
    closeBrackets[element[1]] = element[0];
    if (element[0] == element[1])
      mirrorBrackets.push(element[0]);
  });
  let i = 0;
  for (let sym of str) {
    i += 1;
    if (openBrackets.includes(sym) && !mirrorBrackets.includes(sym))
      queue.push(sym);
    else if (openBrackets.includes(sym) && mirrorBrackets.includes(sym))
      if (!queue.includes(sym))
        queue.push(sym);
      else if (queue[queue.length-1])
        queue.pop();
      else
        return false;
    else {
      if (queue.length == 0) return false;
      if (closeBrackets[sym] != queue.pop()) return false;
    }
  }
  return !queue.length;
}
