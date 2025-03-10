"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { config } from "@/config";
import { useOnboarding } from "@/lib/swr/onboarding/useOnboarding";
import { CountryCode } from "@/lib/types/onboarding/countries";
import { STEPS } from "@/lib/types/onboarding/onboardingSteps";
import { countryFormSchema } from "@/schemas/countryFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CountryFormProps {
  country?: CountryCode;
  isLoading?: boolean;
  setStep: (step: STEPS) => void;
}

export default function CountryForm({
  country,
  isLoading,
  setStep
}: CountryFormProps) {
  const [lastCountry, setLastCountry] = useState<CountryCode | undefined>(
    undefined
  );
  const { trigger, isMutating, error } = useOnboarding();

  const form = useForm<z.infer<typeof countryFormSchema>>({
    resolver: zodResolver(countryFormSchema),
    defaultValues: {
      country: lastCountry ?? country ? country : undefined
    }
  });

  console.log("CountryForm", country);
  console.log("CountryForm", lastCountry);

  async function onSubmit(values: z.infer<typeof countryFormSchema>) {
    try {
      if (values.country !== country) {
        await trigger({ country: values.country as CountryCode });
        setLastCountry(values.country as CountryCode);
        if (error) return;
      }
      setStep(STEPS.FISCAL);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 w-xs">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country of the company</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={lastCountry ?? field.value}
                    disabled={isMutating}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder="Select a country"
                        defaultValue={country}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {config.countries.map(
                        ({ code, name, isAvailable }, index) => (
                          <SelectItem
                            key={index}
                            value={code}
                            disabled={!isAvailable}
                          >
                            {name}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  We are currently only available in Spain. More countries
                  coming soon. If you want us to add your country, fill{" "}
                  <Link
                    href="https://traveling-army-257.notion.site/1afa5a06b86180e088a1c378f039d7b1?pvs=105"
                    className="text-zinc-800 underline font-medium"
                  >
                    this form
                  </Link>
                  .
                </FormDescription>
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-4 w-xs" disabled={isMutating}>
            Next
          </Button>
        </form>
      </Form>
    </>
  );
}
