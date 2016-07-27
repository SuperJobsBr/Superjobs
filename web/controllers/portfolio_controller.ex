defmodule Superjobs.PortfolioController do
  use Superjobs.Web, :controller

  def bicos(conn, _params) do
    render conn, "bicos.html"
  end

  def estagiariosonline(conn, _params) do
    render conn, "estagiariosonline.html"
  end

  def pagueamigo(conn, _params) do
    render conn, "pagueamigo.html"
  end

  def dr_sintomas(conn, _params) do
    render conn, "dr_sintomas.html"
  end
end
