const api = {
    handleDate: (dateTimeStamp, flag) => {
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var result = '';
        var now = new Date().getTime();
        var diffValue = now - Date.parse(dateTimeStamp);
        if (diffValue < 0) {
          console.log("时间不对劲,服务器创建时间与当前时间不同步");
          return result = "刚刚";
        }
        var dayC = diffValue / day;
        var hourC = diffValue / hour;
        var minC = diffValue / minute;
        if (parseInt(dayC) > 30) {
          result = "" + format(dateTimeStamp,flag)
        }else if(parseInt(dayC) > 1) {
          result = "" + parseInt(dayC) + "天前";
        }else if (parseInt(dayC) == 1) {
          result = "昨天";
        } else if (hourC >= 1) {
          result = "" + parseInt(hourC) + "小时前";
        } else if (minC >= 5) {
          result = "" + parseInt(minC) + "分钟前";
        } else
          result = "刚刚";
        return result;
      }
};
const format = (dateTimeStamp,flag) => {
    if(flag) {
        var date = new Date(Date.parse(dateTimeStamp.replace(/-/gi,"/")));
        var mouth = date.getMonth() + 1;
        if(mouth < 10) {
        mouth = "0" + mouth;
        }
        var day = date.getDate()
        if(day < 10) {
        day = "0" + day;
        }
        var result1 = date.getFullYear() + "年" + mouth + "月" + day + "日"; 
    } else {
        var result1 = dateTimeStamp;
    }
    return result1;
  };
export default api;