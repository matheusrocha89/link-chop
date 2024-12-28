"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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

const UrlForm = () => {
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const form = useForm<UrlFormSchemaType>({
    resolver: zodResolver(UrlFormSchema),
    defaultValues: {
      url: "",
    },
  });
  const onSubmit = async (data: UrlFormSchemaType) => {
    const response = await createUrlAction(data);
    console.log(response);

    if (response.type === "success") {
      setShortenedUrl(response.data.url);
    }
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
        <Button type="submit">Shrink URL</Button>
        {shortenedUrl && (
          <p className="text-base text-gray-800">{shortenedUrl}</p>
        )}
      </form>
    </Form>
  );
};

export { UrlForm };
