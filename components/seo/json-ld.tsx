import { Thing, WithContext } from 'schema-dts'

interface JsonLdProps {
  data: WithContext<Thing> | WithContext<Thing>[]
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  )
}
