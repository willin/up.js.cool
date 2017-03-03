/* global user,users,echarts */
(function () { 
  var domain = location.origin + '/';
  var request = new XMLHttpRequest();
  var myChart = echarts.init(document.getElementById('chart'));
  var tip = document.getElementById('tip');
   
  function get() {
    request.open('GET', '/' + user + '/data', true);
    request.send();
  }
  
  request.onerror = function () {
    setTimeout(get, 60000);
  };

  function updateUser() {
    // User List
    var html = '';
    for (var u in users) {
      html += '<li class="pure-menu-item"><a href="' + domain + users[u] + '" class="pure-menu-link">' + users[u] +
        ' <img src="' + domain + users[u] + '/icon"></a></li>';
    }
    document.getElementById('users').innerHTML = html;
    // User Content
    document.getElementById('status').src = domain + user + '/icon';
  }

  request.onload = function () {
    setTimeout(get, 60000);
    if (request.status >= 200 && request.status < 400) { // Success! 
      var result = JSON.parse(request.responseText);
      var data = result.data;
      updateUser();
      tip.className = result.status;
      switch (result.status) {
        case 'busy': {
          tip.innerHTML = '忙碌中，请勿打扰';
          break;
        }
        case 'online': {
          tip.innerHTML = '在线';
          break;
        }
        case 'free': {
          tip.innerHTML = '在线，清闲';
          break;
        }  
        default: {
          tip.innerHTML = '离线';
        }
      }
      myChart.setOption({
        series: [{
          data: data.map(x => ({
            name: new Date((x.date - 28800) * 1000),
            value: [
              new Date((x.date - 28800) * 1000),
              x.efficiency
            ]
          }))
        }]
      });
    }
  };

  get();
  updateUser();

  // Chart
  // 指定图表的配置项和数据
  var option = {
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        params = params[0];
        var date = new Date(params.name);
        return date.getHours() + ':' + date.getMinutes() + ' : ' + params.value[1] + '%';
      },
      axisPointer: {
        animation: false
      }
    },
    xAxis: {
      type: 'time',
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      max: 100,
      min: 0,
      splitLine: {
        show: false
      }
    },
    visualMap: {
      show: false,
      pieces: [{
        gte: 0,
        lte: 50,
        color: '#4b7cde'
      }, {
        gt: 50,
        lt: 90,
        color: '#98cf44' 
      }, {
        gte: 90,
        lte: 100,
        color: '#f06'
      }],
      outOfRange: {
        color: '#333'
      }
    },
    series: [{
      type: 'line',
      showSymbol: false,
      hoverAnimation: false,
      smooth: true,
      symbol: 'circle',
      symbolSize: 5,
      lineStyle: {
        normal: {
          width: 1
        }
      }
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);

  // Styles
  (function (window, document) {

    var layout = document.getElementById('layout'),
      menu = document.getElementById('menu'),
      menuLink = document.getElementById('menuLink'),
      content = document.getElementById('main');

    function toggleClass(element, className) {
      var classes = element.className.split(/\s+/),
        length = classes.length,
        i = 0;

      for (; i < length; i++) {
        if (classes[i] === className) {
          classes.splice(i, 1);
          break;
        }
      }
      // The className is not found
      if (length === classes.length) {
        classes.push(className);
      }

      element.className = classes.join(' ');
    }

    function toggleAll(e) {
      var active = 'active';

      e.preventDefault();
      toggleClass(layout, active);
      toggleClass(menu, active);
      toggleClass(menuLink, active);
    }

    menuLink.onclick = function (e) {
      toggleAll(e);
    };

    content.onclick = function (e) {
      if (menu.className.indexOf('active') !== -1) {
        toggleAll(e);
      }
    };

  } (this, this.document));
})(this);
