(function() {
  var Grid = function(rows, cols, canvas) {
    this.rows      = rows
    this.cols      = cols
    this.canvas    = canvas
    this.container = document.createElement('table')
    this.path      = []
    this.cells     = []
  }

  Grid.prototype.render = function() {
    createDOM.call(this)

    this.path = createPath.call(this)

    this.path.forEach(function(cell) {
      cell.setType(GridCell.TYPES.PATH)
    })
  }

  // private

  var createDOM = function() {
    var self = this

    for(var i = 0; i < this.rows; i++) {
      var tr    = document.createElement('tr')
        , cells = []

      for(var j = 0; j < this.cols; j++) {
        var cell = new GridCell(self)

        cells.push(cell)
        tr.appendChild(cell.getElement())
      }

      this.container.appendChild(tr)
      this.cells.push(cells)
    }

    this.canvas.appendChild(this.container)
  }

  var createPath = function() {
    var indexes = getPathCellIndexes.call(this)
      , cells   = []
      , self    = this

    indexes.forEach(function(col, x) {
      col.forEach(function(y) {
        var cell = getCell.call(self, x, y)
        cells.push(cell)
      })
    })

    return cells
  }

  var getPathCellIndexes = function() {
    var indexes      = []
      , lastWayPoint = null

    for(var colIndex = 0; colIndex < this.cols; colIndex++) {
      var cells = []
        , start = (lastWayPoint !== null) ? lastWayPoint : (~~(Math.random() * this.rows))
        , end   = ~~(Math.random() * this.rows)

      if(colIndex % 2 === 0) {
        cells.push(start)
        lastWayPoint = start
      } else {
        if(start === end) {
          cells.push(start)
        } else {
          for(var i = start; i !== end; (start > end) ? i-- : i++) {
            cells.push(i)
          }
          cells.push(i)
        }

        lastWayPoint = end
      }

      indexes.push(cells)
    }

    return indexes
  }

  var getCell = function(x, y) {
    var rows = this.container.querySelectorAll('tr')
      , row  = rows[y]

    return row.querySelectorAll('td')[x].cell
  }

  window.Grid = Grid
})()
