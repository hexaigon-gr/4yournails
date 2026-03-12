import { redirect } from "@/lib/i18n/navigation";
import { BasePageProps } from "@/types/page-props";

const ContactPage = async ({ params }: BasePageProps) => {
  const { locale } = await params;
  redirect({ href: "/#contact", locale });
};

export default ContactPage;
