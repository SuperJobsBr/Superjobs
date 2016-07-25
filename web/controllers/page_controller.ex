defmodule Superjobs.PageController do
  use Superjobs.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
