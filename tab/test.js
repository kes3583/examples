//request json
let request = obj => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(obj.method || "GET", obj.url);
    if (obj.headers) {
      Object.keys(obj.headers).forEach(key => {
        xhr.setRequestHeader(key, obj.headers[key]);
      });
    }
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        var resp = xhr.responseText;
        var respJson = JSON.parse(resp);
        resolve(respJson);
      } else {
        reject(xhr.statusText);
      }
    };
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send(obj.body);
  });
};



//insert trimmed data into table body
function buildTable(obj, el) {

  //trim view data
  let trimStart = (obj.page - 1) * obj.rows
  let trimEnd = trimStart + obj.rows
  let trimmedData = Object.fromEntries(
    Object.entries(obj.querySet).slice(trimStart, trimEnd)
  )

  //total view pages
  obj.pages = Math.ceil(Object.keys(obj.querySet).length / obj.rows)
  let tEl = el.querySelector('table > tbody')

  tEl.innerHTML = ""

  for (const prop in trimmedData) {
    let item = trimmedData[prop];
    let childItems = Object.values(trimmedData[prop])[0];
    let arrayItems = childItems.split(',');
    let row = `<tr>
                    <td>${prop}</td>                    
                    <td>${arrayItems[0]}</td>
                    <td>${arrayItems[1]}</td>
                    <td>${arrayItems[2]}</td>`;

    tEl.insertAdjacentHTML('beforeend', row)
  }

  
}


//set numbered buttons into pagination 
function setPaginationButton(obj, el) {
  let pEl = el.querySelector('.pagenumbers')
  
  let len = obj.window >= obj.pages ? obj.pages : obj.window
  console.log('page', obj.page)
  console.log('window', obj.window)
  console.log('pages', obj.pages)
  console.log('len', len)
  for (let i = obj.page; i <= len; i++) {
    let btn = PaginationButton(obj, i, el)
    var total = i
    pEl.appendChild(btn);
  }

  if (total < obj.pages) setNextButton(obj, el)
  if (obj.page > 1) setPrevButton(obj, el)

}

//create next button
function setNextButton(obj, el) {
  let nextButton = document.createElement('button');
  let pEl = el.querySelector('.pagenumbers')
  nextButton.innerText = `>>`
  nextButton.value = obj.window + 5

  nextButton.addEventListener('click', function () {
    console.log('next')
    obj.page = obj.window + 1
    obj.window = obj.window + 5
    pEl.innerText = ''

    buildTable(obj, el)
    setPaginationButton(obj, el);
  });

  pEl.appendChild(nextButton);
}

//create prev button
function setPrevButton(obj, el) {
  let prevButton = document.createElement('button');
  let pEl = el.querySelector('.pagenumbers')
  prevButton.innerText = `<<`
  prevButton.value = obj.window - 5

  prevButton.addEventListener('click', function () {
    console.log('prev')
    console.log('window', obj.window)
    console.log('page', obj.page)
    obj.page = obj.page - 5
    obj.window = obj.window - 5
    pEl.innerText = ''

    buildTable(obj, el)
    setPaginationButton(obj, el);
  });

  pEl.prepend(prevButton);
}

// create button
function PaginationButton(obj, page, el) {
  let button = document.createElement('button');
  let tEl = el.querySelector('table > tbody')
  button.innerText = page;
  button.value = page;

  button.addEventListener('click', function () {
    console.log('click')
    console.log('value', this.value)
    tEl.innerHTML = ``;
    obj.page = this.value
    buildTable(obj, el)
  });

  return button;
}