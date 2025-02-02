"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { GithubIcon, GoogleIcon } from "../icons";

const DEFAULT_LOGIN_REDIRECT_URL = "/dashboard/urls";

const ProvidersLogin = () => {
  const t = useTranslations("signin-page.providers-login");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [loading, setLoading] = useState<boolean>(false);
  const [provider, setProvider] = useState<string | null>();

  const socialProviders = [
    {
      name: t("google"),
      icon: <GoogleIcon className="w-5 h-5" />,
      provider: "google",
      className: "bg-white text-black border border-gray-300 hover:bg-gray-50",
    },
    {
      name: t("github"),
      icon: <GithubIcon className="w-5 h-5" />,
      provider: "github",
      className: "bg-[#24292e] text-white hover:bg-opacity-90",
    },
  ];

  const handleProviderLogin = async (provider: string) => {
    try {
      setLoading(true);
      setProvider(provider);
      await signIn(provider, {
        callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT_URL,
      });
    } catch (error) {
      console.error(error);
      toast.error(t("error"));
    }
  };

  return (
    <div className="w-full max-w-md md:max-w-lg bg-white rounded-lg shadow-lg p-8">
      <div className="space-y-4">
        {socialProviders.map((sp) => (
          <button
            key={sp.provider}
            disabled={loading}
            onClick={() => handleProviderLogin(sp.provider)}
            className={`w-full h-11 rounded-lg flex items-center justify-center gap-3 transition duration-200 ${sp.className}`}
          >
            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
              {provider === sp.provider ? (
                <Loader className="animate-spin h-5 w-5" />
              ) : (
                sp.icon
              )}
            </div>
            <span className="text-base">{sp.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProvidersLogin;
