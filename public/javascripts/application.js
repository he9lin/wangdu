var App = {
  setupAjaxCallbacks: function() {
    $('a[data-remote=true], #form_search_flights').live({
      'ajax:failure' : function(object, xhr, error) {
        $(this).removeAttr('disabled')
				$("#global_loading").dialog('close');
        if (xhr.status == 403) {
					App.popupModalDialog(xhr.responseText);
        }
      },
      
      'ajax:success' : function(object, data, status, xhr) {
        $(this).removeAttr('disabled')
				$("#global_loading").dialog('close');
      },
      
      'ajax:before' : function(xhr) {
        return !($(this).attr('disabled'))
      },
      
      'ajax:loading' : function(xhr) {
        $(this).attr('disabled', 'disabled');
				$("#global_loading").dialog('open');
      }
    })
	},
	
	/************
	Widgets on tugo.com
	*************/
	
	setupJQueryWidgets: function(){
		//var availableTags = ["阿克苏", "阿勒泰", "安康", "安庆", "鞍山", "安顺", "百色", "保山", "包头", "北海", "北京首都", "博乐", "长白山", "长春", "常德", "昌都", "长海", "长沙", "长治", "常州", "朝阳", "成都", "赤峰", "重庆", "达川", "大理", "大连", "丹东", "大庆", "大同", "德宏芒市", "迪庆香格里拉", "东营", "敦煌", "鄂尔多斯", "恩施", "二连浩特", "佛山", "阜阳", "富蕴", "福州", "赣州", "格尔木", "广汉", "广元", "广州", "桂林", "贵阳", "哈尔滨", "海口", "海拉尔", "邯郸", "杭州", "汉中", "合肥", "黑河", "衡阳", "和田", "黄山", "呼和浩特", "惠州", "佳木斯", "吉安", "嘉峪关", "吉林", "济南", "景德镇", "井冈山", "景洪", "济宁", "锦州", "九江", "九寨黄龙", "鸡西", "喀纳斯", "康定", "喀什", "克拉玛依", "库车", "库尔勒", "昆明", "兰州", "拉萨", "连城", "连云港", "荔波", "丽江", "临沧", "临沂", "林芝", "黎平", "柳州", "洛阳", "泸州", "满洲里", "梅县", "绵阳", "漠河", "牡丹江", "那拉提", "南昌", "南充", "南京", "南宁", "南通", "南阳", "宁波", "攀枝花", "普洱", "黔江", "且末", "青岛", "庆阳", "秦皇岛", "齐齐哈尔", "泉州", "衢州", "三亚", "上海虹桥", "上海浦东", "汕头", "沙市", "沈阳", "深圳", "石家庄", "苏州", "塔城", "太原", "台州", "腾冲", "天津", "天水", "铜仁", "通辽", "万州", "潍坊", "威海", "文山", "温州", "乌海", "武汉", "芜湖", "乌兰浩特", "乌鲁木齐", "无锡", "武夷山", "梧州", "厦门", "西安", "襄樊", "西昌", "锡林浩特", "邢台", "兴义", "西宁", "徐州", "延安", "盐城", "延吉", "烟台", "宜宾", "宜昌", "伊春", "银川", "伊宁", "义乌", "永州", "榆林", "运城", "玉树", "张家界", "湛江", "昭通", "郑州", "芷江", "中卫", "舟山", "珠海", "遵议", "北京南苑"]
		//$( "input.city" ).autocomplete({ source: availableTags });
		$( "#global_loading" ).dialog({ height: 55, modal: true, autoOpen: false, title: '正在读取数据...', show: "fade", hide: "fade" });
		$( "#cities_tabs" ).tabs();
		$( "#cities_tabs" ).dialog({title: '请选择一个城市', width: 322, position: [400, 164], autoOpen: false, show: "fade", hide: "fade"});
		$( "#search_button").button();
		$( "#datepicker_depart" ).datepicker({ defaultDate: +1, numberOfMonths: 2, minDate: 0 });
		$( "#datepicker_return" ).datepicker({ defaultDate: +7, numberOfMonths: 2, minDate: 0 });
		$( "#direct_flag_all" ).attr("checked", "true");
		$( "#flight_type_return" ).attr("checked", "true");
		$( "#cities_tabs" ).parent().select('.ui-dialog').css("position: fixed");
	},
	
	setupHelpPage: function(){
		$( "a.general").button({ icons: { primary: "ui-icon-info" } });
		$( "a.service").button({ icons: { primary: "ui-icon-help" } });
		$( "a.ticket").button({ icons: { primary: "ui-icon-star" } });
		$( "#general_accordion" ).accordion();
		$( "#service_accordion" ).accordion();
		$( "#ticket_accordion" ).accordion();
	},
	
	popupModalDialog: function(msg){
		$('#dialog').text(msg);
		$('#dialog').dialog({
			height: 55,
			modal: true,
			title: "信息错误"
		});
	},
	
	///////////////////
	// FLIGHT FORM  ///
	///////////////////
	setupFlightDetailToggle: function() {
		$('a.btn_flight_toggle').live('click', function() {
			$("#detail_" + $(this).attr("rel")).toggle();
		});
	},
	
	validateSearchForm: function(){		
		var depart_date = $('#datepicker_depart').val();
		var dd = Date.parse($.datepicker.parseDate('yy-mm-dd', depart_date)) 
		var today = Date.parse(new Date()) - 60*60*24*1000;
		
		if( !dd || dd < today ){ App.popupModalDialog("出发日期不能小于今天"); return false; }
		if(!!$('#flight_type_return').attr("checked")){
			var return_date = $('#datepicker_return').val();
			var rd = Date.parse($.datepicker.parseDate('yy-mm-dd', return_date));
			if( !rd || rd < dd ){ App.popupModalDialog("返回日期不能小于出发日期"); return false; }
		}
		return true;
	},
	
	dateTimeBoxSearch: function(dateTimeBox, type){	
		var year = dateTimeBox.children('p.year').text();
		var date = dateTimeBox.children('p.date').text();
		$('#datepicker_' + type).val(year + "-" + date);
		if( App.validateSearchForm() ){ $('#form_search_flights').submit(); }
	},
	
	setupSearchForm: function(){
		$( "#search_button ").click(function() {
			if( !App.validateSearchForm() ){ return false; }
		});
		
		$("#flight_type_depart").live('click', function() {
			$("#datepicker_return").attr('disabled', 'disabled')
		});

		$("#flight_type_return").live('click', function() {
			$("#datepicker_return").removeAttr('disabled')
		});

		$('input.city').live('click', function() {
			$(this).addClass("current");
			$(this).siblings('input.city').removeClass("current");
			$( "#cities_tabs" ).dialog('open');
		});

		$('.city_select').live('click', function() {
			$('input.city.current').val($(this).text());
			$( "#cities_tabs" ).dialog('close');
		});
		
		$('#depart_flights .flight_date').live('click', function() {
			App.dateTimeBoxSearch($(this), 'depart');
		});

		$('#return_flights .flight_date').live('click', function() {
			App.dateTimeBoxSearch($(this), 'return');
		});
		
		$('input').click(function(){  $( "#cities_tabs" ).dialog('close'); });
	}
	
}

$(function() {
	App.setupAjaxCallbacks();
	App.setupJQueryWidgets();
	App.setupSearchForm();
	App.setupFlightDetailToggle();
});
