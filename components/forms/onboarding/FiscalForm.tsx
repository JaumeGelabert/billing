"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePostFiscalInformation } from "@/lib/swr/fiscalInformation/usePostFiscalInformation";
import { usePutFiscalInformation } from "@/lib/swr/fiscalInformation/usePutFiscalInformation";
import { STEPS } from "@/lib/types/onboarding/onboardingSteps";
import { fiscalInformationSchema } from "@/schemas/fiscalInformationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface FiscalFormProps {
  fiscal?: any;
  setStep: (step: STEPS) => void;
}

export default function FiscalForm({ fiscal, setStep }: FiscalFormProps) {
  const { trigger, isMutating, data, error } = usePostFiscalInformation();
  const {
    trigger: triggerUpdate,
    isMutating: isMutatingUpdate,
    data: dataUpdate,
    error: errorUpdate
  } = usePutFiscalInformation();
  const router = useRouter();

  const isDisabled = isMutating || isMutatingUpdate;

  const form = useForm<z.infer<typeof fiscalInformationSchema>>({
    resolver: zodResolver(fiscalInformationSchema),
    defaultValues: {
      fiscalName: fiscal?.fiscalName ?? "",
      fiscalNumber: fiscal?.fiscalNumber ?? "",
      fiscalAddress: fiscal?.fiscalAddress ?? "",
      fiscalCity: fiscal?.fiscalCity ?? "",
      fiscalZipCode: fiscal?.fiscalZipCode ?? "",
      fiscalPhone: fiscal?.fiscalPhone ?? "",
      fiscalEmail: fiscal?.fiscalEmail ?? ""
    }
  });

  async function onSubmit(values: z.infer<typeof fiscalInformationSchema>) {
    try {
      if (fiscal) {
        await triggerUpdate(values);
      } else {
        await trigger(values);
      }
      if (!error) {
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-6 w-xs space-y-4"
        >
          <FormField
            control={form.control}
            name="fiscalName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Fiscal name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isDisabled}
                    placeholder="Apple Inc"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fiscalNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Fiscal number</FormLabel>
                <FormControl>
                  <Input
                    disabled={isDisabled}
                    placeholder="B65130643"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fiscalAddress"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Fiscal address</FormLabel>
                <FormControl>
                  <Input
                    disabled={isDisabled}
                    placeholder="Gran vía, 14"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="w-full flex flex-row justify-between gap-4">
            <FormField
              control={form.control}
              name="fiscalCity"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isDisabled}
                      placeholder="Madrid"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fiscalZipCode"
              render={({ field }) => (
                <FormItem className="w-fit">
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isDisabled}
                      placeholder="07184"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="fiscalPhone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input
                    disabled={isDisabled}
                    placeholder="646665435"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fiscalEmail"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isDisabled}
                    placeholder="steve@apple.com"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <span className="w-full flex flex-row justify-between items-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(STEPS.COUNTRY)}
              disabled={isDisabled}
            >
              <ArrowLeftIcon /> Back
            </Button>
            <Button type="submit" disabled={isDisabled}>
              Finish
              <ArrowRightIcon />
            </Button>
          </span>
        </form>
      </Form>
    </>
  );
}
