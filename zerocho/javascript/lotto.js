// let numbers = Array(45) // 빈배열을 만든다. 반복문 불가!
// let filledNumbers = numbers.fill(); //IE에서 안된다. 
// fill(채울숫자, 시작할포지션, 길이length)
// filledNumbers.forEach((el,i) => {
   
//     filledNumbers[i] = i + 1
//      console.log(el, i)
// });
// console.log(filledNumbers)

// //Map
// filledNumbers.map(i => {
//         return i + 1
//     }
// )
// console.log(filledNumbers)

var mapv = Array(45)
.fill()
.map(function(el, i){
    return i + 1
}) // ing/? .연속으로 쓸때 es6 안먹는다. 

console.log('mapv',mapv);
console.log(mapv.length);

var s = [];
while (0 < mapv.length) { // 자신이 몇번 반복문을 돌아야되는지 알때 while 문 쓰기 
   //console.log('val :>> ', mapv.splice(Math.floor(Math.random() * mapv.length), 1));
   let val = mapv.splice(Math.floor(Math.random() * mapv.length), 1)[0]
   console.log('val :>> ', val);
   s.push(val)
}
console.log('s :>> ', s);
var bonusNumber = s[s.length -1]
var myNumbers = s.slice(0, 6)
console.log('bonusNumber :>> ', bonusNumber);
console.log('myNumbers :>> ', myNumbers);
console.log('myNumbers :>> ', myNumbers.sort());
console.log('myNumbers :>> ', myNumbers.sort(function (p,c) {
    return p - c
})); // 오름차순 - 배열이 서로 맞닿은 양옆의 숫자를 빼서 0보다 크면 바꾼다. 