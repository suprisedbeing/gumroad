import { Head, usePage } from "@inertiajs/react";
import React from "react";

import { classNames } from "$app/utils/classNames";

import { Nav } from "$app/components/client-components/Nav";
import LoadingSkeleton from "$app/components/LoadingSkeleton";
import { useLoggedInUser } from "$app/components/LoggedInUser";
import Alert, { showAlert, type AlertPayload } from "$app/components/server-components/Alert";
import useRouteLoading from "$app/components/useRouteLoading";

type PageProps = {
  title: string;
  flash?: AlertPayload;
  hide_nav?: boolean;
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const { title, flash, hide_nav } = usePage<PageProps>().props;
  const isRouteLoading = useRouteLoading();
  const loggedInUser = useLoggedInUser();

  React.useEffect(() => {
    if (flash?.message) {
      showAlert(flash.message, flash.status === "danger" ? "error" : flash.status);
    }
  }, [flash]);

  return (
    <>
      <Head title={title} />
      <Alert initial={flash ?? null} />
      <div id="inertia-shell" className={classNames("flex h-screen flex-col", { "lg:flex-row": !hide_nav })}>
        {!hide_nav ? <Nav title="Dashboard" /> : null}
        {isRouteLoading ? <LoadingSkeleton /> : null}
        <main className={classNames("flex-1 overflow-y-auto", { hidden: isRouteLoading })}>{children}</main>
      </div>
    </>
  );
}
