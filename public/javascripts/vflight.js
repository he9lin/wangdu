var host = window.location.hostname;
//document.write('<link href="http://www.variflight.com/embed/css/'+'www.qmtrip.com'+'.css" rel="stylesheet" type="text/css" />');
var WebService = new Object();

WebService.Browser = {
    ie: /msie/.test(window.navigator.userAgent.toLowerCase()),
    moz: /gecko/.test(window.navigator.userAgent.toLowerCase()),
    opera: /opera/.test(window.navigator.userAgent.toLowerCase())
};

WebService.$ = function(s)
{
    return (typeof s == 'object') ? s: document.getElementById(s);
};

WebService.JsLoader = {
    load: function(sUrl, fCallback)
    {
        var _script = document.createElement('script');
        _script.setAttribute('type', 'text/javascript');
        _script.setAttribute('src', sUrl);
        //_script.setAttribute('src', sUrl+'?='+Math.random()); 
        _script.setAttribute('charset','gb2312'); 

        document.getElementsByTagName('head')[0].appendChild(_script);

        if (WebService.Browser.ie)
        {
            _script.onreadystatechange = function()
            {
                if (this.readyState=='loaded' || this.readyState=='complete')
                {
                    fCallback();
                }
            };
        }
        else if (WebService.Browser.moz)
        {
            _script.onload = function()
            {
                fCallback();
            };
        }
        else
        {
            fCallback();
        }
    }
};

WebService.Cookie = {
    set: function(name, value, expires, path, domain)
    {
        if (typeof expires == "undefined")
        {
            expires = new Date(new Date().getTime() + 365*24*3600*100);
        }

        document.cookie = name + "=" + escape(value) +
            ((expires) ? "; expires=" + expires.toGMTString() : "") +
            ((path) ? "; path=" + path : "; path=/") +
            ((domain) ? "; domain=" + domain : "");
    },

    get: function(name)
    {
        var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));

        if (arr != null)
        {
            return unescape(arr[2]);
        
        }

        return null;
    },

    clear: function(name, path, domain)
    {
        if (this.get(name))
        {
            document.cookie = name + "=" +
                ((path) ? "; path=" + path : "; path=/") +
                ((domain) ? "; domain=" + domain : "") +
                ";expires=Fri, 02-Jan-1970 00:00:00 GMT";
        }
    }
};

