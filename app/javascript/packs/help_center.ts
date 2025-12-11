import ReactOnRails from "react-on-rails";

import BasePage from "$app/utils/base_page";

import Alert from "$app/components/server-components/Alert";
import HelpCenterArticlesIndexPage from "$app/components/server-components/HelpCenter/ArticlesIndexPage";
import HelpCenterPage from "$app/components/server-components/HelpCenterPage";
import Nav from "$app/components/server-components/Nav";
import SupportHeader from "$app/components/server-components/support/Header";

BasePage.initialize();

ReactOnRails.register({
  Alert,
  HelpCenterArticlesIndexPage,
  HelpCenterPage,
  Nav,
  SupportHeader,
});
