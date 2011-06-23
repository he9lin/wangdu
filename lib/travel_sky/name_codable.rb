module TravelSky
  module NameCodable
    
    def names
      @names = names_hash.keys
    end
    
    def data
      raise NotImplementedError
    end
    
    def names_hash
      return @names_hash if @names_hash
      @names_hash = {}
      data.split("@").each do |data|
        data = data.split("|")
        @names_hash[data[1]] = data[2] if data[1]
      end
      @names_hash
    end
    
    def get_code(name)
      names_hash[name]
    end
    
    def get_name(code)
      name = names_hash.select{|n, c| c == code }
      name.values[0]
    end
    
  end
end