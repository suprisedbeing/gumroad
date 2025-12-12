# frozen_string_literal: true

class HelpCenter::BaseController < ApplicationController
  layout "help_center"

  rescue_from ActiveHash::RecordNotFound, with: :redirect_to_help_center_root

  private
    def redirect_to_help_center_root
      redirect_to help_center_root_path, status: :found
    end

    def category_props(category)
      {
        title: category.title,
        slug: category.slug,
        url: help_center_category_path(category),
        audience: category.audience,
        articles: category.articles.map { |article| article_props(article) }
      }
    end

    def article_props(article, include_content: false)
      props = {
        title: article.title,
        slug: article.slug,
        url: help_center_article_path(article)
      }

      if include_content
        props[:content_html] = render_to_string(partial: "help_center/articles/contents/#{article.slug}", layout: false)
      end

      props
    end
end
