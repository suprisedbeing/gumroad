import ReactOnRails from "react-on-rails";

import BasePage from "$app/utils/base_page";

import PasswordResetPage from "$app/components/server-components/PasswordResetPage";

BasePage.initialize();

ReactOnRails.default.register({ SignupPage, LoginPage, PasswordResetPage });
