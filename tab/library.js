var myWindowGlobalLibraryName = (function () {
  
  /* HELPERS */
  var extend = function (a, b) {
    var c;
    for (c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
    return a
  };

  var _newFragment = function () {
    return document.createDocumentFragment()
  }

  var _newElement = function (a, b) {
    var c = document,
      d = c.createElement(a);
    if (b && "object" == typeof b) {
      var e;
      for (e in b)
        if ("html" === e) d.innerHTML = b[e];
        else if ("text" === e) {
        var f = c.createTextNode(b[e]);
        d.appendChild(f)
      } else d.setAttribute(e, b[e])
    }
    return d
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

  function Plugin(el, data, options) {
    this.el = el;
    var defaults = {
      'perPage': 10,
      'paginations': 5,
    }

    this.options = extend(defaults, options);
    // var nodeName = this.el.children[0].nodeName.toLowerCase();
    // if (nodeName != "table") throw new Error('The selected element (' + nodeName + ') is not a table!');
    // if (table.tHead === null) throw new Error('The sortable option requires table headings!');

    this.table = _newElement('table', { class: 'data-table'});
    this.thead = this.table.tHead;

    if (data) {
      var tbody = jsonToTable(data);
      this.table.appendChild(tbody);
    }

    this.tbody = this.table.tBodies[0];
    this.rows = Array.prototype.slice.call(this.tbody.rows)
    this.currentPage = 1
    this.paginations = this.options.paginations
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
      })    
    },
    showPage: function (index) {
      index = index || 0;
      var _this = this, pages = this.pages;      
      
      if (pages.length) {
        var frag = document.createDocumentFragment();
        
        //tr element
        for (let i = 0; i < pages[index].length; i++) {
            frag.appendChild(pages[index][i]);
        }
        _this.clear(this.table);
        
        _this.tbody.appendChild(frag);        
      }      
    },
    setPaginationButton : function() {
      var settings = this.options, total, _this = this;

      //_this.paginations = _this.paginations >= this.pages.length ? this.pages.length : _this.paginations //_this.pagination는 반드시 15이어야한다.      
      var len = _this.paginations >= this.pages.length ? this.pages.length : _this.paginations //12이어야한다. 
    
      for (let i = _this.currentPage; i <= len; i++) {
        let btn = this.paginationButton(i)
        total = i
        this.pagination.appendChild(btn);
      }
     
      if (total < this.pages.length) this.switchPage('next');
      if (_this.currentPage > 1) this.switchPage('prev');
    },
    paginationButton: function(n) {
      let _this = this, button = document.createElement('button');
      button.innerText = n;
      button.value = n;

      button.addEventListener('click', function () {
        _this.clear(this.table)  
        this.currentPage = this.value
        _this.showPage(this.currentPage - 1)
      });

      return button;
    },
    switchPage: function (page) {
      var _this = this, button = document.createElement('button'), settings = this.options      
      button.innerText = `${page}`
      
      if(page === 'next'){   

        button.value = _this.paginations + settings.paginations

        button.addEventListener('click', function () {        
          _this.currentPage = _this.paginations + 1
          _this.paginations = _this.paginations + settings.paginations
                    
          _this.clear(_this.pagination)
          _this.showPage(_this.currentPage - 1)
          _this.setPaginationButton(_this.paginations);
        })
        _this.pagination.appendChild(button)

      }else if (page === 'prev') {

        button.value = _this.paginations - settings.paginations
        
        button.addEventListener('click', function () {          
          _this.currentPage = _this.currentPage - settings.paginations
          _this.paginations = _this.paginations - settings.paginations

          _this.clear(_this.pagination)
          _this.showPage(_this.currentPage - 1)
          _this.setPaginationButton();
        })
        _this.pagination.prepend(button)

      }      
    },
    clear: function (el) {      
      if (el.nodeName === 'TABLE') {
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
      }else if(el.nodeName === 'DIV'){
        while (this.pagination.hasChildNodes()) {
          this.pagination.removeChild(this.pagination.firstChild)
        }
      }      
    }  
  }

  return Plugin;  

})();

export default myWindowGlobalLibraryName;