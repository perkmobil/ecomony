app.directive('chartComponent', [ '$window', function ($window) {

  // constants
  var margin = 20,
//    width = 500,
//    height = 500 - .5 - margin,
  
    colors = {
		  SAVING: d3.interpolateRgb("#428BCA", "#54B2FF"),
		  INCOME: d3.interpolateRgb("#5CB85C", "#7FFF7F"),
		  EXPENSE: d3.interpolateRgb("#D9534F", "#FF7F7F")
  	};

  return {
    restrict: 'E',
    scope: {
      val: '='
    },
    link: function (scope, element, attrs) {

      // set up initial svg object
      var vis = d3.select(element[0])
        .append("svg")
          .attr("width", '100%')
          .attr("height", '100%');

      
      
      var render = function (newVal, oldVal) {
      	var width = $window.innerWidth,
	  	height = $window.innerHeight;
	
      if(!width) {
    	  return;
      }
      	
    // clear the elements inside of the directive
    vis.selectAll('*').remove();

    // if 'val' is undefined, exit
    if (!newVal) {
      return;
    }

    // Based on: http://mbostock.github.com/d3/ex/stack.html
    var n = newVal.length, // number of layers
        m = newVal[0].length, // number of samples per layer
        data = d3.layout.stack()(newVal);

    var mx = m,
        my = d3.max(data, function(d) {
          return d3.max(d, function(d) {
            return d.y0 + d.y;
          });
        }),
        mz = d3.max(data, function(d) {
          return d3.max(d, function(d) {
            return d.y;
          });
        }),
        x = function(d) { return d.x * width / mx; },
        y0 = function(d) { return height - d.y0 * height / my; },
        y1 = function(d) { return height - (d.y + d.y0) * height / my; },
        y2 = function(d) { return d.y * height / mz; }; // or `my` not rescale

    // Layers for each color
    // =====================

    var layers = vis.selectAll("g.layer")
        .data(data)
      .enter().append("g")
        .style("fill", function(d, i) {
          return colors[d[0].type](i / (n - 1));
        })
        .attr("class", "layer");

    // Bars
    // ====

    var bars = layers.selectAll("g.bar")
        .data(function(d) { return d; })
      .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function(d) {
          return "translate(" + x(d) + ",0)";
        });

    bars.append("rect")
        .attr("width", x({x: .9}))
        .attr("x", 0)
        .attr("y", height)
        .attr("height", 0)
      .transition()
        .delay(function(d, i) { return i * 10; })
        .attr("y", y1)
        .attr("height", function(d) {
          return y0(d) - y1(d);
        });

    // Chart Key
    // =========

    var keyText = vis.selectAll("text.key")
        .data(data)
      .enter().append("text")
        .attr("class", "key")
        .attr("y", function (d, i) {
          return height + 42 + 30*(i%3);
        })
        .attr("x", function (d, i) {
          return 155 * Math.floor(i/3) + 15;
        })
        .attr("dx", 15)
        .attr("dy", ".71em")
        .attr("text-anchor", "left")
        .text(function(d, i) {
          return d[0].description;
        });

    var keySwatches = vis.selectAll("rect.swatch")
        .data(data)
      .enter().append("rect")
        .attr("class", "swatch")
        .attr("width", 20)
        .attr("height", 20)
        .style("fill", function(d, i) {
          return colors[d[0].type](i / (n - 1));
        })
        .attr("y", function (d, i) {
          return height + 36 + 30*(i%3);
        })
        .attr("x", function (d, i) {
          return 155 * Math.floor(i/3);
        });


    // Animate between grouped and stacked
    // ===================================

    function transitionGroup() {
      vis.selectAll("g.layer rect")
        .transition()
          .duration(500)
          .delay(function(d, i) { return (i % m) * 10; })
          .attr("x", function(d, i) { return x({x: .9 * ~~(i / m) / n}); })
          .attr("width", x({x: .9 / n}))
          .each("end", transitionEnd);

      function transitionEnd() {
        d3.select(this)
          .transition()
            .duration(500)
            .attr("y", function(d) { return height - y2(d); })
            .attr("height", y2);
      }
    }

    function transitionStack() {
      vis.selectAll("g.layer rect")
        .transition()
          .duration(500)
          .delay(function(d, i) { return (i % m) * 10; })
          .attr("y", y1)
          .attr("height", function(d) {
            return y0(d) - y1(d);
          })
          .each("end", transitionEnd);

      function transitionEnd() {
        d3.select(this)
          .transition()
            .duration(500)
            .attr("x", 0)
            .attr("width", x({x: .9}));
      }
    }
  };
      
      
      
	scope.getWinHeight = function() {
	      return $window.innerHeight;
	}
	
    scope.$watch(scope.getWinHeight, function (newValue, oldValue) {
        render(scope.data, null);
    }, true);    
      
      
      
      
      
      scope.$watch('val', function (newVal, oldVal) {
    	  render(newVal, oldVal);
      });
    }
  }
}]);