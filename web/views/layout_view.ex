defmodule Superjobs.LayoutView do
  use Superjobs.Web, :view

  import Phoenix.Naming

  @doc """
  Renders current locale.
  """
  def locale do
    Gettext.get_locale(Superjobs.Gettext)
  end

  @doc """
  Provides tuples for all alternative languages supported.
  """
  def fb_locales do
    Superjobs.Gettext.supported_locales
    |> Enum.map(fn l ->
      # Cannot call `locale/0` inside guard clause
      current = locale
      case l do
        l when l == current -> {"og:locale", l}
        l -> {"og:locale:alternate", l}
      end
    end)
  end

  @doc """
  Provides tuples for all alternative languages supported.
  """
  def language_annotations(conn) do
    Superjobs.Gettext.supported_locales
    |> Enum.reject(fn l -> l == locale end)
    |> Enum.concat(["x-default"])
    |> Enum.map(fn l ->
      case l do
        "x-default" -> {"x-default", localized_url(conn, "")}
        l -> {l, localized_url(conn, "/#{l}")}
      end
    end)
  end

  defp localized_url(conn, alt) do
    # Replace current locale with alternative
    path = ~r/\/#{locale}(\/(?:[^?]+)?|$)/
    |> Regex.replace(conn.request_path, "#{alt}\\1")

    Phoenix.Router.Helpers.url(Superjobs.Router, conn) <> path
  end
end
