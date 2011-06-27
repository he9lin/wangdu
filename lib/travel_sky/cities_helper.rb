# coding: utf-8
module TravelSky
  module CitiesHelper
    
    HOT_CITIES  = { "热门" => "@PEK|北京首都@NAY|北京南苑@SHA|上海虹桥@PVG|上海浦东@CAN|广州@SZX|深圳@CTU|成都@HGH|杭州@WUH|武汉@XIY|西安@CKG|重庆@TAO|青岛@CSX|长沙@NKG|南京@XMN|厦门@KMG|昆明@DLC|大连@TSN|天津@CGO|郑州@SYX|三亚@TNA|济南@FOC|福州",
      'A-F' => "@AKU|阿克苏@AAT|阿勒泰@AKA|安康@AQG|安庆@AOG|鞍山@AVA|安顺@AEB|百色@BSD|保山@BAV|包头@BHY|北海@PEK|北京@BQL|博乐@NBS|长白山@CGQ|长春@CGD|常德@BPX|昌都@CNI|长海@CSX|长沙@CIH|长治@CZX|常州@CHG|朝阳@CTU|成都@CIF|赤峰@CKG|重庆@DAX|达川@DLU|大理@DLC|大连@DDG|丹东@DQA|大庆@DAT|大同@LUM|德宏芒市@DIG|迪庆香格里拉@DOY|东营@DNH|敦煌@DSN|鄂尔多斯@ENH|恩施@ERL|二连浩特@FUO|佛山@FUG|阜阳@FYN|富蕴@FOC|福州",
      'G-J' => "@GZH|赣州@GOQ|格尔木@GHN|广汉@GYS|广元@CAN|广州@KWL|桂林@KWE|贵阳@HRB|哈尔滨@HAK|海口@HLD|海拉尔@HDG|邯郸@HGH|杭州@HZG|汉中@HFE|合肥@HEK|黑河@HNY|衡阳@HTN|和田@TXN|黄山@HET|呼和浩特@HUZ|惠州@JMU|佳木斯@KNC|吉安@JGN|嘉峪关@JIL|吉林@TNA|济南@JDZ|景德镇@JGS|井冈山@JHG|景洪@JNG|济宁@JNZ|锦州@JIU|九江@JZH|九寨黄龙@JXA|鸡西",
      'K-N' => "@KJI|喀纳斯@KGT|康定@KHG|喀什@KRY|克拉玛依@KCA|库车@KRL|库尔勒@KMG|昆明@LHW|兰州@LXA|拉萨@LCX|连城@LYG|连云港@LLB|荔波@LJG|丽江@LNJ|临沧@LYI|临沂@LZY|林芝@HZH|黎平@LZH|柳州@LYA|洛阳@LZO|泸州@NZH|满洲里@MXZ|梅县@MIG|绵阳@OHE|漠河@MDG|牡丹江@NLT|那拉提@KHN|南昌@NAO|南充@NKG|南京@NNG|南宁@NTG|南通@NNY|南阳@NGB|宁波",
      'P-W' => "@PZI|攀枝花@SYM|普洱@JIQ|黔江@IQM|且末@TAO|青岛@IQN|庆阳@SHP|秦皇岛@NDG|齐齐哈尔@JJN|泉州@JUZ|衢州@SYX|三亚@SHA|上海虹桥@PVG|上海浦东@SWA|汕头@SHS|沙市@SHE|沈阳@SZX|深圳@SJW|石家庄@SZV|苏州@TCG|塔城@TYN|太原@HYN|台州@TCZ|腾冲@TSN|天津@THQ|天水@TEN|铜仁@TGO|通辽@WXN|万州@WEF|潍坊@WEH|威海@WNH|文山@WNZ|温州@WUA|乌海@WUH|武汉@WHU|芜湖@HLH|乌兰浩特@URC|乌鲁木齐@WUX|无锡@WUS|武夷山@WUZ|梧州",
      'X-Z' => "@XMN|厦门@XIY|西安@XFN|襄樊@XIC|西昌@XIL|锡林浩特@XNT|邢台@ACX|兴义@XNN|西宁@XUZ|徐州@ENY|延安@YNZ|盐城@YNJ|延吉@YNT|烟台@YBP|宜宾@YIH|宜昌@LDS|伊春@INC|银川@YIN|伊宁@YIW|义乌@LLF|永州@UYN|榆林@YCU|运城@YUS|玉树@DYG|张家界@ZHA|湛江@ZAT|昭通@CGO|郑州@HJJ|芷江@ZHY|中卫@HSN|舟山@ZUH|珠海@ZYI|遵议"};
    
    def cities_dialog
      content_tag :div, :id => "cities_dialog" do
        content_tag :div, :id => "cities_tabs" do
          uls = content_tag(:ul) do
            tabs = []
            HOT_CITIES.each_with_index do |k, i|
              tabs << content_tag(:li) do
                link_to k[0], "#cities-tabs-#{i}"
              end
            end
            tabs.join.html_safe
          end
          divs = []
          HOT_CITIES.each_with_index do |k, i|
            divs << content_tag(:div, :id => "cities-tabs-#{i}", :class => "ui-tabs-panel ui-widget-content ui-corner-bottom") do
              cities_group(k[1])
            end
          end
          uls.concat(divs.join.html_safe)
        end
      end
    end
    
    def cities_group(data)
      content_tag :div, :class => "city_selects" do
        cities = []
        data.split("@").each do |data|
          data = data.split("|")
          if data[0]
            cities << content_tag(:a, :rel => data[0], :class => "city_select", :id => "city-select-#{data[0]}") do
              data[1]
            end
          end
        end
        cities.join.html_safe
      end
    end
    
  end
end