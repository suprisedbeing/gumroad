# frozen_string_literal: true

class HelpCenter::ArticlesController < HelpCenter::BaseController
  before_action :redirect_legacy_articles, only: :show

  layout "inertia"

  def index
    @title = "Gumroad Help Center"
    @canonical_url = help_center_root_url
    @description = "Common questions and support documentation"

    render inertia: "HelpCenter/Articles/Index",
           props: {
             categories: HelpCenter::Category.all.map { |category| category_props(category) },
             recaptcha_site_key: user_signed_in? ? nil : GlobalConfig.get("RECAPTCHA_LOGIN_SITE_KEY")
           }
  end

  def show
    @article = HelpCenter::Article.find_by!(slug: params[:slug])

    @title = "#{@article.title} - Gumroad Help Center"
    @canonical_url = help_center_article_url(@article)

    render inertia: "HelpCenter/Articles/Show",
           props: {
             article: article_props(@article, include_content: true),
             related_categories: @article.category.categories_for_same_audience.map { |c| category_props(c) },
             recaptcha_site_key: user_signed_in? ? nil : GlobalConfig.get("RECAPTCHA_LOGIN_SITE_KEY")
           }
  end

  private
    LEGACY_ARTICLE_REDIRECTS = {
      "284-jobs-at-gumroad" => "/about#jobs"
    }

    def redirect_legacy_articles
      return unless LEGACY_ARTICLE_REDIRECTS.key?(params[:slug])

      redirect_to LEGACY_ARTICLE_REDIRECTS[params[:slug]], status: :moved_permanently
    end


end
