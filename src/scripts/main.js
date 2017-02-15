'use strict';

var Sortable = (function() {

    var _tables = document.getElementsByTagName('table'),
        _isRun = false,
        _orderByAsc = false,
        _currSortKey;

    var makeSortable = function(_table) {
        var _theadCells = _table.tHead.rows[0].cells;

        for (var i = 0; i < _theadCells.length; i ++) {
            _theadCells[i].sortingFunction = setSortingFunction(_table, i);

            // set current headers sorting index and parent table
            _theadCells[i]._columnIndex = i;
            _theadCells[i]._tbody = _table.tBodies[0];
        }
        
        sortRows(_theadCells[8]);
    }

    var addClickListener = function(_theadCell) {
        _theadCell.addEventListener('click', chooseSortMethod, false);
    }

    var chooseSortMethod = function(e) {
        var _targetHeader = e.target;

        var _thead = _targetHeader.parentNode,
            _col = _targetHeader._columnIndex,
            _rows = _targetHeader._tbody.rows,
            _rowsArr = [];

        _currSortKey = _targetHeader.id;

        if (_targetHeader.classList.contains('sortable--sorted') || _targetHeader.classList.contains('sortable--sorted-reverse')) {
            _orderByAsc = !_orderByAsc;
            
            setSortingClasses(_targetHeader);
            // just reverse rows if already sorted since it's faster
            reverseRows(_targetHeader);
        } else {
            // set initial states
            _orderByAsc = true;
            resetSortingClasses(_thead);
            _targetHeader.classList.add('sortable--sorted');

            sortRows(_targetHeader);
        }
    }

    var setSortingClasses = function(_targetHeader) {
        if (_orderByAsc) {
            _targetHeader.classList.remove('sortable--sorted-reverse');
            _targetHeader.classList.add('sortable--sorted');
        } else {
            _targetHeader.classList.remove('sortable--sorted');
            _targetHeader.classList.add('sortable--sorted-reverse');
        }
    }

    var sortRows = function(_targetHeader) {
        var _col = _targetHeader._columnIndex,
            _rows = _targetHeader._tbody.rows,
            _rowsArr = [];

        // build array to sort
        for (var i = 0; i < _rows.length; i++) {
            _rowsArr[_rowsArr.length] = [getInnerText(_rows[i].cells[_col]), _rows[i]];
        }

        // sort by string or int
        _rowsArr.sort(_targetHeader.sortingFunction);

        // append rows to tbody
        for (var j = 0; j < _rowsArr.length; j++) {
            _targetHeader._tbody.appendChild(_rowsArr[j][1]);
        }

        // reset sorting array
        _rowsArr = [];

        reverseRows(_targetHeader)
    }

    var reverseRows = function(_targetHeader) {
        var _tbody = _targetHeader._tbody,
            _revRows = [],
            _index;

        for (var i = 0; i < _tbody.rows.length; i++) {
            _revRows[_revRows.length] = _tbody.rows[i];
        }

        _index = _revRows.length-1;

        for (var i = _revRows.length-1; i >= 0; i--) {
            _tbody.appendChild(_revRows[i]);
        }
    }

    var resetSortingClasses = function(_thead) {
        for (var i = 0; i < _thead.childNodes.length; i++) {
            if (_thead.childNodes[i].nodeType === 1) {
                _thead.childNodes[i].classList.remove('sortable--sorted', 'sortable--sorted-reverse');
            }
        }
    }

    var getInnerText = function(node) {
        if (!node) return '';

        // strip leading/trailing whitespace
        if (typeof node.textContent != 'undefined') {
            return node.textContent.replace(/^\s+|\s+$/g, '');
        } else if (typeof node.innerText != 'undefined') {
            return node.innerText.replace(/^\s+|\s+$/g, '');
        } else if (typeof node.text != 'undefined') {
            return node.text.replace(/^\s+|\s+$/g, '');
        }
    }

    var setSortingFunction = function(_table, _col) {
        var _tBodyRows = _table.tBodies[0].rows;

        for (var i = 0; i < _tBodyRows.length; i++) {
            if (!_tBodyRows[i].classList.contains('js-no-sorting')) {
                var _cellText = getInnerText(_tBodyRows[i].cells[_col]);
            }

            if (_cellText !== '') {
                if (_cellText.match(/^-?[£$¤]?[\d,.]+%?$/)) {
                    return sortingFunctions.sortNumeric;
                } else {
                    return sortingFunctions.sortAlpha;
                }
            }
        }
    }

    var sortingFunctions = {
        sortNumeric: function(a,b) {
            var aa = parseFloat(a[0].replace(/[^0-9.-]/g,''));
            if (isNaN(aa)) aa = 0;
            var bb = parseFloat(b[0].replace(/[^0-9.-]/g,''));
            if (isNaN(bb)) bb = 0;
            return aa-bb;
        },
        sortAlpha: function(a,b) {
            if (a[0]==b[0]) return 0;
            if (a[0]<b[0]) return -1;
            return 1;
        }
    }

    return {
        init: function() {
            if (_tables.length > 0) {
                if (_isRun === true) return;
                _isRun = true;

                for (var i = 0; i < _tables.length; i++) {
                    makeSortable(_tables[i]);
                }
            }
        }
     }

})()

Sortable.init();