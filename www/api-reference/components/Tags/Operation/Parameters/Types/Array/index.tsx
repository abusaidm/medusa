import type { SchemaObject } from "@/types/openapi"
import dynamic from "next/dynamic"
import type { TagOperationParametersDefaultProps } from "../Default"
import type { TagOperationParametersProps } from "../.."
import Details from "@/components/Details"
import TagsOperationParametersNested from "../../Nested"
import Loading from "@/components/Loading"

const TagOperationParametersDefault =
  dynamic<TagOperationParametersDefaultProps>(
    async () => import("../Default"),
    {
      loading: () => <Loading />,
    }
  ) as React.FC<TagOperationParametersDefaultProps>

const TagOperationParameters = dynamic<TagOperationParametersProps>(
  async () => import("../.."),
  {
    loading: () => <Loading />,
  }
) as React.FC<TagOperationParametersProps>

export type TagOperationParametersArrayProps = {
  name: string
  schema: SchemaObject
  isRequired?: boolean
}

const TagOperationParametersArray = ({
  name,
  schema,
  isRequired,
}: TagOperationParametersArrayProps) => {
  if (schema.type !== "array") {
    return <></>
  }

  if (
    !schema.items ||
    (schema.items.type !== "object" && schema.items.type !== "array") ||
    (schema.items.type === "object" &&
      !schema.items.properties &&
      !schema.items.allOf &&
      !schema.items.anyOf &&
      !schema.items.oneOf)
  ) {
    return (
      <TagOperationParametersDefault
        name={name}
        schema={schema}
        isRequired={isRequired}
        className="pl-1.5"
      />
    )
  }

  return (
    <Details
      summaryContent={
        <TagOperationParametersDefault
          name={name}
          schema={schema}
          isRequired={isRequired}
        />
      }
    >
      <TagsOperationParametersNested>
        <TagOperationParameters schemaObject={schema.items} topLevel={true} />
      </TagsOperationParametersNested>
    </Details>
  )
}

export default TagOperationParametersArray
