"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { detailsInformationSchema } from "@/schemas/detailsFormShema";
import { UploadCloudIcon } from "lucide-react";
import { STEPS } from "@/lib/types/onboarding/onboardingSteps";
import { CustomFileUpload } from "./CustomImageUpload";

interface DetailsFormProps {
  fiscalName: string;
  fiscalEmail: string;
  setStep: (step: STEPS) => void;
}

export function DetailsForm({
  fiscalName,
  fiscalEmail,
  setStep
}: DetailsFormProps) {
  const form = useForm<z.infer<typeof detailsInformationSchema>>({
    resolver: zodResolver(detailsInformationSchema),
    defaultValues: {
      image: ""
    }
  });

  function onSubmit(values: z.infer<typeof detailsInformationSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="image"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem className="w-full">
              <FormLabel>
                Company logo{" "}
                <span className="text-xs text-zinc-400">(Optional)</span>
              </FormLabel>
              <FormControl>
                <CustomFileUpload
                  onChange={() => {
                    console.log("changed");
                  }}
                  value={"value"}
                  {...fieldProps}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
