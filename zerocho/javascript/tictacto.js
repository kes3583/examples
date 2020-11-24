const table = document.querySelector('table')
const trs = table.querySelectorAll('tr')
const row = []
const column = []
let player = ['X', 'O']
let currentPlayer = player[0]; // x 플레이어가 먼저 시작 
const playing = function (e) {   
    
    let targetRow = row.indexOf(e.target.parentNode)
    let targetColumn = column[targetRow].indexOf(e.target)
    console.log('몇줄?', row.indexOf(e.target.parentNode))
    console.log('몇칸?', column[targetRow].indexOf(e.target))
    if (column[targetRow][targetColumn].innerHTML === '') {
        console.log('빈칸입니다.')
        column[targetRow][targetColumn].innerHTML = currentPlayer
       
        let bingo = false;
        //horizentolly
        if(column[targetRow][0].innerHTML === currentPlayer &&
        column[targetRow][1].innerHTML === currentPlayer &&
        column[targetRow][2].innerHTML === currentPlayer){
            bingo = true;
            console.log('bingo1', bingo)
        }

        //vertically
        if (column[0][targetColumn].innerHTML === currentPlayer &&
            column[1][targetColumn].innerHTML === currentPlayer &&
            column[2][targetColumn].innerHTML === currentPlayer) {
            bingo = true;
            console.log('bingo2', bingo)
        }

        //diagnolly left
        if (targetRow - targetColumn === 0 || Math.abs(targetRow - targetColumn) === 2){
            if ((column[0][0].innerHTML === currentPlayer &&
                column[1][1].innerHTML === currentPlayer &&
                column[2][2].innerHTML === currentPlayer) || 
                (column[0][2].innerHTML === currentPlayer &&
                    column[1][1].innerHTML === currentPlayer &&
                    column[2][0].innerHTML === currentPlayer)) {
                bingo = true;
                console.log('bingo3', bingo)
            }
        }
                
        if(bingo) {
            console.log(currentPlayer, 'is the winner!')
            bingo = false;
            currentPlayer = currentPlayer === player[0] ? player[1] : player[0];
            trs.forEach((el, i) => {                
                const tds = el.querySelectorAll('td')
                tds.forEach((el, j) => {
                    el.removeEventListener('click', playing, true)
                    //el.innerHTML = '';
                });
            });            

        }else{
            currentPlayer = currentPlayer === player[0] ? player[1] : player[0]; //player change
        }
        

        // if (currentPlayer === player[0]) {
        //     currentPlayer = player[1]
        // }else{
        //     currentPlayer = player[0]
        // }        
        
    } else if (column[targetRow][targetColumn].innerHTML !== ''){
        alert('다른 빈칸을 클릭해주세요.')
    }
    
    console.table('코드종료', column)
}

trs.forEach((el, i) => {
    row.push(el) // row = [ tr,tr,tr  ]
    column.push([]) // column = [ [td,td,td],[td,td,td],[td,td,td]  ]
    const tds = el.querySelectorAll('td') 
    tds.forEach( (el, j) => {        
        el.addEventListener('click', playing, true) //when td click, play starts       
        column[i].push(el)
    });
});

// console.table('row',row)
// console.table('column', column)