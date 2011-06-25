# coding: utf-8
module SocialHelper
  def share_links(title, img)
    title = CGI.escape(title)
    content_tag :ul, :class => "share" do
      name = content_tag :li, "分享万都", :class => "name"
      tsina = content_tag :li do
        share_link("tsina", "http://v.t.sina.com.cn/share/share.php", "分享到新浪微博", {:appkey => "1507826766", :url => request.url, :title => title, :content => "utf8", :pic => img } )
      end
      renren = content_tag :li do
        share_link("renren", "http://share.renren.com/share/buttonshare.do", "分享到人人网", {:link => request.url, :title => title } )
      end
      kaixin = content_tag :li do
        share_link("kaixin", "http://www.kaixin001.com/repaste/share.php", "分享到开心网", {:rurl => request.url, :rtitle => title } )
      end
      douban = content_tag :li do
        share_link("douban", "http://www.douban.com/recommend/", "分享到豆瓣网", { :url => request.url, :title => title } )
      end
      netease = content_tag :li do
        share_link("netease", "http://t.163.com/article/user/checkLogin.do", "分享到网易", { :link => request.url, :info => title, :source => root_url } )
      end
      fetion = content_tag :li do
        share_link("fetion", "http://space.fetion.com.cn/api/share", "分享到飞信", { :url => request.url, :title => title, :source => root_url } )
      end
      qqweibo = content_tag :li do
        share_link("qqweibo", "http://v.t.qq.com/share/share.php", "分享到QQ微博", { :url => request.url, :title => title, :appkey => "d762eec80a2b4808aa847e06c04d4cad"} )
      end
      qqspace = content_tag :li do
        share_link("qqspace", "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey", "分享到qq空间", { :url => request.url, :title => title} )
      end
      msn = content_tag :li do
        share_link("msn", "http://profile.live.com/badge/", "分享到MSN", { :url => request.url, :Title => title, :screenshot => img, :wa => "wsignin1.0"} )
      end
      name.concat(tsina).concat(renren).concat(kaixin).concat(douban).concat(netease).concat(fetion).concat(qqweibo).concat(qqspace)#.concat(msn)
    end
  end

  def share_link(to, to_link, title, options = {})    
    p = []
    options.each do |k, v|
      p << k.to_s + "=" + v.to_s
    end
    p = p.join('&')
    "<a href=\"javascript:void(0);\" class=\"#{to} tooltiped\" onclick=\"window.open('#{to_link}?#{p}', '_blank', 'height=720,width=615,status=yes,resizable=no'); return false;\" title=\"#{title}\"></a>".html_safe 
  end
end