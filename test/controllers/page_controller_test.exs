defmodule Superjobs.PageControllerTest do
  use Superjobs.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "Estamos prontos para te ajudar"
  end
end
