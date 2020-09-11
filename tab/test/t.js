/*!
 *
 * Vanilla-DataTables
 * Copyright (c) 2015 Karl Saunders (http://mobiuswebdesign.co.uk)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 0.1.4
 *
 */

(function (root, factory) {
  var plugin = 'DataTable';

  if (typeof define === 'function' && define.amd) {
    define([], factory(plugin));
  } else if (typeof exports === 'object') {
    module.exports = factory(plugin);
  } else {
    root[plugin] = factory(plugin);
  }
}
(this, function (plugin) {
  'use strict';


  /* HELPERS */
  var extend = function (a, b) {
    var c;
    for (c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
    return a
  };

  var _hasClass = function (e, c) {
    return e.classList ? e.classList.contains(c) : !!e.className.match(new RegExp('(\\s|^)' + c + '(\\s|$)'))
  }
  var _addClass = function (e, c) {
    e.classList ? e.classList.add(c) : _hasClass(c) || (e.className = e.className.trim() + " " + c)
  }
  var _removeClass = function (a, c) {
    a.classList ? a.classList.remove(c) : _hasClass(c) && (a.className = a.className.replace(new RegExp("(^|\\c)" + c.split(" ").join("|") + "(\\c|$)", "gi"), " "))
  }

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

	/**
	 * https://gist.github.com/scopevale/1663452
	 */
  var _sort = function (a, b) {
    var c, d;
    1 === b ? (c = 0, d = a.length) : b === -1 && (c = a.length - 1, d = -1);
    for (var e = !0; e;) {
      e = !1;
      for (var f = c; f != d; f += b)
        if (a[f + b] && a[f].value > a[f + b].value) {
          var g = a[f],
            h = a[f + b],
            i = g;
          a[f] = h, a[f + b] = i, e = !0
        }
    }
    return a
  };

  var _each = function (a, b, c) {
    // console.log('object a', a)
    // console.log('object call', Object.prototype.toString.call(a)) // [object Array]
    // console.log('object b', b) //function
    if ("[object Object]" === Object.prototype.toString.call(a)){
      //console.log('1') // object 이면 [object Object]
      for (var d in a) Object.prototype.hasOwnProperty.call(a, d) && b.call(c, d, a[d], a);
    }else{
      // console.log('2') // object 가 아니면 [object Array]
      // console.log('a',a)
      // console.log('b',b)
      // console.log('c',c)
      for (var e = 0, f = a.length; e < f; e++) b.call(c, e, a[e], a)
    }
  }

	/**
	 * Algorithm for truncating the pagination links
	 * @param  {array} The HTML pagination links
	 * @param  {int} Current page number
	 * @param  {int} Total number of pages
	 * @param  {int} The number of links visible either side of the active link
	 *                e.g. current page = 7, delta = 2 gives 1 ... 5 6 7 8 9 ... 25
	 *                e.g. current page = 11, delta = 3 gives 1 ... 7 8 9 11 12 13 14 ... 25
	 * @return {array} The collection of links (including ellipsis).
	 */
  var _truncate = function (links, page, pages, delta) {
    delta = delta || 2;
    var offset = (delta * 2);
    var left = page - delta;
    var right = page + delta;
    var range = [];
    var pager = [];
    var k;

    if (page < (4 - delta) + offset) {
      right = 3 + offset;
    } else if (page > pages - ((3 - delta) + offset)) {
      left = pages - (2 + offset);
    }

    for (var i = 1; i <= pages; i++) {
      if (i == 1 || i == pages || i >= left && i <= right) {
        var a = links[i - 1];
        _removeClass(a, 'active');
        range.push(a);
      }
    }

    _each(range, function (i, link) {
      var page = link.children[0].getAttribute('data-page');
      if (k) {
        var p = k.children[0].getAttribute('data-page');
        if (page - p == 2) {
          pager.push(links[p]);
        } else if (page - p != 1) {
          var ellipsis = _newElement('li', { class: 'ellipsis', html: '<a href="#">&hellip;</a>' })
          pager.push(ellipsis);
        }
      }
      pager.push(link);
      k = link;
    });
    console.log('pager', pager)
    return pager;
  };

  /* Parse JSON string to HTML */
  var jsonToTable = function (data) {
    var frag = _newFragment(),
      tbody = _newElement('tbody');

    _each(data, function (i, row) {
      var tr = _newElement('tr');
      _each(row, function (k, value) {
        var td = _newElement('td', {
          html: value
        });
        tr.appendChild(td);
      });
      frag.appendChild(tr);
    });

    tbody.appendChild(frag);

    return tbody;
  };

  // Emitter
  var Emitter = function () { };
  Emitter.prototype = {
    on: function (event, fct) {
      this._events = this._events || {};
      this._events[event] = this._events[event] || [];
      this._events[event].push(fct);
    },
    off: function (event, fct) {
      this._events = this._events || {};
      if (event in this._events === false) return;
      this._events[event].splice(this._events[event].indexOf(fct), 1);
    },
    trigger: function (event /* , args... */) {
      this._events = this._events || {};
      if (event in this._events === false) return;
      for (var i = 0; i < this._events[event].length; i++) {
        this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
      }
    }
  };


  Emitter.mixin = function (obj) {
    var props = ['on', 'off', 'trigger'];
    for (var i = 0; i < props.length; i++) {
      if (typeof obj === 'function') {
        obj.prototype[props[i]] = Emitter.prototype[props[i]];
      } else {
        obj[props[i]] = Emitter.prototype[props[i]];
      }
    }
    return obj;
  }

	/**
	 * Plugin Object
	 */
  function Plugin(table, options) {
    console.log('Plugin')
    /* Plugin defaults */
    var defaults = {
      perPage: 10,
      perPageSelect: [5, 10, 15, 20, 25],
      navPosition: 'bottom',
      navButtons: true,
      nextPrev: true,
      prevText: '&lsaquo;',
      nextText: '&rsaquo;',
      sortable: false,
      searchable: false,
      fixedHeight: false,
      info: true,
      hideUnusedNavs: false,
      truncatePager: true,
      pagerDelta: 2,
      plugins: [],
    };

    this.options = extend(defaults, options);

    var nodeName = table.tagName.toLowerCase();

    if (nodeName != "table") throw new Error('The selected element (' + nodeName + ') is not a table!');

    if (table.tHead === null && this.options.sortable) throw new Error('The sortable option requires table headings!');

    this.table = table;
    this.thead = this.table.tHead;

    if (this.options.data) {
      var tbody = jsonToTable(this.options.data);
      this.clear();
      this.table.appendChild(tbody);
    }

    this.tbody = this.table.tBodies[0];
    console.log('this.table.tBodies[0]', this.table.tBodies[0].rows)
    this.rows = Array.prototype.slice.call(this.tbody.rows);
    console.log('Plugin this.rows :>> ', this.rows);

    this.initialised = false;
    this.sortEnabled = false;

    this.isIE = !!/(msie|trident)/i.test(navigator.userAgent);

    this.paginators = [];

    this.currentPage = 1;
    this.onFirstPage = true;
    this.onLastPage = false;

    this.searching = false;
    console.log('thisssss',this)
    this.init();
  }

  Plugin.prototype = {

    init: function () {
      console.log('init :>> ');
      if (this.initialised) return;

      var _this = this;

      this.wrapper = _newElement('div', { class: 'dataTable-wrapper' });
      this.tableContainer = _newElement('div', { class: 'dataTable-container' })
      this.selector = _newElement('select', { class: 'dataTable-selector' });
      this.searchInput = _newElement('input', { type: 'text', 'class': 'dataTable-input', placeholder: 'Search...' });
      this.label = _newElement('div', { class: 'dataTable-info' });

      var topContainer = _newElement('div', { class: 'dataTable-top' });
      var bottomContainer = _newElement('div', { class: 'dataTable-bottom' });

      // Build the selector
      var wrapper = _newElement('label', { class: 'dataTable-selectWrapper' });

      console.log('this.options.perPageSelect :>> ', this.options.perPageSelect);
      _each(this.options.perPageSelect, function (i, val) {
        _this.selector.appendChild(_newElement('option', { value: val, html: val }));
      });
      console.log('this.selector :>> ', this.selector);
      this.selector.value = this.options.perPage;

      wrapper.appendChild(this.selector);
      wrapper.insertAdjacentHTML('beforeend', ' entries per page');
      topContainer.appendChild(wrapper);

      // Add class
      _addClass(this.table, 'dataTable-table');

      // Populate bottom container
      bottomContainer.appendChild(this.label);

      // Append the containers
      this.wrapper.appendChild(topContainer);
      this.wrapper.appendChild(this.tableContainer);
      this.wrapper.appendChild(bottomContainer);


      // Initialise
      this.paginate();
      this.showPage();

      // var paginatorA = _newElement('ul', { class: 'dataTable-pagination' }), paginatorB;
     
      // this.paginators.push(paginatorA); // array에 paginatorA 엘리먼트 담음
      // console.log('this.paginators', this.paginators)
      // console.log('paginatorA', paginatorA)

      // switch (this.options.navPosition) {
      //   case 'top':
      //     topContainer.appendChild(paginatorA);
      //     break;

      //   case 'bottom':
      //     bottomContainer.appendChild(paginatorA);
      //     break;

      //   case 'both':
      //     paginatorB = _newElement('ul', { class: 'dataTable-pagination' });
      //     this.paginators.push(paginatorB);
      //     topContainer.appendChild(paginatorA);
      //     bottomContainer.appendChild(paginatorB);
      //     break;
      // }

      // console.log('update :>> ',);
      // this.update();

      

      // // // Insert the main container
      this.table.parentNode.insertBefore(this.wrapper, this.table);

      // // // Populate table container
      this.tableContainer.appendChild(this.table);

      // this.containerRect = this.tableContainer.getBoundingClientRect();

      // Fix the height of the table to keep the bottom container fixed in place.
      // if (this.options.fixedHeight) {
      //   this.tableContainer.style.height = this.containerRect.height + 'px';
      // }

			// /* Fix the column widths so they don't change on page switch.
			//  * Use percentages so we don't have to update the width of each cell on window resize */
      // var cells = _this.table.tHead.rows[0].cells;

      // _each(cells, function (index, cell) {
      //   var rect = cell.getBoundingClientRect();
      //   var w = (rect.width / _this.containerRect.width) * 100;
      //   cell.style.width = w + '%';
      // });

      // /* Plugins */
      // if (this.options.plugins.length) {
      //   _each(this.options.plugins, function (i, plugin) {
      //     if (_this[plugin] && typeof _this[plugin].init === 'function') {
      //       _this[plugin].init(_this);
      //     }
      //   });
      // }

      // Event listeners
      // Emitter.mixin(this);

      // _this.handleClickEvents = function (e) {
      //   e = e || window.event;
      //   console.log('e.target :>> ', e.target);
      //   var target = e.target;
      //   var node = target.nodeName.toLowerCase();

      //   if (node === 'a') {
      //     if (target.hasAttribute('data-page')) {
      //       _this.switchPage(target.getAttribute('data-page'));
      //       e.preventDefault();
      //     }

      //     if (_hasClass(target, 'dataTable-sorter')) {
      //       _this.sortItems(e);
      //       e.preventDefault();
      //     }
      //   }
      // };

      // this.wrapper.addEventListener('click', _this.handleClickEvents, false);


      _this.initialised = true;
      // console.log('this.selector :>> ', this.selector);
      // console.log('_this :>> ', _this);
    },

		/**
		 * Set up the initial info to construct the datatable.
		 */
    paginate: function () {
      console.log('paginate :>> ');
      console.log('this.rows :>> ', this.rows);
      if (!this.searchInput.value.length) {
        this.searching = false;
      }

      var perPage = this.options.perPage, rows =  this.rows;
      console.log('rows :>> ', rows.length);
      
      /* 전체 페이지 갯수 나누기 보여줄수 */
      this.pages = rows.map(function (tr, i) {
        return i % perPage == 0 ? rows.slice(i, i + perPage) : null;
      }).filter(function (pages) { return pages; });
      console.log('pages',this.pages.length)
      console.log('this.pages',this.pages)
      this.lastPage = this.pages.length;
    },

    /* Change the page. */
    switchPage: function (page) {
      console.log('switchPage :>> ', page);
      var _this = this;

      // We don't want to load the current page again.
      if (page == this.currentPage)
        return;

      if (!isNaN(page)) {
        this.currentPage = parseInt(page, 10);
      }

      if (page == 'prev') {
        if (this.onFirstPage) return;

        this.currentPage--;
      }

      if (page == 'next') {
        if (this.onLastPage) return;

        this.currentPage++;
      }

      // Show the selected page;
      this.showPage(this.currentPage - 1);

      // render pager or simple class change
      this.renderPager();

      this.trigger('datatable.change');
    },

    /* Populate the table with the required page. */
    showPage: function (index) {
      console.log('show Page index :>> ', index);
      index = index || 0;

      var _this = this, pages = this.pages;

      if (pages.length) {

        // Use a fragment to limit touching the DOM
        var frag = _newFragment();
        
        _each(pages[index], function (i, row) {
          //console.log('row :>> ', row);
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
        var current = 0, f = 0, t = 0, items;

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

    search: function (event) {
      var _this = this,
        target = event ? event.target : this.searchInput,
        val = target.value.toLowerCase();

      this.searching = true;

      this.searchRows = [];

      if (!val.length) {
        this.searching = false;
        this.update();
        this.trigger("datatable.search");
        return;
      }

      this.clear();

      _each(this.rows, function (idx, tr) {
        _each(tr.cells, function (i, cell) {
          var text = cell.textContent.toLowerCase();
          var inArray = _this.searchRows.indexOf(tr) > -1;
          if (text.indexOf(val) > -1 && !inArray) {
            _this.searchRows.push(tr);
          }
        });
      });

      if (!_this.searchRows.length) {
        _this.setMessage('No entries found.');
      }

      this.update();

      this.trigger("datatable.search");
    },

    setMessage: function (message) {
      this.clear();
      this.tbody.appendChild(_newElement('tr', { html: '<td class="dataTables-empty" colspan="' + this.colspan + '">' + message + '</td>' }));
    },

    /* Update the table contents */
    update: function (e) {
      console.log('update :>> ', e);
      if (e) {
        var t = e.target;
        if (t === this.selector) {
          this.options.perPage = parseInt(t.value, 10);
        }

        this.trigger('datatable.perpage');
      }

      this.currentPage = 1;

      this.paginate();
      this.showPage();

      // Set the correct number of buttons
      var _this = this;

      this.links = [];

      _each(this.pages, function (i, page) {
        var num = i + 1;
        var li = _newElement('li', { class: (i == 0) ? 'active' : '' });
        var link = _newElement('a', { href: '#', 'data-page': num, html: num });

        li.appendChild(link);
        _this.links.push(li);
      });

      this.renderPager();

      if (this.initialised) {
        this.tableContainer.style.height = null;
        if (this.options.fixedHeight) {
          this.containerRect = this.tableContainer.getBoundingClientRect();
          this.tableContainer.style.height = this.containerRect.height + 'px';
        }
      }
    },

    refresh: function () {
      console.log('refresh :>> ', refresh);
      this.searchInput.value = '';
      this.searching = false;
      this.update();

      this.trigger("datatable.refresh");
    },

    /* Render the pager when truncation is allowed */
    renderPager: function () {
      console.log('renderPager :>> ');
      var _this = this;

      _each(this.paginators, function (i, p) {
        if (_this.isIE) {
          while (p.hasChildNodes()) {
            p.removeChild(p.firstChild);
          }
        } else {
          p.innerHTML = '';
        }
      });

      if (this.pages.length <= 1) return;

      var frag = _newFragment(), inactive = _this.options.hideNavs ? 'hidden' : 'disabled';

      // prev button
      if (_this.options.nextPrev) {
        frag.appendChild(_button('prev', _this.onFirstPage ? inactive : ''));
      }

      var pager = this.links;

      if (this.options.truncatePager) {
        // truncate the links
        pager = _truncate(this.links, this.currentPage, this.pages.length, this.options.pagerDelta);
      }

      // active page link
      _addClass(this.links[this.currentPage - 1], 'active');

      // append the links
      _each(pager, function (i, p) {
        _removeClass(p, 'active');
        frag.appendChild(p);
      });

      _addClass(this.links[this.currentPage - 1], 'active');

      // next button
      if (_this.options.nextPrev) {
        frag.appendChild(_button('next', _this.onLastPage ? inactive : ''));
      }


      // append the fragment
      switch (this.options.navPosition) {
        case 'top':
        case 'bottom':
          this.paginators[0].appendChild(frag);
          break;

        case 'both':
          this.paginators[0].appendChild(frag);

          this.paginators[1].innerHTML = this.paginators[0].innerHTML;
          break;
      }

      function _button(dir, cn) {
        var li = _newElement('li', { class: cn }),
          a = _newElement('a', { href: '#', 'data-page': dir, html: dir == 'prev' ? _this.options.prevText : _this.options.nextText });
        li.appendChild(a);
        return li;
      }
    },

    /* Perform the sorting */
    sortItems: function (e) {
      console.log('sortItems :>> ', sortItems);
      var _this = this, target = e.target;
      var dir;
      var rows = !!_this.searching ? _this.searchRows : _this.rows;
      var alpha = [];
      var numeric = [];
      var a = 0;
      var n = 0;
      var th = target.parentNode;

      _each(rows, function (i, tr) {
        var cell = tr.cells[th.idx];
        var content = cell.textContent ? cell.textContent : cell.innerText;
        var num = content.replace(/(\$|\,|\s)/g, "");

        if (parseFloat(num) == num) {
          numeric[n++] = { value: Number(num), row: tr }
        } else {
          alpha[a++] = { value: content, row: tr }
        }
      });


      /* Sort according to direction (ascending or descending) */
      var col = [], top, bottom;
      if (_hasClass(th, "asc")) {
        top = _sort(alpha, -1); bottom = _sort(numeric, -1); dir = 'descending';
        _removeClass(th, 'asc');
        _addClass(th, 'desc');
      } else {
        top = _sort(numeric, 1); bottom = _sort(alpha, 1); dir = 'ascending';
        _removeClass(th, 'desc');
        _addClass(th, 'asc');
      }

      /* Clear asc/desc class names from the last sorted column's th if it isn't the same as the one that was just clicked */
      if (this.lastTh && th != this.lastTh) {
        _removeClass(this.lastTh, 'desc');
        _removeClass(this.lastTh, 'asc');
      }

      this.lastTh = th;

      /* Reorder the table */
      var rows = top.concat(bottom);

      if (!!_this.searching) {
        _this.searchRows = [];

        _each(rows, function (i, tr) {
          _this.searchRows.push(tr['row']);
        });
      } else {
        _this.rows = [];

        _each(rows, function (i, tr) {
          _this.rows.push(tr['row']);
        });
      }

      _this.sortOrder = dir;

      _this.update(e);
      _this.trigger('datatable.sort');
    },

    clear: function () {
      console.log('ui-icon-circle-triangle-w');
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
  };

  return Plugin;
}));