WebService.Flights = {
    defaultCity: "PEK",
    city: {
        "北京市": {
            "_": "PEK",
            "北京市": "PEK"
        },
        "上海市": {
            "_": "SHA",
            "上海市": "SHA"
        },
        "天津市": {
            "_": "TSN",
            "天津市": "TSN",
            "塘沽区": "TSN"
        },
        "重庆市" : {
            "_": "CKG",
            "奉节区": "CKG",
            "重庆市": "CKG",
            "涪陵区": "CKG"
        },
        "香港": {
            "_": "HKG",
            "香港": "HKG"
        },
        "澳门": {
            "_": "MFM",
            "澳门": "MFM"
        },
        "台湾省": {
            "_": "TSA",
            "台北市": "TSA"
        },
        "云南省": {
            "_": "KMG",
            "昭通市": "ZAT",
            "丽江市": "LJG",
            "曲靖市": "KMG",
            "保山市": "BSD",
            "大理州": "DLU",
            "楚雄州": "KMG",
            "昆明市": "KMG",
            "瑞丽市": "KMG",
            "玉溪市": "KMG",
            "临沧市": "LNJ",
            "思茅市": "SYM",
            "红河州": "KMG",
            "文山州": "WNH",
            "西双版纳州": "JHG",
            "德宏州": "KMG",
            "怒江州": "KMG",
            "迪庆州": "DIG"
        },
        "内蒙古": {
            "_": "HET",
            "呼伦贝尔市": "NZH",
            "兴安盟": "HET",
            "锡林郭勒盟": "XIL",
            "巴彦淖尔市":"HET",
            "包头市": "BAV",
            "呼和浩特市": "HET",
            "锡林浩特市": "XIL",
            "通辽市": "TGO",
            "赤峰市": "CIF",
            "乌海市": "WUA",
            "鄂尔多斯市": "DSN",
            "乌兰察布市": "HET"
        },
        "吉林省": {
            "_": "CGQ",
            "辽源市": "CGQ",
            "通化市": "CGQ",
            "白城市": "CGQ",
            "松原市": "CGQ",
            "长春市": "CGQ",
            "吉林市": "JIL",
            "桦甸市": "CGQ",
            "延边州": "CGQ",
            "集安市": "CGQ",
            "白山市": "CGQ",
            "四平市": "CGQ"
        },
        "四川省": {
            "_": "CTU",
            "甘孜州": "CTU",
            "阿坝州": "CTU",
            "成都市": "CTU",
            "绵阳市": "CTU",
            "雅安市": "CTU",
            "峨眉山市": "CTU",
            "乐山市": "CTU",
            "宜宾市": "CTU",
            "巴中市": "CTU",
            "达州市": "CTU",
            "遂宁市": "CTU",
            "南充市": "CTU",
            "泸州市": "CTU",
            "自贡市": "CTU",
            "攀枝花市": "CTU",
            "德阳市": "CTU",
            "广元市": "CTU",
            "内江市": "CTU",
            "广安市": "CTU",
            "眉山市": "CTU",
            "资阳市": "CTU",
            "凉山州": "CTU"
        },
        "宁夏": {
            "_": "INC",
            "石嘴山市": "INC",
            "银川市": "INC",
            "吴忠市": "INC",
            "固原市": "INC"
        },
        "安徽省": {
            "_": "HFE",
            "淮南市": "HFE",
            "马鞍山市": "HFE",
            "淮北市": "HFE",
            "铜陵市": "HFE",
            "滁州市": "HFE",
            "巢湖市": "HFE",
            "池州市": "HFE",
            "宣城市": "HFE",
            "亳州市": "HFE",
            "宿州市": "HFE",
            "阜阳市": "FUG",
            "六安市": "HFE",
            "蚌埠市": "HFE",
            "合肥市": "HFE",
            "芜湖市": "HFE",
            "安庆市": "AQG",
            "黄山市": "TXN"
        },
        "山东省": {
            "_": "TNA",
            "德州市": "TNA",
            "滨州市": "TNA",
            "烟台市": "YNT",
            "聊城市": "TNA",
            "济南市": "TNA",
            "泰安市": "TNA",
            "淄博市": "TNA",
            "潍坊市": "TNA",
            "青岛市": "TAO",
            "济宁市": "TNA",
            "日照市": "TNA",
            "泰山市": "TNA",
            "枣庄市": "TNA",
            "东营市": "TNA",
            "威海市": "TNA",
            "莱芜市": "TNA",
            "临沂市": "TNA",
            "菏泽市": "TNA"
        },
        "山西省": {
            "_": "TYN",
            "长治市": "CIH",
            "晋中市": "TYN",
            "朔州市": "TYN",
            "大同市": "DAT",
            "吕梁市": "TYN",
            "忻州市": "TYN",
            "太原市": "TYN",
            "阳泉市": "TYN",
            "临汾市": "TYN",
            "运城市": "TYN",
            "晋城市": "TYN",
            "五台山市": "TYN"
        },
        "广东省": {
            "_": "CAN",
            "南雄市": "CAN",
            "韶关市": "CAN",
            "清远市": "CAN",
            "梅州市": "CAN",
            "肇庆市": "CAN",
            "广州市": "CAN",
            "河源市": "CAN",
            "汕头市": "CAN",
            "深圳市": "SZX",
            "汕尾市": "CAN",
            "湛江市": "CAN",
            "阳江市": "CAN",
            "茂名市": "CAN",
            "佛冈市": "CAN",
            "梅县市": "CAN",
            "电白市": "CAN",
            "高要市": "CAN",
            "珠海市": "CAN",
            "佛山市": "CAN",
            "江门市": "CAN",
            "东莞市": "CAN",
            "中山市": "CAN",
            "潮州市": "CAN",
            "揭阳市": "CAN",
            "云浮市": "CAN"
        },
        "广西": {
            "_": "NNG",
            "桂林市": "KWL",
            "河池市": "NNG",
            "柳州市": "NNG",
            "百色市": "AEB",
            "贵港市": "NNG",
            "梧州市": "NNG",
            "南宁市": "NNG",
            "钦州市": "NNG",
            "北海市": "BHY",
            "防城港市": "NNG",
            "玉林市": "NNG",
            "贺州市": "NNG",
            "来宾市": "NNG",
            "崇左市": "NNG"
        },
        "新疆": {
            "_": "URC",
            "昌吉州": "URC",
            "克孜勒苏柯尔克孜自治州": "URC",
            "伊犁州": "URC",
            "阿拉尔市": "URC",
            "克拉玛依市": "URC",
            "博尔塔拉州": "URC",
            "乌鲁木齐市": "URC",
            "吐鲁番市": "URC",
            "阿克苏市": "URC",
            "石河子市": "URC",
            "喀什市": "URC",
            "和田市": "URC",
            "哈密市": "URC",
            "奇台市": "URC"
        },
        "江苏省": {
            "_": "NKG",
            "无锡市": "NKG",
            "苏州市": "NKG",
            "盱眙市": "NKG",
            "赣榆市": "NKG",
            "东台市": "NKG",
            "高邮市": "NKG",
            "镇江市": "NKG",
            "泰州市": "NKG",
            "宿迁市": "NKG",
            "徐州市": "NKG",
            "连云港市": "NKG",
            "淮安市": "NKG",
            "南京市": "NKG",
            "扬州市": "NKG",
            "盐城市": "NKG",
            "南通市": "NKG",
            "常州市": "NKG"
        },
        "江西省": {
            "_": "KHN",
            "庐山市": "KHN",
            "玉山市": "KHN",
            "贵溪市": "KHN",
            "广昌市": "KHN",
            "萍乡市": "KHN",
            "新余市": "KHN",
            "宜春市": "KHN",
            "赣州市": "KHN",
            "九江市": "KHN",
            "景德镇市": "KHN",
            "南昌市": "KHN",
            "鹰潭市": "KHN",
            "上饶市": "KHN",
            "抚州市": "KHN"
        },
        "河北省": {
            "_": "SJW",
            "邯郸市": "SJW",
            "衡水市": "SJW",
            "石家庄市": "SJW",
            "邢台市": "SJW",
            "张家口市": "SJW",
            "承德市": "SJW",
            "秦皇岛市": "SJW",
            "廊坊市": "SJW",
            "唐山市": "SJW",
            "保定市": "SJW",
            "沧州市": "SJW"
        },
        "河南省": {
            "_": "CGO",
            "安阳市": "CGO",
            "三门峡市": "CGO",
            "郑州市": "CGO",
            "南阳市": "CGO",
            "周口市": "CGO",
            "驻马店市": "CGO",
            "信阳市": "CGO",
            "开封市": "CGO",
            "洛阳市": "CGO",
            "平顶山市": "CGO",
            "焦作市": "CGO",
            "鹤壁市": "CGO",
            "新乡市": "CGO",
            "濮阳市": "CGO",
            "许昌市": "CGO",
            "漯河市": "CGO",
            "商丘市": "CGO",
            "济源市": "CGO"
        },
        "浙江省": {
            "_": "HGH",
            "湖州市": "HGH",
            "嵊州市": "HGH",
            "平湖市": "HGH",
            "石浦市": "HGH",
            "宁海市": "HGH",
            "洞头市": "HGH",
            "舟山市": "HGH",
            "杭州市": "HGH",
            "嘉兴市": "HGH",
            "定海市": "HGH",
            "金华市": "HGH",
            "绍兴市": "HGH",
            "宁波市": "HGH",
            "衢州市": "HGH",
            "丽水市": "HGH",
            "台州市": "HGH",
            "温州市": "HGH"
        },
        "海南省": {
            "_": "HAK",
            "海口市": "HAK",
            "三亚市": "HAK",
            "屯昌市": "HAK",
            "琼海市": "HAK",
            "儋州市": "HAK",
            "文昌市": "HAK",
            "万宁市": "HAK",
            "东方市": "HAK",
            "澄迈市": "HAK",
            "定安市": "HAK",
            "临高市": "HAK",
            "白沙黎族自治县": "HAK",
            "乐东黎族自治县": "HAK",
            "陵水黎族自治县": "HAK",
            "保亭黎族苗族自治县": "HAK",
            "琼中黎族苗族自治县": "HAK"
        },
        "湖北省": {
            "_": "WUH",
            "襄樊市": "WUH",
            "荆门市": "WUH",
            "黄冈市": "WUH",
            "恩施州": "WUH",
            "武汉市": "WUH",
            "黄石市": "WUH",
            "鄂州市": "WUH",
            "孝感市": "WUH",
            "咸宁市": "WUH",
            "随州市": "WUH",
            "仙桃市": "WUH",
            "天门市": "WUH",
            "潜江市": "WUH",
            "神农架市": "WUH"
        },
        "湖南省": {
            "_": "CSX",
            "张家界市": "CSX",
            "岳阳市": "CSX",
            "怀化市": "CSX",
            "长沙市": "CSX",
            "邵阳市": "CSX",
            "益阳市": "CSX",
            "郴州市": "CSX",
            "桑植市": "CSX",
            "沅陵市": "CSX",
            "南岳市": "CSX",
            "株洲市": "CSX",
            "湘潭市": "CSX",
            "衡阳市": "CSX",
            "娄底市": "CSX",
            "常德市": "CSX"
        },
        "甘肃省": {
            "_": "LHW",
            "张掖市": "LHW",
            "金昌市": "LHW",
            "武威市": "LHW",
            "兰州市": "LHW",
            "白银市": "LHW",
            "定西市": "LHW",
            "平凉市": "LHW",
            "庆阳市": "LHW",
            "甘南市": "LHW",
            "临夏市": "LHW",
            "天水市": "LHW",
            "嘉峪关市": "LHW",
            "酒泉市": "LHW",
            "陇南市": "LHW"
        },
        "福建省": {
            "_": "FOC",
            "莆田市": "FOC",
            "浦城市": "FOC",
            "南平市": "FOC",
            "宁德市": "FOC",
            "福州市": "FOC",
            "龙岩市": "FOC",
            "三明市": "FOC",
            "泉州市": "FOC",
            "漳州市": "FOC",
            "厦门市": "XMN"
        },
        "西藏": {
            "_": "LXA",
            "那曲地区": "LXA",
            "日喀则地区": "LXA",
            "拉萨市": "LXA",
            "山南地区": "LXA",
            "阿里地区": "LXA",
            "昌都地区": "LXA",
            "林芝地区": "LXA"
        },
        "贵州省": {
            "_": "KWE",
            "毕节市": "KWE",
            "遵义市": "KWE",
            "铜仁市": "KWE",
            "安顺市": "KWE",
            "贵阳市": "KWE",
            "黔西南州": "KWE",
            "六盘水市": "KWE"
        },
        "辽宁省": {
            "_": "SHE",
            "葫芦岛市": "SHE",
            "盘锦市": "SHE",
            "辽阳市": "SHE",
            "铁岭市": "SHE",
            "阜新市": "SHE",
            "朝阳市": "SHE",
            "锦州市": "SHE",
            "鞍山市": "SHE",
            "沈阳市": "SHE",
            "本溪市": "SHE",
            "抚顺市": "SHE",
            "营口市": "SHE",
            "丹东市": "SHE",
            "瓦房店市": "SHE",
            "大连市": "DLC"
        },
        "陕西省": {
            "_": "XIY",
            "榆林市": "XIY",
            "延安市": "XIY",
            "西安市": "XIY",
            "渭南市": "XIY",
            "汉中市": "XIY",
            "商洛市": "XIY",
            "安康市": "XIY",
            "铜川市": "XIY",
            "宝鸡市": "XIY",
            "咸阳市": "XIY"
        },
        "青海": {
            "_": "XNN",
            "海北州": "XNN",
            "海南州": "XNN",
            "西宁市": "XNN",
            "玉树州": "XNN",
            "黄南州": "XNN",
            "果洛州": "XNN",
            "海西州": "XNN",
            "海东市": "XNN"
        },
        "黑龙江省": {
            "_": "HRB",
            "大兴安岭地区": "HRB",
            "黑河市": "HRB",
            "齐齐哈尔市": "HRB",
            "绥化市": "HRB",
            "鹤岗市": "HRB",
            "佳木斯市": "HRB",
            "伊春市": "HRB",
            "双鸭山市": "HRB",
            "哈尔滨市": "HRB",
            "鸡西市": "HRB",
            "漠河市": "HRB",
            "大庆市": "HRB",
            "七台河市": "HRB",
            "牡丹江市": "HRB",
            "绥芬河市": "HRB"
        }
    },
    _print: function(province, city, conainter)
    {
        if (typeof this.city[province] != "undefined")
        {
            if (typeof this.city[province][city]  != "undefined")
            {
                var _city_ = this.city[province][city];
            }
            else if (typeof this.city[province]["_"]  != "undefined")
            {
                var _city_ = this.city[province]["_"];
            }
            else
            {
                var _city_ = this.defaultCity;
            }
        }
        else
        {
            var _city_ = this.defaultCity;
        }
        WebService.JsLoader.load("http://www.variflight.com/embed/feeyoipto.asp?id="+_UID_+"&airport="+_city_, function()
        {
            try
            {
                WebService.$(conainter).innerHTML =  _vflight_ ;
    
            }
            catch (e)
            {
            }
            dis();
        });
    },  

    print: function(conainter)
    {
        var ok = function()
        {
            var province = null;
            var city = null;
            var ipAddress = WebService.Cookie.get("Clients_IPAddress");

            if (ipAddress != null)
            {
                try
                {
                    var ipAddressArr = ipAddress.split(",");
                    province = ipAddressArr[0];
                    city =ipAddressArr[1];
                }
                catch (e)
                {
                }
            }

            WebService.Flights._print(province, city, conainter);
        };
          
        if (!WebService.Cookie.get("Clients_IPAddress"))
        {
            WebService.JsLoader.load("http://fw.qq.com:80/ipaddress", function()
            {
                if (typeof IPData != "undefined")
                {
                    WebService.Cookie.set('Clients_IPAddress', IPData[2]+','+IPData[3]);
                    ok();
                }
            });
        }
        else
        {
            ok();
        }         
    }
};

function dis(){
  var a1=document.getElementById('container1'); 
  var height=document.getElementById('cheight').value;
  var time=document.getElementById('settime').value;
  mm1=window.setInterval(
    function(){scrollup(a1,height,0);},time); //4000代表间隔多长时间，包括滚动的时间。60代表滚动的高度。 
    a1.onmouseover=function() { clearInterval(mm1) } 
    a1.onmouseout=function() { mm1=setInterval(function(){scrollup(a1,height,0);},time ) 
} //同上 

function scrollup(a1,b1,e1){ 
  if(b1<=e1){ 
    var w1=a1.firstChild.cloneNode(true); 
      a1.removeChild(a1.firstChild); 
      a1.appendChild(w1); 
      w1.style.marginTop=a1.firstChild.style.marginTop='1px'; 
    } 
    else{ 
      var y1=3,e1=e1+y1,l1=(e1>=b1?e1-b1:0); 
      a1.firstChild.style.marginTop=-e1+l1+'px'; 
      window.setTimeout(function(){scrollup(a1,b1,e1-l1)},150); 
    } 
  } 
}