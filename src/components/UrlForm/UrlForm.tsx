"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LuAxe } from "react-icons/lu";
import { ImSpinner2 } from "react-icons/im";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UrlFormSchema, UrlFormSchemaType } from "./urlFormSchema";
import { createUrlAction } from "./createUrlAction";
import { CopyText } from "../CopyText";

const UrlForm = () => {
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const form = useForm<UrlFormSchemaType>({
    resolver: zodResolver(UrlFormSchema),
    defaultValues: {
      url: "",
    },
  });
  const { isSubmitting } = form.formState;
  const onSubmit = async (data: UrlFormSchemaType) => {
    const response = await createUrlAction(data);

    if (response.type === "success") {
      setShortenedUrl(response.data.url);
      setCopied(false);
      form.reset();
    }
  };
  const onCopyText = () => {
    setCopied(true);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-lg mx-auto"
      >
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <Input placeholder="http://example.com" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? (
            <>
              <ImSpinner2 className="animate-spin" />
              {"Chopping..."}
            </>
          ) : (
            <>
              <LuAxe />
              {`"Chop" URL`}
            </>
          )}
        </Button>
        {shortenedUrl && (
          <CopyText
            className="text-gray-800 text-base px-4"
            onClick={onCopyText}
            copied={copied}
            text={shortenedUrl}
          />
        )}
      </form>
    </Form>
  );
};

export { UrlForm };
