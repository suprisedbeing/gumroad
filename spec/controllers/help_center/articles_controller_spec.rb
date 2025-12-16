# frozen_string_literal: true

require "spec_helper"
require "inertia_rails/rspec"

describe HelpCenter::ArticlesController, type: :controller, inertia: true do
  describe "GET index" do
    it "renders the Inertia component" do
      get :index

      expect(response).to have_http_status(:ok)
      expect(inertia).to render_component("HelpCenter/Articles/Index")
      expect(inertia.props[:categories]).to be_present
      expect(inertia.props[:recaptcha_site_key]).to be_nil # User is not signed in by default in specs? Wait, let's check context.
    end
  end

  describe "GET show" do
    let(:article) { HelpCenter::Article.find(43) }

    it "renders the Inertia component" do
      allow(controller).to receive(:render_to_string).and_return("<h1>Content</h1>")
      get :show, params: { slug: article.slug }
      expect(response).to have_http_status(:ok)
      expect(inertia).to render_component("HelpCenter/Articles/Show")
      expect(inertia.props[:article][:title]).to eq(article.title)
      expect(inertia.props[:article][:content_html]).to eq("<h1>Content</h1>")
    end

    context "render views" do
      render_views

      it "renders the article and categories for the same audience" do
        get :show, params: { slug: article.slug }

        expect(response).to have_http_status(:ok)

        article.category.categories_for_same_audience.each do |c|
          expect(response.body).to include(c.title)
        end

        expect(response.body).to include(article.title)
      end

      HelpCenter::Article.all.each do |article|
        it "renders the article #{article.slug}" do
          get :show, params: { slug: article.slug }

          expect(response).to have_http_status(:ok)
          expect(response.body).to include(ERB::Util.html_escape(article.title))
        end
      end
    end

    context "when article is not found" do
      it "redirects to the help center root path" do
        get :show, params: { slug: "nonexistent-slug" }

        expect(response).to redirect_to(help_center_root_path)
        expect(response).to have_http_status(:found)
      end
    end

    context "when accessing the old jobs article URL" do
      it "redirects to the about page jobs section with 301 status" do
        get :show, params: { slug: "284-jobs-at-gumroad" }

        expect(response).to redirect_to("/about#jobs")
        expect(response).to have_http_status(:moved_permanently)
      end
    end
  end
end
