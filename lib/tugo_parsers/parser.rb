module TugoParsers
  class Parser
    def self.parse(content)
      content = remove_bracket(content)
      content.gsub!(/(\n|\t|\r)/, "") # remove \n and \t
      content.gsub!(/(')/, "\"")      # replace '

      while match = /(\{|,)([^:|"]*)(:)/.match(content)
        m = match[0]
        origin = String.new(m)
        m_inner = m[1, m.length-2]
        m_inner.strip!
        m = m[0] + m_inner + m[m.length-1]        # trim string
        m.insert(1, '"').insert(m.length-1, '"')  # adding ""
        content.gsub!(origin, m)
      end
      content
    end
    
    def self.remove_bracket(content)
      content = content[1,content.length-2]
    end
    
    def self.collect(data)
    end
    
  end
end