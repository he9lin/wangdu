require 'eventmachine'

class RefreshTimer
  
  class << self
    def ensure_reactor_running!
      Thread.new { EM.run } unless EM.reactor_running?
      while not EM.reactor_running?; end
    end

    def add_timeout(name, delay, &block)
      ensure_reactor_running!
      @@timeouts ||= {}
      return if @@timeouts.has_key?(name)
      @@timeouts[name] = EM.add_timer(delay) do
        @@timeouts.delete(name)
        block.call
      end
    end

    def remove_timeout(name)
      @@timeouts ||= {}
      timeout = @@timeouts[name]
      return if timeout.nil?
      EM.cancel_timer(timeout)
      @@timeouts.delete(name)
    end
    
    def reset_timeout(name, delay, &block)
      remove_timeout(name)
      add_timeout(name, delay, &block)
    end
  end
  
  def initialize(app)
    @app = app
  end
  
  def call(env)
    RefreshTimer.reset_timeout(:refresh_timer, 1800) {
      Rails.logger.info "[Refresh Timer] yeah!"
      system 'curl http://localhost:3000'
    }
    dup._call(env)
  end
  
  def _call(env)
    @status, @headers, @response = @app.call(env)
    [@status, @headers, self]
  end
  
  def each(&block)
    @response.each(&block)
  end
end