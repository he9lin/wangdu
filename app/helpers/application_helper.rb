module ApplicationHelper
  
  def stylesheet(*args)
    content_for(:head) { stylesheet_link_tag(*args) }
  end

  def javascript(*args)
    content_for(:head) { javascript_include_tag(*args) }
  end
  
  def div(*args, &block)
    content_tag :div, *args, &block
  end
  
  def span(*args, &block)
    content_tag :span, *args, &block
  end
  
  def smart_link_to(text, path)
    link_to_unless_current text, path do
      span :class => 'current' do
        span text, :class => 'inner'
      end
    end
  end
  
end
