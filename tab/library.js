var myWindowGlobalLibraryName = (function () {
  
  /* HELPERS */
  var extend = function (a, b) {
    var c;
    for (c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
    return a
  };

  var createButton = function (obj, page, el) {
    let button = document.createElement('button');
    
    button.innerText = page;
    button.value = page;

    button.addEventListener('click', function () {
      console.log('click')
      console.log('value', this.value)
      tEl.innerHTML = ``;
      //obj.page = this.value
      buildTable(obj, el)
    });

    return button;
  }

  var _each = function (a, b, c) {
    if ("[object Object]" === Object.prototype.toString.call(a))
      for (var d in a) Object.prototype.hasOwnProperty.call(a, d) && b.call(c, d, a[d], a);
    else
      for (var e = 0, f = a.length; e < f; e++) b.call(c, e, a[e], a)
  };

  /* Parse JSON string to HTML */
  var jsonToTable = function (data) {
    var frag = document.createDocumentFragment(),
      tbody = document.createElement('tbody');
    
     //object for-loop
    for (const prop in data) {
      let childItems = Object.values(data[prop])[0];
      let arrayItems = childItems.split(','); //turn into Array - 두번째 array
      var tr = document.createElement('tr');
      var td = document.createElement('td');
      td.innerHTML = `${prop}`
      tr.appendChild(td)
      //array for-loop
      for (var e = 0, f = arrayItems.length; e < f; e++) {         
        if( e <= 1){
          var td = document.createElement('td');
          td.innerHTML = `${arrayItems[e]}`
        }else if(e == 2){
          var td = document.createElement('td');
          td.innerHTML = `${arrayItems[e]}`
        }else{
          td.innerHTML += `${arrayItems[e]}`
        }         
        tr.appendChild(td)
      }
     
      frag.appendChild(tr)
    }    
    tbody.appendChild(frag);

    return tbody;
  };

  // We will add functions to our library here !
  function Plugin(el, data, options) {
    this.el = el;
    var defaults = {
      'perPage': 10,
      'paginations': 5,
    }

    this.options = extend(defaults, options);
    var nodeName = this.el.children[0].nodeName.toLowerCase();
    if (nodeName != "table") throw new Error('The selected element (' + nodeName + ') is not a table!');

    this.table = el.querySelector('table');
    if (data) {
      var tbody = jsonToTable(data);
      this.table.appendChild(tbody);
    }

    this.tbody = this.table.tBodies[0];
    this.rows = Array.prototype.slice.call(this.tbody.rows)
    console.log('this.rows :>> ', this.rows);

    this.currentPage = 1
    this.paginations = this.options.paginations
    console.log('this', this)
    this.init();
  }

  Plugin.prototype = {
    
    init : function () {
      var _this = this, pages = this.pages, settings = this.options;

      this.pagination = document.createElement('div');
      this.pagination.setAttribute('class', 'pagination')
      _this.el.appendChild(this.pagination)
      this.paginate();
      this.showPage();
      this.setPaginationButton(); 
    },
    /**
     * Set up the initial button 
     */
    paginate: function () {
      var perPage = this.options.perPage, rows = this.rows;
      this.pages = rows.map(function (tr, i) {
        return i % perPage == 0 ? rows.slice(i, i + perPage) : null;
      }).filter(function (pages) {
        return pages;
      });
      console.log('pages', this.pages.length)     
    },
    showPage: function (index) {
      console.log('showPage index :> ', index);
      index = index || 0;
      var _this = this, pages = this.pages;
      
      
      if (pages.length) {
        var frag = document.createDocumentFragment();
        
        //tr element
        for (let i = 0; i < pages[index].length; i++) {
            //console.log('object :>> ', pages[index][i]);
            frag.appendChild(pages[index][i]);
        }
        _this.clear();
        //console.log('frag :>> ', frag);
        _this.tbody.appendChild(frag);        
      }      
    },
    setPaginationButton : function(n) {
      var settings = this.options, total, _this = this;
      console.log('setPaginationButton');
      console.log('setPaginationButton n :>> ', n);
      _this.currentPage = n || this.currentPage
      console.log('_this.currentPage :>> ', _this.currentPage);
      //let len = settings.paginations >= this.pages ? this.pages : settings.paginations
     console.log('this.currentPage :>> ', this.currentPage);
     console.log('_this.paginations :>> ', _this.paginations);
      for (let i = _this.currentPage; i <= _this.paginations; i++) {        
        let btn = this.paginationButton(i)
        total = i
        this.pagination.appendChild(btn);
      }
      console.log('total :>> ', total);
      console.log('this.pages.length :>> ', this.pages.length);
      if (total < this.pages.length) this.switchPage('next');
      //if (total > 1) setPrevButton()
    },
    paginationButton: function(n) {
      let _this = this, button = document.createElement('button');
      button.innerText = n;
      button.value = n;

      button.addEventListener('click', function () {
        _this.clear()  
        this.currentPage = this.value
        _this.showPage(this.currentPage - 1)
      });

      return button;
    },
    switchPage: function (page) {
      console.log('switchPage :>> ');
      console.log('page',page);
      var _this = this, nextButton = document.createElement('button'), settings = this.options
      
      nextButton.innerText = `${page}`
      nextButton.value = _this.paginations + settings.paginations

      nextButton.addEventListener('click', function () {
        console.log('next')
        console.log('_this.currentPage', _this.currentPage)
        _this.currentPage = _this.paginations + 1
        console.log('this.paginations :>> ', _this.paginations)

        _this.paginations = _this.pages.length < _this.paginations + settings.paginations ? _this.pages.length : _this.paginations + settings.paginations
        console.log('_this.paginations :>> ', _this.paginations);
        while (_this.pagination.hasChildNodes()) {
          console.log('remove child');
          _this.pagination.removeChild(_this.pagination.firstChild)
        }
        
        console.log('_this.pagination :>> ', _this.pagination);
        console.log('this.currentPage :>> ', _this.currentPage);
        _this.showPage(_this.currentPage - 1)
        _this.setPaginationButton(_this.currentPage);
      });

      _this.pagination.appendChild(nextButton);
    },
    clear: function () {
      console.log('clear');
      if (this.table.tBodies.length) {
        // IE doesn't play nice with innerHTML on tBodies.
        if (this.isIE) {
          while (this.tbody.hasChildNodes()) {
            this.tbody.removeChild(this.tbody.firstChild);
          }
        } else {
          this.tbody.innerHTML = '';
        }
      }
    },
  
  }
  return Plugin;  
})();

export default myWindowGlobalLibraryName;