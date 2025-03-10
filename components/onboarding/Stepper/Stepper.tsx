"use client";

import CountryForm from "@/components/forms/onboarding/CountryForm";
import FiscalForm from "@/components/forms/onboarding/FiscalForm";
import { getFiscalInformation } from "@/lib/swr/fiscalInformation/getFiscalInformation";
import { getUser } from "@/lib/swr/user/getUser";
import { STEPS } from "@/lib/types/onboarding/onboardingSteps";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import useSWR from "swr";

const labels = [
  {
    title: "We are almost there",
    description: "We just need a bit more information to get you started."
  }
];

export default function Stepper() {
  const [step, setStep] = useState(STEPS.COUNTRY);

  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading
  } = useSWR("/api/v1/user", getUser, {
    refreshInterval: 0
  });

  const {
    data: fiscalData,
    error: fiscalError,
    isLoading: fiscalIsLoading
  } = useSWR("/api/v1/fiscal-information", getFiscalInformation, {
    refreshInterval: 0
  });

  const user = userData?.data;
  const country = user?.country;
  const fiscal = fiscalData?.data;

  useEffect(() => {}, [step]);

  return (
    <div className="flex flex-col justify-start items-center">
      <div className="flex flex-row justify-center items-center gap-6">
        {userIsLoading || fiscalIsLoading ? (
          <>Loading</>
        ) : (
          <div className="flex flex-col justify-start items-center border border-zinc-200 rounded-lg p-8 ring-4 ring-zinc-100 w-lg">
            <span className="flex flex-col justify-center items-center">
              <p className="text-2xl font-semibold text-zinc-800">
                {labels[0].title}
              </p>
              <p className="text-zinc-500">{labels[0].description}</p>
            </span>
            {step === STEPS.COUNTRY && (
              <CountryForm
                isLoading={userIsLoading}
                country={country}
                setStep={setStep}
              />
            )}
            {step === STEPS.FISCAL && (
              <FiscalForm fiscal={fiscal} setStep={setStep} />
            )}
          </div>
        )}
      </div>
      {/* <div>Content</div> */}
    </div>
  );
}
