var table = document.querySelector('table')
var tbody = table.querySelector('table > tbody')

var dataSet = [];
var flag = false;
var openedCells = 0;

document.querySelector('#exec').addEventListener('click', function(){
  // 입력값 정의
  var horizontal = document.querySelector('#horizontal').value;
  var vertical = document.querySelector('#vertical').value;
  var mine = document.querySelector('#mine').value

  //테이블 초기화
  tbody.innerHTML = ''
  dataSet = [];
  document.querySelector('.result').textContent= ''
  openedCells = 0
  flag = false

  
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
  //console.log('s 20:>> ', s);

  //지뢰 테이블  
  for (let i = 0; i < horizontal; i++) {    
    const newTr = document.createElement("tr");
    var arrTr = []
    dataSet.push(arrTr)
    for (let j = 0; j < vertical; j++) {
      arrTr.push(0)
      const newTd = document.createElement('td')
    
      //왼쪽 클릭
      newTd.addEventListener('contextmenu', function (e) {
        var td = e.currentTarget; // (1)
        if (!td) return; // (2)
        if (!table.contains(td)) return; // (3)

        //클릭한 셀의 index 칮기 1
        var col = td.cellIndex // 세로 칸 
        var row = td.parentNode.rowIndex // 가로 줄 
        
        //클릭한 셀의 index 칮기 2
        // var parentTr = e.currentTarget.parentNode
        // var parentTbody = e.currentTarget.parentNode.parentNode
        // var col = Array.prototype.indexOf.call(parentTr.children, td) //nodeList에서 indexOf를 쓸수있게 함. 
        // var row = Array.prototype.indexOf.call(parentTbody.children, parentTr)

        console.log('dataSet :>> ', dataSet);

        //지뢰가 없으면 깃발 ! 를 넣음.
        if(td.textContent === '' || td.textContent === 'x'){
          td.textContent = '!' 
          //e.currentTarget.classList.remove('mine')
        } else if(td.textContent === '!'){
          td.textContent = '?'  
          //e.currentTarget.classList.remove('mine')
        } else if(td.textContent === '?') { 
          if (dataSet[row][col] === 0) {
            td.textContent = '' 
          }else if (dataSet[row][col] === 'x'){
            td.textContent = 'x' 
          }
          //dataSet[row][col] = '1' //데이터는 빈칸일때 1을 넣어준다. 
        }
      })      
      
      //왼쪽 클릭한 주위 지뢰 갯수표현 
      newTd.addEventListener('click', function (e) {
        var td = e.currentTarget
        var col = td.cellIndex // td 세로 칸 
        var row = td.parentNode.rowIndex // tr 가로 줄 
        openedCells = openedCells + 1 //칸이 열릴때마다 1씩 더해줌 
        
        if(flag) {
          console.log('게임 종료') 
          return // 게임 종료 
        }
        // if(td.textContent === '!' || td.textContent === '?'){
        //   console.log(td.textContent, '입니다. 다른칸을 클릭하세요!');
        //   document.querySelector('.result').textContent = td.textContent + '입니다. 다른칸을 클릭하세요!'
        //   return; // 칸이 ?이거나 !이면 클릭 못하게 
        // }
        if(['?','!'].includes(td.textContent)){
          document.querySelector('.result').textContent = td.textContent + '입니다. 다른칸을 클릭하세요!'
          return; // 칸이 ?이거나 !이면 클릭 못하게 
        }
        
        td.classList.add('opened')  
        
        //지뢰를 클릭할 경우 
        if(dataSet[row][col] === 'x'){
          td.textContent = '뻥'
          document.querySelector('.result').textContent = '실패! 다시도전하세요!'
          flag = true
        }else{
          
          //지뢰위치 배열로 저장           
          var aroundMines = [            
            dataSet[row][col-1],                        dataSet[row][col+1]  
          ] 

          if(dataSet[row-1]){ //내가 클릭한 전 줄이 있을경우
            aroundMines = aroundMines.concat(dataSet[row-1][col-1], dataSet[row-1][col], dataSet[row-1][col+1])
            // 이렇게 해도 된다. 그러나 concat을 하는게 더 빠르겠지? 
            // mines.push(dataSet[row-1][col-1])
            // mines.push(dataSet[row-1][col])
            // mines.push(dataSet[row-1][col+1])
          }

          if(dataSet[row+1]){ //내가 클릭한 다음 줄이 있을 경우
            aroundMines = aroundMines.concat(dataSet[row+1][col-1], dataSet[row+1][col], dataSet[row+1][col+1]) // concat은 새로운 배열을 반환하므로 기존 배열에 대입시켜줘야 한다. 
          }  

          //주변 지뢰 숫자로 표시 - 클릭점을 제외한 주위 8칸의 지뢰갯수를 모두 더하여 보여준다.  
          var aroundMinesLen = aroundMines.filter(function (v) { // true/false반환 
            return ['x','?','!'].includes(v)
          }).length

          //거짓인 값 : false, '' , 0, null, NaN, undefined - minesLen이 없는경우 0을 빈칸으로 출력
          td.textContent = aroundMinesLen || ''
        }
        dataSet[row][col] = 1 //지뢰가 아닌 경우 클릭한 칸을 1로 채움  = 오픈된 칸 

        //클릭 주위 8칸 모두 0인경우 지뢰 탐색 
        //console.log('aroundMinesLen :>> ', aroundMinesLen);
        if (aroundMinesLen === 0 ) {
          var aroundCells = [] // 주변 칸 배열저장
          //클릭지점 윗줄 존재할경우 
          if (tbody.children[row-1]) {
            aroundCells = aroundCells.concat(
              [
                tbody.children[row-1].children[col-1],
                tbody.children[row-1].children[col],
                tbody.children[row-1].children[col+1]  
              ]
            )   
          }
          //클릭지점 양 쪽 칸
          aroundCells = aroundCells.concat(
            [ tbody.children[row].children[col-1], tbody.children[row].children[col+1] ]
          )

          //클릭 다음 줄 존재할경우 
          if (tbody.children[row+1]) {
          aroundCells = aroundCells.concat(
              [
                tbody.children[row+1].children[col-1],
                tbody.children[row+1].children[col],
                tbody.children[row+1].children[col+1]  
              ]
            )   
          }
         
          //console.log('aroundCells :>> ', aroundCells.filter((v) => !!v));

          // \ !!undefined, null, empty value 걸러서 값만 반환해줌. 클릭한 td를 제외한 주변 8칸에서 undefined  뺀 칸  
          aroundCells.filter((v) => !!v).forEach(function(c){ 
            
            var col = c.cellIndex // 세로 칸 
            var row = c.parentNode.rowIndex // 가로 줄 

            if(dataSet[row][col] !== 1){ // 1은 opened된 칸, 오픈된 칸이 아닌것만 다시 클릭
              c.click()
            }
            
          })  
          
        } 

        console.log('dataSet :>> ', dataSet);
        var t = (horizontal * vertical) - mine
        if(openedCells === t){
          flag = true
          document.querySelector('.result').textContent = 'success!!!! well done!!'
        }

      })

      newTr.appendChild(newTd)
    }    
    tbody.appendChild(newTr)
    
  }
  
  // 지뢰 심기 
  //s = [5, 3] 지뢰가 1,1로 자리가 같은 지뢰장소에 심게 됨. 
  console.log('s :>> ', s);
  for (let k = 0; k < s.length; k++) {
    console.log('s[k] :>> ', s[k]);// 0~ 테이블 갯수까지의 숫자를 뽑음 , 줄 수 
    let srow = Math.floor(s[k] / vertical ) // 랜덤숫자 / 총 세로 값
    let scol = s[k] % vertical // 세로로 나눈 나머지(%) 59 % 10 = 9 , 칸 수
    // 5번째줄 9번째 칸 왜냐하면 칸수는 0번째부터 시작하므로 9 -1  해줌. 
    console.log('srow, scol :>> ', srow, scol);
    if (horizontal < vertical){
      console.log('true');
      //srow = Math.floor(s[k] / horizontal ) - 1
    }
    console.log('srow, scol :>> ', srow, scol);
    tbody.children[srow].children[scol].textContent = 'x'
    tbody.children[srow].children[scol].classList.add('mine')
    console.log('pass');
    dataSet[srow][scol]  = 'x'

  }
  
})

