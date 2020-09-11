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
      let item = data[prop];
      //console.log('item :>> ', item);
      let childItems = Object.values(data[prop])[0];
      let arrayItems = childItems.split(','); //turn into Array
      var tr = document.createElement('tr');
      //console.log('arrayItems :>> ', arrayItems);
      
      //array for-loop
      for (var e = 0, f = arrayItems.length; e < f; e++) {        
        if( e <= 1){
          var td = document.createElement('td');
          //console.log('e1 :>> ', e);
          td.innerHTML = `${arrayItems[e]}`
          //console.log('td :>> ', td);
        }else if(e == 2){
          var td = document.createElement('td');
          //console.log('e2 :>> ', e)
          td.innerHTML = `${arrayItems[e]}`
        }else{
          td.innerHTML += `${arrayItems[e]}`
          //console.log('td :>> ', td);
        }  
        
        tr.appendChild(td)
      }
              
      frag.appendChild(tr)
    }
    
    
    tbody.appendChild(frag);
    console.log('tbody', tbody)

    return tbody;
  };

  // We will add functions to our library here !
  function Plugin(el, data, options) {
    // console.log(data)
    // console.log(el)
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
    this.rows = Array.prototype.slice.call(this.tbody.rows);
    console.log('this.rows :>> ', this.rows);

    this.currentPage = 1;
    console.log('this', this)
    this.init();
  }

  Plugin.prototype = {
    
    init : function () {
      var _this = this, pages = this.pages, settings = this.options;

      this.pagination = document.createElement('div');
      this.pagination.setAttribute('class', 'pagination')
      _this.el.appendChild(this.pagination)

      console.log('settings', settings)  
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
      console.log('this.pages', this.pages)
      this.lastPage = this.pages.length;
    },
    showPage: function (index) {
      index = index || 0;

      var _this = this,
        pages = this.pages;

      if (pages.length) {

        // Use a fragment to limit touching the DOM
        var frag = _newFragment();
        console.log('index :>> ', index);
        _each(pages[index], function (i, row) {
          console.log('row :>> ', row);
          frag.appendChild(row);
        });

        _this.clear();
        _this.tbody.appendChild(frag);

        _this.onFirstPage = false;
        _this.onLastPage = false;

        switch (_this.currentPage) {
          case 1:
            _this.onFirstPage = true;
            break;
          case _this.lastPage:
            _this.onLastPage = true
            break;
        }
      }

      // Update the info
      if (_this.options.info) {
        var current = 0,
          f = 0,
          t = 0,
          items;

        if (pages.length) {
          current = _this.currentPage - 1;
          f = current * _this.options.perPage;
          t = f + pages[current].length;
          f = f + 1;
          items = !!this.searching ? this.searchRows.length : this.rows.length;
        }

        var template = ['Showing ', f, ' to ', t, ' of ', items, ' rows'];

        this.label.innerHTML = template.join('');
      }
    },
    setPaginationButton : function() {
      var settings = this.options;
      let len = obj.window >= obj.pages ? obj.pages : obj.window
      for (let i = obj.page; i <= len; i++) {
        let btn = this.paginationButton()
        var total = i
        pEl.appendChild(btn);
      }

      

    },
    paginationButton: function() {
      var page = this.page, tbody = this.body;
      let button = document.createElement('button');
      button.innerText = page;
      button.value = page;

      button.addEventListener('click', function () {
        tbody.innerHTML = ``;
        
        
      });

      return button;
    }
  
  }




  return Plugin;


  
})();

export default myWindowGlobalLibraryName;