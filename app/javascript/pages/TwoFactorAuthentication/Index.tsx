import { router } from "@inertiajs/react";
import * as React from "react";

import { resendTwoFactorToken } from "$app/data/login";
import { assertResponseError } from "$app/utils/request";

import { Layout } from "$app/components/Authentication/Layout";
import { Button } from "$app/components/Button";
import { showAlert } from "$app/components/server-components/Alert";

type SaveState = { type: "initial" | "submitting" } | { type: "error"; message: string };

interface TwoFactorAuthenticationProps {
  user_id: string;
  email: string;
  token: string | null;
}

export default function TwoFactorAuthenticationIndex({ user_id, email, token: initialToken }: TwoFactorAuthenticationProps) {
  const uid = React.useId();
  const [token, setToken] = React.useState(initialToken ?? "");
  const [loginState, setLoginState] = React.useState<SaveState>({ type: "initial" });
  const [resendState, setResendState] = React.useState<SaveState>({ type: "initial" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginState({ type: "submitting" });

    router.post(
      "/two-factor",
      { token, user_id },
      {
        preserveScroll: true,
        onError: (errors) => {
          const errorMessage = errors.error_message || "Invalid token, please try again.";
          setLoginState({ type: "error", message: errorMessage });
        },
        onFinish: () => {
          // If there's no error, Inertia will handle the redirect automatically
          // based on the redirect_location from the controller
        },
      }
    );
  };

  const resendToken = async () => {
    setResendState({ type: "submitting" });
    try {
      await resendTwoFactorToken(user_id);
      showAlert("Resent the authentication token, please check your inbox.", "success");
    } catch (e) {
      assertResponseError(e);
      showAlert(e.message, "error");
    }
    setResendState({ type: "initial" });
  };

  return (
    <Layout
      header={
        <>
          <h1>Two-Factor Authentication</h1>
          <h3>
            To protect your account, we have sent an Authentication Token to {email}. Please enter it here to continue.
          </h3>
        </>
      }
    >
      <form onSubmit={(e) => void handleSubmit(e)}>
        <section>
          {loginState.type === "error" ? (
            <div role="alert" className="danger">
              {loginState.message}
            </div>
          ) : null}
          <fieldset>
            <legend>
              <label htmlFor={uid}>Authentication Token</label>
            </legend>
            <input id={uid} type="text" value={token} onChange={(e) => setToken(e.target.value)} required autoFocus />
          </fieldset>
          <Button color="primary" type="submit" disabled={loginState.type === "submitting"}>
            {loginState.type === "submitting" ? "Logging in..." : "Login"}
          </Button>
          <Button disabled={resendState.type === "submitting"} onClick={() => void resendToken()}>
            Resend Authentication Token
          </Button>
        </section>
      </form>
    </Layout>
  );
}
