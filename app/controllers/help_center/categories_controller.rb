# frozen_string_literal: true

class HelpCenter::CategoriesController < HelpCenter::BaseController
  layout "inertia"

  def show
    @category = HelpCenter::Category.find_by!(slug: params[:slug])

    render inertia: "HelpCenter/Categories/Show",
           props: {
             category: category_props(@category),
             related_categories: @category.categories_for_same_audience.map { |c| category_props(c) }
           }
  end

  private

end
