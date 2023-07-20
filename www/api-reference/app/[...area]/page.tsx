import AreaProvider from "@/providers/area"
import AdminDescription from "../_mdx/admin.mdx"
import StoreDescription from "../_mdx/store.mdx"
import ClientLibraries from "../_mdx/client-libraries.mdx"
import Section from "@/components/Section"
import Tags from "@/components/Tags"
import type { Area } from "@/types/openapi"
import DividedLayout from "@/layouts/Divided"

type ReferencePageProps = {
  params: {
    area: Area
  }
}

const ReferencePage = async ({ params: { area } }: ReferencePageProps) => {
  return (
    <AreaProvider area={area}>
      <div className="mt-3">
        <DividedLayout
          mainContent={<h1>Medusa {capitalizeTitle(area[0])} API Reference</h1>}
          codeContent={<></>}
        />
        <DividedLayout
          mainContent={
            <Section>
              {area.includes("admin") && <AdminDescription />}
              {area.includes("store") && <StoreDescription />}
            </Section>
          }
          codeContent={<ClientLibraries />}
          className="flex-col-reverse"
        />
        <Tags />
      </div>
    </AreaProvider>
  )
}

export default ReferencePage

export function generateMetadata({ params: { area } }: ReferencePageProps) {
  return {
    title: `Medusa ${capitalizeTitle(area[0])} API Reference`,
    description: `REST API reference for the Medusa ${area[0]} API. This reference includes code snippets and examples for Medusa JS Client and cURL.`,
  }
}

function capitalizeTitle(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
