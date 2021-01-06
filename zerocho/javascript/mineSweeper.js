var table = document.querySelector('table')
var tbody = table.querySelector('table > tbody')
var dataSet = [];

document.querySelector('#exec').addEventListener('click', function(){
  //테이블 초기화
  tbody.innerHTML = ''
  dataSet = [];

  // 입력값 정의
  var horizontal = document.querySelector('#horizontal').value;
  var vertical = document.querySelector('#vertical').value;
  var mine = document.querySelector('#mine').value
  //console.log(horizontal, vertical, mine)

  //지뢰 랜덤 장소 100개 이하 만들기
  var mapv = Array(horizontal * vertical) // 10 * 10 = array 100개의 값 
  .fill()
  .map(function(el, i){
      return i //0~ 99까지의 숫자를 뽑음 1~ 100이 아님 
  }) // ing/? .연속으로 쓸때 es6 안먹는다. 

  // console.log('mapv',mapv);
  // console.log(mapv.length);

  var s = []; //shuffle 셔플 : 랜덤 번호 

  // 지뢰(mine) 뽑기 - 갯수 : 사용자지정
  while (((horizontal * vertical)-mine) < mapv.length) { // 자신이 몇번 반복문을 돌아야되는지 알때 while 문 쓰기 
    //console.log('val :>> ', mapv.splice(Math.floor(Math.random() * mapv.length), 1));
    let val = mapv.splice(Math.floor(Math.random() * mapv.length), 1)[0]
    s.push(val)
    
  }
  console.log('s 20:>> ', s);

  //지뢰 테이블  
  for (let i = 0; i < horizontal; i++) {    
    const newTr = document.createElement("tr");
    var arrTr = []
    dataSet.push(arrTr)
    for (let j = 0; j < vertical; j++) {
      arrTr.push('1')
      const newTd = document.createElement('td')
    
      //왼쪽 클릭
      newTd.addEventListener('contextmenu', function (e) {
        var td = e.currentTarget; // (1)
        if (!td) return; // (2)
        if (!table.contains(td)) return; // (3)

        //클릭한 셀의 index 칮기 1
        // var col = td.cellIndex // 세로 칸 
        // var row = td.parentNode.rowIndex // 가로 줄 
        
        //클릭한 셀의 index 칮기 2
        var parentTr = e.currentTarget.parentNode
        var parentTbody = e.currentTarget.parentNode.parentNode
        var col = Array.prototype.indexOf.call(parentTr.children, td) //nodeList에서 indexof를 쓸수있게 함. 
        var row = Array.prototype.indexOf.call(parentTbody.children, parentTr)
        
        console.log('row :>> ', row);
        console.log('col :>> ', col);
        console.log('dataSet :>> ', dataSet);

        //지뢰가 없으면 깃발 ! 를 넣음.
        if(td.textContent === '' || td.textContent === 'x'){
          td.textContent = '!' 
          //e.currentTarget.classList.remove('mine')
        } else if(td.textContent === '!'){
          td.textContent = '?'  
          //e.currentTarget.classList.remove('mine')
        } else if(td.textContent === '?') { 
          if (dataSet[row][col] === '1') {
            td.textContent = '' 
          }else if (dataSet[row][col] === 'x'){
            console.log('xxxx');
            td.textContent = 'x' 
          }
          //dataSet[row][col] = '1' //데이터는 빈칸일때 1을 넣어준다. 
        }
      })      
      
      //오른쪽 클릭한 주위 지뢰 갯수표현 
      newTd.addEventListener('click', function (e) {
        var td = e.currentTarget
        var col = td.cellIndex // 세로 칸 
        var row = td.parentNode.rowIndex // 가로 줄 
        td.classList.add('opened')
        
        //지뢰를 클릭할 경우 
        if(dataSet[row][col] === 'x'){
          td.textContent = '뻥'
          newTd.removeEventListener('click')
        }else{
          
          //지뢰위치 배열로 저장 
          //
          var mines = [            
            dataSet[row][col-1],                        dataSet[row][col+1]  
          ]
          console.log('mines 1:>> ', mines);

          if(dataSet[row-1]){ //내가 클릭한 전 줄이 있을경우
            mines = mines.concat(dataSet[row-1][col-1], dataSet[row-1][col], dataSet[row-1][col+1])
            // 이렇게 해도 된다. 그러나 concat을 하는게 더 빠르겠지? 
            // mines.push(dataSet[row-1][col-1])
            // mines.push(dataSet[row-1][col])
            // mines.push(dataSet[row-1][col+1])
          }
          console.log('mines 2:>> ', mines);
          if(dataSet[row+1]){ //내가 클릭한 다음 줄이 있을 경우
            mines = mines.concat(dataSet[row+1][col-1], dataSet[row+1][col], dataSet[row+1][col+1])
          }
          console.log('mines3 :>> ', mines);

          //주변 지뢰 숫자로 표시 - 클릭점을 제외한 주위 8칸의 지뢰갯수를 모두 더하여 보여준다.  
          td.textContent = mines.filter(function (v) { // true/false반환 
            return v === 'x'
          }).length
        }

      })

      newTr.appendChild(newTd)
    }    
    tbody.appendChild(newTr)
    
  }
  
  // 지뢰 심기 
  for (let k = 0; k < s.length; k++) {
    let srow = Math.floor(s[k] / horizontal ) // 0~ 99까지의 숫자를 뽑음 , 줄 수 
    let scol = s[k] % vertical // % 나머지 59 % 10 = 9 , 칸 수
    console.log('srow :>> ', srow);
    console.log('scol :>> ', scol);
    // 5번째줄 9번째 칸 왜냐하면 칸수는 0번째부터 시작하므로 9 -1  해줌. 
    tbody.children[srow].children[scol].textContent = 'x'
    tbody.children[srow].children[scol].classList.add('mine')
    dataSet[srow][scol]  = 'x'

  }
  
})

