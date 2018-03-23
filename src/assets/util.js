import Vue from 'vue'
import { Message } from 'element-ui'
Vue.component(Message.name, Message)

var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';
function padding(s, len) {
  var len = len - (s + '').length;
  for (var i = 0; i < len; i++) { s = '0' + s; }
  return s;
};
//金额格式化
export const number_format = function(number, decimals, dec_point, thousands_sep) {
  /*
  * 参数说明：
  * number：要格式化的数字
  * decimals：保留几位小数
  * dec_point：小数点符号
  * thousands_sep：千分位符号
  * */
  number = (number + '').replace(/[^0-9+-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
      dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
      s = '',
      toFixedFix = function (n, prec) {
          var k = Math.pow(10, prec);
          return '' + Math.ceil(n * k) / k;
      };

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
      s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

//sessionStorage
export const session = function(key, value){
  if (value === void(0)) {
    var lsVal = sessionStorage.getItem(key);
    if(lsVal && lsVal.indexOf('autostringify-') === 0 ){
      return JSON.parse(lsVal.split('autostringify-')[1]);
    }else{
      return lsVal;
    }
  }else {
    if (typeof(value)==="object" || Array.isArray(value)) {
      value = 'autostringify-' + JSON.stringify(value);
    };
    return sessionStorage.setItem(key, value);
  }
} 

//生成随机数
export const getUUID = function (len) {
  len = len || 6;
  len = parseInt(len, 10);
  len = isNaN(len) ? 6 : len;
  var seed = "0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ";
  var seedLen = seed.length - 1;
  var uuid = "";
  while (len--) {
    uuid += seed[Math.round(Math.random() * seedLen)];
  }
  return uuid;
};
//深拷贝
export const deepcopy = function (source) {
  if (!source) {
    return source;
  }
  let sourceCopy = source instanceof Array ? [] : {};
  for (let item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? deepcopy(source[item]) : source[item];
  }
  return sourceCopy;
};
//菜单数据组织
export const buildMenu = function (array, ckey) {
  let menuData = [];
  let indexKeys = Array.isArray(array) ? array.map((e) => {return e.id}) : [];
  ckey = ckey || 'parent_id';
  array.forEach(function (e, i) {
    //一级菜单
    if (!e[ckey] || (e[ckey]===e.id)) {
      delete e[ckey];
      menuData.push(deepcopy(e)); //深拷贝
    }else if(Array.isArray(indexKeys)){
      //检测ckey有效性
      let parentIndex = indexKeys.findIndex(function(id){
        return id == e[ckey];
      });
      if(parentIndex===-1){
        menuData.push(e);
      }
    }
  });
  let findChildren = function (parentArr) {
    if (Array.isArray(parentArr) && parentArr.length) {
      parentArr.forEach(function (parentNode) {
        array.forEach(function (node) {
          if (parentNode.id === node[ckey]) {
            if (parentNode.children) {
              parentNode.children.push(node);
            } else {
              parentNode.children = [node];
            }
          }
        });
        if (parentNode.children) {
          findChildren(parentNode.children);
        }
      });
    }
  };
  findChildren(menuData);  
  
  return menuData;
}
//日期格式化
export const dateFormat = function (source, ignore_minute) {
  var myDate;
  var separate = '/';
  var minute = '';
  if (source === void(0)) {
    source = new Date();
  }
  if (source) {
    if (source.split) {
      source = source.replace(/\-/g, '/');
    } else if (isNaN(parseInt(source))) {
      source = source.toString().replace(/\-/g, '/');
    } else {
      source = new Date(source);
    }

    if (new Date(source) && (new Date(source)).getDate) {
      myDate = new Date(source);
      if (!ignore_minute) {
        minute = (myDate.getHours() < 10 ? " 0" : " ") + myDate.getHours() + ":" + (myDate.getMinutes() < 10 ? "0" : "") + myDate.getMinutes();
      }
      return myDate.getFullYear() + separate + (myDate.getMonth() + 1) + separate + (myDate.getDate() < 10 ? '0' : '') + myDate.getDate() + minute;
    } else {
      return source.slice(0, 16);
    }
  } else {
    return source
  }
};
//ajax错误处理
export const catchError = function(error) {      
  if (error.data) {
    switch (error.data.status) {
      case 400:
        Vue.prototype.$message({
          message: error.data.message || '请求参数异常',
          type: 'error'
        });
        break;
      case 401:
        Vue.prototype.$message({
          message: error.data.message || '密码错误或账号不存在！',
          type: 'warning',
          onClose: function(){
            location.reload();
          }
        });
        break;
      case 403:
        Vue.prototype.$message({
          message: error.data.message || '无访问权限，请联系企业管理员',
          type: 'warning'
        });
        break;
      default:
        Vue.prototype.$message({
          message: error.data.message || '服务端异常，请联系技术支持',
          type: 'error'
        });
    }
  }
  return Promise.reject(error);
};
//日期格式化
export const formatDate = {
      format: function (date, pattern) {
          pattern = pattern || DEFAULT_PATTERN;
          return pattern.replace(SIGN_REGEXP, function ($0) {
              switch ($0.charAt(0)) {
                  case 'y': return padding(date.getFullYear(), $0.length);
                  case 'M': return padding(date.getMonth() + 1, $0.length);
                  case 'd': return padding(date.getDate(), $0.length);
                  case 'w': return date.getDay() + 1;
                  case 'h': return padding(date.getHours(), $0.length);
                  case 'm': return padding(date.getMinutes(), $0.length);
                  case 's': return padding(date.getSeconds(), $0.length);
              }
          });
      },
      parse: function (dateString, pattern) {
          var matchs1 = pattern.match(SIGN_REGEXP);
          var matchs2 = dateString.match(/(\d)+/g);
          if (matchs1.length == matchs2.length) {
              var _date = new Date(1970, 0, 1);
              for (var i = 0; i < matchs1.length; i++) {
                  var _int = parseInt(matchs2[i]);
                  var sign = matchs1[i];
                  switch (sign.charAt(0)) {
                      case 'y': _date.setFullYear(_int); break;
                      case 'M': _date.setMonth(_int - 1); break;
                      case 'd': _date.setDate(_int); break;
                      case 'h': _date.setHours(_int); break;
                      case 'm': _date.setMinutes(_int); break;
                      case 's': _date.setSeconds(_int); break;
                  }
              }
              return _date;
          }
          return null;
      }
};
export const debounce = function(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}